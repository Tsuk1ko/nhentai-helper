import { unsafeWindow } from '$';
import { IS_DEV } from '@/const';
import { logger } from '../logger';

if (IS_DEV && !unsafeWindow.Date.now) {
  logger.info('fix Date.now');
  // eslint-disable-next-line e18e/prefer-date-now
  window.Date.now = () => new Date().getTime();
}
