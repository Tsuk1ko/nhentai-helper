import $ from 'jquery';
import { downloadAgainConfirm, errorRetryConfirm } from '../dialog';
import { addDownloadGalleryTask } from '../download';
import {
  isDownloadedByGid,
  isDownloadedByTitle,
  markAsDownloaded,
  unmarkAsDownloaded,
} from '../downloadHistory';
import logger from '../logger';
import { getGalleryInfo, NHentaiGallery, type NHentaiGalleryInfo } from '../nhentai';
import { ProgressDisplayController } from '../progressController';
import { settings } from '../settings';
import { createLangFilter, filterLang } from '../langFilter';
import { IgnoreController } from '../ignoreController';
import { dlQueue } from '@/common/queue';

export const initListPage = (): void => {
  $('.gallery').each(initGallery);
  const langFilter = initLangFilter();
  initShortcut();
  restoreDownloadQueue();

  const contentEl = $('#content')[0];
  if (contentEl) {
    new MutationObserver(mutations => {
      mutations.forEach(({ addedNodes }) => {
        addedNodes.forEach(node => {
          const $el = $(node as HTMLElement);
          $el.find('.gallery').each(initGallery);
          const lang = langFilter.value;
          if (lang) filterLang(lang, $el);
        });
      });
    }).observe(contentEl, { childList: true });
  }
};

/** 语言过滤 */
const initLangFilter = (): HTMLSelectElement => {
  const langFilter = createLangFilter();

  const storedLangFilterVal = sessionStorage.getItem('lang-filter');
  if (storedLangFilterVal) {
    langFilter.value = storedLangFilterVal;
    filterLang(storedLangFilterVal);
  }

  return langFilter;
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

  let gallery: NHentaiGalleryInfo | undefined;
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

    if (!gallery) {
      try {
        gallery = await getGalleryInfo(gid);
        galleryTitle = gallery.title;
      } catch (error) {
        logger.error(error);
        progressDisplayController.error();
        errorRetryConfirm('getting information', undefined, startDownload);
        return;
      }
    }

    if (
      !skipDownloadedCheck &&
      ((await isDownloadedByTitle(gallery.title)) ||
        dlQueue.queue.some(
          ({
            info: {
              gallery: { title },
            },
          }) => title === gallery!.title,
        )) &&
      !(await downloadAgainConfirm(gallery.title.japanese || gallery.title.english, true))
    ) {
      progressDisplayController.reset();
      markAsDownloaded(gid, gallery.title);
      markGalleryDownloaded();
      return;
    }

    addDownloadGalleryTask(gallery, { progressDisplayController, markGalleryDownloaded });
  };

  downloadBtn.addEventListener('click', startDownload);
};
