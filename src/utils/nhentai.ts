/* eslint-disable @typescript-eslint/naming-convention */
import { GM_getValue, GM_setValue, unsafeWindow } from '$';
import $ from 'jquery';
import { filter, invert, map, once, sample } from 'lodash-es';
import { fetchJSON, getText } from './request';
import { compileTemplate } from './common';
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
import {
  IS_NHENTAI,
  IS_PAGE_MANGA_DETAIL,
  MEDIA_URL_TEMPLATE_KEY,
  THUMB_MEDIA_URL_TEMPLATE_KEY,
} from '@/const';

export enum NHentaiImgExt {
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
}

export const nHentaiDownloadHostCounter = new Counter(nHentaiDownloadHosts);

const getNHentaiDownloadHost = () => {
  switch (settings.nHentaiDownloadHost) {
    case NHentaiDownloadHostSpecial.RANDOM:
      return sample(nHentaiDownloadHosts);
    case NHentaiDownloadHostSpecial.BALANCE:
      return nHentaiDownloadHostCounter.getMin();
    default:
      return settings.nHentaiDownloadHost;
  }
};

export const getMediaDownloadUrl = (mid: string, filename: string) =>
  `https://${getNHentaiDownloadHost()}/galleries/${mid}/${filename}`;

export const getMediaDownloadUrlOnMirrorSite = async (mid: string, filename: string) =>
  (await getCompliedMediaUrlTemplate())({ mid, filename });

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
    const html = await getText(`/g/${gid}`);
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

  const english = $doc.find('#info h1').text();
  const japanese = $doc.find('#info h2').text();

  const pages: NHentaiImage[] = [];
  let mediaId = '';

  $doc.find<HTMLImageElement>('#thumbnail-container img').each((i, img) => {
    const src = img.dataset.src ?? img.src;
    const width = img.getAttribute('width');
    const height = img.getAttribute('height');
    const match = /\/(\d+)\/(\d+)t?\.(\w+)/.exec(src);
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

  if ((!english && !japanese) || !mediaId || !pages.length) {
    throw new Error('Get gallery info error.');
  }

  const getTags = (type: string, elContains: string): NHentaiTag[] => {
    const $tags = $doc.find(`#tags .tag-container:contains(${elContains}) .tag`);
    return filter(
      Array.from($tags).map((el): NHentaiTag | undefined => {
        const name = el.querySelector<HTMLElement>('.name')?.innerText.trim();
        const count = el.querySelector<HTMLElement>('.count')?.innerText.trim();
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

  const uploadDateStr = $doc.find('#tags .tag-container:contains(Uploaded) time').attr('datetime');
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
  const {
    id,
    media_id,
    title,
    images: { pages },
    num_pages,
    tags,
    upload_date,
  }: NHentaiGallery = await (async () => {
    if (gid) return getGallery(gid);

    const gidFromUrl = /^\/g\/(\d+)/.exec(location.pathname)?.[1];
    const localGallery = unsafeWindow._gallery ?? unsafeWindow.gallery;

    if (localGallery) return fixGalleryObj(localGallery, gidFromUrl);
    if (gidFromUrl) return getGallery(gidFromUrl);

    throw new Error('Cannot get gallery info.');
  })();

  const { english, japanese, pretty } = title;

  const infoPages = pages.map(({ t, w, h }, i) => ({ i: i + 1, t: NHentaiImgExt[t], w, h }));

  const info: NHentaiGalleryInfo = {
    gid: id,
    mid: media_id,
    title,
    pages: infoPages,
    cfName: compileTemplate(settings.compressionFilename)({
      english: applyTitleReplacement(english || japanese),
      japanese: applyTitleReplacement(japanese || english),
      pretty: applyTitleReplacement(pretty || english || japanese),
      id,
      pages: num_pages,
      artist: getCFNameArtists(tags),
    }).replace(/[/\\:*?"<>|]/g, ''),
    tags,
    uploadDate: upload_date,
  };
  logger.log('info', info);

  return info;
};

const fetchMediaUrlTemplate = async () => {
  const onlineViewUrl =
    document.querySelector('.gallery a')?.getAttribute('href')?.replace(/\/+$/, '').concat('/1') ??
    document.querySelector('a.gallerythumb')?.getAttribute('href');
  if (!onlineViewUrl) {
    throw new Error('get media url failed: cannot find a gallery');
  }

  logger.log(`fetching media url template by ${onlineViewUrl}`);

  const onlineViewHtml = await getText(onlineViewUrl);
  const $doc = loadHTML(onlineViewHtml);
  const imgSrc = $doc.find('#image-container img').attr('src');
  if (!imgSrc) {
    throw new Error('get media url failed: cannot find an image src');
  }

  const template = imgSrc.replace(/\/\d+\//, '/{{mid}}/').replace(/\/\d+\.[^/]+$/, '/{{filename}}');
  GM_setValue(MEDIA_URL_TEMPLATE_KEY, template);

  return template;
};

const fetchThumbMediaUrlTemplate = async () => {
  const detailUrl = document.querySelector('.gallery a')?.getAttribute('href');
  if (!detailUrl) {
    throw new Error('get detail url failed: cannot find a gallery');
  }

  logger.log(`fetching thumb media url template by ${detailUrl}`);

  const detailHtml = await getText(detailUrl);
  const $doc = loadHTML(detailHtml);
  const $img = $doc.find('#thumbnail-container img');
  const imgSrc = $img.attr('data-src') || $img.attr('src');
  if (!imgSrc) {
    throw new Error('get thumb media url failed: cannot find an image src');
  }

  const template = imgSrc
    .replace(/\/\d+\//, '/{{mid}}/')
    .replace(/\/\d+t\.[^/]+$/, '/{{filename}}');
  GM_setValue(THUMB_MEDIA_URL_TEMPLATE_KEY, template);

  return template;
};

const getMediaUrlTemplate = async (getter: () => Promise<string>, cacheKey: string) => {
  try {
    const template = await getter();
    logger.log(`use media url template: ${template}`);
    return template;
  } catch (error) {
    logger.error(error);
    const cachedTemplate = GM_getValue<string | undefined>(cacheKey);
    if (cachedTemplate) {
      logger.warn(`try to use cached media url template: ${cachedTemplate}`);
      return cachedTemplate;
    }
    throw error;
  }
};

const getCompliedMediaUrlTemplate = once(async () =>
  compileTemplate(await getMediaUrlTemplate(fetchMediaUrlTemplate, MEDIA_URL_TEMPLATE_KEY)),
);

export const getCompliedThumbMediaUrlTemplate = once(async () =>
  compileTemplate(
    IS_NHENTAI
      ? 'https://t3.nhentai.net/galleries/{{mid}}/{{filename}}'
      : await getMediaUrlTemplate(fetchThumbMediaUrlTemplate, THUMB_MEDIA_URL_TEMPLATE_KEY),
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
