import 'dotenv/config';

import { initI18next } from './translations/i18n';

initI18next().then(async () => {
  await (await import('./app')).default();
});
