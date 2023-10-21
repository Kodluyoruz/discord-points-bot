import { leaderboardEmbed } from 'src/components/embeds';

export const GlobalPoints = async ({ client, interaction, lng, t }: DiscordType.ButtonArgs) => {
  const { embed, row } = await leaderboardEmbed({
    client,
    interaction,
    footer: t('leaderboard.footer'),
    title: t('leaderboard.title'),
    lng,
    t,
  });

  await interaction.deferReply({ ephemeral: true, fetchReply: true });
  await interaction.editReply({ embeds: [embed], components: [row] });
};
