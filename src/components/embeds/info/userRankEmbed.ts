import { format } from 'date-fns';
import { EmbedBuilder } from 'discord.js';

import { ShowGlobalOrUserPointResult, UserPointModel } from '@discord-point-bot/models';

export const userRankEmbed = async ({ interaction, lng, t }: DiscordType.ButtonArgs) => {
  const { id } = interaction.user;
  const userPoint = await UserPointModel.showGlobalOrUserPoint({
    guildId: interaction.guildId,
    userId: interaction.user.id,
  });

  const {
    start = new Date(),
    rank: place = '?',
    totalPoints: points = 0,
  } = (userPoint || {}) as ShowGlobalOrUserPointResult;

  let setting = {};

  try {
    setting = { locale: { ...require(`date-fns/locale/${lng}`) } };
  } catch (error) {
    setting = {};
  }

  const period = `**${
    format(new Date(start), 'dd', setting) + format(new Date(), '-dd MMMM', setting)
  }**`;

  const embed = new EmbedBuilder()
    .setColor(0x5865f2)
    .setDescription(t('userPoints.description', { id, points, place, period }));

  await interaction.deferReply({ ephemeral: true, fetchReply: true });

  await interaction.editReply({ embeds: [embed] });
};
