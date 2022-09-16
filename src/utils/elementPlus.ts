import { GM_addStyle, monkeyWindow } from '$';
import * as Vue from 'vue';
import once from 'just-once';
import elementPlusJs from 'element-plus/dist/index.full.min.js?raw';
import elementPlusCss from 'element-plus/dist/index.css?raw';
import type { MessageHandler, MessageOptions } from 'element-plus';

export const elementPlus = once((): typeof import('element-plus') => {
  const win: any = window;
  if (!win.Vue) win.Vue = Vue;
  // eslint-disable-next-line no-eval
  eval(elementPlusJs);
  GM_addStyle(elementPlusCss);
  return win.ElementPlus;
});

export const showMessage = (params: MessageOptions): MessageHandler =>
  elementPlus().ElMessage({ ...params, appendTo: monkeyWindow.document.body });
