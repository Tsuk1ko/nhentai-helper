import { unsafeWindow } from '$';
import logger from '../logger';
import { IS_DEV } from '@/const';

if (IS_DEV && !unsafeWindow.Date.now) {
  logger.log('fix Date.now');
  window.Date.now = () => new Date().getTime();
}
