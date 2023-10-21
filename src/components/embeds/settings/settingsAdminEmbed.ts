import { translation } from '@translation';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  Guild,
  Locale,
} from 'discord.js';
import { Client } from 'src/structures/Client';

import { ButtonCustomId } from '@discord-point-bot/constants';

type SettingsAdminEmbed = {
  client: Client;
  guild: Guild;
  lng: Locale;
  t: typeof translation;
};

export const settingsAdminEmbed = async ({ guild, client, t }: SettingsAdminEmbed) => {
  const settingsButton = new ButtonBuilder()
    .setCustomId(ButtonCustomId.settings)
    .setStyle(ButtonStyle.Secondary)
    .setLabel(t('common.setting'));

  const newPointUnitButton = new ButtonBuilder()
    .setCustomId(ButtonCustomId.point_unit.add)
    .setStyle(ButtonStyle.Success)
    .setLabel(t('settings.pointUnit'));

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    settingsButton,
    newPointUnitButton,
  );

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(t('settings.menu'))
    .setAuthor({
      name: t('setup.firstEntry.author', { name: guild.name }),
      iconURL: client.user.displayAvatarURL(),
    })
    .setThumbnail(guild.iconURL())
    .setDescription(t('settings.description'));

  return { embed, row };
};
