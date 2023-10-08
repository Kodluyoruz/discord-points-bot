import { ButtonCustomId } from '@discord-point-bot/constants';

import {
  ActionRowBuilder,
  AnyComponentBuilder,
  ButtonBuilder,
  EmbedBuilder,
  StringSelectMenuBuilder,
} from 'discord.js';
import { setupInfoEmbed } from 'src/components/embeds';
import { infoUserPointEmbed } from 'src/components/embeds/info/infoUserPointEmbed';
import { userRankEmbed } from 'src/components/embeds/info/userRankEmbed';

type SetupRoutes = {
  custumId: keyof (typeof ButtonCustomId)['info'];
  execute: ({ client, interaction, lang }: DiscordType.ButtonArgs) => Promise<void>;
};

export const setupRoutes: SetupRoutes[] = [
  { custumId: 'point', execute: infoUserPointEmbed },
  { custumId: 'user', execute: userRankEmbed },
];
