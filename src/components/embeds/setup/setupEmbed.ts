import { ButtonCustomId } from '@discord-point-bot/constants';

import translation from '@translation';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  Guild,
  Locale,
} from 'discord.js';
import { map } from 'lodash';

type SetupEmbedProps = { guild: Guild; lang: Locale };

export const setupEmbed = async ({ guild, lang }: SetupEmbedProps) => {
  const buttonBuilders = [
    {
      label: translation('common.document', { lang }),
      style: ButtonStyle.Link,
      url: 'https://www.example.com',
    },
    {
      customId: ButtonCustomId.setup.start,
      label: translation('common.setup', { lang }),
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
    .setTitle(translation('setup.firstEntry.title', { name: guild.name, lang }))
    .setAuthor({
      name: translation('setup.firstEntry.author', { name: guild.name, lang }),
      iconURL: guild.iconURL(),
    })
    .setDescription(translation('setup.firstEntry.description', { lang }))
    .setImage(
      'https://images-ext-2.discordapp.net/external/WS-JzDoRrF93ZfCjDPHRiJhj2TcvN1N1HV65tc4m-9A/https/github-production-user-asset-6210df.s3.amazonaws.com/39780/241442229-32cc8ae6-4423-4a4a-927f-bfaa34950035.png',
    );
  return { embed, row };
};
