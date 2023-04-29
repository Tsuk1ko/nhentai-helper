import { castArray } from 'lodash-es';
import type { MessageContext } from '@intlify/core-base';

export const supportLanguage = new Set(['zh', 'en']);

export const defaultLocale = (() => {
  const languages = castArray(navigator.languages || navigator.language);
  for (const language of languages) {
    const lang = language.split('-')[0];
    if (supportLanguage.has(lang)) return lang;
  }
  return 'en';
})();

export const getActionText = ({ linked, named }: MessageContext): string =>
  linked(`message.dialog.action.${named('action')}`);
