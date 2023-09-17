import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  ComponentType,
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from 'discord.js';

export const SlashPing: DiscordType.ISlashCommand = {
  data: new SlashCommandBuilder()
    .setName('kurulum')
    .setDescription('Kurulum menüsünü açar.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  execute: async ({ client, interaction }) => {
    const row = new ActionRowBuilder<ButtonBuilder>({
      components: [
        new ButtonBuilder({
          custom_id: 'okey',
          label: 'Onaylıyorum',
          style: ButtonStyle.Success,
        }),
        new ButtonBuilder({
          custom_id: 'cancel',
          label: 'Onaylamıyorum',
          style: ButtonStyle.Danger,
        }),
      ],
    });

    const question = await interaction.reply({
      components: [row],
    });

    const collector = question.createMessageComponentCollector({
      time: 1000 * 30,
      componentType: ComponentType.Button,
    });

    collector.on('collect', async (btn: ButtonInteraction) => {
      try {
        if (btn.customId === 'okey') {
          question.edit({
            content: `Bu bir test mesajıdır`,
            embeds: [new EmbedBuilder().setDescription('test okey')],
            components: [],
          });
        } else {
          question.edit({
            content: `Bu bir test mesajıdır`,
            embeds: [new EmbedBuilder().setDescription('test cancel')],
            components: [],
          });
        }
        collector.stop('SUCCESS');
      } catch (error) {
        console.log(error);
      }
    });

    collector.on('end', (_, reason) => {
      if (reason !== 'SUCCESS') {
        question.delete();
      }
    });
  },
};
