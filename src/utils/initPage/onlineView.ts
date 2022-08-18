import { GM_getValue, GM_setValue } from '$';
import $ from 'jquery';
import { StyleInjector } from '../styleInjector';
import { IS_NHENTAI } from '@/const';

export const initOnlineViewPage = (): void => {
  if (!IS_NHENTAI) initViewMode();
};

/** 本子浏览模式 */
const initViewMode = (): void => {
  const style = new StyleInjector(
    '#image-container img{width:auto;max-width:calc(100vw - 20px);max-height:100vh}',
  );
  const viewModeText = ['[off]', '[on]'];
  let viewMode = GM_getValue('online_view_mode', 0);

  applyOnlineViewStyle(!!viewMode, style);

  const $btnText = $(`<span>${viewModeText[viewMode]}</span>`);
  const $btn = $(
    '<button id="online-view-mode-btn" class="btn btn-secondary">100% view height </button>',
  ).append($btnText);

  $btn.on('click', () => {
    viewMode = 1 - viewMode;
    GM_setValue('online_view_mode', viewMode);
    $btnText.text(viewModeText[viewMode]);
    applyOnlineViewStyle(!!viewMode, style);
  });

  $('#page-container').prepend($btn);
};

const applyOnlineViewStyle = (enable: boolean, style: StyleInjector): void => {
  if (enable) style.inject();
  else style.remove();
};
