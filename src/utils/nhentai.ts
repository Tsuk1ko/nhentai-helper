/* eslint-disable @typescript-eslint/naming-convention */
import { unsafeWindow } from '$';
import { getJSON } from './request';
import { compileTemplate } from './common';
import { settings } from './settings';
import logger from './logger';
import { ValueOf } from '@/typings';
import { IS_NHENTAI, IS_NHENTAI_TO } from '@/const';

const ImgExtMap = {
  j: 'jpg',
  p: 'png',
  g: 'gif',
} as const;

type NHentaiImgExt = typeof ImgExtMap;

interface NHentaiImage {
  t: keyof NHentaiImgExt;
  w: number;
  h: number;
}

interface NHentaiTag {
  id: number;
  type: string;
  name: string;
  url: string;
  count: number;
}

interface NHentaiGallery {
  id: number;
  media_id: string;
  title: {
    english: string;
    japanese: string;
    pretty: string;
  };
  images: {
    pages: NHentaiImage[];
    cover: NHentaiImage;
    thumbnail: NHentaiImage;
  };
  scanlator: string;
  upload_date: number;
  tags: NHentaiTag[];
  num_pages: number;
  num_favorites: number;
}

export interface NHentaiGalleryInfoPage {
  i: number;
  t: ValueOf<NHentaiImgExt>;
}

export interface NHentaiGalleryInfo {
  gid: number;
  mid: string;
  title: string;
  pages: NHentaiGalleryInfoPage[];
  cfName: string;
}

export const getMediaDownloadUrl = IS_NHENTAI
  ? (mid: string, filename: string) => `https://i.nhentai.net/galleries/${mid}/${filename}`
  : IS_NHENTAI_TO
  ? (mid: string, filename: string) => `https://cdn.nload.xyz/galleries/${mid}/${filename}`
  : (mid: string, filename: string) => `https://cdn.nhentai.xxx/g/${mid}/${filename}`;

const getNHentaiImgExt = ({ t }: NHentaiImage): ValueOf<NHentaiImgExt> => ImgExtMap[t];

const getGalleryFromApi = (gid: number | string): Promise<NHentaiGallery> => {
  const url = `https://nhentai.net/api/gallery/${gid}`;
  return getJSON<NHentaiGallery>(url);
};

export const getGalleryInfo = async (gid?: number | string): Promise<NHentaiGalleryInfo> => {
  const {
    id,
    media_id,
    title: { english, japanese, pretty },
    images: { pages },
    num_pages,
  }: NHentaiGallery = await (async () => {
    if (gid) return getGalleryFromApi(gid);

    const localGallery = unsafeWindow._gallery ?? unsafeWindow.gallery;
    if (localGallery) return localGallery;

    const gidFromUrl = /^\/g\/(\d+)/.exec(window.location.pathname)?.[1];
    if (gidFromUrl) return getGalleryFromApi(gidFromUrl);

    throw new Error('Cannot get gallery info.');
  })();

  // 有些站点例如 nhentai.website 的 gallery 里面的图片列表是个 object，需要特殊处理
  const infoPages = (Array.isArray(pages) ? pages : Object.values<NHentaiImage>(pages)).map(
    (img, i) => ({ i: i + 1, t: getNHentaiImgExt(img) }),
  );

  const info: NHentaiGalleryInfo = {
    gid: id,
    mid: media_id,
    title: japanese || english,
    pages: infoPages,
    cfName: compileTemplate(settings.compressionFileName)({
      english,
      japanese: japanese || english,
      pretty,
      id,
      pages: num_pages,
    }),
  };
  logger.log(info);

  return info;
};
