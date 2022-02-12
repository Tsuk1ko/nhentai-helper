// ==UserScript==
// @name         nHentai Helper
// @name:zh-CN   nHentai 助手
// @name:zh-TW   nHentai 助手
// @namespace    https://github.com/Tsuk1ko
// @version      2.13.4
// @icon         https://nhentai.net/favicon.ico
// @description        Download nHentai doujin as compression file easily, and add some useful features. Also support NyaHentai.
// @description:zh-CN  为 nHentai 增加压缩打包下载方式以及一些辅助功能，同时支持 NyaHentai
// @description:zh-TW  爲 nHentai 增加壓縮打包下載方式以及一些輔助功能，同時支持 NyaHentai
// @author       Jindai Kirin
// @match        https://nhentai.net/*
// @match        https://nhentai.xxx/*
// @include      /^https:\/\/([^\/]*\.)?(nya|dog|cat|bug|qq|fox|ee|yy)hentai[0-9]*\./
// @connect      nhentai.net
// @connect      i.nhentai.net
// @connect      json2jsonp.com
// @connect      i0.mspcdn9.xyz
// @connect      cdn.nhentai.xxx
// @license      GPL-3.0
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// @resource     notycss https://cdn.jsdelivr.net/npm/noty@3.1.4/lib/noty.min.css
// @require      https://cdn.jsdelivr.net/npm/jquery@v3.6.0/dist/jquery.min.js
// @require      https://cdn.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js
// @require      https://cdn.jsdelivr.net/npm/jquery-pjax@2.0.1/jquery.pjax.min.js
// @require      https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js
// @require      https://cdn.jsdelivr.net/npm/noty@3.1.4/lib/noty.min.js
// @require      https://cdn.jsdelivr.net/npm/md5@2.3.0/dist/md5.min.js
// @require      https://cdn.jsdelivr.net/npm/comlink@4.3.1/dist/umd/comlink.min.js
// @require      https://cdn.jsdelivr.net/npm/localforage@1.10.0/dist/localforage.min.js
// @run-at       document-end
// @noframes
// @homepageURL  https://github.com/Tsuk1ko/nhentai-helper
// @supportURL   https://github.com/Tsuk1ko/nhentai-helper/issues
// ==/UserScript==

