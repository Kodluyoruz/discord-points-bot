import { Events } from 'discord.js';

export const InteractionCreate: DiscordType.IEvent = {
  name: Events.InteractionCreate,
  execute: async (client, [interaction]: DiscordType.ArgsOf<'interactionCreate'>) => {
    if (interaction.isCommand()) {
      const command = client.slashCommands.get(interaction.commandName);

      command.execute({ client, interaction, lang: interaction.locale });
    } else if (interaction.isButton()) {
      const [customId] = interaction.customId.split('/');
      const button = client.buttons.get(customId);

      if (button) {
        button.execute({ client, interaction, lang: interaction.locale });
      }
    } else if (interaction.isAnySelectMenu()) {
      const selectMenu = client.selectMenus.get(interaction.customId);

      if (selectMenu) {
        selectMenu.execute({ client, interaction, lang: interaction.locale });
      }
    }
  },
};
