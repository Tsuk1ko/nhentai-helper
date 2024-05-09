<template>
  <el-popover
    ref="popoverRef"
    v-model:visible="visible"
    :virtual-ref="virtualRef"
    virtual-triggering
    :placement="popoverPlacement"
    trigger="hover"
  >
    <span> Some content </span>
  </el-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElPopover } from 'element-plus';

const visible = ref(false);
const virtualRef = ref<HTMLElement>();
const popoverRef = ref<HTMLElement>();
const popoverPlacement = ref<InstanceType<typeof ElPopover>['placement']>('right');

const open = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  const showRight = rect.left + rect.right <= document.body.clientWidth;
  popoverPlacement.value = showRight ? 'right' : 'left';
  virtualRef.value = el;
  visible.value = true;
};

defineExpose({ open });
</script>

<style></style>
