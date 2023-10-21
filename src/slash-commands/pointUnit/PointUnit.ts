import { nameAndDescT } from '@translation';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ComponentType,
  SlashCommandBuilder,
} from 'discord.js';
import { pointUnitEmbed } from 'src/components/embeds/pointUnit/pointUnitEmbed';

export const PointUnit: DiscordType.ISlashCommand = {
  data: nameAndDescT('pointUnit.command.builder', new SlashCommandBuilder()),
  execute: async ({ client, interaction, t }) => {
    const { embed, roomSelection, addUnit, infoUnit } = pointUnitEmbed({ client, t });

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
      embeds: [embed.setDescription(t(`pointUnit.description`))],
    });

    const collector = question.createMessageComponentCollector({
      time: 1000 * 30,
      componentType: ComponentType.Button,
    });

    collector.on('collect', async (button: ButtonInteraction) => {
      if (button.customId === 'addUnit') {
        /* empty */
      }
    });
  },
};
