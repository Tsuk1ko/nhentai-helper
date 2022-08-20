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

export const markAsDownloaded = (gid: string | number, title?: string): void => {
  void dlGidStoreReady.then(ready => {
    if (!ready) return;
    dlGidStore
      .setItem(String(gid), true)
      .then(() => logger.log('mark', gid, 'as downloaded'))
      .catch(logger.error);
  });
  if (title) {
    void dlTitleStoreReady.then(ready => {
      if (!ready) return;
      dlTitleStore
        .setItem(md5(title.replace(/\s/g, '')), true)
        .then(() => logger.log('mark', title, 'as downloaded'))
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
    if (!(await dlGidStoreReady)) return 0;
    return await dlGidStore.length();
  } catch (error) {
    logger.error(error);
  }
  return 0;
};
