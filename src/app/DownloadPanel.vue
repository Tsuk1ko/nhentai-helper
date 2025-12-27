<template>
  <DownloadList v-if="infoList.length" :zip-list="zipList" :dl-list="dlList" />
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { dlQueue, zipQueue } from '@/common/queue';
import DownloadList from '@/components/DownloadList.vue';

const { title } = document;

const zipList = computed(() => zipQueue.queue.map(({ info }) => info));
const dlList = computed(() => dlQueue.queue.map(({ info }) => info));
const infoList = computed(() => [...zipList.value, ...dlList.value]);
const error = computed(() => !!dlList.value[0]?.error);

const titleWithStatus = computed(() => {
  if (error.value) return `[×] ${title}`;
  const len = infoList.value.length;
  return `[${len || '✓'}] ${title}`;
});

watch(infoList, val => {
  sessionStorage.setItem('downloadQueue', JSON.stringify(val.map(({ gallery }) => gallery)));
});

watch(titleWithStatus, val => {
  document.title = val;
});
</script>
