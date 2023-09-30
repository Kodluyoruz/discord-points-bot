import { ButtonCustomId } from '@discord-point-bot/constants';
import { GuildSettingsModel } from '@discord-point-bot/models';

import { setupLogEmbed } from 'src/components/embeds';

export const SetupEditLogChannelButton: DiscordType.IButton = {
  customId: ButtonCustomId.EDIT_LOG_CHANNEL,
  execute: async ({ client, interaction, lang }) => {
    const guildSetting = await GuildSettingsModel.findOne({ guildId: interaction.guildId })
      .select('logChannelId')
      .lean();

    const { embed, row } = await setupLogEmbed({
      client,
      guild: interaction.guild,
      channelId: guildSetting?.logChannelId,
      lang,
    });

    interaction.update({ components: [row], embeds: [embed] });
  },
};
