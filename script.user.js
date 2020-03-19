// ==UserScript==
// @name         nHentai Helper
// @name:zh-CN   nHentai 助手
// @name:zh-TW   nHentai 助手
// @namespace    https://github.com/Tsuk1ko
// @version      2.5.2
// @icon         https://nhentai.net/favicon.ico
// @description        Download nHentai doujin as compression file easily, and add some useful features. Also support NyaHentai.
// @description:zh-CN  为 nHentai 增加压缩打包下载方式以及一些辅助功能，同时支持 NyaHentai
// @description:zh-TW  爲 nHentai 增加壓縮打包下載方式以及一些輔助功能，同時支持 NyaHentai
// @author       Jindai Kirin
// @match        https://nhentai.net/*
// @include      /^https:\/\/[^\/]*nyahentai/
// @connect      nhentai.net
// @connect      i.nhentai.net
// @connect      json2jsonp.com
// @connect      search.pstatic.net
// @license      GPL-3.0
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// @resource     notycss https://cdn.jsdelivr.net/npm/noty@3.1.4/lib/noty.min.css
// @require      https://cdn.jsdelivr.net/npm/jquery@v3.4.1/dist/jquery.min.js
// @require      https://cdn.jsdelivr.net/npm/jszip@3.2.2/dist/jszip.min.js
// @require      https://cdn.jsdelivr.net/npm/file-saver@2.0.2/dist/FileSaver.min.js
// @require      https://cdn.jsdelivr.net/npm/jquery-pjax@2.0.1/jquery.pjax.min.js
// @require      https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js
// @require      https://cdn.jsdelivr.net/npm/noty@3.1.4/lib/noty.min.js
// @run-at       document-end
// @noframes
// @homepageURL  https://github.com/Tsuk1ko/nhentai-helper
// @supportURL   https://github.com/Tsuk1ko/nhentai-helper/issues
// ==/UserScript==

// 防 nhentai console 屏蔽
(function() {
    const isNodeOrElement = typeof Node === 'object' && typeof HTMLElement === 'object' ? o => o instanceof Node || o instanceof HTMLElement : o => o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string';
    const c = unsafeWindow.console;
    c._clear = c.clear;
    c.clear = () => {};
    c._log = c.log;
    c.log = function() {
        const args = Array.from(arguments).filter(value => !isNodeOrElement(value));
        if (args.length) return c._log(...args);
    };
    unsafeWindow.Date = Date;
})();

