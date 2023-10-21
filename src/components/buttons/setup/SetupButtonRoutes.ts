import { setupRoutes } from 'src/components/Buttons/setup/routes';

export const SetupButtonRoutes: DiscordType.IButton = {
  customId: 'setup',
  execute: async ({ client, interaction, lng, t }) => {
    const [, subCustomId] = interaction.customId.split('/');
    const button = setupRoutes.find(({ customId }) => customId === subCustomId);
    const { embed, row } = await button.execute({ client, interaction, lng, t });

    await interaction.update({ components: [row], embeds: [embed] });
  },
};
