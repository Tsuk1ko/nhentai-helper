import type { MessageContext } from '@intlify/core-base';
import { getActionText } from '../utils';
import { ErrorAction } from '@/typings';

export default {
  common: {
    settings: '设置',
    auto: '自动',
    english: '英文',
    japanese: '日文',
    chinese: '中文',
    pretty: '简略',
    filter: '过滤',
    none: '无',
    random: '随机',
    balance: '均衡',
  },
  setting: {
    title: '@:common.settings',
    advanceTitle: '进阶设置',
    helpButton: '帮助',
    asteriskTip: '表示刷新页面才能生效',
    downloadThread: '下载线程数',
    openOnNewTab: '在新选项卡打开',
    compressionFilename: '压缩文件名',
    maxNumber: '最大数量',
    separator: '分隔符',
    compressionLevel: '压缩等级',
    filenameLength: '文件名长度',
    autoCancelDownloadedManga: '自动取消下载过的本子',
    autoRetryWhenErrorOccurs: '发生错误时自动重试',
    autoShowAll: '自动显示全部',
    showIgnoreButton: '显示“忽略”按钮',
    judgeDownloadedMangaByTitle: '用标题判断本子是否下载过',
    customDownloadUrl: '自定义下载地址',
    compressionStreamFiles: '压缩 "streamFiles" 选项',
    seriesMode: '串行模式',
    streamDownload: '流式下载',
    preventConsoleClearing: '阻止控制台清空',
    nHentaiDownloadHost: 'nHentai 下载节点',
    addMetaFile: '添加元数据文件',
    metaFileTitleLanguage: '标题语言',
    history: {
      title: '下载历史',
      downloadedNumberTip: '你在这个站点上已经用 nHentai 助手下载了 {num} 个本子',
      import: '导入',
      export: '导出',
      clear: '清空',
      clearConfirm: '真的吗？',
      clearConfirmYes: '真的',
      clearConfirmNo: '手滑了',
      importTip: '提示：导入会将导入的历史记录与现有历史记录合并，不会清空现有历史记录',
    },
  },
  dialog: {
    yes: '是的',
    no: '算了',
    action: {
      [ErrorAction.GET_INFO]: '获取信息',
      [ErrorAction.DOWNLOAD]: '下载',
    },
    downloadAgainConfirm: ({ named }: MessageContext) =>
      `《${named('title')}》已下载过${named('hasQueue') ? '或在队列中' : ''}，你希望再次下载吗？`,
    errorRetryConfirm: (ctx: MessageContext) => `${getActionText(ctx)}发生错误，是否重试？`,
    errorRetryTip: (ctx: MessageContext) => `${getActionText(ctx)}发生错误，重试中……`,
    downloadedTip: '《{title}》已经下载过或在队列中',
  },
  button: {
    download: '下载',
    downloading: '下载中',
    compressing: '压缩中',
  },
};
