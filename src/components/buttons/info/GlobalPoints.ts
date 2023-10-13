import t from '@translation';
import { leaderboardEmbed } from 'src/components/embeds';

export const GlobalPoints = async ({ client, interaction, lang }: DiscordType.ButtonArgs) => {
  const { embed, row } = await leaderboardEmbed({
    client,
    interaction,
    lang,
    footer: t('leaderboard.footer', { lang }),
    title: t('leaderboard.title', { lang }),
  });

  await interaction.deferReply({ ephemeral: true, fetchReply: true });

  await interaction.editReply({ embeds: [embed], components: [row] });
};
