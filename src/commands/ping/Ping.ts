import i18next from 'i18next';

export const Ping: DiscordType.ICommand = {
  usages: ['ping'],
  execute: async ({ client, message }) => {
    message.channel.send(i18next.t(`ping.success`));
  },
};