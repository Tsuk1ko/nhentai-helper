import { GM_addStyle, GM_getResourceText } from '$';
import $ from 'jquery';
import { last, template } from 'lodash-es';
import type { JSZipGeneratorOptions } from 'jszip';
import { markRaw, reactive } from 'vue';
import { settings } from './settings';
import type { NHentaiGalleryInfo } from './nhentai';
import type { MangaDownloadInfo } from '@/typings';

export const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const compileTemplate = (tpl: string) => template(tpl, { interpolate: /{{([\s\S]+?)}}/g });

export const getDownloadExt = (): string => {
  const ext = last(settings.compressionFilename.split('.'));
  if (ext) return ext.toLowerCase();
  return 'zip';
};

export const getCompressionOptions = (): JSZipGeneratorOptions => {
  return {
    streamFiles: settings.compressionStreamFiles,
    compression: settings.compressionLevel > 0 ? 'DEFLATE' : 'STORE',
    compressionOptions: { level: settings.compressionLevel },
  };
};

export const getShowAllBtn = (): Promise<JQuery<HTMLElement>> =>
  new Promise((resolve, reject) => {
    const $btn = $('#show-all-images-button');
    if ($btn.length > 0) {
      resolve($btn);
      return;
    }
    const container = document.getElementById('thumbnail-container');
    if (!container) {
      reject(new Error('Show all button not found'));
      return;
    }
    new MutationObserver((mutations, self) => {
      mutations.forEach(({ addedNodes }) => {
        const btnContainer = addedNodes[0] as HTMLElement | undefined;
        if (btnContainer?.id === 'show-all-images-container') {
          self.disconnect();
          resolve($('#show-all-images-button'));
        }
      });
    }).observe(container, { childList: true });
  });

export const createMangaDownloadInfo = (
  gallery: NHentaiGalleryInfo,
  needReactive = false,
): MangaDownloadInfo => {
  const info = {
    gallery,
    done: 0,
    compressing: false,
    compressingPercent: '0',
    error: false,
  };
  if (needReactive) {
    markRaw(info.gallery);
    return reactive(info);
  }
  return info;
};

export const addResourceStyle = (name: string): ReturnType<typeof GM_addStyle> =>
  GM_addStyle(GM_getResourceText(name));
