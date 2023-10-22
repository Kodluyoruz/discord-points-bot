import { getFixedT } from '@translation';
import { Events } from 'discord.js';

export const InteractionCreate: DiscordType.IEvent = {
  name: Events.InteractionCreate,
  execute: async (client, [interaction]: DiscordType.ArgsOf<'interactionCreate'>) => {
    const defaultArgs: Omit<DiscordType.IInteractionArgs, 'interaction'> = {
      client,
      lng: interaction.locale,
      t: getFixedT(interaction.locale),
    };

    if (interaction.isCommand()) {
      const command = client.slashCommands.get(interaction.commandName);

      if (command) {
        command.execute({ interaction, ...defaultArgs });
      }
    } else if (interaction.isButton()) {
      const [customId] = interaction.customId.split('/');
      const button = client.buttons.get(customId);

      if (button) {
        button.execute({ interaction, ...defaultArgs });
      }
    } else if (interaction.isAnySelectMenu()) {
      const [customId] = interaction.customId.split('?');
      const selectMenu = client.selectMenus.get(customId);

      if (selectMenu) {
        selectMenu.execute({ interaction, ...defaultArgs });
      }
    } else if (interaction.isModalSubmit()) {
      const modal = client.modals.get(interaction.customId);
      if (modal) {
        modal.execute({ interaction, ...defaultArgs });
      }
    }
  },
};
