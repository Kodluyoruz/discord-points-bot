import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ComponentType } from 'discord.js';
import { pointInfoEmbed } from 'src/components/embeds/point/pointInfoEmbed';

import { PointUnitsModel } from '@discord-point-bot/models';

export const infoUserPointEmbed = async ({ client, interaction, t }: DiscordType.ButtonArgs) => {
  const pointUnits = await PointUnitsModel.find({ guildId: interaction.guild.id })
    .select('description title')
    .lean();

  const contentCount = pointUnits.length;
  const { embed, back, cancel, next } = pointInfoEmbed({ client, t });

  next.setLabel(t('common.next', { first: '1', second: pointUnits.length }));
  back.setLabel(t('common.back', { first: '0', second: pointUnits.length }));
  cancel.setLabel(t('common.stepByStep'));

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(cancel, next);

  const question = await interaction.deferReply({ ephemeral: true, fetchReply: true });

  await interaction.editReply({
    components: [row],
    embeds: [embed.setDescription(pointUnits[0].description)],
  });

  const collector = question.createMessageComponentCollector({
    filter: (i) => i.user.id === interaction.user.id && i.message.id === question.id,
    time: 1000 * 240,
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
    const { description } = pointUnits[index % contentCount];

    const newEmbed = embed.setDescription(description);
    const newRow = row.setComponents(index > 0 ? [cancel, back, next] : [cancel, next]);

    await button.deferUpdate();
    await interaction.editReply({ embeds: [newEmbed], components: [newRow] });

    collector.resetTimer();
  });

  collector.on('end', async () => {
    await interaction.deleteReply();
  });
};
