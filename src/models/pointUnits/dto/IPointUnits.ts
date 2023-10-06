import { PointUnitType } from '../constants/PointUnitType';

export interface IPointUnits extends Document {
  guildId: string;
  type: PointUnitType;
  title: string;
  description: string;
  point: number;
  reply: boolean;
  channels: string[];
  ignoreRoles: string[];
}
