import translation from '@translation';

export const Ping: DiscordType.ICommand = {
  usages: ['ping'],
  execute: async ({ client, message }) => {
    message.channel.send(translation('ping.success'));
  },
};
