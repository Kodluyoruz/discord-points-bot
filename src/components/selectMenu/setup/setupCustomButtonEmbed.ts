import { translation } from '@translation';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Embed,
  EmbedBuilder,
  Locale,
} from 'discord.js';

type ButtonProps = {
  customId: string;
  customIdParam?: string;
};

type CustomEmbedProps = {
  nextButton: ButtonProps;
  backButton: ButtonProps;
  embed: {
    oldEmbed: Embed;
    title: string;
    description: string;
  };
  lng: Locale;
  t: typeof translation;
};

export const setupCustomButtonEmbed = ({ embed, nextButton, backButton, t }: CustomEmbedProps) => {
  const next = new ButtonBuilder()
    .setCustomId(
      nextButton.customIdParam
        ? `${nextButton.customId}?${nextButton.customIdParam}`
        : nextButton.customId,
    )
    .setLabel(t('common.continue'))
    .setStyle(ButtonStyle.Success);

  const editButton = new ButtonBuilder()
    .setCustomId(
      backButton.customIdParam
        ? `${backButton.customId}?${backButton.customIdParam}`
        : backButton.customId,
    )
    .setLabel(t('common.edit'))
    .setStyle(ButtonStyle.Secondary);

  const row = new ActionRowBuilder<ButtonBuilder>().setComponents(editButton, next);

  const newEmbed = new EmbedBuilder(embed.oldEmbed.data)
    .setTitle(embed.title)
    .setDescription(embed.description);

  return { row, newEmbed };
};
