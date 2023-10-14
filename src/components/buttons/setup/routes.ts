import { ButtonCustomId } from '@discord-point-bot/constants';

import { ActionRowBuilder, ButtonBuilder, EmbedBuilder, StringSelectMenuBuilder } from 'discord.js';
import {
  adminChannelEmbed,
  logChannelEmbed,
  pointPeriodEmbed,
  setupDoneEmbed,
} from 'src/components/embeds';
import { infoChannelEmbed } from 'src/components/embeds/setup/infoChannelEmbed';
import { pointChannelEmbed } from 'src/components/embeds/setup/pointChannelEmbed';

import { SetupStartButton } from './SetupStartButton';

type SetupRoutes = {
  custumId: keyof (typeof ButtonCustomId)['setup'];
  execute: ({ client, interaction, lng }: DiscordType.ButtonArgs) => Promise<{
    embed: EmbedBuilder;
    row: ActionRowBuilder<StringSelectMenuBuilder | ButtonBuilder>;
  }>;
};

export const setupRoutes: SetupRoutes[] = [
  { custumId: 'start', execute: SetupStartButton },
  { custumId: 'admin_channel', execute: adminChannelEmbed },
  { custumId: 'log_channel', execute: logChannelEmbed },
  { custumId: 'point_period', execute: pointPeriodEmbed },
  { custumId: 'info_channel', execute: infoChannelEmbed },
  { custumId: 'point_channel', execute: pointChannelEmbed },
  { custumId: 'done', execute: setupDoneEmbed },
];
