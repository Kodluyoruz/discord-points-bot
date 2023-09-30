import { SelectMenuCustomId } from '@discord-point-bot/constants';

import translation from '@translation';
import { Guild, Locale } from 'discord.js';
import { Client } from 'src/structures/Client';

import { setupCustumEmbed } from './setupCustumEmbed';

type SetupPeriodEmbedProps = { client: Client; guild: Guild; lang: Locale; period?: string };

export const setupPeriodEmbed = async ({ guild, client, period, lang }: SetupPeriodEmbedProps) => {
  const periods = [
    { label: translation('setup.period.periods.weekly', { lang }), value: '7' },
    { label: translation('setup.period.periods.twoWeeks', { lang }), value: '14' },
    { label: translation('setup.period.periods.monthly', { lang }), value: '30' },
  ];
  const periodsOptions = periods.map(({ label, value }) => ({
    label,
    value,
    default: value === period,
  }));

  const { newEmbed, row } = await setupCustumEmbed({
    client,
    guild,
    menu: {
      customId: SelectMenuCustomId.POINT_PERIOD,
      placeholder: translation('setup.period.placeholder', { lang }),
      options: periodsOptions,
    },
    embed: {
      title: translation('setup.period.title', { lang }),
      author: { name: translation('setup.firstEntry.author', { name: guild.name, lang }) },
      description: translation('setup.period.description', { lang }),
    },
  });

  return { embed: newEmbed, row };
};
