import { channelMention } from 'discord.js';

import { ButtonCustomId, SelectMenuCustomId } from '@discord-point-bot/constants';
import { GuildSettingsModel } from '@discord-point-bot/models';

import { setupCustomButtonEmbed } from './setupCustomButtonEmbed';

export const SetupInfoSelectMenu: DiscordType.ISelectMenu = {
  customId: SelectMenuCustomId.info_channel,
  execute: async ({ interaction, lng, t }) => {
    const [channelId] = interaction.values;

    const settings = await GuildSettingsModel.findOneAndUpdate(
      { guildId: interaction.guildId },
      { infoChannelId: channelId },
      { upsert: true, new: true },
    );

    const { point } = settings || {};

    const customId = !point?.channelId
      ? ButtonCustomId.setup.point_channel.add
      : point?.period
      ? ButtonCustomId.setup.done
      : ButtonCustomId.setup.point_period.add;

    const { newEmbed, row } = setupCustomButtonEmbed({
      nextButton: { customId: customId },
      backButton: { customId: ButtonCustomId.setup.info_channel.edit },
      embed: {
        oldEmbed: interaction.message.embeds[0],
        title: t('setup.infoChannel.selected'),
        description: channelMention(channelId),
      },
      lng,
      t,
    });

    await interaction.deferUpdate();

    await interaction.editReply({ components: [row], embeds: [newEmbed] });
  },
};
