import { ChannelType } from 'discord.js';
import { setupRoutes } from 'src/components/Buttons/setup/routes';
import { setupCustomEmbed } from 'src/components/embeds/setup/setupCustomEmbed';
import { ChannelSettingType } from 'src/models/guildSettings/GuildSettings';

import { SelectMenuCustomId } from '@discord-point-bot/constants';
import { GuildSettingsModel } from '@discord-point-bot/models';

export const channelEmbed = async ({ client, interaction, t }: DiscordType.ButtonArgs) => {
  const { guild, customId } = interaction;
  const [command, param] = customId.split('?');
  const [, , action] = command.split('/');
  const channelSettingType = param || (setupRoutes[1].params[0] as ChannelSettingType);

  const settings = await GuildSettingsModel.getSettings(guild.id);

  const channels = guild.channels.cache
    .filter(({ type }) => type === ChannelType.GuildText)
    .map(({ name: label, id: value }) => ({
      label,
      value,
      default: action === 'edit' && value === settings?.channels?.[channelSettingType],
    }));

  const { newEmbed, row } = await setupCustomEmbed({
    client,
    guild: guild,
    menu: {
      customId: SelectMenuCustomId.channel,
      customIdParam: channelSettingType,
      placeholder: t(`setup.channel.${channelSettingType}.placeholder`),
      options: channels,
    },
    embed: {
      title: t(`setup.channel.${channelSettingType}.title`),
      author: {
        name: t('setup.firstEntry.author', { name: guild.name }),
      },
      description: t(`setup.channel.${channelSettingType}.description`),
    },
  });

  return { embed: newEmbed, row };
};
