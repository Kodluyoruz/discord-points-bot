import { getDefLanguage, translation } from '@translation';
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
  const userPointData = {
    ...pointData,
    userId,
    data: { referrer: referrerId },
    t,
  };
  const referrerPointData = {
    ...pointData,
    userId: referrerId,
    data: { referred: userId },
    t,
  };
  await UserPointModel.pointAdd(userPointData);
  await UserPointModel.pointAdd(referrerPointData);
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

  const result: ReferralOutcome = getReferralOutcome(
    selectedUser,
    pointUnit,
    referrerMember,
    selectedMember,
    userId,
  );

  if (result === 'success') {
    await addPoints({
      guild,
      userId,
      referrerId: selectedMember.id,
      t,
    });
    referrerMember = selectedMember;
  }

  const description = getDescription({
    result,
    code: interaction.user.id,
    command: client.slashCommands.get(
      t('referral.command.builder.name', { lng: getDefLanguage() }),
    ),
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

function getReferralOutcome(
  selectedUser: UserResolvable,
  pointUnit: IPointUnits,
  referrerMember: GuildMember,
  selectedMember: GuildMember,
  userId: string,
): ReferralOutcome {
  switch (true) {
    case !selectedUser:
      return 'default';
    case !pointUnit:
      return 'error';
    case !!referrerMember:
      return 'alreadyReferred';
    case !selectedMember || selectedMember.user.id === userId || selectedMember.user.bot:
      return 'userNotFound';
    default:
      return 'success';
  }
}

export async function getMember(interaction: Interaction, user: UserResolvable) {
  return user && (await interaction.guild.members.fetch(user).catch(() => null));
}

interface DescriptionParams {
  result: ReferralOutcome;
  code: string;
  command: DiscordType.ISlashCommand;
  referredCount: number;
  referrer: GuildMember;
  pointUnit: IPointUnits;
  lng: string;
  t: typeof translation;
}

export function getDescription(params: DescriptionParams) {
  const { result, code, command, referredCount, referrer, pointUnit, t } = params;
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
  });
}
