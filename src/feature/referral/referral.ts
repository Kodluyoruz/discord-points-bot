import { IPointUnits, PointUnitType, UserPointModel } from '@discord-point-bot/models';

import t from '@translation';
import { Guild, GuildMember, Interaction, Locale, UserResolvable } from 'discord.js';
import { Client } from 'src/structures/Client';

interface ReferralParams {
  client: Client;
  interaction: Interaction;
  selectedUser: UserResolvable;
  lang: Locale;
}

async function addPoints(guild: Guild, userId: string, referrerId: string) {
  const pointData = {
    guild,
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

type ReferralOutcome = 'default' | 'alreadyReferred' | 'userNotFound' | 'success' | 'error';
type ReferralResult = { result: ReferralOutcome; description?: string; referrer?: GuildMember };

export async function getOutcome(params: ReferralParams): Promise<ReferralResult> {
  const { client, interaction, selectedUser, lang } = params;
  const {
    guild,
    user: { id: userId },
  } = interaction;
  const { referrerId, referredCount, pointUnit } = await UserPointModel.getReferralData({
    guildId: guild.id,
    userId,
  });
  let referrerMember = await getMember(interaction, referrerId);
  const selectedMember = await getMember(interaction, selectedUser);

  let result: ReferralOutcome = 'success';

  if (!selectedUser) {
    result = 'default';
  } else if (!pointUnit) {
    result = 'error';
  } else if (referrerMember) {
    result = 'alreadyReferred';
  } else if (!selectedMember || selectedMember.user.id === userId || selectedMember.user.bot) {
    result = 'userNotFound';
  } else {
    await addPoints(guild, userId, selectedMember.id);
    referrerMember = selectedMember;
  }

  const description = getDescription({
    result,
    code: interaction.user.id,
    command: client.slashCommands.get(t('referral.command.name')),
    referredCount,
    referrer: referrerMember,
    pointUnit,
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
  pointUnit,
  lang,
}: {
  result: string;
  code: string;
  command: DiscordType.ISlashCommand;
  referredCount: number;
  referrer: GuildMember;
  pointUnit: IPointUnits;
  lang: string;
}) {
  return t(`referral.embed.${result}`, {
    code,
    command: { id: command.applicationCommand?.id, name: command.data.name },
    referredCount,
    referrer: referrer?.toString() || t('referral.embed.noReferral', { lang }),
    pointUnit: pointUnit ?? {
      title: t('referral.embed.noPointUnit', { lang }),
      description: t('referral.embed.noPointUnit', { lang }),
      point: 0,
    },
    lang,
  });
}
