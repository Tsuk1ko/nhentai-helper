import { GM_getValue, GM_setValue } from '$';
import { reactive, Ref, toRefs, watch } from 'vue';
import { each, mapValues } from 'lodash-es';
import once from 'just-once';
import { detect } from 'detect-browser';
import logger from './logger';

export interface Settings {
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
}

type SettingValidator = (val: any) => boolean;
type SettingFormatter<T> = (val: T) => T;

interface SettingDefinition<T> {
  key: string;
  default: T;
  validator: SettingValidator;
  formatter?: SettingFormatter<T>;
}

const booleanValidator: SettingValidator = val => typeof val === 'boolean';
const stringValidator: SettingValidator = val => typeof val === 'string';
const createNumberValidator =
  (start: number, end: number): SettingValidator =>
  val =>
    typeof val === 'number' && start <= val && val <= end;

const trimFormatter: SettingFormatter<string> = val => val.trim();

export const settingDefinitions: Readonly<{
  [key in keyof Settings]: Readonly<SettingDefinition<Settings[key]>>;
}> = {
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
};

const browserDetect = detect();

export const DISABLE_STREAM_DOWNLOAD =
  !!browserDetect && (browserDetect.name === 'safari' || browserDetect.name === 'firefox');

const readSettings = (): Settings =>
  mapValues(settingDefinitions, ({ key, default: defaultVal }) =>
    GM_getValue<any>(key, defaultVal),
  );

export const writeableSettings: Settings = reactive(readSettings());

export const settings = writeableSettings as Readonly<Settings>;

if (DISABLE_STREAM_DOWNLOAD && settings.streamDownload) writeableSettings.streamDownload = false;

export const startWatchSettings = once(() => {
  const settingRefs = toRefs(writeableSettings);
  each(settingRefs, (ref, key) => {
    const cur = settingDefinitions[key as keyof Settings] as SettingDefinition<any>;
    watch(ref as Ref<any>, val => {
      if (!cur.validator(val)) {
        ref.value = cur.default;
        return;
      }
      if (cur.formatter) {
        const formattedVal = cur.formatter(val);
        if (ref.value !== formattedVal) {
          ref.value = formattedVal;
          return;
        }
      }
      logger.log('update setting', cur.key, val);
      GM_setValue(cur.key, val);
    });
  });
});
