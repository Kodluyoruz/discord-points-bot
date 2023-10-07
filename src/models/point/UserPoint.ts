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
        };

        const { value: newValue, channelIds: ids } = pointTypeList[type];

        const pointUnit = await PointUnitsModel.findOne({
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
    },
  },
);

export const UserPointModel = model<IUserPoint, IUserPointModel>('Points', UserPointSchema);
