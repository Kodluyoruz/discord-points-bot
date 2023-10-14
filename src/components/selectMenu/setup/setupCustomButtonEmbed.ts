import translation from '@translation';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Embed,
  EmbedBuilder,
  Locale,
} from 'discord.js';

type ButtonProps = { customId: string };

type CustomEmbedProps = {
  nextButon: ButtonProps;
  backButon: ButtonProps;
  embed: { oldEmbed: Embed; title: string; description: string };
  lng: Locale;
};

export const setupCustomButtonEmbed = ({ embed, nextButon, backButon, lng }: CustomEmbedProps) => {
  const nextButton = new ButtonBuilder()
    .setCustomId(nextButon.customId)
    .setLabel(translation('common.continue', { lng }))
    .setStyle(ButtonStyle.Success);

  const editButton = new ButtonBuilder()
    .setCustomId(backButon.customId)
    .setLabel(translation('common.edit', { lng }))
    .setStyle(ButtonStyle.Secondary);

  const row = new ActionRowBuilder<ButtonBuilder>().setComponents(editButton, nextButton);

  const newEmbed = new EmbedBuilder(embed.oldEmbed.data)
    .setTitle(embed.title)
    .setDescription(embed.description);

  return { row, newEmbed };
};
