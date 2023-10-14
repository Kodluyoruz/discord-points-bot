import { setupRoutes } from './routes';

export const SetupButtonRoutes: DiscordType.IButton = {
  customId: 'setup',
  execute: async ({ client, interaction, lng }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, subCustumId] = interaction.customId.split('/');

    const button = setupRoutes.find(({ custumId }) => custumId === subCustumId);

    const { embed, row } = await button.execute({ client, interaction, lng });

    await interaction.update({ components: [row], embeds: [embed] });
  },
};
