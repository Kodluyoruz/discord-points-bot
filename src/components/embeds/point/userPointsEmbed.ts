import t from '@translation';
import { EmbedBuilder } from 'discord.js';
import { Client } from 'src/structures/Client';

type UserPointsEmbedProps = {
  client: Client;
  userData: UserPointsData;
  period: string;
};

type UserPointsData = {
  points: number;
  place: number;
  displayName: string;
};

export const userPointsEmbed = ({ client, userData, period }: UserPointsEmbedProps) => {
  const embed = new EmbedBuilder().setColor(0x5865f2).setDescription(
    t('userPoints.description', {
      name: userData.displayName,
      points: userData.points,
      place: userData.place,
      period: period,
    }),
  );

  return { embed };
};
