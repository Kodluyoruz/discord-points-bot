import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  ComponentType,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';
import i18next from 'i18next';

export const SlashPing: DiscordType.ISlashCommand = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Ping testi menüsünü açar.'),
  execute: async ({ client, interaction, lang }) => {
    const row = new ActionRowBuilder<ButtonBuilder>({
      components: [
        new ButtonBuilder({
          custom_id: 'okey',
          label: i18next.t('common.accept', { lng: lang }),
          style: ButtonStyle.Success,
        }),
        new ButtonBuilder({
          custom_id: 'cancel',
          label: i18next.t('common.decline', { lng: lang }),
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
