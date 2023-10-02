import { setupEmbed } from '@discord-point-bot/components';

import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export const Setup: DiscordType.ISlashCommand = {
  data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Kuruluma başlamak için mesaj yollar.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  execute: async ({ interaction, lang }) => {
    const { embed, row } = await setupEmbed({ guild: interaction.guild, lang });

    await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
  },
};
