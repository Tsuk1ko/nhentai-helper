import { createI18n } from 'vue-i18n';
import en from './locales/en';
import zh from './locales/zh';
import { settings } from '@/utils/settings';

type MessageSchema = typeof en;

declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends MessageSchema {}
}

export const i18n = createI18n<[MessageSchema], 'en' | 'zh'>({
  legacy: false,
  locale: settings.language,
  fallbackLocale: 'en',
  messages: { en, zh },
});
