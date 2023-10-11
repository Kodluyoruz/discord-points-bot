/* eslint-disable no-var */
import { PointUnitType, PointUnitsModel } from '@discord-point-bot/models';

import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

import { ButtonCustomId } from './../../../constants/customIds/ButtonCustomId';

export const AddUnitButton: DiscordType.IButton = {
  customId: 'point_unit',
  execute: async ({ interaction }) => {
    const modal = new ModalBuilder().setCustomId('pointUnit').setTitle('Puanlama Birimi Ekle');

    const scoringNameInput = new TextInputBuilder()
      .setCustomId(ButtonCustomId.point_unit.add_unit.scoring_name)

      .setLabel('Puanlama İsmi Giriniz.')

      .setStyle(TextInputStyle.Short);

    const scoringDescInput = new TextInputBuilder()
      .setCustomId(ButtonCustomId.point_unit.add_unit.scoring_desc)
      .setLabel('Puanlama Birimini Açıklayınız.')

      .setStyle(TextInputStyle.Paragraph);

    const pointScoreInput = new TextInputBuilder()
      .setCustomId(ButtonCustomId.point_unit.add_unit.point_score)

      .setLabel('Yeni Puan Giriniz.')

      .setStyle(TextInputStyle.Short);
    const firstActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(scoringNameInput);
    const secondActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(
      scoringDescInput,
    );
    const thirdActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(pointScoreInput);

    modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

    await interaction.showModal(modal);


  },
};
