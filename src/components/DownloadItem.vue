<template>
  <div
    class="download-item"
    :class="{
      'download-item--error': item.error,
      'download-item--compressing': item.compressing && !item.error,
      'download-item--can-cancel': canCancel,
    }"
    :title="title"
  >
    <div v-if="canCancel" class="download-item__cancel" @click="cancel">
      <i class="fa fa-times"></i>
    </div>
    <div class="download-item__title">{{ title }}</div>
    <div class="download-item__progress" :style="{ width: `${progressWidth}%` }">
      <div class="download-item__progress-text">{{ progressWidth }}%</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { MangaDownloadInfo } from '@/typings';
import { dlQueue } from '@/common/queue';
import { removeAt } from '@/utils/array';

const props = defineProps<{
  item: MangaDownloadInfo;
  index: number;
}>();

const title = computed(() => {
  const { english, japanese, pretty } = props.item.gallery.title;
  return japanese || english || pretty;
});

const progressWidth = computed(() => {
  const {
    gallery: { pages },
    done,
    compressing,
    compressingPercent,
  } = props.item;
  const page = pages.length;
  return compressing ? compressingPercent : page && done ? ((100 * done) / page).toFixed(2) : 0;
});

const canCancel = computed(() => !props.item.compressing);

const cancel = () => {
  const { info } = props.index === 0 ? dlQueue.queue[0] : removeAt(dlQueue.queue, props.index)!;
  info?.cancel?.();
};
</script>

<style lang="less" scoped>
.download-item {
  position: relative;
  white-space: nowrap;
  padding: 2px;
  overflow: visible;
  &--can-cancel:hover {
    width: calc(100% - 30px);
  }
  &__cancel {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: -30px;
    color: #f44336;
    font-size: 20px;
    line-height: 30px;
    width: 30px;
  }
  &__title {
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
  }
  &__progress {
    background-color: rgba(0, 0, 255, 0.5);
    line-height: 10px;
    .download-item--error & {
      background-color: rgba(255, 0, 0, 0.5);
    }
    .download-item--compressing & {
      background-color: rgba(0, 255, 0, 0.5);
    }
    &-text {
      transform: scale(0.8);
    }
  }
}
</style>
