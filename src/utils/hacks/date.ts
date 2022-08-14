import { monkeyWindow, unsafeWindow } from '$';

if (process.env.NODE_ENV === 'development') {
  unsafeWindow.Date = monkeyWindow.Date;
}
