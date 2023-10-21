import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

import { setupEmbed } from '@discord-point-bot/components';

export const Setup: DiscordType.ISlashCommand = {
  data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Kuruluma başlamak için mesaj yollar.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  execute: async ({ interaction, lng, t }) => {
    const { embed, row } = await setupEmbed({ guild: interaction.guild, lng, t });

    await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
  },
};
