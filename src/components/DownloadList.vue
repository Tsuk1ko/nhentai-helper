<template>
  <div id="download-panel">
    <DownloadItem v-for="(item, index) in zipList" :key="index" :item="item" :index="index" />
    <DownloadItem v-for="(item, index) in dlList" :key="index" :item="item" :index="index" />
  </div>
</template>

<script setup lang="ts">
import DownloadItem from './DownloadItem.vue';
import { MangaDownloadInfo } from '@/typings';

defineProps<{
  zipList: MangaDownloadInfo[];
  dlList: MangaDownloadInfo[];
}>();
</script>

<style lang="less" scoped>
#download-panel {
  overflow-x: hidden;
  position: fixed;
  top: 20vh;
  right: 0;
  width: calc(50vw - 620px);
  max-width: 300px;
  min-width: 150px;
  max-height: 60vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
  font-size: 12px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 6px;
    background-color: rgba(0, 0, 0, 0.7);
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.6);
  }
}
</style>
