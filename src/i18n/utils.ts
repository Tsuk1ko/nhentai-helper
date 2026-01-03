import { castArray } from 'es-toolkit/compat';

export const supportLanguage = new Set(['zh', 'en']);

export const defaultLocale = (() => {
  const languages = castArray(navigator.languages || navigator.language);
  for (const language of languages) {
    const lang = language.split('-')[0];
    if (lang && supportLanguage.has(lang)) return lang;
  }
  return 'en';
})();
