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
      <el-option
        v-for="[key, val] in options"
        :key="key"
        :label="t(`common.abbr.${key}`)"
        :value="val"
        >{{ t(`common.${key}`) }}</el-option
      >
    </el-select>
  </li>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { ElSelect, ElOption } from 'element-plus';
import { useSessionStorage } from '@vueuse/core';
import { IS_NHENTAI_TO } from '@/const';
import { filterLanguage } from '@/utils/languageFilter';
import { i18n } from '@/i18n';

const { t } = i18n.global;

const languageFilter = useSessionStorage<string[]>('languageFilter', [], {
  listenToStorageChanges: false,
});

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

watch(
  languageFilter,
  val => {
    filterLanguage(val);
  },
  { deep: true, immediate: true },
);

defineExpose({
  filterLanguage: ($node?: Parameters<typeof filterLanguage>['1']) => {
    filterLanguage(languageFilter.value, $node);
  },
});
</script>

<style lang="less" scoped>
.language-filter {
  padding-left: 10px;
}

.filter-select {
  @width: 140px;
  width: @width;
  margin-right: -@width;

  :deep(.el-input__inner) {
    color: var(--el-input-text-color, var(--el-text-color-regular)) !important;
    background: 0 0 !important;
  }
}

@media screen and (max-width: 644px) {
  .language-filter {
    padding: 10px 0;
  }
  .filter-select {
    margin-right: 0;
  }
}
</style>
