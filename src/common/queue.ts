import { WORKER_THREAD_NUM } from '@/const';
import { MangaDownloadInfo } from '@/typings';
import { AsyncQueue } from '@/utils/asyncQueue';
import logger from '@/utils/logger';
import { settings } from '@/utils/settings';

/** 下载队列 */
export const dlQueue = new AsyncQueue<MangaDownloadInfo>();

/** 压缩队列 */
export const zipQueue = new AsyncQueue<MangaDownloadInfo>(WORKER_THREAD_NUM);

dlQueue.canSingleStart = () => !(settings.seriesMode && zipQueue.length);

zipQueue.emitter.on('finish', () => {
  if (settings.seriesMode) dlQueue.start().catch(logger.error);
});
