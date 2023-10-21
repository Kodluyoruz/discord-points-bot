import { ButtonCustomId, SelectMenuCustomId } from '@discord-point-bot/constants';
import { GuildSettingsModel } from '@discord-point-bot/models';

import { setupCustomButtonEmbed } from './setupCustomButtonEmbed';

export const SetupPeriodSelectMenu: DiscordType.ISelectMenu = {
  customId: SelectMenuCustomId.point_period,
  execute: async ({ interaction, lng, t }) => {
    const [pointPeriod] = interaction.values;

    await GuildSettingsModel.findOneAndUpdate(
      { guildId: interaction.guildId },
      { 'point.period': pointPeriod },
      { upsert: true },
    );

    const { newEmbed, row } = setupCustomButtonEmbed({
      nextButton: { customId: ButtonCustomId.setup.done },
      backButton: { customId: ButtonCustomId.setup.point_period.edit },
      embed: {
        oldEmbed: interaction.message.embeds[0],
        title: t('setup.period.selected'),
        description: t(`setup.period.periods.${pointPeriod.toLowerCase()}`),
      },
      lng,
      t,
    });

    await interaction.deferUpdate();

    await interaction.editReply({ components: [row], embeds: [newEmbed] });
  },
};
