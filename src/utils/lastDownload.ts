import { GM_addStyle } from '$';
import { once } from 'es-toolkit';
import localforage from 'localforage';
import { IDB_NAME, IS_DEV } from '@/const';
import { isPageMangaList } from '@/env';
import { useStyle } from '@/hooks/useStyle';
import { i18n } from '@/i18n';
import { selector } from '@/rules/selector';
import { logger } from './logger';

class LastDownloadStore {
  private readonly store = localforage.createInstance({
    name: IDB_NAME,
    storeName: 'last_download',
  });

  private key = '';
  private latestGid: number = 0;
  private lastGid: number = 0;
  private styleEl?: HTMLStyleElement;

  private onceInit = once(() => {
    useStyle(
      () =>
        `:root{--nh-helper-text-last-downloaded-position:"${i18n.global.t('tip.lastDownloadedPosition')}"}`,
    );
  });

  async init() {
    try {
      logger.info('init last download');
      this.key = this.getKey();
      const gid = await this.store.getItem<number>(this.key);
      if (!gid) {
        this.reset();
        return;
      }
      this.latestGid = gid;
      this.lastGid = gid;
      this.addStyle(gid);
      this.onceInit();
    } catch (error) {
      logger.error(error);
      this.reset();
    }
  }

  async update(gid: string | number) {
    if (IS_DEV) {
      logger.warn('skip update last download in dev mode');
      return;
    }
    if (!isPageMangaList()) return;
    gid = Number(gid);
    if (!gid || gid <= this.latestGid) return;
    this.latestGid = gid;
    await this.store.setItem(this.key, gid);
  }

  async restore() {
    if (!this.lastGid) return;
    this.latestGid = this.lastGid;
    await this.store.setItem(this.key, this.lastGid);
    logger.info(`restore last download: ${this.lastGid}`);
  }

  private getKey() {
    const url = new URL(location.href);
    return `${url.origin}${url.pathname.replace(/\/+$/, '')}`;
  }

  private reset() {
    this.latestGid = 0;
    this.lastGid = 0;
    this.removeStyle();
  }

  private removeStyle() {
    this.styleEl?.remove();
    this.styleEl = undefined;
  }

  private addStyle(gid: number) {
    this.removeStyle();
    this.styleEl = GM_addStyle(
      `${selector.gallery} ${selector.galleryCover}[href*="/${gid}/"]::after{content:var(--nh-helper-text-last-downloaded-position);position:absolute;display:block;inset:auto 0 0;background-color:rgba(237,37,83,.6);color:rgba(255,255,255,.9);font-size:12px;font-weight:bold;line-height:16px;pointer-events:none;backdrop-filter:blur(4px)}`,
    );
  }
}

export const lastDownload = new LastDownloadStore();
