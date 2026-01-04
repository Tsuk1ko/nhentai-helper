import $ from 'jquery';
import { dlQueue } from '@/common/queue';
import { selector } from '@/rules/selector';
import { ErrorAction } from '@/typings';
import { downloadAgainConfirm, errorRetryConfirm } from '../dialog';
import { addDownloadGalleryTask } from '../download';
import {
  isDownloadedByGid,
  isDownloadedByTitle,
  isSameTitle,
  markAsDownloaded,
  unmarkAsDownloaded,
} from '../downloadHistory';
import { openGalleryMiniPopover } from '../galleryMiniPopover';
import { IgnoreController } from '../ignoreController';
import { mountLanguageFilter } from '../languageFilter';
import { initLastDownload, updateLastDownload } from '../lastDownload';
import logger from '../logger';
import { getGalleryInfo } from '../nhentai';
import type { NHentaiGallery, NHentaiGalleryInfo } from '../nhentai';
import { ProgressDisplayController } from '../progressController';
import { settings } from '../settings';

export const initListPage = (): void => {
  $(selector.gallery).each(initGallery);
  const { filterLanguage } = mountLanguageFilter();
  initShortcut();
  initLastDownload();
  restoreDownloadQueue();

  const contentEl = document.querySelector(selector.galleryList);
  if (contentEl) {
    new MutationObserver(mutations => {
      mutations.forEach(({ addedNodes }) => {
        addedNodes.forEach(node => {
          const $el = $(node as HTMLElement);
          $el.find(selector.gallery).each(initGallery);
          filterLanguage?.($el);
        });
      });
    }).observe(contentEl, { childList: true });
  }
};

const initShortcut = (): void => {
  const ignoreActiveElTags = new Set(['INPUT', 'TEXTAREA']);
  // 左右键翻页
  $(document).on('keydown', event => {
    const activeElTag = document.activeElement?.tagName || '';
    if (ignoreActiveElTags.has(activeElTag)) return;
    switch (event.key) {
      case 'ArrowLeft':
        $(selector.paginationPrevious).trigger('click');
        break;
      case 'ArrowRight':
        $(selector.paginationNext).trigger('click');
        break;
    }
  });
};

/** 还原下载队列 */
const restoreDownloadQueue = (): void => {
  const galleriesJson = sessionStorage.getItem('downloadQueue');
  if (!galleriesJson) return;
  try {
    const galleries: NHentaiGalleryInfo[] = JSON.parse(galleriesJson);
    for (const gallery of galleries) {
      addDownloadGalleryTask(gallery);
    }
  } catch (error) {
    logger.error(error);
  }
};

const initGallery: Parameters<JQuery['each']>['0'] = function () {
  const $gallery = $(this);

  if ($gallery.attr('init')) return;
  $gallery.attr('init', 'true');
  $gallery.addClass('nhentai-helper-gallery');

  const $a = $gallery.find(selector.galleryCover);
  if (settings.openOnNewTab) $a.attr('target', '_blank');
  const gid = /\/g\/(\d+)/.exec($a.attr('href')!)?.[1];
  if (!gid) return;
  const enTitle = $gallery.find(selector.galleryCaption).text().trim();

  const progressDisplayController = new ProgressDisplayController();
  const { downloadBtn } = progressDisplayController;
  $gallery.append(downloadBtn);

  let ignoreController: IgnoreController | undefined;
  let galleryTitle: NHentaiGallery['title'] | undefined;

  const markGalleryDownloaded = (): void => {
    $gallery.addClass('downloaded');
    ignoreController?.setStatus(true);
  };
  const unmarkGalleryDownloaded = (): void => {
    $gallery.removeClass('downloaded');
    ignoreController?.setStatus(false);
  };

  void Promise.all([isDownloadedByGid(gid), isDownloadedByTitle({ english: enTitle })]).then(
    ([gidDownloaded, titleDownloaded]) => {
      const downloaded = gidDownloaded || titleDownloaded;
      if (downloaded) markGalleryDownloaded();

      if (settings.showIgnoreButton) {
        ignoreController = new IgnoreController(false, downloaded);
        const { ignoreBtn } = ignoreController;
        ignoreBtn.addEventListener('click', () => {
          const ignore = ignoreController!.getStatus();
          if (ignore) {
            unmarkGalleryDownloaded();
            unmarkAsDownloaded(gid, galleryTitle);
          } else {
            markGalleryDownloaded();
            markAsDownloaded(gid, galleryTitle);
          }
        });
        $gallery.append(ignoreBtn);
      }
    },
  );

  let skipDownloadedCheck = false;

  const startDownload = async (): Promise<void> => {
    if (!settings.autoCancelDownloadedManga) {
      progressDisplayController.lockBtn('Wait');
    }

    if (!skipDownloadedCheck && (await isDownloadedByGid(gid))) {
      const title = $gallery.find(selector.galleryCaption).text();
      if (!(await downloadAgainConfirm(title, true))) {
        progressDisplayController.reset();
        markGalleryDownloaded();
        return;
      }
      skipDownloadedCheck = true;
    }
    if (settings.autoCancelDownloadedManga) {
      progressDisplayController.lockBtn('Wait');
    }

    let gallery: NHentaiGalleryInfo;

    try {
      gallery = await getGalleryInfo(gid);
      galleryTitle = gallery.title;
    } catch (error) {
      logger.error(error);
      progressDisplayController.error();
      errorRetryConfirm(ErrorAction.GET_INFO, undefined, startDownload);
      return;
    }

    if (!skipDownloadedCheck) {
      if (
        (await isDownloadedByTitle(gallery.title)) &&
        !(await downloadAgainConfirm(gallery.title.japanese || gallery.title.english, true))
      ) {
        progressDisplayController.reset();
        markAsDownloaded(gid, gallery.title);
        markGalleryDownloaded();
        return;
      }
      if (
        dlQueue.queue.some(
          ({
            info: {
              gallery: { title },
            },
          }) => isSameTitle(title, gallery.title),
        ) &&
        !(await downloadAgainConfirm(gallery.title.japanese || gallery.title.english, true))
      ) {
        progressDisplayController.reset();
        return;
      }
    }

    addDownloadGalleryTask(gallery, { progressDisplayController, markGalleryDownloaded });
    updateLastDownload(gid);
  };

  downloadBtn.addEventListener('click', startDownload);

  this.addEventListener('contextmenu', e => {
    if (!settings.galleryContextmenuPreview) return;
    e.preventDefault();
    openGalleryMiniPopover(this, gid);
  });
};
