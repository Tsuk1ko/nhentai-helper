import { reactive } from 'vue';
import { saveAs } from 'file-saver';
import { createWriteStream } from 'streamsaver';
import { compileTemplate, createMangaDownloadInfo, getCompressionOptions } from './common';
import type { OnUpdateCallback } from './jszip';
import { JSZip } from './jszip';
import logger from './logger';
import type { TaskFunction } from './multiThread';
import { MultiThread } from './multiThread';
import type { NHentaiGalleryInfo, NHentaiGalleryInfoPage } from './nhentai';
import { nHentaiDownloadHostCounter, getMediaDownloadUrl } from './nhentai';

import type { ProgressDisplayController } from './progressController';
import { isAbortError, request } from './request';
import { NHentaiDownloadHostSpecial, settings } from './settings';
import { errorRetryConfirm } from './dialog';
import { markAsDownloaded } from './downloadHistory';
import type { MangaDownloadInfo } from '@/typings';
import { dlQueue, zipQueue } from '@/common/queue';
import { ErrorAction } from '@/typings';
import { IS_NHENTAI } from '@/const';

export type RangeChecker = (i: number) => boolean;

interface DownloadOptions {
  progressDisplayController?: ProgressDisplayController;
  rangeCheckers?: RangeChecker[];
  markGalleryDownloaded?: Function;
}

type ZipFunction = () => Promise<void>;

export const downloadGalleryByInfo = async (
  info: MangaDownloadInfo, // 必须 reactive
  { progressDisplayController, rangeCheckers }: DownloadOptions = {},
): Promise<ZipFunction | undefined> => {
  info.done = 0; // 发生错误重新下载需要进度置 0

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

  const zip = new JSZip();

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

    const isUsingCounter =
      IS_NHENTAI &&
      !customDownloadUrl &&
      settings.nHentaiDownloadHost === NHentaiDownloadHostSpecial.BALANCE;
    const counterKey = isUsingCounter ? new URL(url).host : '';
    if (isUsingCounter) {
      nHentaiDownloadHostCounter.add(counterKey);
    }

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
        })
        .finally(() => {
          if (isUsingCounter) {
            nHentaiDownloadHostCounter.del(counterKey);
          }
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
    logger.log('start compressing', cfName);

    let lastZipFile = '';

    const onCompressionUpdate: OnUpdateCallback = ({ workerId, percent, currentFile }) => {
      if (lastZipFile !== currentFile && currentFile) {
        lastZipFile = currentFile;
        logger.log(`[${workerId}] compressing ${percent.toFixed(2)}%`, currentFile);
      }
      info.compressingPercent = percent.toFixed(2);
      progressDisplayController?.updateProgress();
    };

    if (settings.streamDownload) {
      logger.log('stream mode on');
      const fileStream = createWriteStream(cfName);
      const zipStream = await zip.generateStream(getCompressionOptions(), onCompressionUpdate);
      await zipStream.pipeTo(fileStream);
    } else {
      const data = await zip.generateAsync(getCompressionOptions(), onCompressionUpdate);
      saveAs(new File([data], cfName, { type: 'application/zip' }));
    }

    logger.log('completed', cfName);
    progressDisplayController?.complete();
    progressDisplayController?.unbindInfo();
  };
};

export const addDownloadGalleryTask = (
  gallery: NHentaiGalleryInfo,
  { progressDisplayController, markGalleryDownloaded }: DownloadOptions = {},
): void => {
  const info = reactive(createMangaDownloadInfo(gallery));
  info.cancel = () => {
    progressDisplayController?.reset();
  };

  dlQueue.push(async () => {
    const zipFunc = await downloadGalleryByInfo(info, { progressDisplayController }).catch(e => {
      progressDisplayController?.error();
      errorRetryConfirm(
        ErrorAction.DOWNLOAD,
        () => {
          dlQueue.skipFromError().catch(logger.error);
        },
        () => {
          info.error = false;
          dlQueue.restartFromError().catch(logger.error);
        },
      );
      throw e;
    });

    if (zipFunc) {
      zipQueue.push(async () => {
        try {
          await zipFunc();
          markAsDownloaded(gallery.gid, gallery.title);
          markGalleryDownloaded?.();
        } catch (error) {
          if (!error) logger.warn('user abort stream download');
          logger.error(error);
          progressDisplayController?.error();
        }
      }, info);

      zipQueue.start().catch(logger.error);
    }
  }, info);

  dlQueue.start().catch(logger.error);
};
