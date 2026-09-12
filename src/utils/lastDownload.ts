import { once } from 'es-toolkit';
import localforage from 'localforage';
import { ref } from 'vue';
import { IDB_NAME, IS_DEV } from '@/const';
import { isPageMangaList } from '@/env';
import { useStyle } from '@/hooks/useStyle';
import { i18n } from '@/i18n';
import { selector } from '@/rules/selector';
import { showMessage } from './elementPlus';
import { logger } from './logger';
import { settings } from './settings';

class LastDownloadStore {
  private readonly store = localforage.createInstance({
    name: IDB_NAME,
    storeName: 'last_download',
  });

  private key = '';
  private latestGid: number = 0;
  private lastGid: number = 0;
  private gidForStyle = ref<number>();

  private onceInit = once(() => {
    useStyle(
      () =>
        settings.showLastDownloadPosition &&
        `:root{--nh-helper-text-last-downloaded-position:"${i18n.global.t('tip.lastDownloadedPosition')}"}${selector.gallery} ${selector.galleryCover}[href*="/${this.gidForStyle.value}/"]::after{content:var(--nh-helper-text-last-downloaded-position);position:absolute;display:flex;align-items:center;justify-content:center;inset:0;background-color:rgba(237,37,83,.6);color:rgba(255,255,255,.9);font-size:16px;font-weight:bold;line-height:16px;border-radius:4px 4px 0 0;pointer-events:none;backdrop-filter:blur(4px);transition:opacity 0.2s ease-in-out;}${selector.gallery} ${selector.galleryCover}[href*="/${this.gidForStyle.value}/"]:hover::after{opacity:0}`,
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
      this.gidForStyle.value = gid;
      this.onceInit();
    } catch (error) {
      logger.error(error);
      this.reset();
    }
  }

  async update(gid: string | number) {
    if (IS_DEV) {
      logger.warn('skip update last download in dev mode', gid);
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
    logger.info(`restore last download: ${this.lastGid}`);
    this.latestGid = this.lastGid;
    await this.store.setItem(this.key, this.lastGid);
    showMessage({
      message: i18n.global.t('tip.lastDownloadRestored', { gid: this.lastGid }),
      type: 'success',
    });
  }

  async clear() {
    logger.info('clear last download');
    this.reset();
    await this.store.removeItem(this.key || this.getKey());
    showMessage({
      message: i18n.global.t('tip.lastDownloadCleared'),
      type: 'success',
    });
  }

  private getKey() {
    const url = new URL(location.href);
    return `${url.origin}${url.pathname.replace(/\/+$/, '')}`;
  }

  private reset() {
    this.latestGid = 0;
    this.lastGid = 0;
    this.gidForStyle.value = undefined;
  }
}

export const lastDownload = new LastDownloadStore();
