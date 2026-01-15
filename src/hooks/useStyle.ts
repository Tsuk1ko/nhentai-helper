import { GM_addStyle } from '$';
import { onWatcherCleanup, toValue, watchEffect } from 'vue';
import type { MaybeRefOrGetter } from 'vue';

export const useStyle = (style: MaybeRefOrGetter<string>) =>
  watchEffect(() => {
    const styleEl = GM_addStyle(toValue(style));
    onWatcherCleanup(() => {
      styleEl.remove();
    });
  });
