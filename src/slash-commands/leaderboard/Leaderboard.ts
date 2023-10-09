import { leaderboardEmbed } from '@discord-point-bot/components';

import { SlashCommandBuilder } from 'discord.js';

export const Leaderboard: DiscordType.ISlashCommand = {
  data: new SlashCommandBuilder().setName('sıralama').setDescription('Sıralamayı gösterir.'),
  execute: async ({ client, interaction, lang }) => {
    const usersData = [
      { points: 100, id: '123456789' },
      { points: 90, id: '123456789' },
      { points: 80, id: '123456789' },
      { points: 70, id: '123456789' },
      { points: 60, id: '123456789' },
      { points: 50, id: interaction.user.id },
      { points: 40, id: '123456789' },
      { points: 30, id: '123456789' },
      { points: 20, id: '123456789' },
      { points: 10, id: '123456789' },
    ];
    const period = '10-17 Eylül';
    // TODO: pull data from db

    const { embed, row } = leaderboardEmbed({
      client,
      usersData,
      period,
      lang,
      userId: interaction.user.id,
    });
    await interaction.reply({ embeds: [embed], components: [row] });
  },
};
