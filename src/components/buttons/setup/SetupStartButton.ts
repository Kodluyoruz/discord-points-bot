import { setupRoutes } from 'src/components/Buttons/setup/routes';

import { ButtonCustomId } from '@discord-point-bot/constants';
import { GuildSettingsModel } from '@discord-point-bot/models';

export const SetupStartButton = async ({ client, interaction, lng, t }: DiscordType.ButtonArgs) => {
  const settings = await GuildSettingsModel.findOne({ guildId: interaction.guild.id })
    .select('logChannelId adminChannelId point infoChannelId')
    .lean();

  const { logChannelId, adminChannelId, point, infoChannelId } = settings || {};

  const subCustomId: keyof (typeof ButtonCustomId)['setup'] = !logChannelId
    ? 'log_channel'
    : !adminChannelId
    ? 'admin_channel'
    : !infoChannelId
    ? 'info_channel'
    : !point?.channelId
    ? 'point_channel'
    : point?.period
    ? 'done'
    : 'point_period';

  const button = setupRoutes.find(({ customId }) => customId === subCustomId);

  return await button.execute({ client, interaction: interaction, lng, t });
};
