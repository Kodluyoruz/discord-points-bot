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

type SettingsAdminEmbed = { client: Client; guild: Guild; lang: Locale };

export const settingsAdminEmbed = async ({ guild, client, lang }: SettingsAdminEmbed) => {
  const settingsButton = new ButtonBuilder()
    .setCustomId(ButtonCustomId.settings)
    .setStyle(ButtonStyle.Secondary)
    .setLabel(translation('common.setting', { lang }));

  const newPointUnitButton = new ButtonBuilder()
    .setCustomId(ButtonCustomId.point_unit.add)
    .setStyle(ButtonStyle.Success)
    .setLabel(translation('settings.pointUnit', { lang }));

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    settingsButton,
    newPointUnitButton,
  );

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(translation('settings.menu', { lang }))
    .setAuthor({
      name: translation('setup.firstEntry.author', { name: guild.name, lang }),
      iconURL: client.user.displayAvatarURL(),
    })
    .setThumbnail(guild.iconURL())
    .setDescription(translation('settings.description', { lang }));

  return { embed, row };
};
