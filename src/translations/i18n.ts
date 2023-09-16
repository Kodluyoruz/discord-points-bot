import i18next from 'i18next';

import tr from './languages/tr.json';

export function initI18next() {
  i18next.init({
    debug: false,
    lng: 'tr',
    fallbackLng: 'tr',
    resources: { tr: { translation: tr } },
  });
}
