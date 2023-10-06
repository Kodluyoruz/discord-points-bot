export interface IUserPoint extends Document {
  guildId: string;
  userId: string;
  type: string;
  point: number;
  value: number;
  createdAt: Date;
  updatedAt: Date;
}
