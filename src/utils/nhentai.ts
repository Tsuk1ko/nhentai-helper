/* eslint-disable @typescript-eslint/naming-convention */
import { GM_getValue, GM_setValue, unsafeWindow } from '$';
import $ from 'jquery';
import { each, filter, identity, invert, map, once } from 'lodash-es';
import { fetchJSON, fetchText } from './request';
import { compileTemplate, tryParseJSON } from './common';
import {
  NHentaiDownloadHostSpecial,
  nHentaiDownloadHosts,
  settings,
  validTitleReplacement,
} from './settings';
import logger from './logger';
import { Counter } from './counter';
import { loadHTML } from './html';
import { OrderCache } from './orderCache';
import { removeIllegalFilenameChars } from './formatter';
import {
  MEDIA_URL_TEMPLATE_MAY_CHANGE,
  IS_NHENTAI,
  IS_PAGE_MANGA_DETAIL,
  MEDIA_URL_TEMPLATE_KEY,
  THUMB_MEDIA_URL_TEMPLATE_KEY,
} from '@/const';
import { selector } from '@/rules/selector';

export enum NHentaiImgExt {
  j = 'jpg',
  p = 'png',
  g = 'gif',
  w = 'webp',
}

const nHentaiImgExtReversed = invert(NHentaiImgExt) as Record<
  string,
  keyof typeof NHentaiImgExt | undefined
>;

const getTypeFromExt = (ext: string): keyof typeof NHentaiImgExt | undefined =>
  nHentaiImgExtReversed[ext.toLowerCase()];

export interface NHentaiImage {
  t: keyof typeof NHentaiImgExt;
  w?: number;
  h?: number;
}

export interface NHentaiTag {
  id?: number;
  type: string;
  name: string;
  /** will be `_url` if in `window.gallery` */
  url?: string;
  count?: number;
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
  tags: NHentaiTag[];
  num_pages?: number;
  num_favorites?: number;
}

export interface NHentaiGalleryInfoPage {
  i: number;
  t: NHentaiImgExt;
  w?: number;
  h?: number;
}

export interface NHentaiGalleryInfo {
  gid: number;
  mid: string;
  title: NHentaiGallery['title'];
  pages: NHentaiGalleryInfoPage[];
  cfName: string;
  tags: NHentaiTag[];
  uploadDate?: number;
  gallery: NHentaiGallery;
}

export const nHentaiDownloadHostCounter = new Counter(nHentaiDownloadHosts);

const getNHentaiDownloadHost = (mid: string) => {
  switch (settings.nHentaiDownloadHost) {
    case NHentaiDownloadHostSpecial.RANDOM:
      return nHentaiDownloadHostCounter.getRandom(mid);
    case NHentaiDownloadHostSpecial.BALANCE:
      return nHentaiDownloadHostCounter.getMin(mid);
    default:
      return settings.nHentaiDownloadHost;
  }
};

export const getMediaDownloadUrl = (mid: string, filename: string) =>
  `https://${getNHentaiDownloadHost(mid)}/galleries/${mid}/${filename}`;

export const getMediaDownloadUrlByWebpage = async (gid: string, mid: string, filename: string) =>
  (await getCompliedMediaUrlTemplate(gid))({ mid, filename });

const getGalleryFromApi = (gid: number | string): Promise<NHentaiGallery> => {
  const url = `https://nhentai.net/api/gallery/${gid}`;
  return fetchJSON<NHentaiGallery>(url);
};

const fixGalleryObj = (gallery: NHentaiGallery, gid?: number | string) => {
  // 有些镜像站有™大病，gallery 信息里的 id 是错误的，以地址为准
  if (gid) gallery.id = Number(gid);
  // 有些镜像站的图片列表是个 object，需要特殊处理
  if (!Array.isArray(gallery.images.pages)) {
    gallery.images.pages = Object.values(gallery.images.pages);
  }
  return gallery;
};

