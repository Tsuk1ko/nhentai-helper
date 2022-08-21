import 'element-plus/es/components/message/style/css';
import { monkeyWindow } from '$';
import { ElMessage, MessageHandler, MessageOptions } from 'element-plus';

export const showMessage = (params: MessageOptions): MessageHandler =>
  ElMessage({ ...params, appendTo: monkeyWindow.document.body });
