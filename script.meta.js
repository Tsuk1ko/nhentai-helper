// ==UserScript==
// @name               nHentai Helper
// @name:zh-CN         nHentai 助手
// @name:zh-TW         nHentai 助手
// @namespace          https://github.com/Tsuk1ko
// @version            3.19.0
// @author             Jindai Kirin
// @description        Download nHentai manga as compression file easily, and add some useful features. Also support some mirror sites.
// @description:zh-CN  为 nHentai 增加压缩打包下载方式以及一些辅助功能，同时还支持一些镜像站
// @description:zh-TW  爲 nHentai 增加壓縮打包下載方式以及一些輔助功能，同時還支援一些鏡像站
// @license            GPL-3.0
// @icon               https://icon.horse/icon/nhentai.net
// @homepageURL        https://github.com/Tsuk1ko/nhentai-helper
// @supportURL         https://github.com/Tsuk1ko/nhentai-helper/issues
// @include            /^https:\/\/([^/]*\.)?(nya|dog|cat|bug|qq|fox|ee|yy)hentai[0-9]*\./
// @match              https://nhentai.net/*
// @match              https://nhentai.xxx/*
// @match              https://nhentai.to/*
// @match              https://nhentai.website/*
// @require            https://unpkg.com/vue@3.5.13/dist/vue.global.prod.js
// @require            data:application/javascript,window.Vue%3DVue%2Cwindow.Date.now%7C%7C(window.Date.now%3D()%3D%3Enew%20Date().getTime())%3B
// @require            https://unpkg.com/element-plus@2.9.1/dist/index.full.min.js
// @require            https://unpkg.com/jquery@3.7.1/dist/jquery.min.js
// @resource           element-plus-css  https://unpkg.com/element-plus@2.9.1/dist/index.css
// @connect            nhentai.net
// @connect            i.nhentai.net
// @connect            i1.nhentai.net
// @connect            i2.nhentai.net
// @connect            i3.nhentai.net
// @connect            i4.nhentai.net
// @connect            i5.nhentai.net
// @connect            i7.nhentai.net
// @connect            *
// @grant              GM_addStyle
// @grant              GM_getResourceText
// @grant              GM_getValue
// @grant              GM_openInTab
// @grant              GM_registerMenuCommand
// @grant              GM_setValue
// @grant              GM_xmlhttpRequest
// @grant              unsafeWindow
// @run-at             document-end
// @noframes
// ==/UserScript==