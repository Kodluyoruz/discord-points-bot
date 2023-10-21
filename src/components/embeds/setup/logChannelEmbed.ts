import { ChannelType } from 'discord.js';
import { setupCustomEmbed } from 'src/components/embeds/setup/setupCustomEmbed';

import { SelectMenuCustomId } from '@discord-point-bot/constants';
import { GuildSettingsModel, IGuildSettings } from '@discord-point-bot/models';

export const logChannelEmbed = async ({ client, interaction, t }: DiscordType.ButtonArgs) => {
  const { guild, customId } = interaction;
  const [, , action] = customId.split('/');

  let settings: IGuildSettings;

  if (action === 'edit') {
    settings = await GuildSettingsModel.findOne({ guildId: guild.id }, 'logChannelId').lean();
  }

  const channels = guild.channels.cache.filter(({ type }) => type === ChannelType.GuildText);
  const options = channels.map(({ name, id }) => ({
    label: name,
    value: id,
    default: id === settings?.logChannelId,
  }));

  const { newEmbed, row } = await setupCustomEmbed({
    client,
    guild,
    menu: {
      customId: SelectMenuCustomId.log_channel,
      placeholder: t('setup.logChannel.placeholder'),
      options,
    },
    embed: {
      title: t('setup.logChannel.title'),
      author: { name: t('setup.firstEntry.author', { name: guild.name }) },
      description: t('setup.logChannel.description'),
    },
  });

  return { embed: newEmbed, row };
};
