import { ButtonCustomId } from '@discord-point-bot/constants';

import { setupAdminEmbed } from 'src/components/embeds';

export const SetupAdminButton: DiscordType.IButton = {
  customId: ButtonCustomId.ADMIN_CHANNEL,
  execute: async ({ client, interaction, lang }) => {
    const { embed, row } = await setupAdminEmbed({ client, guild: interaction.guild, lang });

    interaction.update({ components: [row], embeds: [embed] });
  },
};
