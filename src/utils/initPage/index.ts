import { unsafeWindow } from '$';
import $ from 'jquery';
import { initDetailPage } from './detail';
import { initListPage } from './list';
import { initOnlineViewPage } from './onlineView';
import { IS_PAGE_MANGA_DETAIL, IS_PAGE_MANGA_LIST, IS_PAGE_ONLINE_VIEW } from '@/const';

export const initPage = (): void => {
  if (IS_PAGE_MANGA_LIST) initListPage();
  else if (IS_PAGE_MANGA_DETAIL) initDetailPage();
  else if (IS_PAGE_ONLINE_VIEW) initOnlineViewPage();

  applyPjax();
};

const applyPjax = (): void => {
  $(document).pjax('.pagination a, .sort a', {
    container: '#content',
    fragment: '#content',
    timeout: 10000,
  });

  $(document).on('pjax:end', () => {
    // 防止翻页出现 pjax 参数
    $('.pagination a').each(function () {
      const $this = $(this);
      const href = $this.attr('href')!;
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
