import { soundRoomEmbed } from '@discord-point-bot/components';

import { SlashCommandBuilder } from 'discord.js';

export const SoundRoom: DiscordType.ISlashCommand = {
  data: new SlashCommandBuilder().setName('soundroom').setDescription('Sesli Sohbet Odası durumunuzu gösterir.'),
  execute: async ({ client, interaction, lang }) => {
    const member = interaction.inCachedGuild()
      ? interaction.member
      : await interaction.guild.members.fetch(interaction.user.id);

    const period = '10-17 Eylül'; // TODO:DB get period from db or something
    const soundRoomData = {
        spendingTime: 123,
        channel: "deneme",
        topic: "Toplam Sesli Oda",
        roomPoint: 55,
        points: 93,
        place: 12,
        name: "dfdf",
        displayName: "DisplayNameHere", 
      };

    const { embed } = soundRoomEmbed({ client, soundRoomData, period });

    await interaction.reply({
      embeds: [embed],
    });
  },
};
