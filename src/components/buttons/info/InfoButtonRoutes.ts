import { setupRoutes } from "./routes";


export const InfoButtonRoutes: DiscordType.IButton = {
  customId: 'info',
  execute: async ({ client, interaction, lng, t }) => {
    const [, subCustomId] = interaction.customId.split('/');
    const button = setupRoutes.find(({ customId }) => customId === subCustomId);

    await button.execute({ client, interaction, lng, t });
  },
};
