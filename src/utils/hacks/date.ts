import { unsafeWindow } from '$';
import { IS_DEV } from '@/const';
import logger from '../logger';

if (IS_DEV && !unsafeWindow.Date.now) {
  logger.log('fix Date.now');
  window.Date.now = () => new Date().getTime();
}
