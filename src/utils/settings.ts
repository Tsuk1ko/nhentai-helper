import { GM_getValue, GM_setValue } from '$';
import { detect } from 'detect-browser';
import { flow, identity, intersection, isEqual, mapValues, once } from 'es-toolkit';
import { computed, reactive, toRaw, toRefs, watch } from 'vue';
import type { Ref } from 'vue';
import { useStyle } from '@/hooks/useStyle';
import { defaultLocale, supportLanguage } from '@/i18n/utils';
import { MIME } from '@/typings';
import { objectEach } from './array';
import { alwaysFalse, escapeRegExp } from './common';
import { logger } from './logger';
import type { NHentaiGallery } from './nhentai';

export const nHentaiDownloadHosts = [
  'i.nhentai.net',
  'i1.nhentai.net',
  'i2.nhentai.net',
  'i3.nhentai.net',
  'i4.nhentai.net',
  'i5.nhentai.net',
  'i7.nhentai.net',
];

export enum NHentaiDownloadHostSpecial {
  AUTO = 'auto',
  RANDOM = 'random',
  BALANCE = 'balance',
}

export const nHentaiDownloadHostSpecials = [
  NHentaiDownloadHostSpecial.AUTO,
  NHentaiDownloadHostSpecial.RANDOM,
  NHentaiDownloadHostSpecial.BALANCE,
];

const availableNHentaiDownloadHost = new Set([
  ...nHentaiDownloadHostSpecials,
  ...nHentaiDownloadHosts,
]);

export interface Settings {
  /** 语言 */
  language: string;
  /** 下载线程数 */
  threadNum: number;
  /** 在新窗口打开本子 */
  openOnNewTab: boolean;
  /** 自定义下载地址 */
  customDownloadUrl: string;
  /** 自定义压缩文件名 */
  compressionFilename: string;
  /** 文件名最大作者数量 */
  filenameMaxArtistsNumber: number;
  /** 文件名作者分隔符 */
  filenameArtistsSeparator: string;
  /** 自定义压缩级别 */
  compressionLevel: number;
  /** 压缩选项 streamFiles */
  compressionStreamFiles: boolean;
  /** 流式下载 */
  streamDownload: boolean;
  /** 串行下载模式 */
  seriesMode: boolean;
  /** 文件名补零 */
  filenameLength: number | 'auto';
  /** 自动取消下载过的本子 */
  autoCancelDownloadedManga: boolean;
  /** 自动重试 */
  autoRetryWhenErrorOccurs: boolean;
  /** 自动显示全部 */
  autoShowAll: boolean;
  /** 显示忽略按钮 */
  showIgnoreButton: boolean;
  /** 阻止控制台清空 */
  preventConsoleClearing: boolean;
  /** 已下载判断 english 标题 */
  judgeDownloadedByEnglish: boolean;
  /** 已下载判断 japanese 标题 */
  judgeDownloadedByJapanese: boolean;
  /** 已下载判断 pretty 标题 */
  judgeDownloadedByPretty: boolean;
  /** nHentai 下载节点 */
  nHentaiDownloadHost: string;
  /** 元数据文件 */
  addMetaFile: string[];
  /** 元数据标题语言 */
  metaFileTitleLanguage: string;
  /** ComicInfo.xml Tags 额外包含 */
  comicInfoTagsExtraInclude: string[];
  /** ComicInfo.xml Tags 额外包含附带类型前缀 */
  comicInfoTagsExtraWithType: boolean;
  /** 标题替换 */
  titleReplacement: Array<{ from: string; to: string; regexp: boolean; ignoreCase: boolean }>;
  /** 标题黑名单 */
  titleBlacklist: Array<{ content: string; regexp: boolean; ignoreCase: boolean }>;
  /** 右键预览 */
  galleryContextmenuPreview: boolean;
  /** 转换 webp 到其他格式 */
  convertWebpTo: string;
  /** 转换 webp 到其他格式的质量 */
  convertWebpQuality: number;
  /** 自定义文件名函数 */
  customFilenameFunction: string;
  /** 移除广告页 */
  removeAdPage: boolean;
  /** 已下载本子的标题颜色 */
  downloadedTitleColor: string;
  /** 收集日志 */
  collectLog: boolean;
}

