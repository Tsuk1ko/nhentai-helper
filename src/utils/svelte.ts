import { unsafeWindow } from '$';
import { once } from 'es-toolkit';
import { sleep } from './common';
import { logger } from './logger';

const SVELTE_KEY = '__svelte';

export const IS_SVELTE = Object.keys(unsafeWindow).some(key => key.startsWith(SVELTE_KEY));

export const isSvelteReady = () => IS_SVELTE && !!document.querySelector('#svelte-announcer');

export const waitForSvelteReady = () => {
  const observerAbortController = new AbortController();
  const observerPromise = new Promise<void>(resolve => {
    const observer = new MutationObserver((mutations, observer) => {
      if (
        mutations.some(({ addedNodes }) =>
          Array.from(addedNodes).some(
            node => node instanceof HTMLElement && node.id === 'svelte-announcer',
          ),
        )
      ) {
        observer.disconnect();
        resolve();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    observerAbortController.signal.onabort = () => {
      observer.disconnect();
      resolve();
    };
  });
  const timeoutPromise = sleep(3000).then(() => {
    observerAbortController.abort();
  });
  return Promise.race([observerPromise, timeoutPromise]);
};

export const onSvelteHydrationMismatch = once((callback: () => void) => {
  if (!unsafeWindow) return;
  const origWarn = unsafeWindow.console.warn;
  unsafeWindow.console.warn = new Proxy(origWarn, {
    apply: (target, thisArg, args) => {
      if (args.length === 1 && args[0] === 'https://svelte.dev/e/hydration_mismatch') {
        logger.warn('Svelte hydration mismatch detected');
        setTimeout(callback);
      }
      return Reflect.apply(target, thisArg, args);
    },
  });
});
