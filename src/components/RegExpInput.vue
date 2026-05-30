<template>
  <el-input v-model="value" :class="{ 'is-error': isError }">
    <template #prefix>
      <span v-if="regexp" class="no-sl">/</span>
    </template>
    <template #suffix>
      <span v-if="regexp" class="no-sl">/</span>
    </template>
  </el-input>
</template>

<script setup lang="ts">
import { ElInput } from 'element-plus';
import { computed } from 'vue';

const { regexp } = defineProps<{
  regexp?: boolean;
}>();

const value = defineModel<string>({ default: '', required: true });

const isError = computed(() => {
  if (!regexp) return false;
  try {
    return (new RegExp(value.value), false);
  } catch {
    return true;
  }
});
</script>

<style lang="less" scoped>
.is-error {
  --el-input-border-color: var(--el-color-danger);
  --el-input-hover-border-color: var(--el-color-danger);
  --el-input-focus-border-color: var(--el-color-danger);
}
</style>
