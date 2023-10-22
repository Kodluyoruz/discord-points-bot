import { channelMention } from 'discord.js';
import { setupRoutes } from 'src/components/Buttons/setup/routes';
import { ChannelSettingType } from 'src/models/guildSettings/GuildSettings';

import { ButtonCustomId, SelectMenuCustomId } from '@discord-point-bot/constants';
import { GuildSettingsModel } from '@discord-point-bot/models';

import { setupCustomButtonEmbed } from './setupCustomButtonEmbed';

export const SetupChannelSelectMenu: DiscordType.ISelectMenu = {
  customId: SelectMenuCustomId.channel,
  execute: async ({ interaction, lng, t }) => {
    const [, param] = interaction.customId.split('?');
    const channelSettingType = param as ChannelSettingType;

    const [channelId] = interaction.values;

    await GuildSettingsModel.setChannel(interaction.guild.id, {
      [channelSettingType]: channelId,
    });

    const setupParams = setupRoutes.find((route) => route.customId === 'channel')?.params || [];
    const channelIndex = setupParams.findIndex((param) => param === channelSettingType);

    let nextButton;
    const backButton = { customId: ButtonCustomId.setup.channel.edit, customIdParam: param };

    if (channelIndex === -1) {
      return;
    } else if (channelIndex === setupParams.length - 1) {
      nextButton = { customId: ButtonCustomId.setup.point_period.add };
    } else {
      nextButton = {
        customId: ButtonCustomId.setup.channel.add,
        customIdParam: setupParams.at(channelIndex + 1),
      };
    }

    const { newEmbed, row } = setupCustomButtonEmbed({
      nextButton,
      backButton,
      embed: {
        oldEmbed: interaction.message.embeds[0],
        title: t(`setup.channel.${channelSettingType}.selected`),
        description: channelMention(channelId),
      },
      lng,
      t,
    });

    await interaction.deferUpdate();

    await interaction.editReply({ components: [row], embeds: [newEmbed] });
    return;
  },
};
