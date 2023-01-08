import $ from 'jquery';
import { createMangaDownloadInfo, getShowAllBtn } from '../common';
import { downloadAgainConfirm } from '../dialog';
import { downloadGalleryByInfo, RangeChecker } from '../download';
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

export const initDetailPage = async (): Promise<void> => {
  const progressDisplayController = new ProgressDisplayController(true, document.title);

  const { downloadBtn } = progressDisplayController;
  const pagesInput = (
    <input class="pages-input" placeholder="Download pages (e.g. 1-10,12,14,18-)" />
  ) as HTMLInputElement;
  $('#info > .buttons').append(downloadBtn).after(pagesInput);

  const gallery = await getGalleryInfo();

  let ignoreController: IgnoreController | undefined;

  if (settings.showIgnoreButton) {
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
    const rangeCheckers: RangeChecker[] = pagesInput.value
      .split(',')
      .filter(range => !Number.isNaN(parseInt(range)))
      .map(range => {
        const [start, end] = range.split('-').map(num => parseInt(num));
        if (typeof end === 'undefined') return page => page === start;
        else if (Number.isNaN(end)) return page => page >= start;
        else return page => start <= page && page <= end;
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
