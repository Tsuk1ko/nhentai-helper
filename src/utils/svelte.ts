import { unsafeWindow } from '$';
import { once } from 'es-toolkit';
import { sleep } from './common';

const SVELTE_KEY = '__svelte';

export const getSvelteStatus = () => {
  const isSvelte = Object.keys(unsafeWindow).some(key => key.startsWith(SVELTE_KEY));
  return {
    isSvelte,
    isSvelteReady: isSvelte && !!document.querySelector('#svelte-announcer'),
  };
};

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
  const timeoutPromise = (async () => {
    await sleep(1000);
    observerAbortController.abort();
  })();
  return Promise.race([observerPromise, timeoutPromise]);
};

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
