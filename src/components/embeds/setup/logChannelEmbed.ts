import { SelectMenuCustomId } from '@discord-point-bot/constants';
import { GuildSettingsModel, IGuildSettings } from '@discord-point-bot/models';

import translation from '@translation';
import { ChannelType } from 'discord.js';
import { setupCustumEmbed } from 'src/components/embeds/setup/setupCustumEmbed';

export const logChannelEmbed = async ({ client, interaction, lng }: DiscordType.ButtonArgs) => {
  const { guild, customId } = interaction;
  const [root, pathname, action] = customId.split('/');

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

  const { newEmbed, row } = await setupCustumEmbed({
    client,
    guild,
    menu: {
      customId: SelectMenuCustomId.log_channel,
      placeholder: translation('setup.logChannel.placeholder', { lng }),
      options,
    },
    embed: {
      title: translation('setup.logChannel.title', { lng }),
      author: { name: translation('setup.firstEntry.author', { name: guild.name, lng }) },
      description: translation('setup.logChannel.description', { lng }),
    },
  });

  return { embed: newEmbed, row };
};
