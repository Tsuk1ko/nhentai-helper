import type { MessageContext } from '@intlify/core-base';
import { getActionText } from '../utils';

export default {
  common: {
    settings: 'Settings',
    auto: 'Auto',
    english: 'English',
    japanese: 'Japanese',
    chinese: 'Chinese',
    pretty: 'Pretty',
    filter: 'Filter',
    none: 'None',
    random: 'Random',
    balance: 'Balance',
    abbr: {
      english: 'EN',
      japanese: 'JP',
      chinese: 'CN',
    },
  },
  setting: {
    title: '@:common.settings',
    advanceTitle: 'Advance Settings',
    helpButton: 'Help',
    asteriskTip: 'means refresh is required to take effect',
    downloadThread: 'Download thread',
    openOnNewTab: 'Open on new tab',
    compressionFilename: 'Compression filename',
    maxNumber: 'Max number',
    separator: 'Separator',
    compressionLevel: 'Compression level',
    filenameLength: 'Filename length',
    autoCancelDownloadedManga: 'Auto cancel downloaded manga',
    autoRetryWhenErrorOccurs: 'Auto retry when error occurs',
    autoShowAll: 'Auto show all',
    showIgnoreButton: 'Show "Ignore" button',
    judgeDownloadedMangaByTitle: 'Judge downloaded manga by title',
    customDownloadUrl: 'Custom download URL',
    compressionStreamFiles: 'Compression "streamFiles"',
    seriesMode: 'Series mode',
    streamDownload: 'Stream download',
    preventConsoleClearing: 'Prevent console clearing',
    nHentaiDownloadHost: 'nHentai download host',
    addMetaFile: 'Add metadata file',
    metaFileTitleLanguage: 'Title language',
    titleReplacement: 'Title replacement',
    history: {
      title: 'Download History',
      downloadedNumberTip: 'You have downloaded {num} manga on this site using nHentai Helper.',
      import: 'Import',
      export: 'Export',
      clear: 'Clear',
      importTip: 'Tip: Import will not clear the existing history, but merges with it.',
    },
  },
  dialog: {
    yes: 'YES',
    no: 'NO',
    action: {
      getInfo: 'getting information',
      download: 'downloading',
    },
    downloadAgainConfirm: ({ named }: MessageContext) =>
      `<i>${named('title')}</i> is already downloaded${
        named('hasQueue') ? ' or in queue' : ''
      }.<br>Do you want to download again?`,
    errorRetryConfirm: (ctx: MessageContext) =>
      `Error occurred while ${getActionText(ctx)}, retry?`,
    errorRetryTip: (ctx: MessageContext) =>
      `Error occurred while ${getActionText(ctx)}, retrying...`,
    downloadedTip: '<i>{title}</i> is already downloaded or in queue.',
    getMediaUrlTemplateFailed:
      'Fail to get image download url. Please set "@:{\'setting.customDownloadUrl\'}" manually, or open a github issue to report with current url.',
  },
  button: {
    download: 'Download',
    downloading: 'Downloading',
    compressing: 'Compressing',
    ignore: 'Ignore this',
    unignore: 'Ignore this',
  },
  input: {
    downloadSpecifiedPages: 'Download specified pages (e.g. 1-10,12,14,18-)',
  },
  confirmPopup: {
    title: 'Are you sure?',
    yes: '', // empty will be default text 'Yes'
    no: '', // empty will be default text 'No'
  },
  meta: {
    id: 'ID',
    tag: 'Tags',
    artist: 'Artists',
    language: 'Languages',
    category: 'Categories',
    page: 'Pages',
    upload: 'Upload Date',
  },
};
