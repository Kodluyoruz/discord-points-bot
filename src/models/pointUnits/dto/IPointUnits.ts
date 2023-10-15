import { Types } from 'mongoose';

import { PointUnitType } from '../constants/PointUnitType';

export interface IPointUnits {
  _id: Types.ObjectId;
  guildId: string;
  type: keyof typeof PointUnitType;
  title: string;
  description: string;
  point: number;
  reply: boolean;
  channels: string[];
  ignoreChannels: string[];
  ignoreRoles: string[];
  sendLog: boolean;
  createdAt: Date;
  updatedAt: Date;
}
