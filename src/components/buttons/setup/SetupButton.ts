import { ButtonCustomId } from '@discord-point-bot/constants';
import { GuildSettingsModel } from '@discord-point-bot/models';

import {
  setupAdminEmbed,
  setupDoneEmbed,
  setupLogEmbed,
  setupPeriodEmbed,
} from 'src/components/embeds';

export const SetupButton: DiscordType.IButton = {
  customId: ButtonCustomId.SETUP_START,
  execute: async ({ client, interaction, lang }) => {
    const guildSetting = await GuildSettingsModel.findOne({ guildId: interaction.guild.id })
      .select('logChannelId adminChannelId pointPeriod')
      .lean();

    const { logChannelId, adminChannelId, pointPeriod } = guildSetting || {};

    const setupEmbed = !logChannelId
      ? setupLogEmbed
      : !adminChannelId
      ? setupAdminEmbed
      : !pointPeriod
      ? setupPeriodEmbed
      : setupDoneEmbed;

    const { embed, row } = await setupEmbed({
      client,
      guild: interaction.guild,
      lang,
    });

    interaction.update({ components: [row], embeds: [embed] });
  },
};
