import { ButtonCustomId } from '@discord-point-bot/constants';

import { setupPeriodEmbed } from 'src/components/embeds';

export const SetupPeriodButton: DiscordType.IButton = {
  customId: ButtonCustomId.POINT_PERIOD,
  execute: async ({ client, interaction, lang }) => {
    const { embed, row } = await setupPeriodEmbed({ client, guild: interaction.guild, lang });

    interaction.update({ components: [row], embeds: [embed] });
  },
};
