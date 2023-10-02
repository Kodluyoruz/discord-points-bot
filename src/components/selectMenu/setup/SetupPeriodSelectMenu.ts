import { ButtonCustomId, SelectMenuCustomId } from '@discord-point-bot/constants';
import { GuildSettingsModel } from '@discord-point-bot/models';

import translation from '@translation';

import { setupCustomButtonEmbed } from './setupCustomButtonEmbed';

export const SetupPeriodSelectMenu: DiscordType.ISelectMenu = {
  customId: SelectMenuCustomId.point_period,
  execute: async ({ client, interaction, lang }) => {
    const [pointPeriod] = interaction.values;

    await GuildSettingsModel.findOneAndUpdate(
      { guildId: interaction.guildId },
      { 'point.period': pointPeriod },
      { upsert: true },
    );

    const { newEmbed, row } = setupCustomButtonEmbed({
      nextButon: { customId: ButtonCustomId.setup.done },
      backButon: { customId: ButtonCustomId.setup.point_period.edit },
      embed: {
        oldEmbed: interaction.message.embeds[0],
        title: translation('setup.period.selected', { lang }),
        description: pointPeriod,
      },
      lang,
    });

    await interaction.deferUpdate();

    await interaction.editReply({ components: [row], embeds: [newEmbed] });
  },
};
