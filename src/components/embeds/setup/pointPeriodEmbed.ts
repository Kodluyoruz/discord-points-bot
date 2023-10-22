import { setupCustomEmbed } from 'src/components/embeds/setup/setupCustomEmbed';

import { pointPeriod, SelectMenuCustomId } from '@discord-point-bot/constants';
import { GuildSettingsModel, IGuildSettings } from '@discord-point-bot/models';

export const pointPeriodEmbed = async ({ client, interaction, t }: DiscordType.ButtonArgs) => {
  const { guild, customId } = interaction;
  const [, , action] = customId.split('/');

  let settings: IGuildSettings;

  if (action === 'edit') {
    settings = await GuildSettingsModel.getSettings(guild.id);
  }

  const periods = Object.values(pointPeriod).map((value) => ({
    label: t(`setup.period.periods.${value.toLowerCase()}`),
    value,
    default: value === settings?.point?.period,
  }));

  const periodsOptions = periods.map(({ label, value }) => ({
    label,
    value,
    default: value === settings?.point?.period,
  }));

  const { newEmbed, row } = await setupCustomEmbed({
    client,
    guild,
    menu: {
      customId: SelectMenuCustomId.point_period,
      placeholder: t('setup.period.placeholder'),
      options: periodsOptions,
    },
    embed: {
      title: t('setup.period.title'),
      author: { name: t('setup.firstEntry.author', { name: guild.name }) },
      description: t('setup.period.description'),
    },
  });

  return { embed: newEmbed, row };
};
