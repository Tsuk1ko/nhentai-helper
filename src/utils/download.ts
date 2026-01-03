import { saveAs } from 'file-saver';
import { createWriteStream } from 'streamsaver';
import { dlQueue, zipQueue } from '@/common/queue';
import { IS_NHENTAI } from '@/const';
import type { MangaDownloadInfo } from '@/typings';
import { ErrorAction } from '@/typings';
import { compileTemplate, createMangaDownloadInfo, getCompressionOptions } from './common';
import { errorRetryConfirm } from './dialog';
import { markAsDownloaded } from './downloadHistory';
import { removeIllegalFilenameChars } from './formatter';
import { ImgConverter } from './imgConverter';
import type { OnUpdateCallback } from './jszip';
import { JSZip } from './jszip';
import logger from './logger';
import { generateMetaFiles } from './meta';
import type { TaskFunction } from './multiThread';
import { MultiThread } from './multiThread';
import type { NHentaiGalleryInfo, NHentaiGalleryInfoPage } from './nhentai';
import {
  getMediaDownloadUrl,
  getMediaDownloadUrlByWebpage,
  nHentaiDownloadHostCounter,
  NHentaiImgExt,
} from './nhentai';
import type { ProgressDisplayController } from './progressController';
import { isAbortError, requestArrayBufferGm } from './request';
import { customFilenameFunction, NHentaiDownloadHostSpecial, settings } from './settings';

export type RangeChecker = (i: number) => boolean;

interface DownloadOptions {
  progressDisplayController?: ProgressDisplayController;
  rangeCheckers?: RangeChecker[];
  markGalleryDownloaded?: () => void;
}

type ZipFunction = () => Promise<void>;

const imgConverter = new ImgConverter();

export const downloadGalleryByInfo = async (
  info: MangaDownloadInfo,
  { progressDisplayController, rangeCheckers }: DownloadOptions = {},
): Promise<ZipFunction | undefined> => {
  info.done = 0; // 发生错误重新下载需要进度置 0

  let { mid, pages, cfName } = info.gallery;

  // 自定义文件名函数
  if (customFilenameFunction.value) {
    const result = customFilenameFunction.value(cfName, info.gallery.gallery);
    if (typeof result !== 'string' || !result.trim()) {
      throw new Error(`Custom filename function illegal result: ${result}`);
    }
    cfName = removeIllegalFilenameChars(result);
  }

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

  const metaFiles = generateMetaFiles(info.gallery);

  if (metaFiles.length) {
    metaFiles.forEach(({ name, data }) => {
      zip.file(name, data);
    });
  }

  // 提前固定变量避免下载中途改变
  const { convertWebpTo, convertWebpQuality } = settings;

  const downloadTask: TaskFunction<
    NHentaiGalleryInfoPage,
    {
      filenameLength: number;
      customDownloadUrl: string;
    }
  > = async (page, threadID, { filenameLength, customDownloadUrl }) => {
    if (info.error) return { abort: () => {}, promise: Promise.resolve() };

    const useCounter =
      IS_NHENTAI &&
      (settings.nHentaiDownloadHost === NHentaiDownloadHostSpecial.BALANCE ||
        settings.nHentaiDownloadHost === NHentaiDownloadHostSpecial.RANDOM);
    const usedCounterKeys: string[] = [];

    let urlGetterError: any;
    const urlGetter = await (async () => {
      if (customDownloadUrl) {
        return compileTemplate(customDownloadUrl)({ mid, index: page.i, ext: page.t });
      }

      const filename = `${page.i}.${page.t}`;

      if (IS_NHENTAI && settings.nHentaiDownloadHost !== NHentaiDownloadHostSpecial.AUTO) {
        if (useCounter) {
          return () => {
            const url = getMediaDownloadUrl(mid, filename);
            logger.log(`[${threadID}] ${url}`);
            if (settings.nHentaiDownloadHost === NHentaiDownloadHostSpecial.BALANCE) {
              const counterKey = new URL(url).host;
              usedCounterKeys.push(counterKey);
              nHentaiDownloadHostCounter.add(counterKey);
            }
            return url;
          };
        }

        return getMediaDownloadUrl(mid, filename);
      }

      return getMediaDownloadUrlByWebpage(String(info.gallery.gid), mid, filename);
    })().catch(e => {
      urlGetterError = e;
    });

    if (!urlGetter || urlGetterError) {
      info.error = true;
      throw urlGetterError && urlGetterError instanceof Error
        ? urlGetterError
        : new Error('No available url');
    }

    if (typeof urlGetter !== 'function') {
      logger.log(`[${threadID}] ${urlGetter}`);
    }

    const { abort, dataPromise } = requestArrayBufferGm({
      url: urlGetter,
      on404: useCounter
        ? url => {
            const counterKey = new URL(url).host;
            logger.warn(`[${threadID}] ban ${counterKey} because 404`);
            return nHentaiDownloadHostCounter.ban(counterKey);
          }
        : undefined,
    });

    return {
      abort: () => {
        logger.log(`[${threadID}] abort`);
        abort();
      },
      promise: dataPromise
        .then(async data => {
          if (data) {
            const filename = String(page.i).padStart(filenameLength || 0, '0');
            if (page.t === NHentaiImgExt.w && convertWebpTo) {
              const { buffer, ext } = await imgConverter.convertWebpTo(
                data,
                convertWebpTo,
                convertWebpQuality / 100,
              );
              zip.file(`${filename}.${ext}`, buffer);
            } else zip.file(`${filename}.${page.t}`, data);
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
          if (usedCounterKeys.length) {
            usedCounterKeys.forEach(key => {
              nHentaiDownloadHostCounter.del(key);
            });
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
  const info = createMangaDownloadInfo(gallery, true);
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
