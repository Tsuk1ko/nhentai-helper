// ==UserScript==
// @name         nHentai Helper
// @name:zh-CN   nHentai 助手
// @name:zh-TW   nHentai 助手
// @namespace    https://github.com/Tsuk1ko
// @version      2.19.0
// @icon         https://nhentai.net/favicon.ico
// @description        Download nHentai manga as compression file easily, and add some useful features. Also support NyaHentai.
// @description:zh-CN  为 nHentai 增加压缩打包下载方式以及一些辅助功能，同时支持 NyaHentai
// @description:zh-TW  爲 nHentai 增加壓縮打包下載方式以及一些輔助功能，同時支持 NyaHentai
// @author       Jindai Kirin
// @match        https://nhentai.net/*
// @match        https://nhentai.xxx/*
// @match        https://nhentai.to/*
// @match        https://nhentai.website/*
// @include      /^https:\/\/([^\/]*\.)?(nya|dog|cat|bug|qq|fox|ee|yy)hentai[0-9]*\./
// @connect      nhentai.net
// @connect      i.nhentai.net
// @connect      json2jsonp.com
// @connect      i0.mspcdn9.xyz
// @connect      cdn.nhentai.xxx
// @connect      t.dogehls.xyz
// @license      GPL-3.0
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// @resource     notycss https://fastly.jsdelivr.net/npm/noty@3.1.4/lib/noty.min.css
// @require      https://fastly.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js
// @require      https://fastly.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js
// @require      https://fastly.jsdelivr.net/npm/jquery-pjax@2.0.1/jquery.pjax.min.js
// @require      https://fastly.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js
// @require      https://fastly.jsdelivr.net/npm/noty@3.1.4/lib/noty.min.js
// @require      https://fastly.jsdelivr.net/npm/md5@2.3.0/dist/md5.min.js
// @require      https://fastly.jsdelivr.net/npm/comlink@4.3.1/dist/umd/comlink.min.js
// @require      https://fastly.jsdelivr.net/npm/localforage@1.10.0/dist/localforage.min.js
// @run-at       document-end
// @noframes
// @homepageURL  https://github.com/Tsuk1ko/nhentai-helper
// @supportURL   https://github.com/Tsuk1ko/nhentai-helper/issues
// @downloadURL  https://tsuk1ko.github.io/nhentai-helper/script.user.js
// ==/UserScript==

// Since v3.0.0 the script URL has been changed to https://tsuk1ko.github.io/nhentai-helper/script.user.js. Please manually reinstall.
// 从 v3.0.0 开始脚本地址变更为 https://tsuk1ko.github.io/nhentai-helper/script.user.js，请手动覆盖重装。