interface SettingsDefault {
  filenameLength: number;
}

type SettingValidator = (val: any) => boolean;
type SettingFormatter<T> = (val: T) => T;
type SettingMigrate<T> = (val: any) => T;

interface SettingDefinition<T = any, D = any> {
  key: string;
  default: D extends any[] | Record<any, any> ? () => D : D;
  validator: SettingValidator;
  itemValidator?: SettingValidator;
  formatter?: SettingFormatter<T>;
  migrate?: SettingMigrate<T>;
}

const booleanValidator: SettingValidator = val => typeof val === 'boolean';
const stringValidator: SettingValidator = val => typeof val === 'string';
const createNumberValidator =
  (min: number, max: number): SettingValidator =>
  val =>
    typeof val === 'number' && min <= val && val <= max;

const trimFormatter: SettingFormatter<string> = val => val.trim();

const availableMetaFiles = ['ComicInfoXml', 'EzeInfoJson'];
const availableMetaFileTitleLanguage = new Set(['english', 'japanese']);

export const settingDefinitions: Readonly<{
  [key in keyof Settings]: Readonly<
    SettingDefinition<
      Settings[key],
      key extends keyof SettingsDefault ? SettingsDefault[key] : Settings[key]
    >
  >;
}> = {
  language: {
    key: 'language',
    default: defaultLocale,
    validator: val => supportLanguage.has(val),
  },
  threadNum: {
    key: 'thread_num',
    default: 8,
    validator: createNumberValidator(1, 32),
    formatter: val => Math.floor(val),
  },
  openOnNewTab: {
    key: 'open_on_new_tab',
    default: true,
    validator: booleanValidator,
  },
  customDownloadUrl: {
    key: 'custom_download_url',
    default: '',
    validator: stringValidator,
    formatter: trimFormatter,
  },
  compressionFilename: {
    key: 'cf_name',
    default: '{{japanese}}.zip',
    validator: stringValidator,
    formatter: trimFormatter,
  },
  filenameMaxArtistsNumber: {
    key: 'cf_name_max_artists_number',
    default: 3,
    validator: createNumberValidator(0, Infinity),
  },
  filenameArtistsSeparator: {
    key: 'cf_name_artists_separator',
    default: ', ',
    validator: stringValidator,
  },
  compressionLevel: {
    key: 'c_lv',
    default: 0,
    validator: createNumberValidator(0, 9),
    formatter: val => Math.floor(val),
  },
  compressionStreamFiles: {
    key: 'c_stream_files',
    default: false,
    validator: booleanValidator,
  },
  streamDownload: {
    key: 'stream_download',
    default: false,
    validator: booleanValidator,
  },
  seriesMode: {
    key: 'series_mode',
    default: false,
    validator: booleanValidator,
  },
  filenameLength: {
    key: 'filename_length',
    default: 0,
    validator: val => val === 'auto' || (typeof val === 'number' && val >= 0),
    formatter: val => (typeof val === 'number' ? Math.floor(val) : val),
  },
  autoCancelDownloadedManga: {
    key: 'auto_cancel_downloaded_doujin',
    default: false,
    validator: booleanValidator,
  },
  autoRetryWhenErrorOccurs: {
    key: 'auto_retry_when_error_occurs',
    default: false,
    validator: booleanValidator,
  },
  autoShowAll: {
    key: 'auto_show_all',
    default: false,
    validator: booleanValidator,
  },
  showIgnoreButton: {
    key: 'show_ignore_button',
    default: false,
    validator: booleanValidator,
  },
  preventConsoleClearing: {
    key: 'prevent_console_clear',
    default: false,
    validator: booleanValidator,
  },
  judgeDownloadedByEnglish: {
    key: 'judge_downloaded_by_english',
    default: false,
    validator: booleanValidator,
  },
  judgeDownloadedByJapanese: {
    key: 'judge_downloaded_by_japanese',
    default: true,
    validator: booleanValidator,
  },
  judgeDownloadedByPretty: {
    key: 'judge_downloaded_by_pretty',
    default: false,
    validator: booleanValidator,
  },
  nHentaiDownloadHost: {
    key: 'nHentai_media_host',
    default: NHentaiDownloadHostSpecial.AUTO,
    validator: val => availableNHentaiDownloadHost.has(val),
  },
  addMetaFile: {
    key: 'add_meta_file',
    default: () => [],
    validator: val => Array.isArray(val),
    formatter: val => intersection(val, availableMetaFiles),
  },
  metaFileTitleLanguage: {
    key: 'meta_file_title_language',
    default: 'english',
    validator: val => availableMetaFileTitleLanguage.has(val),
  },
  comicInfoTagsExtraInclude: {
    key: 'comic_info_tags_extra_include',
    default: () => ['character', 'artist', 'group'],
    validator: val => Array.isArray(val),
    itemValidator: stringValidator,
  },
  comicInfoTagsExtraWithType: {
    key: 'comic_info_tags_extra_with_type',
    default: true,
    validator: booleanValidator,
  },
  titleReplacement: {
    key: 'title_replacement',
    default: () => [],
    validator: val => Array.isArray(val),
    itemValidator: item =>
      item &&
      stringValidator(item.from) &&
      stringValidator(item.to) &&
      booleanValidator(item.regexp) &&
      booleanValidator(item.ignoreCase),
    migrate: val =>
      Array.isArray(val) && val.some(item => !('ignoreCase' in item))
        ? val.map(item => ({ ...item, ignoreCase: false }))
        : val,
  },
  titleBlacklist: {
    key: 'title_blacklist',
    default: () => [],
    validator: val => Array.isArray(val),
    itemValidator: item =>
      item &&
      stringValidator(item.content) &&
      booleanValidator(item.regexp) &&
      booleanValidator(item.ignoreCase),
    migrate: val =>
      Array.isArray(val) && val.some(item => !('ignoreCase' in item))
        ? val.map(item => ({ ...item, ignoreCase: false }))
        : val,
  },
  galleryContextmenuPreview: {
    key: 'gallery_contextmenu_preview',
    default: false,
    validator: booleanValidator,
  },
  convertWebpTo: {
    key: 'convert_webp_to',
    default: MIME.JPG,
    validator: val => [MIME.JPG, MIME.PNG, ''].includes(val),
  },
  convertWebpQuality: {
    key: 'convert_webp_quality',
    default: 85,
    validator: val => val >= 0 && val <= 100,
  },
  customFilenameFunction: {
    key: 'custom_title_function',
    default: '',
    validator: stringValidator,
  },
  removeAdPage: {
    key: 'remove_ad_page',
    default: false,
    validator: booleanValidator,
  },
  downloadedTitleColor: {
    key: 'downloaded_title_color',
    default: 'rgb(153, 153, 153)',
    validator: stringValidator,
  },
  collectLog: {
    key: 'collect_log',
    default: false,
    validator: booleanValidator,
  },
};

