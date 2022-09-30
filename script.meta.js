// ==UserScript==
// @name               nHentai Helper
// @name:zh-CN         nHentai 助手
// @name:zh-TW         nHentai 助手
// @namespace          https://github.com/Tsuk1ko
// @version            3.3.8
// @author             Jindai Kirin
// @description        Download nHentai manga as compression file easily, and add some useful features. Also support some mirror sites.
// @description:zh-CN  为 nHentai 增加压缩打包下载方式以及一些辅助功能，同时还支持一些镜像站
// @description:zh-TW  爲 nHentai 增加壓縮打包下載方式以及一些輔助功能，同時還支援一些鏡像站
// @license            GPL-3.0
// @icon               https://nhentai.net/favicon.ico
// @homepageURL        https://github.com/Tsuk1ko/nhentai-helper
// @supportURL         https://github.com/Tsuk1ko/nhentai-helper/issues
// @include            /^https:\/\/([^/]*\.)?(nya|dog|cat|bug|qq|fox|ee|yy)hentai[0-9]*\./
// @match              https://nhentai.net/*
// @match              https://nhentai.xxx/*
// @match              https://nhentai.to/*
// @match              https://nhentai.website/*
// @require            https://fastly.jsdelivr.net/npm/comlink@4.3.1/dist/umd/comlink.min.js
// @require            https://fastly.jsdelivr.net/npm/eventemitter3@4.0.7/umd/eventemitter3.min.js
// @require            https://fastly.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js
// @require            https://fastly.jsdelivr.net/npm/jquery@3.6.1/dist/jquery.min.js
// @require            https://fastly.jsdelivr.net/npm/jquery-pjax@2.0.1/jquery.pjax.min.js
// @require            https://fastly.jsdelivr.net/npm/localforage@1.10.0/dist/localforage.min.js
// @require            https://fastly.jsdelivr.net/npm/md5@2.3.0/dist/md5.min.js
// @require            https://fastly.jsdelivr.net/npm/noty@3.1.4/lib/noty.min.js
// @require            https://fastly.jsdelivr.net/npm/streamsaver@2.0.6/StreamSaver.min.js
// @require            https://fastly.jsdelivr.net/npm/vue@3.2.38/dist/vue.global.prod.js
// @connect            nhentai.net
// @connect            i.nhentai.net
// @connect            cdn.nhentai.xxx
// @connect            cdn.nload.xyz
// @resource           notyCss         https://fastly.jsdelivr.net/npm/noty@3.1.4/lib/noty.min.css
// @resource           elementPlusJs   https://fastly.jsdelivr.net/npm/element-plus@2.2.16/dist/index.full.min.js
// @resource           elementPlusCss  https://fastly.jsdelivr.net/npm/element-plus@2.2.16/dist/index.css
// @grant              GM_addStyle
// @grant              GM_getResourceText
// @grant              GM_registerMenuCommand
// @grant              unsafeWindow
// @grant              GM_getValue
// @grant              GM_setValue
// @grant              GM_xmlhttpRequest
// @run-at             document-end
// @noframes          
// ==/UserScript==