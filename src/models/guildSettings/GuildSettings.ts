import { Model, model, Schema } from 'mongoose';

import { pointPeriod } from '@discord-point-bot/constants';

import { IGuildSettings } from './dto';

type ChannelType = 'admin' | 'log' | 'info' | 'period';

type ChannelProps = Record<Partial<ChannelType>, string>;

interface IGuildSettingsModel extends Model<IGuildSettings> {
  setChannel(guildId: string, channelsData: ChannelProps): Promise<void>;

  getChannel(guildId: string, channelType: ChannelType): Promise<string | null>;

  getPeriod(guildId: string): Promise<pointPeriod | null>;

  setPeriod(guildId: string, period: keyof pointPeriod): Promise<void>;
}

const GuildSettingsSchema = new Schema<IGuildSettings>(
  {
    guildId: { type: String, unique: true, index: true, required: true },
    adminChannelId: { type: String },
    logChannelId: { type: String },
    infoChannelId: { type: String },
    point: {
      period: { type: String },
      channelId: { type: String },
    },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

export const GuildSettingsModel = model<IGuildSettings>('GuildSettings', GuildSettingsSchema);
