import { pointPeriod } from '@discord-point-bot/constants';

export interface IGuildSettings {
  guildId: string;
  channels: {
    admin?: string;
    log?: string;
    info?: string;
    period?: string;
  };
  point?: {
    period?: pointPeriod;
  };
  createdAt: Date;
  updatedAt: Date;
}
