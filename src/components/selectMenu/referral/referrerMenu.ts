import { SelectMenuCustomId } from '@discord-point-bot/constants';

import { UserSelectMenuInteraction } from 'discord.js';
import { referralComponents } from 'src/components/embeds/referral/ReferralComponents';
import { getOutcome } from 'src/feature/referral/referral';

export const referrerMenu: DiscordType.ISelectMenu<UserSelectMenuInteraction> = {
  customId: SelectMenuCustomId.referrer,
  execute: async ({ client, interaction, lng }) => {
    const selectedUser = interaction.users.first();
    if (!selectedUser) {
      return;
    }

    await interaction.deferUpdate();

    const { description, referrer } = await getOutcome({
      client,
      interaction,
      selectedUser,
      lng,
    });

    const { embed, row } = referralComponents({ client, lng });
    await interaction.editReply({
      embeds: [embed.setDescription(description)],
      components: referrer ? [] : [row],
    });
  },
};