(function() {
    'use strict';

    Array.prototype.remove = function(index) {
        if (index > -1) return this.splice(index, 1)[0];
    };

    const HISTORY_MAX = 500;

    // 下载线程数
    let THREAD = GM_getValue('thread_num', 8);
    GM_registerMenuCommand('Download Thread', () => {
        let num;
        do {
            num = prompt(`Please input the number of threads you want (1~32)\nCurrnet: ${THREAD}`, THREAD);
            if (num === null) return;
            num = parseInt(num);
        } while (num.toString() == 'NaN' || num < 1 || num > 32);
        THREAD = num;
        GM_setValue('thread_num', num);
    });

    // 在新窗口打开本子
    let OPEN_ON_NEW_TAB = GM_getValue('open_on_new_tab', true);
    GM_registerMenuCommand('Open On New Tab', () => {
        OPEN_ON_NEW_TAB = confirm(`Do you want to open gallery page on a new tab?\nCurrent: ${OPEN_ON_NEW_TAB ? 'Yes' : 'No'}\n\nPlease refresh to take effect after modification.`);
        GM_setValue('open_on_new_tab', OPEN_ON_NEW_TAB);
    });

    // 自定义下载地址
    let CUSTOM_DOWNLOAD_URL = GM_getValue('custom_download_url', '');
    GM_registerMenuCommand('Custom Download URL', () => {
        const input = prompt("WARNING: Please don't set it if you don't know what this does. Set it empty will restore it to default.", CUSTOM_DOWNLOAD_URL);
        if (input === null) return;
        CUSTOM_DOWNLOAD_URL = input.trim();
        GM_setValue('custom_download_url', CUSTOM_DOWNLOAD_URL);
    });
    const getTextFromTemplate = (template, values) => Object.keys(values).reduce((pre, key) => pre.replace(new RegExp(`{{${key}}}`, 'g'), values[key]), template);

    // 自定义压缩文件扩展名
    let CF_EXT = GM_getValue('cf_ext', 'zip');
    GM_registerMenuCommand('Compression File Extension', () => {
        const input = prompt('You can custom the extension of compression file, such as "cbz". Set it empty will restore it to default (zip).', CF_EXT);
        if (input === null) return;
        CF_EXT = input.trim() || 'zip';
        GM_setValue('cf_ext', CF_EXT);
    });

    // 自定义压缩级别
    let C_LEVEL = parseInt(GM_getValue('c_lv', '0')) || 0;
    GM_registerMenuCommand('Compression Level', () => {
        let num;
        do {
            num = prompt('Please input a number (0-9) as compression level.\n0: store (no compression)\n1: lowest (best speed)\n...\n9: highest (best compression)', C_LEVEL);
            if (num === null) return;
            num = parseInt(num.trim());
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

    GM_addStyle(GM_getResourceText('notycss'));
    GM_addStyle('.download-zip:disabled{cursor:wait}.gallery>.download-zip{position:absolute;z-index:1;left:0;top:0;opacity:.8}.gallery:hover>.download-zip{opacity:1}#download-panel::-webkit-scrollbar{width:6px;background-color:rgba(0,0,0,.7)}#download-panel::-webkit-scrollbar-thumb{background-color:rgba(255,255,255,.6)}#download-panel{    overflow-x:hidden;position:fixed;top:20vh;right:0;width:calc(50vw - 620px);max-width:300px;min-width:150px;max-height:60vh;background-color:rgba(0,0,0,.7);z-index:100;font-size:12px;overflow-y:scroll}.download-item{position:relative;white-space:nowrap;padding:2px;overflow:visible}.download-item-cancel{cursor:pointer;position:absolute;top:0;right:-30px;color:#F44336;font-size:20px;line-height:30px;width:30px}.download-item:hover{width:calc(100% - 30px)}.download-item-title{overflow:hidden;text-overflow:ellipsis;text-align:left}.download-item-progress{background-color:rgba(0,0,255,.5);line-height:10px}.download-error .download-item-progress{background-color:rgba(255,0,0,.5)}.download-compressing .download-item-progress{background-color:rgba(0,255,0,.5)}.download-item-progress-text{transform:scale(.8)}#page-container{position:relative}#gp-view-mode-btn{position:absolute;right:0;top:0;margin:0}.btn-noty-green{background-color:#66BB6A!important}.btn-noty-blue{background-color:#42A5F5!important}.btn-noty:hover{filter:brightness(1.15)}.noty_buttons{padding-top:0!important}@media screen and (max-width:768px){#page-container{padding-top:40px}}');

    $('body').append('<div id="download-panel"></div>');

    const notyOption = {
        type: 'error',
        layout: 'bottomRight',
        theme: 'nest',
        timeout: false,
        closeWith: [],
    };

    const EXT = { p: 'png', j: 'jpg', g: 'gif' };
    const getExtension = _t => {
        if (!EXT[_t]) throw new Error(`Unknown type "${_t}"`);
        return EXT[_t];
    };

    // 页面类型
    const pageType = {
        gallery: /^\/g\/[0-9]+\/(\?.*)?$/.test(window.location.pathname),
        galleryPage: /^\/g\/[0-9]+(\/list)?\/[0-9]+\/(\?.*)?$/.test(window.location.pathname),
        list: $('.gallery').length > 0,
    };
    const isNyahentai = /nyahentai/.test(window.location.host);

    // 下载队列
    const queue = [];
    const queueInfo = JSON.parse(sessionStorage.getItem('queueInfo')) || [];
    const downloadHistory = JSON.parse(localStorage.getItem('downloadHistory')) || [];
    const downloadStatus = {
        running: false,
        skip: false,
    };
    const startQueue = async () => {
        if (!downloadStatus.running && queue.length > 0) {
            downloadStatus.running = true;
            do {
                await queue[0]();
                queue.shift();
            } while (queue.length > 0);
            downloadStatus.running = false;
        }
    };

    // 下载面板
    Vue.component('download-item', {
        props: ['item', 'index'],
        computed: {
            width() {
                const { page, done, compressing, compressingPercent } = this.item;
                return compressing ? compressingPercent.toFixed(2) : page && done ? ((100 * done) / page).toFixed(2) : 0;
            },
        },
        watch: {
            'item.error': function(error) {
                if (error) {
                    const n = new Noty({
                        ...notyOption,
                        text: `Error occurred, retry?`,
                        buttons: [
                            Noty.button('SKIP', 'btn btn-noty', () => {
                                n.close();
                                queue.shift();
                                queueInfo.shift();
                                downloadStatus.running = false;
                                startQueue();
                            }),
                            Noty.button('YES', 'btn btn-noty-green btn-noty', () => {
                                n.close();
                                this.item.error = false;
                                downloadStatus.running = false;
                                startQueue();
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
                    downloadStatus.skip = true;
                    queueInfo.shift();
                } else {
                    queue.remove(this.index);
                    const q = queueInfo.remove(this.index);
                    if (q && typeof q.cancel === 'function') q.cancel();
                }
            },
        },
        template: '<div class="download-item" :class="{ \'download-error\': item.error, \'download-compressing\': item.compressing && !item.error }" :title="item.title"><div class="download-item-cancel" @click="cancel"><i class="fa fa-times"></i></div><div class="download-item-title">{{item.title}}</div><div class="download-item-progress" :style="{ width: `${width}%` }"><div class="download-item-progress-text">{{ width }}%</div></div></div>',
    });
    Vue.component('download-list', {
        props: ['list'],
        template: '<div v-if="list && list.length" id="download-panel"><download-item v-for="(item, index) in list" :item="item" :index="index" :key="index" /></div>',
    });
    new Vue({
        el: '#download-panel',
        data: { queueInfo, downloadHistory, downloadStatus },
        watch: {
            queueInfo(val) {
                sessionStorage.setItem('queueInfo', JSON.stringify(val));
            },
            downloadHistory(val) {
                while (val.length > HISTORY_MAX) val.shift();
                localStorage.setItem('downloadHistory', JSON.stringify(val));
            },
        },
        template: '<download-list :list="queueInfo" />',
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
                            console.warn('Network error, retry.');
                            setTimeout(() => {
                                resolve(get(url, responseType, retry--));
                            }, 1000);
                        }
                    },
                    onload: r => resolve(r.response),
                });
            } catch (error) {
                reject(error);
            }
        });
    const proxyGetJSON = url => get(`https://json2jsonp.com/?url=${encodeURIComponent(url)}&callback=cbfunc`, '').then(jsonp => JSON.parse(jsonp.replace(/^cbfunc\((.*)\)$/, '$1')));
    const nhentaiGalleryApi = gid => {
        const url = `https://nhentai.net/api/gallery/${gid}`;
        return isNyahentai ? proxyGetJSON(url) : get(url);
    };
    const getDownloadURL = (mid, filename) => (isNyahentai ? `https://search.pstatic.net/common?type=origin&src=https://i.nyahentai.net/galleries/${mid}/${filename}` : `https://i.nhentai.net/galleries/${mid}/${filename}`);

    // 伪多线程
    const multiThread = (tasks, promiseFunc) => {
        const threads = [];
        let taskIndex = 0;

        const run = threadID =>
            new Promise(async resolve => {
                while (true) {
                    let i = taskIndex++;
                    if (i >= tasks.length) break;
                    await promiseFunc(tasks[i], threadID);
                }
                resolve();
            });

        // 创建线程
        for (let threadID = 0; threadID < THREAD; threadID++) {
            threads.push(run(threadID));
        }
        return Promise.all(threads);
    };

    // 获取本子信息
    const getGallery = async gid => {
        const {
            media_id,
            title: { english, japanese },
            images: { pages },
        } = gid ? await nhentaiGalleryApi(gid) : typeof gallery === 'undefined' ? await nhentaiGalleryApi((gid = /\/g\/([0-9]+)/.exec(window.location.pathname)[1])) : (gid = gallery.id) && gallery;

        const p = [];
        pages.forEach((page, i) => {
            p.push({
                i: i + 1,
                t: getExtension(page.t),
            });
        });

        const info = {
            mid: media_id,
            title: japanese || english,
            pages: p,
        };
        console.log({ gid, ...info });

        return info;
    };

    // 下载本子
    const downloadGallery = async ({ mid, title, pages }, $btn = null, $btnTxt = null, headTxt = false) => {
        const info = queueInfo[0] || {};
        info.done = 0;
        const zip = new JSZip();

        const btnDownloadProgress = () => {
            if ($btnTxt) $btnTxt.html(`${headTxt ? `Download ${CF_EXT.toUpperCase()} ` : ''}${info.done}/${pages.length}`);
        };
        const btnCompressingProgress = (percent = 0) => {
            if ($btnTxt) $btnTxt.html(`${headTxt ? 'Compressing ' : ''}${percent.toFixed()}%`);
        };

        btnDownloadProgress();

        const dlPromise = (page, threadID) => {
            if (info.error || downloadStatus.skip) return;
            const filename = `${page.i}.${page.t}`;
            const url = CUSTOM_DOWNLOAD_URL ? getTextFromTemplate(CUSTOM_DOWNLOAD_URL, { mid: mid, index: page.i, ext: page.t }) : getDownloadURL(mid, filename);
            console.log(`[${threadID}] ${url}`);
            return get(url, 'blob')
                .then(r => {
                    zip.file(filename, r);
                    info.done++;
                    btnDownloadProgress();
                })
                .catch(e => {
                    info.error = true;
                    throw e;
                });
        };

        await multiThread(pages, dlPromise);

        if (downloadStatus.skip) return {};

        info.compressing = true;
        btnCompressingProgress();
        console.log('Start compressing');
        let lastZipFile = '';
        const data = await zip.generateAsync({ type: 'blob', ...getCompressionOptions() }, ({ percent, currentFile }) => {
            if (lastZipFile !== currentFile && currentFile) {
                lastZipFile = currentFile;
                console.log(`${percent.toFixed(2)}%`, currentFile);
            }
            btnCompressingProgress(percent);
            info.compressingPercent = percent;
        });
        console.log('Finished');

        if ($btnTxt) $btnTxt.html(`${headTxt ? `Download ${CF_EXT.toUpperCase()} ` : ''}√`);
        if ($btn) $btn.attr('disabled', false);
        queueInfo.shift();

        return {
            name: `${title}.${CF_EXT}`,
            data,
        };
    };
    const downloadG = async (gid, $btn = null, $btnTxt = null, headTxt = '') => downloadGallery(await getGallery(gid), $btn, $btnTxt, headTxt);

    // 语言过滤
    const langFilter = lang => {
        if (lang == 'none') $('.gallery').removeClass('hidden');
        else {
            $(`.gallery[lang=${lang}]`).removeClass('hidden');
            $(`.gallery:not([lang=${lang}])`).addClass('hidden');
        }
    };

    // 本子浏览模式
    const applyGPViewStyle = gpViewMode => {
        if (gpViewMode) $('body').append(`<style id="gp-view-mode-style">#image-container img{width:auto;max-width:calc(100vw - 20px);max-height:${isNyahentai ? 'calc(100vh - 65px)' : '100vh'}}</style>`);
        else $('#gp-view-mode-style').remove();
    };

    // 功能初始化
    const init = (first = false) => {
        if (!first) {
            $('.pagination a').each(function() {
                const $this = $(this);
                $this.attr('href', $this.attr('href').replace(/(&?)_pjax=[^&]*(&?)/, ''));
            });
            // pjax 后需要初始化页面以加载 lazyload 图片
            if (typeof N !== 'undefined') N.init();
        }

        if (pageType.gallery) {
            // 本子详情页
            $('#info > .buttons').append(`<button class="btn btn-secondary download-zip"><i class="fa fa-download"></i> <span class="download-zip-txt">Download ${CF_EXT.toUpperCase()}</span></button>`);

            const $btn = $('.download-zip');
            const $btnTxt = $('.download-zip-txt');

            let zip, info;

            $btn.click(async () => {
                $btn.attr('disabled', true);
                if (!info) info = await getGallery();

                if (downloadHistory.includes(info.title)) {
                    const abandon = new Promise(resolve => {
                        const n = new Noty({
                            ...notyOption,
                            text: `"${info.title}" is already downloaded.<br>Do you want to download again?`,
                            buttons: [
                                Noty.button('YES', 'btn btn-noty', () => {
                                    n.close();
                                    resolve(false);
                                }),
                                Noty.button('NO', 'btn btn-noty-green btn-noty', () => {
                                    n.close();
                                    resolve(true);
                                }),
                            ],
                        });
                        n.show();
                    });
                    if (await abandon) {
                        $btn.attr('disabled', false);
                        return;
                    }
                }

                try {
                    if (!zip) zip = await downloadGallery(info, $btn, $btnTxt, true);
                    saveAs(zip.data, zip.name);
                    if (!downloadHistory.includes(info.title)) downloadHistory.push(info.title);
                } catch (error) {
                    $btn.attr('disabled', false);
                    $btnTxt.html('Error');
                    console.error(error);
                }
            });
        } else if (pageType.list) {
            // 本子列表页
            $('.gallery').each(function() {
                const $this = $(this);
                $this.prepend('<button class="btn btn-secondary download-zip"><i class="fa fa-download"></i> <span class="download-zip-txt"></span></button>');

                const $a = $this.find('a.cover');
                if (OPEN_ON_NEW_TAB) $a.attr('target', '_blank');
                const gid = /[0-9]+/.exec($a.attr('href'))[0];

                // 用于语言过滤
                let language = '';
                const dataTags = $this.attr('data-tags').split(' ');
                if (dataTags.includes('6346')) language = 'jp';
                else if (dataTags.includes('12227')) language = 'en';
                else if (dataTags.includes('29963')) language = 'zh';
                $this.attr('lang', language);

                const $btn = $this.find('.download-zip');
                const $btnTxt = $this.find('.download-zip-txt');
                const cancel = () => {
                    $btn.attr('disabled', false);
                    $btnTxt.html('');
                };

                $btn.click(async () => {
                    $btn.attr('disabled', true);
                    $btnTxt.html('Wait');
                    const gallery = await getGallery(gid);
                    if (downloadHistory.includes(gallery.title) || queueInfo.some(({ title }) => title == gallery.title)) {
                        const abandon = new Promise(resolve => {
                            const n = new Noty({
                                ...notyOption,
                                text: `"${gallery.title}" is already downloaded or in queue.<br>Do you want to download again?`,
                                buttons: [
                                    Noty.button('YES', 'btn btn-noty', () => {
                                        n.close();
                                        resolve(false);
                                    }),
                                    Noty.button('NO', 'btn btn-noty-green btn-noty', () => {
                                        n.close();
                                        resolve(true);
                                        $btn.attr('disabled', false);
                                        $btnTxt.html('');
                                    }),
                                ],
                            });
                            n.show();
                        });
                        if (await abandon) return;
                    }
                    queueInfo.push({
                        gid,
                        title: gallery.title,
                        page: gallery.pages.length,
                        done: 0,
                        error: false,
                        compressing: false,
                        compressingPercent: 0,
                        cancel,
                    });
                    queue.push(async () => {
                        const { data, name } = await downloadGallery(gallery, $btn, $btnTxt);
                        if (downloadStatus.skip) {
                            downloadStatus.skip = false;
                            cancel();
                            return;
                        }
                        saveAs(data, name);
                        if (!downloadHistory.includes(gallery.title)) downloadHistory.push(gallery.title);
                    });
                    startQueue();
                });
            });

            if (first) {
                // 语言过滤
                $('ul.menu.left').append('<li style="padding:0 10px">Filter: <select id="lang-filter"><option value="none">None</option><option value="zh">Chinese</option><option value="jp">Japanese</option><option value="en">English</option></select></li>');
                $('#lang-filter').change(function() {
                    langFilter(this.value);
                    sessionStorage.setItem('lang-filter', this.value);
                });
                // 左右键翻页
                $(document).keydown(function(event) {
                    switch (event.keyCode) {
                        case 37: // left
                            $('.pagination .previous').click();
                            break;
                        case 39: // right
                            $('.pagination .next').click();
                            break;
                    }
                });
            }

            // 还原记住的语言过滤
            const rememberedLANG = sessionStorage.getItem('lang-filter');
            if (rememberedLANG) {
                $('#lang-filter')[0].value = rememberedLANG;
                langFilter(rememberedLANG);
            }

            // 还原下载队列
            if (first) {
                for (const { gid, title } of queueInfo) {
                    queue.push(async () => {
                        const { data, name } = await downloadG(gid);
                        if (downloadStatus.skip) {
                            downloadStatus.skip = false;
                            return;
                        }
                        saveAs(data, name);
                        if (!downloadHistory.includes(title)) downloadHistory.push(title);
                    });
                }
            }
            startQueue();
        } else if (pageType.galleryPage) {
            // 本子在线阅读
            const gpViewModeText = ['[off]', '[on]'];
            let gpViewMode = GM_getValue('gp_view_mode', 0);
            applyGPViewStyle(gpViewMode);
            $('#page-container').prepend(`<button id="gp-view-mode-btn" class="btn btn-secondary"><i class="fa fa-arrows-v"></i> <span>100% view height</span> <span id="gp-view-mode-switch-text">${gpViewModeText[gpViewMode]}</span></button>`);
            const $gpvmst = $('#gp-view-mode-switch-text');
            $('#gp-view-mode-btn').click(() => {
                gpViewMode = 1 - gpViewMode;
                GM_setValue('gp_view_mode', gpViewMode);
                $gpvmst.html(gpViewModeText[gpViewMode]);
                applyGPViewStyle(gpViewMode);
            });
        }
    };

    $(document).pjax('.pagination a, .sort a', { container: '#content', fragment: '#content', timeout: 10000 });
    $(document).on('pjax:end', () => init());
    init(true);
})();
