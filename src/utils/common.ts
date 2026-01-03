import { GM_addStyle, GM_getResourceText } from '$';
import { last } from 'es-toolkit';
import { template } from 'es-toolkit/compat';
import $ from 'jquery';
import { markRaw, reactive } from 'vue';
import { selector } from '@/rules/selector';
import type { MangaDownloadInfo } from '@/typings';
import type { JSZipGeneratorOptionsCustom } from '@/workers/jszip';
import type { NHentaiGalleryInfo } from './nhentai';
import { settings } from './settings';

export const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export const compileTemplate = (tpl: string): ((data?: object) => string) =>
  template(tpl, { interpolate: /\{\{([\s\S]+?)\}\}/g });

export const getDownloadExt = (): string => {
  const ext = last(settings.compressionFilename.split('.'));
  if (ext) return ext.toLowerCase();
  return 'zip';
};

export const getCompressionOptions = (): JSZipGeneratorOptionsCustom => {
  return {
    removeAdPage: settings.removeAdPage,
    streamFiles: settings.compressionStreamFiles,
    compression: settings.compressionLevel > 0 ? 'DEFLATE' : 'STORE',
    compressionOptions: { level: settings.compressionLevel },
  };
};

export const getShowAllBtn = (): Promise<JQuery<HTMLElement>> =>
  new Promise((resolve, reject) => {
    const $btn = $(selector.showAllImagesButton);
    if ($btn.length > 0) {
      resolve($btn);
      return;
    }
    const container = document.querySelector(selector.thumbnailContainer);
    if (!container) {
      reject(new Error('Show all button not found'));
      return;
    }
    new MutationObserver((mutations, self) => {
      mutations.forEach(({ addedNodes }) => {
        const btnContainer = addedNodes[0] as HTMLElement | undefined;
        if (btnContainer?.id === 'show-all-images-container') {
          self.disconnect();
          resolve($(selector.showAllImagesButton));
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

export const tryParseJSON = <T = unknown>(str: unknown): T | undefined => {
  if (typeof str !== 'string') return;
  try {
    return JSON.parse(str);
  } catch {}
};
