import { ButtonCustomId, SelectMenuCustomId } from '@discord-point-bot/constants';
import { GuildSettingsModel } from '@discord-point-bot/models';

import translation from '@translation';
import { channelMention } from 'discord.js';

import { setupCustomButtonEmbed } from './setupCustomButtonEmbed';

export const SetupInfoSelectMenu: DiscordType.ISelectMenu = {
  customId: SelectMenuCustomId.info_channel,
  execute: async ({ client, interaction, lang }) => {
    const [channelId] = interaction.values;

    const settings = await GuildSettingsModel.findOneAndUpdate(
      { guildId: interaction.guildId },
      { infoChannelId: channelId },
      { upsert: true, new: true },
    );

    const { point } = settings || {};

    const customId = !point?.channelId
      ? ButtonCustomId.setup.point_channel.add
      : !point?.period
      ? ButtonCustomId.setup.point_period.add
      : ButtonCustomId.setup.done;

    const { newEmbed, row } = setupCustomButtonEmbed({
      nextButon: { customId: customId },
      backButon: { customId: ButtonCustomId.setup.info_channel.edit },
      embed: {
        oldEmbed: interaction.message.embeds[0],
        title: translation('setup.infoChannel.selected', { lang }),
        description: channelMention(channelId),
      },
      lang,
    });

    await interaction.deferUpdate();

    await interaction.editReply({ components: [row], embeds: [newEmbed] });
  },
};
