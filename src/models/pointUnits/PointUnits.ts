import { Model, model, Schema } from 'mongoose';

import { enumerate } from '@discord-point-bot/utils';

import { PointUnitType } from './constants/PointUnitType';
import { IPointUnits } from './dto';

type IUserPointModel = Model<IPointUnits>;

export const PointUnitsSchema = new Schema<IPointUnits, IUserPointModel>(
  {
    guildId: { type: String, index: true, required: true },
    type: { type: String, index: true, required: true, enum: enumerate(PointUnitType) },
    title: { type: String, required: true },
    description: { type: String },
    point: { type: Number, required: true },
    reply: { type: Boolean, default: false },
    channels: { type: [String], default: [] },
    ignoreChannels: { type: [String], default: [] },
    ignoreRoles: { type: [String], default: [] },
    sendLog: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

export const PointUnitsModel = model<IPointUnits, IUserPointModel>('PointUnits', PointUnitsSchema);
