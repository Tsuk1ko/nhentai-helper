import { selector } from '@/rules/selector';

const PAGE_MANGA_DETAIL_REG = /^\/g\/\d+\/?(?:\?.*)?$/;
const PAGE_ONLINE_VIEW_REG = /^\/g\/\d+(?:\/list)?\/\d+\/?(?:\?.*)?$/;

/** 处于本子详情页 */
export const isPageMangaDetail = () => PAGE_MANGA_DETAIL_REG.test(location.pathname);

/** 处于本子在线浏览页 */
export const isPageOnlineView = () => PAGE_ONLINE_VIEW_REG.test(location.pathname);

/** 处于本子列表页 */
export const isPageMangaList = () =>
  !isPageMangaDetail() && !isPageOnlineView() && !!document.querySelector(selector.gallery);

export enum PageType {
  UNKNOWN,
  MANGA_LIST,
  MANGA_DETAIL,
  ONLINE_VIEW,
}

/** 获取页面类型 */
export const getPageType = () => {
  if (isPageMangaDetail()) return PageType.MANGA_DETAIL;
  if (isPageOnlineView()) return PageType.ONLINE_VIEW;
  if (document.querySelector(selector.gallery)) return PageType.MANGA_LIST;
  return PageType.UNKNOWN;
};
