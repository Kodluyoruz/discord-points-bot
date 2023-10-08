import { endOfDay, startOfDay } from 'date-fns';
import { Model, Schema, Types, model } from 'mongoose';

import { PointUnitType, PointUnitsModel } from '../pointUnits';
import { IUserPoint } from './dto';

interface IUserPointModel extends Model<IUserPoint> {
  pointAdd(props: AddPointProps): Promise<void>;
}

type AddPointProps = {
  guildId: string;
  userId: string;
  type: keyof typeof PointUnitType;
  value: number;
  channelId?: string;
  categoryId?: string;
};

type ShowGlobalOrUserPoint = {
  guildId: string;
  userId?: string;
  dates?: { start: Date; end: Date };
};

interface ShowGlobalOrUserPointResult {
  userId: string;
  totalPoints: number;
  rank: number;
  start: Date;
  end: Date;
}

interface IUserPointModel extends Model<IUserPoint & Document> {
  pointAdd(props: PointAddProps): Promise<void>;
  showGlobalOrUserPoint(props: ShowGlobalOrUserPoint): Promise<ShowGlobalOrUserPointResult>;
}

const UserPointSchema = new Schema(
  {
    guildId: { type: String },
    userId: { type: String },
    type: [{ type: Schema.Types.ObjectId, ref: 'PointUnits' }],
    point: { type: Number },
    value: { type: Number },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    statics: {
      async pointAdd({ guildId, userId, type, value, channelId, categoryId }: AddPointProps) {
        const channelIds = [guildId, channelId, categoryId];
        const pointTypeList: Record<PointUnitType, { channelIds?: string[]; value: number }> = {
          [PointUnitType.VOICE]: { channelIds, value: Number((value / 1000).toFixed(1)) },
          [PointUnitType.TEXT]: { channelIds, value },
          [PointUnitType.INVITE]: { value },
          [PointUnitType.REPLY]: { channelIds, value },
        };

        const { value: newValue, channelIds: ids } = pointTypeList[type];

        const pointUnit = await PointUnitsModel.findOne({
          guildId
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
        };

        await this.findOneAndUpdate(filter, { $inc: { value: newValue }, point }, { upsert: true });
      },
      async showGlobalOrUserPoint({
        guildId,
        userId,
        dates,
      }: ShowGlobalOrUserPoint): Promise<ShowGlobalOrUserPointResult> {
        const filterDate = !isEmpty(dates)
          ? [{ $match: { guildId, createdAt: { $gte: dates.start, $lte: dates.end } } }]
          : [];

        const filterUser = userId ? [{ $match: { userId } }] : [];

        const pipeline = [
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
        ];
        const userPoints = await UserPointModel.aggregate(pipeline as any);

        return userId ? userPoints[0] : userPoints;
      },
    },
  },
);

export const UserPointModel = model<IUserPoint, IUserPointModel>('Points', UserPointSchema);
