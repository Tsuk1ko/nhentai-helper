import localforage from 'localforage';
import md5 from 'md5';
import logger from './logger';

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

export const markAsDownloaded = (gid: string | number, title: string): void => {
  void (async () => {
    if (await dlGidStoreReady) {
      dlGidStore.setItem(String(gid), true).catch(logger.error);
    }
    if (await dlTitleStoreReady) {
      dlTitleStore.setItem(md5(title.replace(/\s/g, '')), true).catch(logger.error);
    }
  })();
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
