import { ButtonCustomId, SelectMenuCustomId } from '@discord-point-bot/constants';
import { GuildSettingsModel } from '@discord-point-bot/models';

import translation from '@translation';
import { channelMention } from 'discord.js';

import { setupCustomButtonEmbed } from './setupCustomButtonEmbed';

export const SetupAdminSelectMenu: DiscordType.ISelectMenu = {
  customId: SelectMenuCustomId.admin_channel,
  execute: async ({ client, interaction, lng }) => {
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
      : !point?.period
      ? ButtonCustomId.setup.point_period.add
      : ButtonCustomId.setup.done;

    const { newEmbed, row } = setupCustomButtonEmbed({
      nextButon: { customId: customId },
      backButon: { customId: ButtonCustomId.setup.admin_channel.edit },
      embed: {
        oldEmbed: interaction.message.embeds[0],
        title: translation('setup.adminChannel.selected', { lng }),
        description: channelMention(channelId),
      },
      lng,
    });

    await interaction.deferUpdate();

    await interaction.editReply({ components: [row], embeds: [newEmbed] });
  },
};