const getGalleryFromWebpage = async (gid: number | string): Promise<NHentaiGallery> => {
  let doc = document;

  if (!IS_PAGE_MANGA_DETAIL) {
    const html = await fetchText(`/g/${gid}`);
    // 直接把 html 给 jq 解析的话会把里面的图片也给加载了，用 DOMParser 解析完再扔给 jq 就不会
    const parser = new DOMParser();
    doc = parser.parseFromString(html, 'text/html');
  }

  // 有些站点 script 里有 gallery 信息
  const match = /gallery(\(\{[\s\S]+\}\));/.exec(doc.body.innerHTML)?.[1];
  if (match) {
    try {
      // eslint-disable-next-line no-eval
      const gallery: NHentaiGallery = eval(match);
      logger.log('get gallery by script tag success');
      return fixGalleryObj(gallery, gid);
    } catch {
      logger.warn('get gallery by script tag failed');
    }
  }

  const $doc = $(doc.body);

  const english = $doc.find(selector.englishTitle).text();
  const japanese = $doc.find(selector.japaneseTitle).text();

  const pages: NHentaiImage[] = [];
  let mediaId = '';

  const xxxPageMatch = tryParseJSON<{
    fl: Record<string, string>;
    th: Record<string, string>;
  }>(/'({"fl":{"1":"[^']+)'/.exec(doc.body.innerHTML)?.[1]);
  if (xxxPageMatch) {
    const img = $doc.find<HTMLImageElement>(selector.thumbnailContainerImage)[0];
    const src = img.dataset.src ?? img.src;
    const match = /\/([0-9a-z]+)\/(\d+)t?\.([^/]+)$/i.exec(src);
    if (match) mediaId = match[1];
    each(xxxPageMatch.fl, (data, index) => {
      const [type, width, height] = data.split(',');
      pages[Number(index) - 1] = {
        t: type as any,
        w: width ? Number(width) : undefined,
        h: height ? Number(height) : undefined,
      };
    });
  } else {
    $doc.find<HTMLImageElement>(selector.thumbnailContainerImage).each((i, img) => {
      const src = img.dataset.src ?? img.src;
      const width = img.getAttribute('width');
      const height = img.getAttribute('height');
      const match = /\/([0-9a-z]+)\/(\d+)t?\.([^/]+)$/i.exec(src);
      if (!match) return;
      const [, mid, index, ext] = match;
      if (!mediaId) mediaId = mid;
      const t = getTypeFromExt(ext);
      if (!t) return;
      pages[Number(index) - 1] = {
        t,
        w: width ? Number(width) : undefined,
        h: height ? Number(height) : undefined,
      };
    });
  }

  if ((!english && !japanese) || !mediaId || !pages.length) {
    throw new Error('Get gallery info error.');
  }

  const getTags = (type: string, elContains: string): NHentaiTag[] => {
    const $tags = $doc.find(selector.tag(elContains));
    return filter(
      Array.from($tags).map((el): NHentaiTag | undefined => {
        if (!(el instanceof HTMLElement)) return undefined;
        const name = el.querySelector<HTMLElement>(selector.tagName)?.innerText.trim();
        const count = el.querySelector<HTMLElement>(selector.tagCount)?.innerText.trim();
        return name
          ? {
              type,
              name,
              url: el.getAttribute('href') || undefined,
              count: count ? Number(count) : undefined,
            }
          : undefined;
      }),
    ) as NHentaiTag[];
  };

  const tags = [
    ...getTags('parody', 'Parodies'),
    ...getTags('character', 'Characters'),
    ...getTags('tag', 'Tags'),
    ...getTags('artist', 'Artists'),
    ...getTags('group', 'Groups'),
    ...getTags('language', 'Languages'),
    ...getTags('category', 'Categories'),
  ];

  // 自动用 jpg 补充页
  const pageNum = Number($doc.find(selector.pagesTag).text() || 0);
  if (pageNum > 0 && pageNum !== pages.length) {
    const defaultPage: NHentaiImage = { t: 'j' };
    for (let i = pages.length; i < pageNum; i++) {
      pages.push(defaultPage);
    }
  }

  const uploadDateStr = $doc.find(selector.uploadDateTag).attr('datetime');
  const uploadDate = uploadDateStr ? new Date(uploadDateStr) : undefined;

  return {
    id: Number(gid),
    media_id: mediaId,
    title: {
      english: english || japanese,
      japanese: japanese || english,
      pretty: '',
    },
    images: {
      pages,
    },
    tags,
    num_pages: pageNum || pages.length,
    upload_date:
      uploadDate && String(uploadDate) !== 'Invalid Date'
        ? Math.floor(uploadDate.getTime() / 1000)
        : undefined,
  };
};

