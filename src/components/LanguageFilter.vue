<template>
  <li class="language-filter">
    <el-select
      v-model="languageFilter"
      class="filter-select"
      multiple
      collapse-tags
      collapse-tags-tooltip
      :placeholder="t('common.filter')"
    >
      <el-option v-for="[key, val] in options" :key="key" :label="langAbbr[key]" :value="val">{{
        t(`common.${key}`)
      }}</el-option>
    </el-select>
  </li>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { without } from 'lodash-es';
import { useSessionStorage } from '@vueuse/core';
import { IS_NHENTAI_TO } from '@/const';
import { filterLanguage } from '@/utils/languageFilter';
import { i18n } from '@/i18n';

const { t } = i18n.global;

const languageFilter = useSessionStorage<string[]>('languageFilter', [], {
  listenToStorageChanges: false,
});

const langAbbr: Record<string, string> = {
  japanese: 'JP',
  english: 'EN',
  chinese: 'CN',
};

const options = IS_NHENTAI_TO
  ? [
      ['japanese', '2'],
      ['english', '19'],
      ['chinese', '10197'],
    ]
  : [
      ['japanese', '6346'],
      ['english', '12227'],
      ['chinese', '29963'],
    ];

const allValues = options.map(([, v]) => v);

const getNeedHideValues = () =>
  languageFilter.value.length ? without(allValues, ...languageFilter.value) : [];

watch(
  languageFilter,
  val => {
    filterLanguage(getNeedHideValues());
  },
  { deep: true, immediate: true },
);

defineExpose({
  filterLanguage: ($node?: Parameters<typeof filterLanguage>['1']) => {
    filterLanguage(getNeedHideValues(), $node);
  },
});
</script>

<style lang="less" scoped>
.language-filter {
  padding-left: 10px;
  margin-right: -140px;
}

.filter-select {
  width: 140px;

  :deep(.el-input__inner) {
    color: var(--el-input-text-color, var(--el-text-color-regular)) !important;
    background: 0 0 !important;
  }
}
</style>
