/* eslint-disable @typescript-eslint/naming-convention */
import { unsafeWindow } from '$';
import $ from 'jquery';
import { invert } from 'lodash-es';
import { getJSON, getText } from './request';
import { compileTemplate } from './common';
import { settings } from './settings';
import logger from './logger';
import { IS_NHENTAI, IS_NHENTAI_TO, IS_PAGE_MANGA_DETAIL } from '@/const';

enum NHentaiImgExt {
  j = 'jpg',
  p = 'png',
  g = 'gif',
}

const nHentaiImgExtReversed = invert(NHentaiImgExt) as Record<
  string,
  keyof typeof NHentaiImgExt | undefined
>;

const getTypeFromExt = (ext: string): keyof typeof NHentaiImgExt | undefined =>
  nHentaiImgExtReversed[ext.toLowerCase()];

interface NHentaiImage {
  t: keyof typeof NHentaiImgExt;
  w?: number;
  h?: number;
}

interface NHentaiTag {
  id: number;
  type: string;
  name: string;
  url: string;
  count: number;
}

export interface NHentaiGallery {
  id: number;
  media_id: string;
  title: {
    english: string;
    japanese: string;
    pretty: string;
  };
  images: {
    pages: NHentaiImage[];
    cover?: NHentaiImage;
    thumbnail?: NHentaiImage;
  };
  scanlator?: string;
  upload_date?: number;
  tags?: NHentaiTag[];
  num_pages?: number;
  num_favorites?: number;
}

export interface NHentaiGalleryInfoPage {
  i: number;
  t: NHentaiImgExt;
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

const getGalleryFromApi = (gid: number | string): Promise<NHentaiGallery> => {
  const url = `https://nhentai.net/api/gallery/${gid}`;
  return getJSON<NHentaiGallery>(url);
};

const getGalleryFromWebpage = async (gid: number | string): Promise<NHentaiGallery> => {
  let html = '';

  if (!IS_PAGE_MANGA_DETAIL) {
    html = await getText(`/g/${gid}`);
    const match = /gallery(\(\{[\s\S]+\}\));/.exec(html)?.[1];
    if (match) {
      try {
        // eslint-disable-next-line no-eval
        return eval(match);
      } catch {
        logger.warn('get gallery by eval failed');
      }
    }
  }

  const $$ = IS_PAGE_MANGA_DETAIL ? $(document.body) : $(html);

  const english = $$.find('#info h1').text();
  const japanese = $$.find('#info h2').text();

  const pages: NHentaiImage[] = [];
  let mediaId = '';

  (window as any).$$ = $$;

  $$.find<HTMLImageElement>('#thumbnail-container img').each((i, img) => {
    const src = img.dataset.src ?? img.src;
    const match = /\/(\d+)\/(\d+)t?\.(\w+)/.exec(src);
    if (!match) return;
    const [, mid, index, ext] = match;
    if (!mediaId) mediaId = mid;
    const t = getTypeFromExt(ext);
    if (!t) return;
    pages[Number(index) - 1] = { t };
  });

  return {
    id: Number(gid),
    media_id: mediaId,
    title: {
      english: english || japanese,
      japanese: japanese || english,
      pretty: english || japanese,
    },
    images: {
      pages,
    },
  };
};

const getGallery = async (gid: number | string): Promise<NHentaiGallery> => {
  const gallery = IS_NHENTAI ? await getGalleryFromApi(gid) : await getGalleryFromWebpage(gid);
  logger.log('gallery', gallery);
  return gallery;
};

export const getGalleryInfo = async (gid?: number | string): Promise<NHentaiGalleryInfo> => {
  const {
    id,
    media_id,
    title: { english, japanese, pretty },
    images: { pages },
    num_pages,
  }: NHentaiGallery = await (async () => {
    if (gid) return getGallery(gid);

    const localGallery = unsafeWindow._gallery ?? unsafeWindow.gallery;
    if (localGallery) return localGallery;

    const gidFromUrl = /^\/g\/(\d+)/.exec(location.pathname)?.[1];
    if (gidFromUrl) return getGallery(gidFromUrl);

    throw new Error('Cannot get gallery info.');
  })();

  // 有些站点例如 nhentai.website 的 gallery 里面的图片列表是个 object，需要特殊处理
  const infoPages = (Array.isArray(pages) ? pages : Object.values<NHentaiImage>(pages)).map(
    (img, i) => ({ i: i + 1, t: NHentaiImgExt[img.t] }),
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
  logger.log('info', info);

  return info;
};
