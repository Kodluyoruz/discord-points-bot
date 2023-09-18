import 'dotenv/config';

import { Client } from './structures/Client';
import { initI18next } from './translations/i18n';

const client = new Client();

initI18next();
client.connect();

process.on('unhandledRejection', (error: Error) => {
  client.logger.error(`${error.name}: ${error.message}`);
});
process.on('uncaughtException', (error: Error) => {
  client.logger.error(`${error.name}: ${error.message}`);
});
