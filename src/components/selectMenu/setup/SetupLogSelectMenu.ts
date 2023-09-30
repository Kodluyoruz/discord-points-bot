import { ButtonCustomId, SelectMenuCustomId } from '@discord-point-bot/constants';
import { GuildSettingsModel } from '@discord-point-bot/models';

import translation from '@translation';
import { channelMention } from 'discord.js';

import { setupCustomButtonEmbed } from './setupCustomButtonEmbed';

export const SetupLogSelectMenu: DiscordType.ISelectMenu = {
  customId: SelectMenuCustomId.LOG_CHANNEL,
  execute: async ({ interaction, lang }) => {
    const [channelId] = interaction.values;

    const guildSetting = await GuildSettingsModel.findOneAndUpdate(
      { guildId: interaction.guildId },
      { logChannelId: channelId },
      { upsert: true, new: true },
    );

    const { adminChannelId, pointPeriod } = guildSetting || {};

    const customId = !adminChannelId
      ? ButtonCustomId.ADMIN_CHANNEL
      : !pointPeriod
      ? ButtonCustomId.POINT_PERIOD
      : ButtonCustomId.SETUP_DONE;

    const { newEmbed, row } = setupCustomButtonEmbed({
      nextButon: { customId: customId },
      backButon: { customId: ButtonCustomId.EDIT_LOG_CHANNEL },
      embed: {
        oldEmbed: interaction.message.embeds[0],
        title: translation('setup.logChannel.selected', { lang }),
        description: channelMention(channelId),
      },
      lang,
    });

    await interaction.deferUpdate();

    interaction.editReply({ components: [row], embeds: [newEmbed] });
  },
};
