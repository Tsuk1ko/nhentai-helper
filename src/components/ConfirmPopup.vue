<template>
  <el-popconfirm
    :title="t('confirmPopup.title')"
    :confirm-button-text="t('confirmPopup.yes')"
    :cancel-button-text="t('confirmPopup.no')"
    placement="top"
    @confirm="(...args) => emit('confirm', ...args)"
  >
    <template #reference>
      <slot></slot>
    </template>
  </el-popconfirm>
</template>

<script setup lang="ts">
import { ElPopconfirm } from 'element-plus';
import { useI18n } from 'vue-i18n';

const emit = defineEmits(['confirm']);
const { t } = useI18n();
</script>
