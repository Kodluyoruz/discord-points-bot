import { Events, SlashCommandBuilder } from 'discord.js';
import { flatMap } from 'lodash';

export const Ready: DiscordType.IEvent = {
  name: Events.ClientReady,
  execute: async ({ slashCommands, guilds, user, logger }) => {
    for (const guild of guilds.cache.map((g) => g)) {
      try {
        const commands: SlashCommandBuilder[] = flatMap(Array.from(slashCommands.values()), 'data');

        await guild.commands.set(commands);
      } catch (e) {
        logger.error(e);
      }
    }

    logger.info(`${user.tag} is online!`);
  },
};
