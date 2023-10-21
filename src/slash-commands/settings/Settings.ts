import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

import { settingsAdminEmbed } from '@discord-point-bot/components';

export const Settings: DiscordType.ISlashCommand = {
  data: new SlashCommandBuilder()
    .setName('settings')
    .setDescription('Setting Menüsünü Açar.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  execute: async ({ client, interaction, lng, t }) => {
    const { embed, row } = await settingsAdminEmbed({ client, guild: interaction.guild, lng, t });

    await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
  },
};
