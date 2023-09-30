import { Client } from './structures/Client';

export default async function init() {
  const client = new Client();
  await client.connect();
}
