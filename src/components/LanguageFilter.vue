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
        v-for="[key, val] in filterOptions"
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
import type { JQElement } from '@/utils/languageFilter';
import { filterLanguage, filterOptions } from '@/utils/languageFilter';
import { i18n } from '@/i18n';

const { t } = i18n.global;

const languageFilter = useSessionStorage<string[]>('languageFilter', [], {
  listenToStorageChanges: false,
});

watch(
  languageFilter,
  val => {
    filterLanguage(val);
  },
  { deep: true, immediate: true },
);

defineExpose({
  filterLanguage: ($node?: JQElement) => {
    filterLanguage(languageFilter.value, $node);
  },
});
</script>

<style lang="less" scoped>
.language-filter {
  display: inline-flex;
  align-items: center;
  padding-left: 10px;
  vertical-align: middle;
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
