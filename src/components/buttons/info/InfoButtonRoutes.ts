import { setupRoutes } from './routes';

export const InfoButtonRoutes: DiscordType.IButton = {
  customId: 'info',
  execute: async ({ client, interaction, lng }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, subCustumId] = interaction.customId.split('/');

    const button = setupRoutes.find(({ custumId }) => custumId === subCustumId);

    await button.execute({ client, interaction, lng });
  },
};
