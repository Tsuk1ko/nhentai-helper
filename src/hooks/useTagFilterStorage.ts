import { useLocalStorage, useSessionStorage } from '@vueuse/core';
import { computed, watch } from 'vue';
import { logger } from '@/utils/logger';
import { settings } from '@/utils/settings';

const STORAGE_KEY = 'nHelper.filterTagsKeys';

export const useTagFilterStorage = () => {
  const sessionValue = useSessionStorage<string[]>(STORAGE_KEY, [], {
    listenToStorageChanges: false,
  });

  const localValue = useLocalStorage<string[]>(STORAGE_KEY, []);

  watch(
    () => settings.persistTagsFilter,
    val => {
      if (val) {
        localValue.value = sessionValue.value;
        logger.debug('useTagFilterStorage: sync session value to local value');
      } else {
        sessionValue.value = localValue.value;
        logger.debug('useTagFilterStorage: sync local value to session value');
      }
    },
  );

  const value = computed({
    get: () => (settings.persistTagsFilter ? localValue.value : sessionValue.value),
    set: value => {
      if (settings.persistTagsFilter) {
        localValue.value = value;
      } else {
        sessionValue.value = value;
      }
    },
  });

  return value;
};
