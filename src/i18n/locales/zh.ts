import type { MessageContext } from '@intlify/core-base';

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
    disabled: '禁用',
    abbr: {
      english: '英',
      japanese: '日',
      chinese: '中',
    },
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
    convertWebpTo: '转换 webp 为',
    convertWebpQuality: '质量',
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
    nHentaiDownloadHostOption: {
      auto: '自动（推荐）',
      random: '随机',
      balance: '均衡',
    },
    addMetaFile: '添加元数据文件',
    metaFileTitleLanguage: '标题语言',
    titleReplacement: '标题替换',
    galleryContextmenuPreview: '右击预览',
    customFilenameFunction: '自定义文件名函数',
    history: {
      title: '下载历史',
      downloadedNumberTip: '你在这个站点上已经用 nHentai 助手下载了 {num} 个本子',
      import: '导入',
      export: '导出',
      clear: '清空',
      importTip: '提示：导入会将导入的历史记录与现有历史记录合并，不会清空现有历史记录',
    },
  },
  dialog: {
    yes: '是的',
    no: '算了',
    action: {
      getInfo: '获取信息',
      download: '下载',
    },
    downloadAgainConfirm: ({ named }: MessageContext) =>
      `《${named('title')}》已下载过${named('hasQueue') ? '或在队列中' : ''}，你希望再次下载吗？`,
    errorRetryConfirm: ({ linked, named }: MessageContext) =>
      `${linked(`message.dialog.action.${named('action')}`)}发生错误，是否重试？`,
    errorRetryTip: ({ linked, named }: MessageContext) =>
      `${linked(`message.dialog.action.${named('action')}`)}发生错误，重试中……`,
    downloadedTip: '《{title}》已经下载过或在队列中',
    getMediaUrlTemplateFailed:
      "获取图片下载地址失败，请手动设置“@:{'setting.customDownloadUrl'}”，或前往 github issue 或脚本页面反馈并附带当前网址",
  },
  button: {
    download: '下载',
    downloading: '下载中',
    compressing: '压缩中',
    ignore: '忽略',
    unignore: '不再忽略',
  },
  input: {
    downloadSpecifiedPages: '下载指定页面（例：-5,7-10,12,14,18-）',
  },
  confirmPopup: {
    title: '真的吗？',
    yes: '真的',
    no: '算了',
  },
  meta: {
    id: 'ID',
    parody: '模仿',
    character: '角色',
    tag: '标签',
    artist: '作者',
    group: '团体',
    language: '语言',
    category: '分类',
    page: '页数',
    upload: '上传时间',
  },
};
