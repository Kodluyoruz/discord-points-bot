import i18next from 'i18next';

const translation = i18next.t;

export const localization = (location: string) => {
  return {
    tr: translation(location, { lng: 'tr' }),
    'en-US': translation(location, { lng: 'en-US' }),
  };
};

export default translation;
