/* eslint-disable @typescript-eslint/naming-convention */
import { unsafeWindow } from '$';
import $ from 'jquery';
import { filter, invert, map, sample } from 'lodash-es';
import { fetchJSON, getText } from './request';
import { compileTemplate } from './common';
import { NHentaiDownloadHostSpecial, nHentaiDownloadHosts, settings } from './settings';
import logger from './logger';
import { Counter } from './counter';
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

export const getMediaDownloadUrl = IS_NHENTAI
  ? (mid: string, filename: string) =>
      `https://${getNHentaiDownloadHost()}/galleries/${mid}/${filename}`
  : IS_NHENTAI_TO
  ? (mid: string, filename: string) => `https://cdn.nload.xyz/galleries/${mid}/${filename}`
  : (mid: string, filename: string) => `https://cdn.nhentai.xxx/g/${mid}/${filename}`;

const getGalleryFromApi = (gid: number | string): Promise<NHentaiGallery> => {
  const url = `https://nhentai.net/api/gallery/${gid}`;
  return fetchJSON<NHentaiGallery>(url);
};

const getGalleryFromWebpage = async (gid: number | string): Promise<NHentaiGallery> => {
  let doc = document;

  if (!IS_PAGE_MANGA_DETAIL) {
    const html = await getText(`/g/${gid}`);

    // 有些站点 script 里有 gallery 信息
    const match = /gallery(\(\{[\s\S]+\}\));/.exec(html)?.[1];
    if (match) {
      try {
        // eslint-disable-next-line no-eval
        const gallery: NHentaiGallery = eval(match);
        // 有些镜像站有™大病，gallery 信息里的 id 是错误的，以地址为准
        gallery.id = Number(gid);
      } catch {
        logger.warn('get gallery by eval failed');
      }
    }

    // 直接把 html 给 jq 解析的话会把里面的图片也给加载了，用 DOMParser 解析完再扔给 jq 就不会
    const parser = new DOMParser();
    doc = parser.parseFromString(html, 'text/html');
  }

  const $doc = $(doc.body);

  const english = $doc.find('#info h1').text();
  const japanese = $doc.find('#info h2').text();

  const pages: NHentaiImage[] = [];
  let mediaId = '';

  $doc.find<HTMLImageElement>('#thumbnail-container img').each((i, img) => {
    const src = img.dataset.src ?? img.src;
    const match = /\/(\d+)\/(\d+)t?\.(\w+)/.exec(src);
    if (!match) return;
    const [, mid, index, ext] = match;
    if (!mediaId) mediaId = mid;
    const t = getTypeFromExt(ext);
    if (!t) return;
    pages[Number(index) - 1] = { t };
  });

  if ((!english && !japanese) || !mediaId || !pages.length) {
    throw new Error('Get gallery info error.');
  }

  const getTags = (type: string, elContains: string): NHentaiTag[] => {
    const $names = $(`#tags .tag-container:contains(${elContains}) .tag > .name`);
    const names = filter(Array.from($names).map(el => el.innerText.trim()));
    return names.map((name): NHentaiTag => ({ type, name }));
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

  const uploadDateStr = $('#tags .tag-container:contains(Uploaded) time').attr('datetime');
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

const getGallery = async (gid: number | string): Promise<NHentaiGallery> => {
  const gallery = IS_NHENTAI ? await getGalleryFromApi(gid) : await getGalleryFromWebpage(gid);
  logger.log('gallery', gallery);
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

    if (localGallery) {
      // 有些镜像站有™大病，gallery 信息里的 id 是错误的，以地址为准
      if (gidFromUrl) localGallery.id = Number(gidFromUrl);
      return localGallery;
    }

    if (gidFromUrl) return getGallery(gidFromUrl);

    throw new Error('Cannot get gallery info.');
  })();

  const { english, japanese, pretty } = title;

  // 有些站点例如 nhentai.website 的 gallery 里面的图片列表是个 object，需要特殊处理
  const infoPages = (Array.isArray(pages) ? pages : Object.values<NHentaiImage>(pages)).map(
    ({ t, w, h }, i) => ({ i: i + 1, t: NHentaiImgExt[t], w, h }),
  );

  const info: NHentaiGalleryInfo = {
    gid: id,
    mid: media_id,
    title,
    pages: infoPages,
    cfName: compileTemplate(settings.compressionFilename)({
      english: english || japanese,
      japanese: japanese || english,
      pretty: pretty || english || japanese,
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
