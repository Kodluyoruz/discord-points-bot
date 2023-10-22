import { setupEmbed } from 'src/components/embeds';

export const SetupStartButton = async ({ interaction, lng, t }: DiscordType.ButtonArgs) => {
  return await setupEmbed({ guild: interaction.guild, lng, t });
};
