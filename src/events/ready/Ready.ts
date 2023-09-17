import { Events, SlashCommandBuilder } from 'discord.js';
import { flatMap } from 'lodash';

export const Ready: DiscordType.IEvent = {
  name: Events.ClientReady,
  execute: async ({ slashCommands, guilds, user, application }) => {
    for (const guild of guilds.cache.map((g) => g)) {
      try {
        const commands: SlashCommandBuilder[] = flatMap(Array.from(slashCommands.values()), 'data');

        await guild.commands.set(commands);
      } catch (e) {
        console.error(e);
      }
    }

    console.log(`${user.tag} is online!`);
  },
};
