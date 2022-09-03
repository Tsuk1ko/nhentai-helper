// ==UserScript==
// @name               nHentai Helper
// @name:zh-CN         nHentai 助手
// @name:zh-TW         nHentai 助手
// @namespace          https://github.com/Tsuk1ko
// @version            3.3.6
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
// @require            https://fastly.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js
// @require            https://fastly.jsdelivr.net/npm/jquery-pjax@2.0.1/jquery.pjax.min.js
// @require            https://fastly.jsdelivr.net/npm/localforage@1.10.0/dist/localforage.min.js
// @require            https://fastly.jsdelivr.net/npm/md5@2.3.0/dist/md5.min.js
// @require            https://fastly.jsdelivr.net/npm/noty@3.1.4/lib/noty.min.js
// @require            https://fastly.jsdelivr.net/npm/streamsaver@2.0.6/StreamSaver.min.js
// @require            https://fastly.jsdelivr.net/npm/vue@3.2.37/dist/vue.global.prod.js
// @connect            nhentai.net
// @connect            i.nhentai.net
// @connect            cdn.nhentai.xxx
// @connect            cdn.nload.xyz
// @resource           notycss https://fastly.jsdelivr.net/npm/noty@3.1.4/lib/noty.min.css
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

// use vite-plugin-monkey@2.3.0 at 2022-09-03T13:17:34.464Z

;(({ css = "" }) => {
  const style = document.createElement("style");
  style.innerText = css;
  style.dataset.source = "vite-plugin-monkey";
  document.head.appendChild(style);
})({
  "css": "@charset \"UTF-8\";.nhentai-helper-btn:disabled{cursor:wait}.gallery>.nhentai-helper-btn{position:absolute;top:0;min-width:42px;opacity:.8}.gallery:hover>.nhentai-helper-btn{opacity:1}.gallery .download-zip-btn{left:0}.gallery .ignore-btn{right:0}#page-container{position:relative}@media screen and (max-width: 768px){#page-container{padding-top:40px}}#online-view-mode-btn{position:absolute;right:0;top:0;margin:0}.btn-noty-green{background-color:#66bb6a!important}.btn-noty-blue{background-color:#42a5f5!important}.btn-noty:hover{filter:brightness(1.15)}.noty_buttons{padding-top:0!important}.pages-input{-webkit-appearance:none;display:inline-block;border-radius:3px;padding:0 .1em 0 1em;font-size:1em;width:100%;height:40px;border:0;vertical-align:top;margin-top:5px}.gallery.downloaded .caption{color:#999}.download-item[data-v-5e3261cd]{position:relative;white-space:nowrap;padding:2px;overflow:visible}.download-item--can-cancel[data-v-5e3261cd]:hover{width:calc(100% - 30px)}.download-item__cancel[data-v-5e3261cd]{cursor:pointer;position:absolute;top:0;right:-30px;color:#f44336;font-size:20px;line-height:30px;width:30px}.download-item__title[data-v-5e3261cd]{overflow:hidden;text-overflow:ellipsis;text-align:left}.download-item__progress[data-v-5e3261cd]{background-color:#0000ff80;line-height:10px}.download-item--error .download-item__progress[data-v-5e3261cd]{background-color:#ff000080}.download-item--compressing .download-item__progress[data-v-5e3261cd]{background-color:#00ff0080}.download-item__progress-text[data-v-5e3261cd]{transform:scale(.8)}#download-panel[data-v-658acab9]{overflow-x:hidden;position:fixed;top:20vh;right:0;width:calc(50vw - 620px);max-width:300px;min-width:150px;max-height:60vh;background-color:#000000b3;z-index:100;font-size:12px;overflow-y:scroll}#download-panel[data-v-658acab9]::-webkit-scrollbar{width:6px;background-color:#000000b3}#download-panel[data-v-658acab9]::-webkit-scrollbar-thumb{background-color:#fff9}:root{--el-color-white:#ffffff;--el-color-black:#000000;--el-color-primary-rgb:64,158,255;--el-color-success-rgb:103,194,58;--el-color-warning-rgb:230,162,60;--el-color-danger-rgb:245,108,108;--el-color-error-rgb:245,108,108;--el-color-info-rgb:144,147,153;--el-font-size-extra-large:20px;--el-font-size-large:18px;--el-font-size-medium:16px;--el-font-size-base:14px;--el-font-size-small:13px;--el-font-size-extra-small:12px;--el-font-family:\"Helvetica Neue\",Helvetica,\"PingFang SC\",\"Hiragino Sans GB\",\"Microsoft YaHei\",\"\\5fae\\8f6f\\96c5\\9ed1\",Arial,sans-serif;--el-font-weight-primary:500;--el-font-line-height-primary:24px;--el-index-normal:1;--el-index-top:1000;--el-index-popper:2000;--el-border-radius-base:4px;--el-border-radius-small:2px;--el-border-radius-round:20px;--el-border-radius-circle:100%;--el-transition-duration:.3s;--el-transition-duration-fast:.2s;--el-transition-function-ease-in-out-bezier:cubic-bezier(.645, .045, .355, 1);--el-transition-function-fast-bezier:cubic-bezier(.23, 1, .32, 1);--el-transition-all:all var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);--el-transition-fade:opacity var(--el-transition-duration) var(--el-transition-function-fast-bezier);--el-transition-md-fade:transform var(--el-transition-duration) var(--el-transition-function-fast-bezier),opacity var(--el-transition-duration) var(--el-transition-function-fast-bezier);--el-transition-fade-linear:opacity var(--el-transition-duration-fast) linear;--el-transition-border:border-color var(--el-transition-duration-fast) var(--el-transition-function-ease-in-out-bezier);--el-transition-box-shadow:box-shadow var(--el-transition-duration-fast) var(--el-transition-function-ease-in-out-bezier);--el-transition-color:color var(--el-transition-duration-fast) var(--el-transition-function-ease-in-out-bezier);--el-component-size-large:40px;--el-component-size:32px;--el-component-size-small:24px}:root{color-scheme:light;--el-color-white:#ffffff;--el-color-black:#000000;--el-color-primary:#409eff;--el-color-primary-light-3:#79bbff;--el-color-primary-light-5:#a0cfff;--el-color-primary-light-7:#c6e2ff;--el-color-primary-light-8:#d9ecff;--el-color-primary-light-9:#ecf5ff;--el-color-primary-dark-2:#337ecc;--el-color-success:#67c23a;--el-color-success-light-3:#95d475;--el-color-success-light-5:#b3e19d;--el-color-success-light-7:#d1edc4;--el-color-success-light-8:#e1f3d8;--el-color-success-light-9:#f0f9eb;--el-color-success-dark-2:#529b2e;--el-color-warning:#e6a23c;--el-color-warning-light-3:#eebe77;--el-color-warning-light-5:#f3d19e;--el-color-warning-light-7:#f8e3c5;--el-color-warning-light-8:#faecd8;--el-color-warning-light-9:#fdf6ec;--el-color-warning-dark-2:#b88230;--el-color-danger:#f56c6c;--el-color-danger-light-3:#f89898;--el-color-danger-light-5:#fab6b6;--el-color-danger-light-7:#fcd3d3;--el-color-danger-light-8:#fde2e2;--el-color-danger-light-9:#fef0f0;--el-color-danger-dark-2:#c45656;--el-color-error:#f56c6c;--el-color-error-light-3:#f89898;--el-color-error-light-5:#fab6b6;--el-color-error-light-7:#fcd3d3;--el-color-error-light-8:#fde2e2;--el-color-error-light-9:#fef0f0;--el-color-error-dark-2:#c45656;--el-color-info:#909399;--el-color-info-light-3:#b1b3b8;--el-color-info-light-5:#c8c9cc;--el-color-info-light-7:#dedfe0;--el-color-info-light-8:#e9e9eb;--el-color-info-light-9:#f4f4f5;--el-color-info-dark-2:#73767a;--el-bg-color:#ffffff;--el-bg-color-page:#f2f3f5;--el-bg-color-overlay:#ffffff;--el-text-color-primary:#303133;--el-text-color-regular:#606266;--el-text-color-secondary:#909399;--el-text-color-placeholder:#a8abb2;--el-text-color-disabled:#c0c4cc;--el-border-color:#dcdfe6;--el-border-color-light:#e4e7ed;--el-border-color-lighter:#ebeef5;--el-border-color-extra-light:#f2f6fc;--el-border-color-dark:#d4d7de;--el-border-color-darker:#cdd0d6;--el-fill-color:#f0f2f5;--el-fill-color-light:#f5f7fa;--el-fill-color-lighter:#fafafa;--el-fill-color-extra-light:#fafcff;--el-fill-color-dark:#ebedf0;--el-fill-color-darker:#e6e8eb;--el-fill-color-blank:#ffffff;--el-box-shadow:0px 12px 32px 4px rgba(0, 0, 0, .04),0px 8px 20px rgba(0, 0, 0, .08);--el-box-shadow-light:0px 0px 12px rgba(0, 0, 0, .12);--el-box-shadow-lighter:0px 0px 6px rgba(0, 0, 0, .12);--el-box-shadow-dark:0px 16px 48px 16px rgba(0, 0, 0, .08),0px 12px 32px rgba(0, 0, 0, .12),0px 8px 16px -8px rgba(0, 0, 0, .16);--el-disabled-bg-color:var(--el-fill-color-light);--el-disabled-text-color:var(--el-text-color-placeholder);--el-disabled-border-color:var(--el-border-color-light);--el-overlay-color:rgba(0, 0, 0, .8);--el-overlay-color-light:rgba(0, 0, 0, .7);--el-overlay-color-lighter:rgba(0, 0, 0, .5);--el-mask-color:rgba(255, 255, 255, .9);--el-mask-color-extra-light:rgba(255, 255, 255, .3);--el-border-width:1px;--el-border-style:solid;--el-border-color-hover:var(--el-text-color-disabled);--el-border:var(--el-border-width) var(--el-border-style) var(--el-border-color);--el-svg-monochrome-grey:var(--el-border-color)}.fade-in-linear-enter-active,.fade-in-linear-leave-active{transition:var(--el-transition-fade-linear)}.fade-in-linear-enter-from,.fade-in-linear-leave-to{opacity:0}.el-fade-in-linear-enter-active,.el-fade-in-linear-leave-active{transition:var(--el-transition-fade-linear)}.el-fade-in-linear-enter-from,.el-fade-in-linear-leave-to{opacity:0}.el-fade-in-enter-active,.el-fade-in-leave-active{transition:all var(--el-transition-duration) cubic-bezier(.55,0,.1,1)}.el-fade-in-enter-from,.el-fade-in-leave-active{opacity:0}.el-zoom-in-center-enter-active,.el-zoom-in-center-leave-active{transition:all var(--el-transition-duration) cubic-bezier(.55,0,.1,1)}.el-zoom-in-center-enter-from,.el-zoom-in-center-leave-active{opacity:0;transform:scaleX(0)}.el-zoom-in-top-enter-active,.el-zoom-in-top-leave-active{opacity:1;transform:scaleY(1);transition:var(--el-transition-md-fade);transform-origin:center top}.el-zoom-in-top-enter-active[data-popper-placement^=top],.el-zoom-in-top-leave-active[data-popper-placement^=top]{transform-origin:center bottom}.el-zoom-in-top-enter-from,.el-zoom-in-top-leave-active{opacity:0;transform:scaleY(0)}.el-zoom-in-bottom-enter-active,.el-zoom-in-bottom-leave-active{opacity:1;transform:scaleY(1);transition:var(--el-transition-md-fade);transform-origin:center bottom}.el-zoom-in-bottom-enter-from,.el-zoom-in-bottom-leave-active{opacity:0;transform:scaleY(0)}.el-zoom-in-left-enter-active,.el-zoom-in-left-leave-active{opacity:1;transform:scale(1);transition:var(--el-transition-md-fade);transform-origin:top left}.el-zoom-in-left-enter-from,.el-zoom-in-left-leave-active{opacity:0;transform:scale(.45)}.collapse-transition{transition:var(--el-transition-duration) height ease-in-out,var(--el-transition-duration) padding-top ease-in-out,var(--el-transition-duration) padding-bottom ease-in-out}.el-collapse-transition-enter-active,.el-collapse-transition-leave-active{transition:var(--el-transition-duration) max-height ease-in-out,var(--el-transition-duration) padding-top ease-in-out,var(--el-transition-duration) padding-bottom ease-in-out}.horizontal-collapse-transition{transition:var(--el-transition-duration) width ease-in-out,var(--el-transition-duration) padding-left ease-in-out,var(--el-transition-duration) padding-right ease-in-out}.el-list-enter-active,.el-list-leave-active{transition:all 1s}.el-list-enter-from,.el-list-leave-to{opacity:0;transform:translateY(-30px)}.el-list-leave-active{position:absolute!important}.el-opacity-transition{transition:opacity var(--el-transition-duration) cubic-bezier(.55,0,.1,1)}.el-icon-loading{-webkit-animation:rotating 2s linear infinite;animation:rotating 2s linear infinite}.el-icon--right{margin-left:5px}.el-icon--left{margin-right:5px}@-webkit-keyframes rotating{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes rotating{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.el-icon{--color:inherit;height:1em;width:1em;line-height:1em;display:inline-flex;justify-content:center;align-items:center;position:relative;fill:currentColor;color:var(--color);font-size:inherit}.el-icon.is-loading{-webkit-animation:rotating 2s linear infinite;animation:rotating 2s linear infinite}.el-icon svg{height:1em;width:1em}:root{--el-popup-modal-bg-color:var(--el-color-black);--el-popup-modal-opacity:.5}.v-modal-enter{-webkit-animation:v-modal-in var(--el-transition-duration-fast) ease;animation:v-modal-in var(--el-transition-duration-fast) ease}.v-modal-leave{-webkit-animation:v-modal-out var(--el-transition-duration-fast) ease forwards;animation:v-modal-out var(--el-transition-duration-fast) ease forwards}@-webkit-keyframes v-modal-in{0%{opacity:0}}@keyframes v-modal-in{0%{opacity:0}}@-webkit-keyframes v-modal-out{to{opacity:0}}@keyframes v-modal-out{to{opacity:0}}.v-modal{position:fixed;left:0;top:0;width:100%;height:100%;opacity:var(--el-popup-modal-opacity);background:var(--el-popup-modal-bg-color)}.el-popup-parent--hidden{overflow:hidden}.el-dialog{--el-dialog-width:50%;--el-dialog-margin-top:15vh;--el-dialog-bg-color:var(--el-bg-color);--el-dialog-box-shadow:var(--el-box-shadow);--el-dialog-title-font-size:var(--el-font-size-large);--el-dialog-content-font-size:14px;--el-dialog-font-line-height:var(--el-font-line-height-primary);--el-dialog-padding-primary:20px;--el-dialog-border-radius:var(--el-border-radius-small);position:relative;margin:var(--el-dialog-margin-top,15vh) auto 50px;background:var(--el-dialog-bg-color);border-radius:var(--el-dialog-border-radius);box-shadow:var(--el-dialog-box-shadow);box-sizing:border-box;width:var(--el-dialog-width,50%)}.el-dialog:focus{outline:0!important}.el-dialog.is-fullscreen{--el-dialog-width:100%;--el-dialog-margin-top:0;margin-bottom:0;height:100%;overflow:auto}.el-dialog__wrapper{position:fixed;inset:0;overflow:auto;margin:0}.el-dialog.is-draggable .el-dialog__header{cursor:move;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.el-dialog__header{padding:var(--el-dialog-padding-primary);padding-bottom:10px;margin-right:16px;word-break:break-all}.el-dialog__headerbtn{position:absolute;top:6px;right:0;padding:0;width:54px;height:54px;background:0 0;border:none;outline:0;cursor:pointer;font-size:var(--el-message-close-size,16px)}.el-dialog__headerbtn .el-dialog__close{color:var(--el-color-info);font-size:inherit}.el-dialog__headerbtn:focus .el-dialog__close,.el-dialog__headerbtn:hover .el-dialog__close{color:var(--el-color-primary)}.el-dialog__title{line-height:var(--el-dialog-font-line-height);font-size:var(--el-dialog-title-font-size);color:var(--el-text-color-primary)}.el-dialog__body{padding:calc(var(--el-dialog-padding-primary) + 10px) var(--el-dialog-padding-primary);color:var(--el-text-color-regular);font-size:var(--el-dialog-content-font-size);word-break:break-all}.el-dialog__footer{padding:var(--el-dialog-padding-primary);padding-top:10px;text-align:right;box-sizing:border-box}.el-dialog--center{text-align:center}.el-dialog--center .el-dialog__body{text-align:initial;padding:25px calc(var(--el-dialog-padding-primary) + 5px) 30px}.el-dialog--center .el-dialog__footer{text-align:inherit}.el-overlay-dialog{position:fixed;inset:0;overflow:auto}.dialog-fade-enter-active{-webkit-animation:modal-fade-in var(--el-transition-duration);animation:modal-fade-in var(--el-transition-duration)}.dialog-fade-enter-active .el-overlay-dialog{-webkit-animation:dialog-fade-in var(--el-transition-duration);animation:dialog-fade-in var(--el-transition-duration)}.dialog-fade-leave-active{-webkit-animation:modal-fade-out var(--el-transition-duration);animation:modal-fade-out var(--el-transition-duration)}.dialog-fade-leave-active .el-overlay-dialog{-webkit-animation:dialog-fade-out var(--el-transition-duration);animation:dialog-fade-out var(--el-transition-duration)}@-webkit-keyframes dialog-fade-in{0%{transform:translate3d(0,-20px,0);opacity:0}to{transform:translateZ(0);opacity:1}}@keyframes dialog-fade-in{0%{transform:translate3d(0,-20px,0);opacity:0}to{transform:translateZ(0);opacity:1}}@-webkit-keyframes dialog-fade-out{0%{transform:translateZ(0);opacity:1}to{transform:translate3d(0,-20px,0);opacity:0}}@keyframes dialog-fade-out{0%{transform:translateZ(0);opacity:1}to{transform:translate3d(0,-20px,0);opacity:0}}@-webkit-keyframes modal-fade-in{0%{opacity:0}to{opacity:1}}@keyframes modal-fade-in{0%{opacity:0}to{opacity:1}}@-webkit-keyframes modal-fade-out{0%{opacity:1}to{opacity:0}}@keyframes modal-fade-out{0%{opacity:1}to{opacity:0}}.el-overlay{position:fixed;inset:0;z-index:2000;height:100%;background-color:var(--el-overlay-color-lighter);overflow:auto}.el-overlay .el-overlay-root{height:0}.el-popconfirm__main{display:flex;align-items:center}.el-popconfirm__icon{margin-right:5px}.el-popconfirm__action{text-align:right;margin-top:8px}.el-popover{--el-popover-bg-color:var(--el-bg-color-overlay);--el-popover-font-size:var(--el-font-size-base);--el-popover-border-color:var(--el-border-color-lighter);--el-popover-padding:12px;--el-popover-padding-large:18px 20px;--el-popover-title-font-size:16px;--el-popover-title-text-color:var(--el-text-color-primary);--el-popover-border-radius:4px}.el-popover.el-popper{background:var(--el-popover-bg-color);min-width:150px;border-radius:var(--el-popover-border-radius);border:1px solid var(--el-popover-border-color);padding:var(--el-popover-padding);z-index:var(--el-index-popper);color:var(--el-text-color-regular);line-height:1.4;text-align:justify;font-size:var(--el-popover-font-size);box-shadow:var(--el-box-shadow-light);word-break:break-all;box-sizing:border-box}.el-popover.el-popper--plain{padding:var(--el-popover-padding-large)}.el-popover__title{color:var(--el-popover-title-text-color);font-size:var(--el-popover-title-font-size);line-height:1;margin-bottom:12px}.el-popover__reference:focus:hover,.el-popover__reference:focus:not(.focusing){outline-width:0}.el-popover.el-popper:focus,.el-popover.el-popper:focus:active{outline-width:0}.el-popper{--el-popper-border-radius:var(--el-popover-border-radius, 4px)}.el-popper{position:absolute;border-radius:var(--el-popper-border-radius);padding:5px 11px;z-index:2000;font-size:12px;line-height:20px;min-width:10px;word-wrap:break-word;visibility:visible}.el-popper.is-dark{color:var(--el-bg-color);background:var(--el-text-color-primary);border:1px solid var(--el-text-color-primary)}.el-popper.is-dark .el-popper__arrow:before{border:1px solid var(--el-text-color-primary);background:var(--el-text-color-primary);right:0}.el-popper.is-light{background:var(--el-bg-color-overlay);border:1px solid var(--el-border-color-light)}.el-popper.is-light .el-popper__arrow:before{border:1px solid var(--el-border-color-light);background:var(--el-bg-color-overlay);right:0}.el-popper.is-pure{padding:0}.el-popper__arrow{position:absolute;width:10px;height:10px;z-index:-1}.el-popper__arrow:before{position:absolute;width:10px;height:10px;z-index:-1;content:\" \";transform:rotate(45deg);background:var(--el-text-color-primary);box-sizing:border-box}.el-popper[data-popper-placement^=top]>.el-popper__arrow{bottom:-5px}.el-popper[data-popper-placement^=top]>.el-popper__arrow:before{border-bottom-right-radius:2px}.el-popper[data-popper-placement^=bottom]>.el-popper__arrow{top:-5px}.el-popper[data-popper-placement^=bottom]>.el-popper__arrow:before{border-top-left-radius:2px}.el-popper[data-popper-placement^=left]>.el-popper__arrow{right:-5px}.el-popper[data-popper-placement^=left]>.el-popper__arrow:before{border-top-right-radius:2px}.el-popper[data-popper-placement^=right]>.el-popper__arrow{left:-5px}.el-popper[data-popper-placement^=right]>.el-popper__arrow:before{border-bottom-left-radius:2px}.el-popper[data-popper-placement^=top] .el-popper__arrow:before{border-top-color:transparent!important;border-left-color:transparent!important}.el-popper[data-popper-placement^=bottom] .el-popper__arrow:before{border-bottom-color:transparent!important;border-right-color:transparent!important}.el-popper[data-popper-placement^=left] .el-popper__arrow:before{border-left-color:transparent!important;border-bottom-color:transparent!important}.el-popper[data-popper-placement^=right] .el-popper__arrow:before{border-right-color:transparent!important;border-top-color:transparent!important}.el-form{--el-form-label-font-size:var(--el-font-size-base)}.el-form--label-left .el-form-item__label{justify-content:flex-start}.el-form--label-top .el-form-item{display:block}.el-form--label-top .el-form-item .el-form-item__label{display:block;height:auto;text-align:left;margin-bottom:8px;line-height:22px}.el-form--inline .el-form-item{display:inline-flex;vertical-align:middle;margin-right:32px}.el-form--inline.el-form--label-top{display:flex;flex-wrap:wrap}.el-form--inline.el-form--label-top .el-form-item{display:block}.el-form--large.el-form--label-top .el-form-item .el-form-item__label{margin-bottom:12px;line-height:22px}.el-form--default.el-form--label-top .el-form-item .el-form-item__label{margin-bottom:8px;line-height:22px}.el-form--small.el-form--label-top .el-form-item .el-form-item__label{margin-bottom:4px;line-height:20px}.el-form-item{display:flex;--font-size:14px;margin-bottom:18px}.el-form-item .el-form-item{margin-bottom:0}.el-form-item .el-input__validateIcon{display:none}.el-form-item--large{--font-size:14px;--el-form-label-font-size:var(--font-size);margin-bottom:22px}.el-form-item--large .el-form-item__label{height:40px;line-height:40px}.el-form-item--large .el-form-item__content{line-height:40px}.el-form-item--large .el-form-item__error{padding-top:4px}.el-form-item--default{--font-size:14px;--el-form-label-font-size:var(--font-size);margin-bottom:18px}.el-form-item--default .el-form-item__label{height:32px;line-height:32px}.el-form-item--default .el-form-item__content{line-height:32px}.el-form-item--default .el-form-item__error{padding-top:2px}.el-form-item--small{--font-size:12px;--el-form-label-font-size:var(--font-size);margin-bottom:18px}.el-form-item--small .el-form-item__label{height:24px;line-height:24px}.el-form-item--small .el-form-item__content{line-height:24px}.el-form-item--small .el-form-item__error{padding-top:2px}.el-form-item__label-wrap{display:flex}.el-form-item__label{display:inline-flex;justify-content:flex-end;align-items:flex-start;flex:0 0 auto;font-size:var(--el-form-label-font-size);color:var(--el-text-color-regular);height:32px;line-height:32px;padding:0 12px 0 0;box-sizing:border-box}.el-form-item__content{display:flex;flex-wrap:wrap;align-items:center;flex:1;line-height:32px;position:relative;font-size:var(--font-size);min-width:0}.el-form-item__content .el-input-group{vertical-align:top}.el-form-item__error{color:var(--el-color-danger);font-size:12px;line-height:1;padding-top:2px;position:absolute;top:100%;left:0}.el-form-item__error--inline{position:relative;top:auto;left:auto;display:inline-block;margin-left:10px}.el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label-wrap>.el-form-item__label:before,.el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{content:\"*\";color:var(--el-color-danger);margin-right:4px}.el-form-item.is-error .el-select-v2__wrapper,.el-form-item.is-error .el-select-v2__wrapper:focus,.el-form-item.is-error .el-textarea__inner,.el-form-item.is-error .el-textarea__inner:focus{box-shadow:0 0 0 1px var(--el-color-danger) inset}.el-form-item.is-error .el-input__wrapper{box-shadow:0 0 0 1px var(--el-color-danger) inset}.el-form-item.is-error .el-input-group__append .el-input__wrapper,.el-form-item.is-error .el-input-group__prepend .el-input__wrapper{box-shadow:0 0 0 1px transparent inset}.el-form-item.is-error .el-input__validateIcon{color:var(--el-color-danger)}.el-form-item--feedback .el-input__validateIcon{display:inline-flex}.el-divider{position:relative}.el-divider--horizontal{display:block;height:1px;width:100%;margin:24px 0;border-top:1px var(--el-border-color) var(--el-border-style)}.el-divider--vertical{display:inline-block;width:1px;height:1em;margin:0 8px;vertical-align:middle;position:relative;border-left:1px var(--el-border-color) var(--el-border-style)}.el-divider__text{position:absolute;background-color:var(--el-bg-color);padding:0 20px;font-weight:500;color:var(--el-text-color-primary);font-size:14px}.el-divider__text.is-left{left:20px;transform:translateY(-50%)}.el-divider__text.is-center{left:50%;transform:translate(-50%) translateY(-50%)}.el-divider__text.is-right{right:20px;transform:translateY(-50%)}.el-checkbox{--el-checkbox-font-size:14px;--el-checkbox-font-weight:var(--el-font-weight-primary);--el-checkbox-text-color:var(--el-text-color-regular);--el-checkbox-input-height:14px;--el-checkbox-input-width:14px;--el-checkbox-border-radius:var(--el-border-radius-small);--el-checkbox-bg-color:var(--el-fill-color-blank);--el-checkbox-input-border:var(--el-border);--el-checkbox-disabled-border-color:var(--el-border-color);--el-checkbox-disabled-input-fill:var(--el-fill-color-light);--el-checkbox-disabled-icon-color:var(--el-text-color-placeholder);--el-checkbox-disabled-checked-input-fill:var(--el-border-color-extra-light);--el-checkbox-disabled-checked-input-border-color:var(--el-border-color);--el-checkbox-disabled-checked-icon-color:var(--el-text-color-placeholder);--el-checkbox-checked-text-color:var(--el-color-primary);--el-checkbox-checked-input-border-color:var(--el-color-primary);--el-checkbox-checked-bg-color:var(--el-color-primary);--el-checkbox-checked-icon-color:var(--el-color-white);--el-checkbox-input-border-color-hover:var(--el-color-primary)}.el-checkbox{color:var(--el-checkbox-text-color);font-weight:var(--el-checkbox-font-weight);font-size:var(--el-font-size-base);position:relative;cursor:pointer;display:inline-flex;align-items:center;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;margin-right:30px;height:32px}.el-checkbox.is-bordered{padding:0 15px 0 9px;border-radius:var(--el-border-radius-base);border:var(--el-border);box-sizing:border-box}.el-checkbox.is-bordered.is-checked{border-color:var(--el-color-primary)}.el-checkbox.is-bordered.is-disabled{border-color:var(--el-border-color-lighter);cursor:not-allowed}.el-checkbox.is-bordered.el-checkbox--large{padding:0 19px 0 11px;border-radius:var(--el-border-radius-base)}.el-checkbox.is-bordered.el-checkbox--large .el-checkbox__label{font-size:var(--el-font-size-base)}.el-checkbox.is-bordered.el-checkbox--large .el-checkbox__inner{height:14px;width:14px}.el-checkbox.is-bordered.el-checkbox--small{padding:0 11px 0 7px;border-radius:calc(var(--el-border-radius-base) - 1px)}.el-checkbox.is-bordered.el-checkbox--small .el-checkbox__label{font-size:12px}.el-checkbox.is-bordered.el-checkbox--small .el-checkbox__inner{height:12px;width:12px}.el-checkbox.is-bordered.el-checkbox--small .el-checkbox__inner:after{height:6px;width:2px}.el-checkbox input:focus-visible+.el-checkbox__inner{outline:2px solid var(--el-checkbox-input-border-color-hover);outline-offset:1px;border-radius:var(--el-checkbox-border-radius)}.el-checkbox__input{white-space:nowrap;cursor:pointer;outline:0;display:inline-flex;position:relative}.el-checkbox__input.is-disabled .el-checkbox__inner{background-color:var(--el-checkbox-disabled-input-fill);border-color:var(--el-checkbox-disabled-border-color);cursor:not-allowed}.el-checkbox__input.is-disabled .el-checkbox__inner:after{cursor:not-allowed;border-color:var(--el-checkbox-disabled-icon-color)}.el-checkbox__input.is-disabled .el-checkbox__inner+.el-checkbox__label{cursor:not-allowed}.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner{background-color:var(--el-checkbox-disabled-checked-input-fill);border-color:var(--el-checkbox-disabled-checked-input-border-color)}.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner:after{border-color:var(--el-checkbox-disabled-checked-icon-color)}.el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner{background-color:var(--el-checkbox-disabled-checked-input-fill);border-color:var(--el-checkbox-disabled-checked-input-border-color)}.el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner:before{background-color:var(--el-checkbox-disabled-checked-icon-color);border-color:var(--el-checkbox-disabled-checked-icon-color)}.el-checkbox__input.is-disabled+span.el-checkbox__label{color:var(--el-disabled-text-color);cursor:not-allowed}.el-checkbox__input.is-checked .el-checkbox__inner{background-color:var(--el-checkbox-checked-bg-color);border-color:var(--el-checkbox-checked-input-border-color)}.el-checkbox__input.is-checked .el-checkbox__inner:after{transform:rotate(45deg) scaleY(1)}.el-checkbox__input.is-checked+.el-checkbox__label{color:var(--el-checkbox-checked-text-color)}.el-checkbox__input.is-focus:not(.is-checked) .el-checkbox__original:not(:focus-visible){border-color:var(--el-checkbox-input-border-color-hover)}.el-checkbox__input.is-indeterminate .el-checkbox__inner{background-color:var(--el-checkbox-checked-bg-color);border-color:var(--el-checkbox-checked-input-border-color)}.el-checkbox__input.is-indeterminate .el-checkbox__inner:before{content:\"\";position:absolute;display:block;background-color:var(--el-checkbox-checked-icon-color);height:2px;transform:scale(.5);left:0;right:0;top:5px}.el-checkbox__input.is-indeterminate .el-checkbox__inner:after{display:none}.el-checkbox__inner{display:inline-block;position:relative;border:var(--el-checkbox-input-border);border-radius:var(--el-checkbox-border-radius);box-sizing:border-box;width:var(--el-checkbox-input-width);height:var(--el-checkbox-input-height);background-color:var(--el-checkbox-bg-color);z-index:var(--el-index-normal);transition:border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46),outline .25s cubic-bezier(.71,-.46,.29,1.46)}.el-checkbox__inner:hover{border-color:var(--el-checkbox-input-border-color-hover)}.el-checkbox__inner:after{box-sizing:content-box;content:\"\";border:1px solid var(--el-checkbox-checked-icon-color);border-left:0;border-top:0;height:7px;left:4px;position:absolute;top:1px;transform:rotate(45deg) scaleY(0);width:3px;transition:transform .15s ease-in 50ms;transform-origin:center}.el-checkbox__original{opacity:0;outline:0;position:absolute;margin:0;width:0;height:0;z-index:-1}.el-checkbox__label{display:inline-block;padding-left:8px;line-height:1;font-size:var(--el-checkbox-font-size)}.el-checkbox.el-checkbox--large{height:40px}.el-checkbox.el-checkbox--large .el-checkbox__label{font-size:14px}.el-checkbox.el-checkbox--large .el-checkbox__inner{width:14px;height:14px}.el-checkbox.el-checkbox--small{height:24px}.el-checkbox.el-checkbox--small .el-checkbox__label{font-size:12px}.el-checkbox.el-checkbox--small .el-checkbox__inner{width:12px;height:12px}.el-checkbox.el-checkbox--small .el-checkbox__input.is-indeterminate .el-checkbox__inner:before{top:4px}.el-checkbox.el-checkbox--small .el-checkbox__inner:after{width:2px;height:6px}.el-checkbox:last-of-type{margin-right:0}.el-input-number{position:relative;display:inline-block;width:150px;line-height:30px}.el-input-number .el-input__wrapper{padding-left:42px;padding-right:42px}.el-input-number .el-input__inner{-webkit-appearance:none;-moz-appearance:textfield;text-align:center;line-height:1}.el-input-number .el-input__inner::-webkit-inner-spin-button,.el-input-number .el-input__inner::-webkit-outer-spin-button{margin:0;-webkit-appearance:none}.el-input-number__decrease,.el-input-number__increase{display:flex;justify-content:center;align-items:center;height:auto;position:absolute;z-index:1;top:1px;bottom:1px;width:32px;background:var(--el-fill-color-light);color:var(--el-text-color-regular);cursor:pointer;font-size:13px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.el-input-number__decrease:hover,.el-input-number__increase:hover{color:var(--el-color-primary)}.el-input-number__decrease:hover~.el-input:not(.is-disabled) .el-input_wrapper,.el-input-number__increase:hover~.el-input:not(.is-disabled) .el-input_wrapper{box-shadow:0 0 0 1px var(--el-input-focus-border-color,var(--el-color-primary)) inset}.el-input-number__decrease.is-disabled,.el-input-number__increase.is-disabled{color:var(--el-disabled-text-color);cursor:not-allowed}.el-input-number__increase{right:1px;border-radius:0 var(--el-border-radius-base) var(--el-border-radius-base) 0;border-left:var(--el-border)}.el-input-number__decrease{left:1px;border-radius:var(--el-border-radius-base) 0 0 var(--el-border-radius-base);border-right:var(--el-border)}.el-input-number.is-disabled .el-input-number__decrease,.el-input-number.is-disabled .el-input-number__increase{border-color:var(--el-disabled-border-color);color:var(--el-disabled-border-color)}.el-input-number.is-disabled .el-input-number__decrease:hover,.el-input-number.is-disabled .el-input-number__increase:hover{color:var(--el-disabled-border-color);cursor:not-allowed}.el-input-number--large{width:180px;line-height:38px}.el-input-number--large .el-input-number__decrease,.el-input-number--large .el-input-number__increase{width:40px;font-size:14px}.el-input-number--large .el-input__wrapper{padding-left:47px;padding-right:47px}.el-input-number--small{width:120px;line-height:22px}.el-input-number--small .el-input-number__decrease,.el-input-number--small .el-input-number__increase{width:24px;font-size:12px}.el-input-number--small .el-input__wrapper{padding-left:31px;padding-right:31px}.el-input-number--small .el-input-number__decrease [class*=el-icon],.el-input-number--small .el-input-number__increase [class*=el-icon]{transform:scale(.9)}.el-input-number.is-without-controls .el-input__wrapper{padding-left:15px;padding-right:15px}.el-input-number.is-controls-right .el-input__wrapper{padding-left:15px;padding-right:42px}.el-input-number.is-controls-right .el-input-number__decrease,.el-input-number.is-controls-right .el-input-number__increase{--el-input-number-controls-height:15px;height:var(--el-input-number-controls-height);line-height:var(--el-input-number-controls-height)}.el-input-number.is-controls-right .el-input-number__decrease [class*=el-icon],.el-input-number.is-controls-right .el-input-number__increase [class*=el-icon]{transform:scale(.8)}.el-input-number.is-controls-right .el-input-number__increase{bottom:auto;left:auto;border-radius:0 var(--el-border-radius-base) 0 0;border-bottom:var(--el-border)}.el-input-number.is-controls-right .el-input-number__decrease{right:1px;top:auto;left:auto;border-right:none;border-left:var(--el-border);border-radius:0 0 var(--el-border-radius-base) 0}.el-input-number.is-controls-right[class*=large] [class*=decrease],.el-input-number.is-controls-right[class*=large] [class*=increase]{--el-input-number-controls-height:19px}.el-input-number.is-controls-right[class*=small] [class*=decrease],.el-input-number.is-controls-right[class*=small] [class*=increase]{--el-input-number-controls-height:11px}.el-textarea{--el-input-text-color:var(--el-text-color-regular);--el-input-border:var(--el-border);--el-input-hover-border:var(--el-border-color-hover);--el-input-focus-border:var(--el-color-primary);--el-input-transparent-border:0 0 0 1px transparent inset;--el-input-border-color:var(--el-border-color);--el-input-border-radius:var(--el-border-radius-base);--el-input-bg-color:var(--el-fill-color-blank);--el-input-icon-color:var(--el-text-color-placeholder);--el-input-placeholder-color:var(--el-text-color-placeholder);--el-input-hover-border-color:var(--el-border-color-hover);--el-input-clear-hover-color:var(--el-text-color-secondary);--el-input-focus-border-color:var(--el-color-primary)}.el-textarea{position:relative;display:inline-block;width:100%;vertical-align:bottom;font-size:var(--el-font-size-base)}.el-textarea__inner{position:relative;display:block;resize:vertical;padding:5px 11px;line-height:1.5;box-sizing:border-box;width:100%;font-size:inherit;font-family:inherit;color:var(--el-input-text-color,var(--el-text-color-regular));background-color:var(--el-input-bg-color,var(--el-fill-color-blank));background-image:none;-webkit-appearance:none;box-shadow:0 0 0 1px var(--el-input-border-color,var(--el-border-color)) inset;border-radius:var(--el-input-border-radius,var(--el-border-radius-base));transition:var(--el-transition-box-shadow);border:none}.el-textarea__inner::-moz-placeholder{color:var(--el-input-placeholder-color,var(--el-text-color-placeholder))}.el-textarea__inner:-ms-input-placeholder{color:var(--el-input-placeholder-color,var(--el-text-color-placeholder))}.el-textarea__inner::placeholder{color:var(--el-input-placeholder-color,var(--el-text-color-placeholder))}.el-textarea__inner:hover{box-shadow:0 0 0 1px var(--el-input-hover-border-color) inset}.el-textarea__inner:focus{outline:0;box-shadow:0 0 0 1px var(--el-input-focus-border-color) inset}.el-textarea .el-input__count{color:var(--el-color-info);background:var(--el-fill-color-blank);position:absolute;font-size:12px;line-height:14px;bottom:5px;right:10px}.el-textarea.is-disabled .el-textarea__inner{background-color:var(--el-disabled-bg-color);border-color:var(--el-disabled-border-color);color:var(--el-disabled-text-color);cursor:not-allowed}.el-textarea.is-disabled .el-textarea__inner::-moz-placeholder{color:var(--el-text-color-placeholder)}.el-textarea.is-disabled .el-textarea__inner:-ms-input-placeholder{color:var(--el-text-color-placeholder)}.el-textarea.is-disabled .el-textarea__inner::placeholder{color:var(--el-text-color-placeholder)}.el-textarea.is-exceed .el-textarea__inner{border-color:var(--el-color-danger)}.el-textarea.is-exceed .el-input__count{color:var(--el-color-danger)}.el-input{--el-input-text-color:var(--el-text-color-regular);--el-input-border:var(--el-border);--el-input-hover-border:var(--el-border-color-hover);--el-input-focus-border:var(--el-color-primary);--el-input-transparent-border:0 0 0 1px transparent inset;--el-input-border-color:var(--el-border-color);--el-input-border-radius:var(--el-border-radius-base);--el-input-bg-color:var(--el-fill-color-blank);--el-input-icon-color:var(--el-text-color-placeholder);--el-input-placeholder-color:var(--el-text-color-placeholder);--el-input-hover-border-color:var(--el-border-color-hover);--el-input-clear-hover-color:var(--el-text-color-secondary);--el-input-focus-border-color:var(--el-color-primary)}.el-input{--el-input-height:var(--el-component-size);position:relative;font-size:var(--el-font-size-base);display:inline-flex;width:100%;line-height:var(--el-input-height);box-sizing:border-box}.el-input::-webkit-scrollbar{z-index:11;width:6px}.el-input::-webkit-scrollbar:horizontal{height:6px}.el-input::-webkit-scrollbar-thumb{border-radius:5px;width:6px;background:var(--el-text-color-disabled)}.el-input::-webkit-scrollbar-corner{background:var(--el-fill-color-blank)}.el-input::-webkit-scrollbar-track{background:var(--el-fill-color-blank)}.el-input::-webkit-scrollbar-track-piece{background:var(--el-fill-color-blank);width:6px}.el-input .el-input__clear,.el-input .el-input__password{color:var(--el-input-icon-color);font-size:14px;cursor:pointer}.el-input .el-input__clear:hover,.el-input .el-input__password:hover{color:var(--el-input-clear-hover-color)}.el-input .el-input__count{height:100%;display:inline-flex;align-items:center;color:var(--el-color-info);font-size:12px}.el-input .el-input__count .el-input__count-inner{background:var(--el-fill-color-blank);line-height:initial;display:inline-block;padding-left:8px}.el-input__wrapper{display:inline-flex;flex-grow:1;align-items:center;justify-content:center;padding:1px 11px;background-color:var(--el-input-bg-color,var(--el-fill-color-blank));background-image:none;border-radius:var(--el-input-border-radius,var(--el-border-radius-base));transition:var(--el-transition-box-shadow);box-shadow:0 0 0 1px var(--el-input-border-color,var(--el-border-color)) inset}.el-input__wrapper:hover{box-shadow:0 0 0 1px var(--el-input-hover-border-color) inset}.el-input__wrapper.is-focus{box-shadow:0 0 0 1px var(--el-input-focus-border-color) inset}.el-input__inner{--el-input-inner-height:calc(var(--el-input-height, 32px) - 2px);width:100%;flex-grow:1;-webkit-appearance:none;color:var(--el-input-text-color,var(--el-text-color-regular));font-size:inherit;height:var(--el-input-inner-height);line-height:var(--el-input-inner-height);padding:0;outline:0;border:none;background:0 0;box-sizing:border-box}.el-input__inner:focus{outline:0}.el-input__inner::-moz-placeholder{color:var(--el-input-placeholder-color,var(--el-text-color-placeholder))}.el-input__inner:-ms-input-placeholder{color:var(--el-input-placeholder-color,var(--el-text-color-placeholder))}.el-input__inner::placeholder{color:var(--el-input-placeholder-color,var(--el-text-color-placeholder))}.el-input__inner[type=password]::-ms-reveal{display:none}.el-input__prefix{display:inline-flex;white-space:nowrap;flex-shrink:0;flex-wrap:nowrap;height:100%;text-align:center;color:var(--el-input-icon-color,var(--el-text-color-placeholder));transition:all var(--el-transition-duration);pointer-events:none}.el-input__prefix-inner{pointer-events:all;display:inline-flex;align-items:center;justify-content:center}.el-input__prefix-inner>:last-child{margin-right:8px}.el-input__prefix-inner>:first-child,.el-input__prefix-inner>:first-child.el-input__icon{margin-left:0}.el-input__suffix{display:inline-flex;white-space:nowrap;flex-shrink:0;flex-wrap:nowrap;height:100%;text-align:center;color:var(--el-input-icon-color,var(--el-text-color-placeholder));transition:all var(--el-transition-duration);pointer-events:none}.el-input__suffix-inner{pointer-events:all;display:inline-flex;align-items:center;justify-content:center}.el-input__suffix-inner>:first-child{margin-left:8px}.el-input .el-input__icon{height:inherit;line-height:inherit;display:flex;justify-content:center;align-items:center;transition:all var(--el-transition-duration);margin-left:8px}.el-input__validateIcon{pointer-events:none}.el-input.is-active .el-input__wrapper{box-shadow:0 0 0 1px var(--el-input-focus-color,) inset}.el-input.is-disabled{cursor:not-allowed}.el-input.is-disabled .el-input__wrapper{background-color:var(--el-disabled-bg-color);box-shadow:0 0 0 1px var(--el-disabled-border-color) inset}.el-input.is-disabled .el-input__inner{color:var(--el-disabled-text-color);cursor:not-allowed}.el-input.is-disabled .el-input__inner::-moz-placeholder{color:var(--el-text-color-placeholder)}.el-input.is-disabled .el-input__inner:-ms-input-placeholder{color:var(--el-text-color-placeholder)}.el-input.is-disabled .el-input__inner::placeholder{color:var(--el-text-color-placeholder)}.el-input.is-disabled .el-input__icon{cursor:not-allowed}.el-input.is-exceed .el-input__wrapper{box-shadow:0 0 0 1px var(--el-color-danger) inset}.el-input.is-exceed .el-input__suffix .el-input__count{color:var(--el-color-danger)}.el-input--large{--el-input-height:var(--el-component-size-large);font-size:14px}.el-input--large .el-input__wrapper{padding:1px 15px}.el-input--large .el-input__inner{--el-input-inner-height:calc(var(--el-input-height, 40px) - 2px)}.el-input--small{--el-input-height:var(--el-component-size-small);font-size:12px}.el-input--small .el-input__wrapper{padding:1px 7px}.el-input--small .el-input__inner{--el-input-inner-height:calc(var(--el-input-height, 24px) - 2px)}.el-input-group{display:inline-flex;width:100%;align-items:stretch}.el-input-group__append,.el-input-group__prepend{background-color:var(--el-fill-color-light);color:var(--el-color-info);position:relative;display:inline-flex;align-items:center;justify-content:center;min-height:100%;border-radius:var(--el-input-border-radius);padding:0 20px;white-space:nowrap}.el-input-group__append:focus,.el-input-group__prepend:focus{outline:0}.el-input-group__append .el-button,.el-input-group__append .el-select,.el-input-group__prepend .el-button,.el-input-group__prepend .el-select{display:inline-block;margin:0 -20px}.el-input-group__append button.el-button,.el-input-group__append button.el-button:hover,.el-input-group__append div.el-select .el-input__wrapper,.el-input-group__append div.el-select:hover .el-input__wrapper,.el-input-group__prepend button.el-button,.el-input-group__prepend button.el-button:hover,.el-input-group__prepend div.el-select .el-input__wrapper,.el-input-group__prepend div.el-select:hover .el-input__wrapper{border-color:transparent;background-color:transparent;color:inherit}.el-input-group__append .el-button,.el-input-group__append .el-input,.el-input-group__prepend .el-button,.el-input-group__prepend .el-input{font-size:inherit}.el-input-group__prepend{border-right:0;border-top-right-radius:0;border-bottom-right-radius:0;box-shadow:1px 0 0 0 var(--el-input-border-color) inset,0 1px 0 0 var(--el-input-border-color) inset,0 -1px 0 0 var(--el-input-border-color) inset}.el-input-group__append{border-left:0;border-top-left-radius:0;border-bottom-left-radius:0;box-shadow:0 1px 0 0 var(--el-input-border-color) inset,0 -1px 0 0 var(--el-input-border-color) inset,-1px 0 0 0 var(--el-input-border-color) inset}.el-input-group--prepend>.el-input__wrapper{border-top-left-radius:0;border-bottom-left-radius:0}.el-input-group--prepend .el-input-group__prepend .el-select .el-input .el-input__inner{box-shadow:none!important}.el-input-group--prepend .el-input-group__prepend .el-select .el-input .el-input__wrapper{border-top-right-radius:0;border-bottom-right-radius:0;box-shadow:1px 0 0 0 var(--el-input-border-color) inset,0 1px 0 0 var(--el-input-border-color) inset,0 -1px 0 0 var(--el-input-border-color) inset}.el-input-group--prepend .el-input-group__prepend .el-select .el-input.is-focus .el-input__inner{box-shadow:none!important}.el-input-group--prepend .el-input-group__prepend .el-select .el-input.is-focus .el-input__wrapper{box-shadow:1px 0 0 0 var(--el-input-focus-border-color) inset,1px 0 0 0 var(--el-input-focus-border-color),0 1px 0 0 var(--el-input-focus-border-color) inset,0 -1px 0 0 var(--el-input-focus-border-color) inset!important;z-index:2}.el-input-group--prepend .el-input-group__prepend .el-select .el-input.is-focus .el-input__wrapper:focus{outline:0;z-index:2;box-shadow:1px 0 0 0 var(--el-input-focus-border-color) inset,1px 0 0 0 var(--el-input-focus-border-color),0 1px 0 0 var(--el-input-focus-border-color) inset,0 -1px 0 0 var(--el-input-focus-border-color) inset!important}.el-input-group--prepend .el-input-group__prepend .el-select:hover .el-input__inner{box-shadow:none!important}.el-input-group--prepend .el-input-group__prepend .el-select:hover .el-input__wrapper{z-index:1;box-shadow:1px 0 0 0 var(--el-input-hover-border-color) inset,1px 0 0 0 var(--el-input-hover-border-color),0 1px 0 0 var(--el-input-hover-border-color) inset,0 -1px 0 0 var(--el-input-hover-border-color) inset!important}.el-input-group--append>.el-input__wrapper{border-top-right-radius:0;border-bottom-right-radius:0}.el-input-group--append .el-input-group__append .el-select .el-input .el-input__inner{box-shadow:none!important}.el-input-group--append .el-input-group__append .el-select .el-input .el-input__wrapper{border-top-left-radius:0;border-bottom-left-radius:0;box-shadow:0 1px 0 0 var(--el-input-border-color) inset,0 -1px 0 0 var(--el-input-border-color) inset,-1px 0 0 0 var(--el-input-border-color) inset}.el-input-group--append .el-input-group__append .el-select .el-input.is-focus .el-input__inner{box-shadow:none!important}.el-input-group--append .el-input-group__append .el-select .el-input.is-focus .el-input__wrapper{z-index:2;box-shadow:-1px 0 0 0 var(--el-input-focus-border-color),-1px 0 0 0 var(--el-input-focus-border-color) inset,0 1px 0 0 var(--el-input-focus-border-color) inset,0 -1px 0 0 var(--el-input-focus-border-color) inset!important}.el-input-group--append .el-input-group__append .el-select:hover .el-input__inner{box-shadow:none!important}.el-input-group--append .el-input-group__append .el-select:hover .el-input__wrapper{z-index:1;box-shadow:-1px 0 0 0 var(--el-input-hover-border-color),-1px 0 0 0 var(--el-input-hover-border-color) inset,0 1px 0 0 var(--el-input-hover-border-color) inset,0 -1px 0 0 var(--el-input-hover-border-color) inset!important}.el-switch{--el-switch-on-color:var(--el-color-primary);--el-switch-off-color:var(--el-border-color)}.el-switch{display:inline-flex;align-items:center;position:relative;font-size:14px;line-height:20px;height:32px;vertical-align:middle}.el-switch.is-disabled .el-switch__core,.el-switch.is-disabled .el-switch__label{cursor:not-allowed}.el-switch__label{transition:var(--el-transition-duration-fast);height:20px;display:inline-block;font-size:14px;font-weight:500;cursor:pointer;vertical-align:middle;color:var(--el-text-color-primary)}.el-switch__label.is-active{color:var(--el-color-primary)}.el-switch__label--left{margin-right:10px}.el-switch__label--right{margin-left:10px}.el-switch__label *{line-height:1;font-size:14px;display:inline-block}.el-switch__label .el-icon{height:inherit}.el-switch__label .el-icon svg{vertical-align:middle}.el-switch__input{position:absolute;width:0;height:0;opacity:0;margin:0}.el-switch__input:focus-visible~.el-switch__core{outline:2px solid var(--el-switch-on-color);outline-offset:1px}.el-switch__core{margin:0;display:inline-block;position:relative;width:40px;height:20px;border:1px solid var(--el-switch-border-color,var(--el-switch-off-color));outline:0;border-radius:10px;box-sizing:border-box;background:var(--el-switch-off-color);cursor:pointer;transition:border-color var(--el-transition-duration),background-color var(--el-transition-duration);vertical-align:middle}.el-switch__core .el-switch__inner{position:absolute;top:1px;transition:all var(--el-transition-duration);width:16px;height:16px;display:flex;justify-content:center;align-items:center;left:50%;white-space:nowrap}.el-switch__core .el-switch__inner .is-icon,.el-switch__core .el-switch__inner .is-text{color:var(--el-color-white);transition:opacity var(--el-transition-duration);position:absolute;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.el-switch__core .el-switch__action{position:absolute;top:1px;left:1px;border-radius:var(--el-border-radius-circle);transition:all var(--el-transition-duration);width:16px;height:16px;background-color:var(--el-color-white);display:flex;justify-content:center;align-items:center;color:var(--el-switch-off-color)}.el-switch__core .el-switch__action .is-icon,.el-switch__core .el-switch__action .is-text{transition:opacity var(--el-transition-duration);position:absolute;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.el-switch__core .is-text{font-size:12px}.el-switch__core .is-show{opacity:1}.el-switch__core .is-hide{opacity:0}.el-switch.is-checked .el-switch__core{border-color:var(--el-switch-border-color,var(--el-switch-on-color));background-color:var(--el-switch-on-color)}.el-switch.is-checked .el-switch__core .el-switch__action{left:100%;margin-left:-17px;color:var(--el-switch-on-color)}.el-switch.is-checked .el-switch__core .el-switch__inner{left:50%;white-space:nowrap;margin-left:-17px}.el-switch.is-disabled{opacity:.6}.el-switch--wide .el-switch__label.el-switch__label--left span{left:10px}.el-switch--wide .el-switch__label.el-switch__label--right span{right:10px}.el-switch .label-fade-enter-from,.el-switch .label-fade-leave-active{opacity:0}.el-switch--large{font-size:14px;line-height:24px;height:40px}.el-switch--large .el-switch__label{height:24px;font-size:14px}.el-switch--large .el-switch__label *{font-size:14px}.el-switch--large .el-switch__core{width:50px;height:24px;border-radius:12px}.el-switch--large .el-switch__core .el-switch__inner,.el-switch--large .el-switch__core .el-switch__action{width:20px;height:20px}.el-switch--large.is-checked .el-switch__core .el-switch__action,.el-switch--large.is-checked .el-switch__core .el-switch__inner{margin-left:-21px}.el-switch--small{font-size:12px;line-height:16px;height:24px}.el-switch--small .el-switch__label{height:16px;font-size:12px}.el-switch--small .el-switch__label *{font-size:12px}.el-switch--small .el-switch__core{width:30px;height:16px;border-radius:8px}.el-switch--small .el-switch__core .el-switch__inner,.el-switch--small .el-switch__core .el-switch__action{width:12px;height:12px}.el-switch--small.is-checked .el-switch__core .el-switch__action,.el-switch--small.is-checked .el-switch__core .el-switch__inner{margin-left:-13px}.el-slider{--el-slider-main-bg-color:var(--el-color-primary);--el-slider-runway-bg-color:var(--el-border-color-light);--el-slider-stop-bg-color:var(--el-color-white);--el-slider-disabled-color:var(--el-text-color-placeholder);--el-slider-border-radius:3px;--el-slider-height:6px;--el-slider-button-size:20px;--el-slider-button-wrapper-size:36px;--el-slider-button-wrapper-offset:-15px}.el-slider{width:100%;height:32px;display:flex;align-items:center}.el-slider__runway{flex:1;height:var(--el-slider-height);background-color:var(--el-slider-runway-bg-color);border-radius:var(--el-slider-border-radius);position:relative;cursor:pointer}.el-slider__runway.show-input{margin-right:30px;width:auto}.el-slider__runway.is-disabled{cursor:default}.el-slider__runway.is-disabled .el-slider__bar{background-color:var(--el-slider-disabled-color)}.el-slider__runway.is-disabled .el-slider__button{border-color:var(--el-slider-disabled-color)}.el-slider__runway.is-disabled .el-slider__button-wrapper.hover,.el-slider__runway.is-disabled .el-slider__button-wrapper:hover,.el-slider__runway.is-disabled .el-slider__button-wrapper.dragging{cursor:not-allowed}.el-slider__runway.is-disabled .el-slider__button.dragging,.el-slider__runway.is-disabled .el-slider__button.hover,.el-slider__runway.is-disabled .el-slider__button:hover{transform:scale(1)}.el-slider__runway.is-disabled .el-slider__button.hover,.el-slider__runway.is-disabled .el-slider__button:hover,.el-slider__runway.is-disabled .el-slider__button.dragging{cursor:not-allowed}.el-slider__input{flex-shrink:0;width:130px}.el-slider__bar{height:var(--el-slider-height);background-color:var(--el-slider-main-bg-color);border-top-left-radius:var(--el-slider-border-radius);border-bottom-left-radius:var(--el-slider-border-radius);position:absolute}.el-slider__button-wrapper{height:var(--el-slider-button-wrapper-size);width:var(--el-slider-button-wrapper-size);position:absolute;z-index:1;top:var(--el-slider-button-wrapper-offset);transform:translate(-50%);background-color:transparent;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;line-height:normal;outline:0}.el-slider__button-wrapper:after{display:inline-block;content:\"\";height:100%;vertical-align:middle}.el-slider__button-wrapper.hover,.el-slider__button-wrapper:hover{cursor:-webkit-grab;cursor:grab}.el-slider__button-wrapper.dragging{cursor:-webkit-grabbing;cursor:grabbing}.el-slider__button{display:inline-block;width:var(--el-slider-button-size);height:var(--el-slider-button-size);vertical-align:middle;border:solid 2px var(--el-slider-main-bg-color);background-color:var(--el-color-white);border-radius:50%;box-sizing:border-box;transition:var(--el-transition-duration-fast);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.el-slider__button.dragging,.el-slider__button.hover,.el-slider__button:hover{transform:scale(1.2)}.el-slider__button.hover,.el-slider__button:hover{cursor:-webkit-grab;cursor:grab}.el-slider__button.dragging{cursor:-webkit-grabbing;cursor:grabbing}.el-slider__stop{position:absolute;height:var(--el-slider-height);width:var(--el-slider-height);border-radius:var(--el-border-radius-circle);background-color:var(--el-slider-stop-bg-color);transform:translate(-50%)}.el-slider__marks{top:0;left:12px;width:18px;height:100%}.el-slider__marks-text{position:absolute;transform:translate(-50%);font-size:14px;color:var(--el-color-info);margin-top:15px}.el-slider.is-vertical{position:relative;display:inline-flex;width:auto;height:100%;flex:0}.el-slider.is-vertical .el-slider__runway{width:var(--el-slider-height);height:100%;margin:0 16px}.el-slider.is-vertical .el-slider__bar{width:var(--el-slider-height);height:auto;border-radius:0 0 3px 3px}.el-slider.is-vertical .el-slider__button-wrapper{top:auto;left:var(--el-slider-button-wrapper-offset);transform:translateY(50%)}.el-slider.is-vertical .el-slider__stop{transform:translateY(50%)}.el-slider.is-vertical .el-slider__marks-text{margin-top:0;left:15px;transform:translateY(50%)}.el-slider--large{height:40px}.el-slider--small{height:24px}.el-button{--el-button-font-weight:var(--el-font-weight-primary);--el-button-border-color:var(--el-border-color);--el-button-bg-color:var(--el-fill-color-blank);--el-button-text-color:var(--el-text-color-regular);--el-button-disabled-text-color:var(--el-disabled-text-color);--el-button-disabled-bg-color:var(--el-fill-color-blank);--el-button-disabled-border-color:var(--el-border-color-light);--el-button-divide-border-color:rgba(255, 255, 255, .5);--el-button-hover-text-color:var(--el-color-primary);--el-button-hover-bg-color:var(--el-color-primary-light-9);--el-button-hover-border-color:var(--el-color-primary-light-7);--el-button-active-text-color:var(--el-button-hover-text-color);--el-button-active-border-color:var(--el-color-primary);--el-button-active-bg-color:var(--el-button-hover-bg-color);--el-button-outline-color:var(--el-color-primary-light-5);--el-button-hover-link-text-color:var(--el-color-info);--el-button-active-color:var(--el-text-color-primary)}.el-button{display:inline-flex;justify-content:center;align-items:center;line-height:1;height:32px;white-space:nowrap;cursor:pointer;color:var(--el-button-text-color);text-align:center;box-sizing:border-box;outline:0;transition:.1s;font-weight:var(--el-button-font-weight);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;vertical-align:middle;-webkit-appearance:none;background-color:var(--el-button-bg-color);border:var(--el-border);border-color:var(--el-button-border-color);padding:8px 15px;font-size:var(--el-font-size-base);border-radius:var(--el-border-radius-base)}.el-button:focus,.el-button:hover{color:var(--el-button-hover-text-color);border-color:var(--el-button-hover-border-color);background-color:var(--el-button-hover-bg-color);outline:0}.el-button:active{color:var(--el-button-active-text-color);border-color:var(--el-button-active-border-color);background-color:var(--el-button-active-bg-color);outline:0}.el-button:focus-visible{outline:2px solid var(--el-button-outline-color);outline-offset:1px}.el-button>span{display:inline-flex;align-items:center}.el-button+.el-button{margin-left:12px}.el-button.is-round{padding:8px 15px}.el-button::-moz-focus-inner{border:0}.el-button [class*=el-icon]+span{margin-left:6px}.el-button [class*=el-icon] svg{vertical-align:bottom}.el-button.is-plain{--el-button-hover-text-color:var(--el-color-primary);--el-button-hover-bg-color:var(--el-fill-color-blank);--el-button-hover-border-color:var(--el-color-primary)}.el-button.is-active{color:var(--el-button-active-text-color);border-color:var(--el-button-active-border-color);background-color:var(--el-button-active-bg-color);outline:0}.el-button.is-disabled,.el-button.is-disabled:focus,.el-button.is-disabled:hover{color:var(--el-button-disabled-text-color);cursor:not-allowed;background-image:none;background-color:var(--el-button-disabled-bg-color);border-color:var(--el-button-disabled-border-color)}.el-button.is-loading{position:relative;pointer-events:none}.el-button.is-loading:before{z-index:1;pointer-events:none;content:\"\";position:absolute;inset:-1px;border-radius:inherit;background-color:var(--el-mask-color-extra-light)}.el-button.is-round{border-radius:var(--el-border-radius-round)}.el-button.is-circle{border-radius:50%;padding:8px}.el-button.is-text{color:var(--el-button-text-color);border:0 solid transparent;background-color:transparent}.el-button.is-text.is-disabled{color:var(--el-button-disabled-text-color);background-color:transparent!important}.el-button.is-text:not(.is-disabled):focus,.el-button.is-text:not(.is-disabled):hover{background-color:var(--el-fill-color-light)}.el-button.is-text:not(.is-disabled):focus-visible{outline:2px solid var(--el-button-outline-color);outline-offset:1px}.el-button.is-text:not(.is-disabled):active{background-color:var(--el-fill-color)}.el-button.is-text:not(.is-disabled).is-has-bg{background-color:var(--el-fill-color-light)}.el-button.is-text:not(.is-disabled).is-has-bg:focus,.el-button.is-text:not(.is-disabled).is-has-bg:hover{background-color:var(--el-fill-color)}.el-button.is-text:not(.is-disabled).is-has-bg:active{background-color:var(--el-fill-color-dark)}.el-button__text--expand{letter-spacing:.3em;margin-right:-.3em}.el-button.is-link{border-color:transparent;color:var(--el-button-text-color);background:0 0;padding:2px;height:auto}.el-button.is-link:focus,.el-button.is-link:hover{color:var(--el-button-hover-link-text-color)}.el-button.is-link.is-disabled{color:var(--el-button-disabled-text-color);background-color:transparent!important;border-color:transparent!important}.el-button.is-link:not(.is-disabled):focus,.el-button.is-link:not(.is-disabled):hover{border-color:transparent;background-color:transparent}.el-button.is-link:not(.is-disabled):active{color:var(--el-button-active-color);border-color:transparent;background-color:transparent}.el-button--text{border-color:transparent;background:0 0;color:var(--el-color-primary);padding-left:0;padding-right:0}.el-button--text.is-disabled{color:var(--el-button-disabled-text-color);background-color:transparent!important;border-color:transparent!important}.el-button--text:not(.is-disabled):focus,.el-button--text:not(.is-disabled):hover{color:var(--el-color-primary-light-3);border-color:transparent;background-color:transparent}.el-button--text:not(.is-disabled):active{color:var(--el-color-primary-dark-2);border-color:transparent;background-color:transparent}.el-button__link--expand{letter-spacing:.3em;margin-right:-.3em}.el-button--primary{--el-button-text-color:var(--el-color-white);--el-button-bg-color:var(--el-color-primary);--el-button-border-color:var(--el-color-primary);--el-button-outline-color:var(--el-color-primary-light-5);--el-button-active-color:var(--el-color-primary-dark-2);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-link-text-color:var(--el-color-primary-light-5);--el-button-hover-bg-color:var(--el-color-primary-light-3);--el-button-hover-border-color:var(--el-color-primary-light-3);--el-button-active-bg-color:var(--el-color-primary-dark-2);--el-button-active-border-color:var(--el-color-primary-dark-2);--el-button-disabled-text-color:var(--el-color-white);--el-button-disabled-bg-color:var(--el-color-primary-light-5);--el-button-disabled-border-color:var(--el-color-primary-light-5)}.el-button--primary.is-link,.el-button--primary.is-plain,.el-button--primary.is-text{--el-button-text-color:var(--el-color-primary);--el-button-bg-color:var(--el-color-primary-light-9);--el-button-border-color:var(--el-color-primary-light-5);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-bg-color:var(--el-color-primary);--el-button-hover-border-color:var(--el-color-primary);--el-button-active-text-color:var(--el-color-white)}.el-button--primary.is-link.is-disabled,.el-button--primary.is-link.is-disabled:active,.el-button--primary.is-link.is-disabled:focus,.el-button--primary.is-link.is-disabled:hover,.el-button--primary.is-plain.is-disabled,.el-button--primary.is-plain.is-disabled:active,.el-button--primary.is-plain.is-disabled:focus,.el-button--primary.is-plain.is-disabled:hover,.el-button--primary.is-text.is-disabled,.el-button--primary.is-text.is-disabled:active,.el-button--primary.is-text.is-disabled:focus,.el-button--primary.is-text.is-disabled:hover{color:var(--el-color-primary-light-5);background-color:var(--el-color-primary-light-9);border-color:var(--el-color-primary-light-8)}.el-button--success{--el-button-text-color:var(--el-color-white);--el-button-bg-color:var(--el-color-success);--el-button-border-color:var(--el-color-success);--el-button-outline-color:var(--el-color-success-light-5);--el-button-active-color:var(--el-color-success-dark-2);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-link-text-color:var(--el-color-success-light-5);--el-button-hover-bg-color:var(--el-color-success-light-3);--el-button-hover-border-color:var(--el-color-success-light-3);--el-button-active-bg-color:var(--el-color-success-dark-2);--el-button-active-border-color:var(--el-color-success-dark-2);--el-button-disabled-text-color:var(--el-color-white);--el-button-disabled-bg-color:var(--el-color-success-light-5);--el-button-disabled-border-color:var(--el-color-success-light-5)}.el-button--success.is-link,.el-button--success.is-plain,.el-button--success.is-text{--el-button-text-color:var(--el-color-success);--el-button-bg-color:var(--el-color-success-light-9);--el-button-border-color:var(--el-color-success-light-5);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-bg-color:var(--el-color-success);--el-button-hover-border-color:var(--el-color-success);--el-button-active-text-color:var(--el-color-white)}.el-button--success.is-link.is-disabled,.el-button--success.is-link.is-disabled:active,.el-button--success.is-link.is-disabled:focus,.el-button--success.is-link.is-disabled:hover,.el-button--success.is-plain.is-disabled,.el-button--success.is-plain.is-disabled:active,.el-button--success.is-plain.is-disabled:focus,.el-button--success.is-plain.is-disabled:hover,.el-button--success.is-text.is-disabled,.el-button--success.is-text.is-disabled:active,.el-button--success.is-text.is-disabled:focus,.el-button--success.is-text.is-disabled:hover{color:var(--el-color-success-light-5);background-color:var(--el-color-success-light-9);border-color:var(--el-color-success-light-8)}.el-button--warning{--el-button-text-color:var(--el-color-white);--el-button-bg-color:var(--el-color-warning);--el-button-border-color:var(--el-color-warning);--el-button-outline-color:var(--el-color-warning-light-5);--el-button-active-color:var(--el-color-warning-dark-2);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-link-text-color:var(--el-color-warning-light-5);--el-button-hover-bg-color:var(--el-color-warning-light-3);--el-button-hover-border-color:var(--el-color-warning-light-3);--el-button-active-bg-color:var(--el-color-warning-dark-2);--el-button-active-border-color:var(--el-color-warning-dark-2);--el-button-disabled-text-color:var(--el-color-white);--el-button-disabled-bg-color:var(--el-color-warning-light-5);--el-button-disabled-border-color:var(--el-color-warning-light-5)}.el-button--warning.is-link,.el-button--warning.is-plain,.el-button--warning.is-text{--el-button-text-color:var(--el-color-warning);--el-button-bg-color:var(--el-color-warning-light-9);--el-button-border-color:var(--el-color-warning-light-5);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-bg-color:var(--el-color-warning);--el-button-hover-border-color:var(--el-color-warning);--el-button-active-text-color:var(--el-color-white)}.el-button--warning.is-link.is-disabled,.el-button--warning.is-link.is-disabled:active,.el-button--warning.is-link.is-disabled:focus,.el-button--warning.is-link.is-disabled:hover,.el-button--warning.is-plain.is-disabled,.el-button--warning.is-plain.is-disabled:active,.el-button--warning.is-plain.is-disabled:focus,.el-button--warning.is-plain.is-disabled:hover,.el-button--warning.is-text.is-disabled,.el-button--warning.is-text.is-disabled:active,.el-button--warning.is-text.is-disabled:focus,.el-button--warning.is-text.is-disabled:hover{color:var(--el-color-warning-light-5);background-color:var(--el-color-warning-light-9);border-color:var(--el-color-warning-light-8)}.el-button--danger{--el-button-text-color:var(--el-color-white);--el-button-bg-color:var(--el-color-danger);--el-button-border-color:var(--el-color-danger);--el-button-outline-color:var(--el-color-danger-light-5);--el-button-active-color:var(--el-color-danger-dark-2);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-link-text-color:var(--el-color-danger-light-5);--el-button-hover-bg-color:var(--el-color-danger-light-3);--el-button-hover-border-color:var(--el-color-danger-light-3);--el-button-active-bg-color:var(--el-color-danger-dark-2);--el-button-active-border-color:var(--el-color-danger-dark-2);--el-button-disabled-text-color:var(--el-color-white);--el-button-disabled-bg-color:var(--el-color-danger-light-5);--el-button-disabled-border-color:var(--el-color-danger-light-5)}.el-button--danger.is-link,.el-button--danger.is-plain,.el-button--danger.is-text{--el-button-text-color:var(--el-color-danger);--el-button-bg-color:var(--el-color-danger-light-9);--el-button-border-color:var(--el-color-danger-light-5);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-bg-color:var(--el-color-danger);--el-button-hover-border-color:var(--el-color-danger);--el-button-active-text-color:var(--el-color-white)}.el-button--danger.is-link.is-disabled,.el-button--danger.is-link.is-disabled:active,.el-button--danger.is-link.is-disabled:focus,.el-button--danger.is-link.is-disabled:hover,.el-button--danger.is-plain.is-disabled,.el-button--danger.is-plain.is-disabled:active,.el-button--danger.is-plain.is-disabled:focus,.el-button--danger.is-plain.is-disabled:hover,.el-button--danger.is-text.is-disabled,.el-button--danger.is-text.is-disabled:active,.el-button--danger.is-text.is-disabled:focus,.el-button--danger.is-text.is-disabled:hover{color:var(--el-color-danger-light-5);background-color:var(--el-color-danger-light-9);border-color:var(--el-color-danger-light-8)}.el-button--info{--el-button-text-color:var(--el-color-white);--el-button-bg-color:var(--el-color-info);--el-button-border-color:var(--el-color-info);--el-button-outline-color:var(--el-color-info-light-5);--el-button-active-color:var(--el-color-info-dark-2);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-link-text-color:var(--el-color-info-light-5);--el-button-hover-bg-color:var(--el-color-info-light-3);--el-button-hover-border-color:var(--el-color-info-light-3);--el-button-active-bg-color:var(--el-color-info-dark-2);--el-button-active-border-color:var(--el-color-info-dark-2);--el-button-disabled-text-color:var(--el-color-white);--el-button-disabled-bg-color:var(--el-color-info-light-5);--el-button-disabled-border-color:var(--el-color-info-light-5)}.el-button--info.is-link,.el-button--info.is-plain,.el-button--info.is-text{--el-button-text-color:var(--el-color-info);--el-button-bg-color:var(--el-color-info-light-9);--el-button-border-color:var(--el-color-info-light-5);--el-button-hover-text-color:var(--el-color-white);--el-button-hover-bg-color:var(--el-color-info);--el-button-hover-border-color:var(--el-color-info);--el-button-active-text-color:var(--el-color-white)}.el-button--info.is-link.is-disabled,.el-button--info.is-link.is-disabled:active,.el-button--info.is-link.is-disabled:focus,.el-button--info.is-link.is-disabled:hover,.el-button--info.is-plain.is-disabled,.el-button--info.is-plain.is-disabled:active,.el-button--info.is-plain.is-disabled:focus,.el-button--info.is-plain.is-disabled:hover,.el-button--info.is-text.is-disabled,.el-button--info.is-text.is-disabled:active,.el-button--info.is-text.is-disabled:focus,.el-button--info.is-text.is-disabled:hover{color:var(--el-color-info-light-5);background-color:var(--el-color-info-light-9);border-color:var(--el-color-info-light-8)}.el-button--large{--el-button-size:40px;height:var(--el-button-size);padding:12px 19px;font-size:var(--el-font-size-base);border-radius:var(--el-border-radius-base)}.el-button--large [class*=el-icon]+span{margin-left:8px}.el-button--large.is-round{padding:12px 19px}.el-button--large.is-circle{width:var(--el-button-size);padding:12px}.el-button--small{--el-button-size:24px;height:var(--el-button-size);padding:5px 11px;font-size:12px;border-radius:calc(var(--el-border-radius-base) - 1px)}.el-button--small [class*=el-icon]+span{margin-left:4px}.el-button--small.is-round{padding:5px 11px}.el-button--small.is-circle{width:var(--el-button-size);padding:5px}.el-badge{--el-badge-bg-color:var(--el-color-danger);--el-badge-radius:10px;--el-badge-font-size:12px;--el-badge-padding:6px;--el-badge-size:18px;position:relative;vertical-align:middle;display:inline-block}.el-badge__content{background-color:var(--el-badge-bg-color);border-radius:var(--el-badge-radius);color:var(--el-color-white);display:inline-flex;justify-content:center;align-items:center;font-size:var(--el-badge-font-size);height:var(--el-badge-size);padding:0 var(--el-badge-padding);white-space:nowrap;border:1px solid var(--el-bg-color)}.el-badge__content.is-fixed{position:absolute;top:0;right:calc(1px + var(--el-badge-size)/ 2);transform:translateY(-50%) translate(100%)}.el-badge__content.is-fixed.is-dot{right:5px}.el-badge__content.is-dot{height:8px;width:8px;padding:0;right:0;border-radius:50%}.el-badge__content--primary{background-color:var(--el-color-primary)}.el-badge__content--success{background-color:var(--el-color-success)}.el-badge__content--warning{background-color:var(--el-color-warning)}.el-badge__content--info{background-color:var(--el-color-info)}.el-badge__content--danger{background-color:var(--el-color-danger)}.el-message{--el-message-bg-color:var(--el-color-info-light-9);--el-message-border-color:var(--el-border-color-lighter);--el-message-padding:15px 19px;--el-message-close-size:16px;--el-message-close-icon-color:var(--el-text-color-placeholder);--el-message-close-hover-color:var(--el-text-color-secondary)}.el-message{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;max-width:calc(100% - 32px);box-sizing:border-box;border-radius:var(--el-border-radius-base);border-width:var(--el-border-width);border-style:var(--el-border-style);border-color:var(--el-message-border-color);position:fixed;left:50%;top:20px;transform:translate(-50%);background-color:var(--el-message-bg-color);transition:opacity var(--el-transition-duration),transform .4s,top .4s;padding:var(--el-message-padding);display:flex;align-items:center}.el-message.is-center{justify-content:center}.el-message.is-closable .el-message__content{padding-right:31px}.el-message p{margin:0}.el-message--success{--el-message-bg-color:var(--el-color-success-light-9);--el-message-border-color:var(--el-color-success-light-8);--el-message-text-color:var(--el-color-success)}.el-message--success .el-message__content{color:var(--el-message-text-color);overflow-wrap:anywhere}.el-message .el-message-icon--success{color:var(--el-message-text-color)}.el-message--info{--el-message-bg-color:var(--el-color-info-light-9);--el-message-border-color:var(--el-color-info-light-8);--el-message-text-color:var(--el-color-info)}.el-message--info .el-message__content{color:var(--el-message-text-color);overflow-wrap:anywhere}.el-message .el-message-icon--info{color:var(--el-message-text-color)}.el-message--warning{--el-message-bg-color:var(--el-color-warning-light-9);--el-message-border-color:var(--el-color-warning-light-8);--el-message-text-color:var(--el-color-warning)}.el-message--warning .el-message__content{color:var(--el-message-text-color);overflow-wrap:anywhere}.el-message .el-message-icon--warning{color:var(--el-message-text-color)}.el-message--error{--el-message-bg-color:var(--el-color-error-light-9);--el-message-border-color:var(--el-color-error-light-8);--el-message-text-color:var(--el-color-error)}.el-message--error .el-message__content{color:var(--el-message-text-color);overflow-wrap:anywhere}.el-message .el-message-icon--error{color:var(--el-message-text-color)}.el-message__icon{margin-right:10px}.el-message .el-message__badge{position:absolute;top:-8px;right:-8px}.el-message__content{padding:0;font-size:14px;line-height:1}.el-message__content:focus{outline-width:0}.el-message .el-message__closeBtn{position:absolute;top:50%;right:19px;transform:translateY(-50%);cursor:pointer;color:var(--el-message-close-icon-color);font-size:var(--el-message-close-size)}.el-message .el-message__closeBtn:focus{outline-width:0}.el-message .el-message__closeBtn:hover{color:var(--el-message-close-hover-color)}.el-message-fade-enter-from,.el-message-fade-leave-to{opacity:0;transform:translate(-50%,-100%)}.nhentai-helper-setting-help-buttons{float:left;position:absolute}#nhentai-helper-setting-dialog .asterisk-left:before{content:\"*\";color:var(--el-color-danger);margin-right:4px}#nhentai-helper-setting-dialog label{font-weight:unset}#nhentai-helper-setting-dialog input:not([type=\"file\"]):not([type=\"checkbox\"]){background:inherit;color:var(--el-input-text-color, var(--el-text-color-regular))}#nhentai-helper-setting-dialog .el-input.is-disabled .el-input__inner{color:var(--el-disabled-text-color)}#nhentai-helper-setting-dialog .el-slider__stop{border:solid 1px var(--el-slider-runway-bg-color)}#nhentai-helper-setting-dialog .el-form-item:last-of-type{margin-bottom:0}#nhentai-helper-setting-dialog .el-form-item.refresh-required>.el-form-item__label-wrap>.el-form-item__label:after{content:\"*\";color:var(--el-color-danger);margin-left:4px}#nhentai-helper-setting-dialog .el-divider__text{color:var(--el-text-color-secondary);user-select:none}#nhentai-helper-setting-dialog .m-l-16{margin-left:16px}#nhentai-helper-setting-dialog .m-b-32{margin-bottom:32px}#nhentai-helper-setting-dialog .no-sl,#nhentai-helper-setting-dialog .el-form-item__label{user-select:none}"
});

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
(function($, jqueryPjax, vue, eventemitter3, fileSaver, localforage, md5, comlink, Noty, streamsaver) {
  var _a2, _b;
  "use strict";
  const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
  const $__default = /* @__PURE__ */ _interopDefaultLegacy($);
  const localforage__default = /* @__PURE__ */ _interopDefaultLegacy(localforage);
  const md5__default = /* @__PURE__ */ _interopDefaultLegacy(md5);
  const Noty__default = /* @__PURE__ */ _interopDefaultLegacy(Noty);
  var monkeyWindow = (_a2 = Reflect.get(document, "__monkeyWindow")) != null ? _a2 : window;
  monkeyWindow.GM;
  monkeyWindow.unsafeWindow = (_b = monkeyWindow.unsafeWindow) != null ? _b : window;
  var unsafeWindow = monkeyWindow.unsafeWindow;
  monkeyWindow.GM_info;
  monkeyWindow.GM_cookie;
  var GM_setValue = (...args) => {
    return monkeyWindow.GM_setValue(...args);
  };
  var GM_getResourceText = (...args) => {
    return monkeyWindow.GM_getResourceText(...args);
  };
  var GM_addStyle = (...args) => {
    return monkeyWindow.GM_addStyle(...args);
  };
  var GM_registerMenuCommand = (...args) => {
    return monkeyWindow.GM_registerMenuCommand(...args);
  };
  var GM_xmlhttpRequest = (...args) => {
    return monkeyWindow.GM_xmlhttpRequest(...args);
  };
  var GM_getValue = (...args) => {
    return monkeyWindow.GM_getValue(...args);
  };
  const WORKER_THREAD_NUM = Math.max(navigator.hardwareConcurrency - 1, 1);
  const { pathname, host } = location;
  const IS_PAGE_MANGA_DETAIL = /^\/g\/[0-9]+\/?(\?.*)?$/.test(pathname);
  const IS_PAGE_ONLINE_VIEW = /^\/g\/[0-9]+(\/list)?\/[0-9]+\/?(\?.*)?$/.test(pathname);
  const IS_PAGE_MANGA_LIST = !IS_PAGE_MANGA_DETAIL && !IS_PAGE_ONLINE_VIEW && document.getElementsByClassName("gallery").length > 0;
  const IS_NHENTAI = host === "nhentai.net";
  const IS_NHENTAI_TO = host === "nhentai.to" || host === "nhentai.website";
  const isNodeOrElement = typeof Node === "function" ? (val) => val instanceof Node : (val) => val && typeof val === "object" && typeof val.nodeType === "number" && typeof val.nodeName === "string";
  if (IS_NHENTAI) {
    if (GM_getValue("prevent_console_clear", false) || localStorage.getItem("NHENTAI_HELPER_DEBUG")) {
      const c = unsafeWindow.console;
      c._clear = c.clear;
      c.clear = () => {
      };
      c._log = c.log;
      c.log = (...args) => {
        if (args.length === 1 && isNodeOrElement(args[0]))
          return;
        return c._log(...args);
      };
    }
  }
  const logger = {
    log: (...args) => console.log("[nhentai-helper]", ...args),
    warn: (...args) => console.warn("[nhentai-helper]", ...args),
    error: (...args) => console.error("[nhentai-helper]", ...args)
  };
  const index = "";
  var functionOnce = once;
  function once(fn2) {
    var called, value;
    if (typeof fn2 !== "function") {
      throw new Error("expected a function but got " + fn2);
    }
    return function wrap() {
      if (called) {
        return value;
      }
      called = true;
      value = fn2.apply(this, arguments);
      fn2 = void 0;
      return value;
    };
  }
  var getRandomValues;
  var rnds8 = new Uint8Array(16);
  function rng() {
    if (!getRandomValues) {
      getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
      if (!getRandomValues) {
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      }
    }
    return getRandomValues(rnds8);
  }
  const REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
  function validate(uuid) {
    return typeof uuid === "string" && REGEX.test(uuid);
  }
  var byteToHex = [];
  for (var i = 0; i < 256; ++i) {
    byteToHex.push((i + 256).toString(16).substr(1));
  }
  function stringify(arr) {
    var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
    if (!validate(uuid)) {
      throw TypeError("Stringified UUID is invalid");
    }
    return uuid;
  }
  function v4(options, buf, offset) {
    options = options || {};
    var rnds = options.random || (options.rng || rng)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (var i2 = 0; i2 < 16; ++i2) {
        buf[offset + i2] = rnds[i2];
      }
      return buf;
    }
    return stringify(rnds);
  }
  const removeAt = (array2, index2) => array2.splice(index2, 1)[0];
  class AsyncQueue {
    constructor(thread = 1) {
      __publicField(this, "queue", vue.reactive([]));
      __publicField(this, "emitter", new eventemitter3.EventEmitter());
      __publicField(this, "canSingleStart", () => true);
      __publicField(this, "singleRunning", false);
      this.thread = thread;
    }
    get runningThreadNum() {
      return this.queue.filter(({ running }) => running).length;
    }
    get length() {
      return this.queue.length;
    }
    push(fn2, info) {
      this.queue.push({
        id: v4(),
        running: false,
        fn: fn2,
        info
      });
    }
    async start() {
      if (this.thread <= 1) {
        if (this.singleRunning || this.queue.length === 0)
          return;
        this.singleRunning = true;
        do {
          if (!this.canSingleStart()) {
            this.singleRunning = false;
            return;
          }
          await this.queue[0].fn();
          this.queue.shift();
        } while (this.queue.length > 0);
        this.singleRunning = false;
        this.emitter.emit("finish");
      } else {
        const running = this.runningThreadNum;
        if (running >= this.thread || this.queue.length === running)
          return;
        const idleItems = this.queue.filter(({ running: running2 }) => !running2);
        for (let i2 = 0; i2 < Math.min(idleItems.length, this.thread - running); i2++) {
          const item = idleItems[i2];
          item.running = true;
          item.fn().then(async () => {
            removeAt(
              this.queue,
              this.queue.findIndex(({ id }) => id === item.id)
            );
            if (this.queue.length)
              await this.start();
            else
              this.emitter.emit("finish");
          }).catch(logger.error);
        }
      }
    }
    async skipFromError() {
      this.queue.shift();
      await this.restartFromError();
    }
    async restartFromError() {
      this.singleRunning = false;
      await this.start();
    }
  }
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  var lodash = { exports: {} };
  /**
   * @license
   * Lodash <https://lodash.com/>
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */
  (function(module2, exports2) {
    (function() {
      var undefined$1;
      var VERSION = "4.17.21";
      var LARGE_ARRAY_SIZE2 = 200;
      var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT2 = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT2 = "Invalid `variable` option passed into `_.template`";
      var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
      var MAX_MEMOIZE_SIZE2 = 500;
      var PLACEHOLDER = "__lodash_placeholder__";
      var CLONE_DEEP_FLAG2 = 1, CLONE_FLAT_FLAG2 = 2, CLONE_SYMBOLS_FLAG2 = 4;
      var COMPARE_PARTIAL_FLAG2 = 1, COMPARE_UNORDERED_FLAG2 = 2;
      var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
      var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
      var HOT_COUNT2 = 800, HOT_SPAN2 = 16;
      var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
      var INFINITY2 = 1 / 0, MAX_SAFE_INTEGER2 = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN2 = 0 / 0;
      var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
      var wrapFlags = [
        ["ary", WRAP_ARY_FLAG],
        ["bind", WRAP_BIND_FLAG],
        ["bindKey", WRAP_BIND_KEY_FLAG],
        ["curry", WRAP_CURRY_FLAG],
        ["curryRight", WRAP_CURRY_RIGHT_FLAG],
        ["flip", WRAP_FLIP_FLAG],
        ["partial", WRAP_PARTIAL_FLAG],
        ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
        ["rearg", WRAP_REARG_FLAG]
      ];
      var argsTag2 = "[object Arguments]", arrayTag2 = "[object Array]", asyncTag2 = "[object AsyncFunction]", boolTag2 = "[object Boolean]", dateTag2 = "[object Date]", domExcTag2 = "[object DOMException]", errorTag2 = "[object Error]", funcTag2 = "[object Function]", genTag2 = "[object GeneratorFunction]", mapTag2 = "[object Map]", numberTag2 = "[object Number]", nullTag2 = "[object Null]", objectTag2 = "[object Object]", promiseTag2 = "[object Promise]", proxyTag2 = "[object Proxy]", regexpTag2 = "[object RegExp]", setTag2 = "[object Set]", stringTag2 = "[object String]", symbolTag2 = "[object Symbol]", undefinedTag2 = "[object Undefined]", weakMapTag2 = "[object WeakMap]", weakSetTag = "[object WeakSet]";
      var arrayBufferTag2 = "[object ArrayBuffer]", dataViewTag2 = "[object DataView]", float32Tag2 = "[object Float32Array]", float64Tag2 = "[object Float64Array]", int8Tag2 = "[object Int8Array]", int16Tag2 = "[object Int16Array]", int32Tag2 = "[object Int32Array]", uint8Tag2 = "[object Uint8Array]", uint8ClampedTag2 = "[object Uint8ClampedArray]", uint16Tag2 = "[object Uint16Array]", uint32Tag2 = "[object Uint32Array]";
      var reEmptyStringLeading2 = /\b__p \+= '';/g, reEmptyStringMiddle2 = /\b(__p \+=) '' \+/g, reEmptyStringTrailing2 = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
      var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml2 = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml2 = RegExp(reUnescapedHtml2.source);
      var reEscape2 = /<%-([\s\S]+?)%>/g, reEvaluate2 = /<%([\s\S]+?)%>/g, reInterpolate2 = /<%=([\s\S]+?)%>/g;
      var reIsDeepProp2 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp2 = /^\w*$/, rePropName2 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
      var reRegExpChar2 = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar2.source);
      var reTrimStart2 = /^\s+/;
      var reWhitespace2 = /\s/;
      var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
      var reAsciiWord2 = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
      var reForbiddenIdentifierChars2 = /[()=,{}\[\]\/\s]/;
      var reEscapeChar2 = /\\(\\)?/g;
      var reEsTemplate2 = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
      var reFlags2 = /\w*$/;
      var reIsBadHex2 = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary2 = /^0b[01]+$/i;
      var reIsHostCtor2 = /^\[object .+?Constructor\]$/;
      var reIsOctal2 = /^0o[0-7]+$/i;
      var reIsUint2 = /^(?:0|[1-9]\d*)$/;
      var reLatin2 = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
      var reNoMatch2 = /($^)/;
      var reUnescapedString2 = /['\n\r\u2028\u2029\\]/g;
      var rsAstralRange2 = "\\ud800-\\udfff", rsComboMarksRange2 = "\\u0300-\\u036f", reComboHalfMarksRange2 = "\\ufe20-\\ufe2f", rsComboSymbolsRange2 = "\\u20d0-\\u20ff", rsComboRange2 = rsComboMarksRange2 + reComboHalfMarksRange2 + rsComboSymbolsRange2, rsDingbatRange2 = "\\u2700-\\u27bf", rsLowerRange2 = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange2 = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange2 = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange2 = "\\u2000-\\u206f", rsSpaceRange2 = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange2 = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange2 = "\\ufe0e\\ufe0f", rsBreakRange2 = rsMathOpRange2 + rsNonCharRange2 + rsPunctuationRange2 + rsSpaceRange2;
      var rsApos2 = "['\u2019]", rsAstral2 = "[" + rsAstralRange2 + "]", rsBreak2 = "[" + rsBreakRange2 + "]", rsCombo2 = "[" + rsComboRange2 + "]", rsDigits2 = "\\d+", rsDingbat2 = "[" + rsDingbatRange2 + "]", rsLower2 = "[" + rsLowerRange2 + "]", rsMisc2 = "[^" + rsAstralRange2 + rsBreakRange2 + rsDigits2 + rsDingbatRange2 + rsLowerRange2 + rsUpperRange2 + "]", rsFitz2 = "\\ud83c[\\udffb-\\udfff]", rsModifier2 = "(?:" + rsCombo2 + "|" + rsFitz2 + ")", rsNonAstral2 = "[^" + rsAstralRange2 + "]", rsRegional2 = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair2 = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper2 = "[" + rsUpperRange2 + "]", rsZWJ2 = "\\u200d";
      var rsMiscLower2 = "(?:" + rsLower2 + "|" + rsMisc2 + ")", rsMiscUpper2 = "(?:" + rsUpper2 + "|" + rsMisc2 + ")", rsOptContrLower2 = "(?:" + rsApos2 + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper2 = "(?:" + rsApos2 + "(?:D|LL|M|RE|S|T|VE))?", reOptMod2 = rsModifier2 + "?", rsOptVar2 = "[" + rsVarRange2 + "]?", rsOptJoin2 = "(?:" + rsZWJ2 + "(?:" + [rsNonAstral2, rsRegional2, rsSurrPair2].join("|") + ")" + rsOptVar2 + reOptMod2 + ")*", rsOrdLower2 = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper2 = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq2 = rsOptVar2 + reOptMod2 + rsOptJoin2, rsEmoji2 = "(?:" + [rsDingbat2, rsRegional2, rsSurrPair2].join("|") + ")" + rsSeq2, rsSymbol2 = "(?:" + [rsNonAstral2 + rsCombo2 + "?", rsCombo2, rsRegional2, rsSurrPair2, rsAstral2].join("|") + ")";
      var reApos2 = RegExp(rsApos2, "g");
      var reComboMark2 = RegExp(rsCombo2, "g");
      var reUnicode2 = RegExp(rsFitz2 + "(?=" + rsFitz2 + ")|" + rsSymbol2 + rsSeq2, "g");
      var reUnicodeWord2 = RegExp([
        rsUpper2 + "?" + rsLower2 + "+" + rsOptContrLower2 + "(?=" + [rsBreak2, rsUpper2, "$"].join("|") + ")",
        rsMiscUpper2 + "+" + rsOptContrUpper2 + "(?=" + [rsBreak2, rsUpper2 + rsMiscLower2, "$"].join("|") + ")",
        rsUpper2 + "?" + rsMiscLower2 + "+" + rsOptContrLower2,
        rsUpper2 + "+" + rsOptContrUpper2,
        rsOrdUpper2,
        rsOrdLower2,
        rsDigits2,
        rsEmoji2
      ].join("|"), "g");
      var reHasUnicode2 = RegExp("[" + rsZWJ2 + rsAstralRange2 + rsComboRange2 + rsVarRange2 + "]");
      var reHasUnicodeWord2 = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
      var contextProps = [
        "Array",
        "Buffer",
        "DataView",
        "Date",
        "Error",
        "Float32Array",
        "Float64Array",
        "Function",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "Map",
        "Math",
        "Object",
        "Promise",
        "RegExp",
        "Set",
        "String",
        "Symbol",
        "TypeError",
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "WeakMap",
        "_",
        "clearTimeout",
        "isFinite",
        "parseInt",
        "setTimeout"
      ];
      var templateCounter = -1;
      var typedArrayTags2 = {};
      typedArrayTags2[float32Tag2] = typedArrayTags2[float64Tag2] = typedArrayTags2[int8Tag2] = typedArrayTags2[int16Tag2] = typedArrayTags2[int32Tag2] = typedArrayTags2[uint8Tag2] = typedArrayTags2[uint8ClampedTag2] = typedArrayTags2[uint16Tag2] = typedArrayTags2[uint32Tag2] = true;
      typedArrayTags2[argsTag2] = typedArrayTags2[arrayTag2] = typedArrayTags2[arrayBufferTag2] = typedArrayTags2[boolTag2] = typedArrayTags2[dataViewTag2] = typedArrayTags2[dateTag2] = typedArrayTags2[errorTag2] = typedArrayTags2[funcTag2] = typedArrayTags2[mapTag2] = typedArrayTags2[numberTag2] = typedArrayTags2[objectTag2] = typedArrayTags2[regexpTag2] = typedArrayTags2[setTag2] = typedArrayTags2[stringTag2] = typedArrayTags2[weakMapTag2] = false;
      var cloneableTags2 = {};
      cloneableTags2[argsTag2] = cloneableTags2[arrayTag2] = cloneableTags2[arrayBufferTag2] = cloneableTags2[dataViewTag2] = cloneableTags2[boolTag2] = cloneableTags2[dateTag2] = cloneableTags2[float32Tag2] = cloneableTags2[float64Tag2] = cloneableTags2[int8Tag2] = cloneableTags2[int16Tag2] = cloneableTags2[int32Tag2] = cloneableTags2[mapTag2] = cloneableTags2[numberTag2] = cloneableTags2[objectTag2] = cloneableTags2[regexpTag2] = cloneableTags2[setTag2] = cloneableTags2[stringTag2] = cloneableTags2[symbolTag2] = cloneableTags2[uint8Tag2] = cloneableTags2[uint8ClampedTag2] = cloneableTags2[uint16Tag2] = cloneableTags2[uint32Tag2] = true;
      cloneableTags2[errorTag2] = cloneableTags2[funcTag2] = cloneableTags2[weakMapTag2] = false;
      var deburredLetters2 = {
        "\xC0": "A",
        "\xC1": "A",
        "\xC2": "A",
        "\xC3": "A",
        "\xC4": "A",
        "\xC5": "A",
        "\xE0": "a",
        "\xE1": "a",
        "\xE2": "a",
        "\xE3": "a",
        "\xE4": "a",
        "\xE5": "a",
        "\xC7": "C",
        "\xE7": "c",
        "\xD0": "D",
        "\xF0": "d",
        "\xC8": "E",
        "\xC9": "E",
        "\xCA": "E",
        "\xCB": "E",
        "\xE8": "e",
        "\xE9": "e",
        "\xEA": "e",
        "\xEB": "e",
        "\xCC": "I",
        "\xCD": "I",
        "\xCE": "I",
        "\xCF": "I",
        "\xEC": "i",
        "\xED": "i",
        "\xEE": "i",
        "\xEF": "i",
        "\xD1": "N",
        "\xF1": "n",
        "\xD2": "O",
        "\xD3": "O",
        "\xD4": "O",
        "\xD5": "O",
        "\xD6": "O",
        "\xD8": "O",
        "\xF2": "o",
        "\xF3": "o",
        "\xF4": "o",
        "\xF5": "o",
        "\xF6": "o",
        "\xF8": "o",
        "\xD9": "U",
        "\xDA": "U",
        "\xDB": "U",
        "\xDC": "U",
        "\xF9": "u",
        "\xFA": "u",
        "\xFB": "u",
        "\xFC": "u",
        "\xDD": "Y",
        "\xFD": "y",
        "\xFF": "y",
        "\xC6": "Ae",
        "\xE6": "ae",
        "\xDE": "Th",
        "\xFE": "th",
        "\xDF": "ss",
        "\u0100": "A",
        "\u0102": "A",
        "\u0104": "A",
        "\u0101": "a",
        "\u0103": "a",
        "\u0105": "a",
        "\u0106": "C",
        "\u0108": "C",
        "\u010A": "C",
        "\u010C": "C",
        "\u0107": "c",
        "\u0109": "c",
        "\u010B": "c",
        "\u010D": "c",
        "\u010E": "D",
        "\u0110": "D",
        "\u010F": "d",
        "\u0111": "d",
        "\u0112": "E",
        "\u0114": "E",
        "\u0116": "E",
        "\u0118": "E",
        "\u011A": "E",
        "\u0113": "e",
        "\u0115": "e",
        "\u0117": "e",
        "\u0119": "e",
        "\u011B": "e",
        "\u011C": "G",
        "\u011E": "G",
        "\u0120": "G",
        "\u0122": "G",
        "\u011D": "g",
        "\u011F": "g",
        "\u0121": "g",
        "\u0123": "g",
        "\u0124": "H",
        "\u0126": "H",
        "\u0125": "h",
        "\u0127": "h",
        "\u0128": "I",
        "\u012A": "I",
        "\u012C": "I",
        "\u012E": "I",
        "\u0130": "I",
        "\u0129": "i",
        "\u012B": "i",
        "\u012D": "i",
        "\u012F": "i",
        "\u0131": "i",
        "\u0134": "J",
        "\u0135": "j",
        "\u0136": "K",
        "\u0137": "k",
        "\u0138": "k",
        "\u0139": "L",
        "\u013B": "L",
        "\u013D": "L",
        "\u013F": "L",
        "\u0141": "L",
        "\u013A": "l",
        "\u013C": "l",
        "\u013E": "l",
        "\u0140": "l",
        "\u0142": "l",
        "\u0143": "N",
        "\u0145": "N",
        "\u0147": "N",
        "\u014A": "N",
        "\u0144": "n",
        "\u0146": "n",
        "\u0148": "n",
        "\u014B": "n",
        "\u014C": "O",
        "\u014E": "O",
        "\u0150": "O",
        "\u014D": "o",
        "\u014F": "o",
        "\u0151": "o",
        "\u0154": "R",
        "\u0156": "R",
        "\u0158": "R",
        "\u0155": "r",
        "\u0157": "r",
        "\u0159": "r",
        "\u015A": "S",
        "\u015C": "S",
        "\u015E": "S",
        "\u0160": "S",
        "\u015B": "s",
        "\u015D": "s",
        "\u015F": "s",
        "\u0161": "s",
        "\u0162": "T",
        "\u0164": "T",
        "\u0166": "T",
        "\u0163": "t",
        "\u0165": "t",
        "\u0167": "t",
        "\u0168": "U",
        "\u016A": "U",
        "\u016C": "U",
        "\u016E": "U",
        "\u0170": "U",
        "\u0172": "U",
        "\u0169": "u",
        "\u016B": "u",
        "\u016D": "u",
        "\u016F": "u",
        "\u0171": "u",
        "\u0173": "u",
        "\u0174": "W",
        "\u0175": "w",
        "\u0176": "Y",
        "\u0177": "y",
        "\u0178": "Y",
        "\u0179": "Z",
        "\u017B": "Z",
        "\u017D": "Z",
        "\u017A": "z",
        "\u017C": "z",
        "\u017E": "z",
        "\u0132": "IJ",
        "\u0133": "ij",
        "\u0152": "Oe",
        "\u0153": "oe",
        "\u0149": "'n",
        "\u017F": "s"
      };
      var htmlEscapes2 = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };
      var htmlUnescapes = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
      };
      var stringEscapes2 = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
      };
      var freeParseFloat = parseFloat, freeParseInt2 = parseInt;
      var freeGlobal2 = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
      var freeSelf2 = typeof self == "object" && self && self.Object === Object && self;
      var root2 = freeGlobal2 || freeSelf2 || Function("return this")();
      var freeExports2 = exports2 && !exports2.nodeType && exports2;
      var freeModule2 = freeExports2 && true && module2 && !module2.nodeType && module2;
      var moduleExports2 = freeModule2 && freeModule2.exports === freeExports2;
      var freeProcess2 = moduleExports2 && freeGlobal2.process;
      var nodeUtil2 = function() {
        try {
          var types2 = freeModule2 && freeModule2.require && freeModule2.require("util").types;
          if (types2) {
            return types2;
          }
          return freeProcess2 && freeProcess2.binding && freeProcess2.binding("util");
        } catch (e) {
        }
      }();
      var nodeIsArrayBuffer = nodeUtil2 && nodeUtil2.isArrayBuffer, nodeIsDate = nodeUtil2 && nodeUtil2.isDate, nodeIsMap2 = nodeUtil2 && nodeUtil2.isMap, nodeIsRegExp = nodeUtil2 && nodeUtil2.isRegExp, nodeIsSet2 = nodeUtil2 && nodeUtil2.isSet, nodeIsTypedArray2 = nodeUtil2 && nodeUtil2.isTypedArray;
      function apply2(func, thisArg, args) {
        switch (args.length) {
          case 0:
            return func.call(thisArg);
          case 1:
            return func.call(thisArg, args[0]);
          case 2:
            return func.call(thisArg, args[0], args[1]);
          case 3:
            return func.call(thisArg, args[0], args[1], args[2]);
        }
        return func.apply(thisArg, args);
      }
      function arrayAggregator(array2, setter, iteratee, accumulator) {
        var index2 = -1, length = array2 == null ? 0 : array2.length;
        while (++index2 < length) {
          var value = array2[index2];
          setter(accumulator, value, iteratee(value), array2);
        }
        return accumulator;
      }
      function arrayEach2(array2, iteratee) {
        var index2 = -1, length = array2 == null ? 0 : array2.length;
        while (++index2 < length) {
          if (iteratee(array2[index2], index2, array2) === false) {
            break;
          }
        }
        return array2;
      }
      function arrayEachRight(array2, iteratee) {
        var length = array2 == null ? 0 : array2.length;
        while (length--) {
          if (iteratee(array2[length], length, array2) === false) {
            break;
          }
        }
        return array2;
      }
      function arrayEvery(array2, predicate) {
        var index2 = -1, length = array2 == null ? 0 : array2.length;
        while (++index2 < length) {
          if (!predicate(array2[index2], index2, array2)) {
            return false;
          }
        }
        return true;
      }
      function arrayFilter2(array2, predicate) {
        var index2 = -1, length = array2 == null ? 0 : array2.length, resIndex = 0, result = [];
        while (++index2 < length) {
          var value = array2[index2];
          if (predicate(value, index2, array2)) {
            result[resIndex++] = value;
          }
        }
        return result;
      }
      function arrayIncludes(array2, value) {
        var length = array2 == null ? 0 : array2.length;
        return !!length && baseIndexOf(array2, value, 0) > -1;
      }
      function arrayIncludesWith(array2, value, comparator) {
        var index2 = -1, length = array2 == null ? 0 : array2.length;
        while (++index2 < length) {
          if (comparator(value, array2[index2])) {
            return true;
          }
        }
        return false;
      }
      function arrayMap2(array2, iteratee) {
        var index2 = -1, length = array2 == null ? 0 : array2.length, result = Array(length);
        while (++index2 < length) {
          result[index2] = iteratee(array2[index2], index2, array2);
        }
        return result;
      }
      function arrayPush2(array2, values) {
        var index2 = -1, length = values.length, offset = array2.length;
        while (++index2 < length) {
          array2[offset + index2] = values[index2];
        }
        return array2;
      }
      function arrayReduce2(array2, iteratee, accumulator, initAccum) {
        var index2 = -1, length = array2 == null ? 0 : array2.length;
        if (initAccum && length) {
          accumulator = array2[++index2];
        }
        while (++index2 < length) {
          accumulator = iteratee(accumulator, array2[index2], index2, array2);
        }
        return accumulator;
      }
      function arrayReduceRight(array2, iteratee, accumulator, initAccum) {
        var length = array2 == null ? 0 : array2.length;
        if (initAccum && length) {
          accumulator = array2[--length];
        }
        while (length--) {
          accumulator = iteratee(accumulator, array2[length], length, array2);
        }
        return accumulator;
      }
      function arraySome2(array2, predicate) {
        var index2 = -1, length = array2 == null ? 0 : array2.length;
        while (++index2 < length) {
          if (predicate(array2[index2], index2, array2)) {
            return true;
          }
        }
        return false;
      }
      var asciiSize = baseProperty("length");
      function asciiToArray2(string2) {
        return string2.split("");
      }
      function asciiWords2(string2) {
        return string2.match(reAsciiWord2) || [];
      }
      function baseFindKey(collection, predicate, eachFunc) {
        var result;
        eachFunc(collection, function(value, key, collection2) {
          if (predicate(value, key, collection2)) {
            result = key;
            return false;
          }
        });
        return result;
      }
      function baseFindIndex(array2, predicate, fromIndex, fromRight) {
        var length = array2.length, index2 = fromIndex + (fromRight ? 1 : -1);
        while (fromRight ? index2-- : ++index2 < length) {
          if (predicate(array2[index2], index2, array2)) {
            return index2;
          }
        }
        return -1;
      }
      function baseIndexOf(array2, value, fromIndex) {
        return value === value ? strictIndexOf(array2, value, fromIndex) : baseFindIndex(array2, baseIsNaN, fromIndex);
      }
      function baseIndexOfWith(array2, value, fromIndex, comparator) {
        var index2 = fromIndex - 1, length = array2.length;
        while (++index2 < length) {
          if (comparator(array2[index2], value)) {
            return index2;
          }
        }
        return -1;
      }
      function baseIsNaN(value) {
        return value !== value;
      }
      function baseMean(array2, iteratee) {
        var length = array2 == null ? 0 : array2.length;
        return length ? baseSum(array2, iteratee) / length : NAN2;
      }
      function baseProperty(key) {
        return function(object2) {
          return object2 == null ? undefined$1 : object2[key];
        };
      }
      function basePropertyOf2(object2) {
        return function(key) {
          return object2 == null ? undefined$1 : object2[key];
        };
      }
      function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
        eachFunc(collection, function(value, index2, collection2) {
          accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index2, collection2);
        });
        return accumulator;
      }
      function baseSortBy(array2, comparer) {
        var length = array2.length;
        array2.sort(comparer);
        while (length--) {
          array2[length] = array2[length].value;
        }
        return array2;
      }
      function baseSum(array2, iteratee) {
        var result, index2 = -1, length = array2.length;
        while (++index2 < length) {
          var current = iteratee(array2[index2]);
          if (current !== undefined$1) {
            result = result === undefined$1 ? current : result + current;
          }
        }
        return result;
      }
      function baseTimes2(n, iteratee) {
        var index2 = -1, result = Array(n);
        while (++index2 < n) {
          result[index2] = iteratee(index2);
        }
        return result;
      }
      function baseToPairs(object2, props) {
        return arrayMap2(props, function(key) {
          return [key, object2[key]];
        });
      }
      function baseTrim2(string2) {
        return string2 ? string2.slice(0, trimmedEndIndex2(string2) + 1).replace(reTrimStart2, "") : string2;
      }
      function baseUnary2(func) {
        return function(value) {
          return func(value);
        };
      }
      function baseValues2(object2, props) {
        return arrayMap2(props, function(key) {
          return object2[key];
        });
      }
      function cacheHas2(cache, key) {
        return cache.has(key);
      }
      function charsStartIndex(strSymbols, chrSymbols) {
        var index2 = -1, length = strSymbols.length;
        while (++index2 < length && baseIndexOf(chrSymbols, strSymbols[index2], 0) > -1) {
        }
        return index2;
      }
      function charsEndIndex(strSymbols, chrSymbols) {
        var index2 = strSymbols.length;
        while (index2-- && baseIndexOf(chrSymbols, strSymbols[index2], 0) > -1) {
        }
        return index2;
      }
      function countHolders(array2, placeholder) {
        var length = array2.length, result = 0;
        while (length--) {
          if (array2[length] === placeholder) {
            ++result;
          }
        }
        return result;
      }
      var deburrLetter2 = basePropertyOf2(deburredLetters2);
      var escapeHtmlChar2 = basePropertyOf2(htmlEscapes2);
      function escapeStringChar2(chr) {
        return "\\" + stringEscapes2[chr];
      }
      function getValue2(object2, key) {
        return object2 == null ? undefined$1 : object2[key];
      }
      function hasUnicode2(string2) {
        return reHasUnicode2.test(string2);
      }
      function hasUnicodeWord2(string2) {
        return reHasUnicodeWord2.test(string2);
      }
      function iteratorToArray(iterator) {
        var data, result = [];
        while (!(data = iterator.next()).done) {
          result.push(data.value);
        }
        return result;
      }
      function mapToArray2(map) {
        var index2 = -1, result = Array(map.size);
        map.forEach(function(value, key) {
          result[++index2] = [key, value];
        });
        return result;
      }
      function overArg2(func, transform) {
        return function(arg) {
          return func(transform(arg));
        };
      }
      function replaceHolders(array2, placeholder) {
        var index2 = -1, length = array2.length, resIndex = 0, result = [];
        while (++index2 < length) {
          var value = array2[index2];
          if (value === placeholder || value === PLACEHOLDER) {
            array2[index2] = PLACEHOLDER;
            result[resIndex++] = index2;
          }
        }
        return result;
      }
      function setToArray2(set2) {
        var index2 = -1, result = Array(set2.size);
        set2.forEach(function(value) {
          result[++index2] = value;
        });
        return result;
      }
      function setToPairs(set2) {
        var index2 = -1, result = Array(set2.size);
        set2.forEach(function(value) {
          result[++index2] = [value, value];
        });
        return result;
      }
      function strictIndexOf(array2, value, fromIndex) {
        var index2 = fromIndex - 1, length = array2.length;
        while (++index2 < length) {
          if (array2[index2] === value) {
            return index2;
          }
        }
        return -1;
      }
      function strictLastIndexOf(array2, value, fromIndex) {
        var index2 = fromIndex + 1;
        while (index2--) {
          if (array2[index2] === value) {
            return index2;
          }
        }
        return index2;
      }
      function stringSize(string2) {
        return hasUnicode2(string2) ? unicodeSize(string2) : asciiSize(string2);
      }
      function stringToArray2(string2) {
        return hasUnicode2(string2) ? unicodeToArray2(string2) : asciiToArray2(string2);
      }
      function trimmedEndIndex2(string2) {
        var index2 = string2.length;
        while (index2-- && reWhitespace2.test(string2.charAt(index2))) {
        }
        return index2;
      }
      var unescapeHtmlChar = basePropertyOf2(htmlUnescapes);
      function unicodeSize(string2) {
        var result = reUnicode2.lastIndex = 0;
        while (reUnicode2.test(string2)) {
          ++result;
        }
        return result;
      }
      function unicodeToArray2(string2) {
        return string2.match(reUnicode2) || [];
      }
      function unicodeWords2(string2) {
        return string2.match(reUnicodeWord2) || [];
      }
      var runInContext = function runInContext2(context) {
        context = context == null ? root2 : _.defaults(root2.Object(), context, _.pick(root2, contextProps));
        var Array2 = context.Array, Date2 = context.Date, Error2 = context.Error, Function2 = context.Function, Math2 = context.Math, Object2 = context.Object, RegExp2 = context.RegExp, String2 = context.String, TypeError2 = context.TypeError;
        var arrayProto2 = Array2.prototype, funcProto2 = Function2.prototype, objectProto2 = Object2.prototype;
        var coreJsData2 = context["__core-js_shared__"];
        var funcToString2 = funcProto2.toString;
        var hasOwnProperty2 = objectProto2.hasOwnProperty;
        var idCounter = 0;
        var maskSrcKey2 = function() {
          var uid = /[^.]+$/.exec(coreJsData2 && coreJsData2.keys && coreJsData2.keys.IE_PROTO || "");
          return uid ? "Symbol(src)_1." + uid : "";
        }();
        var nativeObjectToString2 = objectProto2.toString;
        var objectCtorString2 = funcToString2.call(Object2);
        var oldDash = root2._;
        var reIsNative2 = RegExp2(
          "^" + funcToString2.call(hasOwnProperty2).replace(reRegExpChar2, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
        );
        var Buffer2 = moduleExports2 ? context.Buffer : undefined$1, Symbol2 = context.Symbol, Uint8Array2 = context.Uint8Array, allocUnsafe2 = Buffer2 ? Buffer2.allocUnsafe : undefined$1, getPrototype2 = overArg2(Object2.getPrototypeOf, Object2), objectCreate2 = Object2.create, propertyIsEnumerable2 = objectProto2.propertyIsEnumerable, splice2 = arrayProto2.splice, spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined$1, symIterator = Symbol2 ? Symbol2.iterator : undefined$1, symToStringTag2 = Symbol2 ? Symbol2.toStringTag : undefined$1;
        var defineProperty2 = function() {
          try {
            var func = getNative2(Object2, "defineProperty");
            func({}, "", {});
            return func;
          } catch (e) {
          }
        }();
        var ctxClearTimeout = context.clearTimeout !== root2.clearTimeout && context.clearTimeout, ctxNow = Date2 && Date2.now !== root2.Date.now && Date2.now, ctxSetTimeout = context.setTimeout !== root2.setTimeout && context.setTimeout;
        var nativeCeil = Math2.ceil, nativeFloor = Math2.floor, nativeGetSymbols2 = Object2.getOwnPropertySymbols, nativeIsBuffer2 = Buffer2 ? Buffer2.isBuffer : undefined$1, nativeIsFinite = context.isFinite, nativeJoin = arrayProto2.join, nativeKeys2 = overArg2(Object2.keys, Object2), nativeMax2 = Math2.max, nativeMin2 = Math2.min, nativeNow2 = Date2.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto2.reverse;
        var DataView2 = getNative2(context, "DataView"), Map2 = getNative2(context, "Map"), Promise2 = getNative2(context, "Promise"), Set2 = getNative2(context, "Set"), WeakMap2 = getNative2(context, "WeakMap"), nativeCreate2 = getNative2(Object2, "create");
        var metaMap = WeakMap2 && new WeakMap2();
        var realNames = {};
        var dataViewCtorString2 = toSource2(DataView2), mapCtorString2 = toSource2(Map2), promiseCtorString2 = toSource2(Promise2), setCtorString2 = toSource2(Set2), weakMapCtorString2 = toSource2(WeakMap2);
        var symbolProto2 = Symbol2 ? Symbol2.prototype : undefined$1, symbolValueOf2 = symbolProto2 ? symbolProto2.valueOf : undefined$1, symbolToString2 = symbolProto2 ? symbolProto2.toString : undefined$1;
        function lodash2(value) {
          if (isObjectLike2(value) && !isArray2(value) && !(value instanceof LazyWrapper)) {
            if (value instanceof LodashWrapper) {
              return value;
            }
            if (hasOwnProperty2.call(value, "__wrapped__")) {
              return wrapperClone(value);
            }
          }
          return new LodashWrapper(value);
        }
        var baseCreate2 = function() {
          function object2() {
          }
          return function(proto) {
            if (!isObject2(proto)) {
              return {};
            }
            if (objectCreate2) {
              return objectCreate2(proto);
            }
            object2.prototype = proto;
            var result2 = new object2();
            object2.prototype = undefined$1;
            return result2;
          };
        }();
        function baseLodash() {
        }
        function LodashWrapper(value, chainAll) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__chain__ = !!chainAll;
          this.__index__ = 0;
          this.__values__ = undefined$1;
        }
        lodash2.templateSettings = {
          "escape": reEscape2,
          "evaluate": reEvaluate2,
          "interpolate": reInterpolate2,
          "variable": "",
          "imports": {
            "_": lodash2
          }
        };
        lodash2.prototype = baseLodash.prototype;
        lodash2.prototype.constructor = lodash2;
        LodashWrapper.prototype = baseCreate2(baseLodash.prototype);
        LodashWrapper.prototype.constructor = LodashWrapper;
        function LazyWrapper(value) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__dir__ = 1;
          this.__filtered__ = false;
          this.__iteratees__ = [];
          this.__takeCount__ = MAX_ARRAY_LENGTH;
          this.__views__ = [];
        }
        function lazyClone() {
          var result2 = new LazyWrapper(this.__wrapped__);
          result2.__actions__ = copyArray2(this.__actions__);
          result2.__dir__ = this.__dir__;
          result2.__filtered__ = this.__filtered__;
          result2.__iteratees__ = copyArray2(this.__iteratees__);
          result2.__takeCount__ = this.__takeCount__;
          result2.__views__ = copyArray2(this.__views__);
          return result2;
        }
        function lazyReverse() {
          if (this.__filtered__) {
            var result2 = new LazyWrapper(this);
            result2.__dir__ = -1;
            result2.__filtered__ = true;
          } else {
            result2 = this.clone();
            result2.__dir__ *= -1;
          }
          return result2;
        }
        function lazyValue() {
          var array2 = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray2(array2), isRight = dir < 0, arrLength = isArr ? array2.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end2 = view.end, length = end2 - start, index2 = isRight ? end2 : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin2(length, this.__takeCount__);
          if (!isArr || !isRight && arrLength == length && takeCount == length) {
            return baseWrapperValue(array2, this.__actions__);
          }
          var result2 = [];
          outer:
            while (length-- && resIndex < takeCount) {
              index2 += dir;
              var iterIndex = -1, value = array2[index2];
              while (++iterIndex < iterLength) {
                var data = iteratees[iterIndex], iteratee2 = data.iteratee, type2 = data.type, computed2 = iteratee2(value);
                if (type2 == LAZY_MAP_FLAG) {
                  value = computed2;
                } else if (!computed2) {
                  if (type2 == LAZY_FILTER_FLAG) {
                    continue outer;
                  } else {
                    break outer;
                  }
                }
              }
              result2[resIndex++] = value;
            }
          return result2;
        }
        LazyWrapper.prototype = baseCreate2(baseLodash.prototype);
        LazyWrapper.prototype.constructor = LazyWrapper;
        function Hash2(entries) {
          var index2 = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index2 < length) {
            var entry = entries[index2];
            this.set(entry[0], entry[1]);
          }
        }
        function hashClear2() {
          this.__data__ = nativeCreate2 ? nativeCreate2(null) : {};
          this.size = 0;
        }
        function hashDelete2(key) {
          var result2 = this.has(key) && delete this.__data__[key];
          this.size -= result2 ? 1 : 0;
          return result2;
        }
        function hashGet2(key) {
          var data = this.__data__;
          if (nativeCreate2) {
            var result2 = data[key];
            return result2 === HASH_UNDEFINED2 ? undefined$1 : result2;
          }
          return hasOwnProperty2.call(data, key) ? data[key] : undefined$1;
        }
        function hashHas2(key) {
          var data = this.__data__;
          return nativeCreate2 ? data[key] !== undefined$1 : hasOwnProperty2.call(data, key);
        }
        function hashSet2(key, value) {
          var data = this.__data__;
          this.size += this.has(key) ? 0 : 1;
          data[key] = nativeCreate2 && value === undefined$1 ? HASH_UNDEFINED2 : value;
          return this;
        }
        Hash2.prototype.clear = hashClear2;
        Hash2.prototype["delete"] = hashDelete2;
        Hash2.prototype.get = hashGet2;
        Hash2.prototype.has = hashHas2;
        Hash2.prototype.set = hashSet2;
        function ListCache2(entries) {
          var index2 = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index2 < length) {
            var entry = entries[index2];
            this.set(entry[0], entry[1]);
          }
        }
        function listCacheClear2() {
          this.__data__ = [];
          this.size = 0;
        }
        function listCacheDelete2(key) {
          var data = this.__data__, index2 = assocIndexOf2(data, key);
          if (index2 < 0) {
            return false;
          }
          var lastIndex = data.length - 1;
          if (index2 == lastIndex) {
            data.pop();
          } else {
            splice2.call(data, index2, 1);
          }
          --this.size;
          return true;
        }
        function listCacheGet2(key) {
          var data = this.__data__, index2 = assocIndexOf2(data, key);
          return index2 < 0 ? undefined$1 : data[index2][1];
        }
        function listCacheHas2(key) {
          return assocIndexOf2(this.__data__, key) > -1;
        }
        function listCacheSet2(key, value) {
          var data = this.__data__, index2 = assocIndexOf2(data, key);
          if (index2 < 0) {
            ++this.size;
            data.push([key, value]);
          } else {
            data[index2][1] = value;
          }
          return this;
        }
        ListCache2.prototype.clear = listCacheClear2;
        ListCache2.prototype["delete"] = listCacheDelete2;
        ListCache2.prototype.get = listCacheGet2;
        ListCache2.prototype.has = listCacheHas2;
        ListCache2.prototype.set = listCacheSet2;
        function MapCache2(entries) {
          var index2 = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index2 < length) {
            var entry = entries[index2];
            this.set(entry[0], entry[1]);
          }
        }
        function mapCacheClear2() {
          this.size = 0;
          this.__data__ = {
            "hash": new Hash2(),
            "map": new (Map2 || ListCache2)(),
            "string": new Hash2()
          };
        }
        function mapCacheDelete2(key) {
          var result2 = getMapData2(this, key)["delete"](key);
          this.size -= result2 ? 1 : 0;
          return result2;
        }
        function mapCacheGet2(key) {
          return getMapData2(this, key).get(key);
        }
        function mapCacheHas2(key) {
          return getMapData2(this, key).has(key);
        }
        function mapCacheSet2(key, value) {
          var data = getMapData2(this, key), size2 = data.size;
          data.set(key, value);
          this.size += data.size == size2 ? 0 : 1;
          return this;
        }
        MapCache2.prototype.clear = mapCacheClear2;
        MapCache2.prototype["delete"] = mapCacheDelete2;
        MapCache2.prototype.get = mapCacheGet2;
        MapCache2.prototype.has = mapCacheHas2;
        MapCache2.prototype.set = mapCacheSet2;
        function SetCache2(values2) {
          var index2 = -1, length = values2 == null ? 0 : values2.length;
          this.__data__ = new MapCache2();
          while (++index2 < length) {
            this.add(values2[index2]);
          }
        }
        function setCacheAdd2(value) {
          this.__data__.set(value, HASH_UNDEFINED2);
          return this;
        }
        function setCacheHas2(value) {
          return this.__data__.has(value);
        }
        SetCache2.prototype.add = SetCache2.prototype.push = setCacheAdd2;
        SetCache2.prototype.has = setCacheHas2;
        function Stack2(entries) {
          var data = this.__data__ = new ListCache2(entries);
          this.size = data.size;
        }
        function stackClear2() {
          this.__data__ = new ListCache2();
          this.size = 0;
        }
        function stackDelete2(key) {
          var data = this.__data__, result2 = data["delete"](key);
          this.size = data.size;
          return result2;
        }
        function stackGet2(key) {
          return this.__data__.get(key);
        }
        function stackHas2(key) {
          return this.__data__.has(key);
        }
        function stackSet2(key, value) {
          var data = this.__data__;
          if (data instanceof ListCache2) {
            var pairs = data.__data__;
            if (!Map2 || pairs.length < LARGE_ARRAY_SIZE2 - 1) {
              pairs.push([key, value]);
              this.size = ++data.size;
              return this;
            }
            data = this.__data__ = new MapCache2(pairs);
          }
          data.set(key, value);
          this.size = data.size;
          return this;
        }
        Stack2.prototype.clear = stackClear2;
        Stack2.prototype["delete"] = stackDelete2;
        Stack2.prototype.get = stackGet2;
        Stack2.prototype.has = stackHas2;
        Stack2.prototype.set = stackSet2;
        function arrayLikeKeys2(value, inherited) {
          var isArr = isArray2(value), isArg = !isArr && isArguments2(value), isBuff = !isArr && !isArg && isBuffer2(value), isType = !isArr && !isArg && !isBuff && isTypedArray2(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes2(value.length, String2) : [], length = result2.length;
          for (var key in value) {
            if ((inherited || hasOwnProperty2.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex2(key, length)))) {
              result2.push(key);
            }
          }
          return result2;
        }
        function arraySample(array2) {
          var length = array2.length;
          return length ? array2[baseRandom(0, length - 1)] : undefined$1;
        }
        function arraySampleSize(array2, n) {
          return shuffleSelf(copyArray2(array2), baseClamp(n, 0, array2.length));
        }
        function arrayShuffle(array2) {
          return shuffleSelf(copyArray2(array2));
        }
        function assignMergeValue(object2, key, value) {
          if (value !== undefined$1 && !eq2(object2[key], value) || value === undefined$1 && !(key in object2)) {
            baseAssignValue2(object2, key, value);
          }
        }
        function assignValue2(object2, key, value) {
          var objValue = object2[key];
          if (!(hasOwnProperty2.call(object2, key) && eq2(objValue, value)) || value === undefined$1 && !(key in object2)) {
            baseAssignValue2(object2, key, value);
          }
        }
        function assocIndexOf2(array2, key) {
          var length = array2.length;
          while (length--) {
            if (eq2(array2[length][0], key)) {
              return length;
            }
          }
          return -1;
        }
        function baseAggregator(collection, setter, iteratee2, accumulator) {
          baseEach(collection, function(value, key, collection2) {
            setter(accumulator, value, iteratee2(value), collection2);
          });
          return accumulator;
        }
        function baseAssign2(object2, source) {
          return object2 && copyObject2(source, keys2(source), object2);
        }
        function baseAssignIn2(object2, source) {
          return object2 && copyObject2(source, keysIn2(source), object2);
        }
        function baseAssignValue2(object2, key, value) {
          if (key == "__proto__" && defineProperty2) {
            defineProperty2(object2, key, {
              "configurable": true,
              "enumerable": true,
              "value": value,
              "writable": true
            });
          } else {
            object2[key] = value;
          }
        }
        function baseAt(object2, paths) {
          var index2 = -1, length = paths.length, result2 = Array2(length), skip = object2 == null;
          while (++index2 < length) {
            result2[index2] = skip ? undefined$1 : get2(object2, paths[index2]);
          }
          return result2;
        }
        function baseClamp(number2, lower, upper) {
          if (number2 === number2) {
            if (upper !== undefined$1) {
              number2 = number2 <= upper ? number2 : upper;
            }
            if (lower !== undefined$1) {
              number2 = number2 >= lower ? number2 : lower;
            }
          }
          return number2;
        }
        function baseClone2(value, bitmask, customizer, key, object2, stack) {
          var result2, isDeep = bitmask & CLONE_DEEP_FLAG2, isFlat = bitmask & CLONE_FLAT_FLAG2, isFull = bitmask & CLONE_SYMBOLS_FLAG2;
          if (customizer) {
            result2 = object2 ? customizer(value, key, object2, stack) : customizer(value);
          }
          if (result2 !== undefined$1) {
            return result2;
          }
          if (!isObject2(value)) {
            return value;
          }
          var isArr = isArray2(value);
          if (isArr) {
            result2 = initCloneArray2(value);
            if (!isDeep) {
              return copyArray2(value, result2);
            }
          } else {
            var tag = getTag2(value), isFunc = tag == funcTag2 || tag == genTag2;
            if (isBuffer2(value)) {
              return cloneBuffer2(value, isDeep);
            }
            if (tag == objectTag2 || tag == argsTag2 || isFunc && !object2) {
              result2 = isFlat || isFunc ? {} : initCloneObject2(value);
              if (!isDeep) {
                return isFlat ? copySymbolsIn2(value, baseAssignIn2(result2, value)) : copySymbols2(value, baseAssign2(result2, value));
              }
            } else {
              if (!cloneableTags2[tag]) {
                return object2 ? value : {};
              }
              result2 = initCloneByTag2(value, tag, isDeep);
            }
          }
          stack || (stack = new Stack2());
          var stacked = stack.get(value);
          if (stacked) {
            return stacked;
          }
          stack.set(value, result2);
          if (isSet2(value)) {
            value.forEach(function(subValue) {
              result2.add(baseClone2(subValue, bitmask, customizer, subValue, value, stack));
            });
          } else if (isMap2(value)) {
            value.forEach(function(subValue, key2) {
              result2.set(key2, baseClone2(subValue, bitmask, customizer, key2, value, stack));
            });
          }
          var keysFunc = isFull ? isFlat ? getAllKeysIn2 : getAllKeys2 : isFlat ? keysIn2 : keys2;
          var props = isArr ? undefined$1 : keysFunc(value);
          arrayEach2(props || value, function(subValue, key2) {
            if (props) {
              key2 = subValue;
              subValue = value[key2];
            }
            assignValue2(result2, key2, baseClone2(subValue, bitmask, customizer, key2, value, stack));
          });
          return result2;
        }
        function baseConforms(source) {
          var props = keys2(source);
          return function(object2) {
            return baseConformsTo(object2, source, props);
          };
        }
        function baseConformsTo(object2, source, props) {
          var length = props.length;
          if (object2 == null) {
            return !length;
          }
          object2 = Object2(object2);
          while (length--) {
            var key = props[length], predicate = source[key], value = object2[key];
            if (value === undefined$1 && !(key in object2) || !predicate(value)) {
              return false;
            }
          }
          return true;
        }
        function baseDelay(func, wait, args) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT2);
          }
          return setTimeout2(function() {
            func.apply(undefined$1, args);
          }, wait);
        }
        function baseDifference(array2, values2, iteratee2, comparator) {
          var index2 = -1, includes2 = arrayIncludes, isCommon = true, length = array2.length, result2 = [], valuesLength = values2.length;
          if (!length) {
            return result2;
          }
          if (iteratee2) {
            values2 = arrayMap2(values2, baseUnary2(iteratee2));
          }
          if (comparator) {
            includes2 = arrayIncludesWith;
            isCommon = false;
          } else if (values2.length >= LARGE_ARRAY_SIZE2) {
            includes2 = cacheHas2;
            isCommon = false;
            values2 = new SetCache2(values2);
          }
          outer:
            while (++index2 < length) {
              var value = array2[index2], computed2 = iteratee2 == null ? value : iteratee2(value);
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed2 === computed2) {
                var valuesIndex = valuesLength;
                while (valuesIndex--) {
                  if (values2[valuesIndex] === computed2) {
                    continue outer;
                  }
                }
                result2.push(value);
              } else if (!includes2(values2, computed2, comparator)) {
                result2.push(value);
              }
            }
          return result2;
        }
        var baseEach = createBaseEach(baseForOwn2);
        var baseEachRight = createBaseEach(baseForOwnRight, true);
        function baseEvery(collection, predicate) {
          var result2 = true;
          baseEach(collection, function(value, index2, collection2) {
            result2 = !!predicate(value, index2, collection2);
            return result2;
          });
          return result2;
        }
        function baseExtremum(array2, iteratee2, comparator) {
          var index2 = -1, length = array2.length;
          while (++index2 < length) {
            var value = array2[index2], current = iteratee2(value);
            if (current != null && (computed2 === undefined$1 ? current === current && !isSymbol2(current) : comparator(current, computed2))) {
              var computed2 = current, result2 = value;
            }
          }
          return result2;
        }
        function baseFill(array2, value, start, end2) {
          var length = array2.length;
          start = toInteger(start);
          if (start < 0) {
            start = -start > length ? 0 : length + start;
          }
          end2 = end2 === undefined$1 || end2 > length ? length : toInteger(end2);
          if (end2 < 0) {
            end2 += length;
          }
          end2 = start > end2 ? 0 : toLength(end2);
          while (start < end2) {
            array2[start++] = value;
          }
          return array2;
        }
        function baseFilter(collection, predicate) {
          var result2 = [];
          baseEach(collection, function(value, index2, collection2) {
            if (predicate(value, index2, collection2)) {
              result2.push(value);
            }
          });
          return result2;
        }
        function baseFlatten(array2, depth, predicate, isStrict, result2) {
          var index2 = -1, length = array2.length;
          predicate || (predicate = isFlattenable);
          result2 || (result2 = []);
          while (++index2 < length) {
            var value = array2[index2];
            if (depth > 0 && predicate(value)) {
              if (depth > 1) {
                baseFlatten(value, depth - 1, predicate, isStrict, result2);
              } else {
                arrayPush2(result2, value);
              }
            } else if (!isStrict) {
              result2[result2.length] = value;
            }
          }
          return result2;
        }
        var baseFor2 = createBaseFor2();
        var baseForRight = createBaseFor2(true);
        function baseForOwn2(object2, iteratee2) {
          return object2 && baseFor2(object2, iteratee2, keys2);
        }
        function baseForOwnRight(object2, iteratee2) {
          return object2 && baseForRight(object2, iteratee2, keys2);
        }
        function baseFunctions(object2, props) {
          return arrayFilter2(props, function(key) {
            return isFunction2(object2[key]);
          });
        }
        function baseGet2(object2, path) {
          path = castPath2(path, object2);
          var index2 = 0, length = path.length;
          while (object2 != null && index2 < length) {
            object2 = object2[toKey2(path[index2++])];
          }
          return index2 && index2 == length ? object2 : undefined$1;
        }
        function baseGetAllKeys2(object2, keysFunc, symbolsFunc) {
          var result2 = keysFunc(object2);
          return isArray2(object2) ? result2 : arrayPush2(result2, symbolsFunc(object2));
        }
        function baseGetTag2(value) {
          if (value == null) {
            return value === undefined$1 ? undefinedTag2 : nullTag2;
          }
          return symToStringTag2 && symToStringTag2 in Object2(value) ? getRawTag2(value) : objectToString2(value);
        }
        function baseGt(value, other) {
          return value > other;
        }
        function baseHas(object2, key) {
          return object2 != null && hasOwnProperty2.call(object2, key);
        }
        function baseHasIn(object2, key) {
          return object2 != null && key in Object2(object2);
        }
        function baseInRange(number2, start, end2) {
          return number2 >= nativeMin2(start, end2) && number2 < nativeMax2(start, end2);
        }
        function baseIntersection(arrays, iteratee2, comparator) {
          var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array2(othLength), maxLength = Infinity, result2 = [];
          while (othIndex--) {
            var array2 = arrays[othIndex];
            if (othIndex && iteratee2) {
              array2 = arrayMap2(array2, baseUnary2(iteratee2));
            }
            maxLength = nativeMin2(array2.length, maxLength);
            caches[othIndex] = !comparator && (iteratee2 || length >= 120 && array2.length >= 120) ? new SetCache2(othIndex && array2) : undefined$1;
          }
          array2 = arrays[0];
          var index2 = -1, seen = caches[0];
          outer:
            while (++index2 < length && result2.length < maxLength) {
              var value = array2[index2], computed2 = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (!(seen ? cacheHas2(seen, computed2) : includes2(result2, computed2, comparator))) {
                othIndex = othLength;
                while (--othIndex) {
                  var cache = caches[othIndex];
                  if (!(cache ? cacheHas2(cache, computed2) : includes2(arrays[othIndex], computed2, comparator))) {
                    continue outer;
                  }
                }
                if (seen) {
                  seen.push(computed2);
                }
                result2.push(value);
              }
            }
          return result2;
        }
        function baseInverter2(object2, setter, iteratee2, accumulator) {
          baseForOwn2(object2, function(value, key, object3) {
            setter(accumulator, iteratee2(value), key, object3);
          });
          return accumulator;
        }
        function baseInvoke(object2, path, args) {
          path = castPath2(path, object2);
          object2 = parent(object2, path);
          var func = object2 == null ? object2 : object2[toKey2(last2(path))];
          return func == null ? undefined$1 : apply2(func, object2, args);
        }
        function baseIsArguments2(value) {
          return isObjectLike2(value) && baseGetTag2(value) == argsTag2;
        }
        function baseIsArrayBuffer(value) {
          return isObjectLike2(value) && baseGetTag2(value) == arrayBufferTag2;
        }
        function baseIsDate(value) {
          return isObjectLike2(value) && baseGetTag2(value) == dateTag2;
        }
        function baseIsEqual2(value, other, bitmask, customizer, stack) {
          if (value === other) {
            return true;
          }
          if (value == null || other == null || !isObjectLike2(value) && !isObjectLike2(other)) {
            return value !== value && other !== other;
          }
          return baseIsEqualDeep2(value, other, bitmask, customizer, baseIsEqual2, stack);
        }
        function baseIsEqualDeep2(object2, other, bitmask, customizer, equalFunc, stack) {
          var objIsArr = isArray2(object2), othIsArr = isArray2(other), objTag = objIsArr ? arrayTag2 : getTag2(object2), othTag = othIsArr ? arrayTag2 : getTag2(other);
          objTag = objTag == argsTag2 ? objectTag2 : objTag;
          othTag = othTag == argsTag2 ? objectTag2 : othTag;
          var objIsObj = objTag == objectTag2, othIsObj = othTag == objectTag2, isSameTag = objTag == othTag;
          if (isSameTag && isBuffer2(object2)) {
            if (!isBuffer2(other)) {
              return false;
            }
            objIsArr = true;
            objIsObj = false;
          }
          if (isSameTag && !objIsObj) {
            stack || (stack = new Stack2());
            return objIsArr || isTypedArray2(object2) ? equalArrays2(object2, other, bitmask, customizer, equalFunc, stack) : equalByTag2(object2, other, objTag, bitmask, customizer, equalFunc, stack);
          }
          if (!(bitmask & COMPARE_PARTIAL_FLAG2)) {
            var objIsWrapped = objIsObj && hasOwnProperty2.call(object2, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty2.call(other, "__wrapped__");
            if (objIsWrapped || othIsWrapped) {
              var objUnwrapped = objIsWrapped ? object2.value() : object2, othUnwrapped = othIsWrapped ? other.value() : other;
              stack || (stack = new Stack2());
              return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
            }
          }
          if (!isSameTag) {
            return false;
          }
          stack || (stack = new Stack2());
          return equalObjects2(object2, other, bitmask, customizer, equalFunc, stack);
        }
        function baseIsMap2(value) {
          return isObjectLike2(value) && getTag2(value) == mapTag2;
        }
        function baseIsMatch(object2, source, matchData, customizer) {
          var index2 = matchData.length, length = index2, noCustomizer = !customizer;
          if (object2 == null) {
            return !length;
          }
          object2 = Object2(object2);
          while (index2--) {
            var data = matchData[index2];
            if (noCustomizer && data[2] ? data[1] !== object2[data[0]] : !(data[0] in object2)) {
              return false;
            }
          }
          while (++index2 < length) {
            data = matchData[index2];
            var key = data[0], objValue = object2[key], srcValue = data[1];
            if (noCustomizer && data[2]) {
              if (objValue === undefined$1 && !(key in object2)) {
                return false;
              }
            } else {
              var stack = new Stack2();
              if (customizer) {
                var result2 = customizer(objValue, srcValue, key, object2, source, stack);
              }
              if (!(result2 === undefined$1 ? baseIsEqual2(srcValue, objValue, COMPARE_PARTIAL_FLAG2 | COMPARE_UNORDERED_FLAG2, customizer, stack) : result2)) {
                return false;
              }
            }
          }
          return true;
        }
        function baseIsNative2(value) {
          if (!isObject2(value) || isMasked2(value)) {
            return false;
          }
          var pattern2 = isFunction2(value) ? reIsNative2 : reIsHostCtor2;
          return pattern2.test(toSource2(value));
        }
        function baseIsRegExp(value) {
          return isObjectLike2(value) && baseGetTag2(value) == regexpTag2;
        }
        function baseIsSet2(value) {
          return isObjectLike2(value) && getTag2(value) == setTag2;
        }
        function baseIsTypedArray2(value) {
          return isObjectLike2(value) && isLength2(value.length) && !!typedArrayTags2[baseGetTag2(value)];
        }
        function baseIteratee(value) {
          if (typeof value == "function") {
            return value;
          }
          if (value == null) {
            return identity2;
          }
          if (typeof value == "object") {
            return isArray2(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
          }
          return property(value);
        }
        function baseKeys2(object2) {
          if (!isPrototype2(object2)) {
            return nativeKeys2(object2);
          }
          var result2 = [];
          for (var key in Object2(object2)) {
            if (hasOwnProperty2.call(object2, key) && key != "constructor") {
              result2.push(key);
            }
          }
          return result2;
        }
        function baseKeysIn2(object2) {
          if (!isObject2(object2)) {
            return nativeKeysIn2(object2);
          }
          var isProto = isPrototype2(object2), result2 = [];
          for (var key in object2) {
            if (!(key == "constructor" && (isProto || !hasOwnProperty2.call(object2, key)))) {
              result2.push(key);
            }
          }
          return result2;
        }
        function baseLt(value, other) {
          return value < other;
        }
        function baseMap(collection, iteratee2) {
          var index2 = -1, result2 = isArrayLike2(collection) ? Array2(collection.length) : [];
          baseEach(collection, function(value, key, collection2) {
            result2[++index2] = iteratee2(value, key, collection2);
          });
          return result2;
        }
        function baseMatches(source) {
          var matchData = getMatchData(source);
          if (matchData.length == 1 && matchData[0][2]) {
            return matchesStrictComparable(matchData[0][0], matchData[0][1]);
          }
          return function(object2) {
            return object2 === source || baseIsMatch(object2, source, matchData);
          };
        }
        function baseMatchesProperty(path, srcValue) {
          if (isKey2(path) && isStrictComparable(srcValue)) {
            return matchesStrictComparable(toKey2(path), srcValue);
          }
          return function(object2) {
            var objValue = get2(object2, path);
            return objValue === undefined$1 && objValue === srcValue ? hasIn(object2, path) : baseIsEqual2(srcValue, objValue, COMPARE_PARTIAL_FLAG2 | COMPARE_UNORDERED_FLAG2);
          };
        }
        function baseMerge(object2, source, srcIndex, customizer, stack) {
          if (object2 === source) {
            return;
          }
          baseFor2(source, function(srcValue, key) {
            stack || (stack = new Stack2());
            if (isObject2(srcValue)) {
              baseMergeDeep(object2, source, key, srcIndex, baseMerge, customizer, stack);
            } else {
              var newValue = customizer ? customizer(safeGet(object2, key), srcValue, key + "", object2, source, stack) : undefined$1;
              if (newValue === undefined$1) {
                newValue = srcValue;
              }
              assignMergeValue(object2, key, newValue);
            }
          }, keysIn2);
        }
        function baseMergeDeep(object2, source, key, srcIndex, mergeFunc, customizer, stack) {
          var objValue = safeGet(object2, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
          if (stacked) {
            assignMergeValue(object2, key, stacked);
            return;
          }
          var newValue = customizer ? customizer(objValue, srcValue, key + "", object2, source, stack) : undefined$1;
          var isCommon = newValue === undefined$1;
          if (isCommon) {
            var isArr = isArray2(srcValue), isBuff = !isArr && isBuffer2(srcValue), isTyped = !isArr && !isBuff && isTypedArray2(srcValue);
            newValue = srcValue;
            if (isArr || isBuff || isTyped) {
              if (isArray2(objValue)) {
                newValue = objValue;
              } else if (isArrayLikeObject(objValue)) {
                newValue = copyArray2(objValue);
              } else if (isBuff) {
                isCommon = false;
                newValue = cloneBuffer2(srcValue, true);
              } else if (isTyped) {
                isCommon = false;
                newValue = cloneTypedArray2(srcValue, true);
              } else {
                newValue = [];
              }
            } else if (isPlainObject2(srcValue) || isArguments2(srcValue)) {
              newValue = objValue;
              if (isArguments2(objValue)) {
                newValue = toPlainObject(objValue);
              } else if (!isObject2(objValue) || isFunction2(objValue)) {
                newValue = initCloneObject2(srcValue);
              }
            } else {
              isCommon = false;
            }
          }
          if (isCommon) {
            stack.set(srcValue, newValue);
            mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
            stack["delete"](srcValue);
          }
          assignMergeValue(object2, key, newValue);
        }
        function baseNth(array2, n) {
          var length = array2.length;
          if (!length) {
            return;
          }
          n += n < 0 ? length : 0;
          return isIndex2(n, length) ? array2[n] : undefined$1;
        }
        function baseOrderBy(collection, iteratees, orders) {
          if (iteratees.length) {
            iteratees = arrayMap2(iteratees, function(iteratee2) {
              if (isArray2(iteratee2)) {
                return function(value) {
                  return baseGet2(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
                };
              }
              return iteratee2;
            });
          } else {
            iteratees = [identity2];
          }
          var index2 = -1;
          iteratees = arrayMap2(iteratees, baseUnary2(getIteratee()));
          var result2 = baseMap(collection, function(value, key, collection2) {
            var criteria = arrayMap2(iteratees, function(iteratee2) {
              return iteratee2(value);
            });
            return { "criteria": criteria, "index": ++index2, "value": value };
          });
          return baseSortBy(result2, function(object2, other) {
            return compareMultiple(object2, other, orders);
          });
        }
        function basePick(object2, paths) {
          return basePickBy(object2, paths, function(value, path) {
            return hasIn(object2, path);
          });
        }
        function basePickBy(object2, paths, predicate) {
          var index2 = -1, length = paths.length, result2 = {};
          while (++index2 < length) {
            var path = paths[index2], value = baseGet2(object2, path);
            if (predicate(value, path)) {
              baseSet2(result2, castPath2(path, object2), value);
            }
          }
          return result2;
        }
        function basePropertyDeep(path) {
          return function(object2) {
            return baseGet2(object2, path);
          };
        }
        function basePullAll(array2, values2, iteratee2, comparator) {
          var indexOf2 = comparator ? baseIndexOfWith : baseIndexOf, index2 = -1, length = values2.length, seen = array2;
          if (array2 === values2) {
            values2 = copyArray2(values2);
          }
          if (iteratee2) {
            seen = arrayMap2(array2, baseUnary2(iteratee2));
          }
          while (++index2 < length) {
            var fromIndex = 0, value = values2[index2], computed2 = iteratee2 ? iteratee2(value) : value;
            while ((fromIndex = indexOf2(seen, computed2, fromIndex, comparator)) > -1) {
              if (seen !== array2) {
                splice2.call(seen, fromIndex, 1);
              }
              splice2.call(array2, fromIndex, 1);
            }
          }
          return array2;
        }
        function basePullAt(array2, indexes) {
          var length = array2 ? indexes.length : 0, lastIndex = length - 1;
          while (length--) {
            var index2 = indexes[length];
            if (length == lastIndex || index2 !== previous) {
              var previous = index2;
              if (isIndex2(index2)) {
                splice2.call(array2, index2, 1);
              } else {
                baseUnset(array2, index2);
              }
            }
          }
          return array2;
        }
        function baseRandom(lower, upper) {
          return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
        }
        function baseRange(start, end2, step, fromRight) {
          var index2 = -1, length = nativeMax2(nativeCeil((end2 - start) / (step || 1)), 0), result2 = Array2(length);
          while (length--) {
            result2[fromRight ? length : ++index2] = start;
            start += step;
          }
          return result2;
        }
        function baseRepeat(string2, n) {
          var result2 = "";
          if (!string2 || n < 1 || n > MAX_SAFE_INTEGER2) {
            return result2;
          }
          do {
            if (n % 2) {
              result2 += string2;
            }
            n = nativeFloor(n / 2);
            if (n) {
              string2 += string2;
            }
          } while (n);
          return result2;
        }
        function baseRest2(func, start) {
          return setToString2(overRest2(func, start, identity2), func + "");
        }
        function baseSample(collection) {
          return arraySample(values(collection));
        }
        function baseSampleSize(collection, n) {
          var array2 = values(collection);
          return shuffleSelf(array2, baseClamp(n, 0, array2.length));
        }
        function baseSet2(object2, path, value, customizer) {
          if (!isObject2(object2)) {
            return object2;
          }
          path = castPath2(path, object2);
          var index2 = -1, length = path.length, lastIndex = length - 1, nested = object2;
          while (nested != null && ++index2 < length) {
            var key = toKey2(path[index2]), newValue = value;
            if (key === "__proto__" || key === "constructor" || key === "prototype") {
              return object2;
            }
            if (index2 != lastIndex) {
              var objValue = nested[key];
              newValue = customizer ? customizer(objValue, key, nested) : undefined$1;
              if (newValue === undefined$1) {
                newValue = isObject2(objValue) ? objValue : isIndex2(path[index2 + 1]) ? [] : {};
              }
            }
            assignValue2(nested, key, newValue);
            nested = nested[key];
          }
          return object2;
        }
        var baseSetData = !metaMap ? identity2 : function(func, data) {
          metaMap.set(func, data);
          return func;
        };
        var baseSetToString2 = !defineProperty2 ? identity2 : function(func, string2) {
          return defineProperty2(func, "toString", {
            "configurable": true,
            "enumerable": false,
            "value": constant2(string2),
            "writable": true
          });
        };
        function baseShuffle(collection) {
          return shuffleSelf(values(collection));
        }
        function baseSlice2(array2, start, end2) {
          var index2 = -1, length = array2.length;
          if (start < 0) {
            start = -start > length ? 0 : length + start;
          }
          end2 = end2 > length ? length : end2;
          if (end2 < 0) {
            end2 += length;
          }
          length = start > end2 ? 0 : end2 - start >>> 0;
          start >>>= 0;
          var result2 = Array2(length);
          while (++index2 < length) {
            result2[index2] = array2[index2 + start];
          }
          return result2;
        }
        function baseSome(collection, predicate) {
          var result2;
          baseEach(collection, function(value, index2, collection2) {
            result2 = predicate(value, index2, collection2);
            return !result2;
          });
          return !!result2;
        }
        function baseSortedIndex(array2, value, retHighest) {
          var low = 0, high = array2 == null ? low : array2.length;
          if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
            while (low < high) {
              var mid = low + high >>> 1, computed2 = array2[mid];
              if (computed2 !== null && !isSymbol2(computed2) && (retHighest ? computed2 <= value : computed2 < value)) {
                low = mid + 1;
              } else {
                high = mid;
              }
            }
            return high;
          }
          return baseSortedIndexBy(array2, value, identity2, retHighest);
        }
        function baseSortedIndexBy(array2, value, iteratee2, retHighest) {
          var low = 0, high = array2 == null ? 0 : array2.length;
          if (high === 0) {
            return 0;
          }
          value = iteratee2(value);
          var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol2(value), valIsUndefined = value === undefined$1;
          while (low < high) {
            var mid = nativeFloor((low + high) / 2), computed2 = iteratee2(array2[mid]), othIsDefined = computed2 !== undefined$1, othIsNull = computed2 === null, othIsReflexive = computed2 === computed2, othIsSymbol = isSymbol2(computed2);
            if (valIsNaN) {
              var setLow = retHighest || othIsReflexive;
            } else if (valIsUndefined) {
              setLow = othIsReflexive && (retHighest || othIsDefined);
            } else if (valIsNull) {
              setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
            } else if (valIsSymbol) {
              setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
            } else if (othIsNull || othIsSymbol) {
              setLow = false;
            } else {
              setLow = retHighest ? computed2 <= value : computed2 < value;
            }
            if (setLow) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }
          return nativeMin2(high, MAX_ARRAY_INDEX);
        }
        function baseSortedUniq(array2, iteratee2) {
          var index2 = -1, length = array2.length, resIndex = 0, result2 = [];
          while (++index2 < length) {
            var value = array2[index2], computed2 = iteratee2 ? iteratee2(value) : value;
            if (!index2 || !eq2(computed2, seen)) {
              var seen = computed2;
              result2[resIndex++] = value === 0 ? 0 : value;
            }
          }
          return result2;
        }
        function baseToNumber(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol2(value)) {
            return NAN2;
          }
          return +value;
        }
        function baseToString2(value) {
          if (typeof value == "string") {
            return value;
          }
          if (isArray2(value)) {
            return arrayMap2(value, baseToString2) + "";
          }
          if (isSymbol2(value)) {
            return symbolToString2 ? symbolToString2.call(value) : "";
          }
          var result2 = value + "";
          return result2 == "0" && 1 / value == -INFINITY2 ? "-0" : result2;
        }
        function baseUniq(array2, iteratee2, comparator) {
          var index2 = -1, includes2 = arrayIncludes, length = array2.length, isCommon = true, result2 = [], seen = result2;
          if (comparator) {
            isCommon = false;
            includes2 = arrayIncludesWith;
          } else if (length >= LARGE_ARRAY_SIZE2) {
            var set3 = iteratee2 ? null : createSet(array2);
            if (set3) {
              return setToArray2(set3);
            }
            isCommon = false;
            includes2 = cacheHas2;
            seen = new SetCache2();
          } else {
            seen = iteratee2 ? [] : result2;
          }
          outer:
            while (++index2 < length) {
              var value = array2[index2], computed2 = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed2 === computed2) {
                var seenIndex = seen.length;
                while (seenIndex--) {
                  if (seen[seenIndex] === computed2) {
                    continue outer;
                  }
                }
                if (iteratee2) {
                  seen.push(computed2);
                }
                result2.push(value);
              } else if (!includes2(seen, computed2, comparator)) {
                if (seen !== result2) {
                  seen.push(computed2);
                }
                result2.push(value);
              }
            }
          return result2;
        }
        function baseUnset(object2, path) {
          path = castPath2(path, object2);
          object2 = parent(object2, path);
          return object2 == null || delete object2[toKey2(last2(path))];
        }
        function baseUpdate(object2, path, updater, customizer) {
          return baseSet2(object2, path, updater(baseGet2(object2, path)), customizer);
        }
        function baseWhile(array2, predicate, isDrop, fromRight) {
          var length = array2.length, index2 = fromRight ? length : -1;
          while ((fromRight ? index2-- : ++index2 < length) && predicate(array2[index2], index2, array2)) {
          }
          return isDrop ? baseSlice2(array2, fromRight ? 0 : index2, fromRight ? index2 + 1 : length) : baseSlice2(array2, fromRight ? index2 + 1 : 0, fromRight ? length : index2);
        }
        function baseWrapperValue(value, actions) {
          var result2 = value;
          if (result2 instanceof LazyWrapper) {
            result2 = result2.value();
          }
          return arrayReduce2(actions, function(result3, action) {
            return action.func.apply(action.thisArg, arrayPush2([result3], action.args));
          }, result2);
        }
        function baseXor(arrays, iteratee2, comparator) {
          var length = arrays.length;
          if (length < 2) {
            return length ? baseUniq(arrays[0]) : [];
          }
          var index2 = -1, result2 = Array2(length);
          while (++index2 < length) {
            var array2 = arrays[index2], othIndex = -1;
            while (++othIndex < length) {
              if (othIndex != index2) {
                result2[index2] = baseDifference(result2[index2] || array2, arrays[othIndex], iteratee2, comparator);
              }
            }
          }
          return baseUniq(baseFlatten(result2, 1), iteratee2, comparator);
        }
        function baseZipObject(props, values2, assignFunc) {
          var index2 = -1, length = props.length, valsLength = values2.length, result2 = {};
          while (++index2 < length) {
            var value = index2 < valsLength ? values2[index2] : undefined$1;
            assignFunc(result2, props[index2], value);
          }
          return result2;
        }
        function castArrayLikeObject(value) {
          return isArrayLikeObject(value) ? value : [];
        }
        function castFunction(value) {
          return typeof value == "function" ? value : identity2;
        }
        function castPath2(value, object2) {
          if (isArray2(value)) {
            return value;
          }
          return isKey2(value, object2) ? [value] : stringToPath2(toString2(value));
        }
        var castRest = baseRest2;
        function castSlice2(array2, start, end2) {
          var length = array2.length;
          end2 = end2 === undefined$1 ? length : end2;
          return !start && end2 >= length ? array2 : baseSlice2(array2, start, end2);
        }
        var clearTimeout2 = ctxClearTimeout || function(id) {
          return root2.clearTimeout(id);
        };
        function cloneBuffer2(buffer, isDeep) {
          if (isDeep) {
            return buffer.slice();
          }
          var length = buffer.length, result2 = allocUnsafe2 ? allocUnsafe2(length) : new buffer.constructor(length);
          buffer.copy(result2);
          return result2;
        }
        function cloneArrayBuffer2(arrayBuffer) {
          var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
          new Uint8Array2(result2).set(new Uint8Array2(arrayBuffer));
          return result2;
        }
        function cloneDataView2(dataView, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer2(dataView.buffer) : dataView.buffer;
          return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
        }
        function cloneRegExp2(regexp2) {
          var result2 = new regexp2.constructor(regexp2.source, reFlags2.exec(regexp2));
          result2.lastIndex = regexp2.lastIndex;
          return result2;
        }
        function cloneSymbol2(symbol) {
          return symbolValueOf2 ? Object2(symbolValueOf2.call(symbol)) : {};
        }
        function cloneTypedArray2(typedArray, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer2(typedArray.buffer) : typedArray.buffer;
          return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
        }
        function compareAscending(value, other) {
          if (value !== other) {
            var valIsDefined = value !== undefined$1, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol2(value);
            var othIsDefined = other !== undefined$1, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol2(other);
            if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
              return 1;
            }
            if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
              return -1;
            }
          }
          return 0;
        }
        function compareMultiple(object2, other, orders) {
          var index2 = -1, objCriteria = object2.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
          while (++index2 < length) {
            var result2 = compareAscending(objCriteria[index2], othCriteria[index2]);
            if (result2) {
              if (index2 >= ordersLength) {
                return result2;
              }
              var order = orders[index2];
              return result2 * (order == "desc" ? -1 : 1);
            }
          }
          return object2.index - other.index;
        }
        function composeArgs(args, partials, holders, isCurried) {
          var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax2(argsLength - holdersLength, 0), result2 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
          while (++leftIndex < leftLength) {
            result2[leftIndex] = partials[leftIndex];
          }
          while (++argsIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result2[holders[argsIndex]] = args[argsIndex];
            }
          }
          while (rangeLength--) {
            result2[leftIndex++] = args[argsIndex++];
          }
          return result2;
        }
        function composeArgsRight(args, partials, holders, isCurried) {
          var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax2(argsLength - holdersLength, 0), result2 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
          while (++argsIndex < rangeLength) {
            result2[argsIndex] = args[argsIndex];
          }
          var offset = argsIndex;
          while (++rightIndex < rightLength) {
            result2[offset + rightIndex] = partials[rightIndex];
          }
          while (++holdersIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result2[offset + holders[holdersIndex]] = args[argsIndex++];
            }
          }
          return result2;
        }
        function copyArray2(source, array2) {
          var index2 = -1, length = source.length;
          array2 || (array2 = Array2(length));
          while (++index2 < length) {
            array2[index2] = source[index2];
          }
          return array2;
        }
        function copyObject2(source, props, object2, customizer) {
          var isNew = !object2;
          object2 || (object2 = {});
          var index2 = -1, length = props.length;
          while (++index2 < length) {
            var key = props[index2];
            var newValue = customizer ? customizer(object2[key], source[key], key, object2, source) : undefined$1;
            if (newValue === undefined$1) {
              newValue = source[key];
            }
            if (isNew) {
              baseAssignValue2(object2, key, newValue);
            } else {
              assignValue2(object2, key, newValue);
            }
          }
          return object2;
        }
        function copySymbols2(source, object2) {
          return copyObject2(source, getSymbols2(source), object2);
        }
        function copySymbolsIn2(source, object2) {
          return copyObject2(source, getSymbolsIn2(source), object2);
        }
        function createAggregator(setter, initializer) {
          return function(collection, iteratee2) {
            var func = isArray2(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
            return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
          };
        }
        function createAssigner2(assigner) {
          return baseRest2(function(object2, sources) {
            var index2 = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined$1, guard = length > 2 ? sources[2] : undefined$1;
            customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined$1;
            if (guard && isIterateeCall2(sources[0], sources[1], guard)) {
              customizer = length < 3 ? undefined$1 : customizer;
              length = 1;
            }
            object2 = Object2(object2);
            while (++index2 < length) {
              var source = sources[index2];
              if (source) {
                assigner(object2, source, index2, customizer);
              }
            }
            return object2;
          });
        }
        function createBaseEach(eachFunc, fromRight) {
          return function(collection, iteratee2) {
            if (collection == null) {
              return collection;
            }
            if (!isArrayLike2(collection)) {
              return eachFunc(collection, iteratee2);
            }
            var length = collection.length, index2 = fromRight ? length : -1, iterable = Object2(collection);
            while (fromRight ? index2-- : ++index2 < length) {
              if (iteratee2(iterable[index2], index2, iterable) === false) {
                break;
              }
            }
            return collection;
          };
        }
        function createBaseFor2(fromRight) {
          return function(object2, iteratee2, keysFunc) {
            var index2 = -1, iterable = Object2(object2), props = keysFunc(object2), length = props.length;
            while (length--) {
              var key = props[fromRight ? length : ++index2];
              if (iteratee2(iterable[key], key, iterable) === false) {
                break;
              }
            }
            return object2;
          };
        }
        function createBind(func, bitmask, thisArg) {
          var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
          function wrapper() {
            var fn2 = this && this !== root2 && this instanceof wrapper ? Ctor : func;
            return fn2.apply(isBind ? thisArg : this, arguments);
          }
          return wrapper;
        }
        function createCaseFirst2(methodName) {
          return function(string2) {
            string2 = toString2(string2);
            var strSymbols = hasUnicode2(string2) ? stringToArray2(string2) : undefined$1;
            var chr = strSymbols ? strSymbols[0] : string2.charAt(0);
            var trailing = strSymbols ? castSlice2(strSymbols, 1).join("") : string2.slice(1);
            return chr[methodName]() + trailing;
          };
        }
        function createCompounder2(callback) {
          return function(string2) {
            return arrayReduce2(words2(deburr2(string2).replace(reApos2, "")), callback, "");
          };
        }
        function createCtor(Ctor) {
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return new Ctor();
              case 1:
                return new Ctor(args[0]);
              case 2:
                return new Ctor(args[0], args[1]);
              case 3:
                return new Ctor(args[0], args[1], args[2]);
              case 4:
                return new Ctor(args[0], args[1], args[2], args[3]);
              case 5:
                return new Ctor(args[0], args[1], args[2], args[3], args[4]);
              case 6:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
              case 7:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
            }
            var thisBinding = baseCreate2(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
            return isObject2(result2) ? result2 : thisBinding;
          };
        }
        function createCurry(func, bitmask, arity) {
          var Ctor = createCtor(func);
          function wrapper() {
            var length = arguments.length, args = Array2(length), index2 = length, placeholder = getHolder(wrapper);
            while (index2--) {
              args[index2] = arguments[index2];
            }
            var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
            length -= holders.length;
            if (length < arity) {
              return createRecurry(
                func,
                bitmask,
                createHybrid,
                wrapper.placeholder,
                undefined$1,
                args,
                holders,
                undefined$1,
                undefined$1,
                arity - length
              );
            }
            var fn2 = this && this !== root2 && this instanceof wrapper ? Ctor : func;
            return apply2(fn2, this, args);
          }
          return wrapper;
        }
        function createFind(findIndexFunc) {
          return function(collection, predicate, fromIndex) {
            var iterable = Object2(collection);
            if (!isArrayLike2(collection)) {
              var iteratee2 = getIteratee(predicate, 3);
              collection = keys2(collection);
              predicate = function(key) {
                return iteratee2(iterable[key], key, iterable);
              };
            }
            var index2 = findIndexFunc(collection, predicate, fromIndex);
            return index2 > -1 ? iterable[iteratee2 ? collection[index2] : index2] : undefined$1;
          };
        }
        function createFlow(fromRight) {
          return flatRest(function(funcs) {
            var length = funcs.length, index2 = length, prereq = LodashWrapper.prototype.thru;
            if (fromRight) {
              funcs.reverse();
            }
            while (index2--) {
              var func = funcs[index2];
              if (typeof func != "function") {
                throw new TypeError2(FUNC_ERROR_TEXT2);
              }
              if (prereq && !wrapper && getFuncName(func) == "wrapper") {
                var wrapper = new LodashWrapper([], true);
              }
            }
            index2 = wrapper ? index2 : length;
            while (++index2 < length) {
              func = funcs[index2];
              var funcName = getFuncName(func), data = funcName == "wrapper" ? getData(func) : undefined$1;
              if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
                wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
              } else {
                wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
              }
            }
            return function() {
              var args = arguments, value = args[0];
              if (wrapper && args.length == 1 && isArray2(value)) {
                return wrapper.plant(value).value();
              }
              var index3 = 0, result2 = length ? funcs[index3].apply(this, args) : value;
              while (++index3 < length) {
                result2 = funcs[index3].call(this, result2);
              }
              return result2;
            };
          });
        }
        function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
          var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined$1 : createCtor(func);
          function wrapper() {
            var length = arguments.length, args = Array2(length), index2 = length;
            while (index2--) {
              args[index2] = arguments[index2];
            }
            if (isCurried) {
              var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
            }
            if (partials) {
              args = composeArgs(args, partials, holders, isCurried);
            }
            if (partialsRight) {
              args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
            }
            length -= holdersCount;
            if (isCurried && length < arity) {
              var newHolders = replaceHolders(args, placeholder);
              return createRecurry(
                func,
                bitmask,
                createHybrid,
                wrapper.placeholder,
                thisArg,
                args,
                newHolders,
                argPos,
                ary2,
                arity - length
              );
            }
            var thisBinding = isBind ? thisArg : this, fn2 = isBindKey ? thisBinding[func] : func;
            length = args.length;
            if (argPos) {
              args = reorder(args, argPos);
            } else if (isFlip && length > 1) {
              args.reverse();
            }
            if (isAry && ary2 < length) {
              args.length = ary2;
            }
            if (this && this !== root2 && this instanceof wrapper) {
              fn2 = Ctor || createCtor(fn2);
            }
            return fn2.apply(thisBinding, args);
          }
          return wrapper;
        }
        function createInverter2(setter, toIteratee) {
          return function(object2, iteratee2) {
            return baseInverter2(object2, setter, toIteratee(iteratee2), {});
          };
        }
        function createMathOperation(operator, defaultValue) {
          return function(value, other) {
            var result2;
            if (value === undefined$1 && other === undefined$1) {
              return defaultValue;
            }
            if (value !== undefined$1) {
              result2 = value;
            }
            if (other !== undefined$1) {
              if (result2 === undefined$1) {
                return other;
              }
              if (typeof value == "string" || typeof other == "string") {
                value = baseToString2(value);
                other = baseToString2(other);
              } else {
                value = baseToNumber(value);
                other = baseToNumber(other);
              }
              result2 = operator(value, other);
            }
            return result2;
          };
        }
        function createOver(arrayFunc) {
          return flatRest(function(iteratees) {
            iteratees = arrayMap2(iteratees, baseUnary2(getIteratee()));
            return baseRest2(function(args) {
              var thisArg = this;
              return arrayFunc(iteratees, function(iteratee2) {
                return apply2(iteratee2, thisArg, args);
              });
            });
          });
        }
        function createPadding(length, chars) {
          chars = chars === undefined$1 ? " " : baseToString2(chars);
          var charsLength = chars.length;
          if (charsLength < 2) {
            return charsLength ? baseRepeat(chars, length) : chars;
          }
          var result2 = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
          return hasUnicode2(chars) ? castSlice2(stringToArray2(result2), 0, length).join("") : result2.slice(0, length);
        }
        function createPartial(func, bitmask, thisArg, partials) {
          var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
          function wrapper() {
            var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array2(leftLength + argsLength), fn2 = this && this !== root2 && this instanceof wrapper ? Ctor : func;
            while (++leftIndex < leftLength) {
              args[leftIndex] = partials[leftIndex];
            }
            while (argsLength--) {
              args[leftIndex++] = arguments[++argsIndex];
            }
            return apply2(fn2, isBind ? thisArg : this, args);
          }
          return wrapper;
        }
        function createRange(fromRight) {
          return function(start, end2, step) {
            if (step && typeof step != "number" && isIterateeCall2(start, end2, step)) {
              end2 = step = undefined$1;
            }
            start = toFinite(start);
            if (end2 === undefined$1) {
              end2 = start;
              start = 0;
            } else {
              end2 = toFinite(end2);
            }
            step = step === undefined$1 ? start < end2 ? 1 : -1 : toFinite(step);
            return baseRange(start, end2, step, fromRight);
          };
        }
        function createRelationalOperation(operator) {
          return function(value, other) {
            if (!(typeof value == "string" && typeof other == "string")) {
              value = toNumber2(value);
              other = toNumber2(other);
            }
            return operator(value, other);
          };
        }
        function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
          var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined$1, newHoldersRight = isCurry ? undefined$1 : holders, newPartials = isCurry ? partials : undefined$1, newPartialsRight = isCurry ? undefined$1 : partials;
          bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
          bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
          if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
            bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
          }
          var newData = [
            func,
            bitmask,
            thisArg,
            newPartials,
            newHolders,
            newPartialsRight,
            newHoldersRight,
            argPos,
            ary2,
            arity
          ];
          var result2 = wrapFunc.apply(undefined$1, newData);
          if (isLaziable(func)) {
            setData(result2, newData);
          }
          result2.placeholder = placeholder;
          return setWrapToString(result2, func, bitmask);
        }
        function createRound(methodName) {
          var func = Math2[methodName];
          return function(number2, precision) {
            number2 = toNumber2(number2);
            precision = precision == null ? 0 : nativeMin2(toInteger(precision), 292);
            if (precision && nativeIsFinite(number2)) {
              var pair = (toString2(number2) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
              pair = (toString2(value) + "e").split("e");
              return +(pair[0] + "e" + (+pair[1] - precision));
            }
            return func(number2);
          };
        }
        var createSet = !(Set2 && 1 / setToArray2(new Set2([, -0]))[1] == INFINITY2) ? noop2 : function(values2) {
          return new Set2(values2);
        };
        function createToPairs(keysFunc) {
          return function(object2) {
            var tag = getTag2(object2);
            if (tag == mapTag2) {
              return mapToArray2(object2);
            }
            if (tag == setTag2) {
              return setToPairs(object2);
            }
            return baseToPairs(object2, keysFunc(object2));
          };
        }
        function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
          var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
          if (!isBindKey && typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT2);
          }
          var length = partials ? partials.length : 0;
          if (!length) {
            bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
            partials = holders = undefined$1;
          }
          ary2 = ary2 === undefined$1 ? ary2 : nativeMax2(toInteger(ary2), 0);
          arity = arity === undefined$1 ? arity : toInteger(arity);
          length -= holders ? holders.length : 0;
          if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
            var partialsRight = partials, holdersRight = holders;
            partials = holders = undefined$1;
          }
          var data = isBindKey ? undefined$1 : getData(func);
          var newData = [
            func,
            bitmask,
            thisArg,
            partials,
            holders,
            partialsRight,
            holdersRight,
            argPos,
            ary2,
            arity
          ];
          if (data) {
            mergeData(newData, data);
          }
          func = newData[0];
          bitmask = newData[1];
          thisArg = newData[2];
          partials = newData[3];
          holders = newData[4];
          arity = newData[9] = newData[9] === undefined$1 ? isBindKey ? 0 : func.length : nativeMax2(newData[9] - length, 0);
          if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
            bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
          }
          if (!bitmask || bitmask == WRAP_BIND_FLAG) {
            var result2 = createBind(func, bitmask, thisArg);
          } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
            result2 = createCurry(func, bitmask, arity);
          } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
            result2 = createPartial(func, bitmask, thisArg, partials);
          } else {
            result2 = createHybrid.apply(undefined$1, newData);
          }
          var setter = data ? baseSetData : setData;
          return setWrapToString(setter(result2, newData), func, bitmask);
        }
        function customDefaultsAssignIn2(objValue, srcValue, key, object2) {
          if (objValue === undefined$1 || eq2(objValue, objectProto2[key]) && !hasOwnProperty2.call(object2, key)) {
            return srcValue;
          }
          return objValue;
        }
        function customDefaultsMerge(objValue, srcValue, key, object2, source, stack) {
          if (isObject2(objValue) && isObject2(srcValue)) {
            stack.set(srcValue, objValue);
            baseMerge(objValue, srcValue, undefined$1, customDefaultsMerge, stack);
            stack["delete"](srcValue);
          }
          return objValue;
        }
        function customOmitClone(value) {
          return isPlainObject2(value) ? undefined$1 : value;
        }
        function equalArrays2(array2, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG2, arrLength = array2.length, othLength = other.length;
          if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
            return false;
          }
          var arrStacked = stack.get(array2);
          var othStacked = stack.get(other);
          if (arrStacked && othStacked) {
            return arrStacked == other && othStacked == array2;
          }
          var index2 = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG2 ? new SetCache2() : undefined$1;
          stack.set(array2, other);
          stack.set(other, array2);
          while (++index2 < arrLength) {
            var arrValue = array2[index2], othValue = other[index2];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, arrValue, index2, other, array2, stack) : customizer(arrValue, othValue, index2, array2, other, stack);
            }
            if (compared !== undefined$1) {
              if (compared) {
                continue;
              }
              result2 = false;
              break;
            }
            if (seen) {
              if (!arraySome2(other, function(othValue2, othIndex) {
                if (!cacheHas2(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                  return seen.push(othIndex);
                }
              })) {
                result2 = false;
                break;
              }
            } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              result2 = false;
              break;
            }
          }
          stack["delete"](array2);
          stack["delete"](other);
          return result2;
        }
        function equalByTag2(object2, other, tag, bitmask, customizer, equalFunc, stack) {
          switch (tag) {
            case dataViewTag2:
              if (object2.byteLength != other.byteLength || object2.byteOffset != other.byteOffset) {
                return false;
              }
              object2 = object2.buffer;
              other = other.buffer;
            case arrayBufferTag2:
              if (object2.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object2), new Uint8Array2(other))) {
                return false;
              }
              return true;
            case boolTag2:
            case dateTag2:
            case numberTag2:
              return eq2(+object2, +other);
            case errorTag2:
              return object2.name == other.name && object2.message == other.message;
            case regexpTag2:
            case stringTag2:
              return object2 == other + "";
            case mapTag2:
              var convert = mapToArray2;
            case setTag2:
              var isPartial = bitmask & COMPARE_PARTIAL_FLAG2;
              convert || (convert = setToArray2);
              if (object2.size != other.size && !isPartial) {
                return false;
              }
              var stacked = stack.get(object2);
              if (stacked) {
                return stacked == other;
              }
              bitmask |= COMPARE_UNORDERED_FLAG2;
              stack.set(object2, other);
              var result2 = equalArrays2(convert(object2), convert(other), bitmask, customizer, equalFunc, stack);
              stack["delete"](object2);
              return result2;
            case symbolTag2:
              if (symbolValueOf2) {
                return symbolValueOf2.call(object2) == symbolValueOf2.call(other);
              }
          }
          return false;
        }
        function equalObjects2(object2, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG2, objProps = getAllKeys2(object2), objLength = objProps.length, othProps = getAllKeys2(other), othLength = othProps.length;
          if (objLength != othLength && !isPartial) {
            return false;
          }
          var index2 = objLength;
          while (index2--) {
            var key = objProps[index2];
            if (!(isPartial ? key in other : hasOwnProperty2.call(other, key))) {
              return false;
            }
          }
          var objStacked = stack.get(object2);
          var othStacked = stack.get(other);
          if (objStacked && othStacked) {
            return objStacked == other && othStacked == object2;
          }
          var result2 = true;
          stack.set(object2, other);
          stack.set(other, object2);
          var skipCtor = isPartial;
          while (++index2 < objLength) {
            key = objProps[index2];
            var objValue = object2[key], othValue = other[key];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, objValue, key, other, object2, stack) : customizer(objValue, othValue, key, object2, other, stack);
            }
            if (!(compared === undefined$1 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
              result2 = false;
              break;
            }
            skipCtor || (skipCtor = key == "constructor");
          }
          if (result2 && !skipCtor) {
            var objCtor = object2.constructor, othCtor = other.constructor;
            if (objCtor != othCtor && ("constructor" in object2 && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
              result2 = false;
            }
          }
          stack["delete"](object2);
          stack["delete"](other);
          return result2;
        }
        function flatRest(func) {
          return setToString2(overRest2(func, undefined$1, flatten), func + "");
        }
        function getAllKeys2(object2) {
          return baseGetAllKeys2(object2, keys2, getSymbols2);
        }
        function getAllKeysIn2(object2) {
          return baseGetAllKeys2(object2, keysIn2, getSymbolsIn2);
        }
        var getData = !metaMap ? noop2 : function(func) {
          return metaMap.get(func);
        };
        function getFuncName(func) {
          var result2 = func.name + "", array2 = realNames[result2], length = hasOwnProperty2.call(realNames, result2) ? array2.length : 0;
          while (length--) {
            var data = array2[length], otherFunc = data.func;
            if (otherFunc == null || otherFunc == func) {
              return data.name;
            }
          }
          return result2;
        }
        function getHolder(func) {
          var object2 = hasOwnProperty2.call(lodash2, "placeholder") ? lodash2 : func;
          return object2.placeholder;
        }
        function getIteratee() {
          var result2 = lodash2.iteratee || iteratee;
          result2 = result2 === iteratee ? baseIteratee : result2;
          return arguments.length ? result2(arguments[0], arguments[1]) : result2;
        }
        function getMapData2(map2, key) {
          var data = map2.__data__;
          return isKeyable2(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
        }
        function getMatchData(object2) {
          var result2 = keys2(object2), length = result2.length;
          while (length--) {
            var key = result2[length], value = object2[key];
            result2[length] = [key, value, isStrictComparable(value)];
          }
          return result2;
        }
        function getNative2(object2, key) {
          var value = getValue2(object2, key);
          return baseIsNative2(value) ? value : undefined$1;
        }
        function getRawTag2(value) {
          var isOwn = hasOwnProperty2.call(value, symToStringTag2), tag = value[symToStringTag2];
          try {
            value[symToStringTag2] = undefined$1;
            var unmasked = true;
          } catch (e) {
          }
          var result2 = nativeObjectToString2.call(value);
          if (unmasked) {
            if (isOwn) {
              value[symToStringTag2] = tag;
            } else {
              delete value[symToStringTag2];
            }
          }
          return result2;
        }
        var getSymbols2 = !nativeGetSymbols2 ? stubArray2 : function(object2) {
          if (object2 == null) {
            return [];
          }
          object2 = Object2(object2);
          return arrayFilter2(nativeGetSymbols2(object2), function(symbol) {
            return propertyIsEnumerable2.call(object2, symbol);
          });
        };
        var getSymbolsIn2 = !nativeGetSymbols2 ? stubArray2 : function(object2) {
          var result2 = [];
          while (object2) {
            arrayPush2(result2, getSymbols2(object2));
            object2 = getPrototype2(object2);
          }
          return result2;
        };
        var getTag2 = baseGetTag2;
        if (DataView2 && getTag2(new DataView2(new ArrayBuffer(1))) != dataViewTag2 || Map2 && getTag2(new Map2()) != mapTag2 || Promise2 && getTag2(Promise2.resolve()) != promiseTag2 || Set2 && getTag2(new Set2()) != setTag2 || WeakMap2 && getTag2(new WeakMap2()) != weakMapTag2) {
          getTag2 = function(value) {
            var result2 = baseGetTag2(value), Ctor = result2 == objectTag2 ? value.constructor : undefined$1, ctorString = Ctor ? toSource2(Ctor) : "";
            if (ctorString) {
              switch (ctorString) {
                case dataViewCtorString2:
                  return dataViewTag2;
                case mapCtorString2:
                  return mapTag2;
                case promiseCtorString2:
                  return promiseTag2;
                case setCtorString2:
                  return setTag2;
                case weakMapCtorString2:
                  return weakMapTag2;
              }
            }
            return result2;
          };
        }
        function getView(start, end2, transforms) {
          var index2 = -1, length = transforms.length;
          while (++index2 < length) {
            var data = transforms[index2], size2 = data.size;
            switch (data.type) {
              case "drop":
                start += size2;
                break;
              case "dropRight":
                end2 -= size2;
                break;
              case "take":
                end2 = nativeMin2(end2, start + size2);
                break;
              case "takeRight":
                start = nativeMax2(start, end2 - size2);
                break;
            }
          }
          return { "start": start, "end": end2 };
        }
        function getWrapDetails(source) {
          var match2 = source.match(reWrapDetails);
          return match2 ? match2[1].split(reSplitDetails) : [];
        }
        function hasPath(object2, path, hasFunc) {
          path = castPath2(path, object2);
          var index2 = -1, length = path.length, result2 = false;
          while (++index2 < length) {
            var key = toKey2(path[index2]);
            if (!(result2 = object2 != null && hasFunc(object2, key))) {
              break;
            }
            object2 = object2[key];
          }
          if (result2 || ++index2 != length) {
            return result2;
          }
          length = object2 == null ? 0 : object2.length;
          return !!length && isLength2(length) && isIndex2(key, length) && (isArray2(object2) || isArguments2(object2));
        }
        function initCloneArray2(array2) {
          var length = array2.length, result2 = new array2.constructor(length);
          if (length && typeof array2[0] == "string" && hasOwnProperty2.call(array2, "index")) {
            result2.index = array2.index;
            result2.input = array2.input;
          }
          return result2;
        }
        function initCloneObject2(object2) {
          return typeof object2.constructor == "function" && !isPrototype2(object2) ? baseCreate2(getPrototype2(object2)) : {};
        }
        function initCloneByTag2(object2, tag, isDeep) {
          var Ctor = object2.constructor;
          switch (tag) {
            case arrayBufferTag2:
              return cloneArrayBuffer2(object2);
            case boolTag2:
            case dateTag2:
              return new Ctor(+object2);
            case dataViewTag2:
              return cloneDataView2(object2, isDeep);
            case float32Tag2:
            case float64Tag2:
            case int8Tag2:
            case int16Tag2:
            case int32Tag2:
            case uint8Tag2:
            case uint8ClampedTag2:
            case uint16Tag2:
            case uint32Tag2:
              return cloneTypedArray2(object2, isDeep);
            case mapTag2:
              return new Ctor();
            case numberTag2:
            case stringTag2:
              return new Ctor(object2);
            case regexpTag2:
              return cloneRegExp2(object2);
            case setTag2:
              return new Ctor();
            case symbolTag2:
              return cloneSymbol2(object2);
          }
        }
        function insertWrapDetails(source, details) {
          var length = details.length;
          if (!length) {
            return source;
          }
          var lastIndex = length - 1;
          details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
          details = details.join(length > 2 ? ", " : " ");
          return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
        }
        function isFlattenable(value) {
          return isArray2(value) || isArguments2(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
        }
        function isIndex2(value, length) {
          var type2 = typeof value;
          length = length == null ? MAX_SAFE_INTEGER2 : length;
          return !!length && (type2 == "number" || type2 != "symbol" && reIsUint2.test(value)) && (value > -1 && value % 1 == 0 && value < length);
        }
        function isIterateeCall2(value, index2, object2) {
          if (!isObject2(object2)) {
            return false;
          }
          var type2 = typeof index2;
          if (type2 == "number" ? isArrayLike2(object2) && isIndex2(index2, object2.length) : type2 == "string" && index2 in object2) {
            return eq2(object2[index2], value);
          }
          return false;
        }
        function isKey2(value, object2) {
          if (isArray2(value)) {
            return false;
          }
          var type2 = typeof value;
          if (type2 == "number" || type2 == "symbol" || type2 == "boolean" || value == null || isSymbol2(value)) {
            return true;
          }
          return reIsPlainProp2.test(value) || !reIsDeepProp2.test(value) || object2 != null && value in Object2(object2);
        }
        function isKeyable2(value) {
          var type2 = typeof value;
          return type2 == "string" || type2 == "number" || type2 == "symbol" || type2 == "boolean" ? value !== "__proto__" : value === null;
        }
        function isLaziable(func) {
          var funcName = getFuncName(func), other = lodash2[funcName];
          if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
            return false;
          }
          if (func === other) {
            return true;
          }
          var data = getData(other);
          return !!data && func === data[0];
        }
        function isMasked2(func) {
          return !!maskSrcKey2 && maskSrcKey2 in func;
        }
        var isMaskable = coreJsData2 ? isFunction2 : stubFalse2;
        function isPrototype2(value) {
          var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto2;
          return value === proto;
        }
        function isStrictComparable(value) {
          return value === value && !isObject2(value);
        }
        function matchesStrictComparable(key, srcValue) {
          return function(object2) {
            if (object2 == null) {
              return false;
            }
            return object2[key] === srcValue && (srcValue !== undefined$1 || key in Object2(object2));
          };
        }
        function memoizeCapped2(func) {
          var result2 = memoize2(func, function(key) {
            if (cache.size === MAX_MEMOIZE_SIZE2) {
              cache.clear();
            }
            return key;
          });
          var cache = result2.cache;
          return result2;
        }
        function mergeData(data, source) {
          var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
          var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
          if (!(isCommon || isCombo)) {
            return data;
          }
          if (srcBitmask & WRAP_BIND_FLAG) {
            data[2] = source[2];
            newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
          }
          var value = source[3];
          if (value) {
            var partials = data[3];
            data[3] = partials ? composeArgs(partials, value, source[4]) : value;
            data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
          }
          value = source[5];
          if (value) {
            partials = data[5];
            data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
            data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
          }
          value = source[7];
          if (value) {
            data[7] = value;
          }
          if (srcBitmask & WRAP_ARY_FLAG) {
            data[8] = data[8] == null ? source[8] : nativeMin2(data[8], source[8]);
          }
          if (data[9] == null) {
            data[9] = source[9];
          }
          data[0] = source[0];
          data[1] = newBitmask;
          return data;
        }
        function nativeKeysIn2(object2) {
          var result2 = [];
          if (object2 != null) {
            for (var key in Object2(object2)) {
              result2.push(key);
            }
          }
          return result2;
        }
        function objectToString2(value) {
          return nativeObjectToString2.call(value);
        }
        function overRest2(func, start, transform2) {
          start = nativeMax2(start === undefined$1 ? func.length - 1 : start, 0);
          return function() {
            var args = arguments, index2 = -1, length = nativeMax2(args.length - start, 0), array2 = Array2(length);
            while (++index2 < length) {
              array2[index2] = args[start + index2];
            }
            index2 = -1;
            var otherArgs = Array2(start + 1);
            while (++index2 < start) {
              otherArgs[index2] = args[index2];
            }
            otherArgs[start] = transform2(array2);
            return apply2(func, this, otherArgs);
          };
        }
        function parent(object2, path) {
          return path.length < 2 ? object2 : baseGet2(object2, baseSlice2(path, 0, -1));
        }
        function reorder(array2, indexes) {
          var arrLength = array2.length, length = nativeMin2(indexes.length, arrLength), oldArray = copyArray2(array2);
          while (length--) {
            var index2 = indexes[length];
            array2[length] = isIndex2(index2, arrLength) ? oldArray[index2] : undefined$1;
          }
          return array2;
        }
        function safeGet(object2, key) {
          if (key === "constructor" && typeof object2[key] === "function") {
            return;
          }
          if (key == "__proto__") {
            return;
          }
          return object2[key];
        }
        var setData = shortOut2(baseSetData);
        var setTimeout2 = ctxSetTimeout || function(func, wait) {
          return root2.setTimeout(func, wait);
        };
        var setToString2 = shortOut2(baseSetToString2);
        function setWrapToString(wrapper, reference, bitmask) {
          var source = reference + "";
          return setToString2(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
        }
        function shortOut2(func) {
          var count = 0, lastCalled = 0;
          return function() {
            var stamp = nativeNow2(), remaining = HOT_SPAN2 - (stamp - lastCalled);
            lastCalled = stamp;
            if (remaining > 0) {
              if (++count >= HOT_COUNT2) {
                return arguments[0];
              }
            } else {
              count = 0;
            }
            return func.apply(undefined$1, arguments);
          };
        }
        function shuffleSelf(array2, size2) {
          var index2 = -1, length = array2.length, lastIndex = length - 1;
          size2 = size2 === undefined$1 ? length : size2;
          while (++index2 < size2) {
            var rand = baseRandom(index2, lastIndex), value = array2[rand];
            array2[rand] = array2[index2];
            array2[index2] = value;
          }
          array2.length = size2;
          return array2;
        }
        var stringToPath2 = memoizeCapped2(function(string2) {
          var result2 = [];
          if (string2.charCodeAt(0) === 46) {
            result2.push("");
          }
          string2.replace(rePropName2, function(match2, number2, quote, subString) {
            result2.push(quote ? subString.replace(reEscapeChar2, "$1") : number2 || match2);
          });
          return result2;
        });
        function toKey2(value) {
          if (typeof value == "string" || isSymbol2(value)) {
            return value;
          }
          var result2 = value + "";
          return result2 == "0" && 1 / value == -INFINITY2 ? "-0" : result2;
        }
        function toSource2(func) {
          if (func != null) {
            try {
              return funcToString2.call(func);
            } catch (e) {
            }
            try {
              return func + "";
            } catch (e) {
            }
          }
          return "";
        }
        function updateWrapDetails(details, bitmask) {
          arrayEach2(wrapFlags, function(pair) {
            var value = "_." + pair[0];
            if (bitmask & pair[1] && !arrayIncludes(details, value)) {
              details.push(value);
            }
          });
          return details.sort();
        }
        function wrapperClone(wrapper) {
          if (wrapper instanceof LazyWrapper) {
            return wrapper.clone();
          }
          var result2 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
          result2.__actions__ = copyArray2(wrapper.__actions__);
          result2.__index__ = wrapper.__index__;
          result2.__values__ = wrapper.__values__;
          return result2;
        }
        function chunk(array2, size2, guard) {
          if (guard ? isIterateeCall2(array2, size2, guard) : size2 === undefined$1) {
            size2 = 1;
          } else {
            size2 = nativeMax2(toInteger(size2), 0);
          }
          var length = array2 == null ? 0 : array2.length;
          if (!length || size2 < 1) {
            return [];
          }
          var index2 = 0, resIndex = 0, result2 = Array2(nativeCeil(length / size2));
          while (index2 < length) {
            result2[resIndex++] = baseSlice2(array2, index2, index2 += size2);
          }
          return result2;
        }
        function compact(array2) {
          var index2 = -1, length = array2 == null ? 0 : array2.length, resIndex = 0, result2 = [];
          while (++index2 < length) {
            var value = array2[index2];
            if (value) {
              result2[resIndex++] = value;
            }
          }
          return result2;
        }
        function concat() {
          var length = arguments.length;
          if (!length) {
            return [];
          }
          var args = Array2(length - 1), array2 = arguments[0], index2 = length;
          while (index2--) {
            args[index2 - 1] = arguments[index2];
          }
          return arrayPush2(isArray2(array2) ? copyArray2(array2) : [array2], baseFlatten(args, 1));
        }
        var difference = baseRest2(function(array2, values2) {
          return isArrayLikeObject(array2) ? baseDifference(array2, baseFlatten(values2, 1, isArrayLikeObject, true)) : [];
        });
        var differenceBy = baseRest2(function(array2, values2) {
          var iteratee2 = last2(values2);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined$1;
          }
          return isArrayLikeObject(array2) ? baseDifference(array2, baseFlatten(values2, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2)) : [];
        });
        var differenceWith = baseRest2(function(array2, values2) {
          var comparator = last2(values2);
          if (isArrayLikeObject(comparator)) {
            comparator = undefined$1;
          }
          return isArrayLikeObject(array2) ? baseDifference(array2, baseFlatten(values2, 1, isArrayLikeObject, true), undefined$1, comparator) : [];
        });
        function drop(array2, n, guard) {
          var length = array2 == null ? 0 : array2.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined$1 ? 1 : toInteger(n);
          return baseSlice2(array2, n < 0 ? 0 : n, length);
        }
        function dropRight(array2, n, guard) {
          var length = array2 == null ? 0 : array2.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined$1 ? 1 : toInteger(n);
          n = length - n;
          return baseSlice2(array2, 0, n < 0 ? 0 : n);
        }
        function dropRightWhile(array2, predicate) {
          return array2 && array2.length ? baseWhile(array2, getIteratee(predicate, 3), true, true) : [];
        }
        function dropWhile(array2, predicate) {
          return array2 && array2.length ? baseWhile(array2, getIteratee(predicate, 3), true) : [];
        }
        function fill(array2, value, start, end2) {
          var length = array2 == null ? 0 : array2.length;
          if (!length) {
            return [];
          }
          if (start && typeof start != "number" && isIterateeCall2(array2, value, start)) {
            start = 0;
            end2 = length;
          }
          return baseFill(array2, value, start, end2);
        }
        function findIndex(array2, predicate, fromIndex) {
          var length = array2 == null ? 0 : array2.length;
          if (!length) {
            return -1;
          }
          var index2 = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index2 < 0) {
            index2 = nativeMax2(length + index2, 0);
          }
          return baseFindIndex(array2, getIteratee(predicate, 3), index2);
        }
        function findLastIndex(array2, predicate, fromIndex) {
          var length = array2 == null ? 0 : array2.length;
          if (!length) {
            return -1;
          }
          var index2 = length - 1;
          if (fromIndex !== undefined$1) {
            index2 = toInteger(fromIndex);
            index2 = fromIndex < 0 ? nativeMax2(length + index2, 0) : nativeMin2(index2, length - 1);
          }
          return baseFindIndex(array2, getIteratee(predicate, 3), index2, true);
        }
        function flatten(array2) {
          var length = array2 == null ? 0 : array2.length;
          return length ? baseFlatten(array2, 1) : [];
        }
        function flattenDeep(array2) {
          var length = array2 == null ? 0 : array2.length;
          return length ? baseFlatten(array2, INFINITY2) : [];
        }
        function flattenDepth(array2, depth) {
          var length = array2 == null ? 0 : array2.length;
          if (!length) {
            return [];
          }
          depth = depth === undefined$1 ? 1 : toInteger(depth);
          return baseFlatten(array2, depth);
        }
        function fromPairs2(pairs) {
          var index2 = -1, length = pairs == null ? 0 : pairs.length, result2 = {};
          while (++index2 < length) {
            var pair = pairs[index2];
            result2[pair[0]] = pair[1];
          }
          return result2;
        }
        function head(array2) {
          return array2 && array2.length ? array2[0] : undefined$1;
        }
        function indexOf(array2, value, fromIndex) {
          var length = array2 == null ? 0 : array2.length;
          if (!length) {
            return -1;
          }
          var index2 = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index2 < 0) {
            index2 = nativeMax2(length + index2, 0);
          }
          return baseIndexOf(array2, value, index2);
        }
        function initial(array2) {
          var length = array2 == null ? 0 : array2.length;
          return length ? baseSlice2(array2, 0, -1) : [];
        }
        var intersection = baseRest2(function(arrays) {
          var mapped = arrayMap2(arrays, castArrayLikeObject);
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
        });
        var intersectionBy = baseRest2(function(arrays) {
          var iteratee2 = last2(arrays), mapped = arrayMap2(arrays, castArrayLikeObject);
          if (iteratee2 === last2(mapped)) {
            iteratee2 = undefined$1;
          } else {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
        });
        var intersectionWith = baseRest2(function(arrays) {
          var comparator = last2(arrays), mapped = arrayMap2(arrays, castArrayLikeObject);
          comparator = typeof comparator == "function" ? comparator : undefined$1;
          if (comparator) {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined$1, comparator) : [];
        });
        function join(array2, separator) {
          return array2 == null ? "" : nativeJoin.call(array2, separator);
        }
        function last2(array2) {
          var length = array2 == null ? 0 : array2.length;
          return length ? array2[length - 1] : undefined$1;
        }
        function lastIndexOf(array2, value, fromIndex) {
          var length = array2 == null ? 0 : array2.length;
          if (!length) {
            return -1;
          }
          var index2 = length;
          if (fromIndex !== undefined$1) {
            index2 = toInteger(fromIndex);
            index2 = index2 < 0 ? nativeMax2(length + index2, 0) : nativeMin2(index2, length - 1);
          }
          return value === value ? strictLastIndexOf(array2, value, index2) : baseFindIndex(array2, baseIsNaN, index2, true);
        }
        function nth(array2, n) {
          return array2 && array2.length ? baseNth(array2, toInteger(n)) : undefined$1;
        }
        var pull = baseRest2(pullAll);
        function pullAll(array2, values2) {
          return array2 && array2.length && values2 && values2.length ? basePullAll(array2, values2) : array2;
        }
        function pullAllBy(array2, values2, iteratee2) {
          return array2 && array2.length && values2 && values2.length ? basePullAll(array2, values2, getIteratee(iteratee2, 2)) : array2;
        }
        function pullAllWith(array2, values2, comparator) {
          return array2 && array2.length && values2 && values2.length ? basePullAll(array2, values2, undefined$1, comparator) : array2;
        }
        var pullAt = flatRest(function(array2, indexes) {
          var length = array2 == null ? 0 : array2.length, result2 = baseAt(array2, indexes);
          basePullAt(array2, arrayMap2(indexes, function(index2) {
            return isIndex2(index2, length) ? +index2 : index2;
          }).sort(compareAscending));
          return result2;
        });
        function remove(array2, predicate) {
          var result2 = [];
          if (!(array2 && array2.length)) {
            return result2;
          }
          var index2 = -1, indexes = [], length = array2.length;
          predicate = getIteratee(predicate, 3);
          while (++index2 < length) {
            var value = array2[index2];
            if (predicate(value, index2, array2)) {
              result2.push(value);
              indexes.push(index2);
            }
          }
          basePullAt(array2, indexes);
          return result2;
        }
        function reverse(array2) {
          return array2 == null ? array2 : nativeReverse.call(array2);
        }
        function slice(array2, start, end2) {
          var length = array2 == null ? 0 : array2.length;
          if (!length) {
            return [];
          }
          if (end2 && typeof end2 != "number" && isIterateeCall2(array2, start, end2)) {
            start = 0;
            end2 = length;
          } else {
            start = start == null ? 0 : toInteger(start);
            end2 = end2 === undefined$1 ? length : toInteger(end2);
          }
          return baseSlice2(array2, start, end2);
        }
        function sortedIndex(array2, value) {
          return baseSortedIndex(array2, value);
        }
        function sortedIndexBy(array2, value, iteratee2) {
          return baseSortedIndexBy(array2, value, getIteratee(iteratee2, 2));
        }
        function sortedIndexOf(array2, value) {
          var length = array2 == null ? 0 : array2.length;
          if (length) {
            var index2 = baseSortedIndex(array2, value);
            if (index2 < length && eq2(array2[index2], value)) {
              return index2;
            }
          }
          return -1;
        }
        function sortedLastIndex(array2, value) {
          return baseSortedIndex(array2, value, true);
        }
        function sortedLastIndexBy(array2, value, iteratee2) {
          return baseSortedIndexBy(array2, value, getIteratee(iteratee2, 2), true);
        }
        function sortedLastIndexOf(array2, value) {
          var length = array2 == null ? 0 : array2.length;
          if (length) {
            var index2 = baseSortedIndex(array2, value, true) - 1;
            if (eq2(array2[index2], value)) {
              return index2;
            }
          }
          return -1;
        }
        function sortedUniq(array2) {
          return array2 && array2.length ? baseSortedUniq(array2) : [];
        }
        function sortedUniqBy(array2, iteratee2) {
          return array2 && array2.length ? baseSortedUniq(array2, getIteratee(iteratee2, 2)) : [];
        }
        function tail(array2) {
          var length = array2 == null ? 0 : array2.length;
          return length ? baseSlice2(array2, 1, length) : [];
        }
        function take(array2, n, guard) {
          if (!(array2 && array2.length)) {
            return [];
          }
          n = guard || n === undefined$1 ? 1 : toInteger(n);
          return baseSlice2(array2, 0, n < 0 ? 0 : n);
        }
        function takeRight(array2, n, guard) {
          var length = array2 == null ? 0 : array2.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined$1 ? 1 : toInteger(n);
          n = length - n;
          return baseSlice2(array2, n < 0 ? 0 : n, length);
        }
        function takeRightWhile(array2, predicate) {
          return array2 && array2.length ? baseWhile(array2, getIteratee(predicate, 3), false, true) : [];
        }
        function takeWhile(array2, predicate) {
          return array2 && array2.length ? baseWhile(array2, getIteratee(predicate, 3)) : [];
        }
        var union = baseRest2(function(arrays) {
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
        });
        var unionBy = baseRest2(function(arrays) {
          var iteratee2 = last2(arrays);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined$1;
          }
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
        });
        var unionWith = baseRest2(function(arrays) {
          var comparator = last2(arrays);
          comparator = typeof comparator == "function" ? comparator : undefined$1;
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined$1, comparator);
        });
        function uniq(array2) {
          return array2 && array2.length ? baseUniq(array2) : [];
        }
        function uniqBy(array2, iteratee2) {
          return array2 && array2.length ? baseUniq(array2, getIteratee(iteratee2, 2)) : [];
        }
        function uniqWith(array2, comparator) {
          comparator = typeof comparator == "function" ? comparator : undefined$1;
          return array2 && array2.length ? baseUniq(array2, undefined$1, comparator) : [];
        }
        function unzip(array2) {
          if (!(array2 && array2.length)) {
            return [];
          }
          var length = 0;
          array2 = arrayFilter2(array2, function(group) {
            if (isArrayLikeObject(group)) {
              length = nativeMax2(group.length, length);
              return true;
            }
          });
          return baseTimes2(length, function(index2) {
            return arrayMap2(array2, baseProperty(index2));
          });
        }
        function unzipWith(array2, iteratee2) {
          if (!(array2 && array2.length)) {
            return [];
          }
          var result2 = unzip(array2);
          if (iteratee2 == null) {
            return result2;
          }
          return arrayMap2(result2, function(group) {
            return apply2(iteratee2, undefined$1, group);
          });
        }
        var without = baseRest2(function(array2, values2) {
          return isArrayLikeObject(array2) ? baseDifference(array2, values2) : [];
        });
        var xor = baseRest2(function(arrays) {
          return baseXor(arrayFilter2(arrays, isArrayLikeObject));
        });
        var xorBy = baseRest2(function(arrays) {
          var iteratee2 = last2(arrays);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined$1;
          }
          return baseXor(arrayFilter2(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
        });
        var xorWith = baseRest2(function(arrays) {
          var comparator = last2(arrays);
          comparator = typeof comparator == "function" ? comparator : undefined$1;
          return baseXor(arrayFilter2(arrays, isArrayLikeObject), undefined$1, comparator);
        });
        var zip = baseRest2(unzip);
        function zipObject(props, values2) {
          return baseZipObject(props || [], values2 || [], assignValue2);
        }
        function zipObjectDeep(props, values2) {
          return baseZipObject(props || [], values2 || [], baseSet2);
        }
        var zipWith = baseRest2(function(arrays) {
          var length = arrays.length, iteratee2 = length > 1 ? arrays[length - 1] : undefined$1;
          iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined$1;
          return unzipWith(arrays, iteratee2);
        });
        function chain(value) {
          var result2 = lodash2(value);
          result2.__chain__ = true;
          return result2;
        }
        function tap(value, interceptor) {
          interceptor(value);
          return value;
        }
        function thru(value, interceptor) {
          return interceptor(value);
        }
        var wrapperAt = flatRest(function(paths) {
          var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object2) {
            return baseAt(object2, paths);
          };
          if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex2(start)) {
            return this.thru(interceptor);
          }
          value = value.slice(start, +start + (length ? 1 : 0));
          value.__actions__.push({
            "func": thru,
            "args": [interceptor],
            "thisArg": undefined$1
          });
          return new LodashWrapper(value, this.__chain__).thru(function(array2) {
            if (length && !array2.length) {
              array2.push(undefined$1);
            }
            return array2;
          });
        });
        function wrapperChain() {
          return chain(this);
        }
        function wrapperCommit() {
          return new LodashWrapper(this.value(), this.__chain__);
        }
        function wrapperNext() {
          if (this.__values__ === undefined$1) {
            this.__values__ = toArray(this.value());
          }
          var done = this.__index__ >= this.__values__.length, value = done ? undefined$1 : this.__values__[this.__index__++];
          return { "done": done, "value": value };
        }
        function wrapperToIterator() {
          return this;
        }
        function wrapperPlant(value) {
          var result2, parent2 = this;
          while (parent2 instanceof baseLodash) {
            var clone3 = wrapperClone(parent2);
            clone3.__index__ = 0;
            clone3.__values__ = undefined$1;
            if (result2) {
              previous.__wrapped__ = clone3;
            } else {
              result2 = clone3;
            }
            var previous = clone3;
            parent2 = parent2.__wrapped__;
          }
          previous.__wrapped__ = value;
          return result2;
        }
        function wrapperReverse() {
          var value = this.__wrapped__;
          if (value instanceof LazyWrapper) {
            var wrapped = value;
            if (this.__actions__.length) {
              wrapped = new LazyWrapper(this);
            }
            wrapped = wrapped.reverse();
            wrapped.__actions__.push({
              "func": thru,
              "args": [reverse],
              "thisArg": undefined$1
            });
            return new LodashWrapper(wrapped, this.__chain__);
          }
          return this.thru(reverse);
        }
        function wrapperValue() {
          return baseWrapperValue(this.__wrapped__, this.__actions__);
        }
        var countBy = createAggregator(function(result2, value, key) {
          if (hasOwnProperty2.call(result2, key)) {
            ++result2[key];
          } else {
            baseAssignValue2(result2, key, 1);
          }
        });
        function every(collection, predicate, guard) {
          var func = isArray2(collection) ? arrayEvery : baseEvery;
          if (guard && isIterateeCall2(collection, predicate, guard)) {
            predicate = undefined$1;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        function filter(collection, predicate) {
          var func = isArray2(collection) ? arrayFilter2 : baseFilter;
          return func(collection, getIteratee(predicate, 3));
        }
        var find = createFind(findIndex);
        var findLast = createFind(findLastIndex);
        function flatMap(collection, iteratee2) {
          return baseFlatten(map(collection, iteratee2), 1);
        }
        function flatMapDeep(collection, iteratee2) {
          return baseFlatten(map(collection, iteratee2), INFINITY2);
        }
        function flatMapDepth(collection, iteratee2, depth) {
          depth = depth === undefined$1 ? 1 : toInteger(depth);
          return baseFlatten(map(collection, iteratee2), depth);
        }
        function forEach(collection, iteratee2) {
          var func = isArray2(collection) ? arrayEach2 : baseEach;
          return func(collection, getIteratee(iteratee2, 3));
        }
        function forEachRight(collection, iteratee2) {
          var func = isArray2(collection) ? arrayEachRight : baseEachRight;
          return func(collection, getIteratee(iteratee2, 3));
        }
        var groupBy = createAggregator(function(result2, value, key) {
          if (hasOwnProperty2.call(result2, key)) {
            result2[key].push(value);
          } else {
            baseAssignValue2(result2, key, [value]);
          }
        });
        function includes(collection, value, fromIndex, guard) {
          collection = isArrayLike2(collection) ? collection : values(collection);
          fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
          var length = collection.length;
          if (fromIndex < 0) {
            fromIndex = nativeMax2(length + fromIndex, 0);
          }
          return isString2(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
        }
        var invokeMap = baseRest2(function(collection, path, args) {
          var index2 = -1, isFunc = typeof path == "function", result2 = isArrayLike2(collection) ? Array2(collection.length) : [];
          baseEach(collection, function(value) {
            result2[++index2] = isFunc ? apply2(path, value, args) : baseInvoke(value, path, args);
          });
          return result2;
        });
        var keyBy = createAggregator(function(result2, value, key) {
          baseAssignValue2(result2, key, value);
        });
        function map(collection, iteratee2) {
          var func = isArray2(collection) ? arrayMap2 : baseMap;
          return func(collection, getIteratee(iteratee2, 3));
        }
        function orderBy(collection, iteratees, orders, guard) {
          if (collection == null) {
            return [];
          }
          if (!isArray2(iteratees)) {
            iteratees = iteratees == null ? [] : [iteratees];
          }
          orders = guard ? undefined$1 : orders;
          if (!isArray2(orders)) {
            orders = orders == null ? [] : [orders];
          }
          return baseOrderBy(collection, iteratees, orders);
        }
        var partition = createAggregator(function(result2, value, key) {
          result2[key ? 0 : 1].push(value);
        }, function() {
          return [[], []];
        });
        function reduce(collection, iteratee2, accumulator) {
          var func = isArray2(collection) ? arrayReduce2 : baseReduce, initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
        }
        function reduceRight(collection, iteratee2, accumulator) {
          var func = isArray2(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
        }
        function reject(collection, predicate) {
          var func = isArray2(collection) ? arrayFilter2 : baseFilter;
          return func(collection, negate(getIteratee(predicate, 3)));
        }
        function sample(collection) {
          var func = isArray2(collection) ? arraySample : baseSample;
          return func(collection);
        }
        function sampleSize(collection, n, guard) {
          if (guard ? isIterateeCall2(collection, n, guard) : n === undefined$1) {
            n = 1;
          } else {
            n = toInteger(n);
          }
          var func = isArray2(collection) ? arraySampleSize : baseSampleSize;
          return func(collection, n);
        }
        function shuffle(collection) {
          var func = isArray2(collection) ? arrayShuffle : baseShuffle;
          return func(collection);
        }
        function size(collection) {
          if (collection == null) {
            return 0;
          }
          if (isArrayLike2(collection)) {
            return isString2(collection) ? stringSize(collection) : collection.length;
          }
          var tag = getTag2(collection);
          if (tag == mapTag2 || tag == setTag2) {
            return collection.size;
          }
          return baseKeys2(collection).length;
        }
        function some(collection, predicate, guard) {
          var func = isArray2(collection) ? arraySome2 : baseSome;
          if (guard && isIterateeCall2(collection, predicate, guard)) {
            predicate = undefined$1;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        var sortBy = baseRest2(function(collection, iteratees) {
          if (collection == null) {
            return [];
          }
          var length = iteratees.length;
          if (length > 1 && isIterateeCall2(collection, iteratees[0], iteratees[1])) {
            iteratees = [];
          } else if (length > 2 && isIterateeCall2(iteratees[0], iteratees[1], iteratees[2])) {
            iteratees = [iteratees[0]];
          }
          return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
        });
        var now2 = ctxNow || function() {
          return root2.Date.now();
        };
        function after(n, func) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT2);
          }
          n = toInteger(n);
          return function() {
            if (--n < 1) {
              return func.apply(this, arguments);
            }
          };
        }
        function ary(func, n, guard) {
          n = guard ? undefined$1 : n;
          n = func && n == null ? func.length : n;
          return createWrap(func, WRAP_ARY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, n);
        }
        function before(n, func) {
          var result2;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT2);
          }
          n = toInteger(n);
          return function() {
            if (--n > 0) {
              result2 = func.apply(this, arguments);
            }
            if (n <= 1) {
              func = undefined$1;
            }
            return result2;
          };
        }
        var bind = baseRest2(function(func, thisArg, partials) {
          var bitmask = WRAP_BIND_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bind));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(func, bitmask, thisArg, partials, holders);
        });
        var bindKey = baseRest2(function(object2, key, partials) {
          var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bindKey));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(key, bitmask, object2, partials, holders);
        });
        function curry(func, arity, guard) {
          arity = guard ? undefined$1 : arity;
          var result2 = createWrap(func, WRAP_CURRY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
          result2.placeholder = curry.placeholder;
          return result2;
        }
        function curryRight(func, arity, guard) {
          arity = guard ? undefined$1 : arity;
          var result2 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
          result2.placeholder = curryRight.placeholder;
          return result2;
        }
        function debounce2(func, wait, options) {
          var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT2);
          }
          wait = toNumber2(wait) || 0;
          if (isObject2(options)) {
            leading = !!options.leading;
            maxing = "maxWait" in options;
            maxWait = maxing ? nativeMax2(toNumber2(options.maxWait) || 0, wait) : maxWait;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }
          function invokeFunc(time) {
            var args = lastArgs, thisArg = lastThis;
            lastArgs = lastThis = undefined$1;
            lastInvokeTime = time;
            result2 = func.apply(thisArg, args);
            return result2;
          }
          function leadingEdge(time) {
            lastInvokeTime = time;
            timerId = setTimeout2(timerExpired, wait);
            return leading ? invokeFunc(time) : result2;
          }
          function remainingWait(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
            return maxing ? nativeMin2(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
          }
          function shouldInvoke(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
            return lastCallTime === undefined$1 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
          }
          function timerExpired() {
            var time = now2();
            if (shouldInvoke(time)) {
              return trailingEdge(time);
            }
            timerId = setTimeout2(timerExpired, remainingWait(time));
          }
          function trailingEdge(time) {
            timerId = undefined$1;
            if (trailing && lastArgs) {
              return invokeFunc(time);
            }
            lastArgs = lastThis = undefined$1;
            return result2;
          }
          function cancel() {
            if (timerId !== undefined$1) {
              clearTimeout2(timerId);
            }
            lastInvokeTime = 0;
            lastArgs = lastCallTime = lastThis = timerId = undefined$1;
          }
          function flush() {
            return timerId === undefined$1 ? result2 : trailingEdge(now2());
          }
          function debounced() {
            var time = now2(), isInvoking = shouldInvoke(time);
            lastArgs = arguments;
            lastThis = this;
            lastCallTime = time;
            if (isInvoking) {
              if (timerId === undefined$1) {
                return leadingEdge(lastCallTime);
              }
              if (maxing) {
                clearTimeout2(timerId);
                timerId = setTimeout2(timerExpired, wait);
                return invokeFunc(lastCallTime);
              }
            }
            if (timerId === undefined$1) {
              timerId = setTimeout2(timerExpired, wait);
            }
            return result2;
          }
          debounced.cancel = cancel;
          debounced.flush = flush;
          return debounced;
        }
        var defer = baseRest2(function(func, args) {
          return baseDelay(func, 1, args);
        });
        var delay = baseRest2(function(func, wait, args) {
          return baseDelay(func, toNumber2(wait) || 0, args);
        });
        function flip(func) {
          return createWrap(func, WRAP_FLIP_FLAG);
        }
        function memoize2(func, resolver) {
          if (typeof func != "function" || resolver != null && typeof resolver != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT2);
          }
          var memoized = function() {
            var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
            if (cache.has(key)) {
              return cache.get(key);
            }
            var result2 = func.apply(this, args);
            memoized.cache = cache.set(key, result2) || cache;
            return result2;
          };
          memoized.cache = new (memoize2.Cache || MapCache2)();
          return memoized;
        }
        memoize2.Cache = MapCache2;
        function negate(predicate) {
          if (typeof predicate != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT2);
          }
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return !predicate.call(this);
              case 1:
                return !predicate.call(this, args[0]);
              case 2:
                return !predicate.call(this, args[0], args[1]);
              case 3:
                return !predicate.call(this, args[0], args[1], args[2]);
            }
            return !predicate.apply(this, args);
          };
        }
        function once2(func) {
          return before(2, func);
        }
        var overArgs = castRest(function(func, transforms) {
          transforms = transforms.length == 1 && isArray2(transforms[0]) ? arrayMap2(transforms[0], baseUnary2(getIteratee())) : arrayMap2(baseFlatten(transforms, 1), baseUnary2(getIteratee()));
          var funcsLength = transforms.length;
          return baseRest2(function(args) {
            var index2 = -1, length = nativeMin2(args.length, funcsLength);
            while (++index2 < length) {
              args[index2] = transforms[index2].call(this, args[index2]);
            }
            return apply2(func, this, args);
          });
        });
        var partial = baseRest2(function(func, partials) {
          var holders = replaceHolders(partials, getHolder(partial));
          return createWrap(func, WRAP_PARTIAL_FLAG, undefined$1, partials, holders);
        });
        var partialRight = baseRest2(function(func, partials) {
          var holders = replaceHolders(partials, getHolder(partialRight));
          return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined$1, partials, holders);
        });
        var rearg = flatRest(function(func, indexes) {
          return createWrap(func, WRAP_REARG_FLAG, undefined$1, undefined$1, undefined$1, indexes);
        });
        function rest(func, start) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT2);
          }
          start = start === undefined$1 ? start : toInteger(start);
          return baseRest2(func, start);
        }
        function spread(func, start) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT2);
          }
          start = start == null ? 0 : nativeMax2(toInteger(start), 0);
          return baseRest2(function(args) {
            var array2 = args[start], otherArgs = castSlice2(args, 0, start);
            if (array2) {
              arrayPush2(otherArgs, array2);
            }
            return apply2(func, this, otherArgs);
          });
        }
        function throttle(func, wait, options) {
          var leading = true, trailing = true;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT2);
          }
          if (isObject2(options)) {
            leading = "leading" in options ? !!options.leading : leading;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }
          return debounce2(func, wait, {
            "leading": leading,
            "maxWait": wait,
            "trailing": trailing
          });
        }
        function unary(func) {
          return ary(func, 1);
        }
        function wrap(value, wrapper) {
          return partial(castFunction(wrapper), value);
        }
        function castArray2() {
          if (!arguments.length) {
            return [];
          }
          var value = arguments[0];
          return isArray2(value) ? value : [value];
        }
        function clone2(value) {
          return baseClone2(value, CLONE_SYMBOLS_FLAG2);
        }
        function cloneWith(value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$1;
          return baseClone2(value, CLONE_SYMBOLS_FLAG2, customizer);
        }
        function cloneDeep(value) {
          return baseClone2(value, CLONE_DEEP_FLAG2 | CLONE_SYMBOLS_FLAG2);
        }
        function cloneDeepWith(value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$1;
          return baseClone2(value, CLONE_DEEP_FLAG2 | CLONE_SYMBOLS_FLAG2, customizer);
        }
        function conformsTo(object2, source) {
          return source == null || baseConformsTo(object2, source, keys2(source));
        }
        function eq2(value, other) {
          return value === other || value !== value && other !== other;
        }
        var gt2 = createRelationalOperation(baseGt);
        var gte = createRelationalOperation(function(value, other) {
          return value >= other;
        });
        var isArguments2 = baseIsArguments2(function() {
          return arguments;
        }()) ? baseIsArguments2 : function(value) {
          return isObjectLike2(value) && hasOwnProperty2.call(value, "callee") && !propertyIsEnumerable2.call(value, "callee");
        };
        var isArray2 = Array2.isArray;
        var isArrayBuffer = nodeIsArrayBuffer ? baseUnary2(nodeIsArrayBuffer) : baseIsArrayBuffer;
        function isArrayLike2(value) {
          return value != null && isLength2(value.length) && !isFunction2(value);
        }
        function isArrayLikeObject(value) {
          return isObjectLike2(value) && isArrayLike2(value);
        }
        function isBoolean2(value) {
          return value === true || value === false || isObjectLike2(value) && baseGetTag2(value) == boolTag2;
        }
        var isBuffer2 = nativeIsBuffer2 || stubFalse2;
        var isDate = nodeIsDate ? baseUnary2(nodeIsDate) : baseIsDate;
        function isElement2(value) {
          return isObjectLike2(value) && value.nodeType === 1 && !isPlainObject2(value);
        }
        function isEmpty(value) {
          if (value == null) {
            return true;
          }
          if (isArrayLike2(value) && (isArray2(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer2(value) || isTypedArray2(value) || isArguments2(value))) {
            return !value.length;
          }
          var tag = getTag2(value);
          if (tag == mapTag2 || tag == setTag2) {
            return !value.size;
          }
          if (isPrototype2(value)) {
            return !baseKeys2(value).length;
          }
          for (var key in value) {
            if (hasOwnProperty2.call(value, key)) {
              return false;
            }
          }
          return true;
        }
        function isEqual2(value, other) {
          return baseIsEqual2(value, other);
        }
        function isEqualWith(value, other, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$1;
          var result2 = customizer ? customizer(value, other) : undefined$1;
          return result2 === undefined$1 ? baseIsEqual2(value, other, undefined$1, customizer) : !!result2;
        }
        function isError2(value) {
          if (!isObjectLike2(value)) {
            return false;
          }
          var tag = baseGetTag2(value);
          return tag == errorTag2 || tag == domExcTag2 || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject2(value);
        }
        function isFinite(value) {
          return typeof value == "number" && nativeIsFinite(value);
        }
        function isFunction2(value) {
          if (!isObject2(value)) {
            return false;
          }
          var tag = baseGetTag2(value);
          return tag == funcTag2 || tag == genTag2 || tag == asyncTag2 || tag == proxyTag2;
        }
        function isInteger(value) {
          return typeof value == "number" && value == toInteger(value);
        }
        function isLength2(value) {
          return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER2;
        }
        function isObject2(value) {
          var type2 = typeof value;
          return value != null && (type2 == "object" || type2 == "function");
        }
        function isObjectLike2(value) {
          return value != null && typeof value == "object";
        }
        var isMap2 = nodeIsMap2 ? baseUnary2(nodeIsMap2) : baseIsMap2;
        function isMatch(object2, source) {
          return object2 === source || baseIsMatch(object2, source, getMatchData(source));
        }
        function isMatchWith(object2, source, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$1;
          return baseIsMatch(object2, source, getMatchData(source), customizer);
        }
        function isNaN2(value) {
          return isNumber2(value) && value != +value;
        }
        function isNative(value) {
          if (isMaskable(value)) {
            throw new Error2(CORE_ERROR_TEXT);
          }
          return baseIsNative2(value);
        }
        function isNull(value) {
          return value === null;
        }
        function isNil2(value) {
          return value == null;
        }
        function isNumber2(value) {
          return typeof value == "number" || isObjectLike2(value) && baseGetTag2(value) == numberTag2;
        }
        function isPlainObject2(value) {
          if (!isObjectLike2(value) || baseGetTag2(value) != objectTag2) {
            return false;
          }
          var proto = getPrototype2(value);
          if (proto === null) {
            return true;
          }
          var Ctor = hasOwnProperty2.call(proto, "constructor") && proto.constructor;
          return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString2.call(Ctor) == objectCtorString2;
        }
        var isRegExp = nodeIsRegExp ? baseUnary2(nodeIsRegExp) : baseIsRegExp;
        function isSafeInteger(value) {
          return isInteger(value) && value >= -MAX_SAFE_INTEGER2 && value <= MAX_SAFE_INTEGER2;
        }
        var isSet2 = nodeIsSet2 ? baseUnary2(nodeIsSet2) : baseIsSet2;
        function isString2(value) {
          return typeof value == "string" || !isArray2(value) && isObjectLike2(value) && baseGetTag2(value) == stringTag2;
        }
        function isSymbol2(value) {
          return typeof value == "symbol" || isObjectLike2(value) && baseGetTag2(value) == symbolTag2;
        }
        var isTypedArray2 = nodeIsTypedArray2 ? baseUnary2(nodeIsTypedArray2) : baseIsTypedArray2;
        function isUndefined2(value) {
          return value === undefined$1;
        }
        function isWeakMap(value) {
          return isObjectLike2(value) && getTag2(value) == weakMapTag2;
        }
        function isWeakSet(value) {
          return isObjectLike2(value) && baseGetTag2(value) == weakSetTag;
        }
        var lt2 = createRelationalOperation(baseLt);
        var lte = createRelationalOperation(function(value, other) {
          return value <= other;
        });
        function toArray(value) {
          if (!value) {
            return [];
          }
          if (isArrayLike2(value)) {
            return isString2(value) ? stringToArray2(value) : copyArray2(value);
          }
          if (symIterator && value[symIterator]) {
            return iteratorToArray(value[symIterator]());
          }
          var tag = getTag2(value), func = tag == mapTag2 ? mapToArray2 : tag == setTag2 ? setToArray2 : values;
          return func(value);
        }
        function toFinite(value) {
          if (!value) {
            return value === 0 ? value : 0;
          }
          value = toNumber2(value);
          if (value === INFINITY2 || value === -INFINITY2) {
            var sign = value < 0 ? -1 : 1;
            return sign * MAX_INTEGER;
          }
          return value === value ? value : 0;
        }
        function toInteger(value) {
          var result2 = toFinite(value), remainder = result2 % 1;
          return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
        }
        function toLength(value) {
          return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
        }
        function toNumber2(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol2(value)) {
            return NAN2;
          }
          if (isObject2(value)) {
            var other = typeof value.valueOf == "function" ? value.valueOf() : value;
            value = isObject2(other) ? other + "" : other;
          }
          if (typeof value != "string") {
            return value === 0 ? value : +value;
          }
          value = baseTrim2(value);
          var isBinary = reIsBinary2.test(value);
          return isBinary || reIsOctal2.test(value) ? freeParseInt2(value.slice(2), isBinary ? 2 : 8) : reIsBadHex2.test(value) ? NAN2 : +value;
        }
        function toPlainObject(value) {
          return copyObject2(value, keysIn2(value));
        }
        function toSafeInteger(value) {
          return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER2, MAX_SAFE_INTEGER2) : value === 0 ? value : 0;
        }
        function toString2(value) {
          return value == null ? "" : baseToString2(value);
        }
        var assign = createAssigner2(function(object2, source) {
          if (isPrototype2(source) || isArrayLike2(source)) {
            copyObject2(source, keys2(source), object2);
            return;
          }
          for (var key in source) {
            if (hasOwnProperty2.call(source, key)) {
              assignValue2(object2, key, source[key]);
            }
          }
        });
        var assignIn = createAssigner2(function(object2, source) {
          copyObject2(source, keysIn2(source), object2);
        });
        var assignInWith2 = createAssigner2(function(object2, source, srcIndex, customizer) {
          copyObject2(source, keysIn2(source), object2, customizer);
        });
        var assignWith = createAssigner2(function(object2, source, srcIndex, customizer) {
          copyObject2(source, keys2(source), object2, customizer);
        });
        var at2 = flatRest(baseAt);
        function create(prototype, properties) {
          var result2 = baseCreate2(prototype);
          return properties == null ? result2 : baseAssign2(result2, properties);
        }
        var defaults = baseRest2(function(object2, sources) {
          object2 = Object2(object2);
          var index2 = -1;
          var length = sources.length;
          var guard = length > 2 ? sources[2] : undefined$1;
          if (guard && isIterateeCall2(sources[0], sources[1], guard)) {
            length = 1;
          }
          while (++index2 < length) {
            var source = sources[index2];
            var props = keysIn2(source);
            var propsIndex = -1;
            var propsLength = props.length;
            while (++propsIndex < propsLength) {
              var key = props[propsIndex];
              var value = object2[key];
              if (value === undefined$1 || eq2(value, objectProto2[key]) && !hasOwnProperty2.call(object2, key)) {
                object2[key] = source[key];
              }
            }
          }
          return object2;
        });
        var defaultsDeep = baseRest2(function(args) {
          args.push(undefined$1, customDefaultsMerge);
          return apply2(mergeWith, undefined$1, args);
        });
        function findKey(object2, predicate) {
          return baseFindKey(object2, getIteratee(predicate, 3), baseForOwn2);
        }
        function findLastKey(object2, predicate) {
          return baseFindKey(object2, getIteratee(predicate, 3), baseForOwnRight);
        }
        function forIn(object2, iteratee2) {
          return object2 == null ? object2 : baseFor2(object2, getIteratee(iteratee2, 3), keysIn2);
        }
        function forInRight(object2, iteratee2) {
          return object2 == null ? object2 : baseForRight(object2, getIteratee(iteratee2, 3), keysIn2);
        }
        function forOwn(object2, iteratee2) {
          return object2 && baseForOwn2(object2, getIteratee(iteratee2, 3));
        }
        function forOwnRight(object2, iteratee2) {
          return object2 && baseForOwnRight(object2, getIteratee(iteratee2, 3));
        }
        function functions(object2) {
          return object2 == null ? [] : baseFunctions(object2, keys2(object2));
        }
        function functionsIn(object2) {
          return object2 == null ? [] : baseFunctions(object2, keysIn2(object2));
        }
        function get2(object2, path, defaultValue) {
          var result2 = object2 == null ? undefined$1 : baseGet2(object2, path);
          return result2 === undefined$1 ? defaultValue : result2;
        }
        function has(object2, path) {
          return object2 != null && hasPath(object2, path, baseHas);
        }
        function hasIn(object2, path) {
          return object2 != null && hasPath(object2, path, baseHasIn);
        }
        var invert2 = createInverter2(function(result2, value, key) {
          if (value != null && typeof value.toString != "function") {
            value = nativeObjectToString2.call(value);
          }
          result2[value] = key;
        }, constant2(identity2));
        var invertBy = createInverter2(function(result2, value, key) {
          if (value != null && typeof value.toString != "function") {
            value = nativeObjectToString2.call(value);
          }
          if (hasOwnProperty2.call(result2, value)) {
            result2[value].push(key);
          } else {
            result2[value] = [key];
          }
        }, getIteratee);
        var invoke = baseRest2(baseInvoke);
        function keys2(object2) {
          return isArrayLike2(object2) ? arrayLikeKeys2(object2) : baseKeys2(object2);
        }
        function keysIn2(object2) {
          return isArrayLike2(object2) ? arrayLikeKeys2(object2, true) : baseKeysIn2(object2);
        }
        function mapKeys(object2, iteratee2) {
          var result2 = {};
          iteratee2 = getIteratee(iteratee2, 3);
          baseForOwn2(object2, function(value, key, object3) {
            baseAssignValue2(result2, iteratee2(value, key, object3), value);
          });
          return result2;
        }
        function mapValues(object2, iteratee2) {
          var result2 = {};
          iteratee2 = getIteratee(iteratee2, 3);
          baseForOwn2(object2, function(value, key, object3) {
            baseAssignValue2(result2, key, iteratee2(value, key, object3));
          });
          return result2;
        }
        var merge = createAssigner2(function(object2, source, srcIndex) {
          baseMerge(object2, source, srcIndex);
        });
        var mergeWith = createAssigner2(function(object2, source, srcIndex, customizer) {
          baseMerge(object2, source, srcIndex, customizer);
        });
        var omit = flatRest(function(object2, paths) {
          var result2 = {};
          if (object2 == null) {
            return result2;
          }
          var isDeep = false;
          paths = arrayMap2(paths, function(path) {
            path = castPath2(path, object2);
            isDeep || (isDeep = path.length > 1);
            return path;
          });
          copyObject2(object2, getAllKeysIn2(object2), result2);
          if (isDeep) {
            result2 = baseClone2(result2, CLONE_DEEP_FLAG2 | CLONE_FLAT_FLAG2 | CLONE_SYMBOLS_FLAG2, customOmitClone);
          }
          var length = paths.length;
          while (length--) {
            baseUnset(result2, paths[length]);
          }
          return result2;
        });
        function omitBy(object2, predicate) {
          return pickBy(object2, negate(getIteratee(predicate)));
        }
        var pick = flatRest(function(object2, paths) {
          return object2 == null ? {} : basePick(object2, paths);
        });
        function pickBy(object2, predicate) {
          if (object2 == null) {
            return {};
          }
          var props = arrayMap2(getAllKeysIn2(object2), function(prop) {
            return [prop];
          });
          predicate = getIteratee(predicate);
          return basePickBy(object2, props, function(value, path) {
            return predicate(value, path[0]);
          });
        }
        function result(object2, path, defaultValue) {
          path = castPath2(path, object2);
          var index2 = -1, length = path.length;
          if (!length) {
            length = 1;
            object2 = undefined$1;
          }
          while (++index2 < length) {
            var value = object2 == null ? undefined$1 : object2[toKey2(path[index2])];
            if (value === undefined$1) {
              index2 = length;
              value = defaultValue;
            }
            object2 = isFunction2(value) ? value.call(object2) : value;
          }
          return object2;
        }
        function set2(object2, path, value) {
          return object2 == null ? object2 : baseSet2(object2, path, value);
        }
        function setWith(object2, path, value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$1;
          return object2 == null ? object2 : baseSet2(object2, path, value, customizer);
        }
        var toPairs = createToPairs(keys2);
        var toPairsIn = createToPairs(keysIn2);
        function transform(object2, iteratee2, accumulator) {
          var isArr = isArray2(object2), isArrLike = isArr || isBuffer2(object2) || isTypedArray2(object2);
          iteratee2 = getIteratee(iteratee2, 4);
          if (accumulator == null) {
            var Ctor = object2 && object2.constructor;
            if (isArrLike) {
              accumulator = isArr ? new Ctor() : [];
            } else if (isObject2(object2)) {
              accumulator = isFunction2(Ctor) ? baseCreate2(getPrototype2(object2)) : {};
            } else {
              accumulator = {};
            }
          }
          (isArrLike ? arrayEach2 : baseForOwn2)(object2, function(value, index2, object3) {
            return iteratee2(accumulator, value, index2, object3);
          });
          return accumulator;
        }
        function unset(object2, path) {
          return object2 == null ? true : baseUnset(object2, path);
        }
        function update(object2, path, updater) {
          return object2 == null ? object2 : baseUpdate(object2, path, castFunction(updater));
        }
        function updateWith(object2, path, updater, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined$1;
          return object2 == null ? object2 : baseUpdate(object2, path, castFunction(updater), customizer);
        }
        function values(object2) {
          return object2 == null ? [] : baseValues2(object2, keys2(object2));
        }
        function valuesIn(object2) {
          return object2 == null ? [] : baseValues2(object2, keysIn2(object2));
        }
        function clamp(number2, lower, upper) {
          if (upper === undefined$1) {
            upper = lower;
            lower = undefined$1;
          }
          if (upper !== undefined$1) {
            upper = toNumber2(upper);
            upper = upper === upper ? upper : 0;
          }
          if (lower !== undefined$1) {
            lower = toNumber2(lower);
            lower = lower === lower ? lower : 0;
          }
          return baseClamp(toNumber2(number2), lower, upper);
        }
        function inRange(number2, start, end2) {
          start = toFinite(start);
          if (end2 === undefined$1) {
            end2 = start;
            start = 0;
          } else {
            end2 = toFinite(end2);
          }
          number2 = toNumber2(number2);
          return baseInRange(number2, start, end2);
        }
        function random(lower, upper, floating) {
          if (floating && typeof floating != "boolean" && isIterateeCall2(lower, upper, floating)) {
            upper = floating = undefined$1;
          }
          if (floating === undefined$1) {
            if (typeof upper == "boolean") {
              floating = upper;
              upper = undefined$1;
            } else if (typeof lower == "boolean") {
              floating = lower;
              lower = undefined$1;
            }
          }
          if (lower === undefined$1 && upper === undefined$1) {
            lower = 0;
            upper = 1;
          } else {
            lower = toFinite(lower);
            if (upper === undefined$1) {
              upper = lower;
              lower = 0;
            } else {
              upper = toFinite(upper);
            }
          }
          if (lower > upper) {
            var temp = lower;
            lower = upper;
            upper = temp;
          }
          if (floating || lower % 1 || upper % 1) {
            var rand = nativeRandom();
            return nativeMin2(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
          }
          return baseRandom(lower, upper);
        }
        var camelCase2 = createCompounder2(function(result2, word, index2) {
          word = word.toLowerCase();
          return result2 + (index2 ? capitalize2(word) : word);
        });
        function capitalize2(string2) {
          return upperFirst2(toString2(string2).toLowerCase());
        }
        function deburr2(string2) {
          string2 = toString2(string2);
          return string2 && string2.replace(reLatin2, deburrLetter2).replace(reComboMark2, "");
        }
        function endsWith(string2, target, position) {
          string2 = toString2(string2);
          target = baseToString2(target);
          var length = string2.length;
          position = position === undefined$1 ? length : baseClamp(toInteger(position), 0, length);
          var end2 = position;
          position -= target.length;
          return position >= 0 && string2.slice(position, end2) == target;
        }
        function escape2(string2) {
          string2 = toString2(string2);
          return string2 && reHasUnescapedHtml2.test(string2) ? string2.replace(reUnescapedHtml2, escapeHtmlChar2) : string2;
        }
        function escapeRegExp(string2) {
          string2 = toString2(string2);
          return string2 && reHasRegExpChar.test(string2) ? string2.replace(reRegExpChar2, "\\$&") : string2;
        }
        var kebabCase2 = createCompounder2(function(result2, word, index2) {
          return result2 + (index2 ? "-" : "") + word.toLowerCase();
        });
        var lowerCase = createCompounder2(function(result2, word, index2) {
          return result2 + (index2 ? " " : "") + word.toLowerCase();
        });
        var lowerFirst = createCaseFirst2("toLowerCase");
        function pad(string2, length, chars) {
          string2 = toString2(string2);
          length = toInteger(length);
          var strLength = length ? stringSize(string2) : 0;
          if (!length || strLength >= length) {
            return string2;
          }
          var mid = (length - strLength) / 2;
          return createPadding(nativeFloor(mid), chars) + string2 + createPadding(nativeCeil(mid), chars);
        }
        function padEnd(string2, length, chars) {
          string2 = toString2(string2);
          length = toInteger(length);
          var strLength = length ? stringSize(string2) : 0;
          return length && strLength < length ? string2 + createPadding(length - strLength, chars) : string2;
        }
        function padStart(string2, length, chars) {
          string2 = toString2(string2);
          length = toInteger(length);
          var strLength = length ? stringSize(string2) : 0;
          return length && strLength < length ? createPadding(length - strLength, chars) + string2 : string2;
        }
        function parseInt2(string2, radix, guard) {
          if (guard || radix == null) {
            radix = 0;
          } else if (radix) {
            radix = +radix;
          }
          return nativeParseInt(toString2(string2).replace(reTrimStart2, ""), radix || 0);
        }
        function repeat(string2, n, guard) {
          if (guard ? isIterateeCall2(string2, n, guard) : n === undefined$1) {
            n = 1;
          } else {
            n = toInteger(n);
          }
          return baseRepeat(toString2(string2), n);
        }
        function replace() {
          var args = arguments, string2 = toString2(args[0]);
          return args.length < 3 ? string2 : string2.replace(args[1], args[2]);
        }
        var snakeCase = createCompounder2(function(result2, word, index2) {
          return result2 + (index2 ? "_" : "") + word.toLowerCase();
        });
        function split(string2, separator, limit) {
          if (limit && typeof limit != "number" && isIterateeCall2(string2, separator, limit)) {
            separator = limit = undefined$1;
          }
          limit = limit === undefined$1 ? MAX_ARRAY_LENGTH : limit >>> 0;
          if (!limit) {
            return [];
          }
          string2 = toString2(string2);
          if (string2 && (typeof separator == "string" || separator != null && !isRegExp(separator))) {
            separator = baseToString2(separator);
            if (!separator && hasUnicode2(string2)) {
              return castSlice2(stringToArray2(string2), 0, limit);
            }
          }
          return string2.split(separator, limit);
        }
        var startCase = createCompounder2(function(result2, word, index2) {
          return result2 + (index2 ? " " : "") + upperFirst2(word);
        });
        function startsWith(string2, target, position) {
          string2 = toString2(string2);
          position = position == null ? 0 : baseClamp(toInteger(position), 0, string2.length);
          target = baseToString2(target);
          return string2.slice(position, position + target.length) == target;
        }
        function template2(string2, options, guard) {
          var settings2 = lodash2.templateSettings;
          if (guard && isIterateeCall2(string2, options, guard)) {
            options = undefined$1;
          }
          string2 = toString2(string2);
          options = assignInWith2({}, options, settings2, customDefaultsAssignIn2);
          var imports = assignInWith2({}, options.imports, settings2.imports, customDefaultsAssignIn2), importsKeys = keys2(imports), importsValues = baseValues2(imports, importsKeys);
          var isEscaping, isEvaluating, index2 = 0, interpolate = options.interpolate || reNoMatch2, source = "__p += '";
          var reDelimiters = RegExp2(
            (options.escape || reNoMatch2).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate2 ? reEsTemplate2 : reNoMatch2).source + "|" + (options.evaluate || reNoMatch2).source + "|$",
            "g"
          );
          var sourceURL = "//# sourceURL=" + (hasOwnProperty2.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
          string2.replace(reDelimiters, function(match2, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
            interpolateValue || (interpolateValue = esTemplateValue);
            source += string2.slice(index2, offset).replace(reUnescapedString2, escapeStringChar2);
            if (escapeValue) {
              isEscaping = true;
              source += "' +\n__e(" + escapeValue + ") +\n'";
            }
            if (evaluateValue) {
              isEvaluating = true;
              source += "';\n" + evaluateValue + ";\n__p += '";
            }
            if (interpolateValue) {
              source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
            }
            index2 = offset + match2.length;
            return match2;
          });
          source += "';\n";
          var variable = hasOwnProperty2.call(options, "variable") && options.variable;
          if (!variable) {
            source = "with (obj) {\n" + source + "\n}\n";
          } else if (reForbiddenIdentifierChars2.test(variable)) {
            throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT2);
          }
          source = (isEvaluating ? source.replace(reEmptyStringLeading2, "") : source).replace(reEmptyStringMiddle2, "$1").replace(reEmptyStringTrailing2, "$1;");
          source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
          var result2 = attempt2(function() {
            return Function2(importsKeys, sourceURL + "return " + source).apply(undefined$1, importsValues);
          });
          result2.source = source;
          if (isError2(result2)) {
            throw result2;
          }
          return result2;
        }
        function toLower(value) {
          return toString2(value).toLowerCase();
        }
        function toUpper(value) {
          return toString2(value).toUpperCase();
        }
        function trim(string2, chars, guard) {
          string2 = toString2(string2);
          if (string2 && (guard || chars === undefined$1)) {
            return baseTrim2(string2);
          }
          if (!string2 || !(chars = baseToString2(chars))) {
            return string2;
          }
          var strSymbols = stringToArray2(string2), chrSymbols = stringToArray2(chars), start = charsStartIndex(strSymbols, chrSymbols), end2 = charsEndIndex(strSymbols, chrSymbols) + 1;
          return castSlice2(strSymbols, start, end2).join("");
        }
        function trimEnd(string2, chars, guard) {
          string2 = toString2(string2);
          if (string2 && (guard || chars === undefined$1)) {
            return string2.slice(0, trimmedEndIndex2(string2) + 1);
          }
          if (!string2 || !(chars = baseToString2(chars))) {
            return string2;
          }
          var strSymbols = stringToArray2(string2), end2 = charsEndIndex(strSymbols, stringToArray2(chars)) + 1;
          return castSlice2(strSymbols, 0, end2).join("");
        }
        function trimStart(string2, chars, guard) {
          string2 = toString2(string2);
          if (string2 && (guard || chars === undefined$1)) {
            return string2.replace(reTrimStart2, "");
          }
          if (!string2 || !(chars = baseToString2(chars))) {
            return string2;
          }
          var strSymbols = stringToArray2(string2), start = charsStartIndex(strSymbols, stringToArray2(chars));
          return castSlice2(strSymbols, start).join("");
        }
        function truncate(string2, options) {
          var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
          if (isObject2(options)) {
            var separator = "separator" in options ? options.separator : separator;
            length = "length" in options ? toInteger(options.length) : length;
            omission = "omission" in options ? baseToString2(options.omission) : omission;
          }
          string2 = toString2(string2);
          var strLength = string2.length;
          if (hasUnicode2(string2)) {
            var strSymbols = stringToArray2(string2);
            strLength = strSymbols.length;
          }
          if (length >= strLength) {
            return string2;
          }
          var end2 = length - stringSize(omission);
          if (end2 < 1) {
            return omission;
          }
          var result2 = strSymbols ? castSlice2(strSymbols, 0, end2).join("") : string2.slice(0, end2);
          if (separator === undefined$1) {
            return result2 + omission;
          }
          if (strSymbols) {
            end2 += result2.length - end2;
          }
          if (isRegExp(separator)) {
            if (string2.slice(end2).search(separator)) {
              var match2, substring = result2;
              if (!separator.global) {
                separator = RegExp2(separator.source, toString2(reFlags2.exec(separator)) + "g");
              }
              separator.lastIndex = 0;
              while (match2 = separator.exec(substring)) {
                var newEnd = match2.index;
              }
              result2 = result2.slice(0, newEnd === undefined$1 ? end2 : newEnd);
            }
          } else if (string2.indexOf(baseToString2(separator), end2) != end2) {
            var index2 = result2.lastIndexOf(separator);
            if (index2 > -1) {
              result2 = result2.slice(0, index2);
            }
          }
          return result2 + omission;
        }
        function unescape(string2) {
          string2 = toString2(string2);
          return string2 && reHasEscapedHtml.test(string2) ? string2.replace(reEscapedHtml, unescapeHtmlChar) : string2;
        }
        var upperCase = createCompounder2(function(result2, word, index2) {
          return result2 + (index2 ? " " : "") + word.toUpperCase();
        });
        var upperFirst2 = createCaseFirst2("toUpperCase");
        function words2(string2, pattern2, guard) {
          string2 = toString2(string2);
          pattern2 = guard ? undefined$1 : pattern2;
          if (pattern2 === undefined$1) {
            return hasUnicodeWord2(string2) ? unicodeWords2(string2) : asciiWords2(string2);
          }
          return string2.match(pattern2) || [];
        }
        var attempt2 = baseRest2(function(func, args) {
          try {
            return apply2(func, undefined$1, args);
          } catch (e) {
            return isError2(e) ? e : new Error2(e);
          }
        });
        var bindAll = flatRest(function(object2, methodNames) {
          arrayEach2(methodNames, function(key) {
            key = toKey2(key);
            baseAssignValue2(object2, key, bind(object2[key], object2));
          });
          return object2;
        });
        function cond(pairs) {
          var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
          pairs = !length ? [] : arrayMap2(pairs, function(pair) {
            if (typeof pair[1] != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT2);
            }
            return [toIteratee(pair[0]), pair[1]];
          });
          return baseRest2(function(args) {
            var index2 = -1;
            while (++index2 < length) {
              var pair = pairs[index2];
              if (apply2(pair[0], this, args)) {
                return apply2(pair[1], this, args);
              }
            }
          });
        }
        function conforms(source) {
          return baseConforms(baseClone2(source, CLONE_DEEP_FLAG2));
        }
        function constant2(value) {
          return function() {
            return value;
          };
        }
        function defaultTo(value, defaultValue) {
          return value == null || value !== value ? defaultValue : value;
        }
        var flow = createFlow();
        var flowRight = createFlow(true);
        function identity2(value) {
          return value;
        }
        function iteratee(func) {
          return baseIteratee(typeof func == "function" ? func : baseClone2(func, CLONE_DEEP_FLAG2));
        }
        function matches(source) {
          return baseMatches(baseClone2(source, CLONE_DEEP_FLAG2));
        }
        function matchesProperty(path, srcValue) {
          return baseMatchesProperty(path, baseClone2(srcValue, CLONE_DEEP_FLAG2));
        }
        var method2 = baseRest2(function(path, args) {
          return function(object2) {
            return baseInvoke(object2, path, args);
          };
        });
        var methodOf = baseRest2(function(object2, args) {
          return function(path) {
            return baseInvoke(object2, path, args);
          };
        });
        function mixin(object2, source, options) {
          var props = keys2(source), methodNames = baseFunctions(source, props);
          if (options == null && !(isObject2(source) && (methodNames.length || !props.length))) {
            options = source;
            source = object2;
            object2 = this;
            methodNames = baseFunctions(source, keys2(source));
          }
          var chain2 = !(isObject2(options) && "chain" in options) || !!options.chain, isFunc = isFunction2(object2);
          arrayEach2(methodNames, function(methodName) {
            var func = source[methodName];
            object2[methodName] = func;
            if (isFunc) {
              object2.prototype[methodName] = function() {
                var chainAll = this.__chain__;
                if (chain2 || chainAll) {
                  var result2 = object2(this.__wrapped__), actions = result2.__actions__ = copyArray2(this.__actions__);
                  actions.push({ "func": func, "args": arguments, "thisArg": object2 });
                  result2.__chain__ = chainAll;
                  return result2;
                }
                return func.apply(object2, arrayPush2([this.value()], arguments));
              };
            }
          });
          return object2;
        }
        function noConflict() {
          if (root2._ === this) {
            root2._ = oldDash;
          }
          return this;
        }
        function noop2() {
        }
        function nthArg(n) {
          n = toInteger(n);
          return baseRest2(function(args) {
            return baseNth(args, n);
          });
        }
        var over = createOver(arrayMap2);
        var overEvery = createOver(arrayEvery);
        var overSome = createOver(arraySome2);
        function property(path) {
          return isKey2(path) ? baseProperty(toKey2(path)) : basePropertyDeep(path);
        }
        function propertyOf(object2) {
          return function(path) {
            return object2 == null ? undefined$1 : baseGet2(object2, path);
          };
        }
        var range2 = createRange();
        var rangeRight = createRange(true);
        function stubArray2() {
          return [];
        }
        function stubFalse2() {
          return false;
        }
        function stubObject() {
          return {};
        }
        function stubString() {
          return "";
        }
        function stubTrue() {
          return true;
        }
        function times(n, iteratee2) {
          n = toInteger(n);
          if (n < 1 || n > MAX_SAFE_INTEGER2) {
            return [];
          }
          var index2 = MAX_ARRAY_LENGTH, length = nativeMin2(n, MAX_ARRAY_LENGTH);
          iteratee2 = getIteratee(iteratee2);
          n -= MAX_ARRAY_LENGTH;
          var result2 = baseTimes2(length, iteratee2);
          while (++index2 < n) {
            iteratee2(index2);
          }
          return result2;
        }
        function toPath(value) {
          if (isArray2(value)) {
            return arrayMap2(value, toKey2);
          }
          return isSymbol2(value) ? [value] : copyArray2(stringToPath2(toString2(value)));
        }
        function uniqueId(prefix) {
          var id = ++idCounter;
          return toString2(prefix) + id;
        }
        var add = createMathOperation(function(augend, addend) {
          return augend + addend;
        }, 0);
        var ceil = createRound("ceil");
        var divide = createMathOperation(function(dividend, divisor) {
          return dividend / divisor;
        }, 1);
        var floor = createRound("floor");
        function max(array2) {
          return array2 && array2.length ? baseExtremum(array2, identity2, baseGt) : undefined$1;
        }
        function maxBy(array2, iteratee2) {
          return array2 && array2.length ? baseExtremum(array2, getIteratee(iteratee2, 2), baseGt) : undefined$1;
        }
        function mean(array2) {
          return baseMean(array2, identity2);
        }
        function meanBy(array2, iteratee2) {
          return baseMean(array2, getIteratee(iteratee2, 2));
        }
        function min(array2) {
          return array2 && array2.length ? baseExtremum(array2, identity2, baseLt) : undefined$1;
        }
        function minBy(array2, iteratee2) {
          return array2 && array2.length ? baseExtremum(array2, getIteratee(iteratee2, 2), baseLt) : undefined$1;
        }
        var multiply = createMathOperation(function(multiplier, multiplicand) {
          return multiplier * multiplicand;
        }, 1);
        var round = createRound("round");
        var subtract = createMathOperation(function(minuend, subtrahend) {
          return minuend - subtrahend;
        }, 0);
        function sum(array2) {
          return array2 && array2.length ? baseSum(array2, identity2) : 0;
        }
        function sumBy(array2, iteratee2) {
          return array2 && array2.length ? baseSum(array2, getIteratee(iteratee2, 2)) : 0;
        }
        lodash2.after = after;
        lodash2.ary = ary;
        lodash2.assign = assign;
        lodash2.assignIn = assignIn;
        lodash2.assignInWith = assignInWith2;
        lodash2.assignWith = assignWith;
        lodash2.at = at2;
        lodash2.before = before;
        lodash2.bind = bind;
        lodash2.bindAll = bindAll;
        lodash2.bindKey = bindKey;
        lodash2.castArray = castArray2;
        lodash2.chain = chain;
        lodash2.chunk = chunk;
        lodash2.compact = compact;
        lodash2.concat = concat;
        lodash2.cond = cond;
        lodash2.conforms = conforms;
        lodash2.constant = constant2;
        lodash2.countBy = countBy;
        lodash2.create = create;
        lodash2.curry = curry;
        lodash2.curryRight = curryRight;
        lodash2.debounce = debounce2;
        lodash2.defaults = defaults;
        lodash2.defaultsDeep = defaultsDeep;
        lodash2.defer = defer;
        lodash2.delay = delay;
        lodash2.difference = difference;
        lodash2.differenceBy = differenceBy;
        lodash2.differenceWith = differenceWith;
        lodash2.drop = drop;
        lodash2.dropRight = dropRight;
        lodash2.dropRightWhile = dropRightWhile;
        lodash2.dropWhile = dropWhile;
        lodash2.fill = fill;
        lodash2.filter = filter;
        lodash2.flatMap = flatMap;
        lodash2.flatMapDeep = flatMapDeep;
        lodash2.flatMapDepth = flatMapDepth;
        lodash2.flatten = flatten;
        lodash2.flattenDeep = flattenDeep;
        lodash2.flattenDepth = flattenDepth;
        lodash2.flip = flip;
        lodash2.flow = flow;
        lodash2.flowRight = flowRight;
        lodash2.fromPairs = fromPairs2;
        lodash2.functions = functions;
        lodash2.functionsIn = functionsIn;
        lodash2.groupBy = groupBy;
        lodash2.initial = initial;
        lodash2.intersection = intersection;
        lodash2.intersectionBy = intersectionBy;
        lodash2.intersectionWith = intersectionWith;
        lodash2.invert = invert2;
        lodash2.invertBy = invertBy;
        lodash2.invokeMap = invokeMap;
        lodash2.iteratee = iteratee;
        lodash2.keyBy = keyBy;
        lodash2.keys = keys2;
        lodash2.keysIn = keysIn2;
        lodash2.map = map;
        lodash2.mapKeys = mapKeys;
        lodash2.mapValues = mapValues;
        lodash2.matches = matches;
        lodash2.matchesProperty = matchesProperty;
        lodash2.memoize = memoize2;
        lodash2.merge = merge;
        lodash2.mergeWith = mergeWith;
        lodash2.method = method2;
        lodash2.methodOf = methodOf;
        lodash2.mixin = mixin;
        lodash2.negate = negate;
        lodash2.nthArg = nthArg;
        lodash2.omit = omit;
        lodash2.omitBy = omitBy;
        lodash2.once = once2;
        lodash2.orderBy = orderBy;
        lodash2.over = over;
        lodash2.overArgs = overArgs;
        lodash2.overEvery = overEvery;
        lodash2.overSome = overSome;
        lodash2.partial = partial;
        lodash2.partialRight = partialRight;
        lodash2.partition = partition;
        lodash2.pick = pick;
        lodash2.pickBy = pickBy;
        lodash2.property = property;
        lodash2.propertyOf = propertyOf;
        lodash2.pull = pull;
        lodash2.pullAll = pullAll;
        lodash2.pullAllBy = pullAllBy;
        lodash2.pullAllWith = pullAllWith;
        lodash2.pullAt = pullAt;
        lodash2.range = range2;
        lodash2.rangeRight = rangeRight;
        lodash2.rearg = rearg;
        lodash2.reject = reject;
        lodash2.remove = remove;
        lodash2.rest = rest;
        lodash2.reverse = reverse;
        lodash2.sampleSize = sampleSize;
        lodash2.set = set2;
        lodash2.setWith = setWith;
        lodash2.shuffle = shuffle;
        lodash2.slice = slice;
        lodash2.sortBy = sortBy;
        lodash2.sortedUniq = sortedUniq;
        lodash2.sortedUniqBy = sortedUniqBy;
        lodash2.split = split;
        lodash2.spread = spread;
        lodash2.tail = tail;
        lodash2.take = take;
        lodash2.takeRight = takeRight;
        lodash2.takeRightWhile = takeRightWhile;
        lodash2.takeWhile = takeWhile;
        lodash2.tap = tap;
        lodash2.throttle = throttle;
        lodash2.thru = thru;
        lodash2.toArray = toArray;
        lodash2.toPairs = toPairs;
        lodash2.toPairsIn = toPairsIn;
        lodash2.toPath = toPath;
        lodash2.toPlainObject = toPlainObject;
        lodash2.transform = transform;
        lodash2.unary = unary;
        lodash2.union = union;
        lodash2.unionBy = unionBy;
        lodash2.unionWith = unionWith;
        lodash2.uniq = uniq;
        lodash2.uniqBy = uniqBy;
        lodash2.uniqWith = uniqWith;
        lodash2.unset = unset;
        lodash2.unzip = unzip;
        lodash2.unzipWith = unzipWith;
        lodash2.update = update;
        lodash2.updateWith = updateWith;
        lodash2.values = values;
        lodash2.valuesIn = valuesIn;
        lodash2.without = without;
        lodash2.words = words2;
        lodash2.wrap = wrap;
        lodash2.xor = xor;
        lodash2.xorBy = xorBy;
        lodash2.xorWith = xorWith;
        lodash2.zip = zip;
        lodash2.zipObject = zipObject;
        lodash2.zipObjectDeep = zipObjectDeep;
        lodash2.zipWith = zipWith;
        lodash2.entries = toPairs;
        lodash2.entriesIn = toPairsIn;
        lodash2.extend = assignIn;
        lodash2.extendWith = assignInWith2;
        mixin(lodash2, lodash2);
        lodash2.add = add;
        lodash2.attempt = attempt2;
        lodash2.camelCase = camelCase2;
        lodash2.capitalize = capitalize2;
        lodash2.ceil = ceil;
        lodash2.clamp = clamp;
        lodash2.clone = clone2;
        lodash2.cloneDeep = cloneDeep;
        lodash2.cloneDeepWith = cloneDeepWith;
        lodash2.cloneWith = cloneWith;
        lodash2.conformsTo = conformsTo;
        lodash2.deburr = deburr2;
        lodash2.defaultTo = defaultTo;
        lodash2.divide = divide;
        lodash2.endsWith = endsWith;
        lodash2.eq = eq2;
        lodash2.escape = escape2;
        lodash2.escapeRegExp = escapeRegExp;
        lodash2.every = every;
        lodash2.find = find;
        lodash2.findIndex = findIndex;
        lodash2.findKey = findKey;
        lodash2.findLast = findLast;
        lodash2.findLastIndex = findLastIndex;
        lodash2.findLastKey = findLastKey;
        lodash2.floor = floor;
        lodash2.forEach = forEach;
        lodash2.forEachRight = forEachRight;
        lodash2.forIn = forIn;
        lodash2.forInRight = forInRight;
        lodash2.forOwn = forOwn;
        lodash2.forOwnRight = forOwnRight;
        lodash2.get = get2;
        lodash2.gt = gt2;
        lodash2.gte = gte;
        lodash2.has = has;
        lodash2.hasIn = hasIn;
        lodash2.head = head;
        lodash2.identity = identity2;
        lodash2.includes = includes;
        lodash2.indexOf = indexOf;
        lodash2.inRange = inRange;
        lodash2.invoke = invoke;
        lodash2.isArguments = isArguments2;
        lodash2.isArray = isArray2;
        lodash2.isArrayBuffer = isArrayBuffer;
        lodash2.isArrayLike = isArrayLike2;
        lodash2.isArrayLikeObject = isArrayLikeObject;
        lodash2.isBoolean = isBoolean2;
        lodash2.isBuffer = isBuffer2;
        lodash2.isDate = isDate;
        lodash2.isElement = isElement2;
        lodash2.isEmpty = isEmpty;
        lodash2.isEqual = isEqual2;
        lodash2.isEqualWith = isEqualWith;
        lodash2.isError = isError2;
        lodash2.isFinite = isFinite;
        lodash2.isFunction = isFunction2;
        lodash2.isInteger = isInteger;
        lodash2.isLength = isLength2;
        lodash2.isMap = isMap2;
        lodash2.isMatch = isMatch;
        lodash2.isMatchWith = isMatchWith;
        lodash2.isNaN = isNaN2;
        lodash2.isNative = isNative;
        lodash2.isNil = isNil2;
        lodash2.isNull = isNull;
        lodash2.isNumber = isNumber2;
        lodash2.isObject = isObject2;
        lodash2.isObjectLike = isObjectLike2;
        lodash2.isPlainObject = isPlainObject2;
        lodash2.isRegExp = isRegExp;
        lodash2.isSafeInteger = isSafeInteger;
        lodash2.isSet = isSet2;
        lodash2.isString = isString2;
        lodash2.isSymbol = isSymbol2;
        lodash2.isTypedArray = isTypedArray2;
        lodash2.isUndefined = isUndefined2;
        lodash2.isWeakMap = isWeakMap;
        lodash2.isWeakSet = isWeakSet;
        lodash2.join = join;
        lodash2.kebabCase = kebabCase2;
        lodash2.last = last2;
        lodash2.lastIndexOf = lastIndexOf;
        lodash2.lowerCase = lowerCase;
        lodash2.lowerFirst = lowerFirst;
        lodash2.lt = lt2;
        lodash2.lte = lte;
        lodash2.max = max;
        lodash2.maxBy = maxBy;
        lodash2.mean = mean;
        lodash2.meanBy = meanBy;
        lodash2.min = min;
        lodash2.minBy = minBy;
        lodash2.stubArray = stubArray2;
        lodash2.stubFalse = stubFalse2;
        lodash2.stubObject = stubObject;
        lodash2.stubString = stubString;
        lodash2.stubTrue = stubTrue;
        lodash2.multiply = multiply;
        lodash2.nth = nth;
        lodash2.noConflict = noConflict;
        lodash2.noop = noop2;
        lodash2.now = now2;
        lodash2.pad = pad;
        lodash2.padEnd = padEnd;
        lodash2.padStart = padStart;
        lodash2.parseInt = parseInt2;
        lodash2.random = random;
        lodash2.reduce = reduce;
        lodash2.reduceRight = reduceRight;
        lodash2.repeat = repeat;
        lodash2.replace = replace;
        lodash2.result = result;
        lodash2.round = round;
        lodash2.runInContext = runInContext2;
        lodash2.sample = sample;
        lodash2.size = size;
        lodash2.snakeCase = snakeCase;
        lodash2.some = some;
        lodash2.sortedIndex = sortedIndex;
        lodash2.sortedIndexBy = sortedIndexBy;
        lodash2.sortedIndexOf = sortedIndexOf;
        lodash2.sortedLastIndex = sortedLastIndex;
        lodash2.sortedLastIndexBy = sortedLastIndexBy;
        lodash2.sortedLastIndexOf = sortedLastIndexOf;
        lodash2.startCase = startCase;
        lodash2.startsWith = startsWith;
        lodash2.subtract = subtract;
        lodash2.sum = sum;
        lodash2.sumBy = sumBy;
        lodash2.template = template2;
        lodash2.times = times;
        lodash2.toFinite = toFinite;
        lodash2.toInteger = toInteger;
        lodash2.toLength = toLength;
        lodash2.toLower = toLower;
        lodash2.toNumber = toNumber2;
        lodash2.toSafeInteger = toSafeInteger;
        lodash2.toString = toString2;
        lodash2.toUpper = toUpper;
        lodash2.trim = trim;
        lodash2.trimEnd = trimEnd;
        lodash2.trimStart = trimStart;
        lodash2.truncate = truncate;
        lodash2.unescape = unescape;
        lodash2.uniqueId = uniqueId;
        lodash2.upperCase = upperCase;
        lodash2.upperFirst = upperFirst2;
        lodash2.each = forEach;
        lodash2.eachRight = forEachRight;
        lodash2.first = head;
        mixin(lodash2, function() {
          var source = {};
          baseForOwn2(lodash2, function(func, methodName) {
            if (!hasOwnProperty2.call(lodash2.prototype, methodName)) {
              source[methodName] = func;
            }
          });
          return source;
        }(), { "chain": false });
        lodash2.VERSION = VERSION;
        arrayEach2(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
          lodash2[methodName].placeholder = lodash2;
        });
        arrayEach2(["drop", "take"], function(methodName, index2) {
          LazyWrapper.prototype[methodName] = function(n) {
            n = n === undefined$1 ? 1 : nativeMax2(toInteger(n), 0);
            var result2 = this.__filtered__ && !index2 ? new LazyWrapper(this) : this.clone();
            if (result2.__filtered__) {
              result2.__takeCount__ = nativeMin2(n, result2.__takeCount__);
            } else {
              result2.__views__.push({
                "size": nativeMin2(n, MAX_ARRAY_LENGTH),
                "type": methodName + (result2.__dir__ < 0 ? "Right" : "")
              });
            }
            return result2;
          };
          LazyWrapper.prototype[methodName + "Right"] = function(n) {
            return this.reverse()[methodName](n).reverse();
          };
        });
        arrayEach2(["filter", "map", "takeWhile"], function(methodName, index2) {
          var type2 = index2 + 1, isFilter = type2 == LAZY_FILTER_FLAG || type2 == LAZY_WHILE_FLAG;
          LazyWrapper.prototype[methodName] = function(iteratee2) {
            var result2 = this.clone();
            result2.__iteratees__.push({
              "iteratee": getIteratee(iteratee2, 3),
              "type": type2
            });
            result2.__filtered__ = result2.__filtered__ || isFilter;
            return result2;
          };
        });
        arrayEach2(["head", "last"], function(methodName, index2) {
          var takeName = "take" + (index2 ? "Right" : "");
          LazyWrapper.prototype[methodName] = function() {
            return this[takeName](1).value()[0];
          };
        });
        arrayEach2(["initial", "tail"], function(methodName, index2) {
          var dropName = "drop" + (index2 ? "" : "Right");
          LazyWrapper.prototype[methodName] = function() {
            return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
          };
        });
        LazyWrapper.prototype.compact = function() {
          return this.filter(identity2);
        };
        LazyWrapper.prototype.find = function(predicate) {
          return this.filter(predicate).head();
        };
        LazyWrapper.prototype.findLast = function(predicate) {
          return this.reverse().find(predicate);
        };
        LazyWrapper.prototype.invokeMap = baseRest2(function(path, args) {
          if (typeof path == "function") {
            return new LazyWrapper(this);
          }
          return this.map(function(value) {
            return baseInvoke(value, path, args);
          });
        });
        LazyWrapper.prototype.reject = function(predicate) {
          return this.filter(negate(getIteratee(predicate)));
        };
        LazyWrapper.prototype.slice = function(start, end2) {
          start = toInteger(start);
          var result2 = this;
          if (result2.__filtered__ && (start > 0 || end2 < 0)) {
            return new LazyWrapper(result2);
          }
          if (start < 0) {
            result2 = result2.takeRight(-start);
          } else if (start) {
            result2 = result2.drop(start);
          }
          if (end2 !== undefined$1) {
            end2 = toInteger(end2);
            result2 = end2 < 0 ? result2.dropRight(-end2) : result2.take(end2 - start);
          }
          return result2;
        };
        LazyWrapper.prototype.takeRightWhile = function(predicate) {
          return this.reverse().takeWhile(predicate).reverse();
        };
        LazyWrapper.prototype.toArray = function() {
          return this.take(MAX_ARRAY_LENGTH);
        };
        baseForOwn2(LazyWrapper.prototype, function(func, methodName) {
          var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash2[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
          if (!lodashFunc) {
            return;
          }
          lodash2.prototype[methodName] = function() {
            var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args[0], useLazy = isLazy || isArray2(value);
            var interceptor = function(value2) {
              var result3 = lodashFunc.apply(lodash2, arrayPush2([value2], args));
              return isTaker && chainAll ? result3[0] : result3;
            };
            if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
              isLazy = useLazy = false;
            }
            var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
            if (!retUnwrapped && useLazy) {
              value = onlyLazy ? value : new LazyWrapper(this);
              var result2 = func.apply(value, args);
              result2.__actions__.push({ "func": thru, "args": [interceptor], "thisArg": undefined$1 });
              return new LodashWrapper(result2, chainAll);
            }
            if (isUnwrapped && onlyLazy) {
              return func.apply(this, args);
            }
            result2 = this.thru(interceptor);
            return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
          };
        });
        arrayEach2(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
          var func = arrayProto2[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
          lodash2.prototype[methodName] = function() {
            var args = arguments;
            if (retUnwrapped && !this.__chain__) {
              var value = this.value();
              return func.apply(isArray2(value) ? value : [], args);
            }
            return this[chainName](function(value2) {
              return func.apply(isArray2(value2) ? value2 : [], args);
            });
          };
        });
        baseForOwn2(LazyWrapper.prototype, function(func, methodName) {
          var lodashFunc = lodash2[methodName];
          if (lodashFunc) {
            var key = lodashFunc.name + "";
            if (!hasOwnProperty2.call(realNames, key)) {
              realNames[key] = [];
            }
            realNames[key].push({ "name": methodName, "func": lodashFunc });
          }
        });
        realNames[createHybrid(undefined$1, WRAP_BIND_KEY_FLAG).name] = [{
          "name": "wrapper",
          "func": undefined$1
        }];
        LazyWrapper.prototype.clone = lazyClone;
        LazyWrapper.prototype.reverse = lazyReverse;
        LazyWrapper.prototype.value = lazyValue;
        lodash2.prototype.at = wrapperAt;
        lodash2.prototype.chain = wrapperChain;
        lodash2.prototype.commit = wrapperCommit;
        lodash2.prototype.next = wrapperNext;
        lodash2.prototype.plant = wrapperPlant;
        lodash2.prototype.reverse = wrapperReverse;
        lodash2.prototype.toJSON = lodash2.prototype.valueOf = lodash2.prototype.value = wrapperValue;
        lodash2.prototype.first = lodash2.prototype.head;
        if (symIterator) {
          lodash2.prototype[symIterator] = wrapperToIterator;
        }
        return lodash2;
      };
      var _ = runInContext();
      if (freeModule2) {
        (freeModule2.exports = _)._ = _;
        freeExports2._ = _;
      } else {
        root2._ = _;
      }
    }).call(commonjsGlobal);
  })(lodash, lodash.exports);
  var __spreadArray = globalThis && globalThis.__spreadArray || function(to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i2 = 0, l = from.length, ar; i2 < l; i2++) {
        if (ar || !(i2 in from)) {
          if (!ar)
            ar = Array.prototype.slice.call(from, 0, i2);
          ar[i2] = from[i2];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  var BrowserInfo = function() {
    function BrowserInfo2(name, version, os) {
      this.name = name;
      this.version = version;
      this.os = os;
      this.type = "browser";
    }
    return BrowserInfo2;
  }();
  var NodeInfo = function() {
    function NodeInfo2(version) {
      this.version = version;
      this.type = "node";
      this.name = "node";
      this.os = process.platform;
    }
    return NodeInfo2;
  }();
  var SearchBotDeviceInfo = function() {
    function SearchBotDeviceInfo2(name, version, os, bot) {
      this.name = name;
      this.version = version;
      this.os = os;
      this.bot = bot;
      this.type = "bot-device";
    }
    return SearchBotDeviceInfo2;
  }();
  var BotInfo = function() {
    function BotInfo2() {
      this.type = "bot";
      this.bot = true;
      this.name = "bot";
      this.version = null;
      this.os = null;
    }
    return BotInfo2;
  }();
  var ReactNativeInfo = function() {
    function ReactNativeInfo2() {
      this.type = "react-native";
      this.name = "react-native";
      this.version = null;
      this.os = null;
    }
    return ReactNativeInfo2;
  }();
  var SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
  var SEARCHBOT_OS_REGEX = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/;
  var REQUIRED_VERSION_PARTS = 3;
  var userAgentRules = [
    ["aol", /AOLShield\/([0-9\._]+)/],
    ["edge", /Edge\/([0-9\._]+)/],
    ["edge-ios", /EdgiOS\/([0-9\._]+)/],
    ["yandexbrowser", /YaBrowser\/([0-9\._]+)/],
    ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/],
    ["samsung", /SamsungBrowser\/([0-9\.]+)/],
    ["silk", /\bSilk\/([0-9._-]+)\b/],
    ["miui", /MiuiBrowser\/([0-9\.]+)$/],
    ["beaker", /BeakerBrowser\/([0-9\.]+)/],
    ["edge-chromium", /EdgA?\/([0-9\.]+)/],
    [
      "chromium-webview",
      /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/
    ],
    ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
    ["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/],
    ["crios", /CriOS\/([0-9\.]+)(:?\s|$)/],
    ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/],
    ["fxios", /FxiOS\/([0-9\.]+)/],
    ["opera-mini", /Opera Mini.*Version\/([0-9\.]+)/],
    ["opera", /Opera\/([0-9\.]+)(?:\s|$)/],
    ["opera", /OPR\/([0-9\.]+)(:?\s|$)/],
    ["pie", /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],
    ["pie", /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],
    ["netfront", /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],
    ["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
    ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
    ["ie", /MSIE\s(7\.0)/],
    ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/],
    ["android", /Android\s([0-9\.]+)/],
    ["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/],
    ["safari", /Version\/([0-9\._]+).*Safari/],
    ["facebook", /FB[AS]V\/([0-9\.]+)/],
    ["instagram", /Instagram\s([0-9\.]+)/],
    ["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/],
    ["ios-webview", /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
    ["curl", /^curl\/([0-9\.]+)$/],
    ["searchbot", SEARCHBOX_UA_REGEX]
  ];
  var operatingSystemRules = [
    ["iOS", /iP(hone|od|ad)/],
    ["Android OS", /Android/],
    ["BlackBerry OS", /BlackBerry|BB10/],
    ["Windows Mobile", /IEMobile/],
    ["Amazon OS", /Kindle/],
    ["Windows 3.11", /Win16/],
    ["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/],
    ["Windows 98", /(Windows 98)|(Win98)/],
    ["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/],
    ["Windows XP", /(Windows NT 5.1)|(Windows XP)/],
    ["Windows Server 2003", /(Windows NT 5.2)/],
    ["Windows Vista", /(Windows NT 6.0)/],
    ["Windows 7", /(Windows NT 6.1)/],
    ["Windows 8", /(Windows NT 6.2)/],
    ["Windows 8.1", /(Windows NT 6.3)/],
    ["Windows 10", /(Windows NT 10.0)/],
    ["Windows ME", /Windows ME/],
    ["Windows CE", /Windows CE|WinCE|Microsoft Pocket Internet Explorer/],
    ["Open BSD", /OpenBSD/],
    ["Sun OS", /SunOS/],
    ["Chrome OS", /CrOS/],
    ["Linux", /(Linux)|(X11)/],
    ["Mac OS", /(Mac_PowerPC)|(Macintosh)/],
    ["QNX", /QNX/],
    ["BeOS", /BeOS/],
    ["OS/2", /OS\/2/]
  ];
  function detect(userAgent) {
    if (!!userAgent) {
      return parseUserAgent(userAgent);
    }
    if (typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative") {
      return new ReactNativeInfo();
    }
    if (typeof navigator !== "undefined") {
      return parseUserAgent(navigator.userAgent);
    }
    return getNodeVersion();
  }
  function matchUserAgent(ua) {
    return ua !== "" && userAgentRules.reduce(function(matched, _a3) {
      var browser = _a3[0], regex = _a3[1];
      if (matched) {
        return matched;
      }
      var uaMatch = regex.exec(ua);
      return !!uaMatch && [browser, uaMatch];
    }, false);
  }
  function parseUserAgent(ua) {
    var matchedRule = matchUserAgent(ua);
    if (!matchedRule) {
      return null;
    }
    var name = matchedRule[0], match2 = matchedRule[1];
    if (name === "searchbot") {
      return new BotInfo();
    }
    var versionParts = match2[1] && match2[1].split(".").join("_").split("_").slice(0, 3);
    if (versionParts) {
      if (versionParts.length < REQUIRED_VERSION_PARTS) {
        versionParts = __spreadArray(__spreadArray([], versionParts, true), createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length), true);
      }
    } else {
      versionParts = [];
    }
    var version = versionParts.join(".");
    var os = detectOS(ua);
    var searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua);
    if (searchBotMatch && searchBotMatch[1]) {
      return new SearchBotDeviceInfo(name, version, os, searchBotMatch[1]);
    }
    return new BrowserInfo(name, version, os);
  }
  function detectOS(ua) {
    for (var ii = 0, count = operatingSystemRules.length; ii < count; ii++) {
      var _a3 = operatingSystemRules[ii], os = _a3[0], regex = _a3[1];
      var match2 = regex.exec(ua);
      if (match2) {
        return os;
      }
    }
    return null;
  }
  function getNodeVersion() {
    var isNode = typeof process !== "undefined" && process.version;
    return isNode ? new NodeInfo(process.version.slice(1)) : null;
  }
  function createVersionParts(count) {
    var output = [];
    for (var ii = 0; ii < count; ii++) {
      output.push("0");
    }
    return output;
  }
  const booleanValidator = (val) => typeof val === "boolean";
  const createNumberValidator = (start, end2) => (val) => typeof val === "number" && start <= val && val <= end2;
  const settingDefinitions = {
    threadNum: {
      key: "thread_num",
      default: 8,
      validator: createNumberValidator(1, 32),
      formatter: (val) => Math.floor(val)
    },
    openOnNewTab: {
      key: "open_on_new_tab",
      default: true,
      validator: booleanValidator
    },
    customDownloadUrl: {
      key: "custom_download_url",
      default: "",
      validator: (val) => typeof val === "string",
      formatter: (val) => val.trim()
    },
    compressionFileName: {
      key: "cf_name",
      default: "{{japanese}}.zip",
      validator: (val) => typeof val === "string",
      formatter: (val) => val.trim()
    },
    compressionLevel: {
      key: "c_lv",
      default: 0,
      validator: createNumberValidator(0, 9),
      formatter: (val) => Math.floor(val)
    },
    compressionStreamFiles: {
      key: "c_stream_files",
      default: false,
      validator: booleanValidator
    },
    streamDownload: {
      key: "stream_download",
      default: false,
      validator: booleanValidator
    },
    seriesMode: {
      key: "series_mode",
      default: false,
      validator: booleanValidator
    },
    filenameLength: {
      key: "filename_length",
      default: 0,
      validator: (val) => val === "auto" || typeof val === "number" && val >= 0,
      formatter: (val) => typeof val === "number" ? Math.floor(val) : val
    },
    autoCancelDownloadedManga: {
      key: "auto_cancel_downloaded_doujin",
      default: false,
      validator: booleanValidator
    },
    autoRetryWhenErrorOccurs: {
      key: "auto_retry_when_error_occurs",
      default: false,
      validator: booleanValidator
    },
    autoShowAll: {
      key: "auto_show_all",
      default: false,
      validator: booleanValidator
    },
    showIgnoreButton: {
      key: "show_ignore_button",
      default: false,
      validator: booleanValidator
    },
    preventConsoleClearing: {
      key: "prevent_console_clear",
      default: false,
      validator: booleanValidator
    }
  };
  const browserDetect = detect();
  const DISABLE_STREAM_DOWNLOAD = !!browserDetect && (browserDetect.name === "safari" || browserDetect.name === "firefox");
  const readSettings = () => lodash.exports.mapValues(
    settingDefinitions,
    ({ key, default: defaultVal }) => GM_getValue(key, defaultVal)
  );
  const writeableSettings = vue.reactive(readSettings());
  const settings = writeableSettings;
  if (DISABLE_STREAM_DOWNLOAD && settings.streamDownload)
    writeableSettings.streamDownload = false;
  const startWatchSettings = functionOnce(() => {
    const settingRefs = vue.toRefs(writeableSettings);
    lodash.exports.each(settingRefs, (ref, key) => {
      const cur = settingDefinitions[key];
      vue.watch(ref, (val) => {
        if (!cur.validator(val)) {
          ref.value = cur.default;
          return;
        }
        if (cur.formatter) {
          const formattedVal = cur.formatter(val);
          if (ref.value !== formattedVal) {
            ref.value = formattedVal;
            return;
          }
        }
        logger.log("update setting", cur.key, val);
        GM_setValue(cur.key, val);
      });
    });
  });
  const dlQueue = new AsyncQueue();
  const zipQueue = new AsyncQueue(WORKER_THREAD_NUM);
  dlQueue.canSingleStart = () => !(settings.seriesMode && zipQueue.length);
  zipQueue.emitter.on("finish", () => {
    if (settings.seriesMode)
      dlQueue.start().catch(logger.error);
  });
  const _withScopeId = (n) => (vue.pushScopeId("data-v-5e3261cd"), n = n(), vue.popScopeId(), n);
  const _hoisted_1$g = ["title"];
  const _hoisted_2$a = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("i", { class: "fa fa-times" }, null, -1));
  const _hoisted_3$4 = [
    _hoisted_2$a
  ];
  const _hoisted_4$2 = { class: "download-item__title" };
  const _hoisted_5$2 = { class: "download-item__progress-text" };
  const _sfc_main$u = /* @__PURE__ */ vue.defineComponent({
    __name: "DownloadItem",
    props: {
      item: null,
      index: null
    },
    setup(__props) {
      const props = __props;
      const title = vue.computed(() => props.item.gallery.title);
      const progressWidth = vue.computed(() => {
        const {
          gallery: { pages: pages2 },
          done,
          compressing,
          compressingPercent
        } = props.item;
        const page = pages2.length;
        return compressing ? compressingPercent : page && done ? (100 * done / page).toFixed(2) : 0;
      });
      const canCancel = vue.computed(() => !props.item.compressing);
      const cancel = () => {
        var _a3;
        const { info } = props.index === 0 ? dlQueue.queue[0] : removeAt(dlQueue.queue, props.index);
        (_a3 = info == null ? void 0 : info.cancel) == null ? void 0 : _a3.call(info);
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass(["download-item", {
            "download-item--error": __props.item.error,
            "download-item--compressing": __props.item.compressing && !__props.item.error,
            "download-item--can-cancel": vue.unref(canCancel)
          }]),
          title: vue.unref(title)
        }, [
          vue.unref(canCancel) ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            class: "download-item__cancel",
            onClick: cancel
          }, _hoisted_3$4)) : vue.createCommentVNode("", true),
          vue.createElementVNode("div", _hoisted_4$2, vue.toDisplayString(vue.unref(title)), 1),
          vue.createElementVNode("div", {
            class: "download-item__progress",
            style: vue.normalizeStyle({ width: `${vue.unref(progressWidth)}%` })
          }, [
            vue.createElementVNode("div", _hoisted_5$2, vue.toDisplayString(vue.unref(progressWidth)) + "%", 1)
          ], 4)
        ], 10, _hoisted_1$g);
      };
    }
  });
  const DownloadItem_vue_vue_type_style_index_0_scoped_5e3261cd_lang = "";
  const _export_sfc$1 = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const DownloadItem = /* @__PURE__ */ _export_sfc$1(_sfc_main$u, [["__scopeId", "data-v-5e3261cd"]]);
  const _hoisted_1$f = { id: "download-panel" };
  const _sfc_main$t = /* @__PURE__ */ vue.defineComponent({
    __name: "DownloadList",
    props: {
      zipList: null,
      dlList: null
    },
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$f, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.zipList, (item, index2) => {
            return vue.openBlock(), vue.createBlock(DownloadItem, {
              key: index2,
              item,
              index: index2
            }, null, 8, ["item", "index"]);
          }), 128)),
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.dlList, (item, index2) => {
            return vue.openBlock(), vue.createBlock(DownloadItem, {
              key: index2,
              item,
              index: index2
            }, null, 8, ["item", "index"]);
          }), 128))
        ]);
      };
    }
  });
  const DownloadList_vue_vue_type_style_index_0_scoped_658acab9_lang = "";
  const DownloadList = /* @__PURE__ */ _export_sfc$1(_sfc_main$t, [["__scopeId", "data-v-658acab9"]]);
  const _sfc_main$s = /* @__PURE__ */ vue.defineComponent({
    __name: "DownloadPanel",
    setup(__props) {
      const { title } = document;
      const zipList = vue.computed(() => zipQueue.queue.map(({ info }) => info));
      const dlList = vue.computed(() => dlQueue.queue.map(({ info }) => info));
      const infoList = vue.computed(() => [...zipList.value, ...dlList.value]);
      const error = vue.computed(() => {
        var _a3;
        return !!((_a3 = dlList.value[0]) == null ? void 0 : _a3.error);
      });
      const titleWithStatus = vue.computed(() => {
        if (error.value)
          return `[\xD7] ${title}`;
        const len = infoList.value.length;
        return `[${len || "\u2713"}] ${title}`;
      });
      vue.watch(infoList, (val) => {
        sessionStorage.setItem("downloadQueue", JSON.stringify(val.map(({ gallery: gallery2 }) => gallery2)));
      });
      vue.watch(titleWithStatus, (val) => {
        document.title = val;
      });
      return (_ctx, _cache) => {
        return vue.unref(infoList).length ? (vue.openBlock(), vue.createBlock(DownloadList, {
          key: 0,
          "zip-list": vue.unref(zipList),
          "dl-list": vue.unref(dlList)
        }, null, 8, ["zip-list", "dl-list"])) : vue.createCommentVNode("", true);
      };
    }
  });
  var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
  const freeGlobal$1 = freeGlobal;
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal$1 || freeSelf || Function("return this")();
  const root$1 = root;
  var Symbol$1 = root$1.Symbol;
  const Symbol$2 = Symbol$1;
  var objectProto$i = Object.prototype;
  var hasOwnProperty$f = objectProto$i.hasOwnProperty;
  var nativeObjectToString$2 = objectProto$i.toString;
  var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
  function getRawTag(value) {
    var isOwn = hasOwnProperty$f.call(value, symToStringTag$1), tag = value[symToStringTag$1];
    try {
      value[symToStringTag$1] = void 0;
      var unmasked = true;
    } catch (e) {
    }
    var result = nativeObjectToString$2.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag$1] = tag;
      } else {
        delete value[symToStringTag$1];
      }
    }
    return result;
  }
  var objectProto$h = Object.prototype;
  var nativeObjectToString$1 = objectProto$h.toString;
  function objectToString$1(value) {
    return nativeObjectToString$1.call(value);
  }
  var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
  var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
  function baseGetTag(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString$1(value);
  }
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  var symbolTag$3 = "[object Symbol]";
  function isSymbol(value) {
    return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag$3;
  }
  function arrayMap(array2, iteratee) {
    var index2 = -1, length = array2 == null ? 0 : array2.length, result = Array(length);
    while (++index2 < length) {
      result[index2] = iteratee(array2[index2], index2, array2);
    }
    return result;
  }
  var isArray$1 = Array.isArray;
  const isArray$2 = isArray$1;
  var INFINITY$1 = 1 / 0;
  var symbolProto$2 = Symbol$2 ? Symbol$2.prototype : void 0, symbolToString = symbolProto$2 ? symbolProto$2.toString : void 0;
  function baseToString(value) {
    if (typeof value == "string") {
      return value;
    }
    if (isArray$2(value)) {
      return arrayMap(value, baseToString) + "";
    }
    if (isSymbol(value)) {
      return symbolToString ? symbolToString.call(value) : "";
    }
    var result = value + "";
    return result == "0" && 1 / value == -INFINITY$1 ? "-0" : result;
  }
  var reWhitespace = /\s/;
  function trimmedEndIndex(string2) {
    var index2 = string2.length;
    while (index2-- && reWhitespace.test(string2.charAt(index2))) {
    }
    return index2;
  }
  var reTrimStart = /^\s+/;
  function baseTrim(string2) {
    return string2 ? string2.slice(0, trimmedEndIndex(string2) + 1).replace(reTrimStart, "") : string2;
  }
  function isObject$1(value) {
    var type2 = typeof value;
    return value != null && (type2 == "object" || type2 == "function");
  }
  var NAN = 0 / 0;
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
  var reIsBinary = /^0b[01]+$/i;
  var reIsOctal = /^0o[0-7]+$/i;
  var freeParseInt = parseInt;
  function toNumber(value) {
    if (typeof value == "number") {
      return value;
    }
    if (isSymbol(value)) {
      return NAN;
    }
    if (isObject$1(value)) {
      var other = typeof value.valueOf == "function" ? value.valueOf() : value;
      value = isObject$1(other) ? other + "" : other;
    }
    if (typeof value != "string") {
      return value === 0 ? value : +value;
    }
    value = baseTrim(value);
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
  }
  function identity(value) {
    return value;
  }
  var asyncTag = "[object AsyncFunction]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
  function isFunction$1(value) {
    if (!isObject$1(value)) {
      return false;
    }
    var tag = baseGetTag(value);
    return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
  }
  var coreJsData = root$1["__core-js_shared__"];
  const coreJsData$1 = coreJsData;
  var maskSrcKey = function() {
    var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  }();
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  var funcProto$2 = Function.prototype;
  var funcToString$2 = funcProto$2.toString;
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString$2.call(func);
      } catch (e) {
      }
      try {
        return func + "";
      } catch (e) {
      }
    }
    return "";
  }
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var funcProto$1 = Function.prototype, objectProto$g = Object.prototype;
  var funcToString$1 = funcProto$1.toString;
  var hasOwnProperty$e = objectProto$g.hasOwnProperty;
  var reIsNative = RegExp(
    "^" + funcToString$1.call(hasOwnProperty$e).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function baseIsNative(value) {
    if (!isObject$1(value) || isMasked(value)) {
      return false;
    }
    var pattern2 = isFunction$1(value) ? reIsNative : reIsHostCtor;
    return pattern2.test(toSource(value));
  }
  function getValue$1(object2, key) {
    return object2 == null ? void 0 : object2[key];
  }
  function getNative(object2, key) {
    var value = getValue$1(object2, key);
    return baseIsNative(value) ? value : void 0;
  }
  var WeakMap = getNative(root$1, "WeakMap");
  const WeakMap$1 = WeakMap;
  var objectCreate = Object.create;
  var baseCreate = function() {
    function object2() {
    }
    return function(proto) {
      if (!isObject$1(proto)) {
        return {};
      }
      if (objectCreate) {
        return objectCreate(proto);
      }
      object2.prototype = proto;
      var result = new object2();
      object2.prototype = void 0;
      return result;
    };
  }();
  const baseCreate$1 = baseCreate;
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0:
        return func.call(thisArg);
      case 1:
        return func.call(thisArg, args[0]);
      case 2:
        return func.call(thisArg, args[0], args[1]);
      case 3:
        return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }
  function copyArray(source, array2) {
    var index2 = -1, length = source.length;
    array2 || (array2 = Array(length));
    while (++index2 < length) {
      array2[index2] = source[index2];
    }
    return array2;
  }
  var HOT_COUNT = 800, HOT_SPAN = 16;
  var nativeNow = Date.now;
  function shortOut(func) {
    var count = 0, lastCalled = 0;
    return function() {
      var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
      lastCalled = stamp;
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0];
        }
      } else {
        count = 0;
      }
      return func.apply(void 0, arguments);
    };
  }
  function constant(value) {
    return function() {
      return value;
    };
  }
  var defineProperty = function() {
    try {
      var func = getNative(Object, "defineProperty");
      func({}, "", {});
      return func;
    } catch (e) {
    }
  }();
  const defineProperty$1 = defineProperty;
  var baseSetToString = !defineProperty$1 ? identity : function(func, string2) {
    return defineProperty$1(func, "toString", {
      "configurable": true,
      "enumerable": false,
      "value": constant(string2),
      "writable": true
    });
  };
  const baseSetToString$1 = baseSetToString;
  var setToString = shortOut(baseSetToString$1);
  const setToString$1 = setToString;
  function arrayEach(array2, iteratee) {
    var index2 = -1, length = array2 == null ? 0 : array2.length;
    while (++index2 < length) {
      if (iteratee(array2[index2], index2, array2) === false) {
        break;
      }
    }
    return array2;
  }
  var MAX_SAFE_INTEGER$1 = 9007199254740991;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  function isIndex(value, length) {
    var type2 = typeof value;
    length = length == null ? MAX_SAFE_INTEGER$1 : length;
    return !!length && (type2 == "number" || type2 != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  function baseAssignValue(object2, key, value) {
    if (key == "__proto__" && defineProperty$1) {
      defineProperty$1(object2, key, {
        "configurable": true,
        "enumerable": true,
        "value": value,
        "writable": true
      });
    } else {
      object2[key] = value;
    }
  }
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }
  var objectProto$f = Object.prototype;
  var hasOwnProperty$d = objectProto$f.hasOwnProperty;
  function assignValue(object2, key, value) {
    var objValue = object2[key];
    if (!(hasOwnProperty$d.call(object2, key) && eq(objValue, value)) || value === void 0 && !(key in object2)) {
      baseAssignValue(object2, key, value);
    }
  }
  function copyObject(source, props, object2, customizer) {
    var isNew = !object2;
    object2 || (object2 = {});
    var index2 = -1, length = props.length;
    while (++index2 < length) {
      var key = props[index2];
      var newValue = customizer ? customizer(object2[key], source[key], key, object2, source) : void 0;
      if (newValue === void 0) {
        newValue = source[key];
      }
      if (isNew) {
        baseAssignValue(object2, key, newValue);
      } else {
        assignValue(object2, key, newValue);
      }
    }
    return object2;
  }
  var nativeMax$1 = Math.max;
  function overRest(func, start, transform) {
    start = nativeMax$1(start === void 0 ? func.length - 1 : start, 0);
    return function() {
      var args = arguments, index2 = -1, length = nativeMax$1(args.length - start, 0), array2 = Array(length);
      while (++index2 < length) {
        array2[index2] = args[start + index2];
      }
      index2 = -1;
      var otherArgs = Array(start + 1);
      while (++index2 < start) {
        otherArgs[index2] = args[index2];
      }
      otherArgs[start] = transform(array2);
      return apply(func, this, otherArgs);
    };
  }
  function baseRest(func, start) {
    return setToString$1(overRest(func, start, identity), func + "");
  }
  var MAX_SAFE_INTEGER = 9007199254740991;
  function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction$1(value);
  }
  function isIterateeCall(value, index2, object2) {
    if (!isObject$1(object2)) {
      return false;
    }
    var type2 = typeof index2;
    if (type2 == "number" ? isArrayLike(object2) && isIndex(index2, object2.length) : type2 == "string" && index2 in object2) {
      return eq(object2[index2], value);
    }
    return false;
  }
  function createAssigner(assigner) {
    return baseRest(function(object2, sources) {
      var index2 = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
      customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        customizer = length < 3 ? void 0 : customizer;
        length = 1;
      }
      object2 = Object(object2);
      while (++index2 < length) {
        var source = sources[index2];
        if (source) {
          assigner(object2, source, index2, customizer);
        }
      }
      return object2;
    });
  }
  var objectProto$e = Object.prototype;
  function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$e;
    return value === proto;
  }
  function baseTimes(n, iteratee) {
    var index2 = -1, result = Array(n);
    while (++index2 < n) {
      result[index2] = iteratee(index2);
    }
    return result;
  }
  var argsTag$3 = "[object Arguments]";
  function baseIsArguments(value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag$3;
  }
  var objectProto$d = Object.prototype;
  var hasOwnProperty$c = objectProto$d.hasOwnProperty;
  var propertyIsEnumerable$1 = objectProto$d.propertyIsEnumerable;
  var isArguments = baseIsArguments(function() {
    return arguments;
  }()) ? baseIsArguments : function(value) {
    return isObjectLike(value) && hasOwnProperty$c.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
  };
  const isArguments$1 = isArguments;
  function stubFalse() {
    return false;
  }
  var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;
  var Buffer$1 = moduleExports$2 ? root$1.Buffer : void 0;
  var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : void 0;
  var isBuffer = nativeIsBuffer || stubFalse;
  const isBuffer$1 = isBuffer;
  var argsTag$2 = "[object Arguments]", arrayTag$2 = "[object Array]", boolTag$3 = "[object Boolean]", dateTag$3 = "[object Date]", errorTag$3 = "[object Error]", funcTag$1 = "[object Function]", mapTag$5 = "[object Map]", numberTag$3 = "[object Number]", objectTag$4 = "[object Object]", regexpTag$3 = "[object RegExp]", setTag$5 = "[object Set]", stringTag$3 = "[object String]", weakMapTag$2 = "[object WeakMap]";
  var arrayBufferTag$3 = "[object ArrayBuffer]", dataViewTag$4 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]";
  var typedArrayTags = {};
  typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
  typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$2] = typedArrayTags[arrayBufferTag$3] = typedArrayTags[boolTag$3] = typedArrayTags[dataViewTag$4] = typedArrayTags[dateTag$3] = typedArrayTags[errorTag$3] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$5] = typedArrayTags[numberTag$3] = typedArrayTags[objectTag$4] = typedArrayTags[regexpTag$3] = typedArrayTags[setTag$5] = typedArrayTags[stringTag$3] = typedArrayTags[weakMapTag$2] = false;
  function baseIsTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
  }
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }
  var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
  var freeProcess = moduleExports$1 && freeGlobal$1.process;
  var nodeUtil = function() {
    try {
      var types2 = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
      if (types2) {
        return types2;
      }
      return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e) {
    }
  }();
  const nodeUtil$1 = nodeUtil;
  var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;
  var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
  const isTypedArray$1 = isTypedArray;
  var objectProto$c = Object.prototype;
  var hasOwnProperty$b = objectProto$c.hasOwnProperty;
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray$2(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$1(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
    for (var key in value) {
      if ((inherited || hasOwnProperty$b.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  var nativeKeys = overArg(Object.keys, Object);
  const nativeKeys$1 = nativeKeys;
  var objectProto$b = Object.prototype;
  var hasOwnProperty$a = objectProto$b.hasOwnProperty;
  function baseKeys(object2) {
    if (!isPrototype(object2)) {
      return nativeKeys$1(object2);
    }
    var result = [];
    for (var key in Object(object2)) {
      if (hasOwnProperty$a.call(object2, key) && key != "constructor") {
        result.push(key);
      }
    }
    return result;
  }
  function keys(object2) {
    return isArrayLike(object2) ? arrayLikeKeys(object2) : baseKeys(object2);
  }
  function nativeKeysIn(object2) {
    var result = [];
    if (object2 != null) {
      for (var key in Object(object2)) {
        result.push(key);
      }
    }
    return result;
  }
  var objectProto$a = Object.prototype;
  var hasOwnProperty$9 = objectProto$a.hasOwnProperty;
  function baseKeysIn(object2) {
    if (!isObject$1(object2)) {
      return nativeKeysIn(object2);
    }
    var isProto = isPrototype(object2), result = [];
    for (var key in object2) {
      if (!(key == "constructor" && (isProto || !hasOwnProperty$9.call(object2, key)))) {
        result.push(key);
      }
    }
    return result;
  }
  function keysIn(object2) {
    return isArrayLike(object2) ? arrayLikeKeys(object2, true) : baseKeysIn(object2);
  }
  var assignInWith = createAssigner(function(object2, source, srcIndex, customizer) {
    copyObject(source, keysIn(source), object2, customizer);
  });
  const extendWith = assignInWith;
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
  function isKey(value, object2) {
    if (isArray$2(value)) {
      return false;
    }
    var type2 = typeof value;
    if (type2 == "number" || type2 == "symbol" || type2 == "boolean" || value == null || isSymbol(value)) {
      return true;
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object2 != null && value in Object(object2);
  }
  var nativeCreate = getNative(Object, "create");
  const nativeCreate$1 = nativeCreate;
  function hashClear() {
    this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
    this.size = 0;
  }
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }
  var HASH_UNDEFINED$2 = "__lodash_hash_undefined__";
  var objectProto$9 = Object.prototype;
  var hasOwnProperty$8 = objectProto$9.hasOwnProperty;
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate$1) {
      var result = data[key];
      return result === HASH_UNDEFINED$2 ? void 0 : result;
    }
    return hasOwnProperty$8.call(data, key) ? data[key] : void 0;
  }
  var objectProto$8 = Object.prototype;
  var hasOwnProperty$7 = objectProto$8.hasOwnProperty;
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty$7.call(data, key);
  }
  var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate$1 && value === void 0 ? HASH_UNDEFINED$1 : value;
    return this;
  }
  function Hash(entries) {
    var index2 = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index2 < length) {
      var entry = entries[index2];
      this.set(entry[0], entry[1]);
    }
  }
  Hash.prototype.clear = hashClear;
  Hash.prototype["delete"] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }
  function assocIndexOf(array2, key) {
    var length = array2.length;
    while (length--) {
      if (eq(array2[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  var arrayProto = Array.prototype;
  var splice = arrayProto.splice;
  function listCacheDelete(key) {
    var data = this.__data__, index2 = assocIndexOf(data, key);
    if (index2 < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index2 == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index2, 1);
    }
    --this.size;
    return true;
  }
  function listCacheGet(key) {
    var data = this.__data__, index2 = assocIndexOf(data, key);
    return index2 < 0 ? void 0 : data[index2][1];
  }
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }
  function listCacheSet(key, value) {
    var data = this.__data__, index2 = assocIndexOf(data, key);
    if (index2 < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index2][1] = value;
    }
    return this;
  }
  function ListCache(entries) {
    var index2 = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index2 < length) {
      var entry = entries[index2];
      this.set(entry[0], entry[1]);
    }
  }
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype["delete"] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;
  var Map$1 = getNative(root$1, "Map");
  const Map$2 = Map$1;
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      "hash": new Hash(),
      "map": new (Map$2 || ListCache)(),
      "string": new Hash()
    };
  }
  function isKeyable(value) {
    var type2 = typeof value;
    return type2 == "string" || type2 == "number" || type2 == "symbol" || type2 == "boolean" ? value !== "__proto__" : value === null;
  }
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  function mapCacheDelete(key) {
    var result = getMapData(this, key)["delete"](key);
    this.size -= result ? 1 : 0;
    return result;
  }
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }
  function mapCacheSet(key, value) {
    var data = getMapData(this, key), size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }
  function MapCache(entries) {
    var index2 = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index2 < length) {
      var entry = entries[index2];
      this.set(entry[0], entry[1]);
    }
  }
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype["delete"] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;
  var FUNC_ERROR_TEXT$1 = "Expected a function";
  function memoize(func, resolver) {
    if (typeof func != "function" || resolver != null && typeof resolver != "function") {
      throw new TypeError(FUNC_ERROR_TEXT$1);
    }
    var memoized = function() {
      var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
      if (cache.has(key)) {
        return cache.get(key);
      }
      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };
    memoized.cache = new (memoize.Cache || MapCache)();
    return memoized;
  }
  memoize.Cache = MapCache;
  var MAX_MEMOIZE_SIZE = 500;
  function memoizeCapped(func) {
    var result = memoize(func, function(key) {
      if (cache.size === MAX_MEMOIZE_SIZE) {
        cache.clear();
      }
      return key;
    });
    var cache = result.cache;
    return result;
  }
  var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
  var reEscapeChar = /\\(\\)?/g;
  var stringToPath = memoizeCapped(function(string2) {
    var result = [];
    if (string2.charCodeAt(0) === 46) {
      result.push("");
    }
    string2.replace(rePropName, function(match2, number2, quote, subString) {
      result.push(quote ? subString.replace(reEscapeChar, "$1") : number2 || match2);
    });
    return result;
  });
  const stringToPath$1 = stringToPath;
  function toString(value) {
    return value == null ? "" : baseToString(value);
  }
  function castPath(value, object2) {
    if (isArray$2(value)) {
      return value;
    }
    return isKey(value, object2) ? [value] : stringToPath$1(toString(value));
  }
  var INFINITY = 1 / 0;
  function toKey(value) {
    if (typeof value == "string" || isSymbol(value)) {
      return value;
    }
    var result = value + "";
    return result == "0" && 1 / value == -INFINITY ? "-0" : result;
  }
  function baseGet(object2, path) {
    path = castPath(path, object2);
    var index2 = 0, length = path.length;
    while (object2 != null && index2 < length) {
      object2 = object2[toKey(path[index2++])];
    }
    return index2 && index2 == length ? object2 : void 0;
  }
  function get(object2, path, defaultValue) {
    var result = object2 == null ? void 0 : baseGet(object2, path);
    return result === void 0 ? defaultValue : result;
  }
  function arrayPush(array2, values) {
    var index2 = -1, length = values.length, offset = array2.length;
    while (++index2 < length) {
      array2[offset + index2] = values[index2];
    }
    return array2;
  }
  var getPrototype = overArg(Object.getPrototypeOf, Object);
  const getPrototype$1 = getPrototype;
  var objectTag$3 = "[object Object]";
  var funcProto = Function.prototype, objectProto$7 = Object.prototype;
  var funcToString = funcProto.toString;
  var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
  var objectCtorString = funcToString.call(Object);
  function isPlainObject(value) {
    if (!isObjectLike(value) || baseGetTag(value) != objectTag$3) {
      return false;
    }
    var proto = getPrototype$1(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty$6.call(proto, "constructor") && proto.constructor;
    return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
  }
  var domExcTag = "[object DOMException]", errorTag$2 = "[object Error]";
  function isError(value) {
    if (!isObjectLike(value)) {
      return false;
    }
    var tag = baseGetTag(value);
    return tag == errorTag$2 || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject(value);
  }
  var attempt = baseRest(function(func, args) {
    try {
      return apply(func, void 0, args);
    } catch (e) {
      return isError(e) ? e : new Error(e);
    }
  });
  const attempt$1 = attempt;
  function baseSlice(array2, start, end2) {
    var index2 = -1, length = array2.length;
    if (start < 0) {
      start = -start > length ? 0 : length + start;
    }
    end2 = end2 > length ? length : end2;
    if (end2 < 0) {
      end2 += length;
    }
    length = start > end2 ? 0 : end2 - start >>> 0;
    start >>>= 0;
    var result = Array(length);
    while (++index2 < length) {
      result[index2] = array2[index2 + start];
    }
    return result;
  }
  function castSlice(array2, start, end2) {
    var length = array2.length;
    end2 = end2 === void 0 ? length : end2;
    return !start && end2 >= length ? array2 : baseSlice(array2, start, end2);
  }
  var rsAstralRange$2 = "\\ud800-\\udfff", rsComboMarksRange$3 = "\\u0300-\\u036f", reComboHalfMarksRange$3 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$3 = "\\u20d0-\\u20ff", rsComboRange$3 = rsComboMarksRange$3 + reComboHalfMarksRange$3 + rsComboSymbolsRange$3, rsVarRange$2 = "\\ufe0e\\ufe0f";
  var rsZWJ$2 = "\\u200d";
  var reHasUnicode = RegExp("[" + rsZWJ$2 + rsAstralRange$2 + rsComboRange$3 + rsVarRange$2 + "]");
  function hasUnicode(string2) {
    return reHasUnicode.test(string2);
  }
  function asciiToArray(string2) {
    return string2.split("");
  }
  var rsAstralRange$1 = "\\ud800-\\udfff", rsComboMarksRange$2 = "\\u0300-\\u036f", reComboHalfMarksRange$2 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$2 = "\\u20d0-\\u20ff", rsComboRange$2 = rsComboMarksRange$2 + reComboHalfMarksRange$2 + rsComboSymbolsRange$2, rsVarRange$1 = "\\ufe0e\\ufe0f";
  var rsAstral = "[" + rsAstralRange$1 + "]", rsCombo$2 = "[" + rsComboRange$2 + "]", rsFitz$1 = "\\ud83c[\\udffb-\\udfff]", rsModifier$1 = "(?:" + rsCombo$2 + "|" + rsFitz$1 + ")", rsNonAstral$1 = "[^" + rsAstralRange$1 + "]", rsRegional$1 = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair$1 = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsZWJ$1 = "\\u200d";
  var reOptMod$1 = rsModifier$1 + "?", rsOptVar$1 = "[" + rsVarRange$1 + "]?", rsOptJoin$1 = "(?:" + rsZWJ$1 + "(?:" + [rsNonAstral$1, rsRegional$1, rsSurrPair$1].join("|") + ")" + rsOptVar$1 + reOptMod$1 + ")*", rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1, rsSymbol = "(?:" + [rsNonAstral$1 + rsCombo$2 + "?", rsCombo$2, rsRegional$1, rsSurrPair$1, rsAstral].join("|") + ")";
  var reUnicode = RegExp(rsFitz$1 + "(?=" + rsFitz$1 + ")|" + rsSymbol + rsSeq$1, "g");
  function unicodeToArray(string2) {
    return string2.match(reUnicode) || [];
  }
  function stringToArray(string2) {
    return hasUnicode(string2) ? unicodeToArray(string2) : asciiToArray(string2);
  }
  function createCaseFirst(methodName) {
    return function(string2) {
      string2 = toString(string2);
      var strSymbols = hasUnicode(string2) ? stringToArray(string2) : void 0;
      var chr = strSymbols ? strSymbols[0] : string2.charAt(0);
      var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string2.slice(1);
      return chr[methodName]() + trailing;
    };
  }
  var upperFirst = createCaseFirst("toUpperCase");
  const upperFirst$1 = upperFirst;
  function capitalize(string2) {
    return upperFirst$1(toString(string2).toLowerCase());
  }
  function arrayReduce(array2, iteratee, accumulator, initAccum) {
    var index2 = -1, length = array2 == null ? 0 : array2.length;
    if (initAccum && length) {
      accumulator = array2[++index2];
    }
    while (++index2 < length) {
      accumulator = iteratee(accumulator, array2[index2], index2, array2);
    }
    return accumulator;
  }
  function basePropertyOf(object2) {
    return function(key) {
      return object2 == null ? void 0 : object2[key];
    };
  }
  var deburredLetters = {
    "\xC0": "A",
    "\xC1": "A",
    "\xC2": "A",
    "\xC3": "A",
    "\xC4": "A",
    "\xC5": "A",
    "\xE0": "a",
    "\xE1": "a",
    "\xE2": "a",
    "\xE3": "a",
    "\xE4": "a",
    "\xE5": "a",
    "\xC7": "C",
    "\xE7": "c",
    "\xD0": "D",
    "\xF0": "d",
    "\xC8": "E",
    "\xC9": "E",
    "\xCA": "E",
    "\xCB": "E",
    "\xE8": "e",
    "\xE9": "e",
    "\xEA": "e",
    "\xEB": "e",
    "\xCC": "I",
    "\xCD": "I",
    "\xCE": "I",
    "\xCF": "I",
    "\xEC": "i",
    "\xED": "i",
    "\xEE": "i",
    "\xEF": "i",
    "\xD1": "N",
    "\xF1": "n",
    "\xD2": "O",
    "\xD3": "O",
    "\xD4": "O",
    "\xD5": "O",
    "\xD6": "O",
    "\xD8": "O",
    "\xF2": "o",
    "\xF3": "o",
    "\xF4": "o",
    "\xF5": "o",
    "\xF6": "o",
    "\xF8": "o",
    "\xD9": "U",
    "\xDA": "U",
    "\xDB": "U",
    "\xDC": "U",
    "\xF9": "u",
    "\xFA": "u",
    "\xFB": "u",
    "\xFC": "u",
    "\xDD": "Y",
    "\xFD": "y",
    "\xFF": "y",
    "\xC6": "Ae",
    "\xE6": "ae",
    "\xDE": "Th",
    "\xFE": "th",
    "\xDF": "ss",
    "\u0100": "A",
    "\u0102": "A",
    "\u0104": "A",
    "\u0101": "a",
    "\u0103": "a",
    "\u0105": "a",
    "\u0106": "C",
    "\u0108": "C",
    "\u010A": "C",
    "\u010C": "C",
    "\u0107": "c",
    "\u0109": "c",
    "\u010B": "c",
    "\u010D": "c",
    "\u010E": "D",
    "\u0110": "D",
    "\u010F": "d",
    "\u0111": "d",
    "\u0112": "E",
    "\u0114": "E",
    "\u0116": "E",
    "\u0118": "E",
    "\u011A": "E",
    "\u0113": "e",
    "\u0115": "e",
    "\u0117": "e",
    "\u0119": "e",
    "\u011B": "e",
    "\u011C": "G",
    "\u011E": "G",
    "\u0120": "G",
    "\u0122": "G",
    "\u011D": "g",
    "\u011F": "g",
    "\u0121": "g",
    "\u0123": "g",
    "\u0124": "H",
    "\u0126": "H",
    "\u0125": "h",
    "\u0127": "h",
    "\u0128": "I",
    "\u012A": "I",
    "\u012C": "I",
    "\u012E": "I",
    "\u0130": "I",
    "\u0129": "i",
    "\u012B": "i",
    "\u012D": "i",
    "\u012F": "i",
    "\u0131": "i",
    "\u0134": "J",
    "\u0135": "j",
    "\u0136": "K",
    "\u0137": "k",
    "\u0138": "k",
    "\u0139": "L",
    "\u013B": "L",
    "\u013D": "L",
    "\u013F": "L",
    "\u0141": "L",
    "\u013A": "l",
    "\u013C": "l",
    "\u013E": "l",
    "\u0140": "l",
    "\u0142": "l",
    "\u0143": "N",
    "\u0145": "N",
    "\u0147": "N",
    "\u014A": "N",
    "\u0144": "n",
    "\u0146": "n",
    "\u0148": "n",
    "\u014B": "n",
    "\u014C": "O",
    "\u014E": "O",
    "\u0150": "O",
    "\u014D": "o",
    "\u014F": "o",
    "\u0151": "o",
    "\u0154": "R",
    "\u0156": "R",
    "\u0158": "R",
    "\u0155": "r",
    "\u0157": "r",
    "\u0159": "r",
    "\u015A": "S",
    "\u015C": "S",
    "\u015E": "S",
    "\u0160": "S",
    "\u015B": "s",
    "\u015D": "s",
    "\u015F": "s",
    "\u0161": "s",
    "\u0162": "T",
    "\u0164": "T",
    "\u0166": "T",
    "\u0163": "t",
    "\u0165": "t",
    "\u0167": "t",
    "\u0168": "U",
    "\u016A": "U",
    "\u016C": "U",
    "\u016E": "U",
    "\u0170": "U",
    "\u0172": "U",
    "\u0169": "u",
    "\u016B": "u",
    "\u016D": "u",
    "\u016F": "u",
    "\u0171": "u",
    "\u0173": "u",
    "\u0174": "W",
    "\u0175": "w",
    "\u0176": "Y",
    "\u0177": "y",
    "\u0178": "Y",
    "\u0179": "Z",
    "\u017B": "Z",
    "\u017D": "Z",
    "\u017A": "z",
    "\u017C": "z",
    "\u017E": "z",
    "\u0132": "IJ",
    "\u0133": "ij",
    "\u0152": "Oe",
    "\u0153": "oe",
    "\u0149": "'n",
    "\u017F": "s"
  };
  var deburrLetter = basePropertyOf(deburredLetters);
  const deburrLetter$1 = deburrLetter;
  var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
  var rsComboMarksRange$1 = "\\u0300-\\u036f", reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$1 = "\\u20d0-\\u20ff", rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1;
  var rsCombo$1 = "[" + rsComboRange$1 + "]";
  var reComboMark = RegExp(rsCombo$1, "g");
  function deburr(string2) {
    string2 = toString(string2);
    return string2 && string2.replace(reLatin, deburrLetter$1).replace(reComboMark, "");
  }
  var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
  function asciiWords(string2) {
    return string2.match(reAsciiWord) || [];
  }
  var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
  function hasUnicodeWord(string2) {
    return reHasUnicodeWord.test(string2);
  }
  var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
  var rsApos$1 = "['\u2019]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
  var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos$1 + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos$1 + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq;
  var reUnicodeWord = RegExp([
    rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
    rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
    rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
    rsUpper + "+" + rsOptContrUpper,
    rsOrdUpper,
    rsOrdLower,
    rsDigits,
    rsEmoji
  ].join("|"), "g");
  function unicodeWords(string2) {
    return string2.match(reUnicodeWord) || [];
  }
  function words(string2, pattern2, guard) {
    string2 = toString(string2);
    pattern2 = guard ? void 0 : pattern2;
    if (pattern2 === void 0) {
      return hasUnicodeWord(string2) ? unicodeWords(string2) : asciiWords(string2);
    }
    return string2.match(pattern2) || [];
  }
  var rsApos = "['\u2019]";
  var reApos = RegExp(rsApos, "g");
  function createCompounder(callback) {
    return function(string2) {
      return arrayReduce(words(deburr(string2).replace(reApos, "")), callback, "");
    };
  }
  var camelCase = createCompounder(function(result, word, index2) {
    word = word.toLowerCase();
    return result + (index2 ? capitalize(word) : word);
  });
  const camelCase$1 = camelCase;
  function castArray() {
    if (!arguments.length) {
      return [];
    }
    var value = arguments[0];
    return isArray$2(value) ? value : [value];
  }
  function stackClear() {
    this.__data__ = new ListCache();
    this.size = 0;
  }
  function stackDelete(key) {
    var data = this.__data__, result = data["delete"](key);
    this.size = data.size;
    return result;
  }
  function stackGet(key) {
    return this.__data__.get(key);
  }
  function stackHas(key) {
    return this.__data__.has(key);
  }
  var LARGE_ARRAY_SIZE = 200;
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache) {
      var pairs = data.__data__;
      if (!Map$2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }
  function Stack(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
  }
  Stack.prototype.clear = stackClear;
  Stack.prototype["delete"] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;
  function baseAssign(object2, source) {
    return object2 && copyObject(source, keys(source), object2);
  }
  function baseAssignIn(object2, source) {
    return object2 && copyObject(source, keysIn(source), object2);
  }
  var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer = moduleExports ? root$1.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
    buffer.copy(result);
    return result;
  }
  function arrayFilter(array2, predicate) {
    var index2 = -1, length = array2 == null ? 0 : array2.length, resIndex = 0, result = [];
    while (++index2 < length) {
      var value = array2[index2];
      if (predicate(value, index2, array2)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }
  function stubArray() {
    return [];
  }
  var objectProto$6 = Object.prototype;
  var propertyIsEnumerable = objectProto$6.propertyIsEnumerable;
  var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
  var getSymbols = !nativeGetSymbols$1 ? stubArray : function(object2) {
    if (object2 == null) {
      return [];
    }
    object2 = Object(object2);
    return arrayFilter(nativeGetSymbols$1(object2), function(symbol) {
      return propertyIsEnumerable.call(object2, symbol);
    });
  };
  const getSymbols$1 = getSymbols;
  function copySymbols(source, object2) {
    return copyObject(source, getSymbols$1(source), object2);
  }
  var nativeGetSymbols = Object.getOwnPropertySymbols;
  var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object2) {
    var result = [];
    while (object2) {
      arrayPush(result, getSymbols$1(object2));
      object2 = getPrototype$1(object2);
    }
    return result;
  };
  const getSymbolsIn$1 = getSymbolsIn;
  function copySymbolsIn(source, object2) {
    return copyObject(source, getSymbolsIn$1(source), object2);
  }
  function baseGetAllKeys(object2, keysFunc, symbolsFunc) {
    var result = keysFunc(object2);
    return isArray$2(object2) ? result : arrayPush(result, symbolsFunc(object2));
  }
  function getAllKeys(object2) {
    return baseGetAllKeys(object2, keys, getSymbols$1);
  }
  function getAllKeysIn(object2) {
    return baseGetAllKeys(object2, keysIn, getSymbolsIn$1);
  }
  var DataView = getNative(root$1, "DataView");
  const DataView$1 = DataView;
  var Promise$1 = getNative(root$1, "Promise");
  const Promise$2 = Promise$1;
  var Set$1 = getNative(root$1, "Set");
  const Set$2 = Set$1;
  var mapTag$4 = "[object Map]", objectTag$2 = "[object Object]", promiseTag = "[object Promise]", setTag$4 = "[object Set]", weakMapTag$1 = "[object WeakMap]";
  var dataViewTag$3 = "[object DataView]";
  var dataViewCtorString = toSource(DataView$1), mapCtorString = toSource(Map$2), promiseCtorString = toSource(Promise$2), setCtorString = toSource(Set$2), weakMapCtorString = toSource(WeakMap$1);
  var getTag = baseGetTag;
  if (DataView$1 && getTag(new DataView$1(new ArrayBuffer(1))) != dataViewTag$3 || Map$2 && getTag(new Map$2()) != mapTag$4 || Promise$2 && getTag(Promise$2.resolve()) != promiseTag || Set$2 && getTag(new Set$2()) != setTag$4 || WeakMap$1 && getTag(new WeakMap$1()) != weakMapTag$1) {
    getTag = function(value) {
      var result = baseGetTag(value), Ctor = result == objectTag$2 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag$3;
          case mapCtorString:
            return mapTag$4;
          case promiseCtorString:
            return promiseTag;
          case setCtorString:
            return setTag$4;
          case weakMapCtorString:
            return weakMapTag$1;
        }
      }
      return result;
    };
  }
  const getTag$1 = getTag;
  var objectProto$5 = Object.prototype;
  var hasOwnProperty$5 = objectProto$5.hasOwnProperty;
  function initCloneArray(array2) {
    var length = array2.length, result = new array2.constructor(length);
    if (length && typeof array2[0] == "string" && hasOwnProperty$5.call(array2, "index")) {
      result.index = array2.index;
      result.input = array2.input;
    }
    return result;
  }
  var Uint8Array$1 = root$1.Uint8Array;
  const Uint8Array$2 = Uint8Array$1;
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array$2(result).set(new Uint8Array$2(arrayBuffer));
    return result;
  }
  function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  }
  var reFlags = /\w*$/;
  function cloneRegExp(regexp2) {
    var result = new regexp2.constructor(regexp2.source, reFlags.exec(regexp2));
    result.lastIndex = regexp2.lastIndex;
    return result;
  }
  var symbolProto$1 = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf$1 = symbolProto$1 ? symbolProto$1.valueOf : void 0;
  function cloneSymbol(symbol) {
    return symbolValueOf$1 ? Object(symbolValueOf$1.call(symbol)) : {};
  }
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }
  var boolTag$2 = "[object Boolean]", dateTag$2 = "[object Date]", mapTag$3 = "[object Map]", numberTag$2 = "[object Number]", regexpTag$2 = "[object RegExp]", setTag$3 = "[object Set]", stringTag$2 = "[object String]", symbolTag$2 = "[object Symbol]";
  var arrayBufferTag$2 = "[object ArrayBuffer]", dataViewTag$2 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
  function initCloneByTag(object2, tag, isDeep) {
    var Ctor = object2.constructor;
    switch (tag) {
      case arrayBufferTag$2:
        return cloneArrayBuffer(object2);
      case boolTag$2:
      case dateTag$2:
        return new Ctor(+object2);
      case dataViewTag$2:
        return cloneDataView(object2, isDeep);
      case float32Tag$1:
      case float64Tag$1:
      case int8Tag$1:
      case int16Tag$1:
      case int32Tag$1:
      case uint8Tag$1:
      case uint8ClampedTag$1:
      case uint16Tag$1:
      case uint32Tag$1:
        return cloneTypedArray(object2, isDeep);
      case mapTag$3:
        return new Ctor();
      case numberTag$2:
      case stringTag$2:
        return new Ctor(object2);
      case regexpTag$2:
        return cloneRegExp(object2);
      case setTag$3:
        return new Ctor();
      case symbolTag$2:
        return cloneSymbol(object2);
    }
  }
  function initCloneObject(object2) {
    return typeof object2.constructor == "function" && !isPrototype(object2) ? baseCreate$1(getPrototype$1(object2)) : {};
  }
  var mapTag$2 = "[object Map]";
  function baseIsMap(value) {
    return isObjectLike(value) && getTag$1(value) == mapTag$2;
  }
  var nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap;
  var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
  const isMap$1 = isMap;
  var setTag$2 = "[object Set]";
  function baseIsSet(value) {
    return isObjectLike(value) && getTag$1(value) == setTag$2;
  }
  var nodeIsSet = nodeUtil$1 && nodeUtil$1.isSet;
  var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
  const isSet$1 = isSet;
  var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG$1 = 4;
  var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", errorTag$1 = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag$1 = "[object Map]", numberTag$1 = "[object Number]", objectTag$1 = "[object Object]", regexpTag$1 = "[object RegExp]", setTag$1 = "[object Set]", stringTag$1 = "[object String]", symbolTag$1 = "[object Symbol]", weakMapTag = "[object WeakMap]";
  var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
  var cloneableTags = {};
  cloneableTags[argsTag$1] = cloneableTags[arrayTag$1] = cloneableTags[arrayBufferTag$1] = cloneableTags[dataViewTag$1] = cloneableTags[boolTag$1] = cloneableTags[dateTag$1] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag$1] = cloneableTags[numberTag$1] = cloneableTags[objectTag$1] = cloneableTags[regexpTag$1] = cloneableTags[setTag$1] = cloneableTags[stringTag$1] = cloneableTags[symbolTag$1] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag$1] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
  function baseClone(value, bitmask, customizer, key, object2, stack) {
    var result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG$1;
    if (customizer) {
      result = object2 ? customizer(value, key, object2, stack) : customizer(value);
    }
    if (result !== void 0) {
      return result;
    }
    if (!isObject$1(value)) {
      return value;
    }
    var isArr = isArray$2(value);
    if (isArr) {
      result = initCloneArray(value);
      if (!isDeep) {
        return copyArray(value, result);
      }
    } else {
      var tag = getTag$1(value), isFunc = tag == funcTag || tag == genTag;
      if (isBuffer$1(value)) {
        return cloneBuffer(value, isDeep);
      }
      if (tag == objectTag$1 || tag == argsTag$1 || isFunc && !object2) {
        result = isFlat || isFunc ? {} : initCloneObject(value);
        if (!isDeep) {
          return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
        }
      } else {
        if (!cloneableTags[tag]) {
          return object2 ? value : {};
        }
        result = initCloneByTag(value, tag, isDeep);
      }
    }
    stack || (stack = new Stack());
    var stacked = stack.get(value);
    if (stacked) {
      return stacked;
    }
    stack.set(value, result);
    if (isSet$1(value)) {
      value.forEach(function(subValue) {
        result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
      });
    } else if (isMap$1(value)) {
      value.forEach(function(subValue, key2) {
        result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
      });
    }
    var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
    var props = isArr ? void 0 : keysFunc(value);
    arrayEach(props || value, function(subValue, key2) {
      if (props) {
        key2 = subValue;
        subValue = value[key2];
      }
      assignValue(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
    });
    return result;
  }
  var CLONE_SYMBOLS_FLAG = 4;
  function clone(value) {
    return baseClone(value, CLONE_SYMBOLS_FLAG);
  }
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED);
    return this;
  }
  function setCacheHas(value) {
    return this.__data__.has(value);
  }
  function SetCache(values) {
    var index2 = -1, length = values == null ? 0 : values.length;
    this.__data__ = new MapCache();
    while (++index2 < length) {
      this.add(values[index2]);
    }
  }
  SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
  SetCache.prototype.has = setCacheHas;
  function arraySome(array2, predicate) {
    var index2 = -1, length = array2 == null ? 0 : array2.length;
    while (++index2 < length) {
      if (predicate(array2[index2], index2, array2)) {
        return true;
      }
    }
    return false;
  }
  function cacheHas(cache, key) {
    return cache.has(key);
  }
  var COMPARE_PARTIAL_FLAG$3 = 1, COMPARE_UNORDERED_FLAG$1 = 2;
  function equalArrays(array2, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, arrLength = array2.length, othLength = other.length;
    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false;
    }
    var arrStacked = stack.get(array2);
    var othStacked = stack.get(other);
    if (arrStacked && othStacked) {
      return arrStacked == other && othStacked == array2;
    }
    var index2 = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG$1 ? new SetCache() : void 0;
    stack.set(array2, other);
    stack.set(other, array2);
    while (++index2 < arrLength) {
      var arrValue = array2[index2], othValue = other[index2];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, arrValue, index2, other, array2, stack) : customizer(arrValue, othValue, index2, array2, other, stack);
      }
      if (compared !== void 0) {
        if (compared) {
          continue;
        }
        result = false;
        break;
      }
      if (seen) {
        if (!arraySome(other, function(othValue2, othIndex) {
          if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
            return seen.push(othIndex);
          }
        })) {
          result = false;
          break;
        }
      } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
        result = false;
        break;
      }
    }
    stack["delete"](array2);
    stack["delete"](other);
    return result;
  }
  function mapToArray(map) {
    var index2 = -1, result = Array(map.size);
    map.forEach(function(value, key) {
      result[++index2] = [key, value];
    });
    return result;
  }
  function setToArray(set2) {
    var index2 = -1, result = Array(set2.size);
    set2.forEach(function(value) {
      result[++index2] = value;
    });
    return result;
  }
  var COMPARE_PARTIAL_FLAG$2 = 1, COMPARE_UNORDERED_FLAG = 2;
  var boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]";
  var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]";
  var symbolProto = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
  function equalByTag(object2, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
      case dataViewTag:
        if (object2.byteLength != other.byteLength || object2.byteOffset != other.byteOffset) {
          return false;
        }
        object2 = object2.buffer;
        other = other.buffer;
      case arrayBufferTag:
        if (object2.byteLength != other.byteLength || !equalFunc(new Uint8Array$2(object2), new Uint8Array$2(other))) {
          return false;
        }
        return true;
      case boolTag:
      case dateTag:
      case numberTag:
        return eq(+object2, +other);
      case errorTag:
        return object2.name == other.name && object2.message == other.message;
      case regexpTag:
      case stringTag:
        return object2 == other + "";
      case mapTag:
        var convert = mapToArray;
      case setTag:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2;
        convert || (convert = setToArray);
        if (object2.size != other.size && !isPartial) {
          return false;
        }
        var stacked = stack.get(object2);
        if (stacked) {
          return stacked == other;
        }
        bitmask |= COMPARE_UNORDERED_FLAG;
        stack.set(object2, other);
        var result = equalArrays(convert(object2), convert(other), bitmask, customizer, equalFunc, stack);
        stack["delete"](object2);
        return result;
      case symbolTag:
        if (symbolValueOf) {
          return symbolValueOf.call(object2) == symbolValueOf.call(other);
        }
    }
    return false;
  }
  var COMPARE_PARTIAL_FLAG$1 = 1;
  var objectProto$4 = Object.prototype;
  var hasOwnProperty$4 = objectProto$4.hasOwnProperty;
  function equalObjects(object2, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1, objProps = getAllKeys(object2), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
    if (objLength != othLength && !isPartial) {
      return false;
    }
    var index2 = objLength;
    while (index2--) {
      var key = objProps[index2];
      if (!(isPartial ? key in other : hasOwnProperty$4.call(other, key))) {
        return false;
      }
    }
    var objStacked = stack.get(object2);
    var othStacked = stack.get(other);
    if (objStacked && othStacked) {
      return objStacked == other && othStacked == object2;
    }
    var result = true;
    stack.set(object2, other);
    stack.set(other, object2);
    var skipCtor = isPartial;
    while (++index2 < objLength) {
      key = objProps[index2];
      var objValue = object2[key], othValue = other[key];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, objValue, key, other, object2, stack) : customizer(objValue, othValue, key, object2, other, stack);
      }
      if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
        result = false;
        break;
      }
      skipCtor || (skipCtor = key == "constructor");
    }
    if (result && !skipCtor) {
      var objCtor = object2.constructor, othCtor = other.constructor;
      if (objCtor != othCtor && ("constructor" in object2 && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
        result = false;
      }
    }
    stack["delete"](object2);
    stack["delete"](other);
    return result;
  }
  var COMPARE_PARTIAL_FLAG = 1;
  var argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]";
  var objectProto$3 = Object.prototype;
  var hasOwnProperty$3 = objectProto$3.hasOwnProperty;
  function baseIsEqualDeep(object2, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray$2(object2), othIsArr = isArray$2(other), objTag = objIsArr ? arrayTag : getTag$1(object2), othTag = othIsArr ? arrayTag : getTag$1(other);
    objTag = objTag == argsTag ? objectTag : objTag;
    othTag = othTag == argsTag ? objectTag : othTag;
    var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
    if (isSameTag && isBuffer$1(object2)) {
      if (!isBuffer$1(other)) {
        return false;
      }
      objIsArr = true;
      objIsObj = false;
    }
    if (isSameTag && !objIsObj) {
      stack || (stack = new Stack());
      return objIsArr || isTypedArray$1(object2) ? equalArrays(object2, other, bitmask, customizer, equalFunc, stack) : equalByTag(object2, other, objTag, bitmask, customizer, equalFunc, stack);
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
      var objIsWrapped = objIsObj && hasOwnProperty$3.call(object2, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty$3.call(other, "__wrapped__");
      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object2.value() : object2, othUnwrapped = othIsWrapped ? other.value() : other;
        stack || (stack = new Stack());
        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
      }
    }
    if (!isSameTag) {
      return false;
    }
    stack || (stack = new Stack());
    return equalObjects(object2, other, bitmask, customizer, equalFunc, stack);
  }
  function baseIsEqual(value, other, bitmask, customizer, stack) {
    if (value === other) {
      return true;
    }
    if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
      return value !== value && other !== other;
    }
    return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
  }
  function createBaseFor(fromRight) {
    return function(object2, iteratee, keysFunc) {
      var index2 = -1, iterable = Object(object2), props = keysFunc(object2), length = props.length;
      while (length--) {
        var key = props[fromRight ? length : ++index2];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object2;
    };
  }
  var baseFor = createBaseFor();
  const baseFor$1 = baseFor;
  function baseForOwn(object2, iteratee) {
    return object2 && baseFor$1(object2, iteratee, keys);
  }
  var now = function() {
    return root$1.Date.now();
  };
  const now$1 = now;
  var FUNC_ERROR_TEXT = "Expected a function";
  var nativeMax = Math.max, nativeMin = Math.min;
  function debounce(func, wait, options) {
    var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
    if (typeof func != "function") {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    wait = toNumber(wait) || 0;
    if (isObject$1(options)) {
      leading = !!options.leading;
      maxing = "maxWait" in options;
      maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
      trailing = "trailing" in options ? !!options.trailing : trailing;
    }
    function invokeFunc(time) {
      var args = lastArgs, thisArg = lastThis;
      lastArgs = lastThis = void 0;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }
    function leadingEdge(time) {
      lastInvokeTime = time;
      timerId = setTimeout(timerExpired, wait);
      return leading ? invokeFunc(time) : result;
    }
    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
      return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
    }
    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
      return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
    }
    function timerExpired() {
      var time = now$1();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      timerId = setTimeout(timerExpired, remainingWait(time));
    }
    function trailingEdge(time) {
      timerId = void 0;
      if (trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = void 0;
      return result;
    }
    function cancel() {
      if (timerId !== void 0) {
        clearTimeout(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = void 0;
    }
    function flush() {
      return timerId === void 0 ? result : trailingEdge(now$1());
    }
    function debounced() {
      var time = now$1(), isInvoking = shouldInvoke(time);
      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;
      if (isInvoking) {
        if (timerId === void 0) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          clearTimeout(timerId);
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === void 0) {
        timerId = setTimeout(timerExpired, wait);
      }
      return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  }
  function last(array2) {
    var length = array2 == null ? 0 : array2.length;
    return length ? array2[length - 1] : void 0;
  }
  var htmlEscapes = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };
  var escapeHtmlChar = basePropertyOf(htmlEscapes);
  const escapeHtmlChar$1 = escapeHtmlChar;
  var reUnescapedHtml = /[&<>"']/g, reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
  function escape(string2) {
    string2 = toString(string2);
    return string2 && reHasUnescapedHtml.test(string2) ? string2.replace(reUnescapedHtml, escapeHtmlChar$1) : string2;
  }
  function fromPairs(pairs) {
    var index2 = -1, length = pairs == null ? 0 : pairs.length, result = {};
    while (++index2 < length) {
      var pair = pairs[index2];
      result[pair[0]] = pair[1];
    }
    return result;
  }
  function baseValues(object2, props) {
    return arrayMap(props, function(key) {
      return object2[key];
    });
  }
  function baseInverter(object2, setter, iteratee, accumulator) {
    baseForOwn(object2, function(value, key, object3) {
      setter(accumulator, iteratee(value), key, object3);
    });
    return accumulator;
  }
  function createInverter(setter, toIteratee) {
    return function(object2, iteratee) {
      return baseInverter(object2, setter, toIteratee(iteratee), {});
    };
  }
  var objectProto$2 = Object.prototype;
  var nativeObjectToString = objectProto$2.toString;
  var invert = createInverter(function(result, value, key) {
    if (value != null && typeof value.toString != "function") {
      value = nativeObjectToString.call(value);
    }
    result[value] = key;
  }, constant(identity));
  const invert$1 = invert;
  function isEqual(value, other) {
    return baseIsEqual(value, other);
  }
  function isNil(value) {
    return value == null;
  }
  var kebabCase = createCompounder(function(result, word, index2) {
    return result + (index2 ? "-" : "") + word.toLowerCase();
  });
  const kebabCase$1 = kebabCase;
  function baseSet(object2, path, value, customizer) {
    if (!isObject$1(object2)) {
      return object2;
    }
    path = castPath(path, object2);
    var index2 = -1, length = path.length, lastIndex = length - 1, nested = object2;
    while (nested != null && ++index2 < length) {
      var key = toKey(path[index2]), newValue = value;
      if (key === "__proto__" || key === "constructor" || key === "prototype") {
        return object2;
      }
      if (index2 != lastIndex) {
        var objValue = nested[key];
        newValue = customizer ? customizer(objValue, key, nested) : void 0;
        if (newValue === void 0) {
          newValue = isObject$1(objValue) ? objValue : isIndex(path[index2 + 1]) ? [] : {};
        }
      }
      assignValue(nested, key, newValue);
      nested = nested[key];
    }
    return object2;
  }
  function set(object2, path, value) {
    return object2 == null ? object2 : baseSet(object2, path, value);
  }
  var objectProto$1 = Object.prototype;
  var hasOwnProperty$2 = objectProto$1.hasOwnProperty;
  function customDefaultsAssignIn(objValue, srcValue, key, object2) {
    if (objValue === void 0 || eq(objValue, objectProto$1[key]) && !hasOwnProperty$2.call(object2, key)) {
      return srcValue;
    }
    return objValue;
  }
  var stringEscapes = {
    "\\": "\\",
    "'": "'",
    "\n": "n",
    "\r": "r",
    "\u2028": "u2028",
    "\u2029": "u2029"
  };
  function escapeStringChar(chr) {
    return "\\" + stringEscapes[chr];
  }
  var reInterpolate = /<%=([\s\S]+?)%>/g;
  const reInterpolate$1 = reInterpolate;
  var reEscape = /<%-([\s\S]+?)%>/g;
  const reEscape$1 = reEscape;
  var reEvaluate = /<%([\s\S]+?)%>/g;
  const reEvaluate$1 = reEvaluate;
  var templateSettings = {
    "escape": reEscape$1,
    "evaluate": reEvaluate$1,
    "interpolate": reInterpolate$1,
    "variable": "",
    "imports": {
      "_": { "escape": escape }
    }
  };
  const templateSettings$1 = templateSettings;
  var INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
  var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
  var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
  var reNoMatch = /($^)/;
  var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
  var objectProto = Object.prototype;
  var hasOwnProperty$1 = objectProto.hasOwnProperty;
  function template(string2, options, guard) {
    var settings2 = templateSettings$1.imports._.templateSettings || templateSettings$1;
    if (guard && isIterateeCall(string2, options, guard)) {
      options = void 0;
    }
    string2 = toString(string2);
    options = extendWith({}, options, settings2, customDefaultsAssignIn);
    var imports = extendWith({}, options.imports, settings2.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
    var isEscaping, isEvaluating, index2 = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
    var reDelimiters = RegExp(
      (options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate$1 ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$",
      "g"
    );
    var sourceURL = hasOwnProperty$1.call(options, "sourceURL") ? "//# sourceURL=" + (options.sourceURL + "").replace(/\s/g, " ") + "\n" : "";
    string2.replace(reDelimiters, function(match2, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
      interpolateValue || (interpolateValue = esTemplateValue);
      source += string2.slice(index2, offset).replace(reUnescapedString, escapeStringChar);
      if (escapeValue) {
        isEscaping = true;
        source += "' +\n__e(" + escapeValue + ") +\n'";
      }
      if (evaluateValue) {
        isEvaluating = true;
        source += "';\n" + evaluateValue + ";\n__p += '";
      }
      if (interpolateValue) {
        source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
      }
      index2 = offset + match2.length;
      return match2;
    });
    source += "';\n";
    var variable = hasOwnProperty$1.call(options, "variable") && options.variable;
    if (!variable) {
      source = "with (obj) {\n" + source + "\n}\n";
    } else if (reForbiddenIdentifierChars.test(variable)) {
      throw new Error(INVALID_TEMPL_VAR_ERROR_TEXT);
    }
    source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
    source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
    var result = attempt$1(function() {
      return Function(importsKeys, sourceURL + "return " + source).apply(void 0, importsValues);
    });
    result.source = source;
    if (isError(result)) {
      throw result;
    }
    return result;
  }
  const composeEventHandlers = (theirsHandler, oursHandler, { checkForDefaultPrevented = true } = {}) => {
    const handleEvent = (event) => {
      const shouldPrevent = theirsHandler == null ? void 0 : theirsHandler(event);
      if (checkForDefaultPrevented === false || !shouldPrevent) {
        return oursHandler == null ? void 0 : oursHandler(event);
      }
    };
    return handleEvent;
  };
  var _a;
  const isClient = typeof window !== "undefined";
  const isBoolean = (val) => typeof val === "boolean";
  const isNumber = (val) => typeof val === "number";
  const isString$1 = (val) => typeof val === "string";
  const noop = () => {
  };
  isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
  function createFilterWrapper(filter, fn2) {
    function wrapper(...args) {
      filter(() => fn2.apply(this, args), { fn: fn2, thisArg: this, args });
    }
    return wrapper;
  }
  function debounceFilter(ms, options = {}) {
    let timer;
    let maxTimer;
    const filter = (invoke) => {
      const duration = vue.unref(ms);
      const maxDuration = vue.unref(options.maxWait);
      if (timer)
        clearTimeout(timer);
      if (duration <= 0 || maxDuration !== void 0 && maxDuration <= 0) {
        if (maxTimer) {
          clearTimeout(maxTimer);
          maxTimer = null;
        }
        return invoke();
      }
      if (maxDuration && !maxTimer) {
        maxTimer = setTimeout(() => {
          if (timer)
            clearTimeout(timer);
          maxTimer = null;
          invoke();
        }, maxDuration);
      }
      timer = setTimeout(() => {
        if (maxTimer)
          clearTimeout(maxTimer);
        maxTimer = null;
        invoke();
      }, duration);
    };
    return filter;
  }
  function tryOnScopeDispose(fn2) {
    if (vue.getCurrentScope()) {
      vue.onScopeDispose(fn2);
      return true;
    }
    return false;
  }
  function useDebounceFn(fn2, ms = 200, options = {}) {
    return createFilterWrapper(debounceFilter(ms, options), fn2);
  }
  function refDebounced(value, ms = 200, options = {}) {
    if (ms <= 0)
      return value;
    const debounced = vue.ref(value.value);
    const updater = useDebounceFn(() => {
      debounced.value = value.value;
    }, ms, options);
    vue.watch(value, () => updater());
    return debounced;
  }
  function useTimeoutFn(cb, interval, options = {}) {
    const {
      immediate = true
    } = options;
    const isPending = vue.ref(false);
    let timer = null;
    function clear() {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    }
    function stop() {
      isPending.value = false;
      clear();
    }
    function start(...args) {
      clear();
      isPending.value = true;
      timer = setTimeout(() => {
        isPending.value = false;
        timer = null;
        cb(...args);
      }, vue.unref(interval));
    }
    if (immediate) {
      isPending.value = true;
      if (isClient)
        start();
    }
    tryOnScopeDispose(stop);
    return {
      isPending,
      start,
      stop
    };
  }
  function unrefElement(elRef) {
    var _a3;
    const plain = vue.unref(elRef);
    return (_a3 = plain == null ? void 0 : plain.$el) != null ? _a3 : plain;
  }
  const defaultWindow = isClient ? window : void 0;
  function useEventListener(...args) {
    let target;
    let event;
    let listener;
    let options;
    if (isString$1(args[0])) {
      [event, listener, options] = args;
      target = defaultWindow;
    } else {
      [target, event, listener, options] = args;
    }
    if (!target)
      return noop;
    let cleanup = noop;
    const stopWatch = vue.watch(() => unrefElement(target), (el) => {
      cleanup();
      if (!el)
        return;
      el.addEventListener(event, listener, options);
      cleanup = () => {
        el.removeEventListener(event, listener, options);
        cleanup = noop;
      };
    }, { immediate: true, flush: "post" });
    const stop = () => {
      stopWatch();
      cleanup();
    };
    tryOnScopeDispose(stop);
    return stop;
  }
  function onClickOutside(target, handler, options = {}) {
    const { window: window2 = defaultWindow, ignore, capture = true, detectIframe = false } = options;
    if (!window2)
      return;
    const shouldListen = vue.ref(true);
    let fallback;
    const listener = (event) => {
      window2.clearTimeout(fallback);
      const el = unrefElement(target);
      const composedPath = event.composedPath();
      if (!el || el === event.target || composedPath.includes(el) || !shouldListen.value)
        return;
      if (ignore && ignore.length > 0) {
        if (ignore.some((target2) => {
          const el2 = unrefElement(target2);
          return el2 && (event.target === el2 || composedPath.includes(el2));
        }))
          return;
      }
      handler(event);
    };
    const cleanup = [
      useEventListener(window2, "click", listener, { passive: true, capture }),
      useEventListener(window2, "pointerdown", (e) => {
        const el = unrefElement(target);
        shouldListen.value = !!el && !e.composedPath().includes(el);
      }, { passive: true }),
      useEventListener(window2, "pointerup", (e) => {
        if (e.button === 0) {
          const path = e.composedPath();
          e.composedPath = () => path;
          fallback = window2.setTimeout(() => listener(e), 50);
        }
      }, { passive: true }),
      detectIframe && useEventListener(window2, "blur", (event) => {
        var _a3;
        const el = unrefElement(target);
        if (((_a3 = document.activeElement) == null ? void 0 : _a3.tagName) === "IFRAME" && !(el == null ? void 0 : el.contains(document.activeElement)))
          handler(event);
      })
    ].filter(Boolean);
    const stop = () => cleanup.forEach((fn2) => fn2());
    return stop;
  }
  const _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  const globalKey = "__vueuse_ssr_handlers__";
  _global[globalKey] = _global[globalKey] || {};
  _global[globalKey];
  var __getOwnPropSymbols$e = Object.getOwnPropertySymbols;
  var __hasOwnProp$e = Object.prototype.hasOwnProperty;
  var __propIsEnum$e = Object.prototype.propertyIsEnumerable;
  var __objRest$2 = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp$e.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols$e)
      for (var prop of __getOwnPropSymbols$e(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum$e.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  function useResizeObserver(target, callback, options = {}) {
    const _a3 = options, { window: window2 = defaultWindow } = _a3, observerOptions = __objRest$2(_a3, ["window"]);
    let observer;
    const isSupported = window2 && "ResizeObserver" in window2;
    const cleanup = () => {
      if (observer) {
        observer.disconnect();
        observer = void 0;
      }
    };
    const stopWatch = vue.watch(() => unrefElement(target), (el) => {
      cleanup();
      if (isSupported && window2 && el) {
        observer = new ResizeObserver(callback);
        observer.observe(el, observerOptions);
      }
    }, { immediate: true, flush: "post" });
    const stop = () => {
      cleanup();
      stopWatch();
    };
    tryOnScopeDispose(stop);
    return {
      isSupported,
      stop
    };
  }
  var SwipeDirection;
  (function(SwipeDirection2) {
    SwipeDirection2["UP"] = "UP";
    SwipeDirection2["RIGHT"] = "RIGHT";
    SwipeDirection2["DOWN"] = "DOWN";
    SwipeDirection2["LEFT"] = "LEFT";
    SwipeDirection2["NONE"] = "NONE";
  })(SwipeDirection || (SwipeDirection = {}));
  const NOOP = () => {
  };
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty.call(val, key);
  const isArray = Array.isArray;
  const isFunction = (val) => typeof val === "function";
  const isString = (val) => typeof val === "string";
  const isObject = (val) => val !== null && typeof val === "object";
  const isPromise = (val) => {
    return isObject(val) && isFunction(val.then) && isFunction(val.catch);
  };
  const objectToString = Object.prototype.toString;
  const toTypeString = (value) => objectToString.call(value);
  const cacheStringFunction = (fn2) => {
    const cache = /* @__PURE__ */ Object.create(null);
    return (str) => {
      const hit = cache[str];
      return hit || (cache[str] = fn2(str));
    };
  };
  const camelizeRE = /-(\w)/g;
  const camelize = cacheStringFunction((str) => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
  });
  const isUndefined = (val) => val === void 0;
  const isElement = (e) => {
    if (typeof Element === "undefined")
      return false;
    return e instanceof Element;
  };
  const keysOf = (arr) => Object.keys(arr);
  const getProp = (obj, path, defaultValue) => {
    return {
      get value() {
        return get(obj, path, defaultValue);
      },
      set value(val) {
        set(obj, path, val);
      }
    };
  };
  class ElementPlusError extends Error {
    constructor(m) {
      super(m);
      this.name = "ElementPlusError";
    }
  }
  function throwError(scope, m) {
    throw new ElementPlusError(`[${scope}] ${m}`);
  }
  function debugWarn(scope, message2) {
  }
  const classNameToArray = (cls = "") => cls.split(" ").filter((item) => !!item.trim());
  const hasClass = (el, cls) => {
    if (!el || !cls)
      return false;
    if (cls.includes(" "))
      throw new Error("className should not contain space.");
    return el.classList.contains(cls);
  };
  const addClass = (el, cls) => {
    if (!el || !cls.trim())
      return;
    el.classList.add(...classNameToArray(cls));
  };
  const removeClass = (el, cls) => {
    if (!el || !cls.trim())
      return;
    el.classList.remove(...classNameToArray(cls));
  };
  const getStyle = (element, styleName) => {
    var _a3;
    if (!isClient || !element || !styleName)
      return "";
    let key = camelize(styleName);
    if (key === "float")
      key = "cssFloat";
    try {
      const style = element.style[key];
      if (style)
        return style;
      const computed2 = (_a3 = document.defaultView) == null ? void 0 : _a3.getComputedStyle(element, "");
      return computed2 ? computed2[key] : "";
    } catch (e) {
      return element.style[key];
    }
  };
  function addUnit(value, defaultUnit = "px") {
    if (!value)
      return "";
    if (isString(value)) {
      return value;
    } else if (isNumber(value)) {
      return `${value}${defaultUnit}`;
    }
  }
  let scrollBarWidth;
  const getScrollBarWidth = (namespace) => {
    var _a3;
    if (!isClient)
      return 0;
    if (scrollBarWidth !== void 0)
      return scrollBarWidth;
    const outer = document.createElement("div");
    outer.className = `${namespace}-scrollbar__wrap`;
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.position = "absolute";
    outer.style.top = "-9999px";
    document.body.appendChild(outer);
    const widthNoScroll = outer.offsetWidth;
    outer.style.overflow = "scroll";
    const inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);
    const widthWithScroll = inner.offsetWidth;
    (_a3 = outer.parentNode) == null ? void 0 : _a3.removeChild(outer);
    scrollBarWidth = widthNoScroll - widthWithScroll;
    return scrollBarWidth;
  };
  /*! Element Plus Icons Vue v2.0.9 */
  var export_helper_default = (sfc, props) => {
    let target = sfc.__vccOpts || sfc;
    for (let [key, val] of props)
      target[key] = val;
    return target;
  };
  var _sfc_main6 = {
    name: "ArrowDown"
  }, _hoisted_16 = {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, _hoisted_26 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
  }, null, -1), _hoisted_36 = [
    _hoisted_26
  ];
  function _sfc_render6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_16, _hoisted_36);
  }
  var arrow_down_default = /* @__PURE__ */ export_helper_default(_sfc_main6, [["render", _sfc_render6], ["__file", "arrow-down.vue"]]);
  var _sfc_main12 = {
    name: "ArrowUp"
  }, _hoisted_112 = {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, _hoisted_212 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "currentColor",
    d: "m488.832 344.32-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0z"
  }, null, -1), _hoisted_312 = [
    _hoisted_212
  ];
  function _sfc_render12(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_112, _hoisted_312);
  }
  var arrow_up_default = /* @__PURE__ */ export_helper_default(_sfc_main12, [["render", _sfc_render12], ["__file", "arrow-up.vue"]]);
  var _sfc_main49 = {
    name: "CircleCheck"
  }, _hoisted_149 = {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, _hoisted_249 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
  }, null, -1), _hoisted_348 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M745.344 361.344a32 32 0 0 1 45.312 45.312l-288 288a32 32 0 0 1-45.312 0l-160-160a32 32 0 1 1 45.312-45.312L480 626.752l265.344-265.408z"
  }, null, -1), _hoisted_415 = [
    _hoisted_249,
    _hoisted_348
  ];
  function _sfc_render49(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_149, _hoisted_415);
  }
  var circle_check_default = /* @__PURE__ */ export_helper_default(_sfc_main49, [["render", _sfc_render49], ["__file", "circle-check.vue"]]);
  var _sfc_main50 = {
    name: "CircleCloseFilled"
  }, _hoisted_150 = {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, _hoisted_250 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"
  }, null, -1), _hoisted_349 = [
    _hoisted_250
  ];
  function _sfc_render50(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_150, _hoisted_349);
  }
  var circle_close_filled_default = /* @__PURE__ */ export_helper_default(_sfc_main50, [["render", _sfc_render50], ["__file", "circle-close-filled.vue"]]);
  var _sfc_main51 = {
    name: "CircleClose"
  }, _hoisted_151 = {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, _hoisted_251 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "currentColor",
    d: "m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512z"
  }, null, -1), _hoisted_350 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
  }, null, -1), _hoisted_416 = [
    _hoisted_251,
    _hoisted_350
  ];
  function _sfc_render51(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_151, _hoisted_416);
  }
  var circle_close_default = /* @__PURE__ */ export_helper_default(_sfc_main51, [["render", _sfc_render51], ["__file", "circle-close.vue"]]);
  var _sfc_main56 = {
    name: "Close"
  }, _hoisted_156 = {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, _hoisted_256 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
  }, null, -1), _hoisted_355 = [
    _hoisted_256
  ];
  function _sfc_render56(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_156, _hoisted_355);
  }
  var close_default = /* @__PURE__ */ export_helper_default(_sfc_main56, [["render", _sfc_render56], ["__file", "close.vue"]]);
  var _sfc_main80 = {
    name: "Delete"
  }, _hoisted_180 = {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, _hoisted_280 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
  }, null, -1), _hoisted_379 = [
    _hoisted_280
  ];
  function _sfc_render80(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_180, _hoisted_379);
  }
  var delete_default = /* @__PURE__ */ export_helper_default(_sfc_main80, [["render", _sfc_render80], ["__file", "delete.vue"]]);
  var _sfc_main91 = {
    name: "Download"
  }, _hoisted_191 = {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, _hoisted_291 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64zm384-253.696 236.288-236.352 45.248 45.248L508.8 704 192 387.2l45.248-45.248L480 584.704V128h64v450.304z"
  }, null, -1), _hoisted_390 = [
    _hoisted_291
  ];
  function _sfc_render91(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_191, _hoisted_390);
  }
  var download_default = /* @__PURE__ */ export_helper_default(_sfc_main91, [["render", _sfc_render91], ["__file", "download.vue"]]);
  var _sfc_main133 = {
    name: "Hide"
  }, _hoisted_1133 = {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, _hoisted_2133 = /* @__PURE__ */ vue.createElementVNode("path", {
    d: "M876.8 156.8c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6-9.6 0-16 3.2-22.4 9.6L736 220.8c-64-32-137.6-51.2-224-60.8-160 16-288 73.6-377.6 176C44.8 438.4 0 496 0 512s48 73.6 134.4 176c22.4 25.6 44.8 48 73.6 67.2l-86.4 89.6c-6.4 6.4-9.6 12.8-9.6 22.4 0 9.6 3.2 16 9.6 22.4 6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6l704-710.4c3.2-6.4 6.4-12.8 6.4-22.4Zm-646.4 528c-76.8-70.4-128-128-153.6-172.8 28.8-48 80-105.6 153.6-172.8C304 272 400 230.4 512 224c64 3.2 124.8 19.2 176 44.8l-54.4 54.4C598.4 300.8 560 288 512 288c-64 0-115.2 22.4-160 64s-64 96-64 160c0 48 12.8 89.6 35.2 124.8L256 707.2c-9.6-6.4-19.2-16-25.6-22.4Zm140.8-96c-12.8-22.4-19.2-48-19.2-76.8 0-44.8 16-83.2 48-112 32-28.8 67.2-48 112-48 28.8 0 54.4 6.4 73.6 19.2L371.2 588.8ZM889.599 336c-12.8-16-28.8-28.8-41.6-41.6l-48 48c73.6 67.2 124.8 124.8 150.4 169.6-28.8 48-80 105.6-153.6 172.8-73.6 67.2-172.8 108.8-284.8 115.2-51.2-3.2-99.2-12.8-140.8-28.8l-48 48c57.6 22.4 118.4 38.4 188.8 44.8 160-16 288-73.6 377.6-176C979.199 585.6 1024 528 1024 512s-48.001-73.6-134.401-176Z",
    fill: "currentColor"
  }, null, -1), _hoisted_3132 = /* @__PURE__ */ vue.createElementVNode("path", {
    d: "M511.998 672c-12.8 0-25.6-3.2-38.4-6.4l-51.2 51.2c28.8 12.8 57.6 19.2 89.6 19.2 64 0 115.2-22.4 160-64 41.6-41.6 64-96 64-160 0-32-6.4-64-19.2-89.6l-51.2 51.2c3.2 12.8 6.4 25.6 6.4 38.4 0 44.8-16 83.2-48 112-32 28.8-67.2 48-112 48Z",
    fill: "currentColor"
  }, null, -1), _hoisted_438 = [
    _hoisted_2133,
    _hoisted_3132
  ];
  function _sfc_render133(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1133, _hoisted_438);
  }
  var hide_default = /* @__PURE__ */ export_helper_default(_sfc_main133, [["render", _sfc_render133], ["__file", "hide.vue"]]);
  var _sfc_main143 = {
    name: "InfoFilled"
  }, _hoisted_1143 = {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, _hoisted_2143 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64zm67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344zM590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z"
  }, null, -1), _hoisted_3142 = [
    _hoisted_2143
  ];
  function _sfc_render143(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1143, _hoisted_3142);
  }
  var info_filled_default = /* @__PURE__ */ export_helper_default(_sfc_main143, [["render", _sfc_render143], ["__file", "info-filled.vue"]]);
  var _sfc_main150 = {
    name: "Loading"
  }, _hoisted_1150 = {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, _hoisted_2150 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
  }, null, -1), _hoisted_3149 = [
    _hoisted_2150
  ];
  function _sfc_render150(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1150, _hoisted_3149);
  }
  var loading_default = /* @__PURE__ */ export_helper_default(_sfc_main150, [["render", _sfc_render150], ["__file", "loading.vue"]]);
  var _sfc_main169 = {
    name: "Minus"
  }, _hoisted_1169 = {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, _hoisted_2169 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64z"
  }, null, -1), _hoisted_3168 = [
    _hoisted_2169
  ];
  function _sfc_render169(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1169, _hoisted_3168);
  }
  var minus_default = /* @__PURE__ */ export_helper_default(_sfc_main169, [["render", _sfc_render169], ["__file", "minus.vue"]]);
  var _sfc_main201 = {
    name: "Plus"
  }, _hoisted_1201 = {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, _hoisted_2201 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"
  }, null, -1), _hoisted_3200 = [
    _hoisted_2201
  ];
  function _sfc_render201(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1201, _hoisted_3200);
  }
  var plus_default = /* @__PURE__ */ export_helper_default(_sfc_main201, [["render", _sfc_render201], ["__file", "plus.vue"]]);
  var _sfc_main211 = {
    name: "QuestionFilled"
  }, _hoisted_1211 = {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, _hoisted_2211 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm23.744 191.488c-52.096 0-92.928 14.784-123.2 44.352-30.976 29.568-45.76 70.4-45.76 122.496h80.256c0-29.568 5.632-52.8 17.6-68.992 13.376-19.712 35.2-28.864 66.176-28.864 23.936 0 42.944 6.336 56.32 19.712 12.672 13.376 19.712 31.68 19.712 54.912 0 17.6-6.336 34.496-19.008 49.984l-8.448 9.856c-45.76 40.832-73.216 70.4-82.368 89.408-9.856 19.008-14.08 42.24-14.08 68.992v9.856h80.96v-9.856c0-16.896 3.52-31.68 10.56-45.76 6.336-12.672 15.488-24.64 28.16-35.2 33.792-29.568 54.208-48.576 60.544-55.616 16.896-22.528 26.048-51.392 26.048-86.592 0-42.944-14.08-76.736-42.24-101.376-28.16-25.344-65.472-37.312-111.232-37.312zm-12.672 406.208a54.272 54.272 0 0 0-38.72 14.784 49.408 49.408 0 0 0-15.488 38.016c0 15.488 4.928 28.16 15.488 38.016A54.848 54.848 0 0 0 523.072 768c15.488 0 28.16-4.928 38.72-14.784a51.52 51.52 0 0 0 16.192-38.72 51.968 51.968 0 0 0-15.488-38.016 55.936 55.936 0 0 0-39.424-14.784z"
  }, null, -1), _hoisted_3210 = [
    _hoisted_2211
  ];
  function _sfc_render211(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1211, _hoisted_3210);
  }
  var question_filled_default = /* @__PURE__ */ export_helper_default(_sfc_main211, [["render", _sfc_render211], ["__file", "question-filled.vue"]]);
  var _sfc_main249 = {
    name: "SuccessFilled"
  }, _hoisted_1249 = {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, _hoisted_2249 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"
  }, null, -1), _hoisted_3248 = [
    _hoisted_2249
  ];
  function _sfc_render249(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1249, _hoisted_3248);
  }
  var success_filled_default = /* @__PURE__ */ export_helper_default(_sfc_main249, [["render", _sfc_render249], ["__file", "success-filled.vue"]]);
  var _sfc_main275 = {
    name: "Upload"
  }, _hoisted_1275 = {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, _hoisted_2275 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64zm384-578.304V704h-64V247.296L237.248 490.048 192 444.8 508.8 128l316.8 316.8-45.312 45.248L544 253.696z"
  }, null, -1), _hoisted_3274 = [
    _hoisted_2275
  ];
  function _sfc_render275(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1275, _hoisted_3274);
  }
  var upload_default = /* @__PURE__ */ export_helper_default(_sfc_main275, [["render", _sfc_render275], ["__file", "upload.vue"]]);
  var _sfc_main283 = {
    name: "View"
  }, _hoisted_1283 = {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, _hoisted_2283 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"
  }, null, -1), _hoisted_3282 = [
    _hoisted_2283
  ];
  function _sfc_render283(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1283, _hoisted_3282);
  }
  var view_default = /* @__PURE__ */ export_helper_default(_sfc_main283, [["render", _sfc_render283], ["__file", "view.vue"]]);
  var _sfc_main287 = {
    name: "WarningFilled"
  }, _hoisted_1287 = {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, _hoisted_2287 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z"
  }, null, -1), _hoisted_3286 = [
    _hoisted_2287
  ];
  function _sfc_render287(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1287, _hoisted_3286);
  }
  var warning_filled_default = /* @__PURE__ */ export_helper_default(_sfc_main287, [["render", _sfc_render287], ["__file", "warning-filled.vue"]]);
  const epPropKey = "__epPropKey";
  const definePropType = (val) => val;
  const isEpProp = (val) => isObject(val) && !!val[epPropKey];
  const buildProp = (prop, key) => {
    if (!isObject(prop) || isEpProp(prop))
      return prop;
    const { values, required: required2, default: defaultValue, type: type2, validator } = prop;
    const _validator = values || validator ? (val) => {
      let valid = false;
      let allowedValues = [];
      if (values) {
        allowedValues = Array.from(values);
        if (hasOwn(prop, "default")) {
          allowedValues.push(defaultValue);
        }
        valid || (valid = allowedValues.includes(val));
      }
      if (validator)
        valid || (valid = validator(val));
      if (!valid && allowedValues.length > 0) {
        const allowValuesText = [...new Set(allowedValues)].map((value) => JSON.stringify(value)).join(", ");
        vue.warn(`Invalid prop: validation failed${key ? ` for prop "${key}"` : ""}. Expected one of [${allowValuesText}], got value ${JSON.stringify(val)}.`);
      }
      return valid;
    } : void 0;
    const epProp = {
      type: type2,
      required: !!required2,
      validator: _validator,
      [epPropKey]: true
    };
    if (hasOwn(prop, "default"))
      epProp.default = defaultValue;
    return epProp;
  };
  const buildProps = (props) => fromPairs(Object.entries(props).map(([key, option]) => [
    key,
    buildProp(option, key)
  ]));
  const iconPropType = definePropType([
    String,
    Object,
    Function
  ]);
  const CloseComponents = {
    Close: close_default
  };
  const TypeComponents = {
    Close: close_default,
    SuccessFilled: success_filled_default,
    InfoFilled: info_filled_default,
    WarningFilled: warning_filled_default,
    CircleCloseFilled: circle_close_filled_default
  };
  const TypeComponentsMap = {
    success: success_filled_default,
    warning: warning_filled_default,
    error: circle_close_filled_default,
    info: info_filled_default
  };
  const ValidateComponentsMap = {
    validating: loading_default,
    success: circle_check_default,
    error: circle_close_default
  };
  const withInstall = (main, extra) => {
    main.install = (app) => {
      for (const comp of [main, ...Object.values(extra != null ? extra : {})]) {
        app.component(comp.name, comp);
      }
    };
    if (extra) {
      for (const [key, comp] of Object.entries(extra)) {
        main[key] = comp;
      }
    }
    return main;
  };
  const withInstallFunction = (fn2, name) => {
    fn2.install = (app) => {
      fn2._context = app._context;
      app.config.globalProperties[name] = fn2;
    };
    return fn2;
  };
  const withNoopInstall = (component) => {
    component.install = NOOP;
    return component;
  };
  const composeRefs = (...refs) => {
    return (el) => {
      refs.forEach((ref) => {
        if (isFunction(ref)) {
          ref(el);
        } else {
          ref.value = el;
        }
      });
    };
  };
  const EVENT_CODE = {
    tab: "Tab",
    enter: "Enter",
    space: "Space",
    left: "ArrowLeft",
    up: "ArrowUp",
    right: "ArrowRight",
    down: "ArrowDown",
    esc: "Escape",
    delete: "Delete",
    backspace: "Backspace",
    numpadEnter: "NumpadEnter",
    pageUp: "PageUp",
    pageDown: "PageDown",
    home: "Home",
    end: "End"
  };
  const UPDATE_MODEL_EVENT = "update:modelValue";
  const CHANGE_EVENT = "change";
  const INPUT_EVENT = "input";
  const componentSizes = ["", "default", "small", "large"];
  const isValidComponentSize = (val) => ["", ...componentSizes].includes(val);
  var PatchFlags = /* @__PURE__ */ ((PatchFlags2) => {
    PatchFlags2[PatchFlags2["TEXT"] = 1] = "TEXT";
    PatchFlags2[PatchFlags2["CLASS"] = 2] = "CLASS";
    PatchFlags2[PatchFlags2["STYLE"] = 4] = "STYLE";
    PatchFlags2[PatchFlags2["PROPS"] = 8] = "PROPS";
    PatchFlags2[PatchFlags2["FULL_PROPS"] = 16] = "FULL_PROPS";
    PatchFlags2[PatchFlags2["HYDRATE_EVENTS"] = 32] = "HYDRATE_EVENTS";
    PatchFlags2[PatchFlags2["STABLE_FRAGMENT"] = 64] = "STABLE_FRAGMENT";
    PatchFlags2[PatchFlags2["KEYED_FRAGMENT"] = 128] = "KEYED_FRAGMENT";
    PatchFlags2[PatchFlags2["UNKEYED_FRAGMENT"] = 256] = "UNKEYED_FRAGMENT";
    PatchFlags2[PatchFlags2["NEED_PATCH"] = 512] = "NEED_PATCH";
    PatchFlags2[PatchFlags2["DYNAMIC_SLOTS"] = 1024] = "DYNAMIC_SLOTS";
    PatchFlags2[PatchFlags2["HOISTED"] = -1] = "HOISTED";
    PatchFlags2[PatchFlags2["BAIL"] = -2] = "BAIL";
    return PatchFlags2;
  })(PatchFlags || {});
  const isKorean = (text) => /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi.test(text);
  const generateId = () => Math.floor(Math.random() * 1e4);
  const mutable = (val) => val;
  const DEFAULT_EXCLUDE_KEYS = ["class", "style"];
  const LISTENER_PREFIX = /^on[A-Z]/;
  const useAttrs = (params = {}) => {
    const { excludeListeners = false, excludeKeys } = params;
    const allExcludeKeys = vue.computed(() => {
      return ((excludeKeys == null ? void 0 : excludeKeys.value) || []).concat(DEFAULT_EXCLUDE_KEYS);
    });
    const instance = vue.getCurrentInstance();
    if (!instance) {
      return vue.computed(() => ({}));
    }
    return vue.computed(() => {
      var _a3;
      return fromPairs(Object.entries((_a3 = instance.proxy) == null ? void 0 : _a3.$attrs).filter(([key]) => !allExcludeKeys.value.includes(key) && !(excludeListeners && LISTENER_PREFIX.test(key))));
    });
  };
  const buttonGroupContextKey = Symbol("buttonGroupContextKey");
  const configProviderContextKey = Symbol();
  const dialogInjectionKey = Symbol("dialogInjectionKey");
  const formContextKey = Symbol("formContextKey");
  const formItemContextKey = Symbol("formItemContextKey");
  const sliderContextKey = Symbol("sliderContextKey");
  const POPPER_INJECTION_KEY = Symbol("popper");
  const POPPER_CONTENT_INJECTION_KEY = Symbol("popperContent");
  const useProp = (name) => {
    const vm = vue.getCurrentInstance();
    return vue.computed(() => {
      var _a3, _b2;
      return (_b2 = ((_a3 = vm.proxy) == null ? void 0 : _a3.$props)[name]) != null ? _b2 : void 0;
    });
  };
  const globalConfig = vue.ref();
  function useGlobalConfig(key, defaultValue = void 0) {
    const config = vue.getCurrentInstance() ? vue.inject(configProviderContextKey, globalConfig) : globalConfig;
    if (key) {
      return vue.computed(() => {
        var _a3, _b2;
        return (_b2 = (_a3 = config.value) == null ? void 0 : _a3[key]) != null ? _b2 : defaultValue;
      });
    } else {
      return config;
    }
  }
  const provideGlobalConfig = (config, app, global2 = false) => {
    var _a3;
    const inSetup = !!vue.getCurrentInstance();
    const oldConfig = inSetup ? useGlobalConfig() : void 0;
    const provideFn = (_a3 = app == null ? void 0 : app.provide) != null ? _a3 : inSetup ? vue.provide : void 0;
    if (!provideFn) {
      return;
    }
    const context = vue.computed(() => {
      const cfg = vue.unref(config);
      if (!(oldConfig == null ? void 0 : oldConfig.value))
        return cfg;
      return mergeConfig(oldConfig.value, cfg);
    });
    provideFn(configProviderContextKey, context);
    if (global2 || !globalConfig.value) {
      globalConfig.value = context.value;
    }
    return context;
  };
  const mergeConfig = (a, b) => {
    var _a3;
    const keys2 = [.../* @__PURE__ */ new Set([...keysOf(a), ...keysOf(b)])];
    const obj = {};
    for (const key of keys2) {
      obj[key] = (_a3 = b[key]) != null ? _a3 : a[key];
    }
    return obj;
  };
  const useSizeProp = buildProp({
    type: String,
    values: componentSizes,
    required: false
  });
  const useSize = (fallback, ignore = {}) => {
    const emptyRef = vue.ref(void 0);
    const size = ignore.prop ? emptyRef : useProp("size");
    const globalConfig2 = ignore.global ? emptyRef : useGlobalConfig("size");
    const form = ignore.form ? { size: void 0 } : vue.inject(formContextKey, void 0);
    const formItem = ignore.formItem ? { size: void 0 } : vue.inject(formItemContextKey, void 0);
    return vue.computed(() => size.value || vue.unref(fallback) || (formItem == null ? void 0 : formItem.size) || (form == null ? void 0 : form.size) || globalConfig2.value || "");
  };
  const useDisabled$1 = (fallback) => {
    const disabled = useProp("disabled");
    const form = vue.inject(formContextKey, void 0);
    return vue.computed(() => disabled.value || vue.unref(fallback) || (form == null ? void 0 : form.disabled) || false);
  };
  const useDeprecated = ({ from, replacement, scope, version, ref, type: type2 = "API" }, condition) => {
    vue.watch(() => vue.unref(condition), (val) => {
    }, {
      immediate: true
    });
  };
  const useDraggable = (targetRef, dragRef, draggable) => {
    let transform = {
      offsetX: 0,
      offsetY: 0
    };
    const onMousedown = (e) => {
      const downX = e.clientX;
      const downY = e.clientY;
      const { offsetX, offsetY } = transform;
      const targetRect = targetRef.value.getBoundingClientRect();
      const targetLeft = targetRect.left;
      const targetTop = targetRect.top;
      const targetWidth = targetRect.width;
      const targetHeight = targetRect.height;
      const clientWidth = document.documentElement.clientWidth;
      const clientHeight = document.documentElement.clientHeight;
      const minLeft = -targetLeft + offsetX;
      const minTop = -targetTop + offsetY;
      const maxLeft = clientWidth - targetLeft - targetWidth + offsetX;
      const maxTop = clientHeight - targetTop - targetHeight + offsetY;
      const onMousemove = (e2) => {
        const moveX = Math.min(Math.max(offsetX + e2.clientX - downX, minLeft), maxLeft);
        const moveY = Math.min(Math.max(offsetY + e2.clientY - downY, minTop), maxTop);
        transform = {
          offsetX: moveX,
          offsetY: moveY
        };
        targetRef.value.style.transform = `translate(${addUnit(moveX)}, ${addUnit(moveY)})`;
      };
      const onMouseup = () => {
        document.removeEventListener("mousemove", onMousemove);
        document.removeEventListener("mouseup", onMouseup);
      };
      document.addEventListener("mousemove", onMousemove);
      document.addEventListener("mouseup", onMouseup);
    };
    const onDraggable = () => {
      if (dragRef.value && targetRef.value) {
        dragRef.value.addEventListener("mousedown", onMousedown);
      }
    };
    const offDraggable = () => {
      if (dragRef.value && targetRef.value) {
        dragRef.value.removeEventListener("mousedown", onMousedown);
      }
    };
    vue.onMounted(() => {
      vue.watchEffect(() => {
        if (draggable.value) {
          onDraggable();
        } else {
          offDraggable();
        }
      });
    });
    vue.onBeforeUnmount(() => {
      offDraggable();
    });
  };
  const defaultIdInjection = {
    prefix: Math.floor(Math.random() * 1e4),
    current: 0
  };
  const ID_INJECTION_KEY = Symbol("elIdInjection");
  const useId = (deterministicId) => {
    const idInjection = vue.inject(ID_INJECTION_KEY, defaultIdInjection);
    const idRef = vue.computed(() => vue.unref(deterministicId) || `el-id-${idInjection.prefix}-${idInjection.current++}`);
    return idRef;
  };
  const useFormItem = () => {
    const form = vue.inject(formContextKey, void 0);
    const formItem = vue.inject(formItemContextKey, void 0);
    return {
      form,
      formItem
    };
  };
  const useFormItemInputId = (props, {
    formItemContext,
    disableIdGeneration,
    disableIdManagement
  }) => {
    if (!disableIdGeneration) {
      disableIdGeneration = vue.ref(false);
    }
    if (!disableIdManagement) {
      disableIdManagement = vue.ref(false);
    }
    const inputId = vue.ref();
    let idUnwatch = void 0;
    const isLabeledByFormItem = vue.computed(() => {
      var _a3;
      return !!(!props.label && formItemContext && formItemContext.inputIds && ((_a3 = formItemContext.inputIds) == null ? void 0 : _a3.length) <= 1);
    });
    vue.onMounted(() => {
      idUnwatch = vue.watch([vue.toRef(props, "id"), disableIdGeneration], ([id, disableIdGeneration2]) => {
        const newId = id != null ? id : !disableIdGeneration2 ? useId().value : void 0;
        if (newId !== inputId.value) {
          if (formItemContext == null ? void 0 : formItemContext.removeInputId) {
            inputId.value && formItemContext.removeInputId(inputId.value);
            if (!(disableIdManagement == null ? void 0 : disableIdManagement.value) && !disableIdGeneration2 && newId) {
              formItemContext.addInputId(newId);
            }
          }
          inputId.value = newId;
        }
      }, { immediate: true });
    });
    vue.onUnmounted(() => {
      idUnwatch && idUnwatch();
      if (formItemContext == null ? void 0 : formItemContext.removeInputId) {
        inputId.value && formItemContext.removeInputId(inputId.value);
      }
    });
    return {
      isLabeledByFormItem,
      inputId
    };
  };
  var English = {
    name: "en",
    el: {
      colorpicker: {
        confirm: "OK",
        clear: "Clear",
        defaultLabel: "color picker",
        description: "current color is {color}. press enter to select a new color."
      },
      datepicker: {
        now: "Now",
        today: "Today",
        cancel: "Cancel",
        clear: "Clear",
        confirm: "OK",
        dateTablePrompt: "Use the arrow keys and enter to select the day of the month",
        monthTablePrompt: "Use the arrow keys and enter to select the month",
        yearTablePrompt: "Use the arrow keys and enter to select the year",
        selectedDate: "Selected date",
        selectDate: "Select date",
        selectTime: "Select time",
        startDate: "Start Date",
        startTime: "Start Time",
        endDate: "End Date",
        endTime: "End Time",
        prevYear: "Previous Year",
        nextYear: "Next Year",
        prevMonth: "Previous Month",
        nextMonth: "Next Month",
        year: "",
        month1: "January",
        month2: "February",
        month3: "March",
        month4: "April",
        month5: "May",
        month6: "June",
        month7: "July",
        month8: "August",
        month9: "September",
        month10: "October",
        month11: "November",
        month12: "December",
        week: "week",
        weeks: {
          sun: "Sun",
          mon: "Mon",
          tue: "Tue",
          wed: "Wed",
          thu: "Thu",
          fri: "Fri",
          sat: "Sat"
        },
        weeksFull: {
          sun: "Sunday",
          mon: "Monday",
          tue: "Tuesday",
          wed: "Wednesday",
          thu: "Thursday",
          fri: "Friday",
          sat: "Saturday"
        },
        months: {
          jan: "Jan",
          feb: "Feb",
          mar: "Mar",
          apr: "Apr",
          may: "May",
          jun: "Jun",
          jul: "Jul",
          aug: "Aug",
          sep: "Sep",
          oct: "Oct",
          nov: "Nov",
          dec: "Dec"
        }
      },
      inputNumber: {
        decrease: "decrease number",
        increase: "increase number"
      },
      select: {
        loading: "Loading",
        noMatch: "No matching data",
        noData: "No data",
        placeholder: "Select"
      },
      dropdown: {
        toggleDropdown: "Toggle Dropdown"
      },
      cascader: {
        noMatch: "No matching data",
        loading: "Loading",
        placeholder: "Select",
        noData: "No data"
      },
      pagination: {
        goto: "Go to",
        pagesize: "/page",
        total: "Total {total}",
        pageClassifier: "",
        deprecationWarning: "Deprecated usages detected, please refer to the el-pagination documentation for more details"
      },
      dialog: {
        close: "Close this dialog"
      },
      drawer: {
        close: "Close this dialog"
      },
      messagebox: {
        title: "Message",
        confirm: "OK",
        cancel: "Cancel",
        error: "Illegal input",
        close: "Close this dialog"
      },
      upload: {
        deleteTip: "press delete to remove",
        delete: "Delete",
        preview: "Preview",
        continue: "Continue"
      },
      slider: {
        defaultLabel: "slider between {min} and {max}",
        defaultRangeStartLabel: "pick start value",
        defaultRangeEndLabel: "pick end value"
      },
      table: {
        emptyText: "No Data",
        confirmFilter: "Confirm",
        resetFilter: "Reset",
        clearFilter: "All",
        sumText: "Sum"
      },
      tree: {
        emptyText: "No Data"
      },
      transfer: {
        noMatch: "No matching data",
        noData: "No data",
        titles: ["List 1", "List 2"],
        filterPlaceholder: "Enter keyword",
        noCheckedFormat: "{total} items",
        hasCheckedFormat: "{checked}/{total} checked"
      },
      image: {
        error: "FAILED"
      },
      pageHeader: {
        title: "Back"
      },
      popconfirm: {
        confirmButtonText: "Yes",
        cancelButtonText: "No"
      }
    }
  };
  const buildTranslator = (locale) => (path, option) => translate(path, option, vue.unref(locale));
  const translate = (path, option, locale) => get(locale, path, path).replace(/\{(\w+)\}/g, (_, key) => {
    var _a3;
    return `${(_a3 = option == null ? void 0 : option[key]) != null ? _a3 : `{${key}}`}`;
  });
  const buildLocaleContext = (locale) => {
    const lang = vue.computed(() => vue.unref(locale).name);
    const localeRef = vue.isRef(locale) ? locale : vue.ref(locale);
    return {
      lang,
      locale: localeRef,
      t: buildTranslator(locale)
    };
  };
  const useLocale = () => {
    const locale = useGlobalConfig("locale");
    return buildLocaleContext(vue.computed(() => locale.value || English));
  };
  let activeEffectScope;
  function recordEffectScope(effect, scope = activeEffectScope) {
    if (scope && scope.active) {
      scope.effects.push(effect);
    }
  }
  const createDep = (effects) => {
    const dep = new Set(effects);
    dep.w = 0;
    dep.n = 0;
    return dep;
  };
  const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
  const newTracked = (dep) => (dep.n & trackOpBit) > 0;
  const initDepMarkers = ({ deps }) => {
    if (deps.length) {
      for (let i2 = 0; i2 < deps.length; i2++) {
        deps[i2].w |= trackOpBit;
      }
    }
  };
  const finalizeDepMarkers = (effect) => {
    const { deps } = effect;
    if (deps.length) {
      let ptr = 0;
      for (let i2 = 0; i2 < deps.length; i2++) {
        const dep = deps[i2];
        if (wasTracked(dep) && !newTracked(dep)) {
          dep.delete(effect);
        } else {
          deps[ptr++] = dep;
        }
        dep.w &= ~trackOpBit;
        dep.n &= ~trackOpBit;
      }
      deps.length = ptr;
    }
  };
  let effectTrackDepth = 0;
  let trackOpBit = 1;
  const maxMarkerBits = 30;
  let activeEffect;
  class ReactiveEffect {
    constructor(fn2, scheduler = null, scope) {
      this.fn = fn2;
      this.scheduler = scheduler;
      this.active = true;
      this.deps = [];
      this.parent = void 0;
      recordEffectScope(this, scope);
    }
    run() {
      if (!this.active) {
        return this.fn();
      }
      let parent = activeEffect;
      let lastShouldTrack = shouldTrack;
      while (parent) {
        if (parent === this) {
          return;
        }
        parent = parent.parent;
      }
      try {
        this.parent = activeEffect;
        activeEffect = this;
        shouldTrack = true;
        trackOpBit = 1 << ++effectTrackDepth;
        if (effectTrackDepth <= maxMarkerBits) {
          initDepMarkers(this);
        } else {
          cleanupEffect(this);
        }
        return this.fn();
      } finally {
        if (effectTrackDepth <= maxMarkerBits) {
          finalizeDepMarkers(this);
        }
        trackOpBit = 1 << --effectTrackDepth;
        activeEffect = this.parent;
        shouldTrack = lastShouldTrack;
        this.parent = void 0;
        if (this.deferStop) {
          this.stop();
        }
      }
    }
    stop() {
      if (activeEffect === this) {
        this.deferStop = true;
      } else if (this.active) {
        cleanupEffect(this);
        if (this.onStop) {
          this.onStop();
        }
        this.active = false;
      }
    }
  }
  function cleanupEffect(effect) {
    const { deps } = effect;
    if (deps.length) {
      for (let i2 = 0; i2 < deps.length; i2++) {
        deps[i2].delete(effect);
      }
      deps.length = 0;
    }
  }
  let shouldTrack = true;
  function trackEffects(dep, debuggerEventExtraInfo) {
    let shouldTrack2 = false;
    if (effectTrackDepth <= maxMarkerBits) {
      if (!newTracked(dep)) {
        dep.n |= trackOpBit;
        shouldTrack2 = !wasTracked(dep);
      }
    } else {
      shouldTrack2 = !dep.has(activeEffect);
    }
    if (shouldTrack2) {
      dep.add(activeEffect);
      activeEffect.deps.push(dep);
    }
  }
  function triggerEffects(dep, debuggerEventExtraInfo) {
    const effects = isArray(dep) ? dep : [...dep];
    for (const effect of effects) {
      if (effect.computed) {
        triggerEffect(effect);
      }
    }
    for (const effect of effects) {
      if (!effect.computed) {
        triggerEffect(effect);
      }
    }
  }
  function triggerEffect(effect, debuggerEventExtraInfo) {
    if (effect !== activeEffect || effect.allowRecurse) {
      if (effect.scheduler) {
        effect.scheduler();
      } else {
        effect.run();
      }
    }
  }
  function toRaw(observed) {
    const raw = observed && observed["__v_raw"];
    return raw ? toRaw(raw) : observed;
  }
  function trackRefValue(ref) {
    if (shouldTrack && activeEffect) {
      ref = toRaw(ref);
      {
        trackEffects(ref.dep || (ref.dep = createDep()));
      }
    }
  }
  function triggerRefValue(ref, newVal) {
    ref = toRaw(ref);
    if (ref.dep) {
      {
        triggerEffects(ref.dep);
      }
    }
  }
  class ComputedRefImpl {
    constructor(getter, _setter, isReadonly, isSSR) {
      this._setter = _setter;
      this.dep = void 0;
      this.__v_isRef = true;
      this._dirty = true;
      this.effect = new ReactiveEffect(getter, () => {
        if (!this._dirty) {
          this._dirty = true;
          triggerRefValue(this);
        }
      });
      this.effect.computed = this;
      this.effect.active = this._cacheable = !isSSR;
      this["__v_isReadonly"] = isReadonly;
    }
    get value() {
      const self2 = toRaw(this);
      trackRefValue(self2);
      if (self2._dirty || !self2._cacheable) {
        self2._dirty = false;
        self2._value = self2.effect.run();
      }
      return self2._value;
    }
    set value(newValue) {
      this._setter(newValue);
    }
  }
  function computed(getterOrOptions, debugOptions, isSSR = false) {
    let getter;
    let setter;
    const onlyGetter = isFunction(getterOrOptions);
    if (onlyGetter) {
      getter = getterOrOptions;
      setter = NOOP;
    } else {
      getter = getterOrOptions.get;
      setter = getterOrOptions.set;
    }
    const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
    return cRef;
  }
  const defaultNamespace = "el";
  const statePrefix = "is-";
  const _bem = (namespace, block, blockSuffix, element, modifier) => {
    let cls = `${namespace}-${block}`;
    if (blockSuffix) {
      cls += `-${blockSuffix}`;
    }
    if (element) {
      cls += `__${element}`;
    }
    if (modifier) {
      cls += `--${modifier}`;
    }
    return cls;
  };
  const useNamespace = (block) => {
    const globalConfig2 = useGlobalConfig("namespace");
    const namespace = vue.computed(() => globalConfig2.value || defaultNamespace);
    const b = (blockSuffix = "") => _bem(vue.unref(namespace), block, blockSuffix, "", "");
    const e = (element) => element ? _bem(vue.unref(namespace), block, "", element, "") : "";
    const m = (modifier) => modifier ? _bem(vue.unref(namespace), block, "", "", modifier) : "";
    const be2 = (blockSuffix, element) => blockSuffix && element ? _bem(vue.unref(namespace), block, blockSuffix, element, "") : "";
    const em = (element, modifier) => element && modifier ? _bem(vue.unref(namespace), block, "", element, modifier) : "";
    const bm = (blockSuffix, modifier) => blockSuffix && modifier ? _bem(vue.unref(namespace), block, blockSuffix, "", modifier) : "";
    const bem = (blockSuffix, element, modifier) => blockSuffix && element && modifier ? _bem(vue.unref(namespace), block, blockSuffix, element, modifier) : "";
    const is = (name, ...args) => {
      const state = args.length >= 1 ? args[0] : true;
      return name && state ? `${statePrefix}${name}` : "";
    };
    const cssVar = (object2) => {
      const styles = {};
      for (const key in object2) {
        if (object2[key]) {
          styles[`--${namespace.value}-${key}`] = object2[key];
        }
      }
      return styles;
    };
    const cssVarBlock = (object2) => {
      const styles = {};
      for (const key in object2) {
        if (object2[key]) {
          styles[`--${namespace.value}-${block}-${key}`] = object2[key];
        }
      }
      return styles;
    };
    const cssVarName = (name) => `--${namespace.value}-${name}`;
    const cssVarBlockName = (name) => `--${namespace.value}-${block}-${name}`;
    return {
      namespace,
      b,
      e,
      m,
      be: be2,
      em,
      bm,
      bem,
      is,
      cssVar,
      cssVarName,
      cssVarBlock,
      cssVarBlockName
    };
  };
  const useLockscreen = (trigger) => {
    if (!vue.isRef(trigger)) {
      throwError("[useLockscreen]", "You need to pass a ref param to this function");
    }
    const ns2 = useNamespace("popup");
    const hiddenCls = computed(() => ns2.bm("parent", "hidden"));
    if (!isClient || hasClass(document.body, hiddenCls.value)) {
      return;
    }
    let scrollBarWidth2 = 0;
    let withoutHiddenClass = false;
    let bodyWidth = "0";
    const cleanup = () => {
      removeClass(document.body, hiddenCls.value);
      if (withoutHiddenClass) {
        document.body.style.width = bodyWidth;
      }
    };
    vue.watch(trigger, (val) => {
      if (!val) {
        cleanup();
        return;
      }
      withoutHiddenClass = !hasClass(document.body, hiddenCls.value);
      if (withoutHiddenClass) {
        bodyWidth = document.body.style.width;
      }
      scrollBarWidth2 = getScrollBarWidth(ns2.namespace.value);
      const bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
      const bodyOverflowY = getStyle(document.body, "overflowY");
      if (scrollBarWidth2 > 0 && (bodyHasOverflow || bodyOverflowY === "scroll") && withoutHiddenClass) {
        document.body.style.width = `calc(100% - ${scrollBarWidth2}px)`;
      }
      addClass(document.body, hiddenCls.value);
    });
    vue.onScopeDispose(() => cleanup());
  };
  const _prop = buildProp({
    type: definePropType(Boolean),
    default: null
  });
  const _event = buildProp({
    type: definePropType(Function)
  });
  const createModelToggleComposable = (name) => {
    const updateEventKey = `update:${name}`;
    const updateEventKeyRaw = `onUpdate:${name}`;
    const useModelToggleEmits2 = [updateEventKey];
    const useModelToggleProps2 = {
      [name]: _prop,
      [updateEventKeyRaw]: _event
    };
    const useModelToggle2 = ({
      indicator,
      toggleReason,
      shouldHideWhenRouteChanges,
      shouldProceed,
      onShow,
      onHide
    }) => {
      const instance = vue.getCurrentInstance();
      const { emit } = instance;
      const props = instance.props;
      const hasUpdateHandler = vue.computed(() => isFunction(props[updateEventKeyRaw]));
      const isModelBindingAbsent = vue.computed(() => props[name] === null);
      const doShow = (event) => {
        if (indicator.value === true) {
          return;
        }
        indicator.value = true;
        if (toggleReason) {
          toggleReason.value = event;
        }
        if (isFunction(onShow)) {
          onShow(event);
        }
      };
      const doHide = (event) => {
        if (indicator.value === false) {
          return;
        }
        indicator.value = false;
        if (toggleReason) {
          toggleReason.value = event;
        }
        if (isFunction(onHide)) {
          onHide(event);
        }
      };
      const show = (event) => {
        if (props.disabled === true || isFunction(shouldProceed) && !shouldProceed())
          return;
        const shouldEmit = hasUpdateHandler.value && isClient;
        if (shouldEmit) {
          emit(updateEventKey, true);
        }
        if (isModelBindingAbsent.value || !shouldEmit) {
          doShow(event);
        }
      };
      const hide = (event) => {
        if (props.disabled === true || !isClient)
          return;
        const shouldEmit = hasUpdateHandler.value && isClient;
        if (shouldEmit) {
          emit(updateEventKey, false);
        }
        if (isModelBindingAbsent.value || !shouldEmit) {
          doHide(event);
        }
      };
      const onChange = (val) => {
        if (!isBoolean(val))
          return;
        if (props.disabled && val) {
          if (hasUpdateHandler.value) {
            emit(updateEventKey, false);
          }
        } else if (indicator.value !== val) {
          if (val) {
            doShow();
          } else {
            doHide();
          }
        }
      };
      const toggle = () => {
        if (indicator.value) {
          hide();
        } else {
          show();
        }
      };
      vue.watch(() => props[name], onChange);
      if (shouldHideWhenRouteChanges && instance.appContext.config.globalProperties.$route !== void 0) {
        vue.watch(() => ({
          ...instance.proxy.$route
        }), () => {
          if (shouldHideWhenRouteChanges.value && indicator.value) {
            hide();
          }
        });
      }
      vue.onMounted(() => {
        onChange(props[name]);
      });
      return {
        hide,
        show,
        toggle,
        hasUpdateHandler
      };
    };
    return {
      useModelToggle: useModelToggle2,
      useModelToggleProps: useModelToggleProps2,
      useModelToggleEmits: useModelToggleEmits2
    };
  };
  const useSameTarget = (handleClick) => {
    if (!handleClick) {
      return { onClick: NOOP, onMousedown: NOOP, onMouseup: NOOP };
    }
    let mousedownTarget = false;
    let mouseupTarget = false;
    const onClick = (e) => {
      if (mousedownTarget && mouseupTarget) {
        handleClick(e);
      }
      mousedownTarget = mouseupTarget = false;
    };
    const onMousedown = (e) => {
      mousedownTarget = e.target === e.currentTarget;
    };
    const onMouseup = (e) => {
      mouseupTarget = e.target === e.currentTarget;
    };
    return { onClick, onMousedown, onMouseup };
  };
  function useTimeout() {
    let timeoutHandle;
    const registerTimeout = (fn2, delay) => {
      cancelTimeout();
      timeoutHandle = window.setTimeout(fn2, delay);
    };
    const cancelTimeout = () => window.clearTimeout(timeoutHandle);
    tryOnScopeDispose(() => cancelTimeout());
    return {
      registerTimeout,
      cancelTimeout
    };
  }
  let registeredEscapeHandlers = [];
  const cachedHandler = (e) => {
    const event = e;
    if (event.key === EVENT_CODE.esc) {
      registeredEscapeHandlers.forEach((registeredHandler) => registeredHandler(event));
    }
  };
  const useEscapeKeydown = (handler) => {
    vue.onMounted(() => {
      if (registeredEscapeHandlers.length === 0) {
        document.addEventListener("keydown", cachedHandler);
      }
      if (isClient)
        registeredEscapeHandlers.push(handler);
    });
    vue.onBeforeUnmount(() => {
      registeredEscapeHandlers = registeredEscapeHandlers.filter((registeredHandler) => registeredHandler !== handler);
      if (registeredEscapeHandlers.length === 0) {
        if (isClient)
          document.removeEventListener("keydown", cachedHandler);
      }
    });
  };
  let cachedContainer;
  const POPPER_CONTAINER_ID = `el-popper-container-${generateId()}`;
  const POPPER_CONTAINER_SELECTOR = `#${POPPER_CONTAINER_ID}`;
  const createContainer = () => {
    const container = document.createElement("div");
    container.id = POPPER_CONTAINER_ID;
    document.body.appendChild(container);
    return container;
  };
  const usePopperContainer = () => {
    vue.onBeforeMount(() => {
      if (!isClient)
        return;
      if (!cachedContainer || !document.body.querySelector(POPPER_CONTAINER_SELECTOR)) {
        cachedContainer = createContainer();
      }
    });
  };
  const useDelayedToggleProps = buildProps({
    showAfter: {
      type: Number,
      default: 0
    },
    hideAfter: {
      type: Number,
      default: 200
    }
  });
  const useDelayedToggle = ({
    showAfter,
    hideAfter,
    open,
    close
  }) => {
    const { registerTimeout } = useTimeout();
    const onOpen = (event) => {
      registerTimeout(() => {
        open(event);
      }, vue.unref(showAfter));
    };
    const onClose = (event) => {
      registerTimeout(() => {
        close(event);
      }, vue.unref(hideAfter));
    };
    return {
      onOpen,
      onClose
    };
  };
  const FORWARD_REF_INJECTION_KEY = Symbol("elForwardRef");
  const useForwardRef = (forwardRef) => {
    const setForwardRef = (el) => {
      forwardRef.value = el;
    };
    vue.provide(FORWARD_REF_INJECTION_KEY, {
      setForwardRef
    });
  };
  const useForwardRefDirective = (setForwardRef) => {
    return {
      mounted(el) {
        setForwardRef(el);
      },
      updated(el) {
        setForwardRef(el);
      },
      unmounted() {
        setForwardRef(null);
      }
    };
  };
  const zIndex = vue.ref(0);
  const useZIndex = () => {
    const initialZIndex = useGlobalConfig("zIndex", 2e3);
    const currentZIndex = vue.computed(() => initialZIndex.value + zIndex.value);
    const nextZIndex = () => {
      zIndex.value++;
      return currentZIndex.value;
    };
    return {
      initialZIndex,
      currentZIndex,
      nextZIndex
    };
  };
  function useCursor(input) {
    const selectionRef = vue.ref();
    function recordCursor() {
      if (input.value == void 0)
        return;
      const { selectionStart, selectionEnd, value } = input.value;
      if (selectionStart == null || selectionEnd == null)
        return;
      const beforeTxt = value.slice(0, Math.max(0, selectionStart));
      const afterTxt = value.slice(Math.max(0, selectionEnd));
      selectionRef.value = {
        selectionStart,
        selectionEnd,
        value,
        beforeTxt,
        afterTxt
      };
    }
    function setCursor() {
      if (input.value == void 0 || selectionRef.value == void 0)
        return;
      const { value } = input.value;
      const { beforeTxt, afterTxt, selectionStart } = selectionRef.value;
      if (beforeTxt == void 0 || afterTxt == void 0 || selectionStart == void 0)
        return;
      let startPos = value.length;
      if (value.endsWith(afterTxt)) {
        startPos = value.length - afterTxt.length;
      } else if (value.startsWith(beforeTxt)) {
        startPos = beforeTxt.length;
      } else {
        const beforeLastChar = beforeTxt[selectionStart - 1];
        const newIndex = value.indexOf(beforeLastChar, selectionStart - 1);
        if (newIndex !== -1) {
          startPos = newIndex + 1;
        }
      }
      input.value.setSelectionRange(startPos, startPos);
    }
    return [recordCursor, setCursor];
  }
  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const iconProps = buildProps({
    size: {
      type: definePropType([Number, String])
    },
    color: {
      type: String
    }
  });
  const __default__$m = {
    name: "ElIcon",
    inheritAttrs: false
  };
  const _sfc_main$r = /* @__PURE__ */ vue.defineComponent({
    ...__default__$m,
    props: iconProps,
    setup(__props) {
      const props = __props;
      const ns2 = useNamespace("icon");
      const style = vue.computed(() => {
        if (!props.size && !props.color)
          return {};
        return {
          fontSize: isUndefined(props.size) ? void 0 : addUnit(props.size),
          "--color": props.color
        };
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("i", vue.mergeProps({
          class: vue.unref(ns2).b(),
          style: vue.unref(style)
        }, _ctx.$attrs), [
          vue.renderSlot(_ctx.$slots, "default")
        ], 16);
      };
    }
  });
  var Icon = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/icon/src/icon.vue"]]);
  const ElIcon = withInstall(Icon);
  let hiddenTextarea = void 0;
  const HIDDEN_STYLE = `
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`;
  const CONTEXT_STYLE = [
    "letter-spacing",
    "line-height",
    "padding-top",
    "padding-bottom",
    "font-family",
    "font-weight",
    "font-size",
    "text-rendering",
    "text-transform",
    "width",
    "text-indent",
    "padding-left",
    "padding-right",
    "border-width",
    "box-sizing"
  ];
  function calculateNodeStyling(targetElement) {
    const style = window.getComputedStyle(targetElement);
    const boxSizing = style.getPropertyValue("box-sizing");
    const paddingSize = Number.parseFloat(style.getPropertyValue("padding-bottom")) + Number.parseFloat(style.getPropertyValue("padding-top"));
    const borderSize = Number.parseFloat(style.getPropertyValue("border-bottom-width")) + Number.parseFloat(style.getPropertyValue("border-top-width"));
    const contextStyle = CONTEXT_STYLE.map((name) => `${name}:${style.getPropertyValue(name)}`).join(";");
    return { contextStyle, paddingSize, borderSize, boxSizing };
  }
  function calcTextareaHeight(targetElement, minRows = 1, maxRows) {
    var _a3;
    if (!hiddenTextarea) {
      hiddenTextarea = document.createElement("textarea");
      document.body.appendChild(hiddenTextarea);
    }
    const { paddingSize, borderSize, boxSizing, contextStyle } = calculateNodeStyling(targetElement);
    hiddenTextarea.setAttribute("style", `${contextStyle};${HIDDEN_STYLE}`);
    hiddenTextarea.value = targetElement.value || targetElement.placeholder || "";
    let height = hiddenTextarea.scrollHeight;
    const result = {};
    if (boxSizing === "border-box") {
      height = height + borderSize;
    } else if (boxSizing === "content-box") {
      height = height - paddingSize;
    }
    hiddenTextarea.value = "";
    const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
    if (isNumber(minRows)) {
      let minHeight = singleRowHeight * minRows;
      if (boxSizing === "border-box") {
        minHeight = minHeight + paddingSize + borderSize;
      }
      height = Math.max(minHeight, height);
      result.minHeight = `${minHeight}px`;
    }
    if (isNumber(maxRows)) {
      let maxHeight = singleRowHeight * maxRows;
      if (boxSizing === "border-box") {
        maxHeight = maxHeight + paddingSize + borderSize;
      }
      height = Math.min(maxHeight, height);
    }
    result.height = `${height}px`;
    (_a3 = hiddenTextarea.parentNode) == null ? void 0 : _a3.removeChild(hiddenTextarea);
    hiddenTextarea = void 0;
    return result;
  }
  const inputProps = buildProps({
    id: {
      type: String,
      default: void 0
    },
    size: useSizeProp,
    disabled: Boolean,
    modelValue: {
      type: definePropType([
        String,
        Number,
        Object
      ]),
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    resize: {
      type: String,
      values: ["none", "both", "horizontal", "vertical"]
    },
    autosize: {
      type: definePropType([Boolean, Object]),
      default: false
    },
    autocomplete: {
      type: String,
      default: "off"
    },
    formatter: {
      type: Function
    },
    parser: {
      type: Function
    },
    placeholder: {
      type: String
    },
    form: {
      type: String,
      default: ""
    },
    readonly: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    suffixIcon: {
      type: iconPropType,
      default: ""
    },
    prefixIcon: {
      type: iconPropType,
      default: ""
    },
    containerRole: {
      type: String,
      default: void 0
    },
    label: {
      type: String,
      default: void 0
    },
    tabindex: {
      type: [String, Number],
      default: 0
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    inputStyle: {
      type: definePropType([Object, Array, String]),
      default: () => mutable({})
    }
  });
  const inputEmits = {
    [UPDATE_MODEL_EVENT]: (value) => isString(value),
    input: (value) => isString(value),
    change: (value) => isString(value),
    focus: (evt) => evt instanceof FocusEvent,
    blur: (evt) => evt instanceof FocusEvent,
    clear: () => true,
    mouseleave: (evt) => evt instanceof MouseEvent,
    mouseenter: (evt) => evt instanceof MouseEvent,
    keydown: (evt) => evt instanceof Event,
    compositionstart: (evt) => evt instanceof CompositionEvent,
    compositionupdate: (evt) => evt instanceof CompositionEvent,
    compositionend: (evt) => evt instanceof CompositionEvent
  };
  const _hoisted_1$e = ["role"];
  const _hoisted_2$9 = ["id", "type", "disabled", "formatter", "parser", "readonly", "autocomplete", "tabindex", "aria-label", "placeholder"];
  const _hoisted_3$3 = ["id", "tabindex", "disabled", "readonly", "autocomplete", "aria-label", "placeholder"];
  const __default__$l = {
    name: "ElInput",
    inheritAttrs: false
  };
  const _sfc_main$q = /* @__PURE__ */ vue.defineComponent({
    ...__default__$l,
    props: inputProps,
    emits: inputEmits,
    setup(__props, { expose, emit }) {
      const props = __props;
      const PENDANT_MAP = {
        suffix: "append",
        prefix: "prepend"
      };
      const instance = vue.getCurrentInstance();
      const rawAttrs = vue.useAttrs();
      const slots = vue.useSlots();
      const containerAttrs = vue.computed(() => {
        const comboBoxAttrs = {};
        if (props.containerRole === "combobox") {
          comboBoxAttrs["aria-haspopup"] = rawAttrs["aria-haspopup"];
          comboBoxAttrs["aria-owns"] = rawAttrs["aria-owns"];
          comboBoxAttrs["aria-expanded"] = rawAttrs["aria-expanded"];
        }
        return comboBoxAttrs;
      });
      const attrs = useAttrs({
        excludeKeys: vue.computed(() => {
          return Object.keys(containerAttrs.value);
        })
      });
      const { form, formItem } = useFormItem();
      const { inputId } = useFormItemInputId(props, {
        formItemContext: formItem
      });
      const inputSize = useSize();
      const inputDisabled = useDisabled$1();
      const nsInput = useNamespace("input");
      const nsTextarea = useNamespace("textarea");
      const input = vue.shallowRef();
      const textarea = vue.shallowRef();
      const focused = vue.ref(false);
      const hovering = vue.ref(false);
      const isComposing = vue.ref(false);
      const passwordVisible = vue.ref(false);
      const countStyle = vue.ref();
      const textareaCalcStyle = vue.shallowRef(props.inputStyle);
      const _ref = vue.computed(() => input.value || textarea.value);
      const needStatusIcon = vue.computed(() => {
        var _a3;
        return (_a3 = form == null ? void 0 : form.statusIcon) != null ? _a3 : false;
      });
      const validateState = vue.computed(() => (formItem == null ? void 0 : formItem.validateState) || "");
      const validateIcon = vue.computed(() => validateState.value && ValidateComponentsMap[validateState.value]);
      const passwordIcon = vue.computed(() => passwordVisible.value ? view_default : hide_default);
      const containerStyle = vue.computed(() => [
        rawAttrs.style,
        props.inputStyle
      ]);
      const textareaStyle = vue.computed(() => [
        props.inputStyle,
        textareaCalcStyle.value,
        { resize: props.resize }
      ]);
      const nativeInputValue = vue.computed(() => isNil(props.modelValue) ? "" : String(props.modelValue));
      const showClear = vue.computed(() => props.clearable && !inputDisabled.value && !props.readonly && !!nativeInputValue.value && (focused.value || hovering.value));
      const showPwdVisible = vue.computed(() => props.showPassword && !inputDisabled.value && !props.readonly && !!nativeInputValue.value && (!!nativeInputValue.value || focused.value));
      const isWordLimitVisible = vue.computed(() => props.showWordLimit && !!attrs.value.maxlength && (props.type === "text" || props.type === "textarea") && !inputDisabled.value && !props.readonly && !props.showPassword);
      const textLength = vue.computed(() => Array.from(nativeInputValue.value).length);
      const inputExceed = vue.computed(() => !!isWordLimitVisible.value && textLength.value > Number(attrs.value.maxlength));
      const suffixVisible = vue.computed(() => !!slots.suffix || !!props.suffixIcon || showClear.value || props.showPassword || isWordLimitVisible.value || !!validateState.value && needStatusIcon.value);
      const [recordCursor, setCursor] = useCursor(input);
      useResizeObserver(textarea, (entries) => {
        if (!isWordLimitVisible.value || props.resize !== "both")
          return;
        const entry = entries[0];
        const { width } = entry.contentRect;
        countStyle.value = {
          right: `calc(100% - ${width + 15 + 6}px)`
        };
      });
      const resizeTextarea = () => {
        const { type: type2, autosize } = props;
        if (!isClient || type2 !== "textarea")
          return;
        if (autosize) {
          const minRows = isObject(autosize) ? autosize.minRows : void 0;
          const maxRows = isObject(autosize) ? autosize.maxRows : void 0;
          textareaCalcStyle.value = {
            ...calcTextareaHeight(textarea.value, minRows, maxRows)
          };
        } else {
          textareaCalcStyle.value = {
            minHeight: calcTextareaHeight(textarea.value).minHeight
          };
        }
      };
      const setNativeInputValue = () => {
        const input2 = _ref.value;
        if (!input2 || input2.value === nativeInputValue.value)
          return;
        input2.value = nativeInputValue.value;
      };
      const calcIconOffset = (place) => {
        const { el } = instance.vnode;
        if (!el)
          return;
        const elList = Array.from(el.querySelectorAll(`.${nsInput.e(place)}`));
        const target = elList.find((item) => item.parentNode === el);
        if (!target)
          return;
        const pendant = PENDANT_MAP[place];
        if (slots[pendant]) {
          target.style.transform = `translateX(${place === "suffix" ? "-" : ""}${el.querySelector(`.${nsInput.be("group", pendant)}`).offsetWidth}px)`;
        } else {
          target.removeAttribute("style");
        }
      };
      const updateIconOffset = () => {
        calcIconOffset("prefix");
        calcIconOffset("suffix");
      };
      const handleInput = async (event) => {
        recordCursor();
        let { value } = event.target;
        if (props.formatter) {
          value = props.parser ? props.parser(value) : value;
          value = props.formatter(value);
        }
        if (isComposing.value)
          return;
        if (value === nativeInputValue.value)
          return;
        emit(UPDATE_MODEL_EVENT, value);
        emit("input", value);
        await vue.nextTick();
        setNativeInputValue();
        setCursor();
      };
      const handleChange = (event) => {
        emit("change", event.target.value);
      };
      const handleCompositionStart = (event) => {
        emit("compositionstart", event);
        isComposing.value = true;
      };
      const handleCompositionUpdate = (event) => {
        var _a3;
        emit("compositionupdate", event);
        const text = (_a3 = event.target) == null ? void 0 : _a3.value;
        const lastCharacter = text[text.length - 1] || "";
        isComposing.value = !isKorean(lastCharacter);
      };
      const handleCompositionEnd = (event) => {
        emit("compositionend", event);
        if (isComposing.value) {
          isComposing.value = false;
          handleInput(event);
        }
      };
      const handlePasswordVisible = () => {
        passwordVisible.value = !passwordVisible.value;
        focus();
      };
      const focus = async () => {
        var _a3;
        await vue.nextTick();
        (_a3 = _ref.value) == null ? void 0 : _a3.focus();
      };
      const blur = () => {
        var _a3;
        return (_a3 = _ref.value) == null ? void 0 : _a3.blur();
      };
      const handleFocus = (event) => {
        focused.value = true;
        emit("focus", event);
      };
      const handleBlur = (event) => {
        var _a3;
        focused.value = false;
        emit("blur", event);
        if (props.validateEvent) {
          (_a3 = formItem == null ? void 0 : formItem.validate) == null ? void 0 : _a3.call(formItem, "blur").catch((err) => debugWarn());
        }
      };
      const handleMouseLeave = (evt) => {
        hovering.value = false;
        emit("mouseleave", evt);
      };
      const handleMouseEnter = (evt) => {
        hovering.value = true;
        emit("mouseenter", evt);
      };
      const handleKeydown = (evt) => {
        emit("keydown", evt);
      };
      const select = () => {
        var _a3;
        (_a3 = _ref.value) == null ? void 0 : _a3.select();
      };
      const clear = () => {
        emit(UPDATE_MODEL_EVENT, "");
        emit("change", "");
        emit("clear");
        emit("input", "");
      };
      vue.watch(() => props.modelValue, () => {
        var _a3;
        vue.nextTick(() => resizeTextarea());
        if (props.validateEvent) {
          (_a3 = formItem == null ? void 0 : formItem.validate) == null ? void 0 : _a3.call(formItem, "change").catch((err) => debugWarn());
        }
      });
      vue.watch(nativeInputValue, () => setNativeInputValue());
      vue.watch(() => props.type, async () => {
        await vue.nextTick();
        setNativeInputValue();
        resizeTextarea();
        updateIconOffset();
      });
      vue.onMounted(async () => {
        if (!props.formatter && props.parser)
          ;
        setNativeInputValue();
        updateIconOffset();
        await vue.nextTick();
        resizeTextarea();
      });
      vue.onUpdated(async () => {
        await vue.nextTick();
        updateIconOffset();
      });
      expose({
        input,
        textarea,
        ref: _ref,
        textareaStyle,
        autosize: vue.toRef(props, "autosize"),
        focus,
        blur,
        select,
        clear,
        resizeTextarea
      });
      return (_ctx, _cache) => {
        return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", vue.mergeProps(vue.unref(containerAttrs), {
          class: [
            _ctx.type === "textarea" ? vue.unref(nsTextarea).b() : vue.unref(nsInput).b(),
            vue.unref(nsInput).m(vue.unref(inputSize)),
            vue.unref(nsInput).is("disabled", vue.unref(inputDisabled)),
            vue.unref(nsInput).is("exceed", vue.unref(inputExceed)),
            {
              [vue.unref(nsInput).b("group")]: _ctx.$slots.prepend || _ctx.$slots.append,
              [vue.unref(nsInput).bm("group", "append")]: _ctx.$slots.append,
              [vue.unref(nsInput).bm("group", "prepend")]: _ctx.$slots.prepend,
              [vue.unref(nsInput).m("prefix")]: _ctx.$slots.prefix || _ctx.prefixIcon,
              [vue.unref(nsInput).m("suffix")]: _ctx.$slots.suffix || _ctx.suffixIcon || _ctx.clearable || _ctx.showPassword,
              [vue.unref(nsInput).bm("suffix", "password-clear")]: vue.unref(showClear) && vue.unref(showPwdVisible)
            },
            _ctx.$attrs.class
          ],
          style: vue.unref(containerStyle),
          role: _ctx.containerRole,
          onMouseenter: handleMouseEnter,
          onMouseleave: handleMouseLeave
        }), [
          vue.createCommentVNode(" input "),
          _ctx.type !== "textarea" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
            vue.createCommentVNode(" prepend slot "),
            _ctx.$slots.prepend ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 0,
              class: vue.normalizeClass(vue.unref(nsInput).be("group", "prepend"))
            }, [
              vue.renderSlot(_ctx.$slots, "prepend")
            ], 2)) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("div", {
              class: vue.normalizeClass([vue.unref(nsInput).e("wrapper"), vue.unref(nsInput).is("focus", focused.value)])
            }, [
              vue.createCommentVNode(" prefix slot "),
              _ctx.$slots.prefix || _ctx.prefixIcon ? (vue.openBlock(), vue.createElementBlock("span", {
                key: 0,
                class: vue.normalizeClass(vue.unref(nsInput).e("prefix"))
              }, [
                vue.createElementVNode("span", {
                  class: vue.normalizeClass(vue.unref(nsInput).e("prefix-inner"))
                }, [
                  vue.renderSlot(_ctx.$slots, "prefix"),
                  _ctx.prefixIcon ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                    key: 0,
                    class: vue.normalizeClass(vue.unref(nsInput).e("icon"))
                  }, {
                    default: vue.withCtx(() => [
                      (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.prefixIcon)))
                    ]),
                    _: 1
                  }, 8, ["class"])) : vue.createCommentVNode("v-if", true)
                ], 2)
              ], 2)) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("input", vue.mergeProps({
                id: vue.unref(inputId),
                ref_key: "input",
                ref: input,
                class: vue.unref(nsInput).e("inner")
              }, vue.unref(attrs), {
                type: _ctx.showPassword ? passwordVisible.value ? "text" : "password" : _ctx.type,
                disabled: vue.unref(inputDisabled),
                formatter: _ctx.formatter,
                parser: _ctx.parser,
                readonly: _ctx.readonly,
                autocomplete: _ctx.autocomplete,
                tabindex: _ctx.tabindex,
                "aria-label": _ctx.label,
                placeholder: _ctx.placeholder,
                style: _ctx.inputStyle,
                onCompositionstart: handleCompositionStart,
                onCompositionupdate: handleCompositionUpdate,
                onCompositionend: handleCompositionEnd,
                onInput: handleInput,
                onFocus: handleFocus,
                onBlur: handleBlur,
                onChange: handleChange,
                onKeydown: handleKeydown
              }), null, 16, _hoisted_2$9),
              vue.createCommentVNode(" suffix slot "),
              vue.unref(suffixVisible) ? (vue.openBlock(), vue.createElementBlock("span", {
                key: 1,
                class: vue.normalizeClass(vue.unref(nsInput).e("suffix"))
              }, [
                vue.createElementVNode("span", {
                  class: vue.normalizeClass(vue.unref(nsInput).e("suffix-inner"))
                }, [
                  !vue.unref(showClear) || !vue.unref(showPwdVisible) || !vue.unref(isWordLimitVisible) ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                    vue.renderSlot(_ctx.$slots, "suffix"),
                    _ctx.suffixIcon ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                      key: 0,
                      class: vue.normalizeClass(vue.unref(nsInput).e("icon"))
                    }, {
                      default: vue.withCtx(() => [
                        (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.suffixIcon)))
                      ]),
                      _: 1
                    }, 8, ["class"])) : vue.createCommentVNode("v-if", true)
                  ], 64)) : vue.createCommentVNode("v-if", true),
                  vue.unref(showClear) ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                    key: 1,
                    class: vue.normalizeClass([vue.unref(nsInput).e("icon"), vue.unref(nsInput).e("clear")]),
                    onMousedown: vue.withModifiers(vue.unref(NOOP), ["prevent"]),
                    onClick: clear
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(vue.unref(circle_close_default))
                    ]),
                    _: 1
                  }, 8, ["class", "onMousedown"])) : vue.createCommentVNode("v-if", true),
                  vue.unref(showPwdVisible) ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                    key: 2,
                    class: vue.normalizeClass([vue.unref(nsInput).e("icon"), vue.unref(nsInput).e("password")]),
                    onClick: handlePasswordVisible
                  }, {
                    default: vue.withCtx(() => [
                      (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(vue.unref(passwordIcon))))
                    ]),
                    _: 1
                  }, 8, ["class"])) : vue.createCommentVNode("v-if", true),
                  vue.unref(isWordLimitVisible) ? (vue.openBlock(), vue.createElementBlock("span", {
                    key: 3,
                    class: vue.normalizeClass(vue.unref(nsInput).e("count"))
                  }, [
                    vue.createElementVNode("span", {
                      class: vue.normalizeClass(vue.unref(nsInput).e("count-inner"))
                    }, vue.toDisplayString(vue.unref(textLength)) + " / " + vue.toDisplayString(vue.unref(attrs).maxlength), 3)
                  ], 2)) : vue.createCommentVNode("v-if", true),
                  vue.unref(validateState) && vue.unref(validateIcon) && vue.unref(needStatusIcon) ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                    key: 4,
                    class: vue.normalizeClass([
                      vue.unref(nsInput).e("icon"),
                      vue.unref(nsInput).e("validateIcon"),
                      vue.unref(nsInput).is("loading", vue.unref(validateState) === "validating")
                    ])
                  }, {
                    default: vue.withCtx(() => [
                      (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(vue.unref(validateIcon))))
                    ]),
                    _: 1
                  }, 8, ["class"])) : vue.createCommentVNode("v-if", true)
                ], 2)
              ], 2)) : vue.createCommentVNode("v-if", true)
            ], 2),
            vue.createCommentVNode(" append slot "),
            _ctx.$slots.append ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 1,
              class: vue.normalizeClass(vue.unref(nsInput).be("group", "append"))
            }, [
              vue.renderSlot(_ctx.$slots, "append")
            ], 2)) : vue.createCommentVNode("v-if", true)
          ], 64)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
            vue.createCommentVNode(" textarea "),
            vue.createElementVNode("textarea", vue.mergeProps({
              id: vue.unref(inputId),
              ref_key: "textarea",
              ref: textarea,
              class: vue.unref(nsTextarea).e("inner")
            }, vue.unref(attrs), {
              tabindex: _ctx.tabindex,
              disabled: vue.unref(inputDisabled),
              readonly: _ctx.readonly,
              autocomplete: _ctx.autocomplete,
              style: vue.unref(textareaStyle),
              "aria-label": _ctx.label,
              placeholder: _ctx.placeholder,
              onCompositionstart: handleCompositionStart,
              onCompositionupdate: handleCompositionUpdate,
              onCompositionend: handleCompositionEnd,
              onInput: handleInput,
              onFocus: handleFocus,
              onBlur: handleBlur,
              onChange: handleChange,
              onKeydown: handleKeydown
            }), null, 16, _hoisted_3$3),
            vue.unref(isWordLimitVisible) ? (vue.openBlock(), vue.createElementBlock("span", {
              key: 0,
              style: vue.normalizeStyle(countStyle.value),
              class: vue.normalizeClass(vue.unref(nsInput).e("count"))
            }, vue.toDisplayString(vue.unref(textLength)) + " / " + vue.toDisplayString(vue.unref(attrs).maxlength), 7)) : vue.createCommentVNode("v-if", true)
          ], 64))
        ], 16, _hoisted_1$e)), [
          [vue.vShow, _ctx.type !== "hidden"]
        ]);
      };
    }
  });
  var Input = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/input/src/input.vue"]]);
  const ElInput = withInstall(Input);
  const usePopperProps = buildProps({
    role: {
      type: String,
      default: "tooltip"
    }
  });
  const __default__$k = {
    name: "ElPopperRoot",
    inheritAttrs: false
  };
  const _sfc_main$p = /* @__PURE__ */ vue.defineComponent({
    ...__default__$k,
    props: usePopperProps,
    setup(__props, { expose }) {
      const props = __props;
      const triggerRef = vue.ref();
      const popperInstanceRef = vue.ref();
      const contentRef = vue.ref();
      const referenceRef = vue.ref();
      const role = vue.computed(() => props.role);
      const popperProvides = {
        triggerRef,
        popperInstanceRef,
        contentRef,
        referenceRef,
        role
      };
      expose(popperProvides);
      vue.provide(POPPER_INJECTION_KEY, popperProvides);
      return (_ctx, _cache) => {
        return vue.renderSlot(_ctx.$slots, "default");
      };
    }
  });
  var Popper = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/popper.vue"]]);
  const usePopperArrowProps = buildProps({
    arrowOffset: {
      type: Number,
      default: 5
    }
  });
  const __default__$j = {
    name: "ElPopperArrow",
    inheritAttrs: false
  };
  const _sfc_main$o = /* @__PURE__ */ vue.defineComponent({
    ...__default__$j,
    props: usePopperArrowProps,
    setup(__props, { expose }) {
      const props = __props;
      const ns2 = useNamespace("popper");
      const { arrowOffset, arrowRef } = vue.inject(POPPER_CONTENT_INJECTION_KEY, void 0);
      vue.watch(() => props.arrowOffset, (val) => {
        arrowOffset.value = val;
      });
      vue.onBeforeUnmount(() => {
        arrowRef.value = void 0;
      });
      expose({
        arrowRef
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("span", {
          ref_key: "arrowRef",
          ref: arrowRef,
          class: vue.normalizeClass(vue.unref(ns2).e("arrow")),
          "data-popper-arrow": ""
        }, null, 2);
      };
    }
  });
  var ElPopperArrow = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/arrow.vue"]]);
  const NAME = "ElOnlyChild";
  const OnlyChild = vue.defineComponent({
    name: NAME,
    setup(_, {
      slots,
      attrs
    }) {
      var _a3;
      const forwardRefInjection = vue.inject(FORWARD_REF_INJECTION_KEY);
      const forwardRefDirective = useForwardRefDirective((_a3 = forwardRefInjection == null ? void 0 : forwardRefInjection.setForwardRef) != null ? _a3 : NOOP);
      return () => {
        var _a22;
        const defaultSlot = (_a22 = slots.default) == null ? void 0 : _a22.call(slots, attrs);
        if (!defaultSlot)
          return null;
        if (defaultSlot.length > 1) {
          return null;
        }
        const firstLegitNode = findFirstLegitChild(defaultSlot);
        if (!firstLegitNode) {
          return null;
        }
        return vue.withDirectives(vue.cloneVNode(firstLegitNode, attrs), [[forwardRefDirective]]);
      };
    }
  });
  function findFirstLegitChild(node) {
    if (!node)
      return null;
    const children = node;
    for (const child of children) {
      if (isObject(child)) {
        switch (child.type) {
          case vue.Comment:
            continue;
          case vue.Text:
          case "svg":
            return wrapTextContent(child);
          case vue.Fragment:
            return findFirstLegitChild(child.children);
          default:
            return child;
        }
      }
      return wrapTextContent(child);
    }
    return null;
  }
  function wrapTextContent(s) {
    return vue.createVNode("span", {
      "class": "el-only-child__content"
    }, [s]);
  }
  const usePopperTriggerProps = buildProps({
    virtualRef: {
      type: definePropType(Object)
    },
    virtualTriggering: Boolean,
    onMouseenter: Function,
    onMouseleave: Function,
    onClick: Function,
    onKeydown: Function,
    onFocus: Function,
    onBlur: Function,
    onContextmenu: Function,
    id: String,
    open: Boolean
  });
  const __default__$i = {
    name: "ElPopperTrigger",
    inheritAttrs: false
  };
  const _sfc_main$n = /* @__PURE__ */ vue.defineComponent({
    ...__default__$i,
    props: usePopperTriggerProps,
    setup(__props, { expose }) {
      const props = __props;
      const { role, triggerRef } = vue.inject(POPPER_INJECTION_KEY, void 0);
      useForwardRef(triggerRef);
      const ariaControls = vue.computed(() => {
        return ariaHaspopup.value ? props.id : void 0;
      });
      const ariaDescribedby = vue.computed(() => {
        if (role && role.value === "tooltip") {
          return props.open && props.id ? props.id : void 0;
        }
        return void 0;
      });
      const ariaHaspopup = vue.computed(() => {
        if (role && role.value !== "tooltip") {
          return role.value;
        }
        return void 0;
      });
      const ariaExpanded = vue.computed(() => {
        return ariaHaspopup.value ? `${props.open}` : void 0;
      });
      let virtualTriggerAriaStopWatch = void 0;
      vue.onMounted(() => {
        vue.watch(() => props.virtualRef, (virtualEl) => {
          if (virtualEl) {
            triggerRef.value = unrefElement(virtualEl);
          }
        }, {
          immediate: true
        });
        vue.watch(() => triggerRef.value, (el, prevEl) => {
          virtualTriggerAriaStopWatch == null ? void 0 : virtualTriggerAriaStopWatch();
          virtualTriggerAriaStopWatch = void 0;
          if (isElement(el)) {
            [
              "onMouseenter",
              "onMouseleave",
              "onClick",
              "onKeydown",
              "onFocus",
              "onBlur",
              "onContextmenu"
            ].forEach((eventName) => {
              var _a3;
              const handler = props[eventName];
              if (handler) {
                el.addEventListener(eventName.slice(2).toLowerCase(), handler);
                (_a3 = prevEl == null ? void 0 : prevEl.removeEventListener) == null ? void 0 : _a3.call(prevEl, eventName.slice(2).toLowerCase(), handler);
              }
            });
            virtualTriggerAriaStopWatch = vue.watch([ariaControls, ariaDescribedby, ariaHaspopup, ariaExpanded], (watches) => {
              [
                "aria-controls",
                "aria-describedby",
                "aria-haspopup",
                "aria-expanded"
              ].forEach((key, idx) => {
                isNil(watches[idx]) ? el.removeAttribute(key) : el.setAttribute(key, watches[idx]);
              });
            }, { immediate: true });
          }
          if (isElement(prevEl)) {
            [
              "aria-controls",
              "aria-describedby",
              "aria-haspopup",
              "aria-expanded"
            ].forEach((key) => prevEl.removeAttribute(key));
          }
        }, {
          immediate: true
        });
      });
      vue.onBeforeUnmount(() => {
        virtualTriggerAriaStopWatch == null ? void 0 : virtualTriggerAriaStopWatch();
        virtualTriggerAriaStopWatch = void 0;
      });
      expose({
        triggerRef
      });
      return (_ctx, _cache) => {
        return !_ctx.virtualTriggering ? (vue.openBlock(), vue.createBlock(vue.unref(OnlyChild), vue.mergeProps({ key: 0 }, _ctx.$attrs, {
          "aria-controls": vue.unref(ariaControls),
          "aria-describedby": vue.unref(ariaDescribedby),
          "aria-expanded": vue.unref(ariaExpanded),
          "aria-haspopup": vue.unref(ariaHaspopup)
        }), {
          default: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 16, ["aria-controls", "aria-describedby", "aria-expanded", "aria-haspopup"])) : vue.createCommentVNode("v-if", true);
      };
    }
  });
  var ElPopperTrigger = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/trigger.vue"]]);
  var E = "top", R = "bottom", W = "right", P = "left", me = "auto", G = [E, R, W, P], U = "start", J = "end", Xe = "clippingParents", je = "viewport", K = "popper", Ye = "reference", De = G.reduce(function(t, e) {
    return t.concat([e + "-" + U, e + "-" + J]);
  }, []), Ee = [].concat(G, [me]).reduce(function(t, e) {
    return t.concat([e, e + "-" + U, e + "-" + J]);
  }, []), Ge = "beforeRead", Je = "read", Ke = "afterRead", Qe = "beforeMain", Ze = "main", et = "afterMain", tt = "beforeWrite", nt = "write", rt = "afterWrite", ot = [Ge, Je, Ke, Qe, Ze, et, tt, nt, rt];
  function C(t) {
    return t ? (t.nodeName || "").toLowerCase() : null;
  }
  function H(t) {
    if (t == null)
      return window;
    if (t.toString() !== "[object Window]") {
      var e = t.ownerDocument;
      return e && e.defaultView || window;
    }
    return t;
  }
  function Q(t) {
    var e = H(t).Element;
    return t instanceof e || t instanceof Element;
  }
  function B(t) {
    var e = H(t).HTMLElement;
    return t instanceof e || t instanceof HTMLElement;
  }
  function Pe(t) {
    if (typeof ShadowRoot == "undefined")
      return false;
    var e = H(t).ShadowRoot;
    return t instanceof e || t instanceof ShadowRoot;
  }
  function Mt(t) {
    var e = t.state;
    Object.keys(e.elements).forEach(function(n) {
      var r = e.styles[n] || {}, o = e.attributes[n] || {}, i2 = e.elements[n];
      !B(i2) || !C(i2) || (Object.assign(i2.style, r), Object.keys(o).forEach(function(a) {
        var s = o[a];
        s === false ? i2.removeAttribute(a) : i2.setAttribute(a, s === true ? "" : s);
      }));
    });
  }
  function Rt(t) {
    var e = t.state, n = { popper: { position: e.options.strategy, left: "0", top: "0", margin: "0" }, arrow: { position: "absolute" }, reference: {} };
    return Object.assign(e.elements.popper.style, n.popper), e.styles = n, e.elements.arrow && Object.assign(e.elements.arrow.style, n.arrow), function() {
      Object.keys(e.elements).forEach(function(r) {
        var o = e.elements[r], i2 = e.attributes[r] || {}, a = Object.keys(e.styles.hasOwnProperty(r) ? e.styles[r] : n[r]), s = a.reduce(function(f, c) {
          return f[c] = "", f;
        }, {});
        !B(o) || !C(o) || (Object.assign(o.style, s), Object.keys(i2).forEach(function(f) {
          o.removeAttribute(f);
        }));
      });
    };
  }
  var Ae = { name: "applyStyles", enabled: true, phase: "write", fn: Mt, effect: Rt, requires: ["computeStyles"] };
  function q(t) {
    return t.split("-")[0];
  }
  var X = Math.max, ve = Math.min, Z = Math.round;
  function ee(t, e) {
    e === void 0 && (e = false);
    var n = t.getBoundingClientRect(), r = 1, o = 1;
    if (B(t) && e) {
      var i2 = t.offsetHeight, a = t.offsetWidth;
      a > 0 && (r = Z(n.width) / a || 1), i2 > 0 && (o = Z(n.height) / i2 || 1);
    }
    return { width: n.width / r, height: n.height / o, top: n.top / o, right: n.right / r, bottom: n.bottom / o, left: n.left / r, x: n.left / r, y: n.top / o };
  }
  function ke(t) {
    var e = ee(t), n = t.offsetWidth, r = t.offsetHeight;
    return Math.abs(e.width - n) <= 1 && (n = e.width), Math.abs(e.height - r) <= 1 && (r = e.height), { x: t.offsetLeft, y: t.offsetTop, width: n, height: r };
  }
  function it(t, e) {
    var n = e.getRootNode && e.getRootNode();
    if (t.contains(e))
      return true;
    if (n && Pe(n)) {
      var r = e;
      do {
        if (r && t.isSameNode(r))
          return true;
        r = r.parentNode || r.host;
      } while (r);
    }
    return false;
  }
  function N(t) {
    return H(t).getComputedStyle(t);
  }
  function Wt(t) {
    return ["table", "td", "th"].indexOf(C(t)) >= 0;
  }
  function I(t) {
    return ((Q(t) ? t.ownerDocument : t.document) || window.document).documentElement;
  }
  function ge(t) {
    return C(t) === "html" ? t : t.assignedSlot || t.parentNode || (Pe(t) ? t.host : null) || I(t);
  }
  function at(t) {
    return !B(t) || N(t).position === "fixed" ? null : t.offsetParent;
  }
  function Bt(t) {
    var e = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1, n = navigator.userAgent.indexOf("Trident") !== -1;
    if (n && B(t)) {
      var r = N(t);
      if (r.position === "fixed")
        return null;
    }
    var o = ge(t);
    for (Pe(o) && (o = o.host); B(o) && ["html", "body"].indexOf(C(o)) < 0; ) {
      var i2 = N(o);
      if (i2.transform !== "none" || i2.perspective !== "none" || i2.contain === "paint" || ["transform", "perspective"].indexOf(i2.willChange) !== -1 || e && i2.willChange === "filter" || e && i2.filter && i2.filter !== "none")
        return o;
      o = o.parentNode;
    }
    return null;
  }
  function se(t) {
    for (var e = H(t), n = at(t); n && Wt(n) && N(n).position === "static"; )
      n = at(n);
    return n && (C(n) === "html" || C(n) === "body" && N(n).position === "static") ? e : n || Bt(t) || e;
  }
  function Le(t) {
    return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
  }
  function fe(t, e, n) {
    return X(t, ve(e, n));
  }
  function St(t, e, n) {
    var r = fe(t, e, n);
    return r > n ? n : r;
  }
  function st() {
    return { top: 0, right: 0, bottom: 0, left: 0 };
  }
  function ft(t) {
    return Object.assign({}, st(), t);
  }
  function ct(t, e) {
    return e.reduce(function(n, r) {
      return n[r] = t, n;
    }, {});
  }
  var Tt = function(t, e) {
    return t = typeof t == "function" ? t(Object.assign({}, e.rects, { placement: e.placement })) : t, ft(typeof t != "number" ? t : ct(t, G));
  };
  function Ht(t) {
    var e, n = t.state, r = t.name, o = t.options, i2 = n.elements.arrow, a = n.modifiersData.popperOffsets, s = q(n.placement), f = Le(s), c = [P, W].indexOf(s) >= 0, u = c ? "height" : "width";
    if (!(!i2 || !a)) {
      var m = Tt(o.padding, n), v = ke(i2), l = f === "y" ? E : P, h = f === "y" ? R : W, p = n.rects.reference[u] + n.rects.reference[f] - a[f] - n.rects.popper[u], g = a[f] - n.rects.reference[f], x = se(i2), y = x ? f === "y" ? x.clientHeight || 0 : x.clientWidth || 0 : 0, $2 = p / 2 - g / 2, d = m[l], b = y - v[u] - m[h], w = y / 2 - v[u] / 2 + $2, O = fe(d, w, b), j = f;
      n.modifiersData[r] = (e = {}, e[j] = O, e.centerOffset = O - w, e);
    }
  }
  function Ct(t) {
    var e = t.state, n = t.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
    o != null && (typeof o == "string" && (o = e.elements.popper.querySelector(o), !o) || !it(e.elements.popper, o) || (e.elements.arrow = o));
  }
  var pt = { name: "arrow", enabled: true, phase: "main", fn: Ht, effect: Ct, requires: ["popperOffsets"], requiresIfExists: ["preventOverflow"] };
  function te(t) {
    return t.split("-")[1];
  }
  var qt = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
  function Vt(t) {
    var e = t.x, n = t.y, r = window, o = r.devicePixelRatio || 1;
    return { x: Z(e * o) / o || 0, y: Z(n * o) / o || 0 };
  }
  function ut(t) {
    var e, n = t.popper, r = t.popperRect, o = t.placement, i2 = t.variation, a = t.offsets, s = t.position, f = t.gpuAcceleration, c = t.adaptive, u = t.roundOffsets, m = t.isFixed, v = a.x, l = v === void 0 ? 0 : v, h = a.y, p = h === void 0 ? 0 : h, g = typeof u == "function" ? u({ x: l, y: p }) : { x: l, y: p };
    l = g.x, p = g.y;
    var x = a.hasOwnProperty("x"), y = a.hasOwnProperty("y"), $2 = P, d = E, b = window;
    if (c) {
      var w = se(n), O = "clientHeight", j = "clientWidth";
      if (w === H(n) && (w = I(n), N(w).position !== "static" && s === "absolute" && (O = "scrollHeight", j = "scrollWidth")), w = w, o === E || (o === P || o === W) && i2 === J) {
        d = R;
        var A = m && w === b && b.visualViewport ? b.visualViewport.height : w[O];
        p -= A - r.height, p *= f ? 1 : -1;
      }
      if (o === P || (o === E || o === R) && i2 === J) {
        $2 = W;
        var k = m && w === b && b.visualViewport ? b.visualViewport.width : w[j];
        l -= k - r.width, l *= f ? 1 : -1;
      }
    }
    var D = Object.assign({ position: s }, c && qt), S = u === true ? Vt({ x: l, y: p }) : { x: l, y: p };
    if (l = S.x, p = S.y, f) {
      var L;
      return Object.assign({}, D, (L = {}, L[d] = y ? "0" : "", L[$2] = x ? "0" : "", L.transform = (b.devicePixelRatio || 1) <= 1 ? "translate(" + l + "px, " + p + "px)" : "translate3d(" + l + "px, " + p + "px, 0)", L));
    }
    return Object.assign({}, D, (e = {}, e[d] = y ? p + "px" : "", e[$2] = x ? l + "px" : "", e.transform = "", e));
  }
  function Nt(t) {
    var e = t.state, n = t.options, r = n.gpuAcceleration, o = r === void 0 ? true : r, i2 = n.adaptive, a = i2 === void 0 ? true : i2, s = n.roundOffsets, f = s === void 0 ? true : s, c = { placement: q(e.placement), variation: te(e.placement), popper: e.elements.popper, popperRect: e.rects.popper, gpuAcceleration: o, isFixed: e.options.strategy === "fixed" };
    e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, ut(Object.assign({}, c, { offsets: e.modifiersData.popperOffsets, position: e.options.strategy, adaptive: a, roundOffsets: f })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, ut(Object.assign({}, c, { offsets: e.modifiersData.arrow, position: "absolute", adaptive: false, roundOffsets: f })))), e.attributes.popper = Object.assign({}, e.attributes.popper, { "data-popper-placement": e.placement });
  }
  var Me = { name: "computeStyles", enabled: true, phase: "beforeWrite", fn: Nt, data: {} }, ye = { passive: true };
  function It(t) {
    var e = t.state, n = t.instance, r = t.options, o = r.scroll, i2 = o === void 0 ? true : o, a = r.resize, s = a === void 0 ? true : a, f = H(e.elements.popper), c = [].concat(e.scrollParents.reference, e.scrollParents.popper);
    return i2 && c.forEach(function(u) {
      u.addEventListener("scroll", n.update, ye);
    }), s && f.addEventListener("resize", n.update, ye), function() {
      i2 && c.forEach(function(u) {
        u.removeEventListener("scroll", n.update, ye);
      }), s && f.removeEventListener("resize", n.update, ye);
    };
  }
  var Re = { name: "eventListeners", enabled: true, phase: "write", fn: function() {
  }, effect: It, data: {} }, _t = { left: "right", right: "left", bottom: "top", top: "bottom" };
  function be(t) {
    return t.replace(/left|right|bottom|top/g, function(e) {
      return _t[e];
    });
  }
  var zt = { start: "end", end: "start" };
  function lt(t) {
    return t.replace(/start|end/g, function(e) {
      return zt[e];
    });
  }
  function We(t) {
    var e = H(t), n = e.pageXOffset, r = e.pageYOffset;
    return { scrollLeft: n, scrollTop: r };
  }
  function Be(t) {
    return ee(I(t)).left + We(t).scrollLeft;
  }
  function Ft(t) {
    var e = H(t), n = I(t), r = e.visualViewport, o = n.clientWidth, i2 = n.clientHeight, a = 0, s = 0;
    return r && (o = r.width, i2 = r.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (a = r.offsetLeft, s = r.offsetTop)), { width: o, height: i2, x: a + Be(t), y: s };
  }
  function Ut(t) {
    var e, n = I(t), r = We(t), o = (e = t.ownerDocument) == null ? void 0 : e.body, i2 = X(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), a = X(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), s = -r.scrollLeft + Be(t), f = -r.scrollTop;
    return N(o || n).direction === "rtl" && (s += X(n.clientWidth, o ? o.clientWidth : 0) - i2), { width: i2, height: a, x: s, y: f };
  }
  function Se(t) {
    var e = N(t), n = e.overflow, r = e.overflowX, o = e.overflowY;
    return /auto|scroll|overlay|hidden/.test(n + o + r);
  }
  function dt(t) {
    return ["html", "body", "#document"].indexOf(C(t)) >= 0 ? t.ownerDocument.body : B(t) && Se(t) ? t : dt(ge(t));
  }
  function ce(t, e) {
    var n;
    e === void 0 && (e = []);
    var r = dt(t), o = r === ((n = t.ownerDocument) == null ? void 0 : n.body), i2 = H(r), a = o ? [i2].concat(i2.visualViewport || [], Se(r) ? r : []) : r, s = e.concat(a);
    return o ? s : s.concat(ce(ge(a)));
  }
  function Te(t) {
    return Object.assign({}, t, { left: t.x, top: t.y, right: t.x + t.width, bottom: t.y + t.height });
  }
  function Xt(t) {
    var e = ee(t);
    return e.top = e.top + t.clientTop, e.left = e.left + t.clientLeft, e.bottom = e.top + t.clientHeight, e.right = e.left + t.clientWidth, e.width = t.clientWidth, e.height = t.clientHeight, e.x = e.left, e.y = e.top, e;
  }
  function ht(t, e) {
    return e === je ? Te(Ft(t)) : Q(e) ? Xt(e) : Te(Ut(I(t)));
  }
  function Yt(t) {
    var e = ce(ge(t)), n = ["absolute", "fixed"].indexOf(N(t).position) >= 0, r = n && B(t) ? se(t) : t;
    return Q(r) ? e.filter(function(o) {
      return Q(o) && it(o, r) && C(o) !== "body";
    }) : [];
  }
  function Gt(t, e, n) {
    var r = e === "clippingParents" ? Yt(t) : [].concat(e), o = [].concat(r, [n]), i2 = o[0], a = o.reduce(function(s, f) {
      var c = ht(t, f);
      return s.top = X(c.top, s.top), s.right = ve(c.right, s.right), s.bottom = ve(c.bottom, s.bottom), s.left = X(c.left, s.left), s;
    }, ht(t, i2));
    return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
  }
  function mt(t) {
    var e = t.reference, n = t.element, r = t.placement, o = r ? q(r) : null, i2 = r ? te(r) : null, a = e.x + e.width / 2 - n.width / 2, s = e.y + e.height / 2 - n.height / 2, f;
    switch (o) {
      case E:
        f = { x: a, y: e.y - n.height };
        break;
      case R:
        f = { x: a, y: e.y + e.height };
        break;
      case W:
        f = { x: e.x + e.width, y: s };
        break;
      case P:
        f = { x: e.x - n.width, y: s };
        break;
      default:
        f = { x: e.x, y: e.y };
    }
    var c = o ? Le(o) : null;
    if (c != null) {
      var u = c === "y" ? "height" : "width";
      switch (i2) {
        case U:
          f[c] = f[c] - (e[u] / 2 - n[u] / 2);
          break;
        case J:
          f[c] = f[c] + (e[u] / 2 - n[u] / 2);
          break;
      }
    }
    return f;
  }
  function ne(t, e) {
    e === void 0 && (e = {});
    var n = e, r = n.placement, o = r === void 0 ? t.placement : r, i2 = n.boundary, a = i2 === void 0 ? Xe : i2, s = n.rootBoundary, f = s === void 0 ? je : s, c = n.elementContext, u = c === void 0 ? K : c, m = n.altBoundary, v = m === void 0 ? false : m, l = n.padding, h = l === void 0 ? 0 : l, p = ft(typeof h != "number" ? h : ct(h, G)), g = u === K ? Ye : K, x = t.rects.popper, y = t.elements[v ? g : u], $2 = Gt(Q(y) ? y : y.contextElement || I(t.elements.popper), a, f), d = ee(t.elements.reference), b = mt({ reference: d, element: x, strategy: "absolute", placement: o }), w = Te(Object.assign({}, x, b)), O = u === K ? w : d, j = { top: $2.top - O.top + p.top, bottom: O.bottom - $2.bottom + p.bottom, left: $2.left - O.left + p.left, right: O.right - $2.right + p.right }, A = t.modifiersData.offset;
    if (u === K && A) {
      var k = A[o];
      Object.keys(j).forEach(function(D) {
        var S = [W, R].indexOf(D) >= 0 ? 1 : -1, L = [E, R].indexOf(D) >= 0 ? "y" : "x";
        j[D] += k[L] * S;
      });
    }
    return j;
  }
  function Jt(t, e) {
    e === void 0 && (e = {});
    var n = e, r = n.placement, o = n.boundary, i2 = n.rootBoundary, a = n.padding, s = n.flipVariations, f = n.allowedAutoPlacements, c = f === void 0 ? Ee : f, u = te(r), m = u ? s ? De : De.filter(function(h) {
      return te(h) === u;
    }) : G, v = m.filter(function(h) {
      return c.indexOf(h) >= 0;
    });
    v.length === 0 && (v = m);
    var l = v.reduce(function(h, p) {
      return h[p] = ne(t, { placement: p, boundary: o, rootBoundary: i2, padding: a })[q(p)], h;
    }, {});
    return Object.keys(l).sort(function(h, p) {
      return l[h] - l[p];
    });
  }
  function Kt(t) {
    if (q(t) === me)
      return [];
    var e = be(t);
    return [lt(t), e, lt(e)];
  }
  function Qt(t) {
    var e = t.state, n = t.options, r = t.name;
    if (!e.modifiersData[r]._skip) {
      for (var o = n.mainAxis, i2 = o === void 0 ? true : o, a = n.altAxis, s = a === void 0 ? true : a, f = n.fallbackPlacements, c = n.padding, u = n.boundary, m = n.rootBoundary, v = n.altBoundary, l = n.flipVariations, h = l === void 0 ? true : l, p = n.allowedAutoPlacements, g = e.options.placement, x = q(g), y = x === g, $2 = f || (y || !h ? [be(g)] : Kt(g)), d = [g].concat($2).reduce(function(z, V) {
        return z.concat(q(V) === me ? Jt(e, { placement: V, boundary: u, rootBoundary: m, padding: c, flipVariations: h, allowedAutoPlacements: p }) : V);
      }, []), b = e.rects.reference, w = e.rects.popper, O = /* @__PURE__ */ new Map(), j = true, A = d[0], k = 0; k < d.length; k++) {
        var D = d[k], S = q(D), L = te(D) === U, re = [E, R].indexOf(S) >= 0, oe = re ? "width" : "height", M = ne(e, { placement: D, boundary: u, rootBoundary: m, altBoundary: v, padding: c }), T = re ? L ? W : P : L ? R : E;
        b[oe] > w[oe] && (T = be(T));
        var pe = be(T), _ = [];
        if (i2 && _.push(M[S] <= 0), s && _.push(M[T] <= 0, M[pe] <= 0), _.every(function(z) {
          return z;
        })) {
          A = D, j = false;
          break;
        }
        O.set(D, _);
      }
      if (j)
        for (var ue = h ? 3 : 1, xe = function(z) {
          var V = d.find(function(de) {
            var ae = O.get(de);
            if (ae)
              return ae.slice(0, z).every(function(Y) {
                return Y;
              });
          });
          if (V)
            return A = V, "break";
        }, ie = ue; ie > 0; ie--) {
          var le = xe(ie);
          if (le === "break")
            break;
        }
      e.placement !== A && (e.modifiersData[r]._skip = true, e.placement = A, e.reset = true);
    }
  }
  var vt = { name: "flip", enabled: true, phase: "main", fn: Qt, requiresIfExists: ["offset"], data: { _skip: false } };
  function gt(t, e, n) {
    return n === void 0 && (n = { x: 0, y: 0 }), { top: t.top - e.height - n.y, right: t.right - e.width + n.x, bottom: t.bottom - e.height + n.y, left: t.left - e.width - n.x };
  }
  function yt(t) {
    return [E, W, R, P].some(function(e) {
      return t[e] >= 0;
    });
  }
  function Zt(t) {
    var e = t.state, n = t.name, r = e.rects.reference, o = e.rects.popper, i2 = e.modifiersData.preventOverflow, a = ne(e, { elementContext: "reference" }), s = ne(e, { altBoundary: true }), f = gt(a, r), c = gt(s, o, i2), u = yt(f), m = yt(c);
    e.modifiersData[n] = { referenceClippingOffsets: f, popperEscapeOffsets: c, isReferenceHidden: u, hasPopperEscaped: m }, e.attributes.popper = Object.assign({}, e.attributes.popper, { "data-popper-reference-hidden": u, "data-popper-escaped": m });
  }
  var bt = { name: "hide", enabled: true, phase: "main", requiresIfExists: ["preventOverflow"], fn: Zt };
  function en(t, e, n) {
    var r = q(t), o = [P, E].indexOf(r) >= 0 ? -1 : 1, i2 = typeof n == "function" ? n(Object.assign({}, e, { placement: t })) : n, a = i2[0], s = i2[1];
    return a = a || 0, s = (s || 0) * o, [P, W].indexOf(r) >= 0 ? { x: s, y: a } : { x: a, y: s };
  }
  function tn(t) {
    var e = t.state, n = t.options, r = t.name, o = n.offset, i2 = o === void 0 ? [0, 0] : o, a = Ee.reduce(function(u, m) {
      return u[m] = en(m, e.rects, i2), u;
    }, {}), s = a[e.placement], f = s.x, c = s.y;
    e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += f, e.modifiersData.popperOffsets.y += c), e.modifiersData[r] = a;
  }
  var wt = { name: "offset", enabled: true, phase: "main", requires: ["popperOffsets"], fn: tn };
  function nn(t) {
    var e = t.state, n = t.name;
    e.modifiersData[n] = mt({ reference: e.rects.reference, element: e.rects.popper, strategy: "absolute", placement: e.placement });
  }
  var He = { name: "popperOffsets", enabled: true, phase: "read", fn: nn, data: {} };
  function rn(t) {
    return t === "x" ? "y" : "x";
  }
  function on(t) {
    var e = t.state, n = t.options, r = t.name, o = n.mainAxis, i2 = o === void 0 ? true : o, a = n.altAxis, s = a === void 0 ? false : a, f = n.boundary, c = n.rootBoundary, u = n.altBoundary, m = n.padding, v = n.tether, l = v === void 0 ? true : v, h = n.tetherOffset, p = h === void 0 ? 0 : h, g = ne(e, { boundary: f, rootBoundary: c, padding: m, altBoundary: u }), x = q(e.placement), y = te(e.placement), $2 = !y, d = Le(x), b = rn(d), w = e.modifiersData.popperOffsets, O = e.rects.reference, j = e.rects.popper, A = typeof p == "function" ? p(Object.assign({}, e.rects, { placement: e.placement })) : p, k = typeof A == "number" ? { mainAxis: A, altAxis: A } : Object.assign({ mainAxis: 0, altAxis: 0 }, A), D = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, S = { x: 0, y: 0 };
    if (w) {
      if (i2) {
        var L, re = d === "y" ? E : P, oe = d === "y" ? R : W, M = d === "y" ? "height" : "width", T = w[d], pe = T + g[re], _ = T - g[oe], ue = l ? -j[M] / 2 : 0, xe = y === U ? O[M] : j[M], ie = y === U ? -j[M] : -O[M], le = e.elements.arrow, z = l && le ? ke(le) : { width: 0, height: 0 }, V = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : st(), de = V[re], ae = V[oe], Y = fe(0, O[M], z[M]), jt = $2 ? O[M] / 2 - ue - Y - de - k.mainAxis : xe - Y - de - k.mainAxis, Dt = $2 ? -O[M] / 2 + ue + Y + ae + k.mainAxis : ie + Y + ae + k.mainAxis, Oe = e.elements.arrow && se(e.elements.arrow), Et = Oe ? d === "y" ? Oe.clientTop || 0 : Oe.clientLeft || 0 : 0, Ce = (L = D == null ? void 0 : D[d]) != null ? L : 0, Pt = T + jt - Ce - Et, At = T + Dt - Ce, qe = fe(l ? ve(pe, Pt) : pe, T, l ? X(_, At) : _);
        w[d] = qe, S[d] = qe - T;
      }
      if (s) {
        var Ve, kt = d === "x" ? E : P, Lt = d === "x" ? R : W, F = w[b], he = b === "y" ? "height" : "width", Ne = F + g[kt], Ie = F - g[Lt], $e = [E, P].indexOf(x) !== -1, _e = (Ve = D == null ? void 0 : D[b]) != null ? Ve : 0, ze = $e ? Ne : F - O[he] - j[he] - _e + k.altAxis, Fe = $e ? F + O[he] + j[he] - _e - k.altAxis : Ie, Ue = l && $e ? St(ze, F, Fe) : fe(l ? ze : Ne, F, l ? Fe : Ie);
        w[b] = Ue, S[b] = Ue - F;
      }
      e.modifiersData[r] = S;
    }
  }
  var xt = { name: "preventOverflow", enabled: true, phase: "main", fn: on, requiresIfExists: ["offset"] };
  function an(t) {
    return { scrollLeft: t.scrollLeft, scrollTop: t.scrollTop };
  }
  function sn(t) {
    return t === H(t) || !B(t) ? We(t) : an(t);
  }
  function fn(t) {
    var e = t.getBoundingClientRect(), n = Z(e.width) / t.offsetWidth || 1, r = Z(e.height) / t.offsetHeight || 1;
    return n !== 1 || r !== 1;
  }
  function cn(t, e, n) {
    n === void 0 && (n = false);
    var r = B(e), o = B(e) && fn(e), i2 = I(e), a = ee(t, o), s = { scrollLeft: 0, scrollTop: 0 }, f = { x: 0, y: 0 };
    return (r || !r && !n) && ((C(e) !== "body" || Se(i2)) && (s = sn(e)), B(e) ? (f = ee(e, true), f.x += e.clientLeft, f.y += e.clientTop) : i2 && (f.x = Be(i2))), { x: a.left + s.scrollLeft - f.x, y: a.top + s.scrollTop - f.y, width: a.width, height: a.height };
  }
  function pn(t) {
    var e = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
    t.forEach(function(i2) {
      e.set(i2.name, i2);
    });
    function o(i2) {
      n.add(i2.name);
      var a = [].concat(i2.requires || [], i2.requiresIfExists || []);
      a.forEach(function(s) {
        if (!n.has(s)) {
          var f = e.get(s);
          f && o(f);
        }
      }), r.push(i2);
    }
    return t.forEach(function(i2) {
      n.has(i2.name) || o(i2);
    }), r;
  }
  function un(t) {
    var e = pn(t);
    return ot.reduce(function(n, r) {
      return n.concat(e.filter(function(o) {
        return o.phase === r;
      }));
    }, []);
  }
  function ln(t) {
    var e;
    return function() {
      return e || (e = new Promise(function(n) {
        Promise.resolve().then(function() {
          e = void 0, n(t());
        });
      })), e;
    };
  }
  function dn(t) {
    var e = t.reduce(function(n, r) {
      var o = n[r.name];
      return n[r.name] = o ? Object.assign({}, o, r, { options: Object.assign({}, o.options, r.options), data: Object.assign({}, o.data, r.data) }) : r, n;
    }, {});
    return Object.keys(e).map(function(n) {
      return e[n];
    });
  }
  var Ot = { placement: "bottom", modifiers: [], strategy: "absolute" };
  function $t() {
    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
      e[n] = arguments[n];
    return !e.some(function(r) {
      return !(r && typeof r.getBoundingClientRect == "function");
    });
  }
  function we(t) {
    t === void 0 && (t = {});
    var e = t, n = e.defaultModifiers, r = n === void 0 ? [] : n, o = e.defaultOptions, i2 = o === void 0 ? Ot : o;
    return function(a, s, f) {
      f === void 0 && (f = i2);
      var c = { placement: "bottom", orderedModifiers: [], options: Object.assign({}, Ot, i2), modifiersData: {}, elements: { reference: a, popper: s }, attributes: {}, styles: {} }, u = [], m = false, v = { state: c, setOptions: function(p) {
        var g = typeof p == "function" ? p(c.options) : p;
        h(), c.options = Object.assign({}, i2, c.options, g), c.scrollParents = { reference: Q(a) ? ce(a) : a.contextElement ? ce(a.contextElement) : [], popper: ce(s) };
        var x = un(dn([].concat(r, c.options.modifiers)));
        return c.orderedModifiers = x.filter(function(y) {
          return y.enabled;
        }), l(), v.update();
      }, forceUpdate: function() {
        if (!m) {
          var p = c.elements, g = p.reference, x = p.popper;
          if ($t(g, x)) {
            c.rects = { reference: cn(g, se(x), c.options.strategy === "fixed"), popper: ke(x) }, c.reset = false, c.placement = c.options.placement, c.orderedModifiers.forEach(function(j) {
              return c.modifiersData[j.name] = Object.assign({}, j.data);
            });
            for (var y = 0; y < c.orderedModifiers.length; y++) {
              if (c.reset === true) {
                c.reset = false, y = -1;
                continue;
              }
              var $2 = c.orderedModifiers[y], d = $2.fn, b = $2.options, w = b === void 0 ? {} : b, O = $2.name;
              typeof d == "function" && (c = d({ state: c, options: w, name: O, instance: v }) || c);
            }
          }
        }
      }, update: ln(function() {
        return new Promise(function(p) {
          v.forceUpdate(), p(c);
        });
      }), destroy: function() {
        h(), m = true;
      } };
      if (!$t(a, s))
        return v;
      v.setOptions(f).then(function(p) {
        !m && f.onFirstUpdate && f.onFirstUpdate(p);
      });
      function l() {
        c.orderedModifiers.forEach(function(p) {
          var g = p.name, x = p.options, y = x === void 0 ? {} : x, $2 = p.effect;
          if (typeof $2 == "function") {
            var d = $2({ state: c, name: g, instance: v, options: y }), b = function() {
            };
            u.push(d || b);
          }
        });
      }
      function h() {
        u.forEach(function(p) {
          return p();
        }), u = [];
      }
      return v;
    };
  }
  we();
  var mn = [Re, He, Me, Ae];
  we({ defaultModifiers: mn });
  var gn = [Re, He, Me, Ae, wt, vt, xt, pt, bt], yn = we({ defaultModifiers: gn });
  const obtainAllFocusableElements = (element) => {
    const nodes = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (node) => {
        const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
        if (node.disabled || node.hidden || isHiddenInput)
          return NodeFilter.FILTER_SKIP;
        return node.tabIndex >= 0 || node === document.activeElement ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });
    while (walker.nextNode())
      nodes.push(walker.currentNode);
    return nodes;
  };
  const getVisibleElement = (elements, container) => {
    for (const element of elements) {
      if (!isHidden(element, container))
        return element;
    }
  };
  const isHidden = (element, container) => {
    if (getComputedStyle(element).visibility === "hidden")
      return true;
    while (element) {
      if (container && element === container)
        return false;
      if (getComputedStyle(element).display === "none")
        return true;
      element = element.parentElement;
    }
    return false;
  };
  const getEdges = (container) => {
    const focusable = obtainAllFocusableElements(container);
    const first = getVisibleElement(focusable, container);
    const last2 = getVisibleElement(focusable.reverse(), container);
    return [first, last2];
  };
  const isSelectable = (element) => {
    return element instanceof HTMLInputElement && "select" in element;
  };
  const tryFocus = (element, shouldSelect) => {
    if (element && element.focus) {
      const prevFocusedElement = document.activeElement;
      element.focus({ preventScroll: true });
      if (element !== prevFocusedElement && isSelectable(element) && shouldSelect) {
        element.select();
      }
    }
  };
  function removeFromStack(list, item) {
    const copy = [...list];
    const idx = list.indexOf(item);
    if (idx !== -1) {
      copy.splice(idx, 1);
    }
    return copy;
  }
  const createFocusableStack = () => {
    let stack = [];
    const push = (layer) => {
      const currentLayer = stack[0];
      if (currentLayer && layer !== currentLayer) {
        currentLayer.pause();
      }
      stack = removeFromStack(stack, layer);
      stack.unshift(layer);
    };
    const remove = (layer) => {
      var _a3, _b2;
      stack = removeFromStack(stack, layer);
      (_b2 = (_a3 = stack[0]) == null ? void 0 : _a3.resume) == null ? void 0 : _b2.call(_a3);
    };
    return {
      push,
      remove
    };
  };
  const focusFirstDescendant = (elements, shouldSelect = false) => {
    const prevFocusedElement = document.activeElement;
    for (const element of elements) {
      tryFocus(element, shouldSelect);
      if (document.activeElement !== prevFocusedElement)
        return;
    }
  };
  const focusableStack = createFocusableStack();
  const FOCUS_AFTER_TRAPPED = "focus-trap.focus-after-trapped";
  const FOCUS_AFTER_RELEASED = "focus-trap.focus-after-released";
  const FOCUS_AFTER_TRAPPED_OPTS = {
    cancelable: true,
    bubbles: false
  };
  const ON_TRAP_FOCUS_EVT = "focusAfterTrapped";
  const ON_RELEASE_FOCUS_EVT = "focusAfterReleased";
  const FOCUS_TRAP_INJECTION_KEY = Symbol("elFocusTrap");
  const _sfc_main$m = vue.defineComponent({
    name: "ElFocusTrap",
    inheritAttrs: false,
    props: {
      loop: Boolean,
      trapped: Boolean,
      focusTrapEl: Object,
      focusStartEl: {
        type: [Object, String],
        default: "first"
      }
    },
    emits: [
      ON_TRAP_FOCUS_EVT,
      ON_RELEASE_FOCUS_EVT,
      "focusin",
      "focusout",
      "focusout-prevented",
      "release-requested"
    ],
    setup(props, { emit }) {
      const forwardRef = vue.ref();
      let lastFocusBeforeTrapped;
      let lastFocusAfterTrapped;
      useEscapeKeydown((event) => {
        if (props.trapped && !focusLayer.paused) {
          emit("release-requested", event);
        }
      });
      const focusLayer = {
        paused: false,
        pause() {
          this.paused = true;
        },
        resume() {
          this.paused = false;
        }
      };
      const onKeydown = (e) => {
        if (!props.loop && !props.trapped)
          return;
        if (focusLayer.paused)
          return;
        const { key, altKey, ctrlKey, metaKey, currentTarget, shiftKey } = e;
        const { loop } = props;
        const isTabbing = key === EVENT_CODE.tab && !altKey && !ctrlKey && !metaKey;
        const currentFocusingEl = document.activeElement;
        if (isTabbing && currentFocusingEl) {
          const container = currentTarget;
          const [first, last2] = getEdges(container);
          const isTabbable = first && last2;
          if (!isTabbable) {
            if (currentFocusingEl === container) {
              e.preventDefault();
              emit("focusout-prevented");
            }
          } else {
            if (!shiftKey && currentFocusingEl === last2) {
              e.preventDefault();
              if (loop)
                tryFocus(first, true);
              emit("focusout-prevented");
            } else if (shiftKey && [first, container].includes(currentFocusingEl)) {
              e.preventDefault();
              if (loop)
                tryFocus(last2, true);
              emit("focusout-prevented");
            }
          }
        }
      };
      vue.provide(FOCUS_TRAP_INJECTION_KEY, {
        focusTrapRef: forwardRef,
        onKeydown
      });
      vue.watch(() => props.focusTrapEl, (focusTrapEl) => {
        if (focusTrapEl) {
          forwardRef.value = focusTrapEl;
        }
      }, { immediate: true });
      vue.watch([forwardRef], ([forwardRef2], [oldForwardRef]) => {
        if (forwardRef2) {
          forwardRef2.addEventListener("keydown", onKeydown);
          forwardRef2.addEventListener("focusin", onFocusIn);
          forwardRef2.addEventListener("focusout", onFocusOut);
        }
        if (oldForwardRef) {
          oldForwardRef.removeEventListener("keydown", onKeydown);
          oldForwardRef.removeEventListener("focusin", onFocusIn);
          oldForwardRef.removeEventListener("focusout", onFocusOut);
        }
      });
      const trapOnFocus = (e) => {
        emit(ON_TRAP_FOCUS_EVT, e);
      };
      const releaseOnFocus = (e) => emit(ON_RELEASE_FOCUS_EVT, e);
      const onFocusIn = (e) => {
        const trapContainer = vue.unref(forwardRef);
        if (!trapContainer)
          return;
        const target = e.target;
        const isFocusedInTrap = target && trapContainer.contains(target);
        if (isFocusedInTrap)
          emit("focusin", e);
        if (focusLayer.paused)
          return;
        if (props.trapped) {
          if (isFocusedInTrap) {
            lastFocusAfterTrapped = target;
          } else {
            tryFocus(lastFocusAfterTrapped, true);
          }
        }
      };
      const onFocusOut = (e) => {
        const trapContainer = vue.unref(forwardRef);
        if (focusLayer.paused || !trapContainer)
          return;
        if (props.trapped) {
          const relatedTarget = e.relatedTarget;
          if (!isNil(relatedTarget) && !trapContainer.contains(relatedTarget)) {
            setTimeout(() => {
              if (!focusLayer.paused && props.trapped) {
                tryFocus(lastFocusAfterTrapped, true);
              }
            }, 0);
          }
        } else {
          const target = e.target;
          const isFocusedInTrap = target && trapContainer.contains(target);
          if (!isFocusedInTrap)
            emit("focusout", e);
        }
      };
      async function startTrap() {
        await vue.nextTick();
        const trapContainer = vue.unref(forwardRef);
        if (trapContainer) {
          focusableStack.push(focusLayer);
          const prevFocusedElement = document.activeElement;
          lastFocusBeforeTrapped = prevFocusedElement;
          const isPrevFocusContained = trapContainer.contains(prevFocusedElement);
          if (!isPrevFocusContained) {
            const focusEvent = new Event(FOCUS_AFTER_TRAPPED, FOCUS_AFTER_TRAPPED_OPTS);
            trapContainer.addEventListener(FOCUS_AFTER_TRAPPED, trapOnFocus);
            trapContainer.dispatchEvent(focusEvent);
            if (!focusEvent.defaultPrevented) {
              vue.nextTick(() => {
                let focusStartEl = props.focusStartEl;
                if (!isString(focusStartEl)) {
                  tryFocus(focusStartEl);
                  if (document.activeElement !== focusStartEl) {
                    focusStartEl = "first";
                  }
                }
                if (focusStartEl === "first") {
                  focusFirstDescendant(obtainAllFocusableElements(trapContainer), true);
                }
                if (document.activeElement === prevFocusedElement || focusStartEl === "container") {
                  tryFocus(trapContainer);
                }
              });
            }
          }
        }
      }
      function stopTrap() {
        const trapContainer = vue.unref(forwardRef);
        if (trapContainer) {
          trapContainer.removeEventListener(FOCUS_AFTER_TRAPPED, trapOnFocus);
          const releasedEvent = new Event(FOCUS_AFTER_RELEASED, FOCUS_AFTER_TRAPPED_OPTS);
          trapContainer.addEventListener(FOCUS_AFTER_RELEASED, releaseOnFocus);
          trapContainer.dispatchEvent(releasedEvent);
          if (!releasedEvent.defaultPrevented) {
            tryFocus(lastFocusBeforeTrapped != null ? lastFocusBeforeTrapped : document.body, true);
          }
          trapContainer.removeEventListener(FOCUS_AFTER_RELEASED, trapOnFocus);
          focusableStack.remove(focusLayer);
        }
      }
      vue.onMounted(() => {
        if (props.trapped) {
          startTrap();
        }
        vue.watch(() => props.trapped, (trapped) => {
          if (trapped) {
            startTrap();
          } else {
            stopTrap();
          }
        });
      });
      vue.onBeforeUnmount(() => {
        if (props.trapped) {
          stopTrap();
        }
      });
      return {
        onKeydown
      };
    }
  });
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.renderSlot(_ctx.$slots, "default", { handleKeydown: _ctx.onKeydown });
  }
  var ElFocusTrap = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$3], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/focus-trap/src/focus-trap.vue"]]);
  const POSITIONING_STRATEGIES = ["fixed", "absolute"];
  const usePopperCoreConfigProps = buildProps({
    boundariesPadding: {
      type: Number,
      default: 0
    },
    fallbackPlacements: {
      type: definePropType(Array),
      default: () => []
    },
    gpuAcceleration: {
      type: Boolean,
      default: true
    },
    offset: {
      type: Number,
      default: 12
    },
    placement: {
      type: String,
      values: Ee,
      default: "bottom"
    },
    popperOptions: {
      type: definePropType(Object),
      default: () => ({})
    },
    strategy: {
      type: String,
      values: POSITIONING_STRATEGIES,
      default: "absolute"
    }
  });
  const usePopperContentProps = buildProps({
    ...usePopperCoreConfigProps,
    id: String,
    style: { type: definePropType([String, Array, Object]) },
    className: { type: definePropType([String, Array, Object]) },
    effect: {
      type: String,
      default: "dark"
    },
    visible: Boolean,
    enterable: {
      type: Boolean,
      default: true
    },
    pure: Boolean,
    focusOnShow: {
      type: Boolean,
      default: false
    },
    trapping: {
      type: Boolean,
      default: false
    },
    popperClass: {
      type: definePropType([String, Array, Object])
    },
    popperStyle: {
      type: definePropType([String, Array, Object])
    },
    referenceEl: {
      type: definePropType(Object)
    },
    triggerTargetEl: {
      type: definePropType(Object)
    },
    stopPopperMouseEvent: {
      type: Boolean,
      default: true
    },
    ariaLabel: {
      type: String,
      default: void 0
    },
    virtualTriggering: Boolean,
    zIndex: Number
  });
  const usePopperContentEmits = [
    "mouseenter",
    "mouseleave",
    "focus",
    "blur",
    "close"
  ];
  const buildPopperOptions = (props, arrowProps) => {
    const { placement, strategy, popperOptions } = props;
    const options = {
      placement,
      strategy,
      ...popperOptions,
      modifiers: genModifiers(props)
    };
    attachArrow(options, arrowProps);
    deriveExtraModifiers(options, popperOptions == null ? void 0 : popperOptions.modifiers);
    return options;
  };
  const unwrapMeasurableEl = ($el) => {
    if (!isClient)
      return;
    return unrefElement($el);
  };
  function genModifiers(options) {
    const { offset, gpuAcceleration, fallbackPlacements } = options;
    return [
      {
        name: "offset",
        options: {
          offset: [0, offset != null ? offset : 12]
        }
      },
      {
        name: "preventOverflow",
        options: {
          padding: {
            top: 2,
            bottom: 2,
            left: 5,
            right: 5
          }
        }
      },
      {
        name: "flip",
        options: {
          padding: 5,
          fallbackPlacements: fallbackPlacements != null ? fallbackPlacements : []
        }
      },
      {
        name: "computeStyles",
        options: {
          gpuAcceleration,
          adaptive: gpuAcceleration
        }
      }
    ];
  }
  function attachArrow(options, { arrowEl, arrowOffset }) {
    options.modifiers.push({
      name: "arrow",
      options: {
        element: arrowEl,
        padding: arrowOffset != null ? arrowOffset : 5
      }
    });
  }
  function deriveExtraModifiers(options, modifiers) {
    if (modifiers) {
      options.modifiers = [...options.modifiers, ...modifiers != null ? modifiers : []];
    }
  }
  const __default__$h = {
    name: "ElPopperContent"
  };
  const _sfc_main$l = /* @__PURE__ */ vue.defineComponent({
    ...__default__$h,
    props: usePopperContentProps,
    emits: usePopperContentEmits,
    setup(__props, { expose, emit }) {
      const props = __props;
      const { popperInstanceRef, contentRef, triggerRef, role } = vue.inject(POPPER_INJECTION_KEY, void 0);
      const formItemContext = vue.inject(formItemContextKey, void 0);
      const { nextZIndex } = useZIndex();
      const ns2 = useNamespace("popper");
      const popperContentRef = vue.ref();
      const focusStartRef = vue.ref("first");
      const arrowRef = vue.ref();
      const arrowOffset = vue.ref();
      vue.provide(POPPER_CONTENT_INJECTION_KEY, {
        arrowRef,
        arrowOffset
      });
      if (formItemContext && (formItemContext.addInputId || formItemContext.removeInputId)) {
        vue.provide(formItemContextKey, {
          ...formItemContext,
          addInputId: NOOP,
          removeInputId: NOOP
        });
      }
      const contentZIndex = vue.ref(props.zIndex || nextZIndex());
      const trapped = vue.ref(false);
      let triggerTargetAriaStopWatch = void 0;
      const computedReference = vue.computed(() => unwrapMeasurableEl(props.referenceEl) || vue.unref(triggerRef));
      const contentStyle = vue.computed(() => [{ zIndex: vue.unref(contentZIndex) }, props.popperStyle]);
      const contentClass = vue.computed(() => [
        ns2.b(),
        ns2.is("pure", props.pure),
        ns2.is(props.effect),
        props.popperClass
      ]);
      const ariaModal = vue.computed(() => {
        return role && role.value === "dialog" ? "false" : void 0;
      });
      const createPopperInstance = ({ referenceEl, popperContentEl, arrowEl }) => {
        const options = buildPopperOptions(props, {
          arrowEl,
          arrowOffset: vue.unref(arrowOffset)
        });
        return yn(referenceEl, popperContentEl, options);
      };
      const updatePopper = (shouldUpdateZIndex = true) => {
        var _a3;
        (_a3 = vue.unref(popperInstanceRef)) == null ? void 0 : _a3.update();
        shouldUpdateZIndex && (contentZIndex.value = props.zIndex || nextZIndex());
      };
      const togglePopperAlive = () => {
        var _a3, _b2;
        const monitorable = { name: "eventListeners", enabled: props.visible };
        (_b2 = (_a3 = vue.unref(popperInstanceRef)) == null ? void 0 : _a3.setOptions) == null ? void 0 : _b2.call(_a3, (options) => ({
          ...options,
          modifiers: [...options.modifiers || [], monitorable]
        }));
        updatePopper(false);
        if (props.visible && props.focusOnShow) {
          trapped.value = true;
        } else if (props.visible === false) {
          trapped.value = false;
        }
      };
      const onFocusAfterTrapped = () => {
        emit("focus");
      };
      const onFocusAfterReleased = () => {
        focusStartRef.value = "first";
        emit("blur");
      };
      const onFocusInTrap = (event) => {
        var _a3;
        if (props.visible && !trapped.value) {
          if (event.target) {
            focusStartRef.value = event.target;
          }
          trapped.value = true;
          if (event.relatedTarget) {
            (_a3 = event.relatedTarget) == null ? void 0 : _a3.focus();
          }
        }
      };
      const onFocusoutPrevented = () => {
        if (!props.trapping) {
          trapped.value = false;
        }
      };
      const onReleaseRequested = () => {
        trapped.value = false;
        emit("close");
      };
      vue.onMounted(() => {
        let updateHandle;
        vue.watch(computedReference, (referenceEl) => {
          var _a3;
          updateHandle == null ? void 0 : updateHandle();
          const popperInstance = vue.unref(popperInstanceRef);
          (_a3 = popperInstance == null ? void 0 : popperInstance.destroy) == null ? void 0 : _a3.call(popperInstance);
          if (referenceEl) {
            const popperContentEl = vue.unref(popperContentRef);
            contentRef.value = popperContentEl;
            popperInstanceRef.value = createPopperInstance({
              referenceEl,
              popperContentEl,
              arrowEl: vue.unref(arrowRef)
            });
            updateHandle = vue.watch(() => referenceEl.getBoundingClientRect(), () => updatePopper(), {
              immediate: true
            });
          } else {
            popperInstanceRef.value = void 0;
          }
        }, {
          immediate: true
        });
        vue.watch(() => props.triggerTargetEl, (triggerTargetEl, prevTriggerTargetEl) => {
          triggerTargetAriaStopWatch == null ? void 0 : triggerTargetAriaStopWatch();
          triggerTargetAriaStopWatch = void 0;
          const el = vue.unref(triggerTargetEl || popperContentRef.value);
          const prevEl = vue.unref(prevTriggerTargetEl || popperContentRef.value);
          if (isElement(el)) {
            const { ariaLabel, id } = vue.toRefs(props);
            triggerTargetAriaStopWatch = vue.watch([role, ariaLabel, ariaModal, id], (watches) => {
              ["role", "aria-label", "aria-modal", "id"].forEach((key, idx) => {
                isNil(watches[idx]) ? el.removeAttribute(key) : el.setAttribute(key, watches[idx]);
              });
            }, { immediate: true });
          }
          if (isElement(prevEl)) {
            ["role", "aria-label", "aria-modal", "id"].forEach((key) => {
              prevEl.removeAttribute(key);
            });
          }
        }, { immediate: true });
        vue.watch(() => props.visible, togglePopperAlive, { immediate: true });
        vue.watch(() => buildPopperOptions(props, {
          arrowEl: vue.unref(arrowRef),
          arrowOffset: vue.unref(arrowOffset)
        }), (option) => {
          var _a3;
          return (_a3 = popperInstanceRef.value) == null ? void 0 : _a3.setOptions(option);
        });
      });
      vue.onBeforeUnmount(() => {
        triggerTargetAriaStopWatch == null ? void 0 : triggerTargetAriaStopWatch();
        triggerTargetAriaStopWatch = void 0;
      });
      expose({
        popperContentRef,
        popperInstanceRef,
        updatePopper,
        contentStyle
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          ref_key: "popperContentRef",
          ref: popperContentRef,
          style: vue.normalizeStyle(vue.unref(contentStyle)),
          class: vue.normalizeClass(vue.unref(contentClass)),
          tabindex: "-1",
          onMouseenter: _cache[0] || (_cache[0] = (e) => _ctx.$emit("mouseenter", e)),
          onMouseleave: _cache[1] || (_cache[1] = (e) => _ctx.$emit("mouseleave", e))
        }, [
          vue.createVNode(vue.unref(ElFocusTrap), {
            trapped: trapped.value,
            "trap-on-focus-in": true,
            "focus-trap-el": popperContentRef.value,
            "focus-start-el": focusStartRef.value,
            onFocusAfterTrapped,
            onFocusAfterReleased,
            onFocusin: onFocusInTrap,
            onFocusoutPrevented,
            onReleaseRequested
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["trapped", "focus-trap-el", "focus-start-el"])
        ], 38);
      };
    }
  });
  var ElPopperContent = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/content.vue"]]);
  const ElPopper = withInstall(Popper);
  const ns = useNamespace("tooltip");
  const useTooltipContentProps = buildProps({
    ...useDelayedToggleProps,
    ...usePopperContentProps,
    appendTo: {
      type: definePropType([String, Object]),
      default: POPPER_CONTAINER_SELECTOR
    },
    content: {
      type: String,
      default: ""
    },
    rawContent: {
      type: Boolean,
      default: false
    },
    persistent: Boolean,
    ariaLabel: String,
    visible: {
      type: definePropType(Boolean),
      default: null
    },
    transition: {
      type: String,
      default: `${ns.namespace.value}-fade-in-linear`
    },
    teleported: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean
    }
  });
  const useTooltipTriggerProps = buildProps({
    ...usePopperTriggerProps,
    disabled: Boolean,
    trigger: {
      type: definePropType([String, Array]),
      default: "hover"
    },
    triggerKeys: {
      type: definePropType(Array),
      default: () => [EVENT_CODE.enter, EVENT_CODE.space]
    }
  });
  const useTooltipProps = buildProps({
    openDelay: {
      type: Number
    },
    visibleArrow: {
      type: Boolean,
      default: void 0
    },
    hideAfter: {
      type: Number,
      default: 200
    },
    showArrow: {
      type: Boolean,
      default: true
    }
  });
  const TOOLTIP_INJECTION_KEY = Symbol("elTooltip");
  const _sfc_main$k = vue.defineComponent({
    name: "ElTooltipContent",
    components: {
      ElPopperContent
    },
    inheritAttrs: false,
    props: useTooltipContentProps,
    setup(props) {
      const contentRef = vue.ref(null);
      const intermediateOpen = vue.ref(false);
      const entering = vue.ref(false);
      const leaving = vue.ref(false);
      const destroyed = vue.ref(false);
      const {
        controlled,
        id,
        open,
        trigger,
        onClose,
        onOpen,
        onShow,
        onHide,
        onBeforeShow,
        onBeforeHide
      } = vue.inject(TOOLTIP_INJECTION_KEY, void 0);
      const persistentRef = vue.computed(() => {
        return props.persistent;
      });
      vue.onBeforeUnmount(() => {
        destroyed.value = true;
      });
      const shouldRender = vue.computed(() => {
        return vue.unref(persistentRef) ? true : vue.unref(open);
      });
      const shouldShow = vue.computed(() => {
        return props.disabled ? false : vue.unref(open);
      });
      const contentStyle = vue.computed(() => {
        var _a3;
        return (_a3 = props.style) != null ? _a3 : {};
      });
      const ariaHidden = vue.computed(() => !vue.unref(open));
      const onTransitionLeave = () => {
        onHide();
      };
      const stopWhenControlled = () => {
        if (vue.unref(controlled))
          return true;
      };
      const onContentEnter = composeEventHandlers(stopWhenControlled, () => {
        if (props.enterable && vue.unref(trigger) === "hover") {
          onOpen();
        }
      });
      const onContentLeave = composeEventHandlers(stopWhenControlled, () => {
        if (vue.unref(trigger) === "hover") {
          onClose();
        }
      });
      const onBeforeEnter = () => {
        var _a3, _b2;
        (_b2 = (_a3 = contentRef.value) == null ? void 0 : _a3.updatePopper) == null ? void 0 : _b2.call(_a3);
        onBeforeShow == null ? void 0 : onBeforeShow();
      };
      const onBeforeLeave = () => {
        onBeforeHide == null ? void 0 : onBeforeHide();
      };
      const onAfterShow = () => {
        onShow();
        stopHandle = onClickOutside(vue.computed(() => {
          var _a3;
          return (_a3 = contentRef.value) == null ? void 0 : _a3.popperContentRef;
        }), () => {
          if (vue.unref(controlled))
            return;
          const $trigger = vue.unref(trigger);
          if ($trigger !== "hover") {
            onClose();
          }
        });
      };
      const onBlur = () => {
        if (!props.virtualTriggering) {
          onClose();
        }
      };
      let stopHandle;
      vue.watch(() => vue.unref(open), (val) => {
        if (!val) {
          stopHandle == null ? void 0 : stopHandle();
        }
      }, {
        flush: "post"
      });
      return {
        ariaHidden,
        entering,
        leaving,
        id,
        intermediateOpen,
        contentStyle,
        contentRef,
        destroyed,
        shouldRender,
        shouldShow,
        onClose,
        open,
        onAfterShow,
        onBeforeEnter,
        onBeforeLeave,
        onContentEnter,
        onContentLeave,
        onTransitionLeave,
        onBlur
      };
    }
  });
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_el_popper_content = vue.resolveComponent("el-popper-content");
    return vue.openBlock(), vue.createBlock(vue.Teleport, {
      disabled: !_ctx.teleported,
      to: _ctx.appendTo
    }, [
      vue.createVNode(vue.Transition, {
        name: _ctx.transition,
        onAfterLeave: _ctx.onTransitionLeave,
        onBeforeEnter: _ctx.onBeforeEnter,
        onAfterEnter: _ctx.onAfterShow,
        onBeforeLeave: _ctx.onBeforeLeave
      }, {
        default: vue.withCtx(() => [
          _ctx.shouldRender ? vue.withDirectives((vue.openBlock(), vue.createBlock(_component_el_popper_content, vue.mergeProps({
            key: 0,
            id: _ctx.id,
            ref: "contentRef"
          }, _ctx.$attrs, {
            "aria-label": _ctx.ariaLabel,
            "aria-hidden": _ctx.ariaHidden,
            "boundaries-padding": _ctx.boundariesPadding,
            "fallback-placements": _ctx.fallbackPlacements,
            "gpu-acceleration": _ctx.gpuAcceleration,
            offset: _ctx.offset,
            placement: _ctx.placement,
            "popper-options": _ctx.popperOptions,
            strategy: _ctx.strategy,
            effect: _ctx.effect,
            enterable: _ctx.enterable,
            pure: _ctx.pure,
            "popper-class": _ctx.popperClass,
            "popper-style": [_ctx.popperStyle, _ctx.contentStyle],
            "reference-el": _ctx.referenceEl,
            "trigger-target-el": _ctx.triggerTargetEl,
            visible: _ctx.shouldShow,
            "z-index": _ctx.zIndex,
            onMouseenter: _ctx.onContentEnter,
            onMouseleave: _ctx.onContentLeave,
            onBlur: _ctx.onBlur,
            onClose: _ctx.onClose
          }), {
            default: vue.withCtx(() => [
              vue.createCommentVNode(" Workaround bug #6378 "),
              !_ctx.destroyed ? vue.renderSlot(_ctx.$slots, "default", { key: 0 }) : vue.createCommentVNode("v-if", true)
            ]),
            _: 3
          }, 16, ["id", "aria-label", "aria-hidden", "boundaries-padding", "fallback-placements", "gpu-acceleration", "offset", "placement", "popper-options", "strategy", "effect", "enterable", "pure", "popper-class", "popper-style", "reference-el", "trigger-target-el", "visible", "z-index", "onMouseenter", "onMouseleave", "onBlur", "onClose"])), [
            [vue.vShow, _ctx.shouldShow]
          ]) : vue.createCommentVNode("v-if", true)
        ]),
        _: 3
      }, 8, ["name", "onAfterLeave", "onBeforeEnter", "onAfterEnter", "onBeforeLeave"])
    ], 8, ["disabled", "to"]);
  }
  var ElTooltipContent = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$2], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/content.vue"]]);
  const isTriggerType = (trigger, type2) => {
    if (isArray(trigger)) {
      return trigger.includes(type2);
    }
    return trigger === type2;
  };
  const whenTrigger = (trigger, type2, handler) => {
    return (e) => {
      isTriggerType(vue.unref(trigger), type2) && handler(e);
    };
  };
  const _sfc_main$j = vue.defineComponent({
    name: "ElTooltipTrigger",
    components: {
      ElPopperTrigger
    },
    props: useTooltipTriggerProps,
    setup(props) {
      const ns2 = useNamespace("tooltip");
      const { controlled, id, open, onOpen, onClose, onToggle } = vue.inject(TOOLTIP_INJECTION_KEY, void 0);
      const triggerRef = vue.ref(null);
      const stopWhenControlledOrDisabled = () => {
        if (vue.unref(controlled) || props.disabled) {
          return true;
        }
      };
      const trigger = vue.toRef(props, "trigger");
      const onMouseenter = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, "hover", onOpen));
      const onMouseleave = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, "hover", onClose));
      const onClick = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, "click", (e) => {
        if (e.button === 0) {
          onToggle(e);
        }
      }));
      const onFocus = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, "focus", onOpen));
      const onBlur = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, "focus", onClose));
      const onContextMenu = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, "contextmenu", (e) => {
        e.preventDefault();
        onToggle(e);
      }));
      const onKeydown = composeEventHandlers(stopWhenControlledOrDisabled, (e) => {
        const { code } = e;
        if (props.triggerKeys.includes(code)) {
          e.preventDefault();
          onToggle(e);
        }
      });
      return {
        onBlur,
        onContextMenu,
        onFocus,
        onMouseenter,
        onMouseleave,
        onClick,
        onKeydown,
        open,
        id,
        triggerRef,
        ns: ns2
      };
    }
  });
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_el_popper_trigger = vue.resolveComponent("el-popper-trigger");
    return vue.openBlock(), vue.createBlock(_component_el_popper_trigger, {
      id: _ctx.id,
      "virtual-ref": _ctx.virtualRef,
      open: _ctx.open,
      "virtual-triggering": _ctx.virtualTriggering,
      class: vue.normalizeClass(_ctx.ns.e("trigger")),
      onBlur: _ctx.onBlur,
      onClick: _ctx.onClick,
      onContextmenu: _ctx.onContextMenu,
      onFocus: _ctx.onFocus,
      onMouseenter: _ctx.onMouseenter,
      onMouseleave: _ctx.onMouseleave,
      onKeydown: _ctx.onKeydown
    }, {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      _: 3
    }, 8, ["id", "virtual-ref", "open", "virtual-triggering", "class", "onBlur", "onClick", "onContextmenu", "onFocus", "onMouseenter", "onMouseleave", "onKeydown"]);
  }
  var ElTooltipTrigger = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$1], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/trigger.vue"]]);
  const { useModelToggleProps, useModelToggle, useModelToggleEmits } = createModelToggleComposable("visible");
  const _sfc_main$i = vue.defineComponent({
    name: "ElTooltip",
    components: {
      ElPopper,
      ElPopperArrow,
      ElTooltipContent,
      ElTooltipTrigger
    },
    props: {
      ...usePopperProps,
      ...useModelToggleProps,
      ...useTooltipContentProps,
      ...useTooltipTriggerProps,
      ...usePopperArrowProps,
      ...useTooltipProps
    },
    emits: [
      ...useModelToggleEmits,
      "before-show",
      "before-hide",
      "show",
      "hide",
      "open",
      "close"
    ],
    setup(props, { emit }) {
      usePopperContainer();
      const compatShowAfter = vue.computed(() => {
        if (!isUndefined(props.openDelay))
          ;
        return props.openDelay || props.showAfter;
      });
      const compatShowArrow = vue.computed(() => {
        if (!isUndefined(props.visibleArrow))
          ;
        return isBoolean(props.visibleArrow) ? props.visibleArrow : props.showArrow;
      });
      const id = useId();
      const popperRef = vue.ref(null);
      const contentRef = vue.ref(null);
      const updatePopper = () => {
        var _a3;
        const popperComponent = vue.unref(popperRef);
        if (popperComponent) {
          (_a3 = popperComponent.popperInstanceRef) == null ? void 0 : _a3.update();
        }
      };
      const open = vue.ref(false);
      const toggleReason = vue.ref(void 0);
      const { show, hide, hasUpdateHandler } = useModelToggle({
        indicator: open,
        toggleReason
      });
      const { onOpen, onClose } = useDelayedToggle({
        showAfter: compatShowAfter,
        hideAfter: vue.toRef(props, "hideAfter"),
        open: show,
        close: hide
      });
      const controlled = vue.computed(() => isBoolean(props.visible) && !hasUpdateHandler.value);
      vue.provide(TOOLTIP_INJECTION_KEY, {
        controlled,
        id,
        open: vue.readonly(open),
        trigger: vue.toRef(props, "trigger"),
        onOpen: (event) => {
          onOpen(event);
        },
        onClose: (event) => {
          onClose(event);
        },
        onToggle: (event) => {
          if (vue.unref(open)) {
            onClose(event);
          } else {
            onOpen(event);
          }
        },
        onShow: () => {
          emit("show", toggleReason.value);
        },
        onHide: () => {
          emit("hide", toggleReason.value);
        },
        onBeforeShow: () => {
          emit("before-show", toggleReason.value);
        },
        onBeforeHide: () => {
          emit("before-hide", toggleReason.value);
        },
        updatePopper
      });
      vue.watch(() => props.disabled, (disabled) => {
        if (disabled && open.value) {
          open.value = false;
        }
      });
      const isFocusInsideContent = () => {
        var _a3, _b2;
        const popperContent = (_b2 = (_a3 = contentRef.value) == null ? void 0 : _a3.contentRef) == null ? void 0 : _b2.popperContentRef;
        return popperContent && popperContent.contains(document.activeElement);
      };
      vue.onDeactivated(() => open.value && hide());
      return {
        compatShowAfter,
        compatShowArrow,
        popperRef,
        contentRef,
        open,
        hide,
        isFocusInsideContent,
        updatePopper,
        onOpen,
        onClose
      };
    }
  });
  const _hoisted_1$d = ["innerHTML"];
  const _hoisted_2$8 = { key: 1 };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_el_tooltip_trigger = vue.resolveComponent("el-tooltip-trigger");
    const _component_el_popper_arrow = vue.resolveComponent("el-popper-arrow");
    const _component_el_tooltip_content = vue.resolveComponent("el-tooltip-content");
    const _component_el_popper = vue.resolveComponent("el-popper");
    return vue.openBlock(), vue.createBlock(_component_el_popper, {
      ref: "popperRef",
      role: _ctx.role
    }, {
      default: vue.withCtx(() => [
        vue.createVNode(_component_el_tooltip_trigger, {
          disabled: _ctx.disabled,
          trigger: _ctx.trigger,
          "trigger-keys": _ctx.triggerKeys,
          "virtual-ref": _ctx.virtualRef,
          "virtual-triggering": _ctx.virtualTriggering
        }, {
          default: vue.withCtx(() => [
            _ctx.$slots.default ? vue.renderSlot(_ctx.$slots, "default", { key: 0 }) : vue.createCommentVNode("v-if", true)
          ]),
          _: 3
        }, 8, ["disabled", "trigger", "trigger-keys", "virtual-ref", "virtual-triggering"]),
        vue.createVNode(_component_el_tooltip_content, {
          ref: "contentRef",
          "aria-label": _ctx.ariaLabel,
          "boundaries-padding": _ctx.boundariesPadding,
          content: _ctx.content,
          disabled: _ctx.disabled,
          effect: _ctx.effect,
          enterable: _ctx.enterable,
          "fallback-placements": _ctx.fallbackPlacements,
          "hide-after": _ctx.hideAfter,
          "gpu-acceleration": _ctx.gpuAcceleration,
          offset: _ctx.offset,
          persistent: _ctx.persistent,
          "popper-class": _ctx.popperClass,
          "popper-style": _ctx.popperStyle,
          placement: _ctx.placement,
          "popper-options": _ctx.popperOptions,
          pure: _ctx.pure,
          "raw-content": _ctx.rawContent,
          "reference-el": _ctx.referenceEl,
          "trigger-target-el": _ctx.triggerTargetEl,
          "show-after": _ctx.compatShowAfter,
          strategy: _ctx.strategy,
          teleported: _ctx.teleported,
          transition: _ctx.transition,
          "virtual-triggering": _ctx.virtualTriggering,
          "z-index": _ctx.zIndex,
          "append-to": _ctx.appendTo
        }, {
          default: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "content", {}, () => [
              _ctx.rawContent ? (vue.openBlock(), vue.createElementBlock("span", {
                key: 0,
                innerHTML: _ctx.content
              }, null, 8, _hoisted_1$d)) : (vue.openBlock(), vue.createElementBlock("span", _hoisted_2$8, vue.toDisplayString(_ctx.content), 1))
            ]),
            _ctx.compatShowArrow ? (vue.openBlock(), vue.createBlock(_component_el_popper_arrow, {
              key: 0,
              "arrow-offset": _ctx.arrowOffset
            }, null, 8, ["arrow-offset"])) : vue.createCommentVNode("v-if", true)
          ]),
          _: 3
        }, 8, ["aria-label", "boundaries-padding", "content", "disabled", "effect", "enterable", "fallback-placements", "hide-after", "gpu-acceleration", "offset", "persistent", "popper-class", "popper-style", "placement", "popper-options", "pure", "raw-content", "reference-el", "trigger-target-el", "show-after", "strategy", "teleported", "transition", "virtual-triggering", "z-index", "append-to"])
      ]),
      _: 3
    }, 8, ["role"]);
  }
  var Tooltip = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/tooltip.vue"]]);
  const ElTooltip = withInstall(Tooltip);
  const badgeProps = buildProps({
    value: {
      type: [String, Number],
      default: ""
    },
    max: {
      type: Number,
      default: 99
    },
    isDot: Boolean,
    hidden: Boolean,
    type: {
      type: String,
      values: ["primary", "success", "warning", "info", "danger"],
      default: "danger"
    }
  });
  const _hoisted_1$c = ["textContent"];
  const __default__$g = {
    name: "ElBadge"
  };
  const _sfc_main$h = /* @__PURE__ */ vue.defineComponent({
    ...__default__$g,
    props: badgeProps,
    setup(__props, { expose }) {
      const props = __props;
      const ns2 = useNamespace("badge");
      const content = vue.computed(() => {
        if (props.isDot)
          return "";
        if (isNumber(props.value) && isNumber(props.max)) {
          return props.max < props.value ? `${props.max}+` : `${props.value}`;
        }
        return `${props.value}`;
      });
      expose({
        content
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass(vue.unref(ns2).b())
        }, [
          vue.renderSlot(_ctx.$slots, "default"),
          vue.createVNode(vue.Transition, {
            name: `${vue.unref(ns2).namespace.value}-zoom-in-center`,
            persisted: ""
          }, {
            default: vue.withCtx(() => [
              vue.withDirectives(vue.createElementVNode("sup", {
                class: vue.normalizeClass([
                  vue.unref(ns2).e("content"),
                  vue.unref(ns2).em("content", _ctx.type),
                  vue.unref(ns2).is("fixed", !!_ctx.$slots.default),
                  vue.unref(ns2).is("dot", _ctx.isDot)
                ]),
                textContent: vue.toDisplayString(vue.unref(content))
              }, null, 10, _hoisted_1$c), [
                [vue.vShow, !_ctx.hidden && (vue.unref(content) || _ctx.isDot)]
              ])
            ]),
            _: 1
          }, 8, ["name"])
        ], 2);
      };
    }
  });
  var Badge = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/badge/src/badge.vue"]]);
  const ElBadge = withInstall(Badge);
  const buttonTypes = [
    "default",
    "primary",
    "success",
    "warning",
    "info",
    "danger",
    "text",
    ""
  ];
  const buttonNativeTypes = ["button", "submit", "reset"];
  const buttonProps = buildProps({
    size: useSizeProp,
    disabled: Boolean,
    type: {
      type: String,
      values: buttonTypes,
      default: ""
    },
    icon: {
      type: iconPropType,
      default: ""
    },
    nativeType: {
      type: String,
      values: buttonNativeTypes,
      default: "button"
    },
    loading: Boolean,
    loadingIcon: {
      type: iconPropType,
      default: () => loading_default
    },
    plain: Boolean,
    text: Boolean,
    link: Boolean,
    bg: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean,
    color: String,
    dark: Boolean,
    autoInsertSpace: {
      type: Boolean,
      default: void 0
    }
  });
  const buttonEmits = {
    click: (evt) => evt instanceof MouseEvent
  };
  function bound01(n, max) {
    if (isOnePointZero(n)) {
      n = "100%";
    }
    var isPercent = isPercentage(n);
    n = max === 360 ? n : Math.min(max, Math.max(0, parseFloat(n)));
    if (isPercent) {
      n = parseInt(String(n * max), 10) / 100;
    }
    if (Math.abs(n - max) < 1e-6) {
      return 1;
    }
    if (max === 360) {
      n = (n < 0 ? n % max + max : n % max) / parseFloat(String(max));
    } else {
      n = n % max / parseFloat(String(max));
    }
    return n;
  }
  function clamp01(val) {
    return Math.min(1, Math.max(0, val));
  }
  function isOnePointZero(n) {
    return typeof n === "string" && n.indexOf(".") !== -1 && parseFloat(n) === 1;
  }
  function isPercentage(n) {
    return typeof n === "string" && n.indexOf("%") !== -1;
  }
  function boundAlpha(a) {
    a = parseFloat(a);
    if (isNaN(a) || a < 0 || a > 1) {
      a = 1;
    }
    return a;
  }
  function convertToPercentage(n) {
    if (n <= 1) {
      return "".concat(Number(n) * 100, "%");
    }
    return n;
  }
  function pad2(c) {
    return c.length === 1 ? "0" + c : String(c);
  }
  function rgbToRgb(r, g, b) {
    return {
      r: bound01(r, 255) * 255,
      g: bound01(g, 255) * 255,
      b: bound01(b, 255) * 255
    };
  }
  function rgbToHsl(r, g, b) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var s = 0;
    var l = (max + min) / 2;
    if (max === min) {
      s = 0;
      h = 0;
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return { h, s, l };
  }
  function hue2rgb(p, q2, t) {
    if (t < 0) {
      t += 1;
    }
    if (t > 1) {
      t -= 1;
    }
    if (t < 1 / 6) {
      return p + (q2 - p) * (6 * t);
    }
    if (t < 1 / 2) {
      return q2;
    }
    if (t < 2 / 3) {
      return p + (q2 - p) * (2 / 3 - t) * 6;
    }
    return p;
  }
  function hslToRgb(h, s, l) {
    var r;
    var g;
    var b;
    h = bound01(h, 360);
    s = bound01(s, 100);
    l = bound01(l, 100);
    if (s === 0) {
      g = l;
      b = l;
      r = l;
    } else {
      var q2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q2;
      r = hue2rgb(p, q2, h + 1 / 3);
      g = hue2rgb(p, q2, h);
      b = hue2rgb(p, q2, h - 1 / 3);
    }
    return { r: r * 255, g: g * 255, b: b * 255 };
  }
  function rgbToHsv(r, g, b) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var v = max;
    var d = max - min;
    var s = max === 0 ? 0 : d / max;
    if (max === min) {
      h = 0;
    } else {
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return { h, s, v };
  }
  function hsvToRgb(h, s, v) {
    h = bound01(h, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);
    var i2 = Math.floor(h);
    var f = h - i2;
    var p = v * (1 - s);
    var q2 = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);
    var mod = i2 % 6;
    var r = [v, q2, p, p, t, v][mod];
    var g = [t, v, v, q2, p, p][mod];
    var b = [p, p, t, v, v, q2][mod];
    return { r: r * 255, g: g * 255, b: b * 255 };
  }
  function rgbToHex(r, g, b, allow3Char) {
    var hex = [
      pad2(Math.round(r).toString(16)),
      pad2(Math.round(g).toString(16)),
      pad2(Math.round(b).toString(16))
    ];
    if (allow3Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1))) {
      return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }
    return hex.join("");
  }
  function rgbaToHex(r, g, b, a, allow4Char) {
    var hex = [
      pad2(Math.round(r).toString(16)),
      pad2(Math.round(g).toString(16)),
      pad2(Math.round(b).toString(16)),
      pad2(convertDecimalToHex(a))
    ];
    if (allow4Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1)) && hex[3].startsWith(hex[3].charAt(1))) {
      return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
    }
    return hex.join("");
  }
  function convertDecimalToHex(d) {
    return Math.round(parseFloat(d) * 255).toString(16);
  }
  function convertHexToDecimal(h) {
    return parseIntFromHex(h) / 255;
  }
  function parseIntFromHex(val) {
    return parseInt(val, 16);
  }
  function numberInputToObject(color) {
    return {
      r: color >> 16,
      g: (color & 65280) >> 8,
      b: color & 255
    };
  }
  var names = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkgrey: "#a9a9a9",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkslategrey: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    goldenrod: "#daa520",
    gold: "#ffd700",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavenderblush: "#fff0f5",
    lavender: "#e6e6fa",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370db",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#db7093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    rebeccapurple: "#663399",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
  };
  function inputToRGB(color) {
    var rgb = { r: 0, g: 0, b: 0 };
    var a = 1;
    var s = null;
    var v = null;
    var l = null;
    var ok = false;
    var format2 = false;
    if (typeof color === "string") {
      color = stringInputToObject(color);
    }
    if (typeof color === "object") {
      if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
        rgb = rgbToRgb(color.r, color.g, color.b);
        ok = true;
        format2 = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
      } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
        s = convertToPercentage(color.s);
        v = convertToPercentage(color.v);
        rgb = hsvToRgb(color.h, s, v);
        ok = true;
        format2 = "hsv";
      } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
        s = convertToPercentage(color.s);
        l = convertToPercentage(color.l);
        rgb = hslToRgb(color.h, s, l);
        ok = true;
        format2 = "hsl";
      }
      if (Object.prototype.hasOwnProperty.call(color, "a")) {
        a = color.a;
      }
    }
    a = boundAlpha(a);
    return {
      ok,
      format: color.format || format2,
      r: Math.min(255, Math.max(rgb.r, 0)),
      g: Math.min(255, Math.max(rgb.g, 0)),
      b: Math.min(255, Math.max(rgb.b, 0)),
      a
    };
  }
  var CSS_INTEGER = "[-\\+]?\\d+%?";
  var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
  var CSS_UNIT = "(?:".concat(CSS_NUMBER, ")|(?:").concat(CSS_INTEGER, ")");
  var PERMISSIVE_MATCH3 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
  var PERMISSIVE_MATCH4 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
  var matchers = {
    CSS_UNIT: new RegExp(CSS_UNIT),
    rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
    rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
    hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
    hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
    hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
    hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
  };
  function stringInputToObject(color) {
    color = color.trim().toLowerCase();
    if (color.length === 0) {
      return false;
    }
    var named = false;
    if (names[color]) {
      color = names[color];
      named = true;
    } else if (color === "transparent") {
      return { r: 0, g: 0, b: 0, a: 0, format: "name" };
    }
    var match2 = matchers.rgb.exec(color);
    if (match2) {
      return { r: match2[1], g: match2[2], b: match2[3] };
    }
    match2 = matchers.rgba.exec(color);
    if (match2) {
      return { r: match2[1], g: match2[2], b: match2[3], a: match2[4] };
    }
    match2 = matchers.hsl.exec(color);
    if (match2) {
      return { h: match2[1], s: match2[2], l: match2[3] };
    }
    match2 = matchers.hsla.exec(color);
    if (match2) {
      return { h: match2[1], s: match2[2], l: match2[3], a: match2[4] };
    }
    match2 = matchers.hsv.exec(color);
    if (match2) {
      return { h: match2[1], s: match2[2], v: match2[3] };
    }
    match2 = matchers.hsva.exec(color);
    if (match2) {
      return { h: match2[1], s: match2[2], v: match2[3], a: match2[4] };
    }
    match2 = matchers.hex8.exec(color);
    if (match2) {
      return {
        r: parseIntFromHex(match2[1]),
        g: parseIntFromHex(match2[2]),
        b: parseIntFromHex(match2[3]),
        a: convertHexToDecimal(match2[4]),
        format: named ? "name" : "hex8"
      };
    }
    match2 = matchers.hex6.exec(color);
    if (match2) {
      return {
        r: parseIntFromHex(match2[1]),
        g: parseIntFromHex(match2[2]),
        b: parseIntFromHex(match2[3]),
        format: named ? "name" : "hex"
      };
    }
    match2 = matchers.hex4.exec(color);
    if (match2) {
      return {
        r: parseIntFromHex(match2[1] + match2[1]),
        g: parseIntFromHex(match2[2] + match2[2]),
        b: parseIntFromHex(match2[3] + match2[3]),
        a: convertHexToDecimal(match2[4] + match2[4]),
        format: named ? "name" : "hex8"
      };
    }
    match2 = matchers.hex3.exec(color);
    if (match2) {
      return {
        r: parseIntFromHex(match2[1] + match2[1]),
        g: parseIntFromHex(match2[2] + match2[2]),
        b: parseIntFromHex(match2[3] + match2[3]),
        format: named ? "name" : "hex"
      };
    }
    return false;
  }
  function isValidCSSUnit(color) {
    return Boolean(matchers.CSS_UNIT.exec(String(color)));
  }
  var TinyColor = function() {
    function TinyColor2(color, opts) {
      if (color === void 0) {
        color = "";
      }
      if (opts === void 0) {
        opts = {};
      }
      var _a3;
      if (color instanceof TinyColor2) {
        return color;
      }
      if (typeof color === "number") {
        color = numberInputToObject(color);
      }
      this.originalInput = color;
      var rgb = inputToRGB(color);
      this.originalInput = color;
      this.r = rgb.r;
      this.g = rgb.g;
      this.b = rgb.b;
      this.a = rgb.a;
      this.roundA = Math.round(100 * this.a) / 100;
      this.format = (_a3 = opts.format) !== null && _a3 !== void 0 ? _a3 : rgb.format;
      this.gradientType = opts.gradientType;
      if (this.r < 1) {
        this.r = Math.round(this.r);
      }
      if (this.g < 1) {
        this.g = Math.round(this.g);
      }
      if (this.b < 1) {
        this.b = Math.round(this.b);
      }
      this.isValid = rgb.ok;
    }
    TinyColor2.prototype.isDark = function() {
      return this.getBrightness() < 128;
    };
    TinyColor2.prototype.isLight = function() {
      return !this.isDark();
    };
    TinyColor2.prototype.getBrightness = function() {
      var rgb = this.toRgb();
      return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
    };
    TinyColor2.prototype.getLuminance = function() {
      var rgb = this.toRgb();
      var R2;
      var G2;
      var B2;
      var RsRGB = rgb.r / 255;
      var GsRGB = rgb.g / 255;
      var BsRGB = rgb.b / 255;
      if (RsRGB <= 0.03928) {
        R2 = RsRGB / 12.92;
      } else {
        R2 = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
      }
      if (GsRGB <= 0.03928) {
        G2 = GsRGB / 12.92;
      } else {
        G2 = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
      }
      if (BsRGB <= 0.03928) {
        B2 = BsRGB / 12.92;
      } else {
        B2 = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
      }
      return 0.2126 * R2 + 0.7152 * G2 + 0.0722 * B2;
    };
    TinyColor2.prototype.getAlpha = function() {
      return this.a;
    };
    TinyColor2.prototype.setAlpha = function(alpha) {
      this.a = boundAlpha(alpha);
      this.roundA = Math.round(100 * this.a) / 100;
      return this;
    };
    TinyColor2.prototype.toHsv = function() {
      var hsv = rgbToHsv(this.r, this.g, this.b);
      return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this.a };
    };
    TinyColor2.prototype.toHsvString = function() {
      var hsv = rgbToHsv(this.r, this.g, this.b);
      var h = Math.round(hsv.h * 360);
      var s = Math.round(hsv.s * 100);
      var v = Math.round(hsv.v * 100);
      return this.a === 1 ? "hsv(".concat(h, ", ").concat(s, "%, ").concat(v, "%)") : "hsva(".concat(h, ", ").concat(s, "%, ").concat(v, "%, ").concat(this.roundA, ")");
    };
    TinyColor2.prototype.toHsl = function() {
      var hsl = rgbToHsl(this.r, this.g, this.b);
      return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this.a };
    };
    TinyColor2.prototype.toHslString = function() {
      var hsl = rgbToHsl(this.r, this.g, this.b);
      var h = Math.round(hsl.h * 360);
      var s = Math.round(hsl.s * 100);
      var l = Math.round(hsl.l * 100);
      return this.a === 1 ? "hsl(".concat(h, ", ").concat(s, "%, ").concat(l, "%)") : "hsla(".concat(h, ", ").concat(s, "%, ").concat(l, "%, ").concat(this.roundA, ")");
    };
    TinyColor2.prototype.toHex = function(allow3Char) {
      if (allow3Char === void 0) {
        allow3Char = false;
      }
      return rgbToHex(this.r, this.g, this.b, allow3Char);
    };
    TinyColor2.prototype.toHexString = function(allow3Char) {
      if (allow3Char === void 0) {
        allow3Char = false;
      }
      return "#" + this.toHex(allow3Char);
    };
    TinyColor2.prototype.toHex8 = function(allow4Char) {
      if (allow4Char === void 0) {
        allow4Char = false;
      }
      return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char);
    };
    TinyColor2.prototype.toHex8String = function(allow4Char) {
      if (allow4Char === void 0) {
        allow4Char = false;
      }
      return "#" + this.toHex8(allow4Char);
    };
    TinyColor2.prototype.toRgb = function() {
      return {
        r: Math.round(this.r),
        g: Math.round(this.g),
        b: Math.round(this.b),
        a: this.a
      };
    };
    TinyColor2.prototype.toRgbString = function() {
      var r = Math.round(this.r);
      var g = Math.round(this.g);
      var b = Math.round(this.b);
      return this.a === 1 ? "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")") : "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(this.roundA, ")");
    };
    TinyColor2.prototype.toPercentageRgb = function() {
      var fmt = function(x) {
        return "".concat(Math.round(bound01(x, 255) * 100), "%");
      };
      return {
        r: fmt(this.r),
        g: fmt(this.g),
        b: fmt(this.b),
        a: this.a
      };
    };
    TinyColor2.prototype.toPercentageRgbString = function() {
      var rnd = function(x) {
        return Math.round(bound01(x, 255) * 100);
      };
      return this.a === 1 ? "rgb(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%)") : "rgba(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%, ").concat(this.roundA, ")");
    };
    TinyColor2.prototype.toName = function() {
      if (this.a === 0) {
        return "transparent";
      }
      if (this.a < 1) {
        return false;
      }
      var hex = "#" + rgbToHex(this.r, this.g, this.b, false);
      for (var _i = 0, _a3 = Object.entries(names); _i < _a3.length; _i++) {
        var _b2 = _a3[_i], key = _b2[0], value = _b2[1];
        if (hex === value) {
          return key;
        }
      }
      return false;
    };
    TinyColor2.prototype.toString = function(format2) {
      var formatSet = Boolean(format2);
      format2 = format2 !== null && format2 !== void 0 ? format2 : this.format;
      var formattedString = false;
      var hasAlpha = this.a < 1 && this.a >= 0;
      var needsAlphaFormat = !formatSet && hasAlpha && (format2.startsWith("hex") || format2 === "name");
      if (needsAlphaFormat) {
        if (format2 === "name" && this.a === 0) {
          return this.toName();
        }
        return this.toRgbString();
      }
      if (format2 === "rgb") {
        formattedString = this.toRgbString();
      }
      if (format2 === "prgb") {
        formattedString = this.toPercentageRgbString();
      }
      if (format2 === "hex" || format2 === "hex6") {
        formattedString = this.toHexString();
      }
      if (format2 === "hex3") {
        formattedString = this.toHexString(true);
      }
      if (format2 === "hex4") {
        formattedString = this.toHex8String(true);
      }
      if (format2 === "hex8") {
        formattedString = this.toHex8String();
      }
      if (format2 === "name") {
        formattedString = this.toName();
      }
      if (format2 === "hsl") {
        formattedString = this.toHslString();
      }
      if (format2 === "hsv") {
        formattedString = this.toHsvString();
      }
      return formattedString || this.toHexString();
    };
    TinyColor2.prototype.toNumber = function() {
      return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
    };
    TinyColor2.prototype.clone = function() {
      return new TinyColor2(this.toString());
    };
    TinyColor2.prototype.lighten = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var hsl = this.toHsl();
      hsl.l += amount / 100;
      hsl.l = clamp01(hsl.l);
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.brighten = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var rgb = this.toRgb();
      rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
      rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
      rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
      return new TinyColor2(rgb);
    };
    TinyColor2.prototype.darken = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var hsl = this.toHsl();
      hsl.l -= amount / 100;
      hsl.l = clamp01(hsl.l);
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.tint = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      return this.mix("white", amount);
    };
    TinyColor2.prototype.shade = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      return this.mix("black", amount);
    };
    TinyColor2.prototype.desaturate = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var hsl = this.toHsl();
      hsl.s -= amount / 100;
      hsl.s = clamp01(hsl.s);
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.saturate = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var hsl = this.toHsl();
      hsl.s += amount / 100;
      hsl.s = clamp01(hsl.s);
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.greyscale = function() {
      return this.desaturate(100);
    };
    TinyColor2.prototype.spin = function(amount) {
      var hsl = this.toHsl();
      var hue = (hsl.h + amount) % 360;
      hsl.h = hue < 0 ? 360 + hue : hue;
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.mix = function(color, amount) {
      if (amount === void 0) {
        amount = 50;
      }
      var rgb1 = this.toRgb();
      var rgb2 = new TinyColor2(color).toRgb();
      var p = amount / 100;
      var rgba = {
        r: (rgb2.r - rgb1.r) * p + rgb1.r,
        g: (rgb2.g - rgb1.g) * p + rgb1.g,
        b: (rgb2.b - rgb1.b) * p + rgb1.b,
        a: (rgb2.a - rgb1.a) * p + rgb1.a
      };
      return new TinyColor2(rgba);
    };
    TinyColor2.prototype.analogous = function(results, slices) {
      if (results === void 0) {
        results = 6;
      }
      if (slices === void 0) {
        slices = 30;
      }
      var hsl = this.toHsl();
      var part = 360 / slices;
      var ret = [this];
      for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results; ) {
        hsl.h = (hsl.h + part) % 360;
        ret.push(new TinyColor2(hsl));
      }
      return ret;
    };
    TinyColor2.prototype.complement = function() {
      var hsl = this.toHsl();
      hsl.h = (hsl.h + 180) % 360;
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.monochromatic = function(results) {
      if (results === void 0) {
        results = 6;
      }
      var hsv = this.toHsv();
      var h = hsv.h;
      var s = hsv.s;
      var v = hsv.v;
      var res = [];
      var modification = 1 / results;
      while (results--) {
        res.push(new TinyColor2({ h, s, v }));
        v = (v + modification) % 1;
      }
      return res;
    };
    TinyColor2.prototype.splitcomplement = function() {
      var hsl = this.toHsl();
      var h = hsl.h;
      return [
        this,
        new TinyColor2({ h: (h + 72) % 360, s: hsl.s, l: hsl.l }),
        new TinyColor2({ h: (h + 216) % 360, s: hsl.s, l: hsl.l })
      ];
    };
    TinyColor2.prototype.onBackground = function(background) {
      var fg = this.toRgb();
      var bg = new TinyColor2(background).toRgb();
      return new TinyColor2({
        r: bg.r + (fg.r - bg.r) * fg.a,
        g: bg.g + (fg.g - bg.g) * fg.a,
        b: bg.b + (fg.b - bg.b) * fg.a
      });
    };
    TinyColor2.prototype.triad = function() {
      return this.polyad(3);
    };
    TinyColor2.prototype.tetrad = function() {
      return this.polyad(4);
    };
    TinyColor2.prototype.polyad = function(n) {
      var hsl = this.toHsl();
      var h = hsl.h;
      var result = [this];
      var increment = 360 / n;
      for (var i2 = 1; i2 < n; i2++) {
        result.push(new TinyColor2({ h: (h + i2 * increment) % 360, s: hsl.s, l: hsl.l }));
      }
      return result;
    };
    TinyColor2.prototype.equals = function(color) {
      return this.toRgbString() === new TinyColor2(color).toRgbString();
    };
    return TinyColor2;
  }();
  function darken(color, amount = 20) {
    return color.mix("#141414", amount).toString();
  }
  function useButtonCustomStyle(props) {
    const _disabled = useDisabled$1();
    const ns2 = useNamespace("button");
    return vue.computed(() => {
      let styles = {};
      const buttonColor = props.color;
      if (buttonColor) {
        const color = new TinyColor(buttonColor);
        const activeBgColor = props.dark ? color.tint(20).toString() : darken(color, 20);
        if (props.plain) {
          styles = ns2.cssVarBlock({
            "bg-color": props.dark ? darken(color, 90) : color.tint(90).toString(),
            "text-color": buttonColor,
            "border-color": props.dark ? darken(color, 50) : color.tint(50).toString(),
            "hover-text-color": `var(${ns2.cssVarName("color-white")})`,
            "hover-bg-color": buttonColor,
            "hover-border-color": buttonColor,
            "active-bg-color": activeBgColor,
            "active-text-color": `var(${ns2.cssVarName("color-white")})`,
            "active-border-color": activeBgColor
          });
          if (_disabled.value) {
            styles[ns2.cssVarBlockName("disabled-bg-color")] = props.dark ? darken(color, 90) : color.tint(90).toString();
            styles[ns2.cssVarBlockName("disabled-text-color")] = props.dark ? darken(color, 50) : color.tint(50).toString();
            styles[ns2.cssVarBlockName("disabled-border-color")] = props.dark ? darken(color, 80) : color.tint(80).toString();
          }
        } else {
          const hoverBgColor = props.dark ? darken(color, 30) : color.tint(30).toString();
          const textColor = color.isDark() ? `var(${ns2.cssVarName("color-white")})` : `var(${ns2.cssVarName("color-black")})`;
          styles = ns2.cssVarBlock({
            "bg-color": buttonColor,
            "text-color": textColor,
            "border-color": buttonColor,
            "hover-bg-color": hoverBgColor,
            "hover-text-color": textColor,
            "hover-border-color": hoverBgColor,
            "active-bg-color": activeBgColor,
            "active-border-color": activeBgColor
          });
          if (_disabled.value) {
            const disabledButtonColor = props.dark ? darken(color, 50) : color.tint(50).toString();
            styles[ns2.cssVarBlockName("disabled-bg-color")] = disabledButtonColor;
            styles[ns2.cssVarBlockName("disabled-text-color")] = props.dark ? "rgba(255, 255, 255, 0.5)" : `var(${ns2.cssVarName("color-white")})`;
            styles[ns2.cssVarBlockName("disabled-border-color")] = disabledButtonColor;
          }
        }
      }
      return styles;
    });
  }
  const _hoisted_1$b = ["aria-disabled", "disabled", "autofocus", "type"];
  const __default__$f = {
    name: "ElButton"
  };
  const _sfc_main$g = /* @__PURE__ */ vue.defineComponent({
    ...__default__$f,
    props: buttonProps,
    emits: buttonEmits,
    setup(__props, { expose, emit }) {
      const props = __props;
      const slots = vue.useSlots();
      useDeprecated({
        from: "type.text",
        replacement: "type.link",
        version: "3.0.0",
        scope: "props",
        ref: "https://element-plus.org/en-US/component/button.html#button-attributes"
      }, vue.computed(() => props.type === "text"));
      const buttonGroupContext = vue.inject(buttonGroupContextKey, void 0);
      const globalConfig2 = useGlobalConfig("button");
      const ns2 = useNamespace("button");
      const { form } = useFormItem();
      const _size = useSize(vue.computed(() => buttonGroupContext == null ? void 0 : buttonGroupContext.size));
      const _disabled = useDisabled$1();
      const _ref = vue.ref();
      const _type = vue.computed(() => props.type || (buttonGroupContext == null ? void 0 : buttonGroupContext.type) || "");
      const autoInsertSpace = vue.computed(() => {
        var _a3, _b2, _c;
        return (_c = (_b2 = props.autoInsertSpace) != null ? _b2 : (_a3 = globalConfig2.value) == null ? void 0 : _a3.autoInsertSpace) != null ? _c : false;
      });
      const shouldAddSpace = vue.computed(() => {
        var _a3;
        const defaultSlot = (_a3 = slots.default) == null ? void 0 : _a3.call(slots);
        if (autoInsertSpace.value && (defaultSlot == null ? void 0 : defaultSlot.length) === 1) {
          const slot = defaultSlot[0];
          if ((slot == null ? void 0 : slot.type) === vue.Text) {
            const text = slot.children;
            return /^\p{Unified_Ideograph}{2}$/u.test(text.trim());
          }
        }
        return false;
      });
      const buttonStyle = useButtonCustomStyle(props);
      const handleClick = (evt) => {
        if (props.nativeType === "reset") {
          form == null ? void 0 : form.resetFields();
        }
        emit("click", evt);
      };
      expose({
        ref: _ref,
        size: _size,
        type: _type,
        disabled: _disabled,
        shouldAddSpace
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("button", {
          ref_key: "_ref",
          ref: _ref,
          class: vue.normalizeClass([
            vue.unref(ns2).b(),
            vue.unref(ns2).m(vue.unref(_type)),
            vue.unref(ns2).m(vue.unref(_size)),
            vue.unref(ns2).is("disabled", vue.unref(_disabled)),
            vue.unref(ns2).is("loading", _ctx.loading),
            vue.unref(ns2).is("plain", _ctx.plain),
            vue.unref(ns2).is("round", _ctx.round),
            vue.unref(ns2).is("circle", _ctx.circle),
            vue.unref(ns2).is("text", _ctx.text),
            vue.unref(ns2).is("link", _ctx.link),
            vue.unref(ns2).is("has-bg", _ctx.bg)
          ]),
          "aria-disabled": vue.unref(_disabled) || _ctx.loading,
          disabled: vue.unref(_disabled) || _ctx.loading,
          autofocus: _ctx.autofocus,
          type: _ctx.nativeType,
          style: vue.normalizeStyle(vue.unref(buttonStyle)),
          onClick: handleClick
        }, [
          _ctx.loading ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
            _ctx.$slots.loading ? vue.renderSlot(_ctx.$slots, "loading", { key: 0 }) : (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
              key: 1,
              class: vue.normalizeClass(vue.unref(ns2).is("loading"))
            }, {
              default: vue.withCtx(() => [
                (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.loadingIcon)))
              ]),
              _: 1
            }, 8, ["class"]))
          ], 64)) : _ctx.icon || _ctx.$slots.icon ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), { key: 1 }, {
            default: vue.withCtx(() => [
              _ctx.icon ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.icon), { key: 0 })) : vue.renderSlot(_ctx.$slots, "icon", { key: 1 })
            ]),
            _: 3
          })) : vue.createCommentVNode("v-if", true),
          _ctx.$slots.default ? (vue.openBlock(), vue.createElementBlock("span", {
            key: 2,
            class: vue.normalizeClass({ [vue.unref(ns2).em("text", "expand")]: vue.unref(shouldAddSpace) })
          }, [
            vue.renderSlot(_ctx.$slots, "default")
          ], 2)) : vue.createCommentVNode("v-if", true)
        ], 14, _hoisted_1$b);
      };
    }
  });
  var Button = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/button/src/button.vue"]]);
  const buttonGroupProps = {
    size: buttonProps.size,
    type: buttonProps.type
  };
  const __default__$e = {
    name: "ElButtonGroup"
  };
  const _sfc_main$f = /* @__PURE__ */ vue.defineComponent({
    ...__default__$e,
    props: buttonGroupProps,
    setup(__props) {
      const props = __props;
      vue.provide(buttonGroupContextKey, vue.reactive({
        size: vue.toRef(props, "size"),
        type: vue.toRef(props, "type")
      }));
      const ns2 = useNamespace("button");
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass(`${vue.unref(ns2).b("group")}`)
        }, [
          vue.renderSlot(_ctx.$slots, "default")
        ], 2);
      };
    }
  });
  var ButtonGroup = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/button/src/button-group.vue"]]);
  const ElButton = withInstall(Button, {
    ButtonGroup
  });
  withNoopInstall(ButtonGroup);
  const RepeatClick = {
    beforeMount(el, binding) {
      let interval = null;
      let isHandlerCalled = false;
      const handler = () => binding.value && binding.value();
      const clear = () => {
        clearInterval(interval);
        interval = null;
        if (!isHandlerCalled) {
          handler();
        }
        isHandlerCalled = false;
      };
      el.addEventListener("mousedown", (e) => {
        if (e.button !== 0)
          return;
        document.addEventListener("mouseup", clear, { once: true });
        clearInterval(interval);
        interval = setInterval(() => {
          isHandlerCalled = true;
          handler();
        }, 100);
      });
    }
  };
  const useCheckboxGroupProps = {
    modelValue: {
      type: Array,
      default: () => []
    },
    disabled: Boolean,
    min: {
      type: Number,
      default: void 0
    },
    max: {
      type: Number,
      default: void 0
    },
    size: useSizeProp,
    id: {
      type: String,
      default: void 0
    },
    label: {
      type: String,
      default: void 0
    },
    fill: {
      type: String,
      default: void 0
    },
    textColor: {
      type: String,
      default: void 0
    },
    tag: {
      type: String,
      default: "div"
    },
    validateEvent: {
      type: Boolean,
      default: true
    }
  };
  const checkboxProps = {
    modelValue: {
      type: [Number, String, Boolean],
      default: () => void 0
    },
    label: {
      type: [String, Boolean, Number, Object]
    },
    indeterminate: Boolean,
    disabled: Boolean,
    checked: Boolean,
    name: {
      type: String,
      default: void 0
    },
    trueLabel: {
      type: [String, Number],
      default: void 0
    },
    falseLabel: {
      type: [String, Number],
      default: void 0
    },
    id: {
      type: String,
      default: void 0
    },
    controls: {
      type: String,
      default: void 0
    },
    border: Boolean,
    size: useSizeProp,
    tabindex: [String, Number],
    validateEvent: {
      type: Boolean,
      default: true
    }
  };
  const useCheckboxGroup = () => {
    const { form: elForm2, formItem: elFormItem2 } = useFormItem();
    const checkboxGroup = vue.inject("CheckboxGroup", {});
    const isGroup = vue.computed(() => checkboxGroup && (checkboxGroup == null ? void 0 : checkboxGroup.name) === "ElCheckboxGroup");
    const elFormItemSize = vue.computed(() => {
      return elFormItem2 == null ? void 0 : elFormItem2.size;
    });
    return {
      isGroup,
      checkboxGroup,
      elForm: elForm2,
      elFormItemSize,
      elFormItem: elFormItem2
    };
  };
  const useCheckboxGroupId = (props, { elFormItem: elFormItem2 }) => {
    const { inputId: groupId, isLabeledByFormItem } = useFormItemInputId(props, {
      formItemContext: elFormItem2
    });
    return {
      isLabeledByFormItem,
      groupId
    };
  };
  const useModel = (props) => {
    const selfModel = vue.ref(false);
    const { emit } = vue.getCurrentInstance();
    const { isGroup, checkboxGroup, elFormItem: elFormItem2 } = useCheckboxGroup();
    const isLimitExceeded = vue.ref(false);
    const model = vue.computed({
      get() {
        var _a3, _b2;
        return isGroup.value ? (_a3 = checkboxGroup.modelValue) == null ? void 0 : _a3.value : (_b2 = props.modelValue) != null ? _b2 : selfModel.value;
      },
      set(val) {
        var _a3;
        if (isGroup.value && Array.isArray(val)) {
          isLimitExceeded.value = checkboxGroup.max !== void 0 && val.length > checkboxGroup.max.value;
          isLimitExceeded.value === false && ((_a3 = checkboxGroup == null ? void 0 : checkboxGroup.changeEvent) == null ? void 0 : _a3.call(checkboxGroup, val));
        } else {
          emit(UPDATE_MODEL_EVENT, val);
          selfModel.value = val;
        }
      }
    });
    return {
      model,
      isGroup,
      isLimitExceeded,
      elFormItem: elFormItem2
    };
  };
  const useCheckboxStatus = (props, slots, { model }) => {
    const { isGroup, checkboxGroup } = useCheckboxGroup();
    const focus = vue.ref(false);
    const size = useSize(checkboxGroup == null ? void 0 : checkboxGroup.checkboxGroupSize, { prop: true });
    const isChecked = vue.computed(() => {
      const value = model.value;
      if (toTypeString(value) === "[object Boolean]") {
        return value;
      } else if (Array.isArray(value)) {
        return value.includes(props.label);
      } else if (value !== null && value !== void 0) {
        return value === props.trueLabel;
      } else {
        return !!value;
      }
    });
    const checkboxSize = useSize(vue.computed(() => {
      var _a3;
      return isGroup.value ? (_a3 = checkboxGroup == null ? void 0 : checkboxGroup.checkboxGroupSize) == null ? void 0 : _a3.value : void 0;
    }));
    const hasOwnLabel = vue.computed(() => {
      return !!(slots.default || props.label);
    });
    return {
      isChecked,
      focus,
      size,
      checkboxSize,
      hasOwnLabel
    };
  };
  const useDisabled = (props, {
    model,
    isChecked
  }) => {
    const { elForm: elForm2, isGroup, checkboxGroup } = useCheckboxGroup();
    const isLimitDisabled = vue.computed(() => {
      var _a3, _b2;
      const max = (_a3 = checkboxGroup.max) == null ? void 0 : _a3.value;
      const min = (_b2 = checkboxGroup.min) == null ? void 0 : _b2.value;
      return !!(max || min) && model.value.length >= max && !isChecked.value || model.value.length <= min && isChecked.value;
    });
    const isDisabled = vue.computed(() => {
      var _a3, _b2;
      const disabled = props.disabled || (elForm2 == null ? void 0 : elForm2.disabled);
      return (_b2 = isGroup.value ? ((_a3 = checkboxGroup.disabled) == null ? void 0 : _a3.value) || disabled || isLimitDisabled.value : disabled) != null ? _b2 : false;
    });
    return {
      isDisabled,
      isLimitDisabled
    };
  };
  const setStoreValue = (props, { model }) => {
    function addToStore() {
      if (Array.isArray(model.value) && !model.value.includes(props.label)) {
        model.value.push(props.label);
      } else {
        model.value = props.trueLabel || true;
      }
    }
    props.checked && addToStore();
  };
  const useEvent = (props, {
    model,
    isLimitExceeded,
    hasOwnLabel,
    isDisabled,
    isLabeledByFormItem
  }) => {
    const { elFormItem: elFormItem2, checkboxGroup } = useCheckboxGroup();
    const { emit } = vue.getCurrentInstance();
    function getLabeledValue(value) {
      var _a3, _b2;
      return value === props.trueLabel || value === true ? (_a3 = props.trueLabel) != null ? _a3 : true : (_b2 = props.falseLabel) != null ? _b2 : false;
    }
    function emitChangeEvent(checked, e) {
      emit("change", getLabeledValue(checked), e);
    }
    function handleChange(e) {
      if (isLimitExceeded.value)
        return;
      const target = e.target;
      emit("change", getLabeledValue(target.checked), e);
    }
    async function onClickRoot(e) {
      if (isLimitExceeded.value)
        return;
      if (!hasOwnLabel.value && !isDisabled.value && isLabeledByFormItem.value) {
        model.value = getLabeledValue([false, props.falseLabel].includes(model.value));
        await vue.nextTick();
        emitChangeEvent(model.value, e);
      }
    }
    const validateEvent = vue.computed(() => {
      var _a3;
      return ((_a3 = checkboxGroup.validateEvent) == null ? void 0 : _a3.value) || props.validateEvent;
    });
    vue.watch(() => props.modelValue, () => {
      if (validateEvent.value) {
        elFormItem2 == null ? void 0 : elFormItem2.validate("change").catch((err) => debugWarn());
      }
    });
    return {
      handleChange,
      onClickRoot
    };
  };
  const checkboxEmits = {
    [UPDATE_MODEL_EVENT]: (val) => isString(val) || isNumber(val) || isBoolean(val),
    change: (val) => isString(val) || isNumber(val) || isBoolean(val)
  };
  const checkboxGroupEmits = {
    [UPDATE_MODEL_EVENT]: (val) => isArray(val),
    change: (val) => isArray(val)
  };
  const useCheckbox = (props, slots) => {
    const { model, isGroup, isLimitExceeded, elFormItem: elFormItem2 } = useModel(props);
    const { focus, size, isChecked, checkboxSize, hasOwnLabel } = useCheckboxStatus(props, slots, {
      model
    });
    const { isDisabled } = useDisabled(props, { model, isChecked });
    const { inputId, isLabeledByFormItem } = useFormItemInputId(props, {
      formItemContext: elFormItem2,
      disableIdGeneration: hasOwnLabel,
      disableIdManagement: isGroup
    });
    const { handleChange, onClickRoot } = useEvent(props, {
      model,
      isLimitExceeded,
      hasOwnLabel,
      isDisabled,
      isLabeledByFormItem
    });
    setStoreValue(props, { model });
    return {
      elFormItem: elFormItem2,
      inputId,
      isLabeledByFormItem,
      isChecked,
      isDisabled,
      isGroup,
      checkboxSize,
      hasOwnLabel,
      model,
      handleChange,
      onClickRoot,
      focus,
      size
    };
  };
  const _hoisted_1$a = ["tabindex", "role", "aria-checked"];
  const _hoisted_2$7 = ["id", "aria-hidden", "name", "tabindex", "disabled", "true-value", "false-value"];
  const _hoisted_3$2 = ["id", "aria-hidden", "disabled", "value", "name", "tabindex"];
  const __default__$d = {
    name: "ElCheckbox"
  };
  const _sfc_main$e = /* @__PURE__ */ vue.defineComponent({
    ...__default__$d,
    props: checkboxProps,
    emits: checkboxEmits,
    setup(__props) {
      const props = __props;
      const slots = vue.useSlots();
      const {
        inputId,
        isLabeledByFormItem,
        isChecked,
        isDisabled,
        checkboxSize,
        hasOwnLabel,
        model,
        handleChange,
        onClickRoot,
        focus
      } = useCheckbox(props, slots);
      const ns2 = useNamespace("checkbox");
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(!vue.unref(hasOwnLabel) && vue.unref(isLabeledByFormItem) ? "span" : "label"), {
          class: vue.normalizeClass([
            vue.unref(ns2).b(),
            vue.unref(ns2).m(vue.unref(checkboxSize)),
            vue.unref(ns2).is("disabled", vue.unref(isDisabled)),
            vue.unref(ns2).is("bordered", _ctx.border),
            vue.unref(ns2).is("checked", vue.unref(isChecked))
          ]),
          "aria-controls": _ctx.indeterminate ? _ctx.controls : null,
          onClick: vue.unref(onClickRoot)
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("span", {
              class: vue.normalizeClass([
                vue.unref(ns2).e("input"),
                vue.unref(ns2).is("disabled", vue.unref(isDisabled)),
                vue.unref(ns2).is("checked", vue.unref(isChecked)),
                vue.unref(ns2).is("indeterminate", _ctx.indeterminate),
                vue.unref(ns2).is("focus", vue.unref(focus))
              ]),
              tabindex: _ctx.indeterminate ? 0 : void 0,
              role: _ctx.indeterminate ? "checkbox" : void 0,
              "aria-checked": _ctx.indeterminate ? "mixed" : void 0
            }, [
              _ctx.trueLabel || _ctx.falseLabel ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
                key: 0,
                id: vue.unref(inputId),
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(model) ? model.value = $event : null),
                class: vue.normalizeClass(vue.unref(ns2).e("original")),
                type: "checkbox",
                "aria-hidden": _ctx.indeterminate ? "true" : "false",
                name: _ctx.name,
                tabindex: _ctx.tabindex,
                disabled: vue.unref(isDisabled),
                "true-value": _ctx.trueLabel,
                "false-value": _ctx.falseLabel,
                onChange: _cache[1] || (_cache[1] = (...args) => vue.unref(handleChange) && vue.unref(handleChange)(...args)),
                onFocus: _cache[2] || (_cache[2] = ($event) => focus.value = true),
                onBlur: _cache[3] || (_cache[3] = ($event) => focus.value = false)
              }, null, 42, _hoisted_2$7)), [
                [vue.vModelCheckbox, vue.unref(model)]
              ]) : vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
                key: 1,
                id: vue.unref(inputId),
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => vue.isRef(model) ? model.value = $event : null),
                class: vue.normalizeClass(vue.unref(ns2).e("original")),
                type: "checkbox",
                "aria-hidden": _ctx.indeterminate ? "true" : "false",
                disabled: vue.unref(isDisabled),
                value: _ctx.label,
                name: _ctx.name,
                tabindex: _ctx.tabindex,
                onChange: _cache[5] || (_cache[5] = (...args) => vue.unref(handleChange) && vue.unref(handleChange)(...args)),
                onFocus: _cache[6] || (_cache[6] = ($event) => focus.value = true),
                onBlur: _cache[7] || (_cache[7] = ($event) => focus.value = false)
              }, null, 42, _hoisted_3$2)), [
                [vue.vModelCheckbox, vue.unref(model)]
              ]),
              vue.createElementVNode("span", {
                class: vue.normalizeClass(vue.unref(ns2).e("inner"))
              }, null, 2)
            ], 10, _hoisted_1$a),
            vue.unref(hasOwnLabel) ? (vue.openBlock(), vue.createElementBlock("span", {
              key: 0,
              class: vue.normalizeClass(vue.unref(ns2).e("label"))
            }, [
              vue.renderSlot(_ctx.$slots, "default"),
              !_ctx.$slots.default ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                vue.createTextVNode(vue.toDisplayString(_ctx.label), 1)
              ], 64)) : vue.createCommentVNode("v-if", true)
            ], 2)) : vue.createCommentVNode("v-if", true)
          ]),
          _: 3
        }, 8, ["class", "aria-controls", "onClick"]);
      };
    }
  });
  var Checkbox = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox.vue"]]);
  const _hoisted_1$9 = ["name", "tabindex", "disabled", "true-value", "false-value"];
  const _hoisted_2$6 = ["name", "tabindex", "disabled", "value"];
  const __default__$c = {
    name: "ElCheckboxButton"
  };
  const _sfc_main$d = /* @__PURE__ */ vue.defineComponent({
    ...__default__$c,
    props: checkboxProps,
    emits: checkboxEmits,
    setup(__props) {
      const props = __props;
      const slots = vue.useSlots();
      const { focus, isChecked, isDisabled, size, model, handleChange } = useCheckbox(props, slots);
      const { checkboxGroup } = useCheckboxGroup();
      const ns2 = useNamespace("checkbox");
      const activeStyle = vue.computed(() => {
        var _a3, _b2, _c, _d;
        const fillValue = (_b2 = (_a3 = checkboxGroup == null ? void 0 : checkboxGroup.fill) == null ? void 0 : _a3.value) != null ? _b2 : "";
        return {
          backgroundColor: fillValue,
          borderColor: fillValue,
          color: (_d = (_c = checkboxGroup == null ? void 0 : checkboxGroup.textColor) == null ? void 0 : _c.value) != null ? _d : "",
          boxShadow: fillValue ? `-1px 0 0 0 ${fillValue}` : void 0
        };
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("label", {
          class: vue.normalizeClass([
            vue.unref(ns2).b("button"),
            vue.unref(ns2).bm("button", vue.unref(size)),
            vue.unref(ns2).is("disabled", vue.unref(isDisabled)),
            vue.unref(ns2).is("checked", vue.unref(isChecked)),
            vue.unref(ns2).is("focus", vue.unref(focus))
          ])
        }, [
          _ctx.trueLabel || _ctx.falseLabel ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
            key: 0,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(model) ? model.value = $event : null),
            class: vue.normalizeClass(vue.unref(ns2).be("button", "original")),
            type: "checkbox",
            name: _ctx.name,
            tabindex: _ctx.tabindex,
            disabled: vue.unref(isDisabled),
            "true-value": _ctx.trueLabel,
            "false-value": _ctx.falseLabel,
            onChange: _cache[1] || (_cache[1] = (...args) => vue.unref(handleChange) && vue.unref(handleChange)(...args)),
            onFocus: _cache[2] || (_cache[2] = ($event) => focus.value = true),
            onBlur: _cache[3] || (_cache[3] = ($event) => focus.value = false)
          }, null, 42, _hoisted_1$9)), [
            [vue.vModelCheckbox, vue.unref(model)]
          ]) : vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
            key: 1,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => vue.isRef(model) ? model.value = $event : null),
            class: vue.normalizeClass(vue.unref(ns2).be("button", "original")),
            type: "checkbox",
            name: _ctx.name,
            tabindex: _ctx.tabindex,
            disabled: vue.unref(isDisabled),
            value: _ctx.label,
            onChange: _cache[5] || (_cache[5] = (...args) => vue.unref(handleChange) && vue.unref(handleChange)(...args)),
            onFocus: _cache[6] || (_cache[6] = ($event) => focus.value = true),
            onBlur: _cache[7] || (_cache[7] = ($event) => focus.value = false)
          }, null, 42, _hoisted_2$6)), [
            [vue.vModelCheckbox, vue.unref(model)]
          ]),
          _ctx.$slots.default || _ctx.label ? (vue.openBlock(), vue.createElementBlock("span", {
            key: 2,
            class: vue.normalizeClass(vue.unref(ns2).be("button", "inner")),
            style: vue.normalizeStyle(vue.unref(isChecked) ? vue.unref(activeStyle) : void 0)
          }, [
            vue.renderSlot(_ctx.$slots, "default", {}, () => [
              vue.createTextVNode(vue.toDisplayString(_ctx.label), 1)
            ])
          ], 6)) : vue.createCommentVNode("v-if", true)
        ], 2);
      };
    }
  });
  var CheckboxButton = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox-button.vue"]]);
  const __default__$b = {
    name: "ElCheckboxGroup"
  };
  const _sfc_main$c = /* @__PURE__ */ vue.defineComponent({
    ...__default__$b,
    props: useCheckboxGroupProps,
    emits: checkboxGroupEmits,
    setup(__props, { emit }) {
      const props = __props;
      const { elFormItem: elFormItem2 } = useCheckboxGroup();
      const { groupId, isLabeledByFormItem } = useCheckboxGroupId(props, {
        elFormItem: elFormItem2
      });
      const checkboxGroupSize = useSize();
      const ns2 = useNamespace("checkbox");
      const changeEvent = (value) => {
        emit(UPDATE_MODEL_EVENT, value);
        vue.nextTick(() => {
          emit("change", value);
        });
      };
      const modelValue = vue.computed({
        get() {
          return props.modelValue;
        },
        set(val) {
          changeEvent(val);
        }
      });
      vue.provide("CheckboxGroup", {
        name: "ElCheckboxGroup",
        ...vue.toRefs(props),
        modelValue,
        checkboxGroupSize,
        changeEvent
      });
      vue.watch(() => props.modelValue, () => {
        if (props.validateEvent) {
          elFormItem2 == null ? void 0 : elFormItem2.validate("change").catch((err) => debugWarn());
        }
      });
      return (_ctx, _cache) => {
        var _a3;
        return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.tag), {
          id: vue.unref(groupId),
          class: vue.normalizeClass(vue.unref(ns2).b("group")),
          role: "group",
          "aria-label": !vue.unref(isLabeledByFormItem) ? _ctx.label || "checkbox-group" : void 0,
          "aria-labelledby": vue.unref(isLabeledByFormItem) ? (_a3 = vue.unref(elFormItem2)) == null ? void 0 : _a3.labelId : void 0
        }, {
          default: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 8, ["id", "class", "aria-label", "aria-labelledby"]);
      };
    }
  });
  var CheckboxGroup = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox-group.vue"]]);
  const ElCheckbox = withInstall(Checkbox, {
    CheckboxButton,
    CheckboxGroup
  });
  withNoopInstall(CheckboxButton);
  withNoopInstall(CheckboxGroup);
  const messageConfig = {};
  const configProviderProps = buildProps({
    a11y: {
      type: Boolean,
      default: true
    },
    locale: {
      type: definePropType(Object)
    },
    size: useSizeProp,
    button: {
      type: definePropType(Object)
    },
    experimentalFeatures: {
      type: definePropType(Object)
    },
    keyboardNavigation: {
      type: Boolean,
      default: true
    },
    message: {
      type: definePropType(Object)
    },
    zIndex: Number,
    namespace: {
      type: String,
      default: "el"
    }
  });
  vue.defineComponent({
    name: "ElConfigProvider",
    props: configProviderProps,
    setup(props, { slots }) {
      vue.watch(() => props.message, (val) => {
        Object.assign(messageConfig, val != null ? val : {});
      }, { immediate: true, deep: true });
      const config = provideGlobalConfig(props);
      return () => vue.renderSlot(slots, "default", { config: config == null ? void 0 : config.value });
    }
  });
  const overlayProps = buildProps({
    mask: {
      type: Boolean,
      default: true
    },
    customMaskEvent: {
      type: Boolean,
      default: false
    },
    overlayClass: {
      type: definePropType([
        String,
        Array,
        Object
      ])
    },
    zIndex: {
      type: definePropType([String, Number])
    }
  });
  const overlayEmits = {
    click: (evt) => evt instanceof MouseEvent
  };
  var Overlay = vue.defineComponent({
    name: "ElOverlay",
    props: overlayProps,
    emits: overlayEmits,
    setup(props, { slots, emit }) {
      const ns2 = useNamespace("overlay");
      const onMaskClick = (e) => {
        emit("click", e);
      };
      const { onClick, onMousedown, onMouseup } = useSameTarget(props.customMaskEvent ? void 0 : onMaskClick);
      return () => {
        return props.mask ? vue.createVNode("div", {
          class: [ns2.b(), props.overlayClass],
          style: {
            zIndex: props.zIndex
          },
          onClick,
          onMousedown,
          onMouseup
        }, [vue.renderSlot(slots, "default")], PatchFlags.STYLE | PatchFlags.CLASS | PatchFlags.PROPS, ["onClick", "onMouseup", "onMousedown"]) : vue.h("div", {
          class: props.overlayClass,
          style: {
            zIndex: props.zIndex,
            position: "fixed",
            top: "0px",
            right: "0px",
            bottom: "0px",
            left: "0px"
          }
        }, [vue.renderSlot(slots, "default")]);
      };
    }
  });
  const ElOverlay = Overlay;
  const dialogContentProps = buildProps({
    center: {
      type: Boolean,
      default: false
    },
    closeIcon: {
      type: iconPropType,
      default: ""
    },
    customClass: {
      type: String,
      default: ""
    },
    draggable: {
      type: Boolean,
      default: false
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ""
    }
  });
  const dialogContentEmits = {
    close: () => true
  };
  const _hoisted_1$8 = ["aria-label"];
  const _hoisted_2$5 = ["id"];
  const __default__$a = { name: "ElDialogContent" };
  const _sfc_main$b = /* @__PURE__ */ vue.defineComponent({
    ...__default__$a,
    props: dialogContentProps,
    emits: dialogContentEmits,
    setup(__props) {
      const props = __props;
      const { t } = useLocale();
      const { Close } = CloseComponents;
      const { dialogRef, headerRef, bodyId, ns: ns2, style } = vue.inject(dialogInjectionKey);
      const { focusTrapRef } = vue.inject(FOCUS_TRAP_INJECTION_KEY);
      const composedDialogRef = composeRefs(focusTrapRef, dialogRef);
      const draggable = vue.computed(() => props.draggable);
      useDraggable(dialogRef, headerRef, draggable);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          ref: vue.unref(composedDialogRef),
          class: vue.normalizeClass([
            vue.unref(ns2).b(),
            vue.unref(ns2).is("fullscreen", _ctx.fullscreen),
            vue.unref(ns2).is("draggable", vue.unref(draggable)),
            { [vue.unref(ns2).m("center")]: _ctx.center },
            _ctx.customClass
          ]),
          style: vue.normalizeStyle(vue.unref(style)),
          tabindex: "-1",
          onClick: _cache[1] || (_cache[1] = vue.withModifiers(() => {
          }, ["stop"]))
        }, [
          vue.createElementVNode("header", {
            ref_key: "headerRef",
            ref: headerRef,
            class: vue.normalizeClass(vue.unref(ns2).e("header"))
          }, [
            vue.renderSlot(_ctx.$slots, "header", {}, () => [
              vue.createElementVNode("span", {
                role: "heading",
                class: vue.normalizeClass(vue.unref(ns2).e("title"))
              }, vue.toDisplayString(_ctx.title), 3)
            ]),
            _ctx.showClose ? (vue.openBlock(), vue.createElementBlock("button", {
              key: 0,
              "aria-label": vue.unref(t)("el.dialog.close"),
              class: vue.normalizeClass(vue.unref(ns2).e("headerbtn")),
              type: "button",
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close"))
            }, [
              vue.createVNode(vue.unref(ElIcon), {
                class: vue.normalizeClass(vue.unref(ns2).e("close"))
              }, {
                default: vue.withCtx(() => [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.closeIcon || vue.unref(Close))))
                ]),
                _: 1
              }, 8, ["class"])
            ], 10, _hoisted_1$8)) : vue.createCommentVNode("v-if", true)
          ], 2),
          vue.createElementVNode("div", {
            id: vue.unref(bodyId),
            class: vue.normalizeClass(vue.unref(ns2).e("body"))
          }, [
            vue.renderSlot(_ctx.$slots, "default")
          ], 10, _hoisted_2$5),
          _ctx.$slots.footer ? (vue.openBlock(), vue.createElementBlock("footer", {
            key: 0,
            class: vue.normalizeClass(vue.unref(ns2).e("footer"))
          }, [
            vue.renderSlot(_ctx.$slots, "footer")
          ], 2)) : vue.createCommentVNode("v-if", true)
        ], 6);
      };
    }
  });
  var ElDialogContent = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/dialog/src/dialog-content.vue"]]);
  const dialogProps = buildProps({
    ...dialogContentProps,
    appendToBody: {
      type: Boolean,
      default: false
    },
    beforeClose: {
      type: definePropType(Function)
    },
    destroyOnClose: {
      type: Boolean,
      default: false
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    modal: {
      type: Boolean,
      default: true
    },
    openDelay: {
      type: Number,
      default: 0
    },
    closeDelay: {
      type: Number,
      default: 0
    },
    top: {
      type: String
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    modalClass: String,
    width: {
      type: [String, Number]
    },
    zIndex: {
      type: Number
    },
    trapFocus: {
      type: Boolean,
      default: false
    }
  });
  const dialogEmits = {
    open: () => true,
    opened: () => true,
    close: () => true,
    closed: () => true,
    [UPDATE_MODEL_EVENT]: (value) => isBoolean(value),
    openAutoFocus: () => true,
    closeAutoFocus: () => true
  };
  const useDialog = (props, targetRef) => {
    const instance = vue.getCurrentInstance();
    const emit = instance.emit;
    const { nextZIndex } = useZIndex();
    let lastPosition = "";
    const titleId = useId();
    const bodyId = useId();
    const visible = vue.ref(false);
    const closed = vue.ref(false);
    const rendered = vue.ref(false);
    const zIndex2 = vue.ref(props.zIndex || nextZIndex());
    let openTimer = void 0;
    let closeTimer = void 0;
    const namespace = useGlobalConfig("namespace", defaultNamespace);
    const style = vue.computed(() => {
      const style2 = {};
      const varPrefix = `--${namespace.value}-dialog`;
      if (!props.fullscreen) {
        if (props.top) {
          style2[`${varPrefix}-margin-top`] = props.top;
        }
        if (props.width) {
          style2[`${varPrefix}-width`] = addUnit(props.width);
        }
      }
      return style2;
    });
    function afterEnter() {
      emit("opened");
    }
    function afterLeave() {
      emit("closed");
      emit(UPDATE_MODEL_EVENT, false);
      if (props.destroyOnClose) {
        rendered.value = false;
      }
    }
    function beforeLeave() {
      emit("close");
    }
    function open() {
      closeTimer == null ? void 0 : closeTimer();
      openTimer == null ? void 0 : openTimer();
      if (props.openDelay && props.openDelay > 0) {
        ({ stop: openTimer } = useTimeoutFn(() => doOpen(), props.openDelay));
      } else {
        doOpen();
      }
    }
    function close() {
      openTimer == null ? void 0 : openTimer();
      closeTimer == null ? void 0 : closeTimer();
      if (props.closeDelay && props.closeDelay > 0) {
        ({ stop: closeTimer } = useTimeoutFn(() => doClose(), props.closeDelay));
      } else {
        doClose();
      }
    }
    function handleClose() {
      function hide(shouldCancel) {
        if (shouldCancel)
          return;
        closed.value = true;
        visible.value = false;
      }
      if (props.beforeClose) {
        props.beforeClose(hide);
      } else {
        close();
      }
    }
    function onModalClick() {
      if (props.closeOnClickModal) {
        handleClose();
      }
    }
    function doOpen() {
      if (!isClient)
        return;
      visible.value = true;
    }
    function doClose() {
      visible.value = false;
    }
    function onOpenAutoFocus() {
      emit("openAutoFocus");
    }
    function onCloseAutoFocus() {
      emit("closeAutoFocus");
    }
    if (props.lockScroll) {
      useLockscreen(visible);
    }
    function onCloseRequested() {
      if (props.closeOnPressEscape) {
        handleClose();
      }
    }
    vue.watch(() => props.modelValue, (val) => {
      if (val) {
        closed.value = false;
        open();
        rendered.value = true;
        emit("open");
        zIndex2.value = props.zIndex ? zIndex2.value++ : nextZIndex();
        vue.nextTick(() => {
          if (targetRef.value) {
            targetRef.value.scrollTop = 0;
          }
        });
      } else {
        if (visible.value) {
          close();
        }
      }
    });
    vue.watch(() => props.fullscreen, (val) => {
      if (!targetRef.value)
        return;
      if (val) {
        lastPosition = targetRef.value.style.transform;
        targetRef.value.style.transform = "";
      } else {
        targetRef.value.style.transform = lastPosition;
      }
    });
    vue.onMounted(() => {
      if (props.modelValue) {
        visible.value = true;
        rendered.value = true;
        open();
      }
    });
    return {
      afterEnter,
      afterLeave,
      beforeLeave,
      handleClose,
      onModalClick,
      close,
      doClose,
      onOpenAutoFocus,
      onCloseAutoFocus,
      onCloseRequested,
      titleId,
      bodyId,
      closed,
      style,
      rendered,
      visible,
      zIndex: zIndex2
    };
  };
  const _hoisted_1$7 = ["aria-label", "aria-labelledby", "aria-describedby"];
  const __default__$9 = {
    name: "ElDialog"
  };
  const _sfc_main$a = /* @__PURE__ */ vue.defineComponent({
    ...__default__$9,
    props: dialogProps,
    emits: dialogEmits,
    setup(__props, { expose }) {
      const props = __props;
      const slots = vue.useSlots();
      useDeprecated({
        scope: "el-dialog",
        from: "the title slot",
        replacement: "the header slot",
        version: "3.0.0",
        ref: "https://element-plus.org/en-US/component/dialog.html#slots"
      }, vue.computed(() => !!slots.title));
      const ns2 = useNamespace("dialog");
      const dialogRef = vue.ref();
      const headerRef = vue.ref();
      const dialogContentRef = vue.ref();
      const {
        visible,
        titleId,
        bodyId,
        style,
        rendered,
        zIndex: zIndex2,
        afterEnter,
        afterLeave,
        beforeLeave,
        handleClose,
        onModalClick,
        onOpenAutoFocus,
        onCloseAutoFocus,
        onCloseRequested
      } = useDialog(props, dialogRef);
      vue.provide(dialogInjectionKey, {
        dialogRef,
        headerRef,
        bodyId,
        ns: ns2,
        rendered,
        style
      });
      const overlayEvent = useSameTarget(onModalClick);
      const draggable = vue.computed(() => props.draggable && !props.fullscreen);
      expose({
        visible,
        dialogContentRef
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(vue.Teleport, {
          to: "body",
          disabled: !_ctx.appendToBody
        }, [
          vue.createVNode(vue.Transition, {
            name: "dialog-fade",
            onAfterEnter: vue.unref(afterEnter),
            onAfterLeave: vue.unref(afterLeave),
            onBeforeLeave: vue.unref(beforeLeave),
            persisted: ""
          }, {
            default: vue.withCtx(() => [
              vue.withDirectives(vue.createVNode(vue.unref(ElOverlay), {
                "custom-mask-event": "",
                mask: _ctx.modal,
                "overlay-class": _ctx.modalClass,
                "z-index": vue.unref(zIndex2)
              }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("div", {
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-label": _ctx.title || void 0,
                    "aria-labelledby": !_ctx.title ? vue.unref(titleId) : void 0,
                    "aria-describedby": vue.unref(bodyId),
                    class: vue.normalizeClass(`${vue.unref(ns2).namespace.value}-overlay-dialog`),
                    onClick: _cache[0] || (_cache[0] = (...args) => vue.unref(overlayEvent).onClick && vue.unref(overlayEvent).onClick(...args)),
                    onMousedown: _cache[1] || (_cache[1] = (...args) => vue.unref(overlayEvent).onMousedown && vue.unref(overlayEvent).onMousedown(...args)),
                    onMouseup: _cache[2] || (_cache[2] = (...args) => vue.unref(overlayEvent).onMouseup && vue.unref(overlayEvent).onMouseup(...args))
                  }, [
                    vue.createVNode(vue.unref(ElFocusTrap), {
                      loop: "",
                      trapped: vue.unref(visible),
                      "focus-start-el": "container",
                      onFocusAfterTrapped: vue.unref(onOpenAutoFocus),
                      onFocusAfterReleased: vue.unref(onCloseAutoFocus),
                      onReleaseRequested: vue.unref(onCloseRequested)
                    }, {
                      default: vue.withCtx(() => [
                        vue.unref(rendered) ? (vue.openBlock(), vue.createBlock(ElDialogContent, {
                          key: 0,
                          ref_key: "dialogContentRef",
                          ref: dialogContentRef,
                          "custom-class": _ctx.customClass,
                          center: _ctx.center,
                          "close-icon": _ctx.closeIcon,
                          draggable: vue.unref(draggable),
                          fullscreen: _ctx.fullscreen,
                          "show-close": _ctx.showClose,
                          title: _ctx.title,
                          onClose: vue.unref(handleClose)
                        }, vue.createSlots({
                          header: vue.withCtx(() => [
                            !_ctx.$slots.title ? vue.renderSlot(_ctx.$slots, "header", {
                              key: 0,
                              close: vue.unref(handleClose),
                              titleId: vue.unref(titleId),
                              titleClass: vue.unref(ns2).e("title")
                            }) : vue.renderSlot(_ctx.$slots, "title", { key: 1 })
                          ]),
                          default: vue.withCtx(() => [
                            vue.renderSlot(_ctx.$slots, "default")
                          ]),
                          _: 2
                        }, [
                          _ctx.$slots.footer ? {
                            name: "footer",
                            fn: vue.withCtx(() => [
                              vue.renderSlot(_ctx.$slots, "footer")
                            ])
                          } : void 0
                        ]), 1032, ["custom-class", "center", "close-icon", "draggable", "fullscreen", "show-close", "title", "onClose"])) : vue.createCommentVNode("v-if", true)
                      ]),
                      _: 3
                    }, 8, ["trapped", "onFocusAfterTrapped", "onFocusAfterReleased", "onReleaseRequested"])
                  ], 42, _hoisted_1$7)
                ]),
                _: 3
              }, 8, ["mask", "overlay-class", "z-index"]), [
                [vue.vShow, vue.unref(visible)]
              ])
            ]),
            _: 3
          }, 8, ["onAfterEnter", "onAfterLeave", "onBeforeLeave"])
        ], 8, ["disabled"]);
      };
    }
  });
  var Dialog = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/dialog/src/dialog.vue"]]);
  const ElDialog = withInstall(Dialog);
  const dividerProps = buildProps({
    direction: {
      type: String,
      values: ["horizontal", "vertical"],
      default: "horizontal"
    },
    contentPosition: {
      type: String,
      values: ["left", "center", "right"],
      default: "center"
    },
    borderStyle: {
      type: definePropType(String),
      default: "solid"
    }
  });
  const __default__$8 = {
    name: "ElDivider"
  };
  const _sfc_main$9 = /* @__PURE__ */ vue.defineComponent({
    ...__default__$8,
    props: dividerProps,
    setup(__props) {
      const props = __props;
      const ns2 = useNamespace("divider");
      const dividerStyle = vue.computed(() => {
        return ns2.cssVar({
          "border-style": props.borderStyle
        });
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass([vue.unref(ns2).b(), vue.unref(ns2).m(_ctx.direction)]),
          style: vue.normalizeStyle(vue.unref(dividerStyle)),
          role: "separator"
        }, [
          _ctx.$slots.default && _ctx.direction !== "vertical" ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            class: vue.normalizeClass([vue.unref(ns2).e("text"), vue.unref(ns2).is(_ctx.contentPosition)])
          }, [
            vue.renderSlot(_ctx.$slots, "default")
          ], 2)) : vue.createCommentVNode("v-if", true)
        ], 6);
      };
    }
  });
  var Divider = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/divider/src/divider.vue"]]);
  const ElDivider = withInstall(Divider);
  const formProps = buildProps({
    model: Object,
    rules: {
      type: definePropType(Object)
    },
    labelPosition: {
      type: String,
      values: ["left", "right", "top"],
      default: "right"
    },
    labelWidth: {
      type: [String, Number],
      default: ""
    },
    labelSuffix: {
      type: String,
      default: ""
    },
    inline: Boolean,
    inlineMessage: Boolean,
    statusIcon: Boolean,
    showMessage: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      values: componentSizes
    },
    disabled: Boolean,
    validateOnRuleChange: {
      type: Boolean,
      default: true
    },
    hideRequiredAsterisk: {
      type: Boolean,
      default: false
    },
    scrollToError: Boolean
  });
  const formEmits = {
    validate: (prop, isValid, message2) => (isArray(prop) || isString(prop)) && isBoolean(isValid) && isString(message2)
  };
  function useFormLabelWidth() {
    const potentialLabelWidthArr = vue.ref([]);
    const autoLabelWidth = vue.computed(() => {
      if (!potentialLabelWidthArr.value.length)
        return "0";
      const max = Math.max(...potentialLabelWidthArr.value);
      return max ? `${max}px` : "";
    });
    function getLabelWidthIndex(width) {
      const index2 = potentialLabelWidthArr.value.indexOf(width);
      return index2;
    }
    function registerLabelWidth(val, oldVal) {
      if (val && oldVal) {
        const index2 = getLabelWidthIndex(oldVal);
        potentialLabelWidthArr.value.splice(index2, 1, val);
      } else if (val) {
        potentialLabelWidthArr.value.push(val);
      }
    }
    function deregisterLabelWidth(val) {
      const index2 = getLabelWidthIndex(val);
      if (index2 > -1) {
        potentialLabelWidthArr.value.splice(index2, 1);
      }
    }
    return {
      autoLabelWidth,
      registerLabelWidth,
      deregisterLabelWidth
    };
  }
  const filterFields = (fields, props) => {
    const normalized = castArray(props);
    return normalized.length > 0 ? fields.filter((field) => field.prop && normalized.includes(field.prop)) : fields;
  };
  const __default__$7 = {
    name: "ElForm"
  };
  const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent({
    ...__default__$7,
    props: formProps,
    emits: formEmits,
    setup(__props, { expose, emit }) {
      const props = __props;
      const fields = [];
      const formSize = useSize();
      const ns2 = useNamespace("form");
      const formClasses = vue.computed(() => {
        const { labelPosition, inline } = props;
        return [
          ns2.b(),
          ns2.m(formSize.value || "default"),
          {
            [ns2.m(`label-${labelPosition}`)]: labelPosition,
            [ns2.m("inline")]: inline
          }
        ];
      });
      const addField = (field) => {
        fields.push(field);
      };
      const removeField = (field) => {
        if (field.prop) {
          fields.splice(fields.indexOf(field), 1);
        }
      };
      const resetFields = (properties = []) => {
        if (!props.model) {
          return;
        }
        filterFields(fields, properties).forEach((field) => field.resetField());
      };
      const clearValidate = (props2 = []) => {
        filterFields(fields, props2).forEach((field) => field.clearValidate());
      };
      const isValidatable = vue.computed(() => {
        const hasModel = !!props.model;
        return hasModel;
      });
      const obtainValidateFields = (props2) => {
        if (fields.length === 0)
          return [];
        const filteredFields = filterFields(fields, props2);
        if (!filteredFields.length) {
          return [];
        }
        return filteredFields;
      };
      const validate2 = async (callback) => validateField(void 0, callback);
      const doValidateField = async (props2 = []) => {
        if (!isValidatable.value)
          return false;
        const fields2 = obtainValidateFields(props2);
        if (fields2.length === 0)
          return true;
        let validationErrors = {};
        for (const field of fields2) {
          try {
            await field.validate("");
          } catch (fields3) {
            validationErrors = {
              ...validationErrors,
              ...fields3
            };
          }
        }
        if (Object.keys(validationErrors).length === 0)
          return true;
        return Promise.reject(validationErrors);
      };
      const validateField = async (modelProps = [], callback) => {
        const shouldThrow = !isFunction(callback);
        try {
          const result = await doValidateField(modelProps);
          if (result === true) {
            callback == null ? void 0 : callback(result);
          }
          return result;
        } catch (e) {
          const invalidFields = e;
          if (props.scrollToError) {
            scrollToField(Object.keys(invalidFields)[0]);
          }
          callback == null ? void 0 : callback(false, invalidFields);
          return shouldThrow && Promise.reject(invalidFields);
        }
      };
      const scrollToField = (prop) => {
        var _a3;
        const field = filterFields(fields, prop)[0];
        if (field) {
          (_a3 = field.$el) == null ? void 0 : _a3.scrollIntoView();
        }
      };
      vue.watch(() => props.rules, () => {
        if (props.validateOnRuleChange) {
          validate2().catch((err) => debugWarn());
        }
      }, { deep: true });
      vue.provide(formContextKey, vue.reactive({
        ...vue.toRefs(props),
        emit,
        resetFields,
        clearValidate,
        validateField,
        addField,
        removeField,
        ...useFormLabelWidth()
      }));
      expose({
        validate: validate2,
        validateField,
        resetFields,
        clearValidate,
        scrollToField
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("form", {
          class: vue.normalizeClass(vue.unref(formClasses))
        }, [
          vue.renderSlot(_ctx.$slots, "default")
        ], 2);
      };
    }
  });
  var Form = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/form/src/form.vue"]]);
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
      for (var i2 = 1; i2 < arguments.length; i2++) {
        var source = arguments[i2];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
      return o2.__proto__ || Object.getPrototypeOf(o2);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _setPrototypeOf(o, p);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct)
      return false;
    if (Reflect.construct.sham)
      return false;
    if (typeof Proxy === "function")
      return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      }));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct.bind();
    } else {
      _construct = function _construct2(Parent2, args2, Class2) {
        var a = [null];
        a.push.apply(a, args2);
        var Constructor = Function.bind.apply(Parent2, a);
        var instance = new Constructor();
        if (Class2)
          _setPrototypeOf(instance, Class2.prototype);
        return instance;
      };
    }
    return _construct.apply(null, arguments);
  }
  function _isNativeFunction(fn2) {
    return Function.toString.call(fn2).indexOf("[native code]") !== -1;
  }
  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
    _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
      if (Class2 === null || !_isNativeFunction(Class2))
        return Class2;
      if (typeof Class2 !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }
      if (typeof _cache !== "undefined") {
        if (_cache.has(Class2))
          return _cache.get(Class2);
        _cache.set(Class2, Wrapper);
      }
      function Wrapper() {
        return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
      }
      Wrapper.prototype = Object.create(Class2.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class2);
    };
    return _wrapNativeSuper(Class);
  }
  var formatRegExp = /%[sdj%]/g;
  var warning = function warning2() {
  };
  if (typeof process !== "undefined" && process.env && false) {
    warning = function warning2(type2, errors) {
      if (typeof console !== "undefined" && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING === "undefined") {
        if (errors.every(function(e) {
          return typeof e === "string";
        })) {
          console.warn(type2, errors);
        }
      }
    };
  }
  function convertFieldsError(errors) {
    if (!errors || !errors.length)
      return null;
    var fields = {};
    errors.forEach(function(error) {
      var field = error.field;
      fields[field] = fields[field] || [];
      fields[field].push(error);
    });
    return fields;
  }
  function format(template2) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    var i2 = 0;
    var len = args.length;
    if (typeof template2 === "function") {
      return template2.apply(null, args);
    }
    if (typeof template2 === "string") {
      var str = template2.replace(formatRegExp, function(x) {
        if (x === "%%") {
          return "%";
        }
        if (i2 >= len) {
          return x;
        }
        switch (x) {
          case "%s":
            return String(args[i2++]);
          case "%d":
            return Number(args[i2++]);
          case "%j":
            try {
              return JSON.stringify(args[i2++]);
            } catch (_) {
              return "[Circular]";
            }
            break;
          default:
            return x;
        }
      });
      return str;
    }
    return template2;
  }
  function isNativeStringType(type2) {
    return type2 === "string" || type2 === "url" || type2 === "hex" || type2 === "email" || type2 === "date" || type2 === "pattern";
  }
  function isEmptyValue(value, type2) {
    if (value === void 0 || value === null) {
      return true;
    }
    if (type2 === "array" && Array.isArray(value) && !value.length) {
      return true;
    }
    if (isNativeStringType(type2) && typeof value === "string" && !value) {
      return true;
    }
    return false;
  }
  function asyncParallelArray(arr, func, callback) {
    var results = [];
    var total = 0;
    var arrLength = arr.length;
    function count(errors) {
      results.push.apply(results, errors || []);
      total++;
      if (total === arrLength) {
        callback(results);
      }
    }
    arr.forEach(function(a) {
      func(a, count);
    });
  }
  function asyncSerialArray(arr, func, callback) {
    var index2 = 0;
    var arrLength = arr.length;
    function next(errors) {
      if (errors && errors.length) {
        callback(errors);
        return;
      }
      var original = index2;
      index2 = index2 + 1;
      if (original < arrLength) {
        func(arr[original], next);
      } else {
        callback([]);
      }
    }
    next([]);
  }
  function flattenObjArr(objArr) {
    var ret = [];
    Object.keys(objArr).forEach(function(k) {
      ret.push.apply(ret, objArr[k] || []);
    });
    return ret;
  }
  var AsyncValidationError = /* @__PURE__ */ function(_Error) {
    _inheritsLoose(AsyncValidationError2, _Error);
    function AsyncValidationError2(errors, fields) {
      var _this;
      _this = _Error.call(this, "Async Validation Error") || this;
      _this.errors = errors;
      _this.fields = fields;
      return _this;
    }
    return AsyncValidationError2;
  }(/* @__PURE__ */ _wrapNativeSuper(Error));
  function asyncMap(objArr, option, func, callback, source) {
    if (option.first) {
      var _pending = new Promise(function(resolve, reject) {
        var next = function next2(errors) {
          callback(errors);
          return errors.length ? reject(new AsyncValidationError(errors, convertFieldsError(errors))) : resolve(source);
        };
        var flattenArr = flattenObjArr(objArr);
        asyncSerialArray(flattenArr, func, next);
      });
      _pending["catch"](function(e) {
        return e;
      });
      return _pending;
    }
    var firstFields = option.firstFields === true ? Object.keys(objArr) : option.firstFields || [];
    var objArrKeys = Object.keys(objArr);
    var objArrLength = objArrKeys.length;
    var total = 0;
    var results = [];
    var pending = new Promise(function(resolve, reject) {
      var next = function next2(errors) {
        results.push.apply(results, errors);
        total++;
        if (total === objArrLength) {
          callback(results);
          return results.length ? reject(new AsyncValidationError(results, convertFieldsError(results))) : resolve(source);
        }
      };
      if (!objArrKeys.length) {
        callback(results);
        resolve(source);
      }
      objArrKeys.forEach(function(key) {
        var arr = objArr[key];
        if (firstFields.indexOf(key) !== -1) {
          asyncSerialArray(arr, func, next);
        } else {
          asyncParallelArray(arr, func, next);
        }
      });
    });
    pending["catch"](function(e) {
      return e;
    });
    return pending;
  }
  function isErrorObj(obj) {
    return !!(obj && obj.message !== void 0);
  }
  function getValue(value, path) {
    var v = value;
    for (var i2 = 0; i2 < path.length; i2++) {
      if (v == void 0) {
        return v;
      }
      v = v[path[i2]];
    }
    return v;
  }
  function complementError(rule, source) {
    return function(oe) {
      var fieldValue;
      if (rule.fullFields) {
        fieldValue = getValue(source, rule.fullFields);
      } else {
        fieldValue = source[oe.field || rule.fullField];
      }
      if (isErrorObj(oe)) {
        oe.field = oe.field || rule.fullField;
        oe.fieldValue = fieldValue;
        return oe;
      }
      return {
        message: typeof oe === "function" ? oe() : oe,
        fieldValue,
        field: oe.field || rule.fullField
      };
    };
  }
  function deepMerge(target, source) {
    if (source) {
      for (var s in source) {
        if (source.hasOwnProperty(s)) {
          var value = source[s];
          if (typeof value === "object" && typeof target[s] === "object") {
            target[s] = _extends({}, target[s], value);
          } else {
            target[s] = value;
          }
        }
      }
    }
    return target;
  }
  var required$1 = function required2(rule, value, source, errors, options, type2) {
    if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type2 || rule.type))) {
      errors.push(format(options.messages.required, rule.fullField));
    }
  };
  var whitespace = function whitespace2(rule, value, source, errors, options) {
    if (/^\s+$/.test(value) || value === "") {
      errors.push(format(options.messages.whitespace, rule.fullField));
    }
  };
  var urlReg;
  var getUrlRegex = function() {
    if (urlReg) {
      return urlReg;
    }
    var word = "[a-fA-F\\d:]";
    var b = function b2(options) {
      return options && options.includeBoundaries ? "(?:(?<=\\s|^)(?=" + word + ")|(?<=" + word + ")(?=\\s|$))" : "";
    };
    var v42 = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}";
    var v6seg = "[a-fA-F\\d]{1,4}";
    var v6 = ("\n(?:\n(?:" + v6seg + ":){7}(?:" + v6seg + "|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8\n(?:" + v6seg + ":){6}(?:" + v42 + "|:" + v6seg + "|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4\n(?:" + v6seg + ":){5}(?::" + v42 + "|(?::" + v6seg + "){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4\n(?:" + v6seg + ":){4}(?:(?::" + v6seg + "){0,1}:" + v42 + "|(?::" + v6seg + "){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4\n(?:" + v6seg + ":){3}(?:(?::" + v6seg + "){0,2}:" + v42 + "|(?::" + v6seg + "){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4\n(?:" + v6seg + ":){2}(?:(?::" + v6seg + "){0,3}:" + v42 + "|(?::" + v6seg + "){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4\n(?:" + v6seg + ":){1}(?:(?::" + v6seg + "){0,4}:" + v42 + "|(?::" + v6seg + "){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4\n(?::(?:(?::" + v6seg + "){0,5}:" + v42 + "|(?::" + v6seg + "){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4\n)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1\n").replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim();
    var v46Exact = new RegExp("(?:^" + v42 + "$)|(?:^" + v6 + "$)");
    var v4exact = new RegExp("^" + v42 + "$");
    var v6exact = new RegExp("^" + v6 + "$");
    var ip = function ip2(options) {
      return options && options.exact ? v46Exact : new RegExp("(?:" + b(options) + v42 + b(options) + ")|(?:" + b(options) + v6 + b(options) + ")", "g");
    };
    ip.v4 = function(options) {
      return options && options.exact ? v4exact : new RegExp("" + b(options) + v42 + b(options), "g");
    };
    ip.v6 = function(options) {
      return options && options.exact ? v6exact : new RegExp("" + b(options) + v6 + b(options), "g");
    };
    var protocol = "(?:(?:[a-z]+:)?//)";
    var auth = "(?:\\S+(?::\\S*)?@)?";
    var ipv4 = ip.v4().source;
    var ipv6 = ip.v6().source;
    var host2 = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)";
    var domain = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*";
    var tld = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))";
    var port = "(?::\\d{2,5})?";
    var path = '(?:[/?#][^\\s"]*)?';
    var regex = "(?:" + protocol + "|www\\.)" + auth + "(?:localhost|" + ipv4 + "|" + ipv6 + "|" + host2 + domain + tld + ")" + port + path;
    urlReg = new RegExp("(?:^" + regex + "$)", "i");
    return urlReg;
  };
  var pattern$2 = {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
    hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
  };
  var types = {
    integer: function integer2(value) {
      return types.number(value) && parseInt(value, 10) === value;
    },
    "float": function float(value) {
      return types.number(value) && !types.integer(value);
    },
    array: function array2(value) {
      return Array.isArray(value);
    },
    regexp: function regexp2(value) {
      if (value instanceof RegExp) {
        return true;
      }
      try {
        return !!new RegExp(value);
      } catch (e) {
        return false;
      }
    },
    date: function date2(value) {
      return typeof value.getTime === "function" && typeof value.getMonth === "function" && typeof value.getYear === "function" && !isNaN(value.getTime());
    },
    number: function number2(value) {
      if (isNaN(value)) {
        return false;
      }
      return typeof value === "number";
    },
    object: function object2(value) {
      return typeof value === "object" && !types.array(value);
    },
    method: function method2(value) {
      return typeof value === "function";
    },
    email: function email(value) {
      return typeof value === "string" && value.length <= 320 && !!value.match(pattern$2.email);
    },
    url: function url(value) {
      return typeof value === "string" && value.length <= 2048 && !!value.match(getUrlRegex());
    },
    hex: function hex(value) {
      return typeof value === "string" && !!value.match(pattern$2.hex);
    }
  };
  var type$1 = function type2(rule, value, source, errors, options) {
    if (rule.required && value === void 0) {
      required$1(rule, value, source, errors, options);
      return;
    }
    var custom = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"];
    var ruleType = rule.type;
    if (custom.indexOf(ruleType) > -1) {
      if (!types[ruleType](value)) {
        errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
      }
    } else if (ruleType && typeof value !== rule.type) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    }
  };
  var range = function range2(rule, value, source, errors, options) {
    var len = typeof rule.len === "number";
    var min = typeof rule.min === "number";
    var max = typeof rule.max === "number";
    var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    var val = value;
    var key = null;
    var num = typeof value === "number";
    var str = typeof value === "string";
    var arr = Array.isArray(value);
    if (num) {
      key = "number";
    } else if (str) {
      key = "string";
    } else if (arr) {
      key = "array";
    }
    if (!key) {
      return false;
    }
    if (arr) {
      val = value.length;
    }
    if (str) {
      val = value.replace(spRegexp, "_").length;
    }
    if (len) {
      if (val !== rule.len) {
        errors.push(format(options.messages[key].len, rule.fullField, rule.len));
      }
    } else if (min && !max && val < rule.min) {
      errors.push(format(options.messages[key].min, rule.fullField, rule.min));
    } else if (max && !min && val > rule.max) {
      errors.push(format(options.messages[key].max, rule.fullField, rule.max));
    } else if (min && max && (val < rule.min || val > rule.max)) {
      errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
    }
  };
  var ENUM$1 = "enum";
  var enumerable$1 = function enumerable2(rule, value, source, errors, options) {
    rule[ENUM$1] = Array.isArray(rule[ENUM$1]) ? rule[ENUM$1] : [];
    if (rule[ENUM$1].indexOf(value) === -1) {
      errors.push(format(options.messages[ENUM$1], rule.fullField, rule[ENUM$1].join(", ")));
    }
  };
  var pattern$1 = function pattern2(rule, value, source, errors, options) {
    if (rule.pattern) {
      if (rule.pattern instanceof RegExp) {
        rule.pattern.lastIndex = 0;
        if (!rule.pattern.test(value)) {
          errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
        }
      } else if (typeof rule.pattern === "string") {
        var _pattern = new RegExp(rule.pattern);
        if (!_pattern.test(value)) {
          errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
        }
      }
    }
  };
  var rules = {
    required: required$1,
    whitespace,
    type: type$1,
    range,
    "enum": enumerable$1,
    pattern: pattern$1
  };
  var string = function string2(rule, value, callback, source, options) {
    var errors = [];
    var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue(value, "string") && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options, "string");
      if (!isEmptyValue(value, "string")) {
        rules.type(rule, value, source, errors, options);
        rules.range(rule, value, source, errors, options);
        rules.pattern(rule, value, source, errors, options);
        if (rule.whitespace === true) {
          rules.whitespace(rule, value, source, errors, options);
        }
      }
    }
    callback(errors);
  };
  var method = function method2(rule, value, callback, source, options) {
    var errors = [];
    var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
      }
    }
    callback(errors);
  };
  var number = function number2(rule, value, callback, source, options) {
    var errors = [];
    var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (value === "") {
        value = void 0;
      }
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
        rules.range(rule, value, source, errors, options);
      }
    }
    callback(errors);
  };
  var _boolean = function _boolean2(rule, value, callback, source, options) {
    var errors = [];
    var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
      }
    }
    callback(errors);
  };
  var regexp = function regexp2(rule, value, callback, source, options) {
    var errors = [];
    var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (!isEmptyValue(value)) {
        rules.type(rule, value, source, errors, options);
      }
    }
    callback(errors);
  };
  var integer = function integer2(rule, value, callback, source, options) {
    var errors = [];
    var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
        rules.range(rule, value, source, errors, options);
      }
    }
    callback(errors);
  };
  var floatFn = function floatFn2(rule, value, callback, source, options) {
    var errors = [];
    var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
        rules.range(rule, value, source, errors, options);
      }
    }
    callback(errors);
  };
  var array = function array2(rule, value, callback, source, options) {
    var errors = [];
    var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if ((value === void 0 || value === null) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options, "array");
      if (value !== void 0 && value !== null) {
        rules.type(rule, value, source, errors, options);
        rules.range(rule, value, source, errors, options);
      }
    }
    callback(errors);
  };
  var object = function object2(rule, value, callback, source, options) {
    var errors = [];
    var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
      }
    }
    callback(errors);
  };
  var ENUM = "enum";
  var enumerable = function enumerable2(rule, value, callback, source, options) {
    var errors = [];
    var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules[ENUM](rule, value, source, errors, options);
      }
    }
    callback(errors);
  };
  var pattern = function pattern2(rule, value, callback, source, options) {
    var errors = [];
    var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue(value, "string") && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (!isEmptyValue(value, "string")) {
        rules.pattern(rule, value, source, errors, options);
      }
    }
    callback(errors);
  };
  var date = function date2(rule, value, callback, source, options) {
    var errors = [];
    var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue(value, "date") && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (!isEmptyValue(value, "date")) {
        var dateObject;
        if (value instanceof Date) {
          dateObject = value;
        } else {
          dateObject = new Date(value);
        }
        rules.type(rule, dateObject, source, errors, options);
        if (dateObject) {
          rules.range(rule, dateObject.getTime(), source, errors, options);
        }
      }
    }
    callback(errors);
  };
  var required = function required2(rule, value, callback, source, options) {
    var errors = [];
    var type2 = Array.isArray(value) ? "array" : typeof value;
    rules.required(rule, value, source, errors, options, type2);
    callback(errors);
  };
  var type = function type2(rule, value, callback, source, options) {
    var ruleType = rule.type;
    var errors = [];
    var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue(value, ruleType) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options, ruleType);
      if (!isEmptyValue(value, ruleType)) {
        rules.type(rule, value, source, errors, options);
      }
    }
    callback(errors);
  };
  var any = function any2(rule, value, callback, source, options) {
    var errors = [];
    var validate2 = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate2) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
    }
    callback(errors);
  };
  var validators = {
    string,
    method,
    number,
    "boolean": _boolean,
    regexp,
    integer,
    "float": floatFn,
    array,
    object,
    "enum": enumerable,
    pattern,
    date,
    url: type,
    hex: type,
    email: type,
    required,
    any
  };
  function newMessages() {
    return {
      "default": "Validation error on field %s",
      required: "%s is required",
      "enum": "%s must be one of %s",
      whitespace: "%s cannot be empty",
      date: {
        format: "%s date %s is invalid for format %s",
        parse: "%s date could not be parsed, %s is invalid ",
        invalid: "%s date %s is invalid"
      },
      types: {
        string: "%s is not a %s",
        method: "%s is not a %s (function)",
        array: "%s is not an %s",
        object: "%s is not an %s",
        number: "%s is not a %s",
        date: "%s is not a %s",
        "boolean": "%s is not a %s",
        integer: "%s is not an %s",
        "float": "%s is not a %s",
        regexp: "%s is not a valid %s",
        email: "%s is not a valid %s",
        url: "%s is not a valid %s",
        hex: "%s is not a valid %s"
      },
      string: {
        len: "%s must be exactly %s characters",
        min: "%s must be at least %s characters",
        max: "%s cannot be longer than %s characters",
        range: "%s must be between %s and %s characters"
      },
      number: {
        len: "%s must equal %s",
        min: "%s cannot be less than %s",
        max: "%s cannot be greater than %s",
        range: "%s must be between %s and %s"
      },
      array: {
        len: "%s must be exactly %s in length",
        min: "%s cannot be less than %s in length",
        max: "%s cannot be greater than %s in length",
        range: "%s must be between %s and %s in length"
      },
      pattern: {
        mismatch: "%s value %s does not match pattern %s"
      },
      clone: function clone2() {
        var cloned = JSON.parse(JSON.stringify(this));
        cloned.clone = this.clone;
        return cloned;
      }
    };
  }
  var messages = newMessages();
  var Schema = /* @__PURE__ */ function() {
    function Schema2(descriptor) {
      this.rules = null;
      this._messages = messages;
      this.define(descriptor);
    }
    var _proto = Schema2.prototype;
    _proto.define = function define(rules2) {
      var _this = this;
      if (!rules2) {
        throw new Error("Cannot configure a schema with no rules");
      }
      if (typeof rules2 !== "object" || Array.isArray(rules2)) {
        throw new Error("Rules must be an object");
      }
      this.rules = {};
      Object.keys(rules2).forEach(function(name) {
        var item = rules2[name];
        _this.rules[name] = Array.isArray(item) ? item : [item];
      });
    };
    _proto.messages = function messages2(_messages) {
      if (_messages) {
        this._messages = deepMerge(newMessages(), _messages);
      }
      return this._messages;
    };
    _proto.validate = function validate2(source_, o, oc) {
      var _this2 = this;
      if (o === void 0) {
        o = {};
      }
      if (oc === void 0) {
        oc = function oc2() {
        };
      }
      var source = source_;
      var options = o;
      var callback = oc;
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      if (!this.rules || Object.keys(this.rules).length === 0) {
        if (callback) {
          callback(null, source);
        }
        return Promise.resolve(source);
      }
      function complete(results) {
        var errors = [];
        var fields = {};
        function add(e) {
          if (Array.isArray(e)) {
            var _errors;
            errors = (_errors = errors).concat.apply(_errors, e);
          } else {
            errors.push(e);
          }
        }
        for (var i2 = 0; i2 < results.length; i2++) {
          add(results[i2]);
        }
        if (!errors.length) {
          callback(null, source);
        } else {
          fields = convertFieldsError(errors);
          callback(errors, fields);
        }
      }
      if (options.messages) {
        var messages$1 = this.messages();
        if (messages$1 === messages) {
          messages$1 = newMessages();
        }
        deepMerge(messages$1, options.messages);
        options.messages = messages$1;
      } else {
        options.messages = this.messages();
      }
      var series = {};
      var keys2 = options.keys || Object.keys(this.rules);
      keys2.forEach(function(z) {
        var arr = _this2.rules[z];
        var value = source[z];
        arr.forEach(function(r) {
          var rule = r;
          if (typeof rule.transform === "function") {
            if (source === source_) {
              source = _extends({}, source);
            }
            value = source[z] = rule.transform(value);
          }
          if (typeof rule === "function") {
            rule = {
              validator: rule
            };
          } else {
            rule = _extends({}, rule);
          }
          rule.validator = _this2.getValidationMethod(rule);
          if (!rule.validator) {
            return;
          }
          rule.field = z;
          rule.fullField = rule.fullField || z;
          rule.type = _this2.getType(rule);
          series[z] = series[z] || [];
          series[z].push({
            rule,
            value,
            source,
            field: z
          });
        });
      });
      var errorFields = {};
      return asyncMap(series, options, function(data, doIt) {
        var rule = data.rule;
        var deep = (rule.type === "object" || rule.type === "array") && (typeof rule.fields === "object" || typeof rule.defaultField === "object");
        deep = deep && (rule.required || !rule.required && data.value);
        rule.field = data.field;
        function addFullField(key, schema) {
          return _extends({}, schema, {
            fullField: rule.fullField + "." + key,
            fullFields: rule.fullFields ? [].concat(rule.fullFields, [key]) : [key]
          });
        }
        function cb(e) {
          if (e === void 0) {
            e = [];
          }
          var errorList = Array.isArray(e) ? e : [e];
          if (!options.suppressWarning && errorList.length) {
            Schema2.warning("async-validator:", errorList);
          }
          if (errorList.length && rule.message !== void 0) {
            errorList = [].concat(rule.message);
          }
          var filledErrors = errorList.map(complementError(rule, source));
          if (options.first && filledErrors.length) {
            errorFields[rule.field] = 1;
            return doIt(filledErrors);
          }
          if (!deep) {
            doIt(filledErrors);
          } else {
            if (rule.required && !data.value) {
              if (rule.message !== void 0) {
                filledErrors = [].concat(rule.message).map(complementError(rule, source));
              } else if (options.error) {
                filledErrors = [options.error(rule, format(options.messages.required, rule.field))];
              }
              return doIt(filledErrors);
            }
            var fieldsSchema = {};
            if (rule.defaultField) {
              Object.keys(data.value).map(function(key) {
                fieldsSchema[key] = rule.defaultField;
              });
            }
            fieldsSchema = _extends({}, fieldsSchema, data.rule.fields);
            var paredFieldsSchema = {};
            Object.keys(fieldsSchema).forEach(function(field) {
              var fieldSchema = fieldsSchema[field];
              var fieldSchemaList = Array.isArray(fieldSchema) ? fieldSchema : [fieldSchema];
              paredFieldsSchema[field] = fieldSchemaList.map(addFullField.bind(null, field));
            });
            var schema = new Schema2(paredFieldsSchema);
            schema.messages(options.messages);
            if (data.rule.options) {
              data.rule.options.messages = options.messages;
              data.rule.options.error = options.error;
            }
            schema.validate(data.value, data.rule.options || options, function(errs) {
              var finalErrors = [];
              if (filledErrors && filledErrors.length) {
                finalErrors.push.apply(finalErrors, filledErrors);
              }
              if (errs && errs.length) {
                finalErrors.push.apply(finalErrors, errs);
              }
              doIt(finalErrors.length ? finalErrors : null);
            });
          }
        }
        var res;
        if (rule.asyncValidator) {
          res = rule.asyncValidator(rule, data.value, cb, data.source, options);
        } else if (rule.validator) {
          try {
            res = rule.validator(rule, data.value, cb, data.source, options);
          } catch (error) {
            console.error == null ? void 0 : console.error(error);
            if (!options.suppressValidatorError) {
              setTimeout(function() {
                throw error;
              }, 0);
            }
            cb(error.message);
          }
          if (res === true) {
            cb();
          } else if (res === false) {
            cb(typeof rule.message === "function" ? rule.message(rule.fullField || rule.field) : rule.message || (rule.fullField || rule.field) + " fails");
          } else if (res instanceof Array) {
            cb(res);
          } else if (res instanceof Error) {
            cb(res.message);
          }
        }
        if (res && res.then) {
          res.then(function() {
            return cb();
          }, function(e) {
            return cb(e);
          });
        }
      }, function(results) {
        complete(results);
      }, source);
    };
    _proto.getType = function getType(rule) {
      if (rule.type === void 0 && rule.pattern instanceof RegExp) {
        rule.type = "pattern";
      }
      if (typeof rule.validator !== "function" && rule.type && !validators.hasOwnProperty(rule.type)) {
        throw new Error(format("Unknown rule type %s", rule.type));
      }
      return rule.type || "string";
    };
    _proto.getValidationMethod = function getValidationMethod(rule) {
      if (typeof rule.validator === "function") {
        return rule.validator;
      }
      var keys2 = Object.keys(rule);
      var messageIndex = keys2.indexOf("message");
      if (messageIndex !== -1) {
        keys2.splice(messageIndex, 1);
      }
      if (keys2.length === 1 && keys2[0] === "required") {
        return validators.required;
      }
      return validators[this.getType(rule)] || void 0;
    };
    return Schema2;
  }();
  Schema.register = function register(type2, validator) {
    if (typeof validator !== "function") {
      throw new Error("Cannot register a validator by type, validator is not a function");
    }
    validators[type2] = validator;
  };
  Schema.warning = warning;
  Schema.messages = messages;
  Schema.validators = validators;
  const formItemValidateStates = [
    "",
    "error",
    "validating",
    "success"
  ];
  const formItemProps = buildProps({
    label: String,
    labelWidth: {
      type: [String, Number],
      default: ""
    },
    prop: {
      type: definePropType([String, Array])
    },
    required: {
      type: Boolean,
      default: void 0
    },
    rules: {
      type: definePropType([Object, Array])
    },
    error: String,
    validateStatus: {
      type: String,
      values: formItemValidateStates
    },
    for: String,
    inlineMessage: {
      type: [String, Boolean],
      default: ""
    },
    showMessage: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      values: componentSizes
    }
  });
  const COMPONENT_NAME = "ElLabelWrap";
  var FormLabelWrap = vue.defineComponent({
    name: COMPONENT_NAME,
    props: {
      isAutoWidth: Boolean,
      updateAll: Boolean
    },
    setup(props, {
      slots
    }) {
      const formContext = vue.inject(formContextKey, void 0);
      const formItemContext = vue.inject(formItemContextKey);
      if (!formItemContext)
        throwError(COMPONENT_NAME, "usage: <el-form-item><label-wrap /></el-form-item>");
      const ns2 = useNamespace("form");
      const el = vue.ref();
      const computedWidth = vue.ref(0);
      const getLabelWidth = () => {
        var _a3;
        if ((_a3 = el.value) == null ? void 0 : _a3.firstElementChild) {
          const width = window.getComputedStyle(el.value.firstElementChild).width;
          return Math.ceil(Number.parseFloat(width));
        } else {
          return 0;
        }
      };
      const updateLabelWidth = (action = "update") => {
        vue.nextTick(() => {
          if (slots.default && props.isAutoWidth) {
            if (action === "update") {
              computedWidth.value = getLabelWidth();
            } else if (action === "remove") {
              formContext == null ? void 0 : formContext.deregisterLabelWidth(computedWidth.value);
            }
          }
        });
      };
      const updateLabelWidthFn = () => updateLabelWidth("update");
      vue.onMounted(() => {
        updateLabelWidthFn();
      });
      vue.onBeforeUnmount(() => {
        updateLabelWidth("remove");
      });
      vue.onUpdated(() => updateLabelWidthFn());
      vue.watch(computedWidth, (val, oldVal) => {
        if (props.updateAll) {
          formContext == null ? void 0 : formContext.registerLabelWidth(val, oldVal);
        }
      });
      useResizeObserver(vue.computed(() => {
        var _a3, _b2;
        return (_b2 = (_a3 = el.value) == null ? void 0 : _a3.firstElementChild) != null ? _b2 : null;
      }), updateLabelWidthFn);
      return () => {
        var _a3, _b2;
        if (!slots)
          return null;
        const {
          isAutoWidth
        } = props;
        if (isAutoWidth) {
          const autoLabelWidth = formContext == null ? void 0 : formContext.autoLabelWidth;
          const style = {};
          if (autoLabelWidth && autoLabelWidth !== "auto") {
            const marginWidth = Math.max(0, Number.parseInt(autoLabelWidth, 10) - computedWidth.value);
            const marginPosition = formContext.labelPosition === "left" ? "marginRight" : "marginLeft";
            if (marginWidth) {
              style[marginPosition] = `${marginWidth}px`;
            }
          }
          return vue.createVNode("div", {
            "ref": el,
            "class": [ns2.be("item", "label-wrap")],
            "style": style
          }, [(_a3 = slots.default) == null ? void 0 : _a3.call(slots)]);
        } else {
          return vue.createVNode(vue.Fragment, {
            "ref": el
          }, [(_b2 = slots.default) == null ? void 0 : _b2.call(slots)]);
        }
      };
    }
  });
  const _hoisted_1$6 = ["role", "aria-labelledby"];
  const __default__$6 = {
    name: "ElFormItem"
  };
  const _sfc_main$7 = /* @__PURE__ */ vue.defineComponent({
    ...__default__$6,
    props: formItemProps,
    setup(__props, { expose }) {
      const props = __props;
      const slots = vue.useSlots();
      const formContext = vue.inject(formContextKey, void 0);
      const parentFormItemContext = vue.inject(formItemContextKey, void 0);
      const _size = useSize(void 0, { formItem: false });
      const ns2 = useNamespace("form-item");
      const labelId = useId().value;
      const inputIds = vue.ref([]);
      const validateState = vue.ref("");
      const validateStateDebounced = refDebounced(validateState, 100);
      const validateMessage = vue.ref("");
      const formItemRef = vue.ref();
      let initialValue = void 0;
      let isResettingField = false;
      const labelStyle = vue.computed(() => {
        if ((formContext == null ? void 0 : formContext.labelPosition) === "top") {
          return {};
        }
        const labelWidth = addUnit(props.labelWidth || (formContext == null ? void 0 : formContext.labelWidth) || "");
        if (labelWidth)
          return { width: labelWidth };
        return {};
      });
      const contentStyle = vue.computed(() => {
        if ((formContext == null ? void 0 : formContext.labelPosition) === "top" || (formContext == null ? void 0 : formContext.inline)) {
          return {};
        }
        if (!props.label && !props.labelWidth && isNested) {
          return {};
        }
        const labelWidth = addUnit(props.labelWidth || (formContext == null ? void 0 : formContext.labelWidth) || "");
        if (!props.label && !slots.label) {
          return { marginLeft: labelWidth };
        }
        return {};
      });
      const formItemClasses = vue.computed(() => [
        ns2.b(),
        ns2.m(_size.value),
        ns2.is("error", validateState.value === "error"),
        ns2.is("validating", validateState.value === "validating"),
        ns2.is("success", validateState.value === "success"),
        ns2.is("required", isRequired.value || props.required),
        ns2.is("no-asterisk", formContext == null ? void 0 : formContext.hideRequiredAsterisk),
        { [ns2.m("feedback")]: formContext == null ? void 0 : formContext.statusIcon }
      ]);
      const _inlineMessage = vue.computed(() => isBoolean(props.inlineMessage) ? props.inlineMessage : (formContext == null ? void 0 : formContext.inlineMessage) || false);
      const validateClasses = vue.computed(() => [
        ns2.e("error"),
        { [ns2.em("error", "inline")]: _inlineMessage.value }
      ]);
      const propString = vue.computed(() => {
        if (!props.prop)
          return "";
        return isString(props.prop) ? props.prop : props.prop.join(".");
      });
      const hasLabel = vue.computed(() => {
        return !!(props.label || slots.label);
      });
      const labelFor = vue.computed(() => {
        return props.for || inputIds.value.length === 1 ? inputIds.value[0] : void 0;
      });
      const isGroup = vue.computed(() => {
        return !labelFor.value && hasLabel.value;
      });
      const isNested = !!parentFormItemContext;
      const fieldValue = vue.computed(() => {
        const model = formContext == null ? void 0 : formContext.model;
        if (!model || !props.prop) {
          return;
        }
        return getProp(model, props.prop).value;
      });
      const _rules = vue.computed(() => {
        const rules2 = props.rules ? castArray(props.rules) : [];
        const formRules = formContext == null ? void 0 : formContext.rules;
        if (formRules && props.prop) {
          const _rules2 = getProp(formRules, props.prop).value;
          if (_rules2) {
            rules2.push(...castArray(_rules2));
          }
        }
        if (props.required !== void 0) {
          rules2.push({ required: !!props.required });
        }
        return rules2;
      });
      const validateEnabled = vue.computed(() => _rules.value.length > 0);
      const getFilteredRule = (trigger) => {
        const rules2 = _rules.value;
        return rules2.filter((rule) => {
          if (!rule.trigger || !trigger)
            return true;
          if (Array.isArray(rule.trigger)) {
            return rule.trigger.includes(trigger);
          } else {
            return rule.trigger === trigger;
          }
        }).map(({ trigger: trigger2, ...rule }) => rule);
      };
      const isRequired = vue.computed(() => _rules.value.some((rule) => rule.required === true));
      const shouldShowError = vue.computed(() => {
        var _a3;
        return validateStateDebounced.value === "error" && props.showMessage && ((_a3 = formContext == null ? void 0 : formContext.showMessage) != null ? _a3 : true);
      });
      const currentLabel = vue.computed(() => `${props.label || ""}${(formContext == null ? void 0 : formContext.labelSuffix) || ""}`);
      const setValidationState = (state) => {
        validateState.value = state;
      };
      const onValidationFailed = (error) => {
        var _a3, _b2;
        const { errors, fields } = error;
        if (!errors || !fields) {
          console.error(error);
        }
        setValidationState("error");
        validateMessage.value = errors ? (_b2 = (_a3 = errors == null ? void 0 : errors[0]) == null ? void 0 : _a3.message) != null ? _b2 : `${props.prop} is required` : "";
        formContext == null ? void 0 : formContext.emit("validate", props.prop, false, validateMessage.value);
      };
      const onValidationSucceeded = () => {
        setValidationState("success");
        formContext == null ? void 0 : formContext.emit("validate", props.prop, true, "");
      };
      const doValidate = async (rules2) => {
        const modelName = propString.value;
        const validator = new Schema({
          [modelName]: rules2
        });
        return validator.validate({ [modelName]: fieldValue.value }, { firstFields: true }).then(() => {
          onValidationSucceeded();
          return true;
        }).catch((err) => {
          onValidationFailed(err);
          return Promise.reject(err);
        });
      };
      const validate2 = async (trigger, callback) => {
        if (isResettingField) {
          isResettingField = false;
          return false;
        }
        const hasCallback = isFunction(callback);
        if (!validateEnabled.value) {
          callback == null ? void 0 : callback(false);
          return false;
        }
        const rules2 = getFilteredRule(trigger);
        if (rules2.length === 0) {
          callback == null ? void 0 : callback(true);
          return true;
        }
        setValidationState("validating");
        return doValidate(rules2).then(() => {
          callback == null ? void 0 : callback(true);
          return true;
        }).catch((err) => {
          const { fields } = err;
          callback == null ? void 0 : callback(false, fields);
          return hasCallback ? false : Promise.reject(fields);
        });
      };
      const clearValidate = () => {
        setValidationState("");
        validateMessage.value = "";
      };
      const resetField = async () => {
        const model = formContext == null ? void 0 : formContext.model;
        if (!model || !props.prop)
          return;
        const computedValue = getProp(model, props.prop);
        if (!isEqual(computedValue.value, initialValue)) {
          isResettingField = true;
          computedValue.value = clone(initialValue);
        }
        await vue.nextTick();
        clearValidate();
      };
      const addInputId = (id) => {
        if (!inputIds.value.includes(id)) {
          inputIds.value.push(id);
        }
      };
      const removeInputId = (id) => {
        inputIds.value = inputIds.value.filter((listId) => listId !== id);
      };
      vue.watch(() => props.error, (val) => {
        validateMessage.value = val || "";
        setValidationState(val ? "error" : "");
      }, { immediate: true });
      vue.watch(() => props.validateStatus, (val) => setValidationState(val || ""));
      const context = vue.reactive({
        ...vue.toRefs(props),
        $el: formItemRef,
        size: _size,
        validateState,
        labelId,
        inputIds,
        isGroup,
        addInputId,
        removeInputId,
        resetField,
        clearValidate,
        validate: validate2
      });
      vue.provide(formItemContextKey, context);
      vue.onMounted(() => {
        if (props.prop) {
          formContext == null ? void 0 : formContext.addField(context);
          initialValue = clone(fieldValue.value);
        }
      });
      vue.onBeforeUnmount(() => {
        formContext == null ? void 0 : formContext.removeField(context);
      });
      expose({
        size: _size,
        validateMessage,
        validateState,
        validate: validate2,
        clearValidate,
        resetField
      });
      return (_ctx, _cache) => {
        var _a3;
        return vue.openBlock(), vue.createElementBlock("div", {
          ref_key: "formItemRef",
          ref: formItemRef,
          class: vue.normalizeClass(vue.unref(formItemClasses)),
          role: vue.unref(isGroup) ? "group" : void 0,
          "aria-labelledby": vue.unref(isGroup) ? vue.unref(labelId) : void 0
        }, [
          vue.createVNode(vue.unref(FormLabelWrap), {
            "is-auto-width": vue.unref(labelStyle).width === "auto",
            "update-all": ((_a3 = vue.unref(formContext)) == null ? void 0 : _a3.labelWidth) === "auto"
          }, {
            default: vue.withCtx(() => [
              vue.unref(hasLabel) ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(vue.unref(labelFor) ? "label" : "div"), {
                key: 0,
                id: vue.unref(labelId),
                for: vue.unref(labelFor),
                class: vue.normalizeClass(vue.unref(ns2).e("label")),
                style: vue.normalizeStyle(vue.unref(labelStyle))
              }, {
                default: vue.withCtx(() => [
                  vue.renderSlot(_ctx.$slots, "label", { label: vue.unref(currentLabel) }, () => [
                    vue.createTextVNode(vue.toDisplayString(vue.unref(currentLabel)), 1)
                  ])
                ]),
                _: 3
              }, 8, ["id", "for", "class", "style"])) : vue.createCommentVNode("v-if", true)
            ]),
            _: 3
          }, 8, ["is-auto-width", "update-all"]),
          vue.createElementVNode("div", {
            class: vue.normalizeClass(vue.unref(ns2).e("content")),
            style: vue.normalizeStyle(vue.unref(contentStyle))
          }, [
            vue.renderSlot(_ctx.$slots, "default"),
            vue.createVNode(vue.Transition, {
              name: `${vue.unref(ns2).namespace.value}-zoom-in-top`
            }, {
              default: vue.withCtx(() => [
                vue.unref(shouldShowError) ? vue.renderSlot(_ctx.$slots, "error", {
                  key: 0,
                  error: validateMessage.value
                }, () => [
                  vue.createElementVNode("div", {
                    class: vue.normalizeClass(vue.unref(validateClasses))
                  }, vue.toDisplayString(validateMessage.value), 3)
                ]) : vue.createCommentVNode("v-if", true)
              ]),
              _: 3
            }, 8, ["name"])
          ], 6)
        ], 10, _hoisted_1$6);
      };
    }
  });
  var FormItem = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/form/src/form-item.vue"]]);
  const ElForm = withInstall(Form, {
    FormItem
  });
  const ElFormItem = withNoopInstall(FormItem);
  const inputNumberProps = buildProps({
    id: {
      type: String,
      default: void 0
    },
    step: {
      type: Number,
      default: 1
    },
    stepStrictly: Boolean,
    max: {
      type: Number,
      default: Number.POSITIVE_INFINITY
    },
    min: {
      type: Number,
      default: Number.NEGATIVE_INFINITY
    },
    modelValue: Number,
    disabled: Boolean,
    size: useSizeProp,
    controls: {
      type: Boolean,
      default: true
    },
    controlsPosition: {
      type: String,
      default: "",
      values: ["", "right"]
    },
    valueOnClear: {
      type: [String, Number, null],
      validator: (val) => val === null || isNumber(val) || ["min", "max"].includes(val),
      default: null
    },
    name: String,
    label: String,
    placeholder: String,
    precision: {
      type: Number,
      validator: (val) => val >= 0 && val === Number.parseInt(`${val}`, 10)
    },
    validateEvent: {
      type: Boolean,
      default: true
    }
  });
  const inputNumberEmits = {
    [CHANGE_EVENT]: (prev, cur) => prev !== cur,
    blur: (e) => e instanceof FocusEvent,
    focus: (e) => e instanceof FocusEvent,
    [INPUT_EVENT]: (val) => isNumber(val) || isNil(val),
    [UPDATE_MODEL_EVENT]: (val) => isNumber(val) || isNil(val)
  };
  const _hoisted_1$5 = ["aria-label", "onKeydown"];
  const _hoisted_2$4 = ["aria-label", "onKeydown"];
  const __default__$5 = {
    name: "ElInputNumber"
  };
  const _sfc_main$6 = /* @__PURE__ */ vue.defineComponent({
    ...__default__$5,
    props: inputNumberProps,
    emits: inputNumberEmits,
    setup(__props, { expose, emit }) {
      const props = __props;
      const { t } = useLocale();
      const ns2 = useNamespace("input-number");
      const input = vue.ref();
      const data = vue.reactive({
        currentValue: props.modelValue,
        userInput: null
      });
      const { formItem } = useFormItem();
      const minDisabled = vue.computed(() => isNumber(props.modelValue) && ensurePrecision(props.modelValue, -1) < props.min);
      const maxDisabled = vue.computed(() => isNumber(props.modelValue) && ensurePrecision(props.modelValue) > props.max);
      const numPrecision = vue.computed(() => {
        const stepPrecision = getPrecision(props.step);
        if (!isUndefined(props.precision)) {
          if (stepPrecision > props.precision)
            ;
          return props.precision;
        } else {
          return Math.max(getPrecision(props.modelValue), stepPrecision);
        }
      });
      const controlsAtRight = vue.computed(() => {
        return props.controls && props.controlsPosition === "right";
      });
      const inputNumberSize = useSize();
      const inputNumberDisabled = useDisabled$1();
      const displayValue = vue.computed(() => {
        if (data.userInput !== null) {
          return data.userInput;
        }
        let currentValue = data.currentValue;
        if (isNil(currentValue))
          return "";
        if (isNumber(currentValue)) {
          if (Number.isNaN(currentValue))
            return "";
          if (!isUndefined(props.precision)) {
            currentValue = currentValue.toFixed(props.precision);
          }
        }
        return currentValue;
      });
      const toPrecision = (num, pre) => {
        if (isUndefined(pre))
          pre = numPrecision.value;
        if (pre === 0)
          return Math.round(num);
        let snum = String(num);
        const pointPos = snum.indexOf(".");
        if (pointPos === -1)
          return num;
        const nums = snum.replace(".", "").split("");
        const datum = nums[pointPos + pre];
        if (!datum)
          return num;
        const length = snum.length;
        if (snum.charAt(length - 1) === "5") {
          snum = `${snum.slice(0, Math.max(0, length - 1))}6`;
        }
        return Number.parseFloat(Number(snum).toFixed(pre));
      };
      const getPrecision = (value) => {
        if (isNil(value))
          return 0;
        const valueString = value.toString();
        const dotPosition = valueString.indexOf(".");
        let precision = 0;
        if (dotPosition !== -1) {
          precision = valueString.length - dotPosition - 1;
        }
        return precision;
      };
      const ensurePrecision = (val, coefficient = 1) => {
        if (!isNumber(val))
          return data.currentValue;
        return toPrecision(val + props.step * coefficient);
      };
      const increase = () => {
        if (inputNumberDisabled.value || maxDisabled.value)
          return;
        const value = props.modelValue || 0;
        const newVal = ensurePrecision(value);
        setCurrentValue(newVal);
      };
      const decrease = () => {
        if (inputNumberDisabled.value || minDisabled.value)
          return;
        const value = props.modelValue || 0;
        const newVal = ensurePrecision(value, -1);
        setCurrentValue(newVal);
      };
      const verifyValue = (value, update) => {
        const { max, min, step, precision, stepStrictly, valueOnClear } = props;
        let newVal = Number(value);
        if (isNil(value) || Number.isNaN(newVal)) {
          return null;
        }
        if (value === "") {
          if (valueOnClear === null) {
            return null;
          }
          newVal = isString(valueOnClear) ? { min, max }[valueOnClear] : valueOnClear;
        }
        if (stepStrictly) {
          newVal = toPrecision(Math.round(newVal / step) * step, precision);
        }
        if (!isUndefined(precision)) {
          newVal = toPrecision(newVal, precision);
        }
        if (newVal > max || newVal < min) {
          newVal = newVal > max ? max : min;
          update && emit("update:modelValue", newVal);
        }
        return newVal;
      };
      const setCurrentValue = (value) => {
        var _a3;
        const oldVal = data.currentValue;
        const newVal = verifyValue(value);
        if (oldVal === newVal)
          return;
        data.userInput = null;
        emit("update:modelValue", newVal);
        emit("input", newVal);
        emit("change", newVal, oldVal);
        if (props.validateEvent) {
          (_a3 = formItem == null ? void 0 : formItem.validate) == null ? void 0 : _a3.call(formItem, "change").catch((err) => debugWarn());
        }
        data.currentValue = newVal;
      };
      const handleInput = (value) => {
        return data.userInput = value;
      };
      const handleInputChange = (value) => {
        const newVal = value !== "" ? Number(value) : "";
        if (isNumber(newVal) && !Number.isNaN(newVal) || value === "") {
          setCurrentValue(newVal);
        }
        data.userInput = null;
      };
      const focus = () => {
        var _a3, _b2;
        (_b2 = (_a3 = input.value) == null ? void 0 : _a3.focus) == null ? void 0 : _b2.call(_a3);
      };
      const blur = () => {
        var _a3, _b2;
        (_b2 = (_a3 = input.value) == null ? void 0 : _a3.blur) == null ? void 0 : _b2.call(_a3);
      };
      const handleFocus = (event) => {
        emit("focus", event);
      };
      const handleBlur = (event) => {
        var _a3;
        emit("blur", event);
        if (props.validateEvent) {
          (_a3 = formItem == null ? void 0 : formItem.validate) == null ? void 0 : _a3.call(formItem, "blur").catch((err) => debugWarn());
        }
      };
      vue.watch(() => props.modelValue, (value) => {
        data.currentValue = verifyValue(value, true);
        data.userInput = null;
      }, { immediate: true });
      vue.onMounted(() => {
        var _a3;
        const { min, max, modelValue } = props;
        const innerInput = (_a3 = input.value) == null ? void 0 : _a3.input;
        innerInput.setAttribute("role", "spinbutton");
        if (Number.isFinite(max)) {
          innerInput.setAttribute("aria-valuemax", String(max));
        } else {
          innerInput.removeAttribute("aria-valuemax");
        }
        if (Number.isFinite(min)) {
          innerInput.setAttribute("aria-valuemin", String(min));
        } else {
          innerInput.removeAttribute("aria-valuemin");
        }
        innerInput.setAttribute("aria-valuenow", String(data.currentValue));
        innerInput.setAttribute("aria-disabled", String(inputNumberDisabled.value));
        if (!isNumber(modelValue) && modelValue != null) {
          let val = Number(modelValue);
          if (Number.isNaN(val)) {
            val = null;
          }
          emit("update:modelValue", val);
        }
      });
      vue.onUpdated(() => {
        var _a3;
        const innerInput = (_a3 = input.value) == null ? void 0 : _a3.input;
        innerInput == null ? void 0 : innerInput.setAttribute("aria-valuenow", `${data.currentValue}`);
      });
      expose({
        focus,
        blur
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass([
            vue.unref(ns2).b(),
            vue.unref(ns2).m(vue.unref(inputNumberSize)),
            vue.unref(ns2).is("disabled", vue.unref(inputNumberDisabled)),
            vue.unref(ns2).is("without-controls", !_ctx.controls),
            vue.unref(ns2).is("controls-right", vue.unref(controlsAtRight))
          ]),
          onDragstart: _cache[0] || (_cache[0] = vue.withModifiers(() => {
          }, ["prevent"]))
        }, [
          _ctx.controls ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("span", {
            key: 0,
            role: "button",
            "aria-label": vue.unref(t)("el.inputNumber.decrease"),
            class: vue.normalizeClass([vue.unref(ns2).e("decrease"), vue.unref(ns2).is("disabled", vue.unref(minDisabled))]),
            onKeydown: vue.withKeys(decrease, ["enter"])
          }, [
            vue.createVNode(vue.unref(ElIcon), null, {
              default: vue.withCtx(() => [
                vue.unref(controlsAtRight) ? (vue.openBlock(), vue.createBlock(vue.unref(arrow_down_default), { key: 0 })) : (vue.openBlock(), vue.createBlock(vue.unref(minus_default), { key: 1 }))
              ]),
              _: 1
            })
          ], 42, _hoisted_1$5)), [
            [vue.unref(RepeatClick), decrease]
          ]) : vue.createCommentVNode("v-if", true),
          _ctx.controls ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("span", {
            key: 1,
            role: "button",
            "aria-label": vue.unref(t)("el.inputNumber.increase"),
            class: vue.normalizeClass([vue.unref(ns2).e("increase"), vue.unref(ns2).is("disabled", vue.unref(maxDisabled))]),
            onKeydown: vue.withKeys(increase, ["enter"])
          }, [
            vue.createVNode(vue.unref(ElIcon), null, {
              default: vue.withCtx(() => [
                vue.unref(controlsAtRight) ? (vue.openBlock(), vue.createBlock(vue.unref(arrow_up_default), { key: 0 })) : (vue.openBlock(), vue.createBlock(vue.unref(plus_default), { key: 1 }))
              ]),
              _: 1
            })
          ], 42, _hoisted_2$4)), [
            [vue.unref(RepeatClick), increase]
          ]) : vue.createCommentVNode("v-if", true),
          vue.createVNode(vue.unref(ElInput), {
            id: _ctx.id,
            ref_key: "input",
            ref: input,
            type: "number",
            step: _ctx.step,
            "model-value": vue.unref(displayValue),
            placeholder: _ctx.placeholder,
            disabled: vue.unref(inputNumberDisabled),
            size: vue.unref(inputNumberSize),
            max: _ctx.max,
            min: _ctx.min,
            name: _ctx.name,
            label: _ctx.label,
            "validate-event": false,
            onKeydown: [
              vue.withKeys(vue.withModifiers(increase, ["prevent"]), ["up"]),
              vue.withKeys(vue.withModifiers(decrease, ["prevent"]), ["down"])
            ],
            onBlur: handleBlur,
            onFocus: handleFocus,
            onInput: handleInput,
            onChange: handleInputChange
          }, null, 8, ["id", "step", "model-value", "placeholder", "disabled", "size", "max", "min", "name", "label", "onKeydown"])
        ], 34);
      };
    }
  });
  var InputNumber = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/input-number/src/input-number.vue"]]);
  const ElInputNumber = withInstall(InputNumber);
  const popconfirmProps = buildProps({
    title: String,
    confirmButtonText: String,
    cancelButtonText: String,
    confirmButtonType: {
      type: String,
      values: buttonTypes,
      default: "primary"
    },
    cancelButtonType: {
      type: String,
      values: buttonTypes,
      default: "text"
    },
    icon: {
      type: iconPropType,
      default: question_filled_default
    },
    iconColor: {
      type: String,
      default: "#f90"
    },
    hideIcon: {
      type: Boolean,
      default: false
    },
    hideAfter: {
      type: Number,
      default: 200
    },
    onConfirm: {
      type: definePropType(Function)
    },
    onCancel: {
      type: definePropType(Function)
    },
    teleported: useTooltipContentProps.teleported,
    persistent: useTooltipContentProps.persistent,
    width: {
      type: [String, Number],
      default: 150
    }
  });
  const __default__$4 = {
    name: "ElPopconfirm"
  };
  const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
    ...__default__$4,
    props: popconfirmProps,
    setup(__props) {
      const props = __props;
      const { t } = useLocale();
      const ns2 = useNamespace("popconfirm");
      const tooltipRef = vue.ref();
      const hidePopper = () => {
        var _a3, _b2;
        (_b2 = (_a3 = tooltipRef.value) == null ? void 0 : _a3.onClose) == null ? void 0 : _b2.call(_a3);
      };
      const style = vue.computed(() => {
        return {
          width: addUnit(props.width)
        };
      });
      const confirm = (e) => {
        var _a3;
        (_a3 = props.onConfirm) == null ? void 0 : _a3.call(props, e);
        hidePopper();
      };
      const cancel = (e) => {
        var _a3;
        (_a3 = props.onCancel) == null ? void 0 : _a3.call(props, e);
        hidePopper();
      };
      const finalConfirmButtonText = vue.computed(() => props.confirmButtonText || t("el.popconfirm.confirmButtonText"));
      const finalCancelButtonText = vue.computed(() => props.cancelButtonText || t("el.popconfirm.cancelButtonText"));
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(vue.unref(ElTooltip), vue.mergeProps({
          ref_key: "tooltipRef",
          ref: tooltipRef,
          trigger: "click",
          effect: "light"
        }, _ctx.$attrs, {
          "popper-class": `${vue.unref(ns2).namespace.value}-popover`,
          "popper-style": vue.unref(style),
          teleported: _ctx.teleported,
          "fallback-placements": ["bottom", "top", "right", "left"],
          "hide-after": _ctx.hideAfter,
          persistent: _ctx.persistent
        }), {
          content: vue.withCtx(() => [
            vue.createElementVNode("div", {
              class: vue.normalizeClass(vue.unref(ns2).b())
            }, [
              vue.createElementVNode("div", {
                class: vue.normalizeClass(vue.unref(ns2).e("main"))
              }, [
                !_ctx.hideIcon && _ctx.icon ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                  key: 0,
                  class: vue.normalizeClass(vue.unref(ns2).e("icon")),
                  style: vue.normalizeStyle({ color: _ctx.iconColor })
                }, {
                  default: vue.withCtx(() => [
                    (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.icon)))
                  ]),
                  _: 1
                }, 8, ["class", "style"])) : vue.createCommentVNode("v-if", true),
                vue.createTextVNode(" " + vue.toDisplayString(_ctx.title), 1)
              ], 2),
              vue.createElementVNode("div", {
                class: vue.normalizeClass(vue.unref(ns2).e("action"))
              }, [
                vue.createVNode(vue.unref(ElButton), {
                  size: "small",
                  type: _ctx.cancelButtonType === "text" ? "" : _ctx.cancelButtonType,
                  text: _ctx.cancelButtonType === "text",
                  onClick: cancel
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(vue.toDisplayString(vue.unref(finalCancelButtonText)), 1)
                  ]),
                  _: 1
                }, 8, ["type", "text"]),
                vue.createVNode(vue.unref(ElButton), {
                  size: "small",
                  type: _ctx.confirmButtonType === "text" ? "" : _ctx.confirmButtonType,
                  text: _ctx.confirmButtonType === "text",
                  onClick: confirm
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(vue.toDisplayString(vue.unref(finalConfirmButtonText)), 1)
                  ]),
                  _: 1
                }, 8, ["type", "text"])
              ], 2)
            ], 2)
          ]),
          default: vue.withCtx(() => [
            _ctx.$slots.reference ? vue.renderSlot(_ctx.$slots, "reference", { key: 0 }) : vue.createCommentVNode("v-if", true)
          ]),
          _: 3
        }, 16, ["popper-class", "popper-style", "teleported", "hide-after", "persistent"]);
      };
    }
  });
  var Popconfirm = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popconfirm/src/popconfirm.vue"]]);
  const ElPopconfirm = withInstall(Popconfirm);
  const sliderProps = buildProps({
    modelValue: {
      type: definePropType([Number, Array]),
      default: 0
    },
    id: {
      type: String,
      default: void 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    showInput: Boolean,
    showInputControls: {
      type: Boolean,
      default: true
    },
    size: useSizeProp,
    inputSize: useSizeProp,
    showStops: Boolean,
    showTooltip: {
      type: Boolean,
      default: true
    },
    formatTooltip: {
      type: definePropType(Function),
      default: void 0
    },
    disabled: Boolean,
    range: Boolean,
    vertical: Boolean,
    height: String,
    debounce: {
      type: Number,
      default: 300
    },
    label: {
      type: String,
      default: void 0
    },
    rangeStartLabel: {
      type: String,
      default: void 0
    },
    rangeEndLabel: {
      type: String,
      default: void 0
    },
    formatValueText: {
      type: definePropType(Function),
      default: void 0
    },
    tooltipClass: {
      type: String,
      default: void 0
    },
    placement: {
      type: String,
      values: Ee,
      default: "top"
    },
    marks: {
      type: definePropType(Object)
    },
    validateEvent: {
      type: Boolean,
      default: true
    }
  });
  const isValidValue = (value) => isNumber(value) || isArray(value) && value.every(isNumber);
  const sliderEmits = {
    [UPDATE_MODEL_EVENT]: isValidValue,
    [INPUT_EVENT]: isValidValue,
    [CHANGE_EVENT]: isValidValue
  };
  const useLifecycle = (props, initData, resetSize) => {
    const sliderWrapper = vue.ref();
    vue.onMounted(async () => {
      if (props.range) {
        if (Array.isArray(props.modelValue)) {
          initData.firstValue = Math.max(props.min, props.modelValue[0]);
          initData.secondValue = Math.min(props.max, props.modelValue[1]);
        } else {
          initData.firstValue = props.min;
          initData.secondValue = props.max;
        }
        initData.oldValue = [initData.firstValue, initData.secondValue];
      } else {
        if (typeof props.modelValue !== "number" || Number.isNaN(props.modelValue)) {
          initData.firstValue = props.min;
        } else {
          initData.firstValue = Math.min(props.max, Math.max(props.min, props.modelValue));
        }
        initData.oldValue = initData.firstValue;
      }
      useEventListener(window, "resize", resetSize);
      await vue.nextTick();
      resetSize();
    });
    return {
      sliderWrapper
    };
  };
  const useMarks = (props) => {
    return vue.computed(() => {
      if (!props.marks) {
        return [];
      }
      const marksKeys = Object.keys(props.marks);
      return marksKeys.map(parseFloat).sort((a, b) => a - b).filter((point) => point <= props.max && point >= props.min).map((point) => ({
        point,
        position: (point - props.min) * 100 / (props.max - props.min),
        mark: props.marks[point]
      }));
    });
  };
  const useSlide = (props, initData, emit) => {
    const { form: elForm2, formItem: elFormItem2 } = useFormItem();
    const slider = vue.shallowRef();
    const firstButton = vue.ref();
    const secondButton = vue.ref();
    const buttonRefs = {
      firstButton,
      secondButton
    };
    const sliderDisabled = vue.computed(() => {
      return props.disabled || (elForm2 == null ? void 0 : elForm2.disabled) || false;
    });
    const minValue = vue.computed(() => {
      return Math.min(initData.firstValue, initData.secondValue);
    });
    const maxValue = vue.computed(() => {
      return Math.max(initData.firstValue, initData.secondValue);
    });
    const barSize = vue.computed(() => {
      return props.range ? `${100 * (maxValue.value - minValue.value) / (props.max - props.min)}%` : `${100 * (initData.firstValue - props.min) / (props.max - props.min)}%`;
    });
    const barStart = vue.computed(() => {
      return props.range ? `${100 * (minValue.value - props.min) / (props.max - props.min)}%` : "0%";
    });
    const runwayStyle = vue.computed(() => {
      return props.vertical ? { height: props.height } : {};
    });
    const barStyle = vue.computed(() => {
      return props.vertical ? {
        height: barSize.value,
        bottom: barStart.value
      } : {
        width: barSize.value,
        left: barStart.value
      };
    });
    const resetSize = () => {
      if (slider.value) {
        initData.sliderSize = slider.value[`client${props.vertical ? "Height" : "Width"}`];
      }
    };
    const getButtonRefByPercent = (percent) => {
      const targetValue = props.min + percent * (props.max - props.min) / 100;
      if (!props.range) {
        return firstButton;
      }
      let buttonRefName;
      if (Math.abs(minValue.value - targetValue) < Math.abs(maxValue.value - targetValue)) {
        buttonRefName = initData.firstValue < initData.secondValue ? "firstButton" : "secondButton";
      } else {
        buttonRefName = initData.firstValue > initData.secondValue ? "firstButton" : "secondButton";
      }
      return buttonRefs[buttonRefName];
    };
    const setPosition = (percent) => {
      const buttonRef = getButtonRefByPercent(percent);
      buttonRef.value.setPosition(percent);
      return buttonRef;
    };
    const setFirstValue = (firstValue) => {
      initData.firstValue = firstValue;
      _emit(props.range ? [minValue.value, maxValue.value] : firstValue);
    };
    const setSecondValue = (secondValue) => {
      initData.secondValue = secondValue;
      if (props.range) {
        _emit([minValue.value, maxValue.value]);
      }
    };
    const _emit = (val) => {
      emit(UPDATE_MODEL_EVENT, val);
      emit(INPUT_EVENT, val);
    };
    const emitChange = async () => {
      await vue.nextTick();
      emit(CHANGE_EVENT, props.range ? [minValue.value, maxValue.value] : props.modelValue);
    };
    const handleSliderPointerEvent = (event) => {
      var _a3, _b2, _c, _d, _e, _f;
      if (sliderDisabled.value || initData.dragging)
        return;
      resetSize();
      let newPercent = 0;
      if (props.vertical) {
        const clientY = (_c = (_b2 = (_a3 = event.touches) == null ? void 0 : _a3.item(0)) == null ? void 0 : _b2.clientY) != null ? _c : event.clientY;
        const sliderOffsetBottom = slider.value.getBoundingClientRect().bottom;
        newPercent = (sliderOffsetBottom - clientY) / initData.sliderSize * 100;
      } else {
        const clientX = (_f = (_e = (_d = event.touches) == null ? void 0 : _d.item(0)) == null ? void 0 : _e.clientX) != null ? _f : event.clientX;
        const sliderOffsetLeft = slider.value.getBoundingClientRect().left;
        newPercent = (clientX - sliderOffsetLeft) / initData.sliderSize * 100;
      }
      if (newPercent < 0 || newPercent > 100)
        return;
      return setPosition(newPercent);
    };
    const onSliderWrapperPrevent = (event) => {
      var _a3, _b2;
      if (((_a3 = buttonRefs["firstButton"].value) == null ? void 0 : _a3.dragging) || ((_b2 = buttonRefs["secondButton"].value) == null ? void 0 : _b2.dragging)) {
        event.preventDefault();
      }
    };
    const onSliderDown = async (event) => {
      const buttonRef = handleSliderPointerEvent(event);
      if (buttonRef) {
        await vue.nextTick();
        buttonRef.value.onButtonDown(event);
      }
    };
    const onSliderClick = (event) => {
      const buttonRef = handleSliderPointerEvent(event);
      if (buttonRef) {
        emitChange();
      }
    };
    return {
      elFormItem: elFormItem2,
      slider,
      firstButton,
      secondButton,
      sliderDisabled,
      minValue,
      maxValue,
      runwayStyle,
      barStyle,
      resetSize,
      setPosition,
      emitChange,
      onSliderWrapperPrevent,
      onSliderClick,
      onSliderDown,
      setFirstValue,
      setSecondValue
    };
  };
  const { left, down, right, up, home, end, pageUp, pageDown } = EVENT_CODE;
  const useTooltip = (props, formatTooltip, showTooltip) => {
    const tooltip = vue.ref();
    const tooltipVisible = vue.ref(false);
    const enableFormat = vue.computed(() => {
      return formatTooltip.value instanceof Function;
    });
    const formatValue = vue.computed(() => {
      return enableFormat.value && formatTooltip.value(props.modelValue) || props.modelValue;
    });
    const displayTooltip = debounce(() => {
      showTooltip.value && (tooltipVisible.value = true);
    }, 50);
    const hideTooltip = debounce(() => {
      showTooltip.value && (tooltipVisible.value = false);
    }, 50);
    return {
      tooltip,
      tooltipVisible,
      formatValue,
      displayTooltip,
      hideTooltip
    };
  };
  const useSliderButton = (props, initData, emit) => {
    const {
      disabled,
      min,
      max,
      step,
      showTooltip,
      precision,
      sliderSize,
      formatTooltip,
      emitChange,
      resetSize,
      updateDragging
    } = vue.inject(sliderContextKey);
    const { tooltip, tooltipVisible, formatValue, displayTooltip, hideTooltip } = useTooltip(props, formatTooltip, showTooltip);
    const button = vue.ref();
    const currentPosition = vue.computed(() => {
      return `${(props.modelValue - min.value) / (max.value - min.value) * 100}%`;
    });
    const wrapperStyle = vue.computed(() => {
      return props.vertical ? { bottom: currentPosition.value } : { left: currentPosition.value };
    });
    const handleMouseEnter = () => {
      initData.hovering = true;
      displayTooltip();
    };
    const handleMouseLeave = () => {
      initData.hovering = false;
      if (!initData.dragging) {
        hideTooltip();
      }
    };
    const onButtonDown = (event) => {
      if (disabled.value)
        return;
      event.preventDefault();
      onDragStart(event);
      window.addEventListener("mousemove", onDragging);
      window.addEventListener("touchmove", onDragging);
      window.addEventListener("mouseup", onDragEnd);
      window.addEventListener("touchend", onDragEnd);
      window.addEventListener("contextmenu", onDragEnd);
      button.value.focus();
    };
    const incrementPosition = (amount) => {
      if (disabled.value)
        return;
      initData.newPosition = Number.parseFloat(currentPosition.value) + amount / (max.value - min.value) * 100;
      setPosition(initData.newPosition);
      emitChange();
    };
    const onLeftKeyDown = () => {
      incrementPosition(-step.value);
    };
    const onRightKeyDown = () => {
      incrementPosition(step.value);
    };
    const onPageDownKeyDown = () => {
      incrementPosition(-step.value * 4);
    };
    const onPageUpKeyDown = () => {
      incrementPosition(step.value * 4);
    };
    const onHomeKeyDown = () => {
      if (disabled.value)
        return;
      setPosition(0);
      emitChange();
    };
    const onEndKeyDown = () => {
      if (disabled.value)
        return;
      setPosition(100);
      emitChange();
    };
    const onKeyDown = (event) => {
      let isPreventDefault = true;
      if ([left, down].includes(event.key)) {
        onLeftKeyDown();
      } else if ([right, up].includes(event.key)) {
        onRightKeyDown();
      } else if (event.key === home) {
        onHomeKeyDown();
      } else if (event.key === end) {
        onEndKeyDown();
      } else if (event.key === pageDown) {
        onPageDownKeyDown();
      } else if (event.key === pageUp) {
        onPageUpKeyDown();
      } else {
        isPreventDefault = false;
      }
      isPreventDefault && event.preventDefault();
    };
    const getClientXY = (event) => {
      let clientX;
      let clientY;
      if (event.type.startsWith("touch")) {
        clientY = event.touches[0].clientY;
        clientX = event.touches[0].clientX;
      } else {
        clientY = event.clientY;
        clientX = event.clientX;
      }
      return {
        clientX,
        clientY
      };
    };
    const onDragStart = (event) => {
      initData.dragging = true;
      initData.isClick = true;
      const { clientX, clientY } = getClientXY(event);
      if (props.vertical) {
        initData.startY = clientY;
      } else {
        initData.startX = clientX;
      }
      initData.startPosition = Number.parseFloat(currentPosition.value);
      initData.newPosition = initData.startPosition;
    };
    const onDragging = (event) => {
      if (initData.dragging) {
        initData.isClick = false;
        displayTooltip();
        resetSize();
        let diff;
        const { clientX, clientY } = getClientXY(event);
        if (props.vertical) {
          initData.currentY = clientY;
          diff = (initData.startY - initData.currentY) / sliderSize.value * 100;
        } else {
          initData.currentX = clientX;
          diff = (initData.currentX - initData.startX) / sliderSize.value * 100;
        }
        initData.newPosition = initData.startPosition + diff;
        setPosition(initData.newPosition);
      }
    };
    const onDragEnd = () => {
      if (initData.dragging) {
        setTimeout(() => {
          initData.dragging = false;
          if (!initData.hovering) {
            hideTooltip();
          }
          if (!initData.isClick) {
            setPosition(initData.newPosition);
            emitChange();
          }
        }, 0);
        window.removeEventListener("mousemove", onDragging);
        window.removeEventListener("touchmove", onDragging);
        window.removeEventListener("mouseup", onDragEnd);
        window.removeEventListener("touchend", onDragEnd);
        window.removeEventListener("contextmenu", onDragEnd);
      }
    };
    const setPosition = async (newPosition) => {
      if (newPosition === null || Number.isNaN(+newPosition))
        return;
      if (newPosition < 0) {
        newPosition = 0;
      } else if (newPosition > 100) {
        newPosition = 100;
      }
      const lengthPerStep = 100 / ((max.value - min.value) / step.value);
      const steps = Math.round(newPosition / lengthPerStep);
      let value = steps * lengthPerStep * (max.value - min.value) * 0.01 + min.value;
      value = Number.parseFloat(value.toFixed(precision.value));
      if (value !== props.modelValue) {
        emit(UPDATE_MODEL_EVENT, value);
      }
      if (!initData.dragging && props.modelValue !== initData.oldValue) {
        initData.oldValue = props.modelValue;
      }
      await vue.nextTick();
      initData.dragging && displayTooltip();
      tooltip.value.updatePopper();
    };
    vue.watch(() => initData.dragging, (val) => {
      updateDragging(val);
    });
    return {
      disabled,
      button,
      tooltip,
      tooltipVisible,
      showTooltip,
      wrapperStyle,
      formatValue,
      handleMouseEnter,
      handleMouseLeave,
      onButtonDown,
      onKeyDown,
      setPosition
    };
  };
  const useStops = (props, initData, minValue, maxValue) => {
    const stops = vue.computed(() => {
      if (!props.showStops || props.min > props.max)
        return [];
      if (props.step === 0) {
        return [];
      }
      const stopCount = (props.max - props.min) / props.step;
      const stepWidth = 100 * props.step / (props.max - props.min);
      const result = Array.from({ length: stopCount - 1 }).map((_, index2) => (index2 + 1) * stepWidth);
      if (props.range) {
        return result.filter((step) => {
          return step < 100 * (minValue.value - props.min) / (props.max - props.min) || step > 100 * (maxValue.value - props.min) / (props.max - props.min);
        });
      } else {
        return result.filter((step) => step > 100 * (initData.firstValue - props.min) / (props.max - props.min));
      }
    });
    const getStopStyle = (position) => {
      return props.vertical ? { bottom: `${position}%` } : { left: `${position}%` };
    };
    return {
      stops,
      getStopStyle
    };
  };
  const useWatch = (props, initData, minValue, maxValue, emit, elFormItem2) => {
    const _emit = (val) => {
      emit(UPDATE_MODEL_EVENT, val);
      emit(INPUT_EVENT, val);
    };
    const valueChanged = () => {
      if (props.range) {
        return ![minValue.value, maxValue.value].every((item, index2) => item === initData.oldValue[index2]);
      } else {
        return props.modelValue !== initData.oldValue;
      }
    };
    const setValues = () => {
      var _a3, _b2;
      if (props.min > props.max) {
        throwError("Slider", "min should not be greater than max.");
        return;
      }
      const val = props.modelValue;
      if (props.range && Array.isArray(val)) {
        if (val[1] < props.min) {
          _emit([props.min, props.min]);
        } else if (val[0] > props.max) {
          _emit([props.max, props.max]);
        } else if (val[0] < props.min) {
          _emit([props.min, val[1]]);
        } else if (val[1] > props.max) {
          _emit([val[0], props.max]);
        } else {
          initData.firstValue = val[0];
          initData.secondValue = val[1];
          if (valueChanged()) {
            if (props.validateEvent) {
              (_a3 = elFormItem2 == null ? void 0 : elFormItem2.validate) == null ? void 0 : _a3.call(elFormItem2, "change").catch((err) => debugWarn());
            }
            initData.oldValue = val.slice();
          }
        }
      } else if (!props.range && typeof val === "number" && !Number.isNaN(val)) {
        if (val < props.min) {
          _emit(props.min);
        } else if (val > props.max) {
          _emit(props.max);
        } else {
          initData.firstValue = val;
          if (valueChanged()) {
            if (props.validateEvent) {
              (_b2 = elFormItem2 == null ? void 0 : elFormItem2.validate) == null ? void 0 : _b2.call(elFormItem2, "change").catch((err) => debugWarn());
            }
            initData.oldValue = val;
          }
        }
      }
    };
    setValues();
    vue.watch(() => initData.dragging, (val) => {
      if (!val) {
        setValues();
      }
    });
    vue.watch(() => props.modelValue, (val, oldVal) => {
      if (initData.dragging || Array.isArray(val) && Array.isArray(oldVal) && val.every((item, index2) => item === oldVal[index2]) && initData.firstValue === val[0] && initData.secondValue === val[1]) {
        return;
      }
      setValues();
    }, {
      deep: true
    });
    vue.watch(() => [props.min, props.max], () => {
      setValues();
    });
  };
  const sliderButtonProps = buildProps({
    modelValue: {
      type: Number,
      default: 0
    },
    vertical: Boolean,
    tooltipClass: String,
    placement: {
      type: String,
      values: Ee,
      default: "top"
    }
  });
  const sliderButtonEmits = {
    [UPDATE_MODEL_EVENT]: (value) => isNumber(value)
  };
  const _hoisted_1$4 = ["tabindex"];
  const __default__$3 = {
    name: "ElSliderButton"
  };
  const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
    ...__default__$3,
    props: sliderButtonProps,
    emits: sliderButtonEmits,
    setup(__props, { expose, emit }) {
      const props = __props;
      const ns2 = useNamespace("slider");
      const initData = vue.reactive({
        hovering: false,
        dragging: false,
        isClick: false,
        startX: 0,
        currentX: 0,
        startY: 0,
        currentY: 0,
        startPosition: 0,
        newPosition: 0,
        oldValue: props.modelValue
      });
      const {
        disabled,
        button,
        tooltip,
        showTooltip,
        tooltipVisible,
        wrapperStyle,
        formatValue,
        handleMouseEnter,
        handleMouseLeave,
        onButtonDown,
        onKeyDown,
        setPosition
      } = useSliderButton(props, initData, emit);
      const { hovering, dragging } = vue.toRefs(initData);
      expose({
        onButtonDown,
        onKeyDown,
        setPosition,
        hovering,
        dragging
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          ref_key: "button",
          ref: button,
          class: vue.normalizeClass([vue.unref(ns2).e("button-wrapper"), { hover: vue.unref(hovering), dragging: vue.unref(dragging) }]),
          style: vue.normalizeStyle(vue.unref(wrapperStyle)),
          tabindex: vue.unref(disabled) ? -1 : 0,
          onMouseenter: _cache[0] || (_cache[0] = (...args) => vue.unref(handleMouseEnter) && vue.unref(handleMouseEnter)(...args)),
          onMouseleave: _cache[1] || (_cache[1] = (...args) => vue.unref(handleMouseLeave) && vue.unref(handleMouseLeave)(...args)),
          onMousedown: _cache[2] || (_cache[2] = (...args) => vue.unref(onButtonDown) && vue.unref(onButtonDown)(...args)),
          onTouchstart: _cache[3] || (_cache[3] = (...args) => vue.unref(onButtonDown) && vue.unref(onButtonDown)(...args)),
          onFocus: _cache[4] || (_cache[4] = (...args) => vue.unref(handleMouseEnter) && vue.unref(handleMouseEnter)(...args)),
          onBlur: _cache[5] || (_cache[5] = (...args) => vue.unref(handleMouseLeave) && vue.unref(handleMouseLeave)(...args)),
          onKeydown: _cache[6] || (_cache[6] = (...args) => vue.unref(onKeyDown) && vue.unref(onKeyDown)(...args))
        }, [
          vue.createVNode(vue.unref(ElTooltip), {
            ref_key: "tooltip",
            ref: tooltip,
            visible: vue.unref(tooltipVisible),
            placement: _ctx.placement,
            "fallback-placements": ["top", "bottom", "right", "left"],
            "stop-popper-mouse-event": false,
            "popper-class": _ctx.tooltipClass,
            disabled: !vue.unref(showTooltip),
            persistent: ""
          }, {
            content: vue.withCtx(() => [
              vue.createElementVNode("span", null, vue.toDisplayString(vue.unref(formatValue)), 1)
            ]),
            default: vue.withCtx(() => [
              vue.createElementVNode("div", {
                class: vue.normalizeClass([vue.unref(ns2).e("button"), { hover: vue.unref(hovering), dragging: vue.unref(dragging) }])
              }, null, 2)
            ]),
            _: 1
          }, 8, ["visible", "placement", "popper-class", "disabled"])
        ], 46, _hoisted_1$4);
      };
    }
  });
  var SliderButton = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/slider/src/button.vue"]]);
  const sliderMarkerProps = buildProps({
    mark: {
      type: definePropType([String, Object]),
      default: void 0
    }
  });
  var SliderMarker = vue.defineComponent({
    name: "ElSliderMarker",
    props: sliderMarkerProps,
    setup(props) {
      const ns2 = useNamespace("slider");
      const label = vue.computed(() => {
        return isString(props.mark) ? props.mark : props.mark.label;
      });
      const style = vue.computed(() => isString(props.mark) ? void 0 : props.mark.style);
      return () => vue.h("div", {
        class: ns2.e("marks-text"),
        style: style.value
      }, label.value);
    }
  });
  const _hoisted_1$3 = ["id", "role", "aria-label", "aria-labelledby"];
  const _hoisted_2$3 = { key: 1 };
  const __default__$2 = {
    name: "ElSlider"
  };
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
    ...__default__$2,
    props: sliderProps,
    emits: sliderEmits,
    setup(__props, { expose, emit }) {
      const props = __props;
      const ns2 = useNamespace("slider");
      const { t } = useLocale();
      const initData = vue.reactive({
        firstValue: 0,
        secondValue: 0,
        oldValue: 0,
        dragging: false,
        sliderSize: 1
      });
      const {
        elFormItem: elFormItem2,
        slider,
        firstButton,
        secondButton,
        sliderDisabled,
        minValue,
        maxValue,
        runwayStyle,
        barStyle,
        resetSize,
        emitChange,
        onSliderWrapperPrevent,
        onSliderClick,
        onSliderDown,
        setFirstValue,
        setSecondValue
      } = useSlide(props, initData, emit);
      const { stops, getStopStyle } = useStops(props, initData, minValue, maxValue);
      const { inputId, isLabeledByFormItem } = useFormItemInputId(props, {
        formItemContext: elFormItem2
      });
      const sliderWrapperSize = useSize();
      const sliderInputSize = vue.computed(() => props.inputSize || sliderWrapperSize.value);
      const groupLabel = vue.computed(() => {
        return props.label || t("el.slider.defaultLabel", {
          min: props.min,
          max: props.max
        });
      });
      const firstButtonLabel = vue.computed(() => {
        if (props.range) {
          return props.rangeStartLabel || t("el.slider.defaultRangeStartLabel");
        } else {
          return groupLabel.value;
        }
      });
      const firstValueText = vue.computed(() => {
        return props.formatValueText ? props.formatValueText(firstValue.value) : `${firstValue.value}`;
      });
      const secondButtonLabel = vue.computed(() => {
        return props.rangeEndLabel || t("el.slider.defaultRangeEndLabel");
      });
      const secondValueText = vue.computed(() => {
        return props.formatValueText ? props.formatValueText(secondValue.value) : `${secondValue.value}`;
      });
      const sliderKls = vue.computed(() => [
        ns2.b(),
        ns2.m(sliderWrapperSize.value),
        ns2.is("vertical", props.vertical),
        { [ns2.m("with-input")]: props.showInput }
      ]);
      const markList = useMarks(props);
      useWatch(props, initData, minValue, maxValue, emit, elFormItem2);
      const precision = vue.computed(() => {
        const precisions = [props.min, props.max, props.step].map((item) => {
          const decimal = `${item}`.split(".")[1];
          return decimal ? decimal.length : 0;
        });
        return Math.max.apply(null, precisions);
      });
      const { sliderWrapper } = useLifecycle(props, initData, resetSize);
      const { firstValue, secondValue, sliderSize } = vue.toRefs(initData);
      const updateDragging = (val) => {
        initData.dragging = val;
      };
      vue.provide(sliderContextKey, {
        ...vue.toRefs(props),
        sliderSize,
        disabled: sliderDisabled,
        precision,
        emitChange,
        resetSize,
        updateDragging
      });
      expose({
        onSliderClick
      });
      return (_ctx, _cache) => {
        var _a3, _b2;
        return vue.openBlock(), vue.createElementBlock("div", {
          id: _ctx.range ? vue.unref(inputId) : void 0,
          ref_key: "sliderWrapper",
          ref: sliderWrapper,
          class: vue.normalizeClass(vue.unref(sliderKls)),
          role: _ctx.range ? "group" : void 0,
          "aria-label": _ctx.range && !vue.unref(isLabeledByFormItem) ? vue.unref(groupLabel) : void 0,
          "aria-labelledby": _ctx.range && vue.unref(isLabeledByFormItem) ? (_a3 = vue.unref(elFormItem2)) == null ? void 0 : _a3.labelId : void 0,
          onTouchstart: _cache[2] || (_cache[2] = (...args) => vue.unref(onSliderWrapperPrevent) && vue.unref(onSliderWrapperPrevent)(...args)),
          onTouchmove: _cache[3] || (_cache[3] = (...args) => vue.unref(onSliderWrapperPrevent) && vue.unref(onSliderWrapperPrevent)(...args))
        }, [
          vue.createElementVNode("div", {
            ref_key: "slider",
            ref: slider,
            class: vue.normalizeClass([
              vue.unref(ns2).e("runway"),
              { "show-input": _ctx.showInput && !_ctx.range },
              vue.unref(ns2).is("disabled", vue.unref(sliderDisabled))
            ]),
            style: vue.normalizeStyle(vue.unref(runwayStyle)),
            onMousedown: _cache[0] || (_cache[0] = (...args) => vue.unref(onSliderDown) && vue.unref(onSliderDown)(...args)),
            onTouchstart: _cache[1] || (_cache[1] = (...args) => vue.unref(onSliderDown) && vue.unref(onSliderDown)(...args))
          }, [
            vue.createElementVNode("div", {
              class: vue.normalizeClass(vue.unref(ns2).e("bar")),
              style: vue.normalizeStyle(vue.unref(barStyle))
            }, null, 6),
            vue.createVNode(SliderButton, {
              id: !_ctx.range ? vue.unref(inputId) : void 0,
              ref_key: "firstButton",
              ref: firstButton,
              "model-value": vue.unref(firstValue),
              vertical: _ctx.vertical,
              "tooltip-class": _ctx.tooltipClass,
              placement: _ctx.placement,
              role: "slider",
              "aria-label": _ctx.range || !vue.unref(isLabeledByFormItem) ? vue.unref(firstButtonLabel) : void 0,
              "aria-labelledby": !_ctx.range && vue.unref(isLabeledByFormItem) ? (_b2 = vue.unref(elFormItem2)) == null ? void 0 : _b2.labelId : void 0,
              "aria-valuemin": _ctx.min,
              "aria-valuemax": _ctx.range ? vue.unref(secondValue) : _ctx.max,
              "aria-valuenow": vue.unref(firstValue),
              "aria-valuetext": vue.unref(firstValueText),
              "aria-orientation": _ctx.vertical ? "vertical" : "horizontal",
              "aria-disabled": vue.unref(sliderDisabled),
              "onUpdate:modelValue": vue.unref(setFirstValue)
            }, null, 8, ["id", "model-value", "vertical", "tooltip-class", "placement", "aria-label", "aria-labelledby", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-valuetext", "aria-orientation", "aria-disabled", "onUpdate:modelValue"]),
            _ctx.range ? (vue.openBlock(), vue.createBlock(SliderButton, {
              key: 0,
              ref_key: "secondButton",
              ref: secondButton,
              "model-value": vue.unref(secondValue),
              vertical: _ctx.vertical,
              "tooltip-class": _ctx.tooltipClass,
              placement: _ctx.placement,
              role: "slider",
              "aria-label": vue.unref(secondButtonLabel),
              "aria-valuemin": vue.unref(firstValue),
              "aria-valuemax": _ctx.max,
              "aria-valuenow": vue.unref(secondValue),
              "aria-valuetext": vue.unref(secondValueText),
              "aria-orientation": _ctx.vertical ? "vertical" : "horizontal",
              "aria-disabled": vue.unref(sliderDisabled),
              "onUpdate:modelValue": vue.unref(setSecondValue)
            }, null, 8, ["model-value", "vertical", "tooltip-class", "placement", "aria-label", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-valuetext", "aria-orientation", "aria-disabled", "onUpdate:modelValue"])) : vue.createCommentVNode("v-if", true),
            _ctx.showStops ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$3, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(stops), (item, key) => {
                return vue.openBlock(), vue.createElementBlock("div", {
                  key,
                  class: vue.normalizeClass(vue.unref(ns2).e("stop")),
                  style: vue.normalizeStyle(vue.unref(getStopStyle)(item))
                }, null, 6);
              }), 128))
            ])) : vue.createCommentVNode("v-if", true),
            vue.unref(markList).length > 0 ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 2 }, [
              vue.createElementVNode("div", null, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(markList), (item, key) => {
                  return vue.openBlock(), vue.createElementBlock("div", {
                    key,
                    style: vue.normalizeStyle(vue.unref(getStopStyle)(item.position)),
                    class: vue.normalizeClass([vue.unref(ns2).e("stop"), vue.unref(ns2).e("marks-stop")])
                  }, null, 6);
                }), 128))
              ]),
              vue.createElementVNode("div", {
                class: vue.normalizeClass(vue.unref(ns2).e("marks"))
              }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(markList), (item, key) => {
                  return vue.openBlock(), vue.createBlock(vue.unref(SliderMarker), {
                    key,
                    mark: item.mark,
                    style: vue.normalizeStyle(vue.unref(getStopStyle)(item.position))
                  }, null, 8, ["mark", "style"]);
                }), 128))
              ], 2)
            ], 64)) : vue.createCommentVNode("v-if", true)
          ], 38),
          _ctx.showInput && !_ctx.range ? (vue.openBlock(), vue.createBlock(vue.unref(ElInputNumber), {
            key: 0,
            ref: "input",
            "model-value": vue.unref(firstValue),
            class: vue.normalizeClass(vue.unref(ns2).e("input")),
            step: _ctx.step,
            disabled: vue.unref(sliderDisabled),
            controls: _ctx.showInputControls,
            min: _ctx.min,
            max: _ctx.max,
            debounce: _ctx.debounce,
            size: vue.unref(sliderInputSize),
            "onUpdate:modelValue": vue.unref(setFirstValue),
            onChange: vue.unref(emitChange)
          }, null, 8, ["model-value", "class", "step", "disabled", "controls", "min", "max", "debounce", "size", "onUpdate:modelValue", "onChange"])) : vue.createCommentVNode("v-if", true)
        ], 42, _hoisted_1$3);
      };
    }
  });
  var Slider = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/slider/src/slider.vue"]]);
  const ElSlider = withInstall(Slider);
  const switchProps = buildProps({
    modelValue: {
      type: [Boolean, String, Number],
      default: false
    },
    value: {
      type: [Boolean, String, Number],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: ""
    },
    inlinePrompt: {
      type: Boolean,
      default: false
    },
    activeIcon: {
      type: iconPropType,
      default: ""
    },
    inactiveIcon: {
      type: iconPropType,
      default: ""
    },
    activeText: {
      type: String,
      default: ""
    },
    inactiveText: {
      type: String,
      default: ""
    },
    activeColor: {
      type: String,
      default: ""
    },
    inactiveColor: {
      type: String,
      default: ""
    },
    borderColor: {
      type: String,
      default: ""
    },
    activeValue: {
      type: [Boolean, String, Number],
      default: true
    },
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false
    },
    name: {
      type: String,
      default: ""
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    id: String,
    loading: {
      type: Boolean,
      default: false
    },
    beforeChange: {
      type: definePropType(Function)
    },
    size: {
      type: String,
      validator: isValidComponentSize
    },
    tabindex: {
      type: [String, Number]
    }
  });
  const switchEmits = {
    [UPDATE_MODEL_EVENT]: (val) => isBoolean(val) || isString(val) || isNumber(val),
    [CHANGE_EVENT]: (val) => isBoolean(val) || isString(val) || isNumber(val),
    [INPUT_EVENT]: (val) => isBoolean(val) || isString(val) || isNumber(val)
  };
  const _hoisted_1$2 = ["onClick"];
  const _hoisted_2$2 = ["id", "aria-checked", "aria-disabled", "name", "true-value", "false-value", "disabled", "tabindex", "onKeydown"];
  const _hoisted_3$1 = ["aria-hidden"];
  const _hoisted_4$1 = ["aria-hidden"];
  const _hoisted_5$1 = ["aria-hidden"];
  const _hoisted_6$1 = ["aria-hidden"];
  const __default__$1 = {
    name: "ElSwitch"
  };
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    ...__default__$1,
    props: switchProps,
    emits: switchEmits,
    setup(__props, { expose, emit }) {
      const props = __props;
      const COMPONENT_NAME2 = "ElSwitch";
      const vm = vue.getCurrentInstance();
      const { formItem } = useFormItem();
      const switchSize = useSize();
      const ns2 = useNamespace("switch");
      useDeprecated({
        from: '"value"',
        replacement: '"model-value" or "v-model"',
        scope: COMPONENT_NAME2,
        version: "2.3.0",
        ref: "https://element-plus.org/en-US/component/switch.html#attributes",
        type: "Attribute"
      }, vue.computed(() => {
        var _a3;
        return !!((_a3 = vm.vnode.props) == null ? void 0 : _a3.value);
      }));
      const { inputId } = useFormItemInputId(props, {
        formItemContext: formItem
      });
      const switchDisabled = useDisabled$1(vue.computed(() => props.loading));
      const isControlled = vue.ref(props.modelValue !== false);
      const input = vue.ref();
      const core = vue.ref();
      const switchKls = vue.computed(() => [
        ns2.b(),
        ns2.m(switchSize.value),
        ns2.is("disabled", switchDisabled.value),
        ns2.is("checked", checked.value)
      ]);
      const coreStyle = vue.computed(() => ({
        width: addUnit(props.width)
      }));
      vue.watch(() => props.modelValue, () => {
        isControlled.value = true;
      });
      vue.watch(() => props.value, () => {
        isControlled.value = false;
      });
      const actualValue = vue.computed(() => {
        return isControlled.value ? props.modelValue : props.value;
      });
      const checked = vue.computed(() => actualValue.value === props.activeValue);
      if (![props.activeValue, props.inactiveValue].includes(actualValue.value)) {
        emit(UPDATE_MODEL_EVENT, props.inactiveValue);
        emit(CHANGE_EVENT, props.inactiveValue);
        emit(INPUT_EVENT, props.inactiveValue);
      }
      vue.watch(checked, (val) => {
        var _a3;
        input.value.checked = val;
        if (props.validateEvent) {
          (_a3 = formItem == null ? void 0 : formItem.validate) == null ? void 0 : _a3.call(formItem, "change").catch((err) => debugWarn());
        }
      });
      const handleChange = () => {
        const val = checked.value ? props.inactiveValue : props.activeValue;
        emit(UPDATE_MODEL_EVENT, val);
        emit(CHANGE_EVENT, val);
        emit(INPUT_EVENT, val);
        vue.nextTick(() => {
          input.value.checked = checked.value;
        });
      };
      const switchValue = () => {
        if (switchDisabled.value)
          return;
        const { beforeChange } = props;
        if (!beforeChange) {
          handleChange();
          return;
        }
        const shouldChange = beforeChange();
        const isPromiseOrBool = [
          isPromise(shouldChange),
          isBoolean(shouldChange)
        ].includes(true);
        if (!isPromiseOrBool) {
          throwError(COMPONENT_NAME2, "beforeChange must return type `Promise<boolean>` or `boolean`");
        }
        if (isPromise(shouldChange)) {
          shouldChange.then((result) => {
            if (result) {
              handleChange();
            }
          }).catch((e) => {
          });
        } else if (shouldChange) {
          handleChange();
        }
      };
      const styles = vue.computed(() => {
        return ns2.cssVarBlock({
          ...props.activeColor ? { "on-color": props.activeColor } : null,
          ...props.inactiveColor ? { "off-color": props.inactiveColor } : null,
          ...props.borderColor ? { "border-color": props.borderColor } : null
        });
      });
      const focus = () => {
        var _a3, _b2;
        (_b2 = (_a3 = input.value) == null ? void 0 : _a3.focus) == null ? void 0 : _b2.call(_a3);
      };
      vue.onMounted(() => {
        input.value.checked = checked.value;
      });
      expose({
        focus
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass(vue.unref(switchKls)),
          style: vue.normalizeStyle(vue.unref(styles)),
          onClick: vue.withModifiers(switchValue, ["prevent"])
        }, [
          vue.createElementVNode("input", {
            id: vue.unref(inputId),
            ref_key: "input",
            ref: input,
            class: vue.normalizeClass(vue.unref(ns2).e("input")),
            type: "checkbox",
            role: "switch",
            "aria-checked": vue.unref(checked),
            "aria-disabled": vue.unref(switchDisabled),
            name: _ctx.name,
            "true-value": _ctx.activeValue,
            "false-value": _ctx.inactiveValue,
            disabled: vue.unref(switchDisabled),
            tabindex: _ctx.tabindex,
            onChange: handleChange,
            onKeydown: vue.withKeys(switchValue, ["enter"])
          }, null, 42, _hoisted_2$2),
          !_ctx.inlinePrompt && (_ctx.inactiveIcon || _ctx.inactiveText) ? (vue.openBlock(), vue.createElementBlock("span", {
            key: 0,
            class: vue.normalizeClass([
              vue.unref(ns2).e("label"),
              vue.unref(ns2).em("label", "left"),
              vue.unref(ns2).is("active", !vue.unref(checked))
            ])
          }, [
            _ctx.inactiveIcon ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), { key: 0 }, {
              default: vue.withCtx(() => [
                (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.inactiveIcon)))
              ]),
              _: 1
            })) : vue.createCommentVNode("v-if", true),
            !_ctx.inactiveIcon && _ctx.inactiveText ? (vue.openBlock(), vue.createElementBlock("span", {
              key: 1,
              "aria-hidden": vue.unref(checked)
            }, vue.toDisplayString(_ctx.inactiveText), 9, _hoisted_3$1)) : vue.createCommentVNode("v-if", true)
          ], 2)) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("span", {
            ref_key: "core",
            ref: core,
            class: vue.normalizeClass(vue.unref(ns2).e("core")),
            style: vue.normalizeStyle(vue.unref(coreStyle))
          }, [
            _ctx.inlinePrompt ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 0,
              class: vue.normalizeClass(vue.unref(ns2).e("inner"))
            }, [
              _ctx.activeIcon || _ctx.inactiveIcon ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                _ctx.activeIcon ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                  key: 0,
                  class: vue.normalizeClass([vue.unref(ns2).is("icon"), vue.unref(checked) ? vue.unref(ns2).is("show") : vue.unref(ns2).is("hide")])
                }, {
                  default: vue.withCtx(() => [
                    (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.activeIcon)))
                  ]),
                  _: 1
                }, 8, ["class"])) : vue.createCommentVNode("v-if", true),
                _ctx.inactiveIcon ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                  key: 1,
                  class: vue.normalizeClass([vue.unref(ns2).is("icon"), !vue.unref(checked) ? vue.unref(ns2).is("show") : vue.unref(ns2).is("hide")])
                }, {
                  default: vue.withCtx(() => [
                    (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.inactiveIcon)))
                  ]),
                  _: 1
                }, 8, ["class"])) : vue.createCommentVNode("v-if", true)
              ], 64)) : _ctx.activeText || _ctx.inactiveIcon ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                _ctx.activeText ? (vue.openBlock(), vue.createElementBlock("span", {
                  key: 0,
                  class: vue.normalizeClass([vue.unref(ns2).is("text"), vue.unref(checked) ? vue.unref(ns2).is("show") : vue.unref(ns2).is("hide")]),
                  "aria-hidden": !vue.unref(checked)
                }, vue.toDisplayString(_ctx.activeText.substring(0, 3)), 11, _hoisted_4$1)) : vue.createCommentVNode("v-if", true),
                _ctx.inactiveText ? (vue.openBlock(), vue.createElementBlock("span", {
                  key: 1,
                  class: vue.normalizeClass([vue.unref(ns2).is("text"), !vue.unref(checked) ? vue.unref(ns2).is("show") : vue.unref(ns2).is("hide")]),
                  "aria-hidden": vue.unref(checked)
                }, vue.toDisplayString(_ctx.inactiveText.substring(0, 3)), 11, _hoisted_5$1)) : vue.createCommentVNode("v-if", true)
              ], 64)) : vue.createCommentVNode("v-if", true)
            ], 2)) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("div", {
              class: vue.normalizeClass(vue.unref(ns2).e("action"))
            }, [
              _ctx.loading ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                key: 0,
                class: vue.normalizeClass(vue.unref(ns2).is("loading"))
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(vue.unref(loading_default))
                ]),
                _: 1
              }, 8, ["class"])) : vue.createCommentVNode("v-if", true)
            ], 2)
          ], 6),
          !_ctx.inlinePrompt && (_ctx.activeIcon || _ctx.activeText) ? (vue.openBlock(), vue.createElementBlock("span", {
            key: 1,
            class: vue.normalizeClass([
              vue.unref(ns2).e("label"),
              vue.unref(ns2).em("label", "right"),
              vue.unref(ns2).is("active", vue.unref(checked))
            ])
          }, [
            _ctx.activeIcon ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), { key: 0 }, {
              default: vue.withCtx(() => [
                (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.activeIcon)))
              ]),
              _: 1
            })) : vue.createCommentVNode("v-if", true),
            !_ctx.activeIcon && _ctx.activeText ? (vue.openBlock(), vue.createElementBlock("span", {
              key: 1,
              "aria-hidden": !vue.unref(checked)
            }, vue.toDisplayString(_ctx.activeText), 9, _hoisted_6$1)) : vue.createCommentVNode("v-if", true)
          ], 2)) : vue.createCommentVNode("v-if", true)
        ], 14, _hoisted_1$2);
      };
    }
  });
  var Switch = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/switch/src/switch.vue"]]);
  const ElSwitch = withInstall(Switch);
  const messageTypes = ["success", "info", "warning", "error"];
  const messageDefaults = mutable({
    customClass: "",
    center: false,
    dangerouslyUseHTMLString: false,
    duration: 3e3,
    icon: "",
    id: "",
    message: "",
    onClose: void 0,
    showClose: false,
    type: "info",
    offset: 16,
    zIndex: 0,
    grouping: false,
    repeatNum: 1,
    appendTo: isClient ? document.body : void 0
  });
  const messageProps = buildProps({
    customClass: {
      type: String,
      default: messageDefaults.customClass
    },
    center: {
      type: Boolean,
      default: messageDefaults.center
    },
    dangerouslyUseHTMLString: {
      type: Boolean,
      default: messageDefaults.dangerouslyUseHTMLString
    },
    duration: {
      type: Number,
      default: messageDefaults.duration
    },
    icon: {
      type: iconPropType,
      default: messageDefaults.icon
    },
    id: {
      type: String,
      default: messageDefaults.id
    },
    message: {
      type: definePropType([
        String,
        Object,
        Function
      ]),
      default: messageDefaults.message
    },
    onClose: {
      type: definePropType(Function),
      required: false
    },
    showClose: {
      type: Boolean,
      default: messageDefaults.showClose
    },
    type: {
      type: String,
      values: messageTypes,
      default: messageDefaults.type
    },
    offset: {
      type: Number,
      default: messageDefaults.offset
    },
    zIndex: {
      type: Number,
      default: messageDefaults.zIndex
    },
    grouping: {
      type: Boolean,
      default: messageDefaults.grouping
    },
    repeatNum: {
      type: Number,
      default: messageDefaults.repeatNum
    }
  });
  const messageEmits = {
    destroy: () => true
  };
  const instances = vue.shallowReactive([]);
  const getInstance = (id) => {
    const idx = instances.findIndex((instance) => instance.id === id);
    const current = instances[idx];
    let prev;
    if (idx > 0) {
      prev = instances[idx - 1];
    }
    return { current, prev };
  };
  const getLastOffset = (id) => {
    const { prev } = getInstance(id);
    if (!prev)
      return 0;
    return prev.vm.exposeProxy.bottom;
  };
  const _hoisted_1$1 = ["id"];
  const _hoisted_2$1 = ["innerHTML"];
  const __default__ = {
    name: "ElMessage"
  };
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    ...__default__,
    props: messageProps,
    emits: messageEmits,
    setup(__props, { expose }) {
      const props = __props;
      const { Close } = TypeComponents;
      const ns2 = useNamespace("message");
      const messageRef = vue.ref();
      const visible = vue.ref(false);
      const height = vue.ref(0);
      let stopTimer = void 0;
      const badgeType = vue.computed(() => props.type ? props.type === "error" ? "danger" : props.type : "info");
      const typeClass = vue.computed(() => {
        const type2 = props.type;
        return { [ns2.bm("icon", type2)]: type2 && TypeComponentsMap[type2] };
      });
      const iconComponent = vue.computed(() => props.icon || TypeComponentsMap[props.type] || "");
      const lastOffset = vue.computed(() => getLastOffset(props.id));
      const offset = vue.computed(() => props.offset + lastOffset.value);
      const bottom = vue.computed(() => height.value + offset.value);
      const customStyle = vue.computed(() => ({
        top: `${offset.value}px`,
        zIndex: props.zIndex
      }));
      function startTimer() {
        if (props.duration === 0)
          return;
        ({ stop: stopTimer } = useTimeoutFn(() => {
          close();
        }, props.duration));
      }
      function clearTimer() {
        stopTimer == null ? void 0 : stopTimer();
      }
      function close() {
        visible.value = false;
      }
      function keydown({ code }) {
        if (code === EVENT_CODE.esc) {
          close();
        }
      }
      vue.onMounted(() => {
        startTimer();
        visible.value = true;
      });
      vue.watch(() => props.repeatNum, () => {
        clearTimer();
        startTimer();
      });
      useEventListener(document, "keydown", keydown);
      useResizeObserver(messageRef, () => {
        height.value = messageRef.value.getBoundingClientRect().height;
      });
      expose({
        visible,
        bottom,
        close
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(vue.Transition, {
          name: vue.unref(ns2).b("fade"),
          onBeforeLeave: _ctx.onClose,
          onAfterLeave: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("destroy")),
          persisted: ""
        }, {
          default: vue.withCtx(() => [
            vue.withDirectives(vue.createElementVNode("div", {
              id: _ctx.id,
              ref_key: "messageRef",
              ref: messageRef,
              class: vue.normalizeClass([
                vue.unref(ns2).b(),
                { [vue.unref(ns2).m(_ctx.type)]: _ctx.type && !_ctx.icon },
                vue.unref(ns2).is("center", _ctx.center),
                vue.unref(ns2).is("closable", _ctx.showClose),
                _ctx.customClass
              ]),
              style: vue.normalizeStyle(vue.unref(customStyle)),
              role: "alert",
              onMouseenter: clearTimer,
              onMouseleave: startTimer
            }, [
              _ctx.repeatNum > 1 ? (vue.openBlock(), vue.createBlock(vue.unref(ElBadge), {
                key: 0,
                value: _ctx.repeatNum,
                type: vue.unref(badgeType),
                class: vue.normalizeClass(vue.unref(ns2).e("badge"))
              }, null, 8, ["value", "type", "class"])) : vue.createCommentVNode("v-if", true),
              vue.unref(iconComponent) ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                key: 1,
                class: vue.normalizeClass([vue.unref(ns2).e("icon"), vue.unref(typeClass)])
              }, {
                default: vue.withCtx(() => [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(vue.unref(iconComponent))))
                ]),
                _: 1
              }, 8, ["class"])) : vue.createCommentVNode("v-if", true),
              vue.renderSlot(_ctx.$slots, "default", {}, () => [
                !_ctx.dangerouslyUseHTMLString ? (vue.openBlock(), vue.createElementBlock("p", {
                  key: 0,
                  class: vue.normalizeClass(vue.unref(ns2).e("content"))
                }, vue.toDisplayString(_ctx.message), 3)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                  vue.createCommentVNode(" Caution here, message could've been compromised, never use user's input as message "),
                  vue.createElementVNode("p", {
                    class: vue.normalizeClass(vue.unref(ns2).e("content")),
                    innerHTML: _ctx.message
                  }, null, 10, _hoisted_2$1)
                ], 2112))
              ]),
              _ctx.showClose ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                key: 2,
                class: vue.normalizeClass(vue.unref(ns2).e("closeBtn")),
                onClick: vue.withModifiers(close, ["stop"])
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(vue.unref(Close))
                ]),
                _: 1
              }, 8, ["class", "onClick"])) : vue.createCommentVNode("v-if", true)
            ], 46, _hoisted_1$1), [
              [vue.vShow, visible.value]
            ])
          ]),
          _: 3
        }, 8, ["name", "onBeforeLeave"]);
      };
    }
  });
  var MessageConstructor = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/message/src/message.vue"]]);
  let seed = 1;
  const normalizeOptions = (params) => {
    const options = !params || isString(params) || vue.isVNode(params) || isFunction(params) ? { message: params } : params;
    const normalized = {
      ...messageDefaults,
      ...options
    };
    if (!normalized.appendTo) {
      normalized.appendTo = document.body;
    } else if (isString(normalized.appendTo)) {
      let appendTo = document.querySelector(normalized.appendTo);
      if (!isElement(appendTo)) {
        appendTo = document.body;
      }
      normalized.appendTo = appendTo;
    }
    return normalized;
  };
  const closeMessage = (instance) => {
    const idx = instances.indexOf(instance);
    if (idx === -1)
      return;
    instances.splice(idx, 1);
    const { handler } = instance;
    handler.close();
  };
  const createMessage = ({ appendTo, ...options }, context) => {
    const { nextZIndex } = useZIndex();
    const id = `message_${seed++}`;
    const userOnClose = options.onClose;
    const container = document.createElement("div");
    const props = {
      ...options,
      zIndex: nextZIndex() + options.zIndex,
      id,
      onClose: () => {
        userOnClose == null ? void 0 : userOnClose();
        closeMessage(instance);
      },
      onDestroy: () => {
        vue.render(null, container);
      }
    };
    const vnode = vue.createVNode(MessageConstructor, props, isFunction(props.message) || vue.isVNode(props.message) ? { default: props.message } : null);
    vnode.appContext = context || message._context;
    vue.render(vnode, container);
    appendTo.appendChild(container.firstElementChild);
    const vm = vnode.component;
    const handler = {
      close: () => {
        vm.exposeProxy.visible = false;
      }
    };
    const instance = {
      id,
      vnode,
      vm,
      handler,
      props: vnode.component.props
    };
    return instance;
  };
  const message = (options = {}, context) => {
    if (!isClient)
      return { close: () => void 0 };
    if (isNumber(messageConfig.max) && instances.length >= messageConfig.max) {
      return { close: () => void 0 };
    }
    const normalized = normalizeOptions(options);
    if (normalized.grouping && instances.length) {
      const instance2 = instances.find(({ vnode: vm }) => {
        var _a3;
        return ((_a3 = vm.props) == null ? void 0 : _a3.message) === normalized.message;
      });
      if (instance2) {
        instance2.props.repeatNum += 1;
        instance2.props.type = normalized.type;
        return instance2.handler;
      }
    }
    const instance = createMessage(normalized, context);
    instances.push(instance);
    return instance.handler;
  };
  messageTypes.forEach((type2) => {
    message[type2] = (options = {}, appContext) => {
      const normalized = normalizeOptions(options);
      return message({ ...normalized, type: type2 }, appContext);
    };
  });
  function closeAll(type2) {
    for (const instance of instances) {
      if (!type2 || type2 === instance.props.type) {
        instance.handler.close();
      }
    }
  }
  message.closeAll = closeAll;
  message._context = null;
  const ElMessage = withInstallFunction(message, "$message");
  const base = "";
  const elDialog = "";
  const elOverlay = "";
  const elPopconfirm = "";
  const elPopover = "";
  const elPopper = "";
  const elForm = "";
  const elDivider = "";
  const elCheckbox = "";
  const elInputNumber = "";
  const elInput = "";
  const elSwitch = "";
  const elFormItem = "";
  const elSlider = "";
  const elTooltip = "";
  const elButton = "";
  function getSerializerPromise(localForageInstance) {
    if (getSerializerPromise.result) {
      return getSerializerPromise.result;
    }
    if (!localForageInstance || typeof localForageInstance.getSerializer !== "function") {
      return Promise.reject(new Error("localforage.getSerializer() was not available! localforage v1.4+ is required!"));
    }
    getSerializerPromise.result = localForageInstance.getSerializer();
    return getSerializerPromise.result;
  }
  function executeCallback(promise, callback) {
    if (callback) {
      promise.then(function(result) {
        callback(null, result);
      }, function(error) {
        callback(error);
      });
    }
  }
  function forEachItem(items, keyFn, valueFn, loopFn) {
    function ensurePropGetterMethod(propFn, defaultPropName) {
      var propName = propFn || defaultPropName;
      if ((!propFn || typeof propFn !== "function") && typeof propName === "string") {
        propFn = function propFn2(item2) {
          return item2[propName];
        };
      }
      return propFn;
    }
    var result = [];
    if (Object.prototype.toString.call(items) === "[object Array]") {
      keyFn = ensurePropGetterMethod(keyFn, "key");
      valueFn = ensurePropGetterMethod(valueFn, "value");
      for (var i2 = 0, len = items.length; i2 < len; i2++) {
        var item = items[i2];
        result.push(loopFn(keyFn(item), valueFn(item)));
      }
    } else {
      for (var prop in items) {
        if (items.hasOwnProperty(prop)) {
          result.push(loopFn(prop, items[prop]));
        }
      }
    }
    return result;
  }
  function setItemsIndexedDB(items, keyFn, valueFn, callback) {
    var localforageInstance = this;
    var promise = localforageInstance.ready().then(function() {
      return new Promise(function(resolve, reject) {
        var dbInfo = localforageInstance._dbInfo;
        var transaction = dbInfo.db.transaction(dbInfo.storeName, "readwrite");
        var store = transaction.objectStore(dbInfo.storeName);
        var lastError;
        transaction.oncomplete = function() {
          resolve(items);
        };
        transaction.onabort = transaction.onerror = function(event) {
          reject(lastError || event.target);
        };
        function requestOnError(evt) {
          var request2 = evt.target || this;
          lastError = request2.error || request2.transaction.error;
          reject(lastError);
        }
        forEachItem(items, keyFn, valueFn, function(key, value) {
          if (value === null) {
            value = void 0;
          }
          var request2 = store.put(value, key);
          request2.onerror = requestOnError;
        });
      });
    });
    executeCallback(promise, callback);
    return promise;
  }
  function setItemsWebsql(items, keyFn, valueFn, callback) {
    var localforageInstance = this;
    var promise = new Promise(function(resolve, reject) {
      localforageInstance.ready().then(function() {
        return getSerializerPromise(localforageInstance);
      }).then(function(serializer) {
        var dbInfo = localforageInstance._dbInfo;
        dbInfo.db.transaction(
          function(t) {
            var query = "INSERT OR REPLACE INTO " + dbInfo.storeName + " (key, value) VALUES (?, ?)";
            var itemPromises = forEachItem(items, keyFn, valueFn, function(key, value) {
              return new Promise(function(resolve2, reject2) {
                serializer.serialize(value, function(value2, error) {
                  if (error) {
                    reject2(error);
                  } else {
                    t.executeSql(query, [key, value2], function() {
                      resolve2();
                    }, function(t2, error2) {
                      reject2(error2);
                    });
                  }
                });
              });
            });
            Promise.all(itemPromises).then(function() {
              resolve(items);
            }, reject);
          },
          function(sqlError) {
            reject(sqlError);
          }
        );
      }).catch(reject);
    });
    executeCallback(promise, callback);
    return promise;
  }
  function setItemsGeneric(items, keyFn, valueFn, callback) {
    var localforageInstance = this;
    var itemPromises = forEachItem(items, keyFn, valueFn, function(key, value) {
      return localforageInstance.setItem(key, value);
    });
    var promise = Promise.all(itemPromises);
    executeCallback(promise, callback);
    return promise;
  }
  function localforageSetItems(items, keyFn, valueFn, callback) {
    var localforageInstance = this;
    var currentDriver = localforageInstance.driver();
    if (currentDriver === localforageInstance.INDEXEDDB) {
      return setItemsIndexedDB.call(localforageInstance, items, keyFn, valueFn, callback);
    } else if (currentDriver === localforageInstance.WEBSQL) {
      return setItemsWebsql.call(localforageInstance, items, keyFn, valueFn, callback);
    } else {
      return setItemsGeneric.call(localforageInstance, items, keyFn, valueFn, callback);
    }
  }
  function extendPrototype(localforage$$1) {
    var localforagePrototype = Object.getPrototypeOf(localforage$$1);
    if (localforagePrototype) {
      localforagePrototype.setItems = localforageSetItems;
      localforagePrototype.setItems.indexedDB = function() {
        return setItemsIndexedDB.apply(this, arguments);
      };
      localforagePrototype.setItems.websql = function() {
        return setItemsWebsql.apply(this, arguments);
      };
      localforagePrototype.setItems.generic = function() {
        return setItemsGeneric.apply(this, arguments);
      };
    }
  }
  extendPrototype(localforage__default.default);
  const dateTimeFormatter = new Intl.DateTimeFormat(void 0, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
  const jszipWorkerCode = 'importScripts("https://fastly.jsdelivr.net/npm/comlink@4.3.1/dist/umd/comlink.min.js","https://fastly.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js");class DisposableJSZip{zip=new JSZip;file({name:e,data:t}){this.zip.file(e,t)}files(e){e.forEach(({name:t,data:i})=>{this.zip.file(t,i)})}async unzipFile({data:e,path:t,type:i}){return(await JSZip.loadAsync(e)).file(t)?.async(i)}async generateAsync(e,t){const i=await this.zip.generateAsync({...e,type:"uint8array"},t);return Comlink.transfer(i,[i.buffer])}generateStream(e,t,i){const s=this.zip.generateInternalStream({...e,type:"uint8array"}),r=new ReadableStream({start:n=>{s.on("error",a=>{n.error(a),i?.()}),s.on("end",()=>{setTimeout(()=>{n.close(),i?.()})}),s.on("data",(a,p)=>{n.enqueue(a),t?.(p)}),s.resume()}});return Comlink.transfer({zipStream:r},[r])}}Comlink.expose(DisposableJSZip);';
  const WORKER_URL = URL.createObjectURL(new Blob([jszipWorkerCode], { type: "text/javascript" }));
  const getTransferableData = (files) => files.map(({ data }) => data).filter((data) => typeof data !== "string");
  class JSZipWorkerPool {
    constructor() {
      __publicField(this, "pool", []);
      __publicField(this, "waitingQueue", []);
      __publicField(this, "unzipFile", async (params) => {
        const worker = await this.acquireWorker();
        const zip = await new worker.JSZip();
        const clean = () => {
          zip[comlink.releaseProxy]();
          this.releaseWorker(worker);
        };
        try {
          return await zip.unzipFile(comlink.transfer(params, [params.data]));
        } catch (error) {
          clean();
          throw error;
        }
      });
      for (let id = 0; id < WORKER_THREAD_NUM; id++) {
        this.pool.push({
          id,
          idle: true
        });
      }
    }
    createWorker() {
      const worker = new Worker(WORKER_URL);
      return comlink.wrap(worker);
    }
    waitIdleWorker() {
      return new Promise((resolve) => {
        this.waitingQueue.push(resolve);
      });
    }
    async acquireWorker() {
      let worker = this.pool.find(({ idle }) => idle);
      if (!worker)
        worker = await this.waitIdleWorker();
      if (!worker.JSZip)
        worker.JSZip = this.createWorker();
      worker.idle = false;
      return worker;
    }
    releaseWorker(worker) {
      worker.idle = true;
      if (!this.waitingQueue.length)
        return;
      const emit = removeAt(this.waitingQueue, 0);
      emit(worker);
    }
    async generateAsync(files, options, onUpdate) {
      const worker = await this.acquireWorker();
      const zip = await new worker.JSZip();
      try {
        await zip.files(comlink.transfer(files, getTransferableData(files)));
        return await zip.generateAsync(
          options,
          comlink.proxy((metaData) => {
            if (metaData.currentFile)
              onUpdate == null ? void 0 : onUpdate({ workerId: worker.id, ...metaData });
          })
        );
      } finally {
        zip[comlink.releaseProxy]();
        this.releaseWorker(worker);
      }
    }
    async generateStream(files, options, onUpdate) {
      const worker = await this.acquireWorker();
      const zip = await new worker.JSZip();
      try {
        await zip.files(comlink.transfer(files, getTransferableData(files)));
        const { zipStream } = await zip.generateStream(
          options,
          comlink.proxy((metaData) => {
            if (metaData.currentFile)
              onUpdate == null ? void 0 : onUpdate({ workerId: worker.id, ...metaData });
          })
        );
        return zipStream;
      } finally {
        zip[comlink.releaseProxy]();
        this.releaseWorker(worker);
      }
    }
  }
  const jszipPool = new JSZipWorkerPool();
  class JSZip {
    constructor() {
      __publicField(this, "files", []);
    }
    file(name, data) {
      this.files.push({ name, data });
    }
    generateAsync(options, onUpdate) {
      const { files } = this;
      this.files = [];
      return jszipPool.generateAsync(files, options, onUpdate);
    }
    generateStream(options, onUpdate) {
      const { files } = this;
      this.files = [];
      return jszipPool.generateStream(files, options, onUpdate);
    }
  }
  __publicField(JSZip, "unzipFile", (params) => jszipPool.unzipFile(params));
  extendPrototype(localforage__default.default);
  const dlGidStore = localforage__default.default.createInstance({
    name: "nhentai_helper",
    storeName: "dl_history_gid"
  });
  const dlGidStoreReady = dlGidStore.ready().then(() => true).catch((e) => {
    logger.error(e);
    return false;
  });
  const dlTitleStore = localforage__default.default.createInstance({
    name: "nhentai_helper",
    storeName: "dl_history"
  });
  const dlTitleStoreReady = dlTitleStore.ready().then(() => true).catch((e) => {
    logger.error(e);
    return false;
  });
  const markAsDownloaded = (gid2, title) => {
    void dlGidStoreReady.then((ready) => {
      if (!ready)
        return;
      dlGidStore.setItem(String(gid2), true).then(() => logger.log(`mark "${gid2}" as downloaded`)).catch(logger.error);
    });
    if (title) {
      void dlTitleStoreReady.then((ready) => {
        if (!ready)
          return;
        dlTitleStore.setItem(md5__default.default(title.replace(/\s/g, "")), true).then(() => logger.log(`mark "${title}" as downloaded`)).catch(logger.error);
      });
    }
  };
  const unmarkAsDownloaded = (gid2, title) => {
    void dlGidStoreReady.then((ready) => {
      if (!ready)
        return;
      dlGidStore.removeItem(String(gid2)).then(() => logger.log("unmark", gid2, "as downloaded")).catch(logger.error);
    });
    if (title) {
      void dlTitleStoreReady.then((ready) => {
        if (!ready)
          return;
        dlTitleStore.removeItem(md5__default.default(title.replace(/\s/g, ""))).then(() => logger.log("unmark", title, "as downloaded")).catch(logger.error);
      });
    }
  };
  const isDownloadedByGid = async (gid2) => {
    try {
      if (await dlGidStoreReady) {
        return await dlGidStore.getItem(String(gid2)) === true;
      }
    } catch (e) {
      logger.error(e);
    }
    return false;
  };
  const isDownloadedByTitle = async (title) => {
    try {
      if (!await dlTitleStoreReady)
        return false;
      const md5v2 = md5__default.default(title.replace(/\s/g, ""));
      if (await dlTitleStore.getItem(md5v2) === true)
        return true;
      const md5v1 = md5__default.default(title);
      if (await dlTitleStore.getItem(md5v1) === true) {
        dlTitleStore.setItem(md5v2, true).catch(logger.error);
        dlTitleStore.removeItem(md5v1).catch(logger.error);
        return true;
      }
    } catch (e) {
      logger.error(e);
    }
    return false;
  };
  const getDownloadNumber = async () => {
    try {
      if (!await dlGidStoreReady)
        throw new Error("store cannot ready");
      return await dlGidStore.length();
    } catch (error) {
      logger.error(error);
    }
    return NaN;
  };
  const EXPORT_HEADER_GID = "gid:";
  const EXPORT_HEADER_TITLE = "title:";
  const EXPORT_SEPARATOR = ",";
  const EXPORT_TEXT_FILENAME = "history.txt";
  const exportDownloadHistory = async () => {
    try {
      if (!(await dlGidStoreReady && await dlTitleStoreReady))
        throw new Error("store cannot ready");
      const gids = await dlGidStore.keys();
      const titles = await dlTitleStore.keys();
      const text = `${EXPORT_HEADER_GID}${gids.join(EXPORT_SEPARATOR)}
${EXPORT_HEADER_TITLE}${titles.join(EXPORT_SEPARATOR)}`;
      const zip = new JSZip();
      zip.file(EXPORT_TEXT_FILENAME, text);
      const data = await zip.generateAsync({
        compression: "DEFLATE",
        compressionOptions: { level: 9 }
      });
      const timeStr = dateTimeFormatter.format(Date.now()).replace(/[^\d]/g, "");
      const filename = `nhentai-helper-download-history-${timeStr}.zip`;
      fileSaver.saveAs(new File([data], filename, { type: "application/zip" }));
      logger.log("export download history", filename);
      return true;
    } catch (error) {
      logger.error(error);
    }
    return false;
  };
  const importDownloadHistory = async (data) => {
    try {
      if (!(await dlGidStoreReady && await dlTitleStoreReady))
        throw new Error("store cannot ready");
      const str = await JSZip.unzipFile({ data, path: EXPORT_TEXT_FILENAME, type: "string" });
      if (!str) {
        logger.error("zip doesn't contain file", EXPORT_TEXT_FILENAME);
        return false;
      }
      const lines = str.split("\n");
      for (const line of lines) {
        if (line.startsWith(EXPORT_HEADER_GID)) {
          const gids = line.replace(EXPORT_HEADER_GID, "").split(EXPORT_SEPARATOR);
          await dlGidStore.setItems(gids.map((gid2) => ({ key: gid2, value: true })));
        } else if (line.startsWith(EXPORT_HEADER_TITLE)) {
          const titles = line.replace(EXPORT_HEADER_TITLE, "").split(EXPORT_SEPARATOR);
          await dlTitleStore.setItems(titles.map((gid2) => ({ key: gid2, value: true })));
        }
      }
      return true;
    } catch (error) {
      logger.error(error);
    }
    return false;
  };
  const clearDownloadHistory = async () => {
    try {
      if (!(await dlGidStoreReady && await dlTitleStoreReady))
        throw new Error("store cannot ready");
      await dlGidStore.clear();
      await dlTitleStore.clear();
      return true;
    } catch (error) {
      logger.error(error);
    }
    return false;
  };
  const createElement = (tag, props, ...children) => {
    if (typeof tag === "function")
      return tag(props, ...children);
    const element = document.createElement(tag);
    Object.entries(props != null ? props : {}).forEach(([name, value]) => {
      if (name === "html")
        element.innerHTML = value;
      else if (name === "class")
        element.classList.add(...String(value).split(" "));
      else if (name === "style" && typeof value === "object") {
        const styleString = Object.entries(value).map(([k, v]) => `${camelCase$1(k)}:${String(v)}`).join(";");
        element.setAttribute("style", styleString);
      } else if (name.startsWith("on")) {
        element.addEventListener(kebabCase$1(name.replace("on", "")), value);
      } else
        element.setAttribute(name, String(value));
    });
    children.flat().forEach((child) => {
      appendChild(element, child);
    });
    return element;
  };
  const appendChild = (parent, child) => {
    if (!child)
      return;
    parent.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
  };
  const Fragment = (props, ...children) => {
    return children;
  };
  const readFile = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onabort = reject;
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
  const pickFile = (accept) => new Promise((resolve) => {
    const input = /* @__PURE__ */ createElement("input", {
      type: "file",
      accept,
      onChange: () => {
        var _a3;
        return resolve((_a3 = input.files) == null ? void 0 : _a3[0]);
      }
    });
    input.click();
  });
  const pickAndReadFile = async (accept) => {
    const file = await pickFile(accept);
    if (file)
      return readFile(file);
  };
  const elBadge = "";
  const elMessage = "";
  const showMessage = (params) => ElMessage({ ...params, appendTo: monkeyWindow.document.body });
  const _hoisted_1 = { class: "nhentai-helper-setting-help-buttons no-sl" };
  const _hoisted_2 = /* @__PURE__ */ vue.createTextVNode("Help");
  const _hoisted_3 = /* @__PURE__ */ vue.createTextVNode("\u8BF4\u660E");
  const _hoisted_4 = ["id"];
  const _hoisted_5 = { id: "nhentai-helper-setting-dialog" };
  const _hoisted_6 = /* @__PURE__ */ vue.createElementVNode("div", {
    class: "asterisk-left no-sl",
    style: { "margin-bottom": "18px" }
  }, " means refresh is required to take effect ", -1);
  const _hoisted_7 = /* @__PURE__ */ vue.createTextVNode("Advance Settings");
  const _hoisted_8 = /* @__PURE__ */ vue.createTextVNode("Download History");
  const _hoisted_9 = { class: "no-sl" };
  const _hoisted_10 = /* @__PURE__ */ vue.createTextVNode("Export");
  const _hoisted_11 = /* @__PURE__ */ vue.createTextVNode("Import");
  const _hoisted_12 = /* @__PURE__ */ vue.createTextVNode("Clear");
  const _hoisted_13 = /* @__PURE__ */ vue.createElementVNode("p", { class: "no-sl" }, "Notice: Import will not clear the existing history, but merges with it.", -1);
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "SettingsDialog",
    setup(__props, { expose }) {
      startWatchSettings();
      const threadNumMarks = {
        1: "1",
        4: "4",
        8: "8",
        16: "16",
        32: {
          label: "32",
          style: { whiteSpace: "nowrap" }
        }
      };
      const compressionLevelMarks = {
        0: "0",
        1: "1",
        9: "9"
      };
      const show = vue.ref(false);
      const downloadNum = vue.ref(NaN);
      const filenameLengthNumber = vue.computed({
        get: () => typeof writeableSettings.filenameLength === "number" ? writeableSettings.filenameLength : 0,
        set: (val) => {
          writeableSettings.filenameLength = val;
        }
      });
      const filenameLengthAuto = vue.computed({
        get: () => writeableSettings.filenameLength === "auto",
        set: (val) => {
          writeableSettings.filenameLength = val ? "auto" : 0;
        }
      });
      const refreshDownloadNum = async () => {
        downloadNum.value = await getDownloadNumber();
      };
      const open = () => {
        show.value = true;
        refreshDownloadNum();
      };
      const openHelp = () => {
        monkeyWindow.open(
          "https://github.com/Tsuk1ko/nhentai-helper/blob/master/README.md#settings",
          "_blank"
        );
      };
      const openHelpCn = () => {
        monkeyWindow.open(
          "https://github.com/Tsuk1ko/nhentai-helper/blob/master/README-ZH.md#%E8%AE%BE%E7%BD%AE",
          "_blank"
        );
      };
      const exporting = vue.ref(false);
      const importing = vue.ref(false);
      const clearing = vue.ref(false);
      const showMessageBySucceed = (succeed) => {
        showMessage({
          type: succeed ? "success" : "error",
          message: succeed ? "Succeed" : "Failed, please check console for error message"
        });
      };
      const exportHistory = async () => {
        exporting.value = true;
        const succeed = await exportDownloadHistory();
        exporting.value = false;
        showMessageBySucceed(succeed);
      };
      const importHistory = async () => {
        const data = await pickAndReadFile("application/zip");
        if (!data)
          return;
        importing.value = true;
        const succeed = await importDownloadHistory(data);
        importing.value = false;
        refreshDownloadNum();
        showMessageBySucceed(succeed);
      };
      const clearHistory = async () => {
        clearing.value = true;
        const succeed = await clearDownloadHistory();
        clearing.value = false;
        refreshDownloadNum();
        showMessageBySucceed(succeed);
      };
      expose({ open });
      return (_ctx, _cache) => {
        const _component_el_button = ElButton;
        const _component_el_slider = ElSlider;
        const _component_el_form_item = ElFormItem;
        const _component_el_switch = ElSwitch;
        const _component_el_input = ElInput;
        const _component_el_input_number = ElInputNumber;
        const _component_el_checkbox = ElCheckbox;
        const _component_el_divider = ElDivider;
        const _component_el_form = ElForm;
        const _component_el_popconfirm = ElPopconfirm;
        const _component_el_dialog = ElDialog;
        return vue.openBlock(), vue.createBlock(_component_el_dialog, {
          modelValue: show.value,
          "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => show.value = $event),
          center: true,
          top: "50px"
        }, {
          header: vue.withCtx(({ titleId, titleClass }) => [
            vue.createElementVNode("div", _hoisted_1, [
              vue.createVNode(_component_el_button, {
                size: "small",
                onClick: openHelp
              }, {
                default: vue.withCtx(() => [
                  _hoisted_2
                ]),
                _: 1
              }),
              vue.createVNode(_component_el_button, {
                size: "small",
                onClick: openHelpCn
              }, {
                default: vue.withCtx(() => [
                  _hoisted_3
                ]),
                _: 1
              })
            ]),
            vue.createElementVNode("span", {
              id: titleId,
              class: vue.normalizeClass([titleClass, "no-sl"])
            }, "Settings", 10, _hoisted_4)
          ]),
          default: vue.withCtx(() => [
            vue.createElementVNode("div", _hoisted_5, [
              _hoisted_6,
              vue.createVNode(_component_el_form, {
                "label-width": "auto",
                "label-position": "left"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_form_item, {
                    class: "m-b-32",
                    label: "Download thread"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_slider, {
                        modelValue: vue.unref(writeableSettings).threadNum,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.unref(writeableSettings).threadNum = $event),
                        min: 1,
                        max: 32,
                        marks: threadNumMarks
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_form_item, {
                    class: "refresh-required",
                    label: "Open on new tab"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_switch, {
                        modelValue: vue.unref(writeableSettings).openOnNewTab,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vue.unref(writeableSettings).openOnNewTab = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_form_item, { label: "Compression filename" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_input, {
                        modelValue: vue.unref(writeableSettings).compressionFileName,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => vue.unref(writeableSettings).compressionFileName = $event),
                        placeholder: vue.unref(settingDefinitions).compressionFileName.default,
                        onBlur: _cache[3] || (_cache[3] = ($event) => {
                          if (!vue.unref(writeableSettings).compressionFileName) {
                            vue.unref(writeableSettings).compressionFileName = vue.unref(settingDefinitions).compressionFileName.default;
                          }
                        })
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_form_item, {
                    class: "m-b-32",
                    label: "Compression level"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_slider, {
                        modelValue: vue.unref(writeableSettings).compressionLevel,
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => vue.unref(writeableSettings).compressionLevel = $event),
                        min: 0,
                        max: 9,
                        marks: compressionLevelMarks
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_form_item, { label: "Filename length" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_input_number, {
                        modelValue: vue.unref(filenameLengthNumber),
                        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => vue.isRef(filenameLengthNumber) ? filenameLengthNumber.value = $event : null),
                        min: 0,
                        "value-on-clear": vue.unref(settingDefinitions).filenameLength.default,
                        "step-strictly": true,
                        disabled: vue.unref(writeableSettings).filenameLength === "auto"
                      }, null, 8, ["modelValue", "value-on-clear", "disabled"]),
                      vue.createVNode(_component_el_checkbox, {
                        modelValue: vue.unref(filenameLengthAuto),
                        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => vue.isRef(filenameLengthAuto) ? filenameLengthAuto.value = $event : null),
                        class: "m-l-16",
                        label: "Auto"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_form_item, { label: "Auto cancel downloaded manga" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_switch, {
                        modelValue: vue.unref(writeableSettings).autoCancelDownloadedManga,
                        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => vue.unref(writeableSettings).autoCancelDownloadedManga = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_form_item, { label: "Auto retry when error occurs" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_switch, {
                        modelValue: vue.unref(writeableSettings).autoRetryWhenErrorOccurs,
                        "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => vue.unref(writeableSettings).autoRetryWhenErrorOccurs = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_form_item, { label: "Auto show all" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_switch, {
                        modelValue: vue.unref(writeableSettings).autoShowAll,
                        "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => vue.unref(writeableSettings).autoShowAll = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_form_item, {
                    class: "refresh-required",
                    label: "Show ignore button"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_switch, {
                        modelValue: vue.unref(writeableSettings).showIgnoreButton,
                        "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => vue.unref(writeableSettings).showIgnoreButton = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_divider, null, {
                    default: vue.withCtx(() => [
                      _hoisted_7
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_form_item, { label: "Custom download URL" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_input, {
                        modelValue: vue.unref(writeableSettings).customDownloadUrl,
                        "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => vue.unref(writeableSettings).customDownloadUrl = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_form_item, { label: 'Compression "streamFiles"' }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_switch, {
                        modelValue: vue.unref(writeableSettings).compressionStreamFiles,
                        "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => vue.unref(writeableSettings).compressionStreamFiles = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_form_item, { label: "Series mode" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_switch, {
                        modelValue: vue.unref(writeableSettings).seriesMode,
                        "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => vue.unref(writeableSettings).seriesMode = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_form_item, { label: "Stream download" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_switch, {
                        modelValue: vue.unref(writeableSettings).streamDownload,
                        "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => vue.unref(writeableSettings).streamDownload = $event),
                        disabled: vue.unref(DISABLE_STREAM_DOWNLOAD)
                      }, null, 8, ["modelValue", "disabled"])
                    ]),
                    _: 1
                  }),
                  vue.unref(IS_NHENTAI) ? (vue.openBlock(), vue.createBlock(_component_el_form_item, {
                    key: 0,
                    class: "refresh-required",
                    label: "Prevent console clearing"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_switch, {
                        modelValue: vue.unref(writeableSettings).preventConsoleClearing,
                        "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => vue.unref(writeableSettings).preventConsoleClearing = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  })) : vue.createCommentVNode("", true)
                ]),
                _: 1
              }),
              vue.createVNode(_component_el_divider, null, {
                default: vue.withCtx(() => [
                  _hoisted_8
                ]),
                _: 1
              }),
              vue.createElementVNode("p", _hoisted_9, " You have downloaded " + vue.toDisplayString(downloadNum.value) + " manga on this site using nHentai Helper. ", 1),
              vue.createVNode(_component_el_button, {
                type: "primary",
                icon: vue.unref(download_default),
                disabled: !downloadNum.value,
                loading: exporting.value,
                onClick: exportHistory
              }, {
                default: vue.withCtx(() => [
                  _hoisted_10
                ]),
                _: 1
              }, 8, ["icon", "disabled", "loading"]),
              vue.createVNode(_component_el_button, {
                type: "primary",
                icon: vue.unref(upload_default),
                loading: importing.value,
                onClick: importHistory
              }, {
                default: vue.withCtx(() => [
                  _hoisted_11
                ]),
                _: 1
              }, 8, ["icon", "loading"]),
              vue.createVNode(_component_el_popconfirm, {
                title: "Are you sure?",
                placement: "top",
                onConfirm: clearHistory
              }, {
                reference: vue.withCtx(() => [
                  vue.createVNode(_component_el_button, {
                    type: "danger",
                    icon: vue.unref(delete_default),
                    loading: clearing.value
                  }, {
                    default: vue.withCtx(() => [
                      _hoisted_12
                    ]),
                    _: 1
                  }, 8, ["icon", "loading"])
                ]),
                _: 1
              }),
              _hoisted_13
            ])
          ]),
          _: 1
        }, 8, ["modelValue"]);
      };
    }
  });
  const SettingsDialog_vue_vue_type_style_index_0_lang = "";
  const compileTemplate = (tpl) => template(tpl, { interpolate: /{{([\s\S]+?)}}/g });
  const getDownloadExt = () => {
    const ext = last(settings.compressionFileName.split("."));
    if (ext)
      return ext.toLowerCase();
    return "zip";
  };
  const getCompressionOptions = () => {
    return {
      streamFiles: settings.compressionStreamFiles,
      compression: settings.compressionLevel > 0 ? "DEFLATE" : "STORE",
      compressionOptions: { level: settings.compressionLevel }
    };
  };
  const getShowAllBtn = () => new Promise((resolve, reject) => {
    const $btn = $__default.default("#show-all-images-button");
    if ($btn.length > 0) {
      resolve($btn);
      return;
    }
    const container = document.getElementById("thumbnail-container");
    if (!container) {
      reject(new Error("Show all button not found"));
      return;
    }
    new MutationObserver((mutations, self2) => {
      mutations.forEach(({ addedNodes }) => {
        const btnContainer = addedNodes[0];
        if ((btnContainer == null ? void 0 : btnContainer.id) === "show-all-images-container") {
          self2.disconnect();
          resolve($__default.default("#show-all-images-button"));
        }
      });
    }).observe(container, { childList: true });
  });
  const createMangaDownloadInfo = (gallery2) => ({
    gallery: gallery2,
    done: 0,
    compressing: false,
    compressingPercent: "0",
    error: false
  });
  const notyConfirmOption = {
    type: "error",
    layout: "bottomRight",
    theme: "nest",
    timeout: false,
    closeWith: []
  };
  const downloadAgainConfirm = async (title, hasQueue = false) => {
    if (hasQueue && settings.autoCancelDownloadedManga) {
      downloadedTip(title);
      return false;
    }
    return new Promise((resolve) => {
      const n = new Noty__default.default({
        ...notyConfirmOption,
        text: `"${title}" is already downloaded${hasQueue ? " or in queue" : ""}.<br>Do you want to download again?`,
        buttons: [
          Noty__default.default.button("YES", "btn btn-noty-blue btn-noty", () => {
            n.close();
            resolve(true);
          }),
          Noty__default.default.button("NO", "btn btn-noty-green btn-noty", () => {
            n.close();
            resolve(false);
          })
        ]
      });
      n.show();
    });
  };
  const errorRetryConfirm = (action, noCb, yesCb) => {
    if (settings.autoRetryWhenErrorOccurs) {
      errorRetryTip(action);
      yesCb == null ? void 0 : yesCb();
      return;
    }
    const n = new Noty__default.default({
      ...notyConfirmOption,
      text: `Error occurred while ${action}, retry?`,
      buttons: [
        Noty__default.default.button("NO", "btn btn-noty-blue btn-noty", () => {
          n.close();
          noCb == null ? void 0 : noCb();
        }),
        Noty__default.default.button("YES", "btn btn-noty-green btn-noty", () => {
          n.close();
          yesCb == null ? void 0 : yesCb();
        })
      ]
    });
    n.show();
  };
  const downloadedTip = (title) => {
    new Noty__default.default({
      type: "info",
      layout: "bottomRight",
      theme: "nest",
      closeWith: [],
      timeout: 4e3,
      text: `"${title}" is already downloaded or in queue.`
    }).show();
  };
  const errorRetryTip = (action) => {
    new Noty__default.default({
      type: "warning",
      layout: "bottomRight",
      theme: "nest",
      closeWith: [],
      timeout: 3e3,
      text: `Error occurred while ${action}, retrying...`
    }).show();
  };
  class MultiThread {
    constructor(tasks, taskFunc, params) {
      __publicField(this, "threads", []);
      __publicField(this, "taskIndex", 0);
      __publicField(this, "started", false);
      __publicField(this, "aborted", false);
      this.tasks = tasks;
      this.taskFunc = taskFunc;
      this.params = params;
    }
    startThread(threadId) {
      let abortFunc;
      const threadPromise = (async () => {
        while (true) {
          if (this.aborted)
            break;
          const i2 = this.taskIndex++;
          if (i2 >= this.tasks.length)
            break;
          const { abort, promise } = this.taskFunc(this.tasks[i2], threadId, this.params);
          abortFunc = abort;
          await promise;
        }
      })();
      return {
        abort: () => abortFunc == null ? void 0 : abortFunc(),
        promise: threadPromise
      };
    }
    start() {
      if (this.started)
        throw new Error("Multi-thread started.");
      this.started = true;
      for (let threadId = 0; threadId < settings.threadNum; threadId++) {
        this.threads.push(this.startThread(threadId));
      }
      return {
        abort: () => {
          this.aborted = true;
          this.threads.forEach(({ abort }) => abort());
        },
        promise: Promise.all(this.threads.map(({ promise }) => promise)).then()
      };
    }
  }
  class RequestAbortError extends Error {
    constructor(url) {
      super(`Request abort ${url}`);
    }
  }
  const isAbortError = (e) => e instanceof RequestAbortError;
  const request = (url, responseType, retry = 3) => {
    let abortFunc;
    const dataPromise = new Promise((resolve, reject) => {
      try {
        const req = GM_xmlhttpRequest({
          method: "GET",
          url,
          responseType,
          onerror: (e) => {
            if (retry === 0) {
              logger.error("Network error", url);
              reject(e);
            } else {
              logger.warn("Network error, retry", url);
              setTimeout(() => {
                const { abort, dataPromise: dataPromise2 } = request(url, responseType, retry - 1);
                abortFunc = abort;
                resolve(dataPromise2);
              }, 1e3);
            }
          },
          onload: ({ status, response }) => {
            if (status === 200)
              resolve(response);
            else if (retry === 0)
              reject(new Error(`${status} ${url}`));
            else {
              logger.warn(status, url);
              setTimeout(() => {
                const { abort, dataPromise: dataPromise2 } = request(url, responseType, retry - 1);
                abortFunc = abort;
                resolve(dataPromise2);
              }, 1e3);
            }
          }
        });
        abortFunc = () => {
          req.abort();
          logger.log("Request abort", url);
          reject(new RequestAbortError(url));
        };
      } catch (error) {
        reject(error);
      }
    });
    return {
      abort: () => abortFunc == null ? void 0 : abortFunc(),
      dataPromise
    };
  };
  const getJSON = (url) => request(url, "json").dataPromise;
  const getText = (url) => request(url).dataPromise;
  var NHentaiImgExt = /* @__PURE__ */ ((NHentaiImgExt2) => {
    NHentaiImgExt2["j"] = "jpg";
    NHentaiImgExt2["p"] = "png";
    NHentaiImgExt2["g"] = "gif";
    return NHentaiImgExt2;
  })(NHentaiImgExt || {});
  const nHentaiImgExtReversed = invert$1(NHentaiImgExt);
  const getTypeFromExt = (ext) => nHentaiImgExtReversed[ext.toLowerCase()];
  const getMediaDownloadUrl = IS_NHENTAI ? (mid, filename) => `https://i.nhentai.net/galleries/${mid}/${filename}` : IS_NHENTAI_TO ? (mid, filename) => `https://cdn.nload.xyz/galleries/${mid}/${filename}` : (mid, filename) => `https://cdn.nhentai.xxx/g/${mid}/${filename}`;
  const getGalleryFromApi = (gid2) => {
    const url = `https://nhentai.net/api/gallery/${gid2}`;
    return getJSON(url);
  };
  const getGalleryFromWebpage = async (gid) => {
    var _a3;
    let doc = document;
    if (!IS_PAGE_MANGA_DETAIL) {
      const html = await getText(`/g/${gid}`);
      const match = (_a3 = /gallery(\(\{[\s\S]+\}\));/.exec(html)) == null ? void 0 : _a3[1];
      if (match) {
        try {
          const gallery = eval(match);
          gallery.id = Number(gid);
        } catch {
          logger.warn("get gallery by eval failed");
        }
      }
      const parser = new DOMParser();
      doc = parser.parseFromString(html, "text/html");
    }
    const $doc = $__default.default(doc.body);
    const english = $doc.find("#info h1").text();
    const japanese = $doc.find("#info h2").text();
    const pages = [];
    let mediaId = "";
    $doc.find("#thumbnail-container img").each((i2, img) => {
      var _a4;
      const src = (_a4 = img.dataset.src) != null ? _a4 : img.src;
      const match2 = /\/(\d+)\/(\d+)t?\.(\w+)/.exec(src);
      if (!match2)
        return;
      const [, mid, index2, ext] = match2;
      if (!mediaId)
        mediaId = mid;
      const t = getTypeFromExt(ext);
      if (!t)
        return;
      pages[Number(index2) - 1] = { t };
    });
    if (!english && !japanese || !mediaId || !pages.length) {
      throw new Error("Get gallery info error.");
    }
    return {
      id: Number(gid),
      media_id: mediaId,
      title: {
        english: english || japanese,
        japanese: japanese || english,
        pretty: english || japanese
      },
      images: {
        pages
      }
    };
  };
  const getGallery = async (gid2) => {
    const gallery2 = IS_NHENTAI ? await getGalleryFromApi(gid2) : await getGalleryFromWebpage(gid2);
    logger.log("gallery", gallery2);
    return gallery2;
  };
  const getGalleryInfo = async (gid2) => {
    const {
      id,
      media_id,
      title: { english: english2, japanese: japanese2, pretty },
      images: { pages: pages2 },
      num_pages
    } = await (async () => {
      var _a3, _b2;
      if (gid2)
        return getGallery(gid2);
      const gidFromUrl = (_a3 = /^\/g\/(\d+)/.exec(location.pathname)) == null ? void 0 : _a3[1];
      const localGallery = (_b2 = unsafeWindow._gallery) != null ? _b2 : unsafeWindow.gallery;
      if (localGallery) {
        if (gidFromUrl)
          localGallery.id = Number(gidFromUrl);
        return localGallery;
      }
      if (gidFromUrl)
        return getGallery(gidFromUrl);
      throw new Error("Cannot get gallery info.");
    })();
    const infoPages = (Array.isArray(pages2) ? pages2 : Object.values(pages2)).map(
      (img, i2) => ({ i: i2 + 1, t: NHentaiImgExt[img.t] })
    );
    const info = {
      gid: id,
      mid: media_id,
      title: japanese2 || english2,
      pages: infoPages,
      cfName: compileTemplate(settings.compressionFileName)({
        english: english2,
        japanese: japanese2 || english2,
        pretty,
        id,
        pages: num_pages
      })
    };
    logger.log("info", info);
    return info;
  };
  const downloadGalleryByInfo = async (info, { progressDisplayController, rangeCheckers } = {}) => {
    info.done = 0;
    let { mid, pages: pages2, cfName } = info.gallery;
    if (rangeCheckers == null ? void 0 : rangeCheckers.length) {
      pages2 = pages2.filter(({ i: i2 }) => rangeCheckers.some((check) => check(i2)));
    }
    let aborted = false;
    info.cancel = () => {
      aborted = true;
      progressDisplayController == null ? void 0 : progressDisplayController.reset();
    };
    progressDisplayController == null ? void 0 : progressDisplayController.bindInfo(info);
    progressDisplayController == null ? void 0 : progressDisplayController.updateProgress();
    const zip = await new JSZip();
    const downloadTask = (page, threadID, { filenameLength, customDownloadUrl }) => {
      if (info.error)
        return { abort: () => {
        }, promise: Promise.resolve() };
      const url = customDownloadUrl ? compileTemplate(customDownloadUrl)({ mid, index: page.i, ext: page.t }) : getMediaDownloadUrl(mid, `${page.i}.${page.t}`);
      logger.log(`[${threadID}] ${url}`);
      const { abort: abort2, dataPromise } = request(url, "arraybuffer");
      return {
        abort: () => {
          logger.log(`[${threadID}] abort`);
          abort2();
        },
        promise: dataPromise.then(async (data) => {
          if (data) {
            zip.file(`${String(page.i).padStart(filenameLength || 0, "0")}.${page.t}`, data);
          }
          info.done++;
          progressDisplayController == null ? void 0 : progressDisplayController.updateProgress();
        }).catch((e) => {
          if (isAbortError(e))
            return;
          info.error = true;
          throw e;
        })
      };
    };
    const multiThread = new MultiThread(pages2, downloadTask, {
      filenameLength: settings.filenameLength === "auto" ? Math.ceil(Math.log10(Math.max(...pages2.map(({ i: i2 }) => Number(i2))))) : settings.filenameLength,
      customDownloadUrl: settings.customDownloadUrl
    });
    const { abort, promise } = multiThread.start();
    info.cancel = () => {
      aborted = true;
      abort();
      progressDisplayController == null ? void 0 : progressDisplayController.reset();
    };
    if (!aborted)
      await promise;
    if (aborted)
      return;
    return async () => {
      info.compressing = true;
      progressDisplayController == null ? void 0 : progressDisplayController.updateProgress();
      logger.log("start compressing", cfName);
      let lastZipFile = "";
      const onCompressionUpdate = ({ workerId, percent, currentFile }) => {
        if (lastZipFile !== currentFile && currentFile) {
          lastZipFile = currentFile;
          logger.log(`[${workerId}] compressing ${percent.toFixed(2)}%`, currentFile);
        }
        info.compressingPercent = percent.toFixed(2);
        progressDisplayController == null ? void 0 : progressDisplayController.updateProgress();
      };
      if (settings.streamDownload) {
        logger.log("stream mode on");
        const fileStream = streamsaver.createWriteStream(cfName);
        const zipStream = await zip.generateStream(getCompressionOptions(), onCompressionUpdate);
        await zipStream.pipeTo(fileStream);
      } else {
        const data = await zip.generateAsync(getCompressionOptions(), onCompressionUpdate);
        fileSaver.saveAs(new File([data], cfName, { type: "application/zip" }));
      }
      logger.log("completed", cfName);
      progressDisplayController == null ? void 0 : progressDisplayController.complete();
      progressDisplayController == null ? void 0 : progressDisplayController.unbindInfo();
    };
  };
  const addDownloadGalleryTask = (gallery2, { progressDisplayController, markGalleryDownloaded } = {}) => {
    const info = vue.reactive(createMangaDownloadInfo(gallery2));
    info.cancel = () => {
      progressDisplayController == null ? void 0 : progressDisplayController.reset();
    };
    dlQueue.push(async () => {
      const zipFunc = await downloadGalleryByInfo(info, { progressDisplayController }).catch((e) => {
        progressDisplayController == null ? void 0 : progressDisplayController.error();
        errorRetryConfirm(
          "downloading",
          () => {
            dlQueue.skipFromError().catch(logger.error);
          },
          () => {
            info.error = false;
            dlQueue.restartFromError().catch(logger.error);
          }
        );
        throw e;
      });
      if (zipFunc) {
        zipQueue.push(async () => {
          try {
            await zipFunc();
            markAsDownloaded(gallery2.gid, gallery2.title);
            markGalleryDownloaded == null ? void 0 : markGalleryDownloaded();
          } catch (error) {
            if (!error)
              logger.warn("user abort stream download");
            logger.error(error);
            progressDisplayController == null ? void 0 : progressDisplayController.error();
          }
        }, info);
        zipQueue.start().catch(logger.error);
      }
    }, info);
    dlQueue.start().catch(logger.error);
  };
  class ProgressDisplayController {
    constructor(enableHeadTxt = false, docTitle) {
      __publicField(this, "downloadBtn");
      __publicField(this, "btnTxt");
      __publicField(this, "info");
      this.enableHeadTxt = enableHeadTxt;
      this.docTitle = docTitle;
      this.btnTxt = /* @__PURE__ */ createElement("span", {
        class: "download-zip-txt"
      }, this.defaultBtnText());
      this.downloadBtn = /* @__PURE__ */ createElement("button", {
        class: "btn btn-secondary nhentai-helper-btn download-zip-btn"
      }, /* @__PURE__ */ createElement("i", {
        class: "fa fa-download"
      }), " ", this.btnTxt);
    }
    get compressingHeadText() {
      return this.enableHeadTxt ? `Compressing ${getDownloadExt()} ` : "";
    }
    get downloadingHeadText() {
      return this.enableHeadTxt ? `Downloading ${getDownloadExt()} ` : "";
    }
    defaultBtnText(suffix) {
      if (!this.enableHeadTxt)
        return suffix != null ? suffix : "";
      return `Download ${getDownloadExt()}${suffix ? ` ${suffix}` : ""}`;
    }
    bindInfo(info) {
      this.info = info;
    }
    unbindInfo() {
      this.info = void 0;
    }
    lockBtn(text) {
      this.downloadBtn.setAttribute("disabled", "disabled");
      if (text)
        this.btnTxt.innerText = text;
    }
    releaseBtn() {
      this.downloadBtn.removeAttribute("disabled");
    }
    complete() {
      this.setDocTitle("\u2713");
      this.btnTxt.innerText = this.defaultBtnText("\u2713");
      this.releaseBtn();
    }
    reset() {
      this.setDocTitle();
      this.btnTxt.innerText = this.defaultBtnText();
      this.releaseBtn();
    }
    error() {
      this.releaseBtn();
      this.btnTxt.innerText = "Error";
      this.setDocTitle("\xD7");
    }
    updateProgress() {
      if (!this.info)
        return;
      const { done, compressing, compressingPercent } = this.info;
      if (compressing) {
        this.setDocTitle(`${compressingPercent}%`);
        this.btnTxt.innerText = `${this.compressingHeadText}${compressingPercent}%`;
      } else {
        const total = this.info.gallery.pages.length;
        this.setDocTitle(`${done}/${total}`);
        this.btnTxt.innerText = `${this.downloadingHeadText}${done}/${total}`;
      }
    }
    setDocTitle(prefix) {
      if (!this.docTitle)
        return;
      document.title = prefix ? `[${prefix}] ${this.docTitle}` : this.docTitle;
    }
  }
  class IgnoreController {
    constructor(text = true, status = false) {
      __publicField(this, "ignoreBtn");
      __publicField(this, "icon");
      __publicField(this, "text");
      this.status = status;
      this.icon = /* @__PURE__ */ createElement("i", {
        class: this.iconClass
      });
      if (text)
        this.text = /* @__PURE__ */ createElement("span", null, this.btnText);
      this.ignoreBtn = /* @__PURE__ */ createElement("button", {
        class: "btn btn-secondary nhentai-helper-btn ignore-btn"
      }, this.icon, " ", this.text);
    }
    setStatus(status) {
      this.status = status;
      this.updateBtn();
    }
    getStatus() {
      return this.status;
    }
    get iconClass() {
      return this.status ? "fa fa-eye-slash" : "fa fa-eye";
    }
    get btnText() {
      return this.status ? "Unignore this" : "Ignore this";
    }
    updateBtn() {
      this.icon.className = this.iconClass;
      if (this.text)
        this.text.innerText = this.btnText;
    }
  }
  const initDetailPage = async () => {
    const progressDisplayController = new ProgressDisplayController(true, document.title);
    const { downloadBtn } = progressDisplayController;
    const pagesInput = /* @__PURE__ */ createElement("input", {
      class: "pages-input",
      placeholder: "Download pages (e.g. 1-10,12,14,18-)"
    });
    $__default.default("#info > .buttons").append(downloadBtn).after(pagesInput);
    const gallery2 = await getGalleryInfo();
    let ignoreController;
    if (settings.showIgnoreButton) {
      const isDownloaded = await isDownloadedByGid(gallery2.gid);
      ignoreController = new IgnoreController(true, isDownloaded);
      const { ignoreBtn } = ignoreController;
      ignoreBtn.addEventListener("click", () => {
        const ignore = ignoreController.getStatus();
        if (ignore)
          unmarkAsDownloaded(gallery2.gid, gallery2.title);
        else
          markAsDownloaded(gallery2.gid, gallery2.title);
        ignoreController.setStatus(!ignore);
      });
      $__default.default("#info > .buttons").append(ignoreBtn);
    }
    downloadBtn.addEventListener("click", async () => {
      var _a3;
      const rangeCheckers = pagesInput.value.split(",").filter((range2) => !Number.isNaN(parseInt(range2))).map((range2) => {
        const [start, end2] = range2.split("-").map((num) => parseInt(num));
        if (typeof end2 === "undefined")
          return (page) => page === start;
        else if (Number.isNaN(end2))
          return (page) => page >= start;
        else
          return (page) => start <= page && page <= end2;
      });
      progressDisplayController.lockBtn();
      try {
        const downloaded = await isDownloadedByGid(gallery2.gid) || await isDownloadedByTitle(gallery2.title);
        if (downloaded && !await downloadAgainConfirm(gallery2.title)) {
          progressDisplayController.reset();
          markAsDownloaded(gallery2.gid, gallery2.title);
          ignoreController == null ? void 0 : ignoreController.setStatus(true);
          return;
        }
        await ((_a3 = await downloadGalleryByInfo(createMangaDownloadInfo(gallery2), {
          progressDisplayController,
          rangeCheckers
        })) == null ? void 0 : _a3());
        markAsDownloaded(gallery2.gid, gallery2.title);
        ignoreController == null ? void 0 : ignoreController.setStatus(true);
      } catch (error) {
        progressDisplayController.error();
        logger.error(error);
      }
    });
    applyAutoShowAll();
  };
  const applyAutoShowAll = () => {
    if (settings.autoShowAll) {
      getShowAllBtn().then(($btn) => $btn.trigger("click")).catch(logger.error);
    }
  };
  const createLangFilter = () => {
    const langFilter = /* @__PURE__ */ createElement("select", {
      id: "lang-filter",
      onChange: () => {
        filterLang(langFilter.value);
        sessionStorage.setItem("lang-filter", langFilter.value);
      }
    }, IS_NHENTAI_TO ? /* @__PURE__ */ createElement(Fragment, null, /* @__PURE__ */ createElement("option", {
      value: "0"
    }, "None"), /* @__PURE__ */ createElement("option", {
      value: "10197"
    }, "Chinese"), /* @__PURE__ */ createElement("option", {
      value: "2"
    }, "Japanese"), /* @__PURE__ */ createElement("option", {
      value: "19"
    }, "English")) : /* @__PURE__ */ createElement(Fragment, null, /* @__PURE__ */ createElement("option", {
      value: "0"
    }, "None"), /* @__PURE__ */ createElement("option", {
      value: "29963"
    }, "Chinese"), /* @__PURE__ */ createElement("option", {
      value: "6346"
    }, "Japanese"), /* @__PURE__ */ createElement("option", {
      value: "12227"
    }, "English")));
    $__default.default("ul.menu.left").append(
      /* @__PURE__ */ createElement("li", {
        style: { padding: "0 10px", userSelect: "none" }
      }, "Filter: ", langFilter)
    );
    return langFilter;
  };
  const filterLang = (lang, $node) => {
    const getNode = $node ? (selector) => $node.find(selector) : (selector) => $__default.default(selector);
    if (lang === "0")
      getNode(".gallery").removeClass("hidden");
    else {
      getNode(`.gallery[data-tags~=${lang}]`).removeClass("hidden");
      getNode(`.gallery:not([data-tags~=${lang}])`).addClass("hidden");
    }
  };
  const initListPage = () => {
    $__default.default(".gallery").each(initGallery);
    const langFilter = initLangFilter();
    initShortcut();
    restoreDownloadQueue();
    const contentEl = $__default.default("#content")[0];
    if (contentEl) {
      new MutationObserver((mutations) => {
        mutations.forEach(({ addedNodes }) => {
          addedNodes.forEach((node) => {
            const $el = $__default.default(node);
            $el.find(".gallery").each(initGallery);
            const lang = langFilter.value;
            if (lang)
              filterLang(lang, $el);
          });
        });
      }).observe(contentEl, { childList: true });
    }
  };
  const initLangFilter = () => {
    const langFilter = createLangFilter();
    const storedLangFilterVal = sessionStorage.getItem("lang-filter");
    if (storedLangFilterVal) {
      langFilter.value = storedLangFilterVal;
      filterLang(storedLangFilterVal);
    }
    return langFilter;
  };
  const initShortcut = () => {
    $__default.default(document).on("keydown", (event) => {
      switch (event.key) {
        case "ArrowLeft":
          $__default.default(".pagination .previous").trigger("click");
          break;
        case "ArrowRight":
          $__default.default(".pagination .next").trigger("click");
          break;
      }
    });
  };
  const restoreDownloadQueue = () => {
    const galleriesJson = sessionStorage.getItem("downloadQueue");
    if (!galleriesJson)
      return;
    try {
      const galleries = JSON.parse(galleriesJson);
      for (const gallery2 of galleries) {
        addDownloadGalleryTask(gallery2);
      }
    } catch (error) {
      logger.error(error);
    }
  };
  const initGallery = function() {
    var _a3;
    const $gallery = $__default.default(this);
    if ($gallery.attr("init"))
      return;
    $gallery.attr("init", "true");
    const $a = $gallery.find("a.cover");
    if (settings.openOnNewTab)
      $a.attr("target", "_blank");
    const gid2 = (_a3 = /\/g\/([0-9]+)/.exec($a.attr("href"))) == null ? void 0 : _a3[1];
    if (!gid2)
      return;
    const progressDisplayController = new ProgressDisplayController();
    const { downloadBtn } = progressDisplayController;
    $gallery.append(downloadBtn);
    let ignoreController;
    let galleryTitle;
    const markGalleryDownloaded = () => {
      $gallery.addClass("downloaded");
      ignoreController == null ? void 0 : ignoreController.setStatus(true);
    };
    const unmarkGalleryDownloaded = () => {
      $gallery.removeClass("downloaded");
      ignoreController == null ? void 0 : ignoreController.setStatus(false);
    };
    void isDownloadedByGid(gid2).then((downloaded) => {
      if (downloaded)
        markGalleryDownloaded();
      if (settings.showIgnoreButton) {
        ignoreController = new IgnoreController(false, downloaded);
        const { ignoreBtn } = ignoreController;
        ignoreBtn.addEventListener("click", () => {
          const ignore = ignoreController.getStatus();
          if (ignore) {
            unmarkGalleryDownloaded();
            unmarkAsDownloaded(gid2, galleryTitle);
          } else {
            markGalleryDownloaded();
            markAsDownloaded(gid2, galleryTitle);
          }
        });
        $gallery.append(ignoreBtn);
      }
    });
    let gallery2;
    let skipDownloadedCheck = false;
    const startDownload = async () => {
      if (!settings.autoCancelDownloadedManga) {
        progressDisplayController.lockBtn("Wait");
      }
      if (!skipDownloadedCheck && await isDownloadedByGid(gid2)) {
        const title = $gallery.find(".caption").text();
        if (!await downloadAgainConfirm(title, true)) {
          progressDisplayController.reset();
          markGalleryDownloaded();
          return;
        }
        skipDownloadedCheck = true;
      }
      if (settings.autoCancelDownloadedManga) {
        progressDisplayController.lockBtn("Wait");
      }
      if (!gallery2) {
        try {
          gallery2 = await getGalleryInfo(gid2);
          galleryTitle = gallery2.title;
        } catch (error) {
          logger.error(error);
          progressDisplayController.error();
          errorRetryConfirm("getting information", void 0, startDownload);
          return;
        }
      }
      if (!skipDownloadedCheck && (await isDownloadedByTitle(gallery2.title) || dlQueue.queue.some(
        ({
          info: {
            gallery: { title }
          }
        }) => title === gallery2.title
      )) && !await downloadAgainConfirm(gallery2.title, true)) {
        progressDisplayController.reset();
        markAsDownloaded(gid2, gallery2.title);
        markGalleryDownloaded();
        return;
      }
      addDownloadGalleryTask(gallery2, { progressDisplayController, markGalleryDownloaded });
    };
    downloadBtn.addEventListener("click", startDownload);
  };
  class StyleInjector {
    constructor(style) {
      __publicField(this, "styleNode");
      this.styleNode = /* @__PURE__ */ createElement("style", null, style);
    }
    inject() {
      document.head.append(this.styleNode);
    }
    remove() {
      this.styleNode.remove();
    }
  }
  const initOnlineViewPage = () => {
    if (!IS_NHENTAI)
      initViewMode();
  };
  const initViewMode = () => {
    const style = new StyleInjector(
      "#image-container img{width:auto;max-width:calc(100vw - 20px);max-height:100vh}"
    );
    const viewModeText = ["[off]", "[on]"];
    let viewMode = GM_getValue("online_view_mode", 0);
    applyOnlineViewStyle(!!viewMode, style);
    const btnText = /* @__PURE__ */ createElement("span", null, viewModeText[viewMode]);
    const btn = /* @__PURE__ */ createElement("button", {
      id: "online-view-mode-btn",
      class: "btn btn-secondary"
    }, "100% view height ", btnText);
    btn.addEventListener("click", () => {
      viewMode = 1 - viewMode;
      GM_setValue("online_view_mode", viewMode);
      btnText.innerText = viewModeText[viewMode];
      applyOnlineViewStyle(!!viewMode, style);
    });
    $__default.default("#page-container").prepend(btn);
  };
  const applyOnlineViewStyle = (enable, style) => {
    if (enable)
      style.inject();
    else
      style.remove();
  };
  const initPage = () => {
    if (IS_PAGE_MANGA_LIST) {
      initListPage();
      applyPjax();
    } else if (IS_PAGE_MANGA_DETAIL)
      initDetailPage().catch(logger.error);
    else if (IS_PAGE_ONLINE_VIEW)
      initOnlineViewPage();
  };
  const applyPjax = () => {
    $__default.default(document).pjax(".pagination a, .sort a", {
      container: "#content",
      fragment: "#content",
      timeout: 1e4
    });
    $__default.default(document).on("pjax:end", () => {
      $__default.default(".pagination a").each(function() {
        const $this = $__default.default(this);
        const href = $this.attr("href");
        const isPathname = href.startsWith("/");
        const url = isPathname ? new URL(href, location.origin) : new URL(href);
        url.searchParams.delete("_pjax");
        $this.attr("href", isPathname ? `${url.pathname}${url.search}` : url.href);
      });
      applyLazyLoad();
    });
  };
  const applyLazyLoad = () => {
    const { _n_app } = unsafeWindow;
    if (_n_app) {
      _n_app.install_lazy_loader();
      _n_app.install_blacklisting();
    }
  };
  GM_addStyle(GM_getResourceText("notycss"));
  const createAppAndMount = (app) => {
    const el = document.createElement("div");
    document.body.append(el);
    return vue.createApp(app).mount(el);
  };
  createAppAndMount(_sfc_main$s);
  initPage();
  const initSettingsDialogApp = functionOnce(() => createAppAndMount(_sfc_main));
  const openSettingsDialog = () => {
    const dialog = initSettingsDialogApp();
    dialog.open();
  };
  GM_registerMenuCommand("Settings", openSettingsDialog);
})($, null, Vue, EventEmitter3, saveAs, localforage, MD5, Comlink, Noty, streamSaver);
