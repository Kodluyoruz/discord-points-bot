import { ButtonCustomId } from '@discord-point-bot/constants';
import { GuildSettingsModel } from '@discord-point-bot/models';

import { setupAdminEmbed } from 'src/components/embeds';

export const SetupEditAdminChannelButton: DiscordType.IButton = {
  customId: ButtonCustomId.EDIT_ADMIN_CHANNEL,
  execute: async ({ client, interaction, lang }) => {
    const guildSetting = await GuildSettingsModel.findOne({ guildId: interaction.guildId })
      .select('adminChannelId')
      .lean();

    const { embed, row } = await setupAdminEmbed({
      client,
      guild: interaction.guild,
      channelId: guildSetting?.adminChannelId,
      lang,
    });

    interaction.update({ components: [row], embeds: [embed] });
  },
};
