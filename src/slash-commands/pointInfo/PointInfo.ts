import { pointInfoEmbed } from '@discord-point-bot/components';

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
    [item]: t(`pointInfos.command.description`, { lang: item }),
  }),
  {} as LocalizationMap,
);

export const PointInfo: DiscordType.ISlashCommand = {
  data: new SlashCommandBuilder()
    .setName('point')
    .setDescription(t('pointInfos.command.description'))
    .setDescriptionLocalizations(descriptionLocalizations),
  execute: async ({ client, interaction, lang }) => {
    const NUM_STEPS = 6;
    const contents = Array.from({ length: NUM_STEPS }, (_, i) =>
      t(`pointInfos.step.${i}.description`, { lang }),
    );

    const contentCount = contents.length;
    const { embed, back, cancel, next } = pointInfoEmbed({ client });

    next.setLabel(t('common.next', { first: '2', second: contents.length }));
    back.setLabel(t('common.back', { first: '0', second: contents.length }));
    cancel.setLabel(t('common.stepByStep'));

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(cancel, next);

    const question = await interaction.deferReply({ fetchReply: true });

    await interaction.editReply({
      components: [row],
      embeds: [embed.setDescription(contents[0])],
    });

    const collector = question.createMessageComponentCollector({
      filter: (i) => i.user.id === interaction.user.id && i.message.id === question.id,
      time: 1000 * 30,
      componentType: ComponentType.Button,
    });

    let index = 0;

    collector.on('collect', async (button: ButtonInteraction) => {
      if (button.customId === 'next') {
        index++;
      } else if (button.customId === 'back') {
        index--;
      } else {
        return collector.stop();
      }

      next.setLabel(t('common.next', { first: index + 2, second: contentCount }));
      back.setLabel(t('common.back', { first: index, second: contentCount }));
      cancel.setDisabled(false);

      if (contentCount - 1 === index) {
        next.setLabel(t('common.complete'));
        cancel.setDisabled(true);
      } else if (contentCount - 1 < index) {
        return collector.stop();
      }
      const description = contents[index % contentCount];

      const newEmbed = embed.setDescription(description);
      const newRow = row.setComponents(index > 0 ? [cancel, back, next] : [cancel, next]);

      question.edit({ embeds: [newEmbed], components: [newRow] });

      button.deferUpdate();
      collector.resetTimer();
    });

    collector.on('end', (_, reason) => {
      question.delete();
    });
  },
};
