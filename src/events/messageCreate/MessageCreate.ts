import { PointUnitType } from '@discord-point-bot/models';

import { Events, TextChannel } from 'discord.js';
import { UserPointModel } from 'src/models/point';

export const MessageCreate: DiscordType.IEvent = {
  name: Events.MessageCreate,
  execute: async (client, [message]: DiscordType.ArgsOf<'messageCreate'>) => {
    if (message.author.bot || !message.guild) {
      return;
    }

    const [guild, userId, channelId, categoryId] = [
      message.guild,
      message.author.id,
      message.channel.id,
      (message.channel as TextChannel)?.parentId,
    ];

    const type = message.reference ? PointUnitType.REPLY : PointUnitType.TEXT;

    await UserPointModel.pointAdd({
      guild,
      userId,
      type,
      value: 1,
      channelId,
      categoryId,
    });
  },
};
