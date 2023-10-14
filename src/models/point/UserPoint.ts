import { endOfDay, startOfDay } from 'date-fns';
import { isEmpty } from 'lodash';
import { Model, PipelineStage, Schema, Types, model } from 'mongoose';

import { PointUnitType, PointUnitsModel } from '../pointUnits';
import { IUserPoint, ShowGlobalOrUserPointResult } from './dto';

interface IUserPointModel extends Model<IUserPoint> {
  getReferralData(props: ReferralDataParams): Promise<ReferralDataResult>;
  pointAdd(props: AddPointProps): Promise<void>;
  showGlobalOrUserPoint(
    props: ShowGlobalOrUserPoint,
  ): Promise<ShowGlobalOrUserPointResult | ShowGlobalOrUserPointResult[]>;
}

type AddPointProps = {
  guildId: string;
  userId: string;
  type: keyof typeof PointUnitType;
  value: number;
  channelId?: string;
  categoryId?: string;
  data?: unknown;
};

type ShowGlobalOrUserPoint = {
  guildId: string;
  userId?: string;
  dates?: { start: Date; end: Date };
  limit?: number;
};

type ReferralDataResult = {
  referrerId: string;
  referredCount: number;
};

type ReferralDataParams = {
  guildId: string;
  userId: string;
};

const UserPointSchema = new Schema(
  {
    guildId: { type: String },
    userId: { type: String },
    type: { type: Schema.Types.ObjectId, ref: 'PointUnits' },
    point: { type: Number },
    value: { type: Number },
    data: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    statics: {
      async pointAdd({ guildId, userId, type, value, channelId, categoryId, data }: AddPointProps) {
        const channelIds = [guildId, channelId, categoryId].filter(
          (channel) => !!channel,
        ) as string[];
        const pointTypeList: Record<PointUnitType, { channelIds?: string[]; value: number }> = {
          [PointUnitType.NONE]: { value: 0 },
          [PointUnitType.VOICE]: { channelIds, value },
          [PointUnitType.TEXT]: { channelIds, value },
          [PointUnitType.INVITE]: { channelIds, value },
          [PointUnitType.REPLY]: { channelIds, value },
        };

        const { value: newValue, channelIds: ids } =
          pointTypeList[type] || pointTypeList[PointUnitType.NONE];

        const pointUnit = await PointUnitsModel.findOne({
          guildId,
          type,
          channels: { $in: ids },
          ignoreChannels: { $nin: ids },
        })
          .select({ point: 1, _id: 1 })
          .lean();

        if (!pointUnit || newValue < 1) {
          return;
        }

        const { _id, point } = pointUnit;

        const start = startOfDay(new Date());
        const end = endOfDay(new Date());

        const filter = {
          userId,
          guildId,
          type: new Types.ObjectId(_id),
          createdAt: { $gte: start, $lte: end },
          data,
        };

        await this.findOneAndUpdate(filter, { $inc: { value: newValue }, point }, { upsert: true });
      },

      async getReferralData({ guildId, userId }: ReferralDataParams): Promise<ReferralDataResult> {
        const { _id: pointUnitId = null } =
          (await PointUnitsModel.findOne({
            guildId,
            type: PointUnitType.INVITE,
          })
            .select({ _id: 1 })
            .lean()) || {};

        const [referrer, referredCount] = await Promise.all([
          this.findOne({
            guildId,
            userId,
            type: pointUnitId,
            'data.referrer': { $exists: true },
          })
            .select({ data: 1 })
            .sort({ createdAt: -1 })
            .lean(),
          this.countDocuments({
            guildId,
            userId,
            type: pointUnitId,
            'data.referred': { $exists: true },
          }),
        ]);

        return { referrerId: referrer?.data?.referrer, referredCount };
      },

      async showGlobalOrUserPoint({
        guildId,
        userId,
        dates,
        limit,
      }: ShowGlobalOrUserPoint): Promise<
        ShowGlobalOrUserPointResult | ShowGlobalOrUserPointResult[]
      > {
        const filterDate = isEmpty(dates)
          ? []
          : [{ $match: { guildId, createdAt: { $gte: dates.start, $lte: dates.end } } }];

        const filterUser = userId ? [{ $match: { userId } }] : [];
        const _limit = limit ? [{ $limit: limit }] : [];

        const pipeline: PipelineStage[] = [
          ...filterDate,
          {
            $group: {
              _id: '$userId',
              totalPoints: { $sum: { $multiply: ['$point', '$value'] } },
              start: { $min: '$createdAt' },
              end: { $max: '$createdAt' },
            },
          },
          { $sort: { totalPoints: -1 } },
          { $group: { _id: null, data: { $push: '$$ROOT' } } },
          { $unwind: { path: '$data', includeArrayIndex: 'rank' } },
          {
            $project: {
              userId: '$data._id',
              _id: 0,
              totalPoints: '$data.totalPoints',
              rank: { $add: ['$rank', 1] },
              start: '$data.start',
              end: '$data.end',
            },
          },
          ...filterUser,
          ..._limit,
        ];

        const userPoints = await UserPointModel.aggregate(pipeline);

        return userId ? userPoints[0] : userPoints;
      },
    },
  },
);

export const UserPointModel = model<IUserPoint, IUserPointModel>('Points', UserPointSchema);
