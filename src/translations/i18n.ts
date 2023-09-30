import i18next from 'i18next';

import en from './languages/en.json';
import tr from './languages/tr.json';

export async function initI18next() {
  await i18next.init({
    debug: false,
    lng: 'tr',
    fallbackLng: 'tr',
    resources: { tr: { translation: tr }, en: { translation: en } },
  });
}
