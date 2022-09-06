import { GM_getResourceText, monkeyWindow } from '$';
import * as Vue from 'vue';
import once from 'just-once';
import type { MessageHandler, MessageOptions } from 'element-plus';
import { addResourceStyle } from './common';

export const elementPlus = once((): typeof import('element-plus') => {
  const win: any = window;
  if (!win.Vue) win.Vue = Vue;
  // eslint-disable-next-line no-eval
  eval(GM_getResourceText('elementPlus'));
  addResourceStyle('elementPlusCss');
  return win.ElementPlus;
});

export const showMessage = (params: MessageOptions): MessageHandler =>
  elementPlus().ElMessage({ ...params, appendTo: monkeyWindow.document.body });
