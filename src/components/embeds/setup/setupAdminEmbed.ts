import { SelectMenuCustomId } from '@discord-point-bot/constants';

import translation from '@translation';
import { ChannelType, Guild, Locale } from 'discord.js';
import { Client } from 'src/structures/Client';

import { setupCustumEmbed } from './setupCustumEmbed';

type SetupAdminEmbedProps = { guild: Guild; client: Client; lang: Locale; channelId?: string };

export const setupAdminEmbed = async ({ guild, client, channelId, lang }: SetupAdminEmbedProps) => {
  const channels = guild.channels.cache
    .filter(({ type }) => type === ChannelType.GuildText)
    .map(({ name, id }) => ({ label: name, value: id, default: id === channelId }));

  const { newEmbed, row } = await setupCustumEmbed({
    client,
    guild,
    menu: {
      customId: SelectMenuCustomId.ADMIN_CHANNEL,
      placeholder: translation('setup.adminChannel.placeholder', { lang }),
      options: channels,
    },
    embed: {
      title: translation('setup.adminChannel.title', { lang }),
      author: { name: translation('setup.firstEntry.author', { name: guild.name, lang }) },
      description: translation('setup.adminChannel.description', { lang }),
    },
  });

  return { embed: newEmbed, row };
};
