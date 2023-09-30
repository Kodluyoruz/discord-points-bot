import { enumerate } from '@discord-point-bot/utils';

import { Schema, model } from 'mongoose';

import { PointUnitType } from './constants/PointUnitType';
import { IPointUnits } from './dto';

const PointUnitsSchema = new Schema(
  {
    guildId: { type: String, index: true, required: true },
    type: { type: String, index: true, required: true, enum: enumerate(PointUnitType) },
    title: { type: String, required: true },
    description: { type: String },
    point: { type: Number, required: true },
    reply: { type: Boolean, default: false },
    channels: { type: [String], default: [] },
    ignoreRoles: { type: [String], default: [] },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

export const PointUnitsModel = model<IPointUnits>('PointUnits', PointUnitsSchema);
