import { GM_addStyle } from '$';
import { onWatcherCleanup, toValue, watchEffect } from 'vue';
import type { MaybeRefOrGetter } from 'vue';

export const useStyle = (style: MaybeRefOrGetter<string | false | null | undefined>) =>
  watchEffect(() => {
    const styleText = toValue(style);
    const styleEl = styleText ? GM_addStyle(styleText) : null;
    onWatcherCleanup(() => {
      styleEl?.remove();
    });
  });
