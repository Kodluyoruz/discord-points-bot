import { translation } from '@translation';
import { ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';
import { Client } from 'src/structures/Client';

type PointsInfoEmbedProps = {
  client: Client;
  t: typeof translation;
};

export const pointInfoEmbed = ({ client, t }: PointsInfoEmbedProps) => {
  const [next, back, cancel] = [
    new ButtonBuilder().setCustomId('next').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('back').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('cancel').setStyle(ButtonStyle.Secondary),
  ];

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(t('pointInfos.title'))
    .setAuthor({
      name: t('pointInfos.author', { name: client.user.displayName }),
      iconURL: client.user.displayAvatarURL({}),
    })
    .setImage(
      'https://cdn.discordapp.com/attachments/745992192891289661/1154089813260111912/image.png',
    );

  return { embed, next, back, cancel };
};
