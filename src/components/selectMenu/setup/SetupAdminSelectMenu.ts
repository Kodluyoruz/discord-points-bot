import { ButtonCustomId, SelectMenuCustomId } from '@discord-point-bot/constants';
import { GuildSettingsModel } from '@discord-point-bot/models';

import translation from '@translation';
import { channelMention } from 'discord.js';

import { setupCustomButtonEmbed } from './setupCustomButtonEmbed';

export const SetupAdminSelectMenu: DiscordType.ISelectMenu = {
  customId: SelectMenuCustomId.ADMIN_CHANNEL,
  execute: async ({ client, interaction, lang }) => {
    const [channelId] = interaction.values;

    const guildSetting = await GuildSettingsModel.findOneAndUpdate(
      { guildId: interaction.guildId },
      { adminChannelId: channelId },
      { upsert: true, new: true },
    );

    const { pointPeriod } = guildSetting || {};

    const customId = !pointPeriod ? ButtonCustomId.POINT_PERIOD : ButtonCustomId.SETUP_DONE;

    const { newEmbed, row } = setupCustomButtonEmbed({
      nextButon: { customId: customId },
      backButon: { customId: ButtonCustomId.EDIT_ADMIN_CHANNEL },
      embed: {
        oldEmbed: interaction.message.embeds[0],
        title: translation('setup.adminChannel.selected', { lang }),
        description: channelMention(channelId),
      },
      lang,
    });

    await interaction.deferUpdate();

    interaction.editReply({ components: [row], embeds: [newEmbed] });
  },
};