const getCFNameArtists = (tags: NHentaiTag[]): string => {
  const artists = map(
    tags.filter(({ name, type }) => type === 'artist' && name),
    'name',
  );
  if (!artists.length) return 'none';
  const maxNum = settings.filenameMaxArtistsNumber;
  if (maxNum && artists.length > maxNum) return 'various';
  return artists.join(settings.filenameArtistsSeparator);
};

const galleryCache = new OrderCache<string, NHentaiGallery>(100);

export const getGallery = async (gid: number | string): Promise<NHentaiGallery> => {
  gid = String(gid);
  const cached = galleryCache.get(gid);
  if (cached) return cached;
  const gallery = IS_NHENTAI ? await getGalleryFromApi(gid) : await getGalleryFromWebpage(gid);
  galleryCache.set(gid, gallery);
  logger.devLog('gallery', gallery);
  return gallery;
};

export const getGalleryInfo = async (gid?: number | string): Promise<NHentaiGalleryInfo> => {
  const gallery = await (async () => {
    if (gid) return getGallery(gid);

    const gidFromUrl = /^\/g\/(\d+)/.exec(location.pathname)?.[1];
    const localGallery = unsafeWindow._gallery ?? unsafeWindow.gallery;

    if (localGallery) return fixGalleryObj(localGallery, gidFromUrl);
    if (gidFromUrl) return getGallery(gidFromUrl);

    throw new Error('Cannot get gallery info.');
  })();

  const {
    id,
    media_id,
    title,
    images: { pages },
    num_pages,
    tags,
    upload_date,
  } = gallery;

  const { english, japanese, pretty } = title;

  const infoPages = pages.map(({ t, w, h }, i) => ({ i: i + 1, t: NHentaiImgExt[t], w, h }));

  const info: NHentaiGalleryInfo = {
    gid: id,
    mid: media_id,
    title,
    pages: infoPages,
    cfName: removeIllegalFilenameChars(
      compileTemplate(settings.compressionFilename)({
        english: applyTitleReplacement(english || japanese),
        japanese: applyTitleReplacement(japanese || english),
        pretty: applyTitleReplacement(pretty || english || japanese),
        id,
        pages: num_pages,
        artist: getCFNameArtists(tags),
      }),
    ),
    tags,
    uploadDate: upload_date,
    gallery,
  };
  logger.log('info', info);

  return info;
};

const fetchMediaUrlTemplate = async (gid: string) => {
  const onlineViewUrl =
    document
      .querySelector(selector.galleryHref)
      ?.getAttribute('href')
      ?.replace(/\/+$/, '')
      .replace(/\d+$/, gid)
      .concat('/1') ?? document.querySelector(selector.thumbnailHref)?.getAttribute('href');
  if (!onlineViewUrl) {
    throw new Error('get media url failed: cannot find a gallery');
  }

  logger.log(`fetching media url template by ${onlineViewUrl}`);

  const onlineViewHtml = await fetchText(onlineViewUrl);
  const $doc = loadHTML(onlineViewHtml);
  const $img = $doc.find(selector.mediaImage);
  const imgSrc = $img.attr('data-src') || $img.attr('src');
  if (!imgSrc) {
    throw new Error('get media url failed: cannot find an image src');
  }

  const template = imgSrc.replace(/\/[0-9a-z]+\/\d+\.[^/]+$/i, '/{{mid}}/{{filename}}');
  if (!MEDIA_URL_TEMPLATE_MAY_CHANGE) GM_setValue(MEDIA_URL_TEMPLATE_KEY, template);

  return template;
};