const browserDetect = detect();

export const DISABLE_STREAM_DOWNLOAD =
  !!browserDetect && (browserDetect.name === 'safari' || browserDetect.name === 'firefox');

const readSettings = (): Settings =>
  mapValues(
    settingDefinitions,
    ({ key, default: defaultVal, validator, itemValidator, migrate }) => {
      const realDefault = typeof defaultVal === 'function' ? defaultVal() : defaultVal;
      let val = GM_getValue<any>(key, realDefault);
      if (migrate) val = migrate(val);
      if (!validator(val)) return realDefault;
      if (Array.isArray(val) && itemValidator) {
        const validItems = val.filter(itemValidator);
        if (val.length !== validItems.length) {
          return realDefault;
        }
      }
      return val;
    },
  );

const initSettings = (): Settings => {
  const settings = readSettings();
  // reset nHentai media host setting to auto
  {
    const key = '_flag_nHentai_media_host_reset_20241207';
    if (!GM_getValue<boolean>(key, false)) {
      const def = settingDefinitions.nHentaiDownloadHost;
      if (settings.nHentaiDownloadHost !== def.default) {
        settings.nHentaiDownloadHost = def.default;
        GM_setValue(def.key, def.default);
      }
      GM_setValue(key, true);
    }
  }
  return settings;
};

