import { referenceEmbed } from '@discord-point-bot/components';

import { SlashCommandBuilder } from 'discord.js';

export const Reference: DiscordType.ISlashCommand = {
  data: new SlashCommandBuilder().setName('reference').setDescription('Referans durumunuzu gösterir.'),
  execute: async ({ client, interaction, lang }) => {
    const member = interaction.inCachedGuild()
      ? interaction.member
      : await interaction.guild.members.fetch(interaction.user.id);

    const period = '10-17 Eylül'; // TODO:DB get period from db or something
    const referenceData = {
      // TODO:DB get user data from db
      member:"öykü",
      topic: "Arkadaş Daveti",
      roomPoint: 55,
      points: 93,
      place: 12,
      displayName: member.displayName,
    };

    const { embed } = referenceEmbed({ client, referenceData, period });

    await interaction.reply({
      embeds: [embed],
    });
  },
};
