import $ from 'jquery';
import { downloadAgainConfirm, errorRetryConfirm } from '../dialog';
import { addDownloadGalleryTask } from '../download';
import { isDownloadedByGid, isDownloadedByTitle, markAsDownloaded } from '../downloadHistory';
import logger from '../logger';
import { getGalleryInfo, NHentaiGalleryInfo } from '../nhentai';
import { ProgressDisplayController } from '../progressController';
import { settings } from '../settings';
import { createLangFilter, langFilter } from '../langFilter';
import { dlQueue } from '@/common/queue';

export const initListPage = (): void => {
  $('.gallery').each(initGallery);
  initLangFilter();
  initShortcut();
  restoreDownloadQueue();
};

/** 语言过滤 */
const initLangFilter = (): void => {
  const $langFilter = createLangFilter();

  const contentEl = $('#content')[0];
  if (contentEl) {
    new MutationObserver(mutations => {
      mutations.forEach(({ addedNodes }) => {
        addedNodes.forEach(node => {
          const $el = $(node as HTMLElement);
          $el.find('.gallery').each(initGallery);
          const lang = $langFilter.val() as string;
          if (lang) langFilter(lang, $el);
        });
      });
    }).observe(contentEl, { childList: true });
  }

  const storedLangFilterVal = sessionStorage.getItem('lang-filter');
  if (storedLangFilterVal) {
    $langFilter.val(storedLangFilterVal);
    langFilter(storedLangFilterVal);
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

  const $a = $gallery.find('a.cover');
  if (settings.openOnNewTab) $a.attr('target', '_blank');
  const gid = /[0-9]+/.exec($a.attr('href')!)?.[0];
  if (!gid) return;

  const progressDisplayController = new ProgressDisplayController();
  const { $btn } = progressDisplayController;
  $gallery.prepend($btn);

  const markGalleryDownloaded = (): void => {
    $gallery.addClass('downloaded');
  };

  void isDownloadedByGid(gid).then(downloaded => {
    if (downloaded) markGalleryDownloaded();
  });

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
      !(await downloadAgainConfirm(gallery.title, true))
    ) {
      progressDisplayController.reset();
      markAsDownloaded(gid, gallery.title);
      markGalleryDownloaded();
      return;
    }

    addDownloadGalleryTask(gallery, { progressDisplayController, markGalleryDownloaded });
  };

  $btn.on('click', startDownload);
};
