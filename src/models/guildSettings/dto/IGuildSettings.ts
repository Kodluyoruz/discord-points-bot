export interface IGuildSettings extends Document {
  guildId: string;
  adminChannelId: string | null;
  logChannelId: string | null;
  pointPeriod: string | undefined;
  createdAt: Date;
  updatedAt: Date;
}
