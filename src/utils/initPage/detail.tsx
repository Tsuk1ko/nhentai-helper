import $ from 'jquery';
import { h } from 'nano-jsx/lib/core';
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
import logger from '../logger';
import { getGalleryInfo } from '../nhentai';
import { ProgressDisplayController } from '../progressController';
import { settings } from '../settings';
import { IgnoreController } from '../ignoreController';
import { i18n } from '@/i18n';

const { t } = i18n.global;

export const initDetailPage = async (): Promise<void> => {
  const progressDisplayController = new ProgressDisplayController(true, document.title);

  const { downloadBtn } = progressDisplayController;
  const pagesInput = (
    <input class="pages-input" placeholder={t('input.downloadSpecifiedPages')} />
  ) as HTMLInputElement;
  $('#info > .buttons').append(downloadBtn).after(pagesInput);

  let ignoreController: IgnoreController | undefined;

  if (settings.showIgnoreButton) {
    const gallery = await getGalleryInfo();
    const isDownloaded = await isDownloadedByGid(gallery.gid);
    ignoreController = new IgnoreController(true, isDownloaded);
    const { ignoreBtn } = ignoreController;
    ignoreBtn.addEventListener('click', () => {
      const ignore = ignoreController!.getStatus();
      if (ignore) unmarkAsDownloaded(gallery.gid, gallery.title);
      else markAsDownloaded(gallery.gid, gallery.title);
      ignoreController!.setStatus(!ignore);
    });
    $('#info > .buttons').append(ignoreBtn);
  }

  downloadBtn.addEventListener('click', async () => {
    const gallery = await getGalleryInfo();
    const rangeCheckers: RangeChecker[] = pagesInput.value
      .split(',')
      .filter(range => /^(?:\d+-?\d*|-\d+)$/.test(range))
      .map(range => {
        const [start, end] = range.split('-').map(num => parseInt(num));
        // -end
        if (Number.isNaN(start)) return page => page <= end;
        // start
        if (end === undefined) return page => page === start;
        // start-
        if (Number.isNaN(end)) return page => page >= start;
        // start-end
        return page => start <= page && page <= end;
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
        ignoreController?.setStatus(true);
        return;
      }

      await (
        await downloadGalleryByInfo(createMangaDownloadInfo(gallery), {
          progressDisplayController,
          rangeCheckers,
        })
      )?.();
      markAsDownloaded(gallery.gid, gallery.title);
      ignoreController?.setStatus(true);
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
