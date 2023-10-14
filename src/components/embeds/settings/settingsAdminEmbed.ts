import { ButtonCustomId } from '@discord-point-bot/constants';

import translation from '@translation';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  Guild,
  Locale,
} from 'discord.js';
import { Client } from 'src/structures/Client';

type SettingsAdminEmbed = { client: Client; guild: Guild; lng: Locale };

export const settingsAdminEmbed = async ({ guild, client, lng }: SettingsAdminEmbed) => {
  const settingsButton = new ButtonBuilder()
    .setCustomId(ButtonCustomId.settings)
    .setStyle(ButtonStyle.Secondary)
    .setLabel(translation('common.setting', { lng }));

  const newPointUnitButton = new ButtonBuilder()
    .setCustomId(ButtonCustomId.point_unit.add)
    .setStyle(ButtonStyle.Success)
    .setLabel(translation('settings.pointUnit', { lng }));

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    settingsButton,
    newPointUnitButton,
  );

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(translation('settings.menu', { lng }))
    .setAuthor({
      name: translation('setup.firstEntry.author', { name: guild.name, lng }),
      iconURL: client.user.displayAvatarURL(),
    })
    .setThumbnail(guild.iconURL())
    .setDescription(translation('settings.description', { lng }));

  return { embed, row };
};
