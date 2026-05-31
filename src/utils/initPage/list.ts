import { debounce, once } from 'es-toolkit';
import $ from 'jquery';
import { dlQueue } from '@/common/queue';
import { IS_NHENTAI } from '@/const';
import { selector } from '@/rules/selector';
import { ErrorAction } from '@/typings';
import { needRunComplexDebug } from '../common';
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
import { lastDownload } from '../lastDownload';
import { logger } from '../logger';
import {
  broadcastMarkDownloadedUpdate,
  initListenMarkDownloadedUpdateForGalleries,
} from '../markDownloaded';
import { getGalleryInfo } from '../nhentai';
import type { NHentaiGallery, NHentaiGalleryInfo } from '../nhentai';
import { ProgressDisplayController } from '../progressController';
import { isTitleBlacklisted, settings } from '../settings';
import { mountTagsFilter } from '../tagsFilter';
import type { JQElement } from '../tagsFilter';

const UNCENSORED_REG = /(?:un|de)censored/i;

let doFilterTags: (($node?: JQElement) => void) | undefined;

const debounceDoFilterTags = debounce((el: HTMLElement) => {
  logger.debug('debounceDoFilterTags', el);
  doFilterTags?.($(el));
}, 0);

export const initListPage = (): void => {
  logger.info('init list page');
  initGalleries();
  const tagsFilter = mountTagsFilter();
  doFilterTags = tagsFilter.doFilterTags;
  onceInit();
};

const onceInit = once(() => {
  initShortcut();
  lastDownload.init();
  restoreDownloadQueue();
  initMutationObserver();
  clickDebugLog();
});

const clickDebugLog = () => {
  document.addEventListener('click', e => {
    if (!(needRunComplexDebug() && e.target instanceof HTMLElement)) return;
    const paginationEl = e.target.closest(selector.pjaxTrigger);
    if (paginationEl) {
      const $el = $(paginationEl);
      const clicked = ['next', 'previous', 'first', 'last'].some(className => {
        if ($el.hasClass(className)) {
          logger.debug(`click pagination ${className}`);
          return true;
        }
        return false;
      });
      if (clicked) return;
      if ($el.hasClass('page')) {
        logger.debug('click pagination', $el.text());
        return;
      }
      logger.debug('click', paginationEl);
    }
  });
};

const isHTMLElement = (node: Node): node is HTMLElement => {
  return node instanceof HTMLElement || String(node) === '[object HTMLDivElement]';
};

const initMutationObserver = () => {
  new MutationObserver(mutations => {
    mutations.forEach(({ addedNodes, target }) => {
      if (!addedNodes.length || !(target instanceof HTMLElement)) return;
      if (
        needRunComplexDebug() &&
        !(
          target.closest('.nhentai-helper-btn,.el-popper,[data-v-app]') ||
          target.classList.contains('nhentai-helper-gallery') ||
          target.id.startsWith('el-')
        )
      ) {
        logger.debug('MutationObserver#body', { target, addedNodes });
      }
      addedNodes.forEach(node => {
        if (!isHTMLElement(node)) return;

        // Svelte
        if (target.parentElement?.matches(selector.gallery)) {
          const el = target.parentElement;
          (el as any)._nhentaiHelperDestroy?.();
          initGallery.call(el);
          if (el.parentElement) debounceDoFilterTags(el.parentElement);
        }

        // Super Preloader / 东方永页机
        if (
          node.tagName === 'DIV' &&
          (node.matches(selector.galleryList) ||
            node.parentElement?.matches(selector.galleryList) ||
            node.matches('.gallery-grid'))
        ) {
          const $el = $(node as HTMLElement);
          $el.find(selector.gallery).each(initGallery);
          doFilterTags?.($el);
        }
      });
    });
  }).observe(document.body, { subtree: true, childList: true });
};

export const initGalleries = () => {
  logger.info('init galleries');
  $(selector.gallery).each(initGallery);
  initListenMarkDownloadedUpdateForGalleries();
};

