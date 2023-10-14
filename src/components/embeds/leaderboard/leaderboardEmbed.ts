import { ShowGlobalOrUserPointResult, UserPointModel } from '@discord-point-bot/models';

import t from '@translation';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  EmbedBuilder,
  Locale,
  userMention,
} from 'discord.js';
import { chain } from 'lodash';
import { Client } from 'src/structures/Client';

type leaderboardEmbedProps = {
  client: Client;
  interaction: ButtonInteraction;
  lang: Locale;
  dates?: { start: Date; end: Date };
  footer: string;
  title: string;
};

export const leaderboardEmbed = async ({
  interaction,
  lang,
  dates,
  footer,
  title,
}: leaderboardEmbedProps) => {
  const usersDatas = (await UserPointModel.showGlobalOrUserPoint({
    guildId: interaction.guildId,
    dates,
  })) as ShowGlobalOrUserPointResult[];

  const rankedUsers = chain(usersDatas)
    .map((user, index) => ({
      ...user,
      formattedPoints: `**${user.totalPoints}**`,
      rankEmoji: index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`,
    }))
    .map((user) => `${user.rankEmoji} ${userMention(user.userId)} - ${user.formattedPoints}`)
    .join('\n')
    .value();

  const line = '~~---------------------------------------------------------------------~~';

  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(`${line}\n${rankedUsers}\n${line}\n${footer}`)
    .setColor(0x5865f2)
    .setImage(
      'https://cdn.discordapp.com/attachments/745992192891289661/1154089813260111912/image.png',
    );
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
    new ButtonBuilder()
      .setCustomId('info/point')
      .setLabel(t('pointInfos.title', { lang }))
      .setStyle(ButtonStyle.Secondary),
  ]);

  return { embed, row };
};
