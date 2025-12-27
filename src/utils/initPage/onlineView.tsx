import { GM_getValue, GM_setValue } from '$';
import $ from 'jquery';
import { IS_NHENTAI } from '@/const';
import { className } from '@/rules/className';
import { selector } from '@/rules/selector';
import { StyleInjector } from '../styleInjector';

export const initOnlineViewPage = (): void => {
  if (!IS_NHENTAI) initViewMode();
};

/** 本子浏览模式 */
const initViewMode = (): void => {
  const style = new StyleInjector(
    `${selector.mediaImage}{width:auto;max-width:calc(100vw - 20px);max-height:100vh}`,
  );
  const viewModeText = ['[off]', '[on]'];
  let viewMode = GM_getValue('online_view_mode', 0);

  applyOnlineViewStyle(!!viewMode, style);

  const btnText = <span>{viewModeText[viewMode]}</span>;
  const btn = (
    <button id="online-view-mode-btn" class={className.greyButton}>
      100% view height {btnText}
    </button>
  );

  btn.addEventListener('click', () => {
    viewMode = 1 - viewMode;
    GM_setValue('online_view_mode', viewMode);
    btnText.textContent = viewModeText[viewMode]!;
    applyOnlineViewStyle(!!viewMode, style);
  });

  $(selector.pageContainer).prepend(btn);
};

const applyOnlineViewStyle = (enable: boolean, style: StyleInjector): void => {
  if (enable) style.inject();
  else style.remove();
};
