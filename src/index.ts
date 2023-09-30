import 'dotenv/config';

import { initI18next } from './translations/i18n';

initI18next().then(async () => {
  (await import('./app')).default();
});
