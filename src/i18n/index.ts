import { resolveValue } from '@intlify/core-base';
import { createI18n, registerMessageResolver } from 'petite-vue-i18n';
import { settings } from '@/utils/settings';
import en from './locales/en';
import zh from './locales/zh';

type MessageSchema = typeof en;

declare module 'petite-vue-i18n' {
  export interface DefineLocaleMessage extends MessageSchema {}
}

registerMessageResolver(resolveValue);

export const i18n = createI18n<[MessageSchema], 'en' | 'zh'>({
  legacy: false,
  locale: settings.language,
  fallbackLocale: 'en',
  messages: { en, zh },
});
