import { Types } from 'mongoose';
import { IPointUnits } from 'src/models/pointUnits';

export interface IUserPoint {
  _id: Types.ObjectId;
  guildId: string;
  userId: string;
  type: IPointUnits;
  point: number;
  value: number;
  createdAt: Date;
  updatedAt: Date;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}
