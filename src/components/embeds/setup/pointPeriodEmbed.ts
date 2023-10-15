import { SelectMenuCustomId, pointPeriod } from '@discord-point-bot/constants';
import { GuildSettingsModel, IGuildSettings } from '@discord-point-bot/models';

import translation from '@translation';
import { setupCustumEmbed } from 'src/components/embeds/setup/setupCustumEmbed';

export const pointPeriodEmbed = async ({ client, interaction, lng }: DiscordType.ButtonArgs) => {
  const { guild, customId } = interaction;
  const [root, pathname, action] = customId.split('/');

  let settings: IGuildSettings;

  if (action === 'edit') {
    settings = await GuildSettingsModel.findOne({ guildId: guild.id }, 'point').lean();
  }

  const periods = Object.values(pointPeriod).map((value) => ({
    label: translation(`setup.period.periods.${value.toLowerCase()}`, { lng }),
    value,
    default: value === settings?.point?.period,
  }));

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
      placeholder: translation('setup.period.placeholder', { lng }),
      options: periodsOptions,
    },
    embed: {
      title: translation('setup.period.title', { lng }),
      author: { name: translation('setup.firstEntry.author', { name: guild.name, lng }) },
      description: translation('setup.period.description', { lng }),
    },
  });

  return { embed: newEmbed, row };
};
