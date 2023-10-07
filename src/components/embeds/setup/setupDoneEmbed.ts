import { ButtonCustomId } from '@discord-point-bot/constants';
import { GuildSettingsModel } from '@discord-point-bot/models';

import translation from '@translation';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, TextChannel } from 'discord.js';

import { pointInfoEmbed } from '../point/pointInfoEmbed';
import { settingsAdminEmbed } from '../settings/settingsAdminEmbed';
import { setupCustumEmbed } from './setupCustumEmbed';

export const setupDoneEmbed = async ({ client, interaction, lang }: DiscordType.ButtonArgs) => {
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
      label: translation('setup.done.label', { lang }),
    },
    embed: {
      title: translation('setup.done.title', { lang }),
      author: { name: translation('setup.firstEntry.author', { name: guild.name, lang }) },
      description: translation('setup.done.description', { lang }),
    },
  });

  const adminChannel = guild.channels.cache.get(settings?.adminChannelId) as TextChannel;
  const infoChannel = guild.channels.cache.get(settings?.infoChannelId) as TextChannel;

  if (adminChannel) {
    const { embed, row } = await settingsAdminEmbed({ client, guild, lang });

    await adminChannel.send({ components: [row], embeds: [embed] });
  }

  if (infoChannel) {
    const { embed, next } = await pointInfoEmbed({ client });

    next.setLabel(translation('Göster')).setCustomId(ButtonCustomId.info.point);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(next);

    await infoChannel.send({ components: [row], embeds: [embed] });
  }

  return { embed: newEmbed, row };
};
