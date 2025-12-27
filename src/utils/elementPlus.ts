import { monkeyWindow } from '$';
import { ElMessage } from 'element-plus';
import type { MessageHandler, MessageOptions } from 'element-plus';

export const showMessage = (params: MessageOptions): MessageHandler =>
  ElMessage({ ...params, appendTo: monkeyWindow.document.body });
