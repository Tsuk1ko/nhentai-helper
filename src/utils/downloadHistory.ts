import { saveAs } from 'file-saver';
import localforage from 'localforage';
import { extendPrototype } from 'localforage-setitems';
import md5 from 'md5';
import { dateTimeFormatter } from './formatter';
import { JSZip } from './jszip';
import logger from './logger';

extendPrototype(localforage);

const dlGidStore = localforage.createInstance({
  name: 'nhentai_helper',
  storeName: 'dl_history_gid',
});
const dlGidStoreReady = dlGidStore
  .ready()
  .then(() => true)
  .catch(e => {
    logger.error(e);
    return false;
  });

const dlTitleStore = localforage.createInstance({
  name: 'nhentai_helper',
  storeName: 'dl_history',
});
const dlTitleStoreReady = dlTitleStore
  .ready()
  .then(() => true)
  .catch(e => {
    logger.error(e);
    return false;
  });

export const markAsDownloaded = (gid: string | number, title?: string): void => {
  void dlGidStoreReady.then(ready => {
    if (!ready) return;
    dlGidStore
      .setItem(String(gid), true)
      .then(() => logger.log(`mark "${gid}" as downloaded`))
      .catch(logger.error);
  });
  if (title) {
    void dlTitleStoreReady.then(ready => {
      if (!ready) return;
      dlTitleStore
        .setItem(md5(title.replace(/\s/g, '')), true)
        .then(() => logger.log(`mark "${title}" as downloaded`))
        .catch(logger.error);
    });
  }
};

export const unmarkAsDownloaded = (gid: string | number, title?: string): void => {
  void dlGidStoreReady.then(ready => {
    if (!ready) return;
    dlGidStore
      .removeItem(String(gid))
      .then(() => logger.log('unmark', gid, 'as downloaded'))
      .catch(logger.error);
  });
  if (title) {
    void dlTitleStoreReady.then(ready => {
      if (!ready) return;
      dlTitleStore
        .removeItem(md5(title.replace(/\s/g, '')))
        .then(() => logger.log('unmark', title, 'as downloaded'))
        .catch(logger.error);
    });
  }
};

export const isDownloadedByGid = async (gid: string | number): Promise<boolean> => {
  try {
    if (await dlGidStoreReady) {
      return (await dlGidStore.getItem<boolean>(String(gid))) === true;
    }
  } catch (e) {
    logger.error(e);
  }
  return false;
};

export const isDownloadedByTitle = async (title: string): Promise<boolean> => {
  try {
    if (!(await dlTitleStoreReady)) return false;
    const md5v2 = md5(title.replace(/\s/g, ''));
    if ((await dlTitleStore.getItem<boolean>(md5v2)) === true) return true;
    const md5v1 = md5(title);
    if ((await dlTitleStore.getItem<boolean>(md5v1)) === true) {
      dlTitleStore.setItem(md5v2, true).catch(logger.error);
      dlTitleStore.removeItem(md5v1).catch(logger.error);
      return true;
    }
  } catch (e) {
    logger.error(e);
  }
  return false;
};

export const getDownloadNumber = async (): Promise<number> => {
  try {
    if (!(await dlGidStoreReady)) throw new Error('store cannot ready');
    return await dlGidStore.length();
  } catch (error) {
    logger.error(error);
  }
  return NaN;
};

const EXPORT_HEADER_GID = 'gid:';
const EXPORT_HEADER_TITLE = 'title:';
const EXPORT_SEPARATOR = ',';
const EXPORT_TEXT_FILENAME = 'history.txt';

export const exportDownloadHistory = async (): Promise<boolean> => {
  try {
    if (!((await dlGidStoreReady) && (await dlTitleStoreReady)))
      throw new Error('store cannot ready');
    // 导出
    const gids = await dlGidStore.keys();
    const titles = await dlTitleStore.keys();
    const text = `${EXPORT_HEADER_GID}${gids.join(EXPORT_SEPARATOR)}
${EXPORT_HEADER_TITLE}${titles.join(EXPORT_SEPARATOR)}`;
    // 压缩
    const zip = new JSZip();
    zip.file(EXPORT_TEXT_FILENAME, text);
    const data = await zip.generateAsync({
      compression: 'DEFLATE',
      compressionOptions: { level: 9 },
    });
    const timeStr = dateTimeFormatter.format(Date.now()).replace(/[^\d]/g, '');
    const filename = `nhentai-helper-download-history-${timeStr}.zip`;
    saveAs(new File([data], filename, { type: 'application/zip' }));
    logger.log('export download history', filename);
    return true;
  } catch (error) {
    logger.error(error);
  }
  return false;
};

export const importDownloadHistory = async (data: ArrayBuffer): Promise<boolean> => {
  try {
    if (!((await dlGidStoreReady) && (await dlTitleStoreReady)))
      throw new Error('store cannot ready');
    // 解压
    const str = await JSZip.unzipFile({ data, path: EXPORT_TEXT_FILENAME, type: 'string' });
    if (!str) {
      logger.error("zip doesn't contain file", EXPORT_TEXT_FILENAME);
      return false;
    }
    // 导入
    const lines = str.split('\n');
    for (const line of lines) {
      if (line.startsWith(EXPORT_HEADER_GID)) {
        const gids = line.replace(EXPORT_HEADER_GID, '').split(EXPORT_SEPARATOR);
        await dlGidStore.setItems(gids.map(gid => ({ key: gid, value: true })));
      } else if (line.startsWith(EXPORT_HEADER_TITLE)) {
        const titles = line.replace(EXPORT_HEADER_TITLE, '').split(EXPORT_SEPARATOR);
        await dlTitleStore.setItems(titles.map(gid => ({ key: gid, value: true })));
      }
    }
    return true;
  } catch (error) {
    logger.error(error);
  }
  return false;
};

export const clearDownloadHistory = async (): Promise<boolean> => {
  try {
    if (!((await dlGidStoreReady) && (await dlTitleStoreReady)))
      throw new Error('store cannot ready');
    await dlGidStore.clear();
    await dlTitleStore.clear();
    return true;
  } catch (error) {
    logger.error(error);
  }
  return false;
};
