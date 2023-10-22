import { translation } from '@translation';
import { Guild, GuildBasedChannel } from 'discord.js';
import { Client } from 'src/structures/Client';

import { pointLogEmbed } from '@discord-point-bot/components';
import {
  GuildSettingsModel,
  IUserPoint,
  ShowGlobalOrUserPointResult,
  UserPointModel,
} from '@discord-point-bot/models';

type PointLogParams = {
  client: Client;
  guild: Guild;
  userId: string;
  point: IUserPoint;
  pointProp: {
    channelId?: string;
    data?: {
      referrer?: string;
      referred?: string;
    };
  };
  value: number;
  t: typeof translation;
};

const embedColor = {
  TEXT: 0x57f287,
  VOICE: 0x5865f2,
  INVITE: 0xfee75c,
  REPLY: 0xeb459e,
  NONE: 0xed4245,
};

async function fetchChannel(
  client: Client,
  guild: Guild,
  channelId: string,
): Promise<GuildBasedChannel> {
  return (
    guild.channels.cache.get(channelId) || (await guild.channels.fetch(channelId).catch(() => null))
  );
}

async function pointLog({ client, guild, userId, point, value, pointProp, t }: PointLogParams) {
  const logChannelId = await GuildSettingsModel.getChannel(guild.id, 'log');
  const logChannel = logChannelId && (await fetchChannel(client, guild, logChannelId));

  if (!logChannelId && !logChannel) {
    client.logger.error(t('settings.channels.errors.notFound', { guild, channel: 'Log' }));
    return;
  }

  if (!logChannel.isTextBased()) {
    client.logger.error(t('settings.channels.errors.typeError', { logChannelId, guild }));
    return;
  }

  const { channelId, data } = pointProp;

  const givenPoints = value * point.type.point;
  const { rank, totalPoints } = (await UserPointModel.showGlobalOrUserPoint({
    guildId: guild.id,
    userId,
  })) as ShowGlobalOrUserPointResult;

  const description = getDescription({
    t,
    pointType: point.type?.type,
    userId,
    channelId,
    value,
    totalPoints,
    givenPoints,
    rank,
    point,
    data,
  });

  const embedProps = getEmbedProps({
    pointType: point.type.type,
    description,
    value,
    pointId: point._id.toHexString(),
    t,
  });

  const { embed, row } = pointLogEmbed({ client, embedProps, t });

  try {
    await logChannel.send({
      embeds: [embed],
      components: [row],
    });
  } catch (error) {
    client.logger.error(t('settings.channels.errors.sendMessageError', { guild, error }));
  }
}

function getDescription({
  t,
  pointType,
  userId,
  channelId,
  value,
  totalPoints,
  givenPoints,
  rank,
  point,
  data,
}: {
  t: typeof translation;
  pointType: string;
  userId: string;
  channelId: string | undefined;
  value: number;
  totalPoints: number;
  givenPoints: number;
  rank: number;
  point: IUserPoint;
  data: {
    referrer?: string;
    referred?: string;
  };
}) {
  return t(`pointLog.embed.type.${pointType?.toLocaleLowerCase() ?? 'none'}`, {
    user: `<@${userId}>`,
    channel: channelId ? `<#${channelId}>` : '',
    value,
    totalPoints,
    givenPoints,
    rank,
    point,
    refText: data?.referrer
      ? '$t(pointLog.embed.refText.referrer)'
      : data?.referred
      ? '$t(pointLog.embed.refText.referred)'
      : null,
    data,
  });
}

function getEmbedProps({
  pointType,
  description,
  value,
  pointId,
}: {
  pointType: string | undefined;
  description: string;
  value: number;
  pointId: string;
  t: typeof translation;
}) {
  return {
    color: embedColor[pointType],
    description,
    buttonId: `user_point_revert/${-value}/${pointId}`,
  };
}

export { pointLog };
