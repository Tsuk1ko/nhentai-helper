import { monkeyWindow, unsafeWindow } from '$';
import logger from '../logger';

if (process.env.NODE_ENV === 'development') {
  logger.log('fix window.Date');
  unsafeWindow.Date = monkeyWindow.Date;
}
