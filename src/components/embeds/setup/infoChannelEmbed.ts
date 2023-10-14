import { SelectMenuCustomId } from '@discord-point-bot/constants';
import { GuildSettingsModel, IGuildSettings } from '@discord-point-bot/models';

import translation from '@translation';
import { ChannelType } from 'discord.js';
import { setupCustumEmbed } from 'src/components/embeds/setup/setupCustumEmbed';

export const infoChannelEmbed = async ({ client, interaction, lng }: DiscordType.ButtonArgs) => {
  const { guild, customId } = interaction;
  const [root, pathname, action] = customId.split('/');

  let settings: IGuildSettings;

  if (action === 'edit') {
    settings = await GuildSettingsModel.findOne({ guildId: guild.id }, 'infoChannelId').lean();
  }

  const channels = guild.channels.cache
    .filter(({ type }) => type === ChannelType.GuildText)
    .map(({ name: label, id: value }) => ({
      label,
      value,
      default: value === settings?.infoChannelId,
    }));

  const { newEmbed, row } = await setupCustumEmbed({
    client,
    guild: guild,
    menu: {
      customId: SelectMenuCustomId.info_channel,
      placeholder: translation('setup.infoChannel.placeholder', { lng }),
      options: channels,
    },
    embed: {
      title: translation('setup.infoChannel.title', { lng }),
      author: {
        name: translation('setup.firstEntry.author', { name: guild.name, lng }),
      },
      description: translation('setup.infoChannel.description', { lng }),
    },
  });

  return { embed: newEmbed, row };
};
