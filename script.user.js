// ==UserScript==
// @name               nHentai Helper
// @name:zh-CN         nHentai 助手
// @name:zh-TW         nHentai 助手
// @namespace          https://github.com/Tsuk1ko
// @version            3.13.0
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
// @require            https://unpkg.com/vue@3.4.22/dist/vue.global.prod.js
// @require            data:application/javascript,window.Vue%3DVue%3B
// @require            https://unpkg.com/element-plus@2.7.0/dist/index.full.min.js
// @require            https://unpkg.com/jquery@3.7.1/dist/jquery.slim.min.js
// @resource           element-plus-css  https://unpkg.com/element-plus@2.7.0/dist/index.css
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

(t=>{if(typeof GM_addStyle=="function"){GM_addStyle(t);return}const o=document.createElement("style");o.textContent=t,document.head.append(o)})(' .nhentai-helper-btn:disabled{cursor:wait}.gallery>.nhentai-helper-btn{position:absolute;top:0;min-width:42px;opacity:.8}.gallery:hover>.nhentai-helper-btn{opacity:1}.gallery .download-zip-btn{left:0}.gallery .ignore-btn{display:none;right:0}.gallery:hover .ignore-btn{display:block}#page-container{position:relative}@media screen and (max-width: 768px){#page-container{padding-top:40px}}#online-view-mode-btn{position:absolute;right:0;top:0;margin:0}.btn-noty-green{background-color:#66bb6a!important}.btn-noty-blue{background-color:#42a5f5!important}.btn-noty:hover{filter:brightness(1.15)}.noty_buttons{padding-top:0!important}.pages-input{-webkit-appearance:none;-moz-appearance:none;appearance:none;display:inline-block;border-radius:3px;padding:0 .1em 0 1em;font-size:1em;width:100%;height:40px;border:0;vertical-align:top;margin-top:5px}.gallery.downloaded .caption{color:#999}.noty_close_button{display:none}.noty_layout_mixin,#noty_layout__top,#noty_layout__topLeft,#noty_layout__topCenter,#noty_layout__topRight,#noty_layout__bottom,#noty_layout__bottomLeft,#noty_layout__bottomCenter,#noty_layout__bottomRight,#noty_layout__center,#noty_layout__centerLeft,#noty_layout__centerRight{position:fixed;margin:0;padding:0;z-index:9999999;-webkit-transform:translateZ(0) scale(1,1);transform:translateZ(0) scale(1);-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-font-smoothing:subpixel-antialiased;filter:blur(0);-webkit-filter:blur(0);max-width:90%}#noty_layout__top{top:0;left:5%;width:90%}#noty_layout__topLeft{top:20px;left:20px;width:325px}#noty_layout__topCenter{top:5%;left:50%;width:325px;-webkit-transform:translate(-webkit-calc(-50% - .5px)) translateZ(0) scale(1,1);transform:translate(calc(-50% - .5px)) translateZ(0) scale(1)}#noty_layout__topRight{top:20px;right:20px;width:325px}#noty_layout__bottom{bottom:0;left:5%;width:90%}#noty_layout__bottomLeft{bottom:20px;left:20px;width:325px}#noty_layout__bottomCenter{bottom:5%;left:50%;width:325px;-webkit-transform:translate(-webkit-calc(-50% - .5px)) translateZ(0) scale(1,1);transform:translate(calc(-50% - .5px)) translateZ(0) scale(1)}#noty_layout__bottomRight{bottom:20px;right:20px;width:325px}#noty_layout__center{top:50%;left:50%;width:325px;-webkit-transform:translate(-webkit-calc(-50% - .5px),-webkit-calc(-50% - .5px)) translateZ(0) scale(1,1);transform:translate(calc(-50% - .5px),calc(-50% - .5px)) translateZ(0) scale(1)}#noty_layout__centerLeft{top:50%;left:20px;width:325px;-webkit-transform:translate(0,-webkit-calc(-50% - .5px)) translateZ(0) scale(1,1);transform:translateY(calc(-50% - .5px)) translateZ(0) scale(1)}#noty_layout__centerRight{top:50%;right:20px;width:325px;-webkit-transform:translate(0,-webkit-calc(-50% - .5px)) translateZ(0) scale(1,1);transform:translateY(calc(-50% - .5px)) translateZ(0) scale(1)}.noty_progressbar{display:none}.noty_has_timeout.noty_has_progressbar .noty_progressbar{display:block;position:absolute;left:0;bottom:0;height:3px;width:100%;background-color:#646464;opacity:.2;filter:alpha(opacity=10)}.noty_bar{-webkit-backface-visibility:hidden;-webkit-transform:translate(0,0) translateZ(0) scale(1,1);-ms-transform:translate(0,0) scale(1,1);transform:translate(0) scale(1);-webkit-font-smoothing:subpixel-antialiased;overflow:hidden}.noty_effects_open{opacity:0;-webkit-transform:translate(50%);-ms-transform:translate(50%);transform:translate(50%);-webkit-animation:noty_anim_in .5s cubic-bezier(.68,-.55,.265,1.55);animation:noty_anim_in .5s cubic-bezier(.68,-.55,.265,1.55);-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.noty_effects_close{-webkit-animation:noty_anim_out .5s cubic-bezier(.68,-.55,.265,1.55);animation:noty_anim_out .5s cubic-bezier(.68,-.55,.265,1.55);-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.noty_fix_effects_height{-webkit-animation:noty_anim_height 75ms ease-out;animation:noty_anim_height 75ms ease-out}.noty_close_with_click{cursor:pointer}.noty_close_button{position:absolute;top:2px;right:2px;font-weight:700;width:20px;height:20px;text-align:center;line-height:20px;background-color:#0000000d;border-radius:2px;cursor:pointer;-webkit-transition:all .2s ease-out;transition:all .2s ease-out}.noty_close_button:hover{background-color:#0000001a}.noty_modal{position:fixed;width:100%;height:100%;background-color:#000;z-index:10000;opacity:.3;left:0;top:0}.noty_modal.noty_modal_open{opacity:0;-webkit-animation:noty_modal_in .3s ease-out;animation:noty_modal_in .3s ease-out}.noty_modal.noty_modal_close{-webkit-animation:noty_modal_out .3s ease-out;animation:noty_modal_out .3s ease-out;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}@-webkit-keyframes noty_modal_in{to{opacity:.3}}@keyframes noty_modal_in{to{opacity:.3}}@-webkit-keyframes noty_modal_out{to{opacity:0}}@keyframes noty_modal_out{to{opacity:0}}@-webkit-keyframes noty_anim_in{to{-webkit-transform:translate(0);transform:translate(0);opacity:1}}@keyframes noty_anim_in{to{-webkit-transform:translate(0);transform:translate(0);opacity:1}}@-webkit-keyframes noty_anim_out{to{-webkit-transform:translate(50%);transform:translate(50%);opacity:0}}@keyframes noty_anim_out{to{-webkit-transform:translate(50%);transform:translate(50%);opacity:0}}@-webkit-keyframes noty_anim_height{to{height:0}}@keyframes noty_anim_height{to{height:0}}.noty_theme__relax.noty_bar{margin:4px 0;overflow:hidden;border-radius:2px;position:relative}.noty_theme__relax.noty_bar .noty_body{padding:10px}.noty_theme__relax.noty_bar .noty_buttons{border-top:1px solid #e7e7e7;padding:5px 10px}.noty_theme__relax.noty_type__alert,.noty_theme__relax.noty_type__notification{background-color:#fff;border:1px solid #dedede;color:#444}.noty_theme__relax.noty_type__warning{background-color:#ffeaa8;border:1px solid #FFC237;color:#826200}.noty_theme__relax.noty_type__warning .noty_buttons{border-color:#dfaa30}.noty_theme__relax.noty_type__error{background-color:#ff8181;border:1px solid #e25353;color:#fff}.noty_theme__relax.noty_type__error .noty_buttons{border-color:#8b0000}.noty_theme__relax.noty_type__info,.noty_theme__relax.noty_type__information{background-color:#78c5e7;border:1px solid #3badd6;color:#fff}.noty_theme__relax.noty_type__info .noty_buttons,.noty_theme__relax.noty_type__information .noty_buttons{border-color:#0b90c4}.noty_theme__relax.noty_type__success{background-color:#bcf5bc;border:1px solid #7cdd77;color:#006400}.noty_theme__relax.noty_type__success .noty_buttons{border-color:#50c24e}.noty_theme__metroui.noty_bar{margin:4px 0;overflow:hidden;position:relative;box-shadow:#0000004c 0 0 5px}.noty_theme__metroui.noty_bar .noty_progressbar{position:absolute;left:0;bottom:0;height:3px;width:100%;background-color:#000;opacity:.2;filter:alpha(opacity=20)}.noty_theme__metroui.noty_bar .noty_body{padding:1.25em;font-size:14px}.noty_theme__metroui.noty_bar .noty_buttons{padding:0 10px .5em}.noty_theme__metroui.noty_type__alert,.noty_theme__metroui.noty_type__notification{background-color:#fff;color:#1d1d1d}.noty_theme__metroui.noty_type__warning{background-color:#fa6800;color:#fff}.noty_theme__metroui.noty_type__error{background-color:#ce352c;color:#fff}.noty_theme__metroui.noty_type__info,.noty_theme__metroui.noty_type__information{background-color:#1ba1e2;color:#fff}.noty_theme__metroui.noty_type__success{background-color:#60a917;color:#fff}.noty_theme__mint.noty_bar{margin:4px 0;overflow:hidden;border-radius:2px;position:relative}.noty_theme__mint.noty_bar .noty_body{padding:10px;font-size:14px}.noty_theme__mint.noty_bar .noty_buttons{padding:10px}.noty_theme__mint.noty_type__alert,.noty_theme__mint.noty_type__notification{background-color:#fff;border-bottom:1px solid #D1D1D1;color:#2f2f2f}.noty_theme__mint.noty_type__warning{background-color:#ffae42;border-bottom:1px solid #E89F3C;color:#fff}.noty_theme__mint.noty_type__error{background-color:#de636f;border-bottom:1px solid #CA5A65;color:#fff}.noty_theme__mint.noty_type__info,.noty_theme__mint.noty_type__information{background-color:#7f7eff;border-bottom:1px solid #7473E8;color:#fff}.noty_theme__mint.noty_type__success{background-color:#afc765;border-bottom:1px solid #A0B55C;color:#fff}.noty_theme__sunset.noty_bar{margin:4px 0;overflow:hidden;border-radius:2px;position:relative}.noty_theme__sunset.noty_bar .noty_body{padding:10px;font-size:14px;text-shadow:1px 1px 1px rgba(0,0,0,.1)}.noty_theme__sunset.noty_bar .noty_buttons{padding:10px}.noty_theme__sunset.noty_type__alert,.noty_theme__sunset.noty_type__notification{background-color:#073b4c;color:#fff}.noty_theme__sunset.noty_type__alert .noty_progressbar,.noty_theme__sunset.noty_type__notification .noty_progressbar{background-color:#fff}.noty_theme__sunset.noty_type__warning{background-color:#ffd166;color:#fff}.noty_theme__sunset.noty_type__error{background-color:#ef476f;color:#fff}.noty_theme__sunset.noty_type__error .noty_progressbar{opacity:.4}.noty_theme__sunset.noty_type__info,.noty_theme__sunset.noty_type__information{background-color:#118ab2;color:#fff}.noty_theme__sunset.noty_type__info .noty_progressbar,.noty_theme__sunset.noty_type__information .noty_progressbar{opacity:.6}.noty_theme__sunset.noty_type__success{background-color:#06d6a0;color:#fff}.noty_theme__bootstrap-v3.noty_bar{margin:4px 0;overflow:hidden;position:relative;border:1px solid transparent;border-radius:4px}.noty_theme__bootstrap-v3.noty_bar .noty_body{padding:15px}.noty_theme__bootstrap-v3.noty_bar .noty_buttons{padding:10px}.noty_theme__bootstrap-v3.noty_bar .noty_close_button{font-size:21px;font-weight:700;line-height:1;color:#000;text-shadow:0 1px 0 #fff;filter:alpha(opacity=20);opacity:.2;background:transparent}.noty_theme__bootstrap-v3.noty_bar .noty_close_button:hover{background:transparent;text-decoration:none;cursor:pointer;filter:alpha(opacity=50);opacity:.5}.noty_theme__bootstrap-v3.noty_type__alert,.noty_theme__bootstrap-v3.noty_type__notification{background-color:#fff;color:inherit}.noty_theme__bootstrap-v3.noty_type__warning{background-color:#fcf8e3;color:#8a6d3b;border-color:#faebcc}.noty_theme__bootstrap-v3.noty_type__error{background-color:#f2dede;color:#a94442;border-color:#ebccd1}.noty_theme__bootstrap-v3.noty_type__info,.noty_theme__bootstrap-v3.noty_type__information{background-color:#d9edf7;color:#31708f;border-color:#bce8f1}.noty_theme__bootstrap-v3.noty_type__success{background-color:#dff0d8;color:#3c763d;border-color:#d6e9c6}.noty_theme__bootstrap-v4.noty_bar{margin:4px 0;overflow:hidden;position:relative;border:1px solid transparent;border-radius:.25rem}.noty_theme__bootstrap-v4.noty_bar .noty_body{padding:.75rem 1.25rem}.noty_theme__bootstrap-v4.noty_bar .noty_buttons{padding:10px}.noty_theme__bootstrap-v4.noty_bar .noty_close_button{font-size:1.5rem;font-weight:700;line-height:1;color:#000;text-shadow:0 1px 0 #fff;filter:alpha(opacity=20);opacity:.5;background:transparent}.noty_theme__bootstrap-v4.noty_bar .noty_close_button:hover{background:transparent;text-decoration:none;cursor:pointer;filter:alpha(opacity=50);opacity:.75}.noty_theme__bootstrap-v4.noty_type__alert,.noty_theme__bootstrap-v4.noty_type__notification{background-color:#fff;color:inherit}.noty_theme__bootstrap-v4.noty_type__warning{background-color:#fcf8e3;color:#8a6d3b;border-color:#faebcc}.noty_theme__bootstrap-v4.noty_type__error{background-color:#f2dede;color:#a94442;border-color:#ebccd1}.noty_theme__bootstrap-v4.noty_type__info,.noty_theme__bootstrap-v4.noty_type__information{background-color:#d9edf7;color:#31708f;border-color:#bce8f1}.noty_theme__bootstrap-v4.noty_type__success{background-color:#dff0d8;color:#3c763d;border-color:#d6e9c6}.noty_theme__semanticui.noty_bar{margin:4px 0;overflow:hidden;position:relative;border:1px solid transparent;font-size:1em;border-radius:.28571429rem;box-shadow:0 0 0 1px #22242638 inset,0 0 0 0 transparent}.noty_theme__semanticui.noty_bar .noty_body{padding:1em 1.5em;line-height:1.4285em}.noty_theme__semanticui.noty_bar .noty_buttons{padding:10px}.noty_theme__semanticui.noty_type__alert,.noty_theme__semanticui.noty_type__notification{background-color:#f8f8f9;color:#000000de}.noty_theme__semanticui.noty_type__warning{background-color:#fffaf3;color:#573a08;box-shadow:0 0 0 1px #c9ba9b inset,0 0 0 0 transparent}.noty_theme__semanticui.noty_type__error{background-color:#fff6f6;color:#9f3a38;box-shadow:0 0 0 1px #e0b4b4 inset,0 0 0 0 transparent}.noty_theme__semanticui.noty_type__info,.noty_theme__semanticui.noty_type__information{background-color:#f8ffff;color:#276f86;box-shadow:0 0 0 1px #a9d5de inset,0 0 0 0 transparent}.noty_theme__semanticui.noty_type__success{background-color:#fcfff5;color:#2c662d;box-shadow:0 0 0 1px #a3c293 inset,0 0 0 0 transparent}.noty_theme__nest.noty_bar{margin:0 0 15px;overflow:hidden;border-radius:2px;position:relative;box-shadow:#00000019 5px 4px 10px}.noty_theme__nest.noty_bar .noty_body{padding:10px;font-size:14px;text-shadow:1px 1px 1px rgba(0,0,0,.1)}.noty_theme__nest.noty_bar .noty_buttons{padding:10px}.noty_layout .noty_theme__nest.noty_bar{z-index:5}.noty_layout .noty_theme__nest.noty_bar:nth-child(2){position:absolute;top:0;margin-top:4px;margin-right:-4px;margin-left:4px;z-index:4;width:100%}.noty_layout .noty_theme__nest.noty_bar:nth-child(3){position:absolute;top:0;margin-top:8px;margin-right:-8px;margin-left:8px;z-index:3;width:100%}.noty_layout .noty_theme__nest.noty_bar:nth-child(4){position:absolute;top:0;margin-top:12px;margin-right:-12px;margin-left:12px;z-index:2;width:100%}.noty_layout .noty_theme__nest.noty_bar:nth-child(5){position:absolute;top:0;margin-top:16px;margin-right:-16px;margin-left:16px;z-index:1;width:100%}.noty_layout .noty_theme__nest.noty_bar:nth-child(n+6){position:absolute;top:0;margin-top:20px;margin-right:-20px;margin-left:20px;z-index:-1;width:100%}#noty_layout__bottomLeft .noty_theme__nest.noty_bar:nth-child(2),#noty_layout__topLeft .noty_theme__nest.noty_bar:nth-child(2){margin-top:4px;margin-left:-4px;margin-right:4px}#noty_layout__bottomLeft .noty_theme__nest.noty_bar:nth-child(3),#noty_layout__topLeft .noty_theme__nest.noty_bar:nth-child(3){margin-top:8px;margin-left:-8px;margin-right:8px}#noty_layout__bottomLeft .noty_theme__nest.noty_bar:nth-child(4),#noty_layout__topLeft .noty_theme__nest.noty_bar:nth-child(4){margin-top:12px;margin-left:-12px;margin-right:12px}#noty_layout__bottomLeft .noty_theme__nest.noty_bar:nth-child(5),#noty_layout__topLeft .noty_theme__nest.noty_bar:nth-child(5){margin-top:16px;margin-left:-16px;margin-right:16px}#noty_layout__bottomLeft .noty_theme__nest.noty_bar:nth-child(n+6),#noty_layout__topLeft .noty_theme__nest.noty_bar:nth-child(n+6){margin-top:20px;margin-left:-20px;margin-right:20px}.noty_theme__nest.noty_type__alert,.noty_theme__nest.noty_type__notification{background-color:#073b4c;color:#fff}.noty_theme__nest.noty_type__alert .noty_progressbar,.noty_theme__nest.noty_type__notification .noty_progressbar{background-color:#fff}.noty_theme__nest.noty_type__warning{background-color:#ffd166;color:#fff}.noty_theme__nest.noty_type__error{background-color:#ef476f;color:#fff}.noty_theme__nest.noty_type__error .noty_progressbar{opacity:.4}.noty_theme__nest.noty_type__info,.noty_theme__nest.noty_type__information{background-color:#118ab2;color:#fff}.noty_theme__nest.noty_type__info .noty_progressbar,.noty_theme__nest.noty_type__information .noty_progressbar{opacity:.6}.noty_theme__nest.noty_type__success{background-color:#06d6a0;color:#fff}.noty_theme__light.noty_bar{margin:4px 0;overflow:hidden;border-radius:2px;position:relative}.noty_theme__light.noty_bar .noty_body{padding:10px}.noty_theme__light.noty_bar .noty_buttons{border-top:1px solid #e7e7e7;padding:5px 10px}.noty_theme__light.noty_type__alert,.noty_theme__light.noty_type__notification{background-color:#fff;border:1px solid #dedede;color:#444}.noty_theme__light.noty_type__warning{background-color:#ffeaa8;border:1px solid #FFC237;color:#826200}.noty_theme__light.noty_type__warning .noty_buttons{border-color:#dfaa30}.noty_theme__light.noty_type__error{background-color:#ed7000;border:1px solid #e25353;color:#fff}.noty_theme__light.noty_type__error .noty_buttons{border-color:#8b0000}.noty_theme__light.noty_type__info,.noty_theme__light.noty_type__information{background-color:#78c5e7;border:1px solid #3badd6;color:#fff}.noty_theme__light.noty_type__info .noty_buttons,.noty_theme__light.noty_type__information .noty_buttons{border-color:#0b90c4}.noty_theme__light.noty_type__success{background-color:#57c880;border:1px solid #7cdd77;color:#006400}.noty_theme__light.noty_type__success .noty_buttons{border-color:#50c24e}.download-item[data-v-83b954f2]{position:relative;white-space:nowrap;padding:2px;overflow:visible}.download-item--can-cancel[data-v-83b954f2]:hover{width:calc(100% - 30px)}.download-item__cancel[data-v-83b954f2]{cursor:pointer;position:absolute;top:0;right:-30px;color:#f44336;font-size:20px;line-height:30px;width:30px}.download-item__title[data-v-83b954f2]{overflow:hidden;text-overflow:ellipsis;text-align:left}.download-item__progress[data-v-83b954f2]{background-color:#0000ff80;line-height:10px}.download-item--error .download-item__progress[data-v-83b954f2]{background-color:#ff000080}.download-item--compressing .download-item__progress[data-v-83b954f2]{background-color:#00ff0080}.download-item__progress-text[data-v-83b954f2]{transform:scale(.8)}#download-panel[data-v-f37e74c3]{overflow-x:hidden;position:fixed;top:20vh;right:0;width:calc(50vw - 620px);max-width:300px;min-width:150px;max-height:60vh;background-color:#000000b3;z-index:100;font-size:12px;overflow-y:scroll}#download-panel[data-v-f37e74c3]::-webkit-scrollbar{width:6px;background-color:#000000b3}#download-panel[data-v-f37e74c3]::-webkit-scrollbar-thumb{background-color:#fff9}.nhentai-helper-setting-help-buttons[data-v-35ed07a0]{float:left;position:absolute}.inline-item[data-v-35ed07a0]{display:inline-block}.inline-item[data-v-35ed07a0]:not(:last-of-type){margin-right:8px}.inline-item__name[data-v-35ed07a0]{margin-right:4px;-webkit-user-select:none;user-select:none}#nhentai-helper-setting-dialog .asterisk-example:before{content:"*";color:var(--el-color-danger);margin-right:4px}#nhentai-helper-setting-dialog label{font-weight:unset}#nhentai-helper-setting-dialog input:not([type=file]):not([type=checkbox]){background:inherit;color:var(--el-input-text-color, var(--el-text-color-regular))}#nhentai-helper-setting-dialog .el-input.is-disabled .el-input__inner{color:var(--el-disabled-text-color)}#nhentai-helper-setting-dialog .el-slider__stop{border:solid 1px var(--el-slider-runway-bg-color)}#nhentai-helper-setting-dialog .el-form-item:last-of-type{margin-bottom:0}#nhentai-helper-setting-dialog .el-form-item.refresh-required>.el-form-item__label-wrap>.el-form-item__label:after{content:"*";color:var(--el-color-danger);margin-left:4px}#nhentai-helper-setting-dialog .el-divider__text{color:var(--el-text-color-secondary);-webkit-user-select:none;user-select:none}#nhentai-helper-setting-dialog .m-l-16{margin-left:16px}#nhentai-helper-setting-dialog .m-b-32{margin-bottom:32px}#nhentai-helper-setting-dialog .no-sl,#nhentai-helper-setting-dialog .el-form-item__label{-webkit-user-select:none;user-select:none}#nhentai-helper-setting-dialog .el-table .el-input__prefix,#nhentai-helper-setting-dialog .el-table .el-input__suffix{line-height:30px}#nhentai-helper-setting-dialog .el-table__empty-block{display:none}.el-select-dropdown{-webkit-user-select:none;user-select:none}.language-filter[data-v-73f7b9fb]{padding-left:10px}.filter-select[data-v-73f7b9fb]{width:140px;margin-right:-140px}.filter-select[data-v-73f7b9fb] .el-input__inner{color:var(--el-input-text-color, var(--el-text-color-regular))!important;background:0 0!important}@media screen and (max-width: 644px){.language-filter[data-v-73f7b9fb]{padding:10px 0}.filter-select[data-v-73f7b9fb]{margin-right:0}} ');

(function ($, vue, elementPlus) {
  'use strict';

  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  var require_main_001 = __commonJS({
    "main-hERSRxmG.js"(exports, module) {
      var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
      var _GM_openInTab = /* @__PURE__ */ (() => typeof GM_openInTab != "undefined" ? GM_openInTab : void 0)();
      var _GM_registerMenuCommand = /* @__PURE__ */ (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
      var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
      var _GM_xmlhttpRequest = /* @__PURE__ */ (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
      var _unsafeWindow = /* @__PURE__ */ (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
      var _monkeyWindow = /* @__PURE__ */ (() => window)();
      const WORKER_THREAD_NUM = Math.max(navigator.hardwareConcurrency - 1, 1);
      const { pathname, host } = location;
      const IS_PAGE_MANGA_DETAIL = /^\/g\/[0-9]+\/?(\?.*)?$/.test(pathname);
      const IS_PAGE_ONLINE_VIEW = /^\/g\/[0-9]+(\/list)?\/[0-9]+\/?(\?.*)?$/.test(pathname);
      const IS_PAGE_MANGA_LIST = !IS_PAGE_MANGA_DETAIL && !IS_PAGE_ONLINE_VIEW && document.getElementsByClassName("gallery").length > 0;
      const IS_NHENTAI = host === "nhentai.net";
      const IS_NHENTAI_TO = host === "nhentai.to" || host === "nhentai.website";
      const MEDIA_URL_TEMPLATE_KEY = `media_url_template_${host}`;
      const isNodeOrElement = typeof Node === "function" ? (val) => val instanceof Node : (val) => val && typeof val === "object" && typeof val.nodeType === "number" && typeof val.nodeName === "string";
      if (IS_NHENTAI) {
        if (_GM_getValue("prevent_console_clear", false) || localStorage.getItem("NHENTAI_HELPER_DEBUG")) {
          const c = _unsafeWindow.console;
          c._clear = c.clear;
          c.clear = () => {
          };
          c._log = c.log;
          c.log = (...args) => {
            if (args.length === 1 && isNodeOrElement(args[0]))
              return;
            c._log(...args);
          };
        }
      }
      const logger = {
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
        function fnPjax(selector, container, options) {
          options = optionsFor(container, options);
          return this.on("click.pjax", selector, function(event) {
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
          if (!options.data)
            options.data = {};
          if ($2.isArray(options.data)) {
            options.data.push({ name: "_pjax", value: options.container });
          } else {
            options.data._pjax = options.container;
          }
          function fire(type, args, props) {
            if (!props)
              props = {};
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
            if (hash)
              url.hash = hash;
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
            if (container.title)
              document.title = container.title;
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
              if (target)
                scrollTo = $2(target).offset().top;
            }
            if (typeof scrollTo == "number")
              $2(window).scrollTop(scrollTo);
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
            if (initialPop && initialURL == state.url)
              return;
            if (previousState) {
              if (previousState.id === state.id)
                return;
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
                if (state.title)
                  document.title = state.title;
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
            if (!this.src)
              $2._data(this, "globalEval", false);
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
        function findAll(elems, selector) {
          return elems.filter(selector).add(elems.find(selector));
        }
        function parseHTML(html2) {
          return $2.parseHTML(html2, document, true);
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
          if (obj.title)
            obj.title = $2.trim(obj.title);
          return obj;
        }
        function executeScriptTags(scripts) {
          if (!scripts)
            return;
          var existingScripts = $2("script[src]");
          scripts.each(function() {
            var src = this.src;
            var matchedScripts = existingScripts.filter(function() {
              return this.src === src;
            });
            if (matchedScripts.length)
              return;
            var script = document.createElement("script");
            var type = $2(this).attr("type");
            if (type)
              script.type = type;
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
          if (id)
            delete cacheMapping[id];
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
      const baseSetToString$1 = baseSetToString;
      var setToString = shortOut(baseSetToString$1);
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
        var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
        while (fromRight ? index-- : ++index < length) {
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
      function baseSlice(array, start, end) {
        var index = -1, length = array.length;
        if (start < 0) {
          start = -start > length ? 0 : length + start;
        }
        end = end > length ? length : end;
        if (end < 0) {
          end += length;
        }
        length = start > end ? 0 : end - start >>> 0;
        start >>>= 0;
        var result = Array(length);
        while (++index < length) {
          result[index] = array[index + start];
        }
        return result;
      }
      function castSlice(array, start, end) {
        var length = array.length;
        end = end === void 0 ? length : end;
        return !start && end >= length ? array : baseSlice(array, start, end);
      }
      var rsAstralRange$2 = "\\ud800-\\udfff", rsComboMarksRange$3 = "\\u0300-\\u036f", reComboHalfMarksRange$3 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$3 = "\\u20d0-\\u20ff", rsComboRange$3 = rsComboMarksRange$3 + reComboHalfMarksRange$3 + rsComboSymbolsRange$3, rsVarRange$2 = "\\ufe0e\\ufe0f";
      var rsZWJ$2 = "\\u200d";
      var reHasUnicode = RegExp("[" + rsZWJ$2 + rsAstralRange$2 + rsComboRange$3 + rsVarRange$2 + "]");
      function hasUnicode(string) {
        return reHasUnicode.test(string);
      }
      function asciiToArray(string) {
        return string.split("");
      }
      var rsAstralRange$1 = "\\ud800-\\udfff", rsComboMarksRange$2 = "\\u0300-\\u036f", reComboHalfMarksRange$2 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$2 = "\\u20d0-\\u20ff", rsComboRange$2 = rsComboMarksRange$2 + reComboHalfMarksRange$2 + rsComboSymbolsRange$2, rsVarRange$1 = "\\ufe0e\\ufe0f";
      var rsAstral = "[" + rsAstralRange$1 + "]", rsCombo$2 = "[" + rsComboRange$2 + "]", rsFitz$1 = "\\ud83c[\\udffb-\\udfff]", rsModifier$1 = "(?:" + rsCombo$2 + "|" + rsFitz$1 + ")", rsNonAstral$1 = "[^" + rsAstralRange$1 + "]", rsRegional$1 = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair$1 = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsZWJ$1 = "\\u200d";
      var reOptMod$1 = rsModifier$1 + "?", rsOptVar$1 = "[" + rsVarRange$1 + "]?", rsOptJoin$1 = "(?:" + rsZWJ$1 + "(?:" + [rsNonAstral$1, rsRegional$1, rsSurrPair$1].join("|") + ")" + rsOptVar$1 + reOptMod$1 + ")*", rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1, rsSymbol = "(?:" + [rsNonAstral$1 + rsCombo$2 + "?", rsCombo$2, rsRegional$1, rsSurrPair$1, rsAstral].join("|") + ")";
      var reUnicode = RegExp(rsFitz$1 + "(?=" + rsFitz$1 + ")|" + rsSymbol + rsSeq$1, "g");
      function unicodeToArray(string) {
        return string.match(reUnicode) || [];
      }
      function stringToArray(string) {
        return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
      }
      function createCaseFirst(methodName) {
        return function(string) {
          string = toString$1(string);
          var strSymbols = hasUnicode(string) ? stringToArray(string) : void 0;
          var chr = strSymbols ? strSymbols[0] : string.charAt(0);
          var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
          return chr[methodName]() + trailing;
        };
      }
      var upperFirst = createCaseFirst("toUpperCase");
      function capitalize$1(string) {
        return upperFirst(toString$1(string).toLowerCase());
      }
      function arrayReduce(array, iteratee, accumulator, initAccum) {
        var index = -1, length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[++index];
        }
        while (++index < length) {
          accumulator = iteratee(accumulator, array[index], index, array);
        }
        return accumulator;
      }
      function basePropertyOf(object) {
        return function(key) {
          return object == null ? void 0 : object[key];
        };
      }
      var deburredLetters = {
        // Latin-1 Supplement block.
        "À": "A",
        "Á": "A",
        "Â": "A",
        "Ã": "A",
        "Ä": "A",
        "Å": "A",
        "à": "a",
        "á": "a",
        "â": "a",
        "ã": "a",
        "ä": "a",
        "å": "a",
        "Ç": "C",
        "ç": "c",
        "Ð": "D",
        "ð": "d",
        "È": "E",
        "É": "E",
        "Ê": "E",
        "Ë": "E",
        "è": "e",
        "é": "e",
        "ê": "e",
        "ë": "e",
        "Ì": "I",
        "Í": "I",
        "Î": "I",
        "Ï": "I",
        "ì": "i",
        "í": "i",
        "î": "i",
        "ï": "i",
        "Ñ": "N",
        "ñ": "n",
        "Ò": "O",
        "Ó": "O",
        "Ô": "O",
        "Õ": "O",
        "Ö": "O",
        "Ø": "O",
        "ò": "o",
        "ó": "o",
        "ô": "o",
        "õ": "o",
        "ö": "o",
        "ø": "o",
        "Ù": "U",
        "Ú": "U",
        "Û": "U",
        "Ü": "U",
        "ù": "u",
        "ú": "u",
        "û": "u",
        "ü": "u",
        "Ý": "Y",
        "ý": "y",
        "ÿ": "y",
        "Æ": "Ae",
        "æ": "ae",
        "Þ": "Th",
        "þ": "th",
        "ß": "ss",
        // Latin Extended-A block.
        "Ā": "A",
        "Ă": "A",
        "Ą": "A",
        "ā": "a",
        "ă": "a",
        "ą": "a",
        "Ć": "C",
        "Ĉ": "C",
        "Ċ": "C",
        "Č": "C",
        "ć": "c",
        "ĉ": "c",
        "ċ": "c",
        "č": "c",
        "Ď": "D",
        "Đ": "D",
        "ď": "d",
        "đ": "d",
        "Ē": "E",
        "Ĕ": "E",
        "Ė": "E",
        "Ę": "E",
        "Ě": "E",
        "ē": "e",
        "ĕ": "e",
        "ė": "e",
        "ę": "e",
        "ě": "e",
        "Ĝ": "G",
        "Ğ": "G",
        "Ġ": "G",
        "Ģ": "G",
        "ĝ": "g",
        "ğ": "g",
        "ġ": "g",
        "ģ": "g",
        "Ĥ": "H",
        "Ħ": "H",
        "ĥ": "h",
        "ħ": "h",
        "Ĩ": "I",
        "Ī": "I",
        "Ĭ": "I",
        "Į": "I",
        "İ": "I",
        "ĩ": "i",
        "ī": "i",
        "ĭ": "i",
        "į": "i",
        "ı": "i",
        "Ĵ": "J",
        "ĵ": "j",
        "Ķ": "K",
        "ķ": "k",
        "ĸ": "k",
        "Ĺ": "L",
        "Ļ": "L",
        "Ľ": "L",
        "Ŀ": "L",
        "Ł": "L",
        "ĺ": "l",
        "ļ": "l",
        "ľ": "l",
        "ŀ": "l",
        "ł": "l",
        "Ń": "N",
        "Ņ": "N",
        "Ň": "N",
        "Ŋ": "N",
        "ń": "n",
        "ņ": "n",
        "ň": "n",
        "ŋ": "n",
        "Ō": "O",
        "Ŏ": "O",
        "Ő": "O",
        "ō": "o",
        "ŏ": "o",
        "ő": "o",
        "Ŕ": "R",
        "Ŗ": "R",
        "Ř": "R",
        "ŕ": "r",
        "ŗ": "r",
        "ř": "r",
        "Ś": "S",
        "Ŝ": "S",
        "Ş": "S",
        "Š": "S",
        "ś": "s",
        "ŝ": "s",
        "ş": "s",
        "š": "s",
        "Ţ": "T",
        "Ť": "T",
        "Ŧ": "T",
        "ţ": "t",
        "ť": "t",
        "ŧ": "t",
        "Ũ": "U",
        "Ū": "U",
        "Ŭ": "U",
        "Ů": "U",
        "Ű": "U",
        "Ų": "U",
        "ũ": "u",
        "ū": "u",
        "ŭ": "u",
        "ů": "u",
        "ű": "u",
        "ų": "u",
        "Ŵ": "W",
        "ŵ": "w",
        "Ŷ": "Y",
        "ŷ": "y",
        "Ÿ": "Y",
        "Ź": "Z",
        "Ż": "Z",
        "Ž": "Z",
        "ź": "z",
        "ż": "z",
        "ž": "z",
        "Ĳ": "IJ",
        "ĳ": "ij",
        "Œ": "Oe",
        "œ": "oe",
        "ŉ": "'n",
        "ſ": "s"
      };
      var deburrLetter = basePropertyOf(deburredLetters);
      const deburrLetter$1 = deburrLetter;
      var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
      var rsComboMarksRange$1 = "\\u0300-\\u036f", reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$1 = "\\u20d0-\\u20ff", rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1;
      var rsCombo$1 = "[" + rsComboRange$1 + "]";
      var reComboMark = RegExp(rsCombo$1, "g");
      function deburr(string) {
        string = toString$1(string);
        return string && string.replace(reLatin, deburrLetter$1).replace(reComboMark, "");
      }
      var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
      function asciiWords(string) {
        return string.match(reAsciiWord) || [];
      }
      var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
      function hasUnicodeWord(string) {
        return reHasUnicodeWord.test(string);
      }
      var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
      var rsApos$1 = "['’]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
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
      function unicodeWords(string) {
        return string.match(reUnicodeWord) || [];
      }
      function words(string, pattern, guard) {
        string = toString$1(string);
        pattern = guard ? void 0 : pattern;
        if (pattern === void 0) {
          return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
        }
        return string.match(pattern) || [];
      }
      var rsApos = "['’]";
      var reApos = RegExp(rsApos, "g");
      function createCompounder(callback) {
        return function(string) {
          return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
        };
      }
      var camelCase = createCompounder(function(result, word, index) {
        word = word.toLowerCase();
        return result + (index ? capitalize$1(word) : word);
      });
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
      const getSymbols$1 = getSymbols;
      function baseGetAllKeys(object, keysFunc, symbolsFunc) {
        var result = keysFunc(object);
        return isArray$1(object) ? result : arrayPush(result, symbolsFunc(object));
      }
      function getAllKeys(object) {
        return baseGetAllKeys(object, keys, getSymbols$1);
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
      const getTag$1 = getTag;
      var Uint8Array$1 = root.Uint8Array;
      const Uint8Array$2 = Uint8Array$1;
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
            if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array$2(object), new Uint8Array$2(other))) {
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
        var objIsArr = isArray$1(object), othIsArr = isArray$1(other), objTag = objIsArr ? arrayTag : getTag$1(object), othTag = othIsArr ? arrayTag : getTag$1(other);
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
        var index = matchData.length, length = index, noCustomizer = !customizer;
        if (object == null) {
          return !length;
        }
        object = Object(object);
        while (index--) {
          var data = matchData[index];
          if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
            return false;
          }
        }
        while (++index < length) {
          data = matchData[index];
          var key = data[0], objValue = object[key], srcValue = data[1];
          if (noCustomizer && data[2]) {
            if (objValue === void 0 && !(key in object)) {
              return false;
            }
          } else {
            var stack = new Stack();
            if (customizer) {
              var result = customizer(objValue, srcValue, key, object, source, stack);
            }
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
            var key = props[fromRight ? length : ++index];
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
          var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
          while (fromRight ? index-- : ++index < length) {
            if (iteratee(iterable[index], index, iterable) === false) {
              break;
            }
          }
          return collection;
        };
      }
      var baseEach = createBaseEach(baseForOwn);
      const baseEach$1 = baseEach;
      function baseAggregator(collection, setter, iteratee, accumulator) {
        baseEach$1(collection, function(value, key, collection2) {
          setter(accumulator, value, iteratee(value), collection2);
        });
        return accumulator;
      }
      function createAggregator(setter, initializer) {
        return function(collection, iteratee) {
          var func = isArray$1(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
          return func(collection, setter, baseIteratee(iteratee), accumulator);
        };
      }
      function isArrayLikeObject(value) {
        return isObjectLike(value) && isArrayLike(value);
      }
      function arrayIncludesWith(array, value, comparator) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (comparator(value, array[index])) {
            return true;
          }
        }
        return false;
      }
      function last(array) {
        var length = array == null ? 0 : array.length;
        return length ? array[length - 1] : void 0;
      }
      function castFunction(value) {
        return typeof value == "function" ? value : identity;
      }
      function forEach(collection, iteratee) {
        var func = isArray$1(collection) ? arrayEach : baseEach$1;
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
      const escapeHtmlChar$1 = escapeHtmlChar;
      var reUnescapedHtml = /[&<>"']/g, reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
      function escape$1(string) {
        string = toString$1(string);
        return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar$1) : string;
      }
      function baseFilter(collection, predicate) {
        var result = [];
        baseEach$1(collection, function(value, index, collection2) {
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
        baseEach$1(collection, function(value, key, collection2) {
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
        var includes = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array(othLength), maxLength = Infinity, result = [];
        while (othIndex--) {
          var array = arrays[othIndex];
          if (othIndex && iteratee) {
            array = arrayMap(array, baseUnary(iteratee));
          }
          maxLength = nativeMin(array.length, maxLength);
          caches[othIndex] = !comparator && (iteratee || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : void 0;
        }
        array = arrays[0];
        var index = -1, seen = caches[0];
        outer:
          while (++index < length && result.length < maxLength) {
            var value = array[index], computed2 = iteratee ? iteratee(value) : value;
            value = comparator || value !== 0 ? value : 0;
            if (!(seen ? cacheHas(seen, computed2) : includes(result, computed2, comparator))) {
              othIndex = othLength;
              while (--othIndex) {
                var cache2 = caches[othIndex];
                if (!(cache2 ? cacheHas(cache2, computed2) : includes(arrays[othIndex], computed2, comparator))) {
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
      const intersection$1 = intersection;
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
      var kebabCase = createCompounder(function(result, word, index) {
        return result + (index ? "-" : "") + word.toLowerCase();
      });
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
      const reInterpolate$1 = reInterpolate;
      var reEscape = /<%-([\s\S]+?)%>/g;
      const reEscape$1 = reEscape;
      var reEvaluate = /<%([\s\S]+?)%>/g;
      const reEvaluate$1 = reEvaluate;
      var templateSettings = {
        /**
         * Used to detect `data` property values to be HTML-escaped.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        "escape": reEscape$1,
        /**
         * Used to detect code to be evaluated.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        "evaluate": reEvaluate$1,
        /**
         * Used to detect `data` property values to inject.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        "interpolate": reInterpolate$1,
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
        if (guard && isIterateeCall(string, options, guard)) {
          options = void 0;
        }
        string = toString$1(string);
        options = assignInWith({}, options, settings2, customDefaultsAssignIn);
        var imports = assignInWith({}, options.imports, settings2.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
        var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
        var reDelimiters = RegExp(
          (options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate$1 ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$",
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
          if (!new Events().__proto__)
            prefix = false;
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
          if (!emitter._events[evt])
            emitter._events[evt] = listener, emitter._eventsCount++;
          else if (!emitter._events[evt].fn)
            emitter._events[evt].push(listener);
          else
            emitter._events[evt] = [emitter._events[evt], listener];
          return emitter;
        }
        function clearEvent(emitter, evt) {
          if (--emitter._eventsCount === 0)
            emitter._events = new Events();
          else
            delete emitter._events[evt];
        }
        function EventEmitter2() {
          this._events = new Events();
          this._eventsCount = 0;
        }
        EventEmitter2.prototype.eventNames = function eventNames() {
          var names = [], events, name;
          if (this._eventsCount === 0)
            return names;
          for (name in events = this._events) {
            if (has.call(events, name))
              names.push(prefix ? name.slice(1) : name);
          }
          if (Object.getOwnPropertySymbols) {
            return names.concat(Object.getOwnPropertySymbols(events));
          }
          return names;
        };
        EventEmitter2.prototype.listeners = function listeners(event) {
          var evt = prefix ? prefix + event : event, handlers2 = this._events[evt];
          if (!handlers2)
            return [];
          if (handlers2.fn)
            return [handlers2.fn];
          for (var i = 0, l = handlers2.length, ee = new Array(l); i < l; i++) {
            ee[i] = handlers2[i].fn;
          }
          return ee;
        };
        EventEmitter2.prototype.listenerCount = function listenerCount(event) {
          var evt = prefix ? prefix + event : event, listeners = this._events[evt];
          if (!listeners)
            return 0;
          if (listeners.fn)
            return 1;
          return listeners.length;
        };
        EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
          var evt = prefix ? prefix + event : event;
          if (!this._events[evt])
            return false;
          var listeners = this._events[evt], len = arguments.length, args, i;
          if (listeners.fn) {
            if (listeners.once)
              this.removeListener(event, listeners.fn, void 0, true);
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
              if (listeners[i].once)
                this.removeListener(event, listeners[i].fn, void 0, true);
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
                  if (!args)
                    for (j = 1, args = new Array(len - 1); j < len; j++) {
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
          if (!this._events[evt])
            return this;
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
            if (events.length)
              this._events[evt] = events.length === 1 ? events[0] : events;
            else
              clearEvent(this, evt);
          }
          return this;
        };
        EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
          var evt;
          if (event) {
            evt = prefix ? prefix + event : event;
            if (this._events[evt])
              clearEvent(this, evt);
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
      let getRandomValues;
      const rnds8 = new Uint8Array(16);
      function rng() {
        if (!getRandomValues) {
          getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
          if (!getRandomValues) {
            throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
          }
        }
        return getRandomValues(rnds8);
      }
      const byteToHex = [];
      for (let i = 0; i < 256; ++i) {
        byteToHex.push((i + 256).toString(16).slice(1));
      }
      function unsafeStringify(arr, offset = 0) {
        return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
      }
      const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
      const native = {
        randomUUID
      };
      function v4(options, buf, offset) {
        if (native.randomUUID && !buf && !options) {
          return native.randomUUID();
        }
        options = options || {};
        const rnds = options.random || (options.rng || rng)();
        rnds[6] = rnds[6] & 15 | 64;
        rnds[8] = rnds[8] & 63 | 128;
        if (buf) {
          offset = offset || 0;
          for (let i = 0; i < 16; ++i) {
            buf[offset + i] = rnds[i];
          }
          return buf;
        }
        return unsafeStringify(rnds);
      }
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
            id: v4(),
            running: false,
            fn,
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
            for (let i = 0; i < Math.min(idleItems.length, this.thread - running); i++) {
              const item = idleItems[i];
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
      var __spreadArray = function(to, from, pack) {
        if (pack || arguments.length === 2)
          for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
              if (!ar)
                ar = Array.prototype.slice.call(from, 0, i);
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
          if (supportLanguage.has(lang))
            return lang;
        }
        return "en";
      })();
      const nHentaiDownloadHosts = [
        "i.nhentai.net",
        "i2.nhentai.net",
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
          formatter: (val) => intersection$1(val, availableMetaFiles)
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
      if (DISABLE_STREAM_DOWNLOAD && settings.streamDownload)
        writeableSettings.streamDownload = false;
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
              if (!valChanged)
                saveValue(val);
            },
            typeof ref2.value === "object" ? { deep: true } : void 0
          );
        });
      });
      const validTitleReplacement = vue.computed(
        () => settings.titleReplacement.filter((item) => item == null ? void 0 : item.from)
      );
      const dlQueue = new AsyncQueue();
      const zipQueue = new AsyncQueue(WORKER_THREAD_NUM);
      dlQueue.canSingleStart = () => !(settings.seriesMode && zipQueue.length);
      zipQueue.emitter.on("finish", () => {
        if (settings.seriesMode)
          dlQueue.start().catch(logger.error);
      });
      const _withScopeId = (n) => (vue.pushScopeId("data-v-83b954f2"), n = n(), vue.popScopeId(), n);
      const _hoisted_1$3 = ["title"];
      const _hoisted_2$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("i", { class: "fa fa-times" }, null, -1));
      const _hoisted_3$1 = [
        _hoisted_2$1
      ];
      const _hoisted_4$1 = { class: "download-item__title" };
      const _hoisted_5$1 = { class: "download-item__progress-text" };
      const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
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
              }, _hoisted_3$1)) : vue.createCommentVNode("", true),
              vue.createElementVNode("div", _hoisted_4$1, vue.toDisplayString(title.value), 1),
              vue.createElementVNode("div", {
                class: "download-item__progress",
                style: vue.normalizeStyle({ width: `${progressWidth.value}%` })
              }, [
                vue.createElementVNode("div", _hoisted_5$1, vue.toDisplayString(progressWidth.value) + "%", 1)
              ], 4)
            ], 10, _hoisted_1$3);
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
      const DownloadItem = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-83b954f2"]]);
      const _hoisted_1$2 = { id: "download-panel" };
      const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
        __name: "DownloadList",
        props: {
          zipList: {},
          dlList: {}
        },
        setup(__props) {
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$2, [
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
      const DownloadList = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-f37e74c3"]]);
      const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
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
            if (error.value)
              return `[×] ${title}`;
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
        * shared v9.12.1
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
            if (isNotObjectOrIsArray(src2[key]) || isNotObjectOrIsArray(des2[key])) {
              des2[key] = src2[key];
            } else {
              stack.push({ src: src2[key], des: des2[key] });
            }
          });
        }
      }
      /*!
        * message-compiler v9.12.1
        * (c) 2024 kazuya kawaguchi
        * Released under the MIT License.
        */
      function createPosition(line, column, offset) {
        return { line, column, offset };
      }
      function createLocation(start, end, source) {
        const loc = { start, end };
        if (source != null) {
          loc.source = source;
        }
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
        const msg = format$1(warnMessages[code2] || "", ...args || []);
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
              return isIdentifierStart(ch);
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
          const fn = (detect2 = false, buf) => {
            const ch = scnr.currentChar();
            if (ch === "{" || ch === "%" || ch === "@" || ch === "|" || ch === "(" || ch === ")" || !ch) {
              return buf;
            } else if (ch === CHAR_SP) {
              return buf;
            } else if (ch === CHAR_LF || ch === DOT) {
              buf += ch;
              scnr.next();
              return fn(detect2, buf);
            } else {
              buf += ch;
              scnr.next();
              return fn(true, buf);
            }
          };
          return fn(false, "");
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
          if (type) {
            node.type = type;
          }
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
        const parser2 = createParser(assignedOptions);
        const ast = parser2.parse(source);
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
        * core-base v9.12.1
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
      const VERSION$1 = "9.12.1";
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
        * vue-i18n v9.12.1
        * (c) 2024 kazuya kawaguchi
        * Released under the MIT License.
        */
      const VERSION = "9.12.1";
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
            if (__INTLIFY_PROD_DEVTOOLS__)
              ;
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
      const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
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
            if (g2 = g2 || f2.name || "download", "string" != typeof f2)
              navigator.msSaveOrOpenBlob(b(f2, h2), g2);
            else if (d(f2))
              c(f2, g2, h2);
            else {
              var i = document.createElement("a");
              i.href = f2, i.target = "_blank", setTimeout(function() {
                e(i);
              });
            }
          } : function(b2, d2, e2, g2) {
            if (g2 = g2 || open("", "_blank"), g2 && (g2.document.title = g2.document.body.innerText = "downloading..."), "string" == typeof b2)
              return c(b2, d2, e2);
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
                  if (!u && a)
                    return a(o2, true);
                  if (i)
                    return i(o2, true);
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
            for (var o = 0; o < r.length; o++)
              s(r[o]);
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
            for (var words2 = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
              words2[b >>> 5] |= bytes[i] << 24 - b % 32;
            return words2;
          },
          // Convert big-endian 32-bit words to a byte array
          wordsToBytes: function(words2) {
            for (var bytes = [], b = 0; b < words2.length * 32; b += 8)
              bytes.push(words2[b >>> 5] >>> 24 - b % 32 & 255);
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
              if (imod4 == 0)
                continue;
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
      const encodedJs = "dmFyIF9fZGVmUHJvcCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTsKdmFyIF9fZGVmTm9ybWFsUHJvcCA9IChvYmosIGtleSwgdmFsdWUpID0+IGtleSBpbiBvYmogPyBfX2RlZlByb3Aob2JqLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSwgdmFsdWUgfSkgOiBvYmpba2V5XSA9IHZhbHVlOwp2YXIgX19wdWJsaWNGaWVsZCA9IChvYmosIGtleSwgdmFsdWUpID0+IHsKICBfX2RlZk5vcm1hbFByb3Aob2JqLCB0eXBlb2Yga2V5ICE9PSAic3ltYm9sIiA/IGtleSArICIiIDoga2V5LCB2YWx1ZSk7CiAgcmV0dXJuIHZhbHVlOwp9OwooZnVuY3Rpb24oKSB7CiAgInVzZSBzdHJpY3QiOwogIHZhciBjb21tb25qc0dsb2JhbCA9IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAidW5kZWZpbmVkIiA/IGdsb2JhbFRoaXMgOiB0eXBlb2Ygd2luZG93ICE9PSAidW5kZWZpbmVkIiA/IHdpbmRvdyA6IHR5cGVvZiBnbG9iYWwgIT09ICJ1bmRlZmluZWQiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09ICJ1bmRlZmluZWQiID8gc2VsZiA6IHt9OwogIGZ1bmN0aW9uIGdldERlZmF1bHRFeHBvcnRGcm9tQ2pzKHgpIHsKICAgIHJldHVybiB4ICYmIHguX19lc01vZHVsZSAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoeCwgImRlZmF1bHQiKSA/IHhbImRlZmF1bHQiXSA6IHg7CiAgfQogIGZ1bmN0aW9uIGNvbW1vbmpzUmVxdWlyZShwYXRoKSB7CiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBkeW5hbWljYWxseSByZXF1aXJlICInICsgcGF0aCArICciLiBQbGVhc2UgY29uZmlndXJlIHRoZSBkeW5hbWljUmVxdWlyZVRhcmdldHMgb3IvYW5kIGlnbm9yZUR5bmFtaWNSZXF1aXJlcyBvcHRpb24gb2YgQHJvbGx1cC9wbHVnaW4tY29tbW9uanMgYXBwcm9wcmlhdGVseSBmb3IgdGhpcyByZXF1aXJlIGNhbGwgdG8gd29yay4nKTsKICB9CiAgdmFyIGpzemlwX21pbiA9IHsgZXhwb3J0czoge30gfTsKICAvKiEKICAKICAJSlNaaXAgdjMuMTAuMSAtIEEgSmF2YVNjcmlwdCBjbGFzcyBmb3IgZ2VuZXJhdGluZyBhbmQgcmVhZGluZyB6aXAgZmlsZXMKICAJPGh0dHA6Ly9zdHVhcnRrLmNvbS9qc3ppcD4KICAKICAJKGMpIDIwMDktMjAxNiBTdHVhcnQgS25pZ2h0bGV5IDxzdHVhcnQgW2F0XSBzdHVhcnRrLmNvbT4KICAJRHVhbCBsaWNlbmNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2Ugb3IgR1BMdjMuIFNlZSBodHRwczovL3Jhdy5naXRodWIuY29tL1N0dWsvanN6aXAvbWFpbi9MSUNFTlNFLm1hcmtkb3duLgogIAogIAlKU1ppcCB1c2VzIHRoZSBsaWJyYXJ5IHBha28gcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIDoKICAJaHR0cHM6Ly9naXRodWIuY29tL25vZGVjYS9wYWtvL2Jsb2IvbWFpbi9MSUNFTlNFCiAgCSovCiAgKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykgewogICAgIWZ1bmN0aW9uKGUpIHsKICAgICAgbW9kdWxlLmV4cG9ydHMgPSBlKCk7CiAgICB9KGZ1bmN0aW9uKCkgewogICAgICByZXR1cm4gZnVuY3Rpb24gcyhhLCBvLCBoKSB7CiAgICAgICAgZnVuY3Rpb24gdShyLCBlMikgewogICAgICAgICAgaWYgKCFvW3JdKSB7CiAgICAgICAgICAgIGlmICghYVtyXSkgewogICAgICAgICAgICAgIHZhciB0ID0gImZ1bmN0aW9uIiA9PSB0eXBlb2YgY29tbW9uanNSZXF1aXJlICYmIGNvbW1vbmpzUmVxdWlyZTsKICAgICAgICAgICAgICBpZiAoIWUyICYmIHQpCiAgICAgICAgICAgICAgICByZXR1cm4gdChyLCB0cnVlKTsKICAgICAgICAgICAgICBpZiAobCkKICAgICAgICAgICAgICAgIHJldHVybiBsKHIsIHRydWUpOwogICAgICAgICAgICAgIHZhciBuID0gbmV3IEVycm9yKCJDYW5ub3QgZmluZCBtb2R1bGUgJyIgKyByICsgIiciKTsKICAgICAgICAgICAgICB0aHJvdyBuLmNvZGUgPSAiTU9EVUxFX05PVF9GT1VORCIsIG47CiAgICAgICAgICAgIH0KICAgICAgICAgICAgdmFyIGkgPSBvW3JdID0geyBleHBvcnRzOiB7fSB9OwogICAgICAgICAgICBhW3JdWzBdLmNhbGwoaS5leHBvcnRzLCBmdW5jdGlvbihlMykgewogICAgICAgICAgICAgIHZhciB0MiA9IGFbcl1bMV1bZTNdOwogICAgICAgICAgICAgIHJldHVybiB1KHQyIHx8IGUzKTsKICAgICAgICAgICAgfSwgaSwgaS5leHBvcnRzLCBzLCBhLCBvLCBoKTsKICAgICAgICAgIH0KICAgICAgICAgIHJldHVybiBvW3JdLmV4cG9ydHM7CiAgICAgICAgfQogICAgICAgIGZvciAodmFyIGwgPSAiZnVuY3Rpb24iID09IHR5cGVvZiBjb21tb25qc1JlcXVpcmUgJiYgY29tbW9uanNSZXF1aXJlLCBlID0gMDsgZSA8IGgubGVuZ3RoOyBlKyspCiAgICAgICAgICB1KGhbZV0pOwogICAgICAgIHJldHVybiB1OwogICAgICB9KHsgMTogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICB2YXIgZCA9IGUoIi4vdXRpbHMiKSwgYyA9IGUoIi4vc3VwcG9ydCIpLCBwID0gIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89IjsKICAgICAgICByLmVuY29kZSA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICBmb3IgKHZhciB0MiwgcjIsIG4sIGksIHMsIGEsIG8sIGggPSBbXSwgdSA9IDAsIGwgPSBlMi5sZW5ndGgsIGYgPSBsLCBjMiA9ICJzdHJpbmciICE9PSBkLmdldFR5cGVPZihlMik7IHUgPCBlMi5sZW5ndGg7ICkKICAgICAgICAgICAgZiA9IGwgLSB1LCBuID0gYzIgPyAodDIgPSBlMlt1KytdLCByMiA9IHUgPCBsID8gZTJbdSsrXSA6IDAsIHUgPCBsID8gZTJbdSsrXSA6IDApIDogKHQyID0gZTIuY2hhckNvZGVBdCh1KyspLCByMiA9IHUgPCBsID8gZTIuY2hhckNvZGVBdCh1KyspIDogMCwgdSA8IGwgPyBlMi5jaGFyQ29kZUF0KHUrKykgOiAwKSwgaSA9IHQyID4+IDIsIHMgPSAoMyAmIHQyKSA8PCA0IHwgcjIgPj4gNCwgYSA9IDEgPCBmID8gKDE1ICYgcjIpIDw8IDIgfCBuID4+IDYgOiA2NCwgbyA9IDIgPCBmID8gNjMgJiBuIDogNjQsIGgucHVzaChwLmNoYXJBdChpKSArIHAuY2hhckF0KHMpICsgcC5jaGFyQXQoYSkgKyBwLmNoYXJBdChvKSk7CiAgICAgICAgICByZXR1cm4gaC5qb2luKCIiKTsKICAgICAgICB9LCByLmRlY29kZSA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICB2YXIgdDIsIHIyLCBuLCBpLCBzLCBhLCBvID0gMCwgaCA9IDAsIHUgPSAiZGF0YToiOwogICAgICAgICAgaWYgKGUyLnN1YnN0cigwLCB1Lmxlbmd0aCkgPT09IHUpCiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigiSW52YWxpZCBiYXNlNjQgaW5wdXQsIGl0IGxvb2tzIGxpa2UgYSBkYXRhIHVybC4iKTsKICAgICAgICAgIHZhciBsLCBmID0gMyAqIChlMiA9IGUyLnJlcGxhY2UoL1teQS1aYS16MC05Ky89XS9nLCAiIikpLmxlbmd0aCAvIDQ7CiAgICAgICAgICBpZiAoZTIuY2hhckF0KGUyLmxlbmd0aCAtIDEpID09PSBwLmNoYXJBdCg2NCkgJiYgZi0tLCBlMi5jaGFyQXQoZTIubGVuZ3RoIC0gMikgPT09IHAuY2hhckF0KDY0KSAmJiBmLS0sIGYgJSAxICE9IDApCiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigiSW52YWxpZCBiYXNlNjQgaW5wdXQsIGJhZCBjb250ZW50IGxlbmd0aC4iKTsKICAgICAgICAgIGZvciAobCA9IGMudWludDhhcnJheSA/IG5ldyBVaW50OEFycmF5KDAgfCBmKSA6IG5ldyBBcnJheSgwIHwgZik7IG8gPCBlMi5sZW5ndGg7ICkKICAgICAgICAgICAgdDIgPSBwLmluZGV4T2YoZTIuY2hhckF0KG8rKykpIDw8IDIgfCAoaSA9IHAuaW5kZXhPZihlMi5jaGFyQXQobysrKSkpID4+IDQsIHIyID0gKDE1ICYgaSkgPDwgNCB8IChzID0gcC5pbmRleE9mKGUyLmNoYXJBdChvKyspKSkgPj4gMiwgbiA9ICgzICYgcykgPDwgNiB8IChhID0gcC5pbmRleE9mKGUyLmNoYXJBdChvKyspKSksIGxbaCsrXSA9IHQyLCA2NCAhPT0gcyAmJiAobFtoKytdID0gcjIpLCA2NCAhPT0gYSAmJiAobFtoKytdID0gbik7CiAgICAgICAgICByZXR1cm4gbDsKICAgICAgICB9OwogICAgICB9LCB7ICIuL3N1cHBvcnQiOiAzMCwgIi4vdXRpbHMiOiAzMiB9XSwgMjogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICB2YXIgbiA9IGUoIi4vZXh0ZXJuYWwiKSwgaSA9IGUoIi4vc3RyZWFtL0RhdGFXb3JrZXIiKSwgcyA9IGUoIi4vc3RyZWFtL0NyYzMyUHJvYmUiKSwgYSA9IGUoIi4vc3RyZWFtL0RhdGFMZW5ndGhQcm9iZSIpOwogICAgICAgIGZ1bmN0aW9uIG8oZTIsIHQyLCByMiwgbjIsIGkyKSB7CiAgICAgICAgICB0aGlzLmNvbXByZXNzZWRTaXplID0gZTIsIHRoaXMudW5jb21wcmVzc2VkU2l6ZSA9IHQyLCB0aGlzLmNyYzMyID0gcjIsIHRoaXMuY29tcHJlc3Npb24gPSBuMiwgdGhpcy5jb21wcmVzc2VkQ29udGVudCA9IGkyOwogICAgICAgIH0KICAgICAgICBvLnByb3RvdHlwZSA9IHsgZ2V0Q29udGVudFdvcmtlcjogZnVuY3Rpb24oKSB7CiAgICAgICAgICB2YXIgZTIgPSBuZXcgaShuLlByb21pc2UucmVzb2x2ZSh0aGlzLmNvbXByZXNzZWRDb250ZW50KSkucGlwZSh0aGlzLmNvbXByZXNzaW9uLnVuY29tcHJlc3NXb3JrZXIoKSkucGlwZShuZXcgYSgiZGF0YV9sZW5ndGgiKSksIHQyID0gdGhpczsKICAgICAgICAgIHJldHVybiBlMi5vbigiZW5kIiwgZnVuY3Rpb24oKSB7CiAgICAgICAgICAgIGlmICh0aGlzLnN0cmVhbUluZm8uZGF0YV9sZW5ndGggIT09IHQyLnVuY29tcHJlc3NlZFNpemUpCiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJCdWcgOiB1bmNvbXByZXNzZWQgZGF0YSBzaXplIG1pc21hdGNoIik7CiAgICAgICAgICB9KSwgZTI7CiAgICAgICAgfSwgZ2V0Q29tcHJlc3NlZFdvcmtlcjogZnVuY3Rpb24oKSB7CiAgICAgICAgICByZXR1cm4gbmV3IGkobi5Qcm9taXNlLnJlc29sdmUodGhpcy5jb21wcmVzc2VkQ29udGVudCkpLndpdGhTdHJlYW1JbmZvKCJjb21wcmVzc2VkU2l6ZSIsIHRoaXMuY29tcHJlc3NlZFNpemUpLndpdGhTdHJlYW1JbmZvKCJ1bmNvbXByZXNzZWRTaXplIiwgdGhpcy51bmNvbXByZXNzZWRTaXplKS53aXRoU3RyZWFtSW5mbygiY3JjMzIiLCB0aGlzLmNyYzMyKS53aXRoU3RyZWFtSW5mbygiY29tcHJlc3Npb24iLCB0aGlzLmNvbXByZXNzaW9uKTsKICAgICAgICB9IH0sIG8uY3JlYXRlV29ya2VyRnJvbSA9IGZ1bmN0aW9uKGUyLCB0MiwgcjIpIHsKICAgICAgICAgIHJldHVybiBlMi5waXBlKG5ldyBzKCkpLnBpcGUobmV3IGEoInVuY29tcHJlc3NlZFNpemUiKSkucGlwZSh0Mi5jb21wcmVzc1dvcmtlcihyMikpLnBpcGUobmV3IGEoImNvbXByZXNzZWRTaXplIikpLndpdGhTdHJlYW1JbmZvKCJjb21wcmVzc2lvbiIsIHQyKTsKICAgICAgICB9LCB0LmV4cG9ydHMgPSBvOwogICAgICB9LCB7ICIuL2V4dGVybmFsIjogNiwgIi4vc3RyZWFtL0NyYzMyUHJvYmUiOiAyNSwgIi4vc3RyZWFtL0RhdGFMZW5ndGhQcm9iZSI6IDI2LCAiLi9zdHJlYW0vRGF0YVdvcmtlciI6IDI3IH1dLCAzOiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIHZhciBuID0gZSgiLi9zdHJlYW0vR2VuZXJpY1dvcmtlciIpOwogICAgICAgIHIuU1RPUkUgPSB7IG1hZ2ljOiAiXDBcMCIsIGNvbXByZXNzV29ya2VyOiBmdW5jdGlvbigpIHsKICAgICAgICAgIHJldHVybiBuZXcgbigiU1RPUkUgY29tcHJlc3Npb24iKTsKICAgICAgICB9LCB1bmNvbXByZXNzV29ya2VyOiBmdW5jdGlvbigpIHsKICAgICAgICAgIHJldHVybiBuZXcgbigiU1RPUkUgZGVjb21wcmVzc2lvbiIpOwogICAgICAgIH0gfSwgci5ERUZMQVRFID0gZSgiLi9mbGF0ZSIpOwogICAgICB9LCB7ICIuL2ZsYXRlIjogNywgIi4vc3RyZWFtL0dlbmVyaWNXb3JrZXIiOiAyOCB9XSwgNDogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICB2YXIgbiA9IGUoIi4vdXRpbHMiKTsKICAgICAgICB2YXIgbyA9IGZ1bmN0aW9uKCkgewogICAgICAgICAgZm9yICh2YXIgZTIsIHQyID0gW10sIHIyID0gMDsgcjIgPCAyNTY7IHIyKyspIHsKICAgICAgICAgICAgZTIgPSByMjsKICAgICAgICAgICAgZm9yICh2YXIgbjIgPSAwOyBuMiA8IDg7IG4yKyspCiAgICAgICAgICAgICAgZTIgPSAxICYgZTIgPyAzOTg4MjkyMzg0IF4gZTIgPj4+IDEgOiBlMiA+Pj4gMTsKICAgICAgICAgICAgdDJbcjJdID0gZTI7CiAgICAgICAgICB9CiAgICAgICAgICByZXR1cm4gdDI7CiAgICAgICAgfSgpOwogICAgICAgIHQuZXhwb3J0cyA9IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgcmV0dXJuIHZvaWQgMCAhPT0gZTIgJiYgZTIubGVuZ3RoID8gInN0cmluZyIgIT09IG4uZ2V0VHlwZU9mKGUyKSA/IGZ1bmN0aW9uKGUzLCB0MywgcjIsIG4yKSB7CiAgICAgICAgICAgIHZhciBpID0gbywgcyA9IG4yICsgcjI7CiAgICAgICAgICAgIGUzIF49IC0xOwogICAgICAgICAgICBmb3IgKHZhciBhID0gbjI7IGEgPCBzOyBhKyspCiAgICAgICAgICAgICAgZTMgPSBlMyA+Pj4gOCBeIGlbMjU1ICYgKGUzIF4gdDNbYV0pXTsKICAgICAgICAgICAgcmV0dXJuIC0xIF4gZTM7CiAgICAgICAgICB9KDAgfCB0MiwgZTIsIGUyLmxlbmd0aCwgMCkgOiBmdW5jdGlvbihlMywgdDMsIHIyLCBuMikgewogICAgICAgICAgICB2YXIgaSA9IG8sIHMgPSBuMiArIHIyOwogICAgICAgICAgICBlMyBePSAtMTsKICAgICAgICAgICAgZm9yICh2YXIgYSA9IG4yOyBhIDwgczsgYSsrKQogICAgICAgICAgICAgIGUzID0gZTMgPj4+IDggXiBpWzI1NSAmIChlMyBeIHQzLmNoYXJDb2RlQXQoYSkpXTsKICAgICAgICAgICAgcmV0dXJuIC0xIF4gZTM7CiAgICAgICAgICB9KDAgfCB0MiwgZTIsIGUyLmxlbmd0aCwgMCkgOiAwOwogICAgICAgIH07CiAgICAgIH0sIHsgIi4vdXRpbHMiOiAzMiB9XSwgNTogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICByLmJhc2U2NCA9IGZhbHNlLCByLmJpbmFyeSA9IGZhbHNlLCByLmRpciA9IGZhbHNlLCByLmNyZWF0ZUZvbGRlcnMgPSB0cnVlLCByLmRhdGUgPSBudWxsLCByLmNvbXByZXNzaW9uID0gbnVsbCwgci5jb21wcmVzc2lvbk9wdGlvbnMgPSBudWxsLCByLmNvbW1lbnQgPSBudWxsLCByLnVuaXhQZXJtaXNzaW9ucyA9IG51bGwsIHIuZG9zUGVybWlzc2lvbnMgPSBudWxsOwogICAgICB9LCB7fV0sIDY6IFtmdW5jdGlvbihlLCB0LCByKSB7CiAgICAgICAgdmFyIG4gPSBudWxsOwogICAgICAgIG4gPSAidW5kZWZpbmVkIiAhPSB0eXBlb2YgUHJvbWlzZSA/IFByb21pc2UgOiBlKCJsaWUiKSwgdC5leHBvcnRzID0geyBQcm9taXNlOiBuIH07CiAgICAgIH0sIHsgbGllOiAzNyB9XSwgNzogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICB2YXIgbiA9ICJ1bmRlZmluZWQiICE9IHR5cGVvZiBVaW50OEFycmF5ICYmICJ1bmRlZmluZWQiICE9IHR5cGVvZiBVaW50MTZBcnJheSAmJiAidW5kZWZpbmVkIiAhPSB0eXBlb2YgVWludDMyQXJyYXksIGkgPSBlKCJwYWtvIiksIHMgPSBlKCIuL3V0aWxzIiksIGEgPSBlKCIuL3N0cmVhbS9HZW5lcmljV29ya2VyIiksIG8gPSBuID8gInVpbnQ4YXJyYXkiIDogImFycmF5IjsKICAgICAgICBmdW5jdGlvbiBoKGUyLCB0MikgewogICAgICAgICAgYS5jYWxsKHRoaXMsICJGbGF0ZVdvcmtlci8iICsgZTIpLCB0aGlzLl9wYWtvID0gbnVsbCwgdGhpcy5fcGFrb0FjdGlvbiA9IGUyLCB0aGlzLl9wYWtvT3B0aW9ucyA9IHQyLCB0aGlzLm1ldGEgPSB7fTsKICAgICAgICB9CiAgICAgICAgci5tYWdpYyA9ICJcYlwwIiwgcy5pbmhlcml0cyhoLCBhKSwgaC5wcm90b3R5cGUucHJvY2Vzc0NodW5rID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHRoaXMubWV0YSA9IGUyLm1ldGEsIG51bGwgPT09IHRoaXMuX3Bha28gJiYgdGhpcy5fY3JlYXRlUGFrbygpLCB0aGlzLl9wYWtvLnB1c2gocy50cmFuc2Zvcm1UbyhvLCBlMi5kYXRhKSwgZmFsc2UpOwogICAgICAgIH0sIGgucHJvdG90eXBlLmZsdXNoID0gZnVuY3Rpb24oKSB7CiAgICAgICAgICBhLnByb3RvdHlwZS5mbHVzaC5jYWxsKHRoaXMpLCBudWxsID09PSB0aGlzLl9wYWtvICYmIHRoaXMuX2NyZWF0ZVBha28oKSwgdGhpcy5fcGFrby5wdXNoKFtdLCB0cnVlKTsKICAgICAgICB9LCBoLnByb3RvdHlwZS5jbGVhblVwID0gZnVuY3Rpb24oKSB7CiAgICAgICAgICBhLnByb3RvdHlwZS5jbGVhblVwLmNhbGwodGhpcyksIHRoaXMuX3Bha28gPSBudWxsOwogICAgICAgIH0sIGgucHJvdG90eXBlLl9jcmVhdGVQYWtvID0gZnVuY3Rpb24oKSB7CiAgICAgICAgICB0aGlzLl9wYWtvID0gbmV3IGlbdGhpcy5fcGFrb0FjdGlvbl0oeyByYXc6IHRydWUsIGxldmVsOiB0aGlzLl9wYWtvT3B0aW9ucy5sZXZlbCB8fCAtMSB9KTsKICAgICAgICAgIHZhciB0MiA9IHRoaXM7CiAgICAgICAgICB0aGlzLl9wYWtvLm9uRGF0YSA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICAgIHQyLnB1c2goeyBkYXRhOiBlMiwgbWV0YTogdDIubWV0YSB9KTsKICAgICAgICAgIH07CiAgICAgICAgfSwgci5jb21wcmVzc1dvcmtlciA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICByZXR1cm4gbmV3IGgoIkRlZmxhdGUiLCBlMik7CiAgICAgICAgfSwgci51bmNvbXByZXNzV29ya2VyID0gZnVuY3Rpb24oKSB7CiAgICAgICAgICByZXR1cm4gbmV3IGgoIkluZmxhdGUiLCB7fSk7CiAgICAgICAgfTsKICAgICAgfSwgeyAiLi9zdHJlYW0vR2VuZXJpY1dvcmtlciI6IDI4LCAiLi91dGlscyI6IDMyLCBwYWtvOiAzOCB9XSwgODogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICBmdW5jdGlvbiBBKGUyLCB0MikgewogICAgICAgICAgdmFyIHIyLCBuMiA9ICIiOwogICAgICAgICAgZm9yIChyMiA9IDA7IHIyIDwgdDI7IHIyKyspCiAgICAgICAgICAgIG4yICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoMjU1ICYgZTIpLCBlMiA+Pj49IDg7CiAgICAgICAgICByZXR1cm4gbjI7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIG4oZTIsIHQyLCByMiwgbjIsIGkyLCBzMikgewogICAgICAgICAgdmFyIGEsIG8sIGggPSBlMi5maWxlLCB1ID0gZTIuY29tcHJlc3Npb24sIGwgPSBzMiAhPT0gTy51dGY4ZW5jb2RlLCBmID0gSS50cmFuc2Zvcm1Ubygic3RyaW5nIiwgczIoaC5uYW1lKSksIGMgPSBJLnRyYW5zZm9ybVRvKCJzdHJpbmciLCBPLnV0ZjhlbmNvZGUoaC5uYW1lKSksIGQgPSBoLmNvbW1lbnQsIHAgPSBJLnRyYW5zZm9ybVRvKCJzdHJpbmciLCBzMihkKSksIG0gPSBJLnRyYW5zZm9ybVRvKCJzdHJpbmciLCBPLnV0ZjhlbmNvZGUoZCkpLCBfID0gYy5sZW5ndGggIT09IGgubmFtZS5sZW5ndGgsIGcgPSBtLmxlbmd0aCAhPT0gZC5sZW5ndGgsIGIgPSAiIiwgdiA9ICIiLCB5ID0gIiIsIHcgPSBoLmRpciwgayA9IGguZGF0ZSwgeCA9IHsgY3JjMzI6IDAsIGNvbXByZXNzZWRTaXplOiAwLCB1bmNvbXByZXNzZWRTaXplOiAwIH07CiAgICAgICAgICB0MiAmJiAhcjIgfHwgKHguY3JjMzIgPSBlMi5jcmMzMiwgeC5jb21wcmVzc2VkU2l6ZSA9IGUyLmNvbXByZXNzZWRTaXplLCB4LnVuY29tcHJlc3NlZFNpemUgPSBlMi51bmNvbXByZXNzZWRTaXplKTsKICAgICAgICAgIHZhciBTID0gMDsKICAgICAgICAgIHQyICYmIChTIHw9IDgpLCBsIHx8ICFfICYmICFnIHx8IChTIHw9IDIwNDgpOwogICAgICAgICAgdmFyIHogPSAwLCBDID0gMDsKICAgICAgICAgIHcgJiYgKHogfD0gMTYpLCAiVU5JWCIgPT09IGkyID8gKEMgPSA3OTgsIHogfD0gZnVuY3Rpb24oZTMsIHQzKSB7CiAgICAgICAgICAgIHZhciByMyA9IGUzOwogICAgICAgICAgICByZXR1cm4gZTMgfHwgKHIzID0gdDMgPyAxNjg5MyA6IDMzMjA0KSwgKDY1NTM1ICYgcjMpIDw8IDE2OwogICAgICAgICAgfShoLnVuaXhQZXJtaXNzaW9ucywgdykpIDogKEMgPSAyMCwgeiB8PSBmdW5jdGlvbihlMykgewogICAgICAgICAgICByZXR1cm4gNjMgJiAoZTMgfHwgMCk7CiAgICAgICAgICB9KGguZG9zUGVybWlzc2lvbnMpKSwgYSA9IGsuZ2V0VVRDSG91cnMoKSwgYSA8PD0gNiwgYSB8PSBrLmdldFVUQ01pbnV0ZXMoKSwgYSA8PD0gNSwgYSB8PSBrLmdldFVUQ1NlY29uZHMoKSAvIDIsIG8gPSBrLmdldFVUQ0Z1bGxZZWFyKCkgLSAxOTgwLCBvIDw8PSA0LCBvIHw9IGsuZ2V0VVRDTW9udGgoKSArIDEsIG8gPDw9IDUsIG8gfD0gay5nZXRVVENEYXRlKCksIF8gJiYgKHYgPSBBKDEsIDEpICsgQShCKGYpLCA0KSArIGMsIGIgKz0gInVwIiArIEEodi5sZW5ndGgsIDIpICsgdiksIGcgJiYgKHkgPSBBKDEsIDEpICsgQShCKHApLCA0KSArIG0sIGIgKz0gInVjIiArIEEoeS5sZW5ndGgsIDIpICsgeSk7CiAgICAgICAgICB2YXIgRSA9ICIiOwogICAgICAgICAgcmV0dXJuIEUgKz0gIlxuXDAiLCBFICs9IEEoUywgMiksIEUgKz0gdS5tYWdpYywgRSArPSBBKGEsIDIpLCBFICs9IEEobywgMiksIEUgKz0gQSh4LmNyYzMyLCA0KSwgRSArPSBBKHguY29tcHJlc3NlZFNpemUsIDQpLCBFICs9IEEoeC51bmNvbXByZXNzZWRTaXplLCA0KSwgRSArPSBBKGYubGVuZ3RoLCAyKSwgRSArPSBBKGIubGVuZ3RoLCAyKSwgeyBmaWxlUmVjb3JkOiBSLkxPQ0FMX0ZJTEVfSEVBREVSICsgRSArIGYgKyBiLCBkaXJSZWNvcmQ6IFIuQ0VOVFJBTF9GSUxFX0hFQURFUiArIEEoQywgMikgKyBFICsgQShwLmxlbmd0aCwgMikgKyAiXDBcMFwwXDAiICsgQSh6LCA0KSArIEEobjIsIDQpICsgZiArIGIgKyBwIH07CiAgICAgICAgfQogICAgICAgIHZhciBJID0gZSgiLi4vdXRpbHMiKSwgaSA9IGUoIi4uL3N0cmVhbS9HZW5lcmljV29ya2VyIiksIE8gPSBlKCIuLi91dGY4IiksIEIgPSBlKCIuLi9jcmMzMiIpLCBSID0gZSgiLi4vc2lnbmF0dXJlIik7CiAgICAgICAgZnVuY3Rpb24gcyhlMiwgdDIsIHIyLCBuMikgewogICAgICAgICAgaS5jYWxsKHRoaXMsICJaaXBGaWxlV29ya2VyIiksIHRoaXMuYnl0ZXNXcml0dGVuID0gMCwgdGhpcy56aXBDb21tZW50ID0gdDIsIHRoaXMuemlwUGxhdGZvcm0gPSByMiwgdGhpcy5lbmNvZGVGaWxlTmFtZSA9IG4yLCB0aGlzLnN0cmVhbUZpbGVzID0gZTIsIHRoaXMuYWNjdW11bGF0ZSA9IGZhbHNlLCB0aGlzLmNvbnRlbnRCdWZmZXIgPSBbXSwgdGhpcy5kaXJSZWNvcmRzID0gW10sIHRoaXMuY3VycmVudFNvdXJjZU9mZnNldCA9IDAsIHRoaXMuZW50cmllc0NvdW50ID0gMCwgdGhpcy5jdXJyZW50RmlsZSA9IG51bGwsIHRoaXMuX3NvdXJjZXMgPSBbXTsKICAgICAgICB9CiAgICAgICAgSS5pbmhlcml0cyhzLCBpKSwgcy5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICB2YXIgdDIgPSBlMi5tZXRhLnBlcmNlbnQgfHwgMCwgcjIgPSB0aGlzLmVudHJpZXNDb3VudCwgbjIgPSB0aGlzLl9zb3VyY2VzLmxlbmd0aDsKICAgICAgICAgIHRoaXMuYWNjdW11bGF0ZSA/IHRoaXMuY29udGVudEJ1ZmZlci5wdXNoKGUyKSA6ICh0aGlzLmJ5dGVzV3JpdHRlbiArPSBlMi5kYXRhLmxlbmd0aCwgaS5wcm90b3R5cGUucHVzaC5jYWxsKHRoaXMsIHsgZGF0YTogZTIuZGF0YSwgbWV0YTogeyBjdXJyZW50RmlsZTogdGhpcy5jdXJyZW50RmlsZSwgcGVyY2VudDogcjIgPyAodDIgKyAxMDAgKiAocjIgLSBuMiAtIDEpKSAvIHIyIDogMTAwIH0gfSkpOwogICAgICAgIH0sIHMucHJvdG90eXBlLm9wZW5lZFNvdXJjZSA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICB0aGlzLmN1cnJlbnRTb3VyY2VPZmZzZXQgPSB0aGlzLmJ5dGVzV3JpdHRlbiwgdGhpcy5jdXJyZW50RmlsZSA9IGUyLmZpbGUubmFtZTsKICAgICAgICAgIHZhciB0MiA9IHRoaXMuc3RyZWFtRmlsZXMgJiYgIWUyLmZpbGUuZGlyOwogICAgICAgICAgaWYgKHQyKSB7CiAgICAgICAgICAgIHZhciByMiA9IG4oZTIsIHQyLCBmYWxzZSwgdGhpcy5jdXJyZW50U291cmNlT2Zmc2V0LCB0aGlzLnppcFBsYXRmb3JtLCB0aGlzLmVuY29kZUZpbGVOYW1lKTsKICAgICAgICAgICAgdGhpcy5wdXNoKHsgZGF0YTogcjIuZmlsZVJlY29yZCwgbWV0YTogeyBwZXJjZW50OiAwIH0gfSk7CiAgICAgICAgICB9IGVsc2UKICAgICAgICAgICAgdGhpcy5hY2N1bXVsYXRlID0gdHJ1ZTsKICAgICAgICB9LCBzLnByb3RvdHlwZS5jbG9zZWRTb3VyY2UgPSBmdW5jdGlvbihlMikgewogICAgICAgICAgdGhpcy5hY2N1bXVsYXRlID0gZmFsc2U7CiAgICAgICAgICB2YXIgdDIgPSB0aGlzLnN0cmVhbUZpbGVzICYmICFlMi5maWxlLmRpciwgcjIgPSBuKGUyLCB0MiwgdHJ1ZSwgdGhpcy5jdXJyZW50U291cmNlT2Zmc2V0LCB0aGlzLnppcFBsYXRmb3JtLCB0aGlzLmVuY29kZUZpbGVOYW1lKTsKICAgICAgICAgIGlmICh0aGlzLmRpclJlY29yZHMucHVzaChyMi5kaXJSZWNvcmQpLCB0MikKICAgICAgICAgICAgdGhpcy5wdXNoKHsgZGF0YTogZnVuY3Rpb24oZTMpIHsKICAgICAgICAgICAgICByZXR1cm4gUi5EQVRBX0RFU0NSSVBUT1IgKyBBKGUzLmNyYzMyLCA0KSArIEEoZTMuY29tcHJlc3NlZFNpemUsIDQpICsgQShlMy51bmNvbXByZXNzZWRTaXplLCA0KTsKICAgICAgICAgICAgfShlMiksIG1ldGE6IHsgcGVyY2VudDogMTAwIH0gfSk7CiAgICAgICAgICBlbHNlCiAgICAgICAgICAgIGZvciAodGhpcy5wdXNoKHsgZGF0YTogcjIuZmlsZVJlY29yZCwgbWV0YTogeyBwZXJjZW50OiAwIH0gfSk7IHRoaXMuY29udGVudEJ1ZmZlci5sZW5ndGg7ICkKICAgICAgICAgICAgICB0aGlzLnB1c2godGhpcy5jb250ZW50QnVmZmVyLnNoaWZ0KCkpOwogICAgICAgICAgdGhpcy5jdXJyZW50RmlsZSA9IG51bGw7CiAgICAgICAgfSwgcy5wcm90b3R5cGUuZmx1c2ggPSBmdW5jdGlvbigpIHsKICAgICAgICAgIGZvciAodmFyIGUyID0gdGhpcy5ieXRlc1dyaXR0ZW4sIHQyID0gMDsgdDIgPCB0aGlzLmRpclJlY29yZHMubGVuZ3RoOyB0MisrKQogICAgICAgICAgICB0aGlzLnB1c2goeyBkYXRhOiB0aGlzLmRpclJlY29yZHNbdDJdLCBtZXRhOiB7IHBlcmNlbnQ6IDEwMCB9IH0pOwogICAgICAgICAgdmFyIHIyID0gdGhpcy5ieXRlc1dyaXR0ZW4gLSBlMiwgbjIgPSBmdW5jdGlvbihlMywgdDMsIHIzLCBuMywgaTIpIHsKICAgICAgICAgICAgdmFyIHMyID0gSS50cmFuc2Zvcm1Ubygic3RyaW5nIiwgaTIobjMpKTsKICAgICAgICAgICAgcmV0dXJuIFIuQ0VOVFJBTF9ESVJFQ1RPUllfRU5EICsgIlwwXDBcMFwwIiArIEEoZTMsIDIpICsgQShlMywgMikgKyBBKHQzLCA0KSArIEEocjMsIDQpICsgQShzMi5sZW5ndGgsIDIpICsgczI7CiAgICAgICAgICB9KHRoaXMuZGlyUmVjb3Jkcy5sZW5ndGgsIHIyLCBlMiwgdGhpcy56aXBDb21tZW50LCB0aGlzLmVuY29kZUZpbGVOYW1lKTsKICAgICAgICAgIHRoaXMucHVzaCh7IGRhdGE6IG4yLCBtZXRhOiB7IHBlcmNlbnQ6IDEwMCB9IH0pOwogICAgICAgIH0sIHMucHJvdG90eXBlLnByZXBhcmVOZXh0U291cmNlID0gZnVuY3Rpb24oKSB7CiAgICAgICAgICB0aGlzLnByZXZpb3VzID0gdGhpcy5fc291cmNlcy5zaGlmdCgpLCB0aGlzLm9wZW5lZFNvdXJjZSh0aGlzLnByZXZpb3VzLnN0cmVhbUluZm8pLCB0aGlzLmlzUGF1c2VkID8gdGhpcy5wcmV2aW91cy5wYXVzZSgpIDogdGhpcy5wcmV2aW91cy5yZXN1bWUoKTsKICAgICAgICB9LCBzLnByb3RvdHlwZS5yZWdpc3RlclByZXZpb3VzID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHRoaXMuX3NvdXJjZXMucHVzaChlMik7CiAgICAgICAgICB2YXIgdDIgPSB0aGlzOwogICAgICAgICAgcmV0dXJuIGUyLm9uKCJkYXRhIiwgZnVuY3Rpb24oZTMpIHsKICAgICAgICAgICAgdDIucHJvY2Vzc0NodW5rKGUzKTsKICAgICAgICAgIH0pLCBlMi5vbigiZW5kIiwgZnVuY3Rpb24oKSB7CiAgICAgICAgICAgIHQyLmNsb3NlZFNvdXJjZSh0Mi5wcmV2aW91cy5zdHJlYW1JbmZvKSwgdDIuX3NvdXJjZXMubGVuZ3RoID8gdDIucHJlcGFyZU5leHRTb3VyY2UoKSA6IHQyLmVuZCgpOwogICAgICAgICAgfSksIGUyLm9uKCJlcnJvciIsIGZ1bmN0aW9uKGUzKSB7CiAgICAgICAgICAgIHQyLmVycm9yKGUzKTsKICAgICAgICAgIH0pLCB0aGlzOwogICAgICAgIH0sIHMucHJvdG90eXBlLnJlc3VtZSA9IGZ1bmN0aW9uKCkgewogICAgICAgICAgcmV0dXJuICEhaS5wcm90b3R5cGUucmVzdW1lLmNhbGwodGhpcykgJiYgKCF0aGlzLnByZXZpb3VzICYmIHRoaXMuX3NvdXJjZXMubGVuZ3RoID8gKHRoaXMucHJlcGFyZU5leHRTb3VyY2UoKSwgdHJ1ZSkgOiB0aGlzLnByZXZpb3VzIHx8IHRoaXMuX3NvdXJjZXMubGVuZ3RoIHx8IHRoaXMuZ2VuZXJhdGVkRXJyb3IgPyB2b2lkIDAgOiAodGhpcy5lbmQoKSwgdHJ1ZSkpOwogICAgICAgIH0sIHMucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHZhciB0MiA9IHRoaXMuX3NvdXJjZXM7CiAgICAgICAgICBpZiAoIWkucHJvdG90eXBlLmVycm9yLmNhbGwodGhpcywgZTIpKQogICAgICAgICAgICByZXR1cm4gZmFsc2U7CiAgICAgICAgICBmb3IgKHZhciByMiA9IDA7IHIyIDwgdDIubGVuZ3RoOyByMisrKQogICAgICAgICAgICB0cnkgewogICAgICAgICAgICAgIHQyW3IyXS5lcnJvcihlMik7CiAgICAgICAgICAgIH0gY2F0Y2ggKGUzKSB7CiAgICAgICAgICAgIH0KICAgICAgICAgIHJldHVybiB0cnVlOwogICAgICAgIH0sIHMucHJvdG90eXBlLmxvY2sgPSBmdW5jdGlvbigpIHsKICAgICAgICAgIGkucHJvdG90eXBlLmxvY2suY2FsbCh0aGlzKTsKICAgICAgICAgIGZvciAodmFyIGUyID0gdGhpcy5fc291cmNlcywgdDIgPSAwOyB0MiA8IGUyLmxlbmd0aDsgdDIrKykKICAgICAgICAgICAgZTJbdDJdLmxvY2soKTsKICAgICAgICB9LCB0LmV4cG9ydHMgPSBzOwogICAgICB9LCB7ICIuLi9jcmMzMiI6IDQsICIuLi9zaWduYXR1cmUiOiAyMywgIi4uL3N0cmVhbS9HZW5lcmljV29ya2VyIjogMjgsICIuLi91dGY4IjogMzEsICIuLi91dGlscyI6IDMyIH1dLCA5OiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIHZhciB1ID0gZSgiLi4vY29tcHJlc3Npb25zIiksIG4gPSBlKCIuL1ppcEZpbGVXb3JrZXIiKTsKICAgICAgICByLmdlbmVyYXRlV29ya2VyID0gZnVuY3Rpb24oZTIsIGEsIHQyKSB7CiAgICAgICAgICB2YXIgbyA9IG5ldyBuKGEuc3RyZWFtRmlsZXMsIHQyLCBhLnBsYXRmb3JtLCBhLmVuY29kZUZpbGVOYW1lKSwgaCA9IDA7CiAgICAgICAgICB0cnkgewogICAgICAgICAgICBlMi5mb3JFYWNoKGZ1bmN0aW9uKGUzLCB0MykgewogICAgICAgICAgICAgIGgrKzsKICAgICAgICAgICAgICB2YXIgcjIgPSBmdW5jdGlvbihlNCwgdDQpIHsKICAgICAgICAgICAgICAgIHZhciByMyA9IGU0IHx8IHQ0LCBuMyA9IHVbcjNdOwogICAgICAgICAgICAgICAgaWYgKCFuMykKICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHIzICsgIiBpcyBub3QgYSB2YWxpZCBjb21wcmVzc2lvbiBtZXRob2QgISIpOwogICAgICAgICAgICAgICAgcmV0dXJuIG4zOwogICAgICAgICAgICAgIH0odDMub3B0aW9ucy5jb21wcmVzc2lvbiwgYS5jb21wcmVzc2lvbiksIG4yID0gdDMub3B0aW9ucy5jb21wcmVzc2lvbk9wdGlvbnMgfHwgYS5jb21wcmVzc2lvbk9wdGlvbnMgfHwge30sIGkgPSB0My5kaXIsIHMgPSB0My5kYXRlOwogICAgICAgICAgICAgIHQzLl9jb21wcmVzc1dvcmtlcihyMiwgbjIpLndpdGhTdHJlYW1JbmZvKCJmaWxlIiwgeyBuYW1lOiBlMywgZGlyOiBpLCBkYXRlOiBzLCBjb21tZW50OiB0My5jb21tZW50IHx8ICIiLCB1bml4UGVybWlzc2lvbnM6IHQzLnVuaXhQZXJtaXNzaW9ucywgZG9zUGVybWlzc2lvbnM6IHQzLmRvc1Blcm1pc3Npb25zIH0pLnBpcGUobyk7CiAgICAgICAgICAgIH0pLCBvLmVudHJpZXNDb3VudCA9IGg7CiAgICAgICAgICB9IGNhdGNoIChlMykgewogICAgICAgICAgICBvLmVycm9yKGUzKTsKICAgICAgICAgIH0KICAgICAgICAgIHJldHVybiBvOwogICAgICAgIH07CiAgICAgIH0sIHsgIi4uL2NvbXByZXNzaW9ucyI6IDMsICIuL1ppcEZpbGVXb3JrZXIiOiA4IH1dLCAxMDogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICBmdW5jdGlvbiBuKCkgewogICAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIG4pKQogICAgICAgICAgICByZXR1cm4gbmV3IG4oKTsKICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoKQogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIlRoZSBjb25zdHJ1Y3RvciB3aXRoIHBhcmFtZXRlcnMgaGFzIGJlZW4gcmVtb3ZlZCBpbiBKU1ppcCAzLjAsIHBsZWFzZSBjaGVjayB0aGUgdXBncmFkZSBndWlkZS4iKTsKICAgICAgICAgIHRoaXMuZmlsZXMgPSAvKiBAX19QVVJFX18gKi8gT2JqZWN0LmNyZWF0ZShudWxsKSwgdGhpcy5jb21tZW50ID0gbnVsbCwgdGhpcy5yb290ID0gIiIsIHRoaXMuY2xvbmUgPSBmdW5jdGlvbigpIHsKICAgICAgICAgICAgdmFyIGUyID0gbmV3IG4oKTsKICAgICAgICAgICAgZm9yICh2YXIgdDIgaW4gdGhpcykKICAgICAgICAgICAgICAiZnVuY3Rpb24iICE9IHR5cGVvZiB0aGlzW3QyXSAmJiAoZTJbdDJdID0gdGhpc1t0Ml0pOwogICAgICAgICAgICByZXR1cm4gZTI7CiAgICAgICAgICB9OwogICAgICAgIH0KICAgICAgICAobi5wcm90b3R5cGUgPSBlKCIuL29iamVjdCIpKS5sb2FkQXN5bmMgPSBlKCIuL2xvYWQiKSwgbi5zdXBwb3J0ID0gZSgiLi9zdXBwb3J0IiksIG4uZGVmYXVsdHMgPSBlKCIuL2RlZmF1bHRzIiksIG4udmVyc2lvbiA9ICIzLjEwLjEiLCBuLmxvYWRBc3luYyA9IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgcmV0dXJuIG5ldyBuKCkubG9hZEFzeW5jKGUyLCB0Mik7CiAgICAgICAgfSwgbi5leHRlcm5hbCA9IGUoIi4vZXh0ZXJuYWwiKSwgdC5leHBvcnRzID0gbjsKICAgICAgfSwgeyAiLi9kZWZhdWx0cyI6IDUsICIuL2V4dGVybmFsIjogNiwgIi4vbG9hZCI6IDExLCAiLi9vYmplY3QiOiAxNSwgIi4vc3VwcG9ydCI6IDMwIH1dLCAxMTogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICB2YXIgdSA9IGUoIi4vdXRpbHMiKSwgaSA9IGUoIi4vZXh0ZXJuYWwiKSwgbiA9IGUoIi4vdXRmOCIpLCBzID0gZSgiLi96aXBFbnRyaWVzIiksIGEgPSBlKCIuL3N0cmVhbS9DcmMzMlByb2JlIiksIGwgPSBlKCIuL25vZGVqc1V0aWxzIik7CiAgICAgICAgZnVuY3Rpb24gZihuMikgewogICAgICAgICAgcmV0dXJuIG5ldyBpLlByb21pc2UoZnVuY3Rpb24oZTIsIHQyKSB7CiAgICAgICAgICAgIHZhciByMiA9IG4yLmRlY29tcHJlc3NlZC5nZXRDb250ZW50V29ya2VyKCkucGlwZShuZXcgYSgpKTsKICAgICAgICAgICAgcjIub24oImVycm9yIiwgZnVuY3Rpb24oZTMpIHsKICAgICAgICAgICAgICB0MihlMyk7CiAgICAgICAgICAgIH0pLm9uKCJlbmQiLCBmdW5jdGlvbigpIHsKICAgICAgICAgICAgICByMi5zdHJlYW1JbmZvLmNyYzMyICE9PSBuMi5kZWNvbXByZXNzZWQuY3JjMzIgPyB0MihuZXcgRXJyb3IoIkNvcnJ1cHRlZCB6aXAgOiBDUkMzMiBtaXNtYXRjaCIpKSA6IGUyKCk7CiAgICAgICAgICAgIH0pLnJlc3VtZSgpOwogICAgICAgICAgfSk7CiAgICAgICAgfQogICAgICAgIHQuZXhwb3J0cyA9IGZ1bmN0aW9uKGUyLCBvKSB7CiAgICAgICAgICB2YXIgaCA9IHRoaXM7CiAgICAgICAgICByZXR1cm4gbyA9IHUuZXh0ZW5kKG8gfHwge30sIHsgYmFzZTY0OiBmYWxzZSwgY2hlY2tDUkMzMjogZmFsc2UsIG9wdGltaXplZEJpbmFyeVN0cmluZzogZmFsc2UsIGNyZWF0ZUZvbGRlcnM6IGZhbHNlLCBkZWNvZGVGaWxlTmFtZTogbi51dGY4ZGVjb2RlIH0pLCBsLmlzTm9kZSAmJiBsLmlzU3RyZWFtKGUyKSA/IGkuUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCJKU1ppcCBjYW4ndCBhY2NlcHQgYSBzdHJlYW0gd2hlbiBsb2FkaW5nIGEgemlwIGZpbGUuIikpIDogdS5wcmVwYXJlQ29udGVudCgidGhlIGxvYWRlZCB6aXAgZmlsZSIsIGUyLCB0cnVlLCBvLm9wdGltaXplZEJpbmFyeVN0cmluZywgby5iYXNlNjQpLnRoZW4oZnVuY3Rpb24oZTMpIHsKICAgICAgICAgICAgdmFyIHQyID0gbmV3IHMobyk7CiAgICAgICAgICAgIHJldHVybiB0Mi5sb2FkKGUzKSwgdDI7CiAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKGUzKSB7CiAgICAgICAgICAgIHZhciB0MiA9IFtpLlByb21pc2UucmVzb2x2ZShlMyldLCByMiA9IGUzLmZpbGVzOwogICAgICAgICAgICBpZiAoby5jaGVja0NSQzMyKQogICAgICAgICAgICAgIGZvciAodmFyIG4yID0gMDsgbjIgPCByMi5sZW5ndGg7IG4yKyspCiAgICAgICAgICAgICAgICB0Mi5wdXNoKGYocjJbbjJdKSk7CiAgICAgICAgICAgIHJldHVybiBpLlByb21pc2UuYWxsKHQyKTsKICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oZTMpIHsKICAgICAgICAgICAgZm9yICh2YXIgdDIgPSBlMy5zaGlmdCgpLCByMiA9IHQyLmZpbGVzLCBuMiA9IDA7IG4yIDwgcjIubGVuZ3RoOyBuMisrKSB7CiAgICAgICAgICAgICAgdmFyIGkyID0gcjJbbjJdLCBzMiA9IGkyLmZpbGVOYW1lU3RyLCBhMiA9IHUucmVzb2x2ZShpMi5maWxlTmFtZVN0cik7CiAgICAgICAgICAgICAgaC5maWxlKGEyLCBpMi5kZWNvbXByZXNzZWQsIHsgYmluYXJ5OiB0cnVlLCBvcHRpbWl6ZWRCaW5hcnlTdHJpbmc6IHRydWUsIGRhdGU6IGkyLmRhdGUsIGRpcjogaTIuZGlyLCBjb21tZW50OiBpMi5maWxlQ29tbWVudFN0ci5sZW5ndGggPyBpMi5maWxlQ29tbWVudFN0ciA6IG51bGwsIHVuaXhQZXJtaXNzaW9uczogaTIudW5peFBlcm1pc3Npb25zLCBkb3NQZXJtaXNzaW9uczogaTIuZG9zUGVybWlzc2lvbnMsIGNyZWF0ZUZvbGRlcnM6IG8uY3JlYXRlRm9sZGVycyB9KSwgaTIuZGlyIHx8IChoLmZpbGUoYTIpLnVuc2FmZU9yaWdpbmFsTmFtZSA9IHMyKTsKICAgICAgICAgICAgfQogICAgICAgICAgICByZXR1cm4gdDIuemlwQ29tbWVudC5sZW5ndGggJiYgKGguY29tbWVudCA9IHQyLnppcENvbW1lbnQpLCBoOwogICAgICAgICAgfSk7CiAgICAgICAgfTsKICAgICAgfSwgeyAiLi9leHRlcm5hbCI6IDYsICIuL25vZGVqc1V0aWxzIjogMTQsICIuL3N0cmVhbS9DcmMzMlByb2JlIjogMjUsICIuL3V0ZjgiOiAzMSwgIi4vdXRpbHMiOiAzMiwgIi4vemlwRW50cmllcyI6IDMzIH1dLCAxMjogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICB2YXIgbiA9IGUoIi4uL3V0aWxzIiksIGkgPSBlKCIuLi9zdHJlYW0vR2VuZXJpY1dvcmtlciIpOwogICAgICAgIGZ1bmN0aW9uIHMoZTIsIHQyKSB7CiAgICAgICAgICBpLmNhbGwodGhpcywgIk5vZGVqcyBzdHJlYW0gaW5wdXQgYWRhcHRlciBmb3IgIiArIGUyKSwgdGhpcy5fdXBzdHJlYW1FbmRlZCA9IGZhbHNlLCB0aGlzLl9iaW5kU3RyZWFtKHQyKTsKICAgICAgICB9CiAgICAgICAgbi5pbmhlcml0cyhzLCBpKSwgcy5wcm90b3R5cGUuX2JpbmRTdHJlYW0gPSBmdW5jdGlvbihlMikgewogICAgICAgICAgdmFyIHQyID0gdGhpczsKICAgICAgICAgICh0aGlzLl9zdHJlYW0gPSBlMikucGF1c2UoKSwgZTIub24oImRhdGEiLCBmdW5jdGlvbihlMykgewogICAgICAgICAgICB0Mi5wdXNoKHsgZGF0YTogZTMsIG1ldGE6IHsgcGVyY2VudDogMCB9IH0pOwogICAgICAgICAgfSkub24oImVycm9yIiwgZnVuY3Rpb24oZTMpIHsKICAgICAgICAgICAgdDIuaXNQYXVzZWQgPyB0aGlzLmdlbmVyYXRlZEVycm9yID0gZTMgOiB0Mi5lcnJvcihlMyk7CiAgICAgICAgICB9KS5vbigiZW5kIiwgZnVuY3Rpb24oKSB7CiAgICAgICAgICAgIHQyLmlzUGF1c2VkID8gdDIuX3Vwc3RyZWFtRW5kZWQgPSB0cnVlIDogdDIuZW5kKCk7CiAgICAgICAgICB9KTsKICAgICAgICB9LCBzLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uKCkgewogICAgICAgICAgcmV0dXJuICEhaS5wcm90b3R5cGUucGF1c2UuY2FsbCh0aGlzKSAmJiAodGhpcy5fc3RyZWFtLnBhdXNlKCksIHRydWUpOwogICAgICAgIH0sIHMucHJvdG90eXBlLnJlc3VtZSA9IGZ1bmN0aW9uKCkgewogICAgICAgICAgcmV0dXJuICEhaS5wcm90b3R5cGUucmVzdW1lLmNhbGwodGhpcykgJiYgKHRoaXMuX3Vwc3RyZWFtRW5kZWQgPyB0aGlzLmVuZCgpIDogdGhpcy5fc3RyZWFtLnJlc3VtZSgpLCB0cnVlKTsKICAgICAgICB9LCB0LmV4cG9ydHMgPSBzOwogICAgICB9LCB7ICIuLi9zdHJlYW0vR2VuZXJpY1dvcmtlciI6IDI4LCAiLi4vdXRpbHMiOiAzMiB9XSwgMTM6IFtmdW5jdGlvbihlLCB0LCByKSB7CiAgICAgICAgdmFyIGkgPSBlKCJyZWFkYWJsZS1zdHJlYW0iKS5SZWFkYWJsZTsKICAgICAgICBmdW5jdGlvbiBuKGUyLCB0MiwgcjIpIHsKICAgICAgICAgIGkuY2FsbCh0aGlzLCB0MiksIHRoaXMuX2hlbHBlciA9IGUyOwogICAgICAgICAgdmFyIG4yID0gdGhpczsKICAgICAgICAgIGUyLm9uKCJkYXRhIiwgZnVuY3Rpb24oZTMsIHQzKSB7CiAgICAgICAgICAgIG4yLnB1c2goZTMpIHx8IG4yLl9oZWxwZXIucGF1c2UoKSwgcjIgJiYgcjIodDMpOwogICAgICAgICAgfSkub24oImVycm9yIiwgZnVuY3Rpb24oZTMpIHsKICAgICAgICAgICAgbjIuZW1pdCgiZXJyb3IiLCBlMyk7CiAgICAgICAgICB9KS5vbigiZW5kIiwgZnVuY3Rpb24oKSB7CiAgICAgICAgICAgIG4yLnB1c2gobnVsbCk7CiAgICAgICAgICB9KTsKICAgICAgICB9CiAgICAgICAgZSgiLi4vdXRpbHMiKS5pbmhlcml0cyhuLCBpKSwgbi5wcm90b3R5cGUuX3JlYWQgPSBmdW5jdGlvbigpIHsKICAgICAgICAgIHRoaXMuX2hlbHBlci5yZXN1bWUoKTsKICAgICAgICB9LCB0LmV4cG9ydHMgPSBuOwogICAgICB9LCB7ICIuLi91dGlscyI6IDMyLCAicmVhZGFibGUtc3RyZWFtIjogMTYgfV0sIDE0OiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIHQuZXhwb3J0cyA9IHsgaXNOb2RlOiAidW5kZWZpbmVkIiAhPSB0eXBlb2YgQnVmZmVyLCBuZXdCdWZmZXJGcm9tOiBmdW5jdGlvbihlMiwgdDIpIHsKICAgICAgICAgIGlmIChCdWZmZXIuZnJvbSAmJiBCdWZmZXIuZnJvbSAhPT0gVWludDhBcnJheS5mcm9tKQogICAgICAgICAgICByZXR1cm4gQnVmZmVyLmZyb20oZTIsIHQyKTsKICAgICAgICAgIGlmICgibnVtYmVyIiA9PSB0eXBlb2YgZTIpCiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlICJkYXRhIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBhIG51bWJlcicpOwogICAgICAgICAgcmV0dXJuIG5ldyBCdWZmZXIoZTIsIHQyKTsKICAgICAgICB9LCBhbGxvY0J1ZmZlcjogZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIGlmIChCdWZmZXIuYWxsb2MpCiAgICAgICAgICAgIHJldHVybiBCdWZmZXIuYWxsb2MoZTIpOwogICAgICAgICAgdmFyIHQyID0gbmV3IEJ1ZmZlcihlMik7CiAgICAgICAgICByZXR1cm4gdDIuZmlsbCgwKSwgdDI7CiAgICAgICAgfSwgaXNCdWZmZXI6IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICByZXR1cm4gQnVmZmVyLmlzQnVmZmVyKGUyKTsKICAgICAgICB9LCBpc1N0cmVhbTogZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHJldHVybiBlMiAmJiAiZnVuY3Rpb24iID09IHR5cGVvZiBlMi5vbiAmJiAiZnVuY3Rpb24iID09IHR5cGVvZiBlMi5wYXVzZSAmJiAiZnVuY3Rpb24iID09IHR5cGVvZiBlMi5yZXN1bWU7CiAgICAgICAgfSB9OwogICAgICB9LCB7fV0sIDE1OiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIGZ1bmN0aW9uIHMoZTIsIHQyLCByMikgewogICAgICAgICAgdmFyIG4yLCBpMiA9IHUuZ2V0VHlwZU9mKHQyKSwgczIgPSB1LmV4dGVuZChyMiB8fCB7fSwgZik7CiAgICAgICAgICBzMi5kYXRlID0gczIuZGF0ZSB8fCAvKiBAX19QVVJFX18gKi8gbmV3IERhdGUoKSwgbnVsbCAhPT0gczIuY29tcHJlc3Npb24gJiYgKHMyLmNvbXByZXNzaW9uID0gczIuY29tcHJlc3Npb24udG9VcHBlckNhc2UoKSksICJzdHJpbmciID09IHR5cGVvZiBzMi51bml4UGVybWlzc2lvbnMgJiYgKHMyLnVuaXhQZXJtaXNzaW9ucyA9IHBhcnNlSW50KHMyLnVuaXhQZXJtaXNzaW9ucywgOCkpLCBzMi51bml4UGVybWlzc2lvbnMgJiYgMTYzODQgJiBzMi51bml4UGVybWlzc2lvbnMgJiYgKHMyLmRpciA9IHRydWUpLCBzMi5kb3NQZXJtaXNzaW9ucyAmJiAxNiAmIHMyLmRvc1Blcm1pc3Npb25zICYmIChzMi5kaXIgPSB0cnVlKSwgczIuZGlyICYmIChlMiA9IGcoZTIpKSwgczIuY3JlYXRlRm9sZGVycyAmJiAobjIgPSBfKGUyKSkgJiYgYi5jYWxsKHRoaXMsIG4yLCB0cnVlKTsKICAgICAgICAgIHZhciBhMiA9ICJzdHJpbmciID09PSBpMiAmJiBmYWxzZSA9PT0gczIuYmluYXJ5ICYmIGZhbHNlID09PSBzMi5iYXNlNjQ7CiAgICAgICAgICByMiAmJiB2b2lkIDAgIT09IHIyLmJpbmFyeSB8fCAoczIuYmluYXJ5ID0gIWEyKSwgKHQyIGluc3RhbmNlb2YgYyAmJiAwID09PSB0Mi51bmNvbXByZXNzZWRTaXplIHx8IHMyLmRpciB8fCAhdDIgfHwgMCA9PT0gdDIubGVuZ3RoKSAmJiAoczIuYmFzZTY0ID0gZmFsc2UsIHMyLmJpbmFyeSA9IHRydWUsIHQyID0gIiIsIHMyLmNvbXByZXNzaW9uID0gIlNUT1JFIiwgaTIgPSAic3RyaW5nIik7CiAgICAgICAgICB2YXIgbzIgPSBudWxsOwogICAgICAgICAgbzIgPSB0MiBpbnN0YW5jZW9mIGMgfHwgdDIgaW5zdGFuY2VvZiBsID8gdDIgOiBwLmlzTm9kZSAmJiBwLmlzU3RyZWFtKHQyKSA/IG5ldyBtKGUyLCB0MikgOiB1LnByZXBhcmVDb250ZW50KGUyLCB0MiwgczIuYmluYXJ5LCBzMi5vcHRpbWl6ZWRCaW5hcnlTdHJpbmcsIHMyLmJhc2U2NCk7CiAgICAgICAgICB2YXIgaDIgPSBuZXcgZChlMiwgbzIsIHMyKTsKICAgICAgICAgIHRoaXMuZmlsZXNbZTJdID0gaDI7CiAgICAgICAgfQogICAgICAgIHZhciBpID0gZSgiLi91dGY4IiksIHUgPSBlKCIuL3V0aWxzIiksIGwgPSBlKCIuL3N0cmVhbS9HZW5lcmljV29ya2VyIiksIGEgPSBlKCIuL3N0cmVhbS9TdHJlYW1IZWxwZXIiKSwgZiA9IGUoIi4vZGVmYXVsdHMiKSwgYyA9IGUoIi4vY29tcHJlc3NlZE9iamVjdCIpLCBkID0gZSgiLi96aXBPYmplY3QiKSwgbyA9IGUoIi4vZ2VuZXJhdGUiKSwgcCA9IGUoIi4vbm9kZWpzVXRpbHMiKSwgbSA9IGUoIi4vbm9kZWpzL05vZGVqc1N0cmVhbUlucHV0QWRhcHRlciIpLCBfID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgICIvIiA9PT0gZTIuc2xpY2UoLTEpICYmIChlMiA9IGUyLnN1YnN0cmluZygwLCBlMi5sZW5ndGggLSAxKSk7CiAgICAgICAgICB2YXIgdDIgPSBlMi5sYXN0SW5kZXhPZigiLyIpOwogICAgICAgICAgcmV0dXJuIDAgPCB0MiA/IGUyLnN1YnN0cmluZygwLCB0MikgOiAiIjsKICAgICAgICB9LCBnID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHJldHVybiAiLyIgIT09IGUyLnNsaWNlKC0xKSAmJiAoZTIgKz0gIi8iKSwgZTI7CiAgICAgICAgfSwgYiA9IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgcmV0dXJuIHQyID0gdm9pZCAwICE9PSB0MiA/IHQyIDogZi5jcmVhdGVGb2xkZXJzLCBlMiA9IGcoZTIpLCB0aGlzLmZpbGVzW2UyXSB8fCBzLmNhbGwodGhpcywgZTIsIG51bGwsIHsgZGlyOiB0cnVlLCBjcmVhdGVGb2xkZXJzOiB0MiB9KSwgdGhpcy5maWxlc1tlMl07CiAgICAgICAgfTsKICAgICAgICBmdW5jdGlvbiBoKGUyKSB7CiAgICAgICAgICByZXR1cm4gIltvYmplY3QgUmVnRXhwXSIgPT09IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlMik7CiAgICAgICAgfQogICAgICAgIHZhciBuID0geyBsb2FkOiBmdW5jdGlvbigpIHsKICAgICAgICAgIHRocm93IG5ldyBFcnJvcigiVGhpcyBtZXRob2QgaGFzIGJlZW4gcmVtb3ZlZCBpbiBKU1ppcCAzLjAsIHBsZWFzZSBjaGVjayB0aGUgdXBncmFkZSBndWlkZS4iKTsKICAgICAgICB9LCBmb3JFYWNoOiBmdW5jdGlvbihlMikgewogICAgICAgICAgdmFyIHQyLCByMiwgbjI7CiAgICAgICAgICBmb3IgKHQyIGluIHRoaXMuZmlsZXMpCiAgICAgICAgICAgIG4yID0gdGhpcy5maWxlc1t0Ml0sIChyMiA9IHQyLnNsaWNlKHRoaXMucm9vdC5sZW5ndGgsIHQyLmxlbmd0aCkpICYmIHQyLnNsaWNlKDAsIHRoaXMucm9vdC5sZW5ndGgpID09PSB0aGlzLnJvb3QgJiYgZTIocjIsIG4yKTsKICAgICAgICB9LCBmaWx0ZXI6IGZ1bmN0aW9uKHIyKSB7CiAgICAgICAgICB2YXIgbjIgPSBbXTsKICAgICAgICAgIHJldHVybiB0aGlzLmZvckVhY2goZnVuY3Rpb24oZTIsIHQyKSB7CiAgICAgICAgICAgIHIyKGUyLCB0MikgJiYgbjIucHVzaCh0Mik7CiAgICAgICAgICB9KSwgbjI7CiAgICAgICAgfSwgZmlsZTogZnVuY3Rpb24oZTIsIHQyLCByMikgewogICAgICAgICAgaWYgKDEgIT09IGFyZ3VtZW50cy5sZW5ndGgpCiAgICAgICAgICAgIHJldHVybiBlMiA9IHRoaXMucm9vdCArIGUyLCBzLmNhbGwodGhpcywgZTIsIHQyLCByMiksIHRoaXM7CiAgICAgICAgICBpZiAoaChlMikpIHsKICAgICAgICAgICAgdmFyIG4yID0gZTI7CiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbHRlcihmdW5jdGlvbihlMywgdDMpIHsKICAgICAgICAgICAgICByZXR1cm4gIXQzLmRpciAmJiBuMi50ZXN0KGUzKTsKICAgICAgICAgICAgfSk7CiAgICAgICAgICB9CiAgICAgICAgICB2YXIgaTIgPSB0aGlzLmZpbGVzW3RoaXMucm9vdCArIGUyXTsKICAgICAgICAgIHJldHVybiBpMiAmJiAhaTIuZGlyID8gaTIgOiBudWxsOwogICAgICAgIH0sIGZvbGRlcjogZnVuY3Rpb24ocjIpIHsKICAgICAgICAgIGlmICghcjIpCiAgICAgICAgICAgIHJldHVybiB0aGlzOwogICAgICAgICAgaWYgKGgocjIpKQogICAgICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXIoZnVuY3Rpb24oZTMsIHQzKSB7CiAgICAgICAgICAgICAgcmV0dXJuIHQzLmRpciAmJiByMi50ZXN0KGUzKTsKICAgICAgICAgICAgfSk7CiAgICAgICAgICB2YXIgZTIgPSB0aGlzLnJvb3QgKyByMiwgdDIgPSBiLmNhbGwodGhpcywgZTIpLCBuMiA9IHRoaXMuY2xvbmUoKTsKICAgICAgICAgIHJldHVybiBuMi5yb290ID0gdDIubmFtZSwgbjI7CiAgICAgICAgfSwgcmVtb3ZlOiBmdW5jdGlvbihyMikgewogICAgICAgICAgcjIgPSB0aGlzLnJvb3QgKyByMjsKICAgICAgICAgIHZhciBlMiA9IHRoaXMuZmlsZXNbcjJdOwogICAgICAgICAgaWYgKGUyIHx8ICgiLyIgIT09IHIyLnNsaWNlKC0xKSAmJiAocjIgKz0gIi8iKSwgZTIgPSB0aGlzLmZpbGVzW3IyXSksIGUyICYmICFlMi5kaXIpCiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmZpbGVzW3IyXTsKICAgICAgICAgIGVsc2UKICAgICAgICAgICAgZm9yICh2YXIgdDIgPSB0aGlzLmZpbHRlcihmdW5jdGlvbihlMywgdDMpIHsKICAgICAgICAgICAgICByZXR1cm4gdDMubmFtZS5zbGljZSgwLCByMi5sZW5ndGgpID09PSByMjsKICAgICAgICAgICAgfSksIG4yID0gMDsgbjIgPCB0Mi5sZW5ndGg7IG4yKyspCiAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuZmlsZXNbdDJbbjJdLm5hbWVdOwogICAgICAgICAgcmV0dXJuIHRoaXM7CiAgICAgICAgfSwgZ2VuZXJhdGU6IGZ1bmN0aW9uKCkgewogICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJUaGlzIG1ldGhvZCBoYXMgYmVlbiByZW1vdmVkIGluIEpTWmlwIDMuMCwgcGxlYXNlIGNoZWNrIHRoZSB1cGdyYWRlIGd1aWRlLiIpOwogICAgICAgIH0sIGdlbmVyYXRlSW50ZXJuYWxTdHJlYW06IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICB2YXIgdDIsIHIyID0ge307CiAgICAgICAgICB0cnkgewogICAgICAgICAgICBpZiAoKHIyID0gdS5leHRlbmQoZTIgfHwge30sIHsgc3RyZWFtRmlsZXM6IGZhbHNlLCBjb21wcmVzc2lvbjogIlNUT1JFIiwgY29tcHJlc3Npb25PcHRpb25zOiBudWxsLCB0eXBlOiAiIiwgcGxhdGZvcm06ICJET1MiLCBjb21tZW50OiBudWxsLCBtaW1lVHlwZTogImFwcGxpY2F0aW9uL3ppcCIsIGVuY29kZUZpbGVOYW1lOiBpLnV0ZjhlbmNvZGUgfSkpLnR5cGUgPSByMi50eXBlLnRvTG93ZXJDYXNlKCksIHIyLmNvbXByZXNzaW9uID0gcjIuY29tcHJlc3Npb24udG9VcHBlckNhc2UoKSwgImJpbmFyeXN0cmluZyIgPT09IHIyLnR5cGUgJiYgKHIyLnR5cGUgPSAic3RyaW5nIiksICFyMi50eXBlKQogICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigiTm8gb3V0cHV0IHR5cGUgc3BlY2lmaWVkLiIpOwogICAgICAgICAgICB1LmNoZWNrU3VwcG9ydChyMi50eXBlKSwgImRhcndpbiIgIT09IHIyLnBsYXRmb3JtICYmICJmcmVlYnNkIiAhPT0gcjIucGxhdGZvcm0gJiYgImxpbnV4IiAhPT0gcjIucGxhdGZvcm0gJiYgInN1bm9zIiAhPT0gcjIucGxhdGZvcm0gfHwgKHIyLnBsYXRmb3JtID0gIlVOSVgiKSwgIndpbjMyIiA9PT0gcjIucGxhdGZvcm0gJiYgKHIyLnBsYXRmb3JtID0gIkRPUyIpOwogICAgICAgICAgICB2YXIgbjIgPSByMi5jb21tZW50IHx8IHRoaXMuY29tbWVudCB8fCAiIjsKICAgICAgICAgICAgdDIgPSBvLmdlbmVyYXRlV29ya2VyKHRoaXMsIHIyLCBuMik7CiAgICAgICAgICB9IGNhdGNoIChlMykgewogICAgICAgICAgICAodDIgPSBuZXcgbCgiZXJyb3IiKSkuZXJyb3IoZTMpOwogICAgICAgICAgfQogICAgICAgICAgcmV0dXJuIG5ldyBhKHQyLCByMi50eXBlIHx8ICJzdHJpbmciLCByMi5taW1lVHlwZSk7CiAgICAgICAgfSwgZ2VuZXJhdGVBc3luYzogZnVuY3Rpb24oZTIsIHQyKSB7CiAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUludGVybmFsU3RyZWFtKGUyKS5hY2N1bXVsYXRlKHQyKTsKICAgICAgICB9LCBnZW5lcmF0ZU5vZGVTdHJlYW06IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgcmV0dXJuIChlMiA9IGUyIHx8IHt9KS50eXBlIHx8IChlMi50eXBlID0gIm5vZGVidWZmZXIiKSwgdGhpcy5nZW5lcmF0ZUludGVybmFsU3RyZWFtKGUyKS50b05vZGVqc1N0cmVhbSh0Mik7CiAgICAgICAgfSB9OwogICAgICAgIHQuZXhwb3J0cyA9IG47CiAgICAgIH0sIHsgIi4vY29tcHJlc3NlZE9iamVjdCI6IDIsICIuL2RlZmF1bHRzIjogNSwgIi4vZ2VuZXJhdGUiOiA5LCAiLi9ub2RlanMvTm9kZWpzU3RyZWFtSW5wdXRBZGFwdGVyIjogMTIsICIuL25vZGVqc1V0aWxzIjogMTQsICIuL3N0cmVhbS9HZW5lcmljV29ya2VyIjogMjgsICIuL3N0cmVhbS9TdHJlYW1IZWxwZXIiOiAyOSwgIi4vdXRmOCI6IDMxLCAiLi91dGlscyI6IDMyLCAiLi96aXBPYmplY3QiOiAzNSB9XSwgMTY6IFtmdW5jdGlvbihlLCB0LCByKSB7CiAgICAgICAgdC5leHBvcnRzID0gZSgic3RyZWFtIik7CiAgICAgIH0sIHsgc3RyZWFtOiB2b2lkIDAgfV0sIDE3OiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIHZhciBuID0gZSgiLi9EYXRhUmVhZGVyIik7CiAgICAgICAgZnVuY3Rpb24gaShlMikgewogICAgICAgICAgbi5jYWxsKHRoaXMsIGUyKTsKICAgICAgICAgIGZvciAodmFyIHQyID0gMDsgdDIgPCB0aGlzLmRhdGEubGVuZ3RoOyB0MisrKQogICAgICAgICAgICBlMlt0Ml0gPSAyNTUgJiBlMlt0Ml07CiAgICAgICAgfQogICAgICAgIGUoIi4uL3V0aWxzIikuaW5oZXJpdHMoaSwgbiksIGkucHJvdG90eXBlLmJ5dGVBdCA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhW3RoaXMuemVybyArIGUyXTsKICAgICAgICB9LCBpLnByb3RvdHlwZS5sYXN0SW5kZXhPZlNpZ25hdHVyZSA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICBmb3IgKHZhciB0MiA9IGUyLmNoYXJDb2RlQXQoMCksIHIyID0gZTIuY2hhckNvZGVBdCgxKSwgbjIgPSBlMi5jaGFyQ29kZUF0KDIpLCBpMiA9IGUyLmNoYXJDb2RlQXQoMyksIHMgPSB0aGlzLmxlbmd0aCAtIDQ7IDAgPD0gczsgLS1zKQogICAgICAgICAgICBpZiAodGhpcy5kYXRhW3NdID09PSB0MiAmJiB0aGlzLmRhdGFbcyArIDFdID09PSByMiAmJiB0aGlzLmRhdGFbcyArIDJdID09PSBuMiAmJiB0aGlzLmRhdGFbcyArIDNdID09PSBpMikKICAgICAgICAgICAgICByZXR1cm4gcyAtIHRoaXMuemVybzsKICAgICAgICAgIHJldHVybiAtMTsKICAgICAgICB9LCBpLnByb3RvdHlwZS5yZWFkQW5kQ2hlY2tTaWduYXR1cmUgPSBmdW5jdGlvbihlMikgewogICAgICAgICAgdmFyIHQyID0gZTIuY2hhckNvZGVBdCgwKSwgcjIgPSBlMi5jaGFyQ29kZUF0KDEpLCBuMiA9IGUyLmNoYXJDb2RlQXQoMiksIGkyID0gZTIuY2hhckNvZGVBdCgzKSwgcyA9IHRoaXMucmVhZERhdGEoNCk7CiAgICAgICAgICByZXR1cm4gdDIgPT09IHNbMF0gJiYgcjIgPT09IHNbMV0gJiYgbjIgPT09IHNbMl0gJiYgaTIgPT09IHNbM107CiAgICAgICAgfSwgaS5wcm90b3R5cGUucmVhZERhdGEgPSBmdW5jdGlvbihlMikgewogICAgICAgICAgaWYgKHRoaXMuY2hlY2tPZmZzZXQoZTIpLCAwID09PSBlMikKICAgICAgICAgICAgcmV0dXJuIFtdOwogICAgICAgICAgdmFyIHQyID0gdGhpcy5kYXRhLnNsaWNlKHRoaXMuemVybyArIHRoaXMuaW5kZXgsIHRoaXMuemVybyArIHRoaXMuaW5kZXggKyBlMik7CiAgICAgICAgICByZXR1cm4gdGhpcy5pbmRleCArPSBlMiwgdDI7CiAgICAgICAgfSwgdC5leHBvcnRzID0gaTsKICAgICAgfSwgeyAiLi4vdXRpbHMiOiAzMiwgIi4vRGF0YVJlYWRlciI6IDE4IH1dLCAxODogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICB2YXIgbiA9IGUoIi4uL3V0aWxzIik7CiAgICAgICAgZnVuY3Rpb24gaShlMikgewogICAgICAgICAgdGhpcy5kYXRhID0gZTIsIHRoaXMubGVuZ3RoID0gZTIubGVuZ3RoLCB0aGlzLmluZGV4ID0gMCwgdGhpcy56ZXJvID0gMDsKICAgICAgICB9CiAgICAgICAgaS5wcm90b3R5cGUgPSB7IGNoZWNrT2Zmc2V0OiBmdW5jdGlvbihlMikgewogICAgICAgICAgdGhpcy5jaGVja0luZGV4KHRoaXMuaW5kZXggKyBlMik7CiAgICAgICAgfSwgY2hlY2tJbmRleDogZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIGlmICh0aGlzLmxlbmd0aCA8IHRoaXMuemVybyArIGUyIHx8IGUyIDwgMCkKICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJFbmQgb2YgZGF0YSByZWFjaGVkIChkYXRhIGxlbmd0aCA9ICIgKyB0aGlzLmxlbmd0aCArICIsIGFza2VkIGluZGV4ID0gIiArIGUyICsgIikuIENvcnJ1cHRlZCB6aXAgPyIpOwogICAgICAgIH0sIHNldEluZGV4OiBmdW5jdGlvbihlMikgewogICAgICAgICAgdGhpcy5jaGVja0luZGV4KGUyKSwgdGhpcy5pbmRleCA9IGUyOwogICAgICAgIH0sIHNraXA6IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICB0aGlzLnNldEluZGV4KHRoaXMuaW5kZXggKyBlMik7CiAgICAgICAgfSwgYnl0ZUF0OiBmdW5jdGlvbigpIHsKICAgICAgICB9LCByZWFkSW50OiBmdW5jdGlvbihlMikgewogICAgICAgICAgdmFyIHQyLCByMiA9IDA7CiAgICAgICAgICBmb3IgKHRoaXMuY2hlY2tPZmZzZXQoZTIpLCB0MiA9IHRoaXMuaW5kZXggKyBlMiAtIDE7IHQyID49IHRoaXMuaW5kZXg7IHQyLS0pCiAgICAgICAgICAgIHIyID0gKHIyIDw8IDgpICsgdGhpcy5ieXRlQXQodDIpOwogICAgICAgICAgcmV0dXJuIHRoaXMuaW5kZXggKz0gZTIsIHIyOwogICAgICAgIH0sIHJlYWRTdHJpbmc6IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICByZXR1cm4gbi50cmFuc2Zvcm1Ubygic3RyaW5nIiwgdGhpcy5yZWFkRGF0YShlMikpOwogICAgICAgIH0sIHJlYWREYXRhOiBmdW5jdGlvbigpIHsKICAgICAgICB9LCBsYXN0SW5kZXhPZlNpZ25hdHVyZTogZnVuY3Rpb24oKSB7CiAgICAgICAgfSwgcmVhZEFuZENoZWNrU2lnbmF0dXJlOiBmdW5jdGlvbigpIHsKICAgICAgICB9LCByZWFkRGF0ZTogZnVuY3Rpb24oKSB7CiAgICAgICAgICB2YXIgZTIgPSB0aGlzLnJlYWRJbnQoNCk7CiAgICAgICAgICByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk4MCArIChlMiA+PiAyNSAmIDEyNyksIChlMiA+PiAyMSAmIDE1KSAtIDEsIGUyID4+IDE2ICYgMzEsIGUyID4+IDExICYgMzEsIGUyID4+IDUgJiA2MywgKDMxICYgZTIpIDw8IDEpKTsKICAgICAgICB9IH0sIHQuZXhwb3J0cyA9IGk7CiAgICAgIH0sIHsgIi4uL3V0aWxzIjogMzIgfV0sIDE5OiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIHZhciBuID0gZSgiLi9VaW50OEFycmF5UmVhZGVyIik7CiAgICAgICAgZnVuY3Rpb24gaShlMikgewogICAgICAgICAgbi5jYWxsKHRoaXMsIGUyKTsKICAgICAgICB9CiAgICAgICAgZSgiLi4vdXRpbHMiKS5pbmhlcml0cyhpLCBuKSwgaS5wcm90b3R5cGUucmVhZERhdGEgPSBmdW5jdGlvbihlMikgewogICAgICAgICAgdGhpcy5jaGVja09mZnNldChlMik7CiAgICAgICAgICB2YXIgdDIgPSB0aGlzLmRhdGEuc2xpY2UodGhpcy56ZXJvICsgdGhpcy5pbmRleCwgdGhpcy56ZXJvICsgdGhpcy5pbmRleCArIGUyKTsKICAgICAgICAgIHJldHVybiB0aGlzLmluZGV4ICs9IGUyLCB0MjsKICAgICAgICB9LCB0LmV4cG9ydHMgPSBpOwogICAgICB9LCB7ICIuLi91dGlscyI6IDMyLCAiLi9VaW50OEFycmF5UmVhZGVyIjogMjEgfV0sIDIwOiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIHZhciBuID0gZSgiLi9EYXRhUmVhZGVyIik7CiAgICAgICAgZnVuY3Rpb24gaShlMikgewogICAgICAgICAgbi5jYWxsKHRoaXMsIGUyKTsKICAgICAgICB9CiAgICAgICAgZSgiLi4vdXRpbHMiKS5pbmhlcml0cyhpLCBuKSwgaS5wcm90b3R5cGUuYnl0ZUF0ID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHJldHVybiB0aGlzLmRhdGEuY2hhckNvZGVBdCh0aGlzLnplcm8gKyBlMik7CiAgICAgICAgfSwgaS5wcm90b3R5cGUubGFzdEluZGV4T2ZTaWduYXR1cmUgPSBmdW5jdGlvbihlMikgewogICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5sYXN0SW5kZXhPZihlMikgLSB0aGlzLnplcm87CiAgICAgICAgfSwgaS5wcm90b3R5cGUucmVhZEFuZENoZWNrU2lnbmF0dXJlID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHJldHVybiBlMiA9PT0gdGhpcy5yZWFkRGF0YSg0KTsKICAgICAgICB9LCBpLnByb3RvdHlwZS5yZWFkRGF0YSA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICB0aGlzLmNoZWNrT2Zmc2V0KGUyKTsKICAgICAgICAgIHZhciB0MiA9IHRoaXMuZGF0YS5zbGljZSh0aGlzLnplcm8gKyB0aGlzLmluZGV4LCB0aGlzLnplcm8gKyB0aGlzLmluZGV4ICsgZTIpOwogICAgICAgICAgcmV0dXJuIHRoaXMuaW5kZXggKz0gZTIsIHQyOwogICAgICAgIH0sIHQuZXhwb3J0cyA9IGk7CiAgICAgIH0sIHsgIi4uL3V0aWxzIjogMzIsICIuL0RhdGFSZWFkZXIiOiAxOCB9XSwgMjE6IFtmdW5jdGlvbihlLCB0LCByKSB7CiAgICAgICAgdmFyIG4gPSBlKCIuL0FycmF5UmVhZGVyIik7CiAgICAgICAgZnVuY3Rpb24gaShlMikgewogICAgICAgICAgbi5jYWxsKHRoaXMsIGUyKTsKICAgICAgICB9CiAgICAgICAgZSgiLi4vdXRpbHMiKS5pbmhlcml0cyhpLCBuKSwgaS5wcm90b3R5cGUucmVhZERhdGEgPSBmdW5jdGlvbihlMikgewogICAgICAgICAgaWYgKHRoaXMuY2hlY2tPZmZzZXQoZTIpLCAwID09PSBlMikKICAgICAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KDApOwogICAgICAgICAgdmFyIHQyID0gdGhpcy5kYXRhLnN1YmFycmF5KHRoaXMuemVybyArIHRoaXMuaW5kZXgsIHRoaXMuemVybyArIHRoaXMuaW5kZXggKyBlMik7CiAgICAgICAgICByZXR1cm4gdGhpcy5pbmRleCArPSBlMiwgdDI7CiAgICAgICAgfSwgdC5leHBvcnRzID0gaTsKICAgICAgfSwgeyAiLi4vdXRpbHMiOiAzMiwgIi4vQXJyYXlSZWFkZXIiOiAxNyB9XSwgMjI6IFtmdW5jdGlvbihlLCB0LCByKSB7CiAgICAgICAgdmFyIG4gPSBlKCIuLi91dGlscyIpLCBpID0gZSgiLi4vc3VwcG9ydCIpLCBzID0gZSgiLi9BcnJheVJlYWRlciIpLCBhID0gZSgiLi9TdHJpbmdSZWFkZXIiKSwgbyA9IGUoIi4vTm9kZUJ1ZmZlclJlYWRlciIpLCBoID0gZSgiLi9VaW50OEFycmF5UmVhZGVyIik7CiAgICAgICAgdC5leHBvcnRzID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHZhciB0MiA9IG4uZ2V0VHlwZU9mKGUyKTsKICAgICAgICAgIHJldHVybiBuLmNoZWNrU3VwcG9ydCh0MiksICJzdHJpbmciICE9PSB0MiB8fCBpLnVpbnQ4YXJyYXkgPyAibm9kZWJ1ZmZlciIgPT09IHQyID8gbmV3IG8oZTIpIDogaS51aW50OGFycmF5ID8gbmV3IGgobi50cmFuc2Zvcm1UbygidWludDhhcnJheSIsIGUyKSkgOiBuZXcgcyhuLnRyYW5zZm9ybVRvKCJhcnJheSIsIGUyKSkgOiBuZXcgYShlMik7CiAgICAgICAgfTsKICAgICAgfSwgeyAiLi4vc3VwcG9ydCI6IDMwLCAiLi4vdXRpbHMiOiAzMiwgIi4vQXJyYXlSZWFkZXIiOiAxNywgIi4vTm9kZUJ1ZmZlclJlYWRlciI6IDE5LCAiLi9TdHJpbmdSZWFkZXIiOiAyMCwgIi4vVWludDhBcnJheVJlYWRlciI6IDIxIH1dLCAyMzogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICByLkxPQ0FMX0ZJTEVfSEVBREVSID0gIlBLAwQiLCByLkNFTlRSQUxfRklMRV9IRUFERVIgPSAiUEsBAiIsIHIuQ0VOVFJBTF9ESVJFQ1RPUllfRU5EID0gIlBLBQYiLCByLlpJUDY0X0NFTlRSQUxfRElSRUNUT1JZX0xPQ0FUT1IgPSAiUEsGXHgwNyIsIHIuWklQNjRfQ0VOVFJBTF9ESVJFQ1RPUllfRU5EID0gIlBLBgYiLCByLkRBVEFfREVTQ1JJUFRPUiA9ICJQS1x4MDdcYiI7CiAgICAgIH0sIHt9XSwgMjQ6IFtmdW5jdGlvbihlLCB0LCByKSB7CiAgICAgICAgdmFyIG4gPSBlKCIuL0dlbmVyaWNXb3JrZXIiKSwgaSA9IGUoIi4uL3V0aWxzIik7CiAgICAgICAgZnVuY3Rpb24gcyhlMikgewogICAgICAgICAgbi5jYWxsKHRoaXMsICJDb252ZXJ0V29ya2VyIHRvICIgKyBlMiksIHRoaXMuZGVzdFR5cGUgPSBlMjsKICAgICAgICB9CiAgICAgICAgaS5pbmhlcml0cyhzLCBuKSwgcy5wcm90b3R5cGUucHJvY2Vzc0NodW5rID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHRoaXMucHVzaCh7IGRhdGE6IGkudHJhbnNmb3JtVG8odGhpcy5kZXN0VHlwZSwgZTIuZGF0YSksIG1ldGE6IGUyLm1ldGEgfSk7CiAgICAgICAgfSwgdC5leHBvcnRzID0gczsKICAgICAgfSwgeyAiLi4vdXRpbHMiOiAzMiwgIi4vR2VuZXJpY1dvcmtlciI6IDI4IH1dLCAyNTogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICB2YXIgbiA9IGUoIi4vR2VuZXJpY1dvcmtlciIpLCBpID0gZSgiLi4vY3JjMzIiKTsKICAgICAgICBmdW5jdGlvbiBzKCkgewogICAgICAgICAgbi5jYWxsKHRoaXMsICJDcmMzMlByb2JlIiksIHRoaXMud2l0aFN0cmVhbUluZm8oImNyYzMyIiwgMCk7CiAgICAgICAgfQogICAgICAgIGUoIi4uL3V0aWxzIikuaW5oZXJpdHMocywgbiksIHMucHJvdG90eXBlLnByb2Nlc3NDaHVuayA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICB0aGlzLnN0cmVhbUluZm8uY3JjMzIgPSBpKGUyLmRhdGEsIHRoaXMuc3RyZWFtSW5mby5jcmMzMiB8fCAwKSwgdGhpcy5wdXNoKGUyKTsKICAgICAgICB9LCB0LmV4cG9ydHMgPSBzOwogICAgICB9LCB7ICIuLi9jcmMzMiI6IDQsICIuLi91dGlscyI6IDMyLCAiLi9HZW5lcmljV29ya2VyIjogMjggfV0sIDI2OiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIHZhciBuID0gZSgiLi4vdXRpbHMiKSwgaSA9IGUoIi4vR2VuZXJpY1dvcmtlciIpOwogICAgICAgIGZ1bmN0aW9uIHMoZTIpIHsKICAgICAgICAgIGkuY2FsbCh0aGlzLCAiRGF0YUxlbmd0aFByb2JlIGZvciAiICsgZTIpLCB0aGlzLnByb3BOYW1lID0gZTIsIHRoaXMud2l0aFN0cmVhbUluZm8oZTIsIDApOwogICAgICAgIH0KICAgICAgICBuLmluaGVyaXRzKHMsIGkpLCBzLnByb3RvdHlwZS5wcm9jZXNzQ2h1bmsgPSBmdW5jdGlvbihlMikgewogICAgICAgICAgaWYgKGUyKSB7CiAgICAgICAgICAgIHZhciB0MiA9IHRoaXMuc3RyZWFtSW5mb1t0aGlzLnByb3BOYW1lXSB8fCAwOwogICAgICAgICAgICB0aGlzLnN0cmVhbUluZm9bdGhpcy5wcm9wTmFtZV0gPSB0MiArIGUyLmRhdGEubGVuZ3RoOwogICAgICAgICAgfQogICAgICAgICAgaS5wcm90b3R5cGUucHJvY2Vzc0NodW5rLmNhbGwodGhpcywgZTIpOwogICAgICAgIH0sIHQuZXhwb3J0cyA9IHM7CiAgICAgIH0sIHsgIi4uL3V0aWxzIjogMzIsICIuL0dlbmVyaWNXb3JrZXIiOiAyOCB9XSwgMjc6IFtmdW5jdGlvbihlLCB0LCByKSB7CiAgICAgICAgdmFyIG4gPSBlKCIuLi91dGlscyIpLCBpID0gZSgiLi9HZW5lcmljV29ya2VyIik7CiAgICAgICAgZnVuY3Rpb24gcyhlMikgewogICAgICAgICAgaS5jYWxsKHRoaXMsICJEYXRhV29ya2VyIik7CiAgICAgICAgICB2YXIgdDIgPSB0aGlzOwogICAgICAgICAgdGhpcy5kYXRhSXNSZWFkeSA9IGZhbHNlLCB0aGlzLmluZGV4ID0gMCwgdGhpcy5tYXggPSAwLCB0aGlzLmRhdGEgPSBudWxsLCB0aGlzLnR5cGUgPSAiIiwgdGhpcy5fdGlja1NjaGVkdWxlZCA9IGZhbHNlLCBlMi50aGVuKGZ1bmN0aW9uKGUzKSB7CiAgICAgICAgICAgIHQyLmRhdGFJc1JlYWR5ID0gdHJ1ZSwgdDIuZGF0YSA9IGUzLCB0Mi5tYXggPSBlMyAmJiBlMy5sZW5ndGggfHwgMCwgdDIudHlwZSA9IG4uZ2V0VHlwZU9mKGUzKSwgdDIuaXNQYXVzZWQgfHwgdDIuX3RpY2tBbmRSZXBlYXQoKTsKICAgICAgICAgIH0sIGZ1bmN0aW9uKGUzKSB7CiAgICAgICAgICAgIHQyLmVycm9yKGUzKTsKICAgICAgICAgIH0pOwogICAgICAgIH0KICAgICAgICBuLmluaGVyaXRzKHMsIGkpLCBzLnByb3RvdHlwZS5jbGVhblVwID0gZnVuY3Rpb24oKSB7CiAgICAgICAgICBpLnByb3RvdHlwZS5jbGVhblVwLmNhbGwodGhpcyksIHRoaXMuZGF0YSA9IG51bGw7CiAgICAgICAgfSwgcy5wcm90b3R5cGUucmVzdW1lID0gZnVuY3Rpb24oKSB7CiAgICAgICAgICByZXR1cm4gISFpLnByb3RvdHlwZS5yZXN1bWUuY2FsbCh0aGlzKSAmJiAoIXRoaXMuX3RpY2tTY2hlZHVsZWQgJiYgdGhpcy5kYXRhSXNSZWFkeSAmJiAodGhpcy5fdGlja1NjaGVkdWxlZCA9IHRydWUsIG4uZGVsYXkodGhpcy5fdGlja0FuZFJlcGVhdCwgW10sIHRoaXMpKSwgdHJ1ZSk7CiAgICAgICAgfSwgcy5wcm90b3R5cGUuX3RpY2tBbmRSZXBlYXQgPSBmdW5jdGlvbigpIHsKICAgICAgICAgIHRoaXMuX3RpY2tTY2hlZHVsZWQgPSBmYWxzZSwgdGhpcy5pc1BhdXNlZCB8fCB0aGlzLmlzRmluaXNoZWQgfHwgKHRoaXMuX3RpY2soKSwgdGhpcy5pc0ZpbmlzaGVkIHx8IChuLmRlbGF5KHRoaXMuX3RpY2tBbmRSZXBlYXQsIFtdLCB0aGlzKSwgdGhpcy5fdGlja1NjaGVkdWxlZCA9IHRydWUpKTsKICAgICAgICB9LCBzLnByb3RvdHlwZS5fdGljayA9IGZ1bmN0aW9uKCkgewogICAgICAgICAgaWYgKHRoaXMuaXNQYXVzZWQgfHwgdGhpcy5pc0ZpbmlzaGVkKQogICAgICAgICAgICByZXR1cm4gZmFsc2U7CiAgICAgICAgICB2YXIgZTIgPSBudWxsLCB0MiA9IE1hdGgubWluKHRoaXMubWF4LCB0aGlzLmluZGV4ICsgMTYzODQpOwogICAgICAgICAgaWYgKHRoaXMuaW5kZXggPj0gdGhpcy5tYXgpCiAgICAgICAgICAgIHJldHVybiB0aGlzLmVuZCgpOwogICAgICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHsKICAgICAgICAgICAgY2FzZSAic3RyaW5nIjoKICAgICAgICAgICAgICBlMiA9IHRoaXMuZGF0YS5zdWJzdHJpbmcodGhpcy5pbmRleCwgdDIpOwogICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICBjYXNlICJ1aW50OGFycmF5IjoKICAgICAgICAgICAgICBlMiA9IHRoaXMuZGF0YS5zdWJhcnJheSh0aGlzLmluZGV4LCB0Mik7CiAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgIGNhc2UgImFycmF5IjoKICAgICAgICAgICAgY2FzZSAibm9kZWJ1ZmZlciI6CiAgICAgICAgICAgICAgZTIgPSB0aGlzLmRhdGEuc2xpY2UodGhpcy5pbmRleCwgdDIpOwogICAgICAgICAgfQogICAgICAgICAgcmV0dXJuIHRoaXMuaW5kZXggPSB0MiwgdGhpcy5wdXNoKHsgZGF0YTogZTIsIG1ldGE6IHsgcGVyY2VudDogdGhpcy5tYXggPyB0aGlzLmluZGV4IC8gdGhpcy5tYXggKiAxMDAgOiAwIH0gfSk7CiAgICAgICAgfSwgdC5leHBvcnRzID0gczsKICAgICAgfSwgeyAiLi4vdXRpbHMiOiAzMiwgIi4vR2VuZXJpY1dvcmtlciI6IDI4IH1dLCAyODogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICBmdW5jdGlvbiBuKGUyKSB7CiAgICAgICAgICB0aGlzLm5hbWUgPSBlMiB8fCAiZGVmYXVsdCIsIHRoaXMuc3RyZWFtSW5mbyA9IHt9LCB0aGlzLmdlbmVyYXRlZEVycm9yID0gbnVsbCwgdGhpcy5leHRyYVN0cmVhbUluZm8gPSB7fSwgdGhpcy5pc1BhdXNlZCA9IHRydWUsIHRoaXMuaXNGaW5pc2hlZCA9IGZhbHNlLCB0aGlzLmlzTG9ja2VkID0gZmFsc2UsIHRoaXMuX2xpc3RlbmVycyA9IHsgZGF0YTogW10sIGVuZDogW10sIGVycm9yOiBbXSB9LCB0aGlzLnByZXZpb3VzID0gbnVsbDsKICAgICAgICB9CiAgICAgICAgbi5wcm90b3R5cGUgPSB7IHB1c2g6IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICB0aGlzLmVtaXQoImRhdGEiLCBlMik7CiAgICAgICAgfSwgZW5kOiBmdW5jdGlvbigpIHsKICAgICAgICAgIGlmICh0aGlzLmlzRmluaXNoZWQpCiAgICAgICAgICAgIHJldHVybiBmYWxzZTsKICAgICAgICAgIHRoaXMuZmx1c2goKTsKICAgICAgICAgIHRyeSB7CiAgICAgICAgICAgIHRoaXMuZW1pdCgiZW5kIiksIHRoaXMuY2xlYW5VcCgpLCB0aGlzLmlzRmluaXNoZWQgPSB0cnVlOwogICAgICAgICAgfSBjYXRjaCAoZTIpIHsKICAgICAgICAgICAgdGhpcy5lbWl0KCJlcnJvciIsIGUyKTsKICAgICAgICAgIH0KICAgICAgICAgIHJldHVybiB0cnVlOwogICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbihlMikgewogICAgICAgICAgcmV0dXJuICF0aGlzLmlzRmluaXNoZWQgJiYgKHRoaXMuaXNQYXVzZWQgPyB0aGlzLmdlbmVyYXRlZEVycm9yID0gZTIgOiAodGhpcy5pc0ZpbmlzaGVkID0gdHJ1ZSwgdGhpcy5lbWl0KCJlcnJvciIsIGUyKSwgdGhpcy5wcmV2aW91cyAmJiB0aGlzLnByZXZpb3VzLmVycm9yKGUyKSwgdGhpcy5jbGVhblVwKCkpLCB0cnVlKTsKICAgICAgICB9LCBvbjogZnVuY3Rpb24oZTIsIHQyKSB7CiAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdGVuZXJzW2UyXS5wdXNoKHQyKSwgdGhpczsKICAgICAgICB9LCBjbGVhblVwOiBmdW5jdGlvbigpIHsKICAgICAgICAgIHRoaXMuc3RyZWFtSW5mbyA9IHRoaXMuZ2VuZXJhdGVkRXJyb3IgPSB0aGlzLmV4dHJhU3RyZWFtSW5mbyA9IG51bGwsIHRoaXMuX2xpc3RlbmVycyA9IFtdOwogICAgICAgIH0sIGVtaXQ6IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgaWYgKHRoaXMuX2xpc3RlbmVyc1tlMl0pCiAgICAgICAgICAgIGZvciAodmFyIHIyID0gMDsgcjIgPCB0aGlzLl9saXN0ZW5lcnNbZTJdLmxlbmd0aDsgcjIrKykKICAgICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnNbZTJdW3IyXS5jYWxsKHRoaXMsIHQyKTsKICAgICAgICB9LCBwaXBlOiBmdW5jdGlvbihlMikgewogICAgICAgICAgcmV0dXJuIGUyLnJlZ2lzdGVyUHJldmlvdXModGhpcyk7CiAgICAgICAgfSwgcmVnaXN0ZXJQcmV2aW91czogZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIGlmICh0aGlzLmlzTG9ja2VkKQogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIlRoZSBzdHJlYW0gJyIgKyB0aGlzICsgIicgaGFzIGFscmVhZHkgYmVlbiB1c2VkLiIpOwogICAgICAgICAgdGhpcy5zdHJlYW1JbmZvID0gZTIuc3RyZWFtSW5mbywgdGhpcy5tZXJnZVN0cmVhbUluZm8oKSwgdGhpcy5wcmV2aW91cyA9IGUyOwogICAgICAgICAgdmFyIHQyID0gdGhpczsKICAgICAgICAgIHJldHVybiBlMi5vbigiZGF0YSIsIGZ1bmN0aW9uKGUzKSB7CiAgICAgICAgICAgIHQyLnByb2Nlc3NDaHVuayhlMyk7CiAgICAgICAgICB9KSwgZTIub24oImVuZCIsIGZ1bmN0aW9uKCkgewogICAgICAgICAgICB0Mi5lbmQoKTsKICAgICAgICAgIH0pLCBlMi5vbigiZXJyb3IiLCBmdW5jdGlvbihlMykgewogICAgICAgICAgICB0Mi5lcnJvcihlMyk7CiAgICAgICAgICB9KSwgdGhpczsKICAgICAgICB9LCBwYXVzZTogZnVuY3Rpb24oKSB7CiAgICAgICAgICByZXR1cm4gIXRoaXMuaXNQYXVzZWQgJiYgIXRoaXMuaXNGaW5pc2hlZCAmJiAodGhpcy5pc1BhdXNlZCA9IHRydWUsIHRoaXMucHJldmlvdXMgJiYgdGhpcy5wcmV2aW91cy5wYXVzZSgpLCB0cnVlKTsKICAgICAgICB9LCByZXN1bWU6IGZ1bmN0aW9uKCkgewogICAgICAgICAgaWYgKCF0aGlzLmlzUGF1c2VkIHx8IHRoaXMuaXNGaW5pc2hlZCkKICAgICAgICAgICAgcmV0dXJuIGZhbHNlOwogICAgICAgICAgdmFyIGUyID0gdGhpcy5pc1BhdXNlZCA9IGZhbHNlOwogICAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVkRXJyb3IgJiYgKHRoaXMuZXJyb3IodGhpcy5nZW5lcmF0ZWRFcnJvciksIGUyID0gdHJ1ZSksIHRoaXMucHJldmlvdXMgJiYgdGhpcy5wcmV2aW91cy5yZXN1bWUoKSwgIWUyOwogICAgICAgIH0sIGZsdXNoOiBmdW5jdGlvbigpIHsKICAgICAgICB9LCBwcm9jZXNzQ2h1bms6IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICB0aGlzLnB1c2goZTIpOwogICAgICAgIH0sIHdpdGhTdHJlYW1JbmZvOiBmdW5jdGlvbihlMiwgdDIpIHsKICAgICAgICAgIHJldHVybiB0aGlzLmV4dHJhU3RyZWFtSW5mb1tlMl0gPSB0MiwgdGhpcy5tZXJnZVN0cmVhbUluZm8oKSwgdGhpczsKICAgICAgICB9LCBtZXJnZVN0cmVhbUluZm86IGZ1bmN0aW9uKCkgewogICAgICAgICAgZm9yICh2YXIgZTIgaW4gdGhpcy5leHRyYVN0cmVhbUluZm8pCiAgICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLmV4dHJhU3RyZWFtSW5mbywgZTIpICYmICh0aGlzLnN0cmVhbUluZm9bZTJdID0gdGhpcy5leHRyYVN0cmVhbUluZm9bZTJdKTsKICAgICAgICB9LCBsb2NrOiBmdW5jdGlvbigpIHsKICAgICAgICAgIGlmICh0aGlzLmlzTG9ja2VkKQogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIlRoZSBzdHJlYW0gJyIgKyB0aGlzICsgIicgaGFzIGFscmVhZHkgYmVlbiB1c2VkLiIpOwogICAgICAgICAgdGhpcy5pc0xvY2tlZCA9IHRydWUsIHRoaXMucHJldmlvdXMgJiYgdGhpcy5wcmV2aW91cy5sb2NrKCk7CiAgICAgICAgfSwgdG9TdHJpbmc6IGZ1bmN0aW9uKCkgewogICAgICAgICAgdmFyIGUyID0gIldvcmtlciAiICsgdGhpcy5uYW1lOwogICAgICAgICAgcmV0dXJuIHRoaXMucHJldmlvdXMgPyB0aGlzLnByZXZpb3VzICsgIiAtPiAiICsgZTIgOiBlMjsKICAgICAgICB9IH0sIHQuZXhwb3J0cyA9IG47CiAgICAgIH0sIHt9XSwgMjk6IFtmdW5jdGlvbihlLCB0LCByKSB7CiAgICAgICAgdmFyIGggPSBlKCIuLi91dGlscyIpLCBpID0gZSgiLi9Db252ZXJ0V29ya2VyIiksIHMgPSBlKCIuL0dlbmVyaWNXb3JrZXIiKSwgdSA9IGUoIi4uL2Jhc2U2NCIpLCBuID0gZSgiLi4vc3VwcG9ydCIpLCBhID0gZSgiLi4vZXh0ZXJuYWwiKSwgbyA9IG51bGw7CiAgICAgICAgaWYgKG4ubm9kZXN0cmVhbSkKICAgICAgICAgIHRyeSB7CiAgICAgICAgICAgIG8gPSBlKCIuLi9ub2RlanMvTm9kZWpzU3RyZWFtT3V0cHV0QWRhcHRlciIpOwogICAgICAgICAgfSBjYXRjaCAoZTIpIHsKICAgICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBsKGUyLCBvMikgewogICAgICAgICAgcmV0dXJuIG5ldyBhLlByb21pc2UoZnVuY3Rpb24odDIsIHIyKSB7CiAgICAgICAgICAgIHZhciBuMiA9IFtdLCBpMiA9IGUyLl9pbnRlcm5hbFR5cGUsIHMyID0gZTIuX291dHB1dFR5cGUsIGEyID0gZTIuX21pbWVUeXBlOwogICAgICAgICAgICBlMi5vbigiZGF0YSIsIGZ1bmN0aW9uKGUzLCB0MykgewogICAgICAgICAgICAgIG4yLnB1c2goZTMpLCBvMiAmJiBvMih0Myk7CiAgICAgICAgICAgIH0pLm9uKCJlcnJvciIsIGZ1bmN0aW9uKGUzKSB7CiAgICAgICAgICAgICAgbjIgPSBbXSwgcjIoZTMpOwogICAgICAgICAgICB9KS5vbigiZW5kIiwgZnVuY3Rpb24oKSB7CiAgICAgICAgICAgICAgdHJ5IHsKICAgICAgICAgICAgICAgIHZhciBlMyA9IGZ1bmN0aW9uKGU0LCB0MywgcjMpIHsKICAgICAgICAgICAgICAgICAgc3dpdGNoIChlNCkgewogICAgICAgICAgICAgICAgICAgIGNhc2UgImJsb2IiOgogICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGgubmV3QmxvYihoLnRyYW5zZm9ybVRvKCJhcnJheWJ1ZmZlciIsIHQzKSwgcjMpOwogICAgICAgICAgICAgICAgICAgIGNhc2UgImJhc2U2NCI6CiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdS5lbmNvZGUodDMpOwogICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6CiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaC50cmFuc2Zvcm1UbyhlNCwgdDMpOwogICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9KHMyLCBmdW5jdGlvbihlNCwgdDMpIHsKICAgICAgICAgICAgICAgICAgdmFyIHIzLCBuMyA9IDAsIGkzID0gbnVsbCwgczMgPSAwOwogICAgICAgICAgICAgICAgICBmb3IgKHIzID0gMDsgcjMgPCB0My5sZW5ndGg7IHIzKyspCiAgICAgICAgICAgICAgICAgICAgczMgKz0gdDNbcjNdLmxlbmd0aDsKICAgICAgICAgICAgICAgICAgc3dpdGNoIChlNCkgewogICAgICAgICAgICAgICAgICAgIGNhc2UgInN0cmluZyI6CiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdDMuam9pbigiIik7CiAgICAgICAgICAgICAgICAgICAgY2FzZSAiYXJyYXkiOgogICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5jb25jYXQuYXBwbHkoW10sIHQzKTsKICAgICAgICAgICAgICAgICAgICBjYXNlICJ1aW50OGFycmF5IjoKICAgICAgICAgICAgICAgICAgICAgIGZvciAoaTMgPSBuZXcgVWludDhBcnJheShzMyksIHIzID0gMDsgcjMgPCB0My5sZW5ndGg7IHIzKyspCiAgICAgICAgICAgICAgICAgICAgICAgIGkzLnNldCh0M1tyM10sIG4zKSwgbjMgKz0gdDNbcjNdLmxlbmd0aDsKICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpMzsKICAgICAgICAgICAgICAgICAgICBjYXNlICJub2RlYnVmZmVyIjoKICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBCdWZmZXIuY29uY2F0KHQzKTsKICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OgogICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJjb25jYXQgOiB1bnN1cHBvcnRlZCB0eXBlICciICsgZTQgKyAiJyIpOwogICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9KGkyLCBuMiksIGEyKTsKICAgICAgICAgICAgICAgIHQyKGUzKTsKICAgICAgICAgICAgICB9IGNhdGNoIChlNCkgewogICAgICAgICAgICAgICAgcjIoZTQpOwogICAgICAgICAgICAgIH0KICAgICAgICAgICAgICBuMiA9IFtdOwogICAgICAgICAgICB9KS5yZXN1bWUoKTsKICAgICAgICAgIH0pOwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBmKGUyLCB0MiwgcjIpIHsKICAgICAgICAgIHZhciBuMiA9IHQyOwogICAgICAgICAgc3dpdGNoICh0MikgewogICAgICAgICAgICBjYXNlICJibG9iIjoKICAgICAgICAgICAgY2FzZSAiYXJyYXlidWZmZXIiOgogICAgICAgICAgICAgIG4yID0gInVpbnQ4YXJyYXkiOwogICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICBjYXNlICJiYXNlNjQiOgogICAgICAgICAgICAgIG4yID0gInN0cmluZyI7CiAgICAgICAgICB9CiAgICAgICAgICB0cnkgewogICAgICAgICAgICB0aGlzLl9pbnRlcm5hbFR5cGUgPSBuMiwgdGhpcy5fb3V0cHV0VHlwZSA9IHQyLCB0aGlzLl9taW1lVHlwZSA9IHIyLCBoLmNoZWNrU3VwcG9ydChuMiksIHRoaXMuX3dvcmtlciA9IGUyLnBpcGUobmV3IGkobjIpKSwgZTIubG9jaygpOwogICAgICAgICAgfSBjYXRjaCAoZTMpIHsKICAgICAgICAgICAgdGhpcy5fd29ya2VyID0gbmV3IHMoImVycm9yIiksIHRoaXMuX3dvcmtlci5lcnJvcihlMyk7CiAgICAgICAgICB9CiAgICAgICAgfQogICAgICAgIGYucHJvdG90eXBlID0geyBhY2N1bXVsYXRlOiBmdW5jdGlvbihlMikgewogICAgICAgICAgcmV0dXJuIGwodGhpcywgZTIpOwogICAgICAgIH0sIG9uOiBmdW5jdGlvbihlMiwgdDIpIHsKICAgICAgICAgIHZhciByMiA9IHRoaXM7CiAgICAgICAgICByZXR1cm4gImRhdGEiID09PSBlMiA/IHRoaXMuX3dvcmtlci5vbihlMiwgZnVuY3Rpb24oZTMpIHsKICAgICAgICAgICAgdDIuY2FsbChyMiwgZTMuZGF0YSwgZTMubWV0YSk7CiAgICAgICAgICB9KSA6IHRoaXMuX3dvcmtlci5vbihlMiwgZnVuY3Rpb24oKSB7CiAgICAgICAgICAgIGguZGVsYXkodDIsIGFyZ3VtZW50cywgcjIpOwogICAgICAgICAgfSksIHRoaXM7CiAgICAgICAgfSwgcmVzdW1lOiBmdW5jdGlvbigpIHsKICAgICAgICAgIHJldHVybiBoLmRlbGF5KHRoaXMuX3dvcmtlci5yZXN1bWUsIFtdLCB0aGlzLl93b3JrZXIpLCB0aGlzOwogICAgICAgIH0sIHBhdXNlOiBmdW5jdGlvbigpIHsKICAgICAgICAgIHJldHVybiB0aGlzLl93b3JrZXIucGF1c2UoKSwgdGhpczsKICAgICAgICB9LCB0b05vZGVqc1N0cmVhbTogZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIGlmIChoLmNoZWNrU3VwcG9ydCgibm9kZXN0cmVhbSIpLCAibm9kZWJ1ZmZlciIgIT09IHRoaXMuX291dHB1dFR5cGUpCiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLl9vdXRwdXRUeXBlICsgIiBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoaXMgbWV0aG9kIik7CiAgICAgICAgICByZXR1cm4gbmV3IG8odGhpcywgeyBvYmplY3RNb2RlOiAibm9kZWJ1ZmZlciIgIT09IHRoaXMuX291dHB1dFR5cGUgfSwgZTIpOwogICAgICAgIH0gfSwgdC5leHBvcnRzID0gZjsKICAgICAgfSwgeyAiLi4vYmFzZTY0IjogMSwgIi4uL2V4dGVybmFsIjogNiwgIi4uL25vZGVqcy9Ob2RlanNTdHJlYW1PdXRwdXRBZGFwdGVyIjogMTMsICIuLi9zdXBwb3J0IjogMzAsICIuLi91dGlscyI6IDMyLCAiLi9Db252ZXJ0V29ya2VyIjogMjQsICIuL0dlbmVyaWNXb3JrZXIiOiAyOCB9XSwgMzA6IFtmdW5jdGlvbihlLCB0LCByKSB7CiAgICAgICAgaWYgKHIuYmFzZTY0ID0gdHJ1ZSwgci5hcnJheSA9IHRydWUsIHIuc3RyaW5nID0gdHJ1ZSwgci5hcnJheWJ1ZmZlciA9ICJ1bmRlZmluZWQiICE9IHR5cGVvZiBBcnJheUJ1ZmZlciAmJiAidW5kZWZpbmVkIiAhPSB0eXBlb2YgVWludDhBcnJheSwgci5ub2RlYnVmZmVyID0gInVuZGVmaW5lZCIgIT0gdHlwZW9mIEJ1ZmZlciwgci51aW50OGFycmF5ID0gInVuZGVmaW5lZCIgIT0gdHlwZW9mIFVpbnQ4QXJyYXksICJ1bmRlZmluZWQiID09IHR5cGVvZiBBcnJheUJ1ZmZlcikKICAgICAgICAgIHIuYmxvYiA9IGZhbHNlOwogICAgICAgIGVsc2UgewogICAgICAgICAgdmFyIG4gPSBuZXcgQXJyYXlCdWZmZXIoMCk7CiAgICAgICAgICB0cnkgewogICAgICAgICAgICByLmJsb2IgPSAwID09PSBuZXcgQmxvYihbbl0sIHsgdHlwZTogImFwcGxpY2F0aW9uL3ppcCIgfSkuc2l6ZTsKICAgICAgICAgIH0gY2F0Y2ggKGUyKSB7CiAgICAgICAgICAgIHRyeSB7CiAgICAgICAgICAgICAgdmFyIGkgPSBuZXcgKHNlbGYuQmxvYkJ1aWxkZXIgfHwgc2VsZi5XZWJLaXRCbG9iQnVpbGRlciB8fCBzZWxmLk1vekJsb2JCdWlsZGVyIHx8IHNlbGYuTVNCbG9iQnVpbGRlcikoKTsKICAgICAgICAgICAgICBpLmFwcGVuZChuKSwgci5ibG9iID0gMCA9PT0gaS5nZXRCbG9iKCJhcHBsaWNhdGlvbi96aXAiKS5zaXplOwogICAgICAgICAgICB9IGNhdGNoIChlMykgewogICAgICAgICAgICAgIHIuYmxvYiA9IGZhbHNlOwogICAgICAgICAgICB9CiAgICAgICAgICB9CiAgICAgICAgfQogICAgICAgIHRyeSB7CiAgICAgICAgICByLm5vZGVzdHJlYW0gPSAhIWUoInJlYWRhYmxlLXN0cmVhbSIpLlJlYWRhYmxlOwogICAgICAgIH0gY2F0Y2ggKGUyKSB7CiAgICAgICAgICByLm5vZGVzdHJlYW0gPSBmYWxzZTsKICAgICAgICB9CiAgICAgIH0sIHsgInJlYWRhYmxlLXN0cmVhbSI6IDE2IH1dLCAzMTogW2Z1bmN0aW9uKGUsIHQsIHMpIHsKICAgICAgICBmb3IgKHZhciBvID0gZSgiLi91dGlscyIpLCBoID0gZSgiLi9zdXBwb3J0IiksIHIgPSBlKCIuL25vZGVqc1V0aWxzIiksIG4gPSBlKCIuL3N0cmVhbS9HZW5lcmljV29ya2VyIiksIHUgPSBuZXcgQXJyYXkoMjU2KSwgaSA9IDA7IGkgPCAyNTY7IGkrKykKICAgICAgICAgIHVbaV0gPSAyNTIgPD0gaSA/IDYgOiAyNDggPD0gaSA/IDUgOiAyNDAgPD0gaSA/IDQgOiAyMjQgPD0gaSA/IDMgOiAxOTIgPD0gaSA/IDIgOiAxOwogICAgICAgIHVbMjU0XSA9IHVbMjU0XSA9IDE7CiAgICAgICAgZnVuY3Rpb24gYSgpIHsKICAgICAgICAgIG4uY2FsbCh0aGlzLCAidXRmLTggZGVjb2RlIiksIHRoaXMubGVmdE92ZXIgPSBudWxsOwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBsKCkgewogICAgICAgICAgbi5jYWxsKHRoaXMsICJ1dGYtOCBlbmNvZGUiKTsKICAgICAgICB9CiAgICAgICAgcy51dGY4ZW5jb2RlID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHJldHVybiBoLm5vZGVidWZmZXIgPyByLm5ld0J1ZmZlckZyb20oZTIsICJ1dGYtOCIpIDogZnVuY3Rpb24oZTMpIHsKICAgICAgICAgICAgdmFyIHQyLCByMiwgbjIsIGkyLCBzMiwgYTIgPSBlMy5sZW5ndGgsIG8yID0gMDsKICAgICAgICAgICAgZm9yIChpMiA9IDA7IGkyIDwgYTI7IGkyKyspCiAgICAgICAgICAgICAgNTUyOTYgPT0gKDY0NTEyICYgKHIyID0gZTMuY2hhckNvZGVBdChpMikpKSAmJiBpMiArIDEgPCBhMiAmJiA1NjMyMCA9PSAoNjQ1MTIgJiAobjIgPSBlMy5jaGFyQ29kZUF0KGkyICsgMSkpKSAmJiAocjIgPSA2NTUzNiArIChyMiAtIDU1Mjk2IDw8IDEwKSArIChuMiAtIDU2MzIwKSwgaTIrKyksIG8yICs9IHIyIDwgMTI4ID8gMSA6IHIyIDwgMjA0OCA/IDIgOiByMiA8IDY1NTM2ID8gMyA6IDQ7CiAgICAgICAgICAgIGZvciAodDIgPSBoLnVpbnQ4YXJyYXkgPyBuZXcgVWludDhBcnJheShvMikgOiBuZXcgQXJyYXkobzIpLCBpMiA9IHMyID0gMDsgczIgPCBvMjsgaTIrKykKICAgICAgICAgICAgICA1NTI5NiA9PSAoNjQ1MTIgJiAocjIgPSBlMy5jaGFyQ29kZUF0KGkyKSkpICYmIGkyICsgMSA8IGEyICYmIDU2MzIwID09ICg2NDUxMiAmIChuMiA9IGUzLmNoYXJDb2RlQXQoaTIgKyAxKSkpICYmIChyMiA9IDY1NTM2ICsgKHIyIC0gNTUyOTYgPDwgMTApICsgKG4yIC0gNTYzMjApLCBpMisrKSwgcjIgPCAxMjggPyB0MltzMisrXSA9IHIyIDogKHIyIDwgMjA0OCA/IHQyW3MyKytdID0gMTkyIHwgcjIgPj4+IDYgOiAocjIgPCA2NTUzNiA/IHQyW3MyKytdID0gMjI0IHwgcjIgPj4+IDEyIDogKHQyW3MyKytdID0gMjQwIHwgcjIgPj4+IDE4LCB0MltzMisrXSA9IDEyOCB8IHIyID4+PiAxMiAmIDYzKSwgdDJbczIrK10gPSAxMjggfCByMiA+Pj4gNiAmIDYzKSwgdDJbczIrK10gPSAxMjggfCA2MyAmIHIyKTsKICAgICAgICAgICAgcmV0dXJuIHQyOwogICAgICAgICAgfShlMik7CiAgICAgICAgfSwgcy51dGY4ZGVjb2RlID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHJldHVybiBoLm5vZGVidWZmZXIgPyBvLnRyYW5zZm9ybVRvKCJub2RlYnVmZmVyIiwgZTIpLnRvU3RyaW5nKCJ1dGYtOCIpIDogZnVuY3Rpb24oZTMpIHsKICAgICAgICAgICAgdmFyIHQyLCByMiwgbjIsIGkyLCBzMiA9IGUzLmxlbmd0aCwgYTIgPSBuZXcgQXJyYXkoMiAqIHMyKTsKICAgICAgICAgICAgZm9yICh0MiA9IHIyID0gMDsgdDIgPCBzMjsgKQogICAgICAgICAgICAgIGlmICgobjIgPSBlM1t0MisrXSkgPCAxMjgpCiAgICAgICAgICAgICAgICBhMltyMisrXSA9IG4yOwogICAgICAgICAgICAgIGVsc2UgaWYgKDQgPCAoaTIgPSB1W24yXSkpCiAgICAgICAgICAgICAgICBhMltyMisrXSA9IDY1NTMzLCB0MiArPSBpMiAtIDE7CiAgICAgICAgICAgICAgZWxzZSB7CiAgICAgICAgICAgICAgICBmb3IgKG4yICY9IDIgPT09IGkyID8gMzEgOiAzID09PSBpMiA/IDE1IDogNzsgMSA8IGkyICYmIHQyIDwgczI7ICkKICAgICAgICAgICAgICAgICAgbjIgPSBuMiA8PCA2IHwgNjMgJiBlM1t0MisrXSwgaTItLTsKICAgICAgICAgICAgICAgIDEgPCBpMiA/IGEyW3IyKytdID0gNjU1MzMgOiBuMiA8IDY1NTM2ID8gYTJbcjIrK10gPSBuMiA6IChuMiAtPSA2NTUzNiwgYTJbcjIrK10gPSA1NTI5NiB8IG4yID4+IDEwICYgMTAyMywgYTJbcjIrK10gPSA1NjMyMCB8IDEwMjMgJiBuMik7CiAgICAgICAgICAgICAgfQogICAgICAgICAgICByZXR1cm4gYTIubGVuZ3RoICE9PSByMiAmJiAoYTIuc3ViYXJyYXkgPyBhMiA9IGEyLnN1YmFycmF5KDAsIHIyKSA6IGEyLmxlbmd0aCA9IHIyKSwgby5hcHBseUZyb21DaGFyQ29kZShhMik7CiAgICAgICAgICB9KGUyID0gby50cmFuc2Zvcm1UbyhoLnVpbnQ4YXJyYXkgPyAidWludDhhcnJheSIgOiAiYXJyYXkiLCBlMikpOwogICAgICAgIH0sIG8uaW5oZXJpdHMoYSwgbiksIGEucHJvdG90eXBlLnByb2Nlc3NDaHVuayA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICB2YXIgdDIgPSBvLnRyYW5zZm9ybVRvKGgudWludDhhcnJheSA/ICJ1aW50OGFycmF5IiA6ICJhcnJheSIsIGUyLmRhdGEpOwogICAgICAgICAgaWYgKHRoaXMubGVmdE92ZXIgJiYgdGhpcy5sZWZ0T3Zlci5sZW5ndGgpIHsKICAgICAgICAgICAgaWYgKGgudWludDhhcnJheSkgewogICAgICAgICAgICAgIHZhciByMiA9IHQyOwogICAgICAgICAgICAgICh0MiA9IG5ldyBVaW50OEFycmF5KHIyLmxlbmd0aCArIHRoaXMubGVmdE92ZXIubGVuZ3RoKSkuc2V0KHRoaXMubGVmdE92ZXIsIDApLCB0Mi5zZXQocjIsIHRoaXMubGVmdE92ZXIubGVuZ3RoKTsKICAgICAgICAgICAgfSBlbHNlCiAgICAgICAgICAgICAgdDIgPSB0aGlzLmxlZnRPdmVyLmNvbmNhdCh0Mik7CiAgICAgICAgICAgIHRoaXMubGVmdE92ZXIgPSBudWxsOwogICAgICAgICAgfQogICAgICAgICAgdmFyIG4yID0gZnVuY3Rpb24oZTMsIHQzKSB7CiAgICAgICAgICAgIHZhciByMzsKICAgICAgICAgICAgZm9yICgodDMgPSB0MyB8fCBlMy5sZW5ndGgpID4gZTMubGVuZ3RoICYmICh0MyA9IGUzLmxlbmd0aCksIHIzID0gdDMgLSAxOyAwIDw9IHIzICYmIDEyOCA9PSAoMTkyICYgZTNbcjNdKTsgKQogICAgICAgICAgICAgIHIzLS07CiAgICAgICAgICAgIHJldHVybiByMyA8IDAgPyB0MyA6IDAgPT09IHIzID8gdDMgOiByMyArIHVbZTNbcjNdXSA+IHQzID8gcjMgOiB0MzsKICAgICAgICAgIH0odDIpLCBpMiA9IHQyOwogICAgICAgICAgbjIgIT09IHQyLmxlbmd0aCAmJiAoaC51aW50OGFycmF5ID8gKGkyID0gdDIuc3ViYXJyYXkoMCwgbjIpLCB0aGlzLmxlZnRPdmVyID0gdDIuc3ViYXJyYXkobjIsIHQyLmxlbmd0aCkpIDogKGkyID0gdDIuc2xpY2UoMCwgbjIpLCB0aGlzLmxlZnRPdmVyID0gdDIuc2xpY2UobjIsIHQyLmxlbmd0aCkpKSwgdGhpcy5wdXNoKHsgZGF0YTogcy51dGY4ZGVjb2RlKGkyKSwgbWV0YTogZTIubWV0YSB9KTsKICAgICAgICB9LCBhLnByb3RvdHlwZS5mbHVzaCA9IGZ1bmN0aW9uKCkgewogICAgICAgICAgdGhpcy5sZWZ0T3ZlciAmJiB0aGlzLmxlZnRPdmVyLmxlbmd0aCAmJiAodGhpcy5wdXNoKHsgZGF0YTogcy51dGY4ZGVjb2RlKHRoaXMubGVmdE92ZXIpLCBtZXRhOiB7fSB9KSwgdGhpcy5sZWZ0T3ZlciA9IG51bGwpOwogICAgICAgIH0sIHMuVXRmOERlY29kZVdvcmtlciA9IGEsIG8uaW5oZXJpdHMobCwgbiksIGwucHJvdG90eXBlLnByb2Nlc3NDaHVuayA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICB0aGlzLnB1c2goeyBkYXRhOiBzLnV0ZjhlbmNvZGUoZTIuZGF0YSksIG1ldGE6IGUyLm1ldGEgfSk7CiAgICAgICAgfSwgcy5VdGY4RW5jb2RlV29ya2VyID0gbDsKICAgICAgfSwgeyAiLi9ub2RlanNVdGlscyI6IDE0LCAiLi9zdHJlYW0vR2VuZXJpY1dvcmtlciI6IDI4LCAiLi9zdXBwb3J0IjogMzAsICIuL3V0aWxzIjogMzIgfV0sIDMyOiBbZnVuY3Rpb24oZSwgdCwgYSkgewogICAgICAgIHZhciBvID0gZSgiLi9zdXBwb3J0IiksIGggPSBlKCIuL2Jhc2U2NCIpLCByID0gZSgiLi9ub2RlanNVdGlscyIpLCB1ID0gZSgiLi9leHRlcm5hbCIpOwogICAgICAgIGZ1bmN0aW9uIG4oZTIpIHsKICAgICAgICAgIHJldHVybiBlMjsKICAgICAgICB9CiAgICAgICAgZnVuY3Rpb24gbChlMiwgdDIpIHsKICAgICAgICAgIGZvciAodmFyIHIyID0gMDsgcjIgPCBlMi5sZW5ndGg7ICsrcjIpCiAgICAgICAgICAgIHQyW3IyXSA9IDI1NSAmIGUyLmNoYXJDb2RlQXQocjIpOwogICAgICAgICAgcmV0dXJuIHQyOwogICAgICAgIH0KICAgICAgICBlKCJzZXRpbW1lZGlhdGUiKSwgYS5uZXdCbG9iID0gZnVuY3Rpb24odDIsIHIyKSB7CiAgICAgICAgICBhLmNoZWNrU3VwcG9ydCgiYmxvYiIpOwogICAgICAgICAgdHJ5IHsKICAgICAgICAgICAgcmV0dXJuIG5ldyBCbG9iKFt0Ml0sIHsgdHlwZTogcjIgfSk7CiAgICAgICAgICB9IGNhdGNoIChlMikgewogICAgICAgICAgICB0cnkgewogICAgICAgICAgICAgIHZhciBuMiA9IG5ldyAoc2VsZi5CbG9iQnVpbGRlciB8fCBzZWxmLldlYktpdEJsb2JCdWlsZGVyIHx8IHNlbGYuTW96QmxvYkJ1aWxkZXIgfHwgc2VsZi5NU0Jsb2JCdWlsZGVyKSgpOwogICAgICAgICAgICAgIHJldHVybiBuMi5hcHBlbmQodDIpLCBuMi5nZXRCbG9iKHIyKTsKICAgICAgICAgICAgfSBjYXRjaCAoZTMpIHsKICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIkJ1ZyA6IGNhbid0IGNvbnN0cnVjdCB0aGUgQmxvYi4iKTsKICAgICAgICAgICAgfQogICAgICAgICAgfQogICAgICAgIH07CiAgICAgICAgdmFyIGkgPSB7IHN0cmluZ2lmeUJ5Q2h1bms6IGZ1bmN0aW9uKGUyLCB0MiwgcjIpIHsKICAgICAgICAgIHZhciBuMiA9IFtdLCBpMiA9IDAsIHMyID0gZTIubGVuZ3RoOwogICAgICAgICAgaWYgKHMyIDw9IHIyKQogICAgICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBlMik7CiAgICAgICAgICBmb3IgKDsgaTIgPCBzMjsgKQogICAgICAgICAgICAiYXJyYXkiID09PSB0MiB8fCAibm9kZWJ1ZmZlciIgPT09IHQyID8gbjIucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIGUyLnNsaWNlKGkyLCBNYXRoLm1pbihpMiArIHIyLCBzMikpKSkgOiBuMi5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgZTIuc3ViYXJyYXkoaTIsIE1hdGgubWluKGkyICsgcjIsIHMyKSkpKSwgaTIgKz0gcjI7CiAgICAgICAgICByZXR1cm4gbjIuam9pbigiIik7CiAgICAgICAgfSwgc3RyaW5naWZ5QnlDaGFyOiBmdW5jdGlvbihlMikgewogICAgICAgICAgZm9yICh2YXIgdDIgPSAiIiwgcjIgPSAwOyByMiA8IGUyLmxlbmd0aDsgcjIrKykKICAgICAgICAgICAgdDIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShlMltyMl0pOwogICAgICAgICAgcmV0dXJuIHQyOwogICAgICAgIH0sIGFwcGx5Q2FuQmVVc2VkOiB7IHVpbnQ4YXJyYXk6IGZ1bmN0aW9uKCkgewogICAgICAgICAgdHJ5IHsKICAgICAgICAgICAgcmV0dXJuIG8udWludDhhcnJheSAmJiAxID09PSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIG5ldyBVaW50OEFycmF5KDEpKS5sZW5ndGg7CiAgICAgICAgICB9IGNhdGNoIChlMikgewogICAgICAgICAgICByZXR1cm4gZmFsc2U7CiAgICAgICAgICB9CiAgICAgICAgfSgpLCBub2RlYnVmZmVyOiBmdW5jdGlvbigpIHsKICAgICAgICAgIHRyeSB7CiAgICAgICAgICAgIHJldHVybiBvLm5vZGVidWZmZXIgJiYgMSA9PT0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCByLmFsbG9jQnVmZmVyKDEpKS5sZW5ndGg7CiAgICAgICAgICB9IGNhdGNoIChlMikgewogICAgICAgICAgICByZXR1cm4gZmFsc2U7CiAgICAgICAgICB9CiAgICAgICAgfSgpIH0gfTsKICAgICAgICBmdW5jdGlvbiBzKGUyKSB7CiAgICAgICAgICB2YXIgdDIgPSA2NTUzNiwgcjIgPSBhLmdldFR5cGVPZihlMiksIG4yID0gdHJ1ZTsKICAgICAgICAgIGlmICgidWludDhhcnJheSIgPT09IHIyID8gbjIgPSBpLmFwcGx5Q2FuQmVVc2VkLnVpbnQ4YXJyYXkgOiAibm9kZWJ1ZmZlciIgPT09IHIyICYmIChuMiA9IGkuYXBwbHlDYW5CZVVzZWQubm9kZWJ1ZmZlciksIG4yKQogICAgICAgICAgICBmb3IgKDsgMSA8IHQyOyApCiAgICAgICAgICAgICAgdHJ5IHsKICAgICAgICAgICAgICAgIHJldHVybiBpLnN0cmluZ2lmeUJ5Q2h1bmsoZTIsIHIyLCB0Mik7CiAgICAgICAgICAgICAgfSBjYXRjaCAoZTMpIHsKICAgICAgICAgICAgICAgIHQyID0gTWF0aC5mbG9vcih0MiAvIDIpOwogICAgICAgICAgICAgIH0KICAgICAgICAgIHJldHVybiBpLnN0cmluZ2lmeUJ5Q2hhcihlMik7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIGYoZTIsIHQyKSB7CiAgICAgICAgICBmb3IgKHZhciByMiA9IDA7IHIyIDwgZTIubGVuZ3RoOyByMisrKQogICAgICAgICAgICB0MltyMl0gPSBlMltyMl07CiAgICAgICAgICByZXR1cm4gdDI7CiAgICAgICAgfQogICAgICAgIGEuYXBwbHlGcm9tQ2hhckNvZGUgPSBzOwogICAgICAgIHZhciBjID0ge307CiAgICAgICAgYy5zdHJpbmcgPSB7IHN0cmluZzogbiwgYXJyYXk6IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICByZXR1cm4gbChlMiwgbmV3IEFycmF5KGUyLmxlbmd0aCkpOwogICAgICAgIH0sIGFycmF5YnVmZmVyOiBmdW5jdGlvbihlMikgewogICAgICAgICAgcmV0dXJuIGMuc3RyaW5nLnVpbnQ4YXJyYXkoZTIpLmJ1ZmZlcjsKICAgICAgICB9LCB1aW50OGFycmF5OiBmdW5jdGlvbihlMikgewogICAgICAgICAgcmV0dXJuIGwoZTIsIG5ldyBVaW50OEFycmF5KGUyLmxlbmd0aCkpOwogICAgICAgIH0sIG5vZGVidWZmZXI6IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICByZXR1cm4gbChlMiwgci5hbGxvY0J1ZmZlcihlMi5sZW5ndGgpKTsKICAgICAgICB9IH0sIGMuYXJyYXkgPSB7IHN0cmluZzogcywgYXJyYXk6IG4sIGFycmF5YnVmZmVyOiBmdW5jdGlvbihlMikgewogICAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGUyKS5idWZmZXI7CiAgICAgICAgfSwgdWludDhhcnJheTogZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShlMik7CiAgICAgICAgfSwgbm9kZWJ1ZmZlcjogZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHJldHVybiByLm5ld0J1ZmZlckZyb20oZTIpOwogICAgICAgIH0gfSwgYy5hcnJheWJ1ZmZlciA9IHsgc3RyaW5nOiBmdW5jdGlvbihlMikgewogICAgICAgICAgcmV0dXJuIHMobmV3IFVpbnQ4QXJyYXkoZTIpKTsKICAgICAgICB9LCBhcnJheTogZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHJldHVybiBmKG5ldyBVaW50OEFycmF5KGUyKSwgbmV3IEFycmF5KGUyLmJ5dGVMZW5ndGgpKTsKICAgICAgICB9LCBhcnJheWJ1ZmZlcjogbiwgdWludDhhcnJheTogZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShlMik7CiAgICAgICAgfSwgbm9kZWJ1ZmZlcjogZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHJldHVybiByLm5ld0J1ZmZlckZyb20obmV3IFVpbnQ4QXJyYXkoZTIpKTsKICAgICAgICB9IH0sIGMudWludDhhcnJheSA9IHsgc3RyaW5nOiBzLCBhcnJheTogZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHJldHVybiBmKGUyLCBuZXcgQXJyYXkoZTIubGVuZ3RoKSk7CiAgICAgICAgfSwgYXJyYXlidWZmZXI6IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICByZXR1cm4gZTIuYnVmZmVyOwogICAgICAgIH0sIHVpbnQ4YXJyYXk6IG4sIG5vZGVidWZmZXI6IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICByZXR1cm4gci5uZXdCdWZmZXJGcm9tKGUyKTsKICAgICAgICB9IH0sIGMubm9kZWJ1ZmZlciA9IHsgc3RyaW5nOiBzLCBhcnJheTogZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHJldHVybiBmKGUyLCBuZXcgQXJyYXkoZTIubGVuZ3RoKSk7CiAgICAgICAgfSwgYXJyYXlidWZmZXI6IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICByZXR1cm4gYy5ub2RlYnVmZmVyLnVpbnQ4YXJyYXkoZTIpLmJ1ZmZlcjsKICAgICAgICB9LCB1aW50OGFycmF5OiBmdW5jdGlvbihlMikgewogICAgICAgICAgcmV0dXJuIGYoZTIsIG5ldyBVaW50OEFycmF5KGUyLmxlbmd0aCkpOwogICAgICAgIH0sIG5vZGVidWZmZXI6IG4gfSwgYS50cmFuc2Zvcm1UbyA9IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgaWYgKHQyID0gdDIgfHwgIiIsICFlMikKICAgICAgICAgICAgcmV0dXJuIHQyOwogICAgICAgICAgYS5jaGVja1N1cHBvcnQoZTIpOwogICAgICAgICAgdmFyIHIyID0gYS5nZXRUeXBlT2YodDIpOwogICAgICAgICAgcmV0dXJuIGNbcjJdW2UyXSh0Mik7CiAgICAgICAgfSwgYS5yZXNvbHZlID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIGZvciAodmFyIHQyID0gZTIuc3BsaXQoIi8iKSwgcjIgPSBbXSwgbjIgPSAwOyBuMiA8IHQyLmxlbmd0aDsgbjIrKykgewogICAgICAgICAgICB2YXIgaTIgPSB0MltuMl07CiAgICAgICAgICAgICIuIiA9PT0gaTIgfHwgIiIgPT09IGkyICYmIDAgIT09IG4yICYmIG4yICE9PSB0Mi5sZW5ndGggLSAxIHx8ICgiLi4iID09PSBpMiA/IHIyLnBvcCgpIDogcjIucHVzaChpMikpOwogICAgICAgICAgfQogICAgICAgICAgcmV0dXJuIHIyLmpvaW4oIi8iKTsKICAgICAgICB9LCBhLmdldFR5cGVPZiA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICByZXR1cm4gInN0cmluZyIgPT0gdHlwZW9mIGUyID8gInN0cmluZyIgOiAiW29iamVjdCBBcnJheV0iID09PSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZTIpID8gImFycmF5IiA6IG8ubm9kZWJ1ZmZlciAmJiByLmlzQnVmZmVyKGUyKSA/ICJub2RlYnVmZmVyIiA6IG8udWludDhhcnJheSAmJiBlMiBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkgPyAidWludDhhcnJheSIgOiBvLmFycmF5YnVmZmVyICYmIGUyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgPyAiYXJyYXlidWZmZXIiIDogdm9pZCAwOwogICAgICAgIH0sIGEuY2hlY2tTdXBwb3J0ID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIGlmICghb1tlMi50b0xvd2VyQ2FzZSgpXSkKICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGUyICsgIiBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoaXMgcGxhdGZvcm0iKTsKICAgICAgICB9LCBhLk1BWF9WQUxVRV8xNkJJVFMgPSA2NTUzNSwgYS5NQVhfVkFMVUVfMzJCSVRTID0gLTEsIGEucHJldHR5ID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHZhciB0MiwgcjIsIG4yID0gIiI7CiAgICAgICAgICBmb3IgKHIyID0gMDsgcjIgPCAoZTIgfHwgIiIpLmxlbmd0aDsgcjIrKykKICAgICAgICAgICAgbjIgKz0gIlxceCIgKyAoKHQyID0gZTIuY2hhckNvZGVBdChyMikpIDwgMTYgPyAiMCIgOiAiIikgKyB0Mi50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTsKICAgICAgICAgIHJldHVybiBuMjsKICAgICAgICB9LCBhLmRlbGF5ID0gZnVuY3Rpb24oZTIsIHQyLCByMikgewogICAgICAgICAgc2V0SW1tZWRpYXRlKGZ1bmN0aW9uKCkgewogICAgICAgICAgICBlMi5hcHBseShyMiB8fCBudWxsLCB0MiB8fCBbXSk7CiAgICAgICAgICB9KTsKICAgICAgICB9LCBhLmluaGVyaXRzID0gZnVuY3Rpb24oZTIsIHQyKSB7CiAgICAgICAgICBmdW5jdGlvbiByMigpIHsKICAgICAgICAgIH0KICAgICAgICAgIHIyLnByb3RvdHlwZSA9IHQyLnByb3RvdHlwZSwgZTIucHJvdG90eXBlID0gbmV3IHIyKCk7CiAgICAgICAgfSwgYS5leHRlbmQgPSBmdW5jdGlvbigpIHsKICAgICAgICAgIHZhciBlMiwgdDIsIHIyID0ge307CiAgICAgICAgICBmb3IgKGUyID0gMDsgZTIgPCBhcmd1bWVudHMubGVuZ3RoOyBlMisrKQogICAgICAgICAgICBmb3IgKHQyIGluIGFyZ3VtZW50c1tlMl0pCiAgICAgICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFyZ3VtZW50c1tlMl0sIHQyKSAmJiB2b2lkIDAgPT09IHIyW3QyXSAmJiAocjJbdDJdID0gYXJndW1lbnRzW2UyXVt0Ml0pOwogICAgICAgICAgcmV0dXJuIHIyOwogICAgICAgIH0sIGEucHJlcGFyZUNvbnRlbnQgPSBmdW5jdGlvbihyMiwgZTIsIG4yLCBpMiwgczIpIHsKICAgICAgICAgIHJldHVybiB1LlByb21pc2UucmVzb2x2ZShlMikudGhlbihmdW5jdGlvbihuMykgewogICAgICAgICAgICByZXR1cm4gby5ibG9iICYmIChuMyBpbnN0YW5jZW9mIEJsb2IgfHwgLTEgIT09IFsiW29iamVjdCBGaWxlXSIsICJbb2JqZWN0IEJsb2JdIl0uaW5kZXhPZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobjMpKSkgJiYgInVuZGVmaW5lZCIgIT0gdHlwZW9mIEZpbGVSZWFkZXIgPyBuZXcgdS5Qcm9taXNlKGZ1bmN0aW9uKHQyLCByMykgewogICAgICAgICAgICAgIHZhciBlMyA9IG5ldyBGaWxlUmVhZGVyKCk7CiAgICAgICAgICAgICAgZTMub25sb2FkID0gZnVuY3Rpb24oZTQpIHsKICAgICAgICAgICAgICAgIHQyKGU0LnRhcmdldC5yZXN1bHQpOwogICAgICAgICAgICAgIH0sIGUzLm9uZXJyb3IgPSBmdW5jdGlvbihlNCkgewogICAgICAgICAgICAgICAgcjMoZTQudGFyZ2V0LmVycm9yKTsKICAgICAgICAgICAgICB9LCBlMy5yZWFkQXNBcnJheUJ1ZmZlcihuMyk7CiAgICAgICAgICAgIH0pIDogbjM7CiAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKGUzKSB7CiAgICAgICAgICAgIHZhciB0MiA9IGEuZ2V0VHlwZU9mKGUzKTsKICAgICAgICAgICAgcmV0dXJuIHQyID8gKCJhcnJheWJ1ZmZlciIgPT09IHQyID8gZTMgPSBhLnRyYW5zZm9ybVRvKCJ1aW50OGFycmF5IiwgZTMpIDogInN0cmluZyIgPT09IHQyICYmIChzMiA/IGUzID0gaC5kZWNvZGUoZTMpIDogbjIgJiYgdHJ1ZSAhPT0gaTIgJiYgKGUzID0gZnVuY3Rpb24oZTQpIHsKICAgICAgICAgICAgICByZXR1cm4gbChlNCwgby51aW50OGFycmF5ID8gbmV3IFVpbnQ4QXJyYXkoZTQubGVuZ3RoKSA6IG5ldyBBcnJheShlNC5sZW5ndGgpKTsKICAgICAgICAgICAgfShlMykpKSwgZTMpIDogdS5Qcm9taXNlLnJlamVjdChuZXcgRXJyb3IoIkNhbid0IHJlYWQgdGhlIGRhdGEgb2YgJyIgKyByMiArICInLiBJcyBpdCBpbiBhIHN1cHBvcnRlZCBKYXZhU2NyaXB0IHR5cGUgKFN0cmluZywgQmxvYiwgQXJyYXlCdWZmZXIsIGV0YykgPyIpKTsKICAgICAgICAgIH0pOwogICAgICAgIH07CiAgICAgIH0sIHsgIi4vYmFzZTY0IjogMSwgIi4vZXh0ZXJuYWwiOiA2LCAiLi9ub2RlanNVdGlscyI6IDE0LCAiLi9zdXBwb3J0IjogMzAsIHNldGltbWVkaWF0ZTogNTQgfV0sIDMzOiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIHZhciBuID0gZSgiLi9yZWFkZXIvcmVhZGVyRm9yIiksIGkgPSBlKCIuL3V0aWxzIiksIHMgPSBlKCIuL3NpZ25hdHVyZSIpLCBhID0gZSgiLi96aXBFbnRyeSIpLCBvID0gZSgiLi9zdXBwb3J0Iik7CiAgICAgICAgZnVuY3Rpb24gaChlMikgewogICAgICAgICAgdGhpcy5maWxlcyA9IFtdLCB0aGlzLmxvYWRPcHRpb25zID0gZTI7CiAgICAgICAgfQogICAgICAgIGgucHJvdG90eXBlID0geyBjaGVja1NpZ25hdHVyZTogZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIGlmICghdGhpcy5yZWFkZXIucmVhZEFuZENoZWNrU2lnbmF0dXJlKGUyKSkgewogICAgICAgICAgICB0aGlzLnJlYWRlci5pbmRleCAtPSA0OwogICAgICAgICAgICB2YXIgdDIgPSB0aGlzLnJlYWRlci5yZWFkU3RyaW5nKDQpOwogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIkNvcnJ1cHRlZCB6aXAgb3IgYnVnOiB1bmV4cGVjdGVkIHNpZ25hdHVyZSAoIiArIGkucHJldHR5KHQyKSArICIsIGV4cGVjdGVkICIgKyBpLnByZXR0eShlMikgKyAiKSIpOwogICAgICAgICAgfQogICAgICAgIH0sIGlzU2lnbmF0dXJlOiBmdW5jdGlvbihlMiwgdDIpIHsKICAgICAgICAgIHZhciByMiA9IHRoaXMucmVhZGVyLmluZGV4OwogICAgICAgICAgdGhpcy5yZWFkZXIuc2V0SW5kZXgoZTIpOwogICAgICAgICAgdmFyIG4yID0gdGhpcy5yZWFkZXIucmVhZFN0cmluZyg0KSA9PT0gdDI7CiAgICAgICAgICByZXR1cm4gdGhpcy5yZWFkZXIuc2V0SW5kZXgocjIpLCBuMjsKICAgICAgICB9LCByZWFkQmxvY2tFbmRPZkNlbnRyYWw6IGZ1bmN0aW9uKCkgewogICAgICAgICAgdGhpcy5kaXNrTnVtYmVyID0gdGhpcy5yZWFkZXIucmVhZEludCgyKSwgdGhpcy5kaXNrV2l0aENlbnRyYWxEaXJTdGFydCA9IHRoaXMucmVhZGVyLnJlYWRJbnQoMiksIHRoaXMuY2VudHJhbERpclJlY29yZHNPblRoaXNEaXNrID0gdGhpcy5yZWFkZXIucmVhZEludCgyKSwgdGhpcy5jZW50cmFsRGlyUmVjb3JkcyA9IHRoaXMucmVhZGVyLnJlYWRJbnQoMiksIHRoaXMuY2VudHJhbERpclNpemUgPSB0aGlzLnJlYWRlci5yZWFkSW50KDQpLCB0aGlzLmNlbnRyYWxEaXJPZmZzZXQgPSB0aGlzLnJlYWRlci5yZWFkSW50KDQpLCB0aGlzLnppcENvbW1lbnRMZW5ndGggPSB0aGlzLnJlYWRlci5yZWFkSW50KDIpOwogICAgICAgICAgdmFyIGUyID0gdGhpcy5yZWFkZXIucmVhZERhdGEodGhpcy56aXBDb21tZW50TGVuZ3RoKSwgdDIgPSBvLnVpbnQ4YXJyYXkgPyAidWludDhhcnJheSIgOiAiYXJyYXkiLCByMiA9IGkudHJhbnNmb3JtVG8odDIsIGUyKTsKICAgICAgICAgIHRoaXMuemlwQ29tbWVudCA9IHRoaXMubG9hZE9wdGlvbnMuZGVjb2RlRmlsZU5hbWUocjIpOwogICAgICAgIH0sIHJlYWRCbG9ja1ppcDY0RW5kT2ZDZW50cmFsOiBmdW5jdGlvbigpIHsKICAgICAgICAgIHRoaXMuemlwNjRFbmRPZkNlbnRyYWxTaXplID0gdGhpcy5yZWFkZXIucmVhZEludCg4KSwgdGhpcy5yZWFkZXIuc2tpcCg0KSwgdGhpcy5kaXNrTnVtYmVyID0gdGhpcy5yZWFkZXIucmVhZEludCg0KSwgdGhpcy5kaXNrV2l0aENlbnRyYWxEaXJTdGFydCA9IHRoaXMucmVhZGVyLnJlYWRJbnQoNCksIHRoaXMuY2VudHJhbERpclJlY29yZHNPblRoaXNEaXNrID0gdGhpcy5yZWFkZXIucmVhZEludCg4KSwgdGhpcy5jZW50cmFsRGlyUmVjb3JkcyA9IHRoaXMucmVhZGVyLnJlYWRJbnQoOCksIHRoaXMuY2VudHJhbERpclNpemUgPSB0aGlzLnJlYWRlci5yZWFkSW50KDgpLCB0aGlzLmNlbnRyYWxEaXJPZmZzZXQgPSB0aGlzLnJlYWRlci5yZWFkSW50KDgpLCB0aGlzLnppcDY0RXh0ZW5zaWJsZURhdGEgPSB7fTsKICAgICAgICAgIGZvciAodmFyIGUyLCB0MiwgcjIsIG4yID0gdGhpcy56aXA2NEVuZE9mQ2VudHJhbFNpemUgLSA0NDsgMCA8IG4yOyApCiAgICAgICAgICAgIGUyID0gdGhpcy5yZWFkZXIucmVhZEludCgyKSwgdDIgPSB0aGlzLnJlYWRlci5yZWFkSW50KDQpLCByMiA9IHRoaXMucmVhZGVyLnJlYWREYXRhKHQyKSwgdGhpcy56aXA2NEV4dGVuc2libGVEYXRhW2UyXSA9IHsgaWQ6IGUyLCBsZW5ndGg6IHQyLCB2YWx1ZTogcjIgfTsKICAgICAgICB9LCByZWFkQmxvY2taaXA2NEVuZE9mQ2VudHJhbExvY2F0b3I6IGZ1bmN0aW9uKCkgewogICAgICAgICAgaWYgKHRoaXMuZGlza1dpdGhaaXA2NENlbnRyYWxEaXJTdGFydCA9IHRoaXMucmVhZGVyLnJlYWRJbnQoNCksIHRoaXMucmVsYXRpdmVPZmZzZXRFbmRPZlppcDY0Q2VudHJhbERpciA9IHRoaXMucmVhZGVyLnJlYWRJbnQoOCksIHRoaXMuZGlza3NDb3VudCA9IHRoaXMucmVhZGVyLnJlYWRJbnQoNCksIDEgPCB0aGlzLmRpc2tzQ291bnQpCiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigiTXVsdGktdm9sdW1lcyB6aXAgYXJlIG5vdCBzdXBwb3J0ZWQiKTsKICAgICAgICB9LCByZWFkTG9jYWxGaWxlczogZnVuY3Rpb24oKSB7CiAgICAgICAgICB2YXIgZTIsIHQyOwogICAgICAgICAgZm9yIChlMiA9IDA7IGUyIDwgdGhpcy5maWxlcy5sZW5ndGg7IGUyKyspCiAgICAgICAgICAgIHQyID0gdGhpcy5maWxlc1tlMl0sIHRoaXMucmVhZGVyLnNldEluZGV4KHQyLmxvY2FsSGVhZGVyT2Zmc2V0KSwgdGhpcy5jaGVja1NpZ25hdHVyZShzLkxPQ0FMX0ZJTEVfSEVBREVSKSwgdDIucmVhZExvY2FsUGFydCh0aGlzLnJlYWRlciksIHQyLmhhbmRsZVVURjgoKSwgdDIucHJvY2Vzc0F0dHJpYnV0ZXMoKTsKICAgICAgICB9LCByZWFkQ2VudHJhbERpcjogZnVuY3Rpb24oKSB7CiAgICAgICAgICB2YXIgZTI7CiAgICAgICAgICBmb3IgKHRoaXMucmVhZGVyLnNldEluZGV4KHRoaXMuY2VudHJhbERpck9mZnNldCk7IHRoaXMucmVhZGVyLnJlYWRBbmRDaGVja1NpZ25hdHVyZShzLkNFTlRSQUxfRklMRV9IRUFERVIpOyApCiAgICAgICAgICAgIChlMiA9IG5ldyBhKHsgemlwNjQ6IHRoaXMuemlwNjQgfSwgdGhpcy5sb2FkT3B0aW9ucykpLnJlYWRDZW50cmFsUGFydCh0aGlzLnJlYWRlciksIHRoaXMuZmlsZXMucHVzaChlMik7CiAgICAgICAgICBpZiAodGhpcy5jZW50cmFsRGlyUmVjb3JkcyAhPT0gdGhpcy5maWxlcy5sZW5ndGggJiYgMCAhPT0gdGhpcy5jZW50cmFsRGlyUmVjb3JkcyAmJiAwID09PSB0aGlzLmZpbGVzLmxlbmd0aCkKICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJDb3JydXB0ZWQgemlwIG9yIGJ1ZzogZXhwZWN0ZWQgIiArIHRoaXMuY2VudHJhbERpclJlY29yZHMgKyAiIHJlY29yZHMgaW4gY2VudHJhbCBkaXIsIGdvdCAiICsgdGhpcy5maWxlcy5sZW5ndGgpOwogICAgICAgIH0sIHJlYWRFbmRPZkNlbnRyYWw6IGZ1bmN0aW9uKCkgewogICAgICAgICAgdmFyIGUyID0gdGhpcy5yZWFkZXIubGFzdEluZGV4T2ZTaWduYXR1cmUocy5DRU5UUkFMX0RJUkVDVE9SWV9FTkQpOwogICAgICAgICAgaWYgKGUyIDwgMCkKICAgICAgICAgICAgdGhyb3cgIXRoaXMuaXNTaWduYXR1cmUoMCwgcy5MT0NBTF9GSUxFX0hFQURFUikgPyBuZXcgRXJyb3IoIkNhbid0IGZpbmQgZW5kIG9mIGNlbnRyYWwgZGlyZWN0b3J5IDogaXMgdGhpcyBhIHppcCBmaWxlID8gSWYgaXQgaXMsIHNlZSBodHRwczovL3N0dWsuZ2l0aHViLmlvL2pzemlwL2RvY3VtZW50YXRpb24vaG93dG8vcmVhZF96aXAuaHRtbCIpIDogbmV3IEVycm9yKCJDb3JydXB0ZWQgemlwOiBjYW4ndCBmaW5kIGVuZCBvZiBjZW50cmFsIGRpcmVjdG9yeSIpOwogICAgICAgICAgdGhpcy5yZWFkZXIuc2V0SW5kZXgoZTIpOwogICAgICAgICAgdmFyIHQyID0gZTI7CiAgICAgICAgICBpZiAodGhpcy5jaGVja1NpZ25hdHVyZShzLkNFTlRSQUxfRElSRUNUT1JZX0VORCksIHRoaXMucmVhZEJsb2NrRW5kT2ZDZW50cmFsKCksIHRoaXMuZGlza051bWJlciA9PT0gaS5NQVhfVkFMVUVfMTZCSVRTIHx8IHRoaXMuZGlza1dpdGhDZW50cmFsRGlyU3RhcnQgPT09IGkuTUFYX1ZBTFVFXzE2QklUUyB8fCB0aGlzLmNlbnRyYWxEaXJSZWNvcmRzT25UaGlzRGlzayA9PT0gaS5NQVhfVkFMVUVfMTZCSVRTIHx8IHRoaXMuY2VudHJhbERpclJlY29yZHMgPT09IGkuTUFYX1ZBTFVFXzE2QklUUyB8fCB0aGlzLmNlbnRyYWxEaXJTaXplID09PSBpLk1BWF9WQUxVRV8zMkJJVFMgfHwgdGhpcy5jZW50cmFsRGlyT2Zmc2V0ID09PSBpLk1BWF9WQUxVRV8zMkJJVFMpIHsKICAgICAgICAgICAgaWYgKHRoaXMuemlwNjQgPSB0cnVlLCAoZTIgPSB0aGlzLnJlYWRlci5sYXN0SW5kZXhPZlNpZ25hdHVyZShzLlpJUDY0X0NFTlRSQUxfRElSRUNUT1JZX0xPQ0FUT1IpKSA8IDApCiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJDb3JydXB0ZWQgemlwOiBjYW4ndCBmaW5kIHRoZSBaSVA2NCBlbmQgb2YgY2VudHJhbCBkaXJlY3RvcnkgbG9jYXRvciIpOwogICAgICAgICAgICBpZiAodGhpcy5yZWFkZXIuc2V0SW5kZXgoZTIpLCB0aGlzLmNoZWNrU2lnbmF0dXJlKHMuWklQNjRfQ0VOVFJBTF9ESVJFQ1RPUllfTE9DQVRPUiksIHRoaXMucmVhZEJsb2NrWmlwNjRFbmRPZkNlbnRyYWxMb2NhdG9yKCksICF0aGlzLmlzU2lnbmF0dXJlKHRoaXMucmVsYXRpdmVPZmZzZXRFbmRPZlppcDY0Q2VudHJhbERpciwgcy5aSVA2NF9DRU5UUkFMX0RJUkVDVE9SWV9FTkQpICYmICh0aGlzLnJlbGF0aXZlT2Zmc2V0RW5kT2ZaaXA2NENlbnRyYWxEaXIgPSB0aGlzLnJlYWRlci5sYXN0SW5kZXhPZlNpZ25hdHVyZShzLlpJUDY0X0NFTlRSQUxfRElSRUNUT1JZX0VORCksIHRoaXMucmVsYXRpdmVPZmZzZXRFbmRPZlppcDY0Q2VudHJhbERpciA8IDApKQogICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigiQ29ycnVwdGVkIHppcDogY2FuJ3QgZmluZCB0aGUgWklQNjQgZW5kIG9mIGNlbnRyYWwgZGlyZWN0b3J5Iik7CiAgICAgICAgICAgIHRoaXMucmVhZGVyLnNldEluZGV4KHRoaXMucmVsYXRpdmVPZmZzZXRFbmRPZlppcDY0Q2VudHJhbERpciksIHRoaXMuY2hlY2tTaWduYXR1cmUocy5aSVA2NF9DRU5UUkFMX0RJUkVDVE9SWV9FTkQpLCB0aGlzLnJlYWRCbG9ja1ppcDY0RW5kT2ZDZW50cmFsKCk7CiAgICAgICAgICB9CiAgICAgICAgICB2YXIgcjIgPSB0aGlzLmNlbnRyYWxEaXJPZmZzZXQgKyB0aGlzLmNlbnRyYWxEaXJTaXplOwogICAgICAgICAgdGhpcy56aXA2NCAmJiAocjIgKz0gMjAsIHIyICs9IDEyICsgdGhpcy56aXA2NEVuZE9mQ2VudHJhbFNpemUpOwogICAgICAgICAgdmFyIG4yID0gdDIgLSByMjsKICAgICAgICAgIGlmICgwIDwgbjIpCiAgICAgICAgICAgIHRoaXMuaXNTaWduYXR1cmUodDIsIHMuQ0VOVFJBTF9GSUxFX0hFQURFUikgfHwgKHRoaXMucmVhZGVyLnplcm8gPSBuMik7CiAgICAgICAgICBlbHNlIGlmIChuMiA8IDApCiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigiQ29ycnVwdGVkIHppcDogbWlzc2luZyAiICsgTWF0aC5hYnMobjIpICsgIiBieXRlcy4iKTsKICAgICAgICB9LCBwcmVwYXJlUmVhZGVyOiBmdW5jdGlvbihlMikgewogICAgICAgICAgdGhpcy5yZWFkZXIgPSBuKGUyKTsKICAgICAgICB9LCBsb2FkOiBmdW5jdGlvbihlMikgewogICAgICAgICAgdGhpcy5wcmVwYXJlUmVhZGVyKGUyKSwgdGhpcy5yZWFkRW5kT2ZDZW50cmFsKCksIHRoaXMucmVhZENlbnRyYWxEaXIoKSwgdGhpcy5yZWFkTG9jYWxGaWxlcygpOwogICAgICAgIH0gfSwgdC5leHBvcnRzID0gaDsKICAgICAgfSwgeyAiLi9yZWFkZXIvcmVhZGVyRm9yIjogMjIsICIuL3NpZ25hdHVyZSI6IDIzLCAiLi9zdXBwb3J0IjogMzAsICIuL3V0aWxzIjogMzIsICIuL3ppcEVudHJ5IjogMzQgfV0sIDM0OiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIHZhciBuID0gZSgiLi9yZWFkZXIvcmVhZGVyRm9yIiksIHMgPSBlKCIuL3V0aWxzIiksIGkgPSBlKCIuL2NvbXByZXNzZWRPYmplY3QiKSwgYSA9IGUoIi4vY3JjMzIiKSwgbyA9IGUoIi4vdXRmOCIpLCBoID0gZSgiLi9jb21wcmVzc2lvbnMiKSwgdSA9IGUoIi4vc3VwcG9ydCIpOwogICAgICAgIGZ1bmN0aW9uIGwoZTIsIHQyKSB7CiAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBlMiwgdGhpcy5sb2FkT3B0aW9ucyA9IHQyOwogICAgICAgIH0KICAgICAgICBsLnByb3RvdHlwZSA9IHsgaXNFbmNyeXB0ZWQ6IGZ1bmN0aW9uKCkgewogICAgICAgICAgcmV0dXJuIDEgPT0gKDEgJiB0aGlzLmJpdEZsYWcpOwogICAgICAgIH0sIHVzZVVURjg6IGZ1bmN0aW9uKCkgewogICAgICAgICAgcmV0dXJuIDIwNDggPT0gKDIwNDggJiB0aGlzLmJpdEZsYWcpOwogICAgICAgIH0sIHJlYWRMb2NhbFBhcnQ6IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICB2YXIgdDIsIHIyOwogICAgICAgICAgaWYgKGUyLnNraXAoMjIpLCB0aGlzLmZpbGVOYW1lTGVuZ3RoID0gZTIucmVhZEludCgyKSwgcjIgPSBlMi5yZWFkSW50KDIpLCB0aGlzLmZpbGVOYW1lID0gZTIucmVhZERhdGEodGhpcy5maWxlTmFtZUxlbmd0aCksIGUyLnNraXAocjIpLCAtMSA9PT0gdGhpcy5jb21wcmVzc2VkU2l6ZSB8fCAtMSA9PT0gdGhpcy51bmNvbXByZXNzZWRTaXplKQogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIkJ1ZyBvciBjb3JydXB0ZWQgemlwIDogZGlkbid0IGdldCBlbm91Z2ggaW5mb3JtYXRpb24gZnJvbSB0aGUgY2VudHJhbCBkaXJlY3RvcnkgKGNvbXByZXNzZWRTaXplID09PSAtMSB8fCB1bmNvbXByZXNzZWRTaXplID09PSAtMSkiKTsKICAgICAgICAgIGlmIChudWxsID09PSAodDIgPSBmdW5jdGlvbihlMykgewogICAgICAgICAgICBmb3IgKHZhciB0MyBpbiBoKQogICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaCwgdDMpICYmIGhbdDNdLm1hZ2ljID09PSBlMykKICAgICAgICAgICAgICAgIHJldHVybiBoW3QzXTsKICAgICAgICAgICAgcmV0dXJuIG51bGw7CiAgICAgICAgICB9KHRoaXMuY29tcHJlc3Npb25NZXRob2QpKSkKICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJDb3JydXB0ZWQgemlwIDogY29tcHJlc3Npb24gIiArIHMucHJldHR5KHRoaXMuY29tcHJlc3Npb25NZXRob2QpICsgIiB1bmtub3duIChpbm5lciBmaWxlIDogIiArIHMudHJhbnNmb3JtVG8oInN0cmluZyIsIHRoaXMuZmlsZU5hbWUpICsgIikiKTsKICAgICAgICAgIHRoaXMuZGVjb21wcmVzc2VkID0gbmV3IGkodGhpcy5jb21wcmVzc2VkU2l6ZSwgdGhpcy51bmNvbXByZXNzZWRTaXplLCB0aGlzLmNyYzMyLCB0MiwgZTIucmVhZERhdGEodGhpcy5jb21wcmVzc2VkU2l6ZSkpOwogICAgICAgIH0sIHJlYWRDZW50cmFsUGFydDogZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHRoaXMudmVyc2lvbk1hZGVCeSA9IGUyLnJlYWRJbnQoMiksIGUyLnNraXAoMiksIHRoaXMuYml0RmxhZyA9IGUyLnJlYWRJbnQoMiksIHRoaXMuY29tcHJlc3Npb25NZXRob2QgPSBlMi5yZWFkU3RyaW5nKDIpLCB0aGlzLmRhdGUgPSBlMi5yZWFkRGF0ZSgpLCB0aGlzLmNyYzMyID0gZTIucmVhZEludCg0KSwgdGhpcy5jb21wcmVzc2VkU2l6ZSA9IGUyLnJlYWRJbnQoNCksIHRoaXMudW5jb21wcmVzc2VkU2l6ZSA9IGUyLnJlYWRJbnQoNCk7CiAgICAgICAgICB2YXIgdDIgPSBlMi5yZWFkSW50KDIpOwogICAgICAgICAgaWYgKHRoaXMuZXh0cmFGaWVsZHNMZW5ndGggPSBlMi5yZWFkSW50KDIpLCB0aGlzLmZpbGVDb21tZW50TGVuZ3RoID0gZTIucmVhZEludCgyKSwgdGhpcy5kaXNrTnVtYmVyU3RhcnQgPSBlMi5yZWFkSW50KDIpLCB0aGlzLmludGVybmFsRmlsZUF0dHJpYnV0ZXMgPSBlMi5yZWFkSW50KDIpLCB0aGlzLmV4dGVybmFsRmlsZUF0dHJpYnV0ZXMgPSBlMi5yZWFkSW50KDQpLCB0aGlzLmxvY2FsSGVhZGVyT2Zmc2V0ID0gZTIucmVhZEludCg0KSwgdGhpcy5pc0VuY3J5cHRlZCgpKQogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIkVuY3J5cHRlZCB6aXAgYXJlIG5vdCBzdXBwb3J0ZWQiKTsKICAgICAgICAgIGUyLnNraXAodDIpLCB0aGlzLnJlYWRFeHRyYUZpZWxkcyhlMiksIHRoaXMucGFyc2VaSVA2NEV4dHJhRmllbGQoZTIpLCB0aGlzLmZpbGVDb21tZW50ID0gZTIucmVhZERhdGEodGhpcy5maWxlQ29tbWVudExlbmd0aCk7CiAgICAgICAgfSwgcHJvY2Vzc0F0dHJpYnV0ZXM6IGZ1bmN0aW9uKCkgewogICAgICAgICAgdGhpcy51bml4UGVybWlzc2lvbnMgPSBudWxsLCB0aGlzLmRvc1Blcm1pc3Npb25zID0gbnVsbDsKICAgICAgICAgIHZhciBlMiA9IHRoaXMudmVyc2lvbk1hZGVCeSA+PiA4OwogICAgICAgICAgdGhpcy5kaXIgPSAhISgxNiAmIHRoaXMuZXh0ZXJuYWxGaWxlQXR0cmlidXRlcyksIDAgPT0gZTIgJiYgKHRoaXMuZG9zUGVybWlzc2lvbnMgPSA2MyAmIHRoaXMuZXh0ZXJuYWxGaWxlQXR0cmlidXRlcyksIDMgPT0gZTIgJiYgKHRoaXMudW5peFBlcm1pc3Npb25zID0gdGhpcy5leHRlcm5hbEZpbGVBdHRyaWJ1dGVzID4+IDE2ICYgNjU1MzUpLCB0aGlzLmRpciB8fCAiLyIgIT09IHRoaXMuZmlsZU5hbWVTdHIuc2xpY2UoLTEpIHx8ICh0aGlzLmRpciA9IHRydWUpOwogICAgICAgIH0sIHBhcnNlWklQNjRFeHRyYUZpZWxkOiBmdW5jdGlvbigpIHsKICAgICAgICAgIGlmICh0aGlzLmV4dHJhRmllbGRzWzFdKSB7CiAgICAgICAgICAgIHZhciBlMiA9IG4odGhpcy5leHRyYUZpZWxkc1sxXS52YWx1ZSk7CiAgICAgICAgICAgIHRoaXMudW5jb21wcmVzc2VkU2l6ZSA9PT0gcy5NQVhfVkFMVUVfMzJCSVRTICYmICh0aGlzLnVuY29tcHJlc3NlZFNpemUgPSBlMi5yZWFkSW50KDgpKSwgdGhpcy5jb21wcmVzc2VkU2l6ZSA9PT0gcy5NQVhfVkFMVUVfMzJCSVRTICYmICh0aGlzLmNvbXByZXNzZWRTaXplID0gZTIucmVhZEludCg4KSksIHRoaXMubG9jYWxIZWFkZXJPZmZzZXQgPT09IHMuTUFYX1ZBTFVFXzMyQklUUyAmJiAodGhpcy5sb2NhbEhlYWRlck9mZnNldCA9IGUyLnJlYWRJbnQoOCkpLCB0aGlzLmRpc2tOdW1iZXJTdGFydCA9PT0gcy5NQVhfVkFMVUVfMzJCSVRTICYmICh0aGlzLmRpc2tOdW1iZXJTdGFydCA9IGUyLnJlYWRJbnQoNCkpOwogICAgICAgICAgfQogICAgICAgIH0sIHJlYWRFeHRyYUZpZWxkczogZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHZhciB0MiwgcjIsIG4yLCBpMiA9IGUyLmluZGV4ICsgdGhpcy5leHRyYUZpZWxkc0xlbmd0aDsKICAgICAgICAgIGZvciAodGhpcy5leHRyYUZpZWxkcyB8fCAodGhpcy5leHRyYUZpZWxkcyA9IHt9KTsgZTIuaW5kZXggKyA0IDwgaTI7ICkKICAgICAgICAgICAgdDIgPSBlMi5yZWFkSW50KDIpLCByMiA9IGUyLnJlYWRJbnQoMiksIG4yID0gZTIucmVhZERhdGEocjIpLCB0aGlzLmV4dHJhRmllbGRzW3QyXSA9IHsgaWQ6IHQyLCBsZW5ndGg6IHIyLCB2YWx1ZTogbjIgfTsKICAgICAgICAgIGUyLnNldEluZGV4KGkyKTsKICAgICAgICB9LCBoYW5kbGVVVEY4OiBmdW5jdGlvbigpIHsKICAgICAgICAgIHZhciBlMiA9IHUudWludDhhcnJheSA/ICJ1aW50OGFycmF5IiA6ICJhcnJheSI7CiAgICAgICAgICBpZiAodGhpcy51c2VVVEY4KCkpCiAgICAgICAgICAgIHRoaXMuZmlsZU5hbWVTdHIgPSBvLnV0ZjhkZWNvZGUodGhpcy5maWxlTmFtZSksIHRoaXMuZmlsZUNvbW1lbnRTdHIgPSBvLnV0ZjhkZWNvZGUodGhpcy5maWxlQ29tbWVudCk7CiAgICAgICAgICBlbHNlIHsKICAgICAgICAgICAgdmFyIHQyID0gdGhpcy5maW5kRXh0cmFGaWVsZFVuaWNvZGVQYXRoKCk7CiAgICAgICAgICAgIGlmIChudWxsICE9PSB0MikKICAgICAgICAgICAgICB0aGlzLmZpbGVOYW1lU3RyID0gdDI7CiAgICAgICAgICAgIGVsc2UgewogICAgICAgICAgICAgIHZhciByMiA9IHMudHJhbnNmb3JtVG8oZTIsIHRoaXMuZmlsZU5hbWUpOwogICAgICAgICAgICAgIHRoaXMuZmlsZU5hbWVTdHIgPSB0aGlzLmxvYWRPcHRpb25zLmRlY29kZUZpbGVOYW1lKHIyKTsKICAgICAgICAgICAgfQogICAgICAgICAgICB2YXIgbjIgPSB0aGlzLmZpbmRFeHRyYUZpZWxkVW5pY29kZUNvbW1lbnQoKTsKICAgICAgICAgICAgaWYgKG51bGwgIT09IG4yKQogICAgICAgICAgICAgIHRoaXMuZmlsZUNvbW1lbnRTdHIgPSBuMjsKICAgICAgICAgICAgZWxzZSB7CiAgICAgICAgICAgICAgdmFyIGkyID0gcy50cmFuc2Zvcm1UbyhlMiwgdGhpcy5maWxlQ29tbWVudCk7CiAgICAgICAgICAgICAgdGhpcy5maWxlQ29tbWVudFN0ciA9IHRoaXMubG9hZE9wdGlvbnMuZGVjb2RlRmlsZU5hbWUoaTIpOwogICAgICAgICAgICB9CiAgICAgICAgICB9CiAgICAgICAgfSwgZmluZEV4dHJhRmllbGRVbmljb2RlUGF0aDogZnVuY3Rpb24oKSB7CiAgICAgICAgICB2YXIgZTIgPSB0aGlzLmV4dHJhRmllbGRzWzI4Nzg5XTsKICAgICAgICAgIGlmIChlMikgewogICAgICAgICAgICB2YXIgdDIgPSBuKGUyLnZhbHVlKTsKICAgICAgICAgICAgcmV0dXJuIDEgIT09IHQyLnJlYWRJbnQoMSkgPyBudWxsIDogYSh0aGlzLmZpbGVOYW1lKSAhPT0gdDIucmVhZEludCg0KSA/IG51bGwgOiBvLnV0ZjhkZWNvZGUodDIucmVhZERhdGEoZTIubGVuZ3RoIC0gNSkpOwogICAgICAgICAgfQogICAgICAgICAgcmV0dXJuIG51bGw7CiAgICAgICAgfSwgZmluZEV4dHJhRmllbGRVbmljb2RlQ29tbWVudDogZnVuY3Rpb24oKSB7CiAgICAgICAgICB2YXIgZTIgPSB0aGlzLmV4dHJhRmllbGRzWzI1NDYxXTsKICAgICAgICAgIGlmIChlMikgewogICAgICAgICAgICB2YXIgdDIgPSBuKGUyLnZhbHVlKTsKICAgICAgICAgICAgcmV0dXJuIDEgIT09IHQyLnJlYWRJbnQoMSkgPyBudWxsIDogYSh0aGlzLmZpbGVDb21tZW50KSAhPT0gdDIucmVhZEludCg0KSA/IG51bGwgOiBvLnV0ZjhkZWNvZGUodDIucmVhZERhdGEoZTIubGVuZ3RoIC0gNSkpOwogICAgICAgICAgfQogICAgICAgICAgcmV0dXJuIG51bGw7CiAgICAgICAgfSB9LCB0LmV4cG9ydHMgPSBsOwogICAgICB9LCB7ICIuL2NvbXByZXNzZWRPYmplY3QiOiAyLCAiLi9jb21wcmVzc2lvbnMiOiAzLCAiLi9jcmMzMiI6IDQsICIuL3JlYWRlci9yZWFkZXJGb3IiOiAyMiwgIi4vc3VwcG9ydCI6IDMwLCAiLi91dGY4IjogMzEsICIuL3V0aWxzIjogMzIgfV0sIDM1OiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIGZ1bmN0aW9uIG4oZTIsIHQyLCByMikgewogICAgICAgICAgdGhpcy5uYW1lID0gZTIsIHRoaXMuZGlyID0gcjIuZGlyLCB0aGlzLmRhdGUgPSByMi5kYXRlLCB0aGlzLmNvbW1lbnQgPSByMi5jb21tZW50LCB0aGlzLnVuaXhQZXJtaXNzaW9ucyA9IHIyLnVuaXhQZXJtaXNzaW9ucywgdGhpcy5kb3NQZXJtaXNzaW9ucyA9IHIyLmRvc1Blcm1pc3Npb25zLCB0aGlzLl9kYXRhID0gdDIsIHRoaXMuX2RhdGFCaW5hcnkgPSByMi5iaW5hcnksIHRoaXMub3B0aW9ucyA9IHsgY29tcHJlc3Npb246IHIyLmNvbXByZXNzaW9uLCBjb21wcmVzc2lvbk9wdGlvbnM6IHIyLmNvbXByZXNzaW9uT3B0aW9ucyB9OwogICAgICAgIH0KICAgICAgICB2YXIgcyA9IGUoIi4vc3RyZWFtL1N0cmVhbUhlbHBlciIpLCBpID0gZSgiLi9zdHJlYW0vRGF0YVdvcmtlciIpLCBhID0gZSgiLi91dGY4IiksIG8gPSBlKCIuL2NvbXByZXNzZWRPYmplY3QiKSwgaCA9IGUoIi4vc3RyZWFtL0dlbmVyaWNXb3JrZXIiKTsKICAgICAgICBuLnByb3RvdHlwZSA9IHsgaW50ZXJuYWxTdHJlYW06IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICB2YXIgdDIgPSBudWxsLCByMiA9ICJzdHJpbmciOwogICAgICAgICAgdHJ5IHsKICAgICAgICAgICAgaWYgKCFlMikKICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIk5vIG91dHB1dCB0eXBlIHNwZWNpZmllZC4iKTsKICAgICAgICAgICAgdmFyIG4yID0gInN0cmluZyIgPT09IChyMiA9IGUyLnRvTG93ZXJDYXNlKCkpIHx8ICJ0ZXh0IiA9PT0gcjI7CiAgICAgICAgICAgICJiaW5hcnlzdHJpbmciICE9PSByMiAmJiAidGV4dCIgIT09IHIyIHx8IChyMiA9ICJzdHJpbmciKSwgdDIgPSB0aGlzLl9kZWNvbXByZXNzV29ya2VyKCk7CiAgICAgICAgICAgIHZhciBpMiA9ICF0aGlzLl9kYXRhQmluYXJ5OwogICAgICAgICAgICBpMiAmJiAhbjIgJiYgKHQyID0gdDIucGlwZShuZXcgYS5VdGY4RW5jb2RlV29ya2VyKCkpKSwgIWkyICYmIG4yICYmICh0MiA9IHQyLnBpcGUobmV3IGEuVXRmOERlY29kZVdvcmtlcigpKSk7CiAgICAgICAgICB9IGNhdGNoIChlMykgewogICAgICAgICAgICAodDIgPSBuZXcgaCgiZXJyb3IiKSkuZXJyb3IoZTMpOwogICAgICAgICAgfQogICAgICAgICAgcmV0dXJuIG5ldyBzKHQyLCByMiwgIiIpOwogICAgICAgIH0sIGFzeW5jOiBmdW5jdGlvbihlMiwgdDIpIHsKICAgICAgICAgIHJldHVybiB0aGlzLmludGVybmFsU3RyZWFtKGUyKS5hY2N1bXVsYXRlKHQyKTsKICAgICAgICB9LCBub2RlU3RyZWFtOiBmdW5jdGlvbihlMiwgdDIpIHsKICAgICAgICAgIHJldHVybiB0aGlzLmludGVybmFsU3RyZWFtKGUyIHx8ICJub2RlYnVmZmVyIikudG9Ob2RlanNTdHJlYW0odDIpOwogICAgICAgIH0sIF9jb21wcmVzc1dvcmtlcjogZnVuY3Rpb24oZTIsIHQyKSB7CiAgICAgICAgICBpZiAodGhpcy5fZGF0YSBpbnN0YW5jZW9mIG8gJiYgdGhpcy5fZGF0YS5jb21wcmVzc2lvbi5tYWdpYyA9PT0gZTIubWFnaWMpCiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhLmdldENvbXByZXNzZWRXb3JrZXIoKTsKICAgICAgICAgIHZhciByMiA9IHRoaXMuX2RlY29tcHJlc3NXb3JrZXIoKTsKICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhQmluYXJ5IHx8IChyMiA9IHIyLnBpcGUobmV3IGEuVXRmOEVuY29kZVdvcmtlcigpKSksIG8uY3JlYXRlV29ya2VyRnJvbShyMiwgZTIsIHQyKTsKICAgICAgICB9LCBfZGVjb21wcmVzc1dvcmtlcjogZnVuY3Rpb24oKSB7CiAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YSBpbnN0YW5jZW9mIG8gPyB0aGlzLl9kYXRhLmdldENvbnRlbnRXb3JrZXIoKSA6IHRoaXMuX2RhdGEgaW5zdGFuY2VvZiBoID8gdGhpcy5fZGF0YSA6IG5ldyBpKHRoaXMuX2RhdGEpOwogICAgICAgIH0gfTsKICAgICAgICBmb3IgKHZhciB1ID0gWyJhc1RleHQiLCAiYXNCaW5hcnkiLCAiYXNOb2RlQnVmZmVyIiwgImFzVWludDhBcnJheSIsICJhc0FycmF5QnVmZmVyIl0sIGwgPSBmdW5jdGlvbigpIHsKICAgICAgICAgIHRocm93IG5ldyBFcnJvcigiVGhpcyBtZXRob2QgaGFzIGJlZW4gcmVtb3ZlZCBpbiBKU1ppcCAzLjAsIHBsZWFzZSBjaGVjayB0aGUgdXBncmFkZSBndWlkZS4iKTsKICAgICAgICB9LCBmID0gMDsgZiA8IHUubGVuZ3RoOyBmKyspCiAgICAgICAgICBuLnByb3RvdHlwZVt1W2ZdXSA9IGw7CiAgICAgICAgdC5leHBvcnRzID0gbjsKICAgICAgfSwgeyAiLi9jb21wcmVzc2VkT2JqZWN0IjogMiwgIi4vc3RyZWFtL0RhdGFXb3JrZXIiOiAyNywgIi4vc3RyZWFtL0dlbmVyaWNXb3JrZXIiOiAyOCwgIi4vc3RyZWFtL1N0cmVhbUhlbHBlciI6IDI5LCAiLi91dGY4IjogMzEgfV0sIDM2OiBbZnVuY3Rpb24oZSwgbCwgdCkgewogICAgICAgIChmdW5jdGlvbih0MikgewogICAgICAgICAgdmFyIHIsIG4sIGUyID0gdDIuTXV0YXRpb25PYnNlcnZlciB8fCB0Mi5XZWJLaXRNdXRhdGlvbk9ic2VydmVyOwogICAgICAgICAgaWYgKGUyKSB7CiAgICAgICAgICAgIHZhciBpID0gMCwgcyA9IG5ldyBlMih1KSwgYSA9IHQyLmRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCIiKTsKICAgICAgICAgICAgcy5vYnNlcnZlKGEsIHsgY2hhcmFjdGVyRGF0YTogdHJ1ZSB9KSwgciA9IGZ1bmN0aW9uKCkgewogICAgICAgICAgICAgIGEuZGF0YSA9IGkgPSArK2kgJSAyOwogICAgICAgICAgICB9OwogICAgICAgICAgfSBlbHNlIGlmICh0Mi5zZXRJbW1lZGlhdGUgfHwgdm9pZCAwID09PSB0Mi5NZXNzYWdlQ2hhbm5lbCkKICAgICAgICAgICAgciA9ICJkb2N1bWVudCIgaW4gdDIgJiYgIm9ucmVhZHlzdGF0ZWNoYW5nZSIgaW4gdDIuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgic2NyaXB0IikgPyBmdW5jdGlvbigpIHsKICAgICAgICAgICAgICB2YXIgZTMgPSB0Mi5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCJzY3JpcHQiKTsKICAgICAgICAgICAgICBlMy5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHsKICAgICAgICAgICAgICAgIHUoKSwgZTMub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbCwgZTMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlMyksIGUzID0gbnVsbDsKICAgICAgICAgICAgICB9LCB0Mi5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoZTMpOwogICAgICAgICAgICB9IDogZnVuY3Rpb24oKSB7CiAgICAgICAgICAgICAgc2V0VGltZW91dCh1LCAwKTsKICAgICAgICAgICAgfTsKICAgICAgICAgIGVsc2UgewogICAgICAgICAgICB2YXIgbyA9IG5ldyB0Mi5NZXNzYWdlQ2hhbm5lbCgpOwogICAgICAgICAgICBvLnBvcnQxLm9ubWVzc2FnZSA9IHUsIHIgPSBmdW5jdGlvbigpIHsKICAgICAgICAgICAgICBvLnBvcnQyLnBvc3RNZXNzYWdlKDApOwogICAgICAgICAgICB9OwogICAgICAgICAgfQogICAgICAgICAgdmFyIGggPSBbXTsKICAgICAgICAgIGZ1bmN0aW9uIHUoKSB7CiAgICAgICAgICAgIHZhciBlMywgdDM7CiAgICAgICAgICAgIG4gPSB0cnVlOwogICAgICAgICAgICBmb3IgKHZhciByMiA9IGgubGVuZ3RoOyByMjsgKSB7CiAgICAgICAgICAgICAgZm9yICh0MyA9IGgsIGggPSBbXSwgZTMgPSAtMTsgKytlMyA8IHIyOyApCiAgICAgICAgICAgICAgICB0M1tlM10oKTsKICAgICAgICAgICAgICByMiA9IGgubGVuZ3RoOwogICAgICAgICAgICB9CiAgICAgICAgICAgIG4gPSBmYWxzZTsKICAgICAgICAgIH0KICAgICAgICAgIGwuZXhwb3J0cyA9IGZ1bmN0aW9uKGUzKSB7CiAgICAgICAgICAgIDEgIT09IGgucHVzaChlMykgfHwgbiB8fCByKCk7CiAgICAgICAgICB9OwogICAgICAgIH0pLmNhbGwodGhpcywgInVuZGVmaW5lZCIgIT0gdHlwZW9mIGNvbW1vbmpzR2xvYmFsID8gY29tbW9uanNHbG9iYWwgOiAidW5kZWZpbmVkIiAhPSB0eXBlb2Ygc2VsZiA/IHNlbGYgOiAidW5kZWZpbmVkIiAhPSB0eXBlb2Ygd2luZG93ID8gd2luZG93IDoge30pOwogICAgICB9LCB7fV0sIDM3OiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIHZhciBpID0gZSgiaW1tZWRpYXRlIik7CiAgICAgICAgZnVuY3Rpb24gdSgpIHsKICAgICAgICB9CiAgICAgICAgdmFyIGwgPSB7fSwgcyA9IFsiUkVKRUNURUQiXSwgYSA9IFsiRlVMRklMTEVEIl0sIG4gPSBbIlBFTkRJTkciXTsKICAgICAgICBmdW5jdGlvbiBvKGUyKSB7CiAgICAgICAgICBpZiAoImZ1bmN0aW9uIiAhPSB0eXBlb2YgZTIpCiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoInJlc29sdmVyIG11c3QgYmUgYSBmdW5jdGlvbiIpOwogICAgICAgICAgdGhpcy5zdGF0ZSA9IG4sIHRoaXMucXVldWUgPSBbXSwgdGhpcy5vdXRjb21lID0gdm9pZCAwLCBlMiAhPT0gdSAmJiBkKHRoaXMsIGUyKTsKICAgICAgICB9CiAgICAgICAgZnVuY3Rpb24gaChlMiwgdDIsIHIyKSB7CiAgICAgICAgICB0aGlzLnByb21pc2UgPSBlMiwgImZ1bmN0aW9uIiA9PSB0eXBlb2YgdDIgJiYgKHRoaXMub25GdWxmaWxsZWQgPSB0MiwgdGhpcy5jYWxsRnVsZmlsbGVkID0gdGhpcy5vdGhlckNhbGxGdWxmaWxsZWQpLCAiZnVuY3Rpb24iID09IHR5cGVvZiByMiAmJiAodGhpcy5vblJlamVjdGVkID0gcjIsIHRoaXMuY2FsbFJlamVjdGVkID0gdGhpcy5vdGhlckNhbGxSZWplY3RlZCk7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIGYodDIsIHIyLCBuMikgewogICAgICAgICAgaShmdW5jdGlvbigpIHsKICAgICAgICAgICAgdmFyIGUyOwogICAgICAgICAgICB0cnkgewogICAgICAgICAgICAgIGUyID0gcjIobjIpOwogICAgICAgICAgICB9IGNhdGNoIChlMykgewogICAgICAgICAgICAgIHJldHVybiBsLnJlamVjdCh0MiwgZTMpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGUyID09PSB0MiA/IGwucmVqZWN0KHQyLCBuZXcgVHlwZUVycm9yKCJDYW5ub3QgcmVzb2x2ZSBwcm9taXNlIHdpdGggaXRzZWxmIikpIDogbC5yZXNvbHZlKHQyLCBlMik7CiAgICAgICAgICB9KTsKICAgICAgICB9CiAgICAgICAgZnVuY3Rpb24gYyhlMikgewogICAgICAgICAgdmFyIHQyID0gZTIgJiYgZTIudGhlbjsKICAgICAgICAgIGlmIChlMiAmJiAoIm9iamVjdCIgPT0gdHlwZW9mIGUyIHx8ICJmdW5jdGlvbiIgPT0gdHlwZW9mIGUyKSAmJiAiZnVuY3Rpb24iID09IHR5cGVvZiB0MikKICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkgewogICAgICAgICAgICAgIHQyLmFwcGx5KGUyLCBhcmd1bWVudHMpOwogICAgICAgICAgICB9OwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBkKHQyLCBlMikgewogICAgICAgICAgdmFyIHIyID0gZmFsc2U7CiAgICAgICAgICBmdW5jdGlvbiBuMihlMykgewogICAgICAgICAgICByMiB8fCAocjIgPSB0cnVlLCBsLnJlamVjdCh0MiwgZTMpKTsKICAgICAgICAgIH0KICAgICAgICAgIGZ1bmN0aW9uIGkyKGUzKSB7CiAgICAgICAgICAgIHIyIHx8IChyMiA9IHRydWUsIGwucmVzb2x2ZSh0MiwgZTMpKTsKICAgICAgICAgIH0KICAgICAgICAgIHZhciBzMiA9IHAoZnVuY3Rpb24oKSB7CiAgICAgICAgICAgIGUyKGkyLCBuMik7CiAgICAgICAgICB9KTsKICAgICAgICAgICJlcnJvciIgPT09IHMyLnN0YXR1cyAmJiBuMihzMi52YWx1ZSk7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIHAoZTIsIHQyKSB7CiAgICAgICAgICB2YXIgcjIgPSB7fTsKICAgICAgICAgIHRyeSB7CiAgICAgICAgICAgIHIyLnZhbHVlID0gZTIodDIpLCByMi5zdGF0dXMgPSAic3VjY2VzcyI7CiAgICAgICAgICB9IGNhdGNoIChlMykgewogICAgICAgICAgICByMi5zdGF0dXMgPSAiZXJyb3IiLCByMi52YWx1ZSA9IGUzOwogICAgICAgICAgfQogICAgICAgICAgcmV0dXJuIHIyOwogICAgICAgIH0KICAgICAgICAodC5leHBvcnRzID0gbykucHJvdG90eXBlLmZpbmFsbHkgPSBmdW5jdGlvbih0MikgewogICAgICAgICAgaWYgKCJmdW5jdGlvbiIgIT0gdHlwZW9mIHQyKQogICAgICAgICAgICByZXR1cm4gdGhpczsKICAgICAgICAgIHZhciByMiA9IHRoaXMuY29uc3RydWN0b3I7CiAgICAgICAgICByZXR1cm4gdGhpcy50aGVuKGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICAgIHJldHVybiByMi5yZXNvbHZlKHQyKCkpLnRoZW4oZnVuY3Rpb24oKSB7CiAgICAgICAgICAgICAgcmV0dXJuIGUyOwogICAgICAgICAgICB9KTsKICAgICAgICAgIH0sIGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICAgIHJldHVybiByMi5yZXNvbHZlKHQyKCkpLnRoZW4oZnVuY3Rpb24oKSB7CiAgICAgICAgICAgICAgdGhyb3cgZTI7CiAgICAgICAgICAgIH0pOwogICAgICAgICAgfSk7CiAgICAgICAgfSwgby5wcm90b3R5cGUuY2F0Y2ggPSBmdW5jdGlvbihlMikgewogICAgICAgICAgcmV0dXJuIHRoaXMudGhlbihudWxsLCBlMik7CiAgICAgICAgfSwgby5wcm90b3R5cGUudGhlbiA9IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgaWYgKCJmdW5jdGlvbiIgIT0gdHlwZW9mIGUyICYmIHRoaXMuc3RhdGUgPT09IGEgfHwgImZ1bmN0aW9uIiAhPSB0eXBlb2YgdDIgJiYgdGhpcy5zdGF0ZSA9PT0gcykKICAgICAgICAgICAgcmV0dXJuIHRoaXM7CiAgICAgICAgICB2YXIgcjIgPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih1KTsKICAgICAgICAgIHRoaXMuc3RhdGUgIT09IG4gPyBmKHIyLCB0aGlzLnN0YXRlID09PSBhID8gZTIgOiB0MiwgdGhpcy5vdXRjb21lKSA6IHRoaXMucXVldWUucHVzaChuZXcgaChyMiwgZTIsIHQyKSk7CiAgICAgICAgICByZXR1cm4gcjI7CiAgICAgICAgfSwgaC5wcm90b3R5cGUuY2FsbEZ1bGZpbGxlZCA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICBsLnJlc29sdmUodGhpcy5wcm9taXNlLCBlMik7CiAgICAgICAgfSwgaC5wcm90b3R5cGUub3RoZXJDYWxsRnVsZmlsbGVkID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIGYodGhpcy5wcm9taXNlLCB0aGlzLm9uRnVsZmlsbGVkLCBlMik7CiAgICAgICAgfSwgaC5wcm90b3R5cGUuY2FsbFJlamVjdGVkID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIGwucmVqZWN0KHRoaXMucHJvbWlzZSwgZTIpOwogICAgICAgIH0sIGgucHJvdG90eXBlLm90aGVyQ2FsbFJlamVjdGVkID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIGYodGhpcy5wcm9taXNlLCB0aGlzLm9uUmVqZWN0ZWQsIGUyKTsKICAgICAgICB9LCBsLnJlc29sdmUgPSBmdW5jdGlvbihlMiwgdDIpIHsKICAgICAgICAgIHZhciByMiA9IHAoYywgdDIpOwogICAgICAgICAgaWYgKCJlcnJvciIgPT09IHIyLnN0YXR1cykKICAgICAgICAgICAgcmV0dXJuIGwucmVqZWN0KGUyLCByMi52YWx1ZSk7CiAgICAgICAgICB2YXIgbjIgPSByMi52YWx1ZTsKICAgICAgICAgIGlmIChuMikKICAgICAgICAgICAgZChlMiwgbjIpOwogICAgICAgICAgZWxzZSB7CiAgICAgICAgICAgIGUyLnN0YXRlID0gYSwgZTIub3V0Y29tZSA9IHQyOwogICAgICAgICAgICBmb3IgKHZhciBpMiA9IC0xLCBzMiA9IGUyLnF1ZXVlLmxlbmd0aDsgKytpMiA8IHMyOyApCiAgICAgICAgICAgICAgZTIucXVldWVbaTJdLmNhbGxGdWxmaWxsZWQodDIpOwogICAgICAgICAgfQogICAgICAgICAgcmV0dXJuIGUyOwogICAgICAgIH0sIGwucmVqZWN0ID0gZnVuY3Rpb24oZTIsIHQyKSB7CiAgICAgICAgICBlMi5zdGF0ZSA9IHMsIGUyLm91dGNvbWUgPSB0MjsKICAgICAgICAgIGZvciAodmFyIHIyID0gLTEsIG4yID0gZTIucXVldWUubGVuZ3RoOyArK3IyIDwgbjI7ICkKICAgICAgICAgICAgZTIucXVldWVbcjJdLmNhbGxSZWplY3RlZCh0Mik7CiAgICAgICAgICByZXR1cm4gZTI7CiAgICAgICAgfSwgby5yZXNvbHZlID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIGlmIChlMiBpbnN0YW5jZW9mIHRoaXMpCiAgICAgICAgICAgIHJldHVybiBlMjsKICAgICAgICAgIHJldHVybiBsLnJlc29sdmUobmV3IHRoaXModSksIGUyKTsKICAgICAgICB9LCBvLnJlamVjdCA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICB2YXIgdDIgPSBuZXcgdGhpcyh1KTsKICAgICAgICAgIHJldHVybiBsLnJlamVjdCh0MiwgZTIpOwogICAgICAgIH0sIG8uYWxsID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHZhciByMiA9IHRoaXM7CiAgICAgICAgICBpZiAoIltvYmplY3QgQXJyYXldIiAhPT0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUyKSkKICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVqZWN0KG5ldyBUeXBlRXJyb3IoIm11c3QgYmUgYW4gYXJyYXkiKSk7CiAgICAgICAgICB2YXIgbjIgPSBlMi5sZW5ndGgsIGkyID0gZmFsc2U7CiAgICAgICAgICBpZiAoIW4yKQogICAgICAgICAgICByZXR1cm4gdGhpcy5yZXNvbHZlKFtdKTsKICAgICAgICAgIHZhciBzMiA9IG5ldyBBcnJheShuMiksIGEyID0gMCwgdDIgPSAtMSwgbzIgPSBuZXcgdGhpcyh1KTsKICAgICAgICAgIGZvciAoOyArK3QyIDwgbjI7ICkKICAgICAgICAgICAgaDIoZTJbdDJdLCB0Mik7CiAgICAgICAgICByZXR1cm4gbzI7CiAgICAgICAgICBmdW5jdGlvbiBoMihlMywgdDMpIHsKICAgICAgICAgICAgcjIucmVzb2x2ZShlMykudGhlbihmdW5jdGlvbihlNCkgewogICAgICAgICAgICAgIHMyW3QzXSA9IGU0LCArK2EyICE9PSBuMiB8fCBpMiB8fCAoaTIgPSB0cnVlLCBsLnJlc29sdmUobzIsIHMyKSk7CiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGU0KSB7CiAgICAgICAgICAgICAgaTIgfHwgKGkyID0gdHJ1ZSwgbC5yZWplY3QobzIsIGU0KSk7CiAgICAgICAgICAgIH0pOwogICAgICAgICAgfQogICAgICAgIH0sIG8ucmFjZSA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICB2YXIgdDIgPSB0aGlzOwogICAgICAgICAgaWYgKCJbb2JqZWN0IEFycmF5XSIgIT09IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlMikpCiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlamVjdChuZXcgVHlwZUVycm9yKCJtdXN0IGJlIGFuIGFycmF5IikpOwogICAgICAgICAgdmFyIHIyID0gZTIubGVuZ3RoLCBuMiA9IGZhbHNlOwogICAgICAgICAgaWYgKCFyMikKICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVzb2x2ZShbXSk7CiAgICAgICAgICB2YXIgaTIgPSAtMSwgczIgPSBuZXcgdGhpcyh1KTsKICAgICAgICAgIGZvciAoOyArK2kyIDwgcjI7ICkKICAgICAgICAgICAgYTIgPSBlMltpMl0sIHQyLnJlc29sdmUoYTIpLnRoZW4oZnVuY3Rpb24oZTMpIHsKICAgICAgICAgICAgICBuMiB8fCAobjIgPSB0cnVlLCBsLnJlc29sdmUoczIsIGUzKSk7CiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGUzKSB7CiAgICAgICAgICAgICAgbjIgfHwgKG4yID0gdHJ1ZSwgbC5yZWplY3QoczIsIGUzKSk7CiAgICAgICAgICAgIH0pOwogICAgICAgICAgdmFyIGEyOwogICAgICAgICAgcmV0dXJuIHMyOwogICAgICAgIH07CiAgICAgIH0sIHsgaW1tZWRpYXRlOiAzNiB9XSwgMzg6IFtmdW5jdGlvbihlLCB0LCByKSB7CiAgICAgICAgdmFyIG4gPSB7fTsKICAgICAgICAoMCwgZSgiLi9saWIvdXRpbHMvY29tbW9uIikuYXNzaWduKShuLCBlKCIuL2xpYi9kZWZsYXRlIiksIGUoIi4vbGliL2luZmxhdGUiKSwgZSgiLi9saWIvemxpYi9jb25zdGFudHMiKSksIHQuZXhwb3J0cyA9IG47CiAgICAgIH0sIHsgIi4vbGliL2RlZmxhdGUiOiAzOSwgIi4vbGliL2luZmxhdGUiOiA0MCwgIi4vbGliL3V0aWxzL2NvbW1vbiI6IDQxLCAiLi9saWIvemxpYi9jb25zdGFudHMiOiA0NCB9XSwgMzk6IFtmdW5jdGlvbihlLCB0LCByKSB7CiAgICAgICAgdmFyIGEgPSBlKCIuL3psaWIvZGVmbGF0ZSIpLCBvID0gZSgiLi91dGlscy9jb21tb24iKSwgaCA9IGUoIi4vdXRpbHMvc3RyaW5ncyIpLCBpID0gZSgiLi96bGliL21lc3NhZ2VzIiksIHMgPSBlKCIuL3psaWIvenN0cmVhbSIpLCB1ID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZywgbCA9IDAsIGYgPSAtMSwgYyA9IDAsIGQgPSA4OwogICAgICAgIGZ1bmN0aW9uIHAoZTIpIHsKICAgICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBwKSkKICAgICAgICAgICAgcmV0dXJuIG5ldyBwKGUyKTsKICAgICAgICAgIHRoaXMub3B0aW9ucyA9IG8uYXNzaWduKHsgbGV2ZWw6IGYsIG1ldGhvZDogZCwgY2h1bmtTaXplOiAxNjM4NCwgd2luZG93Qml0czogMTUsIG1lbUxldmVsOiA4LCBzdHJhdGVneTogYywgdG86ICIiIH0sIGUyIHx8IHt9KTsKICAgICAgICAgIHZhciB0MiA9IHRoaXMub3B0aW9uczsKICAgICAgICAgIHQyLnJhdyAmJiAwIDwgdDIud2luZG93Qml0cyA/IHQyLndpbmRvd0JpdHMgPSAtdDIud2luZG93Qml0cyA6IHQyLmd6aXAgJiYgMCA8IHQyLndpbmRvd0JpdHMgJiYgdDIud2luZG93Qml0cyA8IDE2ICYmICh0Mi53aW5kb3dCaXRzICs9IDE2KSwgdGhpcy5lcnIgPSAwLCB0aGlzLm1zZyA9ICIiLCB0aGlzLmVuZGVkID0gZmFsc2UsIHRoaXMuY2h1bmtzID0gW10sIHRoaXMuc3RybSA9IG5ldyBzKCksIHRoaXMuc3RybS5hdmFpbF9vdXQgPSAwOwogICAgICAgICAgdmFyIHIyID0gYS5kZWZsYXRlSW5pdDIodGhpcy5zdHJtLCB0Mi5sZXZlbCwgdDIubWV0aG9kLCB0Mi53aW5kb3dCaXRzLCB0Mi5tZW1MZXZlbCwgdDIuc3RyYXRlZ3kpOwogICAgICAgICAgaWYgKHIyICE9PSBsKQogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoaVtyMl0pOwogICAgICAgICAgaWYgKHQyLmhlYWRlciAmJiBhLmRlZmxhdGVTZXRIZWFkZXIodGhpcy5zdHJtLCB0Mi5oZWFkZXIpLCB0Mi5kaWN0aW9uYXJ5KSB7CiAgICAgICAgICAgIHZhciBuMjsKICAgICAgICAgICAgaWYgKG4yID0gInN0cmluZyIgPT0gdHlwZW9mIHQyLmRpY3Rpb25hcnkgPyBoLnN0cmluZzJidWYodDIuZGljdGlvbmFyeSkgOiAiW29iamVjdCBBcnJheUJ1ZmZlcl0iID09PSB1LmNhbGwodDIuZGljdGlvbmFyeSkgPyBuZXcgVWludDhBcnJheSh0Mi5kaWN0aW9uYXJ5KSA6IHQyLmRpY3Rpb25hcnksIChyMiA9IGEuZGVmbGF0ZVNldERpY3Rpb25hcnkodGhpcy5zdHJtLCBuMikpICE9PSBsKQogICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihpW3IyXSk7CiAgICAgICAgICAgIHRoaXMuX2RpY3Rfc2V0ID0gdHJ1ZTsKICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgZnVuY3Rpb24gbihlMiwgdDIpIHsKICAgICAgICAgIHZhciByMiA9IG5ldyBwKHQyKTsKICAgICAgICAgIGlmIChyMi5wdXNoKGUyLCB0cnVlKSwgcjIuZXJyKQogICAgICAgICAgICB0aHJvdyByMi5tc2cgfHwgaVtyMi5lcnJdOwogICAgICAgICAgcmV0dXJuIHIyLnJlc3VsdDsKICAgICAgICB9CiAgICAgICAgcC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgdmFyIHIyLCBuMiwgaTIgPSB0aGlzLnN0cm0sIHMyID0gdGhpcy5vcHRpb25zLmNodW5rU2l6ZTsKICAgICAgICAgIGlmICh0aGlzLmVuZGVkKQogICAgICAgICAgICByZXR1cm4gZmFsc2U7CiAgICAgICAgICBuMiA9IHQyID09PSB+fnQyID8gdDIgOiB0cnVlID09PSB0MiA/IDQgOiAwLCAic3RyaW5nIiA9PSB0eXBlb2YgZTIgPyBpMi5pbnB1dCA9IGguc3RyaW5nMmJ1ZihlMikgOiAiW29iamVjdCBBcnJheUJ1ZmZlcl0iID09PSB1LmNhbGwoZTIpID8gaTIuaW5wdXQgPSBuZXcgVWludDhBcnJheShlMikgOiBpMi5pbnB1dCA9IGUyLCBpMi5uZXh0X2luID0gMCwgaTIuYXZhaWxfaW4gPSBpMi5pbnB1dC5sZW5ndGg7CiAgICAgICAgICBkbyB7CiAgICAgICAgICAgIGlmICgwID09PSBpMi5hdmFpbF9vdXQgJiYgKGkyLm91dHB1dCA9IG5ldyBvLkJ1ZjgoczIpLCBpMi5uZXh0X291dCA9IDAsIGkyLmF2YWlsX291dCA9IHMyKSwgMSAhPT0gKHIyID0gYS5kZWZsYXRlKGkyLCBuMikpICYmIHIyICE9PSBsKQogICAgICAgICAgICAgIHJldHVybiB0aGlzLm9uRW5kKHIyKSwgISh0aGlzLmVuZGVkID0gdHJ1ZSk7CiAgICAgICAgICAgIDAgIT09IGkyLmF2YWlsX291dCAmJiAoMCAhPT0gaTIuYXZhaWxfaW4gfHwgNCAhPT0gbjIgJiYgMiAhPT0gbjIpIHx8ICgic3RyaW5nIiA9PT0gdGhpcy5vcHRpb25zLnRvID8gdGhpcy5vbkRhdGEoaC5idWYyYmluc3RyaW5nKG8uc2hyaW5rQnVmKGkyLm91dHB1dCwgaTIubmV4dF9vdXQpKSkgOiB0aGlzLm9uRGF0YShvLnNocmlua0J1ZihpMi5vdXRwdXQsIGkyLm5leHRfb3V0KSkpOwogICAgICAgICAgfSB3aGlsZSAoKDAgPCBpMi5hdmFpbF9pbiB8fCAwID09PSBpMi5hdmFpbF9vdXQpICYmIDEgIT09IHIyKTsKICAgICAgICAgIHJldHVybiA0ID09PSBuMiA/IChyMiA9IGEuZGVmbGF0ZUVuZCh0aGlzLnN0cm0pLCB0aGlzLm9uRW5kKHIyKSwgdGhpcy5lbmRlZCA9IHRydWUsIHIyID09PSBsKSA6IDIgIT09IG4yIHx8ICh0aGlzLm9uRW5kKGwpLCAhKGkyLmF2YWlsX291dCA9IDApKTsKICAgICAgICB9LCBwLnByb3RvdHlwZS5vbkRhdGEgPSBmdW5jdGlvbihlMikgewogICAgICAgICAgdGhpcy5jaHVua3MucHVzaChlMik7CiAgICAgICAgfSwgcC5wcm90b3R5cGUub25FbmQgPSBmdW5jdGlvbihlMikgewogICAgICAgICAgZTIgPT09IGwgJiYgKCJzdHJpbmciID09PSB0aGlzLm9wdGlvbnMudG8gPyB0aGlzLnJlc3VsdCA9IHRoaXMuY2h1bmtzLmpvaW4oIiIpIDogdGhpcy5yZXN1bHQgPSBvLmZsYXR0ZW5DaHVua3ModGhpcy5jaHVua3MpKSwgdGhpcy5jaHVua3MgPSBbXSwgdGhpcy5lcnIgPSBlMiwgdGhpcy5tc2cgPSB0aGlzLnN0cm0ubXNnOwogICAgICAgIH0sIHIuRGVmbGF0ZSA9IHAsIHIuZGVmbGF0ZSA9IG4sIHIuZGVmbGF0ZVJhdyA9IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgcmV0dXJuICh0MiA9IHQyIHx8IHt9KS5yYXcgPSB0cnVlLCBuKGUyLCB0Mik7CiAgICAgICAgfSwgci5nemlwID0gZnVuY3Rpb24oZTIsIHQyKSB7CiAgICAgICAgICByZXR1cm4gKHQyID0gdDIgfHwge30pLmd6aXAgPSB0cnVlLCBuKGUyLCB0Mik7CiAgICAgICAgfTsKICAgICAgfSwgeyAiLi91dGlscy9jb21tb24iOiA0MSwgIi4vdXRpbHMvc3RyaW5ncyI6IDQyLCAiLi96bGliL2RlZmxhdGUiOiA0NiwgIi4vemxpYi9tZXNzYWdlcyI6IDUxLCAiLi96bGliL3pzdHJlYW0iOiA1MyB9XSwgNDA6IFtmdW5jdGlvbihlLCB0LCByKSB7CiAgICAgICAgdmFyIGMgPSBlKCIuL3psaWIvaW5mbGF0ZSIpLCBkID0gZSgiLi91dGlscy9jb21tb24iKSwgcCA9IGUoIi4vdXRpbHMvc3RyaW5ncyIpLCBtID0gZSgiLi96bGliL2NvbnN0YW50cyIpLCBuID0gZSgiLi96bGliL21lc3NhZ2VzIiksIGkgPSBlKCIuL3psaWIvenN0cmVhbSIpLCBzID0gZSgiLi96bGliL2d6aGVhZGVyIiksIF8gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nOwogICAgICAgIGZ1bmN0aW9uIGEoZTIpIHsKICAgICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBhKSkKICAgICAgICAgICAgcmV0dXJuIG5ldyBhKGUyKTsKICAgICAgICAgIHRoaXMub3B0aW9ucyA9IGQuYXNzaWduKHsgY2h1bmtTaXplOiAxNjM4NCwgd2luZG93Qml0czogMCwgdG86ICIiIH0sIGUyIHx8IHt9KTsKICAgICAgICAgIHZhciB0MiA9IHRoaXMub3B0aW9uczsKICAgICAgICAgIHQyLnJhdyAmJiAwIDw9IHQyLndpbmRvd0JpdHMgJiYgdDIud2luZG93Qml0cyA8IDE2ICYmICh0Mi53aW5kb3dCaXRzID0gLXQyLndpbmRvd0JpdHMsIDAgPT09IHQyLndpbmRvd0JpdHMgJiYgKHQyLndpbmRvd0JpdHMgPSAtMTUpKSwgISgwIDw9IHQyLndpbmRvd0JpdHMgJiYgdDIud2luZG93Qml0cyA8IDE2KSB8fCBlMiAmJiBlMi53aW5kb3dCaXRzIHx8ICh0Mi53aW5kb3dCaXRzICs9IDMyKSwgMTUgPCB0Mi53aW5kb3dCaXRzICYmIHQyLndpbmRvd0JpdHMgPCA0OCAmJiAwID09ICgxNSAmIHQyLndpbmRvd0JpdHMpICYmICh0Mi53aW5kb3dCaXRzIHw9IDE1KSwgdGhpcy5lcnIgPSAwLCB0aGlzLm1zZyA9ICIiLCB0aGlzLmVuZGVkID0gZmFsc2UsIHRoaXMuY2h1bmtzID0gW10sIHRoaXMuc3RybSA9IG5ldyBpKCksIHRoaXMuc3RybS5hdmFpbF9vdXQgPSAwOwogICAgICAgICAgdmFyIHIyID0gYy5pbmZsYXRlSW5pdDIodGhpcy5zdHJtLCB0Mi53aW5kb3dCaXRzKTsKICAgICAgICAgIGlmIChyMiAhPT0gbS5aX09LKQogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobltyMl0pOwogICAgICAgICAgdGhpcy5oZWFkZXIgPSBuZXcgcygpLCBjLmluZmxhdGVHZXRIZWFkZXIodGhpcy5zdHJtLCB0aGlzLmhlYWRlcik7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIG8oZTIsIHQyKSB7CiAgICAgICAgICB2YXIgcjIgPSBuZXcgYSh0Mik7CiAgICAgICAgICBpZiAocjIucHVzaChlMiwgdHJ1ZSksIHIyLmVycikKICAgICAgICAgICAgdGhyb3cgcjIubXNnIHx8IG5bcjIuZXJyXTsKICAgICAgICAgIHJldHVybiByMi5yZXN1bHQ7CiAgICAgICAgfQogICAgICAgIGEucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbihlMiwgdDIpIHsKICAgICAgICAgIHZhciByMiwgbjIsIGkyLCBzMiwgYTIsIG8yLCBoID0gdGhpcy5zdHJtLCB1ID0gdGhpcy5vcHRpb25zLmNodW5rU2l6ZSwgbCA9IHRoaXMub3B0aW9ucy5kaWN0aW9uYXJ5LCBmID0gZmFsc2U7CiAgICAgICAgICBpZiAodGhpcy5lbmRlZCkKICAgICAgICAgICAgcmV0dXJuIGZhbHNlOwogICAgICAgICAgbjIgPSB0MiA9PT0gfn50MiA/IHQyIDogdHJ1ZSA9PT0gdDIgPyBtLlpfRklOSVNIIDogbS5aX05PX0ZMVVNILCAic3RyaW5nIiA9PSB0eXBlb2YgZTIgPyBoLmlucHV0ID0gcC5iaW5zdHJpbmcyYnVmKGUyKSA6ICJbb2JqZWN0IEFycmF5QnVmZmVyXSIgPT09IF8uY2FsbChlMikgPyBoLmlucHV0ID0gbmV3IFVpbnQ4QXJyYXkoZTIpIDogaC5pbnB1dCA9IGUyLCBoLm5leHRfaW4gPSAwLCBoLmF2YWlsX2luID0gaC5pbnB1dC5sZW5ndGg7CiAgICAgICAgICBkbyB7CiAgICAgICAgICAgIGlmICgwID09PSBoLmF2YWlsX291dCAmJiAoaC5vdXRwdXQgPSBuZXcgZC5CdWY4KHUpLCBoLm5leHRfb3V0ID0gMCwgaC5hdmFpbF9vdXQgPSB1KSwgKHIyID0gYy5pbmZsYXRlKGgsIG0uWl9OT19GTFVTSCkpID09PSBtLlpfTkVFRF9ESUNUICYmIGwgJiYgKG8yID0gInN0cmluZyIgPT0gdHlwZW9mIGwgPyBwLnN0cmluZzJidWYobCkgOiAiW29iamVjdCBBcnJheUJ1ZmZlcl0iID09PSBfLmNhbGwobCkgPyBuZXcgVWludDhBcnJheShsKSA6IGwsIHIyID0gYy5pbmZsYXRlU2V0RGljdGlvbmFyeSh0aGlzLnN0cm0sIG8yKSksIHIyID09PSBtLlpfQlVGX0VSUk9SICYmIHRydWUgPT09IGYgJiYgKHIyID0gbS5aX09LLCBmID0gZmFsc2UpLCByMiAhPT0gbS5aX1NUUkVBTV9FTkQgJiYgcjIgIT09IG0uWl9PSykKICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vbkVuZChyMiksICEodGhpcy5lbmRlZCA9IHRydWUpOwogICAgICAgICAgICBoLm5leHRfb3V0ICYmICgwICE9PSBoLmF2YWlsX291dCAmJiByMiAhPT0gbS5aX1NUUkVBTV9FTkQgJiYgKDAgIT09IGguYXZhaWxfaW4gfHwgbjIgIT09IG0uWl9GSU5JU0ggJiYgbjIgIT09IG0uWl9TWU5DX0ZMVVNIKSB8fCAoInN0cmluZyIgPT09IHRoaXMub3B0aW9ucy50byA/IChpMiA9IHAudXRmOGJvcmRlcihoLm91dHB1dCwgaC5uZXh0X291dCksIHMyID0gaC5uZXh0X291dCAtIGkyLCBhMiA9IHAuYnVmMnN0cmluZyhoLm91dHB1dCwgaTIpLCBoLm5leHRfb3V0ID0gczIsIGguYXZhaWxfb3V0ID0gdSAtIHMyLCBzMiAmJiBkLmFycmF5U2V0KGgub3V0cHV0LCBoLm91dHB1dCwgaTIsIHMyLCAwKSwgdGhpcy5vbkRhdGEoYTIpKSA6IHRoaXMub25EYXRhKGQuc2hyaW5rQnVmKGgub3V0cHV0LCBoLm5leHRfb3V0KSkpKSwgMCA9PT0gaC5hdmFpbF9pbiAmJiAwID09PSBoLmF2YWlsX291dCAmJiAoZiA9IHRydWUpOwogICAgICAgICAgfSB3aGlsZSAoKDAgPCBoLmF2YWlsX2luIHx8IDAgPT09IGguYXZhaWxfb3V0KSAmJiByMiAhPT0gbS5aX1NUUkVBTV9FTkQpOwogICAgICAgICAgcmV0dXJuIHIyID09PSBtLlpfU1RSRUFNX0VORCAmJiAobjIgPSBtLlpfRklOSVNIKSwgbjIgPT09IG0uWl9GSU5JU0ggPyAocjIgPSBjLmluZmxhdGVFbmQodGhpcy5zdHJtKSwgdGhpcy5vbkVuZChyMiksIHRoaXMuZW5kZWQgPSB0cnVlLCByMiA9PT0gbS5aX09LKSA6IG4yICE9PSBtLlpfU1lOQ19GTFVTSCB8fCAodGhpcy5vbkVuZChtLlpfT0spLCAhKGguYXZhaWxfb3V0ID0gMCkpOwogICAgICAgIH0sIGEucHJvdG90eXBlLm9uRGF0YSA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICB0aGlzLmNodW5rcy5wdXNoKGUyKTsKICAgICAgICB9LCBhLnByb3RvdHlwZS5vbkVuZCA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICBlMiA9PT0gbS5aX09LICYmICgic3RyaW5nIiA9PT0gdGhpcy5vcHRpb25zLnRvID8gdGhpcy5yZXN1bHQgPSB0aGlzLmNodW5rcy5qb2luKCIiKSA6IHRoaXMucmVzdWx0ID0gZC5mbGF0dGVuQ2h1bmtzKHRoaXMuY2h1bmtzKSksIHRoaXMuY2h1bmtzID0gW10sIHRoaXMuZXJyID0gZTIsIHRoaXMubXNnID0gdGhpcy5zdHJtLm1zZzsKICAgICAgICB9LCByLkluZmxhdGUgPSBhLCByLmluZmxhdGUgPSBvLCByLmluZmxhdGVSYXcgPSBmdW5jdGlvbihlMiwgdDIpIHsKICAgICAgICAgIHJldHVybiAodDIgPSB0MiB8fCB7fSkucmF3ID0gdHJ1ZSwgbyhlMiwgdDIpOwogICAgICAgIH0sIHIudW5nemlwID0gbzsKICAgICAgfSwgeyAiLi91dGlscy9jb21tb24iOiA0MSwgIi4vdXRpbHMvc3RyaW5ncyI6IDQyLCAiLi96bGliL2NvbnN0YW50cyI6IDQ0LCAiLi96bGliL2d6aGVhZGVyIjogNDcsICIuL3psaWIvaW5mbGF0ZSI6IDQ5LCAiLi96bGliL21lc3NhZ2VzIjogNTEsICIuL3psaWIvenN0cmVhbSI6IDUzIH1dLCA0MTogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICB2YXIgbiA9ICJ1bmRlZmluZWQiICE9IHR5cGVvZiBVaW50OEFycmF5ICYmICJ1bmRlZmluZWQiICE9IHR5cGVvZiBVaW50MTZBcnJheSAmJiAidW5kZWZpbmVkIiAhPSB0eXBlb2YgSW50MzJBcnJheTsKICAgICAgICByLmFzc2lnbiA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICBmb3IgKHZhciB0MiA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7IHQyLmxlbmd0aDsgKSB7CiAgICAgICAgICAgIHZhciByMiA9IHQyLnNoaWZ0KCk7CiAgICAgICAgICAgIGlmIChyMikgewogICAgICAgICAgICAgIGlmICgib2JqZWN0IiAhPSB0eXBlb2YgcjIpCiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHIyICsgIm11c3QgYmUgbm9uLW9iamVjdCIpOwogICAgICAgICAgICAgIGZvciAodmFyIG4yIGluIHIyKQogICAgICAgICAgICAgICAgcjIuaGFzT3duUHJvcGVydHkobjIpICYmIChlMltuMl0gPSByMltuMl0pOwogICAgICAgICAgICB9CiAgICAgICAgICB9CiAgICAgICAgICByZXR1cm4gZTI7CiAgICAgICAgfSwgci5zaHJpbmtCdWYgPSBmdW5jdGlvbihlMiwgdDIpIHsKICAgICAgICAgIHJldHVybiBlMi5sZW5ndGggPT09IHQyID8gZTIgOiBlMi5zdWJhcnJheSA/IGUyLnN1YmFycmF5KDAsIHQyKSA6IChlMi5sZW5ndGggPSB0MiwgZTIpOwogICAgICAgIH07CiAgICAgICAgdmFyIGkgPSB7IGFycmF5U2V0OiBmdW5jdGlvbihlMiwgdDIsIHIyLCBuMiwgaTIpIHsKICAgICAgICAgIGlmICh0Mi5zdWJhcnJheSAmJiBlMi5zdWJhcnJheSkKICAgICAgICAgICAgZTIuc2V0KHQyLnN1YmFycmF5KHIyLCByMiArIG4yKSwgaTIpOwogICAgICAgICAgZWxzZQogICAgICAgICAgICBmb3IgKHZhciBzMiA9IDA7IHMyIDwgbjI7IHMyKyspCiAgICAgICAgICAgICAgZTJbaTIgKyBzMl0gPSB0MltyMiArIHMyXTsKICAgICAgICB9LCBmbGF0dGVuQ2h1bmtzOiBmdW5jdGlvbihlMikgewogICAgICAgICAgdmFyIHQyLCByMiwgbjIsIGkyLCBzMiwgYTsKICAgICAgICAgIGZvciAodDIgPSBuMiA9IDAsIHIyID0gZTIubGVuZ3RoOyB0MiA8IHIyOyB0MisrKQogICAgICAgICAgICBuMiArPSBlMlt0Ml0ubGVuZ3RoOwogICAgICAgICAgZm9yIChhID0gbmV3IFVpbnQ4QXJyYXkobjIpLCB0MiA9IGkyID0gMCwgcjIgPSBlMi5sZW5ndGg7IHQyIDwgcjI7IHQyKyspCiAgICAgICAgICAgIHMyID0gZTJbdDJdLCBhLnNldChzMiwgaTIpLCBpMiArPSBzMi5sZW5ndGg7CiAgICAgICAgICByZXR1cm4gYTsKICAgICAgICB9IH0sIHMgPSB7IGFycmF5U2V0OiBmdW5jdGlvbihlMiwgdDIsIHIyLCBuMiwgaTIpIHsKICAgICAgICAgIGZvciAodmFyIHMyID0gMDsgczIgPCBuMjsgczIrKykKICAgICAgICAgICAgZTJbaTIgKyBzMl0gPSB0MltyMiArIHMyXTsKICAgICAgICB9LCBmbGF0dGVuQ2h1bmtzOiBmdW5jdGlvbihlMikgewogICAgICAgICAgcmV0dXJuIFtdLmNvbmNhdC5hcHBseShbXSwgZTIpOwogICAgICAgIH0gfTsKICAgICAgICByLnNldFR5cGVkID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIGUyID8gKHIuQnVmOCA9IFVpbnQ4QXJyYXksIHIuQnVmMTYgPSBVaW50MTZBcnJheSwgci5CdWYzMiA9IEludDMyQXJyYXksIHIuYXNzaWduKHIsIGkpKSA6IChyLkJ1ZjggPSBBcnJheSwgci5CdWYxNiA9IEFycmF5LCByLkJ1ZjMyID0gQXJyYXksIHIuYXNzaWduKHIsIHMpKTsKICAgICAgICB9LCByLnNldFR5cGVkKG4pOwogICAgICB9LCB7fV0sIDQyOiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIHZhciBoID0gZSgiLi9jb21tb24iKSwgaSA9IHRydWUsIHMgPSB0cnVlOwogICAgICAgIHRyeSB7CiAgICAgICAgICBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIFswXSk7CiAgICAgICAgfSBjYXRjaCAoZTIpIHsKICAgICAgICAgIGkgPSBmYWxzZTsKICAgICAgICB9CiAgICAgICAgdHJ5IHsKICAgICAgICAgIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgbmV3IFVpbnQ4QXJyYXkoMSkpOwogICAgICAgIH0gY2F0Y2ggKGUyKSB7CiAgICAgICAgICBzID0gZmFsc2U7CiAgICAgICAgfQogICAgICAgIGZvciAodmFyIHUgPSBuZXcgaC5CdWY4KDI1NiksIG4gPSAwOyBuIDwgMjU2OyBuKyspCiAgICAgICAgICB1W25dID0gMjUyIDw9IG4gPyA2IDogMjQ4IDw9IG4gPyA1IDogMjQwIDw9IG4gPyA0IDogMjI0IDw9IG4gPyAzIDogMTkyIDw9IG4gPyAyIDogMTsKICAgICAgICBmdW5jdGlvbiBsKGUyLCB0MikgewogICAgICAgICAgaWYgKHQyIDwgNjU1MzcgJiYgKGUyLnN1YmFycmF5ICYmIHMgfHwgIWUyLnN1YmFycmF5ICYmIGkpKQogICAgICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBoLnNocmlua0J1ZihlMiwgdDIpKTsKICAgICAgICAgIGZvciAodmFyIHIyID0gIiIsIG4yID0gMDsgbjIgPCB0MjsgbjIrKykKICAgICAgICAgICAgcjIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShlMltuMl0pOwogICAgICAgICAgcmV0dXJuIHIyOwogICAgICAgIH0KICAgICAgICB1WzI1NF0gPSB1WzI1NF0gPSAxLCByLnN0cmluZzJidWYgPSBmdW5jdGlvbihlMikgewogICAgICAgICAgdmFyIHQyLCByMiwgbjIsIGkyLCBzMiwgYSA9IGUyLmxlbmd0aCwgbyA9IDA7CiAgICAgICAgICBmb3IgKGkyID0gMDsgaTIgPCBhOyBpMisrKQogICAgICAgICAgICA1NTI5NiA9PSAoNjQ1MTIgJiAocjIgPSBlMi5jaGFyQ29kZUF0KGkyKSkpICYmIGkyICsgMSA8IGEgJiYgNTYzMjAgPT0gKDY0NTEyICYgKG4yID0gZTIuY2hhckNvZGVBdChpMiArIDEpKSkgJiYgKHIyID0gNjU1MzYgKyAocjIgLSA1NTI5NiA8PCAxMCkgKyAobjIgLSA1NjMyMCksIGkyKyspLCBvICs9IHIyIDwgMTI4ID8gMSA6IHIyIDwgMjA0OCA/IDIgOiByMiA8IDY1NTM2ID8gMyA6IDQ7CiAgICAgICAgICBmb3IgKHQyID0gbmV3IGguQnVmOChvKSwgaTIgPSBzMiA9IDA7IHMyIDwgbzsgaTIrKykKICAgICAgICAgICAgNTUyOTYgPT0gKDY0NTEyICYgKHIyID0gZTIuY2hhckNvZGVBdChpMikpKSAmJiBpMiArIDEgPCBhICYmIDU2MzIwID09ICg2NDUxMiAmIChuMiA9IGUyLmNoYXJDb2RlQXQoaTIgKyAxKSkpICYmIChyMiA9IDY1NTM2ICsgKHIyIC0gNTUyOTYgPDwgMTApICsgKG4yIC0gNTYzMjApLCBpMisrKSwgcjIgPCAxMjggPyB0MltzMisrXSA9IHIyIDogKHIyIDwgMjA0OCA/IHQyW3MyKytdID0gMTkyIHwgcjIgPj4+IDYgOiAocjIgPCA2NTUzNiA/IHQyW3MyKytdID0gMjI0IHwgcjIgPj4+IDEyIDogKHQyW3MyKytdID0gMjQwIHwgcjIgPj4+IDE4LCB0MltzMisrXSA9IDEyOCB8IHIyID4+PiAxMiAmIDYzKSwgdDJbczIrK10gPSAxMjggfCByMiA+Pj4gNiAmIDYzKSwgdDJbczIrK10gPSAxMjggfCA2MyAmIHIyKTsKICAgICAgICAgIHJldHVybiB0MjsKICAgICAgICB9LCByLmJ1ZjJiaW5zdHJpbmcgPSBmdW5jdGlvbihlMikgewogICAgICAgICAgcmV0dXJuIGwoZTIsIGUyLmxlbmd0aCk7CiAgICAgICAgfSwgci5iaW5zdHJpbmcyYnVmID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIGZvciAodmFyIHQyID0gbmV3IGguQnVmOChlMi5sZW5ndGgpLCByMiA9IDAsIG4yID0gdDIubGVuZ3RoOyByMiA8IG4yOyByMisrKQogICAgICAgICAgICB0MltyMl0gPSBlMi5jaGFyQ29kZUF0KHIyKTsKICAgICAgICAgIHJldHVybiB0MjsKICAgICAgICB9LCByLmJ1ZjJzdHJpbmcgPSBmdW5jdGlvbihlMiwgdDIpIHsKICAgICAgICAgIHZhciByMiwgbjIsIGkyLCBzMiwgYSA9IHQyIHx8IGUyLmxlbmd0aCwgbyA9IG5ldyBBcnJheSgyICogYSk7CiAgICAgICAgICBmb3IgKHIyID0gbjIgPSAwOyByMiA8IGE7ICkKICAgICAgICAgICAgaWYgKChpMiA9IGUyW3IyKytdKSA8IDEyOCkKICAgICAgICAgICAgICBvW24yKytdID0gaTI7CiAgICAgICAgICAgIGVsc2UgaWYgKDQgPCAoczIgPSB1W2kyXSkpCiAgICAgICAgICAgICAgb1tuMisrXSA9IDY1NTMzLCByMiArPSBzMiAtIDE7CiAgICAgICAgICAgIGVsc2UgewogICAgICAgICAgICAgIGZvciAoaTIgJj0gMiA9PT0gczIgPyAzMSA6IDMgPT09IHMyID8gMTUgOiA3OyAxIDwgczIgJiYgcjIgPCBhOyApCiAgICAgICAgICAgICAgICBpMiA9IGkyIDw8IDYgfCA2MyAmIGUyW3IyKytdLCBzMi0tOwogICAgICAgICAgICAgIDEgPCBzMiA/IG9bbjIrK10gPSA2NTUzMyA6IGkyIDwgNjU1MzYgPyBvW24yKytdID0gaTIgOiAoaTIgLT0gNjU1MzYsIG9bbjIrK10gPSA1NTI5NiB8IGkyID4+IDEwICYgMTAyMywgb1tuMisrXSA9IDU2MzIwIHwgMTAyMyAmIGkyKTsKICAgICAgICAgICAgfQogICAgICAgICAgcmV0dXJuIGwobywgbjIpOwogICAgICAgIH0sIHIudXRmOGJvcmRlciA9IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgdmFyIHIyOwogICAgICAgICAgZm9yICgodDIgPSB0MiB8fCBlMi5sZW5ndGgpID4gZTIubGVuZ3RoICYmICh0MiA9IGUyLmxlbmd0aCksIHIyID0gdDIgLSAxOyAwIDw9IHIyICYmIDEyOCA9PSAoMTkyICYgZTJbcjJdKTsgKQogICAgICAgICAgICByMi0tOwogICAgICAgICAgcmV0dXJuIHIyIDwgMCA/IHQyIDogMCA9PT0gcjIgPyB0MiA6IHIyICsgdVtlMltyMl1dID4gdDIgPyByMiA6IHQyOwogICAgICAgIH07CiAgICAgIH0sIHsgIi4vY29tbW9uIjogNDEgfV0sIDQzOiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIHQuZXhwb3J0cyA9IGZ1bmN0aW9uKGUyLCB0MiwgcjIsIG4pIHsKICAgICAgICAgIGZvciAodmFyIGkgPSA2NTUzNSAmIGUyIHwgMCwgcyA9IGUyID4+PiAxNiAmIDY1NTM1IHwgMCwgYSA9IDA7IDAgIT09IHIyOyApIHsKICAgICAgICAgICAgZm9yIChyMiAtPSBhID0gMmUzIDwgcjIgPyAyZTMgOiByMjsgcyA9IHMgKyAoaSA9IGkgKyB0MltuKytdIHwgMCkgfCAwLCAtLWE7ICkKICAgICAgICAgICAgICA7CiAgICAgICAgICAgIGkgJT0gNjU1MjEsIHMgJT0gNjU1MjE7CiAgICAgICAgICB9CiAgICAgICAgICByZXR1cm4gaSB8IHMgPDwgMTYgfCAwOwogICAgICAgIH07CiAgICAgIH0sIHt9XSwgNDQ6IFtmdW5jdGlvbihlLCB0LCByKSB7CiAgICAgICAgdC5leHBvcnRzID0geyBaX05PX0ZMVVNIOiAwLCBaX1BBUlRJQUxfRkxVU0g6IDEsIFpfU1lOQ19GTFVTSDogMiwgWl9GVUxMX0ZMVVNIOiAzLCBaX0ZJTklTSDogNCwgWl9CTE9DSzogNSwgWl9UUkVFUzogNiwgWl9PSzogMCwgWl9TVFJFQU1fRU5EOiAxLCBaX05FRURfRElDVDogMiwgWl9FUlJOTzogLTEsIFpfU1RSRUFNX0VSUk9SOiAtMiwgWl9EQVRBX0VSUk9SOiAtMywgWl9CVUZfRVJST1I6IC01LCBaX05PX0NPTVBSRVNTSU9OOiAwLCBaX0JFU1RfU1BFRUQ6IDEsIFpfQkVTVF9DT01QUkVTU0lPTjogOSwgWl9ERUZBVUxUX0NPTVBSRVNTSU9OOiAtMSwgWl9GSUxURVJFRDogMSwgWl9IVUZGTUFOX09OTFk6IDIsIFpfUkxFOiAzLCBaX0ZJWEVEOiA0LCBaX0RFRkFVTFRfU1RSQVRFR1k6IDAsIFpfQklOQVJZOiAwLCBaX1RFWFQ6IDEsIFpfVU5LTk9XTjogMiwgWl9ERUZMQVRFRDogOCB9OwogICAgICB9LCB7fV0sIDQ1OiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIHZhciBvID0gZnVuY3Rpb24oKSB7CiAgICAgICAgICBmb3IgKHZhciBlMiwgdDIgPSBbXSwgcjIgPSAwOyByMiA8IDI1NjsgcjIrKykgewogICAgICAgICAgICBlMiA9IHIyOwogICAgICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IDg7IG4rKykKICAgICAgICAgICAgICBlMiA9IDEgJiBlMiA/IDM5ODgyOTIzODQgXiBlMiA+Pj4gMSA6IGUyID4+PiAxOwogICAgICAgICAgICB0MltyMl0gPSBlMjsKICAgICAgICAgIH0KICAgICAgICAgIHJldHVybiB0MjsKICAgICAgICB9KCk7CiAgICAgICAgdC5leHBvcnRzID0gZnVuY3Rpb24oZTIsIHQyLCByMiwgbikgewogICAgICAgICAgdmFyIGkgPSBvLCBzID0gbiArIHIyOwogICAgICAgICAgZTIgXj0gLTE7CiAgICAgICAgICBmb3IgKHZhciBhID0gbjsgYSA8IHM7IGErKykKICAgICAgICAgICAgZTIgPSBlMiA+Pj4gOCBeIGlbMjU1ICYgKGUyIF4gdDJbYV0pXTsKICAgICAgICAgIHJldHVybiAtMSBeIGUyOwogICAgICAgIH07CiAgICAgIH0sIHt9XSwgNDY6IFtmdW5jdGlvbihlLCB0LCByKSB7CiAgICAgICAgdmFyIGgsIGMgPSBlKCIuLi91dGlscy9jb21tb24iKSwgdSA9IGUoIi4vdHJlZXMiKSwgZCA9IGUoIi4vYWRsZXIzMiIpLCBwID0gZSgiLi9jcmMzMiIpLCBuID0gZSgiLi9tZXNzYWdlcyIpLCBsID0gMCwgZiA9IDQsIG0gPSAwLCBfID0gLTIsIGcgPSAtMSwgYiA9IDQsIGkgPSAyLCB2ID0gOCwgeSA9IDksIHMgPSAyODYsIGEgPSAzMCwgbyA9IDE5LCB3ID0gMiAqIHMgKyAxLCBrID0gMTUsIHggPSAzLCBTID0gMjU4LCB6ID0gUyArIHggKyAxLCBDID0gNDIsIEUgPSAxMTMsIEEgPSAxLCBJID0gMiwgTyA9IDMsIEIgPSA0OwogICAgICAgIGZ1bmN0aW9uIFIoZTIsIHQyKSB7CiAgICAgICAgICByZXR1cm4gZTIubXNnID0gblt0Ml0sIHQyOwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBUKGUyKSB7CiAgICAgICAgICByZXR1cm4gKGUyIDw8IDEpIC0gKDQgPCBlMiA/IDkgOiAwKTsKICAgICAgICB9CiAgICAgICAgZnVuY3Rpb24gRChlMikgewogICAgICAgICAgZm9yICh2YXIgdDIgPSBlMi5sZW5ndGg7IDAgPD0gLS10MjsgKQogICAgICAgICAgICBlMlt0Ml0gPSAwOwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBGKGUyKSB7CiAgICAgICAgICB2YXIgdDIgPSBlMi5zdGF0ZSwgcjIgPSB0Mi5wZW5kaW5nOwogICAgICAgICAgcjIgPiBlMi5hdmFpbF9vdXQgJiYgKHIyID0gZTIuYXZhaWxfb3V0KSwgMCAhPT0gcjIgJiYgKGMuYXJyYXlTZXQoZTIub3V0cHV0LCB0Mi5wZW5kaW5nX2J1ZiwgdDIucGVuZGluZ19vdXQsIHIyLCBlMi5uZXh0X291dCksIGUyLm5leHRfb3V0ICs9IHIyLCB0Mi5wZW5kaW5nX291dCArPSByMiwgZTIudG90YWxfb3V0ICs9IHIyLCBlMi5hdmFpbF9vdXQgLT0gcjIsIHQyLnBlbmRpbmcgLT0gcjIsIDAgPT09IHQyLnBlbmRpbmcgJiYgKHQyLnBlbmRpbmdfb3V0ID0gMCkpOwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBOKGUyLCB0MikgewogICAgICAgICAgdS5fdHJfZmx1c2hfYmxvY2soZTIsIDAgPD0gZTIuYmxvY2tfc3RhcnQgPyBlMi5ibG9ja19zdGFydCA6IC0xLCBlMi5zdHJzdGFydCAtIGUyLmJsb2NrX3N0YXJ0LCB0MiksIGUyLmJsb2NrX3N0YXJ0ID0gZTIuc3Ryc3RhcnQsIEYoZTIuc3RybSk7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIFUoZTIsIHQyKSB7CiAgICAgICAgICBlMi5wZW5kaW5nX2J1ZltlMi5wZW5kaW5nKytdID0gdDI7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIFAoZTIsIHQyKSB7CiAgICAgICAgICBlMi5wZW5kaW5nX2J1ZltlMi5wZW5kaW5nKytdID0gdDIgPj4+IDggJiAyNTUsIGUyLnBlbmRpbmdfYnVmW2UyLnBlbmRpbmcrK10gPSAyNTUgJiB0MjsKICAgICAgICB9CiAgICAgICAgZnVuY3Rpb24gTChlMiwgdDIpIHsKICAgICAgICAgIHZhciByMiwgbjIsIGkyID0gZTIubWF4X2NoYWluX2xlbmd0aCwgczIgPSBlMi5zdHJzdGFydCwgYTIgPSBlMi5wcmV2X2xlbmd0aCwgbzIgPSBlMi5uaWNlX21hdGNoLCBoMiA9IGUyLnN0cnN0YXJ0ID4gZTIud19zaXplIC0geiA/IGUyLnN0cnN0YXJ0IC0gKGUyLndfc2l6ZSAtIHopIDogMCwgdTIgPSBlMi53aW5kb3csIGwyID0gZTIud19tYXNrLCBmMiA9IGUyLnByZXYsIGMyID0gZTIuc3Ryc3RhcnQgKyBTLCBkMiA9IHUyW3MyICsgYTIgLSAxXSwgcDIgPSB1MltzMiArIGEyXTsKICAgICAgICAgIGUyLnByZXZfbGVuZ3RoID49IGUyLmdvb2RfbWF0Y2ggJiYgKGkyID4+PSAyKSwgbzIgPiBlMi5sb29rYWhlYWQgJiYgKG8yID0gZTIubG9va2FoZWFkKTsKICAgICAgICAgIGRvIHsKICAgICAgICAgICAgaWYgKHUyWyhyMiA9IHQyKSArIGEyXSA9PT0gcDIgJiYgdTJbcjIgKyBhMiAtIDFdID09PSBkMiAmJiB1MltyMl0gPT09IHUyW3MyXSAmJiB1MlsrK3IyXSA9PT0gdTJbczIgKyAxXSkgewogICAgICAgICAgICAgIHMyICs9IDIsIHIyKys7CiAgICAgICAgICAgICAgZG8gewogICAgICAgICAgICAgIH0gd2hpbGUgKHUyWysrczJdID09PSB1MlsrK3IyXSAmJiB1MlsrK3MyXSA9PT0gdTJbKytyMl0gJiYgdTJbKytzMl0gPT09IHUyWysrcjJdICYmIHUyWysrczJdID09PSB1MlsrK3IyXSAmJiB1MlsrK3MyXSA9PT0gdTJbKytyMl0gJiYgdTJbKytzMl0gPT09IHUyWysrcjJdICYmIHUyWysrczJdID09PSB1MlsrK3IyXSAmJiB1MlsrK3MyXSA9PT0gdTJbKytyMl0gJiYgczIgPCBjMik7CiAgICAgICAgICAgICAgaWYgKG4yID0gUyAtIChjMiAtIHMyKSwgczIgPSBjMiAtIFMsIGEyIDwgbjIpIHsKICAgICAgICAgICAgICAgIGlmIChlMi5tYXRjaF9zdGFydCA9IHQyLCBvMiA8PSAoYTIgPSBuMikpCiAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgZDIgPSB1MltzMiArIGEyIC0gMV0sIHAyID0gdTJbczIgKyBhMl07CiAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICB9IHdoaWxlICgodDIgPSBmMlt0MiAmIGwyXSkgPiBoMiAmJiAwICE9IC0taTIpOwogICAgICAgICAgcmV0dXJuIGEyIDw9IGUyLmxvb2thaGVhZCA/IGEyIDogZTIubG9va2FoZWFkOwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBqKGUyKSB7CiAgICAgICAgICB2YXIgdDIsIHIyLCBuMiwgaTIsIHMyLCBhMiwgbzIsIGgyLCB1MiwgbDIsIGYyID0gZTIud19zaXplOwogICAgICAgICAgZG8gewogICAgICAgICAgICBpZiAoaTIgPSBlMi53aW5kb3dfc2l6ZSAtIGUyLmxvb2thaGVhZCAtIGUyLnN0cnN0YXJ0LCBlMi5zdHJzdGFydCA+PSBmMiArIChmMiAtIHopKSB7CiAgICAgICAgICAgICAgZm9yIChjLmFycmF5U2V0KGUyLndpbmRvdywgZTIud2luZG93LCBmMiwgZjIsIDApLCBlMi5tYXRjaF9zdGFydCAtPSBmMiwgZTIuc3Ryc3RhcnQgLT0gZjIsIGUyLmJsb2NrX3N0YXJ0IC09IGYyLCB0MiA9IHIyID0gZTIuaGFzaF9zaXplOyBuMiA9IGUyLmhlYWRbLS10Ml0sIGUyLmhlYWRbdDJdID0gZjIgPD0gbjIgPyBuMiAtIGYyIDogMCwgLS1yMjsgKQogICAgICAgICAgICAgICAgOwogICAgICAgICAgICAgIGZvciAodDIgPSByMiA9IGYyOyBuMiA9IGUyLnByZXZbLS10Ml0sIGUyLnByZXZbdDJdID0gZjIgPD0gbjIgPyBuMiAtIGYyIDogMCwgLS1yMjsgKQogICAgICAgICAgICAgICAgOwogICAgICAgICAgICAgIGkyICs9IGYyOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmICgwID09PSBlMi5zdHJtLmF2YWlsX2luKQogICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICBpZiAoYTIgPSBlMi5zdHJtLCBvMiA9IGUyLndpbmRvdywgaDIgPSBlMi5zdHJzdGFydCArIGUyLmxvb2thaGVhZCwgdTIgPSBpMiwgbDIgPSB2b2lkIDAsIGwyID0gYTIuYXZhaWxfaW4sIHUyIDwgbDIgJiYgKGwyID0gdTIpLCByMiA9IDAgPT09IGwyID8gMCA6IChhMi5hdmFpbF9pbiAtPSBsMiwgYy5hcnJheVNldChvMiwgYTIuaW5wdXQsIGEyLm5leHRfaW4sIGwyLCBoMiksIDEgPT09IGEyLnN0YXRlLndyYXAgPyBhMi5hZGxlciA9IGQoYTIuYWRsZXIsIG8yLCBsMiwgaDIpIDogMiA9PT0gYTIuc3RhdGUud3JhcCAmJiAoYTIuYWRsZXIgPSBwKGEyLmFkbGVyLCBvMiwgbDIsIGgyKSksIGEyLm5leHRfaW4gKz0gbDIsIGEyLnRvdGFsX2luICs9IGwyLCBsMiksIGUyLmxvb2thaGVhZCArPSByMiwgZTIubG9va2FoZWFkICsgZTIuaW5zZXJ0ID49IHgpCiAgICAgICAgICAgICAgZm9yIChzMiA9IGUyLnN0cnN0YXJ0IC0gZTIuaW5zZXJ0LCBlMi5pbnNfaCA9IGUyLndpbmRvd1tzMl0sIGUyLmluc19oID0gKGUyLmluc19oIDw8IGUyLmhhc2hfc2hpZnQgXiBlMi53aW5kb3dbczIgKyAxXSkgJiBlMi5oYXNoX21hc2s7IGUyLmluc2VydCAmJiAoZTIuaW5zX2ggPSAoZTIuaW5zX2ggPDwgZTIuaGFzaF9zaGlmdCBeIGUyLndpbmRvd1tzMiArIHggLSAxXSkgJiBlMi5oYXNoX21hc2ssIGUyLnByZXZbczIgJiBlMi53X21hc2tdID0gZTIuaGVhZFtlMi5pbnNfaF0sIGUyLmhlYWRbZTIuaW5zX2hdID0gczIsIHMyKyssIGUyLmluc2VydC0tLCAhKGUyLmxvb2thaGVhZCArIGUyLmluc2VydCA8IHgpKTsgKQogICAgICAgICAgICAgICAgOwogICAgICAgICAgfSB3aGlsZSAoZTIubG9va2FoZWFkIDwgeiAmJiAwICE9PSBlMi5zdHJtLmF2YWlsX2luKTsKICAgICAgICB9CiAgICAgICAgZnVuY3Rpb24gWihlMiwgdDIpIHsKICAgICAgICAgIGZvciAodmFyIHIyLCBuMjsgOyApIHsKICAgICAgICAgICAgaWYgKGUyLmxvb2thaGVhZCA8IHopIHsKICAgICAgICAgICAgICBpZiAoaihlMiksIGUyLmxvb2thaGVhZCA8IHogJiYgdDIgPT09IGwpCiAgICAgICAgICAgICAgICByZXR1cm4gQTsKICAgICAgICAgICAgICBpZiAoMCA9PT0gZTIubG9va2FoZWFkKQogICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKHIyID0gMCwgZTIubG9va2FoZWFkID49IHggJiYgKGUyLmluc19oID0gKGUyLmluc19oIDw8IGUyLmhhc2hfc2hpZnQgXiBlMi53aW5kb3dbZTIuc3Ryc3RhcnQgKyB4IC0gMV0pICYgZTIuaGFzaF9tYXNrLCByMiA9IGUyLnByZXZbZTIuc3Ryc3RhcnQgJiBlMi53X21hc2tdID0gZTIuaGVhZFtlMi5pbnNfaF0sIGUyLmhlYWRbZTIuaW5zX2hdID0gZTIuc3Ryc3RhcnQpLCAwICE9PSByMiAmJiBlMi5zdHJzdGFydCAtIHIyIDw9IGUyLndfc2l6ZSAtIHogJiYgKGUyLm1hdGNoX2xlbmd0aCA9IEwoZTIsIHIyKSksIGUyLm1hdGNoX2xlbmd0aCA+PSB4KQogICAgICAgICAgICAgIGlmIChuMiA9IHUuX3RyX3RhbGx5KGUyLCBlMi5zdHJzdGFydCAtIGUyLm1hdGNoX3N0YXJ0LCBlMi5tYXRjaF9sZW5ndGggLSB4KSwgZTIubG9va2FoZWFkIC09IGUyLm1hdGNoX2xlbmd0aCwgZTIubWF0Y2hfbGVuZ3RoIDw9IGUyLm1heF9sYXp5X21hdGNoICYmIGUyLmxvb2thaGVhZCA+PSB4KSB7CiAgICAgICAgICAgICAgICBmb3IgKGUyLm1hdGNoX2xlbmd0aC0tOyBlMi5zdHJzdGFydCsrLCBlMi5pbnNfaCA9IChlMi5pbnNfaCA8PCBlMi5oYXNoX3NoaWZ0IF4gZTIud2luZG93W2UyLnN0cnN0YXJ0ICsgeCAtIDFdKSAmIGUyLmhhc2hfbWFzaywgcjIgPSBlMi5wcmV2W2UyLnN0cnN0YXJ0ICYgZTIud19tYXNrXSA9IGUyLmhlYWRbZTIuaW5zX2hdLCBlMi5oZWFkW2UyLmluc19oXSA9IGUyLnN0cnN0YXJ0LCAwICE9IC0tZTIubWF0Y2hfbGVuZ3RoOyApCiAgICAgICAgICAgICAgICAgIDsKICAgICAgICAgICAgICAgIGUyLnN0cnN0YXJ0Kys7CiAgICAgICAgICAgICAgfSBlbHNlCiAgICAgICAgICAgICAgICBlMi5zdHJzdGFydCArPSBlMi5tYXRjaF9sZW5ndGgsIGUyLm1hdGNoX2xlbmd0aCA9IDAsIGUyLmluc19oID0gZTIud2luZG93W2UyLnN0cnN0YXJ0XSwgZTIuaW5zX2ggPSAoZTIuaW5zX2ggPDwgZTIuaGFzaF9zaGlmdCBeIGUyLndpbmRvd1tlMi5zdHJzdGFydCArIDFdKSAmIGUyLmhhc2hfbWFzazsKICAgICAgICAgICAgZWxzZQogICAgICAgICAgICAgIG4yID0gdS5fdHJfdGFsbHkoZTIsIDAsIGUyLndpbmRvd1tlMi5zdHJzdGFydF0pLCBlMi5sb29rYWhlYWQtLSwgZTIuc3Ryc3RhcnQrKzsKICAgICAgICAgICAgaWYgKG4yICYmIChOKGUyLCBmYWxzZSksIDAgPT09IGUyLnN0cm0uYXZhaWxfb3V0KSkKICAgICAgICAgICAgICByZXR1cm4gQTsKICAgICAgICAgIH0KICAgICAgICAgIHJldHVybiBlMi5pbnNlcnQgPSBlMi5zdHJzdGFydCA8IHggLSAxID8gZTIuc3Ryc3RhcnQgOiB4IC0gMSwgdDIgPT09IGYgPyAoTihlMiwgdHJ1ZSksIDAgPT09IGUyLnN0cm0uYXZhaWxfb3V0ID8gTyA6IEIpIDogZTIubGFzdF9saXQgJiYgKE4oZTIsIGZhbHNlKSwgMCA9PT0gZTIuc3RybS5hdmFpbF9vdXQpID8gQSA6IEk7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIFcoZTIsIHQyKSB7CiAgICAgICAgICBmb3IgKHZhciByMiwgbjIsIGkyOyA7ICkgewogICAgICAgICAgICBpZiAoZTIubG9va2FoZWFkIDwgeikgewogICAgICAgICAgICAgIGlmIChqKGUyKSwgZTIubG9va2FoZWFkIDwgeiAmJiB0MiA9PT0gbCkKICAgICAgICAgICAgICAgIHJldHVybiBBOwogICAgICAgICAgICAgIGlmICgwID09PSBlMi5sb29rYWhlYWQpCiAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAocjIgPSAwLCBlMi5sb29rYWhlYWQgPj0geCAmJiAoZTIuaW5zX2ggPSAoZTIuaW5zX2ggPDwgZTIuaGFzaF9zaGlmdCBeIGUyLndpbmRvd1tlMi5zdHJzdGFydCArIHggLSAxXSkgJiBlMi5oYXNoX21hc2ssIHIyID0gZTIucHJldltlMi5zdHJzdGFydCAmIGUyLndfbWFza10gPSBlMi5oZWFkW2UyLmluc19oXSwgZTIuaGVhZFtlMi5pbnNfaF0gPSBlMi5zdHJzdGFydCksIGUyLnByZXZfbGVuZ3RoID0gZTIubWF0Y2hfbGVuZ3RoLCBlMi5wcmV2X21hdGNoID0gZTIubWF0Y2hfc3RhcnQsIGUyLm1hdGNoX2xlbmd0aCA9IHggLSAxLCAwICE9PSByMiAmJiBlMi5wcmV2X2xlbmd0aCA8IGUyLm1heF9sYXp5X21hdGNoICYmIGUyLnN0cnN0YXJ0IC0gcjIgPD0gZTIud19zaXplIC0geiAmJiAoZTIubWF0Y2hfbGVuZ3RoID0gTChlMiwgcjIpLCBlMi5tYXRjaF9sZW5ndGggPD0gNSAmJiAoMSA9PT0gZTIuc3RyYXRlZ3kgfHwgZTIubWF0Y2hfbGVuZ3RoID09PSB4ICYmIDQwOTYgPCBlMi5zdHJzdGFydCAtIGUyLm1hdGNoX3N0YXJ0KSAmJiAoZTIubWF0Y2hfbGVuZ3RoID0geCAtIDEpKSwgZTIucHJldl9sZW5ndGggPj0geCAmJiBlMi5tYXRjaF9sZW5ndGggPD0gZTIucHJldl9sZW5ndGgpIHsKICAgICAgICAgICAgICBmb3IgKGkyID0gZTIuc3Ryc3RhcnQgKyBlMi5sb29rYWhlYWQgLSB4LCBuMiA9IHUuX3RyX3RhbGx5KGUyLCBlMi5zdHJzdGFydCAtIDEgLSBlMi5wcmV2X21hdGNoLCBlMi5wcmV2X2xlbmd0aCAtIHgpLCBlMi5sb29rYWhlYWQgLT0gZTIucHJldl9sZW5ndGggLSAxLCBlMi5wcmV2X2xlbmd0aCAtPSAyOyArK2UyLnN0cnN0YXJ0IDw9IGkyICYmIChlMi5pbnNfaCA9IChlMi5pbnNfaCA8PCBlMi5oYXNoX3NoaWZ0IF4gZTIud2luZG93W2UyLnN0cnN0YXJ0ICsgeCAtIDFdKSAmIGUyLmhhc2hfbWFzaywgcjIgPSBlMi5wcmV2W2UyLnN0cnN0YXJ0ICYgZTIud19tYXNrXSA9IGUyLmhlYWRbZTIuaW5zX2hdLCBlMi5oZWFkW2UyLmluc19oXSA9IGUyLnN0cnN0YXJ0KSwgMCAhPSAtLWUyLnByZXZfbGVuZ3RoOyApCiAgICAgICAgICAgICAgICA7CiAgICAgICAgICAgICAgaWYgKGUyLm1hdGNoX2F2YWlsYWJsZSA9IDAsIGUyLm1hdGNoX2xlbmd0aCA9IHggLSAxLCBlMi5zdHJzdGFydCsrLCBuMiAmJiAoTihlMiwgZmFsc2UpLCAwID09PSBlMi5zdHJtLmF2YWlsX291dCkpCiAgICAgICAgICAgICAgICByZXR1cm4gQTsKICAgICAgICAgICAgfSBlbHNlIGlmIChlMi5tYXRjaF9hdmFpbGFibGUpIHsKICAgICAgICAgICAgICBpZiAoKG4yID0gdS5fdHJfdGFsbHkoZTIsIDAsIGUyLndpbmRvd1tlMi5zdHJzdGFydCAtIDFdKSkgJiYgTihlMiwgZmFsc2UpLCBlMi5zdHJzdGFydCsrLCBlMi5sb29rYWhlYWQtLSwgMCA9PT0gZTIuc3RybS5hdmFpbF9vdXQpCiAgICAgICAgICAgICAgICByZXR1cm4gQTsKICAgICAgICAgICAgfSBlbHNlCiAgICAgICAgICAgICAgZTIubWF0Y2hfYXZhaWxhYmxlID0gMSwgZTIuc3Ryc3RhcnQrKywgZTIubG9va2FoZWFkLS07CiAgICAgICAgICB9CiAgICAgICAgICByZXR1cm4gZTIubWF0Y2hfYXZhaWxhYmxlICYmIChuMiA9IHUuX3RyX3RhbGx5KGUyLCAwLCBlMi53aW5kb3dbZTIuc3Ryc3RhcnQgLSAxXSksIGUyLm1hdGNoX2F2YWlsYWJsZSA9IDApLCBlMi5pbnNlcnQgPSBlMi5zdHJzdGFydCA8IHggLSAxID8gZTIuc3Ryc3RhcnQgOiB4IC0gMSwgdDIgPT09IGYgPyAoTihlMiwgdHJ1ZSksIDAgPT09IGUyLnN0cm0uYXZhaWxfb3V0ID8gTyA6IEIpIDogZTIubGFzdF9saXQgJiYgKE4oZTIsIGZhbHNlKSwgMCA9PT0gZTIuc3RybS5hdmFpbF9vdXQpID8gQSA6IEk7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIE0oZTIsIHQyLCByMiwgbjIsIGkyKSB7CiAgICAgICAgICB0aGlzLmdvb2RfbGVuZ3RoID0gZTIsIHRoaXMubWF4X2xhenkgPSB0MiwgdGhpcy5uaWNlX2xlbmd0aCA9IHIyLCB0aGlzLm1heF9jaGFpbiA9IG4yLCB0aGlzLmZ1bmMgPSBpMjsKICAgICAgICB9CiAgICAgICAgZnVuY3Rpb24gSCgpIHsKICAgICAgICAgIHRoaXMuc3RybSA9IG51bGwsIHRoaXMuc3RhdHVzID0gMCwgdGhpcy5wZW5kaW5nX2J1ZiA9IG51bGwsIHRoaXMucGVuZGluZ19idWZfc2l6ZSA9IDAsIHRoaXMucGVuZGluZ19vdXQgPSAwLCB0aGlzLnBlbmRpbmcgPSAwLCB0aGlzLndyYXAgPSAwLCB0aGlzLmd6aGVhZCA9IG51bGwsIHRoaXMuZ3ppbmRleCA9IDAsIHRoaXMubWV0aG9kID0gdiwgdGhpcy5sYXN0X2ZsdXNoID0gLTEsIHRoaXMud19zaXplID0gMCwgdGhpcy53X2JpdHMgPSAwLCB0aGlzLndfbWFzayA9IDAsIHRoaXMud2luZG93ID0gbnVsbCwgdGhpcy53aW5kb3dfc2l6ZSA9IDAsIHRoaXMucHJldiA9IG51bGwsIHRoaXMuaGVhZCA9IG51bGwsIHRoaXMuaW5zX2ggPSAwLCB0aGlzLmhhc2hfc2l6ZSA9IDAsIHRoaXMuaGFzaF9iaXRzID0gMCwgdGhpcy5oYXNoX21hc2sgPSAwLCB0aGlzLmhhc2hfc2hpZnQgPSAwLCB0aGlzLmJsb2NrX3N0YXJ0ID0gMCwgdGhpcy5tYXRjaF9sZW5ndGggPSAwLCB0aGlzLnByZXZfbWF0Y2ggPSAwLCB0aGlzLm1hdGNoX2F2YWlsYWJsZSA9IDAsIHRoaXMuc3Ryc3RhcnQgPSAwLCB0aGlzLm1hdGNoX3N0YXJ0ID0gMCwgdGhpcy5sb29rYWhlYWQgPSAwLCB0aGlzLnByZXZfbGVuZ3RoID0gMCwgdGhpcy5tYXhfY2hhaW5fbGVuZ3RoID0gMCwgdGhpcy5tYXhfbGF6eV9tYXRjaCA9IDAsIHRoaXMubGV2ZWwgPSAwLCB0aGlzLnN0cmF0ZWd5ID0gMCwgdGhpcy5nb29kX21hdGNoID0gMCwgdGhpcy5uaWNlX21hdGNoID0gMCwgdGhpcy5keW5fbHRyZWUgPSBuZXcgYy5CdWYxNigyICogdyksIHRoaXMuZHluX2R0cmVlID0gbmV3IGMuQnVmMTYoMiAqICgyICogYSArIDEpKSwgdGhpcy5ibF90cmVlID0gbmV3IGMuQnVmMTYoMiAqICgyICogbyArIDEpKSwgRCh0aGlzLmR5bl9sdHJlZSksIEQodGhpcy5keW5fZHRyZWUpLCBEKHRoaXMuYmxfdHJlZSksIHRoaXMubF9kZXNjID0gbnVsbCwgdGhpcy5kX2Rlc2MgPSBudWxsLCB0aGlzLmJsX2Rlc2MgPSBudWxsLCB0aGlzLmJsX2NvdW50ID0gbmV3IGMuQnVmMTYoayArIDEpLCB0aGlzLmhlYXAgPSBuZXcgYy5CdWYxNigyICogcyArIDEpLCBEKHRoaXMuaGVhcCksIHRoaXMuaGVhcF9sZW4gPSAwLCB0aGlzLmhlYXBfbWF4ID0gMCwgdGhpcy5kZXB0aCA9IG5ldyBjLkJ1ZjE2KDIgKiBzICsgMSksIEQodGhpcy5kZXB0aCksIHRoaXMubF9idWYgPSAwLCB0aGlzLmxpdF9idWZzaXplID0gMCwgdGhpcy5sYXN0X2xpdCA9IDAsIHRoaXMuZF9idWYgPSAwLCB0aGlzLm9wdF9sZW4gPSAwLCB0aGlzLnN0YXRpY19sZW4gPSAwLCB0aGlzLm1hdGNoZXMgPSAwLCB0aGlzLmluc2VydCA9IDAsIHRoaXMuYmlfYnVmID0gMCwgdGhpcy5iaV92YWxpZCA9IDA7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIEcoZTIpIHsKICAgICAgICAgIHZhciB0MjsKICAgICAgICAgIHJldHVybiBlMiAmJiBlMi5zdGF0ZSA/IChlMi50b3RhbF9pbiA9IGUyLnRvdGFsX291dCA9IDAsIGUyLmRhdGFfdHlwZSA9IGksICh0MiA9IGUyLnN0YXRlKS5wZW5kaW5nID0gMCwgdDIucGVuZGluZ19vdXQgPSAwLCB0Mi53cmFwIDwgMCAmJiAodDIud3JhcCA9IC10Mi53cmFwKSwgdDIuc3RhdHVzID0gdDIud3JhcCA/IEMgOiBFLCBlMi5hZGxlciA9IDIgPT09IHQyLndyYXAgPyAwIDogMSwgdDIubGFzdF9mbHVzaCA9IGwsIHUuX3RyX2luaXQodDIpLCBtKSA6IFIoZTIsIF8pOwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBLKGUyKSB7CiAgICAgICAgICB2YXIgdDIgPSBHKGUyKTsKICAgICAgICAgIHJldHVybiB0MiA9PT0gbSAmJiBmdW5jdGlvbihlMykgewogICAgICAgICAgICBlMy53aW5kb3dfc2l6ZSA9IDIgKiBlMy53X3NpemUsIEQoZTMuaGVhZCksIGUzLm1heF9sYXp5X21hdGNoID0gaFtlMy5sZXZlbF0ubWF4X2xhenksIGUzLmdvb2RfbWF0Y2ggPSBoW2UzLmxldmVsXS5nb29kX2xlbmd0aCwgZTMubmljZV9tYXRjaCA9IGhbZTMubGV2ZWxdLm5pY2VfbGVuZ3RoLCBlMy5tYXhfY2hhaW5fbGVuZ3RoID0gaFtlMy5sZXZlbF0ubWF4X2NoYWluLCBlMy5zdHJzdGFydCA9IDAsIGUzLmJsb2NrX3N0YXJ0ID0gMCwgZTMubG9va2FoZWFkID0gMCwgZTMuaW5zZXJ0ID0gMCwgZTMubWF0Y2hfbGVuZ3RoID0gZTMucHJldl9sZW5ndGggPSB4IC0gMSwgZTMubWF0Y2hfYXZhaWxhYmxlID0gMCwgZTMuaW5zX2ggPSAwOwogICAgICAgICAgfShlMi5zdGF0ZSksIHQyOwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBZKGUyLCB0MiwgcjIsIG4yLCBpMiwgczIpIHsKICAgICAgICAgIGlmICghZTIpCiAgICAgICAgICAgIHJldHVybiBfOwogICAgICAgICAgdmFyIGEyID0gMTsKICAgICAgICAgIGlmICh0MiA9PT0gZyAmJiAodDIgPSA2KSwgbjIgPCAwID8gKGEyID0gMCwgbjIgPSAtbjIpIDogMTUgPCBuMiAmJiAoYTIgPSAyLCBuMiAtPSAxNiksIGkyIDwgMSB8fCB5IDwgaTIgfHwgcjIgIT09IHYgfHwgbjIgPCA4IHx8IDE1IDwgbjIgfHwgdDIgPCAwIHx8IDkgPCB0MiB8fCBzMiA8IDAgfHwgYiA8IHMyKQogICAgICAgICAgICByZXR1cm4gUihlMiwgXyk7CiAgICAgICAgICA4ID09PSBuMiAmJiAobjIgPSA5KTsKICAgICAgICAgIHZhciBvMiA9IG5ldyBIKCk7CiAgICAgICAgICByZXR1cm4gKGUyLnN0YXRlID0gbzIpLnN0cm0gPSBlMiwgbzIud3JhcCA9IGEyLCBvMi5nemhlYWQgPSBudWxsLCBvMi53X2JpdHMgPSBuMiwgbzIud19zaXplID0gMSA8PCBvMi53X2JpdHMsIG8yLndfbWFzayA9IG8yLndfc2l6ZSAtIDEsIG8yLmhhc2hfYml0cyA9IGkyICsgNywgbzIuaGFzaF9zaXplID0gMSA8PCBvMi5oYXNoX2JpdHMsIG8yLmhhc2hfbWFzayA9IG8yLmhhc2hfc2l6ZSAtIDEsIG8yLmhhc2hfc2hpZnQgPSB+figobzIuaGFzaF9iaXRzICsgeCAtIDEpIC8geCksIG8yLndpbmRvdyA9IG5ldyBjLkJ1ZjgoMiAqIG8yLndfc2l6ZSksIG8yLmhlYWQgPSBuZXcgYy5CdWYxNihvMi5oYXNoX3NpemUpLCBvMi5wcmV2ID0gbmV3IGMuQnVmMTYobzIud19zaXplKSwgbzIubGl0X2J1ZnNpemUgPSAxIDw8IGkyICsgNiwgbzIucGVuZGluZ19idWZfc2l6ZSA9IDQgKiBvMi5saXRfYnVmc2l6ZSwgbzIucGVuZGluZ19idWYgPSBuZXcgYy5CdWY4KG8yLnBlbmRpbmdfYnVmX3NpemUpLCBvMi5kX2J1ZiA9IDEgKiBvMi5saXRfYnVmc2l6ZSwgbzIubF9idWYgPSAzICogbzIubGl0X2J1ZnNpemUsIG8yLmxldmVsID0gdDIsIG8yLnN0cmF0ZWd5ID0gczIsIG8yLm1ldGhvZCA9IHIyLCBLKGUyKTsKICAgICAgICB9CiAgICAgICAgaCA9IFtuZXcgTSgwLCAwLCAwLCAwLCBmdW5jdGlvbihlMiwgdDIpIHsKICAgICAgICAgIHZhciByMiA9IDY1NTM1OwogICAgICAgICAgZm9yIChyMiA+IGUyLnBlbmRpbmdfYnVmX3NpemUgLSA1ICYmIChyMiA9IGUyLnBlbmRpbmdfYnVmX3NpemUgLSA1KTsgOyApIHsKICAgICAgICAgICAgaWYgKGUyLmxvb2thaGVhZCA8PSAxKSB7CiAgICAgICAgICAgICAgaWYgKGooZTIpLCAwID09PSBlMi5sb29rYWhlYWQgJiYgdDIgPT09IGwpCiAgICAgICAgICAgICAgICByZXR1cm4gQTsKICAgICAgICAgICAgICBpZiAoMCA9PT0gZTIubG9va2FoZWFkKQogICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgZTIuc3Ryc3RhcnQgKz0gZTIubG9va2FoZWFkLCBlMi5sb29rYWhlYWQgPSAwOwogICAgICAgICAgICB2YXIgbjIgPSBlMi5ibG9ja19zdGFydCArIHIyOwogICAgICAgICAgICBpZiAoKDAgPT09IGUyLnN0cnN0YXJ0IHx8IGUyLnN0cnN0YXJ0ID49IG4yKSAmJiAoZTIubG9va2FoZWFkID0gZTIuc3Ryc3RhcnQgLSBuMiwgZTIuc3Ryc3RhcnQgPSBuMiwgTihlMiwgZmFsc2UpLCAwID09PSBlMi5zdHJtLmF2YWlsX291dCkpCiAgICAgICAgICAgICAgcmV0dXJuIEE7CiAgICAgICAgICAgIGlmIChlMi5zdHJzdGFydCAtIGUyLmJsb2NrX3N0YXJ0ID49IGUyLndfc2l6ZSAtIHogJiYgKE4oZTIsIGZhbHNlKSwgMCA9PT0gZTIuc3RybS5hdmFpbF9vdXQpKQogICAgICAgICAgICAgIHJldHVybiBBOwogICAgICAgICAgfQogICAgICAgICAgcmV0dXJuIGUyLmluc2VydCA9IDAsIHQyID09PSBmID8gKE4oZTIsIHRydWUpLCAwID09PSBlMi5zdHJtLmF2YWlsX291dCA/IE8gOiBCKSA6IChlMi5zdHJzdGFydCA+IGUyLmJsb2NrX3N0YXJ0ICYmIChOKGUyLCBmYWxzZSksIGUyLnN0cm0uYXZhaWxfb3V0KSwgQSk7CiAgICAgICAgfSksIG5ldyBNKDQsIDQsIDgsIDQsIFopLCBuZXcgTSg0LCA1LCAxNiwgOCwgWiksIG5ldyBNKDQsIDYsIDMyLCAzMiwgWiksIG5ldyBNKDQsIDQsIDE2LCAxNiwgVyksIG5ldyBNKDgsIDE2LCAzMiwgMzIsIFcpLCBuZXcgTSg4LCAxNiwgMTI4LCAxMjgsIFcpLCBuZXcgTSg4LCAzMiwgMTI4LCAyNTYsIFcpLCBuZXcgTSgzMiwgMTI4LCAyNTgsIDEwMjQsIFcpLCBuZXcgTSgzMiwgMjU4LCAyNTgsIDQwOTYsIFcpXSwgci5kZWZsYXRlSW5pdCA9IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgcmV0dXJuIFkoZTIsIHQyLCB2LCAxNSwgOCwgMCk7CiAgICAgICAgfSwgci5kZWZsYXRlSW5pdDIgPSBZLCByLmRlZmxhdGVSZXNldCA9IEssIHIuZGVmbGF0ZVJlc2V0S2VlcCA9IEcsIHIuZGVmbGF0ZVNldEhlYWRlciA9IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgcmV0dXJuIGUyICYmIGUyLnN0YXRlID8gMiAhPT0gZTIuc3RhdGUud3JhcCA/IF8gOiAoZTIuc3RhdGUuZ3poZWFkID0gdDIsIG0pIDogXzsKICAgICAgICB9LCByLmRlZmxhdGUgPSBmdW5jdGlvbihlMiwgdDIpIHsKICAgICAgICAgIHZhciByMiwgbjIsIGkyLCBzMjsKICAgICAgICAgIGlmICghZTIgfHwgIWUyLnN0YXRlIHx8IDUgPCB0MiB8fCB0MiA8IDApCiAgICAgICAgICAgIHJldHVybiBlMiA/IFIoZTIsIF8pIDogXzsKICAgICAgICAgIGlmIChuMiA9IGUyLnN0YXRlLCAhZTIub3V0cHV0IHx8ICFlMi5pbnB1dCAmJiAwICE9PSBlMi5hdmFpbF9pbiB8fCA2NjYgPT09IG4yLnN0YXR1cyAmJiB0MiAhPT0gZikKICAgICAgICAgICAgcmV0dXJuIFIoZTIsIDAgPT09IGUyLmF2YWlsX291dCA/IC01IDogXyk7CiAgICAgICAgICBpZiAobjIuc3RybSA9IGUyLCByMiA9IG4yLmxhc3RfZmx1c2gsIG4yLmxhc3RfZmx1c2ggPSB0MiwgbjIuc3RhdHVzID09PSBDKQogICAgICAgICAgICBpZiAoMiA9PT0gbjIud3JhcCkKICAgICAgICAgICAgICBlMi5hZGxlciA9IDAsIFUobjIsIDMxKSwgVShuMiwgMTM5KSwgVShuMiwgOCksIG4yLmd6aGVhZCA/IChVKG4yLCAobjIuZ3poZWFkLnRleHQgPyAxIDogMCkgKyAobjIuZ3poZWFkLmhjcmMgPyAyIDogMCkgKyAobjIuZ3poZWFkLmV4dHJhID8gNCA6IDApICsgKG4yLmd6aGVhZC5uYW1lID8gOCA6IDApICsgKG4yLmd6aGVhZC5jb21tZW50ID8gMTYgOiAwKSksIFUobjIsIDI1NSAmIG4yLmd6aGVhZC50aW1lKSwgVShuMiwgbjIuZ3poZWFkLnRpbWUgPj4gOCAmIDI1NSksIFUobjIsIG4yLmd6aGVhZC50aW1lID4+IDE2ICYgMjU1KSwgVShuMiwgbjIuZ3poZWFkLnRpbWUgPj4gMjQgJiAyNTUpLCBVKG4yLCA5ID09PSBuMi5sZXZlbCA/IDIgOiAyIDw9IG4yLnN0cmF0ZWd5IHx8IG4yLmxldmVsIDwgMiA/IDQgOiAwKSwgVShuMiwgMjU1ICYgbjIuZ3poZWFkLm9zKSwgbjIuZ3poZWFkLmV4dHJhICYmIG4yLmd6aGVhZC5leHRyYS5sZW5ndGggJiYgKFUobjIsIDI1NSAmIG4yLmd6aGVhZC5leHRyYS5sZW5ndGgpLCBVKG4yLCBuMi5nemhlYWQuZXh0cmEubGVuZ3RoID4+IDggJiAyNTUpKSwgbjIuZ3poZWFkLmhjcmMgJiYgKGUyLmFkbGVyID0gcChlMi5hZGxlciwgbjIucGVuZGluZ19idWYsIG4yLnBlbmRpbmcsIDApKSwgbjIuZ3ppbmRleCA9IDAsIG4yLnN0YXR1cyA9IDY5KSA6IChVKG4yLCAwKSwgVShuMiwgMCksIFUobjIsIDApLCBVKG4yLCAwKSwgVShuMiwgMCksIFUobjIsIDkgPT09IG4yLmxldmVsID8gMiA6IDIgPD0gbjIuc3RyYXRlZ3kgfHwgbjIubGV2ZWwgPCAyID8gNCA6IDApLCBVKG4yLCAzKSwgbjIuc3RhdHVzID0gRSk7CiAgICAgICAgICAgIGVsc2UgewogICAgICAgICAgICAgIHZhciBhMiA9IHYgKyAobjIud19iaXRzIC0gOCA8PCA0KSA8PCA4OwogICAgICAgICAgICAgIGEyIHw9ICgyIDw9IG4yLnN0cmF0ZWd5IHx8IG4yLmxldmVsIDwgMiA/IDAgOiBuMi5sZXZlbCA8IDYgPyAxIDogNiA9PT0gbjIubGV2ZWwgPyAyIDogMykgPDwgNiwgMCAhPT0gbjIuc3Ryc3RhcnQgJiYgKGEyIHw9IDMyKSwgYTIgKz0gMzEgLSBhMiAlIDMxLCBuMi5zdGF0dXMgPSBFLCBQKG4yLCBhMiksIDAgIT09IG4yLnN0cnN0YXJ0ICYmIChQKG4yLCBlMi5hZGxlciA+Pj4gMTYpLCBQKG4yLCA2NTUzNSAmIGUyLmFkbGVyKSksIGUyLmFkbGVyID0gMTsKICAgICAgICAgICAgfQogICAgICAgICAgaWYgKDY5ID09PSBuMi5zdGF0dXMpCiAgICAgICAgICAgIGlmIChuMi5nemhlYWQuZXh0cmEpIHsKICAgICAgICAgICAgICBmb3IgKGkyID0gbjIucGVuZGluZzsgbjIuZ3ppbmRleCA8ICg2NTUzNSAmIG4yLmd6aGVhZC5leHRyYS5sZW5ndGgpICYmIChuMi5wZW5kaW5nICE9PSBuMi5wZW5kaW5nX2J1Zl9zaXplIHx8IChuMi5nemhlYWQuaGNyYyAmJiBuMi5wZW5kaW5nID4gaTIgJiYgKGUyLmFkbGVyID0gcChlMi5hZGxlciwgbjIucGVuZGluZ19idWYsIG4yLnBlbmRpbmcgLSBpMiwgaTIpKSwgRihlMiksIGkyID0gbjIucGVuZGluZywgbjIucGVuZGluZyAhPT0gbjIucGVuZGluZ19idWZfc2l6ZSkpOyApCiAgICAgICAgICAgICAgICBVKG4yLCAyNTUgJiBuMi5nemhlYWQuZXh0cmFbbjIuZ3ppbmRleF0pLCBuMi5nemluZGV4Kys7CiAgICAgICAgICAgICAgbjIuZ3poZWFkLmhjcmMgJiYgbjIucGVuZGluZyA+IGkyICYmIChlMi5hZGxlciA9IHAoZTIuYWRsZXIsIG4yLnBlbmRpbmdfYnVmLCBuMi5wZW5kaW5nIC0gaTIsIGkyKSksIG4yLmd6aW5kZXggPT09IG4yLmd6aGVhZC5leHRyYS5sZW5ndGggJiYgKG4yLmd6aW5kZXggPSAwLCBuMi5zdGF0dXMgPSA3Myk7CiAgICAgICAgICAgIH0gZWxzZQogICAgICAgICAgICAgIG4yLnN0YXR1cyA9IDczOwogICAgICAgICAgaWYgKDczID09PSBuMi5zdGF0dXMpCiAgICAgICAgICAgIGlmIChuMi5nemhlYWQubmFtZSkgewogICAgICAgICAgICAgIGkyID0gbjIucGVuZGluZzsKICAgICAgICAgICAgICBkbyB7CiAgICAgICAgICAgICAgICBpZiAobjIucGVuZGluZyA9PT0gbjIucGVuZGluZ19idWZfc2l6ZSAmJiAobjIuZ3poZWFkLmhjcmMgJiYgbjIucGVuZGluZyA+IGkyICYmIChlMi5hZGxlciA9IHAoZTIuYWRsZXIsIG4yLnBlbmRpbmdfYnVmLCBuMi5wZW5kaW5nIC0gaTIsIGkyKSksIEYoZTIpLCBpMiA9IG4yLnBlbmRpbmcsIG4yLnBlbmRpbmcgPT09IG4yLnBlbmRpbmdfYnVmX3NpemUpKSB7CiAgICAgICAgICAgICAgICAgIHMyID0gMTsKICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBzMiA9IG4yLmd6aW5kZXggPCBuMi5nemhlYWQubmFtZS5sZW5ndGggPyAyNTUgJiBuMi5nemhlYWQubmFtZS5jaGFyQ29kZUF0KG4yLmd6aW5kZXgrKykgOiAwLCBVKG4yLCBzMik7CiAgICAgICAgICAgICAgfSB3aGlsZSAoMCAhPT0gczIpOwogICAgICAgICAgICAgIG4yLmd6aGVhZC5oY3JjICYmIG4yLnBlbmRpbmcgPiBpMiAmJiAoZTIuYWRsZXIgPSBwKGUyLmFkbGVyLCBuMi5wZW5kaW5nX2J1ZiwgbjIucGVuZGluZyAtIGkyLCBpMikpLCAwID09PSBzMiAmJiAobjIuZ3ppbmRleCA9IDAsIG4yLnN0YXR1cyA9IDkxKTsKICAgICAgICAgICAgfSBlbHNlCiAgICAgICAgICAgICAgbjIuc3RhdHVzID0gOTE7CiAgICAgICAgICBpZiAoOTEgPT09IG4yLnN0YXR1cykKICAgICAgICAgICAgaWYgKG4yLmd6aGVhZC5jb21tZW50KSB7CiAgICAgICAgICAgICAgaTIgPSBuMi5wZW5kaW5nOwogICAgICAgICAgICAgIGRvIHsKICAgICAgICAgICAgICAgIGlmIChuMi5wZW5kaW5nID09PSBuMi5wZW5kaW5nX2J1Zl9zaXplICYmIChuMi5nemhlYWQuaGNyYyAmJiBuMi5wZW5kaW5nID4gaTIgJiYgKGUyLmFkbGVyID0gcChlMi5hZGxlciwgbjIucGVuZGluZ19idWYsIG4yLnBlbmRpbmcgLSBpMiwgaTIpKSwgRihlMiksIGkyID0gbjIucGVuZGluZywgbjIucGVuZGluZyA9PT0gbjIucGVuZGluZ19idWZfc2l6ZSkpIHsKICAgICAgICAgICAgICAgICAgczIgPSAxOwogICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIHMyID0gbjIuZ3ppbmRleCA8IG4yLmd6aGVhZC5jb21tZW50Lmxlbmd0aCA/IDI1NSAmIG4yLmd6aGVhZC5jb21tZW50LmNoYXJDb2RlQXQobjIuZ3ppbmRleCsrKSA6IDAsIFUobjIsIHMyKTsKICAgICAgICAgICAgICB9IHdoaWxlICgwICE9PSBzMik7CiAgICAgICAgICAgICAgbjIuZ3poZWFkLmhjcmMgJiYgbjIucGVuZGluZyA+IGkyICYmIChlMi5hZGxlciA9IHAoZTIuYWRsZXIsIG4yLnBlbmRpbmdfYnVmLCBuMi5wZW5kaW5nIC0gaTIsIGkyKSksIDAgPT09IHMyICYmIChuMi5zdGF0dXMgPSAxMDMpOwogICAgICAgICAgICB9IGVsc2UKICAgICAgICAgICAgICBuMi5zdGF0dXMgPSAxMDM7CiAgICAgICAgICBpZiAoMTAzID09PSBuMi5zdGF0dXMgJiYgKG4yLmd6aGVhZC5oY3JjID8gKG4yLnBlbmRpbmcgKyAyID4gbjIucGVuZGluZ19idWZfc2l6ZSAmJiBGKGUyKSwgbjIucGVuZGluZyArIDIgPD0gbjIucGVuZGluZ19idWZfc2l6ZSAmJiAoVShuMiwgMjU1ICYgZTIuYWRsZXIpLCBVKG4yLCBlMi5hZGxlciA+PiA4ICYgMjU1KSwgZTIuYWRsZXIgPSAwLCBuMi5zdGF0dXMgPSBFKSkgOiBuMi5zdGF0dXMgPSBFKSwgMCAhPT0gbjIucGVuZGluZykgewogICAgICAgICAgICBpZiAoRihlMiksIDAgPT09IGUyLmF2YWlsX291dCkKICAgICAgICAgICAgICByZXR1cm4gbjIubGFzdF9mbHVzaCA9IC0xLCBtOwogICAgICAgICAgfSBlbHNlIGlmICgwID09PSBlMi5hdmFpbF9pbiAmJiBUKHQyKSA8PSBUKHIyKSAmJiB0MiAhPT0gZikKICAgICAgICAgICAgcmV0dXJuIFIoZTIsIC01KTsKICAgICAgICAgIGlmICg2NjYgPT09IG4yLnN0YXR1cyAmJiAwICE9PSBlMi5hdmFpbF9pbikKICAgICAgICAgICAgcmV0dXJuIFIoZTIsIC01KTsKICAgICAgICAgIGlmICgwICE9PSBlMi5hdmFpbF9pbiB8fCAwICE9PSBuMi5sb29rYWhlYWQgfHwgdDIgIT09IGwgJiYgNjY2ICE9PSBuMi5zdGF0dXMpIHsKICAgICAgICAgICAgdmFyIG8yID0gMiA9PT0gbjIuc3RyYXRlZ3kgPyBmdW5jdGlvbihlMywgdDMpIHsKICAgICAgICAgICAgICBmb3IgKHZhciByMzsgOyApIHsKICAgICAgICAgICAgICAgIGlmICgwID09PSBlMy5sb29rYWhlYWQgJiYgKGooZTMpLCAwID09PSBlMy5sb29rYWhlYWQpKSB7CiAgICAgICAgICAgICAgICAgIGlmICh0MyA9PT0gbCkKICAgICAgICAgICAgICAgICAgICByZXR1cm4gQTsKICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBpZiAoZTMubWF0Y2hfbGVuZ3RoID0gMCwgcjMgPSB1Ll90cl90YWxseShlMywgMCwgZTMud2luZG93W2UzLnN0cnN0YXJ0XSksIGUzLmxvb2thaGVhZC0tLCBlMy5zdHJzdGFydCsrLCByMyAmJiAoTihlMywgZmFsc2UpLCAwID09PSBlMy5zdHJtLmF2YWlsX291dCkpCiAgICAgICAgICAgICAgICAgIHJldHVybiBBOwogICAgICAgICAgICAgIH0KICAgICAgICAgICAgICByZXR1cm4gZTMuaW5zZXJ0ID0gMCwgdDMgPT09IGYgPyAoTihlMywgdHJ1ZSksIDAgPT09IGUzLnN0cm0uYXZhaWxfb3V0ID8gTyA6IEIpIDogZTMubGFzdF9saXQgJiYgKE4oZTMsIGZhbHNlKSwgMCA9PT0gZTMuc3RybS5hdmFpbF9vdXQpID8gQSA6IEk7CiAgICAgICAgICAgIH0objIsIHQyKSA6IDMgPT09IG4yLnN0cmF0ZWd5ID8gZnVuY3Rpb24oZTMsIHQzKSB7CiAgICAgICAgICAgICAgZm9yICh2YXIgcjMsIG4zLCBpMywgczMsIGEzID0gZTMud2luZG93OyA7ICkgewogICAgICAgICAgICAgICAgaWYgKGUzLmxvb2thaGVhZCA8PSBTKSB7CiAgICAgICAgICAgICAgICAgIGlmIChqKGUzKSwgZTMubG9va2FoZWFkIDw9IFMgJiYgdDMgPT09IGwpCiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEE7CiAgICAgICAgICAgICAgICAgIGlmICgwID09PSBlMy5sb29rYWhlYWQpCiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBpZiAoZTMubWF0Y2hfbGVuZ3RoID0gMCwgZTMubG9va2FoZWFkID49IHggJiYgMCA8IGUzLnN0cnN0YXJ0ICYmIChuMyA9IGEzW2kzID0gZTMuc3Ryc3RhcnQgLSAxXSkgPT09IGEzWysraTNdICYmIG4zID09PSBhM1srK2kzXSAmJiBuMyA9PT0gYTNbKytpM10pIHsKICAgICAgICAgICAgICAgICAgczMgPSBlMy5zdHJzdGFydCArIFM7CiAgICAgICAgICAgICAgICAgIGRvIHsKICAgICAgICAgICAgICAgICAgfSB3aGlsZSAobjMgPT09IGEzWysraTNdICYmIG4zID09PSBhM1srK2kzXSAmJiBuMyA9PT0gYTNbKytpM10gJiYgbjMgPT09IGEzWysraTNdICYmIG4zID09PSBhM1srK2kzXSAmJiBuMyA9PT0gYTNbKytpM10gJiYgbjMgPT09IGEzWysraTNdICYmIG4zID09PSBhM1srK2kzXSAmJiBpMyA8IHMzKTsKICAgICAgICAgICAgICAgICAgZTMubWF0Y2hfbGVuZ3RoID0gUyAtIChzMyAtIGkzKSwgZTMubWF0Y2hfbGVuZ3RoID4gZTMubG9va2FoZWFkICYmIChlMy5tYXRjaF9sZW5ndGggPSBlMy5sb29rYWhlYWQpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgaWYgKGUzLm1hdGNoX2xlbmd0aCA+PSB4ID8gKHIzID0gdS5fdHJfdGFsbHkoZTMsIDEsIGUzLm1hdGNoX2xlbmd0aCAtIHgpLCBlMy5sb29rYWhlYWQgLT0gZTMubWF0Y2hfbGVuZ3RoLCBlMy5zdHJzdGFydCArPSBlMy5tYXRjaF9sZW5ndGgsIGUzLm1hdGNoX2xlbmd0aCA9IDApIDogKHIzID0gdS5fdHJfdGFsbHkoZTMsIDAsIGUzLndpbmRvd1tlMy5zdHJzdGFydF0pLCBlMy5sb29rYWhlYWQtLSwgZTMuc3Ryc3RhcnQrKyksIHIzICYmIChOKGUzLCBmYWxzZSksIDAgPT09IGUzLnN0cm0uYXZhaWxfb3V0KSkKICAgICAgICAgICAgICAgICAgcmV0dXJuIEE7CiAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIHJldHVybiBlMy5pbnNlcnQgPSAwLCB0MyA9PT0gZiA/IChOKGUzLCB0cnVlKSwgMCA9PT0gZTMuc3RybS5hdmFpbF9vdXQgPyBPIDogQikgOiBlMy5sYXN0X2xpdCAmJiAoTihlMywgZmFsc2UpLCAwID09PSBlMy5zdHJtLmF2YWlsX291dCkgPyBBIDogSTsKICAgICAgICAgICAgfShuMiwgdDIpIDogaFtuMi5sZXZlbF0uZnVuYyhuMiwgdDIpOwogICAgICAgICAgICBpZiAobzIgIT09IE8gJiYgbzIgIT09IEIgfHwgKG4yLnN0YXR1cyA9IDY2NiksIG8yID09PSBBIHx8IG8yID09PSBPKQogICAgICAgICAgICAgIHJldHVybiAwID09PSBlMi5hdmFpbF9vdXQgJiYgKG4yLmxhc3RfZmx1c2ggPSAtMSksIG07CiAgICAgICAgICAgIGlmIChvMiA9PT0gSSAmJiAoMSA9PT0gdDIgPyB1Ll90cl9hbGlnbihuMikgOiA1ICE9PSB0MiAmJiAodS5fdHJfc3RvcmVkX2Jsb2NrKG4yLCAwLCAwLCBmYWxzZSksIDMgPT09IHQyICYmIChEKG4yLmhlYWQpLCAwID09PSBuMi5sb29rYWhlYWQgJiYgKG4yLnN0cnN0YXJ0ID0gMCwgbjIuYmxvY2tfc3RhcnQgPSAwLCBuMi5pbnNlcnQgPSAwKSkpLCBGKGUyKSwgMCA9PT0gZTIuYXZhaWxfb3V0KSkKICAgICAgICAgICAgICByZXR1cm4gbjIubGFzdF9mbHVzaCA9IC0xLCBtOwogICAgICAgICAgfQogICAgICAgICAgcmV0dXJuIHQyICE9PSBmID8gbSA6IG4yLndyYXAgPD0gMCA/IDEgOiAoMiA9PT0gbjIud3JhcCA/IChVKG4yLCAyNTUgJiBlMi5hZGxlciksIFUobjIsIGUyLmFkbGVyID4+IDggJiAyNTUpLCBVKG4yLCBlMi5hZGxlciA+PiAxNiAmIDI1NSksIFUobjIsIGUyLmFkbGVyID4+IDI0ICYgMjU1KSwgVShuMiwgMjU1ICYgZTIudG90YWxfaW4pLCBVKG4yLCBlMi50b3RhbF9pbiA+PiA4ICYgMjU1KSwgVShuMiwgZTIudG90YWxfaW4gPj4gMTYgJiAyNTUpLCBVKG4yLCBlMi50b3RhbF9pbiA+PiAyNCAmIDI1NSkpIDogKFAobjIsIGUyLmFkbGVyID4+PiAxNiksIFAobjIsIDY1NTM1ICYgZTIuYWRsZXIpKSwgRihlMiksIDAgPCBuMi53cmFwICYmIChuMi53cmFwID0gLW4yLndyYXApLCAwICE9PSBuMi5wZW5kaW5nID8gbSA6IDEpOwogICAgICAgIH0sIHIuZGVmbGF0ZUVuZCA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICB2YXIgdDI7CiAgICAgICAgICByZXR1cm4gZTIgJiYgZTIuc3RhdGUgPyAodDIgPSBlMi5zdGF0ZS5zdGF0dXMpICE9PSBDICYmIDY5ICE9PSB0MiAmJiA3MyAhPT0gdDIgJiYgOTEgIT09IHQyICYmIDEwMyAhPT0gdDIgJiYgdDIgIT09IEUgJiYgNjY2ICE9PSB0MiA/IFIoZTIsIF8pIDogKGUyLnN0YXRlID0gbnVsbCwgdDIgPT09IEUgPyBSKGUyLCAtMykgOiBtKSA6IF87CiAgICAgICAgfSwgci5kZWZsYXRlU2V0RGljdGlvbmFyeSA9IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgdmFyIHIyLCBuMiwgaTIsIHMyLCBhMiwgbzIsIGgyLCB1MiwgbDIgPSB0Mi5sZW5ndGg7CiAgICAgICAgICBpZiAoIWUyIHx8ICFlMi5zdGF0ZSkKICAgICAgICAgICAgcmV0dXJuIF87CiAgICAgICAgICBpZiAoMiA9PT0gKHMyID0gKHIyID0gZTIuc3RhdGUpLndyYXApIHx8IDEgPT09IHMyICYmIHIyLnN0YXR1cyAhPT0gQyB8fCByMi5sb29rYWhlYWQpCiAgICAgICAgICAgIHJldHVybiBfOwogICAgICAgICAgZm9yICgxID09PSBzMiAmJiAoZTIuYWRsZXIgPSBkKGUyLmFkbGVyLCB0MiwgbDIsIDApKSwgcjIud3JhcCA9IDAsIGwyID49IHIyLndfc2l6ZSAmJiAoMCA9PT0gczIgJiYgKEQocjIuaGVhZCksIHIyLnN0cnN0YXJ0ID0gMCwgcjIuYmxvY2tfc3RhcnQgPSAwLCByMi5pbnNlcnQgPSAwKSwgdTIgPSBuZXcgYy5CdWY4KHIyLndfc2l6ZSksIGMuYXJyYXlTZXQodTIsIHQyLCBsMiAtIHIyLndfc2l6ZSwgcjIud19zaXplLCAwKSwgdDIgPSB1MiwgbDIgPSByMi53X3NpemUpLCBhMiA9IGUyLmF2YWlsX2luLCBvMiA9IGUyLm5leHRfaW4sIGgyID0gZTIuaW5wdXQsIGUyLmF2YWlsX2luID0gbDIsIGUyLm5leHRfaW4gPSAwLCBlMi5pbnB1dCA9IHQyLCBqKHIyKTsgcjIubG9va2FoZWFkID49IHg7ICkgewogICAgICAgICAgICBmb3IgKG4yID0gcjIuc3Ryc3RhcnQsIGkyID0gcjIubG9va2FoZWFkIC0gKHggLSAxKTsgcjIuaW5zX2ggPSAocjIuaW5zX2ggPDwgcjIuaGFzaF9zaGlmdCBeIHIyLndpbmRvd1tuMiArIHggLSAxXSkgJiByMi5oYXNoX21hc2ssIHIyLnByZXZbbjIgJiByMi53X21hc2tdID0gcjIuaGVhZFtyMi5pbnNfaF0sIHIyLmhlYWRbcjIuaW5zX2hdID0gbjIsIG4yKyssIC0taTI7ICkKICAgICAgICAgICAgICA7CiAgICAgICAgICAgIHIyLnN0cnN0YXJ0ID0gbjIsIHIyLmxvb2thaGVhZCA9IHggLSAxLCBqKHIyKTsKICAgICAgICAgIH0KICAgICAgICAgIHJldHVybiByMi5zdHJzdGFydCArPSByMi5sb29rYWhlYWQsIHIyLmJsb2NrX3N0YXJ0ID0gcjIuc3Ryc3RhcnQsIHIyLmluc2VydCA9IHIyLmxvb2thaGVhZCwgcjIubG9va2FoZWFkID0gMCwgcjIubWF0Y2hfbGVuZ3RoID0gcjIucHJldl9sZW5ndGggPSB4IC0gMSwgcjIubWF0Y2hfYXZhaWxhYmxlID0gMCwgZTIubmV4dF9pbiA9IG8yLCBlMi5pbnB1dCA9IGgyLCBlMi5hdmFpbF9pbiA9IGEyLCByMi53cmFwID0gczIsIG07CiAgICAgICAgfSwgci5kZWZsYXRlSW5mbyA9ICJwYWtvIGRlZmxhdGUgKGZyb20gTm9kZWNhIHByb2plY3QpIjsKICAgICAgfSwgeyAiLi4vdXRpbHMvY29tbW9uIjogNDEsICIuL2FkbGVyMzIiOiA0MywgIi4vY3JjMzIiOiA0NSwgIi4vbWVzc2FnZXMiOiA1MSwgIi4vdHJlZXMiOiA1MiB9XSwgNDc6IFtmdW5jdGlvbihlLCB0LCByKSB7CiAgICAgICAgdC5leHBvcnRzID0gZnVuY3Rpb24oKSB7CiAgICAgICAgICB0aGlzLnRleHQgPSAwLCB0aGlzLnRpbWUgPSAwLCB0aGlzLnhmbGFncyA9IDAsIHRoaXMub3MgPSAwLCB0aGlzLmV4dHJhID0gbnVsbCwgdGhpcy5leHRyYV9sZW4gPSAwLCB0aGlzLm5hbWUgPSAiIiwgdGhpcy5jb21tZW50ID0gIiIsIHRoaXMuaGNyYyA9IDAsIHRoaXMuZG9uZSA9IGZhbHNlOwogICAgICAgIH07CiAgICAgIH0sIHt9XSwgNDg6IFtmdW5jdGlvbihlLCB0LCByKSB7CiAgICAgICAgdC5leHBvcnRzID0gZnVuY3Rpb24oZTIsIHQyKSB7CiAgICAgICAgICB2YXIgcjIsIG4sIGksIHMsIGEsIG8sIGgsIHUsIGwsIGYsIGMsIGQsIHAsIG0sIF8sIGcsIGIsIHYsIHksIHcsIGssIHgsIFMsIHosIEM7CiAgICAgICAgICByMiA9IGUyLnN0YXRlLCBuID0gZTIubmV4dF9pbiwgeiA9IGUyLmlucHV0LCBpID0gbiArIChlMi5hdmFpbF9pbiAtIDUpLCBzID0gZTIubmV4dF9vdXQsIEMgPSBlMi5vdXRwdXQsIGEgPSBzIC0gKHQyIC0gZTIuYXZhaWxfb3V0KSwgbyA9IHMgKyAoZTIuYXZhaWxfb3V0IC0gMjU3KSwgaCA9IHIyLmRtYXgsIHUgPSByMi53c2l6ZSwgbCA9IHIyLndoYXZlLCBmID0gcjIud25leHQsIGMgPSByMi53aW5kb3csIGQgPSByMi5ob2xkLCBwID0gcjIuYml0cywgbSA9IHIyLmxlbmNvZGUsIF8gPSByMi5kaXN0Y29kZSwgZyA9ICgxIDw8IHIyLmxlbmJpdHMpIC0gMSwgYiA9ICgxIDw8IHIyLmRpc3RiaXRzKSAtIDE7CiAgICAgICAgICBlOgogICAgICAgICAgICBkbyB7CiAgICAgICAgICAgICAgcCA8IDE1ICYmIChkICs9IHpbbisrXSA8PCBwLCBwICs9IDgsIGQgKz0geltuKytdIDw8IHAsIHAgKz0gOCksIHYgPSBtW2QgJiBnXTsKICAgICAgICAgICAgICB0OgogICAgICAgICAgICAgICAgZm9yICg7IDsgKSB7CiAgICAgICAgICAgICAgICAgIGlmIChkID4+Pj0geSA9IHYgPj4+IDI0LCBwIC09IHksIDAgPT09ICh5ID0gdiA+Pj4gMTYgJiAyNTUpKQogICAgICAgICAgICAgICAgICAgIENbcysrXSA9IDY1NTM1ICYgdjsKICAgICAgICAgICAgICAgICAgZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgaWYgKCEoMTYgJiB5KSkgewogICAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT0gKDY0ICYgeSkpIHsKICAgICAgICAgICAgICAgICAgICAgICAgdiA9IG1bKDY1NTM1ICYgdikgKyAoZCAmICgxIDw8IHkpIC0gMSldOwogICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZSB0OwogICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgaWYgKDMyICYgeSkgewogICAgICAgICAgICAgICAgICAgICAgICByMi5tb2RlID0gMTI7CiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGU7CiAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICBlMi5tc2cgPSAiaW52YWxpZCBsaXRlcmFsL2xlbmd0aCBjb2RlIiwgcjIubW9kZSA9IDMwOwogICAgICAgICAgICAgICAgICAgICAgYnJlYWsgZTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgdyA9IDY1NTM1ICYgdiwgKHkgJj0gMTUpICYmIChwIDwgeSAmJiAoZCArPSB6W24rK10gPDwgcCwgcCArPSA4KSwgdyArPSBkICYgKDEgPDwgeSkgLSAxLCBkID4+Pj0geSwgcCAtPSB5KSwgcCA8IDE1ICYmIChkICs9IHpbbisrXSA8PCBwLCBwICs9IDgsIGQgKz0geltuKytdIDw8IHAsIHAgKz0gOCksIHYgPSBfW2QgJiBiXTsKICAgICAgICAgICAgICAgICAgICByOgogICAgICAgICAgICAgICAgICAgICAgZm9yICg7IDsgKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkID4+Pj0geSA9IHYgPj4+IDI0LCBwIC09IHksICEoMTYgJiAoeSA9IHYgPj4+IDE2ICYgMjU1KSkpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PSAoNjQgJiB5KSkgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgdiA9IF9bKDY1NTM1ICYgdikgKyAoZCAmICgxIDw8IHkpIC0gMSldOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWUgcjsKICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgZTIubXNnID0gImludmFsaWQgZGlzdGFuY2UgY29kZSIsIHIyLm1vZGUgPSAzMDsKICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhayBlOwogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrID0gNjU1MzUgJiB2LCBwIDwgKHkgJj0gMTUpICYmIChkICs9IHpbbisrXSA8PCBwLCAocCArPSA4KSA8IHkgJiYgKGQgKz0geltuKytdIDw8IHAsIHAgKz0gOCkpLCBoIDwgKGsgKz0gZCAmICgxIDw8IHkpIC0gMSkpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICBlMi5tc2cgPSAiaW52YWxpZCBkaXN0YW5jZSB0b28gZmFyIGJhY2siLCByMi5tb2RlID0gMzA7CiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgZTsKICAgICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgICBpZiAoZCA+Pj49IHksIHAgLT0geSwgKHkgPSBzIC0gYSkgPCBrKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGwgPCAoeSA9IGsgLSB5KSAmJiByMi5zYW5lKSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlMi5tc2cgPSAiaW52YWxpZCBkaXN0YW5jZSB0b28gZmFyIGJhY2siLCByMi5tb2RlID0gMzA7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhayBlOwogICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoUyA9IGMsICh4ID0gMCkgPT09IGYpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4ICs9IHUgLSB5LCB5IDwgdykgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHcgLT0geTsgQ1tzKytdID0gY1t4KytdLCAtLXk7ICkKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHggPSBzIC0gaywgUyA9IEM7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmIDwgeSkgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHggKz0gdSArIGYgLSB5LCAoeSAtPSBmKSA8IHcpIHsKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh3IC09IHk7IENbcysrXSA9IGNbeCsrXSwgLS15OyApCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeCA9IDAsIGYgPCB3KSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh3IC09IHkgPSBmOyBDW3MrK10gPSBjW3grK10sIC0teTsgKQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHggPSBzIC0gaywgUyA9IEM7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHggKz0gZiAtIHksIHkgPCB3KSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHcgLT0geTsgQ1tzKytdID0gY1t4KytdLCAtLXk7ICkKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOwogICAgICAgICAgICAgICAgICAgICAgICAgICAgeCA9IHMgLSBrLCBTID0gQzsKICAgICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICg7IDIgPCB3OyApCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDW3MrK10gPSBTW3grK10sIENbcysrXSA9IFNbeCsrXSwgQ1tzKytdID0gU1t4KytdLCB3IC09IDM7CiAgICAgICAgICAgICAgICAgICAgICAgICAgdyAmJiAoQ1tzKytdID0gU1t4KytdLCAxIDwgdyAmJiAoQ1tzKytdID0gU1t4KytdKSk7CiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh4ID0gcyAtIGs7IENbcysrXSA9IENbeCsrXSwgQ1tzKytdID0gQ1t4KytdLCBDW3MrK10gPSBDW3grK10sIDIgPCAodyAtPSAzKTsgKQogICAgICAgICAgICAgICAgICAgICAgICAgICAgOwogICAgICAgICAgICAgICAgICAgICAgICAgIHcgJiYgKENbcysrXSA9IENbeCsrXSwgMSA8IHcgJiYgKENbcysrXSA9IENbeCsrXSkpOwogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9IHdoaWxlIChuIDwgaSAmJiBzIDwgbyk7CiAgICAgICAgICBuIC09IHcgPSBwID4+IDMsIGQgJj0gKDEgPDwgKHAgLT0gdyA8PCAzKSkgLSAxLCBlMi5uZXh0X2luID0gbiwgZTIubmV4dF9vdXQgPSBzLCBlMi5hdmFpbF9pbiA9IG4gPCBpID8gaSAtIG4gKyA1IDogNSAtIChuIC0gaSksIGUyLmF2YWlsX291dCA9IHMgPCBvID8gbyAtIHMgKyAyNTcgOiAyNTcgLSAocyAtIG8pLCByMi5ob2xkID0gZCwgcjIuYml0cyA9IHA7CiAgICAgICAgfTsKICAgICAgfSwge31dLCA0OTogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICB2YXIgSSA9IGUoIi4uL3V0aWxzL2NvbW1vbiIpLCBPID0gZSgiLi9hZGxlcjMyIiksIEIgPSBlKCIuL2NyYzMyIiksIFIgPSBlKCIuL2luZmZhc3QiKSwgVCA9IGUoIi4vaW5mdHJlZXMiKSwgRCA9IDEsIEYgPSAyLCBOID0gMCwgVSA9IC0yLCBQID0gMSwgbiA9IDg1MiwgaSA9IDU5MjsKICAgICAgICBmdW5jdGlvbiBMKGUyKSB7CiAgICAgICAgICByZXR1cm4gKGUyID4+PiAyNCAmIDI1NSkgKyAoZTIgPj4+IDggJiA2NTI4MCkgKyAoKDY1MjgwICYgZTIpIDw8IDgpICsgKCgyNTUgJiBlMikgPDwgMjQpOwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBzKCkgewogICAgICAgICAgdGhpcy5tb2RlID0gMCwgdGhpcy5sYXN0ID0gZmFsc2UsIHRoaXMud3JhcCA9IDAsIHRoaXMuaGF2ZWRpY3QgPSBmYWxzZSwgdGhpcy5mbGFncyA9IDAsIHRoaXMuZG1heCA9IDAsIHRoaXMuY2hlY2sgPSAwLCB0aGlzLnRvdGFsID0gMCwgdGhpcy5oZWFkID0gbnVsbCwgdGhpcy53Yml0cyA9IDAsIHRoaXMud3NpemUgPSAwLCB0aGlzLndoYXZlID0gMCwgdGhpcy53bmV4dCA9IDAsIHRoaXMud2luZG93ID0gbnVsbCwgdGhpcy5ob2xkID0gMCwgdGhpcy5iaXRzID0gMCwgdGhpcy5sZW5ndGggPSAwLCB0aGlzLm9mZnNldCA9IDAsIHRoaXMuZXh0cmEgPSAwLCB0aGlzLmxlbmNvZGUgPSBudWxsLCB0aGlzLmRpc3Rjb2RlID0gbnVsbCwgdGhpcy5sZW5iaXRzID0gMCwgdGhpcy5kaXN0Yml0cyA9IDAsIHRoaXMubmNvZGUgPSAwLCB0aGlzLm5sZW4gPSAwLCB0aGlzLm5kaXN0ID0gMCwgdGhpcy5oYXZlID0gMCwgdGhpcy5uZXh0ID0gbnVsbCwgdGhpcy5sZW5zID0gbmV3IEkuQnVmMTYoMzIwKSwgdGhpcy53b3JrID0gbmV3IEkuQnVmMTYoMjg4KSwgdGhpcy5sZW5keW4gPSBudWxsLCB0aGlzLmRpc3RkeW4gPSBudWxsLCB0aGlzLnNhbmUgPSAwLCB0aGlzLmJhY2sgPSAwLCB0aGlzLndhcyA9IDA7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIGEoZTIpIHsKICAgICAgICAgIHZhciB0MjsKICAgICAgICAgIHJldHVybiBlMiAmJiBlMi5zdGF0ZSA/ICh0MiA9IGUyLnN0YXRlLCBlMi50b3RhbF9pbiA9IGUyLnRvdGFsX291dCA9IHQyLnRvdGFsID0gMCwgZTIubXNnID0gIiIsIHQyLndyYXAgJiYgKGUyLmFkbGVyID0gMSAmIHQyLndyYXApLCB0Mi5tb2RlID0gUCwgdDIubGFzdCA9IDAsIHQyLmhhdmVkaWN0ID0gMCwgdDIuZG1heCA9IDMyNzY4LCB0Mi5oZWFkID0gbnVsbCwgdDIuaG9sZCA9IDAsIHQyLmJpdHMgPSAwLCB0Mi5sZW5jb2RlID0gdDIubGVuZHluID0gbmV3IEkuQnVmMzIobiksIHQyLmRpc3Rjb2RlID0gdDIuZGlzdGR5biA9IG5ldyBJLkJ1ZjMyKGkpLCB0Mi5zYW5lID0gMSwgdDIuYmFjayA9IC0xLCBOKSA6IFU7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIG8oZTIpIHsKICAgICAgICAgIHZhciB0MjsKICAgICAgICAgIHJldHVybiBlMiAmJiBlMi5zdGF0ZSA/ICgodDIgPSBlMi5zdGF0ZSkud3NpemUgPSAwLCB0Mi53aGF2ZSA9IDAsIHQyLnduZXh0ID0gMCwgYShlMikpIDogVTsKICAgICAgICB9CiAgICAgICAgZnVuY3Rpb24gaChlMiwgdDIpIHsKICAgICAgICAgIHZhciByMiwgbjI7CiAgICAgICAgICByZXR1cm4gZTIgJiYgZTIuc3RhdGUgPyAobjIgPSBlMi5zdGF0ZSwgdDIgPCAwID8gKHIyID0gMCwgdDIgPSAtdDIpIDogKHIyID0gMSArICh0MiA+PiA0KSwgdDIgPCA0OCAmJiAodDIgJj0gMTUpKSwgdDIgJiYgKHQyIDwgOCB8fCAxNSA8IHQyKSA/IFUgOiAobnVsbCAhPT0gbjIud2luZG93ICYmIG4yLndiaXRzICE9PSB0MiAmJiAobjIud2luZG93ID0gbnVsbCksIG4yLndyYXAgPSByMiwgbjIud2JpdHMgPSB0MiwgbyhlMikpKSA6IFU7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIHUoZTIsIHQyKSB7CiAgICAgICAgICB2YXIgcjIsIG4yOwogICAgICAgICAgcmV0dXJuIGUyID8gKG4yID0gbmV3IHMoKSwgKGUyLnN0YXRlID0gbjIpLndpbmRvdyA9IG51bGwsIChyMiA9IGgoZTIsIHQyKSkgIT09IE4gJiYgKGUyLnN0YXRlID0gbnVsbCksIHIyKSA6IFU7CiAgICAgICAgfQogICAgICAgIHZhciBsLCBmLCBjID0gdHJ1ZTsKICAgICAgICBmdW5jdGlvbiBqKGUyKSB7CiAgICAgICAgICBpZiAoYykgewogICAgICAgICAgICB2YXIgdDI7CiAgICAgICAgICAgIGZvciAobCA9IG5ldyBJLkJ1ZjMyKDUxMiksIGYgPSBuZXcgSS5CdWYzMigzMiksIHQyID0gMDsgdDIgPCAxNDQ7ICkKICAgICAgICAgICAgICBlMi5sZW5zW3QyKytdID0gODsKICAgICAgICAgICAgZm9yICg7IHQyIDwgMjU2OyApCiAgICAgICAgICAgICAgZTIubGVuc1t0MisrXSA9IDk7CiAgICAgICAgICAgIGZvciAoOyB0MiA8IDI4MDsgKQogICAgICAgICAgICAgIGUyLmxlbnNbdDIrK10gPSA3OwogICAgICAgICAgICBmb3IgKDsgdDIgPCAyODg7ICkKICAgICAgICAgICAgICBlMi5sZW5zW3QyKytdID0gODsKICAgICAgICAgICAgZm9yIChUKEQsIGUyLmxlbnMsIDAsIDI4OCwgbCwgMCwgZTIud29yaywgeyBiaXRzOiA5IH0pLCB0MiA9IDA7IHQyIDwgMzI7ICkKICAgICAgICAgICAgICBlMi5sZW5zW3QyKytdID0gNTsKICAgICAgICAgICAgVChGLCBlMi5sZW5zLCAwLCAzMiwgZiwgMCwgZTIud29yaywgeyBiaXRzOiA1IH0pLCBjID0gZmFsc2U7CiAgICAgICAgICB9CiAgICAgICAgICBlMi5sZW5jb2RlID0gbCwgZTIubGVuYml0cyA9IDksIGUyLmRpc3Rjb2RlID0gZiwgZTIuZGlzdGJpdHMgPSA1OwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBaKGUyLCB0MiwgcjIsIG4yKSB7CiAgICAgICAgICB2YXIgaTIsIHMyID0gZTIuc3RhdGU7CiAgICAgICAgICByZXR1cm4gbnVsbCA9PT0gczIud2luZG93ICYmIChzMi53c2l6ZSA9IDEgPDwgczIud2JpdHMsIHMyLnduZXh0ID0gMCwgczIud2hhdmUgPSAwLCBzMi53aW5kb3cgPSBuZXcgSS5CdWY4KHMyLndzaXplKSksIG4yID49IHMyLndzaXplID8gKEkuYXJyYXlTZXQoczIud2luZG93LCB0MiwgcjIgLSBzMi53c2l6ZSwgczIud3NpemUsIDApLCBzMi53bmV4dCA9IDAsIHMyLndoYXZlID0gczIud3NpemUpIDogKG4yIDwgKGkyID0gczIud3NpemUgLSBzMi53bmV4dCkgJiYgKGkyID0gbjIpLCBJLmFycmF5U2V0KHMyLndpbmRvdywgdDIsIHIyIC0gbjIsIGkyLCBzMi53bmV4dCksIChuMiAtPSBpMikgPyAoSS5hcnJheVNldChzMi53aW5kb3csIHQyLCByMiAtIG4yLCBuMiwgMCksIHMyLnduZXh0ID0gbjIsIHMyLndoYXZlID0gczIud3NpemUpIDogKHMyLnduZXh0ICs9IGkyLCBzMi53bmV4dCA9PT0gczIud3NpemUgJiYgKHMyLnduZXh0ID0gMCksIHMyLndoYXZlIDwgczIud3NpemUgJiYgKHMyLndoYXZlICs9IGkyKSkpLCAwOwogICAgICAgIH0KICAgICAgICByLmluZmxhdGVSZXNldCA9IG8sIHIuaW5mbGF0ZVJlc2V0MiA9IGgsIHIuaW5mbGF0ZVJlc2V0S2VlcCA9IGEsIHIuaW5mbGF0ZUluaXQgPSBmdW5jdGlvbihlMikgewogICAgICAgICAgcmV0dXJuIHUoZTIsIDE1KTsKICAgICAgICB9LCByLmluZmxhdGVJbml0MiA9IHUsIHIuaW5mbGF0ZSA9IGZ1bmN0aW9uKGUyLCB0MikgewogICAgICAgICAgdmFyIHIyLCBuMiwgaTIsIHMyLCBhMiwgbzIsIGgyLCB1MiwgbDIsIGYyLCBjMiwgZCwgcCwgbSwgXywgZywgYiwgdiwgeSwgdywgaywgeCwgUywgeiwgQyA9IDAsIEUgPSBuZXcgSS5CdWY4KDQpLCBBID0gWzE2LCAxNywgMTgsIDAsIDgsIDcsIDksIDYsIDEwLCA1LCAxMSwgNCwgMTIsIDMsIDEzLCAyLCAxNCwgMSwgMTVdOwogICAgICAgICAgaWYgKCFlMiB8fCAhZTIuc3RhdGUgfHwgIWUyLm91dHB1dCB8fCAhZTIuaW5wdXQgJiYgMCAhPT0gZTIuYXZhaWxfaW4pCiAgICAgICAgICAgIHJldHVybiBVOwogICAgICAgICAgMTIgPT09IChyMiA9IGUyLnN0YXRlKS5tb2RlICYmIChyMi5tb2RlID0gMTMpLCBhMiA9IGUyLm5leHRfb3V0LCBpMiA9IGUyLm91dHB1dCwgaDIgPSBlMi5hdmFpbF9vdXQsIHMyID0gZTIubmV4dF9pbiwgbjIgPSBlMi5pbnB1dCwgbzIgPSBlMi5hdmFpbF9pbiwgdTIgPSByMi5ob2xkLCBsMiA9IHIyLmJpdHMsIGYyID0gbzIsIGMyID0gaDIsIHggPSBOOwogICAgICAgICAgZToKICAgICAgICAgICAgZm9yICg7IDsgKQogICAgICAgICAgICAgIHN3aXRjaCAocjIubW9kZSkgewogICAgICAgICAgICAgICAgY2FzZSBQOgogICAgICAgICAgICAgICAgICBpZiAoMCA9PT0gcjIud3JhcCkgewogICAgICAgICAgICAgICAgICAgIHIyLm1vZGUgPSAxMzsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICBmb3IgKDsgbDIgPCAxNjsgKSB7CiAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT09IG8yKQogICAgICAgICAgICAgICAgICAgICAgYnJlYWsgZTsKICAgICAgICAgICAgICAgICAgICBvMi0tLCB1MiArPSBuMltzMisrXSA8PCBsMiwgbDIgKz0gODsKICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICBpZiAoMiAmIHIyLndyYXAgJiYgMzU2MTUgPT09IHUyKSB7CiAgICAgICAgICAgICAgICAgICAgRVtyMi5jaGVjayA9IDBdID0gMjU1ICYgdTIsIEVbMV0gPSB1MiA+Pj4gOCAmIDI1NSwgcjIuY2hlY2sgPSBCKHIyLmNoZWNrLCBFLCAyLCAwKSwgbDIgPSB1MiA9IDAsIHIyLm1vZGUgPSAyOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgIGlmIChyMi5mbGFncyA9IDAsIHIyLmhlYWQgJiYgKHIyLmhlYWQuZG9uZSA9IGZhbHNlKSwgISgxICYgcjIud3JhcCkgfHwgKCgoMjU1ICYgdTIpIDw8IDgpICsgKHUyID4+IDgpKSAlIDMxKSB7CiAgICAgICAgICAgICAgICAgICAgZTIubXNnID0gImluY29ycmVjdCBoZWFkZXIgY2hlY2siLCByMi5tb2RlID0gMzA7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgaWYgKDggIT0gKDE1ICYgdTIpKSB7CiAgICAgICAgICAgICAgICAgICAgZTIubXNnID0gInVua25vd24gY29tcHJlc3Npb24gbWV0aG9kIiwgcjIubW9kZSA9IDMwOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgIGlmIChsMiAtPSA0LCBrID0gOCArICgxNSAmICh1MiA+Pj49IDQpKSwgMCA9PT0gcjIud2JpdHMpCiAgICAgICAgICAgICAgICAgICAgcjIud2JpdHMgPSBrOwogICAgICAgICAgICAgICAgICBlbHNlIGlmIChrID4gcjIud2JpdHMpIHsKICAgICAgICAgICAgICAgICAgICBlMi5tc2cgPSAiaW52YWxpZCB3aW5kb3cgc2l6ZSIsIHIyLm1vZGUgPSAzMDsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICByMi5kbWF4ID0gMSA8PCBrLCBlMi5hZGxlciA9IHIyLmNoZWNrID0gMSwgcjIubW9kZSA9IDUxMiAmIHUyID8gMTAgOiAxMiwgbDIgPSB1MiA9IDA7CiAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgY2FzZSAyOgogICAgICAgICAgICAgICAgICBmb3IgKDsgbDIgPCAxNjsgKSB7CiAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT09IG8yKQogICAgICAgICAgICAgICAgICAgICAgYnJlYWsgZTsKICAgICAgICAgICAgICAgICAgICBvMi0tLCB1MiArPSBuMltzMisrXSA8PCBsMiwgbDIgKz0gODsKICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICBpZiAocjIuZmxhZ3MgPSB1MiwgOCAhPSAoMjU1ICYgcjIuZmxhZ3MpKSB7CiAgICAgICAgICAgICAgICAgICAgZTIubXNnID0gInVua25vd24gY29tcHJlc3Npb24gbWV0aG9kIiwgcjIubW9kZSA9IDMwOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgIGlmICg1NzM0NCAmIHIyLmZsYWdzKSB7CiAgICAgICAgICAgICAgICAgICAgZTIubXNnID0gInVua25vd24gaGVhZGVyIGZsYWdzIHNldCIsIHIyLm1vZGUgPSAzMDsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICByMi5oZWFkICYmIChyMi5oZWFkLnRleHQgPSB1MiA+PiA4ICYgMSksIDUxMiAmIHIyLmZsYWdzICYmIChFWzBdID0gMjU1ICYgdTIsIEVbMV0gPSB1MiA+Pj4gOCAmIDI1NSwgcjIuY2hlY2sgPSBCKHIyLmNoZWNrLCBFLCAyLCAwKSksIGwyID0gdTIgPSAwLCByMi5tb2RlID0gMzsKICAgICAgICAgICAgICAgIGNhc2UgMzoKICAgICAgICAgICAgICAgICAgZm9yICg7IGwyIDwgMzI7ICkgewogICAgICAgICAgICAgICAgICAgIGlmICgwID09PSBvMikKICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGU7CiAgICAgICAgICAgICAgICAgICAgbzItLSwgdTIgKz0gbjJbczIrK10gPDwgbDIsIGwyICs9IDg7CiAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgcjIuaGVhZCAmJiAocjIuaGVhZC50aW1lID0gdTIpLCA1MTIgJiByMi5mbGFncyAmJiAoRVswXSA9IDI1NSAmIHUyLCBFWzFdID0gdTIgPj4+IDggJiAyNTUsIEVbMl0gPSB1MiA+Pj4gMTYgJiAyNTUsIEVbM10gPSB1MiA+Pj4gMjQgJiAyNTUsIHIyLmNoZWNrID0gQihyMi5jaGVjaywgRSwgNCwgMCkpLCBsMiA9IHUyID0gMCwgcjIubW9kZSA9IDQ7CiAgICAgICAgICAgICAgICBjYXNlIDQ6CiAgICAgICAgICAgICAgICAgIGZvciAoOyBsMiA8IDE2OyApIHsKICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PT0gbzIpCiAgICAgICAgICAgICAgICAgICAgICBicmVhayBlOwogICAgICAgICAgICAgICAgICAgIG8yLS0sIHUyICs9IG4yW3MyKytdIDw8IGwyLCBsMiArPSA4OwogICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgIHIyLmhlYWQgJiYgKHIyLmhlYWQueGZsYWdzID0gMjU1ICYgdTIsIHIyLmhlYWQub3MgPSB1MiA+PiA4KSwgNTEyICYgcjIuZmxhZ3MgJiYgKEVbMF0gPSAyNTUgJiB1MiwgRVsxXSA9IHUyID4+PiA4ICYgMjU1LCByMi5jaGVjayA9IEIocjIuY2hlY2ssIEUsIDIsIDApKSwgbDIgPSB1MiA9IDAsIHIyLm1vZGUgPSA1OwogICAgICAgICAgICAgICAgY2FzZSA1OgogICAgICAgICAgICAgICAgICBpZiAoMTAyNCAmIHIyLmZsYWdzKSB7CiAgICAgICAgICAgICAgICAgICAgZm9yICg7IGwyIDwgMTY7ICkgewogICAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT09IG8yKQogICAgICAgICAgICAgICAgICAgICAgICBicmVhayBlOwogICAgICAgICAgICAgICAgICAgICAgbzItLSwgdTIgKz0gbjJbczIrK10gPDwgbDIsIGwyICs9IDg7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIHIyLmxlbmd0aCA9IHUyLCByMi5oZWFkICYmIChyMi5oZWFkLmV4dHJhX2xlbiA9IHUyKSwgNTEyICYgcjIuZmxhZ3MgJiYgKEVbMF0gPSAyNTUgJiB1MiwgRVsxXSA9IHUyID4+PiA4ICYgMjU1LCByMi5jaGVjayA9IEIocjIuY2hlY2ssIEUsIDIsIDApKSwgbDIgPSB1MiA9IDA7CiAgICAgICAgICAgICAgICAgIH0gZWxzZQogICAgICAgICAgICAgICAgICAgIHIyLmhlYWQgJiYgKHIyLmhlYWQuZXh0cmEgPSBudWxsKTsKICAgICAgICAgICAgICAgICAgcjIubW9kZSA9IDY7CiAgICAgICAgICAgICAgICBjYXNlIDY6CiAgICAgICAgICAgICAgICAgIGlmICgxMDI0ICYgcjIuZmxhZ3MgJiYgKG8yIDwgKGQgPSByMi5sZW5ndGgpICYmIChkID0gbzIpLCBkICYmIChyMi5oZWFkICYmIChrID0gcjIuaGVhZC5leHRyYV9sZW4gLSByMi5sZW5ndGgsIHIyLmhlYWQuZXh0cmEgfHwgKHIyLmhlYWQuZXh0cmEgPSBuZXcgQXJyYXkocjIuaGVhZC5leHRyYV9sZW4pKSwgSS5hcnJheVNldChyMi5oZWFkLmV4dHJhLCBuMiwgczIsIGQsIGspKSwgNTEyICYgcjIuZmxhZ3MgJiYgKHIyLmNoZWNrID0gQihyMi5jaGVjaywgbjIsIGQsIHMyKSksIG8yIC09IGQsIHMyICs9IGQsIHIyLmxlbmd0aCAtPSBkKSwgcjIubGVuZ3RoKSkKICAgICAgICAgICAgICAgICAgICBicmVhayBlOwogICAgICAgICAgICAgICAgICByMi5sZW5ndGggPSAwLCByMi5tb2RlID0gNzsKICAgICAgICAgICAgICAgIGNhc2UgNzoKICAgICAgICAgICAgICAgICAgaWYgKDIwNDggJiByMi5mbGFncykgewogICAgICAgICAgICAgICAgICAgIGlmICgwID09PSBvMikKICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGU7CiAgICAgICAgICAgICAgICAgICAgZm9yIChkID0gMDsgayA9IG4yW3MyICsgZCsrXSwgcjIuaGVhZCAmJiBrICYmIHIyLmxlbmd0aCA8IDY1NTM2ICYmIChyMi5oZWFkLm5hbWUgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShrKSksIGsgJiYgZCA8IG8yOyApCiAgICAgICAgICAgICAgICAgICAgICA7CiAgICAgICAgICAgICAgICAgICAgaWYgKDUxMiAmIHIyLmZsYWdzICYmIChyMi5jaGVjayA9IEIocjIuY2hlY2ssIG4yLCBkLCBzMikpLCBvMiAtPSBkLCBzMiArPSBkLCBrKQogICAgICAgICAgICAgICAgICAgICAgYnJlYWsgZTsKICAgICAgICAgICAgICAgICAgfSBlbHNlCiAgICAgICAgICAgICAgICAgICAgcjIuaGVhZCAmJiAocjIuaGVhZC5uYW1lID0gbnVsbCk7CiAgICAgICAgICAgICAgICAgIHIyLmxlbmd0aCA9IDAsIHIyLm1vZGUgPSA4OwogICAgICAgICAgICAgICAgY2FzZSA4OgogICAgICAgICAgICAgICAgICBpZiAoNDA5NiAmIHIyLmZsYWdzKSB7CiAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT09IG8yKQogICAgICAgICAgICAgICAgICAgICAgYnJlYWsgZTsKICAgICAgICAgICAgICAgICAgICBmb3IgKGQgPSAwOyBrID0gbjJbczIgKyBkKytdLCByMi5oZWFkICYmIGsgJiYgcjIubGVuZ3RoIDwgNjU1MzYgJiYgKHIyLmhlYWQuY29tbWVudCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGspKSwgayAmJiBkIDwgbzI7ICkKICAgICAgICAgICAgICAgICAgICAgIDsKICAgICAgICAgICAgICAgICAgICBpZiAoNTEyICYgcjIuZmxhZ3MgJiYgKHIyLmNoZWNrID0gQihyMi5jaGVjaywgbjIsIGQsIHMyKSksIG8yIC09IGQsIHMyICs9IGQsIGspCiAgICAgICAgICAgICAgICAgICAgICBicmVhayBlOwogICAgICAgICAgICAgICAgICB9IGVsc2UKICAgICAgICAgICAgICAgICAgICByMi5oZWFkICYmIChyMi5oZWFkLmNvbW1lbnQgPSBudWxsKTsKICAgICAgICAgICAgICAgICAgcjIubW9kZSA9IDk7CiAgICAgICAgICAgICAgICBjYXNlIDk6CiAgICAgICAgICAgICAgICAgIGlmICg1MTIgJiByMi5mbGFncykgewogICAgICAgICAgICAgICAgICAgIGZvciAoOyBsMiA8IDE2OyApIHsKICAgICAgICAgICAgICAgICAgICAgIGlmICgwID09PSBvMikKICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgZTsKICAgICAgICAgICAgICAgICAgICAgIG8yLS0sIHUyICs9IG4yW3MyKytdIDw8IGwyLCBsMiArPSA4OwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBpZiAodTIgIT09ICg2NTUzNSAmIHIyLmNoZWNrKSkgewogICAgICAgICAgICAgICAgICAgICAgZTIubXNnID0gImhlYWRlciBjcmMgbWlzbWF0Y2giLCByMi5tb2RlID0gMzA7CiAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgbDIgPSB1MiA9IDA7CiAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgcjIuaGVhZCAmJiAocjIuaGVhZC5oY3JjID0gcjIuZmxhZ3MgPj4gOSAmIDEsIHIyLmhlYWQuZG9uZSA9IHRydWUpLCBlMi5hZGxlciA9IHIyLmNoZWNrID0gMCwgcjIubW9kZSA9IDEyOwogICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgMTA6CiAgICAgICAgICAgICAgICAgIGZvciAoOyBsMiA8IDMyOyApIHsKICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PT0gbzIpCiAgICAgICAgICAgICAgICAgICAgICBicmVhayBlOwogICAgICAgICAgICAgICAgICAgIG8yLS0sIHUyICs9IG4yW3MyKytdIDw8IGwyLCBsMiArPSA4OwogICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgIGUyLmFkbGVyID0gcjIuY2hlY2sgPSBMKHUyKSwgbDIgPSB1MiA9IDAsIHIyLm1vZGUgPSAxMTsKICAgICAgICAgICAgICAgIGNhc2UgMTE6CiAgICAgICAgICAgICAgICAgIGlmICgwID09PSByMi5oYXZlZGljdCkKICAgICAgICAgICAgICAgICAgICByZXR1cm4gZTIubmV4dF9vdXQgPSBhMiwgZTIuYXZhaWxfb3V0ID0gaDIsIGUyLm5leHRfaW4gPSBzMiwgZTIuYXZhaWxfaW4gPSBvMiwgcjIuaG9sZCA9IHUyLCByMi5iaXRzID0gbDIsIDI7CiAgICAgICAgICAgICAgICAgIGUyLmFkbGVyID0gcjIuY2hlY2sgPSAxLCByMi5tb2RlID0gMTI7CiAgICAgICAgICAgICAgICBjYXNlIDEyOgogICAgICAgICAgICAgICAgICBpZiAoNSA9PT0gdDIgfHwgNiA9PT0gdDIpCiAgICAgICAgICAgICAgICAgICAgYnJlYWsgZTsKICAgICAgICAgICAgICAgIGNhc2UgMTM6CiAgICAgICAgICAgICAgICAgIGlmIChyMi5sYXN0KSB7CiAgICAgICAgICAgICAgICAgICAgdTIgPj4+PSA3ICYgbDIsIGwyIC09IDcgJiBsMiwgcjIubW9kZSA9IDI3OwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgIGZvciAoOyBsMiA8IDM7ICkgewogICAgICAgICAgICAgICAgICAgIGlmICgwID09PSBvMikKICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGU7CiAgICAgICAgICAgICAgICAgICAgbzItLSwgdTIgKz0gbjJbczIrK10gPDwgbDIsIGwyICs9IDg7CiAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgc3dpdGNoIChyMi5sYXN0ID0gMSAmIHUyLCBsMiAtPSAxLCAzICYgKHUyID4+Pj0gMSkpIHsKICAgICAgICAgICAgICAgICAgICBjYXNlIDA6CiAgICAgICAgICAgICAgICAgICAgICByMi5tb2RlID0gMTQ7CiAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICBjYXNlIDE6CiAgICAgICAgICAgICAgICAgICAgICBpZiAoaihyMiksIHIyLm1vZGUgPSAyMCwgNiAhPT0gdDIpCiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgICAgdTIgPj4+PSAyLCBsMiAtPSAyOwogICAgICAgICAgICAgICAgICAgICAgYnJlYWsgZTsKICAgICAgICAgICAgICAgICAgICBjYXNlIDI6CiAgICAgICAgICAgICAgICAgICAgICByMi5tb2RlID0gMTc7CiAgICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgICBjYXNlIDM6CiAgICAgICAgICAgICAgICAgICAgICBlMi5tc2cgPSAiaW52YWxpZCBibG9jayB0eXBlIiwgcjIubW9kZSA9IDMwOwogICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgIHUyID4+Pj0gMiwgbDIgLT0gMjsKICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICBjYXNlIDE0OgogICAgICAgICAgICAgICAgICBmb3IgKHUyID4+Pj0gNyAmIGwyLCBsMiAtPSA3ICYgbDI7IGwyIDwgMzI7ICkgewogICAgICAgICAgICAgICAgICAgIGlmICgwID09PSBvMikKICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGU7CiAgICAgICAgICAgICAgICAgICAgbzItLSwgdTIgKz0gbjJbczIrK10gPDwgbDIsIGwyICs9IDg7CiAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgaWYgKCg2NTUzNSAmIHUyKSAhPSAodTIgPj4+IDE2IF4gNjU1MzUpKSB7CiAgICAgICAgICAgICAgICAgICAgZTIubXNnID0gImludmFsaWQgc3RvcmVkIGJsb2NrIGxlbmd0aHMiLCByMi5tb2RlID0gMzA7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgaWYgKHIyLmxlbmd0aCA9IDY1NTM1ICYgdTIsIGwyID0gdTIgPSAwLCByMi5tb2RlID0gMTUsIDYgPT09IHQyKQogICAgICAgICAgICAgICAgICAgIGJyZWFrIGU7CiAgICAgICAgICAgICAgICBjYXNlIDE1OgogICAgICAgICAgICAgICAgICByMi5tb2RlID0gMTY7CiAgICAgICAgICAgICAgICBjYXNlIDE2OgogICAgICAgICAgICAgICAgICBpZiAoZCA9IHIyLmxlbmd0aCkgewogICAgICAgICAgICAgICAgICAgIGlmIChvMiA8IGQgJiYgKGQgPSBvMiksIGgyIDwgZCAmJiAoZCA9IGgyKSwgMCA9PT0gZCkKICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGU7CiAgICAgICAgICAgICAgICAgICAgSS5hcnJheVNldChpMiwgbjIsIHMyLCBkLCBhMiksIG8yIC09IGQsIHMyICs9IGQsIGgyIC09IGQsIGEyICs9IGQsIHIyLmxlbmd0aCAtPSBkOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgIHIyLm1vZGUgPSAxMjsKICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICBjYXNlIDE3OgogICAgICAgICAgICAgICAgICBmb3IgKDsgbDIgPCAxNDsgKSB7CiAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT09IG8yKQogICAgICAgICAgICAgICAgICAgICAgYnJlYWsgZTsKICAgICAgICAgICAgICAgICAgICBvMi0tLCB1MiArPSBuMltzMisrXSA8PCBsMiwgbDIgKz0gODsKICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICBpZiAocjIubmxlbiA9IDI1NyArICgzMSAmIHUyKSwgdTIgPj4+PSA1LCBsMiAtPSA1LCByMi5uZGlzdCA9IDEgKyAoMzEgJiB1MiksIHUyID4+Pj0gNSwgbDIgLT0gNSwgcjIubmNvZGUgPSA0ICsgKDE1ICYgdTIpLCB1MiA+Pj49IDQsIGwyIC09IDQsIDI4NiA8IHIyLm5sZW4gfHwgMzAgPCByMi5uZGlzdCkgewogICAgICAgICAgICAgICAgICAgIGUyLm1zZyA9ICJ0b28gbWFueSBsZW5ndGggb3IgZGlzdGFuY2Ugc3ltYm9scyIsIHIyLm1vZGUgPSAzMDsKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICByMi5oYXZlID0gMCwgcjIubW9kZSA9IDE4OwogICAgICAgICAgICAgICAgY2FzZSAxODoKICAgICAgICAgICAgICAgICAgZm9yICg7IHIyLmhhdmUgPCByMi5uY29kZTsgKSB7CiAgICAgICAgICAgICAgICAgICAgZm9yICg7IGwyIDwgMzsgKSB7CiAgICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PT0gbzIpCiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGU7CiAgICAgICAgICAgICAgICAgICAgICBvMi0tLCB1MiArPSBuMltzMisrXSA8PCBsMiwgbDIgKz0gODsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgcjIubGVuc1tBW3IyLmhhdmUrK11dID0gNyAmIHUyLCB1MiA+Pj49IDMsIGwyIC09IDM7CiAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgZm9yICg7IHIyLmhhdmUgPCAxOTsgKQogICAgICAgICAgICAgICAgICAgIHIyLmxlbnNbQVtyMi5oYXZlKytdXSA9IDA7CiAgICAgICAgICAgICAgICAgIGlmIChyMi5sZW5jb2RlID0gcjIubGVuZHluLCByMi5sZW5iaXRzID0gNywgUyA9IHsgYml0czogcjIubGVuYml0cyB9LCB4ID0gVCgwLCByMi5sZW5zLCAwLCAxOSwgcjIubGVuY29kZSwgMCwgcjIud29yaywgUyksIHIyLmxlbmJpdHMgPSBTLmJpdHMsIHgpIHsKICAgICAgICAgICAgICAgICAgICBlMi5tc2cgPSAiaW52YWxpZCBjb2RlIGxlbmd0aHMgc2V0IiwgcjIubW9kZSA9IDMwOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgIHIyLmhhdmUgPSAwLCByMi5tb2RlID0gMTk7CiAgICAgICAgICAgICAgICBjYXNlIDE5OgogICAgICAgICAgICAgICAgICBmb3IgKDsgcjIuaGF2ZSA8IHIyLm5sZW4gKyByMi5uZGlzdDsgKSB7CiAgICAgICAgICAgICAgICAgICAgZm9yICg7IGcgPSAoQyA9IHIyLmxlbmNvZGVbdTIgJiAoMSA8PCByMi5sZW5iaXRzKSAtIDFdKSA+Pj4gMTYgJiAyNTUsIGIgPSA2NTUzNSAmIEMsICEoKF8gPSBDID4+PiAyNCkgPD0gbDIpOyApIHsKICAgICAgICAgICAgICAgICAgICAgIGlmICgwID09PSBvMikKICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgZTsKICAgICAgICAgICAgICAgICAgICAgIG8yLS0sIHUyICs9IG4yW3MyKytdIDw8IGwyLCBsMiArPSA4OwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBpZiAoYiA8IDE2KQogICAgICAgICAgICAgICAgICAgICAgdTIgPj4+PSBfLCBsMiAtPSBfLCByMi5sZW5zW3IyLmhhdmUrK10gPSBiOwogICAgICAgICAgICAgICAgICAgIGVsc2UgewogICAgICAgICAgICAgICAgICAgICAgaWYgKDE2ID09PSBiKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoeiA9IF8gKyAyOyBsMiA8IHo7ICkgewogICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgwID09PSBvMikKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGU7CiAgICAgICAgICAgICAgICAgICAgICAgICAgbzItLSwgdTIgKz0gbjJbczIrK10gPDwgbDIsIGwyICs9IDg7CiAgICAgICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHUyID4+Pj0gXywgbDIgLT0gXywgMCA9PT0gcjIuaGF2ZSkgewogICAgICAgICAgICAgICAgICAgICAgICAgIGUyLm1zZyA9ICJpbnZhbGlkIGJpdCBsZW5ndGggcmVwZWF0IiwgcjIubW9kZSA9IDMwOwogICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgIGsgPSByMi5sZW5zW3IyLmhhdmUgLSAxXSwgZCA9IDMgKyAoMyAmIHUyKSwgdTIgPj4+PSAyLCBsMiAtPSAyOwogICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgxNyA9PT0gYikgewogICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHogPSBfICsgMzsgbDIgPCB6OyApIHsKICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PT0gbzIpCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhayBlOwogICAgICAgICAgICAgICAgICAgICAgICAgIG8yLS0sIHUyICs9IG4yW3MyKytdIDw8IGwyLCBsMiArPSA4OwogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgIGwyIC09IF8sIGsgPSAwLCBkID0gMyArICg3ICYgKHUyID4+Pj0gXykpLCB1MiA+Pj49IDMsIGwyIC09IDM7CiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHogPSBfICsgNzsgbDIgPCB6OyApIHsKICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PT0gbzIpCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhayBlOwogICAgICAgICAgICAgICAgICAgICAgICAgIG8yLS0sIHUyICs9IG4yW3MyKytdIDw8IGwyLCBsMiArPSA4OwogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICAgIGwyIC09IF8sIGsgPSAwLCBkID0gMTEgKyAoMTI3ICYgKHUyID4+Pj0gXykpLCB1MiA+Pj49IDcsIGwyIC09IDc7CiAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgICBpZiAocjIuaGF2ZSArIGQgPiByMi5ubGVuICsgcjIubmRpc3QpIHsKICAgICAgICAgICAgICAgICAgICAgICAgZTIubXNnID0gImludmFsaWQgYml0IGxlbmd0aCByZXBlYXQiLCByMi5tb2RlID0gMzA7CiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgICAgZm9yICg7IGQtLTsgKQogICAgICAgICAgICAgICAgICAgICAgICByMi5sZW5zW3IyLmhhdmUrK10gPSBrOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICBpZiAoMzAgPT09IHIyLm1vZGUpCiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgIGlmICgwID09PSByMi5sZW5zWzI1Nl0pIHsKICAgICAgICAgICAgICAgICAgICBlMi5tc2cgPSAiaW52YWxpZCBjb2RlIC0tIG1pc3NpbmcgZW5kLW9mLWJsb2NrIiwgcjIubW9kZSA9IDMwOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgIGlmIChyMi5sZW5iaXRzID0gOSwgUyA9IHsgYml0czogcjIubGVuYml0cyB9LCB4ID0gVChELCByMi5sZW5zLCAwLCByMi5ubGVuLCByMi5sZW5jb2RlLCAwLCByMi53b3JrLCBTKSwgcjIubGVuYml0cyA9IFMuYml0cywgeCkgewogICAgICAgICAgICAgICAgICAgIGUyLm1zZyA9ICJpbnZhbGlkIGxpdGVyYWwvbGVuZ3RocyBzZXQiLCByMi5tb2RlID0gMzA7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgaWYgKHIyLmRpc3RiaXRzID0gNiwgcjIuZGlzdGNvZGUgPSByMi5kaXN0ZHluLCBTID0geyBiaXRzOiByMi5kaXN0Yml0cyB9LCB4ID0gVChGLCByMi5sZW5zLCByMi5ubGVuLCByMi5uZGlzdCwgcjIuZGlzdGNvZGUsIDAsIHIyLndvcmssIFMpLCByMi5kaXN0Yml0cyA9IFMuYml0cywgeCkgewogICAgICAgICAgICAgICAgICAgIGUyLm1zZyA9ICJpbnZhbGlkIGRpc3RhbmNlcyBzZXQiLCByMi5tb2RlID0gMzA7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgaWYgKHIyLm1vZGUgPSAyMCwgNiA9PT0gdDIpCiAgICAgICAgICAgICAgICAgICAgYnJlYWsgZTsKICAgICAgICAgICAgICAgIGNhc2UgMjA6CiAgICAgICAgICAgICAgICAgIHIyLm1vZGUgPSAyMTsKICAgICAgICAgICAgICAgIGNhc2UgMjE6CiAgICAgICAgICAgICAgICAgIGlmICg2IDw9IG8yICYmIDI1OCA8PSBoMikgewogICAgICAgICAgICAgICAgICAgIGUyLm5leHRfb3V0ID0gYTIsIGUyLmF2YWlsX291dCA9IGgyLCBlMi5uZXh0X2luID0gczIsIGUyLmF2YWlsX2luID0gbzIsIHIyLmhvbGQgPSB1MiwgcjIuYml0cyA9IGwyLCBSKGUyLCBjMiksIGEyID0gZTIubmV4dF9vdXQsIGkyID0gZTIub3V0cHV0LCBoMiA9IGUyLmF2YWlsX291dCwgczIgPSBlMi5uZXh0X2luLCBuMiA9IGUyLmlucHV0LCBvMiA9IGUyLmF2YWlsX2luLCB1MiA9IHIyLmhvbGQsIGwyID0gcjIuYml0cywgMTIgPT09IHIyLm1vZGUgJiYgKHIyLmJhY2sgPSAtMSk7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgZm9yIChyMi5iYWNrID0gMDsgZyA9IChDID0gcjIubGVuY29kZVt1MiAmICgxIDw8IHIyLmxlbmJpdHMpIC0gMV0pID4+PiAxNiAmIDI1NSwgYiA9IDY1NTM1ICYgQywgISgoXyA9IEMgPj4+IDI0KSA8PSBsMik7ICkgewogICAgICAgICAgICAgICAgICAgIGlmICgwID09PSBvMikKICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGU7CiAgICAgICAgICAgICAgICAgICAgbzItLSwgdTIgKz0gbjJbczIrK10gPDwgbDIsIGwyICs9IDg7CiAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgaWYgKGcgJiYgMCA9PSAoMjQwICYgZykpIHsKICAgICAgICAgICAgICAgICAgICBmb3IgKHYgPSBfLCB5ID0gZywgdyA9IGI7IGcgPSAoQyA9IHIyLmxlbmNvZGVbdyArICgodTIgJiAoMSA8PCB2ICsgeSkgLSAxKSA+PiB2KV0pID4+PiAxNiAmIDI1NSwgYiA9IDY1NTM1ICYgQywgISh2ICsgKF8gPSBDID4+PiAyNCkgPD0gbDIpOyApIHsKICAgICAgICAgICAgICAgICAgICAgIGlmICgwID09PSBvMikKICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgZTsKICAgICAgICAgICAgICAgICAgICAgIG8yLS0sIHUyICs9IG4yW3MyKytdIDw8IGwyLCBsMiArPSA4OwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICB1MiA+Pj49IHYsIGwyIC09IHYsIHIyLmJhY2sgKz0gdjsKICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICBpZiAodTIgPj4+PSBfLCBsMiAtPSBfLCByMi5iYWNrICs9IF8sIHIyLmxlbmd0aCA9IGIsIDAgPT09IGcpIHsKICAgICAgICAgICAgICAgICAgICByMi5tb2RlID0gMjY7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgaWYgKDMyICYgZykgewogICAgICAgICAgICAgICAgICAgIHIyLmJhY2sgPSAtMSwgcjIubW9kZSA9IDEyOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgIGlmICg2NCAmIGcpIHsKICAgICAgICAgICAgICAgICAgICBlMi5tc2cgPSAiaW52YWxpZCBsaXRlcmFsL2xlbmd0aCBjb2RlIiwgcjIubW9kZSA9IDMwOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgIHIyLmV4dHJhID0gMTUgJiBnLCByMi5tb2RlID0gMjI7CiAgICAgICAgICAgICAgICBjYXNlIDIyOgogICAgICAgICAgICAgICAgICBpZiAocjIuZXh0cmEpIHsKICAgICAgICAgICAgICAgICAgICBmb3IgKHogPSByMi5leHRyYTsgbDIgPCB6OyApIHsKICAgICAgICAgICAgICAgICAgICAgIGlmICgwID09PSBvMikKICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgZTsKICAgICAgICAgICAgICAgICAgICAgIG8yLS0sIHUyICs9IG4yW3MyKytdIDw8IGwyLCBsMiArPSA4OwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICByMi5sZW5ndGggKz0gdTIgJiAoMSA8PCByMi5leHRyYSkgLSAxLCB1MiA+Pj49IHIyLmV4dHJhLCBsMiAtPSByMi5leHRyYSwgcjIuYmFjayArPSByMi5leHRyYTsKICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICByMi53YXMgPSByMi5sZW5ndGgsIHIyLm1vZGUgPSAyMzsKICAgICAgICAgICAgICAgIGNhc2UgMjM6CiAgICAgICAgICAgICAgICAgIGZvciAoOyBnID0gKEMgPSByMi5kaXN0Y29kZVt1MiAmICgxIDw8IHIyLmRpc3RiaXRzKSAtIDFdKSA+Pj4gMTYgJiAyNTUsIGIgPSA2NTUzNSAmIEMsICEoKF8gPSBDID4+PiAyNCkgPD0gbDIpOyApIHsKICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PT0gbzIpCiAgICAgICAgICAgICAgICAgICAgICBicmVhayBlOwogICAgICAgICAgICAgICAgICAgIG8yLS0sIHUyICs9IG4yW3MyKytdIDw8IGwyLCBsMiArPSA4OwogICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgIGlmICgwID09ICgyNDAgJiBnKSkgewogICAgICAgICAgICAgICAgICAgIGZvciAodiA9IF8sIHkgPSBnLCB3ID0gYjsgZyA9IChDID0gcjIuZGlzdGNvZGVbdyArICgodTIgJiAoMSA8PCB2ICsgeSkgLSAxKSA+PiB2KV0pID4+PiAxNiAmIDI1NSwgYiA9IDY1NTM1ICYgQywgISh2ICsgKF8gPSBDID4+PiAyNCkgPD0gbDIpOyApIHsKICAgICAgICAgICAgICAgICAgICAgIGlmICgwID09PSBvMikKICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgZTsKICAgICAgICAgICAgICAgICAgICAgIG8yLS0sIHUyICs9IG4yW3MyKytdIDw8IGwyLCBsMiArPSA4OwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICB1MiA+Pj49IHYsIGwyIC09IHYsIHIyLmJhY2sgKz0gdjsKICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICBpZiAodTIgPj4+PSBfLCBsMiAtPSBfLCByMi5iYWNrICs9IF8sIDY0ICYgZykgewogICAgICAgICAgICAgICAgICAgIGUyLm1zZyA9ICJpbnZhbGlkIGRpc3RhbmNlIGNvZGUiLCByMi5tb2RlID0gMzA7CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgcjIub2Zmc2V0ID0gYiwgcjIuZXh0cmEgPSAxNSAmIGcsIHIyLm1vZGUgPSAyNDsKICAgICAgICAgICAgICAgIGNhc2UgMjQ6CiAgICAgICAgICAgICAgICAgIGlmIChyMi5leHRyYSkgewogICAgICAgICAgICAgICAgICAgIGZvciAoeiA9IHIyLmV4dHJhOyBsMiA8IHo7ICkgewogICAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT09IG8yKQogICAgICAgICAgICAgICAgICAgICAgICBicmVhayBlOwogICAgICAgICAgICAgICAgICAgICAgbzItLSwgdTIgKz0gbjJbczIrK10gPDwgbDIsIGwyICs9IDg7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIHIyLm9mZnNldCArPSB1MiAmICgxIDw8IHIyLmV4dHJhKSAtIDEsIHUyID4+Pj0gcjIuZXh0cmEsIGwyIC09IHIyLmV4dHJhLCByMi5iYWNrICs9IHIyLmV4dHJhOwogICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgIGlmIChyMi5vZmZzZXQgPiByMi5kbWF4KSB7CiAgICAgICAgICAgICAgICAgICAgZTIubXNnID0gImludmFsaWQgZGlzdGFuY2UgdG9vIGZhciBiYWNrIiwgcjIubW9kZSA9IDMwOwogICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgIHIyLm1vZGUgPSAyNTsKICAgICAgICAgICAgICAgIGNhc2UgMjU6CiAgICAgICAgICAgICAgICAgIGlmICgwID09PSBoMikKICAgICAgICAgICAgICAgICAgICBicmVhayBlOwogICAgICAgICAgICAgICAgICBpZiAoZCA9IGMyIC0gaDIsIHIyLm9mZnNldCA+IGQpIHsKICAgICAgICAgICAgICAgICAgICBpZiAoKGQgPSByMi5vZmZzZXQgLSBkKSA+IHIyLndoYXZlICYmIHIyLnNhbmUpIHsKICAgICAgICAgICAgICAgICAgICAgIGUyLm1zZyA9ICJpbnZhbGlkIGRpc3RhbmNlIHRvbyBmYXIgYmFjayIsIHIyLm1vZGUgPSAzMDsKICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBwID0gZCA+IHIyLnduZXh0ID8gKGQgLT0gcjIud25leHQsIHIyLndzaXplIC0gZCkgOiByMi53bmV4dCAtIGQsIGQgPiByMi5sZW5ndGggJiYgKGQgPSByMi5sZW5ndGgpLCBtID0gcjIud2luZG93OwogICAgICAgICAgICAgICAgICB9IGVsc2UKICAgICAgICAgICAgICAgICAgICBtID0gaTIsIHAgPSBhMiAtIHIyLm9mZnNldCwgZCA9IHIyLmxlbmd0aDsKICAgICAgICAgICAgICAgICAgZm9yIChoMiA8IGQgJiYgKGQgPSBoMiksIGgyIC09IGQsIHIyLmxlbmd0aCAtPSBkOyBpMlthMisrXSA9IG1bcCsrXSwgLS1kOyApCiAgICAgICAgICAgICAgICAgICAgOwogICAgICAgICAgICAgICAgICAwID09PSByMi5sZW5ndGggJiYgKHIyLm1vZGUgPSAyMSk7CiAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgY2FzZSAyNjoKICAgICAgICAgICAgICAgICAgaWYgKDAgPT09IGgyKQogICAgICAgICAgICAgICAgICAgIGJyZWFrIGU7CiAgICAgICAgICAgICAgICAgIGkyW2EyKytdID0gcjIubGVuZ3RoLCBoMi0tLCByMi5tb2RlID0gMjE7CiAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgY2FzZSAyNzoKICAgICAgICAgICAgICAgICAgaWYgKHIyLndyYXApIHsKICAgICAgICAgICAgICAgICAgICBmb3IgKDsgbDIgPCAzMjsgKSB7CiAgICAgICAgICAgICAgICAgICAgICBpZiAoMCA9PT0gbzIpCiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGU7CiAgICAgICAgICAgICAgICAgICAgICBvMi0tLCB1MiB8PSBuMltzMisrXSA8PCBsMiwgbDIgKz0gODsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgaWYgKGMyIC09IGgyLCBlMi50b3RhbF9vdXQgKz0gYzIsIHIyLnRvdGFsICs9IGMyLCBjMiAmJiAoZTIuYWRsZXIgPSByMi5jaGVjayA9IHIyLmZsYWdzID8gQihyMi5jaGVjaywgaTIsIGMyLCBhMiAtIGMyKSA6IE8ocjIuY2hlY2ssIGkyLCBjMiwgYTIgLSBjMikpLCBjMiA9IGgyLCAocjIuZmxhZ3MgPyB1MiA6IEwodTIpKSAhPT0gcjIuY2hlY2spIHsKICAgICAgICAgICAgICAgICAgICAgIGUyLm1zZyA9ICJpbmNvcnJlY3QgZGF0YSBjaGVjayIsIHIyLm1vZGUgPSAzMDsKICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBsMiA9IHUyID0gMDsKICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICByMi5tb2RlID0gMjg7CiAgICAgICAgICAgICAgICBjYXNlIDI4OgogICAgICAgICAgICAgICAgICBpZiAocjIud3JhcCAmJiByMi5mbGFncykgewogICAgICAgICAgICAgICAgICAgIGZvciAoOyBsMiA8IDMyOyApIHsKICAgICAgICAgICAgICAgICAgICAgIGlmICgwID09PSBvMikKICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgZTsKICAgICAgICAgICAgICAgICAgICAgIG8yLS0sIHUyICs9IG4yW3MyKytdIDw8IGwyLCBsMiArPSA4OwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBpZiAodTIgIT09ICg0Mjk0OTY3Mjk1ICYgcjIudG90YWwpKSB7CiAgICAgICAgICAgICAgICAgICAgICBlMi5tc2cgPSAiaW5jb3JyZWN0IGxlbmd0aCBjaGVjayIsIHIyLm1vZGUgPSAzMDsKICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBsMiA9IHUyID0gMDsKICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICByMi5tb2RlID0gMjk7CiAgICAgICAgICAgICAgICBjYXNlIDI5OgogICAgICAgICAgICAgICAgICB4ID0gMTsKICAgICAgICAgICAgICAgICAgYnJlYWsgZTsKICAgICAgICAgICAgICAgIGNhc2UgMzA6CiAgICAgICAgICAgICAgICAgIHggPSAtMzsKICAgICAgICAgICAgICAgICAgYnJlYWsgZTsKICAgICAgICAgICAgICAgIGNhc2UgMzE6CiAgICAgICAgICAgICAgICAgIHJldHVybiAtNDsKICAgICAgICAgICAgICAgIGNhc2UgMzI6CiAgICAgICAgICAgICAgICBkZWZhdWx0OgogICAgICAgICAgICAgICAgICByZXR1cm4gVTsKICAgICAgICAgICAgICB9CiAgICAgICAgICByZXR1cm4gZTIubmV4dF9vdXQgPSBhMiwgZTIuYXZhaWxfb3V0ID0gaDIsIGUyLm5leHRfaW4gPSBzMiwgZTIuYXZhaWxfaW4gPSBvMiwgcjIuaG9sZCA9IHUyLCByMi5iaXRzID0gbDIsIChyMi53c2l6ZSB8fCBjMiAhPT0gZTIuYXZhaWxfb3V0ICYmIHIyLm1vZGUgPCAzMCAmJiAocjIubW9kZSA8IDI3IHx8IDQgIT09IHQyKSkgJiYgWihlMiwgZTIub3V0cHV0LCBlMi5uZXh0X291dCwgYzIgLSBlMi5hdmFpbF9vdXQpID8gKHIyLm1vZGUgPSAzMSwgLTQpIDogKGYyIC09IGUyLmF2YWlsX2luLCBjMiAtPSBlMi5hdmFpbF9vdXQsIGUyLnRvdGFsX2luICs9IGYyLCBlMi50b3RhbF9vdXQgKz0gYzIsIHIyLnRvdGFsICs9IGMyLCByMi53cmFwICYmIGMyICYmIChlMi5hZGxlciA9IHIyLmNoZWNrID0gcjIuZmxhZ3MgPyBCKHIyLmNoZWNrLCBpMiwgYzIsIGUyLm5leHRfb3V0IC0gYzIpIDogTyhyMi5jaGVjaywgaTIsIGMyLCBlMi5uZXh0X291dCAtIGMyKSksIGUyLmRhdGFfdHlwZSA9IHIyLmJpdHMgKyAocjIubGFzdCA/IDY0IDogMCkgKyAoMTIgPT09IHIyLm1vZGUgPyAxMjggOiAwKSArICgyMCA9PT0gcjIubW9kZSB8fCAxNSA9PT0gcjIubW9kZSA/IDI1NiA6IDApLCAoMCA9PSBmMiAmJiAwID09PSBjMiB8fCA0ID09PSB0MikgJiYgeCA9PT0gTiAmJiAoeCA9IC01KSwgeCk7CiAgICAgICAgfSwgci5pbmZsYXRlRW5kID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIGlmICghZTIgfHwgIWUyLnN0YXRlKQogICAgICAgICAgICByZXR1cm4gVTsKICAgICAgICAgIHZhciB0MiA9IGUyLnN0YXRlOwogICAgICAgICAgcmV0dXJuIHQyLndpbmRvdyAmJiAodDIud2luZG93ID0gbnVsbCksIGUyLnN0YXRlID0gbnVsbCwgTjsKICAgICAgICB9LCByLmluZmxhdGVHZXRIZWFkZXIgPSBmdW5jdGlvbihlMiwgdDIpIHsKICAgICAgICAgIHZhciByMjsKICAgICAgICAgIHJldHVybiBlMiAmJiBlMi5zdGF0ZSA/IDAgPT0gKDIgJiAocjIgPSBlMi5zdGF0ZSkud3JhcCkgPyBVIDogKChyMi5oZWFkID0gdDIpLmRvbmUgPSBmYWxzZSwgTikgOiBVOwogICAgICAgIH0sIHIuaW5mbGF0ZVNldERpY3Rpb25hcnkgPSBmdW5jdGlvbihlMiwgdDIpIHsKICAgICAgICAgIHZhciByMiwgbjIgPSB0Mi5sZW5ndGg7CiAgICAgICAgICByZXR1cm4gZTIgJiYgZTIuc3RhdGUgPyAwICE9PSAocjIgPSBlMi5zdGF0ZSkud3JhcCAmJiAxMSAhPT0gcjIubW9kZSA/IFUgOiAxMSA9PT0gcjIubW9kZSAmJiBPKDEsIHQyLCBuMiwgMCkgIT09IHIyLmNoZWNrID8gLTMgOiBaKGUyLCB0MiwgbjIsIG4yKSA/IChyMi5tb2RlID0gMzEsIC00KSA6IChyMi5oYXZlZGljdCA9IDEsIE4pIDogVTsKICAgICAgICB9LCByLmluZmxhdGVJbmZvID0gInBha28gaW5mbGF0ZSAoZnJvbSBOb2RlY2EgcHJvamVjdCkiOwogICAgICB9LCB7ICIuLi91dGlscy9jb21tb24iOiA0MSwgIi4vYWRsZXIzMiI6IDQzLCAiLi9jcmMzMiI6IDQ1LCAiLi9pbmZmYXN0IjogNDgsICIuL2luZnRyZWVzIjogNTAgfV0sIDUwOiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIHZhciBEID0gZSgiLi4vdXRpbHMvY29tbW9uIiksIEYgPSBbMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMywgMTUsIDE3LCAxOSwgMjMsIDI3LCAzMSwgMzUsIDQzLCA1MSwgNTksIDY3LCA4MywgOTksIDExNSwgMTMxLCAxNjMsIDE5NSwgMjI3LCAyNTgsIDAsIDBdLCBOID0gWzE2LCAxNiwgMTYsIDE2LCAxNiwgMTYsIDE2LCAxNiwgMTcsIDE3LCAxNywgMTcsIDE4LCAxOCwgMTgsIDE4LCAxOSwgMTksIDE5LCAxOSwgMjAsIDIwLCAyMCwgMjAsIDIxLCAyMSwgMjEsIDIxLCAxNiwgNzIsIDc4XSwgVSA9IFsxLCAyLCAzLCA0LCA1LCA3LCA5LCAxMywgMTcsIDI1LCAzMywgNDksIDY1LCA5NywgMTI5LCAxOTMsIDI1NywgMzg1LCA1MTMsIDc2OSwgMTAyNSwgMTUzNywgMjA0OSwgMzA3MywgNDA5NywgNjE0NSwgODE5MywgMTIyODksIDE2Mzg1LCAyNDU3NywgMCwgMF0sIFAgPSBbMTYsIDE2LCAxNiwgMTYsIDE3LCAxNywgMTgsIDE4LCAxOSwgMTksIDIwLCAyMCwgMjEsIDIxLCAyMiwgMjIsIDIzLCAyMywgMjQsIDI0LCAyNSwgMjUsIDI2LCAyNiwgMjcsIDI3LCAyOCwgMjgsIDI5LCAyOSwgNjQsIDY0XTsKICAgICAgICB0LmV4cG9ydHMgPSBmdW5jdGlvbihlMiwgdDIsIHIyLCBuLCBpLCBzLCBhLCBvKSB7CiAgICAgICAgICB2YXIgaCwgdSwgbCwgZiwgYywgZCwgcCwgbSwgXywgZyA9IG8uYml0cywgYiA9IDAsIHYgPSAwLCB5ID0gMCwgdyA9IDAsIGsgPSAwLCB4ID0gMCwgUyA9IDAsIHogPSAwLCBDID0gMCwgRSA9IDAsIEEgPSBudWxsLCBJID0gMCwgTyA9IG5ldyBELkJ1ZjE2KDE2KSwgQiA9IG5ldyBELkJ1ZjE2KDE2KSwgUiA9IG51bGwsIFQgPSAwOwogICAgICAgICAgZm9yIChiID0gMDsgYiA8PSAxNTsgYisrKQogICAgICAgICAgICBPW2JdID0gMDsKICAgICAgICAgIGZvciAodiA9IDA7IHYgPCBuOyB2KyspCiAgICAgICAgICAgIE9bdDJbcjIgKyB2XV0rKzsKICAgICAgICAgIGZvciAoayA9IGcsIHcgPSAxNTsgMSA8PSB3ICYmIDAgPT09IE9bd107IHctLSkKICAgICAgICAgICAgOwogICAgICAgICAgaWYgKHcgPCBrICYmIChrID0gdyksIDAgPT09IHcpCiAgICAgICAgICAgIHJldHVybiBpW3MrK10gPSAyMDk3MTUyMCwgaVtzKytdID0gMjA5NzE1MjAsIG8uYml0cyA9IDEsIDA7CiAgICAgICAgICBmb3IgKHkgPSAxOyB5IDwgdyAmJiAwID09PSBPW3ldOyB5KyspCiAgICAgICAgICAgIDsKICAgICAgICAgIGZvciAoayA8IHkgJiYgKGsgPSB5KSwgYiA9IHogPSAxOyBiIDw9IDE1OyBiKyspCiAgICAgICAgICAgIGlmICh6IDw8PSAxLCAoeiAtPSBPW2JdKSA8IDApCiAgICAgICAgICAgICAgcmV0dXJuIC0xOwogICAgICAgICAgaWYgKDAgPCB6ICYmICgwID09PSBlMiB8fCAxICE9PSB3KSkKICAgICAgICAgICAgcmV0dXJuIC0xOwogICAgICAgICAgZm9yIChCWzFdID0gMCwgYiA9IDE7IGIgPCAxNTsgYisrKQogICAgICAgICAgICBCW2IgKyAxXSA9IEJbYl0gKyBPW2JdOwogICAgICAgICAgZm9yICh2ID0gMDsgdiA8IG47IHYrKykKICAgICAgICAgICAgMCAhPT0gdDJbcjIgKyB2XSAmJiAoYVtCW3QyW3IyICsgdl1dKytdID0gdik7CiAgICAgICAgICBpZiAoZCA9IDAgPT09IGUyID8gKEEgPSBSID0gYSwgMTkpIDogMSA9PT0gZTIgPyAoQSA9IEYsIEkgLT0gMjU3LCBSID0gTiwgVCAtPSAyNTcsIDI1NikgOiAoQSA9IFUsIFIgPSBQLCAtMSksIGIgPSB5LCBjID0gcywgUyA9IHYgPSBFID0gMCwgbCA9IC0xLCBmID0gKEMgPSAxIDw8ICh4ID0gaykpIC0gMSwgMSA9PT0gZTIgJiYgODUyIDwgQyB8fCAyID09PSBlMiAmJiA1OTIgPCBDKQogICAgICAgICAgICByZXR1cm4gMTsKICAgICAgICAgIGZvciAoOyA7ICkgewogICAgICAgICAgICBmb3IgKHAgPSBiIC0gUywgXyA9IGFbdl0gPCBkID8gKG0gPSAwLCBhW3ZdKSA6IGFbdl0gPiBkID8gKG0gPSBSW1QgKyBhW3ZdXSwgQVtJICsgYVt2XV0pIDogKG0gPSA5NiwgMCksIGggPSAxIDw8IGIgLSBTLCB5ID0gdSA9IDEgPDwgeDsgaVtjICsgKEUgPj4gUykgKyAodSAtPSBoKV0gPSBwIDw8IDI0IHwgbSA8PCAxNiB8IF8gfCAwLCAwICE9PSB1OyApCiAgICAgICAgICAgICAgOwogICAgICAgICAgICBmb3IgKGggPSAxIDw8IGIgLSAxOyBFICYgaDsgKQogICAgICAgICAgICAgIGggPj49IDE7CiAgICAgICAgICAgIGlmICgwICE9PSBoID8gKEUgJj0gaCAtIDEsIEUgKz0gaCkgOiBFID0gMCwgdisrLCAwID09IC0tT1tiXSkgewogICAgICAgICAgICAgIGlmIChiID09PSB3KQogICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgYiA9IHQyW3IyICsgYVt2XV07CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKGsgPCBiICYmIChFICYgZikgIT09IGwpIHsKICAgICAgICAgICAgICBmb3IgKDAgPT09IFMgJiYgKFMgPSBrKSwgYyArPSB5LCB6ID0gMSA8PCAoeCA9IGIgLSBTKTsgeCArIFMgPCB3ICYmICEoKHogLT0gT1t4ICsgU10pIDw9IDApOyApCiAgICAgICAgICAgICAgICB4KyssIHogPDw9IDE7CiAgICAgICAgICAgICAgaWYgKEMgKz0gMSA8PCB4LCAxID09PSBlMiAmJiA4NTIgPCBDIHx8IDIgPT09IGUyICYmIDU5MiA8IEMpCiAgICAgICAgICAgICAgICByZXR1cm4gMTsKICAgICAgICAgICAgICBpW2wgPSBFICYgZl0gPSBrIDw8IDI0IHwgeCA8PCAxNiB8IGMgLSBzIHwgMDsKICAgICAgICAgICAgfQogICAgICAgICAgfQogICAgICAgICAgcmV0dXJuIDAgIT09IEUgJiYgKGlbYyArIEVdID0gYiAtIFMgPDwgMjQgfCA2NCA8PCAxNiB8IDApLCBvLmJpdHMgPSBrLCAwOwogICAgICAgIH07CiAgICAgIH0sIHsgIi4uL3V0aWxzL2NvbW1vbiI6IDQxIH1dLCA1MTogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICB0LmV4cG9ydHMgPSB7IDI6ICJuZWVkIGRpY3Rpb25hcnkiLCAxOiAic3RyZWFtIGVuZCIsIDA6ICIiLCAiLTEiOiAiZmlsZSBlcnJvciIsICItMiI6ICJzdHJlYW0gZXJyb3IiLCAiLTMiOiAiZGF0YSBlcnJvciIsICItNCI6ICJpbnN1ZmZpY2llbnQgbWVtb3J5IiwgIi01IjogImJ1ZmZlciBlcnJvciIsICItNiI6ICJpbmNvbXBhdGlibGUgdmVyc2lvbiIgfTsKICAgICAgfSwge31dLCA1MjogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICB2YXIgaSA9IGUoIi4uL3V0aWxzL2NvbW1vbiIpLCBvID0gMCwgaCA9IDE7CiAgICAgICAgZnVuY3Rpb24gbihlMikgewogICAgICAgICAgZm9yICh2YXIgdDIgPSBlMi5sZW5ndGg7IDAgPD0gLS10MjsgKQogICAgICAgICAgICBlMlt0Ml0gPSAwOwogICAgICAgIH0KICAgICAgICB2YXIgcyA9IDAsIGEgPSAyOSwgdSA9IDI1NiwgbCA9IHUgKyAxICsgYSwgZiA9IDMwLCBjID0gMTksIF8gPSAyICogbCArIDEsIGcgPSAxNSwgZCA9IDE2LCBwID0gNywgbSA9IDI1NiwgYiA9IDE2LCB2ID0gMTcsIHkgPSAxOCwgdyA9IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAxLCAxLCAxLCAyLCAyLCAyLCAyLCAzLCAzLCAzLCAzLCA0LCA0LCA0LCA0LCA1LCA1LCA1LCA1LCAwXSwgayA9IFswLCAwLCAwLCAwLCAxLCAxLCAyLCAyLCAzLCAzLCA0LCA0LCA1LCA1LCA2LCA2LCA3LCA3LCA4LCA4LCA5LCA5LCAxMCwgMTAsIDExLCAxMSwgMTIsIDEyLCAxMywgMTNdLCB4ID0gWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDIsIDMsIDddLCBTID0gWzE2LCAxNywgMTgsIDAsIDgsIDcsIDksIDYsIDEwLCA1LCAxMSwgNCwgMTIsIDMsIDEzLCAyLCAxNCwgMSwgMTVdLCB6ID0gbmV3IEFycmF5KDIgKiAobCArIDIpKTsKICAgICAgICBuKHopOwogICAgICAgIHZhciBDID0gbmV3IEFycmF5KDIgKiBmKTsKICAgICAgICBuKEMpOwogICAgICAgIHZhciBFID0gbmV3IEFycmF5KDUxMik7CiAgICAgICAgbihFKTsKICAgICAgICB2YXIgQSA9IG5ldyBBcnJheSgyNTYpOwogICAgICAgIG4oQSk7CiAgICAgICAgdmFyIEkgPSBuZXcgQXJyYXkoYSk7CiAgICAgICAgbihJKTsKICAgICAgICB2YXIgTywgQiwgUiwgVCA9IG5ldyBBcnJheShmKTsKICAgICAgICBmdW5jdGlvbiBEKGUyLCB0MiwgcjIsIG4yLCBpMikgewogICAgICAgICAgdGhpcy5zdGF0aWNfdHJlZSA9IGUyLCB0aGlzLmV4dHJhX2JpdHMgPSB0MiwgdGhpcy5leHRyYV9iYXNlID0gcjIsIHRoaXMuZWxlbXMgPSBuMiwgdGhpcy5tYXhfbGVuZ3RoID0gaTIsIHRoaXMuaGFzX3N0cmVlID0gZTIgJiYgZTIubGVuZ3RoOwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBGKGUyLCB0MikgewogICAgICAgICAgdGhpcy5keW5fdHJlZSA9IGUyLCB0aGlzLm1heF9jb2RlID0gMCwgdGhpcy5zdGF0X2Rlc2MgPSB0MjsKICAgICAgICB9CiAgICAgICAgZnVuY3Rpb24gTihlMikgewogICAgICAgICAgcmV0dXJuIGUyIDwgMjU2ID8gRVtlMl0gOiBFWzI1NiArIChlMiA+Pj4gNyldOwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBVKGUyLCB0MikgewogICAgICAgICAgZTIucGVuZGluZ19idWZbZTIucGVuZGluZysrXSA9IDI1NSAmIHQyLCBlMi5wZW5kaW5nX2J1ZltlMi5wZW5kaW5nKytdID0gdDIgPj4+IDggJiAyNTU7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIFAoZTIsIHQyLCByMikgewogICAgICAgICAgZTIuYmlfdmFsaWQgPiBkIC0gcjIgPyAoZTIuYmlfYnVmIHw9IHQyIDw8IGUyLmJpX3ZhbGlkICYgNjU1MzUsIFUoZTIsIGUyLmJpX2J1ZiksIGUyLmJpX2J1ZiA9IHQyID4+IGQgLSBlMi5iaV92YWxpZCwgZTIuYmlfdmFsaWQgKz0gcjIgLSBkKSA6IChlMi5iaV9idWYgfD0gdDIgPDwgZTIuYmlfdmFsaWQgJiA2NTUzNSwgZTIuYmlfdmFsaWQgKz0gcjIpOwogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBMKGUyLCB0MiwgcjIpIHsKICAgICAgICAgIFAoZTIsIHIyWzIgKiB0Ml0sIHIyWzIgKiB0MiArIDFdKTsKICAgICAgICB9CiAgICAgICAgZnVuY3Rpb24gaihlMiwgdDIpIHsKICAgICAgICAgIGZvciAodmFyIHIyID0gMDsgcjIgfD0gMSAmIGUyLCBlMiA+Pj49IDEsIHIyIDw8PSAxLCAwIDwgLS10MjsgKQogICAgICAgICAgICA7CiAgICAgICAgICByZXR1cm4gcjIgPj4+IDE7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIFooZTIsIHQyLCByMikgewogICAgICAgICAgdmFyIG4yLCBpMiwgczIgPSBuZXcgQXJyYXkoZyArIDEpLCBhMiA9IDA7CiAgICAgICAgICBmb3IgKG4yID0gMTsgbjIgPD0gZzsgbjIrKykKICAgICAgICAgICAgczJbbjJdID0gYTIgPSBhMiArIHIyW24yIC0gMV0gPDwgMTsKICAgICAgICAgIGZvciAoaTIgPSAwOyBpMiA8PSB0MjsgaTIrKykgewogICAgICAgICAgICB2YXIgbzIgPSBlMlsyICogaTIgKyAxXTsKICAgICAgICAgICAgMCAhPT0gbzIgJiYgKGUyWzIgKiBpMl0gPSBqKHMyW28yXSsrLCBvMikpOwogICAgICAgICAgfQogICAgICAgIH0KICAgICAgICBmdW5jdGlvbiBXKGUyKSB7CiAgICAgICAgICB2YXIgdDI7CiAgICAgICAgICBmb3IgKHQyID0gMDsgdDIgPCBsOyB0MisrKQogICAgICAgICAgICBlMi5keW5fbHRyZWVbMiAqIHQyXSA9IDA7CiAgICAgICAgICBmb3IgKHQyID0gMDsgdDIgPCBmOyB0MisrKQogICAgICAgICAgICBlMi5keW5fZHRyZWVbMiAqIHQyXSA9IDA7CiAgICAgICAgICBmb3IgKHQyID0gMDsgdDIgPCBjOyB0MisrKQogICAgICAgICAgICBlMi5ibF90cmVlWzIgKiB0Ml0gPSAwOwogICAgICAgICAgZTIuZHluX2x0cmVlWzIgKiBtXSA9IDEsIGUyLm9wdF9sZW4gPSBlMi5zdGF0aWNfbGVuID0gMCwgZTIubGFzdF9saXQgPSBlMi5tYXRjaGVzID0gMDsKICAgICAgICB9CiAgICAgICAgZnVuY3Rpb24gTShlMikgewogICAgICAgICAgOCA8IGUyLmJpX3ZhbGlkID8gVShlMiwgZTIuYmlfYnVmKSA6IDAgPCBlMi5iaV92YWxpZCAmJiAoZTIucGVuZGluZ19idWZbZTIucGVuZGluZysrXSA9IGUyLmJpX2J1ZiksIGUyLmJpX2J1ZiA9IDAsIGUyLmJpX3ZhbGlkID0gMDsKICAgICAgICB9CiAgICAgICAgZnVuY3Rpb24gSChlMiwgdDIsIHIyLCBuMikgewogICAgICAgICAgdmFyIGkyID0gMiAqIHQyLCBzMiA9IDIgKiByMjsKICAgICAgICAgIHJldHVybiBlMltpMl0gPCBlMltzMl0gfHwgZTJbaTJdID09PSBlMltzMl0gJiYgbjJbdDJdIDw9IG4yW3IyXTsKICAgICAgICB9CiAgICAgICAgZnVuY3Rpb24gRyhlMiwgdDIsIHIyKSB7CiAgICAgICAgICBmb3IgKHZhciBuMiA9IGUyLmhlYXBbcjJdLCBpMiA9IHIyIDw8IDE7IGkyIDw9IGUyLmhlYXBfbGVuICYmIChpMiA8IGUyLmhlYXBfbGVuICYmIEgodDIsIGUyLmhlYXBbaTIgKyAxXSwgZTIuaGVhcFtpMl0sIGUyLmRlcHRoKSAmJiBpMisrLCAhSCh0MiwgbjIsIGUyLmhlYXBbaTJdLCBlMi5kZXB0aCkpOyApCiAgICAgICAgICAgIGUyLmhlYXBbcjJdID0gZTIuaGVhcFtpMl0sIHIyID0gaTIsIGkyIDw8PSAxOwogICAgICAgICAgZTIuaGVhcFtyMl0gPSBuMjsKICAgICAgICB9CiAgICAgICAgZnVuY3Rpb24gSyhlMiwgdDIsIHIyKSB7CiAgICAgICAgICB2YXIgbjIsIGkyLCBzMiwgYTIsIG8yID0gMDsKICAgICAgICAgIGlmICgwICE9PSBlMi5sYXN0X2xpdCkKICAgICAgICAgICAgZm9yICg7IG4yID0gZTIucGVuZGluZ19idWZbZTIuZF9idWYgKyAyICogbzJdIDw8IDggfCBlMi5wZW5kaW5nX2J1ZltlMi5kX2J1ZiArIDIgKiBvMiArIDFdLCBpMiA9IGUyLnBlbmRpbmdfYnVmW2UyLmxfYnVmICsgbzJdLCBvMisrLCAwID09PSBuMiA/IEwoZTIsIGkyLCB0MikgOiAoTChlMiwgKHMyID0gQVtpMl0pICsgdSArIDEsIHQyKSwgMCAhPT0gKGEyID0gd1tzMl0pICYmIFAoZTIsIGkyIC09IElbczJdLCBhMiksIEwoZTIsIHMyID0gTigtLW4yKSwgcjIpLCAwICE9PSAoYTIgPSBrW3MyXSkgJiYgUChlMiwgbjIgLT0gVFtzMl0sIGEyKSksIG8yIDwgZTIubGFzdF9saXQ7ICkKICAgICAgICAgICAgICA7CiAgICAgICAgICBMKGUyLCBtLCB0Mik7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIFkoZTIsIHQyKSB7CiAgICAgICAgICB2YXIgcjIsIG4yLCBpMiwgczIgPSB0Mi5keW5fdHJlZSwgYTIgPSB0Mi5zdGF0X2Rlc2Muc3RhdGljX3RyZWUsIG8yID0gdDIuc3RhdF9kZXNjLmhhc19zdHJlZSwgaDIgPSB0Mi5zdGF0X2Rlc2MuZWxlbXMsIHUyID0gLTE7CiAgICAgICAgICBmb3IgKGUyLmhlYXBfbGVuID0gMCwgZTIuaGVhcF9tYXggPSBfLCByMiA9IDA7IHIyIDwgaDI7IHIyKyspCiAgICAgICAgICAgIDAgIT09IHMyWzIgKiByMl0gPyAoZTIuaGVhcFsrK2UyLmhlYXBfbGVuXSA9IHUyID0gcjIsIGUyLmRlcHRoW3IyXSA9IDApIDogczJbMiAqIHIyICsgMV0gPSAwOwogICAgICAgICAgZm9yICg7IGUyLmhlYXBfbGVuIDwgMjsgKQogICAgICAgICAgICBzMlsyICogKGkyID0gZTIuaGVhcFsrK2UyLmhlYXBfbGVuXSA9IHUyIDwgMiA/ICsrdTIgOiAwKV0gPSAxLCBlMi5kZXB0aFtpMl0gPSAwLCBlMi5vcHRfbGVuLS0sIG8yICYmIChlMi5zdGF0aWNfbGVuIC09IGEyWzIgKiBpMiArIDFdKTsKICAgICAgICAgIGZvciAodDIubWF4X2NvZGUgPSB1MiwgcjIgPSBlMi5oZWFwX2xlbiA+PiAxOyAxIDw9IHIyOyByMi0tKQogICAgICAgICAgICBHKGUyLCBzMiwgcjIpOwogICAgICAgICAgZm9yIChpMiA9IGgyOyByMiA9IGUyLmhlYXBbMV0sIGUyLmhlYXBbMV0gPSBlMi5oZWFwW2UyLmhlYXBfbGVuLS1dLCBHKGUyLCBzMiwgMSksIG4yID0gZTIuaGVhcFsxXSwgZTIuaGVhcFstLWUyLmhlYXBfbWF4XSA9IHIyLCBlMi5oZWFwWy0tZTIuaGVhcF9tYXhdID0gbjIsIHMyWzIgKiBpMl0gPSBzMlsyICogcjJdICsgczJbMiAqIG4yXSwgZTIuZGVwdGhbaTJdID0gKGUyLmRlcHRoW3IyXSA+PSBlMi5kZXB0aFtuMl0gPyBlMi5kZXB0aFtyMl0gOiBlMi5kZXB0aFtuMl0pICsgMSwgczJbMiAqIHIyICsgMV0gPSBzMlsyICogbjIgKyAxXSA9IGkyLCBlMi5oZWFwWzFdID0gaTIrKywgRyhlMiwgczIsIDEpLCAyIDw9IGUyLmhlYXBfbGVuOyApCiAgICAgICAgICAgIDsKICAgICAgICAgIGUyLmhlYXBbLS1lMi5oZWFwX21heF0gPSBlMi5oZWFwWzFdLCBmdW5jdGlvbihlMywgdDMpIHsKICAgICAgICAgICAgdmFyIHIzLCBuMywgaTMsIHMzLCBhMywgbzMsIGgzID0gdDMuZHluX3RyZWUsIHUzID0gdDMubWF4X2NvZGUsIGwyID0gdDMuc3RhdF9kZXNjLnN0YXRpY190cmVlLCBmMiA9IHQzLnN0YXRfZGVzYy5oYXNfc3RyZWUsIGMyID0gdDMuc3RhdF9kZXNjLmV4dHJhX2JpdHMsIGQyID0gdDMuc3RhdF9kZXNjLmV4dHJhX2Jhc2UsIHAyID0gdDMuc3RhdF9kZXNjLm1heF9sZW5ndGgsIG0yID0gMDsKICAgICAgICAgICAgZm9yIChzMyA9IDA7IHMzIDw9IGc7IHMzKyspCiAgICAgICAgICAgICAgZTMuYmxfY291bnRbczNdID0gMDsKICAgICAgICAgICAgZm9yIChoM1syICogZTMuaGVhcFtlMy5oZWFwX21heF0gKyAxXSA9IDAsIHIzID0gZTMuaGVhcF9tYXggKyAxOyByMyA8IF87IHIzKyspCiAgICAgICAgICAgICAgcDIgPCAoczMgPSBoM1syICogaDNbMiAqIChuMyA9IGUzLmhlYXBbcjNdKSArIDFdICsgMV0gKyAxKSAmJiAoczMgPSBwMiwgbTIrKyksIGgzWzIgKiBuMyArIDFdID0gczMsIHUzIDwgbjMgfHwgKGUzLmJsX2NvdW50W3MzXSsrLCBhMyA9IDAsIGQyIDw9IG4zICYmIChhMyA9IGMyW24zIC0gZDJdKSwgbzMgPSBoM1syICogbjNdLCBlMy5vcHRfbGVuICs9IG8zICogKHMzICsgYTMpLCBmMiAmJiAoZTMuc3RhdGljX2xlbiArPSBvMyAqIChsMlsyICogbjMgKyAxXSArIGEzKSkpOwogICAgICAgICAgICBpZiAoMCAhPT0gbTIpIHsKICAgICAgICAgICAgICBkbyB7CiAgICAgICAgICAgICAgICBmb3IgKHMzID0gcDIgLSAxOyAwID09PSBlMy5ibF9jb3VudFtzM107ICkKICAgICAgICAgICAgICAgICAgczMtLTsKICAgICAgICAgICAgICAgIGUzLmJsX2NvdW50W3MzXS0tLCBlMy5ibF9jb3VudFtzMyArIDFdICs9IDIsIGUzLmJsX2NvdW50W3AyXS0tLCBtMiAtPSAyOwogICAgICAgICAgICAgIH0gd2hpbGUgKDAgPCBtMik7CiAgICAgICAgICAgICAgZm9yIChzMyA9IHAyOyAwICE9PSBzMzsgczMtLSkKICAgICAgICAgICAgICAgIGZvciAobjMgPSBlMy5ibF9jb3VudFtzM107IDAgIT09IG4zOyApCiAgICAgICAgICAgICAgICAgIHUzIDwgKGkzID0gZTMuaGVhcFstLXIzXSkgfHwgKGgzWzIgKiBpMyArIDFdICE9PSBzMyAmJiAoZTMub3B0X2xlbiArPSAoczMgLSBoM1syICogaTMgKyAxXSkgKiBoM1syICogaTNdLCBoM1syICogaTMgKyAxXSA9IHMzKSwgbjMtLSk7CiAgICAgICAgICAgIH0KICAgICAgICAgIH0oZTIsIHQyKSwgWihzMiwgdTIsIGUyLmJsX2NvdW50KTsKICAgICAgICB9CiAgICAgICAgZnVuY3Rpb24gWChlMiwgdDIsIHIyKSB7CiAgICAgICAgICB2YXIgbjIsIGkyLCBzMiA9IC0xLCBhMiA9IHQyWzFdLCBvMiA9IDAsIGgyID0gNywgdTIgPSA0OwogICAgICAgICAgZm9yICgwID09PSBhMiAmJiAoaDIgPSAxMzgsIHUyID0gMyksIHQyWzIgKiAocjIgKyAxKSArIDFdID0gNjU1MzUsIG4yID0gMDsgbjIgPD0gcjI7IG4yKyspCiAgICAgICAgICAgIGkyID0gYTIsIGEyID0gdDJbMiAqIChuMiArIDEpICsgMV0sICsrbzIgPCBoMiAmJiBpMiA9PT0gYTIgfHwgKG8yIDwgdTIgPyBlMi5ibF90cmVlWzIgKiBpMl0gKz0gbzIgOiAwICE9PSBpMiA/IChpMiAhPT0gczIgJiYgZTIuYmxfdHJlZVsyICogaTJdKyssIGUyLmJsX3RyZWVbMiAqIGJdKyspIDogbzIgPD0gMTAgPyBlMi5ibF90cmVlWzIgKiB2XSsrIDogZTIuYmxfdHJlZVsyICogeV0rKywgczIgPSBpMiwgdTIgPSAobzIgPSAwKSA9PT0gYTIgPyAoaDIgPSAxMzgsIDMpIDogaTIgPT09IGEyID8gKGgyID0gNiwgMykgOiAoaDIgPSA3LCA0KSk7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIFYoZTIsIHQyLCByMikgewogICAgICAgICAgdmFyIG4yLCBpMiwgczIgPSAtMSwgYTIgPSB0MlsxXSwgbzIgPSAwLCBoMiA9IDcsIHUyID0gNDsKICAgICAgICAgIGZvciAoMCA9PT0gYTIgJiYgKGgyID0gMTM4LCB1MiA9IDMpLCBuMiA9IDA7IG4yIDw9IHIyOyBuMisrKQogICAgICAgICAgICBpZiAoaTIgPSBhMiwgYTIgPSB0MlsyICogKG4yICsgMSkgKyAxXSwgISgrK28yIDwgaDIgJiYgaTIgPT09IGEyKSkgewogICAgICAgICAgICAgIGlmIChvMiA8IHUyKQogICAgICAgICAgICAgICAgZm9yICg7IEwoZTIsIGkyLCBlMi5ibF90cmVlKSwgMCAhPSAtLW8yOyApCiAgICAgICAgICAgICAgICAgIDsKICAgICAgICAgICAgICBlbHNlCiAgICAgICAgICAgICAgICAwICE9PSBpMiA/IChpMiAhPT0gczIgJiYgKEwoZTIsIGkyLCBlMi5ibF90cmVlKSwgbzItLSksIEwoZTIsIGIsIGUyLmJsX3RyZWUpLCBQKGUyLCBvMiAtIDMsIDIpKSA6IG8yIDw9IDEwID8gKEwoZTIsIHYsIGUyLmJsX3RyZWUpLCBQKGUyLCBvMiAtIDMsIDMpKSA6IChMKGUyLCB5LCBlMi5ibF90cmVlKSwgUChlMiwgbzIgLSAxMSwgNykpOwogICAgICAgICAgICAgIHMyID0gaTIsIHUyID0gKG8yID0gMCkgPT09IGEyID8gKGgyID0gMTM4LCAzKSA6IGkyID09PSBhMiA/IChoMiA9IDYsIDMpIDogKGgyID0gNywgNCk7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgbihUKTsKICAgICAgICB2YXIgcSA9IGZhbHNlOwogICAgICAgIGZ1bmN0aW9uIEooZTIsIHQyLCByMiwgbjIpIHsKICAgICAgICAgIFAoZTIsIChzIDw8IDEpICsgKG4yID8gMSA6IDApLCAzKSwgZnVuY3Rpb24oZTMsIHQzLCByMywgbjMpIHsKICAgICAgICAgICAgTShlMyksIG4zICYmIChVKGUzLCByMyksIFUoZTMsIH5yMykpLCBpLmFycmF5U2V0KGUzLnBlbmRpbmdfYnVmLCBlMy53aW5kb3csIHQzLCByMywgZTMucGVuZGluZyksIGUzLnBlbmRpbmcgKz0gcjM7CiAgICAgICAgICB9KGUyLCB0MiwgcjIsIHRydWUpOwogICAgICAgIH0KICAgICAgICByLl90cl9pbml0ID0gZnVuY3Rpb24oZTIpIHsKICAgICAgICAgIHEgfHwgKGZ1bmN0aW9uKCkgewogICAgICAgICAgICB2YXIgZTMsIHQyLCByMiwgbjIsIGkyLCBzMiA9IG5ldyBBcnJheShnICsgMSk7CiAgICAgICAgICAgIGZvciAobjIgPSByMiA9IDA7IG4yIDwgYSAtIDE7IG4yKyspCiAgICAgICAgICAgICAgZm9yIChJW24yXSA9IHIyLCBlMyA9IDA7IGUzIDwgMSA8PCB3W24yXTsgZTMrKykKICAgICAgICAgICAgICAgIEFbcjIrK10gPSBuMjsKICAgICAgICAgICAgZm9yIChBW3IyIC0gMV0gPSBuMiwgbjIgPSBpMiA9IDA7IG4yIDwgMTY7IG4yKyspCiAgICAgICAgICAgICAgZm9yIChUW24yXSA9IGkyLCBlMyA9IDA7IGUzIDwgMSA8PCBrW24yXTsgZTMrKykKICAgICAgICAgICAgICAgIEVbaTIrK10gPSBuMjsKICAgICAgICAgICAgZm9yIChpMiA+Pj0gNzsgbjIgPCBmOyBuMisrKQogICAgICAgICAgICAgIGZvciAoVFtuMl0gPSBpMiA8PCA3LCBlMyA9IDA7IGUzIDwgMSA8PCBrW24yXSAtIDc7IGUzKyspCiAgICAgICAgICAgICAgICBFWzI1NiArIGkyKytdID0gbjI7CiAgICAgICAgICAgIGZvciAodDIgPSAwOyB0MiA8PSBnOyB0MisrKQogICAgICAgICAgICAgIHMyW3QyXSA9IDA7CiAgICAgICAgICAgIGZvciAoZTMgPSAwOyBlMyA8PSAxNDM7ICkKICAgICAgICAgICAgICB6WzIgKiBlMyArIDFdID0gOCwgZTMrKywgczJbOF0rKzsKICAgICAgICAgICAgZm9yICg7IGUzIDw9IDI1NTsgKQogICAgICAgICAgICAgIHpbMiAqIGUzICsgMV0gPSA5LCBlMysrLCBzMls5XSsrOwogICAgICAgICAgICBmb3IgKDsgZTMgPD0gMjc5OyApCiAgICAgICAgICAgICAgelsyICogZTMgKyAxXSA9IDcsIGUzKyssIHMyWzddKys7CiAgICAgICAgICAgIGZvciAoOyBlMyA8PSAyODc7ICkKICAgICAgICAgICAgICB6WzIgKiBlMyArIDFdID0gOCwgZTMrKywgczJbOF0rKzsKICAgICAgICAgICAgZm9yIChaKHosIGwgKyAxLCBzMiksIGUzID0gMDsgZTMgPCBmOyBlMysrKQogICAgICAgICAgICAgIENbMiAqIGUzICsgMV0gPSA1LCBDWzIgKiBlM10gPSBqKGUzLCA1KTsKICAgICAgICAgICAgTyA9IG5ldyBEKHosIHcsIHUgKyAxLCBsLCBnKSwgQiA9IG5ldyBEKEMsIGssIDAsIGYsIGcpLCBSID0gbmV3IEQobmV3IEFycmF5KDApLCB4LCAwLCBjLCBwKTsKICAgICAgICAgIH0oKSwgcSA9IHRydWUpLCBlMi5sX2Rlc2MgPSBuZXcgRihlMi5keW5fbHRyZWUsIE8pLCBlMi5kX2Rlc2MgPSBuZXcgRihlMi5keW5fZHRyZWUsIEIpLCBlMi5ibF9kZXNjID0gbmV3IEYoZTIuYmxfdHJlZSwgUiksIGUyLmJpX2J1ZiA9IDAsIGUyLmJpX3ZhbGlkID0gMCwgVyhlMik7CiAgICAgICAgfSwgci5fdHJfc3RvcmVkX2Jsb2NrID0gSiwgci5fdHJfZmx1c2hfYmxvY2sgPSBmdW5jdGlvbihlMiwgdDIsIHIyLCBuMikgewogICAgICAgICAgdmFyIGkyLCBzMiwgYTIgPSAwOwogICAgICAgICAgMCA8IGUyLmxldmVsID8gKDIgPT09IGUyLnN0cm0uZGF0YV90eXBlICYmIChlMi5zdHJtLmRhdGFfdHlwZSA9IGZ1bmN0aW9uKGUzKSB7CiAgICAgICAgICAgIHZhciB0MywgcjMgPSA0MDkzNjI0NDQ3OwogICAgICAgICAgICBmb3IgKHQzID0gMDsgdDMgPD0gMzE7IHQzKyssIHIzID4+Pj0gMSkKICAgICAgICAgICAgICBpZiAoMSAmIHIzICYmIDAgIT09IGUzLmR5bl9sdHJlZVsyICogdDNdKQogICAgICAgICAgICAgICAgcmV0dXJuIG87CiAgICAgICAgICAgIGlmICgwICE9PSBlMy5keW5fbHRyZWVbMThdIHx8IDAgIT09IGUzLmR5bl9sdHJlZVsyMF0gfHwgMCAhPT0gZTMuZHluX2x0cmVlWzI2XSkKICAgICAgICAgICAgICByZXR1cm4gaDsKICAgICAgICAgICAgZm9yICh0MyA9IDMyOyB0MyA8IHU7IHQzKyspCiAgICAgICAgICAgICAgaWYgKDAgIT09IGUzLmR5bl9sdHJlZVsyICogdDNdKQogICAgICAgICAgICAgICAgcmV0dXJuIGg7CiAgICAgICAgICAgIHJldHVybiBvOwogICAgICAgICAgfShlMikpLCBZKGUyLCBlMi5sX2Rlc2MpLCBZKGUyLCBlMi5kX2Rlc2MpLCBhMiA9IGZ1bmN0aW9uKGUzKSB7CiAgICAgICAgICAgIHZhciB0MzsKICAgICAgICAgICAgZm9yIChYKGUzLCBlMy5keW5fbHRyZWUsIGUzLmxfZGVzYy5tYXhfY29kZSksIFgoZTMsIGUzLmR5bl9kdHJlZSwgZTMuZF9kZXNjLm1heF9jb2RlKSwgWShlMywgZTMuYmxfZGVzYyksIHQzID0gYyAtIDE7IDMgPD0gdDMgJiYgMCA9PT0gZTMuYmxfdHJlZVsyICogU1t0M10gKyAxXTsgdDMtLSkKICAgICAgICAgICAgICA7CiAgICAgICAgICAgIHJldHVybiBlMy5vcHRfbGVuICs9IDMgKiAodDMgKyAxKSArIDUgKyA1ICsgNCwgdDM7CiAgICAgICAgICB9KGUyKSwgaTIgPSBlMi5vcHRfbGVuICsgMyArIDcgPj4+IDMsIChzMiA9IGUyLnN0YXRpY19sZW4gKyAzICsgNyA+Pj4gMykgPD0gaTIgJiYgKGkyID0gczIpKSA6IGkyID0gczIgPSByMiArIDUsIHIyICsgNCA8PSBpMiAmJiAtMSAhPT0gdDIgPyBKKGUyLCB0MiwgcjIsIG4yKSA6IDQgPT09IGUyLnN0cmF0ZWd5IHx8IHMyID09PSBpMiA/IChQKGUyLCAyICsgKG4yID8gMSA6IDApLCAzKSwgSyhlMiwgeiwgQykpIDogKFAoZTIsIDQgKyAobjIgPyAxIDogMCksIDMpLCBmdW5jdGlvbihlMywgdDMsIHIzLCBuMykgewogICAgICAgICAgICB2YXIgaTM7CiAgICAgICAgICAgIGZvciAoUChlMywgdDMgLSAyNTcsIDUpLCBQKGUzLCByMyAtIDEsIDUpLCBQKGUzLCBuMyAtIDQsIDQpLCBpMyA9IDA7IGkzIDwgbjM7IGkzKyspCiAgICAgICAgICAgICAgUChlMywgZTMuYmxfdHJlZVsyICogU1tpM10gKyAxXSwgMyk7CiAgICAgICAgICAgIFYoZTMsIGUzLmR5bl9sdHJlZSwgdDMgLSAxKSwgVihlMywgZTMuZHluX2R0cmVlLCByMyAtIDEpOwogICAgICAgICAgfShlMiwgZTIubF9kZXNjLm1heF9jb2RlICsgMSwgZTIuZF9kZXNjLm1heF9jb2RlICsgMSwgYTIgKyAxKSwgSyhlMiwgZTIuZHluX2x0cmVlLCBlMi5keW5fZHRyZWUpKSwgVyhlMiksIG4yICYmIE0oZTIpOwogICAgICAgIH0sIHIuX3RyX3RhbGx5ID0gZnVuY3Rpb24oZTIsIHQyLCByMikgewogICAgICAgICAgcmV0dXJuIGUyLnBlbmRpbmdfYnVmW2UyLmRfYnVmICsgMiAqIGUyLmxhc3RfbGl0XSA9IHQyID4+PiA4ICYgMjU1LCBlMi5wZW5kaW5nX2J1ZltlMi5kX2J1ZiArIDIgKiBlMi5sYXN0X2xpdCArIDFdID0gMjU1ICYgdDIsIGUyLnBlbmRpbmdfYnVmW2UyLmxfYnVmICsgZTIubGFzdF9saXRdID0gMjU1ICYgcjIsIGUyLmxhc3RfbGl0KyssIDAgPT09IHQyID8gZTIuZHluX2x0cmVlWzIgKiByMl0rKyA6IChlMi5tYXRjaGVzKyssIHQyLS0sIGUyLmR5bl9sdHJlZVsyICogKEFbcjJdICsgdSArIDEpXSsrLCBlMi5keW5fZHRyZWVbMiAqIE4odDIpXSsrKSwgZTIubGFzdF9saXQgPT09IGUyLmxpdF9idWZzaXplIC0gMTsKICAgICAgICB9LCByLl90cl9hbGlnbiA9IGZ1bmN0aW9uKGUyKSB7CiAgICAgICAgICBQKGUyLCAyLCAzKSwgTChlMiwgbSwgeiksIGZ1bmN0aW9uKGUzKSB7CiAgICAgICAgICAgIDE2ID09PSBlMy5iaV92YWxpZCA/IChVKGUzLCBlMy5iaV9idWYpLCBlMy5iaV9idWYgPSAwLCBlMy5iaV92YWxpZCA9IDApIDogOCA8PSBlMy5iaV92YWxpZCAmJiAoZTMucGVuZGluZ19idWZbZTMucGVuZGluZysrXSA9IDI1NSAmIGUzLmJpX2J1ZiwgZTMuYmlfYnVmID4+PSA4LCBlMy5iaV92YWxpZCAtPSA4KTsKICAgICAgICAgIH0oZTIpOwogICAgICAgIH07CiAgICAgIH0sIHsgIi4uL3V0aWxzL2NvbW1vbiI6IDQxIH1dLCA1MzogW2Z1bmN0aW9uKGUsIHQsIHIpIHsKICAgICAgICB0LmV4cG9ydHMgPSBmdW5jdGlvbigpIHsKICAgICAgICAgIHRoaXMuaW5wdXQgPSBudWxsLCB0aGlzLm5leHRfaW4gPSAwLCB0aGlzLmF2YWlsX2luID0gMCwgdGhpcy50b3RhbF9pbiA9IDAsIHRoaXMub3V0cHV0ID0gbnVsbCwgdGhpcy5uZXh0X291dCA9IDAsIHRoaXMuYXZhaWxfb3V0ID0gMCwgdGhpcy50b3RhbF9vdXQgPSAwLCB0aGlzLm1zZyA9ICIiLCB0aGlzLnN0YXRlID0gbnVsbCwgdGhpcy5kYXRhX3R5cGUgPSAyLCB0aGlzLmFkbGVyID0gMDsKICAgICAgICB9OwogICAgICB9LCB7fV0sIDU0OiBbZnVuY3Rpb24oZSwgdCwgcikgewogICAgICAgIChmdW5jdGlvbihlMikgewogICAgICAgICAgIWZ1bmN0aW9uKHIyLCBuKSB7CiAgICAgICAgICAgIGlmICghcjIuc2V0SW1tZWRpYXRlKSB7CiAgICAgICAgICAgICAgdmFyIGksIHMsIHQyLCBhLCBvID0gMSwgaCA9IHt9LCB1ID0gZmFsc2UsIGwgPSByMi5kb2N1bWVudCwgZTMgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKHIyKTsKICAgICAgICAgICAgICBlMyA9IGUzICYmIGUzLnNldFRpbWVvdXQgPyBlMyA6IHIyLCBpID0gIltvYmplY3QgcHJvY2Vzc10iID09PSB7fS50b1N0cmluZy5jYWxsKHIyLnByb2Nlc3MpID8gZnVuY3Rpb24oZTQpIHsKICAgICAgICAgICAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKSB7CiAgICAgICAgICAgICAgICAgIGMoZTQpOwogICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgfSA6IGZ1bmN0aW9uKCkgewogICAgICAgICAgICAgICAgaWYgKHIyLnBvc3RNZXNzYWdlICYmICFyMi5pbXBvcnRTY3JpcHRzKSB7CiAgICAgICAgICAgICAgICAgIHZhciBlNCA9IHRydWUsIHQzID0gcjIub25tZXNzYWdlOwogICAgICAgICAgICAgICAgICByZXR1cm4gcjIub25tZXNzYWdlID0gZnVuY3Rpb24oKSB7CiAgICAgICAgICAgICAgICAgICAgZTQgPSBmYWxzZTsKICAgICAgICAgICAgICAgICAgfSwgcjIucG9zdE1lc3NhZ2UoIiIsICIqIiksIHIyLm9ubWVzc2FnZSA9IHQzLCBlNDsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICB9KCkgPyAoYSA9ICJzZXRJbW1lZGlhdGUkIiArIE1hdGgucmFuZG9tKCkgKyAiJCIsIHIyLmFkZEV2ZW50TGlzdGVuZXIgPyByMi5hZGRFdmVudExpc3RlbmVyKCJtZXNzYWdlIiwgZCwgZmFsc2UpIDogcjIuYXR0YWNoRXZlbnQoIm9ubWVzc2FnZSIsIGQpLCBmdW5jdGlvbihlNCkgewogICAgICAgICAgICAgICAgcjIucG9zdE1lc3NhZ2UoYSArIGU0LCAiKiIpOwogICAgICAgICAgICAgIH0pIDogcjIuTWVzc2FnZUNoYW5uZWwgPyAoKHQyID0gbmV3IE1lc3NhZ2VDaGFubmVsKCkpLnBvcnQxLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGU0KSB7CiAgICAgICAgICAgICAgICBjKGU0LmRhdGEpOwogICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGU0KSB7CiAgICAgICAgICAgICAgICB0Mi5wb3J0Mi5wb3N0TWVzc2FnZShlNCk7CiAgICAgICAgICAgICAgfSkgOiBsICYmICJvbnJlYWR5c3RhdGVjaGFuZ2UiIGluIGwuY3JlYXRlRWxlbWVudCgic2NyaXB0IikgPyAocyA9IGwuZG9jdW1lbnRFbGVtZW50LCBmdW5jdGlvbihlNCkgewogICAgICAgICAgICAgICAgdmFyIHQzID0gbC5jcmVhdGVFbGVtZW50KCJzY3JpcHQiKTsKICAgICAgICAgICAgICAgIHQzLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkgewogICAgICAgICAgICAgICAgICBjKGU0KSwgdDMub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbCwgcy5yZW1vdmVDaGlsZCh0MyksIHQzID0gbnVsbDsKICAgICAgICAgICAgICAgIH0sIHMuYXBwZW5kQ2hpbGQodDMpOwogICAgICAgICAgICAgIH0pIDogZnVuY3Rpb24oZTQpIHsKICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoYywgMCwgZTQpOwogICAgICAgICAgICAgIH0sIGUzLnNldEltbWVkaWF0ZSA9IGZ1bmN0aW9uKGU0KSB7CiAgICAgICAgICAgICAgICAiZnVuY3Rpb24iICE9IHR5cGVvZiBlNCAmJiAoZTQgPSBuZXcgRnVuY3Rpb24oIiIgKyBlNCkpOwogICAgICAgICAgICAgICAgZm9yICh2YXIgdDMgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpLCByMyA9IDA7IHIzIDwgdDMubGVuZ3RoOyByMysrKQogICAgICAgICAgICAgICAgICB0M1tyM10gPSBhcmd1bWVudHNbcjMgKyAxXTsKICAgICAgICAgICAgICAgIHZhciBuMiA9IHsgY2FsbGJhY2s6IGU0LCBhcmdzOiB0MyB9OwogICAgICAgICAgICAgICAgcmV0dXJuIGhbb10gPSBuMiwgaShvKSwgbysrOwogICAgICAgICAgICAgIH0sIGUzLmNsZWFySW1tZWRpYXRlID0gZjsKICAgICAgICAgICAgfQogICAgICAgICAgICBmdW5jdGlvbiBmKGU0KSB7CiAgICAgICAgICAgICAgZGVsZXRlIGhbZTRdOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGZ1bmN0aW9uIGMoZTQpIHsKICAgICAgICAgICAgICBpZiAodSkKICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoYywgMCwgZTQpOwogICAgICAgICAgICAgIGVsc2UgewogICAgICAgICAgICAgICAgdmFyIHQzID0gaFtlNF07CiAgICAgICAgICAgICAgICBpZiAodDMpIHsKICAgICAgICAgICAgICAgICAgdSA9IHRydWU7CiAgICAgICAgICAgICAgICAgIHRyeSB7CiAgICAgICAgICAgICAgICAgICAgIWZ1bmN0aW9uKGU1KSB7CiAgICAgICAgICAgICAgICAgICAgICB2YXIgdDQgPSBlNS5jYWxsYmFjaywgcjMgPSBlNS5hcmdzOwogICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChyMy5sZW5ndGgpIHsKICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOgogICAgICAgICAgICAgICAgICAgICAgICAgIHQ0KCk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMToKICAgICAgICAgICAgICAgICAgICAgICAgICB0NChyM1swXSk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjoKICAgICAgICAgICAgICAgICAgICAgICAgICB0NChyM1swXSwgcjNbMV0pOwogICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6CiAgICAgICAgICAgICAgICAgICAgICAgICAgdDQocjNbMF0sIHIzWzFdLCByM1syXSk7CiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6CiAgICAgICAgICAgICAgICAgICAgICAgICAgdDQuYXBwbHkobiwgcjMpOwogICAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIH0odDMpOwogICAgICAgICAgICAgICAgICB9IGZpbmFsbHkgewogICAgICAgICAgICAgICAgICAgIGYoZTQpLCB1ID0gZmFsc2U7CiAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgZnVuY3Rpb24gZChlNCkgewogICAgICAgICAgICAgIGU0LnNvdXJjZSA9PT0gcjIgJiYgInN0cmluZyIgPT0gdHlwZW9mIGU0LmRhdGEgJiYgMCA9PT0gZTQuZGF0YS5pbmRleE9mKGEpICYmIGMoK2U0LmRhdGEuc2xpY2UoYS5sZW5ndGgpKTsKICAgICAgICAgICAgfQogICAgICAgICAgfSgidW5kZWZpbmVkIiA9PSB0eXBlb2Ygc2VsZiA/IHZvaWQgMCA9PT0gZTIgPyB0aGlzIDogZTIgOiBzZWxmKTsKICAgICAgICB9KS5jYWxsKHRoaXMsICJ1bmRlZmluZWQiICE9IHR5cGVvZiBjb21tb25qc0dsb2JhbCA/IGNvbW1vbmpzR2xvYmFsIDogInVuZGVmaW5lZCIgIT0gdHlwZW9mIHNlbGYgPyBzZWxmIDogInVuZGVmaW5lZCIgIT0gdHlwZW9mIHdpbmRvdyA/IHdpbmRvdyA6IHt9KTsKICAgICAgfSwge31dIH0sIHt9LCBbMTBdKSgxMCk7CiAgICB9KTsKICB9KShqc3ppcF9taW4pOwogIHZhciBqc3ppcF9taW5FeHBvcnRzID0ganN6aXBfbWluLmV4cG9ydHM7CiAgdmFyIEpTWmlwID0gLyogQF9fUFVSRV9fICovIGdldERlZmF1bHRFeHBvcnRGcm9tQ2pzKGpzemlwX21pbkV4cG9ydHMpOwogIC8qKgogICAqIEBsaWNlbnNlCiAgICogQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQwogICAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wCiAgICovCiAgY29uc3QgcHJveHlNYXJrZXIgPSBTeW1ib2woIkNvbWxpbmsucHJveHkiKTsKICBjb25zdCBjcmVhdGVFbmRwb2ludCA9IFN5bWJvbCgiQ29tbGluay5lbmRwb2ludCIpOwogIGNvbnN0IHJlbGVhc2VQcm94eSA9IFN5bWJvbCgiQ29tbGluay5yZWxlYXNlUHJveHkiKTsKICBjb25zdCBmaW5hbGl6ZXIgPSBTeW1ib2woIkNvbWxpbmsuZmluYWxpemVyIik7CiAgY29uc3QgdGhyb3dNYXJrZXIgPSBTeW1ib2woIkNvbWxpbmsudGhyb3duIik7CiAgY29uc3QgaXNPYmplY3QgPSAodmFsKSA9PiB0eXBlb2YgdmFsID09PSAib2JqZWN0IiAmJiB2YWwgIT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gImZ1bmN0aW9uIjsKICBjb25zdCBwcm94eVRyYW5zZmVySGFuZGxlciA9IHsKICAgIGNhbkhhbmRsZTogKHZhbCkgPT4gaXNPYmplY3QodmFsKSAmJiB2YWxbcHJveHlNYXJrZXJdLAogICAgc2VyaWFsaXplKG9iaikgewogICAgICBjb25zdCB7IHBvcnQxLCBwb3J0MiB9ID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7CiAgICAgIGV4cG9zZShvYmosIHBvcnQxKTsKICAgICAgcmV0dXJuIFtwb3J0MiwgW3BvcnQyXV07CiAgICB9LAogICAgZGVzZXJpYWxpemUocG9ydCkgewogICAgICBwb3J0LnN0YXJ0KCk7CiAgICAgIHJldHVybiB3cmFwKHBvcnQpOwogICAgfQogIH07CiAgY29uc3QgdGhyb3dUcmFuc2ZlckhhbmRsZXIgPSB7CiAgICBjYW5IYW5kbGU6ICh2YWx1ZSkgPT4gaXNPYmplY3QodmFsdWUpICYmIHRocm93TWFya2VyIGluIHZhbHVlLAogICAgc2VyaWFsaXplKHsgdmFsdWUgfSkgewogICAgICBsZXQgc2VyaWFsaXplZDsKICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRXJyb3IpIHsKICAgICAgICBzZXJpYWxpemVkID0gewogICAgICAgICAgaXNFcnJvcjogdHJ1ZSwKICAgICAgICAgIHZhbHVlOiB7CiAgICAgICAgICAgIG1lc3NhZ2U6IHZhbHVlLm1lc3NhZ2UsCiAgICAgICAgICAgIG5hbWU6IHZhbHVlLm5hbWUsCiAgICAgICAgICAgIHN0YWNrOiB2YWx1ZS5zdGFjawogICAgICAgICAgfQogICAgICAgIH07CiAgICAgIH0gZWxzZSB7CiAgICAgICAgc2VyaWFsaXplZCA9IHsgaXNFcnJvcjogZmFsc2UsIHZhbHVlIH07CiAgICAgIH0KICAgICAgcmV0dXJuIFtzZXJpYWxpemVkLCBbXV07CiAgICB9LAogICAgZGVzZXJpYWxpemUoc2VyaWFsaXplZCkgewogICAgICBpZiAoc2VyaWFsaXplZC5pc0Vycm9yKSB7CiAgICAgICAgdGhyb3cgT2JqZWN0LmFzc2lnbihuZXcgRXJyb3Ioc2VyaWFsaXplZC52YWx1ZS5tZXNzYWdlKSwgc2VyaWFsaXplZC52YWx1ZSk7CiAgICAgIH0KICAgICAgdGhyb3cgc2VyaWFsaXplZC52YWx1ZTsKICAgIH0KICB9OwogIGNvbnN0IHRyYW5zZmVySGFuZGxlcnMgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcChbCiAgICBbInByb3h5IiwgcHJveHlUcmFuc2ZlckhhbmRsZXJdLAogICAgWyJ0aHJvdyIsIHRocm93VHJhbnNmZXJIYW5kbGVyXQogIF0pOwogIGZ1bmN0aW9uIGlzQWxsb3dlZE9yaWdpbihhbGxvd2VkT3JpZ2lucywgb3JpZ2luKSB7CiAgICBmb3IgKGNvbnN0IGFsbG93ZWRPcmlnaW4gb2YgYWxsb3dlZE9yaWdpbnMpIHsKICAgICAgaWYgKG9yaWdpbiA9PT0gYWxsb3dlZE9yaWdpbiB8fCBhbGxvd2VkT3JpZ2luID09PSAiKiIpIHsKICAgICAgICByZXR1cm4gdHJ1ZTsKICAgICAgfQogICAgICBpZiAoYWxsb3dlZE9yaWdpbiBpbnN0YW5jZW9mIFJlZ0V4cCAmJiBhbGxvd2VkT3JpZ2luLnRlc3Qob3JpZ2luKSkgewogICAgICAgIHJldHVybiB0cnVlOwogICAgICB9CiAgICB9CiAgICByZXR1cm4gZmFsc2U7CiAgfQogIGZ1bmN0aW9uIGV4cG9zZShvYmosIGVwID0gZ2xvYmFsVGhpcywgYWxsb3dlZE9yaWdpbnMgPSBbIioiXSkgewogICAgZXAuYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsIGZ1bmN0aW9uIGNhbGxiYWNrKGV2KSB7CiAgICAgIGlmICghZXYgfHwgIWV2LmRhdGEpIHsKICAgICAgICByZXR1cm47CiAgICAgIH0KICAgICAgaWYgKCFpc0FsbG93ZWRPcmlnaW4oYWxsb3dlZE9yaWdpbnMsIGV2Lm9yaWdpbikpIHsKICAgICAgICBjb25zb2xlLndhcm4oYEludmFsaWQgb3JpZ2luICcke2V2Lm9yaWdpbn0nIGZvciBjb21saW5rIHByb3h5YCk7CiAgICAgICAgcmV0dXJuOwogICAgICB9CiAgICAgIGNvbnN0IHsgaWQsIHR5cGUsIHBhdGggfSA9IE9iamVjdC5hc3NpZ24oeyBwYXRoOiBbXSB9LCBldi5kYXRhKTsKICAgICAgY29uc3QgYXJndW1lbnRMaXN0ID0gKGV2LmRhdGEuYXJndW1lbnRMaXN0IHx8IFtdKS5tYXAoZnJvbVdpcmVWYWx1ZSk7CiAgICAgIGxldCByZXR1cm5WYWx1ZTsKICAgICAgdHJ5IHsKICAgICAgICBjb25zdCBwYXJlbnQgPSBwYXRoLnNsaWNlKDAsIC0xKS5yZWR1Y2UoKG9iajIsIHByb3ApID0+IG9iajJbcHJvcF0sIG9iaik7CiAgICAgICAgY29uc3QgcmF3VmFsdWUgPSBwYXRoLnJlZHVjZSgob2JqMiwgcHJvcCkgPT4gb2JqMltwcm9wXSwgb2JqKTsKICAgICAgICBzd2l0Y2ggKHR5cGUpIHsKICAgICAgICAgIGNhc2UgIkdFVCI6CiAgICAgICAgICAgIHsKICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IHJhd1ZhbHVlOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgY2FzZSAiU0VUIjoKICAgICAgICAgICAgewogICAgICAgICAgICAgIHBhcmVudFtwYXRoLnNsaWNlKC0xKVswXV0gPSBmcm9tV2lyZVZhbHVlKGV2LmRhdGEudmFsdWUpOwogICAgICAgICAgICAgIHJldHVyblZhbHVlID0gdHJ1ZTsKICAgICAgICAgICAgfQogICAgICAgICAgICBicmVhazsKICAgICAgICAgIGNhc2UgIkFQUExZIjoKICAgICAgICAgICAgewogICAgICAgICAgICAgIHJldHVyblZhbHVlID0gcmF3VmFsdWUuYXBwbHkocGFyZW50LCBhcmd1bWVudExpc3QpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgY2FzZSAiQ09OU1RSVUNUIjoKICAgICAgICAgICAgewogICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gbmV3IHJhd1ZhbHVlKC4uLmFyZ3VtZW50TGlzdCk7CiAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBwcm94eSh2YWx1ZSk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICBjYXNlICJFTkRQT0lOVCI6CiAgICAgICAgICAgIHsKICAgICAgICAgICAgICBjb25zdCB7IHBvcnQxLCBwb3J0MiB9ID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7CiAgICAgICAgICAgICAgZXhwb3NlKG9iaiwgcG9ydDIpOwogICAgICAgICAgICAgIHJldHVyblZhbHVlID0gdHJhbnNmZXIocG9ydDEsIFtwb3J0MV0pOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgY2FzZSAiUkVMRUFTRSI6CiAgICAgICAgICAgIHsKICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IHZvaWQgMDsKICAgICAgICAgICAgfQogICAgICAgICAgICBicmVhazsKICAgICAgICAgIGRlZmF1bHQ6CiAgICAgICAgICAgIHJldHVybjsKICAgICAgICB9CiAgICAgIH0gY2F0Y2ggKHZhbHVlKSB7CiAgICAgICAgcmV0dXJuVmFsdWUgPSB7IHZhbHVlLCBbdGhyb3dNYXJrZXJdOiAwIH07CiAgICAgIH0KICAgICAgUHJvbWlzZS5yZXNvbHZlKHJldHVyblZhbHVlKS5jYXRjaCgodmFsdWUpID0+IHsKICAgICAgICByZXR1cm4geyB2YWx1ZSwgW3Rocm93TWFya2VyXTogMCB9OwogICAgICB9KS50aGVuKChyZXR1cm5WYWx1ZTIpID0+IHsKICAgICAgICBjb25zdCBbd2lyZVZhbHVlLCB0cmFuc2ZlcmFibGVzXSA9IHRvV2lyZVZhbHVlKHJldHVyblZhbHVlMik7CiAgICAgICAgZXAucG9zdE1lc3NhZ2UoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB3aXJlVmFsdWUpLCB7IGlkIH0pLCB0cmFuc2ZlcmFibGVzKTsKICAgICAgICBpZiAodHlwZSA9PT0gIlJFTEVBU0UiKSB7CiAgICAgICAgICBlcC5yZW1vdmVFdmVudExpc3RlbmVyKCJtZXNzYWdlIiwgY2FsbGJhY2spOwogICAgICAgICAgY2xvc2VFbmRQb2ludChlcCk7CiAgICAgICAgICBpZiAoZmluYWxpemVyIGluIG9iaiAmJiB0eXBlb2Ygb2JqW2ZpbmFsaXplcl0gPT09ICJmdW5jdGlvbiIpIHsKICAgICAgICAgICAgb2JqW2ZpbmFsaXplcl0oKTsKICAgICAgICAgIH0KICAgICAgICB9CiAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4gewogICAgICAgIGNvbnN0IFt3aXJlVmFsdWUsIHRyYW5zZmVyYWJsZXNdID0gdG9XaXJlVmFsdWUoewogICAgICAgICAgdmFsdWU6IG5ldyBUeXBlRXJyb3IoIlVuc2VyaWFsaXphYmxlIHJldHVybiB2YWx1ZSIpLAogICAgICAgICAgW3Rocm93TWFya2VyXTogMAogICAgICAgIH0pOwogICAgICAgIGVwLnBvc3RNZXNzYWdlKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgd2lyZVZhbHVlKSwgeyBpZCB9KSwgdHJhbnNmZXJhYmxlcyk7CiAgICAgIH0pOwogICAgfSk7CiAgICBpZiAoZXAuc3RhcnQpIHsKICAgICAgZXAuc3RhcnQoKTsKICAgIH0KICB9CiAgZnVuY3Rpb24gaXNNZXNzYWdlUG9ydChlbmRwb2ludCkgewogICAgcmV0dXJuIGVuZHBvaW50LmNvbnN0cnVjdG9yLm5hbWUgPT09ICJNZXNzYWdlUG9ydCI7CiAgfQogIGZ1bmN0aW9uIGNsb3NlRW5kUG9pbnQoZW5kcG9pbnQpIHsKICAgIGlmIChpc01lc3NhZ2VQb3J0KGVuZHBvaW50KSkKICAgICAgZW5kcG9pbnQuY2xvc2UoKTsKICB9CiAgZnVuY3Rpb24gd3JhcChlcCwgdGFyZ2V0KSB7CiAgICByZXR1cm4gY3JlYXRlUHJveHkoZXAsIFtdLCB0YXJnZXQpOwogIH0KICBmdW5jdGlvbiB0aHJvd0lmUHJveHlSZWxlYXNlZChpc1JlbGVhc2VkKSB7CiAgICBpZiAoaXNSZWxlYXNlZCkgewogICAgICB0aHJvdyBuZXcgRXJyb3IoIlByb3h5IGhhcyBiZWVuIHJlbGVhc2VkIGFuZCBpcyBub3QgdXNlYWJsZSIpOwogICAgfQogIH0KICBmdW5jdGlvbiByZWxlYXNlRW5kcG9pbnQoZXApIHsKICAgIHJldHVybiByZXF1ZXN0UmVzcG9uc2VNZXNzYWdlKGVwLCB7CiAgICAgIHR5cGU6ICJSRUxFQVNFIgogICAgfSkudGhlbigoKSA9PiB7CiAgICAgIGNsb3NlRW5kUG9pbnQoZXApOwogICAgfSk7CiAgfQogIGNvbnN0IHByb3h5Q291bnRlciA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgV2Vha01hcCgpOwogIGNvbnN0IHByb3h5RmluYWxpemVycyA9ICJGaW5hbGl6YXRpb25SZWdpc3RyeSIgaW4gZ2xvYmFsVGhpcyAmJiBuZXcgRmluYWxpemF0aW9uUmVnaXN0cnkoKGVwKSA9PiB7CiAgICBjb25zdCBuZXdDb3VudCA9IChwcm94eUNvdW50ZXIuZ2V0KGVwKSB8fCAwKSAtIDE7CiAgICBwcm94eUNvdW50ZXIuc2V0KGVwLCBuZXdDb3VudCk7CiAgICBpZiAobmV3Q291bnQgPT09IDApIHsKICAgICAgcmVsZWFzZUVuZHBvaW50KGVwKTsKICAgIH0KICB9KTsKICBmdW5jdGlvbiByZWdpc3RlclByb3h5KHByb3h5MiwgZXApIHsKICAgIGNvbnN0IG5ld0NvdW50ID0gKHByb3h5Q291bnRlci5nZXQoZXApIHx8IDApICsgMTsKICAgIHByb3h5Q291bnRlci5zZXQoZXAsIG5ld0NvdW50KTsKICAgIGlmIChwcm94eUZpbmFsaXplcnMpIHsKICAgICAgcHJveHlGaW5hbGl6ZXJzLnJlZ2lzdGVyKHByb3h5MiwgZXAsIHByb3h5Mik7CiAgICB9CiAgfQogIGZ1bmN0aW9uIHVucmVnaXN0ZXJQcm94eShwcm94eTIpIHsKICAgIGlmIChwcm94eUZpbmFsaXplcnMpIHsKICAgICAgcHJveHlGaW5hbGl6ZXJzLnVucmVnaXN0ZXIocHJveHkyKTsKICAgIH0KICB9CiAgZnVuY3Rpb24gY3JlYXRlUHJveHkoZXAsIHBhdGggPSBbXSwgdGFyZ2V0ID0gZnVuY3Rpb24oKSB7CiAgfSkgewogICAgbGV0IGlzUHJveHlSZWxlYXNlZCA9IGZhbHNlOwogICAgY29uc3QgcHJveHkyID0gbmV3IFByb3h5KHRhcmdldCwgewogICAgICBnZXQoX3RhcmdldCwgcHJvcCkgewogICAgICAgIHRocm93SWZQcm94eVJlbGVhc2VkKGlzUHJveHlSZWxlYXNlZCk7CiAgICAgICAgaWYgKHByb3AgPT09IHJlbGVhc2VQcm94eSkgewogICAgICAgICAgcmV0dXJuICgpID0+IHsKICAgICAgICAgICAgdW5yZWdpc3RlclByb3h5KHByb3h5Mik7CiAgICAgICAgICAgIHJlbGVhc2VFbmRwb2ludChlcCk7CiAgICAgICAgICAgIGlzUHJveHlSZWxlYXNlZCA9IHRydWU7CiAgICAgICAgICB9OwogICAgICAgIH0KICAgICAgICBpZiAocHJvcCA9PT0gInRoZW4iKSB7CiAgICAgICAgICBpZiAocGF0aC5sZW5ndGggPT09IDApIHsKICAgICAgICAgICAgcmV0dXJuIHsgdGhlbjogKCkgPT4gcHJveHkyIH07CiAgICAgICAgICB9CiAgICAgICAgICBjb25zdCByID0gcmVxdWVzdFJlc3BvbnNlTWVzc2FnZShlcCwgewogICAgICAgICAgICB0eXBlOiAiR0VUIiwKICAgICAgICAgICAgcGF0aDogcGF0aC5tYXAoKHApID0+IHAudG9TdHJpbmcoKSkKICAgICAgICAgIH0pLnRoZW4oZnJvbVdpcmVWYWx1ZSk7CiAgICAgICAgICByZXR1cm4gci50aGVuLmJpbmQocik7CiAgICAgICAgfQogICAgICAgIHJldHVybiBjcmVhdGVQcm94eShlcCwgWy4uLnBhdGgsIHByb3BdKTsKICAgICAgfSwKICAgICAgc2V0KF90YXJnZXQsIHByb3AsIHJhd1ZhbHVlKSB7CiAgICAgICAgdGhyb3dJZlByb3h5UmVsZWFzZWQoaXNQcm94eVJlbGVhc2VkKTsKICAgICAgICBjb25zdCBbdmFsdWUsIHRyYW5zZmVyYWJsZXNdID0gdG9XaXJlVmFsdWUocmF3VmFsdWUpOwogICAgICAgIHJldHVybiByZXF1ZXN0UmVzcG9uc2VNZXNzYWdlKGVwLCB7CiAgICAgICAgICB0eXBlOiAiU0VUIiwKICAgICAgICAgIHBhdGg6IFsuLi5wYXRoLCBwcm9wXS5tYXAoKHApID0+IHAudG9TdHJpbmcoKSksCiAgICAgICAgICB2YWx1ZQogICAgICAgIH0sIHRyYW5zZmVyYWJsZXMpLnRoZW4oZnJvbVdpcmVWYWx1ZSk7CiAgICAgIH0sCiAgICAgIGFwcGx5KF90YXJnZXQsIF90aGlzQXJnLCByYXdBcmd1bWVudExpc3QpIHsKICAgICAgICB0aHJvd0lmUHJveHlSZWxlYXNlZChpc1Byb3h5UmVsZWFzZWQpOwogICAgICAgIGNvbnN0IGxhc3QgPSBwYXRoW3BhdGgubGVuZ3RoIC0gMV07CiAgICAgICAgaWYgKGxhc3QgPT09IGNyZWF0ZUVuZHBvaW50KSB7CiAgICAgICAgICByZXR1cm4gcmVxdWVzdFJlc3BvbnNlTWVzc2FnZShlcCwgewogICAgICAgICAgICB0eXBlOiAiRU5EUE9JTlQiCiAgICAgICAgICB9KS50aGVuKGZyb21XaXJlVmFsdWUpOwogICAgICAgIH0KICAgICAgICBpZiAobGFzdCA9PT0gImJpbmQiKSB7CiAgICAgICAgICByZXR1cm4gY3JlYXRlUHJveHkoZXAsIHBhdGguc2xpY2UoMCwgLTEpKTsKICAgICAgICB9CiAgICAgICAgY29uc3QgW2FyZ3VtZW50TGlzdCwgdHJhbnNmZXJhYmxlc10gPSBwcm9jZXNzQXJndW1lbnRzKHJhd0FyZ3VtZW50TGlzdCk7CiAgICAgICAgcmV0dXJuIHJlcXVlc3RSZXNwb25zZU1lc3NhZ2UoZXAsIHsKICAgICAgICAgIHR5cGU6ICJBUFBMWSIsCiAgICAgICAgICBwYXRoOiBwYXRoLm1hcCgocCkgPT4gcC50b1N0cmluZygpKSwKICAgICAgICAgIGFyZ3VtZW50TGlzdAogICAgICAgIH0sIHRyYW5zZmVyYWJsZXMpLnRoZW4oZnJvbVdpcmVWYWx1ZSk7CiAgICAgIH0sCiAgICAgIGNvbnN0cnVjdChfdGFyZ2V0LCByYXdBcmd1bWVudExpc3QpIHsKICAgICAgICB0aHJvd0lmUHJveHlSZWxlYXNlZChpc1Byb3h5UmVsZWFzZWQpOwogICAgICAgIGNvbnN0IFthcmd1bWVudExpc3QsIHRyYW5zZmVyYWJsZXNdID0gcHJvY2Vzc0FyZ3VtZW50cyhyYXdBcmd1bWVudExpc3QpOwogICAgICAgIHJldHVybiByZXF1ZXN0UmVzcG9uc2VNZXNzYWdlKGVwLCB7CiAgICAgICAgICB0eXBlOiAiQ09OU1RSVUNUIiwKICAgICAgICAgIHBhdGg6IHBhdGgubWFwKChwKSA9PiBwLnRvU3RyaW5nKCkpLAogICAgICAgICAgYXJndW1lbnRMaXN0CiAgICAgICAgfSwgdHJhbnNmZXJhYmxlcykudGhlbihmcm9tV2lyZVZhbHVlKTsKICAgICAgfQogICAgfSk7CiAgICByZWdpc3RlclByb3h5KHByb3h5MiwgZXApOwogICAgcmV0dXJuIHByb3h5MjsKICB9CiAgZnVuY3Rpb24gbXlGbGF0KGFycikgewogICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5jb25jYXQuYXBwbHkoW10sIGFycik7CiAgfQogIGZ1bmN0aW9uIHByb2Nlc3NBcmd1bWVudHMoYXJndW1lbnRMaXN0KSB7CiAgICBjb25zdCBwcm9jZXNzZWQgPSBhcmd1bWVudExpc3QubWFwKHRvV2lyZVZhbHVlKTsKICAgIHJldHVybiBbcHJvY2Vzc2VkLm1hcCgodikgPT4gdlswXSksIG15RmxhdChwcm9jZXNzZWQubWFwKCh2KSA9PiB2WzFdKSldOwogIH0KICBjb25zdCB0cmFuc2ZlckNhY2hlID0gLyogQF9fUFVSRV9fICovIG5ldyBXZWFrTWFwKCk7CiAgZnVuY3Rpb24gdHJhbnNmZXIob2JqLCB0cmFuc2ZlcnMpIHsKICAgIHRyYW5zZmVyQ2FjaGUuc2V0KG9iaiwgdHJhbnNmZXJzKTsKICAgIHJldHVybiBvYmo7CiAgfQogIGZ1bmN0aW9uIHByb3h5KG9iaikgewogICAgcmV0dXJuIE9iamVjdC5hc3NpZ24ob2JqLCB7IFtwcm94eU1hcmtlcl06IHRydWUgfSk7CiAgfQogIGZ1bmN0aW9uIHRvV2lyZVZhbHVlKHZhbHVlKSB7CiAgICBmb3IgKGNvbnN0IFtuYW1lLCBoYW5kbGVyXSBvZiB0cmFuc2ZlckhhbmRsZXJzKSB7CiAgICAgIGlmIChoYW5kbGVyLmNhbkhhbmRsZSh2YWx1ZSkpIHsKICAgICAgICBjb25zdCBbc2VyaWFsaXplZFZhbHVlLCB0cmFuc2ZlcmFibGVzXSA9IGhhbmRsZXIuc2VyaWFsaXplKHZhbHVlKTsKICAgICAgICByZXR1cm4gWwogICAgICAgICAgewogICAgICAgICAgICB0eXBlOiAiSEFORExFUiIsCiAgICAgICAgICAgIG5hbWUsCiAgICAgICAgICAgIHZhbHVlOiBzZXJpYWxpemVkVmFsdWUKICAgICAgICAgIH0sCiAgICAgICAgICB0cmFuc2ZlcmFibGVzCiAgICAgICAgXTsKICAgICAgfQogICAgfQogICAgcmV0dXJuIFsKICAgICAgewogICAgICAgIHR5cGU6ICJSQVciLAogICAgICAgIHZhbHVlCiAgICAgIH0sCiAgICAgIHRyYW5zZmVyQ2FjaGUuZ2V0KHZhbHVlKSB8fCBbXQogICAgXTsKICB9CiAgZnVuY3Rpb24gZnJvbVdpcmVWYWx1ZSh2YWx1ZSkgewogICAgc3dpdGNoICh2YWx1ZS50eXBlKSB7CiAgICAgIGNhc2UgIkhBTkRMRVIiOgogICAgICAgIHJldHVybiB0cmFuc2ZlckhhbmRsZXJzLmdldCh2YWx1ZS5uYW1lKS5kZXNlcmlhbGl6ZSh2YWx1ZS52YWx1ZSk7CiAgICAgIGNhc2UgIlJBVyI6CiAgICAgICAgcmV0dXJuIHZhbHVlLnZhbHVlOwogICAgfQogIH0KICBmdW5jdGlvbiByZXF1ZXN0UmVzcG9uc2VNZXNzYWdlKGVwLCBtc2csIHRyYW5zZmVycykgewogICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7CiAgICAgIGNvbnN0IGlkID0gZ2VuZXJhdGVVVUlEKCk7CiAgICAgIGVwLmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLCBmdW5jdGlvbiBsKGV2KSB7CiAgICAgICAgaWYgKCFldi5kYXRhIHx8ICFldi5kYXRhLmlkIHx8IGV2LmRhdGEuaWQgIT09IGlkKSB7CiAgICAgICAgICByZXR1cm47CiAgICAgICAgfQogICAgICAgIGVwLnJlbW92ZUV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLCBsKTsKICAgICAgICByZXNvbHZlKGV2LmRhdGEpOwogICAgICB9KTsKICAgICAgaWYgKGVwLnN0YXJ0KSB7CiAgICAgICAgZXAuc3RhcnQoKTsKICAgICAgfQogICAgICBlcC5wb3N0TWVzc2FnZShPYmplY3QuYXNzaWduKHsgaWQgfSwgbXNnKSwgdHJhbnNmZXJzKTsKICAgIH0pOwogIH0KICBmdW5jdGlvbiBnZW5lcmF0ZVVVSUQoKSB7CiAgICByZXR1cm4gbmV3IEFycmF5KDQpLmZpbGwoMCkubWFwKCgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKS50b1N0cmluZygxNikpLmpvaW4oIi0iKTsKICB9CiAgY2xhc3MgRGlzcG9zYWJsZUpTWmlwIHsKICAgIGNvbnN0cnVjdG9yKCkgewogICAgICBfX3B1YmxpY0ZpZWxkKHRoaXMsICJ6aXAiLCBuZXcgSlNaaXAoKSk7CiAgICB9CiAgICBmaWxlKHsgbmFtZSwgZGF0YSB9KSB7CiAgICAgIHRoaXMuemlwLmZpbGUobmFtZSwgZGF0YSk7CiAgICB9CiAgICBmaWxlcyhmaWxlcykgewogICAgICBmaWxlcy5mb3JFYWNoKCh7IG5hbWUsIGRhdGEgfSkgPT4gewogICAgICAgIHRoaXMuemlwLmZpbGUobmFtZSwgZGF0YSk7CiAgICAgIH0pOwogICAgfQogICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1mdW5jdGlvbi1yZXR1cm4tdHlwZQogICAgYXN5bmMgdW56aXBGaWxlKHsgZGF0YSwgcGF0aCwgdHlwZSB9KSB7CiAgICAgIHZhciBfYTsKICAgICAgY29uc3QgemlwID0gYXdhaXQgSlNaaXAubG9hZEFzeW5jKGRhdGEpOwogICAgICByZXR1cm4gKF9hID0gemlwLmZpbGUocGF0aCkpID09IG51bGwgPyB2b2lkIDAgOiBfYS5hc3luYyh0eXBlKTsKICAgIH0KICAgIGFzeW5jIGdlbmVyYXRlQXN5bmMob3B0aW9ucywgb25VcGRhdGUpIHsKICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuemlwLmdlbmVyYXRlQXN5bmMoeyAuLi5vcHRpb25zLCB0eXBlOiAidWludDhhcnJheSIgfSwgb25VcGRhdGUpOwogICAgICByZXR1cm4gdHJhbnNmZXIoZGF0YSwgW2RhdGEuYnVmZmVyXSk7CiAgICB9CiAgICBnZW5lcmF0ZVN0cmVhbShvcHRpb25zLCBvblVwZGF0ZSwgb25FbmQpIHsKICAgICAgY29uc3Qgc3RyZWFtID0gdGhpcy56aXAuZ2VuZXJhdGVJbnRlcm5hbFN0cmVhbSh7IC4uLm9wdGlvbnMsIHR5cGU6ICJ1aW50OGFycmF5IiB9KTsKICAgICAgY29uc3QgemlwU3RyZWFtID0gbmV3IFJlYWRhYmxlU3RyZWFtKHsKICAgICAgICBzdGFydDogKGNvbnRyb2xsZXIpID0+IHsKICAgICAgICAgIHN0cmVhbS5vbigiZXJyb3IiLCAoZSkgPT4gewogICAgICAgICAgICBjb250cm9sbGVyLmVycm9yKGUpOwogICAgICAgICAgICBvbkVuZCA9PSBudWxsID8gdm9pZCAwIDogb25FbmQoKTsKICAgICAgICAgIH0pOwogICAgICAgICAgc3RyZWFtLm9uKCJlbmQiLCAoKSA9PiB7CiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gewogICAgICAgICAgICAgIGNvbnRyb2xsZXIuY2xvc2UoKTsKICAgICAgICAgICAgICBvbkVuZCA9PSBudWxsID8gdm9pZCAwIDogb25FbmQoKTsKICAgICAgICAgICAgfSk7CiAgICAgICAgICB9KTsKICAgICAgICAgIHN0cmVhbS5vbigiZGF0YSIsIChkYXRhLCBtZXRhRGF0YSkgPT4gewogICAgICAgICAgICBjb250cm9sbGVyLmVucXVldWUoZGF0YSk7CiAgICAgICAgICAgIG9uVXBkYXRlID09IG51bGwgPyB2b2lkIDAgOiBvblVwZGF0ZShtZXRhRGF0YSk7CiAgICAgICAgICB9KTsKICAgICAgICAgIHN0cmVhbS5yZXN1bWUoKTsKICAgICAgICB9CiAgICAgIH0pOwogICAgICByZXR1cm4gdHJhbnNmZXIoeyB6aXBTdHJlYW0gfSwgW3ppcFN0cmVhbV0pOwogICAgfQogIH0KICBleHBvc2UoRGlzcG9zYWJsZUpTWmlwKTsKfSkoKTsK";
      const decodeBase64 = (base64) => Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
      const blob = typeof window !== "undefined" && window.Blob && new Blob([decodeBase64(encodedJs)], { type: "text/javascript;charset=utf-8" });
      function WorkerWrapper(options) {
        let objURL;
        try {
          objURL = blob && (window.URL || window.webkitURL).createObjectURL(blob);
          if (!objURL)
            throw "";
          const worker = new Worker(objURL, {
            name: options == null ? void 0 : options.name
          });
          worker.addEventListener("error", () => {
            (window.URL || window.webkitURL).revokeObjectURL(objURL);
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
          objURL && (window.URL || window.webkitURL).revokeObjectURL(objURL);
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
          const worker = new WorkerWrapper();
          return wrap(worker);
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
            worker.JSZip = await this.createWorker();
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
            await zip.files(transfer(files, getTransferableData(files)));
            return await zip.generateAsync(
              options,
              proxy((metaData) => {
                if (metaData.currentFile)
                  onUpdate == null ? void 0 : onUpdate({ workerId: worker.id, ...metaData });
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
                if (metaData.currentFile)
                  onUpdate == null ? void 0 : onUpdate({ workerId: worker.id, ...metaData });
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
          if (!await this.ready)
            return;
          try {
            await this.store.setItem(key, true);
            logger.log(`mark "${key}" as downloaded`);
          } catch (e) {
            logger.error(e);
          }
        }
        async del(key) {
          if (!await this.ready)
            return;
          try {
            await this.store.removeItem(key);
            logger.log(`unmark "${key}" as downloaded`);
          } catch (e) {
            logger.error(e);
          }
        }
        async has(key) {
          if (!await this.ready)
            return false;
          try {
            return await this.store.getItem(key) === true;
          } catch (e) {
            logger.error(e);
          }
          return false;
        }
        async size() {
          if (!await this.ready)
            return NaN;
          return this.store.length();
        }
        async import(keys2) {
          if (!await this.ready)
            throw new Error(`store ${this.name} cannot ready`);
          try {
            await this.store.setItems(keys2.map((gid2) => ({ key: gid2, value: true })));
          } catch (e) {
            logger.error(e);
          }
        }
        async export() {
          if (!await this.ready)
            throw new Error(`store ${this.name} cannot ready`);
          return this.store.keys();
        }
        async clear() {
          if (!await this.ready)
            return;
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
        if (english2)
          void enTitleHistory.add(getTitleMd5(english2));
        if (japanese2)
          void jpTitleHistory.add(getTitleMd5(japanese2));
        if (pretty)
          void prettyTitleHistory.add(getTitleMd5(pretty));
      };
      const unmarkAsDownloaded = (gid2, { english: english2, japanese: japanese2, pretty } = {}) => {
        void gidHistory.del(String(gid2));
        if (english2)
          void enTitleHistory.del(getTitleMd5(english2));
        if (japanese2)
          void jpTitleHistory.del(getTitleMd5(japanese2));
        if (pretty)
          void prettyTitleHistory.del(getTitleMd5(pretty));
      };
      const isDownloadedByGid = (gid2) => gidHistory.has(String(gid2));
      const isDownloadedByTitle = async ({
        english: english2,
        japanese: japanese2,
        pretty
      } = {}) => {
        if (settings.judgeDownloadedByJapanese && japanese2) {
          const md5v2 = getTitleMd5(japanese2);
          if (await jpTitleHistory.has(md5v2))
            return true;
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
      const createElement = (tag, props, ...children) => {
        if (typeof tag === "function")
          return tag(props, ...children);
        const element = document.createElement(tag);
        Object.entries(props ?? {}).forEach(([name, value]) => {
          if (name === "html")
            element.innerHTML = value;
          else if (name === "class")
            element.classList.add(...String(value).split(" "));
          else if (name === "style" && typeof value === "object") {
            const styleString = Object.entries(value).map(([k, v]) => `${camelCase(k)}:${String(v)}`).join(";");
            element.setAttribute("style", styleString);
          } else if (name.startsWith("on")) {
            element.addEventListener(kebabCase(name.replace("on", "")), value);
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
      const jsx = { createElement, Fragment };
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
        const input = /* @__PURE__ */ jsx.createElement(
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
        if (file)
          return readFile(file);
      };
      const showMessage = (params) => elementPlus.ElMessage({ ...params, appendTo: _monkeyWindow.document.body });
      const _hoisted_1$1 = { class: "nhentai-helper-setting-help-buttons no-sl" };
      const _hoisted_2 = ["id"];
      const _hoisted_3 = { id: "nhentai-helper-setting-dialog" };
      const _hoisted_4 = {
        class: "asterisk-example no-sl",
        style: { "margin-bottom": "18px" }
      };
      const _hoisted_5 = { class: "inline-item" };
      const _hoisted_6 = { class: "inline-item__name" };
      const _hoisted_7 = { class: "inline-item" };
      const _hoisted_8 = { class: "inline-item__name" };
      const _hoisted_9 = { style: { "color": "var(--el-text-color-regular)" } };
      const _hoisted_10 = {
        key: 0,
        class: "no-sl"
      };
      const _hoisted_11 = {
        key: 0,
        class: "no-sl"
      };
      const _hoisted_12 = { class: "no-sl" };
      const _hoisted_13 = { class: "no-sl" };
      const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
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
              modelValue: show.value,
              "onUpdate:modelValue": _cache[25] || (_cache[25] = ($event) => show.value = $event),
              center: true,
              top: "50px"
            }, {
              header: vue.withCtx(({ titleId, titleClass }) => [
                vue.createElementVNode("div", _hoisted_1$1, [
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
                }, vue.toDisplayString(vue.unref(t2)("setting.title")), 11, _hoisted_2)
              ]),
              default: vue.withCtx(() => [
                vue.createElementVNode("div", _hoisted_3, [
                  vue.createElementVNode("div", _hoisted_4, vue.toDisplayString(vue.unref(t2)("setting.asteriskTip")), 1),
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
                          vue.createElementVNode("div", _hoisted_5, [
                            vue.createElementVNode("span", _hoisted_6, vue.toDisplayString(vue.unref(t2)("setting.maxNumber")), 1),
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
                          vue.createElementVNode("div", _hoisted_7, [
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
                        label: vue.unref(t2)("setting.autoCancelDownloadedManga")
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(elementPlus.ElSwitch), {
                            modelValue: vue.unref(writeableSettings).autoCancelDownloadedManga,
                            "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => vue.unref(writeableSettings).autoCancelDownloadedManga = $event)
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
                            "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => vue.unref(writeableSettings).autoRetryWhenErrorOccurs = $event)
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
                            "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => vue.unref(writeableSettings).autoShowAll = $event)
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
                            "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => vue.unref(writeableSettings).showIgnoreButton = $event)
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
                            "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => vue.unref(writeableSettings).judgeDownloadedByEnglish = $event),
                            label: vue.unref(t2)("common.english")
                          }, null, 8, ["modelValue", "label"]),
                          vue.createVNode(vue.unref(elementPlus.ElCheckbox), {
                            modelValue: vue.unref(writeableSettings).judgeDownloadedByJapanese,
                            "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => vue.unref(writeableSettings).judgeDownloadedByJapanese = $event),
                            label: vue.unref(t2)("common.japanese")
                          }, null, 8, ["modelValue", "label"]),
                          vue.createVNode(vue.unref(elementPlus.ElCheckbox), {
                            modelValue: vue.unref(writeableSettings).judgeDownloadedByPretty,
                            "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => vue.unref(writeableSettings).judgeDownloadedByPretty = $event),
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
                            "onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => vue.unref(writeableSettings).addMetaFile = $event)
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
                        key: 0,
                        label: `└ ${vue.unref(t2)("setting.metaFileTitleLanguage")}`
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(elementPlus.ElSelect), {
                            modelValue: vue.unref(writeableSettings).metaFileTitleLanguage,
                            "onUpdate:modelValue": _cache[18] || (_cache[18] = ($event) => vue.unref(writeableSettings).metaFileTitleLanguage = $event)
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
                        key: 1,
                        label: vue.unref(t2)("setting.nHentaiDownloadHost")
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(elementPlus.ElSelect), {
                            modelValue: vue.unref(writeableSettings).nHentaiDownloadHost,
                            "onUpdate:modelValue": _cache[19] || (_cache[19] = ($event) => vue.unref(writeableSettings).nHentaiDownloadHost = $event),
                            disabled: !!vue.unref(writeableSettings).customDownloadUrl
                          }, {
                            default: vue.withCtx(() => [
                              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(nHentaiDownloadHosts), (host2) => {
                                return vue.openBlock(), vue.createBlock(vue.unref(elementPlus.ElOption), {
                                  key: host2,
                                  label: host2,
                                  value: host2
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
                            "onUpdate:modelValue": _cache[20] || (_cache[20] = ($event) => vue.unref(writeableSettings).customDownloadUrl = $event)
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
                            "onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => vue.unref(writeableSettings).compressionStreamFiles = $event)
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
                            "onUpdate:modelValue": _cache[22] || (_cache[22] = ($event) => vue.unref(writeableSettings).seriesMode = $event)
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
                            "onUpdate:modelValue": _cache[23] || (_cache[23] = ($event) => vue.unref(writeableSettings).streamDownload = $event),
                            disabled: vue.unref(DISABLE_STREAM_DOWNLOAD)
                          }, null, 8, ["modelValue", "disabled"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      vue.unref(IS_NHENTAI) ? (vue.openBlock(), vue.createBlock(vue.unref(elementPlus.ElFormItem), {
                        key: 2,
                        class: "refresh-required",
                        label: vue.unref(t2)("setting.preventConsoleClearing")
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(elementPlus.ElSwitch), {
                            modelValue: vue.unref(writeableSettings).preventConsoleClearing,
                            "onUpdate:modelValue": _cache[24] || (_cache[24] = ($event) => vue.unref(writeableSettings).preventConsoleClearing = $event)
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
                                    default: vue.withCtx(() => [
                                      vue.createTextVNode("+")
                                    ]),
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
                                      vue.createVNode(_sfc_main$2, {
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
                      })
                    ]),
                    _: 1
                  }),
                  vue.createVNode(vue.unref(elementPlus.ElDivider), null, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(vue.toDisplayString(vue.unref(t2)("setting.history.title")), 1)
                    ]),
                    _: 1
                  }),
                  vue.createElementVNode("p", _hoisted_12, vue.toDisplayString(vue.unref(t2)("setting.history.downloadedNumberTip", {
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
                  vue.createVNode(_sfc_main$2, { onConfirm: clearHistory }, {
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
                  vue.createElementVNode("p", _hoisted_13, vue.toDisplayString(vue.unref(t2)("setting.history.importTip")), 1)
                ])
              ]),
              _: 1
            }, 8, ["modelValue"]);
          };
        }
      });
      const SettingsDialog = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-35ed07a0"]]);
      const compileTemplate = (tpl) => template(tpl, { interpolate: /{{([\s\S]+?)}}/g });
      const getDownloadExt = () => {
        const ext = last(settings.compressionFilename.split("."));
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
        const $btn = $("#show-all-images-button");
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
              resolve($("#show-all-images-button"));
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
                        if (Object.prototype.hasOwnProperty.call(obj, key))
                          newObj[key] = obj[key];
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
                    if (!obj)
                      continue;
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
                  function camelCase2(string) {
                    return string.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(match2, letter) {
                      return letter.toUpperCase();
                    });
                  }
                  function getVendorProp(name) {
                    var style = document.body.style;
                    if (name in style)
                      return name;
                    var i = cssPrefixes.length;
                    var capName = name.charAt(0).toUpperCase() + name.slice(1);
                    var vendorName = void 0;
                    while (i--) {
                      vendorName = cssPrefixes[i] + capName;
                      if (vendorName in style)
                        return vendorName;
                    }
                    return name;
                  }
                  function getStyleProp(name) {
                    name = camelCase2(name);
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
                  if (hasClass(oldList, name))
                    return;
                  element.className = newList.substring(1);
                }
                function removeClass(element, name) {
                  var oldList = classList(element);
                  var newList = void 0;
                  if (!hasClass(element, name))
                    return;
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
                    if (API.PageHidden)
                      stopAll();
                    else
                      resumeAll();
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
                        if (Object.prototype.hasOwnProperty.call(obj, key))
                          newObj[key] = obj[key];
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
                      if (Store[i].options.queue === queueName && !Store[i].closed)
                        count++;
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
                    if (noty2)
                      noty2.show();
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
                        if (Object.prototype.hasOwnProperty.call(obj, key))
                          newObj[key] = obj[key];
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
                exports22.NotyButton = function NotyButton2(html2, classes, cb) {
                  var _this = this;
                  var attributes = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
                  _classCallCheck(this, NotyButton2);
                  this.dom = document.createElement("button");
                  this.dom.innerHTML = html2;
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
                      if ("value" in descriptor)
                        descriptor.writable = true;
                      Object.defineProperty(target, descriptor.key, descriptor);
                    }
                  }
                  return function(Constructor, protoProps, staticProps) {
                    if (protoProps)
                      defineProperties(Constructor.prototype, protoProps);
                    if (staticProps)
                      defineProperties(Constructor, staticProps);
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
                      if (promise._state !== PENDING)
                        ;
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
                      if ("value" in descriptor)
                        descriptor.writable = true;
                      Object.defineProperty(target, descriptor.key, descriptor);
                    }
                  }
                  return function(Constructor, protoProps, staticProps) {
                    if (protoProps)
                      defineProperties(Constructor.prototype, protoProps);
                    if (staticProps)
                      defineProperties(Constructor, staticProps);
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
                        if (Object.prototype.hasOwnProperty.call(obj, key))
                          newObj[key] = obj[key];
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
                      if (this.options.timeout)
                        Utils.addClass(this.barDom, "noty_has_timeout");
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
                    value: function setText(html2) {
                      var optionsOverride = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
                      if (this.barDom) {
                        this.barDom.querySelector(".noty_body").innerHTML = html2;
                      }
                      if (optionsOverride)
                        this.options.text = html2;
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
                      if (optionsOverride)
                        this.options.type = type;
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
                      if (optionsOverride)
                        this.options.theme = theme;
                      return this;
                    }
                    /**
                     * @return {Noty}
                     */
                  }, {
                    key: "close",
                    value: function close() {
                      var _this4 = this;
                      if (this.closed)
                        return this;
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
          "errorRetryConfirm": (ctx) => `Error occurred while ${getActionText(ctx)}, retry?`,
          "errorRetryTip": (ctx) => `Error occurred while ${getActionText(ctx)}, retrying...`,
          "downloadedTip": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "<i>" }, { "t": 4, "k": "title" }, { "t": 3, "v": "</i> is already downloaded or in queue." }] } },
          "getMediaUrlTemplateFailed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": 'Fail to get image download url. Please set "' }, { "t": 6, "k": { "t": 9, "v": "setting.customDownloadUrl" } }, { "t": 3, "v": '" manually, or open a github issue to report with current url.' }] } }
        },
        "button": {
          "download": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Download" } },
          "downloading": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Downloading" } },
          "compressing": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Compressing" } }
        },
        "confirmPopup": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Are you sure?" } },
          "yes": { "t": 0, "b": { "static": "", "t": 2, "i": [] } },
          "no": { "t": 0, "b": { "static": "", "t": 2, "i": [] } }
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
          "errorRetryConfirm": (ctx) => `${getActionText(ctx)}发生错误，是否重试？`,
          "errorRetryTip": (ctx) => `${getActionText(ctx)}发生错误，重试中……`,
          "downloadedTip": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "《" }, { "t": 4, "k": "title" }, { "t": 3, "v": "》已经下载过或在队列中" }] } },
          "getMediaUrlTemplateFailed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "获取图片下载地址失败，请手动设置“" }, { "t": 6, "k": { "t": 9, "v": "setting.customDownloadUrl" } }, { "t": 3, "v": "”，或前往 github issue 或脚本页面反馈并附带当前网址" }] } }
        },
        "button": {
          "download": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "下载" } },
          "downloading": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "下载中" } },
          "compressing": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "压缩中" } }
        },
        "confirmPopup": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "真的吗？" } },
          "yes": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "真的" } },
          "no": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "算了" } }
        }
      };
      const i18n = createI18n({
        legacy: false,
        locale: settings.language,
        fallbackLocale: "en",
        messages: { en: resource$1, zh: resource }
      });
      const { t: t$1 } = i18n.global;
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
            text: t$1("dialog.downloadAgainConfirm", { title, hasQueue }),
            buttons: [
              Noty.button(t$1("dialog.yes"), "btn btn-noty-blue btn-noty", () => {
                n.close();
                resolve(true);
              }),
              Noty.button(t$1("dialog.no"), "btn btn-noty-green btn-noty", () => {
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
          text: t$1("dialog.errorRetryConfirm", { action }),
          buttons: [
            Noty.button(t$1("dialog.no"), "btn btn-noty-blue btn-noty", () => {
              n.close();
              noCb == null ? void 0 : noCb();
            }),
            Noty.button(t$1("dialog.yes"), "btn btn-noty-green btn-noty", () => {
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
          text: t$1("dialog.downloadedTip", { title })
        }).show();
      };
      const errorRetryTip = (action) => {
        new Noty({
          type: "warning",
          layout: "bottomRight",
          theme: "nest",
          closeWith: [],
          timeout: 3e3,
          text: t$1("dialog.errorRetryTip", { action })
        }).show();
      };
      const openAlert = (i18nKey) => {
        const n = new Noty({
          layout: "center",
          theme: "nest",
          modal: true,
          closeWith: [],
          text: t$1(i18nKey),
          buttons: [
            Noty.button("OK", "btn btn-noty-blue btn-noty", () => {
              n.close();
            })
          ]
        });
        n.show();
      };
      var StreamSaver = { exports: {} };
      /*! streamsaver. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
      (function(module2) {
        ((name, definition) => {
          module2.exports = definition();
        })("streamSaver", () => {
          const global2 = typeof window === "object" ? window : this;
          if (!global2.HTMLElement)
            console.warn("streamsaver is meant to run on browsers main thread");
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
            if (!src)
              throw new Error("meh");
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
              if (this.aborted)
                break;
              const i = this.taskIndex++;
              if (i >= this.tasks.length)
                break;
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
                if (status === 200)
                  resolve(response);
                else if (retry === 0)
                  reject(r);
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
      const checkHost = async (url) => {
        const { origin } = new URL(url);
        try {
          await fetch(origin, { method: "HEAD", mode: "no-cors" });
          return true;
        } catch {
          return false;
        }
      };
      class Counter {
        constructor(keys2) {
          __publicField(this, "countMap", {});
          __publicField(this, "countKeys");
          if (!keys2.length)
            throw new Error("Counter no key");
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
      const loadHTML = (html2) => {
        const parser2 = new DOMParser();
        return $(parser2.parseFromString(html2, "text/html").body);
      };
      var NHentaiImgExt = /* @__PURE__ */ ((NHentaiImgExt2) => {
        NHentaiImgExt2["j"] = "jpg";
        NHentaiImgExt2["p"] = "png";
        NHentaiImgExt2["g"] = "gif";
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
      const getMediaDownloadUrlOnMirrorSite = async (mid, filename) => (await getCompliedMediaUrlTemplate())({ mid, filename });
      const getGalleryFromApi = (gid2) => {
        const url = `https://nhentai.net/api/gallery/${gid2}`;
        return fetchJSON(url);
      };
      const getGalleryFromWebpage = async (gid) => {
        var _a;
        let doc = document;
        if (!IS_PAGE_MANGA_DETAIL) {
          const html = await getText(`/g/${gid}`);
          const match = (_a = /gallery(\(\{[\s\S]+\}\));/.exec(html)) == null ? void 0 : _a[1];
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
        const $doc = $(doc.body);
        const english = $doc.find("#info h1").text();
        const japanese = $doc.find("#info h2").text();
        const pages = [];
        let mediaId = "";
        $doc.find("#thumbnail-container img").each((i, img) => {
          const src = img.dataset.src ?? img.src;
          const match2 = /\/(\d+)\/(\d+)t?\.(\w+)/.exec(src);
          if (!match2)
            return;
          const [, mid, index, ext] = match2;
          if (!mediaId)
            mediaId = mid;
          const t2 = getTypeFromExt(ext);
          if (!t2)
            return;
          pages[Number(index) - 1] = { t: t2 };
        });
        if (!english && !japanese || !mediaId || !pages.length) {
          throw new Error("Get gallery info error.");
        }
        const getTags = (type, elContains) => {
          const $names = $(`#tags .tag-container:contains(${elContains}) .tag > .name`);
          const names = filter(Array.from($names).map((el) => el.innerText.trim()));
          return names.map((name) => ({ type, name }));
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
        const uploadDateStr = $("#tags .tag-container:contains(Uploaded) time").attr("datetime");
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
          upload_date: uploadDate && String(uploadDate) !== "Invalid Date" ? Math.floor(uploadDate.getTime() / 1e3) : void 0
        };
      };
      const getCFNameArtists = (tags2) => {
        const artists = map(
          tags2.filter(({ name, type }) => type === "artist" && name),
          "name"
        );
        if (!artists.length)
          return "none";
        const maxNum = settings.filenameMaxArtistsNumber;
        if (maxNum && artists.length > maxNum)
          return "various";
        return artists.join(settings.filenameArtistsSeparator);
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
          title,
          images: { pages: pages2 },
          num_pages,
          tags: tags2,
          upload_date
        } = await (async () => {
          var _a;
          if (gid2)
            return getGallery(gid2);
          const gidFromUrl = (_a = /^\/g\/(\d+)/.exec(location.pathname)) == null ? void 0 : _a[1];
          const localGallery = _unsafeWindow._gallery ?? _unsafeWindow.gallery;
          if (localGallery) {
            if (gidFromUrl)
              localGallery.id = Number(gidFromUrl);
            return localGallery;
          }
          if (gidFromUrl)
            return getGallery(gidFromUrl);
          throw new Error("Cannot get gallery info.");
        })();
        const { english: english2, japanese: japanese2, pretty } = title;
        const infoPages = (Array.isArray(pages2) ? pages2 : Object.values(pages2)).map(
          ({ t: t2, w, h: h2 }, i) => ({ i: i + 1, t: NHentaiImgExt[t2], w, h: h2 })
        );
        const info = {
          gid: id,
          mid: media_id,
          title,
          pages: infoPages,
          cfName: compileTemplate(settings.compressionFilename)({
            english: applyTitleReplacement(english2 || japanese2),
            japanese: applyTitleReplacement(japanese2 || english2),
            pretty: applyTitleReplacement(pretty || english2 || japanese2),
            id,
            pages: num_pages,
            artist: getCFNameArtists(tags2)
          }).replace(/[/\\:*?"<>|]/g, ""),
          tags: tags2,
          uploadDate: upload_date
        };
        logger.log("info", info);
        return info;
      };
      const fetchMediaUrlTemplate = async () => {
        var _a, _b, _c;
        const onlineViewUrl = ((_b = (_a = document.querySelector(".gallery a")) == null ? void 0 : _a.getAttribute("href")) == null ? void 0 : _b.concat("/1")) ?? ((_c = document.querySelector("a.gallerythumb")) == null ? void 0 : _c.getAttribute("href"));
        if (!onlineViewUrl) {
          throw new Error("get media url failed: cannot find a gallery");
        }
        logger.log(`fetching media url template by ${onlineViewUrl}`);
        const onlineViewHtml = await getText(onlineViewUrl);
        const $doc2 = loadHTML(onlineViewHtml);
        const imgSrc = $doc2.find("#image-container img").attr("src");
        if (!imgSrc) {
          throw new Error("get media url failed: cannot find an image src");
        }
        const template2 = imgSrc.replace(/\/\d+\//, "/{{mid}}/").replace(/\/\d+\.[^/]+$/, "/{{filename}}");
        _GM_setValue(MEDIA_URL_TEMPLATE_KEY, template2);
        return template2;
      };
      const getMediaUrlTemplate = async () => {
        const cachedTemplate = _GM_getValue(MEDIA_URL_TEMPLATE_KEY);
        if (cachedTemplate && await checkHost(cachedTemplate)) {
          logger.log(`use cached media url template: ${cachedTemplate}`);
          return cachedTemplate;
        }
        try {
          const template2 = await fetchMediaUrlTemplate();
          logger.log(`use media url template: ${template2}`);
          return template2;
        } catch (error) {
          openAlert("dialog.getMediaUrlTemplateFailed");
          logger.error(error);
          throw error;
        }
      };
      const getCompliedMediaUrlTemplate = once(async () => compileTemplate(await getMediaUrlTemplate()));
      const applyTitleReplacement = (title) => {
        if (!validTitleReplacement.value.length)
          return title;
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
        if (!textareaEl)
          textareaEl = document.createElement("textarea");
        textareaEl.innerText = text;
        const encodedText = textareaEl.innerHTML;
        textareaEl.innerHTML = "";
        return encodedText;
      };
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
          if (!isNil(value))
            el.innerHTML = encodeHtml(String(value));
          if (attrs) {
            forEach(attrs, (v, k) => {
              if (!isNil(v))
                el.setAttribute(k, String(v));
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
        if (!settings.addMetaFile.length)
          return [];
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
      var ErrorAction = /* @__PURE__ */ ((ErrorAction2) => {
        ErrorAction2["GET_INFO"] = "getInfo";
        ErrorAction2["DOWNLOAD"] = "download";
        return ErrorAction2;
      })(ErrorAction || {});
      const downloadGalleryByInfo = async (info, { progressDisplayController, rangeCheckers } = {}) => {
        info.done = 0;
        let { mid, pages: pages2, cfName } = info.gallery;
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
        const downloadTask = async (page, threadID, { filenameLength, customDownloadUrl }) => {
          if (info.error)
            return { abort: () => {
            }, promise: Promise.resolve() };
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
          } : getMediaDownloadUrl(mid, `${page.i}.${page.t}`) : await getMediaDownloadUrlOnMirrorSite(mid, `${page.i}.${page.t}`).catch(() => {
          });
          if (!urlGetter) {
            info.error = true;
            return { abort: () => {
            }, promise: Promise.resolve() };
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
                zip.file(`${String(page.i).padStart(filenameLength || 0, "0")}.${page.t}`, data);
              }
              info.done++;
              progressDisplayController == null ? void 0 : progressDisplayController.updateProgress();
            }).catch((e) => {
              if (isAbortError(e))
                return;
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
      const { t } = i18n.global;
      class ProgressDisplayController {
        constructor(enableHeadTxt = false, docTitle) {
          __publicField(this, "downloadBtn");
          __publicField(this, "btnTxt");
          __publicField(this, "info");
          this.enableHeadTxt = enableHeadTxt;
          this.docTitle = docTitle;
          this.btnTxt = /* @__PURE__ */ jsx.createElement("span", { class: "download-zip-txt" }, this.defaultBtnText());
          this.downloadBtn = /* @__PURE__ */ jsx.createElement("button", { class: "btn btn-secondary nhentai-helper-btn download-zip-btn" }, /* @__PURE__ */ jsx.createElement("i", { class: "fa fa-download" }), " ", this.btnTxt);
        }
        get compressingHeadText() {
          return this.enableHeadTxt ? `${t("button.compressing")} ${getDownloadExt()} ` : "";
        }
        get downloadingHeadText() {
          return this.enableHeadTxt ? `${t("button.downloading")} ${getDownloadExt()} ` : "";
        }
        defaultBtnText(suffix) {
          if (!this.enableHeadTxt)
            return suffix ?? "";
          return `${t("button.download")} ${getDownloadExt()}${suffix ? ` ${suffix}` : ""}`;
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
          this.icon = /* @__PURE__ */ jsx.createElement("i", { class: this.iconClass });
          if (text)
            this.text = /* @__PURE__ */ jsx.createElement("span", null, this.btnText);
          this.ignoreBtn = /* @__PURE__ */ jsx.createElement("button", { class: "btn btn-secondary nhentai-helper-btn ignore-btn" }, this.icon, " ", this.text);
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
        const pagesInput = /* @__PURE__ */ jsx.createElement("input", { class: "pages-input", placeholder: "Download pages (e.g. 1-10,12,14,18-)" });
        $("#info > .buttons").append(downloadBtn).after(pagesInput);
        let ignoreController;
        if (settings.showIgnoreButton) {
          const gallery2 = await getGalleryInfo();
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
          $("#info > .buttons").append(ignoreBtn);
        }
        downloadBtn.addEventListener("click", async () => {
          var _a;
          const gallery2 = await getGalleryInfo();
          const rangeCheckers = pagesInput.value.split(",").filter((range) => !Number.isNaN(parseInt(range))).map((range) => {
            const [start, end] = range.split("-").map((num) => parseInt(num));
            if (typeof end === "undefined")
              return (page) => page === start;
            else if (Number.isNaN(end))
              return (page) => page >= start;
            else
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
        return target || vue.getCurrentInstance();
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
      function unrefElement(elRef) {
        var _a;
        const plain = toValue(elRef);
        return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
      }
      const defaultWindow = isClient ? window : void 0;
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
            useEventListener(window2, "storage", update);
            useEventListener(window2, customStorageEventName, updateFromCustomEvent);
            if (initOnMounted)
              update();
          });
        }
        if (!initOnMounted)
          update();
        function dispatchWriteEvent(oldValue, newValue) {
          if (window2) {
            window2.dispatchEvent(new CustomEvent(customStorageEventName, {
              detail: {
                key,
                oldValue,
                newValue,
                storageArea: storage
              }
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
      const _hoisted_1 = { class: "language-filter" };
      const _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
          ] : [
            ["japanese", "6346"],
            ["english", "12227"],
            ["chinese", "29963"]
          ];
          vue.watch(
            languageFilter,
            (val) => {
              filterLanguage(languageFilter.value);
            },
            { deep: true, immediate: true }
          );
          __expose({
            filterLanguage: ($node) => {
              filterLanguage(languageFilter.value, $node);
            }
          });
          return (_ctx, _cache) => {
            return vue.openBlock(), vue.createElementBlock("li", _hoisted_1, [
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
      const LanguageFilter = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-73f7b9fb"]]);
      const filterLanguage = (tags2, $node) => {
        const getNode = $node ? (selector) => $node.find(selector) : (selector) => $(selector);
        getNode(".gallery").removeClass("hidden");
        if (tags2.length) {
          const notSelector = tags2.map((tag) => `:not([data-tags~=${tag}])`).join("");
          getNode(`.gallery${notSelector}`).addClass("hidden");
        }
      };
      const mountLanguageFilter = () => {
        var _a;
        const menuLeft = document.querySelector("ul.menu.left");
        if (!menuLeft)
          return {};
        const vnode = vue.h(LanguageFilter);
        vue.render(vnode, menuLeft);
        return ((_a = vnode.component) == null ? void 0 : _a.exposed) ?? {};
      };
      const initListPage = () => {
        $(".gallery").each(initGallery);
        const { filterLanguage: filterLanguage2 } = mountLanguageFilter();
        initShortcut();
        restoreDownloadQueue();
        const contentEl = $("#content")[0];
        if (contentEl) {
          new MutationObserver((mutations) => {
            mutations.forEach(({ addedNodes }) => {
              addedNodes.forEach((node) => {
                const $el = $(node);
                $el.find(".gallery").each(initGallery);
                filterLanguage2 == null ? void 0 : filterLanguage2($el);
              });
            });
          }).observe(contentEl, { childList: true });
        }
      };
      const initShortcut = () => {
        $(document).on("keydown", (event) => {
          switch (event.key) {
            case "ArrowLeft":
              $(".pagination .previous").trigger("click");
              break;
            case "ArrowRight":
              $(".pagination .next").trigger("click");
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
        var _a;
        const $gallery = $(this);
        if ($gallery.attr("init"))
          return;
        $gallery.attr("init", "true");
        const $a = $gallery.find("a.cover");
        if (settings.openOnNewTab)
          $a.attr("target", "_blank");
        const gid2 = (_a = /\/g\/([0-9]+)/.exec($a.attr("href"))) == null ? void 0 : _a[1];
        if (!gid2)
          return;
        const enTitle = $gallery.find(".caption").text().trim();
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
          }
        );
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
              errorRetryConfirm(ErrorAction.GET_INFO, void 0, startDownload);
              return;
            }
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
      };
      class StyleInjector {
        constructor(style) {
          __publicField(this, "styleNode");
          this.styleNode = /* @__PURE__ */ jsx.createElement("style", null, style);
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
        let viewMode = _GM_getValue("online_view_mode", 0);
        applyOnlineViewStyle(!!viewMode, style);
        const btnText = /* @__PURE__ */ jsx.createElement("span", null, viewModeText[viewMode]);
        const btn = /* @__PURE__ */ jsx.createElement("button", { id: "online-view-mode-btn", class: "btn btn-secondary" }, "100% view height ", btnText);
        btn.addEventListener("click", () => {
          viewMode = 1 - viewMode;
          _GM_setValue("online_view_mode", viewMode);
          btnText.innerText = viewModeText[viewMode];
          applyOnlineViewStyle(!!viewMode, style);
        });
        $("#page-container").prepend(btn);
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
        $(document).pjax(".pagination a, .sort a", {
          container: "#content",
          fragment: "#content",
          timeout: 1e4
        });
        $(document).on("pjax:end", () => {
          $(".pagination a").each(function() {
            const $this = $(this);
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
        const { _n_app } = _unsafeWindow;
        if (_n_app) {
          _n_app.install_lazy_loader();
          _n_app.install_blacklisting();
        }
      };
      const createAppAndMount = (component, appInitFunc) => {
        const el = document.createElement("div");
        document.body.append(el);
        const app = vue.createApp(component);
        appInitFunc == null ? void 0 : appInitFunc(app);
        return app.mount(el);
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
      createAppAndMount(_sfc_main$3);
      initPage();
      _GM_registerMenuCommand(i18n.global.t("common.settings"), openSettingsDialog);
    }
  });
  require_main_001();

})(jQuery, Vue, ElementPlus);