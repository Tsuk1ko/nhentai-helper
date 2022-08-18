import { monkeyWindow, unsafeWindow } from '$';
import { IS_NHENTAI } from '@/const';

const isNodeOrElement =
  typeof Node === 'function'
    ? (val: any): val is Node => val instanceof Node
    : (val: any): val is Node =>
        val &&
        typeof val === 'object' &&
        typeof val.nodeType === 'number' &&
        typeof val.nodeName === 'string';

// 防 nhentai console 屏蔽
if (
  IS_NHENTAI &&
  (process.env.NODE_ENV === 'development' || localStorage.getItem('NHENTAI_HELPER_DEBUG'))
) {
  const c = unsafeWindow.console;
  c._clear = c.clear;
  c.clear = () => {};
  c._log = c.log;
  c.log = (...args) => {
    if (args.length === 1 && isNodeOrElement(args[0])) return;
    return c._log!(...args);
  };
  unsafeWindow.Date = monkeyWindow.Date;
}
