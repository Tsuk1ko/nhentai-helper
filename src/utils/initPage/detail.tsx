import { once } from 'es-toolkit';
import $ from 'jquery';
import { i18n } from '@/i18n';
import { selector } from '@/rules/selector';
import { createMangaDownloadInfo, getShowAllBtn } from '../common';
import { downloadAgainConfirm } from '../dialog';
import type { RangeChecker } from '../download';
import { downloadGalleryByInfo } from '../download';
import {
  isDownloadedByGid,
  isDownloadedByTitle,
  markAsDownloaded,
  unmarkAsDownloaded,
} from '../downloadHistory';
import { IgnoreController } from '../ignoreController';
import logger from '../logger';
import { boardcastMarkDownloadedUpdate, onMarkDownloadedUpdate } from '../markDownloaded';
import { getGalleryInfo } from '../nhentai';
import { ProgressDisplayController } from '../progressController';
import { settings } from '../settings';

const { t } = i18n.global;

export const initDetailPage = async (): Promise<void> => {
  const progressDisplayController = new ProgressDisplayController(true, document.title);

  const { downloadBtn } = progressDisplayController;
  const pagesInput = (
    <input
      class="pages-input"
      placeholder={t('input.downloadSpecifiedPages')}
      onKeydown={(e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          downloadBtn.click();
        }
      }}
    />
  ) as HTMLInputElement;
  $(selector.infoButtons).append(downloadBtn).after(pagesInput);

  const getGallery = once(() => getGalleryInfo());

  let ignoreController: IgnoreController | undefined;

  const markGalleryDownloaded = async (isDownloaded: boolean, needBoardcast = true) => {
    ignoreController?.setStatus(isDownloaded);
    if (needBoardcast) boardcastMarkDownloadedUpdate((await getGallery()).gid, isDownloaded);
  };

  if (settings.showIgnoreButton) {
    const gallery = await getGallery();
    const isDownloaded = await isDownloadedByGid(gallery.gid);
    ignoreController = new IgnoreController(true, isDownloaded);
    const { ignoreBtn } = ignoreController;
    ignoreBtn.addEventListener('click', () => {
      const ignore = ignoreController!.getStatus();
      if (ignore) unmarkAsDownloaded(gallery.gid, gallery.title);
      else markAsDownloaded(gallery.gid, gallery.title);
      markGalleryDownloaded(!ignore);
    });
    $(selector.infoButtons).append(ignoreBtn);
    onMarkDownloadedUpdate((gid, value) => {
      if (gid === gallery.gid) markGalleryDownloaded(value, false);
    });
  }

  downloadBtn.addEventListener('click', async () => {
    const gallery = await getGallery();
    const rangeCheckers: RangeChecker[] = pagesInput.value
      .split(',')
      // eslint-disable-next-line regexp/no-super-linear-backtracking
      .filter(range => /^\s*(?:\d+(?:\s*-\s*)?\d*|-\d+)\s*$/.test(range))
      .map(range => {
        const [start, end] = range.split('-').map(num => parseInt(num));
        // -end
        if (Number.isNaN(start)) return page => page <= end!;
        // start
        if (end === undefined) return page => page === start;
        // start-
        if (Number.isNaN(end)) return page => page >= start!;
        // start-end
        return page => start! <= page && page <= end;
      });

    progressDisplayController.lockBtn();

    try {
      const downloaded =
        (await isDownloadedByGid(gallery.gid)) || (await isDownloadedByTitle(gallery.title));
      if (
        downloaded &&
        !(await downloadAgainConfirm(gallery.title.japanese || gallery.title.english))
      ) {
        progressDisplayController.reset();
        markAsDownloaded(gallery.gid, gallery.title);
        markGalleryDownloaded(true);
        return;
      }

      await (
        await downloadGalleryByInfo(createMangaDownloadInfo(gallery), {
          progressDisplayController,
          rangeCheckers,
        })
      )?.();
      markAsDownloaded(gallery.gid, gallery.title);
      markGalleryDownloaded(true);
    } catch (error) {
      progressDisplayController.error();
      logger.error(error);
    }
  });

  applyAutoShowAll();
};

const applyAutoShowAll = (): void => {
  if (settings.autoShowAll) {
    getShowAllBtn()
      .then($btn => $btn.trigger('click'))
      .catch(logger.error);
  }
};
