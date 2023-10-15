import { endOfDay, startOfDay } from 'date-fns';
import { Guild } from 'discord.js';
import { isEmpty } from 'lodash';
import { Model, PipelineStage, Schema, model } from 'mongoose';
import { pointLog } from 'src/feature/logger/logger';
import { Client } from 'src/structures/Client';

import { IPointUnits, PointUnitType, PointUnitsModel } from '../pointUnits';
import { IUserPoint, ShowGlobalOrUserPointResult } from './dto';

interface IUserPointModel extends Model<IUserPoint> {
  getReferralData(props: ReferralDataParams): Promise<ReferralDataResult>;
  pointAdd(props: AddPointProps): Promise<void>;
  showGlobalOrUserPoint(
    props: ShowGlobalOrUserPoint,
  ): Promise<ShowGlobalOrUserPointResult | ShowGlobalOrUserPointResult[]>;
}

type AddPointProps = {
  guild: Guild;
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
  pointUnit: IPointUnits;
};
type ReferralDataParams = {
  guildId: string;
  userId: string;
};

const UserPointSchema = new Schema<IUserPoint, IUserPointModel>(
  {
    guildId: { type: String },
    userId: { type: String },
    type: { type: Schema.Types.ObjectId, ref: 'PointUnits' },
    point: { type: Number },
    value: { type: Number },
    data: { type: Schema.Types.Mixed },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    statics: {
      async pointAdd({ guild, userId, type, value, channelId, categoryId, data }: AddPointProps) {
        const guildId = guild.id;
        const channelIds = [guildId, channelId, categoryId].filter((channel) => !!channel);
        const pointTypeList: Record<PointUnitType, { channelIds?: string[] }> = {
          [PointUnitType.NONE]: {},
          [PointUnitType.VOICE]: { channelIds },
          [PointUnitType.TEXT]: { channelIds },
          [PointUnitType.INVITE]: {},
          [PointUnitType.REPLY]: { channelIds },
        };

        const { channelIds: ids } = pointTypeList[type] || pointTypeList[PointUnitType.NONE];

        const channelFilter = { channels: { $in: ids }, ignoreChannels: { $nin: ids } };

        const pointUnit = await PointUnitsModel.findOne({
          guildId,
          type,
          ...(ids && channelFilter),
        })
          .select({ point: 1, _id: 1, sendLog: 1 })
          .lean();

        if (!pointUnit || value < 1) {
          return;
        }

        const { _id, point, sendLog } = pointUnit;

        const start = startOfDay(new Date());
        const end = endOfDay(new Date());

        const filter = {
          userId,
          guildId,
          type: _id,
          createdAt: { $gte: start, $lte: end },
          data,
        };

        const userPoint = await this.findOneAndUpdate(
          filter,
          { $inc: { value }, point },
          { upsert: true, new: true },
        )
          .setOptions({ new: true, upsert: true })
          .populate({ path: 'type' })
          .lean();

        if (sendLog && userPoint) {
          await pointLog({
            client: guild.client as Client,
            guild,
            userId,
            point: userPoint,
            pointProp: { channelId, data },
            value,
          });
        }
      },

      async getReferralData({ guildId, userId }: ReferralDataParams): Promise<ReferralDataResult> {
        const { _id: pointUnitId = null } =
          (await PointUnitsModel.findOne({
            guildId,
            type: PointUnitType.INVITE,
          })
            .select({ _id: 1 })
            .lean()) || {};

        const [referrer, referredCount, pointUnit] = await Promise.all([
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
          PointUnitsModel.findOne({
            guildId,
            type: PointUnitType.INVITE,
          }).lean(),
        ]);

        return { referrerId: referrer?.data?.referrer, referredCount, pointUnit };
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
