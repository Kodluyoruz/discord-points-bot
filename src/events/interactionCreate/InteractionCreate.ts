import { Events } from 'discord.js';

export const InteractionCreate: DiscordType.IEvent = {
  name: Events.InteractionCreate,
  execute: async (client, [interaction]: DiscordType.ArgsOf<'interactionCreate'>) => {
    if (interaction.isCommand()) {
      const command = client.slashCommands.get(interaction.commandName);

      command.execute({ client, interaction });
    }
  },
};
