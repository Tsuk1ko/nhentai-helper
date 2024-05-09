import { once } from 'lodash-es';
import { createAppAndMount } from './app';
import GalleryMiniPopover from '@/app/GalleryMiniPopover.vue';

const initApp = once(() => createAppAndMount(GalleryMiniPopover));

export const openGalleryMiniPopover = (el: HTMLElement) => {
  const popup = initApp();
  popup.open(el);
};
