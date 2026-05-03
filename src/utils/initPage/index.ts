import $ from 'jquery';
import { IS_NHENTAI } from '@/const';
import { getPageType, PageType } from '@/env';
import { selector } from '@/rules/selector';
import { sleep } from '../common';
import { lastDownload } from '../lastDownload';
import { logger } from '../logger';
import { applyDownloadedTitleColor } from '../settings';
import { IS_SVELTE, isSvelteReady, onSvelteHydrationMismatch, waitForSvelteReady } from '../svelte';
import { initDetailPage } from './detail';
import { initGalleries, initListPage } from './list';
import { initOnlineViewPage } from './onlineView';

export const init = () => {
  let lastPageType = getPageType();

  initPage(lastPageType).catch(logger.error);

  if (IS_SVELTE) {
    // 处理 svelte 无刷新加载
    window.navigation.addEventListener('navigate', async () => {
      logger.info('page navigate');
      const lastUrl = new URL(location.href);
      await sleep();

      const curUrl = new URL(location.href);
      const pageType = getPageType();
      if (!(lastPageType === PageType.MANGA_LIST && pageType === PageType.MANGA_LIST)) {
        initPage(pageType).catch(logger.error);
      }
      if (
        pageType === PageType.MANGA_LIST &&
        (lastPageType !== pageType || lastUrl.pathname !== curUrl.pathname)
      ) {
        lastDownload.init();
      }

      lastPageType = pageType;
    });
  }
};

const initPage = async (pageType: PageType = getPageType()): Promise<void> => {
  logger.info('init page', { url: location.href, pageType, isSvelte: IS_SVELTE });

  if (IS_SVELTE) {
    onSvelteHydrationMismatch(initPage);
    if (!isSvelteReady()) {
      logger.warn('Svelte detected and not ready, waiting to avoid hydration mismatch');
      await waitForSvelteReady();
    }
  }

  $('body').addClass(`nhentai-helper-${location.hostname.replace(/\./g, '_')}`);

  switch (pageType) {
    case PageType.MANGA_LIST:
      initListPage();
      applyPjax();
      break;

    case PageType.MANGA_DETAIL:
      initDetailPage().catch(logger.error);
      initGalleries();
      break;

    case PageType.ONLINE_VIEW:
      initOnlineViewPage();
      break;
  }

  applyDownloadedTitleColor();
};

const applyPjax = (): void => {
  // nHentai 改版后已经不会导致页面刷新
  if (IS_NHENTAI) return;

  logger.info('apply pjax');

  $(document).pjax(selector.pjaxTrigger, {
    container: selector.pjaxTarget,
    fragment: selector.pjaxTarget,
    timeout: 10000,
  });

  $(document).on('pjax:end', () => {
    // 防止翻页出现 pjax 参数
    $(selector.pjaxRemoveParam).each(function () {
      const $this = $(this);
      const href = $this.attr('href');
      if (!href || href.startsWith('#')) return;
      const isPathname = href.startsWith('/');
      const url = isPathname ? new URL(href, location.origin) : new URL(href);
      url.searchParams.delete('_pjax');
      $this.attr('href', isPathname ? `${url.pathname}${url.search}` : url.href);
    });
  });
};
