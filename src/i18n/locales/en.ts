import type { MessageContext } from '@intlify/core-base';
import { getActionText } from '../utils';
import { ErrorAction } from '@/typings';

export default {
  common: {
    settings: 'Settings',
    auto: 'Auto',
    english: 'English',
    japanese: 'Japanese',
    pretty: 'Pretty',
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
    history: {
      title: 'Download History',
      downloadedNumberTip: 'You have downloaded {num} manga on this site using nHentai Helper.',
      import: 'Import',
      export: 'Export',
      clear: 'Clear',
      clearConfirm: 'Are you sure?',
      clearConfirmYes: '', // empty will be default text 'Yes'
      clearConfirmNo: '', // empty will be default text 'No'
      importTip: 'Tip: Import will not clear the existing history, but merges with it.',
    },
  },
  dialog: {
    yes: 'YES',
    no: 'NO',
    action: {
      [ErrorAction.GET_INFO]: 'getting information',
      [ErrorAction.DOWNLOAD]: 'downloading',
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
  },
  button: {
    download: 'Download',
    downloading: 'Downloading',
    compressing: 'Compressing',
  },
};
