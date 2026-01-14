import { once } from 'es-toolkit';
import $ from 'jquery';
import { selector } from '@/rules/selector';

const bc = new BroadcastChannel('nhentai-helper-mark-update');

export const onMarkDownloadedUpdate = (callback: (gid: number, value: boolean) => void) => {
  bc.addEventListener('message', event => {
    const { gid, value } = event.data;
    callback(gid, value);
  });
};

export const initListenMarkDownloadedUpdateForGalleries = once(() => {
  onMarkDownloadedUpdate((gid, value) => {
    $(`${selector.gallery}[data-gid="${gid}"]`).each(function () {
      // @ts-ignore
      this._markGalleryDownloaded?.(value, false);
    });
  });
});

export const boardcastMarkDownloadedUpdate = (gid: string | number, value: boolean) => {
  bc.postMessage({ gid: Number(gid), value });
};
