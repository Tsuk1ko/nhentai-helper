import { saveAs } from 'file-saver';
import localforage from 'localforage';
import { extendPrototype } from 'localforage-setitems';
import md5 from 'md5';
import { dateTimeFormatter } from './formatter';
import { JSZip } from './jszip';
import logger from './logger';
import type { NHentaiGallery } from './nhentai';
import { settings } from './settings';

type Title = Partial<NHentaiGallery['title']>;

extendPrototype(localforage);

class DownloadHistory {
  private readonly store: typeof localforage;
  private readonly ready: Promise<boolean>;

  constructor(private readonly name: string) {
    this.store = localforage.createInstance({
      name: 'nhentai_helper',
      storeName: name,
    });
    this.ready = this.store
      .ready()
      .then(() => true)
      .catch(e => {
        logger.error(e);
        return false;
      });
  }

  async add(key: string): Promise<void> {
    if (!(await this.ready)) return;
    try {
      await this.store.setItem(key, true);
      logger.log(`mark "${key}" as downloaded`);
    } catch (e) {
      logger.error(e);
    }
  }

  async del(key: string): Promise<void> {
    if (!(await this.ready)) return;
    try {
      await this.store.removeItem(key);
      logger.log(`unmark "${key}" as downloaded`);
    } catch (e) {
      logger.error(e);
    }
  }

  async has(key: string): Promise<boolean> {
    if (!(await this.ready)) return false;
    try {
      return (await this.store.getItem<boolean>(key)) === true;
    } catch (e) {
      logger.error(e);
    }
    return false;
  }

  async size(): Promise<number> {
    if (!(await this.ready)) return NaN;
    return this.store.length();
  }

  async import(keys: string[]): Promise<void> {
    if (!(await this.ready)) throw new Error(`store ${this.name} cannot ready`);
    try {
      await this.store.setItems(keys.map(gid => ({ key: gid, value: true })));
    } catch (e) {
      logger.error(e);
    }
  }

  async export(): Promise<string[]> {
    if (!(await this.ready)) throw new Error(`store ${this.name} cannot ready`);
    return this.store.keys();
  }

  async clear(): Promise<void> {
    if (!(await this.ready)) return;
    await this.store.clear();
  }
}

const gidHistory = new DownloadHistory('dl_history_gid');
const enTitleHistory = new DownloadHistory('dl_history_en');
const jpTitleHistory = new DownloadHistory('dl_history');
const prettyTitleHistory = new DownloadHistory('dl_history_pretty');

const normalizeTitle = (title: string): string => title.replace(/\s/g, '');
const getTitleMd5 = (title: string): string => md5(normalizeTitle(title));

export const markAsDownloaded = (
  gid: string | number,
  { english, japanese, pretty }: Title = {},
): void => {
  void gidHistory.add(String(gid));
  if (english) void enTitleHistory.add(getTitleMd5(english));
  if (japanese) void jpTitleHistory.add(getTitleMd5(japanese));
  if (pretty) void prettyTitleHistory.add(getTitleMd5(pretty));
};

export const unmarkAsDownloaded = (
  gid: string | number,
  { english, japanese, pretty }: Title = {},
): void => {
  void gidHistory.del(String(gid));
  if (english) void enTitleHistory.del(getTitleMd5(english));
  if (japanese) void jpTitleHistory.del(getTitleMd5(japanese));
  if (pretty) void prettyTitleHistory.del(getTitleMd5(pretty));
};

export const isDownloadedByGid = (gid: string | number): Promise<boolean> =>
  gidHistory.has(String(gid));

export const isDownloadedByTitle = async ({
  english,
  japanese,
  pretty,
}: Title = {}): Promise<boolean> => {
  if (settings.judgeDownloadedByJapanese && japanese) {
    const md5v2 = getTitleMd5(japanese);
    if (await jpTitleHistory.has(md5v2)) return true;
    const md5v1 = md5(japanese);
    if (await jpTitleHistory.has(md5v1)) {
      void jpTitleHistory.add(md5v2);
      void jpTitleHistory.del(md5v1);
      return true;
    }
  }
  if (
    settings.judgeDownloadedByEnglish &&
    english &&
    (await enTitleHistory.has(getTitleMd5(english)))
  ) {
    return true;
  }
  if (
    settings.judgeDownloadedByPretty &&
    pretty &&
    (await enTitleHistory.has(getTitleMd5(pretty)))
  ) {
    return true;
  }
  return false;
};

export const getDownloadNumber = (): Promise<number> => gidHistory.size();

const EXPORT_HEADER_GID = 'gid:';
const EXPORT_HEADER_TITLE_JP = 'title:';
const EXPORT_HEADER_TITLE_EN = 'title_en:';
const EXPORT_HEADER_TITLE_PRETTY = 'title_pretty:';
const EXPORT_SEPARATOR = ',';
const EXPORT_TEXT_FILENAME = 'history.txt';

export const exportDownloadHistory = async (): Promise<boolean> => {
  try {
    // 导出
    const gids = await gidHistory.export();
    const jpTitles = await jpTitleHistory.export();
    const enTitles = await enTitleHistory.export();
    const prettyTitles = await prettyTitleHistory.export();
    const text = `${EXPORT_HEADER_GID}${gids.join(EXPORT_SEPARATOR)}
${EXPORT_HEADER_TITLE_JP}${jpTitles.join(EXPORT_SEPARATOR)}
${EXPORT_HEADER_TITLE_EN}${enTitles.join(EXPORT_SEPARATOR)}
${EXPORT_HEADER_TITLE_PRETTY}${prettyTitles.join(EXPORT_SEPARATOR)}`;
    // 压缩
    const zip = new JSZip();
    zip.file(EXPORT_TEXT_FILENAME, text);
    const data = await zip.generateAsync({
      compression: 'DEFLATE',
      compressionOptions: { level: 9 },
    });
    const timeStr = dateTimeFormatter.format(Date.now()).replace(/\D/g, '');
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
        await gidHistory.import(gids);
      } else if (line.startsWith(EXPORT_HEADER_TITLE_JP)) {
        const titles = line.replace(EXPORT_HEADER_TITLE_JP, '').split(EXPORT_SEPARATOR);
        await jpTitleHistory.import(titles);
      } else if (line.startsWith(EXPORT_HEADER_TITLE_EN)) {
        const titles = line.replace(EXPORT_HEADER_TITLE_EN, '').split(EXPORT_SEPARATOR);
        await enTitleHistory.import(titles);
      } else if (line.startsWith(EXPORT_HEADER_TITLE_PRETTY)) {
        const titles = line.replace(EXPORT_HEADER_TITLE_PRETTY, '').split(EXPORT_SEPARATOR);
        await prettyTitleHistory.import(titles);
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
    await gidHistory.clear();
    await enTitleHistory.clear();
    await jpTitleHistory.clear();
    await prettyTitleHistory.clear();
    return true;
  } catch (error) {
    logger.error(error);
  }
  return false;
};

const isSameTitleString = (title1?: string, title2?: string): boolean =>
  !!title1 && !!title2 && normalizeTitle(title1) === normalizeTitle(title2);

export const isSameTitle = (title1: Title, title2: Title): boolean => {
  if (settings.judgeDownloadedByJapanese && isSameTitleString(title1.japanese, title2.japanese)) {
    return true;
  }
  if (settings.judgeDownloadedByEnglish && isSameTitleString(title1.english, title2.english)) {
    return true;
  }
  if (settings.judgeDownloadedByPretty && isSameTitleString(title1.pretty, title2.pretty)) {
    return true;
  }
  return false;
};
