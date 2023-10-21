import { SlashCommandBuilder } from 'discord.js';

import { soundRoomEmbed } from '@discord-point-bot/components';

export const SoundRoom: DiscordType.ISlashCommand = {
  data: new SlashCommandBuilder()
    .setName('soundroom')
    .setDescription('Sesli Sohbet Odası durumunuzu gösterir.'),
  execute: async ({ client, interaction, t }) => {
    const period = '10-17 Eylül'; // TODO:DB get period from db or something
    const soundRoomData = {
      spendingTime: 123,
      channel: 'deneme',
      topic: 'Toplam Sesli Oda',
      roomPoint: 55,
      points: 93,
      place: 12,
      name: 'dfdf',
      displayName: 'DisplayNameHere',
    };

    const { embed } = soundRoomEmbed({ client, soundRoomData, period, t });

    await interaction.reply({
      embeds: [embed],
    });
  },
};
