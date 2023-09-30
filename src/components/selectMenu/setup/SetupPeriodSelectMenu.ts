import { ButtonCustomId, SelectMenuCustomId } from '@discord-point-bot/constants';
import { GuildSettingsModel } from '@discord-point-bot/models';

import translation from '@translation';

import { setupCustomButtonEmbed } from './setupCustomButtonEmbed';

export const SetupPeriodSelectMenu: DiscordType.ISelectMenu = {
  customId: SelectMenuCustomId.POINT_PERIOD,
  execute: async ({ client, interaction, lang }) => {
    const [pointPeriod] = interaction.values;

    await GuildSettingsModel.findOneAndUpdate(
      { guildId: interaction.guildId },
      { pointPeriod },
      { upsert: true },
    );

    const { newEmbed, row } = setupCustomButtonEmbed({
      nextButon: { customId: ButtonCustomId.SETUP_DONE },
      backButon: { customId: ButtonCustomId.EDIT_POINT_PERIOD },
      embed: {
        oldEmbed: interaction.message.embeds[0],
        title: translation('setup.period.selected', { lang }),
        description: pointPeriod,
      },
      lang,
    });

    await interaction.deferUpdate();

    interaction.editReply({ components: [row], embeds: [newEmbed] });
  },
};
