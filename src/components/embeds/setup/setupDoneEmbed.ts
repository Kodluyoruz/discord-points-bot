import { GuildSettingsModel } from '@discord-point-bot/models';

import translation from '@translation';
import { ButtonStyle, TextChannel } from 'discord.js';

import { settingsAdminEmbed } from '../settings/settingsAdminEmbed';
import { setupCustumEmbed } from './setupCustumEmbed';
import { setupInfoEmbed } from './setupInfoEmbed';

export const setupDoneEmbed = async ({ client, interaction, lng }: DiscordType.ButtonArgs) => {
  const { guild } = interaction;
  const settings = await GuildSettingsModel.findOne({ guildId: guild.id })
    .select('adminChannelId infoChannelId')
    .lean();

  const { newEmbed, row } = await setupCustumEmbed({
    client,
    guild,
    button: {
      url:
        guild.channels.cache.get(settings?.adminChannelId)?.url ||
        `https://discord.com/channels/${guild.id}`,
      style: ButtonStyle.Link,
      label: translation('setup.done.label', { lng }),
    },
    embed: {
      title: translation('setup.done.title', { lng }),
      author: { name: translation('setup.firstEntry.author', { name: guild.name, lng }) },
      description: translation('setup.done.description', { lng }),
    },
  });

  const adminChannel = guild.channels.cache.get(settings?.adminChannelId) as TextChannel;
  const infoChannel = guild.channels.cache.get(settings?.infoChannelId) as TextChannel;

  if (adminChannel) {
    const { embed, row } = await settingsAdminEmbed({ client, guild, lng });

    await adminChannel.send({ components: [row], embeds: [embed] });
  }

  if (infoChannel) {
    const { embed, row } = await setupInfoEmbed({ client, interaction, lng });

    await infoChannel.send({ components: [row], embeds: [embed] });
  }

  return { embed: newEmbed, row };
};
