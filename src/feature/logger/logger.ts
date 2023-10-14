import { GuildSettingsModel } from '@discord-point-bot/models';

import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Guild } from 'discord.js';
import { Types } from 'mongoose';
import { Client } from 'src/structures/Client';

async function pointLog(
  client: Client,
  guild: Guild,
  userId: string,
  _id: Types.ObjectId,
  value: number,
) {
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
    client.logger.error(`PointLog: client.user bulunamadı. `);
    return;
  }

  const logEmbed = new EmbedBuilder()
    .setColor(0x51da5e)
    .setDescription(`<@${userId}>, ${value} puan kazandı!\n(${_id})`);

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
    new ButtonBuilder()
      .setCustomId(`user_point_revert/${-value}/${_id}`)
      .setLabel('Puanı Sil')
      .setStyle(ButtonStyle.Primary),
  ]);

  try {
    await logChannel.send({
      embeds: [logEmbed],
      components: [row],
    });
  } catch (error) {
    client.logger.error(
      `PointLog: Log kanalına mesaj gönderilemedi. Guild: ${guild.name}(${guild.id}) - ${error}`,
    );
  }
}

export { pointLog };
