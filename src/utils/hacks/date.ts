import { monkeyWindow, unsafeWindow } from '$';
import logger from '../logger';
import { IS_DEV } from '@/const';

if (IS_DEV) {
  logger.log('fix window.Date');
  unsafeWindow.Date = monkeyWindow.Date;
}
