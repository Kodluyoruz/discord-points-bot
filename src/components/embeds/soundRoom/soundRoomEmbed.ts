import { translation } from '@translation';
import { EmbedBuilder } from 'discord.js';
import { Client } from 'src/structures/Client';

type SoundRoomEmbedProps = {
  client: Client;
  soundRoomData: SoundRoomData;
  period: string;
  t: typeof translation;
};

type SoundRoomData = {
  topic: string;
  channel: string;
  spendingTime: number;
  displayName: string;
  roomPoint: number;
  points: number;
  place: number;
};

export const soundRoomEmbed = ({ soundRoomData, period, t }: SoundRoomEmbedProps) => {
  const embed = new EmbedBuilder()
    .setColor('#51DA5E')
    .setImage(
      'https://cdn.discordapp.com/attachments/745992192891289661/1154089813260111912/image.png',
    )
    .setDescription(
      t('soundRoom.description', {
        ...soundRoomData,
        period: period,
      }),
    );

  embed.addFields(
    { name: ' ', value: `${soundRoomData.topic}`, inline: true },
    { name: ' ', value: `${soundRoomData.roomPoint}`, inline: true },
  );

  return { embed };
};
