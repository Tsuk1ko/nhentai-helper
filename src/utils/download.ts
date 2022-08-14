import { reactive } from 'vue';
import { saveAs } from 'file-saver';
import { compileTemplate, createMangaDownloadInfo, getCompressionOptions } from './common';
import { JSZip } from './jszip';
import logger from './logger';
import { MultiThread, TaskFunction } from './multiThread';
import { getMediaDownloadUrl, NHentaiGalleryInfo, NHentaiGalleryInfoPage } from './nhentai';
import { ProgressDisplayController } from './progressController';
import { isAbortError, request } from './request';
import { settings } from './settings';
import { errorRetryConfirm } from './dialog';
import { markAsDownloaded } from './downloadHistory';
import { MangaDownloadInfo } from '@/typings';
import { dlQueue, zipQueue } from '@/common/queue';

export type RangeChecker = (i: number) => boolean;

interface DownloadOptions {
  progressDisplayController?: ProgressDisplayController;
  rangeCheckers?: RangeChecker[];
  markGalleryDownloaded?: Function;
}

type ZipFunction = () => Promise<File>;

export const downloadGalleryByInfo = async (
  info: MangaDownloadInfo, // 必须 reactive
  { progressDisplayController, rangeCheckers }: DownloadOptions = {},
): Promise<ZipFunction | undefined> => {
  let { mid, pages, cfName } = info.gallery;
  if (rangeCheckers?.length) {
    pages = pages.filter(({ i }) => rangeCheckers.some(check => check(i)));
  }

  let aborted = false;

  info.cancel = () => {
    aborted = true;
    progressDisplayController?.reset();
  };

  progressDisplayController?.bindInfo(info);
  progressDisplayController?.updateProgress();

  const zip = await new JSZip();

  const downloadTask: TaskFunction<
    NHentaiGalleryInfoPage,
    {
      filenameLength: number;
      customDownloadUrl: string;
    }
  > = (page, threadID, { filenameLength, customDownloadUrl }) => {
    if (info.error) return { abort: () => {}, promise: Promise.resolve() };
    const url = customDownloadUrl
      ? compileTemplate(customDownloadUrl)({ mid, index: page.i, ext: page.t })
      : getMediaDownloadUrl(mid, `${page.i}.${page.t}`);
    logger.log(`[${threadID}] ${url}`);
    const { abort, dataPromise } = request<ArrayBuffer>(url, 'arraybuffer');
    return {
      abort: () => {
        logger.log(`[${threadID}] abort`);
        abort();
      },
      promise: dataPromise
        .then(async data => {
          if (data) {
            zip.file(`${String(page.i).padStart(filenameLength || 0, '0')}.${page.t}`, data);
          }
          info.done++;
          progressDisplayController?.updateProgress();
        })
        .catch(e => {
          if (isAbortError(e)) return;
          info.error = true;
          throw e;
        }),
    };
  };

  const multiThread = new MultiThread(pages, downloadTask, {
    filenameLength:
      settings.filenameLength === 'auto'
        ? Math.ceil(Math.log10(Math.max(...pages.map(({ i }) => Number(i)))))
        : settings.filenameLength,
    customDownloadUrl: settings.customDownloadUrl,
  });

  const { abort, promise } = multiThread.start();

  info.cancel = () => {
    aborted = true;
    abort();
    progressDisplayController?.reset();
  };

  if (!aborted) await promise;

  if (aborted) return;

  return async () => {
    info.compressing = true;
    progressDisplayController?.updateProgress();
    logger.log('Start compressing', cfName);

    let lastZipFile = '';
    const data = await zip.generateAsync(
      getCompressionOptions(),
      ({ workerId, percent, currentFile }) => {
        if (lastZipFile !== currentFile && currentFile) {
          lastZipFile = currentFile;
          logger.log(`[${workerId}] Compressing ${percent.toFixed(2)}%`, currentFile);
        }
        info.compressingPercent = percent.toFixed(2);
        progressDisplayController?.updateProgress();
      },
    );

    logger.log('Completed', cfName);
    progressDisplayController?.complete();
    progressDisplayController?.unbindInfo();
    return new File([data], cfName, { type: 'application/zip' });
  };
};

export const addDownloadGalleryTask = (
  gallery: NHentaiGalleryInfo,
  { progressDisplayController, markGalleryDownloaded }: DownloadOptions = {},
): void => {
  const info = reactive(createMangaDownloadInfo(gallery));

  dlQueue.push(async () => {
    const zipFunc = await downloadGalleryByInfo(info, { progressDisplayController }).catch(e => {
      logger.error(e);
      progressDisplayController?.error();
      errorRetryConfirm(
        'downloading',
        () => {
          dlQueue.skipFromError().catch(logger.error);
        },
        () => {
          info.error = false;
          dlQueue.restartFromError().catch(logger.error);
        },
      );
    });

    if (zipFunc) {
      zipQueue.push(async () => {
        const zip = await zipFunc();
        if (!zip) {
          progressDisplayController?.reset();
          return;
        }
        saveAs(zip);
        markAsDownloaded(gallery.gid, gallery.title);
        markGalleryDownloaded?.();
      }, info);

      zipQueue.start().catch(logger.error);
    }
  }, info);

  dlQueue.start().catch(logger.error);
};
