import { translation } from '@translation';
import { Guild, GuildMember, Interaction, Locale, UserResolvable } from 'discord.js';
import { Client } from 'src/structures/Client';

import { IPointUnits, PointUnitType, UserPointModel } from '@discord-point-bot/models';

interface ReferralParams {
  client: Client;
  interaction: Interaction;
  selectedUser: UserResolvable;
  lng: Locale;
  t: typeof translation;
}

type AddPointsParams = {
  guild: Guild;
  userId: string;
  referrerId: string;
  t: typeof translation;
};

async function addPoints({ guild, userId, referrerId, t }: AddPointsParams) {
  const pointData = {
    guild,
    type: PointUnitType.INVITE,
    value: 1,
  };
  await UserPointModel.pointAdd({
    ...pointData,
    userId,
    data: { referrer: referrerId },
    t,
  });
  await UserPointModel.pointAdd({
    ...pointData,
    userId: referrerId,
    data: { referred: userId },
    t,
  });
}

type ReferralOutcome = 'default' | 'alreadyReferred' | 'userNotFound' | 'success' | 'error';
type ReferralResult = {
  result: ReferralOutcome;
  description?: string;
  referrer?: GuildMember;
};

export async function getOutcome(params: ReferralParams): Promise<ReferralResult> {
  const { client, interaction, selectedUser, lng, t } = params;
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
    await addPoints({ guild, userId, referrerId: selectedMember.id, t });
    referrerMember = selectedMember;
  }

  const description = getDescription({
    result,
    code: interaction.user.id,
    command: client.slashCommands.get(t('referral.command.builder.name')),
    referredCount,
    referrer: referrerMember,
    pointUnit,
    lng,
    t,
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
  lng,
  t,
}: {
  result: string;
  code: string;
  command: DiscordType.ISlashCommand;
  referredCount: number;
  referrer: GuildMember;
  pointUnit: IPointUnits;
  lng: string;
  t: typeof translation;
}) {
  return t(`referral.embed.${result}`, 'referral.embed.default', {
    code,
    command: { id: command.applicationCommand?.id, name: command.data.name },
    referredCount,
    referrer: referrer?.toString() || '$t(referral.embed.noReferral)',
    pointUnit: pointUnit ?? {
      title: '$t(referral.embed.noPointUnit)',
      description: '$t(referral.embed.noPointUnit)',
      point: 0,
    },
    lng,
  });
}
