import $ from 'jquery';
import { last, template } from 'lodash-es';
import type { JSZipGeneratorOptions } from 'jszip';
import { settings } from './settings';
import { NHentaiGalleryInfo } from './nhentai';
import { IS_NHENTAI_X } from '@/const';
import { MangaDownloadInfo } from '@/typings';

export const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const compileTemplate = (tpl: string) => template(tpl, { interpolate: /{{([\s\S]+?)}}/g });

export const getDownloadExt = (): string => {
  const ext = last(settings.compressionFileName.split('.'));
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

/** 本子浏览模式 */
export const applyOnlineViewStyle = (enable: boolean): void => {
  if (enable) {
    $('body').append(
      `<style id="online-view-mode-style">#image-container img{width:auto;max-width:calc(100vw - 20px);max-height:${
        IS_NHENTAI_X ? '100vh' : 'calc(100vh - 65px)'
      }}</style>`,
    );
    return;
  }
  $('#online-view-mode-style').remove();
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

export const createMangaDownloadInfo = (gallery: NHentaiGalleryInfo): MangaDownloadInfo => ({
  gallery,
  done: 0,
  compressing: false,
  compressingPercent: '0',
  error: false,
});
