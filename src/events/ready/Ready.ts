import { Events, SlashCommandBuilder } from 'discord.js';
import { flatMap } from 'lodash';

export const Ready: DiscordType.IEvent = {
  name: Events.ClientReady,
  execute: async ({ slashCommands, user, logger, application }) => {
    try {
      const commands: SlashCommandBuilder[] = flatMap(Array.from(slashCommands.values()), 'data');

      commands.forEach((command) => {
        command.setDMPermission(false);
      });

      const commandsList = await application.commands.set(commands);

      commands.forEach((command) => {
        slashCommands.get(command.name).applicationCommand = commandsList.find(
          (c) => c.name === command.name,
        );
      });
    } catch (error) {
      logger.error(error);
    }

    logger.info(`${user.tag} is online!`);
  },
};