const fetchThumbMediaUrlTemplate = async (gid: string) => {
  const detailUrl = document
    .querySelector(selector.galleryHref)
    ?.getAttribute('href')
    ?.replace(/\d+(\/)?$/, `${gid}$1`);
  if (!detailUrl) {
    throw new Error('get detail url failed: cannot find a gallery');
  }

  logger.log(`fetching thumb media url template by ${detailUrl}`);

  const detailHtml = await fetchText(detailUrl);
  const $doc = loadHTML(detailHtml);
  const $img = $doc.find(selector.thumbnailContainerImage);
  const imgSrc = $img.attr('data-src') || $img.attr('src');
  if (!imgSrc) {
    throw new Error('get thumb media url failed: cannot find an image src');
  }

  const template = imgSrc.replace(/\/[0-9a-z]+\/\d+t\.[^/]+$/i, '/{{mid}}/{{filename}}');
  GM_setValue(THUMB_MEDIA_URL_TEMPLATE_KEY, template);

  return template;
};

const mediaUrlTemplateGidCache: Record<string, Map<string, Promise<string>>> = {};

const getMediaUrlTemplate = async (
  getter: (gid: string) => Promise<string>,
  cacheKey: string,
  gid: string,
) => {
  if (MEDIA_URL_TEMPLATE_MAY_CHANGE) {
    if (!mediaUrlTemplateGidCache[cacheKey]) mediaUrlTemplateGidCache[cacheKey] = new Map();
    if (mediaUrlTemplateGidCache[cacheKey].has(gid)) {
      return mediaUrlTemplateGidCache[cacheKey].get(gid)!;
    }
  }
  try {
    const promise = getter(gid);
    if (MEDIA_URL_TEMPLATE_MAY_CHANGE && !mediaUrlTemplateGidCache[cacheKey].has(gid)) {
      mediaUrlTemplateGidCache[cacheKey].set(gid, promise);
    }
    const template = await promise;
    logger.log(`use media url template: ${template}`);
    return template;
  } catch (error) {
    logger.error(error);
    if (MEDIA_URL_TEMPLATE_MAY_CHANGE) {
      mediaUrlTemplateGidCache[cacheKey].delete(gid);
    } else {
      const cachedTemplate = GM_getValue<string | undefined>(cacheKey);
      if (cachedTemplate) {
        logger.warn(`try to use cached media url template: ${cachedTemplate}`);
        return cachedTemplate;
      }
    }
    throw error;
  }
};

const getCompliedMediaUrlTemplate = (MEDIA_URL_TEMPLATE_MAY_CHANGE ? identity : once)(
  async (gid: string) =>
    compileTemplate(await getMediaUrlTemplate(fetchMediaUrlTemplate, MEDIA_URL_TEMPLATE_KEY, gid)),
);

export const getCompliedThumbMediaUrlTemplate = (MEDIA_URL_TEMPLATE_MAY_CHANGE ? identity : once)(
  async (gid: string) =>
    compileTemplate(
      IS_NHENTAI
        ? 'https://t3.nhentai.net/galleries/{{mid}}/{{filename}}'
        : await getMediaUrlTemplate(fetchThumbMediaUrlTemplate, THUMB_MEDIA_URL_TEMPLATE_KEY, gid),
    ),
);

const applyTitleReplacement = (title: string) => {
  if (!validTitleReplacement.value.length) return title;
  return validTitleReplacement.value.reduce((pre, { from, to, regexp }) => {
    try {
      return pre.replaceAll(regexp ? new RegExp(from, 'g') : from, to);
    } catch {
      return pre;
    }
  }, title);
};
