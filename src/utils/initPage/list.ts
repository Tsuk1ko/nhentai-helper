import $ from 'jquery';
import { downloadAgainConfirm, errorRetryConfirm } from '../dialog';
import { addDownloadGalleryTask } from '../download';
import {
  isDownloadedByGid,
  isDownloadedByTitle,
  isSameTitle,
  markAsDownloaded,
  unmarkAsDownloaded,
} from '../downloadHistory';
import logger from '../logger';
import { getGalleryInfo } from '../nhentai';
import type { NHentaiGallery, NHentaiGalleryInfo } from '../nhentai';
import { ProgressDisplayController } from '../progressController';
import { settings } from '../settings';
import { IgnoreController } from '../ignoreController';
import { mountLanguageFilter } from '../languageFilter';
import { openGalleryMiniPopover } from '../galleryMiniPopover';
import { dlQueue } from '@/common/queue';
import { ErrorAction } from '@/typings';

export const initListPage = (): void => {
  $('.gallery').each(initGallery);
  const { filterLanguage } = mountLanguageFilter();
  initShortcut();
  restoreDownloadQueue();

  const contentEl = $('#content')[0];
  if (contentEl) {
    new MutationObserver(mutations => {
      mutations.forEach(({ addedNodes }) => {
        addedNodes.forEach(node => {
          const $el = $(node as HTMLElement);
          $el.find('.gallery').each(initGallery);
          filterLanguage?.($el);
        });
      });
    }).observe(contentEl, { childList: true });
  }
};

const initShortcut = (): void => {
  // 左右键翻页
  $(document).on('keydown', event => {
    switch (event.key) {
      case 'ArrowLeft':
        $('.pagination .previous').trigger('click');
        break;
      case 'ArrowRight':
        $('.pagination .next').trigger('click');
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

  const $a = $gallery.find('a.cover');
  if (settings.openOnNewTab) $a.attr('target', '_blank');
  const gid = /\/g\/([0-9]+)/.exec($a.attr('href')!)?.[1];
  if (!gid) return;
  const enTitle = $gallery.find('.caption').text().trim();

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
      const title = $gallery.find('.caption').text();
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
  };

  downloadBtn.addEventListener('click', startDownload);

  initHoverOpenPopup(this);
};

const initHoverOpenPopup = (el: HTMLElement) => {
  let timer: NodeJS.Timeout | null = null;

  el.addEventListener('mouseenter', () => {
    console.log('enter');
    timer = setTimeout(() => {
      console.log('open');
      timer = null;
      openGalleryMiniPopover(el);
    }, 1000);
  });

  el.addEventListener('mouseleave', () => {
    console.log('leave');
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  });
};
