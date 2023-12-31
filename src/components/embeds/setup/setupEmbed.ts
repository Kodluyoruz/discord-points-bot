import { translation } from '@translation';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  Guild,
  Locale,
} from 'discord.js';
import { map } from 'lodash';

import { ButtonCustomId } from '@discord-point-bot/constants';

type SetupEmbedProps = {
  guild: Guild;
  lng: Locale;
  t: typeof translation;
};

export const setupEmbed = async ({ guild, t }: SetupEmbedProps) => {
  const buttonBuilders = [
    {
      label: t('common.document'),
      style: ButtonStyle.Link,
      url: 'https://www.example.com',
    },
    {
      customId: ButtonCustomId.setup.channel.add,
      label: t('common.setup'),
      style: ButtonStyle.Success,
    },
  ];

  const rows = map(buttonBuilders, ({ customId, label, style, url }) => {
    const row = new ButtonBuilder().setLabel(label).setStyle(style);

    if (url) {
      row.setURL(url);
    } else {
      row.setCustomId(customId);
    }

    return row;
  });

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(...rows);

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(t('setup.firstEntry.title', { name: guild.name }))
    .setAuthor({
      name: t('setup.firstEntry.author', { name: guild.name }),
      iconURL: guild.iconURL(),
    })
    .setDescription(t('setup.firstEntry.description'))
    .setImage(
      'https://images-ext-2.discordapp.net/external/WS-JzDoRrF93ZfCjDPHRiJhj2TcvN1N1HV65tc4m-9A/https/github-production-user-asset-6210df.s3.amazonaws.com/39780/241442229-32cc8ae6-4423-4a4a-927f-bfaa34950035.png',
    );
  return { embed, row };
};
