import t, { localization } from '@translation';
import { SlashCommandBuilder } from 'discord.js';
import { referralComponents } from 'src/components/embeds/referral/ReferralComponents';
import { getOutcome } from 'src/feature/referral/referral';

export const Referral: DiscordType.ISlashCommand = {
  data: new SlashCommandBuilder()
    .setName(t('referral.command.name'))
    .setNameLocalizations(localization('referral.command.name'))
    .setDescription(t('referral.command.description'))
    .setDescriptionLocalizations(localization('referral.command.description'))
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription(t('referral.command.user'))
        .setDescriptionLocalizations(localization('referral.command.user')),
    )
    .addStringOption((option) =>
      option
        .setName('code')
        .setDescription(t('referral.command.code'))
        .setDescriptionLocalizations(localization('referral.command.code'))
        .setMinLength(18)
        .setMaxLength(20),
    ),
  async execute({ client, interaction, lang }) {
    const selectedUser =
      interaction.options.getUser('user') || (interaction.options.get('code')?.value as string);
    await interaction.deferReply({ ephemeral: true });

    const { result, description, referrer } = await getOutcome({
      client,
      interaction,
      selectedUser,
      lang,
    });

    const { embed, row } = referralComponents({ client: client, lang });
    await interaction.editReply({
      embeds: [embed.setDescription(description)],
      components: referrer ? [] : [row],
    });
  },
};
