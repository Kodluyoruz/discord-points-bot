import { Schema, model } from 'mongoose';

import { IGuildSettings } from './dto';

const GuildSettingsSchema = new Schema(
  {
    guildId: { type: String, unique: true, index: true, required: true },
    adminChannelId: { type: String },
    logChannelId: { type: String },
    infoChannelId: { type: String },
    point: {
      period: { type: String },
      ChannelId: { type: String },
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

export const GuildSettingsModel = model<IGuildSettings>('GuildSettings', GuildSettingsSchema);
