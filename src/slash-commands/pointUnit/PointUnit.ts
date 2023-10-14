import t, { localization } from '@translation';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ComponentType,
  SlashCommandBuilder,
} from 'discord.js';

import { pointUnitEmbed } from '../../components/embeds/pointUnit/pointUnitEmbed';

export const PointUnit: DiscordType.ISlashCommand = {
  data: new SlashCommandBuilder()
    .setName('unit')
    .setDescription(t('pointInfos.command.description'))
    .setDescriptionLocalizations(localization('pointUnit.command.description')),
  execute: async ({ client, interaction, lng }) => {
    const { embed, roomSelection, addUnit, infoUnit } = pointUnitEmbed({ client });

    roomSelection.setLabel(t('pointUnit.common.roomSelection', { first: '0' }));
    addUnit.setLabel(t('pointUnit.common.addUnit', { first: '1' }));
    infoUnit.setLabel(t('pointUnit.common.infoUnit', { first: '2' }));

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      roomSelection,
      addUnit,
      infoUnit,
    );

    const question = await interaction.reply({
      components: [row],
      embeds: [embed.setDescription(t(`pointUnit.description`, { lng }))],
    });

    const collector = question.createMessageComponentCollector({
      time: 1000 * 30,
      componentType: ComponentType.Button,
    });

    collector.on('collect', async (button: ButtonInteraction) => {
      if (button.customId === 'addUnit') {
      }
    });
  },
};
