import { getFixedT } from '@translation';
import { ChannelType, Events, GuildBasedChannel, TextChannel } from 'discord.js';

import { setupEmbed } from '@discord-point-bot/components';

export const GuildCreate: DiscordType.IEvent = {
  name: Events.GuildCreate,
  execute: async (_, [guild]: DiscordType.ArgsOf<'guildCreate'>) => {
    const filter = ({ type }: GuildBasedChannel) => type === ChannelType.GuildText;

    const channel: TextChannel =
      guild.systemChannel || (guild.channels.cache.find(filter) as TextChannel);

    const lng = guild.preferredLocale;
    const t = getFixedT(lng);

    if (channel) {
      const { embed, row } = await setupEmbed({ guild, lng, t });

      await channel.send({ embeds: [embed], components: [row] });
    }
  },
};
