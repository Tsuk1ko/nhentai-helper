/* eslint-disable no-restricted-globals */
/**
 * The code comes from: https://github.com/hymbz/ComicReadScript
 *
 * License: https://github.com/hymbz/ComicReadScript/blob/master/LICENSE
 *
 * Thanks very much
 */
import QrScanner from 'qr-scanner';

// for QrScanner
self.window = self;
// @ts-expect-error
self.Image =
  // @ts-expect-error
  self.HTMLVideoElement =
  // @ts-expect-error
  self.HTMLCanvasElement =
  // @ts-expect-error
  self.SVGImageElement =
    class Placeholder {};

const qrEngine = QrScanner.createQrEngine();

(QrScanner as any)._postWorkerMessage(qrEngine, 'inversionMode', 'both');

const canvas = new OffscreenCanvas(0, 0) as any as HTMLCanvasElement;
// @ts-expect-error
canvas._getContext = canvas.getContext;
canvas.getContext = function (...args) {
  // improve performance
  if (args[1]) args[1].willReadFrequently = true;
  // @ts-expect-error
  return this._getContext(...args);
};

/** 二维码白名单 */
const qrCodeWhiteList = [
  // fanbox
  /^https:\/\/[^.]+\.fanbox\.cc/,
  // twitter
  /^https:\/\/twitter\.com/,
  /^https:\/\/x\.com/,
  // fantia
  /^https:\/\/fantia\.jp/,
  // 棉花糖
  /^https:\/\/marshmallow-qa\.com/,
  // dlsite
  /^https:\/\/www\.dlsite\.com/,
  // hitomi
  /^https:\/\/hitomi\.la/,
  // dmm
  /^https:\/\/www\.dmm\.co\.jp/,
];

export const isAdImg = async (data: ArrayBuffer) => {
  try {
    const result = await QrScanner.scanImage(await createImageBitmap(new Blob([data])), {
      qrEngine,
      canvas,
    });

    const text = result.data;

    if (text) return qrCodeWhiteList.every(reg => !reg.test(text));
  } catch {}

  return false;
};

export const getAdPage = async <T>(
  list: Array<T | undefined>,
  isAdPage: (item: T) => boolean | Promise<boolean>,
  adList: Set<number> = new Set(),
) => {
  let i = list.length - 1;
  let normalNum = 0;
  // 只检查最后十张
  for (; i >= list.length - 10; i--) {
    // 开头肯定不会是广告
    if (i <= 2) break;
    if (adList.has(i)) continue;

    const item = list[i];
    if (!item) break;

    if (await isAdPage(item)) adList.add(i);
    // 找到连续三张正常漫画页后中断
    else if (normalNum >= 2) break;
    else normalNum += 1;
  }

  let adNum = 0;
  for (i = Math.min(...adList); i < list.length; i++) {
    if (adList.has(i)) {
      adNum += 1;
      continue;
    }

    // 连续两张广告后面的肯定也都是广告
    if (adNum >= 2) adList.add(i);
    // 夹在两张广告中间的肯定也是广告
    else if (adList.has(i - 1) && adList.has(i + 1)) adList.add(i);
    else adNum = 0;
  }

  return adList;
};
