import { unsafeWindow } from '$';
import $ from 'jquery';

if (process.env.NODE_ENV === 'development') {
  unsafeWindow.jQuery = $;
}
