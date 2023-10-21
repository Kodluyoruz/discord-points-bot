import { ActionRowBuilder, ButtonBuilder, EmbedBuilder, StringSelectMenuBuilder } from 'discord.js';
import { SetupStartButton } from 'src/components/Buttons/setup/SetupStartButton';
import {
  adminChannelEmbed,
  logChannelEmbed,
  pointPeriodEmbed,
  setupDoneEmbed,
} from 'src/components/embeds';
import { infoChannelEmbed } from 'src/components/embeds/setup/infoChannelEmbed';
import { pointChannelEmbed } from 'src/components/embeds/setup/pointChannelEmbed';

import { ButtonCustomId } from '@discord-point-bot/constants';

type SetupRoutes = {
  customId: keyof (typeof ButtonCustomId)['setup'];
  execute: ({ client, interaction, lng, t }: DiscordType.ButtonArgs) => Promise<{
    embed: EmbedBuilder;
    row: ActionRowBuilder<StringSelectMenuBuilder | ButtonBuilder>;
  }>;
};

export const setupRoutes: SetupRoutes[] = [
  { customId: 'start', execute: SetupStartButton },
  { customId: 'admin_channel', execute: adminChannelEmbed },
  { customId: 'log_channel', execute: logChannelEmbed },
  { customId: 'point_period', execute: pointPeriodEmbed },
  { customId: 'info_channel', execute: infoChannelEmbed },
  { customId: 'point_channel', execute: pointChannelEmbed },
  { customId: 'done', execute: setupDoneEmbed },
];
