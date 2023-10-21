import { nameAndDescT } from '@translation';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ComponentType,
  SlashCommandBuilder,
} from 'discord.js';

import { pointInfoEmbed } from '@discord-point-bot/components';

export const PointInfo: DiscordType.ISlashCommand = {
  data: nameAndDescT('pointInfos.command.builder', new SlashCommandBuilder()),
  execute: async ({ client, interaction, t }) => {
    const NUM_STEPS = 6;
    const contents = Array.from({ length: NUM_STEPS }, (_, i) =>
      t(`pointInfos.step.${i}.description`),
    );

    const contentCount = contents.length;
    const { embed, back, cancel, next } = pointInfoEmbed({ client, t });

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

      await question.edit({ embeds: [newEmbed], components: [newRow] });

      await button.deferUpdate();
      collector.resetTimer();
    });

    collector.on('end', async () => {
      await question.delete();
    });
  },
};
