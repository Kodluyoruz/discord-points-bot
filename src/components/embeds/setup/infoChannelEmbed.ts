import { ChannelType } from 'discord.js';
import { setupCustomEmbed } from 'src/components/embeds/setup/setupCustomEmbed';

import { SelectMenuCustomId } from '@discord-point-bot/constants';
import { GuildSettingsModel, IGuildSettings } from '@discord-point-bot/models';

export const infoChannelEmbed = async ({ client, interaction, t }: DiscordType.ButtonArgs) => {
  const { guild, customId } = interaction;
  const [, , action] = customId.split('/');

  let settings: IGuildSettings;

  if (action === 'edit') {
    settings = await GuildSettingsModel.findOne({ guildId: guild.id }, 'infoChannelId').lean();
  }

  const channels = guild.channels.cache
    .filter(({ type }) => type === ChannelType.GuildText)
    .map(({ name: label, id: value }) => ({
      label,
      value,
      default: value === settings?.infoChannelId,
    }));

  const { newEmbed, row } = await setupCustomEmbed({
    client,
    guild: guild,
    menu: {
      customId: SelectMenuCustomId.info_channel,
      placeholder: t('setup.infoChannel.placeholder'),
      options: channels,
    },
    embed: {
      title: t('setup.infoChannel.title'),
      author: {
        name: t('setup.firstEntry.author', { name: guild.name }),
      },
      description: t('setup.infoChannel.description'),
    },
  });

  return { embed: newEmbed, row };
};
