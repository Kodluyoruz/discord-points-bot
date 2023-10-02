import { setupRoutes } from './routes';

export const SetupButtonRoutes: DiscordType.IButton = {
  customId: 'setup',
  execute: async ({ client, interaction, lang }) => {
    const [_, subCustumId] = interaction.customId.split('/');

    const button = setupRoutes.find(({ custumId }) => custumId === subCustumId);

    const { embed, row } = await button.execute({ client, interaction, lang });

    await interaction.update({ components: [row], embeds: [embed] });
  },
};
