import { pointUnitEmbed } from '../../components/embeds/pointUnit/pointUnitEmbed';

import t from '@translation';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ComponentType,
  LocaleString,
  LocalizationMap,
  SlashCommandBuilder,
} from 'discord.js';

const LANGS: Array<LocaleString> = ['tr', 'en-US'];

const descriptionLocalizations = LANGS.reduce(
  (acc, item) => ({
    ...acc,
    [item]: t(`pointUnit.command.description`, { lang: item }),
  }),
  {} as LocalizationMap,
);

export const PointUnit: DiscordType.ISlashCommand = {
  data: new SlashCommandBuilder()
    .setName('unit')
    .setDescription(t('pointInfos.command.description'))
    .setDescriptionLocalizations(descriptionLocalizations),
  execute: async ({ client, interaction, lang }) => {
  
    const { embed, roomSelection ,addUnit,infoUnit} = pointUnitEmbed({ client });

    roomSelection.setLabel(t('pointUnit.common.roomSelection', { first: '0'}));
    addUnit.setLabel(t('pointUnit.common.addUnit', { first: '1'}));
    infoUnit.setLabel(t('pointUnit.common.infoUnit', { first: '2'}));


    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(roomSelection,addUnit,infoUnit);

    const question = await interaction.reply({
      components: [row],
      embeds: [embed.setDescription(t(`pointUnit.description`, { lang }))],
    });

    const collector = question.createMessageComponentCollector({
      time: 1000 * 30,
      componentType: ComponentType.Button,
    });

    collector.on('collect', async (button: ButtonInteraction) => {
      if (button.customId === 'addUnit') {
    
      }});

  },
};
