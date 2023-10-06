import { endOfDay, startOfDay } from 'date-fns';
import { isEmpty } from 'lodash';
import { Model, Schema, Types, model } from 'mongoose';

import { PointUnitType, PointUnitsModel } from '../pointUnits';
import { IUserPoint } from './dto';

type PointAddProps = {
  guildId: string;
  userId: string;
  type: keyof typeof PointUnitType;
  value: number;
  channelId: string;
};

interface IUserPointModel extends Model<IUserPoint & Document> {
  pointAdd(props: PointAddProps): Promise<IUserPoint | null>;
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
      async pointAdd({ guildId, userId, type, value, channelId }: PointAddProps) {
        const pointUnit = await PointUnitsModel.findOne({ type, channels: { $in: channelId } })
          .select({ point: 1, _id: 1 })
          .lean();

        const newValue = type === PointUnitType.VOICE ? Number((value / 1000).toFixed(1)) : value;

        if (isEmpty(pointUnit) || newValue < 1) {
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
