import { ButtonCustomId, SelectMenuCustomId } from '@discord-point-bot/constants';
import { GuildSettingsModel } from '@discord-point-bot/models';

import translation from '@translation';
import { channelMention } from 'discord.js';

import { setupCustomButtonEmbed } from './setupCustomButtonEmbed';

export const SetupLogSelectMenu: DiscordType.ISelectMenu = {
  customId: SelectMenuCustomId.log_channel,
  execute: async ({ interaction, lang }) => {
    const [channelId] = interaction.values;

    const settings = await GuildSettingsModel.findOneAndUpdate(
      { guildId: interaction.guildId },
      { logChannelId: channelId },
      { upsert: true, new: true },
    );

    const { adminChannelId, point } = settings || {};

    const customId = !adminChannelId
      ? ButtonCustomId.setup.admin_channel.add
      : !point?.channelId
      ? ButtonCustomId.setup.point_period.add
      : ButtonCustomId.setup.done;

    const { newEmbed, row } = setupCustomButtonEmbed({
      nextButon: { customId: customId },
      backButon: { customId: ButtonCustomId.setup.log_channel.edit },
      embed: {
        oldEmbed: interaction.message.embeds[0],
        title: translation('setup.logChannel.selected', { lang }),
        description: channelMention(channelId),
      },
      lang,
    });

    await interaction.deferUpdate();

    await interaction.editReply({ components: [row], embeds: [newEmbed] });
  },
};
