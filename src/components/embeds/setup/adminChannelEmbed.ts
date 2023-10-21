import { ChannelType } from 'discord.js';
import { setupCustomEmbed } from 'src/components/embeds/setup/setupCustomEmbed';

import { SelectMenuCustomId } from '@discord-point-bot/constants';
import { GuildSettingsModel, IGuildSettings } from '@discord-point-bot/models';

export const adminChannelEmbed = async ({ client, interaction, t }: DiscordType.ButtonArgs) => {
  const { guild, customId } = interaction;
  const [, , action] = customId.split('/');

  let settings: IGuildSettings;

  if (action === 'edit') {
    settings = await GuildSettingsModel.findOne({ guildId: guild.id }, 'adminChannelId').lean();
  }

  const channels = guild.channels.cache
    .filter(({ type }) => type === ChannelType.GuildText)
    .map(({ name: label, id: value }) => ({
      label,
      value,
      default: value === settings?.adminChannelId,
    }));

  const { newEmbed, row } = await setupCustomEmbed({
    client,
    guild: guild,
    menu: {
      customId: SelectMenuCustomId.admin_channel,
      placeholder: t('setup.adminChannel.placeholder'),
      options: channels,
    },
    embed: {
      title: t('setup.adminChannel.title'),
      author: {
        name: t('setup.firstEntry.author', { name: guild.name }),
      },
      description: t('setup.adminChannel.description'),
    },
  });

  return { embed: newEmbed, row };
};
