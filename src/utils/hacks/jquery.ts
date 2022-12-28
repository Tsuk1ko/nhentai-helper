import { unsafeWindow, monkeyWindow } from '$';
import $ from 'jquery';
import { IS_DEV } from '@/const';

if (IS_DEV) {
  unsafeWindow.jQuery = $;
} else {
  monkeyWindow.jQuery = $;
}
