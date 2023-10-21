import { translation } from '@translation';
import { Guild } from 'discord.js';
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
    data?: unknown;
  };
  value: number;
  t: typeof translation;
};

async function pointLog({ client, guild, userId, point, value, pointProp, t }: PointLogParams) {
  const { logChannelId } = await GuildSettingsModel.findOne({ guildId: guild.id })
    .select('logChannelId')
    .lean();

  if (!logChannelId) {
    client.logger.error(`PointLog: Log kanalı bulunamadı. Guild: ${guild.name}(${guild.id})`);
    return;
  }
  const logChannel =
    guild.channels.cache.find((c) => c.id === logChannelId) ||
    (await guild.channels.fetch(logChannelId));

  if (!logChannel) {
    client.logger.error(
      `PointLog: Log ayarı olan ${logChannelId} kanalı bulunamadı. Guild: ${guild.name}(${guild.id})`,
    );
    return;
  }
  if (!logChannel.isTextBased()) {
    client.logger.error(
      `PointLog: Log ayarı olan ${logChannelId} kanalı metin kanalı değil. Guild: ${guild.name}(${guild.id})`,
    );
    return;
  }

  if (!client.user) {
    client.logger.error(`PointLog: client.user bulunamadı.`);
    return;
  }
  const { channelId } = pointProp;
  const { data } = pointProp as {
    data: {
      referrer?: string;
      referred?: string;
    };
  };
  const givenPoints = value * point.type.point;
  const { rank, totalPoints } = (await UserPointModel.showGlobalOrUserPoint({
    guildId: guild.id,
    userId,
  })) as ShowGlobalOrUserPointResult;

  const embedColor = {
    TEXT: 0x57f287,
    VOICE: 0x5865f2,
    INVITE: 0xfee75c,
    REPLY: 0xeb459e,
    NONE: 0xed4245,
  };

  const description = t(`pointLog.embed.type.${point.type?.type.toLocaleLowerCase() ?? 'none'}`, {
    user: `<@${userId}>`,
    channel: channelId ? `<#${channelId}>` : '',
    value,
    totalPoints,
    givenPoints,
    rank,
    point,
    refText: data?.referrer
      ? t('pointLog.embed.refText.referrer', { data })
      : data?.referred
      ? t('pointLog.embed.refText.referred', { data })
      : null,
  });
  const embedProps = {
    color: embedColor[point.type?.type],
    description,
    buttonId: `user_point_revert/${-value}/${point._id}`,
  };
  const { embed, row } = pointLogEmbed({ client, embedProps, t });
  try {
    await logChannel.send({
      embeds: [embed],
      components: [row],
    });
  } catch (error) {
    client.logger.error(
      `PointLog: Log kanalına mesaj gönderilemedi. Guild: ${guild.name}(${guild.id}) - ${error}`,
    );
  }
}

export { pointLog };
