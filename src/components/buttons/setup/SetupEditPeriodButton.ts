import { ButtonCustomId } from '@discord-point-bot/constants';
import { GuildSettingsModel } from '@discord-point-bot/models';

import { setupPeriodEmbed } from 'src/components/embeds/setup/setupPeriodEmbed';

export const SetupEditPeriodButton: DiscordType.IButton = {
  customId: ButtonCustomId.EDIT_POINT_PERIOD,
  execute: async ({ client, interaction, lang }) => {
    const guildSetting = await GuildSettingsModel.findOne({ guildId: interaction.guildId })
      .select('pointPeriod')
      .lean();

    const { embed, row } = await setupPeriodEmbed({
      client,
      guild: interaction.guild,
      period: guildSetting?.pointPeriod,
      lang,
    });

    interaction.update({ components: [row], embeds: [embed] });
  },
};
