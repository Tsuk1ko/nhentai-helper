import { GM_getValue, GM_setValue } from '$';
import $ from 'jquery';
import { applyOnlineViewStyle } from '../common';

export const initOnlineViewPage = (): void => {
  initViewMode();
};

const initViewMode = (): void => {
  const viewModeText = ['[off]', '[on]'];
  let viewMode = GM_getValue('online_view_mode', 0);
  applyOnlineViewStyle(!!viewMode);
  $('#page-container').prepend(
    `<button id="online-view-mode-btn" class="btn btn-secondary"><i class="fa fa-arrows-v"></i> <span>100% view height</span> <span id="online-view-mode-btn-text">${viewModeText[viewMode]}</span></button>`,
  );
  const $btnText = $('#online-view-mode-btn-text');
  $('#online-view-mode-btn').on('click', () => {
    viewMode = 1 - viewMode;
    GM_setValue('online_view_mode', viewMode);
    $btnText.text(viewModeText[viewMode]);
    applyOnlineViewStyle(!!viewMode);
  });
};
