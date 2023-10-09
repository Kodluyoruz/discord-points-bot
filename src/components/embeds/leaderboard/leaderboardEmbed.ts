import t from '@translation';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  userMention,
} from 'discord.js';
import { Client } from 'src/structures/Client';

type LeaderboardEmbedProps = {
  client: Client;
  usersData: UsersPointsData[];
  period: string;
  lang: string;
  userId: string;
};

type UsersPointsData = {
  points: number;
  id: string;
};

export const leaderboardEmbed = ({
  client,
  usersData,
  period,
  lang,
  userId,
}: LeaderboardEmbedProps) => {
  const desc = usersData
    .map((user, index) => {
      const userString =
        user.id === userId
          ? `${userMention(user.id)} [- **${user.points}**](https://kodluyoruz.org)`
          : `${userMention(user.id)} - **${user.points}**`;
      switch (index) {
        case 0:
          return `🥇 ${userString}`;
        case 1:
          return `🥈 ${userString}`;
        case 2:
          return `🥉 ${userString}`;
        default:
          return `${index + 1}. ${userString}`;
      }
    })
    .join('\n');
  const line = '~~---------------------------------------------------------------------~~';

  const footer = t('leaderboard.footer', { lang });
  const title = t('leaderboard.title', { lang, period });
  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(`${line}\n${desc}\n${line}\n${footer}`)
    .setColor(0x5865f2)
    .setImage(
      'https://cdn.discordapp.com/attachments/745992192891289661/1154089813260111912/image.png',
    );
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
    new ButtonBuilder()
      .setCustomId('info/point')
      .setLabel(t('pointInfos.title', { lang }))
      .setStyle(ButtonStyle.Secondary),
  ]);

  return { embed, row };
};
