import { SelectMenuCustomId } from '@discord-point-bot/constants';
import { GuildSettingsModel, IGuildSettings } from '@discord-point-bot/models';

import translation from '@translation';
import { setupCustumEmbed } from 'src/components/embeds/setup/setupCustumEmbed';

export const pointPeriodEmbed = async ({ client, interaction, lang }: DiscordType.ButtonArgs) => {
  const { guild, customId } = interaction;
  const [root, pathname, action] = customId.split('/');

  let settings: IGuildSettings;

  if (action === 'edit') {
    settings = await GuildSettingsModel.findOne({ guildId: guild.id }, 'point').lean();
  }

  const periods = [
    { label: translation('setup.period.periods.weekly', { lang }), value: '7' },
    { label: translation('setup.period.periods.twoWeeks', { lang }), value: '14' },
    { label: translation('setup.period.periods.monthly', { lang }), value: '30' },
  ];

  const periodsOptions = periods.map(({ label, value }) => ({
    label,
    value,
    default: value === settings?.point?.period,
  }));

  const { newEmbed, row } = await setupCustumEmbed({
    client,
    guild,
    menu: {
      customId: SelectMenuCustomId.point_period,
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
