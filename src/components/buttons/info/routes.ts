import { ButtonCustomId } from '@discord-point-bot/constants';

import { infoUserPointEmbed } from 'src/components/embeds/info/infoUserPointEmbed';
import { userRankEmbed } from 'src/components/embeds/info/userRankEmbed';

import { GlobalPoints } from './GlobalPoints';

type SetupRoutes = {
  custumId: keyof (typeof ButtonCustomId)['info'];
  execute: ({ client, interaction, lng }: DiscordType.ButtonArgs) => Promise<void>;
};

export const setupRoutes: SetupRoutes[] = [
  { custumId: 'point', execute: infoUserPointEmbed },
  { custumId: 'user', execute: userRankEmbed },
  { custumId: 'global_point', execute: GlobalPoints },
];