(async () => {
  'use strict';

  // 防 nhentai console 屏蔽
  if (localStorage.getItem('NHENTAI_HELPER_DEBUG') && typeof unsafeWindow.App !== 'undefined') {
    const isNodeOrElement =
      typeof Node === 'object' && typeof HTMLElement === 'object'
        ? o => o instanceof Node || o instanceof HTMLElement
        : o => o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string';
    const c = unsafeWindow.console;
    c._clear = c.clear;
    c.clear = () => {};
    c._log = c.log;
    c.log = function () {
      const args = Array.from(arguments).filter(value => !isNodeOrElement(value));
      if (args.length) return c._log(...args);
    };
    unsafeWindow.Date = Date;
  }

  Array.prototype.remove = function (index) {
    if (index > -1) return this.splice(index, 1)[0];
  };

  const WORKER_THREAD_NUM = ((navigator && navigator.hardwareConcurrency) || 2) - 1;

  const _log = (...args) => console.log('[nhentai-helper]', ...args);
  const _warn = (...args) => console.warn('[nhentai-helper]', ...args);
  const _error = (...args) => console.error('[nhentai-helper]', ...args);

  class JSZipWorkerPool {
    constructor() {
      this.pool = [];
      this.WORKER_URL = URL.createObjectURL(
        new Blob(
          [
            'importScripts("https://cdn.jsdelivr.net/npm/comlink@4.3.1/dist/umd/comlink.min.js","https://cdn.jsdelivr.net/npm/jszip@3.7.1/dist/jszip.min.js");class JSZipWorker{constructor(){this.zip=new JSZip}file(name,{data:data}){this.zip.file(name,data)}generateAsync(options,onUpdate){return this.zip.generateAsync(options,onUpdate).then(data=>Comlink.transfer({data:data},[data]))}}Comlink.expose(JSZipWorker);',
          ],
          { type: 'text/javascript' }
        )
      );
      for (let id = 0; id < WORKER_THREAD_NUM; id++) {
        this.pool.push({
          id,
          JSZip: null,
          idle: true,
        });
      }
    }
    createWorker() {
      const worker = new Worker(this.WORKER_URL);
      return Comlink.wrap(worker);
    }
    async generateAsync(files, options, onUpdate) {
      const worker = this.pool.find(({ idle }) => idle);
      if (!worker) throw new Error('No avaliable JSZip worker.');
      worker.idle = false;
      if (!worker.JSZip) worker.JSZip = this.createWorker();
      const zip = await new worker.JSZip();
      for (const { name, data } of files) {
        await zip.file(name, Comlink.transfer({ data }, [data]));
      }
      return zip
        .generateAsync(
          options,
          Comlink.proxy(data => onUpdate({ workerId: worker.id, ...data }))
        )
        .then(({ data }) => {
          worker.idle = true;
          return data;
        });
    }
  }

  const jsZipPool = new JSZipWorkerPool();

  class JSZip {
    constructor() {
      this.files = [];
    }
    file(name, data) {
      this.files.push({ name, data });
    }
    generateAsync(options, onUpdate) {
      return jsZipPool.generateAsync(this.files, options, onUpdate);
    }
  }

  // 下载线程数
  let THREAD = GM_getValue('thread_num', 8);
  GM_registerMenuCommand('Download Thread', () => {
    let num;
    do {
      num = prompt('Please input the number of threads you want (1~32):', THREAD);
      if (num === null) return;
      num = Number(num);
    } while (isNaN(num) || num < 1 || num > 32);
    THREAD = num;
    GM_setValue('thread_num', num);
  });

  // 在新窗口打开本子
  let OPEN_ON_NEW_TAB = GM_getValue('open_on_new_tab', true);
  GM_registerMenuCommand('Open On New Tab', () => {
    OPEN_ON_NEW_TAB = confirm(`Do you want to open gallery page on a new tab?
Current: ${OPEN_ON_NEW_TAB ? 'Yes' : 'No'}

Please refresh to take effect after modification.`);
    GM_setValue('open_on_new_tab', OPEN_ON_NEW_TAB);
  });

  // 自定义下载地址
  let CUSTOM_DOWNLOAD_URL = GM_getValue('custom_download_url', '');
  GM_registerMenuCommand('Custom Download URL', () => {
    const input = prompt(
      `WARNING: Please don't set it if you don't know what this does.
Set it empty will restore it to default.

Available placeholders:
{{mid}} - Media ID
{{index}} - Page index, starting from 1
{{ext}} - Image file extension`,
      CUSTOM_DOWNLOAD_URL
    );
    if (input === null) return;
    CUSTOM_DOWNLOAD_URL = input.trim();
    GM_setValue('custom_download_url', CUSTOM_DOWNLOAD_URL);
  });

  // 自定义压缩文件名
  const CF_EXT_OLD = GM_getValue('cf_ext');
  if (CF_EXT_OLD) {
    GM_setValue('cf_name', `{{japanese}}.${CF_EXT_OLD}`);
    GM_deleteValue('cf_ext');
  }
  let CF_NAME = GM_getValue('cf_name', '{{japanese}}.zip');
  GM_registerMenuCommand('Compression Filename', () => {
    const input = prompt(
      `You can custom the naming of downloaded compression file, including the file extension.
Set it empty will restore it to default.

Available placeholders:
{{english}} - English name of doujin
{{japanese}} - Japanese name of doujin
{{pretty}} - English simple title of doujin
{{id}} - Gallery ID
{{pages}} - Number of pages`,
      CF_NAME
    );
    if (input === null) return;
    CF_NAME = input.trim() || '{{japanese}}.zip';
    GM_setValue('cf_name', CF_NAME);
  });

  // 自定义压缩级别
  let C_LEVEL = GM_getValue('c_lv', 0);
  GM_registerMenuCommand('Compression Level', () => {
    let num;
    do {
      num = prompt(
        `Please input a number (0-9) as compression level:
0: store (no compression)
1: lowest (best speed)
...
9: highest (best compression)`,
        C_LEVEL
      );
      if (num === null) return;
      num = Number(num.trim());
    } while (isNaN(num) || num < 0 || num > 9);
    C_LEVEL = num;
    GM_setValue('c_lv', C_LEVEL);
  });
  const getCompressionOptions = () => {
    if (C_LEVEL === 0) return {};
    return {
      compression: 'DEFLATE',
      compressionOptions: { level: C_LEVEL },
    };
  };

  // 文件名补零
  let FILENAME_LENGTH = GM_getValue('filename_length', 0);
  GM_registerMenuCommand('Filename Length', () => {
    let num;
    do {
      num = prompt(
        `Please input the minimum image filename length you want (≥0), zeros will be padded to the start of filename when its length lower than this value:`,
        FILENAME_LENGTH
      );
      if (num === null) return;
      num = Number(num);
    } while (isNaN(num) || num < 0);
    FILENAME_LENGTH = num;
    GM_setValue('filename_length', num);
  });

  GM_addStyle(GM_getResourceText('notycss'));
  GM_addStyle(
    '.download-zip:disabled{cursor:wait}.gallery>.download-zip{position:absolute;z-index:1;left:0;top:0;opacity:.8}.gallery:hover>.download-zip{opacity:1}#download-panel::-webkit-scrollbar{width:6px;background-color:rgba(0,0,0,.7)}#download-panel::-webkit-scrollbar-thumb{background-color:rgba(255,255,255,.6)}#download-panel{overflow-x:hidden;position:fixed;top:20vh;right:0;width:calc(50vw - 620px);max-width:300px;min-width:150px;max-height:60vh;background-color:rgba(0,0,0,.7);z-index:100;font-size:12px;overflow-y:scroll}.download-item{position:relative;white-space:nowrap;padding:2px;overflow:visible}.download-item-cancel{cursor:pointer;position:absolute;top:0;right:-30px;color:#F44336;font-size:20px;line-height:30px;width:30px}.download-item.can-cancel:hover{width:calc(100% - 30px)}.download-item-title{overflow:hidden;text-overflow:ellipsis;text-align:left}.download-item-progress{background-color:rgba(0,0,255,.5);line-height:10px}.download-error .download-item-progress{background-color:rgba(255,0,0,.5)}.download-compressing .download-item-progress{background-color:rgba(0,255,0,.5)}.download-item-progress-text{transform:scale(.8)}#page-container{position:relative}#gp-view-mode-btn{position:absolute;right:0;top:0;margin:0}.btn-noty-green{background-color:#66BB6A!important}.btn-noty-blue{background-color:#42A5F5!important}.btn-noty:hover{filter:brightness(1.15)}.noty_buttons{padding-top:0!important}@media screen and (max-width:768px){#page-container{padding-top:40px}}.pages-input{-webkit-appearance:none;display:inline-block;border-radius:3px;padding:0 0.1em 0 1em;font-size:1em;width:100%;height:40px;border:0;vertical-align:top;margin-top:5px}.gallery.downloaded .caption{color:#999}'
  );

  $('body').append('<div id="download-panel"></div>');

  const getTextFromTemplate = (template, values) =>
    Object.keys(values).reduce((pre, key) => pre.replace(new RegExp(`{{${key}}}`, 'g'), values[key]), template);
  const getDpDlExt = () => {
    const paths = CF_NAME.split('.');
    const ext = paths[paths.length - 1];
    if (typeof ext === 'string') return ext.toUpperCase();
    return 'ZIP';
  };

  const notyOption = {
    type: 'error',
    layout: 'bottomRight',
    theme: 'nest',
    timeout: false,
    closeWith: [],
  };

  const EXT = { p: 'png', j: 'jpg', g: 'gif' };
  const getExtension = ({ t, extension }) => {
    const ext = (t && EXT[t]) || extension;
    if (!ext) throw new Error(`Unknown type "${t}"`);
    return ext;
  };

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  // 页面类型
  const pageType = {
    gallery: /^\/g\/[0-9]+\/(\?.*)?$/.test(window.location.pathname),
    galleryPage: /^\/g\/[0-9]+(\/list)?\/[0-9]+\/(\?.*)?$/.test(window.location.pathname),
    list: $('.gallery').length > 0,
  };
  const isNHentai = window.location.host === 'nhentai.net';
  const isNHentaiX = window.location.host === 'nhentai.xxx';

  // 队列
  class AsyncQueue {
    constructor(thread = 1) {
      this.queue = [];
      this.running = false;
      this.thread = thread;
    }
    get runningThreadNum() {
      return this.queue.filter(({ running }) => running).length;
    }
    push(fn, info) {
      this.queue.push({
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        running: false,
        fn,
        info,
      });
    }
    async start() {
      if (this.thread <= 1) {
        if (this.running || this.queue.length === 0) return;
        this.running = true;
        do {
          await this.queue[0].fn();
          this.queue.shift();
        } while (this.queue.length > 0);
        this.running = false;
      } else {
        const running = this.runningThreadNum;
        if (running >= this.thread || this.queue.length === running) return;
        const idleItems = this.queue.filter(({ running }) => !running);
        for (let i = 0; i < Math.min(idleItems.length, this.thread - running); i++) {
          const item = idleItems[i];
          item.running = true;
          item.fn().then(() => {
            this.queue.remove(this.queue.findIndex(({ id }) => id === item.id));
            this.start();
          });
        }
      }
    }
    skipFromError() {
      this.queue.shift();
      return this.restartFromError();
    }
    restartFromError() {
      this.running = false;
      return this.start();
    }
  }

  // 下载队列
  const dlQueue = new AsyncQueue();
  dlQueue.skip = false;

  // 压缩队列
  const zipQueue = new AsyncQueue(WORKER_THREAD_NUM);

  // 下载历史
  const dlGidStore = await (async () => {
    const store = localforage.createInstance({
      name: 'nhentai_helper',
      storeName: 'dl_history_gid',
    });
    await store.ready();
    return store;
  })().catch(_error);
  const dlTitleStore = await (async () => {
    const store = localforage.createInstance({
      name: 'nhentai_helper',
      storeName: 'dl_history',
    });
    await store.ready();
    let historyNeedToBeMigration;
    try {
      historyNeedToBeMigration = JSON.parse(localStorage.getItem('downloadHistory'));
    } catch (e) {
      _error(e);
    }
    if (Array.isArray(historyNeedToBeMigration)) {
      localStorage.removeItem('downloadHistory');
      historyNeedToBeMigration.forEach(key => {
        if (typeof key !== 'string' || !/[0-9a-z]{32}/.test(key)) return;
        store.setItem(key, true);
      });
    }
    return store;
  })().catch(_error);
  const markAsDownloaded = (gid, title) => {
    dlGidStore && dlGidStore.setItem(String(gid), true);
    dlTitleStore && dlTitleStore.setItem(MD5(title.replace(/\s/g, '')), true).catch(_error);
  };
  const isDownloadedByGid = async gid => {
    try {
      return dlGidStore && (await dlGidStore.getItem(String(gid))) === true;
    } catch (e) {
      _error(e);
    }
    return false;
  };
  const isDownloadedByTitle = async title => {
    if (!dlTitleStore) return false;
    try {
      const md5v2 = MD5(title.replace(/\s/g, ''));
      if ((await dlTitleStore.getItem(md5v2)) === true) return true;
      const md5v1 = MD5(title);
      if ((await dlTitleStore.getItem(md5v1)) === true) {
        dlTitleStore.setItem(md5v2, true);
        dlTitleStore.removeItem(md5v1);
        return true;
      }
    } catch (e) {
      _error(e);
    }
    return false;
  };

  // 对话框
  const downloadAgainConfirm = (title, hasQueue = false) =>
    new Promise(resolve => {
      const n = new Noty({
        ...notyOption,
        text: `"${title}" is already downloaded${hasQueue ? ' or in queue' : ''}.<br>Do you want to download again?`,
        buttons: [
          Noty.button('YES', 'btn btn-noty', () => {
            n.close();
            resolve(true);
          }),
          Noty.button('NO', 'btn btn-noty-green btn-noty', () => {
            n.close();
            resolve(false);
          }),
        ],
      });
      n.show();
    });

  // 下载面板
  Vue.component('download-item', {
    props: ['item', 'index'],
    computed: {
      width() {
        const { page, done, compressing, compressingPercent } = this.item;
        return compressing ? compressingPercent.toFixed(2) : page && done ? ((100 * done) / page).toFixed(2) : 0;
      },
      canCancel() {
        return !this.item.compressing;
      },
    },
    watch: {
      'item.error': function (error) {
        if (error && !this.item.compressing) {
          const n = new Noty({
            ...notyOption,
            text: 'Error occurred while downloading, retry?',
            buttons: [
              Noty.button('SKIP', 'btn btn-noty', () => {
                n.close();
                dlQueue.skipFromError();
              }),
              Noty.button('YES', 'btn btn-noty-green btn-noty', () => {
                n.close();
                this.item.error = false;
                dlQueue.restartFromError();
              }),
            ],
          });
          n.show();
        }
      },
    },
    methods: {
      cancel() {
        if (this.index === 0) {
          dlQueue.skip = true;
        } else {
          const { info } = dlQueue.queue.remove(this.index);
          if (info && typeof info.cancel === 'function') info.cancel();
        }
      },
    },
    template:
      '<div class="download-item" :class="{ \'download-error\': item.error, \'download-compressing\': item.compressing && !item.error, \'can-cancel\': canCancel }" :title="item.title"><div class="download-item-cancel" v-if="canCancel" @click="cancel"><i class="fa fa-times"></i></div><div class="download-item-title">{{item.title}}</div><div class="download-item-progress" :style="{ width: `${width}%` }"><div class="download-item-progress-text">{{ width }}%</div></div></div>',
  });
  Vue.component('download-list', {
    props: ['zipList', 'dlList'],
    template:
      '<div id="download-panel"><download-item v-for="(item, index) in zipList" :item="item" :index="index" :key="index" /><download-item v-for="(item, index) in dlList" :item="item" :index="index" :key="index" /></div>',
  });
  new Vue({
    el: '#download-panel',
    // TODO: 两个都改造
    data: {
      dlQueue: dlQueue.queue,
      zipQueue: zipQueue.queue,
    },
    computed: {
      zipList() {
        return this.zipQueue.map(({ info }) => info);
      },
      dlList() {
        return this.dlQueue.map(({ info }) => info);
      },
      infoList() {
        return [...this.zipList, ...this.dlList];
      },
    },
    created() {
      window.addEventListener('beforeunload', event => {
        if (!this.infoList.length) return;
        event.preventDefault();
        event.returnValue = '';
      });
    },
    watch: {
      infoList(val) {
        sessionStorage.setItem('queueInfos', JSON.stringify(val));
      },
    },
    template: '<download-list v-if="infoList.length" :zipList="zipList" :dlList="dlList" />',
  });

  // 网络请求
  const get = (url, responseType = 'json', retry = 3) =>
    new Promise((resolve, reject) => {
      try {
        GM_xmlhttpRequest({
          method: 'GET',
          url,
          responseType,
          onerror: e => {
            if (retry === 0) reject(e);
            else {
              _warn('Network error, retry.');
              setTimeout(() => {
                resolve(get(url, responseType, retry - 1));
              }, 1000);
            }
          },
          onload: ({ status, response }) => {
            if (status === 200) resolve(response);
            else if (retry === 0) reject(new Error(`${status} ${url}`));
            else {
              _warn(status, url);
              setTimeout(() => {
                resolve(get(url, responseType, retry - 1));
              }, 500);
            }
          },
        });
      } catch (error) {
        reject(error);
      }
    });
  const proxyGetJSON = url =>
    get(`https://json2jsonp.com/?url=${encodeURIComponent(url)}&callback=cbfunc`, '').then(jsonp =>
      JSON.parse(jsonp.replace(/^cbfunc\((.*)\)$/, '$1'))
    );
  const nhentaiGalleryApi = gid => {
    const url = `https://nhentai.net/api/gallery/${gid}`;
    return isNHentai ? get(url) : proxyGetJSON(url);
  };
  const getDownloadURL = isNHentai //
    ? (mid, filename) => `https://i.nhentai.net/galleries/${mid}/${filename}`
    : isNHentaiX
    ? (mid, filename) => `https://cdn.nhentai.xxx/g/${mid}/${filename}`
    : (mid, filename) => `https://i0.mspcdn9.xyz/galleries/${mid}/${filename}`;

  // 伪多线程
  const multiThread = async (tasks, promiseFunc) => {
    const threads = [];
    let taskIndex = 0;

    const run = async threadID => {
      while (true) {
        const i = taskIndex++;
        if (i >= tasks.length) break;
        await promiseFunc(tasks[i], threadID);
      }
    };

    // 创建线程
    for (let threadID = 0; threadID < THREAD; threadID++) {
      await sleep(Math.min(2000 / THREAD, 300));
      threads.push(run(threadID));
    }
    return Promise.all(threads);
  };

  // 获取本子信息
  const getGallery = async gid => {
    const gallery = unsafeWindow.gallery;
    const {
      id,
      media_id,
      title: { english, japanese, pretty },
      images: { pages },
      num_pages,
    } = gid
      ? await nhentaiGalleryApi(gid)
      : typeof gallery === 'undefined'
      ? await nhentaiGalleryApi((gid = /\/g\/([0-9]+)/.exec(window.location.pathname)[1]))
      : (gid = gallery.id) && gallery;

    const p = [];
    pages.forEach((page, i) => {
      p.push({
        i: i + 1,
        t: getExtension(page),
      });
    });

    const info = {
      gid,
      mid: media_id,
      title: japanese || english,
      pages: p,
      cfName: getTextFromTemplate(CF_NAME, {
        english,
        japanese: japanese || english,
        pretty,
        id,
        pages: num_pages,
      }),
    };
    _log(info);

    return info;
  };

  // 下载本子
  const downloadGallery = async ({ mid, pages, cfName }, $btn = null, $btnTxt = null, headTxt = false, rangeChecks) => {
    if (rangeChecks && rangeChecks.length) {
      pages = pages.filter(({ i }) => rangeChecks.some(check => check(i)));
    }

    const info = (dlQueue.queue[0] && dlQueue.queue[0].info) || {};
    info.done = 0;
    const zip = await new JSZip();

    const btnDownloadProgress = () => {
      if ($btnTxt) $btnTxt.text(`${headTxt ? `Download ${getDpDlExt()} ` : ''}${info.done}/${pages.length}`);
    };
    const btnCompressingProgress = (percent = 0) => {
      if ($btnTxt) $btnTxt.text(`${headTxt ? 'Compressing ' : ''}${percent.toFixed()}%`);
    };

    btnDownloadProgress();

    const dlPromise = (page, threadID) => {
      if (info.error || dlQueue.skip) return;
      const url = CUSTOM_DOWNLOAD_URL
        ? getTextFromTemplate(CUSTOM_DOWNLOAD_URL, {
            mid,
            index: page.i,
            ext: page.t,
          })
        : getDownloadURL(mid, `${page.i}.${page.t}`);
      _log(`[${threadID}] ${url}`);
      return get(url, 'arraybuffer')
        .then(async data => {
          zip.file(`${String(page.i).padStart(FILENAME_LENGTH, 0)}.${page.t}`, data);
          info.done++;
          btnDownloadProgress();
        })
        .catch(e => {
          info.error = true;
          throw e;
        });
    };

    await multiThread(pages, dlPromise);

    if (dlQueue.skip) {
      dlQueue.skip = false;
      if ($btnTxt) $btnTxt.text(`${headTxt ? `Download ${getDpDlExt()} ` : ''}`);
      if ($btn) $btn.attr('disabled', false);
      return {
        zipFn: async () => ({}),
        zipInfo: null,
      };
    }

    return {
      zipFn: async () => {
        info.compressing = true;
        btnCompressingProgress();
        _log('Start compressing', cfName);
        let lastZipFile = '';
        const data = await zip.generateAsync(
          {
            type: 'arraybuffer',
            ...getCompressionOptions(),
          },
          ({ workerId, percent, currentFile }) => {
            if (lastZipFile !== currentFile && currentFile) {
              lastZipFile = currentFile;
              _log(`[${workerId}] Compressing ${percent.toFixed(2)}%`, currentFile);
            }
            btnCompressingProgress(percent);
            info.compressingPercent = percent;
          }
        );
        _log('Done');

        if ($btnTxt) $btnTxt.text(`${headTxt ? `Download ${getDpDlExt()} ` : ''}✓`);
        if ($btn) $btn.attr('disabled', false);

        return new File([data], cfName, { type: 'application/zip' });
      },
      zipInfo: info,
    };
  };
  const downloadG = async (gid, $btn = null, $btnTxt = null, headTxt = '') =>
    downloadGallery(await getGallery(gid), $btn, $btnTxt, headTxt);

  // 语言过滤
  const langFilter = (lang, $node) => {
    const getNode = $node ? selector => $node.find(selector) : selector => $(selector);
    if (Number(lang) === 0) getNode('.gallery').removeClass('hidden');
    else {
      getNode(`.gallery[data-tags~=${lang}]`).removeClass('hidden');
      getNode(`.gallery:not([data-tags~=${lang}])`).addClass('hidden');
    }
  };

  // 本子浏览模式
  const applyGPViewStyle = gpViewMode => {
    if (gpViewMode)
      $('body').append(
        `<style id="gp-view-mode-style">#image-container img{width:auto;max-width:calc(100vw - 20px);max-height:${
          isNHentaiX ? '100vh' : 'calc(100vh - 65px)'
        }}</style>`
      );
    else $('#gp-view-mode-style').remove();
  };

  // 功能初始化
  const init = () => {
    if (pageType.gallery) {
      // 本子详情页
      const $btnTxt = $(`<span class="download-zip-txt">Download ${getDpDlExt()}</span>`);
      const $btn = $('<button class="btn btn-secondary download-zip"><i class="fa fa-download"></i> </button>').append(
        $btnTxt
      );
      const $pagesInput = $('<input class="pages-input" placeholder="Download pages (e.g. 1-10,12,14,18-)">');
      $('#info > .buttons').append($btn).after($pagesInput);

      let zip, pagesInput, info;

      $btn.on('click', async () => {
        const rangeChecks = $pagesInput
          .val()
          .split(',')
          .filter(range => parseInt(range))
          .map(range => {
            const [start, end] = range.split('-').map(num => parseInt(num));
            if (typeof end === 'undefined') return page => page === start;
            else if (Number.isNaN(end)) return page => page >= start;
            else return page => start <= page && page <= end;
          });

        $btn.attr('disabled', true);

        try {
          if (!info) info = await getGallery();

          const downloaded = (await isDownloadedByGid(info.gid)) || (await isDownloadedByTitle(info.title));

          if (downloaded && !(await downloadAgainConfirm(info.title))) {
            $btn.attr('disabled', false);
            return;
          }

          if (!zip || pagesInput !== $pagesInput.val()) {
            zip = await (await downloadGallery(info, $btn, $btnTxt, true, rangeChecks)).zipFn();
            pagesInput = $pagesInput.val();
          }
          if (!zip) return;
          saveAs(zip);
          markAsDownloaded(info.gid, info.title);
        } catch (error) {
          $btn.attr('disabled', false);
          $btnTxt.text('Error');
          _error(error);
        }
      });
    } else if (pageType.list) {
      // 语言过滤
      const $langFilter = $(
        '<select id="lang-filter"><option value="0">None</option><option value="29963">Chinese</option><option value="6346">Japanese</option><option value="12227">English</option></select>'
      );
      $('ul.menu.left').append($('<li style="padding:0 10px;user-select:none">Filter: </li>').append($langFilter));
      $langFilter.on('change', function () {
        langFilter(this.value);
        sessionStorage.setItem('lang-filter', this.value);
      });

      // 本子列表页
      $('.gallery').each(handleGallery);
      new MutationObserver(mutations => {
        mutations.forEach(({ addedNodes }) => {
          addedNodes.forEach(node => {
            const $node = $(node);
            $node.find('.gallery').each(handleGallery);
            (val => val && langFilter(val, $node))($langFilter.val());
          });
        });
      }).observe($('#content')[0], { childList: true });

      function handleGallery() {
        const $gallery = $(this);

        const $a = $gallery.find('a.cover');
        if (OPEN_ON_NEW_TAB) $a.attr('target', '_blank');
        const gid = /[0-9]+/.exec($a.attr('href'))[0];

        const $btnTxt = $('<span class="download-zip-txt"></span>');
        const $btn = $(
          '<button class="btn btn-secondary download-zip"><i class="fa fa-download"></i> </button>'
        ).append($btnTxt);
        $gallery.prepend($btn);

        const cancel = () => {
          $btn.attr('disabled', false);
          $btnTxt.text('');
        };
        const markGalleryDownloaded = () => {
          $gallery.addClass('downloaded');
        };

        isDownloadedByGid(gid).then(downloaded => downloaded && markGalleryDownloaded());

        $btn.on('click', () => {
          let skipDownloadedCheck = false;
          (async function startDownload() {
            $btn.attr('disabled', true);
            $btnTxt.text('Wait');
            if (!skipDownloadedCheck && (await isDownloadedByGid(gid))) {
              const continueDownload = await downloadAgainConfirm($gallery.find('.caption').text());
              if (!continueDownload) {
                cancel();
                return;
              }
              skipDownloadedCheck = true;
            }
            let gallery;
            try {
              gallery = await getGallery(gid);
            } catch (e) {
              _error(e);
              $btn.attr('disabled', false);
              $btnTxt.text('Error');
              const n = new Noty({
                ...notyOption,
                text: 'Error occurred while getting information, retry?',
                buttons: [
                  Noty.button('No', 'btn btn-noty', () => {
                    n.close();
                  }),
                  Noty.button('YES', 'btn btn-noty-green btn-noty', () => {
                    n.close();
                    startDownload();
                  }),
                ],
              });
              n.show();
            }
            if (
              !skipDownloadedCheck &&
              ((await isDownloadedByTitle(gallery.title)) ||
                dlQueue.queue.some(({ info: { title } }) => title === gallery.title))
            ) {
              const continueDownload = await downloadAgainConfirm(gallery.title);
              if (!continueDownload) {
                cancel();
                return;
              }
            }
            dlQueue.push(
              async () => {
                const { zipFn, zipInfo } = await downloadGallery(gallery, $btn, $btnTxt);
                if (zipInfo) {
                  zipQueue.push(async () => {
                    const zip = await zipFn();
                    if (!zip) {
                      cancel();
                      return;
                    }
                    saveAs(zip);
                    markAsDownloaded(gid, gallery.title);
                    markGalleryDownloaded();
                  }, zipInfo);
                  zipQueue.start();
                }
              },
              {
                gid,
                title: gallery.title,
                page: gallery.pages.length,
                done: 0,
                error: false,
                compressing: false,
                compressingPercent: 0,
                cancel,
              }
            );
            dlQueue.start();
          })();
        });
      }

      // 左右键翻页
      $(document).on('keydown', event => {
        switch (event.key) {
          case 'ArrowLeft':
            $('.pagination .previous').trigger('click');
            break;
          case 'ArrowRight':
            $('.pagination .next').trigger('click');
            break;
        }
      });

      // 还原记住的语言过滤
      const rememberedLANG = sessionStorage.getItem('lang-filter');
      if (rememberedLANG) {
        $langFilter.val(rememberedLANG);
        langFilter(rememberedLANG);
      }

      // 还原下载队列
      const dlQueueInfos = JSON.parse(sessionStorage.getItem('queueInfos'));
      if (dlQueueInfos) {
        for (const info of dlQueueInfos) {
          const { gid, title } = info;
          dlQueue.push(async () => {
            const { zipFn, zipInfo } = await downloadG(gid);
            if (zipInfo) {
              zipQueue.push(async () => {
                const zip = await zipFn();
                if (!zip) return;
                saveAs(zip);
                markAsDownloaded(gid, title);
              }, zipInfo);
              zipQueue.start();
            }
          }, info);
        }
      }
      dlQueue.start();
    } else if (pageType.galleryPage && !isNHentai) {
      // 本子在线阅读
      const gpViewModeText = ['[off]', '[on]'];
      let gpViewMode = GM_getValue('gp_view_mode', 0);
      applyGPViewStyle(gpViewMode);
      $('#page-container').prepend(
        `<button id="gp-view-mode-btn" class="btn btn-secondary"><i class="fa fa-arrows-v"></i> <span>100% view height</span> <span id="gp-view-mode-switch-text">${gpViewModeText[gpViewMode]}</span></button>`
      );
      const $gpvmst = $('#gp-view-mode-switch-text');
      $('#gp-view-mode-btn').on('click', () => {
        gpViewMode = 1 - gpViewMode;
        GM_setValue('gp_view_mode', gpViewMode);
        $gpvmst.text(gpViewModeText[gpViewMode]);
        applyGPViewStyle(gpViewMode);
      });
    }
  };

  $(document).pjax('.pagination a, .sort a', {
    container: '#content',
    fragment: '#content',
    timeout: 10000,
  });
  $(document).on('pjax:end', () => {
    // 防止翻页出现 pjax 参数
    $('.pagination a').each(function () {
      const $this = $(this);
      const href = $this.attr('href');
      const isRelative = href.startsWith('/');
      const url = new URL(isRelative ? `${location.protocol}//${location.host}${href}` : href);
      url.searchParams.delete('_pjax');
      $this.attr('href', isRelative ? `${url.pathname}${url.search}` : url.href);
    });
    // 加载 lazyload 图片
    const { App } = unsafeWindow;
    if (typeof App !== 'undefined') App.prototype.install_lazy_loader();
  });
  init();
})();
