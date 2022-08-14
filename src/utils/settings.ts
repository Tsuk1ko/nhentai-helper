import { GM_getValue, GM_setValue } from '$';
import { reactive, Ref, toRefs, watch } from 'vue';
import { each, mapValues } from 'lodash';
import once from 'just-once';
import logger from './logger';

export interface Settings {
  /** 下载线程数 */
  threadNum: number;
  /** 在新窗口打开本子 */
  openOnNewTab: boolean;
  /** 自定义下载地址 */
  customDownloadUrl: string;
  /** 自定义压缩文件名 */
  compressionFileName: string;
  /** 自定义压缩级别 */
  compressionLevel: number;
  /** 压缩选项 streamFiles */
  compressionStreamFiles: boolean;
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
}

const settingsMap: {
  [key in keyof Settings]: {
    key: string;
    default: Settings[key];
    validator: (val: any) => boolean;
    formatter?: (val: Settings[key]) => Settings[key];
  };
} = {
  threadNum: {
    key: 'thread_num',
    default: 8,
    validator: val => typeof val === 'number' && 1 <= val && val <= 32,
    formatter: val => Math.floor(val),
  },
  openOnNewTab: {
    key: 'open_on_new_tab',
    default: true,
    validator: val => typeof val === 'boolean',
  },
  customDownloadUrl: {
    key: 'custom_download_url',
    default: '',
    validator: val => typeof val === 'string',
    formatter: val => val.trim(),
  },
  compressionFileName: {
    key: 'cf_name',
    default: '{{japanese}}.zip',
    validator: val => typeof val === 'string',
    formatter: val => val.trim(),
  },
  compressionLevel: {
    key: 'c_lv',
    default: 0,
    validator: val => typeof val === 'number' && 0 <= val && val <= 9,
    formatter: val => Math.floor(val),
  },
  compressionStreamFiles: {
    key: 'c_stream_files',
    default: false,
    validator: val => typeof val === 'boolean',
  },
  seriesMode: {
    key: 'series_mode',
    default: false,
    validator: val => typeof val === 'boolean',
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
    validator: val => typeof val === 'boolean',
  },
  autoRetryWhenErrorOccurs: {
    key: 'auto_retry_when_error_occurs',
    default: false,
    validator: val => typeof val === 'boolean',
  },
  autoShowAll: {
    key: 'auto_show_all',
    default: false,
    validator: val => typeof val === 'boolean',
  },
};

const readSettings = (): Settings =>
  mapValues(settingsMap, ({ key, default: defaultVal }) => GM_getValue<any>(key, defaultVal));

export const settings = reactive<Settings>(readSettings());

export const startWatchSettings = once(() => {
  const settingRefs = toRefs(settings);
  each(settingRefs, (ref, key) => {
    const cur = settingsMap[key as keyof Settings];
    watch(ref as Ref<any>, val => {
      if (!cur.validator(val)) {
        // @ts-expect-error never
        settings[key] = cur.default;
        return;
      }
      if (cur.formatter) {
        // @ts-expect-error never
        val = cur.formatter(val);
        // @ts-expect-error never
        if (settings[key] !== val) {
          // @ts-expect-error never
          settings[key] = val;
          return;
        }
      }
      logger.log('update setting', cur.key, val);
      GM_setValue(cur.key, val);
    });
  });
});
