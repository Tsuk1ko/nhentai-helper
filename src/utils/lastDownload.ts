import { GM_addStyle } from '$';
import { once } from 'es-toolkit';
import localforage from 'localforage';
import { watch } from 'vue';
import { IDB_NAME } from '@/const';
import { i18n } from '@/i18n';
import { selector } from '@/rules/selector';
import logger from './logger';

const store = localforage.createInstance({
  name: IDB_NAME,
  storeName: 'last_download',
});

const getKey = once(() => {
  const url = new URL(location.href);
  return `${url.origin}${url.pathname.replace(/\/+$/, '')}`;
});

let latestGid: number = 0;

export const initLastDownload = async () => {
  try {
    const gid = await store.getItem<number>(getKey());
    if (!gid) return;
    latestGid = gid;
    GM_addStyle(
      `${selector.gallery} ${selector.galleryCover}[href*="/${gid}/"]::after{content:var(--nh-helper-text-last-downloaded-position);position:absolute;display:block;inset:auto 0 0;background-color:rgba(237,37,83,.6);font-size:12px;font-weight:bold;line-height:16px;pointer-events:none;backdrop-filter:blur(4px)}`,
    );
    watch(
      () =>
        GM_addStyle(
          `:root{--nh-helper-text-last-downloaded-position:"${i18n.global.t('tip.lastDownloadedPosition')}"}`,
        ),
      (_, oldEl) => {
        oldEl?.remove();
      },
      { immediate: true },
    );
  } catch (error) {
    logger.error(error);
  }
};

export const updateLastDownload = async (gid: string | number) => {
  gid = Number(gid);
  if (!gid || gid <= latestGid) return;
  latestGid = gid;
  await store.setItem(getKey(), gid);
};
