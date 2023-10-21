import { translation } from '@translation';
import { ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';
import { Client } from 'src/structures/Client';

import { ButtonCustomId } from '@discord-point-bot/constants';

type PointUnitProps = {
  client: Client;
  t: typeof translation;
};

export const pointUnitEmbed = ({ client, t }: PointUnitProps) => {
  const [roomSelection, addUnit, infoUnit] = [
    new ButtonBuilder().setCustomId('roomSelection').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId(ButtonCustomId.point_unit.add).setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('infoUnit').setStyle(ButtonStyle.Secondary),
  ];

  const embed = new EmbedBuilder().setColor(0x0099ff).setAuthor({
    name: t('pointUnit.author', { name: client.user.displayName }),
    iconURL: client.user.displayAvatarURL({}),
  });

  return { embed, roomSelection, addUnit, infoUnit };
};
