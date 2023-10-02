import { setupEmbed } from '@discord-point-bot/components';

import { ChannelType, Events, GuildBasedChannel, TextChannel } from 'discord.js';

export const GuildCreate: DiscordType.IEvent = {
  name: Events.GuildCreate,
  execute: async (_, [guild]: DiscordType.ArgsOf<'guildCreate'>) => {
    const filter = ({ type }: GuildBasedChannel) => type === ChannelType.GuildText;

    const channel: TextChannel =
      guild.systemChannel || (guild.channels.cache.find(filter) as TextChannel);

    if (channel) {
      const { embed, row } = await setupEmbed({ guild, lang: guild.preferredLocale });

      await channel.send({ embeds: [embed], components: [row] });
    }
  },
};
