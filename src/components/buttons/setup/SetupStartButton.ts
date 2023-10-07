import { ButtonCustomId } from '@discord-point-bot/constants';
import { GuildSettingsModel } from '@discord-point-bot/models';

import { setupRoutes } from './routes';

export const SetupStartButton = async ({ client, interaction, lang }: DiscordType.ButtonArgs) => {
  const settings = await GuildSettingsModel.findOne({ guildId: interaction.guild.id })
    .select('logChannelId adminChannelId point infoChannelId')
    .lean();

  const { logChannelId, adminChannelId, point, infoChannelId } = settings || {};

  const subCustumId: keyof (typeof ButtonCustomId)['setup'] = !logChannelId
    ? 'log_channel'
    : !adminChannelId
    ? 'admin_channel'
    : !infoChannelId
    ? 'info_channel'
    : !point?.channelId
    ? 'point_channel'
    : !point?.period
    ? 'point_period'
    : 'done';

  const button = setupRoutes.find(({ custumId }) => custumId === subCustumId);

  return await button.execute({ client, interaction: interaction, lang });
};
