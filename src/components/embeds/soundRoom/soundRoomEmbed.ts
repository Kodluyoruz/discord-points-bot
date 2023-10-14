import t from '@translation';
import { EmbedBuilder } from 'discord.js';
import { Client } from 'src/structures/Client';

type SoundRoomEmbedProps = {
  client: Client;
  soundRoomData: SoundRoomData;
  period: string;
};

type SoundRoomData = {
  topic: string;
  channel:string;
  spendingTime:number;
  displayName: string;
  roomPoint: number;
  points: number;
  place: number;
};
//TODO:CLİENT GELECEK
export const soundRoomEmbed = ({ client, soundRoomData, period }: SoundRoomEmbedProps) => {
  const embed = new EmbedBuilder().setColor('#51DA5E').setImage(
    'https://cdn.discordapp.com/attachments/745992192891289661/1154089813260111912/image.png',
  ).setDescription(
    t('soundRoom.description', {
      topic:soundRoomData.topic,
      channel:soundRoomData.channel,
      spendingTime:soundRoomData.spendingTime,
      name: soundRoomData.displayName,
      roomPoint: soundRoomData.roomPoint,
      points: soundRoomData.points,
      place: soundRoomData.place,
      period: period,
    }),
  );

  embed.addFields(
    { name: ' ', value: `${soundRoomData.topic}`, inline: true },
    { name: ' ', value: `${soundRoomData.roomPoint}`, inline: true }
  );

  return { embed };
};
