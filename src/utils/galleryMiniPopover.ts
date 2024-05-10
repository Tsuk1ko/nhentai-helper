import { once } from 'lodash-es';
import { createAppAndMount } from './app';
import GalleryMiniPopover from '@/app/GalleryMiniPopover.vue';
import { i18n } from '@/i18n';

const initApp = once(() =>
  createAppAndMount(GalleryMiniPopover, app => {
    app.use(i18n);
  }),
);

export const openGalleryMiniPopover = (el: HTMLElement, gid: string) => {
  const popup = initApp();
  popup.open(el, gid);
};
