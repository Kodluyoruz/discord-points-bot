import { translation } from '@translation';
import { EmbedBuilder } from 'discord.js';
import { Client } from 'src/structures/Client';

type ReferenceEmbedProps = {
  client: Client;
  referenceData: ReferenceData;
  period: string;
  t: typeof translation;
};

type ReferenceData = {
  topic: string;
  displayName: string;
  member: string;
  roomPoint: number;
  points: number;
  place: number;
};
//TODO:CLİENT GELECEK
export const referenceEmbed = ({ referenceData, period, t }: ReferenceEmbedProps) => {
  const embed = new EmbedBuilder()
    .setColor('#51DA5E')
    .setImage(
      'https://cdn.discordapp.com/attachments/745992192891289661/1154089813260111912/image.png',
    )
    .setDescription(
      t('reference.description', {
        topic: referenceData.topic,
        name: referenceData.displayName,
        member: referenceData.member,
        roomPoint: referenceData.member,
        points: referenceData.points,
        place: referenceData.place,
        period: period,
      }),
    );

  embed.addFields(
    { name: ' ', value: `${referenceData.topic}`, inline: true },
    { name: ' ', value: `${referenceData.roomPoint}`, inline: true },
  );

  return { embed };
};
