import { monkeyWindow, unsafeWindow } from '$';
import logger from '../logger';
import { IS_DEV, IS_NHENTAI } from '@/const';

if (IS_DEV && IS_NHENTAI) {
  logger.log('fix window.Date');
  unsafeWindow.Date = monkeyWindow.Date;
}
