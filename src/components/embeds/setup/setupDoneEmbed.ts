import { GuildSettingsModel } from '@discord-point-bot/models';

import translation from '@translation';
import { ButtonStyle, Guild, Locale, TextChannel } from 'discord.js';
import { Client } from 'src/structures/Client';

import { settingsAdminEmbed } from '../settings/settingsAdminEmbed';
import { setupCustumEmbed } from './setupCustumEmbed';

type SetupDoneEmbedProps = { client: Client; guild: Guild; lang: Locale };

export const setupDoneEmbed = async ({ guild, client, lang }: SetupDoneEmbedProps) => {
  const guildSetting = await GuildSettingsModel.findOne({ guildId: guild.id })
    .select('adminChannelId')
    .lean();

  const { newEmbed, row } = await setupCustumEmbed({
    client,
    guild,
    button: {
      url:
        guild.channels.cache.get(guildSetting.adminChannelId).url ||
        `https://discord.com/channels/${guild.id}`,
      style: ButtonStyle.Link,
      label: translation('setup.done.label', { lang }),
    },
    embed: {
      title: translation('setup.done.title', { lang }),
      author: { name: translation('setup.firstEntry.author', { name: guild.name, lang }) },
      description: translation('setup.done.description', { lang }),
    },
  });

  const channel = guild.channels.cache.get(guildSetting.adminChannelId) as TextChannel;

  if (channel) {
    const { embed, row } = await settingsAdminEmbed({ client, guild, lang });

    channel.send({ components: [row], embeds: [embed] });
  }

  return { embed: newEmbed, row };
};
