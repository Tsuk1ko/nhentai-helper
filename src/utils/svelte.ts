import { unsafeWindow } from '$';
import { once } from 'es-toolkit';
import logger from './logger';

const SVELTE_KEY = '__svelte';

export const getSvelteStatus = () => {
  const keys = Object.keys(unsafeWindow).filter(key => key.startsWith(SVELTE_KEY));
  return {
    isSvelte: keys.length > 0,
    isReady: keys.includes(SVELTE_KEY),
  };
};

const waitWinProperty = (name: string, timeout = 2000) =>
  new Promise<void>((resolve, reject) => {
    const val = (unsafeWindow as any)?.[name];
    if (val) {
      resolve(val);
      return;
    }
    const timeoutTimer = setTimeout(() => {
      clearInterval(timer);
      reject(new Error(`Timeout waiting for window property "${name}"`));
    }, timeout);
    const timer = setInterval(() => {
      const val = (unsafeWindow as any)?.[name];
      if (val) {
        clearTimeout(timeoutTimer);
        clearInterval(timer);
        resolve();
      }
    }, 100);
  });

export const waitForSvelteReady = () => waitWinProperty(SVELTE_KEY).catch(logger.warn);

export const onSvelteHydrationMismatch = once((callback: () => void) => {
  if (!unsafeWindow) return;
  const origWarn = unsafeWindow.console.warn;
  unsafeWindow.console.warn = new Proxy(origWarn, {
    apply: (target, thisArg, args) => {
      if (args.length === 1 && args[0] === 'https://svelte.dev/e/hydration_mismatch') {
        setTimeout(callback);
      }
      return Reflect.apply(target, thisArg, args);
    },
  });
});
