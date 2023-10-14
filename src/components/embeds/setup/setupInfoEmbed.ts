import { ButtonCustomId } from '@discord-point-bot/constants';

import t from '@translation';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';

export const setupInfoEmbed = async ({ client }: DiscordType.ButtonArgs) => {
  const howToEarnPointsButton = new ButtonBuilder()
    .setCustomId(ButtonCustomId.info.point)
    .setLabel(t('info.button.howToEarnPoints'))
    .setStyle(ButtonStyle.Secondary);

  const showRank = new ButtonBuilder()
    .setCustomId(ButtonCustomId.info.global_point)
    .setLabel(t('Genel Sıralamayı Gör'))
    .setStyle(ButtonStyle.Success);

  const myPoint = new ButtonBuilder()
    .setCustomId(ButtonCustomId.info.user.rank)
    .setLabel(t('Sıralamanı Gör'))
    .setStyle(ButtonStyle.Primary);

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(t('pointInfos.title'))
    .setAuthor({
      name: t('pointInfos.author', { name: client.user.displayName }),
      iconURL: client.user.displayAvatarURL({}),
    })
    .setImage(
      'https://cdn.discordapp.com/attachments/745992192891289661/1154089813260111912/image.png',
    );

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    howToEarnPointsButton,
    myPoint,
    showRank,
  );

  return { embed, row };
};
