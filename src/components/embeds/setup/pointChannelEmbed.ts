import { ChannelType } from 'discord.js';
import { setupCustomEmbed } from 'src/components/embeds/setup/setupCustomEmbed';

import { SelectMenuCustomId } from '@discord-point-bot/constants';
import { GuildSettingsModel, IGuildSettings } from '@discord-point-bot/models';

export const pointChannelEmbed = async ({ client, interaction, t }: DiscordType.ButtonArgs) => {
  const { guild, customId } = interaction;
  const [, , action] = customId.split('/');

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

  const { newEmbed, row } = await setupCustomEmbed({
    client,
    guild: guild,
    menu: {
      customId: SelectMenuCustomId.point_channel,
      placeholder: t('setup.pointChannel.placeholder'),
      options: channels,
    },
    embed: {
      title: t('setup.pointChannel.title'),
      author: {
        name: t('setup.firstEntry.author', { name: guild.name }),
      },
      description: t('setup.pointChannel.description'),
    },
  });

  return { embed: newEmbed, row };
};
