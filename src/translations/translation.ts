import { SharedNameAndDescription } from 'discord.js';
import i18next from 'i18next';

export const { t: translation } = i18next;

export const getDefLanguage = () => i18next.language;

export const localization = (location: string, options?: object) => ({
  tr: translation(location, { lng: 'tr', ...options }),
  'en-US': translation(location, { lng: 'en-US', ...options }),
});

export function getOptionNames(location: string, options?: object) {
  const translationObj = translation(location, { returnObjects: true, ...options });
  return Object.keys(translationObj).map((key) => {
    [key] = translationObj[key].name;
  });
}

export function nameAndDescT<T extends SharedNameAndDescription>(
  location: string,
  builder: T,
  options?: object,
) {
  const translationObj = localization(location, { returnObjects: true, ...options });
  const defLanguage = i18next.language;

  builder
    .setName(translationObj[defLanguage].name)
    .setDescription(translationObj[defLanguage].description);

  Object.keys(translationObj).forEach((lng) => {
    builder.setNameLocalizations({ [lng]: translationObj[lng].name });
    builder.setDescriptionLocalizations({ [lng]: translationObj[lng].description });
  });
  return builder;
}

export function getFixedT(language: string) {
  return i18next.getFixedT(language);
}
