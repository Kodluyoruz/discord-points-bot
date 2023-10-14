import { SelectMenuCustomId } from '@discord-point-bot/constants';

import t from '@translation';
import { ActionRowBuilder, EmbedBuilder, UserSelectMenuBuilder } from 'discord.js';
import { Client } from 'src/structures/Client';

type referralProps = {
  client: Client;
  lang: string;
};

export const referralComponents = ({ client, lang }: referralProps) => {
  const embed = new EmbedBuilder().setColor(0x0099ff).setAuthor({
    name: t('referral.author', { name: client.user.displayName, lang }),
    iconURL: client.user.displayAvatarURL({}),
  });
  const row = new ActionRowBuilder<UserSelectMenuBuilder>();
  row.addComponents(
    new UserSelectMenuBuilder()
      .setCustomId(SelectMenuCustomId.referrer)
      .setPlaceholder(t('referral.embed.selectReferrer', { lang })),
  );
  return { embed, row };
};
