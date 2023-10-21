import { channelMention } from 'discord.js';

import { ButtonCustomId, SelectMenuCustomId } from '@discord-point-bot/constants';
import { GuildSettingsModel } from '@discord-point-bot/models';

import { setupCustomButtonEmbed } from './setupCustomButtonEmbed';

export const SetupAdminSelectMenu: DiscordType.ISelectMenu = {
  customId: SelectMenuCustomId.admin_channel,
  execute: async ({ interaction, lng, t }) => {
    const [channelId] = interaction.values;

    const settings = await GuildSettingsModel.findOneAndUpdate(
      { guildId: interaction.guildId },
      { adminChannelId: channelId },
      { upsert: true, new: true },
    );

    const { point, infoChannelId } = settings || {};

    const customId = !infoChannelId
      ? ButtonCustomId.setup.info_channel.add
      : !point?.channelId
      ? ButtonCustomId.setup.point_channel.add
      : point?.period
      ? ButtonCustomId.setup.done
      : ButtonCustomId.setup.point_period.add;

    const { newEmbed, row } = setupCustomButtonEmbed({
      nextButton: { customId: customId },
      backButton: { customId: ButtonCustomId.setup.admin_channel.edit },
      embed: {
        oldEmbed: interaction.message.embeds[0],
        title: t('setup.adminChannel.selected'),
        description: channelMention(channelId),
      },
      lng,
      t,
    });

    await interaction.deferUpdate();

    await interaction.editReply({ components: [row], embeds: [newEmbed] });
  },
};
