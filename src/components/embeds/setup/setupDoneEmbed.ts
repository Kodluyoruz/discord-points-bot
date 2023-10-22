import { ButtonStyle, TextChannel } from 'discord.js';

import { GuildSettingsModel } from '@discord-point-bot/models';

import { settingsAdminEmbed } from '../settings/settingsAdminEmbed';
import { setupCustomEmbed } from './setupCustomEmbed';
import { setupInfoEmbed } from './setupInfoEmbed';

export const setupDoneEmbed = async ({ client, interaction, lng, t }: DiscordType.ButtonArgs) => {
  const { guild } = interaction;
  const { admin: adminChannelId, info: infoChannelId } = await GuildSettingsModel.getChannels(
    guild.id,
  );

  const { newEmbed, row } = await setupCustomEmbed({
    client,
    guild,
    button: {
      url:
        guild.channels.cache.get(adminChannelId)?.url || `https://discord.com/channels/${guild.id}`,
      style: ButtonStyle.Link,
      label: t('setup.done.label'),
    },
    embed: {
      title: t('setup.done.title'),
      author: { name: t('setup.firstEntry.author', { name: guild.name }) },
      description: t('setup.done.description'),
    },
  });

  const adminChannel = guild.channels.cache.get(adminChannelId) as TextChannel;
  const infoChannel = guild.channels.cache.get(infoChannelId) as TextChannel;

  if (adminChannel) {
    const { embed, row } = await settingsAdminEmbed({ client, guild, lng, t });

    await adminChannel.send({ components: [row], embeds: [embed] });
  }

  if (infoChannel) {
    const { embed, row } = await setupInfoEmbed({ client, interaction, lng, t });

    await infoChannel.send({ components: [row], embeds: [embed] });
  }

  return { embed: newEmbed, row };
};
