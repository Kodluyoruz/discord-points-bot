import { UserSelectMenuInteraction } from 'discord.js';
import { referralComponents } from 'src/components/embeds/referral/ReferralComponents';
import { getOutcome } from 'src/feature/referral/referral';

import { SelectMenuCustomId } from '@discord-point-bot/constants';

export const referrerMenu: DiscordType.ISelectMenu<UserSelectMenuInteraction> = {
  customId: SelectMenuCustomId.referrer,
  execute: async ({ client, interaction, lng, t }) => {
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
      t,
    });

    const { embed, row } = referralComponents({ client, lng, t });
    await interaction.editReply({
      embeds: [embed.setDescription(description)],
      components: referrer ? [] : [row],
    });
  },
};
