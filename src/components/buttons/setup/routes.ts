import { ActionRowBuilder, ButtonBuilder, EmbedBuilder, StringSelectMenuBuilder } from 'discord.js';
import { pointPeriodEmbed, setupDoneEmbed } from 'src/components/embeds';
import { channelEmbed } from 'src/components/embeds/setup/channelEmbed';
import { ChannelSettingTypeEnum } from 'src/models/guildSettings/GuildSettings';

import { ButtonCustomId } from '@discord-point-bot/constants';

import { SetupStartButton } from './SetupStartButton';

type SetupRoutes = {
  customId: keyof (typeof ButtonCustomId)['setup'];
  params?: Array<string>;
  execute: ({ client, interaction, lng, t }: DiscordType.ButtonArgs) => Promise<{
    embed: EmbedBuilder;
    row: ActionRowBuilder<StringSelectMenuBuilder | ButtonBuilder>;
  }>;
};

const ChannelSettingTypes = Object.values(ChannelSettingTypeEnum);

export const setupRoutes: SetupRoutes[] = [
  { customId: 'start', execute: SetupStartButton },
  { customId: 'channel', execute: channelEmbed, params: ChannelSettingTypes },
  { customId: 'point_period', execute: pointPeriodEmbed },
  { customId: 'done', execute: setupDoneEmbed },
];