export const writeableSettings: Settings = reactive(initSettings());

export const settings = writeableSettings as Readonly<Settings>;

if (DISABLE_STREAM_DOWNLOAD && settings.streamDownload) writeableSettings.streamDownload = false;

export const startWatchSettings = once(() => {
  const settingRefs = toRefs(writeableSettings);
  objectEach(settingRefs, (ref, key) => {
    const cur = settingDefinitions[key as keyof Settings] as SettingDefinition;
    let valChanged = false;
    const saveValue = (val: any) => {
      logger.info('update setting', cur.key, toRaw(val));
      GM_setValue(cur.key, val);
    };
    watch(
      ref as Ref<any>,
      val => {
        if (valChanged) {
          valChanged = false;
          saveValue(val);
          return;
        }
        const applyChange = (newVal: any) => {
          val = newVal;
          ref.value = newVal;
          valChanged = true;
        };
        if (!cur.validator(val)) {
          applyChange(typeof cur.default === 'function' ? cur.default() : cur.default);
          return;
        }
        if (Array.isArray(val) && cur.itemValidator) {
          const validItems = val.filter(cur.itemValidator);
          if (val.length !== validItems.length) {
            applyChange(validItems);
          }
        }
        if (cur.formatter) {
          const formattedVal = cur.formatter(val);
          if (
            typeof formattedVal === 'object' ? !isEqual(val, formattedVal) : val !== formattedVal
          ) {
            applyChange(formattedVal);
          }
        }
        if (!valChanged) saveValue(val);
      },
      typeof ref.value === 'object' ? { deep: true } : undefined,
    );
  });
});

export const replaceTitle = computed<(title: string) => string>(() => {
  const list = settings.titleReplacement.filter(item => item?.from);
  if (!list.length) return identity;
  return flow(
    ...list.map(({ from, to, regexp, ignoreCase }) => {
      try {
        const searchValue = regexp
          ? new RegExp(from, ignoreCase ? 'gi' : 'g')
          : ignoreCase
            ? new RegExp(escapeRegExp(from), 'gi')
            : from;
        return (title: string) => title.replaceAll(searchValue, to);
      } catch (error) {
        logger.error('title replacement regexp:', error);
        return identity;
      }
    }),
  );
});

export const isTitleBlacklisted = computed<(title: string) => boolean>(() => {
  const list = settings.titleBlacklist
    .filter(item => item?.content)
    .map(({ content, regexp, ignoreCase }) => {
      if (regexp) {
        try {
          const reg = new RegExp(content, ignoreCase ? 'gi' : 'g');
          return (title: string) => reg.test(title);
        } catch (error) {
          logger.error('title blacklist regexp:', error);
          return alwaysFalse;
        }
      }
      if (ignoreCase) {
        const reg = new RegExp(escapeRegExp(content), 'gi');
        return (title: string) => reg.test(title);
      }
      return (title: string) => title.includes(content);
    });
  if (!list.length) return alwaysFalse;
  return (title: string) => list.some(fn => fn(title));
});

export const customFilenameFunction = computed(() => {
  if (!settings.customFilenameFunction.trim()) return null;
  try {
    // eslint-disable-next-line no-new-func
    return new Function('filename', 'gallery', settings.customFilenameFunction) as (
      title: string,
      gallery: NHentaiGallery,
    ) => unknown;
  } catch {
    return null;
  }
});

export const applyDownloadedTitleColor = once(() =>
  useStyle(() => `:root{--nh-helper-downloaded-title-color:${settings.downloadedTitleColor}}`),
);
