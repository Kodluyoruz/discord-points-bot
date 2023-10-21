import { getOptionNames, nameAndDescT } from '@translation';
import { SlashCommandBuilder } from 'discord.js';
import { referralComponents } from 'src/components/embeds/referral/ReferralComponents';
import { getOutcome } from 'src/feature/referral/referral';

export const Referral: DiscordType.ISlashCommand = {
  data: nameAndDescT('referral.command.builder', new SlashCommandBuilder())
    .addUserOption((option) => nameAndDescT('referral.command.options.user', option))
    .addStringOption((option) =>
      nameAndDescT('referral.command.options.code', option).setMinLength(18).setMaxLength(20),
    ),
  async execute({ client, interaction, lng, t }) {
    const names = getOptionNames('referral.command.options', { lng });
    const selectedUser =
      interaction.options.getUser(names['user']) ||
      (interaction.options.get(names['code'])?.value as string);

    await interaction.deferReply({ ephemeral: true });

    const { description, referrer } = await getOutcome({
      client,
      interaction,
      selectedUser,
      lng,
      t,
    });

    const { embed, row } = referralComponents({ client: client, lng, t });
    await interaction.editReply({
      embeds: [embed.setDescription(description)],
      components: referrer ? [] : [row],
    });
  },
};
