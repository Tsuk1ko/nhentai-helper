// ==UserScript==
// @name               nHentai Helper
// @name:zh-CN         nHentai 助手
// @name:zh-TW         nHentai 助手
// @namespace          https://github.com/Tsuk1ko
// @version            3.17.0
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
// @require            https://unpkg.com/vue@3.5.11/dist/vue.global.prod.js
// @require            data:application/javascript,window.Vue%3DVue%2Cwindow.Date.now%7C%7C(window.Date.now%3D()%3D%3Enew%20Date().getTime())%3B
// @require            https://unpkg.com/element-plus@2.8.4/dist/index.full.min.js
// @require            https://unpkg.com/jquery@3.7.1/dist/jquery.min.js
// @resource           element-plus-css  https://unpkg.com/element-plus@2.8.4/dist/index.css
// @connect            nhentai.net
// @connect            i.nhentai.net
// @connect            i2.nhentai.net
// @connect            i3.nhentai.net
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

(t=>{if(typeof GM_addStyle=="function"){GM_addStyle(t);return}const o=document.createElement("style");o.textContent=t,document.head.append(o)})(' .nhentai-helper-hidden{display:none!important}.nhentai-helper-btn:disabled{cursor:wait}.nhentai-helper-gallery>.nhentai-helper-btn{position:absolute;top:0;min-width:42px;opacity:.8}.nhentai-helper-gallery:hover>.nhentai-helper-btn{opacity:1}.nhentai-helper-gallery .nhentai-helper-btn{position:absolute;top:0;margin:3px;z-index:2}.nhentai-helper-gallery .download-zip-btn{left:0}.nhentai-helper-gallery .ignore-btn{display:none;right:0}.nhentai-helper-gallery:hover .ignore-btn{display:block}.nhentai-helper-gallery.downloaded .caption{color:#999}#page-container{position:relative}@media screen and (max-width: 768px){#page-container{padding-top:40px}}#online-view-mode-btn{position:absolute;right:0;top:0;margin:0}.btn-noty-green{background-color:#66bb6a!important}.btn-noty-blue{background-color:#42a5f5!important}.btn-noty:hover{filter:brightness(1.15)}.noty_buttons{padding-top:0!important}.pages-input{-webkit-appearance:none;-moz-appearance:none;appearance:none;display:inline-block;border-radius:3px;padding:0 .1em 0 1em;font-size:1em;width:100%;height:40px;border:0;vertical-align:top;margin-top:5px}.noty_close_button{display:none}body.nhentai-helper-nhentai_xxx .reader_outer{position:relative}body.nhentai-helper-nhentai_xxx .g_buttons .download-zip-btn{margin-left:5px}.noty_layout_mixin,#noty_layout__top,#noty_layout__topLeft,#noty_layout__topCenter,#noty_layout__topRight,#noty_layout__bottom,#noty_layout__bottomLeft,#noty_layout__bottomCenter,#noty_layout__bottomRight,#noty_layout__center,#noty_layout__centerLeft,#noty_layout__centerRight{position:fixed;margin:0;padding:0;z-index:9999999;-webkit-transform:translateZ(0) scale(1,1);transform:translateZ(0) scale(1);-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-font-smoothing:subpixel-antialiased;filter:blur(0);-webkit-filter:blur(0);max-width:90%}#noty_layout__top{top:0;left:5%;width:90%}#noty_layout__topLeft{top:20px;left:20px;width:325px}#noty_layout__topCenter{top:5%;left:50%;width:325px;-webkit-transform:translate(-webkit-calc(-50% - .5px)) translateZ(0) scale(1,1);transform:translate(calc(-50% - .5px)) translateZ(0) scale(1)}#noty_layout__topRight{top:20px;right:20px;width:325px}#noty_layout__bottom{bottom:0;left:5%;width:90%}#noty_layout__bottomLeft{bottom:20px;left:20px;width:325px}#noty_layout__bottomCenter{bottom:5%;left:50%;width:325px;-webkit-transform:translate(-webkit-calc(-50% - .5px)) translateZ(0) scale(1,1);transform:translate(calc(-50% - .5px)) translateZ(0) scale(1)}#noty_layout__bottomRight{bottom:20px;right:20px;width:325px}#noty_layout__center{top:50%;left:50%;width:325px;-webkit-transform:translate(-webkit-calc(-50% - .5px),-webkit-calc(-50% - .5px)) translateZ(0) scale(1,1);transform:translate(calc(-50% - .5px),calc(-50% - .5px)) translateZ(0) scale(1)}#noty_layout__centerLeft{top:50%;left:20px;width:325px;-webkit-transform:translate(0,-webkit-calc(-50% - .5px)) translateZ(0) scale(1,1);transform:translateY(calc(-50% - .5px)) translateZ(0) scale(1)}#noty_layout__centerRight{top:50%;right:20px;width:325px;-webkit-transform:translate(0,-webkit-calc(-50% - .5px)) translateZ(0) scale(1,1);transform:translateY(calc(-50% - .5px)) translateZ(0) scale(1)}.noty_progressbar{display:none}.noty_has_timeout.noty_has_progressbar .noty_progressbar{display:block;position:absolute;left:0;bottom:0;height:3px;width:100%;background-color:#646464;opacity:.2;filter:alpha(opacity=10)}.noty_bar{-webkit-backface-visibility:hidden;-webkit-transform:translate(0,0) translateZ(0) scale(1,1);-ms-transform:translate(0,0) scale(1,1);transform:translate(0) scale(1);-webkit-font-smoothing:subpixel-antialiased;overflow:hidden}.noty_effects_open{opacity:0;-webkit-transform:translate(50%);-ms-transform:translate(50%);transform:translate(50%);-webkit-animation:noty_anim_in .5s cubic-bezier(.68,-.55,.265,1.55);animation:noty_anim_in .5s cubic-bezier(.68,-.55,.265,1.55);-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.noty_effects_close{-webkit-animation:noty_anim_out .5s cubic-bezier(.68,-.55,.265,1.55);animation:noty_anim_out .5s cubic-bezier(.68,-.55,.265,1.55);-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.noty_fix_effects_height{-webkit-animation:noty_anim_height 75ms ease-out;animation:noty_anim_height 75ms ease-out}.noty_close_with_click{cursor:pointer}.noty_close_button{position:absolute;top:2px;right:2px;font-weight:700;width:20px;height:20px;text-align:center;line-height:20px;background-color:#0000000d;border-radius:2px;cursor:pointer;-webkit-transition:all .2s ease-out;transition:all .2s ease-out}.noty_close_button:hover{background-color:#0000001a}.noty_modal{position:fixed;width:100%;height:100%;background-color:#000;z-index:10000;opacity:.3;left:0;top:0}.noty_modal.noty_modal_open{opacity:0;-webkit-animation:noty_modal_in .3s ease-out;animation:noty_modal_in .3s ease-out}.noty_modal.noty_modal_close{-webkit-animation:noty_modal_out .3s ease-out;animation:noty_modal_out .3s ease-out;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}@-webkit-keyframes noty_modal_in{to{opacity:.3}}@keyframes noty_modal_in{to{opacity:.3}}@-webkit-keyframes noty_modal_out{to{opacity:0}}@keyframes noty_modal_out{to{opacity:0}}@-webkit-keyframes noty_anim_in{to{-webkit-transform:translate(0);transform:translate(0);opacity:1}}@keyframes noty_anim_in{to{-webkit-transform:translate(0);transform:translate(0);opacity:1}}@-webkit-keyframes noty_anim_out{to{-webkit-transform:translate(50%);transform:translate(50%);opacity:0}}@keyframes noty_anim_out{to{-webkit-transform:translate(50%);transform:translate(50%);opacity:0}}@-webkit-keyframes noty_anim_height{to{height:0}}@keyframes noty_anim_height{to{height:0}}.noty_theme__relax.noty_bar{margin:4px 0;overflow:hidden;border-radius:2px;position:relative}.noty_theme__relax.noty_bar .noty_body{padding:10px}.noty_theme__relax.noty_bar .noty_buttons{border-top:1px solid #e7e7e7;padding:5px 10px}.noty_theme__relax.noty_type__alert,.noty_theme__relax.noty_type__notification{background-color:#fff;border:1px solid #dedede;color:#444}.noty_theme__relax.noty_type__warning{background-color:#ffeaa8;border:1px solid #FFC237;color:#826200}.noty_theme__relax.noty_type__warning .noty_buttons{border-color:#dfaa30}.noty_theme__relax.noty_type__error{background-color:#ff8181;border:1px solid #e25353;color:#fff}.noty_theme__relax.noty_type__error .noty_buttons{border-color:#8b0000}.noty_theme__relax.noty_type__info,.noty_theme__relax.noty_type__information{background-color:#78c5e7;border:1px solid #3badd6;color:#fff}.noty_theme__relax.noty_type__info .noty_buttons,.noty_theme__relax.noty_type__information .noty_buttons{border-color:#0b90c4}.noty_theme__relax.noty_type__success{background-color:#bcf5bc;border:1px solid #7cdd77;color:#006400}.noty_theme__relax.noty_type__success .noty_buttons{border-color:#50c24e}.noty_theme__metroui.noty_bar{margin:4px 0;overflow:hidden;position:relative;box-shadow:#0000004c 0 0 5px}.noty_theme__metroui.noty_bar .noty_progressbar{position:absolute;left:0;bottom:0;height:3px;width:100%;background-color:#000;opacity:.2;filter:alpha(opacity=20)}.noty_theme__metroui.noty_bar .noty_body{padding:1.25em;font-size:14px}.noty_theme__metroui.noty_bar .noty_buttons{padding:0 10px .5em}.noty_theme__metroui.noty_type__alert,.noty_theme__metroui.noty_type__notification{background-color:#fff;color:#1d1d1d}.noty_theme__metroui.noty_type__warning{background-color:#fa6800;color:#fff}.noty_theme__metroui.noty_type__error{background-color:#ce352c;color:#fff}.noty_theme__metroui.noty_type__info,.noty_theme__metroui.noty_type__information{background-color:#1ba1e2;color:#fff}.noty_theme__metroui.noty_type__success{background-color:#60a917;color:#fff}.noty_theme__mint.noty_bar{margin:4px 0;overflow:hidden;border-radius:2px;position:relative}.noty_theme__mint.noty_bar .noty_body{padding:10px;font-size:14px}.noty_theme__mint.noty_bar .noty_buttons{padding:10px}.noty_theme__mint.noty_type__alert,.noty_theme__mint.noty_type__notification{background-color:#fff;border-bottom:1px solid #D1D1D1;color:#2f2f2f}.noty_theme__mint.noty_type__warning{background-color:#ffae42;border-bottom:1px solid #E89F3C;color:#fff}.noty_theme__mint.noty_type__error{background-color:#de636f;border-bottom:1px solid #CA5A65;color:#fff}.noty_theme__mint.noty_type__info,.noty_theme__mint.noty_type__information{background-color:#7f7eff;border-bottom:1px solid #7473E8;color:#fff}.noty_theme__mint.noty_type__success{background-color:#afc765;border-bottom:1px solid #A0B55C;color:#fff}.noty_theme__sunset.noty_bar{margin:4px 0;overflow:hidden;border-radius:2px;position:relative}.noty_theme__sunset.noty_bar .noty_body{padding:10px;font-size:14px;text-shadow:1px 1px 1px rgba(0,0,0,.1)}.noty_theme__sunset.noty_bar .noty_buttons{padding:10px}.noty_theme__sunset.noty_type__alert,.noty_theme__sunset.noty_type__notification{background-color:#073b4c;color:#fff}.noty_theme__sunset.noty_type__alert .noty_progressbar,.noty_theme__sunset.noty_type__notification .noty_progressbar{background-color:#fff}.noty_theme__sunset.noty_type__warning{background-color:#ffd166;color:#fff}.noty_theme__sunset.noty_type__error{background-color:#ef476f;color:#fff}.noty_theme__sunset.noty_type__error .noty_progressbar{opacity:.4}.noty_theme__sunset.noty_type__info,.noty_theme__sunset.noty_type__information{background-color:#118ab2;color:#fff}.noty_theme__sunset.noty_type__info .noty_progressbar,.noty_theme__sunset.noty_type__information .noty_progressbar{opacity:.6}.noty_theme__sunset.noty_type__success{background-color:#06d6a0;color:#fff}.noty_theme__bootstrap-v3.noty_bar{margin:4px 0;overflow:hidden;position:relative;border:1px solid transparent;border-radius:4px}.noty_theme__bootstrap-v3.noty_bar .noty_body{padding:15px}.noty_theme__bootstrap-v3.noty_bar .noty_buttons{padding:10px}.noty_theme__bootstrap-v3.noty_bar .noty_close_button{font-size:21px;font-weight:700;line-height:1;color:#000;text-shadow:0 1px 0 #fff;filter:alpha(opacity=20);opacity:.2;background:transparent}.noty_theme__bootstrap-v3.noty_bar .noty_close_button:hover{background:transparent;text-decoration:none;cursor:pointer;filter:alpha(opacity=50);opacity:.5}.noty_theme__bootstrap-v3.noty_type__alert,.noty_theme__bootstrap-v3.noty_type__notification{background-color:#fff;color:inherit}.noty_theme__bootstrap-v3.noty_type__warning{background-color:#fcf8e3;color:#8a6d3b;border-color:#faebcc}.noty_theme__bootstrap-v3.noty_type__error{background-color:#f2dede;color:#a94442;border-color:#ebccd1}.noty_theme__bootstrap-v3.noty_type__info,.noty_theme__bootstrap-v3.noty_type__information{background-color:#d9edf7;color:#31708f;border-color:#bce8f1}.noty_theme__bootstrap-v3.noty_type__success{background-color:#dff0d8;color:#3c763d;border-color:#d6e9c6}.noty_theme__bootstrap-v4.noty_bar{margin:4px 0;overflow:hidden;position:relative;border:1px solid transparent;border-radius:.25rem}.noty_theme__bootstrap-v4.noty_bar .noty_body{padding:.75rem 1.25rem}.noty_theme__bootstrap-v4.noty_bar .noty_buttons{padding:10px}.noty_theme__bootstrap-v4.noty_bar .noty_close_button{font-size:1.5rem;font-weight:700;line-height:1;color:#000;text-shadow:0 1px 0 #fff;filter:alpha(opacity=20);opacity:.5;background:transparent}.noty_theme__bootstrap-v4.noty_bar .noty_close_button:hover{background:transparent;text-decoration:none;cursor:pointer;filter:alpha(opacity=50);opacity:.75}.noty_theme__bootstrap-v4.noty_type__alert,.noty_theme__bootstrap-v4.noty_type__notification{background-color:#fff;color:inherit}.noty_theme__bootstrap-v4.noty_type__warning{background-color:#fcf8e3;color:#8a6d3b;border-color:#faebcc}.noty_theme__bootstrap-v4.noty_type__error{background-color:#f2dede;color:#a94442;border-color:#ebccd1}.noty_theme__bootstrap-v4.noty_type__info,.noty_theme__bootstrap-v4.noty_type__information{background-color:#d9edf7;color:#31708f;border-color:#bce8f1}.noty_theme__bootstrap-v4.noty_type__success{background-color:#dff0d8;color:#3c763d;border-color:#d6e9c6}.noty_theme__semanticui.noty_bar{margin:4px 0;overflow:hidden;position:relative;border:1px solid transparent;font-size:1em;border-radius:.28571429rem;box-shadow:0 0 0 1px #22242638 inset,0 0 0 0 transparent}.noty_theme__semanticui.noty_bar .noty_body{padding:1em 1.5em;line-height:1.4285em}.noty_theme__semanticui.noty_bar .noty_buttons{padding:10px}.noty_theme__semanticui.noty_type__alert,.noty_theme__semanticui.noty_type__notification{background-color:#f8f8f9;color:#000000de}.noty_theme__semanticui.noty_type__warning{background-color:#fffaf3;color:#573a08;box-shadow:0 0 0 1px #c9ba9b inset,0 0 0 0 transparent}.noty_theme__semanticui.noty_type__error{background-color:#fff6f6;color:#9f3a38;box-shadow:0 0 0 1px #e0b4b4 inset,0 0 0 0 transparent}.noty_theme__semanticui.noty_type__info,.noty_theme__semanticui.noty_type__information{background-color:#f8ffff;color:#276f86;box-shadow:0 0 0 1px #a9d5de inset,0 0 0 0 transparent}.noty_theme__semanticui.noty_type__success{background-color:#fcfff5;color:#2c662d;box-shadow:0 0 0 1px #a3c293 inset,0 0 0 0 transparent}.noty_theme__nest.noty_bar{margin:0 0 15px;overflow:hidden;border-radius:2px;position:relative;box-shadow:#00000019 5px 4px 10px}.noty_theme__nest.noty_bar .noty_body{padding:10px;font-size:14px;text-shadow:1px 1px 1px rgba(0,0,0,.1)}.noty_theme__nest.noty_bar .noty_buttons{padding:10px}.noty_layout .noty_theme__nest.noty_bar{z-index:5}.noty_layout .noty_theme__nest.noty_bar:nth-child(2){position:absolute;top:0;margin-top:4px;margin-right:-4px;margin-left:4px;z-index:4;width:100%}.noty_layout .noty_theme__nest.noty_bar:nth-child(3){position:absolute;top:0;margin-top:8px;margin-right:-8px;margin-left:8px;z-index:3;width:100%}.noty_layout .noty_theme__nest.noty_bar:nth-child(4){position:absolute;top:0;margin-top:12px;margin-right:-12px;margin-left:12px;z-index:2;width:100%}.noty_layout .noty_theme__nest.noty_bar:nth-child(5){position:absolute;top:0;margin-top:16px;margin-right:-16px;margin-left:16px;z-index:1;width:100%}.noty_layout .noty_theme__nest.noty_bar:nth-child(n+6){position:absolute;top:0;margin-top:20px;margin-right:-20px;margin-left:20px;z-index:-1;width:100%}#noty_layout__bottomLeft .noty_theme__nest.noty_bar:nth-child(2),#noty_layout__topLeft .noty_theme__nest.noty_bar:nth-child(2){margin-top:4px;margin-left:-4px;margin-right:4px}#noty_layout__bottomLeft .noty_theme__nest.noty_bar:nth-child(3),#noty_layout__topLeft .noty_theme__nest.noty_bar:nth-child(3){margin-top:8px;margin-left:-8px;margin-right:8px}#noty_layout__bottomLeft .noty_theme__nest.noty_bar:nth-child(4),#noty_layout__topLeft .noty_theme__nest.noty_bar:nth-child(4){margin-top:12px;margin-left:-12px;margin-right:12px}#noty_layout__bottomLeft .noty_theme__nest.noty_bar:nth-child(5),#noty_layout__topLeft .noty_theme__nest.noty_bar:nth-child(5){margin-top:16px;margin-left:-16px;margin-right:16px}#noty_layout__bottomLeft .noty_theme__nest.noty_bar:nth-child(n+6),#noty_layout__topLeft .noty_theme__nest.noty_bar:nth-child(n+6){margin-top:20px;margin-left:-20px;margin-right:20px}.noty_theme__nest.noty_type__alert,.noty_theme__nest.noty_type__notification{background-color:#073b4c;color:#fff}.noty_theme__nest.noty_type__alert .noty_progressbar,.noty_theme__nest.noty_type__notification .noty_progressbar{background-color:#fff}.noty_theme__nest.noty_type__warning{background-color:#ffd166;color:#fff}.noty_theme__nest.noty_type__error{background-color:#ef476f;color:#fff}.noty_theme__nest.noty_type__error .noty_progressbar{opacity:.4}.noty_theme__nest.noty_type__info,.noty_theme__nest.noty_type__information{background-color:#118ab2;color:#fff}.noty_theme__nest.noty_type__info .noty_progressbar,.noty_theme__nest.noty_type__information .noty_progressbar{opacity:.6}.noty_theme__nest.noty_type__success{background-color:#06d6a0;color:#fff}.noty_theme__light.noty_bar{margin:4px 0;overflow:hidden;border-radius:2px;position:relative}.noty_theme__light.noty_bar .noty_body{padding:10px}.noty_theme__light.noty_bar .noty_buttons{border-top:1px solid #e7e7e7;padding:5px 10px}.noty_theme__light.noty_type__alert,.noty_theme__light.noty_type__notification{background-color:#fff;border:1px solid #dedede;color:#444}.noty_theme__light.noty_type__warning{background-color:#ffeaa8;border:1px solid #FFC237;color:#826200}.noty_theme__light.noty_type__warning .noty_buttons{border-color:#dfaa30}.noty_theme__light.noty_type__error{background-color:#ed7000;border:1px solid #e25353;color:#fff}.noty_theme__light.noty_type__error .noty_buttons{border-color:#8b0000}.noty_theme__light.noty_type__info,.noty_theme__light.noty_type__information{background-color:#78c5e7;border:1px solid #3badd6;color:#fff}.noty_theme__light.noty_type__info .noty_buttons,.noty_theme__light.noty_type__information .noty_buttons{border-color:#0b90c4}.noty_theme__light.noty_type__success{background-color:#57c880;border:1px solid #7cdd77;color:#006400}.noty_theme__light.noty_type__success .noty_buttons{border-color:#50c24e}.download-item[data-v-83b954f2]{position:relative;white-space:nowrap;padding:2px;overflow:visible}.download-item--can-cancel[data-v-83b954f2]:hover{width:calc(100% - 30px)}.download-item__cancel[data-v-83b954f2]{cursor:pointer;position:absolute;top:0;right:-30px;color:#f44336;font-size:20px;line-height:30px;width:30px}.download-item__title[data-v-83b954f2]{overflow:hidden;text-overflow:ellipsis;text-align:left}.download-item__progress[data-v-83b954f2]{background-color:#0000ff80;line-height:10px}.download-item--error .download-item__progress[data-v-83b954f2]{background-color:#ff000080}.download-item--compressing .download-item__progress[data-v-83b954f2]{background-color:#00ff0080}.download-item__progress-text[data-v-83b954f2]{transform:scale(.8)}#download-panel[data-v-f37e74c3]{overflow-x:hidden;position:fixed;top:20vh;right:0;width:calc(50vw - 620px);max-width:300px;min-width:150px;max-height:60vh;background-color:#000000b3;z-index:100;font-size:12px;overflow-y:scroll}#download-panel[data-v-f37e74c3]::-webkit-scrollbar{width:6px;background-color:#000000b3}#download-panel[data-v-f37e74c3]::-webkit-scrollbar-thumb{background-color:#fff9}.nhentai-helper-setting-help-buttons[data-v-77801b74]{float:left;position:absolute}.inline-item[data-v-77801b74]{display:inline-block}.inline-item[data-v-77801b74]:not(:last-of-type){margin-right:8px}.inline-item__name[data-v-77801b74]{margin-right:4px;-webkit-user-select:none;user-select:none}.monospace[data-v-77801b74]{font-family:monospace}span.monospace[data-v-77801b74]{-webkit-user-select:none;user-select:none}.code-type[data-v-77801b74]{color:var(--el-text-color-secondary)}#nhentai-helper-setting-dialog-outside{width:80%;max-width:800px}#nhentai-helper-setting-dialog .asterisk-example:before{content:"*";color:var(--el-color-danger);margin-right:4px}#nhentai-helper-setting-dialog label{font-weight:unset}#nhentai-helper-setting-dialog input:not([type=file]):not([type=checkbox]),#nhentai-helper-setting-dialog textarea{background:inherit;color:var(--el-input-text-color, var(--el-text-color-regular))}#nhentai-helper-setting-dialog .el-input.is-disabled .el-input__inner{color:var(--el-disabled-text-color)}#nhentai-helper-setting-dialog .el-slider__stop{border:solid 1px var(--el-slider-runway-bg-color)}#nhentai-helper-setting-dialog .el-form-item:last-of-type{margin-bottom:0}#nhentai-helper-setting-dialog .el-form-item.refresh-required>.el-form-item__label-wrap>.el-form-item__label:after{content:"*";color:var(--el-color-danger);margin-left:4px}#nhentai-helper-setting-dialog .el-form-item__content .el-link.is-underline:hover:after{bottom:8px}#nhentai-helper-setting-dialog .el-divider__text{color:var(--el-text-color-secondary);-webkit-user-select:none;user-select:none}#nhentai-helper-setting-dialog .m-l-16{margin-left:16px}#nhentai-helper-setting-dialog .m-b-32{margin-bottom:32px}#nhentai-helper-setting-dialog .no-sl,#nhentai-helper-setting-dialog .el-form-item__label{-webkit-user-select:none;user-select:none}#nhentai-helper-setting-dialog .el-table .el-input__prefix,#nhentai-helper-setting-dialog .el-table .el-input__suffix{line-height:30px}#nhentai-helper-setting-dialog .el-table__empty-block{display:none}#nhentai-helper-setting-dialog .el-link{color:var(--el-link-text-color)}#nhentai-helper-setting-dialog .el-link:hover{color:var(--el-link-hover-text-color)}#nhentai-helper-setting-dialog .el-collapse-item__header{font-family:inherit}.el-select-dropdown{-webkit-user-select:none;user-select:none}.language-filter[data-v-e2153767]{display:inline-flex;align-items:center;padding-left:10px;vertical-align:middle}.filter-select[data-v-e2153767]{width:140px;margin-right:-140px}.filter-select[data-v-e2153767] .el-input__inner{color:var(--el-input-text-color, var(--el-text-color-regular))!important;background:0 0!important}@media screen and (max-width: 644px){.language-filter[data-v-e2153767]{padding:10px 0}.filter-select[data-v-e2153767]{margin-right:0}}.bold[data-v-f7a715da]{font-weight:700}.popover-close-btn[data-v-f7a715da]{transform:translate(4px,-4px)}.info-label[data-v-f7a715da]{display:inline-block}.lang-zh .info-label[data-v-f7a715da]{min-width:30px}.lang-en .info-label[data-v-f7a715da]{min-width:80px}.info-tag-wrapper[data-v-f7a715da]{display:flex}.info-tag[data-v-f7a715da]{margin:2px;-webkit-user-select:none;user-select:none}.info-tag--pointer[data-v-f7a715da]{cursor:pointer}.image-loading[data-v-f7a715da]{width:100%;height:100%;background-color:#0009}.scroll-container[data-v-f7a715da]{min-height:400px;margin:8px -8px 0;overflow-y:auto}.scroll-container[data-v-f7a715da]::-webkit-scrollbar{width:6px}.scroll-container[data-v-f7a715da]::-webkit-scrollbar-thumb{background-color:#0003;border-radius:10px;transition:all .2s ease-in-out}.scroll-container[data-v-f7a715da]::-webkit-scrollbar-track{border-radius:10px}.scroll-container-inner[data-v-f7a715da]{padding:0 8px}.gallery-mini-popover .el-descriptions__header{align-items:flex-start!important}.gallery-mini-popover .el-descriptions__title{text-align:left!important}.gallery-mini-popover .el-descriptions__cell{display:flex;padding-bottom:0!important}.gallery-mini-popover .el-descriptions__label{flex-grow:0;flex-shrink:0}.gallery-mini-popover .el-descriptions__content{flex-grow:1;flex-shrink:1}.gallery-mini-popover .el-link{color:var(--el-link-text-color)!important}.gallery-mini-popover .el-link:hover{color:var(--el-link-hover-text-color)!important}.gallery-mini-popover .el-image{width:100%} ');

(function ($, vue, elementPlus) {
  'use strict';

  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __typeError = (msg) => {
    throw TypeError(msg);
  };
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
  var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
  var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), member.set(obj, value), value);
  var require_main_001 = __commonJS({
    "main-CPWAP_j8.js"(exports, module) {
      var _worker;
      var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
      var _GM_openInTab = /* @__PURE__ */ (() => typeof GM_openInTab != "undefined" ? GM_openInTab : void 0)();
      var _GM_registerMenuCommand = /* @__PURE__ */ (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
      var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
      var _GM_xmlhttpRequest = /* @__PURE__ */ (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
      var _unsafeWindow = /* @__PURE__ */ (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
      var _monkeyWindow = /* @__PURE__ */ (() => window)();
      const defaultSelector = {
        // list
        menuLeft: "ul.menu.left",
        gallery: ".gallery",
        galleryHref: ".gallery a",
        galleryList: "#content",
        galleryCover: "a.cover",
        galleryCaption: ".caption",
        pjaxTrigger: ".pagination a, .sort a",
        pjaxTarget: "#content",
        pjaxRemoveParam: ".pagination a",
        paginationPrevious: ".pagination .previous",
        paginationNext: ".pagination .next",
        // gallery
        showAllImagesButton: "#show-all-images-button",
        thumbnailContainer: "#thumbnail-container",
        thumbnailContainerImage: "#thumbnail-container img",
        thumbnailHref: "a.gallerythumb",
        englishTitle: "#info h1",
        japaneseTitle: "#info h2",
        tag: (text) => `#tags .tag-container:contains(${text}) .tag`,
        tagName: ".name",
        tagCount: ".count",
        pagesTag: "#tags .tag-container:contains(Pages) .name",
        uploadDateTag: "#tags .tag-container:contains(Uploaded) time",
        infoButtons: "#info > .buttons",
        // view
        mediaImage: "#image-container img",
        pageContainer: "#page-container"
      };
      const siteMap$1 = {
        "nhentai.xxx": {
          // list
          menuLeft: "ul.hd_left",
          gallery: ".gallery_item",
          galleryHref: ".gallery_item a",
          galleryList: ".main_wrap",
          galleryCover: "a",
          pjaxTrigger: ".pagination a, .sort_links a",
          pjaxTarget: ".main_wrap",
          paginationPrevious: ".pagination a:contains(Previous)",
          paginationNext: ".pagination a:contains(Next)",
          // gallery
          showAllImagesButton: "#show_all",
          thumbnailContainer: ".outer_thumbs",
          thumbnailContainerImage: ".outer_thumbs img",
          thumbnailHref: ".gt_th > a",
          englishTitle: ".info h1",
          japaneseTitle: ".info h2",
          tag: (text) => `li.tags:contains(${text})`,
          tagName: ".tag_name",
          tagCount: ".tag_count",
          pagesTag: ".tag_name.pages",
          uploadDateTag: ".tags.uploaded",
          infoButtons: ".info > .g_buttons",
          // view
          mediaImage: "#fimg",
          pageContainer: ".reader_outer"
        }
      };
      const selector = { ...defaultSelector, ...siteMap$1[location.hostname] };
      const WORKER_THREAD_NUM = Math.max(navigator.hardwareConcurrency - 1, 1);
      const { pathname, hostname } = location;
      const IS_PAGE_MANGA_DETAIL = /^\/g\/[0-9]+\/?(\?.*)?$/.test(pathname);
      const IS_PAGE_ONLINE_VIEW = /^\/g\/[0-9]+(\/list)?\/[0-9]+\/?(\?.*)?$/.test(pathname);
      const IS_PAGE_MANGA_LIST = !IS_PAGE_MANGA_DETAIL && !IS_PAGE_ONLINE_VIEW && !!document.querySelector(selector.gallery);
      const IS_NHENTAI = hostname === "nhentai.net";
      const IS_NHENTAI_TO = hostname === "nhentai.to" || hostname === "nhentai.website";
      const IS_NHENTAI_XXX = hostname === "nhentai.xxx";
      const MEDIA_URL_TEMPLATE_MAY_CHANGE = IS_NHENTAI_XXX;
      const MEDIA_URL_TEMPLATE_KEY = `media_url_template_${hostname}`;
      const THUMB_MEDIA_URL_TEMPLATE_KEY = `thumb_media_url_template_${hostname}`;
      const isNodeOrElement = typeof Node === "function" ? (val) => val instanceof Node : (val) => val && typeof val === "object" && typeof val.nodeType === "number" && typeof val.nodeName === "string";
      if (IS_NHENTAI) {
        if (_GM_getValue("prevent_console_clear", false) || localStorage.getItem("NHENTAI_HELPER_DEBUG")) {
          const c = _unsafeWindow.console;
          c._clear = c.clear;
          c.clear = () => {
          };
          c._log = c.log;
          c.log = (...args) => {
            if (args.length === 1 && isNodeOrElement(args[0])) return;
            c._log(...args);
          };
        }
      }
      const logger = {
        devLog: () => {
        },
        log: (...args) => {
          console.log("[nhentai-helper]", ...args);
        },
        warn: (...args) => {
          console.warn("[nhentai-helper]", ...args);
        },
        error: (...args) => {
          console.error("[nhentai-helper]", ...args);
        }
      };
      /*!
       * Copyright 2012, Chris Wanstrath
       * Released under the MIT License
       * https://github.com/defunkt/jquery-pjax
       */
      (function($2) {
        function fnPjax(selector2, container, options) {
          options = optionsFor(container, options);
          return this.on("click.pjax", selector2, function(event) {
            var opts = options;
            if (!opts.container) {
              opts = $2.extend({}, options);
              opts.container = $2(this).attr("data-pjax");
            }
            handleClick(event, opts);
          });
        }
        function handleClick(event, container, options) {
          options = optionsFor(container, options);
          var link = event.currentTarget;
          var $link = $2(link);
          if (link.tagName.toUpperCase() !== "A")
            throw "$.fn.pjax or $.pjax.click requires an anchor element";
          if (event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
            return;
          if (location.protocol !== link.protocol || location.hostname !== link.hostname)
            return;
          if (link.href.indexOf("#") > -1 && stripHash(link) == stripHash(location))
            return;
          if (event.isDefaultPrevented())
            return;
          var defaults = {
            url: link.href,
            container: $link.attr("data-pjax"),
            target: link
          };
          var opts = $2.extend({}, defaults, options);
          var clickEvent = $2.Event("pjax:click");
          $link.trigger(clickEvent, [opts]);
          if (!clickEvent.isDefaultPrevented()) {
            pjax(opts);
            event.preventDefault();
            $link.trigger("pjax:clicked", [opts]);
          }
        }
        function handleSubmit(event, container, options) {
          options = optionsFor(container, options);
          var form = event.currentTarget;
          var $form = $2(form);
          if (form.tagName.toUpperCase() !== "FORM")
            throw "$.pjax.submit requires a form element";
          var defaults = {
            type: ($form.attr("method") || "GET").toUpperCase(),
            url: $form.attr("action"),
            container: $form.attr("data-pjax"),
            target: form
          };
          if (defaults.type !== "GET" && window.FormData !== void 0) {
            defaults.data = new FormData(form);
            defaults.processData = false;
            defaults.contentType = false;
          } else {
            if ($form.find(":file").length) {
              return;
            }
            defaults.data = $form.serializeArray();
          }
          pjax($2.extend({}, defaults, options));
          event.preventDefault();
        }
        function pjax(options) {
          options = $2.extend(true, {}, $2.ajaxSettings, pjax.defaults, options);
          if ($2.isFunction(options.url)) {
            options.url = options.url();
          }
          var hash = parseURL(options.url).hash;
          var containerType = $2.type(options.container);
          if (containerType !== "string") {
            throw "expected string value for 'container' option; got " + containerType;
          }
          var context = options.context = $2(options.container);
          if (!context.length) {
            throw "the container selector '" + options.container + "' did not match anything";
          }
          if (!options.data) options.data = {};
          if ($2.isArray(options.data)) {
            options.data.push({ name: "_pjax", value: options.container });
          } else {
            options.data._pjax = options.container;
          }
          function fire(type, args, props) {
            if (!props) props = {};
            props.relatedTarget = options.target;
            var event = $2.Event(type, props);
            context.trigger(event, args);
            return !event.isDefaultPrevented();
          }
          var timeoutTimer;
          options.beforeSend = function(xhr2, settings2) {
            if (settings2.type !== "GET") {
              settings2.timeout = 0;
            }
            xhr2.setRequestHeader("X-PJAX", "true");
            xhr2.setRequestHeader("X-PJAX-Container", options.container);
            if (!fire("pjax:beforeSend", [xhr2, settings2]))
              return false;
            if (settings2.timeout > 0) {
              timeoutTimer = setTimeout(function() {
                if (fire("pjax:timeout", [xhr2, options]))
                  xhr2.abort("timeout");
              }, settings2.timeout);
              settings2.timeout = 0;
            }
            var url = parseURL(settings2.url);
            if (hash) url.hash = hash;
            options.requestUrl = stripInternalParams(url);
          };
          options.complete = function(xhr2, textStatus) {
            if (timeoutTimer)
              clearTimeout(timeoutTimer);
            fire("pjax:complete", [xhr2, textStatus, options]);
            fire("pjax:end", [xhr2, options]);
          };
          options.error = function(xhr2, textStatus, errorThrown) {
            var container = extractContainer("", xhr2, options);
            var allowed = fire("pjax:error", [xhr2, textStatus, errorThrown, options]);
            if (options.type == "GET" && textStatus !== "abort" && allowed) {
              locationReplace(container.url);
            }
          };
          options.success = function(data, status, xhr2) {
            var previousState = pjax.state;
            var currentVersion = typeof $2.pjax.defaults.version === "function" ? $2.pjax.defaults.version() : $2.pjax.defaults.version;
            var latestVersion = xhr2.getResponseHeader("X-PJAX-Version");
            var container = extractContainer(data, xhr2, options);
            var url = parseURL(container.url);
            if (hash) {
              url.hash = hash;
              container.url = url.href;
            }
            if (currentVersion && latestVersion && currentVersion !== latestVersion) {
              locationReplace(container.url);
              return;
            }
            if (!container.contents) {
              locationReplace(container.url);
              return;
            }
            pjax.state = {
              id: options.id || uniqueId(),
              url: container.url,
              title: container.title,
              container: options.container,
              fragment: options.fragment,
              timeout: options.timeout
            };
            if (options.push || options.replace) {
              window.history.replaceState(pjax.state, container.title, container.url);
            }
            var blurFocus = $2.contains(context, document.activeElement);
            if (blurFocus) {
              try {
                document.activeElement.blur();
              } catch (e) {
              }
            }
            if (container.title) document.title = container.title;
            fire("pjax:beforeReplace", [container.contents, options], {
              state: pjax.state,
              previousState
            });
            context.html(container.contents);
            var autofocusEl = context.find("input[autofocus], textarea[autofocus]").last()[0];
            if (autofocusEl && document.activeElement !== autofocusEl) {
              autofocusEl.focus();
            }
            executeScriptTags(container.scripts);
            var scrollTo = options.scrollTo;
            if (hash) {
              var name = decodeURIComponent(hash.slice(1));
              var target = document.getElementById(name) || document.getElementsByName(name)[0];
              if (target) scrollTo = $2(target).offset().top;
            }
            if (typeof scrollTo == "number") $2(window).scrollTop(scrollTo);
            fire("pjax:success", [data, status, xhr2, options]);
          };
          if (!pjax.state) {
            pjax.state = {
              id: uniqueId(),
              url: window.location.href,
              title: document.title,
              container: options.container,
              fragment: options.fragment,
              timeout: options.timeout
            };
            window.history.replaceState(pjax.state, document.title);
          }
          abortXHR(pjax.xhr);
          pjax.options = options;
          var xhr = pjax.xhr = $2.ajax(options);
          if (xhr.readyState > 0) {
            if (options.push && !options.replace) {
              cachePush(pjax.state.id, [options.container, cloneContents(context)]);
              window.history.pushState(null, "", options.requestUrl);
            }
            fire("pjax:start", [xhr, options]);
            fire("pjax:send", [xhr, options]);
          }
          return pjax.xhr;
        }
        function pjaxReload(container, options) {
          var defaults = {
            url: window.location.href,
            push: false,
            replace: true,
            scrollTo: false
          };
          return pjax($2.extend(defaults, optionsFor(container, options)));
        }
        function locationReplace(url) {
          window.history.replaceState(null, "", pjax.state.url);
          window.location.replace(url);
        }
        var initialPop = true;
        var initialURL = window.location.href;
        var initialState = window.history.state;
        if (initialState && initialState.container) {
          pjax.state = initialState;
        }
        if ("state" in window.history) {
          initialPop = false;
        }
        function onPjaxPopstate(event) {
          if (!initialPop) {
            abortXHR(pjax.xhr);
          }
          var previousState = pjax.state;
          var state = event.state;
          var direction;
          if (state && state.container) {
            if (initialPop && initialURL == state.url) return;
            if (previousState) {
              if (previousState.id === state.id) return;
              direction = previousState.id < state.id ? "forward" : "back";
            }
            var cache2 = cacheMapping[state.id] || [];
            var containerSelector = cache2[0] || state.container;
            var container = $2(containerSelector), contents = cache2[1];
            if (container.length) {
              if (previousState) {
                cachePop(direction, previousState.id, [containerSelector, cloneContents(container)]);
              }
              var popstateEvent = $2.Event("pjax:popstate", {
                state,
                direction
              });
              container.trigger(popstateEvent);
              var options = {
                id: state.id,
                url: state.url,
                container: containerSelector,
                push: false,
                fragment: state.fragment,
                timeout: state.timeout,
                scrollTo: false
              };
              if (contents) {
                container.trigger("pjax:start", [null, options]);
                pjax.state = state;
                if (state.title) document.title = state.title;
                var beforeReplaceEvent = $2.Event("pjax:beforeReplace", {
                  state,
                  previousState
                });
                container.trigger(beforeReplaceEvent, [contents, options]);
                container.html(contents);
                container.trigger("pjax:end", [null, options]);
              } else {
                pjax(options);
              }
              container[0].offsetHeight;
            } else {
              locationReplace(location.href);
            }
          }
          initialPop = false;
        }
        function fallbackPjax(options) {
          var url = $2.isFunction(options.url) ? options.url() : options.url, method = options.type ? options.type.toUpperCase() : "GET";
          var form = $2("<form>", {
            method: method === "GET" ? "GET" : "POST",
            action: url,
            style: "display:none"
          });
          if (method !== "GET" && method !== "POST") {
            form.append($2("<input>", {
              type: "hidden",
              name: "_method",
              value: method.toLowerCase()
            }));
          }
          var data = options.data;
          if (typeof data === "string") {
            $2.each(data.split("&"), function(index, value) {
              var pair = value.split("=");
              form.append($2("<input>", { type: "hidden", name: pair[0], value: pair[1] }));
            });
          } else if ($2.isArray(data)) {
            $2.each(data, function(index, value) {
              form.append($2("<input>", { type: "hidden", name: value.name, value: value.value }));
            });
          } else if (typeof data === "object") {
            var key;
            for (key in data)
              form.append($2("<input>", { type: "hidden", name: key, value: data[key] }));
          }
          $2(document.body).append(form);
          form.submit();
        }
        function abortXHR(xhr) {
          if (xhr && xhr.readyState < 4) {
            xhr.onreadystatechange = $2.noop;
            xhr.abort();
          }
        }
        function uniqueId() {
          return (/* @__PURE__ */ new Date()).getTime();
        }
        function cloneContents(container) {
          var cloned = container.clone();
          cloned.find("script").each(function() {
            if (!this.src) $2._data(this, "globalEval", false);
          });
          return cloned.contents();
        }
        function stripInternalParams(url) {
          url.search = url.search.replace(/([?&])(_pjax|_)=[^&]*/g, "").replace(/^&/, "");
          return url.href.replace(/\?($|#)/, "$1");
        }
        function parseURL(url) {
          var a = document.createElement("a");
          a.href = url;
          return a;
        }
        function stripHash(location2) {
          return location2.href.replace(/#.*/, "");
        }
        function optionsFor(container, options) {
          if (container && options) {
            options = $2.extend({}, options);
            options.container = container;
            return options;
          } else if ($2.isPlainObject(container)) {
            return container;
          } else {
            return { container };
          }
        }
        function findAll(elems, selector2) {
          return elems.filter(selector2).add(elems.find(selector2));
        }
        function parseHTML(html) {
          return $2.parseHTML(html, document, true);
        }
        function extractContainer(data, xhr, options) {
          var obj = {}, fullDocument = /<html/i.test(data);
          var serverUrl = xhr.getResponseHeader("X-PJAX-URL");
          obj.url = serverUrl ? stripInternalParams(parseURL(serverUrl)) : options.requestUrl;
          var $head, $body;
          if (fullDocument) {
            $body = $2(parseHTML(data.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));
            var head = data.match(/<head[^>]*>([\s\S.]*)<\/head>/i);
            $head = head != null ? $2(parseHTML(head[0])) : $body;
          } else {
            $head = $body = $2(parseHTML(data));
          }
          if ($body.length === 0)
            return obj;
          obj.title = findAll($head, "title").last().text();
          if (options.fragment) {
            var $fragment = $body;
            if (options.fragment !== "body") {
              $fragment = findAll($fragment, options.fragment).first();
            }
            if ($fragment.length) {
              obj.contents = options.fragment === "body" ? $fragment : $fragment.contents();
              if (!obj.title)
                obj.title = $fragment.attr("title") || $fragment.data("title");
            }
          } else if (!fullDocument) {
            obj.contents = $body;
          }
          if (obj.contents) {
            obj.contents = obj.contents.not(function() {
              return $2(this).is("title");
            });
            obj.contents.find("title").remove();
            obj.scripts = findAll(obj.contents, "script[src]").remove();
            obj.contents = obj.contents.not(obj.scripts);
          }
          if (obj.title) obj.title = $2.trim(obj.title);
          return obj;
        }
        function executeScriptTags(scripts) {
          if (!scripts) return;
          var existingScripts = $2("script[src]");
          scripts.each(function() {
            var src = this.src;
            var matchedScripts = existingScripts.filter(function() {
              return this.src === src;
            });
            if (matchedScripts.length) return;
            var script = document.createElement("script");
            var type = $2(this).attr("type");
            if (type) script.type = type;
            script.src = $2(this).attr("src");
            document.head.appendChild(script);
          });
        }
        var cacheMapping = {};
        var cacheForwardStack = [];
        var cacheBackStack = [];
        function cachePush(id, value) {
          cacheMapping[id] = value;
          cacheBackStack.push(id);
          trimCacheStack(cacheForwardStack, 0);
          trimCacheStack(cacheBackStack, pjax.defaults.maxCacheLength);
        }
        function cachePop(direction, id, value) {
          var pushStack, popStack;
          cacheMapping[id] = value;
          if (direction === "forward") {
            pushStack = cacheBackStack;
            popStack = cacheForwardStack;
          } else {
            pushStack = cacheForwardStack;
            popStack = cacheBackStack;
          }
          pushStack.push(id);
          id = popStack.pop();
          if (id) delete cacheMapping[id];
          trimCacheStack(pushStack, pjax.defaults.maxCacheLength);
        }
        function trimCacheStack(stack, length) {
          while (stack.length > length)
            delete cacheMapping[stack.shift()];
        }
        function findVersion() {
          return $2("meta").filter(function() {
            var name = $2(this).attr("http-equiv");
            return name && name.toUpperCase() === "X-PJAX-VERSION";
          }).attr("content");
        }
        function enable() {
          $2.fn.pjax = fnPjax;
          $2.pjax = pjax;
          $2.pjax.enable = $2.noop;
          $2.pjax.disable = disable;
          $2.pjax.click = handleClick;
          $2.pjax.submit = handleSubmit;
          $2.pjax.reload = pjaxReload;
          $2.pjax.defaults = {
            timeout: 650,
            push: true,
            replace: false,
            type: "GET",
            dataType: "html",
            scrollTo: 0,
            maxCacheLength: 20,
            version: findVersion
          };
          $2(window).on("popstate.pjax", onPjaxPopstate);
        }
        function disable() {
          $2.fn.pjax = function() {
            return this;
          };
          $2.pjax = fallbackPjax;
          $2.pjax.enable = enable;
          $2.pjax.disable = $2.noop;
          $2.pjax.click = $2.noop;
          $2.pjax.submit = $2.noop;
          $2.pjax.reload = function() {
            window.location.reload();
          };
          $2(window).off("popstate.pjax", onPjaxPopstate);
        }
        if ($2.event.props && $2.inArray("state", $2.event.props) < 0) {
          $2.event.props.push("state");
        } else if (!("state" in $2.Event.prototype)) {
          $2.event.addProp("state");
        }
        $2.support.pjax = window.history && window.history.pushState && window.history.replaceState && // pushState isn't reliable on iOS until 5.
        !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/);
        if ($2.support.pjax) {
          enable();
        } else {
          disable();
        }
      })(jQuery);
      const cssLoader = (e) => {
        const t2 = GM_getResourceText(e);
        return GM_addStyle(t2), t2;
      };
      cssLoader("element-plus-css");
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      var Symbol$1 = root.Symbol;
      var objectProto$i = Object.prototype;
      var hasOwnProperty$f = objectProto$i.hasOwnProperty;
      var nativeObjectToString$2 = objectProto$i.toString;
      var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;
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
      var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
      function baseGetTag(value) {
        if (value == null) {
          return value === void 0 ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString$1(value);
      }
      function isObjectLike(value) {
        return value != null && typeof value == "object";
      }
      var symbolTag$1 = "[object Symbol]";
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag$1;
      }
      function arrayMap(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index < length) {
          result[index] = iteratee(array[index], index, array);
        }
        return result;
      }
      var isArray$1 = Array.isArray;
      var INFINITY$2 = 1 / 0;
      var symbolProto$1 = Symbol$1 ? Symbol$1.prototype : void 0, symbolToString = symbolProto$1 ? symbolProto$1.toString : void 0;
      function baseToString(value) {
        if (typeof value == "string") {
          return value;
        }
        if (isArray$1(value)) {
          return arrayMap(value, baseToString) + "";
        }
        if (isSymbol(value)) {
          return symbolToString ? symbolToString.call(value) : "";
        }
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY$2 ? "-0" : result;
      }
      var reWhitespace = /\s/;
      function trimmedEndIndex(string) {
        var index = string.length;
        while (index-- && reWhitespace.test(string.charAt(index))) {
        }
        return index;
      }
      var reTrimStart = /^\s+/;
      function baseTrim(string) {
        return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
      }
      function isObject$4(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function");
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
        if (isObject$4(value)) {
          var other = typeof value.valueOf == "function" ? value.valueOf() : value;
          value = isObject$4(other) ? other + "" : other;
        }
        if (typeof value != "string") {
          return value === 0 ? value : +value;
        }
        value = baseTrim(value);
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
      }
      var INFINITY$1 = 1 / 0, MAX_INTEGER = 17976931348623157e292;
      function toFinite(value) {
        if (!value) {
          return value === 0 ? value : 0;
        }
        value = toNumber(value);
        if (value === INFINITY$1 || value === -INFINITY$1) {
          var sign = value < 0 ? -1 : 1;
          return sign * MAX_INTEGER;
        }
        return value === value ? value : 0;
      }
      function toInteger(value) {
        var result = toFinite(value), remainder = result % 1;
        return result === result ? remainder ? result - remainder : result : 0;
      }
      function identity(value) {
        return value;
      }
      var asyncTag = "[object AsyncFunction]", funcTag$1 = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
      function isFunction$1(value) {
        if (!isObject$4(value)) {
          return false;
        }
        var tag = baseGetTag(value);
        return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
      }
      var coreJsData = root["__core-js_shared__"];
      var maskSrcKey = function() {
        var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
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
        if (!isObject$4(value) || isMasked(value)) {
          return false;
        }
        var pattern = isFunction$1(value) ? reIsNative : reIsHostCtor;
        return pattern.test(toSource(value));
      }
      function getValue(object, key) {
        return object == null ? void 0 : object[key];
      }
      function getNative(object, key) {
        var value = getValue(object, key);
        return baseIsNative(value) ? value : void 0;
      }
      var WeakMap$1 = getNative(root, "WeakMap");
      function apply$1(func, thisArg, args) {
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
      var baseSetToString = !defineProperty ? identity : function(func, string) {
        return defineProperty(func, "toString", {
          "configurable": true,
          "enumerable": false,
          "value": constant(string),
          "writable": true
        });
      };
      var setToString = shortOut(baseSetToString);
      function arrayEach(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (iteratee(array[index], index, array) === false) {
            break;
          }
        }
        return array;
      }
      function baseFindIndex(array, predicate, fromIndex, fromRight) {
        var length = array.length, index = fromIndex + -1;
        while (++index < length) {
          if (predicate(array[index], index, array)) {
            return index;
          }
        }
        return -1;
      }
      function baseIsNaN(value) {
        return value !== value;
      }
      function strictIndexOf(array, value, fromIndex) {
        var index = fromIndex - 1, length = array.length;
        while (++index < length) {
          if (array[index] === value) {
            return index;
          }
        }
        return -1;
      }
      function baseIndexOf(array, value, fromIndex) {
        return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
      }
      function arrayIncludes(array, value) {
        var length = array == null ? 0 : array.length;
        return !!length && baseIndexOf(array, value, 0) > -1;
      }
      var MAX_SAFE_INTEGER$1 = 9007199254740991;
      var reIsUint = /^(?:0|[1-9]\d*)$/;
      function isIndex(value, length) {
        var type = typeof value;
        length = length == null ? MAX_SAFE_INTEGER$1 : length;
        return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
      }
      function baseAssignValue(object, key, value) {
        if (key == "__proto__" && defineProperty) {
          defineProperty(object, key, {
            "configurable": true,
            "enumerable": true,
            "value": value,
            "writable": true
          });
        } else {
          object[key] = value;
        }
      }
      function eq(value, other) {
        return value === other || value !== value && other !== other;
      }
      var objectProto$f = Object.prototype;
      var hasOwnProperty$d = objectProto$f.hasOwnProperty;
      function assignValue(object, key, value) {
        var objValue = object[key];
        if (!(hasOwnProperty$d.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
          baseAssignValue(object, key, value);
        }
      }
      function copyObject(source, props, object, customizer) {
        var isNew = !object;
        object || (object = {});
        var index = -1, length = props.length;
        while (++index < length) {
          var key = props[index];
          var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
          if (newValue === void 0) {
            newValue = source[key];
          }
          if (isNew) {
            baseAssignValue(object, key, newValue);
          } else {
            assignValue(object, key, newValue);
          }
        }
        return object;
      }
      var nativeMax = Math.max;
      function overRest(func, start, transform2) {
        start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
        return function() {
          var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
          while (++index < length) {
            array[index] = args[start + index];
          }
          index = -1;
          var otherArgs = Array(start + 1);
          while (++index < start) {
            otherArgs[index] = args[index];
          }
          otherArgs[start] = transform2(array);
          return apply$1(func, this, otherArgs);
        };
      }
      function baseRest(func, start) {
        return setToString(overRest(func, start, identity), func + "");
      }
      var MAX_SAFE_INTEGER = 9007199254740991;
      function isLength(value) {
        return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
      }
      function isArrayLike(value) {
        return value != null && isLength(value.length) && !isFunction$1(value);
      }
      function isIterateeCall(value, index, object) {
        if (!isObject$4(object)) {
          return false;
        }
        var type = typeof index;
        if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
          return eq(object[index], value);
        }
        return false;
      }
      function createAssigner(assigner) {
        return baseRest(function(object, sources) {
          var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
          customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            customizer = length < 3 ? void 0 : customizer;
            length = 1;
          }
          object = Object(object);
          while (++index < length) {
            var source = sources[index];
            if (source) {
              assigner(object, source, index, customizer);
            }
          }
          return object;
        });
      }
      var objectProto$e = Object.prototype;
      function isPrototype(value) {
        var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$e;
        return value === proto;
      }
      function baseTimes(n, iteratee) {
        var index = -1, result = Array(n);
        while (++index < n) {
          result[index] = iteratee(index);
        }
        return result;
      }
      var argsTag$2 = "[object Arguments]";
      function baseIsArguments(value) {
        return isObjectLike(value) && baseGetTag(value) == argsTag$2;
      }
      var objectProto$d = Object.prototype;
      var hasOwnProperty$c = objectProto$d.hasOwnProperty;
      var propertyIsEnumerable$1 = objectProto$d.propertyIsEnumerable;
      var isArguments = baseIsArguments(/* @__PURE__ */ function() {
        return arguments;
      }()) ? baseIsArguments : function(value) {
        return isObjectLike(value) && hasOwnProperty$c.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
      };
      function stubFalse() {
        return false;
      }
      var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
      var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
      var Buffer = moduleExports$1 ? root.Buffer : void 0;
      var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
      var isBuffer$1 = nativeIsBuffer || stubFalse;
      var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", errorTag$2 = "[object Error]", funcTag = "[object Function]", mapTag$2 = "[object Map]", numberTag$1 = "[object Number]", objectTag$3 = "[object Object]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$1 = "[object String]", weakMapTag$1 = "[object WeakMap]";
      var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$2 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] = typedArrayTags[dataViewTag$2] = typedArrayTags[dateTag$1] = typedArrayTags[errorTag$2] = typedArrayTags[funcTag] = typedArrayTags[mapTag$2] = typedArrayTags[numberTag$1] = typedArrayTags[objectTag$3] = typedArrayTags[regexpTag$1] = typedArrayTags[setTag$2] = typedArrayTags[stringTag$1] = typedArrayTags[weakMapTag$1] = false;
      function baseIsTypedArray(value) {
        return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
      }
      function baseUnary(func) {
        return function(value) {
          return func(value);
        };
      }
      var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var freeProcess = moduleExports && freeGlobal.process;
      var nodeUtil = function() {
        try {
          var types = freeModule && freeModule.require && freeModule.require("util").types;
          if (types) {
            return types;
          }
          return freeProcess && freeProcess.binding && freeProcess.binding("util");
        } catch (e) {
        }
      }();
      var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
      var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
      var objectProto$c = Object.prototype;
      var hasOwnProperty$b = objectProto$c.hasOwnProperty;
      function arrayLikeKeys(value, inherited) {
        var isArr = isArray$1(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer$1(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
        for (var key in value) {
          if ((inherited || hasOwnProperty$b.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
          (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
          isIndex(key, length)))) {
            result.push(key);
          }
        }
        return result;
      }
      function overArg(func, transform2) {
        return function(arg) {
          return func(transform2(arg));
        };
      }
      var nativeKeys = overArg(Object.keys, Object);
      var objectProto$b = Object.prototype;
      var hasOwnProperty$a = objectProto$b.hasOwnProperty;
      function baseKeys(object) {
        if (!isPrototype(object)) {
          return nativeKeys(object);
        }
        var result = [];
        for (var key in Object(object)) {
          if (hasOwnProperty$a.call(object, key) && key != "constructor") {
            result.push(key);
          }
        }
        return result;
      }
      function keys(object) {
        return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
      }
      function nativeKeysIn(object) {
        var result = [];
        if (object != null) {
          for (var key in Object(object)) {
            result.push(key);
          }
        }
        return result;
      }
      var objectProto$a = Object.prototype;
      var hasOwnProperty$9 = objectProto$a.hasOwnProperty;
      function baseKeysIn(object) {
        if (!isObject$4(object)) {
          return nativeKeysIn(object);
        }
        var isProto = isPrototype(object), result = [];
        for (var key in object) {
          if (!(key == "constructor" && (isProto || !hasOwnProperty$9.call(object, key)))) {
            result.push(key);
          }
        }
        return result;
      }
      function keysIn(object) {
        return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
      }
      var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
        copyObject(source, keysIn(source), object, customizer);
      });
      var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
      function isKey(value, object) {
        if (isArray$1(value)) {
          return false;
        }
        var type = typeof value;
        if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
          return true;
        }
        return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
      }
      var nativeCreate = getNative(Object, "create");
      function hashClear() {
        this.__data__ = nativeCreate ? nativeCreate(null) : {};
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
        if (nativeCreate) {
          var result = data[key];
          return result === HASH_UNDEFINED$2 ? void 0 : result;
        }
        return hasOwnProperty$8.call(data, key) ? data[key] : void 0;
      }
      var objectProto$8 = Object.prototype;
      var hasOwnProperty$7 = objectProto$8.hasOwnProperty;
      function hashHas(key) {
        var data = this.__data__;
        return nativeCreate ? data[key] !== void 0 : hasOwnProperty$7.call(data, key);
      }
      var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
      function hashSet(key, value) {
        var data = this.__data__;
        this.size += this.has(key) ? 0 : 1;
        data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED$1 : value;
        return this;
      }
      function Hash(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
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
      function assocIndexOf(array, key) {
        var length = array.length;
        while (length--) {
          if (eq(array[length][0], key)) {
            return length;
          }
        }
        return -1;
      }
      var arrayProto = Array.prototype;
      var splice = arrayProto.splice;
      function listCacheDelete(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
          return false;
        }
        var lastIndex = data.length - 1;
        if (index == lastIndex) {
          data.pop();
        } else {
          splice.call(data, index, 1);
        }
        --this.size;
        return true;
      }
      function listCacheGet(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        return index < 0 ? void 0 : data[index][1];
      }
      function listCacheHas(key) {
        return assocIndexOf(this.__data__, key) > -1;
      }
      function listCacheSet(key, value) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
          ++this.size;
          data.push([key, value]);
        } else {
          data[index][1] = value;
        }
        return this;
      }
      function ListCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      ListCache.prototype.clear = listCacheClear;
      ListCache.prototype["delete"] = listCacheDelete;
      ListCache.prototype.get = listCacheGet;
      ListCache.prototype.has = listCacheHas;
      ListCache.prototype.set = listCacheSet;
      var Map$1 = getNative(root, "Map");
      function mapCacheClear() {
        this.size = 0;
        this.__data__ = {
          "hash": new Hash(),
          "map": new (Map$1 || ListCache)(),
          "string": new Hash()
        };
      }
      function isKeyable(value) {
        var type = typeof value;
        return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
      }
      function getMapData(map2, key) {
        var data = map2.__data__;
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
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
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
          var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache2 = memoized.cache;
          if (cache2.has(key)) {
            return cache2.get(key);
          }
          var result = func.apply(this, args);
          memoized.cache = cache2.set(key, result) || cache2;
          return result;
        };
        memoized.cache = new (memoize.Cache || MapCache)();
        return memoized;
      }
      memoize.Cache = MapCache;
      var MAX_MEMOIZE_SIZE = 500;
      function memoizeCapped(func) {
        var result = memoize(func, function(key) {
          if (cache2.size === MAX_MEMOIZE_SIZE) {
            cache2.clear();
          }
          return key;
        });
        var cache2 = result.cache;
        return result;
      }
      var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
      var reEscapeChar = /\\(\\)?/g;
      var stringToPath = memoizeCapped(function(string) {
        var result = [];
        if (string.charCodeAt(0) === 46) {
          result.push("");
        }
        string.replace(rePropName, function(match2, number2, quote, subString) {
          result.push(quote ? subString.replace(reEscapeChar, "$1") : number2 || match2);
        });
        return result;
      });
      function toString$1(value) {
        return value == null ? "" : baseToString(value);
      }
      function castPath(value, object) {
        if (isArray$1(value)) {
          return value;
        }
        return isKey(value, object) ? [value] : stringToPath(toString$1(value));
      }
      var INFINITY = 1 / 0;
      function toKey(value) {
        if (typeof value == "string" || isSymbol(value)) {
          return value;
        }
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY ? "-0" : result;
      }
      function baseGet(object, path) {
        path = castPath(path, object);
        var index = 0, length = path.length;
        while (object != null && index < length) {
          object = object[toKey(path[index++])];
        }
        return index && index == length ? object : void 0;
      }
      function get(object, path, defaultValue) {
        var result = object == null ? void 0 : baseGet(object, path);
        return result === void 0 ? defaultValue : result;
      }
      function arrayPush(array, values2) {
        var index = -1, length = values2.length, offset = array.length;
        while (++index < length) {
          array[offset + index] = values2[index];
        }
        return array;
      }
      var getPrototype = overArg(Object.getPrototypeOf, Object);
      var objectTag$2 = "[object Object]";
      var funcProto = Function.prototype, objectProto$7 = Object.prototype;
      var funcToString = funcProto.toString;
      var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
      var objectCtorString = funcToString.call(Object);
      function isPlainObject$1(value) {
        if (!isObjectLike(value) || baseGetTag(value) != objectTag$2) {
          return false;
        }
        var proto = getPrototype(value);
        if (proto === null) {
          return true;
        }
        var Ctor = hasOwnProperty$6.call(proto, "constructor") && proto.constructor;
        return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
      }
      var domExcTag = "[object DOMException]", errorTag$1 = "[object Error]";
      function isError(value) {
        if (!isObjectLike(value)) {
          return false;
        }
        var tag = baseGetTag(value);
        return tag == errorTag$1 || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject$1(value);
      }
      var attempt = baseRest(function(func, args) {
        try {
          return apply$1(func, void 0, args);
        } catch (e) {
          return isError(e) ? e : new Error(e);
        }
      });
      var FUNC_ERROR_TEXT = "Expected a function";
      function before(n, func) {
        var result;
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        n = toInteger(n);
        return function() {
          if (--n > 0) {
            result = func.apply(this, arguments);
          }
          if (n <= 1) {
            func = void 0;
          }
          return result;
        };
      }
      function basePropertyOf(object) {
        return function(key) {
          return object == null ? void 0 : object[key];
        };
      }
      function castArray() {
        if (!arguments.length) {
          return [];
        }
        var value = arguments[0];
        return isArray$1(value) ? value : [value];
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
          if (!Map$1 || pairs.length < LARGE_ARRAY_SIZE - 1) {
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
      function arrayFilter(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
        while (++index < length) {
          var value = array[index];
          if (predicate(value, index, array)) {
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
      var nativeGetSymbols = Object.getOwnPropertySymbols;
      var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
        if (object == null) {
          return [];
        }
        object = Object(object);
        return arrayFilter(nativeGetSymbols(object), function(symbol) {
          return propertyIsEnumerable.call(object, symbol);
        });
      };
      function baseGetAllKeys(object, keysFunc, symbolsFunc) {
        var result = keysFunc(object);
        return isArray$1(object) ? result : arrayPush(result, symbolsFunc(object));
      }
      function getAllKeys(object) {
        return baseGetAllKeys(object, keys, getSymbols);
      }
      var DataView = getNative(root, "DataView");
      var Promise$1 = getNative(root, "Promise");
      var Set$1 = getNative(root, "Set");
      var mapTag$1 = "[object Map]", objectTag$1 = "[object Object]", promiseTag = "[object Promise]", setTag$1 = "[object Set]", weakMapTag = "[object WeakMap]";
      var dataViewTag$1 = "[object DataView]";
      var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map$1), promiseCtorString = toSource(Promise$1), setCtorString = toSource(Set$1), weakMapCtorString = toSource(WeakMap$1);
      var getTag = baseGetTag;
      if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$1 || Map$1 && getTag(new Map$1()) != mapTag$1 || Promise$1 && getTag(Promise$1.resolve()) != promiseTag || Set$1 && getTag(new Set$1()) != setTag$1 || WeakMap$1 && getTag(new WeakMap$1()) != weakMapTag) {
        getTag = function(value) {
          var result = baseGetTag(value), Ctor = result == objectTag$1 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
          if (ctorString) {
            switch (ctorString) {
              case dataViewCtorString:
                return dataViewTag$1;
              case mapCtorString:
                return mapTag$1;
              case promiseCtorString:
                return promiseTag;
              case setCtorString:
                return setTag$1;
              case weakMapCtorString:
                return weakMapTag;
            }
          }
          return result;
        };
      }
      var Uint8Array$1 = root.Uint8Array;
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      function setCacheAdd(value) {
        this.__data__.set(value, HASH_UNDEFINED);
        return this;
      }
      function setCacheHas(value) {
        return this.__data__.has(value);
      }
      function SetCache(values2) {
        var index = -1, length = values2 == null ? 0 : values2.length;
        this.__data__ = new MapCache();
        while (++index < length) {
          this.add(values2[index]);
        }
      }
      SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
      SetCache.prototype.has = setCacheHas;
      function arraySome(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (predicate(array[index], index, array)) {
            return true;
          }
        }
        return false;
      }
      function cacheHas(cache2, key) {
        return cache2.has(key);
      }
      var COMPARE_PARTIAL_FLAG$5 = 1, COMPARE_UNORDERED_FLAG$3 = 2;
      function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG$5, arrLength = array.length, othLength = other.length;
        if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
          return false;
        }
        var arrStacked = stack.get(array);
        var othStacked = stack.get(other);
        if (arrStacked && othStacked) {
          return arrStacked == other && othStacked == array;
        }
        var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG$3 ? new SetCache() : void 0;
        stack.set(array, other);
        stack.set(other, array);
        while (++index < arrLength) {
          var arrValue = array[index], othValue = other[index];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
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
        stack["delete"](array);
        stack["delete"](other);
        return result;
      }
      function mapToArray(map2) {
        var index = -1, result = Array(map2.size);
        map2.forEach(function(value, key) {
          result[++index] = [key, value];
        });
        return result;
      }
      function setToArray(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index] = value;
        });
        return result;
      }
      var COMPARE_PARTIAL_FLAG$4 = 1, COMPARE_UNORDERED_FLAG$2 = 2;
      var boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]";
      var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]";
      var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
      function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
        switch (tag) {
          case dataViewTag:
            if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
              return false;
            }
            object = object.buffer;
            other = other.buffer;
          case arrayBufferTag:
            if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array$1(object), new Uint8Array$1(other))) {
              return false;
            }
            return true;
          case boolTag:
          case dateTag:
          case numberTag:
            return eq(+object, +other);
          case errorTag:
            return object.name == other.name && object.message == other.message;
          case regexpTag:
          case stringTag:
            return object == other + "";
          case mapTag:
            var convert = mapToArray;
          case setTag:
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4;
            convert || (convert = setToArray);
            if (object.size != other.size && !isPartial) {
              return false;
            }
            var stacked = stack.get(object);
            if (stacked) {
              return stacked == other;
            }
            bitmask |= COMPARE_UNORDERED_FLAG$2;
            stack.set(object, other);
            var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
            stack["delete"](object);
            return result;
          case symbolTag:
            if (symbolValueOf) {
              return symbolValueOf.call(object) == symbolValueOf.call(other);
            }
        }
        return false;
      }
      var COMPARE_PARTIAL_FLAG$3 = 1;
      var objectProto$5 = Object.prototype;
      var hasOwnProperty$5 = objectProto$5.hasOwnProperty;
      function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
        if (objLength != othLength && !isPartial) {
          return false;
        }
        var index = objLength;
        while (index--) {
          var key = objProps[index];
          if (!(isPartial ? key in other : hasOwnProperty$5.call(other, key))) {
            return false;
          }
        }
        var objStacked = stack.get(object);
        var othStacked = stack.get(other);
        if (objStacked && othStacked) {
          return objStacked == other && othStacked == object;
        }
        var result = true;
        stack.set(object, other);
        stack.set(other, object);
        var skipCtor = isPartial;
        while (++index < objLength) {
          key = objProps[index];
          var objValue = object[key], othValue = other[key];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
          }
          if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
            result = false;
            break;
          }
          skipCtor || (skipCtor = key == "constructor");
        }
        if (result && !skipCtor) {
          var objCtor = object.constructor, othCtor = other.constructor;
          if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
            result = false;
          }
        }
        stack["delete"](object);
        stack["delete"](other);
        return result;
      }
      var COMPARE_PARTIAL_FLAG$2 = 1;
      var argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]";
      var objectProto$4 = Object.prototype;
      var hasOwnProperty$4 = objectProto$4.hasOwnProperty;
      function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
        var objIsArr = isArray$1(object), othIsArr = isArray$1(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
        objTag = objTag == argsTag ? objectTag : objTag;
        othTag = othTag == argsTag ? objectTag : othTag;
        var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
        if (isSameTag && isBuffer$1(object)) {
          if (!isBuffer$1(other)) {
            return false;
          }
          objIsArr = true;
          objIsObj = false;
        }
        if (isSameTag && !objIsObj) {
          stack || (stack = new Stack());
          return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
        }
        if (!(bitmask & COMPARE_PARTIAL_FLAG$2)) {
          var objIsWrapped = objIsObj && hasOwnProperty$4.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty$4.call(other, "__wrapped__");
          if (objIsWrapped || othIsWrapped) {
            var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
            stack || (stack = new Stack());
            return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
          }
        }
        if (!isSameTag) {
          return false;
        }
        stack || (stack = new Stack());
        return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
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
      var COMPARE_PARTIAL_FLAG$1 = 1, COMPARE_UNORDERED_FLAG$1 = 2;
      function baseIsMatch(object, source, matchData, customizer) {
        var index = matchData.length, length = index;
        if (object == null) {
          return !length;
        }
        object = Object(object);
        while (index--) {
          var data = matchData[index];
          if (data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
            return false;
          }
        }
        while (++index < length) {
          data = matchData[index];
          var key = data[0], objValue = object[key], srcValue = data[1];
          if (data[2]) {
            if (objValue === void 0 && !(key in object)) {
              return false;
            }
          } else {
            var stack = new Stack();
            var result;
            if (!(result === void 0 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, customizer, stack) : result)) {
              return false;
            }
          }
        }
        return true;
      }
      function isStrictComparable(value) {
        return value === value && !isObject$4(value);
      }
      function getMatchData(object) {
        var result = keys(object), length = result.length;
        while (length--) {
          var key = result[length], value = object[key];
          result[length] = [key, value, isStrictComparable(value)];
        }
        return result;
      }
      function matchesStrictComparable(key, srcValue) {
        return function(object) {
          if (object == null) {
            return false;
          }
          return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
        };
      }
      function baseMatches(source) {
        var matchData = getMatchData(source);
        if (matchData.length == 1 && matchData[0][2]) {
          return matchesStrictComparable(matchData[0][0], matchData[0][1]);
        }
        return function(object) {
          return object === source || baseIsMatch(object, source, matchData);
        };
      }
      function baseHasIn(object, key) {
        return object != null && key in Object(object);
      }
      function hasPath(object, path, hasFunc) {
        path = castPath(path, object);
        var index = -1, length = path.length, result = false;
        while (++index < length) {
          var key = toKey(path[index]);
          if (!(result = object != null && hasFunc(object, key))) {
            break;
          }
          object = object[key];
        }
        if (result || ++index != length) {
          return result;
        }
        length = object == null ? 0 : object.length;
        return !!length && isLength(length) && isIndex(key, length) && (isArray$1(object) || isArguments(object));
      }
      function hasIn(object, path) {
        return object != null && hasPath(object, path, baseHasIn);
      }
      var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
      function baseMatchesProperty(path, srcValue) {
        if (isKey(path) && isStrictComparable(srcValue)) {
          return matchesStrictComparable(toKey(path), srcValue);
        }
        return function(object) {
          var objValue = get(object, path);
          return objValue === void 0 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
        };
      }
      function baseProperty(key) {
        return function(object) {
          return object == null ? void 0 : object[key];
        };
      }
      function basePropertyDeep(path) {
        return function(object) {
          return baseGet(object, path);
        };
      }
      function property(path) {
        return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
      }
      function baseIteratee(value) {
        if (typeof value == "function") {
          return value;
        }
        if (value == null) {
          return identity;
        }
        if (typeof value == "object") {
          return isArray$1(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
        }
        return property(value);
      }
      function arrayAggregator(array, setter, iteratee, accumulator) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          var value = array[index];
          setter(accumulator, value, iteratee(value), array);
        }
        return accumulator;
      }
      function createBaseFor(fromRight) {
        return function(object, iteratee, keysFunc) {
          var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
          while (length--) {
            var key = props[++index];
            if (iteratee(iterable[key], key, iterable) === false) {
              break;
            }
          }
          return object;
        };
      }
      var baseFor = createBaseFor();
      function baseForOwn(object, iteratee) {
        return object && baseFor(object, iteratee, keys);
      }
      function createBaseEach(eachFunc, fromRight) {
        return function(collection, iteratee) {
          if (collection == null) {
            return collection;
          }
          if (!isArrayLike(collection)) {
            return eachFunc(collection, iteratee);
          }
          var length = collection.length, index = -1, iterable = Object(collection);
          while (++index < length) {
            if (iteratee(iterable[index], index, iterable) === false) {
              break;
            }
          }
          return collection;
        };
      }
      var baseEach = createBaseEach(baseForOwn);
      function baseAggregator(collection, setter, iteratee, accumulator) {
        baseEach(collection, function(value, key, collection2) {
          setter(accumulator, value, iteratee(value), collection2);
        });
        return accumulator;
      }
      function createAggregator(setter, initializer) {
        return function(collection, iteratee) {
          var func = isArray$1(collection) ? arrayAggregator : baseAggregator, accumulator = {};
          return func(collection, setter, baseIteratee(iteratee), accumulator);
        };
      }
      function isArrayLikeObject(value) {
        return isObjectLike(value) && isArrayLike(value);
      }
      function last(array) {
        var length = array == null ? 0 : array.length;
        return length ? array[length - 1] : void 0;
      }
      function castFunction(value) {
        return typeof value == "function" ? value : identity;
      }
      function forEach(collection, iteratee) {
        var func = isArray$1(collection) ? arrayEach : baseEach;
        return func(collection, castFunction(iteratee));
      }
      var htmlEscapes = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };
      var escapeHtmlChar = basePropertyOf(htmlEscapes);
      var reUnescapedHtml = /[&<>"']/g, reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
      function escape$1(string) {
        string = toString$1(string);
        return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
      }
      function baseFilter(collection, predicate) {
        var result = [];
        baseEach(collection, function(value, index, collection2) {
          if (predicate(value, index, collection2)) {
            result.push(value);
          }
        });
        return result;
      }
      function filter(collection, predicate) {
        var func = isArray$1(collection) ? arrayFilter : baseFilter;
        return func(collection, baseIteratee(predicate));
      }
      function baseMap(collection, iteratee) {
        var index = -1, result = isArrayLike(collection) ? Array(collection.length) : [];
        baseEach(collection, function(value, key, collection2) {
          result[++index] = iteratee(value, key, collection2);
        });
        return result;
      }
      function map(collection, iteratee) {
        var func = isArray$1(collection) ? arrayMap : baseMap;
        return func(collection, baseIteratee(iteratee));
      }
      var objectProto$3 = Object.prototype;
      var hasOwnProperty$3 = objectProto$3.hasOwnProperty;
      var groupBy = createAggregator(function(result, value, key) {
        if (hasOwnProperty$3.call(result, key)) {
          result[key].push(value);
        } else {
          baseAssignValue(result, key, [value]);
        }
      });
      function baseValues(object, props) {
        return arrayMap(props, function(key) {
          return object[key];
        });
      }
      function values(object) {
        return object == null ? [] : baseValues(object, keys(object));
      }
      var nativeMin = Math.min;
      function baseIntersection(arrays, iteratee, comparator) {
        var includes = arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array(othLength), maxLength = Infinity, result = [];
        while (othIndex--) {
          var array = arrays[othIndex];
          if (othIndex && iteratee) {
            array = arrayMap(array, baseUnary(iteratee));
          }
          maxLength = nativeMin(array.length, maxLength);
          caches[othIndex] = length >= 120 && array.length >= 120 ? new SetCache(othIndex && array) : void 0;
        }
        array = arrays[0];
        var index = -1, seen = caches[0];
        outer:
          while (++index < length && result.length < maxLength) {
            var value = array[index], computed2 = value;
            value = value !== 0 ? value : 0;
            if (!(seen ? cacheHas(seen, computed2) : includes(result, computed2))) {
              othIndex = othLength;
              while (--othIndex) {
                var cache2 = caches[othIndex];
                if (!(cache2 ? cacheHas(cache2, computed2) : includes(arrays[othIndex], computed2))) {
                  continue outer;
                }
              }
              if (seen) {
                seen.push(computed2);
              }
              result.push(value);
            }
          }
        return result;
      }
      function castArrayLikeObject(value) {
        return isArrayLikeObject(value) ? value : [];
      }
      var intersection = baseRest(function(arrays) {
        var mapped = arrayMap(arrays, castArrayLikeObject);
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
      });
      function baseInverter(object, setter, iteratee, accumulator) {
        baseForOwn(object, function(value, key, object2) {
          setter(accumulator, iteratee(value), key, object2);
        });
        return accumulator;
      }
      function createInverter(setter, toIteratee) {
        return function(object, iteratee) {
          return baseInverter(object, setter, toIteratee(iteratee), {});
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
      function isEqual(value, other) {
        return baseIsEqual(value, other);
      }
      function isNil(value) {
        return value == null;
      }
      function baseLt(value, other) {
        return value < other;
      }
      function mapValues(object, iteratee) {
        var result = {};
        iteratee = baseIteratee(iteratee);
        baseForOwn(object, function(value, key, object2) {
          baseAssignValue(result, key, iteratee(value, key, object2));
        });
        return result;
      }
      function baseExtremum(array, iteratee, comparator) {
        var index = -1, length = array.length;
        while (++index < length) {
          var value = array[index], current = iteratee(value);
          if (current != null && (computed2 === void 0 ? current === current && !isSymbol(current) : comparator(current, computed2))) {
            var computed2 = current, result = value;
          }
        }
        return result;
      }
      function minBy(array, iteratee) {
        return array && array.length ? baseExtremum(array, baseIteratee(iteratee), baseLt) : void 0;
      }
      function once(func) {
        return before(2, func);
      }
      var nativeFloor = Math.floor, nativeRandom = Math.random;
      function baseRandom(lower, upper) {
        return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
      }
      function arraySample(array) {
        var length = array.length;
        return length ? array[baseRandom(0, length - 1)] : void 0;
      }
      function baseSample(collection) {
        return arraySample(values(collection));
      }
      function sample(collection) {
        var func = isArray$1(collection) ? arraySample : baseSample;
        return func(collection);
      }
      var objectProto$1 = Object.prototype;
      var hasOwnProperty$2 = objectProto$1.hasOwnProperty;
      function customDefaultsAssignIn(objValue, srcValue, key, object) {
        if (objValue === void 0 || eq(objValue, objectProto$1[key]) && !hasOwnProperty$2.call(object, key)) {
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
      var reEscape = /<%-([\s\S]+?)%>/g;
      var reEvaluate = /<%([\s\S]+?)%>/g;
      var templateSettings = {
        /**
         * Used to detect `data` property values to be HTML-escaped.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        "escape": reEscape,
        /**
         * Used to detect code to be evaluated.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        "evaluate": reEvaluate,
        /**
         * Used to detect `data` property values to inject.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        "interpolate": reInterpolate,
        /**
         * Used to reference the data object in the template text.
         *
         * @memberOf _.templateSettings
         * @type {string}
         */
        "variable": "",
        /**
         * Used to import variables into the compiled template.
         *
         * @memberOf _.templateSettings
         * @type {Object}
         */
        "imports": {
          /**
           * A reference to the `lodash` function.
           *
           * @memberOf _.templateSettings.imports
           * @type {Function}
           */
          "_": { "escape": escape$1 }
        }
      };
      var INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
      var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
      var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
      var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
      var reNoMatch = /($^)/;
      var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
      var objectProto = Object.prototype;
      var hasOwnProperty$1 = objectProto.hasOwnProperty;
      function template(string, options, guard) {
        var settings2 = templateSettings.imports._.templateSettings || templateSettings;
        string = toString$1(string);
        options = assignInWith({}, options, settings2, customDefaultsAssignIn);
        var imports = assignInWith({}, options.imports, settings2.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
        var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
        var reDelimiters = RegExp(
          (options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$",
          "g"
        );
        var sourceURL = hasOwnProperty$1.call(options, "sourceURL") ? "//# sourceURL=" + (options.sourceURL + "").replace(/\s/g, " ") + "\n" : "";
        string.replace(reDelimiters, function(match2, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
          interpolateValue || (interpolateValue = esTemplateValue);
          source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
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
          index = offset + match2.length;
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
        var result = attempt(function() {
          return Function(importsKeys, sourceURL + "return " + source).apply(void 0, importsValues);
        });
        result.source = source;
        if (isError(result)) {
          throw result;
        }
        return result;
      }
      var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
      function getDefaultExportFromCjs(x) {
        return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
      }
      var eventemitter3 = { exports: {} };
      (function(module2) {
        var has = Object.prototype.hasOwnProperty, prefix = "~";
        function Events() {
        }
        if (Object.create) {
          Events.prototype = /* @__PURE__ */ Object.create(null);
          if (!new Events().__proto__) prefix = false;
        }
        function EE(fn, context, once2) {
          this.fn = fn;
          this.context = context;
          this.once = once2 || false;
        }
        function addListener(emitter, event, fn, context, once2) {
          if (typeof fn !== "function") {
            throw new TypeError("The listener must be a function");
          }
          var listener = new EE(fn, context || emitter, once2), evt = prefix ? prefix + event : event;
          if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
          else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
          else emitter._events[evt] = [emitter._events[evt], listener];
          return emitter;
        }
        function clearEvent(emitter, evt) {
          if (--emitter._eventsCount === 0) emitter._events = new Events();
          else delete emitter._events[evt];
        }
        function EventEmitter2() {
          this._events = new Events();
          this._eventsCount = 0;
        }
        EventEmitter2.prototype.eventNames = function eventNames() {
          var names = [], events, name;
          if (this._eventsCount === 0) return names;
          for (name in events = this._events) {
            if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
          }
          if (Object.getOwnPropertySymbols) {
            return names.concat(Object.getOwnPropertySymbols(events));
          }
          return names;
        };
        EventEmitter2.prototype.listeners = function listeners(event) {
          var evt = prefix ? prefix + event : event, handlers2 = this._events[evt];
          if (!handlers2) return [];
          if (handlers2.fn) return [handlers2.fn];
          for (var i = 0, l = handlers2.length, ee = new Array(l); i < l; i++) {
            ee[i] = handlers2[i].fn;
          }
          return ee;
        };
        EventEmitter2.prototype.listenerCount = function listenerCount(event) {
          var evt = prefix ? prefix + event : event, listeners = this._events[evt];
          if (!listeners) return 0;
          if (listeners.fn) return 1;
          return listeners.length;
        };
        EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
          var evt = prefix ? prefix + event : event;
          if (!this._events[evt]) return false;
          var listeners = this._events[evt], len = arguments.length, args, i;
          if (listeners.fn) {
            if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
            switch (len) {
              case 1:
                return listeners.fn.call(listeners.context), true;
              case 2:
                return listeners.fn.call(listeners.context, a1), true;
              case 3:
                return listeners.fn.call(listeners.context, a1, a2), true;
              case 4:
                return listeners.fn.call(listeners.context, a1, a2, a3), true;
              case 5:
                return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
              case 6:
                return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
            }
            for (i = 1, args = new Array(len - 1); i < len; i++) {
              args[i - 1] = arguments[i];
            }
            listeners.fn.apply(listeners.context, args);
          } else {
            var length = listeners.length, j;
            for (i = 0; i < length; i++) {
              if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
              switch (len) {
                case 1:
                  listeners[i].fn.call(listeners[i].context);
                  break;
                case 2:
                  listeners[i].fn.call(listeners[i].context, a1);
                  break;
                case 3:
                  listeners[i].fn.call(listeners[i].context, a1, a2);
                  break;
                case 4:
                  listeners[i].fn.call(listeners[i].context, a1, a2, a3);
                  break;
                default:
                  if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                    args[j - 1] = arguments[j];
                  }
                  listeners[i].fn.apply(listeners[i].context, args);
              }
            }
          }
          return true;
        };
        EventEmitter2.prototype.on = function on(event, fn, context) {
          return addListener(this, event, fn, context, false);
        };
        EventEmitter2.prototype.once = function once2(event, fn, context) {
          return addListener(this, event, fn, context, true);
        };
        EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once2) {
          var evt = prefix ? prefix + event : event;
          if (!this._events[evt]) return this;
          if (!fn) {
            clearEvent(this, evt);
            return this;
          }
          var listeners = this._events[evt];
          if (listeners.fn) {
            if (listeners.fn === fn && (!once2 || listeners.once) && (!context || listeners.context === context)) {
              clearEvent(this, evt);
            }
          } else {
            for (var i = 0, events = [], length = listeners.length; i < length; i++) {
              if (listeners[i].fn !== fn || once2 && !listeners[i].once || context && listeners[i].context !== context) {
                events.push(listeners[i]);
              }
            }
            if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
            else clearEvent(this, evt);
          }
          return this;
        };
        EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
          var evt;
          if (event) {
            evt = prefix ? prefix + event : event;
            if (this._events[evt]) clearEvent(this, evt);
          } else {
            this._events = new Events();
            this._eventsCount = 0;
          }
          return this;
        };
        EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
        EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
        EventEmitter2.prefixed = prefix;
        EventEmitter2.EventEmitter = EventEmitter2;
        {
          module2.exports = EventEmitter2;
        }
      })(eventemitter3);
      var eventemitter3Exports = eventemitter3.exports;
      const EventEmitter = /* @__PURE__ */ getDefaultExportFromCjs(eventemitter3Exports);
      const removeAt = (array, index) => array.splice(index, 1)[0];
      class AsyncQueue {
        constructor(thread = 1) {
          __publicField(this, "queue", vue.reactive([]));
          __publicField(this, "emitter", new EventEmitter());
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
        push(fn, info) {
          this.queue.push({
            id: crypto.randomUUID(),
            running: false,
            fn,
            info
          });
        }
        async start() {
          if (this.thread <= 1) {
            if (this.singleRunning || this.queue.length === 0) return;
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
            if (running >= this.thread || this.queue.length === running) return;
            const idleItems = this.queue.filter(({ running: running2 }) => !running2);
            for (let i = 0; i < Math.min(idleItems.length, this.thread - running); i++) {
              const item = idleItems[i];
              item.running = true;
              item.fn().then(async () => {
                removeAt(
                  this.queue,
                  this.queue.findIndex(({ id }) => id === item.id)
                );
                if (this.queue.length) await this.start();
                else this.emitter.emit("finish");
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
      var __spreadArray = function(to, from, pack) {
        for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
          }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
      };
      var BrowserInfo = (
        /** @class */
        /* @__PURE__ */ function() {
          function BrowserInfo2(name, version, os) {
            this.name = name;
            this.version = version;
            this.os = os;
            this.type = "browser";
          }
          return BrowserInfo2;
        }()
      );
      var NodeInfo = (
        /** @class */
        /* @__PURE__ */ function() {
          function NodeInfo2(version) {
            this.version = version;
            this.type = "node";
            this.name = "node";
            this.os = process.platform;
          }
          return NodeInfo2;
        }()
      );
      var SearchBotDeviceInfo = (
        /** @class */
        /* @__PURE__ */ function() {
          function SearchBotDeviceInfo2(name, version, os, bot) {
            this.name = name;
            this.version = version;
            this.os = os;
            this.bot = bot;
            this.type = "bot-device";
          }
          return SearchBotDeviceInfo2;
        }()
      );
      var BotInfo = (
        /** @class */
        /* @__PURE__ */ function() {
          function BotInfo2() {
            this.type = "bot";
            this.bot = true;
            this.name = "bot";
            this.version = null;
            this.os = null;
          }
          return BotInfo2;
        }()
      );
      var ReactNativeInfo = (
        /** @class */
        /* @__PURE__ */ function() {
          function ReactNativeInfo2() {
            this.type = "react-native";
            this.name = "react-native";
            this.version = null;
            this.os = null;
          }
          return ReactNativeInfo2;
        }()
      );
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
        if (typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative") {
          return new ReactNativeInfo();
        }
        if (typeof navigator !== "undefined") {
          return parseUserAgent(navigator.userAgent);
        }
        return getNodeVersion();
      }
      function matchUserAgent(ua) {
        return ua !== "" && userAgentRules.reduce(function(matched, _a) {
          var browser = _a[0], regex = _a[1];
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
            versionParts = __spreadArray(__spreadArray([], versionParts, true), createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length));
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
          var _a = operatingSystemRules[ii], os = _a[0], regex = _a[1];
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
      const supportLanguage = /* @__PURE__ */ new Set(["zh", "en"]);
      const defaultLocale = (() => {
        const languages = castArray(navigator.languages || navigator.language);
        for (const language of languages) {
          const lang = language.split("-")[0];
          if (supportLanguage.has(lang)) return lang;
        }
        return "en";
      })();
      var ErrorAction = /* @__PURE__ */ ((ErrorAction2) => {
        ErrorAction2["GET_INFO"] = "getInfo";
        ErrorAction2["DOWNLOAD"] = "download";
        return ErrorAction2;
      })(ErrorAction || {});
      var MIME = /* @__PURE__ */ ((MIME2) => {
        MIME2["JPG"] = "image/jpeg";
        MIME2["PNG"] = "image/png";
        return MIME2;
      })(MIME || {});
      const nHentaiDownloadHosts = [
        "i.nhentai.net",
        // 'i2.nhentai.net',
        "i3.nhentai.net",
        "i5.nhentai.net",
        "i7.nhentai.net"
      ];
      var NHentaiDownloadHostSpecial = /* @__PURE__ */ ((NHentaiDownloadHostSpecial2) => {
        NHentaiDownloadHostSpecial2["RANDOM"] = "random";
        NHentaiDownloadHostSpecial2["BALANCE"] = "balance";
        return NHentaiDownloadHostSpecial2;
      })(NHentaiDownloadHostSpecial || {});
      const booleanValidator = (val) => typeof val === "boolean";
      const stringValidator = (val) => typeof val === "string";
      const createNumberValidator = (min, max) => (val) => typeof val === "number" && min <= val && val <= max;
      const trimFormatter = (val) => val.trim();
      const availableMetaFiles = ["ComicInfoXml", "EzeInfoJson"];
      const availableMetaFileTitleLanguage = /* @__PURE__ */ new Set(["english", "japanese"]);
      const settingDefinitions = {
        language: {
          key: "language",
          default: defaultLocale,
          validator: (val) => supportLanguage.has(val)
        },
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
          validator: stringValidator,
          formatter: trimFormatter
        },
        compressionFilename: {
          key: "cf_name",
          default: "{{japanese}}.zip",
          validator: stringValidator,
          formatter: trimFormatter
        },
        filenameMaxArtistsNumber: {
          key: "cf_name_max_artists_number",
          default: 3,
          validator: createNumberValidator(0, Infinity)
        },
        filenameArtistsSeparator: {
          key: "cf_name_artists_separator",
          default: ", ",
          validator: stringValidator
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
        },
        judgeDownloadedByEnglish: {
          key: "judge_downloaded_by_english",
          default: false,
          validator: booleanValidator
        },
        judgeDownloadedByJapanese: {
          key: "judge_downloaded_by_japanese",
          default: true,
          validator: booleanValidator
        },
        judgeDownloadedByPretty: {
          key: "judge_downloaded_by_pretty",
          default: false,
          validator: booleanValidator
        },
        nHentaiDownloadHost: {
          key: "nHentai_media_host",
          default: nHentaiDownloadHosts[0],
          validator: (val) => val === "random" || val === "balance" || nHentaiDownloadHosts.includes(val)
        },
        addMetaFile: {
          key: "add_meta_file",
          default: () => [],
          validator: (val) => Array.isArray(val),
          formatter: (val) => intersection(val, availableMetaFiles)
        },
        metaFileTitleLanguage: {
          key: "meta_file_title_language",
          default: "english",
          validator: (val) => availableMetaFileTitleLanguage.has(val)
        },
        titleReplacement: {
          key: "title_replacement",
          default: () => [],
          validator: (val) => Array.isArray(val),
          itemValidator: (item) => item && stringValidator(item.from) && stringValidator(item.to) && booleanValidator(item.regexp)
        },
        galleryContextmenuPreview: {
          key: "gallery_contextmenu_preview",
          default: false,
          validator: booleanValidator
        },
        convertWebpTo: {
          key: "convert_webp_to",
          default: MIME.JPG,
          validator: (val) => [MIME.JPG, MIME.PNG, ""].includes(val)
        },
        convertWebpQuality: {
          key: "convert_webp_quality",
          default: 85,
          validator: (val) => 0 <= val && val <= 100
        },
        customFilenameFunction: {
          key: "custom_title_function",
          default: "",
          validator: stringValidator
        }
      };
      const browserDetect = detect();
      const DISABLE_STREAM_DOWNLOAD = !!browserDetect && (browserDetect.name === "safari" || browserDetect.name === "firefox");
      const readSettings = () => mapValues(
        settingDefinitions,
        ({ key, default: defaultVal }) => _GM_getValue(key, typeof defaultVal === "function" ? defaultVal() : defaultVal)
      );
      const writeableSettings = vue.reactive(readSettings());
      const settings = writeableSettings;
      if (DISABLE_STREAM_DOWNLOAD && settings.streamDownload) writeableSettings.streamDownload = false;
      const startWatchSettings = once(() => {
        const settingRefs = vue.toRefs(writeableSettings);
        forEach(settingRefs, (ref2, key) => {
          const cur = settingDefinitions[key];
          let valChanged = false;
          const saveValue = (val) => {
            logger.log("update setting", cur.key, vue.toRaw(val));
            _GM_setValue(cur.key, val);
          };
          vue.watch(
            ref2,
            (val) => {
              if (valChanged) {
                valChanged = false;
                saveValue(val);
                return;
              }
              const applyChange = (newVal) => {
                val = newVal;
                ref2.value = newVal;
                valChanged = true;
              };
              if (!cur.validator(val)) {
                applyChange(typeof cur.default === "function" ? cur.default() : cur.default);
                return;
              }
              if (Array.isArray(val) && cur.itemValidator) {
                const validItems = val.filter(cur.itemValidator);
                if (val.length !== validItems.length) {
                  applyChange(validItems);
                }
              }
              if (cur.formatter) {
                const formattedVal = cur.formatter(val);
                if (typeof formattedVal === "object" ? !isEqual(val, formattedVal) : val !== formattedVal) {
                  applyChange(formattedVal);
                }
              }
              if (!valChanged) saveValue(val);
            },
            typeof ref2.value === "object" ? { deep: true } : void 0
          );
        });
      });
      const validTitleReplacement = vue.computed(
        () => settings.titleReplacement.filter((item) => item == null ? void 0 : item.from)
      );
      const customFilenameFunction = vue.computed(() => {
        if (!settings.customFilenameFunction.trim()) return null;
        try {
          return new Function("filename", "gallery", settings.customFilenameFunction);
        } catch {
          return null;
        }
      });
      const dlQueue = new AsyncQueue();
      const zipQueue = new AsyncQueue(WORKER_THREAD_NUM);
      dlQueue.canSingleStart = () => !(settings.seriesMode && zipQueue.length);
      zipQueue.emitter.on("finish", () => {
        if (settings.seriesMode) dlQueue.start().catch(logger.error);
      });
      const _hoisted_1$4 = ["title"];
      const _hoisted_2$2 = { class: "download-item__title" };
      const _hoisted_3$2 = { class: "download-item__progress-text" };
      const _sfc_main$6 = /* @__PURE__ */ vue.defineComponent({
        __name: "DownloadItem",
        props: {
          item: {},
          index: {}
        },
        setup(__props) {
          const props = __props;
          const title = vue.computed(() => {
            const { english: english2, japanese: japanese2, pretty } = props.item.gallery.title;
            return japanese2 || english2 || pretty;
          });
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
            var _a;
            const { info } = props.index === 0 ? dlQueue.queue[0] : removeAt(dlQueue.queue, props.index);
            (_a = info == null ? void 0 : info.cancel) == null ? void 0 : _a.call(info);
          };
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createElementBlock("div", {
              class: vue.normalizeClass(["download-item", {
                "download-item--error": _ctx.item.error,
                "download-item--compressing": _ctx.item.compressing && !_ctx.item.error,
                "download-item--can-cancel": canCancel.value
              }]),
              title: title.value
            }, [
              canCancel.value ? (vue.openBlock(), vue.createElementBlock("div", {
                key: 0,
                class: "download-item__cancel",
                onClick: cancel
              }, _cache[0] || (_cache[0] = [
                vue.createElementVNode("i", { class: "fa fa-times" }, null, -1)
              ]))) : vue.createCommentVNode("", true),
              vue.createElementVNode("div", _hoisted_2$2, vue.toDisplayString(title.value), 1),
              vue.createElementVNode("div", {
                class: "download-item__progress",
                style: vue.normalizeStyle({ width: `${progressWidth.value}%` })
              }, [
                vue.createElementVNode("div", _hoisted_3$2, vue.toDisplayString(progressWidth.value) + "%", 1)
              ], 4)
            ], 10, _hoisted_1$4);
          };
        }
      });
      const _export_sfc = (sfc, props) => {
        const target = sfc.__vccOpts || sfc;
        for (const [key, val] of props) {
          target[key] = val;
        }
        return target;
      };
      const DownloadItem = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-83b954f2"]]);
      const _hoisted_1$3 = { id: "download-panel" };
      const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
        __name: "DownloadList",
        props: {
          zipList: {},
          dlList: {}
        },
        setup(__props) {
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$3, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.zipList, (item, index) => {
                return vue.openBlock(), vue.createBlock(DownloadItem, {
                  key: index,
                  item,
                  index
                }, null, 8, ["item", "index"]);
              }), 128)),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.dlList, (item, index) => {
                return vue.openBlock(), vue.createBlock(DownloadItem, {
                  key: index,
                  item,
                  index
                }, null, 8, ["item", "index"]);
              }), 128))
            ]);
          };
        }
      });
      const DownloadList = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-f37e74c3"]]);
      const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
        __name: "DownloadPanel",
        setup(__props) {
          const { title } = document;
          const zipList = vue.computed(() => zipQueue.queue.map(({ info }) => info));
          const dlList = vue.computed(() => dlQueue.queue.map(({ info }) => info));
          const infoList = vue.computed(() => [...zipList.value, ...dlList.value]);
          const error = vue.computed(() => {
            var _a;
            return !!((_a = dlList.value[0]) == null ? void 0 : _a.error);
          });
          const titleWithStatus = vue.computed(() => {
            if (error.value) return `[×] ${title}`;
            const len = infoList.value.length;
            return `[${len || "✓"}] ${title}`;
          });
          vue.watch(infoList, (val) => {
            sessionStorage.setItem("downloadQueue", JSON.stringify(val.map(({ gallery: gallery2 }) => gallery2)));
          });
          vue.watch(titleWithStatus, (val) => {
            document.title = val;
          });
          return (_ctx, _cache) => {
            return infoList.value.length ? (vue.openBlock(), vue.createBlock(DownloadList, {
              key: 0,
              "zip-list": zipList.value,
              "dl-list": dlList.value
            }, null, 8, ["zip-list", "dl-list"])) : vue.createCommentVNode("", true);
          };
        }
      });
      /*! Element Plus Icons Vue v2.3.1 */
      var close_bold_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
        name: "CloseBold",
        __name: "close-bold",
        setup(__props) {
          return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 1024 1024"
          }, [
            vue.createElementVNode("path", {
              fill: "currentColor",
              d: "M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
            })
          ]));
        }
      });
      var close_bold_default = close_bold_vue_vue_type_script_setup_true_lang_default;
      var delete_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
        name: "Delete",
        __name: "delete",
        setup(__props) {
          return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 1024 1024"
          }, [
            vue.createElementVNode("path", {
              fill: "currentColor",
              d: "M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32zm448-64v-64H416v64zM224 896h576V256H224zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32m192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32"
            })
          ]));
        }
      });
      var delete_default = delete_vue_vue_type_script_setup_true_lang_default;
      var download_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
        name: "Download",
        __name: "download",
        setup(__props) {
          return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 1024 1024"
          }, [
            vue.createElementVNode("path", {
              fill: "currentColor",
              d: "M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64m384-253.696 236.288-236.352 45.248 45.248L508.8 704 192 387.2l45.248-45.248L480 584.704V128h64z"
            })
          ]));
        }
      });
      var download_default = download_vue_vue_type_script_setup_true_lang_default;
      var upload_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
        name: "Upload",
        __name: "upload",
        setup(__props) {
          return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 1024 1024"
          }, [
            vue.createElementVNode("path", {
              fill: "currentColor",
              d: "M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64m384-578.304V704h-64V247.296L237.248 490.048 192 444.8 508.8 128l316.8 316.8-45.312 45.248z"
            })
          ]));
        }
      });
      var upload_default = upload_vue_vue_type_script_setup_true_lang_default;
      /*!
        * shared v9.14.1
        * (c) 2024 kazuya kawaguchi
        * Released under the MIT License.
        */
      const inBrowser = typeof window !== "undefined";
      const makeSymbol = (name, shareable = false) => !shareable ? Symbol(name) : Symbol.for(name);
      const generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
      const friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
      const isNumber = (val) => typeof val === "number" && isFinite(val);
      const isDate = (val) => toTypeString(val) === "[object Date]";
      const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
      const isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
      const assign$1 = Object.assign;
      let _globalThis;
      const getGlobalThis = () => {
        return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
      };
      function escapeHtml(rawText) {
        return rawText.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
      }
      const hasOwnProperty = Object.prototype.hasOwnProperty;
      function hasOwn(obj, key) {
        return hasOwnProperty.call(obj, key);
      }
      const isArray = Array.isArray;
      const isFunction = (val) => typeof val === "function";
      const isString$1 = (val) => typeof val === "string";
      const isBoolean = (val) => typeof val === "boolean";
      const isObject$3 = (val) => val !== null && typeof val === "object";
      const isPromise = (val) => {
        return isObject$3(val) && isFunction(val.then) && isFunction(val.catch);
      };
      const objectToString = Object.prototype.toString;
      const toTypeString = (value) => objectToString.call(value);
      const isPlainObject = (val) => {
        if (!isObject$3(val))
          return false;
        const proto = Object.getPrototypeOf(val);
        return proto === null || proto.constructor === Object;
      };
      const toDisplayString = (val) => {
        return val == null ? "" : isArray(val) || isPlainObject(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
      };
      function join$1(items, separator = "") {
        return items.reduce((str, item, index) => index === 0 ? str + item : str + separator + item, "");
      }
      function incrementer(code2) {
        let current = code2;
        return () => ++current;
      }
      function warn(msg, err) {
        if (typeof console !== "undefined") {
          console.warn(`[intlify] ` + msg);
          if (err) {
            console.warn(err.stack);
          }
        }
      }
      const isNotObjectOrIsArray = (val) => !isObject$3(val) || isArray(val);
      function deepCopy(src, des) {
        if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
          throw new Error("Invalid value");
        }
        const stack = [{ src, des }];
        while (stack.length) {
          const { src: src2, des: des2 } = stack.pop();
          Object.keys(src2).forEach((key) => {
            if (isObject$3(src2[key]) && !isObject$3(des2[key])) {
              des2[key] = Array.isArray(src2[key]) ? [] : {};
            }
            if (isNotObjectOrIsArray(des2[key]) || isNotObjectOrIsArray(src2[key])) {
              des2[key] = src2[key];
            } else {
              stack.push({ src: src2[key], des: des2[key] });
            }
          });
        }
      }
      /*!
        * message-compiler v9.14.1
        * (c) 2024 kazuya kawaguchi
        * Released under the MIT License.
        */
      function createPosition(line, column, offset) {
        return { line, column, offset };
      }
      function createLocation(start, end, source) {
        const loc = { start, end };
        return loc;
      }
      const RE_ARGS = /\{([0-9a-zA-Z]+)\}/g;
      function format$1(message, ...args) {
        if (args.length === 1 && isObject$2(args[0])) {
          args = args[0];
        }
        if (!args || !args.hasOwnProperty) {
          args = {};
        }
        return message.replace(RE_ARGS, (match2, identifier) => {
          return args.hasOwnProperty(identifier) ? args[identifier] : "";
        });
      }
      const assign = Object.assign;
      const isString = (val) => typeof val === "string";
      const isObject$2 = (val) => val !== null && typeof val === "object";
      function join(items, separator = "") {
        return items.reduce((str, item, index) => index === 0 ? str + item : str + separator + item, "");
      }
      const CompileWarnCodes = {
        USE_MODULO_SYNTAX: 1,
        __EXTEND_POINT__: 2
      };
      const warnMessages = {
        [CompileWarnCodes.USE_MODULO_SYNTAX]: `Use modulo before '{{0}}'.`
      };
      function createCompileWarn(code2, loc, ...args) {
        const msg = format$1(warnMessages[code2], ...args || []);
        const message = { message: String(msg), code: code2 };
        if (loc) {
          message.location = loc;
        }
        return message;
      }
      const CompileErrorCodes = {
        // tokenizer error codes
        EXPECTED_TOKEN: 1,
        INVALID_TOKEN_IN_PLACEHOLDER: 2,
        UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
        UNKNOWN_ESCAPE_SEQUENCE: 4,
        INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
        UNBALANCED_CLOSING_BRACE: 6,
        UNTERMINATED_CLOSING_BRACE: 7,
        EMPTY_PLACEHOLDER: 8,
        NOT_ALLOW_NEST_PLACEHOLDER: 9,
        INVALID_LINKED_FORMAT: 10,
        // parser error codes
        MUST_HAVE_MESSAGES_IN_PLURAL: 11,
        UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
        UNEXPECTED_EMPTY_LINKED_KEY: 13,
        UNEXPECTED_LEXICAL_ANALYSIS: 14,
        // generator error codes
        UNHANDLED_CODEGEN_NODE_TYPE: 15,
        // minifier error codes
        UNHANDLED_MINIFIER_NODE_TYPE: 16,
        // Special value for higher-order compilers to pick up the last code
        // to avoid collision of error codes. This should always be kept as the last
        // item.
        __EXTEND_POINT__: 17
      };
      const errorMessages = {
        // tokenizer error messages
        [CompileErrorCodes.EXPECTED_TOKEN]: `Expected token: '{0}'`,
        [CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER]: `Invalid token in placeholder: '{0}'`,
        [CompileErrorCodes.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER]: `Unterminated single quote in placeholder`,
        [CompileErrorCodes.UNKNOWN_ESCAPE_SEQUENCE]: `Unknown escape sequence: \\{0}`,
        [CompileErrorCodes.INVALID_UNICODE_ESCAPE_SEQUENCE]: `Invalid unicode escape sequence: {0}`,
        [CompileErrorCodes.UNBALANCED_CLOSING_BRACE]: `Unbalanced closing brace`,
        [CompileErrorCodes.UNTERMINATED_CLOSING_BRACE]: `Unterminated closing brace`,
        [CompileErrorCodes.EMPTY_PLACEHOLDER]: `Empty placeholder`,
        [CompileErrorCodes.NOT_ALLOW_NEST_PLACEHOLDER]: `Not allowed nest placeholder`,
        [CompileErrorCodes.INVALID_LINKED_FORMAT]: `Invalid linked format`,
        // parser error messages
        [CompileErrorCodes.MUST_HAVE_MESSAGES_IN_PLURAL]: `Plural must have messages`,
        [CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_MODIFIER]: `Unexpected empty linked modifier`,
        [CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_KEY]: `Unexpected empty linked key`,
        [CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS]: `Unexpected lexical analysis in token: '{0}'`,
        // generator error messages
        [CompileErrorCodes.UNHANDLED_CODEGEN_NODE_TYPE]: `unhandled codegen node type: '{0}'`,
        // minimizer error messages
        [CompileErrorCodes.UNHANDLED_MINIFIER_NODE_TYPE]: `unhandled mimifier node type: '{0}'`
      };
      function createCompileError(code2, loc, options = {}) {
        const { domain, messages, args } = options;
        const msg = format$1((messages || errorMessages)[code2] || "", ...args || []);
        const error = new SyntaxError(String(msg));
        error.code = code2;
        if (loc) {
          error.location = loc;
        }
        error.domain = domain;
        return error;
      }
      function defaultOnError(error) {
        throw error;
      }
      const CHAR_SP = " ";
      const CHAR_CR = "\r";
      const CHAR_LF = "\n";
      const CHAR_LS = String.fromCharCode(8232);
      const CHAR_PS = String.fromCharCode(8233);
      function createScanner(str) {
        const _buf = str;
        let _index = 0;
        let _line = 1;
        let _column = 1;
        let _peekOffset = 0;
        const isCRLF = (index2) => _buf[index2] === CHAR_CR && _buf[index2 + 1] === CHAR_LF;
        const isLF = (index2) => _buf[index2] === CHAR_LF;
        const isPS = (index2) => _buf[index2] === CHAR_PS;
        const isLS = (index2) => _buf[index2] === CHAR_LS;
        const isLineEnd = (index2) => isCRLF(index2) || isLF(index2) || isPS(index2) || isLS(index2);
        const index = () => _index;
        const line = () => _line;
        const column = () => _column;
        const peekOffset = () => _peekOffset;
        const charAt = (offset) => isCRLF(offset) || isPS(offset) || isLS(offset) ? CHAR_LF : _buf[offset];
        const currentChar = () => charAt(_index);
        const currentPeek = () => charAt(_index + _peekOffset);
        function next() {
          _peekOffset = 0;
          if (isLineEnd(_index)) {
            _line++;
            _column = 0;
          }
          if (isCRLF(_index)) {
            _index++;
          }
          _index++;
          _column++;
          return _buf[_index];
        }
        function peek() {
          if (isCRLF(_index + _peekOffset)) {
            _peekOffset++;
          }
          _peekOffset++;
          return _buf[_index + _peekOffset];
        }
        function reset() {
          _index = 0;
          _line = 1;
          _column = 1;
          _peekOffset = 0;
        }
        function resetPeek(offset = 0) {
          _peekOffset = offset;
        }
        function skipToPeek() {
          const target = _index + _peekOffset;
          while (target !== _index) {
            next();
          }
          _peekOffset = 0;
        }
        return {
          index,
          line,
          column,
          peekOffset,
          charAt,
          currentChar,
          currentPeek,
          next,
          peek,
          reset,
          resetPeek,
          skipToPeek
        };
      }
      const EOF = void 0;
      const DOT = ".";
      const LITERAL_DELIMITER = "'";
      const ERROR_DOMAIN$3 = "tokenizer";
      function createTokenizer(source, options = {}) {
        const location2 = options.location !== false;
        const _scnr = createScanner(source);
        const currentOffset = () => _scnr.index();
        const currentPosition = () => createPosition(_scnr.line(), _scnr.column(), _scnr.index());
        const _initLoc = currentPosition();
        const _initOffset = currentOffset();
        const _context = {
          currentType: 14,
          offset: _initOffset,
          startLoc: _initLoc,
          endLoc: _initLoc,
          lastType: 14,
          lastOffset: _initOffset,
          lastStartLoc: _initLoc,
          lastEndLoc: _initLoc,
          braceNest: 0,
          inLinked: false,
          text: ""
        };
        const context = () => _context;
        const { onError } = options;
        function emitError(code2, pos, offset, ...args) {
          const ctx = context();
          pos.column += offset;
          pos.offset += offset;
          if (onError) {
            const loc = location2 ? createLocation(ctx.startLoc, pos) : null;
            const err = createCompileError(code2, loc, {
              domain: ERROR_DOMAIN$3,
              args
            });
            onError(err);
          }
        }
        function getToken(context2, type, value) {
          context2.endLoc = currentPosition();
          context2.currentType = type;
          const token = { type };
          if (location2) {
            token.loc = createLocation(context2.startLoc, context2.endLoc);
          }
          if (value != null) {
            token.value = value;
          }
          return token;
        }
        const getEndToken = (context2) => getToken(
          context2,
          14
          /* TokenTypes.EOF */
        );
        function eat(scnr, ch) {
          if (scnr.currentChar() === ch) {
            scnr.next();
            return ch;
          } else {
            emitError(CompileErrorCodes.EXPECTED_TOKEN, currentPosition(), 0, ch);
            return "";
          }
        }
        function peekSpaces(scnr) {
          let buf = "";
          while (scnr.currentPeek() === CHAR_SP || scnr.currentPeek() === CHAR_LF) {
            buf += scnr.currentPeek();
            scnr.peek();
          }
          return buf;
        }
        function skipSpaces(scnr) {
          const buf = peekSpaces(scnr);
          scnr.skipToPeek();
          return buf;
        }
        function isIdentifierStart(ch) {
          if (ch === EOF) {
            return false;
          }
          const cc = ch.charCodeAt(0);
          return cc >= 97 && cc <= 122 || // a-z
          cc >= 65 && cc <= 90 || // A-Z
          cc === 95;
        }
        function isNumberStart(ch) {
          if (ch === EOF) {
            return false;
          }
          const cc = ch.charCodeAt(0);
          return cc >= 48 && cc <= 57;
        }
        function isNamedIdentifierStart(scnr, context2) {
          const { currentType } = context2;
          if (currentType !== 2) {
            return false;
          }
          peekSpaces(scnr);
          const ret = isIdentifierStart(scnr.currentPeek());
          scnr.resetPeek();
          return ret;
        }
        function isListIdentifierStart(scnr, context2) {
          const { currentType } = context2;
          if (currentType !== 2) {
            return false;
          }
          peekSpaces(scnr);
          const ch = scnr.currentPeek() === "-" ? scnr.peek() : scnr.currentPeek();
          const ret = isNumberStart(ch);
          scnr.resetPeek();
          return ret;
        }
        function isLiteralStart(scnr, context2) {
          const { currentType } = context2;
          if (currentType !== 2) {
            return false;
          }
          peekSpaces(scnr);
          const ret = scnr.currentPeek() === LITERAL_DELIMITER;
          scnr.resetPeek();
          return ret;
        }
        function isLinkedDotStart(scnr, context2) {
          const { currentType } = context2;
          if (currentType !== 8) {
            return false;
          }
          peekSpaces(scnr);
          const ret = scnr.currentPeek() === ".";
          scnr.resetPeek();
          return ret;
        }
        function isLinkedModifierStart(scnr, context2) {
          const { currentType } = context2;
          if (currentType !== 9) {
            return false;
          }
          peekSpaces(scnr);
          const ret = isIdentifierStart(scnr.currentPeek());
          scnr.resetPeek();
          return ret;
        }
        function isLinkedDelimiterStart(scnr, context2) {
          const { currentType } = context2;
          if (!(currentType === 8 || currentType === 12)) {
            return false;
          }
          peekSpaces(scnr);
          const ret = scnr.currentPeek() === ":";
          scnr.resetPeek();
          return ret;
        }
        function isLinkedReferStart(scnr, context2) {
          const { currentType } = context2;
          if (currentType !== 10) {
            return false;
          }
          const fn = () => {
            const ch = scnr.currentPeek();
            if (ch === "{") {
              return isIdentifierStart(scnr.peek());
            } else if (ch === "@" || ch === "%" || ch === "|" || ch === ":" || ch === "." || ch === CHAR_SP || !ch) {
              return false;
            } else if (ch === CHAR_LF) {
              scnr.peek();
              return fn();
            } else {
              return isTextStart(scnr, false);
            }
          };
          const ret = fn();
          scnr.resetPeek();
          return ret;
        }
        function isPluralStart(scnr) {
          peekSpaces(scnr);
          const ret = scnr.currentPeek() === "|";
          scnr.resetPeek();
          return ret;
        }
        function detectModuloStart(scnr) {
          const spaces = peekSpaces(scnr);
          const ret = scnr.currentPeek() === "%" && scnr.peek() === "{";
          scnr.resetPeek();
          return {
            isModulo: ret,
            hasSpace: spaces.length > 0
          };
        }
        function isTextStart(scnr, reset = true) {
          const fn = (hasSpace = false, prev = "", detectModulo = false) => {
            const ch = scnr.currentPeek();
            if (ch === "{") {
              return prev === "%" ? false : hasSpace;
            } else if (ch === "@" || !ch) {
              return prev === "%" ? true : hasSpace;
            } else if (ch === "%") {
              scnr.peek();
              return fn(hasSpace, "%", true);
            } else if (ch === "|") {
              return prev === "%" || detectModulo ? true : !(prev === CHAR_SP || prev === CHAR_LF);
            } else if (ch === CHAR_SP) {
              scnr.peek();
              return fn(true, CHAR_SP, detectModulo);
            } else if (ch === CHAR_LF) {
              scnr.peek();
              return fn(true, CHAR_LF, detectModulo);
            } else {
              return true;
            }
          };
          const ret = fn();
          reset && scnr.resetPeek();
          return ret;
        }
        function takeChar(scnr, fn) {
          const ch = scnr.currentChar();
          if (ch === EOF) {
            return EOF;
          }
          if (fn(ch)) {
            scnr.next();
            return ch;
          }
          return null;
        }
        function isIdentifier(ch) {
          const cc = ch.charCodeAt(0);
          return cc >= 97 && cc <= 122 || // a-z
          cc >= 65 && cc <= 90 || // A-Z
          cc >= 48 && cc <= 57 || // 0-9
          cc === 95 || // _
          cc === 36;
        }
        function takeIdentifierChar(scnr) {
          return takeChar(scnr, isIdentifier);
        }
        function isNamedIdentifier(ch) {
          const cc = ch.charCodeAt(0);
          return cc >= 97 && cc <= 122 || // a-z
          cc >= 65 && cc <= 90 || // A-Z
          cc >= 48 && cc <= 57 || // 0-9
          cc === 95 || // _
          cc === 36 || // $
          cc === 45;
        }
        function takeNamedIdentifierChar(scnr) {
          return takeChar(scnr, isNamedIdentifier);
        }
        function isDigit(ch) {
          const cc = ch.charCodeAt(0);
          return cc >= 48 && cc <= 57;
        }
        function takeDigit(scnr) {
          return takeChar(scnr, isDigit);
        }
        function isHexDigit(ch) {
          const cc = ch.charCodeAt(0);
          return cc >= 48 && cc <= 57 || // 0-9
          cc >= 65 && cc <= 70 || // A-F
          cc >= 97 && cc <= 102;
        }
        function takeHexDigit(scnr) {
          return takeChar(scnr, isHexDigit);
        }
        function getDigits(scnr) {
          let ch = "";
          let num = "";
          while (ch = takeDigit(scnr)) {
            num += ch;
          }
          return num;
        }
        function readModulo(scnr) {
          skipSpaces(scnr);
          const ch = scnr.currentChar();
          if (ch !== "%") {
            emitError(CompileErrorCodes.EXPECTED_TOKEN, currentPosition(), 0, ch);
          }
          scnr.next();
          return "%";
        }
        function readText(scnr) {
          let buf = "";
          while (true) {
            const ch = scnr.currentChar();
            if (ch === "{" || ch === "}" || ch === "@" || ch === "|" || !ch) {
              break;
            } else if (ch === "%") {
              if (isTextStart(scnr)) {
                buf += ch;
                scnr.next();
              } else {
                break;
              }
            } else if (ch === CHAR_SP || ch === CHAR_LF) {
              if (isTextStart(scnr)) {
                buf += ch;
                scnr.next();
              } else if (isPluralStart(scnr)) {
                break;
              } else {
                buf += ch;
                scnr.next();
              }
            } else {
              buf += ch;
              scnr.next();
            }
          }
          return buf;
        }
        function readNamedIdentifier(scnr) {
          skipSpaces(scnr);
          let ch = "";
          let name = "";
          while (ch = takeNamedIdentifierChar(scnr)) {
            name += ch;
          }
          if (scnr.currentChar() === EOF) {
            emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
          }
          return name;
        }
        function readListIdentifier(scnr) {
          skipSpaces(scnr);
          let value = "";
          if (scnr.currentChar() === "-") {
            scnr.next();
            value += `-${getDigits(scnr)}`;
          } else {
            value += getDigits(scnr);
          }
          if (scnr.currentChar() === EOF) {
            emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
          }
          return value;
        }
        function isLiteral2(ch) {
          return ch !== LITERAL_DELIMITER && ch !== CHAR_LF;
        }
        function readLiteral(scnr) {
          skipSpaces(scnr);
          eat(scnr, `'`);
          let ch = "";
          let literal = "";
          while (ch = takeChar(scnr, isLiteral2)) {
            if (ch === "\\") {
              literal += readEscapeSequence(scnr);
            } else {
              literal += ch;
            }
          }
          const current = scnr.currentChar();
          if (current === CHAR_LF || current === EOF) {
            emitError(CompileErrorCodes.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, currentPosition(), 0);
            if (current === CHAR_LF) {
              scnr.next();
              eat(scnr, `'`);
            }
            return literal;
          }
          eat(scnr, `'`);
          return literal;
        }
        function readEscapeSequence(scnr) {
          const ch = scnr.currentChar();
          switch (ch) {
            case "\\":
            case `'`:
              scnr.next();
              return `\\${ch}`;
            case "u":
              return readUnicodeEscapeSequence(scnr, ch, 4);
            case "U":
              return readUnicodeEscapeSequence(scnr, ch, 6);
            default:
              emitError(CompileErrorCodes.UNKNOWN_ESCAPE_SEQUENCE, currentPosition(), 0, ch);
              return "";
          }
        }
        function readUnicodeEscapeSequence(scnr, unicode, digits) {
          eat(scnr, unicode);
          let sequence = "";
          for (let i = 0; i < digits; i++) {
            const ch = takeHexDigit(scnr);
            if (!ch) {
              emitError(CompileErrorCodes.INVALID_UNICODE_ESCAPE_SEQUENCE, currentPosition(), 0, `\\${unicode}${sequence}${scnr.currentChar()}`);
              break;
            }
            sequence += ch;
          }
          return `\\${unicode}${sequence}`;
        }
        function isInvalidIdentifier(ch) {
          return ch !== "{" && ch !== "}" && ch !== CHAR_SP && ch !== CHAR_LF;
        }
        function readInvalidIdentifier(scnr) {
          skipSpaces(scnr);
          let ch = "";
          let identifiers = "";
          while (ch = takeChar(scnr, isInvalidIdentifier)) {
            identifiers += ch;
          }
          return identifiers;
        }
        function readLinkedModifier(scnr) {
          let ch = "";
          let name = "";
          while (ch = takeIdentifierChar(scnr)) {
            name += ch;
          }
          return name;
        }
        function readLinkedRefer(scnr) {
          const fn = (buf) => {
            const ch = scnr.currentChar();
            if (ch === "{" || ch === "%" || ch === "@" || ch === "|" || ch === "(" || ch === ")" || !ch) {
              return buf;
            } else if (ch === CHAR_SP) {
              return buf;
            } else if (ch === CHAR_LF || ch === DOT) {
              buf += ch;
              scnr.next();
              return fn(buf);
            } else {
              buf += ch;
              scnr.next();
              return fn(buf);
            }
          };
          return fn("");
        }
        function readPlural(scnr) {
          skipSpaces(scnr);
          const plural = eat(
            scnr,
            "|"
            /* TokenChars.Pipe */
          );
          skipSpaces(scnr);
          return plural;
        }
        function readTokenInPlaceholder(scnr, context2) {
          let token = null;
          const ch = scnr.currentChar();
          switch (ch) {
            case "{":
              if (context2.braceNest >= 1) {
                emitError(CompileErrorCodes.NOT_ALLOW_NEST_PLACEHOLDER, currentPosition(), 0);
              }
              scnr.next();
              token = getToken(
                context2,
                2,
                "{"
                /* TokenChars.BraceLeft */
              );
              skipSpaces(scnr);
              context2.braceNest++;
              return token;
            case "}":
              if (context2.braceNest > 0 && context2.currentType === 2) {
                emitError(CompileErrorCodes.EMPTY_PLACEHOLDER, currentPosition(), 0);
              }
              scnr.next();
              token = getToken(
                context2,
                3,
                "}"
                /* TokenChars.BraceRight */
              );
              context2.braceNest--;
              context2.braceNest > 0 && skipSpaces(scnr);
              if (context2.inLinked && context2.braceNest === 0) {
                context2.inLinked = false;
              }
              return token;
            case "@":
              if (context2.braceNest > 0) {
                emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
              }
              token = readTokenInLinked(scnr, context2) || getEndToken(context2);
              context2.braceNest = 0;
              return token;
            default: {
              let validNamedIdentifier = true;
              let validListIdentifier = true;
              let validLiteral = true;
              if (isPluralStart(scnr)) {
                if (context2.braceNest > 0) {
                  emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
                }
                token = getToken(context2, 1, readPlural(scnr));
                context2.braceNest = 0;
                context2.inLinked = false;
                return token;
              }
              if (context2.braceNest > 0 && (context2.currentType === 5 || context2.currentType === 6 || context2.currentType === 7)) {
                emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
                context2.braceNest = 0;
                return readToken(scnr, context2);
              }
              if (validNamedIdentifier = isNamedIdentifierStart(scnr, context2)) {
                token = getToken(context2, 5, readNamedIdentifier(scnr));
                skipSpaces(scnr);
                return token;
              }
              if (validListIdentifier = isListIdentifierStart(scnr, context2)) {
                token = getToken(context2, 6, readListIdentifier(scnr));
                skipSpaces(scnr);
                return token;
              }
              if (validLiteral = isLiteralStart(scnr, context2)) {
                token = getToken(context2, 7, readLiteral(scnr));
                skipSpaces(scnr);
                return token;
              }
              if (!validNamedIdentifier && !validListIdentifier && !validLiteral) {
                token = getToken(context2, 13, readInvalidIdentifier(scnr));
                emitError(CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER, currentPosition(), 0, token.value);
                skipSpaces(scnr);
                return token;
              }
              break;
            }
          }
          return token;
        }
        function readTokenInLinked(scnr, context2) {
          const { currentType } = context2;
          let token = null;
          const ch = scnr.currentChar();
          if ((currentType === 8 || currentType === 9 || currentType === 12 || currentType === 10) && (ch === CHAR_LF || ch === CHAR_SP)) {
            emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
          }
          switch (ch) {
            case "@":
              scnr.next();
              token = getToken(
                context2,
                8,
                "@"
                /* TokenChars.LinkedAlias */
              );
              context2.inLinked = true;
              return token;
            case ".":
              skipSpaces(scnr);
              scnr.next();
              return getToken(
                context2,
                9,
                "."
                /* TokenChars.LinkedDot */
              );
            case ":":
              skipSpaces(scnr);
              scnr.next();
              return getToken(
                context2,
                10,
                ":"
                /* TokenChars.LinkedDelimiter */
              );
            default:
              if (isPluralStart(scnr)) {
                token = getToken(context2, 1, readPlural(scnr));
                context2.braceNest = 0;
                context2.inLinked = false;
                return token;
              }
              if (isLinkedDotStart(scnr, context2) || isLinkedDelimiterStart(scnr, context2)) {
                skipSpaces(scnr);
                return readTokenInLinked(scnr, context2);
              }
              if (isLinkedModifierStart(scnr, context2)) {
                skipSpaces(scnr);
                return getToken(context2, 12, readLinkedModifier(scnr));
              }
              if (isLinkedReferStart(scnr, context2)) {
                skipSpaces(scnr);
                if (ch === "{") {
                  return readTokenInPlaceholder(scnr, context2) || token;
                } else {
                  return getToken(context2, 11, readLinkedRefer(scnr));
                }
              }
              if (currentType === 8) {
                emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
              }
              context2.braceNest = 0;
              context2.inLinked = false;
              return readToken(scnr, context2);
          }
        }
        function readToken(scnr, context2) {
          let token = {
            type: 14
            /* TokenTypes.EOF */
          };
          if (context2.braceNest > 0) {
            return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
          }
          if (context2.inLinked) {
            return readTokenInLinked(scnr, context2) || getEndToken(context2);
          }
          const ch = scnr.currentChar();
          switch (ch) {
            case "{":
              return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
            case "}":
              emitError(CompileErrorCodes.UNBALANCED_CLOSING_BRACE, currentPosition(), 0);
              scnr.next();
              return getToken(
                context2,
                3,
                "}"
                /* TokenChars.BraceRight */
              );
            case "@":
              return readTokenInLinked(scnr, context2) || getEndToken(context2);
            default: {
              if (isPluralStart(scnr)) {
                token = getToken(context2, 1, readPlural(scnr));
                context2.braceNest = 0;
                context2.inLinked = false;
                return token;
              }
              const { isModulo, hasSpace } = detectModuloStart(scnr);
              if (isModulo) {
                return hasSpace ? getToken(context2, 0, readText(scnr)) : getToken(context2, 4, readModulo(scnr));
              }
              if (isTextStart(scnr)) {
                return getToken(context2, 0, readText(scnr));
              }
              break;
            }
          }
          return token;
        }
        function nextToken() {
          const { currentType, offset, startLoc, endLoc } = _context;
          _context.lastType = currentType;
          _context.lastOffset = offset;
          _context.lastStartLoc = startLoc;
          _context.lastEndLoc = endLoc;
          _context.offset = currentOffset();
          _context.startLoc = currentPosition();
          if (_scnr.currentChar() === EOF) {
            return getToken(
              _context,
              14
              /* TokenTypes.EOF */
            );
          }
          return readToken(_scnr, _context);
        }
        return {
          nextToken,
          currentOffset,
          currentPosition,
          context
        };
      }
      const ERROR_DOMAIN$2 = "parser";
      const KNOWN_ESCAPES = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
      function fromEscapeSequence(match2, codePoint4, codePoint6) {
        switch (match2) {
          case `\\\\`:
            return `\\`;
          case `\\'`:
            return `'`;
          default: {
            const codePoint = parseInt(codePoint4 || codePoint6, 16);
            if (codePoint <= 55295 || codePoint >= 57344) {
              return String.fromCodePoint(codePoint);
            }
            return "�";
          }
        }
      }
      function createParser(options = {}) {
        const location2 = options.location !== false;
        const { onError, onWarn } = options;
        function emitError(tokenzer, code2, start, offset, ...args) {
          const end = tokenzer.currentPosition();
          end.offset += offset;
          end.column += offset;
          if (onError) {
            const loc = location2 ? createLocation(start, end) : null;
            const err = createCompileError(code2, loc, {
              domain: ERROR_DOMAIN$2,
              args
            });
            onError(err);
          }
        }
        function emitWarn(tokenzer, code2, start, offset, ...args) {
          const end = tokenzer.currentPosition();
          end.offset += offset;
          end.column += offset;
          if (onWarn) {
            const loc = location2 ? createLocation(start, end) : null;
            onWarn(createCompileWarn(code2, loc, args));
          }
        }
        function startNode(type, offset, loc) {
          const node = { type };
          if (location2) {
            node.start = offset;
            node.end = offset;
            node.loc = { start: loc, end: loc };
          }
          return node;
        }
        function endNode(node, offset, pos, type) {
          if (location2) {
            node.end = offset;
            if (node.loc) {
              node.loc.end = pos;
            }
          }
        }
        function parseText(tokenizer, value) {
          const context = tokenizer.context();
          const node = startNode(3, context.offset, context.startLoc);
          node.value = value;
          endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
          return node;
        }
        function parseList(tokenizer, index) {
          const context = tokenizer.context();
          const { lastOffset: offset, lastStartLoc: loc } = context;
          const node = startNode(5, offset, loc);
          node.index = parseInt(index, 10);
          tokenizer.nextToken();
          endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
          return node;
        }
        function parseNamed(tokenizer, key, modulo) {
          const context = tokenizer.context();
          const { lastOffset: offset, lastStartLoc: loc } = context;
          const node = startNode(4, offset, loc);
          node.key = key;
          if (modulo === true) {
            node.modulo = true;
          }
          tokenizer.nextToken();
          endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
          return node;
        }
        function parseLiteral(tokenizer, value) {
          const context = tokenizer.context();
          const { lastOffset: offset, lastStartLoc: loc } = context;
          const node = startNode(9, offset, loc);
          node.value = value.replace(KNOWN_ESCAPES, fromEscapeSequence);
          tokenizer.nextToken();
          endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
          return node;
        }
        function parseLinkedModifier(tokenizer) {
          const token = tokenizer.nextToken();
          const context = tokenizer.context();
          const { lastOffset: offset, lastStartLoc: loc } = context;
          const node = startNode(8, offset, loc);
          if (token.type !== 12) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_MODIFIER, context.lastStartLoc, 0);
            node.value = "";
            endNode(node, offset, loc);
            return {
              nextConsumeToken: token,
              node
            };
          }
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.value = token.value || "";
          endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
          return {
            node
          };
        }
        function parseLinkedKey(tokenizer, value) {
          const context = tokenizer.context();
          const node = startNode(7, context.offset, context.startLoc);
          node.value = value;
          endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
          return node;
        }
        function parseLinked(tokenizer) {
          const context = tokenizer.context();
          const linkedNode = startNode(6, context.offset, context.startLoc);
          let token = tokenizer.nextToken();
          if (token.type === 9) {
            const parsed = parseLinkedModifier(tokenizer);
            linkedNode.modifier = parsed.node;
            token = parsed.nextConsumeToken || tokenizer.nextToken();
          }
          if (token.type !== 10) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          token = tokenizer.nextToken();
          if (token.type === 2) {
            token = tokenizer.nextToken();
          }
          switch (token.type) {
            case 11:
              if (token.value == null) {
                emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
              }
              linkedNode.key = parseLinkedKey(tokenizer, token.value || "");
              break;
            case 5:
              if (token.value == null) {
                emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
              }
              linkedNode.key = parseNamed(tokenizer, token.value || "");
              break;
            case 6:
              if (token.value == null) {
                emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
              }
              linkedNode.key = parseList(tokenizer, token.value || "");
              break;
            case 7:
              if (token.value == null) {
                emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
              }
              linkedNode.key = parseLiteral(tokenizer, token.value || "");
              break;
            default: {
              emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_KEY, context.lastStartLoc, 0);
              const nextContext = tokenizer.context();
              const emptyLinkedKeyNode = startNode(7, nextContext.offset, nextContext.startLoc);
              emptyLinkedKeyNode.value = "";
              endNode(emptyLinkedKeyNode, nextContext.offset, nextContext.startLoc);
              linkedNode.key = emptyLinkedKeyNode;
              endNode(linkedNode, nextContext.offset, nextContext.startLoc);
              return {
                nextConsumeToken: token,
                node: linkedNode
              };
            }
          }
          endNode(linkedNode, tokenizer.currentOffset(), tokenizer.currentPosition());
          return {
            node: linkedNode
          };
        }
        function parseMessage(tokenizer) {
          const context = tokenizer.context();
          const startOffset = context.currentType === 1 ? tokenizer.currentOffset() : context.offset;
          const startLoc = context.currentType === 1 ? context.endLoc : context.startLoc;
          const node = startNode(2, startOffset, startLoc);
          node.items = [];
          let nextToken = null;
          let modulo = null;
          do {
            const token = nextToken || tokenizer.nextToken();
            nextToken = null;
            switch (token.type) {
              case 0:
                if (token.value == null) {
                  emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
                }
                node.items.push(parseText(tokenizer, token.value || ""));
                break;
              case 6:
                if (token.value == null) {
                  emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
                }
                node.items.push(parseList(tokenizer, token.value || ""));
                break;
              case 4:
                modulo = true;
                break;
              case 5:
                if (token.value == null) {
                  emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
                }
                node.items.push(parseNamed(tokenizer, token.value || "", !!modulo));
                if (modulo) {
                  emitWarn(tokenizer, CompileWarnCodes.USE_MODULO_SYNTAX, context.lastStartLoc, 0, getTokenCaption(token));
                  modulo = null;
                }
                break;
              case 7:
                if (token.value == null) {
                  emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
                }
                node.items.push(parseLiteral(tokenizer, token.value || ""));
                break;
              case 8: {
                const parsed = parseLinked(tokenizer);
                node.items.push(parsed.node);
                nextToken = parsed.nextConsumeToken || null;
                break;
              }
            }
          } while (context.currentType !== 14 && context.currentType !== 1);
          const endOffset = context.currentType === 1 ? context.lastOffset : tokenizer.currentOffset();
          const endLoc = context.currentType === 1 ? context.lastEndLoc : tokenizer.currentPosition();
          endNode(node, endOffset, endLoc);
          return node;
        }
        function parsePlural(tokenizer, offset, loc, msgNode) {
          const context = tokenizer.context();
          let hasEmptyMessage = msgNode.items.length === 0;
          const node = startNode(1, offset, loc);
          node.cases = [];
          node.cases.push(msgNode);
          do {
            const msg = parseMessage(tokenizer);
            if (!hasEmptyMessage) {
              hasEmptyMessage = msg.items.length === 0;
            }
            node.cases.push(msg);
          } while (context.currentType !== 14);
          if (hasEmptyMessage) {
            emitError(tokenizer, CompileErrorCodes.MUST_HAVE_MESSAGES_IN_PLURAL, loc, 0);
          }
          endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
          return node;
        }
        function parseResource(tokenizer) {
          const context = tokenizer.context();
          const { offset, startLoc } = context;
          const msgNode = parseMessage(tokenizer);
          if (context.currentType === 14) {
            return msgNode;
          } else {
            return parsePlural(tokenizer, offset, startLoc, msgNode);
          }
        }
        function parse2(source) {
          const tokenizer = createTokenizer(source, assign({}, options));
          const context = tokenizer.context();
          const node = startNode(0, context.offset, context.startLoc);
          if (location2 && node.loc) {
            node.loc.source = source;
          }
          node.body = parseResource(tokenizer);
          if (options.onCacheKey) {
            node.cacheKey = options.onCacheKey(source);
          }
          if (context.currentType !== 14) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, source[context.offset] || "");
          }
          endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
          return node;
        }
        return { parse: parse2 };
      }
      function getTokenCaption(token) {
        if (token.type === 14) {
          return "EOF";
        }
        const name = (token.value || "").replace(/\r?\n/gu, "\\n");
        return name.length > 10 ? name.slice(0, 9) + "…" : name;
      }
      function createTransformer(ast, options = {}) {
        const _context = {
          ast,
          helpers: /* @__PURE__ */ new Set()
        };
        const context = () => _context;
        const helper = (name) => {
          _context.helpers.add(name);
          return name;
        };
        return { context, helper };
      }
      function traverseNodes(nodes, transformer) {
        for (let i = 0; i < nodes.length; i++) {
          traverseNode(nodes[i], transformer);
        }
      }
      function traverseNode(node, transformer) {
        switch (node.type) {
          case 1:
            traverseNodes(node.cases, transformer);
            transformer.helper(
              "plural"
              /* HelperNameMap.PLURAL */
            );
            break;
          case 2:
            traverseNodes(node.items, transformer);
            break;
          case 6: {
            const linked = node;
            traverseNode(linked.key, transformer);
            transformer.helper(
              "linked"
              /* HelperNameMap.LINKED */
            );
            transformer.helper(
              "type"
              /* HelperNameMap.TYPE */
            );
            break;
          }
          case 5:
            transformer.helper(
              "interpolate"
              /* HelperNameMap.INTERPOLATE */
            );
            transformer.helper(
              "list"
              /* HelperNameMap.LIST */
            );
            break;
          case 4:
            transformer.helper(
              "interpolate"
              /* HelperNameMap.INTERPOLATE */
            );
            transformer.helper(
              "named"
              /* HelperNameMap.NAMED */
            );
            break;
        }
      }
      function transform(ast, options = {}) {
        const transformer = createTransformer(ast);
        transformer.helper(
          "normalize"
          /* HelperNameMap.NORMALIZE */
        );
        ast.body && traverseNode(ast.body, transformer);
        const context = transformer.context();
        ast.helpers = Array.from(context.helpers);
      }
      function optimize(ast) {
        const body = ast.body;
        if (body.type === 2) {
          optimizeMessageNode(body);
        } else {
          body.cases.forEach((c) => optimizeMessageNode(c));
        }
        return ast;
      }
      function optimizeMessageNode(message) {
        if (message.items.length === 1) {
          const item = message.items[0];
          if (item.type === 3 || item.type === 9) {
            message.static = item.value;
            delete item.value;
          }
        } else {
          const values2 = [];
          for (let i = 0; i < message.items.length; i++) {
            const item = message.items[i];
            if (!(item.type === 3 || item.type === 9)) {
              break;
            }
            if (item.value == null) {
              break;
            }
            values2.push(item.value);
          }
          if (values2.length === message.items.length) {
            message.static = join(values2);
            for (let i = 0; i < message.items.length; i++) {
              const item = message.items[i];
              if (item.type === 3 || item.type === 9) {
                delete item.value;
              }
            }
          }
        }
      }
      const ERROR_DOMAIN$1 = "minifier";
      function minify(node) {
        node.t = node.type;
        switch (node.type) {
          case 0: {
            const resource2 = node;
            minify(resource2.body);
            resource2.b = resource2.body;
            delete resource2.body;
            break;
          }
          case 1: {
            const plural = node;
            const cases = plural.cases;
            for (let i = 0; i < cases.length; i++) {
              minify(cases[i]);
            }
            plural.c = cases;
            delete plural.cases;
            break;
          }
          case 2: {
            const message = node;
            const items = message.items;
            for (let i = 0; i < items.length; i++) {
              minify(items[i]);
            }
            message.i = items;
            delete message.items;
            if (message.static) {
              message.s = message.static;
              delete message.static;
            }
            break;
          }
          case 3:
          case 9:
          case 8:
          case 7: {
            const valueNode = node;
            if (valueNode.value) {
              valueNode.v = valueNode.value;
              delete valueNode.value;
            }
            break;
          }
          case 6: {
            const linked = node;
            minify(linked.key);
            linked.k = linked.key;
            delete linked.key;
            if (linked.modifier) {
              minify(linked.modifier);
              linked.m = linked.modifier;
              delete linked.modifier;
            }
            break;
          }
          case 5: {
            const list = node;
            list.i = list.index;
            delete list.index;
            break;
          }
          case 4: {
            const named = node;
            named.k = named.key;
            delete named.key;
            break;
          }
          default: {
            throw createCompileError(CompileErrorCodes.UNHANDLED_MINIFIER_NODE_TYPE, null, {
              domain: ERROR_DOMAIN$1,
              args: [node.type]
            });
          }
        }
        delete node.type;
      }
      const ERROR_DOMAIN = "parser";
      function createCodeGenerator(ast, options) {
        const { sourceMap, filename, breakLineCode, needIndent: _needIndent } = options;
        const location2 = options.location !== false;
        const _context = {
          filename,
          code: "",
          column: 1,
          line: 1,
          offset: 0,
          map: void 0,
          breakLineCode,
          needIndent: _needIndent,
          indentLevel: 0
        };
        if (location2 && ast.loc) {
          _context.source = ast.loc.source;
        }
        const context = () => _context;
        function push(code2, node) {
          _context.code += code2;
        }
        function _newline(n, withBreakLine = true) {
          const _breakLineCode = withBreakLine ? breakLineCode : "";
          push(_needIndent ? _breakLineCode + `  `.repeat(n) : _breakLineCode);
        }
        function indent(withNewLine = true) {
          const level = ++_context.indentLevel;
          withNewLine && _newline(level);
        }
        function deindent(withNewLine = true) {
          const level = --_context.indentLevel;
          withNewLine && _newline(level);
        }
        function newline() {
          _newline(_context.indentLevel);
        }
        const helper = (key) => `_${key}`;
        const needIndent = () => _context.needIndent;
        return {
          context,
          push,
          indent,
          deindent,
          newline,
          helper,
          needIndent
        };
      }
      function generateLinkedNode(generator, node) {
        const { helper } = generator;
        generator.push(`${helper(
        "linked"
        /* HelperNameMap.LINKED */
      )}(`);
        generateNode(generator, node.key);
        if (node.modifier) {
          generator.push(`, `);
          generateNode(generator, node.modifier);
          generator.push(`, _type`);
        } else {
          generator.push(`, undefined, _type`);
        }
        generator.push(`)`);
      }
      function generateMessageNode(generator, node) {
        const { helper, needIndent } = generator;
        generator.push(`${helper(
        "normalize"
        /* HelperNameMap.NORMALIZE */
      )}([`);
        generator.indent(needIndent());
        const length = node.items.length;
        for (let i = 0; i < length; i++) {
          generateNode(generator, node.items[i]);
          if (i === length - 1) {
            break;
          }
          generator.push(", ");
        }
        generator.deindent(needIndent());
        generator.push("])");
      }
      function generatePluralNode(generator, node) {
        const { helper, needIndent } = generator;
        if (node.cases.length > 1) {
          generator.push(`${helper(
          "plural"
          /* HelperNameMap.PLURAL */
        )}([`);
          generator.indent(needIndent());
          const length = node.cases.length;
          for (let i = 0; i < length; i++) {
            generateNode(generator, node.cases[i]);
            if (i === length - 1) {
              break;
            }
            generator.push(", ");
          }
          generator.deindent(needIndent());
          generator.push(`])`);
        }
      }
      function generateResource(generator, node) {
        if (node.body) {
          generateNode(generator, node.body);
        } else {
          generator.push("null");
        }
      }
      function generateNode(generator, node) {
        const { helper } = generator;
        switch (node.type) {
          case 0:
            generateResource(generator, node);
            break;
          case 1:
            generatePluralNode(generator, node);
            break;
          case 2:
            generateMessageNode(generator, node);
            break;
          case 6:
            generateLinkedNode(generator, node);
            break;
          case 8:
            generator.push(JSON.stringify(node.value), node);
            break;
          case 7:
            generator.push(JSON.stringify(node.value), node);
            break;
          case 5:
            generator.push(`${helper(
            "interpolate"
            /* HelperNameMap.INTERPOLATE */
          )}(${helper(
            "list"
            /* HelperNameMap.LIST */
          )}(${node.index}))`, node);
            break;
          case 4:
            generator.push(`${helper(
            "interpolate"
            /* HelperNameMap.INTERPOLATE */
          )}(${helper(
            "named"
            /* HelperNameMap.NAMED */
          )}(${JSON.stringify(node.key)}))`, node);
            break;
          case 9:
            generator.push(JSON.stringify(node.value), node);
            break;
          case 3:
            generator.push(JSON.stringify(node.value), node);
            break;
          default: {
            throw createCompileError(CompileErrorCodes.UNHANDLED_CODEGEN_NODE_TYPE, null, {
              domain: ERROR_DOMAIN,
              args: [node.type]
            });
          }
        }
      }
      const generate = (ast, options = {}) => {
        const mode = isString(options.mode) ? options.mode : "normal";
        const filename = isString(options.filename) ? options.filename : "message.intl";
        const sourceMap = !!options.sourceMap;
        const breakLineCode = options.breakLineCode != null ? options.breakLineCode : mode === "arrow" ? ";" : "\n";
        const needIndent = options.needIndent ? options.needIndent : mode !== "arrow";
        const helpers = ast.helpers || [];
        const generator = createCodeGenerator(ast, {
          mode,
          filename,
          sourceMap,
          breakLineCode,
          needIndent
        });
        generator.push(mode === "normal" ? `function __msg__ (ctx) {` : `(ctx) => {`);
        generator.indent(needIndent);
        if (helpers.length > 0) {
          generator.push(`const { ${join(helpers.map((s) => `${s}: _${s}`), ", ")} } = ctx`);
          generator.newline();
        }
        generator.push(`return `);
        generateNode(generator, ast);
        generator.deindent(needIndent);
        generator.push(`}`);
        delete ast.helpers;
        const { code: code2, map: map2 } = generator.context();
        return {
          ast,
          code: code2,
          map: map2 ? map2.toJSON() : void 0
          // eslint-disable-line @typescript-eslint/no-explicit-any
        };
      };
      function baseCompile$1(source, options = {}) {
        const assignedOptions = assign({}, options);
        const jit = !!assignedOptions.jit;
        const enalbeMinify = !!assignedOptions.minify;
        const enambeOptimize = assignedOptions.optimize == null ? true : assignedOptions.optimize;
        const parser = createParser(assignedOptions);
        const ast = parser.parse(source);
        if (!jit) {
          transform(ast, assignedOptions);
          return generate(ast, assignedOptions);
        } else {
          enambeOptimize && optimize(ast);
          enalbeMinify && minify(ast);
          return { ast, code: "" };
        }
      }
      /*!
        * core-base v9.14.1
        * (c) 2024 kazuya kawaguchi
        * Released under the MIT License.
        */
      function initFeatureFlags$1() {
        if (typeof __INTLIFY_PROD_DEVTOOLS__ !== "boolean") {
          getGlobalThis().__INTLIFY_PROD_DEVTOOLS__ = false;
        }
      }
      const pathStateMachine = [];
      pathStateMachine[
        0
        /* States.BEFORE_PATH */
      ] = {
        [
          "w"
          /* PathCharTypes.WORKSPACE */
        ]: [
          0
          /* States.BEFORE_PATH */
        ],
        [
          "i"
          /* PathCharTypes.IDENT */
        ]: [
          3,
          0
          /* Actions.APPEND */
        ],
        [
          "["
          /* PathCharTypes.LEFT_BRACKET */
        ]: [
          4
          /* States.IN_SUB_PATH */
        ],
        [
          "o"
          /* PathCharTypes.END_OF_FAIL */
        ]: [
          7
          /* States.AFTER_PATH */
        ]
      };
      pathStateMachine[
        1
        /* States.IN_PATH */
      ] = {
        [
          "w"
          /* PathCharTypes.WORKSPACE */
        ]: [
          1
          /* States.IN_PATH */
        ],
        [
          "."
          /* PathCharTypes.DOT */
        ]: [
          2
          /* States.BEFORE_IDENT */
        ],
        [
          "["
          /* PathCharTypes.LEFT_BRACKET */
        ]: [
          4
          /* States.IN_SUB_PATH */
        ],
        [
          "o"
          /* PathCharTypes.END_OF_FAIL */
        ]: [
          7
          /* States.AFTER_PATH */
        ]
      };
      pathStateMachine[
        2
        /* States.BEFORE_IDENT */
      ] = {
        [
          "w"
          /* PathCharTypes.WORKSPACE */
        ]: [
          2
          /* States.BEFORE_IDENT */
        ],
        [
          "i"
          /* PathCharTypes.IDENT */
        ]: [
          3,
          0
          /* Actions.APPEND */
        ],
        [
          "0"
          /* PathCharTypes.ZERO */
        ]: [
          3,
          0
          /* Actions.APPEND */
        ]
      };
      pathStateMachine[
        3
        /* States.IN_IDENT */
      ] = {
        [
          "i"
          /* PathCharTypes.IDENT */
        ]: [
          3,
          0
          /* Actions.APPEND */
        ],
        [
          "0"
          /* PathCharTypes.ZERO */
        ]: [
          3,
          0
          /* Actions.APPEND */
        ],
        [
          "w"
          /* PathCharTypes.WORKSPACE */
        ]: [
          1,
          1
          /* Actions.PUSH */
        ],
        [
          "."
          /* PathCharTypes.DOT */
        ]: [
          2,
          1
          /* Actions.PUSH */
        ],
        [
          "["
          /* PathCharTypes.LEFT_BRACKET */
        ]: [
          4,
          1
          /* Actions.PUSH */
        ],
        [
          "o"
          /* PathCharTypes.END_OF_FAIL */
        ]: [
          7,
          1
          /* Actions.PUSH */
        ]
      };
      pathStateMachine[
        4
        /* States.IN_SUB_PATH */
      ] = {
        [
          "'"
          /* PathCharTypes.SINGLE_QUOTE */
        ]: [
          5,
          0
          /* Actions.APPEND */
        ],
        [
          '"'
          /* PathCharTypes.DOUBLE_QUOTE */
        ]: [
          6,
          0
          /* Actions.APPEND */
        ],
        [
          "["
          /* PathCharTypes.LEFT_BRACKET */
        ]: [
          4,
          2
          /* Actions.INC_SUB_PATH_DEPTH */
        ],
        [
          "]"
          /* PathCharTypes.RIGHT_BRACKET */
        ]: [
          1,
          3
          /* Actions.PUSH_SUB_PATH */
        ],
        [
          "o"
          /* PathCharTypes.END_OF_FAIL */
        ]: 8,
        [
          "l"
          /* PathCharTypes.ELSE */
        ]: [
          4,
          0
          /* Actions.APPEND */
        ]
      };
      pathStateMachine[
        5
        /* States.IN_SINGLE_QUOTE */
      ] = {
        [
          "'"
          /* PathCharTypes.SINGLE_QUOTE */
        ]: [
          4,
          0
          /* Actions.APPEND */
        ],
        [
          "o"
          /* PathCharTypes.END_OF_FAIL */
        ]: 8,
        [
          "l"
          /* PathCharTypes.ELSE */
        ]: [
          5,
          0
          /* Actions.APPEND */
        ]
      };
      pathStateMachine[
        6
        /* States.IN_DOUBLE_QUOTE */
      ] = {
        [
          '"'
          /* PathCharTypes.DOUBLE_QUOTE */
        ]: [
          4,
          0
          /* Actions.APPEND */
        ],
        [
          "o"
          /* PathCharTypes.END_OF_FAIL */
        ]: 8,
        [
          "l"
          /* PathCharTypes.ELSE */
        ]: [
          6,
          0
          /* Actions.APPEND */
        ]
      };
      const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
      function isLiteral(exp) {
        return literalValueRE.test(exp);
      }
      function stripQuotes(str) {
        const a = str.charCodeAt(0);
        const b = str.charCodeAt(str.length - 1);
        return a === b && (a === 34 || a === 39) ? str.slice(1, -1) : str;
      }
      function getPathCharType(ch) {
        if (ch === void 0 || ch === null) {
          return "o";
        }
        const code2 = ch.charCodeAt(0);
        switch (code2) {
          case 91:
          case 93:
          case 46:
          case 34:
          case 39:
            return ch;
          case 95:
          case 36:
          case 45:
            return "i";
          case 9:
          case 10:
          case 13:
          case 160:
          case 65279:
          case 8232:
          case 8233:
            return "w";
        }
        return "i";
      }
      function formatSubPath(path) {
        const trimmed = path.trim();
        if (path.charAt(0) === "0" && isNaN(parseInt(path))) {
          return false;
        }
        return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
      }
      function parse(path) {
        const keys2 = [];
        let index = -1;
        let mode = 0;
        let subPathDepth = 0;
        let c;
        let key;
        let newChar;
        let type;
        let transition;
        let action;
        let typeMap;
        const actions = [];
        actions[
          0
          /* Actions.APPEND */
        ] = () => {
          if (key === void 0) {
            key = newChar;
          } else {
            key += newChar;
          }
        };
        actions[
          1
          /* Actions.PUSH */
        ] = () => {
          if (key !== void 0) {
            keys2.push(key);
            key = void 0;
          }
        };
        actions[
          2
          /* Actions.INC_SUB_PATH_DEPTH */
        ] = () => {
          actions[
            0
            /* Actions.APPEND */
          ]();
          subPathDepth++;
        };
        actions[
          3
          /* Actions.PUSH_SUB_PATH */
        ] = () => {
          if (subPathDepth > 0) {
            subPathDepth--;
            mode = 4;
            actions[
              0
              /* Actions.APPEND */
            ]();
          } else {
            subPathDepth = 0;
            if (key === void 0) {
              return false;
            }
            key = formatSubPath(key);
            if (key === false) {
              return false;
            } else {
              actions[
                1
                /* Actions.PUSH */
              ]();
            }
          }
        };
        function maybeUnescapeQuote() {
          const nextChar = path[index + 1];
          if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === '"') {
            index++;
            newChar = "\\" + nextChar;
            actions[
              0
              /* Actions.APPEND */
            ]();
            return true;
          }
        }
        while (mode !== null) {
          index++;
          c = path[index];
          if (c === "\\" && maybeUnescapeQuote()) {
            continue;
          }
          type = getPathCharType(c);
          typeMap = pathStateMachine[mode];
          transition = typeMap[type] || typeMap[
            "l"
            /* PathCharTypes.ELSE */
          ] || 8;
          if (transition === 8) {
            return;
          }
          mode = transition[0];
          if (transition[1] !== void 0) {
            action = actions[transition[1]];
            if (action) {
              newChar = c;
              if (action() === false) {
                return;
              }
            }
          }
          if (mode === 7) {
            return keys2;
          }
        }
      }
      const cache = /* @__PURE__ */ new Map();
      function resolveWithKeyValue(obj, path) {
        return isObject$3(obj) ? obj[path] : null;
      }
      function resolveValue(obj, path) {
        if (!isObject$3(obj)) {
          return null;
        }
        let hit = cache.get(path);
        if (!hit) {
          hit = parse(path);
          if (hit) {
            cache.set(path, hit);
          }
        }
        if (!hit) {
          return null;
        }
        const len = hit.length;
        let last2 = obj;
        let i = 0;
        while (i < len) {
          const val = last2[hit[i]];
          if (val === void 0) {
            return null;
          }
          if (isFunction(last2)) {
            return null;
          }
          last2 = val;
          i++;
        }
        return last2;
      }
      const DEFAULT_MODIFIER = (str) => str;
      const DEFAULT_MESSAGE = (ctx) => "";
      const DEFAULT_MESSAGE_DATA_TYPE = "text";
      const DEFAULT_NORMALIZE = (values2) => values2.length === 0 ? "" : join$1(values2);
      const DEFAULT_INTERPOLATE = toDisplayString;
      function pluralDefault(choice, choicesLength) {
        choice = Math.abs(choice);
        if (choicesLength === 2) {
          return choice ? choice > 1 ? 1 : 0 : 1;
        }
        return choice ? Math.min(choice, 2) : 0;
      }
      function getPluralIndex(options) {
        const index = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
        return options.named && (isNumber(options.named.count) || isNumber(options.named.n)) ? isNumber(options.named.count) ? options.named.count : isNumber(options.named.n) ? options.named.n : index : index;
      }
      function normalizeNamed(pluralIndex, props) {
        if (!props.count) {
          props.count = pluralIndex;
        }
        if (!props.n) {
          props.n = pluralIndex;
        }
      }
      function createMessageContext(options = {}) {
        const locale = options.locale;
        const pluralIndex = getPluralIndex(options);
        const pluralRule = isObject$3(options.pluralRules) && isString$1(locale) && isFunction(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault;
        const orgPluralRule = isObject$3(options.pluralRules) && isString$1(locale) && isFunction(options.pluralRules[locale]) ? pluralDefault : void 0;
        const plural = (messages) => {
          return messages[pluralRule(pluralIndex, messages.length, orgPluralRule)];
        };
        const _list = options.list || [];
        const list = (index) => _list[index];
        const _named = options.named || {};
        isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
        const named = (key) => _named[key];
        function message(key) {
          const msg = isFunction(options.messages) ? options.messages(key) : isObject$3(options.messages) ? options.messages[key] : false;
          return !msg ? options.parent ? options.parent.message(key) : DEFAULT_MESSAGE : msg;
        }
        const _modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER;
        const normalize = isPlainObject(options.processor) && isFunction(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
        const interpolate = isPlainObject(options.processor) && isFunction(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
        const type = isPlainObject(options.processor) && isString$1(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
        const linked = (key, ...args) => {
          const [arg1, arg2] = args;
          let type2 = "text";
          let modifier = "";
          if (args.length === 1) {
            if (isObject$3(arg1)) {
              modifier = arg1.modifier || modifier;
              type2 = arg1.type || type2;
            } else if (isString$1(arg1)) {
              modifier = arg1 || modifier;
            }
          } else if (args.length === 2) {
            if (isString$1(arg1)) {
              modifier = arg1 || modifier;
            }
            if (isString$1(arg2)) {
              type2 = arg2 || type2;
            }
          }
          const ret = message(key)(ctx);
          const msg = (
            // The message in vnode resolved with linked are returned as an array by processor.nomalize
            type2 === "vnode" && isArray(ret) && modifier ? ret[0] : ret
          );
          return modifier ? _modifier(modifier)(msg, type2) : msg;
        };
        const ctx = {
          [
            "list"
            /* HelperNameMap.LIST */
          ]: list,
          [
            "named"
            /* HelperNameMap.NAMED */
          ]: named,
          [
            "plural"
            /* HelperNameMap.PLURAL */
          ]: plural,
          [
            "linked"
            /* HelperNameMap.LINKED */
          ]: linked,
          [
            "message"
            /* HelperNameMap.MESSAGE */
          ]: message,
          [
            "type"
            /* HelperNameMap.TYPE */
          ]: type,
          [
            "interpolate"
            /* HelperNameMap.INTERPOLATE */
          ]: interpolate,
          [
            "normalize"
            /* HelperNameMap.NORMALIZE */
          ]: normalize,
          [
            "values"
            /* HelperNameMap.VALUES */
          ]: assign$1({}, _list, _named)
        };
        return ctx;
      }
      let devtools = null;
      function setDevToolsHook(hook) {
        devtools = hook;
      }
      function initI18nDevTools(i18n2, version, meta) {
        devtools && devtools.emit("i18n:init", {
          timestamp: Date.now(),
          i18n: i18n2,
          version,
          meta
        });
      }
      const translateDevTools = /* @__PURE__ */ createDevToolsHook(
        "function:translate"
        /* IntlifyDevToolsHooks.FunctionTranslate */
      );
      function createDevToolsHook(hook) {
        return (payloads) => devtools && devtools.emit(hook, payloads);
      }
      const code$1$1 = CompileWarnCodes.__EXTEND_POINT__;
      const inc$1$1 = incrementer(code$1$1);
      const CoreWarnCodes = {
        NOT_FOUND_KEY: code$1$1,
        // 2
        FALLBACK_TO_TRANSLATE: inc$1$1(),
        // 3
        CANNOT_FORMAT_NUMBER: inc$1$1(),
        // 4
        FALLBACK_TO_NUMBER_FORMAT: inc$1$1(),
        // 5
        CANNOT_FORMAT_DATE: inc$1$1(),
        // 6
        FALLBACK_TO_DATE_FORMAT: inc$1$1(),
        // 7
        EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: inc$1$1(),
        // 8
        __EXTEND_POINT__: inc$1$1()
        // 9
      };
      const code$2 = CompileErrorCodes.__EXTEND_POINT__;
      const inc$2 = incrementer(code$2);
      const CoreErrorCodes = {
        INVALID_ARGUMENT: code$2,
        // 17
        INVALID_DATE_ARGUMENT: inc$2(),
        // 18
        INVALID_ISO_DATE_ARGUMENT: inc$2(),
        // 19
        NOT_SUPPORT_NON_STRING_MESSAGE: inc$2(),
        // 20
        NOT_SUPPORT_LOCALE_PROMISE_VALUE: inc$2(),
        // 21
        NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: inc$2(),
        // 22
        NOT_SUPPORT_LOCALE_TYPE: inc$2(),
        // 23
        __EXTEND_POINT__: inc$2()
        // 24
      };
      function createCoreError(code2) {
        return createCompileError(code2, null, void 0);
      }
      function getLocale(context, options) {
        return options.locale != null ? resolveLocale(options.locale) : resolveLocale(context.locale);
      }
      let _resolveLocale;
      function resolveLocale(locale) {
        if (isString$1(locale)) {
          return locale;
        } else {
          if (isFunction(locale)) {
            if (locale.resolvedOnce && _resolveLocale != null) {
              return _resolveLocale;
            } else if (locale.constructor.name === "Function") {
              const resolve = locale();
              if (isPromise(resolve)) {
                throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
              }
              return _resolveLocale = resolve;
            } else {
              throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
            }
          } else {
            throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_TYPE);
          }
        }
      }
      function fallbackWithSimple(ctx, fallback, start) {
        return [.../* @__PURE__ */ new Set([
          start,
          ...isArray(fallback) ? fallback : isObject$3(fallback) ? Object.keys(fallback) : isString$1(fallback) ? [fallback] : [start]
        ])];
      }
      function fallbackWithLocaleChain(ctx, fallback, start) {
        const startLocale = isString$1(start) ? start : DEFAULT_LOCALE;
        const context = ctx;
        if (!context.__localeChainCache) {
          context.__localeChainCache = /* @__PURE__ */ new Map();
        }
        let chain = context.__localeChainCache.get(startLocale);
        if (!chain) {
          chain = [];
          let block = [start];
          while (isArray(block)) {
            block = appendBlockToChain(chain, block, fallback);
          }
          const defaults = isArray(fallback) || !isPlainObject(fallback) ? fallback : fallback["default"] ? fallback["default"] : null;
          block = isString$1(defaults) ? [defaults] : defaults;
          if (isArray(block)) {
            appendBlockToChain(chain, block, false);
          }
          context.__localeChainCache.set(startLocale, chain);
        }
        return chain;
      }
      function appendBlockToChain(chain, block, blocks) {
        let follow = true;
        for (let i = 0; i < block.length && isBoolean(follow); i++) {
          const locale = block[i];
          if (isString$1(locale)) {
            follow = appendLocaleToChain(chain, block[i], blocks);
          }
        }
        return follow;
      }
      function appendLocaleToChain(chain, locale, blocks) {
        let follow;
        const tokens = locale.split("-");
        do {
          const target = tokens.join("-");
          follow = appendItemToChain(chain, target, blocks);
          tokens.splice(-1, 1);
        } while (tokens.length && follow === true);
        return follow;
      }
      function appendItemToChain(chain, target, blocks) {
        let follow = false;
        if (!chain.includes(target)) {
          follow = true;
          if (target) {
            follow = target[target.length - 1] !== "!";
            const locale = target.replace(/!/g, "");
            chain.push(locale);
            if ((isArray(blocks) || isPlainObject(blocks)) && blocks[locale]) {
              follow = blocks[locale];
            }
          }
        }
        return follow;
      }
      const VERSION$1 = "9.14.1";
      const NOT_REOSLVED = -1;
      const DEFAULT_LOCALE = "en-US";
      const MISSING_RESOLVE_VALUE = "";
      const capitalize = (str) => `${str.charAt(0).toLocaleUpperCase()}${str.substr(1)}`;
      function getDefaultLinkedModifiers() {
        return {
          upper: (val, type) => {
            return type === "text" && isString$1(val) ? val.toUpperCase() : type === "vnode" && isObject$3(val) && "__v_isVNode" in val ? val.children.toUpperCase() : val;
          },
          lower: (val, type) => {
            return type === "text" && isString$1(val) ? val.toLowerCase() : type === "vnode" && isObject$3(val) && "__v_isVNode" in val ? val.children.toLowerCase() : val;
          },
          capitalize: (val, type) => {
            return type === "text" && isString$1(val) ? capitalize(val) : type === "vnode" && isObject$3(val) && "__v_isVNode" in val ? capitalize(val.children) : val;
          }
        };
      }
      let _compiler;
      function registerMessageCompiler(compiler) {
        _compiler = compiler;
      }
      let _resolver;
      function registerMessageResolver(resolver) {
        _resolver = resolver;
      }
      let _fallbacker;
      function registerLocaleFallbacker(fallbacker) {
        _fallbacker = fallbacker;
      }
      let _additionalMeta = null;
      const setAdditionalMeta = /* @__NO_SIDE_EFFECTS__ */ (meta) => {
        _additionalMeta = meta;
      };
      const getAdditionalMeta = /* @__NO_SIDE_EFFECTS__ */ () => _additionalMeta;
      let _fallbackContext = null;
      const setFallbackContext = (context) => {
        _fallbackContext = context;
      };
      const getFallbackContext = () => _fallbackContext;
      let _cid = 0;
      function createCoreContext(options = {}) {
        const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
        const version = isString$1(options.version) ? options.version : VERSION$1;
        const locale = isString$1(options.locale) || isFunction(options.locale) ? options.locale : DEFAULT_LOCALE;
        const _locale = isFunction(locale) ? DEFAULT_LOCALE : locale;
        const fallbackLocale = isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || isString$1(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale;
        const messages = isPlainObject(options.messages) ? options.messages : { [_locale]: {} };
        const datetimeFormats = isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale]: {} };
        const numberFormats = isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale]: {} };
        const modifiers = assign$1({}, options.modifiers || {}, getDefaultLinkedModifiers());
        const pluralRules = options.pluralRules || {};
        const missing = isFunction(options.missing) ? options.missing : null;
        const missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
        const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
        const fallbackFormat = !!options.fallbackFormat;
        const unresolving = !!options.unresolving;
        const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
        const processor = isPlainObject(options.processor) ? options.processor : null;
        const warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
        const escapeParameter = !!options.escapeParameter;
        const messageCompiler = isFunction(options.messageCompiler) ? options.messageCompiler : _compiler;
        const messageResolver = isFunction(options.messageResolver) ? options.messageResolver : _resolver || resolveWithKeyValue;
        const localeFallbacker = isFunction(options.localeFallbacker) ? options.localeFallbacker : _fallbacker || fallbackWithSimple;
        const fallbackContext = isObject$3(options.fallbackContext) ? options.fallbackContext : void 0;
        const internalOptions = options;
        const __datetimeFormatters = isObject$3(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map();
        const __numberFormatters = isObject$3(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map();
        const __meta = isObject$3(internalOptions.__meta) ? internalOptions.__meta : {};
        _cid++;
        const context = {
          version,
          cid: _cid,
          locale,
          fallbackLocale,
          messages,
          modifiers,
          pluralRules,
          missing,
          missingWarn,
          fallbackWarn,
          fallbackFormat,
          unresolving,
          postTranslation,
          processor,
          warnHtmlMessage,
          escapeParameter,
          messageCompiler,
          messageResolver,
          localeFallbacker,
          fallbackContext,
          onWarn,
          __meta
        };
        {
          context.datetimeFormats = datetimeFormats;
          context.numberFormats = numberFormats;
          context.__datetimeFormatters = __datetimeFormatters;
          context.__numberFormatters = __numberFormatters;
        }
        if (__INTLIFY_PROD_DEVTOOLS__) {
          initI18nDevTools(context, version, __meta);
        }
        return context;
      }
      function handleMissing(context, key, locale, missingWarn, type) {
        const { missing, onWarn } = context;
        if (missing !== null) {
          const ret = missing(context, locale, key, type);
          return isString$1(ret) ? ret : key;
        } else {
          return key;
        }
      }
      function updateFallbackLocale(ctx, locale, fallback) {
        const context = ctx;
        context.__localeChainCache = /* @__PURE__ */ new Map();
        ctx.localeFallbacker(ctx, fallback, locale);
      }
      function isAlmostSameLocale(locale, compareLocale) {
        if (locale === compareLocale)
          return false;
        return locale.split("-")[0] === compareLocale.split("-")[0];
      }
      function isImplicitFallback(targetLocale, locales) {
        const index = locales.indexOf(targetLocale);
        if (index === -1) {
          return false;
        }
        for (let i = index + 1; i < locales.length; i++) {
          if (isAlmostSameLocale(targetLocale, locales[i])) {
            return true;
          }
        }
        return false;
      }
      function format(ast) {
        const msg = (ctx) => formatParts(ctx, ast);
        return msg;
      }
      function formatParts(ctx, ast) {
        const body = ast.b || ast.body;
        if ((body.t || body.type) === 1) {
          const plural = body;
          const cases = plural.c || plural.cases;
          return ctx.plural(cases.reduce((messages, c) => [
            ...messages,
            formatMessageParts(ctx, c)
          ], []));
        } else {
          return formatMessageParts(ctx, body);
        }
      }
      function formatMessageParts(ctx, node) {
        const _static = node.s || node.static;
        if (_static) {
          return ctx.type === "text" ? _static : ctx.normalize([_static]);
        } else {
          const messages = (node.i || node.items).reduce((acm, c) => [...acm, formatMessagePart(ctx, c)], []);
          return ctx.normalize(messages);
        }
      }
      function formatMessagePart(ctx, node) {
        const type = node.t || node.type;
        switch (type) {
          case 3: {
            const text = node;
            return text.v || text.value;
          }
          case 9: {
            const literal = node;
            return literal.v || literal.value;
          }
          case 4: {
            const named = node;
            return ctx.interpolate(ctx.named(named.k || named.key));
          }
          case 5: {
            const list = node;
            return ctx.interpolate(ctx.list(list.i != null ? list.i : list.index));
          }
          case 6: {
            const linked = node;
            const modifier = linked.m || linked.modifier;
            return ctx.linked(formatMessagePart(ctx, linked.k || linked.key), modifier ? formatMessagePart(ctx, modifier) : void 0, ctx.type);
          }
          case 7: {
            const linkedKey = node;
            return linkedKey.v || linkedKey.value;
          }
          case 8: {
            const linkedModifier = node;
            return linkedModifier.v || linkedModifier.value;
          }
          default:
            throw new Error(`unhandled node type on format message part: ${type}`);
        }
      }
      const defaultOnCacheKey = (message) => message;
      let compileCache = /* @__PURE__ */ Object.create(null);
      const isMessageAST = (val) => isObject$3(val) && (val.t === 0 || val.type === 0) && ("b" in val || "body" in val);
      function baseCompile(message, options = {}) {
        let detectError = false;
        const onError = options.onError || defaultOnError;
        options.onError = (err) => {
          detectError = true;
          onError(err);
        };
        return { ...baseCompile$1(message, options), detectError };
      }
      function compile(message, context) {
        if (isString$1(message)) {
          isBoolean(context.warnHtmlMessage) ? context.warnHtmlMessage : true;
          const onCacheKey = context.onCacheKey || defaultOnCacheKey;
          const cacheKey = onCacheKey(message);
          const cached = compileCache[cacheKey];
          if (cached) {
            return cached;
          }
          const { ast, detectError } = baseCompile(message, {
            ...context,
            location: false,
            jit: true
          });
          const msg = format(ast);
          return !detectError ? compileCache[cacheKey] = msg : msg;
        } else {
          const cacheKey = message.cacheKey;
          if (cacheKey) {
            const cached = compileCache[cacheKey];
            if (cached) {
              return cached;
            }
            return compileCache[cacheKey] = format(message);
          } else {
            return format(message);
          }
        }
      }
      const NOOP_MESSAGE_FUNCTION = () => "";
      const isMessageFunction = (val) => isFunction(val);
      function translate(context, ...args) {
        const { fallbackFormat, postTranslation, unresolving, messageCompiler, fallbackLocale, messages } = context;
        const [key, options] = parseTranslateArgs(...args);
        const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
        const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
        const escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
        const resolvedMessage = !!options.resolvedMessage;
        const defaultMsgOrKey = isString$1(options.default) || isBoolean(options.default) ? !isBoolean(options.default) ? options.default : !messageCompiler ? () => key : key : fallbackFormat ? !messageCompiler ? () => key : key : "";
        const enableDefaultMsg = fallbackFormat || defaultMsgOrKey !== "";
        const locale = getLocale(context, options);
        escapeParameter && escapeParams(options);
        let [formatScope, targetLocale, message] = !resolvedMessage ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) : [
          key,
          locale,
          messages[locale] || {}
        ];
        let format2 = formatScope;
        let cacheBaseKey = key;
        if (!resolvedMessage && !(isString$1(format2) || isMessageAST(format2) || isMessageFunction(format2))) {
          if (enableDefaultMsg) {
            format2 = defaultMsgOrKey;
            cacheBaseKey = format2;
          }
        }
        if (!resolvedMessage && (!(isString$1(format2) || isMessageAST(format2) || isMessageFunction(format2)) || !isString$1(targetLocale))) {
          return unresolving ? NOT_REOSLVED : key;
        }
        let occurred = false;
        const onError = () => {
          occurred = true;
        };
        const msg = !isMessageFunction(format2) ? compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError) : format2;
        if (occurred) {
          return format2;
        }
        const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
        const msgContext = createMessageContext(ctxOptions);
        const messaged = evaluateMessage(context, msg, msgContext);
        const ret = postTranslation ? postTranslation(messaged, key) : messaged;
        if (__INTLIFY_PROD_DEVTOOLS__) {
          const payloads = {
            timestamp: Date.now(),
            key: isString$1(key) ? key : isMessageFunction(format2) ? format2.key : "",
            locale: targetLocale || (isMessageFunction(format2) ? format2.locale : ""),
            format: isString$1(format2) ? format2 : isMessageFunction(format2) ? format2.source : "",
            message: ret
          };
          payloads.meta = assign$1({}, context.__meta, /* @__PURE__ */ getAdditionalMeta() || {});
          translateDevTools(payloads);
        }
        return ret;
      }
      function escapeParams(options) {
        if (isArray(options.list)) {
          options.list = options.list.map((item) => isString$1(item) ? escapeHtml(item) : item);
        } else if (isObject$3(options.named)) {
          Object.keys(options.named).forEach((key) => {
            if (isString$1(options.named[key])) {
              options.named[key] = escapeHtml(options.named[key]);
            }
          });
        }
      }
      function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
        const { messages, onWarn, messageResolver: resolveValue2, localeFallbacker } = context;
        const locales = localeFallbacker(context, fallbackLocale, locale);
        let message = {};
        let targetLocale;
        let format2 = null;
        const type = "translate";
        for (let i = 0; i < locales.length; i++) {
          targetLocale = locales[i];
          message = messages[targetLocale] || {};
          if ((format2 = resolveValue2(message, key)) === null) {
            format2 = message[key];
          }
          if (isString$1(format2) || isMessageAST(format2) || isMessageFunction(format2)) {
            break;
          }
          if (!isImplicitFallback(targetLocale, locales)) {
            const missingRet = handleMissing(
              context,
              // eslint-disable-line @typescript-eslint/no-explicit-any
              key,
              targetLocale,
              missingWarn,
              type
            );
            if (missingRet !== key) {
              format2 = missingRet;
            }
          }
        }
        return [format2, targetLocale, message];
      }
      function compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError) {
        const { messageCompiler, warnHtmlMessage } = context;
        if (isMessageFunction(format2)) {
          const msg2 = format2;
          msg2.locale = msg2.locale || targetLocale;
          msg2.key = msg2.key || key;
          return msg2;
        }
        if (messageCompiler == null) {
          const msg2 = () => format2;
          msg2.locale = targetLocale;
          msg2.key = key;
          return msg2;
        }
        const msg = messageCompiler(format2, getCompileContext(context, targetLocale, cacheBaseKey, format2, warnHtmlMessage, onError));
        msg.locale = targetLocale;
        msg.key = key;
        msg.source = format2;
        return msg;
      }
      function evaluateMessage(context, msg, msgCtx) {
        const messaged = msg(msgCtx);
        return messaged;
      }
      function parseTranslateArgs(...args) {
        const [arg1, arg2, arg3] = args;
        const options = {};
        if (!isString$1(arg1) && !isNumber(arg1) && !isMessageFunction(arg1) && !isMessageAST(arg1)) {
          throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
        }
        const key = isNumber(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
        if (isNumber(arg2)) {
          options.plural = arg2;
        } else if (isString$1(arg2)) {
          options.default = arg2;
        } else if (isPlainObject(arg2) && !isEmptyObject(arg2)) {
          options.named = arg2;
        } else if (isArray(arg2)) {
          options.list = arg2;
        }
        if (isNumber(arg3)) {
          options.plural = arg3;
        } else if (isString$1(arg3)) {
          options.default = arg3;
        } else if (isPlainObject(arg3)) {
          assign$1(options, arg3);
        }
        return [key, options];
      }
      function getCompileContext(context, locale, key, source, warnHtmlMessage, onError) {
        return {
          locale,
          key,
          warnHtmlMessage,
          onError: (err) => {
            onError && onError(err);
            {
              throw err;
            }
          },
          onCacheKey: (source2) => generateFormatCacheKey(locale, key, source2)
        };
      }
      function getMessageContextOptions(context, locale, message, options) {
        const { modifiers, pluralRules, messageResolver: resolveValue2, fallbackLocale, fallbackWarn, missingWarn, fallbackContext } = context;
        const resolveMessage = (key) => {
          let val = resolveValue2(message, key);
          if (val == null && fallbackContext) {
            const [, , message2] = resolveMessageFormat(fallbackContext, key, locale, fallbackLocale, fallbackWarn, missingWarn);
            val = resolveValue2(message2, key);
          }
          if (isString$1(val) || isMessageAST(val)) {
            let occurred = false;
            const onError = () => {
              occurred = true;
            };
            const msg = compileMessageFormat(context, key, locale, val, key, onError);
            return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
          } else if (isMessageFunction(val)) {
            return val;
          } else {
            return NOOP_MESSAGE_FUNCTION;
          }
        };
        const ctxOptions = {
          locale,
          modifiers,
          pluralRules,
          messages: resolveMessage
        };
        if (context.processor) {
          ctxOptions.processor = context.processor;
        }
        if (options.list) {
          ctxOptions.list = options.list;
        }
        if (options.named) {
          ctxOptions.named = options.named;
        }
        if (isNumber(options.plural)) {
          ctxOptions.pluralIndex = options.plural;
        }
        return ctxOptions;
      }
      function datetime(context, ...args) {
        const { datetimeFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
        const { __datetimeFormatters } = context;
        const [key, value, options, overrides] = parseDateTimeArgs(...args);
        const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
        isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
        const part = !!options.part;
        const locale = getLocale(context, options);
        const locales = localeFallbacker(
          context,
          // eslint-disable-line @typescript-eslint/no-explicit-any
          fallbackLocale,
          locale
        );
        if (!isString$1(key) || key === "") {
          return new Intl.DateTimeFormat(locale, overrides).format(value);
        }
        let datetimeFormat = {};
        let targetLocale;
        let format2 = null;
        const type = "datetime format";
        for (let i = 0; i < locales.length; i++) {
          targetLocale = locales[i];
          datetimeFormat = datetimeFormats[targetLocale] || {};
          format2 = datetimeFormat[key];
          if (isPlainObject(format2))
            break;
          handleMissing(context, key, targetLocale, missingWarn, type);
        }
        if (!isPlainObject(format2) || !isString$1(targetLocale)) {
          return unresolving ? NOT_REOSLVED : key;
        }
        let id = `${targetLocale}__${key}`;
        if (!isEmptyObject(overrides)) {
          id = `${id}__${JSON.stringify(overrides)}`;
        }
        let formatter = __datetimeFormatters.get(id);
        if (!formatter) {
          formatter = new Intl.DateTimeFormat(targetLocale, assign$1({}, format2, overrides));
          __datetimeFormatters.set(id, formatter);
        }
        return !part ? formatter.format(value) : formatter.formatToParts(value);
      }
      const DATETIME_FORMAT_OPTIONS_KEYS = [
        "localeMatcher",
        "weekday",
        "era",
        "year",
        "month",
        "day",
        "hour",
        "minute",
        "second",
        "timeZoneName",
        "formatMatcher",
        "hour12",
        "timeZone",
        "dateStyle",
        "timeStyle",
        "calendar",
        "dayPeriod",
        "numberingSystem",
        "hourCycle",
        "fractionalSecondDigits"
      ];
      function parseDateTimeArgs(...args) {
        const [arg1, arg2, arg3, arg4] = args;
        const options = {};
        let overrides = {};
        let value;
        if (isString$1(arg1)) {
          const matches = arg1.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
          if (!matches) {
            throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
          }
          const dateTime = matches[3] ? matches[3].trim().startsWith("T") ? `${matches[1].trim()}${matches[3].trim()}` : `${matches[1].trim()}T${matches[3].trim()}` : matches[1].trim();
          value = new Date(dateTime);
          try {
            value.toISOString();
          } catch (e) {
            throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
          }
        } else if (isDate(arg1)) {
          if (isNaN(arg1.getTime())) {
            throw createCoreError(CoreErrorCodes.INVALID_DATE_ARGUMENT);
          }
          value = arg1;
        } else if (isNumber(arg1)) {
          value = arg1;
        } else {
          throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
        }
        if (isString$1(arg2)) {
          options.key = arg2;
        } else if (isPlainObject(arg2)) {
          Object.keys(arg2).forEach((key) => {
            if (DATETIME_FORMAT_OPTIONS_KEYS.includes(key)) {
              overrides[key] = arg2[key];
            } else {
              options[key] = arg2[key];
            }
          });
        }
        if (isString$1(arg3)) {
          options.locale = arg3;
        } else if (isPlainObject(arg3)) {
          overrides = arg3;
        }
        if (isPlainObject(arg4)) {
          overrides = arg4;
        }
        return [options.key || "", value, options, overrides];
      }
      function clearDateTimeFormat(ctx, locale, format2) {
        const context = ctx;
        for (const key in format2) {
          const id = `${locale}__${key}`;
          if (!context.__datetimeFormatters.has(id)) {
            continue;
          }
          context.__datetimeFormatters.delete(id);
        }
      }
      function number(context, ...args) {
        const { numberFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
        const { __numberFormatters } = context;
        const [key, value, options, overrides] = parseNumberArgs(...args);
        const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
        isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
        const part = !!options.part;
        const locale = getLocale(context, options);
        const locales = localeFallbacker(
          context,
          // eslint-disable-line @typescript-eslint/no-explicit-any
          fallbackLocale,
          locale
        );
        if (!isString$1(key) || key === "") {
          return new Intl.NumberFormat(locale, overrides).format(value);
        }
        let numberFormat = {};
        let targetLocale;
        let format2 = null;
        const type = "number format";
        for (let i = 0; i < locales.length; i++) {
          targetLocale = locales[i];
          numberFormat = numberFormats[targetLocale] || {};
          format2 = numberFormat[key];
          if (isPlainObject(format2))
            break;
          handleMissing(context, key, targetLocale, missingWarn, type);
        }
        if (!isPlainObject(format2) || !isString$1(targetLocale)) {
          return unresolving ? NOT_REOSLVED : key;
        }
        let id = `${targetLocale}__${key}`;
        if (!isEmptyObject(overrides)) {
          id = `${id}__${JSON.stringify(overrides)}`;
        }
        let formatter = __numberFormatters.get(id);
        if (!formatter) {
          formatter = new Intl.NumberFormat(targetLocale, assign$1({}, format2, overrides));
          __numberFormatters.set(id, formatter);
        }
        return !part ? formatter.format(value) : formatter.formatToParts(value);
      }
      const NUMBER_FORMAT_OPTIONS_KEYS = [
        "localeMatcher",
        "style",
        "currency",
        "currencyDisplay",
        "currencySign",
        "useGrouping",
        "minimumIntegerDigits",
        "minimumFractionDigits",
        "maximumFractionDigits",
        "minimumSignificantDigits",
        "maximumSignificantDigits",
        "compactDisplay",
        "notation",
        "signDisplay",
        "unit",
        "unitDisplay",
        "roundingMode",
        "roundingPriority",
        "roundingIncrement",
        "trailingZeroDisplay"
      ];
      function parseNumberArgs(...args) {
        const [arg1, arg2, arg3, arg4] = args;
        const options = {};
        let overrides = {};
        if (!isNumber(arg1)) {
          throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
        }
        const value = arg1;
        if (isString$1(arg2)) {
          options.key = arg2;
        } else if (isPlainObject(arg2)) {
          Object.keys(arg2).forEach((key) => {
            if (NUMBER_FORMAT_OPTIONS_KEYS.includes(key)) {
              overrides[key] = arg2[key];
            } else {
              options[key] = arg2[key];
            }
          });
        }
        if (isString$1(arg3)) {
          options.locale = arg3;
        } else if (isPlainObject(arg3)) {
          overrides = arg3;
        }
        if (isPlainObject(arg4)) {
          overrides = arg4;
        }
        return [options.key || "", value, options, overrides];
      }
      function clearNumberFormat(ctx, locale, format2) {
        const context = ctx;
        for (const key in format2) {
          const id = `${locale}__${key}`;
          if (!context.__numberFormatters.has(id)) {
            continue;
          }
          context.__numberFormatters.delete(id);
        }
      }
      {
        initFeatureFlags$1();
      }
      /*!
        * vue-i18n v9.14.1
        * (c) 2024 kazuya kawaguchi
        * Released under the MIT License.
        */
      const VERSION = "9.14.1";
      function initFeatureFlags() {
        if (typeof __INTLIFY_PROD_DEVTOOLS__ !== "boolean") {
          getGlobalThis().__INTLIFY_PROD_DEVTOOLS__ = false;
        }
      }
      const code$1 = CoreWarnCodes.__EXTEND_POINT__;
      const inc$1 = incrementer(code$1);
      ({
        FALLBACK_TO_ROOT: code$1,
        // 9
        NOT_SUPPORTED_PRESERVE: inc$1(),
        // 10
        NOT_SUPPORTED_FORMATTER: inc$1(),
        // 11
        NOT_SUPPORTED_PRESERVE_DIRECTIVE: inc$1(),
        // 12
        NOT_SUPPORTED_GET_CHOICE_INDEX: inc$1(),
        // 13
        COMPONENT_NAME_LEGACY_COMPATIBLE: inc$1(),
        // 14
        NOT_FOUND_PARENT_SCOPE: inc$1(),
        // 15
        IGNORE_OBJ_FLATTEN: inc$1(),
        // 16
        NOTICE_DROP_ALLOW_COMPOSITION: inc$1(),
        // 17
        NOTICE_DROP_TRANSLATE_EXIST_COMPATIBLE_FLAG: inc$1()
        // 18
      });
      const code = CoreErrorCodes.__EXTEND_POINT__;
      const inc = incrementer(code);
      const I18nErrorCodes = {
        // composer module errors
        UNEXPECTED_RETURN_TYPE: code,
        // 24
        // legacy module errors
        INVALID_ARGUMENT: inc(),
        // 25
        // i18n module errors
        MUST_BE_CALL_SETUP_TOP: inc(),
        // 26
        NOT_INSTALLED: inc(),
        // 27
        NOT_AVAILABLE_IN_LEGACY_MODE: inc(),
        // 28
        // directive module errors
        REQUIRED_VALUE: inc(),
        // 29
        INVALID_VALUE: inc(),
        // 30
        // vue-devtools errors
        CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: inc(),
        // 31
        NOT_INSTALLED_WITH_PROVIDE: inc(),
        // 32
        // unexpected error
        UNEXPECTED_ERROR: inc(),
        // 33
        // not compatible legacy vue-i18n constructor
        NOT_COMPATIBLE_LEGACY_VUE_I18N: inc(),
        // 34
        // bridge support vue 2.x only
        BRIDGE_SUPPORT_VUE_2_ONLY: inc(),
        // 35
        // need to define `i18n` option in `allowComposition: true` and `useScope: 'local' at `useI18n``
        MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: inc(),
        // 36
        // Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly
        NOT_AVAILABLE_COMPOSITION_IN_LEGACY: inc(),
        // 37
        // for enhancement
        __EXTEND_POINT__: inc()
        // 38
      };
      function createI18nError(code2, ...args) {
        return createCompileError(code2, null, void 0);
      }
      const TranslateVNodeSymbol = /* @__PURE__ */ makeSymbol("__translateVNode");
      const DatetimePartsSymbol = /* @__PURE__ */ makeSymbol("__datetimeParts");
      const NumberPartsSymbol = /* @__PURE__ */ makeSymbol("__numberParts");
      const SetPluralRulesSymbol = makeSymbol("__setPluralRules");
      const InejctWithOptionSymbol = /* @__PURE__ */ makeSymbol("__injectWithOption");
      const DisposeSymbol = /* @__PURE__ */ makeSymbol("__dispose");
      function handleFlatJson(obj) {
        if (!isObject$3(obj)) {
          return obj;
        }
        for (const key in obj) {
          if (!hasOwn(obj, key)) {
            continue;
          }
          if (!key.includes(".")) {
            if (isObject$3(obj[key])) {
              handleFlatJson(obj[key]);
            }
          } else {
            const subKeys = key.split(".");
            const lastIndex = subKeys.length - 1;
            let currentObj = obj;
            let hasStringValue = false;
            for (let i = 0; i < lastIndex; i++) {
              if (!(subKeys[i] in currentObj)) {
                currentObj[subKeys[i]] = {};
              }
              if (!isObject$3(currentObj[subKeys[i]])) {
                hasStringValue = true;
                break;
              }
              currentObj = currentObj[subKeys[i]];
            }
            if (!hasStringValue) {
              currentObj[subKeys[lastIndex]] = obj[key];
              delete obj[key];
            }
            if (isObject$3(currentObj[subKeys[lastIndex]])) {
              handleFlatJson(currentObj[subKeys[lastIndex]]);
            }
          }
        }
        return obj;
      }
      function getLocaleMessages(locale, options) {
        const { messages, __i18n, messageResolver, flatJson } = options;
        const ret = isPlainObject(messages) ? messages : isArray(__i18n) ? {} : { [locale]: {} };
        if (isArray(__i18n)) {
          __i18n.forEach((custom) => {
            if ("locale" in custom && "resource" in custom) {
              const { locale: locale2, resource: resource2 } = custom;
              if (locale2) {
                ret[locale2] = ret[locale2] || {};
                deepCopy(resource2, ret[locale2]);
              } else {
                deepCopy(resource2, ret);
              }
            } else {
              isString$1(custom) && deepCopy(JSON.parse(custom), ret);
            }
          });
        }
        if (messageResolver == null && flatJson) {
          for (const key in ret) {
            if (hasOwn(ret, key)) {
              handleFlatJson(ret[key]);
            }
          }
        }
        return ret;
      }
      function getComponentOptions(instance) {
        return instance.type;
      }
      function adjustI18nResources(gl, options, componentOptions) {
        let messages = isObject$3(options.messages) ? options.messages : {};
        if ("__i18nGlobal" in componentOptions) {
          messages = getLocaleMessages(gl.locale.value, {
            messages,
            __i18n: componentOptions.__i18nGlobal
          });
        }
        const locales = Object.keys(messages);
        if (locales.length) {
          locales.forEach((locale) => {
            gl.mergeLocaleMessage(locale, messages[locale]);
          });
        }
        {
          if (isObject$3(options.datetimeFormats)) {
            const locales2 = Object.keys(options.datetimeFormats);
            if (locales2.length) {
              locales2.forEach((locale) => {
                gl.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
              });
            }
          }
          if (isObject$3(options.numberFormats)) {
            const locales2 = Object.keys(options.numberFormats);
            if (locales2.length) {
              locales2.forEach((locale) => {
                gl.mergeNumberFormat(locale, options.numberFormats[locale]);
              });
            }
          }
        }
      }
      function createTextNode(key) {
        return vue.createVNode(vue.Text, null, key, 0);
      }
      const DEVTOOLS_META = "__INTLIFY_META__";
      const NOOP_RETURN_ARRAY = () => [];
      const NOOP_RETURN_FALSE = () => false;
      let composerID = 0;
      function defineCoreMissingHandler(missing) {
        return (ctx, locale, key, type) => {
          return missing(locale, key, vue.getCurrentInstance() || void 0, type);
        };
      }
      const getMetaInfo = /* @__NO_SIDE_EFFECTS__ */ () => {
        const instance = vue.getCurrentInstance();
        let meta = null;
        return instance && (meta = getComponentOptions(instance)[DEVTOOLS_META]) ? { [DEVTOOLS_META]: meta } : null;
      };
      function createComposer(options = {}, VueI18nLegacy) {
        const { __root, __injectWithOption } = options;
        const _isGlobal = __root === void 0;
        const flatJson = options.flatJson;
        const _ref = inBrowser ? vue.ref : vue.shallowRef;
        const translateExistCompatible = !!options.translateExistCompatible;
        let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
        const _locale = _ref(
          // prettier-ignore
          __root && _inheritLocale ? __root.locale.value : isString$1(options.locale) ? options.locale : DEFAULT_LOCALE
        );
        const _fallbackLocale = _ref(
          // prettier-ignore
          __root && _inheritLocale ? __root.fallbackLocale.value : isString$1(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
        );
        const _messages = _ref(getLocaleMessages(_locale.value, options));
        const _datetimeFormats = _ref(isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
        const _numberFormats = _ref(isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
        let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
        let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
        let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
        let _fallbackFormat = !!options.fallbackFormat;
        let _missing = isFunction(options.missing) ? options.missing : null;
        let _runtimeMissing = isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null;
        let _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
        let _warnHtmlMessage = __root ? __root.warnHtmlMessage : isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
        let _escapeParameter = !!options.escapeParameter;
        const _modifiers = __root ? __root.modifiers : isPlainObject(options.modifiers) ? options.modifiers : {};
        let _pluralRules = options.pluralRules || __root && __root.pluralRules;
        let _context;
        const getCoreContext = () => {
          _isGlobal && setFallbackContext(null);
          const ctxOptions = {
            version: VERSION,
            locale: _locale.value,
            fallbackLocale: _fallbackLocale.value,
            messages: _messages.value,
            modifiers: _modifiers,
            pluralRules: _pluralRules,
            missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
            missingWarn: _missingWarn,
            fallbackWarn: _fallbackWarn,
            fallbackFormat: _fallbackFormat,
            unresolving: true,
            postTranslation: _postTranslation === null ? void 0 : _postTranslation,
            warnHtmlMessage: _warnHtmlMessage,
            escapeParameter: _escapeParameter,
            messageResolver: options.messageResolver,
            messageCompiler: options.messageCompiler,
            __meta: { framework: "vue" }
          };
          {
            ctxOptions.datetimeFormats = _datetimeFormats.value;
            ctxOptions.numberFormats = _numberFormats.value;
            ctxOptions.__datetimeFormatters = isPlainObject(_context) ? _context.__datetimeFormatters : void 0;
            ctxOptions.__numberFormatters = isPlainObject(_context) ? _context.__numberFormatters : void 0;
          }
          const ctx = createCoreContext(ctxOptions);
          _isGlobal && setFallbackContext(ctx);
          return ctx;
        };
        _context = getCoreContext();
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
        function trackReactivityValues() {
          return [
            _locale.value,
            _fallbackLocale.value,
            _messages.value,
            _datetimeFormats.value,
            _numberFormats.value
          ];
        }
        const locale = vue.computed({
          get: () => _locale.value,
          set: (val) => {
            _locale.value = val;
            _context.locale = _locale.value;
          }
        });
        const fallbackLocale = vue.computed({
          get: () => _fallbackLocale.value,
          set: (val) => {
            _fallbackLocale.value = val;
            _context.fallbackLocale = _fallbackLocale.value;
            updateFallbackLocale(_context, _locale.value, val);
          }
        });
        const messages = vue.computed(() => _messages.value);
        const datetimeFormats = /* @__PURE__ */ vue.computed(() => _datetimeFormats.value);
        const numberFormats = /* @__PURE__ */ vue.computed(() => _numberFormats.value);
        function getPostTranslationHandler() {
          return isFunction(_postTranslation) ? _postTranslation : null;
        }
        function setPostTranslationHandler(handler) {
          _postTranslation = handler;
          _context.postTranslation = handler;
        }
        function getMissingHandler() {
          return _missing;
        }
        function setMissingHandler(handler) {
          if (handler !== null) {
            _runtimeMissing = defineCoreMissingHandler(handler);
          }
          _missing = handler;
          _context.missing = _runtimeMissing;
        }
        const wrapWithDeps = (fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) => {
          trackReactivityValues();
          let ret;
          try {
            if (__INTLIFY_PROD_DEVTOOLS__) {
              /* @__PURE__ */ setAdditionalMeta(/* @__PURE__ */ getMetaInfo());
            }
            if (!_isGlobal) {
              _context.fallbackContext = __root ? getFallbackContext() : void 0;
            }
            ret = fn(_context);
          } finally {
            if (__INTLIFY_PROD_DEVTOOLS__) ;
            if (!_isGlobal) {
              _context.fallbackContext = void 0;
            }
          }
          if (warnType !== "translate exists" && // for not `te` (e.g `t`)
          isNumber(ret) && ret === NOT_REOSLVED || warnType === "translate exists" && !ret) {
            const [key, arg2] = argumentParser();
            return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
          } else if (successCondition(ret)) {
            return ret;
          } else {
            throw createI18nError(I18nErrorCodes.UNEXPECTED_RETURN_TYPE);
          }
        };
        function t2(...args) {
          return wrapWithDeps((context) => Reflect.apply(translate, null, [context, ...args]), () => parseTranslateArgs(...args), "translate", (root2) => Reflect.apply(root2.t, root2, [...args]), (key) => key, (val) => isString$1(val));
        }
        function rt(...args) {
          const [arg1, arg2, arg3] = args;
          if (arg3 && !isObject$3(arg3)) {
            throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
          }
          return t2(...[arg1, arg2, assign$1({ resolvedMessage: true }, arg3 || {})]);
        }
        function d(...args) {
          return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root2) => Reflect.apply(root2.d, root2, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString$1(val));
        }
        function n(...args) {
          return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root2) => Reflect.apply(root2.n, root2, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString$1(val));
        }
        function normalize(values2) {
          return values2.map((val) => isString$1(val) || isNumber(val) || isBoolean(val) ? createTextNode(String(val)) : val);
        }
        const interpolate = (val) => val;
        const processor = {
          normalize,
          interpolate,
          type: "vnode"
        };
        function translateVNode(...args) {
          return wrapWithDeps(
            (context) => {
              let ret;
              const _context2 = context;
              try {
                _context2.processor = processor;
                ret = Reflect.apply(translate, null, [_context2, ...args]);
              } finally {
                _context2.processor = null;
              }
              return ret;
            },
            () => parseTranslateArgs(...args),
            "translate",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (root2) => root2[TranslateVNodeSymbol](...args),
            (key) => [createTextNode(key)],
            (val) => isArray(val)
          );
        }
        function numberParts(...args) {
          return wrapWithDeps(
            (context) => Reflect.apply(number, null, [context, ...args]),
            () => parseNumberArgs(...args),
            "number format",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (root2) => root2[NumberPartsSymbol](...args),
            NOOP_RETURN_ARRAY,
            (val) => isString$1(val) || isArray(val)
          );
        }
        function datetimeParts(...args) {
          return wrapWithDeps(
            (context) => Reflect.apply(datetime, null, [context, ...args]),
            () => parseDateTimeArgs(...args),
            "datetime format",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (root2) => root2[DatetimePartsSymbol](...args),
            NOOP_RETURN_ARRAY,
            (val) => isString$1(val) || isArray(val)
          );
        }
        function setPluralRules(rules) {
          _pluralRules = rules;
          _context.pluralRules = _pluralRules;
        }
        function te(key, locale2) {
          return wrapWithDeps(() => {
            if (!key) {
              return false;
            }
            const targetLocale = isString$1(locale2) ? locale2 : _locale.value;
            const message = getLocaleMessage(targetLocale);
            const resolved = _context.messageResolver(message, key);
            return !translateExistCompatible ? isMessageAST(resolved) || isMessageFunction(resolved) || isString$1(resolved) : resolved != null;
          }, () => [key], "translate exists", (root2) => {
            return Reflect.apply(root2.te, root2, [key, locale2]);
          }, NOOP_RETURN_FALSE, (val) => isBoolean(val));
        }
        function resolveMessages(key) {
          let messages2 = null;
          const locales = fallbackWithLocaleChain(_context, _fallbackLocale.value, _locale.value);
          for (let i = 0; i < locales.length; i++) {
            const targetLocaleMessages = _messages.value[locales[i]] || {};
            const messageValue = _context.messageResolver(targetLocaleMessages, key);
            if (messageValue != null) {
              messages2 = messageValue;
              break;
            }
          }
          return messages2;
        }
        function tm(key) {
          const messages2 = resolveMessages(key);
          return messages2 != null ? messages2 : __root ? __root.tm(key) || {} : {};
        }
        function getLocaleMessage(locale2) {
          return _messages.value[locale2] || {};
        }
        function setLocaleMessage(locale2, message) {
          if (flatJson) {
            const _message = { [locale2]: message };
            for (const key in _message) {
              if (hasOwn(_message, key)) {
                handleFlatJson(_message[key]);
              }
            }
            message = _message[locale2];
          }
          _messages.value[locale2] = message;
          _context.messages = _messages.value;
        }
        function mergeLocaleMessage(locale2, message) {
          _messages.value[locale2] = _messages.value[locale2] || {};
          const _message = { [locale2]: message };
          if (flatJson) {
            for (const key in _message) {
              if (hasOwn(_message, key)) {
                handleFlatJson(_message[key]);
              }
            }
          }
          message = _message[locale2];
          deepCopy(message, _messages.value[locale2]);
          _context.messages = _messages.value;
        }
        function getDateTimeFormat(locale2) {
          return _datetimeFormats.value[locale2] || {};
        }
        function setDateTimeFormat(locale2, format2) {
          _datetimeFormats.value[locale2] = format2;
          _context.datetimeFormats = _datetimeFormats.value;
          clearDateTimeFormat(_context, locale2, format2);
        }
        function mergeDateTimeFormat(locale2, format2) {
          _datetimeFormats.value[locale2] = assign$1(_datetimeFormats.value[locale2] || {}, format2);
          _context.datetimeFormats = _datetimeFormats.value;
          clearDateTimeFormat(_context, locale2, format2);
        }
        function getNumberFormat(locale2) {
          return _numberFormats.value[locale2] || {};
        }
        function setNumberFormat(locale2, format2) {
          _numberFormats.value[locale2] = format2;
          _context.numberFormats = _numberFormats.value;
          clearNumberFormat(_context, locale2, format2);
        }
        function mergeNumberFormat(locale2, format2) {
          _numberFormats.value[locale2] = assign$1(_numberFormats.value[locale2] || {}, format2);
          _context.numberFormats = _numberFormats.value;
          clearNumberFormat(_context, locale2, format2);
        }
        composerID++;
        if (__root && inBrowser) {
          vue.watch(__root.locale, (val) => {
            if (_inheritLocale) {
              _locale.value = val;
              _context.locale = val;
              updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
            }
          });
          vue.watch(__root.fallbackLocale, (val) => {
            if (_inheritLocale) {
              _fallbackLocale.value = val;
              _context.fallbackLocale = val;
              updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
            }
          });
        }
        const composer = {
          id: composerID,
          locale,
          fallbackLocale,
          get inheritLocale() {
            return _inheritLocale;
          },
          set inheritLocale(val) {
            _inheritLocale = val;
            if (val && __root) {
              _locale.value = __root.locale.value;
              _fallbackLocale.value = __root.fallbackLocale.value;
              updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
            }
          },
          get availableLocales() {
            return Object.keys(_messages.value).sort();
          },
          messages,
          get modifiers() {
            return _modifiers;
          },
          get pluralRules() {
            return _pluralRules || {};
          },
          get isGlobal() {
            return _isGlobal;
          },
          get missingWarn() {
            return _missingWarn;
          },
          set missingWarn(val) {
            _missingWarn = val;
            _context.missingWarn = _missingWarn;
          },
          get fallbackWarn() {
            return _fallbackWarn;
          },
          set fallbackWarn(val) {
            _fallbackWarn = val;
            _context.fallbackWarn = _fallbackWarn;
          },
          get fallbackRoot() {
            return _fallbackRoot;
          },
          set fallbackRoot(val) {
            _fallbackRoot = val;
          },
          get fallbackFormat() {
            return _fallbackFormat;
          },
          set fallbackFormat(val) {
            _fallbackFormat = val;
            _context.fallbackFormat = _fallbackFormat;
          },
          get warnHtmlMessage() {
            return _warnHtmlMessage;
          },
          set warnHtmlMessage(val) {
            _warnHtmlMessage = val;
            _context.warnHtmlMessage = val;
          },
          get escapeParameter() {
            return _escapeParameter;
          },
          set escapeParameter(val) {
            _escapeParameter = val;
            _context.escapeParameter = val;
          },
          t: t2,
          getLocaleMessage,
          setLocaleMessage,
          mergeLocaleMessage,
          getPostTranslationHandler,
          setPostTranslationHandler,
          getMissingHandler,
          setMissingHandler,
          [SetPluralRulesSymbol]: setPluralRules
        };
        {
          composer.datetimeFormats = datetimeFormats;
          composer.numberFormats = numberFormats;
          composer.rt = rt;
          composer.te = te;
          composer.tm = tm;
          composer.d = d;
          composer.n = n;
          composer.getDateTimeFormat = getDateTimeFormat;
          composer.setDateTimeFormat = setDateTimeFormat;
          composer.mergeDateTimeFormat = mergeDateTimeFormat;
          composer.getNumberFormat = getNumberFormat;
          composer.setNumberFormat = setNumberFormat;
          composer.mergeNumberFormat = mergeNumberFormat;
          composer[InejctWithOptionSymbol] = __injectWithOption;
          composer[TranslateVNodeSymbol] = translateVNode;
          composer[DatetimePartsSymbol] = datetimeParts;
          composer[NumberPartsSymbol] = numberParts;
        }
        return composer;
      }
      const baseFormatProps = {
        tag: {
          type: [String, Object]
        },
        locale: {
          type: String
        },
        scope: {
          type: String,
          // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
          validator: (val) => val === "parent" || val === "global",
          default: "parent"
          /* ComponentI18nScope */
        },
        i18n: {
          type: Object
        }
      };
      function getInterpolateArg({ slots }, keys2) {
        if (keys2.length === 1 && keys2[0] === "default") {
          const ret = slots.default ? slots.default() : [];
          return ret.reduce((slot, current) => {
            return [
              ...slot,
              // prettier-ignore
              ...current.type === vue.Fragment ? current.children : [current]
            ];
          }, []);
        } else {
          return keys2.reduce((arg, key) => {
            const slot = slots[key];
            if (slot) {
              arg[key] = slot();
            }
            return arg;
          }, {});
        }
      }
      function getFragmentableTag(tag) {
        return vue.Fragment;
      }
      const TranslationImpl = /* @__PURE__ */ vue.defineComponent({
        /* eslint-disable */
        name: "i18n-t",
        props: assign$1({
          keypath: {
            type: String,
            required: true
          },
          plural: {
            type: [Number, String],
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            validator: (val) => isNumber(val) || !isNaN(val)
          }
        }, baseFormatProps),
        /* eslint-enable */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setup(props, context) {
          const { slots, attrs } = context;
          const i18n2 = props.i18n || useI18n({
            useScope: props.scope,
            __useComponent: true
          });
          return () => {
            const keys2 = Object.keys(slots).filter((key) => key !== "_");
            const options = {};
            if (props.locale) {
              options.locale = props.locale;
            }
            if (props.plural !== void 0) {
              options.plural = isString$1(props.plural) ? +props.plural : props.plural;
            }
            const arg = getInterpolateArg(context, keys2);
            const children = i18n2[TranslateVNodeSymbol](props.keypath, arg, options);
            const assignedAttrs = assign$1({}, attrs);
            const tag = isString$1(props.tag) || isObject$3(props.tag) ? props.tag : getFragmentableTag();
            return vue.h(tag, assignedAttrs, children);
          };
        }
      });
      const Translation = TranslationImpl;
      function isVNode(target) {
        return isArray(target) && !isString$1(target[0]);
      }
      function renderFormatter(props, context, slotKeys, partFormatter) {
        const { slots, attrs } = context;
        return () => {
          const options = { part: true };
          let overrides = {};
          if (props.locale) {
            options.locale = props.locale;
          }
          if (isString$1(props.format)) {
            options.key = props.format;
          } else if (isObject$3(props.format)) {
            if (isString$1(props.format.key)) {
              options.key = props.format.key;
            }
            overrides = Object.keys(props.format).reduce((options2, prop) => {
              return slotKeys.includes(prop) ? assign$1({}, options2, { [prop]: props.format[prop] }) : options2;
            }, {});
          }
          const parts = partFormatter(...[props.value, options, overrides]);
          let children = [options.key];
          if (isArray(parts)) {
            children = parts.map((part, index) => {
              const slot = slots[part.type];
              const node = slot ? slot({ [part.type]: part.value, index, parts }) : [part.value];
              if (isVNode(node)) {
                node[0].key = `${part.type}-${index}`;
              }
              return node;
            });
          } else if (isString$1(parts)) {
            children = [parts];
          }
          const assignedAttrs = assign$1({}, attrs);
          const tag = isString$1(props.tag) || isObject$3(props.tag) ? props.tag : getFragmentableTag();
          return vue.h(tag, assignedAttrs, children);
        };
      }
      const NumberFormatImpl = /* @__PURE__ */ vue.defineComponent({
        /* eslint-disable */
        name: "i18n-n",
        props: assign$1({
          value: {
            type: Number,
            required: true
          },
          format: {
            type: [String, Object]
          }
        }, baseFormatProps),
        /* eslint-enable */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setup(props, context) {
          const i18n2 = props.i18n || useI18n({
            useScope: props.scope,
            __useComponent: true
          });
          return renderFormatter(props, context, NUMBER_FORMAT_OPTIONS_KEYS, (...args) => (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            i18n2[NumberPartsSymbol](...args)
          ));
        }
      });
      const NumberFormat = NumberFormatImpl;
      const DatetimeFormatImpl = /* @__PURE__ */ vue.defineComponent({
        /* eslint-disable */
        name: "i18n-d",
        props: assign$1({
          value: {
            type: [Number, Date],
            required: true
          },
          format: {
            type: [String, Object]
          }
        }, baseFormatProps),
        /* eslint-enable */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setup(props, context) {
          const i18n2 = props.i18n || useI18n({
            useScope: props.scope,
            __useComponent: true
          });
          return renderFormatter(props, context, DATETIME_FORMAT_OPTIONS_KEYS, (...args) => (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            i18n2[DatetimePartsSymbol](...args)
          ));
        }
      });
      const DatetimeFormat = DatetimeFormatImpl;
      function getComposer$2(i18n2, instance) {
        const i18nInternal = i18n2;
        if (i18n2.mode === "composition") {
          return i18nInternal.__getInstance(instance) || i18n2.global;
        } else {
          const vueI18n = i18nInternal.__getInstance(instance);
          return vueI18n != null ? vueI18n.__composer : i18n2.global.__composer;
        }
      }
      function vTDirective(i18n2) {
        const _process = (binding) => {
          const { instance, modifiers, value } = binding;
          if (!instance || !instance.$) {
            throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
          }
          const composer = getComposer$2(i18n2, instance.$);
          const parsedValue = parseValue(value);
          return [
            Reflect.apply(composer.t, composer, [...makeParams(parsedValue)]),
            composer
          ];
        };
        const register = (el, binding) => {
          const [textContent, composer] = _process(binding);
          if (inBrowser && i18n2.global === composer) {
            el.__i18nWatcher = vue.watch(composer.locale, () => {
              binding.instance && binding.instance.$forceUpdate();
            });
          }
          el.__composer = composer;
          el.textContent = textContent;
        };
        const unregister = (el) => {
          if (inBrowser && el.__i18nWatcher) {
            el.__i18nWatcher();
            el.__i18nWatcher = void 0;
            delete el.__i18nWatcher;
          }
          if (el.__composer) {
            el.__composer = void 0;
            delete el.__composer;
          }
        };
        const update = (el, { value }) => {
          if (el.__composer) {
            const composer = el.__composer;
            const parsedValue = parseValue(value);
            el.textContent = Reflect.apply(composer.t, composer, [
              ...makeParams(parsedValue)
            ]);
          }
        };
        const getSSRProps = (binding) => {
          const [textContent] = _process(binding);
          return { textContent };
        };
        return {
          created: register,
          unmounted: unregister,
          beforeUpdate: update,
          getSSRProps
        };
      }
      function parseValue(value) {
        if (isString$1(value)) {
          return { path: value };
        } else if (isPlainObject(value)) {
          if (!("path" in value)) {
            throw createI18nError(I18nErrorCodes.REQUIRED_VALUE, "path");
          }
          return value;
        } else {
          throw createI18nError(I18nErrorCodes.INVALID_VALUE);
        }
      }
      function makeParams(value) {
        const { path, locale, args, choice, plural } = value;
        const options = {};
        const named = args || {};
        if (isString$1(locale)) {
          options.locale = locale;
        }
        if (isNumber(choice)) {
          options.plural = choice;
        }
        if (isNumber(plural)) {
          options.plural = plural;
        }
        return [path, named, options];
      }
      function apply(app, i18n2, ...options) {
        const pluginOptions = isPlainObject(options[0]) ? options[0] : {};
        const useI18nComponentName = !!pluginOptions.useI18nComponentName;
        const globalInstall = isBoolean(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
        if (globalInstall) {
          [!useI18nComponentName ? Translation.name : "i18n", "I18nT"].forEach((name) => app.component(name, Translation));
          [NumberFormat.name, "I18nN"].forEach((name) => app.component(name, NumberFormat));
          [DatetimeFormat.name, "I18nD"].forEach((name) => app.component(name, DatetimeFormat));
        }
        {
          app.directive("t", vTDirective(i18n2));
        }
      }
      const I18nInjectionKey = /* @__PURE__ */ makeSymbol("global-vue-i18n");
      function createI18n(options = {}, VueI18nLegacy) {
        const __globalInjection = isBoolean(options.globalInjection) ? options.globalInjection : true;
        const __allowComposition = true;
        const __instances = /* @__PURE__ */ new Map();
        const [globalScope, __global] = createGlobal(options);
        const symbol = /* @__PURE__ */ makeSymbol("");
        function __getInstance(component) {
          return __instances.get(component) || null;
        }
        function __setInstance(component, instance) {
          __instances.set(component, instance);
        }
        function __deleteInstance(component) {
          __instances.delete(component);
        }
        {
          const i18n2 = {
            // mode
            get mode() {
              return "composition";
            },
            // allowComposition
            get allowComposition() {
              return __allowComposition;
            },
            // install plugin
            async install(app, ...options2) {
              app.__VUE_I18N_SYMBOL__ = symbol;
              app.provide(app.__VUE_I18N_SYMBOL__, i18n2);
              if (isPlainObject(options2[0])) {
                const opts = options2[0];
                i18n2.__composerExtend = opts.__composerExtend;
                i18n2.__vueI18nExtend = opts.__vueI18nExtend;
              }
              let globalReleaseHandler = null;
              if (__globalInjection) {
                globalReleaseHandler = injectGlobalFields(app, i18n2.global);
              }
              {
                apply(app, i18n2, ...options2);
              }
              const unmountApp = app.unmount;
              app.unmount = () => {
                globalReleaseHandler && globalReleaseHandler();
                i18n2.dispose();
                unmountApp();
              };
            },
            // global accessor
            get global() {
              return __global;
            },
            dispose() {
              globalScope.stop();
            },
            // @internal
            __instances,
            // @internal
            __getInstance,
            // @internal
            __setInstance,
            // @internal
            __deleteInstance
          };
          return i18n2;
        }
      }
      function useI18n(options = {}) {
        const instance = vue.getCurrentInstance();
        if (instance == null) {
          throw createI18nError(I18nErrorCodes.MUST_BE_CALL_SETUP_TOP);
        }
        if (!instance.isCE && instance.appContext.app != null && !instance.appContext.app.__VUE_I18N_SYMBOL__) {
          throw createI18nError(I18nErrorCodes.NOT_INSTALLED);
        }
        const i18n2 = getI18nInstance(instance);
        const gl = getGlobalComposer(i18n2);
        const componentOptions = getComponentOptions(instance);
        const scope = getScope(options, componentOptions);
        if (scope === "global") {
          adjustI18nResources(gl, options, componentOptions);
          return gl;
        }
        if (scope === "parent") {
          let composer2 = getComposer(i18n2, instance, options.__useComponent);
          if (composer2 == null) {
            composer2 = gl;
          }
          return composer2;
        }
        const i18nInternal = i18n2;
        let composer = i18nInternal.__getInstance(instance);
        if (composer == null) {
          const composerOptions = assign$1({}, options);
          if ("__i18n" in componentOptions) {
            composerOptions.__i18n = componentOptions.__i18n;
          }
          if (gl) {
            composerOptions.__root = gl;
          }
          composer = createComposer(composerOptions);
          if (i18nInternal.__composerExtend) {
            composer[DisposeSymbol] = i18nInternal.__composerExtend(composer);
          }
          setupLifeCycle(i18nInternal, instance, composer);
          i18nInternal.__setInstance(instance, composer);
        }
        return composer;
      }
      function createGlobal(options, legacyMode, VueI18nLegacy) {
        const scope = vue.effectScope();
        {
          const obj = scope.run(() => createComposer(options));
          if (obj == null) {
            throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
          }
          return [scope, obj];
        }
      }
      function getI18nInstance(instance) {
        {
          const i18n2 = vue.inject(!instance.isCE ? instance.appContext.app.__VUE_I18N_SYMBOL__ : I18nInjectionKey);
          if (!i18n2) {
            throw createI18nError(!instance.isCE ? I18nErrorCodes.UNEXPECTED_ERROR : I18nErrorCodes.NOT_INSTALLED_WITH_PROVIDE);
          }
          return i18n2;
        }
      }
      function getScope(options, componentOptions) {
        return isEmptyObject(options) ? "__i18n" in componentOptions ? "local" : "global" : !options.useScope ? "local" : options.useScope;
      }
      function getGlobalComposer(i18n2) {
        return i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
      }
      function getComposer(i18n2, target, useComponent = false) {
        let composer = null;
        const root2 = target.root;
        let current = getParentComponentInstance(target, useComponent);
        while (current != null) {
          const i18nInternal = i18n2;
          if (i18n2.mode === "composition") {
            composer = i18nInternal.__getInstance(current);
          }
          if (composer != null) {
            break;
          }
          if (root2 === current) {
            break;
          }
          current = current.parent;
        }
        return composer;
      }
      function getParentComponentInstance(target, useComponent = false) {
        if (target == null) {
          return null;
        }
        {
          return !useComponent ? target.parent : target.vnode.ctx || target.parent;
        }
      }
      function setupLifeCycle(i18n2, target, composer) {
        {
          vue.onMounted(() => {
          }, target);
          vue.onUnmounted(() => {
            const _composer = composer;
            i18n2.__deleteInstance(target);
            const dispose = _composer[DisposeSymbol];
            if (dispose) {
              dispose();
              delete _composer[DisposeSymbol];
            }
          }, target);
        }
      }
      const globalExportProps = [
        "locale",
        "fallbackLocale",
        "availableLocales"
      ];
      const globalExportMethods = ["t", "rt", "d", "n", "tm", "te"];
      function injectGlobalFields(app, composer) {
        const i18n2 = /* @__PURE__ */ Object.create(null);
        globalExportProps.forEach((prop) => {
          const desc = Object.getOwnPropertyDescriptor(composer, prop);
          if (!desc) {
            throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
          }
          const wrap2 = vue.isRef(desc.value) ? {
            get() {
              return desc.value.value;
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            set(val) {
              desc.value.value = val;
            }
          } : {
            get() {
              return desc.get && desc.get();
            }
          };
          Object.defineProperty(i18n2, prop, wrap2);
        });
        app.config.globalProperties.$i18n = i18n2;
        globalExportMethods.forEach((method) => {
          const desc = Object.getOwnPropertyDescriptor(composer, method);
          if (!desc || !desc.value) {
            throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
          }
          Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
        });
        const dispose = () => {
          delete app.config.globalProperties.$i18n;
          globalExportMethods.forEach((method) => {
            delete app.config.globalProperties[`$${method}`];
          });
        };
        return dispose;
      }
      {
        initFeatureFlags();
      }
      {
        registerMessageCompiler(compile);
      }
      registerMessageResolver(resolveValue);
      registerLocaleFallbacker(fallbackWithLocaleChain);
      if (__INTLIFY_PROD_DEVTOOLS__) {
        const target = getGlobalThis();
        target.__INTLIFY__ = true;
        setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
      }
      const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
        __name: "ConfirmPopup",
        emits: ["confirm"],
        setup(__props, { emit: __emit }) {
          const emit = __emit;
          const { t: t2 } = useI18n();
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createBlock(vue.unref(elementPlus.ElPopconfirm), {
              title: vue.unref(t2)("confirmPopup.title"),
              "confirm-button-text": vue.unref(t2)("confirmPopup.yes"),
              "cancel-button-text": vue.unref(t2)("confirmPopup.no"),
              placement: "top",
              onConfirm: _cache[0] || (_cache[0] = (...args) => emit("confirm", ...args))
            }, {
              reference: vue.withCtx(() => [
                vue.renderSlot(_ctx.$slots, "default")
              ]),
              _: 3
            }, 8, ["title", "confirm-button-text", "cancel-button-text"]);
          };
        }
      });
      var FileSaver_min = { exports: {} };
      (function(module2, exports2) {
        (function(a, b) {
          b();
        })(commonjsGlobal, function() {
          function b(a2, b2) {
            return "undefined" == typeof b2 ? b2 = { autoBom: false } : "object" != typeof b2 && (console.warn("Deprecated: Expected third argument to be a object"), b2 = { autoBom: !b2 }), b2.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a2.type) ? new Blob(["\uFEFF", a2], { type: a2.type }) : a2;
          }
          function c(a2, b2, c2) {
            var d2 = new XMLHttpRequest();
            d2.open("GET", a2), d2.responseType = "blob", d2.onload = function() {
              g(d2.response, b2, c2);
            }, d2.onerror = function() {
              console.error("could not download file");
            }, d2.send();
          }
          function d(a2) {
            var b2 = new XMLHttpRequest();
            b2.open("HEAD", a2, false);
            try {
              b2.send();
            } catch (a3) {
            }
            return 200 <= b2.status && 299 >= b2.status;
          }
          function e(a2) {
            try {
              a2.dispatchEvent(new MouseEvent("click"));
            } catch (c2) {
              var b2 = document.createEvent("MouseEvents");
              b2.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null), a2.dispatchEvent(b2);
            }
          }
          var f = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof commonjsGlobal && commonjsGlobal.global === commonjsGlobal ? commonjsGlobal : void 0, a = f.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), g = f.saveAs || ("object" != typeof window || window !== f ? function() {
          } : "download" in HTMLAnchorElement.prototype && !a ? function(b2, g2, h2) {
            var i = f.URL || f.webkitURL, j = document.createElement("a");
            g2 = g2 || b2.name || "download", j.download = g2, j.rel = "noopener", "string" == typeof b2 ? (j.href = b2, j.origin === location.origin ? e(j) : d(j.href) ? c(b2, g2, h2) : e(j, j.target = "_blank")) : (j.href = i.createObjectURL(b2), setTimeout(function() {
              i.revokeObjectURL(j.href);
            }, 4e4), setTimeout(function() {
              e(j);
            }, 0));
          } : "msSaveOrOpenBlob" in navigator ? function(f2, g2, h2) {
            if (g2 = g2 || f2.name || "download", "string" != typeof f2) navigator.msSaveOrOpenBlob(b(f2, h2), g2);
            else if (d(f2)) c(f2, g2, h2);
            else {
              var i = document.createElement("a");
              i.href = f2, i.target = "_blank", setTimeout(function() {
                e(i);
              });
            }
          } : function(b2, d2, e2, g2) {
            if (g2 = g2 || open("", "_blank"), g2 && (g2.document.title = g2.document.body.innerText = "downloading..."), "string" == typeof b2) return c(b2, d2, e2);
            var h2 = "application/octet-stream" === b2.type, i = /constructor/i.test(f.HTMLElement) || f.safari, j = /CriOS\/[\d]+/.test(navigator.userAgent);
            if ((j || h2 && i || a) && "undefined" != typeof FileReader) {
              var k = new FileReader();
              k.onloadend = function() {
                var a2 = k.result;
                a2 = j ? a2 : a2.replace(/^data:[^;]*;/, "data:attachment/file;"), g2 ? g2.location.href = a2 : location = a2, g2 = null;
              }, k.readAsDataURL(b2);
            } else {
              var l = f.URL || f.webkitURL, m = l.createObjectURL(b2);
              g2 ? g2.location = m : location.href = m, g2 = null, setTimeout(function() {
                l.revokeObjectURL(m);
              }, 4e4);
            }
          });
          f.saveAs = g.saveAs = g, module2.exports = g;
        });
      })(FileSaver_min);
      var FileSaver_minExports = FileSaver_min.exports;
      function commonjsRequire(path) {
        throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
      }
      var localforage$1 = { exports: {} };
      /*!
          localForage -- Offline Storage, Improved
          Version 1.10.0
          https://localforage.github.io/localForage
          (c) 2013-2017 Mozilla, Apache License 2.0
      */
      (function(module2, exports2) {
        (function(f) {
          {
            module2.exports = f();
          }
        })(function() {
          return function e(t2, n, r) {
            function s(o2, u) {
              if (!n[o2]) {
                if (!t2[o2]) {
                  var a = typeof commonjsRequire == "function" && commonjsRequire;
                  if (!u && a) return a(o2, true);
                  if (i) return i(o2, true);
                  var f = new Error("Cannot find module '" + o2 + "'");
                  throw f.code = "MODULE_NOT_FOUND", f;
                }
                var l = n[o2] = { exports: {} };
                t2[o2][0].call(l.exports, function(e2) {
                  var n2 = t2[o2][1][e2];
                  return s(n2 ? n2 : e2);
                }, l, l.exports, e, t2, n, r);
              }
              return n[o2].exports;
            }
            var i = typeof commonjsRequire == "function" && commonjsRequire;
            for (var o = 0; o < r.length; o++) s(r[o]);
            return s;
          }({ 1: [function(_dereq_, module3, exports3) {
            (function(global2) {
              var Mutation = global2.MutationObserver || global2.WebKitMutationObserver;
              var scheduleDrain;
              {
                if (Mutation) {
                  var called = 0;
                  var observer = new Mutation(nextTick2);
                  var element = global2.document.createTextNode("");
                  observer.observe(element, {
                    characterData: true
                  });
                  scheduleDrain = function() {
                    element.data = called = ++called % 2;
                  };
                } else if (!global2.setImmediate && typeof global2.MessageChannel !== "undefined") {
                  var channel = new global2.MessageChannel();
                  channel.port1.onmessage = nextTick2;
                  scheduleDrain = function() {
                    channel.port2.postMessage(0);
                  };
                } else if ("document" in global2 && "onreadystatechange" in global2.document.createElement("script")) {
                  scheduleDrain = function() {
                    var scriptEl = global2.document.createElement("script");
                    scriptEl.onreadystatechange = function() {
                      nextTick2();
                      scriptEl.onreadystatechange = null;
                      scriptEl.parentNode.removeChild(scriptEl);
                      scriptEl = null;
                    };
                    global2.document.documentElement.appendChild(scriptEl);
                  };
                } else {
                  scheduleDrain = function() {
                    setTimeout(nextTick2, 0);
                  };
                }
              }
              var draining;
              var queue = [];
              function nextTick2() {
                draining = true;
                var i, oldQueue;
                var len = queue.length;
                while (len) {
                  oldQueue = queue;
                  queue = [];
                  i = -1;
                  while (++i < len) {
                    oldQueue[i]();
                  }
                  len = queue.length;
                }
                draining = false;
              }
              module3.exports = immediate;
              function immediate(task) {
                if (queue.push(task) === 1 && !draining) {
                  scheduleDrain();
                }
              }
            }).call(this, typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
          }, {}], 2: [function(_dereq_, module3, exports3) {
            var immediate = _dereq_(1);
            function INTERNAL() {
            }
            var handlers2 = {};
            var REJECTED = ["REJECTED"];
            var FULFILLED = ["FULFILLED"];
            var PENDING = ["PENDING"];
            module3.exports = Promise2;
            function Promise2(resolver) {
              if (typeof resolver !== "function") {
                throw new TypeError("resolver must be a function");
              }
              this.state = PENDING;
              this.queue = [];
              this.outcome = void 0;
              if (resolver !== INTERNAL) {
                safelyResolveThenable(this, resolver);
              }
            }
            Promise2.prototype["catch"] = function(onRejected) {
              return this.then(null, onRejected);
            };
            Promise2.prototype.then = function(onFulfilled, onRejected) {
              if (typeof onFulfilled !== "function" && this.state === FULFILLED || typeof onRejected !== "function" && this.state === REJECTED) {
                return this;
              }
              var promise = new this.constructor(INTERNAL);
              if (this.state !== PENDING) {
                var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
                unwrap(promise, resolver, this.outcome);
              } else {
                this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
              }
              return promise;
            };
            function QueueItem(promise, onFulfilled, onRejected) {
              this.promise = promise;
              if (typeof onFulfilled === "function") {
                this.onFulfilled = onFulfilled;
                this.callFulfilled = this.otherCallFulfilled;
              }
              if (typeof onRejected === "function") {
                this.onRejected = onRejected;
                this.callRejected = this.otherCallRejected;
              }
            }
            QueueItem.prototype.callFulfilled = function(value) {
              handlers2.resolve(this.promise, value);
            };
            QueueItem.prototype.otherCallFulfilled = function(value) {
              unwrap(this.promise, this.onFulfilled, value);
            };
            QueueItem.prototype.callRejected = function(value) {
              handlers2.reject(this.promise, value);
            };
            QueueItem.prototype.otherCallRejected = function(value) {
              unwrap(this.promise, this.onRejected, value);
            };
            function unwrap(promise, func, value) {
              immediate(function() {
                var returnValue;
                try {
                  returnValue = func(value);
                } catch (e) {
                  return handlers2.reject(promise, e);
                }
                if (returnValue === promise) {
                  handlers2.reject(promise, new TypeError("Cannot resolve promise with itself"));
                } else {
                  handlers2.resolve(promise, returnValue);
                }
              });
            }
            handlers2.resolve = function(self2, value) {
              var result = tryCatch(getThen, value);
              if (result.status === "error") {
                return handlers2.reject(self2, result.value);
              }
              var thenable = result.value;
              if (thenable) {
                safelyResolveThenable(self2, thenable);
              } else {
                self2.state = FULFILLED;
                self2.outcome = value;
                var i = -1;
                var len = self2.queue.length;
                while (++i < len) {
                  self2.queue[i].callFulfilled(value);
                }
              }
              return self2;
            };
            handlers2.reject = function(self2, error) {
              self2.state = REJECTED;
              self2.outcome = error;
              var i = -1;
              var len = self2.queue.length;
              while (++i < len) {
                self2.queue[i].callRejected(error);
              }
              return self2;
            };
            function getThen(obj) {
              var then = obj && obj.then;
              if (obj && (typeof obj === "object" || typeof obj === "function") && typeof then === "function") {
                return function appyThen() {
                  then.apply(obj, arguments);
                };
              }
            }
            function safelyResolveThenable(self2, thenable) {
              var called = false;
              function onError(value) {
                if (called) {
                  return;
                }
                called = true;
                handlers2.reject(self2, value);
              }
              function onSuccess(value) {
                if (called) {
                  return;
                }
                called = true;
                handlers2.resolve(self2, value);
              }
              function tryToUnwrap() {
                thenable(onSuccess, onError);
              }
              var result = tryCatch(tryToUnwrap);
              if (result.status === "error") {
                onError(result.value);
              }
            }
            function tryCatch(func, value) {
              var out = {};
              try {
                out.value = func(value);
                out.status = "success";
              } catch (e) {
                out.status = "error";
                out.value = e;
              }
              return out;
            }
            Promise2.resolve = resolve;
            function resolve(value) {
              if (value instanceof this) {
                return value;
              }
              return handlers2.resolve(new this(INTERNAL), value);
            }
            Promise2.reject = reject;
            function reject(reason) {
              var promise = new this(INTERNAL);
              return handlers2.reject(promise, reason);
            }
            Promise2.all = all;
            function all(iterable) {
              var self2 = this;
              if (Object.prototype.toString.call(iterable) !== "[object Array]") {
                return this.reject(new TypeError("must be an array"));
              }
              var len = iterable.length;
              var called = false;
              if (!len) {
                return this.resolve([]);
              }
              var values2 = new Array(len);
              var resolved = 0;
              var i = -1;
              var promise = new this(INTERNAL);
              while (++i < len) {
                allResolver(iterable[i], i);
              }
              return promise;
              function allResolver(value, i2) {
                self2.resolve(value).then(resolveFromAll, function(error) {
                  if (!called) {
                    called = true;
                    handlers2.reject(promise, error);
                  }
                });
                function resolveFromAll(outValue) {
                  values2[i2] = outValue;
                  if (++resolved === len && !called) {
                    called = true;
                    handlers2.resolve(promise, values2);
                  }
                }
              }
            }
            Promise2.race = race;
            function race(iterable) {
              var self2 = this;
              if (Object.prototype.toString.call(iterable) !== "[object Array]") {
                return this.reject(new TypeError("must be an array"));
              }
              var len = iterable.length;
              var called = false;
              if (!len) {
                return this.resolve([]);
              }
              var i = -1;
              var promise = new this(INTERNAL);
              while (++i < len) {
                resolver(iterable[i]);
              }
              return promise;
              function resolver(value) {
                self2.resolve(value).then(function(response) {
                  if (!called) {
                    called = true;
                    handlers2.resolve(promise, response);
                  }
                }, function(error) {
                  if (!called) {
                    called = true;
                    handlers2.reject(promise, error);
                  }
                });
              }
            }
          }, { "1": 1 }], 3: [function(_dereq_, module3, exports3) {
            (function(global2) {
              if (typeof global2.Promise !== "function") {
                global2.Promise = _dereq_(2);
              }
            }).call(this, typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
          }, { "2": 2 }], 4: [function(_dereq_, module3, exports3) {
            var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
              return typeof obj;
            } : function(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }
            function getIDB() {
              try {
                if (typeof indexedDB !== "undefined") {
                  return indexedDB;
                }
                if (typeof webkitIndexedDB !== "undefined") {
                  return webkitIndexedDB;
                }
                if (typeof mozIndexedDB !== "undefined") {
                  return mozIndexedDB;
                }
                if (typeof OIndexedDB !== "undefined") {
                  return OIndexedDB;
                }
                if (typeof msIndexedDB !== "undefined") {
                  return msIndexedDB;
                }
              } catch (e) {
                return;
              }
            }
            var idb = getIDB();
            function isIndexedDBValid() {
              try {
                if (!idb || !idb.open) {
                  return false;
                }
                var isSafari = typeof openDatabase !== "undefined" && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);
                var hasFetch = typeof fetch === "function" && fetch.toString().indexOf("[native code") !== -1;
                return (!isSafari || hasFetch) && typeof indexedDB !== "undefined" && // some outdated implementations of IDB that appear on Samsung
                // and HTC Android devices <4.4 are missing IDBKeyRange
                // See: https://github.com/mozilla/localForage/issues/128
                // See: https://github.com/mozilla/localForage/issues/272
                typeof IDBKeyRange !== "undefined";
              } catch (e) {
                return false;
              }
            }
            function createBlob(parts, properties) {
              parts = parts || [];
              properties = properties || {};
              try {
                return new Blob(parts, properties);
              } catch (e) {
                if (e.name !== "TypeError") {
                  throw e;
                }
                var Builder = typeof BlobBuilder !== "undefined" ? BlobBuilder : typeof MSBlobBuilder !== "undefined" ? MSBlobBuilder : typeof MozBlobBuilder !== "undefined" ? MozBlobBuilder : WebKitBlobBuilder;
                var builder = new Builder();
                for (var i = 0; i < parts.length; i += 1) {
                  builder.append(parts[i]);
                }
                return builder.getBlob(properties.type);
              }
            }
            if (typeof Promise === "undefined") {
              _dereq_(3);
            }
            var Promise$12 = Promise;
            function executeCallback2(promise, callback) {
              if (callback) {
                promise.then(function(result) {
                  callback(null, result);
                }, function(error) {
                  callback(error);
                });
              }
            }
            function executeTwoCallbacks(promise, callback, errorCallback) {
              if (typeof callback === "function") {
                promise.then(callback);
              }
              if (typeof errorCallback === "function") {
                promise["catch"](errorCallback);
              }
            }
            function normalizeKey(key2) {
              if (typeof key2 !== "string") {
                console.warn(key2 + " used as a key, but it is not a string.");
                key2 = String(key2);
              }
              return key2;
            }
            function getCallback() {
              if (arguments.length && typeof arguments[arguments.length - 1] === "function") {
                return arguments[arguments.length - 1];
              }
            }
            var DETECT_BLOB_SUPPORT_STORE = "local-forage-detect-blob-support";
            var supportsBlobs = void 0;
            var dbContexts = {};
            var toString2 = Object.prototype.toString;
            var READ_ONLY = "readonly";
            var READ_WRITE = "readwrite";
            function _binStringToArrayBuffer(bin) {
              var length2 = bin.length;
              var buf = new ArrayBuffer(length2);
              var arr = new Uint8Array(buf);
              for (var i = 0; i < length2; i++) {
                arr[i] = bin.charCodeAt(i);
              }
              return buf;
            }
            function _checkBlobSupportWithoutCaching(idb2) {
              return new Promise$12(function(resolve) {
                var txn = idb2.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
                var blob2 = createBlob([""]);
                txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob2, "key");
                txn.onabort = function(e) {
                  e.preventDefault();
                  e.stopPropagation();
                  resolve(false);
                };
                txn.oncomplete = function() {
                  var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
                  var matchedEdge = navigator.userAgent.match(/Edge\//);
                  resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
                };
              })["catch"](function() {
                return false;
              });
            }
            function _checkBlobSupport(idb2) {
              if (typeof supportsBlobs === "boolean") {
                return Promise$12.resolve(supportsBlobs);
              }
              return _checkBlobSupportWithoutCaching(idb2).then(function(value) {
                supportsBlobs = value;
                return supportsBlobs;
              });
            }
            function _deferReadiness(dbInfo) {
              var dbContext = dbContexts[dbInfo.name];
              var deferredOperation = {};
              deferredOperation.promise = new Promise$12(function(resolve, reject) {
                deferredOperation.resolve = resolve;
                deferredOperation.reject = reject;
              });
              dbContext.deferredOperations.push(deferredOperation);
              if (!dbContext.dbReady) {
                dbContext.dbReady = deferredOperation.promise;
              } else {
                dbContext.dbReady = dbContext.dbReady.then(function() {
                  return deferredOperation.promise;
                });
              }
            }
            function _advanceReadiness(dbInfo) {
              var dbContext = dbContexts[dbInfo.name];
              var deferredOperation = dbContext.deferredOperations.pop();
              if (deferredOperation) {
                deferredOperation.resolve();
                return deferredOperation.promise;
              }
            }
            function _rejectReadiness(dbInfo, err) {
              var dbContext = dbContexts[dbInfo.name];
              var deferredOperation = dbContext.deferredOperations.pop();
              if (deferredOperation) {
                deferredOperation.reject(err);
                return deferredOperation.promise;
              }
            }
            function _getConnection(dbInfo, upgradeNeeded) {
              return new Promise$12(function(resolve, reject) {
                dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();
                if (dbInfo.db) {
                  if (upgradeNeeded) {
                    _deferReadiness(dbInfo);
                    dbInfo.db.close();
                  } else {
                    return resolve(dbInfo.db);
                  }
                }
                var dbArgs = [dbInfo.name];
                if (upgradeNeeded) {
                  dbArgs.push(dbInfo.version);
                }
                var openreq = idb.open.apply(idb, dbArgs);
                if (upgradeNeeded) {
                  openreq.onupgradeneeded = function(e) {
                    var db = openreq.result;
                    try {
                      db.createObjectStore(dbInfo.storeName);
                      if (e.oldVersion <= 1) {
                        db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                      }
                    } catch (ex) {
                      if (ex.name === "ConstraintError") {
                        console.warn('The database "' + dbInfo.name + '" has been upgraded from version ' + e.oldVersion + " to version " + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                      } else {
                        throw ex;
                      }
                    }
                  };
                }
                openreq.onerror = function(e) {
                  e.preventDefault();
                  reject(openreq.error);
                };
                openreq.onsuccess = function() {
                  var db = openreq.result;
                  db.onversionchange = function(e) {
                    e.target.close();
                  };
                  resolve(db);
                  _advanceReadiness(dbInfo);
                };
              });
            }
            function _getOriginalConnection(dbInfo) {
              return _getConnection(dbInfo, false);
            }
            function _getUpgradedConnection(dbInfo) {
              return _getConnection(dbInfo, true);
            }
            function _isUpgradeNeeded(dbInfo, defaultVersion) {
              if (!dbInfo.db) {
                return true;
              }
              var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
              var isDowngrade = dbInfo.version < dbInfo.db.version;
              var isUpgrade = dbInfo.version > dbInfo.db.version;
              if (isDowngrade) {
                if (dbInfo.version !== defaultVersion) {
                  console.warn('The database "' + dbInfo.name + `" can't be downgraded from version ` + dbInfo.db.version + " to version " + dbInfo.version + ".");
                }
                dbInfo.version = dbInfo.db.version;
              }
              if (isUpgrade || isNewStore) {
                if (isNewStore) {
                  var incVersion = dbInfo.db.version + 1;
                  if (incVersion > dbInfo.version) {
                    dbInfo.version = incVersion;
                  }
                }
                return true;
              }
              return false;
            }
            function _encodeBlob(blob2) {
              return new Promise$12(function(resolve, reject) {
                var reader = new FileReader();
                reader.onerror = reject;
                reader.onloadend = function(e) {
                  var base64 = btoa(e.target.result || "");
                  resolve({
                    __local_forage_encoded_blob: true,
                    data: base64,
                    type: blob2.type
                  });
                };
                reader.readAsBinaryString(blob2);
              });
            }
            function _decodeBlob(encodedBlob) {
              var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
              return createBlob([arrayBuff], { type: encodedBlob.type });
            }
            function _isEncodedBlob(value) {
              return value && value.__local_forage_encoded_blob;
            }
            function _fullyReady(callback) {
              var self2 = this;
              var promise = self2._initReady().then(function() {
                var dbContext = dbContexts[self2._dbInfo.name];
                if (dbContext && dbContext.dbReady) {
                  return dbContext.dbReady;
                }
              });
              executeTwoCallbacks(promise, callback, callback);
              return promise;
            }
            function _tryReconnect(dbInfo) {
              _deferReadiness(dbInfo);
              var dbContext = dbContexts[dbInfo.name];
              var forages = dbContext.forages;
              for (var i = 0; i < forages.length; i++) {
                var forage = forages[i];
                if (forage._dbInfo.db) {
                  forage._dbInfo.db.close();
                  forage._dbInfo.db = null;
                }
              }
              dbInfo.db = null;
              return _getOriginalConnection(dbInfo).then(function(db) {
                dbInfo.db = db;
                if (_isUpgradeNeeded(dbInfo)) {
                  return _getUpgradedConnection(dbInfo);
                }
                return db;
              }).then(function(db) {
                dbInfo.db = dbContext.db = db;
                for (var i2 = 0; i2 < forages.length; i2++) {
                  forages[i2]._dbInfo.db = db;
                }
              })["catch"](function(err) {
                _rejectReadiness(dbInfo, err);
                throw err;
              });
            }
            function createTransaction(dbInfo, mode, callback, retries) {
              if (retries === void 0) {
                retries = 1;
              }
              try {
                var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
                callback(null, tx);
              } catch (err) {
                if (retries > 0 && (!dbInfo.db || err.name === "InvalidStateError" || err.name === "NotFoundError")) {
                  return Promise$12.resolve().then(function() {
                    if (!dbInfo.db || err.name === "NotFoundError" && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
                      if (dbInfo.db) {
                        dbInfo.version = dbInfo.db.version + 1;
                      }
                      return _getUpgradedConnection(dbInfo);
                    }
                  }).then(function() {
                    return _tryReconnect(dbInfo).then(function() {
                      createTransaction(dbInfo, mode, callback, retries - 1);
                    });
                  })["catch"](callback);
                }
                callback(err);
              }
            }
            function createDbContext() {
              return {
                // Running localForages sharing a database.
                forages: [],
                // Shared database.
                db: null,
                // Database readiness (promise).
                dbReady: null,
                // Deferred operations on the database.
                deferredOperations: []
              };
            }
            function _initStorage(options) {
              var self2 = this;
              var dbInfo = {
                db: null
              };
              if (options) {
                for (var i in options) {
                  dbInfo[i] = options[i];
                }
              }
              var dbContext = dbContexts[dbInfo.name];
              if (!dbContext) {
                dbContext = createDbContext();
                dbContexts[dbInfo.name] = dbContext;
              }
              dbContext.forages.push(self2);
              if (!self2._initReady) {
                self2._initReady = self2.ready;
                self2.ready = _fullyReady;
              }
              var initPromises = [];
              function ignoreErrors() {
                return Promise$12.resolve();
              }
              for (var j = 0; j < dbContext.forages.length; j++) {
                var forage = dbContext.forages[j];
                if (forage !== self2) {
                  initPromises.push(forage._initReady()["catch"](ignoreErrors));
                }
              }
              var forages = dbContext.forages.slice(0);
              return Promise$12.all(initPromises).then(function() {
                dbInfo.db = dbContext.db;
                return _getOriginalConnection(dbInfo);
              }).then(function(db) {
                dbInfo.db = db;
                if (_isUpgradeNeeded(dbInfo, self2._defaultConfig.version)) {
                  return _getUpgradedConnection(dbInfo);
                }
                return db;
              }).then(function(db) {
                dbInfo.db = dbContext.db = db;
                self2._dbInfo = dbInfo;
                for (var k = 0; k < forages.length; k++) {
                  var forage2 = forages[k];
                  if (forage2 !== self2) {
                    forage2._dbInfo.db = dbInfo.db;
                    forage2._dbInfo.version = dbInfo.version;
                  }
                }
              });
            }
            function getItem(key2, callback) {
              var self2 = this;
              key2 = normalizeKey(key2);
              var promise = new Promise$12(function(resolve, reject) {
                self2.ready().then(function() {
                  createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                    if (err) {
                      return reject(err);
                    }
                    try {
                      var store = transaction.objectStore(self2._dbInfo.storeName);
                      var req = store.get(key2);
                      req.onsuccess = function() {
                        var value = req.result;
                        if (value === void 0) {
                          value = null;
                        }
                        if (_isEncodedBlob(value)) {
                          value = _decodeBlob(value);
                        }
                        resolve(value);
                      };
                      req.onerror = function() {
                        reject(req.error);
                      };
                    } catch (e) {
                      reject(e);
                    }
                  });
                })["catch"](reject);
              });
              executeCallback2(promise, callback);
              return promise;
            }
            function iterate(iterator, callback) {
              var self2 = this;
              var promise = new Promise$12(function(resolve, reject) {
                self2.ready().then(function() {
                  createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                    if (err) {
                      return reject(err);
                    }
                    try {
                      var store = transaction.objectStore(self2._dbInfo.storeName);
                      var req = store.openCursor();
                      var iterationNumber = 1;
                      req.onsuccess = function() {
                        var cursor = req.result;
                        if (cursor) {
                          var value = cursor.value;
                          if (_isEncodedBlob(value)) {
                            value = _decodeBlob(value);
                          }
                          var result = iterator(value, cursor.key, iterationNumber++);
                          if (result !== void 0) {
                            resolve(result);
                          } else {
                            cursor["continue"]();
                          }
                        } else {
                          resolve();
                        }
                      };
                      req.onerror = function() {
                        reject(req.error);
                      };
                    } catch (e) {
                      reject(e);
                    }
                  });
                })["catch"](reject);
              });
              executeCallback2(promise, callback);
              return promise;
            }
            function setItem(key2, value, callback) {
              var self2 = this;
              key2 = normalizeKey(key2);
              var promise = new Promise$12(function(resolve, reject) {
                var dbInfo;
                self2.ready().then(function() {
                  dbInfo = self2._dbInfo;
                  if (toString2.call(value) === "[object Blob]") {
                    return _checkBlobSupport(dbInfo.db).then(function(blobSupport) {
                      if (blobSupport) {
                        return value;
                      }
                      return _encodeBlob(value);
                    });
                  }
                  return value;
                }).then(function(value2) {
                  createTransaction(self2._dbInfo, READ_WRITE, function(err, transaction) {
                    if (err) {
                      return reject(err);
                    }
                    try {
                      var store = transaction.objectStore(self2._dbInfo.storeName);
                      if (value2 === null) {
                        value2 = void 0;
                      }
                      var req = store.put(value2, key2);
                      transaction.oncomplete = function() {
                        if (value2 === void 0) {
                          value2 = null;
                        }
                        resolve(value2);
                      };
                      transaction.onabort = transaction.onerror = function() {
                        var err2 = req.error ? req.error : req.transaction.error;
                        reject(err2);
                      };
                    } catch (e) {
                      reject(e);
                    }
                  });
                })["catch"](reject);
              });
              executeCallback2(promise, callback);
              return promise;
            }
            function removeItem(key2, callback) {
              var self2 = this;
              key2 = normalizeKey(key2);
              var promise = new Promise$12(function(resolve, reject) {
                self2.ready().then(function() {
                  createTransaction(self2._dbInfo, READ_WRITE, function(err, transaction) {
                    if (err) {
                      return reject(err);
                    }
                    try {
                      var store = transaction.objectStore(self2._dbInfo.storeName);
                      var req = store["delete"](key2);
                      transaction.oncomplete = function() {
                        resolve();
                      };
                      transaction.onerror = function() {
                        reject(req.error);
                      };
                      transaction.onabort = function() {
                        var err2 = req.error ? req.error : req.transaction.error;
                        reject(err2);
                      };
                    } catch (e) {
                      reject(e);
                    }
                  });
                })["catch"](reject);
              });
              executeCallback2(promise, callback);
              return promise;
            }
            function clear(callback) {
              var self2 = this;
              var promise = new Promise$12(function(resolve, reject) {
                self2.ready().then(function() {
                  createTransaction(self2._dbInfo, READ_WRITE, function(err, transaction) {
                    if (err) {
                      return reject(err);
                    }
                    try {
                      var store = transaction.objectStore(self2._dbInfo.storeName);
                      var req = store.clear();
                      transaction.oncomplete = function() {
                        resolve();
                      };
                      transaction.onabort = transaction.onerror = function() {
                        var err2 = req.error ? req.error : req.transaction.error;
                        reject(err2);
                      };
                    } catch (e) {
                      reject(e);
                    }
                  });
                })["catch"](reject);
              });
              executeCallback2(promise, callback);
              return promise;
            }
            function length(callback) {
              var self2 = this;
              var promise = new Promise$12(function(resolve, reject) {
                self2.ready().then(function() {
                  createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                    if (err) {
                      return reject(err);
                    }
                    try {
                      var store = transaction.objectStore(self2._dbInfo.storeName);
                      var req = store.count();
                      req.onsuccess = function() {
                        resolve(req.result);
                      };
                      req.onerror = function() {
                        reject(req.error);
                      };
                    } catch (e) {
                      reject(e);
                    }
                  });
                })["catch"](reject);
              });
              executeCallback2(promise, callback);
              return promise;
            }
            function key(n, callback) {
              var self2 = this;
              var promise = new Promise$12(function(resolve, reject) {
                if (n < 0) {
                  resolve(null);
                  return;
                }
                self2.ready().then(function() {
                  createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                    if (err) {
                      return reject(err);
                    }
                    try {
                      var store = transaction.objectStore(self2._dbInfo.storeName);
                      var advanced = false;
                      var req = store.openKeyCursor();
                      req.onsuccess = function() {
                        var cursor = req.result;
                        if (!cursor) {
                          resolve(null);
                          return;
                        }
                        if (n === 0) {
                          resolve(cursor.key);
                        } else {
                          if (!advanced) {
                            advanced = true;
                            cursor.advance(n);
                          } else {
                            resolve(cursor.key);
                          }
                        }
                      };
                      req.onerror = function() {
                        reject(req.error);
                      };
                    } catch (e) {
                      reject(e);
                    }
                  });
                })["catch"](reject);
              });
              executeCallback2(promise, callback);
              return promise;
            }
            function keys2(callback) {
              var self2 = this;
              var promise = new Promise$12(function(resolve, reject) {
                self2.ready().then(function() {
                  createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                    if (err) {
                      return reject(err);
                    }
                    try {
                      var store = transaction.objectStore(self2._dbInfo.storeName);
                      var req = store.openKeyCursor();
                      var keys3 = [];
                      req.onsuccess = function() {
                        var cursor = req.result;
                        if (!cursor) {
                          resolve(keys3);
                          return;
                        }
                        keys3.push(cursor.key);
                        cursor["continue"]();
                      };
                      req.onerror = function() {
                        reject(req.error);
                      };
                    } catch (e) {
                      reject(e);
                    }
                  });
                })["catch"](reject);
              });
              executeCallback2(promise, callback);
              return promise;
            }
            function dropInstance(options, callback) {
              callback = getCallback.apply(this, arguments);
              var currentConfig = this.config();
              options = typeof options !== "function" && options || {};
              if (!options.name) {
                options.name = options.name || currentConfig.name;
                options.storeName = options.storeName || currentConfig.storeName;
              }
              var self2 = this;
              var promise;
              if (!options.name) {
                promise = Promise$12.reject("Invalid arguments");
              } else {
                var isCurrentDb = options.name === currentConfig.name && self2._dbInfo.db;
                var dbPromise = isCurrentDb ? Promise$12.resolve(self2._dbInfo.db) : _getOriginalConnection(options).then(function(db) {
                  var dbContext = dbContexts[options.name];
                  var forages = dbContext.forages;
                  dbContext.db = db;
                  for (var i = 0; i < forages.length; i++) {
                    forages[i]._dbInfo.db = db;
                  }
                  return db;
                });
                if (!options.storeName) {
                  promise = dbPromise.then(function(db) {
                    _deferReadiness(options);
                    var dbContext = dbContexts[options.name];
                    var forages = dbContext.forages;
                    db.close();
                    for (var i = 0; i < forages.length; i++) {
                      var forage = forages[i];
                      forage._dbInfo.db = null;
                    }
                    var dropDBPromise = new Promise$12(function(resolve, reject) {
                      var req = idb.deleteDatabase(options.name);
                      req.onerror = function() {
                        var db2 = req.result;
                        if (db2) {
                          db2.close();
                        }
                        reject(req.error);
                      };
                      req.onblocked = function() {
                        console.warn('dropInstance blocked for database "' + options.name + '" until all open connections are closed');
                      };
                      req.onsuccess = function() {
                        var db2 = req.result;
                        if (db2) {
                          db2.close();
                        }
                        resolve(db2);
                      };
                    });
                    return dropDBPromise.then(function(db2) {
                      dbContext.db = db2;
                      for (var i2 = 0; i2 < forages.length; i2++) {
                        var _forage = forages[i2];
                        _advanceReadiness(_forage._dbInfo);
                      }
                    })["catch"](function(err) {
                      (_rejectReadiness(options, err) || Promise$12.resolve())["catch"](function() {
                      });
                      throw err;
                    });
                  });
                } else {
                  promise = dbPromise.then(function(db) {
                    if (!db.objectStoreNames.contains(options.storeName)) {
                      return;
                    }
                    var newVersion = db.version + 1;
                    _deferReadiness(options);
                    var dbContext = dbContexts[options.name];
                    var forages = dbContext.forages;
                    db.close();
                    for (var i = 0; i < forages.length; i++) {
                      var forage = forages[i];
                      forage._dbInfo.db = null;
                      forage._dbInfo.version = newVersion;
                    }
                    var dropObjectPromise = new Promise$12(function(resolve, reject) {
                      var req = idb.open(options.name, newVersion);
                      req.onerror = function(err) {
                        var db2 = req.result;
                        db2.close();
                        reject(err);
                      };
                      req.onupgradeneeded = function() {
                        var db2 = req.result;
                        db2.deleteObjectStore(options.storeName);
                      };
                      req.onsuccess = function() {
                        var db2 = req.result;
                        db2.close();
                        resolve(db2);
                      };
                    });
                    return dropObjectPromise.then(function(db2) {
                      dbContext.db = db2;
                      for (var j = 0; j < forages.length; j++) {
                        var _forage2 = forages[j];
                        _forage2._dbInfo.db = db2;
                        _advanceReadiness(_forage2._dbInfo);
                      }
                    })["catch"](function(err) {
                      (_rejectReadiness(options, err) || Promise$12.resolve())["catch"](function() {
                      });
                      throw err;
                    });
                  });
                }
              }
              executeCallback2(promise, callback);
              return promise;
            }
            var asyncStorage = {
              _driver: "asyncStorage",
              _initStorage,
              _support: isIndexedDBValid(),
              iterate,
              getItem,
              setItem,
              removeItem,
              clear,
              length,
              key,
              keys: keys2,
              dropInstance
            };
            function isWebSQLValid() {
              return typeof openDatabase === "function";
            }
            var BASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var BLOB_TYPE_PREFIX = "~~local_forage_type~";
            var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;
            var SERIALIZED_MARKER = "__lfsc__:";
            var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;
            var TYPE_ARRAYBUFFER = "arbf";
            var TYPE_BLOB = "blob";
            var TYPE_INT8ARRAY = "si08";
            var TYPE_UINT8ARRAY = "ui08";
            var TYPE_UINT8CLAMPEDARRAY = "uic8";
            var TYPE_INT16ARRAY = "si16";
            var TYPE_INT32ARRAY = "si32";
            var TYPE_UINT16ARRAY = "ur16";
            var TYPE_UINT32ARRAY = "ui32";
            var TYPE_FLOAT32ARRAY = "fl32";
            var TYPE_FLOAT64ARRAY = "fl64";
            var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;
            var toString$12 = Object.prototype.toString;
            function stringToBuffer(serializedString) {
              var bufferLength = serializedString.length * 0.75;
              var len = serializedString.length;
              var i;
              var p = 0;
              var encoded1, encoded2, encoded3, encoded4;
              if (serializedString[serializedString.length - 1] === "=") {
                bufferLength--;
                if (serializedString[serializedString.length - 2] === "=") {
                  bufferLength--;
                }
              }
              var buffer = new ArrayBuffer(bufferLength);
              var bytes = new Uint8Array(buffer);
              for (i = 0; i < len; i += 4) {
                encoded1 = BASE_CHARS.indexOf(serializedString[i]);
                encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
                encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
                encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);
                bytes[p++] = encoded1 << 2 | encoded2 >> 4;
                bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
                bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
              }
              return buffer;
            }
            function bufferToString(buffer) {
              var bytes = new Uint8Array(buffer);
              var base64String = "";
              var i;
              for (i = 0; i < bytes.length; i += 3) {
                base64String += BASE_CHARS[bytes[i] >> 2];
                base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
                base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
                base64String += BASE_CHARS[bytes[i + 2] & 63];
              }
              if (bytes.length % 3 === 2) {
                base64String = base64String.substring(0, base64String.length - 1) + "=";
              } else if (bytes.length % 3 === 1) {
                base64String = base64String.substring(0, base64String.length - 2) + "==";
              }
              return base64String;
            }
            function serialize(value, callback) {
              var valueType = "";
              if (value) {
                valueType = toString$12.call(value);
              }
              if (value && (valueType === "[object ArrayBuffer]" || value.buffer && toString$12.call(value.buffer) === "[object ArrayBuffer]")) {
                var buffer;
                var marker = SERIALIZED_MARKER;
                if (value instanceof ArrayBuffer) {
                  buffer = value;
                  marker += TYPE_ARRAYBUFFER;
                } else {
                  buffer = value.buffer;
                  if (valueType === "[object Int8Array]") {
                    marker += TYPE_INT8ARRAY;
                  } else if (valueType === "[object Uint8Array]") {
                    marker += TYPE_UINT8ARRAY;
                  } else if (valueType === "[object Uint8ClampedArray]") {
                    marker += TYPE_UINT8CLAMPEDARRAY;
                  } else if (valueType === "[object Int16Array]") {
                    marker += TYPE_INT16ARRAY;
                  } else if (valueType === "[object Uint16Array]") {
                    marker += TYPE_UINT16ARRAY;
                  } else if (valueType === "[object Int32Array]") {
                    marker += TYPE_INT32ARRAY;
                  } else if (valueType === "[object Uint32Array]") {
                    marker += TYPE_UINT32ARRAY;
                  } else if (valueType === "[object Float32Array]") {
                    marker += TYPE_FLOAT32ARRAY;
                  } else if (valueType === "[object Float64Array]") {
                    marker += TYPE_FLOAT64ARRAY;
                  } else {
                    callback(new Error("Failed to get type for BinaryArray"));
                  }
                }
                callback(marker + bufferToString(buffer));
              } else if (valueType === "[object Blob]") {
                var fileReader = new FileReader();
                fileReader.onload = function() {
                  var str = BLOB_TYPE_PREFIX + value.type + "~" + bufferToString(this.result);
                  callback(SERIALIZED_MARKER + TYPE_BLOB + str);
                };
                fileReader.readAsArrayBuffer(value);
              } else {
                try {
                  callback(JSON.stringify(value));
                } catch (e) {
                  console.error("Couldn't convert value into a JSON string: ", value);
                  callback(null, e);
                }
              }
            }
            function deserialize(value) {
              if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
                return JSON.parse(value);
              }
              var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
              var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);
              var blobType;
              if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
                var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
                blobType = matcher[1];
                serializedString = serializedString.substring(matcher[0].length);
              }
              var buffer = stringToBuffer(serializedString);
              switch (type) {
                case TYPE_ARRAYBUFFER:
                  return buffer;
                case TYPE_BLOB:
                  return createBlob([buffer], { type: blobType });
                case TYPE_INT8ARRAY:
                  return new Int8Array(buffer);
                case TYPE_UINT8ARRAY:
                  return new Uint8Array(buffer);
                case TYPE_UINT8CLAMPEDARRAY:
                  return new Uint8ClampedArray(buffer);
                case TYPE_INT16ARRAY:
                  return new Int16Array(buffer);
                case TYPE_UINT16ARRAY:
                  return new Uint16Array(buffer);
                case TYPE_INT32ARRAY:
                  return new Int32Array(buffer);
                case TYPE_UINT32ARRAY:
                  return new Uint32Array(buffer);
                case TYPE_FLOAT32ARRAY:
                  return new Float32Array(buffer);
                case TYPE_FLOAT64ARRAY:
                  return new Float64Array(buffer);
                default:
                  throw new Error("Unkown type: " + type);
              }
            }
            var localforageSerializer = {
              serialize,
              deserialize,
              stringToBuffer,
              bufferToString
            };
            function createDbTable(t2, dbInfo, callback, errorCallback) {
              t2.executeSql("CREATE TABLE IF NOT EXISTS " + dbInfo.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], callback, errorCallback);
            }
            function _initStorage$1(options) {
              var self2 = this;
              var dbInfo = {
                db: null
              };
              if (options) {
                for (var i in options) {
                  dbInfo[i] = typeof options[i] !== "string" ? options[i].toString() : options[i];
                }
              }
              var dbInfoPromise = new Promise$12(function(resolve, reject) {
                try {
                  dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
                } catch (e) {
                  return reject(e);
                }
                dbInfo.db.transaction(function(t2) {
                  createDbTable(t2, dbInfo, function() {
                    self2._dbInfo = dbInfo;
                    resolve();
                  }, function(t3, error) {
                    reject(error);
                  });
                }, reject);
              });
              dbInfo.serializer = localforageSerializer;
              return dbInfoPromise;
            }
            function tryExecuteSql(t2, dbInfo, sqlStatement, args, callback, errorCallback) {
              t2.executeSql(sqlStatement, args, callback, function(t3, error) {
                if (error.code === error.SYNTAX_ERR) {
                  t3.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [dbInfo.storeName], function(t4, results) {
                    if (!results.rows.length) {
                      createDbTable(t4, dbInfo, function() {
                        t4.executeSql(sqlStatement, args, callback, errorCallback);
                      }, errorCallback);
                    } else {
                      errorCallback(t4, error);
                    }
                  }, errorCallback);
                } else {
                  errorCallback(t3, error);
                }
              }, errorCallback);
            }
            function getItem$1(key2, callback) {
              var self2 = this;
              key2 = normalizeKey(key2);
              var promise = new Promise$12(function(resolve, reject) {
                self2.ready().then(function() {
                  var dbInfo = self2._dbInfo;
                  dbInfo.db.transaction(function(t2) {
                    tryExecuteSql(t2, dbInfo, "SELECT * FROM " + dbInfo.storeName + " WHERE key = ? LIMIT 1", [key2], function(t3, results) {
                      var result = results.rows.length ? results.rows.item(0).value : null;
                      if (result) {
                        result = dbInfo.serializer.deserialize(result);
                      }
                      resolve(result);
                    }, function(t3, error) {
                      reject(error);
                    });
                  });
                })["catch"](reject);
              });
              executeCallback2(promise, callback);
              return promise;
            }
            function iterate$1(iterator, callback) {
              var self2 = this;
              var promise = new Promise$12(function(resolve, reject) {
                self2.ready().then(function() {
                  var dbInfo = self2._dbInfo;
                  dbInfo.db.transaction(function(t2) {
                    tryExecuteSql(t2, dbInfo, "SELECT * FROM " + dbInfo.storeName, [], function(t3, results) {
                      var rows = results.rows;
                      var length2 = rows.length;
                      for (var i = 0; i < length2; i++) {
                        var item = rows.item(i);
                        var result = item.value;
                        if (result) {
                          result = dbInfo.serializer.deserialize(result);
                        }
                        result = iterator(result, item.key, i + 1);
                        if (result !== void 0) {
                          resolve(result);
                          return;
                        }
                      }
                      resolve();
                    }, function(t3, error) {
                      reject(error);
                    });
                  });
                })["catch"](reject);
              });
              executeCallback2(promise, callback);
              return promise;
            }
            function _setItem(key2, value, callback, retriesLeft) {
              var self2 = this;
              key2 = normalizeKey(key2);
              var promise = new Promise$12(function(resolve, reject) {
                self2.ready().then(function() {
                  if (value === void 0) {
                    value = null;
                  }
                  var originalValue = value;
                  var dbInfo = self2._dbInfo;
                  dbInfo.serializer.serialize(value, function(value2, error) {
                    if (error) {
                      reject(error);
                    } else {
                      dbInfo.db.transaction(function(t2) {
                        tryExecuteSql(t2, dbInfo, "INSERT OR REPLACE INTO " + dbInfo.storeName + " (key, value) VALUES (?, ?)", [key2, value2], function() {
                          resolve(originalValue);
                        }, function(t3, error2) {
                          reject(error2);
                        });
                      }, function(sqlError) {
                        if (sqlError.code === sqlError.QUOTA_ERR) {
                          if (retriesLeft > 0) {
                            resolve(_setItem.apply(self2, [key2, originalValue, callback, retriesLeft - 1]));
                            return;
                          }
                          reject(sqlError);
                        }
                      });
                    }
                  });
                })["catch"](reject);
              });
              executeCallback2(promise, callback);
              return promise;
            }
            function setItem$1(key2, value, callback) {
              return _setItem.apply(this, [key2, value, callback, 1]);
            }
            function removeItem$1(key2, callback) {
              var self2 = this;
              key2 = normalizeKey(key2);
              var promise = new Promise$12(function(resolve, reject) {
                self2.ready().then(function() {
                  var dbInfo = self2._dbInfo;
                  dbInfo.db.transaction(function(t2) {
                    tryExecuteSql(t2, dbInfo, "DELETE FROM " + dbInfo.storeName + " WHERE key = ?", [key2], function() {
                      resolve();
                    }, function(t3, error) {
                      reject(error);
                    });
                  });
                })["catch"](reject);
              });
              executeCallback2(promise, callback);
              return promise;
            }
            function clear$1(callback) {
              var self2 = this;
              var promise = new Promise$12(function(resolve, reject) {
                self2.ready().then(function() {
                  var dbInfo = self2._dbInfo;
                  dbInfo.db.transaction(function(t2) {
                    tryExecuteSql(t2, dbInfo, "DELETE FROM " + dbInfo.storeName, [], function() {
                      resolve();
                    }, function(t3, error) {
                      reject(error);
                    });
                  });
                })["catch"](reject);
              });
              executeCallback2(promise, callback);
              return promise;
            }
            function length$1(callback) {
              var self2 = this;
              var promise = new Promise$12(function(resolve, reject) {
                self2.ready().then(function() {
                  var dbInfo = self2._dbInfo;
                  dbInfo.db.transaction(function(t2) {
                    tryExecuteSql(t2, dbInfo, "SELECT COUNT(key) as c FROM " + dbInfo.storeName, [], function(t3, results) {
                      var result = results.rows.item(0).c;
                      resolve(result);
                    }, function(t3, error) {
                      reject(error);
                    });
                  });
                })["catch"](reject);
              });
              executeCallback2(promise, callback);
              return promise;
            }
            function key$1(n, callback) {
              var self2 = this;
              var promise = new Promise$12(function(resolve, reject) {
                self2.ready().then(function() {
                  var dbInfo = self2._dbInfo;
                  dbInfo.db.transaction(function(t2) {
                    tryExecuteSql(t2, dbInfo, "SELECT key FROM " + dbInfo.storeName + " WHERE id = ? LIMIT 1", [n + 1], function(t3, results) {
                      var result = results.rows.length ? results.rows.item(0).key : null;
                      resolve(result);
                    }, function(t3, error) {
                      reject(error);
                    });
                  });
                })["catch"](reject);
              });
              executeCallback2(promise, callback);
              return promise;
            }
            function keys$1(callback) {
              var self2 = this;
              var promise = new Promise$12(function(resolve, reject) {
                self2.ready().then(function() {
                  var dbInfo = self2._dbInfo;
                  dbInfo.db.transaction(function(t2) {
                    tryExecuteSql(t2, dbInfo, "SELECT key FROM " + dbInfo.storeName, [], function(t3, results) {
                      var keys3 = [];
                      for (var i = 0; i < results.rows.length; i++) {
                        keys3.push(results.rows.item(i).key);
                      }
                      resolve(keys3);
                    }, function(t3, error) {
                      reject(error);
                    });
                  });
                })["catch"](reject);
              });
              executeCallback2(promise, callback);
              return promise;
            }
            function getAllStoreNames(db) {
              return new Promise$12(function(resolve, reject) {
                db.transaction(function(t2) {
                  t2.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function(t3, results) {
                    var storeNames = [];
                    for (var i = 0; i < results.rows.length; i++) {
                      storeNames.push(results.rows.item(i).name);
                    }
                    resolve({
                      db,
                      storeNames
                    });
                  }, function(t3, error) {
                    reject(error);
                  });
                }, function(sqlError) {
                  reject(sqlError);
                });
              });
            }
            function dropInstance$1(options, callback) {
              callback = getCallback.apply(this, arguments);
              var currentConfig = this.config();
              options = typeof options !== "function" && options || {};
              if (!options.name) {
                options.name = options.name || currentConfig.name;
                options.storeName = options.storeName || currentConfig.storeName;
              }
              var self2 = this;
              var promise;
              if (!options.name) {
                promise = Promise$12.reject("Invalid arguments");
              } else {
                promise = new Promise$12(function(resolve) {
                  var db;
                  if (options.name === currentConfig.name) {
                    db = self2._dbInfo.db;
                  } else {
                    db = openDatabase(options.name, "", "", 0);
                  }
                  if (!options.storeName) {
                    resolve(getAllStoreNames(db));
                  } else {
                    resolve({
                      db,
                      storeNames: [options.storeName]
                    });
                  }
                }).then(function(operationInfo) {
                  return new Promise$12(function(resolve, reject) {
                    operationInfo.db.transaction(function(t2) {
                      function dropTable(storeName) {
                        return new Promise$12(function(resolve2, reject2) {
                          t2.executeSql("DROP TABLE IF EXISTS " + storeName, [], function() {
                            resolve2();
                          }, function(t3, error) {
                            reject2(error);
                          });
                        });
                      }
                      var operations = [];
                      for (var i = 0, len = operationInfo.storeNames.length; i < len; i++) {
                        operations.push(dropTable(operationInfo.storeNames[i]));
                      }
                      Promise$12.all(operations).then(function() {
                        resolve();
                      })["catch"](function(e) {
                        reject(e);
                      });
                    }, function(sqlError) {
                      reject(sqlError);
                    });
                  });
                });
              }
              executeCallback2(promise, callback);
              return promise;
            }
            var webSQLStorage = {
              _driver: "webSQLStorage",
              _initStorage: _initStorage$1,
              _support: isWebSQLValid(),
              iterate: iterate$1,
              getItem: getItem$1,
              setItem: setItem$1,
              removeItem: removeItem$1,
              clear: clear$1,
              length: length$1,
              key: key$1,
              keys: keys$1,
              dropInstance: dropInstance$1
            };
            function isLocalStorageValid() {
              try {
                return typeof localStorage !== "undefined" && "setItem" in localStorage && // in IE8 typeof localStorage.setItem === 'object'
                !!localStorage.setItem;
              } catch (e) {
                return false;
              }
            }
            function _getKeyPrefix(options, defaultConfig) {
              var keyPrefix = options.name + "/";
              if (options.storeName !== defaultConfig.storeName) {
                keyPrefix += options.storeName + "/";
              }
              return keyPrefix;
            }
            function checkIfLocalStorageThrows() {
              var localStorageTestKey = "_localforage_support_test";
              try {
                localStorage.setItem(localStorageTestKey, true);
                localStorage.removeItem(localStorageTestKey);
                return false;
              } catch (e) {
                return true;
              }
            }
            function _isLocalStorageUsable() {
              return !checkIfLocalStorageThrows() || localStorage.length > 0;
            }
            function _initStorage$2(options) {
              var self2 = this;
              var dbInfo = {};
              if (options) {
                for (var i in options) {
                  dbInfo[i] = options[i];
                }
              }
              dbInfo.keyPrefix = _getKeyPrefix(options, self2._defaultConfig);
              if (!_isLocalStorageUsable()) {
                return Promise$12.reject();
              }
              self2._dbInfo = dbInfo;
              dbInfo.serializer = localforageSerializer;
              return Promise$12.resolve();
            }
            function clear$2(callback) {
              var self2 = this;
              var promise = self2.ready().then(function() {
                var keyPrefix = self2._dbInfo.keyPrefix;
                for (var i = localStorage.length - 1; i >= 0; i--) {
                  var key2 = localStorage.key(i);
                  if (key2.indexOf(keyPrefix) === 0) {
                    localStorage.removeItem(key2);
                  }
                }
              });
              executeCallback2(promise, callback);
              return promise;
            }
            function getItem$2(key2, callback) {
              var self2 = this;
              key2 = normalizeKey(key2);
              var promise = self2.ready().then(function() {
                var dbInfo = self2._dbInfo;
                var result = localStorage.getItem(dbInfo.keyPrefix + key2);
                if (result) {
                  result = dbInfo.serializer.deserialize(result);
                }
                return result;
              });
              executeCallback2(promise, callback);
              return promise;
            }
            function iterate$2(iterator, callback) {
              var self2 = this;
              var promise = self2.ready().then(function() {
                var dbInfo = self2._dbInfo;
                var keyPrefix = dbInfo.keyPrefix;
                var keyPrefixLength = keyPrefix.length;
                var length2 = localStorage.length;
                var iterationNumber = 1;
                for (var i = 0; i < length2; i++) {
                  var key2 = localStorage.key(i);
                  if (key2.indexOf(keyPrefix) !== 0) {
                    continue;
                  }
                  var value = localStorage.getItem(key2);
                  if (value) {
                    value = dbInfo.serializer.deserialize(value);
                  }
                  value = iterator(value, key2.substring(keyPrefixLength), iterationNumber++);
                  if (value !== void 0) {
                    return value;
                  }
                }
              });
              executeCallback2(promise, callback);
              return promise;
            }
            function key$2(n, callback) {
              var self2 = this;
              var promise = self2.ready().then(function() {
                var dbInfo = self2._dbInfo;
                var result;
                try {
                  result = localStorage.key(n);
                } catch (error) {
                  result = null;
                }
                if (result) {
                  result = result.substring(dbInfo.keyPrefix.length);
                }
                return result;
              });
              executeCallback2(promise, callback);
              return promise;
            }
            function keys$2(callback) {
              var self2 = this;
              var promise = self2.ready().then(function() {
                var dbInfo = self2._dbInfo;
                var length2 = localStorage.length;
                var keys3 = [];
                for (var i = 0; i < length2; i++) {
                  var itemKey = localStorage.key(i);
                  if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
                    keys3.push(itemKey.substring(dbInfo.keyPrefix.length));
                  }
                }
                return keys3;
              });
              executeCallback2(promise, callback);
              return promise;
            }
            function length$2(callback) {
              var self2 = this;
              var promise = self2.keys().then(function(keys3) {
                return keys3.length;
              });
              executeCallback2(promise, callback);
              return promise;
            }
            function removeItem$2(key2, callback) {
              var self2 = this;
              key2 = normalizeKey(key2);
              var promise = self2.ready().then(function() {
                var dbInfo = self2._dbInfo;
                localStorage.removeItem(dbInfo.keyPrefix + key2);
              });
              executeCallback2(promise, callback);
              return promise;
            }
            function setItem$2(key2, value, callback) {
              var self2 = this;
              key2 = normalizeKey(key2);
              var promise = self2.ready().then(function() {
                if (value === void 0) {
                  value = null;
                }
                var originalValue = value;
                return new Promise$12(function(resolve, reject) {
                  var dbInfo = self2._dbInfo;
                  dbInfo.serializer.serialize(value, function(value2, error) {
                    if (error) {
                      reject(error);
                    } else {
                      try {
                        localStorage.setItem(dbInfo.keyPrefix + key2, value2);
                        resolve(originalValue);
                      } catch (e) {
                        if (e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED") {
                          reject(e);
                        }
                        reject(e);
                      }
                    }
                  });
                });
              });
              executeCallback2(promise, callback);
              return promise;
            }
            function dropInstance$2(options, callback) {
              callback = getCallback.apply(this, arguments);
              options = typeof options !== "function" && options || {};
              if (!options.name) {
                var currentConfig = this.config();
                options.name = options.name || currentConfig.name;
                options.storeName = options.storeName || currentConfig.storeName;
              }
              var self2 = this;
              var promise;
              if (!options.name) {
                promise = Promise$12.reject("Invalid arguments");
              } else {
                promise = new Promise$12(function(resolve) {
                  if (!options.storeName) {
                    resolve(options.name + "/");
                  } else {
                    resolve(_getKeyPrefix(options, self2._defaultConfig));
                  }
                }).then(function(keyPrefix) {
                  for (var i = localStorage.length - 1; i >= 0; i--) {
                    var key2 = localStorage.key(i);
                    if (key2.indexOf(keyPrefix) === 0) {
                      localStorage.removeItem(key2);
                    }
                  }
                });
              }
              executeCallback2(promise, callback);
              return promise;
            }
            var localStorageWrapper = {
              _driver: "localStorageWrapper",
              _initStorage: _initStorage$2,
              _support: isLocalStorageValid(),
              iterate: iterate$2,
              getItem: getItem$2,
              setItem: setItem$2,
              removeItem: removeItem$2,
              clear: clear$2,
              length: length$2,
              key: key$2,
              keys: keys$2,
              dropInstance: dropInstance$2
            };
            var sameValue = function sameValue2(x, y) {
              return x === y || typeof x === "number" && typeof y === "number" && isNaN(x) && isNaN(y);
            };
            var includes = function includes2(array, searchElement) {
              var len = array.length;
              var i = 0;
              while (i < len) {
                if (sameValue(array[i], searchElement)) {
                  return true;
                }
                i++;
              }
              return false;
            };
            var isArray2 = Array.isArray || function(arg) {
              return Object.prototype.toString.call(arg) === "[object Array]";
            };
            var DefinedDrivers = {};
            var DriverSupport = {};
            var DefaultDrivers = {
              INDEXEDDB: asyncStorage,
              WEBSQL: webSQLStorage,
              LOCALSTORAGE: localStorageWrapper
            };
            var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];
            var OptionalDriverMethods = ["dropInstance"];
            var LibraryMethods = ["clear", "getItem", "iterate", "key", "keys", "length", "removeItem", "setItem"].concat(OptionalDriverMethods);
            var DefaultConfig = {
              description: "",
              driver: DefaultDriverOrder.slice(),
              name: "localforage",
              // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
              // we can use without a prompt.
              size: 4980736,
              storeName: "keyvaluepairs",
              version: 1
            };
            function callWhenReady(localForageInstance, libraryMethod) {
              localForageInstance[libraryMethod] = function() {
                var _args = arguments;
                return localForageInstance.ready().then(function() {
                  return localForageInstance[libraryMethod].apply(localForageInstance, _args);
                });
              };
            }
            function extend() {
              for (var i = 1; i < arguments.length; i++) {
                var arg = arguments[i];
                if (arg) {
                  for (var _key in arg) {
                    if (arg.hasOwnProperty(_key)) {
                      if (isArray2(arg[_key])) {
                        arguments[0][_key] = arg[_key].slice();
                      } else {
                        arguments[0][_key] = arg[_key];
                      }
                    }
                  }
                }
              }
              return arguments[0];
            }
            var LocalForage = function() {
              function LocalForage2(options) {
                _classCallCheck(this, LocalForage2);
                for (var driverTypeKey in DefaultDrivers) {
                  if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                    var driver = DefaultDrivers[driverTypeKey];
                    var driverName = driver._driver;
                    this[driverTypeKey] = driverName;
                    if (!DefinedDrivers[driverName]) {
                      this.defineDriver(driver);
                    }
                  }
                }
                this._defaultConfig = extend({}, DefaultConfig);
                this._config = extend({}, this._defaultConfig, options);
                this._driverSet = null;
                this._initDriver = null;
                this._ready = false;
                this._dbInfo = null;
                this._wrapLibraryMethodsWithReady();
                this.setDriver(this._config.driver)["catch"](function() {
                });
              }
              LocalForage2.prototype.config = function config(options) {
                if ((typeof options === "undefined" ? "undefined" : _typeof(options)) === "object") {
                  if (this._ready) {
                    return new Error("Can't call config() after localforage has been used.");
                  }
                  for (var i in options) {
                    if (i === "storeName") {
                      options[i] = options[i].replace(/\W/g, "_");
                    }
                    if (i === "version" && typeof options[i] !== "number") {
                      return new Error("Database version must be a number.");
                    }
                    this._config[i] = options[i];
                  }
                  if ("driver" in options && options.driver) {
                    return this.setDriver(this._config.driver);
                  }
                  return true;
                } else if (typeof options === "string") {
                  return this._config[options];
                } else {
                  return this._config;
                }
              };
              LocalForage2.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
                var promise = new Promise$12(function(resolve, reject) {
                  try {
                    var driverName = driverObject._driver;
                    var complianceError = new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");
                    if (!driverObject._driver) {
                      reject(complianceError);
                      return;
                    }
                    var driverMethods = LibraryMethods.concat("_initStorage");
                    for (var i = 0, len = driverMethods.length; i < len; i++) {
                      var driverMethodName = driverMethods[i];
                      var isRequired = !includes(OptionalDriverMethods, driverMethodName);
                      if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== "function") {
                        reject(complianceError);
                        return;
                      }
                    }
                    var configureMissingMethods = function configureMissingMethods2() {
                      var methodNotImplementedFactory = function methodNotImplementedFactory2(methodName) {
                        return function() {
                          var error = new Error("Method " + methodName + " is not implemented by the current driver");
                          var promise2 = Promise$12.reject(error);
                          executeCallback2(promise2, arguments[arguments.length - 1]);
                          return promise2;
                        };
                      };
                      for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
                        var optionalDriverMethod = OptionalDriverMethods[_i];
                        if (!driverObject[optionalDriverMethod]) {
                          driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
                        }
                      }
                    };
                    configureMissingMethods();
                    var setDriverSupport = function setDriverSupport2(support) {
                      if (DefinedDrivers[driverName]) {
                        console.info("Redefining LocalForage driver: " + driverName);
                      }
                      DefinedDrivers[driverName] = driverObject;
                      DriverSupport[driverName] = support;
                      resolve();
                    };
                    if ("_support" in driverObject) {
                      if (driverObject._support && typeof driverObject._support === "function") {
                        driverObject._support().then(setDriverSupport, reject);
                      } else {
                        setDriverSupport(!!driverObject._support);
                      }
                    } else {
                      setDriverSupport(true);
                    }
                  } catch (e) {
                    reject(e);
                  }
                });
                executeTwoCallbacks(promise, callback, errorCallback);
                return promise;
              };
              LocalForage2.prototype.driver = function driver() {
                return this._driver || null;
              };
              LocalForage2.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
                var getDriverPromise = DefinedDrivers[driverName] ? Promise$12.resolve(DefinedDrivers[driverName]) : Promise$12.reject(new Error("Driver not found."));
                executeTwoCallbacks(getDriverPromise, callback, errorCallback);
                return getDriverPromise;
              };
              LocalForage2.prototype.getSerializer = function getSerializer(callback) {
                var serializerPromise = Promise$12.resolve(localforageSerializer);
                executeTwoCallbacks(serializerPromise, callback);
                return serializerPromise;
              };
              LocalForage2.prototype.ready = function ready(callback) {
                var self2 = this;
                var promise = self2._driverSet.then(function() {
                  if (self2._ready === null) {
                    self2._ready = self2._initDriver();
                  }
                  return self2._ready;
                });
                executeTwoCallbacks(promise, callback, callback);
                return promise;
              };
              LocalForage2.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
                var self2 = this;
                if (!isArray2(drivers)) {
                  drivers = [drivers];
                }
                var supportedDrivers = this._getSupportedDrivers(drivers);
                function setDriverToConfig() {
                  self2._config.driver = self2.driver();
                }
                function extendSelfWithDriver(driver) {
                  self2._extend(driver);
                  setDriverToConfig();
                  self2._ready = self2._initStorage(self2._config);
                  return self2._ready;
                }
                function initDriver(supportedDrivers2) {
                  return function() {
                    var currentDriverIndex = 0;
                    function driverPromiseLoop() {
                      while (currentDriverIndex < supportedDrivers2.length) {
                        var driverName = supportedDrivers2[currentDriverIndex];
                        currentDriverIndex++;
                        self2._dbInfo = null;
                        self2._ready = null;
                        return self2.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                      }
                      setDriverToConfig();
                      var error = new Error("No available storage method found.");
                      self2._driverSet = Promise$12.reject(error);
                      return self2._driverSet;
                    }
                    return driverPromiseLoop();
                  };
                }
                var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function() {
                  return Promise$12.resolve();
                }) : Promise$12.resolve();
                this._driverSet = oldDriverSetDone.then(function() {
                  var driverName = supportedDrivers[0];
                  self2._dbInfo = null;
                  self2._ready = null;
                  return self2.getDriver(driverName).then(function(driver) {
                    self2._driver = driver._driver;
                    setDriverToConfig();
                    self2._wrapLibraryMethodsWithReady();
                    self2._initDriver = initDriver(supportedDrivers);
                  });
                })["catch"](function() {
                  setDriverToConfig();
                  var error = new Error("No available storage method found.");
                  self2._driverSet = Promise$12.reject(error);
                  return self2._driverSet;
                });
                executeTwoCallbacks(this._driverSet, callback, errorCallback);
                return this._driverSet;
              };
              LocalForage2.prototype.supports = function supports(driverName) {
                return !!DriverSupport[driverName];
              };
              LocalForage2.prototype._extend = function _extend(libraryMethodsAndProperties) {
                extend(this, libraryMethodsAndProperties);
              };
              LocalForage2.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
                var supportedDrivers = [];
                for (var i = 0, len = drivers.length; i < len; i++) {
                  var driverName = drivers[i];
                  if (this.supports(driverName)) {
                    supportedDrivers.push(driverName);
                  }
                }
                return supportedDrivers;
              };
              LocalForage2.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
                for (var i = 0, len = LibraryMethods.length; i < len; i++) {
                  callWhenReady(this, LibraryMethods[i]);
                }
              };
              LocalForage2.prototype.createInstance = function createInstance(options) {
                return new LocalForage2(options);
              };
              return LocalForage2;
            }();
            var localforage_js = new LocalForage();
            module3.exports = localforage_js;
          }, { "3": 3 }] }, {}, [4])(4);
        });
      })(localforage$1);
      var localforageExports = localforage$1.exports;
      const localforage = /* @__PURE__ */ getDefaultExportFromCjs(localforageExports);
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
          for (var i = 0, len = items.length; i < len; i++) {
            var item = items[i];
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
              function(t2) {
                var query = "INSERT OR REPLACE INTO " + dbInfo.storeName + " (key, value) VALUES (?, ?)";
                var itemPromises = forEachItem(items, keyFn, valueFn, function(key, value) {
                  return new Promise(function(resolve2, reject2) {
                    serializer.serialize(value, function(value2, error) {
                      if (error) {
                        reject2(error);
                      } else {
                        t2.executeSql(query, [key, value2], function() {
                          resolve2();
                        }, function(t3, error2) {
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
              /*, function() {
                 if (resolving) {
                     resolve(items);
                 }
              }*/
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
      extendPrototype(localforage);
      var md5$1 = { exports: {} };
      var crypt = { exports: {} };
      (function() {
        var base64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", crypt$1 = {
          // Bit-wise rotation left
          rotl: function(n, b) {
            return n << b | n >>> 32 - b;
          },
          // Bit-wise rotation right
          rotr: function(n, b) {
            return n << 32 - b | n >>> b;
          },
          // Swap big-endian to little-endian and vice versa
          endian: function(n) {
            if (n.constructor == Number) {
              return crypt$1.rotl(n, 8) & 16711935 | crypt$1.rotl(n, 24) & 4278255360;
            }
            for (var i = 0; i < n.length; i++)
              n[i] = crypt$1.endian(n[i]);
            return n;
          },
          // Generate an array of any length of random bytes
          randomBytes: function(n) {
            for (var bytes = []; n > 0; n--)
              bytes.push(Math.floor(Math.random() * 256));
            return bytes;
          },
          // Convert a byte array to big-endian 32-bit words
          bytesToWords: function(bytes) {
            for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
              words[b >>> 5] |= bytes[i] << 24 - b % 32;
            return words;
          },
          // Convert big-endian 32-bit words to a byte array
          wordsToBytes: function(words) {
            for (var bytes = [], b = 0; b < words.length * 32; b += 8)
              bytes.push(words[b >>> 5] >>> 24 - b % 32 & 255);
            return bytes;
          },
          // Convert a byte array to a hex string
          bytesToHex: function(bytes) {
            for (var hex = [], i = 0; i < bytes.length; i++) {
              hex.push((bytes[i] >>> 4).toString(16));
              hex.push((bytes[i] & 15).toString(16));
            }
            return hex.join("");
          },
          // Convert a hex string to a byte array
          hexToBytes: function(hex) {
            for (var bytes = [], c = 0; c < hex.length; c += 2)
              bytes.push(parseInt(hex.substr(c, 2), 16));
            return bytes;
          },
          // Convert a byte array to a base-64 string
          bytesToBase64: function(bytes) {
            for (var base64 = [], i = 0; i < bytes.length; i += 3) {
              var triplet = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];
              for (var j = 0; j < 4; j++)
                if (i * 8 + j * 6 <= bytes.length * 8)
                  base64.push(base64map.charAt(triplet >>> 6 * (3 - j) & 63));
                else
                  base64.push("=");
            }
            return base64.join("");
          },
          // Convert a base-64 string to a byte array
          base64ToBytes: function(base64) {
            base64 = base64.replace(/[^A-Z0-9+\/]/ig, "");
            for (var bytes = [], i = 0, imod4 = 0; i < base64.length; imod4 = ++i % 4) {
              if (imod4 == 0) continue;
              bytes.push((base64map.indexOf(base64.charAt(i - 1)) & Math.pow(2, -2 * imod4 + 8) - 1) << imod4 * 2 | base64map.indexOf(base64.charAt(i)) >>> 6 - imod4 * 2);
            }
            return bytes;
          }
        };
        crypt.exports = crypt$1;
      })();
      var cryptExports = crypt.exports;
      var charenc = {
        // UTF-8 encoding
        utf8: {
          // Convert a string to a byte array
          stringToBytes: function(str) {
            return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
          },
          // Convert a byte array to a string
          bytesToString: function(bytes) {
            return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
          }
        },
        // Binary encoding
        bin: {
          // Convert a string to a byte array
          stringToBytes: function(str) {
            for (var bytes = [], i = 0; i < str.length; i++)
              bytes.push(str.charCodeAt(i) & 255);
            return bytes;
          },
          // Convert a byte array to a string
          bytesToString: function(bytes) {
            for (var str = [], i = 0; i < bytes.length; i++)
              str.push(String.fromCharCode(bytes[i]));
            return str.join("");
          }
        }
      };
      var charenc_1 = charenc;
      /*!
       * Determine if an object is a Buffer
       *
       * @author   Feross Aboukhadijeh <https://feross.org>
       * @license  MIT
       */
      var isBuffer_1 = function(obj) {
        return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
      };
      function isBuffer(obj) {
        return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
      }
      function isSlowBuffer(obj) {
        return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isBuffer(obj.slice(0, 0));
      }
      (function() {
        var crypt2 = cryptExports, utf8 = charenc_1.utf8, isBuffer2 = isBuffer_1, bin = charenc_1.bin, md52 = function(message, options) {
          if (message.constructor == String)
            if (options && options.encoding === "binary")
              message = bin.stringToBytes(message);
            else
              message = utf8.stringToBytes(message);
          else if (isBuffer2(message))
            message = Array.prototype.slice.call(message, 0);
          else if (!Array.isArray(message) && message.constructor !== Uint8Array)
            message = message.toString();
          var m = crypt2.bytesToWords(message), l = message.length * 8, a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
          for (var i = 0; i < m.length; i++) {
            m[i] = (m[i] << 8 | m[i] >>> 24) & 16711935 | (m[i] << 24 | m[i] >>> 8) & 4278255360;
          }
          m[l >>> 5] |= 128 << l % 32;
          m[(l + 64 >>> 9 << 4) + 14] = l;
          var FF = md52._ff, GG = md52._gg, HH = md52._hh, II = md52._ii;
          for (var i = 0; i < m.length; i += 16) {
            var aa = a, bb = b, cc = c, dd = d;
            a = FF(a, b, c, d, m[i + 0], 7, -680876936);
            d = FF(d, a, b, c, m[i + 1], 12, -389564586);
            c = FF(c, d, a, b, m[i + 2], 17, 606105819);
            b = FF(b, c, d, a, m[i + 3], 22, -1044525330);
            a = FF(a, b, c, d, m[i + 4], 7, -176418897);
            d = FF(d, a, b, c, m[i + 5], 12, 1200080426);
            c = FF(c, d, a, b, m[i + 6], 17, -1473231341);
            b = FF(b, c, d, a, m[i + 7], 22, -45705983);
            a = FF(a, b, c, d, m[i + 8], 7, 1770035416);
            d = FF(d, a, b, c, m[i + 9], 12, -1958414417);
            c = FF(c, d, a, b, m[i + 10], 17, -42063);
            b = FF(b, c, d, a, m[i + 11], 22, -1990404162);
            a = FF(a, b, c, d, m[i + 12], 7, 1804603682);
            d = FF(d, a, b, c, m[i + 13], 12, -40341101);
            c = FF(c, d, a, b, m[i + 14], 17, -1502002290);
            b = FF(b, c, d, a, m[i + 15], 22, 1236535329);
            a = GG(a, b, c, d, m[i + 1], 5, -165796510);
            d = GG(d, a, b, c, m[i + 6], 9, -1069501632);
            c = GG(c, d, a, b, m[i + 11], 14, 643717713);
            b = GG(b, c, d, a, m[i + 0], 20, -373897302);
            a = GG(a, b, c, d, m[i + 5], 5, -701558691);
            d = GG(d, a, b, c, m[i + 10], 9, 38016083);
            c = GG(c, d, a, b, m[i + 15], 14, -660478335);
            b = GG(b, c, d, a, m[i + 4], 20, -405537848);
            a = GG(a, b, c, d, m[i + 9], 5, 568446438);
            d = GG(d, a, b, c, m[i + 14], 9, -1019803690);
            c = GG(c, d, a, b, m[i + 3], 14, -187363961);
            b = GG(b, c, d, a, m[i + 8], 20, 1163531501);
            a = GG(a, b, c, d, m[i + 13], 5, -1444681467);
            d = GG(d, a, b, c, m[i + 2], 9, -51403784);
            c = GG(c, d, a, b, m[i + 7], 14, 1735328473);
            b = GG(b, c, d, a, m[i + 12], 20, -1926607734);
            a = HH(a, b, c, d, m[i + 5], 4, -378558);
            d = HH(d, a, b, c, m[i + 8], 11, -2022574463);
            c = HH(c, d, a, b, m[i + 11], 16, 1839030562);
            b = HH(b, c, d, a, m[i + 14], 23, -35309556);
            a = HH(a, b, c, d, m[i + 1], 4, -1530992060);
            d = HH(d, a, b, c, m[i + 4], 11, 1272893353);
            c = HH(c, d, a, b, m[i + 7], 16, -155497632);
            b = HH(b, c, d, a, m[i + 10], 23, -1094730640);
            a = HH(a, b, c, d, m[i + 13], 4, 681279174);
            d = HH(d, a, b, c, m[i + 0], 11, -358537222);
            c = HH(c, d, a, b, m[i + 3], 16, -722521979);
            b = HH(b, c, d, a, m[i + 6], 23, 76029189);
            a = HH(a, b, c, d, m[i + 9], 4, -640364487);
            d = HH(d, a, b, c, m[i + 12], 11, -421815835);
            c = HH(c, d, a, b, m[i + 15], 16, 530742520);
            b = HH(b, c, d, a, m[i + 2], 23, -995338651);
            a = II(a, b, c, d, m[i + 0], 6, -198630844);
            d = II(d, a, b, c, m[i + 7], 10, 1126891415);
            c = II(c, d, a, b, m[i + 14], 15, -1416354905);
            b = II(b, c, d, a, m[i + 5], 21, -57434055);
            a = II(a, b, c, d, m[i + 12], 6, 1700485571);
            d = II(d, a, b, c, m[i + 3], 10, -1894986606);
            c = II(c, d, a, b, m[i + 10], 15, -1051523);
            b = II(b, c, d, a, m[i + 1], 21, -2054922799);
            a = II(a, b, c, d, m[i + 8], 6, 1873313359);
            d = II(d, a, b, c, m[i + 15], 10, -30611744);
            c = II(c, d, a, b, m[i + 6], 15, -1560198380);
            b = II(b, c, d, a, m[i + 13], 21, 1309151649);
            a = II(a, b, c, d, m[i + 4], 6, -145523070);
            d = II(d, a, b, c, m[i + 11], 10, -1120210379);
            c = II(c, d, a, b, m[i + 2], 15, 718787259);
            b = II(b, c, d, a, m[i + 9], 21, -343485551);
            a = a + aa >>> 0;
            b = b + bb >>> 0;
            c = c + cc >>> 0;
            d = d + dd >>> 0;
          }
          return crypt2.endian([a, b, c, d]);
        };
        md52._ff = function(a, b, c, d, x, s, t2) {
          var n = a + (b & c | ~b & d) + (x >>> 0) + t2;
          return (n << s | n >>> 32 - s) + b;
        };
        md52._gg = function(a, b, c, d, x, s, t2) {
          var n = a + (b & d | c & ~d) + (x >>> 0) + t2;
          return (n << s | n >>> 32 - s) + b;
        };
        md52._hh = function(a, b, c, d, x, s, t2) {
          var n = a + (b ^ c ^ d) + (x >>> 0) + t2;
          return (n << s | n >>> 32 - s) + b;
        };
        md52._ii = function(a, b, c, d, x, s, t2) {
          var n = a + (c ^ (b | ~d)) + (x >>> 0) + t2;
          return (n << s | n >>> 32 - s) + b;
        };
        md52._blocksize = 16;
        md52._digestsize = 16;
        md5$1.exports = function(message, options) {
          if (message === void 0 || message === null)
            throw new Error("Illegal argument " + message);
          var digestbytes = crypt2.wordsToBytes(md52(message, options));
          return options && options.asBytes ? digestbytes : options && options.asString ? bin.bytesToString(digestbytes) : crypt2.bytesToHex(digestbytes);
        };
      })();
      var md5Exports = md5$1.exports;
      const md5 = /* @__PURE__ */ getDefaultExportFromCjs(md5Exports);
      const dateTimeFormatter = new Intl.DateTimeFormat(void 0, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      });
      const removeIllegalFilenameChars = (name) => name.replace(/[/\\:*?"<>|]/g, "");
      (function detectScriptRel() {
        const relList = typeof document !== "undefined" && document.createElement("link").relList;
        return relList && relList.supports && relList.supports("modulepreload") ? "modulepreload" : "preload";
      })();
      /**
       * @license
       * Copyright 2019 Google LLC
       * SPDX-License-Identifier: Apache-2.0
       */
      const proxyMarker = Symbol("Comlink.proxy");
      const createEndpoint = Symbol("Comlink.endpoint");
      const releaseProxy = Symbol("Comlink.releaseProxy");
      const finalizer = Symbol("Comlink.finalizer");
      const throwMarker = Symbol("Comlink.thrown");
      const isObject$1 = (val) => typeof val === "object" && val !== null || typeof val === "function";
      const proxyTransferHandler = {
        canHandle: (val) => isObject$1(val) && val[proxyMarker],
        serialize(obj) {
          const { port1, port2 } = new MessageChannel();
          expose(obj, port1);
          return [port2, [port2]];
        },
        deserialize(port) {
          port.start();
          return wrap(port);
        }
      };
      const throwTransferHandler = {
        canHandle: (value) => isObject$1(value) && throwMarker in value,
        serialize({ value }) {
          let serialized;
          if (value instanceof Error) {
            serialized = {
              isError: true,
              value: {
                message: value.message,
                name: value.name,
                stack: value.stack
              }
            };
          } else {
            serialized = { isError: false, value };
          }
          return [serialized, []];
        },
        deserialize(serialized) {
          if (serialized.isError) {
            throw Object.assign(new Error(serialized.value.message), serialized.value);
          }
          throw serialized.value;
        }
      };
      const transferHandlers = /* @__PURE__ */ new Map([
        ["proxy", proxyTransferHandler],
        ["throw", throwTransferHandler]
      ]);
      function isAllowedOrigin(allowedOrigins, origin) {
        for (const allowedOrigin of allowedOrigins) {
          if (origin === allowedOrigin || allowedOrigin === "*") {
            return true;
          }
          if (allowedOrigin instanceof RegExp && allowedOrigin.test(origin)) {
            return true;
          }
        }
        return false;
      }
      function expose(obj, ep = globalThis, allowedOrigins = ["*"]) {
        ep.addEventListener("message", function callback(ev) {
          if (!ev || !ev.data) {
            return;
          }
          if (!isAllowedOrigin(allowedOrigins, ev.origin)) {
            console.warn(`Invalid origin '${ev.origin}' for comlink proxy`);
            return;
          }
          const { id, type, path } = Object.assign({ path: [] }, ev.data);
          const argumentList = (ev.data.argumentList || []).map(fromWireValue);
          let returnValue;
          try {
            const parent = path.slice(0, -1).reduce((obj2, prop) => obj2[prop], obj);
            const rawValue = path.reduce((obj2, prop) => obj2[prop], obj);
            switch (type) {
              case "GET":
                {
                  returnValue = rawValue;
                }
                break;
              case "SET":
                {
                  parent[path.slice(-1)[0]] = fromWireValue(ev.data.value);
                  returnValue = true;
                }
                break;
              case "APPLY":
                {
                  returnValue = rawValue.apply(parent, argumentList);
                }
                break;
              case "CONSTRUCT":
                {
                  const value = new rawValue(...argumentList);
                  returnValue = proxy(value);
                }
                break;
              case "ENDPOINT":
                {
                  const { port1, port2 } = new MessageChannel();
                  expose(obj, port2);
                  returnValue = transfer(port1, [port1]);
                }
                break;
              case "RELEASE":
                {
                  returnValue = void 0;
                }
                break;
              default:
                return;
            }
          } catch (value) {
            returnValue = { value, [throwMarker]: 0 };
          }
          Promise.resolve(returnValue).catch((value) => {
            return { value, [throwMarker]: 0 };
          }).then((returnValue2) => {
            const [wireValue, transferables] = toWireValue(returnValue2);
            ep.postMessage(Object.assign(Object.assign({}, wireValue), { id }), transferables);
            if (type === "RELEASE") {
              ep.removeEventListener("message", callback);
              closeEndPoint(ep);
              if (finalizer in obj && typeof obj[finalizer] === "function") {
                obj[finalizer]();
              }
            }
          }).catch((error) => {
            const [wireValue, transferables] = toWireValue({
              value: new TypeError("Unserializable return value"),
              [throwMarker]: 0
            });
            ep.postMessage(Object.assign(Object.assign({}, wireValue), { id }), transferables);
          });
        });
        if (ep.start) {
          ep.start();
        }
      }
      function isMessagePort(endpoint) {
        return endpoint.constructor.name === "MessagePort";
      }
      function closeEndPoint(endpoint) {
        if (isMessagePort(endpoint))
          endpoint.close();
      }
      function wrap(ep, target) {
        return createProxy(ep, [], target);
      }
      function throwIfProxyReleased(isReleased) {
        if (isReleased) {
          throw new Error("Proxy has been released and is not useable");
        }
      }
      function releaseEndpoint(ep) {
        return requestResponseMessage(ep, {
          type: "RELEASE"
        }).then(() => {
          closeEndPoint(ep);
        });
      }
      const proxyCounter = /* @__PURE__ */ new WeakMap();
      const proxyFinalizers = "FinalizationRegistry" in globalThis && new FinalizationRegistry((ep) => {
        const newCount = (proxyCounter.get(ep) || 0) - 1;
        proxyCounter.set(ep, newCount);
        if (newCount === 0) {
          releaseEndpoint(ep);
        }
      });
      function registerProxy(proxy2, ep) {
        const newCount = (proxyCounter.get(ep) || 0) + 1;
        proxyCounter.set(ep, newCount);
        if (proxyFinalizers) {
          proxyFinalizers.register(proxy2, ep, proxy2);
        }
      }
      function unregisterProxy(proxy2) {
        if (proxyFinalizers) {
          proxyFinalizers.unregister(proxy2);
        }
      }
      function createProxy(ep, path = [], target = function() {
      }) {
        let isProxyReleased = false;
        const proxy2 = new Proxy(target, {
          get(_target, prop) {
            throwIfProxyReleased(isProxyReleased);
            if (prop === releaseProxy) {
              return () => {
                unregisterProxy(proxy2);
                releaseEndpoint(ep);
                isProxyReleased = true;
              };
            }
            if (prop === "then") {
              if (path.length === 0) {
                return { then: () => proxy2 };
              }
              const r = requestResponseMessage(ep, {
                type: "GET",
                path: path.map((p) => p.toString())
              }).then(fromWireValue);
              return r.then.bind(r);
            }
            return createProxy(ep, [...path, prop]);
          },
          set(_target, prop, rawValue) {
            throwIfProxyReleased(isProxyReleased);
            const [value, transferables] = toWireValue(rawValue);
            return requestResponseMessage(ep, {
              type: "SET",
              path: [...path, prop].map((p) => p.toString()),
              value
            }, transferables).then(fromWireValue);
          },
          apply(_target, _thisArg, rawArgumentList) {
            throwIfProxyReleased(isProxyReleased);
            const last2 = path[path.length - 1];
            if (last2 === createEndpoint) {
              return requestResponseMessage(ep, {
                type: "ENDPOINT"
              }).then(fromWireValue);
            }
            if (last2 === "bind") {
              return createProxy(ep, path.slice(0, -1));
            }
            const [argumentList, transferables] = processArguments(rawArgumentList);
            return requestResponseMessage(ep, {
              type: "APPLY",
              path: path.map((p) => p.toString()),
              argumentList
            }, transferables).then(fromWireValue);
          },
          construct(_target, rawArgumentList) {
            throwIfProxyReleased(isProxyReleased);
            const [argumentList, transferables] = processArguments(rawArgumentList);
            return requestResponseMessage(ep, {
              type: "CONSTRUCT",
              path: path.map((p) => p.toString()),
              argumentList
            }, transferables).then(fromWireValue);
          }
        });
        registerProxy(proxy2, ep);
        return proxy2;
      }
      function myFlat(arr) {
        return Array.prototype.concat.apply([], arr);
      }
      function processArguments(argumentList) {
        const processed = argumentList.map(toWireValue);
        return [processed.map((v) => v[0]), myFlat(processed.map((v) => v[1]))];
      }
      const transferCache = /* @__PURE__ */ new WeakMap();
      function transfer(obj, transfers) {
        transferCache.set(obj, transfers);
        return obj;
      }
      function proxy(obj) {
        return Object.assign(obj, { [proxyMarker]: true });
      }
      function toWireValue(value) {
        for (const [name, handler] of transferHandlers) {
          if (handler.canHandle(value)) {
            const [serializedValue, transferables] = handler.serialize(value);
            return [
              {
                type: "HANDLER",
                name,
                value: serializedValue
              },
              transferables
            ];
          }
        }
        return [
          {
            type: "RAW",
            value
          },
          transferCache.get(value) || []
        ];
      }
      function fromWireValue(value) {
        switch (value.type) {
          case "HANDLER":
            return transferHandlers.get(value.name).deserialize(value.value);
          case "RAW":
            return value.value;
        }
      }
      function requestResponseMessage(ep, msg, transfers) {
        return new Promise((resolve) => {
          const id = generateUUID();
          ep.addEventListener("message", function l(ev) {
            if (!ev.data || !ev.data.id || ev.data.id !== id) {
              return;
            }
            ep.removeEventListener("message", l);
            resolve(ev.data);
          });
          if (ep.start) {
            ep.start();
          }
          ep.postMessage(Object.assign({ id }, msg), transfers);
        });
      }
      function generateUUID() {
        return new Array(4).fill(0).map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)).join("-");
      }
      const encodedJs$1 = "dmFyIF9fZGVmUHJvcCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTsKdmFyIF9fZGVmTm9ybWFsUHJvcCA9IChvYmosIGtleSwgdmFsdWUpID0+IGtleSBpbiBvYmogPyBfX2RlZlByb3Aob2JqLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSwgdmFsdWUgfSkgOiBvYmpba2V5XSA9IHZhbHVlOwp2YXIgX19wdWJsaWNGaWVsZCA9IChvYmosIGtleSwgdmFsdWUpID0+IF9fZGVmTm9ybWFsUHJvcChvYmosIHR5cGVvZiBrZXkgIT09ICJzeW1ib2wiID8ga2V5ICsgIiIgOiBrZXksIHZhbHVlKTsKKGZ1bmN0aW9uKCkgewogICJ1c2Ugc3RyaWN0IjsKICB2YXIgY29tbW9uanNHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gInVuZGVmaW5lZCIgPyBnbG9iYWxUaGlzIDogdHlwZW9mIHdpbmRvdyAhPT0gInVuZGVmaW5lZCIgPyB3aW5kb3cgOiB0eXBlb2YgZ2xvYmFsICE9PSAidW5kZWZpbmVkIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSAidW5kZWZpbmVkIiA/IHNlbGYgOiB7fTsKICBmdW5jdGlvbiBnZXREZWZhdWx0RXhwb3J0RnJvbUNqcyh4KSB7CiAgICByZXR1cm4geCAmJiB4Ll9fZXNNb2R1bGUgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHgsICJkZWZhdWx0IikgPyB4WyJkZWZhdWx0Il0gOiB4OwogIH0KICBmdW5jdGlvbiBjb21tb25qc1JlcXVpcmUocGF0aCkgewogICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZHluYW1pY2FsbHkgcmVxdWlyZSAiJyArIHBhdGggKyAnIi4gUGxlYXNlIGNvbmZpZ3VyZSB0aGUgZHluYW1pY1JlcXVpcmVUYXJnZXRzIG9yL2FuZCBpZ25vcmVEeW5hbWljUmVxdWlyZXMgb3B0aW9uIG9mIEByb2xsdXAvcGx1Z2luLWNvbW1vbmpzIGFwcHJvcHJpYXRlbHkgZm9yIHRoaXMgcmVxdWlyZSBjYWxsIHRvIHdvcmsuJyk7CiAgfQogIHZhciBqc3ppcF9taW4gPSB7IGV4cG9ydHM6IHt9IH07CiAgLyohCiAgCiAgCUpTWmlwIHYzLjEwLjEgLSBBIEphdmFTY3JpcHQgY2xhc3MgZm9yIGdlbmVyYXRpbmcgYW5kIHJlYWRpbmcgemlwIGZpbGVzCiAgCTxodHRwOi8vc3R1YXJ0ay5jb20vanN6aXA+CiAgCiAgCShjKSAyMDA5LTIwMTYgU3R1YXJ0IEtuaWdodGxleSA8c3R1YXJ0IFthdF0gc3R1YXJ0ay5jb20+CiAgCUR1YWwgbGljZW5jZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIG9yIEdQTHYzLiBTZWUgaHR0cHM6Ly9yYXcuZ2l0aHViLmNvbS9TdHVrL2pzemlwL21haW4vTElDRU5TRS5tYXJrZG93bi4KICAKICAJSlNaaXAgdXNlcyB0aGUgbGlicmFyeSBwYWtvIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSA6CiAgCWh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlY2EvcGFrby9ibG9iL21haW4vTElDRU5TRQogIAkqLwogIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHsKICAgICFmdW5jdGlvbihlKSB7CiAgICAgIG1vZHVsZS5leHBvcnRzID0gZSgpOwogICAgfShmdW5jdGlvbigpIHsKICAgICAgcmV0dXJuIGZ1bmN0aW9uIHMoYSwgbywgaCkgewogICAgICAgIGZ1bmN0aW9uIHUociwgZTIpIHsKICAgICAgICAgIGlmICghb1tyXSkgewogICAgICAgICAgICBpZiAoIWFbcl0pIHsKICAgICAgICAgICAgICB2YXIgdCA9ICJmdW5jdGlvbiIgPT0gdHlwZW9mIGNvbW1vbmpzUmVxdWlyZSAmJiBjb21tb25qc1JlcXVpcmU7CiAgICAgICAgICAgICAgaWYgKCFlMiAmJiB0KSByZXR1cm4gdChyLCB0cnVlKTsKICAgICAgICAgICAgICBpZiAobCkgcmV0dXJuIGwociwgdHJ1ZSk7CiAgICAgICAgICAgICAgdmFyIG4gPSBuZXcgRXJyb3IoIkNhbm5vdCBmaW5kIG1vZHVsZSAnIiArIHIgKyAiJyIpOwogICAgICAgICAgICAgIHRocm93IG4uY29kZSA9ICJNT0RVTEVfTk9UX0ZPVU5EIiwgbjsKICAgICAgICAgICAgfQogICAgICAgICAgICB2YXIgaSA9IG9bcl0gPSB7IGV4cG9ydHM6IHt9IH07CiAgICAgICAgICAgIGFbcl1bMF0uY2FsbChpLmV4cG9ydHMsIGZ1bmN0aW9uKGUzKSB7CiAgICAgICAgICAgICAgdmFyIHQyID0gYVtyXVsxXVtlM107CiAgICAgICAgICAgICAgcmV0dXJuIHUodDIgfHwgZTMpOwogICAgICAgICAgICB9LCBpLCBpLmV4cG9ydHMsIHMsIGEsIG8sIGgpOwogICAgICAgICAgfQogICAgICAgICAgcmV0dXJuIG9bcl0uZXhwb3J0czsKICAgICAgICB9CiAgICAgICAgZm9yICh2YXIgbCA9ICJmdW5jdGlvbiIgPT0gdHlwZW9mIGNvbW1vbmpzUmVxdWlyZSAmJiBjb21tb25qc1JlcXVpcmUsIGUgPSAwOyBlIDwgaC5sZW5ndGg7IGUrKykgdShoW2VdKTsKICAgICAgICByZXR1cm4gdTsKICAgICAgfSh7IDE6IFtmdW5jdGlvbihlLCB0LCByKSB7CiAgICAgICAgdmFyIGQgPSBlKCIuL3V0aWxzIiksIGMgPSBlKCIuL3N1cHBvcnQiKSwgcCA9ICJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPSI7CiAgICAgICAgci5lbmNvZGUgPSBmdW5jdGlvbihlMikgewogICAgICAgICAgZm9yICh2YXIgdDIsIHIyLCBuLCBpLCBzLCBhLCBvLCBoID0gW10sIHUgPSAwLCBsID0gZTIubGVuZ3RoLCBmID0gbCwgYzIgPSAic3RyaW5nIiAhPT0gZC5nZXRUeXBlT2YoZTIpOyB1IDwgZTIubGVuZ3RoOyApIGYgPSBsIC0gdSwgbiA9IGMyID8gKHQyID0gZTJbdSsrXSwgcjIgPSB1IDwgbCA/IGUyW3UrK10gOiAwLCB1IDwgbCA/IGUyW3UrK10gOiAwKSA6ICh0MiA9IGUyLmNoYXJDb2RlQXQodSsrKSwgcjIgPSB1IDwgbCA/IGUyLmNoYXJDb2RlQXQodSsrKSA6IDAsIHUgPCBsID8gZTIuY2hhckNvZGVBdCh1KyspIDogMCksIGkgPSB0MiA+PiAyLCBzID0gKDMgJiB0MikgPDwgNCB8IHIyID4+IDQsIGEgPSAxIDwgZiA/ICgxNSAmIHIyKSA8PCAyIHwgbiA+PiA2IDogNjQsIG8gPSAyIDwgZiA/IDYzICYgbiA6IDY0LCBoLnB1c2gocC5jaGFyQXQoaSkgKyBwLmNoYXJBdChzKSArIHAuY2hhckF0KGEpICsgcC5jaGFyQXQobykpOwogICAgICAgICAgcmV0dXJuIGguam9pbigiIik7CiAgICAgICAgfSwgci5kZWNvZGUgPSBmdW5jdGlvbihlMikgewogICAgICAgICAgdmFyIHQyLCByMiwgbiwgaSwgcywgYSwgbyA9IDAsIGggPSAwLCB1ID0gImRhdGE6IjsKICAgICAgICAgIGlmIChlMi5zdWJzdHIoMCwgdS5sZW5ndGgpID09PSB1KSB0aHJvdyBuZXcgRXJyb3IoIkludmFsaWQgYmFzZTY0IGlucHV0LCBpdCBsb29rcyBsaWtlIGEgZGF0YSB1cmwuIik7CiAgICAgICAgICB2YXIgbCwgZiA9IDMgKiAoZTIgPSBlMi5yZXBsYWNlKC9bXkEtWmEtejAtOSsvPV0vZywgIiIpKS5sZW5ndGggLyA0OwogICAgICAgICAgaWYgKGUyLmNoYXJBdChlMi5sZW5ndGggLSAxKSA9PT0gcC5jaGFyQXQoNjQpICYmIGYtLSwgZTIuY2hhckF0KGUyLmxlbmd0aCAtIDIpID09PSBwLmNoYXJBdCg2NCkgJiYgZi0tLCBmICUgMSAhPSAwKSB0aHJvdyBuZXcgRXJyb3IoIkludmFsaWQgYmFzZTY0IGlucHV0LCBiYWQgY29udGVudCBsZW5ndGguIik7CiAgICAgICAgICBmb3IgKGwgPSBjLnVpbnQ4YXJyYXkgPyBuZXcgVWludDhBcnJheSgwIHwgZikgOiBuZXcgQXJyYXkoMCB8IGYpOyBvIDwgZTIubGVuZ3RoOyApIHQyID0gcC5pbmRleE9mKGUyLmNoYXJBdChvKyspKSA8PCAyIHwgKGkgPSBwLmluZGV4T2YoZTIuY2hhckF0KG8rKykpKSA+PiA0LCByMiA9ICgxNSAmIGkpIDw8IDQgfCAocyA9IHAuaW5kZXhPZihlMi5jaGFyQXQobysrKSkpID4+IDIsIG4gPSAoMyAmIHMpIDw8IDYgfCAoYSA9IHAuaW5kZXhPZihlMi5jaGFyQXQobysrKSkpLCBsW2grK10gPSB0MiwgNjQgIT09IHMgJiYgKGxbaCsrXSA9IHIyKSwgNjQgIT09IGEgJiYgKGxbaCsrXSA9IG4pOwogICAgICAgICAgcmV0dXJuIGw7CiAgICAgICAgfTsKICAgICAgfSwgeyAiLi9zdXBwb3J0IjogMzAsICIuL3V0aWxzIjogMzIgfV0sIDI6IFtmdW5jdGlvbihlLCB0LCByKSB7CiAgICAgICAgdmFyIG4gPSBlKCIuL2V4dGVybmFsIiksIGkgPSBlKCIuL3N0cmVhbS9EYXRhV29ya2VyIiksIHMgPSBlKCIuL3N0cmVhbS9DcmMzMlByb2JlIiksIGEgPSBlKCIuL3N0cmVhbS9EYXRhTGVuZ3RoUHJvYmUiKTsKICAgICAgICBmdW5jdGlvbiBvKGUyLCB0MiwgcjIsIG4yLCBpMikgewogICAgICAgICAgdGhpcy5jb21wcmVzc2VkU2l6ZSA9IGUyLCB0aGlzLnVuY29tcHJlc3NlZFNpemUgPSB0MiwgdGhpcy5jcmMzMiA9IHIyLCB0aGlzLmNvbXByZXNzaW9uID0gbjIsIHRoaXMuY29tcHJlc3NlZENvbnRlbnQgPSBpMjsKICAgICAgICB9CiAgICAgICAgby5wcm90b3R5cGUgPSB7IGdldENvbnRlbnRXb3JrZXI6IGZ1bmN0aW9uKCkgewogICAgICAgICAgdmFyIGUyID0gbmV3IGkobi5Qcm9taXNlLnJlc29sdmUodGhpcy5jb21wcmVzc2VkQ29udGVudCkpLnBpcGUodGhpcy5jb21wcmVzc2lvbi51bmNvbXByZXNzV29ya2VyKCkpLnBpcGUobmV3IGEoImRhdGFfbGVuZ3RoIikpLCB0MiA9IHRoaXM7CiAgICAgICAgICByZXR1cm4gZTIub24oImVuZCIsIGZ1bmN0aW9uKCkgewogICAgICAgICAgICBpZiAodGhpcy5zdHJlYW1JbmZvLmRhdGFfbGVuZ3RoICE9PSB0Mi51bmNvbXByZXNzZWRTaXplKSB0aHJvdyBuZXcgRXJyb3IoIkJ1ZyA6IHVuY29tcHJlc3NlZCBkYXRhIHNpemUgbWlzbWF0Y2giKTsKICAgICAgICAgIH0pLCBlMjsKICAgICAgICB9LCBnZXRDb21wcmVzc2VkV29ya2VyOiBmdW5jdGlvbigpIHsKICAgICAgICAgIHJldHVybiBuZXcgaShuLlByb21pc2UucmVzb2x2ZSh0aGlzLmNvbXByZXNzZWRDb250ZW50KSkud2l0aFN0cmVhbUluZm8oImNvbXByZXNzZWRTaXplIiwgdGhpcy5jb21wcmVzc2VkU2l6ZSkud2l0aFN0cmVhbUluZm8oInVuY29tcHJlc3NlZFNpemUiLCB0aGlzLnVuY29tcHJlc3NlZFNpemUpLndpdGhTdHJlYW1JbmZvKCJjcmMzMiIsIHRoaXMuY3JjMzIpLndpdGhTdHJlYW1JbmZvKCJjb21wcmVzc2lvbiIsIHRoaXMuY29tcHJlc3Npb24pOwogICAgICAgIH0gfSwgby5jcmVhdGVXb3JrZXJGcm9tID0gZnVuY3Rpb24oZTIsIHQyLCByMikgewogICAgICAgICAgcmV0dXJuIGUyLnBpcGUobmV3IHMoKSkucGlwZShuZXcgYSgidW5jb21wcmVzc2VkU2l6ZSIpKS5waXBlKHQyLmNvbXByZXNzV29ya2VyKHIyKSkucGlwZShuZXcgYSgiY29tcHJlc3NlZFNpemUiKSkud2l0aFN0cmVhbUluZm8oImNvbXByZXNzaW9uIiwgdDIpOwogICAgICAgIH0sIHQuZXhwb3J0cyA9IG87CiAgICAgIH0sIHsgIi4vZXh0ZXJuYWwiOiA2LCAiLi9zdHJlYW0vQ3JjMzJQcm9iZSI6IDI1LCAiLi9zdHJlYW0vRGF0YUxlbmd0aFByb2JlIjogMjYsICIuL3N0cmVhbS9EYXRhV29ya2VyIjogMjcgfV0sIDM6IFtmdW5jdGlvbihlLCB0LCByKSB7CiAgICAgICAgdmFyIG4gPSBlKCIuL3N0cmVhbS9HZW5lcmljV29ya2VyIik7CiAgICAgICAgci5TVE9SRSA9IHsgbWFnaWM6ICJcMFwwIiwgY29tcHJlc3NXb3JrZXI6IGZ1bmN0aW9uKCkgewogICAgICAgICAgcmV0dXJuIG5ldyBuKCJTVE9SRSBjb21wcmVzc2lvbiIpOwogICAgICAgIH0sIHVuY29tcHJlc3NXb3JrZXI6IGZ1bmN0aW9uKCkgewogICAgICAgICAgcmV0dXJuIG5ldyBuKCJTVE9SRSBkZWNvbXByZXNzaW9uIik7CiAgICAgICAgfSB9LCByLkRFRkxBVEUgPSBlKCIuL2ZsYXRlIik7CiAgICAgIH0sIHsgIi4vZmxhdGUiOiA3LCAiLi9zdHJlYW0vR2VuZXJpY1dvcmtlciI6IDI4IH1dLCA0OiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIHZhciBuID0gZSgiLi91dGlscyIpOwogICAgICAgIHZhciBvID0gZnVuY3Rpb24oKSB7CiAgICAgICAgICBmb3IgKHZhciBlMiwgdDIgPSBbXSwgcjIgPSAwOyByMiA8IDI1NjsgcjIrKykgewogICAgICAgICAgICBlMiA9IHIyOwogICAgICAgICAgICBmb3IgKHZhciBuMiA9IDA7IG4yIDwgODsgbjIrKykgZTIgPSAxICYgZTIgPyAzOTg4MjkyMzg0IF4gZTIgPj4+IDEgOiBlMiA+Pj4gMTsKICAgICAgICAgICAgdDJbcjJdID0gZTI7CiAgICAgICAgICB9CiAgICAgICAgICByZXR1cm4gdDI7CiAgICAgICAgfSgpOwogICAgICAgIHQuZXhwb3J0cyA9IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgcmV0dXJuIHZvaWQgMCAhPT0gZTIgJiYgZTIubGVuZ3RoID8gInN0cmluZyIgIT09IG4uZ2V0VHlwZU9mKGUyKSA/IGZ1bmN0aW9uKGUzLCB0MywgcjIsIG4yKSB7CiAgICAgICAgICAgIHZhciBpID0gbywgcyA9IG4yICsgcjI7CiAgICAgICAgICAgIGUzIF49IC0xOwogICAgICAgICAgICBmb3IgKHZhciBhID0gbjI7IGEgPCBzOyBhKyspIGUzID0gZTMgPj4+IDggXiBpWzI1NSAmIChlMyBeIHQzW2FdKV07CiAgICAgICAgICAgIHJldHVybiAtMSBeIGUzOwogICAgICAgICAgfSgwIHwgdDIsIGUyLCBlMi5sZW5ndGgsIDApIDogZnVuY3Rpb24oZTMsIHQzLCByMiwgbjIpIHsKICAgICAgICAgICAgdmFyIGkgPSBvLCBzID0gbjIgKyByMjsKICAgICAgICAgICAgZTMgXj0gLTE7CiAgICAgICAgICAgIGZvciAodmFyIGEgPSBuMjsgYSA8IHM7IGErKykgZTMgPSBlMyA+Pj4gOCBeIGlbMjU1ICYgKGUzIF4gdDMuY2hhckNvZGVBdChhKSldOwogICAgICAgICAgICByZXR1cm4gLTEgXiBlMzsKICAgICAgICAgIH0oMCB8IHQyLCBlMiwgZTIubGVuZ3RoLCAwKSA6IDA7CiAgICAgICAgfTsKICAgICAgfSwgeyAiLi91dGlscyI6IDMyIH1dLCA1OiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIHIuYmFzZTY0ID0gZmFsc2UsIHIuYmluYXJ5ID0gZmFsc2UsIHIuZGlyID0gZmFsc2UsIHIuY3JlYXRlRm9sZGVycyA9IHRydWUsIHIuZGF0ZSA9IG51bGwsIHIuY29tcHJlc3Npb24gPSBudWxsLCByLmNvbXByZXNzaW9uT3B0aW9ucyA9IG51bGwsIHIuY29tbWVudCA9IG51bGwsIHIudW5peFBlcm1pc3Npb25zID0gbnVsbCwgci5kb3NQZXJtaXNzaW9ucyA9IG51bGw7CiAgICAgIH0sIHt9XSwgNjogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICB2YXIgbiA9IG51bGw7CiAgICAgICAgbiA9ICJ1bmRlZmluZWQiICE9IHR5cGVvZiBQcm9taXNlID8gUHJvbWlzZSA6IGUoImxpZSIpLCB0LmV4cG9ydHMgPSB7IFByb21pc2U6IG4gfTsKICAgICAgfSwgeyBsaWU6IDM3IH1dLCA3OiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIHZhciBuID0gInVuZGVmaW5lZCIgIT0gdHlwZW9mIFVpbnQ4QXJyYXkgJiYgInVuZGVmaW5lZCIgIT0gdHlwZW9mIFVpbnQxNkFycmF5ICYmICJ1bmRlZmluZWQiICE9IHR5cGVvZiBVaW50MzJBcnJheSwgaSA9IGUoInBha28iKSwgcyA9IGUoIi4vdXRpbHMiKSwgYSA9IGUoIi4vc3RyZWFtL0dlbmVyaWNXb3JrZXIiKSwgbyA9IG4gPyAidWludDhhcnJheSIgOiAiYXJyYXkiOwogICAgICAgIGZ1bmN0aW9uIGgoZTIsIHQyKSB7CiAgICAgICAgICBhLmNhbGwodGhpcywgIkZsYXRlV29ya2VyLyIgKyBlMiksIHRoaXMuX3Bha28gPSBudWxsLCB0aGlzLl9wYWtvQWN0aW9uID0gZTIsIHRoaXMuX3Bha29PcHRpb25zID0gdDIsIHRoaXMubWV0YSA9IHt9OwogICAgICAgIH0KICAgICAgICByLm1hZ2ljID0gIlxiXDAiLCBzLmluaGVyaXRzKGgsIGEpLCBoLnByb3RvdHlwZS5wcm9jZXNzQ2h1bmsgPSBmdW5jdGlvbihlMikgewogICAgICAgICAgdGhpcy5tZXRhID0gZTIubWV0YSwgbnVsbCA9PT0gdGhpcy5fcGFrbyAmJiB0aGlzLl9jcmVhdGVQYWtvKCksIHRoaXMuX3Bha28ucHVzaChzLnRyYW5zZm9ybVRvKG8sIGUyLmRhdGEpLCBmYWxzZSk7CiAgICAgICAgfSwgaC5wcm90b3R5cGUuZmx1c2ggPSBmdW5jdGlvbigpIHsKICAgICAgICAgIGEucHJvdG90eXBlLmZsdXNoLmNhbGwodGhpcyksIG51bGwgPT09IHRoaXMuX3Bha28gJiYgdGhpcy5fY3JlYXRlUGFrbygpLCB0aGlzLl9wYWtvLnB1c2goW10sIHRydWUpOwogICAgICAgIH0sIGgucHJvdG90eXBlLmNsZWFuVXAgPSBmdW5jdGlvbigpIHsKICAgICAgICAgIGEucHJvdG90eXBlLmNsZWFuVXAuY2FsbCh0aGlzKSwgdGhpcy5fcGFrbyA9IG51bGw7CiAgICAgICAgfSwgaC5wcm90b3R5cGUuX2NyZWF0ZVBha28gPSBmdW5jdGlvbigpIHsKICAgICAgICAgIHRoaXMuX3Bha28gPSBuZXcgaVt0aGlzLl9wYWtvQWN0aW9uXSh7IHJhdzogdHJ1ZSwgbGV2ZWw6IHRoaXMuX3Bha29PcHRpb25zLmxldmVsIHx8IC0xIH0pOwogICAgICAgICAgdmFyIHQyID0gdGhpczsKICAgICAgICAgIHRoaXMuX3Bha28ub25EYXRhID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgICAgdDIucHVzaCh7IGRhdGE6IGUyLCBtZXRhOiB0Mi5tZXRhIH0pOwogICAgICAgICAgfTsKICAgICAgICB9LCByLmNvbXByZXNzV29ya2VyID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHJldHVybiBuZXcgaCgiRGVmbGF0ZSIsIGUyKTsKICAgICAgICB9LCByLnVuY29tcHJlc3NXb3JrZXIgPSBmdW5jdGlvbigpIHsKICAgICAgICAgIHJldHVybiBuZXcgaCgiSW5mbGF0ZSIsIHt9KTsKICAgICAgICB9OwogICAgICB9LCB7ICIuL3N0cmVhbS9HZW5lcmljV29ya2VyIjogMjgsICIuL3V0aWxzIjogMzIsIHBha286IDM4IH1dLCA4OiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIGZ1bmN0aW9uIEEoZTIsIHQyKSB7CiAgICAgICAgICB2YXIgcjIsIG4yID0gIiI7CiAgICAgICAgICBmb3IgKHIyID0gMDsgcjIgPCB0MjsgcjIrKykgbjIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgyNTUgJiBlMiksIGUyID4+Pj0gODsKICAgICAgICAgIHJldHVybiBuMjsKICAgICAgICB9CiAgICAgICAgZnVuY3Rpb24gbihlMiwgdDIsIHIyLCBuMiwgaTIsIHMyKSB7CiAgICAgICAgICB2YXIgYSwgbywgaCA9IGUyLmZpbGUsIHUgPSBlMi5jb21wcmVzc2lvbiwgbCA9IHMyICE9PSBPLnV0ZjhlbmNvZGUsIGYgPSBJLnRyYW5zZm9ybVRvKCJzdHJpbmciLCBzMihoLm5hbWUpKSwgYyA9IEkudHJhbnNmb3JtVG8oInN0cmluZyIsIE8udXRmOGVuY29kZShoLm5hbWUpKSwgZCA9IGguY29tbWVudCwgcCA9IEkudHJhbnNmb3JtVG8oInN0cmluZyIsIHMyKGQpKSwgbSA9IEkudHJhbnNmb3JtVG8oInN0cmluZyIsIE8udXRmOGVuY29kZShkKSksIF8gPSBjLmxlbmd0aCAhPT0gaC5uYW1lLmxlbmd0aCwgZyA9IG0ubGVuZ3RoICE9PSBkLmxlbmd0aCwgYiA9ICIiLCB2ID0gIiIsIHkgPSAiIiwgdyA9IGguZGlyLCBrID0gaC5kYXRlLCB4ID0geyBjcmMzMjogMCwgY29tcHJlc3NlZFNpemU6IDAsIHVuY29tcHJlc3NlZFNpemU6IDAgfTsKICAgICAgICAgIHQyICYmICFyMiB8fCAoeC5jcmMzMiA9IGUyLmNyYzMyLCB4LmNvbXByZXNzZWRTaXplID0gZTIuY29tcHJlc3NlZFNpemUsIHgudW5jb21wcmVzc2VkU2l6ZSA9IGUyLnVuY29tcHJlc3NlZFNpemUpOwogICAgICAgICAgdmFyIFMgPSAwOwogICAgICAgICAgdDIgJiYgKFMgfD0gOCksIGwgfHwgIV8gJiYgIWcgfHwgKFMgfD0gMjA0OCk7CiAgICAgICAgICB2YXIgeiA9IDAsIEMgPSAwOwogICAgICAgICAgdyAmJiAoeiB8PSAxNiksICJVTklYIiA9PT0gaTIgPyAoQyA9IDc5OCwgeiB8PSBmdW5jdGlvbihlMywgdDMpIHsKICAgICAgICAgICAgdmFyIHIzID0gZTM7CiAgICAgICAgICAgIHJldHVybiBlMyB8fCAocjMgPSB0MyA/IDE2ODkzIDogMzMyMDQpLCAoNjU1MzUgJiByMykgPDwgMTY7CiAgICAgICAgICB9KGgudW5peFBlcm1pc3Npb25zLCB3KSkgOiAoQyA9IDIwLCB6IHw9IGZ1bmN0aW9uKGUzKSB7CiAgICAgICAgICAgIHJldHVybiA2MyAmIChlMyB8fCAwKTsKICAgICAgICAgIH0oaC5kb3NQZXJtaXNzaW9ucykpLCBhID0gay5nZXRVVENIb3VycygpLCBhIDw8PSA2LCBhIHw9IGsuZ2V0VVRDTWludXRlcygpLCBhIDw8PSA1LCBhIHw9IGsuZ2V0VVRDU2Vjb25kcygpIC8gMiwgbyA9IGsuZ2V0VVRDRnVsbFllYXIoKSAtIDE5ODAsIG8gPDw9IDQsIG8gfD0gay5nZXRVVENNb250aCgpICsgMSwgbyA8PD0gNSwgbyB8PSBrLmdldFVUQ0RhdGUoKSwgXyAmJiAodiA9IEEoMSwgMSkgKyBBKEIoZiksIDQpICsgYywgYiArPSAidXAiICsgQSh2Lmxlbmd0aCwgMikgKyB2KSwgZyAmJiAoeSA9IEEoMSwgMSkgKyBBKEIocCksIDQpICsgbSwgYiArPSAidWMiICsgQSh5Lmxlbmd0aCwgMikgKyB5KTsKICAgICAgICAgIHZhciBFID0gIiI7CiAgICAgICAgICByZXR1cm4gRSArPSAiXG5cMCIsIEUgKz0gQShTLCAyKSwgRSArPSB1Lm1hZ2ljLCBFICs9IEEoYSwgMiksIEUgKz0gQShvLCAyKSwgRSArPSBBKHguY3JjMzIsIDQpLCBFICs9IEEoeC5jb21wcmVzc2VkU2l6ZSwgNCksIEUgKz0gQSh4LnVuY29tcHJlc3NlZFNpemUsIDQpLCBFICs9IEEoZi5sZW5ndGgsIDIpLCBFICs9IEEoYi5sZW5ndGgsIDIpLCB7IGZpbGVSZWNvcmQ6IFIuTE9DQUxfRklMRV9IRUFERVIgKyBFICsgZiArIGIsIGRpclJlY29yZDogUi5DRU5UUkFMX0ZJTEVfSEVBREVSICsgQShDLCAyKSArIEUgKyBBKHAubGVuZ3RoLCAyKSArICJcMFwwXDBcMCIgKyBBKHosIDQpICsgQShuMiwgNCkgKyBmICsgYiArIHAgfTsKICAgICAgICB9CiAgICAgICAgdmFyIEkgPSBlKCIuLi91dGlscyIpLCBpID0gZSgiLi4vc3RyZWFtL0dlbmVyaWNXb3JrZXIiKSwgTyA9IGUoIi4uL3V0ZjgiKSwgQiA9IGUoIi4uL2NyYzMyIiksIFIgPSBlKCIuLi9zaWduYXR1cmUiKTsKICAgICAgICBmdW5jdGlvbiBzKGUyLCB0MiwgcjIsIG4yKSB7CiAgICAgICAgICBpLmNhbGwodGhpcywgIlppcEZpbGVXb3JrZXIiKSwgdGhpcy5ieXRlc1dyaXR0ZW4gPSAwLCB0aGlzLnppcENvbW1lbnQgPSB0MiwgdGhpcy56aXBQbGF0Zm9ybSA9IHIyLCB0aGlzLmVuY29kZUZpbGVOYW1lID0gbjIsIHRoaXMuc3RyZWFtRmlsZXMgPSBlMiwgdGhpcy5hY2N1bXVsYXRlID0gZmFsc2UsIHRoaXMuY29udGVudEJ1ZmZlciA9IFtdLCB0aGlzLmRpclJlY29yZHMgPSBbXSwgdGhpcy5jdXJyZW50U291cmNlT2Zmc2V0ID0gMCwgdGhpcy5lbnRyaWVzQ291bnQgPSAwLCB0aGlzLmN1cnJlbnRGaWxlID0gbnVsbCwgdGhpcy5fc291cmNlcyA9IFtdOwogICAgICAgIH0KICAgICAgICBJLmluaGVyaXRzKHMsIGkpLCBzLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHZhciB0MiA9IGUyLm1ldGEucGVyY2VudCB8fCAwLCByMiA9IHRoaXMuZW50cmllc0NvdW50LCBuMiA9IHRoaXMuX3NvdXJjZXMubGVuZ3RoOwogICAgICAgICAgdGhpcy5hY2N1bXVsYXRlID8gdGhpcy5jb250ZW50QnVmZmVyLnB1c2goZTIpIDogKHRoaXMuYnl0ZXNXcml0dGVuICs9IGUyLmRhdGEubGVuZ3RoLCBpLnByb3RvdHlwZS5wdXNoLmNhbGwodGhpcywgeyBkYXRhOiBlMi5kYXRhLCBtZXRhOiB7IGN1cnJlbnRGaWxlOiB0aGlzLmN1cnJlbnRGaWxlLCBwZXJjZW50OiByMiA/ICh0MiArIDEwMCAqIChyMiAtIG4yIC0gMSkpIC8gcjIgOiAxMDAgfSB9KSk7CiAgICAgICAgfSwgcy5wcm90b3R5cGUub3BlbmVkU291cmNlID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHRoaXMuY3VycmVudFNvdXJjZU9mZnNldCA9IHRoaXMuYnl0ZXNXcml0dGVuLCB0aGlzLmN1cnJlbnRGaWxlID0gZTIuZmlsZS5uYW1lOwogICAgICAgICAgdmFyIHQyID0gdGhpcy5zdHJlYW1GaWxlcyAmJiAhZTIuZmlsZS5kaXI7CiAgICAgICAgICBpZiAodDIpIHsKICAgICAgICAgICAgdmFyIHIyID0gbihlMiwgdDIsIGZhbHNlLCB0aGlzLmN1cnJlbnRTb3VyY2VPZmZzZXQsIHRoaXMuemlwUGxhdGZvcm0sIHRoaXMuZW5jb2RlRmlsZU5hbWUpOwogICAgICAgICAgICB0aGlzLnB1c2goeyBkYXRhOiByMi5maWxlUmVjb3JkLCBtZXRhOiB7IHBlcmNlbnQ6IDAgfSB9KTsKICAgICAgICAgIH0gZWxzZSB0aGlzLmFjY3VtdWxhdGUgPSB0cnVlOwogICAgICAgIH0sIHMucHJvdG90eXBlLmNsb3NlZFNvdXJjZSA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICB0aGlzLmFjY3VtdWxhdGUgPSBmYWxzZTsKICAgICAgICAgIHZhciB0MiA9IHRoaXMuc3RyZWFtRmlsZXMgJiYgIWUyLmZpbGUuZGlyLCByMiA9IG4oZTIsIHQyLCB0cnVlLCB0aGlzLmN1cnJlbnRTb3VyY2VPZmZzZXQsIHRoaXMuemlwUGxhdGZvcm0sIHRoaXMuZW5jb2RlRmlsZU5hbWUpOwogICAgICAgICAgaWYgKHRoaXMuZGlyUmVjb3Jkcy5wdXNoKHIyLmRpclJlY29yZCksIHQyKSB0aGlzLnB1c2goeyBkYXRhOiBmdW5jdGlvbihlMykgewogICAgICAgICAgICByZXR1cm4gUi5EQVRBX0RFU0NSSVBUT1IgKyBBKGUzLmNyYzMyLCA0KSArIEEoZTMuY29tcHJlc3NlZFNpemUsIDQpICsgQShlMy51bmNvbXByZXNzZWRTaXplLCA0KTsKICAgICAgICAgIH0oZTIpLCBtZXRhOiB7IHBlcmNlbnQ6IDEwMCB9IH0pOwogICAgICAgICAgZWxzZSBmb3IgKHRoaXMucHVzaCh7IGRhdGE6IHIyLmZpbGVSZWNvcmQsIG1ldGE6IHsgcGVyY2VudDogMCB9IH0pOyB0aGlzLmNvbnRlbnRCdWZmZXIubGVuZ3RoOyApIHRoaXMucHVzaCh0aGlzLmNvbnRlbnRCdWZmZXIuc2hpZnQoKSk7CiAgICAgICAgICB0aGlzLmN1cnJlbnRGaWxlID0gbnVsbDsKICAgICAgICB9LCBzLnByb3RvdHlwZS5mbHVzaCA9IGZ1bmN0aW9uKCkgewogICAgICAgICAgZm9yICh2YXIgZTIgPSB0aGlzLmJ5dGVzV3JpdHRlbiwgdDIgPSAwOyB0MiA8IHRoaXMuZGlyUmVjb3Jkcy5sZW5ndGg7IHQyKyspIHRoaXMucHVzaCh7IGRhdGE6IHRoaXMuZGlyUmVjb3Jkc1t0Ml0sIG1ldGE6IHsgcGVyY2VudDogMTAwIH0gfSk7CiAgICAgICAgICB2YXIgcjIgPSB0aGlzLmJ5dGVzV3JpdHRlbiAtIGUyLCBuMiA9IGZ1bmN0aW9uKGUzLCB0MywgcjMsIG4zLCBpMikgewogICAgICAgICAgICB2YXIgczIgPSBJLnRyYW5zZm9ybVRvKCJzdHJpbmciLCBpMihuMykpOwogICAgICAgICAgICByZXR1cm4gUi5DRU5UUkFMX0RJUkVDVE9SWV9FTkQgKyAiXDBcMFwwXDAiICsgQShlMywgMikgKyBBKGUzLCAyKSArIEEodDMsIDQpICsgQShyMywgNCkgKyBBKHMyLmxlbmd0aCwgMikgKyBzMjsKICAgICAgICAgIH0odGhpcy5kaXJSZWNvcmRzLmxlbmd0aCwgcjIsIGUyLCB0aGlzLnppcENvbW1lbnQsIHRoaXMuZW5jb2RlRmlsZU5hbWUpOwogICAgICAgICAgdGhpcy5wdXNoKHsgZGF0YTogbjIsIG1ldGE6IHsgcGVyY2VudDogMTAwIH0gfSk7CiAgICAgICAgfSwgcy5wcm90b3R5cGUucHJlcGFyZU5leHRTb3VyY2UgPSBmdW5jdGlvbigpIHsKICAgICAgICAgIHRoaXMucHJldmlvdXMgPSB0aGlzLl9zb3VyY2VzLnNoaWZ0KCksIHRoaXMub3BlbmVkU291cmNlKHRoaXMucHJldmlvdXMuc3RyZWFtSW5mbyksIHRoaXMuaXNQYXVzZWQgPyB0aGlzLnByZXZpb3VzLnBhdXNlKCkgOiB0aGlzLnByZXZpb3VzLnJlc3VtZSgpOwogICAgICAgIH0sIHMucHJvdG90eXBlLnJlZ2lzdGVyUHJldmlvdXMgPSBmdW5jdGlvbihlMikgewogICAgICAgICAgdGhpcy5fc291cmNlcy5wdXNoKGUyKTsKICAgICAgICAgIHZhciB0MiA9IHRoaXM7CiAgICAgICAgICByZXR1cm4gZTIub24oImRhdGEiLCBmdW5jdGlvbihlMykgewogICAgICAgICAgICB0Mi5wcm9jZXNzQ2h1bmsoZTMpOwogICAgICAgICAgfSksIGUyLm9uKCJlbmQiLCBmdW5jdGlvbigpIHsKICAgICAgICAgICAgdDIuY2xvc2VkU291cmNlKHQyLnByZXZpb3VzLnN0cmVhbUluZm8pLCB0Mi5fc291cmNlcy5sZW5ndGggPyB0Mi5wcmVwYXJlTmV4dFNvdXJjZSgpIDogdDIuZW5kKCk7CiAgICAgICAgICB9KSwgZTIub24oImVycm9yIiwgZnVuY3Rpb24oZTMpIHsKICAgICAgICAgICAgdDIuZXJyb3IoZTMpOwogICAgICAgICAgfSksIHRoaXM7CiAgICAgICAgfSwgcy5wcm90b3R5cGUucmVzdW1lID0gZnVuY3Rpb24oKSB7CiAgICAgICAgICByZXR1cm4gISFpLnByb3RvdHlwZS5yZXN1bWUuY2FsbCh0aGlzKSAmJiAoIXRoaXMucHJldmlvdXMgJiYgdGhpcy5fc291cmNlcy5sZW5ndGggPyAodGhpcy5wcmVwYXJlTmV4dFNvdXJjZSgpLCB0cnVlKSA6IHRoaXMucHJldmlvdXMgfHwgdGhpcy5fc291cmNlcy5sZW5ndGggfHwgdGhpcy5nZW5lcmF0ZWRFcnJvciA/IHZvaWQgMCA6ICh0aGlzLmVuZCgpLCB0cnVlKSk7CiAgICAgICAgfSwgcy5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbihlMikgewogICAgICAgICAgdmFyIHQyID0gdGhpcy5fc291cmNlczsKICAgICAgICAgIGlmICghaS5wcm90b3R5cGUuZXJyb3IuY2FsbCh0aGlzLCBlMikpIHJldHVybiBmYWxzZTsKICAgICAgICAgIGZvciAodmFyIHIyID0gMDsgcjIgPCB0Mi5sZW5ndGg7IHIyKyspIHRyeSB7CiAgICAgICAgICAgIHQyW3IyXS5lcnJvcihlMik7CiAgICAgICAgICB9IGNhdGNoIChlMykgewogICAgICAgICAgfQogICAgICAgICAgcmV0dXJuIHRydWU7CiAgICAgICAgfSwgcy5wcm90b3R5cGUubG9jayA9IGZ1bmN0aW9uKCkgewogICAgICAgICAgaS5wcm90b3R5cGUubG9jay5jYWxsKHRoaXMpOwogICAgICAgICAgZm9yICh2YXIgZTIgPSB0aGlzLl9zb3VyY2VzLCB0MiA9IDA7IHQyIDwgZTIubGVuZ3RoOyB0MisrKSBlMlt0Ml0ubG9jaygpOwogICAgICAgIH0sIHQuZXhwb3J0cyA9IHM7CiAgICAgIH0sIHsgIi4uL2NyYzMyIjogNCwgIi4uL3NpZ25hdHVyZSI6IDIzLCAiLi4vc3RyZWFtL0dlbmVyaWNXb3JrZXIiOiAyOCwgIi4uL3V0ZjgiOiAzMSwgIi4uL3V0aWxzIjogMzIgfV0sIDk6IFtmdW5jdGlvbihlLCB0LCByKSB7CiAgICAgICAgdmFyIHUgPSBlKCIuLi9jb21wcmVzc2lvbnMiKSwgbiA9IGUoIi4vWmlwRmlsZVdvcmtlciIpOwogICAgICAgIHIuZ2VuZXJhdGVXb3JrZXIgPSBmdW5jdGlvbihlMiwgYSwgdDIpIHsKICAgICAgICAgIHZhciBvID0gbmV3IG4oYS5zdHJlYW1GaWxlcywgdDIsIGEucGxhdGZvcm0sIGEuZW5jb2RlRmlsZU5hbWUpLCBoID0gMDsKICAgICAgICAgIHRyeSB7CiAgICAgICAgICAgIGUyLmZvckVhY2goZnVuY3Rpb24oZTMsIHQzKSB7CiAgICAgICAgICAgICAgaCsrOwogICAgICAgICAgICAgIHZhciByMiA9IGZ1bmN0aW9uKGU0LCB0NCkgewogICAgICAgICAgICAgICAgdmFyIHIzID0gZTQgfHwgdDQsIG4zID0gdVtyM107CiAgICAgICAgICAgICAgICBpZiAoIW4zKSB0aHJvdyBuZXcgRXJyb3IocjMgKyAiIGlzIG5vdCBhIHZhbGlkIGNvbXByZXNzaW9uIG1ldGhvZCAhIik7CiAgICAgICAgICAgICAgICByZXR1cm4gbjM7CiAgICAgICAgICAgICAgfSh0My5vcHRpb25zLmNvbXByZXNzaW9uLCBhLmNvbXByZXNzaW9uKSwgbjIgPSB0My5vcHRpb25zLmNvbXByZXNzaW9uT3B0aW9ucyB8fCBhLmNvbXByZXNzaW9uT3B0aW9ucyB8fCB7fSwgaSA9IHQzLmRpciwgcyA9IHQzLmRhdGU7CiAgICAgICAgICAgICAgdDMuX2NvbXByZXNzV29ya2VyKHIyLCBuMikud2l0aFN0cmVhbUluZm8oImZpbGUiLCB7IG5hbWU6IGUzLCBkaXI6IGksIGRhdGU6IHMsIGNvbW1lbnQ6IHQzLmNvbW1lbnQgfHwgIiIsIHVuaXhQZXJtaXNzaW9uczogdDMudW5peFBlcm1pc3Npb25zLCBkb3NQZXJtaXNzaW9uczogdDMuZG9zUGVybWlzc2lvbnMgfSkucGlwZShvKTsKICAgICAgICAgICAgfSksIG8uZW50cmllc0NvdW50ID0gaDsKICAgICAgICAgIH0gY2F0Y2ggKGUzKSB7CiAgICAgICAgICAgIG8uZXJyb3IoZTMpOwogICAgICAgICAgfQogICAgICAgICAgcmV0dXJuIG87CiAgICAgICAgfTsKICAgICAgfSwgeyAiLi4vY29tcHJlc3Npb25zIjogMywgIi4vWmlwRmlsZVdvcmtlciI6IDggfV0sIDEwOiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIGZ1bmN0aW9uIG4oKSB7CiAgICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgbikpIHJldHVybiBuZXcgbigpOwogICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHRocm93IG5ldyBFcnJvcigiVGhlIGNvbnN0cnVjdG9yIHdpdGggcGFyYW1ldGVycyBoYXMgYmVlbiByZW1vdmVkIGluIEpTWmlwIDMuMCwgcGxlYXNlIGNoZWNrIHRoZSB1cGdyYWRlIGd1aWRlLiIpOwogICAgICAgICAgdGhpcy5maWxlcyA9IC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpLCB0aGlzLmNvbW1lbnQgPSBudWxsLCB0aGlzLnJvb3QgPSAiIiwgdGhpcy5jbG9uZSA9IGZ1bmN0aW9uKCkgewogICAgICAgICAgICB2YXIgZTIgPSBuZXcgbigpOwogICAgICAgICAgICBmb3IgKHZhciB0MiBpbiB0aGlzKSAiZnVuY3Rpb24iICE9IHR5cGVvZiB0aGlzW3QyXSAmJiAoZTJbdDJdID0gdGhpc1t0Ml0pOwogICAgICAgICAgICByZXR1cm4gZTI7CiAgICAgICAgICB9OwogICAgICAgIH0KICAgICAgICAobi5wcm90b3R5cGUgPSBlKCIuL29iamVjdCIpKS5sb2FkQXN5bmMgPSBlKCIuL2xvYWQiKSwgbi5zdXBwb3J0ID0gZSgiLi9zdXBwb3J0IiksIG4uZGVmYXVsdHMgPSBlKCIuL2RlZmF1bHRzIiksIG4udmVyc2lvbiA9ICIzLjEwLjEiLCBuLmxvYWRBc3luYyA9IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgcmV0dXJuIG5ldyBuKCkubG9hZEFzeW5jKGUyLCB0Mik7CiAgICAgICAgfSwgbi5leHRlcm5hbCA9IGUoIi4vZXh0ZXJuYWwiKSwgdC5leHBvcnRzID0gbjsKICAgICAgfSwgeyAiLi9kZWZhdWx0cyI6IDUsICIuL2V4dGVybmFsIjogNiwgIi4vbG9hZCI6IDExLCAiLi9vYmplY3QiOiAxNSwgIi4vc3VwcG9ydCI6IDMwIH1dLCAxMTogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICB2YXIgdSA9IGUoIi4vdXRpbHMiKSwgaSA9IGUoIi4vZXh0ZXJuYWwiKSwgbiA9IGUoIi4vdXRmOCIpLCBzID0gZSgiLi96aXBFbnRyaWVzIiksIGEgPSBlKCIuL3N0cmVhbS9DcmMzMlByb2JlIiksIGwgPSBlKCIuL25vZGVqc1V0aWxzIik7CiAgICAgICAgZnVuY3Rpb24gZihuMikgewogICAgICAgICAgcmV0dXJuIG5ldyBpLlByb21pc2UoZnVuY3Rpb24oZTIsIHQyKSB7CiAgICAgICAgICAgIHZhciByMiA9IG4yLmRlY29tcHJlc3NlZC5nZXRDb250ZW50V29ya2VyKCkucGlwZShuZXcgYSgpKTsKICAgICAgICAgICAgcjIub24oImVycm9yIiwgZnVuY3Rpb24oZTMpIHsKICAgICAgICAgICAgICB0MihlMyk7CiAgICAgICAgICAgIH0pLm9uKCJlbmQiLCBmdW5jdGlvbigpIHsKICAgICAgICAgICAgICByMi5zdHJlYW1JbmZvLmNyYzMyICE9PSBuMi5kZWNvbXByZXNzZWQuY3JjMzIgPyB0MihuZXcgRXJyb3IoIkNvcnJ1cHRlZCB6aXAgOiBDUkMzMiBtaXNtYXRjaCIpKSA6IGUyKCk7CiAgICAgICAgICAgIH0pLnJlc3VtZSgpOwogICAgICAgICAgfSk7CiAgICAgICAgfQogICAgICAgIHQuZXhwb3J0cyA9IGZ1bmN0aW9uKGUyLCBvKSB7CiAgICAgICAgICB2YXIgaCA9IHRoaXM7CiAgICAgICAgICByZXR1cm4gbyA9IHUuZXh0ZW5kKG8gfHwge30sIHsgYmFzZTY0OiBmYWxzZSwgY2hlY2tDUkMzMjogZmFsc2UsIG9wdGltaXplZEJpbmFyeVN0cmluZzogZmFsc2UsIGNyZWF0ZUZvbGRlcnM6IGZhbHNlLCBkZWNvZGVGaWxlTmFtZTogbi51dGY4ZGVjb2RlIH0pLCBsLmlzTm9kZSAmJiBsLmlzU3RyZWFtKGUyKSA/IGkuUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCJKU1ppcCBjYW4ndCBhY2NlcHQgYSBzdHJlYW0gd2hlbiBsb2FkaW5nIGEgemlwIGZpbGUuIikpIDogdS5wcmVwYXJlQ29udGVudCgidGhlIGxvYWRlZCB6aXAgZmlsZSIsIGUyLCB0cnVlLCBvLm9wdGltaXplZEJpbmFyeVN0cmluZywgby5iYXNlNjQpLnRoZW4oZnVuY3Rpb24oZTMpIHsKICAgICAgICAgICAgdmFyIHQyID0gbmV3IHMobyk7CiAgICAgICAgICAgIHJldHVybiB0Mi5sb2FkKGUzKSwgdDI7CiAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKGUzKSB7CiAgICAgICAgICAgIHZhciB0MiA9IFtpLlByb21pc2UucmVzb2x2ZShlMyldLCByMiA9IGUzLmZpbGVzOwogICAgICAgICAgICBpZiAoby5jaGVja0NSQzMyKSBmb3IgKHZhciBuMiA9IDA7IG4yIDwgcjIubGVuZ3RoOyBuMisrKSB0Mi5wdXNoKGYocjJbbjJdKSk7CiAgICAgICAgICAgIHJldHVybiBpLlByb21pc2UuYWxsKHQyKTsKICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oZTMpIHsKICAgICAgICAgICAgZm9yICh2YXIgdDIgPSBlMy5zaGlmdCgpLCByMiA9IHQyLmZpbGVzLCBuMiA9IDA7IG4yIDwgcjIubGVuZ3RoOyBuMisrKSB7CiAgICAgICAgICAgICAgdmFyIGkyID0gcjJbbjJdLCBzMiA9IGkyLmZpbGVOYW1lU3RyLCBhMiA9IHUucmVzb2x2ZShpMi5maWxlTmFtZVN0cik7CiAgICAgICAgICAgICAgaC5maWxlKGEyLCBpMi5kZWNvbXByZXNzZWQsIHsgYmluYXJ5OiB0cnVlLCBvcHRpbWl6ZWRCaW5hcnlTdHJpbmc6IHRydWUsIGRhdGU6IGkyLmRhdGUsIGRpcjogaTIuZGlyLCBjb21tZW50OiBpMi5maWxlQ29tbWVudFN0ci5sZW5ndGggPyBpMi5maWxlQ29tbWVudFN0ciA6IG51bGwsIHVuaXhQZXJtaXNzaW9uczogaTIudW5peFBlcm1pc3Npb25zLCBkb3NQZXJtaXNzaW9uczogaTIuZG9zUGVybWlzc2lvbnMsIGNyZWF0ZUZvbGRlcnM6IG8uY3JlYXRlRm9sZGVycyB9KSwgaTIuZGlyIHx8IChoLmZpbGUoYTIpLnVuc2FmZU9yaWdpbmFsTmFtZSA9IHMyKTsKICAgICAgICAgICAgfQogICAgICAgICAgICByZXR1cm4gdDIuemlwQ29tbWVudC5sZW5ndGggJiYgKGguY29tbWVudCA9IHQyLnppcENvbW1lbnQpLCBoOwogICAgICAgICAgfSk7CiAgICAgICAgfTsKICAgICAgfSwgeyAiLi9leHRlcm5hbCI6IDYsICIuL25vZGVqc1V0aWxzIjogMTQsICIuL3N0cmVhbS9DcmMzMlByb2JlIjogMjUsICIuL3V0ZjgiOiAzMSwgIi4vdXRpbHMiOiAzMiwgIi4vemlwRW50cmllcyI6IDMzIH1dLCAxMjogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICB2YXIgbiA9IGUoIi4uL3V0aWxzIiksIGkgPSBlKCIuLi9zdHJlYW0vR2VuZXJpY1dvcmtlciIpOwogICAgICAgIGZ1bmN0aW9uIHMoZTIsIHQyKSB7CiAgICAgICAgICBpLmNhbGwodGhpcywgIk5vZGVqcyBzdHJlYW0gaW5wdXQgYWRhcHRlciBmb3IgIiArIGUyKSwgdGhpcy5fdXBzdHJlYW1FbmRlZCA9IGZhbHNlLCB0aGlzLl9iaW5kU3RyZWFtKHQyKTsKICAgICAgICB9CiAgICAgICAgbi5pbmhlcml0cyhzLCBpKSwgcy5wcm90b3R5cGUuX2JpbmRTdHJlYW0gPSBmdW5jdGlvbihlMikgewogICAgICAgICAgdmFyIHQyID0gdGhpczsKICAgICAgICAgICh0aGlzLl9zdHJlYW0gPSBlMikucGF1c2UoKSwgZTIub24oImRhdGEiLCBmdW5jdGlvbihlMykgewogICAgICAgICAgICB0Mi5wdXNoKHsgZGF0YTogZTMsIG1ldGE6IHsgcGVyY2VudDogMCB9IH0pOwogICAgICAgICAgfSkub24oImVycm9yIiwgZnVuY3Rpb24oZTMpIHsKICAgICAgICAgICAgdDIuaXNQYXVzZWQgPyB0aGlzLmdlbmVyYXRlZEVycm9yID0gZTMgOiB0Mi5lcnJvcihlMyk7CiAgICAgICAgICB9KS5vbigiZW5kIiwgZnVuY3Rpb24oKSB7CiAgICAgICAgICAgIHQyLmlzUGF1c2VkID8gdDIuX3Vwc3RyZWFtRW5kZWQgPSB0cnVlIDogdDIuZW5kKCk7CiAgICAgICAgICB9KTsKICAgICAgICB9LCBzLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uKCkgewogICAgICAgICAgcmV0dXJuICEhaS5wcm90b3R5cGUucGF1c2UuY2FsbCh0aGlzKSAmJiAodGhpcy5fc3RyZWFtLnBhdXNlKCksIHRydWUpOwogICAgICAgIH0sIHMucHJvdG90eXBlLnJlc3VtZSA9IGZ1bmN0aW9uKCkgewogICAgICAgICAgcmV0dXJuICEhaS5wcm90b3R5cGUucmVzdW1lLmNhbGwodGhpcykgJiYgKHRoaXMuX3Vwc3RyZWFtRW5kZWQgPyB0aGlzLmVuZCgpIDogdGhpcy5fc3RyZWFtLnJlc3VtZSgpLCB0cnVlKTsKICAgICAgICB9LCB0LmV4cG9ydHMgPSBzOwogICAgICB9LCB7ICIuLi9zdHJlYW0vR2VuZXJpY1dvcmtlciI6IDI4LCAiLi4vdXRpbHMiOiAzMiB9XSwgMTM6IFtmdW5jdGlvbihlLCB0LCByKSB7CiAgICAgICAgdmFyIGkgPSBlKCJyZWFkYWJsZS1zdHJlYW0iKS5SZWFkYWJsZTsKICAgICAgICBmdW5jdGlvbiBuKGUyLCB0MiwgcjIpIHsKICAgICAgICAgIGkuY2FsbCh0aGlzLCB0MiksIHRoaXMuX2hlbHBlciA9IGUyOwogICAgICAgICAgdmFyIG4yID0gdGhpczsKICAgICAgICAgIGUyLm9uKCJkYXRhIiwgZnVuY3Rpb24oZTMsIHQzKSB7CiAgICAgICAgICAgIG4yLnB1c2goZTMpIHx8IG4yLl9oZWxwZXIucGF1c2UoKSwgcjIgJiYgcjIodDMpOwogICAgICAgICAgfSkub24oImVycm9yIiwgZnVuY3Rpb24oZTMpIHsKICAgICAgICAgICAgbjIuZW1pdCgiZXJyb3IiLCBlMyk7CiAgICAgICAgICB9KS5vbigiZW5kIiwgZnVuY3Rpb24oKSB7CiAgICAgICAgICAgIG4yLnB1c2gobnVsbCk7CiAgICAgICAgICB9KTsKICAgICAgICB9CiAgICAgICAgZSgiLi4vdXRpbHMiKS5pbmhlcml0cyhuLCBpKSwgbi5wcm90b3R5cGUuX3JlYWQgPSBmdW5jdGlvbigpIHsKICAgICAgICAgIHRoaXMuX2hlbHBlci5yZXN1bWUoKTsKICAgICAgICB9LCB0LmV4cG9ydHMgPSBuOwogICAgICB9LCB7ICIuLi91dGlscyI6IDMyLCAicmVhZGFibGUtc3RyZWFtIjogMTYgfV0sIDE0OiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIHQuZXhwb3J0cyA9IHsgaXNOb2RlOiAidW5kZWZpbmVkIiAhPSB0eXBlb2YgQnVmZmVyLCBuZXdCdWZmZXJGcm9tOiBmdW5jdGlvbihlMiwgdDIpIHsKICAgICAgICAgIGlmIChCdWZmZXIuZnJvbSAmJiBCdWZmZXIuZnJvbSAhPT0gVWludDhBcnJheS5mcm9tKSByZXR1cm4gQnVmZmVyLmZyb20oZTIsIHQyKTsKICAgICAgICAgIGlmICgibnVtYmVyIiA9PSB0eXBlb2YgZTIpIHRocm93IG5ldyBFcnJvcignVGhlICJkYXRhIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBhIG51bWJlcicpOwogICAgICAgICAgcmV0dXJuIG5ldyBCdWZmZXIoZTIsIHQyKTsKICAgICAgICB9LCBhbGxvY0J1ZmZlcjogZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIGlmIChCdWZmZXIuYWxsb2MpIHJldHVybiBCdWZmZXIuYWxsb2MoZTIpOwogICAgICAgICAgdmFyIHQyID0gbmV3IEJ1ZmZlcihlMik7CiAgICAgICAgICByZXR1cm4gdDIuZmlsbCgwKSwgdDI7CiAgICAgICAgfSwgaXNCdWZmZXI6IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICByZXR1cm4gQnVmZmVyLmlzQnVmZmVyKGUyKTsKICAgICAgICB9LCBpc1N0cmVhbTogZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHJldHVybiBlMiAmJiAiZnVuY3Rpb24iID09IHR5cGVvZiBlMi5vbiAmJiAiZnVuY3Rpb24iID09IHR5cGVvZiBlMi5wYXVzZSAmJiAiZnVuY3Rpb24iID09IHR5cGVvZiBlMi5yZXN1bWU7CiAgICAgICAgfSB9OwogICAgICB9LCB7fV0sIDE1OiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIGZ1bmN0aW9uIHMoZTIsIHQyLCByMikgewogICAgICAgICAgdmFyIG4yLCBpMiA9IHUuZ2V0VHlwZU9mKHQyKSwgczIgPSB1LmV4dGVuZChyMiB8fCB7fSwgZik7CiAgICAgICAgICBzMi5kYXRlID0gczIuZGF0ZSB8fCAvKiBAX19QVVJFX18gKi8gbmV3IERhdGUoKSwgbnVsbCAhPT0gczIuY29tcHJlc3Npb24gJiYgKHMyLmNvbXByZXNzaW9uID0gczIuY29tcHJlc3Npb24udG9VcHBlckNhc2UoKSksICJzdHJpbmciID09IHR5cGVvZiBzMi51bml4UGVybWlzc2lvbnMgJiYgKHMyLnVuaXhQZXJtaXNzaW9ucyA9IHBhcnNlSW50KHMyLnVuaXhQZXJtaXNzaW9ucywgOCkpLCBzMi51bml4UGVybWlzc2lvbnMgJiYgMTYzODQgJiBzMi51bml4UGVybWlzc2lvbnMgJiYgKHMyLmRpciA9IHRydWUpLCBzMi5kb3NQZXJtaXNzaW9ucyAmJiAxNiAmIHMyLmRvc1Blcm1pc3Npb25zICYmIChzMi5kaXIgPSB0cnVlKSwgczIuZGlyICYmIChlMiA9IGcoZTIpKSwgczIuY3JlYXRlRm9sZGVycyAmJiAobjIgPSBfKGUyKSkgJiYgYi5jYWxsKHRoaXMsIG4yLCB0cnVlKTsKICAgICAgICAgIHZhciBhMiA9ICJzdHJpbmciID09PSBpMiAmJiBmYWxzZSA9PT0gczIuYmluYXJ5ICYmIGZhbHNlID09PSBzMi5iYXNlNjQ7CiAgICAgICAgICByMiAmJiB2b2lkIDAgIT09IHIyLmJpbmFyeSB8fCAoczIuYmluYXJ5ID0gIWEyKSwgKHQyIGluc3RhbmNlb2YgYyAmJiAwID09PSB0Mi51bmNvbXByZXNzZWRTaXplIHx8IHMyLmRpciB8fCAhdDIgfHwgMCA9PT0gdDIubGVuZ3RoKSAmJiAoczIuYmFzZTY0ID0gZmFsc2UsIHMyLmJpbmFyeSA9IHRydWUsIHQyID0gIiIsIHMyLmNvbXByZXNzaW9uID0gIlNUT1JFIiwgaTIgPSAic3RyaW5nIik7CiAgICAgICAgICB2YXIgbzIgPSBudWxsOwogICAgICAgICAgbzIgPSB0MiBpbnN0YW5jZW9mIGMgfHwgdDIgaW5zdGFuY2VvZiBsID8gdDIgOiBwLmlzTm9kZSAmJiBwLmlzU3RyZWFtKHQyKSA/IG5ldyBtKGUyLCB0MikgOiB1LnByZXBhcmVDb250ZW50KGUyLCB0MiwgczIuYmluYXJ5LCBzMi5vcHRpbWl6ZWRCaW5hcnlTdHJpbmcsIHMyLmJhc2U2NCk7CiAgICAgICAgICB2YXIgaDIgPSBuZXcgZChlMiwgbzIsIHMyKTsKICAgICAgICAgIHRoaXMuZmlsZXNbZTJdID0gaDI7CiAgICAgICAgfQogICAgICAgIHZhciBpID0gZSgiLi91dGY4IiksIHUgPSBlKCIuL3V0aWxzIiksIGwgPSBlKCIuL3N0cmVhbS9HZW5lcmljV29ya2VyIiksIGEgPSBlKCIuL3N0cmVhbS9TdHJlYW1IZWxwZXIiKSwgZiA9IGUoIi4vZGVmYXVsdHMiKSwgYyA9IGUoIi4vY29tcHJlc3NlZE9iamVjdCIpLCBkID0gZSgiLi96aXBPYmplY3QiKSwgbyA9IGUoIi4vZ2VuZXJhdGUiKSwgcCA9IGUoIi4vbm9kZWpzVXRpbHMiKSwgbSA9IGUoIi4vbm9kZWpzL05vZGVqc1N0cmVhbUlucHV0QWRhcHRlciIpLCBfID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgICIvIiA9PT0gZTIuc2xpY2UoLTEpICYmIChlMiA9IGUyLnN1YnN0cmluZygwLCBlMi5sZW5ndGggLSAxKSk7CiAgICAgICAgICB2YXIgdDIgPSBlMi5sYXN0SW5kZXhPZigiLyIpOwogICAgICAgICAgcmV0dXJuIDAgPCB0MiA/IGUyLnN1YnN0cmluZygwLCB0MikgOiAiIjsKICAgICAgICB9LCBnID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHJldHVybiAiLyIgIT09IGUyLnNsaWNlKC0xKSAmJiAoZTIgKz0gIi8iKSwgZTI7CiAgICAgICAgfSwgYiA9IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgcmV0dXJuIHQyID0gdm9pZCAwICE9PSB0MiA/IHQyIDogZi5jcmVhdGVGb2xkZXJzLCBlMiA9IGcoZTIpLCB0aGlzLmZpbGVzW2UyXSB8fCBzLmNhbGwodGhpcywgZTIsIG51bGwsIHsgZGlyOiB0cnVlLCBjcmVhdGVGb2xkZXJzOiB0MiB9KSwgdGhpcy5maWxlc1tlMl07CiAgICAgICAgfTsKICAgICAgICBmdW5jdGlvbiBoKGUyKSB7CiAgICAgICAgICByZXR1cm4gIltvYmplY3QgUmVnRXhwXSIgPT09IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlMik7CiAgICAgICAgfQogICAgICAgIHZhciBuID0geyBsb2FkOiBmdW5jdGlvbigpIHsKICAgICAgICAgIHRocm93IG5ldyBFcnJvcigiVGhpcyBtZXRob2QgaGFzIGJlZW4gcmVtb3ZlZCBpbiBKU1ppcCAzLjAsIHBsZWFzZSBjaGVjayB0aGUgdXBncmFkZSBndWlkZS4iKTsKICAgICAgICB9LCBmb3JFYWNoOiBmdW5jdGlvbihlMikgewogICAgICAgICAgdmFyIHQyLCByMiwgbjI7CiAgICAgICAgICBmb3IgKHQyIGluIHRoaXMuZmlsZXMpIG4yID0gdGhpcy5maWxlc1t0Ml0sIChyMiA9IHQyLnNsaWNlKHRoaXMucm9vdC5sZW5ndGgsIHQyLmxlbmd0aCkpICYmIHQyLnNsaWNlKDAsIHRoaXMucm9vdC5sZW5ndGgpID09PSB0aGlzLnJvb3QgJiYgZTIocjIsIG4yKTsKICAgICAgICB9LCBmaWx0ZXI6IGZ1bmN0aW9uKHIyKSB7CiAgICAgICAgICB2YXIgbjIgPSBbXTsKICAgICAgICAgIHJldHVybiB0aGlzLmZvckVhY2goZnVuY3Rpb24oZTIsIHQyKSB7CiAgICAgICAgICAgIHIyKGUyLCB0MikgJiYgbjIucHVzaCh0Mik7CiAgICAgICAgICB9KSwgbjI7CiAgICAgICAgfSwgZmlsZTogZnVuY3Rpb24oZTIsIHQyLCByMikgewogICAgICAgICAgaWYgKDEgIT09IGFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBlMiA9IHRoaXMucm9vdCArIGUyLCBzLmNhbGwodGhpcywgZTIsIHQyLCByMiksIHRoaXM7CiAgICAgICAgICBpZiAoaChlMikpIHsKICAgICAgICAgICAgdmFyIG4yID0gZTI7CiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbHRlcihmdW5jdGlvbihlMywgdDMpIHsKICAgICAgICAgICAgICByZXR1cm4gIXQzLmRpciAmJiBuMi50ZXN0KGUzKTsKICAgICAgICAgICAgfSk7CiAgICAgICAgICB9CiAgICAgICAgICB2YXIgaTIgPSB0aGlzLmZpbGVzW3RoaXMucm9vdCArIGUyXTsKICAgICAgICAgIHJldHVybiBpMiAmJiAhaTIuZGlyID8gaTIgOiBudWxsOwogICAgICAgIH0sIGZvbGRlcjogZnVuY3Rpb24ocjIpIHsKICAgICAgICAgIGlmICghcjIpIHJldHVybiB0aGlzOwogICAgICAgICAgaWYgKGgocjIpKSByZXR1cm4gdGhpcy5maWx0ZXIoZnVuY3Rpb24oZTMsIHQzKSB7CiAgICAgICAgICAgIHJldHVybiB0My5kaXIgJiYgcjIudGVzdChlMyk7CiAgICAgICAgICB9KTsKICAgICAgICAgIHZhciBlMiA9IHRoaXMucm9vdCArIHIyLCB0MiA9IGIuY2FsbCh0aGlzLCBlMiksIG4yID0gdGhpcy5jbG9uZSgpOwogICAgICAgICAgcmV0dXJuIG4yLnJvb3QgPSB0Mi5uYW1lLCBuMjsKICAgICAgICB9LCByZW1vdmU6IGZ1bmN0aW9uKHIyKSB7CiAgICAgICAgICByMiA9IHRoaXMucm9vdCArIHIyOwogICAgICAgICAgdmFyIGUyID0gdGhpcy5maWxlc1tyMl07CiAgICAgICAgICBpZiAoZTIgfHwgKCIvIiAhPT0gcjIuc2xpY2UoLTEpICYmIChyMiArPSAiLyIpLCBlMiA9IHRoaXMuZmlsZXNbcjJdKSwgZTIgJiYgIWUyLmRpcikgZGVsZXRlIHRoaXMuZmlsZXNbcjJdOwogICAgICAgICAgZWxzZSBmb3IgKHZhciB0MiA9IHRoaXMuZmlsdGVyKGZ1bmN0aW9uKGUzLCB0MykgewogICAgICAgICAgICByZXR1cm4gdDMubmFtZS5zbGljZSgwLCByMi5sZW5ndGgpID09PSByMjsKICAgICAgICAgIH0pLCBuMiA9IDA7IG4yIDwgdDIubGVuZ3RoOyBuMisrKSBkZWxldGUgdGhpcy5maWxlc1t0MltuMl0ubmFtZV07CiAgICAgICAgICByZXR1cm4gdGhpczsKICAgICAgICB9LCBnZW5lcmF0ZTogZnVuY3Rpb24oKSB7CiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIlRoaXMgbWV0aG9kIGhhcyBiZWVuIHJlbW92ZWQgaW4gSlNaaXAgMy4wLCBwbGVhc2UgY2hlY2sgdGhlIHVwZ3JhZGUgZ3VpZGUuIik7CiAgICAgICAgfSwgZ2VuZXJhdGVJbnRlcm5hbFN0cmVhbTogZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHZhciB0MiwgcjIgPSB7fTsKICAgICAgICAgIHRyeSB7CiAgICAgICAgICAgIGlmICgocjIgPSB1LmV4dGVuZChlMiB8fCB7fSwgeyBzdHJlYW1GaWxlczogZmFsc2UsIGNvbXByZXNzaW9uOiAiU1RPUkUiLCBjb21wcmVzc2lvbk9wdGlvbnM6IG51bGwsIHR5cGU6ICIiLCBwbGF0Zm9ybTogIkRPUyIsIGNvbW1lbnQ6IG51bGwsIG1pbWVUeXBlOiAiYXBwbGljYXRpb24vemlwIiwgZW5jb2RlRmlsZU5hbWU6IGkudXRmOGVuY29kZSB9KSkudHlwZSA9IHIyLnR5cGUudG9Mb3dlckNhc2UoKSwgcjIuY29tcHJlc3Npb24gPSByMi5jb21wcmVzc2lvbi50b1VwcGVyQ2FzZSgpLCAiYmluYXJ5c3RyaW5nIiA9PT0gcjIudHlwZSAmJiAocjIudHlwZSA9ICJzdHJpbmciKSwgIXIyLnR5cGUpIHRocm93IG5ldyBFcnJvcigiTm8gb3V0cHV0IHR5cGUgc3BlY2lmaWVkLiIpOwogICAgICAgICAgICB1LmNoZWNrU3VwcG9ydChyMi50eXBlKSwgImRhcndpbiIgIT09IHIyLnBsYXRmb3JtICYmICJmcmVlYnNkIiAhPT0gcjIucGxhdGZvcm0gJiYgImxpbnV4IiAhPT0gcjIucGxhdGZvcm0gJiYgInN1bm9zIiAhPT0gcjIucGxhdGZvcm0gfHwgKHIyLnBsYXRmb3JtID0gIlVOSVgiKSwgIndpbjMyIiA9PT0gcjIucGxhdGZvcm0gJiYgKHIyLnBsYXRmb3JtID0gIkRPUyIpOwogICAgICAgICAgICB2YXIgbjIgPSByMi5jb21tZW50IHx8IHRoaXMuY29tbWVudCB8fCAiIjsKICAgICAgICAgICAgdDIgPSBvLmdlbmVyYXRlV29ya2VyKHRoaXMsIHIyLCBuMik7CiAgICAgICAgICB9IGNhdGNoIChlMykgewogICAgICAgICAgICAodDIgPSBuZXcgbCgiZXJyb3IiKSkuZXJyb3IoZTMpOwogICAgICAgICAgfQogICAgICAgICAgcmV0dXJuIG5ldyBhKHQyLCByMi50eXBlIHx8ICJzdHJpbmciLCByMi5taW1lVHlwZSk7CiAgICAgICAgfSwgZ2VuZXJhdGVBc3luYzogZnVuY3Rpb24oZTIsIHQyKSB7CiAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUludGVybmFsU3RyZWFtKGUyKS5hY2N1bXVsYXRlKHQyKTsKICAgICAgICB9LCBnZW5lcmF0ZU5vZGVTdHJlYW06IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgcmV0dXJuIChlMiA9IGUyIHx8IHt9KS50eXBlIHx8IChlMi50eXBlID0gIm5vZGVidWZmZXIiKSwgdGhpcy5nZW5lcmF0ZUludGVybmFsU3RyZWFtKGUyKS50b05vZGVqc1N0cmVhbSh0Mik7CiAgICAgICAgfSB9OwogICAgICAgIHQuZXhwb3J0cyA9IG47CiAgICAgIH0sIHsgIi4vY29tcHJlc3NlZE9iamVjdCI6IDIsICIuL2RlZmF1bHRzIjogNSwgIi4vZ2VuZXJhdGUiOiA5LCAiLi9ub2RlanMvTm9kZWpzU3RyZWFtSW5wdXRBZGFwdGVyIjogMTIsICIuL25vZGVqc1V0aWxzIjogMTQsICIuL3N0cmVhbS9HZW5lcmljV29ya2VyIjogMjgsICIuL3N0cmVhbS9TdHJlYW1IZWxwZXIiOiAyOSwgIi4vdXRmOCI6IDMxLCAiLi91dGlscyI6IDMyLCAiLi96aXBPYmplY3QiOiAzNSB9XSwgMTY6IFtmdW5jdGlvbihlLCB0LCByKSB7CiAgICAgICAgdC5leHBvcnRzID0gZSgic3RyZWFtIik7CiAgICAgIH0sIHsgc3RyZWFtOiB2b2lkIDAgfV0sIDE3OiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIHZhciBuID0gZSgiLi9EYXRhUmVhZGVyIik7CiAgICAgICAgZnVuY3Rpb24gaShlMikgewogICAgICAgICAgbi5jYWxsKHRoaXMsIGUyKTsKICAgICAgICAgIGZvciAodmFyIHQyID0gMDsgdDIgPCB0aGlzLmRhdGEubGVuZ3RoOyB0MisrKSBlMlt0Ml0gPSAyNTUgJiBlMlt0Ml07CiAgICAgICAgfQogICAgICAgIGUoIi4uL3V0aWxzIikuaW5oZXJpdHMoaSwgbiksIGkucHJvdG90eXBlLmJ5dGVBdCA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhW3RoaXMuemVybyArIGUyXTsKICAgICAgICB9LCBpLnByb3RvdHlwZS5sYXN0SW5kZXhPZlNpZ25hdHVyZSA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICBmb3IgKHZhciB0MiA9IGUyLmNoYXJDb2RlQXQoMCksIHIyID0gZTIuY2hhckNvZGVBdCgxKSwgbjIgPSBlMi5jaGFyQ29kZUF0KDIpLCBpMiA9IGUyLmNoYXJDb2RlQXQoMyksIHMgPSB0aGlzLmxlbmd0aCAtIDQ7IDAgPD0gczsgLS1zKSBpZiAodGhpcy5kYXRhW3NdID09PSB0MiAmJiB0aGlzLmRhdGFbcyArIDFdID09PSByMiAmJiB0aGlzLmRhdGFbcyArIDJdID09PSBuMiAmJiB0aGlzLmRhdGFbcyArIDNdID09PSBpMikgcmV0dXJuIHMgLSB0aGlzLnplcm87CiAgICAgICAgICByZXR1cm4gLTE7CiAgICAgICAgfSwgaS5wcm90b3R5cGUucmVhZEFuZENoZWNrU2lnbmF0dXJlID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHZhciB0MiA9IGUyLmNoYXJDb2RlQXQoMCksIHIyID0gZTIuY2hhckNvZGVBdCgxKSwgbjIgPSBlMi5jaGFyQ29kZUF0KDIpLCBpMiA9IGUyLmNoYXJDb2RlQXQoMyksIHMgPSB0aGlzLnJlYWREYXRhKDQpOwogICAgICAgICAgcmV0dXJuIHQyID09PSBzWzBdICYmIHIyID09PSBzWzFdICYmIG4yID09PSBzWzJdICYmIGkyID09PSBzWzNdOwogICAgICAgIH0sIGkucHJvdG90eXBlLnJlYWREYXRhID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIGlmICh0aGlzLmNoZWNrT2Zmc2V0KGUyKSwgMCA9PT0gZTIpIHJldHVybiBbXTsKICAgICAgICAgIHZhciB0MiA9IHRoaXMuZGF0YS5zbGljZSh0aGlzLnplcm8gKyB0aGlzLmluZGV4LCB0aGlzLnplcm8gKyB0aGlzLmluZGV4ICsgZTIpOwogICAgICAgICAgcmV0dXJuIHRoaXMuaW5kZXggKz0gZTIsIHQyOwogICAgICAgIH0sIHQuZXhwb3J0cyA9IGk7CiAgICAgIH0sIHsgIi4uL3V0aWxzIjogMzIsICIuL0RhdGFSZWFkZXIiOiAxOCB9XSwgMTg6IFtmdW5jdGlvbihlLCB0LCByKSB7CiAgICAgICAgdmFyIG4gPSBlKCIuLi91dGlscyIpOwogICAgICAgIGZ1bmN0aW9uIGkoZTIpIHsKICAgICAgICAgIHRoaXMuZGF0YSA9IGUyLCB0aGlzLmxlbmd0aCA9IGUyLmxlbmd0aCwgdGhpcy5pbmRleCA9IDAsIHRoaXMuemVybyA9IDA7CiAgICAgICAgfQogICAgICAgIGkucHJvdG90eXBlID0geyBjaGVja09mZnNldDogZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHRoaXMuY2hlY2tJbmRleCh0aGlzLmluZGV4ICsgZTIpOwogICAgICAgIH0sIGNoZWNrSW5kZXg6IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICBpZiAodGhpcy5sZW5ndGggPCB0aGlzLnplcm8gKyBlMiB8fCBlMiA8IDApIHRocm93IG5ldyBFcnJvcigiRW5kIG9mIGRhdGEgcmVhY2hlZCAoZGF0YSBsZW5ndGggPSAiICsgdGhpcy5sZW5ndGggKyAiLCBhc2tlZCBpbmRleCA9ICIgKyBlMiArICIpLiBDb3JydXB0ZWQgemlwID8iKTsKICAgICAgICB9LCBzZXRJbmRleDogZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHRoaXMuY2hlY2tJbmRleChlMiksIHRoaXMuaW5kZXggPSBlMjsKICAgICAgICB9LCBza2lwOiBmdW5jdGlvbihlMikgewogICAgICAgICAgdGhpcy5zZXRJbmRleCh0aGlzLmluZGV4ICsgZTIpOwogICAgICAgIH0sIGJ5dGVBdDogZnVuY3Rpb24oKSB7CiAgICAgICAgfSwgcmVhZEludDogZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHZhciB0MiwgcjIgPSAwOwogICAgICAgICAgZm9yICh0aGlzLmNoZWNrT2Zmc2V0KGUyKSwgdDIgPSB0aGlzLmluZGV4ICsgZTIgLSAxOyB0MiA+PSB0aGlzLmluZGV4OyB0Mi0tKSByMiA9IChyMiA8PCA4KSArIHRoaXMuYnl0ZUF0KHQyKTsKICAgICAgICAgIHJldHVybiB0aGlzLmluZGV4ICs9IGUyLCByMjsKICAgICAgICB9LCByZWFkU3RyaW5nOiBmdW5jdGlvbihlMikgewogICAgICAgICAgcmV0dXJuIG4udHJhbnNmb3JtVG8oInN0cmluZyIsIHRoaXMucmVhZERhdGEoZTIpKTsKICAgICAgICB9LCByZWFkRGF0YTogZnVuY3Rpb24oKSB7CiAgICAgICAgfSwgbGFzdEluZGV4T2ZTaWduYXR1cmU6IGZ1bmN0aW9uKCkgewogICAgICAgIH0sIHJlYWRBbmRDaGVja1NpZ25hdHVyZTogZnVuY3Rpb24oKSB7CiAgICAgICAgfSwgcmVhZERhdGU6IGZ1bmN0aW9uKCkgewogICAgICAgICAgdmFyIGUyID0gdGhpcy5yZWFkSW50KDQpOwogICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKDE5ODAgKyAoZTIgPj4gMjUgJiAxMjcpLCAoZTIgPj4gMjEgJiAxNSkgLSAxLCBlMiA+PiAxNiAmIDMxLCBlMiA+PiAxMSAmIDMxLCBlMiA+PiA1ICYgNjMsICgzMSAmIGUyKSA8PCAxKSk7CiAgICAgICAgfSB9LCB0LmV4cG9ydHMgPSBpOwogICAgICB9LCB7ICIuLi91dGlscyI6IDMyIH1dLCAxOTogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICB2YXIgbiA9IGUoIi4vVWludDhBcnJheVJlYWRlciIpOwogICAgICAgIGZ1bmN0aW9uIGkoZTIpIHsKICAgICAgICAgIG4uY2FsbCh0aGlzLCBlMik7CiAgICAgICAgfQogICAgICAgIGUoIi4uL3V0aWxzIikuaW5oZXJpdHMoaSwgbiksIGkucHJvdG90eXBlLnJlYWREYXRhID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHRoaXMuY2hlY2tPZmZzZXQoZTIpOwogICAgICAgICAgdmFyIHQyID0gdGhpcy5kYXRhLnNsaWNlKHRoaXMuemVybyArIHRoaXMuaW5kZXgsIHRoaXMuemVybyArIHRoaXMuaW5kZXggKyBlMik7CiAgICAgICAgICByZXR1cm4gdGhpcy5pbmRleCArPSBlMiwgdDI7CiAgICAgICAgfSwgdC5leHBvcnRzID0gaTsKICAgICAgfSwgeyAiLi4vdXRpbHMiOiAzMiwgIi4vVWludDhBcnJheVJlYWRlciI6IDIxIH1dLCAyMDogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICB2YXIgbiA9IGUoIi4vRGF0YVJlYWRlciIpOwogICAgICAgIGZ1bmN0aW9uIGkoZTIpIHsKICAgICAgICAgIG4uY2FsbCh0aGlzLCBlMik7CiAgICAgICAgfQogICAgICAgIGUoIi4uL3V0aWxzIikuaW5oZXJpdHMoaSwgbiksIGkucHJvdG90eXBlLmJ5dGVBdCA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmNoYXJDb2RlQXQodGhpcy56ZXJvICsgZTIpOwogICAgICAgIH0sIGkucHJvdG90eXBlLmxhc3RJbmRleE9mU2lnbmF0dXJlID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHJldHVybiB0aGlzLmRhdGEubGFzdEluZGV4T2YoZTIpIC0gdGhpcy56ZXJvOwogICAgICAgIH0sIGkucHJvdG90eXBlLnJlYWRBbmRDaGVja1NpZ25hdHVyZSA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICByZXR1cm4gZTIgPT09IHRoaXMucmVhZERhdGEoNCk7CiAgICAgICAgfSwgaS5wcm90b3R5cGUucmVhZERhdGEgPSBmdW5jdGlvbihlMikgewogICAgICAgICAgdGhpcy5jaGVja09mZnNldChlMik7CiAgICAgICAgICB2YXIgdDIgPSB0aGlzLmRhdGEuc2xpY2UodGhpcy56ZXJvICsgdGhpcy5pbmRleCwgdGhpcy56ZXJvICsgdGhpcy5pbmRleCArIGUyKTsKICAgICAgICAgIHJldHVybiB0aGlzLmluZGV4ICs9IGUyLCB0MjsKICAgICAgICB9LCB0LmV4cG9ydHMgPSBpOwogICAgICB9LCB7ICIuLi91dGlscyI6IDMyLCAiLi9EYXRhUmVhZGVyIjogMTggfV0sIDIxOiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIHZhciBuID0gZSgiLi9BcnJheVJlYWRlciIpOwogICAgICAgIGZ1bmN0aW9uIGkoZTIpIHsKICAgICAgICAgIG4uY2FsbCh0aGlzLCBlMik7CiAgICAgICAgfQogICAgICAgIGUoIi4uL3V0aWxzIikuaW5oZXJpdHMoaSwgbiksIGkucHJvdG90eXBlLnJlYWREYXRhID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIGlmICh0aGlzLmNoZWNrT2Zmc2V0KGUyKSwgMCA9PT0gZTIpIHJldHVybiBuZXcgVWludDhBcnJheSgwKTsKICAgICAgICAgIHZhciB0MiA9IHRoaXMuZGF0YS5zdWJhcnJheSh0aGlzLnplcm8gKyB0aGlzLmluZGV4LCB0aGlzLnplcm8gKyB0aGlzLmluZGV4ICsgZTIpOwogICAgICAgICAgcmV0dXJuIHRoaXMuaW5kZXggKz0gZTIsIHQyOwogICAgICAgIH0sIHQuZXhwb3J0cyA9IGk7CiAgICAgIH0sIHsgIi4uL3V0aWxzIjogMzIsICIuL0FycmF5UmVhZGVyIjogMTcgfV0sIDIyOiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIHZhciBuID0gZSgiLi4vdXRpbHMiKSwgaSA9IGUoIi4uL3N1cHBvcnQiKSwgcyA9IGUoIi4vQXJyYXlSZWFkZXIiKSwgYSA9IGUoIi4vU3RyaW5nUmVhZGVyIiksIG8gPSBlKCIuL05vZGVCdWZmZXJSZWFkZXIiKSwgaCA9IGUoIi4vVWludDhBcnJheVJlYWRlciIpOwogICAgICAgIHQuZXhwb3J0cyA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICB2YXIgdDIgPSBuLmdldFR5cGVPZihlMik7CiAgICAgICAgICByZXR1cm4gbi5jaGVja1N1cHBvcnQodDIpLCAic3RyaW5nIiAhPT0gdDIgfHwgaS51aW50OGFycmF5ID8gIm5vZGVidWZmZXIiID09PSB0MiA/IG5ldyBvKGUyKSA6IGkudWludDhhcnJheSA/IG5ldyBoKG4udHJhbnNmb3JtVG8oInVpbnQ4YXJyYXkiLCBlMikpIDogbmV3IHMobi50cmFuc2Zvcm1UbygiYXJyYXkiLCBlMikpIDogbmV3IGEoZTIpOwogICAgICAgIH07CiAgICAgIH0sIHsgIi4uL3N1cHBvcnQiOiAzMCwgIi4uL3V0aWxzIjogMzIsICIuL0FycmF5UmVhZGVyIjogMTcsICIuL05vZGVCdWZmZXJSZWFkZXIiOiAxOSwgIi4vU3RyaW5nUmVhZGVyIjogMjAsICIuL1VpbnQ4QXJyYXlSZWFkZXIiOiAyMSB9XSwgMjM6IFtmdW5jdGlvbihlLCB0LCByKSB7CiAgICAgICAgci5MT0NBTF9GSUxFX0hFQURFUiA9ICJQSwMEIiwgci5DRU5UUkFMX0ZJTEVfSEVBREVSID0gIlBLAQIiLCByLkNFTlRSQUxfRElSRUNUT1JZX0VORCA9ICJQSwUGIiwgci5aSVA2NF9DRU5UUkFMX0RJUkVDVE9SWV9MT0NBVE9SID0gIlBLBlx4MDciLCByLlpJUDY0X0NFTlRSQUxfRElSRUNUT1JZX0VORCA9ICJQSwYGIiwgci5EQVRBX0RFU0NSSVBUT1IgPSAiUEtceDA3XGIiOwogICAgICB9LCB7fV0sIDI0OiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIHZhciBuID0gZSgiLi9HZW5lcmljV29ya2VyIiksIGkgPSBlKCIuLi91dGlscyIpOwogICAgICAgIGZ1bmN0aW9uIHMoZTIpIHsKICAgICAgICAgIG4uY2FsbCh0aGlzLCAiQ29udmVydFdvcmtlciB0byAiICsgZTIpLCB0aGlzLmRlc3RUeXBlID0gZTI7CiAgICAgICAgfQogICAgICAgIGkuaW5oZXJpdHMocywgbiksIHMucHJvdG90eXBlLnByb2Nlc3NDaHVuayA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICB0aGlzLnB1c2goeyBkYXRhOiBpLnRyYW5zZm9ybVRvKHRoaXMuZGVzdFR5cGUsIGUyLmRhdGEpLCBtZXRhOiBlMi5tZXRhIH0pOwogICAgICAgIH0sIHQuZXhwb3J0cyA9IHM7CiAgICAgIH0sIHsgIi4uL3V0aWxzIjogMzIsICIuL0dlbmVyaWNXb3JrZXIiOiAyOCB9XSwgMjU6IFtmdW5jdGlvbihlLCB0LCByKSB7CiAgICAgICAgdmFyIG4gPSBlKCIuL0dlbmVyaWNXb3JrZXIiKSwgaSA9IGUoIi4uL2NyYzMyIik7CiAgICAgICAgZnVuY3Rpb24gcygpIHsKICAgICAgICAgIG4uY2FsbCh0aGlzLCAiQ3JjMzJQcm9iZSIpLCB0aGlzLndpdGhTdHJlYW1JbmZvKCJjcmMzMiIsIDApOwogICAgICAgIH0KICAgICAgICBlKCIuLi91dGlscyIpLmluaGVyaXRzKHMsIG4pLCBzLnByb3RvdHlwZS5wcm9jZXNzQ2h1bmsgPSBmdW5jdGlvbihlMikgewogICAgICAgICAgdGhpcy5zdHJlYW1JbmZvLmNyYzMyID0gaShlMi5kYXRhLCB0aGlzLnN0cmVhbUluZm8uY3JjMzIgfHwgMCksIHRoaXMucHVzaChlMik7CiAgICAgICAgfSwgdC5leHBvcnRzID0gczsKICAgICAgfSwgeyAiLi4vY3JjMzIiOiA0LCAiLi4vdXRpbHMiOiAzMiwgIi4vR2VuZXJpY1dvcmtlciI6IDI4IH1dLCAyNjogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICB2YXIgbiA9IGUoIi4uL3V0aWxzIiksIGkgPSBlKCIuL0dlbmVyaWNXb3JrZXIiKTsKICAgICAgICBmdW5jdGlvbiBzKGUyKSB7CiAgICAgICAgICBpLmNhbGwodGhpcywgIkRhdGFMZW5ndGhQcm9iZSBmb3IgIiArIGUyKSwgdGhpcy5wcm9wTmFtZSA9IGUyLCB0aGlzLndpdGhTdHJlYW1JbmZvKGUyLCAwKTsKICAgICAgICB9CiAgICAgICAgbi5pbmhlcml0cyhzLCBpKSwgcy5wcm90b3R5cGUucHJvY2Vzc0NodW5rID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIGlmIChlMikgewogICAgICAgICAgICB2YXIgdDIgPSB0aGlzLnN0cmVhbUluZm9bdGhpcy5wcm9wTmFtZV0gfHwgMDsKICAgICAgICAgICAgdGhpcy5zdHJlYW1JbmZvW3RoaXMucHJvcE5hbWVdID0gdDIgKyBlMi5kYXRhLmxlbmd0aDsKICAgICAgICAgIH0KICAgICAgICAgIGkucHJvdG90eXBlLnByb2Nlc3NDaHVuay5jYWxsKHRoaXMsIGUyKTsKICAgICAgICB9LCB0LmV4cG9ydHMgPSBzOwogICAgICB9LCB7ICIuLi91dGlscyI6IDMyLCAiLi9HZW5lcmljV29ya2VyIjogMjggfV0sIDI3OiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIHZhciBuID0gZSgiLi4vdXRpbHMiKSwgaSA9IGUoIi4vR2VuZXJpY1dvcmtlciIpOwogICAgICAgIGZ1bmN0aW9uIHMoZTIpIHsKICAgICAgICAgIGkuY2FsbCh0aGlzLCAiRGF0YVdvcmtlciIpOwogICAgICAgICAgdmFyIHQyID0gdGhpczsKICAgICAgICAgIHRoaXMuZGF0YUlzUmVhZHkgPSBmYWxzZSwgdGhpcy5pbmRleCA9IDAsIHRoaXMubWF4ID0gMCwgdGhpcy5kYXRhID0gbnVsbCwgdGhpcy50eXBlID0gIiIsIHRoaXMuX3RpY2tTY2hlZHVsZWQgPSBmYWxzZSwgZTIudGhlbihmdW5jdGlvbihlMykgewogICAgICAgICAgICB0Mi5kYXRhSXNSZWFkeSA9IHRydWUsIHQyLmRhdGEgPSBlMywgdDIubWF4ID0gZTMgJiYgZTMubGVuZ3RoIHx8IDAsIHQyLnR5cGUgPSBuLmdldFR5cGVPZihlMyksIHQyLmlzUGF1c2VkIHx8IHQyLl90aWNrQW5kUmVwZWF0KCk7CiAgICAgICAgICB9LCBmdW5jdGlvbihlMykgewogICAgICAgICAgICB0Mi5lcnJvcihlMyk7CiAgICAgICAgICB9KTsKICAgICAgICB9CiAgICAgICAgbi5pbmhlcml0cyhzLCBpKSwgcy5wcm90b3R5cGUuY2xlYW5VcCA9IGZ1bmN0aW9uKCkgewogICAgICAgICAgaS5wcm90b3R5cGUuY2xlYW5VcC5jYWxsKHRoaXMpLCB0aGlzLmRhdGEgPSBudWxsOwogICAgICAgIH0sIHMucHJvdG90eXBlLnJlc3VtZSA9IGZ1bmN0aW9uKCkgewogICAgICAgICAgcmV0dXJuICEhaS5wcm90b3R5cGUucmVzdW1lLmNhbGwodGhpcykgJiYgKCF0aGlzLl90aWNrU2NoZWR1bGVkICYmIHRoaXMuZGF0YUlzUmVhZHkgJiYgKHRoaXMuX3RpY2tTY2hlZHVsZWQgPSB0cnVlLCBuLmRlbGF5KHRoaXMuX3RpY2tBbmRSZXBlYXQsIFtdLCB0aGlzKSksIHRydWUpOwogICAgICAgIH0sIHMucHJvdG90eXBlLl90aWNrQW5kUmVwZWF0ID0gZnVuY3Rpb24oKSB7CiAgICAgICAgICB0aGlzLl90aWNrU2NoZWR1bGVkID0gZmFsc2UsIHRoaXMuaXNQYXVzZWQgfHwgdGhpcy5pc0ZpbmlzaGVkIHx8ICh0aGlzLl90aWNrKCksIHRoaXMuaXNGaW5pc2hlZCB8fCAobi5kZWxheSh0aGlzLl90aWNrQW5kUmVwZWF0LCBbXSwgdGhpcyksIHRoaXMuX3RpY2tTY2hlZHVsZWQgPSB0cnVlKSk7CiAgICAgICAgfSwgcy5wcm90b3R5cGUuX3RpY2sgPSBmdW5jdGlvbigpIHsKICAgICAgICAgIGlmICh0aGlzLmlzUGF1c2VkIHx8IHRoaXMuaXNGaW5pc2hlZCkgcmV0dXJuIGZhbHNlOwogICAgICAgICAgdmFyIGUyID0gbnVsbCwgdDIgPSBNYXRoLm1pbih0aGlzLm1heCwgdGhpcy5pbmRleCArIDE2Mzg0KTsKICAgICAgICAgIGlmICh0aGlzLmluZGV4ID49IHRoaXMubWF4KSByZXR1cm4gdGhpcy5lbmQoKTsKICAgICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7CiAgICAgICAgICAgIGNhc2UgInN0cmluZyI6CiAgICAgICAgICAgICAgZTIgPSB0aGlzLmRhdGEuc3Vic3RyaW5nKHRoaXMuaW5kZXgsIHQyKTsKICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgY2FzZSAidWludDhhcnJheSI6CiAgICAgICAgICAgICAgZTIgPSB0aGlzLmRhdGEuc3ViYXJyYXkodGhpcy5pbmRleCwgdDIpOwogICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICBjYXNlICJhcnJheSI6CiAgICAgICAgICAgIGNhc2UgIm5vZGVidWZmZXIiOgogICAgICAgICAgICAgIGUyID0gdGhpcy5kYXRhLnNsaWNlKHRoaXMuaW5kZXgsIHQyKTsKICAgICAgICAgIH0KICAgICAgICAgIHJldHVybiB0aGlzLmluZGV4ID0gdDIsIHRoaXMucHVzaCh7IGRhdGE6IGUyLCBtZXRhOiB7IHBlcmNlbnQ6IHRoaXMubWF4ID8gdGhpcy5pbmRleCAvIHRoaXMubWF4ICogMTAwIDogMCB9IH0pOwogICAgICAgIH0sIHQuZXhwb3J0cyA9IHM7CiAgICAgIH0sIHsgIi4uL3V0aWxzIjogMzIsICIuL0dlbmVyaWNXb3JrZXIiOiAyOCB9XSwgMjg6IFtmdW5jdGlvbihlLCB0LCByKSB7CiAgICAgICAgZnVuY3Rpb24gbihlMikgewogICAgICAgICAgdGhpcy5uYW1lID0gZTIgfHwgImRlZmF1bHQiLCB0aGlzLnN0cmVhbUluZm8gPSB7fSwgdGhpcy5nZW5lcmF0ZWRFcnJvciA9IG51bGwsIHRoaXMuZXh0cmFTdHJlYW1JbmZvID0ge30sIHRoaXMuaXNQYXVzZWQgPSB0cnVlLCB0aGlzLmlzRmluaXNoZWQgPSBmYWxzZSwgdGhpcy5pc0xvY2tlZCA9IGZhbHNlLCB0aGlzLl9saXN0ZW5lcnMgPSB7IGRhdGE6IFtdLCBlbmQ6IFtdLCBlcnJvcjogW10gfSwgdGhpcy5wcmV2aW91cyA9IG51bGw7CiAgICAgICAgfQogICAgICAgIG4ucHJvdG90eXBlID0geyBwdXNoOiBmdW5jdGlvbihlMikgewogICAgICAgICAgdGhpcy5lbWl0KCJkYXRhIiwgZTIpOwogICAgICAgIH0sIGVuZDogZnVuY3Rpb24oKSB7CiAgICAgICAgICBpZiAodGhpcy5pc0ZpbmlzaGVkKSByZXR1cm4gZmFsc2U7CiAgICAgICAgICB0aGlzLmZsdXNoKCk7CiAgICAgICAgICB0cnkgewogICAgICAgICAgICB0aGlzLmVtaXQoImVuZCIpLCB0aGlzLmNsZWFuVXAoKSwgdGhpcy5pc0ZpbmlzaGVkID0gdHJ1ZTsKICAgICAgICAgIH0gY2F0Y2ggKGUyKSB7CiAgICAgICAgICAgIHRoaXMuZW1pdCgiZXJyb3IiLCBlMik7CiAgICAgICAgICB9CiAgICAgICAgICByZXR1cm4gdHJ1ZTsKICAgICAgICB9LCBlcnJvcjogZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHJldHVybiAhdGhpcy5pc0ZpbmlzaGVkICYmICh0aGlzLmlzUGF1c2VkID8gdGhpcy5nZW5lcmF0ZWRFcnJvciA9IGUyIDogKHRoaXMuaXNGaW5pc2hlZCA9IHRydWUsIHRoaXMuZW1pdCgiZXJyb3IiLCBlMiksIHRoaXMucHJldmlvdXMgJiYgdGhpcy5wcmV2aW91cy5lcnJvcihlMiksIHRoaXMuY2xlYW5VcCgpKSwgdHJ1ZSk7CiAgICAgICAgfSwgb246IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyc1tlMl0ucHVzaCh0MiksIHRoaXM7CiAgICAgICAgfSwgY2xlYW5VcDogZnVuY3Rpb24oKSB7CiAgICAgICAgICB0aGlzLnN0cmVhbUluZm8gPSB0aGlzLmdlbmVyYXRlZEVycm9yID0gdGhpcy5leHRyYVN0cmVhbUluZm8gPSBudWxsLCB0aGlzLl9saXN0ZW5lcnMgPSBbXTsKICAgICAgICB9LCBlbWl0OiBmdW5jdGlvbihlMiwgdDIpIHsKICAgICAgICAgIGlmICh0aGlzLl9saXN0ZW5lcnNbZTJdKSBmb3IgKHZhciByMiA9IDA7IHIyIDwgdGhpcy5fbGlzdGVuZXJzW2UyXS5sZW5ndGg7IHIyKyspIHRoaXMuX2xpc3RlbmVyc1tlMl1bcjJdLmNhbGwodGhpcywgdDIpOwogICAgICAgIH0sIHBpcGU6IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICByZXR1cm4gZTIucmVnaXN0ZXJQcmV2aW91cyh0aGlzKTsKICAgICAgICB9LCByZWdpc3RlclByZXZpb3VzOiBmdW5jdGlvbihlMikgewogICAgICAgICAgaWYgKHRoaXMuaXNMb2NrZWQpIHRocm93IG5ldyBFcnJvcigiVGhlIHN0cmVhbSAnIiArIHRoaXMgKyAiJyBoYXMgYWxyZWFkeSBiZWVuIHVzZWQuIik7CiAgICAgICAgICB0aGlzLnN0cmVhbUluZm8gPSBlMi5zdHJlYW1JbmZvLCB0aGlzLm1lcmdlU3RyZWFtSW5mbygpLCB0aGlzLnByZXZpb3VzID0gZTI7CiAgICAgICAgICB2YXIgdDIgPSB0aGlzOwogICAgICAgICAgcmV0dXJuIGUyLm9uKCJkYXRhIiwgZnVuY3Rpb24oZTMpIHsKICAgICAgICAgICAgdDIucHJvY2Vzc0NodW5rKGUzKTsKICAgICAgICAgIH0pLCBlMi5vbigiZW5kIiwgZnVuY3Rpb24oKSB7CiAgICAgICAgICAgIHQyLmVuZCgpOwogICAgICAgICAgfSksIGUyLm9uKCJlcnJvciIsIGZ1bmN0aW9uKGUzKSB7CiAgICAgICAgICAgIHQyLmVycm9yKGUzKTsKICAgICAgICAgIH0pLCB0aGlzOwogICAgICAgIH0sIHBhdXNlOiBmdW5jdGlvbigpIHsKICAgICAgICAgIHJldHVybiAhdGhpcy5pc1BhdXNlZCAmJiAhdGhpcy5pc0ZpbmlzaGVkICYmICh0aGlzLmlzUGF1c2VkID0gdHJ1ZSwgdGhpcy5wcmV2aW91cyAmJiB0aGlzLnByZXZpb3VzLnBhdXNlKCksIHRydWUpOwogICAgICAgIH0sIHJlc3VtZTogZnVuY3Rpb24oKSB7CiAgICAgICAgICBpZiAoIXRoaXMuaXNQYXVzZWQgfHwgdGhpcy5pc0ZpbmlzaGVkKSByZXR1cm4gZmFsc2U7CiAgICAgICAgICB2YXIgZTIgPSB0aGlzLmlzUGF1c2VkID0gZmFsc2U7CiAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZWRFcnJvciAmJiAodGhpcy5lcnJvcih0aGlzLmdlbmVyYXRlZEVycm9yKSwgZTIgPSB0cnVlKSwgdGhpcy5wcmV2aW91cyAmJiB0aGlzLnByZXZpb3VzLnJlc3VtZSgpLCAhZTI7CiAgICAgICAgfSwgZmx1c2g6IGZ1bmN0aW9uKCkgewogICAgICAgIH0sIHByb2Nlc3NDaHVuazogZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHRoaXMucHVzaChlMik7CiAgICAgICAgfSwgd2l0aFN0cmVhbUluZm86IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgcmV0dXJuIHRoaXMuZXh0cmFTdHJlYW1JbmZvW2UyXSA9IHQyLCB0aGlzLm1lcmdlU3RyZWFtSW5mbygpLCB0aGlzOwogICAgICAgIH0sIG1lcmdlU3RyZWFtSW5mbzogZnVuY3Rpb24oKSB7CiAgICAgICAgICBmb3IgKHZhciBlMiBpbiB0aGlzLmV4dHJhU3RyZWFtSW5mbykgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuZXh0cmFTdHJlYW1JbmZvLCBlMikgJiYgKHRoaXMuc3RyZWFtSW5mb1tlMl0gPSB0aGlzLmV4dHJhU3RyZWFtSW5mb1tlMl0pOwogICAgICAgIH0sIGxvY2s6IGZ1bmN0aW9uKCkgewogICAgICAgICAgaWYgKHRoaXMuaXNMb2NrZWQpIHRocm93IG5ldyBFcnJvcigiVGhlIHN0cmVhbSAnIiArIHRoaXMgKyAiJyBoYXMgYWxyZWFkeSBiZWVuIHVzZWQuIik7CiAgICAgICAgICB0aGlzLmlzTG9ja2VkID0gdHJ1ZSwgdGhpcy5wcmV2aW91cyAmJiB0aGlzLnByZXZpb3VzLmxvY2soKTsKICAgICAgICB9LCB0b1N0cmluZzogZnVuY3Rpb24oKSB7CiAgICAgICAgICB2YXIgZTIgPSAiV29ya2VyICIgKyB0aGlzLm5hbWU7CiAgICAgICAgICByZXR1cm4gdGhpcy5wcmV2aW91cyA/IHRoaXMucHJldmlvdXMgKyAiIC0+ICIgKyBlMiA6IGUyOwogICAgICAgIH0gfSwgdC5leHBvcnRzID0gbjsKICAgICAgfSwge31dLCAyOTogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICB2YXIgaCA9IGUoIi4uL3V0aWxzIiksIGkgPSBlKCIuL0NvbnZlcnRXb3JrZXIiKSwgcyA9IGUoIi4vR2VuZXJpY1dvcmtlciIpLCB1ID0gZSgiLi4vYmFzZTY0IiksIG4gPSBlKCIuLi9zdXBwb3J0IiksIGEgPSBlKCIuLi9leHRlcm5hbCIpLCBvID0gbnVsbDsKICAgICAgICBpZiAobi5ub2Rlc3RyZWFtKSB0cnkgewogICAgICAgICAgbyA9IGUoIi4uL25vZGVqcy9Ob2RlanNTdHJlYW1PdXRwdXRBZGFwdGVyIik7CiAgICAgICAgfSBjYXRjaCAoZTIpIHsKICAgICAgICB9CiAgICAgICAgZnVuY3Rpb24gbChlMiwgbzIpIHsKICAgICAgICAgIHJldHVybiBuZXcgYS5Qcm9taXNlKGZ1bmN0aW9uKHQyLCByMikgewogICAgICAgICAgICB2YXIgbjIgPSBbXSwgaTIgPSBlMi5faW50ZXJuYWxUeXBlLCBzMiA9IGUyLl9vdXRwdXRUeXBlLCBhMiA9IGUyLl9taW1lVHlwZTsKICAgICAgICAgICAgZTIub24oImRhdGEiLCBmdW5jdGlvbihlMywgdDMpIHsKICAgICAgICAgICAgICBuMi5wdXNoKGUzKSwgbzIgJiYgbzIodDMpOwogICAgICAgICAgICB9KS5vbigiZXJyb3IiLCBmdW5jdGlvbihlMykgewogICAgICAgICAgICAgIG4yID0gW10sIHIyKGUzKTsKICAgICAgICAgICAgfSkub24oImVuZCIsIGZ1bmN0aW9uKCkgewogICAgICAgICAgICAgIHRyeSB7CiAgICAgICAgICAgICAgICB2YXIgZTMgPSBmdW5jdGlvbihlNCwgdDMsIHIzKSB7CiAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZTQpIHsKICAgICAgICAgICAgICAgICAgICBjYXNlICJibG9iIjoKICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBoLm5ld0Jsb2IoaC50cmFuc2Zvcm1UbygiYXJyYXlidWZmZXIiLCB0MyksIHIzKTsKICAgICAgICAgICAgICAgICAgICBjYXNlICJiYXNlNjQiOgogICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHUuZW5jb2RlKHQzKTsKICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OgogICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGgudHJhbnNmb3JtVG8oZTQsIHQzKTsKICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfShzMiwgZnVuY3Rpb24oZTQsIHQzKSB7CiAgICAgICAgICAgICAgICAgIHZhciByMywgbjMgPSAwLCBpMyA9IG51bGwsIHMzID0gMDsKICAgICAgICAgICAgICAgICAgZm9yIChyMyA9IDA7IHIzIDwgdDMubGVuZ3RoOyByMysrKSBzMyArPSB0M1tyM10ubGVuZ3RoOwogICAgICAgICAgICAgICAgICBzd2l0Y2ggKGU0KSB7CiAgICAgICAgICAgICAgICAgICAgY2FzZSAic3RyaW5nIjoKICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0My5qb2luKCIiKTsKICAgICAgICAgICAgICAgICAgICBjYXNlICJhcnJheSI6CiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSwgdDMpOwogICAgICAgICAgICAgICAgICAgIGNhc2UgInVpbnQ4YXJyYXkiOgogICAgICAgICAgICAgICAgICAgICAgZm9yIChpMyA9IG5ldyBVaW50OEFycmF5KHMzKSwgcjMgPSAwOyByMyA8IHQzLmxlbmd0aDsgcjMrKykgaTMuc2V0KHQzW3IzXSwgbjMpLCBuMyArPSB0M1tyM10ubGVuZ3RoOwogICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGkzOwogICAgICAgICAgICAgICAgICAgIGNhc2UgIm5vZGVidWZmZXIiOgogICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEJ1ZmZlci5jb25jYXQodDMpOwogICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6CiAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoImNvbmNhdCA6IHVuc3VwcG9ydGVkIHR5cGUgJyIgKyBlNCArICInIik7CiAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0oaTIsIG4yKSwgYTIpOwogICAgICAgICAgICAgICAgdDIoZTMpOwogICAgICAgICAgICAgIH0gY2F0Y2ggKGU0KSB7CiAgICAgICAgICAgICAgICByMihlNCk7CiAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIG4yID0gW107CiAgICAgICAgICAgIH0pLnJlc3VtZSgpOwogICAgICAgICAgfSk7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIGYoZTIsIHQyLCByMikgewogICAgICAgICAgdmFyIG4yID0gdDI7CiAgICAgICAgICBzd2l0Y2ggKHQyKSB7CiAgICAgICAgICAgIGNhc2UgImJsb2IiOgogICAgICAgICAgICBjYXNlICJhcnJheWJ1ZmZlciI6CiAgICAgICAgICAgICAgbjIgPSAidWludDhhcnJheSI7CiAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgIGNhc2UgImJhc2U2NCI6CiAgICAgICAgICAgICAgbjIgPSAic3RyaW5nIjsKICAgICAgICAgIH0KICAgICAgICAgIHRyeSB7CiAgICAgICAgICAgIHRoaXMuX2ludGVybmFsVHlwZSA9IG4yLCB0aGlzLl9vdXRwdXRUeXBlID0gdDIsIHRoaXMuX21pbWVUeXBlID0gcjIsIGguY2hlY2tTdXBwb3J0KG4yKSwgdGhpcy5fd29ya2VyID0gZTIucGlwZShuZXcgaShuMikpLCBlMi5sb2NrKCk7CiAgICAgICAgICB9IGNhdGNoIChlMykgewogICAgICAgICAgICB0aGlzLl93b3JrZXIgPSBuZXcgcygiZXJyb3IiKSwgdGhpcy5fd29ya2VyLmVycm9yKGUzKTsKICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgZi5wcm90b3R5cGUgPSB7IGFjY3VtdWxhdGU6IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICByZXR1cm4gbCh0aGlzLCBlMik7CiAgICAgICAgfSwgb246IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgdmFyIHIyID0gdGhpczsKICAgICAgICAgIHJldHVybiAiZGF0YSIgPT09IGUyID8gdGhpcy5fd29ya2VyLm9uKGUyLCBmdW5jdGlvbihlMykgewogICAgICAgICAgICB0Mi5jYWxsKHIyLCBlMy5kYXRhLCBlMy5tZXRhKTsKICAgICAgICAgIH0pIDogdGhpcy5fd29ya2VyLm9uKGUyLCBmdW5jdGlvbigpIHsKICAgICAgICAgICAgaC5kZWxheSh0MiwgYXJndW1lbnRzLCByMik7CiAgICAgICAgICB9KSwgdGhpczsKICAgICAgICB9LCByZXN1bWU6IGZ1bmN0aW9uKCkgewogICAgICAgICAgcmV0dXJuIGguZGVsYXkodGhpcy5fd29ya2VyLnJlc3VtZSwgW10sIHRoaXMuX3dvcmtlciksIHRoaXM7CiAgICAgICAgfSwgcGF1c2U6IGZ1bmN0aW9uKCkgewogICAgICAgICAgcmV0dXJuIHRoaXMuX3dvcmtlci5wYXVzZSgpLCB0aGlzOwogICAgICAgIH0sIHRvTm9kZWpzU3RyZWFtOiBmdW5jdGlvbihlMikgewogICAgICAgICAgaWYgKGguY2hlY2tTdXBwb3J0KCJub2Rlc3RyZWFtIiksICJub2RlYnVmZmVyIiAhPT0gdGhpcy5fb3V0cHV0VHlwZSkgdGhyb3cgbmV3IEVycm9yKHRoaXMuX291dHB1dFR5cGUgKyAiIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhpcyBtZXRob2QiKTsKICAgICAgICAgIHJldHVybiBuZXcgbyh0aGlzLCB7IG9iamVjdE1vZGU6ICJub2RlYnVmZmVyIiAhPT0gdGhpcy5fb3V0cHV0VHlwZSB9LCBlMik7CiAgICAgICAgfSB9LCB0LmV4cG9ydHMgPSBmOwogICAgICB9LCB7ICIuLi9iYXNlNjQiOiAxLCAiLi4vZXh0ZXJuYWwiOiA2LCAiLi4vbm9kZWpzL05vZGVqc1N0cmVhbU91dHB1dEFkYXB0ZXIiOiAxMywgIi4uL3N1cHBvcnQiOiAzMCwgIi4uL3V0aWxzIjogMzIsICIuL0NvbnZlcnRXb3JrZXIiOiAyNCwgIi4vR2VuZXJpY1dvcmtlciI6IDI4IH1dLCAzMDogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICBpZiAoci5iYXNlNjQgPSB0cnVlLCByLmFycmF5ID0gdHJ1ZSwgci5zdHJpbmcgPSB0cnVlLCByLmFycmF5YnVmZmVyID0gInVuZGVmaW5lZCIgIT0gdHlwZW9mIEFycmF5QnVmZmVyICYmICJ1bmRlZmluZWQiICE9IHR5cGVvZiBVaW50OEFycmF5LCByLm5vZGVidWZmZXIgPSAidW5kZWZpbmVkIiAhPSB0eXBlb2YgQnVmZmVyLCByLnVpbnQ4YXJyYXkgPSAidW5kZWZpbmVkIiAhPSB0eXBlb2YgVWludDhBcnJheSwgInVuZGVmaW5lZCIgPT0gdHlwZW9mIEFycmF5QnVmZmVyKSByLmJsb2IgPSBmYWxzZTsKICAgICAgICBlbHNlIHsKICAgICAgICAgIHZhciBuID0gbmV3IEFycmF5QnVmZmVyKDApOwogICAgICAgICAgdHJ5IHsKICAgICAgICAgICAgci5ibG9iID0gMCA9PT0gbmV3IEJsb2IoW25dLCB7IHR5cGU6ICJhcHBsaWNhdGlvbi96aXAiIH0pLnNpemU7CiAgICAgICAgICB9IGNhdGNoIChlMikgewogICAgICAgICAgICB0cnkgewogICAgICAgICAgICAgIHZhciBpID0gbmV3IChzZWxmLkJsb2JCdWlsZGVyIHx8IHNlbGYuV2ViS2l0QmxvYkJ1aWxkZXIgfHwgc2VsZi5Nb3pCbG9iQnVpbGRlciB8fCBzZWxmLk1TQmxvYkJ1aWxkZXIpKCk7CiAgICAgICAgICAgICAgaS5hcHBlbmQobiksIHIuYmxvYiA9IDAgPT09IGkuZ2V0QmxvYigiYXBwbGljYXRpb24vemlwIikuc2l6ZTsKICAgICAgICAgICAgfSBjYXRjaCAoZTMpIHsKICAgICAgICAgICAgICByLmJsb2IgPSBmYWxzZTsKICAgICAgICAgICAgfQogICAgICAgICAgfQogICAgICAgIH0KICAgICAgICB0cnkgewogICAgICAgICAgci5ub2Rlc3RyZWFtID0gISFlKCJyZWFkYWJsZS1zdHJlYW0iKS5SZWFkYWJsZTsKICAgICAgICB9IGNhdGNoIChlMikgewogICAgICAgICAgci5ub2Rlc3RyZWFtID0gZmFsc2U7CiAgICAgICAgfQogICAgICB9LCB7ICJyZWFkYWJsZS1zdHJlYW0iOiAxNiB9XSwgMzE6IFtmdW5jdGlvbihlLCB0LCBzKSB7CiAgICAgICAgZm9yICh2YXIgbyA9IGUoIi4vdXRpbHMiKSwgaCA9IGUoIi4vc3VwcG9ydCIpLCByID0gZSgiLi9ub2RlanNVdGlscyIpLCBuID0gZSgiLi9zdHJlYW0vR2VuZXJpY1dvcmtlciIpLCB1ID0gbmV3IEFycmF5KDI1NiksIGkgPSAwOyBpIDwgMjU2OyBpKyspIHVbaV0gPSAyNTIgPD0gaSA/IDYgOiAyNDggPD0gaSA/IDUgOiAyNDAgPD0gaSA/IDQgOiAyMjQgPD0gaSA/IDMgOiAxOTIgPD0gaSA/IDIgOiAxOwogICAgICAgIHVbMjU0XSA9IHVbMjU0XSA9IDE7CiAgICAgICAgZnVuY3Rpb24gYSgpIHsKICAgICAgICAgIG4uY2FsbCh0aGlzLCAidXRmLTggZGVjb2RlIiksIHRoaXMubGVmdE92ZXIgPSBudWxsOwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBsKCkgewogICAgICAgICAgbi5jYWxsKHRoaXMsICJ1dGYtOCBlbmNvZGUiKTsKICAgICAgICB9CiAgICAgICAgcy51dGY4ZW5jb2RlID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHJldHVybiBoLm5vZGVidWZmZXIgPyByLm5ld0J1ZmZlckZyb20oZTIsICJ1dGYtOCIpIDogZnVuY3Rpb24oZTMpIHsKICAgICAgICAgICAgdmFyIHQyLCByMiwgbjIsIGkyLCBzMiwgYTIgPSBlMy5sZW5ndGgsIG8yID0gMDsKICAgICAgICAgICAgZm9yIChpMiA9IDA7IGkyIDwgYTI7IGkyKyspIDU1Mjk2ID09ICg2NDUxMiAmIChyMiA9IGUzLmNoYXJDb2RlQXQoaTIpKSkgJiYgaTIgKyAxIDwgYTIgJiYgNTYzMjAgPT0gKDY0NTEyICYgKG4yID0gZTMuY2hhckNvZGVBdChpMiArIDEpKSkgJiYgKHIyID0gNjU1MzYgKyAocjIgLSA1NTI5NiA8PCAxMCkgKyAobjIgLSA1NjMyMCksIGkyKyspLCBvMiArPSByMiA8IDEyOCA/IDEgOiByMiA8IDIwNDggPyAyIDogcjIgPCA2NTUzNiA/IDMgOiA0OwogICAgICAgICAgICBmb3IgKHQyID0gaC51aW50OGFycmF5ID8gbmV3IFVpbnQ4QXJyYXkobzIpIDogbmV3IEFycmF5KG8yKSwgaTIgPSBzMiA9IDA7IHMyIDwgbzI7IGkyKyspIDU1Mjk2ID09ICg2NDUxMiAmIChyMiA9IGUzLmNoYXJDb2RlQXQoaTIpKSkgJiYgaTIgKyAxIDwgYTIgJiYgNTYzMjAgPT0gKDY0NTEyICYgKG4yID0gZTMuY2hhckNvZGVBdChpMiArIDEpKSkgJiYgKHIyID0gNjU1MzYgKyAocjIgLSA1NTI5NiA8PCAxMCkgKyAobjIgLSA1NjMyMCksIGkyKyspLCByMiA8IDEyOCA/IHQyW3MyKytdID0gcjIgOiAocjIgPCAyMDQ4ID8gdDJbczIrK10gPSAxOTIgfCByMiA+Pj4gNiA6IChyMiA8IDY1NTM2ID8gdDJbczIrK10gPSAyMjQgfCByMiA+Pj4gMTIgOiAodDJbczIrK10gPSAyNDAgfCByMiA+Pj4gMTgsIHQyW3MyKytdID0gMTI4IHwgcjIgPj4+IDEyICYgNjMpLCB0MltzMisrXSA9IDEyOCB8IHIyID4+PiA2ICYgNjMpLCB0MltzMisrXSA9IDEyOCB8IDYzICYgcjIpOwogICAgICAgICAgICByZXR1cm4gdDI7CiAgICAgICAgICB9KGUyKTsKICAgICAgICB9LCBzLnV0ZjhkZWNvZGUgPSBmdW5jdGlvbihlMikgewogICAgICAgICAgcmV0dXJuIGgubm9kZWJ1ZmZlciA/IG8udHJhbnNmb3JtVG8oIm5vZGVidWZmZXIiLCBlMikudG9TdHJpbmcoInV0Zi04IikgOiBmdW5jdGlvbihlMykgewogICAgICAgICAgICB2YXIgdDIsIHIyLCBuMiwgaTIsIHMyID0gZTMubGVuZ3RoLCBhMiA9IG5ldyBBcnJheSgyICogczIpOwogICAgICAgICAgICBmb3IgKHQyID0gcjIgPSAwOyB0MiA8IHMyOyApIGlmICgobjIgPSBlM1t0MisrXSkgPCAxMjgpIGEyW3IyKytdID0gbjI7CiAgICAgICAgICAgIGVsc2UgaWYgKDQgPCAoaTIgPSB1W24yXSkpIGEyW3IyKytdID0gNjU1MzMsIHQyICs9IGkyIC0gMTsKICAgICAgICAgICAgZWxzZSB7CiAgICAgICAgICAgICAgZm9yIChuMiAmPSAyID09PSBpMiA/IDMxIDogMyA9PT0gaTIgPyAxNSA6IDc7IDEgPCBpMiAmJiB0MiA8IHMyOyApIG4yID0gbjIgPDwgNiB8IDYzICYgZTNbdDIrK10sIGkyLS07CiAgICAgICAgICAgICAgMSA8IGkyID8gYTJbcjIrK10gPSA2NTUzMyA6IG4yIDwgNjU1MzYgPyBhMltyMisrXSA9IG4yIDogKG4yIC09IDY1NTM2LCBhMltyMisrXSA9IDU1Mjk2IHwgbjIgPj4gMTAgJiAxMDIzLCBhMltyMisrXSA9IDU2MzIwIHwgMTAyMyAmIG4yKTsKICAgICAgICAgICAgfQogICAgICAgICAgICByZXR1cm4gYTIubGVuZ3RoICE9PSByMiAmJiAoYTIuc3ViYXJyYXkgPyBhMiA9IGEyLnN1YmFycmF5KDAsIHIyKSA6IGEyLmxlbmd0aCA9IHIyKSwgby5hcHBseUZyb21DaGFyQ29kZShhMik7CiAgICAgICAgICB9KGUyID0gby50cmFuc2Zvcm1UbyhoLnVpbnQ4YXJyYXkgPyAidWludDhhcnJheSIgOiAiYXJyYXkiLCBlMikpOwogICAgICAgIH0sIG8uaW5oZXJpdHMoYSwgbiksIGEucHJvdG90eXBlLnByb2Nlc3NDaHVuayA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICB2YXIgdDIgPSBvLnRyYW5zZm9ybVRvKGgudWludDhhcnJheSA/ICJ1aW50OGFycmF5IiA6ICJhcnJheSIsIGUyLmRhdGEpOwogICAgICAgICAgaWYgKHRoaXMubGVmdE92ZXIgJiYgdGhpcy5sZWZ0T3Zlci5sZW5ndGgpIHsKICAgICAgICAgICAgaWYgKGgudWludDhhcnJheSkgewogICAgICAgICAgICAgIHZhciByMiA9IHQyOwogICAgICAgICAgICAgICh0MiA9IG5ldyBVaW50OEFycmF5KHIyLmxlbmd0aCArIHRoaXMubGVmdE92ZXIubGVuZ3RoKSkuc2V0KHRoaXMubGVmdE92ZXIsIDApLCB0Mi5zZXQocjIsIHRoaXMubGVmdE92ZXIubGVuZ3RoKTsKICAgICAgICAgICAgfSBlbHNlIHQyID0gdGhpcy5sZWZ0T3Zlci5jb25jYXQodDIpOwogICAgICAgICAgICB0aGlzLmxlZnRPdmVyID0gbnVsbDsKICAgICAgICAgIH0KICAgICAgICAgIHZhciBuMiA9IGZ1bmN0aW9uKGUzLCB0MykgewogICAgICAgICAgICB2YXIgcjM7CiAgICAgICAgICAgIGZvciAoKHQzID0gdDMgfHwgZTMubGVuZ3RoKSA+IGUzLmxlbmd0aCAmJiAodDMgPSBlMy5sZW5ndGgpLCByMyA9IHQzIC0gMTsgMCA8PSByMyAmJiAxMjggPT0gKDE5MiAmIGUzW3IzXSk7ICkgcjMtLTsKICAgICAgICAgICAgcmV0dXJuIHIzIDwgMCA/IHQzIDogMCA9PT0gcjMgPyB0MyA6IHIzICsgdVtlM1tyM11dID4gdDMgPyByMyA6IHQzOwogICAgICAgICAgfSh0MiksIGkyID0gdDI7CiAgICAgICAgICBuMiAhPT0gdDIubGVuZ3RoICYmIChoLnVpbnQ4YXJyYXkgPyAoaTIgPSB0Mi5zdWJhcnJheSgwLCBuMiksIHRoaXMubGVmdE92ZXIgPSB0Mi5zdWJhcnJheShuMiwgdDIubGVuZ3RoKSkgOiAoaTIgPSB0Mi5zbGljZSgwLCBuMiksIHRoaXMubGVmdE92ZXIgPSB0Mi5zbGljZShuMiwgdDIubGVuZ3RoKSkpLCB0aGlzLnB1c2goeyBkYXRhOiBzLnV0ZjhkZWNvZGUoaTIpLCBtZXRhOiBlMi5tZXRhIH0pOwogICAgICAgIH0sIGEucHJvdG90eXBlLmZsdXNoID0gZnVuY3Rpb24oKSB7CiAgICAgICAgICB0aGlzLmxlZnRPdmVyICYmIHRoaXMubGVmdE92ZXIubGVuZ3RoICYmICh0aGlzLnB1c2goeyBkYXRhOiBzLnV0ZjhkZWNvZGUodGhpcy5sZWZ0T3ZlciksIG1ldGE6IHt9IH0pLCB0aGlzLmxlZnRPdmVyID0gbnVsbCk7CiAgICAgICAgfSwgcy5VdGY4RGVjb2RlV29ya2VyID0gYSwgby5pbmhlcml0cyhsLCBuKSwgbC5wcm90b3R5cGUucHJvY2Vzc0NodW5rID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHRoaXMucHVzaCh7IGRhdGE6IHMudXRmOGVuY29kZShlMi5kYXRhKSwgbWV0YTogZTIubWV0YSB9KTsKICAgICAgICB9LCBzLlV0ZjhFbmNvZGVXb3JrZXIgPSBsOwogICAgICB9LCB7ICIuL25vZGVqc1V0aWxzIjogMTQsICIuL3N0cmVhbS9HZW5lcmljV29ya2VyIjogMjgsICIuL3N1cHBvcnQiOiAzMCwgIi4vdXRpbHMiOiAzMiB9XSwgMzI6IFtmdW5jdGlvbihlLCB0LCBhKSB7CiAgICAgICAgdmFyIG8gPSBlKCIuL3N1cHBvcnQiKSwgaCA9IGUoIi4vYmFzZTY0IiksIHIgPSBlKCIuL25vZGVqc1V0aWxzIiksIHUgPSBlKCIuL2V4dGVybmFsIik7CiAgICAgICAgZnVuY3Rpb24gbihlMikgewogICAgICAgICAgcmV0dXJuIGUyOwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBsKGUyLCB0MikgewogICAgICAgICAgZm9yICh2YXIgcjIgPSAwOyByMiA8IGUyLmxlbmd0aDsgKytyMikgdDJbcjJdID0gMjU1ICYgZTIuY2hhckNvZGVBdChyMik7CiAgICAgICAgICByZXR1cm4gdDI7CiAgICAgICAgfQogICAgICAgIGUoInNldGltbWVkaWF0ZSIpLCBhLm5ld0Jsb2IgPSBmdW5jdGlvbih0MiwgcjIpIHsKICAgICAgICAgIGEuY2hlY2tTdXBwb3J0KCJibG9iIik7CiAgICAgICAgICB0cnkgewogICAgICAgICAgICByZXR1cm4gbmV3IEJsb2IoW3QyXSwgeyB0eXBlOiByMiB9KTsKICAgICAgICAgIH0gY2F0Y2ggKGUyKSB7CiAgICAgICAgICAgIHRyeSB7CiAgICAgICAgICAgICAgdmFyIG4yID0gbmV3IChzZWxmLkJsb2JCdWlsZGVyIHx8IHNlbGYuV2ViS2l0QmxvYkJ1aWxkZXIgfHwgc2VsZi5Nb3pCbG9iQnVpbGRlciB8fCBzZWxmLk1TQmxvYkJ1aWxkZXIpKCk7CiAgICAgICAgICAgICAgcmV0dXJuIG4yLmFwcGVuZCh0MiksIG4yLmdldEJsb2IocjIpOwogICAgICAgICAgICB9IGNhdGNoIChlMykgewogICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigiQnVnIDogY2FuJ3QgY29uc3RydWN0IHRoZSBCbG9iLiIpOwogICAgICAgICAgICB9CiAgICAgICAgICB9CiAgICAgICAgfTsKICAgICAgICB2YXIgaSA9IHsgc3RyaW5naWZ5QnlDaHVuazogZnVuY3Rpb24oZTIsIHQyLCByMikgewogICAgICAgICAgdmFyIG4yID0gW10sIGkyID0gMCwgczIgPSBlMi5sZW5ndGg7CiAgICAgICAgICBpZiAoczIgPD0gcjIpIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIGUyKTsKICAgICAgICAgIGZvciAoOyBpMiA8IHMyOyApICJhcnJheSIgPT09IHQyIHx8ICJub2RlYnVmZmVyIiA9PT0gdDIgPyBuMi5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgZTIuc2xpY2UoaTIsIE1hdGgubWluKGkyICsgcjIsIHMyKSkpKSA6IG4yLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBlMi5zdWJhcnJheShpMiwgTWF0aC5taW4oaTIgKyByMiwgczIpKSkpLCBpMiArPSByMjsKICAgICAgICAgIHJldHVybiBuMi5qb2luKCIiKTsKICAgICAgICB9LCBzdHJpbmdpZnlCeUNoYXI6IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICBmb3IgKHZhciB0MiA9ICIiLCByMiA9IDA7IHIyIDwgZTIubGVuZ3RoOyByMisrKSB0MiArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUyW3IyXSk7CiAgICAgICAgICByZXR1cm4gdDI7CiAgICAgICAgfSwgYXBwbHlDYW5CZVVzZWQ6IHsgdWludDhhcnJheTogZnVuY3Rpb24oKSB7CiAgICAgICAgICB0cnkgewogICAgICAgICAgICByZXR1cm4gby51aW50OGFycmF5ICYmIDEgPT09IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgbmV3IFVpbnQ4QXJyYXkoMSkpLmxlbmd0aDsKICAgICAgICAgIH0gY2F0Y2ggKGUyKSB7CiAgICAgICAgICAgIHJldHVybiBmYWxzZTsKICAgICAgICAgIH0KICAgICAgICB9KCksIG5vZGVidWZmZXI6IGZ1bmN0aW9uKCkgewogICAgICAgICAgdHJ5IHsKICAgICAgICAgICAgcmV0dXJuIG8ubm9kZWJ1ZmZlciAmJiAxID09PSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIHIuYWxsb2NCdWZmZXIoMSkpLmxlbmd0aDsKICAgICAgICAgIH0gY2F0Y2ggKGUyKSB7CiAgICAgICAgICAgIHJldHVybiBmYWxzZTsKICAgICAgICAgIH0KICAgICAgICB9KCkgfSB9OwogICAgICAgIGZ1bmN0aW9uIHMoZTIpIHsKICAgICAgICAgIHZhciB0MiA9IDY1NTM2LCByMiA9IGEuZ2V0VHlwZU9mKGUyKSwgbjIgPSB0cnVlOwogICAgICAgICAgaWYgKCJ1aW50OGFycmF5IiA9PT0gcjIgPyBuMiA9IGkuYXBwbHlDYW5CZVVzZWQudWludDhhcnJheSA6ICJub2RlYnVmZmVyIiA9PT0gcjIgJiYgKG4yID0gaS5hcHBseUNhbkJlVXNlZC5ub2RlYnVmZmVyKSwgbjIpIGZvciAoOyAxIDwgdDI7ICkgdHJ5IHsKICAgICAgICAgICAgcmV0dXJuIGkuc3RyaW5naWZ5QnlDaHVuayhlMiwgcjIsIHQyKTsKICAgICAgICAgIH0gY2F0Y2ggKGUzKSB7CiAgICAgICAgICAgIHQyID0gTWF0aC5mbG9vcih0MiAvIDIpOwogICAgICAgICAgfQogICAgICAgICAgcmV0dXJuIGkuc3RyaW5naWZ5QnlDaGFyKGUyKTsKICAgICAgICB9CiAgICAgICAgZnVuY3Rpb24gZihlMiwgdDIpIHsKICAgICAgICAgIGZvciAodmFyIHIyID0gMDsgcjIgPCBlMi5sZW5ndGg7IHIyKyspIHQyW3IyXSA9IGUyW3IyXTsKICAgICAgICAgIHJldHVybiB0MjsKICAgICAgICB9CiAgICAgICAgYS5hcHBseUZyb21DaGFyQ29kZSA9IHM7CiAgICAgICAgdmFyIGMgPSB7fTsKICAgICAgICBjLnN0cmluZyA9IHsgc3RyaW5nOiBuLCBhcnJheTogZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHJldHVybiBsKGUyLCBuZXcgQXJyYXkoZTIubGVuZ3RoKSk7CiAgICAgICAgfSwgYXJyYXlidWZmZXI6IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICByZXR1cm4gYy5zdHJpbmcudWludDhhcnJheShlMikuYnVmZmVyOwogICAgICAgIH0sIHVpbnQ4YXJyYXk6IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICByZXR1cm4gbChlMiwgbmV3IFVpbnQ4QXJyYXkoZTIubGVuZ3RoKSk7CiAgICAgICAgfSwgbm9kZWJ1ZmZlcjogZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHJldHVybiBsKGUyLCByLmFsbG9jQnVmZmVyKGUyLmxlbmd0aCkpOwogICAgICAgIH0gfSwgYy5hcnJheSA9IHsgc3RyaW5nOiBzLCBhcnJheTogbiwgYXJyYXlidWZmZXI6IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoZTIpLmJ1ZmZlcjsKICAgICAgICB9LCB1aW50OGFycmF5OiBmdW5jdGlvbihlMikgewogICAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGUyKTsKICAgICAgICB9LCBub2RlYnVmZmVyOiBmdW5jdGlvbihlMikgewogICAgICAgICAgcmV0dXJuIHIubmV3QnVmZmVyRnJvbShlMik7CiAgICAgICAgfSB9LCBjLmFycmF5YnVmZmVyID0geyBzdHJpbmc6IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICByZXR1cm4gcyhuZXcgVWludDhBcnJheShlMikpOwogICAgICAgIH0sIGFycmF5OiBmdW5jdGlvbihlMikgewogICAgICAgICAgcmV0dXJuIGYobmV3IFVpbnQ4QXJyYXkoZTIpLCBuZXcgQXJyYXkoZTIuYnl0ZUxlbmd0aCkpOwogICAgICAgIH0sIGFycmF5YnVmZmVyOiBuLCB1aW50OGFycmF5OiBmdW5jdGlvbihlMikgewogICAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGUyKTsKICAgICAgICB9LCBub2RlYnVmZmVyOiBmdW5jdGlvbihlMikgewogICAgICAgICAgcmV0dXJuIHIubmV3QnVmZmVyRnJvbShuZXcgVWludDhBcnJheShlMikpOwogICAgICAgIH0gfSwgYy51aW50OGFycmF5ID0geyBzdHJpbmc6IHMsIGFycmF5OiBmdW5jdGlvbihlMikgewogICAgICAgICAgcmV0dXJuIGYoZTIsIG5ldyBBcnJheShlMi5sZW5ndGgpKTsKICAgICAgICB9LCBhcnJheWJ1ZmZlcjogZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHJldHVybiBlMi5idWZmZXI7CiAgICAgICAgfSwgdWludDhhcnJheTogbiwgbm9kZWJ1ZmZlcjogZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHJldHVybiByLm5ld0J1ZmZlckZyb20oZTIpOwogICAgICAgIH0gfSwgYy5ub2RlYnVmZmVyID0geyBzdHJpbmc6IHMsIGFycmF5OiBmdW5jdGlvbihlMikgewogICAgICAgICAgcmV0dXJuIGYoZTIsIG5ldyBBcnJheShlMi5sZW5ndGgpKTsKICAgICAgICB9LCBhcnJheWJ1ZmZlcjogZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHJldHVybiBjLm5vZGVidWZmZXIudWludDhhcnJheShlMikuYnVmZmVyOwogICAgICAgIH0sIHVpbnQ4YXJyYXk6IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICByZXR1cm4gZihlMiwgbmV3IFVpbnQ4QXJyYXkoZTIubGVuZ3RoKSk7CiAgICAgICAgfSwgbm9kZWJ1ZmZlcjogbiB9LCBhLnRyYW5zZm9ybVRvID0gZnVuY3Rpb24oZTIsIHQyKSB7CiAgICAgICAgICBpZiAodDIgPSB0MiB8fCAiIiwgIWUyKSByZXR1cm4gdDI7CiAgICAgICAgICBhLmNoZWNrU3VwcG9ydChlMik7CiAgICAgICAgICB2YXIgcjIgPSBhLmdldFR5cGVPZih0Mik7CiAgICAgICAgICByZXR1cm4gY1tyMl1bZTJdKHQyKTsKICAgICAgICB9LCBhLnJlc29sdmUgPSBmdW5jdGlvbihlMikgewogICAgICAgICAgZm9yICh2YXIgdDIgPSBlMi5zcGxpdCgiLyIpLCByMiA9IFtdLCBuMiA9IDA7IG4yIDwgdDIubGVuZ3RoOyBuMisrKSB7CiAgICAgICAgICAgIHZhciBpMiA9IHQyW24yXTsKICAgICAgICAgICAgIi4iID09PSBpMiB8fCAiIiA9PT0gaTIgJiYgMCAhPT0gbjIgJiYgbjIgIT09IHQyLmxlbmd0aCAtIDEgfHwgKCIuLiIgPT09IGkyID8gcjIucG9wKCkgOiByMi5wdXNoKGkyKSk7CiAgICAgICAgICB9CiAgICAgICAgICByZXR1cm4gcjIuam9pbigiLyIpOwogICAgICAgIH0sIGEuZ2V0VHlwZU9mID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHJldHVybiAic3RyaW5nIiA9PSB0eXBlb2YgZTIgPyAic3RyaW5nIiA6ICJbb2JqZWN0IEFycmF5XSIgPT09IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlMikgPyAiYXJyYXkiIDogby5ub2RlYnVmZmVyICYmIHIuaXNCdWZmZXIoZTIpID8gIm5vZGVidWZmZXIiIDogby51aW50OGFycmF5ICYmIGUyIGluc3RhbmNlb2YgVWludDhBcnJheSA/ICJ1aW50OGFycmF5IiA6IG8uYXJyYXlidWZmZXIgJiYgZTIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciA/ICJhcnJheWJ1ZmZlciIgOiB2b2lkIDA7CiAgICAgICAgfSwgYS5jaGVja1N1cHBvcnQgPSBmdW5jdGlvbihlMikgewogICAgICAgICAgaWYgKCFvW2UyLnRvTG93ZXJDYXNlKCldKSB0aHJvdyBuZXcgRXJyb3IoZTIgKyAiIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhpcyBwbGF0Zm9ybSIpOwogICAgICAgIH0sIGEuTUFYX1ZBTFVFXzE2QklUUyA9IDY1NTM1LCBhLk1BWF9WQUxVRV8zMkJJVFMgPSAtMSwgYS5wcmV0dHkgPSBmdW5jdGlvbihlMikgewogICAgICAgICAgdmFyIHQyLCByMiwgbjIgPSAiIjsKICAgICAgICAgIGZvciAocjIgPSAwOyByMiA8IChlMiB8fCAiIikubGVuZ3RoOyByMisrKSBuMiArPSAiXFx4IiArICgodDIgPSBlMi5jaGFyQ29kZUF0KHIyKSkgPCAxNiA/ICIwIiA6ICIiKSArIHQyLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpOwogICAgICAgICAgcmV0dXJuIG4yOwogICAgICAgIH0sIGEuZGVsYXkgPSBmdW5jdGlvbihlMiwgdDIsIHIyKSB7CiAgICAgICAgICBzZXRJbW1lZGlhdGUoZnVuY3Rpb24oKSB7CiAgICAgICAgICAgIGUyLmFwcGx5KHIyIHx8IG51bGwsIHQyIHx8IFtdKTsKICAgICAgICAgIH0pOwogICAgICAgIH0sIGEuaW5oZXJpdHMgPSBmdW5jdGlvbihlMiwgdDIpIHsKICAgICAgICAgIGZ1bmN0aW9uIHIyKCkgewogICAgICAgICAgfQogICAgICAgICAgcjIucHJvdG90eXBlID0gdDIucHJvdG90eXBlLCBlMi5wcm90b3R5cGUgPSBuZXcgcjIoKTsKICAgICAgICB9LCBhLmV4dGVuZCA9IGZ1bmN0aW9uKCkgewogICAgICAgICAgdmFyIGUyLCB0MiwgcjIgPSB7fTsKICAgICAgICAgIGZvciAoZTIgPSAwOyBlMiA8IGFyZ3VtZW50cy5sZW5ndGg7IGUyKyspIGZvciAodDIgaW4gYXJndW1lbnRzW2UyXSkgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFyZ3VtZW50c1tlMl0sIHQyKSAmJiB2b2lkIDAgPT09IHIyW3QyXSAmJiAocjJbdDJdID0gYXJndW1lbnRzW2UyXVt0Ml0pOwogICAgICAgICAgcmV0dXJuIHIyOwogICAgICAgIH0sIGEucHJlcGFyZUNvbnRlbnQgPSBmdW5jdGlvbihyMiwgZTIsIG4yLCBpMiwgczIpIHsKICAgICAgICAgIHJldHVybiB1LlByb21pc2UucmVzb2x2ZShlMikudGhlbihmdW5jdGlvbihuMykgewogICAgICAgICAgICByZXR1cm4gby5ibG9iICYmIChuMyBpbnN0YW5jZW9mIEJsb2IgfHwgLTEgIT09IFsiW29iamVjdCBGaWxlXSIsICJbb2JqZWN0IEJsb2JdIl0uaW5kZXhPZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobjMpKSkgJiYgInVuZGVmaW5lZCIgIT0gdHlwZW9mIEZpbGVSZWFkZXIgPyBuZXcgdS5Qcm9taXNlKGZ1bmN0aW9uKHQyLCByMykgewogICAgICAgICAgICAgIHZhciBlMyA9IG5ldyBGaWxlUmVhZGVyKCk7CiAgICAgICAgICAgICAgZTMub25sb2FkID0gZnVuY3Rpb24oZTQpIHsKICAgICAgICAgICAgICAgIHQyKGU0LnRhcmdldC5yZXN1bHQpOwogICAgICAgICAgICAgIH0sIGUzLm9uZXJyb3IgPSBmdW5jdGlvbihlNCkgewogICAgICAgICAgICAgICAgcjMoZTQudGFyZ2V0LmVycm9yKTsKICAgICAgICAgICAgICB9LCBlMy5yZWFkQXNBcnJheUJ1ZmZlcihuMyk7CiAgICAgICAgICAgIH0pIDogbjM7CiAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKGUzKSB7CiAgICAgICAgICAgIHZhciB0MiA9IGEuZ2V0VHlwZU9mKGUzKTsKICAgICAgICAgICAgcmV0dXJuIHQyID8gKCJhcnJheWJ1ZmZlciIgPT09IHQyID8gZTMgPSBhLnRyYW5zZm9ybVRvKCJ1aW50OGFycmF5IiwgZTMpIDogInN0cmluZyIgPT09IHQyICYmIChzMiA/IGUzID0gaC5kZWNvZGUoZTMpIDogbjIgJiYgdHJ1ZSAhPT0gaTIgJiYgKGUzID0gZnVuY3Rpb24oZTQpIHsKICAgICAgICAgICAgICByZXR1cm4gbChlNCwgby51aW50OGFycmF5ID8gbmV3IFVpbnQ4QXJyYXkoZTQubGVuZ3RoKSA6IG5ldyBBcnJheShlNC5sZW5ndGgpKTsKICAgICAgICAgICAgfShlMykpKSwgZTMpIDogdS5Qcm9taXNlLnJlamVjdChuZXcgRXJyb3IoIkNhbid0IHJlYWQgdGhlIGRhdGEgb2YgJyIgKyByMiArICInLiBJcyBpdCBpbiBhIHN1cHBvcnRlZCBKYXZhU2NyaXB0IHR5cGUgKFN0cmluZywgQmxvYiwgQXJyYXlCdWZmZXIsIGV0YykgPyIpKTsKICAgICAgICAgIH0pOwogICAgICAgIH07CiAgICAgIH0sIHsgIi4vYmFzZTY0IjogMSwgIi4vZXh0ZXJuYWwiOiA2LCAiLi9ub2RlanNVdGlscyI6IDE0LCAiLi9zdXBwb3J0IjogMzAsIHNldGltbWVkaWF0ZTogNTQgfV0sIDMzOiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIHZhciBuID0gZSgiLi9yZWFkZXIvcmVhZGVyRm9yIiksIGkgPSBlKCIuL3V0aWxzIiksIHMgPSBlKCIuL3NpZ25hdHVyZSIpLCBhID0gZSgiLi96aXBFbnRyeSIpLCBvID0gZSgiLi9zdXBwb3J0Iik7CiAgICAgICAgZnVuY3Rpb24gaChlMikgewogICAgICAgICAgdGhpcy5maWxlcyA9IFtdLCB0aGlzLmxvYWRPcHRpb25zID0gZTI7CiAgICAgICAgfQogICAgICAgIGgucHJvdG90eXBlID0geyBjaGVja1NpZ25hdHVyZTogZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIGlmICghdGhpcy5yZWFkZXIucmVhZEFuZENoZWNrU2lnbmF0dXJlKGUyKSkgewogICAgICAgICAgICB0aGlzLnJlYWRlci5pbmRleCAtPSA0OwogICAgICAgICAgICB2YXIgdDIgPSB0aGlzLnJlYWRlci5yZWFkU3RyaW5nKDQpOwogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIkNvcnJ1cHRlZCB6aXAgb3IgYnVnOiB1bmV4cGVjdGVkIHNpZ25hdHVyZSAoIiArIGkucHJldHR5KHQyKSArICIsIGV4cGVjdGVkICIgKyBpLnByZXR0eShlMikgKyAiKSIpOwogICAgICAgICAgfQogICAgICAgIH0sIGlzU2lnbmF0dXJlOiBmdW5jdGlvbihlMiwgdDIpIHsKICAgICAgICAgIHZhciByMiA9IHRoaXMucmVhZGVyLmluZGV4OwogICAgICAgICAgdGhpcy5yZWFkZXIuc2V0SW5kZXgoZTIpOwogICAgICAgICAgdmFyIG4yID0gdGhpcy5yZWFkZXIucmVhZFN0cmluZyg0KSA9PT0gdDI7CiAgICAgICAgICByZXR1cm4gdGhpcy5yZWFkZXIuc2V0SW5kZXgocjIpLCBuMjsKICAgICAgICB9LCByZWFkQmxvY2tFbmRPZkNlbnRyYWw6IGZ1bmN0aW9uKCkgewogICAgICAgICAgdGhpcy5kaXNrTnVtYmVyID0gdGhpcy5yZWFkZXIucmVhZEludCgyKSwgdGhpcy5kaXNrV2l0aENlbnRyYWxEaXJTdGFydCA9IHRoaXMucmVhZGVyLnJlYWRJbnQoMiksIHRoaXMuY2VudHJhbERpclJlY29yZHNPblRoaXNEaXNrID0gdGhpcy5yZWFkZXIucmVhZEludCgyKSwgdGhpcy5jZW50cmFsRGlyUmVjb3JkcyA9IHRoaXMucmVhZGVyLnJlYWRJbnQoMiksIHRoaXMuY2VudHJhbERpclNpemUgPSB0aGlzLnJlYWRlci5yZWFkSW50KDQpLCB0aGlzLmNlbnRyYWxEaXJPZmZzZXQgPSB0aGlzLnJlYWRlci5yZWFkSW50KDQpLCB0aGlzLnppcENvbW1lbnRMZW5ndGggPSB0aGlzLnJlYWRlci5yZWFkSW50KDIpOwogICAgICAgICAgdmFyIGUyID0gdGhpcy5yZWFkZXIucmVhZERhdGEodGhpcy56aXBDb21tZW50TGVuZ3RoKSwgdDIgPSBvLnVpbnQ4YXJyYXkgPyAidWludDhhcnJheSIgOiAiYXJyYXkiLCByMiA9IGkudHJhbnNmb3JtVG8odDIsIGUyKTsKICAgICAgICAgIHRoaXMuemlwQ29tbWVudCA9IHRoaXMubG9hZE9wdGlvbnMuZGVjb2RlRmlsZU5hbWUocjIpOwogICAgICAgIH0sIHJlYWRCbG9ja1ppcDY0RW5kT2ZDZW50cmFsOiBmdW5jdGlvbigpIHsKICAgICAgICAgIHRoaXMuemlwNjRFbmRPZkNlbnRyYWxTaXplID0gdGhpcy5yZWFkZXIucmVhZEludCg4KSwgdGhpcy5yZWFkZXIuc2tpcCg0KSwgdGhpcy5kaXNrTnVtYmVyID0gdGhpcy5yZWFkZXIucmVhZEludCg0KSwgdGhpcy5kaXNrV2l0aENlbnRyYWxEaXJTdGFydCA9IHRoaXMucmVhZGVyLnJlYWRJbnQoNCksIHRoaXMuY2VudHJhbERpclJlY29yZHNPblRoaXNEaXNrID0gdGhpcy5yZWFkZXIucmVhZEludCg4KSwgdGhpcy5jZW50cmFsRGlyUmVjb3JkcyA9IHRoaXMucmVhZGVyLnJlYWRJbnQoOCksIHRoaXMuY2VudHJhbERpclNpemUgPSB0aGlzLnJlYWRlci5yZWFkSW50KDgpLCB0aGlzLmNlbnRyYWxEaXJPZmZzZXQgPSB0aGlzLnJlYWRlci5yZWFkSW50KDgpLCB0aGlzLnppcDY0RXh0ZW5zaWJsZURhdGEgPSB7fTsKICAgICAgICAgIGZvciAodmFyIGUyLCB0MiwgcjIsIG4yID0gdGhpcy56aXA2NEVuZE9mQ2VudHJhbFNpemUgLSA0NDsgMCA8IG4yOyApIGUyID0gdGhpcy5yZWFkZXIucmVhZEludCgyKSwgdDIgPSB0aGlzLnJlYWRlci5yZWFkSW50KDQpLCByMiA9IHRoaXMucmVhZGVyLnJlYWREYXRhKHQyKSwgdGhpcy56aXA2NEV4dGVuc2libGVEYXRhW2UyXSA9IHsgaWQ6IGUyLCBsZW5ndGg6IHQyLCB2YWx1ZTogcjIgfTsKICAgICAgICB9LCByZWFkQmxvY2taaXA2NEVuZE9mQ2VudHJhbExvY2F0b3I6IGZ1bmN0aW9uKCkgewogICAgICAgICAgaWYgKHRoaXMuZGlza1dpdGhaaXA2NENlbnRyYWxEaXJTdGFydCA9IHRoaXMucmVhZGVyLnJlYWRJbnQoNCksIHRoaXMucmVsYXRpdmVPZmZzZXRFbmRPZlppcDY0Q2VudHJhbERpciA9IHRoaXMucmVhZGVyLnJlYWRJbnQoOCksIHRoaXMuZGlza3NDb3VudCA9IHRoaXMucmVhZGVyLnJlYWRJbnQoNCksIDEgPCB0aGlzLmRpc2tzQ291bnQpIHRocm93IG5ldyBFcnJvcigiTXVsdGktdm9sdW1lcyB6aXAgYXJlIG5vdCBzdXBwb3J0ZWQiKTsKICAgICAgICB9LCByZWFkTG9jYWxGaWxlczogZnVuY3Rpb24oKSB7CiAgICAgICAgICB2YXIgZTIsIHQyOwogICAgICAgICAgZm9yIChlMiA9IDA7IGUyIDwgdGhpcy5maWxlcy5sZW5ndGg7IGUyKyspIHQyID0gdGhpcy5maWxlc1tlMl0sIHRoaXMucmVhZGVyLnNldEluZGV4KHQyLmxvY2FsSGVhZGVyT2Zmc2V0KSwgdGhpcy5jaGVja1NpZ25hdHVyZShzLkxPQ0FMX0ZJTEVfSEVBREVSKSwgdDIucmVhZExvY2FsUGFydCh0aGlzLnJlYWRlciksIHQyLmhhbmRsZVVURjgoKSwgdDIucHJvY2Vzc0F0dHJpYnV0ZXMoKTsKICAgICAgICB9LCByZWFkQ2VudHJhbERpcjogZnVuY3Rpb24oKSB7CiAgICAgICAgICB2YXIgZTI7CiAgICAgICAgICBmb3IgKHRoaXMucmVhZGVyLnNldEluZGV4KHRoaXMuY2VudHJhbERpck9mZnNldCk7IHRoaXMucmVhZGVyLnJlYWRBbmRDaGVja1NpZ25hdHVyZShzLkNFTlRSQUxfRklMRV9IRUFERVIpOyApIChlMiA9IG5ldyBhKHsgemlwNjQ6IHRoaXMuemlwNjQgfSwgdGhpcy5sb2FkT3B0aW9ucykpLnJlYWRDZW50cmFsUGFydCh0aGlzLnJlYWRlciksIHRoaXMuZmlsZXMucHVzaChlMik7CiAgICAgICAgICBpZiAodGhpcy5jZW50cmFsRGlyUmVjb3JkcyAhPT0gdGhpcy5maWxlcy5sZW5ndGggJiYgMCAhPT0gdGhpcy5jZW50cmFsRGlyUmVjb3JkcyAmJiAwID09PSB0aGlzLmZpbGVzLmxlbmd0aCkgdGhyb3cgbmV3IEVycm9yKCJDb3JydXB0ZWQgemlwIG9yIGJ1ZzogZXhwZWN0ZWQgIiArIHRoaXMuY2VudHJhbERpclJlY29yZHMgKyAiIHJlY29yZHMgaW4gY2VudHJhbCBkaXIsIGdvdCAiICsgdGhpcy5maWxlcy5sZW5ndGgpOwogICAgICAgIH0sIHJlYWRFbmRPZkNlbnRyYWw6IGZ1bmN0aW9uKCkgewogICAgICAgICAgdmFyIGUyID0gdGhpcy5yZWFkZXIubGFzdEluZGV4T2ZTaWduYXR1cmUocy5DRU5UUkFMX0RJUkVDVE9SWV9FTkQpOwogICAgICAgICAgaWYgKGUyIDwgMCkgdGhyb3cgIXRoaXMuaXNTaWduYXR1cmUoMCwgcy5MT0NBTF9GSUxFX0hFQURFUikgPyBuZXcgRXJyb3IoIkNhbid0IGZpbmQgZW5kIG9mIGNlbnRyYWwgZGlyZWN0b3J5IDogaXMgdGhpcyBhIHppcCBmaWxlID8gSWYgaXQgaXMsIHNlZSBodHRwczovL3N0dWsuZ2l0aHViLmlvL2pzemlwL2RvY3VtZW50YXRpb24vaG93dG8vcmVhZF96aXAuaHRtbCIpIDogbmV3IEVycm9yKCJDb3JydXB0ZWQgemlwOiBjYW4ndCBmaW5kIGVuZCBvZiBjZW50cmFsIGRpcmVjdG9yeSIpOwogICAgICAgICAgdGhpcy5yZWFkZXIuc2V0SW5kZXgoZTIpOwogICAgICAgICAgdmFyIHQyID0gZTI7CiAgICAgICAgICBpZiAodGhpcy5jaGVja1NpZ25hdHVyZShzLkNFTlRSQUxfRElSRUNUT1JZX0VORCksIHRoaXMucmVhZEJsb2NrRW5kT2ZDZW50cmFsKCksIHRoaXMuZGlza051bWJlciA9PT0gaS5NQVhfVkFMVUVfMTZCSVRTIHx8IHRoaXMuZGlza1dpdGhDZW50cmFsRGlyU3RhcnQgPT09IGkuTUFYX1ZBTFVFXzE2QklUUyB8fCB0aGlzLmNlbnRyYWxEaXJSZWNvcmRzT25UaGlzRGlzayA9PT0gaS5NQVhfVkFMVUVfMTZCSVRTIHx8IHRoaXMuY2VudHJhbERpclJlY29yZHMgPT09IGkuTUFYX1ZBTFVFXzE2QklUUyB8fCB0aGlzLmNlbnRyYWxEaXJTaXplID09PSBpLk1BWF9WQUxVRV8zMkJJVFMgfHwgdGhpcy5jZW50cmFsRGlyT2Zmc2V0ID09PSBpLk1BWF9WQUxVRV8zMkJJVFMpIHsKICAgICAgICAgICAgaWYgKHRoaXMuemlwNjQgPSB0cnVlLCAoZTIgPSB0aGlzLnJlYWRlci5sYXN0SW5kZXhPZlNpZ25hdHVyZShzLlpJUDY0X0NFTlRSQUxfRElSRUNUT1JZX0xPQ0FUT1IpKSA8IDApIHRocm93IG5ldyBFcnJvcigiQ29ycnVwdGVkIHppcDogY2FuJ3QgZmluZCB0aGUgWklQNjQgZW5kIG9mIGNlbnRyYWwgZGlyZWN0b3J5IGxvY2F0b3IiKTsKICAgICAgICAgICAgaWYgKHRoaXMucmVhZGVyLnNldEluZGV4KGUyKSwgdGhpcy5jaGVja1NpZ25hdHVyZShzLlpJUDY0X0NFTlRSQUxfRElSRUNUT1JZX0xPQ0FUT1IpLCB0aGlzLnJlYWRCbG9ja1ppcDY0RW5kT2ZDZW50cmFsTG9jYXRvcigpLCAhdGhpcy5pc1NpZ25hdHVyZSh0aGlzLnJlbGF0aXZlT2Zmc2V0RW5kT2ZaaXA2NENlbnRyYWxEaXIsIHMuWklQNjRfQ0VOVFJBTF9ESVJFQ1RPUllfRU5EKSAmJiAodGhpcy5yZWxhdGl2ZU9mZnNldEVuZE9mWmlwNjRDZW50cmFsRGlyID0gdGhpcy5yZWFkZXIubGFzdEluZGV4T2ZTaWduYXR1cmUocy5aSVA2NF9DRU5UUkFMX0RJUkVDVE9SWV9FTkQpLCB0aGlzLnJlbGF0aXZlT2Zmc2V0RW5kT2ZaaXA2NENlbnRyYWxEaXIgPCAwKSkgdGhyb3cgbmV3IEVycm9yKCJDb3JydXB0ZWQgemlwOiBjYW4ndCBmaW5kIHRoZSBaSVA2NCBlbmQgb2YgY2VudHJhbCBkaXJlY3RvcnkiKTsKICAgICAgICAgICAgdGhpcy5yZWFkZXIuc2V0SW5kZXgodGhpcy5yZWxhdGl2ZU9mZnNldEVuZE9mWmlwNjRDZW50cmFsRGlyKSwgdGhpcy5jaGVja1NpZ25hdHVyZShzLlpJUDY0X0NFTlRSQUxfRElSRUNUT1JZX0VORCksIHRoaXMucmVhZEJsb2NrWmlwNjRFbmRPZkNlbnRyYWwoKTsKICAgICAgICAgIH0KICAgICAgICAgIHZhciByMiA9IHRoaXMuY2VudHJhbERpck9mZnNldCArIHRoaXMuY2VudHJhbERpclNpemU7CiAgICAgICAgICB0aGlzLnppcDY0ICYmIChyMiArPSAyMCwgcjIgKz0gMTIgKyB0aGlzLnppcDY0RW5kT2ZDZW50cmFsU2l6ZSk7CiAgICAgICAgICB2YXIgbjIgPSB0MiAtIHIyOwogICAgICAgICAgaWYgKDAgPCBuMikgdGhpcy5pc1NpZ25hdHVyZSh0Miwgcy5DRU5UUkFMX0ZJTEVfSEVBREVSKSB8fCAodGhpcy5yZWFkZXIuemVybyA9IG4yKTsKICAgICAgICAgIGVsc2UgaWYgKG4yIDwgMCkgdGhyb3cgbmV3IEVycm9yKCJDb3JydXB0ZWQgemlwOiBtaXNzaW5nICIgKyBNYXRoLmFicyhuMikgKyAiIGJ5dGVzLiIpOwogICAgICAgIH0sIHByZXBhcmVSZWFkZXI6IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICB0aGlzLnJlYWRlciA9IG4oZTIpOwogICAgICAgIH0sIGxvYWQ6IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICB0aGlzLnByZXBhcmVSZWFkZXIoZTIpLCB0aGlzLnJlYWRFbmRPZkNlbnRyYWwoKSwgdGhpcy5yZWFkQ2VudHJhbERpcigpLCB0aGlzLnJlYWRMb2NhbEZpbGVzKCk7CiAgICAgICAgfSB9LCB0LmV4cG9ydHMgPSBoOwogICAgICB9LCB7ICIuL3JlYWRlci9yZWFkZXJGb3IiOiAyMiwgIi4vc2lnbmF0dXJlIjogMjMsICIuL3N1cHBvcnQiOiAzMCwgIi4vdXRpbHMiOiAzMiwgIi4vemlwRW50cnkiOiAzNCB9XSwgMzQ6IFtmdW5jdGlvbihlLCB0LCByKSB7CiAgICAgICAgdmFyIG4gPSBlKCIuL3JlYWRlci9yZWFkZXJGb3IiKSwgcyA9IGUoIi4vdXRpbHMiKSwgaSA9IGUoIi4vY29tcHJlc3NlZE9iamVjdCIpLCBhID0gZSgiLi9jcmMzMiIpLCBvID0gZSgiLi91dGY4IiksIGggPSBlKCIuL2NvbXByZXNzaW9ucyIpLCB1ID0gZSgiLi9zdXBwb3J0Iik7CiAgICAgICAgZnVuY3Rpb24gbChlMiwgdDIpIHsKICAgICAgICAgIHRoaXMub3B0aW9ucyA9IGUyLCB0aGlzLmxvYWRPcHRpb25zID0gdDI7CiAgICAgICAgfQogICAgICAgIGwucHJvdG90eXBlID0geyBpc0VuY3J5cHRlZDogZnVuY3Rpb24oKSB7CiAgICAgICAgICByZXR1cm4gMSA9PSAoMSAmIHRoaXMuYml0RmxhZyk7CiAgICAgICAgfSwgdXNlVVRGODogZnVuY3Rpb24oKSB7CiAgICAgICAgICByZXR1cm4gMjA0OCA9PSAoMjA0OCAmIHRoaXMuYml0RmxhZyk7CiAgICAgICAgfSwgcmVhZExvY2FsUGFydDogZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHZhciB0MiwgcjI7CiAgICAgICAgICBpZiAoZTIuc2tpcCgyMiksIHRoaXMuZmlsZU5hbWVMZW5ndGggPSBlMi5yZWFkSW50KDIpLCByMiA9IGUyLnJlYWRJbnQoMiksIHRoaXMuZmlsZU5hbWUgPSBlMi5yZWFkRGF0YSh0aGlzLmZpbGVOYW1lTGVuZ3RoKSwgZTIuc2tpcChyMiksIC0xID09PSB0aGlzLmNvbXByZXNzZWRTaXplIHx8IC0xID09PSB0aGlzLnVuY29tcHJlc3NlZFNpemUpIHRocm93IG5ldyBFcnJvcigiQnVnIG9yIGNvcnJ1cHRlZCB6aXAgOiBkaWRuJ3QgZ2V0IGVub3VnaCBpbmZvcm1hdGlvbiBmcm9tIHRoZSBjZW50cmFsIGRpcmVjdG9yeSAoY29tcHJlc3NlZFNpemUgPT09IC0xIHx8IHVuY29tcHJlc3NlZFNpemUgPT09IC0xKSIpOwogICAgICAgICAgaWYgKG51bGwgPT09ICh0MiA9IGZ1bmN0aW9uKGUzKSB7CiAgICAgICAgICAgIGZvciAodmFyIHQzIGluIGgpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaCwgdDMpICYmIGhbdDNdLm1hZ2ljID09PSBlMykgcmV0dXJuIGhbdDNdOwogICAgICAgICAgICByZXR1cm4gbnVsbDsKICAgICAgICAgIH0odGhpcy5jb21wcmVzc2lvbk1ldGhvZCkpKSB0aHJvdyBuZXcgRXJyb3IoIkNvcnJ1cHRlZCB6aXAgOiBjb21wcmVzc2lvbiAiICsgcy5wcmV0dHkodGhpcy5jb21wcmVzc2lvbk1ldGhvZCkgKyAiIHVua25vd24gKGlubmVyIGZpbGUgOiAiICsgcy50cmFuc2Zvcm1Ubygic3RyaW5nIiwgdGhpcy5maWxlTmFtZSkgKyAiKSIpOwogICAgICAgICAgdGhpcy5kZWNvbXByZXNzZWQgPSBuZXcgaSh0aGlzLmNvbXByZXNzZWRTaXplLCB0aGlzLnVuY29tcHJlc3NlZFNpemUsIHRoaXMuY3JjMzIsIHQyLCBlMi5yZWFkRGF0YSh0aGlzLmNvbXByZXNzZWRTaXplKSk7CiAgICAgICAgfSwgcmVhZENlbnRyYWxQYXJ0OiBmdW5jdGlvbihlMikgewogICAgICAgICAgdGhpcy52ZXJzaW9uTWFkZUJ5ID0gZTIucmVhZEludCgyKSwgZTIuc2tpcCgyKSwgdGhpcy5iaXRGbGFnID0gZTIucmVhZEludCgyKSwgdGhpcy5jb21wcmVzc2lvbk1ldGhvZCA9IGUyLnJlYWRTdHJpbmcoMiksIHRoaXMuZGF0ZSA9IGUyLnJlYWREYXRlKCksIHRoaXMuY3JjMzIgPSBlMi5yZWFkSW50KDQpLCB0aGlzLmNvbXByZXNzZWRTaXplID0gZTIucmVhZEludCg0KSwgdGhpcy51bmNvbXByZXNzZWRTaXplID0gZTIucmVhZEludCg0KTsKICAgICAgICAgIHZhciB0MiA9IGUyLnJlYWRJbnQoMik7CiAgICAgICAgICBpZiAodGhpcy5leHRyYUZpZWxkc0xlbmd0aCA9IGUyLnJlYWRJbnQoMiksIHRoaXMuZmlsZUNvbW1lbnRMZW5ndGggPSBlMi5yZWFkSW50KDIpLCB0aGlzLmRpc2tOdW1iZXJTdGFydCA9IGUyLnJlYWRJbnQoMiksIHRoaXMuaW50ZXJuYWxGaWxlQXR0cmlidXRlcyA9IGUyLnJlYWRJbnQoMiksIHRoaXMuZXh0ZXJuYWxGaWxlQXR0cmlidXRlcyA9IGUyLnJlYWRJbnQoNCksIHRoaXMubG9jYWxIZWFkZXJPZmZzZXQgPSBlMi5yZWFkSW50KDQpLCB0aGlzLmlzRW5jcnlwdGVkKCkpIHRocm93IG5ldyBFcnJvcigiRW5jcnlwdGVkIHppcCBhcmUgbm90IHN1cHBvcnRlZCIpOwogICAgICAgICAgZTIuc2tpcCh0MiksIHRoaXMucmVhZEV4dHJhRmllbGRzKGUyKSwgdGhpcy5wYXJzZVpJUDY0RXh0cmFGaWVsZChlMiksIHRoaXMuZmlsZUNvbW1lbnQgPSBlMi5yZWFkRGF0YSh0aGlzLmZpbGVDb21tZW50TGVuZ3RoKTsKICAgICAgICB9LCBwcm9jZXNzQXR0cmlidXRlczogZnVuY3Rpb24oKSB7CiAgICAgICAgICB0aGlzLnVuaXhQZXJtaXNzaW9ucyA9IG51bGwsIHRoaXMuZG9zUGVybWlzc2lvbnMgPSBudWxsOwogICAgICAgICAgdmFyIGUyID0gdGhpcy52ZXJzaW9uTWFkZUJ5ID4+IDg7CiAgICAgICAgICB0aGlzLmRpciA9ICEhKDE2ICYgdGhpcy5leHRlcm5hbEZpbGVBdHRyaWJ1dGVzKSwgMCA9PSBlMiAmJiAodGhpcy5kb3NQZXJtaXNzaW9ucyA9IDYzICYgdGhpcy5leHRlcm5hbEZpbGVBdHRyaWJ1dGVzKSwgMyA9PSBlMiAmJiAodGhpcy51bml4UGVybWlzc2lvbnMgPSB0aGlzLmV4dGVybmFsRmlsZUF0dHJpYnV0ZXMgPj4gMTYgJiA2NTUzNSksIHRoaXMuZGlyIHx8ICIvIiAhPT0gdGhpcy5maWxlTmFtZVN0ci5zbGljZSgtMSkgfHwgKHRoaXMuZGlyID0gdHJ1ZSk7CiAgICAgICAgfSwgcGFyc2VaSVA2NEV4dHJhRmllbGQ6IGZ1bmN0aW9uKCkgewogICAgICAgICAgaWYgKHRoaXMuZXh0cmFGaWVsZHNbMV0pIHsKICAgICAgICAgICAgdmFyIGUyID0gbih0aGlzLmV4dHJhRmllbGRzWzFdLnZhbHVlKTsKICAgICAgICAgICAgdGhpcy51bmNvbXByZXNzZWRTaXplID09PSBzLk1BWF9WQUxVRV8zMkJJVFMgJiYgKHRoaXMudW5jb21wcmVzc2VkU2l6ZSA9IGUyLnJlYWRJbnQoOCkpLCB0aGlzLmNvbXByZXNzZWRTaXplID09PSBzLk1BWF9WQUxVRV8zMkJJVFMgJiYgKHRoaXMuY29tcHJlc3NlZFNpemUgPSBlMi5yZWFkSW50KDgpKSwgdGhpcy5sb2NhbEhlYWRlck9mZnNldCA9PT0gcy5NQVhfVkFMVUVfMzJCSVRTICYmICh0aGlzLmxvY2FsSGVhZGVyT2Zmc2V0ID0gZTIucmVhZEludCg4KSksIHRoaXMuZGlza051bWJlclN0YXJ0ID09PSBzLk1BWF9WQUxVRV8zMkJJVFMgJiYgKHRoaXMuZGlza051bWJlclN0YXJ0ID0gZTIucmVhZEludCg0KSk7CiAgICAgICAgICB9CiAgICAgICAgfSwgcmVhZEV4dHJhRmllbGRzOiBmdW5jdGlvbihlMikgewogICAgICAgICAgdmFyIHQyLCByMiwgbjIsIGkyID0gZTIuaW5kZXggKyB0aGlzLmV4dHJhRmllbGRzTGVuZ3RoOwogICAgICAgICAgZm9yICh0aGlzLmV4dHJhRmllbGRzIHx8ICh0aGlzLmV4dHJhRmllbGRzID0ge30pOyBlMi5pbmRleCArIDQgPCBpMjsgKSB0MiA9IGUyLnJlYWRJbnQoMiksIHIyID0gZTIucmVhZEludCgyKSwgbjIgPSBlMi5yZWFkRGF0YShyMiksIHRoaXMuZXh0cmFGaWVsZHNbdDJdID0geyBpZDogdDIsIGxlbmd0aDogcjIsIHZhbHVlOiBuMiB9OwogICAgICAgICAgZTIuc2V0SW5kZXgoaTIpOwogICAgICAgIH0sIGhhbmRsZVVURjg6IGZ1bmN0aW9uKCkgewogICAgICAgICAgdmFyIGUyID0gdS51aW50OGFycmF5ID8gInVpbnQ4YXJyYXkiIDogImFycmF5IjsKICAgICAgICAgIGlmICh0aGlzLnVzZVVURjgoKSkgdGhpcy5maWxlTmFtZVN0ciA9IG8udXRmOGRlY29kZSh0aGlzLmZpbGVOYW1lKSwgdGhpcy5maWxlQ29tbWVudFN0ciA9IG8udXRmOGRlY29kZSh0aGlzLmZpbGVDb21tZW50KTsKICAgICAgICAgIGVsc2UgewogICAgICAgICAgICB2YXIgdDIgPSB0aGlzLmZpbmRFeHRyYUZpZWxkVW5pY29kZVBhdGgoKTsKICAgICAgICAgICAgaWYgKG51bGwgIT09IHQyKSB0aGlzLmZpbGVOYW1lU3RyID0gdDI7CiAgICAgICAgICAgIGVsc2UgewogICAgICAgICAgICAgIHZhciByMiA9IHMudHJhbnNmb3JtVG8oZTIsIHRoaXMuZmlsZU5hbWUpOwogICAgICAgICAgICAgIHRoaXMuZmlsZU5hbWVTdHIgPSB0aGlzLmxvYWRPcHRpb25zLmRlY29kZUZpbGVOYW1lKHIyKTsKICAgICAgICAgICAgfQogICAgICAgICAgICB2YXIgbjIgPSB0aGlzLmZpbmRFeHRyYUZpZWxkVW5pY29kZUNvbW1lbnQoKTsKICAgICAgICAgICAgaWYgKG51bGwgIT09IG4yKSB0aGlzLmZpbGVDb21tZW50U3RyID0gbjI7CiAgICAgICAgICAgIGVsc2UgewogICAgICAgICAgICAgIHZhciBpMiA9IHMudHJhbnNmb3JtVG8oZTIsIHRoaXMuZmlsZUNvbW1lbnQpOwogICAgICAgICAgICAgIHRoaXMuZmlsZUNvbW1lbnRTdHIgPSB0aGlzLmxvYWRPcHRpb25zLmRlY29kZUZpbGVOYW1lKGkyKTsKICAgICAgICAgICAgfQogICAgICAgICAgfQogICAgICAgIH0sIGZpbmRFeHRyYUZpZWxkVW5pY29kZVBhdGg6IGZ1bmN0aW9uKCkgewogICAgICAgICAgdmFyIGUyID0gdGhpcy5leHRyYUZpZWxkc1syODc4OV07CiAgICAgICAgICBpZiAoZTIpIHsKICAgICAgICAgICAgdmFyIHQyID0gbihlMi52YWx1ZSk7CiAgICAgICAgICAgIHJldHVybiAxICE9PSB0Mi5yZWFkSW50KDEpID8gbnVsbCA6IGEodGhpcy5maWxlTmFtZSkgIT09IHQyLnJlYWRJbnQoNCkgPyBudWxsIDogby51dGY4ZGVjb2RlKHQyLnJlYWREYXRhKGUyLmxlbmd0aCAtIDUpKTsKICAgICAgICAgIH0KICAgICAgICAgIHJldHVybiBudWxsOwogICAgICAgIH0sIGZpbmRFeHRyYUZpZWxkVW5pY29kZUNvbW1lbnQ6IGZ1bmN0aW9uKCkgewogICAgICAgICAgdmFyIGUyID0gdGhpcy5leHRyYUZpZWxkc1syNTQ2MV07CiAgICAgICAgICBpZiAoZTIpIHsKICAgICAgICAgICAgdmFyIHQyID0gbihlMi52YWx1ZSk7CiAgICAgICAgICAgIHJldHVybiAxICE9PSB0Mi5yZWFkSW50KDEpID8gbnVsbCA6IGEodGhpcy5maWxlQ29tbWVudCkgIT09IHQyLnJlYWRJbnQoNCkgPyBudWxsIDogby51dGY4ZGVjb2RlKHQyLnJlYWREYXRhKGUyLmxlbmd0aCAtIDUpKTsKICAgICAgICAgIH0KICAgICAgICAgIHJldHVybiBudWxsOwogICAgICAgIH0gfSwgdC5leHBvcnRzID0gbDsKICAgICAgfSwgeyAiLi9jb21wcmVzc2VkT2JqZWN0IjogMiwgIi4vY29tcHJlc3Npb25zIjogMywgIi4vY3JjMzIiOiA0LCAiLi9yZWFkZXIvcmVhZGVyRm9yIjogMjIsICIuL3N1cHBvcnQiOiAzMCwgIi4vdXRmOCI6IDMxLCAiLi91dGlscyI6IDMyIH1dLCAzNTogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICBmdW5jdGlvbiBuKGUyLCB0MiwgcjIpIHsKICAgICAgICAgIHRoaXMubmFtZSA9IGUyLCB0aGlzLmRpciA9IHIyLmRpciwgdGhpcy5kYXRlID0gcjIuZGF0ZSwgdGhpcy5jb21tZW50ID0gcjIuY29tbWVudCwgdGhpcy51bml4UGVybWlzc2lvbnMgPSByMi51bml4UGVybWlzc2lvbnMsIHRoaXMuZG9zUGVybWlzc2lvbnMgPSByMi5kb3NQZXJtaXNzaW9ucywgdGhpcy5fZGF0YSA9IHQyLCB0aGlzLl9kYXRhQmluYXJ5ID0gcjIuYmluYXJ5LCB0aGlzLm9wdGlvbnMgPSB7IGNvbXByZXNzaW9uOiByMi5jb21wcmVzc2lvbiwgY29tcHJlc3Npb25PcHRpb25zOiByMi5jb21wcmVzc2lvbk9wdGlvbnMgfTsKICAgICAgICB9CiAgICAgICAgdmFyIHMgPSBlKCIuL3N0cmVhbS9TdHJlYW1IZWxwZXIiKSwgaSA9IGUoIi4vc3RyZWFtL0RhdGFXb3JrZXIiKSwgYSA9IGUoIi4vdXRmOCIpLCBvID0gZSgiLi9jb21wcmVzc2VkT2JqZWN0IiksIGggPSBlKCIuL3N0cmVhbS9HZW5lcmljV29ya2VyIik7CiAgICAgICAgbi5wcm90b3R5cGUgPSB7IGludGVybmFsU3RyZWFtOiBmdW5jdGlvbihlMikgewogICAgICAgICAgdmFyIHQyID0gbnVsbCwgcjIgPSAic3RyaW5nIjsKICAgICAgICAgIHRyeSB7CiAgICAgICAgICAgIGlmICghZTIpIHRocm93IG5ldyBFcnJvcigiTm8gb3V0cHV0IHR5cGUgc3BlY2lmaWVkLiIpOwogICAgICAgICAgICB2YXIgbjIgPSAic3RyaW5nIiA9PT0gKHIyID0gZTIudG9Mb3dlckNhc2UoKSkgfHwgInRleHQiID09PSByMjsKICAgICAgICAgICAgImJpbmFyeXN0cmluZyIgIT09IHIyICYmICJ0ZXh0IiAhPT0gcjIgfHwgKHIyID0gInN0cmluZyIpLCB0MiA9IHRoaXMuX2RlY29tcHJlc3NXb3JrZXIoKTsKICAgICAgICAgICAgdmFyIGkyID0gIXRoaXMuX2RhdGFCaW5hcnk7CiAgICAgICAgICAgIGkyICYmICFuMiAmJiAodDIgPSB0Mi5waXBlKG5ldyBhLlV0ZjhFbmNvZGVXb3JrZXIoKSkpLCAhaTIgJiYgbjIgJiYgKHQyID0gdDIucGlwZShuZXcgYS5VdGY4RGVjb2RlV29ya2VyKCkpKTsKICAgICAgICAgIH0gY2F0Y2ggKGUzKSB7CiAgICAgICAgICAgICh0MiA9IG5ldyBoKCJlcnJvciIpKS5lcnJvcihlMyk7CiAgICAgICAgICB9CiAgICAgICAgICByZXR1cm4gbmV3IHModDIsIHIyLCAiIik7CiAgICAgICAgfSwgYXN5bmM6IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgcmV0dXJuIHRoaXMuaW50ZXJuYWxTdHJlYW0oZTIpLmFjY3VtdWxhdGUodDIpOwogICAgICAgIH0sIG5vZGVTdHJlYW06IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgcmV0dXJuIHRoaXMuaW50ZXJuYWxTdHJlYW0oZTIgfHwgIm5vZGVidWZmZXIiKS50b05vZGVqc1N0cmVhbSh0Mik7CiAgICAgICAgfSwgX2NvbXByZXNzV29ya2VyOiBmdW5jdGlvbihlMiwgdDIpIHsKICAgICAgICAgIGlmICh0aGlzLl9kYXRhIGluc3RhbmNlb2YgbyAmJiB0aGlzLl9kYXRhLmNvbXByZXNzaW9uLm1hZ2ljID09PSBlMi5tYWdpYykgcmV0dXJuIHRoaXMuX2RhdGEuZ2V0Q29tcHJlc3NlZFdvcmtlcigpOwogICAgICAgICAgdmFyIHIyID0gdGhpcy5fZGVjb21wcmVzc1dvcmtlcigpOwogICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFCaW5hcnkgfHwgKHIyID0gcjIucGlwZShuZXcgYS5VdGY4RW5jb2RlV29ya2VyKCkpKSwgby5jcmVhdGVXb3JrZXJGcm9tKHIyLCBlMiwgdDIpOwogICAgICAgIH0sIF9kZWNvbXByZXNzV29ya2VyOiBmdW5jdGlvbigpIHsKICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhIGluc3RhbmNlb2YgbyA/IHRoaXMuX2RhdGEuZ2V0Q29udGVudFdvcmtlcigpIDogdGhpcy5fZGF0YSBpbnN0YW5jZW9mIGggPyB0aGlzLl9kYXRhIDogbmV3IGkodGhpcy5fZGF0YSk7CiAgICAgICAgfSB9OwogICAgICAgIGZvciAodmFyIHUgPSBbImFzVGV4dCIsICJhc0JpbmFyeSIsICJhc05vZGVCdWZmZXIiLCAiYXNVaW50OEFycmF5IiwgImFzQXJyYXlCdWZmZXIiXSwgbCA9IGZ1bmN0aW9uKCkgewogICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJUaGlzIG1ldGhvZCBoYXMgYmVlbiByZW1vdmVkIGluIEpTWmlwIDMuMCwgcGxlYXNlIGNoZWNrIHRoZSB1cGdyYWRlIGd1aWRlLiIpOwogICAgICAgIH0sIGYgPSAwOyBmIDwgdS5sZW5ndGg7IGYrKykgbi5wcm90b3R5cGVbdVtmXV0gPSBsOwogICAgICAgIHQuZXhwb3J0cyA9IG47CiAgICAgIH0sIHsgIi4vY29tcHJlc3NlZE9iamVjdCI6IDIsICIuL3N0cmVhbS9EYXRhV29ya2VyIjogMjcsICIuL3N0cmVhbS9HZW5lcmljV29ya2VyIjogMjgsICIuL3N0cmVhbS9TdHJlYW1IZWxwZXIiOiAyOSwgIi4vdXRmOCI6IDMxIH1dLCAzNjogW2Z1bmN0aW9uKGUsIGwsIHQpIHsKICAgICAgICAoZnVuY3Rpb24odDIpIHsKICAgICAgICAgIHZhciByLCBuLCBlMiA9IHQyLk11dGF0aW9uT2JzZXJ2ZXIgfHwgdDIuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjsKICAgICAgICAgIGlmIChlMikgewogICAgICAgICAgICB2YXIgaSA9IDAsIHMgPSBuZXcgZTIodSksIGEgPSB0Mi5kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgiIik7CiAgICAgICAgICAgIHMub2JzZXJ2ZShhLCB7IGNoYXJhY3RlckRhdGE6IHRydWUgfSksIHIgPSBmdW5jdGlvbigpIHsKICAgICAgICAgICAgICBhLmRhdGEgPSBpID0gKytpICUgMjsKICAgICAgICAgICAgfTsKICAgICAgICAgIH0gZWxzZSBpZiAodDIuc2V0SW1tZWRpYXRlIHx8IHZvaWQgMCA9PT0gdDIuTWVzc2FnZUNoYW5uZWwpIHIgPSAiZG9jdW1lbnQiIGluIHQyICYmICJvbnJlYWR5c3RhdGVjaGFuZ2UiIGluIHQyLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInNjcmlwdCIpID8gZnVuY3Rpb24oKSB7CiAgICAgICAgICAgIHZhciBlMyA9IHQyLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInNjcmlwdCIpOwogICAgICAgICAgICBlMy5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHsKICAgICAgICAgICAgICB1KCksIGUzLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGwsIGUzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZTMpLCBlMyA9IG51bGw7CiAgICAgICAgICAgIH0sIHQyLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hcHBlbmRDaGlsZChlMyk7CiAgICAgICAgICB9IDogZnVuY3Rpb24oKSB7CiAgICAgICAgICAgIHNldFRpbWVvdXQodSwgMCk7CiAgICAgICAgICB9OwogICAgICAgICAgZWxzZSB7CiAgICAgICAgICAgIHZhciBvID0gbmV3IHQyLk1lc3NhZ2VDaGFubmVsKCk7CiAgICAgICAgICAgIG8ucG9ydDEub25tZXNzYWdlID0gdSwgciA9IGZ1bmN0aW9uKCkgewogICAgICAgICAgICAgIG8ucG9ydDIucG9zdE1lc3NhZ2UoMCk7CiAgICAgICAgICAgIH07CiAgICAgICAgICB9CiAgICAgICAgICB2YXIgaCA9IFtdOwogICAgICAgICAgZnVuY3Rpb24gdSgpIHsKICAgICAgICAgICAgdmFyIGUzLCB0MzsKICAgICAgICAgICAgbiA9IHRydWU7CiAgICAgICAgICAgIGZvciAodmFyIHIyID0gaC5sZW5ndGg7IHIyOyApIHsKICAgICAgICAgICAgICBmb3IgKHQzID0gaCwgaCA9IFtdLCBlMyA9IC0xOyArK2UzIDwgcjI7ICkgdDNbZTNdKCk7CiAgICAgICAgICAgICAgcjIgPSBoLmxlbmd0aDsKICAgICAgICAgICAgfQogICAgICAgICAgICBuID0gZmFsc2U7CiAgICAgICAgICB9CiAgICAgICAgICBsLmV4cG9ydHMgPSBmdW5jdGlvbihlMykgewogICAgICAgICAgICAxICE9PSBoLnB1c2goZTMpIHx8IG4gfHwgcigpOwogICAgICAgICAgfTsKICAgICAgICB9KS5jYWxsKHRoaXMsICJ1bmRlZmluZWQiICE9IHR5cGVvZiBjb21tb25qc0dsb2JhbCA/IGNvbW1vbmpzR2xvYmFsIDogInVuZGVmaW5lZCIgIT0gdHlwZW9mIHNlbGYgPyBzZWxmIDogInVuZGVmaW5lZCIgIT0gdHlwZW9mIHdpbmRvdyA/IHdpbmRvdyA6IHt9KTsKICAgICAgfSwge31dLCAzNzogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICB2YXIgaSA9IGUoImltbWVkaWF0ZSIpOwogICAgICAgIGZ1bmN0aW9uIHUoKSB7CiAgICAgICAgfQogICAgICAgIHZhciBsID0ge30sIHMgPSBbIlJFSkVDVEVEIl0sIGEgPSBbIkZVTEZJTExFRCJdLCBuID0gWyJQRU5ESU5HIl07CiAgICAgICAgZnVuY3Rpb24gbyhlMikgewogICAgICAgICAgaWYgKCJmdW5jdGlvbiIgIT0gdHlwZW9mIGUyKSB0aHJvdyBuZXcgVHlwZUVycm9yKCJyZXNvbHZlciBtdXN0IGJlIGEgZnVuY3Rpb24iKTsKICAgICAgICAgIHRoaXMuc3RhdGUgPSBuLCB0aGlzLnF1ZXVlID0gW10sIHRoaXMub3V0Y29tZSA9IHZvaWQgMCwgZTIgIT09IHUgJiYgZCh0aGlzLCBlMik7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIGgoZTIsIHQyLCByMikgewogICAgICAgICAgdGhpcy5wcm9taXNlID0gZTIsICJmdW5jdGlvbiIgPT0gdHlwZW9mIHQyICYmICh0aGlzLm9uRnVsZmlsbGVkID0gdDIsIHRoaXMuY2FsbEZ1bGZpbGxlZCA9IHRoaXMub3RoZXJDYWxsRnVsZmlsbGVkKSwgImZ1bmN0aW9uIiA9PSB0eXBlb2YgcjIgJiYgKHRoaXMub25SZWplY3RlZCA9IHIyLCB0aGlzLmNhbGxSZWplY3RlZCA9IHRoaXMub3RoZXJDYWxsUmVqZWN0ZWQpOwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBmKHQyLCByMiwgbjIpIHsKICAgICAgICAgIGkoZnVuY3Rpb24oKSB7CiAgICAgICAgICAgIHZhciBlMjsKICAgICAgICAgICAgdHJ5IHsKICAgICAgICAgICAgICBlMiA9IHIyKG4yKTsKICAgICAgICAgICAgfSBjYXRjaCAoZTMpIHsKICAgICAgICAgICAgICByZXR1cm4gbC5yZWplY3QodDIsIGUzKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBlMiA9PT0gdDIgPyBsLnJlamVjdCh0MiwgbmV3IFR5cGVFcnJvcigiQ2Fubm90IHJlc29sdmUgcHJvbWlzZSB3aXRoIGl0c2VsZiIpKSA6IGwucmVzb2x2ZSh0MiwgZTIpOwogICAgICAgICAgfSk7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIGMoZTIpIHsKICAgICAgICAgIHZhciB0MiA9IGUyICYmIGUyLnRoZW47CiAgICAgICAgICBpZiAoZTIgJiYgKCJvYmplY3QiID09IHR5cGVvZiBlMiB8fCAiZnVuY3Rpb24iID09IHR5cGVvZiBlMikgJiYgImZ1bmN0aW9uIiA9PSB0eXBlb2YgdDIpIHJldHVybiBmdW5jdGlvbigpIHsKICAgICAgICAgICAgdDIuYXBwbHkoZTIsIGFyZ3VtZW50cyk7CiAgICAgICAgICB9OwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBkKHQyLCBlMikgewogICAgICAgICAgdmFyIHIyID0gZmFsc2U7CiAgICAgICAgICBmdW5jdGlvbiBuMihlMykgewogICAgICAgICAgICByMiB8fCAocjIgPSB0cnVlLCBsLnJlamVjdCh0MiwgZTMpKTsKICAgICAgICAgIH0KICAgICAgICAgIGZ1bmN0aW9uIGkyKGUzKSB7CiAgICAgICAgICAgIHIyIHx8IChyMiA9IHRydWUsIGwucmVzb2x2ZSh0MiwgZTMpKTsKICAgICAgICAgIH0KICAgICAgICAgIHZhciBzMiA9IHAoZnVuY3Rpb24oKSB7CiAgICAgICAgICAgIGUyKGkyLCBuMik7CiAgICAgICAgICB9KTsKICAgICAgICAgICJlcnJvciIgPT09IHMyLnN0YXR1cyAmJiBuMihzMi52YWx1ZSk7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIHAoZTIsIHQyKSB7CiAgICAgICAgICB2YXIgcjIgPSB7fTsKICAgICAgICAgIHRyeSB7CiAgICAgICAgICAgIHIyLnZhbHVlID0gZTIodDIpLCByMi5zdGF0dXMgPSAic3VjY2VzcyI7CiAgICAgICAgICB9IGNhdGNoIChlMykgewogICAgICAgICAgICByMi5zdGF0dXMgPSAiZXJyb3IiLCByMi52YWx1ZSA9IGUzOwogICAgICAgICAgfQogICAgICAgICAgcmV0dXJuIHIyOwogICAgICAgIH0KICAgICAgICAodC5leHBvcnRzID0gbykucHJvdG90eXBlLmZpbmFsbHkgPSBmdW5jdGlvbih0MikgewogICAgICAgICAgaWYgKCJmdW5jdGlvbiIgIT0gdHlwZW9mIHQyKSByZXR1cm4gdGhpczsKICAgICAgICAgIHZhciByMiA9IHRoaXMuY29uc3RydWN0b3I7CiAgICAgICAgICByZXR1cm4gdGhpcy50aGVuKGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICAgIHJldHVybiByMi5yZXNvbHZlKHQyKCkpLnRoZW4oZnVuY3Rpb24oKSB7CiAgICAgICAgICAgICAgcmV0dXJuIGUyOwogICAgICAgICAgICB9KTsKICAgICAgICAgIH0sIGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICAgIHJldHVybiByMi5yZXNvbHZlKHQyKCkpLnRoZW4oZnVuY3Rpb24oKSB7CiAgICAgICAgICAgICAgdGhyb3cgZTI7CiAgICAgICAgICAgIH0pOwogICAgICAgICAgfSk7CiAgICAgICAgfSwgby5wcm90b3R5cGUuY2F0Y2ggPSBmdW5jdGlvbihlMikgewogICAgICAgICAgcmV0dXJuIHRoaXMudGhlbihudWxsLCBlMik7CiAgICAgICAgfSwgby5wcm90b3R5cGUudGhlbiA9IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgaWYgKCJmdW5jdGlvbiIgIT0gdHlwZW9mIGUyICYmIHRoaXMuc3RhdGUgPT09IGEgfHwgImZ1bmN0aW9uIiAhPSB0eXBlb2YgdDIgJiYgdGhpcy5zdGF0ZSA9PT0gcykgcmV0dXJuIHRoaXM7CiAgICAgICAgICB2YXIgcjIgPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih1KTsKICAgICAgICAgIHRoaXMuc3RhdGUgIT09IG4gPyBmKHIyLCB0aGlzLnN0YXRlID09PSBhID8gZTIgOiB0MiwgdGhpcy5vdXRjb21lKSA6IHRoaXMucXVldWUucHVzaChuZXcgaChyMiwgZTIsIHQyKSk7CiAgICAgICAgICByZXR1cm4gcjI7CiAgICAgICAgfSwgaC5wcm90b3R5cGUuY2FsbEZ1bGZpbGxlZCA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICBsLnJlc29sdmUodGhpcy5wcm9taXNlLCBlMik7CiAgICAgICAgfSwgaC5wcm90b3R5cGUub3RoZXJDYWxsRnVsZmlsbGVkID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIGYodGhpcy5wcm9taXNlLCB0aGlzLm9uRnVsZmlsbGVkLCBlMik7CiAgICAgICAgfSwgaC5wcm90b3R5cGUuY2FsbFJlamVjdGVkID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIGwucmVqZWN0KHRoaXMucHJvbWlzZSwgZTIpOwogICAgICAgIH0sIGgucHJvdG90eXBlLm90aGVyQ2FsbFJlamVjdGVkID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIGYodGhpcy5wcm9taXNlLCB0aGlzLm9uUmVqZWN0ZWQsIGUyKTsKICAgICAgICB9LCBsLnJlc29sdmUgPSBmdW5jdGlvbihlMiwgdDIpIHsKICAgICAgICAgIHZhciByMiA9IHAoYywgdDIpOwogICAgICAgICAgaWYgKCJlcnJvciIgPT09IHIyLnN0YXR1cykgcmV0dXJuIGwucmVqZWN0KGUyLCByMi52YWx1ZSk7CiAgICAgICAgICB2YXIgbjIgPSByMi52YWx1ZTsKICAgICAgICAgIGlmIChuMikgZChlMiwgbjIpOwogICAgICAgICAgZWxzZSB7CiAgICAgICAgICAgIGUyLnN0YXRlID0gYSwgZTIub3V0Y29tZSA9IHQyOwogICAgICAgICAgICBmb3IgKHZhciBpMiA9IC0xLCBzMiA9IGUyLnF1ZXVlLmxlbmd0aDsgKytpMiA8IHMyOyApIGUyLnF1ZXVlW2kyXS5jYWxsRnVsZmlsbGVkKHQyKTsKICAgICAgICAgIH0KICAgICAgICAgIHJldHVybiBlMjsKICAgICAgICB9LCBsLnJlamVjdCA9IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgZTIuc3RhdGUgPSBzLCBlMi5vdXRjb21lID0gdDI7CiAgICAgICAgICBmb3IgKHZhciByMiA9IC0xLCBuMiA9IGUyLnF1ZXVlLmxlbmd0aDsgKytyMiA8IG4yOyApIGUyLnF1ZXVlW3IyXS5jYWxsUmVqZWN0ZWQodDIpOwogICAgICAgICAgcmV0dXJuIGUyOwogICAgICAgIH0sIG8ucmVzb2x2ZSA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICBpZiAoZTIgaW5zdGFuY2VvZiB0aGlzKSByZXR1cm4gZTI7CiAgICAgICAgICByZXR1cm4gbC5yZXNvbHZlKG5ldyB0aGlzKHUpLCBlMik7CiAgICAgICAgfSwgby5yZWplY3QgPSBmdW5jdGlvbihlMikgewogICAgICAgICAgdmFyIHQyID0gbmV3IHRoaXModSk7CiAgICAgICAgICByZXR1cm4gbC5yZWplY3QodDIsIGUyKTsKICAgICAgICB9LCBvLmFsbCA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICB2YXIgcjIgPSB0aGlzOwogICAgICAgICAgaWYgKCJbb2JqZWN0IEFycmF5XSIgIT09IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlMikpIHJldHVybiB0aGlzLnJlamVjdChuZXcgVHlwZUVycm9yKCJtdXN0IGJlIGFuIGFycmF5IikpOwogICAgICAgICAgdmFyIG4yID0gZTIubGVuZ3RoLCBpMiA9IGZhbHNlOwogICAgICAgICAgaWYgKCFuMikgcmV0dXJuIHRoaXMucmVzb2x2ZShbXSk7CiAgICAgICAgICB2YXIgczIgPSBuZXcgQXJyYXkobjIpLCBhMiA9IDAsIHQyID0gLTEsIG8yID0gbmV3IHRoaXModSk7CiAgICAgICAgICBmb3IgKDsgKyt0MiA8IG4yOyApIGgyKGUyW3QyXSwgdDIpOwogICAgICAgICAgcmV0dXJuIG8yOwogICAgICAgICAgZnVuY3Rpb24gaDIoZTMsIHQzKSB7CiAgICAgICAgICAgIHIyLnJlc29sdmUoZTMpLnRoZW4oZnVuY3Rpb24oZTQpIHsKICAgICAgICAgICAgICBzMlt0M10gPSBlNCwgKythMiAhPT0gbjIgfHwgaTIgfHwgKGkyID0gdHJ1ZSwgbC5yZXNvbHZlKG8yLCBzMikpOwogICAgICAgICAgICB9LCBmdW5jdGlvbihlNCkgewogICAgICAgICAgICAgIGkyIHx8IChpMiA9IHRydWUsIGwucmVqZWN0KG8yLCBlNCkpOwogICAgICAgICAgICB9KTsKICAgICAgICAgIH0KICAgICAgICB9LCBvLnJhY2UgPSBmdW5jdGlvbihlMikgewogICAgICAgICAgdmFyIHQyID0gdGhpczsKICAgICAgICAgIGlmICgiW29iamVjdCBBcnJheV0iICE9PSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZTIpKSByZXR1cm4gdGhpcy5yZWplY3QobmV3IFR5cGVFcnJvcigibXVzdCBiZSBhbiBhcnJheSIpKTsKICAgICAgICAgIHZhciByMiA9IGUyLmxlbmd0aCwgbjIgPSBmYWxzZTsKICAgICAgICAgIGlmICghcjIpIHJldHVybiB0aGlzLnJlc29sdmUoW10pOwogICAgICAgICAgdmFyIGkyID0gLTEsIHMyID0gbmV3IHRoaXModSk7CiAgICAgICAgICBmb3IgKDsgKytpMiA8IHIyOyApIGEyID0gZTJbaTJdLCB0Mi5yZXNvbHZlKGEyKS50aGVuKGZ1bmN0aW9uKGUzKSB7CiAgICAgICAgICAgIG4yIHx8IChuMiA9IHRydWUsIGwucmVzb2x2ZShzMiwgZTMpKTsKICAgICAgICAgIH0sIGZ1bmN0aW9uKGUzKSB7CiAgICAgICAgICAgIG4yIHx8IChuMiA9IHRydWUsIGwucmVqZWN0KHMyLCBlMykpOwogICAgICAgICAgfSk7CiAgICAgICAgICB2YXIgYTI7CiAgICAgICAgICByZXR1cm4gczI7CiAgICAgICAgfTsKICAgICAgfSwgeyBpbW1lZGlhdGU6IDM2IH1dLCAzODogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICB2YXIgbiA9IHt9OwogICAgICAgICgwLCBlKCIuL2xpYi91dGlscy9jb21tb24iKS5hc3NpZ24pKG4sIGUoIi4vbGliL2RlZmxhdGUiKSwgZSgiLi9saWIvaW5mbGF0ZSIpLCBlKCIuL2xpYi96bGliL2NvbnN0YW50cyIpKSwgdC5leHBvcnRzID0gbjsKICAgICAgfSwgeyAiLi9saWIvZGVmbGF0ZSI6IDM5LCAiLi9saWIvaW5mbGF0ZSI6IDQwLCAiLi9saWIvdXRpbHMvY29tbW9uIjogNDEsICIuL2xpYi96bGliL2NvbnN0YW50cyI6IDQ0IH1dLCAzOTogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICB2YXIgYSA9IGUoIi4vemxpYi9kZWZsYXRlIiksIG8gPSBlKCIuL3V0aWxzL2NvbW1vbiIpLCBoID0gZSgiLi91dGlscy9zdHJpbmdzIiksIGkgPSBlKCIuL3psaWIvbWVzc2FnZXMiKSwgcyA9IGUoIi4vemxpYi96c3RyZWFtIiksIHUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLCBsID0gMCwgZiA9IC0xLCBjID0gMCwgZCA9IDg7CiAgICAgICAgZnVuY3Rpb24gcChlMikgewogICAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIHApKSByZXR1cm4gbmV3IHAoZTIpOwogICAgICAgICAgdGhpcy5vcHRpb25zID0gby5hc3NpZ24oeyBsZXZlbDogZiwgbWV0aG9kOiBkLCBjaHVua1NpemU6IDE2Mzg0LCB3aW5kb3dCaXRzOiAxNSwgbWVtTGV2ZWw6IDgsIHN0cmF0ZWd5OiBjLCB0bzogIiIgfSwgZTIgfHwge30pOwogICAgICAgICAgdmFyIHQyID0gdGhpcy5vcHRpb25zOwogICAgICAgICAgdDIucmF3ICYmIDAgPCB0Mi53aW5kb3dCaXRzID8gdDIud2luZG93Qml0cyA9IC10Mi53aW5kb3dCaXRzIDogdDIuZ3ppcCAmJiAwIDwgdDIud2luZG93Qml0cyAmJiB0Mi53aW5kb3dCaXRzIDwgMTYgJiYgKHQyLndpbmRvd0JpdHMgKz0gMTYpLCB0aGlzLmVyciA9IDAsIHRoaXMubXNnID0gIiIsIHRoaXMuZW5kZWQgPSBmYWxzZSwgdGhpcy5jaHVua3MgPSBbXSwgdGhpcy5zdHJtID0gbmV3IHMoKSwgdGhpcy5zdHJtLmF2YWlsX291dCA9IDA7CiAgICAgICAgICB2YXIgcjIgPSBhLmRlZmxhdGVJbml0Mih0aGlzLnN0cm0sIHQyLmxldmVsLCB0Mi5tZXRob2QsIHQyLndpbmRvd0JpdHMsIHQyLm1lbUxldmVsLCB0Mi5zdHJhdGVneSk7CiAgICAgICAgICBpZiAocjIgIT09IGwpIHRocm93IG5ldyBFcnJvcihpW3IyXSk7CiAgICAgICAgICBpZiAodDIuaGVhZGVyICYmIGEuZGVmbGF0ZVNldEhlYWRlcih0aGlzLnN0cm0sIHQyLmhlYWRlciksIHQyLmRpY3Rpb25hcnkpIHsKICAgICAgICAgICAgdmFyIG4yOwogICAgICAgICAgICBpZiAobjIgPSAic3RyaW5nIiA9PSB0eXBlb2YgdDIuZGljdGlvbmFyeSA/IGguc3RyaW5nMmJ1Zih0Mi5kaWN0aW9uYXJ5KSA6ICJbb2JqZWN0IEFycmF5QnVmZmVyXSIgPT09IHUuY2FsbCh0Mi5kaWN0aW9uYXJ5KSA/IG5ldyBVaW50OEFycmF5KHQyLmRpY3Rpb25hcnkpIDogdDIuZGljdGlvbmFyeSwgKHIyID0gYS5kZWZsYXRlU2V0RGljdGlvbmFyeSh0aGlzLnN0cm0sIG4yKSkgIT09IGwpIHRocm93IG5ldyBFcnJvcihpW3IyXSk7CiAgICAgICAgICAgIHRoaXMuX2RpY3Rfc2V0ID0gdHJ1ZTsKICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgZnVuY3Rpb24gbihlMiwgdDIpIHsKICAgICAgICAgIHZhciByMiA9IG5ldyBwKHQyKTsKICAgICAgICAgIGlmIChyMi5wdXNoKGUyLCB0cnVlKSwgcjIuZXJyKSB0aHJvdyByMi5tc2cgfHwgaVtyMi5lcnJdOwogICAgICAgICAgcmV0dXJuIHIyLnJlc3VsdDsKICAgICAgICB9CiAgICAgICAgcC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgdmFyIHIyLCBuMiwgaTIgPSB0aGlzLnN0cm0sIHMyID0gdGhpcy5vcHRpb25zLmNodW5rU2l6ZTsKICAgICAgICAgIGlmICh0aGlzLmVuZGVkKSByZXR1cm4gZmFsc2U7CiAgICAgICAgICBuMiA9IHQyID09PSB+fnQyID8gdDIgOiB0cnVlID09PSB0MiA/IDQgOiAwLCAic3RyaW5nIiA9PSB0eXBlb2YgZTIgPyBpMi5pbnB1dCA9IGguc3RyaW5nMmJ1ZihlMikgOiAiW29iamVjdCBBcnJheUJ1ZmZlcl0iID09PSB1LmNhbGwoZTIpID8gaTIuaW5wdXQgPSBuZXcgVWludDhBcnJheShlMikgOiBpMi5pbnB1dCA9IGUyLCBpMi5uZXh0X2luID0gMCwgaTIuYXZhaWxfaW4gPSBpMi5pbnB1dC5sZW5ndGg7CiAgICAgICAgICBkbyB7CiAgICAgICAgICAgIGlmICgwID09PSBpMi5hdmFpbF9vdXQgJiYgKGkyLm91dHB1dCA9IG5ldyBvLkJ1ZjgoczIpLCBpMi5uZXh0X291dCA9IDAsIGkyLmF2YWlsX291dCA9IHMyKSwgMSAhPT0gKHIyID0gYS5kZWZsYXRlKGkyLCBuMikpICYmIHIyICE9PSBsKSByZXR1cm4gdGhpcy5vbkVuZChyMiksICEodGhpcy5lbmRlZCA9IHRydWUpOwogICAgICAgICAgICAwICE9PSBpMi5hdmFpbF9vdXQgJiYgKDAgIT09IGkyLmF2YWlsX2luIHx8IDQgIT09IG4yICYmIDIgIT09IG4yKSB8fCAoInN0cmluZyIgPT09IHRoaXMub3B0aW9ucy50byA/IHRoaXMub25EYXRhKGguYnVmMmJpbnN0cmluZyhvLnNocmlua0J1ZihpMi5vdXRwdXQsIGkyLm5leHRfb3V0KSkpIDogdGhpcy5vbkRhdGEoby5zaHJpbmtCdWYoaTIub3V0cHV0LCBpMi5uZXh0X291dCkpKTsKICAgICAgICAgIH0gd2hpbGUgKCgwIDwgaTIuYXZhaWxfaW4gfHwgMCA9PT0gaTIuYXZhaWxfb3V0KSAmJiAxICE9PSByMik7CiAgICAgICAgICByZXR1cm4gNCA9PT0gbjIgPyAocjIgPSBhLmRlZmxhdGVFbmQodGhpcy5zdHJtKSwgdGhpcy5vbkVuZChyMiksIHRoaXMuZW5kZWQgPSB0cnVlLCByMiA9PT0gbCkgOiAyICE9PSBuMiB8fCAodGhpcy5vbkVuZChsKSwgIShpMi5hdmFpbF9vdXQgPSAwKSk7CiAgICAgICAgfSwgcC5wcm90b3R5cGUub25EYXRhID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHRoaXMuY2h1bmtzLnB1c2goZTIpOwogICAgICAgIH0sIHAucHJvdG90eXBlLm9uRW5kID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIGUyID09PSBsICYmICgic3RyaW5nIiA9PT0gdGhpcy5vcHRpb25zLnRvID8gdGhpcy5yZXN1bHQgPSB0aGlzLmNodW5rcy5qb2luKCIiKSA6IHRoaXMucmVzdWx0ID0gby5mbGF0dGVuQ2h1bmtzKHRoaXMuY2h1bmtzKSksIHRoaXMuY2h1bmtzID0gW10sIHRoaXMuZXJyID0gZTIsIHRoaXMubXNnID0gdGhpcy5zdHJtLm1zZzsKICAgICAgICB9LCByLkRlZmxhdGUgPSBwLCByLmRlZmxhdGUgPSBuLCByLmRlZmxhdGVSYXcgPSBmdW5jdGlvbihlMiwgdDIpIHsKICAgICAgICAgIHJldHVybiAodDIgPSB0MiB8fCB7fSkucmF3ID0gdHJ1ZSwgbihlMiwgdDIpOwogICAgICAgIH0sIHIuZ3ppcCA9IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgcmV0dXJuICh0MiA9IHQyIHx8IHt9KS5nemlwID0gdHJ1ZSwgbihlMiwgdDIpOwogICAgICAgIH07CiAgICAgIH0sIHsgIi4vdXRpbHMvY29tbW9uIjogNDEsICIuL3V0aWxzL3N0cmluZ3MiOiA0MiwgIi4vemxpYi9kZWZsYXRlIjogNDYsICIuL3psaWIvbWVzc2FnZXMiOiA1MSwgIi4vemxpYi96c3RyZWFtIjogNTMgfV0sIDQwOiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIHZhciBjID0gZSgiLi96bGliL2luZmxhdGUiKSwgZCA9IGUoIi4vdXRpbHMvY29tbW9uIiksIHAgPSBlKCIuL3V0aWxzL3N0cmluZ3MiKSwgbSA9IGUoIi4vemxpYi9jb25zdGFudHMiKSwgbiA9IGUoIi4vemxpYi9tZXNzYWdlcyIpLCBpID0gZSgiLi96bGliL3pzdHJlYW0iKSwgcyA9IGUoIi4vemxpYi9nemhlYWRlciIpLCBfID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZzsKICAgICAgICBmdW5jdGlvbiBhKGUyKSB7CiAgICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgYSkpIHJldHVybiBuZXcgYShlMik7CiAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBkLmFzc2lnbih7IGNodW5rU2l6ZTogMTYzODQsIHdpbmRvd0JpdHM6IDAsIHRvOiAiIiB9LCBlMiB8fCB7fSk7CiAgICAgICAgICB2YXIgdDIgPSB0aGlzLm9wdGlvbnM7CiAgICAgICAgICB0Mi5yYXcgJiYgMCA8PSB0Mi53aW5kb3dCaXRzICYmIHQyLndpbmRvd0JpdHMgPCAxNiAmJiAodDIud2luZG93Qml0cyA9IC10Mi53aW5kb3dCaXRzLCAwID09PSB0Mi53aW5kb3dCaXRzICYmICh0Mi53aW5kb3dCaXRzID0gLTE1KSksICEoMCA8PSB0Mi53aW5kb3dCaXRzICYmIHQyLndpbmRvd0JpdHMgPCAxNikgfHwgZTIgJiYgZTIud2luZG93Qml0cyB8fCAodDIud2luZG93Qml0cyArPSAzMiksIDE1IDwgdDIud2luZG93Qml0cyAmJiB0Mi53aW5kb3dCaXRzIDwgNDggJiYgMCA9PSAoMTUgJiB0Mi53aW5kb3dCaXRzKSAmJiAodDIud2luZG93Qml0cyB8PSAxNSksIHRoaXMuZXJyID0gMCwgdGhpcy5tc2cgPSAiIiwgdGhpcy5lbmRlZCA9IGZhbHNlLCB0aGlzLmNodW5rcyA9IFtdLCB0aGlzLnN0cm0gPSBuZXcgaSgpLCB0aGlzLnN0cm0uYXZhaWxfb3V0ID0gMDsKICAgICAgICAgIHZhciByMiA9IGMuaW5mbGF0ZUluaXQyKHRoaXMuc3RybSwgdDIud2luZG93Qml0cyk7CiAgICAgICAgICBpZiAocjIgIT09IG0uWl9PSykgdGhyb3cgbmV3IEVycm9yKG5bcjJdKTsKICAgICAgICAgIHRoaXMuaGVhZGVyID0gbmV3IHMoKSwgYy5pbmZsYXRlR2V0SGVhZGVyKHRoaXMuc3RybSwgdGhpcy5oZWFkZXIpOwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBvKGUyLCB0MikgewogICAgICAgICAgdmFyIHIyID0gbmV3IGEodDIpOwogICAgICAgICAgaWYgKHIyLnB1c2goZTIsIHRydWUpLCByMi5lcnIpIHRocm93IHIyLm1zZyB8fCBuW3IyLmVycl07CiAgICAgICAgICByZXR1cm4gcjIucmVzdWx0OwogICAgICAgIH0KICAgICAgICBhLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24oZTIsIHQyKSB7CiAgICAgICAgICB2YXIgcjIsIG4yLCBpMiwgczIsIGEyLCBvMiwgaCA9IHRoaXMuc3RybSwgdSA9IHRoaXMub3B0aW9ucy5jaHVua1NpemUsIGwgPSB0aGlzLm9wdGlvbnMuZGljdGlvbmFyeSwgZiA9IGZhbHNlOwogICAgICAgICAgaWYgKHRoaXMuZW5kZWQpIHJldHVybiBmYWxzZTsKICAgICAgICAgIG4yID0gdDIgPT09IH5+dDIgPyB0MiA6IHRydWUgPT09IHQyID8gbS5aX0ZJTklTSCA6IG0uWl9OT19GTFVTSCwgInN0cmluZyIgPT0gdHlwZW9mIGUyID8gaC5pbnB1dCA9IHAuYmluc3RyaW5nMmJ1ZihlMikgOiAiW29iamVjdCBBcnJheUJ1ZmZlcl0iID09PSBfLmNhbGwoZTIpID8gaC5pbnB1dCA9IG5ldyBVaW50OEFycmF5KGUyKSA6IGguaW5wdXQgPSBlMiwgaC5uZXh0X2luID0gMCwgaC5hdmFpbF9pbiA9IGguaW5wdXQubGVuZ3RoOwogICAgICAgICAgZG8gewogICAgICAgICAgICBpZiAoMCA9PT0gaC5hdmFpbF9vdXQgJiYgKGgub3V0cHV0ID0gbmV3IGQuQnVmOCh1KSwgaC5uZXh0X291dCA9IDAsIGguYXZhaWxfb3V0ID0gdSksIChyMiA9IGMuaW5mbGF0ZShoLCBtLlpfTk9fRkxVU0gpKSA9PT0gbS5aX05FRURfRElDVCAmJiBsICYmIChvMiA9ICJzdHJpbmciID09IHR5cGVvZiBsID8gcC5zdHJpbmcyYnVmKGwpIDogIltvYmplY3QgQXJyYXlCdWZmZXJdIiA9PT0gXy5jYWxsKGwpID8gbmV3IFVpbnQ4QXJyYXkobCkgOiBsLCByMiA9IGMuaW5mbGF0ZVNldERpY3Rpb25hcnkodGhpcy5zdHJtLCBvMikpLCByMiA9PT0gbS5aX0JVRl9FUlJPUiAmJiB0cnVlID09PSBmICYmIChyMiA9IG0uWl9PSywgZiA9IGZhbHNlKSwgcjIgIT09IG0uWl9TVFJFQU1fRU5EICYmIHIyICE9PSBtLlpfT0spIHJldHVybiB0aGlzLm9uRW5kKHIyKSwgISh0aGlzLmVuZGVkID0gdHJ1ZSk7CiAgICAgICAgICAgIGgubmV4dF9vdXQgJiYgKDAgIT09IGguYXZhaWxfb3V0ICYmIHIyICE9PSBtLlpfU1RSRUFNX0VORCAmJiAoMCAhPT0gaC5hdmFpbF9pbiB8fCBuMiAhPT0gbS5aX0ZJTklTSCAmJiBuMiAhPT0gbS5aX1NZTkNfRkxVU0gpIHx8ICgic3RyaW5nIiA9PT0gdGhpcy5vcHRpb25zLnRvID8gKGkyID0gcC51dGY4Ym9yZGVyKGgub3V0cHV0LCBoLm5leHRfb3V0KSwgczIgPSBoLm5leHRfb3V0IC0gaTIsIGEyID0gcC5idWYyc3RyaW5nKGgub3V0cHV0LCBpMiksIGgubmV4dF9vdXQgPSBzMiwgaC5hdmFpbF9vdXQgPSB1IC0gczIsIHMyICYmIGQuYXJyYXlTZXQoaC5vdXRwdXQsIGgub3V0cHV0LCBpMiwgczIsIDApLCB0aGlzLm9uRGF0YShhMikpIDogdGhpcy5vbkRhdGEoZC5zaHJpbmtCdWYoaC5vdXRwdXQsIGgubmV4dF9vdXQpKSkpLCAwID09PSBoLmF2YWlsX2luICYmIDAgPT09IGguYXZhaWxfb3V0ICYmIChmID0gdHJ1ZSk7CiAgICAgICAgICB9IHdoaWxlICgoMCA8IGguYXZhaWxfaW4gfHwgMCA9PT0gaC5hdmFpbF9vdXQpICYmIHIyICE9PSBtLlpfU1RSRUFNX0VORCk7CiAgICAgICAgICByZXR1cm4gcjIgPT09IG0uWl9TVFJFQU1fRU5EICYmIChuMiA9IG0uWl9GSU5JU0gpLCBuMiA9PT0gbS5aX0ZJTklTSCA/IChyMiA9IGMuaW5mbGF0ZUVuZCh0aGlzLnN0cm0pLCB0aGlzLm9uRW5kKHIyKSwgdGhpcy5lbmRlZCA9IHRydWUsIHIyID09PSBtLlpfT0spIDogbjIgIT09IG0uWl9TWU5DX0ZMVVNIIHx8ICh0aGlzLm9uRW5kKG0uWl9PSyksICEoaC5hdmFpbF9vdXQgPSAwKSk7CiAgICAgICAgfSwgYS5wcm90b3R5cGUub25EYXRhID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHRoaXMuY2h1bmtzLnB1c2goZTIpOwogICAgICAgIH0sIGEucHJvdG90eXBlLm9uRW5kID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIGUyID09PSBtLlpfT0sgJiYgKCJzdHJpbmciID09PSB0aGlzLm9wdGlvbnMudG8gPyB0aGlzLnJlc3VsdCA9IHRoaXMuY2h1bmtzLmpvaW4oIiIpIDogdGhpcy5yZXN1bHQgPSBkLmZsYXR0ZW5DaHVua3ModGhpcy5jaHVua3MpKSwgdGhpcy5jaHVua3MgPSBbXSwgdGhpcy5lcnIgPSBlMiwgdGhpcy5tc2cgPSB0aGlzLnN0cm0ubXNnOwogICAgICAgIH0sIHIuSW5mbGF0ZSA9IGEsIHIuaW5mbGF0ZSA9IG8sIHIuaW5mbGF0ZVJhdyA9IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgcmV0dXJuICh0MiA9IHQyIHx8IHt9KS5yYXcgPSB0cnVlLCBvKGUyLCB0Mik7CiAgICAgICAgfSwgci51bmd6aXAgPSBvOwogICAgICB9LCB7ICIuL3V0aWxzL2NvbW1vbiI6IDQxLCAiLi91dGlscy9zdHJpbmdzIjogNDIsICIuL3psaWIvY29uc3RhbnRzIjogNDQsICIuL3psaWIvZ3poZWFkZXIiOiA0NywgIi4vemxpYi9pbmZsYXRlIjogNDksICIuL3psaWIvbWVzc2FnZXMiOiA1MSwgIi4vemxpYi96c3RyZWFtIjogNTMgfV0sIDQxOiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIHZhciBuID0gInVuZGVmaW5lZCIgIT0gdHlwZW9mIFVpbnQ4QXJyYXkgJiYgInVuZGVmaW5lZCIgIT0gdHlwZW9mIFVpbnQxNkFycmF5ICYmICJ1bmRlZmluZWQiICE9IHR5cGVvZiBJbnQzMkFycmF5OwogICAgICAgIHIuYXNzaWduID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIGZvciAodmFyIHQyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTsgdDIubGVuZ3RoOyApIHsKICAgICAgICAgICAgdmFyIHIyID0gdDIuc2hpZnQoKTsKICAgICAgICAgICAgaWYgKHIyKSB7CiAgICAgICAgICAgICAgaWYgKCJvYmplY3QiICE9IHR5cGVvZiByMikgdGhyb3cgbmV3IFR5cGVFcnJvcihyMiArICJtdXN0IGJlIG5vbi1vYmplY3QiKTsKICAgICAgICAgICAgICBmb3IgKHZhciBuMiBpbiByMikgcjIuaGFzT3duUHJvcGVydHkobjIpICYmIChlMltuMl0gPSByMltuMl0pOwogICAgICAgICAgICB9CiAgICAgICAgICB9CiAgICAgICAgICByZXR1cm4gZTI7CiAgICAgICAgfSwgci5zaHJpbmtCdWYgPSBmdW5jdGlvbihlMiwgdDIpIHsKICAgICAgICAgIHJldHVybiBlMi5sZW5ndGggPT09IHQyID8gZTIgOiBlMi5zdWJhcnJheSA/IGUyLnN1YmFycmF5KDAsIHQyKSA6IChlMi5sZW5ndGggPSB0MiwgZTIpOwogICAgICAgIH07CiAgICAgICAgdmFyIGkgPSB7IGFycmF5U2V0OiBmdW5jdGlvbihlMiwgdDIsIHIyLCBuMiwgaTIpIHsKICAgICAgICAgIGlmICh0Mi5zdWJhcnJheSAmJiBlMi5zdWJhcnJheSkgZTIuc2V0KHQyLnN1YmFycmF5KHIyLCByMiArIG4yKSwgaTIpOwogICAgICAgICAgZWxzZSBmb3IgKHZhciBzMiA9IDA7IHMyIDwgbjI7IHMyKyspIGUyW2kyICsgczJdID0gdDJbcjIgKyBzMl07CiAgICAgICAgfSwgZmxhdHRlbkNodW5rczogZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHZhciB0MiwgcjIsIG4yLCBpMiwgczIsIGE7CiAgICAgICAgICBmb3IgKHQyID0gbjIgPSAwLCByMiA9IGUyLmxlbmd0aDsgdDIgPCByMjsgdDIrKykgbjIgKz0gZTJbdDJdLmxlbmd0aDsKICAgICAgICAgIGZvciAoYSA9IG5ldyBVaW50OEFycmF5KG4yKSwgdDIgPSBpMiA9IDAsIHIyID0gZTIubGVuZ3RoOyB0MiA8IHIyOyB0MisrKSBzMiA9IGUyW3QyXSwgYS5zZXQoczIsIGkyKSwgaTIgKz0gczIubGVuZ3RoOwogICAgICAgICAgcmV0dXJuIGE7CiAgICAgICAgfSB9LCBzID0geyBhcnJheVNldDogZnVuY3Rpb24oZTIsIHQyLCByMiwgbjIsIGkyKSB7CiAgICAgICAgICBmb3IgKHZhciBzMiA9IDA7IHMyIDwgbjI7IHMyKyspIGUyW2kyICsgczJdID0gdDJbcjIgKyBzMl07CiAgICAgICAgfSwgZmxhdHRlbkNodW5rczogZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHJldHVybiBbXS5jb25jYXQuYXBwbHkoW10sIGUyKTsKICAgICAgICB9IH07CiAgICAgICAgci5zZXRUeXBlZCA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICBlMiA/IChyLkJ1ZjggPSBVaW50OEFycmF5LCByLkJ1ZjE2ID0gVWludDE2QXJyYXksIHIuQnVmMzIgPSBJbnQzMkFycmF5LCByLmFzc2lnbihyLCBpKSkgOiAoci5CdWY4ID0gQXJyYXksIHIuQnVmMTYgPSBBcnJheSwgci5CdWYzMiA9IEFycmF5LCByLmFzc2lnbihyLCBzKSk7CiAgICAgICAgfSwgci5zZXRUeXBlZChuKTsKICAgICAgfSwge31dLCA0MjogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICB2YXIgaCA9IGUoIi4vY29tbW9uIiksIGkgPSB0cnVlLCBzID0gdHJ1ZTsKICAgICAgICB0cnkgewogICAgICAgICAgU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBbMF0pOwogICAgICAgIH0gY2F0Y2ggKGUyKSB7CiAgICAgICAgICBpID0gZmFsc2U7CiAgICAgICAgfQogICAgICAgIHRyeSB7CiAgICAgICAgICBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIG5ldyBVaW50OEFycmF5KDEpKTsKICAgICAgICB9IGNhdGNoIChlMikgewogICAgICAgICAgcyA9IGZhbHNlOwogICAgICAgIH0KICAgICAgICBmb3IgKHZhciB1ID0gbmV3IGguQnVmOCgyNTYpLCBuID0gMDsgbiA8IDI1NjsgbisrKSB1W25dID0gMjUyIDw9IG4gPyA2IDogMjQ4IDw9IG4gPyA1IDogMjQwIDw9IG4gPyA0IDogMjI0IDw9IG4gPyAzIDogMTkyIDw9IG4gPyAyIDogMTsKICAgICAgICBmdW5jdGlvbiBsKGUyLCB0MikgewogICAgICAgICAgaWYgKHQyIDwgNjU1MzcgJiYgKGUyLnN1YmFycmF5ICYmIHMgfHwgIWUyLnN1YmFycmF5ICYmIGkpKSByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBoLnNocmlua0J1ZihlMiwgdDIpKTsKICAgICAgICAgIGZvciAodmFyIHIyID0gIiIsIG4yID0gMDsgbjIgPCB0MjsgbjIrKykgcjIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShlMltuMl0pOwogICAgICAgICAgcmV0dXJuIHIyOwogICAgICAgIH0KICAgICAgICB1WzI1NF0gPSB1WzI1NF0gPSAxLCByLnN0cmluZzJidWYgPSBmdW5jdGlvbihlMikgewogICAgICAgICAgdmFyIHQyLCByMiwgbjIsIGkyLCBzMiwgYSA9IGUyLmxlbmd0aCwgbyA9IDA7CiAgICAgICAgICBmb3IgKGkyID0gMDsgaTIgPCBhOyBpMisrKSA1NTI5NiA9PSAoNjQ1MTIgJiAocjIgPSBlMi5jaGFyQ29kZUF0KGkyKSkpICYmIGkyICsgMSA8IGEgJiYgNTYzMjAgPT0gKDY0NTEyICYgKG4yID0gZTIuY2hhckNvZGVBdChpMiArIDEpKSkgJiYgKHIyID0gNjU1MzYgKyAocjIgLSA1NTI5NiA8PCAxMCkgKyAobjIgLSA1NjMyMCksIGkyKyspLCBvICs9IHIyIDwgMTI4ID8gMSA6IHIyIDwgMjA0OCA/IDIgOiByMiA8IDY1NTM2ID8gMyA6IDQ7CiAgICAgICAgICBmb3IgKHQyID0gbmV3IGguQnVmOChvKSwgaTIgPSBzMiA9IDA7IHMyIDwgbzsgaTIrKykgNTUyOTYgPT0gKDY0NTEyICYgKHIyID0gZTIuY2hhckNvZGVBdChpMikpKSAmJiBpMiArIDEgPCBhICYmIDU2MzIwID09ICg2NDUxMiAmIChuMiA9IGUyLmNoYXJDb2RlQXQoaTIgKyAxKSkpICYmIChyMiA9IDY1NTM2ICsgKHIyIC0gNTUyOTYgPDwgMTApICsgKG4yIC0gNTYzMjApLCBpMisrKSwgcjIgPCAxMjggPyB0MltzMisrXSA9IHIyIDogKHIyIDwgMjA0OCA/IHQyW3MyKytdID0gMTkyIHwgcjIgPj4+IDYgOiAocjIgPCA2NTUzNiA/IHQyW3MyKytdID0gMjI0IHwgcjIgPj4+IDEyIDogKHQyW3MyKytdID0gMjQwIHwgcjIgPj4+IDE4LCB0MltzMisrXSA9IDEyOCB8IHIyID4+PiAxMiAmIDYzKSwgdDJbczIrK10gPSAxMjggfCByMiA+Pj4gNiAmIDYzKSwgdDJbczIrK10gPSAxMjggfCA2MyAmIHIyKTsKICAgICAgICAgIHJldHVybiB0MjsKICAgICAgICB9LCByLmJ1ZjJiaW5zdHJpbmcgPSBmdW5jdGlvbihlMikgewogICAgICAgICAgcmV0dXJuIGwoZTIsIGUyLmxlbmd0aCk7CiAgICAgICAgfSwgci5iaW5zdHJpbmcyYnVmID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIGZvciAodmFyIHQyID0gbmV3IGguQnVmOChlMi5sZW5ndGgpLCByMiA9IDAsIG4yID0gdDIubGVuZ3RoOyByMiA8IG4yOyByMisrKSB0MltyMl0gPSBlMi5jaGFyQ29kZUF0KHIyKTsKICAgICAgICAgIHJldHVybiB0MjsKICAgICAgICB9LCByLmJ1ZjJzdHJpbmcgPSBmdW5jdGlvbihlMiwgdDIpIHsKICAgICAgICAgIHZhciByMiwgbjIsIGkyLCBzMiwgYSA9IHQyIHx8IGUyLmxlbmd0aCwgbyA9IG5ldyBBcnJheSgyICogYSk7CiAgICAgICAgICBmb3IgKHIyID0gbjIgPSAwOyByMiA8IGE7ICkgaWYgKChpMiA9IGUyW3IyKytdKSA8IDEyOCkgb1tuMisrXSA9IGkyOwogICAgICAgICAgZWxzZSBpZiAoNCA8IChzMiA9IHVbaTJdKSkgb1tuMisrXSA9IDY1NTMzLCByMiArPSBzMiAtIDE7CiAgICAgICAgICBlbHNlIHsKICAgICAgICAgICAgZm9yIChpMiAmPSAyID09PSBzMiA/IDMxIDogMyA9PT0gczIgPyAxNSA6IDc7IDEgPCBzMiAmJiByMiA8IGE7ICkgaTIgPSBpMiA8PCA2IHwgNjMgJiBlMltyMisrXSwgczItLTsKICAgICAgICAgICAgMSA8IHMyID8gb1tuMisrXSA9IDY1NTMzIDogaTIgPCA2NTUzNiA/IG9bbjIrK10gPSBpMiA6IChpMiAtPSA2NTUzNiwgb1tuMisrXSA9IDU1Mjk2IHwgaTIgPj4gMTAgJiAxMDIzLCBvW24yKytdID0gNTYzMjAgfCAxMDIzICYgaTIpOwogICAgICAgICAgfQogICAgICAgICAgcmV0dXJuIGwobywgbjIpOwogICAgICAgIH0sIHIudXRmOGJvcmRlciA9IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgdmFyIHIyOwogICAgICAgICAgZm9yICgodDIgPSB0MiB8fCBlMi5sZW5ndGgpID4gZTIubGVuZ3RoICYmICh0MiA9IGUyLmxlbmd0aCksIHIyID0gdDIgLSAxOyAwIDw9IHIyICYmIDEyOCA9PSAoMTkyICYgZTJbcjJdKTsgKSByMi0tOwogICAgICAgICAgcmV0dXJuIHIyIDwgMCA/IHQyIDogMCA9PT0gcjIgPyB0MiA6IHIyICsgdVtlMltyMl1dID4gdDIgPyByMiA6IHQyOwogICAgICAgIH07CiAgICAgIH0sIHsgIi4vY29tbW9uIjogNDEgfV0sIDQzOiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIHQuZXhwb3J0cyA9IGZ1bmN0aW9uKGUyLCB0MiwgcjIsIG4pIHsKICAgICAgICAgIGZvciAodmFyIGkgPSA2NTUzNSAmIGUyIHwgMCwgcyA9IGUyID4+PiAxNiAmIDY1NTM1IHwgMCwgYSA9IDA7IDAgIT09IHIyOyApIHsKICAgICAgICAgICAgZm9yIChyMiAtPSBhID0gMmUzIDwgcjIgPyAyZTMgOiByMjsgcyA9IHMgKyAoaSA9IGkgKyB0MltuKytdIHwgMCkgfCAwLCAtLWE7ICkgOwogICAgICAgICAgICBpICU9IDY1NTIxLCBzICU9IDY1NTIxOwogICAgICAgICAgfQogICAgICAgICAgcmV0dXJuIGkgfCBzIDw8IDE2IHwgMDsKICAgICAgICB9OwogICAgICB9LCB7fV0sIDQ0OiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIHQuZXhwb3J0cyA9IHsgWl9OT19GTFVTSDogMCwgWl9QQVJUSUFMX0ZMVVNIOiAxLCBaX1NZTkNfRkxVU0g6IDIsIFpfRlVMTF9GTFVTSDogMywgWl9GSU5JU0g6IDQsIFpfQkxPQ0s6IDUsIFpfVFJFRVM6IDYsIFpfT0s6IDAsIFpfU1RSRUFNX0VORDogMSwgWl9ORUVEX0RJQ1Q6IDIsIFpfRVJSTk86IC0xLCBaX1NUUkVBTV9FUlJPUjogLTIsIFpfREFUQV9FUlJPUjogLTMsIFpfQlVGX0VSUk9SOiAtNSwgWl9OT19DT01QUkVTU0lPTjogMCwgWl9CRVNUX1NQRUVEOiAxLCBaX0JFU1RfQ09NUFJFU1NJT046IDksIFpfREVGQVVMVF9DT01QUkVTU0lPTjogLTEsIFpfRklMVEVSRUQ6IDEsIFpfSFVGRk1BTl9PTkxZOiAyLCBaX1JMRTogMywgWl9GSVhFRDogNCwgWl9ERUZBVUxUX1NUUkFURUdZOiAwLCBaX0JJTkFSWTogMCwgWl9URVhUOiAxLCBaX1VOS05PV046IDIsIFpfREVGTEFURUQ6IDggfTsKICAgICAgfSwge31dLCA0NTogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICB2YXIgbyA9IGZ1bmN0aW9uKCkgewogICAgICAgICAgZm9yICh2YXIgZTIsIHQyID0gW10sIHIyID0gMDsgcjIgPCAyNTY7IHIyKyspIHsKICAgICAgICAgICAgZTIgPSByMjsKICAgICAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCA4OyBuKyspIGUyID0gMSAmIGUyID8gMzk4ODI5MjM4NCBeIGUyID4+PiAxIDogZTIgPj4+IDE7CiAgICAgICAgICAgIHQyW3IyXSA9IGUyOwogICAgICAgICAgfQogICAgICAgICAgcmV0dXJuIHQyOwogICAgICAgIH0oKTsKICAgICAgICB0LmV4cG9ydHMgPSBmdW5jdGlvbihlMiwgdDIsIHIyLCBuKSB7CiAgICAgICAgICB2YXIgaSA9IG8sIHMgPSBuICsgcjI7CiAgICAgICAgICBlMiBePSAtMTsKICAgICAgICAgIGZvciAodmFyIGEgPSBuOyBhIDwgczsgYSsrKSBlMiA9IGUyID4+PiA4IF4gaVsyNTUgJiAoZTIgXiB0MlthXSldOwogICAgICAgICAgcmV0dXJuIC0xIF4gZTI7CiAgICAgICAgfTsKICAgICAgfSwge31dLCA0NjogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICB2YXIgaCwgYyA9IGUoIi4uL3V0aWxzL2NvbW1vbiIpLCB1ID0gZSgiLi90cmVlcyIpLCBkID0gZSgiLi9hZGxlcjMyIiksIHAgPSBlKCIuL2NyYzMyIiksIG4gPSBlKCIuL21lc3NhZ2VzIiksIGwgPSAwLCBmID0gNCwgbSA9IDAsIF8gPSAtMiwgZyA9IC0xLCBiID0gNCwgaSA9IDIsIHYgPSA4LCB5ID0gOSwgcyA9IDI4NiwgYSA9IDMwLCBvID0gMTksIHcgPSAyICogcyArIDEsIGsgPSAxNSwgeCA9IDMsIFMgPSAyNTgsIHogPSBTICsgeCArIDEsIEMgPSA0MiwgRSA9IDExMywgQSA9IDEsIEkgPSAyLCBPID0gMywgQiA9IDQ7CiAgICAgICAgZnVuY3Rpb24gUihlMiwgdDIpIHsKICAgICAgICAgIHJldHVybiBlMi5tc2cgPSBuW3QyXSwgdDI7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIFQoZTIpIHsKICAgICAgICAgIHJldHVybiAoZTIgPDwgMSkgLSAoNCA8IGUyID8gOSA6IDApOwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBEKGUyKSB7CiAgICAgICAgICBmb3IgKHZhciB0MiA9IGUyLmxlbmd0aDsgMCA8PSAtLXQyOyApIGUyW3QyXSA9IDA7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIEYoZTIpIHsKICAgICAgICAgIHZhciB0MiA9IGUyLnN0YXRlLCByMiA9IHQyLnBlbmRpbmc7CiAgICAgICAgICByMiA+IGUyLmF2YWlsX291dCAmJiAocjIgPSBlMi5hdmFpbF9vdXQpLCAwICE9PSByMiAmJiAoYy5hcnJheVNldChlMi5vdXRwdXQsIHQyLnBlbmRpbmdfYnVmLCB0Mi5wZW5kaW5nX291dCwgcjIsIGUyLm5leHRfb3V0KSwgZTIubmV4dF9vdXQgKz0gcjIsIHQyLnBlbmRpbmdfb3V0ICs9IHIyLCBlMi50b3RhbF9vdXQgKz0gcjIsIGUyLmF2YWlsX291dCAtPSByMiwgdDIucGVuZGluZyAtPSByMiwgMCA9PT0gdDIucGVuZGluZyAmJiAodDIucGVuZGluZ19vdXQgPSAwKSk7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIE4oZTIsIHQyKSB7CiAgICAgICAgICB1Ll90cl9mbHVzaF9ibG9jayhlMiwgMCA8PSBlMi5ibG9ja19zdGFydCA/IGUyLmJsb2NrX3N0YXJ0IDogLTEsIGUyLnN0cnN0YXJ0IC0gZTIuYmxvY2tfc3RhcnQsIHQyKSwgZTIuYmxvY2tfc3RhcnQgPSBlMi5zdHJzdGFydCwgRihlMi5zdHJtKTsKICAgICAgICB9CiAgICAgICAgZnVuY3Rpb24gVShlMiwgdDIpIHsKICAgICAgICAgIGUyLnBlbmRpbmdfYnVmW2UyLnBlbmRpbmcrK10gPSB0MjsKICAgICAgICB9CiAgICAgICAgZnVuY3Rpb24gUChlMiwgdDIpIHsKICAgICAgICAgIGUyLnBlbmRpbmdfYnVmW2UyLnBlbmRpbmcrK10gPSB0MiA+Pj4gOCAmIDI1NSwgZTIucGVuZGluZ19idWZbZTIucGVuZGluZysrXSA9IDI1NSAmIHQyOwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBMKGUyLCB0MikgewogICAgICAgICAgdmFyIHIyLCBuMiwgaTIgPSBlMi5tYXhfY2hhaW5fbGVuZ3RoLCBzMiA9IGUyLnN0cnN0YXJ0LCBhMiA9IGUyLnByZXZfbGVuZ3RoLCBvMiA9IGUyLm5pY2VfbWF0Y2gsIGgyID0gZTIuc3Ryc3RhcnQgPiBlMi53X3NpemUgLSB6ID8gZTIuc3Ryc3RhcnQgLSAoZTIud19zaXplIC0geikgOiAwLCB1MiA9IGUyLndpbmRvdywgbDIgPSBlMi53X21hc2ssIGYyID0gZTIucHJldiwgYzIgPSBlMi5zdHJzdGFydCArIFMsIGQyID0gdTJbczIgKyBhMiAtIDFdLCBwMiA9IHUyW3MyICsgYTJdOwogICAgICAgICAgZTIucHJldl9sZW5ndGggPj0gZTIuZ29vZF9tYXRjaCAmJiAoaTIgPj49IDIpLCBvMiA+IGUyLmxvb2thaGVhZCAmJiAobzIgPSBlMi5sb29rYWhlYWQpOwogICAgICAgICAgZG8gewogICAgICAgICAgICBpZiAodTJbKHIyID0gdDIpICsgYTJdID09PSBwMiAmJiB1MltyMiArIGEyIC0gMV0gPT09IGQyICYmIHUyW3IyXSA9PT0gdTJbczJdICYmIHUyWysrcjJdID09PSB1MltzMiArIDFdKSB7CiAgICAgICAgICAgICAgczIgKz0gMiwgcjIrKzsKICAgICAgICAgICAgICBkbyB7CiAgICAgICAgICAgICAgfSB3aGlsZSAodTJbKytzMl0gPT09IHUyWysrcjJdICYmIHUyWysrczJdID09PSB1MlsrK3IyXSAmJiB1MlsrK3MyXSA9PT0gdTJbKytyMl0gJiYgdTJbKytzMl0gPT09IHUyWysrcjJdICYmIHUyWysrczJdID09PSB1MlsrK3IyXSAmJiB1MlsrK3MyXSA9PT0gdTJbKytyMl0gJiYgdTJbKytzMl0gPT09IHUyWysrcjJdICYmIHUyWysrczJdID09PSB1MlsrK3IyXSAmJiBzMiA8IGMyKTsKICAgICAgICAgICAgICBpZiAobjIgPSBTIC0gKGMyIC0gczIpLCBzMiA9IGMyIC0gUywgYTIgPCBuMikgewogICAgICAgICAgICAgICAgaWYgKGUyLm1hdGNoX3N0YXJ0ID0gdDIsIG8yIDw9IChhMiA9IG4yKSkgYnJlYWs7CiAgICAgICAgICAgICAgICBkMiA9IHUyW3MyICsgYTIgLSAxXSwgcDIgPSB1MltzMiArIGEyXTsKICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgIH0gd2hpbGUgKCh0MiA9IGYyW3QyICYgbDJdKSA+IGgyICYmIDAgIT0gLS1pMik7CiAgICAgICAgICByZXR1cm4gYTIgPD0gZTIubG9va2FoZWFkID8gYTIgOiBlMi5sb29rYWhlYWQ7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIGooZTIpIHsKICAgICAgICAgIHZhciB0MiwgcjIsIG4yLCBpMiwgczIsIGEyLCBvMiwgaDIsIHUyLCBsMiwgZjIgPSBlMi53X3NpemU7CiAgICAgICAgICBkbyB7CiAgICAgICAgICAgIGlmIChpMiA9IGUyLndpbmRvd19zaXplIC0gZTIubG9va2FoZWFkIC0gZTIuc3Ryc3RhcnQsIGUyLnN0cnN0YXJ0ID49IGYyICsgKGYyIC0geikpIHsKICAgICAgICAgICAgICBmb3IgKGMuYXJyYXlTZXQoZTIud2luZG93LCBlMi53aW5kb3csIGYyLCBmMiwgMCksIGUyLm1hdGNoX3N0YXJ0IC09IGYyLCBlMi5zdHJzdGFydCAtPSBmMiwgZTIuYmxvY2tfc3RhcnQgLT0gZjIsIHQyID0gcjIgPSBlMi5oYXNoX3NpemU7IG4yID0gZTIuaGVhZFstLXQyXSwgZTIuaGVhZFt0Ml0gPSBmMiA8PSBuMiA/IG4yIC0gZjIgOiAwLCAtLXIyOyApIDsKICAgICAgICAgICAgICBmb3IgKHQyID0gcjIgPSBmMjsgbjIgPSBlMi5wcmV2Wy0tdDJdLCBlMi5wcmV2W3QyXSA9IGYyIDw9IG4yID8gbjIgLSBmMiA6IDAsIC0tcjI7ICkgOwogICAgICAgICAgICAgIGkyICs9IGYyOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmICgwID09PSBlMi5zdHJtLmF2YWlsX2luKSBicmVhazsKICAgICAgICAgICAgaWYgKGEyID0gZTIuc3RybSwgbzIgPSBlMi53aW5kb3csIGgyID0gZTIuc3Ryc3RhcnQgKyBlMi5sb29rYWhlYWQsIHUyID0gaTIsIGwyID0gdm9pZCAwLCBsMiA9IGEyLmF2YWlsX2luLCB1MiA8IGwyICYmIChsMiA9IHUyKSwgcjIgPSAwID09PSBsMiA/IDAgOiAoYTIuYXZhaWxfaW4gLT0gbDIsIGMuYXJyYXlTZXQobzIsIGEyLmlucHV0LCBhMi5uZXh0X2luLCBsMiwgaDIpLCAxID09PSBhMi5zdGF0ZS53cmFwID8gYTIuYWRsZXIgPSBkKGEyLmFkbGVyLCBvMiwgbDIsIGgyKSA6IDIgPT09IGEyLnN0YXRlLndyYXAgJiYgKGEyLmFkbGVyID0gcChhMi5hZGxlciwgbzIsIGwyLCBoMikpLCBhMi5uZXh0X2luICs9IGwyLCBhMi50b3RhbF9pbiArPSBsMiwgbDIpLCBlMi5sb29rYWhlYWQgKz0gcjIsIGUyLmxvb2thaGVhZCArIGUyLmluc2VydCA+PSB4KSBmb3IgKHMyID0gZTIuc3Ryc3RhcnQgLSBlMi5pbnNlcnQsIGUyLmluc19oID0gZTIud2luZG93W3MyXSwgZTIuaW5zX2ggPSAoZTIuaW5zX2ggPDwgZTIuaGFzaF9zaGlmdCBeIGUyLndpbmRvd1tzMiArIDFdKSAmIGUyLmhhc2hfbWFzazsgZTIuaW5zZXJ0ICYmIChlMi5pbnNfaCA9IChlMi5pbnNfaCA8PCBlMi5oYXNoX3NoaWZ0IF4gZTIud2luZG93W3MyICsgeCAtIDFdKSAmIGUyLmhhc2hfbWFzaywgZTIucHJldltzMiAmIGUyLndfbWFza10gPSBlMi5oZWFkW2UyLmluc19oXSwgZTIuaGVhZFtlMi5pbnNfaF0gPSBzMiwgczIrKywgZTIuaW5zZXJ0LS0sICEoZTIubG9va2FoZWFkICsgZTIuaW5zZXJ0IDwgeCkpOyApIDsKICAgICAgICAgIH0gd2hpbGUgKGUyLmxvb2thaGVhZCA8IHogJiYgMCAhPT0gZTIuc3RybS5hdmFpbF9pbik7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIFooZTIsIHQyKSB7CiAgICAgICAgICBmb3IgKHZhciByMiwgbjI7IDsgKSB7CiAgICAgICAgICAgIGlmIChlMi5sb29rYWhlYWQgPCB6KSB7CiAgICAgICAgICAgICAgaWYgKGooZTIpLCBlMi5sb29rYWhlYWQgPCB6ICYmIHQyID09PSBsKSByZXR1cm4gQTsKICAgICAgICAgICAgICBpZiAoMCA9PT0gZTIubG9va2FoZWFkKSBicmVhazsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAocjIgPSAwLCBlMi5sb29rYWhlYWQgPj0geCAmJiAoZTIuaW5zX2ggPSAoZTIuaW5zX2ggPDwgZTIuaGFzaF9zaGlmdCBeIGUyLndpbmRvd1tlMi5zdHJzdGFydCArIHggLSAxXSkgJiBlMi5oYXNoX21hc2ssIHIyID0gZTIucHJldltlMi5zdHJzdGFydCAmIGUyLndfbWFza10gPSBlMi5oZWFkW2UyLmluc19oXSwgZTIuaGVhZFtlMi5pbnNfaF0gPSBlMi5zdHJzdGFydCksIDAgIT09IHIyICYmIGUyLnN0cnN0YXJ0IC0gcjIgPD0gZTIud19zaXplIC0geiAmJiAoZTIubWF0Y2hfbGVuZ3RoID0gTChlMiwgcjIpKSwgZTIubWF0Y2hfbGVuZ3RoID49IHgpIGlmIChuMiA9IHUuX3RyX3RhbGx5KGUyLCBlMi5zdHJzdGFydCAtIGUyLm1hdGNoX3N0YXJ0LCBlMi5tYXRjaF9sZW5ndGggLSB4KSwgZTIubG9va2FoZWFkIC09IGUyLm1hdGNoX2xlbmd0aCwgZTIubWF0Y2hfbGVuZ3RoIDw9IGUyLm1heF9sYXp5X21hdGNoICYmIGUyLmxvb2thaGVhZCA+PSB4KSB7CiAgICAgICAgICAgICAgZm9yIChlMi5tYXRjaF9sZW5ndGgtLTsgZTIuc3Ryc3RhcnQrKywgZTIuaW5zX2ggPSAoZTIuaW5zX2ggPDwgZTIuaGFzaF9zaGlmdCBeIGUyLndpbmRvd1tlMi5zdHJzdGFydCArIHggLSAxXSkgJiBlMi5oYXNoX21hc2ssIHIyID0gZTIucHJldltlMi5zdHJzdGFydCAmIGUyLndfbWFza10gPSBlMi5oZWFkW2UyLmluc19oXSwgZTIuaGVhZFtlMi5pbnNfaF0gPSBlMi5zdHJzdGFydCwgMCAhPSAtLWUyLm1hdGNoX2xlbmd0aDsgKSA7CiAgICAgICAgICAgICAgZTIuc3Ryc3RhcnQrKzsKICAgICAgICAgICAgfSBlbHNlIGUyLnN0cnN0YXJ0ICs9IGUyLm1hdGNoX2xlbmd0aCwgZTIubWF0Y2hfbGVuZ3RoID0gMCwgZTIuaW5zX2ggPSBlMi53aW5kb3dbZTIuc3Ryc3RhcnRdLCBlMi5pbnNfaCA9IChlMi5pbnNfaCA8PCBlMi5oYXNoX3NoaWZ0IF4gZTIud2luZG93W2UyLnN0cnN0YXJ0ICsgMV0pICYgZTIuaGFzaF9tYXNrOwogICAgICAgICAgICBlbHNlIG4yID0gdS5fdHJfdGFsbHkoZTIsIDAsIGUyLndpbmRvd1tlMi5zdHJzdGFydF0pLCBlMi5sb29rYWhlYWQtLSwgZTIuc3Ryc3RhcnQrKzsKICAgICAgICAgICAgaWYgKG4yICYmIChOKGUyLCBmYWxzZSksIDAgPT09IGUyLnN0cm0uYXZhaWxfb3V0KSkgcmV0dXJuIEE7CiAgICAgICAgICB9CiAgICAgICAgICByZXR1cm4gZTIuaW5zZXJ0ID0gZTIuc3Ryc3RhcnQgPCB4IC0gMSA/IGUyLnN0cnN0YXJ0IDogeCAtIDEsIHQyID09PSBmID8gKE4oZTIsIHRydWUpLCAwID09PSBlMi5zdHJtLmF2YWlsX291dCA/IE8gOiBCKSA6IGUyLmxhc3RfbGl0ICYmIChOKGUyLCBmYWxzZSksIDAgPT09IGUyLnN0cm0uYXZhaWxfb3V0KSA/IEEgOiBJOwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBXKGUyLCB0MikgewogICAgICAgICAgZm9yICh2YXIgcjIsIG4yLCBpMjsgOyApIHsKICAgICAgICAgICAgaWYgKGUyLmxvb2thaGVhZCA8IHopIHsKICAgICAgICAgICAgICBpZiAoaihlMiksIGUyLmxvb2thaGVhZCA8IHogJiYgdDIgPT09IGwpIHJldHVybiBBOwogICAgICAgICAgICAgIGlmICgwID09PSBlMi5sb29rYWhlYWQpIGJyZWFrOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChyMiA9IDAsIGUyLmxvb2thaGVhZCA+PSB4ICYmIChlMi5pbnNfaCA9IChlMi5pbnNfaCA8PCBlMi5oYXNoX3NoaWZ0IF4gZTIud2luZG93W2UyLnN0cnN0YXJ0ICsgeCAtIDFdKSAmIGUyLmhhc2hfbWFzaywgcjIgPSBlMi5wcmV2W2UyLnN0cnN0YXJ0ICYgZTIud19tYXNrXSA9IGUyLmhlYWRbZTIuaW5zX2hdLCBlMi5oZWFkW2UyLmluc19oXSA9IGUyLnN0cnN0YXJ0KSwgZTIucHJldl9sZW5ndGggPSBlMi5tYXRjaF9sZW5ndGgsIGUyLnByZXZfbWF0Y2ggPSBlMi5tYXRjaF9zdGFydCwgZTIubWF0Y2hfbGVuZ3RoID0geCAtIDEsIDAgIT09IHIyICYmIGUyLnByZXZfbGVuZ3RoIDwgZTIubWF4X2xhenlfbWF0Y2ggJiYgZTIuc3Ryc3RhcnQgLSByMiA8PSBlMi53X3NpemUgLSB6ICYmIChlMi5tYXRjaF9sZW5ndGggPSBMKGUyLCByMiksIGUyLm1hdGNoX2xlbmd0aCA8PSA1ICYmICgxID09PSBlMi5zdHJhdGVneSB8fCBlMi5tYXRjaF9sZW5ndGggPT09IHggJiYgNDA5NiA8IGUyLnN0cnN0YXJ0IC0gZTIubWF0Y2hfc3RhcnQpICYmIChlMi5tYXRjaF9sZW5ndGggPSB4IC0gMSkpLCBlMi5wcmV2X2xlbmd0aCA+PSB4ICYmIGUyLm1hdGNoX2xlbmd0aCA8PSBlMi5wcmV2X2xlbmd0aCkgewogICAgICAgICAgICAgIGZvciAoaTIgPSBlMi5zdHJzdGFydCArIGUyLmxvb2thaGVhZCAtIHgsIG4yID0gdS5fdHJfdGFsbHkoZTIsIGUyLnN0cnN0YXJ0IC0gMSAtIGUyLnByZXZfbWF0Y2gsIGUyLnByZXZfbGVuZ3RoIC0geCksIGUyLmxvb2thaGVhZCAtPSBlMi5wcmV2X2xlbmd0aCAtIDEsIGUyLnByZXZfbGVuZ3RoIC09IDI7ICsrZTIuc3Ryc3RhcnQgPD0gaTIgJiYgKGUyLmluc19oID0gKGUyLmluc19oIDw8IGUyLmhhc2hfc2hpZnQgXiBlMi53aW5kb3dbZTIuc3Ryc3RhcnQgKyB4IC0gMV0pICYgZTIuaGFzaF9tYXNrLCByMiA9IGUyLnByZXZbZTIuc3Ryc3RhcnQgJiBlMi53X21hc2tdID0gZTIuaGVhZFtlMi5pbnNfaF0sIGUyLmhlYWRbZTIuaW5zX2hdID0gZTIuc3Ryc3RhcnQpLCAwICE9IC0tZTIucHJldl9sZW5ndGg7ICkgOwogICAgICAgICAgICAgIGlmIChlMi5tYXRjaF9hdmFpbGFibGUgPSAwLCBlMi5tYXRjaF9sZW5ndGggPSB4IC0gMSwgZTIuc3Ryc3RhcnQrKywgbjIgJiYgKE4oZTIsIGZhbHNlKSwgMCA9PT0gZTIuc3RybS5hdmFpbF9vdXQpKSByZXR1cm4gQTsKICAgICAgICAgICAgfSBlbHNlIGlmIChlMi5tYXRjaF9hdmFpbGFibGUpIHsKICAgICAgICAgICAgICBpZiAoKG4yID0gdS5fdHJfdGFsbHkoZTIsIDAsIGUyLndpbmRvd1tlMi5zdHJzdGFydCAtIDFdKSkgJiYgTihlMiwgZmFsc2UpLCBlMi5zdHJzdGFydCsrLCBlMi5sb29rYWhlYWQtLSwgMCA9PT0gZTIuc3RybS5hdmFpbF9vdXQpIHJldHVybiBBOwogICAgICAgICAgICB9IGVsc2UgZTIubWF0Y2hfYXZhaWxhYmxlID0gMSwgZTIuc3Ryc3RhcnQrKywgZTIubG9va2FoZWFkLS07CiAgICAgICAgICB9CiAgICAgICAgICByZXR1cm4gZTIubWF0Y2hfYXZhaWxhYmxlICYmIChuMiA9IHUuX3RyX3RhbGx5KGUyLCAwLCBlMi53aW5kb3dbZTIuc3Ryc3RhcnQgLSAxXSksIGUyLm1hdGNoX2F2YWlsYWJsZSA9IDApLCBlMi5pbnNlcnQgPSBlMi5zdHJzdGFydCA8IHggLSAxID8gZTIuc3Ryc3RhcnQgOiB4IC0gMSwgdDIgPT09IGYgPyAoTihlMiwgdHJ1ZSksIDAgPT09IGUyLnN0cm0uYXZhaWxfb3V0ID8gTyA6IEIpIDogZTIubGFzdF9saXQgJiYgKE4oZTIsIGZhbHNlKSwgMCA9PT0gZTIuc3RybS5hdmFpbF9vdXQpID8gQSA6IEk7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIE0oZTIsIHQyLCByMiwgbjIsIGkyKSB7CiAgICAgICAgICB0aGlzLmdvb2RfbGVuZ3RoID0gZTIsIHRoaXMubWF4X2xhenkgPSB0MiwgdGhpcy5uaWNlX2xlbmd0aCA9IHIyLCB0aGlzLm1heF9jaGFpbiA9IG4yLCB0aGlzLmZ1bmMgPSBpMjsKICAgICAgICB9CiAgICAgICAgZnVuY3Rpb24gSCgpIHsKICAgICAgICAgIHRoaXMuc3RybSA9IG51bGwsIHRoaXMuc3RhdHVzID0gMCwgdGhpcy5wZW5kaW5nX2J1ZiA9IG51bGwsIHRoaXMucGVuZGluZ19idWZfc2l6ZSA9IDAsIHRoaXMucGVuZGluZ19vdXQgPSAwLCB0aGlzLnBlbmRpbmcgPSAwLCB0aGlzLndyYXAgPSAwLCB0aGlzLmd6aGVhZCA9IG51bGwsIHRoaXMuZ3ppbmRleCA9IDAsIHRoaXMubWV0aG9kID0gdiwgdGhpcy5sYXN0X2ZsdXNoID0gLTEsIHRoaXMud19zaXplID0gMCwgdGhpcy53X2JpdHMgPSAwLCB0aGlzLndfbWFzayA9IDAsIHRoaXMud2luZG93ID0gbnVsbCwgdGhpcy53aW5kb3dfc2l6ZSA9IDAsIHRoaXMucHJldiA9IG51bGwsIHRoaXMuaGVhZCA9IG51bGwsIHRoaXMuaW5zX2ggPSAwLCB0aGlzLmhhc2hfc2l6ZSA9IDAsIHRoaXMuaGFzaF9iaXRzID0gMCwgdGhpcy5oYXNoX21hc2sgPSAwLCB0aGlzLmhhc2hfc2hpZnQgPSAwLCB0aGlzLmJsb2NrX3N0YXJ0ID0gMCwgdGhpcy5tYXRjaF9sZW5ndGggPSAwLCB0aGlzLnByZXZfbWF0Y2ggPSAwLCB0aGlzLm1hdGNoX2F2YWlsYWJsZSA9IDAsIHRoaXMuc3Ryc3RhcnQgPSAwLCB0aGlzLm1hdGNoX3N0YXJ0ID0gMCwgdGhpcy5sb29rYWhlYWQgPSAwLCB0aGlzLnByZXZfbGVuZ3RoID0gMCwgdGhpcy5tYXhfY2hhaW5fbGVuZ3RoID0gMCwgdGhpcy5tYXhfbGF6eV9tYXRjaCA9IDAsIHRoaXMubGV2ZWwgPSAwLCB0aGlzLnN0cmF0ZWd5ID0gMCwgdGhpcy5nb29kX21hdGNoID0gMCwgdGhpcy5uaWNlX21hdGNoID0gMCwgdGhpcy5keW5fbHRyZWUgPSBuZXcgYy5CdWYxNigyICogdyksIHRoaXMuZHluX2R0cmVlID0gbmV3IGMuQnVmMTYoMiAqICgyICogYSArIDEpKSwgdGhpcy5ibF90cmVlID0gbmV3IGMuQnVmMTYoMiAqICgyICogbyArIDEpKSwgRCh0aGlzLmR5bl9sdHJlZSksIEQodGhpcy5keW5fZHRyZWUpLCBEKHRoaXMuYmxfdHJlZSksIHRoaXMubF9kZXNjID0gbnVsbCwgdGhpcy5kX2Rlc2MgPSBudWxsLCB0aGlzLmJsX2Rlc2MgPSBudWxsLCB0aGlzLmJsX2NvdW50ID0gbmV3IGMuQnVmMTYoayArIDEpLCB0aGlzLmhlYXAgPSBuZXcgYy5CdWYxNigyICogcyArIDEpLCBEKHRoaXMuaGVhcCksIHRoaXMuaGVhcF9sZW4gPSAwLCB0aGlzLmhlYXBfbWF4ID0gMCwgdGhpcy5kZXB0aCA9IG5ldyBjLkJ1ZjE2KDIgKiBzICsgMSksIEQodGhpcy5kZXB0aCksIHRoaXMubF9idWYgPSAwLCB0aGlzLmxpdF9idWZzaXplID0gMCwgdGhpcy5sYXN0X2xpdCA9IDAsIHRoaXMuZF9idWYgPSAwLCB0aGlzLm9wdF9sZW4gPSAwLCB0aGlzLnN0YXRpY19sZW4gPSAwLCB0aGlzLm1hdGNoZXMgPSAwLCB0aGlzLmluc2VydCA9IDAsIHRoaXMuYmlfYnVmID0gMCwgdGhpcy5iaV92YWxpZCA9IDA7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIEcoZTIpIHsKICAgICAgICAgIHZhciB0MjsKICAgICAgICAgIHJldHVybiBlMiAmJiBlMi5zdGF0ZSA/IChlMi50b3RhbF9pbiA9IGUyLnRvdGFsX291dCA9IDAsIGUyLmRhdGFfdHlwZSA9IGksICh0MiA9IGUyLnN0YXRlKS5wZW5kaW5nID0gMCwgdDIucGVuZGluZ19vdXQgPSAwLCB0Mi53cmFwIDwgMCAmJiAodDIud3JhcCA9IC10Mi53cmFwKSwgdDIuc3RhdHVzID0gdDIud3JhcCA/IEMgOiBFLCBlMi5hZGxlciA9IDIgPT09IHQyLndyYXAgPyAwIDogMSwgdDIubGFzdF9mbHVzaCA9IGwsIHUuX3RyX2luaXQodDIpLCBtKSA6IFIoZTIsIF8pOwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBLKGUyKSB7CiAgICAgICAgICB2YXIgdDIgPSBHKGUyKTsKICAgICAgICAgIHJldHVybiB0MiA9PT0gbSAmJiBmdW5jdGlvbihlMykgewogICAgICAgICAgICBlMy53aW5kb3dfc2l6ZSA9IDIgKiBlMy53X3NpemUsIEQoZTMuaGVhZCksIGUzLm1heF9sYXp5X21hdGNoID0gaFtlMy5sZXZlbF0ubWF4X2xhenksIGUzLmdvb2RfbWF0Y2ggPSBoW2UzLmxldmVsXS5nb29kX2xlbmd0aCwgZTMubmljZV9tYXRjaCA9IGhbZTMubGV2ZWxdLm5pY2VfbGVuZ3RoLCBlMy5tYXhfY2hhaW5fbGVuZ3RoID0gaFtlMy5sZXZlbF0ubWF4X2NoYWluLCBlMy5zdHJzdGFydCA9IDAsIGUzLmJsb2NrX3N0YXJ0ID0gMCwgZTMubG9va2FoZWFkID0gMCwgZTMuaW5zZXJ0ID0gMCwgZTMubWF0Y2hfbGVuZ3RoID0gZTMucHJldl9sZW5ndGggPSB4IC0gMSwgZTMubWF0Y2hfYXZhaWxhYmxlID0gMCwgZTMuaW5zX2ggPSAwOwogICAgICAgICAgfShlMi5zdGF0ZSksIHQyOwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBZKGUyLCB0MiwgcjIsIG4yLCBpMiwgczIpIHsKICAgICAgICAgIGlmICghZTIpIHJldHVybiBfOwogICAgICAgICAgdmFyIGEyID0gMTsKICAgICAgICAgIGlmICh0MiA9PT0gZyAmJiAodDIgPSA2KSwgbjIgPCAwID8gKGEyID0gMCwgbjIgPSAtbjIpIDogMTUgPCBuMiAmJiAoYTIgPSAyLCBuMiAtPSAxNiksIGkyIDwgMSB8fCB5IDwgaTIgfHwgcjIgIT09IHYgfHwgbjIgPCA4IHx8IDE1IDwgbjIgfHwgdDIgPCAwIHx8IDkgPCB0MiB8fCBzMiA8IDAgfHwgYiA8IHMyKSByZXR1cm4gUihlMiwgXyk7CiAgICAgICAgICA4ID09PSBuMiAmJiAobjIgPSA5KTsKICAgICAgICAgIHZhciBvMiA9IG5ldyBIKCk7CiAgICAgICAgICByZXR1cm4gKGUyLnN0YXRlID0gbzIpLnN0cm0gPSBlMiwgbzIud3JhcCA9IGEyLCBvMi5nemhlYWQgPSBudWxsLCBvMi53X2JpdHMgPSBuMiwgbzIud19zaXplID0gMSA8PCBvMi53X2JpdHMsIG8yLndfbWFzayA9IG8yLndfc2l6ZSAtIDEsIG8yLmhhc2hfYml0cyA9IGkyICsgNywgbzIuaGFzaF9zaXplID0gMSA8PCBvMi5oYXNoX2JpdHMsIG8yLmhhc2hfbWFzayA9IG8yLmhhc2hfc2l6ZSAtIDEsIG8yLmhhc2hfc2hpZnQgPSB+figobzIuaGFzaF9iaXRzICsgeCAtIDEpIC8geCksIG8yLndpbmRvdyA9IG5ldyBjLkJ1ZjgoMiAqIG8yLndfc2l6ZSksIG8yLmhlYWQgPSBuZXcgYy5CdWYxNihvMi5oYXNoX3NpemUpLCBvMi5wcmV2ID0gbmV3IGMuQnVmMTYobzIud19zaXplKSwgbzIubGl0X2J1ZnNpemUgPSAxIDw8IGkyICsgNiwgbzIucGVuZGluZ19idWZfc2l6ZSA9IDQgKiBvMi5saXRfYnVmc2l6ZSwgbzIucGVuZGluZ19idWYgPSBuZXcgYy5CdWY4KG8yLnBlbmRpbmdfYnVmX3NpemUpLCBvMi5kX2J1ZiA9IDEgKiBvMi5saXRfYnVmc2l6ZSwgbzIubF9idWYgPSAzICogbzIubGl0X2J1ZnNpemUsIG8yLmxldmVsID0gdDIsIG8yLnN0cmF0ZWd5ID0gczIsIG8yLm1ldGhvZCA9IHIyLCBLKGUyKTsKICAgICAgICB9CiAgICAgICAgaCA9IFtuZXcgTSgwLCAwLCAwLCAwLCBmdW5jdGlvbihlMiwgdDIpIHsKICAgICAgICAgIHZhciByMiA9IDY1NTM1OwogICAgICAgICAgZm9yIChyMiA+IGUyLnBlbmRpbmdfYnVmX3NpemUgLSA1ICYmIChyMiA9IGUyLnBlbmRpbmdfYnVmX3NpemUgLSA1KTsgOyApIHsKICAgICAgICAgICAgaWYgKGUyLmxvb2thaGVhZCA8PSAxKSB7CiAgICAgICAgICAgICAgaWYgKGooZTIpLCAwID09PSBlMi5sb29rYWhlYWQgJiYgdDIgPT09IGwpIHJldHVybiBBOwogICAgICAgICAgICAgIGlmICgwID09PSBlMi5sb29rYWhlYWQpIGJyZWFrOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGUyLnN0cnN0YXJ0ICs9IGUyLmxvb2thaGVhZCwgZTIubG9va2FoZWFkID0gMDsKICAgICAgICAgICAgdmFyIG4yID0gZTIuYmxvY2tfc3RhcnQgKyByMjsKICAgICAgICAgICAgaWYgKCgwID09PSBlMi5zdHJzdGFydCB8fCBlMi5zdHJzdGFydCA+PSBuMikgJiYgKGUyLmxvb2thaGVhZCA9IGUyLnN0cnN0YXJ0IC0gbjIsIGUyLnN0cnN0YXJ0ID0gbjIsIE4oZTIsIGZhbHNlKSwgMCA9PT0gZTIuc3RybS5hdmFpbF9vdXQpKSByZXR1cm4gQTsKICAgICAgICAgICAgaWYgKGUyLnN0cnN0YXJ0IC0gZTIuYmxvY2tfc3RhcnQgPj0gZTIud19zaXplIC0geiAmJiAoTihlMiwgZmFsc2UpLCAwID09PSBlMi5zdHJtLmF2YWlsX291dCkpIHJldHVybiBBOwogICAgICAgICAgfQogICAgICAgICAgcmV0dXJuIGUyLmluc2VydCA9IDAsIHQyID09PSBmID8gKE4oZTIsIHRydWUpLCAwID09PSBlMi5zdHJtLmF2YWlsX291dCA/IE8gOiBCKSA6IChlMi5zdHJzdGFydCA+IGUyLmJsb2NrX3N0YXJ0ICYmIChOKGUyLCBmYWxzZSksIGUyLnN0cm0uYXZhaWxfb3V0KSwgQSk7CiAgICAgICAgfSksIG5ldyBNKDQsIDQsIDgsIDQsIFopLCBuZXcgTSg0LCA1LCAxNiwgOCwgWiksIG5ldyBNKDQsIDYsIDMyLCAzMiwgWiksIG5ldyBNKDQsIDQsIDE2LCAxNiwgVyksIG5ldyBNKDgsIDE2LCAzMiwgMzIsIFcpLCBuZXcgTSg4LCAxNiwgMTI4LCAxMjgsIFcpLCBuZXcgTSg4LCAzMiwgMTI4LCAyNTYsIFcpLCBuZXcgTSgzMiwgMTI4LCAyNTgsIDEwMjQsIFcpLCBuZXcgTSgzMiwgMjU4LCAyNTgsIDQwOTYsIFcpXSwgci5kZWZsYXRlSW5pdCA9IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgcmV0dXJuIFkoZTIsIHQyLCB2LCAxNSwgOCwgMCk7CiAgICAgICAgfSwgci5kZWZsYXRlSW5pdDIgPSBZLCByLmRlZmxhdGVSZXNldCA9IEssIHIuZGVmbGF0ZVJlc2V0S2VlcCA9IEcsIHIuZGVmbGF0ZVNldEhlYWRlciA9IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgcmV0dXJuIGUyICYmIGUyLnN0YXRlID8gMiAhPT0gZTIuc3RhdGUud3JhcCA/IF8gOiAoZTIuc3RhdGUuZ3poZWFkID0gdDIsIG0pIDogXzsKICAgICAgICB9LCByLmRlZmxhdGUgPSBmdW5jdGlvbihlMiwgdDIpIHsKICAgICAgICAgIHZhciByMiwgbjIsIGkyLCBzMjsKICAgICAgICAgIGlmICghZTIgfHwgIWUyLnN0YXRlIHx8IDUgPCB0MiB8fCB0MiA8IDApIHJldHVybiBlMiA/IFIoZTIsIF8pIDogXzsKICAgICAgICAgIGlmIChuMiA9IGUyLnN0YXRlLCAhZTIub3V0cHV0IHx8ICFlMi5pbnB1dCAmJiAwICE9PSBlMi5hdmFpbF9pbiB8fCA2NjYgPT09IG4yLnN0YXR1cyAmJiB0MiAhPT0gZikgcmV0dXJuIFIoZTIsIDAgPT09IGUyLmF2YWlsX291dCA/IC01IDogXyk7CiAgICAgICAgICBpZiAobjIuc3RybSA9IGUyLCByMiA9IG4yLmxhc3RfZmx1c2gsIG4yLmxhc3RfZmx1c2ggPSB0MiwgbjIuc3RhdHVzID09PSBDKSBpZiAoMiA9PT0gbjIud3JhcCkgZTIuYWRsZXIgPSAwLCBVKG4yLCAzMSksIFUobjIsIDEzOSksIFUobjIsIDgpLCBuMi5nemhlYWQgPyAoVShuMiwgKG4yLmd6aGVhZC50ZXh0ID8gMSA6IDApICsgKG4yLmd6aGVhZC5oY3JjID8gMiA6IDApICsgKG4yLmd6aGVhZC5leHRyYSA/IDQgOiAwKSArIChuMi5nemhlYWQubmFtZSA/IDggOiAwKSArIChuMi5nemhlYWQuY29tbWVudCA/IDE2IDogMCkpLCBVKG4yLCAyNTUgJiBuMi5nemhlYWQudGltZSksIFUobjIsIG4yLmd6aGVhZC50aW1lID4+IDggJiAyNTUpLCBVKG4yLCBuMi5nemhlYWQudGltZSA+PiAxNiAmIDI1NSksIFUobjIsIG4yLmd6aGVhZC50aW1lID4+IDI0ICYgMjU1KSwgVShuMiwgOSA9PT0gbjIubGV2ZWwgPyAyIDogMiA8PSBuMi5zdHJhdGVneSB8fCBuMi5sZXZlbCA8IDIgPyA0IDogMCksIFUobjIsIDI1NSAmIG4yLmd6aGVhZC5vcyksIG4yLmd6aGVhZC5leHRyYSAmJiBuMi5nemhlYWQuZXh0cmEubGVuZ3RoICYmIChVKG4yLCAyNTUgJiBuMi5nemhlYWQuZXh0cmEubGVuZ3RoKSwgVShuMiwgbjIuZ3poZWFkLmV4dHJhLmxlbmd0aCA+PiA4ICYgMjU1KSksIG4yLmd6aGVhZC5oY3JjICYmIChlMi5hZGxlciA9IHAoZTIuYWRsZXIsIG4yLnBlbmRpbmdfYnVmLCBuMi5wZW5kaW5nLCAwKSksIG4yLmd6aW5kZXggPSAwLCBuMi5zdGF0dXMgPSA2OSkgOiAoVShuMiwgMCksIFUobjIsIDApLCBVKG4yLCAwKSwgVShuMiwgMCksIFUobjIsIDApLCBVKG4yLCA5ID09PSBuMi5sZXZlbCA/IDIgOiAyIDw9IG4yLnN0cmF0ZWd5IHx8IG4yLmxldmVsIDwgMiA/IDQgOiAwKSwgVShuMiwgMyksIG4yLnN0YXR1cyA9IEUpOwogICAgICAgICAgZWxzZSB7CiAgICAgICAgICAgIHZhciBhMiA9IHYgKyAobjIud19iaXRzIC0gOCA8PCA0KSA8PCA4OwogICAgICAgICAgICBhMiB8PSAoMiA8PSBuMi5zdHJhdGVneSB8fCBuMi5sZXZlbCA8IDIgPyAwIDogbjIubGV2ZWwgPCA2ID8gMSA6IDYgPT09IG4yLmxldmVsID8gMiA6IDMpIDw8IDYsIDAgIT09IG4yLnN0cnN0YXJ0ICYmIChhMiB8PSAzMiksIGEyICs9IDMxIC0gYTIgJSAzMSwgbjIuc3RhdHVzID0gRSwgUChuMiwgYTIpLCAwICE9PSBuMi5zdHJzdGFydCAmJiAoUChuMiwgZTIuYWRsZXIgPj4+IDE2KSwgUChuMiwgNjU1MzUgJiBlMi5hZGxlcikpLCBlMi5hZGxlciA9IDE7CiAgICAgICAgICB9CiAgICAgICAgICBpZiAoNjkgPT09IG4yLnN0YXR1cykgaWYgKG4yLmd6aGVhZC5leHRyYSkgewogICAgICAgICAgICBmb3IgKGkyID0gbjIucGVuZGluZzsgbjIuZ3ppbmRleCA8ICg2NTUzNSAmIG4yLmd6aGVhZC5leHRyYS5sZW5ndGgpICYmIChuMi5wZW5kaW5nICE9PSBuMi5wZW5kaW5nX2J1Zl9zaXplIHx8IChuMi5nemhlYWQuaGNyYyAmJiBuMi5wZW5kaW5nID4gaTIgJiYgKGUyLmFkbGVyID0gcChlMi5hZGxlciwgbjIucGVuZGluZ19idWYsIG4yLnBlbmRpbmcgLSBpMiwgaTIpKSwgRihlMiksIGkyID0gbjIucGVuZGluZywgbjIucGVuZGluZyAhPT0gbjIucGVuZGluZ19idWZfc2l6ZSkpOyApIFUobjIsIDI1NSAmIG4yLmd6aGVhZC5leHRyYVtuMi5nemluZGV4XSksIG4yLmd6aW5kZXgrKzsKICAgICAgICAgICAgbjIuZ3poZWFkLmhjcmMgJiYgbjIucGVuZGluZyA+IGkyICYmIChlMi5hZGxlciA9IHAoZTIuYWRsZXIsIG4yLnBlbmRpbmdfYnVmLCBuMi5wZW5kaW5nIC0gaTIsIGkyKSksIG4yLmd6aW5kZXggPT09IG4yLmd6aGVhZC5leHRyYS5sZW5ndGggJiYgKG4yLmd6aW5kZXggPSAwLCBuMi5zdGF0dXMgPSA3Myk7CiAgICAgICAgICB9IGVsc2UgbjIuc3RhdHVzID0gNzM7CiAgICAgICAgICBpZiAoNzMgPT09IG4yLnN0YXR1cykgaWYgKG4yLmd6aGVhZC5uYW1lKSB7CiAgICAgICAgICAgIGkyID0gbjIucGVuZGluZzsKICAgICAgICAgICAgZG8gewogICAgICAgICAgICAgIGlmIChuMi5wZW5kaW5nID09PSBuMi5wZW5kaW5nX2J1Zl9zaXplICYmIChuMi5nemhlYWQuaGNyYyAmJiBuMi5wZW5kaW5nID4gaTIgJiYgKGUyLmFkbGVyID0gcChlMi5hZGxlciwgbjIucGVuZGluZ19idWYsIG4yLnBlbmRpbmcgLSBpMiwgaTIpKSwgRihlMiksIGkyID0gbjIucGVuZGluZywgbjIucGVuZGluZyA9PT0gbjIucGVuZGluZ19idWZfc2l6ZSkpIHsKICAgICAgICAgICAgICAgIHMyID0gMTsKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgIH0KICAgICAgICAgICAgICBzMiA9IG4yLmd6aW5kZXggPCBuMi5nemhlYWQubmFtZS5sZW5ndGggPyAyNTUgJiBuMi5nemhlYWQubmFtZS5jaGFyQ29kZUF0KG4yLmd6aW5kZXgrKykgOiAwLCBVKG4yLCBzMik7CiAgICAgICAgICAgIH0gd2hpbGUgKDAgIT09IHMyKTsKICAgICAgICAgICAgbjIuZ3poZWFkLmhjcmMgJiYgbjIucGVuZGluZyA+IGkyICYmIChlMi5hZGxlciA9IHAoZTIuYWRsZXIsIG4yLnBlbmRpbmdfYnVmLCBuMi5wZW5kaW5nIC0gaTIsIGkyKSksIDAgPT09IHMyICYmIChuMi5nemluZGV4ID0gMCwgbjIuc3RhdHVzID0gOTEpOwogICAgICAgICAgfSBlbHNlIG4yLnN0YXR1cyA9IDkxOwogICAgICAgICAgaWYgKDkxID09PSBuMi5zdGF0dXMpIGlmIChuMi5nemhlYWQuY29tbWVudCkgewogICAgICAgICAgICBpMiA9IG4yLnBlbmRpbmc7CiAgICAgICAgICAgIGRvIHsKICAgICAgICAgICAgICBpZiAobjIucGVuZGluZyA9PT0gbjIucGVuZGluZ19idWZfc2l6ZSAmJiAobjIuZ3poZWFkLmhjcmMgJiYgbjIucGVuZGluZyA+IGkyICYmIChlMi5hZGxlciA9IHAoZTIuYWRsZXIsIG4yLnBlbmRpbmdfYnVmLCBuMi5wZW5kaW5nIC0gaTIsIGkyKSksIEYoZTIpLCBpMiA9IG4yLnBlbmRpbmcsIG4yLnBlbmRpbmcgPT09IG4yLnBlbmRpbmdfYnVmX3NpemUpKSB7CiAgICAgICAgICAgICAgICBzMiA9IDE7CiAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgczIgPSBuMi5nemluZGV4IDwgbjIuZ3poZWFkLmNvbW1lbnQubGVuZ3RoID8gMjU1ICYgbjIuZ3poZWFkLmNvbW1lbnQuY2hhckNvZGVBdChuMi5nemluZGV4KyspIDogMCwgVShuMiwgczIpOwogICAgICAgICAgICB9IHdoaWxlICgwICE9PSBzMik7CiAgICAgICAgICAgIG4yLmd6aGVhZC5oY3JjICYmIG4yLnBlbmRpbmcgPiBpMiAmJiAoZTIuYWRsZXIgPSBwKGUyLmFkbGVyLCBuMi5wZW5kaW5nX2J1ZiwgbjIucGVuZGluZyAtIGkyLCBpMikpLCAwID09PSBzMiAmJiAobjIuc3RhdHVzID0gMTAzKTsKICAgICAgICAgIH0gZWxzZSBuMi5zdGF0dXMgPSAxMDM7CiAgICAgICAgICBpZiAoMTAzID09PSBuMi5zdGF0dXMgJiYgKG4yLmd6aGVhZC5oY3JjID8gKG4yLnBlbmRpbmcgKyAyID4gbjIucGVuZGluZ19idWZfc2l6ZSAmJiBGKGUyKSwgbjIucGVuZGluZyArIDIgPD0gbjIucGVuZGluZ19idWZfc2l6ZSAmJiAoVShuMiwgMjU1ICYgZTIuYWRsZXIpLCBVKG4yLCBlMi5hZGxlciA+PiA4ICYgMjU1KSwgZTIuYWRsZXIgPSAwLCBuMi5zdGF0dXMgPSBFKSkgOiBuMi5zdGF0dXMgPSBFKSwgMCAhPT0gbjIucGVuZGluZykgewogICAgICAgICAgICBpZiAoRihlMiksIDAgPT09IGUyLmF2YWlsX291dCkgcmV0dXJuIG4yLmxhc3RfZmx1c2ggPSAtMSwgbTsKICAgICAgICAgIH0gZWxzZSBpZiAoMCA9PT0gZTIuYXZhaWxfaW4gJiYgVCh0MikgPD0gVChyMikgJiYgdDIgIT09IGYpIHJldHVybiBSKGUyLCAtNSk7CiAgICAgICAgICBpZiAoNjY2ID09PSBuMi5zdGF0dXMgJiYgMCAhPT0gZTIuYXZhaWxfaW4pIHJldHVybiBSKGUyLCAtNSk7CiAgICAgICAgICBpZiAoMCAhPT0gZTIuYXZhaWxfaW4gfHwgMCAhPT0gbjIubG9va2FoZWFkIHx8IHQyICE9PSBsICYmIDY2NiAhPT0gbjIuc3RhdHVzKSB7CiAgICAgICAgICAgIHZhciBvMiA9IDIgPT09IG4yLnN0cmF0ZWd5ID8gZnVuY3Rpb24oZTMsIHQzKSB7CiAgICAgICAgICAgICAgZm9yICh2YXIgcjM7IDsgKSB7CiAgICAgICAgICAgICAgICBpZiAoMCA9PT0gZTMubG9va2FoZWFkICYmIChqKGUzKSwgMCA9PT0gZTMubG9va2FoZWFkKSkgewogICAgICAgICAgICAgICAgICBpZiAodDMgPT09IGwpIHJldHVybiBBOwogICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGlmIChlMy5tYXRjaF9sZW5ndGggPSAwLCByMyA9IHUuX3RyX3RhbGx5KGUzLCAwLCBlMy53aW5kb3dbZTMuc3Ryc3RhcnRdKSwgZTMubG9va2FoZWFkLS0sIGUzLnN0cnN0YXJ0KyssIHIzICYmIChOKGUzLCBmYWxzZSksIDAgPT09IGUzLnN0cm0uYXZhaWxfb3V0KSkgcmV0dXJuIEE7CiAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIHJldHVybiBlMy5pbnNlcnQgPSAwLCB0MyA9PT0gZiA/IChOKGUzLCB0cnVlKSwgMCA9PT0gZTMuc3RybS5hdmFpbF9vdXQgPyBPIDogQikgOiBlMy5sYXN0X2xpdCAmJiAoTihlMywgZmFsc2UpLCAwID09PSBlMy5zdHJtLmF2YWlsX291dCkgPyBBIDogSTsKICAgICAgICAgICAgfShuMiwgdDIpIDogMyA9PT0gbjIuc3RyYXRlZ3kgPyBmdW5jdGlvbihlMywgdDMpIHsKICAgICAgICAgICAgICBmb3IgKHZhciByMywgbjMsIGkzLCBzMywgYTMgPSBlMy53aW5kb3c7IDsgKSB7CiAgICAgICAgICAgICAgICBpZiAoZTMubG9va2FoZWFkIDw9IFMpIHsKICAgICAgICAgICAgICAgICAgaWYgKGooZTMpLCBlMy5sb29rYWhlYWQgPD0gUyAmJiB0MyA9PT0gbCkgcmV0dXJuIEE7CiAgICAgICAgICAgICAgICAgIGlmICgwID09PSBlMy5sb29rYWhlYWQpIGJyZWFrOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgaWYgKGUzLm1hdGNoX2xlbmd0aCA9IDAsIGUzLmxvb2thaGVhZCA+PSB4ICYmIDAgPCBlMy5zdHJzdGFydCAmJiAobjMgPSBhM1tpMyA9IGUzLnN0cnN0YXJ0IC0gMV0pID09PSBhM1srK2kzXSAmJiBuMyA9PT0gYTNbKytpM10gJiYgbjMgPT09IGEzWysraTNdKSB7CiAgICAgICAgICAgICAgICAgIHMzID0gZTMuc3Ryc3RhcnQgKyBTOwogICAgICAgICAgICAgICAgICBkbyB7CiAgICAgICAgICAgICAgICAgIH0gd2hpbGUgKG4zID09PSBhM1srK2kzXSAmJiBuMyA9PT0gYTNbKytpM10gJiYgbjMgPT09IGEzWysraTNdICYmIG4zID09PSBhM1srK2kzXSAmJiBuMyA9PT0gYTNbKytpM10gJiYgbjMgPT09IGEzWysraTNdICYmIG4zID09PSBhM1srK2kzXSAmJiBuMyA9PT0gYTNbKytpM10gJiYgaTMgPCBzMyk7CiAgICAgICAgICAgICAgICAgIGUzLm1hdGNoX2xlbmd0aCA9IFMgLSAoczMgLSBpMyksIGUzLm1hdGNoX2xlbmd0aCA+IGUzLmxvb2thaGVhZCAmJiAoZTMubWF0Y2hfbGVuZ3RoID0gZTMubG9va2FoZWFkKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGlmIChlMy5tYXRjaF9sZW5ndGggPj0geCA/IChyMyA9IHUuX3RyX3RhbGx5KGUzLCAxLCBlMy5tYXRjaF9sZW5ndGggLSB4KSwgZTMubG9va2FoZWFkIC09IGUzLm1hdGNoX2xlbmd0aCwgZTMuc3Ryc3RhcnQgKz0gZTMubWF0Y2hfbGVuZ3RoLCBlMy5tYXRjaF9sZW5ndGggPSAwKSA6IChyMyA9IHUuX3RyX3RhbGx5KGUzLCAwLCBlMy53aW5kb3dbZTMuc3Ryc3RhcnRdKSwgZTMubG9va2FoZWFkLS0sIGUzLnN0cnN0YXJ0KyspLCByMyAmJiAoTihlMywgZmFsc2UpLCAwID09PSBlMy5zdHJtLmF2YWlsX291dCkpIHJldHVybiBBOwogICAgICAgICAgICAgIH0KICAgICAgICAgICAgICByZXR1cm4gZTMuaW5zZXJ0ID0gMCwgdDMgPT09IGYgPyAoTihlMywgdHJ1ZSksIDAgPT09IGUzLnN0cm0uYXZhaWxfb3V0ID8gTyA6IEIpIDogZTMubGFzdF9saXQgJiYgKE4oZTMsIGZhbHNlKSwgMCA9PT0gZTMuc3RybS5hdmFpbF9vdXQpID8gQSA6IEk7CiAgICAgICAgICAgIH0objIsIHQyKSA6IGhbbjIubGV2ZWxdLmZ1bmMobjIsIHQyKTsKICAgICAgICAgICAgaWYgKG8yICE9PSBPICYmIG8yICE9PSBCIHx8IChuMi5zdGF0dXMgPSA2NjYpLCBvMiA9PT0gQSB8fCBvMiA9PT0gTykgcmV0dXJuIDAgPT09IGUyLmF2YWlsX291dCAmJiAobjIubGFzdF9mbHVzaCA9IC0xKSwgbTsKICAgICAgICAgICAgaWYgKG8yID09PSBJICYmICgxID09PSB0MiA/IHUuX3RyX2FsaWduKG4yKSA6IDUgIT09IHQyICYmICh1Ll90cl9zdG9yZWRfYmxvY2sobjIsIDAsIDAsIGZhbHNlKSwgMyA9PT0gdDIgJiYgKEQobjIuaGVhZCksIDAgPT09IG4yLmxvb2thaGVhZCAmJiAobjIuc3Ryc3RhcnQgPSAwLCBuMi5ibG9ja19zdGFydCA9IDAsIG4yLmluc2VydCA9IDApKSksIEYoZTIpLCAwID09PSBlMi5hdmFpbF9vdXQpKSByZXR1cm4gbjIubGFzdF9mbHVzaCA9IC0xLCBtOwogICAgICAgICAgfQogICAgICAgICAgcmV0dXJuIHQyICE9PSBmID8gbSA6IG4yLndyYXAgPD0gMCA/IDEgOiAoMiA9PT0gbjIud3JhcCA/IChVKG4yLCAyNTUgJiBlMi5hZGxlciksIFUobjIsIGUyLmFkbGVyID4+IDggJiAyNTUpLCBVKG4yLCBlMi5hZGxlciA+PiAxNiAmIDI1NSksIFUobjIsIGUyLmFkbGVyID4+IDI0ICYgMjU1KSwgVShuMiwgMjU1ICYgZTIudG90YWxfaW4pLCBVKG4yLCBlMi50b3RhbF9pbiA+PiA4ICYgMjU1KSwgVShuMiwgZTIudG90YWxfaW4gPj4gMTYgJiAyNTUpLCBVKG4yLCBlMi50b3RhbF9pbiA+PiAyNCAmIDI1NSkpIDogKFAobjIsIGUyLmFkbGVyID4+PiAxNiksIFAobjIsIDY1NTM1ICYgZTIuYWRsZXIpKSwgRihlMiksIDAgPCBuMi53cmFwICYmIChuMi53cmFwID0gLW4yLndyYXApLCAwICE9PSBuMi5wZW5kaW5nID8gbSA6IDEpOwogICAgICAgIH0sIHIuZGVmbGF0ZUVuZCA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICB2YXIgdDI7CiAgICAgICAgICByZXR1cm4gZTIgJiYgZTIuc3RhdGUgPyAodDIgPSBlMi5zdGF0ZS5zdGF0dXMpICE9PSBDICYmIDY5ICE9PSB0MiAmJiA3MyAhPT0gdDIgJiYgOTEgIT09IHQyICYmIDEwMyAhPT0gdDIgJiYgdDIgIT09IEUgJiYgNjY2ICE9PSB0MiA/IFIoZTIsIF8pIDogKGUyLnN0YXRlID0gbnVsbCwgdDIgPT09IEUgPyBSKGUyLCAtMykgOiBtKSA6IF87CiAgICAgICAgfSwgci5kZWZsYXRlU2V0RGljdGlvbmFyeSA9IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgdmFyIHIyLCBuMiwgaTIsIHMyLCBhMiwgbzIsIGgyLCB1MiwgbDIgPSB0Mi5sZW5ndGg7CiAgICAgICAgICBpZiAoIWUyIHx8ICFlMi5zdGF0ZSkgcmV0dXJuIF87CiAgICAgICAgICBpZiAoMiA9PT0gKHMyID0gKHIyID0gZTIuc3RhdGUpLndyYXApIHx8IDEgPT09IHMyICYmIHIyLnN0YXR1cyAhPT0gQyB8fCByMi5sb29rYWhlYWQpIHJldHVybiBfOwogICAgICAgICAgZm9yICgxID09PSBzMiAmJiAoZTIuYWRsZXIgPSBkKGUyLmFkbGVyLCB0MiwgbDIsIDApKSwgcjIud3JhcCA9IDAsIGwyID49IHIyLndfc2l6ZSAmJiAoMCA9PT0gczIgJiYgKEQocjIuaGVhZCksIHIyLnN0cnN0YXJ0ID0gMCwgcjIuYmxvY2tfc3RhcnQgPSAwLCByMi5pbnNlcnQgPSAwKSwgdTIgPSBuZXcgYy5CdWY4KHIyLndfc2l6ZSksIGMuYXJyYXlTZXQodTIsIHQyLCBsMiAtIHIyLndfc2l6ZSwgcjIud19zaXplLCAwKSwgdDIgPSB1MiwgbDIgPSByMi53X3NpemUpLCBhMiA9IGUyLmF2YWlsX2luLCBvMiA9IGUyLm5leHRfaW4sIGgyID0gZTIuaW5wdXQsIGUyLmF2YWlsX2luID0gbDIsIGUyLm5leHRfaW4gPSAwLCBlMi5pbnB1dCA9IHQyLCBqKHIyKTsgcjIubG9va2FoZWFkID49IHg7ICkgewogICAgICAgICAgICBmb3IgKG4yID0gcjIuc3Ryc3RhcnQsIGkyID0gcjIubG9va2FoZWFkIC0gKHggLSAxKTsgcjIuaW5zX2ggPSAocjIuaW5zX2ggPDwgcjIuaGFzaF9zaGlmdCBeIHIyLndpbmRvd1tuMiArIHggLSAxXSkgJiByMi5oYXNoX21hc2ssIHIyLnByZXZbbjIgJiByMi53X21hc2tdID0gcjIuaGVhZFtyMi5pbnNfaF0sIHIyLmhlYWRbcjIuaW5zX2hdID0gbjIsIG4yKyssIC0taTI7ICkgOwogICAgICAgICAgICByMi5zdHJzdGFydCA9IG4yLCByMi5sb29rYWhlYWQgPSB4IC0gMSwgaihyMik7CiAgICAgICAgICB9CiAgICAgICAgICByZXR1cm4gcjIuc3Ryc3RhcnQgKz0gcjIubG9va2FoZWFkLCByMi5ibG9ja19zdGFydCA9IHIyLnN0cnN0YXJ0LCByMi5pbnNlcnQgPSByMi5sb29rYWhlYWQsIHIyLmxvb2thaGVhZCA9IDAsIHIyLm1hdGNoX2xlbmd0aCA9IHIyLnByZXZfbGVuZ3RoID0geCAtIDEsIHIyLm1hdGNoX2F2YWlsYWJsZSA9IDAsIGUyLm5leHRfaW4gPSBvMiwgZTIuaW5wdXQgPSBoMiwgZTIuYXZhaWxfaW4gPSBhMiwgcjIud3JhcCA9IHMyLCBtOwogICAgICAgIH0sIHIuZGVmbGF0ZUluZm8gPSAicGFrbyBkZWZsYXRlIChmcm9tIE5vZGVjYSBwcm9qZWN0KSI7CiAgICAgIH0sIHsgIi4uL3V0aWxzL2NvbW1vbiI6IDQxLCAiLi9hZGxlcjMyIjogNDMsICIuL2NyYzMyIjogNDUsICIuL21lc3NhZ2VzIjogNTEsICIuL3RyZWVzIjogNTIgfV0sIDQ3OiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIHQuZXhwb3J0cyA9IGZ1bmN0aW9uKCkgewogICAgICAgICAgdGhpcy50ZXh0ID0gMCwgdGhpcy50aW1lID0gMCwgdGhpcy54ZmxhZ3MgPSAwLCB0aGlzLm9zID0gMCwgdGhpcy5leHRyYSA9IG51bGwsIHRoaXMuZXh0cmFfbGVuID0gMCwgdGhpcy5uYW1lID0gIiIsIHRoaXMuY29tbWVudCA9ICIiLCB0aGlzLmhjcmMgPSAwLCB0aGlzLmRvbmUgPSBmYWxzZTsKICAgICAgICB9OwogICAgICB9LCB7fV0sIDQ4OiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIHQuZXhwb3J0cyA9IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgdmFyIHIyLCBuLCBpLCBzLCBhLCBvLCBoLCB1LCBsLCBmLCBjLCBkLCBwLCBtLCBfLCBnLCBiLCB2LCB5LCB3LCBrLCB4LCBTLCB6LCBDOwogICAgICAgICAgcjIgPSBlMi5zdGF0ZSwgbiA9IGUyLm5leHRfaW4sIHogPSBlMi5pbnB1dCwgaSA9IG4gKyAoZTIuYXZhaWxfaW4gLSA1KSwgcyA9IGUyLm5leHRfb3V0LCBDID0gZTIub3V0cHV0LCBhID0gcyAtICh0MiAtIGUyLmF2YWlsX291dCksIG8gPSBzICsgKGUyLmF2YWlsX291dCAtIDI1NyksIGggPSByMi5kbWF4LCB1ID0gcjIud3NpemUsIGwgPSByMi53aGF2ZSwgZiA9IHIyLnduZXh0LCBjID0gcjIud2luZG93LCBkID0gcjIuaG9sZCwgcCA9IHIyLmJpdHMsIG0gPSByMi5sZW5jb2RlLCBfID0gcjIuZGlzdGNvZGUsIGcgPSAoMSA8PCByMi5sZW5iaXRzKSAtIDEsIGIgPSAoMSA8PCByMi5kaXN0Yml0cykgLSAxOwogICAgICAgICAgZTogZG8gewogICAgICAgICAgICBwIDwgMTUgJiYgKGQgKz0geltuKytdIDw8IHAsIHAgKz0gOCwgZCArPSB6W24rK10gPDwgcCwgcCArPSA4KSwgdiA9IG1bZCAmIGddOwogICAgICAgICAgICB0OiBmb3IgKDsgOyApIHsKICAgICAgICAgICAgICBpZiAoZCA+Pj49IHkgPSB2ID4+PiAyNCwgcCAtPSB5LCAwID09PSAoeSA9IHYgPj4+IDE2ICYgMjU1KSkgQ1tzKytdID0gNjU1MzUgJiB2OwogICAgICAgICAgICAgIGVsc2UgewogICAgICAgICAgICAgICAgaWYgKCEoMTYgJiB5KSkgewogICAgICAgICAgICAgICAgICBpZiAoMCA9PSAoNjQgJiB5KSkgewogICAgICAgICAgICAgICAgICAgIHYgPSBtWyg2NTUzNSAmIHYpICsgKGQgJiAoMSA8PCB5KSAtIDEpXTsKICAgICAgICAgICAgICAgICAgICBjb250aW51ZSB0OwogICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgIGlmICgzMiAmIHkpIHsKICAgICAgICAgICAgICAgICAgICByMi5tb2RlID0gMTI7CiAgICAgICAgICAgICAgICAgICAgYnJlYWsgZTsKICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICBlMi5tc2cgPSAiaW52YWxpZCBsaXRlcmFsL2xlbmd0aCBjb2RlIiwgcjIubW9kZSA9IDMwOwogICAgICAgICAgICAgICAgICBicmVhayBlOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgdyA9IDY1NTM1ICYgdiwgKHkgJj0gMTUpICYmIChwIDwgeSAmJiAoZCArPSB6W24rK10gPDwgcCwgcCArPSA4KSwgdyArPSBkICYgKDEgPDwgeSkgLSAxLCBkID4+Pj0geSwgcCAtPSB5KSwgcCA8IDE1ICYmIChkICs9IHpbbisrXSA8PCBwLCBwICs9IDgsIGQgKz0geltuKytdIDw8IHAsIHAgKz0gOCksIHYgPSBfW2QgJiBiXTsKICAgICAgICAgICAgICAgIHI6IGZvciAoOyA7ICkgewogICAgICAgICAgICAgICAgICBpZiAoZCA+Pj49IHkgPSB2ID4+PiAyNCwgcCAtPSB5LCAhKDE2ICYgKHkgPSB2ID4+PiAxNiAmIDI1NSkpKSB7CiAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT0gKDY0ICYgeSkpIHsKICAgICAgICAgICAgICAgICAgICAgIHYgPSBfWyg2NTUzNSAmIHYpICsgKGQgJiAoMSA8PCB5KSAtIDEpXTsKICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlIHI7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIGUyLm1zZyA9ICJpbnZhbGlkIGRpc3RhbmNlIGNvZGUiLCByMi5tb2RlID0gMzA7CiAgICAgICAgICAgICAgICAgICAgYnJlYWsgZTsKICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICBpZiAoayA9IDY1NTM1ICYgdiwgcCA8ICh5ICY9IDE1KSAmJiAoZCArPSB6W24rK10gPDwgcCwgKHAgKz0gOCkgPCB5ICYmIChkICs9IHpbbisrXSA8PCBwLCBwICs9IDgpKSwgaCA8IChrICs9IGQgJiAoMSA8PCB5KSAtIDEpKSB7CiAgICAgICAgICAgICAgICAgICAgZTIubXNnID0gImludmFsaWQgZGlzdGFuY2UgdG9vIGZhciBiYWNrIiwgcjIubW9kZSA9IDMwOwogICAgICAgICAgICAgICAgICAgIGJyZWFrIGU7CiAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgaWYgKGQgPj4+PSB5LCBwIC09IHksICh5ID0gcyAtIGEpIDwgaykgewogICAgICAgICAgICAgICAgICAgIGlmIChsIDwgKHkgPSBrIC0geSkgJiYgcjIuc2FuZSkgewogICAgICAgICAgICAgICAgICAgICAgZTIubXNnID0gImludmFsaWQgZGlzdGFuY2UgdG9vIGZhciBiYWNrIiwgcjIubW9kZSA9IDMwOwogICAgICAgICAgICAgICAgICAgICAgYnJlYWsgZTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgaWYgKFMgPSBjLCAoeCA9IDApID09PSBmKSB7CiAgICAgICAgICAgICAgICAgICAgICBpZiAoeCArPSB1IC0geSwgeSA8IHcpIHsKICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh3IC09IHk7IENbcysrXSA9IGNbeCsrXSwgLS15OyApIDsKICAgICAgICAgICAgICAgICAgICAgICAgeCA9IHMgLSBrLCBTID0gQzsKICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGYgPCB5KSB7CiAgICAgICAgICAgICAgICAgICAgICBpZiAoeCArPSB1ICsgZiAtIHksICh5IC09IGYpIDwgdykgewogICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHcgLT0geTsgQ1tzKytdID0gY1t4KytdLCAtLXk7ICkgOwogICAgICAgICAgICAgICAgICAgICAgICBpZiAoeCA9IDAsIGYgPCB3KSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh3IC09IHkgPSBmOyBDW3MrK10gPSBjW3grK10sIC0teTsgKSA7CiAgICAgICAgICAgICAgICAgICAgICAgICAgeCA9IHMgLSBrLCBTID0gQzsKICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoeCArPSBmIC0geSwgeSA8IHcpIHsKICAgICAgICAgICAgICAgICAgICAgIGZvciAodyAtPSB5OyBDW3MrK10gPSBjW3grK10sIC0teTsgKSA7CiAgICAgICAgICAgICAgICAgICAgICB4ID0gcyAtIGssIFMgPSBDOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBmb3IgKDsgMiA8IHc7ICkgQ1tzKytdID0gU1t4KytdLCBDW3MrK10gPSBTW3grK10sIENbcysrXSA9IFNbeCsrXSwgdyAtPSAzOwogICAgICAgICAgICAgICAgICAgIHcgJiYgKENbcysrXSA9IFNbeCsrXSwgMSA8IHcgJiYgKENbcysrXSA9IFNbeCsrXSkpOwogICAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgIGZvciAoeCA9IHMgLSBrOyBDW3MrK10gPSBDW3grK10sIENbcysrXSA9IENbeCsrXSwgQ1tzKytdID0gQ1t4KytdLCAyIDwgKHcgLT0gMyk7ICkgOwogICAgICAgICAgICAgICAgICAgIHcgJiYgKENbcysrXSA9IENbeCsrXSwgMSA8IHcgJiYgKENbcysrXSA9IENbeCsrXSkpOwogICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIH0KICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgfQogICAgICAgICAgfSB3aGlsZSAobiA8IGkgJiYgcyA8IG8pOwogICAgICAgICAgbiAtPSB3ID0gcCA+PiAzLCBkICY9ICgxIDw8IChwIC09IHcgPDwgMykpIC0gMSwgZTIubmV4dF9pbiA9IG4sIGUyLm5leHRfb3V0ID0gcywgZTIuYXZhaWxfaW4gPSBuIDwgaSA/IGkgLSBuICsgNSA6IDUgLSAobiAtIGkpLCBlMi5hdmFpbF9vdXQgPSBzIDwgbyA/IG8gLSBzICsgMjU3IDogMjU3IC0gKHMgLSBvKSwgcjIuaG9sZCA9IGQsIHIyLmJpdHMgPSBwOwogICAgICAgIH07CiAgICAgIH0sIHt9XSwgNDk6IFtmdW5jdGlvbihlLCB0LCByKSB7CiAgICAgICAgdmFyIEkgPSBlKCIuLi91dGlscy9jb21tb24iKSwgTyA9IGUoIi4vYWRsZXIzMiIpLCBCID0gZSgiLi9jcmMzMiIpLCBSID0gZSgiLi9pbmZmYXN0IiksIFQgPSBlKCIuL2luZnRyZWVzIiksIEQgPSAxLCBGID0gMiwgTiA9IDAsIFUgPSAtMiwgUCA9IDEsIG4gPSA4NTIsIGkgPSA1OTI7CiAgICAgICAgZnVuY3Rpb24gTChlMikgewogICAgICAgICAgcmV0dXJuIChlMiA+Pj4gMjQgJiAyNTUpICsgKGUyID4+PiA4ICYgNjUyODApICsgKCg2NTI4MCAmIGUyKSA8PCA4KSArICgoMjU1ICYgZTIpIDw8IDI0KTsKICAgICAgICB9CiAgICAgICAgZnVuY3Rpb24gcygpIHsKICAgICAgICAgIHRoaXMubW9kZSA9IDAsIHRoaXMubGFzdCA9IGZhbHNlLCB0aGlzLndyYXAgPSAwLCB0aGlzLmhhdmVkaWN0ID0gZmFsc2UsIHRoaXMuZmxhZ3MgPSAwLCB0aGlzLmRtYXggPSAwLCB0aGlzLmNoZWNrID0gMCwgdGhpcy50b3RhbCA9IDAsIHRoaXMuaGVhZCA9IG51bGwsIHRoaXMud2JpdHMgPSAwLCB0aGlzLndzaXplID0gMCwgdGhpcy53aGF2ZSA9IDAsIHRoaXMud25leHQgPSAwLCB0aGlzLndpbmRvdyA9IG51bGwsIHRoaXMuaG9sZCA9IDAsIHRoaXMuYml0cyA9IDAsIHRoaXMubGVuZ3RoID0gMCwgdGhpcy5vZmZzZXQgPSAwLCB0aGlzLmV4dHJhID0gMCwgdGhpcy5sZW5jb2RlID0gbnVsbCwgdGhpcy5kaXN0Y29kZSA9IG51bGwsIHRoaXMubGVuYml0cyA9IDAsIHRoaXMuZGlzdGJpdHMgPSAwLCB0aGlzLm5jb2RlID0gMCwgdGhpcy5ubGVuID0gMCwgdGhpcy5uZGlzdCA9IDAsIHRoaXMuaGF2ZSA9IDAsIHRoaXMubmV4dCA9IG51bGwsIHRoaXMubGVucyA9IG5ldyBJLkJ1ZjE2KDMyMCksIHRoaXMud29yayA9IG5ldyBJLkJ1ZjE2KDI4OCksIHRoaXMubGVuZHluID0gbnVsbCwgdGhpcy5kaXN0ZHluID0gbnVsbCwgdGhpcy5zYW5lID0gMCwgdGhpcy5iYWNrID0gMCwgdGhpcy53YXMgPSAwOwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBhKGUyKSB7CiAgICAgICAgICB2YXIgdDI7CiAgICAgICAgICByZXR1cm4gZTIgJiYgZTIuc3RhdGUgPyAodDIgPSBlMi5zdGF0ZSwgZTIudG90YWxfaW4gPSBlMi50b3RhbF9vdXQgPSB0Mi50b3RhbCA9IDAsIGUyLm1zZyA9ICIiLCB0Mi53cmFwICYmIChlMi5hZGxlciA9IDEgJiB0Mi53cmFwKSwgdDIubW9kZSA9IFAsIHQyLmxhc3QgPSAwLCB0Mi5oYXZlZGljdCA9IDAsIHQyLmRtYXggPSAzMjc2OCwgdDIuaGVhZCA9IG51bGwsIHQyLmhvbGQgPSAwLCB0Mi5iaXRzID0gMCwgdDIubGVuY29kZSA9IHQyLmxlbmR5biA9IG5ldyBJLkJ1ZjMyKG4pLCB0Mi5kaXN0Y29kZSA9IHQyLmRpc3RkeW4gPSBuZXcgSS5CdWYzMihpKSwgdDIuc2FuZSA9IDEsIHQyLmJhY2sgPSAtMSwgTikgOiBVOwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBvKGUyKSB7CiAgICAgICAgICB2YXIgdDI7CiAgICAgICAgICByZXR1cm4gZTIgJiYgZTIuc3RhdGUgPyAoKHQyID0gZTIuc3RhdGUpLndzaXplID0gMCwgdDIud2hhdmUgPSAwLCB0Mi53bmV4dCA9IDAsIGEoZTIpKSA6IFU7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIGgoZTIsIHQyKSB7CiAgICAgICAgICB2YXIgcjIsIG4yOwogICAgICAgICAgcmV0dXJuIGUyICYmIGUyLnN0YXRlID8gKG4yID0gZTIuc3RhdGUsIHQyIDwgMCA/IChyMiA9IDAsIHQyID0gLXQyKSA6IChyMiA9IDEgKyAodDIgPj4gNCksIHQyIDwgNDggJiYgKHQyICY9IDE1KSksIHQyICYmICh0MiA8IDggfHwgMTUgPCB0MikgPyBVIDogKG51bGwgIT09IG4yLndpbmRvdyAmJiBuMi53Yml0cyAhPT0gdDIgJiYgKG4yLndpbmRvdyA9IG51bGwpLCBuMi53cmFwID0gcjIsIG4yLndiaXRzID0gdDIsIG8oZTIpKSkgOiBVOwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiB1KGUyLCB0MikgewogICAgICAgICAgdmFyIHIyLCBuMjsKICAgICAgICAgIHJldHVybiBlMiA/IChuMiA9IG5ldyBzKCksIChlMi5zdGF0ZSA9IG4yKS53aW5kb3cgPSBudWxsLCAocjIgPSBoKGUyLCB0MikpICE9PSBOICYmIChlMi5zdGF0ZSA9IG51bGwpLCByMikgOiBVOwogICAgICAgIH0KICAgICAgICB2YXIgbCwgZiwgYyA9IHRydWU7CiAgICAgICAgZnVuY3Rpb24gaihlMikgewogICAgICAgICAgaWYgKGMpIHsKICAgICAgICAgICAgdmFyIHQyOwogICAgICAgICAgICBmb3IgKGwgPSBuZXcgSS5CdWYzMig1MTIpLCBmID0gbmV3IEkuQnVmMzIoMzIpLCB0MiA9IDA7IHQyIDwgMTQ0OyApIGUyLmxlbnNbdDIrK10gPSA4OwogICAgICAgICAgICBmb3IgKDsgdDIgPCAyNTY7ICkgZTIubGVuc1t0MisrXSA9IDk7CiAgICAgICAgICAgIGZvciAoOyB0MiA8IDI4MDsgKSBlMi5sZW5zW3QyKytdID0gNzsKICAgICAgICAgICAgZm9yICg7IHQyIDwgMjg4OyApIGUyLmxlbnNbdDIrK10gPSA4OwogICAgICAgICAgICBmb3IgKFQoRCwgZTIubGVucywgMCwgMjg4LCBsLCAwLCBlMi53b3JrLCB7IGJpdHM6IDkgfSksIHQyID0gMDsgdDIgPCAzMjsgKSBlMi5sZW5zW3QyKytdID0gNTsKICAgICAgICAgICAgVChGLCBlMi5sZW5zLCAwLCAzMiwgZiwgMCwgZTIud29yaywgeyBiaXRzOiA1IH0pLCBjID0gZmFsc2U7CiAgICAgICAgICB9CiAgICAgICAgICBlMi5sZW5jb2RlID0gbCwgZTIubGVuYml0cyA9IDksIGUyLmRpc3Rjb2RlID0gZiwgZTIuZGlzdGJpdHMgPSA1OwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBaKGUyLCB0MiwgcjIsIG4yKSB7CiAgICAgICAgICB2YXIgaTIsIHMyID0gZTIuc3RhdGU7CiAgICAgICAgICByZXR1cm4gbnVsbCA9PT0gczIud2luZG93ICYmIChzMi53c2l6ZSA9IDEgPDwgczIud2JpdHMsIHMyLnduZXh0ID0gMCwgczIud2hhdmUgPSAwLCBzMi53aW5kb3cgPSBuZXcgSS5CdWY4KHMyLndzaXplKSksIG4yID49IHMyLndzaXplID8gKEkuYXJyYXlTZXQoczIud2luZG93LCB0MiwgcjIgLSBzMi53c2l6ZSwgczIud3NpemUsIDApLCBzMi53bmV4dCA9IDAsIHMyLndoYXZlID0gczIud3NpemUpIDogKG4yIDwgKGkyID0gczIud3NpemUgLSBzMi53bmV4dCkgJiYgKGkyID0gbjIpLCBJLmFycmF5U2V0KHMyLndpbmRvdywgdDIsIHIyIC0gbjIsIGkyLCBzMi53bmV4dCksIChuMiAtPSBpMikgPyAoSS5hcnJheVNldChzMi53aW5kb3csIHQyLCByMiAtIG4yLCBuMiwgMCksIHMyLnduZXh0ID0gbjIsIHMyLndoYXZlID0gczIud3NpemUpIDogKHMyLnduZXh0ICs9IGkyLCBzMi53bmV4dCA9PT0gczIud3NpemUgJiYgKHMyLnduZXh0ID0gMCksIHMyLndoYXZlIDwgczIud3NpemUgJiYgKHMyLndoYXZlICs9IGkyKSkpLCAwOwogICAgICAgIH0KICAgICAgICByLmluZmxhdGVSZXNldCA9IG8sIHIuaW5mbGF0ZVJlc2V0MiA9IGgsIHIuaW5mbGF0ZVJlc2V0S2VlcCA9IGEsIHIuaW5mbGF0ZUluaXQgPSBmdW5jdGlvbihlMikgewogICAgICAgICAgcmV0dXJuIHUoZTIsIDE1KTsKICAgICAgICB9LCByLmluZmxhdGVJbml0MiA9IHUsIHIuaW5mbGF0ZSA9IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgdmFyIHIyLCBuMiwgaTIsIHMyLCBhMiwgbzIsIGgyLCB1MiwgbDIsIGYyLCBjMiwgZCwgcCwgbSwgXywgZywgYiwgdiwgeSwgdywgaywgeCwgUywgeiwgQyA9IDAsIEUgPSBuZXcgSS5CdWY4KDQpLCBBID0gWzE2LCAxNywgMTgsIDAsIDgsIDcsIDksIDYsIDEwLCA1LCAxMSwgNCwgMTIsIDMsIDEzLCAyLCAxNCwgMSwgMTVdOwogICAgICAgICAgaWYgKCFlMiB8fCAhZTIuc3RhdGUgfHwgIWUyLm91dHB1dCB8fCAhZTIuaW5wdXQgJiYgMCAhPT0gZTIuYXZhaWxfaW4pIHJldHVybiBVOwogICAgICAgICAgMTIgPT09IChyMiA9IGUyLnN0YXRlKS5tb2RlICYmIChyMi5tb2RlID0gMTMpLCBhMiA9IGUyLm5leHRfb3V0LCBpMiA9IGUyLm91dHB1dCwgaDIgPSBlMi5hdmFpbF9vdXQsIHMyID0gZTIubmV4dF9pbiwgbjIgPSBlMi5pbnB1dCwgbzIgPSBlMi5hdmFpbF9pbiwgdTIgPSByMi5ob2xkLCBsMiA9IHIyLmJpdHMsIGYyID0gbzIsIGMyID0gaDIsIHggPSBOOwogICAgICAgICAgZTogZm9yICg7IDsgKSBzd2l0Y2ggKHIyLm1vZGUpIHsKICAgICAgICAgICAgY2FzZSBQOgogICAgICAgICAgICAgIGlmICgwID09PSByMi53cmFwKSB7CiAgICAgICAgICAgICAgICByMi5tb2RlID0gMTM7CiAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgZm9yICg7IGwyIDwgMTY7ICkgewogICAgICAgICAgICAgICAgaWYgKDAgPT09IG8yKSBicmVhayBlOwogICAgICAgICAgICAgICAgbzItLSwgdTIgKz0gbjJbczIrK10gPDwgbDIsIGwyICs9IDg7CiAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIGlmICgyICYgcjIud3JhcCAmJiAzNTYxNSA9PT0gdTIpIHsKICAgICAgICAgICAgICAgIEVbcjIuY2hlY2sgPSAwXSA9IDI1NSAmIHUyLCBFWzFdID0gdTIgPj4+IDggJiAyNTUsIHIyLmNoZWNrID0gQihyMi5jaGVjaywgRSwgMiwgMCksIGwyID0gdTIgPSAwLCByMi5tb2RlID0gMjsKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgIH0KICAgICAgICAgICAgICBpZiAocjIuZmxhZ3MgPSAwLCByMi5oZWFkICYmIChyMi5oZWFkLmRvbmUgPSBmYWxzZSksICEoMSAmIHIyLndyYXApIHx8ICgoKDI1NSAmIHUyKSA8PCA4KSArICh1MiA+PiA4KSkgJSAzMSkgewogICAgICAgICAgICAgICAgZTIubXNnID0gImluY29ycmVjdCBoZWFkZXIgY2hlY2siLCByMi5tb2RlID0gMzA7CiAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgaWYgKDggIT0gKDE1ICYgdTIpKSB7CiAgICAgICAgICAgICAgICBlMi5tc2cgPSAidW5rbm93biBjb21wcmVzc2lvbiBtZXRob2QiLCByMi5tb2RlID0gMzA7CiAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgaWYgKGwyIC09IDQsIGsgPSA4ICsgKDE1ICYgKHUyID4+Pj0gNCkpLCAwID09PSByMi53Yml0cykgcjIud2JpdHMgPSBrOwogICAgICAgICAgICAgIGVsc2UgaWYgKGsgPiByMi53Yml0cykgewogICAgICAgICAgICAgICAgZTIubXNnID0gImludmFsaWQgd2luZG93IHNpemUiLCByMi5tb2RlID0gMzA7CiAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgcjIuZG1heCA9IDEgPDwgaywgZTIuYWRsZXIgPSByMi5jaGVjayA9IDEsIHIyLm1vZGUgPSA1MTIgJiB1MiA/IDEwIDogMTIsIGwyID0gdTIgPSAwOwogICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICBjYXNlIDI6CiAgICAgICAgICAgICAgZm9yICg7IGwyIDwgMTY7ICkgewogICAgICAgICAgICAgICAgaWYgKDAgPT09IG8yKSBicmVhayBlOwogICAgICAgICAgICAgICAgbzItLSwgdTIgKz0gbjJbczIrK10gPDwgbDIsIGwyICs9IDg7CiAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIGlmIChyMi5mbGFncyA9IHUyLCA4ICE9ICgyNTUgJiByMi5mbGFncykpIHsKICAgICAgICAgICAgICAgIGUyLm1zZyA9ICJ1bmtub3duIGNvbXByZXNzaW9uIG1ldGhvZCIsIHIyLm1vZGUgPSAzMDsKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgIH0KICAgICAgICAgICAgICBpZiAoNTczNDQgJiByMi5mbGFncykgewogICAgICAgICAgICAgICAgZTIubXNnID0gInVua25vd24gaGVhZGVyIGZsYWdzIHNldCIsIHIyLm1vZGUgPSAzMDsKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgIH0KICAgICAgICAgICAgICByMi5oZWFkICYmIChyMi5oZWFkLnRleHQgPSB1MiA+PiA4ICYgMSksIDUxMiAmIHIyLmZsYWdzICYmIChFWzBdID0gMjU1ICYgdTIsIEVbMV0gPSB1MiA+Pj4gOCAmIDI1NSwgcjIuY2hlY2sgPSBCKHIyLmNoZWNrLCBFLCAyLCAwKSksIGwyID0gdTIgPSAwLCByMi5tb2RlID0gMzsKICAgICAgICAgICAgY2FzZSAzOgogICAgICAgICAgICAgIGZvciAoOyBsMiA8IDMyOyApIHsKICAgICAgICAgICAgICAgIGlmICgwID09PSBvMikgYnJlYWsgZTsKICAgICAgICAgICAgICAgIG8yLS0sIHUyICs9IG4yW3MyKytdIDw8IGwyLCBsMiArPSA4OwogICAgICAgICAgICAgIH0KICAgICAgICAgICAgICByMi5oZWFkICYmIChyMi5oZWFkLnRpbWUgPSB1MiksIDUxMiAmIHIyLmZsYWdzICYmIChFWzBdID0gMjU1ICYgdTIsIEVbMV0gPSB1MiA+Pj4gOCAmIDI1NSwgRVsyXSA9IHUyID4+PiAxNiAmIDI1NSwgRVszXSA9IHUyID4+PiAyNCAmIDI1NSwgcjIuY2hlY2sgPSBCKHIyLmNoZWNrLCBFLCA0LCAwKSksIGwyID0gdTIgPSAwLCByMi5tb2RlID0gNDsKICAgICAgICAgICAgY2FzZSA0OgogICAgICAgICAgICAgIGZvciAoOyBsMiA8IDE2OyApIHsKICAgICAgICAgICAgICAgIGlmICgwID09PSBvMikgYnJlYWsgZTsKICAgICAgICAgICAgICAgIG8yLS0sIHUyICs9IG4yW3MyKytdIDw8IGwyLCBsMiArPSA4OwogICAgICAgICAgICAgIH0KICAgICAgICAgICAgICByMi5oZWFkICYmIChyMi5oZWFkLnhmbGFncyA9IDI1NSAmIHUyLCByMi5oZWFkLm9zID0gdTIgPj4gOCksIDUxMiAmIHIyLmZsYWdzICYmIChFWzBdID0gMjU1ICYgdTIsIEVbMV0gPSB1MiA+Pj4gOCAmIDI1NSwgcjIuY2hlY2sgPSBCKHIyLmNoZWNrLCBFLCAyLCAwKSksIGwyID0gdTIgPSAwLCByMi5tb2RlID0gNTsKICAgICAgICAgICAgY2FzZSA1OgogICAgICAgICAgICAgIGlmICgxMDI0ICYgcjIuZmxhZ3MpIHsKICAgICAgICAgICAgICAgIGZvciAoOyBsMiA8IDE2OyApIHsKICAgICAgICAgICAgICAgICAgaWYgKDAgPT09IG8yKSBicmVhayBlOwogICAgICAgICAgICAgICAgICBvMi0tLCB1MiArPSBuMltzMisrXSA8PCBsMiwgbDIgKz0gODsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIHIyLmxlbmd0aCA9IHUyLCByMi5oZWFkICYmIChyMi5oZWFkLmV4dHJhX2xlbiA9IHUyKSwgNTEyICYgcjIuZmxhZ3MgJiYgKEVbMF0gPSAyNTUgJiB1MiwgRVsxXSA9IHUyID4+PiA4ICYgMjU1LCByMi5jaGVjayA9IEIocjIuY2hlY2ssIEUsIDIsIDApKSwgbDIgPSB1MiA9IDA7CiAgICAgICAgICAgICAgfSBlbHNlIHIyLmhlYWQgJiYgKHIyLmhlYWQuZXh0cmEgPSBudWxsKTsKICAgICAgICAgICAgICByMi5tb2RlID0gNjsKICAgICAgICAgICAgY2FzZSA2OgogICAgICAgICAgICAgIGlmICgxMDI0ICYgcjIuZmxhZ3MgJiYgKG8yIDwgKGQgPSByMi5sZW5ndGgpICYmIChkID0gbzIpLCBkICYmIChyMi5oZWFkICYmIChrID0gcjIuaGVhZC5leHRyYV9sZW4gLSByMi5sZW5ndGgsIHIyLmhlYWQuZXh0cmEgfHwgKHIyLmhlYWQuZXh0cmEgPSBuZXcgQXJyYXkocjIuaGVhZC5leHRyYV9sZW4pKSwgSS5hcnJheVNldChyMi5oZWFkLmV4dHJhLCBuMiwgczIsIGQsIGspKSwgNTEyICYgcjIuZmxhZ3MgJiYgKHIyLmNoZWNrID0gQihyMi5jaGVjaywgbjIsIGQsIHMyKSksIG8yIC09IGQsIHMyICs9IGQsIHIyLmxlbmd0aCAtPSBkKSwgcjIubGVuZ3RoKSkgYnJlYWsgZTsKICAgICAgICAgICAgICByMi5sZW5ndGggPSAwLCByMi5tb2RlID0gNzsKICAgICAgICAgICAgY2FzZSA3OgogICAgICAgICAgICAgIGlmICgyMDQ4ICYgcjIuZmxhZ3MpIHsKICAgICAgICAgICAgICAgIGlmICgwID09PSBvMikgYnJlYWsgZTsKICAgICAgICAgICAgICAgIGZvciAoZCA9IDA7IGsgPSBuMltzMiArIGQrK10sIHIyLmhlYWQgJiYgayAmJiByMi5sZW5ndGggPCA2NTUzNiAmJiAocjIuaGVhZC5uYW1lICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoaykpLCBrICYmIGQgPCBvMjsgKSA7CiAgICAgICAgICAgICAgICBpZiAoNTEyICYgcjIuZmxhZ3MgJiYgKHIyLmNoZWNrID0gQihyMi5jaGVjaywgbjIsIGQsIHMyKSksIG8yIC09IGQsIHMyICs9IGQsIGspIGJyZWFrIGU7CiAgICAgICAgICAgICAgfSBlbHNlIHIyLmhlYWQgJiYgKHIyLmhlYWQubmFtZSA9IG51bGwpOwogICAgICAgICAgICAgIHIyLmxlbmd0aCA9IDAsIHIyLm1vZGUgPSA4OwogICAgICAgICAgICBjYXNlIDg6CiAgICAgICAgICAgICAgaWYgKDQwOTYgJiByMi5mbGFncykgewogICAgICAgICAgICAgICAgaWYgKDAgPT09IG8yKSBicmVhayBlOwogICAgICAgICAgICAgICAgZm9yIChkID0gMDsgayA9IG4yW3MyICsgZCsrXSwgcjIuaGVhZCAmJiBrICYmIHIyLmxlbmd0aCA8IDY1NTM2ICYmIChyMi5oZWFkLmNvbW1lbnQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShrKSksIGsgJiYgZCA8IG8yOyApIDsKICAgICAgICAgICAgICAgIGlmICg1MTIgJiByMi5mbGFncyAmJiAocjIuY2hlY2sgPSBCKHIyLmNoZWNrLCBuMiwgZCwgczIpKSwgbzIgLT0gZCwgczIgKz0gZCwgaykgYnJlYWsgZTsKICAgICAgICAgICAgICB9IGVsc2UgcjIuaGVhZCAmJiAocjIuaGVhZC5jb21tZW50ID0gbnVsbCk7CiAgICAgICAgICAgICAgcjIubW9kZSA9IDk7CiAgICAgICAgICAgIGNhc2UgOToKICAgICAgICAgICAgICBpZiAoNTEyICYgcjIuZmxhZ3MpIHsKICAgICAgICAgICAgICAgIGZvciAoOyBsMiA8IDE2OyApIHsKICAgICAgICAgICAgICAgICAgaWYgKDAgPT09IG8yKSBicmVhayBlOwogICAgICAgICAgICAgICAgICBvMi0tLCB1MiArPSBuMltzMisrXSA8PCBsMiwgbDIgKz0gODsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGlmICh1MiAhPT0gKDY1NTM1ICYgcjIuY2hlY2spKSB7CiAgICAgICAgICAgICAgICAgIGUyLm1zZyA9ICJoZWFkZXIgY3JjIG1pc21hdGNoIiwgcjIubW9kZSA9IDMwOwogICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGwyID0gdTIgPSAwOwogICAgICAgICAgICAgIH0KICAgICAgICAgICAgICByMi5oZWFkICYmIChyMi5oZWFkLmhjcmMgPSByMi5mbGFncyA+PiA5ICYgMSwgcjIuaGVhZC5kb25lID0gdHJ1ZSksIGUyLmFkbGVyID0gcjIuY2hlY2sgPSAwLCByMi5tb2RlID0gMTI7CiAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgIGNhc2UgMTA6CiAgICAgICAgICAgICAgZm9yICg7IGwyIDwgMzI7ICkgewogICAgICAgICAgICAgICAgaWYgKDAgPT09IG8yKSBicmVhayBlOwogICAgICAgICAgICAgICAgbzItLSwgdTIgKz0gbjJbczIrK10gPDwgbDIsIGwyICs9IDg7CiAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIGUyLmFkbGVyID0gcjIuY2hlY2sgPSBMKHUyKSwgbDIgPSB1MiA9IDAsIHIyLm1vZGUgPSAxMTsKICAgICAgICAgICAgY2FzZSAxMToKICAgICAgICAgICAgICBpZiAoMCA9PT0gcjIuaGF2ZWRpY3QpIHJldHVybiBlMi5uZXh0X291dCA9IGEyLCBlMi5hdmFpbF9vdXQgPSBoMiwgZTIubmV4dF9pbiA9IHMyLCBlMi5hdmFpbF9pbiA9IG8yLCByMi5ob2xkID0gdTIsIHIyLmJpdHMgPSBsMiwgMjsKICAgICAgICAgICAgICBlMi5hZGxlciA9IHIyLmNoZWNrID0gMSwgcjIubW9kZSA9IDEyOwogICAgICAgICAgICBjYXNlIDEyOgogICAgICAgICAgICAgIGlmICg1ID09PSB0MiB8fCA2ID09PSB0MikgYnJlYWsgZTsKICAgICAgICAgICAgY2FzZSAxMzoKICAgICAgICAgICAgICBpZiAocjIubGFzdCkgewogICAgICAgICAgICAgICAgdTIgPj4+PSA3ICYgbDIsIGwyIC09IDcgJiBsMiwgcjIubW9kZSA9IDI3OwogICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIGZvciAoOyBsMiA8IDM7ICkgewogICAgICAgICAgICAgICAgaWYgKDAgPT09IG8yKSBicmVhayBlOwogICAgICAgICAgICAgICAgbzItLSwgdTIgKz0gbjJbczIrK10gPDwgbDIsIGwyICs9IDg7CiAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIHN3aXRjaCAocjIubGFzdCA9IDEgJiB1MiwgbDIgLT0gMSwgMyAmICh1MiA+Pj49IDEpKSB7CiAgICAgICAgICAgICAgICBjYXNlIDA6CiAgICAgICAgICAgICAgICAgIHIyLm1vZGUgPSAxNDsKICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICBjYXNlIDE6CiAgICAgICAgICAgICAgICAgIGlmIChqKHIyKSwgcjIubW9kZSA9IDIwLCA2ICE9PSB0MikgYnJlYWs7CiAgICAgICAgICAgICAgICAgIHUyID4+Pj0gMiwgbDIgLT0gMjsKICAgICAgICAgICAgICAgICAgYnJlYWsgZTsKICAgICAgICAgICAgICAgIGNhc2UgMjoKICAgICAgICAgICAgICAgICAgcjIubW9kZSA9IDE3OwogICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgMzoKICAgICAgICAgICAgICAgICAgZTIubXNnID0gImludmFsaWQgYmxvY2sgdHlwZSIsIHIyLm1vZGUgPSAzMDsKICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgdTIgPj4+PSAyLCBsMiAtPSAyOwogICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICBjYXNlIDE0OgogICAgICAgICAgICAgIGZvciAodTIgPj4+PSA3ICYgbDIsIGwyIC09IDcgJiBsMjsgbDIgPCAzMjsgKSB7CiAgICAgICAgICAgICAgICBpZiAoMCA9PT0gbzIpIGJyZWFrIGU7CiAgICAgICAgICAgICAgICBvMi0tLCB1MiArPSBuMltzMisrXSA8PCBsMiwgbDIgKz0gODsKICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgaWYgKCg2NTUzNSAmIHUyKSAhPSAodTIgPj4+IDE2IF4gNjU1MzUpKSB7CiAgICAgICAgICAgICAgICBlMi5tc2cgPSAiaW52YWxpZCBzdG9yZWQgYmxvY2sgbGVuZ3RocyIsIHIyLm1vZGUgPSAzMDsKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgIH0KICAgICAgICAgICAgICBpZiAocjIubGVuZ3RoID0gNjU1MzUgJiB1MiwgbDIgPSB1MiA9IDAsIHIyLm1vZGUgPSAxNSwgNiA9PT0gdDIpIGJyZWFrIGU7CiAgICAgICAgICAgIGNhc2UgMTU6CiAgICAgICAgICAgICAgcjIubW9kZSA9IDE2OwogICAgICAgICAgICBjYXNlIDE2OgogICAgICAgICAgICAgIGlmIChkID0gcjIubGVuZ3RoKSB7CiAgICAgICAgICAgICAgICBpZiAobzIgPCBkICYmIChkID0gbzIpLCBoMiA8IGQgJiYgKGQgPSBoMiksIDAgPT09IGQpIGJyZWFrIGU7CiAgICAgICAgICAgICAgICBJLmFycmF5U2V0KGkyLCBuMiwgczIsIGQsIGEyKSwgbzIgLT0gZCwgczIgKz0gZCwgaDIgLT0gZCwgYTIgKz0gZCwgcjIubGVuZ3RoIC09IGQ7CiAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgcjIubW9kZSA9IDEyOwogICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICBjYXNlIDE3OgogICAgICAgICAgICAgIGZvciAoOyBsMiA8IDE0OyApIHsKICAgICAgICAgICAgICAgIGlmICgwID09PSBvMikgYnJlYWsgZTsKICAgICAgICAgICAgICAgIG8yLS0sIHUyICs9IG4yW3MyKytdIDw8IGwyLCBsMiArPSA4OwogICAgICAgICAgICAgIH0KICAgICAgICAgICAgICBpZiAocjIubmxlbiA9IDI1NyArICgzMSAmIHUyKSwgdTIgPj4+PSA1LCBsMiAtPSA1LCByMi5uZGlzdCA9IDEgKyAoMzEgJiB1MiksIHUyID4+Pj0gNSwgbDIgLT0gNSwgcjIubmNvZGUgPSA0ICsgKDE1ICYgdTIpLCB1MiA+Pj49IDQsIGwyIC09IDQsIDI4NiA8IHIyLm5sZW4gfHwgMzAgPCByMi5uZGlzdCkgewogICAgICAgICAgICAgICAgZTIubXNnID0gInRvbyBtYW55IGxlbmd0aCBvciBkaXN0YW5jZSBzeW1ib2xzIiwgcjIubW9kZSA9IDMwOwogICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIHIyLmhhdmUgPSAwLCByMi5tb2RlID0gMTg7CiAgICAgICAgICAgIGNhc2UgMTg6CiAgICAgICAgICAgICAgZm9yICg7IHIyLmhhdmUgPCByMi5uY29kZTsgKSB7CiAgICAgICAgICAgICAgICBmb3IgKDsgbDIgPCAzOyApIHsKICAgICAgICAgICAgICAgICAgaWYgKDAgPT09IG8yKSBicmVhayBlOwogICAgICAgICAgICAgICAgICBvMi0tLCB1MiArPSBuMltzMisrXSA8PCBsMiwgbDIgKz0gODsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIHIyLmxlbnNbQVtyMi5oYXZlKytdXSA9IDcgJiB1MiwgdTIgPj4+PSAzLCBsMiAtPSAzOwogICAgICAgICAgICAgIH0KICAgICAgICAgICAgICBmb3IgKDsgcjIuaGF2ZSA8IDE5OyApIHIyLmxlbnNbQVtyMi5oYXZlKytdXSA9IDA7CiAgICAgICAgICAgICAgaWYgKHIyLmxlbmNvZGUgPSByMi5sZW5keW4sIHIyLmxlbmJpdHMgPSA3LCBTID0geyBiaXRzOiByMi5sZW5iaXRzIH0sIHggPSBUKDAsIHIyLmxlbnMsIDAsIDE5LCByMi5sZW5jb2RlLCAwLCByMi53b3JrLCBTKSwgcjIubGVuYml0cyA9IFMuYml0cywgeCkgewogICAgICAgICAgICAgICAgZTIubXNnID0gImludmFsaWQgY29kZSBsZW5ndGhzIHNldCIsIHIyLm1vZGUgPSAzMDsKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgIH0KICAgICAgICAgICAgICByMi5oYXZlID0gMCwgcjIubW9kZSA9IDE5OwogICAgICAgICAgICBjYXNlIDE5OgogICAgICAgICAgICAgIGZvciAoOyByMi5oYXZlIDwgcjIubmxlbiArIHIyLm5kaXN0OyApIHsKICAgICAgICAgICAgICAgIGZvciAoOyBnID0gKEMgPSByMi5sZW5jb2RlW3UyICYgKDEgPDwgcjIubGVuYml0cykgLSAxXSkgPj4+IDE2ICYgMjU1LCBiID0gNjU1MzUgJiBDLCAhKChfID0gQyA+Pj4gMjQpIDw9IGwyKTsgKSB7CiAgICAgICAgICAgICAgICAgIGlmICgwID09PSBvMikgYnJlYWsgZTsKICAgICAgICAgICAgICAgICAgbzItLSwgdTIgKz0gbjJbczIrK10gPDwgbDIsIGwyICs9IDg7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBpZiAoYiA8IDE2KSB1MiA+Pj49IF8sIGwyIC09IF8sIHIyLmxlbnNbcjIuaGF2ZSsrXSA9IGI7CiAgICAgICAgICAgICAgICBlbHNlIHsKICAgICAgICAgICAgICAgICAgaWYgKDE2ID09PSBiKSB7CiAgICAgICAgICAgICAgICAgICAgZm9yICh6ID0gXyArIDI7IGwyIDwgejsgKSB7CiAgICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PT0gbzIpIGJyZWFrIGU7CiAgICAgICAgICAgICAgICAgICAgICBvMi0tLCB1MiArPSBuMltzMisrXSA8PCBsMiwgbDIgKz0gODsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgaWYgKHUyID4+Pj0gXywgbDIgLT0gXywgMCA9PT0gcjIuaGF2ZSkgewogICAgICAgICAgICAgICAgICAgICAgZTIubXNnID0gImludmFsaWQgYml0IGxlbmd0aCByZXBlYXQiLCByMi5tb2RlID0gMzA7CiAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgayA9IHIyLmxlbnNbcjIuaGF2ZSAtIDFdLCBkID0gMyArICgzICYgdTIpLCB1MiA+Pj49IDIsIGwyIC09IDI7CiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoMTcgPT09IGIpIHsKICAgICAgICAgICAgICAgICAgICBmb3IgKHogPSBfICsgMzsgbDIgPCB6OyApIHsKICAgICAgICAgICAgICAgICAgICAgIGlmICgwID09PSBvMikgYnJlYWsgZTsKICAgICAgICAgICAgICAgICAgICAgIG8yLS0sIHUyICs9IG4yW3MyKytdIDw8IGwyLCBsMiArPSA4OwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBsMiAtPSBfLCBrID0gMCwgZCA9IDMgKyAoNyAmICh1MiA+Pj49IF8pKSwgdTIgPj4+PSAzLCBsMiAtPSAzOwogICAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgIGZvciAoeiA9IF8gKyA3OyBsMiA8IHo7ICkgewogICAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT09IG8yKSBicmVhayBlOwogICAgICAgICAgICAgICAgICAgICAgbzItLSwgdTIgKz0gbjJbczIrK10gPDwgbDIsIGwyICs9IDg7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIGwyIC09IF8sIGsgPSAwLCBkID0gMTEgKyAoMTI3ICYgKHUyID4+Pj0gXykpLCB1MiA+Pj49IDcsIGwyIC09IDc7CiAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgaWYgKHIyLmhhdmUgKyBkID4gcjIubmxlbiArIHIyLm5kaXN0KSB7CiAgICAgICAgICAgICAgICAgICAgZTIubXNnID0gImludmFsaWQgYml0IGxlbmd0aCByZXBlYXQiLCByMi5tb2RlID0gMzA7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgZm9yICg7IGQtLTsgKSByMi5sZW5zW3IyLmhhdmUrK10gPSBrOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIH0KICAgICAgICAgICAgICBpZiAoMzAgPT09IHIyLm1vZGUpIGJyZWFrOwogICAgICAgICAgICAgIGlmICgwID09PSByMi5sZW5zWzI1Nl0pIHsKICAgICAgICAgICAgICAgIGUyLm1zZyA9ICJpbnZhbGlkIGNvZGUgLS0gbWlzc2luZyBlbmQtb2YtYmxvY2siLCByMi5tb2RlID0gMzA7CiAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgaWYgKHIyLmxlbmJpdHMgPSA5LCBTID0geyBiaXRzOiByMi5sZW5iaXRzIH0sIHggPSBUKEQsIHIyLmxlbnMsIDAsIHIyLm5sZW4sIHIyLmxlbmNvZGUsIDAsIHIyLndvcmssIFMpLCByMi5sZW5iaXRzID0gUy5iaXRzLCB4KSB7CiAgICAgICAgICAgICAgICBlMi5tc2cgPSAiaW52YWxpZCBsaXRlcmFsL2xlbmd0aHMgc2V0IiwgcjIubW9kZSA9IDMwOwogICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIGlmIChyMi5kaXN0Yml0cyA9IDYsIHIyLmRpc3Rjb2RlID0gcjIuZGlzdGR5biwgUyA9IHsgYml0czogcjIuZGlzdGJpdHMgfSwgeCA9IFQoRiwgcjIubGVucywgcjIubmxlbiwgcjIubmRpc3QsIHIyLmRpc3Rjb2RlLCAwLCByMi53b3JrLCBTKSwgcjIuZGlzdGJpdHMgPSBTLmJpdHMsIHgpIHsKICAgICAgICAgICAgICAgIGUyLm1zZyA9ICJpbnZhbGlkIGRpc3RhbmNlcyBzZXQiLCByMi5tb2RlID0gMzA7CiAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgaWYgKHIyLm1vZGUgPSAyMCwgNiA9PT0gdDIpIGJyZWFrIGU7CiAgICAgICAgICAgIGNhc2UgMjA6CiAgICAgICAgICAgICAgcjIubW9kZSA9IDIxOwogICAgICAgICAgICBjYXNlIDIxOgogICAgICAgICAgICAgIGlmICg2IDw9IG8yICYmIDI1OCA8PSBoMikgewogICAgICAgICAgICAgICAgZTIubmV4dF9vdXQgPSBhMiwgZTIuYXZhaWxfb3V0ID0gaDIsIGUyLm5leHRfaW4gPSBzMiwgZTIuYXZhaWxfaW4gPSBvMiwgcjIuaG9sZCA9IHUyLCByMi5iaXRzID0gbDIsIFIoZTIsIGMyKSwgYTIgPSBlMi5uZXh0X291dCwgaTIgPSBlMi5vdXRwdXQsIGgyID0gZTIuYXZhaWxfb3V0LCBzMiA9IGUyLm5leHRfaW4sIG4yID0gZTIuaW5wdXQsIG8yID0gZTIuYXZhaWxfaW4sIHUyID0gcjIuaG9sZCwgbDIgPSByMi5iaXRzLCAxMiA9PT0gcjIubW9kZSAmJiAocjIuYmFjayA9IC0xKTsKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgIH0KICAgICAgICAgICAgICBmb3IgKHIyLmJhY2sgPSAwOyBnID0gKEMgPSByMi5sZW5jb2RlW3UyICYgKDEgPDwgcjIubGVuYml0cykgLSAxXSkgPj4+IDE2ICYgMjU1LCBiID0gNjU1MzUgJiBDLCAhKChfID0gQyA+Pj4gMjQpIDw9IGwyKTsgKSB7CiAgICAgICAgICAgICAgICBpZiAoMCA9PT0gbzIpIGJyZWFrIGU7CiAgICAgICAgICAgICAgICBvMi0tLCB1MiArPSBuMltzMisrXSA8PCBsMiwgbDIgKz0gODsKICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgaWYgKGcgJiYgMCA9PSAoMjQwICYgZykpIHsKICAgICAgICAgICAgICAgIGZvciAodiA9IF8sIHkgPSBnLCB3ID0gYjsgZyA9IChDID0gcjIubGVuY29kZVt3ICsgKCh1MiAmICgxIDw8IHYgKyB5KSAtIDEpID4+IHYpXSkgPj4+IDE2ICYgMjU1LCBiID0gNjU1MzUgJiBDLCAhKHYgKyAoXyA9IEMgPj4+IDI0KSA8PSBsMik7ICkgewogICAgICAgICAgICAgICAgICBpZiAoMCA9PT0gbzIpIGJyZWFrIGU7CiAgICAgICAgICAgICAgICAgIG8yLS0sIHUyICs9IG4yW3MyKytdIDw8IGwyLCBsMiArPSA4OwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgdTIgPj4+PSB2LCBsMiAtPSB2LCByMi5iYWNrICs9IHY7CiAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIGlmICh1MiA+Pj49IF8sIGwyIC09IF8sIHIyLmJhY2sgKz0gXywgcjIubGVuZ3RoID0gYiwgMCA9PT0gZykgewogICAgICAgICAgICAgICAgcjIubW9kZSA9IDI2OwogICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIGlmICgzMiAmIGcpIHsKICAgICAgICAgICAgICAgIHIyLmJhY2sgPSAtMSwgcjIubW9kZSA9IDEyOwogICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIGlmICg2NCAmIGcpIHsKICAgICAgICAgICAgICAgIGUyLm1zZyA9ICJpbnZhbGlkIGxpdGVyYWwvbGVuZ3RoIGNvZGUiLCByMi5tb2RlID0gMzA7CiAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgcjIuZXh0cmEgPSAxNSAmIGcsIHIyLm1vZGUgPSAyMjsKICAgICAgICAgICAgY2FzZSAyMjoKICAgICAgICAgICAgICBpZiAocjIuZXh0cmEpIHsKICAgICAgICAgICAgICAgIGZvciAoeiA9IHIyLmV4dHJhOyBsMiA8IHo7ICkgewogICAgICAgICAgICAgICAgICBpZiAoMCA9PT0gbzIpIGJyZWFrIGU7CiAgICAgICAgICAgICAgICAgIG8yLS0sIHUyICs9IG4yW3MyKytdIDw8IGwyLCBsMiArPSA4OwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgcjIubGVuZ3RoICs9IHUyICYgKDEgPDwgcjIuZXh0cmEpIC0gMSwgdTIgPj4+PSByMi5leHRyYSwgbDIgLT0gcjIuZXh0cmEsIHIyLmJhY2sgKz0gcjIuZXh0cmE7CiAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIHIyLndhcyA9IHIyLmxlbmd0aCwgcjIubW9kZSA9IDIzOwogICAgICAgICAgICBjYXNlIDIzOgogICAgICAgICAgICAgIGZvciAoOyBnID0gKEMgPSByMi5kaXN0Y29kZVt1MiAmICgxIDw8IHIyLmRpc3RiaXRzKSAtIDFdKSA+Pj4gMTYgJiAyNTUsIGIgPSA2NTUzNSAmIEMsICEoKF8gPSBDID4+PiAyNCkgPD0gbDIpOyApIHsKICAgICAgICAgICAgICAgIGlmICgwID09PSBvMikgYnJlYWsgZTsKICAgICAgICAgICAgICAgIG8yLS0sIHUyICs9IG4yW3MyKytdIDw8IGwyLCBsMiArPSA4OwogICAgICAgICAgICAgIH0KICAgICAgICAgICAgICBpZiAoMCA9PSAoMjQwICYgZykpIHsKICAgICAgICAgICAgICAgIGZvciAodiA9IF8sIHkgPSBnLCB3ID0gYjsgZyA9IChDID0gcjIuZGlzdGNvZGVbdyArICgodTIgJiAoMSA8PCB2ICsgeSkgLSAxKSA+PiB2KV0pID4+PiAxNiAmIDI1NSwgYiA9IDY1NTM1ICYgQywgISh2ICsgKF8gPSBDID4+PiAyNCkgPD0gbDIpOyApIHsKICAgICAgICAgICAgICAgICAgaWYgKDAgPT09IG8yKSBicmVhayBlOwogICAgICAgICAgICAgICAgICBvMi0tLCB1MiArPSBuMltzMisrXSA8PCBsMiwgbDIgKz0gODsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIHUyID4+Pj0gdiwgbDIgLT0gdiwgcjIuYmFjayArPSB2OwogICAgICAgICAgICAgIH0KICAgICAgICAgICAgICBpZiAodTIgPj4+PSBfLCBsMiAtPSBfLCByMi5iYWNrICs9IF8sIDY0ICYgZykgewogICAgICAgICAgICAgICAgZTIubXNnID0gImludmFsaWQgZGlzdGFuY2UgY29kZSIsIHIyLm1vZGUgPSAzMDsKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgIH0KICAgICAgICAgICAgICByMi5vZmZzZXQgPSBiLCByMi5leHRyYSA9IDE1ICYgZywgcjIubW9kZSA9IDI0OwogICAgICAgICAgICBjYXNlIDI0OgogICAgICAgICAgICAgIGlmIChyMi5leHRyYSkgewogICAgICAgICAgICAgICAgZm9yICh6ID0gcjIuZXh0cmE7IGwyIDwgejsgKSB7CiAgICAgICAgICAgICAgICAgIGlmICgwID09PSBvMikgYnJlYWsgZTsKICAgICAgICAgICAgICAgICAgbzItLSwgdTIgKz0gbjJbczIrK10gPDwgbDIsIGwyICs9IDg7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICByMi5vZmZzZXQgKz0gdTIgJiAoMSA8PCByMi5leHRyYSkgLSAxLCB1MiA+Pj49IHIyLmV4dHJhLCBsMiAtPSByMi5leHRyYSwgcjIuYmFjayArPSByMi5leHRyYTsKICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgaWYgKHIyLm9mZnNldCA+IHIyLmRtYXgpIHsKICAgICAgICAgICAgICAgIGUyLm1zZyA9ICJpbnZhbGlkIGRpc3RhbmNlIHRvbyBmYXIgYmFjayIsIHIyLm1vZGUgPSAzMDsKICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgIH0KICAgICAgICAgICAgICByMi5tb2RlID0gMjU7CiAgICAgICAgICAgIGNhc2UgMjU6CiAgICAgICAgICAgICAgaWYgKDAgPT09IGgyKSBicmVhayBlOwogICAgICAgICAgICAgIGlmIChkID0gYzIgLSBoMiwgcjIub2Zmc2V0ID4gZCkgewogICAgICAgICAgICAgICAgaWYgKChkID0gcjIub2Zmc2V0IC0gZCkgPiByMi53aGF2ZSAmJiByMi5zYW5lKSB7CiAgICAgICAgICAgICAgICAgIGUyLm1zZyA9ICJpbnZhbGlkIGRpc3RhbmNlIHRvbyBmYXIgYmFjayIsIHIyLm1vZGUgPSAzMDsKICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBwID0gZCA+IHIyLnduZXh0ID8gKGQgLT0gcjIud25leHQsIHIyLndzaXplIC0gZCkgOiByMi53bmV4dCAtIGQsIGQgPiByMi5sZW5ndGggJiYgKGQgPSByMi5sZW5ndGgpLCBtID0gcjIud2luZG93OwogICAgICAgICAgICAgIH0gZWxzZSBtID0gaTIsIHAgPSBhMiAtIHIyLm9mZnNldCwgZCA9IHIyLmxlbmd0aDsKICAgICAgICAgICAgICBmb3IgKGgyIDwgZCAmJiAoZCA9IGgyKSwgaDIgLT0gZCwgcjIubGVuZ3RoIC09IGQ7IGkyW2EyKytdID0gbVtwKytdLCAtLWQ7ICkgOwogICAgICAgICAgICAgIDAgPT09IHIyLmxlbmd0aCAmJiAocjIubW9kZSA9IDIxKTsKICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgY2FzZSAyNjoKICAgICAgICAgICAgICBpZiAoMCA9PT0gaDIpIGJyZWFrIGU7CiAgICAgICAgICAgICAgaTJbYTIrK10gPSByMi5sZW5ndGgsIGgyLS0sIHIyLm1vZGUgPSAyMTsKICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgY2FzZSAyNzoKICAgICAgICAgICAgICBpZiAocjIud3JhcCkgewogICAgICAgICAgICAgICAgZm9yICg7IGwyIDwgMzI7ICkgewogICAgICAgICAgICAgICAgICBpZiAoMCA9PT0gbzIpIGJyZWFrIGU7CiAgICAgICAgICAgICAgICAgIG8yLS0sIHUyIHw9IG4yW3MyKytdIDw8IGwyLCBsMiArPSA4OwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgaWYgKGMyIC09IGgyLCBlMi50b3RhbF9vdXQgKz0gYzIsIHIyLnRvdGFsICs9IGMyLCBjMiAmJiAoZTIuYWRsZXIgPSByMi5jaGVjayA9IHIyLmZsYWdzID8gQihyMi5jaGVjaywgaTIsIGMyLCBhMiAtIGMyKSA6IE8ocjIuY2hlY2ssIGkyLCBjMiwgYTIgLSBjMikpLCBjMiA9IGgyLCAocjIuZmxhZ3MgPyB1MiA6IEwodTIpKSAhPT0gcjIuY2hlY2spIHsKICAgICAgICAgICAgICAgICAgZTIubXNnID0gImluY29ycmVjdCBkYXRhIGNoZWNrIiwgcjIubW9kZSA9IDMwOwogICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGwyID0gdTIgPSAwOwogICAgICAgICAgICAgIH0KICAgICAgICAgICAgICByMi5tb2RlID0gMjg7CiAgICAgICAgICAgIGNhc2UgMjg6CiAgICAgICAgICAgICAgaWYgKHIyLndyYXAgJiYgcjIuZmxhZ3MpIHsKICAgICAgICAgICAgICAgIGZvciAoOyBsMiA8IDMyOyApIHsKICAgICAgICAgICAgICAgICAgaWYgKDAgPT09IG8yKSBicmVhayBlOwogICAgICAgICAgICAgICAgICBvMi0tLCB1MiArPSBuMltzMisrXSA8PCBsMiwgbDIgKz0gODsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGlmICh1MiAhPT0gKDQyOTQ5NjcyOTUgJiByMi50b3RhbCkpIHsKICAgICAgICAgICAgICAgICAgZTIubXNnID0gImluY29ycmVjdCBsZW5ndGggY2hlY2siLCByMi5tb2RlID0gMzA7CiAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgbDIgPSB1MiA9IDA7CiAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIHIyLm1vZGUgPSAyOTsKICAgICAgICAgICAgY2FzZSAyOToKICAgICAgICAgICAgICB4ID0gMTsKICAgICAgICAgICAgICBicmVhayBlOwogICAgICAgICAgICBjYXNlIDMwOgogICAgICAgICAgICAgIHggPSAtMzsKICAgICAgICAgICAgICBicmVhayBlOwogICAgICAgICAgICBjYXNlIDMxOgogICAgICAgICAgICAgIHJldHVybiAtNDsKICAgICAgICAgICAgY2FzZSAzMjoKICAgICAgICAgICAgZGVmYXVsdDoKICAgICAgICAgICAgICByZXR1cm4gVTsKICAgICAgICAgIH0KICAgICAgICAgIHJldHVybiBlMi5uZXh0X291dCA9IGEyLCBlMi5hdmFpbF9vdXQgPSBoMiwgZTIubmV4dF9pbiA9IHMyLCBlMi5hdmFpbF9pbiA9IG8yLCByMi5ob2xkID0gdTIsIHIyLmJpdHMgPSBsMiwgKHIyLndzaXplIHx8IGMyICE9PSBlMi5hdmFpbF9vdXQgJiYgcjIubW9kZSA8IDMwICYmIChyMi5tb2RlIDwgMjcgfHwgNCAhPT0gdDIpKSAmJiBaKGUyLCBlMi5vdXRwdXQsIGUyLm5leHRfb3V0LCBjMiAtIGUyLmF2YWlsX291dCkgPyAocjIubW9kZSA9IDMxLCAtNCkgOiAoZjIgLT0gZTIuYXZhaWxfaW4sIGMyIC09IGUyLmF2YWlsX291dCwgZTIudG90YWxfaW4gKz0gZjIsIGUyLnRvdGFsX291dCArPSBjMiwgcjIudG90YWwgKz0gYzIsIHIyLndyYXAgJiYgYzIgJiYgKGUyLmFkbGVyID0gcjIuY2hlY2sgPSByMi5mbGFncyA/IEIocjIuY2hlY2ssIGkyLCBjMiwgZTIubmV4dF9vdXQgLSBjMikgOiBPKHIyLmNoZWNrLCBpMiwgYzIsIGUyLm5leHRfb3V0IC0gYzIpKSwgZTIuZGF0YV90eXBlID0gcjIuYml0cyArIChyMi5sYXN0ID8gNjQgOiAwKSArICgxMiA9PT0gcjIubW9kZSA/IDEyOCA6IDApICsgKDIwID09PSByMi5tb2RlIHx8IDE1ID09PSByMi5tb2RlID8gMjU2IDogMCksICgwID09IGYyICYmIDAgPT09IGMyIHx8IDQgPT09IHQyKSAmJiB4ID09PSBOICYmICh4ID0gLTUpLCB4KTsKICAgICAgICB9LCByLmluZmxhdGVFbmQgPSBmdW5jdGlvbihlMikgewogICAgICAgICAgaWYgKCFlMiB8fCAhZTIuc3RhdGUpIHJldHVybiBVOwogICAgICAgICAgdmFyIHQyID0gZTIuc3RhdGU7CiAgICAgICAgICByZXR1cm4gdDIud2luZG93ICYmICh0Mi53aW5kb3cgPSBudWxsKSwgZTIuc3RhdGUgPSBudWxsLCBOOwogICAgICAgIH0sIHIuaW5mbGF0ZUdldEhlYWRlciA9IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgdmFyIHIyOwogICAgICAgICAgcmV0dXJuIGUyICYmIGUyLnN0YXRlID8gMCA9PSAoMiAmIChyMiA9IGUyLnN0YXRlKS53cmFwKSA/IFUgOiAoKHIyLmhlYWQgPSB0MikuZG9uZSA9IGZhbHNlLCBOKSA6IFU7CiAgICAgICAgfSwgci5pbmZsYXRlU2V0RGljdGlvbmFyeSA9IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgdmFyIHIyLCBuMiA9IHQyLmxlbmd0aDsKICAgICAgICAgIHJldHVybiBlMiAmJiBlMi5zdGF0ZSA/IDAgIT09IChyMiA9IGUyLnN0YXRlKS53cmFwICYmIDExICE9PSByMi5tb2RlID8gVSA6IDExID09PSByMi5tb2RlICYmIE8oMSwgdDIsIG4yLCAwKSAhPT0gcjIuY2hlY2sgPyAtMyA6IFooZTIsIHQyLCBuMiwgbjIpID8gKHIyLm1vZGUgPSAzMSwgLTQpIDogKHIyLmhhdmVkaWN0ID0gMSwgTikgOiBVOwogICAgICAgIH0sIHIuaW5mbGF0ZUluZm8gPSAicGFrbyBpbmZsYXRlIChmcm9tIE5vZGVjYSBwcm9qZWN0KSI7CiAgICAgIH0sIHsgIi4uL3V0aWxzL2NvbW1vbiI6IDQxLCAiLi9hZGxlcjMyIjogNDMsICIuL2NyYzMyIjogNDUsICIuL2luZmZhc3QiOiA0OCwgIi4vaW5mdHJlZXMiOiA1MCB9XSwgNTA6IFtmdW5jdGlvbihlLCB0LCByKSB7CiAgICAgICAgdmFyIEQgPSBlKCIuLi91dGlscy9jb21tb24iKSwgRiA9IFszLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEzLCAxNSwgMTcsIDE5LCAyMywgMjcsIDMxLCAzNSwgNDMsIDUxLCA1OSwgNjcsIDgzLCA5OSwgMTE1LCAxMzEsIDE2MywgMTk1LCAyMjcsIDI1OCwgMCwgMF0sIE4gPSBbMTYsIDE2LCAxNiwgMTYsIDE2LCAxNiwgMTYsIDE2LCAxNywgMTcsIDE3LCAxNywgMTgsIDE4LCAxOCwgMTgsIDE5LCAxOSwgMTksIDE5LCAyMCwgMjAsIDIwLCAyMCwgMjEsIDIxLCAyMSwgMjEsIDE2LCA3MiwgNzhdLCBVID0gWzEsIDIsIDMsIDQsIDUsIDcsIDksIDEzLCAxNywgMjUsIDMzLCA0OSwgNjUsIDk3LCAxMjksIDE5MywgMjU3LCAzODUsIDUxMywgNzY5LCAxMDI1LCAxNTM3LCAyMDQ5LCAzMDczLCA0MDk3LCA2MTQ1LCA4MTkzLCAxMjI4OSwgMTYzODUsIDI0NTc3LCAwLCAwXSwgUCA9IFsxNiwgMTYsIDE2LCAxNiwgMTcsIDE3LCAxOCwgMTgsIDE5LCAxOSwgMjAsIDIwLCAyMSwgMjEsIDIyLCAyMiwgMjMsIDIzLCAyNCwgMjQsIDI1LCAyNSwgMjYsIDI2LCAyNywgMjcsIDI4LCAyOCwgMjksIDI5LCA2NCwgNjRdOwogICAgICAgIHQuZXhwb3J0cyA9IGZ1bmN0aW9uKGUyLCB0MiwgcjIsIG4sIGksIHMsIGEsIG8pIHsKICAgICAgICAgIHZhciBoLCB1LCBsLCBmLCBjLCBkLCBwLCBtLCBfLCBnID0gby5iaXRzLCBiID0gMCwgdiA9IDAsIHkgPSAwLCB3ID0gMCwgayA9IDAsIHggPSAwLCBTID0gMCwgeiA9IDAsIEMgPSAwLCBFID0gMCwgQSA9IG51bGwsIEkgPSAwLCBPID0gbmV3IEQuQnVmMTYoMTYpLCBCID0gbmV3IEQuQnVmMTYoMTYpLCBSID0gbnVsbCwgVCA9IDA7CiAgICAgICAgICBmb3IgKGIgPSAwOyBiIDw9IDE1OyBiKyspIE9bYl0gPSAwOwogICAgICAgICAgZm9yICh2ID0gMDsgdiA8IG47IHYrKykgT1t0MltyMiArIHZdXSsrOwogICAgICAgICAgZm9yIChrID0gZywgdyA9IDE1OyAxIDw9IHcgJiYgMCA9PT0gT1t3XTsgdy0tKSA7CiAgICAgICAgICBpZiAodyA8IGsgJiYgKGsgPSB3KSwgMCA9PT0gdykgcmV0dXJuIGlbcysrXSA9IDIwOTcxNTIwLCBpW3MrK10gPSAyMDk3MTUyMCwgby5iaXRzID0gMSwgMDsKICAgICAgICAgIGZvciAoeSA9IDE7IHkgPCB3ICYmIDAgPT09IE9beV07IHkrKykgOwogICAgICAgICAgZm9yIChrIDwgeSAmJiAoayA9IHkpLCBiID0geiA9IDE7IGIgPD0gMTU7IGIrKykgaWYgKHogPDw9IDEsICh6IC09IE9bYl0pIDwgMCkgcmV0dXJuIC0xOwogICAgICAgICAgaWYgKDAgPCB6ICYmICgwID09PSBlMiB8fCAxICE9PSB3KSkgcmV0dXJuIC0xOwogICAgICAgICAgZm9yIChCWzFdID0gMCwgYiA9IDE7IGIgPCAxNTsgYisrKSBCW2IgKyAxXSA9IEJbYl0gKyBPW2JdOwogICAgICAgICAgZm9yICh2ID0gMDsgdiA8IG47IHYrKykgMCAhPT0gdDJbcjIgKyB2XSAmJiAoYVtCW3QyW3IyICsgdl1dKytdID0gdik7CiAgICAgICAgICBpZiAoZCA9IDAgPT09IGUyID8gKEEgPSBSID0gYSwgMTkpIDogMSA9PT0gZTIgPyAoQSA9IEYsIEkgLT0gMjU3LCBSID0gTiwgVCAtPSAyNTcsIDI1NikgOiAoQSA9IFUsIFIgPSBQLCAtMSksIGIgPSB5LCBjID0gcywgUyA9IHYgPSBFID0gMCwgbCA9IC0xLCBmID0gKEMgPSAxIDw8ICh4ID0gaykpIC0gMSwgMSA9PT0gZTIgJiYgODUyIDwgQyB8fCAyID09PSBlMiAmJiA1OTIgPCBDKSByZXR1cm4gMTsKICAgICAgICAgIGZvciAoOyA7ICkgewogICAgICAgICAgICBmb3IgKHAgPSBiIC0gUywgXyA9IGFbdl0gPCBkID8gKG0gPSAwLCBhW3ZdKSA6IGFbdl0gPiBkID8gKG0gPSBSW1QgKyBhW3ZdXSwgQVtJICsgYVt2XV0pIDogKG0gPSA5NiwgMCksIGggPSAxIDw8IGIgLSBTLCB5ID0gdSA9IDEgPDwgeDsgaVtjICsgKEUgPj4gUykgKyAodSAtPSBoKV0gPSBwIDw8IDI0IHwgbSA8PCAxNiB8IF8gfCAwLCAwICE9PSB1OyApIDsKICAgICAgICAgICAgZm9yIChoID0gMSA8PCBiIC0gMTsgRSAmIGg7ICkgaCA+Pj0gMTsKICAgICAgICAgICAgaWYgKDAgIT09IGggPyAoRSAmPSBoIC0gMSwgRSArPSBoKSA6IEUgPSAwLCB2KyssIDAgPT0gLS1PW2JdKSB7CiAgICAgICAgICAgICAgaWYgKGIgPT09IHcpIGJyZWFrOwogICAgICAgICAgICAgIGIgPSB0MltyMiArIGFbdl1dOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChrIDwgYiAmJiAoRSAmIGYpICE9PSBsKSB7CiAgICAgICAgICAgICAgZm9yICgwID09PSBTICYmIChTID0gayksIGMgKz0geSwgeiA9IDEgPDwgKHggPSBiIC0gUyk7IHggKyBTIDwgdyAmJiAhKCh6IC09IE9beCArIFNdKSA8PSAwKTsgKSB4KyssIHogPDw9IDE7CiAgICAgICAgICAgICAgaWYgKEMgKz0gMSA8PCB4LCAxID09PSBlMiAmJiA4NTIgPCBDIHx8IDIgPT09IGUyICYmIDU5MiA8IEMpIHJldHVybiAxOwogICAgICAgICAgICAgIGlbbCA9IEUgJiBmXSA9IGsgPDwgMjQgfCB4IDw8IDE2IHwgYyAtIHMgfCAwOwogICAgICAgICAgICB9CiAgICAgICAgICB9CiAgICAgICAgICByZXR1cm4gMCAhPT0gRSAmJiAoaVtjICsgRV0gPSBiIC0gUyA8PCAyNCB8IDY0IDw8IDE2IHwgMCksIG8uYml0cyA9IGssIDA7CiAgICAgICAgfTsKICAgICAgfSwgeyAiLi4vdXRpbHMvY29tbW9uIjogNDEgfV0sIDUxOiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIHQuZXhwb3J0cyA9IHsgMjogIm5lZWQgZGljdGlvbmFyeSIsIDE6ICJzdHJlYW0gZW5kIiwgMDogIiIsICItMSI6ICJmaWxlIGVycm9yIiwgIi0yIjogInN0cmVhbSBlcnJvciIsICItMyI6ICJkYXRhIGVycm9yIiwgIi00IjogImluc3VmZmljaWVudCBtZW1vcnkiLCAiLTUiOiAiYnVmZmVyIGVycm9yIiwgIi02IjogImluY29tcGF0aWJsZSB2ZXJzaW9uIiB9OwogICAgICB9LCB7fV0sIDUyOiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIHZhciBpID0gZSgiLi4vdXRpbHMvY29tbW9uIiksIG8gPSAwLCBoID0gMTsKICAgICAgICBmdW5jdGlvbiBuKGUyKSB7CiAgICAgICAgICBmb3IgKHZhciB0MiA9IGUyLmxlbmd0aDsgMCA8PSAtLXQyOyApIGUyW3QyXSA9IDA7CiAgICAgICAgfQogICAgICAgIHZhciBzID0gMCwgYSA9IDI5LCB1ID0gMjU2LCBsID0gdSArIDEgKyBhLCBmID0gMzAsIGMgPSAxOSwgXyA9IDIgKiBsICsgMSwgZyA9IDE1LCBkID0gMTYsIHAgPSA3LCBtID0gMjU2LCBiID0gMTYsIHYgPSAxNywgeSA9IDE4LCB3ID0gWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDEsIDEsIDEsIDEsIDIsIDIsIDIsIDIsIDMsIDMsIDMsIDMsIDQsIDQsIDQsIDQsIDUsIDUsIDUsIDUsIDBdLCBrID0gWzAsIDAsIDAsIDAsIDEsIDEsIDIsIDIsIDMsIDMsIDQsIDQsIDUsIDUsIDYsIDYsIDcsIDcsIDgsIDgsIDksIDksIDEwLCAxMCwgMTEsIDExLCAxMiwgMTIsIDEzLCAxM10sIHggPSBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMiwgMywgN10sIFMgPSBbMTYsIDE3LCAxOCwgMCwgOCwgNywgOSwgNiwgMTAsIDUsIDExLCA0LCAxMiwgMywgMTMsIDIsIDE0LCAxLCAxNV0sIHogPSBuZXcgQXJyYXkoMiAqIChsICsgMikpOwogICAgICAgIG4oeik7CiAgICAgICAgdmFyIEMgPSBuZXcgQXJyYXkoMiAqIGYpOwogICAgICAgIG4oQyk7CiAgICAgICAgdmFyIEUgPSBuZXcgQXJyYXkoNTEyKTsKICAgICAgICBuKEUpOwogICAgICAgIHZhciBBID0gbmV3IEFycmF5KDI1Nik7CiAgICAgICAgbihBKTsKICAgICAgICB2YXIgSSA9IG5ldyBBcnJheShhKTsKICAgICAgICBuKEkpOwogICAgICAgIHZhciBPLCBCLCBSLCBUID0gbmV3IEFycmF5KGYpOwogICAgICAgIGZ1bmN0aW9uIEQoZTIsIHQyLCByMiwgbjIsIGkyKSB7CiAgICAgICAgICB0aGlzLnN0YXRpY190cmVlID0gZTIsIHRoaXMuZXh0cmFfYml0cyA9IHQyLCB0aGlzLmV4dHJhX2Jhc2UgPSByMiwgdGhpcy5lbGVtcyA9IG4yLCB0aGlzLm1heF9sZW5ndGggPSBpMiwgdGhpcy5oYXNfc3RyZWUgPSBlMiAmJiBlMi5sZW5ndGg7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIEYoZTIsIHQyKSB7CiAgICAgICAgICB0aGlzLmR5bl90cmVlID0gZTIsIHRoaXMubWF4X2NvZGUgPSAwLCB0aGlzLnN0YXRfZGVzYyA9IHQyOwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBOKGUyKSB7CiAgICAgICAgICByZXR1cm4gZTIgPCAyNTYgPyBFW2UyXSA6IEVbMjU2ICsgKGUyID4+PiA3KV07CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIFUoZTIsIHQyKSB7CiAgICAgICAgICBlMi5wZW5kaW5nX2J1ZltlMi5wZW5kaW5nKytdID0gMjU1ICYgdDIsIGUyLnBlbmRpbmdfYnVmW2UyLnBlbmRpbmcrK10gPSB0MiA+Pj4gOCAmIDI1NTsKICAgICAgICB9CiAgICAgICAgZnVuY3Rpb24gUChlMiwgdDIsIHIyKSB7CiAgICAgICAgICBlMi5iaV92YWxpZCA+IGQgLSByMiA/IChlMi5iaV9idWYgfD0gdDIgPDwgZTIuYmlfdmFsaWQgJiA2NTUzNSwgVShlMiwgZTIuYmlfYnVmKSwgZTIuYmlfYnVmID0gdDIgPj4gZCAtIGUyLmJpX3ZhbGlkLCBlMi5iaV92YWxpZCArPSByMiAtIGQpIDogKGUyLmJpX2J1ZiB8PSB0MiA8PCBlMi5iaV92YWxpZCAmIDY1NTM1LCBlMi5iaV92YWxpZCArPSByMik7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIEwoZTIsIHQyLCByMikgewogICAgICAgICAgUChlMiwgcjJbMiAqIHQyXSwgcjJbMiAqIHQyICsgMV0pOwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBqKGUyLCB0MikgewogICAgICAgICAgZm9yICh2YXIgcjIgPSAwOyByMiB8PSAxICYgZTIsIGUyID4+Pj0gMSwgcjIgPDw9IDEsIDAgPCAtLXQyOyApIDsKICAgICAgICAgIHJldHVybiByMiA+Pj4gMTsKICAgICAgICB9CiAgICAgICAgZnVuY3Rpb24gWihlMiwgdDIsIHIyKSB7CiAgICAgICAgICB2YXIgbjIsIGkyLCBzMiA9IG5ldyBBcnJheShnICsgMSksIGEyID0gMDsKICAgICAgICAgIGZvciAobjIgPSAxOyBuMiA8PSBnOyBuMisrKSBzMltuMl0gPSBhMiA9IGEyICsgcjJbbjIgLSAxXSA8PCAxOwogICAgICAgICAgZm9yIChpMiA9IDA7IGkyIDw9IHQyOyBpMisrKSB7CiAgICAgICAgICAgIHZhciBvMiA9IGUyWzIgKiBpMiArIDFdOwogICAgICAgICAgICAwICE9PSBvMiAmJiAoZTJbMiAqIGkyXSA9IGooczJbbzJdKyssIG8yKSk7CiAgICAgICAgICB9CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIFcoZTIpIHsKICAgICAgICAgIHZhciB0MjsKICAgICAgICAgIGZvciAodDIgPSAwOyB0MiA8IGw7IHQyKyspIGUyLmR5bl9sdHJlZVsyICogdDJdID0gMDsKICAgICAgICAgIGZvciAodDIgPSAwOyB0MiA8IGY7IHQyKyspIGUyLmR5bl9kdHJlZVsyICogdDJdID0gMDsKICAgICAgICAgIGZvciAodDIgPSAwOyB0MiA8IGM7IHQyKyspIGUyLmJsX3RyZWVbMiAqIHQyXSA9IDA7CiAgICAgICAgICBlMi5keW5fbHRyZWVbMiAqIG1dID0gMSwgZTIub3B0X2xlbiA9IGUyLnN0YXRpY19sZW4gPSAwLCBlMi5sYXN0X2xpdCA9IGUyLm1hdGNoZXMgPSAwOwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBNKGUyKSB7CiAgICAgICAgICA4IDwgZTIuYmlfdmFsaWQgPyBVKGUyLCBlMi5iaV9idWYpIDogMCA8IGUyLmJpX3ZhbGlkICYmIChlMi5wZW5kaW5nX2J1ZltlMi5wZW5kaW5nKytdID0gZTIuYmlfYnVmKSwgZTIuYmlfYnVmID0gMCwgZTIuYmlfdmFsaWQgPSAwOwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBIKGUyLCB0MiwgcjIsIG4yKSB7CiAgICAgICAgICB2YXIgaTIgPSAyICogdDIsIHMyID0gMiAqIHIyOwogICAgICAgICAgcmV0dXJuIGUyW2kyXSA8IGUyW3MyXSB8fCBlMltpMl0gPT09IGUyW3MyXSAmJiBuMlt0Ml0gPD0gbjJbcjJdOwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBHKGUyLCB0MiwgcjIpIHsKICAgICAgICAgIGZvciAodmFyIG4yID0gZTIuaGVhcFtyMl0sIGkyID0gcjIgPDwgMTsgaTIgPD0gZTIuaGVhcF9sZW4gJiYgKGkyIDwgZTIuaGVhcF9sZW4gJiYgSCh0MiwgZTIuaGVhcFtpMiArIDFdLCBlMi5oZWFwW2kyXSwgZTIuZGVwdGgpICYmIGkyKyssICFIKHQyLCBuMiwgZTIuaGVhcFtpMl0sIGUyLmRlcHRoKSk7ICkgZTIuaGVhcFtyMl0gPSBlMi5oZWFwW2kyXSwgcjIgPSBpMiwgaTIgPDw9IDE7CiAgICAgICAgICBlMi5oZWFwW3IyXSA9IG4yOwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBLKGUyLCB0MiwgcjIpIHsKICAgICAgICAgIHZhciBuMiwgaTIsIHMyLCBhMiwgbzIgPSAwOwogICAgICAgICAgaWYgKDAgIT09IGUyLmxhc3RfbGl0KSBmb3IgKDsgbjIgPSBlMi5wZW5kaW5nX2J1ZltlMi5kX2J1ZiArIDIgKiBvMl0gPDwgOCB8IGUyLnBlbmRpbmdfYnVmW2UyLmRfYnVmICsgMiAqIG8yICsgMV0sIGkyID0gZTIucGVuZGluZ19idWZbZTIubF9idWYgKyBvMl0sIG8yKyssIDAgPT09IG4yID8gTChlMiwgaTIsIHQyKSA6IChMKGUyLCAoczIgPSBBW2kyXSkgKyB1ICsgMSwgdDIpLCAwICE9PSAoYTIgPSB3W3MyXSkgJiYgUChlMiwgaTIgLT0gSVtzMl0sIGEyKSwgTChlMiwgczIgPSBOKC0tbjIpLCByMiksIDAgIT09IChhMiA9IGtbczJdKSAmJiBQKGUyLCBuMiAtPSBUW3MyXSwgYTIpKSwgbzIgPCBlMi5sYXN0X2xpdDsgKSA7CiAgICAgICAgICBMKGUyLCBtLCB0Mik7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIFkoZTIsIHQyKSB7CiAgICAgICAgICB2YXIgcjIsIG4yLCBpMiwgczIgPSB0Mi5keW5fdHJlZSwgYTIgPSB0Mi5zdGF0X2Rlc2Muc3RhdGljX3RyZWUsIG8yID0gdDIuc3RhdF9kZXNjLmhhc19zdHJlZSwgaDIgPSB0Mi5zdGF0X2Rlc2MuZWxlbXMsIHUyID0gLTE7CiAgICAgICAgICBmb3IgKGUyLmhlYXBfbGVuID0gMCwgZTIuaGVhcF9tYXggPSBfLCByMiA9IDA7IHIyIDwgaDI7IHIyKyspIDAgIT09IHMyWzIgKiByMl0gPyAoZTIuaGVhcFsrK2UyLmhlYXBfbGVuXSA9IHUyID0gcjIsIGUyLmRlcHRoW3IyXSA9IDApIDogczJbMiAqIHIyICsgMV0gPSAwOwogICAgICAgICAgZm9yICg7IGUyLmhlYXBfbGVuIDwgMjsgKSBzMlsyICogKGkyID0gZTIuaGVhcFsrK2UyLmhlYXBfbGVuXSA9IHUyIDwgMiA/ICsrdTIgOiAwKV0gPSAxLCBlMi5kZXB0aFtpMl0gPSAwLCBlMi5vcHRfbGVuLS0sIG8yICYmIChlMi5zdGF0aWNfbGVuIC09IGEyWzIgKiBpMiArIDFdKTsKICAgICAgICAgIGZvciAodDIubWF4X2NvZGUgPSB1MiwgcjIgPSBlMi5oZWFwX2xlbiA+PiAxOyAxIDw9IHIyOyByMi0tKSBHKGUyLCBzMiwgcjIpOwogICAgICAgICAgZm9yIChpMiA9IGgyOyByMiA9IGUyLmhlYXBbMV0sIGUyLmhlYXBbMV0gPSBlMi5oZWFwW2UyLmhlYXBfbGVuLS1dLCBHKGUyLCBzMiwgMSksIG4yID0gZTIuaGVhcFsxXSwgZTIuaGVhcFstLWUyLmhlYXBfbWF4XSA9IHIyLCBlMi5oZWFwWy0tZTIuaGVhcF9tYXhdID0gbjIsIHMyWzIgKiBpMl0gPSBzMlsyICogcjJdICsgczJbMiAqIG4yXSwgZTIuZGVwdGhbaTJdID0gKGUyLmRlcHRoW3IyXSA+PSBlMi5kZXB0aFtuMl0gPyBlMi5kZXB0aFtyMl0gOiBlMi5kZXB0aFtuMl0pICsgMSwgczJbMiAqIHIyICsgMV0gPSBzMlsyICogbjIgKyAxXSA9IGkyLCBlMi5oZWFwWzFdID0gaTIrKywgRyhlMiwgczIsIDEpLCAyIDw9IGUyLmhlYXBfbGVuOyApIDsKICAgICAgICAgIGUyLmhlYXBbLS1lMi5oZWFwX21heF0gPSBlMi5oZWFwWzFdLCBmdW5jdGlvbihlMywgdDMpIHsKICAgICAgICAgICAgdmFyIHIzLCBuMywgaTMsIHMzLCBhMywgbzMsIGgzID0gdDMuZHluX3RyZWUsIHUzID0gdDMubWF4X2NvZGUsIGwyID0gdDMuc3RhdF9kZXNjLnN0YXRpY190cmVlLCBmMiA9IHQzLnN0YXRfZGVzYy5oYXNfc3RyZWUsIGMyID0gdDMuc3RhdF9kZXNjLmV4dHJhX2JpdHMsIGQyID0gdDMuc3RhdF9kZXNjLmV4dHJhX2Jhc2UsIHAyID0gdDMuc3RhdF9kZXNjLm1heF9sZW5ndGgsIG0yID0gMDsKICAgICAgICAgICAgZm9yIChzMyA9IDA7IHMzIDw9IGc7IHMzKyspIGUzLmJsX2NvdW50W3MzXSA9IDA7CiAgICAgICAgICAgIGZvciAoaDNbMiAqIGUzLmhlYXBbZTMuaGVhcF9tYXhdICsgMV0gPSAwLCByMyA9IGUzLmhlYXBfbWF4ICsgMTsgcjMgPCBfOyByMysrKSBwMiA8IChzMyA9IGgzWzIgKiBoM1syICogKG4zID0gZTMuaGVhcFtyM10pICsgMV0gKyAxXSArIDEpICYmIChzMyA9IHAyLCBtMisrKSwgaDNbMiAqIG4zICsgMV0gPSBzMywgdTMgPCBuMyB8fCAoZTMuYmxfY291bnRbczNdKyssIGEzID0gMCwgZDIgPD0gbjMgJiYgKGEzID0gYzJbbjMgLSBkMl0pLCBvMyA9IGgzWzIgKiBuM10sIGUzLm9wdF9sZW4gKz0gbzMgKiAoczMgKyBhMyksIGYyICYmIChlMy5zdGF0aWNfbGVuICs9IG8zICogKGwyWzIgKiBuMyArIDFdICsgYTMpKSk7CiAgICAgICAgICAgIGlmICgwICE9PSBtMikgewogICAgICAgICAgICAgIGRvIHsKICAgICAgICAgICAgICAgIGZvciAoczMgPSBwMiAtIDE7IDAgPT09IGUzLmJsX2NvdW50W3MzXTsgKSBzMy0tOwogICAgICAgICAgICAgICAgZTMuYmxfY291bnRbczNdLS0sIGUzLmJsX2NvdW50W3MzICsgMV0gKz0gMiwgZTMuYmxfY291bnRbcDJdLS0sIG0yIC09IDI7CiAgICAgICAgICAgICAgfSB3aGlsZSAoMCA8IG0yKTsKICAgICAgICAgICAgICBmb3IgKHMzID0gcDI7IDAgIT09IHMzOyBzMy0tKSBmb3IgKG4zID0gZTMuYmxfY291bnRbczNdOyAwICE9PSBuMzsgKSB1MyA8IChpMyA9IGUzLmhlYXBbLS1yM10pIHx8IChoM1syICogaTMgKyAxXSAhPT0gczMgJiYgKGUzLm9wdF9sZW4gKz0gKHMzIC0gaDNbMiAqIGkzICsgMV0pICogaDNbMiAqIGkzXSwgaDNbMiAqIGkzICsgMV0gPSBzMyksIG4zLS0pOwogICAgICAgICAgICB9CiAgICAgICAgICB9KGUyLCB0MiksIFooczIsIHUyLCBlMi5ibF9jb3VudCk7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIFgoZTIsIHQyLCByMikgewogICAgICAgICAgdmFyIG4yLCBpMiwgczIgPSAtMSwgYTIgPSB0MlsxXSwgbzIgPSAwLCBoMiA9IDcsIHUyID0gNDsKICAgICAgICAgIGZvciAoMCA9PT0gYTIgJiYgKGgyID0gMTM4LCB1MiA9IDMpLCB0MlsyICogKHIyICsgMSkgKyAxXSA9IDY1NTM1LCBuMiA9IDA7IG4yIDw9IHIyOyBuMisrKSBpMiA9IGEyLCBhMiA9IHQyWzIgKiAobjIgKyAxKSArIDFdLCArK28yIDwgaDIgJiYgaTIgPT09IGEyIHx8IChvMiA8IHUyID8gZTIuYmxfdHJlZVsyICogaTJdICs9IG8yIDogMCAhPT0gaTIgPyAoaTIgIT09IHMyICYmIGUyLmJsX3RyZWVbMiAqIGkyXSsrLCBlMi5ibF90cmVlWzIgKiBiXSsrKSA6IG8yIDw9IDEwID8gZTIuYmxfdHJlZVsyICogdl0rKyA6IGUyLmJsX3RyZWVbMiAqIHldKyssIHMyID0gaTIsIHUyID0gKG8yID0gMCkgPT09IGEyID8gKGgyID0gMTM4LCAzKSA6IGkyID09PSBhMiA/IChoMiA9IDYsIDMpIDogKGgyID0gNywgNCkpOwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBWKGUyLCB0MiwgcjIpIHsKICAgICAgICAgIHZhciBuMiwgaTIsIHMyID0gLTEsIGEyID0gdDJbMV0sIG8yID0gMCwgaDIgPSA3LCB1MiA9IDQ7CiAgICAgICAgICBmb3IgKDAgPT09IGEyICYmIChoMiA9IDEzOCwgdTIgPSAzKSwgbjIgPSAwOyBuMiA8PSByMjsgbjIrKykgaWYgKGkyID0gYTIsIGEyID0gdDJbMiAqIChuMiArIDEpICsgMV0sICEoKytvMiA8IGgyICYmIGkyID09PSBhMikpIHsKICAgICAgICAgICAgaWYgKG8yIDwgdTIpIGZvciAoOyBMKGUyLCBpMiwgZTIuYmxfdHJlZSksIDAgIT0gLS1vMjsgKSA7CiAgICAgICAgICAgIGVsc2UgMCAhPT0gaTIgPyAoaTIgIT09IHMyICYmIChMKGUyLCBpMiwgZTIuYmxfdHJlZSksIG8yLS0pLCBMKGUyLCBiLCBlMi5ibF90cmVlKSwgUChlMiwgbzIgLSAzLCAyKSkgOiBvMiA8PSAxMCA/IChMKGUyLCB2LCBlMi5ibF90cmVlKSwgUChlMiwgbzIgLSAzLCAzKSkgOiAoTChlMiwgeSwgZTIuYmxfdHJlZSksIFAoZTIsIG8yIC0gMTEsIDcpKTsKICAgICAgICAgICAgczIgPSBpMiwgdTIgPSAobzIgPSAwKSA9PT0gYTIgPyAoaDIgPSAxMzgsIDMpIDogaTIgPT09IGEyID8gKGgyID0gNiwgMykgOiAoaDIgPSA3LCA0KTsKICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgbihUKTsKICAgICAgICB2YXIgcSA9IGZhbHNlOwogICAgICAgIGZ1bmN0aW9uIEooZTIsIHQyLCByMiwgbjIpIHsKICAgICAgICAgIFAoZTIsIChzIDw8IDEpICsgKG4yID8gMSA6IDApLCAzKSwgZnVuY3Rpb24oZTMsIHQzLCByMywgbjMpIHsKICAgICAgICAgICAgTShlMyksIFUoZTMsIHIzKSwgVShlMywgfnIzKSwgaS5hcnJheVNldChlMy5wZW5kaW5nX2J1ZiwgZTMud2luZG93LCB0MywgcjMsIGUzLnBlbmRpbmcpLCBlMy5wZW5kaW5nICs9IHIzOwogICAgICAgICAgfShlMiwgdDIsIHIyKTsKICAgICAgICB9CiAgICAgICAgci5fdHJfaW5pdCA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICBxIHx8IChmdW5jdGlvbigpIHsKICAgICAgICAgICAgdmFyIGUzLCB0MiwgcjIsIG4yLCBpMiwgczIgPSBuZXcgQXJyYXkoZyArIDEpOwogICAgICAgICAgICBmb3IgKG4yID0gcjIgPSAwOyBuMiA8IGEgLSAxOyBuMisrKSBmb3IgKElbbjJdID0gcjIsIGUzID0gMDsgZTMgPCAxIDw8IHdbbjJdOyBlMysrKSBBW3IyKytdID0gbjI7CiAgICAgICAgICAgIGZvciAoQVtyMiAtIDFdID0gbjIsIG4yID0gaTIgPSAwOyBuMiA8IDE2OyBuMisrKSBmb3IgKFRbbjJdID0gaTIsIGUzID0gMDsgZTMgPCAxIDw8IGtbbjJdOyBlMysrKSBFW2kyKytdID0gbjI7CiAgICAgICAgICAgIGZvciAoaTIgPj49IDc7IG4yIDwgZjsgbjIrKykgZm9yIChUW24yXSA9IGkyIDw8IDcsIGUzID0gMDsgZTMgPCAxIDw8IGtbbjJdIC0gNzsgZTMrKykgRVsyNTYgKyBpMisrXSA9IG4yOwogICAgICAgICAgICBmb3IgKHQyID0gMDsgdDIgPD0gZzsgdDIrKykgczJbdDJdID0gMDsKICAgICAgICAgICAgZm9yIChlMyA9IDA7IGUzIDw9IDE0MzsgKSB6WzIgKiBlMyArIDFdID0gOCwgZTMrKywgczJbOF0rKzsKICAgICAgICAgICAgZm9yICg7IGUzIDw9IDI1NTsgKSB6WzIgKiBlMyArIDFdID0gOSwgZTMrKywgczJbOV0rKzsKICAgICAgICAgICAgZm9yICg7IGUzIDw9IDI3OTsgKSB6WzIgKiBlMyArIDFdID0gNywgZTMrKywgczJbN10rKzsKICAgICAgICAgICAgZm9yICg7IGUzIDw9IDI4NzsgKSB6WzIgKiBlMyArIDFdID0gOCwgZTMrKywgczJbOF0rKzsKICAgICAgICAgICAgZm9yIChaKHosIGwgKyAxLCBzMiksIGUzID0gMDsgZTMgPCBmOyBlMysrKSBDWzIgKiBlMyArIDFdID0gNSwgQ1syICogZTNdID0gaihlMywgNSk7CiAgICAgICAgICAgIE8gPSBuZXcgRCh6LCB3LCB1ICsgMSwgbCwgZyksIEIgPSBuZXcgRChDLCBrLCAwLCBmLCBnKSwgUiA9IG5ldyBEKG5ldyBBcnJheSgwKSwgeCwgMCwgYywgcCk7CiAgICAgICAgICB9KCksIHEgPSB0cnVlKSwgZTIubF9kZXNjID0gbmV3IEYoZTIuZHluX2x0cmVlLCBPKSwgZTIuZF9kZXNjID0gbmV3IEYoZTIuZHluX2R0cmVlLCBCKSwgZTIuYmxfZGVzYyA9IG5ldyBGKGUyLmJsX3RyZWUsIFIpLCBlMi5iaV9idWYgPSAwLCBlMi5iaV92YWxpZCA9IDAsIFcoZTIpOwogICAgICAgIH0sIHIuX3RyX3N0b3JlZF9ibG9jayA9IEosIHIuX3RyX2ZsdXNoX2Jsb2NrID0gZnVuY3Rpb24oZTIsIHQyLCByMiwgbjIpIHsKICAgICAgICAgIHZhciBpMiwgczIsIGEyID0gMDsKICAgICAgICAgIDAgPCBlMi5sZXZlbCA/ICgyID09PSBlMi5zdHJtLmRhdGFfdHlwZSAmJiAoZTIuc3RybS5kYXRhX3R5cGUgPSBmdW5jdGlvbihlMykgewogICAgICAgICAgICB2YXIgdDMsIHIzID0gNDA5MzYyNDQ0NzsKICAgICAgICAgICAgZm9yICh0MyA9IDA7IHQzIDw9IDMxOyB0MysrLCByMyA+Pj49IDEpIGlmICgxICYgcjMgJiYgMCAhPT0gZTMuZHluX2x0cmVlWzIgKiB0M10pIHJldHVybiBvOwogICAgICAgICAgICBpZiAoMCAhPT0gZTMuZHluX2x0cmVlWzE4XSB8fCAwICE9PSBlMy5keW5fbHRyZWVbMjBdIHx8IDAgIT09IGUzLmR5bl9sdHJlZVsyNl0pIHJldHVybiBoOwogICAgICAgICAgICBmb3IgKHQzID0gMzI7IHQzIDwgdTsgdDMrKykgaWYgKDAgIT09IGUzLmR5bl9sdHJlZVsyICogdDNdKSByZXR1cm4gaDsKICAgICAgICAgICAgcmV0dXJuIG87CiAgICAgICAgICB9KGUyKSksIFkoZTIsIGUyLmxfZGVzYyksIFkoZTIsIGUyLmRfZGVzYyksIGEyID0gZnVuY3Rpb24oZTMpIHsKICAgICAgICAgICAgdmFyIHQzOwogICAgICAgICAgICBmb3IgKFgoZTMsIGUzLmR5bl9sdHJlZSwgZTMubF9kZXNjLm1heF9jb2RlKSwgWChlMywgZTMuZHluX2R0cmVlLCBlMy5kX2Rlc2MubWF4X2NvZGUpLCBZKGUzLCBlMy5ibF9kZXNjKSwgdDMgPSBjIC0gMTsgMyA8PSB0MyAmJiAwID09PSBlMy5ibF90cmVlWzIgKiBTW3QzXSArIDFdOyB0My0tKSA7CiAgICAgICAgICAgIHJldHVybiBlMy5vcHRfbGVuICs9IDMgKiAodDMgKyAxKSArIDUgKyA1ICsgNCwgdDM7CiAgICAgICAgICB9KGUyKSwgaTIgPSBlMi5vcHRfbGVuICsgMyArIDcgPj4+IDMsIChzMiA9IGUyLnN0YXRpY19sZW4gKyAzICsgNyA+Pj4gMykgPD0gaTIgJiYgKGkyID0gczIpKSA6IGkyID0gczIgPSByMiArIDUsIHIyICsgNCA8PSBpMiAmJiAtMSAhPT0gdDIgPyBKKGUyLCB0MiwgcjIsIG4yKSA6IDQgPT09IGUyLnN0cmF0ZWd5IHx8IHMyID09PSBpMiA/IChQKGUyLCAyICsgKG4yID8gMSA6IDApLCAzKSwgSyhlMiwgeiwgQykpIDogKFAoZTIsIDQgKyAobjIgPyAxIDogMCksIDMpLCBmdW5jdGlvbihlMywgdDMsIHIzLCBuMykgewogICAgICAgICAgICB2YXIgaTM7CiAgICAgICAgICAgIGZvciAoUChlMywgdDMgLSAyNTcsIDUpLCBQKGUzLCByMyAtIDEsIDUpLCBQKGUzLCBuMyAtIDQsIDQpLCBpMyA9IDA7IGkzIDwgbjM7IGkzKyspIFAoZTMsIGUzLmJsX3RyZWVbMiAqIFNbaTNdICsgMV0sIDMpOwogICAgICAgICAgICBWKGUzLCBlMy5keW5fbHRyZWUsIHQzIC0gMSksIFYoZTMsIGUzLmR5bl9kdHJlZSwgcjMgLSAxKTsKICAgICAgICAgIH0oZTIsIGUyLmxfZGVzYy5tYXhfY29kZSArIDEsIGUyLmRfZGVzYy5tYXhfY29kZSArIDEsIGEyICsgMSksIEsoZTIsIGUyLmR5bl9sdHJlZSwgZTIuZHluX2R0cmVlKSksIFcoZTIpLCBuMiAmJiBNKGUyKTsKICAgICAgICB9LCByLl90cl90YWxseSA9IGZ1bmN0aW9uKGUyLCB0MiwgcjIpIHsKICAgICAgICAgIHJldHVybiBlMi5wZW5kaW5nX2J1ZltlMi5kX2J1ZiArIDIgKiBlMi5sYXN0X2xpdF0gPSB0MiA+Pj4gOCAmIDI1NSwgZTIucGVuZGluZ19idWZbZTIuZF9idWYgKyAyICogZTIubGFzdF9saXQgKyAxXSA9IDI1NSAmIHQyLCBlMi5wZW5kaW5nX2J1ZltlMi5sX2J1ZiArIGUyLmxhc3RfbGl0XSA9IDI1NSAmIHIyLCBlMi5sYXN0X2xpdCsrLCAwID09PSB0MiA/IGUyLmR5bl9sdHJlZVsyICogcjJdKysgOiAoZTIubWF0Y2hlcysrLCB0Mi0tLCBlMi5keW5fbHRyZWVbMiAqIChBW3IyXSArIHUgKyAxKV0rKywgZTIuZHluX2R0cmVlWzIgKiBOKHQyKV0rKyksIGUyLmxhc3RfbGl0ID09PSBlMi5saXRfYnVmc2l6ZSAtIDE7CiAgICAgICAgfSwgci5fdHJfYWxpZ24gPSBmdW5jdGlvbihlMikgewogICAgICAgICAgUChlMiwgMiwgMyksIEwoZTIsIG0sIHopLCBmdW5jdGlvbihlMykgewogICAgICAgICAgICAxNiA9PT0gZTMuYmlfdmFsaWQgPyAoVShlMywgZTMuYmlfYnVmKSwgZTMuYmlfYnVmID0gMCwgZTMuYmlfdmFsaWQgPSAwKSA6IDggPD0gZTMuYmlfdmFsaWQgJiYgKGUzLnBlbmRpbmdfYnVmW2UzLnBlbmRpbmcrK10gPSAyNTUgJiBlMy5iaV9idWYsIGUzLmJpX2J1ZiA+Pj0gOCwgZTMuYmlfdmFsaWQgLT0gOCk7CiAgICAgICAgICB9KGUyKTsKICAgICAgICB9OwogICAgICB9LCB7ICIuLi91dGlscy9jb21tb24iOiA0MSB9XSwgNTM6IFtmdW5jdGlvbihlLCB0LCByKSB7CiAgICAgICAgdC5leHBvcnRzID0gZnVuY3Rpb24oKSB7CiAgICAgICAgICB0aGlzLmlucHV0ID0gbnVsbCwgdGhpcy5uZXh0X2luID0gMCwgdGhpcy5hdmFpbF9pbiA9IDAsIHRoaXMudG90YWxfaW4gPSAwLCB0aGlzLm91dHB1dCA9IG51bGwsIHRoaXMubmV4dF9vdXQgPSAwLCB0aGlzLmF2YWlsX291dCA9IDAsIHRoaXMudG90YWxfb3V0ID0gMCwgdGhpcy5tc2cgPSAiIiwgdGhpcy5zdGF0ZSA9IG51bGwsIHRoaXMuZGF0YV90eXBlID0gMiwgdGhpcy5hZGxlciA9IDA7CiAgICAgICAgfTsKICAgICAgfSwge31dLCA1NDogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICAoZnVuY3Rpb24oZTIpIHsKICAgICAgICAgICFmdW5jdGlvbihyMiwgbikgewogICAgICAgICAgICBpZiAoIXIyLnNldEltbWVkaWF0ZSkgewogICAgICAgICAgICAgIHZhciBpLCBzLCB0MiwgYSwgbyA9IDEsIGggPSB7fSwgdSA9IGZhbHNlLCBsID0gcjIuZG9jdW1lbnQsIGUzID0gT2JqZWN0LmdldFByb3RvdHlwZU9mICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihyMik7CiAgICAgICAgICAgICAgZTMgPSBlMyAmJiBlMy5zZXRUaW1lb3V0ID8gZTMgOiByMiwgaSA9ICJbb2JqZWN0IHByb2Nlc3NdIiA9PT0ge30udG9TdHJpbmcuY2FsbChyMi5wcm9jZXNzKSA/IGZ1bmN0aW9uKGU0KSB7CiAgICAgICAgICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uKCkgewogICAgICAgICAgICAgICAgICBjKGU0KTsKICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICAgIH0gOiBmdW5jdGlvbigpIHsKICAgICAgICAgICAgICAgIGlmIChyMi5wb3N0TWVzc2FnZSAmJiAhcjIuaW1wb3J0U2NyaXB0cykgewogICAgICAgICAgICAgICAgICB2YXIgZTQgPSB0cnVlLCB0MyA9IHIyLm9ubWVzc2FnZTsKICAgICAgICAgICAgICAgICAgcmV0dXJuIHIyLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKCkgewogICAgICAgICAgICAgICAgICAgIGU0ID0gZmFsc2U7CiAgICAgICAgICAgICAgICAgIH0sIHIyLnBvc3RNZXNzYWdlKCIiLCAiKiIpLCByMi5vbm1lc3NhZ2UgPSB0MywgZTQ7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgfSgpID8gKGEgPSAic2V0SW1tZWRpYXRlJCIgKyBNYXRoLnJhbmRvbSgpICsgIiQiLCByMi5hZGRFdmVudExpc3RlbmVyID8gcjIuYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsIGQsIGZhbHNlKSA6IHIyLmF0dGFjaEV2ZW50KCJvbm1lc3NhZ2UiLCBkKSwgZnVuY3Rpb24oZTQpIHsKICAgICAgICAgICAgICAgIHIyLnBvc3RNZXNzYWdlKGEgKyBlNCwgIioiKTsKICAgICAgICAgICAgICB9KSA6IHIyLk1lc3NhZ2VDaGFubmVsID8gKCh0MiA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpKS5wb3J0MS5vbm1lc3NhZ2UgPSBmdW5jdGlvbihlNCkgewogICAgICAgICAgICAgICAgYyhlNC5kYXRhKTsKICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlNCkgewogICAgICAgICAgICAgICAgdDIucG9ydDIucG9zdE1lc3NhZ2UoZTQpOwogICAgICAgICAgICAgIH0pIDogbCAmJiAib25yZWFkeXN0YXRlY2hhbmdlIiBpbiBsLmNyZWF0ZUVsZW1lbnQoInNjcmlwdCIpID8gKHMgPSBsLmRvY3VtZW50RWxlbWVudCwgZnVuY3Rpb24oZTQpIHsKICAgICAgICAgICAgICAgIHZhciB0MyA9IGwuY3JlYXRlRWxlbWVudCgic2NyaXB0Iik7CiAgICAgICAgICAgICAgICB0My5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHsKICAgICAgICAgICAgICAgICAgYyhlNCksIHQzLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGwsIHMucmVtb3ZlQ2hpbGQodDMpLCB0MyA9IG51bGw7CiAgICAgICAgICAgICAgICB9LCBzLmFwcGVuZENoaWxkKHQzKTsKICAgICAgICAgICAgICB9KSA6IGZ1bmN0aW9uKGU0KSB7CiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGMsIDAsIGU0KTsKICAgICAgICAgICAgICB9LCBlMy5zZXRJbW1lZGlhdGUgPSBmdW5jdGlvbihlNCkgewogICAgICAgICAgICAgICAgImZ1bmN0aW9uIiAhPSB0eXBlb2YgZTQgJiYgKGU0ID0gbmV3IEZ1bmN0aW9uKCIiICsgZTQpKTsKICAgICAgICAgICAgICAgIGZvciAodmFyIHQzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKSwgcjMgPSAwOyByMyA8IHQzLmxlbmd0aDsgcjMrKykgdDNbcjNdID0gYXJndW1lbnRzW3IzICsgMV07CiAgICAgICAgICAgICAgICB2YXIgbjIgPSB7IGNhbGxiYWNrOiBlNCwgYXJnczogdDMgfTsKICAgICAgICAgICAgICAgIHJldHVybiBoW29dID0gbjIsIGkobyksIG8rKzsKICAgICAgICAgICAgICB9LCBlMy5jbGVhckltbWVkaWF0ZSA9IGY7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgZnVuY3Rpb24gZihlNCkgewogICAgICAgICAgICAgIGRlbGV0ZSBoW2U0XTsKICAgICAgICAgICAgfQogICAgICAgICAgICBmdW5jdGlvbiBjKGU0KSB7CiAgICAgICAgICAgICAgaWYgKHUpIHNldFRpbWVvdXQoYywgMCwgZTQpOwogICAgICAgICAgICAgIGVsc2UgewogICAgICAgICAgICAgICAgdmFyIHQzID0gaFtlNF07CiAgICAgICAgICAgICAgICBpZiAodDMpIHsKICAgICAgICAgICAgICAgICAgdSA9IHRydWU7CiAgICAgICAgICAgICAgICAgIHRyeSB7CiAgICAgICAgICAgICAgICAgICAgIWZ1bmN0aW9uKGU1KSB7CiAgICAgICAgICAgICAgICAgICAgICB2YXIgdDQgPSBlNS5jYWxsYmFjaywgcjMgPSBlNS5hcmdzOwogICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChyMy5sZW5ndGgpIHsKICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOgogICAgICAgICAgICAgICAgICAgICAgICAgIHQ0KCk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMToKICAgICAgICAgICAgICAgICAgICAgICAgICB0NChyM1swXSk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjoKICAgICAgICAgICAgICAgICAgICAgICAgICB0NChyM1swXSwgcjNbMV0pOwogICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6CiAgICAgICAgICAgICAgICAgICAgICAgICAgdDQocjNbMF0sIHIzWzFdLCByM1syXSk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6CiAgICAgICAgICAgICAgICAgICAgICAgICAgdDQuYXBwbHkobiwgcjMpOwogICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIH0odDMpOwogICAgICAgICAgICAgICAgICB9IGZpbmFsbHkgewogICAgICAgICAgICAgICAgICAgIGYoZTQpLCB1ID0gZmFsc2U7CiAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgZnVuY3Rpb24gZChlNCkgewogICAgICAgICAgICAgIGU0LnNvdXJjZSA9PT0gcjIgJiYgInN0cmluZyIgPT0gdHlwZW9mIGU0LmRhdGEgJiYgMCA9PT0gZTQuZGF0YS5pbmRleE9mKGEpICYmIGMoK2U0LmRhdGEuc2xpY2UoYS5sZW5ndGgpKTsKICAgICAgICAgICAgfQogICAgICAgICAgfSgidW5kZWZpbmVkIiA9PSB0eXBlb2Ygc2VsZiA/IHZvaWQgMCA9PT0gZTIgPyB0aGlzIDogZTIgOiBzZWxmKTsKICAgICAgICB9KS5jYWxsKHRoaXMsICJ1bmRlZmluZWQiICE9IHR5cGVvZiBjb21tb25qc0dsb2JhbCA/IGNvbW1vbmpzR2xvYmFsIDogInVuZGVmaW5lZCIgIT0gdHlwZW9mIHNlbGYgPyBzZWxmIDogInVuZGVmaW5lZCIgIT0gdHlwZW9mIHdpbmRvdyA/IHdpbmRvdyA6IHt9KTsKICAgICAgfSwge31dIH0sIHt9LCBbMTBdKSgxMCk7CiAgICB9KTsKICB9KShqc3ppcF9taW4pOwogIHZhciBqc3ppcF9taW5FeHBvcnRzID0ganN6aXBfbWluLmV4cG9ydHM7CiAgdmFyIEpTWmlwID0gLyogQF9fUFVSRV9fICovIGdldERlZmF1bHRFeHBvcnRGcm9tQ2pzKGpzemlwX21pbkV4cG9ydHMpOwogIC8qKgogICAqIEBsaWNlbnNlCiAgICogQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQwogICAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wCiAgICovCiAgY29uc3QgcHJveHlNYXJrZXIgPSBTeW1ib2woIkNvbWxpbmsucHJveHkiKTsKICBjb25zdCBjcmVhdGVFbmRwb2ludCA9IFN5bWJvbCgiQ29tbGluay5lbmRwb2ludCIpOwogIGNvbnN0IHJlbGVhc2VQcm94eSA9IFN5bWJvbCgiQ29tbGluay5yZWxlYXNlUHJveHkiKTsKICBjb25zdCBmaW5hbGl6ZXIgPSBTeW1ib2woIkNvbWxpbmsuZmluYWxpemVyIik7CiAgY29uc3QgdGhyb3dNYXJrZXIgPSBTeW1ib2woIkNvbWxpbmsudGhyb3duIik7CiAgY29uc3QgaXNPYmplY3QgPSAodmFsKSA9PiB0eXBlb2YgdmFsID09PSAib2JqZWN0IiAmJiB2YWwgIT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gImZ1bmN0aW9uIjsKICBjb25zdCBwcm94eVRyYW5zZmVySGFuZGxlciA9IHsKICAgIGNhbkhhbmRsZTogKHZhbCkgPT4gaXNPYmplY3QodmFsKSAmJiB2YWxbcHJveHlNYXJrZXJdLAogICAgc2VyaWFsaXplKG9iaikgewogICAgICBjb25zdCB7IHBvcnQxLCBwb3J0MiB9ID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7CiAgICAgIGV4cG9zZShvYmosIHBvcnQxKTsKICAgICAgcmV0dXJuIFtwb3J0MiwgW3BvcnQyXV07CiAgICB9LAogICAgZGVzZXJpYWxpemUocG9ydCkgewogICAgICBwb3J0LnN0YXJ0KCk7CiAgICAgIHJldHVybiB3cmFwKHBvcnQpOwogICAgfQogIH07CiAgY29uc3QgdGhyb3dUcmFuc2ZlckhhbmRsZXIgPSB7CiAgICBjYW5IYW5kbGU6ICh2YWx1ZSkgPT4gaXNPYmplY3QodmFsdWUpICYmIHRocm93TWFya2VyIGluIHZhbHVlLAogICAgc2VyaWFsaXplKHsgdmFsdWUgfSkgewogICAgICBsZXQgc2VyaWFsaXplZDsKICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRXJyb3IpIHsKICAgICAgICBzZXJpYWxpemVkID0gewogICAgICAgICAgaXNFcnJvcjogdHJ1ZSwKICAgICAgICAgIHZhbHVlOiB7CiAgICAgICAgICAgIG1lc3NhZ2U6IHZhbHVlLm1lc3NhZ2UsCiAgICAgICAgICAgIG5hbWU6IHZhbHVlLm5hbWUsCiAgICAgICAgICAgIHN0YWNrOiB2YWx1ZS5zdGFjawogICAgICAgICAgfQogICAgICAgIH07CiAgICAgIH0gZWxzZSB7CiAgICAgICAgc2VyaWFsaXplZCA9IHsgaXNFcnJvcjogZmFsc2UsIHZhbHVlIH07CiAgICAgIH0KICAgICAgcmV0dXJuIFtzZXJpYWxpemVkLCBbXV07CiAgICB9LAogICAgZGVzZXJpYWxpemUoc2VyaWFsaXplZCkgewogICAgICBpZiAoc2VyaWFsaXplZC5pc0Vycm9yKSB7CiAgICAgICAgdGhyb3cgT2JqZWN0LmFzc2lnbihuZXcgRXJyb3Ioc2VyaWFsaXplZC52YWx1ZS5tZXNzYWdlKSwgc2VyaWFsaXplZC52YWx1ZSk7CiAgICAgIH0KICAgICAgdGhyb3cgc2VyaWFsaXplZC52YWx1ZTsKICAgIH0KICB9OwogIGNvbnN0IHRyYW5zZmVySGFuZGxlcnMgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcChbCiAgICBbInByb3h5IiwgcHJveHlUcmFuc2ZlckhhbmRsZXJdLAogICAgWyJ0aHJvdyIsIHRocm93VHJhbnNmZXJIYW5kbGVyXQogIF0pOwogIGZ1bmN0aW9uIGlzQWxsb3dlZE9yaWdpbihhbGxvd2VkT3JpZ2lucywgb3JpZ2luKSB7CiAgICBmb3IgKGNvbnN0IGFsbG93ZWRPcmlnaW4gb2YgYWxsb3dlZE9yaWdpbnMpIHsKICAgICAgaWYgKG9yaWdpbiA9PT0gYWxsb3dlZE9yaWdpbiB8fCBhbGxvd2VkT3JpZ2luID09PSAiKiIpIHsKICAgICAgICByZXR1cm4gdHJ1ZTsKICAgICAgfQogICAgICBpZiAoYWxsb3dlZE9yaWdpbiBpbnN0YW5jZW9mIFJlZ0V4cCAmJiBhbGxvd2VkT3JpZ2luLnRlc3Qob3JpZ2luKSkgewogICAgICAgIHJldHVybiB0cnVlOwogICAgICB9CiAgICB9CiAgICByZXR1cm4gZmFsc2U7CiAgfQogIGZ1bmN0aW9uIGV4cG9zZShvYmosIGVwID0gZ2xvYmFsVGhpcywgYWxsb3dlZE9yaWdpbnMgPSBbIioiXSkgewogICAgZXAuYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsIGZ1bmN0aW9uIGNhbGxiYWNrKGV2KSB7CiAgICAgIGlmICghZXYgfHwgIWV2LmRhdGEpIHsKICAgICAgICByZXR1cm47CiAgICAgIH0KICAgICAgaWYgKCFpc0FsbG93ZWRPcmlnaW4oYWxsb3dlZE9yaWdpbnMsIGV2Lm9yaWdpbikpIHsKICAgICAgICBjb25zb2xlLndhcm4oYEludmFsaWQgb3JpZ2luICcke2V2Lm9yaWdpbn0nIGZvciBjb21saW5rIHByb3h5YCk7CiAgICAgICAgcmV0dXJuOwogICAgICB9CiAgICAgIGNvbnN0IHsgaWQsIHR5cGUsIHBhdGggfSA9IE9iamVjdC5hc3NpZ24oeyBwYXRoOiBbXSB9LCBldi5kYXRhKTsKICAgICAgY29uc3QgYXJndW1lbnRMaXN0ID0gKGV2LmRhdGEuYXJndW1lbnRMaXN0IHx8IFtdKS5tYXAoZnJvbVdpcmVWYWx1ZSk7CiAgICAgIGxldCByZXR1cm5WYWx1ZTsKICAgICAgdHJ5IHsKICAgICAgICBjb25zdCBwYXJlbnQgPSBwYXRoLnNsaWNlKDAsIC0xKS5yZWR1Y2UoKG9iajIsIHByb3ApID0+IG9iajJbcHJvcF0sIG9iaik7CiAgICAgICAgY29uc3QgcmF3VmFsdWUgPSBwYXRoLnJlZHVjZSgob2JqMiwgcHJvcCkgPT4gb2JqMltwcm9wXSwgb2JqKTsKICAgICAgICBzd2l0Y2ggKHR5cGUpIHsKICAgICAgICAgIGNhc2UgIkdFVCI6CiAgICAgICAgICAgIHsKICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IHJhd1ZhbHVlOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgY2FzZSAiU0VUIjoKICAgICAgICAgICAgewogICAgICAgICAgICAgIHBhcmVudFtwYXRoLnNsaWNlKC0xKVswXV0gPSBmcm9tV2lyZVZhbHVlKGV2LmRhdGEudmFsdWUpOwogICAgICAgICAgICAgIHJldHVyblZhbHVlID0gdHJ1ZTsKICAgICAgICAgICAgfQogICAgICAgICAgICBicmVhazsKICAgICAgICAgIGNhc2UgIkFQUExZIjoKICAgICAgICAgICAgewogICAgICAgICAgICAgIHJldHVyblZhbHVlID0gcmF3VmFsdWUuYXBwbHkocGFyZW50LCBhcmd1bWVudExpc3QpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgY2FzZSAiQ09OU1RSVUNUIjoKICAgICAgICAgICAgewogICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gbmV3IHJhd1ZhbHVlKC4uLmFyZ3VtZW50TGlzdCk7CiAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBwcm94eSh2YWx1ZSk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICBjYXNlICJFTkRQT0lOVCI6CiAgICAgICAgICAgIHsKICAgICAgICAgICAgICBjb25zdCB7IHBvcnQxLCBwb3J0MiB9ID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7CiAgICAgICAgICAgICAgZXhwb3NlKG9iaiwgcG9ydDIpOwogICAgICAgICAgICAgIHJldHVyblZhbHVlID0gdHJhbnNmZXIocG9ydDEsIFtwb3J0MV0pOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgY2FzZSAiUkVMRUFTRSI6CiAgICAgICAgICAgIHsKICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IHZvaWQgMDsKICAgICAgICAgICAgfQogICAgICAgICAgICBicmVhazsKICAgICAgICAgIGRlZmF1bHQ6CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICB9CiAgICAgIH0gY2F0Y2ggKHZhbHVlKSB7CiAgICAgICAgcmV0dXJuVmFsdWUgPSB7IHZhbHVlLCBbdGhyb3dNYXJrZXJdOiAwIH07CiAgICAgIH0KICAgICAgUHJvbWlzZS5yZXNvbHZlKHJldHVyblZhbHVlKS5jYXRjaCgodmFsdWUpID0+IHsKICAgICAgICByZXR1cm4geyB2YWx1ZSwgW3Rocm93TWFya2VyXTogMCB9OwogICAgICB9KS50aGVuKChyZXR1cm5WYWx1ZTIpID0+IHsKICAgICAgICBjb25zdCBbd2lyZVZhbHVlLCB0cmFuc2ZlcmFibGVzXSA9IHRvV2lyZVZhbHVlKHJldHVyblZhbHVlMik7CiAgICAgICAgZXAucG9zdE1lc3NhZ2UoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB3aXJlVmFsdWUpLCB7IGlkIH0pLCB0cmFuc2ZlcmFibGVzKTsKICAgICAgICBpZiAodHlwZSA9PT0gIlJFTEVBU0UiKSB7CiAgICAgICAgICBlcC5yZW1vdmVFdmVudExpc3RlbmVyKCJtZXNzYWdlIiwgY2FsbGJhY2spOwogICAgICAgICAgY2xvc2VFbmRQb2ludChlcCk7CiAgICAgICAgICBpZiAoZmluYWxpemVyIGluIG9iaiAmJiB0eXBlb2Ygb2JqW2ZpbmFsaXplcl0gPT09ICJmdW5jdGlvbiIpIHsKICAgICAgICAgICAgb2JqW2ZpbmFsaXplcl0oKTsKICAgICAgICAgIH0KICAgICAgICB9CiAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4gewogICAgICAgIGNvbnN0IFt3aXJlVmFsdWUsIHRyYW5zZmVyYWJsZXNdID0gdG9XaXJlVmFsdWUoewogICAgICAgICAgdmFsdWU6IG5ldyBUeXBlRXJyb3IoIlVuc2VyaWFsaXphYmxlIHJldHVybiB2YWx1ZSIpLAogICAgICAgICAgW3Rocm93TWFya2VyXTogMAogICAgICAgIH0pOwogICAgICAgIGVwLnBvc3RNZXNzYWdlKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgd2lyZVZhbHVlKSwgeyBpZCB9KSwgdHJhbnNmZXJhYmxlcyk7CiAgICAgIH0pOwogICAgfSk7CiAgICBpZiAoZXAuc3RhcnQpIHsKICAgICAgZXAuc3RhcnQoKTsKICAgIH0KICB9CiAgZnVuY3Rpb24gaXNNZXNzYWdlUG9ydChlbmRwb2ludCkgewogICAgcmV0dXJuIGVuZHBvaW50LmNvbnN0cnVjdG9yLm5hbWUgPT09ICJNZXNzYWdlUG9ydCI7CiAgfQogIGZ1bmN0aW9uIGNsb3NlRW5kUG9pbnQoZW5kcG9pbnQpIHsKICAgIGlmIChpc01lc3NhZ2VQb3J0KGVuZHBvaW50KSkKICAgICAgZW5kcG9pbnQuY2xvc2UoKTsKICB9CiAgZnVuY3Rpb24gd3JhcChlcCwgdGFyZ2V0KSB7CiAgICByZXR1cm4gY3JlYXRlUHJveHkoZXAsIFtdLCB0YXJnZXQpOwogIH0KICBmdW5jdGlvbiB0aHJvd0lmUHJveHlSZWxlYXNlZChpc1JlbGVhc2VkKSB7CiAgICBpZiAoaXNSZWxlYXNlZCkgewogICAgICB0aHJvdyBuZXcgRXJyb3IoIlByb3h5IGhhcyBiZWVuIHJlbGVhc2VkIGFuZCBpcyBub3QgdXNlYWJsZSIpOwogICAgfQogIH0KICBmdW5jdGlvbiByZWxlYXNlRW5kcG9pbnQoZXApIHsKICAgIHJldHVybiByZXF1ZXN0UmVzcG9uc2VNZXNzYWdlKGVwLCB7CiAgICAgIHR5cGU6ICJSRUxFQVNFIgogICAgfSkudGhlbigoKSA9PiB7CiAgICAgIGNsb3NlRW5kUG9pbnQoZXApOwogICAgfSk7CiAgfQogIGNvbnN0IHByb3h5Q291bnRlciA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgV2Vha01hcCgpOwogIGNvbnN0IHByb3h5RmluYWxpemVycyA9ICJGaW5hbGl6YXRpb25SZWdpc3RyeSIgaW4gZ2xvYmFsVGhpcyAmJiBuZXcgRmluYWxpemF0aW9uUmVnaXN0cnkoKGVwKSA9PiB7CiAgICBjb25zdCBuZXdDb3VudCA9IChwcm94eUNvdW50ZXIuZ2V0KGVwKSB8fCAwKSAtIDE7CiAgICBwcm94eUNvdW50ZXIuc2V0KGVwLCBuZXdDb3VudCk7CiAgICBpZiAobmV3Q291bnQgPT09IDApIHsKICAgICAgcmVsZWFzZUVuZHBvaW50KGVwKTsKICAgIH0KICB9KTsKICBmdW5jdGlvbiByZWdpc3RlclByb3h5KHByb3h5MiwgZXApIHsKICAgIGNvbnN0IG5ld0NvdW50ID0gKHByb3h5Q291bnRlci5nZXQoZXApIHx8IDApICsgMTsKICAgIHByb3h5Q291bnRlci5zZXQoZXAsIG5ld0NvdW50KTsKICAgIGlmIChwcm94eUZpbmFsaXplcnMpIHsKICAgICAgcHJveHlGaW5hbGl6ZXJzLnJlZ2lzdGVyKHByb3h5MiwgZXAsIHByb3h5Mik7CiAgICB9CiAgfQogIGZ1bmN0aW9uIHVucmVnaXN0ZXJQcm94eShwcm94eTIpIHsKICAgIGlmIChwcm94eUZpbmFsaXplcnMpIHsKICAgICAgcHJveHlGaW5hbGl6ZXJzLnVucmVnaXN0ZXIocHJveHkyKTsKICAgIH0KICB9CiAgZnVuY3Rpb24gY3JlYXRlUHJveHkoZXAsIHBhdGggPSBbXSwgdGFyZ2V0ID0gZnVuY3Rpb24oKSB7CiAgfSkgewogICAgbGV0IGlzUHJveHlSZWxlYXNlZCA9IGZhbHNlOwogICAgY29uc3QgcHJveHkyID0gbmV3IFByb3h5KHRhcmdldCwgewogICAgICBnZXQoX3RhcmdldCwgcHJvcCkgewogICAgICAgIHRocm93SWZQcm94eVJlbGVhc2VkKGlzUHJveHlSZWxlYXNlZCk7CiAgICAgICAgaWYgKHByb3AgPT09IHJlbGVhc2VQcm94eSkgewogICAgICAgICAgcmV0dXJuICgpID0+IHsKICAgICAgICAgICAgdW5yZWdpc3RlclByb3h5KHByb3h5Mik7CiAgICAgICAgICAgIHJlbGVhc2VFbmRwb2ludChlcCk7CiAgICAgICAgICAgIGlzUHJveHlSZWxlYXNlZCA9IHRydWU7CiAgICAgICAgICB9OwogICAgICAgIH0KICAgICAgICBpZiAocHJvcCA9PT0gInRoZW4iKSB7CiAgICAgICAgICBpZiAocGF0aC5sZW5ndGggPT09IDApIHsKICAgICAgICAgICAgcmV0dXJuIHsgdGhlbjogKCkgPT4gcHJveHkyIH07CiAgICAgICAgICB9CiAgICAgICAgICBjb25zdCByID0gcmVxdWVzdFJlc3BvbnNlTWVzc2FnZShlcCwgewogICAgICAgICAgICB0eXBlOiAiR0VUIiwKICAgICAgICAgICAgcGF0aDogcGF0aC5tYXAoKHApID0+IHAudG9TdHJpbmcoKSkKICAgICAgICAgIH0pLnRoZW4oZnJvbVdpcmVWYWx1ZSk7CiAgICAgICAgICByZXR1cm4gci50aGVuLmJpbmQocik7CiAgICAgICAgfQogICAgICAgIHJldHVybiBjcmVhdGVQcm94eShlcCwgWy4uLnBhdGgsIHByb3BdKTsKICAgICAgfSwKICAgICAgc2V0KF90YXJnZXQsIHByb3AsIHJhd1ZhbHVlKSB7CiAgICAgICAgdGhyb3dJZlByb3h5UmVsZWFzZWQoaXNQcm94eVJlbGVhc2VkKTsKICAgICAgICBjb25zdCBbdmFsdWUsIHRyYW5zZmVyYWJsZXNdID0gdG9XaXJlVmFsdWUocmF3VmFsdWUpOwogICAgICAgIHJldHVybiByZXF1ZXN0UmVzcG9uc2VNZXNzYWdlKGVwLCB7CiAgICAgICAgICB0eXBlOiAiU0VUIiwKICAgICAgICAgIHBhdGg6IFsuLi5wYXRoLCBwcm9wXS5tYXAoKHApID0+IHAudG9TdHJpbmcoKSksCiAgICAgICAgICB2YWx1ZQogICAgICAgIH0sIHRyYW5zZmVyYWJsZXMpLnRoZW4oZnJvbVdpcmVWYWx1ZSk7CiAgICAgIH0sCiAgICAgIGFwcGx5KF90YXJnZXQsIF90aGlzQXJnLCByYXdBcmd1bWVudExpc3QpIHsKICAgICAgICB0aHJvd0lmUHJveHlSZWxlYXNlZChpc1Byb3h5UmVsZWFzZWQpOwogICAgICAgIGNvbnN0IGxhc3QgPSBwYXRoW3BhdGgubGVuZ3RoIC0gMV07CiAgICAgICAgaWYgKGxhc3QgPT09IGNyZWF0ZUVuZHBvaW50KSB7CiAgICAgICAgICByZXR1cm4gcmVxdWVzdFJlc3BvbnNlTWVzc2FnZShlcCwgewogICAgICAgICAgICB0eXBlOiAiRU5EUE9JTlQiCiAgICAgICAgICB9KS50aGVuKGZyb21XaXJlVmFsdWUpOwogICAgICAgIH0KICAgICAgICBpZiAobGFzdCA9PT0gImJpbmQiKSB7CiAgICAgICAgICByZXR1cm4gY3JlYXRlUHJveHkoZXAsIHBhdGguc2xpY2UoMCwgLTEpKTsKICAgICAgICB9CiAgICAgICAgY29uc3QgW2FyZ3VtZW50TGlzdCwgdHJhbnNmZXJhYmxlc10gPSBwcm9jZXNzQXJndW1lbnRzKHJhd0FyZ3VtZW50TGlzdCk7CiAgICAgICAgcmV0dXJuIHJlcXVlc3RSZXNwb25zZU1lc3NhZ2UoZXAsIHsKICAgICAgICAgIHR5cGU6ICJBUFBMWSIsCiAgICAgICAgICBwYXRoOiBwYXRoLm1hcCgocCkgPT4gcC50b1N0cmluZygpKSwKICAgICAgICAgIGFyZ3VtZW50TGlzdAogICAgICAgIH0sIHRyYW5zZmVyYWJsZXMpLnRoZW4oZnJvbVdpcmVWYWx1ZSk7CiAgICAgIH0sCiAgICAgIGNvbnN0cnVjdChfdGFyZ2V0LCByYXdBcmd1bWVudExpc3QpIHsKICAgICAgICB0aHJvd0lmUHJveHlSZWxlYXNlZChpc1Byb3h5UmVsZWFzZWQpOwogICAgICAgIGNvbnN0IFthcmd1bWVudExpc3QsIHRyYW5zZmVyYWJsZXNdID0gcHJvY2Vzc0FyZ3VtZW50cyhyYXdBcmd1bWVudExpc3QpOwogICAgICAgIHJldHVybiByZXF1ZXN0UmVzcG9uc2VNZXNzYWdlKGVwLCB7CiAgICAgICAgICB0eXBlOiAiQ09OU1RSVUNUIiwKICAgICAgICAgIHBhdGg6IHBhdGgubWFwKChwKSA9PiBwLnRvU3RyaW5nKCkpLAogICAgICAgICAgYXJndW1lbnRMaXN0CiAgICAgICAgfSwgdHJhbnNmZXJhYmxlcykudGhlbihmcm9tV2lyZVZhbHVlKTsKICAgICAgfQogICAgfSk7CiAgICByZWdpc3RlclByb3h5KHByb3h5MiwgZXApOwogICAgcmV0dXJuIHByb3h5MjsKICB9CiAgZnVuY3Rpb24gbXlGbGF0KGFycikgewogICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5jb25jYXQuYXBwbHkoW10sIGFycik7CiAgfQogIGZ1bmN0aW9uIHByb2Nlc3NBcmd1bWVudHMoYXJndW1lbnRMaXN0KSB7CiAgICBjb25zdCBwcm9jZXNzZWQgPSBhcmd1bWVudExpc3QubWFwKHRvV2lyZVZhbHVlKTsKICAgIHJldHVybiBbcHJvY2Vzc2VkLm1hcCgodikgPT4gdlswXSksIG15RmxhdChwcm9jZXNzZWQubWFwKCh2KSA9PiB2WzFdKSldOwogIH0KICBjb25zdCB0cmFuc2ZlckNhY2hlID0gLyogQF9fUFVSRV9fICovIG5ldyBXZWFrTWFwKCk7CiAgZnVuY3Rpb24gdHJhbnNmZXIob2JqLCB0cmFuc2ZlcnMpIHsKICAgIHRyYW5zZmVyQ2FjaGUuc2V0KG9iaiwgdHJhbnNmZXJzKTsKICAgIHJldHVybiBvYmo7CiAgfQogIGZ1bmN0aW9uIHByb3h5KG9iaikgewogICAgcmV0dXJuIE9iamVjdC5hc3NpZ24ob2JqLCB7IFtwcm94eU1hcmtlcl06IHRydWUgfSk7CiAgfQogIGZ1bmN0aW9uIHRvV2lyZVZhbHVlKHZhbHVlKSB7CiAgICBmb3IgKGNvbnN0IFtuYW1lLCBoYW5kbGVyXSBvZiB0cmFuc2ZlckhhbmRsZXJzKSB7CiAgICAgIGlmIChoYW5kbGVyLmNhbkhhbmRsZSh2YWx1ZSkpIHsKICAgICAgICBjb25zdCBbc2VyaWFsaXplZFZhbHVlLCB0cmFuc2ZlcmFibGVzXSA9IGhhbmRsZXIuc2VyaWFsaXplKHZhbHVlKTsKICAgICAgICByZXR1cm4gWwogICAgICAgICAgewogICAgICAgICAgICB0eXBlOiAiSEFORExFUiIsCiAgICAgICAgICAgIG5hbWUsCiAgICAgICAgICAgIHZhbHVlOiBzZXJpYWxpemVkVmFsdWUKICAgICAgICAgIH0sCiAgICAgICAgICB0cmFuc2ZlcmFibGVzCiAgICAgICAgXTsKICAgICAgfQogICAgfQogICAgcmV0dXJuIFsKICAgICAgewogICAgICAgIHR5cGU6ICJSQVciLAogICAgICAgIHZhbHVlCiAgICAgIH0sCiAgICAgIHRyYW5zZmVyQ2FjaGUuZ2V0KHZhbHVlKSB8fCBbXQogICAgXTsKICB9CiAgZnVuY3Rpb24gZnJvbVdpcmVWYWx1ZSh2YWx1ZSkgewogICAgc3dpdGNoICh2YWx1ZS50eXBlKSB7CiAgICAgIGNhc2UgIkhBTkRMRVIiOgogICAgICAgIHJldHVybiB0cmFuc2ZlckhhbmRsZXJzLmdldCh2YWx1ZS5uYW1lKS5kZXNlcmlhbGl6ZSh2YWx1ZS52YWx1ZSk7CiAgICAgIGNhc2UgIlJBVyI6CiAgICAgICAgcmV0dXJuIHZhbHVlLnZhbHVlOwogICAgfQogIH0KICBmdW5jdGlvbiByZXF1ZXN0UmVzcG9uc2VNZXNzYWdlKGVwLCBtc2csIHRyYW5zZmVycykgewogICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7CiAgICAgIGNvbnN0IGlkID0gZ2VuZXJhdGVVVUlEKCk7CiAgICAgIGVwLmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLCBmdW5jdGlvbiBsKGV2KSB7CiAgICAgICAgaWYgKCFldi5kYXRhIHx8ICFldi5kYXRhLmlkIHx8IGV2LmRhdGEuaWQgIT09IGlkKSB7CiAgICAgICAgICByZXR1cm47CiAgICAgICAgfQogICAgICAgIGVwLnJlbW92ZUV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLCBsKTsKICAgICAgICByZXNvbHZlKGV2LmRhdGEpOwogICAgICB9KTsKICAgICAgaWYgKGVwLnN0YXJ0KSB7CiAgICAgICAgZXAuc3RhcnQoKTsKICAgICAgfQogICAgICBlcC5wb3N0TWVzc2FnZShPYmplY3QuYXNzaWduKHsgaWQgfSwgbXNnKSwgdHJhbnNmZXJzKTsKICAgIH0pOwogIH0KICBmdW5jdGlvbiBnZW5lcmF0ZVVVSUQoKSB7CiAgICByZXR1cm4gbmV3IEFycmF5KDQpLmZpbGwoMCkubWFwKCgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKS50b1N0cmluZygxNikpLmpvaW4oIi0iKTsKICB9CiAgY2xhc3MgRGlzcG9zYWJsZUpTWmlwIHsKICAgIGNvbnN0cnVjdG9yKCkgewogICAgICBfX3B1YmxpY0ZpZWxkKHRoaXMsICJ6aXAiLCBuZXcgSlNaaXAoKSk7CiAgICB9CiAgICBmaWxlKHsgbmFtZSwgZGF0YSB9KSB7CiAgICAgIHRoaXMuemlwLmZpbGUobmFtZSwgZGF0YSk7CiAgICB9CiAgICBmaWxlcyhmaWxlcykgewogICAgICBmaWxlcy5mb3JFYWNoKCh7IG5hbWUsIGRhdGEgfSkgPT4gewogICAgICAgIHRoaXMuemlwLmZpbGUobmFtZSwgZGF0YSk7CiAgICAgIH0pOwogICAgfQogICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1mdW5jdGlvbi1yZXR1cm4tdHlwZQogICAgYXN5bmMgdW56aXBGaWxlKHsgZGF0YSwgcGF0aCwgdHlwZSB9KSB7CiAgICAgIHZhciBfYTsKICAgICAgY29uc3QgemlwID0gYXdhaXQgSlNaaXAubG9hZEFzeW5jKGRhdGEpOwogICAgICByZXR1cm4gKF9hID0gemlwLmZpbGUocGF0aCkpID09IG51bGwgPyB2b2lkIDAgOiBfYS5hc3luYyh0eXBlKTsKICAgIH0KICAgIGFzeW5jIGdlbmVyYXRlQXN5bmMob3B0aW9ucywgb25VcGRhdGUpIHsKICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuemlwLmdlbmVyYXRlQXN5bmMoeyAuLi5vcHRpb25zLCB0eXBlOiAidWludDhhcnJheSIgfSwgb25VcGRhdGUpOwogICAgICByZXR1cm4gdHJhbnNmZXIoZGF0YSwgW2RhdGEuYnVmZmVyXSk7CiAgICB9CiAgICBnZW5lcmF0ZVN0cmVhbShvcHRpb25zLCBvblVwZGF0ZSwgb25FbmQpIHsKICAgICAgY29uc3Qgc3RyZWFtID0gdGhpcy56aXAuZ2VuZXJhdGVJbnRlcm5hbFN0cmVhbSh7IC4uLm9wdGlvbnMsIHR5cGU6ICJ1aW50OGFycmF5IiB9KTsKICAgICAgY29uc3QgemlwU3RyZWFtID0gbmV3IFJlYWRhYmxlU3RyZWFtKHsKICAgICAgICBzdGFydDogKGNvbnRyb2xsZXIpID0+IHsKICAgICAgICAgIHN0cmVhbS5vbigiZXJyb3IiLCAoZSkgPT4gewogICAgICAgICAgICBjb250cm9sbGVyLmVycm9yKGUpOwogICAgICAgICAgICBvbkVuZCA9PSBudWxsID8gdm9pZCAwIDogb25FbmQoKTsKICAgICAgICAgIH0pOwogICAgICAgICAgc3RyZWFtLm9uKCJlbmQiLCAoKSA9PiB7CiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gewogICAgICAgICAgICAgIGNvbnRyb2xsZXIuY2xvc2UoKTsKICAgICAgICAgICAgICBvbkVuZCA9PSBudWxsID8gdm9pZCAwIDogb25FbmQoKTsKICAgICAgICAgICAgfSk7CiAgICAgICAgICB9KTsKICAgICAgICAgIHN0cmVhbS5vbigiZGF0YSIsIChkYXRhLCBtZXRhRGF0YSkgPT4gewogICAgICAgICAgICBjb250cm9sbGVyLmVucXVldWUoZGF0YSk7CiAgICAgICAgICAgIG9uVXBkYXRlID09IG51bGwgPyB2b2lkIDAgOiBvblVwZGF0ZShtZXRhRGF0YSk7CiAgICAgICAgICB9KTsKICAgICAgICAgIHN0cmVhbS5yZXN1bWUoKTsKICAgICAgICB9CiAgICAgIH0pOwogICAgICByZXR1cm4gdHJhbnNmZXIoeyB6aXBTdHJlYW0gfSwgW3ppcFN0cmVhbV0pOwogICAgfQogIH0KICBleHBvc2UoRGlzcG9zYWJsZUpTWmlwKTsKfSkoKTsK";
      const decodeBase64$1 = (base64) => Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
      const blob$1 = typeof self !== "undefined" && self.Blob && new Blob([decodeBase64$1(encodedJs$1)], { type: "text/javascript;charset=utf-8" });
      function WorkerWrapper$1(options) {
        let objURL;
        try {
          objURL = blob$1 && (self.URL || self.webkitURL).createObjectURL(blob$1);
          if (!objURL) throw "";
          const worker = new Worker(objURL, {
            name: options == null ? void 0 : options.name
          });
          worker.addEventListener("error", () => {
            (self.URL || self.webkitURL).revokeObjectURL(objURL);
          });
          return worker;
        } catch (e) {
          return new Worker(
            "data:text/javascript;base64," + encodedJs$1,
            {
              name: options == null ? void 0 : options.name
            }
          );
        } finally {
          objURL && (self.URL || self.webkitURL).revokeObjectURL(objURL);
        }
      }
      const getTransferableData = (files) => files.map(({ data }) => data).filter((data) => typeof data !== "string");
      class JSZipWorkerPool {
        constructor() {
          __publicField(this, "pool", []);
          __publicField(this, "waitingQueue", []);
          __publicField(this, "unzipFile", async (params) => {
            const worker = await this.acquireWorker();
            const zip = await new worker.JSZip();
            const clean = () => {
              zip[releaseProxy]();
              this.releaseWorker(worker);
            };
            try {
              return await zip.unzipFile(transfer(params, [params.data]));
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
        async createWorker() {
          const worker = new WorkerWrapper$1();
          return wrap(worker);
        }
        waitIdleWorker() {
          return new Promise((resolve) => {
            this.waitingQueue.push(resolve);
          });
        }
        async acquireWorker() {
          let worker = this.pool.find(({ idle }) => idle);
          if (!worker) worker = await this.waitIdleWorker();
          if (!worker.JSZip) worker.JSZip = await this.createWorker();
          worker.idle = false;
          return worker;
        }
        releaseWorker(worker) {
          worker.idle = true;
          if (!this.waitingQueue.length) return;
          const emit = removeAt(this.waitingQueue, 0);
          emit(worker);
        }
        async generateAsync(files, options, onUpdate) {
          const worker = await this.acquireWorker();
          const zip = await new worker.JSZip();
          try {
            await zip.files(transfer(files, getTransferableData(files)));
            return await zip.generateAsync(
              options,
              proxy((metaData) => {
                if (metaData.currentFile) onUpdate == null ? void 0 : onUpdate({ workerId: worker.id, ...metaData });
              })
            );
          } finally {
            zip[releaseProxy]();
            this.releaseWorker(worker);
          }
        }
        async generateStream(files, options, onUpdate) {
          const worker = await this.acquireWorker();
          const zip = await new worker.JSZip();
          try {
            await zip.files(transfer(files, getTransferableData(files)));
            const { zipStream } = await zip.generateStream(
              options,
              proxy((metaData) => {
                if (metaData.currentFile) onUpdate == null ? void 0 : onUpdate({ workerId: worker.id, ...metaData });
              })
            );
            return zipStream;
          } finally {
            zip[releaseProxy]();
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
      extendPrototype(localforage);
      class DownloadHistory {
        constructor(name) {
          __publicField(this, "store");
          __publicField(this, "ready");
          this.name = name;
          this.store = localforage.createInstance({
            name: "nhentai_helper",
            storeName: name
          });
          this.ready = this.store.ready().then(() => true).catch((e) => {
            logger.error(e);
            return false;
          });
        }
        async add(key) {
          if (!await this.ready) return;
          try {
            await this.store.setItem(key, true);
            logger.log(`mark "${key}" as downloaded`);
          } catch (e) {
            logger.error(e);
          }
        }
        async del(key) {
          if (!await this.ready) return;
          try {
            await this.store.removeItem(key);
            logger.log(`unmark "${key}" as downloaded`);
          } catch (e) {
            logger.error(e);
          }
        }
        async has(key) {
          if (!await this.ready) return false;
          try {
            return await this.store.getItem(key) === true;
          } catch (e) {
            logger.error(e);
          }
          return false;
        }
        async size() {
          if (!await this.ready) return NaN;
          return this.store.length();
        }
        async import(keys2) {
          if (!await this.ready) throw new Error(`store ${this.name} cannot ready`);
          try {
            await this.store.setItems(keys2.map((gid2) => ({ key: gid2, value: true })));
          } catch (e) {
            logger.error(e);
          }
        }
        async export() {
          if (!await this.ready) throw new Error(`store ${this.name} cannot ready`);
          return this.store.keys();
        }
        async clear() {
          if (!await this.ready) return;
          await this.store.clear();
        }
      }
      const gidHistory = new DownloadHistory("dl_history_gid");
      const enTitleHistory = new DownloadHistory("dl_history_en");
      const jpTitleHistory = new DownloadHistory("dl_history");
      const prettyTitleHistory = new DownloadHistory("dl_history_pretty");
      const normalizeTitle = (title) => title.replace(/\s/g, "");
      const getTitleMd5 = (title) => md5(normalizeTitle(title));
      const markAsDownloaded = (gid2, { english: english2, japanese: japanese2, pretty } = {}) => {
        void gidHistory.add(String(gid2));
        if (english2) void enTitleHistory.add(getTitleMd5(english2));
        if (japanese2) void jpTitleHistory.add(getTitleMd5(japanese2));
        if (pretty) void prettyTitleHistory.add(getTitleMd5(pretty));
      };
      const unmarkAsDownloaded = (gid2, { english: english2, japanese: japanese2, pretty } = {}) => {
        void gidHistory.del(String(gid2));
        if (english2) void enTitleHistory.del(getTitleMd5(english2));
        if (japanese2) void jpTitleHistory.del(getTitleMd5(japanese2));
        if (pretty) void prettyTitleHistory.del(getTitleMd5(pretty));
      };
      const isDownloadedByGid = (gid2) => gidHistory.has(String(gid2));
      const isDownloadedByTitle = async ({
        english: english2,
        japanese: japanese2,
        pretty
      } = {}) => {
        if (settings.judgeDownloadedByJapanese && japanese2) {
          const md5v2 = getTitleMd5(japanese2);
          if (await jpTitleHistory.has(md5v2)) return true;
          const md5v1 = md5(japanese2);
          if (await jpTitleHistory.has(md5v1)) {
            void jpTitleHistory.add(md5v2);
            void jpTitleHistory.del(md5v1);
            return true;
          }
        }
        if (settings.judgeDownloadedByEnglish && english2 && await enTitleHistory.has(getTitleMd5(english2))) {
          return true;
        }
        if (settings.judgeDownloadedByPretty && pretty && await enTitleHistory.has(getTitleMd5(pretty))) {
          return true;
        }
        return false;
      };
      const getDownloadNumber = () => gidHistory.size();
      const EXPORT_HEADER_GID = "gid:";
      const EXPORT_HEADER_TITLE_JP = "title:";
      const EXPORT_HEADER_TITLE_EN = "title_en:";
      const EXPORT_HEADER_TITLE_PRETTY = "title_pretty:";
      const EXPORT_SEPARATOR = ",";
      const EXPORT_TEXT_FILENAME = "history.txt";
      const exportDownloadHistory = async () => {
        try {
          const gids = await gidHistory.export();
          const jpTitles = await jpTitleHistory.export();
          const enTitles = await enTitleHistory.export();
          const prettyTitles = await prettyTitleHistory.export();
          const text = `${EXPORT_HEADER_GID}${gids.join(EXPORT_SEPARATOR)}
${EXPORT_HEADER_TITLE_JP}${jpTitles.join(EXPORT_SEPARATOR)}
${EXPORT_HEADER_TITLE_EN}${enTitles.join(EXPORT_SEPARATOR)}
${EXPORT_HEADER_TITLE_PRETTY}${prettyTitles.join(EXPORT_SEPARATOR)}`;
          const zip = new JSZip();
          zip.file(EXPORT_TEXT_FILENAME, text);
          const data = await zip.generateAsync({
            compression: "DEFLATE",
            compressionOptions: { level: 9 }
          });
          const timeStr = dateTimeFormatter.format(Date.now()).replace(/[^\d]/g, "");
          const filename = `nhentai-helper-download-history-${timeStr}.zip`;
          FileSaver_minExports.saveAs(new File([data], filename, { type: "application/zip" }));
          logger.log("export download history", filename);
          return true;
        } catch (error) {
          logger.error(error);
        }
        return false;
      };
      const importDownloadHistory = async (data) => {
        try {
          const str = await JSZip.unzipFile({ data, path: EXPORT_TEXT_FILENAME, type: "string" });
          if (!str) {
            logger.error("zip doesn't contain file", EXPORT_TEXT_FILENAME);
            return false;
          }
          const lines = str.split("\n");
          for (const line of lines) {
            if (line.startsWith(EXPORT_HEADER_GID)) {
              const gids = line.replace(EXPORT_HEADER_GID, "").split(EXPORT_SEPARATOR);
              await gidHistory.import(gids);
            } else if (line.startsWith(EXPORT_HEADER_TITLE_JP)) {
              const titles = line.replace(EXPORT_HEADER_TITLE_JP, "").split(EXPORT_SEPARATOR);
              await jpTitleHistory.import(titles);
            } else if (line.startsWith(EXPORT_HEADER_TITLE_EN)) {
              const titles = line.replace(EXPORT_HEADER_TITLE_EN, "").split(EXPORT_SEPARATOR);
              await enTitleHistory.import(titles);
            } else if (line.startsWith(EXPORT_HEADER_TITLE_PRETTY)) {
              const titles = line.replace(EXPORT_HEADER_TITLE_PRETTY, "").split(EXPORT_SEPARATOR);
              await prettyTitleHistory.import(titles);
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
          await gidHistory.clear();
          await enTitleHistory.clear();
          await jpTitleHistory.clear();
          await prettyTitleHistory.clear();
          return true;
        } catch (error) {
          logger.error(error);
        }
        return false;
      };
      const isSameTitleString = (title1, title2) => !!title1 && !!title2 && normalizeTitle(title1) === normalizeTitle(title2);
      const isSameTitle = (title1, title2) => {
        if (settings.judgeDownloadedByJapanese && isSameTitleString(title1.japanese, title2.japanese)) {
          return true;
        }
        if (settings.judgeDownloadedByEnglish && isSameTitleString(title1.english, title2.english)) {
          return true;
        }
        if (settings.judgeDownloadedByPretty && isSameTitleString(title1.pretty, title2.pretty)) {
          return true;
        }
        return false;
      };
      var core = {};
      (function(exports2) {
        Object.defineProperty(exports2, "__esModule", { value: true });
        exports2.h = exports2._render = exports2.hydrate = exports2.render = exports2.appendChildren = exports2.strToHash = exports2.removeAllChildNodes = exports2.tick = exports2.isSSR = void 0;
        const isSSR = () => typeof _nano !== "undefined" && _nano.isSSR === true;
        exports2.isSSR = isSSR;
        exports2.tick = Promise.prototype.then.bind(Promise.resolve());
        const removeAllChildNodes = (parent) => {
          while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
          }
        };
        exports2.removeAllChildNodes = removeAllChildNodes;
        const strToHash = (s) => {
          let hash = 0;
          for (let i = 0; i < s.length; i++) {
            const chr = s.charCodeAt(i);
            hash = (hash << 5) - hash + chr;
            hash |= 0;
          }
          return Math.abs(hash).toString(32);
        };
        exports2.strToHash = strToHash;
        const appendChildren = (element, children, escape2 = true) => {
          if (!Array.isArray(children)) {
            (0, exports2.appendChildren)(element, [children], escape2);
            return;
          }
          if (typeof children === "object")
            children = Array.prototype.slice.call(children);
          children.forEach((child) => {
            if (Array.isArray(child))
              (0, exports2.appendChildren)(element, child, escape2);
            else {
              const c = (0, exports2._render)(child);
              if (typeof c !== "undefined") {
                if (Array.isArray(c))
                  (0, exports2.appendChildren)(element, c, escape2);
                else {
                  if ((0, exports2.isSSR)() && !escape2)
                    element.appendChild(c.nodeType == null ? c.toString() : c);
                  else
                    element.appendChild(c.nodeType == null ? document.createTextNode(c.toString()) : c);
                }
              }
            }
          });
        };
        exports2.appendChildren = appendChildren;
        const SVG = (props) => {
          const child = props.children[0];
          const attrs = child.attributes;
          if ((0, exports2.isSSR)())
            return child;
          const svg = hNS("svg");
          for (let i = attrs.length - 1; i >= 0; i--) {
            svg.setAttribute(attrs[i].name, attrs[i].value);
          }
          svg.innerHTML = child.innerHTML;
          return svg;
        };
        const render2 = (component, parent = null, removeChildNodes = true) => {
          let el = (0, exports2._render)(component);
          if (Array.isArray(el)) {
            el = el.map((e) => (0, exports2._render)(e));
            if (el.length === 1)
              el = el[0];
          }
          if (parent) {
            if (removeChildNodes)
              (0, exports2.removeAllChildNodes)(parent);
            if (el && parent.id && parent.id === el.id && parent.parentElement) {
              parent.parentElement.replaceChild(el, parent);
            } else {
              if (Array.isArray(el))
                el.forEach((e) => {
                  (0, exports2.appendChildren)(parent, (0, exports2._render)(e));
                });
              else
                (0, exports2.appendChildren)(parent, (0, exports2._render)(el));
            }
            return parent;
          } else {
            if ((0, exports2.isSSR)() && !Array.isArray(el))
              return [el];
            return el;
          }
        };
        exports2.render = render2;
        exports2.hydrate = exports2.render;
        const _render = (comp) => {
          if (comp === null || comp === false || typeof comp === "undefined")
            return [];
          if (typeof comp === "string" || typeof comp === "number")
            return comp.toString();
          if (comp.tagName && comp.tagName.toLowerCase() === "svg")
            return SVG({ children: [comp] });
          if (comp.tagName)
            return comp;
          if (comp && comp.nodeType === 3)
            return comp;
          if (comp && comp.component && comp.component.isClass)
            return renderClassComponent(comp);
          if (comp.isClass)
            return renderClassComponent({ component: comp, props: {} });
          if (comp.component && typeof comp.component === "function")
            return renderFunctionalComponent(comp);
          if (Array.isArray(comp))
            return comp.map((c) => (0, exports2._render)(c)).flat();
          if (typeof comp === "function" && !comp.isClass)
            return (0, exports2._render)(comp());
          if (comp.component && comp.component.tagName && typeof comp.component.tagName === "string")
            return (0, exports2._render)(comp.component);
          if (Array.isArray(comp.component))
            return (0, exports2._render)(comp.component);
          if (comp.component)
            return (0, exports2._render)(comp.component);
          if (typeof comp === "object")
            return [];
          console.warn("Something unexpected happened with:", comp);
        };
        exports2._render = _render;
        const renderFunctionalComponent = (fncComp) => {
          const { component, props } = fncComp;
          return (0, exports2._render)(component(props));
        };
        const renderClassComponent = (classComp) => {
          const { component, props } = classComp;
          const hash = (0, exports2.strToHash)(component.toString());
          component.prototype._getHash = () => hash;
          const Component = new component(props);
          if (!(0, exports2.isSSR)())
            Component.willMount();
          let el = Component.render();
          el = (0, exports2._render)(el);
          Component.elements = el;
          if (props && props.ref)
            props.ref(Component);
          if (!(0, exports2.isSSR)())
            (0, exports2.tick)(() => {
              Component._didMount();
            });
          return el;
        };
        const hNS = (tag) => document.createElementNS("http://www.w3.org/2000/svg", tag);
        const h2 = (tagNameOrComponent, props = {}, ...children) => {
          if (props && props.children) {
            if (Array.isArray(children)) {
              if (Array.isArray(props.children))
                children = [...props.children, ...children];
              else
                children.push(props.children);
            } else {
              if (Array.isArray(props.children))
                children = props.children;
              else
                children = [props.children];
            }
          }
          if ((0, exports2.isSSR)() && _nano.ssrTricks.isWebComponent(tagNameOrComponent)) {
            const element2 = _nano.ssrTricks.renderWebComponent(tagNameOrComponent, props, children, exports2._render);
            if (element2 === null)
              return `ERROR: "<${tagNameOrComponent} />"`;
            else
              return element2;
          }
          if (typeof tagNameOrComponent !== "string")
            return { component: tagNameOrComponent, props: Object.assign(Object.assign({}, props), { children }) };
          try {
            if ((0, exports2.isSSR)() && typeof tagNameOrComponent === "string" && !document)
              throw new Error("document is not defined");
          } catch (err) {
            console.log("ERROR:", err.message, "\n > Please read: https://github.com/nanojsx/nano/issues/106");
          }
          let ref2;
          const element = tagNameOrComponent === "svg" ? hNS("svg") : document.createElement(tagNameOrComponent);
          const isEvent = (el, p) => {
            if (0 !== p.indexOf("on"))
              return false;
            if (el._ssr)
              return true;
            return typeof el[p] === "object" || typeof el[p] === "function";
          };
          for (const p in props) {
            if (p === "style" && typeof props[p] === "object") {
              const styles = Object.keys(props[p]).map((k) => `${k}:${props[p][k]}`).join(";").replace(/[A-Z]/g, (match2) => `-${match2.toLowerCase()}`);
              props[p] = `${styles};`;
            }
            if (p === "ref")
              ref2 = props[p];
            else if (isEvent(element, p.toLowerCase()))
              element.addEventListener(p.toLowerCase().substring(2), (e) => props[p](e));
            else if (p === "dangerouslySetInnerHTML" && props[p].__html) {
              if (!(0, exports2.isSSR)()) {
                const fragment = document.createElement("fragment");
                fragment.innerHTML = props[p].__html;
                element.appendChild(fragment);
              } else {
                element.innerHTML = props[p].__html;
              }
            } else if (p === "innerHTML" && props[p].__dangerousHtml) {
              if (!(0, exports2.isSSR)()) {
                const fragment = document.createElement("fragment");
                fragment.innerHTML = props[p].__dangerousHtml;
                element.appendChild(fragment);
              } else {
                element.innerHTML = props[p].__dangerousHtml;
              }
            } else if (/^className$/i.test(p))
              element.setAttribute("class", props[p]);
            else if (typeof props[p] !== "undefined")
              element.setAttribute(p, props[p]);
          }
          const escape2 = !["noscript", "script", "style"].includes(tagNameOrComponent);
          (0, exports2.appendChildren)(element, children, escape2);
          if (ref2)
            ref2(element);
          return element;
        };
        exports2.h = h2;
      })(core);
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
        const input = /* @__PURE__ */ core.h(
          "input",
          {
            type: "file",
            accept,
            onChange: () => {
              var _a;
              resolve((_a = input.files) == null ? void 0 : _a[0]);
            }
          }
        );
        input.click();
      });
      const pickAndReadFile = async (accept) => {
        const file = await pickFile(accept);
        if (file) return readFile(file);
      };
      const showMessage = (params) => elementPlus.ElMessage({ ...params, appendTo: _monkeyWindow.document.body });
      const _hoisted_1$2 = { class: "nhentai-helper-setting-help-buttons no-sl" };
      const _hoisted_2$1 = ["id"];
      const _hoisted_3$1 = { id: "nhentai-helper-setting-dialog" };
      const _hoisted_4$1 = {
        class: "asterisk-example no-sl",
        style: { "margin-bottom": "18px" }
      };
      const _hoisted_5$1 = { class: "inline-item" };
      const _hoisted_6$1 = { class: "inline-item__name" };
      const _hoisted_7$1 = { class: "inline-item" };
      const _hoisted_8 = { class: "inline-item__name" };
      const _hoisted_9 = { style: { "color": "var(--el-text-color-regular)", "font-size": "var(--el-form-label-font-size)" } };
      const _hoisted_10 = {
        key: 0,
        class: "no-sl"
      };
      const _hoisted_11 = {
        key: 0,
        class: "no-sl"
      };
      const _hoisted_12 = { class: "monospace" };
      const _hoisted_13 = { class: "no-sl" };
      const _hoisted_14 = { class: "no-sl" };
      const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
        __name: "SettingsDialog",
        setup(__props, { expose: __expose }) {
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
          const { t: t2, n, locale } = useI18n();
          const show = vue.ref(false);
          const downloadedNum = vue.ref(NaN);
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
            downloadedNum.value = await getDownloadNumber();
          };
          const open2 = () => {
            show.value = true;
            refreshDownloadNum();
          };
          const openHelp = () => {
            _GM_openInTab(
              locale.value === "zh" ? "https://github.com/Tsuk1ko/nhentai-helper/blob/master/README-ZH.md#%E8%AE%BE%E7%BD%AE" : "https://github.com/Tsuk1ko/nhentai-helper/blob/master/README.md#settings",
              { active: true, setParent: true }
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
            if (!data) return;
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
          const addTitleReplacement = () => {
            writeableSettings.titleReplacement.push({ from: "", to: "", regexp: false });
          };
          const delTitleReplacement = (index) => {
            writeableSettings.titleReplacement.splice(index, 1);
          };
          vue.watch(
            () => writeableSettings.language,
            (val) => {
              locale.value = val;
            }
          );
          __expose({ open: open2 });
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createBlock(vue.unref(elementPlus.ElDialog), {
              id: "nhentai-helper-setting-dialog-outside",
              modelValue: show.value,
              "onUpdate:modelValue": _cache[29] || (_cache[29] = ($event) => show.value = $event),
              center: true,
              top: "50px"
            }, {
              header: vue.withCtx(({ titleId, titleClass }) => [
                vue.createElementVNode("div", _hoisted_1$2, [
                  vue.createVNode(vue.unref(elementPlus.ElButton), {
                    size: "small",
                    onClick: openHelp
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(vue.toDisplayString(vue.unref(t2)("setting.helpButton")), 1)
                    ]),
                    _: 1
                  })
                ]),
                vue.createElementVNode("span", {
                  id: titleId,
                  class: vue.normalizeClass([titleClass, "no-sl"])
                }, vue.toDisplayString(vue.unref(t2)("setting.title")), 11, _hoisted_2$1)
              ]),
              default: vue.withCtx(() => [
                vue.createElementVNode("div", _hoisted_3$1, [
                  vue.createElementVNode("div", _hoisted_4$1, vue.toDisplayString(vue.unref(t2)("setting.asteriskTip")), 1),
                  vue.createVNode(vue.unref(elementPlus.ElForm), {
                    "label-width": "auto",
                    "label-position": "left"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(vue.unref(elementPlus.ElFormItem), { label: "Language" }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(elementPlus.ElSelect), {
                            modelValue: vue.unref(writeableSettings).language,
                            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.unref(writeableSettings).language = $event)
                          }, {
                            default: vue.withCtx(() => [
                              vue.createVNode(vue.unref(elementPlus.ElOption), {
                                label: "English",
                                value: "en"
                              }),
                              vue.createVNode(vue.unref(elementPlus.ElOption), {
                                label: "中文",
                                value: "zh"
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue"])
                        ]),
                        _: 1
                      }),
                      vue.createVNode(vue.unref(elementPlus.ElFormItem), {
                        class: "m-b-32",
                        label: vue.unref(t2)("setting.downloadThread")
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(elementPlus.ElSlider), {
                            modelValue: vue.unref(writeableSettings).threadNum,
                            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vue.unref(writeableSettings).threadNum = $event),
                            min: 1,
                            max: 32,
                            marks: threadNumMarks
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      vue.createVNode(vue.unref(elementPlus.ElFormItem), {
                        class: "refresh-required",
                        label: vue.unref(t2)("setting.openOnNewTab")
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(elementPlus.ElSwitch), {
                            modelValue: vue.unref(writeableSettings).openOnNewTab,
                            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => vue.unref(writeableSettings).openOnNewTab = $event)
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      vue.createVNode(vue.unref(elementPlus.ElFormItem), {
                        label: vue.unref(t2)("setting.compressionFilename")
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(elementPlus.ElInput), {
                            modelValue: vue.unref(writeableSettings).compressionFilename,
                            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => vue.unref(writeableSettings).compressionFilename = $event),
                            placeholder: vue.unref(settingDefinitions).compressionFilename.default,
                            onBlur: _cache[4] || (_cache[4] = ($event) => {
                              if (!vue.unref(writeableSettings).compressionFilename) {
                                vue.unref(writeableSettings).compressionFilename = vue.unref(settingDefinitions).compressionFilename.default;
                              }
                            })
                          }, null, 8, ["modelValue", "placeholder"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      vue.createVNode(vue.unref(elementPlus.ElFormItem), { label: "└ {{artist}}" }, {
                        default: vue.withCtx(() => [
                          vue.createElementVNode("div", _hoisted_5$1, [
                            vue.createElementVNode("span", _hoisted_6$1, vue.toDisplayString(vue.unref(t2)("setting.maxNumber")), 1),
                            vue.createVNode(vue.unref(elementPlus.ElInputNumber), {
                              modelValue: vue.unref(writeableSettings).filenameMaxArtistsNumber,
                              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => vue.unref(writeableSettings).filenameMaxArtistsNumber = $event),
                              size: "small",
                              min: 0,
                              "value-on-clear": vue.unref(settingDefinitions).filenameMaxArtistsNumber.default,
                              "step-strictly": true,
                              style: { width: "90px" }
                            }, null, 8, ["modelValue", "value-on-clear"])
                          ]),
                          vue.createElementVNode("div", _hoisted_7$1, [
                            vue.createElementVNode("span", _hoisted_8, vue.toDisplayString(vue.unref(t2)("setting.separator")), 1),
                            vue.createVNode(vue.unref(elementPlus.ElInput), {
                              modelValue: vue.unref(writeableSettings).filenameArtistsSeparator,
                              "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => vue.unref(writeableSettings).filenameArtistsSeparator = $event),
                              size: "small",
                              placeholder: vue.unref(settingDefinitions).filenameArtistsSeparator.default,
                              style: { width: "50px" }
                            }, null, 8, ["modelValue", "placeholder"])
                          ])
                        ]),
                        _: 1
                      }),
                      vue.createVNode(vue.unref(elementPlus.ElFormItem), {
                        class: "m-b-32",
                        label: vue.unref(t2)("setting.compressionLevel")
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(elementPlus.ElSlider), {
                            modelValue: vue.unref(writeableSettings).compressionLevel,
                            "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => vue.unref(writeableSettings).compressionLevel = $event),
                            min: 0,
                            max: 9,
                            marks: compressionLevelMarks
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      vue.createVNode(vue.unref(elementPlus.ElFormItem), {
                        label: vue.unref(t2)("setting.filenameLength")
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(elementPlus.ElInputNumber), {
                            modelValue: filenameLengthNumber.value,
                            "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => filenameLengthNumber.value = $event),
                            min: 0,
                            "value-on-clear": vue.unref(settingDefinitions).filenameLength.default,
                            "step-strictly": true,
                            disabled: vue.unref(writeableSettings).filenameLength === "auto"
                          }, null, 8, ["modelValue", "value-on-clear", "disabled"]),
                          vue.createVNode(vue.unref(elementPlus.ElCheckbox), {
                            modelValue: filenameLengthAuto.value,
                            "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => filenameLengthAuto.value = $event),
                            class: "m-l-16",
                            label: vue.unref(t2)("common.auto")
                          }, null, 8, ["modelValue", "label"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      vue.createVNode(vue.unref(elementPlus.ElFormItem), {
                        label: vue.unref(t2)("setting.convertWebpTo")
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(elementPlus.ElRadioGroup), {
                            modelValue: vue.unref(writeableSettings).convertWebpTo,
                            "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => vue.unref(writeableSettings).convertWebpTo = $event)
                          }, {
                            default: vue.withCtx(() => [
                              vue.createVNode(vue.unref(elementPlus.ElRadio), { value: "" }, {
                                default: vue.withCtx(() => [
                                  vue.createTextVNode(vue.toDisplayString(vue.unref(t2)("common.disabled")), 1)
                                ]),
                                _: 1
                              }),
                              vue.createVNode(vue.unref(elementPlus.ElRadio), {
                                value: vue.unref(MIME).JPG
                              }, {
                                default: vue.withCtx(() => _cache[30] || (_cache[30] = [
                                  vue.createTextVNode("jpg")
                                ])),
                                _: 1
                              }, 8, ["value"]),
                              vue.createVNode(vue.unref(elementPlus.ElRadio), {
                                value: vue.unref(MIME).PNG
                              }, {
                                default: vue.withCtx(() => _cache[31] || (_cache[31] = [
                                  vue.createTextVNode("png")
                                ])),
                                _: 1
                              }, 8, ["value"])
                            ]),
                            _: 1
                          }, 8, ["modelValue"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      vue.unref(writeableSettings).convertWebpTo === vue.unref(MIME).JPG ? (vue.openBlock(), vue.createBlock(vue.unref(elementPlus.ElFormItem), {
                        key: 0,
                        label: `└ ${vue.unref(t2)("setting.convertWebpQuality")} (0~100)`
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(elementPlus.ElInputNumber), {
                            modelValue: vue.unref(writeableSettings).convertWebpQuality,
                            "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => vue.unref(writeableSettings).convertWebpQuality = $event),
                            size: "small",
                            min: 0,
                            max: 100,
                            "value-on-clear": vue.unref(settingDefinitions).convertWebpQuality.default,
                            "step-strictly": true
                          }, null, 8, ["modelValue", "value-on-clear"])
                        ]),
                        _: 1
                      }, 8, ["label"])) : vue.createCommentVNode("", true),
                      vue.createVNode(vue.unref(elementPlus.ElFormItem), {
                        label: vue.unref(t2)("setting.autoCancelDownloadedManga")
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(elementPlus.ElSwitch), {
                            modelValue: vue.unref(writeableSettings).autoCancelDownloadedManga,
                            "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => vue.unref(writeableSettings).autoCancelDownloadedManga = $event)
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      vue.createVNode(vue.unref(elementPlus.ElFormItem), {
                        label: vue.unref(t2)("setting.autoRetryWhenErrorOccurs")
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(elementPlus.ElSwitch), {
                            modelValue: vue.unref(writeableSettings).autoRetryWhenErrorOccurs,
                            "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => vue.unref(writeableSettings).autoRetryWhenErrorOccurs = $event)
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      vue.createVNode(vue.unref(elementPlus.ElFormItem), {
                        label: vue.unref(t2)("setting.autoShowAll")
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(elementPlus.ElSwitch), {
                            modelValue: vue.unref(writeableSettings).autoShowAll,
                            "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => vue.unref(writeableSettings).autoShowAll = $event)
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      vue.createVNode(vue.unref(elementPlus.ElFormItem), {
                        class: "refresh-required",
                        label: vue.unref(t2)("setting.showIgnoreButton")
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(elementPlus.ElSwitch), {
                            modelValue: vue.unref(writeableSettings).showIgnoreButton,
                            "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => vue.unref(writeableSettings).showIgnoreButton = $event)
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      vue.createVNode(vue.unref(elementPlus.ElFormItem), {
                        label: vue.unref(t2)("setting.galleryContextmenuPreview")
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(elementPlus.ElSwitch), {
                            modelValue: vue.unref(writeableSettings).galleryContextmenuPreview,
                            "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => vue.unref(writeableSettings).galleryContextmenuPreview = $event)
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      vue.createVNode(vue.unref(elementPlus.ElFormItem), {
                        label: vue.unref(t2)("setting.judgeDownloadedMangaByTitle")
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(elementPlus.ElCheckbox), {
                            modelValue: vue.unref(writeableSettings).judgeDownloadedByEnglish,
                            "onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => vue.unref(writeableSettings).judgeDownloadedByEnglish = $event),
                            label: vue.unref(t2)("common.english")
                          }, null, 8, ["modelValue", "label"]),
                          vue.createVNode(vue.unref(elementPlus.ElCheckbox), {
                            modelValue: vue.unref(writeableSettings).judgeDownloadedByJapanese,
                            "onUpdate:modelValue": _cache[18] || (_cache[18] = ($event) => vue.unref(writeableSettings).judgeDownloadedByJapanese = $event),
                            label: vue.unref(t2)("common.japanese")
                          }, null, 8, ["modelValue", "label"]),
                          vue.createVNode(vue.unref(elementPlus.ElCheckbox), {
                            modelValue: vue.unref(writeableSettings).judgeDownloadedByPretty,
                            "onUpdate:modelValue": _cache[19] || (_cache[19] = ($event) => vue.unref(writeableSettings).judgeDownloadedByPretty = $event),
                            label: vue.unref(t2)("common.pretty")
                          }, null, 8, ["modelValue", "label"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      vue.createVNode(vue.unref(elementPlus.ElFormItem), {
                        label: vue.unref(t2)("setting.addMetaFile")
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(elementPlus.ElCheckboxGroup), {
                            modelValue: vue.unref(writeableSettings).addMetaFile,
                            "onUpdate:modelValue": _cache[20] || (_cache[20] = ($event) => vue.unref(writeableSettings).addMetaFile = $event)
                          }, {
                            default: vue.withCtx(() => [
                              vue.createVNode(vue.unref(elementPlus.ElCheckbox), {
                                label: "ComicInfo.xml",
                                value: "ComicInfoXml"
                              }),
                              vue.createVNode(vue.unref(elementPlus.ElCheckbox), {
                                label: "info.json (eze)",
                                value: "EzeInfoJson"
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      vue.unref(writeableSettings).addMetaFile.includes("ComicInfoXml") ? (vue.openBlock(), vue.createBlock(vue.unref(elementPlus.ElFormItem), {
                        key: 1,
                        label: `└ ${vue.unref(t2)("setting.metaFileTitleLanguage")}`
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(elementPlus.ElSelect), {
                            modelValue: vue.unref(writeableSettings).metaFileTitleLanguage,
                            "onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => vue.unref(writeableSettings).metaFileTitleLanguage = $event)
                          }, {
                            default: vue.withCtx(() => [
                              vue.createVNode(vue.unref(elementPlus.ElOption), {
                                label: vue.unref(t2)("common.english"),
                                value: "english"
                              }, null, 8, ["label"]),
                              vue.createVNode(vue.unref(elementPlus.ElOption), {
                                label: vue.unref(t2)("common.japanese"),
                                value: "japanese"
                              }, null, 8, ["label"])
                            ]),
                            _: 1
                          }, 8, ["modelValue"])
                        ]),
                        _: 1
                      }, 8, ["label"])) : vue.createCommentVNode("", true),
                      vue.createVNode(vue.unref(elementPlus.ElDivider), null, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode(vue.toDisplayString(vue.unref(t2)("setting.advanceTitle")), 1)
                        ]),
                        _: 1
                      }),
                      vue.unref(IS_NHENTAI) ? (vue.openBlock(), vue.createBlock(vue.unref(elementPlus.ElFormItem), {
                        key: 2,
                        label: vue.unref(t2)("setting.nHentaiDownloadHost")
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(elementPlus.ElSelect), {
                            modelValue: vue.unref(writeableSettings).nHentaiDownloadHost,
                            "onUpdate:modelValue": _cache[22] || (_cache[22] = ($event) => vue.unref(writeableSettings).nHentaiDownloadHost = $event),
                            disabled: !!vue.unref(writeableSettings).customDownloadUrl
                          }, {
                            default: vue.withCtx(() => [
                              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(nHentaiDownloadHosts), (host) => {
                                return vue.openBlock(), vue.createBlock(vue.unref(elementPlus.ElOption), {
                                  key: host,
                                  label: host,
                                  value: host
                                }, null, 8, ["label", "value"]);
                              }), 128)),
                              vue.createVNode(vue.unref(elementPlus.ElOption), {
                                label: vue.unref(t2)("common.random"),
                                value: "random"
                              }, null, 8, ["label"]),
                              vue.createVNode(vue.unref(elementPlus.ElOption), {
                                label: vue.unref(t2)("common.balance"),
                                value: "balance"
                              }, null, 8, ["label"])
                            ]),
                            _: 1
                          }, 8, ["modelValue", "disabled"])
                        ]),
                        _: 1
                      }, 8, ["label"])) : vue.createCommentVNode("", true),
                      vue.createVNode(vue.unref(elementPlus.ElFormItem), {
                        label: vue.unref(t2)("setting.customDownloadUrl")
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(elementPlus.ElInput), {
                            modelValue: vue.unref(writeableSettings).customDownloadUrl,
                            "onUpdate:modelValue": _cache[23] || (_cache[23] = ($event) => vue.unref(writeableSettings).customDownloadUrl = $event)
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      vue.createVNode(vue.unref(elementPlus.ElFormItem), {
                        label: vue.unref(t2)("setting.compressionStreamFiles")
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(elementPlus.ElSwitch), {
                            modelValue: vue.unref(writeableSettings).compressionStreamFiles,
                            "onUpdate:modelValue": _cache[24] || (_cache[24] = ($event) => vue.unref(writeableSettings).compressionStreamFiles = $event)
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      vue.createVNode(vue.unref(elementPlus.ElFormItem), {
                        label: vue.unref(t2)("setting.seriesMode")
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(elementPlus.ElSwitch), {
                            modelValue: vue.unref(writeableSettings).seriesMode,
                            "onUpdate:modelValue": _cache[25] || (_cache[25] = ($event) => vue.unref(writeableSettings).seriesMode = $event)
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      vue.createVNode(vue.unref(elementPlus.ElFormItem), {
                        label: vue.unref(t2)("setting.streamDownload")
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(elementPlus.ElSwitch), {
                            modelValue: vue.unref(writeableSettings).streamDownload,
                            "onUpdate:modelValue": _cache[26] || (_cache[26] = ($event) => vue.unref(writeableSettings).streamDownload = $event),
                            disabled: vue.unref(DISABLE_STREAM_DOWNLOAD)
                          }, null, 8, ["modelValue", "disabled"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      vue.unref(IS_NHENTAI) ? (vue.openBlock(), vue.createBlock(vue.unref(elementPlus.ElFormItem), {
                        key: 3,
                        class: "refresh-required",
                        label: vue.unref(t2)("setting.preventConsoleClearing")
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(elementPlus.ElSwitch), {
                            modelValue: vue.unref(writeableSettings).preventConsoleClearing,
                            "onUpdate:modelValue": _cache[27] || (_cache[27] = ($event) => vue.unref(writeableSettings).preventConsoleClearing = $event)
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      }, 8, ["label"])) : vue.createCommentVNode("", true),
                      vue.createVNode(vue.unref(elementPlus.ElCollapse), null, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(elementPlus.ElCollapseItem), null, {
                            title: vue.withCtx(() => [
                              vue.createElementVNode("span", _hoisted_9, vue.toDisplayString(vue.unref(t2)("setting.titleReplacement")), 1)
                            ]),
                            default: vue.withCtx(() => [
                              vue.createVNode(vue.unref(elementPlus.ElTable), {
                                id: "title-replacement-table",
                                data: vue.unref(writeableSettings).titleReplacement
                              }, {
                                append: vue.withCtx(() => [
                                  vue.createVNode(vue.unref(elementPlus.ElButton), {
                                    text: "",
                                    style: { "width": "100%" },
                                    onClick: addTitleReplacement
                                  }, {
                                    default: vue.withCtx(() => _cache[32] || (_cache[32] = [
                                      vue.createTextVNode("+")
                                    ])),
                                    _: 1
                                  })
                                ]),
                                default: vue.withCtx(() => [
                                  vue.createVNode(vue.unref(elementPlus.ElTableColumn), { label: "From" }, {
                                    default: vue.withCtx((scope) => [
                                      vue.createVNode(vue.unref(elementPlus.ElInput), {
                                        modelValue: scope.row.from,
                                        "onUpdate:modelValue": ($event) => scope.row.from = $event
                                      }, {
                                        prefix: vue.withCtx(() => [
                                          scope.row.regexp ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_10, "/")) : vue.createCommentVNode("", true)
                                        ]),
                                        suffix: vue.withCtx(() => [
                                          scope.row.regexp ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_11, "/")) : vue.createCommentVNode("", true)
                                        ]),
                                        _: 2
                                      }, 1032, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  vue.createVNode(vue.unref(elementPlus.ElTableColumn), { label: "To" }, {
                                    default: vue.withCtx((scope) => [
                                      vue.createVNode(vue.unref(elementPlus.ElInput), {
                                        modelValue: scope.row.to,
                                        "onUpdate:modelValue": ($event) => scope.row.to = $event
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  vue.createVNode(vue.unref(elementPlus.ElTableColumn), {
                                    label: "RegExp",
                                    width: "80"
                                  }, {
                                    default: vue.withCtx((scope) => [
                                      vue.createVNode(vue.unref(elementPlus.ElSwitch), {
                                        modelValue: scope.row.regexp,
                                        "onUpdate:modelValue": ($event) => scope.row.regexp = $event
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  vue.createVNode(vue.unref(elementPlus.ElTableColumn), { width: "70" }, {
                                    default: vue.withCtx((scope) => [
                                      vue.createVNode(_sfc_main$3, {
                                        onConfirm: () => delTitleReplacement(scope.$index)
                                      }, {
                                        default: vue.withCtx(() => [
                                          vue.createVNode(vue.unref(elementPlus.ElButton), {
                                            type: "danger",
                                            icon: vue.unref(delete_default)
                                          }, null, 8, ["icon"])
                                        ]),
                                        _: 2
                                      }, 1032, ["onConfirm"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["data"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      vue.createVNode(vue.unref(elementPlus.ElFormItem), {
                        label: vue.unref(t2)("setting.customFilenameFunction")
                      }, {
                        default: vue.withCtx(() => [
                          vue.createElementVNode("span", _hoisted_12, [
                            _cache[36] || (_cache[36] = vue.createTextVNode("function (filename")),
                            vue.createVNode(vue.unref(elementPlus.ElText), { type: "info" }, {
                              default: vue.withCtx(() => _cache[33] || (_cache[33] = [
                                vue.createTextVNode(": string")
                              ])),
                              _: 1
                            }),
                            _cache[37] || (_cache[37] = vue.createTextVNode(", gallery")),
                            vue.createVNode(vue.unref(elementPlus.ElText), { type: "info" }, {
                              default: vue.withCtx(() => [
                                _cache[35] || (_cache[35] = vue.createTextVNode(": ")),
                                vue.createVNode(vue.unref(elementPlus.ElLink), {
                                  type: "primary",
                                  href: "https://github.com/Tsuk1ko/nhentai-helper/blob/2458629d5a85ad5a16e7594bbb55fa7e359b2ea9/src/utils/nhentai.ts#L56-L74",
                                  target: "_blank"
                                }, {
                                  default: vue.withCtx(() => _cache[34] || (_cache[34] = [
                                    vue.createTextVNode("NHentaiGallery")
                                  ])),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            _cache[38] || (_cache[38] = vue.createTextVNode(") {"))
                          ]),
                          vue.createVNode(vue.unref(elementPlus.ElInput), {
                            modelValue: vue.unref(writeableSettings).customFilenameFunction,
                            "onUpdate:modelValue": _cache[28] || (_cache[28] = ($event) => vue.unref(writeableSettings).customFilenameFunction = $event),
                            class: "monospace",
                            type: "textarea",
                            placeholder: "return filename;",
                            autosize: { minRows: 1 }
                          }, null, 8, ["modelValue"]),
                          _cache[39] || (_cache[39] = vue.createElementVNode("span", { class: "monospace" }, "}", -1))
                        ]),
                        _: 1
                      }, 8, ["label"])
                    ]),
                    _: 1
                  }),
                  vue.createVNode(vue.unref(elementPlus.ElDivider), null, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(vue.toDisplayString(vue.unref(t2)("setting.history.title")), 1)
                    ]),
                    _: 1
                  }),
                  vue.createElementVNode("p", _hoisted_13, vue.toDisplayString(vue.unref(t2)("setting.history.downloadedNumberTip", {
                    num: Number.isNaN(downloadedNum.value) ? downloadedNum.value : vue.unref(n)(downloadedNum.value)
                  })), 1),
                  vue.createVNode(vue.unref(elementPlus.ElButton), {
                    type: "primary",
                    icon: vue.unref(download_default),
                    disabled: !downloadedNum.value,
                    loading: exporting.value,
                    onClick: exportHistory
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(vue.toDisplayString(vue.unref(t2)("setting.history.export")), 1)
                    ]),
                    _: 1
                  }, 8, ["icon", "disabled", "loading"]),
                  vue.createVNode(vue.unref(elementPlus.ElButton), {
                    type: "primary",
                    icon: vue.unref(upload_default),
                    loading: importing.value,
                    onClick: importHistory
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(vue.toDisplayString(vue.unref(t2)("setting.history.import")), 1)
                    ]),
                    _: 1
                  }, 8, ["icon", "loading"]),
                  vue.createVNode(_sfc_main$3, { onConfirm: clearHistory }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(vue.unref(elementPlus.ElButton), {
                        type: "danger",
                        icon: vue.unref(delete_default),
                        loading: clearing.value
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode(vue.toDisplayString(vue.unref(t2)("setting.history.clear")), 1)
                        ]),
                        _: 1
                      }, 8, ["icon", "loading"])
                    ]),
                    _: 1
                  }),
                  vue.createElementVNode("p", _hoisted_14, vue.toDisplayString(vue.unref(t2)("setting.history.importTip")), 1)
                ])
              ]),
              _: 1
            }, 8, ["modelValue"]);
          };
        }
      });
      const SettingsDialog = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-77801b74"]]);
      const compileTemplate = (tpl) => template(tpl, { interpolate: /{{([\s\S]+?)}}/g });
      const getDownloadExt = () => {
        const ext = last(settings.compressionFilename.split("."));
        if (ext) return ext.toLowerCase();
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
        const $btn = $(selector.showAllImagesButton);
        if ($btn.length > 0) {
          resolve($btn);
          return;
        }
        const container = document.querySelector(selector.thumbnailContainer);
        if (!container) {
          reject(new Error("Show all button not found"));
          return;
        }
        new MutationObserver((mutations, self2) => {
          mutations.forEach(({ addedNodes }) => {
            const btnContainer = addedNodes[0];
            if ((btnContainer == null ? void 0 : btnContainer.id) === "show-all-images-container") {
              self2.disconnect();
              resolve($(selector.showAllImagesButton));
            }
          });
        }).observe(container, { childList: true });
      });
      const createMangaDownloadInfo = (gallery2, needReactive = false) => {
        const info = {
          gallery: gallery2,
          done: 0,
          compressing: false,
          compressingPercent: "0",
          error: false
        };
        if (needReactive) {
          vue.markRaw(info.gallery);
          return vue.reactive(info);
        }
        return info;
      };
      var noty = { exports: {} };
      /* 
        @package NOTY - Dependency-free notification library 
        @version version: 3.1.4 
        @contributors https://github.com/needim/noty/graphs/contributors 
        @documentation Examples and Documentation - http://needim.github.com/noty 
        @license Licensed under the MIT licenses: http://www.opensource.org/licenses/mit-license.php 
      */
      (function(module2, exports2) {
        (function webpackUniversalModuleDefinition(root2, factory) {
          module2.exports = factory();
        })(commonjsGlobal, function() {
          return (
            /******/
            function(modules) {
              var installedModules = {};
              function __webpack_require__(moduleId) {
                if (installedModules[moduleId]) {
                  return installedModules[moduleId].exports;
                }
                var module22 = installedModules[moduleId] = {
                  /******/
                  i: moduleId,
                  /******/
                  l: false,
                  /******/
                  exports: {}
                  /******/
                };
                modules[moduleId].call(module22.exports, module22, module22.exports, __webpack_require__);
                module22.l = true;
                return module22.exports;
              }
              __webpack_require__.m = modules;
              __webpack_require__.c = installedModules;
              __webpack_require__.i = function(value) {
                return value;
              };
              __webpack_require__.d = function(exports22, name, getter) {
                if (!__webpack_require__.o(exports22, name)) {
                  Object.defineProperty(exports22, name, {
                    /******/
                    configurable: false,
                    /******/
                    enumerable: true,
                    /******/
                    get: getter
                    /******/
                  });
                }
              };
              __webpack_require__.n = function(module22) {
                var getter = module22 && module22.__esModule ? (
                  /******/
                  function getDefault() {
                    return module22["default"];
                  }
                ) : (
                  /******/
                  function getModuleExports() {
                    return module22;
                  }
                );
                __webpack_require__.d(getter, "a", getter);
                return getter;
              };
              __webpack_require__.o = function(object, property2) {
                return Object.prototype.hasOwnProperty.call(object, property2);
              };
              __webpack_require__.p = "";
              return __webpack_require__(__webpack_require__.s = 6);
            }([
              /* 0 */
              /***/
              function(module22, exports22, __webpack_require__) {
                Object.defineProperty(exports22, "__esModule", {
                  value: true
                });
                exports22.css = exports22.deepExtend = exports22.animationEndEvents = void 0;
                var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
                  return typeof obj;
                } : function(obj) {
                  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                };
                exports22.inArray = inArray;
                exports22.stopPropagation = stopPropagation;
                exports22.generateID = generateID;
                exports22.outerHeight = outerHeight;
                exports22.addListener = addListener;
                exports22.hasClass = hasClass;
                exports22.addClass = addClass;
                exports22.removeClass = removeClass;
                exports22.remove = remove;
                exports22.classList = classList;
                exports22.visibilityChangeFlow = visibilityChangeFlow;
                exports22.createAudioElements = createAudioElements;
                var _api = __webpack_require__(1);
                var API = _interopRequireWildcard(_api);
                function _interopRequireWildcard(obj) {
                  if (obj && obj.__esModule) {
                    return obj;
                  } else {
                    var newObj = {};
                    if (obj != null) {
                      for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                      }
                    }
                    newObj.default = obj;
                    return newObj;
                  }
                }
                exports22.animationEndEvents = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
                function inArray(needle, haystack, argStrict) {
                  var key = void 0;
                  var strict = !!argStrict;
                  if (strict) {
                    for (key in haystack) {
                      if (haystack.hasOwnProperty(key) && haystack[key] === needle) {
                        return true;
                      }
                    }
                  } else {
                    for (key in haystack) {
                      if (haystack.hasOwnProperty(key) && haystack[key] === needle) {
                        return true;
                      }
                    }
                  }
                  return false;
                }
                function stopPropagation(evt) {
                  evt = evt || window.event;
                  if (typeof evt.stopPropagation !== "undefined") {
                    evt.stopPropagation();
                  } else {
                    evt.cancelBubble = true;
                  }
                }
                exports22.deepExtend = function deepExtend2(out) {
                  out = out || {};
                  for (var i = 1; i < arguments.length; i++) {
                    var obj = arguments[i];
                    if (!obj) continue;
                    for (var key in obj) {
                      if (obj.hasOwnProperty(key)) {
                        if (Array.isArray(obj[key])) {
                          out[key] = obj[key];
                        } else if (_typeof(obj[key]) === "object" && obj[key] !== null) {
                          out[key] = deepExtend2(out[key], obj[key]);
                        } else {
                          out[key] = obj[key];
                        }
                      }
                    }
                  }
                  return out;
                };
                function generateID() {
                  var prefix = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
                  var id = "noty_" + prefix + "_";
                  id += "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
                    var r = Math.random() * 16 | 0;
                    var v = c === "x" ? r : r & 3 | 8;
                    return v.toString(16);
                  });
                  return id;
                }
                function outerHeight(el) {
                  var height = el.offsetHeight;
                  var style = window.getComputedStyle(el);
                  height += parseInt(style.marginTop) + parseInt(style.marginBottom);
                  return height;
                }
                exports22.css = /* @__PURE__ */ function() {
                  var cssPrefixes = ["Webkit", "O", "Moz", "ms"];
                  var cssProps = {};
                  function camelCase(string) {
                    return string.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(match2, letter) {
                      return letter.toUpperCase();
                    });
                  }
                  function getVendorProp(name) {
                    var style = document.body.style;
                    if (name in style) return name;
                    var i = cssPrefixes.length;
                    var capName = name.charAt(0).toUpperCase() + name.slice(1);
                    var vendorName = void 0;
                    while (i--) {
                      vendorName = cssPrefixes[i] + capName;
                      if (vendorName in style) return vendorName;
                    }
                    return name;
                  }
                  function getStyleProp(name) {
                    name = camelCase(name);
                    return cssProps[name] || (cssProps[name] = getVendorProp(name));
                  }
                  function applyCss(element, prop, value) {
                    prop = getStyleProp(prop);
                    element.style[prop] = value;
                  }
                  return function(element, properties) {
                    var args = arguments;
                    var prop = void 0;
                    var value = void 0;
                    if (args.length === 2) {
                      for (prop in properties) {
                        if (properties.hasOwnProperty(prop)) {
                          value = properties[prop];
                          if (value !== void 0 && properties.hasOwnProperty(prop)) {
                            applyCss(element, prop, value);
                          }
                        }
                      }
                    } else {
                      applyCss(element, args[1], args[2]);
                    }
                  };
                }();
                function addListener(el, events, cb) {
                  var useCapture = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
                  events = events.split(" ");
                  for (var i = 0; i < events.length; i++) {
                    if (document.addEventListener) {
                      el.addEventListener(events[i], cb, useCapture);
                    } else if (document.attachEvent) {
                      el.attachEvent("on" + events[i], cb);
                    }
                  }
                }
                function hasClass(element, name) {
                  var list = typeof element === "string" ? element : classList(element);
                  return list.indexOf(" " + name + " ") >= 0;
                }
                function addClass(element, name) {
                  var oldList = classList(element);
                  var newList = oldList + name;
                  if (hasClass(oldList, name)) return;
                  element.className = newList.substring(1);
                }
                function removeClass(element, name) {
                  var oldList = classList(element);
                  var newList = void 0;
                  if (!hasClass(element, name)) return;
                  newList = oldList.replace(" " + name + " ", " ");
                  element.className = newList.substring(1, newList.length - 1);
                }
                function remove(element) {
                  if (element.parentNode) {
                    element.parentNode.removeChild(element);
                  }
                }
                function classList(element) {
                  return (" " + (element && element.className || "") + " ").replace(/\s+/gi, " ");
                }
                function visibilityChangeFlow() {
                  var hidden = void 0;
                  var visibilityChange = void 0;
                  if (typeof document.hidden !== "undefined") {
                    hidden = "hidden";
                    visibilityChange = "visibilitychange";
                  } else if (typeof document.msHidden !== "undefined") {
                    hidden = "msHidden";
                    visibilityChange = "msvisibilitychange";
                  } else if (typeof document.webkitHidden !== "undefined") {
                    hidden = "webkitHidden";
                    visibilityChange = "webkitvisibilitychange";
                  }
                  function onVisibilityChange() {
                    API.PageHidden = document[hidden];
                    handleVisibilityChange();
                  }
                  function onBlur() {
                    API.PageHidden = true;
                    handleVisibilityChange();
                  }
                  function onFocus() {
                    API.PageHidden = false;
                    handleVisibilityChange();
                  }
                  function handleVisibilityChange() {
                    if (API.PageHidden) stopAll();
                    else resumeAll();
                  }
                  function stopAll() {
                    setTimeout(function() {
                      Object.keys(API.Store).forEach(function(id) {
                        if (API.Store.hasOwnProperty(id)) {
                          if (API.Store[id].options.visibilityControl) {
                            API.Store[id].stop();
                          }
                        }
                      });
                    }, 100);
                  }
                  function resumeAll() {
                    setTimeout(function() {
                      Object.keys(API.Store).forEach(function(id) {
                        if (API.Store.hasOwnProperty(id)) {
                          if (API.Store[id].options.visibilityControl) {
                            API.Store[id].resume();
                          }
                        }
                      });
                      API.queueRenderAll();
                    }, 100);
                  }
                  if (visibilityChange) {
                    addListener(document, visibilityChange, onVisibilityChange);
                  }
                  addListener(window, "blur", onBlur);
                  addListener(window, "focus", onFocus);
                }
                function createAudioElements(ref2) {
                  if (ref2.hasSound) {
                    var audioElement = document.createElement("audio");
                    ref2.options.sounds.sources.forEach(function(s) {
                      var source = document.createElement("source");
                      source.src = s;
                      source.type = "audio/" + getExtension(s);
                      audioElement.appendChild(source);
                    });
                    if (ref2.barDom) {
                      ref2.barDom.appendChild(audioElement);
                    } else {
                      document.querySelector("body").appendChild(audioElement);
                    }
                    audioElement.volume = ref2.options.sounds.volume;
                    if (!ref2.soundPlayed) {
                      audioElement.play();
                      ref2.soundPlayed = true;
                    }
                    audioElement.onended = function() {
                      remove(audioElement);
                    };
                  }
                }
                function getExtension(fileName) {
                  return fileName.match(/\.([^.]+)$/)[1];
                }
              },
              /* 1 */
              /***/
              function(module22, exports22, __webpack_require__) {
                Object.defineProperty(exports22, "__esModule", {
                  value: true
                });
                exports22.Defaults = exports22.Store = exports22.Queues = exports22.DefaultMaxVisible = exports22.docTitle = exports22.DocModalCount = exports22.PageHidden = void 0;
                exports22.getQueueCounts = getQueueCounts;
                exports22.addToQueue = addToQueue;
                exports22.removeFromQueue = removeFromQueue;
                exports22.queueRender = queueRender;
                exports22.queueRenderAll = queueRenderAll;
                exports22.ghostFix = ghostFix;
                exports22.build = build;
                exports22.hasButtons = hasButtons;
                exports22.handleModal = handleModal;
                exports22.handleModalClose = handleModalClose;
                exports22.queueClose = queueClose;
                exports22.dequeueClose = dequeueClose;
                exports22.fire = fire;
                exports22.openFlow = openFlow;
                exports22.closeFlow = closeFlow;
                var _utils = __webpack_require__(0);
                var Utils = _interopRequireWildcard(_utils);
                function _interopRequireWildcard(obj) {
                  if (obj && obj.__esModule) {
                    return obj;
                  } else {
                    var newObj = {};
                    if (obj != null) {
                      for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                      }
                    }
                    newObj.default = obj;
                    return newObj;
                  }
                }
                exports22.PageHidden = false;
                var DocModalCount = exports22.DocModalCount = 0;
                var DocTitleProps = {
                  originalTitle: null,
                  count: 0,
                  changed: false,
                  timer: -1
                };
                var docTitle = exports22.docTitle = {
                  increment: function increment() {
                    DocTitleProps.count++;
                    docTitle._update();
                  },
                  decrement: function decrement() {
                    DocTitleProps.count--;
                    if (DocTitleProps.count <= 0) {
                      docTitle._clear();
                      return;
                    }
                    docTitle._update();
                  },
                  _update: function _update() {
                    var title = document.title;
                    if (!DocTitleProps.changed) {
                      DocTitleProps.originalTitle = title;
                      document.title = "(" + DocTitleProps.count + ") " + title;
                      DocTitleProps.changed = true;
                    } else {
                      document.title = "(" + DocTitleProps.count + ") " + DocTitleProps.originalTitle;
                    }
                  },
                  _clear: function _clear() {
                    if (DocTitleProps.changed) {
                      DocTitleProps.count = 0;
                      document.title = DocTitleProps.originalTitle;
                      DocTitleProps.changed = false;
                    }
                  }
                };
                var DefaultMaxVisible = exports22.DefaultMaxVisible = 5;
                var Queues = exports22.Queues = {
                  global: {
                    maxVisible: DefaultMaxVisible,
                    queue: []
                  }
                };
                var Store = exports22.Store = {};
                exports22.Defaults = {
                  type: "alert",
                  layout: "topRight",
                  theme: "mint",
                  text: "",
                  timeout: false,
                  progressBar: true,
                  closeWith: ["click"],
                  animation: {
                    open: "noty_effects_open",
                    close: "noty_effects_close"
                  },
                  id: false,
                  force: false,
                  killer: false,
                  queue: "global",
                  container: false,
                  buttons: [],
                  callbacks: {
                    beforeShow: null,
                    onShow: null,
                    afterShow: null,
                    onClose: null,
                    afterClose: null,
                    onClick: null,
                    onHover: null,
                    onTemplate: null
                  },
                  sounds: {
                    sources: [],
                    volume: 1,
                    conditions: []
                  },
                  titleCount: {
                    conditions: []
                  },
                  modal: false,
                  visibilityControl: false
                  /**
                   * @param {string} queueName
                   * @return {object}
                   */
                };
                function getQueueCounts() {
                  var queueName = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "global";
                  var count = 0;
                  var max = DefaultMaxVisible;
                  if (Queues.hasOwnProperty(queueName)) {
                    max = Queues[queueName].maxVisible;
                    Object.keys(Store).forEach(function(i) {
                      if (Store[i].options.queue === queueName && !Store[i].closed) count++;
                    });
                  }
                  return {
                    current: count,
                    maxVisible: max
                  };
                }
                function addToQueue(ref2) {
                  if (!Queues.hasOwnProperty(ref2.options.queue)) {
                    Queues[ref2.options.queue] = { maxVisible: DefaultMaxVisible, queue: [] };
                  }
                  Queues[ref2.options.queue].queue.push(ref2);
                }
                function removeFromQueue(ref2) {
                  if (Queues.hasOwnProperty(ref2.options.queue)) {
                    var queue = [];
                    Object.keys(Queues[ref2.options.queue].queue).forEach(function(i) {
                      if (Queues[ref2.options.queue].queue[i].id !== ref2.id) {
                        queue.push(Queues[ref2.options.queue].queue[i]);
                      }
                    });
                    Queues[ref2.options.queue].queue = queue;
                  }
                }
                function queueRender() {
                  var queueName = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "global";
                  if (Queues.hasOwnProperty(queueName)) {
                    var noty2 = Queues[queueName].queue.shift();
                    if (noty2) noty2.show();
                  }
                }
                function queueRenderAll() {
                  Object.keys(Queues).forEach(function(queueName) {
                    queueRender(queueName);
                  });
                }
                function ghostFix(ref2) {
                  var ghostID = Utils.generateID("ghost");
                  var ghost = document.createElement("div");
                  ghost.setAttribute("id", ghostID);
                  Utils.css(ghost, {
                    height: Utils.outerHeight(ref2.barDom) + "px"
                  });
                  ref2.barDom.insertAdjacentHTML("afterend", ghost.outerHTML);
                  Utils.remove(ref2.barDom);
                  ghost = document.getElementById(ghostID);
                  Utils.addClass(ghost, "noty_fix_effects_height");
                  Utils.addListener(ghost, Utils.animationEndEvents, function() {
                    Utils.remove(ghost);
                  });
                }
                function build(ref2) {
                  findOrCreateContainer(ref2);
                  var markup = '<div class="noty_body">' + ref2.options.text + "</div>" + buildButtons(ref2) + '<div class="noty_progressbar"></div>';
                  ref2.barDom = document.createElement("div");
                  ref2.barDom.setAttribute("id", ref2.id);
                  Utils.addClass(ref2.barDom, "noty_bar noty_type__" + ref2.options.type + " noty_theme__" + ref2.options.theme);
                  ref2.barDom.innerHTML = markup;
                  fire(ref2, "onTemplate");
                }
                function hasButtons(ref2) {
                  return !!(ref2.options.buttons && Object.keys(ref2.options.buttons).length);
                }
                function buildButtons(ref2) {
                  if (hasButtons(ref2)) {
                    var buttons = document.createElement("div");
                    Utils.addClass(buttons, "noty_buttons");
                    Object.keys(ref2.options.buttons).forEach(function(key) {
                      buttons.appendChild(ref2.options.buttons[key].dom);
                    });
                    ref2.options.buttons.forEach(function(btn) {
                      buttons.appendChild(btn.dom);
                    });
                    return buttons.outerHTML;
                  }
                  return "";
                }
                function handleModal(ref2) {
                  if (ref2.options.modal) {
                    if (DocModalCount === 0) {
                      createModal();
                    }
                    exports22.DocModalCount = DocModalCount += 1;
                  }
                }
                function handleModalClose(ref2) {
                  if (ref2.options.modal && DocModalCount > 0) {
                    exports22.DocModalCount = DocModalCount -= 1;
                    if (DocModalCount <= 0) {
                      var modal = document.querySelector(".noty_modal");
                      if (modal) {
                        Utils.removeClass(modal, "noty_modal_open");
                        Utils.addClass(modal, "noty_modal_close");
                        Utils.addListener(modal, Utils.animationEndEvents, function() {
                          Utils.remove(modal);
                        });
                      }
                    }
                  }
                }
                function createModal() {
                  var body = document.querySelector("body");
                  var modal = document.createElement("div");
                  Utils.addClass(modal, "noty_modal");
                  body.insertBefore(modal, body.firstChild);
                  Utils.addClass(modal, "noty_modal_open");
                  Utils.addListener(modal, Utils.animationEndEvents, function() {
                    Utils.removeClass(modal, "noty_modal_open");
                  });
                }
                function findOrCreateContainer(ref2) {
                  if (ref2.options.container) {
                    ref2.layoutDom = document.querySelector(ref2.options.container);
                    return;
                  }
                  var layoutID = "noty_layout__" + ref2.options.layout;
                  ref2.layoutDom = document.querySelector("div#" + layoutID);
                  if (!ref2.layoutDom) {
                    ref2.layoutDom = document.createElement("div");
                    ref2.layoutDom.setAttribute("id", layoutID);
                    ref2.layoutDom.setAttribute("role", "alert");
                    ref2.layoutDom.setAttribute("aria-live", "polite");
                    Utils.addClass(ref2.layoutDom, "noty_layout");
                    document.querySelector("body").appendChild(ref2.layoutDom);
                  }
                }
                function queueClose(ref2) {
                  if (ref2.options.timeout) {
                    if (ref2.options.progressBar && ref2.progressDom) {
                      Utils.css(ref2.progressDom, {
                        transition: "width " + ref2.options.timeout + "ms linear",
                        width: "0%"
                      });
                    }
                    clearTimeout(ref2.closeTimer);
                    ref2.closeTimer = setTimeout(function() {
                      ref2.close();
                    }, ref2.options.timeout);
                  }
                }
                function dequeueClose(ref2) {
                  if (ref2.options.timeout && ref2.closeTimer) {
                    clearTimeout(ref2.closeTimer);
                    ref2.closeTimer = -1;
                    if (ref2.options.progressBar && ref2.progressDom) {
                      Utils.css(ref2.progressDom, {
                        transition: "width 0ms linear",
                        width: "100%"
                      });
                    }
                  }
                }
                function fire(ref2, eventName) {
                  if (ref2.listeners.hasOwnProperty(eventName)) {
                    ref2.listeners[eventName].forEach(function(cb) {
                      if (typeof cb === "function") {
                        cb.apply(ref2);
                      }
                    });
                  }
                }
                function openFlow(ref2) {
                  fire(ref2, "afterShow");
                  queueClose(ref2);
                  Utils.addListener(ref2.barDom, "mouseenter", function() {
                    dequeueClose(ref2);
                  });
                  Utils.addListener(ref2.barDom, "mouseleave", function() {
                    queueClose(ref2);
                  });
                }
                function closeFlow(ref2) {
                  delete Store[ref2.id];
                  ref2.closing = false;
                  fire(ref2, "afterClose");
                  Utils.remove(ref2.barDom);
                  if (ref2.layoutDom.querySelectorAll(".noty_bar").length === 0 && !ref2.options.container) {
                    Utils.remove(ref2.layoutDom);
                  }
                  if (Utils.inArray("docVisible", ref2.options.titleCount.conditions) || Utils.inArray("docHidden", ref2.options.titleCount.conditions)) {
                    docTitle.decrement();
                  }
                  queueRender(ref2.options.queue);
                }
              },
              /* 2 */
              /***/
              function(module22, exports22, __webpack_require__) {
                Object.defineProperty(exports22, "__esModule", {
                  value: true
                });
                exports22.NotyButton = void 0;
                var _utils = __webpack_require__(0);
                var Utils = _interopRequireWildcard(_utils);
                function _interopRequireWildcard(obj) {
                  if (obj && obj.__esModule) {
                    return obj;
                  } else {
                    var newObj = {};
                    if (obj != null) {
                      for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                      }
                    }
                    newObj.default = obj;
                    return newObj;
                  }
                }
                function _classCallCheck(instance, Constructor) {
                  if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                  }
                }
                exports22.NotyButton = function NotyButton2(html, classes, cb) {
                  var _this = this;
                  var attributes = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
                  _classCallCheck(this, NotyButton2);
                  this.dom = document.createElement("button");
                  this.dom.innerHTML = html;
                  this.id = attributes.id = attributes.id || Utils.generateID("button");
                  this.cb = cb;
                  Object.keys(attributes).forEach(function(propertyName) {
                    _this.dom.setAttribute(propertyName, attributes[propertyName]);
                  });
                  Utils.addClass(this.dom, classes || "noty_btn");
                  return this;
                };
              },
              /* 3 */
              /***/
              function(module22, exports22, __webpack_require__) {
                Object.defineProperty(exports22, "__esModule", {
                  value: true
                });
                var _createClass = /* @__PURE__ */ function() {
                  function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                      var descriptor = props[i];
                      descriptor.enumerable = descriptor.enumerable || false;
                      descriptor.configurable = true;
                      if ("value" in descriptor) descriptor.writable = true;
                      Object.defineProperty(target, descriptor.key, descriptor);
                    }
                  }
                  return function(Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                  };
                }();
                function _classCallCheck(instance, Constructor) {
                  if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                  }
                }
                exports22.Push = function() {
                  function Push2() {
                    var workerPath = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "/service-worker.js";
                    _classCallCheck(this, Push2);
                    this.subData = {};
                    this.workerPath = workerPath;
                    this.listeners = {
                      onPermissionGranted: [],
                      onPermissionDenied: [],
                      onSubscriptionSuccess: [],
                      onSubscriptionCancel: [],
                      onWorkerError: [],
                      onWorkerSuccess: [],
                      onWorkerNotSupported: []
                    };
                    return this;
                  }
                  _createClass(Push2, [{
                    key: "on",
                    value: function on(eventName) {
                      var cb = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : function() {
                      };
                      if (typeof cb === "function" && this.listeners.hasOwnProperty(eventName)) {
                        this.listeners[eventName].push(cb);
                      }
                      return this;
                    }
                  }, {
                    key: "fire",
                    value: function fire(eventName) {
                      var _this = this;
                      var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
                      if (this.listeners.hasOwnProperty(eventName)) {
                        this.listeners[eventName].forEach(function(cb) {
                          if (typeof cb === "function") {
                            cb.apply(_this, params);
                          }
                        });
                      }
                    }
                  }, {
                    key: "create",
                    value: function create() {
                      console.log("NOT IMPLEMENTED YET");
                    }
                    /**
                     * @return {boolean}
                     */
                  }, {
                    key: "isSupported",
                    value: function isSupported() {
                      var result = false;
                      try {
                        result = window.Notification || window.webkitNotifications || navigator.mozNotification || window.external && window.external.msIsSiteMode() !== void 0;
                      } catch (e) {
                      }
                      return result;
                    }
                    /**
                     * @return {string}
                     */
                  }, {
                    key: "getPermissionStatus",
                    value: function getPermissionStatus() {
                      var perm = "default";
                      if (window.Notification && window.Notification.permissionLevel) {
                        perm = window.Notification.permissionLevel;
                      } else if (window.webkitNotifications && window.webkitNotifications.checkPermission) {
                        switch (window.webkitNotifications.checkPermission()) {
                          case 1:
                            perm = "default";
                            break;
                          case 0:
                            perm = "granted";
                            break;
                          default:
                            perm = "denied";
                        }
                      } else if (window.Notification && window.Notification.permission) {
                        perm = window.Notification.permission;
                      } else if (navigator.mozNotification) {
                        perm = "granted";
                      } else if (window.external && window.external.msIsSiteMode() !== void 0) {
                        perm = window.external.msIsSiteMode() ? "granted" : "default";
                      }
                      return perm.toString().toLowerCase();
                    }
                    /**
                     * @return {string}
                     */
                  }, {
                    key: "getEndpoint",
                    value: function getEndpoint(subscription) {
                      var endpoint = subscription.endpoint;
                      var subscriptionId = subscription.subscriptionId;
                      if (subscriptionId && endpoint.indexOf(subscriptionId) === -1) {
                        endpoint += "/" + subscriptionId;
                      }
                      return endpoint;
                    }
                    /**
                     * @return {boolean}
                     */
                  }, {
                    key: "isSWRegistered",
                    value: function isSWRegistered() {
                      try {
                        return navigator.serviceWorker.controller.state === "activated";
                      } catch (e) {
                        return false;
                      }
                    }
                    /**
                     * @return {void}
                     */
                  }, {
                    key: "unregisterWorker",
                    value: function unregisterWorker() {
                      var self2 = this;
                      if ("serviceWorker" in navigator) {
                        navigator.serviceWorker.getRegistrations().then(function(registrations) {
                          var _iteratorNormalCompletion = true;
                          var _didIteratorError = false;
                          var _iteratorError = void 0;
                          try {
                            for (var _iterator = registrations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                              var registration = _step.value;
                              registration.unregister();
                              self2.fire("onSubscriptionCancel");
                            }
                          } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                          } finally {
                            try {
                              if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                              }
                            } finally {
                              if (_didIteratorError) {
                                throw _iteratorError;
                              }
                            }
                          }
                        });
                      }
                    }
                    /**
                     * @return {void}
                     */
                  }, {
                    key: "requestSubscription",
                    value: function requestSubscription() {
                      var _this2 = this;
                      var userVisibleOnly = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
                      var self2 = this;
                      var current = this.getPermissionStatus();
                      var cb = function cb2(result) {
                        if (result === "granted") {
                          _this2.fire("onPermissionGranted");
                          if ("serviceWorker" in navigator) {
                            navigator.serviceWorker.register(_this2.workerPath).then(function() {
                              navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
                                self2.fire("onWorkerSuccess");
                                serviceWorkerRegistration.pushManager.subscribe({
                                  userVisibleOnly
                                }).then(function(subscription) {
                                  var key = subscription.getKey("p256dh");
                                  var token = subscription.getKey("auth");
                                  self2.subData = {
                                    endpoint: self2.getEndpoint(subscription),
                                    p256dh: key ? window.btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : null,
                                    auth: token ? window.btoa(String.fromCharCode.apply(null, new Uint8Array(token))) : null
                                  };
                                  self2.fire("onSubscriptionSuccess", [self2.subData]);
                                }).catch(function(err) {
                                  self2.fire("onWorkerError", [err]);
                                });
                              });
                            });
                          } else {
                            self2.fire("onWorkerNotSupported");
                          }
                        } else if (result === "denied") {
                          _this2.fire("onPermissionDenied");
                          _this2.unregisterWorker();
                        }
                      };
                      if (current === "default") {
                        if (window.Notification && window.Notification.requestPermission) {
                          window.Notification.requestPermission(cb);
                        } else if (window.webkitNotifications && window.webkitNotifications.checkPermission) {
                          window.webkitNotifications.requestPermission(cb);
                        }
                      } else {
                        cb(current);
                      }
                    }
                  }]);
                  return Push2;
                }();
              },
              /* 4 */
              /***/
              function(module22, exports22, __webpack_require__) {
                (function(process2, global2) {
                  var require2;
                  /*!
                  * @overview es6-promise - a tiny implementation of Promises/A+.
                  * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
                  * @license   Licensed under MIT license
                  *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
                  * @version   4.1.1
                  */
                  (function(global22, factory) {
                    module22.exports = factory();
                  })(this, function() {
                    function objectOrFunction(x) {
                      var type = typeof x;
                      return x !== null && (type === "object" || type === "function");
                    }
                    function isFunction2(x) {
                      return typeof x === "function";
                    }
                    var _isArray = void 0;
                    if (Array.isArray) {
                      _isArray = Array.isArray;
                    } else {
                      _isArray = function(x) {
                        return Object.prototype.toString.call(x) === "[object Array]";
                      };
                    }
                    var isArray2 = _isArray;
                    var len = 0;
                    var vertxNext = void 0;
                    var customSchedulerFn = void 0;
                    var asap = function asap2(callback, arg) {
                      queue[len] = callback;
                      queue[len + 1] = arg;
                      len += 2;
                      if (len === 2) {
                        if (customSchedulerFn) {
                          customSchedulerFn(flush);
                        } else {
                          scheduleFlush();
                        }
                      }
                    };
                    function setScheduler(scheduleFn) {
                      customSchedulerFn = scheduleFn;
                    }
                    function setAsap(asapFn) {
                      asap = asapFn;
                    }
                    var browserWindow = typeof window !== "undefined" ? window : void 0;
                    var browserGlobal = browserWindow || {};
                    var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
                    var isNode = typeof self === "undefined" && typeof process2 !== "undefined" && {}.toString.call(process2) === "[object process]";
                    var isWorker = typeof Uint8ClampedArray !== "undefined" && typeof importScripts !== "undefined" && typeof MessageChannel !== "undefined";
                    function useNextTick() {
                      return function() {
                        return process2.nextTick(flush);
                      };
                    }
                    function useVertxTimer() {
                      if (typeof vertxNext !== "undefined") {
                        return function() {
                          vertxNext(flush);
                        };
                      }
                      return useSetTimeout();
                    }
                    function useMutationObserver() {
                      var iterations = 0;
                      var observer = new BrowserMutationObserver(flush);
                      var node = document.createTextNode("");
                      observer.observe(node, { characterData: true });
                      return function() {
                        node.data = iterations = ++iterations % 2;
                      };
                    }
                    function useMessageChannel() {
                      var channel = new MessageChannel();
                      channel.port1.onmessage = flush;
                      return function() {
                        return channel.port2.postMessage(0);
                      };
                    }
                    function useSetTimeout() {
                      var globalSetTimeout = setTimeout;
                      return function() {
                        return globalSetTimeout(flush, 1);
                      };
                    }
                    var queue = new Array(1e3);
                    function flush() {
                      for (var i = 0; i < len; i += 2) {
                        var callback = queue[i];
                        var arg = queue[i + 1];
                        callback(arg);
                        queue[i] = void 0;
                        queue[i + 1] = void 0;
                      }
                      len = 0;
                    }
                    function attemptVertx() {
                      try {
                        var r = require2;
                        var vertx = __webpack_require__(9);
                        vertxNext = vertx.runOnLoop || vertx.runOnContext;
                        return useVertxTimer();
                      } catch (e) {
                        return useSetTimeout();
                      }
                    }
                    var scheduleFlush = void 0;
                    if (isNode) {
                      scheduleFlush = useNextTick();
                    } else if (BrowserMutationObserver) {
                      scheduleFlush = useMutationObserver();
                    } else if (isWorker) {
                      scheduleFlush = useMessageChannel();
                    } else if (browserWindow === void 0 && true) {
                      scheduleFlush = attemptVertx();
                    } else {
                      scheduleFlush = useSetTimeout();
                    }
                    function then(onFulfillment, onRejection) {
                      var _arguments = arguments;
                      var parent = this;
                      var child = new this.constructor(noop2);
                      if (child[PROMISE_ID] === void 0) {
                        makePromise(child);
                      }
                      var _state = parent._state;
                      if (_state) {
                        (function() {
                          var callback = _arguments[_state - 1];
                          asap(function() {
                            return invokeCallback(_state, child, callback, parent._result);
                          });
                        })();
                      } else {
                        subscribe(parent, child, onFulfillment, onRejection);
                      }
                      return child;
                    }
                    function resolve$1(object) {
                      var Constructor = this;
                      if (object && typeof object === "object" && object.constructor === Constructor) {
                        return object;
                      }
                      var promise = new Constructor(noop2);
                      resolve(promise, object);
                      return promise;
                    }
                    var PROMISE_ID = Math.random().toString(36).substring(16);
                    function noop2() {
                    }
                    var PENDING = void 0;
                    var FULFILLED = 1;
                    var REJECTED = 2;
                    var GET_THEN_ERROR = new ErrorObject();
                    function selfFulfillment() {
                      return new TypeError("You cannot resolve a promise with itself");
                    }
                    function cannotReturnOwn() {
                      return new TypeError("A promises callback cannot return that same promise.");
                    }
                    function getThen(promise) {
                      try {
                        return promise.then;
                      } catch (error) {
                        GET_THEN_ERROR.error = error;
                        return GET_THEN_ERROR;
                      }
                    }
                    function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
                      try {
                        then$$1.call(value, fulfillmentHandler, rejectionHandler);
                      } catch (e) {
                        return e;
                      }
                    }
                    function handleForeignThenable(promise, thenable, then$$1) {
                      asap(function(promise2) {
                        var sealed = false;
                        var error = tryThen(then$$1, thenable, function(value) {
                          if (sealed) {
                            return;
                          }
                          sealed = true;
                          if (thenable !== value) {
                            resolve(promise2, value);
                          } else {
                            fulfill(promise2, value);
                          }
                        }, function(reason) {
                          if (sealed) {
                            return;
                          }
                          sealed = true;
                          reject(promise2, reason);
                        }, "Settle: " + (promise2._label || " unknown promise"));
                        if (!sealed && error) {
                          sealed = true;
                          reject(promise2, error);
                        }
                      }, promise);
                    }
                    function handleOwnThenable(promise, thenable) {
                      if (thenable._state === FULFILLED) {
                        fulfill(promise, thenable._result);
                      } else if (thenable._state === REJECTED) {
                        reject(promise, thenable._result);
                      } else {
                        subscribe(thenable, void 0, function(value) {
                          return resolve(promise, value);
                        }, function(reason) {
                          return reject(promise, reason);
                        });
                      }
                    }
                    function handleMaybeThenable(promise, maybeThenable, then$$1) {
                      if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
                        handleOwnThenable(promise, maybeThenable);
                      } else {
                        if (then$$1 === GET_THEN_ERROR) {
                          reject(promise, GET_THEN_ERROR.error);
                          GET_THEN_ERROR.error = null;
                        } else if (then$$1 === void 0) {
                          fulfill(promise, maybeThenable);
                        } else if (isFunction2(then$$1)) {
                          handleForeignThenable(promise, maybeThenable, then$$1);
                        } else {
                          fulfill(promise, maybeThenable);
                        }
                      }
                    }
                    function resolve(promise, value) {
                      if (promise === value) {
                        reject(promise, selfFulfillment());
                      } else if (objectOrFunction(value)) {
                        handleMaybeThenable(promise, value, getThen(value));
                      } else {
                        fulfill(promise, value);
                      }
                    }
                    function publishRejection(promise) {
                      if (promise._onerror) {
                        promise._onerror(promise._result);
                      }
                      publish(promise);
                    }
                    function fulfill(promise, value) {
                      if (promise._state !== PENDING) {
                        return;
                      }
                      promise._result = value;
                      promise._state = FULFILLED;
                      if (promise._subscribers.length !== 0) {
                        asap(publish, promise);
                      }
                    }
                    function reject(promise, reason) {
                      if (promise._state !== PENDING) {
                        return;
                      }
                      promise._state = REJECTED;
                      promise._result = reason;
                      asap(publishRejection, promise);
                    }
                    function subscribe(parent, child, onFulfillment, onRejection) {
                      var _subscribers = parent._subscribers;
                      var length = _subscribers.length;
                      parent._onerror = null;
                      _subscribers[length] = child;
                      _subscribers[length + FULFILLED] = onFulfillment;
                      _subscribers[length + REJECTED] = onRejection;
                      if (length === 0 && parent._state) {
                        asap(publish, parent);
                      }
                    }
                    function publish(promise) {
                      var subscribers = promise._subscribers;
                      var settled = promise._state;
                      if (subscribers.length === 0) {
                        return;
                      }
                      var child = void 0, callback = void 0, detail = promise._result;
                      for (var i = 0; i < subscribers.length; i += 3) {
                        child = subscribers[i];
                        callback = subscribers[i + settled];
                        if (child) {
                          invokeCallback(settled, child, callback, detail);
                        } else {
                          callback(detail);
                        }
                      }
                      promise._subscribers.length = 0;
                    }
                    function ErrorObject() {
                      this.error = null;
                    }
                    var TRY_CATCH_ERROR = new ErrorObject();
                    function tryCatch(callback, detail) {
                      try {
                        return callback(detail);
                      } catch (e) {
                        TRY_CATCH_ERROR.error = e;
                        return TRY_CATCH_ERROR;
                      }
                    }
                    function invokeCallback(settled, promise, callback, detail) {
                      var hasCallback = isFunction2(callback), value = void 0, error = void 0, succeeded = void 0, failed = void 0;
                      if (hasCallback) {
                        value = tryCatch(callback, detail);
                        if (value === TRY_CATCH_ERROR) {
                          failed = true;
                          error = value.error;
                          value.error = null;
                        } else {
                          succeeded = true;
                        }
                        if (promise === value) {
                          reject(promise, cannotReturnOwn());
                          return;
                        }
                      } else {
                        value = detail;
                        succeeded = true;
                      }
                      if (promise._state !== PENDING) ;
                      else if (hasCallback && succeeded) {
                        resolve(promise, value);
                      } else if (failed) {
                        reject(promise, error);
                      } else if (settled === FULFILLED) {
                        fulfill(promise, value);
                      } else if (settled === REJECTED) {
                        reject(promise, value);
                      }
                    }
                    function initializePromise(promise, resolver) {
                      try {
                        resolver(function resolvePromise(value) {
                          resolve(promise, value);
                        }, function rejectPromise(reason) {
                          reject(promise, reason);
                        });
                      } catch (e) {
                        reject(promise, e);
                      }
                    }
                    var id = 0;
                    function nextId() {
                      return id++;
                    }
                    function makePromise(promise) {
                      promise[PROMISE_ID] = id++;
                      promise._state = void 0;
                      promise._result = void 0;
                      promise._subscribers = [];
                    }
                    function Enumerator$1(Constructor, input) {
                      this._instanceConstructor = Constructor;
                      this.promise = new Constructor(noop2);
                      if (!this.promise[PROMISE_ID]) {
                        makePromise(this.promise);
                      }
                      if (isArray2(input)) {
                        this.length = input.length;
                        this._remaining = input.length;
                        this._result = new Array(this.length);
                        if (this.length === 0) {
                          fulfill(this.promise, this._result);
                        } else {
                          this.length = this.length || 0;
                          this._enumerate(input);
                          if (this._remaining === 0) {
                            fulfill(this.promise, this._result);
                          }
                        }
                      } else {
                        reject(this.promise, validationError());
                      }
                    }
                    function validationError() {
                      return new Error("Array Methods must be provided an Array");
                    }
                    Enumerator$1.prototype._enumerate = function(input) {
                      for (var i = 0; this._state === PENDING && i < input.length; i++) {
                        this._eachEntry(input[i], i);
                      }
                    };
                    Enumerator$1.prototype._eachEntry = function(entry, i) {
                      var c = this._instanceConstructor;
                      var resolve$$1 = c.resolve;
                      if (resolve$$1 === resolve$1) {
                        var _then = getThen(entry);
                        if (_then === then && entry._state !== PENDING) {
                          this._settledAt(entry._state, i, entry._result);
                        } else if (typeof _then !== "function") {
                          this._remaining--;
                          this._result[i] = entry;
                        } else if (c === Promise$2) {
                          var promise = new c(noop2);
                          handleMaybeThenable(promise, entry, _then);
                          this._willSettleAt(promise, i);
                        } else {
                          this._willSettleAt(new c(function(resolve$$12) {
                            return resolve$$12(entry);
                          }), i);
                        }
                      } else {
                        this._willSettleAt(resolve$$1(entry), i);
                      }
                    };
                    Enumerator$1.prototype._settledAt = function(state, i, value) {
                      var promise = this.promise;
                      if (promise._state === PENDING) {
                        this._remaining--;
                        if (state === REJECTED) {
                          reject(promise, value);
                        } else {
                          this._result[i] = value;
                        }
                      }
                      if (this._remaining === 0) {
                        fulfill(promise, this._result);
                      }
                    };
                    Enumerator$1.prototype._willSettleAt = function(promise, i) {
                      var enumerator = this;
                      subscribe(promise, void 0, function(value) {
                        return enumerator._settledAt(FULFILLED, i, value);
                      }, function(reason) {
                        return enumerator._settledAt(REJECTED, i, reason);
                      });
                    };
                    function all$1(entries) {
                      return new Enumerator$1(this, entries).promise;
                    }
                    function race$1(entries) {
                      var Constructor = this;
                      if (!isArray2(entries)) {
                        return new Constructor(function(_, reject2) {
                          return reject2(new TypeError("You must pass an array to race."));
                        });
                      } else {
                        return new Constructor(function(resolve2, reject2) {
                          var length = entries.length;
                          for (var i = 0; i < length; i++) {
                            Constructor.resolve(entries[i]).then(resolve2, reject2);
                          }
                        });
                      }
                    }
                    function reject$1(reason) {
                      var Constructor = this;
                      var promise = new Constructor(noop2);
                      reject(promise, reason);
                      return promise;
                    }
                    function needsResolver() {
                      throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
                    }
                    function needsNew() {
                      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
                    }
                    function Promise$2(resolver) {
                      this[PROMISE_ID] = nextId();
                      this._result = this._state = void 0;
                      this._subscribers = [];
                      if (noop2 !== resolver) {
                        typeof resolver !== "function" && needsResolver();
                        this instanceof Promise$2 ? initializePromise(this, resolver) : needsNew();
                      }
                    }
                    Promise$2.all = all$1;
                    Promise$2.race = race$1;
                    Promise$2.resolve = resolve$1;
                    Promise$2.reject = reject$1;
                    Promise$2._setScheduler = setScheduler;
                    Promise$2._setAsap = setAsap;
                    Promise$2._asap = asap;
                    Promise$2.prototype = {
                      constructor: Promise$2,
                      /**
                        The primary way of interacting with a promise is through its `then` method,
                        which registers callbacks to receive either a promise's eventual value or the
                        reason why the promise cannot be fulfilled.
                      
                        ```js
                        findUser().then(function(user){
                          // user is available
                        }, function(reason){
                          // user is unavailable, and you are given the reason why
                        });
                        ```
                      
                        Chaining
                        --------
                      
                        The return value of `then` is itself a promise.  This second, 'downstream'
                        promise is resolved with the return value of the first promise's fulfillment
                        or rejection handler, or rejected if the handler throws an exception.
                      
                        ```js
                        findUser().then(function (user) {
                          return user.name;
                        }, function (reason) {
                          return 'default name';
                        }).then(function (userName) {
                          // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
                          // will be `'default name'`
                        });
                      
                        findUser().then(function (user) {
                          throw new Error('Found user, but still unhappy');
                        }, function (reason) {
                          throw new Error('`findUser` rejected and we're unhappy');
                        }).then(function (value) {
                          // never reached
                        }, function (reason) {
                          // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
                          // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
                        });
                        ```
                        If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
                      
                        ```js
                        findUser().then(function (user) {
                          throw new PedagogicalException('Upstream error');
                        }).then(function (value) {
                          // never reached
                        }).then(function (value) {
                          // never reached
                        }, function (reason) {
                          // The `PedgagocialException` is propagated all the way down to here
                        });
                        ```
                      
                        Assimilation
                        ------------
                      
                        Sometimes the value you want to propagate to a downstream promise can only be
                        retrieved asynchronously. This can be achieved by returning a promise in the
                        fulfillment or rejection handler. The downstream promise will then be pending
                        until the returned promise is settled. This is called *assimilation*.
                      
                        ```js
                        findUser().then(function (user) {
                          return findCommentsByAuthor(user);
                        }).then(function (comments) {
                          // The user's comments are now available
                        });
                        ```
                      
                        If the assimliated promise rejects, then the downstream promise will also reject.
                      
                        ```js
                        findUser().then(function (user) {
                          return findCommentsByAuthor(user);
                        }).then(function (comments) {
                          // If `findCommentsByAuthor` fulfills, we'll have the value here
                        }, function (reason) {
                          // If `findCommentsByAuthor` rejects, we'll have the reason here
                        });
                        ```
                      
                        Simple Example
                        --------------
                      
                        Synchronous Example
                      
                        ```javascript
                        let result;
                      
                        try {
                          result = findResult();
                          // success
                        } catch(reason) {
                          // failure
                        }
                        ```
                      
                        Errback Example
                      
                        ```js
                        findResult(function(result, err){
                          if (err) {
                            // failure
                          } else {
                            // success
                          }
                        });
                        ```
                      
                        Promise Example;
                      
                        ```javascript
                        findResult().then(function(result){
                          // success
                        }, function(reason){
                          // failure
                        });
                        ```
                      
                        Advanced Example
                        --------------
                      
                        Synchronous Example
                      
                        ```javascript
                        let author, books;
                      
                        try {
                          author = findAuthor();
                          books  = findBooksByAuthor(author);
                          // success
                        } catch(reason) {
                          // failure
                        }
                        ```
                      
                        Errback Example
                      
                        ```js
                      
                        function foundBooks(books) {
                      
                        }
                      
                        function failure(reason) {
                      
                        }
                      
                        findAuthor(function(author, err){
                          if (err) {
                            failure(err);
                            // failure
                          } else {
                            try {
                              findBoooksByAuthor(author, function(books, err) {
                                if (err) {
                                  failure(err);
                                } else {
                                  try {
                                    foundBooks(books);
                                  } catch(reason) {
                                    failure(reason);
                                  }
                                }
                              });
                            } catch(error) {
                              failure(err);
                            }
                            // success
                          }
                        });
                        ```
                      
                        Promise Example;
                      
                        ```javascript
                        findAuthor().
                          then(findBooksByAuthor).
                          then(function(books){
                            // found books
                        }).catch(function(reason){
                          // something went wrong
                        });
                        ```
                      
                        @method then
                        @param {Function} onFulfilled
                        @param {Function} onRejected
                        Useful for tooling.
                        @return {Promise}
                      */
                      then,
                      /**
                        `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
                        as the catch block of a try/catch statement.
                      
                        ```js
                        function findAuthor(){
                          throw new Error('couldn't find that author');
                        }
                      
                        // synchronous
                        try {
                          findAuthor();
                        } catch(reason) {
                          // something went wrong
                        }
                      
                        // async with promises
                        findAuthor().catch(function(reason){
                          // something went wrong
                        });
                        ```
                      
                        @method catch
                        @param {Function} onRejection
                        Useful for tooling.
                        @return {Promise}
                      */
                      "catch": function _catch(onRejection) {
                        return this.then(null, onRejection);
                      }
                    };
                    function polyfill$1() {
                      var local = void 0;
                      if (typeof global2 !== "undefined") {
                        local = global2;
                      } else if (typeof self !== "undefined") {
                        local = self;
                      } else {
                        try {
                          local = Function("return this")();
                        } catch (e) {
                          throw new Error("polyfill failed because global object is unavailable in this environment");
                        }
                      }
                      var P = local.Promise;
                      if (P) {
                        var promiseToString = null;
                        try {
                          promiseToString = Object.prototype.toString.call(P.resolve());
                        } catch (e) {
                        }
                        if (promiseToString === "[object Promise]" && !P.cast) {
                          return;
                        }
                      }
                      local.Promise = Promise$2;
                    }
                    Promise$2.polyfill = polyfill$1;
                    Promise$2.Promise = Promise$2;
                    return Promise$2;
                  });
                }).call(exports22, __webpack_require__(7), __webpack_require__(8));
              },
              /* 5 */
              /***/
              function(module22, exports22) {
              },
              /* 6 */
              /***/
              function(module22, exports22, __webpack_require__) {
                Object.defineProperty(exports22, "__esModule", {
                  value: true
                });
                var _createClass = /* @__PURE__ */ function() {
                  function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                      var descriptor = props[i];
                      descriptor.enumerable = descriptor.enumerable || false;
                      descriptor.configurable = true;
                      if ("value" in descriptor) descriptor.writable = true;
                      Object.defineProperty(target, descriptor.key, descriptor);
                    }
                  }
                  return function(Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                  };
                }();
                __webpack_require__(5);
                var _es6Promise = __webpack_require__(4);
                var _es6Promise2 = _interopRequireDefault(_es6Promise);
                var _utils = __webpack_require__(0);
                var Utils = _interopRequireWildcard(_utils);
                var _api = __webpack_require__(1);
                var API = _interopRequireWildcard(_api);
                var _button = __webpack_require__(2);
                var _push = __webpack_require__(3);
                function _interopRequireWildcard(obj) {
                  if (obj && obj.__esModule) {
                    return obj;
                  } else {
                    var newObj = {};
                    if (obj != null) {
                      for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                      }
                    }
                    newObj.default = obj;
                    return newObj;
                  }
                }
                function _interopRequireDefault(obj) {
                  return obj && obj.__esModule ? obj : { default: obj };
                }
                function _classCallCheck(instance, Constructor) {
                  if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                  }
                }
                var Noty2 = function() {
                  function Noty22() {
                    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                    _classCallCheck(this, Noty22);
                    this.options = Utils.deepExtend({}, API.Defaults, options);
                    this.id = this.options.id || Utils.generateID("bar");
                    this.closeTimer = -1;
                    this.barDom = null;
                    this.layoutDom = null;
                    this.progressDom = null;
                    this.showing = false;
                    this.shown = false;
                    this.closed = false;
                    this.closing = false;
                    this.killable = this.options.timeout || this.options.closeWith.length > 0;
                    this.hasSound = this.options.sounds.sources.length > 0;
                    this.soundPlayed = false;
                    this.listeners = {
                      beforeShow: [],
                      onShow: [],
                      afterShow: [],
                      onClose: [],
                      afterClose: [],
                      onClick: [],
                      onHover: [],
                      onTemplate: []
                    };
                    this.promises = {
                      show: null,
                      close: null
                    };
                    this.on("beforeShow", this.options.callbacks.beforeShow);
                    this.on("onShow", this.options.callbacks.onShow);
                    this.on("afterShow", this.options.callbacks.afterShow);
                    this.on("onClose", this.options.callbacks.onClose);
                    this.on("afterClose", this.options.callbacks.afterClose);
                    this.on("onClick", this.options.callbacks.onClick);
                    this.on("onHover", this.options.callbacks.onHover);
                    this.on("onTemplate", this.options.callbacks.onTemplate);
                    return this;
                  }
                  _createClass(Noty22, [{
                    key: "on",
                    value: function on(eventName) {
                      var cb = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : function() {
                      };
                      if (typeof cb === "function" && this.listeners.hasOwnProperty(eventName)) {
                        this.listeners[eventName].push(cb);
                      }
                      return this;
                    }
                    /**
                     * @return {Noty}
                     */
                  }, {
                    key: "show",
                    value: function show() {
                      var _this = this;
                      if (this.options.killer === true) {
                        Noty22.closeAll();
                      } else if (typeof this.options.killer === "string") {
                        Noty22.closeAll(this.options.killer);
                      }
                      var queueCounts = API.getQueueCounts(this.options.queue);
                      if (queueCounts.current >= queueCounts.maxVisible || API.PageHidden && this.options.visibilityControl) {
                        API.addToQueue(this);
                        if (API.PageHidden && this.hasSound && Utils.inArray("docHidden", this.options.sounds.conditions)) {
                          Utils.createAudioElements(this);
                        }
                        if (API.PageHidden && Utils.inArray("docHidden", this.options.titleCount.conditions)) {
                          API.docTitle.increment();
                        }
                        return this;
                      }
                      API.Store[this.id] = this;
                      API.fire(this, "beforeShow");
                      this.showing = true;
                      if (this.closing) {
                        this.showing = false;
                        return this;
                      }
                      API.build(this);
                      API.handleModal(this);
                      if (this.options.force) {
                        this.layoutDom.insertBefore(this.barDom, this.layoutDom.firstChild);
                      } else {
                        this.layoutDom.appendChild(this.barDom);
                      }
                      if (this.hasSound && !this.soundPlayed && Utils.inArray("docVisible", this.options.sounds.conditions)) {
                        Utils.createAudioElements(this);
                      }
                      if (Utils.inArray("docVisible", this.options.titleCount.conditions)) {
                        API.docTitle.increment();
                      }
                      this.shown = true;
                      this.closed = false;
                      if (API.hasButtons(this)) {
                        Object.keys(this.options.buttons).forEach(function(key) {
                          var btn = _this.barDom.querySelector("#" + _this.options.buttons[key].id);
                          Utils.addListener(btn, "click", function(e) {
                            Utils.stopPropagation(e);
                            _this.options.buttons[key].cb();
                          });
                        });
                      }
                      this.progressDom = this.barDom.querySelector(".noty_progressbar");
                      if (Utils.inArray("click", this.options.closeWith)) {
                        Utils.addClass(this.barDom, "noty_close_with_click");
                        Utils.addListener(this.barDom, "click", function(e) {
                          Utils.stopPropagation(e);
                          API.fire(_this, "onClick");
                          _this.close();
                        }, false);
                      }
                      Utils.addListener(this.barDom, "mouseenter", function() {
                        API.fire(_this, "onHover");
                      }, false);
                      if (this.options.timeout) Utils.addClass(this.barDom, "noty_has_timeout");
                      if (this.options.progressBar) {
                        Utils.addClass(this.barDom, "noty_has_progressbar");
                      }
                      if (Utils.inArray("button", this.options.closeWith)) {
                        Utils.addClass(this.barDom, "noty_close_with_button");
                        var closeButton = document.createElement("div");
                        Utils.addClass(closeButton, "noty_close_button");
                        closeButton.innerHTML = "×";
                        this.barDom.appendChild(closeButton);
                        Utils.addListener(closeButton, "click", function(e) {
                          Utils.stopPropagation(e);
                          _this.close();
                        }, false);
                      }
                      API.fire(this, "onShow");
                      if (this.options.animation.open === null) {
                        this.promises.show = new _es6Promise2.default(function(resolve) {
                          resolve();
                        });
                      } else if (typeof this.options.animation.open === "function") {
                        this.promises.show = new _es6Promise2.default(this.options.animation.open.bind(this));
                      } else {
                        Utils.addClass(this.barDom, this.options.animation.open);
                        this.promises.show = new _es6Promise2.default(function(resolve) {
                          Utils.addListener(_this.barDom, Utils.animationEndEvents, function() {
                            Utils.removeClass(_this.barDom, _this.options.animation.open);
                            resolve();
                          });
                        });
                      }
                      this.promises.show.then(function() {
                        var _t = _this;
                        setTimeout(function() {
                          API.openFlow(_t);
                        }, 100);
                      });
                      return this;
                    }
                    /**
                     * @return {Noty}
                     */
                  }, {
                    key: "stop",
                    value: function stop() {
                      API.dequeueClose(this);
                      return this;
                    }
                    /**
                     * @return {Noty}
                     */
                  }, {
                    key: "resume",
                    value: function resume() {
                      API.queueClose(this);
                      return this;
                    }
                    /**
                     * @param {int|boolean} ms
                     * @return {Noty}
                     */
                  }, {
                    key: "setTimeout",
                    value: function(_setTimeout) {
                      function setTimeout2(_x) {
                        return _setTimeout.apply(this, arguments);
                      }
                      setTimeout2.toString = function() {
                        return _setTimeout.toString();
                      };
                      return setTimeout2;
                    }(function(ms) {
                      this.stop();
                      this.options.timeout = ms;
                      if (this.barDom) {
                        if (this.options.timeout) {
                          Utils.addClass(this.barDom, "noty_has_timeout");
                        } else {
                          Utils.removeClass(this.barDom, "noty_has_timeout");
                        }
                        var _t = this;
                        setTimeout(function() {
                          _t.resume();
                        }, 100);
                      }
                      return this;
                    })
                    /**
                     * @param {string} html
                     * @param {boolean} optionsOverride
                     * @return {Noty}
                     */
                  }, {
                    key: "setText",
                    value: function setText(html) {
                      var optionsOverride = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
                      if (this.barDom) {
                        this.barDom.querySelector(".noty_body").innerHTML = html;
                      }
                      if (optionsOverride) this.options.text = html;
                      return this;
                    }
                    /**
                     * @param {string} type
                     * @param {boolean} optionsOverride
                     * @return {Noty}
                     */
                  }, {
                    key: "setType",
                    value: function setType(type) {
                      var _this2 = this;
                      var optionsOverride = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
                      if (this.barDom) {
                        var classList = Utils.classList(this.barDom).split(" ");
                        classList.forEach(function(c) {
                          if (c.substring(0, 11) === "noty_type__") {
                            Utils.removeClass(_this2.barDom, c);
                          }
                        });
                        Utils.addClass(this.barDom, "noty_type__" + type);
                      }
                      if (optionsOverride) this.options.type = type;
                      return this;
                    }
                    /**
                     * @param {string} theme
                     * @param {boolean} optionsOverride
                     * @return {Noty}
                     */
                  }, {
                    key: "setTheme",
                    value: function setTheme(theme) {
                      var _this3 = this;
                      var optionsOverride = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
                      if (this.barDom) {
                        var classList = Utils.classList(this.barDom).split(" ");
                        classList.forEach(function(c) {
                          if (c.substring(0, 12) === "noty_theme__") {
                            Utils.removeClass(_this3.barDom, c);
                          }
                        });
                        Utils.addClass(this.barDom, "noty_theme__" + theme);
                      }
                      if (optionsOverride) this.options.theme = theme;
                      return this;
                    }
                    /**
                     * @return {Noty}
                     */
                  }, {
                    key: "close",
                    value: function close() {
                      var _this4 = this;
                      if (this.closed) return this;
                      if (!this.shown) {
                        API.removeFromQueue(this);
                        return this;
                      }
                      API.fire(this, "onClose");
                      this.closing = true;
                      if (this.options.animation.close === null) {
                        this.promises.close = new _es6Promise2.default(function(resolve) {
                          resolve();
                        });
                      } else if (typeof this.options.animation.close === "function") {
                        this.promises.close = new _es6Promise2.default(this.options.animation.close.bind(this));
                      } else {
                        Utils.addClass(this.barDom, this.options.animation.close);
                        this.promises.close = new _es6Promise2.default(function(resolve) {
                          Utils.addListener(_this4.barDom, Utils.animationEndEvents, function() {
                            if (_this4.options.force) {
                              Utils.remove(_this4.barDom);
                            } else {
                              API.ghostFix(_this4);
                            }
                            resolve();
                          });
                        });
                      }
                      this.promises.close.then(function() {
                        API.closeFlow(_this4);
                        API.handleModalClose(_this4);
                      });
                      this.closed = true;
                      return this;
                    }
                    // API functions
                    /**
                     * @param {boolean|string} queueName
                     * @return {Noty}
                     */
                  }], [{
                    key: "closeAll",
                    value: function closeAll() {
                      var queueName = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
                      Object.keys(API.Store).forEach(function(id) {
                        if (queueName) {
                          if (API.Store[id].options.queue === queueName && API.Store[id].killable) {
                            API.Store[id].close();
                          }
                        } else if (API.Store[id].killable) {
                          API.Store[id].close();
                        }
                      });
                      return this;
                    }
                    /**
                     * @param {Object} obj
                     * @return {Noty}
                     */
                  }, {
                    key: "overrideDefaults",
                    value: function overrideDefaults(obj) {
                      API.Defaults = Utils.deepExtend({}, API.Defaults, obj);
                      return this;
                    }
                    /**
                     * @param {int} amount
                     * @param {string} queueName
                     * @return {Noty}
                     */
                  }, {
                    key: "setMaxVisible",
                    value: function setMaxVisible() {
                      var amount = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : API.DefaultMaxVisible;
                      var queueName = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "global";
                      if (!API.Queues.hasOwnProperty(queueName)) {
                        API.Queues[queueName] = { maxVisible: amount, queue: [] };
                      }
                      API.Queues[queueName].maxVisible = amount;
                      return this;
                    }
                    /**
                     * @param {string} innerHtml
                     * @param {String} classes
                     * @param {Function} cb
                     * @param {Object} attributes
                     * @return {NotyButton}
                     */
                  }, {
                    key: "button",
                    value: function button(innerHtml) {
                      var classes = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
                      var cb = arguments[2];
                      var attributes = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
                      return new _button.NotyButton(innerHtml, classes, cb, attributes);
                    }
                    /**
                     * @return {string}
                     */
                  }, {
                    key: "version",
                    value: function version() {
                      return "3.1.4";
                    }
                    /**
                     * @param {String} workerPath
                     * @return {Push}
                     */
                  }, {
                    key: "Push",
                    value: function Push(workerPath) {
                      return new _push.Push(workerPath);
                    }
                  }]);
                  return Noty22;
                }();
                exports22.default = Noty2;
                Utils.visibilityChangeFlow();
                module22.exports = exports22["default"];
              },
              /* 7 */
              /***/
              function(module22, exports22) {
                var process2 = module22.exports = {};
                var cachedSetTimeout;
                var cachedClearTimeout;
                function defaultSetTimout() {
                  throw new Error("setTimeout has not been defined");
                }
                function defaultClearTimeout() {
                  throw new Error("clearTimeout has not been defined");
                }
                (function() {
                  try {
                    if (typeof setTimeout === "function") {
                      cachedSetTimeout = setTimeout;
                    } else {
                      cachedSetTimeout = defaultSetTimout;
                    }
                  } catch (e) {
                    cachedSetTimeout = defaultSetTimout;
                  }
                  try {
                    if (typeof clearTimeout === "function") {
                      cachedClearTimeout = clearTimeout;
                    } else {
                      cachedClearTimeout = defaultClearTimeout;
                    }
                  } catch (e) {
                    cachedClearTimeout = defaultClearTimeout;
                  }
                })();
                function runTimeout(fun) {
                  if (cachedSetTimeout === setTimeout) {
                    return setTimeout(fun, 0);
                  }
                  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                    cachedSetTimeout = setTimeout;
                    return setTimeout(fun, 0);
                  }
                  try {
                    return cachedSetTimeout(fun, 0);
                  } catch (e) {
                    try {
                      return cachedSetTimeout.call(null, fun, 0);
                    } catch (e2) {
                      return cachedSetTimeout.call(this, fun, 0);
                    }
                  }
                }
                function runClearTimeout(marker) {
                  if (cachedClearTimeout === clearTimeout) {
                    return clearTimeout(marker);
                  }
                  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                    cachedClearTimeout = clearTimeout;
                    return clearTimeout(marker);
                  }
                  try {
                    return cachedClearTimeout(marker);
                  } catch (e) {
                    try {
                      return cachedClearTimeout.call(null, marker);
                    } catch (e2) {
                      return cachedClearTimeout.call(this, marker);
                    }
                  }
                }
                var queue = [];
                var draining = false;
                var currentQueue;
                var queueIndex = -1;
                function cleanUpNextTick() {
                  if (!draining || !currentQueue) {
                    return;
                  }
                  draining = false;
                  if (currentQueue.length) {
                    queue = currentQueue.concat(queue);
                  } else {
                    queueIndex = -1;
                  }
                  if (queue.length) {
                    drainQueue();
                  }
                }
                function drainQueue() {
                  if (draining) {
                    return;
                  }
                  var timeout = runTimeout(cleanUpNextTick);
                  draining = true;
                  var len = queue.length;
                  while (len) {
                    currentQueue = queue;
                    queue = [];
                    while (++queueIndex < len) {
                      if (currentQueue) {
                        currentQueue[queueIndex].run();
                      }
                    }
                    queueIndex = -1;
                    len = queue.length;
                  }
                  currentQueue = null;
                  draining = false;
                  runClearTimeout(timeout);
                }
                process2.nextTick = function(fun) {
                  var args = new Array(arguments.length - 1);
                  if (arguments.length > 1) {
                    for (var i = 1; i < arguments.length; i++) {
                      args[i - 1] = arguments[i];
                    }
                  }
                  queue.push(new Item(fun, args));
                  if (queue.length === 1 && !draining) {
                    runTimeout(drainQueue);
                  }
                };
                function Item(fun, array) {
                  this.fun = fun;
                  this.array = array;
                }
                Item.prototype.run = function() {
                  this.fun.apply(null, this.array);
                };
                process2.title = "browser";
                process2.browser = true;
                process2.env = {};
                process2.argv = [];
                process2.version = "";
                process2.versions = {};
                function noop2() {
                }
                process2.on = noop2;
                process2.addListener = noop2;
                process2.once = noop2;
                process2.off = noop2;
                process2.removeListener = noop2;
                process2.removeAllListeners = noop2;
                process2.emit = noop2;
                process2.prependListener = noop2;
                process2.prependOnceListener = noop2;
                process2.listeners = function(name) {
                  return [];
                };
                process2.binding = function(name) {
                  throw new Error("process.binding is not supported");
                };
                process2.cwd = function() {
                  return "/";
                };
                process2.chdir = function(dir) {
                  throw new Error("process.chdir is not supported");
                };
                process2.umask = function() {
                  return 0;
                };
              },
              /* 8 */
              /***/
              function(module22, exports22) {
                var g;
                g = /* @__PURE__ */ function() {
                  return this;
                }();
                try {
                  g = g || Function("return this")() || (1, eval)("this");
                } catch (e) {
                  if (typeof window === "object")
                    g = window;
                }
                module22.exports = g;
              },
              /* 9 */
              /***/
              function(module22, exports22) {
              }
              /******/
            ])
          );
        });
      })(noty);
      var notyExports = noty.exports;
      const Noty = /* @__PURE__ */ getDefaultExportFromCjs(notyExports);
      const resource$1 = {
        "common": {
          "settings": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Settings" } },
          "auto": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Auto" } },
          "english": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "English" } },
          "japanese": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Japanese" } },
          "chinese": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Chinese" } },
          "pretty": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pretty" } },
          "filter": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Filter" } },
          "none": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "None" } },
          "random": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Random" } },
          "balance": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Balance" } },
          "disabled": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Disabled" } },
          "abbr": {
            "english": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "EN" } },
            "japanese": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "JP" } },
            "chinese": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "CN" } }
          }
        },
        "setting": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "common.settings" } }] } },
          "advanceTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Advance Settings" } },
          "helpButton": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Help" } },
          "asteriskTip": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "means refresh is required to take effect" } },
          "downloadThread": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Download thread" } },
          "openOnNewTab": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Open on new tab" } },
          "compressionFilename": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Compression filename" } },
          "maxNumber": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Max number" } },
          "separator": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Separator" } },
          "compressionLevel": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Compression level" } },
          "filenameLength": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Filename length" } },
          "convertWebpTo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Convert webp to" } },
          "convertWebpQuality": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Quality" } },
          "autoCancelDownloadedManga": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Auto cancel downloaded manga" } },
          "autoRetryWhenErrorOccurs": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Auto retry when error occurs" } },
          "autoShowAll": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Auto show all" } },
          "showIgnoreButton": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": 'Show "Ignore" button' } },
          "judgeDownloadedMangaByTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Judge downloaded manga by title" } },
          "customDownloadUrl": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Custom download URL" } },
          "compressionStreamFiles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": 'Compression "streamFiles"' } },
          "seriesMode": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Series mode" } },
          "streamDownload": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Stream download" } },
          "preventConsoleClearing": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Prevent console clearing" } },
          "nHentaiDownloadHost": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "nHentai download host" } },
          "addMetaFile": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Add metadata file" } },
          "metaFileTitleLanguage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Title language" } },
          "titleReplacement": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Title replacement" } },
          "galleryContextmenuPreview": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Context menu preview" } },
          "customFilenameFunction": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Custom filename function" } },
          "history": {
            "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Download History" } },
            "downloadedNumberTip": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "You have downloaded " }, { "t": 4, "k": "num" }, { "t": 3, "v": " manga on this site using nHentai Helper." }] } },
            "import": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Import" } },
            "export": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Export" } },
            "clear": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Clear" } },
            "importTip": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Tip: Import will not clear the existing history, but merges with it." } }
          }
        },
        "dialog": {
          "yes": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "YES" } },
          "no": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "NO" } },
          "action": {
            "getInfo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "getting information" } },
            "download": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "downloading" } }
          },
          "downloadAgainConfirm": ({ named }) => `<i>${named("title")}</i> is already downloaded${named("hasQueue") ? " or in queue" : ""}.<br>Do you want to download again?`,
          "errorRetryConfirm": ({ linked, named }) => `Error occurred while ${linked(`message.dialog.action.${named("action")}`)}, retry?`,
          "errorRetryTip": ({ linked, named }) => `Error occurred while ${linked(`message.dialog.action.${named("action")}`)}, retrying...`,
          "downloadedTip": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "<i>" }, { "t": 4, "k": "title" }, { "t": 3, "v": "</i> is already downloaded or in queue." }] } },
          "getMediaUrlTemplateFailed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": 'Fail to get image download url. Please set "' }, { "t": 6, "k": { "t": 9, "v": "setting.customDownloadUrl" } }, { "t": 3, "v": '" manually, or open a github issue to report with current url.' }] } }
        },
        "button": {
          "download": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Download" } },
          "downloading": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Downloading" } },
          "compressing": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Compressing" } },
          "ignore": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Ignore this" } },
          "unignore": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Ignore this" } }
        },
        "input": {
          "downloadSpecifiedPages": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Download specified pages (e.g. -5,7-10,12,14,18-)" } }
        },
        "confirmPopup": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Are you sure?" } },
          "yes": { "t": 0, "b": { "static": "", "t": 2, "i": [] } },
          "no": { "t": 0, "b": { "static": "", "t": 2, "i": [] } }
        },
        "meta": {
          "id": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ID" } },
          "parody": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Parodies" } },
          "character": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Characters" } },
          "tag": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Tags" } },
          "artist": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Artists" } },
          "group": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Groups" } },
          "language": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Languages" } },
          "category": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Categories" } },
          "page": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pages" } },
          "upload": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Upload Date" } }
        }
      };
      const resource = {
        "common": {
          "settings": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "设置" } },
          "auto": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "自动" } },
          "english": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "英文" } },
          "japanese": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "日文" } },
          "chinese": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "中文" } },
          "pretty": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "简略" } },
          "filter": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "过滤" } },
          "none": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "无" } },
          "random": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "随机" } },
          "balance": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "均衡" } },
          "disabled": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "禁用" } },
          "abbr": {
            "english": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "英" } },
            "japanese": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "日" } },
            "chinese": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "中" } }
          }
        },
        "setting": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "common.settings" } }] } },
          "advanceTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "进阶设置" } },
          "helpButton": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "帮助" } },
          "asteriskTip": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "表示刷新页面才能生效" } },
          "downloadThread": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "下载线程数" } },
          "openOnNewTab": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "在新选项卡打开" } },
          "compressionFilename": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "压缩文件名" } },
          "maxNumber": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "最大数量" } },
          "separator": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "分隔符" } },
          "compressionLevel": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "压缩等级" } },
          "filenameLength": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "文件名长度" } },
          "convertWebpTo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "转换 webp 为" } },
          "convertWebpQuality": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "质量" } },
          "autoCancelDownloadedManga": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "自动取消下载过的本子" } },
          "autoRetryWhenErrorOccurs": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "发生错误时自动重试" } },
          "autoShowAll": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "自动显示全部" } },
          "showIgnoreButton": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "显示“忽略”按钮" } },
          "judgeDownloadedMangaByTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "用标题判断本子是否下载过" } },
          "customDownloadUrl": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "自定义下载地址" } },
          "compressionStreamFiles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": '压缩 "streamFiles" 选项' } },
          "seriesMode": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "串行模式" } },
          "streamDownload": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "流式下载" } },
          "preventConsoleClearing": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "阻止控制台清空" } },
          "nHentaiDownloadHost": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "nHentai 下载节点" } },
          "addMetaFile": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "添加元数据文件" } },
          "metaFileTitleLanguage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "标题语言" } },
          "titleReplacement": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "标题替换" } },
          "galleryContextmenuPreview": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "右击预览" } },
          "customFilenameFunction": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "自定义文件名函数" } },
          "history": {
            "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "下载历史" } },
            "downloadedNumberTip": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "你在这个站点上已经用 nHentai 助手下载了 " }, { "t": 4, "k": "num" }, { "t": 3, "v": " 个本子" }] } },
            "import": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "导入" } },
            "export": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "导出" } },
            "clear": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "清空" } },
            "importTip": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "提示：导入会将导入的历史记录与现有历史记录合并，不会清空现有历史记录" } }
          }
        },
        "dialog": {
          "yes": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "是的" } },
          "no": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "算了" } },
          "action": {
            "getInfo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "获取信息" } },
            "download": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "下载" } }
          },
          "downloadAgainConfirm": ({ named }) => `《${named("title")}》已下载过${named("hasQueue") ? "或在队列中" : ""}，你希望再次下载吗？`,
          "errorRetryConfirm": ({ linked, named }) => `${linked(`message.dialog.action.${named("action")}`)}发生错误，是否重试？`,
          "errorRetryTip": ({ linked, named }) => `${linked(`message.dialog.action.${named("action")}`)}发生错误，重试中……`,
          "downloadedTip": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "《" }, { "t": 4, "k": "title" }, { "t": 3, "v": "》已经下载过或在队列中" }] } },
          "getMediaUrlTemplateFailed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "获取图片下载地址失败，请手动设置“" }, { "t": 6, "k": { "t": 9, "v": "setting.customDownloadUrl" } }, { "t": 3, "v": "”，或前往 github issue 或脚本页面反馈并附带当前网址" }] } }
        },
        "button": {
          "download": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "下载" } },
          "downloading": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "下载中" } },
          "compressing": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "压缩中" } },
          "ignore": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "忽略" } },
          "unignore": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "不再忽略" } }
        },
        "input": {
          "downloadSpecifiedPages": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "下载指定页面（例：-5,7-10,12,14,18-）" } }
        },
        "confirmPopup": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "真的吗？" } },
          "yes": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "真的" } },
          "no": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "算了" } }
        },
        "meta": {
          "id": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ID" } },
          "parody": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "模仿" } },
          "character": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "角色" } },
          "tag": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "标签" } },
          "artist": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "作者" } },
          "group": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "团体" } },
          "language": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "语言" } },
          "category": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "分类" } },
          "page": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "页数" } },
          "upload": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "上传时间" } }
        }
      };
      const i18n = createI18n({
        legacy: false,
        locale: settings.language,
        fallbackLocale: "en",
        messages: { en: resource$1, zh: resource }
      });
      const { t: t$3 } = i18n.global;
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
          const n = new Noty({
            ...notyConfirmOption,
            text: t$3("dialog.downloadAgainConfirm", { title, hasQueue }),
            buttons: [
              Noty.button(t$3("dialog.yes"), "btn btn-noty-blue btn-noty", () => {
                n.close();
                resolve(true);
              }),
              Noty.button(t$3("dialog.no"), "btn btn-noty-green btn-noty", () => {
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
        const n = new Noty({
          ...notyConfirmOption,
          text: t$3("dialog.errorRetryConfirm", { action }),
          buttons: [
            Noty.button(t$3("dialog.no"), "btn btn-noty-blue btn-noty", () => {
              n.close();
              noCb == null ? void 0 : noCb();
            }),
            Noty.button(t$3("dialog.yes"), "btn btn-noty-green btn-noty", () => {
              n.close();
              yesCb == null ? void 0 : yesCb();
            })
          ]
        });
        n.show();
      };
      const downloadedTip = (title) => {
        new Noty({
          type: "info",
          layout: "bottomRight",
          theme: "nest",
          closeWith: [],
          timeout: 4e3,
          text: t$3("dialog.downloadedTip", { title })
        }).show();
      };
      const errorRetryTip = (action) => {
        new Noty({
          type: "warning",
          layout: "bottomRight",
          theme: "nest",
          closeWith: [],
          timeout: 3e3,
          text: t$3("dialog.errorRetryTip", { action })
        }).show();
      };
      var StreamSaver = { exports: {} };
      /*! streamsaver. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
      (function(module2) {
        ((name, definition) => {
          module2.exports = definition();
        })("streamSaver", () => {
          const global2 = typeof window === "object" ? window : this;
          if (!global2.HTMLElement) console.warn("streamsaver is meant to run on browsers main thread");
          let mitmTransporter = null;
          let supportsTransferable = false;
          const test = (fn) => {
            try {
              fn();
            } catch (e) {
            }
          };
          const ponyfill = global2.WebStreamsPolyfill || {};
          const isSecureContext = global2.isSecureContext;
          let useBlobFallback = /constructor/i.test(global2.HTMLElement) || !!global2.safari || !!global2.WebKitPoint;
          const downloadStrategy = isSecureContext || "MozAppearance" in document.documentElement.style ? "iframe" : "navigate";
          const streamSaver = {
            createWriteStream,
            WritableStream: global2.WritableStream || ponyfill.WritableStream,
            supported: true,
            version: { full: "2.0.5", major: 2, minor: 0, dot: 5 },
            mitm: "https://jimmywarting.github.io/StreamSaver.js/mitm.html?version=2.0.0"
          };
          function makeIframe(src) {
            if (!src) throw new Error("meh");
            const iframe = document.createElement("iframe");
            iframe.hidden = true;
            iframe.src = src;
            iframe.loaded = false;
            iframe.name = "iframe";
            iframe.isIframe = true;
            iframe.postMessage = (...args) => iframe.contentWindow.postMessage(...args);
            iframe.addEventListener("load", () => {
              iframe.loaded = true;
            }, { once: true });
            document.body.appendChild(iframe);
            return iframe;
          }
          function makePopup(src) {
            const options = "width=200,height=100";
            const delegate = document.createDocumentFragment();
            const popup = {
              frame: global2.open(src, "popup", options),
              loaded: false,
              isIframe: false,
              isPopup: true,
              remove() {
                popup.frame.close();
              },
              addEventListener(...args) {
                delegate.addEventListener(...args);
              },
              dispatchEvent(...args) {
                delegate.dispatchEvent(...args);
              },
              removeEventListener(...args) {
                delegate.removeEventListener(...args);
              },
              postMessage(...args) {
                popup.frame.postMessage(...args);
              }
            };
            const onReady = (evt) => {
              if (evt.source === popup.frame) {
                popup.loaded = true;
                global2.removeEventListener("message", onReady);
                popup.dispatchEvent(new Event("load"));
              }
            };
            global2.addEventListener("message", onReady);
            return popup;
          }
          try {
            new Response(new ReadableStream());
            if (isSecureContext && !("serviceWorker" in navigator)) {
              useBlobFallback = true;
            }
          } catch (err) {
            useBlobFallback = true;
          }
          test(() => {
            const { readable } = new TransformStream();
            const mc = new MessageChannel();
            mc.port1.postMessage(readable, [readable]);
            mc.port1.close();
            mc.port2.close();
            supportsTransferable = true;
            Object.defineProperty(streamSaver, "TransformStream", {
              configurable: false,
              writable: false,
              value: TransformStream
            });
          });
          function loadTransporter() {
            if (!mitmTransporter) {
              mitmTransporter = isSecureContext ? makeIframe(streamSaver.mitm) : makePopup(streamSaver.mitm);
            }
          }
          function createWriteStream(filename, options, size) {
            let opts = {
              size: null,
              pathname: null,
              writableStrategy: void 0,
              readableStrategy: void 0
            };
            let bytesWritten = 0;
            let downloadUrl = null;
            let channel = null;
            let ts = null;
            if (Number.isFinite(options)) {
              [size, options] = [options, size];
              console.warn("[StreamSaver] Deprecated pass an object as 2nd argument when creating a write stream");
              opts.size = size;
              opts.writableStrategy = options;
            } else if (options && options.highWaterMark) {
              console.warn("[StreamSaver] Deprecated pass an object as 2nd argument when creating a write stream");
              opts.size = size;
              opts.writableStrategy = options;
            } else {
              opts = options || {};
            }
            if (!useBlobFallback) {
              loadTransporter();
              channel = new MessageChannel();
              filename = encodeURIComponent(filename.replace(/\//g, ":")).replace(/['()]/g, escape).replace(/\*/g, "%2A");
              const response = {
                transferringReadable: supportsTransferable,
                pathname: opts.pathname || Math.random().toString().slice(-6) + "/" + filename,
                headers: {
                  "Content-Type": "application/octet-stream; charset=utf-8",
                  "Content-Disposition": "attachment; filename*=UTF-8''" + filename
                }
              };
              if (opts.size) {
                response.headers["Content-Length"] = opts.size;
              }
              const args = [response, "*", [channel.port2]];
              if (supportsTransferable) {
                const transformer = downloadStrategy === "iframe" ? void 0 : {
                  // This transformer & flush method is only used by insecure context.
                  transform(chunk, controller) {
                    if (!(chunk instanceof Uint8Array)) {
                      throw new TypeError("Can only write Uint8Arrays");
                    }
                    bytesWritten += chunk.length;
                    controller.enqueue(chunk);
                    if (downloadUrl) {
                      location.href = downloadUrl;
                      downloadUrl = null;
                    }
                  },
                  flush() {
                    if (downloadUrl) {
                      location.href = downloadUrl;
                    }
                  }
                };
                ts = new streamSaver.TransformStream(
                  transformer,
                  opts.writableStrategy,
                  opts.readableStrategy
                );
                const readableStream = ts.readable;
                channel.port1.postMessage({ readableStream }, [readableStream]);
              }
              channel.port1.onmessage = (evt) => {
                if (evt.data.download) {
                  if (downloadStrategy === "navigate") {
                    mitmTransporter.remove();
                    mitmTransporter = null;
                    if (bytesWritten) {
                      location.href = evt.data.download;
                    } else {
                      downloadUrl = evt.data.download;
                    }
                  } else {
                    if (mitmTransporter.isPopup) {
                      mitmTransporter.remove();
                      mitmTransporter = null;
                      if (downloadStrategy === "iframe") {
                        makeIframe(streamSaver.mitm);
                      }
                    }
                    makeIframe(evt.data.download);
                  }
                } else if (evt.data.abort) {
                  chunks = [];
                  channel.port1.postMessage("abort");
                  channel.port1.onmessage = null;
                  channel.port1.close();
                  channel.port2.close();
                  channel = null;
                }
              };
              if (mitmTransporter.loaded) {
                mitmTransporter.postMessage(...args);
              } else {
                mitmTransporter.addEventListener("load", () => {
                  mitmTransporter.postMessage(...args);
                }, { once: true });
              }
            }
            let chunks = [];
            return !useBlobFallback && ts && ts.writable || new streamSaver.WritableStream({
              write(chunk) {
                if (!(chunk instanceof Uint8Array)) {
                  throw new TypeError("Can only write Uint8Arrays");
                }
                if (useBlobFallback) {
                  chunks.push(chunk);
                  return;
                }
                channel.port1.postMessage(chunk);
                bytesWritten += chunk.length;
                if (downloadUrl) {
                  location.href = downloadUrl;
                  downloadUrl = null;
                }
              },
              close() {
                if (useBlobFallback) {
                  const blob2 = new Blob(chunks, { type: "application/octet-stream; charset=utf-8" });
                  const link = document.createElement("a");
                  link.href = URL.createObjectURL(blob2);
                  link.download = filename;
                  link.click();
                } else {
                  channel.port1.postMessage("end");
                }
              },
              abort() {
                chunks = [];
                channel.port1.postMessage("abort");
                channel.port1.onmessage = null;
                channel.port1.close();
                channel.port2.close();
                channel = null;
              }
            }, opts.writableStrategy);
          }
          return streamSaver;
        });
      })(StreamSaver);
      var StreamSaverExports = StreamSaver.exports;
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
              if (this.aborted) break;
              const i = this.taskIndex++;
              if (i >= this.tasks.length) break;
              const { abort, promise } = await this.taskFunc(this.tasks[i], threadId, this.params);
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
          if (this.started) throw new Error("Multi-thread started.");
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
      const request = (urlGetter, responseType, retry = 3) => {
        let abortFunc;
        const dataPromise = new Promise((resolve, reject) => {
          try {
            const url = typeof urlGetter === "function" ? urlGetter() : urlGetter;
            const req = _GM_xmlhttpRequest({
              method: "GET",
              url,
              responseType,
              onerror: (e) => {
                if (retry === 0) {
                  logger.error("Network error", url, e);
                  reject(e);
                } else {
                  logger.warn("Network error, retry", url, e);
                  setTimeout(() => {
                    const { abort, dataPromise: dataPromise2 } = request(urlGetter, responseType, retry - 1);
                    abortFunc = abort;
                    resolve(dataPromise2);
                  }, 1e3);
                }
              },
              onload: (r) => {
                const { status, response } = r;
                if (status === 200) resolve(response);
                else if (retry === 0) reject(r);
                else {
                  logger.warn("Request error, retry", status, url, r);
                  setTimeout(() => {
                    const { abort, dataPromise: dataPromise2 } = request(urlGetter, responseType, retry - 1);
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
      const getText = (url) => request(url).dataPromise;
      const fetchJSON = (url) => fetch(url).then((r) => r.json());
      class Counter {
        constructor(keys2) {
          __publicField(this, "countMap", {});
          __publicField(this, "countKeys");
          if (!keys2.length) throw new Error("Counter no key");
          this.countKeys = [...keys2];
          this.countKeys.forEach((key) => {
            this.countMap[key] = 0;
          });
        }
        add(key) {
          this.countMap[key]++;
        }
        del(key) {
          this.countMap[key]--;
        }
        getMin() {
          return minBy(this.countKeys, (key) => this.countMap[key]);
        }
      }
      const loadHTML = (html) => {
        const parser = new DOMParser();
        return $(parser.parseFromString(html, "text/html").body);
      };
      class OrderCache extends Map {
        constructor(maxSize) {
          super();
          __publicField(this, "order", []);
          this.maxSize = maxSize;
        }
        set(key, value) {
          if (!super.has(key)) {
            if (super.size + 1 > this.maxSize) {
              const delKey = this.order.shift();
              if (delKey) super.delete(delKey);
            }
            this.order.push(key);
          }
          return super.set(key, value);
        }
        delete(key) {
          const has = super.delete(key);
          if (has) {
            this.order.splice(
              this.order.findIndex((val) => val === key),
              1
            );
          }
          return has;
        }
        clear() {
          super.clear();
          this.order = [];
        }
      }
      var NHentaiImgExt = /* @__PURE__ */ ((NHentaiImgExt2) => {
        NHentaiImgExt2["j"] = "jpg";
        NHentaiImgExt2["p"] = "png";
        NHentaiImgExt2["g"] = "gif";
        NHentaiImgExt2["w"] = "webp";
        return NHentaiImgExt2;
      })(NHentaiImgExt || {});
      const nHentaiImgExtReversed = invert(NHentaiImgExt);
      const getTypeFromExt = (ext) => nHentaiImgExtReversed[ext.toLowerCase()];
      const nHentaiDownloadHostCounter = new Counter(nHentaiDownloadHosts);
      const getNHentaiDownloadHost = () => {
        switch (settings.nHentaiDownloadHost) {
          case NHentaiDownloadHostSpecial.RANDOM:
            return sample(nHentaiDownloadHosts);
          case NHentaiDownloadHostSpecial.BALANCE:
            return nHentaiDownloadHostCounter.getMin();
          default:
            return settings.nHentaiDownloadHost;
        }
      };
      const getMediaDownloadUrl = (mid, filename) => `https://${getNHentaiDownloadHost()}/galleries/${mid}/${filename}`;
      const getMediaDownloadUrlOnMirrorSite = async (gid2, mid, filename) => (await getCompliedMediaUrlTemplate(gid2))({ mid, filename });
      const getGalleryFromApi = (gid2) => {
        const url = `https://nhentai.net/api/gallery/${gid2}`;
        return fetchJSON(url);
      };
      const fixGalleryObj = (gallery2, gid2) => {
        if (gid2) gallery2.id = Number(gid2);
        if (!Array.isArray(gallery2.images.pages)) {
          gallery2.images.pages = Object.values(gallery2.images.pages);
        }
        return gallery2;
      };
      const getGalleryFromWebpage = async (gid) => {
        var _a;
        let doc = document;
        if (!IS_PAGE_MANGA_DETAIL) {
          const html = await getText(`/g/${gid}`);
          const parser = new DOMParser();
          doc = parser.parseFromString(html, "text/html");
        }
        const match = (_a = /gallery(\(\{[\s\S]+\}\));/.exec(doc.body.innerHTML)) == null ? void 0 : _a[1];
        if (match) {
          try {
            const gallery = eval(match);
            logger.log("get gallery by script tag success");
            return fixGalleryObj(gallery, gid);
          } catch {
            logger.warn("get gallery by script tag failed");
          }
        }
        const $doc = $(doc.body);
        const english = $doc.find(selector.englishTitle).text();
        const japanese = $doc.find(selector.japaneseTitle).text();
        const pages = [];
        let mediaId = "";
        $doc.find(selector.thumbnailContainerImage).each((i, img) => {
          const src = img.dataset.src ?? img.src;
          const width = img.getAttribute("width");
          const height = img.getAttribute("height");
          const match2 = /\/([0-9a-z]+)\/(\d+)t?\.([^/]+)$/i.exec(src);
          if (!match2) return;
          const [, mid, index, ext] = match2;
          if (!mediaId) mediaId = mid;
          const t2 = getTypeFromExt(ext);
          if (!t2) return;
          pages[Number(index) - 1] = {
            t: t2,
            w: width ? Number(width) : void 0,
            h: height ? Number(height) : void 0
          };
        });
        if (!english && !japanese || !mediaId || !pages.length) {
          throw new Error("Get gallery info error.");
        }
        const getTags = (type, elContains) => {
          const $tags = $doc.find(selector.tag(elContains));
          return filter(
            Array.from($tags).map((el) => {
              var _a2, _b;
              if (!(el instanceof HTMLElement)) return void 0;
              const name = (_a2 = el.querySelector(selector.tagName)) == null ? void 0 : _a2.innerText.trim();
              const count = (_b = el.querySelector(selector.tagCount)) == null ? void 0 : _b.innerText.trim();
              return name ? {
                type,
                name,
                url: el.getAttribute("href") || void 0,
                count: count ? Number(count) : void 0
              } : void 0;
            })
          );
        };
        const tags = [
          ...getTags("parody", "Parodies"),
          ...getTags("character", "Characters"),
          ...getTags("tag", "Tags"),
          ...getTags("artist", "Artists"),
          ...getTags("group", "Groups"),
          ...getTags("language", "Languages"),
          ...getTags("category", "Categories")
        ];
        const pageNum = Number($doc.find(selector.pagesTag).text() || 0);
        if (pageNum > 0 && pageNum !== pages.length) {
          const defaultPage = { t: "j" };
          for (let i = pages.length; i < pageNum; i++) {
            pages.push(defaultPage);
          }
        }
        const uploadDateStr = $doc.find(selector.uploadDateTag).attr("datetime");
        const uploadDate = uploadDateStr ? new Date(uploadDateStr) : void 0;
        return {
          id: Number(gid),
          media_id: mediaId,
          title: {
            english: english || japanese,
            japanese: japanese || english,
            pretty: ""
          },
          images: {
            pages
          },
          tags,
          num_pages: pageNum || pages.length,
          upload_date: uploadDate && String(uploadDate) !== "Invalid Date" ? Math.floor(uploadDate.getTime() / 1e3) : void 0
        };
      };
      const getCFNameArtists = (tags2) => {
        const artists = map(
          tags2.filter(({ name, type }) => type === "artist" && name),
          "name"
        );
        if (!artists.length) return "none";
        const maxNum = settings.filenameMaxArtistsNumber;
        if (maxNum && artists.length > maxNum) return "various";
        return artists.join(settings.filenameArtistsSeparator);
      };
      const galleryCache = new OrderCache(100);
      const getGallery = async (gid2) => {
        gid2 = String(gid2);
        const cached = galleryCache.get(gid2);
        if (cached) return cached;
        const gallery2 = IS_NHENTAI ? await getGalleryFromApi(gid2) : await getGalleryFromWebpage(gid2);
        galleryCache.set(gid2, gallery2);
        return gallery2;
      };
      const getGalleryInfo = async (gid2) => {
        const gallery2 = await (async () => {
          var _a;
          if (gid2) return getGallery(gid2);
          const gidFromUrl = (_a = /^\/g\/(\d+)/.exec(location.pathname)) == null ? void 0 : _a[1];
          const localGallery = _unsafeWindow._gallery ?? _unsafeWindow.gallery;
          if (localGallery) return fixGalleryObj(localGallery, gidFromUrl);
          if (gidFromUrl) return getGallery(gidFromUrl);
          throw new Error("Cannot get gallery info.");
        })();
        const {
          id,
          media_id,
          title,
          images: { pages: pages2 },
          num_pages,
          tags: tags2,
          upload_date
        } = gallery2;
        const { english: english2, japanese: japanese2, pretty } = title;
        const infoPages = pages2.map(({ t: t2, w, h: h2 }, i) => ({ i: i + 1, t: NHentaiImgExt[t2], w, h: h2 }));
        const info = {
          gid: id,
          mid: media_id,
          title,
          pages: infoPages,
          cfName: removeIllegalFilenameChars(
            compileTemplate(settings.compressionFilename)({
              english: applyTitleReplacement(english2 || japanese2),
              japanese: applyTitleReplacement(japanese2 || english2),
              pretty: applyTitleReplacement(pretty || english2 || japanese2),
              id,
              pages: num_pages,
              artist: getCFNameArtists(tags2)
            })
          ),
          tags: tags2,
          uploadDate: upload_date,
          gallery: gallery2
        };
        logger.log("info", info);
        return info;
      };
      const fetchMediaUrlTemplate = async (gid2) => {
        var _a, _b, _c;
        const onlineViewUrl = ((_b = (_a = document.querySelector(selector.galleryHref)) == null ? void 0 : _a.getAttribute("href")) == null ? void 0 : _b.replace(/\/+$/, "").replace(/\d+$/, gid2).concat("/1")) ?? ((_c = document.querySelector(selector.thumbnailHref)) == null ? void 0 : _c.getAttribute("href"));
        if (!onlineViewUrl) {
          throw new Error("get media url failed: cannot find a gallery");
        }
        logger.log(`fetching media url template by ${onlineViewUrl}`);
        const onlineViewHtml = await getText(onlineViewUrl);
        const $doc2 = loadHTML(onlineViewHtml);
        const $img = $doc2.find(selector.mediaImage);
        const imgSrc = $img.attr("data-src") || $img.attr("src");
        if (!imgSrc) {
          throw new Error("get media url failed: cannot find an image src");
        }
        const template2 = imgSrc.replace(/\/[0-9a-z]+\/\d+\.[^/]+$/i, "/{{mid}}/{{filename}}");
        if (!MEDIA_URL_TEMPLATE_MAY_CHANGE) _GM_setValue(MEDIA_URL_TEMPLATE_KEY, template2);
        return template2;
      };
      const fetchThumbMediaUrlTemplate = async (gid2) => {
        var _a, _b;
        const detailUrl = (_b = (_a = document.querySelector(selector.galleryHref)) == null ? void 0 : _a.getAttribute("href")) == null ? void 0 : _b.replace(/\d+(\/)?$/, `${gid2}$1`);
        if (!detailUrl) {
          throw new Error("get detail url failed: cannot find a gallery");
        }
        logger.log(`fetching thumb media url template by ${detailUrl}`);
        const detailHtml = await getText(detailUrl);
        const $doc2 = loadHTML(detailHtml);
        const $img = $doc2.find(selector.thumbnailContainerImage);
        const imgSrc = $img.attr("data-src") || $img.attr("src");
        if (!imgSrc) {
          throw new Error("get thumb media url failed: cannot find an image src");
        }
        const template2 = imgSrc.replace(/\/[0-9a-z]+\/\d+t\.[^/]+$/i, "/{{mid}}/{{filename}}");
        _GM_setValue(THUMB_MEDIA_URL_TEMPLATE_KEY, template2);
        return template2;
      };
      const mediaUrlTemplateGidCache = {};
      const getMediaUrlTemplate = async (getter, cacheKey, gid2) => {
        if (MEDIA_URL_TEMPLATE_MAY_CHANGE) {
          if (!mediaUrlTemplateGidCache[cacheKey]) mediaUrlTemplateGidCache[cacheKey] = /* @__PURE__ */ new Map();
          if (mediaUrlTemplateGidCache[cacheKey].has(gid2)) {
            return mediaUrlTemplateGidCache[cacheKey].get(gid2);
          }
        }
        try {
          const promise = getter(gid2);
          if (MEDIA_URL_TEMPLATE_MAY_CHANGE && !mediaUrlTemplateGidCache[cacheKey].has(gid2)) {
            mediaUrlTemplateGidCache[cacheKey].set(gid2, promise);
          }
          const template2 = await promise;
          logger.log(`use media url template: ${template2}`);
          return template2;
        } catch (error) {
          logger.error(error);
          if (MEDIA_URL_TEMPLATE_MAY_CHANGE) {
            mediaUrlTemplateGidCache[cacheKey].delete(gid2);
          } else {
            const cachedTemplate = _GM_getValue(cacheKey);
            if (cachedTemplate) {
              logger.warn(`try to use cached media url template: ${cachedTemplate}`);
              return cachedTemplate;
            }
          }
          throw error;
        }
      };
      const getCompliedMediaUrlTemplate = (MEDIA_URL_TEMPLATE_MAY_CHANGE ? identity : once)(
        async (gid2) => compileTemplate(await getMediaUrlTemplate(fetchMediaUrlTemplate, MEDIA_URL_TEMPLATE_KEY, gid2))
      );
      const getCompliedThumbMediaUrlTemplate = (MEDIA_URL_TEMPLATE_MAY_CHANGE ? identity : once)(
        async (gid2) => compileTemplate(
          IS_NHENTAI ? "https://t3.nhentai.net/galleries/{{mid}}/{{filename}}" : await getMediaUrlTemplate(fetchThumbMediaUrlTemplate, THUMB_MEDIA_URL_TEMPLATE_KEY, gid2)
        )
      );
      const applyTitleReplacement = (title) => {
        if (!validTitleReplacement.value.length) return title;
        return validTitleReplacement.value.reduce((pre, { from, to, regexp }) => {
          try {
            return pre.replaceAll(regexp ? new RegExp(from, "g") : from, to);
          } catch {
            return pre;
          }
        }, title);
      };
      let textareaEl;
      const encodeHtml = (text) => {
        if (!textareaEl) textareaEl = document.createElement("textarea");
        textareaEl.innerText = text;
        const encodedText = textareaEl.innerHTML;
        textareaEl.innerHTML = "";
        return encodedText;
      };
      const encodeXml = (text) => encodeHtml(text).replace(/&nbsp;/g, " ");
      const langMap = {
        chinese: "zh",
        english: "en",
        japanese: "ja"
      };
      class ComicInfoXmlBuilder {
        constructor(info) {
          __publicField(this, "serializer", new XMLSerializer());
          __publicField(this, "doc", document.implementation.createDocument(null, "ComicInfo"));
          this.setRootNS();
          this.appendElement(
            "Title",
            settings.metaFileTitleLanguage in info.title ? info.title[settings.metaFileTitleLanguage] : info.title.english
          );
          this.appendElement(
            "Notes",
            `Created by nHentai Helper (Tsuk1ko/nhentai-helper) on ${(/* @__PURE__ */ new Date()).toISOString()}`
          );
          if (info.uploadDate) {
            const date = new Date(info.uploadDate * 1e3);
            this.appendElement("Year", date.getUTCFullYear());
            this.appendElement("Month", date.getUTCMonth() + 1);
            this.appendElement("Day", date.getUTCDate());
          }
          const getTags2 = (type) => info.tags.filter((t2) => t2.type === type);
          const artistTags = getTags2("artist");
          if (artistTags.length) {
            this.appendElement("Writer", map(artistTags, "name").join(", "));
          }
          const tags2 = getTags2("tag");
          if (tags2.length) {
            this.appendElement("Tags", map(tags2, "name").join(", "));
          }
          this.appendElement("Web", `${location.origin}/g/${info.gid}`);
          this.appendElement("PageCount", info.pages.length);
          const languageTag = info.tags.find(({ type, name }) => type === "language" && name in langMap);
          if (languageTag) {
            this.appendElement("LanguageISO", langMap[languageTag.name]);
          }
          this.appendElement("Format", /\[digital\]/i.test(info.title.english) ? "Digital" : "TBP");
          this.appendElement("Manga", "Yes");
          const characterTags = getTags2("character");
          if (characterTags.length) {
            this.appendElement("Characters", map(characterTags, "name").join(", "));
          }
          const pagesEl = this.createElement("Pages");
          const pageEls = info.pages.map(
            ({ i, w, h: h2 }) => this.createElement("Page", void 0, { Image: i, ImageWidth: w, ImageHeight: h2 })
          );
          pagesEl.append(...pageEls);
          this.root.append(pagesEl);
        }
        build() {
          const xml = this.serializer.serializeToString(this.doc);
          return `<?xml version="1.0" encoding="utf-8"?>
${xml}`;
        }
        get root() {
          return this.doc.documentElement;
        }
        setRootNS() {
          this.root.setAttribute("xmlns:xsd", "http://www.w3.org/2001/XMLSchema");
          this.root.setAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
        }
        createElement(name, value, attrs) {
          const el = this.doc.createElement(name);
          if (!isNil(value)) el.innerHTML = encodeXml(String(value));
          if (attrs) {
            forEach(attrs, (v, k) => {
              if (!isNil(v)) el.setAttribute(k, String(v));
            });
          }
          return el;
        }
        appendElement(name, value, attrs) {
          this.root.append(this.createElement(name, value, attrs));
        }
      }
      class EzeInfoJsonBuilder {
        constructor(info) {
          __publicField(this, "data");
          var _a;
          const date = info.uploadDate ? new Date(info.uploadDate * 1e3) : void 0;
          this.data = {
            gallery_info: {
              title: info.title.english,
              title_title_original: info.title.japanese,
              link: `${location.origin}/g/${info.gid}`,
              category: (_a = info.tags.find(({ type }) => type === "category")) == null ? void 0 : _a.name,
              tags: mapValues(groupBy(info.tags, "type"), (tags2) => map(tags2, "name")),
              ...this.getLanguageInfo(info),
              upload_date: date ? [
                date.getUTCFullYear(),
                date.getUTCMonth() + 1,
                date.getUTCDate(),
                date.getUTCHours(),
                date.getUTCMinutes(),
                date.getUTCSeconds()
              ] : void 0,
              source: {
                site: location.origin,
                gid: info.gid
              }
            }
          };
        }
        build() {
          return JSON.stringify(this.data);
        }
        getLanguageInfo(info) {
          let language;
          let translated = false;
          info.tags.filter(({ type }) => type === "language").forEach(({ name }) => {
            if (name === "translated") {
              translated = true;
              return;
            }
            language = name;
          });
          return { language, translated };
        }
      }
      const metaBuilderMap = {
        ComicInfoXml: { name: "ComicInfo.xml", Builder: ComicInfoXmlBuilder },
        EzeInfoJson: { name: "info.json", Builder: EzeInfoJsonBuilder }
      };
      const generateMetaFiles = (info) => {
        if (!settings.addMetaFile.length) return [];
        const files = [];
        for (const key of settings.addMetaFile) {
          if (key in metaBuilderMap) {
            const { name, Builder } = metaBuilderMap[key];
            files.push({
              name,
              data: new Builder(info).build()
            });
          }
        }
        return files;
      };
      const encodedJs = "KGZ1bmN0aW9uKCkgewogICJ1c2Ugc3RyaWN0IjsKICAvKioKICAgKiBAbGljZW5zZQogICAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTEMKICAgKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMAogICAqLwogIGNvbnN0IHByb3h5TWFya2VyID0gU3ltYm9sKCJDb21saW5rLnByb3h5Iik7CiAgY29uc3QgY3JlYXRlRW5kcG9pbnQgPSBTeW1ib2woIkNvbWxpbmsuZW5kcG9pbnQiKTsKICBjb25zdCByZWxlYXNlUHJveHkgPSBTeW1ib2woIkNvbWxpbmsucmVsZWFzZVByb3h5Iik7CiAgY29uc3QgZmluYWxpemVyID0gU3ltYm9sKCJDb21saW5rLmZpbmFsaXplciIpOwogIGNvbnN0IHRocm93TWFya2VyID0gU3ltYm9sKCJDb21saW5rLnRocm93biIpOwogIGNvbnN0IGlzT2JqZWN0ID0gKHZhbCkgPT4gdHlwZW9mIHZhbCA9PT0gIm9iamVjdCIgJiYgdmFsICE9PSBudWxsIHx8IHR5cGVvZiB2YWwgPT09ICJmdW5jdGlvbiI7CiAgY29uc3QgcHJveHlUcmFuc2ZlckhhbmRsZXIgPSB7CiAgICBjYW5IYW5kbGU6ICh2YWwpID0+IGlzT2JqZWN0KHZhbCkgJiYgdmFsW3Byb3h5TWFya2VyXSwKICAgIHNlcmlhbGl6ZShvYmopIHsKICAgICAgY29uc3QgeyBwb3J0MSwgcG9ydDIgfSA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpOwogICAgICBleHBvc2Uob2JqLCBwb3J0MSk7CiAgICAgIHJldHVybiBbcG9ydDIsIFtwb3J0Ml1dOwogICAgfSwKICAgIGRlc2VyaWFsaXplKHBvcnQpIHsKICAgICAgcG9ydC5zdGFydCgpOwogICAgICByZXR1cm4gd3JhcChwb3J0KTsKICAgIH0KICB9OwogIGNvbnN0IHRocm93VHJhbnNmZXJIYW5kbGVyID0gewogICAgY2FuSGFuZGxlOiAodmFsdWUpID0+IGlzT2JqZWN0KHZhbHVlKSAmJiB0aHJvd01hcmtlciBpbiB2YWx1ZSwKICAgIHNlcmlhbGl6ZSh7IHZhbHVlIH0pIHsKICAgICAgbGV0IHNlcmlhbGl6ZWQ7CiAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEVycm9yKSB7CiAgICAgICAgc2VyaWFsaXplZCA9IHsKICAgICAgICAgIGlzRXJyb3I6IHRydWUsCiAgICAgICAgICB2YWx1ZTogewogICAgICAgICAgICBtZXNzYWdlOiB2YWx1ZS5tZXNzYWdlLAogICAgICAgICAgICBuYW1lOiB2YWx1ZS5uYW1lLAogICAgICAgICAgICBzdGFjazogdmFsdWUuc3RhY2sKICAgICAgICAgIH0KICAgICAgICB9OwogICAgICB9IGVsc2UgewogICAgICAgIHNlcmlhbGl6ZWQgPSB7IGlzRXJyb3I6IGZhbHNlLCB2YWx1ZSB9OwogICAgICB9CiAgICAgIHJldHVybiBbc2VyaWFsaXplZCwgW11dOwogICAgfSwKICAgIGRlc2VyaWFsaXplKHNlcmlhbGl6ZWQpIHsKICAgICAgaWYgKHNlcmlhbGl6ZWQuaXNFcnJvcikgewogICAgICAgIHRocm93IE9iamVjdC5hc3NpZ24obmV3IEVycm9yKHNlcmlhbGl6ZWQudmFsdWUubWVzc2FnZSksIHNlcmlhbGl6ZWQudmFsdWUpOwogICAgICB9CiAgICAgIHRocm93IHNlcmlhbGl6ZWQudmFsdWU7CiAgICB9CiAgfTsKICBjb25zdCB0cmFuc2ZlckhhbmRsZXJzID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoWwogICAgWyJwcm94eSIsIHByb3h5VHJhbnNmZXJIYW5kbGVyXSwKICAgIFsidGhyb3ciLCB0aHJvd1RyYW5zZmVySGFuZGxlcl0KICBdKTsKICBmdW5jdGlvbiBpc0FsbG93ZWRPcmlnaW4oYWxsb3dlZE9yaWdpbnMsIG9yaWdpbikgewogICAgZm9yIChjb25zdCBhbGxvd2VkT3JpZ2luIG9mIGFsbG93ZWRPcmlnaW5zKSB7CiAgICAgIGlmIChvcmlnaW4gPT09IGFsbG93ZWRPcmlnaW4gfHwgYWxsb3dlZE9yaWdpbiA9PT0gIioiKSB7CiAgICAgICAgcmV0dXJuIHRydWU7CiAgICAgIH0KICAgICAgaWYgKGFsbG93ZWRPcmlnaW4gaW5zdGFuY2VvZiBSZWdFeHAgJiYgYWxsb3dlZE9yaWdpbi50ZXN0KG9yaWdpbikpIHsKICAgICAgICByZXR1cm4gdHJ1ZTsKICAgICAgfQogICAgfQogICAgcmV0dXJuIGZhbHNlOwogIH0KICBmdW5jdGlvbiBleHBvc2Uob2JqLCBlcCA9IGdsb2JhbFRoaXMsIGFsbG93ZWRPcmlnaW5zID0gWyIqIl0pIHsKICAgIGVwLmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLCBmdW5jdGlvbiBjYWxsYmFjayhldikgewogICAgICBpZiAoIWV2IHx8ICFldi5kYXRhKSB7CiAgICAgICAgcmV0dXJuOwogICAgICB9CiAgICAgIGlmICghaXNBbGxvd2VkT3JpZ2luKGFsbG93ZWRPcmlnaW5zLCBldi5vcmlnaW4pKSB7CiAgICAgICAgY29uc29sZS53YXJuKGBJbnZhbGlkIG9yaWdpbiAnJHtldi5vcmlnaW59JyBmb3IgY29tbGluayBwcm94eWApOwogICAgICAgIHJldHVybjsKICAgICAgfQogICAgICBjb25zdCB7IGlkLCB0eXBlLCBwYXRoIH0gPSBPYmplY3QuYXNzaWduKHsgcGF0aDogW10gfSwgZXYuZGF0YSk7CiAgICAgIGNvbnN0IGFyZ3VtZW50TGlzdCA9IChldi5kYXRhLmFyZ3VtZW50TGlzdCB8fCBbXSkubWFwKGZyb21XaXJlVmFsdWUpOwogICAgICBsZXQgcmV0dXJuVmFsdWU7CiAgICAgIHRyeSB7CiAgICAgICAgY29uc3QgcGFyZW50ID0gcGF0aC5zbGljZSgwLCAtMSkucmVkdWNlKChvYmoyLCBwcm9wKSA9PiBvYmoyW3Byb3BdLCBvYmopOwogICAgICAgIGNvbnN0IHJhd1ZhbHVlID0gcGF0aC5yZWR1Y2UoKG9iajIsIHByb3ApID0+IG9iajJbcHJvcF0sIG9iaik7CiAgICAgICAgc3dpdGNoICh0eXBlKSB7CiAgICAgICAgICBjYXNlICJHRVQiOgogICAgICAgICAgICB7CiAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSByYXdWYWx1ZTsKICAgICAgICAgICAgfQogICAgICAgICAgICBicmVhazsKICAgICAgICAgIGNhc2UgIlNFVCI6CiAgICAgICAgICAgIHsKICAgICAgICAgICAgICBwYXJlbnRbcGF0aC5zbGljZSgtMSlbMF1dID0gZnJvbVdpcmVWYWx1ZShldi5kYXRhLnZhbHVlKTsKICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IHRydWU7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICBjYXNlICJBUFBMWSI6CiAgICAgICAgICAgIHsKICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IHJhd1ZhbHVlLmFwcGx5KHBhcmVudCwgYXJndW1lbnRMaXN0KTsKICAgICAgICAgICAgfQogICAgICAgICAgICBicmVhazsKICAgICAgICAgIGNhc2UgIkNPTlNUUlVDVCI6CiAgICAgICAgICAgIHsKICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IG5ldyByYXdWYWx1ZSguLi5hcmd1bWVudExpc3QpOwogICAgICAgICAgICAgIHJldHVyblZhbHVlID0gcHJveHkodmFsdWUpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgY2FzZSAiRU5EUE9JTlQiOgogICAgICAgICAgICB7CiAgICAgICAgICAgICAgY29uc3QgeyBwb3J0MSwgcG9ydDIgfSA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpOwogICAgICAgICAgICAgIGV4cG9zZShvYmosIHBvcnQyKTsKICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IHRyYW5zZmVyKHBvcnQxLCBbcG9ydDFdKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBicmVhazsKICAgICAgICAgIGNhc2UgIlJFTEVBU0UiOgogICAgICAgICAgICB7CiAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSB2b2lkIDA7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICBkZWZhdWx0OgogICAgICAgICAgICByZXR1cm47CiAgICAgICAgfQogICAgICB9IGNhdGNoICh2YWx1ZSkgewogICAgICAgIHJldHVyblZhbHVlID0geyB2YWx1ZSwgW3Rocm93TWFya2VyXTogMCB9OwogICAgICB9CiAgICAgIFByb21pc2UucmVzb2x2ZShyZXR1cm5WYWx1ZSkuY2F0Y2goKHZhbHVlKSA9PiB7CiAgICAgICAgcmV0dXJuIHsgdmFsdWUsIFt0aHJvd01hcmtlcl06IDAgfTsKICAgICAgfSkudGhlbigocmV0dXJuVmFsdWUyKSA9PiB7CiAgICAgICAgY29uc3QgW3dpcmVWYWx1ZSwgdHJhbnNmZXJhYmxlc10gPSB0b1dpcmVWYWx1ZShyZXR1cm5WYWx1ZTIpOwogICAgICAgIGVwLnBvc3RNZXNzYWdlKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgd2lyZVZhbHVlKSwgeyBpZCB9KSwgdHJhbnNmZXJhYmxlcyk7CiAgICAgICAgaWYgKHR5cGUgPT09ICJSRUxFQVNFIikgewogICAgICAgICAgZXAucmVtb3ZlRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsIGNhbGxiYWNrKTsKICAgICAgICAgIGNsb3NlRW5kUG9pbnQoZXApOwogICAgICAgICAgaWYgKGZpbmFsaXplciBpbiBvYmogJiYgdHlwZW9mIG9ialtmaW5hbGl6ZXJdID09PSAiZnVuY3Rpb24iKSB7CiAgICAgICAgICAgIG9ialtmaW5hbGl6ZXJdKCk7CiAgICAgICAgICB9CiAgICAgICAgfQogICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHsKICAgICAgICBjb25zdCBbd2lyZVZhbHVlLCB0cmFuc2ZlcmFibGVzXSA9IHRvV2lyZVZhbHVlKHsKICAgICAgICAgIHZhbHVlOiBuZXcgVHlwZUVycm9yKCJVbnNlcmlhbGl6YWJsZSByZXR1cm4gdmFsdWUiKSwKICAgICAgICAgIFt0aHJvd01hcmtlcl06IDAKICAgICAgICB9KTsKICAgICAgICBlcC5wb3N0TWVzc2FnZShPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHdpcmVWYWx1ZSksIHsgaWQgfSksIHRyYW5zZmVyYWJsZXMpOwogICAgICB9KTsKICAgIH0pOwogICAgaWYgKGVwLnN0YXJ0KSB7CiAgICAgIGVwLnN0YXJ0KCk7CiAgICB9CiAgfQogIGZ1bmN0aW9uIGlzTWVzc2FnZVBvcnQoZW5kcG9pbnQpIHsKICAgIHJldHVybiBlbmRwb2ludC5jb25zdHJ1Y3Rvci5uYW1lID09PSAiTWVzc2FnZVBvcnQiOwogIH0KICBmdW5jdGlvbiBjbG9zZUVuZFBvaW50KGVuZHBvaW50KSB7CiAgICBpZiAoaXNNZXNzYWdlUG9ydChlbmRwb2ludCkpCiAgICAgIGVuZHBvaW50LmNsb3NlKCk7CiAgfQogIGZ1bmN0aW9uIHdyYXAoZXAsIHRhcmdldCkgewogICAgcmV0dXJuIGNyZWF0ZVByb3h5KGVwLCBbXSwgdGFyZ2V0KTsKICB9CiAgZnVuY3Rpb24gdGhyb3dJZlByb3h5UmVsZWFzZWQoaXNSZWxlYXNlZCkgewogICAgaWYgKGlzUmVsZWFzZWQpIHsKICAgICAgdGhyb3cgbmV3IEVycm9yKCJQcm94eSBoYXMgYmVlbiByZWxlYXNlZCBhbmQgaXMgbm90IHVzZWFibGUiKTsKICAgIH0KICB9CiAgZnVuY3Rpb24gcmVsZWFzZUVuZHBvaW50KGVwKSB7CiAgICByZXR1cm4gcmVxdWVzdFJlc3BvbnNlTWVzc2FnZShlcCwgewogICAgICB0eXBlOiAiUkVMRUFTRSIKICAgIH0pLnRoZW4oKCkgPT4gewogICAgICBjbG9zZUVuZFBvaW50KGVwKTsKICAgIH0pOwogIH0KICBjb25zdCBwcm94eUNvdW50ZXIgPSAvKiBAX19QVVJFX18gKi8gbmV3IFdlYWtNYXAoKTsKICBjb25zdCBwcm94eUZpbmFsaXplcnMgPSAiRmluYWxpemF0aW9uUmVnaXN0cnkiIGluIGdsb2JhbFRoaXMgJiYgbmV3IEZpbmFsaXphdGlvblJlZ2lzdHJ5KChlcCkgPT4gewogICAgY29uc3QgbmV3Q291bnQgPSAocHJveHlDb3VudGVyLmdldChlcCkgfHwgMCkgLSAxOwogICAgcHJveHlDb3VudGVyLnNldChlcCwgbmV3Q291bnQpOwogICAgaWYgKG5ld0NvdW50ID09PSAwKSB7CiAgICAgIHJlbGVhc2VFbmRwb2ludChlcCk7CiAgICB9CiAgfSk7CiAgZnVuY3Rpb24gcmVnaXN0ZXJQcm94eShwcm94eTIsIGVwKSB7CiAgICBjb25zdCBuZXdDb3VudCA9IChwcm94eUNvdW50ZXIuZ2V0KGVwKSB8fCAwKSArIDE7CiAgICBwcm94eUNvdW50ZXIuc2V0KGVwLCBuZXdDb3VudCk7CiAgICBpZiAocHJveHlGaW5hbGl6ZXJzKSB7CiAgICAgIHByb3h5RmluYWxpemVycy5yZWdpc3Rlcihwcm94eTIsIGVwLCBwcm94eTIpOwogICAgfQogIH0KICBmdW5jdGlvbiB1bnJlZ2lzdGVyUHJveHkocHJveHkyKSB7CiAgICBpZiAocHJveHlGaW5hbGl6ZXJzKSB7CiAgICAgIHByb3h5RmluYWxpemVycy51bnJlZ2lzdGVyKHByb3h5Mik7CiAgICB9CiAgfQogIGZ1bmN0aW9uIGNyZWF0ZVByb3h5KGVwLCBwYXRoID0gW10sIHRhcmdldCA9IGZ1bmN0aW9uKCkgewogIH0pIHsKICAgIGxldCBpc1Byb3h5UmVsZWFzZWQgPSBmYWxzZTsKICAgIGNvbnN0IHByb3h5MiA9IG5ldyBQcm94eSh0YXJnZXQsIHsKICAgICAgZ2V0KF90YXJnZXQsIHByb3ApIHsKICAgICAgICB0aHJvd0lmUHJveHlSZWxlYXNlZChpc1Byb3h5UmVsZWFzZWQpOwogICAgICAgIGlmIChwcm9wID09PSByZWxlYXNlUHJveHkpIHsKICAgICAgICAgIHJldHVybiAoKSA9PiB7CiAgICAgICAgICAgIHVucmVnaXN0ZXJQcm94eShwcm94eTIpOwogICAgICAgICAgICByZWxlYXNlRW5kcG9pbnQoZXApOwogICAgICAgICAgICBpc1Byb3h5UmVsZWFzZWQgPSB0cnVlOwogICAgICAgICAgfTsKICAgICAgICB9CiAgICAgICAgaWYgKHByb3AgPT09ICJ0aGVuIikgewogICAgICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSB7CiAgICAgICAgICAgIHJldHVybiB7IHRoZW46ICgpID0+IHByb3h5MiB9OwogICAgICAgICAgfQogICAgICAgICAgY29uc3QgciA9IHJlcXVlc3RSZXNwb25zZU1lc3NhZ2UoZXAsIHsKICAgICAgICAgICAgdHlwZTogIkdFVCIsCiAgICAgICAgICAgIHBhdGg6IHBhdGgubWFwKChwKSA9PiBwLnRvU3RyaW5nKCkpCiAgICAgICAgICB9KS50aGVuKGZyb21XaXJlVmFsdWUpOwogICAgICAgICAgcmV0dXJuIHIudGhlbi5iaW5kKHIpOwogICAgICAgIH0KICAgICAgICByZXR1cm4gY3JlYXRlUHJveHkoZXAsIFsuLi5wYXRoLCBwcm9wXSk7CiAgICAgIH0sCiAgICAgIHNldChfdGFyZ2V0LCBwcm9wLCByYXdWYWx1ZSkgewogICAgICAgIHRocm93SWZQcm94eVJlbGVhc2VkKGlzUHJveHlSZWxlYXNlZCk7CiAgICAgICAgY29uc3QgW3ZhbHVlLCB0cmFuc2ZlcmFibGVzXSA9IHRvV2lyZVZhbHVlKHJhd1ZhbHVlKTsKICAgICAgICByZXR1cm4gcmVxdWVzdFJlc3BvbnNlTWVzc2FnZShlcCwgewogICAgICAgICAgdHlwZTogIlNFVCIsCiAgICAgICAgICBwYXRoOiBbLi4ucGF0aCwgcHJvcF0ubWFwKChwKSA9PiBwLnRvU3RyaW5nKCkpLAogICAgICAgICAgdmFsdWUKICAgICAgICB9LCB0cmFuc2ZlcmFibGVzKS50aGVuKGZyb21XaXJlVmFsdWUpOwogICAgICB9LAogICAgICBhcHBseShfdGFyZ2V0LCBfdGhpc0FyZywgcmF3QXJndW1lbnRMaXN0KSB7CiAgICAgICAgdGhyb3dJZlByb3h5UmVsZWFzZWQoaXNQcm94eVJlbGVhc2VkKTsKICAgICAgICBjb25zdCBsYXN0ID0gcGF0aFtwYXRoLmxlbmd0aCAtIDFdOwogICAgICAgIGlmIChsYXN0ID09PSBjcmVhdGVFbmRwb2ludCkgewogICAgICAgICAgcmV0dXJuIHJlcXVlc3RSZXNwb25zZU1lc3NhZ2UoZXAsIHsKICAgICAgICAgICAgdHlwZTogIkVORFBPSU5UIgogICAgICAgICAgfSkudGhlbihmcm9tV2lyZVZhbHVlKTsKICAgICAgICB9CiAgICAgICAgaWYgKGxhc3QgPT09ICJiaW5kIikgewogICAgICAgICAgcmV0dXJuIGNyZWF0ZVByb3h5KGVwLCBwYXRoLnNsaWNlKDAsIC0xKSk7CiAgICAgICAgfQogICAgICAgIGNvbnN0IFthcmd1bWVudExpc3QsIHRyYW5zZmVyYWJsZXNdID0gcHJvY2Vzc0FyZ3VtZW50cyhyYXdBcmd1bWVudExpc3QpOwogICAgICAgIHJldHVybiByZXF1ZXN0UmVzcG9uc2VNZXNzYWdlKGVwLCB7CiAgICAgICAgICB0eXBlOiAiQVBQTFkiLAogICAgICAgICAgcGF0aDogcGF0aC5tYXAoKHApID0+IHAudG9TdHJpbmcoKSksCiAgICAgICAgICBhcmd1bWVudExpc3QKICAgICAgICB9LCB0cmFuc2ZlcmFibGVzKS50aGVuKGZyb21XaXJlVmFsdWUpOwogICAgICB9LAogICAgICBjb25zdHJ1Y3QoX3RhcmdldCwgcmF3QXJndW1lbnRMaXN0KSB7CiAgICAgICAgdGhyb3dJZlByb3h5UmVsZWFzZWQoaXNQcm94eVJlbGVhc2VkKTsKICAgICAgICBjb25zdCBbYXJndW1lbnRMaXN0LCB0cmFuc2ZlcmFibGVzXSA9IHByb2Nlc3NBcmd1bWVudHMocmF3QXJndW1lbnRMaXN0KTsKICAgICAgICByZXR1cm4gcmVxdWVzdFJlc3BvbnNlTWVzc2FnZShlcCwgewogICAgICAgICAgdHlwZTogIkNPTlNUUlVDVCIsCiAgICAgICAgICBwYXRoOiBwYXRoLm1hcCgocCkgPT4gcC50b1N0cmluZygpKSwKICAgICAgICAgIGFyZ3VtZW50TGlzdAogICAgICAgIH0sIHRyYW5zZmVyYWJsZXMpLnRoZW4oZnJvbVdpcmVWYWx1ZSk7CiAgICAgIH0KICAgIH0pOwogICAgcmVnaXN0ZXJQcm94eShwcm94eTIsIGVwKTsKICAgIHJldHVybiBwcm94eTI7CiAgfQogIGZ1bmN0aW9uIG15RmxhdChhcnIpIHsKICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuY29uY2F0LmFwcGx5KFtdLCBhcnIpOwogIH0KICBmdW5jdGlvbiBwcm9jZXNzQXJndW1lbnRzKGFyZ3VtZW50TGlzdCkgewogICAgY29uc3QgcHJvY2Vzc2VkID0gYXJndW1lbnRMaXN0Lm1hcCh0b1dpcmVWYWx1ZSk7CiAgICByZXR1cm4gW3Byb2Nlc3NlZC5tYXAoKHYpID0+IHZbMF0pLCBteUZsYXQocHJvY2Vzc2VkLm1hcCgodikgPT4gdlsxXSkpXTsKICB9CiAgY29uc3QgdHJhbnNmZXJDYWNoZSA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgV2Vha01hcCgpOwogIGZ1bmN0aW9uIHRyYW5zZmVyKG9iaiwgdHJhbnNmZXJzKSB7CiAgICB0cmFuc2ZlckNhY2hlLnNldChvYmosIHRyYW5zZmVycyk7CiAgICByZXR1cm4gb2JqOwogIH0KICBmdW5jdGlvbiBwcm94eShvYmopIHsKICAgIHJldHVybiBPYmplY3QuYXNzaWduKG9iaiwgeyBbcHJveHlNYXJrZXJdOiB0cnVlIH0pOwogIH0KICBmdW5jdGlvbiB0b1dpcmVWYWx1ZSh2YWx1ZSkgewogICAgZm9yIChjb25zdCBbbmFtZSwgaGFuZGxlcl0gb2YgdHJhbnNmZXJIYW5kbGVycykgewogICAgICBpZiAoaGFuZGxlci5jYW5IYW5kbGUodmFsdWUpKSB7CiAgICAgICAgY29uc3QgW3NlcmlhbGl6ZWRWYWx1ZSwgdHJhbnNmZXJhYmxlc10gPSBoYW5kbGVyLnNlcmlhbGl6ZSh2YWx1ZSk7CiAgICAgICAgcmV0dXJuIFsKICAgICAgICAgIHsKICAgICAgICAgICAgdHlwZTogIkhBTkRMRVIiLAogICAgICAgICAgICBuYW1lLAogICAgICAgICAgICB2YWx1ZTogc2VyaWFsaXplZFZhbHVlCiAgICAgICAgICB9LAogICAgICAgICAgdHJhbnNmZXJhYmxlcwogICAgICAgIF07CiAgICAgIH0KICAgIH0KICAgIHJldHVybiBbCiAgICAgIHsKICAgICAgICB0eXBlOiAiUkFXIiwKICAgICAgICB2YWx1ZQogICAgICB9LAogICAgICB0cmFuc2ZlckNhY2hlLmdldCh2YWx1ZSkgfHwgW10KICAgIF07CiAgfQogIGZ1bmN0aW9uIGZyb21XaXJlVmFsdWUodmFsdWUpIHsKICAgIHN3aXRjaCAodmFsdWUudHlwZSkgewogICAgICBjYXNlICJIQU5ETEVSIjoKICAgICAgICByZXR1cm4gdHJhbnNmZXJIYW5kbGVycy5nZXQodmFsdWUubmFtZSkuZGVzZXJpYWxpemUodmFsdWUudmFsdWUpOwogICAgICBjYXNlICJSQVciOgogICAgICAgIHJldHVybiB2YWx1ZS52YWx1ZTsKICAgIH0KICB9CiAgZnVuY3Rpb24gcmVxdWVzdFJlc3BvbnNlTWVzc2FnZShlcCwgbXNnLCB0cmFuc2ZlcnMpIHsKICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gewogICAgICBjb25zdCBpZCA9IGdlbmVyYXRlVVVJRCgpOwogICAgICBlcC5hZGRFdmVudExpc3RlbmVyKCJtZXNzYWdlIiwgZnVuY3Rpb24gbChldikgewogICAgICAgIGlmICghZXYuZGF0YSB8fCAhZXYuZGF0YS5pZCB8fCBldi5kYXRhLmlkICE9PSBpZCkgewogICAgICAgICAgcmV0dXJuOwogICAgICAgIH0KICAgICAgICBlcC5yZW1vdmVFdmVudExpc3RlbmVyKCJtZXNzYWdlIiwgbCk7CiAgICAgICAgcmVzb2x2ZShldi5kYXRhKTsKICAgICAgfSk7CiAgICAgIGlmIChlcC5zdGFydCkgewogICAgICAgIGVwLnN0YXJ0KCk7CiAgICAgIH0KICAgICAgZXAucG9zdE1lc3NhZ2UoT2JqZWN0LmFzc2lnbih7IGlkIH0sIG1zZyksIHRyYW5zZmVycyk7CiAgICB9KTsKICB9CiAgZnVuY3Rpb24gZ2VuZXJhdGVVVUlEKCkgewogICAgcmV0dXJuIG5ldyBBcnJheSg0KS5maWxsKDApLm1hcCgoKSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUikudG9TdHJpbmcoMTYpKS5qb2luKCItIik7CiAgfQogIGNvbnN0IGNvbnZlcnRXZWJwVG8gPSBhc3luYyAoZGF0YSwgdHlwZSwgcXVhbGl0eSkgPT4gewogICAgY29uc3QgYml0bWFwID0gYXdhaXQgY3JlYXRlSW1hZ2VCaXRtYXAobmV3IEJsb2IoW2RhdGFdLCB7IHR5cGU6ICJpbWFnZS93ZWJwIiB9KSk7CiAgICBjb25zdCBjYW52YXMgPSBuZXcgT2Zmc2NyZWVuQ2FudmFzKGJpdG1hcC53aWR0aCwgYml0bWFwLmhlaWdodCk7CiAgICBjYW52YXMuZ2V0Q29udGV4dCgiYml0bWFwcmVuZGVyZXIiKS50cmFuc2ZlckZyb21JbWFnZUJpdG1hcChiaXRtYXApOwogICAgY29uc3QgYmxvYiA9IGF3YWl0IGNhbnZhcy5jb252ZXJ0VG9CbG9iKHsgdHlwZSwgcXVhbGl0eSB9KTsKICAgIGNvbnN0IGJ1ZmZlciA9IGF3YWl0IGJsb2IuYXJyYXlCdWZmZXIoKTsKICAgIHJldHVybiB0cmFuc2Zlcih7IGJ1ZmZlciwgdHlwZSB9LCBbYnVmZmVyXSk7CiAgfTsKICBjb25zdCBleHBvc2VkID0gewogICAgY29udmVydFdlYnBUbwogIH07CiAgZXhwb3NlKGV4cG9zZWQpOwp9KSgpOwo=";
      const decodeBase64 = (base64) => Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
      const blob = typeof self !== "undefined" && self.Blob && new Blob([decodeBase64(encodedJs)], { type: "text/javascript;charset=utf-8" });
      function WorkerWrapper(options) {
        let objURL;
        try {
          objURL = blob && (self.URL || self.webkitURL).createObjectURL(blob);
          if (!objURL) throw "";
          const worker = new Worker(objURL, {
            name: options == null ? void 0 : options.name
          });
          worker.addEventListener("error", () => {
            (self.URL || self.webkitURL).revokeObjectURL(objURL);
          });
          return worker;
        } catch (e) {
          return new Worker(
            "data:text/javascript;base64," + encodedJs,
            {
              name: options == null ? void 0 : options.name
            }
          );
        } finally {
          objURL && (self.URL || self.webkitURL).revokeObjectURL(objURL);
        }
      }
      const mimeToExt = {
        [MIME.JPG]: "jpg",
        [MIME.PNG]: "png"
      };
      class ImgConverter {
        constructor() {
          __privateAdd(this, _worker);
        }
        async convertWebpTo(...args) {
          const worker = await this.getWorker();
          const { buffer, type } = await worker.convertWebpTo(...args);
          return {
            buffer,
            ext: mimeToExt[type] || "unknown"
          };
        }
        async getWorker() {
          if (!__privateGet(this, _worker)) __privateSet(this, _worker, this.createWorker());
          return __privateGet(this, _worker);
        }
        async createWorker() {
          const worker = new WorkerWrapper();
          return wrap(worker);
        }
      }
      _worker = new WeakMap();
      const imgConverter = new ImgConverter();
      const downloadGalleryByInfo = async (info, { progressDisplayController, rangeCheckers } = {}) => {
        info.done = 0;
        let { mid, pages: pages2, cfName } = info.gallery;
        if (customFilenameFunction.value) {
          const result = customFilenameFunction.value(cfName, info.gallery.gallery);
          if (typeof result !== "string" || !result.trim()) {
            throw new Error(`Custom filename function illegal result: ${result}`);
          }
          cfName = removeIllegalFilenameChars(result);
        }
        if (rangeCheckers == null ? void 0 : rangeCheckers.length) {
          pages2 = pages2.filter(({ i }) => rangeCheckers.some((check) => check(i)));
        }
        let aborted = false;
        info.cancel = () => {
          aborted = true;
          progressDisplayController == null ? void 0 : progressDisplayController.reset();
        };
        progressDisplayController == null ? void 0 : progressDisplayController.bindInfo(info);
        progressDisplayController == null ? void 0 : progressDisplayController.updateProgress();
        const zip = new JSZip();
        const metaFiles = generateMetaFiles(info.gallery);
        if (metaFiles.length) {
          metaFiles.forEach(({ name, data }) => {
            zip.file(name, data);
          });
        }
        const { convertWebpTo, convertWebpQuality } = settings;
        const downloadTask = async (page, threadID, { filenameLength, customDownloadUrl }) => {
          if (info.error) return { abort: () => {
          }, promise: Promise.resolve() };
          let urlGetterError;
          const usedCounterKeys = [];
          const urlGetter = customDownloadUrl ? compileTemplate(customDownloadUrl)({ mid, index: page.i, ext: page.t }) : IS_NHENTAI ? settings.nHentaiDownloadHost === NHentaiDownloadHostSpecial.BALANCE || settings.nHentaiDownloadHost === NHentaiDownloadHostSpecial.RANDOM ? () => {
            const url = getMediaDownloadUrl(mid, `${page.i}.${page.t}`);
            logger.log(`[${threadID}] ${url}`);
            if (settings.nHentaiDownloadHost === NHentaiDownloadHostSpecial.BALANCE) {
              const counterKey = new URL(url).host;
              usedCounterKeys.push(counterKey);
              nHentaiDownloadHostCounter.add(counterKey);
            }
            return url;
          } : getMediaDownloadUrl(mid, `${page.i}.${page.t}`) : await getMediaDownloadUrlOnMirrorSite(
            String(info.gallery.gid),
            mid,
            `${page.i}.${page.t}`
          ).catch((e) => {
            urlGetterError = e;
          });
          if (!urlGetter || urlGetterError) {
            info.error = true;
            throw urlGetterError && urlGetterError instanceof Error ? urlGetterError : new Error("No url getter");
          }
          if (typeof urlGetter !== "function") {
            logger.log(`[${threadID}] ${urlGetter}`);
          }
          const { abort: abort2, dataPromise } = request(urlGetter, "arraybuffer");
          return {
            abort: () => {
              logger.log(`[${threadID}] abort`);
              abort2();
            },
            promise: dataPromise.then(async (data) => {
              if (data) {
                const filename = String(page.i).padStart(filenameLength || 0, "0");
                if (page.t === NHentaiImgExt.w && convertWebpTo) {
                  const { buffer, ext } = await imgConverter.convertWebpTo(
                    data,
                    convertWebpTo,
                    convertWebpQuality / 100
                  );
                  zip.file(`${filename}.${ext}`, buffer);
                } else zip.file(`${filename}.${page.t}`, data);
              }
              info.done++;
              progressDisplayController == null ? void 0 : progressDisplayController.updateProgress();
            }).catch((e) => {
              if (isAbortError(e)) return;
              info.error = true;
              throw e;
            }).finally(() => {
              if (usedCounterKeys.length) {
                usedCounterKeys.forEach((key) => {
                  nHentaiDownloadHostCounter.del(key);
                });
              }
            })
          };
        };
        const multiThread = new MultiThread(pages2, downloadTask, {
          filenameLength: settings.filenameLength === "auto" ? Math.ceil(Math.log10(Math.max(...pages2.map(({ i }) => Number(i))))) : settings.filenameLength,
          customDownloadUrl: settings.customDownloadUrl
        });
        const { abort, promise } = multiThread.start();
        info.cancel = () => {
          aborted = true;
          abort();
          progressDisplayController == null ? void 0 : progressDisplayController.reset();
        };
        if (!aborted) await promise;
        if (aborted) return;
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
            const fileStream = StreamSaverExports.createWriteStream(cfName);
            const zipStream = await zip.generateStream(getCompressionOptions(), onCompressionUpdate);
            await zipStream.pipeTo(fileStream);
          } else {
            const data = await zip.generateAsync(getCompressionOptions(), onCompressionUpdate);
            FileSaver_minExports.saveAs(new File([data], cfName, { type: "application/zip" }));
          }
          logger.log("completed", cfName);
          progressDisplayController == null ? void 0 : progressDisplayController.complete();
          progressDisplayController == null ? void 0 : progressDisplayController.unbindInfo();
        };
      };
      const addDownloadGalleryTask = (gallery2, { progressDisplayController, markGalleryDownloaded } = {}) => {
        const info = createMangaDownloadInfo(gallery2, true);
        info.cancel = () => {
          progressDisplayController == null ? void 0 : progressDisplayController.reset();
        };
        dlQueue.push(async () => {
          const zipFunc = await downloadGalleryByInfo(info, { progressDisplayController }).catch((e) => {
            progressDisplayController == null ? void 0 : progressDisplayController.error();
            errorRetryConfirm(
              ErrorAction.DOWNLOAD,
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
                if (!error) logger.warn("user abort stream download");
                logger.error(error);
                progressDisplayController == null ? void 0 : progressDisplayController.error();
              }
            }, info);
            zipQueue.start().catch(logger.error);
          }
        }, info);
        dlQueue.start().catch(logger.error);
      };
      const defaultClassName = {
        greyButton: "btn btn-secondary"
      };
      const siteMap = {
        "nhentai.xxx": {
          greyButton: "mbtn grey"
        }
      };
      const className = { ...defaultClassName, ...siteMap[location.hostname] };
      const { t: t$2 } = i18n.global;
      class ProgressDisplayController {
        constructor(enableHeadTxt = false, docTitle) {
          __publicField(this, "downloadBtn");
          __publicField(this, "btnTxt");
          __publicField(this, "info");
          this.enableHeadTxt = enableHeadTxt;
          this.docTitle = docTitle;
          this.btnTxt = /* @__PURE__ */ core.h("span", { class: "download-zip-txt" }, this.defaultBtnText());
          this.downloadBtn = /* @__PURE__ */ core.h("button", { class: `${className.greyButton} nhentai-helper-btn download-zip-btn` }, /* @__PURE__ */ core.h("i", { class: "fa fa-download" }), " ", this.btnTxt);
        }
        get compressingHeadText() {
          return this.enableHeadTxt ? `${t$2("button.compressing")} ${getDownloadExt()} ` : "";
        }
        get downloadingHeadText() {
          return this.enableHeadTxt ? `${t$2("button.downloading")} ${getDownloadExt()} ` : "";
        }
        defaultBtnText(suffix) {
          if (!this.enableHeadTxt) return suffix ?? "";
          return `${t$2("button.download")} ${getDownloadExt()}${suffix ? ` ${suffix}` : ""}`;
        }
        bindInfo(info) {
          this.info = info;
        }
        unbindInfo() {
          this.info = void 0;
        }
        lockBtn(text) {
          this.downloadBtn.setAttribute("disabled", "disabled");
          if (text) this.btnTxt.innerText = text;
        }
        releaseBtn() {
          this.downloadBtn.removeAttribute("disabled");
        }
        complete() {
          this.setDocTitle("✓");
          this.btnTxt.innerText = this.defaultBtnText("✓");
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
          this.setDocTitle("×");
        }
        updateProgress() {
          if (!this.info) return;
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
          if (!this.docTitle) return;
          document.title = prefix ? `[${prefix}] ${this.docTitle}` : this.docTitle;
        }
      }
      const { t: t$1 } = i18n.global;
      class IgnoreController {
        constructor(text = true, status = false) {
          __publicField(this, "ignoreBtn");
          __publicField(this, "icon");
          __publicField(this, "text");
          this.status = status;
          this.icon = /* @__PURE__ */ core.h("i", { class: this.iconClass });
          if (text) this.text = /* @__PURE__ */ core.h("span", null, this.btnText);
          this.ignoreBtn = /* @__PURE__ */ core.h("button", { class: `${className.greyButton} nhentai-helper-btn ignore-btn` }, this.icon, " ", this.text);
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
          return this.status ? t$1("button.unignore") : t$1("button.ignore");
        }
        updateBtn() {
          this.icon.className = this.iconClass;
          if (this.text) this.text.innerText = this.btnText;
        }
      }
      const { t } = i18n.global;
      const initDetailPage = async () => {
        const progressDisplayController = new ProgressDisplayController(true, document.title);
        const { downloadBtn } = progressDisplayController;
        const pagesInput = /* @__PURE__ */ core.h(
          "input",
          {
            class: "pages-input",
            placeholder: t("input.downloadSpecifiedPages"),
            onKeydown: (e) => {
              if (e.key === "Enter") {
                downloadBtn.click();
              }
            }
          }
        );
        $(selector.infoButtons).append(downloadBtn).after(pagesInput);
        let ignoreController;
        if (settings.showIgnoreButton) {
          const gallery2 = await getGalleryInfo();
          const isDownloaded = await isDownloadedByGid(gallery2.gid);
          ignoreController = new IgnoreController(true, isDownloaded);
          const { ignoreBtn } = ignoreController;
          ignoreBtn.addEventListener("click", () => {
            const ignore = ignoreController.getStatus();
            if (ignore) unmarkAsDownloaded(gallery2.gid, gallery2.title);
            else markAsDownloaded(gallery2.gid, gallery2.title);
            ignoreController.setStatus(!ignore);
          });
          $(selector.infoButtons).append(ignoreBtn);
        }
        downloadBtn.addEventListener("click", async () => {
          var _a;
          const gallery2 = await getGalleryInfo();
          const rangeCheckers = pagesInput.value.split(",").filter((range) => /^\s*(?:\d+(?:\s*-\s*)?\d*|-\d+)\s*$/.test(range)).map((range) => {
            const [start, end] = range.split("-").map((num) => parseInt(num));
            if (Number.isNaN(start)) return (page) => page <= end;
            if (end === void 0) return (page) => page === start;
            if (Number.isNaN(end)) return (page) => page >= start;
            return (page) => start <= page && page <= end;
          });
          progressDisplayController.lockBtn();
          try {
            const downloaded = await isDownloadedByGid(gallery2.gid) || await isDownloadedByTitle(gallery2.title);
            if (downloaded && !await downloadAgainConfirm(gallery2.title.japanese || gallery2.title.english)) {
              progressDisplayController.reset();
              markAsDownloaded(gallery2.gid, gallery2.title);
              ignoreController == null ? void 0 : ignoreController.setStatus(true);
              return;
            }
            await ((_a = await downloadGalleryByInfo(createMangaDownloadInfo(gallery2), {
              progressDisplayController,
              rangeCheckers
            })) == null ? void 0 : _a());
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
      function tryOnScopeDispose(fn) {
        if (vue.getCurrentScope()) {
          vue.onScopeDispose(fn);
          return true;
        }
        return false;
      }
      function toValue(r) {
        return typeof r === "function" ? r() : vue.unref(r);
      }
      const isClient = typeof window !== "undefined" && typeof document !== "undefined";
      typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
      const toString = Object.prototype.toString;
      const isObject = (val) => toString.call(val) === "[object Object]";
      const noop = () => {
      };
      function createFilterWrapper(filter2, fn) {
        function wrapper(...args) {
          return new Promise((resolve, reject) => {
            Promise.resolve(filter2(() => fn.apply(this, args), { fn, thisArg: this, args })).then(resolve).catch(reject);
          });
        }
        return wrapper;
      }
      const bypassFilter = (invoke2) => {
        return invoke2();
      };
      function pausableFilter(extendFilter = bypassFilter) {
        const isActive = vue.ref(true);
        function pause() {
          isActive.value = false;
        }
        function resume() {
          isActive.value = true;
        }
        const eventFilter = (...args) => {
          if (isActive.value)
            extendFilter(...args);
        };
        return { isActive: vue.readonly(isActive), pause, resume, eventFilter };
      }
      function getLifeCycleTarget(target) {
        return vue.getCurrentInstance();
      }
      function watchWithFilter(source, cb, options = {}) {
        const {
          eventFilter = bypassFilter,
          ...watchOptions
        } = options;
        return vue.watch(
          source,
          createFilterWrapper(
            eventFilter,
            cb
          ),
          watchOptions
        );
      }
      function watchPausable(source, cb, options = {}) {
        const {
          eventFilter: filter2,
          ...watchOptions
        } = options;
        const { eventFilter, pause, resume, isActive } = pausableFilter(filter2);
        const stop = watchWithFilter(
          source,
          cb,
          {
            ...watchOptions,
            eventFilter
          }
        );
        return { stop, pause, resume, isActive };
      }
      function tryOnMounted(fn, sync = true, target) {
        const instance = getLifeCycleTarget();
        if (instance)
          vue.onMounted(fn, target);
        else if (sync)
          fn();
        else
          vue.nextTick(fn);
      }
      const defaultWindow = isClient ? window : void 0;
      function unrefElement(elRef) {
        var _a;
        const plain = toValue(elRef);
        return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
      }
      function useEventListener(...args) {
        let target;
        let events2;
        let listeners;
        let options;
        if (typeof args[0] === "string" || Array.isArray(args[0])) {
          [events2, listeners, options] = args;
          target = defaultWindow;
        } else {
          [target, events2, listeners, options] = args;
        }
        if (!target)
          return noop;
        if (!Array.isArray(events2))
          events2 = [events2];
        if (!Array.isArray(listeners))
          listeners = [listeners];
        const cleanups = [];
        const cleanup = () => {
          cleanups.forEach((fn) => fn());
          cleanups.length = 0;
        };
        const register = (el, event, listener, options2) => {
          el.addEventListener(event, listener, options2);
          return () => el.removeEventListener(event, listener, options2);
        };
        const stopWatch = vue.watch(
          () => [unrefElement(target), toValue(options)],
          ([el, options2]) => {
            cleanup();
            if (!el)
              return;
            const optionsClone = isObject(options2) ? { ...options2 } : options2;
            cleanups.push(
              ...events2.flatMap((event) => {
                return listeners.map((listener) => register(el, event, listener, optionsClone));
              })
            );
          },
          { immediate: true, flush: "post" }
        );
        const stop = () => {
          stopWatch();
          cleanup();
        };
        tryOnScopeDispose(stop);
        return stop;
      }
      const _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
      const globalKey = "__vueuse_ssr_handlers__";
      const handlers = /* @__PURE__ */ getHandlers();
      function getHandlers() {
        if (!(globalKey in _global))
          _global[globalKey] = _global[globalKey] || {};
        return _global[globalKey];
      }
      function getSSRHandler(key, fallback) {
        return handlers[key] || fallback;
      }
      function guessSerializerType(rawInit) {
        return rawInit == null ? "any" : rawInit instanceof Set ? "set" : rawInit instanceof Map ? "map" : rawInit instanceof Date ? "date" : typeof rawInit === "boolean" ? "boolean" : typeof rawInit === "string" ? "string" : typeof rawInit === "object" ? "object" : !Number.isNaN(rawInit) ? "number" : "any";
      }
      const StorageSerializers = {
        boolean: {
          read: (v) => v === "true",
          write: (v) => String(v)
        },
        object: {
          read: (v) => JSON.parse(v),
          write: (v) => JSON.stringify(v)
        },
        number: {
          read: (v) => Number.parseFloat(v),
          write: (v) => String(v)
        },
        any: {
          read: (v) => v,
          write: (v) => String(v)
        },
        string: {
          read: (v) => v,
          write: (v) => String(v)
        },
        map: {
          read: (v) => new Map(JSON.parse(v)),
          write: (v) => JSON.stringify(Array.from(v.entries()))
        },
        set: {
          read: (v) => new Set(JSON.parse(v)),
          write: (v) => JSON.stringify(Array.from(v))
        },
        date: {
          read: (v) => new Date(v),
          write: (v) => v.toISOString()
        }
      };
      const customStorageEventName = "vueuse-storage";
      function useStorage(key, defaults2, storage, options = {}) {
        var _a;
        const {
          flush = "pre",
          deep = true,
          listenToStorageChanges = true,
          writeDefaults = true,
          mergeDefaults = false,
          shallow,
          window: window2 = defaultWindow,
          eventFilter,
          onError = (e) => {
            console.error(e);
          },
          initOnMounted
        } = options;
        const data = (shallow ? vue.shallowRef : vue.ref)(typeof defaults2 === "function" ? defaults2() : defaults2);
        if (!storage) {
          try {
            storage = getSSRHandler("getDefaultStorage", () => {
              var _a2;
              return (_a2 = defaultWindow) == null ? void 0 : _a2.localStorage;
            })();
          } catch (e) {
            onError(e);
          }
        }
        if (!storage)
          return data;
        const rawInit = toValue(defaults2);
        const type = guessSerializerType(rawInit);
        const serializer = (_a = options.serializer) != null ? _a : StorageSerializers[type];
        const { pause: pauseWatch, resume: resumeWatch } = watchPausable(
          data,
          () => write(data.value),
          { flush, deep, eventFilter }
        );
        if (window2 && listenToStorageChanges) {
          tryOnMounted(() => {
            if (storage instanceof Storage)
              useEventListener(window2, "storage", update);
            else
              useEventListener(window2, customStorageEventName, updateFromCustomEvent);
            if (initOnMounted)
              update();
          });
        }
        if (!initOnMounted)
          update();
        function dispatchWriteEvent(oldValue, newValue) {
          if (window2) {
            const payload = {
              key,
              oldValue,
              newValue,
              storageArea: storage
            };
            window2.dispatchEvent(storage instanceof Storage ? new StorageEvent("storage", payload) : new CustomEvent(customStorageEventName, {
              detail: payload
            }));
          }
        }
        function write(v) {
          try {
            const oldValue = storage.getItem(key);
            if (v == null) {
              dispatchWriteEvent(oldValue, null);
              storage.removeItem(key);
            } else {
              const serialized = serializer.write(v);
              if (oldValue !== serialized) {
                storage.setItem(key, serialized);
                dispatchWriteEvent(oldValue, serialized);
              }
            }
          } catch (e) {
            onError(e);
          }
        }
        function read(event) {
          const rawValue = event ? event.newValue : storage.getItem(key);
          if (rawValue == null) {
            if (writeDefaults && rawInit != null)
              storage.setItem(key, serializer.write(rawInit));
            return rawInit;
          } else if (!event && mergeDefaults) {
            const value = serializer.read(rawValue);
            if (typeof mergeDefaults === "function")
              return mergeDefaults(value, rawInit);
            else if (type === "object" && !Array.isArray(value))
              return { ...rawInit, ...value };
            return value;
          } else if (typeof rawValue !== "string") {
            return rawValue;
          } else {
            return serializer.read(rawValue);
          }
        }
        function update(event) {
          if (event && event.storageArea !== storage)
            return;
          if (event && event.key == null) {
            data.value = rawInit;
            return;
          }
          if (event && event.key !== key)
            return;
          pauseWatch();
          try {
            if ((event == null ? void 0 : event.newValue) !== serializer.write(data.value))
              data.value = read(event);
          } catch (e) {
            onError(e);
          } finally {
            if (event)
              vue.nextTick(resumeWatch);
            else
              resumeWatch();
          }
        }
        function updateFromCustomEvent(event) {
          update(event.detail);
        }
        return data;
      }
      function useSessionStorage(key, initialValue, options = {}) {
        const { window: window2 = defaultWindow } = options;
        return useStorage(key, initialValue, window2 == null ? void 0 : window2.sessionStorage, options);
      }
      const _hoisted_1$1 = { class: "language-filter" };
      const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
        __name: "LanguageFilter",
        setup(__props, { expose: __expose }) {
          const { t: t2 } = i18n.global;
          const languageFilter = useSessionStorage("languageFilter", [], {
            listenToStorageChanges: false
          });
          const options = IS_NHENTAI_TO ? [
            ["japanese", "2"],
            ["english", "19"],
            ["chinese", "10197"]
          ] : IS_NHENTAI_XXX ? [
            ["japanese", "2"],
            ["english", "1"],
            ["chinese", "3"]
          ] : [
            ["japanese", "6346"],
            ["english", "12227"],
            ["chinese", "29963"]
          ];
          vue.watch(
            languageFilter,
            (val) => {
              filterLanguage(val);
            },
            { deep: true, immediate: true }
          );
          __expose({
            filterLanguage: ($node) => {
              filterLanguage(languageFilter.value, $node);
            }
          });
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createElementBlock("li", _hoisted_1$1, [
              vue.createVNode(vue.unref(elementPlus.ElSelect), {
                modelValue: vue.unref(languageFilter),
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(languageFilter) ? languageFilter.value = $event : null),
                class: "filter-select",
                multiple: "",
                "collapse-tags": "",
                "collapse-tags-tooltip": "",
                placeholder: vue.unref(t2)("common.filter")
              }, {
                default: vue.withCtx(() => [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(options), ([key, val]) => {
                    return vue.openBlock(), vue.createBlock(vue.unref(elementPlus.ElOption), {
                      key,
                      label: vue.unref(t2)(`common.abbr.${key}`),
                      value: val
                    }, {
                      default: vue.withCtx(() => [
                        vue.createTextVNode(vue.toDisplayString(vue.unref(t2)(`common.${key}`)), 1)
                      ]),
                      _: 2
                    }, 1032, ["label", "value"]);
                  }), 128))
                ]),
                _: 1
              }, 8, ["modelValue", "placeholder"])
            ]);
          };
        }
      });
      const LanguageFilter = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-e2153767"]]);
      const filterLanguage = (tags2, $node) => {
        const attrName = IS_NHENTAI_XXX ? "data-languages" : "data-tags";
        const getNode = $node ? (selector2) => $node.find(selector2) : (selector2) => $(selector2);
        getNode(selector.gallery).removeClass("nhentai-helper-hidden");
        if (tags2.length) {
          const notSelector = tags2.map((tag) => `:not([${attrName}~=${tag}])`).join("");
          getNode(`${selector.gallery}${notSelector}`).addClass("nhentai-helper-hidden");
        }
      };
      const mountLanguageFilter = () => {
        var _a;
        const menuLeft = document.querySelector(selector.menuLeft);
        if (!menuLeft) return {};
        const vnode = vue.h(LanguageFilter);
        vue.render(vnode, menuLeft);
        return ((_a = vnode.component) == null ? void 0 : _a.exposed) ?? {};
      };
      const createAppAndMount = (component, appInitFunc) => {
        const el = document.createElement("div");
        document.body.append(el);
        const app = vue.createApp(component);
        appInitFunc == null ? void 0 : appInitFunc(app);
        return app.mount(el);
      };
      const _hoisted_1 = { class: "info-label bold" };
      const _hoisted_2 = { class: "info-label bold" };
      const _hoisted_3 = { class: "bold" };
      const _hoisted_4 = { class: "info-label bold" };
      const _hoisted_5 = { class: "bold" };
      const _hoisted_6 = { class: "info-label bold" };
      const _hoisted_7 = { class: "scroll-container-inner" };
      const POPOVER_MAX_WIDTH = 720;
      const POPOVER_THUMB_MORE_COL_WIDTH = 640;
      const _sfc_main = /* @__PURE__ */ vue.defineComponent({
        __name: "GalleryMiniPopover",
        setup(__props, { expose: __expose }) {
          const TAG_TYPES = [
            "parody",
            "character",
            "tag",
            "artist",
            "group",
            "language",
            "category"
          ];
          const getTagSortIndex = (type) => {
            const index = TAG_TYPES.findIndex((t22) => t22 === type);
            return index === -1 ? 999 : index;
          };
          const { t: t2 } = useI18n();
          const visible = vue.ref(false);
          const virtualRef = vue.ref();
          const popoverRef = vue.ref();
          const popoverPlacement = vue.ref("right");
          const popoverWidth = vue.ref(0);
          const gallery2 = vue.ref(null);
          const title = vue.computed(() => {
            var _a;
            const t22 = (_a = gallery2.value) == null ? void 0 : _a.title;
            return t22 ? t22.japanese || t22.english || t22.pretty : "";
          });
          const groupedTags = vue.computed(() => {
            var _a;
            const tags2 = (_a = gallery2.value) == null ? void 0 : _a.tags;
            return tags2 ? Object.entries(groupBy(tags2, "type")).sort(
              ([a], [b]) => getTagSortIndex(a) - getTagSortIndex(b)
            ) : [];
          });
          const galleryLink = vue.computed(() => {
            var _a;
            return `${location.origin}/g/${(_a = gallery2.value) == null ? void 0 : _a.id}/`;
          });
          const pageThumbs = vue.ref([]);
          const pageThumbsColSpan = vue.computed(
            () => popoverWidth.value >= POPOVER_THUMB_MORE_COL_WIDTH ? 6 : 8
          );
          const pageThumbsColNum = vue.computed(
            () => popoverWidth.value >= POPOVER_THUMB_MORE_COL_WIDTH ? 4 : 3
          );
          const pageThumbWidth = vue.computed(
            () => (popoverWidth.value - 24 - (pageThumbsColNum.value - 1) * 8) / pageThumbsColNum.value
          );
          const pageThumbScrollHeight = vue.computed(() => Math.max(0, ...map(pageThumbs.value, "height")) * 1.5);
          const limitTagLength = (tags2, maxLength) => {
            const result = tags2.slice(0, maxLength);
            const larger = tags2.length - result.length;
            if (larger > 0) {
              result.push({ type: "__limit__", name: "__limit__", count: larger });
            }
            return result;
          };
          const isLimitTag = (tag) => tag.type === "__limit__";
          let thumbUrlTemplate;
          const getThumbInfo = ({ t: t22, w, h: h2 }, i) => {
            var _a;
            return {
              url: thumbUrlTemplate({
                mid: (_a = gallery2.value) == null ? void 0 : _a.media_id,
                filename: `${i + 1}t.${NHentaiImgExt[t22]}`
              }),
              height: w && h2 ? Math.floor(pageThumbWidth.value * Math.min(h2 / w, 1.8)) : 0
            };
          };
          const formatNumber = (num) => {
            if (num >= 1e6) return `${Math.floor(num / 1e6)}M`;
            if (num >= 1e3) return `${Math.floor(num / 1e3)}K`;
            return num;
          };
          const openTagUrl = (path) => {
            if (!path) return;
            _GM_openInTab(`${location.origin}${path}`, { active: true, setParent: true });
          };
          let loadingGid = "";
          const open2 = async (el, gid2) => {
            var _a, _b, _c;
            if (virtualRef.value === el) return;
            const rect = el.getBoundingClientRect();
            const bodyWidth = document.body.clientWidth;
            const showRight = rect.left + rect.right <= bodyWidth;
            popoverPlacement.value = showRight ? "right" : "left";
            virtualRef.value = el;
            popoverWidth.value = Math.min(
              POPOVER_MAX_WIDTH,
              Math.round(showRight ? bodyWidth - rect.right : rect.left) - 16
            );
            visible.value = true;
            gallery2.value = null;
            pageThumbs.value = [];
            try {
              loadingGid = gid2;
              if (!thumbUrlTemplate) thumbUrlTemplate = await getCompliedThumbMediaUrlTemplate(gid2);
              const loadedGallery = await getGallery(gid2);
              if (loadingGid !== gid2) return;
              gallery2.value = loadedGallery;
              pageThumbs.value = loadedGallery.images.pages.slice(0, 12).map(getThumbInfo);
              await vue.nextTick();
              (_c = (_b = (_a = popoverRef.value) == null ? void 0 : _a.popperRef) == null ? void 0 : _b.popperInstanceRef) == null ? void 0 : _c.update();
            } catch (error) {
              logger.error(error);
            } finally {
              if (loadingGid === gid2) loadingGid = "";
            }
          };
          const addPageThumbLine = () => {
            const curLength = pageThumbs.value.length;
            if (curLength >= gallery2.value.images.pages.length) return;
            const curLines = Math.ceil(curLength / pageThumbsColNum.value);
            pageThumbs.value.push(
              ...gallery2.value.images.pages.slice(curLength, (curLines + 1) * pageThumbsColNum.value).map((img, i) => getThumbInfo(img, curLength + i))
            );
          };
          const handleScrollWheel = (e) => {
            const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
            if (scrollTop + clientHeight === scrollHeight && e.deltaY > 0 || scrollTop === 0 && e.deltaY < 0) {
              e.preventDefault();
            }
          };
          const close = () => {
            if (visible.value) visible.value = false;
          };
          vue.watch(visible, (val) => {
            if (val) {
              window.addEventListener("scroll", close);
              window.addEventListener("resize", close);
            } else {
              window.removeEventListener("scroll", close);
              window.removeEventListener("resize", close);
            }
          });
          vue.onBeforeUnmount(() => {
            window.removeEventListener("scroll", close);
            window.removeEventListener("resize", close);
          });
          __expose({ open: open2 });
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createBlock(vue.unref(elementPlus.ElPopover), {
              ref_key: "popoverRef",
              ref: popoverRef,
              visible: visible.value,
              "onUpdate:visible": _cache[2] || (_cache[2] = ($event) => visible.value = $event),
              "virtual-ref": virtualRef.value,
              "virtual-triggering": "",
              placement: popoverPlacement.value,
              trigger: "contextmenu",
              width: popoverWidth.value,
              "hide-after": 0
            }, {
              default: vue.withCtx(() => [
                gallery2.value ? (vue.openBlock(), vue.createElementBlock("div", {
                  key: 0,
                  class: vue.normalizeClass(["gallery-mini-popover", `lang-${vue.unref(settings).language}`]),
                  onWheel: _cache[0] || (_cache[0] = vue.withModifiers(() => {
                  }, ["prevent"]))
                }, [
                  vue.createVNode(vue.unref(elementPlus.ElDescriptions), {
                    title: title.value,
                    column: 1
                  }, {
                    extra: vue.withCtx(() => [
                      vue.createVNode(vue.unref(elementPlus.ElButton), {
                        class: "popover-close-btn",
                        icon: vue.unref(close_bold_default),
                        circle: "",
                        text: "",
                        onClick: close
                      }, null, 8, ["icon"])
                    ]),
                    default: vue.withCtx(() => [
                      vue.createVNode(vue.unref(elementPlus.ElDescriptionsItem), null, {
                        label: vue.withCtx(() => [
                          vue.createElementVNode("span", _hoisted_1, vue.toDisplayString(vue.unref(t2)("meta.id")), 1)
                        ]),
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(elementPlus.ElLink), {
                            type: "primary",
                            target: "_blank",
                            underline: false,
                            href: galleryLink.value
                          }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode(vue.toDisplayString(gallery2.value.id), 1)
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ]),
                        _: 1
                      }),
                      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(groupedTags.value, ([type, tags2]) => {
                        return vue.openBlock(), vue.createBlock(vue.unref(elementPlus.ElDescriptionsItem), { key: type }, {
                          label: vue.withCtx(() => [
                            vue.createElementVNode("span", _hoisted_2, vue.toDisplayString(vue.unref(t2)(`meta.${type}`)), 1)
                          ]),
                          default: vue.withCtx(() => [
                            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(limitTagLength(tags2, 10), (tag) => {
                              return vue.openBlock(), vue.createBlock(vue.unref(elementPlus.ElTag), {
                                key: tag.id ?? tag.name,
                                class: vue.normalizeClass(["info-tag", { "info-tag--pointer": !isLimitTag(tag) }]),
                                type: "info",
                                effect: "dark",
                                "disable-transitions": "",
                                onClick: () => openTagUrl(tag.url)
                              }, {
                                default: vue.withCtx(() => [
                                  isLimitTag(tag) ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                                    vue.createTextVNode("+" + vue.toDisplayString(tag.count), 1)
                                  ], 64)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                                    vue.createElementVNode("span", _hoisted_3, vue.toDisplayString(tag.name), 1),
                                    vue.createTextVNode(vue.toDisplayString(tag.count ? ` | ${formatNumber(tag.count)}` : void 0), 1)
                                  ], 64))
                                ]),
                                _: 2
                              }, 1032, ["class", "onClick"]);
                            }), 128))
                          ]),
                          _: 2
                        }, 1024);
                      }), 128)),
                      gallery2.value.num_pages ? (vue.openBlock(), vue.createBlock(vue.unref(elementPlus.ElDescriptionsItem), { key: 0 }, {
                        label: vue.withCtx(() => [
                          vue.createElementVNode("span", _hoisted_4, vue.toDisplayString(vue.unref(t2)("meta.page")), 1)
                        ]),
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(elementPlus.ElTag), {
                            class: "info-tag",
                            type: "info",
                            effect: "dark",
                            "disable-transitions": ""
                          }, {
                            default: vue.withCtx(() => [
                              vue.createElementVNode("span", _hoisted_5, vue.toDisplayString(gallery2.value.num_pages), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : vue.createCommentVNode("", true),
                      gallery2.value.upload_date ? (vue.openBlock(), vue.createBlock(vue.unref(elementPlus.ElDescriptionsItem), { key: 1 }, {
                        label: vue.withCtx(() => [
                          vue.createElementVNode("span", _hoisted_6, vue.toDisplayString(vue.unref(t2)("meta.upload")), 1)
                        ]),
                        default: vue.withCtx(() => [
                          vue.createTextVNode(" " + vue.toDisplayString(new Date(gallery2.value.upload_date * 1e3).toLocaleString()), 1)
                        ]),
                        _: 1
                      })) : vue.createCommentVNode("", true)
                    ]),
                    _: 1
                  }, 8, ["title"]),
                  pageThumbs.value.length ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
                    key: 0,
                    "infinite-scroll-distance": 100,
                    class: "scroll-container",
                    style: vue.normalizeStyle({ height: `${pageThumbScrollHeight.value}px` }),
                    onWheelCapture: vue.withModifiers(handleScrollWheel, ["stop"])
                  }, [
                    vue.createElementVNode("div", _hoisted_7, [
                      vue.createVNode(vue.unref(elementPlus.ElRow), { gutter: 8 }, {
                        default: vue.withCtx(() => [
                          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(pageThumbs.value, ({ url, height }) => {
                            return vue.openBlock(), vue.createBlock(vue.unref(elementPlus.ElCol), {
                              key: url,
                              span: pageThumbsColSpan.value
                            }, {
                              default: vue.withCtx(() => [
                                vue.createVNode(vue.unref(elementPlus.ElImage), {
                                  src: url,
                                  style: vue.normalizeStyle({ "min-height": `${height}px` })
                                }, null, 8, ["src", "style"])
                              ]),
                              _: 2
                            }, 1032, ["span"]);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ])
                  ], 36)), [
                    [vue.unref(elementPlus.ElInfiniteScroll), addPageThumbLine]
                  ]) : vue.createCommentVNode("", true)
                ], 34)) : vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
                  key: 1,
                  style: { height: "700px", maxHeight: "90vh" },
                  onWheel: _cache[1] || (_cache[1] = vue.withModifiers(() => {
                  }, ["prevent"]))
                }, null, 544)), [
                  [vue.unref(elementPlus.vLoading), true]
                ])
              ]),
              _: 1
            }, 8, ["visible", "virtual-ref", "placement", "width"]);
          };
        }
      });
      const GalleryMiniPopover = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f7a715da"]]);
      const initApp = once(
        () => createAppAndMount(GalleryMiniPopover, (app) => {
          app.use(i18n);
        })
      );
      const openGalleryMiniPopover = (el, gid2) => {
        const popup = initApp();
        popup.open(el, gid2);
      };
      const initListPage = () => {
        $(selector.gallery).each(initGallery);
        const { filterLanguage: filterLanguage2 } = mountLanguageFilter();
        initShortcut();
        restoreDownloadQueue();
        const contentEl = document.querySelector(selector.galleryList);
        if (contentEl) {
          new MutationObserver((mutations) => {
            mutations.forEach(({ addedNodes }) => {
              addedNodes.forEach((node) => {
                const $el = $(node);
                $el.find(selector.gallery).each(initGallery);
                filterLanguage2 == null ? void 0 : filterLanguage2($el);
              });
            });
          }).observe(contentEl, { childList: true });
        }
      };
      const initShortcut = () => {
        const ignoreActiveElTags = /* @__PURE__ */ new Set(["INPUT", "TEXTAREA"]);
        $(document).on("keydown", (event) => {
          var _a;
          const activeElTag = ((_a = document.activeElement) == null ? void 0 : _a.tagName) || "";
          if (ignoreActiveElTags.has(activeElTag)) return;
          switch (event.key) {
            case "ArrowLeft":
              $(selector.paginationPrevious).trigger("click");
              break;
            case "ArrowRight":
              $(selector.paginationNext).trigger("click");
              break;
          }
        });
      };
      const restoreDownloadQueue = () => {
        const galleriesJson = sessionStorage.getItem("downloadQueue");
        if (!galleriesJson) return;
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
        var _a;
        const $gallery = $(this);
        if ($gallery.attr("init")) return;
        $gallery.attr("init", "true");
        $gallery.addClass("nhentai-helper-gallery");
        const $a = $gallery.find(selector.galleryCover);
        if (settings.openOnNewTab) $a.attr("target", "_blank");
        const gid2 = (_a = /\/g\/([0-9]+)/.exec($a.attr("href"))) == null ? void 0 : _a[1];
        if (!gid2) return;
        const enTitle = $gallery.find(selector.galleryCaption).text().trim();
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
        void Promise.all([isDownloadedByGid(gid2), isDownloadedByTitle({ english: enTitle })]).then(
          ([gidDownloaded, titleDownloaded]) => {
            const downloaded = gidDownloaded || titleDownloaded;
            if (downloaded) markGalleryDownloaded();
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
          }
        );
        let skipDownloadedCheck = false;
        const startDownload = async () => {
          if (!settings.autoCancelDownloadedManga) {
            progressDisplayController.lockBtn("Wait");
          }
          if (!skipDownloadedCheck && await isDownloadedByGid(gid2)) {
            const title = $gallery.find(selector.galleryCaption).text();
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
          let gallery2;
          try {
            gallery2 = await getGalleryInfo(gid2);
            galleryTitle = gallery2.title;
          } catch (error) {
            logger.error(error);
            progressDisplayController.error();
            errorRetryConfirm(ErrorAction.GET_INFO, void 0, startDownload);
            return;
          }
          if (!skipDownloadedCheck) {
            if (await isDownloadedByTitle(gallery2.title) && !await downloadAgainConfirm(gallery2.title.japanese || gallery2.title.english, true)) {
              progressDisplayController.reset();
              markAsDownloaded(gid2, gallery2.title);
              markGalleryDownloaded();
              return;
            }
            if (dlQueue.queue.some(
              ({
                info: {
                  gallery: { title }
                }
              }) => isSameTitle(title, gallery2.title)
            ) && !await downloadAgainConfirm(gallery2.title.japanese || gallery2.title.english, true)) {
              progressDisplayController.reset();
              return;
            }
          }
          addDownloadGalleryTask(gallery2, { progressDisplayController, markGalleryDownloaded });
        };
        downloadBtn.addEventListener("click", startDownload);
        this.addEventListener("contextmenu", (e) => {
          if (!settings.galleryContextmenuPreview) return;
          e.preventDefault();
          openGalleryMiniPopover(this, gid2);
        });
      };
      class StyleInjector {
        constructor(style) {
          __publicField(this, "styleNode");
          this.styleNode = /* @__PURE__ */ core.h("style", null, style);
        }
        inject() {
          document.head.append(this.styleNode);
        }
        remove() {
          this.styleNode.remove();
        }
      }
      const initOnlineViewPage = () => {
        if (!IS_NHENTAI) initViewMode();
      };
      const initViewMode = () => {
        const style = new StyleInjector(
          `${selector.mediaImage}{width:auto;max-width:calc(100vw - 20px);max-height:100vh}`
        );
        const viewModeText = ["[off]", "[on]"];
        let viewMode = _GM_getValue("online_view_mode", 0);
        applyOnlineViewStyle(!!viewMode, style);
        const btnText = /* @__PURE__ */ core.h("span", null, viewModeText[viewMode]);
        const btn = /* @__PURE__ */ core.h("button", { id: "online-view-mode-btn", class: className.greyButton }, "100% view height ", btnText);
        btn.addEventListener("click", () => {
          viewMode = 1 - viewMode;
          _GM_setValue("online_view_mode", viewMode);
          btnText.innerText = viewModeText[viewMode];
          applyOnlineViewStyle(!!viewMode, style);
        });
        $(selector.pageContainer).prepend(btn);
      };
      const applyOnlineViewStyle = (enable, style) => {
        if (enable) style.inject();
        else style.remove();
      };
      const initPage = () => {
        $("body").addClass(`nhentai-helper-${location.hostname.replace(/\./g, "_")}`);
        if (IS_PAGE_MANGA_LIST) {
          initListPage();
          applyPjax();
        } else if (IS_PAGE_MANGA_DETAIL) initDetailPage().catch(logger.error);
        else if (IS_PAGE_ONLINE_VIEW) initOnlineViewPage();
      };
      const applyPjax = () => {
        $(document).pjax(selector.pjaxTrigger, {
          container: selector.pjaxTarget,
          fragment: selector.pjaxTarget,
          timeout: 1e4
        });
        $(document).on("pjax:end", () => {
          $(selector.pjaxRemoveParam).each(function() {
            const $this = $(this);
            const href = $this.attr("href");
            if (!href || href.startsWith("#")) return;
            const isPathname = href.startsWith("/");
            const url = isPathname ? new URL(href, location.origin) : new URL(href);
            url.searchParams.delete("_pjax");
            $this.attr("href", isPathname ? `${url.pathname}${url.search}` : url.href);
          });
          applyLazyLoad();
        });
      };
      const applyLazyLoad = () => {
        const { _n_app } = _unsafeWindow;
        if (_n_app) {
          _n_app.install_lazy_loader();
          _n_app.install_blacklisting();
        }
      };
      const initSettingsDialogApp = once(
        () => createAppAndMount(SettingsDialog, (app) => {
          app.use(i18n);
        })
      );
      const openSettingsDialog = () => {
        const dialog = initSettingsDialogApp();
        dialog.open();
      };
      createAppAndMount(_sfc_main$4);
      initPage();
      _GM_registerMenuCommand(i18n.global.t("common.settings"), openSettingsDialog);
    }
  });
  require_main_001();

})(jQuery, Vue, ElementPlus);