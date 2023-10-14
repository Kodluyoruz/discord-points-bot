import { SelectMenuCustomId } from '@discord-point-bot/constants';
import { GuildSettingsModel, IGuildSettings } from '@discord-point-bot/models';

import translation from '@translation';
import { ChannelType } from 'discord.js';
import { setupCustumEmbed } from 'src/components/embeds/setup/setupCustumEmbed';

export const pointChannelEmbed = async ({ client, interaction, lng }: DiscordType.ButtonArgs) => {
  const { guild, customId } = interaction;
  const [root, pathname, action] = customId.split('/');

  let settings: IGuildSettings;

  if (action === 'edit') {
    settings = await GuildSettingsModel.findOne({ guildId: guild.id }, 'point').lean();
  }

  const channels = guild.channels.cache
    .filter(({ type }) => type === ChannelType.GuildText)
    .map(({ name: label, id: value }) => ({
      label,
      value,
      default: value === settings?.point?.channelId,
    }));

  const { newEmbed, row } = await setupCustumEmbed({
    client,
    guild: guild,
    menu: {
      customId: SelectMenuCustomId.point_channel,
      placeholder: translation('setup.pointChannel.placeholder', { lng }),
      options: channels,
    },
    embed: {
      title: translation('setup.pointChannel.title', { lng }),
      author: {
        name: translation('setup.firstEntry.author', { name: guild.name, lng }),
      },
      description: translation('setup.pointChannel.description', { lng }),
    },
  });

  return { embed: newEmbed, row };
};
