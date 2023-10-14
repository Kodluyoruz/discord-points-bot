import t from '@translation';
import { leaderboardEmbed } from 'src/components/embeds';

export const GlobalPoints = async ({ client, interaction, lng }: DiscordType.ButtonArgs) => {
  const { embed, row } = await leaderboardEmbed({
    client,
    interaction,
    lng,
    footer: t('leaderboard.footer', { lng }),
    title: t('leaderboard.title', { lng }),
  });

  await interaction.deferReply({ ephemeral: true, fetchReply: true });

  await interaction.editReply({ embeds: [embed], components: [row] });
};
