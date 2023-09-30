import { ButtonCustomId } from '@discord-point-bot/constants';

import { setupDoneEmbed } from 'src/components/embeds';

export const SetupDoneButton: DiscordType.IButton = {
  customId: ButtonCustomId.SETUP_DONE,
  execute: async ({ client, interaction, lang }) => {
    const { embed, row } = await setupDoneEmbed({ client, guild: interaction.guild, lang });

    interaction.update({ components: [row], embeds: [embed] });
  },
};
