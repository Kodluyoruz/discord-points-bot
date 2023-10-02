import { GuildSettingsModel } from '@discord-point-bot/models';

import translation from '@translation';
import { ButtonStyle, TextChannel } from 'discord.js';

import { settingsAdminEmbed } from '../settings/settingsAdminEmbed';
import { setupCustumEmbed } from './setupCustumEmbed';

export const setupDoneEmbed = async ({ client, interaction, lang }: DiscordType.ButtonArgs) => {
  const { guild } = interaction;
  const settings = await GuildSettingsModel.findOne({ guildId: guild.id }, 'adminChannelId').lean();

  const { newEmbed, row } = await setupCustumEmbed({
    client,
    guild,
    button: {
      url:
        guild.channels.cache.get(settings?.adminChannelId)?.url ||
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

  const channel = guild.channels.cache.get(settings?.adminChannelId) as TextChannel;

  if (channel) {
    const { embed, row } = await settingsAdminEmbed({ client, guild, lang });

    await channel.send({ components: [row], embeds: [embed] });
  }

  return { embed: newEmbed, row };
};
