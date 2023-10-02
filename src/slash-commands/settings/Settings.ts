import { settingsAdminEmbed } from '@discord-point-bot/components';

import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export const Settings: DiscordType.ISlashCommand = {
  data: new SlashCommandBuilder()
    .setName('settings')
    .setDescription('Setting Menüsünü Açar.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  execute: async ({ client, interaction, lang }) => {
    const { embed, row } = await settingsAdminEmbed({ client, guild: interaction.guild, lang });

    await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
  },
};
