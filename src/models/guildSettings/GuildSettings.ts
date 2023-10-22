import { Model, model, Schema } from 'mongoose';

import { pointPeriod } from '@discord-point-bot/constants';
import { enumerate } from '@discord-point-bot/utils';

import { IGuildSettings } from './dto';

export enum ChannelSettingTypeEnum {
  ADMIN = 'admin',
  LOG = 'log',
  INFO = 'info',
  POINT = 'point',
}

export type ChannelSettingType = `${ChannelSettingTypeEnum}`;

type ChannelLists = {
  [key in ChannelSettingType]?: string | null;
};

interface IGuildSettingsModel extends Model<IGuildSettings> {
  getSettings(guildId: string): Promise<IGuildSettings>;
  setChannel(guildId: string, channelLists: ChannelLists): Promise<void>;
  getChannel(guildId: string, channelType: ChannelSettingType): Promise<string | null>;
  getChannels(guildId: string): Promise<ChannelLists>;
  getPeriod(guildId: string): Promise<pointPeriod | null>;
  setPeriod(guildId: string, period: pointPeriod): Promise<void>;
}

const GuildSettingsSchema = new Schema<IGuildSettings, IGuildSettingsModel>(
  {
    guildId: { type: String, unique: true, index: true, required: true },
    channels: {
      admin: { type: String },
      log: { type: String },
      info: { type: String },
      period: { type: String },
    },
    point: {
      period: { type: String, enum: enumerate(pointPeriod) },
    },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    statics: {
      async getSettings(guildId: string): Promise<IGuildSettings> {
        return await this.findOne({ guildId });
      },
      async setChannel(guildId: string, channelLists: ChannelLists): Promise<void> {
        const channelUpdate = Object.entries(channelLists).reduce((acc, [key, val]) => {
          return { ...acc, [`channels.${key}`]: val };
        }, {});

        await this.updateOne({ guildId }, { $set: channelUpdate }, { upsert: true });
      },
      async getChannel(guildId: string, channelType: ChannelSettingType): Promise<string | null> {
        const guildSettings = await this.findOne({ guildId });
        return guildSettings?.channels[channelType] ?? null;
      },
      async getChannels(guildId: string): Promise<ChannelLists> {
        const guildSettings = await this.findOne({ guildId });
        return guildSettings?.channels ?? {};
      },
      async getPeriod(guildId: string): Promise<pointPeriod | null> {
        const guildSettings = await this.findOne({ guildId });
        return guildSettings?.point.period ?? null;
      },
      async setPeriod(guildId: string, period: pointPeriod) {
        await this.updateOne({ guildId }, { $set: { 'point.period': period } }, { upsert: true });
      },
    },
  },
);

export const GuildSettingsModel = model<IGuildSettings, IGuildSettingsModel>(
  'GuildSettings',
  GuildSettingsSchema,
);
