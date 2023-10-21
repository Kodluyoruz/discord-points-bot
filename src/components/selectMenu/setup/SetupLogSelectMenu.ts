import { channelMention } from 'discord.js';

import { ButtonCustomId, SelectMenuCustomId } from '@discord-point-bot/constants';
import { GuildSettingsModel } from '@discord-point-bot/models';

import { setupCustomButtonEmbed } from './setupCustomButtonEmbed';

export const SetupLogSelectMenu: DiscordType.ISelectMenu = {
  customId: SelectMenuCustomId.log_channel,
  execute: async ({ interaction, lng, t }) => {
    const [channelId] = interaction.values;

    const settings = await GuildSettingsModel.findOneAndUpdate(
      { guildId: interaction.guildId },
      { logChannelId: channelId },
      { upsert: true, new: true },
    );

    const { adminChannelId, point, infoChannelId } = settings || {};

    const customId = !adminChannelId
      ? ButtonCustomId.setup.admin_channel.add
      : !infoChannelId
      ? ButtonCustomId.setup.info_channel.add
      : !point?.channelId
      ? ButtonCustomId.setup.point_channel.add
      : point?.period
      ? ButtonCustomId.setup.done
      : ButtonCustomId.setup.point_period.add;

    const { newEmbed, row } = setupCustomButtonEmbed({
      nextButton: { customId: customId },
      backButton: { customId: ButtonCustomId.setup.log_channel.edit },
      embed: {
        oldEmbed: interaction.message.embeds[0],
        title: t('setup.logChannel.selected'),
        description: channelMention(channelId),
      },
      lng,
      t,
    });

    await interaction.deferUpdate();

    await interaction.editReply({ components: [row], embeds: [newEmbed] });
  },
};
