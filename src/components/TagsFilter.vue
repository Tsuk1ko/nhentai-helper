<template>
  <li class="tags-filter">
    <el-select
      v-model="filterTagsKeys"
      class="filter-select"
      multiple
      collapse-tags
      collapse-tags-tooltip
      :placeholder="t('common.filter')"
    >
      <el-option-group
        v-for="(tags, group) in filterTagsKeysGrouped"
        :key="group"
        class="filter-option-group"
        :label="t(`common.${group}`)"
      >
        <el-option
          v-for="tag in tags"
          :key="tag"
          class="filter-option"
          :label="t(`common.abbr.${tag}`)"
          :value="tag"
          >{{ t(`common.${tag}`) }}</el-option
        >
      </el-option-group>
    </el-select>
  </li>
</template>

<script setup lang="ts">
import { useSessionStorage } from '@vueuse/core';
import { ElOption, ElOptionGroup, ElSelect } from 'element-plus';
import { compact } from 'es-toolkit';
import { computed, watch } from 'vue';
import { i18n } from '@/i18n';
import type { JQElement } from '@/utils/tagsFilter';
import { doFilterTags, filterTagsKeysGrouped, filterTagsMap } from '@/utils/tagsFilter';

const { t } = i18n.global;

const filterTagsKeys = useSessionStorage<string[]>('filterTagsKeys', [], {
  listenToStorageChanges: false,
});

const filterTags = computed(() => compact(filterTagsKeys.value.map(key => filterTagsMap[key])));

watch(
  filterTags,
  val => {
    doFilterTags(val);
  },
  { deep: true, immediate: true },
);

defineExpose({
  doFilterTags: ($node?: JQElement) => {
    doFilterTags(filterTags.value, $node);
  },
});
</script>

<style lang="less" scoped>
.tags-filter {
  display: inline-flex;
  align-items: center;
  padding-left: 10px;
  vertical-align: middle;
}

.filter-option {
  text-align: center;
}

.filter-option-group {
  :deep(.el-select-group__title) {
    text-align: left;
    padding: 0 12px;
    line-height: 24px;
  }
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
  .tags-filter {
    padding: 10px 0;
  }
  .filter-select {
    margin-right: 0;
  }
}
</style>
