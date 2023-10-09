import { UserPointModel } from '@discord-point-bot/models';

import t from '@translation';
import { format } from 'date-fns';
import { EmbedBuilder, userMention } from 'discord.js';

export const userRankEmbed = async ({ interaction, lang }: DiscordType.ButtonArgs) => {
  const { id } = interaction.user;
  const userPoint = await UserPointModel.showGlobalOrUserPoint({
    guildId: interaction.guildId,
    userId: interaction.user.id,
  });

  const { start = new Date(), rank: place = '?', totalPoints: points = 0 } = userPoint || {};

  let setting = {};

  try {
    setting = { locale: { ...require(`date-fns/locale/${lang}`) } };
  } catch (error) {
    setting = {};
  }

  const period = `**${
    format(new Date(start), 'dd', setting) + format(new Date(), '-dd MMMM', setting)
  }**`;

  const embed = new EmbedBuilder()
    .setColor(0x5865f2)
    .setDescription(t('userPoints.description', { id, points, place, period, lang }));

  await interaction.deferReply({ ephemeral: true, fetchReply: true });

  await interaction.editReply({ embeds: [embed] });
};
