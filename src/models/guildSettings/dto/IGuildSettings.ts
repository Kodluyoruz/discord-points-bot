export interface IGuildSettings {
  guildId: string;
  adminChannelId?: string;
  logChannelId?: string;
  infoChannelId?: string;
  point?: {
    period?: string;
    channelId?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
