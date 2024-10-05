import { unsafeWindow } from '$';
import $ from 'jquery';
import logger from '../logger';
import { initDetailPage } from './detail';
import { initListPage } from './list';
import { initOnlineViewPage } from './onlineView';
import { IS_PAGE_MANGA_DETAIL, IS_PAGE_MANGA_LIST, IS_PAGE_ONLINE_VIEW } from '@/const';
import { selector } from '@/rules/selector';

export const initPage = (): void => {
  $('body').addClass(`nhentai-helper-${location.hostname.replace(/\./g, '_')}`);
  if (IS_PAGE_MANGA_LIST) {
    initListPage();
    applyPjax();
  } else if (IS_PAGE_MANGA_DETAIL) initDetailPage().catch(logger.error);
  else if (IS_PAGE_ONLINE_VIEW) initOnlineViewPage();
};

const applyPjax = (): void => {
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
    // 加载 lazyload 图片
    applyLazyLoad();
  });
};

const applyLazyLoad = (): void => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _n_app } = unsafeWindow;
  if (_n_app) {
    _n_app.install_lazy_loader();
    _n_app.install_blacklisting();
  }
};
