import { leaderBoardEmbed } from 'src/components/embeds';

export const GlobalPoints = async ({ client, interaction, lng, t }: DiscordType.ButtonArgs) => {
  const { embed, row } = await leaderBoardEmbed({
    client,
    interaction,
    footer: t('leaderBoard.footer'),
    title: t('leaderBoard.title'),
    lng,
    t,
  });

  await interaction.deferReply({ ephemeral: true, fetchReply: true });
  await interaction.editReply({ embeds: [embed], components: [row] });
};
