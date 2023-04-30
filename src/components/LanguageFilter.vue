<template>
  <li class="language-filter">
    {{ t('common.filter') }}
    <select v-model="languageFilter">
      <option v-for="[key, val] in options" :key="key" :value="val">
        {{ t(`common.${key}`) }}
      </option>
    </select>
  </li>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useSessionStorage } from '@vueuse/core';
import { IS_NHENTAI_TO } from '@/const';
import { filterLanguage } from '@/utils/languageFilter';
import { i18n } from '@/i18n';

const { t } = i18n.global;

const languageFilter = useSessionStorage('languageFilter', '0', { listenToStorageChanges: false });

const options = IS_NHENTAI_TO
  ? [
      ['none', '0'],
      ['japanese', '2'],
      ['english', '19'],
      ['chinese', '10197'],
    ]
  : [
      ['none', '0'],
      ['japanese', '6346'],
      ['english', '12227'],
      ['chinese', '29963'],
    ];

watch(
  languageFilter,
  val => {
    filterLanguage(val);
  },
  { immediate: true },
);

defineExpose({
  filterLanguage: ($node?: Parameters<typeof filterLanguage>['1']) => {
    filterLanguage(languageFilter.value, $node);
  },
});
</script>

<style lang="less" scoped>
.language-filter {
  padding: 0 10px;
  user-select: none;
}
</style>