const initShortcut = (): void => {
  const ignoreActiveElTags = new Set(['INPUT', 'TEXTAREA']);
  // 左右键翻页
  document.addEventListener('keydown', event => {
    const activeElTag = document.activeElement?.tagName || '';
    if (ignoreActiveElTags.has(activeElTag)) return;
    switch (event.key) {
      case 'ArrowLeft':
        (document.querySelector(selector.paginationPrevious) as HTMLElement)?.click();
        break;
      case 'ArrowRight':
        (document.querySelector(selector.paginationNext) as HTMLElement)?.click();
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

const initGallery = function (this: HTMLElement) {
  logger.debug('initGallery', this);

  const $gallery = $(this);

  if ($gallery.attr('init')) return;
  $gallery.attr('init', 'true');
  $gallery.addClass('nhentai-helper-gallery');

  const $a = $gallery.find(selector.galleryCover);
  if (settings.openOnNewTab) $a.attr('target', '_blank');
  const gid = /\/g\/(\d+)/.exec($a.attr('href')!)?.[1];
  if (!gid) return;
  this.dataset.gid = gid;
  const enTitle = $gallery.find(selector.galleryCaption).text().trim();
  $gallery.toggleClass('nhentai-helper-blacklist', isTitleBlacklisted.value(enTitle));

  logger.debug('initGallery gid', gid);

  const isNotSelf = () => gid !== this.dataset.gid;

  // for tag filter
  if (IS_NHENTAI) {
    if (UNCENSORED_REG.test(enTitle)) {
      $gallery.addClass('uncensored');
    } else {
      $gallery.removeClass('uncensored');
    }
  }

  const progressDisplayController = new ProgressDisplayController();
  const { downloadBtn } = progressDisplayController;
  $gallery.append(downloadBtn);

  let ignoreController: IgnoreController | undefined;
  let galleryTitle: NHentaiGallery['title'] | undefined;

  const markGalleryDownloaded = (isDownloaded: boolean, needBroadcast = true): void => {
    if (isNotSelf()) return;
    if (isDownloaded) $gallery.addClass('downloaded');
    else $gallery.removeClass('downloaded');
    ignoreController?.setStatus(isDownloaded);
    if (needBroadcast) broadcastMarkDownloadedUpdate(gid, isDownloaded);
  };

  // @ts-ignore
  this._markGalleryDownloaded = markGalleryDownloaded;

  void Promise.all([isDownloadedByGid(gid), isDownloadedByTitle({ english: enTitle })]).then(
    ([gidDownloaded, titleDownloaded]) => {
      const downloaded = gidDownloaded || titleDownloaded;
      if (downloaded) markGalleryDownloaded(downloaded);

      if (settings.showIgnoreButton) {
        ignoreController = new IgnoreController(false, downloaded);
        const { ignoreBtn } = ignoreController;
        ignoreBtn.addEventListener('click', () => {
          const ignore = ignoreController!.getStatus();
          if (ignore) {
            markGalleryDownloaded(false);
            unmarkAsDownloaded(gid, galleryTitle);
          } else {
            markGalleryDownloaded(true);
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
        markGalleryDownloaded(true);
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
        markGalleryDownloaded(true);
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

    addDownloadGalleryTask(gallery, {
      progressDisplayController,
      markGalleryDownloaded: () => markGalleryDownloaded(true),
    });
    lastDownload.update(gid);
  };

  downloadBtn.addEventListener('click', startDownload);

  const onContextMenu = (e: MouseEvent) => {
    if (!settings.galleryContextmenuPreview) return;
    e.preventDefault();
    openGalleryMiniPopover(this, gid);
  };

  this.addEventListener('contextmenu', onContextMenu);

  (this as any)._nhentaiHelperDestroy = () => {
    this.removeEventListener('contextmenu', onContextMenu);
    $gallery.removeAttr('init');
    $gallery.removeClass('downloaded');
    $gallery.removeClass('nhentai-helper-blacklist');
    progressDisplayController.destroy();
    ignoreController?.destroy();
    delete (this as any)._nhentaiHelperDestroy;
  };
};
