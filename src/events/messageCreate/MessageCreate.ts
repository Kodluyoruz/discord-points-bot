import { config } from '@config';

export const MessageCreate: DiscordType.IEvent = {
  name: 'messageCreate',
  execute: (client, [message]: DiscordType.ArgsOf<'messageCreate'>) => {
    const prefix = config.PREFIX;
    if (message.author.bot || !message.guild || !message.content.startsWith(prefix)) return;

    const [commandName, ...args] = message.content.slice(prefix.length).trim().split(' ');
    const command = client.commands.find((command) =>
      command.usages.includes(commandName.toLowerCase()),
    );

    command.execute({ client, message, args });
  },
};
