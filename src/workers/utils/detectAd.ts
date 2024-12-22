/**
 * The code comes from https://github.com/hymbz/ComicReadScript
 * License: https://github.com/hymbz/ComicReadScript/blob/master/LICENSE
 *
 * Thanks very much
 */
import jsQR, { type Options } from 'jsqr';

/** 判断一张图是否是彩图 */
const isColorImg = (data: Uint8ClampedArray) => {
  for (let i = 0; i < data.length; i += 16) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (!(r === g && r === b)) return true;
  }
  return false;
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
];

const options: Options = { inversionAttempts: 'attemptBoth' };

/** 识别图像上的二维码 */
const getQrCode = (img: Uint8ClampedArray, width: number, height: number) => {
  try {
    const binaryData = jsQR(img, width, height, options)?.binaryData;
    if (!binaryData) return false;
    // 因为 jsqr 默认的输出不支持特殊符号，为以防万一，手动进行转换
    const text = new TextDecoder().decode(Uint8Array.from(binaryData));
    return text;
  } catch {
    return undefined;
  }
};

const getImgData = async (data: ArrayBuffer) => {
  const bitmap = await createImageBitmap(new Blob([data]));
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(bitmap, 0, 0);
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
};

const scanImgBlock = (img: ImageData, sx: number, sy: number, w: number, h: number) => {
  if (w === img.width && h === img.height) return getQrCode(img.data, w, h);

  const data = new Uint8ClampedArray(new ArrayBuffer(w * h * 4));
  for (let y = 0, height = sy + h; y < height; y++)
    for (let x = 0, width = sx + w; x < width; x++) {
      const i = (y * w + x) * 4;
      const target = ((y + sy) * img.width + (x + sx)) * 4;
      data[i] = img.data[target];
      data[i + 1] = img.data[target + 1];
      data[i + 2] = img.data[target + 2];
      data[i + 3] = img.data[target + 3];
    }
  return getQrCode(data, w, h);
};

/** 计算 rgb 的灰度 */
const toGray = (r: number, g: number, b: number) => Math.round(0.299 * r + 0.587 * g + 0.114 * b);

export const isAdImg = async (data: ArrayBuffer) => {
  const imgData = await getImgData(data);

  // 黑白图肯定不是广告
  if (!isColorImg(imgData.data)) return false;

  // 以 200 灰度为阈值，将图片二值化，以便识别彩色二维码
  for (let i = 0; i < imgData.data.length; i += 4) {
    const gray = toGray(imgData.data[i], imgData.data[i + 1], imgData.data[i + 2]);
    const val = gray < 200 ? 0 : 255;
    imgData.data[i] = val;
    imgData.data[i + 1] = val;
    imgData.data[i + 2] = val;
    imgData.data[i + 3] = 255;
  }

  let text = getQrCode(imgData.data, imgData.width, imgData.height);

  // 分区块扫描图片
  if (!text) {
    const w = Math.floor(imgData.width / 2);
    const h = Math.floor(imgData.height / 2);

    for (const args of [
      [w, h], // ↘
      [0, h], // ↙
      [w, 0], // ↗
      [0, 0], // ↖
    ] as Array<[number, number]>) {
      text = scanImgBlock(imgData, ...args, w, h);
      if (text) break;
    }
  }
  if (text) return qrCodeWhiteList.every(reg => !reg.test(text));

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
