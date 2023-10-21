import { translation } from '@translation';
import { ActionRowBuilder, EmbedBuilder, UserSelectMenuBuilder } from 'discord.js';
import { Client } from 'src/structures/Client';

import { SelectMenuCustomId } from '@discord-point-bot/constants';

type referralProps = {
  client: Client;
  lng: string;
  t: typeof translation;
};

export const referralComponents = ({ client, t }: referralProps) => {
  const embed = new EmbedBuilder().setColor(0x0099ff).setAuthor({
    name: t('referral.author', { name: client.user.displayName }),
    iconURL: client.user.displayAvatarURL({}),
  });
  const row = new ActionRowBuilder<UserSelectMenuBuilder>();
  row.addComponents(
    new UserSelectMenuBuilder()
      .setCustomId(SelectMenuCustomId.referrer)
      .setPlaceholder(t('referral.embed.selectReferrer')),
  );
  return { embed, row };
};
