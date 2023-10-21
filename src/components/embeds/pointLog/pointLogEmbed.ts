import { translation } from '@translation';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';
import { Client } from 'src/structures/Client';

type PointLogEmbedProps = {
  client: Client;
  embedProps: {
    color: number;
    description: string;
    buttonId: string;
  };
  t: typeof translation;
};

export const pointLogEmbed = ({ embedProps, t }: PointLogEmbedProps) => {
  const { color, description, buttonId } = embedProps;
  const embed = new EmbedBuilder().setColor(color).setDescription(description);

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
    new ButtonBuilder()
      .setCustomId(buttonId)
      .setLabel(t('pointLog.revertButtonLabel'))
      .setStyle(ButtonStyle.Primary),
  ]);

  return { embed, row };
};
