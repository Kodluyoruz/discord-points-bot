import { pointInfoEmbed } from '@discord-point-bot/components';

import translation from '@translation';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ComponentType,
  SlashCommandBuilder,
} from 'discord.js';

export const PointInfo: DiscordType.ISlashCommand = {
  data: new SlashCommandBuilder().setName('point').setDescription('point biilgilendirme.'),
  execute: async ({ client, interaction, lang }) => {
    const contents = Array.from({ length: 6 }, (_, i) =>
      translation(`pointInfos.step${i + 1}.description`, { lang }),
    );

    const contentCount = contents.length;
    const { embed, back, cancel, next } = pointInfoEmbed({ client });

    next.setLabel(translation('common.next', { first: '2', second: contents.length }));
    back.setLabel(translation('common.back', { first: '0', second: contents.length }));
    cancel.setLabel(translation('common.stepByStep'));

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(cancel, next);

    const question = await interaction.reply({
      components: [row],
      embeds: [embed.setDescription(contents[0])],
    });

    const collector = question.createMessageComponentCollector({
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

      next.setLabel(translation('common.next', { first: index + 2, second: contentCount }));
      back.setLabel(translation('common.back', { first: index, second: contentCount }));
      cancel.setDisabled(false);

      if (contentCount - 1 === index) {
        next.setLabel(translation('common.complete'));
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
