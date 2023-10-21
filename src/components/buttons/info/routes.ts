import { infoUserPointEmbed } from 'src/components/embeds/info/infoUserPointEmbed';
import { userRankEmbed } from 'src/components/embeds/info/userRankEmbed';

import { ButtonCustomId } from '@discord-point-bot/constants';

import { GlobalPoints } from './GlobalPoints';

type SetupRoutes = {
  customId: keyof (typeof ButtonCustomId)['info'];
  execute: ({ client, interaction, lng, t }: DiscordType.ButtonArgs) => Promise<void>;
};

export const setupRoutes: SetupRoutes[] = [
  { customId: 'point', execute: infoUserPointEmbed },
  { customId: 'user', execute: userRankEmbed },
  { customId: 'global_point', execute: GlobalPoints },
];
