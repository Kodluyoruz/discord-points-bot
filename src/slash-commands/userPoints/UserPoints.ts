import { userPointsEmbed } from '@discord-point-bot/components';

import { SlashCommandBuilder } from 'discord.js';

export const UserPoints: DiscordType.ISlashCommand = {
  data: new SlashCommandBuilder().setName('puan').setDescription('Puan durumunuzu gösterir.'),
  execute: async ({ client, interaction, lng }) => {
    const member = interaction.inCachedGuild()
      ? interaction.member
      : await interaction.guild.members.fetch(interaction.user.id);

    const period = '10-17 Eylül'; // TODO:DB get period from db or something
    const userData = {
      // TODO:DB get user data from db
      points: 93,
      place: 12,
      displayName: member.displayName,
    };

    const { embed } = userPointsEmbed({ client, userData, period });

    await interaction.reply({
      embeds: [embed],
    });
  },
};
