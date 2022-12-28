import { monkeyWindow } from '$';
import { ElMessage, type MessageHandler, type MessageOptions } from 'element-plus';

export const showMessage = (params: MessageOptions): MessageHandler =>
  ElMessage({ ...params, appendTo: monkeyWindow.document.body });
