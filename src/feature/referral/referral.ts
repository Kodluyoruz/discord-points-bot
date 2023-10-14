import { PointUnitType, UserPointModel } from '@discord-point-bot/models';

import t from '@translation';
import { GuildMember, Interaction, Locale, UserResolvable } from 'discord.js';
import { Client } from 'src/structures/Client';

interface ReferralParams {
  client: Client;
  interaction: Interaction;
  selectedUser: UserResolvable;
  lang: Locale;
}

async function addPoints(guildId: string, userId: string, referrerId: string) {
  const pointData = {
    guildId,
    type: PointUnitType.INVITE,
    value: 1,
  };
  await UserPointModel.pointAdd({
    ...pointData,
    userId,
    data: { referrer: referrerId },
  });
  await UserPointModel.pointAdd({
    ...pointData,
    userId: referrerId,
    data: { referred: userId },
  });
}

type ReferralOutcome = 'default' | 'alreadyReferred' | 'userNotFound' | 'success';
type ReferralResult = { result: ReferralOutcome; description?: string; referrer?: GuildMember };

export async function getOutcome(params: ReferralParams): Promise<ReferralResult> {
  const { client, interaction, selectedUser, lang } = params;
  const {
    guildId,
    user: { id: userId },
  } = interaction;
  const { referrerId, referredCount } = await UserPointModel.getReferralData({
    guildId,
    userId,
  });
  let referrerMember = await getMember(interaction, referrerId);
  const selectedMember = await getMember(interaction, selectedUser);

  let result: ReferralOutcome = 'success';

  if (!selectedUser) {
    result = 'default';
  } else if (referrerMember) {
    result = 'alreadyReferred';
  } else if (!selectedMember || selectedMember.user.id === userId || selectedMember.user.bot) {
    result = 'userNotFound';
  } else {
    await addPoints(guildId, userId, selectedMember.id);
    referrerMember = selectedMember;
  }

  const description = getDescription({
    result,
    code: interaction.user.id,
    command: client.slashCommands.get(t('referral.command.name')),
    referredCount,
    referrer: referrerMember,
    lang,
  });

  return {
    result,
    description,
    referrer: referrerMember,
  };
}

export async function getMember(interaction: Interaction, user: UserResolvable) {
  return user && (await interaction.guild.members.fetch(user).catch(() => null));
}

export function getDescription({
  result,
  code,
  command,
  referredCount,
  referrer,
  lang,
}: {
  result: string;
  code: string;
  command: DiscordType.ISlashCommand;
  referredCount: number;
  referrer: GuildMember;
  lang: string;
}) {
  return t(`referral.embed.${result}`, {
    code,
    command: { id: command.applicationCommand?.id, name: command.data.name },
    referredCount,
    referrer: referrer?.toString() || t('referral.embed.noReferral', { lang }),
    lang,
  });
}
