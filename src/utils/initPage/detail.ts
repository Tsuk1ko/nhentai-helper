import $ from 'jquery';
import { saveAs } from 'file-saver';
import { createMangaDownloadInfo, getShowAllBtn } from '../common';
import { downloadAgainConfirm } from '../dialog';
import { downloadGalleryByInfo, RangeChecker } from '../download';
import { isDownloadedByGid, isDownloadedByTitle, markAsDownloaded } from '../downloadHistory';
import logger from '../logger';
import { getGalleryInfo, NHentaiGalleryInfo } from '../nhentai';
import { ProgressDisplayController } from '../progressController';
import { settings } from '../settings';

export const initDetailPage = (): void => {
  const progressDisplayController = new ProgressDisplayController(true, document.title);

  const { $btn } = progressDisplayController;
  const $pagesInput = $<HTMLInputElement>(
    '<input class="pages-input" placeholder="Download pages (e.g. 1-10,12,14,18-)">',
  );
  $('#info > .buttons').append($btn).after($pagesInput);

  let gallery: NHentaiGalleryInfo | undefined;

  $btn.on('click', async () => {
    const rangeCheckers: RangeChecker[] = ($pagesInput.val() as string)
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
      if (!gallery) gallery = await getGalleryInfo();

      const downloaded =
        (await isDownloadedByGid(gallery.gid)) || (await isDownloadedByTitle(gallery.title));
      if (downloaded && !(await downloadAgainConfirm(gallery.title))) {
        progressDisplayController.reset();
        markAsDownloaded(gallery.gid, gallery.title);
        return;
      }

      const zip = await (
        await downloadGalleryByInfo(createMangaDownloadInfo(gallery), {
          progressDisplayController,
          rangeCheckers,
        })
      )?.();
      if (!zip) return;
      saveAs(zip);
      markAsDownloaded(gallery.gid, gallery.title);
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
