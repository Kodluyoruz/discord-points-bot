import { Events } from 'discord.js';

export const MessageCreate: DiscordType.IEvent = {
  name: Events.MessageCreate,
  execute: (client, [message]: DiscordType.ArgsOf<'messageCreate'>) => {
    if (message.author.bot || !message.guild) return;

  },
};
