import {
  ActionRowBuilder,
  APIMessageComponentEmoji,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  EmbedBuilder,
  EmbedData,
  Guild,
  StringSelectMenuBuilder,
  StringSelectMenuComponentData,
} from 'discord.js';
import { Client } from 'src/structures/Client';

import { ButtonCustomId, SelectMenuCustomId } from '@discord-point-bot/constants';

type SetupPeriodEmbedProps = {
  client: Client;
  guild: Guild;
  menu?: Partial<StringSelectMenuComponentData> & {
    customId?: keyof typeof SelectMenuCustomId;
    customIdParam?: string;
  };
  embed: EmbedData;
  button?: {
    customId?: keyof typeof ButtonCustomId;
    style: ButtonStyle;
    label: string;
    emoji?: APIMessageComponentEmoji;
    disabled?: boolean;
    url?: string;
  };
};

export const setupCustomEmbed = async ({
  guild,
  client,
  menu,
  embed,
  button,
}: SetupPeriodEmbedProps) => {
  const row = new ActionRowBuilder<StringSelectMenuBuilder | ButtonBuilder>();

  if (menu) {
    const { customId, customIdParam, disabled, options, placeholder } = menu;
    const select = new StringSelectMenuBuilder({
      customId: customIdParam ? `${customId}?${customIdParam}` : customId,
      disabled,
      options,
      placeholder,
      maxValues: 1,
      minValues: 1,
      type: ComponentType.StringSelect,
    });

    row.addComponents(select);
  }

  if (button) {
    const { label, style, customId, disabled, emoji, url } = button;
    const btn = new ButtonBuilder({ customId, style, label, disabled, emoji, url });

    row.addComponents(btn);
  }

  const newEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(embed.title)
    .setAuthor({ name: embed.author.name, iconURL: client.user.displayAvatarURL() })
    .setThumbnail(guild.iconURL({}))
    .setDescription(embed.description);

  return { newEmbed, row };
};
