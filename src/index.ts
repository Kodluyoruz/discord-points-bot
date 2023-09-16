import 'dotenv/config';

import { Client } from './structures/Client';
import { initI18next } from './translations/i18n';

const client = new Client();

initI18next();
client.connect();

process.on('unhandledRejection', (error: Error) => {
  console.log(`${error.name}: ${error.message}`);
});
process.on('uncaughtException', (error: Error) => {
  console.log(`${error.name}: ${error.message}`);
});
