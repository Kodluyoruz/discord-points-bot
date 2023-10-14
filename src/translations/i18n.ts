import i18next from 'i18next';

import en from './languages/en.json';
import tr from './languages/tr.json';

export async function initI18next() {
  await i18next.init({
    load: 'all',
    debug: false,
    lng: 'tr',
    fallbackLng: 'tr',
    supportedLngs: ['tr', 'en-US'],
    preload: ['tr', 'en-US'],
    resources: { tr: { translation: tr }, 'en-US': { translation: en } },
  });
}
