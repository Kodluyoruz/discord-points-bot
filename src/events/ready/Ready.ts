export const Ready: DiscordType.IEvent = {
  name: 'ready',
  execute: (client) => {
    console.log(`${client.user.tag} is online!`);
  },
};
