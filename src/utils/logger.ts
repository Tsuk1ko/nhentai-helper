import { IS_DEV } from '@/const';

export default {
  devLog: IS_DEV
    ? (...args: any[]): void => {
        console.log('[nhentai-helper]', ...args);
      }
    : () => {},
  log: (...args: any[]): void => {
    console.log('[nhentai-helper]', ...args);
  },
  warn: (...args: any[]): void => {
    console.warn('[nhentai-helper]', ...args);
  },
  error: (...args: any[]): void => {
    console.error('[nhentai-helper]', ...args);
  },
} as const;
