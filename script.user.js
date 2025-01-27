// ==UserScript==
// @name               nHentai Helper
// @name:zh-CN         nHentai 助手
// @name:zh-TW         nHentai 助手
// @namespace          https://github.com/Tsuk1ko
// @version            3.19.3
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
// @grant              GM_setClipboard
// @grant              GM_setValue
// @grant              GM_xmlhttpRequest
// @grant              unsafeWindow
// @run-at             document-end
// @noframes
// ==/UserScript==

(n=>{if(typeof GM_addStyle=="function"){GM_addStyle(n);return}const t=document.createElement("style");t.textContent=n,document.head.append(t)})(` .nhentai-helper-hidden {
  display: none !important;
}
.nhentai-helper-btn:disabled {
  cursor: wait;
}
.nhentai-helper-gallery > .nhentai-helper-btn {
  position: absolute;
  top: 0;
  min-width: 42px;
  opacity: .8;
}
.nhentai-helper-gallery:hover > .nhentai-helper-btn {
  opacity: 1;
}
.nhentai-helper-gallery .nhentai-helper-btn {
  position: absolute;
  top: 0;
  margin: 3px;
  z-index: 2;
}
.nhentai-helper-gallery .download-zip-btn {
  left: 0;
}
.nhentai-helper-gallery .ignore-btn {
  display: none;
  right: 0;
}
.nhentai-helper-gallery:hover .ignore-btn {
  display: block;
}
.nhentai-helper-gallery.downloaded .caption {
  color: #999;
}
#page-container {
  position: relative;
}
@media screen and (max-width: 768px) {
  #page-container {
    padding-top: 40px;
  }
}
#online-view-mode-btn {
  position: absolute;
  right: 0;
  top: 0;
  margin: 0;
}
.btn-noty-green {
  background-color: #66bb6a !important;
}
.btn-noty-blue {
  background-color: #42a5f5 !important;
}
.btn-noty:hover {
  filter: brightness(1.15);
}
.noty_buttons {
  padding-top: 0 !important;
}
.pages-input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: inline-block;
  border-radius: 3px;
  padding: 0 .1em 0 1em;
  font-size: 1em;
  width: 100%;
  height: 40px;
  border: 0;
  vertical-align: top;
  margin-top: 5px;
}
.noty_close_button {
  display: none;
}
body.nhentai-helper-nhentai_xxx .reader_outer {
  position: relative;
}
body.nhentai-helper-nhentai_xxx .g_buttons .download-zip-btn {
  margin-left: 5px;
}
.noty_layout_mixin,
#noty_layout__top,
#noty_layout__topLeft,
#noty_layout__topCenter,
#noty_layout__topRight,
#noty_layout__bottom,
#noty_layout__bottomLeft,
#noty_layout__bottomCenter,
#noty_layout__bottomRight,
#noty_layout__center,
#noty_layout__centerLeft,
#noty_layout__centerRight {
  position: fixed;
  margin: 0;
  padding: 0;
  z-index: 9999999;
  -webkit-transform: translateZ(0) scale(1, 1);
  transform: translateZ(0) scale(1);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-font-smoothing: subpixel-antialiased;
  filter: blur(0);
  -webkit-filter: blur(0);
  max-width: 90%;
}
#noty_layout__top {
  top: 0;
  left: 5%;
  width: 90%;
}
#noty_layout__topLeft {
  top: 20px;
  left: 20px;
  width: 325px;
}
#noty_layout__topCenter {
  top: 5%;
  left: 50%;
  width: 325px;
  -webkit-transform: translate(-webkit-calc(-50% - .5px)) translateZ(0) scale(1, 1);
  transform: translate(calc(-50% - .5px)) translateZ(0) scale(1);
}
#noty_layout__topRight {
  top: 20px;
  right: 20px;
  width: 325px;
}
#noty_layout__bottom {
  bottom: 0;
  left: 5%;
  width: 90%;
}
#noty_layout__bottomLeft {
  bottom: 20px;
  left: 20px;
  width: 325px;
}
#noty_layout__bottomCenter {
  bottom: 5%;
  left: 50%;
  width: 325px;
  -webkit-transform: translate(-webkit-calc(-50% - .5px)) translateZ(0) scale(1, 1);
  transform: translate(calc(-50% - .5px)) translateZ(0) scale(1);
}
#noty_layout__bottomRight {
  bottom: 20px;
  right: 20px;
  width: 325px;
}
#noty_layout__center {
  top: 50%;
  left: 50%;
  width: 325px;
  -webkit-transform: translate(-webkit-calc(-50% - .5px), -webkit-calc(-50% - .5px)) translateZ(0) scale(1, 1);
  transform: translate(calc(-50% - .5px), calc(-50% - .5px)) translateZ(0) scale(1);
}
#noty_layout__centerLeft {
  top: 50%;
  left: 20px;
  width: 325px;
  -webkit-transform: translate(0, -webkit-calc(-50% - .5px)) translateZ(0) scale(1, 1);
  transform: translateY(calc(-50% - .5px)) translateZ(0) scale(1);
}
#noty_layout__centerRight {
  top: 50%;
  right: 20px;
  width: 325px;
  -webkit-transform: translate(0, -webkit-calc(-50% - .5px)) translateZ(0) scale(1, 1);
  transform: translateY(calc(-50% - .5px)) translateZ(0) scale(1);
}
.noty_progressbar {
  display: none;
}
.noty_has_timeout.noty_has_progressbar .noty_progressbar {
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 100%;
  background-color: #646464;
  opacity: .2;
  filter: alpha(opacity=10);
}
.noty_bar {
  -webkit-backface-visibility: hidden;
  -webkit-transform: translate(0, 0) translateZ(0) scale(1, 1);
  -ms-transform: translate(0, 0) scale(1, 1);
  transform: translate(0) scale(1);
  -webkit-font-smoothing: subpixel-antialiased;
  overflow: hidden;
}
.noty_effects_open {
  opacity: 0;
  -webkit-transform: translate(50%);
  -ms-transform: translate(50%);
  transform: translate(50%);
  -webkit-animation: noty_anim_in .5s cubic-bezier(.68, -.55, .265, 1.55);
  animation: noty_anim_in .5s cubic-bezier(.68, -.55, .265, 1.55);
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}
.noty_effects_close {
  -webkit-animation: noty_anim_out .5s cubic-bezier(.68, -.55, .265, 1.55);
  animation: noty_anim_out .5s cubic-bezier(.68, -.55, .265, 1.55);
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}
.noty_fix_effects_height {
  -webkit-animation: noty_anim_height 75ms ease-out;
  animation: noty_anim_height 75ms ease-out;
}
.noty_close_with_click {
  cursor: pointer;
}
.noty_close_button {
  position: absolute;
  top: 2px;
  right: 2px;
  font-weight: 700;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  background-color: #0000000d;
  border-radius: 2px;
  cursor: pointer;
  -webkit-transition: all .2s ease-out;
  transition: all .2s ease-out;
}
.noty_close_button:hover {
  background-color: #0000001a;
}
.noty_modal {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #000;
  z-index: 10000;
  opacity: .3;
  left: 0;
  top: 0;
}
.noty_modal.noty_modal_open {
  opacity: 0;
  -webkit-animation: noty_modal_in .3s ease-out;
  animation: noty_modal_in .3s ease-out;
}
.noty_modal.noty_modal_close {
  -webkit-animation: noty_modal_out .3s ease-out;
  animation: noty_modal_out .3s ease-out;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}
@-webkit-keyframes noty_modal_in {
  to {
    opacity: .3;
  }
}
@keyframes noty_modal_in {
  to {
    opacity: .3;
  }
}
@-webkit-keyframes noty_modal_out {
  to {
    opacity: 0;
  }
}
@keyframes noty_modal_out {
  to {
    opacity: 0;
  }
}
@-webkit-keyframes noty_anim_in {
  to {
    -webkit-transform: translate(0);
    transform: translate(0);
    opacity: 1;
  }
}
@keyframes noty_anim_in {
  to {
    -webkit-transform: translate(0);
    transform: translate(0);
    opacity: 1;
  }
}
@-webkit-keyframes noty_anim_out {
  to {
    -webkit-transform: translate(50%);
    transform: translate(50%);
    opacity: 0;
  }
}
@keyframes noty_anim_out {
  to {
    -webkit-transform: translate(50%);
    transform: translate(50%);
    opacity: 0;
  }
}
@-webkit-keyframes noty_anim_height {
  to {
    height: 0;
  }
}
@keyframes noty_anim_height {
  to {
    height: 0;
  }
}
.noty_theme__relax.noty_bar {
  margin: 4px 0;
  overflow: hidden;
  border-radius: 2px;
  position: relative;
}
.noty_theme__relax.noty_bar .noty_body {
  padding: 10px;
}
.noty_theme__relax.noty_bar .noty_buttons {
  border-top: 1px solid #e7e7e7;
  padding: 5px 10px;
}
.noty_theme__relax.noty_type__alert,
.noty_theme__relax.noty_type__notification {
  background-color: #fff;
  border: 1px solid #dedede;
  color: #444;
}
.noty_theme__relax.noty_type__warning {
  background-color: #ffeaa8;
  border: 1px solid #FFC237;
  color: #826200;
}
.noty_theme__relax.noty_type__warning .noty_buttons {
  border-color: #dfaa30;
}
.noty_theme__relax.noty_type__error {
  background-color: #ff8181;
  border: 1px solid #e25353;
  color: #fff;
}
.noty_theme__relax.noty_type__error .noty_buttons {
  border-color: #8b0000;
}
.noty_theme__relax.noty_type__info,
.noty_theme__relax.noty_type__information {
  background-color: #78c5e7;
  border: 1px solid #3badd6;
  color: #fff;
}
.noty_theme__relax.noty_type__info .noty_buttons,
.noty_theme__relax.noty_type__information .noty_buttons {
  border-color: #0b90c4;
}
.noty_theme__relax.noty_type__success {
  background-color: #bcf5bc;
  border: 1px solid #7cdd77;
  color: #006400;
}
.noty_theme__relax.noty_type__success .noty_buttons {
  border-color: #50c24e;
}
.noty_theme__metroui.noty_bar {
  margin: 4px 0;
  overflow: hidden;
  position: relative;
  box-shadow: #0000004c 0 0 5px;
}
.noty_theme__metroui.noty_bar .noty_progressbar {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 100%;
  background-color: #000;
  opacity: .2;
  filter: alpha(opacity=20);
}
.noty_theme__metroui.noty_bar .noty_body {
  padding: 1.25em;
  font-size: 14px;
}
.noty_theme__metroui.noty_bar .noty_buttons {
  padding: 0 10px .5em;
}
.noty_theme__metroui.noty_type__alert,
.noty_theme__metroui.noty_type__notification {
  background-color: #fff;
  color: #1d1d1d;
}
.noty_theme__metroui.noty_type__warning {
  background-color: #fa6800;
  color: #fff;
}
.noty_theme__metroui.noty_type__error {
  background-color: #ce352c;
  color: #fff;
}
.noty_theme__metroui.noty_type__info,
.noty_theme__metroui.noty_type__information {
  background-color: #1ba1e2;
  color: #fff;
}
.noty_theme__metroui.noty_type__success {
  background-color: #60a917;
  color: #fff;
}
.noty_theme__mint.noty_bar {
  margin: 4px 0;
  overflow: hidden;
  border-radius: 2px;
  position: relative;
}
.noty_theme__mint.noty_bar .noty_body {
  padding: 10px;
  font-size: 14px;
}
.noty_theme__mint.noty_bar .noty_buttons {
  padding: 10px;
}
.noty_theme__mint.noty_type__alert,
.noty_theme__mint.noty_type__notification {
  background-color: #fff;
  border-bottom: 1px solid #D1D1D1;
  color: #2f2f2f;
}
.noty_theme__mint.noty_type__warning {
  background-color: #ffae42;
  border-bottom: 1px solid #E89F3C;
  color: #fff;
}
.noty_theme__mint.noty_type__error {
  background-color: #de636f;
  border-bottom: 1px solid #CA5A65;
  color: #fff;
}
.noty_theme__mint.noty_type__info,
.noty_theme__mint.noty_type__information {
  background-color: #7f7eff;
  border-bottom: 1px solid #7473E8;
  color: #fff;
}
.noty_theme__mint.noty_type__success {
  background-color: #afc765;
  border-bottom: 1px solid #A0B55C;
  color: #fff;
}
.noty_theme__sunset.noty_bar {
  margin: 4px 0;
  overflow: hidden;
  border-radius: 2px;
  position: relative;
}
.noty_theme__sunset.noty_bar .noty_body {
  padding: 10px;
  font-size: 14px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, .1);
}
.noty_theme__sunset.noty_bar .noty_buttons {
  padding: 10px;
}
.noty_theme__sunset.noty_type__alert,
.noty_theme__sunset.noty_type__notification {
  background-color: #073b4c;
  color: #fff;
}
.noty_theme__sunset.noty_type__alert .noty_progressbar,
.noty_theme__sunset.noty_type__notification .noty_progressbar {
  background-color: #fff;
}
.noty_theme__sunset.noty_type__warning {
  background-color: #ffd166;
  color: #fff;
}
.noty_theme__sunset.noty_type__error {
  background-color: #ef476f;
  color: #fff;
}
.noty_theme__sunset.noty_type__error .noty_progressbar {
  opacity: .4;
}
.noty_theme__sunset.noty_type__info,
.noty_theme__sunset.noty_type__information {
  background-color: #118ab2;
  color: #fff;
}
.noty_theme__sunset.noty_type__info .noty_progressbar,
.noty_theme__sunset.noty_type__information .noty_progressbar {
  opacity: .6;
}
.noty_theme__sunset.noty_type__success {
  background-color: #06d6a0;
  color: #fff;
}
.noty_theme__bootstrap-v3.noty_bar {
  margin: 4px 0;
  overflow: hidden;
  position: relative;
  border: 1px solid transparent;
  border-radius: 4px;
}
.noty_theme__bootstrap-v3.noty_bar .noty_body {
  padding: 15px;
}
.noty_theme__bootstrap-v3.noty_bar .noty_buttons {
  padding: 10px;
}
.noty_theme__bootstrap-v3.noty_bar .noty_close_button {
  font-size: 21px;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  filter: alpha(opacity=20);
  opacity: .2;
  background: transparent;
}
.noty_theme__bootstrap-v3.noty_bar .noty_close_button:hover {
  background: transparent;
  text-decoration: none;
  cursor: pointer;
  filter: alpha(opacity=50);
  opacity: .5;
}
.noty_theme__bootstrap-v3.noty_type__alert,
.noty_theme__bootstrap-v3.noty_type__notification {
  background-color: #fff;
  color: inherit;
}
.noty_theme__bootstrap-v3.noty_type__warning {
  background-color: #fcf8e3;
  color: #8a6d3b;
  border-color: #faebcc;
}
.noty_theme__bootstrap-v3.noty_type__error {
  background-color: #f2dede;
  color: #a94442;
  border-color: #ebccd1;
}
.noty_theme__bootstrap-v3.noty_type__info,
.noty_theme__bootstrap-v3.noty_type__information {
  background-color: #d9edf7;
  color: #31708f;
  border-color: #bce8f1;
}
.noty_theme__bootstrap-v3.noty_type__success {
  background-color: #dff0d8;
  color: #3c763d;
  border-color: #d6e9c6;
}
.noty_theme__bootstrap-v4.noty_bar {
  margin: 4px 0;
  overflow: hidden;
  position: relative;
  border: 1px solid transparent;
  border-radius: .25rem;
}
.noty_theme__bootstrap-v4.noty_bar .noty_body {
  padding: .75rem 1.25rem;
}
.noty_theme__bootstrap-v4.noty_bar .noty_buttons {
  padding: 10px;
}
.noty_theme__bootstrap-v4.noty_bar .noty_close_button {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  filter: alpha(opacity=20);
  opacity: .5;
  background: transparent;
}
.noty_theme__bootstrap-v4.noty_bar .noty_close_button:hover {
  background: transparent;
  text-decoration: none;
  cursor: pointer;
  filter: alpha(opacity=50);
  opacity: .75;
}
.noty_theme__bootstrap-v4.noty_type__alert,
.noty_theme__bootstrap-v4.noty_type__notification {
  background-color: #fff;
  color: inherit;
}
.noty_theme__bootstrap-v4.noty_type__warning {
  background-color: #fcf8e3;
  color: #8a6d3b;
  border-color: #faebcc;
}
.noty_theme__bootstrap-v4.noty_type__error {
  background-color: #f2dede;
  color: #a94442;
  border-color: #ebccd1;
}
.noty_theme__bootstrap-v4.noty_type__info,
.noty_theme__bootstrap-v4.noty_type__information {
  background-color: #d9edf7;
  color: #31708f;
  border-color: #bce8f1;
}
.noty_theme__bootstrap-v4.noty_type__success {
  background-color: #dff0d8;
  color: #3c763d;
  border-color: #d6e9c6;
}
.noty_theme__semanticui.noty_bar {
  margin: 4px 0;
  overflow: hidden;
  position: relative;
  border: 1px solid transparent;
  font-size: 1em;
  border-radius: .28571429rem;
  box-shadow: 0 0 0 1px #22242638 inset, 0 0 0 0 transparent;
}
.noty_theme__semanticui.noty_bar .noty_body {
  padding: 1em 1.5em;
  line-height: 1.4285em;
}
.noty_theme__semanticui.noty_bar .noty_buttons {
  padding: 10px;
}
.noty_theme__semanticui.noty_type__alert,
.noty_theme__semanticui.noty_type__notification {
  background-color: #f8f8f9;
  color: #000000de;
}
.noty_theme__semanticui.noty_type__warning {
  background-color: #fffaf3;
  color: #573a08;
  box-shadow: 0 0 0 1px #c9ba9b inset, 0 0 0 0 transparent;
}
.noty_theme__semanticui.noty_type__error {
  background-color: #fff6f6;
  color: #9f3a38;
  box-shadow: 0 0 0 1px #e0b4b4 inset, 0 0 0 0 transparent;
}
.noty_theme__semanticui.noty_type__info,
.noty_theme__semanticui.noty_type__information {
  background-color: #f8ffff;
  color: #276f86;
  box-shadow: 0 0 0 1px #a9d5de inset, 0 0 0 0 transparent;
}
.noty_theme__semanticui.noty_type__success {
  background-color: #fcfff5;
  color: #2c662d;
  box-shadow: 0 0 0 1px #a3c293 inset, 0 0 0 0 transparent;
}
.noty_theme__nest.noty_bar {
  margin: 0 0 15px;
  overflow: hidden;
  border-radius: 2px;
  position: relative;
  box-shadow: #00000019 5px 4px 10px;
}
.noty_theme__nest.noty_bar .noty_body {
  padding: 10px;
  font-size: 14px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, .1);
}
.noty_theme__nest.noty_bar .noty_buttons {
  padding: 10px;
}
.noty_layout .noty_theme__nest.noty_bar {
  z-index: 5;
}
.noty_layout .noty_theme__nest.noty_bar:nth-child(2) {
  position: absolute;
  top: 0;
  margin-top: 4px;
  margin-right: -4px;
  margin-left: 4px;
  z-index: 4;
  width: 100%;
}
.noty_layout .noty_theme__nest.noty_bar:nth-child(3) {
  position: absolute;
  top: 0;
  margin-top: 8px;
  margin-right: -8px;
  margin-left: 8px;
  z-index: 3;
  width: 100%;
}
.noty_layout .noty_theme__nest.noty_bar:nth-child(4) {
  position: absolute;
  top: 0;
  margin-top: 12px;
  margin-right: -12px;
  margin-left: 12px;
  z-index: 2;
  width: 100%;
}
.noty_layout .noty_theme__nest.noty_bar:nth-child(5) {
  position: absolute;
  top: 0;
  margin-top: 16px;
  margin-right: -16px;
  margin-left: 16px;
  z-index: 1;
  width: 100%;
}
.noty_layout .noty_theme__nest.noty_bar:nth-child(n+6) {
  position: absolute;
  top: 0;
  margin-top: 20px;
  margin-right: -20px;
  margin-left: 20px;
  z-index: -1;
  width: 100%;
}
#noty_layout__bottomLeft .noty_theme__nest.noty_bar:nth-child(2),
#noty_layout__topLeft .noty_theme__nest.noty_bar:nth-child(2) {
  margin-top: 4px;
  margin-left: -4px;
  margin-right: 4px;
}
#noty_layout__bottomLeft .noty_theme__nest.noty_bar:nth-child(3),
#noty_layout__topLeft .noty_theme__nest.noty_bar:nth-child(3) {
  margin-top: 8px;
  margin-left: -8px;
  margin-right: 8px;
}
#noty_layout__bottomLeft .noty_theme__nest.noty_bar:nth-child(4),
#noty_layout__topLeft .noty_theme__nest.noty_bar:nth-child(4) {
  margin-top: 12px;
  margin-left: -12px;
  margin-right: 12px;
}
#noty_layout__bottomLeft .noty_theme__nest.noty_bar:nth-child(5),
#noty_layout__topLeft .noty_theme__nest.noty_bar:nth-child(5) {
  margin-top: 16px;
  margin-left: -16px;
  margin-right: 16px;
}
#noty_layout__bottomLeft .noty_theme__nest.noty_bar:nth-child(n+6),
#noty_layout__topLeft .noty_theme__nest.noty_bar:nth-child(n+6) {
  margin-top: 20px;
  margin-left: -20px;
  margin-right: 20px;
}
.noty_theme__nest.noty_type__alert,
.noty_theme__nest.noty_type__notification {
  background-color: #073b4c;
  color: #fff;
}
.noty_theme__nest.noty_type__alert .noty_progressbar,
.noty_theme__nest.noty_type__notification .noty_progressbar {
  background-color: #fff;
}
.noty_theme__nest.noty_type__warning {
  background-color: #ffd166;
  color: #fff;
}
.noty_theme__nest.noty_type__error {
  background-color: #ef476f;
  color: #fff;
}
.noty_theme__nest.noty_type__error .noty_progressbar {
  opacity: .4;
}
.noty_theme__nest.noty_type__info,
.noty_theme__nest.noty_type__information {
  background-color: #118ab2;
  color: #fff;
}
.noty_theme__nest.noty_type__info .noty_progressbar,
.noty_theme__nest.noty_type__information .noty_progressbar {
  opacity: .6;
}
.noty_theme__nest.noty_type__success {
  background-color: #06d6a0;
  color: #fff;
}
.noty_theme__light.noty_bar {
  margin: 4px 0;
  overflow: hidden;
  border-radius: 2px;
  position: relative;
}
.noty_theme__light.noty_bar .noty_body {
  padding: 10px;
}
.noty_theme__light.noty_bar .noty_buttons {
  border-top: 1px solid #e7e7e7;
  padding: 5px 10px;
}
.noty_theme__light.noty_type__alert,
.noty_theme__light.noty_type__notification {
  background-color: #fff;
  border: 1px solid #dedede;
  color: #444;
}
.noty_theme__light.noty_type__warning {
  background-color: #ffeaa8;
  border: 1px solid #FFC237;
  color: #826200;
}
.noty_theme__light.noty_type__warning .noty_buttons {
  border-color: #dfaa30;
}
.noty_theme__light.noty_type__error {
  background-color: #ed7000;
  border: 1px solid #e25353;
  color: #fff;
}
.noty_theme__light.noty_type__error .noty_buttons {
  border-color: #8b0000;
}
.noty_theme__light.noty_type__info,
.noty_theme__light.noty_type__information {
  background-color: #78c5e7;
  border: 1px solid #3badd6;
  color: #fff;
}
.noty_theme__light.noty_type__info .noty_buttons,
.noty_theme__light.noty_type__information .noty_buttons {
  border-color: #0b90c4;
}
.noty_theme__light.noty_type__success {
  background-color: #57c880;
  border: 1px solid #7cdd77;
  color: #006400;
}
.noty_theme__light.noty_type__success .noty_buttons {
  border-color: #50c24e;
}
.download-item[data-v-83b954f2] {
  position: relative;
  white-space: nowrap;
  padding: 2px;
  overflow: visible;
}
.download-item--can-cancel[data-v-83b954f2]:hover {
  width: calc(100% - 30px);
}
.download-item__cancel[data-v-83b954f2] {
  cursor: pointer;
  position: absolute;
  top: 0;
  right: -30px;
  color: #f44336;
  font-size: 20px;
  line-height: 30px;
  width: 30px;
}
.download-item__title[data-v-83b954f2] {
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}
.download-item__progress[data-v-83b954f2] {
  background-color: #0000ff80;
  line-height: 10px;
}
.download-item--error .download-item__progress[data-v-83b954f2] {
  background-color: #ff000080;
}
.download-item--compressing .download-item__progress[data-v-83b954f2] {
  background-color: #00ff0080;
}
.download-item__progress-text[data-v-83b954f2] {
  transform: scale(.8);
}
#download-panel[data-v-f37e74c3] {
  overflow-x: hidden;
  position: fixed;
  top: 20vh;
  right: 0;
  width: calc(50vw - 620px);
  max-width: 300px;
  min-width: 150px;
  max-height: 60vh;
  background-color: #000000b3;
  z-index: 100;
  font-size: 12px;
  overflow-y: scroll;
}
#download-panel[data-v-f37e74c3]::-webkit-scrollbar {
  width: 6px;
  background-color: #000000b3;
}
#download-panel[data-v-f37e74c3]::-webkit-scrollbar-thumb {
  background-color: #fff9;
}
.nhentai-helper-setting-help-buttons[data-v-b1ccce6d] {
  float: left;
  position: absolute;
}
.inline-item[data-v-b1ccce6d] {
  display: inline-block;
}
.inline-item[data-v-b1ccce6d]:not(:last-of-type) {
  margin-right: 8px;
}
.inline-item__name[data-v-b1ccce6d] {
  margin-right: 4px;
  -webkit-user-select: none;
  user-select: none;
}
.monospace[data-v-b1ccce6d] {
  font-family: monospace;
}
span.monospace[data-v-b1ccce6d] {
  -webkit-user-select: none;
  user-select: none;
}
.code-type[data-v-b1ccce6d] {
  color: var(--el-text-color-secondary);
}
#nhentai-helper-setting-dialog-outside {
  width: 80%;
  max-width: 800px;
}
#nhentai-helper-setting-dialog-outside .no-sl {
  -webkit-user-select: none;
  user-select: none;
}
#nhentai-helper-setting-dialog .asterisk-example:before {
  content: "*";
  color: var(--el-color-danger);
  margin-right: 4px;
}
#nhentai-helper-setting-dialog label {
  font-weight: unset;
}
#nhentai-helper-setting-dialog input:not([type=file]):not([type=checkbox]),
#nhentai-helper-setting-dialog textarea {
  background: inherit;
  color: var(--el-input-text-color, var(--el-text-color-regular));
}
#nhentai-helper-setting-dialog .el-input.is-disabled .el-input__inner {
  color: var(--el-disabled-text-color);
}
#nhentai-helper-setting-dialog .el-slider__stop {
  border: solid 1px var(--el-slider-runway-bg-color);
}
#nhentai-helper-setting-dialog .el-form-item:last-of-type {
  margin-bottom: 0;
}
#nhentai-helper-setting-dialog .el-form-item.refresh-required > .el-form-item__label-wrap > .el-form-item__label:after {
  content: "*";
  color: var(--el-color-danger);
  margin-left: 4px;
}
#nhentai-helper-setting-dialog .el-form-item__content .el-link.is-underline:hover:after {
  bottom: 8px;
}
#nhentai-helper-setting-dialog .el-divider__text {
  color: var(--el-text-color-secondary);
  -webkit-user-select: none;
  user-select: none;
}
#nhentai-helper-setting-dialog .m-l-16 {
  margin-left: 16px;
}
#nhentai-helper-setting-dialog .m-b-32 {
  margin-bottom: 32px;
}
#nhentai-helper-setting-dialog .el-form-item__label {
  -webkit-user-select: none;
  user-select: none;
}
#nhentai-helper-setting-dialog .el-table .el-input__prefix,
#nhentai-helper-setting-dialog .el-table .el-input__suffix {
  line-height: 30px;
}
#nhentai-helper-setting-dialog .el-table__empty-block {
  display: none;
}
#nhentai-helper-setting-dialog .el-link {
  color: var(--el-link-text-color);
}
#nhentai-helper-setting-dialog .el-link:hover {
  color: var(--el-link-hover-text-color);
}
#nhentai-helper-setting-dialog .el-collapse-item__header {
  font-family: inherit;
}
.el-select-dropdown {
  -webkit-user-select: none;
  user-select: none;
}
.language-filter[data-v-e2153767] {
  display: inline-flex;
  align-items: center;
  padding-left: 10px;
  vertical-align: middle;
}
.filter-select[data-v-e2153767] {
  width: 140px;
  margin-right: -140px;
}
.filter-select[data-v-e2153767] .el-input__inner {
  color: var(--el-input-text-color, var(--el-text-color-regular)) !important;
  background: 0 0 !important;
}
@media screen and (max-width: 644px) {
  .language-filter[data-v-e2153767] {
    padding: 10px 0;
  }
  .filter-select[data-v-e2153767] {
    margin-right: 0;
  }
}
.bold[data-v-22c5eb74] {
  font-weight: 700;
}
.info-label[data-v-22c5eb74] {
  display: inline-block;
}
.lang-zh .info-label[data-v-22c5eb74] {
  min-width: 30px;
}
.lang-en .info-label[data-v-22c5eb74] {
  min-width: 80px;
}
.info-tag-wrapper[data-v-22c5eb74] {
  display: flex;
}
.info-tag[data-v-22c5eb74] {
  margin: 2px;
  -webkit-user-select: none;
  user-select: none;
}
.info-tag--pointer[data-v-22c5eb74] {
  cursor: pointer;
}
.image-loading[data-v-22c5eb74] {
  width: 100%;
  height: 100%;
  background-color: #0009;
}
.scroll-container[data-v-22c5eb74] {
  min-height: 400px;
  margin: 8px -8px 0;
  overflow-y: auto;
}
.scroll-container[data-v-22c5eb74]::-webkit-scrollbar {
  width: 6px;
}
.scroll-container[data-v-22c5eb74]::-webkit-scrollbar-thumb {
  background-color: #0003;
  border-radius: 10px;
  transition: all .2s ease-in-out;
}
.scroll-container[data-v-22c5eb74]::-webkit-scrollbar-track {
  border-radius: 10px;
}
.scroll-container-inner[data-v-22c5eb74] {
  padding: 0 8px;
}
.gallery-mini-popover .el-descriptions__header {
  align-items: flex-start !important;
}
.gallery-mini-popover .el-descriptions__extra {
  height: 0;
  white-space: nowrap;
}
.gallery-mini-popover .el-descriptions__title {
  text-align: left !important;
}
.gallery-mini-popover .el-descriptions__cell {
  display: flex;
  padding-bottom: 0 !important;
}
.gallery-mini-popover .el-descriptions__label {
  flex-grow: 0;
  flex-shrink: 0;
}
.gallery-mini-popover .el-descriptions__content {
  flex-grow: 1;
  flex-shrink: 1;
}
.gallery-mini-popover .el-link {
  color: var(--el-link-text-color) !important;
}
.gallery-mini-popover .el-link:hover {
  color: var(--el-link-hover-text-color) !important;
}
.gallery-mini-popover .el-image {
  width: 100%;
}
.popover-transition {
  transition: var(--el-transition-all);
  transition-duration: .2s;
} `);

(function ($, vue, elementPlus) {
  'use strict';

  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __typeError = (msg) => {
    throw TypeError(msg);
  };
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: !0, configurable: !0, writable: !0, value }) : obj[key] = value;
  var __commonJS = (cb, mod) => function() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key != "symbol" ? key + "" : key, value), __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
  var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj)), __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value), __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), member.set(obj, value), value);
  var require_main_001 = __commonJS({
    "main-CNRJj44X.js"(exports, module) {
      var _GM_getValue = typeof GM_getValue < "u" ? GM_getValue : void 0, _GM_openInTab = typeof GM_openInTab < "u" ? GM_openInTab : void 0, _GM_registerMenuCommand = typeof GM_registerMenuCommand < "u" ? GM_registerMenuCommand : void 0, _GM_setClipboard = typeof GM_setClipboard < "u" ? GM_setClipboard : void 0, _GM_setValue = typeof GM_setValue < "u" ? GM_setValue : void 0, _GM_xmlhttpRequest = typeof GM_xmlhttpRequest < "u" ? GM_xmlhttpRequest : void 0, _unsafeWindow = typeof unsafeWindow < "u" ? unsafeWindow : void 0, _monkeyWindow = window;
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
      }, siteMap$1 = {
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
      }, selector = { ...defaultSelector, ...siteMap$1[location.hostname] }, WORKER_THREAD_NUM = Math.max(navigator.hardwareConcurrency - 1, 1), { pathname, hostname } = location, IS_PAGE_MANGA_DETAIL = /^\/g\/[0-9]+\/?(\?.*)?$/.test(pathname), IS_PAGE_ONLINE_VIEW = /^\/g\/[0-9]+(\/list)?\/[0-9]+\/?(\?.*)?$/.test(pathname), IS_PAGE_MANGA_LIST = !IS_PAGE_MANGA_DETAIL && !IS_PAGE_ONLINE_VIEW && !!document.querySelector(selector.gallery), IS_NHENTAI = hostname === "nhentai.net", IS_NHENTAI_TO = hostname === "nhentai.to" || hostname === "nhentai.website", IS_NHENTAI_XXX = hostname === "nhentai.xxx", MEDIA_URL_TEMPLATE_MAY_CHANGE = IS_NHENTAI || IS_NHENTAI_XXX, MEDIA_URL_TEMPLATE_KEY = `media_url_template_${hostname}`, THUMB_MEDIA_URL_TEMPLATE_KEY = `thumb_media_url_template_${hostname}`, isNodeOrElement = typeof Node == "function" ? (val) => val instanceof Node : (val) => val && typeof val == "object" && typeof val.nodeType == "number" && typeof val.nodeName == "string";
      if (IS_NHENTAI && (_GM_getValue("prevent_console_clear", !1) || localStorage.getItem("NHENTAI_HELPER_DEBUG"))) {
        const c = _unsafeWindow.console;
        c._clear = c.clear, c.clear = () => {
        }, c._log = c.log, c.log = (...args) => {
          args.length === 1 && isNodeOrElement(args[0]) || c._log(...args);
        };
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
      (function($2) {
        function fnPjax(selector2, container, options) {
          return options = optionsFor(container, options), this.on("click.pjax", selector2, function(event) {
            var opts = options;
            opts.container || (opts = $2.extend({}, options), opts.container = $2(this).attr("data-pjax")), handleClick(event, opts);
          });
        }
        function handleClick(event, container, options) {
          options = optionsFor(container, options);
          var link = event.currentTarget, $link = $2(link);
          if (link.tagName.toUpperCase() !== "A")
            throw "$.fn.pjax or $.pjax.click requires an anchor element";
          if (!(event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) && !(location.protocol !== link.protocol || location.hostname !== link.hostname) && !(link.href.indexOf("#") > -1 && stripHash(link) == stripHash(location)) && !event.isDefaultPrevented()) {
            var defaults = {
              url: link.href,
              container: $link.attr("data-pjax"),
              target: link
            }, opts = $2.extend({}, defaults, options), clickEvent = $2.Event("pjax:click");
            $link.trigger(clickEvent, [opts]), clickEvent.isDefaultPrevented() || (pjax(opts), event.preventDefault(), $link.trigger("pjax:clicked", [opts]));
          }
        }
        function handleSubmit(event, container, options) {
          options = optionsFor(container, options);
          var form = event.currentTarget, $form = $2(form);
          if (form.tagName.toUpperCase() !== "FORM")
            throw "$.pjax.submit requires a form element";
          var defaults = {
            type: ($form.attr("method") || "GET").toUpperCase(),
            url: $form.attr("action"),
            container: $form.attr("data-pjax"),
            target: form
          };
          if (defaults.type !== "GET" && window.FormData !== void 0)
            defaults.data = new FormData(form), defaults.processData = !1, defaults.contentType = !1;
          else {
            if ($form.find(":file").length)
              return;
            defaults.data = $form.serializeArray();
          }
          pjax($2.extend({}, defaults, options)), event.preventDefault();
        }
        function pjax(options) {
          options = $2.extend(!0, {}, $2.ajaxSettings, pjax.defaults, options), $2.isFunction(options.url) && (options.url = options.url());
          var hash = parseURL(options.url).hash, containerType = $2.type(options.container);
          if (containerType !== "string")
            throw "expected string value for 'container' option; got " + containerType;
          var context = options.context = $2(options.container);
          if (!context.length)
            throw "the container selector '" + options.container + "' did not match anything";
          options.data || (options.data = {}), $2.isArray(options.data) ? options.data.push({ name: "_pjax", value: options.container }) : options.data._pjax = options.container;
          function fire(type, args, props) {
            props || (props = {}), props.relatedTarget = options.target;
            var event = $2.Event(type, props);
            return context.trigger(event, args), !event.isDefaultPrevented();
          }
          var timeoutTimer;
          options.beforeSend = function(xhr2, settings2) {
            if (settings2.type !== "GET" && (settings2.timeout = 0), xhr2.setRequestHeader("X-PJAX", "true"), xhr2.setRequestHeader("X-PJAX-Container", options.container), !fire("pjax:beforeSend", [xhr2, settings2]))
              return !1;
            settings2.timeout > 0 && (timeoutTimer = setTimeout(function() {
              fire("pjax:timeout", [xhr2, options]) && xhr2.abort("timeout");
            }, settings2.timeout), settings2.timeout = 0);
            var url = parseURL(settings2.url);
            hash && (url.hash = hash), options.requestUrl = stripInternalParams(url);
          }, options.complete = function(xhr2, textStatus) {
            timeoutTimer && clearTimeout(timeoutTimer), fire("pjax:complete", [xhr2, textStatus, options]), fire("pjax:end", [xhr2, options]);
          }, options.error = function(xhr2, textStatus, errorThrown) {
            var container = extractContainer("", xhr2, options), allowed = fire("pjax:error", [xhr2, textStatus, errorThrown, options]);
            options.type == "GET" && textStatus !== "abort" && allowed && locationReplace(container.url);
          }, options.success = function(data, status, xhr2) {
            var previousState = pjax.state, currentVersion = typeof $2.pjax.defaults.version == "function" ? $2.pjax.defaults.version() : $2.pjax.defaults.version, latestVersion = xhr2.getResponseHeader("X-PJAX-Version"), container = extractContainer(data, xhr2, options), url = parseURL(container.url);
            if (hash && (url.hash = hash, container.url = url.href), currentVersion && latestVersion && currentVersion !== latestVersion) {
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
            }, (options.push || options.replace) && window.history.replaceState(pjax.state, container.title, container.url);
            var blurFocus = $2.contains(context, document.activeElement);
            if (blurFocus)
              try {
                document.activeElement.blur();
              } catch {
              }
            container.title && (document.title = container.title), fire("pjax:beforeReplace", [container.contents, options], {
              state: pjax.state,
              previousState
            }), context.html(container.contents);
            var autofocusEl = context.find("input[autofocus], textarea[autofocus]").last()[0];
            autofocusEl && document.activeElement !== autofocusEl && autofocusEl.focus(), executeScriptTags(container.scripts);
            var scrollTo = options.scrollTo;
            if (hash) {
              var name = decodeURIComponent(hash.slice(1)), target = document.getElementById(name) || document.getElementsByName(name)[0];
              target && (scrollTo = $2(target).offset().top);
            }
            typeof scrollTo == "number" && $2(window).scrollTop(scrollTo), fire("pjax:success", [data, status, xhr2, options]);
          }, pjax.state || (pjax.state = {
            id: uniqueId(),
            url: window.location.href,
            title: document.title,
            container: options.container,
            fragment: options.fragment,
            timeout: options.timeout
          }, window.history.replaceState(pjax.state, document.title)), abortXHR(pjax.xhr), pjax.options = options;
          var xhr = pjax.xhr = $2.ajax(options);
          return xhr.readyState > 0 && (options.push && !options.replace && (cachePush(pjax.state.id, [options.container, cloneContents(context)]), window.history.pushState(null, "", options.requestUrl)), fire("pjax:start", [xhr, options]), fire("pjax:send", [xhr, options])), pjax.xhr;
        }
        function pjaxReload(container, options) {
          var defaults = {
            url: window.location.href,
            push: !1,
            replace: !0,
            scrollTo: !1
          };
          return pjax($2.extend(defaults, optionsFor(container, options)));
        }
        function locationReplace(url) {
          window.history.replaceState(null, "", pjax.state.url), window.location.replace(url);
        }
        var initialPop = !0, initialURL = window.location.href, initialState = window.history.state;
        initialState && initialState.container && (pjax.state = initialState), "state" in window.history && (initialPop = !1);
        function onPjaxPopstate(event) {
          initialPop || abortXHR(pjax.xhr);
          var previousState = pjax.state, state = event.state, direction;
          if (state && state.container) {
            if (initialPop && initialURL == state.url) return;
            if (previousState) {
              if (previousState.id === state.id) return;
              direction = previousState.id < state.id ? "forward" : "back";
            }
            var cache2 = cacheMapping[state.id] || [], containerSelector = cache2[0] || state.container, container = $2(containerSelector), contents = cache2[1];
            if (container.length) {
              previousState && cachePop(direction, previousState.id, [containerSelector, cloneContents(container)]);
              var popstateEvent = $2.Event("pjax:popstate", {
                state,
                direction
              });
              container.trigger(popstateEvent);
              var options = {
                id: state.id,
                url: state.url,
                container: containerSelector,
                push: !1,
                fragment: state.fragment,
                timeout: state.timeout,
                scrollTo: !1
              };
              if (contents) {
                container.trigger("pjax:start", [null, options]), pjax.state = state, state.title && (document.title = state.title);
                var beforeReplaceEvent = $2.Event("pjax:beforeReplace", {
                  state,
                  previousState
                });
                container.trigger(beforeReplaceEvent, [contents, options]), container.html(contents), container.trigger("pjax:end", [null, options]);
              } else
                pjax(options);
              container[0].offsetHeight;
            } else
              locationReplace(location.href);
          }
          initialPop = !1;
        }
        function fallbackPjax(options) {
          var url = $2.isFunction(options.url) ? options.url() : options.url, method = options.type ? options.type.toUpperCase() : "GET", form = $2("<form>", {
            method: method === "GET" ? "GET" : "POST",
            action: url,
            style: "display:none"
          });
          method !== "GET" && method !== "POST" && form.append($2("<input>", {
            type: "hidden",
            name: "_method",
            value: method.toLowerCase()
          }));
          var data = options.data;
          if (typeof data == "string")
            $2.each(data.split("&"), function(index, value) {
              var pair = value.split("=");
              form.append($2("<input>", { type: "hidden", name: pair[0], value: pair[1] }));
            });
          else if ($2.isArray(data))
            $2.each(data, function(index, value) {
              form.append($2("<input>", { type: "hidden", name: value.name, value: value.value }));
            });
          else if (typeof data == "object") {
            var key;
            for (key in data)
              form.append($2("<input>", { type: "hidden", name: key, value: data[key] }));
          }
          $2(document.body).append(form), form.submit();
        }
        function abortXHR(xhr) {
          xhr && xhr.readyState < 4 && (xhr.onreadystatechange = $2.noop, xhr.abort());
        }
        function uniqueId() {
          return (/* @__PURE__ */ new Date()).getTime();
        }
        function cloneContents(container) {
          var cloned = container.clone();
          return cloned.find("script").each(function() {
            this.src || $2._data(this, "globalEval", !1);
          }), cloned.contents();
        }
        function stripInternalParams(url) {
          return url.search = url.search.replace(/([?&])(_pjax|_)=[^&]*/g, "").replace(/^&/, ""), url.href.replace(/\?($|#)/, "$1");
        }
        function parseURL(url) {
          var a = document.createElement("a");
          return a.href = url, a;
        }
        function stripHash(location2) {
          return location2.href.replace(/#.*/, "");
        }
        function optionsFor(container, options) {
          return container && options ? (options = $2.extend({}, options), options.container = container, options) : $2.isPlainObject(container) ? container : { container };
        }
        function findAll(elems, selector2) {
          return elems.filter(selector2).add(elems.find(selector2));
        }
        function parseHTML(html) {
          return $2.parseHTML(html, document, !0);
        }
        function extractContainer(data, xhr, options) {
          var obj = {}, fullDocument = /<html/i.test(data), serverUrl = xhr.getResponseHeader("X-PJAX-URL");
          obj.url = serverUrl ? stripInternalParams(parseURL(serverUrl)) : options.requestUrl;
          var $head, $body;
          if (fullDocument) {
            $body = $2(parseHTML(data.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));
            var head = data.match(/<head[^>]*>([\s\S.]*)<\/head>/i);
            $head = head != null ? $2(parseHTML(head[0])) : $body;
          } else
            $head = $body = $2(parseHTML(data));
          if ($body.length === 0)
            return obj;
          if (obj.title = findAll($head, "title").last().text(), options.fragment) {
            var $fragment = $body;
            options.fragment !== "body" && ($fragment = findAll($fragment, options.fragment).first()), $fragment.length && (obj.contents = options.fragment === "body" ? $fragment : $fragment.contents(), obj.title || (obj.title = $fragment.attr("title") || $fragment.data("title")));
          } else fullDocument || (obj.contents = $body);
          return obj.contents && (obj.contents = obj.contents.not(function() {
            return $2(this).is("title");
          }), obj.contents.find("title").remove(), obj.scripts = findAll(obj.contents, "script[src]").remove(), obj.contents = obj.contents.not(obj.scripts)), obj.title && (obj.title = $2.trim(obj.title)), obj;
        }
        function executeScriptTags(scripts) {
          if (scripts) {
            var existingScripts = $2("script[src]");
            scripts.each(function() {
              var src = this.src, matchedScripts = existingScripts.filter(function() {
                return this.src === src;
              });
              if (!matchedScripts.length) {
                var script = document.createElement("script"), type = $2(this).attr("type");
                type && (script.type = type), script.src = $2(this).attr("src"), document.head.appendChild(script);
              }
            });
          }
        }
        var cacheMapping = {}, cacheForwardStack = [], cacheBackStack = [];
        function cachePush(id, value) {
          cacheMapping[id] = value, cacheBackStack.push(id), trimCacheStack(cacheForwardStack, 0), trimCacheStack(cacheBackStack, pjax.defaults.maxCacheLength);
        }
        function cachePop(direction, id, value) {
          var pushStack, popStack;
          cacheMapping[id] = value, direction === "forward" ? (pushStack = cacheBackStack, popStack = cacheForwardStack) : (pushStack = cacheForwardStack, popStack = cacheBackStack), pushStack.push(id), id = popStack.pop(), id && delete cacheMapping[id], trimCacheStack(pushStack, pjax.defaults.maxCacheLength);
        }
        function trimCacheStack(stack, length) {
          for (; stack.length > length; )
            delete cacheMapping[stack.shift()];
        }
        function findVersion() {
          return $2("meta").filter(function() {
            var name = $2(this).attr("http-equiv");
            return name && name.toUpperCase() === "X-PJAX-VERSION";
          }).attr("content");
        }
        function enable() {
          $2.fn.pjax = fnPjax, $2.pjax = pjax, $2.pjax.enable = $2.noop, $2.pjax.disable = disable, $2.pjax.click = handleClick, $2.pjax.submit = handleSubmit, $2.pjax.reload = pjaxReload, $2.pjax.defaults = {
            timeout: 650,
            push: !0,
            replace: !1,
            type: "GET",
            dataType: "html",
            scrollTo: 0,
            maxCacheLength: 20,
            version: findVersion
          }, $2(window).on("popstate.pjax", onPjaxPopstate);
        }
        function disable() {
          $2.fn.pjax = function() {
            return this;
          }, $2.pjax = fallbackPjax, $2.pjax.enable = enable, $2.pjax.disable = $2.noop, $2.pjax.click = $2.noop, $2.pjax.submit = $2.noop, $2.pjax.reload = function() {
            window.location.reload();
          }, $2(window).off("popstate.pjax", onPjaxPopstate);
        }
        $2.event.props && $2.inArray("state", $2.event.props) < 0 ? $2.event.props.push("state") : "state" in $2.Event.prototype || $2.event.addProp("state"), $2.support.pjax = window.history && window.history.pushState && window.history.replaceState && // pushState isn't reliable on iOS until 5.
        !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/), $2.support.pjax ? enable() : disable();
      })(jQuery);
      const cssLoader = (e) => {
        const t2 = GM_getResourceText(e);
        return GM_addStyle(t2), t2;
      };
      cssLoader("element-plus-css");
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global, freeSelf = typeof self == "object" && self && self.Object === Object && self, root = freeGlobal || freeSelf || Function("return this")(), Symbol$1 = root.Symbol, objectProto$i = Object.prototype, hasOwnProperty$f = objectProto$i.hasOwnProperty, nativeObjectToString$2 = objectProto$i.toString, symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;
      function getRawTag(value) {
        var isOwn = hasOwnProperty$f.call(value, symToStringTag$1), tag = value[symToStringTag$1];
        try {
          value[symToStringTag$1] = void 0;
          var unmasked = !0;
        } catch {
        }
        var result = nativeObjectToString$2.call(value);
        return unmasked && (isOwn ? value[symToStringTag$1] = tag : delete value[symToStringTag$1]), result;
      }
      var objectProto$h = Object.prototype, nativeObjectToString$1 = objectProto$h.toString;
      function objectToString$1(value) {
        return nativeObjectToString$1.call(value);
      }
      var nullTag = "[object Null]", undefinedTag = "[object Undefined]", symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
      function baseGetTag(value) {
        return value == null ? value === void 0 ? undefinedTag : nullTag : symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString$1(value);
      }
      function isObjectLike(value) {
        return value != null && typeof value == "object";
      }
      var symbolTag$1 = "[object Symbol]";
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag$1;
      }
      function arrayMap(array, iteratee) {
        for (var index = -1, length = array == null ? 0 : array.length, result = Array(length); ++index < length; )
          result[index] = iteratee(array[index], index, array);
        return result;
      }
      var isArray$1 = Array.isArray, INFINITY$2 = 1 / 0, symbolProto$1 = Symbol$1 ? Symbol$1.prototype : void 0, symbolToString = symbolProto$1 ? symbolProto$1.toString : void 0;
      function baseToString(value) {
        if (typeof value == "string")
          return value;
        if (isArray$1(value))
          return arrayMap(value, baseToString) + "";
        if (isSymbol(value))
          return symbolToString ? symbolToString.call(value) : "";
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY$2 ? "-0" : result;
      }
      var reWhitespace = /\s/;
      function trimmedEndIndex(string) {
        for (var index = string.length; index-- && reWhitespace.test(string.charAt(index)); )
          ;
        return index;
      }
      var reTrimStart = /^\s+/;
      function baseTrim(string) {
        return string && string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "");
      }
      function isObject$4(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function");
      }
      var NAN = NaN, reIsBadHex = /^[-+]0x[0-9a-f]+$/i, reIsBinary = /^0b[01]+$/i, reIsOctal = /^0o[0-7]+$/i, freeParseInt = parseInt;
      function toNumber(value) {
        if (typeof value == "number")
          return value;
        if (isSymbol(value))
          return NAN;
        if (isObject$4(value)) {
          var other = typeof value.valueOf == "function" ? value.valueOf() : value;
          value = isObject$4(other) ? other + "" : other;
        }
        if (typeof value != "string")
          return value === 0 ? value : +value;
        value = baseTrim(value);
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
      }
      var INFINITY$1 = 1 / 0, MAX_INTEGER = 17976931348623157e292;
      function toFinite(value) {
        if (!value)
          return value === 0 ? value : 0;
        if (value = toNumber(value), value === INFINITY$1 || value === -INFINITY$1) {
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
      function isFunction$2(value) {
        if (!isObject$4(value))
          return !1;
        var tag = baseGetTag(value);
        return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
      }
      var coreJsData = root["__core-js_shared__"], maskSrcKey = function() {
        var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
        return uid ? "Symbol(src)_1." + uid : "";
      }();
      function isMasked(func) {
        return !!maskSrcKey && maskSrcKey in func;
      }
      var funcProto$2 = Function.prototype, funcToString$2 = funcProto$2.toString;
      function toSource(func) {
        if (func != null) {
          try {
            return funcToString$2.call(func);
          } catch {
          }
          try {
            return func + "";
          } catch {
          }
        }
        return "";
      }
      var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reIsHostCtor = /^\[object .+?Constructor\]$/, funcProto$1 = Function.prototype, objectProto$g = Object.prototype, funcToString$1 = funcProto$1.toString, hasOwnProperty$e = objectProto$g.hasOwnProperty, reIsNative = RegExp(
        "^" + funcToString$1.call(hasOwnProperty$e).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      );
      function baseIsNative(value) {
        if (!isObject$4(value) || isMasked(value))
          return !1;
        var pattern = isFunction$2(value) ? reIsNative : reIsHostCtor;
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
      var HOT_COUNT = 800, HOT_SPAN = 16, nativeNow = Date.now;
      function shortOut(func) {
        var count = 0, lastCalled = 0;
        return function() {
          var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
          if (lastCalled = stamp, remaining > 0) {
            if (++count >= HOT_COUNT)
              return arguments[0];
          } else
            count = 0;
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
          return func({}, "", {}), func;
        } catch {
        }
      }(), baseSetToString = defineProperty ? function(func, string) {
        return defineProperty(func, "toString", {
          configurable: !0,
          enumerable: !1,
          value: constant(string),
          writable: !0
        });
      } : identity, setToString = shortOut(baseSetToString);
      function arrayEach(array, iteratee) {
        for (var index = -1, length = array == null ? 0 : array.length; ++index < length && iteratee(array[index], index, array) !== !1; )
          ;
        return array;
      }
      function baseFindIndex(array, predicate, fromIndex, fromRight) {
        for (var length = array.length, index = fromIndex + -1; ++index < length; )
          if (predicate(array[index], index, array))
            return index;
        return -1;
      }
      function baseIsNaN(value) {
        return value !== value;
      }
      function strictIndexOf(array, value, fromIndex) {
        for (var index = fromIndex - 1, length = array.length; ++index < length; )
          if (array[index] === value)
            return index;
        return -1;
      }
      function baseIndexOf(array, value, fromIndex) {
        return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
      }
      function arrayIncludes(array, value) {
        var length = array == null ? 0 : array.length;
        return !!length && baseIndexOf(array, value, 0) > -1;
      }
      var MAX_SAFE_INTEGER$1 = 9007199254740991, reIsUint = /^(?:0|[1-9]\d*)$/;
      function isIndex(value, length) {
        var type = typeof value;
        return length = length ?? MAX_SAFE_INTEGER$1, !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
      }
      function baseAssignValue(object, key, value) {
        key == "__proto__" && defineProperty ? defineProperty(object, key, {
          configurable: !0,
          enumerable: !0,
          value,
          writable: !0
        }) : object[key] = value;
      }
      function eq(value, other) {
        return value === other || value !== value && other !== other;
      }
      var objectProto$f = Object.prototype, hasOwnProperty$d = objectProto$f.hasOwnProperty;
      function assignValue(object, key, value) {
        var objValue = object[key];
        (!(hasOwnProperty$d.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) && baseAssignValue(object, key, value);
      }
      function copyObject(source, props, object, customizer) {
        var isNew = !object;
        object || (object = {});
        for (var index = -1, length = props.length; ++index < length; ) {
          var key = props[index], newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
          newValue === void 0 && (newValue = source[key]), isNew ? baseAssignValue(object, key, newValue) : assignValue(object, key, newValue);
        }
        return object;
      }
      var nativeMax = Math.max;
      function overRest(func, start, transform2) {
        return start = nativeMax(start === void 0 ? func.length - 1 : start, 0), function() {
          for (var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length); ++index < length; )
            array[index] = args[start + index];
          index = -1;
          for (var otherArgs = Array(start + 1); ++index < start; )
            otherArgs[index] = args[index];
          return otherArgs[start] = transform2(array), apply(func, this, otherArgs);
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
        return value != null && isLength(value.length) && !isFunction$2(value);
      }
      function isIterateeCall(value, index, object) {
        if (!isObject$4(object))
          return !1;
        var type = typeof index;
        return (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) ? eq(object[index], value) : !1;
      }
      function createAssigner(assigner) {
        return baseRest(function(object, sources) {
          var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
          for (customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0, guard && isIterateeCall(sources[0], sources[1], guard) && (customizer = length < 3 ? void 0 : customizer, length = 1), object = Object(object); ++index < length; ) {
            var source = sources[index];
            source && assigner(object, source, index, customizer);
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
        for (var index = -1, result = Array(n); ++index < n; )
          result[index] = iteratee(index);
        return result;
      }
      var argsTag$2 = "[object Arguments]";
      function baseIsArguments(value) {
        return isObjectLike(value) && baseGetTag(value) == argsTag$2;
      }
      var objectProto$d = Object.prototype, hasOwnProperty$c = objectProto$d.hasOwnProperty, propertyIsEnumerable$1 = objectProto$d.propertyIsEnumerable, isArguments = baseIsArguments(/* @__PURE__ */ function() {
        return arguments;
      }()) ? baseIsArguments : function(value) {
        return isObjectLike(value) && hasOwnProperty$c.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
      };
      function stubFalse() {
        return !1;
      }
      var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports, freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module, moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1, Buffer = moduleExports$1 ? root.Buffer : void 0, nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0, isBuffer = nativeIsBuffer || stubFalse, argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", errorTag$2 = "[object Error]", funcTag = "[object Function]", mapTag$2 = "[object Map]", numberTag$1 = "[object Number]", objectTag$3 = "[object Object]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$1 = "[object String]", weakMapTag$1 = "[object WeakMap]", arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$2 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]", typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = !0;
      typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] = typedArrayTags[dataViewTag$2] = typedArrayTags[dateTag$1] = typedArrayTags[errorTag$2] = typedArrayTags[funcTag] = typedArrayTags[mapTag$2] = typedArrayTags[numberTag$1] = typedArrayTags[objectTag$3] = typedArrayTags[regexpTag$1] = typedArrayTags[setTag$2] = typedArrayTags[stringTag$1] = typedArrayTags[weakMapTag$1] = !1;
      function baseIsTypedArray(value) {
        return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
      }
      function baseUnary(func) {
        return function(value) {
          return func(value);
        };
      }
      var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports, freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module, moduleExports = freeModule && freeModule.exports === freeExports, freeProcess = moduleExports && freeGlobal.process, nodeUtil = function() {
        try {
          var types = freeModule && freeModule.require && freeModule.require("util").types;
          return types || freeProcess && freeProcess.binding && freeProcess.binding("util");
        } catch {
        }
      }(), nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray, isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray, objectProto$c = Object.prototype, hasOwnProperty$b = objectProto$c.hasOwnProperty;
      function arrayLikeKeys(value, inherited) {
        var isArr = isArray$1(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
        for (var key in value)
          (inherited || hasOwnProperty$b.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
          (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
          isIndex(key, length))) && result.push(key);
        return result;
      }
      function overArg(func, transform2) {
        return function(arg) {
          return func(transform2(arg));
        };
      }
      var nativeKeys = overArg(Object.keys, Object), objectProto$b = Object.prototype, hasOwnProperty$a = objectProto$b.hasOwnProperty;
      function baseKeys(object) {
        if (!isPrototype(object))
          return nativeKeys(object);
        var result = [];
        for (var key in Object(object))
          hasOwnProperty$a.call(object, key) && key != "constructor" && result.push(key);
        return result;
      }
      function keys(object) {
        return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
      }
      function nativeKeysIn(object) {
        var result = [];
        if (object != null)
          for (var key in Object(object))
            result.push(key);
        return result;
      }
      var objectProto$a = Object.prototype, hasOwnProperty$9 = objectProto$a.hasOwnProperty;
      function baseKeysIn(object) {
        if (!isObject$4(object))
          return nativeKeysIn(object);
        var isProto = isPrototype(object), result = [];
        for (var key in object)
          key == "constructor" && (isProto || !hasOwnProperty$9.call(object, key)) || result.push(key);
        return result;
      }
      function keysIn(object) {
        return isArrayLike(object) ? arrayLikeKeys(object, !0) : baseKeysIn(object);
      }
      var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
        copyObject(source, keysIn(source), object, customizer);
      }), reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
      function isKey(value, object) {
        if (isArray$1(value))
          return !1;
        var type = typeof value;
        return type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value) ? !0 : reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
      }
      var nativeCreate = getNative(Object, "create");
      function hashClear() {
        this.__data__ = nativeCreate ? nativeCreate(null) : {}, this.size = 0;
      }
      function hashDelete(key) {
        var result = this.has(key) && delete this.__data__[key];
        return this.size -= result ? 1 : 0, result;
      }
      var HASH_UNDEFINED$2 = "__lodash_hash_undefined__", objectProto$9 = Object.prototype, hasOwnProperty$8 = objectProto$9.hasOwnProperty;
      function hashGet(key) {
        var data = this.__data__;
        if (nativeCreate) {
          var result = data[key];
          return result === HASH_UNDEFINED$2 ? void 0 : result;
        }
        return hasOwnProperty$8.call(data, key) ? data[key] : void 0;
      }
      var objectProto$8 = Object.prototype, hasOwnProperty$7 = objectProto$8.hasOwnProperty;
      function hashHas(key) {
        var data = this.__data__;
        return nativeCreate ? data[key] !== void 0 : hasOwnProperty$7.call(data, key);
      }
      var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
      function hashSet(key, value) {
        var data = this.__data__;
        return this.size += this.has(key) ? 0 : 1, data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED$1 : value, this;
      }
      function Hash(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        for (this.clear(); ++index < length; ) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      Hash.prototype.clear = hashClear;
      Hash.prototype.delete = hashDelete;
      Hash.prototype.get = hashGet;
      Hash.prototype.has = hashHas;
      Hash.prototype.set = hashSet;
      function listCacheClear() {
        this.__data__ = [], this.size = 0;
      }
      function assocIndexOf(array, key) {
        for (var length = array.length; length--; )
          if (eq(array[length][0], key))
            return length;
        return -1;
      }
      var arrayProto = Array.prototype, splice = arrayProto.splice;
      function listCacheDelete(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0)
          return !1;
        var lastIndex = data.length - 1;
        return index == lastIndex ? data.pop() : splice.call(data, index, 1), --this.size, !0;
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
        return index < 0 ? (++this.size, data.push([key, value])) : data[index][1] = value, this;
      }
      function ListCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        for (this.clear(); ++index < length; ) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      ListCache.prototype.clear = listCacheClear;
      ListCache.prototype.delete = listCacheDelete;
      ListCache.prototype.get = listCacheGet;
      ListCache.prototype.has = listCacheHas;
      ListCache.prototype.set = listCacheSet;
      var Map$1 = getNative(root, "Map");
      function mapCacheClear() {
        this.size = 0, this.__data__ = {
          hash: new Hash(),
          map: new (Map$1 || ListCache)(),
          string: new Hash()
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
        var result = getMapData(this, key).delete(key);
        return this.size -= result ? 1 : 0, result;
      }
      function mapCacheGet(key) {
        return getMapData(this, key).get(key);
      }
      function mapCacheHas(key) {
        return getMapData(this, key).has(key);
      }
      function mapCacheSet(key, value) {
        var data = getMapData(this, key), size = data.size;
        return data.set(key, value), this.size += data.size == size ? 0 : 1, this;
      }
      function MapCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        for (this.clear(); ++index < length; ) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      MapCache.prototype.clear = mapCacheClear;
      MapCache.prototype.delete = mapCacheDelete;
      MapCache.prototype.get = mapCacheGet;
      MapCache.prototype.has = mapCacheHas;
      MapCache.prototype.set = mapCacheSet;
      var FUNC_ERROR_TEXT$1 = "Expected a function";
      function memoize(func, resolver) {
        if (typeof func != "function" || resolver != null && typeof resolver != "function")
          throw new TypeError(FUNC_ERROR_TEXT$1);
        var memoized = function() {
          var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache2 = memoized.cache;
          if (cache2.has(key))
            return cache2.get(key);
          var result = func.apply(this, args);
          return memoized.cache = cache2.set(key, result) || cache2, result;
        };
        return memoized.cache = new (memoize.Cache || MapCache)(), memoized;
      }
      memoize.Cache = MapCache;
      var MAX_MEMOIZE_SIZE = 500;
      function memoizeCapped(func) {
        var result = memoize(func, function(key) {
          return cache2.size === MAX_MEMOIZE_SIZE && cache2.clear(), key;
        }), cache2 = result.cache;
        return result;
      }
      var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, reEscapeChar = /\\(\\)?/g, stringToPath = memoizeCapped(function(string) {
        var result = [];
        return string.charCodeAt(0) === 46 && result.push(""), string.replace(rePropName, function(match2, number, quote, subString) {
          result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match2);
        }), result;
      });
      function toString$1(value) {
        return value == null ? "" : baseToString(value);
      }
      function castPath(value, object) {
        return isArray$1(value) ? value : isKey(value, object) ? [value] : stringToPath(toString$1(value));
      }
      var INFINITY = 1 / 0;
      function toKey(value) {
        if (typeof value == "string" || isSymbol(value))
          return value;
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY ? "-0" : result;
      }
      function baseGet(object, path) {
        path = castPath(path, object);
        for (var index = 0, length = path.length; object != null && index < length; )
          object = object[toKey(path[index++])];
        return index && index == length ? object : void 0;
      }
      function get(object, path, defaultValue) {
        var result = object == null ? void 0 : baseGet(object, path);
        return result === void 0 ? defaultValue : result;
      }
      function arrayPush(array, values2) {
        for (var index = -1, length = values2.length, offset = array.length; ++index < length; )
          array[offset + index] = values2[index];
        return array;
      }
      var getPrototype = overArg(Object.getPrototypeOf, Object), objectTag$2 = "[object Object]", funcProto = Function.prototype, objectProto$7 = Object.prototype, funcToString = funcProto.toString, hasOwnProperty$6 = objectProto$7.hasOwnProperty, objectCtorString = funcToString.call(Object);
      function isPlainObject$1(value) {
        if (!isObjectLike(value) || baseGetTag(value) != objectTag$2)
          return !1;
        var proto = getPrototype(value);
        if (proto === null)
          return !0;
        var Ctor = hasOwnProperty$6.call(proto, "constructor") && proto.constructor;
        return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
      }
      var domExcTag = "[object DOMException]", errorTag$1 = "[object Error]";
      function isError(value) {
        if (!isObjectLike(value))
          return !1;
        var tag = baseGetTag(value);
        return tag == errorTag$1 || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject$1(value);
      }
      var attempt = baseRest(function(func, args) {
        try {
          return apply(func, void 0, args);
        } catch (e) {
          return isError(e) ? e : new Error(e);
        }
      }), FUNC_ERROR_TEXT = "Expected a function";
      function before(n, func) {
        var result;
        if (typeof func != "function")
          throw new TypeError(FUNC_ERROR_TEXT);
        return n = toInteger(n), function() {
          return --n > 0 && (result = func.apply(this, arguments)), n <= 1 && (func = void 0), result;
        };
      }
      function basePropertyOf(object) {
        return function(key) {
          return object == null ? void 0 : object[key];
        };
      }
      function castArray() {
        if (!arguments.length)
          return [];
        var value = arguments[0];
        return isArray$1(value) ? value : [value];
      }
      function stackClear() {
        this.__data__ = new ListCache(), this.size = 0;
      }
      function stackDelete(key) {
        var data = this.__data__, result = data.delete(key);
        return this.size = data.size, result;
      }
      function stackGet(key) {
        return this.__data__.get(key);
      }
      function stackHas(key) {
        return this.__data__.has(key);
      }
      var LARGE_ARRAY_SIZE$1 = 200;
      function stackSet(key, value) {
        var data = this.__data__;
        if (data instanceof ListCache) {
          var pairs = data.__data__;
          if (!Map$1 || pairs.length < LARGE_ARRAY_SIZE$1 - 1)
            return pairs.push([key, value]), this.size = ++data.size, this;
          data = this.__data__ = new MapCache(pairs);
        }
        return data.set(key, value), this.size = data.size, this;
      }
      function Stack(entries) {
        var data = this.__data__ = new ListCache(entries);
        this.size = data.size;
      }
      Stack.prototype.clear = stackClear;
      Stack.prototype.delete = stackDelete;
      Stack.prototype.get = stackGet;
      Stack.prototype.has = stackHas;
      Stack.prototype.set = stackSet;
      function arrayFilter(array, predicate) {
        for (var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = []; ++index < length; ) {
          var value = array[index];
          predicate(value, index, array) && (result[resIndex++] = value);
        }
        return result;
      }
      function stubArray() {
        return [];
      }
      var objectProto$6 = Object.prototype, propertyIsEnumerable = objectProto$6.propertyIsEnumerable, nativeGetSymbols = Object.getOwnPropertySymbols, getSymbols = nativeGetSymbols ? function(object) {
        return object == null ? [] : (object = Object(object), arrayFilter(nativeGetSymbols(object), function(symbol) {
          return propertyIsEnumerable.call(object, symbol);
        }));
      } : stubArray;
      function baseGetAllKeys(object, keysFunc, symbolsFunc) {
        var result = keysFunc(object);
        return isArray$1(object) ? result : arrayPush(result, symbolsFunc(object));
      }
      function getAllKeys(object) {
        return baseGetAllKeys(object, keys, getSymbols);
      }
      var DataView = getNative(root, "DataView"), Promise$1 = getNative(root, "Promise"), Set$1 = getNative(root, "Set"), mapTag$1 = "[object Map]", objectTag$1 = "[object Object]", promiseTag = "[object Promise]", setTag$1 = "[object Set]", weakMapTag = "[object WeakMap]", dataViewTag$1 = "[object DataView]", dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map$1), promiseCtorString = toSource(Promise$1), setCtorString = toSource(Set$1), weakMapCtorString = toSource(WeakMap$1), getTag = baseGetTag;
      (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$1 || Map$1 && getTag(new Map$1()) != mapTag$1 || Promise$1 && getTag(Promise$1.resolve()) != promiseTag || Set$1 && getTag(new Set$1()) != setTag$1 || WeakMap$1 && getTag(new WeakMap$1()) != weakMapTag) && (getTag = function(value) {
        var result = baseGetTag(value), Ctor = result == objectTag$1 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
        if (ctorString)
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
        return result;
      });
      var Uint8Array$1 = root.Uint8Array, HASH_UNDEFINED = "__lodash_hash_undefined__";
      function setCacheAdd(value) {
        return this.__data__.set(value, HASH_UNDEFINED), this;
      }
      function setCacheHas(value) {
        return this.__data__.has(value);
      }
      function SetCache(values2) {
        var index = -1, length = values2 == null ? 0 : values2.length;
        for (this.__data__ = new MapCache(); ++index < length; )
          this.add(values2[index]);
      }
      SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
      SetCache.prototype.has = setCacheHas;
      function arraySome(array, predicate) {
        for (var index = -1, length = array == null ? 0 : array.length; ++index < length; )
          if (predicate(array[index], index, array))
            return !0;
        return !1;
      }
      function cacheHas(cache2, key) {
        return cache2.has(key);
      }
      var COMPARE_PARTIAL_FLAG$5 = 1, COMPARE_UNORDERED_FLAG$3 = 2;
      function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG$5, arrLength = array.length, othLength = other.length;
        if (arrLength != othLength && !(isPartial && othLength > arrLength))
          return !1;
        var arrStacked = stack.get(array), othStacked = stack.get(other);
        if (arrStacked && othStacked)
          return arrStacked == other && othStacked == array;
        var index = -1, result = !0, seen = bitmask & COMPARE_UNORDERED_FLAG$3 ? new SetCache() : void 0;
        for (stack.set(array, other), stack.set(other, array); ++index < arrLength; ) {
          var arrValue = array[index], othValue = other[index];
          if (customizer)
            var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
          if (compared !== void 0) {
            if (compared)
              continue;
            result = !1;
            break;
          }
          if (seen) {
            if (!arraySome(other, function(othValue2, othIndex) {
              if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack)))
                return seen.push(othIndex);
            })) {
              result = !1;
              break;
            }
          } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
            result = !1;
            break;
          }
        }
        return stack.delete(array), stack.delete(other), result;
      }
      function mapToArray(map2) {
        var index = -1, result = Array(map2.size);
        return map2.forEach(function(value, key) {
          result[++index] = [key, value];
        }), result;
      }
      function setToArray(set) {
        var index = -1, result = Array(set.size);
        return set.forEach(function(value) {
          result[++index] = value;
        }), result;
      }
      var COMPARE_PARTIAL_FLAG$4 = 1, COMPARE_UNORDERED_FLAG$2 = 2, boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
      function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
        switch (tag) {
          case dataViewTag:
            if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset)
              return !1;
            object = object.buffer, other = other.buffer;
          case arrayBufferTag:
            return !(object.byteLength != other.byteLength || !equalFunc(new Uint8Array$1(object), new Uint8Array$1(other)));
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
            if (convert || (convert = setToArray), object.size != other.size && !isPartial)
              return !1;
            var stacked = stack.get(object);
            if (stacked)
              return stacked == other;
            bitmask |= COMPARE_UNORDERED_FLAG$2, stack.set(object, other);
            var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
            return stack.delete(object), result;
          case symbolTag:
            if (symbolValueOf)
              return symbolValueOf.call(object) == symbolValueOf.call(other);
        }
        return !1;
      }
      var COMPARE_PARTIAL_FLAG$3 = 1, objectProto$5 = Object.prototype, hasOwnProperty$5 = objectProto$5.hasOwnProperty;
      function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
        if (objLength != othLength && !isPartial)
          return !1;
        for (var index = objLength; index--; ) {
          var key = objProps[index];
          if (!(isPartial ? key in other : hasOwnProperty$5.call(other, key)))
            return !1;
        }
        var objStacked = stack.get(object), othStacked = stack.get(other);
        if (objStacked && othStacked)
          return objStacked == other && othStacked == object;
        var result = !0;
        stack.set(object, other), stack.set(other, object);
        for (var skipCtor = isPartial; ++index < objLength; ) {
          key = objProps[index];
          var objValue = object[key], othValue = other[key];
          if (customizer)
            var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
          if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
            result = !1;
            break;
          }
          skipCtor || (skipCtor = key == "constructor");
        }
        if (result && !skipCtor) {
          var objCtor = object.constructor, othCtor = other.constructor;
          objCtor != othCtor && "constructor" in object && "constructor" in other && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor) && (result = !1);
        }
        return stack.delete(object), stack.delete(other), result;
      }
      var COMPARE_PARTIAL_FLAG$2 = 1, argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]", objectProto$4 = Object.prototype, hasOwnProperty$4 = objectProto$4.hasOwnProperty;
      function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
        var objIsArr = isArray$1(object), othIsArr = isArray$1(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
        objTag = objTag == argsTag ? objectTag : objTag, othTag = othTag == argsTag ? objectTag : othTag;
        var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
        if (isSameTag && isBuffer(object)) {
          if (!isBuffer(other))
            return !1;
          objIsArr = !0, objIsObj = !1;
        }
        if (isSameTag && !objIsObj)
          return stack || (stack = new Stack()), objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
        if (!(bitmask & COMPARE_PARTIAL_FLAG$2)) {
          var objIsWrapped = objIsObj && hasOwnProperty$4.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty$4.call(other, "__wrapped__");
          if (objIsWrapped || othIsWrapped) {
            var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
            return stack || (stack = new Stack()), equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
          }
        }
        return isSameTag ? (stack || (stack = new Stack()), equalObjects(object, other, bitmask, customizer, equalFunc, stack)) : !1;
      }
      function baseIsEqual(value, other, bitmask, customizer, stack) {
        return value === other ? !0 : value == null || other == null || !isObjectLike(value) && !isObjectLike(other) ? value !== value && other !== other : baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
      }
      var COMPARE_PARTIAL_FLAG$1 = 1, COMPARE_UNORDERED_FLAG$1 = 2;
      function baseIsMatch(object, source, matchData, customizer) {
        var index = matchData.length, length = index;
        if (object == null)
          return !length;
        for (object = Object(object); index--; ) {
          var data = matchData[index];
          if (data[2] ? data[1] !== object[data[0]] : !(data[0] in object))
            return !1;
        }
        for (; ++index < length; ) {
          data = matchData[index];
          var key = data[0], objValue = object[key], srcValue = data[1];
          if (data[2]) {
            if (objValue === void 0 && !(key in object))
              return !1;
          } else {
            var stack = new Stack(), result;
            if (!(result === void 0 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, customizer, stack) : result))
              return !1;
          }
        }
        return !0;
      }
      function isStrictComparable(value) {
        return value === value && !isObject$4(value);
      }
      function getMatchData(object) {
        for (var result = keys(object), length = result.length; length--; ) {
          var key = result[length], value = object[key];
          result[length] = [key, value, isStrictComparable(value)];
        }
        return result;
      }
      function matchesStrictComparable(key, srcValue) {
        return function(object) {
          return object == null ? !1 : object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
        };
      }
      function baseMatches(source) {
        var matchData = getMatchData(source);
        return matchData.length == 1 && matchData[0][2] ? matchesStrictComparable(matchData[0][0], matchData[0][1]) : function(object) {
          return object === source || baseIsMatch(object, source, matchData);
        };
      }
      function baseHasIn(object, key) {
        return object != null && key in Object(object);
      }
      function hasPath(object, path, hasFunc) {
        path = castPath(path, object);
        for (var index = -1, length = path.length, result = !1; ++index < length; ) {
          var key = toKey(path[index]);
          if (!(result = object != null && hasFunc(object, key)))
            break;
          object = object[key];
        }
        return result || ++index != length ? result : (length = object == null ? 0 : object.length, !!length && isLength(length) && isIndex(key, length) && (isArray$1(object) || isArguments(object)));
      }
      function hasIn(object, path) {
        return object != null && hasPath(object, path, baseHasIn);
      }
      var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
      function baseMatchesProperty(path, srcValue) {
        return isKey(path) && isStrictComparable(srcValue) ? matchesStrictComparable(toKey(path), srcValue) : function(object) {
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
        return typeof value == "function" ? value : value == null ? identity : typeof value == "object" ? isArray$1(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value) : property(value);
      }
      function arrayAggregator(array, setter, iteratee, accumulator) {
        for (var index = -1, length = array == null ? 0 : array.length; ++index < length; ) {
          var value = array[index];
          setter(accumulator, value, iteratee(value), array);
        }
        return accumulator;
      }
      function createBaseFor(fromRight) {
        return function(object, iteratee, keysFunc) {
          for (var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length; length--; ) {
            var key = props[++index];
            if (iteratee(iterable[key], key, iterable) === !1)
              break;
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
          if (collection == null)
            return collection;
          if (!isArrayLike(collection))
            return eachFunc(collection, iteratee);
          for (var length = collection.length, index = -1, iterable = Object(collection); ++index < length && iteratee(iterable[index], index, iterable) !== !1; )
            ;
          return collection;
        };
      }
      var baseEach = createBaseEach(baseForOwn);
      function baseAggregator(collection, setter, iteratee, accumulator) {
        return baseEach(collection, function(value, key, collection2) {
          setter(accumulator, value, iteratee(value), collection2);
        }), accumulator;
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
      var LARGE_ARRAY_SIZE = 200;
      function baseDifference(array, values2, iteratee, comparator) {
        var index = -1, includes = arrayIncludes, isCommon = !0, length = array.length, result = [], valuesLength = values2.length;
        if (!length)
          return result;
        values2.length >= LARGE_ARRAY_SIZE && (includes = cacheHas, isCommon = !1, values2 = new SetCache(values2));
        outer:
          for (; ++index < length; ) {
            var value = array[index], computed2 = value;
            if (value = value !== 0 ? value : 0, isCommon && computed2 === computed2) {
              for (var valuesIndex = valuesLength; valuesIndex--; )
                if (values2[valuesIndex] === computed2)
                  continue outer;
              result.push(value);
            } else includes(values2, computed2, comparator) || result.push(value);
          }
        return result;
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
      }, escapeHtmlChar = basePropertyOf(htmlEscapes), reUnescapedHtml = /[&<>"']/g, reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
      function escape$1(string) {
        return string = toString$1(string), string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
      }
      function baseFilter(collection, predicate) {
        var result = [];
        return baseEach(collection, function(value, index, collection2) {
          predicate(value, index, collection2) && result.push(value);
        }), result;
      }
      function filter(collection, predicate) {
        var func = isArray$1(collection) ? arrayFilter : baseFilter;
        return func(collection, baseIteratee(predicate));
      }
      function baseMap(collection, iteratee) {
        var index = -1, result = isArrayLike(collection) ? Array(collection.length) : [];
        return baseEach(collection, function(value, key, collection2) {
          result[++index] = iteratee(value, key, collection2);
        }), result;
      }
      function map(collection, iteratee) {
        var func = isArray$1(collection) ? arrayMap : baseMap;
        return func(collection, baseIteratee(iteratee));
      }
      var objectProto$3 = Object.prototype, hasOwnProperty$3 = objectProto$3.hasOwnProperty, groupBy = createAggregator(function(result, value, key) {
        hasOwnProperty$3.call(result, key) ? result[key].push(value) : baseAssignValue(result, key, [value]);
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
        for (var includes = arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array(othLength), maxLength = 1 / 0, result = []; othIndex--; ) {
          var array = arrays[othIndex];
          maxLength = nativeMin(array.length, maxLength), caches[othIndex] = length >= 120 && array.length >= 120 ? new SetCache(othIndex && array) : void 0;
        }
        array = arrays[0];
        var index = -1, seen = caches[0];
        outer:
          for (; ++index < length && result.length < maxLength; ) {
            var value = array[index], computed2 = value;
            if (value = value !== 0 ? value : 0, !(seen ? cacheHas(seen, computed2) : includes(result, computed2))) {
              for (othIndex = othLength; --othIndex; ) {
                var cache2 = caches[othIndex];
                if (!(cache2 ? cacheHas(cache2, computed2) : includes(arrays[othIndex], computed2)))
                  continue outer;
              }
              seen && seen.push(computed2), result.push(value);
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
        return baseForOwn(object, function(value, key, object2) {
          setter(accumulator, iteratee(value), key, object2);
        }), accumulator;
      }
      function createInverter(setter, toIteratee) {
        return function(object, iteratee) {
          return baseInverter(object, setter, toIteratee(iteratee), {});
        };
      }
      var objectProto$2 = Object.prototype, nativeObjectToString = objectProto$2.toString, invert = createInverter(function(result, value, key) {
        value != null && typeof value.toString != "function" && (value = nativeObjectToString.call(value)), result[value] = key;
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
        return iteratee = baseIteratee(iteratee), baseForOwn(object, function(value, key, object2) {
          baseAssignValue(result, key, iteratee(value, key, object2));
        }), result;
      }
      function baseExtremum(array, iteratee, comparator) {
        for (var index = -1, length = array.length; ++index < length; ) {
          var value = array[index], current = iteratee(value);
          if (current != null && (computed2 === void 0 ? current === current && !isSymbol(current) : comparator(current, computed2)))
            var computed2 = current, result = value;
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
      var objectProto$1 = Object.prototype, hasOwnProperty$2 = objectProto$1.hasOwnProperty;
      function customDefaultsAssignIn(objValue, srcValue, key, object) {
        return objValue === void 0 || eq(objValue, objectProto$1[key]) && !hasOwnProperty$2.call(object, key) ? srcValue : objValue;
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
      var reInterpolate = /<%=([\s\S]+?)%>/g, reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, templateSettings = {
        /**
         * Used to detect `data` property values to be HTML-escaped.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        escape: reEscape,
        /**
         * Used to detect code to be evaluated.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        evaluate: reEvaluate,
        /**
         * Used to detect `data` property values to inject.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        interpolate: reInterpolate,
        /**
         * Used to reference the data object in the template text.
         *
         * @memberOf _.templateSettings
         * @type {string}
         */
        variable: "",
        /**
         * Used to import variables into the compiled template.
         *
         * @memberOf _.templateSettings
         * @type {Object}
         */
        imports: {
          /**
           * A reference to the `lodash` function.
           *
           * @memberOf _.templateSettings.imports
           * @type {Function}
           */
          _: { escape: escape$1 }
        }
      }, INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`", reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g, reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/, reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, reNoMatch = /($^)/, reUnescapedString = /['\n\r\u2028\u2029\\]/g, objectProto = Object.prototype, hasOwnProperty$1 = objectProto.hasOwnProperty;
      function template(string, options, guard) {
        var settings2 = templateSettings.imports._.templateSettings || templateSettings;
        string = toString$1(string), options = assignInWith({}, options, settings2, customDefaultsAssignIn);
        var imports = assignInWith({}, options.imports, settings2.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys), isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '", reDelimiters = RegExp(
          (options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$",
          "g"
        ), sourceURL = hasOwnProperty$1.call(options, "sourceURL") ? "//# sourceURL=" + (options.sourceURL + "").replace(/\s/g, " ") + `
` : "";
        string.replace(reDelimiters, function(match2, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
          return interpolateValue || (interpolateValue = esTemplateValue), source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar), escapeValue && (isEscaping = !0, source += `' +
__e(` + escapeValue + `) +
'`), evaluateValue && (isEvaluating = !0, source += `';
` + evaluateValue + `;
__p += '`), interpolateValue && (source += `' +
((__t = (` + interpolateValue + `)) == null ? '' : __t) +
'`), index = offset + match2.length, match2;
        }), source += `';
`;
        var variable = hasOwnProperty$1.call(options, "variable") && options.variable;
        if (!variable)
          source = `with (obj) {
` + source + `
}
`;
        else if (reForbiddenIdentifierChars.test(variable))
          throw new Error(INVALID_TEMPL_VAR_ERROR_TEXT);
        source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;"), source = "function(" + (variable || "obj") + `) {
` + (variable ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + source + `return __p
}`;
        var result = attempt(function() {
          return Function(importsKeys, sourceURL + "return " + source).apply(void 0, importsValues);
        });
        if (result.source = source, isError(result))
          throw result;
        return result;
      }
      var without = baseRest(function(array, values2) {
        return isArrayLikeObject(array) ? baseDifference(array, values2) : [];
      }), commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
      function getDefaultExportFromCjs(x) {
        return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x.default : x;
      }
      var eventemitter3 = { exports: {} }, hasRequiredEventemitter3;
      function requireEventemitter3() {
        return hasRequiredEventemitter3 || (hasRequiredEventemitter3 = 1, function(module2) {
          var has = Object.prototype.hasOwnProperty, prefix = "~";
          function Events() {
          }
          Object.create && (Events.prototype = /* @__PURE__ */ Object.create(null), new Events().__proto__ || (prefix = !1));
          function EE(fn, context, once2) {
            this.fn = fn, this.context = context, this.once = once2 || !1;
          }
          function addListener(emitter, event, fn, context, once2) {
            if (typeof fn != "function")
              throw new TypeError("The listener must be a function");
            var listener = new EE(fn, context || emitter, once2), evt = prefix ? prefix + event : event;
            return emitter._events[evt] ? emitter._events[evt].fn ? emitter._events[evt] = [emitter._events[evt], listener] : emitter._events[evt].push(listener) : (emitter._events[evt] = listener, emitter._eventsCount++), emitter;
          }
          function clearEvent(emitter, evt) {
            --emitter._eventsCount === 0 ? emitter._events = new Events() : delete emitter._events[evt];
          }
          function EventEmitter2() {
            this._events = new Events(), this._eventsCount = 0;
          }
          EventEmitter2.prototype.eventNames = function() {
            var names = [], events, name;
            if (this._eventsCount === 0) return names;
            for (name in events = this._events)
              has.call(events, name) && names.push(prefix ? name.slice(1) : name);
            return Object.getOwnPropertySymbols ? names.concat(Object.getOwnPropertySymbols(events)) : names;
          }, EventEmitter2.prototype.listeners = function(event) {
            var evt = prefix ? prefix + event : event, handlers2 = this._events[evt];
            if (!handlers2) return [];
            if (handlers2.fn) return [handlers2.fn];
            for (var i = 0, l = handlers2.length, ee = new Array(l); i < l; i++)
              ee[i] = handlers2[i].fn;
            return ee;
          }, EventEmitter2.prototype.listenerCount = function(event) {
            var evt = prefix ? prefix + event : event, listeners = this._events[evt];
            return listeners ? listeners.fn ? 1 : listeners.length : 0;
          }, EventEmitter2.prototype.emit = function(event, a1, a2, a3, a4, a5) {
            var evt = prefix ? prefix + event : event;
            if (!this._events[evt]) return !1;
            var listeners = this._events[evt], len = arguments.length, args, i;
            if (listeners.fn) {
              switch (listeners.once && this.removeListener(event, listeners.fn, void 0, !0), len) {
                case 1:
                  return listeners.fn.call(listeners.context), !0;
                case 2:
                  return listeners.fn.call(listeners.context, a1), !0;
                case 3:
                  return listeners.fn.call(listeners.context, a1, a2), !0;
                case 4:
                  return listeners.fn.call(listeners.context, a1, a2, a3), !0;
                case 5:
                  return listeners.fn.call(listeners.context, a1, a2, a3, a4), !0;
                case 6:
                  return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), !0;
              }
              for (i = 1, args = new Array(len - 1); i < len; i++)
                args[i - 1] = arguments[i];
              listeners.fn.apply(listeners.context, args);
            } else {
              var length = listeners.length, j;
              for (i = 0; i < length; i++)
                switch (listeners[i].once && this.removeListener(event, listeners[i].fn, void 0, !0), len) {
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
                    if (!args) for (j = 1, args = new Array(len - 1); j < len; j++)
                      args[j - 1] = arguments[j];
                    listeners[i].fn.apply(listeners[i].context, args);
                }
            }
            return !0;
          }, EventEmitter2.prototype.on = function(event, fn, context) {
            return addListener(this, event, fn, context, !1);
          }, EventEmitter2.prototype.once = function(event, fn, context) {
            return addListener(this, event, fn, context, !0);
          }, EventEmitter2.prototype.removeListener = function(event, fn, context, once2) {
            var evt = prefix ? prefix + event : event;
            if (!this._events[evt]) return this;
            if (!fn)
              return clearEvent(this, evt), this;
            var listeners = this._events[evt];
            if (listeners.fn)
              listeners.fn === fn && (!once2 || listeners.once) && (!context || listeners.context === context) && clearEvent(this, evt);
            else {
              for (var i = 0, events = [], length = listeners.length; i < length; i++)
                (listeners[i].fn !== fn || once2 && !listeners[i].once || context && listeners[i].context !== context) && events.push(listeners[i]);
              events.length ? this._events[evt] = events.length === 1 ? events[0] : events : clearEvent(this, evt);
            }
            return this;
          }, EventEmitter2.prototype.removeAllListeners = function(event) {
            var evt;
            return event ? (evt = prefix ? prefix + event : event, this._events[evt] && clearEvent(this, evt)) : (this._events = new Events(), this._eventsCount = 0), this;
          }, EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener, EventEmitter2.prototype.addListener = EventEmitter2.prototype.on, EventEmitter2.prefixed = prefix, EventEmitter2.EventEmitter = EventEmitter2, module2.exports = EventEmitter2;
        }(eventemitter3)), eventemitter3.exports;
      }
      var eventemitter3Exports = requireEventemitter3();
      const EventEmitter = /* @__PURE__ */ getDefaultExportFromCjs(eventemitter3Exports), removeAt = (array, index) => array.splice(index, 1)[0];
      class AsyncQueue {
        constructor(thread = 1) {
          __publicField(this, "queue", vue.reactive([]));
          __publicField(this, "emitter", new EventEmitter());
          __publicField(this, "canSingleStart", () => !0);
          __publicField(this, "singleRunning", !1);
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
            running: !1,
            fn,
            info
          });
        }
        async start() {
          if (this.thread <= 1) {
            if (this.singleRunning || this.queue.length === 0) return;
            this.singleRunning = !0;
            do {
              if (!this.canSingleStart()) {
                this.singleRunning = !1;
                return;
              }
              await this.queue[0].fn(), this.queue.shift();
            } while (this.queue.length > 0);
            this.singleRunning = !1, this.emitter.emit("finish");
          } else {
            const running = this.runningThreadNum;
            if (running >= this.thread || this.queue.length === running) return;
            const idleItems = this.queue.filter(({ running: running2 }) => !running2);
            for (let i = 0; i < Math.min(idleItems.length, this.thread - running); i++) {
              const item = idleItems[i];
              item.running = !0, item.fn().then(async () => {
                removeAt(
                  this.queue,
                  this.queue.findIndex(({ id }) => id === item.id)
                ), this.queue.length ? await this.start() : this.emitter.emit("finish");
              }).catch(logger.error);
            }
          }
        }
        async skipFromError() {
          this.queue.shift(), await this.restartFromError();
        }
        async restartFromError() {
          this.singleRunning = !1, await this.start();
        }
      }
      var __spreadArray = function(to, from, pack) {
        for (var i = 0, l = from.length, ar; i < l; i++)
          (ar || !(i in from)) && (ar || (ar = Array.prototype.slice.call(from, 0, i)), ar[i] = from[i]);
        return to.concat(ar || Array.prototype.slice.call(from));
      }, BrowserInfo = (
        /** @class */
        /* @__PURE__ */ function() {
          function BrowserInfo2(name, version, os) {
            this.name = name, this.version = version, this.os = os, this.type = "browser";
          }
          return BrowserInfo2;
        }()
      ), NodeInfo = (
        /** @class */
        /* @__PURE__ */ function() {
          function NodeInfo2(version) {
            this.version = version, this.type = "node", this.name = "node", this.os = process.platform;
          }
          return NodeInfo2;
        }()
      ), SearchBotDeviceInfo = (
        /** @class */
        /* @__PURE__ */ function() {
          function SearchBotDeviceInfo2(name, version, os, bot) {
            this.name = name, this.version = version, this.os = os, this.bot = bot, this.type = "bot-device";
          }
          return SearchBotDeviceInfo2;
        }()
      ), BotInfo = (
        /** @class */
        /* @__PURE__ */ function() {
          function BotInfo2() {
            this.type = "bot", this.bot = !0, this.name = "bot", this.version = null, this.os = null;
          }
          return BotInfo2;
        }()
      ), ReactNativeInfo = (
        /** @class */
        /* @__PURE__ */ function() {
          function ReactNativeInfo2() {
            this.type = "react-native", this.name = "react-native", this.version = null, this.os = null;
          }
          return ReactNativeInfo2;
        }()
      ), SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/, SEARCHBOT_OS_REGEX = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/, REQUIRED_VERSION_PARTS = 3, userAgentRules = [
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
      ], operatingSystemRules = [
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
        return typeof document > "u" && typeof navigator < "u" && navigator.product === "ReactNative" ? new ReactNativeInfo() : typeof navigator < "u" ? parseUserAgent(navigator.userAgent) : getNodeVersion();
      }
      function matchUserAgent(ua) {
        return ua !== "" && userAgentRules.reduce(function(matched, _a) {
          var browser = _a[0], regex = _a[1];
          if (matched)
            return matched;
          var uaMatch = regex.exec(ua);
          return !!uaMatch && [browser, uaMatch];
        }, !1);
      }
      function parseUserAgent(ua) {
        var matchedRule = matchUserAgent(ua);
        if (!matchedRule)
          return null;
        var name = matchedRule[0], match2 = matchedRule[1];
        if (name === "searchbot")
          return new BotInfo();
        var versionParts = match2[1] && match2[1].split(".").join("_").split("_").slice(0, 3);
        versionParts ? versionParts.length < REQUIRED_VERSION_PARTS && (versionParts = __spreadArray(__spreadArray([], versionParts, !0), createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length))) : versionParts = [];
        var version = versionParts.join("."), os = detectOS(ua), searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua);
        return searchBotMatch && searchBotMatch[1] ? new SearchBotDeviceInfo(name, version, os, searchBotMatch[1]) : new BrowserInfo(name, version, os);
      }
      function detectOS(ua) {
        for (var ii = 0, count = operatingSystemRules.length; ii < count; ii++) {
          var _a = operatingSystemRules[ii], os = _a[0], regex = _a[1], match2 = regex.exec(ua);
          if (match2)
            return os;
        }
        return null;
      }
      function getNodeVersion() {
        var isNode = typeof process < "u" && process.version;
        return isNode ? new NodeInfo(process.version.slice(1)) : null;
      }
      function createVersionParts(count) {
        for (var output = [], ii = 0; ii < count; ii++)
          output.push("0");
        return output;
      }
      const supportLanguage = /* @__PURE__ */ new Set(["zh", "en"]), defaultLocale = (() => {
        const languages = castArray(navigator.languages || navigator.language);
        for (const language of languages) {
          const lang = language.split("-")[0];
          if (supportLanguage.has(lang)) return lang;
        }
        return "en";
      })();
      var ErrorAction = /* @__PURE__ */ ((ErrorAction2) => (ErrorAction2.GET_INFO = "getInfo", ErrorAction2.DOWNLOAD = "download", ErrorAction2))(ErrorAction || {}), MIME = /* @__PURE__ */ ((MIME2) => (MIME2.JPG = "image/jpeg", MIME2.PNG = "image/png", MIME2))(MIME || {});
      const nHentaiDownloadHosts = [
        "i.nhentai.net",
        "i1.nhentai.net",
        "i2.nhentai.net",
        "i3.nhentai.net",
        "i4.nhentai.net",
        "i5.nhentai.net",
        "i7.nhentai.net"
      ];
      var NHentaiDownloadHostSpecial = /* @__PURE__ */ ((NHentaiDownloadHostSpecial2) => (NHentaiDownloadHostSpecial2.AUTO = "auto", NHentaiDownloadHostSpecial2.RANDOM = "random", NHentaiDownloadHostSpecial2.BALANCE = "balance", NHentaiDownloadHostSpecial2))(NHentaiDownloadHostSpecial || {});
      const nHentaiDownloadHostSpecials = [
        "auto",
        "random",
        "balance"
        /* BALANCE */
      ], availableNHentaiDownloadHost = /* @__PURE__ */ new Set([
        ...nHentaiDownloadHostSpecials,
        ...nHentaiDownloadHosts
      ]), booleanValidator = (val) => typeof val == "boolean", stringValidator = (val) => typeof val == "string", createNumberValidator = (min, max) => (val) => typeof val == "number" && min <= val && val <= max, trimFormatter = (val) => val.trim(), availableMetaFiles = ["ComicInfoXml", "EzeInfoJson"], availableMetaFileTitleLanguage = /* @__PURE__ */ new Set(["english", "japanese"]), settingDefinitions = {
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
          default: !0,
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
          validator: createNumberValidator(0, 1 / 0)
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
          default: !1,
          validator: booleanValidator
        },
        streamDownload: {
          key: "stream_download",
          default: !1,
          validator: booleanValidator
        },
        seriesMode: {
          key: "series_mode",
          default: !1,
          validator: booleanValidator
        },
        filenameLength: {
          key: "filename_length",
          default: 0,
          validator: (val) => val === "auto" || typeof val == "number" && val >= 0,
          formatter: (val) => typeof val == "number" ? Math.floor(val) : val
        },
        autoCancelDownloadedManga: {
          key: "auto_cancel_downloaded_doujin",
          default: !1,
          validator: booleanValidator
        },
        autoRetryWhenErrorOccurs: {
          key: "auto_retry_when_error_occurs",
          default: !1,
          validator: booleanValidator
        },
        autoShowAll: {
          key: "auto_show_all",
          default: !1,
          validator: booleanValidator
        },
        showIgnoreButton: {
          key: "show_ignore_button",
          default: !1,
          validator: booleanValidator
        },
        preventConsoleClearing: {
          key: "prevent_console_clear",
          default: !1,
          validator: booleanValidator
        },
        judgeDownloadedByEnglish: {
          key: "judge_downloaded_by_english",
          default: !1,
          validator: booleanValidator
        },
        judgeDownloadedByJapanese: {
          key: "judge_downloaded_by_japanese",
          default: !0,
          validator: booleanValidator
        },
        judgeDownloadedByPretty: {
          key: "judge_downloaded_by_pretty",
          default: !1,
          validator: booleanValidator
        },
        nHentaiDownloadHost: {
          key: "nHentai_media_host",
          default: "auto",
          validator: (val) => availableNHentaiDownloadHost.has(val)
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
          default: !1,
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
        },
        removeAdPage: {
          key: "remove_ad_page",
          default: !1,
          validator: booleanValidator
        }
      }, browserDetect = detect(), DISABLE_STREAM_DOWNLOAD = !!browserDetect && (browserDetect.name === "safari" || browserDetect.name === "firefox"), readSettings = () => mapValues(settingDefinitions, ({ key, default: defaultVal, validator, itemValidator }) => {
        const realDefault = typeof defaultVal == "function" ? defaultVal() : defaultVal, val = _GM_getValue(key, realDefault);
        if (!validator(val)) return realDefault;
        if (Array.isArray(val) && itemValidator) {
          const validItems = val.filter(itemValidator);
          if (val.length !== validItems.length)
            return realDefault;
        }
        return val;
      }), initSettings = () => {
        const settings2 = readSettings();
        {
          const key = "_flag_nHentai_media_host_reset_20241207";
          if (!_GM_getValue(key, !1)) {
            const def = settingDefinitions.nHentaiDownloadHost;
            settings2.nHentaiDownloadHost !== def.default && (settings2.nHentaiDownloadHost = def.default, _GM_setValue(def.key, def.default)), _GM_setValue(key, !0);
          }
        }
        return settings2;
      }, writeableSettings = vue.reactive(initSettings()), settings = writeableSettings;
      DISABLE_STREAM_DOWNLOAD && settings.streamDownload && (writeableSettings.streamDownload = !1);
      const startWatchSettings = once(() => {
        const settingRefs = vue.toRefs(writeableSettings);
        forEach(settingRefs, (ref2, key) => {
          const cur = settingDefinitions[key];
          let valChanged = !1;
          const saveValue = (val) => {
            logger.log("update setting", cur.key, vue.toRaw(val)), _GM_setValue(cur.key, val);
          };
          vue.watch(
            ref2,
            (val) => {
              if (valChanged) {
                valChanged = !1, saveValue(val);
                return;
              }
              const applyChange = (newVal) => {
                val = newVal, ref2.value = newVal, valChanged = !0;
              };
              if (!cur.validator(val)) {
                applyChange(typeof cur.default == "function" ? cur.default() : cur.default);
                return;
              }
              if (Array.isArray(val) && cur.itemValidator) {
                const validItems = val.filter(cur.itemValidator);
                val.length !== validItems.length && applyChange(validItems);
              }
              if (cur.formatter) {
                const formattedVal = cur.formatter(val);
                (typeof formattedVal == "object" ? !isEqual(val, formattedVal) : val !== formattedVal) && applyChange(formattedVal);
              }
              valChanged || saveValue(val);
            },
            typeof ref2.value == "object" ? { deep: !0 } : void 0
          );
        });
      }), validTitleReplacement = vue.computed(
        () => settings.titleReplacement.filter((item) => item == null ? void 0 : item.from)
      ), customFilenameFunction = vue.computed(() => {
        if (!settings.customFilenameFunction.trim()) return null;
        try {
          return new Function("filename", "gallery", settings.customFilenameFunction);
        } catch {
          return null;
        }
      }), dlQueue = new AsyncQueue(), zipQueue = new AsyncQueue(WORKER_THREAD_NUM);
      dlQueue.canSingleStart = () => !(settings.seriesMode && zipQueue.length);
      zipQueue.emitter.on("finish", () => {
        settings.seriesMode && dlQueue.start().catch(logger.error);
      });
      const _hoisted_1$4 = ["title"], _hoisted_2$2 = { class: "download-item__title" }, _hoisted_3$2 = { class: "download-item__progress-text" }, _sfc_main$6 = /* @__PURE__ */ vue.defineComponent({
        __name: "DownloadItem",
        props: {
          item: {},
          index: {}
        },
        setup(__props) {
          const props = __props, title = vue.computed(() => {
            const { english: english2, japanese: japanese2, pretty } = props.item.gallery.title;
            return japanese2 || english2 || pretty;
          }), progressWidth = vue.computed(() => {
            const {
              gallery: { pages: pages2 },
              done,
              compressing,
              compressingPercent
            } = props.item, page = pages2.length;
            return compressing ? compressingPercent : page && done ? (100 * done / page).toFixed(2) : 0;
          }), canCancel = vue.computed(() => !props.item.compressing), cancel = () => {
            var _a;
            const { info } = props.index === 0 ? dlQueue.queue[0] : removeAt(dlQueue.queue, props.index);
            (_a = info == null ? void 0 : info.cancel) == null || _a.call(info);
          };
          return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("div", {
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
            ]))) : vue.createCommentVNode("", !0),
            vue.createElementVNode("div", _hoisted_2$2, vue.toDisplayString(title.value), 1),
            vue.createElementVNode("div", {
              class: "download-item__progress",
              style: vue.normalizeStyle({ width: `${progressWidth.value}%` })
            }, [
              vue.createElementVNode("div", _hoisted_3$2, vue.toDisplayString(progressWidth.value) + "%", 1)
            ], 4)
          ], 10, _hoisted_1$4));
        }
      }), _export_sfc = (sfc, props) => {
        const target = sfc.__vccOpts || sfc;
        for (const [key, val] of props)
          target[key] = val;
        return target;
      }, DownloadItem = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-83b954f2"]]), _hoisted_1$3 = { id: "download-panel" }, _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
        __name: "DownloadList",
        props: {
          zipList: {},
          dlList: {}
        },
        setup(__props) {
          return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$3, [
            (vue.openBlock(!0), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.zipList, (item, index) => (vue.openBlock(), vue.createBlock(DownloadItem, {
              key: index,
              item,
              index
            }, null, 8, ["item", "index"]))), 128)),
            (vue.openBlock(!0), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.dlList, (item, index) => (vue.openBlock(), vue.createBlock(DownloadItem, {
              key: index,
              item,
              index
            }, null, 8, ["item", "index"]))), 128))
          ]));
        }
      }), DownloadList = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-f37e74c3"]]), _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
        __name: "DownloadPanel",
        setup(__props) {
          const { title } = document, zipList = vue.computed(() => zipQueue.queue.map(({ info }) => info)), dlList = vue.computed(() => dlQueue.queue.map(({ info }) => info)), infoList = vue.computed(() => [...zipList.value, ...dlList.value]), error = vue.computed(() => {
            var _a;
            return !!((_a = dlList.value[0]) != null && _a.error);
          }), titleWithStatus = vue.computed(() => error.value ? `[×] ${title}` : `[${infoList.value.length || "✓"}] ${title}`);
          return vue.watch(infoList, (val) => {
            sessionStorage.setItem("downloadQueue", JSON.stringify(val.map(({ gallery: gallery2 }) => gallery2)));
          }), vue.watch(titleWithStatus, (val) => {
            document.title = val;
          }), (_ctx, _cache) => infoList.value.length ? (vue.openBlock(), vue.createBlock(DownloadList, {
            key: 0,
            "zip-list": zipList.value,
            "dl-list": dlList.value
          }, null, 8, ["zip-list", "dl-list"])) : vue.createCommentVNode("", !0);
        }
      });
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
      }), close_bold_default = close_bold_vue_vue_type_script_setup_true_lang_default, delete_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
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
      }), delete_default = delete_vue_vue_type_script_setup_true_lang_default, download_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
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
      }), download_default = download_vue_vue_type_script_setup_true_lang_default, upload_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
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
      }), upload_default = upload_vue_vue_type_script_setup_true_lang_default;
      const inBrowser = typeof window < "u", makeSymbol = (name, shareable = !1) => shareable ? Symbol.for(name) : Symbol(name), generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source }), friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), isNumber = (val) => typeof val == "number" && isFinite(val), isRegExp = (val) => toTypeString(val) === "[object RegExp]", isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0, assign = Object.assign, _create$1 = Object.create, create$1 = (obj = null) => _create$1(obj);
      let _globalThis$1;
      const getGlobalThis$1 = () => _globalThis$1 || (_globalThis$1 = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : create$1());
      function escapeHtml(rawText) {
        return rawText.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
      }
      const hasOwnProperty = Object.prototype.hasOwnProperty;
      function hasOwn(obj, key) {
        return hasOwnProperty.call(obj, key);
      }
      const isArray = Array.isArray, isFunction$1 = (val) => typeof val == "function", isString = (val) => typeof val == "string", isBoolean = (val) => typeof val == "boolean", isObject$3 = (val) => val !== null && typeof val == "object", isPromise = (val) => isObject$3(val) && isFunction$1(val.then) && isFunction$1(val.catch), objectToString = Object.prototype.toString, toTypeString = (value) => objectToString.call(value), isPlainObject = (val) => toTypeString(val) === "[object Object]", toDisplayString = (val) => val == null ? "" : isArray(val) || isPlainObject(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
      function join(items, separator = "") {
        return items.reduce((str, item, index) => index === 0 ? str + item : str + separator + item, "");
      }
      function warn(msg, err) {
        typeof console < "u" && (console.warn("[intlify] " + msg), err && console.warn(err.stack));
      }
      const isNotObjectOrIsArray = (val) => !isObject$3(val) || isArray(val);
      function deepCopy(src, des) {
        if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des))
          throw new Error("Invalid value");
        const stack = [{ src, des }];
        for (; stack.length; ) {
          const { src: src2, des: des2 } = stack.pop();
          Object.keys(src2).forEach((key) => {
            key !== "__proto__" && (isObject$3(src2[key]) && !isObject$3(des2[key]) && (des2[key] = Array.isArray(src2[key]) ? [] : create$1()), isNotObjectOrIsArray(des2[key]) || isNotObjectOrIsArray(src2[key]) ? des2[key] = src2[key] : stack.push({ src: src2[key], des: des2[key] }));
          });
        }
      }
      function createPosition(line, column, offset) {
        return { line, column, offset };
      }
      function createLocation(start, end, source) {
        return { start, end };
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
        UNHANDLED_MINIFIER_NODE_TYPE: 16
      }, COMPILE_ERROR_CODES_EXTEND_POINT = 17;
      function createCompileError(code, loc, options = {}) {
        const { domain, messages, args } = options, msg = code, error = new SyntaxError(String(msg));
        return error.code = code, loc && (error.location = loc), error.domain = domain, error;
      }
      function defaultOnError(error) {
        throw error;
      }
      const CHAR_SP = " ", CHAR_CR = "\r", CHAR_LF = `
`, CHAR_LS = "\u2028", CHAR_PS = "\u2029";
      function createScanner(str) {
        const _buf = str;
        let _index = 0, _line = 1, _column = 1, _peekOffset = 0;
        const isCRLF = (index2) => _buf[index2] === CHAR_CR && _buf[index2 + 1] === CHAR_LF, isLF = (index2) => _buf[index2] === CHAR_LF, isPS = (index2) => _buf[index2] === CHAR_PS, isLS = (index2) => _buf[index2] === CHAR_LS, isLineEnd = (index2) => isCRLF(index2) || isLF(index2) || isPS(index2) || isLS(index2), index = () => _index, line = () => _line, column = () => _column, peekOffset = () => _peekOffset, charAt = (offset) => isCRLF(offset) || isPS(offset) || isLS(offset) ? CHAR_LF : _buf[offset], currentChar = () => charAt(_index), currentPeek = () => charAt(_index + _peekOffset);
        function next() {
          return _peekOffset = 0, isLineEnd(_index) && (_line++, _column = 0), isCRLF(_index) && _index++, _index++, _column++, _buf[_index];
        }
        function peek() {
          return isCRLF(_index + _peekOffset) && _peekOffset++, _peekOffset++, _buf[_index + _peekOffset];
        }
        function reset() {
          _index = 0, _line = 1, _column = 1, _peekOffset = 0;
        }
        function resetPeek(offset = 0) {
          _peekOffset = offset;
        }
        function skipToPeek() {
          const target = _index + _peekOffset;
          for (; target !== _index; )
            next();
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
      const EOF = void 0, LITERAL_DELIMITER = "'", ERROR_DOMAIN$3 = "tokenizer";
      function createTokenizer(source, options = {}) {
        const location2 = options.location !== !1, _scnr = createScanner(source), currentOffset = () => _scnr.index(), currentPosition = () => createPosition(_scnr.line(), _scnr.column(), _scnr.index()), _initLoc = currentPosition(), _initOffset = currentOffset(), _context = {
          currentType: 13,
          offset: _initOffset,
          startLoc: _initLoc,
          endLoc: _initLoc,
          lastType: 13,
          lastOffset: _initOffset,
          lastStartLoc: _initLoc,
          lastEndLoc: _initLoc,
          braceNest: 0,
          inLinked: !1,
          text: ""
        }, context = () => _context, { onError } = options;
        function emitError(code, pos, offset, ...args) {
          const ctx = context();
          if (pos.column += offset, pos.offset += offset, onError) {
            const loc = location2 ? createLocation(ctx.startLoc, pos) : null, err = createCompileError(code, loc, {
              domain: ERROR_DOMAIN$3,
              args
            });
            onError(err);
          }
        }
        function getToken(context2, type, value) {
          context2.endLoc = currentPosition(), context2.currentType = type;
          const token = { type };
          return location2 && (token.loc = createLocation(context2.startLoc, context2.endLoc)), value != null && (token.value = value), token;
        }
        const getEndToken = (context2) => getToken(
          context2,
          13
          /* TokenTypes.EOF */
        );
        function eat(scnr, ch) {
          return scnr.currentChar() === ch ? (scnr.next(), ch) : (emitError(CompileErrorCodes.EXPECTED_TOKEN, currentPosition(), 0, ch), "");
        }
        function peekSpaces(scnr) {
          let buf = "";
          for (; scnr.currentPeek() === CHAR_SP || scnr.currentPeek() === CHAR_LF; )
            buf += scnr.currentPeek(), scnr.peek();
          return buf;
        }
        function skipSpaces(scnr) {
          const buf = peekSpaces(scnr);
          return scnr.skipToPeek(), buf;
        }
        function isIdentifierStart(ch) {
          if (ch === EOF)
            return !1;
          const cc = ch.charCodeAt(0);
          return cc >= 97 && cc <= 122 || // a-z
          cc >= 65 && cc <= 90 || // A-Z
          cc === 95;
        }
        function isNumberStart(ch) {
          if (ch === EOF)
            return !1;
          const cc = ch.charCodeAt(0);
          return cc >= 48 && cc <= 57;
        }
        function isNamedIdentifierStart(scnr, context2) {
          const { currentType } = context2;
          if (currentType !== 2)
            return !1;
          peekSpaces(scnr);
          const ret = isIdentifierStart(scnr.currentPeek());
          return scnr.resetPeek(), ret;
        }
        function isListIdentifierStart(scnr, context2) {
          const { currentType } = context2;
          if (currentType !== 2)
            return !1;
          peekSpaces(scnr);
          const ch = scnr.currentPeek() === "-" ? scnr.peek() : scnr.currentPeek(), ret = isNumberStart(ch);
          return scnr.resetPeek(), ret;
        }
        function isLiteralStart(scnr, context2) {
          const { currentType } = context2;
          if (currentType !== 2)
            return !1;
          peekSpaces(scnr);
          const ret = scnr.currentPeek() === LITERAL_DELIMITER;
          return scnr.resetPeek(), ret;
        }
        function isLinkedDotStart(scnr, context2) {
          const { currentType } = context2;
          if (currentType !== 7)
            return !1;
          peekSpaces(scnr);
          const ret = scnr.currentPeek() === ".";
          return scnr.resetPeek(), ret;
        }
        function isLinkedModifierStart(scnr, context2) {
          const { currentType } = context2;
          if (currentType !== 8)
            return !1;
          peekSpaces(scnr);
          const ret = isIdentifierStart(scnr.currentPeek());
          return scnr.resetPeek(), ret;
        }
        function isLinkedDelimiterStart(scnr, context2) {
          const { currentType } = context2;
          if (!(currentType === 7 || currentType === 11))
            return !1;
          peekSpaces(scnr);
          const ret = scnr.currentPeek() === ":";
          return scnr.resetPeek(), ret;
        }
        function isLinkedReferStart(scnr, context2) {
          const { currentType } = context2;
          if (currentType !== 9)
            return !1;
          const fn = () => {
            const ch = scnr.currentPeek();
            return ch === "{" ? isIdentifierStart(scnr.peek()) : ch === "@" || ch === "|" || ch === ":" || ch === "." || ch === CHAR_SP || !ch ? !1 : ch === CHAR_LF ? (scnr.peek(), fn()) : isTextStart(scnr, !1);
          }, ret = fn();
          return scnr.resetPeek(), ret;
        }
        function isPluralStart(scnr) {
          peekSpaces(scnr);
          const ret = scnr.currentPeek() === "|";
          return scnr.resetPeek(), ret;
        }
        function isTextStart(scnr, reset = !0) {
          const fn = (hasSpace = !1, prev = "") => {
            const ch = scnr.currentPeek();
            return ch === "{" || ch === "@" || !ch ? hasSpace : ch === "|" ? !(prev === CHAR_SP || prev === CHAR_LF) : ch === CHAR_SP ? (scnr.peek(), fn(!0, CHAR_SP)) : ch === CHAR_LF ? (scnr.peek(), fn(!0, CHAR_LF)) : !0;
          }, ret = fn();
          return reset && scnr.resetPeek(), ret;
        }
        function takeChar(scnr, fn) {
          const ch = scnr.currentChar();
          return ch === EOF ? EOF : fn(ch) ? (scnr.next(), ch) : null;
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
          let ch = "", num = "";
          for (; ch = takeDigit(scnr); )
            num += ch;
          return num;
        }
        function readText(scnr) {
          let buf = "";
          for (; ; ) {
            const ch = scnr.currentChar();
            if (ch === "{" || ch === "}" || ch === "@" || ch === "|" || !ch)
              break;
            if (ch === CHAR_SP || ch === CHAR_LF)
              if (isTextStart(scnr))
                buf += ch, scnr.next();
              else {
                if (isPluralStart(scnr))
                  break;
                buf += ch, scnr.next();
              }
            else
              buf += ch, scnr.next();
          }
          return buf;
        }
        function readNamedIdentifier(scnr) {
          skipSpaces(scnr);
          let ch = "", name = "";
          for (; ch = takeNamedIdentifierChar(scnr); )
            name += ch;
          return scnr.currentChar() === EOF && emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0), name;
        }
        function readListIdentifier(scnr) {
          skipSpaces(scnr);
          let value = "";
          return scnr.currentChar() === "-" ? (scnr.next(), value += `-${getDigits(scnr)}`) : value += getDigits(scnr), scnr.currentChar() === EOF && emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0), value;
        }
        function isLiteral2(ch) {
          return ch !== LITERAL_DELIMITER && ch !== CHAR_LF;
        }
        function readLiteral(scnr) {
          skipSpaces(scnr), eat(scnr, "'");
          let ch = "", literal = "";
          for (; ch = takeChar(scnr, isLiteral2); )
            ch === "\\" ? literal += readEscapeSequence(scnr) : literal += ch;
          const current = scnr.currentChar();
          return current === CHAR_LF || current === EOF ? (emitError(CompileErrorCodes.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, currentPosition(), 0), current === CHAR_LF && (scnr.next(), eat(scnr, "'")), literal) : (eat(scnr, "'"), literal);
        }
        function readEscapeSequence(scnr) {
          const ch = scnr.currentChar();
          switch (ch) {
            case "\\":
            case "'":
              return scnr.next(), `\\${ch}`;
            case "u":
              return readUnicodeEscapeSequence(scnr, ch, 4);
            case "U":
              return readUnicodeEscapeSequence(scnr, ch, 6);
            default:
              return emitError(CompileErrorCodes.UNKNOWN_ESCAPE_SEQUENCE, currentPosition(), 0, ch), "";
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
          let ch = "", identifiers = "";
          for (; ch = takeChar(scnr, isInvalidIdentifier); )
            identifiers += ch;
          return identifiers;
        }
        function readLinkedModifier(scnr) {
          let ch = "", name = "";
          for (; ch = takeIdentifierChar(scnr); )
            name += ch;
          return name;
        }
        function readLinkedRefer(scnr) {
          const fn = (buf) => {
            const ch = scnr.currentChar();
            return ch === "{" || ch === "@" || ch === "|" || ch === "(" || ch === ")" || !ch || ch === CHAR_SP ? buf : (buf += ch, scnr.next(), fn(buf));
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
          return skipSpaces(scnr), plural;
        }
        function readTokenInPlaceholder(scnr, context2) {
          let token = null;
          switch (scnr.currentChar()) {
            case "{":
              return context2.braceNest >= 1 && emitError(CompileErrorCodes.NOT_ALLOW_NEST_PLACEHOLDER, currentPosition(), 0), scnr.next(), token = getToken(
                context2,
                2,
                "{"
                /* TokenChars.BraceLeft */
              ), skipSpaces(scnr), context2.braceNest++, token;
            case "}":
              return context2.braceNest > 0 && context2.currentType === 2 && emitError(CompileErrorCodes.EMPTY_PLACEHOLDER, currentPosition(), 0), scnr.next(), token = getToken(
                context2,
                3,
                "}"
                /* TokenChars.BraceRight */
              ), context2.braceNest--, context2.braceNest > 0 && skipSpaces(scnr), context2.inLinked && context2.braceNest === 0 && (context2.inLinked = !1), token;
            case "@":
              return context2.braceNest > 0 && emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0), token = readTokenInLinked(scnr, context2) || getEndToken(context2), context2.braceNest = 0, token;
            default: {
              let validNamedIdentifier = !0, validListIdentifier = !0, validLiteral = !0;
              if (isPluralStart(scnr))
                return context2.braceNest > 0 && emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0), token = getToken(context2, 1, readPlural(scnr)), context2.braceNest = 0, context2.inLinked = !1, token;
              if (context2.braceNest > 0 && (context2.currentType === 4 || context2.currentType === 5 || context2.currentType === 6))
                return emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0), context2.braceNest = 0, readToken(scnr, context2);
              if (validNamedIdentifier = isNamedIdentifierStart(scnr, context2))
                return token = getToken(context2, 4, readNamedIdentifier(scnr)), skipSpaces(scnr), token;
              if (validListIdentifier = isListIdentifierStart(scnr, context2))
                return token = getToken(context2, 5, readListIdentifier(scnr)), skipSpaces(scnr), token;
              if (validLiteral = isLiteralStart(scnr, context2))
                return token = getToken(context2, 6, readLiteral(scnr)), skipSpaces(scnr), token;
              if (!validNamedIdentifier && !validListIdentifier && !validLiteral)
                return token = getToken(context2, 12, readInvalidIdentifier(scnr)), emitError(CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER, currentPosition(), 0, token.value), skipSpaces(scnr), token;
              break;
            }
          }
          return token;
        }
        function readTokenInLinked(scnr, context2) {
          const { currentType } = context2;
          let token = null;
          const ch = scnr.currentChar();
          switch ((currentType === 7 || currentType === 8 || currentType === 11 || currentType === 9) && (ch === CHAR_LF || ch === CHAR_SP) && emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0), ch) {
            case "@":
              return scnr.next(), token = getToken(
                context2,
                7,
                "@"
                /* TokenChars.LinkedAlias */
              ), context2.inLinked = !0, token;
            case ".":
              return skipSpaces(scnr), scnr.next(), getToken(
                context2,
                8,
                "."
                /* TokenChars.LinkedDot */
              );
            case ":":
              return skipSpaces(scnr), scnr.next(), getToken(
                context2,
                9,
                ":"
                /* TokenChars.LinkedDelimiter */
              );
            default:
              return isPluralStart(scnr) ? (token = getToken(context2, 1, readPlural(scnr)), context2.braceNest = 0, context2.inLinked = !1, token) : isLinkedDotStart(scnr, context2) || isLinkedDelimiterStart(scnr, context2) ? (skipSpaces(scnr), readTokenInLinked(scnr, context2)) : isLinkedModifierStart(scnr, context2) ? (skipSpaces(scnr), getToken(context2, 11, readLinkedModifier(scnr))) : isLinkedReferStart(scnr, context2) ? (skipSpaces(scnr), ch === "{" ? readTokenInPlaceholder(scnr, context2) || token : getToken(context2, 10, readLinkedRefer(scnr))) : (currentType === 7 && emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0), context2.braceNest = 0, context2.inLinked = !1, readToken(scnr, context2));
          }
        }
        function readToken(scnr, context2) {
          let token = {
            type: 13
            /* TokenTypes.EOF */
          };
          if (context2.braceNest > 0)
            return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
          if (context2.inLinked)
            return readTokenInLinked(scnr, context2) || getEndToken(context2);
          switch (scnr.currentChar()) {
            case "{":
              return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
            case "}":
              return emitError(CompileErrorCodes.UNBALANCED_CLOSING_BRACE, currentPosition(), 0), scnr.next(), getToken(
                context2,
                3,
                "}"
                /* TokenChars.BraceRight */
              );
            case "@":
              return readTokenInLinked(scnr, context2) || getEndToken(context2);
            default: {
              if (isPluralStart(scnr))
                return token = getToken(context2, 1, readPlural(scnr)), context2.braceNest = 0, context2.inLinked = !1, token;
              if (isTextStart(scnr))
                return getToken(context2, 0, readText(scnr));
              break;
            }
          }
          return token;
        }
        function nextToken() {
          const { currentType, offset, startLoc, endLoc } = _context;
          return _context.lastType = currentType, _context.lastOffset = offset, _context.lastStartLoc = startLoc, _context.lastEndLoc = endLoc, _context.offset = currentOffset(), _context.startLoc = currentPosition(), _scnr.currentChar() === EOF ? getToken(
            _context,
            13
            /* TokenTypes.EOF */
          ) : readToken(_scnr, _context);
        }
        return {
          nextToken,
          currentOffset,
          currentPosition,
          context
        };
      }
      const ERROR_DOMAIN$2 = "parser", KNOWN_ESCAPES = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
      function fromEscapeSequence(match2, codePoint4, codePoint6) {
        switch (match2) {
          case "\\\\":
            return "\\";
          // eslint-disable-next-line no-useless-escape
          case "\\'":
            return "'";
          default: {
            const codePoint = parseInt(codePoint4 || codePoint6, 16);
            return codePoint <= 55295 || codePoint >= 57344 ? String.fromCodePoint(codePoint) : "�";
          }
        }
      }
      function createParser(options = {}) {
        const location2 = options.location !== !1, { onError } = options;
        function emitError(tokenzer, code, start, offset, ...args) {
          const end = tokenzer.currentPosition();
          if (end.offset += offset, end.column += offset, onError) {
            const loc = location2 ? createLocation(start, end) : null, err = createCompileError(code, loc, {
              domain: ERROR_DOMAIN$2,
              args
            });
            onError(err);
          }
        }
        function startNode(type, offset, loc) {
          const node = { type };
          return location2 && (node.start = offset, node.end = offset, node.loc = { start: loc, end: loc }), node;
        }
        function endNode(node, offset, pos, type) {
          location2 && (node.end = offset, node.loc && (node.loc.end = pos));
        }
        function parseText(tokenizer, value) {
          const context = tokenizer.context(), node = startNode(3, context.offset, context.startLoc);
          return node.value = value, endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition()), node;
        }
        function parseList(tokenizer, index) {
          const context = tokenizer.context(), { lastOffset: offset, lastStartLoc: loc } = context, node = startNode(5, offset, loc);
          return node.index = parseInt(index, 10), tokenizer.nextToken(), endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition()), node;
        }
        function parseNamed(tokenizer, key) {
          const context = tokenizer.context(), { lastOffset: offset, lastStartLoc: loc } = context, node = startNode(4, offset, loc);
          return node.key = key, tokenizer.nextToken(), endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition()), node;
        }
        function parseLiteral(tokenizer, value) {
          const context = tokenizer.context(), { lastOffset: offset, lastStartLoc: loc } = context, node = startNode(9, offset, loc);
          return node.value = value.replace(KNOWN_ESCAPES, fromEscapeSequence), tokenizer.nextToken(), endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition()), node;
        }
        function parseLinkedModifier(tokenizer) {
          const token = tokenizer.nextToken(), context = tokenizer.context(), { lastOffset: offset, lastStartLoc: loc } = context, node = startNode(8, offset, loc);
          return token.type !== 11 ? (emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_MODIFIER, context.lastStartLoc, 0), node.value = "", endNode(node, offset, loc), {
            nextConsumeToken: token,
            node
          }) : (token.value == null && emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token)), node.value = token.value || "", endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition()), {
            node
          });
        }
        function parseLinkedKey(tokenizer, value) {
          const context = tokenizer.context(), node = startNode(7, context.offset, context.startLoc);
          return node.value = value, endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition()), node;
        }
        function parseLinked(tokenizer) {
          const context = tokenizer.context(), linkedNode = startNode(6, context.offset, context.startLoc);
          let token = tokenizer.nextToken();
          if (token.type === 8) {
            const parsed = parseLinkedModifier(tokenizer);
            linkedNode.modifier = parsed.node, token = parsed.nextConsumeToken || tokenizer.nextToken();
          }
          switch (token.type !== 9 && emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token)), token = tokenizer.nextToken(), token.type === 2 && (token = tokenizer.nextToken()), token.type) {
            case 10:
              token.value == null && emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token)), linkedNode.key = parseLinkedKey(tokenizer, token.value || "");
              break;
            case 4:
              token.value == null && emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token)), linkedNode.key = parseNamed(tokenizer, token.value || "");
              break;
            case 5:
              token.value == null && emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token)), linkedNode.key = parseList(tokenizer, token.value || "");
              break;
            case 6:
              token.value == null && emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token)), linkedNode.key = parseLiteral(tokenizer, token.value || "");
              break;
            default: {
              emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_KEY, context.lastStartLoc, 0);
              const nextContext = tokenizer.context(), emptyLinkedKeyNode = startNode(7, nextContext.offset, nextContext.startLoc);
              return emptyLinkedKeyNode.value = "", endNode(emptyLinkedKeyNode, nextContext.offset, nextContext.startLoc), linkedNode.key = emptyLinkedKeyNode, endNode(linkedNode, nextContext.offset, nextContext.startLoc), {
                nextConsumeToken: token,
                node: linkedNode
              };
            }
          }
          return endNode(linkedNode, tokenizer.currentOffset(), tokenizer.currentPosition()), {
            node: linkedNode
          };
        }
        function parseMessage(tokenizer) {
          const context = tokenizer.context(), startOffset = context.currentType === 1 ? tokenizer.currentOffset() : context.offset, startLoc = context.currentType === 1 ? context.endLoc : context.startLoc, node = startNode(2, startOffset, startLoc);
          node.items = [];
          let nextToken = null;
          do {
            const token = nextToken || tokenizer.nextToken();
            switch (nextToken = null, token.type) {
              case 0:
                token.value == null && emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token)), node.items.push(parseText(tokenizer, token.value || ""));
                break;
              case 5:
                token.value == null && emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token)), node.items.push(parseList(tokenizer, token.value || ""));
                break;
              case 4:
                token.value == null && emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token)), node.items.push(parseNamed(tokenizer, token.value || ""));
                break;
              case 6:
                token.value == null && emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token)), node.items.push(parseLiteral(tokenizer, token.value || ""));
                break;
              case 7: {
                const parsed = parseLinked(tokenizer);
                node.items.push(parsed.node), nextToken = parsed.nextConsumeToken || null;
                break;
              }
            }
          } while (context.currentType !== 13 && context.currentType !== 1);
          const endOffset = context.currentType === 1 ? context.lastOffset : tokenizer.currentOffset(), endLoc = context.currentType === 1 ? context.lastEndLoc : tokenizer.currentPosition();
          return endNode(node, endOffset, endLoc), node;
        }
        function parsePlural(tokenizer, offset, loc, msgNode) {
          const context = tokenizer.context();
          let hasEmptyMessage = msgNode.items.length === 0;
          const node = startNode(1, offset, loc);
          node.cases = [], node.cases.push(msgNode);
          do {
            const msg = parseMessage(tokenizer);
            hasEmptyMessage || (hasEmptyMessage = msg.items.length === 0), node.cases.push(msg);
          } while (context.currentType !== 13);
          return hasEmptyMessage && emitError(tokenizer, CompileErrorCodes.MUST_HAVE_MESSAGES_IN_PLURAL, loc, 0), endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition()), node;
        }
        function parseResource(tokenizer) {
          const context = tokenizer.context(), { offset, startLoc } = context, msgNode = parseMessage(tokenizer);
          return context.currentType === 13 ? msgNode : parsePlural(tokenizer, offset, startLoc, msgNode);
        }
        function parse2(source) {
          const tokenizer = createTokenizer(source, assign({}, options)), context = tokenizer.context(), node = startNode(0, context.offset, context.startLoc);
          return location2 && node.loc && (node.loc.source = source), node.body = parseResource(tokenizer), options.onCacheKey && (node.cacheKey = options.onCacheKey(source)), context.currentType !== 13 && emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, source[context.offset] || ""), endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition()), node;
        }
        return { parse: parse2 };
      }
      function getTokenCaption(token) {
        if (token.type === 13)
          return "EOF";
        const name = (token.value || "").replace(/\r?\n/gu, "\\n");
        return name.length > 10 ? name.slice(0, 9) + "…" : name;
      }
      function createTransformer(ast, options = {}) {
        const _context = {
          ast,
          helpers: /* @__PURE__ */ new Set()
        };
        return { context: () => _context, helper: (name) => (_context.helpers.add(name), name) };
      }
      function traverseNodes(nodes, transformer) {
        for (let i = 0; i < nodes.length; i++)
          traverseNode(nodes[i], transformer);
      }
      function traverseNode(node, transformer) {
        switch (node.type) {
          case 1:
            traverseNodes(node.cases, transformer), transformer.helper(
              "plural"
              /* HelperNameMap.PLURAL */
            );
            break;
          case 2:
            traverseNodes(node.items, transformer);
            break;
          case 6: {
            traverseNode(node.key, transformer), transformer.helper(
              "linked"
              /* HelperNameMap.LINKED */
            ), transformer.helper(
              "type"
              /* HelperNameMap.TYPE */
            );
            break;
          }
          case 5:
            transformer.helper(
              "interpolate"
              /* HelperNameMap.INTERPOLATE */
            ), transformer.helper(
              "list"
              /* HelperNameMap.LIST */
            );
            break;
          case 4:
            transformer.helper(
              "interpolate"
              /* HelperNameMap.INTERPOLATE */
            ), transformer.helper(
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
        ), ast.body && traverseNode(ast.body, transformer);
        const context = transformer.context();
        ast.helpers = Array.from(context.helpers);
      }
      function optimize(ast) {
        const body = ast.body;
        return body.type === 2 ? optimizeMessageNode(body) : body.cases.forEach((c) => optimizeMessageNode(c)), ast;
      }
      function optimizeMessageNode(message) {
        if (message.items.length === 1) {
          const item = message.items[0];
          (item.type === 3 || item.type === 9) && (message.static = item.value, delete item.value);
        } else {
          const values2 = [];
          for (let i = 0; i < message.items.length; i++) {
            const item = message.items[i];
            if (!(item.type === 3 || item.type === 9) || item.value == null)
              break;
            values2.push(item.value);
          }
          if (values2.length === message.items.length) {
            message.static = join(values2);
            for (let i = 0; i < message.items.length; i++) {
              const item = message.items[i];
              (item.type === 3 || item.type === 9) && delete item.value;
            }
          }
        }
      }
      function minify(node) {
        switch (node.t = node.type, node.type) {
          case 0: {
            const resource2 = node;
            minify(resource2.body), resource2.b = resource2.body, delete resource2.body;
            break;
          }
          case 1: {
            const plural = node, cases = plural.cases;
            for (let i = 0; i < cases.length; i++)
              minify(cases[i]);
            plural.c = cases, delete plural.cases;
            break;
          }
          case 2: {
            const message = node, items = message.items;
            for (let i = 0; i < items.length; i++)
              minify(items[i]);
            message.i = items, delete message.items, message.static && (message.s = message.static, delete message.static);
            break;
          }
          case 3:
          case 9:
          case 8:
          case 7: {
            const valueNode = node;
            valueNode.value && (valueNode.v = valueNode.value, delete valueNode.value);
            break;
          }
          case 6: {
            const linked = node;
            minify(linked.key), linked.k = linked.key, delete linked.key, linked.modifier && (minify(linked.modifier), linked.m = linked.modifier, delete linked.modifier);
            break;
          }
          case 5: {
            const list = node;
            list.i = list.index, delete list.index;
            break;
          }
          case 4: {
            const named = node;
            named.k = named.key, delete named.key;
            break;
          }
        }
        delete node.type;
      }
      function createCodeGenerator(ast, options) {
        const { sourceMap, filename, breakLineCode, needIndent: _needIndent } = options, location2 = options.location !== !1, _context = {
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
        location2 && ast.loc && (_context.source = ast.loc.source);
        const context = () => _context;
        function push(code, node) {
          _context.code += code;
        }
        function _newline(n, withBreakLine = !0) {
          const _breakLineCode = withBreakLine ? breakLineCode : "";
          push(_needIndent ? _breakLineCode + "  ".repeat(n) : _breakLineCode);
        }
        function indent(withNewLine = !0) {
          const level = ++_context.indentLevel;
          withNewLine && _newline(level);
        }
        function deindent(withNewLine = !0) {
          const level = --_context.indentLevel;
          withNewLine && _newline(level);
        }
        function newline() {
          _newline(_context.indentLevel);
        }
        return {
          context,
          push,
          indent,
          deindent,
          newline,
          helper: (key) => `_${key}`,
          needIndent: () => _context.needIndent
        };
      }
      function generateLinkedNode(generator, node) {
        const { helper } = generator;
        generator.push(`${helper(
        "linked"
        /* HelperNameMap.LINKED */
      )}(`), generateNode(generator, node.key), node.modifier ? (generator.push(", "), generateNode(generator, node.modifier), generator.push(", _type")) : generator.push(", undefined, _type"), generator.push(")");
      }
      function generateMessageNode(generator, node) {
        const { helper, needIndent } = generator;
        generator.push(`${helper(
        "normalize"
        /* HelperNameMap.NORMALIZE */
      )}([`), generator.indent(needIndent());
        const length = node.items.length;
        for (let i = 0; i < length && (generateNode(generator, node.items[i]), i !== length - 1); i++)
          generator.push(", ");
        generator.deindent(needIndent()), generator.push("])");
      }
      function generatePluralNode(generator, node) {
        const { helper, needIndent } = generator;
        if (node.cases.length > 1) {
          generator.push(`${helper(
          "plural"
          /* HelperNameMap.PLURAL */
        )}([`), generator.indent(needIndent());
          const length = node.cases.length;
          for (let i = 0; i < length && (generateNode(generator, node.cases[i]), i !== length - 1); i++)
            generator.push(", ");
          generator.deindent(needIndent()), generator.push("])");
        }
      }
      function generateResource(generator, node) {
        node.body ? generateNode(generator, node.body) : generator.push("null");
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
        }
      }
      const generate = (ast, options = {}) => {
        const mode = isString(options.mode) ? options.mode : "normal", filename = isString(options.filename) ? options.filename : "message.intl", sourceMap = !!options.sourceMap, breakLineCode = options.breakLineCode != null ? options.breakLineCode : mode === "arrow" ? ";" : `
`, needIndent = options.needIndent ? options.needIndent : mode !== "arrow", helpers = ast.helpers || [], generator = createCodeGenerator(ast, {
          mode,
          filename,
          sourceMap,
          breakLineCode,
          needIndent
        });
        generator.push(mode === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), generator.indent(needIndent), helpers.length > 0 && (generator.push(`const { ${join(helpers.map((s) => `${s}: _${s}`), ", ")} } = ctx`), generator.newline()), generator.push("return "), generateNode(generator, ast), generator.deindent(needIndent), generator.push("}"), delete ast.helpers;
        const { code, map: map2 } = generator.context();
        return {
          ast,
          code,
          map: map2 ? map2.toJSON() : void 0
          // eslint-disable-line @typescript-eslint/no-explicit-any
        };
      };
      function baseCompile$1(source, options = {}) {
        const assignedOptions = assign({}, options), jit = !!assignedOptions.jit, enalbeMinify = !!assignedOptions.minify, enambeOptimize = assignedOptions.optimize == null ? !0 : assignedOptions.optimize, ast = createParser(assignedOptions).parse(source);
        return jit ? (enambeOptimize && optimize(ast), enalbeMinify && minify(ast), { ast, code: "" }) : (transform(ast, assignedOptions), generate(ast, assignedOptions));
      }
      function initFeatureFlags$2() {
        typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (getGlobalThis$1().__INTLIFY_PROD_DEVTOOLS__ = !1);
      }
      function format(ast) {
        return (ctx) => formatParts(ctx, ast);
      }
      function formatParts(ctx, ast) {
        const body = resolveBody(ast);
        if (body == null)
          throw createUnhandleNodeError(
            0
            /* NodeTypes.Resource */
          );
        if (resolveType(body) === 1) {
          const cases = resolveCases(body);
          return ctx.plural(cases.reduce((messages, c) => [
            ...messages,
            formatMessageParts(ctx, c)
          ], []));
        } else
          return formatMessageParts(ctx, body);
      }
      const PROPS_BODY = ["b", "body"];
      function resolveBody(node) {
        return resolveProps(node, PROPS_BODY);
      }
      const PROPS_CASES = ["c", "cases"];
      function resolveCases(node) {
        return resolveProps(node, PROPS_CASES, []);
      }
      function formatMessageParts(ctx, node) {
        const static_ = resolveStatic(node);
        if (static_ != null)
          return ctx.type === "text" ? static_ : ctx.normalize([static_]);
        {
          const messages = resolveItems(node).reduce((acm, c) => [...acm, formatMessagePart(ctx, c)], []);
          return ctx.normalize(messages);
        }
      }
      const PROPS_STATIC = ["s", "static"];
      function resolveStatic(node) {
        return resolveProps(node, PROPS_STATIC);
      }
      const PROPS_ITEMS = ["i", "items"];
      function resolveItems(node) {
        return resolveProps(node, PROPS_ITEMS, []);
      }
      function formatMessagePart(ctx, node) {
        const type = resolveType(node);
        switch (type) {
          case 3:
            return resolveValue$1(node, type);
          case 9:
            return resolveValue$1(node, type);
          case 4: {
            const named = node;
            if (hasOwn(named, "k") && named.k)
              return ctx.interpolate(ctx.named(named.k));
            if (hasOwn(named, "key") && named.key)
              return ctx.interpolate(ctx.named(named.key));
            throw createUnhandleNodeError(type);
          }
          case 5: {
            const list = node;
            if (hasOwn(list, "i") && isNumber(list.i))
              return ctx.interpolate(ctx.list(list.i));
            if (hasOwn(list, "index") && isNumber(list.index))
              return ctx.interpolate(ctx.list(list.index));
            throw createUnhandleNodeError(type);
          }
          case 6: {
            const linked = node, modifier = resolveLinkedModifier(linked), key = resolveLinkedKey(linked);
            return ctx.linked(formatMessagePart(ctx, key), modifier ? formatMessagePart(ctx, modifier) : void 0, ctx.type);
          }
          case 7:
            return resolveValue$1(node, type);
          case 8:
            return resolveValue$1(node, type);
          default:
            throw new Error(`unhandled node on format message part: ${type}`);
        }
      }
      const PROPS_TYPE = ["t", "type"];
      function resolveType(node) {
        return resolveProps(node, PROPS_TYPE);
      }
      const PROPS_VALUE = ["v", "value"];
      function resolveValue$1(node, type) {
        const resolved = resolveProps(node, PROPS_VALUE);
        if (resolved)
          return resolved;
        throw createUnhandleNodeError(type);
      }
      const PROPS_MODIFIER = ["m", "modifier"];
      function resolveLinkedModifier(node) {
        return resolveProps(node, PROPS_MODIFIER);
      }
      const PROPS_KEY = ["k", "key"];
      function resolveLinkedKey(node) {
        const resolved = resolveProps(node, PROPS_KEY);
        if (resolved)
          return resolved;
        throw createUnhandleNodeError(
          6
          /* NodeTypes.Linked */
        );
      }
      function resolveProps(node, props, defaultValue) {
        for (let i = 0; i < props.length; i++) {
          const prop = props[i];
          if (hasOwn(node, prop) && node[prop] != null)
            return node[prop];
        }
        return defaultValue;
      }
      function createUnhandleNodeError(type) {
        return new Error(`unhandled node type: ${type}`);
      }
      const defaultOnCacheKey = (message) => message;
      let compileCache = create$1();
      function isMessageAST(val) {
        return isObject$3(val) && resolveType(val) === 0 && (hasOwn(val, "b") || hasOwn(val, "body"));
      }
      function baseCompile(message, options = {}) {
        let detectError = !1;
        const onError = options.onError || defaultOnError;
        return options.onError = (err) => {
          detectError = !0, onError(err);
        }, { ...baseCompile$1(message, options), detectError };
      }
      // @__NO_SIDE_EFFECTS__
      function compile(message, context) {
        if (isString(message)) {
          isBoolean(context.warnHtmlMessage) && context.warnHtmlMessage;
          const cacheKey = (context.onCacheKey || defaultOnCacheKey)(message), cached = compileCache[cacheKey];
          if (cached)
            return cached;
          const { ast, detectError } = baseCompile(message, {
            ...context,
            location: !1,
            jit: !0
          }), msg = format(ast);
          return detectError ? msg : compileCache[cacheKey] = msg;
        } else {
          const cacheKey = message.cacheKey;
          if (cacheKey) {
            const cached = compileCache[cacheKey];
            return cached || (compileCache[cacheKey] = format(message));
          } else
            return format(message);
        }
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
      const translateDevTools = /* @__PURE__ */ createDevToolsHook("function:translate");
      function createDevToolsHook(hook) {
        return (payloads) => devtools && devtools.emit(hook, payloads);
      }
      const CoreErrorCodes = {
        INVALID_ARGUMENT: COMPILE_ERROR_CODES_EXTEND_POINT,
        // 17
        INVALID_DATE_ARGUMENT: 18,
        INVALID_ISO_DATE_ARGUMENT: 19,
        NOT_SUPPORT_NON_STRING_MESSAGE: 20,
        NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
        NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
        NOT_SUPPORT_LOCALE_TYPE: 23
      }, CORE_ERROR_CODES_EXTEND_POINT = 24;
      function createCoreError(code) {
        return createCompileError(code, null, void 0);
      }
      function getLocale(context, options) {
        return options.locale != null ? resolveLocale(options.locale) : resolveLocale(context.locale);
      }
      let _resolveLocale;
      function resolveLocale(locale) {
        if (isString(locale))
          return locale;
        if (isFunction$1(locale)) {
          if (locale.resolvedOnce && _resolveLocale != null)
            return _resolveLocale;
          if (locale.constructor.name === "Function") {
            const resolve = locale();
            if (isPromise(resolve))
              throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
            return _resolveLocale = resolve;
          } else
            throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
        } else
          throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_TYPE);
      }
      function fallbackWithSimple(ctx, fallback, start) {
        return [.../* @__PURE__ */ new Set([
          start,
          ...isArray(fallback) ? fallback : isObject$3(fallback) ? Object.keys(fallback) : isString(fallback) ? [fallback] : [start]
        ])];
      }
      function resolveWithKeyValue(obj, path) {
        return isObject$3(obj) ? obj[path] : null;
      }
      const VERSION$1 = "11.0.1", NOT_REOSLVED = -1, DEFAULT_LOCALE = "en-US", capitalize = (str) => `${str.charAt(0).toLocaleUpperCase()}${str.substr(1)}`;
      function getDefaultLinkedModifiers() {
        return {
          upper: (val, type) => type === "text" && isString(val) ? val.toUpperCase() : type === "vnode" && isObject$3(val) && "__v_isVNode" in val ? val.children.toUpperCase() : val,
          lower: (val, type) => type === "text" && isString(val) ? val.toLowerCase() : type === "vnode" && isObject$3(val) && "__v_isVNode" in val ? val.children.toLowerCase() : val,
          capitalize: (val, type) => type === "text" && isString(val) ? capitalize(val) : type === "vnode" && isObject$3(val) && "__v_isVNode" in val ? capitalize(val.children) : val
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
      let _fallbackContext = null;
      const setFallbackContext = (context) => {
        _fallbackContext = context;
      }, getFallbackContext = () => _fallbackContext;
      let _cid = 0;
      function createCoreContext(options = {}) {
        const onWarn = isFunction$1(options.onWarn) ? options.onWarn : warn, version = isString(options.version) ? options.version : VERSION$1, locale = isString(options.locale) || isFunction$1(options.locale) ? options.locale : DEFAULT_LOCALE, _locale = isFunction$1(locale) ? DEFAULT_LOCALE : locale, fallbackLocale = isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || isString(options.fallbackLocale) || options.fallbackLocale === !1 ? options.fallbackLocale : _locale, messages = isPlainObject(options.messages) ? options.messages : createResources(_locale), datetimeFormats = isPlainObject(options.datetimeFormats) ? options.datetimeFormats : createResources(_locale), numberFormats = isPlainObject(options.numberFormats) ? options.numberFormats : createResources(_locale), modifiers = assign(create$1(), options.modifiers, getDefaultLinkedModifiers()), pluralRules = options.pluralRules || create$1(), missing = isFunction$1(options.missing) ? options.missing : null, missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : !0, fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : !0, fallbackFormat = !!options.fallbackFormat, unresolving = !!options.unresolving, postTranslation = isFunction$1(options.postTranslation) ? options.postTranslation : null, processor = isPlainObject(options.processor) ? options.processor : null, warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : !0, escapeParameter = !!options.escapeParameter, messageCompiler = isFunction$1(options.messageCompiler) ? options.messageCompiler : _compiler, messageResolver = isFunction$1(options.messageResolver) ? options.messageResolver : _resolver || resolveWithKeyValue, localeFallbacker = isFunction$1(options.localeFallbacker) ? options.localeFallbacker : fallbackWithSimple, fallbackContext = isObject$3(options.fallbackContext) ? options.fallbackContext : void 0, internalOptions = options, __datetimeFormatters = isObject$3(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map(), __numberFormatters = isObject$3(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map(), __meta = isObject$3(internalOptions.__meta) ? internalOptions.__meta : {};
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
        return context.datetimeFormats = datetimeFormats, context.numberFormats = numberFormats, context.__datetimeFormatters = __datetimeFormatters, context.__numberFormatters = __numberFormatters, __INTLIFY_PROD_DEVTOOLS__ && initI18nDevTools(context, version, __meta), context;
      }
      const createResources = (locale) => ({ [locale]: create$1() });
      function handleMissing(context, key, locale, missingWarn, type) {
        const { missing, onWarn } = context;
        if (missing !== null) {
          const ret = missing(context, locale, key, type);
          return isString(ret) ? ret : key;
        } else
          return key;
      }
      function updateFallbackLocale(ctx, locale, fallback) {
        const context = ctx;
        context.__localeChainCache = /* @__PURE__ */ new Map(), ctx.localeFallbacker(ctx, fallback, locale);
      }
      function isAlmostSameLocale(locale, compareLocale) {
        return locale === compareLocale ? !1 : locale.split("-")[0] === compareLocale.split("-")[0];
      }
      function isImplicitFallback(targetLocale, locales) {
        const index = locales.indexOf(targetLocale);
        if (index === -1)
          return !1;
        for (let i = index + 1; i < locales.length; i++)
          if (isAlmostSameLocale(targetLocale, locales[i]))
            return !0;
        return !1;
      }
      const DEFAULT_MODIFIER = (str) => str, DEFAULT_MESSAGE = (ctx) => "", DEFAULT_MESSAGE_DATA_TYPE = "text", DEFAULT_NORMALIZE = (values2) => values2.length === 0 ? "" : join(values2), DEFAULT_INTERPOLATE = toDisplayString;
      function pluralDefault(choice, choicesLength) {
        return choice = Math.abs(choice), choicesLength === 2 ? choice ? choice > 1 ? 1 : 0 : 1 : choice ? Math.min(choice, 2) : 0;
      }
      function getPluralIndex(options) {
        const index = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
        return options.named && (isNumber(options.named.count) || isNumber(options.named.n)) ? isNumber(options.named.count) ? options.named.count : isNumber(options.named.n) ? options.named.n : index : index;
      }
      function normalizeNamed(pluralIndex, props) {
        props.count || (props.count = pluralIndex), props.n || (props.n = pluralIndex);
      }
      function createMessageContext(options = {}) {
        const locale = options.locale, pluralIndex = getPluralIndex(options), pluralRule = isObject$3(options.pluralRules) && isString(locale) && isFunction$1(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault, orgPluralRule = isObject$3(options.pluralRules) && isString(locale) && isFunction$1(options.pluralRules[locale]) ? pluralDefault : void 0, plural = (messages) => messages[pluralRule(pluralIndex, messages.length, orgPluralRule)], _list = options.list || [], list = (index) => _list[index], _named = options.named || create$1();
        isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
        const named = (key) => _named[key];
        function message(key, useLinked) {
          const msg = isFunction$1(options.messages) ? options.messages(key, !!useLinked) : isObject$3(options.messages) ? options.messages[key] : !1;
          return msg || (options.parent ? options.parent.message(key) : DEFAULT_MESSAGE);
        }
        const _modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER, normalize = isPlainObject(options.processor) && isFunction$1(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE, interpolate = isPlainObject(options.processor) && isFunction$1(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE, type = isPlainObject(options.processor) && isString(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE, ctx = {
          list,
          named,
          plural,
          linked: (key, ...args) => {
            const [arg1, arg2] = args;
            let type2 = "text", modifier = "";
            args.length === 1 ? isObject$3(arg1) ? (modifier = arg1.modifier || modifier, type2 = arg1.type || type2) : isString(arg1) && (modifier = arg1 || modifier) : args.length === 2 && (isString(arg1) && (modifier = arg1 || modifier), isString(arg2) && (type2 = arg2 || type2));
            const ret = message(key, !0)(ctx), msg = (
              // The message in vnode resolved with linked are returned as an array by processor.nomalize
              type2 === "vnode" && isArray(ret) && modifier ? ret[0] : ret
            );
            return modifier ? _modifier(modifier)(msg, type2) : msg;
          },
          message,
          type,
          interpolate,
          normalize,
          values: assign(create$1(), _list, _named)
        };
        return ctx;
      }
      const NOOP_MESSAGE_FUNCTION = () => "", isMessageFunction = (val) => isFunction$1(val);
      function translate(context, ...args) {
        const { fallbackFormat, postTranslation, unresolving, messageCompiler, fallbackLocale, messages } = context, [key, options] = parseTranslateArgs(...args), missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn, fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn, escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter, resolvedMessage = !!options.resolvedMessage, defaultMsgOrKey = isString(options.default) || isBoolean(options.default) ? isBoolean(options.default) ? messageCompiler ? key : () => key : options.default : fallbackFormat ? messageCompiler ? key : () => key : null, enableDefaultMsg = fallbackFormat || defaultMsgOrKey != null && (isString(defaultMsgOrKey) || isFunction$1(defaultMsgOrKey)), locale = getLocale(context, options);
        escapeParameter && escapeParams(options);
        let [formatScope, targetLocale, message] = resolvedMessage ? [
          key,
          locale,
          messages[locale] || create$1()
        ] : resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn), format2 = formatScope, cacheBaseKey = key;
        if (!resolvedMessage && !(isString(format2) || isMessageAST(format2) || isMessageFunction(format2)) && enableDefaultMsg && (format2 = defaultMsgOrKey, cacheBaseKey = format2), !resolvedMessage && (!(isString(format2) || isMessageAST(format2) || isMessageFunction(format2)) || !isString(targetLocale)))
          return unresolving ? NOT_REOSLVED : key;
        let occurred = !1;
        const onError = () => {
          occurred = !0;
        }, msg = isMessageFunction(format2) ? format2 : compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError);
        if (occurred)
          return format2;
        const ctxOptions = getMessageContextOptions(context, targetLocale, message, options), msgContext = createMessageContext(ctxOptions), messaged = evaluateMessage(context, msg, msgContext), ret = postTranslation ? postTranslation(messaged, key) : messaged;
        if (__INTLIFY_PROD_DEVTOOLS__) {
          const payloads = {
            timestamp: Date.now(),
            key: isString(key) ? key : isMessageFunction(format2) ? format2.key : "",
            locale: targetLocale || (isMessageFunction(format2) ? format2.locale : ""),
            format: isString(format2) ? format2 : isMessageFunction(format2) ? format2.source : "",
            message: ret
          };
          payloads.meta = assign({}, context.__meta,  {}), translateDevTools(payloads);
        }
        return ret;
      }
      function escapeParams(options) {
        isArray(options.list) ? options.list = options.list.map((item) => isString(item) ? escapeHtml(item) : item) : isObject$3(options.named) && Object.keys(options.named).forEach((key) => {
          isString(options.named[key]) && (options.named[key] = escapeHtml(options.named[key]));
        });
      }
      function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
        const { messages, onWarn, messageResolver: resolveValue2, localeFallbacker } = context, locales = localeFallbacker(context, fallbackLocale, locale);
        let message = create$1(), targetLocale, format2 = null;
        const type = "translate";
        for (let i = 0; i < locales.length && (targetLocale = locales[i], message = messages[targetLocale] || create$1(), (format2 = resolveValue2(message, key)) === null && (format2 = message[key]), !(isString(format2) || isMessageAST(format2) || isMessageFunction(format2))); i++)
          if (!isImplicitFallback(targetLocale, locales)) {
            const missingRet = handleMissing(
              context,
              // eslint-disable-line @typescript-eslint/no-explicit-any
              key,
              targetLocale,
              missingWarn,
              type
            );
            missingRet !== key && (format2 = missingRet);
          }
        return [format2, targetLocale, message];
      }
      function compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError) {
        const { messageCompiler, warnHtmlMessage } = context;
        if (isMessageFunction(format2)) {
          const msg2 = format2;
          return msg2.locale = msg2.locale || targetLocale, msg2.key = msg2.key || key, msg2;
        }
        if (messageCompiler == null) {
          const msg2 = () => format2;
          return msg2.locale = targetLocale, msg2.key = key, msg2;
        }
        const msg = messageCompiler(format2, getCompileContext(context, targetLocale, cacheBaseKey, format2, warnHtmlMessage, onError));
        return msg.locale = targetLocale, msg.key = key, msg.source = format2, msg;
      }
      function evaluateMessage(context, msg, msgCtx) {
        return msg(msgCtx);
      }
      function parseTranslateArgs(...args) {
        const [arg1, arg2, arg3] = args, options = create$1();
        if (!isString(arg1) && !isNumber(arg1) && !isMessageFunction(arg1) && !isMessageAST(arg1))
          throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
        const key = isNumber(arg1) ? String(arg1) : (arg1);
        return isNumber(arg2) ? options.plural = arg2 : isString(arg2) ? options.default = arg2 : isPlainObject(arg2) && !isEmptyObject(arg2) ? options.named = arg2 : isArray(arg2) && (options.list = arg2), isNumber(arg3) ? options.plural = arg3 : isString(arg3) ? options.default = arg3 : isPlainObject(arg3) && assign(options, arg3), [key, options];
      }
      function getCompileContext(context, locale, key, source, warnHtmlMessage, onError) {
        return {
          locale,
          key,
          warnHtmlMessage,
          onError: (err) => {
            throw onError && onError(err), err;
          },
          onCacheKey: (source2) => generateFormatCacheKey(locale, key, source2)
        };
      }
      function getMessageContextOptions(context, locale, message, options) {
        const { modifiers, pluralRules, messageResolver: resolveValue2, fallbackLocale, fallbackWarn, missingWarn, fallbackContext } = context, ctxOptions = {
          locale,
          modifiers,
          pluralRules,
          messages: (key, useLinked) => {
            let val = resolveValue2(message, key);
            if (val == null && (fallbackContext || useLinked)) {
              const [, , message2] = resolveMessageFormat(
                fallbackContext || context,
                // NOTE: if has fallbackContext, fallback to root, else if use linked, fallback to local context
                key,
                locale,
                fallbackLocale,
                fallbackWarn,
                missingWarn
              );
              val = resolveValue2(message2, key);
            }
            if (isString(val) || isMessageAST(val)) {
              let occurred = !1;
              const msg = compileMessageFormat(context, key, locale, val, key, () => {
                occurred = !0;
              });
              return occurred ? NOOP_MESSAGE_FUNCTION : msg;
            } else return isMessageFunction(val) ? val : NOOP_MESSAGE_FUNCTION;
          }
        };
        return context.processor && (ctxOptions.processor = context.processor), options.list && (ctxOptions.list = options.list), options.named && (ctxOptions.named = options.named), isNumber(options.plural) && (ctxOptions.pluralIndex = options.plural), ctxOptions;
      }
      initFeatureFlags$2();
      const VERSION = "11.0.1";
      function initFeatureFlags$1() {
        typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (getGlobalThis$1().__INTLIFY_PROD_DEVTOOLS__ = !1);
      }
      const I18nErrorCodes = {
        // composer module errors
        UNEXPECTED_RETURN_TYPE: CORE_ERROR_CODES_EXTEND_POINT,
        // 24
        // legacy module errors
        INVALID_ARGUMENT: 25,
        // i18n module errors
        MUST_BE_CALL_SETUP_TOP: 26,
        NOT_INSTALLED: 27,
        // directive module errors
        REQUIRED_VALUE: 28,
        INVALID_VALUE: 29,
        // vue-devtools errors
        CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: 30,
        NOT_INSTALLED_WITH_PROVIDE: 31,
        // unexpected error
        UNEXPECTED_ERROR: 32,
        // not compatible legacy vue-i18n constructor
        NOT_COMPATIBLE_LEGACY_VUE_I18N: 33,
        // Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly
        NOT_AVAILABLE_COMPOSITION_IN_LEGACY: 34
      };
      function createI18nError(code, ...args) {
        return createCompileError(code, null, void 0);
      }
      const SetPluralRulesSymbol = makeSymbol("__setPluralRules"), DisposeSymbol = /* @__PURE__ */ makeSymbol("__dispose");
      function handleFlatJson(obj) {
        if (!isObject$3(obj))
          return obj;
        for (const key in obj)
          if (hasOwn(obj, key))
            if (!key.includes("."))
              isObject$3(obj[key]) && handleFlatJson(obj[key]);
            else {
              const subKeys = key.split("."), lastIndex = subKeys.length - 1;
              let currentObj = obj, hasStringValue = !1;
              for (let i = 0; i < lastIndex; i++) {
                if (subKeys[i] in currentObj || (currentObj[subKeys[i]] = create$1()), !isObject$3(currentObj[subKeys[i]])) {
                  hasStringValue = !0;
                  break;
                }
                currentObj = currentObj[subKeys[i]];
              }
              hasStringValue || (currentObj[subKeys[lastIndex]] = obj[key], delete obj[key]), isObject$3(currentObj[subKeys[lastIndex]]) && handleFlatJson(currentObj[subKeys[lastIndex]]);
            }
        return obj;
      }
      function getLocaleMessages(locale, options) {
        const { messages, __i18n, messageResolver, flatJson } = options, ret = isPlainObject(messages) ? messages : isArray(__i18n) ? create$1() : { [locale]: create$1() };
        if (isArray(__i18n) && __i18n.forEach((custom) => {
          if ("locale" in custom && "resource" in custom) {
            const { locale: locale2, resource: resource2 } = custom;
            locale2 ? (ret[locale2] = ret[locale2] || create$1(), deepCopy(resource2, ret[locale2])) : deepCopy(resource2, ret);
          } else
            isString(custom) && deepCopy(JSON.parse(custom), ret);
        }), messageResolver == null && flatJson)
          for (const key in ret)
            hasOwn(ret, key) && handleFlatJson(ret[key]);
        return ret;
      }
      function getComponentOptions(instance) {
        return instance.type;
      }
      function adjustI18nResources(gl, options, componentOptions) {
        let messages = isObject$3(options.messages) ? options.messages : create$1();
        "__i18nGlobal" in componentOptions && (messages = getLocaleMessages(gl.locale.value, {
          messages,
          __i18n: componentOptions.__i18nGlobal
        }));
        const locales = Object.keys(messages);
        locales.length && locales.forEach((locale) => {
          gl.mergeLocaleMessage(locale, messages[locale]);
        });
      }
      let composerID = 0;
      function defineCoreMissingHandler(missing) {
        return (ctx, locale, key, type) => missing(locale, key, vue.getCurrentInstance() || void 0, type);
      }
      function createComposer(options = {}) {
        const { __root, __injectWithOption } = options, _isGlobal = __root === void 0, flatJson = options.flatJson, _ref = inBrowser ? vue.ref : vue.shallowRef;
        let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : !0;
        const _locale = _ref(
          // prettier-ignore
          __root && _inheritLocale ? __root.locale.value : isString(options.locale) ? options.locale : DEFAULT_LOCALE
        ), _fallbackLocale = _ref(
          // prettier-ignore
          __root && _inheritLocale ? __root.fallbackLocale.value : isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === !1 ? options.fallbackLocale : _locale.value
        ), _messages = _ref(getLocaleMessages(_locale.value, options));
        let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : !0, _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : !0, _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : !0, _fallbackFormat = !!options.fallbackFormat, _missing = isFunction$1(options.missing) ? options.missing : null, _runtimeMissing = isFunction$1(options.missing) ? defineCoreMissingHandler(options.missing) : null, _postTranslation = isFunction$1(options.postTranslation) ? options.postTranslation : null, _warnHtmlMessage = __root ? __root.warnHtmlMessage : isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : !0, _escapeParameter = !!options.escapeParameter;
        const _modifiers = __root ? __root.modifiers : isPlainObject(options.modifiers) ? options.modifiers : {};
        let _pluralRules = options.pluralRules || __root && __root.pluralRules, _context;
        _context = (() => {
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
            unresolving: !0,
            postTranslation: _postTranslation === null ? void 0 : _postTranslation,
            warnHtmlMessage: _warnHtmlMessage,
            escapeParameter: _escapeParameter,
            messageResolver: options.messageResolver,
            messageCompiler: options.messageCompiler,
            __meta: { framework: "vue" }
          }, ctx = createCoreContext(ctxOptions);
          return _isGlobal && setFallbackContext(ctx), ctx;
        })(), updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
        function trackReactivityValues() {
          return [_locale.value, _fallbackLocale.value, _messages.value];
        }
        const locale = vue.computed({
          get: () => _locale.value,
          set: (val) => {
            _locale.value = val, _context.locale = _locale.value;
          }
        }), fallbackLocale = vue.computed({
          get: () => _fallbackLocale.value,
          set: (val) => {
            _fallbackLocale.value = val, _context.fallbackLocale = _fallbackLocale.value, updateFallbackLocale(_context, _locale.value, val);
          }
        }), messages = vue.computed(() => _messages.value);
        function getPostTranslationHandler() {
          return isFunction$1(_postTranslation) ? _postTranslation : null;
        }
        function setPostTranslationHandler(handler) {
          _postTranslation = handler, _context.postTranslation = handler;
        }
        function getMissingHandler() {
          return _missing;
        }
        function setMissingHandler(handler) {
          handler !== null && (_runtimeMissing = defineCoreMissingHandler(handler)), _missing = handler, _context.missing = _runtimeMissing;
        }
        const wrapWithDeps = (fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) => {
          trackReactivityValues();
          let ret;
          try {
            __INTLIFY_PROD_DEVTOOLS__, _isGlobal || (_context.fallbackContext = __root ? getFallbackContext() : void 0), ret = fn(_context);
          } finally {
            __INTLIFY_PROD_DEVTOOLS__, _isGlobal || (_context.fallbackContext = void 0);
          }
          if (
            // for not `te` (e.g `t`)
            isNumber(ret) && ret === NOT_REOSLVED || warnType === "translate exists"
          ) {
            const [key, arg2] = argumentParser();
            return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
          } else {
            if (successCondition(ret))
              return ret;
            throw createI18nError(I18nErrorCodes.UNEXPECTED_RETURN_TYPE);
          }
        };
        function t2(...args) {
          return wrapWithDeps((context) => Reflect.apply(translate, null, [context, ...args]), () => parseTranslateArgs(...args), "translate", (root2) => Reflect.apply(root2.t, root2, [...args]), (key) => key, (val) => isString(val));
        }
        function setPluralRules(rules) {
          _pluralRules = rules, _context.pluralRules = _pluralRules;
        }
        function getLocaleMessage(locale2) {
          return _messages.value[locale2] || {};
        }
        function setLocaleMessage(locale2, message) {
          if (flatJson) {
            const _message = { [locale2]: message };
            for (const key in _message)
              hasOwn(_message, key) && handleFlatJson(_message[key]);
            message = _message[locale2];
          }
          _messages.value[locale2] = message, _context.messages = _messages.value;
        }
        function mergeLocaleMessage(locale2, message) {
          _messages.value[locale2] = _messages.value[locale2] || {};
          const _message = { [locale2]: message };
          if (flatJson)
            for (const key in _message)
              hasOwn(_message, key) && handleFlatJson(_message[key]);
          message = _message[locale2], deepCopy(message, _messages.value[locale2]), _context.messages = _messages.value;
        }
        return composerID++, __root && inBrowser && (vue.watch(__root.locale, (val) => {
          _inheritLocale && (_locale.value = val, _context.locale = val, updateFallbackLocale(_context, _locale.value, _fallbackLocale.value));
        }), vue.watch(__root.fallbackLocale, (val) => {
          _inheritLocale && (_fallbackLocale.value = val, _context.fallbackLocale = val, updateFallbackLocale(_context, _locale.value, _fallbackLocale.value));
        })), {
          id: composerID,
          locale,
          fallbackLocale,
          get inheritLocale() {
            return _inheritLocale;
          },
          set inheritLocale(val) {
            _inheritLocale = val, val && __root && (_locale.value = __root.locale.value, _fallbackLocale.value = __root.fallbackLocale.value, updateFallbackLocale(_context, _locale.value, _fallbackLocale.value));
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
            _missingWarn = val, _context.missingWarn = _missingWarn;
          },
          get fallbackWarn() {
            return _fallbackWarn;
          },
          set fallbackWarn(val) {
            _fallbackWarn = val, _context.fallbackWarn = _fallbackWarn;
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
            _fallbackFormat = val, _context.fallbackFormat = _fallbackFormat;
          },
          get warnHtmlMessage() {
            return _warnHtmlMessage;
          },
          set warnHtmlMessage(val) {
            _warnHtmlMessage = val, _context.warnHtmlMessage = val;
          },
          get escapeParameter() {
            return _escapeParameter;
          },
          set escapeParameter(val) {
            _escapeParameter = val, _context.escapeParameter = val;
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
      }
      const I18nInjectionKey = /* @__PURE__ */ makeSymbol("global-vue-i18n");
      function createI18n(options = {}) {
        const __globalInjection = isBoolean(options.globalInjection) ? options.globalInjection : !0, __instances = /* @__PURE__ */ new Map(), [globalScope, __global] = createGlobal(options), symbol = /* @__PURE__ */ makeSymbol("");
        function __getInstance(component) {
          return __instances.get(component) || null;
        }
        function __setInstance(component, instance) {
          __instances.set(component, instance);
        }
        function __deleteInstance(component) {
          __instances.delete(component);
        }
        const i18n2 = {
          // mode
          get mode() {
            return "composition";
          },
          // install plugin
          async install(app, ...options2) {
            if (app.__VUE_I18N_SYMBOL__ = symbol, app.provide(app.__VUE_I18N_SYMBOL__, i18n2), isPlainObject(options2[0])) {
              const opts = options2[0];
              i18n2.__composerExtend = opts.__composerExtend, i18n2.__vueI18nExtend = opts.__vueI18nExtend;
            }
            let globalReleaseHandler = null;
            __globalInjection && (globalReleaseHandler = injectGlobalFields(app, i18n2.global));
            const unmountApp = app.unmount;
            app.unmount = () => {
              globalReleaseHandler && globalReleaseHandler(), i18n2.dispose(), unmountApp();
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
      function useI18n(options = {}) {
        const instance = vue.getCurrentInstance();
        if (instance == null)
          throw createI18nError(I18nErrorCodes.MUST_BE_CALL_SETUP_TOP);
        if (!instance.isCE && instance.appContext.app != null && !instance.appContext.app.__VUE_I18N_SYMBOL__)
          throw createI18nError(I18nErrorCodes.NOT_INSTALLED);
        const i18n2 = getI18nInstance(instance), gl = getGlobalComposer(i18n2), componentOptions = getComponentOptions(instance), scope = getScope(options, componentOptions);
        if (scope === "global")
          return adjustI18nResources(gl, options, componentOptions), gl;
        if (scope === "parent") {
          let composer2 = getComposer(i18n2, instance, options.__useComponent);
          return composer2 == null && (composer2 = gl), composer2;
        }
        const i18nInternal = i18n2;
        let composer = i18nInternal.__getInstance(instance);
        if (composer == null) {
          const composerOptions = assign({}, options);
          "__i18n" in componentOptions && (composerOptions.__i18n = componentOptions.__i18n), gl && (composerOptions.__root = gl), composer = createComposer(composerOptions), i18nInternal.__composerExtend && (composer[DisposeSymbol] = i18nInternal.__composerExtend(composer)), setupLifeCycle(i18nInternal, instance, composer), i18nInternal.__setInstance(instance, composer);
        }
        return composer;
      }
      function createGlobal(options, legacyMode) {
        const scope = vue.effectScope(), obj = scope.run(() => createComposer(options));
        if (obj == null)
          throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
        return [scope, obj];
      }
      function getI18nInstance(instance) {
        const i18n2 = vue.inject(instance.isCE ? I18nInjectionKey : instance.appContext.app.__VUE_I18N_SYMBOL__);
        if (!i18n2)
          throw createI18nError(instance.isCE ? I18nErrorCodes.NOT_INSTALLED_WITH_PROVIDE : I18nErrorCodes.UNEXPECTED_ERROR);
        return i18n2;
      }
      function getScope(options, componentOptions) {
        return isEmptyObject(options) ? "__i18n" in componentOptions ? "local" : "global" : options.useScope ? options.useScope : "local";
      }
      function getGlobalComposer(i18n2) {
        return i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
      }
      function getComposer(i18n2, target, useComponent = !1) {
        let composer = null;
        const root2 = target.root;
        let current = getParentComponentInstance(target, useComponent);
        for (; current != null; ) {
          const i18nInternal = i18n2;
          if (i18n2.mode === "composition" && (composer = i18nInternal.__getInstance(current)), composer != null || root2 === current)
            break;
          current = current.parent;
        }
        return composer;
      }
      function getParentComponentInstance(target, useComponent = !1) {
        return target == null ? null : useComponent && target.vnode.ctx || target.parent;
      }
      function setupLifeCycle(i18n2, target, composer) {
        vue.onMounted(() => {
        }, target), vue.onUnmounted(() => {
          const _composer = composer;
          i18n2.__deleteInstance(target);
          const dispose = _composer[DisposeSymbol];
          dispose && (dispose(), delete _composer[DisposeSymbol]);
        }, target);
      }
      const globalExportProps = [
        "locale",
        "fallbackLocale",
        "availableLocales"
      ], globalExportMethods = ["t"];
      function injectGlobalFields(app, composer) {
        const i18n2 = /* @__PURE__ */ Object.create(null);
        return globalExportProps.forEach((prop) => {
          const desc = Object.getOwnPropertyDescriptor(composer, prop);
          if (!desc)
            throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
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
        }), app.config.globalProperties.$i18n = i18n2, globalExportMethods.forEach((method) => {
          const desc = Object.getOwnPropertyDescriptor(composer, method);
          if (!desc || !desc.value)
            throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
          Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
        }), () => {
          delete app.config.globalProperties.$i18n, globalExportMethods.forEach((method) => {
            delete app.config.globalProperties[`$${method}`];
          });
        };
      }
      initFeatureFlags$1();
      registerMessageCompiler(compile);
      if (__INTLIFY_PROD_DEVTOOLS__) {
        const target = getGlobalThis$1();
        target.__INTLIFY__ = !0, setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
      }
      const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
        __name: "ConfirmPopup",
        emits: ["confirm"],
        setup(__props, { emit: __emit }) {
          const emit = __emit, { t: t2 } = useI18n();
          return (_ctx, _cache) => (vue.openBlock(), vue.createBlock(vue.unref(elementPlus.ElPopconfirm), {
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
          }, 8, ["title", "confirm-button-text", "cancel-button-text"]));
        }
      });
      var FileSaver_min$1 = { exports: {} }, FileSaver_min = FileSaver_min$1.exports, hasRequiredFileSaver_min;
      function requireFileSaver_min() {
        return hasRequiredFileSaver_min || (hasRequiredFileSaver_min = 1, function(module2, exports2) {
          (function(a, b) {
            b();
          })(FileSaver_min, function() {
            function b(a2, b2) {
              return typeof b2 > "u" ? b2 = { autoBom: !1 } : typeof b2 != "object" && (console.warn("Deprecated: Expected third argument to be a object"), b2 = { autoBom: !b2 }), b2.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a2.type) ? new Blob(["\uFEFF", a2], { type: a2.type }) : a2;
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
              b2.open("HEAD", a2, !1);
              try {
                b2.send();
              } catch {
              }
              return 200 <= b2.status && 299 >= b2.status;
            }
            function e(a2) {
              try {
                a2.dispatchEvent(new MouseEvent("click"));
              } catch {
                var b2 = document.createEvent("MouseEvents");
                b2.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), a2.dispatchEvent(b2);
              }
            }
            var f = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof commonjsGlobal == "object" && commonjsGlobal.global === commonjsGlobal ? commonjsGlobal : void 0, a = f.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), g = f.saveAs || (typeof window != "object" || window !== f ? function() {
            } : "download" in HTMLAnchorElement.prototype && !a ? function(b2, g2, h2) {
              var i = f.URL || f.webkitURL, j = document.createElement("a");
              g2 = g2 || b2.name || "download", j.download = g2, j.rel = "noopener", typeof b2 == "string" ? (j.href = b2, j.origin === location.origin ? e(j) : d(j.href) ? c(b2, g2, h2) : e(j, j.target = "_blank")) : (j.href = i.createObjectURL(b2), setTimeout(function() {
                i.revokeObjectURL(j.href);
              }, 4e4), setTimeout(function() {
                e(j);
              }, 0));
            } : "msSaveOrOpenBlob" in navigator ? function(f2, g2, h2) {
              if (g2 = g2 || f2.name || "download", typeof f2 != "string") navigator.msSaveOrOpenBlob(b(f2, h2), g2);
              else if (d(f2)) c(f2, g2, h2);
              else {
                var i = document.createElement("a");
                i.href = f2, i.target = "_blank", setTimeout(function() {
                  e(i);
                });
              }
            } : function(b2, d2, e2, g2) {
              if (g2 = g2 || open("", "_blank"), g2 && (g2.document.title = g2.document.body.innerText = "downloading..."), typeof b2 == "string") return c(b2, d2, e2);
              var h2 = b2.type === "application/octet-stream", i = /constructor/i.test(f.HTMLElement) || f.safari, j = /CriOS\/[\d]+/.test(navigator.userAgent);
              if ((j || h2 && i || a) && typeof FileReader < "u") {
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
        }(FileSaver_min$1)), FileSaver_min$1.exports;
      }
      var FileSaver_minExports = requireFileSaver_min();
      function commonjsRequire(path) {
        throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
      }
      var localforage$1 = { exports: {} };
      var hasRequiredLocalforage;
      function requireLocalforage() {
        return hasRequiredLocalforage || (hasRequiredLocalforage = 1, function(module2, exports2) {
          (function(f) {
            module2.exports = f();
          })(function() {
            return function e(t2, n, r) {
              function s(o2, u) {
                if (!n[o2]) {
                  if (!t2[o2]) {
                    var a = typeof commonjsRequire == "function" && commonjsRequire;
                    if (!u && a) return a(o2, !0);
                    if (i) return i(o2, !0);
                    var f = new Error("Cannot find module '" + o2 + "'");
                    throw f.code = "MODULE_NOT_FOUND", f;
                  }
                  var l = n[o2] = { exports: {} };
                  t2[o2][0].call(l.exports, function(e2) {
                    var n2 = t2[o2][1][e2];
                    return s(n2 || e2);
                  }, l, l.exports, e, t2, n, r);
                }
                return n[o2].exports;
              }
              for (var i = typeof commonjsRequire == "function" && commonjsRequire, o = 0; o < r.length; o++) s(r[o]);
              return s;
            }({ 1: [function(_dereq_, module3, exports3) {
              (function(global2) {
                var Mutation = global2.MutationObserver || global2.WebKitMutationObserver, scheduleDrain;
                if (Mutation) {
                  var called = 0, observer = new Mutation(nextTick2), element = global2.document.createTextNode("");
                  observer.observe(element, {
                    characterData: !0
                  }), scheduleDrain = function() {
                    element.data = called = ++called % 2;
                  };
                } else if (!global2.setImmediate && typeof global2.MessageChannel < "u") {
                  var channel = new global2.MessageChannel();
                  channel.port1.onmessage = nextTick2, scheduleDrain = function() {
                    channel.port2.postMessage(0);
                  };
                } else "document" in global2 && "onreadystatechange" in global2.document.createElement("script") ? scheduleDrain = function() {
                  var scriptEl = global2.document.createElement("script");
                  scriptEl.onreadystatechange = function() {
                    nextTick2(), scriptEl.onreadystatechange = null, scriptEl.parentNode.removeChild(scriptEl), scriptEl = null;
                  }, global2.document.documentElement.appendChild(scriptEl);
                } : scheduleDrain = function() {
                  setTimeout(nextTick2, 0);
                };
                var draining, queue = [];
                function nextTick2() {
                  draining = !0;
                  for (var i, oldQueue, len = queue.length; len; ) {
                    for (oldQueue = queue, queue = [], i = -1; ++i < len; )
                      oldQueue[i]();
                    len = queue.length;
                  }
                  draining = !1;
                }
                module3.exports = immediate;
                function immediate(task) {
                  queue.push(task) === 1 && !draining && scheduleDrain();
                }
              }).call(this, typeof commonjsGlobal < "u" ? commonjsGlobal : typeof self < "u" ? self : typeof window < "u" ? window : {});
            }, {}], 2: [function(_dereq_, module3, exports3) {
              var immediate = _dereq_(1);
              function INTERNAL() {
              }
              var handlers2 = {}, REJECTED = ["REJECTED"], FULFILLED = ["FULFILLED"], PENDING = ["PENDING"];
              module3.exports = Promise2;
              function Promise2(resolver) {
                if (typeof resolver != "function")
                  throw new TypeError("resolver must be a function");
                this.state = PENDING, this.queue = [], this.outcome = void 0, resolver !== INTERNAL && safelyResolveThenable(this, resolver);
              }
              Promise2.prototype.catch = function(onRejected) {
                return this.then(null, onRejected);
              }, Promise2.prototype.then = function(onFulfilled, onRejected) {
                if (typeof onFulfilled != "function" && this.state === FULFILLED || typeof onRejected != "function" && this.state === REJECTED)
                  return this;
                var promise = new this.constructor(INTERNAL);
                if (this.state !== PENDING) {
                  var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
                  unwrap(promise, resolver, this.outcome);
                } else
                  this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
                return promise;
              };
              function QueueItem(promise, onFulfilled, onRejected) {
                this.promise = promise, typeof onFulfilled == "function" && (this.onFulfilled = onFulfilled, this.callFulfilled = this.otherCallFulfilled), typeof onRejected == "function" && (this.onRejected = onRejected, this.callRejected = this.otherCallRejected);
              }
              QueueItem.prototype.callFulfilled = function(value) {
                handlers2.resolve(this.promise, value);
              }, QueueItem.prototype.otherCallFulfilled = function(value) {
                unwrap(this.promise, this.onFulfilled, value);
              }, QueueItem.prototype.callRejected = function(value) {
                handlers2.reject(this.promise, value);
              }, QueueItem.prototype.otherCallRejected = function(value) {
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
                  returnValue === promise ? handlers2.reject(promise, new TypeError("Cannot resolve promise with itself")) : handlers2.resolve(promise, returnValue);
                });
              }
              handlers2.resolve = function(self2, value) {
                var result = tryCatch(getThen, value);
                if (result.status === "error")
                  return handlers2.reject(self2, result.value);
                var thenable = result.value;
                if (thenable)
                  safelyResolveThenable(self2, thenable);
                else {
                  self2.state = FULFILLED, self2.outcome = value;
                  for (var i = -1, len = self2.queue.length; ++i < len; )
                    self2.queue[i].callFulfilled(value);
                }
                return self2;
              }, handlers2.reject = function(self2, error) {
                self2.state = REJECTED, self2.outcome = error;
                for (var i = -1, len = self2.queue.length; ++i < len; )
                  self2.queue[i].callRejected(error);
                return self2;
              };
              function getThen(obj) {
                var then = obj && obj.then;
                if (obj && (typeof obj == "object" || typeof obj == "function") && typeof then == "function")
                  return function() {
                    then.apply(obj, arguments);
                  };
              }
              function safelyResolveThenable(self2, thenable) {
                var called = !1;
                function onError(value) {
                  called || (called = !0, handlers2.reject(self2, value));
                }
                function onSuccess(value) {
                  called || (called = !0, handlers2.resolve(self2, value));
                }
                function tryToUnwrap() {
                  thenable(onSuccess, onError);
                }
                var result = tryCatch(tryToUnwrap);
                result.status === "error" && onError(result.value);
              }
              function tryCatch(func, value) {
                var out = {};
                try {
                  out.value = func(value), out.status = "success";
                } catch (e) {
                  out.status = "error", out.value = e;
                }
                return out;
              }
              Promise2.resolve = resolve;
              function resolve(value) {
                return value instanceof this ? value : handlers2.resolve(new this(INTERNAL), value);
              }
              Promise2.reject = reject;
              function reject(reason) {
                var promise = new this(INTERNAL);
                return handlers2.reject(promise, reason);
              }
              Promise2.all = all;
              function all(iterable) {
                var self2 = this;
                if (Object.prototype.toString.call(iterable) !== "[object Array]")
                  return this.reject(new TypeError("must be an array"));
                var len = iterable.length, called = !1;
                if (!len)
                  return this.resolve([]);
                for (var values2 = new Array(len), resolved = 0, i = -1, promise = new this(INTERNAL); ++i < len; )
                  allResolver(iterable[i], i);
                return promise;
                function allResolver(value, i2) {
                  self2.resolve(value).then(resolveFromAll, function(error) {
                    called || (called = !0, handlers2.reject(promise, error));
                  });
                  function resolveFromAll(outValue) {
                    values2[i2] = outValue, ++resolved === len && !called && (called = !0, handlers2.resolve(promise, values2));
                  }
                }
              }
              Promise2.race = race;
              function race(iterable) {
                var self2 = this;
                if (Object.prototype.toString.call(iterable) !== "[object Array]")
                  return this.reject(new TypeError("must be an array"));
                var len = iterable.length, called = !1;
                if (!len)
                  return this.resolve([]);
                for (var i = -1, promise = new this(INTERNAL); ++i < len; )
                  resolver(iterable[i]);
                return promise;
                function resolver(value) {
                  self2.resolve(value).then(function(response) {
                    called || (called = !0, handlers2.resolve(promise, response));
                  }, function(error) {
                    called || (called = !0, handlers2.reject(promise, error));
                  });
                }
              }
            }, { 1: 1 }], 3: [function(_dereq_, module3, exports3) {
              (function(global2) {
                typeof global2.Promise != "function" && (global2.Promise = _dereq_(2));
              }).call(this, typeof commonjsGlobal < "u" ? commonjsGlobal : typeof self < "u" ? self : typeof window < "u" ? window : {});
            }, { 2: 2 }], 4: [function(_dereq_, module3, exports3) {
              var _typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(obj) {
                return typeof obj;
              } : function(obj) {
                return obj && typeof Symbol == "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
              };
              function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor))
                  throw new TypeError("Cannot call a class as a function");
              }
              function getIDB() {
                try {
                  if (typeof indexedDB < "u")
                    return indexedDB;
                  if (typeof webkitIndexedDB < "u")
                    return webkitIndexedDB;
                  if (typeof mozIndexedDB < "u")
                    return mozIndexedDB;
                  if (typeof OIndexedDB < "u")
                    return OIndexedDB;
                  if (typeof msIndexedDB < "u")
                    return msIndexedDB;
                } catch {
                  return;
                }
              }
              var idb = getIDB();
              function isIndexedDBValid() {
                try {
                  if (!idb || !idb.open)
                    return !1;
                  var isSafari = typeof openDatabase < "u" && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform), hasFetch = typeof fetch == "function" && fetch.toString().indexOf("[native code") !== -1;
                  return (!isSafari || hasFetch) && typeof indexedDB < "u" && // some outdated implementations of IDB that appear on Samsung
                  // and HTC Android devices <4.4 are missing IDBKeyRange
                  // See: https://github.com/mozilla/localForage/issues/128
                  // See: https://github.com/mozilla/localForage/issues/272
                  typeof IDBKeyRange < "u";
                } catch {
                  return !1;
                }
              }
              function createBlob(parts, properties) {
                parts = parts || [], properties = properties || {};
                try {
                  return new Blob(parts, properties);
                } catch (e) {
                  if (e.name !== "TypeError")
                    throw e;
                  for (var Builder = typeof BlobBuilder < "u" ? BlobBuilder : typeof MSBlobBuilder < "u" ? MSBlobBuilder : typeof MozBlobBuilder < "u" ? MozBlobBuilder : WebKitBlobBuilder, builder = new Builder(), i = 0; i < parts.length; i += 1)
                    builder.append(parts[i]);
                  return builder.getBlob(properties.type);
                }
              }
              typeof Promise > "u" && _dereq_(3);
              var Promise$12 = Promise;
              function executeCallback2(promise, callback) {
                callback && promise.then(function(result) {
                  callback(null, result);
                }, function(error) {
                  callback(error);
                });
              }
              function executeTwoCallbacks(promise, callback, errorCallback) {
                typeof callback == "function" && promise.then(callback), typeof errorCallback == "function" && promise.catch(errorCallback);
              }
              function normalizeKey(key2) {
                return typeof key2 != "string" && (console.warn(key2 + " used as a key, but it is not a string."), key2 = String(key2)), key2;
              }
              function getCallback() {
                if (arguments.length && typeof arguments[arguments.length - 1] == "function")
                  return arguments[arguments.length - 1];
              }
              var DETECT_BLOB_SUPPORT_STORE = "local-forage-detect-blob-support", supportsBlobs = void 0, dbContexts = {}, toString2 = Object.prototype.toString, READ_ONLY = "readonly", READ_WRITE = "readwrite";
              function _binStringToArrayBuffer(bin) {
                for (var length2 = bin.length, buf = new ArrayBuffer(length2), arr = new Uint8Array(buf), i = 0; i < length2; i++)
                  arr[i] = bin.charCodeAt(i);
                return buf;
              }
              function _checkBlobSupportWithoutCaching(idb2) {
                return new Promise$12(function(resolve) {
                  var txn = idb2.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE), blob2 = createBlob([""]);
                  txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob2, "key"), txn.onabort = function(e) {
                    e.preventDefault(), e.stopPropagation(), resolve(!1);
                  }, txn.oncomplete = function() {
                    var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/), matchedEdge = navigator.userAgent.match(/Edge\//);
                    resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
                  };
                }).catch(function() {
                  return !1;
                });
              }
              function _checkBlobSupport(idb2) {
                return typeof supportsBlobs == "boolean" ? Promise$12.resolve(supportsBlobs) : _checkBlobSupportWithoutCaching(idb2).then(function(value) {
                  return supportsBlobs = value, supportsBlobs;
                });
              }
              function _deferReadiness(dbInfo) {
                var dbContext = dbContexts[dbInfo.name], deferredOperation = {};
                deferredOperation.promise = new Promise$12(function(resolve, reject) {
                  deferredOperation.resolve = resolve, deferredOperation.reject = reject;
                }), dbContext.deferredOperations.push(deferredOperation), dbContext.dbReady ? dbContext.dbReady = dbContext.dbReady.then(function() {
                  return deferredOperation.promise;
                }) : dbContext.dbReady = deferredOperation.promise;
              }
              function _advanceReadiness(dbInfo) {
                var dbContext = dbContexts[dbInfo.name], deferredOperation = dbContext.deferredOperations.pop();
                if (deferredOperation)
                  return deferredOperation.resolve(), deferredOperation.promise;
              }
              function _rejectReadiness(dbInfo, err) {
                var dbContext = dbContexts[dbInfo.name], deferredOperation = dbContext.deferredOperations.pop();
                if (deferredOperation)
                  return deferredOperation.reject(err), deferredOperation.promise;
              }
              function _getConnection(dbInfo, upgradeNeeded) {
                return new Promise$12(function(resolve, reject) {
                  if (dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext(), dbInfo.db)
                    if (upgradeNeeded)
                      _deferReadiness(dbInfo), dbInfo.db.close();
                    else
                      return resolve(dbInfo.db);
                  var dbArgs = [dbInfo.name];
                  upgradeNeeded && dbArgs.push(dbInfo.version);
                  var openreq = idb.open.apply(idb, dbArgs);
                  upgradeNeeded && (openreq.onupgradeneeded = function(e) {
                    var db = openreq.result;
                    try {
                      db.createObjectStore(dbInfo.storeName), e.oldVersion <= 1 && db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                    } catch (ex) {
                      if (ex.name === "ConstraintError")
                        console.warn('The database "' + dbInfo.name + '" has been upgraded from version ' + e.oldVersion + " to version " + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                      else
                        throw ex;
                    }
                  }), openreq.onerror = function(e) {
                    e.preventDefault(), reject(openreq.error);
                  }, openreq.onsuccess = function() {
                    var db = openreq.result;
                    db.onversionchange = function(e) {
                      e.target.close();
                    }, resolve(db), _advanceReadiness(dbInfo);
                  };
                });
              }
              function _getOriginalConnection(dbInfo) {
                return _getConnection(dbInfo, !1);
              }
              function _getUpgradedConnection(dbInfo) {
                return _getConnection(dbInfo, !0);
              }
              function _isUpgradeNeeded(dbInfo, defaultVersion) {
                if (!dbInfo.db)
                  return !0;
                var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName), isDowngrade = dbInfo.version < dbInfo.db.version, isUpgrade = dbInfo.version > dbInfo.db.version;
                if (isDowngrade && (dbInfo.version !== defaultVersion && console.warn('The database "' + dbInfo.name + `" can't be downgraded from version ` + dbInfo.db.version + " to version " + dbInfo.version + "."), dbInfo.version = dbInfo.db.version), isUpgrade || isNewStore) {
                  if (isNewStore) {
                    var incVersion = dbInfo.db.version + 1;
                    incVersion > dbInfo.version && (dbInfo.version = incVersion);
                  }
                  return !0;
                }
                return !1;
              }
              function _encodeBlob(blob2) {
                return new Promise$12(function(resolve, reject) {
                  var reader = new FileReader();
                  reader.onerror = reject, reader.onloadend = function(e) {
                    var base64 = btoa(e.target.result || "");
                    resolve({
                      __local_forage_encoded_blob: !0,
                      data: base64,
                      type: blob2.type
                    });
                  }, reader.readAsBinaryString(blob2);
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
                var self2 = this, promise = self2._initReady().then(function() {
                  var dbContext = dbContexts[self2._dbInfo.name];
                  if (dbContext && dbContext.dbReady)
                    return dbContext.dbReady;
                });
                return executeTwoCallbacks(promise, callback, callback), promise;
              }
              function _tryReconnect(dbInfo) {
                _deferReadiness(dbInfo);
                for (var dbContext = dbContexts[dbInfo.name], forages = dbContext.forages, i = 0; i < forages.length; i++) {
                  var forage = forages[i];
                  forage._dbInfo.db && (forage._dbInfo.db.close(), forage._dbInfo.db = null);
                }
                return dbInfo.db = null, _getOriginalConnection(dbInfo).then(function(db) {
                  return dbInfo.db = db, _isUpgradeNeeded(dbInfo) ? _getUpgradedConnection(dbInfo) : db;
                }).then(function(db) {
                  dbInfo.db = dbContext.db = db;
                  for (var i2 = 0; i2 < forages.length; i2++)
                    forages[i2]._dbInfo.db = db;
                }).catch(function(err) {
                  throw _rejectReadiness(dbInfo, err), err;
                });
              }
              function createTransaction(dbInfo, mode, callback, retries) {
                retries === void 0 && (retries = 1);
                try {
                  var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
                  callback(null, tx);
                } catch (err) {
                  if (retries > 0 && (!dbInfo.db || err.name === "InvalidStateError" || err.name === "NotFoundError"))
                    return Promise$12.resolve().then(function() {
                      if (!dbInfo.db || err.name === "NotFoundError" && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version)
                        return dbInfo.db && (dbInfo.version = dbInfo.db.version + 1), _getUpgradedConnection(dbInfo);
                    }).then(function() {
                      return _tryReconnect(dbInfo).then(function() {
                        createTransaction(dbInfo, mode, callback, retries - 1);
                      });
                    }).catch(callback);
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
                var self2 = this, dbInfo = {
                  db: null
                };
                if (options)
                  for (var i in options)
                    dbInfo[i] = options[i];
                var dbContext = dbContexts[dbInfo.name];
                dbContext || (dbContext = createDbContext(), dbContexts[dbInfo.name] = dbContext), dbContext.forages.push(self2), self2._initReady || (self2._initReady = self2.ready, self2.ready = _fullyReady);
                var initPromises = [];
                function ignoreErrors() {
                  return Promise$12.resolve();
                }
                for (var j = 0; j < dbContext.forages.length; j++) {
                  var forage = dbContext.forages[j];
                  forage !== self2 && initPromises.push(forage._initReady().catch(ignoreErrors));
                }
                var forages = dbContext.forages.slice(0);
                return Promise$12.all(initPromises).then(function() {
                  return dbInfo.db = dbContext.db, _getOriginalConnection(dbInfo);
                }).then(function(db) {
                  return dbInfo.db = db, _isUpgradeNeeded(dbInfo, self2._defaultConfig.version) ? _getUpgradedConnection(dbInfo) : db;
                }).then(function(db) {
                  dbInfo.db = dbContext.db = db, self2._dbInfo = dbInfo;
                  for (var k = 0; k < forages.length; k++) {
                    var forage2 = forages[k];
                    forage2 !== self2 && (forage2._dbInfo.db = dbInfo.db, forage2._dbInfo.version = dbInfo.version);
                  }
                });
              }
              function getItem(key2, callback) {
                var self2 = this;
                key2 = normalizeKey(key2);
                var promise = new Promise$12(function(resolve, reject) {
                  self2.ready().then(function() {
                    createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                      if (err)
                        return reject(err);
                      try {
                        var store = transaction.objectStore(self2._dbInfo.storeName), req = store.get(key2);
                        req.onsuccess = function() {
                          var value = req.result;
                          value === void 0 && (value = null), _isEncodedBlob(value) && (value = _decodeBlob(value)), resolve(value);
                        }, req.onerror = function() {
                          reject(req.error);
                        };
                      } catch (e) {
                        reject(e);
                      }
                    });
                  }).catch(reject);
                });
                return executeCallback2(promise, callback), promise;
              }
              function iterate(iterator, callback) {
                var self2 = this, promise = new Promise$12(function(resolve, reject) {
                  self2.ready().then(function() {
                    createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                      if (err)
                        return reject(err);
                      try {
                        var store = transaction.objectStore(self2._dbInfo.storeName), req = store.openCursor(), iterationNumber = 1;
                        req.onsuccess = function() {
                          var cursor = req.result;
                          if (cursor) {
                            var value = cursor.value;
                            _isEncodedBlob(value) && (value = _decodeBlob(value));
                            var result = iterator(value, cursor.key, iterationNumber++);
                            result !== void 0 ? resolve(result) : cursor.continue();
                          } else
                            resolve();
                        }, req.onerror = function() {
                          reject(req.error);
                        };
                      } catch (e) {
                        reject(e);
                      }
                    });
                  }).catch(reject);
                });
                return executeCallback2(promise, callback), promise;
              }
              function setItem(key2, value, callback) {
                var self2 = this;
                key2 = normalizeKey(key2);
                var promise = new Promise$12(function(resolve, reject) {
                  var dbInfo;
                  self2.ready().then(function() {
                    return dbInfo = self2._dbInfo, toString2.call(value) === "[object Blob]" ? _checkBlobSupport(dbInfo.db).then(function(blobSupport) {
                      return blobSupport ? value : _encodeBlob(value);
                    }) : value;
                  }).then(function(value2) {
                    createTransaction(self2._dbInfo, READ_WRITE, function(err, transaction) {
                      if (err)
                        return reject(err);
                      try {
                        var store = transaction.objectStore(self2._dbInfo.storeName);
                        value2 === null && (value2 = void 0);
                        var req = store.put(value2, key2);
                        transaction.oncomplete = function() {
                          value2 === void 0 && (value2 = null), resolve(value2);
                        }, transaction.onabort = transaction.onerror = function() {
                          var err2 = req.error ? req.error : req.transaction.error;
                          reject(err2);
                        };
                      } catch (e) {
                        reject(e);
                      }
                    });
                  }).catch(reject);
                });
                return executeCallback2(promise, callback), promise;
              }
              function removeItem(key2, callback) {
                var self2 = this;
                key2 = normalizeKey(key2);
                var promise = new Promise$12(function(resolve, reject) {
                  self2.ready().then(function() {
                    createTransaction(self2._dbInfo, READ_WRITE, function(err, transaction) {
                      if (err)
                        return reject(err);
                      try {
                        var store = transaction.objectStore(self2._dbInfo.storeName), req = store.delete(key2);
                        transaction.oncomplete = function() {
                          resolve();
                        }, transaction.onerror = function() {
                          reject(req.error);
                        }, transaction.onabort = function() {
                          var err2 = req.error ? req.error : req.transaction.error;
                          reject(err2);
                        };
                      } catch (e) {
                        reject(e);
                      }
                    });
                  }).catch(reject);
                });
                return executeCallback2(promise, callback), promise;
              }
              function clear(callback) {
                var self2 = this, promise = new Promise$12(function(resolve, reject) {
                  self2.ready().then(function() {
                    createTransaction(self2._dbInfo, READ_WRITE, function(err, transaction) {
                      if (err)
                        return reject(err);
                      try {
                        var store = transaction.objectStore(self2._dbInfo.storeName), req = store.clear();
                        transaction.oncomplete = function() {
                          resolve();
                        }, transaction.onabort = transaction.onerror = function() {
                          var err2 = req.error ? req.error : req.transaction.error;
                          reject(err2);
                        };
                      } catch (e) {
                        reject(e);
                      }
                    });
                  }).catch(reject);
                });
                return executeCallback2(promise, callback), promise;
              }
              function length(callback) {
                var self2 = this, promise = new Promise$12(function(resolve, reject) {
                  self2.ready().then(function() {
                    createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                      if (err)
                        return reject(err);
                      try {
                        var store = transaction.objectStore(self2._dbInfo.storeName), req = store.count();
                        req.onsuccess = function() {
                          resolve(req.result);
                        }, req.onerror = function() {
                          reject(req.error);
                        };
                      } catch (e) {
                        reject(e);
                      }
                    });
                  }).catch(reject);
                });
                return executeCallback2(promise, callback), promise;
              }
              function key(n, callback) {
                var self2 = this, promise = new Promise$12(function(resolve, reject) {
                  if (n < 0) {
                    resolve(null);
                    return;
                  }
                  self2.ready().then(function() {
                    createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                      if (err)
                        return reject(err);
                      try {
                        var store = transaction.objectStore(self2._dbInfo.storeName), advanced = !1, req = store.openKeyCursor();
                        req.onsuccess = function() {
                          var cursor = req.result;
                          if (!cursor) {
                            resolve(null);
                            return;
                          }
                          n === 0 || advanced ? resolve(cursor.key) : (advanced = !0, cursor.advance(n));
                        }, req.onerror = function() {
                          reject(req.error);
                        };
                      } catch (e) {
                        reject(e);
                      }
                    });
                  }).catch(reject);
                });
                return executeCallback2(promise, callback), promise;
              }
              function keys2(callback) {
                var self2 = this, promise = new Promise$12(function(resolve, reject) {
                  self2.ready().then(function() {
                    createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                      if (err)
                        return reject(err);
                      try {
                        var store = transaction.objectStore(self2._dbInfo.storeName), req = store.openKeyCursor(), keys3 = [];
                        req.onsuccess = function() {
                          var cursor = req.result;
                          if (!cursor) {
                            resolve(keys3);
                            return;
                          }
                          keys3.push(cursor.key), cursor.continue();
                        }, req.onerror = function() {
                          reject(req.error);
                        };
                      } catch (e) {
                        reject(e);
                      }
                    });
                  }).catch(reject);
                });
                return executeCallback2(promise, callback), promise;
              }
              function dropInstance(options, callback) {
                callback = getCallback.apply(this, arguments);
                var currentConfig = this.config();
                options = typeof options != "function" && options || {}, options.name || (options.name = options.name || currentConfig.name, options.storeName = options.storeName || currentConfig.storeName);
                var self2 = this, promise;
                if (!options.name)
                  promise = Promise$12.reject("Invalid arguments");
                else {
                  var isCurrentDb = options.name === currentConfig.name && self2._dbInfo.db, dbPromise = isCurrentDb ? Promise$12.resolve(self2._dbInfo.db) : _getOriginalConnection(options).then(function(db) {
                    var dbContext = dbContexts[options.name], forages = dbContext.forages;
                    dbContext.db = db;
                    for (var i = 0; i < forages.length; i++)
                      forages[i]._dbInfo.db = db;
                    return db;
                  });
                  options.storeName ? promise = dbPromise.then(function(db) {
                    if (db.objectStoreNames.contains(options.storeName)) {
                      var newVersion = db.version + 1;
                      _deferReadiness(options);
                      var dbContext = dbContexts[options.name], forages = dbContext.forages;
                      db.close();
                      for (var i = 0; i < forages.length; i++) {
                        var forage = forages[i];
                        forage._dbInfo.db = null, forage._dbInfo.version = newVersion;
                      }
                      var dropObjectPromise = new Promise$12(function(resolve, reject) {
                        var req = idb.open(options.name, newVersion);
                        req.onerror = function(err) {
                          var db2 = req.result;
                          db2.close(), reject(err);
                        }, req.onupgradeneeded = function() {
                          var db2 = req.result;
                          db2.deleteObjectStore(options.storeName);
                        }, req.onsuccess = function() {
                          var db2 = req.result;
                          db2.close(), resolve(db2);
                        };
                      });
                      return dropObjectPromise.then(function(db2) {
                        dbContext.db = db2;
                        for (var j = 0; j < forages.length; j++) {
                          var _forage2 = forages[j];
                          _forage2._dbInfo.db = db2, _advanceReadiness(_forage2._dbInfo);
                        }
                      }).catch(function(err) {
                        throw (_rejectReadiness(options, err) || Promise$12.resolve()).catch(function() {
                        }), err;
                      });
                    }
                  }) : promise = dbPromise.then(function(db) {
                    _deferReadiness(options);
                    var dbContext = dbContexts[options.name], forages = dbContext.forages;
                    db.close();
                    for (var i = 0; i < forages.length; i++) {
                      var forage = forages[i];
                      forage._dbInfo.db = null;
                    }
                    var dropDBPromise = new Promise$12(function(resolve, reject) {
                      var req = idb.deleteDatabase(options.name);
                      req.onerror = function() {
                        var db2 = req.result;
                        db2 && db2.close(), reject(req.error);
                      }, req.onblocked = function() {
                        console.warn('dropInstance blocked for database "' + options.name + '" until all open connections are closed');
                      }, req.onsuccess = function() {
                        var db2 = req.result;
                        db2 && db2.close(), resolve(db2);
                      };
                    });
                    return dropDBPromise.then(function(db2) {
                      dbContext.db = db2;
                      for (var i2 = 0; i2 < forages.length; i2++) {
                        var _forage = forages[i2];
                        _advanceReadiness(_forage._dbInfo);
                      }
                    }).catch(function(err) {
                      throw (_rejectReadiness(options, err) || Promise$12.resolve()).catch(function() {
                      }), err;
                    });
                  });
                }
                return executeCallback2(promise, callback), promise;
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
                return typeof openDatabase == "function";
              }
              var BASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", BLOB_TYPE_PREFIX = "~~local_forage_type~", BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/, SERIALIZED_MARKER = "__lfsc__:", SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length, TYPE_ARRAYBUFFER = "arbf", TYPE_BLOB = "blob", TYPE_INT8ARRAY = "si08", TYPE_UINT8ARRAY = "ui08", TYPE_UINT8CLAMPEDARRAY = "uic8", TYPE_INT16ARRAY = "si16", TYPE_INT32ARRAY = "si32", TYPE_UINT16ARRAY = "ur16", TYPE_UINT32ARRAY = "ui32", TYPE_FLOAT32ARRAY = "fl32", TYPE_FLOAT64ARRAY = "fl64", TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length, toString$12 = Object.prototype.toString;
              function stringToBuffer(serializedString) {
                var bufferLength = serializedString.length * 0.75, len = serializedString.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
                serializedString[serializedString.length - 1] === "=" && (bufferLength--, serializedString[serializedString.length - 2] === "=" && bufferLength--);
                var buffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(buffer);
                for (i = 0; i < len; i += 4)
                  encoded1 = BASE_CHARS.indexOf(serializedString[i]), encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]), encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]), encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]), bytes[p++] = encoded1 << 2 | encoded2 >> 4, bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2, bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
                return buffer;
              }
              function bufferToString(buffer) {
                var bytes = new Uint8Array(buffer), base64String = "", i;
                for (i = 0; i < bytes.length; i += 3)
                  base64String += BASE_CHARS[bytes[i] >> 2], base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4], base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6], base64String += BASE_CHARS[bytes[i + 2] & 63];
                return bytes.length % 3 === 2 ? base64String = base64String.substring(0, base64String.length - 1) + "=" : bytes.length % 3 === 1 && (base64String = base64String.substring(0, base64String.length - 2) + "=="), base64String;
              }
              function serialize(value, callback) {
                var valueType = "";
                if (value && (valueType = toString$12.call(value)), value && (valueType === "[object ArrayBuffer]" || value.buffer && toString$12.call(value.buffer) === "[object ArrayBuffer]")) {
                  var buffer, marker = SERIALIZED_MARKER;
                  value instanceof ArrayBuffer ? (buffer = value, marker += TYPE_ARRAYBUFFER) : (buffer = value.buffer, valueType === "[object Int8Array]" ? marker += TYPE_INT8ARRAY : valueType === "[object Uint8Array]" ? marker += TYPE_UINT8ARRAY : valueType === "[object Uint8ClampedArray]" ? marker += TYPE_UINT8CLAMPEDARRAY : valueType === "[object Int16Array]" ? marker += TYPE_INT16ARRAY : valueType === "[object Uint16Array]" ? marker += TYPE_UINT16ARRAY : valueType === "[object Int32Array]" ? marker += TYPE_INT32ARRAY : valueType === "[object Uint32Array]" ? marker += TYPE_UINT32ARRAY : valueType === "[object Float32Array]" ? marker += TYPE_FLOAT32ARRAY : valueType === "[object Float64Array]" ? marker += TYPE_FLOAT64ARRAY : callback(new Error("Failed to get type for BinaryArray"))), callback(marker + bufferToString(buffer));
                } else if (valueType === "[object Blob]") {
                  var fileReader = new FileReader();
                  fileReader.onload = function() {
                    var str = BLOB_TYPE_PREFIX + value.type + "~" + bufferToString(this.result);
                    callback(SERIALIZED_MARKER + TYPE_BLOB + str);
                  }, fileReader.readAsArrayBuffer(value);
                } else
                  try {
                    callback(JSON.stringify(value));
                  } catch (e) {
                    console.error("Couldn't convert value into a JSON string: ", value), callback(null, e);
                  }
              }
              function deserialize(value) {
                if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER)
                  return JSON.parse(value);
                var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH), type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH), blobType;
                if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
                  var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
                  blobType = matcher[1], serializedString = serializedString.substring(matcher[0].length);
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
                var self2 = this, dbInfo = {
                  db: null
                };
                if (options)
                  for (var i in options)
                    dbInfo[i] = typeof options[i] != "string" ? options[i].toString() : options[i];
                var dbInfoPromise = new Promise$12(function(resolve, reject) {
                  try {
                    dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
                  } catch (e) {
                    return reject(e);
                  }
                  dbInfo.db.transaction(function(t2) {
                    createDbTable(t2, dbInfo, function() {
                      self2._dbInfo = dbInfo, resolve();
                    }, function(t3, error) {
                      reject(error);
                    });
                  }, reject);
                });
                return dbInfo.serializer = localforageSerializer, dbInfoPromise;
              }
              function tryExecuteSql(t2, dbInfo, sqlStatement, args, callback, errorCallback) {
                t2.executeSql(sqlStatement, args, callback, function(t3, error) {
                  error.code === error.SYNTAX_ERR ? t3.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [dbInfo.storeName], function(t4, results) {
                    results.rows.length ? errorCallback(t4, error) : createDbTable(t4, dbInfo, function() {
                      t4.executeSql(sqlStatement, args, callback, errorCallback);
                    }, errorCallback);
                  }, errorCallback) : errorCallback(t3, error);
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
                        result && (result = dbInfo.serializer.deserialize(result)), resolve(result);
                      }, function(t3, error) {
                        reject(error);
                      });
                    });
                  }).catch(reject);
                });
                return executeCallback2(promise, callback), promise;
              }
              function iterate$1(iterator, callback) {
                var self2 = this, promise = new Promise$12(function(resolve, reject) {
                  self2.ready().then(function() {
                    var dbInfo = self2._dbInfo;
                    dbInfo.db.transaction(function(t2) {
                      tryExecuteSql(t2, dbInfo, "SELECT * FROM " + dbInfo.storeName, [], function(t3, results) {
                        for (var rows = results.rows, length2 = rows.length, i = 0; i < length2; i++) {
                          var item = rows.item(i), result = item.value;
                          if (result && (result = dbInfo.serializer.deserialize(result)), result = iterator(result, item.key, i + 1), result !== void 0) {
                            resolve(result);
                            return;
                          }
                        }
                        resolve();
                      }, function(t3, error) {
                        reject(error);
                      });
                    });
                  }).catch(reject);
                });
                return executeCallback2(promise, callback), promise;
              }
              function _setItem(key2, value, callback, retriesLeft) {
                var self2 = this;
                key2 = normalizeKey(key2);
                var promise = new Promise$12(function(resolve, reject) {
                  self2.ready().then(function() {
                    value === void 0 && (value = null);
                    var originalValue = value, dbInfo = self2._dbInfo;
                    dbInfo.serializer.serialize(value, function(value2, error) {
                      error ? reject(error) : dbInfo.db.transaction(function(t2) {
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
                    });
                  }).catch(reject);
                });
                return executeCallback2(promise, callback), promise;
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
                  }).catch(reject);
                });
                return executeCallback2(promise, callback), promise;
              }
              function clear$1(callback) {
                var self2 = this, promise = new Promise$12(function(resolve, reject) {
                  self2.ready().then(function() {
                    var dbInfo = self2._dbInfo;
                    dbInfo.db.transaction(function(t2) {
                      tryExecuteSql(t2, dbInfo, "DELETE FROM " + dbInfo.storeName, [], function() {
                        resolve();
                      }, function(t3, error) {
                        reject(error);
                      });
                    });
                  }).catch(reject);
                });
                return executeCallback2(promise, callback), promise;
              }
              function length$1(callback) {
                var self2 = this, promise = new Promise$12(function(resolve, reject) {
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
                  }).catch(reject);
                });
                return executeCallback2(promise, callback), promise;
              }
              function key$1(n, callback) {
                var self2 = this, promise = new Promise$12(function(resolve, reject) {
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
                  }).catch(reject);
                });
                return executeCallback2(promise, callback), promise;
              }
              function keys$1(callback) {
                var self2 = this, promise = new Promise$12(function(resolve, reject) {
                  self2.ready().then(function() {
                    var dbInfo = self2._dbInfo;
                    dbInfo.db.transaction(function(t2) {
                      tryExecuteSql(t2, dbInfo, "SELECT key FROM " + dbInfo.storeName, [], function(t3, results) {
                        for (var keys3 = [], i = 0; i < results.rows.length; i++)
                          keys3.push(results.rows.item(i).key);
                        resolve(keys3);
                      }, function(t3, error) {
                        reject(error);
                      });
                    });
                  }).catch(reject);
                });
                return executeCallback2(promise, callback), promise;
              }
              function getAllStoreNames(db) {
                return new Promise$12(function(resolve, reject) {
                  db.transaction(function(t2) {
                    t2.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function(t3, results) {
                      for (var storeNames = [], i = 0; i < results.rows.length; i++)
                        storeNames.push(results.rows.item(i).name);
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
                options = typeof options != "function" && options || {}, options.name || (options.name = options.name || currentConfig.name, options.storeName = options.storeName || currentConfig.storeName);
                var self2 = this, promise;
                return options.name ? promise = new Promise$12(function(resolve) {
                  var db;
                  options.name === currentConfig.name ? db = self2._dbInfo.db : db = openDatabase(options.name, "", "", 0), options.storeName ? resolve({
                    db,
                    storeNames: [options.storeName]
                  }) : resolve(getAllStoreNames(db));
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
                      for (var operations = [], i = 0, len = operationInfo.storeNames.length; i < len; i++)
                        operations.push(dropTable(operationInfo.storeNames[i]));
                      Promise$12.all(operations).then(function() {
                        resolve();
                      }).catch(function(e) {
                        reject(e);
                      });
                    }, function(sqlError) {
                      reject(sqlError);
                    });
                  });
                }) : promise = Promise$12.reject("Invalid arguments"), executeCallback2(promise, callback), promise;
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
                  return typeof localStorage < "u" && "setItem" in localStorage && // in IE8 typeof localStorage.setItem === 'object'
                  !!localStorage.setItem;
                } catch {
                  return !1;
                }
              }
              function _getKeyPrefix(options, defaultConfig) {
                var keyPrefix = options.name + "/";
                return options.storeName !== defaultConfig.storeName && (keyPrefix += options.storeName + "/"), keyPrefix;
              }
              function checkIfLocalStorageThrows() {
                var localStorageTestKey = "_localforage_support_test";
                try {
                  return localStorage.setItem(localStorageTestKey, !0), localStorage.removeItem(localStorageTestKey), !1;
                } catch {
                  return !0;
                }
              }
              function _isLocalStorageUsable() {
                return !checkIfLocalStorageThrows() || localStorage.length > 0;
              }
              function _initStorage$2(options) {
                var self2 = this, dbInfo = {};
                if (options)
                  for (var i in options)
                    dbInfo[i] = options[i];
                return dbInfo.keyPrefix = _getKeyPrefix(options, self2._defaultConfig), _isLocalStorageUsable() ? (self2._dbInfo = dbInfo, dbInfo.serializer = localforageSerializer, Promise$12.resolve()) : Promise$12.reject();
              }
              function clear$2(callback) {
                var self2 = this, promise = self2.ready().then(function() {
                  for (var keyPrefix = self2._dbInfo.keyPrefix, i = localStorage.length - 1; i >= 0; i--) {
                    var key2 = localStorage.key(i);
                    key2.indexOf(keyPrefix) === 0 && localStorage.removeItem(key2);
                  }
                });
                return executeCallback2(promise, callback), promise;
              }
              function getItem$2(key2, callback) {
                var self2 = this;
                key2 = normalizeKey(key2);
                var promise = self2.ready().then(function() {
                  var dbInfo = self2._dbInfo, result = localStorage.getItem(dbInfo.keyPrefix + key2);
                  return result && (result = dbInfo.serializer.deserialize(result)), result;
                });
                return executeCallback2(promise, callback), promise;
              }
              function iterate$2(iterator, callback) {
                var self2 = this, promise = self2.ready().then(function() {
                  for (var dbInfo = self2._dbInfo, keyPrefix = dbInfo.keyPrefix, keyPrefixLength = keyPrefix.length, length2 = localStorage.length, iterationNumber = 1, i = 0; i < length2; i++) {
                    var key2 = localStorage.key(i);
                    if (key2.indexOf(keyPrefix) === 0) {
                      var value = localStorage.getItem(key2);
                      if (value && (value = dbInfo.serializer.deserialize(value)), value = iterator(value, key2.substring(keyPrefixLength), iterationNumber++), value !== void 0)
                        return value;
                    }
                  }
                });
                return executeCallback2(promise, callback), promise;
              }
              function key$2(n, callback) {
                var self2 = this, promise = self2.ready().then(function() {
                  var dbInfo = self2._dbInfo, result;
                  try {
                    result = localStorage.key(n);
                  } catch {
                    result = null;
                  }
                  return result && (result = result.substring(dbInfo.keyPrefix.length)), result;
                });
                return executeCallback2(promise, callback), promise;
              }
              function keys$2(callback) {
                var self2 = this, promise = self2.ready().then(function() {
                  for (var dbInfo = self2._dbInfo, length2 = localStorage.length, keys3 = [], i = 0; i < length2; i++) {
                    var itemKey = localStorage.key(i);
                    itemKey.indexOf(dbInfo.keyPrefix) === 0 && keys3.push(itemKey.substring(dbInfo.keyPrefix.length));
                  }
                  return keys3;
                });
                return executeCallback2(promise, callback), promise;
              }
              function length$2(callback) {
                var self2 = this, promise = self2.keys().then(function(keys3) {
                  return keys3.length;
                });
                return executeCallback2(promise, callback), promise;
              }
              function removeItem$2(key2, callback) {
                var self2 = this;
                key2 = normalizeKey(key2);
                var promise = self2.ready().then(function() {
                  var dbInfo = self2._dbInfo;
                  localStorage.removeItem(dbInfo.keyPrefix + key2);
                });
                return executeCallback2(promise, callback), promise;
              }
              function setItem$2(key2, value, callback) {
                var self2 = this;
                key2 = normalizeKey(key2);
                var promise = self2.ready().then(function() {
                  value === void 0 && (value = null);
                  var originalValue = value;
                  return new Promise$12(function(resolve, reject) {
                    var dbInfo = self2._dbInfo;
                    dbInfo.serializer.serialize(value, function(value2, error) {
                      if (error)
                        reject(error);
                      else
                        try {
                          localStorage.setItem(dbInfo.keyPrefix + key2, value2), resolve(originalValue);
                        } catch (e) {
                          (e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED") && reject(e), reject(e);
                        }
                    });
                  });
                });
                return executeCallback2(promise, callback), promise;
              }
              function dropInstance$2(options, callback) {
                if (callback = getCallback.apply(this, arguments), options = typeof options != "function" && options || {}, !options.name) {
                  var currentConfig = this.config();
                  options.name = options.name || currentConfig.name, options.storeName = options.storeName || currentConfig.storeName;
                }
                var self2 = this, promise;
                return options.name ? promise = new Promise$12(function(resolve) {
                  options.storeName ? resolve(_getKeyPrefix(options, self2._defaultConfig)) : resolve(options.name + "/");
                }).then(function(keyPrefix) {
                  for (var i = localStorage.length - 1; i >= 0; i--) {
                    var key2 = localStorage.key(i);
                    key2.indexOf(keyPrefix) === 0 && localStorage.removeItem(key2);
                  }
                }) : promise = Promise$12.reject("Invalid arguments"), executeCallback2(promise, callback), promise;
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
              }, sameValue = function(x, y) {
                return x === y || typeof x == "number" && typeof y == "number" && isNaN(x) && isNaN(y);
              }, includes = function(array, searchElement) {
                for (var len = array.length, i = 0; i < len; ) {
                  if (sameValue(array[i], searchElement))
                    return !0;
                  i++;
                }
                return !1;
              }, isArray2 = Array.isArray || function(arg) {
                return Object.prototype.toString.call(arg) === "[object Array]";
              }, DefinedDrivers = {}, DriverSupport = {}, DefaultDrivers = {
                INDEXEDDB: asyncStorage,
                WEBSQL: webSQLStorage,
                LOCALSTORAGE: localStorageWrapper
              }, DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver], OptionalDriverMethods = ["dropInstance"], LibraryMethods = ["clear", "getItem", "iterate", "key", "keys", "length", "removeItem", "setItem"].concat(OptionalDriverMethods), DefaultConfig = {
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
                  if (arg)
                    for (var _key in arg)
                      arg.hasOwnProperty(_key) && (isArray2(arg[_key]) ? arguments[0][_key] = arg[_key].slice() : arguments[0][_key] = arg[_key]);
                }
                return arguments[0];
              }
              var LocalForage = function() {
                function LocalForage2(options) {
                  _classCallCheck(this, LocalForage2);
                  for (var driverTypeKey in DefaultDrivers)
                    if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                      var driver = DefaultDrivers[driverTypeKey], driverName = driver._driver;
                      this[driverTypeKey] = driverName, DefinedDrivers[driverName] || this.defineDriver(driver);
                    }
                  this._defaultConfig = extend({}, DefaultConfig), this._config = extend({}, this._defaultConfig, options), this._driverSet = null, this._initDriver = null, this._ready = !1, this._dbInfo = null, this._wrapLibraryMethodsWithReady(), this.setDriver(this._config.driver).catch(function() {
                  });
                }
                return LocalForage2.prototype.config = function(options) {
                  if ((typeof options > "u" ? "undefined" : _typeof(options)) === "object") {
                    if (this._ready)
                      return new Error("Can't call config() after localforage has been used.");
                    for (var i in options) {
                      if (i === "storeName" && (options[i] = options[i].replace(/\W/g, "_")), i === "version" && typeof options[i] != "number")
                        return new Error("Database version must be a number.");
                      this._config[i] = options[i];
                    }
                    return "driver" in options && options.driver ? this.setDriver(this._config.driver) : !0;
                  } else return typeof options == "string" ? this._config[options] : this._config;
                }, LocalForage2.prototype.defineDriver = function(driverObject, callback, errorCallback) {
                  var promise = new Promise$12(function(resolve, reject) {
                    try {
                      var driverName = driverObject._driver, complianceError = new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");
                      if (!driverObject._driver) {
                        reject(complianceError);
                        return;
                      }
                      for (var driverMethods = LibraryMethods.concat("_initStorage"), i = 0, len = driverMethods.length; i < len; i++) {
                        var driverMethodName = driverMethods[i], isRequired = !includes(OptionalDriverMethods, driverMethodName);
                        if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] != "function") {
                          reject(complianceError);
                          return;
                        }
                      }
                      var configureMissingMethods = function() {
                        for (var methodNotImplementedFactory = function(methodName) {
                          return function() {
                            var error = new Error("Method " + methodName + " is not implemented by the current driver"), promise2 = Promise$12.reject(error);
                            return executeCallback2(promise2, arguments[arguments.length - 1]), promise2;
                          };
                        }, _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
                          var optionalDriverMethod = OptionalDriverMethods[_i];
                          driverObject[optionalDriverMethod] || (driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod));
                        }
                      };
                      configureMissingMethods();
                      var setDriverSupport = function(support) {
                        DefinedDrivers[driverName] && console.info("Redefining LocalForage driver: " + driverName), DefinedDrivers[driverName] = driverObject, DriverSupport[driverName] = support, resolve();
                      };
                      "_support" in driverObject ? driverObject._support && typeof driverObject._support == "function" ? driverObject._support().then(setDriverSupport, reject) : setDriverSupport(!!driverObject._support) : setDriverSupport(!0);
                    } catch (e) {
                      reject(e);
                    }
                  });
                  return executeTwoCallbacks(promise, callback, errorCallback), promise;
                }, LocalForage2.prototype.driver = function() {
                  return this._driver || null;
                }, LocalForage2.prototype.getDriver = function(driverName, callback, errorCallback) {
                  var getDriverPromise = DefinedDrivers[driverName] ? Promise$12.resolve(DefinedDrivers[driverName]) : Promise$12.reject(new Error("Driver not found."));
                  return executeTwoCallbacks(getDriverPromise, callback, errorCallback), getDriverPromise;
                }, LocalForage2.prototype.getSerializer = function(callback) {
                  var serializerPromise = Promise$12.resolve(localforageSerializer);
                  return executeTwoCallbacks(serializerPromise, callback), serializerPromise;
                }, LocalForage2.prototype.ready = function(callback) {
                  var self2 = this, promise = self2._driverSet.then(function() {
                    return self2._ready === null && (self2._ready = self2._initDriver()), self2._ready;
                  });
                  return executeTwoCallbacks(promise, callback, callback), promise;
                }, LocalForage2.prototype.setDriver = function(drivers, callback, errorCallback) {
                  var self2 = this;
                  isArray2(drivers) || (drivers = [drivers]);
                  var supportedDrivers = this._getSupportedDrivers(drivers);
                  function setDriverToConfig() {
                    self2._config.driver = self2.driver();
                  }
                  function extendSelfWithDriver(driver) {
                    return self2._extend(driver), setDriverToConfig(), self2._ready = self2._initStorage(self2._config), self2._ready;
                  }
                  function initDriver(supportedDrivers2) {
                    return function() {
                      var currentDriverIndex = 0;
                      function driverPromiseLoop() {
                        for (; currentDriverIndex < supportedDrivers2.length; ) {
                          var driverName = supportedDrivers2[currentDriverIndex];
                          return currentDriverIndex++, self2._dbInfo = null, self2._ready = null, self2.getDriver(driverName).then(extendSelfWithDriver).catch(driverPromiseLoop);
                        }
                        setDriverToConfig();
                        var error = new Error("No available storage method found.");
                        return self2._driverSet = Promise$12.reject(error), self2._driverSet;
                      }
                      return driverPromiseLoop();
                    };
                  }
                  var oldDriverSetDone = this._driverSet !== null ? this._driverSet.catch(function() {
                    return Promise$12.resolve();
                  }) : Promise$12.resolve();
                  return this._driverSet = oldDriverSetDone.then(function() {
                    var driverName = supportedDrivers[0];
                    return self2._dbInfo = null, self2._ready = null, self2.getDriver(driverName).then(function(driver) {
                      self2._driver = driver._driver, setDriverToConfig(), self2._wrapLibraryMethodsWithReady(), self2._initDriver = initDriver(supportedDrivers);
                    });
                  }).catch(function() {
                    setDriverToConfig();
                    var error = new Error("No available storage method found.");
                    return self2._driverSet = Promise$12.reject(error), self2._driverSet;
                  }), executeTwoCallbacks(this._driverSet, callback, errorCallback), this._driverSet;
                }, LocalForage2.prototype.supports = function(driverName) {
                  return !!DriverSupport[driverName];
                }, LocalForage2.prototype._extend = function(libraryMethodsAndProperties) {
                  extend(this, libraryMethodsAndProperties);
                }, LocalForage2.prototype._getSupportedDrivers = function(drivers) {
                  for (var supportedDrivers = [], i = 0, len = drivers.length; i < len; i++) {
                    var driverName = drivers[i];
                    this.supports(driverName) && supportedDrivers.push(driverName);
                  }
                  return supportedDrivers;
                }, LocalForage2.prototype._wrapLibraryMethodsWithReady = function() {
                  for (var i = 0, len = LibraryMethods.length; i < len; i++)
                    callWhenReady(this, LibraryMethods[i]);
                }, LocalForage2.prototype.createInstance = function(options) {
                  return new LocalForage2(options);
                }, LocalForage2;
              }(), localforage_js = new LocalForage();
              module3.exports = localforage_js;
            }, { 3: 3 }] }, {}, [4])(4);
          });
        }(localforage$1)), localforage$1.exports;
      }
      var localforageExports = requireLocalforage();
      const localforage = /* @__PURE__ */ getDefaultExportFromCjs(localforageExports);
      function getSerializerPromise(localForageInstance) {
        return getSerializerPromise.result ? getSerializerPromise.result : !localForageInstance || typeof localForageInstance.getSerializer != "function" ? Promise.reject(new Error("localforage.getSerializer() was not available! localforage v1.4+ is required!")) : (getSerializerPromise.result = localForageInstance.getSerializer(), getSerializerPromise.result);
      }
      function executeCallback(promise, callback) {
        callback && promise.then(function(result) {
          callback(null, result);
        }, function(error) {
          callback(error);
        });
      }
      function forEachItem(items, keyFn, valueFn, loopFn) {
        function ensurePropGetterMethod(propFn, defaultPropName) {
          var propName = propFn || defaultPropName;
          return (!propFn || typeof propFn != "function") && typeof propName == "string" && (propFn = function(item2) {
            return item2[propName];
          }), propFn;
        }
        var result = [];
        if (Object.prototype.toString.call(items) === "[object Array]") {
          keyFn = ensurePropGetterMethod(keyFn, "key"), valueFn = ensurePropGetterMethod(valueFn, "value");
          for (var i = 0, len = items.length; i < len; i++) {
            var item = items[i];
            result.push(loopFn(keyFn(item), valueFn(item)));
          }
        } else
          for (var prop in items)
            items.hasOwnProperty(prop) && result.push(loopFn(prop, items[prop]));
        return result;
      }
      function setItemsIndexedDB(items, keyFn, valueFn, callback) {
        var localforageInstance = this, promise = localforageInstance.ready().then(function() {
          return new Promise(function(resolve, reject) {
            var dbInfo = localforageInstance._dbInfo, transaction = dbInfo.db.transaction(dbInfo.storeName, "readwrite"), store = transaction.objectStore(dbInfo.storeName), lastError;
            transaction.oncomplete = function() {
              resolve(items);
            }, transaction.onabort = transaction.onerror = function(event) {
              reject(lastError || event.target);
            };
            function requestOnError(evt) {
              var request = evt.target || this;
              lastError = request.error || request.transaction.error, reject(lastError);
            }
            forEachItem(items, keyFn, valueFn, function(key, value) {
              value === null && (value = void 0);
              var request = store.put(value, key);
              request.onerror = requestOnError;
            });
          });
        });
        return executeCallback(promise, callback), promise;
      }
      function setItemsWebsql(items, keyFn, valueFn, callback) {
        var localforageInstance = this, promise = new Promise(function(resolve, reject) {
          localforageInstance.ready().then(function() {
            return getSerializerPromise(localforageInstance);
          }).then(function(serializer) {
            var dbInfo = localforageInstance._dbInfo;
            dbInfo.db.transaction(
              function(t2) {
                var query = "INSERT OR REPLACE INTO " + dbInfo.storeName + " (key, value) VALUES (?, ?)", itemPromises = forEachItem(items, keyFn, valueFn, function(key, value) {
                  return new Promise(function(resolve2, reject2) {
                    serializer.serialize(value, function(value2, error) {
                      error ? reject2(error) : t2.executeSql(query, [key, value2], function() {
                        resolve2();
                      }, function(t3, error2) {
                        reject2(error2);
                      });
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
        return executeCallback(promise, callback), promise;
      }
      function setItemsGeneric(items, keyFn, valueFn, callback) {
        var localforageInstance = this, itemPromises = forEachItem(items, keyFn, valueFn, function(key, value) {
          return localforageInstance.setItem(key, value);
        }), promise = Promise.all(itemPromises);
        return executeCallback(promise, callback), promise;
      }
      function localforageSetItems(items, keyFn, valueFn, callback) {
        var localforageInstance = this, currentDriver = localforageInstance.driver();
        return currentDriver === localforageInstance.INDEXEDDB ? setItemsIndexedDB.call(localforageInstance, items, keyFn, valueFn, callback) : currentDriver === localforageInstance.WEBSQL ? setItemsWebsql.call(localforageInstance, items, keyFn, valueFn, callback) : setItemsGeneric.call(localforageInstance, items, keyFn, valueFn, callback);
      }
      function extendPrototype(localforage$$1) {
        var localforagePrototype = Object.getPrototypeOf(localforage$$1);
        localforagePrototype && (localforagePrototype.setItems = localforageSetItems, localforagePrototype.setItems.indexedDB = function() {
          return setItemsIndexedDB.apply(this, arguments);
        }, localforagePrototype.setItems.websql = function() {
          return setItemsWebsql.apply(this, arguments);
        }, localforagePrototype.setItems.generic = function() {
          return setItemsGeneric.apply(this, arguments);
        });
      }
      extendPrototype(localforage);
      var md5$1 = { exports: {} }, crypt = { exports: {} }, hasRequiredCrypt;
      function requireCrypt() {
        return hasRequiredCrypt || (hasRequiredCrypt = 1, function() {
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
              if (n.constructor == Number)
                return crypt$1.rotl(n, 8) & 16711935 | crypt$1.rotl(n, 24) & 4278255360;
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
              for (var hex = [], i = 0; i < bytes.length; i++)
                hex.push((bytes[i] >>> 4).toString(16)), hex.push((bytes[i] & 15).toString(16));
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
              for (var base64 = [], i = 0; i < bytes.length; i += 3)
                for (var triplet = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2], j = 0; j < 4; j++)
                  i * 8 + j * 6 <= bytes.length * 8 ? base64.push(base64map.charAt(triplet >>> 6 * (3 - j) & 63)) : base64.push("=");
              return base64.join("");
            },
            // Convert a base-64 string to a byte array
            base64ToBytes: function(base64) {
              base64 = base64.replace(/[^A-Z0-9+\/]/ig, "");
              for (var bytes = [], i = 0, imod4 = 0; i < base64.length; imod4 = ++i % 4)
                imod4 != 0 && bytes.push((base64map.indexOf(base64.charAt(i - 1)) & Math.pow(2, -2 * imod4 + 8) - 1) << imod4 * 2 | base64map.indexOf(base64.charAt(i)) >>> 6 - imod4 * 2);
              return bytes;
            }
          };
          crypt.exports = crypt$1;
        }()), crypt.exports;
      }
      var charenc_1, hasRequiredCharenc;
      function requireCharenc() {
        if (hasRequiredCharenc) return charenc_1;
        hasRequiredCharenc = 1;
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
        return charenc_1 = charenc, charenc_1;
      }
      var isBuffer_1, hasRequiredIsBuffer;
      function requireIsBuffer() {
        if (hasRequiredIsBuffer) return isBuffer_1;
        hasRequiredIsBuffer = 1, isBuffer_1 = function(obj) {
          return obj != null && (isBuffer2(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
        };
        function isBuffer2(obj) {
          return !!obj.constructor && typeof obj.constructor.isBuffer == "function" && obj.constructor.isBuffer(obj);
        }
        function isSlowBuffer(obj) {
          return typeof obj.readFloatLE == "function" && typeof obj.slice == "function" && isBuffer2(obj.slice(0, 0));
        }
        return isBuffer_1;
      }
      var hasRequiredMd5;
      function requireMd5() {
        return hasRequiredMd5 || (hasRequiredMd5 = 1, function() {
          var crypt2 = requireCrypt(), utf8 = requireCharenc().utf8, isBuffer2 = requireIsBuffer(), bin = requireCharenc().bin, md52 = function(message, options) {
            message.constructor == String ? options && options.encoding === "binary" ? message = bin.stringToBytes(message) : message = utf8.stringToBytes(message) : isBuffer2(message) ? message = Array.prototype.slice.call(message, 0) : !Array.isArray(message) && message.constructor !== Uint8Array && (message = message.toString());
            for (var m = crypt2.bytesToWords(message), l = message.length * 8, a = 1732584193, b = -271733879, c = -1732584194, d = 271733878, i = 0; i < m.length; i++)
              m[i] = (m[i] << 8 | m[i] >>> 24) & 16711935 | (m[i] << 24 | m[i] >>> 8) & 4278255360;
            m[l >>> 5] |= 128 << l % 32, m[(l + 64 >>> 9 << 4) + 14] = l;
            for (var FF = md52._ff, GG = md52._gg, HH = md52._hh, II = md52._ii, i = 0; i < m.length; i += 16) {
              var aa = a, bb = b, cc = c, dd = d;
              a = FF(a, b, c, d, m[i + 0], 7, -680876936), d = FF(d, a, b, c, m[i + 1], 12, -389564586), c = FF(c, d, a, b, m[i + 2], 17, 606105819), b = FF(b, c, d, a, m[i + 3], 22, -1044525330), a = FF(a, b, c, d, m[i + 4], 7, -176418897), d = FF(d, a, b, c, m[i + 5], 12, 1200080426), c = FF(c, d, a, b, m[i + 6], 17, -1473231341), b = FF(b, c, d, a, m[i + 7], 22, -45705983), a = FF(a, b, c, d, m[i + 8], 7, 1770035416), d = FF(d, a, b, c, m[i + 9], 12, -1958414417), c = FF(c, d, a, b, m[i + 10], 17, -42063), b = FF(b, c, d, a, m[i + 11], 22, -1990404162), a = FF(a, b, c, d, m[i + 12], 7, 1804603682), d = FF(d, a, b, c, m[i + 13], 12, -40341101), c = FF(c, d, a, b, m[i + 14], 17, -1502002290), b = FF(b, c, d, a, m[i + 15], 22, 1236535329), a = GG(a, b, c, d, m[i + 1], 5, -165796510), d = GG(d, a, b, c, m[i + 6], 9, -1069501632), c = GG(c, d, a, b, m[i + 11], 14, 643717713), b = GG(b, c, d, a, m[i + 0], 20, -373897302), a = GG(a, b, c, d, m[i + 5], 5, -701558691), d = GG(d, a, b, c, m[i + 10], 9, 38016083), c = GG(c, d, a, b, m[i + 15], 14, -660478335), b = GG(b, c, d, a, m[i + 4], 20, -405537848), a = GG(a, b, c, d, m[i + 9], 5, 568446438), d = GG(d, a, b, c, m[i + 14], 9, -1019803690), c = GG(c, d, a, b, m[i + 3], 14, -187363961), b = GG(b, c, d, a, m[i + 8], 20, 1163531501), a = GG(a, b, c, d, m[i + 13], 5, -1444681467), d = GG(d, a, b, c, m[i + 2], 9, -51403784), c = GG(c, d, a, b, m[i + 7], 14, 1735328473), b = GG(b, c, d, a, m[i + 12], 20, -1926607734), a = HH(a, b, c, d, m[i + 5], 4, -378558), d = HH(d, a, b, c, m[i + 8], 11, -2022574463), c = HH(c, d, a, b, m[i + 11], 16, 1839030562), b = HH(b, c, d, a, m[i + 14], 23, -35309556), a = HH(a, b, c, d, m[i + 1], 4, -1530992060), d = HH(d, a, b, c, m[i + 4], 11, 1272893353), c = HH(c, d, a, b, m[i + 7], 16, -155497632), b = HH(b, c, d, a, m[i + 10], 23, -1094730640), a = HH(a, b, c, d, m[i + 13], 4, 681279174), d = HH(d, a, b, c, m[i + 0], 11, -358537222), c = HH(c, d, a, b, m[i + 3], 16, -722521979), b = HH(b, c, d, a, m[i + 6], 23, 76029189), a = HH(a, b, c, d, m[i + 9], 4, -640364487), d = HH(d, a, b, c, m[i + 12], 11, -421815835), c = HH(c, d, a, b, m[i + 15], 16, 530742520), b = HH(b, c, d, a, m[i + 2], 23, -995338651), a = II(a, b, c, d, m[i + 0], 6, -198630844), d = II(d, a, b, c, m[i + 7], 10, 1126891415), c = II(c, d, a, b, m[i + 14], 15, -1416354905), b = II(b, c, d, a, m[i + 5], 21, -57434055), a = II(a, b, c, d, m[i + 12], 6, 1700485571), d = II(d, a, b, c, m[i + 3], 10, -1894986606), c = II(c, d, a, b, m[i + 10], 15, -1051523), b = II(b, c, d, a, m[i + 1], 21, -2054922799), a = II(a, b, c, d, m[i + 8], 6, 1873313359), d = II(d, a, b, c, m[i + 15], 10, -30611744), c = II(c, d, a, b, m[i + 6], 15, -1560198380), b = II(b, c, d, a, m[i + 13], 21, 1309151649), a = II(a, b, c, d, m[i + 4], 6, -145523070), d = II(d, a, b, c, m[i + 11], 10, -1120210379), c = II(c, d, a, b, m[i + 2], 15, 718787259), b = II(b, c, d, a, m[i + 9], 21, -343485551), a = a + aa >>> 0, b = b + bb >>> 0, c = c + cc >>> 0, d = d + dd >>> 0;
            }
            return crypt2.endian([a, b, c, d]);
          };
          md52._ff = function(a, b, c, d, x, s, t2) {
            var n = a + (b & c | ~b & d) + (x >>> 0) + t2;
            return (n << s | n >>> 32 - s) + b;
          }, md52._gg = function(a, b, c, d, x, s, t2) {
            var n = a + (b & d | c & ~d) + (x >>> 0) + t2;
            return (n << s | n >>> 32 - s) + b;
          }, md52._hh = function(a, b, c, d, x, s, t2) {
            var n = a + (b ^ c ^ d) + (x >>> 0) + t2;
            return (n << s | n >>> 32 - s) + b;
          }, md52._ii = function(a, b, c, d, x, s, t2) {
            var n = a + (c ^ (b | ~d)) + (x >>> 0) + t2;
            return (n << s | n >>> 32 - s) + b;
          }, md52._blocksize = 16, md52._digestsize = 16, md5$1.exports = function(message, options) {
            if (message == null)
              throw new Error("Illegal argument " + message);
            var digestbytes = crypt2.wordsToBytes(md52(message, options));
            return options && options.asBytes ? digestbytes : options && options.asString ? bin.bytesToString(digestbytes) : crypt2.bytesToHex(digestbytes);
          };
        }()), md5$1.exports;
      }
      var md5Exports = requireMd5();
      const md5 = /* @__PURE__ */ getDefaultExportFromCjs(md5Exports), dateTimeFormatter = new Intl.DateTimeFormat(void 0, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: !1
      }), numberFormatter = new Intl.NumberFormat(), removeIllegalFilenameChars = (name) => name.replace(/[/\\:*?"<>|]/g, "");
      const proxyMarker = Symbol("Comlink.proxy"), createEndpoint = Symbol("Comlink.endpoint"), releaseProxy = Symbol("Comlink.releaseProxy"), finalizer = Symbol("Comlink.finalizer"), throwMarker = Symbol("Comlink.thrown"), isObject$2 = (val) => typeof val == "object" && val !== null || typeof val == "function", proxyTransferHandler = {
        canHandle: (val) => isObject$2(val) && val[proxyMarker],
        serialize(obj) {
          const { port1, port2 } = new MessageChannel();
          return expose(obj, port1), [port2, [port2]];
        },
        deserialize(port) {
          return port.start(), wrap(port);
        }
      }, throwTransferHandler = {
        canHandle: (value) => isObject$2(value) && throwMarker in value,
        serialize({ value }) {
          let serialized;
          return value instanceof Error ? serialized = {
            isError: !0,
            value: {
              message: value.message,
              name: value.name,
              stack: value.stack
            }
          } : serialized = { isError: !1, value }, [serialized, []];
        },
        deserialize(serialized) {
          throw serialized.isError ? Object.assign(new Error(serialized.value.message), serialized.value) : serialized.value;
        }
      }, transferHandlers = /* @__PURE__ */ new Map([
        ["proxy", proxyTransferHandler],
        ["throw", throwTransferHandler]
      ]);
      function isAllowedOrigin(allowedOrigins, origin) {
        for (const allowedOrigin of allowedOrigins)
          if (origin === allowedOrigin || allowedOrigin === "*" || allowedOrigin instanceof RegExp && allowedOrigin.test(origin))
            return !0;
        return !1;
      }
      function expose(obj, ep = globalThis, allowedOrigins = ["*"]) {
        ep.addEventListener("message", function callback(ev) {
          if (!ev || !ev.data)
            return;
          if (!isAllowedOrigin(allowedOrigins, ev.origin)) {
            console.warn(`Invalid origin '${ev.origin}' for comlink proxy`);
            return;
          }
          const { id, type, path } = Object.assign({ path: [] }, ev.data), argumentList = (ev.data.argumentList || []).map(fromWireValue);
          let returnValue;
          try {
            const parent = path.slice(0, -1).reduce((obj2, prop) => obj2[prop], obj), rawValue = path.reduce((obj2, prop) => obj2[prop], obj);
            switch (type) {
              case "GET":
                returnValue = rawValue;
                break;
              case "SET":
                parent[path.slice(-1)[0]] = fromWireValue(ev.data.value), returnValue = !0;
                break;
              case "APPLY":
                returnValue = rawValue.apply(parent, argumentList);
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
                  expose(obj, port2), returnValue = transfer(port1, [port1]);
                }
                break;
              case "RELEASE":
                returnValue = void 0;
                break;
              default:
                return;
            }
          } catch (value) {
            returnValue = { value, [throwMarker]: 0 };
          }
          Promise.resolve(returnValue).catch((value) => ({ value, [throwMarker]: 0 })).then((returnValue2) => {
            const [wireValue, transferables] = toWireValue(returnValue2);
            ep.postMessage(Object.assign(Object.assign({}, wireValue), { id }), transferables), type === "RELEASE" && (ep.removeEventListener("message", callback), closeEndPoint(ep), finalizer in obj && typeof obj[finalizer] == "function" && obj[finalizer]());
          }).catch((error) => {
            const [wireValue, transferables] = toWireValue({
              value: new TypeError("Unserializable return value"),
              [throwMarker]: 0
            });
            ep.postMessage(Object.assign(Object.assign({}, wireValue), { id }), transferables);
          });
        }), ep.start && ep.start();
      }
      function isMessagePort(endpoint) {
        return endpoint.constructor.name === "MessagePort";
      }
      function closeEndPoint(endpoint) {
        isMessagePort(endpoint) && endpoint.close();
      }
      function wrap(ep, target) {
        const pendingListeners = /* @__PURE__ */ new Map();
        return ep.addEventListener("message", function(ev) {
          const { data } = ev;
          if (!data || !data.id)
            return;
          const resolver = pendingListeners.get(data.id);
          if (resolver)
            try {
              resolver(data);
            } finally {
              pendingListeners.delete(data.id);
            }
        }), createProxy(ep, pendingListeners, [], target);
      }
      function throwIfProxyReleased(isReleased) {
        if (isReleased)
          throw new Error("Proxy has been released and is not useable");
      }
      function releaseEndpoint(ep) {
        return requestResponseMessage(ep, /* @__PURE__ */ new Map(), {
          type: "RELEASE"
        }).then(() => {
          closeEndPoint(ep);
        });
      }
      const proxyCounter = /* @__PURE__ */ new WeakMap(), proxyFinalizers = "FinalizationRegistry" in globalThis && new FinalizationRegistry((ep) => {
        const newCount = (proxyCounter.get(ep) || 0) - 1;
        proxyCounter.set(ep, newCount), newCount === 0 && releaseEndpoint(ep);
      });
      function registerProxy(proxy2, ep) {
        const newCount = (proxyCounter.get(ep) || 0) + 1;
        proxyCounter.set(ep, newCount), proxyFinalizers && proxyFinalizers.register(proxy2, ep, proxy2);
      }
      function unregisterProxy(proxy2) {
        proxyFinalizers && proxyFinalizers.unregister(proxy2);
      }
      function createProxy(ep, pendingListeners, path = [], target = function() {
      }) {
        let isProxyReleased = !1;
        const proxy2 = new Proxy(target, {
          get(_target, prop) {
            if (throwIfProxyReleased(isProxyReleased), prop === releaseProxy)
              return () => {
                unregisterProxy(proxy2), releaseEndpoint(ep), pendingListeners.clear(), isProxyReleased = !0;
              };
            if (prop === "then") {
              if (path.length === 0)
                return { then: () => proxy2 };
              const r = requestResponseMessage(ep, pendingListeners, {
                type: "GET",
                path: path.map((p) => p.toString())
              }).then(fromWireValue);
              return r.then.bind(r);
            }
            return createProxy(ep, pendingListeners, [...path, prop]);
          },
          set(_target, prop, rawValue) {
            throwIfProxyReleased(isProxyReleased);
            const [value, transferables] = toWireValue(rawValue);
            return requestResponseMessage(ep, pendingListeners, {
              type: "SET",
              path: [...path, prop].map((p) => p.toString()),
              value
            }, transferables).then(fromWireValue);
          },
          apply(_target, _thisArg, rawArgumentList) {
            throwIfProxyReleased(isProxyReleased);
            const last2 = path[path.length - 1];
            if (last2 === createEndpoint)
              return requestResponseMessage(ep, pendingListeners, {
                type: "ENDPOINT"
              }).then(fromWireValue);
            if (last2 === "bind")
              return createProxy(ep, pendingListeners, path.slice(0, -1));
            const [argumentList, transferables] = processArguments(rawArgumentList);
            return requestResponseMessage(ep, pendingListeners, {
              type: "APPLY",
              path: path.map((p) => p.toString()),
              argumentList
            }, transferables).then(fromWireValue);
          },
          construct(_target, rawArgumentList) {
            throwIfProxyReleased(isProxyReleased);
            const [argumentList, transferables] = processArguments(rawArgumentList);
            return requestResponseMessage(ep, pendingListeners, {
              type: "CONSTRUCT",
              path: path.map((p) => p.toString()),
              argumentList
            }, transferables).then(fromWireValue);
          }
        });
        return registerProxy(proxy2, ep), proxy2;
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
        return transferCache.set(obj, transfers), obj;
      }
      function proxy(obj) {
        return Object.assign(obj, { [proxyMarker]: !0 });
      }
      function toWireValue(value) {
        for (const [name, handler] of transferHandlers)
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
      function requestResponseMessage(ep, pendingListeners, msg, transfers) {
        return new Promise((resolve) => {
          const id = generateUUID();
          pendingListeners.set(id, resolve), ep.start && ep.start(), ep.postMessage(Object.assign({ id }, msg), transfers);
        });
      }
      function generateUUID() {
        return new Array(4).fill(0).map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)).join("-");
      }
      const jsContent$1 = `var __defProp=Object.defineProperty,__defNormalProp=(f3,m3,p3)=>m3 in f3?__defProp(f3,m3,{enumerable:!0,configurable:!0,writable:!0,value:p3}):f3[m3]=p3,__publicField=(f3,m3,p3)=>__defNormalProp(f3,typeof m3!="symbol"?m3+"":m3,p3);(function(){"use strict";var f3=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function m3(L){return L&&L.__esModule&&Object.prototype.hasOwnProperty.call(L,"default")?L.default:L}function p3(L){throw new Error('Could not dynamically require "'+L+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var D3={exports:{}},L3;function V3(){return L3||(L3=1,function(L,H){(function(w){L.exports=w()})(function(){return function w(x,g,u){function d(p,f){if(!g[p]){if(!x[p]){var a=typeof p3=="function"&&p3;if(!f&&a)return a(p,!0);if(r)return r(p,!0);var m=new Error("Cannot find module '"+p+"'");throw m.code="MODULE_NOT_FOUND",m}var o=g[p]={exports:{}};x[p][0].call(o.exports,function(l){var n=x[p][1][l];return d(n||l)},o,o.exports,w,x,g,u)}return g[p].exports}for(var r=typeof p3=="function"&&p3,s=0;s<u.length;s++)d(u[s]);return d}({1:[function(w,x,g){var u=w("./utils"),d=w("./support"),r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";g.encode=function(s){for(var p,f,a,m,o,l,n,c=[],i=0,v=s.length,B=v,h=u.getTypeOf(s)!=="string";i<s.length;)B=v-i,a=h?(p=s[i++],f=i<v?s[i++]:0,i<v?s[i++]:0):(p=s.charCodeAt(i++),f=i<v?s.charCodeAt(i++):0,i<v?s.charCodeAt(i++):0),m=p>>2,o=(3&p)<<4|f>>4,l=1<B?(15&f)<<2|a>>6:64,n=2<B?63&a:64,c.push(r.charAt(m)+r.charAt(o)+r.charAt(l)+r.charAt(n));return c.join("")},g.decode=function(s){var p,f,a,m,o,l,n=0,c=0,i="data:";if(s.substr(0,i.length)===i)throw new Error("Invalid base64 input, it looks like a data url.");var v,B=3*(s=s.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(s.charAt(s.length-1)===r.charAt(64)&&B--,s.charAt(s.length-2)===r.charAt(64)&&B--,B%1!=0)throw new Error("Invalid base64 input, bad content length.");for(v=d.uint8array?new Uint8Array(0|B):new Array(0|B);n<s.length;)p=r.indexOf(s.charAt(n++))<<2|(m=r.indexOf(s.charAt(n++)))>>4,f=(15&m)<<4|(o=r.indexOf(s.charAt(n++)))>>2,a=(3&o)<<6|(l=r.indexOf(s.charAt(n++))),v[c++]=p,o!==64&&(v[c++]=f),l!==64&&(v[c++]=a);return v}},{"./support":30,"./utils":32}],2:[function(w,x,g){var u=w("./external"),d=w("./stream/DataWorker"),r=w("./stream/Crc32Probe"),s=w("./stream/DataLengthProbe");function p(f,a,m,o,l){this.compressedSize=f,this.uncompressedSize=a,this.crc32=m,this.compression=o,this.compressedContent=l}p.prototype={getContentWorker:function(){var f=new d(u.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new s("data_length")),a=this;return f.on("end",function(){if(this.streamInfo.data_length!==a.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),f},getCompressedWorker:function(){return new d(u.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},p.createWorkerFrom=function(f,a,m){return f.pipe(new r).pipe(new s("uncompressedSize")).pipe(a.compressWorker(m)).pipe(new s("compressedSize")).withStreamInfo("compression",a)},x.exports=p},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(w,x,g){var u=w("./stream/GenericWorker");g.STORE={magic:"\\0\\0",compressWorker:function(){return new u("STORE compression")},uncompressWorker:function(){return new u("STORE decompression")}},g.DEFLATE=w("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(w,x,g){var u=w("./utils"),d=function(){for(var r,s=[],p=0;p<256;p++){r=p;for(var f=0;f<8;f++)r=1&r?3988292384^r>>>1:r>>>1;s[p]=r}return s}();x.exports=function(r,s){return r!==void 0&&r.length?u.getTypeOf(r)!=="string"?function(p,f,a,m){var o=d,l=m+a;p^=-1;for(var n=m;n<l;n++)p=p>>>8^o[255&(p^f[n])];return-1^p}(0|s,r,r.length,0):function(p,f,a,m){var o=d,l=m+a;p^=-1;for(var n=m;n<l;n++)p=p>>>8^o[255&(p^f.charCodeAt(n))];return-1^p}(0|s,r,r.length,0):0}},{"./utils":32}],5:[function(w,x,g){g.base64=!1,g.binary=!1,g.dir=!1,g.createFolders=!0,g.date=null,g.compression=null,g.compressionOptions=null,g.comment=null,g.unixPermissions=null,g.dosPermissions=null},{}],6:[function(w,x,g){var u=null;u=typeof Promise<"u"?Promise:w("lie"),x.exports={Promise:u}},{lie:37}],7:[function(w,x,g){var u=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Uint32Array<"u",d=w("pako"),r=w("./utils"),s=w("./stream/GenericWorker"),p=u?"uint8array":"array";function f(a,m){s.call(this,"FlateWorker/"+a),this._pako=null,this._pakoAction=a,this._pakoOptions=m,this.meta={}}g.magic="\\b\\0",r.inherits(f,s),f.prototype.processChunk=function(a){this.meta=a.meta,this._pako===null&&this._createPako(),this._pako.push(r.transformTo(p,a.data),!1)},f.prototype.flush=function(){s.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},f.prototype.cleanUp=function(){s.prototype.cleanUp.call(this),this._pako=null},f.prototype._createPako=function(){this._pako=new d[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var a=this;this._pako.onData=function(m){a.push({data:m,meta:a.meta})}},g.compressWorker=function(a){return new f("Deflate",a)},g.uncompressWorker=function(){return new f("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(w,x,g){function u(o,l){var n,c="";for(n=0;n<l;n++)c+=String.fromCharCode(255&o),o>>>=8;return c}function d(o,l,n,c,i,v){var B,h,k=o.file,P=o.compression,y=v!==p.utf8encode,z=r.transformTo("string",v(k.name)),S=r.transformTo("string",p.utf8encode(k.name)),N=k.comment,U=r.transformTo("string",v(N)),C=r.transformTo("string",p.utf8encode(N)),I=S.length!==k.name.length,t=C.length!==N.length,M="",J="",R="",$=k.dir,j=k.date,V={crc32:0,compressedSize:0,uncompressedSize:0};l&&!n||(V.crc32=o.crc32,V.compressedSize=o.compressedSize,V.uncompressedSize=o.uncompressedSize);var A=0;l&&(A|=8),y||!I&&!t||(A|=2048);var O=0,Q=0;$&&(O|=16),i==="UNIX"?(Q=798,O|=function(K,o3){var n3=K;return K||(n3=o3?16893:33204),(65535&n3)<<16}(k.unixPermissions,$)):(Q=20,O|=function(K){return 63&(K||0)}(k.dosPermissions)),B=j.getUTCHours(),B<<=6,B|=j.getUTCMinutes(),B<<=5,B|=j.getUTCSeconds()/2,h=j.getUTCFullYear()-1980,h<<=4,h|=j.getUTCMonth()+1,h<<=5,h|=j.getUTCDate(),I&&(J=u(1,1)+u(f(z),4)+S,M+="up"+u(J.length,2)+J),t&&(R=u(1,1)+u(f(U),4)+C,M+="uc"+u(R.length,2)+R);var Z="";return Z+=\`
\\0\`,Z+=u(A,2),Z+=P.magic,Z+=u(B,2),Z+=u(h,2),Z+=u(V.crc32,4),Z+=u(V.compressedSize,4),Z+=u(V.uncompressedSize,4),Z+=u(z.length,2),Z+=u(M.length,2),{fileRecord:a.LOCAL_FILE_HEADER+Z+z+M,dirRecord:a.CENTRAL_FILE_HEADER+u(Q,2)+Z+u(U.length,2)+"\\0\\0\\0\\0"+u(O,4)+u(c,4)+z+M+U}}var r=w("../utils"),s=w("../stream/GenericWorker"),p=w("../utf8"),f=w("../crc32"),a=w("../signature");function m(o,l,n,c){s.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=l,this.zipPlatform=n,this.encodeFileName=c,this.streamFiles=o,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}r.inherits(m,s),m.prototype.push=function(o){var l=o.meta.percent||0,n=this.entriesCount,c=this._sources.length;this.accumulate?this.contentBuffer.push(o):(this.bytesWritten+=o.data.length,s.prototype.push.call(this,{data:o.data,meta:{currentFile:this.currentFile,percent:n?(l+100*(n-c-1))/n:100}}))},m.prototype.openedSource=function(o){this.currentSourceOffset=this.bytesWritten,this.currentFile=o.file.name;var l=this.streamFiles&&!o.file.dir;if(l){var n=d(o,l,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:n.fileRecord,meta:{percent:0}})}else this.accumulate=!0},m.prototype.closedSource=function(o){this.accumulate=!1;var l=this.streamFiles&&!o.file.dir,n=d(o,l,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(n.dirRecord),l)this.push({data:function(c){return a.DATA_DESCRIPTOR+u(c.crc32,4)+u(c.compressedSize,4)+u(c.uncompressedSize,4)}(o),meta:{percent:100}});else for(this.push({data:n.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},m.prototype.flush=function(){for(var o=this.bytesWritten,l=0;l<this.dirRecords.length;l++)this.push({data:this.dirRecords[l],meta:{percent:100}});var n=this.bytesWritten-o,c=function(i,v,B,h,k){var P=r.transformTo("string",k(h));return a.CENTRAL_DIRECTORY_END+"\\0\\0\\0\\0"+u(i,2)+u(i,2)+u(v,4)+u(B,4)+u(P.length,2)+P}(this.dirRecords.length,n,o,this.zipComment,this.encodeFileName);this.push({data:c,meta:{percent:100}})},m.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},m.prototype.registerPrevious=function(o){this._sources.push(o);var l=this;return o.on("data",function(n){l.processChunk(n)}),o.on("end",function(){l.closedSource(l.previous.streamInfo),l._sources.length?l.prepareNextSource():l.end()}),o.on("error",function(n){l.error(n)}),this},m.prototype.resume=function(){return!!s.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},m.prototype.error=function(o){var l=this._sources;if(!s.prototype.error.call(this,o))return!1;for(var n=0;n<l.length;n++)try{l[n].error(o)}catch{}return!0},m.prototype.lock=function(){s.prototype.lock.call(this);for(var o=this._sources,l=0;l<o.length;l++)o[l].lock()},x.exports=m},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(w,x,g){var u=w("../compressions"),d=w("./ZipFileWorker");g.generateWorker=function(r,s,p){var f=new d(s.streamFiles,p,s.platform,s.encodeFileName),a=0;try{r.forEach(function(m,o){a++;var l=function(v,B){var h=v||B,k=u[h];if(!k)throw new Error(h+" is not a valid compression method !");return k}(o.options.compression,s.compression),n=o.options.compressionOptions||s.compressionOptions||{},c=o.dir,i=o.date;o._compressWorker(l,n).withStreamInfo("file",{name:m,dir:c,date:i,comment:o.comment||"",unixPermissions:o.unixPermissions,dosPermissions:o.dosPermissions}).pipe(f)}),f.entriesCount=a}catch(m){f.error(m)}return f}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(w,x,g){function u(){if(!(this instanceof u))return new u;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var d=new u;for(var r in this)typeof this[r]!="function"&&(d[r]=this[r]);return d}}(u.prototype=w("./object")).loadAsync=w("./load"),u.support=w("./support"),u.defaults=w("./defaults"),u.version="3.10.1",u.loadAsync=function(d,r){return new u().loadAsync(d,r)},u.external=w("./external"),x.exports=u},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(w,x,g){var u=w("./utils"),d=w("./external"),r=w("./utf8"),s=w("./zipEntries"),p=w("./stream/Crc32Probe"),f=w("./nodejsUtils");function a(m){return new d.Promise(function(o,l){var n=m.decompressed.getContentWorker().pipe(new p);n.on("error",function(c){l(c)}).on("end",function(){n.streamInfo.crc32!==m.decompressed.crc32?l(new Error("Corrupted zip : CRC32 mismatch")):o()}).resume()})}x.exports=function(m,o){var l=this;return o=u.extend(o||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:r.utf8decode}),f.isNode&&f.isStream(m)?d.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):u.prepareContent("the loaded zip file",m,!0,o.optimizedBinaryString,o.base64).then(function(n){var c=new s(o);return c.load(n),c}).then(function(n){var c=[d.Promise.resolve(n)],i=n.files;if(o.checkCRC32)for(var v=0;v<i.length;v++)c.push(a(i[v]));return d.Promise.all(c)}).then(function(n){for(var c=n.shift(),i=c.files,v=0;v<i.length;v++){var B=i[v],h=B.fileNameStr,k=u.resolve(B.fileNameStr);l.file(k,B.decompressed,{binary:!0,optimizedBinaryString:!0,date:B.date,dir:B.dir,comment:B.fileCommentStr.length?B.fileCommentStr:null,unixPermissions:B.unixPermissions,dosPermissions:B.dosPermissions,createFolders:o.createFolders}),B.dir||(l.file(k).unsafeOriginalName=h)}return c.zipComment.length&&(l.comment=c.zipComment),l})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(w,x,g){var u=w("../utils"),d=w("../stream/GenericWorker");function r(s,p){d.call(this,"Nodejs stream input adapter for "+s),this._upstreamEnded=!1,this._bindStream(p)}u.inherits(r,d),r.prototype._bindStream=function(s){var p=this;(this._stream=s).pause(),s.on("data",function(f){p.push({data:f,meta:{percent:0}})}).on("error",function(f){p.isPaused?this.generatedError=f:p.error(f)}).on("end",function(){p.isPaused?p._upstreamEnded=!0:p.end()})},r.prototype.pause=function(){return!!d.prototype.pause.call(this)&&(this._stream.pause(),!0)},r.prototype.resume=function(){return!!d.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},x.exports=r},{"../stream/GenericWorker":28,"../utils":32}],13:[function(w,x,g){var u=w("readable-stream").Readable;function d(r,s,p){u.call(this,s),this._helper=r;var f=this;r.on("data",function(a,m){f.push(a)||f._helper.pause(),p&&p(m)}).on("error",function(a){f.emit("error",a)}).on("end",function(){f.push(null)})}w("../utils").inherits(d,u),d.prototype._read=function(){this._helper.resume()},x.exports=d},{"../utils":32,"readable-stream":16}],14:[function(w,x,g){x.exports={isNode:typeof Buffer<"u",newBufferFrom:function(u,d){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(u,d);if(typeof u=="number")throw new Error('The "data" argument must not be a number');return new Buffer(u,d)},allocBuffer:function(u){if(Buffer.alloc)return Buffer.alloc(u);var d=new Buffer(u);return d.fill(0),d},isBuffer:function(u){return Buffer.isBuffer(u)},isStream:function(u){return u&&typeof u.on=="function"&&typeof u.pause=="function"&&typeof u.resume=="function"}}},{}],15:[function(w,x,g){function u(k,P,y){var z,S=r.getTypeOf(P),N=r.extend(y||{},f);N.date=N.date||new Date,N.compression!==null&&(N.compression=N.compression.toUpperCase()),typeof N.unixPermissions=="string"&&(N.unixPermissions=parseInt(N.unixPermissions,8)),N.unixPermissions&&16384&N.unixPermissions&&(N.dir=!0),N.dosPermissions&&16&N.dosPermissions&&(N.dir=!0),N.dir&&(k=i(k)),N.createFolders&&(z=c(k))&&v.call(this,z,!0);var U=S==="string"&&N.binary===!1&&N.base64===!1;y&&y.binary!==void 0||(N.binary=!U),(P instanceof a&&P.uncompressedSize===0||N.dir||!P||P.length===0)&&(N.base64=!1,N.binary=!0,P="",N.compression="STORE",S="string");var C=null;C=P instanceof a||P instanceof s?P:l.isNode&&l.isStream(P)?new n(k,P):r.prepareContent(k,P,N.binary,N.optimizedBinaryString,N.base64);var I=new m(k,C,N);this.files[k]=I}var d=w("./utf8"),r=w("./utils"),s=w("./stream/GenericWorker"),p=w("./stream/StreamHelper"),f=w("./defaults"),a=w("./compressedObject"),m=w("./zipObject"),o=w("./generate"),l=w("./nodejsUtils"),n=w("./nodejs/NodejsStreamInputAdapter"),c=function(k){k.slice(-1)==="/"&&(k=k.substring(0,k.length-1));var P=k.lastIndexOf("/");return 0<P?k.substring(0,P):""},i=function(k){return k.slice(-1)!=="/"&&(k+="/"),k},v=function(k,P){return P=P!==void 0?P:f.createFolders,k=i(k),this.files[k]||u.call(this,k,null,{dir:!0,createFolders:P}),this.files[k]};function B(k){return Object.prototype.toString.call(k)==="[object RegExp]"}var h={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(k){var P,y,z;for(P in this.files)z=this.files[P],(y=P.slice(this.root.length,P.length))&&P.slice(0,this.root.length)===this.root&&k(y,z)},filter:function(k){var P=[];return this.forEach(function(y,z){k(y,z)&&P.push(z)}),P},file:function(k,P,y){if(arguments.length!==1)return k=this.root+k,u.call(this,k,P,y),this;if(B(k)){var z=k;return this.filter(function(N,U){return!U.dir&&z.test(N)})}var S=this.files[this.root+k];return S&&!S.dir?S:null},folder:function(k){if(!k)return this;if(B(k))return this.filter(function(S,N){return N.dir&&k.test(S)});var P=this.root+k,y=v.call(this,P),z=this.clone();return z.root=y.name,z},remove:function(k){k=this.root+k;var P=this.files[k];if(P||(k.slice(-1)!=="/"&&(k+="/"),P=this.files[k]),P&&!P.dir)delete this.files[k];else for(var y=this.filter(function(S,N){return N.name.slice(0,k.length)===k}),z=0;z<y.length;z++)delete this.files[y[z].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(k){var P,y={};try{if((y=r.extend(k||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:d.utf8encode})).type=y.type.toLowerCase(),y.compression=y.compression.toUpperCase(),y.type==="binarystring"&&(y.type="string"),!y.type)throw new Error("No output type specified.");r.checkSupport(y.type),y.platform!=="darwin"&&y.platform!=="freebsd"&&y.platform!=="linux"&&y.platform!=="sunos"||(y.platform="UNIX"),y.platform==="win32"&&(y.platform="DOS");var z=y.comment||this.comment||"";P=o.generateWorker(this,y,z)}catch(S){(P=new s("error")).error(S)}return new p(P,y.type||"string",y.mimeType)},generateAsync:function(k,P){return this.generateInternalStream(k).accumulate(P)},generateNodeStream:function(k,P){return(k=k||{}).type||(k.type="nodebuffer"),this.generateInternalStream(k).toNodejsStream(P)}};x.exports=h},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(w,x,g){x.exports=w("stream")},{stream:void 0}],17:[function(w,x,g){var u=w("./DataReader");function d(r){u.call(this,r);for(var s=0;s<this.data.length;s++)r[s]=255&r[s]}w("../utils").inherits(d,u),d.prototype.byteAt=function(r){return this.data[this.zero+r]},d.prototype.lastIndexOfSignature=function(r){for(var s=r.charCodeAt(0),p=r.charCodeAt(1),f=r.charCodeAt(2),a=r.charCodeAt(3),m=this.length-4;0<=m;--m)if(this.data[m]===s&&this.data[m+1]===p&&this.data[m+2]===f&&this.data[m+3]===a)return m-this.zero;return-1},d.prototype.readAndCheckSignature=function(r){var s=r.charCodeAt(0),p=r.charCodeAt(1),f=r.charCodeAt(2),a=r.charCodeAt(3),m=this.readData(4);return s===m[0]&&p===m[1]&&f===m[2]&&a===m[3]},d.prototype.readData=function(r){if(this.checkOffset(r),r===0)return[];var s=this.data.slice(this.zero+this.index,this.zero+this.index+r);return this.index+=r,s},x.exports=d},{"../utils":32,"./DataReader":18}],18:[function(w,x,g){var u=w("../utils");function d(r){this.data=r,this.length=r.length,this.index=0,this.zero=0}d.prototype={checkOffset:function(r){this.checkIndex(this.index+r)},checkIndex:function(r){if(this.length<this.zero+r||r<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+r+"). Corrupted zip ?")},setIndex:function(r){this.checkIndex(r),this.index=r},skip:function(r){this.setIndex(this.index+r)},byteAt:function(){},readInt:function(r){var s,p=0;for(this.checkOffset(r),s=this.index+r-1;s>=this.index;s--)p=(p<<8)+this.byteAt(s);return this.index+=r,p},readString:function(r){return u.transformTo("string",this.readData(r))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var r=this.readInt(4);return new Date(Date.UTC(1980+(r>>25&127),(r>>21&15)-1,r>>16&31,r>>11&31,r>>5&63,(31&r)<<1))}},x.exports=d},{"../utils":32}],19:[function(w,x,g){var u=w("./Uint8ArrayReader");function d(r){u.call(this,r)}w("../utils").inherits(d,u),d.prototype.readData=function(r){this.checkOffset(r);var s=this.data.slice(this.zero+this.index,this.zero+this.index+r);return this.index+=r,s},x.exports=d},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(w,x,g){var u=w("./DataReader");function d(r){u.call(this,r)}w("../utils").inherits(d,u),d.prototype.byteAt=function(r){return this.data.charCodeAt(this.zero+r)},d.prototype.lastIndexOfSignature=function(r){return this.data.lastIndexOf(r)-this.zero},d.prototype.readAndCheckSignature=function(r){return r===this.readData(4)},d.prototype.readData=function(r){this.checkOffset(r);var s=this.data.slice(this.zero+this.index,this.zero+this.index+r);return this.index+=r,s},x.exports=d},{"../utils":32,"./DataReader":18}],21:[function(w,x,g){var u=w("./ArrayReader");function d(r){u.call(this,r)}w("../utils").inherits(d,u),d.prototype.readData=function(r){if(this.checkOffset(r),r===0)return new Uint8Array(0);var s=this.data.subarray(this.zero+this.index,this.zero+this.index+r);return this.index+=r,s},x.exports=d},{"../utils":32,"./ArrayReader":17}],22:[function(w,x,g){var u=w("../utils"),d=w("../support"),r=w("./ArrayReader"),s=w("./StringReader"),p=w("./NodeBufferReader"),f=w("./Uint8ArrayReader");x.exports=function(a){var m=u.getTypeOf(a);return u.checkSupport(m),m!=="string"||d.uint8array?m==="nodebuffer"?new p(a):d.uint8array?new f(u.transformTo("uint8array",a)):new r(u.transformTo("array",a)):new s(a)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(w,x,g){g.LOCAL_FILE_HEADER="PK",g.CENTRAL_FILE_HEADER="PK",g.CENTRAL_DIRECTORY_END="PK",g.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK\\x07",g.ZIP64_CENTRAL_DIRECTORY_END="PK",g.DATA_DESCRIPTOR="PK\\x07\\b"},{}],24:[function(w,x,g){var u=w("./GenericWorker"),d=w("../utils");function r(s){u.call(this,"ConvertWorker to "+s),this.destType=s}d.inherits(r,u),r.prototype.processChunk=function(s){this.push({data:d.transformTo(this.destType,s.data),meta:s.meta})},x.exports=r},{"../utils":32,"./GenericWorker":28}],25:[function(w,x,g){var u=w("./GenericWorker"),d=w("../crc32");function r(){u.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}w("../utils").inherits(r,u),r.prototype.processChunk=function(s){this.streamInfo.crc32=d(s.data,this.streamInfo.crc32||0),this.push(s)},x.exports=r},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(w,x,g){var u=w("../utils"),d=w("./GenericWorker");function r(s){d.call(this,"DataLengthProbe for "+s),this.propName=s,this.withStreamInfo(s,0)}u.inherits(r,d),r.prototype.processChunk=function(s){if(s){var p=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=p+s.data.length}d.prototype.processChunk.call(this,s)},x.exports=r},{"../utils":32,"./GenericWorker":28}],27:[function(w,x,g){var u=w("../utils"),d=w("./GenericWorker");function r(s){d.call(this,"DataWorker");var p=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,s.then(function(f){p.dataIsReady=!0,p.data=f,p.max=f&&f.length||0,p.type=u.getTypeOf(f),p.isPaused||p._tickAndRepeat()},function(f){p.error(f)})}u.inherits(r,d),r.prototype.cleanUp=function(){d.prototype.cleanUp.call(this),this.data=null},r.prototype.resume=function(){return!!d.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,u.delay(this._tickAndRepeat,[],this)),!0)},r.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(u.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},r.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var s=null,p=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":s=this.data.substring(this.index,p);break;case"uint8array":s=this.data.subarray(this.index,p);break;case"array":case"nodebuffer":s=this.data.slice(this.index,p)}return this.index=p,this.push({data:s,meta:{percent:this.max?this.index/this.max*100:0}})},x.exports=r},{"../utils":32,"./GenericWorker":28}],28:[function(w,x,g){function u(d){this.name=d||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}u.prototype={push:function(d){this.emit("data",d)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(d){this.emit("error",d)}return!0},error:function(d){return!this.isFinished&&(this.isPaused?this.generatedError=d:(this.isFinished=!0,this.emit("error",d),this.previous&&this.previous.error(d),this.cleanUp()),!0)},on:function(d,r){return this._listeners[d].push(r),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(d,r){if(this._listeners[d])for(var s=0;s<this._listeners[d].length;s++)this._listeners[d][s].call(this,r)},pipe:function(d){return d.registerPrevious(this)},registerPrevious:function(d){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=d.streamInfo,this.mergeStreamInfo(),this.previous=d;var r=this;return d.on("data",function(s){r.processChunk(s)}),d.on("end",function(){r.end()}),d.on("error",function(s){r.error(s)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var d=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),d=!0),this.previous&&this.previous.resume(),!d},flush:function(){},processChunk:function(d){this.push(d)},withStreamInfo:function(d,r){return this.extraStreamInfo[d]=r,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var d in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,d)&&(this.streamInfo[d]=this.extraStreamInfo[d])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var d="Worker "+this.name;return this.previous?this.previous+" -> "+d:d}},x.exports=u},{}],29:[function(w,x,g){var u=w("../utils"),d=w("./ConvertWorker"),r=w("./GenericWorker"),s=w("../base64"),p=w("../support"),f=w("../external"),a=null;if(p.nodestream)try{a=w("../nodejs/NodejsStreamOutputAdapter")}catch{}function m(l,n){return new f.Promise(function(c,i){var v=[],B=l._internalType,h=l._outputType,k=l._mimeType;l.on("data",function(P,y){v.push(P),n&&n(y)}).on("error",function(P){v=[],i(P)}).on("end",function(){try{var P=function(y,z,S){switch(y){case"blob":return u.newBlob(u.transformTo("arraybuffer",z),S);case"base64":return s.encode(z);default:return u.transformTo(y,z)}}(h,function(y,z){var S,N=0,U=null,C=0;for(S=0;S<z.length;S++)C+=z[S].length;switch(y){case"string":return z.join("");case"array":return Array.prototype.concat.apply([],z);case"uint8array":for(U=new Uint8Array(C),S=0;S<z.length;S++)U.set(z[S],N),N+=z[S].length;return U;case"nodebuffer":return Buffer.concat(z);default:throw new Error("concat : unsupported type '"+y+"'")}}(B,v),k);c(P)}catch(y){i(y)}v=[]}).resume()})}function o(l,n,c){var i=n;switch(n){case"blob":case"arraybuffer":i="uint8array";break;case"base64":i="string"}try{this._internalType=i,this._outputType=n,this._mimeType=c,u.checkSupport(i),this._worker=l.pipe(new d(i)),l.lock()}catch(v){this._worker=new r("error"),this._worker.error(v)}}o.prototype={accumulate:function(l){return m(this,l)},on:function(l,n){var c=this;return l==="data"?this._worker.on(l,function(i){n.call(c,i.data,i.meta)}):this._worker.on(l,function(){u.delay(n,arguments,c)}),this},resume:function(){return u.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(l){if(u.checkSupport("nodestream"),this._outputType!=="nodebuffer")throw new Error(this._outputType+" is not supported by this method");return new a(this,{objectMode:this._outputType!=="nodebuffer"},l)}},x.exports=o},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(w,x,g){if(g.base64=!0,g.array=!0,g.string=!0,g.arraybuffer=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u",g.nodebuffer=typeof Buffer<"u",g.uint8array=typeof Uint8Array<"u",typeof ArrayBuffer>"u")g.blob=!1;else{var u=new ArrayBuffer(0);try{g.blob=new Blob([u],{type:"application/zip"}).size===0}catch{try{var d=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);d.append(u),g.blob=d.getBlob("application/zip").size===0}catch{g.blob=!1}}}try{g.nodestream=!!w("readable-stream").Readable}catch{g.nodestream=!1}},{"readable-stream":16}],31:[function(w,x,g){for(var u=w("./utils"),d=w("./support"),r=w("./nodejsUtils"),s=w("./stream/GenericWorker"),p=new Array(256),f=0;f<256;f++)p[f]=252<=f?6:248<=f?5:240<=f?4:224<=f?3:192<=f?2:1;p[254]=p[254]=1;function a(){s.call(this,"utf-8 decode"),this.leftOver=null}function m(){s.call(this,"utf-8 encode")}g.utf8encode=function(o){return d.nodebuffer?r.newBufferFrom(o,"utf-8"):function(l){var n,c,i,v,B,h=l.length,k=0;for(v=0;v<h;v++)(64512&(c=l.charCodeAt(v)))==55296&&v+1<h&&(64512&(i=l.charCodeAt(v+1)))==56320&&(c=65536+(c-55296<<10)+(i-56320),v++),k+=c<128?1:c<2048?2:c<65536?3:4;for(n=d.uint8array?new Uint8Array(k):new Array(k),v=B=0;B<k;v++)(64512&(c=l.charCodeAt(v)))==55296&&v+1<h&&(64512&(i=l.charCodeAt(v+1)))==56320&&(c=65536+(c-55296<<10)+(i-56320),v++),c<128?n[B++]=c:(c<2048?n[B++]=192|c>>>6:(c<65536?n[B++]=224|c>>>12:(n[B++]=240|c>>>18,n[B++]=128|c>>>12&63),n[B++]=128|c>>>6&63),n[B++]=128|63&c);return n}(o)},g.utf8decode=function(o){return d.nodebuffer?u.transformTo("nodebuffer",o).toString("utf-8"):function(l){var n,c,i,v,B=l.length,h=new Array(2*B);for(n=c=0;n<B;)if((i=l[n++])<128)h[c++]=i;else if(4<(v=p[i]))h[c++]=65533,n+=v-1;else{for(i&=v===2?31:v===3?15:7;1<v&&n<B;)i=i<<6|63&l[n++],v--;1<v?h[c++]=65533:i<65536?h[c++]=i:(i-=65536,h[c++]=55296|i>>10&1023,h[c++]=56320|1023&i)}return h.length!==c&&(h.subarray?h=h.subarray(0,c):h.length=c),u.applyFromCharCode(h)}(o=u.transformTo(d.uint8array?"uint8array":"array",o))},u.inherits(a,s),a.prototype.processChunk=function(o){var l=u.transformTo(d.uint8array?"uint8array":"array",o.data);if(this.leftOver&&this.leftOver.length){if(d.uint8array){var n=l;(l=new Uint8Array(n.length+this.leftOver.length)).set(this.leftOver,0),l.set(n,this.leftOver.length)}else l=this.leftOver.concat(l);this.leftOver=null}var c=function(v,B){var h;for((B=B||v.length)>v.length&&(B=v.length),h=B-1;0<=h&&(192&v[h])==128;)h--;return h<0||h===0?B:h+p[v[h]]>B?h:B}(l),i=l;c!==l.length&&(d.uint8array?(i=l.subarray(0,c),this.leftOver=l.subarray(c,l.length)):(i=l.slice(0,c),this.leftOver=l.slice(c,l.length))),this.push({data:g.utf8decode(i),meta:o.meta})},a.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:g.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},g.Utf8DecodeWorker=a,u.inherits(m,s),m.prototype.processChunk=function(o){this.push({data:g.utf8encode(o.data),meta:o.meta})},g.Utf8EncodeWorker=m},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(w,x,g){var u=w("./support"),d=w("./base64"),r=w("./nodejsUtils"),s=w("./external");function p(n){return n}function f(n,c){for(var i=0;i<n.length;++i)c[i]=255&n.charCodeAt(i);return c}w("setimmediate"),g.newBlob=function(n,c){g.checkSupport("blob");try{return new Blob([n],{type:c})}catch{try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return i.append(n),i.getBlob(c)}catch{throw new Error("Bug : can't construct the Blob.")}}};var a={stringifyByChunk:function(n,c,i){var v=[],B=0,h=n.length;if(h<=i)return String.fromCharCode.apply(null,n);for(;B<h;)c==="array"||c==="nodebuffer"?v.push(String.fromCharCode.apply(null,n.slice(B,Math.min(B+i,h)))):v.push(String.fromCharCode.apply(null,n.subarray(B,Math.min(B+i,h)))),B+=i;return v.join("")},stringifyByChar:function(n){for(var c="",i=0;i<n.length;i++)c+=String.fromCharCode(n[i]);return c},applyCanBeUsed:{uint8array:function(){try{return u.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch{return!1}}(),nodebuffer:function(){try{return u.nodebuffer&&String.fromCharCode.apply(null,r.allocBuffer(1)).length===1}catch{return!1}}()}};function m(n){var c=65536,i=g.getTypeOf(n),v=!0;if(i==="uint8array"?v=a.applyCanBeUsed.uint8array:i==="nodebuffer"&&(v=a.applyCanBeUsed.nodebuffer),v)for(;1<c;)try{return a.stringifyByChunk(n,i,c)}catch{c=Math.floor(c/2)}return a.stringifyByChar(n)}function o(n,c){for(var i=0;i<n.length;i++)c[i]=n[i];return c}g.applyFromCharCode=m;var l={};l.string={string:p,array:function(n){return f(n,new Array(n.length))},arraybuffer:function(n){return l.string.uint8array(n).buffer},uint8array:function(n){return f(n,new Uint8Array(n.length))},nodebuffer:function(n){return f(n,r.allocBuffer(n.length))}},l.array={string:m,array:p,arraybuffer:function(n){return new Uint8Array(n).buffer},uint8array:function(n){return new Uint8Array(n)},nodebuffer:function(n){return r.newBufferFrom(n)}},l.arraybuffer={string:function(n){return m(new Uint8Array(n))},array:function(n){return o(new Uint8Array(n),new Array(n.byteLength))},arraybuffer:p,uint8array:function(n){return new Uint8Array(n)},nodebuffer:function(n){return r.newBufferFrom(new Uint8Array(n))}},l.uint8array={string:m,array:function(n){return o(n,new Array(n.length))},arraybuffer:function(n){return n.buffer},uint8array:p,nodebuffer:function(n){return r.newBufferFrom(n)}},l.nodebuffer={string:m,array:function(n){return o(n,new Array(n.length))},arraybuffer:function(n){return l.nodebuffer.uint8array(n).buffer},uint8array:function(n){return o(n,new Uint8Array(n.length))},nodebuffer:p},g.transformTo=function(n,c){if(c=c||"",!n)return c;g.checkSupport(n);var i=g.getTypeOf(c);return l[i][n](c)},g.resolve=function(n){for(var c=n.split("/"),i=[],v=0;v<c.length;v++){var B=c[v];B==="."||B===""&&v!==0&&v!==c.length-1||(B===".."?i.pop():i.push(B))}return i.join("/")},g.getTypeOf=function(n){return typeof n=="string"?"string":Object.prototype.toString.call(n)==="[object Array]"?"array":u.nodebuffer&&r.isBuffer(n)?"nodebuffer":u.uint8array&&n instanceof Uint8Array?"uint8array":u.arraybuffer&&n instanceof ArrayBuffer?"arraybuffer":void 0},g.checkSupport=function(n){if(!u[n.toLowerCase()])throw new Error(n+" is not supported by this platform")},g.MAX_VALUE_16BITS=65535,g.MAX_VALUE_32BITS=-1,g.pretty=function(n){var c,i,v="";for(i=0;i<(n||"").length;i++)v+="\\\\x"+((c=n.charCodeAt(i))<16?"0":"")+c.toString(16).toUpperCase();return v},g.delay=function(n,c,i){setImmediate(function(){n.apply(i||null,c||[])})},g.inherits=function(n,c){function i(){}i.prototype=c.prototype,n.prototype=new i},g.extend=function(){var n,c,i={};for(n=0;n<arguments.length;n++)for(c in arguments[n])Object.prototype.hasOwnProperty.call(arguments[n],c)&&i[c]===void 0&&(i[c]=arguments[n][c]);return i},g.prepareContent=function(n,c,i,v,B){return s.Promise.resolve(c).then(function(h){return u.blob&&(h instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(h))!==-1)&&typeof FileReader<"u"?new s.Promise(function(k,P){var y=new FileReader;y.onload=function(z){k(z.target.result)},y.onerror=function(z){P(z.target.error)},y.readAsArrayBuffer(h)}):h}).then(function(h){var k=g.getTypeOf(h);return k?(k==="arraybuffer"?h=g.transformTo("uint8array",h):k==="string"&&(B?h=d.decode(h):i&&v!==!0&&(h=function(P){return f(P,u.uint8array?new Uint8Array(P.length):new Array(P.length))}(h))),h):s.Promise.reject(new Error("Can't read the data of '"+n+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(w,x,g){var u=w("./reader/readerFor"),d=w("./utils"),r=w("./signature"),s=w("./zipEntry"),p=w("./support");function f(a){this.files=[],this.loadOptions=a}f.prototype={checkSignature:function(a){if(!this.reader.readAndCheckSignature(a)){this.reader.index-=4;var m=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+d.pretty(m)+", expected "+d.pretty(a)+")")}},isSignature:function(a,m){var o=this.reader.index;this.reader.setIndex(a);var l=this.reader.readString(4)===m;return this.reader.setIndex(o),l},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var a=this.reader.readData(this.zipCommentLength),m=p.uint8array?"uint8array":"array",o=d.transformTo(m,a);this.zipComment=this.loadOptions.decodeFileName(o)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var a,m,o,l=this.zip64EndOfCentralSize-44;0<l;)a=this.reader.readInt(2),m=this.reader.readInt(4),o=this.reader.readData(m),this.zip64ExtensibleData[a]={id:a,length:m,value:o}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var a,m;for(a=0;a<this.files.length;a++)m=this.files[a],this.reader.setIndex(m.localHeaderOffset),this.checkSignature(r.LOCAL_FILE_HEADER),m.readLocalPart(this.reader),m.handleUTF8(),m.processAttributes()},readCentralDir:function(){var a;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(r.CENTRAL_FILE_HEADER);)(a=new s({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(a);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var a=this.reader.lastIndexOfSignature(r.CENTRAL_DIRECTORY_END);if(a<0)throw this.isSignature(0,r.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(a);var m=a;if(this.checkSignature(r.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===d.MAX_VALUE_16BITS||this.diskWithCentralDirStart===d.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===d.MAX_VALUE_16BITS||this.centralDirRecords===d.MAX_VALUE_16BITS||this.centralDirSize===d.MAX_VALUE_32BITS||this.centralDirOffset===d.MAX_VALUE_32BITS){if(this.zip64=!0,(a=this.reader.lastIndexOfSignature(r.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(a),this.checkSignature(r.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,r.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(r.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(r.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var o=this.centralDirOffset+this.centralDirSize;this.zip64&&(o+=20,o+=12+this.zip64EndOfCentralSize);var l=m-o;if(0<l)this.isSignature(m,r.CENTRAL_FILE_HEADER)||(this.reader.zero=l);else if(l<0)throw new Error("Corrupted zip: missing "+Math.abs(l)+" bytes.")},prepareReader:function(a){this.reader=u(a)},load:function(a){this.prepareReader(a),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},x.exports=f},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(w,x,g){var u=w("./reader/readerFor"),d=w("./utils"),r=w("./compressedObject"),s=w("./crc32"),p=w("./utf8"),f=w("./compressions"),a=w("./support");function m(o,l){this.options=o,this.loadOptions=l}m.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(o){var l,n;if(o.skip(22),this.fileNameLength=o.readInt(2),n=o.readInt(2),this.fileName=o.readData(this.fileNameLength),o.skip(n),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if((l=function(c){for(var i in f)if(Object.prototype.hasOwnProperty.call(f,i)&&f[i].magic===c)return f[i];return null}(this.compressionMethod))===null)throw new Error("Corrupted zip : compression "+d.pretty(this.compressionMethod)+" unknown (inner file : "+d.transformTo("string",this.fileName)+")");this.decompressed=new r(this.compressedSize,this.uncompressedSize,this.crc32,l,o.readData(this.compressedSize))},readCentralPart:function(o){this.versionMadeBy=o.readInt(2),o.skip(2),this.bitFlag=o.readInt(2),this.compressionMethod=o.readString(2),this.date=o.readDate(),this.crc32=o.readInt(4),this.compressedSize=o.readInt(4),this.uncompressedSize=o.readInt(4);var l=o.readInt(2);if(this.extraFieldsLength=o.readInt(2),this.fileCommentLength=o.readInt(2),this.diskNumberStart=o.readInt(2),this.internalFileAttributes=o.readInt(2),this.externalFileAttributes=o.readInt(4),this.localHeaderOffset=o.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");o.skip(l),this.readExtraFields(o),this.parseZIP64ExtraField(o),this.fileComment=o.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var o=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),o==0&&(this.dosPermissions=63&this.externalFileAttributes),o==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!=="/"||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var o=u(this.extraFields[1].value);this.uncompressedSize===d.MAX_VALUE_32BITS&&(this.uncompressedSize=o.readInt(8)),this.compressedSize===d.MAX_VALUE_32BITS&&(this.compressedSize=o.readInt(8)),this.localHeaderOffset===d.MAX_VALUE_32BITS&&(this.localHeaderOffset=o.readInt(8)),this.diskNumberStart===d.MAX_VALUE_32BITS&&(this.diskNumberStart=o.readInt(4))}},readExtraFields:function(o){var l,n,c,i=o.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});o.index+4<i;)l=o.readInt(2),n=o.readInt(2),c=o.readData(n),this.extraFields[l]={id:l,length:n,value:c};o.setIndex(i)},handleUTF8:function(){var o=a.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=p.utf8decode(this.fileName),this.fileCommentStr=p.utf8decode(this.fileComment);else{var l=this.findExtraFieldUnicodePath();if(l!==null)this.fileNameStr=l;else{var n=d.transformTo(o,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(n)}var c=this.findExtraFieldUnicodeComment();if(c!==null)this.fileCommentStr=c;else{var i=d.transformTo(o,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(i)}}},findExtraFieldUnicodePath:function(){var o=this.extraFields[28789];if(o){var l=u(o.value);return l.readInt(1)!==1||s(this.fileName)!==l.readInt(4)?null:p.utf8decode(l.readData(o.length-5))}return null},findExtraFieldUnicodeComment:function(){var o=this.extraFields[25461];if(o){var l=u(o.value);return l.readInt(1)!==1||s(this.fileComment)!==l.readInt(4)?null:p.utf8decode(l.readData(o.length-5))}return null}},x.exports=m},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(w,x,g){function u(l,n,c){this.name=l,this.dir=c.dir,this.date=c.date,this.comment=c.comment,this.unixPermissions=c.unixPermissions,this.dosPermissions=c.dosPermissions,this._data=n,this._dataBinary=c.binary,this.options={compression:c.compression,compressionOptions:c.compressionOptions}}var d=w("./stream/StreamHelper"),r=w("./stream/DataWorker"),s=w("./utf8"),p=w("./compressedObject"),f=w("./stream/GenericWorker");u.prototype={internalStream:function(l){var n=null,c="string";try{if(!l)throw new Error("No output type specified.");var i=(c=l.toLowerCase())==="string"||c==="text";c!=="binarystring"&&c!=="text"||(c="string"),n=this._decompressWorker();var v=!this._dataBinary;v&&!i&&(n=n.pipe(new s.Utf8EncodeWorker)),!v&&i&&(n=n.pipe(new s.Utf8DecodeWorker))}catch(B){(n=new f("error")).error(B)}return new d(n,c,"")},async:function(l,n){return this.internalStream(l).accumulate(n)},nodeStream:function(l,n){return this.internalStream(l||"nodebuffer").toNodejsStream(n)},_compressWorker:function(l,n){if(this._data instanceof p&&this._data.compression.magic===l.magic)return this._data.getCompressedWorker();var c=this._decompressWorker();return this._dataBinary||(c=c.pipe(new s.Utf8EncodeWorker)),p.createWorkerFrom(c,l,n)},_decompressWorker:function(){return this._data instanceof p?this._data.getContentWorker():this._data instanceof f?this._data:new r(this._data)}};for(var a=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],m=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},o=0;o<a.length;o++)u.prototype[a[o]]=m;x.exports=u},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(w,x,g){(function(u){var d,r,s=u.MutationObserver||u.WebKitMutationObserver;if(s){var p=0,f=new s(l),a=u.document.createTextNode("");f.observe(a,{characterData:!0}),d=function(){a.data=p=++p%2}}else if(u.setImmediate||u.MessageChannel===void 0)d="document"in u&&"onreadystatechange"in u.document.createElement("script")?function(){var n=u.document.createElement("script");n.onreadystatechange=function(){l(),n.onreadystatechange=null,n.parentNode.removeChild(n),n=null},u.document.documentElement.appendChild(n)}:function(){setTimeout(l,0)};else{var m=new u.MessageChannel;m.port1.onmessage=l,d=function(){m.port2.postMessage(0)}}var o=[];function l(){var n,c;r=!0;for(var i=o.length;i;){for(c=o,o=[],n=-1;++n<i;)c[n]();i=o.length}r=!1}x.exports=function(n){o.push(n)!==1||r||d()}}).call(this,typeof f3<"u"?f3:typeof self<"u"?self:typeof window<"u"?window:{})},{}],37:[function(w,x,g){var u=w("immediate");function d(){}var r={},s=["REJECTED"],p=["FULFILLED"],f=["PENDING"];function a(i){if(typeof i!="function")throw new TypeError("resolver must be a function");this.state=f,this.queue=[],this.outcome=void 0,i!==d&&n(this,i)}function m(i,v,B){this.promise=i,typeof v=="function"&&(this.onFulfilled=v,this.callFulfilled=this.otherCallFulfilled),typeof B=="function"&&(this.onRejected=B,this.callRejected=this.otherCallRejected)}function o(i,v,B){u(function(){var h;try{h=v(B)}catch(k){return r.reject(i,k)}h===i?r.reject(i,new TypeError("Cannot resolve promise with itself")):r.resolve(i,h)})}function l(i){var v=i&&i.then;if(i&&(typeof i=="object"||typeof i=="function")&&typeof v=="function")return function(){v.apply(i,arguments)}}function n(i,v){var B=!1;function h(y){B||(B=!0,r.reject(i,y))}function k(y){B||(B=!0,r.resolve(i,y))}var P=c(function(){v(k,h)});P.status==="error"&&h(P.value)}function c(i,v){var B={};try{B.value=i(v),B.status="success"}catch(h){B.status="error",B.value=h}return B}(x.exports=a).prototype.finally=function(i){if(typeof i!="function")return this;var v=this.constructor;return this.then(function(B){return v.resolve(i()).then(function(){return B})},function(B){return v.resolve(i()).then(function(){throw B})})},a.prototype.catch=function(i){return this.then(null,i)},a.prototype.then=function(i,v){if(typeof i!="function"&&this.state===p||typeof v!="function"&&this.state===s)return this;var B=new this.constructor(d);return this.state!==f?o(B,this.state===p?i:v,this.outcome):this.queue.push(new m(B,i,v)),B},m.prototype.callFulfilled=function(i){r.resolve(this.promise,i)},m.prototype.otherCallFulfilled=function(i){o(this.promise,this.onFulfilled,i)},m.prototype.callRejected=function(i){r.reject(this.promise,i)},m.prototype.otherCallRejected=function(i){o(this.promise,this.onRejected,i)},r.resolve=function(i,v){var B=c(l,v);if(B.status==="error")return r.reject(i,B.value);var h=B.value;if(h)n(i,h);else{i.state=p,i.outcome=v;for(var k=-1,P=i.queue.length;++k<P;)i.queue[k].callFulfilled(v)}return i},r.reject=function(i,v){i.state=s,i.outcome=v;for(var B=-1,h=i.queue.length;++B<h;)i.queue[B].callRejected(v);return i},a.resolve=function(i){return i instanceof this?i:r.resolve(new this(d),i)},a.reject=function(i){var v=new this(d);return r.reject(v,i)},a.all=function(i){var v=this;if(Object.prototype.toString.call(i)!=="[object Array]")return this.reject(new TypeError("must be an array"));var B=i.length,h=!1;if(!B)return this.resolve([]);for(var k=new Array(B),P=0,y=-1,z=new this(d);++y<B;)S(i[y],y);return z;function S(N,U){v.resolve(N).then(function(C){k[U]=C,++P!==B||h||(h=!0,r.resolve(z,k))},function(C){h||(h=!0,r.reject(z,C))})}},a.race=function(i){var v=this;if(Object.prototype.toString.call(i)!=="[object Array]")return this.reject(new TypeError("must be an array"));var B=i.length,h=!1;if(!B)return this.resolve([]);for(var k=-1,P=new this(d);++k<B;)y=i[k],v.resolve(y).then(function(z){h||(h=!0,r.resolve(P,z))},function(z){h||(h=!0,r.reject(P,z))});var y;return P}},{immediate:36}],38:[function(w,x,g){var u={};(0,w("./lib/utils/common").assign)(u,w("./lib/deflate"),w("./lib/inflate"),w("./lib/zlib/constants")),x.exports=u},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(w,x,g){var u=w("./zlib/deflate"),d=w("./utils/common"),r=w("./utils/strings"),s=w("./zlib/messages"),p=w("./zlib/zstream"),f=Object.prototype.toString,a=0,m=-1,o=0,l=8;function n(i){if(!(this instanceof n))return new n(i);this.options=d.assign({level:m,method:l,chunkSize:16384,windowBits:15,memLevel:8,strategy:o,to:""},i||{});var v=this.options;v.raw&&0<v.windowBits?v.windowBits=-v.windowBits:v.gzip&&0<v.windowBits&&v.windowBits<16&&(v.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new p,this.strm.avail_out=0;var B=u.deflateInit2(this.strm,v.level,v.method,v.windowBits,v.memLevel,v.strategy);if(B!==a)throw new Error(s[B]);if(v.header&&u.deflateSetHeader(this.strm,v.header),v.dictionary){var h;if(h=typeof v.dictionary=="string"?r.string2buf(v.dictionary):f.call(v.dictionary)==="[object ArrayBuffer]"?new Uint8Array(v.dictionary):v.dictionary,(B=u.deflateSetDictionary(this.strm,h))!==a)throw new Error(s[B]);this._dict_set=!0}}function c(i,v){var B=new n(v);if(B.push(i,!0),B.err)throw B.msg||s[B.err];return B.result}n.prototype.push=function(i,v){var B,h,k=this.strm,P=this.options.chunkSize;if(this.ended)return!1;h=v===~~v?v:v===!0?4:0,typeof i=="string"?k.input=r.string2buf(i):f.call(i)==="[object ArrayBuffer]"?k.input=new Uint8Array(i):k.input=i,k.next_in=0,k.avail_in=k.input.length;do{if(k.avail_out===0&&(k.output=new d.Buf8(P),k.next_out=0,k.avail_out=P),(B=u.deflate(k,h))!==1&&B!==a)return this.onEnd(B),!(this.ended=!0);k.avail_out!==0&&(k.avail_in!==0||h!==4&&h!==2)||(this.options.to==="string"?this.onData(r.buf2binstring(d.shrinkBuf(k.output,k.next_out))):this.onData(d.shrinkBuf(k.output,k.next_out)))}while((0<k.avail_in||k.avail_out===0)&&B!==1);return h===4?(B=u.deflateEnd(this.strm),this.onEnd(B),this.ended=!0,B===a):h!==2||(this.onEnd(a),!(k.avail_out=0))},n.prototype.onData=function(i){this.chunks.push(i)},n.prototype.onEnd=function(i){i===a&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=d.flattenChunks(this.chunks)),this.chunks=[],this.err=i,this.msg=this.strm.msg},g.Deflate=n,g.deflate=c,g.deflateRaw=function(i,v){return(v=v||{}).raw=!0,c(i,v)},g.gzip=function(i,v){return(v=v||{}).gzip=!0,c(i,v)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(w,x,g){var u=w("./zlib/inflate"),d=w("./utils/common"),r=w("./utils/strings"),s=w("./zlib/constants"),p=w("./zlib/messages"),f=w("./zlib/zstream"),a=w("./zlib/gzheader"),m=Object.prototype.toString;function o(n){if(!(this instanceof o))return new o(n);this.options=d.assign({chunkSize:16384,windowBits:0,to:""},n||{});var c=this.options;c.raw&&0<=c.windowBits&&c.windowBits<16&&(c.windowBits=-c.windowBits,c.windowBits===0&&(c.windowBits=-15)),!(0<=c.windowBits&&c.windowBits<16)||n&&n.windowBits||(c.windowBits+=32),15<c.windowBits&&c.windowBits<48&&!(15&c.windowBits)&&(c.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new f,this.strm.avail_out=0;var i=u.inflateInit2(this.strm,c.windowBits);if(i!==s.Z_OK)throw new Error(p[i]);this.header=new a,u.inflateGetHeader(this.strm,this.header)}function l(n,c){var i=new o(c);if(i.push(n,!0),i.err)throw i.msg||p[i.err];return i.result}o.prototype.push=function(n,c){var i,v,B,h,k,P,y=this.strm,z=this.options.chunkSize,S=this.options.dictionary,N=!1;if(this.ended)return!1;v=c===~~c?c:c===!0?s.Z_FINISH:s.Z_NO_FLUSH,typeof n=="string"?y.input=r.binstring2buf(n):m.call(n)==="[object ArrayBuffer]"?y.input=new Uint8Array(n):y.input=n,y.next_in=0,y.avail_in=y.input.length;do{if(y.avail_out===0&&(y.output=new d.Buf8(z),y.next_out=0,y.avail_out=z),(i=u.inflate(y,s.Z_NO_FLUSH))===s.Z_NEED_DICT&&S&&(P=typeof S=="string"?r.string2buf(S):m.call(S)==="[object ArrayBuffer]"?new Uint8Array(S):S,i=u.inflateSetDictionary(this.strm,P)),i===s.Z_BUF_ERROR&&N===!0&&(i=s.Z_OK,N=!1),i!==s.Z_STREAM_END&&i!==s.Z_OK)return this.onEnd(i),!(this.ended=!0);y.next_out&&(y.avail_out!==0&&i!==s.Z_STREAM_END&&(y.avail_in!==0||v!==s.Z_FINISH&&v!==s.Z_SYNC_FLUSH)||(this.options.to==="string"?(B=r.utf8border(y.output,y.next_out),h=y.next_out-B,k=r.buf2string(y.output,B),y.next_out=h,y.avail_out=z-h,h&&d.arraySet(y.output,y.output,B,h,0),this.onData(k)):this.onData(d.shrinkBuf(y.output,y.next_out)))),y.avail_in===0&&y.avail_out===0&&(N=!0)}while((0<y.avail_in||y.avail_out===0)&&i!==s.Z_STREAM_END);return i===s.Z_STREAM_END&&(v=s.Z_FINISH),v===s.Z_FINISH?(i=u.inflateEnd(this.strm),this.onEnd(i),this.ended=!0,i===s.Z_OK):v!==s.Z_SYNC_FLUSH||(this.onEnd(s.Z_OK),!(y.avail_out=0))},o.prototype.onData=function(n){this.chunks.push(n)},o.prototype.onEnd=function(n){n===s.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=d.flattenChunks(this.chunks)),this.chunks=[],this.err=n,this.msg=this.strm.msg},g.Inflate=o,g.inflate=l,g.inflateRaw=function(n,c){return(c=c||{}).raw=!0,l(n,c)},g.ungzip=l},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(w,x,g){var u=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";g.assign=function(s){for(var p=Array.prototype.slice.call(arguments,1);p.length;){var f=p.shift();if(f){if(typeof f!="object")throw new TypeError(f+"must be non-object");for(var a in f)f.hasOwnProperty(a)&&(s[a]=f[a])}}return s},g.shrinkBuf=function(s,p){return s.length===p?s:s.subarray?s.subarray(0,p):(s.length=p,s)};var d={arraySet:function(s,p,f,a,m){if(p.subarray&&s.subarray)s.set(p.subarray(f,f+a),m);else for(var o=0;o<a;o++)s[m+o]=p[f+o]},flattenChunks:function(s){var p,f,a,m,o,l;for(p=a=0,f=s.length;p<f;p++)a+=s[p].length;for(l=new Uint8Array(a),p=m=0,f=s.length;p<f;p++)o=s[p],l.set(o,m),m+=o.length;return l}},r={arraySet:function(s,p,f,a,m){for(var o=0;o<a;o++)s[m+o]=p[f+o]},flattenChunks:function(s){return[].concat.apply([],s)}};g.setTyped=function(s){s?(g.Buf8=Uint8Array,g.Buf16=Uint16Array,g.Buf32=Int32Array,g.assign(g,d)):(g.Buf8=Array,g.Buf16=Array,g.Buf32=Array,g.assign(g,r))},g.setTyped(u)},{}],42:[function(w,x,g){var u=w("./common"),d=!0,r=!0;try{String.fromCharCode.apply(null,[0])}catch{d=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{r=!1}for(var s=new u.Buf8(256),p=0;p<256;p++)s[p]=252<=p?6:248<=p?5:240<=p?4:224<=p?3:192<=p?2:1;function f(a,m){if(m<65537&&(a.subarray&&r||!a.subarray&&d))return String.fromCharCode.apply(null,u.shrinkBuf(a,m));for(var o="",l=0;l<m;l++)o+=String.fromCharCode(a[l]);return o}s[254]=s[254]=1,g.string2buf=function(a){var m,o,l,n,c,i=a.length,v=0;for(n=0;n<i;n++)(64512&(o=a.charCodeAt(n)))==55296&&n+1<i&&(64512&(l=a.charCodeAt(n+1)))==56320&&(o=65536+(o-55296<<10)+(l-56320),n++),v+=o<128?1:o<2048?2:o<65536?3:4;for(m=new u.Buf8(v),n=c=0;c<v;n++)(64512&(o=a.charCodeAt(n)))==55296&&n+1<i&&(64512&(l=a.charCodeAt(n+1)))==56320&&(o=65536+(o-55296<<10)+(l-56320),n++),o<128?m[c++]=o:(o<2048?m[c++]=192|o>>>6:(o<65536?m[c++]=224|o>>>12:(m[c++]=240|o>>>18,m[c++]=128|o>>>12&63),m[c++]=128|o>>>6&63),m[c++]=128|63&o);return m},g.buf2binstring=function(a){return f(a,a.length)},g.binstring2buf=function(a){for(var m=new u.Buf8(a.length),o=0,l=m.length;o<l;o++)m[o]=a.charCodeAt(o);return m},g.buf2string=function(a,m){var o,l,n,c,i=m||a.length,v=new Array(2*i);for(o=l=0;o<i;)if((n=a[o++])<128)v[l++]=n;else if(4<(c=s[n]))v[l++]=65533,o+=c-1;else{for(n&=c===2?31:c===3?15:7;1<c&&o<i;)n=n<<6|63&a[o++],c--;1<c?v[l++]=65533:n<65536?v[l++]=n:(n-=65536,v[l++]=55296|n>>10&1023,v[l++]=56320|1023&n)}return f(v,l)},g.utf8border=function(a,m){var o;for((m=m||a.length)>a.length&&(m=a.length),o=m-1;0<=o&&(192&a[o])==128;)o--;return o<0||o===0?m:o+s[a[o]]>m?o:m}},{"./common":41}],43:[function(w,x,g){x.exports=function(u,d,r,s){for(var p=65535&u|0,f=u>>>16&65535|0,a=0;r!==0;){for(r-=a=2e3<r?2e3:r;f=f+(p=p+d[s++]|0)|0,--a;);p%=65521,f%=65521}return p|f<<16|0}},{}],44:[function(w,x,g){x.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(w,x,g){var u=function(){for(var d,r=[],s=0;s<256;s++){d=s;for(var p=0;p<8;p++)d=1&d?3988292384^d>>>1:d>>>1;r[s]=d}return r}();x.exports=function(d,r,s,p){var f=u,a=p+s;d^=-1;for(var m=p;m<a;m++)d=d>>>8^f[255&(d^r[m])];return-1^d}},{}],46:[function(w,x,g){var u,d=w("../utils/common"),r=w("./trees"),s=w("./adler32"),p=w("./crc32"),f=w("./messages"),a=0,m=4,o=0,l=-2,n=-1,c=4,i=2,v=8,B=9,h=286,k=30,P=19,y=2*h+1,z=15,S=3,N=258,U=N+S+1,C=42,I=113,t=1,M=2,J=3,R=4;function $(e,F){return e.msg=f[F],F}function j(e){return(e<<1)-(4<e?9:0)}function V(e){for(var F=e.length;0<=--F;)e[F]=0}function A(e){var F=e.state,D=F.pending;D>e.avail_out&&(D=e.avail_out),D!==0&&(d.arraySet(e.output,F.pending_buf,F.pending_out,D,e.next_out),e.next_out+=D,F.pending_out+=D,e.total_out+=D,e.avail_out-=D,F.pending-=D,F.pending===0&&(F.pending_out=0))}function O(e,F){r._tr_flush_block(e,0<=e.block_start?e.block_start:-1,e.strstart-e.block_start,F),e.block_start=e.strstart,A(e.strm)}function Q(e,F){e.pending_buf[e.pending++]=F}function Z(e,F){e.pending_buf[e.pending++]=F>>>8&255,e.pending_buf[e.pending++]=255&F}function K(e,F){var D,b,_=e.max_chain_length,E=e.strstart,G=e.prev_length,W=e.nice_match,T=e.strstart>e.w_size-U?e.strstart-(e.w_size-U):0,X=e.window,q=e.w_mask,Y=e.prev,e3=e.strstart+N,i3=X[E+G-1],a3=X[E+G];e.prev_length>=e.good_match&&(_>>=2),W>e.lookahead&&(W=e.lookahead);do if(X[(D=F)+G]===a3&&X[D+G-1]===i3&&X[D]===X[E]&&X[++D]===X[E+1]){E+=2,D++;do;while(X[++E]===X[++D]&&X[++E]===X[++D]&&X[++E]===X[++D]&&X[++E]===X[++D]&&X[++E]===X[++D]&&X[++E]===X[++D]&&X[++E]===X[++D]&&X[++E]===X[++D]&&E<e3);if(b=N-(e3-E),E=e3-N,G<b){if(e.match_start=F,W<=(G=b))break;i3=X[E+G-1],a3=X[E+G]}}while((F=Y[F&q])>T&&--_!=0);return G<=e.lookahead?G:e.lookahead}function o3(e){var F,D,b,_,E,G,W,T,X,q,Y=e.w_size;do{if(_=e.window_size-e.lookahead-e.strstart,e.strstart>=Y+(Y-U)){for(d.arraySet(e.window,e.window,Y,Y,0),e.match_start-=Y,e.strstart-=Y,e.block_start-=Y,F=D=e.hash_size;b=e.head[--F],e.head[F]=Y<=b?b-Y:0,--D;);for(F=D=Y;b=e.prev[--F],e.prev[F]=Y<=b?b-Y:0,--D;);_+=Y}if(e.strm.avail_in===0)break;if(G=e.strm,W=e.window,T=e.strstart+e.lookahead,X=_,q=void 0,q=G.avail_in,X<q&&(q=X),D=q===0?0:(G.avail_in-=q,d.arraySet(W,G.input,G.next_in,q,T),G.state.wrap===1?G.adler=s(G.adler,W,q,T):G.state.wrap===2&&(G.adler=p(G.adler,W,q,T)),G.next_in+=q,G.total_in+=q,q),e.lookahead+=D,e.lookahead+e.insert>=S)for(E=e.strstart-e.insert,e.ins_h=e.window[E],e.ins_h=(e.ins_h<<e.hash_shift^e.window[E+1])&e.hash_mask;e.insert&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[E+S-1])&e.hash_mask,e.prev[E&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=E,E++,e.insert--,!(e.lookahead+e.insert<S)););}while(e.lookahead<U&&e.strm.avail_in!==0)}function n3(e,F){for(var D,b;;){if(e.lookahead<U){if(o3(e),e.lookahead<U&&F===a)return t;if(e.lookahead===0)break}if(D=0,e.lookahead>=S&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+S-1])&e.hash_mask,D=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),D!==0&&e.strstart-D<=e.w_size-U&&(e.match_length=K(e,D)),e.match_length>=S)if(b=r._tr_tally(e,e.strstart-e.match_start,e.match_length-S),e.lookahead-=e.match_length,e.match_length<=e.max_lazy_match&&e.lookahead>=S){for(e.match_length--;e.strstart++,e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+S-1])&e.hash_mask,D=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart,--e.match_length!=0;);e.strstart++}else e.strstart+=e.match_length,e.match_length=0,e.ins_h=e.window[e.strstart],e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+1])&e.hash_mask;else b=r._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++;if(b&&(O(e,!1),e.strm.avail_out===0))return t}return e.insert=e.strstart<S-1?e.strstart:S-1,F===m?(O(e,!0),e.strm.avail_out===0?J:R):e.last_lit&&(O(e,!1),e.strm.avail_out===0)?t:M}function r3(e,F){for(var D,b,_;;){if(e.lookahead<U){if(o3(e),e.lookahead<U&&F===a)return t;if(e.lookahead===0)break}if(D=0,e.lookahead>=S&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+S-1])&e.hash_mask,D=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),e.prev_length=e.match_length,e.prev_match=e.match_start,e.match_length=S-1,D!==0&&e.prev_length<e.max_lazy_match&&e.strstart-D<=e.w_size-U&&(e.match_length=K(e,D),e.match_length<=5&&(e.strategy===1||e.match_length===S&&4096<e.strstart-e.match_start)&&(e.match_length=S-1)),e.prev_length>=S&&e.match_length<=e.prev_length){for(_=e.strstart+e.lookahead-S,b=r._tr_tally(e,e.strstart-1-e.prev_match,e.prev_length-S),e.lookahead-=e.prev_length-1,e.prev_length-=2;++e.strstart<=_&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+S-1])&e.hash_mask,D=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),--e.prev_length!=0;);if(e.match_available=0,e.match_length=S-1,e.strstart++,b&&(O(e,!1),e.strm.avail_out===0))return t}else if(e.match_available){if((b=r._tr_tally(e,0,e.window[e.strstart-1]))&&O(e,!1),e.strstart++,e.lookahead--,e.strm.avail_out===0)return t}else e.match_available=1,e.strstart++,e.lookahead--}return e.match_available&&(b=r._tr_tally(e,0,e.window[e.strstart-1]),e.match_available=0),e.insert=e.strstart<S-1?e.strstart:S-1,F===m?(O(e,!0),e.strm.avail_out===0?J:R):e.last_lit&&(O(e,!1),e.strm.avail_out===0)?t:M}function t3(e,F,D,b,_){this.good_length=e,this.max_lazy=F,this.nice_length=D,this.max_chain=b,this.func=_}function l3(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=v,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new d.Buf16(2*y),this.dyn_dtree=new d.Buf16(2*(2*k+1)),this.bl_tree=new d.Buf16(2*(2*P+1)),V(this.dyn_ltree),V(this.dyn_dtree),V(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new d.Buf16(z+1),this.heap=new d.Buf16(2*h+1),V(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new d.Buf16(2*h+1),V(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function s3(e){var F;return e&&e.state?(e.total_in=e.total_out=0,e.data_type=i,(F=e.state).pending=0,F.pending_out=0,F.wrap<0&&(F.wrap=-F.wrap),F.status=F.wrap?C:I,e.adler=F.wrap===2?0:1,F.last_flush=a,r._tr_init(F),o):$(e,l)}function u3(e){var F=s3(e);return F===o&&function(D){D.window_size=2*D.w_size,V(D.head),D.max_lazy_match=u[D.level].max_lazy,D.good_match=u[D.level].good_length,D.nice_match=u[D.level].nice_length,D.max_chain_length=u[D.level].max_chain,D.strstart=0,D.block_start=0,D.lookahead=0,D.insert=0,D.match_length=D.prev_length=S-1,D.match_available=0,D.ins_h=0}(e.state),F}function d3(e,F,D,b,_,E){if(!e)return l;var G=1;if(F===n&&(F=6),b<0?(G=0,b=-b):15<b&&(G=2,b-=16),_<1||B<_||D!==v||b<8||15<b||F<0||9<F||E<0||c<E)return $(e,l);b===8&&(b=9);var W=new l3;return(e.state=W).strm=e,W.wrap=G,W.gzhead=null,W.w_bits=b,W.w_size=1<<W.w_bits,W.w_mask=W.w_size-1,W.hash_bits=_+7,W.hash_size=1<<W.hash_bits,W.hash_mask=W.hash_size-1,W.hash_shift=~~((W.hash_bits+S-1)/S),W.window=new d.Buf8(2*W.w_size),W.head=new d.Buf16(W.hash_size),W.prev=new d.Buf16(W.w_size),W.lit_bufsize=1<<_+6,W.pending_buf_size=4*W.lit_bufsize,W.pending_buf=new d.Buf8(W.pending_buf_size),W.d_buf=1*W.lit_bufsize,W.l_buf=3*W.lit_bufsize,W.level=F,W.strategy=E,W.method=D,u3(e)}u=[new t3(0,0,0,0,function(e,F){var D=65535;for(D>e.pending_buf_size-5&&(D=e.pending_buf_size-5);;){if(e.lookahead<=1){if(o3(e),e.lookahead===0&&F===a)return t;if(e.lookahead===0)break}e.strstart+=e.lookahead,e.lookahead=0;var b=e.block_start+D;if((e.strstart===0||e.strstart>=b)&&(e.lookahead=e.strstart-b,e.strstart=b,O(e,!1),e.strm.avail_out===0)||e.strstart-e.block_start>=e.w_size-U&&(O(e,!1),e.strm.avail_out===0))return t}return e.insert=0,F===m?(O(e,!0),e.strm.avail_out===0?J:R):(e.strstart>e.block_start&&(O(e,!1),e.strm.avail_out),t)}),new t3(4,4,8,4,n3),new t3(4,5,16,8,n3),new t3(4,6,32,32,n3),new t3(4,4,16,16,r3),new t3(8,16,32,32,r3),new t3(8,16,128,128,r3),new t3(8,32,128,256,r3),new t3(32,128,258,1024,r3),new t3(32,258,258,4096,r3)],g.deflateInit=function(e,F){return d3(e,F,v,15,8,0)},g.deflateInit2=d3,g.deflateReset=u3,g.deflateResetKeep=s3,g.deflateSetHeader=function(e,F){return e&&e.state?e.state.wrap!==2?l:(e.state.gzhead=F,o):l},g.deflate=function(e,F){var D,b,_,E;if(!e||!e.state||5<F||F<0)return e?$(e,l):l;if(b=e.state,!e.output||!e.input&&e.avail_in!==0||b.status===666&&F!==m)return $(e,e.avail_out===0?-5:l);if(b.strm=e,D=b.last_flush,b.last_flush=F,b.status===C)if(b.wrap===2)e.adler=0,Q(b,31),Q(b,139),Q(b,8),b.gzhead?(Q(b,(b.gzhead.text?1:0)+(b.gzhead.hcrc?2:0)+(b.gzhead.extra?4:0)+(b.gzhead.name?8:0)+(b.gzhead.comment?16:0)),Q(b,255&b.gzhead.time),Q(b,b.gzhead.time>>8&255),Q(b,b.gzhead.time>>16&255),Q(b,b.gzhead.time>>24&255),Q(b,b.level===9?2:2<=b.strategy||b.level<2?4:0),Q(b,255&b.gzhead.os),b.gzhead.extra&&b.gzhead.extra.length&&(Q(b,255&b.gzhead.extra.length),Q(b,b.gzhead.extra.length>>8&255)),b.gzhead.hcrc&&(e.adler=p(e.adler,b.pending_buf,b.pending,0)),b.gzindex=0,b.status=69):(Q(b,0),Q(b,0),Q(b,0),Q(b,0),Q(b,0),Q(b,b.level===9?2:2<=b.strategy||b.level<2?4:0),Q(b,3),b.status=I);else{var G=v+(b.w_bits-8<<4)<<8;G|=(2<=b.strategy||b.level<2?0:b.level<6?1:b.level===6?2:3)<<6,b.strstart!==0&&(G|=32),G+=31-G%31,b.status=I,Z(b,G),b.strstart!==0&&(Z(b,e.adler>>>16),Z(b,65535&e.adler)),e.adler=1}if(b.status===69)if(b.gzhead.extra){for(_=b.pending;b.gzindex<(65535&b.gzhead.extra.length)&&(b.pending!==b.pending_buf_size||(b.gzhead.hcrc&&b.pending>_&&(e.adler=p(e.adler,b.pending_buf,b.pending-_,_)),A(e),_=b.pending,b.pending!==b.pending_buf_size));)Q(b,255&b.gzhead.extra[b.gzindex]),b.gzindex++;b.gzhead.hcrc&&b.pending>_&&(e.adler=p(e.adler,b.pending_buf,b.pending-_,_)),b.gzindex===b.gzhead.extra.length&&(b.gzindex=0,b.status=73)}else b.status=73;if(b.status===73)if(b.gzhead.name){_=b.pending;do{if(b.pending===b.pending_buf_size&&(b.gzhead.hcrc&&b.pending>_&&(e.adler=p(e.adler,b.pending_buf,b.pending-_,_)),A(e),_=b.pending,b.pending===b.pending_buf_size)){E=1;break}E=b.gzindex<b.gzhead.name.length?255&b.gzhead.name.charCodeAt(b.gzindex++):0,Q(b,E)}while(E!==0);b.gzhead.hcrc&&b.pending>_&&(e.adler=p(e.adler,b.pending_buf,b.pending-_,_)),E===0&&(b.gzindex=0,b.status=91)}else b.status=91;if(b.status===91)if(b.gzhead.comment){_=b.pending;do{if(b.pending===b.pending_buf_size&&(b.gzhead.hcrc&&b.pending>_&&(e.adler=p(e.adler,b.pending_buf,b.pending-_,_)),A(e),_=b.pending,b.pending===b.pending_buf_size)){E=1;break}E=b.gzindex<b.gzhead.comment.length?255&b.gzhead.comment.charCodeAt(b.gzindex++):0,Q(b,E)}while(E!==0);b.gzhead.hcrc&&b.pending>_&&(e.adler=p(e.adler,b.pending_buf,b.pending-_,_)),E===0&&(b.status=103)}else b.status=103;if(b.status===103&&(b.gzhead.hcrc?(b.pending+2>b.pending_buf_size&&A(e),b.pending+2<=b.pending_buf_size&&(Q(b,255&e.adler),Q(b,e.adler>>8&255),e.adler=0,b.status=I)):b.status=I),b.pending!==0){if(A(e),e.avail_out===0)return b.last_flush=-1,o}else if(e.avail_in===0&&j(F)<=j(D)&&F!==m)return $(e,-5);if(b.status===666&&e.avail_in!==0)return $(e,-5);if(e.avail_in!==0||b.lookahead!==0||F!==a&&b.status!==666){var W=b.strategy===2?function(T,X){for(var q;;){if(T.lookahead===0&&(o3(T),T.lookahead===0)){if(X===a)return t;break}if(T.match_length=0,q=r._tr_tally(T,0,T.window[T.strstart]),T.lookahead--,T.strstart++,q&&(O(T,!1),T.strm.avail_out===0))return t}return T.insert=0,X===m?(O(T,!0),T.strm.avail_out===0?J:R):T.last_lit&&(O(T,!1),T.strm.avail_out===0)?t:M}(b,F):b.strategy===3?function(T,X){for(var q,Y,e3,i3,a3=T.window;;){if(T.lookahead<=N){if(o3(T),T.lookahead<=N&&X===a)return t;if(T.lookahead===0)break}if(T.match_length=0,T.lookahead>=S&&0<T.strstart&&(Y=a3[e3=T.strstart-1])===a3[++e3]&&Y===a3[++e3]&&Y===a3[++e3]){i3=T.strstart+N;do;while(Y===a3[++e3]&&Y===a3[++e3]&&Y===a3[++e3]&&Y===a3[++e3]&&Y===a3[++e3]&&Y===a3[++e3]&&Y===a3[++e3]&&Y===a3[++e3]&&e3<i3);T.match_length=N-(i3-e3),T.match_length>T.lookahead&&(T.match_length=T.lookahead)}if(T.match_length>=S?(q=r._tr_tally(T,1,T.match_length-S),T.lookahead-=T.match_length,T.strstart+=T.match_length,T.match_length=0):(q=r._tr_tally(T,0,T.window[T.strstart]),T.lookahead--,T.strstart++),q&&(O(T,!1),T.strm.avail_out===0))return t}return T.insert=0,X===m?(O(T,!0),T.strm.avail_out===0?J:R):T.last_lit&&(O(T,!1),T.strm.avail_out===0)?t:M}(b,F):u[b.level].func(b,F);if(W!==J&&W!==R||(b.status=666),W===t||W===J)return e.avail_out===0&&(b.last_flush=-1),o;if(W===M&&(F===1?r._tr_align(b):F!==5&&(r._tr_stored_block(b,0,0,!1),F===3&&(V(b.head),b.lookahead===0&&(b.strstart=0,b.block_start=0,b.insert=0))),A(e),e.avail_out===0))return b.last_flush=-1,o}return F!==m?o:b.wrap<=0?1:(b.wrap===2?(Q(b,255&e.adler),Q(b,e.adler>>8&255),Q(b,e.adler>>16&255),Q(b,e.adler>>24&255),Q(b,255&e.total_in),Q(b,e.total_in>>8&255),Q(b,e.total_in>>16&255),Q(b,e.total_in>>24&255)):(Z(b,e.adler>>>16),Z(b,65535&e.adler)),A(e),0<b.wrap&&(b.wrap=-b.wrap),b.pending!==0?o:1)},g.deflateEnd=function(e){var F;return e&&e.state?(F=e.state.status)!==C&&F!==69&&F!==73&&F!==91&&F!==103&&F!==I&&F!==666?$(e,l):(e.state=null,F===I?$(e,-3):o):l},g.deflateSetDictionary=function(e,F){var D,b,_,E,G,W,T,X,q=F.length;if(!e||!e.state||(E=(D=e.state).wrap)===2||E===1&&D.status!==C||D.lookahead)return l;for(E===1&&(e.adler=s(e.adler,F,q,0)),D.wrap=0,q>=D.w_size&&(E===0&&(V(D.head),D.strstart=0,D.block_start=0,D.insert=0),X=new d.Buf8(D.w_size),d.arraySet(X,F,q-D.w_size,D.w_size,0),F=X,q=D.w_size),G=e.avail_in,W=e.next_in,T=e.input,e.avail_in=q,e.next_in=0,e.input=F,o3(D);D.lookahead>=S;){for(b=D.strstart,_=D.lookahead-(S-1);D.ins_h=(D.ins_h<<D.hash_shift^D.window[b+S-1])&D.hash_mask,D.prev[b&D.w_mask]=D.head[D.ins_h],D.head[D.ins_h]=b,b++,--_;);D.strstart=b,D.lookahead=S-1,o3(D)}return D.strstart+=D.lookahead,D.block_start=D.strstart,D.insert=D.lookahead,D.lookahead=0,D.match_length=D.prev_length=S-1,D.match_available=0,e.next_in=W,e.input=T,e.avail_in=G,D.wrap=E,o},g.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(w,x,g){x.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(w,x,g){x.exports=function(u,d){var r,s,p,f,a,m,o,l,n,c,i,v,B,h,k,P,y,z,S,N,U,C,I,t,M;r=u.state,s=u.next_in,t=u.input,p=s+(u.avail_in-5),f=u.next_out,M=u.output,a=f-(d-u.avail_out),m=f+(u.avail_out-257),o=r.dmax,l=r.wsize,n=r.whave,c=r.wnext,i=r.window,v=r.hold,B=r.bits,h=r.lencode,k=r.distcode,P=(1<<r.lenbits)-1,y=(1<<r.distbits)-1;e:do{B<15&&(v+=t[s++]<<B,B+=8,v+=t[s++]<<B,B+=8),z=h[v&P];t:for(;;){if(v>>>=S=z>>>24,B-=S,(S=z>>>16&255)===0)M[f++]=65535&z;else{if(!(16&S)){if(!(64&S)){z=h[(65535&z)+(v&(1<<S)-1)];continue t}if(32&S){r.mode=12;break e}u.msg="invalid literal/length code",r.mode=30;break e}N=65535&z,(S&=15)&&(B<S&&(v+=t[s++]<<B,B+=8),N+=v&(1<<S)-1,v>>>=S,B-=S),B<15&&(v+=t[s++]<<B,B+=8,v+=t[s++]<<B,B+=8),z=k[v&y];r:for(;;){if(v>>>=S=z>>>24,B-=S,!(16&(S=z>>>16&255))){if(!(64&S)){z=k[(65535&z)+(v&(1<<S)-1)];continue r}u.msg="invalid distance code",r.mode=30;break e}if(U=65535&z,B<(S&=15)&&(v+=t[s++]<<B,(B+=8)<S&&(v+=t[s++]<<B,B+=8)),o<(U+=v&(1<<S)-1)){u.msg="invalid distance too far back",r.mode=30;break e}if(v>>>=S,B-=S,(S=f-a)<U){if(n<(S=U-S)&&r.sane){u.msg="invalid distance too far back",r.mode=30;break e}if(I=i,(C=0)===c){if(C+=l-S,S<N){for(N-=S;M[f++]=i[C++],--S;);C=f-U,I=M}}else if(c<S){if(C+=l+c-S,(S-=c)<N){for(N-=S;M[f++]=i[C++],--S;);if(C=0,c<N){for(N-=S=c;M[f++]=i[C++],--S;);C=f-U,I=M}}}else if(C+=c-S,S<N){for(N-=S;M[f++]=i[C++],--S;);C=f-U,I=M}for(;2<N;)M[f++]=I[C++],M[f++]=I[C++],M[f++]=I[C++],N-=3;N&&(M[f++]=I[C++],1<N&&(M[f++]=I[C++]))}else{for(C=f-U;M[f++]=M[C++],M[f++]=M[C++],M[f++]=M[C++],2<(N-=3););N&&(M[f++]=M[C++],1<N&&(M[f++]=M[C++]))}break}}break}}while(s<p&&f<m);s-=N=B>>3,v&=(1<<(B-=N<<3))-1,u.next_in=s,u.next_out=f,u.avail_in=s<p?p-s+5:5-(s-p),u.avail_out=f<m?m-f+257:257-(f-m),r.hold=v,r.bits=B}},{}],49:[function(w,x,g){var u=w("../utils/common"),d=w("./adler32"),r=w("./crc32"),s=w("./inffast"),p=w("./inftrees"),f=1,a=2,m=0,o=-2,l=1,n=852,c=592;function i(C){return(C>>>24&255)+(C>>>8&65280)+((65280&C)<<8)+((255&C)<<24)}function v(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new u.Buf16(320),this.work=new u.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function B(C){var I;return C&&C.state?(I=C.state,C.total_in=C.total_out=I.total=0,C.msg="",I.wrap&&(C.adler=1&I.wrap),I.mode=l,I.last=0,I.havedict=0,I.dmax=32768,I.head=null,I.hold=0,I.bits=0,I.lencode=I.lendyn=new u.Buf32(n),I.distcode=I.distdyn=new u.Buf32(c),I.sane=1,I.back=-1,m):o}function h(C){var I;return C&&C.state?((I=C.state).wsize=0,I.whave=0,I.wnext=0,B(C)):o}function k(C,I){var t,M;return C&&C.state?(M=C.state,I<0?(t=0,I=-I):(t=1+(I>>4),I<48&&(I&=15)),I&&(I<8||15<I)?o:(M.window!==null&&M.wbits!==I&&(M.window=null),M.wrap=t,M.wbits=I,h(C))):o}function P(C,I){var t,M;return C?(M=new v,(C.state=M).window=null,(t=k(C,I))!==m&&(C.state=null),t):o}var y,z,S=!0;function N(C){if(S){var I;for(y=new u.Buf32(512),z=new u.Buf32(32),I=0;I<144;)C.lens[I++]=8;for(;I<256;)C.lens[I++]=9;for(;I<280;)C.lens[I++]=7;for(;I<288;)C.lens[I++]=8;for(p(f,C.lens,0,288,y,0,C.work,{bits:9}),I=0;I<32;)C.lens[I++]=5;p(a,C.lens,0,32,z,0,C.work,{bits:5}),S=!1}C.lencode=y,C.lenbits=9,C.distcode=z,C.distbits=5}function U(C,I,t,M){var J,R=C.state;return R.window===null&&(R.wsize=1<<R.wbits,R.wnext=0,R.whave=0,R.window=new u.Buf8(R.wsize)),M>=R.wsize?(u.arraySet(R.window,I,t-R.wsize,R.wsize,0),R.wnext=0,R.whave=R.wsize):(M<(J=R.wsize-R.wnext)&&(J=M),u.arraySet(R.window,I,t-M,J,R.wnext),(M-=J)?(u.arraySet(R.window,I,t-M,M,0),R.wnext=M,R.whave=R.wsize):(R.wnext+=J,R.wnext===R.wsize&&(R.wnext=0),R.whave<R.wsize&&(R.whave+=J))),0}g.inflateReset=h,g.inflateReset2=k,g.inflateResetKeep=B,g.inflateInit=function(C){return P(C,15)},g.inflateInit2=P,g.inflate=function(C,I){var t,M,J,R,$,j,V,A,O,Q,Z,K,o3,n3,r3,t3,l3,s3,u3,d3,e,F,D,b,_=0,E=new u.Buf8(4),G=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!C||!C.state||!C.output||!C.input&&C.avail_in!==0)return o;(t=C.state).mode===12&&(t.mode=13),$=C.next_out,J=C.output,V=C.avail_out,R=C.next_in,M=C.input,j=C.avail_in,A=t.hold,O=t.bits,Q=j,Z=V,F=m;e:for(;;)switch(t.mode){case l:if(t.wrap===0){t.mode=13;break}for(;O<16;){if(j===0)break e;j--,A+=M[R++]<<O,O+=8}if(2&t.wrap&&A===35615){E[t.check=0]=255&A,E[1]=A>>>8&255,t.check=r(t.check,E,2,0),O=A=0,t.mode=2;break}if(t.flags=0,t.head&&(t.head.done=!1),!(1&t.wrap)||(((255&A)<<8)+(A>>8))%31){C.msg="incorrect header check",t.mode=30;break}if((15&A)!=8){C.msg="unknown compression method",t.mode=30;break}if(O-=4,e=8+(15&(A>>>=4)),t.wbits===0)t.wbits=e;else if(e>t.wbits){C.msg="invalid window size",t.mode=30;break}t.dmax=1<<e,C.adler=t.check=1,t.mode=512&A?10:12,O=A=0;break;case 2:for(;O<16;){if(j===0)break e;j--,A+=M[R++]<<O,O+=8}if(t.flags=A,(255&t.flags)!=8){C.msg="unknown compression method",t.mode=30;break}if(57344&t.flags){C.msg="unknown header flags set",t.mode=30;break}t.head&&(t.head.text=A>>8&1),512&t.flags&&(E[0]=255&A,E[1]=A>>>8&255,t.check=r(t.check,E,2,0)),O=A=0,t.mode=3;case 3:for(;O<32;){if(j===0)break e;j--,A+=M[R++]<<O,O+=8}t.head&&(t.head.time=A),512&t.flags&&(E[0]=255&A,E[1]=A>>>8&255,E[2]=A>>>16&255,E[3]=A>>>24&255,t.check=r(t.check,E,4,0)),O=A=0,t.mode=4;case 4:for(;O<16;){if(j===0)break e;j--,A+=M[R++]<<O,O+=8}t.head&&(t.head.xflags=255&A,t.head.os=A>>8),512&t.flags&&(E[0]=255&A,E[1]=A>>>8&255,t.check=r(t.check,E,2,0)),O=A=0,t.mode=5;case 5:if(1024&t.flags){for(;O<16;){if(j===0)break e;j--,A+=M[R++]<<O,O+=8}t.length=A,t.head&&(t.head.extra_len=A),512&t.flags&&(E[0]=255&A,E[1]=A>>>8&255,t.check=r(t.check,E,2,0)),O=A=0}else t.head&&(t.head.extra=null);t.mode=6;case 6:if(1024&t.flags&&(j<(K=t.length)&&(K=j),K&&(t.head&&(e=t.head.extra_len-t.length,t.head.extra||(t.head.extra=new Array(t.head.extra_len)),u.arraySet(t.head.extra,M,R,K,e)),512&t.flags&&(t.check=r(t.check,M,K,R)),j-=K,R+=K,t.length-=K),t.length))break e;t.length=0,t.mode=7;case 7:if(2048&t.flags){if(j===0)break e;for(K=0;e=M[R+K++],t.head&&e&&t.length<65536&&(t.head.name+=String.fromCharCode(e)),e&&K<j;);if(512&t.flags&&(t.check=r(t.check,M,K,R)),j-=K,R+=K,e)break e}else t.head&&(t.head.name=null);t.length=0,t.mode=8;case 8:if(4096&t.flags){if(j===0)break e;for(K=0;e=M[R+K++],t.head&&e&&t.length<65536&&(t.head.comment+=String.fromCharCode(e)),e&&K<j;);if(512&t.flags&&(t.check=r(t.check,M,K,R)),j-=K,R+=K,e)break e}else t.head&&(t.head.comment=null);t.mode=9;case 9:if(512&t.flags){for(;O<16;){if(j===0)break e;j--,A+=M[R++]<<O,O+=8}if(A!==(65535&t.check)){C.msg="header crc mismatch",t.mode=30;break}O=A=0}t.head&&(t.head.hcrc=t.flags>>9&1,t.head.done=!0),C.adler=t.check=0,t.mode=12;break;case 10:for(;O<32;){if(j===0)break e;j--,A+=M[R++]<<O,O+=8}C.adler=t.check=i(A),O=A=0,t.mode=11;case 11:if(t.havedict===0)return C.next_out=$,C.avail_out=V,C.next_in=R,C.avail_in=j,t.hold=A,t.bits=O,2;C.adler=t.check=1,t.mode=12;case 12:if(I===5||I===6)break e;case 13:if(t.last){A>>>=7&O,O-=7&O,t.mode=27;break}for(;O<3;){if(j===0)break e;j--,A+=M[R++]<<O,O+=8}switch(t.last=1&A,O-=1,3&(A>>>=1)){case 0:t.mode=14;break;case 1:if(N(t),t.mode=20,I!==6)break;A>>>=2,O-=2;break e;case 2:t.mode=17;break;case 3:C.msg="invalid block type",t.mode=30}A>>>=2,O-=2;break;case 14:for(A>>>=7&O,O-=7&O;O<32;){if(j===0)break e;j--,A+=M[R++]<<O,O+=8}if((65535&A)!=(A>>>16^65535)){C.msg="invalid stored block lengths",t.mode=30;break}if(t.length=65535&A,O=A=0,t.mode=15,I===6)break e;case 15:t.mode=16;case 16:if(K=t.length){if(j<K&&(K=j),V<K&&(K=V),K===0)break e;u.arraySet(J,M,R,K,$),j-=K,R+=K,V-=K,$+=K,t.length-=K;break}t.mode=12;break;case 17:for(;O<14;){if(j===0)break e;j--,A+=M[R++]<<O,O+=8}if(t.nlen=257+(31&A),A>>>=5,O-=5,t.ndist=1+(31&A),A>>>=5,O-=5,t.ncode=4+(15&A),A>>>=4,O-=4,286<t.nlen||30<t.ndist){C.msg="too many length or distance symbols",t.mode=30;break}t.have=0,t.mode=18;case 18:for(;t.have<t.ncode;){for(;O<3;){if(j===0)break e;j--,A+=M[R++]<<O,O+=8}t.lens[G[t.have++]]=7&A,A>>>=3,O-=3}for(;t.have<19;)t.lens[G[t.have++]]=0;if(t.lencode=t.lendyn,t.lenbits=7,D={bits:t.lenbits},F=p(0,t.lens,0,19,t.lencode,0,t.work,D),t.lenbits=D.bits,F){C.msg="invalid code lengths set",t.mode=30;break}t.have=0,t.mode=19;case 19:for(;t.have<t.nlen+t.ndist;){for(;t3=(_=t.lencode[A&(1<<t.lenbits)-1])>>>16&255,l3=65535&_,!((r3=_>>>24)<=O);){if(j===0)break e;j--,A+=M[R++]<<O,O+=8}if(l3<16)A>>>=r3,O-=r3,t.lens[t.have++]=l3;else{if(l3===16){for(b=r3+2;O<b;){if(j===0)break e;j--,A+=M[R++]<<O,O+=8}if(A>>>=r3,O-=r3,t.have===0){C.msg="invalid bit length repeat",t.mode=30;break}e=t.lens[t.have-1],K=3+(3&A),A>>>=2,O-=2}else if(l3===17){for(b=r3+3;O<b;){if(j===0)break e;j--,A+=M[R++]<<O,O+=8}O-=r3,e=0,K=3+(7&(A>>>=r3)),A>>>=3,O-=3}else{for(b=r3+7;O<b;){if(j===0)break e;j--,A+=M[R++]<<O,O+=8}O-=r3,e=0,K=11+(127&(A>>>=r3)),A>>>=7,O-=7}if(t.have+K>t.nlen+t.ndist){C.msg="invalid bit length repeat",t.mode=30;break}for(;K--;)t.lens[t.have++]=e}}if(t.mode===30)break;if(t.lens[256]===0){C.msg="invalid code -- missing end-of-block",t.mode=30;break}if(t.lenbits=9,D={bits:t.lenbits},F=p(f,t.lens,0,t.nlen,t.lencode,0,t.work,D),t.lenbits=D.bits,F){C.msg="invalid literal/lengths set",t.mode=30;break}if(t.distbits=6,t.distcode=t.distdyn,D={bits:t.distbits},F=p(a,t.lens,t.nlen,t.ndist,t.distcode,0,t.work,D),t.distbits=D.bits,F){C.msg="invalid distances set",t.mode=30;break}if(t.mode=20,I===6)break e;case 20:t.mode=21;case 21:if(6<=j&&258<=V){C.next_out=$,C.avail_out=V,C.next_in=R,C.avail_in=j,t.hold=A,t.bits=O,s(C,Z),$=C.next_out,J=C.output,V=C.avail_out,R=C.next_in,M=C.input,j=C.avail_in,A=t.hold,O=t.bits,t.mode===12&&(t.back=-1);break}for(t.back=0;t3=(_=t.lencode[A&(1<<t.lenbits)-1])>>>16&255,l3=65535&_,!((r3=_>>>24)<=O);){if(j===0)break e;j--,A+=M[R++]<<O,O+=8}if(t3&&!(240&t3)){for(s3=r3,u3=t3,d3=l3;t3=(_=t.lencode[d3+((A&(1<<s3+u3)-1)>>s3)])>>>16&255,l3=65535&_,!(s3+(r3=_>>>24)<=O);){if(j===0)break e;j--,A+=M[R++]<<O,O+=8}A>>>=s3,O-=s3,t.back+=s3}if(A>>>=r3,O-=r3,t.back+=r3,t.length=l3,t3===0){t.mode=26;break}if(32&t3){t.back=-1,t.mode=12;break}if(64&t3){C.msg="invalid literal/length code",t.mode=30;break}t.extra=15&t3,t.mode=22;case 22:if(t.extra){for(b=t.extra;O<b;){if(j===0)break e;j--,A+=M[R++]<<O,O+=8}t.length+=A&(1<<t.extra)-1,A>>>=t.extra,O-=t.extra,t.back+=t.extra}t.was=t.length,t.mode=23;case 23:for(;t3=(_=t.distcode[A&(1<<t.distbits)-1])>>>16&255,l3=65535&_,!((r3=_>>>24)<=O);){if(j===0)break e;j--,A+=M[R++]<<O,O+=8}if(!(240&t3)){for(s3=r3,u3=t3,d3=l3;t3=(_=t.distcode[d3+((A&(1<<s3+u3)-1)>>s3)])>>>16&255,l3=65535&_,!(s3+(r3=_>>>24)<=O);){if(j===0)break e;j--,A+=M[R++]<<O,O+=8}A>>>=s3,O-=s3,t.back+=s3}if(A>>>=r3,O-=r3,t.back+=r3,64&t3){C.msg="invalid distance code",t.mode=30;break}t.offset=l3,t.extra=15&t3,t.mode=24;case 24:if(t.extra){for(b=t.extra;O<b;){if(j===0)break e;j--,A+=M[R++]<<O,O+=8}t.offset+=A&(1<<t.extra)-1,A>>>=t.extra,O-=t.extra,t.back+=t.extra}if(t.offset>t.dmax){C.msg="invalid distance too far back",t.mode=30;break}t.mode=25;case 25:if(V===0)break e;if(K=Z-V,t.offset>K){if((K=t.offset-K)>t.whave&&t.sane){C.msg="invalid distance too far back",t.mode=30;break}o3=K>t.wnext?(K-=t.wnext,t.wsize-K):t.wnext-K,K>t.length&&(K=t.length),n3=t.window}else n3=J,o3=$-t.offset,K=t.length;for(V<K&&(K=V),V-=K,t.length-=K;J[$++]=n3[o3++],--K;);t.length===0&&(t.mode=21);break;case 26:if(V===0)break e;J[$++]=t.length,V--,t.mode=21;break;case 27:if(t.wrap){for(;O<32;){if(j===0)break e;j--,A|=M[R++]<<O,O+=8}if(Z-=V,C.total_out+=Z,t.total+=Z,Z&&(C.adler=t.check=t.flags?r(t.check,J,Z,$-Z):d(t.check,J,Z,$-Z)),Z=V,(t.flags?A:i(A))!==t.check){C.msg="incorrect data check",t.mode=30;break}O=A=0}t.mode=28;case 28:if(t.wrap&&t.flags){for(;O<32;){if(j===0)break e;j--,A+=M[R++]<<O,O+=8}if(A!==(4294967295&t.total)){C.msg="incorrect length check",t.mode=30;break}O=A=0}t.mode=29;case 29:F=1;break e;case 30:F=-3;break e;case 31:return-4;case 32:default:return o}return C.next_out=$,C.avail_out=V,C.next_in=R,C.avail_in=j,t.hold=A,t.bits=O,(t.wsize||Z!==C.avail_out&&t.mode<30&&(t.mode<27||I!==4))&&U(C,C.output,C.next_out,Z-C.avail_out)?(t.mode=31,-4):(Q-=C.avail_in,Z-=C.avail_out,C.total_in+=Q,C.total_out+=Z,t.total+=Z,t.wrap&&Z&&(C.adler=t.check=t.flags?r(t.check,J,Z,C.next_out-Z):d(t.check,J,Z,C.next_out-Z)),C.data_type=t.bits+(t.last?64:0)+(t.mode===12?128:0)+(t.mode===20||t.mode===15?256:0),(Q==0&&Z===0||I===4)&&F===m&&(F=-5),F)},g.inflateEnd=function(C){if(!C||!C.state)return o;var I=C.state;return I.window&&(I.window=null),C.state=null,m},g.inflateGetHeader=function(C,I){var t;return C&&C.state&&2&(t=C.state).wrap?((t.head=I).done=!1,m):o},g.inflateSetDictionary=function(C,I){var t,M=I.length;return C&&C.state?(t=C.state).wrap!==0&&t.mode!==11?o:t.mode===11&&d(1,I,M,0)!==t.check?-3:U(C,I,M,M)?(t.mode=31,-4):(t.havedict=1,m):o},g.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(w,x,g){var u=w("../utils/common"),d=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],r=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],s=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],p=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];x.exports=function(f,a,m,o,l,n,c,i){var v,B,h,k,P,y,z,S,N,U=i.bits,C=0,I=0,t=0,M=0,J=0,R=0,$=0,j=0,V=0,A=0,O=null,Q=0,Z=new u.Buf16(16),K=new u.Buf16(16),o3=null,n3=0;for(C=0;C<=15;C++)Z[C]=0;for(I=0;I<o;I++)Z[a[m+I]]++;for(J=U,M=15;1<=M&&Z[M]===0;M--);if(M<J&&(J=M),M===0)return l[n++]=20971520,l[n++]=20971520,i.bits=1,0;for(t=1;t<M&&Z[t]===0;t++);for(J<t&&(J=t),C=j=1;C<=15;C++)if(j<<=1,(j-=Z[C])<0)return-1;if(0<j&&(f===0||M!==1))return-1;for(K[1]=0,C=1;C<15;C++)K[C+1]=K[C]+Z[C];for(I=0;I<o;I++)a[m+I]!==0&&(c[K[a[m+I]]++]=I);if(y=f===0?(O=o3=c,19):f===1?(O=d,Q-=257,o3=r,n3-=257,256):(O=s,o3=p,-1),C=t,P=n,$=I=A=0,h=-1,k=(V=1<<(R=J))-1,f===1&&852<V||f===2&&592<V)return 1;for(;;){for(z=C-$,N=c[I]<y?(S=0,c[I]):c[I]>y?(S=o3[n3+c[I]],O[Q+c[I]]):(S=96,0),v=1<<C-$,t=B=1<<R;l[P+(A>>$)+(B-=v)]=z<<24|S<<16|N|0,B!==0;);for(v=1<<C-1;A&v;)v>>=1;if(v!==0?(A&=v-1,A+=v):A=0,I++,--Z[C]==0){if(C===M)break;C=a[m+c[I]]}if(J<C&&(A&k)!==h){for($===0&&($=J),P+=t,j=1<<(R=C-$);R+$<M&&!((j-=Z[R+$])<=0);)R++,j<<=1;if(V+=1<<R,f===1&&852<V||f===2&&592<V)return 1;l[h=A&k]=J<<24|R<<16|P-n|0}}return A!==0&&(l[P+A]=C-$<<24|64<<16|0),i.bits=J,0}},{"../utils/common":41}],51:[function(w,x,g){x.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(w,x,g){var u=w("../utils/common"),d=0,r=1;function s(_){for(var E=_.length;0<=--E;)_[E]=0}var p=0,f=29,a=256,m=a+1+f,o=30,l=19,n=2*m+1,c=15,i=16,v=7,B=256,h=16,k=17,P=18,y=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],z=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],S=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],N=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],U=new Array(2*(m+2));s(U);var C=new Array(2*o);s(C);var I=new Array(512);s(I);var t=new Array(256);s(t);var M=new Array(f);s(M);var J,R,$,j=new Array(o);function V(_,E,G,W,T){this.static_tree=_,this.extra_bits=E,this.extra_base=G,this.elems=W,this.max_length=T,this.has_stree=_&&_.length}function A(_,E){this.dyn_tree=_,this.max_code=0,this.stat_desc=E}function O(_){return _<256?I[_]:I[256+(_>>>7)]}function Q(_,E){_.pending_buf[_.pending++]=255&E,_.pending_buf[_.pending++]=E>>>8&255}function Z(_,E,G){_.bi_valid>i-G?(_.bi_buf|=E<<_.bi_valid&65535,Q(_,_.bi_buf),_.bi_buf=E>>i-_.bi_valid,_.bi_valid+=G-i):(_.bi_buf|=E<<_.bi_valid&65535,_.bi_valid+=G)}function K(_,E,G){Z(_,G[2*E],G[2*E+1])}function o3(_,E){for(var G=0;G|=1&_,_>>>=1,G<<=1,0<--E;);return G>>>1}function n3(_,E,G){var W,T,X=new Array(c+1),q=0;for(W=1;W<=c;W++)X[W]=q=q+G[W-1]<<1;for(T=0;T<=E;T++){var Y=_[2*T+1];Y!==0&&(_[2*T]=o3(X[Y]++,Y))}}function r3(_){var E;for(E=0;E<m;E++)_.dyn_ltree[2*E]=0;for(E=0;E<o;E++)_.dyn_dtree[2*E]=0;for(E=0;E<l;E++)_.bl_tree[2*E]=0;_.dyn_ltree[2*B]=1,_.opt_len=_.static_len=0,_.last_lit=_.matches=0}function t3(_){8<_.bi_valid?Q(_,_.bi_buf):0<_.bi_valid&&(_.pending_buf[_.pending++]=_.bi_buf),_.bi_buf=0,_.bi_valid=0}function l3(_,E,G,W){var T=2*E,X=2*G;return _[T]<_[X]||_[T]===_[X]&&W[E]<=W[G]}function s3(_,E,G){for(var W=_.heap[G],T=G<<1;T<=_.heap_len&&(T<_.heap_len&&l3(E,_.heap[T+1],_.heap[T],_.depth)&&T++,!l3(E,W,_.heap[T],_.depth));)_.heap[G]=_.heap[T],G=T,T<<=1;_.heap[G]=W}function u3(_,E,G){var W,T,X,q,Y=0;if(_.last_lit!==0)for(;W=_.pending_buf[_.d_buf+2*Y]<<8|_.pending_buf[_.d_buf+2*Y+1],T=_.pending_buf[_.l_buf+Y],Y++,W===0?K(_,T,E):(K(_,(X=t[T])+a+1,E),(q=y[X])!==0&&Z(_,T-=M[X],q),K(_,X=O(--W),G),(q=z[X])!==0&&Z(_,W-=j[X],q)),Y<_.last_lit;);K(_,B,E)}function d3(_,E){var G,W,T,X=E.dyn_tree,q=E.stat_desc.static_tree,Y=E.stat_desc.has_stree,e3=E.stat_desc.elems,i3=-1;for(_.heap_len=0,_.heap_max=n,G=0;G<e3;G++)X[2*G]!==0?(_.heap[++_.heap_len]=i3=G,_.depth[G]=0):X[2*G+1]=0;for(;_.heap_len<2;)X[2*(T=_.heap[++_.heap_len]=i3<2?++i3:0)]=1,_.depth[T]=0,_.opt_len--,Y&&(_.static_len-=q[2*T+1]);for(E.max_code=i3,G=_.heap_len>>1;1<=G;G--)s3(_,X,G);for(T=e3;G=_.heap[1],_.heap[1]=_.heap[_.heap_len--],s3(_,X,1),W=_.heap[1],_.heap[--_.heap_max]=G,_.heap[--_.heap_max]=W,X[2*T]=X[2*G]+X[2*W],_.depth[T]=(_.depth[G]>=_.depth[W]?_.depth[G]:_.depth[W])+1,X[2*G+1]=X[2*W+1]=T,_.heap[1]=T++,s3(_,X,1),2<=_.heap_len;);_.heap[--_.heap_max]=_.heap[1],function(a3,h3){var g3,k3,_3,c3,A3,R3,w3=h3.dyn_tree,Y3=h3.max_code,y2=h3.stat_desc.static_tree,b2=h3.stat_desc.has_stree,P2=h3.stat_desc.extra_bits,J3=h3.stat_desc.extra_base,C3=h3.stat_desc.max_length,E3=0;for(c3=0;c3<=c;c3++)a3.bl_count[c3]=0;for(w3[2*a3.heap[a3.heap_max]+1]=0,g3=a3.heap_max+1;g3<n;g3++)C3<(c3=w3[2*w3[2*(k3=a3.heap[g3])+1]+1]+1)&&(c3=C3,E3++),w3[2*k3+1]=c3,Y3<k3||(a3.bl_count[c3]++,A3=0,J3<=k3&&(A3=P2[k3-J3]),R3=w3[2*k3],a3.opt_len+=R3*(c3+A3),b2&&(a3.static_len+=R3*(y2[2*k3+1]+A3)));if(E3!==0){do{for(c3=C3-1;a3.bl_count[c3]===0;)c3--;a3.bl_count[c3]--,a3.bl_count[c3+1]+=2,a3.bl_count[C3]--,E3-=2}while(0<E3);for(c3=C3;c3!==0;c3--)for(k3=a3.bl_count[c3];k3!==0;)Y3<(_3=a3.heap[--g3])||(w3[2*_3+1]!==c3&&(a3.opt_len+=(c3-w3[2*_3+1])*w3[2*_3],w3[2*_3+1]=c3),k3--)}}(_,E),n3(X,i3,_.bl_count)}function e(_,E,G){var W,T,X=-1,q=E[1],Y=0,e3=7,i3=4;for(q===0&&(e3=138,i3=3),E[2*(G+1)+1]=65535,W=0;W<=G;W++)T=q,q=E[2*(W+1)+1],++Y<e3&&T===q||(Y<i3?_.bl_tree[2*T]+=Y:T!==0?(T!==X&&_.bl_tree[2*T]++,_.bl_tree[2*h]++):Y<=10?_.bl_tree[2*k]++:_.bl_tree[2*P]++,X=T,i3=(Y=0)===q?(e3=138,3):T===q?(e3=6,3):(e3=7,4))}function F(_,E,G){var W,T,X=-1,q=E[1],Y=0,e3=7,i3=4;for(q===0&&(e3=138,i3=3),W=0;W<=G;W++)if(T=q,q=E[2*(W+1)+1],!(++Y<e3&&T===q)){if(Y<i3)for(;K(_,T,_.bl_tree),--Y!=0;);else T!==0?(T!==X&&(K(_,T,_.bl_tree),Y--),K(_,h,_.bl_tree),Z(_,Y-3,2)):Y<=10?(K(_,k,_.bl_tree),Z(_,Y-3,3)):(K(_,P,_.bl_tree),Z(_,Y-11,7));X=T,i3=(Y=0)===q?(e3=138,3):T===q?(e3=6,3):(e3=7,4)}}s(j);var D=!1;function b(_,E,G,W){Z(_,(p<<1)+(W?1:0),3),function(T,X,q,Y){t3(T),Q(T,q),Q(T,~q),u.arraySet(T.pending_buf,T.window,X,q,T.pending),T.pending+=q}(_,E,G)}g._tr_init=function(_){D||(function(){var E,G,W,T,X,q=new Array(c+1);for(T=W=0;T<f-1;T++)for(M[T]=W,E=0;E<1<<y[T];E++)t[W++]=T;for(t[W-1]=T,T=X=0;T<16;T++)for(j[T]=X,E=0;E<1<<z[T];E++)I[X++]=T;for(X>>=7;T<o;T++)for(j[T]=X<<7,E=0;E<1<<z[T]-7;E++)I[256+X++]=T;for(G=0;G<=c;G++)q[G]=0;for(E=0;E<=143;)U[2*E+1]=8,E++,q[8]++;for(;E<=255;)U[2*E+1]=9,E++,q[9]++;for(;E<=279;)U[2*E+1]=7,E++,q[7]++;for(;E<=287;)U[2*E+1]=8,E++,q[8]++;for(n3(U,m+1,q),E=0;E<o;E++)C[2*E+1]=5,C[2*E]=o3(E,5);J=new V(U,y,a+1,m,c),R=new V(C,z,0,o,c),$=new V(new Array(0),S,0,l,v)}(),D=!0),_.l_desc=new A(_.dyn_ltree,J),_.d_desc=new A(_.dyn_dtree,R),_.bl_desc=new A(_.bl_tree,$),_.bi_buf=0,_.bi_valid=0,r3(_)},g._tr_stored_block=b,g._tr_flush_block=function(_,E,G,W){var T,X,q=0;0<_.level?(_.strm.data_type===2&&(_.strm.data_type=function(Y){var e3,i3=4093624447;for(e3=0;e3<=31;e3++,i3>>>=1)if(1&i3&&Y.dyn_ltree[2*e3]!==0)return d;if(Y.dyn_ltree[18]!==0||Y.dyn_ltree[20]!==0||Y.dyn_ltree[26]!==0)return r;for(e3=32;e3<a;e3++)if(Y.dyn_ltree[2*e3]!==0)return r;return d}(_)),d3(_,_.l_desc),d3(_,_.d_desc),q=function(Y){var e3;for(e(Y,Y.dyn_ltree,Y.l_desc.max_code),e(Y,Y.dyn_dtree,Y.d_desc.max_code),d3(Y,Y.bl_desc),e3=l-1;3<=e3&&Y.bl_tree[2*N[e3]+1]===0;e3--);return Y.opt_len+=3*(e3+1)+5+5+4,e3}(_),T=_.opt_len+3+7>>>3,(X=_.static_len+3+7>>>3)<=T&&(T=X)):T=X=G+5,G+4<=T&&E!==-1?b(_,E,G,W):_.strategy===4||X===T?(Z(_,2+(W?1:0),3),u3(_,U,C)):(Z(_,4+(W?1:0),3),function(Y,e3,i3,a3){var h3;for(Z(Y,e3-257,5),Z(Y,i3-1,5),Z(Y,a3-4,4),h3=0;h3<a3;h3++)Z(Y,Y.bl_tree[2*N[h3]+1],3);F(Y,Y.dyn_ltree,e3-1),F(Y,Y.dyn_dtree,i3-1)}(_,_.l_desc.max_code+1,_.d_desc.max_code+1,q+1),u3(_,_.dyn_ltree,_.dyn_dtree)),r3(_),W&&t3(_)},g._tr_tally=function(_,E,G){return _.pending_buf[_.d_buf+2*_.last_lit]=E>>>8&255,_.pending_buf[_.d_buf+2*_.last_lit+1]=255&E,_.pending_buf[_.l_buf+_.last_lit]=255&G,_.last_lit++,E===0?_.dyn_ltree[2*G]++:(_.matches++,E--,_.dyn_ltree[2*(t[G]+a+1)]++,_.dyn_dtree[2*O(E)]++),_.last_lit===_.lit_bufsize-1},g._tr_align=function(_){Z(_,2,3),K(_,B,U),function(E){E.bi_valid===16?(Q(E,E.bi_buf),E.bi_buf=0,E.bi_valid=0):8<=E.bi_valid&&(E.pending_buf[E.pending++]=255&E.bi_buf,E.bi_buf>>=8,E.bi_valid-=8)}(_)}},{"../utils/common":41}],53:[function(w,x,g){x.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(w,x,g){(function(u){(function(d,r){if(!d.setImmediate){var s,p,f,a,m=1,o={},l=!1,n=d.document,c=Object.getPrototypeOf&&Object.getPrototypeOf(d);c=c&&c.setTimeout?c:d,s={}.toString.call(d.process)==="[object process]"?function(h){process.nextTick(function(){v(h)})}:function(){if(d.postMessage&&!d.importScripts){var h=!0,k=d.onmessage;return d.onmessage=function(){h=!1},d.postMessage("","*"),d.onmessage=k,h}}()?(a="setImmediate$"+Math.random()+"$",d.addEventListener?d.addEventListener("message",B,!1):d.attachEvent("onmessage",B),function(h){d.postMessage(a+h,"*")}):d.MessageChannel?((f=new MessageChannel).port1.onmessage=function(h){v(h.data)},function(h){f.port2.postMessage(h)}):n&&"onreadystatechange"in n.createElement("script")?(p=n.documentElement,function(h){var k=n.createElement("script");k.onreadystatechange=function(){v(h),k.onreadystatechange=null,p.removeChild(k),k=null},p.appendChild(k)}):function(h){setTimeout(v,0,h)},c.setImmediate=function(h){typeof h!="function"&&(h=new Function(""+h));for(var k=new Array(arguments.length-1),P=0;P<k.length;P++)k[P]=arguments[P+1];var y={callback:h,args:k};return o[m]=y,s(m),m++},c.clearImmediate=i}function i(h){delete o[h]}function v(h){if(l)setTimeout(v,0,h);else{var k=o[h];if(k){l=!0;try{(function(P){var y=P.callback,z=P.args;switch(z.length){case 0:y();break;case 1:y(z[0]);break;case 2:y(z[0],z[1]);break;case 3:y(z[0],z[1],z[2]);break;default:y.apply(r,z)}})(k)}finally{i(h),l=!1}}}}function B(h){h.source===d&&typeof h.data=="string"&&h.data.indexOf(a)===0&&v(+h.data.slice(a.length))}})(typeof self>"u"?u===void 0?this:u:self)}).call(this,typeof f3<"u"?f3:typeof self<"u"?self:typeof window<"u"?window:{})},{}]},{},[10])(10)})}(D3)),D3.exports}var $3=V3(),F3=m3($3);const U3=Symbol("Comlink.proxy"),Q3=Symbol("Comlink.endpoint"),q3=Symbol("Comlink.releaseProxy"),z3=Symbol("Comlink.finalizer"),y3=Symbol("Comlink.thrown"),j3=L=>typeof L=="object"&&L!==null||typeof L=="function",e2={canHandle:L=>j3(L)&&L[U3],serialize(L){const{port1:H,port2:w}=new MessageChannel;return O3(L,H),[w,[w]]},deserialize(L){return L.start(),n2(L)}},t2={canHandle:L=>j3(L)&&y3 in L,serialize({value:L}){let H;return L instanceof Error?H={isError:!0,value:{message:L.message,name:L.name,stack:L.stack}}:H={isError:!1,value:L},[H,[]]},deserialize(L){throw L.isError?Object.assign(new Error(L.value.message),L.value):L.value}},W3=new Map([["proxy",e2],["throw",t2]]);function r2(L,H){for(const w of L)if(H===w||w==="*"||w instanceof RegExp&&w.test(H))return!0;return!1}function O3(L,H=globalThis,w=["*"]){H.addEventListener("message",function x(g){if(!g||!g.data)return;if(!r2(w,g.origin)){console.warn(\`Invalid origin '\${g.origin}' for comlink proxy\`);return}const{id:u,type:d,path:r}=Object.assign({path:[]},g.data),s=(g.data.argumentList||[]).map(B3);let p;try{const f=r.slice(0,-1).reduce((m,o)=>m[o],L),a=r.reduce((m,o)=>m[o],L);switch(d){case"GET":p=a;break;case"SET":f[r.slice(-1)[0]]=B3(g.data.value),p=!0;break;case"APPLY":p=a.apply(f,s);break;case"CONSTRUCT":{const m=new a(...s);p=c2(m)}break;case"ENDPOINT":{const{port1:m,port2:o}=new MessageChannel;O3(L,o),p=M3(m,[m])}break;case"RELEASE":p=void 0;break;default:return}}catch(f){p={value:f,[y3]:0}}Promise.resolve(p).catch(f=>({value:f,[y3]:0})).then(f=>{const[a,m]=S3(f);H.postMessage(Object.assign(Object.assign({},a),{id:u}),m),d==="RELEASE"&&(H.removeEventListener("message",x),Z3(H),z3 in L&&typeof L[z3]=="function"&&L[z3]())}).catch(f=>{const[a,m]=S3({value:new TypeError("Unserializable return value"),[y3]:0});H.postMessage(Object.assign(Object.assign({},a),{id:u}),m)})}),H.start&&H.start()}function o2(L){return L.constructor.name==="MessagePort"}function Z3(L){o2(L)&&L.close()}function n2(L,H){const w=new Map;return L.addEventListener("message",function(x){const{data:g}=x;if(!g||!g.id)return;const u=w.get(g.id);if(u)try{u(g)}finally{w.delete(g.id)}}),I3(L,w,[],H)}function b3(L){if(L)throw new Error("Proxy has been released and is not useable")}function G3(L){return v3(L,new Map,{type:"RELEASE"}).then(()=>{Z3(L)})}const P3=new WeakMap,x3="FinalizationRegistry"in globalThis&&new FinalizationRegistry(L=>{const H=(P3.get(L)||0)-1;P3.set(L,H),H===0&&G3(L)});function a2(L,H){const w=(P3.get(H)||0)+1;P3.set(H,w),x3&&x3.register(L,H,L)}function s2(L){x3&&x3.unregister(L)}function I3(L,H,w=[],x=function(){}){let g=!1;const u=new Proxy(x,{get(d,r){if(b3(g),r===q3)return()=>{s2(u),G3(L),H.clear(),g=!0};if(r==="then"){if(w.length===0)return{then:()=>u};const s=v3(L,H,{type:"GET",path:w.map(p=>p.toString())}).then(B3);return s.then.bind(s)}return I3(L,H,[...w,r])},set(d,r,s){b3(g);const[p,f]=S3(s);return v3(L,H,{type:"SET",path:[...w,r].map(a=>a.toString()),value:p},f).then(B3)},apply(d,r,s){b3(g);const p=w[w.length-1];if(p===Q3)return v3(L,H,{type:"ENDPOINT"}).then(B3);if(p==="bind")return I3(L,H,w.slice(0,-1));const[f,a]=H3(s);return v3(L,H,{type:"APPLY",path:w.map(m=>m.toString()),argumentList:f},a).then(B3)},construct(d,r){b3(g);const[s,p]=H3(r);return v3(L,H,{type:"CONSTRUCT",path:w.map(f=>f.toString()),argumentList:s},p).then(B3)}});return a2(u,L),u}function i2(L){return Array.prototype.concat.apply([],L)}function H3(L){const H=L.map(S3);return[H.map(w=>w[0]),i2(H.map(w=>w[1]))]}const X3=new WeakMap;function M3(L,H){return X3.set(L,H),L}function c2(L){return Object.assign(L,{[U3]:!0})}function S3(L){for(const[H,w]of W3)if(w.canHandle(L)){const[x,g]=w.serialize(L);return[{type:"HANDLER",name:H,value:x},g]}return[{type:"RAW",value:L},X3.get(L)||[]]}function B3(L){switch(L.type){case"HANDLER":return W3.get(L.name).deserialize(L.value);case"RAW":return L.value}}function v3(L,H,w,x){return new Promise(g=>{const u=l2();H.set(u,g),L.start&&L.start(),L.postMessage(Object.assign({id:u},w),x)})}function l2(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}var T3={exports:{}},d2=T3.exports,K3;function u2(){return K3||(K3=1,function(L,H){(function(w,x){L.exports=x()})(typeof self<"u"?self:d2,function(){return function(w){var x={};function g(u){if(x[u])return x[u].exports;var d=x[u]={i:u,l:!1,exports:{}};return w[u].call(d.exports,d,d.exports,g),d.l=!0,d.exports}return g.m=w,g.c=x,g.d=function(u,d,r){g.o(u,d)||Object.defineProperty(u,d,{configurable:!1,enumerable:!0,get:r})},g.n=function(u){var d=u&&u.__esModule?function(){return u.default}:function(){return u};return g.d(d,"a",d),d},g.o=function(u,d){return Object.prototype.hasOwnProperty.call(u,d)},g.p="",g(g.s=3)}([function(w,x,g){Object.defineProperty(x,"__esModule",{value:!0});var u=function(){function d(r,s){this.width=s,this.height=r.length/s,this.data=r}return d.createEmpty=function(r,s){return new d(new Uint8ClampedArray(r*s),r)},d.prototype.get=function(r,s){return r<0||r>=this.width||s<0||s>=this.height?!1:!!this.data[s*this.width+r]},d.prototype.set=function(r,s,p){this.data[s*this.width+r]=p?1:0},d.prototype.setRegion=function(r,s,p,f,a){for(var m=s;m<s+f;m++)for(var o=r;o<r+p;o++)this.set(o,m,!!a)},d}();x.BitMatrix=u},function(w,x,g){Object.defineProperty(x,"__esModule",{value:!0});var u=g(2);function d(s,p){return s^p}x.addOrSubtractGF=d;var r=function(){function s(p,f,a){this.primitive=p,this.size=f,this.generatorBase=a,this.expTable=new Array(this.size),this.logTable=new Array(this.size);for(var m=1,o=0;o<this.size;o++)this.expTable[o]=m,m=m*2,m>=this.size&&(m=(m^this.primitive)&this.size-1);for(var o=0;o<this.size-1;o++)this.logTable[this.expTable[o]]=o;this.zero=new u.default(this,Uint8ClampedArray.from([0])),this.one=new u.default(this,Uint8ClampedArray.from([1]))}return s.prototype.multiply=function(p,f){return p===0||f===0?0:this.expTable[(this.logTable[p]+this.logTable[f])%(this.size-1)]},s.prototype.inverse=function(p){if(p===0)throw new Error("Can't invert 0");return this.expTable[this.size-this.logTable[p]-1]},s.prototype.buildMonomial=function(p,f){if(p<0)throw new Error("Invalid monomial degree less than 0");if(f===0)return this.zero;var a=new Uint8ClampedArray(p+1);return a[0]=f,new u.default(this,a)},s.prototype.log=function(p){if(p===0)throw new Error("Can't take log(0)");return this.logTable[p]},s.prototype.exp=function(p){return this.expTable[p]},s}();x.default=r},function(w,x,g){Object.defineProperty(x,"__esModule",{value:!0});var u=g(1),d=function(){function r(s,p){if(p.length===0)throw new Error("No coefficients.");this.field=s;var f=p.length;if(f>1&&p[0]===0){for(var a=1;a<f&&p[a]===0;)a++;if(a===f)this.coefficients=s.zero.coefficients;else{this.coefficients=new Uint8ClampedArray(f-a);for(var m=0;m<this.coefficients.length;m++)this.coefficients[m]=p[a+m]}}else this.coefficients=p}return r.prototype.degree=function(){return this.coefficients.length-1},r.prototype.isZero=function(){return this.coefficients[0]===0},r.prototype.getCoefficient=function(s){return this.coefficients[this.coefficients.length-1-s]},r.prototype.addOrSubtract=function(s){var p;if(this.isZero())return s;if(s.isZero())return this;var f=this.coefficients,a=s.coefficients;f.length>a.length&&(p=[a,f],f=p[0],a=p[1]);for(var m=new Uint8ClampedArray(a.length),o=a.length-f.length,l=0;l<o;l++)m[l]=a[l];for(var l=o;l<a.length;l++)m[l]=u.addOrSubtractGF(f[l-o],a[l]);return new r(this.field,m)},r.prototype.multiply=function(s){if(s===0)return this.field.zero;if(s===1)return this;for(var p=this.coefficients.length,f=new Uint8ClampedArray(p),a=0;a<p;a++)f[a]=this.field.multiply(this.coefficients[a],s);return new r(this.field,f)},r.prototype.multiplyPoly=function(s){if(this.isZero()||s.isZero())return this.field.zero;for(var p=this.coefficients,f=p.length,a=s.coefficients,m=a.length,o=new Uint8ClampedArray(f+m-1),l=0;l<f;l++)for(var n=p[l],c=0;c<m;c++)o[l+c]=u.addOrSubtractGF(o[l+c],this.field.multiply(n,a[c]));return new r(this.field,o)},r.prototype.multiplyByMonomial=function(s,p){if(s<0)throw new Error("Invalid degree less than 0");if(p===0)return this.field.zero;for(var f=this.coefficients.length,a=new Uint8ClampedArray(f+s),m=0;m<f;m++)a[m]=this.field.multiply(this.coefficients[m],p);return new r(this.field,a)},r.prototype.evaluateAt=function(s){var p=0;if(s===0)return this.getCoefficient(0);var f=this.coefficients.length;if(s===1)return this.coefficients.forEach(function(m){p=u.addOrSubtractGF(p,m)}),p;p=this.coefficients[0];for(var a=1;a<f;a++)p=u.addOrSubtractGF(this.field.multiply(s,p),this.coefficients[a]);return p},r}();x.default=d},function(w,x,g){Object.defineProperty(x,"__esModule",{value:!0});var u=g(4),d=g(5),r=g(11),s=g(12);function p(m){var o=s.locate(m);if(!o)return null;for(var l=0,n=o;l<n.length;l++){var c=n[l],i=r.extract(m,c),v=d.decode(i.matrix);if(v)return{binaryData:v.bytes,data:v.text,chunks:v.chunks,version:v.version,location:{topRightCorner:i.mappingFunction(c.dimension,0),topLeftCorner:i.mappingFunction(0,0),bottomRightCorner:i.mappingFunction(c.dimension,c.dimension),bottomLeftCorner:i.mappingFunction(0,c.dimension),topRightFinderPattern:c.topRight,topLeftFinderPattern:c.topLeft,bottomLeftFinderPattern:c.bottomLeft,bottomRightAlignmentPattern:c.alignmentPattern}}}return null}var f={inversionAttempts:"attemptBoth"};function a(m,o,l,n){n===void 0&&(n={});var c=f;Object.keys(c).forEach(function(y){c[y]=n[y]||c[y]});var i=c.inversionAttempts==="attemptBoth"||c.inversionAttempts==="invertFirst",v=c.inversionAttempts==="onlyInvert"||c.inversionAttempts==="invertFirst",B=u.binarize(m,o,l,i),h=B.binarized,k=B.inverted,P=p(v?k:h);return!P&&(c.inversionAttempts==="attemptBoth"||c.inversionAttempts==="invertFirst")&&(P=p(v?h:k)),P}a.default=a,x.default=a},function(w,x,g){Object.defineProperty(x,"__esModule",{value:!0});var u=g(0),d=8,r=24;function s(a,m,o){return a<m?m:a>o?o:a}var p=function(){function a(m,o){this.width=m,this.data=new Uint8ClampedArray(m*o)}return a.prototype.get=function(m,o){return this.data[o*this.width+m]},a.prototype.set=function(m,o,l){this.data[o*this.width+m]=l},a}();function f(a,m,o,l){if(a.length!==m*o*4)throw new Error("Malformed data passed to binarizer.");for(var n=new p(m,o),c=0;c<m;c++)for(var i=0;i<o;i++){var v=a[(i*m+c)*4+0],B=a[(i*m+c)*4+1],h=a[(i*m+c)*4+2];n.set(c,i,.2126*v+.7152*B+.0722*h)}for(var k=Math.ceil(m/d),P=Math.ceil(o/d),y=new p(k,P),z=0;z<P;z++)for(var S=0;S<k;S++){for(var N=0,U=1/0,C=0,i=0;i<d;i++)for(var c=0;c<d;c++){var I=n.get(S*d+c,z*d+i);N+=I,U=Math.min(U,I),C=Math.max(C,I)}var t=N/Math.pow(d,2);if(C-U<=r&&(t=U/2,z>0&&S>0)){var M=(y.get(S,z-1)+2*y.get(S-1,z)+y.get(S-1,z-1))/4;U<M&&(t=M)}y.set(S,z,t)}var J=u.BitMatrix.createEmpty(m,o),R=null;l&&(R=u.BitMatrix.createEmpty(m,o));for(var z=0;z<P;z++)for(var S=0;S<k;S++){for(var $=s(S,2,k-3),j=s(z,2,P-3),N=0,V=-2;V<=2;V++)for(var A=-2;A<=2;A++)N+=y.get($+V,j+A);for(var O=N/25,V=0;V<d;V++)for(var A=0;A<d;A++){var c=S*d+V,i=z*d+A,Q=n.get(c,i);J.set(c,i,Q<=O),l&&R.set(c,i,!(Q<=O))}}return l?{binarized:J,inverted:R}:{binarized:J}}x.binarize=f},function(w,x,g){Object.defineProperty(x,"__esModule",{value:!0});var u=g(0),d=g(6),r=g(9),s=g(10);function p(h,k){for(var P=h^k,y=0;P;)y++,P&=P-1;return y}function f(h,k){return k<<1|h}var a=[{bits:21522,formatInfo:{errorCorrectionLevel:1,dataMask:0}},{bits:20773,formatInfo:{errorCorrectionLevel:1,dataMask:1}},{bits:24188,formatInfo:{errorCorrectionLevel:1,dataMask:2}},{bits:23371,formatInfo:{errorCorrectionLevel:1,dataMask:3}},{bits:17913,formatInfo:{errorCorrectionLevel:1,dataMask:4}},{bits:16590,formatInfo:{errorCorrectionLevel:1,dataMask:5}},{bits:20375,formatInfo:{errorCorrectionLevel:1,dataMask:6}},{bits:19104,formatInfo:{errorCorrectionLevel:1,dataMask:7}},{bits:30660,formatInfo:{errorCorrectionLevel:0,dataMask:0}},{bits:29427,formatInfo:{errorCorrectionLevel:0,dataMask:1}},{bits:32170,formatInfo:{errorCorrectionLevel:0,dataMask:2}},{bits:30877,formatInfo:{errorCorrectionLevel:0,dataMask:3}},{bits:26159,formatInfo:{errorCorrectionLevel:0,dataMask:4}},{bits:25368,formatInfo:{errorCorrectionLevel:0,dataMask:5}},{bits:27713,formatInfo:{errorCorrectionLevel:0,dataMask:6}},{bits:26998,formatInfo:{errorCorrectionLevel:0,dataMask:7}},{bits:5769,formatInfo:{errorCorrectionLevel:3,dataMask:0}},{bits:5054,formatInfo:{errorCorrectionLevel:3,dataMask:1}},{bits:7399,formatInfo:{errorCorrectionLevel:3,dataMask:2}},{bits:6608,formatInfo:{errorCorrectionLevel:3,dataMask:3}},{bits:1890,formatInfo:{errorCorrectionLevel:3,dataMask:4}},{bits:597,formatInfo:{errorCorrectionLevel:3,dataMask:5}},{bits:3340,formatInfo:{errorCorrectionLevel:3,dataMask:6}},{bits:2107,formatInfo:{errorCorrectionLevel:3,dataMask:7}},{bits:13663,formatInfo:{errorCorrectionLevel:2,dataMask:0}},{bits:12392,formatInfo:{errorCorrectionLevel:2,dataMask:1}},{bits:16177,formatInfo:{errorCorrectionLevel:2,dataMask:2}},{bits:14854,formatInfo:{errorCorrectionLevel:2,dataMask:3}},{bits:9396,formatInfo:{errorCorrectionLevel:2,dataMask:4}},{bits:8579,formatInfo:{errorCorrectionLevel:2,dataMask:5}},{bits:11994,formatInfo:{errorCorrectionLevel:2,dataMask:6}},{bits:11245,formatInfo:{errorCorrectionLevel:2,dataMask:7}}],m=[function(h){return(h.y+h.x)%2===0},function(h){return h.y%2===0},function(h){return h.x%3===0},function(h){return(h.y+h.x)%3===0},function(h){return(Math.floor(h.y/2)+Math.floor(h.x/3))%2===0},function(h){return h.x*h.y%2+h.x*h.y%3===0},function(h){return(h.y*h.x%2+h.y*h.x%3)%2===0},function(h){return((h.y+h.x)%2+h.y*h.x%3)%2===0}];function o(h){var k=17+4*h.versionNumber,P=u.BitMatrix.createEmpty(k,k);P.setRegion(0,0,9,9,!0),P.setRegion(k-8,0,8,9,!0),P.setRegion(0,k-8,9,8,!0);for(var y=0,z=h.alignmentPatternCenters;y<z.length;y++)for(var S=z[y],N=0,U=h.alignmentPatternCenters;N<U.length;N++){var C=U[N];S===6&&C===6||S===6&&C===k-7||S===k-7&&C===6||P.setRegion(S-2,C-2,5,5,!0)}return P.setRegion(6,9,1,k-17,!0),P.setRegion(9,6,k-17,1,!0),h.versionNumber>6&&(P.setRegion(k-11,0,3,6,!0),P.setRegion(0,k-11,6,3,!0)),P}function l(h,k,P){for(var y=m[P.dataMask],z=h.height,S=o(k),N=[],U=0,C=0,I=!0,t=z-1;t>0;t-=2){t===6&&t--;for(var M=0;M<z;M++)for(var J=I?z-1-M:M,R=0;R<2;R++){var $=t-R;if(!S.get($,J)){C++;var j=h.get($,J);y({y:J,x:$})&&(j=!j),U=f(j,U),C===8&&(N.push(U),C=0,U=0)}}I=!I}return N}function n(h){var k=h.height,P=Math.floor((k-17)/4);if(P<=6)return s.VERSIONS[P-1];for(var y=0,z=5;z>=0;z--)for(var S=k-9;S>=k-11;S--)y=f(h.get(S,z),y);for(var N=0,S=5;S>=0;S--)for(var z=k-9;z>=k-11;z--)N=f(h.get(S,z),N);for(var U=1/0,C,I=0,t=s.VERSIONS;I<t.length;I++){var M=t[I];if(M.infoBits===y||M.infoBits===N)return M;var J=p(y,M.infoBits);J<U&&(C=M,U=J),J=p(N,M.infoBits),J<U&&(C=M,U=J)}if(U<=3)return C}function c(h){for(var k=0,P=0;P<=8;P++)P!==6&&(k=f(h.get(P,8),k));for(var y=7;y>=0;y--)y!==6&&(k=f(h.get(8,y),k));for(var z=h.height,S=0,y=z-1;y>=z-7;y--)S=f(h.get(8,y),S);for(var P=z-8;P<z;P++)S=f(h.get(P,8),S);for(var N=1/0,U=null,C=0,I=a;C<I.length;C++){var t=I[C],M=t.bits,J=t.formatInfo;if(M===k||M===S)return J;var R=p(k,M);R<N&&(U=J,N=R),k!==S&&(R=p(S,M),R<N&&(U=J,N=R))}return N<=3?U:null}function i(h,k,P){var y=k.errorCorrectionLevels[P],z=[],S=0;if(y.ecBlocks.forEach(function(j){for(var V=0;V<j.numBlocks;V++)z.push({numDataCodewords:j.dataCodewordsPerBlock,codewords:[]}),S+=j.dataCodewordsPerBlock+y.ecCodewordsPerBlock}),h.length<S)return null;h=h.slice(0,S);for(var N=y.ecBlocks[0].dataCodewordsPerBlock,U=0;U<N;U++)for(var C=0,I=z;C<I.length;C++){var t=I[C];t.codewords.push(h.shift())}if(y.ecBlocks.length>1)for(var M=y.ecBlocks[0].numBlocks,J=y.ecBlocks[1].numBlocks,U=0;U<J;U++)z[M+U].codewords.push(h.shift());for(;h.length>0;)for(var R=0,$=z;R<$.length;R++){var t=$[R];t.codewords.push(h.shift())}return z}function v(h){var k=n(h);if(!k)return null;var P=c(h);if(!P)return null;var y=l(h,k,P),z=i(y,k,P.errorCorrectionLevel);if(!z)return null;for(var S=z.reduce(function(R,$){return R+$.numDataCodewords},0),N=new Uint8ClampedArray(S),U=0,C=0,I=z;C<I.length;C++){var t=I[C],M=r.decode(t.codewords,t.codewords.length-t.numDataCodewords);if(!M)return null;for(var J=0;J<t.numDataCodewords;J++)N[U++]=M[J]}try{return d.decode(N,k.versionNumber)}catch{return null}}function B(h){if(h==null)return null;var k=v(h);if(k)return k;for(var P=0;P<h.width;P++)for(var y=P+1;y<h.height;y++)h.get(P,y)!==h.get(y,P)&&(h.set(P,y,!h.get(P,y)),h.set(y,P,!h.get(y,P)));return v(h)}x.decode=B},function(w,x,g){Object.defineProperty(x,"__esModule",{value:!0});var u=g(7),d=g(8),r;(function(n){n.Numeric="numeric",n.Alphanumeric="alphanumeric",n.Byte="byte",n.Kanji="kanji",n.ECI="eci"})(r=x.Mode||(x.Mode={}));var s;(function(n){n[n.Terminator=0]="Terminator",n[n.Numeric=1]="Numeric",n[n.Alphanumeric=2]="Alphanumeric",n[n.Byte=4]="Byte",n[n.Kanji=8]="Kanji",n[n.ECI=7]="ECI"})(s||(s={}));function p(n,c){for(var i=[],v="",B=[10,12,14][c],h=n.readBits(B);h>=3;){var k=n.readBits(10);if(k>=1e3)throw new Error("Invalid numeric value above 999");var P=Math.floor(k/100),y=Math.floor(k/10)%10,z=k%10;i.push(48+P,48+y,48+z),v+=P.toString()+y.toString()+z.toString(),h-=3}if(h===2){var k=n.readBits(7);if(k>=100)throw new Error("Invalid numeric value above 99");var P=Math.floor(k/10),y=k%10;i.push(48+P,48+y),v+=P.toString()+y.toString()}else if(h===1){var k=n.readBits(4);if(k>=10)throw new Error("Invalid numeric value above 9");i.push(48+k),v+=k.toString()}return{bytes:i,text:v}}var f=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function a(n,c){for(var i=[],v="",B=[9,11,13][c],h=n.readBits(B);h>=2;){var k=n.readBits(11),P=Math.floor(k/45),y=k%45;i.push(f[P].charCodeAt(0),f[y].charCodeAt(0)),v+=f[P]+f[y],h-=2}if(h===1){var P=n.readBits(6);i.push(f[P].charCodeAt(0)),v+=f[P]}return{bytes:i,text:v}}function m(n,c){for(var i=[],v="",B=[8,16,16][c],h=n.readBits(B),k=0;k<h;k++){var P=n.readBits(8);i.push(P)}try{v+=decodeURIComponent(i.map(function(y){return"%"+("0"+y.toString(16)).substr(-2)}).join(""))}catch{}return{bytes:i,text:v}}function o(n,c){for(var i=[],v="",B=[8,10,12][c],h=n.readBits(B),k=0;k<h;k++){var P=n.readBits(13),y=Math.floor(P/192)<<8|P%192;y<7936?y+=33088:y+=49472,i.push(y>>8,y&255),v+=String.fromCharCode(d.shiftJISTable[y])}return{bytes:i,text:v}}function l(n,c){for(var i,v,B,h,k=new u.BitStream(n),P=c<=9?0:c<=26?1:2,y={text:"",bytes:[],chunks:[],version:c};k.available()>=4;){var z=k.readBits(4);if(z===s.Terminator)return y;if(z===s.ECI)k.readBits(1)===0?y.chunks.push({type:r.ECI,assignmentNumber:k.readBits(7)}):k.readBits(1)===0?y.chunks.push({type:r.ECI,assignmentNumber:k.readBits(14)}):k.readBits(1)===0?y.chunks.push({type:r.ECI,assignmentNumber:k.readBits(21)}):y.chunks.push({type:r.ECI,assignmentNumber:-1});else if(z===s.Numeric){var S=p(k,P);y.text+=S.text,(i=y.bytes).push.apply(i,S.bytes),y.chunks.push({type:r.Numeric,text:S.text})}else if(z===s.Alphanumeric){var N=a(k,P);y.text+=N.text,(v=y.bytes).push.apply(v,N.bytes),y.chunks.push({type:r.Alphanumeric,text:N.text})}else if(z===s.Byte){var U=m(k,P);y.text+=U.text,(B=y.bytes).push.apply(B,U.bytes),y.chunks.push({type:r.Byte,bytes:U.bytes,text:U.text})}else if(z===s.Kanji){var C=o(k,P);y.text+=C.text,(h=y.bytes).push.apply(h,C.bytes),y.chunks.push({type:r.Kanji,bytes:C.bytes,text:C.text})}}if(k.available()===0||k.readBits(k.available())===0)return y}x.decode=l},function(w,x,g){Object.defineProperty(x,"__esModule",{value:!0});var u=function(){function d(r){this.byteOffset=0,this.bitOffset=0,this.bytes=r}return d.prototype.readBits=function(r){if(r<1||r>32||r>this.available())throw new Error("Cannot read "+r.toString()+" bits");var s=0;if(this.bitOffset>0){var p=8-this.bitOffset,f=r<p?r:p,a=p-f,m=255>>8-f<<a;s=(this.bytes[this.byteOffset]&m)>>a,r-=f,this.bitOffset+=f,this.bitOffset===8&&(this.bitOffset=0,this.byteOffset++)}if(r>0){for(;r>=8;)s=s<<8|this.bytes[this.byteOffset]&255,this.byteOffset++,r-=8;if(r>0){var a=8-r,m=255>>a<<a;s=s<<r|(this.bytes[this.byteOffset]&m)>>a,this.bitOffset+=r}}return s},d.prototype.available=function(){return 8*(this.bytes.length-this.byteOffset)-this.bitOffset},d}();x.BitStream=u},function(w,x,g){Object.defineProperty(x,"__esModule",{value:!0}),x.shiftJISTable={32:32,33:33,34:34,35:35,36:36,37:37,38:38,39:39,40:40,41:41,42:42,43:43,44:44,45:45,46:46,47:47,48:48,49:49,50:50,51:51,52:52,53:53,54:54,55:55,56:56,57:57,58:58,59:59,60:60,61:61,62:62,63:63,64:64,65:65,66:66,67:67,68:68,69:69,70:70,71:71,72:72,73:73,74:74,75:75,76:76,77:77,78:78,79:79,80:80,81:81,82:82,83:83,84:84,85:85,86:86,87:87,88:88,89:89,90:90,91:91,92:165,93:93,94:94,95:95,96:96,97:97,98:98,99:99,100:100,101:101,102:102,103:103,104:104,105:105,106:106,107:107,108:108,109:109,110:110,111:111,112:112,113:113,114:114,115:115,116:116,117:117,118:118,119:119,120:120,121:121,122:122,123:123,124:124,125:125,126:8254,33088:12288,33089:12289,33090:12290,33091:65292,33092:65294,33093:12539,33094:65306,33095:65307,33096:65311,33097:65281,33098:12443,33099:12444,33100:180,33101:65344,33102:168,33103:65342,33104:65507,33105:65343,33106:12541,33107:12542,33108:12445,33109:12446,33110:12291,33111:20189,33112:12293,33113:12294,33114:12295,33115:12540,33116:8213,33117:8208,33118:65295,33119:92,33120:12316,33121:8214,33122:65372,33123:8230,33124:8229,33125:8216,33126:8217,33127:8220,33128:8221,33129:65288,33130:65289,33131:12308,33132:12309,33133:65339,33134:65341,33135:65371,33136:65373,33137:12296,33138:12297,33139:12298,33140:12299,33141:12300,33142:12301,33143:12302,33144:12303,33145:12304,33146:12305,33147:65291,33148:8722,33149:177,33150:215,33152:247,33153:65309,33154:8800,33155:65308,33156:65310,33157:8806,33158:8807,33159:8734,33160:8756,33161:9794,33162:9792,33163:176,33164:8242,33165:8243,33166:8451,33167:65509,33168:65284,33169:162,33170:163,33171:65285,33172:65283,33173:65286,33174:65290,33175:65312,33176:167,33177:9734,33178:9733,33179:9675,33180:9679,33181:9678,33182:9671,33183:9670,33184:9633,33185:9632,33186:9651,33187:9650,33188:9661,33189:9660,33190:8251,33191:12306,33192:8594,33193:8592,33194:8593,33195:8595,33196:12307,33208:8712,33209:8715,33210:8838,33211:8839,33212:8834,33213:8835,33214:8746,33215:8745,33224:8743,33225:8744,33226:172,33227:8658,33228:8660,33229:8704,33230:8707,33242:8736,33243:8869,33244:8978,33245:8706,33246:8711,33247:8801,33248:8786,33249:8810,33250:8811,33251:8730,33252:8765,33253:8733,33254:8757,33255:8747,33256:8748,33264:8491,33265:8240,33266:9839,33267:9837,33268:9834,33269:8224,33270:8225,33271:182,33276:9711,33359:65296,33360:65297,33361:65298,33362:65299,33363:65300,33364:65301,33365:65302,33366:65303,33367:65304,33368:65305,33376:65313,33377:65314,33378:65315,33379:65316,33380:65317,33381:65318,33382:65319,33383:65320,33384:65321,33385:65322,33386:65323,33387:65324,33388:65325,33389:65326,33390:65327,33391:65328,33392:65329,33393:65330,33394:65331,33395:65332,33396:65333,33397:65334,33398:65335,33399:65336,33400:65337,33401:65338,33409:65345,33410:65346,33411:65347,33412:65348,33413:65349,33414:65350,33415:65351,33416:65352,33417:65353,33418:65354,33419:65355,33420:65356,33421:65357,33422:65358,33423:65359,33424:65360,33425:65361,33426:65362,33427:65363,33428:65364,33429:65365,33430:65366,33431:65367,33432:65368,33433:65369,33434:65370,33439:12353,33440:12354,33441:12355,33442:12356,33443:12357,33444:12358,33445:12359,33446:12360,33447:12361,33448:12362,33449:12363,33450:12364,33451:12365,33452:12366,33453:12367,33454:12368,33455:12369,33456:12370,33457:12371,33458:12372,33459:12373,33460:12374,33461:12375,33462:12376,33463:12377,33464:12378,33465:12379,33466:12380,33467:12381,33468:12382,33469:12383,33470:12384,33471:12385,33472:12386,33473:12387,33474:12388,33475:12389,33476:12390,33477:12391,33478:12392,33479:12393,33480:12394,33481:12395,33482:12396,33483:12397,33484:12398,33485:12399,33486:12400,33487:12401,33488:12402,33489:12403,33490:12404,33491:12405,33492:12406,33493:12407,33494:12408,33495:12409,33496:12410,33497:12411,33498:12412,33499:12413,33500:12414,33501:12415,33502:12416,33503:12417,33504:12418,33505:12419,33506:12420,33507:12421,33508:12422,33509:12423,33510:12424,33511:12425,33512:12426,33513:12427,33514:12428,33515:12429,33516:12430,33517:12431,33518:12432,33519:12433,33520:12434,33521:12435,33600:12449,33601:12450,33602:12451,33603:12452,33604:12453,33605:12454,33606:12455,33607:12456,33608:12457,33609:12458,33610:12459,33611:12460,33612:12461,33613:12462,33614:12463,33615:12464,33616:12465,33617:12466,33618:12467,33619:12468,33620:12469,33621:12470,33622:12471,33623:12472,33624:12473,33625:12474,33626:12475,33627:12476,33628:12477,33629:12478,33630:12479,33631:12480,33632:12481,33633:12482,33634:12483,33635:12484,33636:12485,33637:12486,33638:12487,33639:12488,33640:12489,33641:12490,33642:12491,33643:12492,33644:12493,33645:12494,33646:12495,33647:12496,33648:12497,33649:12498,33650:12499,33651:12500,33652:12501,33653:12502,33654:12503,33655:12504,33656:12505,33657:12506,33658:12507,33659:12508,33660:12509,33661:12510,33662:12511,33664:12512,33665:12513,33666:12514,33667:12515,33668:12516,33669:12517,33670:12518,33671:12519,33672:12520,33673:12521,33674:12522,33675:12523,33676:12524,33677:12525,33678:12526,33679:12527,33680:12528,33681:12529,33682:12530,33683:12531,33684:12532,33685:12533,33686:12534,33695:913,33696:914,33697:915,33698:916,33699:917,33700:918,33701:919,33702:920,33703:921,33704:922,33705:923,33706:924,33707:925,33708:926,33709:927,33710:928,33711:929,33712:931,33713:932,33714:933,33715:934,33716:935,33717:936,33718:937,33727:945,33728:946,33729:947,33730:948,33731:949,33732:950,33733:951,33734:952,33735:953,33736:954,33737:955,33738:956,33739:957,33740:958,33741:959,33742:960,33743:961,33744:963,33745:964,33746:965,33747:966,33748:967,33749:968,33750:969,33856:1040,33857:1041,33858:1042,33859:1043,33860:1044,33861:1045,33862:1025,33863:1046,33864:1047,33865:1048,33866:1049,33867:1050,33868:1051,33869:1052,33870:1053,33871:1054,33872:1055,33873:1056,33874:1057,33875:1058,33876:1059,33877:1060,33878:1061,33879:1062,33880:1063,33881:1064,33882:1065,33883:1066,33884:1067,33885:1068,33886:1069,33887:1070,33888:1071,33904:1072,33905:1073,33906:1074,33907:1075,33908:1076,33909:1077,33910:1105,33911:1078,33912:1079,33913:1080,33914:1081,33915:1082,33916:1083,33917:1084,33918:1085,33920:1086,33921:1087,33922:1088,33923:1089,33924:1090,33925:1091,33926:1092,33927:1093,33928:1094,33929:1095,33930:1096,33931:1097,33932:1098,33933:1099,33934:1100,33935:1101,33936:1102,33937:1103,33951:9472,33952:9474,33953:9484,33954:9488,33955:9496,33956:9492,33957:9500,33958:9516,33959:9508,33960:9524,33961:9532,33962:9473,33963:9475,33964:9487,33965:9491,33966:9499,33967:9495,33968:9507,33969:9523,33970:9515,33971:9531,33972:9547,33973:9504,33974:9519,33975:9512,33976:9527,33977:9535,33978:9501,33979:9520,33980:9509,33981:9528,33982:9538,34975:20124,34976:21782,34977:23043,34978:38463,34979:21696,34980:24859,34981:25384,34982:23030,34983:36898,34984:33909,34985:33564,34986:31312,34987:24746,34988:25569,34989:28197,34990:26093,34991:33894,34992:33446,34993:39925,34994:26771,34995:22311,34996:26017,34997:25201,34998:23451,34999:22992,35e3:34427,35001:39156,35002:32098,35003:32190,35004:39822,35005:25110,35006:31903,35007:34999,35008:23433,35009:24245,35010:25353,35011:26263,35012:26696,35013:38343,35014:38797,35015:26447,35016:20197,35017:20234,35018:20301,35019:20381,35020:20553,35021:22258,35022:22839,35023:22996,35024:23041,35025:23561,35026:24799,35027:24847,35028:24944,35029:26131,35030:26885,35031:28858,35032:30031,35033:30064,35034:31227,35035:32173,35036:32239,35037:32963,35038:33806,35039:34915,35040:35586,35041:36949,35042:36986,35043:21307,35044:20117,35045:20133,35046:22495,35047:32946,35048:37057,35049:30959,35050:19968,35051:22769,35052:28322,35053:36920,35054:31282,35055:33576,35056:33419,35057:39983,35058:20801,35059:21360,35060:21693,35061:21729,35062:22240,35063:23035,35064:24341,35065:39154,35066:28139,35067:32996,35068:34093,35136:38498,35137:38512,35138:38560,35139:38907,35140:21515,35141:21491,35142:23431,35143:28879,35144:32701,35145:36802,35146:38632,35147:21359,35148:40284,35149:31418,35150:19985,35151:30867,35152:33276,35153:28198,35154:22040,35155:21764,35156:27421,35157:34074,35158:39995,35159:23013,35160:21417,35161:28006,35162:29916,35163:38287,35164:22082,35165:20113,35166:36939,35167:38642,35168:33615,35169:39180,35170:21473,35171:21942,35172:23344,35173:24433,35174:26144,35175:26355,35176:26628,35177:27704,35178:27891,35179:27945,35180:29787,35181:30408,35182:31310,35183:38964,35184:33521,35185:34907,35186:35424,35187:37613,35188:28082,35189:30123,35190:30410,35191:39365,35192:24742,35193:35585,35194:36234,35195:38322,35196:27022,35197:21421,35198:20870,35200:22290,35201:22576,35202:22852,35203:23476,35204:24310,35205:24616,35206:25513,35207:25588,35208:27839,35209:28436,35210:28814,35211:28948,35212:29017,35213:29141,35214:29503,35215:32257,35216:33398,35217:33489,35218:34199,35219:36960,35220:37467,35221:40219,35222:22633,35223:26044,35224:27738,35225:29989,35226:20985,35227:22830,35228:22885,35229:24448,35230:24540,35231:25276,35232:26106,35233:27178,35234:27431,35235:27572,35236:29579,35237:32705,35238:35158,35239:40236,35240:40206,35241:40644,35242:23713,35243:27798,35244:33659,35245:20740,35246:23627,35247:25014,35248:33222,35249:26742,35250:29281,35251:20057,35252:20474,35253:21368,35254:24681,35255:28201,35256:31311,35257:38899,35258:19979,35259:21270,35260:20206,35261:20309,35262:20285,35263:20385,35264:20339,35265:21152,35266:21487,35267:22025,35268:22799,35269:23233,35270:23478,35271:23521,35272:31185,35273:26247,35274:26524,35275:26550,35276:27468,35277:27827,35278:28779,35279:29634,35280:31117,35281:31166,35282:31292,35283:31623,35284:33457,35285:33499,35286:33540,35287:33655,35288:33775,35289:33747,35290:34662,35291:35506,35292:22057,35293:36008,35294:36838,35295:36942,35296:38686,35297:34442,35298:20420,35299:23784,35300:25105,35301:29273,35302:30011,35303:33253,35304:33469,35305:34558,35306:36032,35307:38597,35308:39187,35309:39381,35310:20171,35311:20250,35312:35299,35313:22238,35314:22602,35315:22730,35316:24315,35317:24555,35318:24618,35319:24724,35320:24674,35321:25040,35322:25106,35323:25296,35324:25913,35392:39745,35393:26214,35394:26800,35395:28023,35396:28784,35397:30028,35398:30342,35399:32117,35400:33445,35401:34809,35402:38283,35403:38542,35404:35997,35405:20977,35406:21182,35407:22806,35408:21683,35409:23475,35410:23830,35411:24936,35412:27010,35413:28079,35414:30861,35415:33995,35416:34903,35417:35442,35418:37799,35419:39608,35420:28012,35421:39336,35422:34521,35423:22435,35424:26623,35425:34510,35426:37390,35427:21123,35428:22151,35429:21508,35430:24275,35431:25313,35432:25785,35433:26684,35434:26680,35435:27579,35436:29554,35437:30906,35438:31339,35439:35226,35440:35282,35441:36203,35442:36611,35443:37101,35444:38307,35445:38548,35446:38761,35447:23398,35448:23731,35449:27005,35450:38989,35451:38990,35452:25499,35453:31520,35454:27179,35456:27263,35457:26806,35458:39949,35459:28511,35460:21106,35461:21917,35462:24688,35463:25324,35464:27963,35465:28167,35466:28369,35467:33883,35468:35088,35469:36676,35470:19988,35471:39993,35472:21494,35473:26907,35474:27194,35475:38788,35476:26666,35477:20828,35478:31427,35479:33970,35480:37340,35481:37772,35482:22107,35483:40232,35484:26658,35485:33541,35486:33841,35487:31909,35488:21e3,35489:33477,35490:29926,35491:20094,35492:20355,35493:20896,35494:23506,35495:21002,35496:21208,35497:21223,35498:24059,35499:21914,35500:22570,35501:23014,35502:23436,35503:23448,35504:23515,35505:24178,35506:24185,35507:24739,35508:24863,35509:24931,35510:25022,35511:25563,35512:25954,35513:26577,35514:26707,35515:26874,35516:27454,35517:27475,35518:27735,35519:28450,35520:28567,35521:28485,35522:29872,35523:29976,35524:30435,35525:30475,35526:31487,35527:31649,35528:31777,35529:32233,35530:32566,35531:32752,35532:32925,35533:33382,35534:33694,35535:35251,35536:35532,35537:36011,35538:36996,35539:37969,35540:38291,35541:38289,35542:38306,35543:38501,35544:38867,35545:39208,35546:33304,35547:20024,35548:21547,35549:23736,35550:24012,35551:29609,35552:30284,35553:30524,35554:23721,35555:32747,35556:36107,35557:38593,35558:38929,35559:38996,35560:39e3,35561:20225,35562:20238,35563:21361,35564:21916,35565:22120,35566:22522,35567:22855,35568:23305,35569:23492,35570:23696,35571:24076,35572:24190,35573:24524,35574:25582,35575:26426,35576:26071,35577:26082,35578:26399,35579:26827,35580:26820,35648:27231,35649:24112,35650:27589,35651:27671,35652:27773,35653:30079,35654:31048,35655:23395,35656:31232,35657:32e3,35658:24509,35659:35215,35660:35352,35661:36020,35662:36215,35663:36556,35664:36637,35665:39138,35666:39438,35667:39740,35668:20096,35669:20605,35670:20736,35671:22931,35672:23452,35673:25135,35674:25216,35675:25836,35676:27450,35677:29344,35678:30097,35679:31047,35680:32681,35681:34811,35682:35516,35683:35696,35684:25516,35685:33738,35686:38816,35687:21513,35688:21507,35689:21931,35690:26708,35691:27224,35692:35440,35693:30759,35694:26485,35695:40653,35696:21364,35697:23458,35698:33050,35699:34384,35700:36870,35701:19992,35702:20037,35703:20167,35704:20241,35705:21450,35706:21560,35707:23470,35708:24339,35709:24613,35710:25937,35712:26429,35713:27714,35714:27762,35715:27875,35716:28792,35717:29699,35718:31350,35719:31406,35720:31496,35721:32026,35722:31998,35723:32102,35724:26087,35725:29275,35726:21435,35727:23621,35728:24040,35729:25298,35730:25312,35731:25369,35732:28192,35733:34394,35734:35377,35735:36317,35736:37624,35737:28417,35738:31142,35739:39770,35740:20136,35741:20139,35742:20140,35743:20379,35744:20384,35745:20689,35746:20807,35747:31478,35748:20849,35749:20982,35750:21332,35751:21281,35752:21375,35753:21483,35754:21932,35755:22659,35756:23777,35757:24375,35758:24394,35759:24623,35760:24656,35761:24685,35762:25375,35763:25945,35764:27211,35765:27841,35766:29378,35767:29421,35768:30703,35769:33016,35770:33029,35771:33288,35772:34126,35773:37111,35774:37857,35775:38911,35776:39255,35777:39514,35778:20208,35779:20957,35780:23597,35781:26241,35782:26989,35783:23616,35784:26354,35785:26997,35786:29577,35787:26704,35788:31873,35789:20677,35790:21220,35791:22343,35792:24062,35793:37670,35794:26020,35795:27427,35796:27453,35797:29748,35798:31105,35799:31165,35800:31563,35801:32202,35802:33465,35803:33740,35804:34943,35805:35167,35806:35641,35807:36817,35808:37329,35809:21535,35810:37504,35811:20061,35812:20534,35813:21477,35814:21306,35815:29399,35816:29590,35817:30697,35818:33510,35819:36527,35820:39366,35821:39368,35822:39378,35823:20855,35824:24858,35825:34398,35826:21936,35827:31354,35828:20598,35829:23507,35830:36935,35831:38533,35832:20018,35833:27355,35834:37351,35835:23633,35836:23624,35904:25496,35905:31391,35906:27795,35907:38772,35908:36705,35909:31402,35910:29066,35911:38536,35912:31874,35913:26647,35914:32368,35915:26705,35916:37740,35917:21234,35918:21531,35919:34219,35920:35347,35921:32676,35922:36557,35923:37089,35924:21350,35925:34952,35926:31041,35927:20418,35928:20670,35929:21009,35930:20804,35931:21843,35932:22317,35933:29674,35934:22411,35935:22865,35936:24418,35937:24452,35938:24693,35939:24950,35940:24935,35941:25001,35942:25522,35943:25658,35944:25964,35945:26223,35946:26690,35947:28179,35948:30054,35949:31293,35950:31995,35951:32076,35952:32153,35953:32331,35954:32619,35955:33550,35956:33610,35957:34509,35958:35336,35959:35427,35960:35686,35961:36605,35962:38938,35963:40335,35964:33464,35965:36814,35966:39912,35968:21127,35969:25119,35970:25731,35971:28608,35972:38553,35973:26689,35974:20625,35975:27424,35976:27770,35977:28500,35978:31348,35979:32080,35980:34880,35981:35363,35982:26376,35983:20214,35984:20537,35985:20518,35986:20581,35987:20860,35988:21048,35989:21091,35990:21927,35991:22287,35992:22533,35993:23244,35994:24314,35995:25010,35996:25080,35997:25331,35998:25458,35999:26908,36e3:27177,36001:29309,36002:29356,36003:29486,36004:30740,36005:30831,36006:32121,36007:30476,36008:32937,36009:35211,36010:35609,36011:36066,36012:36562,36013:36963,36014:37749,36015:38522,36016:38997,36017:39443,36018:40568,36019:20803,36020:21407,36021:21427,36022:24187,36023:24358,36024:28187,36025:28304,36026:29572,36027:29694,36028:32067,36029:33335,36030:35328,36031:35578,36032:38480,36033:20046,36034:20491,36035:21476,36036:21628,36037:22266,36038:22993,36039:23396,36040:24049,36041:24235,36042:24359,36043:25144,36044:25925,36045:26543,36046:28246,36047:29392,36048:31946,36049:34996,36050:32929,36051:32993,36052:33776,36053:34382,36054:35463,36055:36328,36056:37431,36057:38599,36058:39015,36059:40723,36060:20116,36061:20114,36062:20237,36063:21320,36064:21577,36065:21566,36066:23087,36067:24460,36068:24481,36069:24735,36070:26791,36071:27278,36072:29786,36073:30849,36074:35486,36075:35492,36076:35703,36077:37264,36078:20062,36079:39881,36080:20132,36081:20348,36082:20399,36083:20505,36084:20502,36085:20809,36086:20844,36087:21151,36088:21177,36089:21246,36090:21402,36091:21475,36092:21521,36160:21518,36161:21897,36162:22353,36163:22434,36164:22909,36165:23380,36166:23389,36167:23439,36168:24037,36169:24039,36170:24055,36171:24184,36172:24195,36173:24218,36174:24247,36175:24344,36176:24658,36177:24908,36178:25239,36179:25304,36180:25511,36181:25915,36182:26114,36183:26179,36184:26356,36185:26477,36186:26657,36187:26775,36188:27083,36189:27743,36190:27946,36191:28009,36192:28207,36193:28317,36194:30002,36195:30343,36196:30828,36197:31295,36198:31968,36199:32005,36200:32024,36201:32094,36202:32177,36203:32789,36204:32771,36205:32943,36206:32945,36207:33108,36208:33167,36209:33322,36210:33618,36211:34892,36212:34913,36213:35611,36214:36002,36215:36092,36216:37066,36217:37237,36218:37489,36219:30783,36220:37628,36221:38308,36222:38477,36224:38917,36225:39321,36226:39640,36227:40251,36228:21083,36229:21163,36230:21495,36231:21512,36232:22741,36233:25335,36234:28640,36235:35946,36236:36703,36237:40633,36238:20811,36239:21051,36240:21578,36241:22269,36242:31296,36243:37239,36244:40288,36245:40658,36246:29508,36247:28425,36248:33136,36249:29969,36250:24573,36251:24794,36252:39592,36253:29403,36254:36796,36255:27492,36256:38915,36257:20170,36258:22256,36259:22372,36260:22718,36261:23130,36262:24680,36263:25031,36264:26127,36265:26118,36266:26681,36267:26801,36268:28151,36269:30165,36270:32058,36271:33390,36272:39746,36273:20123,36274:20304,36275:21449,36276:21766,36277:23919,36278:24038,36279:24046,36280:26619,36281:27801,36282:29811,36283:30722,36284:35408,36285:37782,36286:35039,36287:22352,36288:24231,36289:25387,36290:20661,36291:20652,36292:20877,36293:26368,36294:21705,36295:22622,36296:22971,36297:23472,36298:24425,36299:25165,36300:25505,36301:26685,36302:27507,36303:28168,36304:28797,36305:37319,36306:29312,36307:30741,36308:30758,36309:31085,36310:25998,36311:32048,36312:33756,36313:35009,36314:36617,36315:38555,36316:21092,36317:22312,36318:26448,36319:32618,36320:36001,36321:20916,36322:22338,36323:38442,36324:22586,36325:27018,36326:32948,36327:21682,36328:23822,36329:22524,36330:30869,36331:40442,36332:20316,36333:21066,36334:21643,36335:25662,36336:26152,36337:26388,36338:26613,36339:31364,36340:31574,36341:32034,36342:37679,36343:26716,36344:39853,36345:31545,36346:21273,36347:20874,36348:21047,36416:23519,36417:25334,36418:25774,36419:25830,36420:26413,36421:27578,36422:34217,36423:38609,36424:30352,36425:39894,36426:25420,36427:37638,36428:39851,36429:30399,36430:26194,36431:19977,36432:20632,36433:21442,36434:23665,36435:24808,36436:25746,36437:25955,36438:26719,36439:29158,36440:29642,36441:29987,36442:31639,36443:32386,36444:34453,36445:35715,36446:36059,36447:37240,36448:39184,36449:26028,36450:26283,36451:27531,36452:20181,36453:20180,36454:20282,36455:20351,36456:21050,36457:21496,36458:21490,36459:21987,36460:22235,36461:22763,36462:22987,36463:22985,36464:23039,36465:23376,36466:23629,36467:24066,36468:24107,36469:24535,36470:24605,36471:25351,36472:25903,36473:23388,36474:26031,36475:26045,36476:26088,36477:26525,36478:27490,36480:27515,36481:27663,36482:29509,36483:31049,36484:31169,36485:31992,36486:32025,36487:32043,36488:32930,36489:33026,36490:33267,36491:35222,36492:35422,36493:35433,36494:35430,36495:35468,36496:35566,36497:36039,36498:36060,36499:38604,36500:39164,36501:27503,36502:20107,36503:20284,36504:20365,36505:20816,36506:23383,36507:23546,36508:24904,36509:25345,36510:26178,36511:27425,36512:28363,36513:27835,36514:29246,36515:29885,36516:30164,36517:30913,36518:31034,36519:32780,36520:32819,36521:33258,36522:33940,36523:36766,36524:27728,36525:40575,36526:24335,36527:35672,36528:40235,36529:31482,36530:36600,36531:23437,36532:38635,36533:19971,36534:21489,36535:22519,36536:22833,36537:23241,36538:23460,36539:24713,36540:28287,36541:28422,36542:30142,36543:36074,36544:23455,36545:34048,36546:31712,36547:20594,36548:26612,36549:33437,36550:23649,36551:34122,36552:32286,36553:33294,36554:20889,36555:23556,36556:25448,36557:36198,36558:26012,36559:29038,36560:31038,36561:32023,36562:32773,36563:35613,36564:36554,36565:36974,36566:34503,36567:37034,36568:20511,36569:21242,36570:23610,36571:26451,36572:28796,36573:29237,36574:37196,36575:37320,36576:37675,36577:33509,36578:23490,36579:24369,36580:24825,36581:20027,36582:21462,36583:23432,36584:25163,36585:26417,36586:27530,36587:29417,36588:29664,36589:31278,36590:33131,36591:36259,36592:37202,36593:39318,36594:20754,36595:21463,36596:21610,36597:23551,36598:25480,36599:27193,36600:32172,36601:38656,36602:22234,36603:21454,36604:21608,36672:23447,36673:23601,36674:24030,36675:20462,36676:24833,36677:25342,36678:27954,36679:31168,36680:31179,36681:32066,36682:32333,36683:32722,36684:33261,36685:33311,36686:33936,36687:34886,36688:35186,36689:35728,36690:36468,36691:36655,36692:36913,36693:37195,36694:37228,36695:38598,36696:37276,36697:20160,36698:20303,36699:20805,36700:21313,36701:24467,36702:25102,36703:26580,36704:27713,36705:28171,36706:29539,36707:32294,36708:37325,36709:37507,36710:21460,36711:22809,36712:23487,36713:28113,36714:31069,36715:32302,36716:31899,36717:22654,36718:29087,36719:20986,36720:34899,36721:36848,36722:20426,36723:23803,36724:26149,36725:30636,36726:31459,36727:33308,36728:39423,36729:20934,36730:24490,36731:26092,36732:26991,36733:27529,36734:28147,36736:28310,36737:28516,36738:30462,36739:32020,36740:24033,36741:36981,36742:37255,36743:38918,36744:20966,36745:21021,36746:25152,36747:26257,36748:26329,36749:28186,36750:24246,36751:32210,36752:32626,36753:26360,36754:34223,36755:34295,36756:35576,36757:21161,36758:21465,36759:22899,36760:24207,36761:24464,36762:24661,36763:37604,36764:38500,36765:20663,36766:20767,36767:21213,36768:21280,36769:21319,36770:21484,36771:21736,36772:21830,36773:21809,36774:22039,36775:22888,36776:22974,36777:23100,36778:23477,36779:23558,36780:23567,36781:23569,36782:23578,36783:24196,36784:24202,36785:24288,36786:24432,36787:25215,36788:25220,36789:25307,36790:25484,36791:25463,36792:26119,36793:26124,36794:26157,36795:26230,36796:26494,36797:26786,36798:27167,36799:27189,36800:27836,36801:28040,36802:28169,36803:28248,36804:28988,36805:28966,36806:29031,36807:30151,36808:30465,36809:30813,36810:30977,36811:31077,36812:31216,36813:31456,36814:31505,36815:31911,36816:32057,36817:32918,36818:33750,36819:33931,36820:34121,36821:34909,36822:35059,36823:35359,36824:35388,36825:35412,36826:35443,36827:35937,36828:36062,36829:37284,36830:37478,36831:37758,36832:37912,36833:38556,36834:38808,36835:19978,36836:19976,36837:19998,36838:20055,36839:20887,36840:21104,36841:22478,36842:22580,36843:22732,36844:23330,36845:24120,36846:24773,36847:25854,36848:26465,36849:26454,36850:27972,36851:29366,36852:30067,36853:31331,36854:33976,36855:35698,36856:37304,36857:37664,36858:22065,36859:22516,36860:39166,36928:25325,36929:26893,36930:27542,36931:29165,36932:32340,36933:32887,36934:33394,36935:35302,36936:39135,36937:34645,36938:36785,36939:23611,36940:20280,36941:20449,36942:20405,36943:21767,36944:23072,36945:23517,36946:23529,36947:24515,36948:24910,36949:25391,36950:26032,36951:26187,36952:26862,36953:27035,36954:28024,36955:28145,36956:30003,36957:30137,36958:30495,36959:31070,36960:31206,36961:32051,36962:33251,36963:33455,36964:34218,36965:35242,36966:35386,36967:36523,36968:36763,36969:36914,36970:37341,36971:38663,36972:20154,36973:20161,36974:20995,36975:22645,36976:22764,36977:23563,36978:29978,36979:23613,36980:33102,36981:35338,36982:36805,36983:38499,36984:38765,36985:31525,36986:35535,36987:38920,36988:37218,36989:22259,36990:21416,36992:36887,36993:21561,36994:22402,36995:24101,36996:25512,36997:27700,36998:28810,36999:30561,37e3:31883,37001:32736,37002:34928,37003:36930,37004:37204,37005:37648,37006:37656,37007:38543,37008:29790,37009:39620,37010:23815,37011:23913,37012:25968,37013:26530,37014:36264,37015:38619,37016:25454,37017:26441,37018:26905,37019:33733,37020:38935,37021:38592,37022:35070,37023:28548,37024:25722,37025:23544,37026:19990,37027:28716,37028:30045,37029:26159,37030:20932,37031:21046,37032:21218,37033:22995,37034:24449,37035:24615,37036:25104,37037:25919,37038:25972,37039:26143,37040:26228,37041:26866,37042:26646,37043:27491,37044:28165,37045:29298,37046:29983,37047:30427,37048:31934,37049:32854,37050:22768,37051:35069,37052:35199,37053:35488,37054:35475,37055:35531,37056:36893,37057:37266,37058:38738,37059:38745,37060:25993,37061:31246,37062:33030,37063:38587,37064:24109,37065:24796,37066:25114,37067:26021,37068:26132,37069:26512,37070:30707,37071:31309,37072:31821,37073:32318,37074:33034,37075:36012,37076:36196,37077:36321,37078:36447,37079:30889,37080:20999,37081:25305,37082:25509,37083:25666,37084:25240,37085:35373,37086:31363,37087:31680,37088:35500,37089:38634,37090:32118,37091:33292,37092:34633,37093:20185,37094:20808,37095:21315,37096:21344,37097:23459,37098:23554,37099:23574,37100:24029,37101:25126,37102:25159,37103:25776,37104:26643,37105:26676,37106:27849,37107:27973,37108:27927,37109:26579,37110:28508,37111:29006,37112:29053,37113:26059,37114:31359,37115:31661,37116:32218,37184:32330,37185:32680,37186:33146,37187:33307,37188:33337,37189:34214,37190:35438,37191:36046,37192:36341,37193:36984,37194:36983,37195:37549,37196:37521,37197:38275,37198:39854,37199:21069,37200:21892,37201:28472,37202:28982,37203:20840,37204:31109,37205:32341,37206:33203,37207:31950,37208:22092,37209:22609,37210:23720,37211:25514,37212:26366,37213:26365,37214:26970,37215:29401,37216:30095,37217:30094,37218:30990,37219:31062,37220:31199,37221:31895,37222:32032,37223:32068,37224:34311,37225:35380,37226:38459,37227:36961,37228:40736,37229:20711,37230:21109,37231:21452,37232:21474,37233:20489,37234:21930,37235:22766,37236:22863,37237:29245,37238:23435,37239:23652,37240:21277,37241:24803,37242:24819,37243:25436,37244:25475,37245:25407,37246:25531,37248:25805,37249:26089,37250:26361,37251:24035,37252:27085,37253:27133,37254:28437,37255:29157,37256:20105,37257:30185,37258:30456,37259:31379,37260:31967,37261:32207,37262:32156,37263:32865,37264:33609,37265:33624,37266:33900,37267:33980,37268:34299,37269:35013,37270:36208,37271:36865,37272:36973,37273:37783,37274:38684,37275:39442,37276:20687,37277:22679,37278:24974,37279:33235,37280:34101,37281:36104,37282:36896,37283:20419,37284:20596,37285:21063,37286:21363,37287:24687,37288:25417,37289:26463,37290:28204,37291:36275,37292:36895,37293:20439,37294:23646,37295:36042,37296:26063,37297:32154,37298:21330,37299:34966,37300:20854,37301:25539,37302:23384,37303:23403,37304:23562,37305:25613,37306:26449,37307:36956,37308:20182,37309:22810,37310:22826,37311:27760,37312:35409,37313:21822,37314:22549,37315:22949,37316:24816,37317:25171,37318:26561,37319:33333,37320:26965,37321:38464,37322:39364,37323:39464,37324:20307,37325:22534,37326:23550,37327:32784,37328:23729,37329:24111,37330:24453,37331:24608,37332:24907,37333:25140,37334:26367,37335:27888,37336:28382,37337:32974,37338:33151,37339:33492,37340:34955,37341:36024,37342:36864,37343:36910,37344:38538,37345:40667,37346:39899,37347:20195,37348:21488,37349:22823,37350:31532,37351:37261,37352:38988,37353:40441,37354:28381,37355:28711,37356:21331,37357:21828,37358:23429,37359:25176,37360:25246,37361:25299,37362:27810,37363:28655,37364:29730,37365:35351,37366:37944,37367:28609,37368:35582,37369:33592,37370:20967,37371:34552,37372:21482,37440:21481,37441:20294,37442:36948,37443:36784,37444:22890,37445:33073,37446:24061,37447:31466,37448:36799,37449:26842,37450:35895,37451:29432,37452:40008,37453:27197,37454:35504,37455:20025,37456:21336,37457:22022,37458:22374,37459:25285,37460:25506,37461:26086,37462:27470,37463:28129,37464:28251,37465:28845,37466:30701,37467:31471,37468:31658,37469:32187,37470:32829,37471:32966,37472:34507,37473:35477,37474:37723,37475:22243,37476:22727,37477:24382,37478:26029,37479:26262,37480:27264,37481:27573,37482:30007,37483:35527,37484:20516,37485:30693,37486:22320,37487:24347,37488:24677,37489:26234,37490:27744,37491:30196,37492:31258,37493:32622,37494:33268,37495:34584,37496:36933,37497:39347,37498:31689,37499:30044,37500:31481,37501:31569,37502:33988,37504:36880,37505:31209,37506:31378,37507:33590,37508:23265,37509:30528,37510:20013,37511:20210,37512:23449,37513:24544,37514:25277,37515:26172,37516:26609,37517:27880,37518:34411,37519:34935,37520:35387,37521:37198,37522:37619,37523:39376,37524:27159,37525:28710,37526:29482,37527:33511,37528:33879,37529:36015,37530:19969,37531:20806,37532:20939,37533:21899,37534:23541,37535:24086,37536:24115,37537:24193,37538:24340,37539:24373,37540:24427,37541:24500,37542:25074,37543:25361,37544:26274,37545:26397,37546:28526,37547:29266,37548:30010,37549:30522,37550:32884,37551:33081,37552:33144,37553:34678,37554:35519,37555:35548,37556:36229,37557:36339,37558:37530,37559:38263,37560:38914,37561:40165,37562:21189,37563:25431,37564:30452,37565:26389,37566:27784,37567:29645,37568:36035,37569:37806,37570:38515,37571:27941,37572:22684,37573:26894,37574:27084,37575:36861,37576:37786,37577:30171,37578:36890,37579:22618,37580:26626,37581:25524,37582:27131,37583:20291,37584:28460,37585:26584,37586:36795,37587:34086,37588:32180,37589:37716,37590:26943,37591:28528,37592:22378,37593:22775,37594:23340,37595:32044,37596:29226,37597:21514,37598:37347,37599:40372,37600:20141,37601:20302,37602:20572,37603:20597,37604:21059,37605:35998,37606:21576,37607:22564,37608:23450,37609:24093,37610:24213,37611:24237,37612:24311,37613:24351,37614:24716,37615:25269,37616:25402,37617:25552,37618:26799,37619:27712,37620:30855,37621:31118,37622:31243,37623:32224,37624:33351,37625:35330,37626:35558,37627:36420,37628:36883,37696:37048,37697:37165,37698:37336,37699:40718,37700:27877,37701:25688,37702:25826,37703:25973,37704:28404,37705:30340,37706:31515,37707:36969,37708:37841,37709:28346,37710:21746,37711:24505,37712:25764,37713:36685,37714:36845,37715:37444,37716:20856,37717:22635,37718:22825,37719:23637,37720:24215,37721:28155,37722:32399,37723:29980,37724:36028,37725:36578,37726:39003,37727:28857,37728:20253,37729:27583,37730:28593,37731:3e4,37732:38651,37733:20814,37734:21520,37735:22581,37736:22615,37737:22956,37738:23648,37739:24466,37740:26007,37741:26460,37742:28193,37743:30331,37744:33759,37745:36077,37746:36884,37747:37117,37748:37709,37749:30757,37750:30778,37751:21162,37752:24230,37753:22303,37754:22900,37755:24594,37756:20498,37757:20826,37758:20908,37760:20941,37761:20992,37762:21776,37763:22612,37764:22616,37765:22871,37766:23445,37767:23798,37768:23947,37769:24764,37770:25237,37771:25645,37772:26481,37773:26691,37774:26812,37775:26847,37776:30423,37777:28120,37778:28271,37779:28059,37780:28783,37781:29128,37782:24403,37783:30168,37784:31095,37785:31561,37786:31572,37787:31570,37788:31958,37789:32113,37790:21040,37791:33891,37792:34153,37793:34276,37794:35342,37795:35588,37796:35910,37797:36367,37798:36867,37799:36879,37800:37913,37801:38518,37802:38957,37803:39472,37804:38360,37805:20685,37806:21205,37807:21516,37808:22530,37809:23566,37810:24999,37811:25758,37812:27934,37813:30643,37814:31461,37815:33012,37816:33796,37817:36947,37818:37509,37819:23776,37820:40199,37821:21311,37822:24471,37823:24499,37824:28060,37825:29305,37826:30563,37827:31167,37828:31716,37829:27602,37830:29420,37831:35501,37832:26627,37833:27233,37834:20984,37835:31361,37836:26932,37837:23626,37838:40182,37839:33515,37840:23493,37841:37193,37842:28702,37843:22136,37844:23663,37845:24775,37846:25958,37847:27788,37848:35930,37849:36929,37850:38931,37851:21585,37852:26311,37853:37389,37854:22856,37855:37027,37856:20869,37857:20045,37858:20970,37859:34201,37860:35598,37861:28760,37862:25466,37863:37707,37864:26978,37865:39348,37866:32260,37867:30071,37868:21335,37869:26976,37870:36575,37871:38627,37872:27741,37873:20108,37874:23612,37875:24336,37876:36841,37877:21250,37878:36049,37879:32905,37880:34425,37881:24319,37882:26085,37883:20083,37884:20837,37952:22914,37953:23615,37954:38894,37955:20219,37956:22922,37957:24525,37958:35469,37959:28641,37960:31152,37961:31074,37962:23527,37963:33905,37964:29483,37965:29105,37966:24180,37967:24565,37968:25467,37969:25754,37970:29123,37971:31896,37972:20035,37973:24316,37974:20043,37975:22492,37976:22178,37977:24745,37978:28611,37979:32013,37980:33021,37981:33075,37982:33215,37983:36786,37984:35223,37985:34468,37986:24052,37987:25226,37988:25773,37989:35207,37990:26487,37991:27874,37992:27966,37993:29750,37994:30772,37995:23110,37996:32629,37997:33453,37998:39340,37999:20467,38e3:24259,38001:25309,38002:25490,38003:25943,38004:26479,38005:30403,38006:29260,38007:32972,38008:32954,38009:36649,38010:37197,38011:20493,38012:22521,38013:23186,38014:26757,38016:26995,38017:29028,38018:29437,38019:36023,38020:22770,38021:36064,38022:38506,38023:36889,38024:34687,38025:31204,38026:30695,38027:33833,38028:20271,38029:21093,38030:21338,38031:25293,38032:26575,38033:27850,38034:30333,38035:31636,38036:31893,38037:33334,38038:34180,38039:36843,38040:26333,38041:28448,38042:29190,38043:32283,38044:33707,38045:39361,38046:40614,38047:20989,38048:31665,38049:30834,38050:31672,38051:32903,38052:31560,38053:27368,38054:24161,38055:32908,38056:30033,38057:30048,38058:20843,38059:37474,38060:28300,38061:30330,38062:37271,38063:39658,38064:20240,38065:32624,38066:25244,38067:31567,38068:38309,38069:40169,38070:22138,38071:22617,38072:34532,38073:38588,38074:20276,38075:21028,38076:21322,38077:21453,38078:21467,38079:24070,38080:25644,38081:26001,38082:26495,38083:27710,38084:27726,38085:29256,38086:29359,38087:29677,38088:30036,38089:32321,38090:33324,38091:34281,38092:36009,38093:31684,38094:37318,38095:29033,38096:38930,38097:39151,38098:25405,38099:26217,38100:30058,38101:30436,38102:30928,38103:34115,38104:34542,38105:21290,38106:21329,38107:21542,38108:22915,38109:24199,38110:24444,38111:24754,38112:25161,38113:25209,38114:25259,38115:26e3,38116:27604,38117:27852,38118:30130,38119:30382,38120:30865,38121:31192,38122:32203,38123:32631,38124:32933,38125:34987,38126:35513,38127:36027,38128:36991,38129:38750,38130:39131,38131:27147,38132:31800,38133:20633,38134:23614,38135:24494,38136:26503,38137:27608,38138:29749,38139:30473,38140:32654,38208:40763,38209:26570,38210:31255,38211:21305,38212:30091,38213:39661,38214:24422,38215:33181,38216:33777,38217:32920,38218:24380,38219:24517,38220:30050,38221:31558,38222:36924,38223:26727,38224:23019,38225:23195,38226:32016,38227:30334,38228:35628,38229:20469,38230:24426,38231:27161,38232:27703,38233:28418,38234:29922,38235:31080,38236:34920,38237:35413,38238:35961,38239:24287,38240:25551,38241:30149,38242:31186,38243:33495,38244:37672,38245:37618,38246:33948,38247:34541,38248:39981,38249:21697,38250:24428,38251:25996,38252:27996,38253:28693,38254:36007,38255:36051,38256:38971,38257:25935,38258:29942,38259:19981,38260:20184,38261:22496,38262:22827,38263:23142,38264:23500,38265:20904,38266:24067,38267:24220,38268:24598,38269:25206,38270:25975,38272:26023,38273:26222,38274:28014,38275:29238,38276:31526,38277:33104,38278:33178,38279:33433,38280:35676,38281:36e3,38282:36070,38283:36212,38284:38428,38285:38468,38286:20398,38287:25771,38288:27494,38289:33310,38290:33889,38291:34154,38292:37096,38293:23553,38294:26963,38295:39080,38296:33914,38297:34135,38298:20239,38299:21103,38300:24489,38301:24133,38302:26381,38303:31119,38304:33145,38305:35079,38306:35206,38307:28149,38308:24343,38309:25173,38310:27832,38311:20175,38312:29289,38313:39826,38314:20998,38315:21563,38316:22132,38317:22707,38318:24996,38319:25198,38320:28954,38321:22894,38322:31881,38323:31966,38324:32027,38325:38640,38326:25991,38327:32862,38328:19993,38329:20341,38330:20853,38331:22592,38332:24163,38333:24179,38334:24330,38335:26564,38336:20006,38337:34109,38338:38281,38339:38491,38340:31859,38341:38913,38342:20731,38343:22721,38344:30294,38345:30887,38346:21029,38347:30629,38348:34065,38349:31622,38350:20559,38351:22793,38352:29255,38353:31687,38354:32232,38355:36794,38356:36820,38357:36941,38358:20415,38359:21193,38360:23081,38361:24321,38362:38829,38363:20445,38364:33303,38365:37610,38366:22275,38367:25429,38368:27497,38369:29995,38370:35036,38371:36628,38372:31298,38373:21215,38374:22675,38375:24917,38376:25098,38377:26286,38378:27597,38379:31807,38380:33769,38381:20515,38382:20472,38383:21253,38384:21574,38385:22577,38386:22857,38387:23453,38388:23792,38389:23791,38390:23849,38391:24214,38392:25265,38393:25447,38394:25918,38395:26041,38396:26379,38464:27861,38465:27873,38466:28921,38467:30770,38468:32299,38469:32990,38470:33459,38471:33804,38472:34028,38473:34562,38474:35090,38475:35370,38476:35914,38477:37030,38478:37586,38479:39165,38480:40179,38481:40300,38482:20047,38483:20129,38484:20621,38485:21078,38486:22346,38487:22952,38488:24125,38489:24536,38490:24537,38491:25151,38492:26292,38493:26395,38494:26576,38495:26834,38496:20882,38497:32033,38498:32938,38499:33192,38500:35584,38501:35980,38502:36031,38503:37502,38504:38450,38505:21536,38506:38956,38507:21271,38508:20693,38509:21340,38510:22696,38511:25778,38512:26420,38513:29287,38514:30566,38515:31302,38516:37350,38517:21187,38518:27809,38519:27526,38520:22528,38521:24140,38522:22868,38523:26412,38524:32763,38525:20961,38526:30406,38528:25705,38529:30952,38530:39764,38531:40635,38532:22475,38533:22969,38534:26151,38535:26522,38536:27598,38537:21737,38538:27097,38539:24149,38540:33180,38541:26517,38542:39850,38543:26622,38544:40018,38545:26717,38546:20134,38547:20451,38548:21448,38549:25273,38550:26411,38551:27819,38552:36804,38553:20397,38554:32365,38555:40639,38556:19975,38557:24930,38558:28288,38559:28459,38560:34067,38561:21619,38562:26410,38563:39749,38564:24051,38565:31637,38566:23724,38567:23494,38568:34588,38569:28234,38570:34001,38571:31252,38572:33032,38573:22937,38574:31885,38575:27665,38576:30496,38577:21209,38578:22818,38579:28961,38580:29279,38581:30683,38582:38695,38583:40289,38584:26891,38585:23167,38586:23064,38587:20901,38588:21517,38589:21629,38590:26126,38591:30431,38592:36855,38593:37528,38594:40180,38595:23018,38596:29277,38597:28357,38598:20813,38599:26825,38600:32191,38601:32236,38602:38754,38603:40634,38604:25720,38605:27169,38606:33538,38607:22916,38608:23391,38609:27611,38610:29467,38611:30450,38612:32178,38613:32791,38614:33945,38615:20786,38616:26408,38617:40665,38618:30446,38619:26466,38620:21247,38621:39173,38622:23588,38623:25147,38624:31870,38625:36016,38626:21839,38627:24758,38628:32011,38629:38272,38630:21249,38631:20063,38632:20918,38633:22812,38634:29242,38635:32822,38636:37326,38637:24357,38638:30690,38639:21380,38640:24441,38641:32004,38642:34220,38643:35379,38644:36493,38645:38742,38646:26611,38647:34222,38648:37971,38649:24841,38650:24840,38651:27833,38652:30290,38720:35565,38721:36664,38722:21807,38723:20305,38724:20778,38725:21191,38726:21451,38727:23461,38728:24189,38729:24736,38730:24962,38731:25558,38732:26377,38733:26586,38734:28263,38735:28044,38736:29494,38737:29495,38738:30001,38739:31056,38740:35029,38741:35480,38742:36938,38743:37009,38744:37109,38745:38596,38746:34701,38747:22805,38748:20104,38749:20313,38750:19982,38751:35465,38752:36671,38753:38928,38754:20653,38755:24188,38756:22934,38757:23481,38758:24248,38759:25562,38760:25594,38761:25793,38762:26332,38763:26954,38764:27096,38765:27915,38766:28342,38767:29076,38768:29992,38769:31407,38770:32650,38771:32768,38772:33865,38773:33993,38774:35201,38775:35617,38776:36362,38777:36965,38778:38525,38779:39178,38780:24958,38781:25233,38782:27442,38784:27779,38785:28020,38786:32716,38787:32764,38788:28096,38789:32645,38790:34746,38791:35064,38792:26469,38793:33713,38794:38972,38795:38647,38796:27931,38797:32097,38798:33853,38799:37226,38800:20081,38801:21365,38802:23888,38803:27396,38804:28651,38805:34253,38806:34349,38807:35239,38808:21033,38809:21519,38810:23653,38811:26446,38812:26792,38813:29702,38814:29827,38815:30178,38816:35023,38817:35041,38818:37324,38819:38626,38820:38520,38821:24459,38822:29575,38823:31435,38824:33870,38825:25504,38826:30053,38827:21129,38828:27969,38829:28316,38830:29705,38831:30041,38832:30827,38833:31890,38834:38534,38835:31452,38836:40845,38837:20406,38838:24942,38839:26053,38840:34396,38841:20102,38842:20142,38843:20698,38844:20001,38845:20940,38846:23534,38847:26009,38848:26753,38849:28092,38850:29471,38851:30274,38852:30637,38853:31260,38854:31975,38855:33391,38856:35538,38857:36988,38858:37327,38859:38517,38860:38936,38861:21147,38862:32209,38863:20523,38864:21400,38865:26519,38866:28107,38867:29136,38868:29747,38869:33256,38870:36650,38871:38563,38872:40023,38873:40607,38874:29792,38875:22593,38876:28057,38877:32047,38878:39006,38879:20196,38880:20278,38881:20363,38882:20919,38883:21169,38884:23994,38885:24604,38886:29618,38887:31036,38888:33491,38889:37428,38890:38583,38891:38646,38892:38666,38893:40599,38894:40802,38895:26278,38896:27508,38897:21015,38898:21155,38899:28872,38900:35010,38901:24265,38902:24651,38903:24976,38904:28451,38905:29001,38906:31806,38907:32244,38908:32879,38976:34030,38977:36899,38978:37676,38979:21570,38980:39791,38981:27347,38982:28809,38983:36034,38984:36335,38985:38706,38986:21172,38987:23105,38988:24266,38989:24324,38990:26391,38991:27004,38992:27028,38993:28010,38994:28431,38995:29282,38996:29436,38997:31725,38998:32769,38999:32894,39e3:34635,39001:37070,39002:20845,39003:40595,39004:31108,39005:32907,39006:37682,39007:35542,39008:20525,39009:21644,39010:35441,39011:27498,39012:36036,39013:33031,39014:24785,39015:26528,39016:40434,39017:20121,39018:20120,39019:39952,39020:35435,39021:34241,39022:34152,39023:26880,39024:28286,39025:30871,39026:33109,39071:24332,39072:19984,39073:19989,39074:20010,39075:20017,39076:20022,39077:20028,39078:20031,39079:20034,39080:20054,39081:20056,39082:20098,39083:20101,39084:35947,39085:20106,39086:33298,39087:24333,39088:20110,39089:20126,39090:20127,39091:20128,39092:20130,39093:20144,39094:20147,39095:20150,39096:20174,39097:20173,39098:20164,39099:20166,39100:20162,39101:20183,39102:20190,39103:20205,39104:20191,39105:20215,39106:20233,39107:20314,39108:20272,39109:20315,39110:20317,39111:20311,39112:20295,39113:20342,39114:20360,39115:20367,39116:20376,39117:20347,39118:20329,39119:20336,39120:20369,39121:20335,39122:20358,39123:20374,39124:20760,39125:20436,39126:20447,39127:20430,39128:20440,39129:20443,39130:20433,39131:20442,39132:20432,39133:20452,39134:20453,39135:20506,39136:20520,39137:20500,39138:20522,39139:20517,39140:20485,39141:20252,39142:20470,39143:20513,39144:20521,39145:20524,39146:20478,39147:20463,39148:20497,39149:20486,39150:20547,39151:20551,39152:26371,39153:20565,39154:20560,39155:20552,39156:20570,39157:20566,39158:20588,39159:20600,39160:20608,39161:20634,39162:20613,39163:20660,39164:20658,39232:20681,39233:20682,39234:20659,39235:20674,39236:20694,39237:20702,39238:20709,39239:20717,39240:20707,39241:20718,39242:20729,39243:20725,39244:20745,39245:20737,39246:20738,39247:20758,39248:20757,39249:20756,39250:20762,39251:20769,39252:20794,39253:20791,39254:20796,39255:20795,39256:20799,39257:20800,39258:20818,39259:20812,39260:20820,39261:20834,39262:31480,39263:20841,39264:20842,39265:20846,39266:20864,39267:20866,39268:22232,39269:20876,39270:20873,39271:20879,39272:20881,39273:20883,39274:20885,39275:20886,39276:20900,39277:20902,39278:20898,39279:20905,39280:20906,39281:20907,39282:20915,39283:20913,39284:20914,39285:20912,39286:20917,39287:20925,39288:20933,39289:20937,39290:20955,39291:20960,39292:34389,39293:20969,39294:20973,39296:20976,39297:20981,39298:20990,39299:20996,39300:21003,39301:21012,39302:21006,39303:21031,39304:21034,39305:21038,39306:21043,39307:21049,39308:21071,39309:21060,39310:21067,39311:21068,39312:21086,39313:21076,39314:21098,39315:21108,39316:21097,39317:21107,39318:21119,39319:21117,39320:21133,39321:21140,39322:21138,39323:21105,39324:21128,39325:21137,39326:36776,39327:36775,39328:21164,39329:21165,39330:21180,39331:21173,39332:21185,39333:21197,39334:21207,39335:21214,39336:21219,39337:21222,39338:39149,39339:21216,39340:21235,39341:21237,39342:21240,39343:21241,39344:21254,39345:21256,39346:30008,39347:21261,39348:21264,39349:21263,39350:21269,39351:21274,39352:21283,39353:21295,39354:21297,39355:21299,39356:21304,39357:21312,39358:21318,39359:21317,39360:19991,39361:21321,39362:21325,39363:20950,39364:21342,39365:21353,39366:21358,39367:22808,39368:21371,39369:21367,39370:21378,39371:21398,39372:21408,39373:21414,39374:21413,39375:21422,39376:21424,39377:21430,39378:21443,39379:31762,39380:38617,39381:21471,39382:26364,39383:29166,39384:21486,39385:21480,39386:21485,39387:21498,39388:21505,39389:21565,39390:21568,39391:21548,39392:21549,39393:21564,39394:21550,39395:21558,39396:21545,39397:21533,39398:21582,39399:21647,39400:21621,39401:21646,39402:21599,39403:21617,39404:21623,39405:21616,39406:21650,39407:21627,39408:21632,39409:21622,39410:21636,39411:21648,39412:21638,39413:21703,39414:21666,39415:21688,39416:21669,39417:21676,39418:21700,39419:21704,39420:21672,39488:21675,39489:21698,39490:21668,39491:21694,39492:21692,39493:21720,39494:21733,39495:21734,39496:21775,39497:21780,39498:21757,39499:21742,39500:21741,39501:21754,39502:21730,39503:21817,39504:21824,39505:21859,39506:21836,39507:21806,39508:21852,39509:21829,39510:21846,39511:21847,39512:21816,39513:21811,39514:21853,39515:21913,39516:21888,39517:21679,39518:21898,39519:21919,39520:21883,39521:21886,39522:21912,39523:21918,39524:21934,39525:21884,39526:21891,39527:21929,39528:21895,39529:21928,39530:21978,39531:21957,39532:21983,39533:21956,39534:21980,39535:21988,39536:21972,39537:22036,39538:22007,39539:22038,39540:22014,39541:22013,39542:22043,39543:22009,39544:22094,39545:22096,39546:29151,39547:22068,39548:22070,39549:22066,39550:22072,39552:22123,39553:22116,39554:22063,39555:22124,39556:22122,39557:22150,39558:22144,39559:22154,39560:22176,39561:22164,39562:22159,39563:22181,39564:22190,39565:22198,39566:22196,39567:22210,39568:22204,39569:22209,39570:22211,39571:22208,39572:22216,39573:22222,39574:22225,39575:22227,39576:22231,39577:22254,39578:22265,39579:22272,39580:22271,39581:22276,39582:22281,39583:22280,39584:22283,39585:22285,39586:22291,39587:22296,39588:22294,39589:21959,39590:22300,39591:22310,39592:22327,39593:22328,39594:22350,39595:22331,39596:22336,39597:22351,39598:22377,39599:22464,39600:22408,39601:22369,39602:22399,39603:22409,39604:22419,39605:22432,39606:22451,39607:22436,39608:22442,39609:22448,39610:22467,39611:22470,39612:22484,39613:22482,39614:22483,39615:22538,39616:22486,39617:22499,39618:22539,39619:22553,39620:22557,39621:22642,39622:22561,39623:22626,39624:22603,39625:22640,39626:27584,39627:22610,39628:22589,39629:22649,39630:22661,39631:22713,39632:22687,39633:22699,39634:22714,39635:22750,39636:22715,39637:22712,39638:22702,39639:22725,39640:22739,39641:22737,39642:22743,39643:22745,39644:22744,39645:22757,39646:22748,39647:22756,39648:22751,39649:22767,39650:22778,39651:22777,39652:22779,39653:22780,39654:22781,39655:22786,39656:22794,39657:22800,39658:22811,39659:26790,39660:22821,39661:22828,39662:22829,39663:22834,39664:22840,39665:22846,39666:31442,39667:22869,39668:22864,39669:22862,39670:22874,39671:22872,39672:22882,39673:22880,39674:22887,39675:22892,39676:22889,39744:22904,39745:22913,39746:22941,39747:20318,39748:20395,39749:22947,39750:22962,39751:22982,39752:23016,39753:23004,39754:22925,39755:23001,39756:23002,39757:23077,39758:23071,39759:23057,39760:23068,39761:23049,39762:23066,39763:23104,39764:23148,39765:23113,39766:23093,39767:23094,39768:23138,39769:23146,39770:23194,39771:23228,39772:23230,39773:23243,39774:23234,39775:23229,39776:23267,39777:23255,39778:23270,39779:23273,39780:23254,39781:23290,39782:23291,39783:23308,39784:23307,39785:23318,39786:23346,39787:23248,39788:23338,39789:23350,39790:23358,39791:23363,39792:23365,39793:23360,39794:23377,39795:23381,39796:23386,39797:23387,39798:23397,39799:23401,39800:23408,39801:23411,39802:23413,39803:23416,39804:25992,39805:23418,39806:23424,39808:23427,39809:23462,39810:23480,39811:23491,39812:23495,39813:23497,39814:23508,39815:23504,39816:23524,39817:23526,39818:23522,39819:23518,39820:23525,39821:23531,39822:23536,39823:23542,39824:23539,39825:23557,39826:23559,39827:23560,39828:23565,39829:23571,39830:23584,39831:23586,39832:23592,39833:23608,39834:23609,39835:23617,39836:23622,39837:23630,39838:23635,39839:23632,39840:23631,39841:23409,39842:23660,39843:23662,39844:20066,39845:23670,39846:23673,39847:23692,39848:23697,39849:23700,39850:22939,39851:23723,39852:23739,39853:23734,39854:23740,39855:23735,39856:23749,39857:23742,39858:23751,39859:23769,39860:23785,39861:23805,39862:23802,39863:23789,39864:23948,39865:23786,39866:23819,39867:23829,39868:23831,39869:23900,39870:23839,39871:23835,39872:23825,39873:23828,39874:23842,39875:23834,39876:23833,39877:23832,39878:23884,39879:23890,39880:23886,39881:23883,39882:23916,39883:23923,39884:23926,39885:23943,39886:23940,39887:23938,39888:23970,39889:23965,39890:23980,39891:23982,39892:23997,39893:23952,39894:23991,39895:23996,39896:24009,39897:24013,39898:24019,39899:24018,39900:24022,39901:24027,39902:24043,39903:24050,39904:24053,39905:24075,39906:24090,39907:24089,39908:24081,39909:24091,39910:24118,39911:24119,39912:24132,39913:24131,39914:24128,39915:24142,39916:24151,39917:24148,39918:24159,39919:24162,39920:24164,39921:24135,39922:24181,39923:24182,39924:24186,39925:40636,39926:24191,39927:24224,39928:24257,39929:24258,39930:24264,39931:24272,39932:24271,4e4:24278,40001:24291,40002:24285,40003:24282,40004:24283,40005:24290,40006:24289,40007:24296,40008:24297,40009:24300,40010:24305,40011:24307,40012:24304,40013:24308,40014:24312,40015:24318,40016:24323,40017:24329,40018:24413,40019:24412,40020:24331,40021:24337,40022:24342,40023:24361,40024:24365,40025:24376,40026:24385,40027:24392,40028:24396,40029:24398,40030:24367,40031:24401,40032:24406,40033:24407,40034:24409,40035:24417,40036:24429,40037:24435,40038:24439,40039:24451,40040:24450,40041:24447,40042:24458,40043:24456,40044:24465,40045:24455,40046:24478,40047:24473,40048:24472,40049:24480,40050:24488,40051:24493,40052:24508,40053:24534,40054:24571,40055:24548,40056:24568,40057:24561,40058:24541,40059:24755,40060:24575,40061:24609,40062:24672,40064:24601,40065:24592,40066:24617,40067:24590,40068:24625,40069:24603,40070:24597,40071:24619,40072:24614,40073:24591,40074:24634,40075:24666,40076:24641,40077:24682,40078:24695,40079:24671,40080:24650,40081:24646,40082:24653,40083:24675,40084:24643,40085:24676,40086:24642,40087:24684,40088:24683,40089:24665,40090:24705,40091:24717,40092:24807,40093:24707,40094:24730,40095:24708,40096:24731,40097:24726,40098:24727,40099:24722,40100:24743,40101:24715,40102:24801,40103:24760,40104:24800,40105:24787,40106:24756,40107:24560,40108:24765,40109:24774,40110:24757,40111:24792,40112:24909,40113:24853,40114:24838,40115:24822,40116:24823,40117:24832,40118:24820,40119:24826,40120:24835,40121:24865,40122:24827,40123:24817,40124:24845,40125:24846,40126:24903,40127:24894,40128:24872,40129:24871,40130:24906,40131:24895,40132:24892,40133:24876,40134:24884,40135:24893,40136:24898,40137:24900,40138:24947,40139:24951,40140:24920,40141:24921,40142:24922,40143:24939,40144:24948,40145:24943,40146:24933,40147:24945,40148:24927,40149:24925,40150:24915,40151:24949,40152:24985,40153:24982,40154:24967,40155:25004,40156:24980,40157:24986,40158:24970,40159:24977,40160:25003,40161:25006,40162:25036,40163:25034,40164:25033,40165:25079,40166:25032,40167:25027,40168:25030,40169:25018,40170:25035,40171:32633,40172:25037,40173:25062,40174:25059,40175:25078,40176:25082,40177:25076,40178:25087,40179:25085,40180:25084,40181:25086,40182:25088,40183:25096,40184:25097,40185:25101,40186:25100,40187:25108,40188:25115,40256:25118,40257:25121,40258:25130,40259:25134,40260:25136,40261:25138,40262:25139,40263:25153,40264:25166,40265:25182,40266:25187,40267:25179,40268:25184,40269:25192,40270:25212,40271:25218,40272:25225,40273:25214,40274:25234,40275:25235,40276:25238,40277:25300,40278:25219,40279:25236,40280:25303,40281:25297,40282:25275,40283:25295,40284:25343,40285:25286,40286:25812,40287:25288,40288:25308,40289:25292,40290:25290,40291:25282,40292:25287,40293:25243,40294:25289,40295:25356,40296:25326,40297:25329,40298:25383,40299:25346,40300:25352,40301:25327,40302:25333,40303:25424,40304:25406,40305:25421,40306:25628,40307:25423,40308:25494,40309:25486,40310:25472,40311:25515,40312:25462,40313:25507,40314:25487,40315:25481,40316:25503,40317:25525,40318:25451,40320:25449,40321:25534,40322:25577,40323:25536,40324:25542,40325:25571,40326:25545,40327:25554,40328:25590,40329:25540,40330:25622,40331:25652,40332:25606,40333:25619,40334:25638,40335:25654,40336:25885,40337:25623,40338:25640,40339:25615,40340:25703,40341:25711,40342:25718,40343:25678,40344:25898,40345:25749,40346:25747,40347:25765,40348:25769,40349:25736,40350:25788,40351:25818,40352:25810,40353:25797,40354:25799,40355:25787,40356:25816,40357:25794,40358:25841,40359:25831,40360:33289,40361:25824,40362:25825,40363:25260,40364:25827,40365:25839,40366:25900,40367:25846,40368:25844,40369:25842,40370:25850,40371:25856,40372:25853,40373:25880,40374:25884,40375:25861,40376:25892,40377:25891,40378:25899,40379:25908,40380:25909,40381:25911,40382:25910,40383:25912,40384:30027,40385:25928,40386:25942,40387:25941,40388:25933,40389:25944,40390:25950,40391:25949,40392:25970,40393:25976,40394:25986,40395:25987,40396:35722,40397:26011,40398:26015,40399:26027,40400:26039,40401:26051,40402:26054,40403:26049,40404:26052,40405:26060,40406:26066,40407:26075,40408:26073,40409:26080,40410:26081,40411:26097,40412:26482,40413:26122,40414:26115,40415:26107,40416:26483,40417:26165,40418:26166,40419:26164,40420:26140,40421:26191,40422:26180,40423:26185,40424:26177,40425:26206,40426:26205,40427:26212,40428:26215,40429:26216,40430:26207,40431:26210,40432:26224,40433:26243,40434:26248,40435:26254,40436:26249,40437:26244,40438:26264,40439:26269,40440:26305,40441:26297,40442:26313,40443:26302,40444:26300,40512:26308,40513:26296,40514:26326,40515:26330,40516:26336,40517:26175,40518:26342,40519:26345,40520:26352,40521:26357,40522:26359,40523:26383,40524:26390,40525:26398,40526:26406,40527:26407,40528:38712,40529:26414,40530:26431,40531:26422,40532:26433,40533:26424,40534:26423,40535:26438,40536:26462,40537:26464,40538:26457,40539:26467,40540:26468,40541:26505,40542:26480,40543:26537,40544:26492,40545:26474,40546:26508,40547:26507,40548:26534,40549:26529,40550:26501,40551:26551,40552:26607,40553:26548,40554:26604,40555:26547,40556:26601,40557:26552,40558:26596,40559:26590,40560:26589,40561:26594,40562:26606,40563:26553,40564:26574,40565:26566,40566:26599,40567:27292,40568:26654,40569:26694,40570:26665,40571:26688,40572:26701,40573:26674,40574:26702,40576:26803,40577:26667,40578:26713,40579:26723,40580:26743,40581:26751,40582:26783,40583:26767,40584:26797,40585:26772,40586:26781,40587:26779,40588:26755,40589:27310,40590:26809,40591:26740,40592:26805,40593:26784,40594:26810,40595:26895,40596:26765,40597:26750,40598:26881,40599:26826,40600:26888,40601:26840,40602:26914,40603:26918,40604:26849,40605:26892,40606:26829,40607:26836,40608:26855,40609:26837,40610:26934,40611:26898,40612:26884,40613:26839,40614:26851,40615:26917,40616:26873,40617:26848,40618:26863,40619:26920,40620:26922,40621:26906,40622:26915,40623:26913,40624:26822,40625:27001,40626:26999,40627:26972,40628:27e3,40629:26987,40630:26964,40631:27006,40632:26990,40633:26937,40634:26996,40635:26941,40636:26969,40637:26928,40638:26977,40639:26974,40640:26973,40641:27009,40642:26986,40643:27058,40644:27054,40645:27088,40646:27071,40647:27073,40648:27091,40649:27070,40650:27086,40651:23528,40652:27082,40653:27101,40654:27067,40655:27075,40656:27047,40657:27182,40658:27025,40659:27040,40660:27036,40661:27029,40662:27060,40663:27102,40664:27112,40665:27138,40666:27163,40667:27135,40668:27402,40669:27129,40670:27122,40671:27111,40672:27141,40673:27057,40674:27166,40675:27117,40676:27156,40677:27115,40678:27146,40679:27154,40680:27329,40681:27171,40682:27155,40683:27204,40684:27148,40685:27250,40686:27190,40687:27256,40688:27207,40689:27234,40690:27225,40691:27238,40692:27208,40693:27192,40694:27170,40695:27280,40696:27277,40697:27296,40698:27268,40699:27298,40700:27299,40768:27287,40769:34327,40770:27323,40771:27331,40772:27330,40773:27320,40774:27315,40775:27308,40776:27358,40777:27345,40778:27359,40779:27306,40780:27354,40781:27370,40782:27387,40783:27397,40784:34326,40785:27386,40786:27410,40787:27414,40788:39729,40789:27423,40790:27448,40791:27447,40792:30428,40793:27449,40794:39150,40795:27463,40796:27459,40797:27465,40798:27472,40799:27481,40800:27476,40801:27483,40802:27487,40803:27489,40804:27512,40805:27513,40806:27519,40807:27520,40808:27524,40809:27523,40810:27533,40811:27544,40812:27541,40813:27550,40814:27556,40815:27562,40816:27563,40817:27567,40818:27570,40819:27569,40820:27571,40821:27575,40822:27580,40823:27590,40824:27595,40825:27603,40826:27615,40827:27628,40828:27627,40829:27635,40830:27631,40832:40638,40833:27656,40834:27667,40835:27668,40836:27675,40837:27684,40838:27683,40839:27742,40840:27733,40841:27746,40842:27754,40843:27778,40844:27789,40845:27802,40846:27777,40847:27803,40848:27774,40849:27752,40850:27763,40851:27794,40852:27792,40853:27844,40854:27889,40855:27859,40856:27837,40857:27863,40858:27845,40859:27869,40860:27822,40861:27825,40862:27838,40863:27834,40864:27867,40865:27887,40866:27865,40867:27882,40868:27935,40869:34893,40870:27958,40871:27947,40872:27965,40873:27960,40874:27929,40875:27957,40876:27955,40877:27922,40878:27916,40879:28003,40880:28051,40881:28004,40882:27994,40883:28025,40884:27993,40885:28046,40886:28053,40887:28644,40888:28037,40889:28153,40890:28181,40891:28170,40892:28085,40893:28103,40894:28134,40895:28088,40896:28102,40897:28140,40898:28126,40899:28108,40900:28136,40901:28114,40902:28101,40903:28154,40904:28121,40905:28132,40906:28117,40907:28138,40908:28142,40909:28205,40910:28270,40911:28206,40912:28185,40913:28274,40914:28255,40915:28222,40916:28195,40917:28267,40918:28203,40919:28278,40920:28237,40921:28191,40922:28227,40923:28218,40924:28238,40925:28196,40926:28415,40927:28189,40928:28216,40929:28290,40930:28330,40931:28312,40932:28361,40933:28343,40934:28371,40935:28349,40936:28335,40937:28356,40938:28338,40939:28372,40940:28373,40941:28303,40942:28325,40943:28354,40944:28319,40945:28481,40946:28433,40947:28748,40948:28396,40949:28408,40950:28414,40951:28479,40952:28402,40953:28465,40954:28399,40955:28466,40956:28364,161:65377,162:65378,163:65379,164:65380,165:65381,166:65382,167:65383,168:65384,169:65385,170:65386,171:65387,172:65388,173:65389,174:65390,175:65391,176:65392,177:65393,178:65394,179:65395,180:65396,181:65397,182:65398,183:65399,184:65400,185:65401,186:65402,187:65403,188:65404,189:65405,190:65406,191:65407,192:65408,193:65409,194:65410,195:65411,196:65412,197:65413,198:65414,199:65415,200:65416,201:65417,202:65418,203:65419,204:65420,205:65421,206:65422,207:65423,208:65424,209:65425,210:65426,211:65427,212:65428,213:65429,214:65430,215:65431,216:65432,217:65433,218:65434,219:65435,220:65436,221:65437,222:65438,223:65439,57408:28478,57409:28435,57410:28407,57411:28550,57412:28538,57413:28536,57414:28545,57415:28544,57416:28527,57417:28507,57418:28659,57419:28525,57420:28546,57421:28540,57422:28504,57423:28558,57424:28561,57425:28610,57426:28518,57427:28595,57428:28579,57429:28577,57430:28580,57431:28601,57432:28614,57433:28586,57434:28639,57435:28629,57436:28652,57437:28628,57438:28632,57439:28657,57440:28654,57441:28635,57442:28681,57443:28683,57444:28666,57445:28689,57446:28673,57447:28687,57448:28670,57449:28699,57450:28698,57451:28532,57452:28701,57453:28696,57454:28703,57455:28720,57456:28734,57457:28722,57458:28753,57459:28771,57460:28825,57461:28818,57462:28847,57463:28913,57464:28844,57465:28856,57466:28851,57467:28846,57468:28895,57469:28875,57470:28893,57472:28889,57473:28937,57474:28925,57475:28956,57476:28953,57477:29029,57478:29013,57479:29064,57480:29030,57481:29026,57482:29004,57483:29014,57484:29036,57485:29071,57486:29179,57487:29060,57488:29077,57489:29096,57490:29100,57491:29143,57492:29113,57493:29118,57494:29138,57495:29129,57496:29140,57497:29134,57498:29152,57499:29164,57500:29159,57501:29173,57502:29180,57503:29177,57504:29183,57505:29197,57506:29200,57507:29211,57508:29224,57509:29229,57510:29228,57511:29232,57512:29234,57513:29243,57514:29244,57515:29247,57516:29248,57517:29254,57518:29259,57519:29272,57520:29300,57521:29310,57522:29314,57523:29313,57524:29319,57525:29330,57526:29334,57527:29346,57528:29351,57529:29369,57530:29362,57531:29379,57532:29382,57533:29380,57534:29390,57535:29394,57536:29410,57537:29408,57538:29409,57539:29433,57540:29431,57541:20495,57542:29463,57543:29450,57544:29468,57545:29462,57546:29469,57547:29492,57548:29487,57549:29481,57550:29477,57551:29502,57552:29518,57553:29519,57554:40664,57555:29527,57556:29546,57557:29544,57558:29552,57559:29560,57560:29557,57561:29563,57562:29562,57563:29640,57564:29619,57565:29646,57566:29627,57567:29632,57568:29669,57569:29678,57570:29662,57571:29858,57572:29701,57573:29807,57574:29733,57575:29688,57576:29746,57577:29754,57578:29781,57579:29759,57580:29791,57581:29785,57582:29761,57583:29788,57584:29801,57585:29808,57586:29795,57587:29802,57588:29814,57589:29822,57590:29835,57591:29854,57592:29863,57593:29898,57594:29903,57595:29908,57596:29681,57664:29920,57665:29923,57666:29927,57667:29929,57668:29934,57669:29938,57670:29936,57671:29937,57672:29944,57673:29943,57674:29956,57675:29955,57676:29957,57677:29964,57678:29966,57679:29965,57680:29973,57681:29971,57682:29982,57683:29990,57684:29996,57685:30012,57686:30020,57687:30029,57688:30026,57689:30025,57690:30043,57691:30022,57692:30042,57693:30057,57694:30052,57695:30055,57696:30059,57697:30061,57698:30072,57699:30070,57700:30086,57701:30087,57702:30068,57703:30090,57704:30089,57705:30082,57706:30100,57707:30106,57708:30109,57709:30117,57710:30115,57711:30146,57712:30131,57713:30147,57714:30133,57715:30141,57716:30136,57717:30140,57718:30129,57719:30157,57720:30154,57721:30162,57722:30169,57723:30179,57724:30174,57725:30206,57726:30207,57728:30204,57729:30209,57730:30192,57731:30202,57732:30194,57733:30195,57734:30219,57735:30221,57736:30217,57737:30239,57738:30247,57739:30240,57740:30241,57741:30242,57742:30244,57743:30260,57744:30256,57745:30267,57746:30279,57747:30280,57748:30278,57749:30300,57750:30296,57751:30305,57752:30306,57753:30312,57754:30313,57755:30314,57756:30311,57757:30316,57758:30320,57759:30322,57760:30326,57761:30328,57762:30332,57763:30336,57764:30339,57765:30344,57766:30347,57767:30350,57768:30358,57769:30355,57770:30361,57771:30362,57772:30384,57773:30388,57774:30392,57775:30393,57776:30394,57777:30402,57778:30413,57779:30422,57780:30418,57781:30430,57782:30433,57783:30437,57784:30439,57785:30442,57786:34351,57787:30459,57788:30472,57789:30471,57790:30468,57791:30505,57792:30500,57793:30494,57794:30501,57795:30502,57796:30491,57797:30519,57798:30520,57799:30535,57800:30554,57801:30568,57802:30571,57803:30555,57804:30565,57805:30591,57806:30590,57807:30585,57808:30606,57809:30603,57810:30609,57811:30624,57812:30622,57813:30640,57814:30646,57815:30649,57816:30655,57817:30652,57818:30653,57819:30651,57820:30663,57821:30669,57822:30679,57823:30682,57824:30684,57825:30691,57826:30702,57827:30716,57828:30732,57829:30738,57830:31014,57831:30752,57832:31018,57833:30789,57834:30862,57835:30836,57836:30854,57837:30844,57838:30874,57839:30860,57840:30883,57841:30901,57842:30890,57843:30895,57844:30929,57845:30918,57846:30923,57847:30932,57848:30910,57849:30908,57850:30917,57851:30922,57852:30956,57920:30951,57921:30938,57922:30973,57923:30964,57924:30983,57925:30994,57926:30993,57927:31001,57928:31020,57929:31019,57930:31040,57931:31072,57932:31063,57933:31071,57934:31066,57935:31061,57936:31059,57937:31098,57938:31103,57939:31114,57940:31133,57941:31143,57942:40779,57943:31146,57944:31150,57945:31155,57946:31161,57947:31162,57948:31177,57949:31189,57950:31207,57951:31212,57952:31201,57953:31203,57954:31240,57955:31245,57956:31256,57957:31257,57958:31264,57959:31263,57960:31104,57961:31281,57962:31291,57963:31294,57964:31287,57965:31299,57966:31319,57967:31305,57968:31329,57969:31330,57970:31337,57971:40861,57972:31344,57973:31353,57974:31357,57975:31368,57976:31383,57977:31381,57978:31384,57979:31382,57980:31401,57981:31432,57982:31408,57984:31414,57985:31429,57986:31428,57987:31423,57988:36995,57989:31431,57990:31434,57991:31437,57992:31439,57993:31445,57994:31443,57995:31449,57996:31450,57997:31453,57998:31457,57999:31458,58e3:31462,58001:31469,58002:31472,58003:31490,58004:31503,58005:31498,58006:31494,58007:31539,58008:31512,58009:31513,58010:31518,58011:31541,58012:31528,58013:31542,58014:31568,58015:31610,58016:31492,58017:31565,58018:31499,58019:31564,58020:31557,58021:31605,58022:31589,58023:31604,58024:31591,58025:31600,58026:31601,58027:31596,58028:31598,58029:31645,58030:31640,58031:31647,58032:31629,58033:31644,58034:31642,58035:31627,58036:31634,58037:31631,58038:31581,58039:31641,58040:31691,58041:31681,58042:31692,58043:31695,58044:31668,58045:31686,58046:31709,58047:31721,58048:31761,58049:31764,58050:31718,58051:31717,58052:31840,58053:31744,58054:31751,58055:31763,58056:31731,58057:31735,58058:31767,58059:31757,58060:31734,58061:31779,58062:31783,58063:31786,58064:31775,58065:31799,58066:31787,58067:31805,58068:31820,58069:31811,58070:31828,58071:31823,58072:31808,58073:31824,58074:31832,58075:31839,58076:31844,58077:31830,58078:31845,58079:31852,58080:31861,58081:31875,58082:31888,58083:31908,58084:31917,58085:31906,58086:31915,58087:31905,58088:31912,58089:31923,58090:31922,58091:31921,58092:31918,58093:31929,58094:31933,58095:31936,58096:31941,58097:31938,58098:31960,58099:31954,58100:31964,58101:31970,58102:39739,58103:31983,58104:31986,58105:31988,58106:31990,58107:31994,58108:32006,58176:32002,58177:32028,58178:32021,58179:32010,58180:32069,58181:32075,58182:32046,58183:32050,58184:32063,58185:32053,58186:32070,58187:32115,58188:32086,58189:32078,58190:32114,58191:32104,58192:32110,58193:32079,58194:32099,58195:32147,58196:32137,58197:32091,58198:32143,58199:32125,58200:32155,58201:32186,58202:32174,58203:32163,58204:32181,58205:32199,58206:32189,58207:32171,58208:32317,58209:32162,58210:32175,58211:32220,58212:32184,58213:32159,58214:32176,58215:32216,58216:32221,58217:32228,58218:32222,58219:32251,58220:32242,58221:32225,58222:32261,58223:32266,58224:32291,58225:32289,58226:32274,58227:32305,58228:32287,58229:32265,58230:32267,58231:32290,58232:32326,58233:32358,58234:32315,58235:32309,58236:32313,58237:32323,58238:32311,58240:32306,58241:32314,58242:32359,58243:32349,58244:32342,58245:32350,58246:32345,58247:32346,58248:32377,58249:32362,58250:32361,58251:32380,58252:32379,58253:32387,58254:32213,58255:32381,58256:36782,58257:32383,58258:32392,58259:32393,58260:32396,58261:32402,58262:32400,58263:32403,58264:32404,58265:32406,58266:32398,58267:32411,58268:32412,58269:32568,58270:32570,58271:32581,58272:32588,58273:32589,58274:32590,58275:32592,58276:32593,58277:32597,58278:32596,58279:32600,58280:32607,58281:32608,58282:32616,58283:32617,58284:32615,58285:32632,58286:32642,58287:32646,58288:32643,58289:32648,58290:32647,58291:32652,58292:32660,58293:32670,58294:32669,58295:32666,58296:32675,58297:32687,58298:32690,58299:32697,58300:32686,58301:32694,58302:32696,58303:35697,58304:32709,58305:32710,58306:32714,58307:32725,58308:32724,58309:32737,58310:32742,58311:32745,58312:32755,58313:32761,58314:39132,58315:32774,58316:32772,58317:32779,58318:32786,58319:32792,58320:32793,58321:32796,58322:32801,58323:32808,58324:32831,58325:32827,58326:32842,58327:32838,58328:32850,58329:32856,58330:32858,58331:32863,58332:32866,58333:32872,58334:32883,58335:32882,58336:32880,58337:32886,58338:32889,58339:32893,58340:32895,58341:32900,58342:32902,58343:32901,58344:32923,58345:32915,58346:32922,58347:32941,58348:20880,58349:32940,58350:32987,58351:32997,58352:32985,58353:32989,58354:32964,58355:32986,58356:32982,58357:33033,58358:33007,58359:33009,58360:33051,58361:33065,58362:33059,58363:33071,58364:33099,58432:38539,58433:33094,58434:33086,58435:33107,58436:33105,58437:33020,58438:33137,58439:33134,58440:33125,58441:33126,58442:33140,58443:33155,58444:33160,58445:33162,58446:33152,58447:33154,58448:33184,58449:33173,58450:33188,58451:33187,58452:33119,58453:33171,58454:33193,58455:33200,58456:33205,58457:33214,58458:33208,58459:33213,58460:33216,58461:33218,58462:33210,58463:33225,58464:33229,58465:33233,58466:33241,58467:33240,58468:33224,58469:33242,58470:33247,58471:33248,58472:33255,58473:33274,58474:33275,58475:33278,58476:33281,58477:33282,58478:33285,58479:33287,58480:33290,58481:33293,58482:33296,58483:33302,58484:33321,58485:33323,58486:33336,58487:33331,58488:33344,58489:33369,58490:33368,58491:33373,58492:33370,58493:33375,58494:33380,58496:33378,58497:33384,58498:33386,58499:33387,58500:33326,58501:33393,58502:33399,58503:33400,58504:33406,58505:33421,58506:33426,58507:33451,58508:33439,58509:33467,58510:33452,58511:33505,58512:33507,58513:33503,58514:33490,58515:33524,58516:33523,58517:33530,58518:33683,58519:33539,58520:33531,58521:33529,58522:33502,58523:33542,58524:33500,58525:33545,58526:33497,58527:33589,58528:33588,58529:33558,58530:33586,58531:33585,58532:33600,58533:33593,58534:33616,58535:33605,58536:33583,58537:33579,58538:33559,58539:33560,58540:33669,58541:33690,58542:33706,58543:33695,58544:33698,58545:33686,58546:33571,58547:33678,58548:33671,58549:33674,58550:33660,58551:33717,58552:33651,58553:33653,58554:33696,58555:33673,58556:33704,58557:33780,58558:33811,58559:33771,58560:33742,58561:33789,58562:33795,58563:33752,58564:33803,58565:33729,58566:33783,58567:33799,58568:33760,58569:33778,58570:33805,58571:33826,58572:33824,58573:33725,58574:33848,58575:34054,58576:33787,58577:33901,58578:33834,58579:33852,58580:34138,58581:33924,58582:33911,58583:33899,58584:33965,58585:33902,58586:33922,58587:33897,58588:33862,58589:33836,58590:33903,58591:33913,58592:33845,58593:33994,58594:33890,58595:33977,58596:33983,58597:33951,58598:34009,58599:33997,58600:33979,58601:34010,58602:34e3,58603:33985,58604:33990,58605:34006,58606:33953,58607:34081,58608:34047,58609:34036,58610:34071,58611:34072,58612:34092,58613:34079,58614:34069,58615:34068,58616:34044,58617:34112,58618:34147,58619:34136,58620:34120,58688:34113,58689:34306,58690:34123,58691:34133,58692:34176,58693:34212,58694:34184,58695:34193,58696:34186,58697:34216,58698:34157,58699:34196,58700:34203,58701:34282,58702:34183,58703:34204,58704:34167,58705:34174,58706:34192,58707:34249,58708:34234,58709:34255,58710:34233,58711:34256,58712:34261,58713:34269,58714:34277,58715:34268,58716:34297,58717:34314,58718:34323,58719:34315,58720:34302,58721:34298,58722:34310,58723:34338,58724:34330,58725:34352,58726:34367,58727:34381,58728:20053,58729:34388,58730:34399,58731:34407,58732:34417,58733:34451,58734:34467,58735:34473,58736:34474,58737:34443,58738:34444,58739:34486,58740:34479,58741:34500,58742:34502,58743:34480,58744:34505,58745:34851,58746:34475,58747:34516,58748:34526,58749:34537,58750:34540,58752:34527,58753:34523,58754:34543,58755:34578,58756:34566,58757:34568,58758:34560,58759:34563,58760:34555,58761:34577,58762:34569,58763:34573,58764:34553,58765:34570,58766:34612,58767:34623,58768:34615,58769:34619,58770:34597,58771:34601,58772:34586,58773:34656,58774:34655,58775:34680,58776:34636,58777:34638,58778:34676,58779:34647,58780:34664,58781:34670,58782:34649,58783:34643,58784:34659,58785:34666,58786:34821,58787:34722,58788:34719,58789:34690,58790:34735,58791:34763,58792:34749,58793:34752,58794:34768,58795:38614,58796:34731,58797:34756,58798:34739,58799:34759,58800:34758,58801:34747,58802:34799,58803:34802,58804:34784,58805:34831,58806:34829,58807:34814,58808:34806,58809:34807,58810:34830,58811:34770,58812:34833,58813:34838,58814:34837,58815:34850,58816:34849,58817:34865,58818:34870,58819:34873,58820:34855,58821:34875,58822:34884,58823:34882,58824:34898,58825:34905,58826:34910,58827:34914,58828:34923,58829:34945,58830:34942,58831:34974,58832:34933,58833:34941,58834:34997,58835:34930,58836:34946,58837:34967,58838:34962,58839:34990,58840:34969,58841:34978,58842:34957,58843:34980,58844:34992,58845:35007,58846:34993,58847:35011,58848:35012,58849:35028,58850:35032,58851:35033,58852:35037,58853:35065,58854:35074,58855:35068,58856:35060,58857:35048,58858:35058,58859:35076,58860:35084,58861:35082,58862:35091,58863:35139,58864:35102,58865:35109,58866:35114,58867:35115,58868:35137,58869:35140,58870:35131,58871:35126,58872:35128,58873:35148,58874:35101,58875:35168,58876:35166,58944:35174,58945:35172,58946:35181,58947:35178,58948:35183,58949:35188,58950:35191,58951:35198,58952:35203,58953:35208,58954:35210,58955:35219,58956:35224,58957:35233,58958:35241,58959:35238,58960:35244,58961:35247,58962:35250,58963:35258,58964:35261,58965:35263,58966:35264,58967:35290,58968:35292,58969:35293,58970:35303,58971:35316,58972:35320,58973:35331,58974:35350,58975:35344,58976:35340,58977:35355,58978:35357,58979:35365,58980:35382,58981:35393,58982:35419,58983:35410,58984:35398,58985:35400,58986:35452,58987:35437,58988:35436,58989:35426,58990:35461,58991:35458,58992:35460,58993:35496,58994:35489,58995:35473,58996:35493,58997:35494,58998:35482,58999:35491,59e3:35524,59001:35533,59002:35522,59003:35546,59004:35563,59005:35571,59006:35559,59008:35556,59009:35569,59010:35604,59011:35552,59012:35554,59013:35575,59014:35550,59015:35547,59016:35596,59017:35591,59018:35610,59019:35553,59020:35606,59021:35600,59022:35607,59023:35616,59024:35635,59025:38827,59026:35622,59027:35627,59028:35646,59029:35624,59030:35649,59031:35660,59032:35663,59033:35662,59034:35657,59035:35670,59036:35675,59037:35674,59038:35691,59039:35679,59040:35692,59041:35695,59042:35700,59043:35709,59044:35712,59045:35724,59046:35726,59047:35730,59048:35731,59049:35734,59050:35737,59051:35738,59052:35898,59053:35905,59054:35903,59055:35912,59056:35916,59057:35918,59058:35920,59059:35925,59060:35938,59061:35948,59062:35960,59063:35962,59064:35970,59065:35977,59066:35973,59067:35978,59068:35981,59069:35982,59070:35988,59071:35964,59072:35992,59073:25117,59074:36013,59075:36010,59076:36029,59077:36018,59078:36019,59079:36014,59080:36022,59081:36040,59082:36033,59083:36068,59084:36067,59085:36058,59086:36093,59087:36090,59088:36091,59089:36100,59090:36101,59091:36106,59092:36103,59093:36111,59094:36109,59095:36112,59096:40782,59097:36115,59098:36045,59099:36116,59100:36118,59101:36199,59102:36205,59103:36209,59104:36211,59105:36225,59106:36249,59107:36290,59108:36286,59109:36282,59110:36303,59111:36314,59112:36310,59113:36300,59114:36315,59115:36299,59116:36330,59117:36331,59118:36319,59119:36323,59120:36348,59121:36360,59122:36361,59123:36351,59124:36381,59125:36382,59126:36368,59127:36383,59128:36418,59129:36405,59130:36400,59131:36404,59132:36426,59200:36423,59201:36425,59202:36428,59203:36432,59204:36424,59205:36441,59206:36452,59207:36448,59208:36394,59209:36451,59210:36437,59211:36470,59212:36466,59213:36476,59214:36481,59215:36487,59216:36485,59217:36484,59218:36491,59219:36490,59220:36499,59221:36497,59222:36500,59223:36505,59224:36522,59225:36513,59226:36524,59227:36528,59228:36550,59229:36529,59230:36542,59231:36549,59232:36552,59233:36555,59234:36571,59235:36579,59236:36604,59237:36603,59238:36587,59239:36606,59240:36618,59241:36613,59242:36629,59243:36626,59244:36633,59245:36627,59246:36636,59247:36639,59248:36635,59249:36620,59250:36646,59251:36659,59252:36667,59253:36665,59254:36677,59255:36674,59256:36670,59257:36684,59258:36681,59259:36678,59260:36686,59261:36695,59262:36700,59264:36706,59265:36707,59266:36708,59267:36764,59268:36767,59269:36771,59270:36781,59271:36783,59272:36791,59273:36826,59274:36837,59275:36834,59276:36842,59277:36847,59278:36999,59279:36852,59280:36869,59281:36857,59282:36858,59283:36881,59284:36885,59285:36897,59286:36877,59287:36894,59288:36886,59289:36875,59290:36903,59291:36918,59292:36917,59293:36921,59294:36856,59295:36943,59296:36944,59297:36945,59298:36946,59299:36878,59300:36937,59301:36926,59302:36950,59303:36952,59304:36958,59305:36968,59306:36975,59307:36982,59308:38568,59309:36978,59310:36994,59311:36989,59312:36993,59313:36992,59314:37002,59315:37001,59316:37007,59317:37032,59318:37039,59319:37041,59320:37045,59321:37090,59322:37092,59323:25160,59324:37083,59325:37122,59326:37138,59327:37145,59328:37170,59329:37168,59330:37194,59331:37206,59332:37208,59333:37219,59334:37221,59335:37225,59336:37235,59337:37234,59338:37259,59339:37257,59340:37250,59341:37282,59342:37291,59343:37295,59344:37290,59345:37301,59346:37300,59347:37306,59348:37312,59349:37313,59350:37321,59351:37323,59352:37328,59353:37334,59354:37343,59355:37345,59356:37339,59357:37372,59358:37365,59359:37366,59360:37406,59361:37375,59362:37396,59363:37420,59364:37397,59365:37393,59366:37470,59367:37463,59368:37445,59369:37449,59370:37476,59371:37448,59372:37525,59373:37439,59374:37451,59375:37456,59376:37532,59377:37526,59378:37523,59379:37531,59380:37466,59381:37583,59382:37561,59383:37559,59384:37609,59385:37647,59386:37626,59387:37700,59388:37678,59456:37657,59457:37666,59458:37658,59459:37667,59460:37690,59461:37685,59462:37691,59463:37724,59464:37728,59465:37756,59466:37742,59467:37718,59468:37808,59469:37804,59470:37805,59471:37780,59472:37817,59473:37846,59474:37847,59475:37864,59476:37861,59477:37848,59478:37827,59479:37853,59480:37840,59481:37832,59482:37860,59483:37914,59484:37908,59485:37907,59486:37891,59487:37895,59488:37904,59489:37942,59490:37931,59491:37941,59492:37921,59493:37946,59494:37953,59495:37970,59496:37956,59497:37979,59498:37984,59499:37986,59500:37982,59501:37994,59502:37417,59503:38e3,59504:38005,59505:38007,59506:38013,59507:37978,59508:38012,59509:38014,59510:38017,59511:38015,59512:38274,59513:38279,59514:38282,59515:38292,59516:38294,59517:38296,59518:38297,59520:38304,59521:38312,59522:38311,59523:38317,59524:38332,59525:38331,59526:38329,59527:38334,59528:38346,59529:28662,59530:38339,59531:38349,59532:38348,59533:38357,59534:38356,59535:38358,59536:38364,59537:38369,59538:38373,59539:38370,59540:38433,59541:38440,59542:38446,59543:38447,59544:38466,59545:38476,59546:38479,59547:38475,59548:38519,59549:38492,59550:38494,59551:38493,59552:38495,59553:38502,59554:38514,59555:38508,59556:38541,59557:38552,59558:38549,59559:38551,59560:38570,59561:38567,59562:38577,59563:38578,59564:38576,59565:38580,59566:38582,59567:38584,59568:38585,59569:38606,59570:38603,59571:38601,59572:38605,59573:35149,59574:38620,59575:38669,59576:38613,59577:38649,59578:38660,59579:38662,59580:38664,59581:38675,59582:38670,59583:38673,59584:38671,59585:38678,59586:38681,59587:38692,59588:38698,59589:38704,59590:38713,59591:38717,59592:38718,59593:38724,59594:38726,59595:38728,59596:38722,59597:38729,59598:38748,59599:38752,59600:38756,59601:38758,59602:38760,59603:21202,59604:38763,59605:38769,59606:38777,59607:38789,59608:38780,59609:38785,59610:38778,59611:38790,59612:38795,59613:38799,59614:38800,59615:38812,59616:38824,59617:38822,59618:38819,59619:38835,59620:38836,59621:38851,59622:38854,59623:38856,59624:38859,59625:38876,59626:38893,59627:40783,59628:38898,59629:31455,59630:38902,59631:38901,59632:38927,59633:38924,59634:38968,59635:38948,59636:38945,59637:38967,59638:38973,59639:38982,59640:38991,59641:38987,59642:39019,59643:39023,59644:39024,59712:39025,59713:39028,59714:39027,59715:39082,59716:39087,59717:39089,59718:39094,59719:39108,59720:39107,59721:39110,59722:39145,59723:39147,59724:39171,59725:39177,59726:39186,59727:39188,59728:39192,59729:39201,59730:39197,59731:39198,59732:39204,59733:39200,59734:39212,59735:39214,59736:39229,59737:39230,59738:39234,59739:39241,59740:39237,59741:39248,59742:39243,59743:39249,59744:39250,59745:39244,59746:39253,59747:39319,59748:39320,59749:39333,59750:39341,59751:39342,59752:39356,59753:39391,59754:39387,59755:39389,59756:39384,59757:39377,59758:39405,59759:39406,59760:39409,59761:39410,59762:39419,59763:39416,59764:39425,59765:39439,59766:39429,59767:39394,59768:39449,59769:39467,59770:39479,59771:39493,59772:39490,59773:39488,59774:39491,59776:39486,59777:39509,59778:39501,59779:39515,59780:39511,59781:39519,59782:39522,59783:39525,59784:39524,59785:39529,59786:39531,59787:39530,59788:39597,59789:39600,59790:39612,59791:39616,59792:39631,59793:39633,59794:39635,59795:39636,59796:39646,59797:39647,59798:39650,59799:39651,59800:39654,59801:39663,59802:39659,59803:39662,59804:39668,59805:39665,59806:39671,59807:39675,59808:39686,59809:39704,59810:39706,59811:39711,59812:39714,59813:39715,59814:39717,59815:39719,59816:39720,59817:39721,59818:39722,59819:39726,59820:39727,59821:39730,59822:39748,59823:39747,59824:39759,59825:39757,59826:39758,59827:39761,59828:39768,59829:39796,59830:39827,59831:39811,59832:39825,59833:39830,59834:39831,59835:39839,59836:39840,59837:39848,59838:39860,59839:39872,59840:39882,59841:39865,59842:39878,59843:39887,59844:39889,59845:39890,59846:39907,59847:39906,59848:39908,59849:39892,59850:39905,59851:39994,59852:39922,59853:39921,59854:39920,59855:39957,59856:39956,59857:39945,59858:39955,59859:39948,59860:39942,59861:39944,59862:39954,59863:39946,59864:39940,59865:39982,59866:39963,59867:39973,59868:39972,59869:39969,59870:39984,59871:40007,59872:39986,59873:40006,59874:39998,59875:40026,59876:40032,59877:40039,59878:40054,59879:40056,59880:40167,59881:40172,59882:40176,59883:40201,59884:40200,59885:40171,59886:40195,59887:40198,59888:40234,59889:40230,59890:40367,59891:40227,59892:40223,59893:40260,59894:40213,59895:40210,59896:40257,59897:40255,59898:40254,59899:40262,59900:40264,59968:40285,59969:40286,59970:40292,59971:40273,59972:40272,59973:40281,59974:40306,59975:40329,59976:40327,59977:40363,59978:40303,59979:40314,59980:40346,59981:40356,59982:40361,59983:40370,59984:40388,59985:40385,59986:40379,59987:40376,59988:40378,59989:40390,59990:40399,59991:40386,59992:40409,59993:40403,59994:40440,59995:40422,59996:40429,59997:40431,59998:40445,59999:40474,6e4:40475,60001:40478,60002:40565,60003:40569,60004:40573,60005:40577,60006:40584,60007:40587,60008:40588,60009:40594,60010:40597,60011:40593,60012:40605,60013:40613,60014:40617,60015:40632,60016:40618,60017:40621,60018:38753,60019:40652,60020:40654,60021:40655,60022:40656,60023:40660,60024:40668,60025:40670,60026:40669,60027:40672,60028:40677,60029:40680,60030:40687,60032:40692,60033:40694,60034:40695,60035:40697,60036:40699,60037:40700,60038:40701,60039:40711,60040:40712,60041:30391,60042:40725,60043:40737,60044:40748,60045:40766,60046:40778,60047:40786,60048:40788,60049:40803,60050:40799,60051:40800,60052:40801,60053:40806,60054:40807,60055:40812,60056:40810,60057:40823,60058:40818,60059:40822,60060:40853,60061:40860,60062:40864,60063:22575,60064:27079,60065:36953,60066:29796,60067:20956,60068:29081}},function(w,x,g){Object.defineProperty(x,"__esModule",{value:!0});var u=g(1),d=g(2);function r(a,m,o,l){var n;m.degree()<o.degree()&&(n=[o,m],m=n[0],o=n[1]);for(var c=m,i=o,v=a.zero,B=a.one;i.degree()>=l/2;){var h=c,k=v;if(c=i,v=B,c.isZero())return null;i=h;for(var P=a.zero,y=c.getCoefficient(c.degree()),z=a.inverse(y);i.degree()>=c.degree()&&!i.isZero();){var S=i.degree()-c.degree(),N=a.multiply(i.getCoefficient(i.degree()),z);P=P.addOrSubtract(a.buildMonomial(S,N)),i=i.addOrSubtract(c.multiplyByMonomial(S,N))}if(B=P.multiplyPoly(v).addOrSubtract(k),i.degree()>=c.degree())return null}var U=B.getCoefficient(0);if(U===0)return null;var C=a.inverse(U);return[B.multiply(C),i.multiply(C)]}function s(a,m){var o=m.degree();if(o===1)return[m.getCoefficient(1)];for(var l=new Array(o),n=0,c=1;c<a.size&&n<o;c++)m.evaluateAt(c)===0&&(l[n]=a.inverse(c),n++);return n!==o?null:l}function p(a,m,o){for(var l=o.length,n=new Array(l),c=0;c<l;c++){for(var i=a.inverse(o[c]),v=1,B=0;B<l;B++)c!==B&&(v=a.multiply(v,u.addOrSubtractGF(1,a.multiply(o[B],i))));n[c]=a.multiply(m.evaluateAt(i),a.inverse(v)),a.generatorBase!==0&&(n[c]=a.multiply(n[c],i))}return n}function f(a,m){var o=new Uint8ClampedArray(a.length);o.set(a);for(var l=new u.default(285,256,0),n=new d.default(l,o),c=new Uint8ClampedArray(m),i=!1,v=0;v<m;v++){var B=n.evaluateAt(l.exp(v+l.generatorBase));c[c.length-1-v]=B,B!==0&&(i=!0)}if(!i)return o;var h=new d.default(l,c),k=r(l,l.buildMonomial(m,1),h,m);if(k===null)return null;var P=s(l,k[0]);if(P==null)return null;for(var y=p(l,k[1],P),z=0;z<P.length;z++){var S=o.length-1-l.log(P[z]);if(S<0)return null;o[S]=u.addOrSubtractGF(o[S],y[z])}return o}x.decode=f},function(w,x,g){Object.defineProperty(x,"__esModule",{value:!0}),x.VERSIONS=[{infoBits:null,versionNumber:1,alignmentPatternCenters:[],errorCorrectionLevels:[{ecCodewordsPerBlock:7,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:10,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:16}]},{ecCodewordsPerBlock:13,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:13}]},{ecCodewordsPerBlock:17,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:9}]}]},{infoBits:null,versionNumber:2,alignmentPatternCenters:[6,18],errorCorrectionLevels:[{ecCodewordsPerBlock:10,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:34}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:28}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:22}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:16}]}]},{infoBits:null,versionNumber:3,alignmentPatternCenters:[6,22],errorCorrectionLevels:[{ecCodewordsPerBlock:15,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:55}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:13}]}]},{infoBits:null,versionNumber:4,alignmentPatternCenters:[6,26],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:80}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:32}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:9}]}]},{infoBits:null,versionNumber:5,alignmentPatternCenters:[6,30],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:43}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:15},{numBlocks:2,dataCodewordsPerBlock:16}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:11},{numBlocks:2,dataCodewordsPerBlock:12}]}]},{infoBits:null,versionNumber:6,alignmentPatternCenters:[6,34],errorCorrectionLevels:[{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:68}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:27}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:15}]}]},{infoBits:31892,versionNumber:7,alignmentPatternCenters:[6,22,38],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:78}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:31}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:14},{numBlocks:4,dataCodewordsPerBlock:15}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:13},{numBlocks:1,dataCodewordsPerBlock:14}]}]},{infoBits:34236,versionNumber:8,alignmentPatternCenters:[6,24,42],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:97}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:38},{numBlocks:2,dataCodewordsPerBlock:39}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:18},{numBlocks:2,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:14},{numBlocks:2,dataCodewordsPerBlock:15}]}]},{infoBits:39577,versionNumber:9,alignmentPatternCenters:[6,26,46],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:36},{numBlocks:2,dataCodewordsPerBlock:37}]},{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:16},{numBlocks:4,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:12},{numBlocks:4,dataCodewordsPerBlock:13}]}]},{infoBits:42195,versionNumber:10,alignmentPatternCenters:[6,28,50],errorCorrectionLevels:[{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:68},{numBlocks:2,dataCodewordsPerBlock:69}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:43},{numBlocks:1,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:19},{numBlocks:2,dataCodewordsPerBlock:20}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:15},{numBlocks:2,dataCodewordsPerBlock:16}]}]},{infoBits:48118,versionNumber:11,alignmentPatternCenters:[6,30,54],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:81}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:50},{numBlocks:4,dataCodewordsPerBlock:51}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:22},{numBlocks:4,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:12},{numBlocks:8,dataCodewordsPerBlock:13}]}]},{infoBits:51042,versionNumber:12,alignmentPatternCenters:[6,32,58],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:92},{numBlocks:2,dataCodewordsPerBlock:93}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:36},{numBlocks:2,dataCodewordsPerBlock:37}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:20},{numBlocks:6,dataCodewordsPerBlock:21}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:14},{numBlocks:4,dataCodewordsPerBlock:15}]}]},{infoBits:55367,versionNumber:13,alignmentPatternCenters:[6,34,62],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:107}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:37},{numBlocks:1,dataCodewordsPerBlock:38}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:20},{numBlocks:4,dataCodewordsPerBlock:21}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:11},{numBlocks:4,dataCodewordsPerBlock:12}]}]},{infoBits:58893,versionNumber:14,alignmentPatternCenters:[6,26,46,66],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:115},{numBlocks:1,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:40},{numBlocks:5,dataCodewordsPerBlock:41}]},{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:16},{numBlocks:5,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:12},{numBlocks:5,dataCodewordsPerBlock:13}]}]},{infoBits:63784,versionNumber:15,alignmentPatternCenters:[6,26,48,70],errorCorrectionLevels:[{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:87},{numBlocks:1,dataCodewordsPerBlock:88}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:41},{numBlocks:5,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:24},{numBlocks:7,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:12},{numBlocks:7,dataCodewordsPerBlock:13}]}]},{infoBits:68472,versionNumber:16,alignmentPatternCenters:[6,26,50,74],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:98},{numBlocks:1,dataCodewordsPerBlock:99}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:45},{numBlocks:3,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:19},{numBlocks:2,dataCodewordsPerBlock:20}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:15},{numBlocks:13,dataCodewordsPerBlock:16}]}]},{infoBits:70749,versionNumber:17,alignmentPatternCenters:[6,30,54,78],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:107},{numBlocks:5,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:46},{numBlocks:1,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:22},{numBlocks:15,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:14},{numBlocks:17,dataCodewordsPerBlock:15}]}]},{infoBits:76311,versionNumber:18,alignmentPatternCenters:[6,30,56,82],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:120},{numBlocks:1,dataCodewordsPerBlock:121}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:9,dataCodewordsPerBlock:43},{numBlocks:4,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:22},{numBlocks:1,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:14},{numBlocks:19,dataCodewordsPerBlock:15}]}]},{infoBits:79154,versionNumber:19,alignmentPatternCenters:[6,30,58,86],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:113},{numBlocks:4,dataCodewordsPerBlock:114}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:44},{numBlocks:11,dataCodewordsPerBlock:45}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:21},{numBlocks:4,dataCodewordsPerBlock:22}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:9,dataCodewordsPerBlock:13},{numBlocks:16,dataCodewordsPerBlock:14}]}]},{infoBits:84390,versionNumber:20,alignmentPatternCenters:[6,34,62,90],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:107},{numBlocks:5,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:41},{numBlocks:13,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:24},{numBlocks:5,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:15},{numBlocks:10,dataCodewordsPerBlock:16}]}]},{infoBits:87683,versionNumber:21,alignmentPatternCenters:[6,28,50,72,94],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:116},{numBlocks:4,dataCodewordsPerBlock:117}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:22},{numBlocks:6,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:16},{numBlocks:6,dataCodewordsPerBlock:17}]}]},{infoBits:92361,versionNumber:22,alignmentPatternCenters:[6,26,50,74,98],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:111},{numBlocks:7,dataCodewordsPerBlock:112}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:24},{numBlocks:16,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:34,dataCodewordsPerBlock:13}]}]},{infoBits:96236,versionNumber:23,alignmentPatternCenters:[6,30,54,74,102],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:121},{numBlocks:5,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:47},{numBlocks:14,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:24},{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:16,dataCodewordsPerBlock:15},{numBlocks:14,dataCodewordsPerBlock:16}]}]},{infoBits:102084,versionNumber:24,alignmentPatternCenters:[6,28,54,80,106],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:117},{numBlocks:4,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:45},{numBlocks:14,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:24},{numBlocks:16,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:30,dataCodewordsPerBlock:16},{numBlocks:2,dataCodewordsPerBlock:17}]}]},{infoBits:102881,versionNumber:25,alignmentPatternCenters:[6,32,58,84,110],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:106},{numBlocks:4,dataCodewordsPerBlock:107}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:47},{numBlocks:13,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:24},{numBlocks:22,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:15},{numBlocks:13,dataCodewordsPerBlock:16}]}]},{infoBits:110507,versionNumber:26,alignmentPatternCenters:[6,30,58,86,114],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:114},{numBlocks:2,dataCodewordsPerBlock:115}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:46},{numBlocks:4,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:28,dataCodewordsPerBlock:22},{numBlocks:6,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:33,dataCodewordsPerBlock:16},{numBlocks:4,dataCodewordsPerBlock:17}]}]},{infoBits:110734,versionNumber:27,alignmentPatternCenters:[6,34,62,90,118],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:122},{numBlocks:4,dataCodewordsPerBlock:123}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:45},{numBlocks:3,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:23},{numBlocks:26,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:15},{numBlocks:28,dataCodewordsPerBlock:16}]}]},{infoBits:117786,versionNumber:28,alignmentPatternCenters:[6,26,50,74,98,122],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:117},{numBlocks:10,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:45},{numBlocks:23,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:24},{numBlocks:31,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:15},{numBlocks:31,dataCodewordsPerBlock:16}]}]},{infoBits:119615,versionNumber:29,alignmentPatternCenters:[6,30,54,78,102,126],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:116},{numBlocks:7,dataCodewordsPerBlock:117}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:21,dataCodewordsPerBlock:45},{numBlocks:7,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:23},{numBlocks:37,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:15},{numBlocks:26,dataCodewordsPerBlock:16}]}]},{infoBits:126325,versionNumber:30,alignmentPatternCenters:[6,26,52,78,104,130],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:115},{numBlocks:10,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:47},{numBlocks:10,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:24},{numBlocks:25,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:23,dataCodewordsPerBlock:15},{numBlocks:25,dataCodewordsPerBlock:16}]}]},{infoBits:127568,versionNumber:31,alignmentPatternCenters:[6,30,56,82,108,134],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:115},{numBlocks:3,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:46},{numBlocks:29,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:42,dataCodewordsPerBlock:24},{numBlocks:1,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:23,dataCodewordsPerBlock:15},{numBlocks:28,dataCodewordsPerBlock:16}]}]},{infoBits:133589,versionNumber:32,alignmentPatternCenters:[6,34,60,86,112,138],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:115}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:46},{numBlocks:23,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:24},{numBlocks:35,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:15},{numBlocks:35,dataCodewordsPerBlock:16}]}]},{infoBits:136944,versionNumber:33,alignmentPatternCenters:[6,30,58,86,114,142],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:115},{numBlocks:1,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:14,dataCodewordsPerBlock:46},{numBlocks:21,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:29,dataCodewordsPerBlock:24},{numBlocks:19,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:15},{numBlocks:46,dataCodewordsPerBlock:16}]}]},{infoBits:141498,versionNumber:34,alignmentPatternCenters:[6,34,62,90,118,146],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:115},{numBlocks:6,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:14,dataCodewordsPerBlock:46},{numBlocks:23,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:44,dataCodewordsPerBlock:24},{numBlocks:7,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:59,dataCodewordsPerBlock:16},{numBlocks:1,dataCodewordsPerBlock:17}]}]},{infoBits:145311,versionNumber:35,alignmentPatternCenters:[6,30,54,78,102,126,150],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:121},{numBlocks:7,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:47},{numBlocks:26,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:39,dataCodewordsPerBlock:24},{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:15},{numBlocks:41,dataCodewordsPerBlock:16}]}]},{infoBits:150283,versionNumber:36,alignmentPatternCenters:[6,24,50,76,102,128,154],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:121},{numBlocks:14,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:47},{numBlocks:34,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:46,dataCodewordsPerBlock:24},{numBlocks:10,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:15},{numBlocks:64,dataCodewordsPerBlock:16}]}]},{infoBits:152622,versionNumber:37,alignmentPatternCenters:[6,28,54,80,106,132,158],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:122},{numBlocks:4,dataCodewordsPerBlock:123}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:29,dataCodewordsPerBlock:46},{numBlocks:14,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:49,dataCodewordsPerBlock:24},{numBlocks:10,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:24,dataCodewordsPerBlock:15},{numBlocks:46,dataCodewordsPerBlock:16}]}]},{infoBits:158308,versionNumber:38,alignmentPatternCenters:[6,32,58,84,110,136,162],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:122},{numBlocks:18,dataCodewordsPerBlock:123}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:46},{numBlocks:32,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:48,dataCodewordsPerBlock:24},{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:42,dataCodewordsPerBlock:15},{numBlocks:32,dataCodewordsPerBlock:16}]}]},{infoBits:161089,versionNumber:39,alignmentPatternCenters:[6,26,54,82,110,138,166],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:20,dataCodewordsPerBlock:117},{numBlocks:4,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:40,dataCodewordsPerBlock:47},{numBlocks:7,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:43,dataCodewordsPerBlock:24},{numBlocks:22,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:15},{numBlocks:67,dataCodewordsPerBlock:16}]}]},{infoBits:167017,versionNumber:40,alignmentPatternCenters:[6,30,58,86,114,142,170],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:118},{numBlocks:6,dataCodewordsPerBlock:119}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:18,dataCodewordsPerBlock:47},{numBlocks:31,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:34,dataCodewordsPerBlock:24},{numBlocks:34,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:20,dataCodewordsPerBlock:15},{numBlocks:61,dataCodewordsPerBlock:16}]}]}]},function(w,x,g){Object.defineProperty(x,"__esModule",{value:!0});var u=g(0);function d(f,a,m,o){var l=f.x-a.x+m.x-o.x,n=f.y-a.y+m.y-o.y;if(l===0&&n===0)return{a11:a.x-f.x,a12:a.y-f.y,a13:0,a21:m.x-a.x,a22:m.y-a.y,a23:0,a31:f.x,a32:f.y,a33:1};var c=a.x-m.x,i=o.x-m.x,v=a.y-m.y,B=o.y-m.y,h=c*B-i*v,k=(l*B-i*n)/h,P=(c*n-l*v)/h;return{a11:a.x-f.x+k*a.x,a12:a.y-f.y+k*a.y,a13:k,a21:o.x-f.x+P*o.x,a22:o.y-f.y+P*o.y,a23:P,a31:f.x,a32:f.y,a33:1}}function r(f,a,m,o){var l=d(f,a,m,o);return{a11:l.a22*l.a33-l.a23*l.a32,a12:l.a13*l.a32-l.a12*l.a33,a13:l.a12*l.a23-l.a13*l.a22,a21:l.a23*l.a31-l.a21*l.a33,a22:l.a11*l.a33-l.a13*l.a31,a23:l.a13*l.a21-l.a11*l.a23,a31:l.a21*l.a32-l.a22*l.a31,a32:l.a12*l.a31-l.a11*l.a32,a33:l.a11*l.a22-l.a12*l.a21}}function s(f,a){return{a11:f.a11*a.a11+f.a21*a.a12+f.a31*a.a13,a12:f.a12*a.a11+f.a22*a.a12+f.a32*a.a13,a13:f.a13*a.a11+f.a23*a.a12+f.a33*a.a13,a21:f.a11*a.a21+f.a21*a.a22+f.a31*a.a23,a22:f.a12*a.a21+f.a22*a.a22+f.a32*a.a23,a23:f.a13*a.a21+f.a23*a.a22+f.a33*a.a23,a31:f.a11*a.a31+f.a21*a.a32+f.a31*a.a33,a32:f.a12*a.a31+f.a22*a.a32+f.a32*a.a33,a33:f.a13*a.a31+f.a23*a.a32+f.a33*a.a33}}function p(f,a){for(var m=r({x:3.5,y:3.5},{x:a.dimension-3.5,y:3.5},{x:a.dimension-6.5,y:a.dimension-6.5},{x:3.5,y:a.dimension-3.5}),o=d(a.topLeft,a.topRight,a.alignmentPattern,a.bottomLeft),l=s(o,m),n=u.BitMatrix.createEmpty(a.dimension,a.dimension),c=function(P,y){var z=l.a13*P+l.a23*y+l.a33;return{x:(l.a11*P+l.a21*y+l.a31)/z,y:(l.a12*P+l.a22*y+l.a32)/z}},i=0;i<a.dimension;i++)for(var v=0;v<a.dimension;v++){var B=v+.5,h=i+.5,k=c(B,h);n.set(v,i,f.get(Math.floor(k.x),Math.floor(k.y)))}return{matrix:n,mappingFunction:c}}x.extract=p},function(w,x,g){Object.defineProperty(x,"__esModule",{value:!0});var u=4,d=.5,r=1.5,s=function(B,h){return Math.sqrt(Math.pow(h.x-B.x,2)+Math.pow(h.y-B.y,2))};function p(B){return B.reduce(function(h,k){return h+k})}function f(B,h,k){var P,y,z,S,N=s(B,h),U=s(h,k),C=s(B,k),I,t,M;return U>=N&&U>=C?(P=[h,B,k],I=P[0],t=P[1],M=P[2]):C>=U&&C>=N?(y=[B,h,k],I=y[0],t=y[1],M=y[2]):(z=[B,k,h],I=z[0],t=z[1],M=z[2]),(M.x-t.x)*(I.y-t.y)-(M.y-t.y)*(I.x-t.x)<0&&(S=[M,I],I=S[0],M=S[1]),{bottomLeft:I,topLeft:t,topRight:M}}function a(B,h,k,P){var y=(p(o(B,k,P,5))/7+p(o(B,h,P,5))/7+p(o(k,B,P,5))/7+p(o(h,B,P,5))/7)/4;if(y<1)throw new Error("Invalid module size");var z=Math.round(s(B,h)/y),S=Math.round(s(B,k)/y),N=Math.floor((z+S)/2)+7;switch(N%4){case 0:N++;break;case 2:N--;break}return{dimension:N,moduleSize:y}}function m(B,h,k,P){var y=[{x:Math.floor(B.x),y:Math.floor(B.y)}],z=Math.abs(h.y-B.y)>Math.abs(h.x-B.x),S,N,U,C;z?(S=Math.floor(B.y),N=Math.floor(B.x),U=Math.floor(h.y),C=Math.floor(h.x)):(S=Math.floor(B.x),N=Math.floor(B.y),U=Math.floor(h.x),C=Math.floor(h.y));for(var I=Math.abs(U-S),t=Math.abs(C-N),M=Math.floor(-I/2),J=S<U?1:-1,R=N<C?1:-1,$=!0,j=S,V=N;j!==U+J;j+=J){var A=z?V:j,O=z?j:V;if(k.get(A,O)!==$&&($=!$,y.push({x:A,y:O}),y.length===P+1))break;if(M+=t,M>0){if(V===C)break;V+=R,M-=I}}for(var Q=[],Z=0;Z<P;Z++)y[Z]&&y[Z+1]?Q.push(s(y[Z],y[Z+1])):Q.push(0);return Q}function o(B,h,k,P){var y,z=h.y-B.y,S=h.x-B.x,N=m(B,h,k,Math.ceil(P/2)),U=m(B,{x:B.x-S,y:B.y-z},k,Math.ceil(P/2)),C=N.shift()+U.shift()-1;return(y=U.concat(C)).concat.apply(y,N)}function l(B,h){var k=p(B)/p(h),P=0;return h.forEach(function(y,z){P+=Math.pow(B[z]-y*k,2)}),{averageSize:k,error:P}}function n(B,h,k){try{var P=o(B,{x:-1,y:B.y},k,h.length),y=o(B,{x:B.x,y:-1},k,h.length),z={x:Math.max(0,B.x-B.y)-1,y:Math.max(0,B.y-B.x)-1},S=o(B,z,k,h.length),N={x:Math.min(k.width,B.x+B.y)+1,y:Math.min(k.height,B.y+B.x)+1},U=o(B,N,k,h.length),C=l(P,h),I=l(y,h),t=l(S,h),M=l(U,h),J=Math.sqrt(C.error*C.error+I.error*I.error+t.error*t.error+M.error*M.error),R=(C.averageSize+I.averageSize+t.averageSize+M.averageSize)/4,$=(Math.pow(C.averageSize-R,2)+Math.pow(I.averageSize-R,2)+Math.pow(t.averageSize-R,2)+Math.pow(M.averageSize-R,2))/R;return J+$}catch{return 1/0}}function c(B,h){for(var k=Math.round(h.x);B.get(k,Math.round(h.y));)k--;for(var P=Math.round(h.x);B.get(P,Math.round(h.y));)P++;for(var y=(k+P)/2,z=Math.round(h.y);B.get(Math.round(y),z);)z--;for(var S=Math.round(h.y);B.get(Math.round(y),S);)S++;var N=(z+S)/2;return{x:y,y:N}}function i(B){for(var h=[],k=[],P=[],y=[],z=function(A){for(var O=0,Q=!1,Z=[0,0,0,0,0],K=function(n3){var r3=B.get(n3,A);if(r3===Q)O++;else{Z=[Z[1],Z[2],Z[3],Z[4],O],O=1,Q=r3;var t3=p(Z)/7,l3=Math.abs(Z[0]-t3)<t3&&Math.abs(Z[1]-t3)<t3&&Math.abs(Z[2]-3*t3)<3*t3&&Math.abs(Z[3]-t3)<t3&&Math.abs(Z[4]-t3)<t3&&!r3,s3=p(Z.slice(-3))/3,u3=Math.abs(Z[2]-s3)<s3&&Math.abs(Z[3]-s3)<s3&&Math.abs(Z[4]-s3)<s3&&r3;if(l3){var d3=n3-Z[3]-Z[4],e=d3-Z[2],F={startX:e,endX:d3,y:A},D=k.filter(function(E){return e>=E.bottom.startX&&e<=E.bottom.endX||d3>=E.bottom.startX&&e<=E.bottom.endX||e<=E.bottom.startX&&d3>=E.bottom.endX&&Z[2]/(E.bottom.endX-E.bottom.startX)<r&&Z[2]/(E.bottom.endX-E.bottom.startX)>d});D.length>0?D[0].bottom=F:k.push({top:F,bottom:F})}if(u3){var b=n3-Z[4],_=b-Z[3],F={startX:_,y:A,endX:b},D=y.filter(function(W){return _>=W.bottom.startX&&_<=W.bottom.endX||b>=W.bottom.startX&&_<=W.bottom.endX||_<=W.bottom.startX&&b>=W.bottom.endX&&Z[2]/(W.bottom.endX-W.bottom.startX)<r&&Z[2]/(W.bottom.endX-W.bottom.startX)>d});D.length>0?D[0].bottom=F:y.push({top:F,bottom:F})}}},o3=-1;o3<=B.width;o3++)K(o3);h.push.apply(h,k.filter(function(n3){return n3.bottom.y!==A&&n3.bottom.y-n3.top.y>=2})),k=k.filter(function(n3){return n3.bottom.y===A}),P.push.apply(P,y.filter(function(n3){return n3.bottom.y!==A})),y=y.filter(function(n3){return n3.bottom.y===A})},S=0;S<=B.height;S++)z(S);h.push.apply(h,k.filter(function(A){return A.bottom.y-A.top.y>=2})),P.push.apply(P,y);var N=h.filter(function(A){return A.bottom.y-A.top.y>=2}).map(function(A){var O=(A.top.startX+A.top.endX+A.bottom.startX+A.bottom.endX)/4,Q=(A.top.y+A.bottom.y+1)/2;if(B.get(Math.round(O),Math.round(Q))){var Z=[A.top.endX-A.top.startX,A.bottom.endX-A.bottom.startX,A.bottom.y-A.top.y+1],K=p(Z)/Z.length,o3=n({x:Math.round(O),y:Math.round(Q)},[1,1,3,1,1],B);return{score:o3,x:O,y:Q,size:K}}}).filter(function(A){return!!A}).sort(function(A,O){return A.score-O.score}).map(function(A,O,Q){if(O>u)return null;var Z=Q.filter(function(o3,n3){return O!==n3}).map(function(o3){return{x:o3.x,y:o3.y,score:o3.score+Math.pow(o3.size-A.size,2)/A.size,size:o3.size}}).sort(function(o3,n3){return o3.score-n3.score});if(Z.length<2)return null;var K=A.score+Z[0].score+Z[1].score;return{points:[A].concat(Z.slice(0,2)),score:K}}).filter(function(A){return!!A}).sort(function(A,O){return A.score-O.score});if(N.length===0)return null;var U=f(N[0].points[0],N[0].points[1],N[0].points[2]),C=U.topRight,I=U.topLeft,t=U.bottomLeft,M=v(B,P,C,I,t),J=[];M&&J.push({alignmentPattern:{x:M.alignmentPattern.x,y:M.alignmentPattern.y},bottomLeft:{x:t.x,y:t.y},dimension:M.dimension,topLeft:{x:I.x,y:I.y},topRight:{x:C.x,y:C.y}});var R=c(B,C),$=c(B,I),j=c(B,t),V=v(B,P,R,$,j);return V&&J.push({alignmentPattern:{x:V.alignmentPattern.x,y:V.alignmentPattern.y},bottomLeft:{x:j.x,y:j.y},topLeft:{x:$.x,y:$.y},topRight:{x:R.x,y:R.y},dimension:V.dimension}),J.length===0?null:J}x.locate=i;function v(B,h,k,P,y){var z,S,N;try{z=a(P,k,y,B),S=z.dimension,N=z.moduleSize}catch{return null}var U={x:k.x-P.x+y.x,y:k.y-P.y+y.y},C=(s(P,y)+s(P,k))/2/N,I=1-3/C,t={x:P.x+I*(U.x-P.x),y:P.y+I*(U.y-P.y)},M=h.map(function(R){var $=(R.top.startX+R.top.endX+R.bottom.startX+R.bottom.endX)/4,j=(R.top.y+R.bottom.y+1)/2;if(B.get(Math.floor($),Math.floor(j))){var V=[R.top.endX-R.top.startX,R.bottom.endX-R.bottom.startX,R.bottom.y-R.top.y+1];p(V)/V.length;var A=n({x:Math.floor($),y:Math.floor(j)},[1,1,1],B),O=A+s({x:$,y:j},t);return{x:$,y:j,score:O}}}).filter(function(R){return!!R}).sort(function(R,$){return R.score-$.score}),J=C>=15&&M.length?M[0]:t;return{alignmentPattern:J,dimension:S}}}]).default})}(T3)),T3.exports}var h2=u2(),f2=m3(h2);const m2=L=>{for(let H=0;H<L.length;H+=16){const w=L[H],x=L[H+1],g=L[H+2];if(!(w===x&&w===g))return!0}return!1},k2=[/^https:\\/\\/[^.]+\\.fanbox\\.cc/,/^https:\\/\\/twitter\\.com/,/^https:\\/\\/x\\.com/,/^https:\\/\\/fantia\\.jp/,/^https:\\/\\/marshmallow-qa\\.com/,/^https:\\/\\/www\\.dlsite\\.com/,/^https:\\/\\/hitomi\\.la/],p2={inversionAttempts:"attemptBoth"},N3=(L,H,w)=>{var x;try{const g=(x=f2(L,H,w,p2))==null?void 0:x.binaryData;return g?new TextDecoder().decode(Uint8Array.from(g)):!1}catch{return}},w2=async L=>{const H=await createImageBitmap(new Blob([L])),w=new OffscreenCanvas(H.width,H.height),x=w.getContext("2d");return x.drawImage(H,0,0),x.getImageData(0,0,w.width,w.height)},B2=(L,H,w,x,g)=>{if(x===L.width&&g===L.height)return N3(L.data,x,g);const u=new Uint8ClampedArray(new ArrayBuffer(x*g*4));for(let d=0,r=w+g;d<r;d++)for(let s=0,p=H+x;s<p;s++){const f=(d*x+s)*4,a=((d+w)*L.width+(s+H))*4;u[f]=L.data[a],u[f+1]=L.data[a+1],u[f+2]=L.data[a+2],u[f+3]=L.data[a+3]}return N3(u,x,g)},v2=(L,H,w)=>Math.round(.299*L+.587*H+.114*w),g2=async L=>{const H=await w2(L);if(!m2(H.data))return!1;for(let x=0;x<H.data.length;x+=4){const g=v2(H.data[x],H.data[x+1],H.data[x+2])<200?0:255;H.data[x]=g,H.data[x+1]=g,H.data[x+2]=g,H.data[x+3]=255}let w=N3(H.data,H.width,H.height);if(!w){const x=Math.floor(H.width/2),g=Math.floor(H.height/2);for(const u of[[x,g],[0,g],[x,0],[0,0]])if(w=B2(H,...u,x,g),w)break}return w?k2.every(x=>!x.test(w)):!1},_2=async(L,H,w=new Set)=>{let x=L.length-1,g=0;for(;x>=L.length-10&&!(x<=2);x--){if(w.has(x))continue;const d=L[x];if(!d)break;if(await H(d))w.add(x);else{if(g>=2)break;g+=1}}let u=0;for(x=Math.min(...w);x<L.length;x++){if(w.has(x)){u+=1;continue}u>=2||w.has(x-1)&&w.has(x+1)?w.add(x):u=0}return w};class C2{constructor(){__publicField(this,"zip",new F3),__publicField(this,"adRemoved",!1)}file({name:H,data:w}){this.zip.file(H,w)}files(H){H.forEach(({name:w,data:x})=>{this.zip.file(w,x)})}async unzipFile({data:H,path:w,type:x}){var g;return(g=(await F3.loadAsync(H)).file(w))==null?void 0:g.async(x)}async generateAsync(H,w){H!=null&&H.removeAdPage&&await this.removeAd();const x=await this.zip.generateAsync({...H,type:"uint8array"},w);return M3(x,[x.buffer])}async generateStream(H,w,x){H!=null&&H.removeAdPage&&await this.removeAd();const g=this.zip.generateInternalStream({...H,type:"uint8array"}),u=new ReadableStream({start:d=>{g.on("error",r=>{d.error(r),x?.()}),g.on("end",()=>{setTimeout(()=>{d.close(),x?.()})}),g.on("data",(r,s)=>{d.enqueue(r),w?.(s)}),g.resume()}});return M3({zipStream:u},[u])}async removeAd(){if(this.adRemoved)return;const H=[];Object.values(this.zip.files).forEach(w=>{const x=parseInt(w.name);Number.isNaN(x)||H.push({i:x,obj:w})}),H.sort((w,x)=>w.i-x.i);try{const w=await _2(H,async({obj:g})=>g2(await g._data));if(!w.size){console.log("[nhentai-helper] no ad pages detected");return}const x=[...w.values()].map(g=>H[g].obj);console.log("[nhentai-helper] ad pages detected:",...x.map(g=>g.name)),x.forEach(g=>{this.zip.remove(g.name)})}catch(w){console.error("[nhentai-helper] remove ad page",w)}}}O3(C2)})();
`, blob$1 = typeof self < "u" && self.Blob && new Blob([jsContent$1], { type: "text/javascript;charset=utf-8" });
      function WorkerWrapper$1(options) {
        let objURL;
        try {
          if (objURL = blob$1 && (self.URL || self.webkitURL).createObjectURL(blob$1), !objURL) throw "";
          const worker = new Worker(objURL, {
            name: options == null ? void 0 : options.name
          });
          return worker.addEventListener("error", () => {
            (self.URL || self.webkitURL).revokeObjectURL(objURL);
          }), worker;
        } catch {
          return new Worker(
            "data:text/javascript;charset=utf-8," + encodeURIComponent(jsContent$1),
            {
              name: options == null ? void 0 : options.name
            }
          );
        } finally {
          objURL && (self.URL || self.webkitURL).revokeObjectURL(objURL);
        }
      }
      const getTransferableData = (files) => files.map(({ data }) => data).filter((data) => typeof data != "string");
      class JSZipWorkerPool {
        constructor() {
          __publicField(this, "pool", []);
          __publicField(this, "waitingQueue", []);
          __publicField(this, "unzipFile", async (params) => {
            const worker = await this.acquireWorker(), zip = await new worker.JSZip(), clean = () => {
              zip[releaseProxy](), this.releaseWorker(worker);
            };
            try {
              return await zip.unzipFile(transfer(params, [params.data]));
            } catch (error) {
              throw clean(), error;
            }
          });
          for (let id = 0; id < WORKER_THREAD_NUM; id++)
            this.pool.push({
              id,
              idle: !0
            });
        }
        async createWorker() {
          return wrap(new WorkerWrapper$1());
        }
        waitIdleWorker() {
          return new Promise((resolve) => {
            this.waitingQueue.push(resolve);
          });
        }
        async acquireWorker() {
          let worker = this.pool.find(({ idle }) => idle);
          return worker || (worker = await this.waitIdleWorker()), worker.JSZip || (worker.JSZip = await this.createWorker()), worker.idle = !1, worker;
        }
        releaseWorker(worker) {
          if (worker.idle = !0, !this.waitingQueue.length) return;
          removeAt(this.waitingQueue, 0)(worker);
        }
        async generateAsync(files, options, onUpdate) {
          const worker = await this.acquireWorker(), zip = await new worker.JSZip();
          try {
            return await zip.files(transfer(files, getTransferableData(files))), await zip.generateAsync(
              options,
              proxy((metaData) => {
                metaData.currentFile && (onUpdate == null || onUpdate({ workerId: worker.id, ...metaData }));
              })
            );
          } finally {
            zip[releaseProxy](), this.releaseWorker(worker);
          }
        }
        async generateStream(files, options, onUpdate) {
          const worker = await this.acquireWorker(), zip = await new worker.JSZip();
          try {
            await zip.files(transfer(files, getTransferableData(files)));
            const { zipStream } = await zip.generateStream(
              options,
              proxy((metaData) => {
                metaData.currentFile && (onUpdate == null || onUpdate({ workerId: worker.id, ...metaData }));
              })
            );
            return zipStream;
          } finally {
            zip[releaseProxy](), this.releaseWorker(worker);
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
          return this.files = [], jszipPool.generateAsync(files, options, onUpdate);
        }
        generateStream(options, onUpdate) {
          const { files } = this;
          return this.files = [], jszipPool.generateStream(files, options, onUpdate);
        }
      }
      __publicField(JSZip, "unzipFile", (params) => jszipPool.unzipFile(params));
      extendPrototype(localforage);
      class DownloadHistory {
        constructor(name) {
          __publicField(this, "store");
          __publicField(this, "ready");
          this.name = name, this.store = localforage.createInstance({
            name: "nhentai_helper",
            storeName: name
          }), this.ready = this.store.ready().then(() => !0).catch((e) => (logger.error(e), !1));
        }
        async add(key) {
          if (await this.ready)
            try {
              await this.store.setItem(key, !0), logger.log(`mark "${key}" as downloaded`);
            } catch (e) {
              logger.error(e);
            }
        }
        async del(key) {
          if (await this.ready)
            try {
              await this.store.removeItem(key), logger.log(`unmark "${key}" as downloaded`);
            } catch (e) {
              logger.error(e);
            }
        }
        async has(key) {
          if (!await this.ready) return !1;
          try {
            return await this.store.getItem(key) === !0;
          } catch (e) {
            logger.error(e);
          }
          return !1;
        }
        async size() {
          return await this.ready ? this.store.length() : NaN;
        }
        async import(keys2) {
          if (!await this.ready) throw new Error(`store ${this.name} cannot ready`);
          try {
            await this.store.setItems(keys2.map((gid2) => ({ key: gid2, value: !0 })));
          } catch (e) {
            logger.error(e);
          }
        }
        async export() {
          if (!await this.ready) throw new Error(`store ${this.name} cannot ready`);
          return this.store.keys();
        }
        async clear() {
          await this.ready && await this.store.clear();
        }
      }
      const gidHistory = new DownloadHistory("dl_history_gid"), enTitleHistory = new DownloadHistory("dl_history_en"), jpTitleHistory = new DownloadHistory("dl_history"), prettyTitleHistory = new DownloadHistory("dl_history_pretty"), normalizeTitle = (title) => title.replace(/\s/g, ""), getTitleMd5 = (title) => md5(normalizeTitle(title)), markAsDownloaded = (gid2, { english: english2, japanese: japanese2, pretty } = {}) => {
        gidHistory.add(String(gid2)), english2 && enTitleHistory.add(getTitleMd5(english2)), japanese2 && jpTitleHistory.add(getTitleMd5(japanese2)), pretty && prettyTitleHistory.add(getTitleMd5(pretty));
      }, unmarkAsDownloaded = (gid2, { english: english2, japanese: japanese2, pretty } = {}) => {
        gidHistory.del(String(gid2)), english2 && enTitleHistory.del(getTitleMd5(english2)), japanese2 && jpTitleHistory.del(getTitleMd5(japanese2)), pretty && prettyTitleHistory.del(getTitleMd5(pretty));
      }, isDownloadedByGid = (gid2) => gidHistory.has(String(gid2)), isDownloadedByTitle = async ({
        english: english2,
        japanese: japanese2,
        pretty
      } = {}) => {
        if (settings.judgeDownloadedByJapanese && japanese2) {
          const md5v2 = getTitleMd5(japanese2);
          if (await jpTitleHistory.has(md5v2)) return !0;
          const md5v1 = md5(japanese2);
          if (await jpTitleHistory.has(md5v1))
            return jpTitleHistory.add(md5v2), jpTitleHistory.del(md5v1), !0;
        }
        return !!(settings.judgeDownloadedByEnglish && english2 && await enTitleHistory.has(getTitleMd5(english2)) || settings.judgeDownloadedByPretty && pretty && await enTitleHistory.has(getTitleMd5(pretty)));
      }, getDownloadNumber = () => gidHistory.size(), EXPORT_HEADER_GID = "gid:", EXPORT_HEADER_TITLE_JP = "title:", EXPORT_HEADER_TITLE_EN = "title_en:", EXPORT_HEADER_TITLE_PRETTY = "title_pretty:", EXPORT_SEPARATOR = ",", EXPORT_TEXT_FILENAME = "history.txt", exportDownloadHistory = async () => {
        try {
          const gids = await gidHistory.export(), jpTitles = await jpTitleHistory.export(), enTitles = await enTitleHistory.export(), prettyTitles = await prettyTitleHistory.export(), text = `${EXPORT_HEADER_GID}${gids.join(EXPORT_SEPARATOR)}
${EXPORT_HEADER_TITLE_JP}${jpTitles.join(EXPORT_SEPARATOR)}
${EXPORT_HEADER_TITLE_EN}${enTitles.join(EXPORT_SEPARATOR)}
${EXPORT_HEADER_TITLE_PRETTY}${prettyTitles.join(EXPORT_SEPARATOR)}`, zip = new JSZip();
          zip.file(EXPORT_TEXT_FILENAME, text);
          const data = await zip.generateAsync({
            compression: "DEFLATE",
            compressionOptions: { level: 9 }
          }), filename = `nhentai-helper-download-history-${dateTimeFormatter.format(Date.now()).replace(/[^\d]/g, "")}.zip`;
          return FileSaver_minExports.saveAs(new File([data], filename, { type: "application/zip" })), logger.log("export download history", filename), !0;
        } catch (error) {
          logger.error(error);
        }
        return !1;
      }, importDownloadHistory = async (data) => {
        try {
          const str = await JSZip.unzipFile({ data, path: EXPORT_TEXT_FILENAME, type: "string" });
          if (!str)
            return logger.error("zip doesn't contain file", EXPORT_TEXT_FILENAME), !1;
          const lines = str.split(`
`);
          for (const line of lines)
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
          return !0;
        } catch (error) {
          logger.error(error);
        }
        return !1;
      }, clearDownloadHistory = async () => {
        try {
          return await gidHistory.clear(), await enTitleHistory.clear(), await jpTitleHistory.clear(), await prettyTitleHistory.clear(), !0;
        } catch (error) {
          logger.error(error);
        }
        return !1;
      }, isSameTitleString = (title1, title2) => !!title1 && !!title2 && normalizeTitle(title1) === normalizeTitle(title2), isSameTitle = (title1, title2) => !!(settings.judgeDownloadedByJapanese && isSameTitleString(title1.japanese, title2.japanese) || settings.judgeDownloadedByEnglish && isSameTitleString(title1.english, title2.english) || settings.judgeDownloadedByPretty && isSameTitleString(title1.pretty, title2.pretty));
      var core = {}, hasRequiredCore;
      function requireCore() {
        return hasRequiredCore || (hasRequiredCore = 1, function(exports2) {
          Object.defineProperty(exports2, "__esModule", { value: !0 }), exports2.h = exports2._render = exports2.hydrate = exports2.render = exports2.appendChildren = exports2.strToHash = exports2.removeAllChildNodes = exports2.tick = exports2.isSSR = void 0;
          const isSSR = () => typeof _nano < "u" && _nano.isSSR === !0;
          exports2.isSSR = isSSR, exports2.tick = Promise.prototype.then.bind(Promise.resolve());
          const removeAllChildNodes = (parent) => {
            for (; parent.firstChild; )
              parent.removeChild(parent.firstChild);
          };
          exports2.removeAllChildNodes = removeAllChildNodes;
          const strToHash = (s) => {
            let hash = 0;
            for (let i = 0; i < s.length; i++) {
              const chr = s.charCodeAt(i);
              hash = (hash << 5) - hash + chr, hash |= 0;
            }
            return Math.abs(hash).toString(32);
          };
          exports2.strToHash = strToHash;
          const appendChildren = (element, children, escape2 = !0) => {
            if (!Array.isArray(children)) {
              (0, exports2.appendChildren)(element, [children], escape2);
              return;
            }
            typeof children == "object" && (children = Array.prototype.slice.call(children)), children.forEach((child) => {
              if (Array.isArray(child))
                (0, exports2.appendChildren)(element, child, escape2);
              else {
                const c = (0, exports2._render)(child);
                typeof c < "u" && (Array.isArray(c) ? (0, exports2.appendChildren)(element, c, escape2) : (0, exports2.isSSR)() && !escape2 ? element.appendChild(c.nodeType == null ? c.toString() : c) : element.appendChild(c.nodeType == null ? document.createTextNode(c.toString()) : c));
              }
            });
          };
          exports2.appendChildren = appendChildren;
          const SVG = (props) => {
            const child = props.children[0], attrs = child.attributes;
            if ((0, exports2.isSSR)())
              return child;
            const svg = hNS("svg");
            for (let i = attrs.length - 1; i >= 0; i--)
              svg.setAttribute(attrs[i].name, attrs[i].value);
            return svg.innerHTML = child.innerHTML, svg;
          }, render2 = (component, parent = null, removeChildNodes = !0) => {
            let el = (0, exports2._render)(component);
            return Array.isArray(el) && (el = el.map((e) => (0, exports2._render)(e)), el.length === 1 && (el = el[0])), parent ? (removeChildNodes && (0, exports2.removeAllChildNodes)(parent), el && parent.id && parent.id === el.id && parent.parentElement ? parent.parentElement.replaceChild(el, parent) : Array.isArray(el) ? el.forEach((e) => {
              (0, exports2.appendChildren)(parent, (0, exports2._render)(e));
            }) : (0, exports2.appendChildren)(parent, (0, exports2._render)(el)), parent) : (0, exports2.isSSR)() && !Array.isArray(el) ? [el] : el;
          };
          exports2.render = render2, exports2.hydrate = exports2.render;
          const _render = (comp) => {
            if (comp === null || comp === !1 || typeof comp > "u")
              return [];
            if (typeof comp == "string" || typeof comp == "number")
              return comp.toString();
            if (comp.tagName && comp.tagName.toLowerCase() === "svg")
              return SVG({ children: [comp] });
            if (comp.tagName || comp && comp.nodeType === 3)
              return comp;
            if (comp && comp.component && comp.component.isClass)
              return renderClassComponent(comp);
            if (comp.isClass)
              return renderClassComponent({ component: comp, props: {} });
            if (comp.component && typeof comp.component == "function")
              return renderFunctionalComponent(comp);
            if (Array.isArray(comp))
              return comp.map((c) => (0, exports2._render)(c)).flat();
            if (typeof comp == "function" && !comp.isClass)
              return (0, exports2._render)(comp());
            if (comp.component && comp.component.tagName && typeof comp.component.tagName == "string" || Array.isArray(comp.component) || comp.component)
              return (0, exports2._render)(comp.component);
            if (typeof comp == "object")
              return [];
            console.warn("Something unexpected happened with:", comp);
          };
          exports2._render = _render;
          const renderFunctionalComponent = (fncComp) => {
            const { component, props } = fncComp;
            return (0, exports2._render)(component(props));
          }, renderClassComponent = (classComp) => {
            const { component, props } = classComp, hash = (0, exports2.strToHash)(component.toString());
            component.prototype._getHash = () => hash;
            const Component = new component(props);
            (0, exports2.isSSR)() || Component.willMount();
            let el = Component.render();
            return el = (0, exports2._render)(el), Component.elements = el, props && props.ref && props.ref(Component), (0, exports2.isSSR)() || (0, exports2.tick)(() => {
              Component._didMount();
            }), el;
          }, hNS = (tag) => document.createElementNS("http://www.w3.org/2000/svg", tag), h2 = (tagNameOrComponent, props = {}, ...children) => {
            if (props && props.children && (Array.isArray(children) ? Array.isArray(props.children) ? children = [...props.children, ...children] : children.push(props.children) : Array.isArray(props.children) ? children = props.children : children = [props.children]), (0, exports2.isSSR)() && _nano.ssrTricks.isWebComponent(tagNameOrComponent)) {
              const element2 = _nano.ssrTricks.renderWebComponent(tagNameOrComponent, props, children, exports2._render);
              return element2 === null ? `ERROR: "<${tagNameOrComponent} />"` : element2;
            }
            if (typeof tagNameOrComponent != "string")
              return { component: tagNameOrComponent, props: Object.assign(Object.assign({}, props), { children }) };
            try {
              if ((0, exports2.isSSR)() && typeof tagNameOrComponent == "string" && !document)
                throw new Error("document is not defined");
            } catch (err) {
              console.log("ERROR:", err.message, `
 > Please read: https://github.com/nanojsx/nano/issues/106`);
            }
            let ref2;
            const element = tagNameOrComponent === "svg" ? hNS("svg") : document.createElement(tagNameOrComponent), isEvent = (el, p) => p.indexOf("on") !== 0 ? !1 : el._ssr ? !0 : typeof el[p] == "object" || typeof el[p] == "function";
            for (const p in props) {
              if (p === "style" && typeof props[p] == "object") {
                const styles = Object.keys(props[p]).map((k) => `${k}:${props[p][k]}`).join(";").replace(/[A-Z]/g, (match2) => `-${match2.toLowerCase()}`);
                props[p] = `${styles};`;
              }
              if (p === "ref")
                ref2 = props[p];
              else if (isEvent(element, p.toLowerCase()))
                element.addEventListener(p.toLowerCase().substring(2), (e) => props[p](e));
              else if (p === "dangerouslySetInnerHTML" && props[p].__html)
                if ((0, exports2.isSSR)())
                  element.innerHTML = props[p].__html;
                else {
                  const fragment = document.createElement("fragment");
                  fragment.innerHTML = props[p].__html, element.appendChild(fragment);
                }
              else if (p === "innerHTML" && props[p].__dangerousHtml)
                if ((0, exports2.isSSR)())
                  element.innerHTML = props[p].__dangerousHtml;
                else {
                  const fragment = document.createElement("fragment");
                  fragment.innerHTML = props[p].__dangerousHtml, element.appendChild(fragment);
                }
              else /^className$/i.test(p) ? element.setAttribute("class", props[p]) : typeof props[p] < "u" && element.setAttribute(p, props[p]);
            }
            const escape2 = !["noscript", "script", "style"].includes(tagNameOrComponent);
            return (0, exports2.appendChildren)(element, children, escape2), ref2 && ref2(element), element;
          };
          exports2.h = h2;
        }(core)), core;
      }
      var coreExports = requireCore();
      const readFile = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        }, reader.onabort = reject, reader.onerror = reject, reader.readAsArrayBuffer(file);
      }), pickFile = (accept) => new Promise((resolve) => {
        const input = /* @__PURE__ */ coreExports.h(
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
      }), pickAndReadFile = async (accept) => {
        const file = await pickFile(accept);
        if (file) return readFile(file);
      }, showMessage = (params) => elementPlus.ElMessage({ ...params, appendTo: _monkeyWindow.document.body }), _hoisted_1$2 = { class: "nhentai-helper-setting-help-buttons no-sl" }, _hoisted_2$1 = ["id"], _hoisted_3$1 = { id: "nhentai-helper-setting-dialog" }, _hoisted_4$1 = {
        class: "asterisk-example no-sl",
        style: { "margin-bottom": "18px" }
      }, _hoisted_5$1 = { class: "inline-item" }, _hoisted_6$1 = { class: "inline-item__name" }, _hoisted_7$1 = { class: "inline-item" }, _hoisted_8 = { class: "inline-item__name" }, _hoisted_9 = { style: { color: "var(--el-text-color-regular)", "font-size": "var(--el-form-label-font-size)" } }, _hoisted_10 = {
        key: 0,
        class: "no-sl"
      }, _hoisted_11 = {
        key: 0,
        class: "no-sl"
      }, _hoisted_12 = { class: "monospace" }, _hoisted_13 = { class: "no-sl" }, _hoisted_14 = { class: "no-sl" }, _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
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
          }, compressionLevelMarks = {
            0: "0",
            1: "1",
            9: "9"
          }, { t: t2, locale } = useI18n(), show = vue.ref(!1), downloadedNum = vue.ref(NaN), filenameLengthNumber = vue.computed({
            get: () => typeof writeableSettings.filenameLength == "number" ? writeableSettings.filenameLength : 0,
            set: (val) => {
              writeableSettings.filenameLength = val;
            }
          }), filenameLengthAuto = vue.computed({
            get: () => writeableSettings.filenameLength === "auto",
            set: (val) => {
              writeableSettings.filenameLength = val ? "auto" : 0;
            }
          }), refreshDownloadNum = async () => {
            downloadedNum.value = await getDownloadNumber();
          }, open2 = () => {
            show.value = !0, refreshDownloadNum();
          }, openHelp = () => {
            _GM_openInTab(
              locale.value === "zh" ? "https://github.com/Tsuk1ko/nhentai-helper/blob/master/README-ZH.md#%E8%AE%BE%E7%BD%AE" : "https://github.com/Tsuk1ko/nhentai-helper/blob/master/README.md#settings",
              { active: !0, setParent: !0 }
            );
          }, exporting = vue.ref(!1), importing = vue.ref(!1), clearing = vue.ref(!1), showMessageBySucceed = (succeed) => {
            showMessage({
              type: succeed ? "success" : "error",
              message: succeed ? "Succeed" : "Failed, please check console for error message"
            });
          }, exportHistory = async () => {
            exporting.value = !0;
            const succeed = await exportDownloadHistory();
            exporting.value = !1, showMessageBySucceed(succeed);
          }, importHistory = async () => {
            const data = await pickAndReadFile("application/zip");
            if (!data) return;
            importing.value = !0;
            const succeed = await importDownloadHistory(data);
            importing.value = !1, refreshDownloadNum(), showMessageBySucceed(succeed);
          }, clearHistory = async () => {
            clearing.value = !0;
            const succeed = await clearDownloadHistory();
            clearing.value = !1, refreshDownloadNum(), showMessageBySucceed(succeed);
          }, addTitleReplacement = () => {
            writeableSettings.titleReplacement.push({ from: "", to: "", regexp: !1 });
          }, delTitleReplacement = (index) => {
            writeableSettings.titleReplacement.splice(index, 1);
          };
          return vue.watch(
            () => writeableSettings.language,
            (val) => {
              locale.value = val;
            }
          ), __expose({ open: open2 }), (_ctx, _cache) => (vue.openBlock(), vue.createBlock(vue.unref(elementPlus.ElDialog), {
            id: "nhentai-helper-setting-dialog-outside",
            modelValue: show.value,
            "onUpdate:modelValue": _cache[30] || (_cache[30] = ($event) => show.value = $event),
            center: !0,
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
                            vue.unref(writeableSettings).compressionFilename || (vue.unref(writeableSettings).compressionFilename = vue.unref(settingDefinitions).compressionFilename.default);
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
                            "step-strictly": !0,
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
                          "step-strictly": !0,
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
                              default: vue.withCtx(() => _cache[31] || (_cache[31] = [
                                vue.createTextVNode("jpg")
                              ])),
                              _: 1
                            }, 8, ["value"]),
                            vue.createVNode(vue.unref(elementPlus.ElRadio), {
                              value: vue.unref(MIME).PNG
                            }, {
                              default: vue.withCtx(() => _cache[32] || (_cache[32] = [
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
                          "step-strictly": !0
                        }, null, 8, ["modelValue", "value-on-clear"])
                      ]),
                      _: 1
                    }, 8, ["label"])) : vue.createCommentVNode("", !0),
                    vue.createVNode(vue.unref(elementPlus.ElFormItem), {
                      label: vue.unref(t2)("setting.removeAdPage")
                    }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(vue.unref(elementPlus.ElSwitch), {
                          modelValue: vue.unref(writeableSettings).removeAdPage,
                          "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => vue.unref(writeableSettings).removeAdPage = $event)
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    vue.createVNode(vue.unref(elementPlus.ElFormItem), {
                      label: vue.unref(t2)("setting.autoCancelDownloadedManga")
                    }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(vue.unref(elementPlus.ElSwitch), {
                          modelValue: vue.unref(writeableSettings).autoCancelDownloadedManga,
                          "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => vue.unref(writeableSettings).autoCancelDownloadedManga = $event)
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
                          "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => vue.unref(writeableSettings).autoRetryWhenErrorOccurs = $event)
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
                          "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => vue.unref(writeableSettings).autoShowAll = $event)
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
                          "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => vue.unref(writeableSettings).showIgnoreButton = $event)
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
                          "onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => vue.unref(writeableSettings).galleryContextmenuPreview = $event)
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
                          "onUpdate:modelValue": _cache[18] || (_cache[18] = ($event) => vue.unref(writeableSettings).judgeDownloadedByEnglish = $event),
                          label: vue.unref(t2)("common.english")
                        }, null, 8, ["modelValue", "label"]),
                        vue.createVNode(vue.unref(elementPlus.ElCheckbox), {
                          modelValue: vue.unref(writeableSettings).judgeDownloadedByJapanese,
                          "onUpdate:modelValue": _cache[19] || (_cache[19] = ($event) => vue.unref(writeableSettings).judgeDownloadedByJapanese = $event),
                          label: vue.unref(t2)("common.japanese")
                        }, null, 8, ["modelValue", "label"]),
                        vue.createVNode(vue.unref(elementPlus.ElCheckbox), {
                          modelValue: vue.unref(writeableSettings).judgeDownloadedByPretty,
                          "onUpdate:modelValue": _cache[20] || (_cache[20] = ($event) => vue.unref(writeableSettings).judgeDownloadedByPretty = $event),
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
                          "onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => vue.unref(writeableSettings).addMetaFile = $event)
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
                          "onUpdate:modelValue": _cache[22] || (_cache[22] = ($event) => vue.unref(writeableSettings).metaFileTitleLanguage = $event)
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
                    }, 8, ["label"])) : vue.createCommentVNode("", !0),
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
                          "onUpdate:modelValue": _cache[23] || (_cache[23] = ($event) => vue.unref(writeableSettings).nHentaiDownloadHost = $event),
                          disabled: !!vue.unref(writeableSettings).customDownloadUrl
                        }, {
                          default: vue.withCtx(() => [
                            (vue.openBlock(!0), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(nHentaiDownloadHostSpecials), (value) => (vue.openBlock(), vue.createBlock(vue.unref(elementPlus.ElOption), {
                              key: value,
                              label: vue.unref(t2)(`setting.nHentaiDownloadHostOption.${value}`),
                              value
                            }, null, 8, ["label", "value"]))), 128)),
                            (vue.openBlock(!0), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(nHentaiDownloadHosts), (host) => (vue.openBlock(), vue.createBlock(vue.unref(elementPlus.ElOption), {
                              key: host,
                              label: host,
                              value: host
                            }, null, 8, ["label", "value"]))), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "disabled"])
                      ]),
                      _: 1
                    }, 8, ["label"])) : vue.createCommentVNode("", !0),
                    vue.createVNode(vue.unref(elementPlus.ElFormItem), {
                      label: vue.unref(t2)("setting.customDownloadUrl")
                    }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(vue.unref(elementPlus.ElInput), {
                          modelValue: vue.unref(writeableSettings).customDownloadUrl,
                          "onUpdate:modelValue": _cache[24] || (_cache[24] = ($event) => vue.unref(writeableSettings).customDownloadUrl = $event)
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
                          "onUpdate:modelValue": _cache[25] || (_cache[25] = ($event) => vue.unref(writeableSettings).compressionStreamFiles = $event)
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
                          "onUpdate:modelValue": _cache[26] || (_cache[26] = ($event) => vue.unref(writeableSettings).seriesMode = $event)
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
                          "onUpdate:modelValue": _cache[27] || (_cache[27] = ($event) => vue.unref(writeableSettings).streamDownload = $event),
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
                          "onUpdate:modelValue": _cache[28] || (_cache[28] = ($event) => vue.unref(writeableSettings).preventConsoleClearing = $event)
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }, 8, ["label"])) : vue.createCommentVNode("", !0),
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
                                  style: { width: "100%" },
                                  onClick: addTitleReplacement
                                }, {
                                  default: vue.withCtx(() => _cache[33] || (_cache[33] = [
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
                                        scope.row.regexp ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_10, "/")) : vue.createCommentVNode("", !0)
                                      ]),
                                      suffix: vue.withCtx(() => [
                                        scope.row.regexp ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_11, "/")) : vue.createCommentVNode("", !0)
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
                          _cache[37] || (_cache[37] = vue.createTextVNode("function (filename")),
                          vue.createVNode(vue.unref(elementPlus.ElText), { type: "info" }, {
                            default: vue.withCtx(() => _cache[34] || (_cache[34] = [
                              vue.createTextVNode(": string")
                            ])),
                            _: 1
                          }),
                          _cache[38] || (_cache[38] = vue.createTextVNode(", gallery")),
                          vue.createVNode(vue.unref(elementPlus.ElText), { type: "info" }, {
                            default: vue.withCtx(() => [
                              _cache[36] || (_cache[36] = vue.createTextVNode(": ")),
                              vue.createVNode(vue.unref(elementPlus.ElLink), {
                                type: "primary",
                                href: "https://github.com/Tsuk1ko/nhentai-helper/blob/df00acb0d5ad8244d408561410b3c647d5af7ed4/src/utils/nhentai.ts#L57-L75",
                                target: "_blank"
                              }, {
                                default: vue.withCtx(() => _cache[35] || (_cache[35] = [
                                  vue.createTextVNode("NHentaiGallery")
                                ])),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          _cache[39] || (_cache[39] = vue.createTextVNode(") {"))
                        ]),
                        vue.createVNode(vue.unref(elementPlus.ElInput), {
                          modelValue: vue.unref(writeableSettings).customFilenameFunction,
                          "onUpdate:modelValue": _cache[29] || (_cache[29] = ($event) => vue.unref(writeableSettings).customFilenameFunction = $event),
                          class: "monospace",
                          type: "textarea",
                          placeholder: "return filename;",
                          autosize: { minRows: 1 }
                        }, null, 8, ["modelValue"]),
                        _cache[40] || (_cache[40] = vue.createElementVNode("span", { class: "monospace" }, "}", -1))
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
                  num: Number.isNaN(downloadedNum.value) ? downloadedNum.value : vue.unref(numberFormatter).format(downloadedNum.value)
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
          }, 8, ["modelValue"]));
        }
      }), SettingsDialog = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-b1ccce6d"]]), compileTemplate = (tpl) => template(tpl, { interpolate: /{{([\s\S]+?)}}/g }), getDownloadExt = () => {
        const ext = last(settings.compressionFilename.split("."));
        return ext ? ext.toLowerCase() : "zip";
      }, getCompressionOptions = () => ({
        removeAdPage: settings.removeAdPage,
        streamFiles: settings.compressionStreamFiles,
        compression: settings.compressionLevel > 0 ? "DEFLATE" : "STORE",
        compressionOptions: { level: settings.compressionLevel }
      }), getShowAllBtn = () => new Promise((resolve, reject) => {
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
            (btnContainer == null ? void 0 : btnContainer.id) === "show-all-images-container" && (self2.disconnect(), resolve($(selector.showAllImagesButton)));
          });
        }).observe(container, { childList: !0 });
      }), createMangaDownloadInfo = (gallery2, needReactive = !1) => {
        const info = {
          gallery: gallery2,
          done: 0,
          compressing: !1,
          compressingPercent: "0",
          error: !1
        };
        return needReactive ? (vue.markRaw(info.gallery), vue.reactive(info)) : info;
      };
      var noty$1 = { exports: {} };
      var noty = noty$1.exports, hasRequiredNoty;
      function requireNoty() {
        return hasRequiredNoty || (hasRequiredNoty = 1, function(module2, exports2) {
          (function(root2, factory) {
            module2.exports = factory();
          })(noty, function() {
            return (
              /******/
              function(modules) {
                var installedModules = {};
                function __webpack_require__(moduleId) {
                  if (installedModules[moduleId])
                    return installedModules[moduleId].exports;
                  var module22 = installedModules[moduleId] = {
                    /******/
                    i: moduleId,
                    /******/
                    l: !1,
                    /******/
                    exports: {}
                    /******/
                  };
                  return modules[moduleId].call(module22.exports, module22, module22.exports, __webpack_require__), module22.l = !0, module22.exports;
                }
                return __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.i = function(value) {
                  return value;
                }, __webpack_require__.d = function(exports22, name, getter) {
                  __webpack_require__.o(exports22, name) || Object.defineProperty(exports22, name, {
                    /******/
                    configurable: !1,
                    /******/
                    enumerable: !0,
                    /******/
                    get: getter
                    /******/
                  });
                }, __webpack_require__.n = function(module22) {
                  var getter = module22 && module22.__esModule ? (
                    /******/
                    function() {
                      return module22.default;
                    }
                  ) : (
                    /******/
                    function() {
                      return module22;
                    }
                  );
                  return __webpack_require__.d(getter, "a", getter), getter;
                }, __webpack_require__.o = function(object, property2) {
                  return Object.prototype.hasOwnProperty.call(object, property2);
                }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 6);
              }([
                /* 0 */
                /***/
                function(module22, exports22, __webpack_require__) {
                  Object.defineProperty(exports22, "__esModule", {
                    value: !0
                  }), exports22.css = exports22.deepExtend = exports22.animationEndEvents = void 0;
                  var _typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(obj) {
                    return typeof obj;
                  } : function(obj) {
                    return obj && typeof Symbol == "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                  };
                  exports22.inArray = inArray, exports22.stopPropagation = stopPropagation, exports22.generateID = generateID, exports22.outerHeight = outerHeight, exports22.addListener = addListener, exports22.hasClass = hasClass, exports22.addClass = addClass, exports22.removeClass = removeClass, exports22.remove = remove, exports22.classList = classList, exports22.visibilityChangeFlow = visibilityChangeFlow, exports22.createAudioElements = createAudioElements;
                  var _api = __webpack_require__(1), API = _interopRequireWildcard(_api);
                  function _interopRequireWildcard(obj) {
                    if (obj && obj.__esModule)
                      return obj;
                    var newObj = {};
                    if (obj != null)
                      for (var key in obj)
                        Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                    return newObj.default = obj, newObj;
                  }
                  exports22.animationEndEvents = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
                  function inArray(needle, haystack, argStrict) {
                    var key = void 0, strict = !!argStrict;
                    if (strict) {
                      for (key in haystack)
                        if (haystack.hasOwnProperty(key) && haystack[key] === needle)
                          return !0;
                    } else
                      for (key in haystack)
                        if (haystack.hasOwnProperty(key) && haystack[key] === needle)
                          return !0;
                    return !1;
                  }
                  function stopPropagation(evt) {
                    evt = evt || window.event, typeof evt.stopPropagation < "u" ? evt.stopPropagation() : evt.cancelBubble = !0;
                  }
                  exports22.deepExtend = function deepExtend2(out) {
                    out = out || {};
                    for (var i = 1; i < arguments.length; i++) {
                      var obj = arguments[i];
                      if (obj)
                        for (var key in obj)
                          obj.hasOwnProperty(key) && (Array.isArray(obj[key]) ? out[key] = obj[key] : _typeof(obj[key]) === "object" && obj[key] !== null ? out[key] = deepExtend2(out[key], obj[key]) : out[key] = obj[key]);
                    }
                    return out;
                  };
                  function generateID() {
                    var prefix = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", id = "noty_" + prefix + "_";
                    return id += "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
                      var r = Math.random() * 16 | 0, v = c === "x" ? r : r & 3 | 8;
                      return v.toString(16);
                    }), id;
                  }
                  function outerHeight(el) {
                    var height = el.offsetHeight, style = window.getComputedStyle(el);
                    return height += parseInt(style.marginTop) + parseInt(style.marginBottom), height;
                  }
                  exports22.css = /* @__PURE__ */ function() {
                    var cssPrefixes = ["Webkit", "O", "Moz", "ms"], cssProps = {};
                    function camelCase(string) {
                      return string.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(match2, letter) {
                        return letter.toUpperCase();
                      });
                    }
                    function getVendorProp(name) {
                      var style = document.body.style;
                      if (name in style) return name;
                      for (var i = cssPrefixes.length, capName = name.charAt(0).toUpperCase() + name.slice(1), vendorName = void 0; i--; )
                        if (vendorName = cssPrefixes[i] + capName, vendorName in style) return vendorName;
                      return name;
                    }
                    function getStyleProp(name) {
                      return name = camelCase(name), cssProps[name] || (cssProps[name] = getVendorProp(name));
                    }
                    function applyCss(element, prop, value) {
                      prop = getStyleProp(prop), element.style[prop] = value;
                    }
                    return function(element, properties) {
                      var args = arguments, prop = void 0, value = void 0;
                      if (args.length === 2)
                        for (prop in properties)
                          properties.hasOwnProperty(prop) && (value = properties[prop], value !== void 0 && properties.hasOwnProperty(prop) && applyCss(element, prop, value));
                      else
                        applyCss(element, args[1], args[2]);
                    };
                  }();
                  function addListener(el, events, cb) {
                    var useCapture = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
                    events = events.split(" ");
                    for (var i = 0; i < events.length; i++)
                      document.addEventListener ? el.addEventListener(events[i], cb, useCapture) : document.attachEvent && el.attachEvent("on" + events[i], cb);
                  }
                  function hasClass(element, name) {
                    var list = typeof element == "string" ? element : classList(element);
                    return list.indexOf(" " + name + " ") >= 0;
                  }
                  function addClass(element, name) {
                    var oldList = classList(element), newList = oldList + name;
                    hasClass(oldList, name) || (element.className = newList.substring(1));
                  }
                  function removeClass(element, name) {
                    var oldList = classList(element), newList = void 0;
                    hasClass(element, name) && (newList = oldList.replace(" " + name + " ", " "), element.className = newList.substring(1, newList.length - 1));
                  }
                  function remove(element) {
                    element.parentNode && element.parentNode.removeChild(element);
                  }
                  function classList(element) {
                    return (" " + (element && element.className || "") + " ").replace(/\s+/gi, " ");
                  }
                  function visibilityChangeFlow() {
                    var hidden = void 0, visibilityChange = void 0;
                    typeof document.hidden < "u" ? (hidden = "hidden", visibilityChange = "visibilitychange") : typeof document.msHidden < "u" ? (hidden = "msHidden", visibilityChange = "msvisibilitychange") : typeof document.webkitHidden < "u" && (hidden = "webkitHidden", visibilityChange = "webkitvisibilitychange");
                    function onVisibilityChange() {
                      API.PageHidden = document[hidden], handleVisibilityChange();
                    }
                    function onBlur() {
                      API.PageHidden = !0, handleVisibilityChange();
                    }
                    function onFocus() {
                      API.PageHidden = !1, handleVisibilityChange();
                    }
                    function handleVisibilityChange() {
                      API.PageHidden ? stopAll() : resumeAll();
                    }
                    function stopAll() {
                      setTimeout(function() {
                        Object.keys(API.Store).forEach(function(id) {
                          API.Store.hasOwnProperty(id) && API.Store[id].options.visibilityControl && API.Store[id].stop();
                        });
                      }, 100);
                    }
                    function resumeAll() {
                      setTimeout(function() {
                        Object.keys(API.Store).forEach(function(id) {
                          API.Store.hasOwnProperty(id) && API.Store[id].options.visibilityControl && API.Store[id].resume();
                        }), API.queueRenderAll();
                      }, 100);
                    }
                    visibilityChange && addListener(document, visibilityChange, onVisibilityChange), addListener(window, "blur", onBlur), addListener(window, "focus", onFocus);
                  }
                  function createAudioElements(ref2) {
                    if (ref2.hasSound) {
                      var audioElement = document.createElement("audio");
                      ref2.options.sounds.sources.forEach(function(s) {
                        var source = document.createElement("source");
                        source.src = s, source.type = "audio/" + getExtension(s), audioElement.appendChild(source);
                      }), ref2.barDom ? ref2.barDom.appendChild(audioElement) : document.querySelector("body").appendChild(audioElement), audioElement.volume = ref2.options.sounds.volume, ref2.soundPlayed || (audioElement.play(), ref2.soundPlayed = !0), audioElement.onended = function() {
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
                    value: !0
                  }), exports22.Defaults = exports22.Store = exports22.Queues = exports22.DefaultMaxVisible = exports22.docTitle = exports22.DocModalCount = exports22.PageHidden = void 0, exports22.getQueueCounts = getQueueCounts, exports22.addToQueue = addToQueue, exports22.removeFromQueue = removeFromQueue, exports22.queueRender = queueRender, exports22.queueRenderAll = queueRenderAll, exports22.ghostFix = ghostFix, exports22.build = build, exports22.hasButtons = hasButtons, exports22.handleModal = handleModal, exports22.handleModalClose = handleModalClose, exports22.queueClose = queueClose, exports22.dequeueClose = dequeueClose, exports22.fire = fire, exports22.openFlow = openFlow, exports22.closeFlow = closeFlow;
                  var _utils = __webpack_require__(0), Utils = _interopRequireWildcard(_utils);
                  function _interopRequireWildcard(obj) {
                    if (obj && obj.__esModule)
                      return obj;
                    var newObj = {};
                    if (obj != null)
                      for (var key in obj)
                        Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                    return newObj.default = obj, newObj;
                  }
                  exports22.PageHidden = !1;
                  var DocModalCount = exports22.DocModalCount = 0, DocTitleProps = {
                    originalTitle: null,
                    count: 0,
                    changed: !1,
                    timer: -1
                  }, docTitle = exports22.docTitle = {
                    increment: function() {
                      DocTitleProps.count++, docTitle._update();
                    },
                    decrement: function() {
                      if (DocTitleProps.count--, DocTitleProps.count <= 0) {
                        docTitle._clear();
                        return;
                      }
                      docTitle._update();
                    },
                    _update: function() {
                      var title = document.title;
                      DocTitleProps.changed ? document.title = "(" + DocTitleProps.count + ") " + DocTitleProps.originalTitle : (DocTitleProps.originalTitle = title, document.title = "(" + DocTitleProps.count + ") " + title, DocTitleProps.changed = !0);
                    },
                    _clear: function() {
                      DocTitleProps.changed && (DocTitleProps.count = 0, document.title = DocTitleProps.originalTitle, DocTitleProps.changed = !1);
                    }
                  }, DefaultMaxVisible = exports22.DefaultMaxVisible = 5, Queues = exports22.Queues = {
                    global: {
                      maxVisible: DefaultMaxVisible,
                      queue: []
                    }
                  }, Store = exports22.Store = {};
                  exports22.Defaults = {
                    type: "alert",
                    layout: "topRight",
                    theme: "mint",
                    text: "",
                    timeout: !1,
                    progressBar: !0,
                    closeWith: ["click"],
                    animation: {
                      open: "noty_effects_open",
                      close: "noty_effects_close"
                    },
                    id: !1,
                    force: !1,
                    killer: !1,
                    queue: "global",
                    container: !1,
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
                    modal: !1,
                    visibilityControl: !1
                    /**
                     * @param {string} queueName
                     * @return {object}
                     */
                  };
                  function getQueueCounts() {
                    var queueName = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "global", count = 0, max = DefaultMaxVisible;
                    return Queues.hasOwnProperty(queueName) && (max = Queues[queueName].maxVisible, Object.keys(Store).forEach(function(i) {
                      Store[i].options.queue === queueName && !Store[i].closed && count++;
                    })), {
                      current: count,
                      maxVisible: max
                    };
                  }
                  function addToQueue(ref2) {
                    Queues.hasOwnProperty(ref2.options.queue) || (Queues[ref2.options.queue] = { maxVisible: DefaultMaxVisible, queue: [] }), Queues[ref2.options.queue].queue.push(ref2);
                  }
                  function removeFromQueue(ref2) {
                    if (Queues.hasOwnProperty(ref2.options.queue)) {
                      var queue = [];
                      Object.keys(Queues[ref2.options.queue].queue).forEach(function(i) {
                        Queues[ref2.options.queue].queue[i].id !== ref2.id && queue.push(Queues[ref2.options.queue].queue[i]);
                      }), Queues[ref2.options.queue].queue = queue;
                    }
                  }
                  function queueRender() {
                    var queueName = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "global";
                    if (Queues.hasOwnProperty(queueName)) {
                      var noty2 = Queues[queueName].queue.shift();
                      noty2 && noty2.show();
                    }
                  }
                  function queueRenderAll() {
                    Object.keys(Queues).forEach(function(queueName) {
                      queueRender(queueName);
                    });
                  }
                  function ghostFix(ref2) {
                    var ghostID = Utils.generateID("ghost"), ghost = document.createElement("div");
                    ghost.setAttribute("id", ghostID), Utils.css(ghost, {
                      height: Utils.outerHeight(ref2.barDom) + "px"
                    }), ref2.barDom.insertAdjacentHTML("afterend", ghost.outerHTML), Utils.remove(ref2.barDom), ghost = document.getElementById(ghostID), Utils.addClass(ghost, "noty_fix_effects_height"), Utils.addListener(ghost, Utils.animationEndEvents, function() {
                      Utils.remove(ghost);
                    });
                  }
                  function build(ref2) {
                    findOrCreateContainer(ref2);
                    var markup = '<div class="noty_body">' + ref2.options.text + "</div>" + buildButtons(ref2) + '<div class="noty_progressbar"></div>';
                    ref2.barDom = document.createElement("div"), ref2.barDom.setAttribute("id", ref2.id), Utils.addClass(ref2.barDom, "noty_bar noty_type__" + ref2.options.type + " noty_theme__" + ref2.options.theme), ref2.barDom.innerHTML = markup, fire(ref2, "onTemplate");
                  }
                  function hasButtons(ref2) {
                    return !!(ref2.options.buttons && Object.keys(ref2.options.buttons).length);
                  }
                  function buildButtons(ref2) {
                    if (hasButtons(ref2)) {
                      var buttons = document.createElement("div");
                      return Utils.addClass(buttons, "noty_buttons"), Object.keys(ref2.options.buttons).forEach(function(key) {
                        buttons.appendChild(ref2.options.buttons[key].dom);
                      }), ref2.options.buttons.forEach(function(btn) {
                        buttons.appendChild(btn.dom);
                      }), buttons.outerHTML;
                    }
                    return "";
                  }
                  function handleModal(ref2) {
                    ref2.options.modal && (DocModalCount === 0 && createModal(), exports22.DocModalCount = DocModalCount += 1);
                  }
                  function handleModalClose(ref2) {
                    if (ref2.options.modal && DocModalCount > 0 && (exports22.DocModalCount = DocModalCount -= 1, DocModalCount <= 0)) {
                      var modal = document.querySelector(".noty_modal");
                      modal && (Utils.removeClass(modal, "noty_modal_open"), Utils.addClass(modal, "noty_modal_close"), Utils.addListener(modal, Utils.animationEndEvents, function() {
                        Utils.remove(modal);
                      }));
                    }
                  }
                  function createModal() {
                    var body = document.querySelector("body"), modal = document.createElement("div");
                    Utils.addClass(modal, "noty_modal"), body.insertBefore(modal, body.firstChild), Utils.addClass(modal, "noty_modal_open"), Utils.addListener(modal, Utils.animationEndEvents, function() {
                      Utils.removeClass(modal, "noty_modal_open");
                    });
                  }
                  function findOrCreateContainer(ref2) {
                    if (ref2.options.container) {
                      ref2.layoutDom = document.querySelector(ref2.options.container);
                      return;
                    }
                    var layoutID = "noty_layout__" + ref2.options.layout;
                    ref2.layoutDom = document.querySelector("div#" + layoutID), ref2.layoutDom || (ref2.layoutDom = document.createElement("div"), ref2.layoutDom.setAttribute("id", layoutID), ref2.layoutDom.setAttribute("role", "alert"), ref2.layoutDom.setAttribute("aria-live", "polite"), Utils.addClass(ref2.layoutDom, "noty_layout"), document.querySelector("body").appendChild(ref2.layoutDom));
                  }
                  function queueClose(ref2) {
                    ref2.options.timeout && (ref2.options.progressBar && ref2.progressDom && Utils.css(ref2.progressDom, {
                      transition: "width " + ref2.options.timeout + "ms linear",
                      width: "0%"
                    }), clearTimeout(ref2.closeTimer), ref2.closeTimer = setTimeout(function() {
                      ref2.close();
                    }, ref2.options.timeout));
                  }
                  function dequeueClose(ref2) {
                    ref2.options.timeout && ref2.closeTimer && (clearTimeout(ref2.closeTimer), ref2.closeTimer = -1, ref2.options.progressBar && ref2.progressDom && Utils.css(ref2.progressDom, {
                      transition: "width 0ms linear",
                      width: "100%"
                    }));
                  }
                  function fire(ref2, eventName) {
                    ref2.listeners.hasOwnProperty(eventName) && ref2.listeners[eventName].forEach(function(cb) {
                      typeof cb == "function" && cb.apply(ref2);
                    });
                  }
                  function openFlow(ref2) {
                    fire(ref2, "afterShow"), queueClose(ref2), Utils.addListener(ref2.barDom, "mouseenter", function() {
                      dequeueClose(ref2);
                    }), Utils.addListener(ref2.barDom, "mouseleave", function() {
                      queueClose(ref2);
                    });
                  }
                  function closeFlow(ref2) {
                    delete Store[ref2.id], ref2.closing = !1, fire(ref2, "afterClose"), Utils.remove(ref2.barDom), ref2.layoutDom.querySelectorAll(".noty_bar").length === 0 && !ref2.options.container && Utils.remove(ref2.layoutDom), (Utils.inArray("docVisible", ref2.options.titleCount.conditions) || Utils.inArray("docHidden", ref2.options.titleCount.conditions)) && docTitle.decrement(), queueRender(ref2.options.queue);
                  }
                },
                /* 2 */
                /***/
                function(module22, exports22, __webpack_require__) {
                  Object.defineProperty(exports22, "__esModule", {
                    value: !0
                  }), exports22.NotyButton = void 0;
                  var _utils = __webpack_require__(0), Utils = _interopRequireWildcard(_utils);
                  function _interopRequireWildcard(obj) {
                    if (obj && obj.__esModule)
                      return obj;
                    var newObj = {};
                    if (obj != null)
                      for (var key in obj)
                        Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                    return newObj.default = obj, newObj;
                  }
                  function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor))
                      throw new TypeError("Cannot call a class as a function");
                  }
                  exports22.NotyButton = function NotyButton2(html, classes, cb) {
                    var _this = this, attributes = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
                    return _classCallCheck(this, NotyButton2), this.dom = document.createElement("button"), this.dom.innerHTML = html, this.id = attributes.id = attributes.id || Utils.generateID("button"), this.cb = cb, Object.keys(attributes).forEach(function(propertyName) {
                      _this.dom.setAttribute(propertyName, attributes[propertyName]);
                    }), Utils.addClass(this.dom, classes || "noty_btn"), this;
                  };
                },
                /* 3 */
                /***/
                function(module22, exports22, __webpack_require__) {
                  Object.defineProperty(exports22, "__esModule", {
                    value: !0
                  });
                  var _createClass = /* @__PURE__ */ function() {
                    function defineProperties(target, props) {
                      for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                      }
                    }
                    return function(Constructor, protoProps, staticProps) {
                      return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor;
                    };
                  }();
                  function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor))
                      throw new TypeError("Cannot call a class as a function");
                  }
                  exports22.Push = function() {
                    function Push2() {
                      var workerPath = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "/service-worker.js";
                      return _classCallCheck(this, Push2), this.subData = {}, this.workerPath = workerPath, this.listeners = {
                        onPermissionGranted: [],
                        onPermissionDenied: [],
                        onSubscriptionSuccess: [],
                        onSubscriptionCancel: [],
                        onWorkerError: [],
                        onWorkerSuccess: [],
                        onWorkerNotSupported: []
                      }, this;
                    }
                    return _createClass(Push2, [{
                      key: "on",
                      value: function(eventName) {
                        var cb = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : function() {
                        };
                        return typeof cb == "function" && this.listeners.hasOwnProperty(eventName) && this.listeners[eventName].push(cb), this;
                      }
                    }, {
                      key: "fire",
                      value: function(eventName) {
                        var _this = this, params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
                        this.listeners.hasOwnProperty(eventName) && this.listeners[eventName].forEach(function(cb) {
                          typeof cb == "function" && cb.apply(_this, params);
                        });
                      }
                    }, {
                      key: "create",
                      value: function() {
                        console.log("NOT IMPLEMENTED YET");
                      }
                      /**
                       * @return {boolean}
                       */
                    }, {
                      key: "isSupported",
                      value: function() {
                        var result = !1;
                        try {
                          result = window.Notification || window.webkitNotifications || navigator.mozNotification || window.external && window.external.msIsSiteMode() !== void 0;
                        } catch {
                        }
                        return result;
                      }
                      /**
                       * @return {string}
                       */
                    }, {
                      key: "getPermissionStatus",
                      value: function() {
                        var perm = "default";
                        if (window.Notification && window.Notification.permissionLevel)
                          perm = window.Notification.permissionLevel;
                        else if (window.webkitNotifications && window.webkitNotifications.checkPermission)
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
                        else window.Notification && window.Notification.permission ? perm = window.Notification.permission : navigator.mozNotification ? perm = "granted" : window.external && window.external.msIsSiteMode() !== void 0 && (perm = window.external.msIsSiteMode() ? "granted" : "default");
                        return perm.toString().toLowerCase();
                      }
                      /**
                       * @return {string}
                       */
                    }, {
                      key: "getEndpoint",
                      value: function(subscription) {
                        var endpoint = subscription.endpoint, subscriptionId = subscription.subscriptionId;
                        return subscriptionId && endpoint.indexOf(subscriptionId) === -1 && (endpoint += "/" + subscriptionId), endpoint;
                      }
                      /**
                       * @return {boolean}
                       */
                    }, {
                      key: "isSWRegistered",
                      value: function() {
                        try {
                          return navigator.serviceWorker.controller.state === "activated";
                        } catch {
                          return !1;
                        }
                      }
                      /**
                       * @return {void}
                       */
                    }, {
                      key: "unregisterWorker",
                      value: function() {
                        var self2 = this;
                        "serviceWorker" in navigator && navigator.serviceWorker.getRegistrations().then(function(registrations) {
                          var _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
                          try {
                            for (var _iterator = registrations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
                              var registration = _step.value;
                              registration.unregister(), self2.fire("onSubscriptionCancel");
                            }
                          } catch (err) {
                            _didIteratorError = !0, _iteratorError = err;
                          } finally {
                            try {
                              !_iteratorNormalCompletion && _iterator.return && _iterator.return();
                            } finally {
                              if (_didIteratorError)
                                throw _iteratorError;
                            }
                          }
                        });
                      }
                      /**
                       * @return {void}
                       */
                    }, {
                      key: "requestSubscription",
                      value: function() {
                        var _this2 = this, userVisibleOnly = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0, self2 = this, current = this.getPermissionStatus(), cb = function(result) {
                          result === "granted" ? (_this2.fire("onPermissionGranted"), "serviceWorker" in navigator ? navigator.serviceWorker.register(_this2.workerPath).then(function() {
                            navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
                              self2.fire("onWorkerSuccess"), serviceWorkerRegistration.pushManager.subscribe({
                                userVisibleOnly
                              }).then(function(subscription) {
                                var key = subscription.getKey("p256dh"), token = subscription.getKey("auth");
                                self2.subData = {
                                  endpoint: self2.getEndpoint(subscription),
                                  p256dh: key ? window.btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : null,
                                  auth: token ? window.btoa(String.fromCharCode.apply(null, new Uint8Array(token))) : null
                                }, self2.fire("onSubscriptionSuccess", [self2.subData]);
                              }).catch(function(err) {
                                self2.fire("onWorkerError", [err]);
                              });
                            });
                          }) : self2.fire("onWorkerNotSupported")) : result === "denied" && (_this2.fire("onPermissionDenied"), _this2.unregisterWorker());
                        };
                        current === "default" ? window.Notification && window.Notification.requestPermission ? window.Notification.requestPermission(cb) : window.webkitNotifications && window.webkitNotifications.checkPermission && window.webkitNotifications.requestPermission(cb) : cb(current);
                      }
                    }]), Push2;
                  }();
                },
                /* 4 */
                /***/
                function(module22, exports22, __webpack_require__) {
                  (function(process2, global2) {
                    var require2;
                    (function(global22, factory) {
                      module22.exports = factory();
                    })(this, function() {
                      function objectOrFunction(x) {
                        var type = typeof x;
                        return x !== null && (type === "object" || type === "function");
                      }
                      function isFunction2(x) {
                        return typeof x == "function";
                      }
                      var _isArray = void 0;
                      Array.isArray ? _isArray = Array.isArray : _isArray = function(x) {
                        return Object.prototype.toString.call(x) === "[object Array]";
                      };
                      var isArray2 = _isArray, len = 0, vertxNext = void 0, customSchedulerFn = void 0, asap = function(callback, arg) {
                        queue[len] = callback, queue[len + 1] = arg, len += 2, len === 2 && (customSchedulerFn ? customSchedulerFn(flush) : scheduleFlush());
                      };
                      function setScheduler(scheduleFn) {
                        customSchedulerFn = scheduleFn;
                      }
                      function setAsap(asapFn) {
                        asap = asapFn;
                      }
                      var browserWindow = typeof window < "u" ? window : void 0, browserGlobal = browserWindow || {}, BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver, isNode = typeof self > "u" && typeof process2 < "u" && {}.toString.call(process2) === "[object process]", isWorker = typeof Uint8ClampedArray < "u" && typeof importScripts < "u" && typeof MessageChannel < "u";
                      function useNextTick() {
                        return function() {
                          return process2.nextTick(flush);
                        };
                      }
                      function useVertxTimer() {
                        return typeof vertxNext < "u" ? function() {
                          vertxNext(flush);
                        } : useSetTimeout();
                      }
                      function useMutationObserver() {
                        var iterations = 0, observer = new BrowserMutationObserver(flush), node = document.createTextNode("");
                        return observer.observe(node, { characterData: !0 }), function() {
                          node.data = iterations = ++iterations % 2;
                        };
                      }
                      function useMessageChannel() {
                        var channel = new MessageChannel();
                        return channel.port1.onmessage = flush, function() {
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
                          var callback = queue[i], arg = queue[i + 1];
                          callback(arg), queue[i] = void 0, queue[i + 1] = void 0;
                        }
                        len = 0;
                      }
                      function attemptVertx() {
                        try {
                          var r = require2, vertx = __webpack_require__(9);
                          return vertxNext = vertx.runOnLoop || vertx.runOnContext, useVertxTimer();
                        } catch {
                          return useSetTimeout();
                        }
                      }
                      var scheduleFlush = void 0;
                      isNode ? scheduleFlush = useNextTick() : BrowserMutationObserver ? scheduleFlush = useMutationObserver() : isWorker ? scheduleFlush = useMessageChannel() : browserWindow === void 0 ? scheduleFlush = attemptVertx() : scheduleFlush = useSetTimeout();
                      function then(onFulfillment, onRejection) {
                        var _arguments = arguments, parent = this, child = new this.constructor(noop2);
                        child[PROMISE_ID] === void 0 && makePromise(child);
                        var _state = parent._state;
                        return _state ? function() {
                          var callback = _arguments[_state - 1];
                          asap(function() {
                            return invokeCallback(_state, child, callback, parent._result);
                          });
                        }() : subscribe(parent, child, onFulfillment, onRejection), child;
                      }
                      function resolve$1(object) {
                        var Constructor = this;
                        if (object && typeof object == "object" && object.constructor === Constructor)
                          return object;
                        var promise = new Constructor(noop2);
                        return resolve(promise, object), promise;
                      }
                      var PROMISE_ID = Math.random().toString(36).substring(16);
                      function noop2() {
                      }
                      var PENDING = void 0, FULFILLED = 1, REJECTED = 2, GET_THEN_ERROR = new ErrorObject();
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
                          return GET_THEN_ERROR.error = error, GET_THEN_ERROR;
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
                          var sealed = !1, error = tryThen(then$$1, thenable, function(value) {
                            sealed || (sealed = !0, thenable !== value ? resolve(promise2, value) : fulfill(promise2, value));
                          }, function(reason) {
                            sealed || (sealed = !0, reject(promise2, reason));
                          }, "Settle: " + (promise2._label || " unknown promise"));
                          !sealed && error && (sealed = !0, reject(promise2, error));
                        }, promise);
                      }
                      function handleOwnThenable(promise, thenable) {
                        thenable._state === FULFILLED ? fulfill(promise, thenable._result) : thenable._state === REJECTED ? reject(promise, thenable._result) : subscribe(thenable, void 0, function(value) {
                          return resolve(promise, value);
                        }, function(reason) {
                          return reject(promise, reason);
                        });
                      }
                      function handleMaybeThenable(promise, maybeThenable, then$$1) {
                        maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1 ? handleOwnThenable(promise, maybeThenable) : then$$1 === GET_THEN_ERROR ? (reject(promise, GET_THEN_ERROR.error), GET_THEN_ERROR.error = null) : then$$1 === void 0 ? fulfill(promise, maybeThenable) : isFunction2(then$$1) ? handleForeignThenable(promise, maybeThenable, then$$1) : fulfill(promise, maybeThenable);
                      }
                      function resolve(promise, value) {
                        promise === value ? reject(promise, selfFulfillment()) : objectOrFunction(value) ? handleMaybeThenable(promise, value, getThen(value)) : fulfill(promise, value);
                      }
                      function publishRejection(promise) {
                        promise._onerror && promise._onerror(promise._result), publish(promise);
                      }
                      function fulfill(promise, value) {
                        promise._state === PENDING && (promise._result = value, promise._state = FULFILLED, promise._subscribers.length !== 0 && asap(publish, promise));
                      }
                      function reject(promise, reason) {
                        promise._state === PENDING && (promise._state = REJECTED, promise._result = reason, asap(publishRejection, promise));
                      }
                      function subscribe(parent, child, onFulfillment, onRejection) {
                        var _subscribers = parent._subscribers, length = _subscribers.length;
                        parent._onerror = null, _subscribers[length] = child, _subscribers[length + FULFILLED] = onFulfillment, _subscribers[length + REJECTED] = onRejection, length === 0 && parent._state && asap(publish, parent);
                      }
                      function publish(promise) {
                        var subscribers = promise._subscribers, settled = promise._state;
                        if (subscribers.length !== 0) {
                          for (var child = void 0, callback = void 0, detail = promise._result, i = 0; i < subscribers.length; i += 3)
                            child = subscribers[i], callback = subscribers[i + settled], child ? invokeCallback(settled, child, callback, detail) : callback(detail);
                          promise._subscribers.length = 0;
                        }
                      }
                      function ErrorObject() {
                        this.error = null;
                      }
                      var TRY_CATCH_ERROR = new ErrorObject();
                      function tryCatch(callback, detail) {
                        try {
                          return callback(detail);
                        } catch (e) {
                          return TRY_CATCH_ERROR.error = e, TRY_CATCH_ERROR;
                        }
                      }
                      function invokeCallback(settled, promise, callback, detail) {
                        var hasCallback = isFunction2(callback), value = void 0, error = void 0, succeeded = void 0, failed = void 0;
                        if (hasCallback) {
                          if (value = tryCatch(callback, detail), value === TRY_CATCH_ERROR ? (failed = !0, error = value.error, value.error = null) : succeeded = !0, promise === value) {
                            reject(promise, cannotReturnOwn());
                            return;
                          }
                        } else
                          value = detail, succeeded = !0;
                        promise._state !== PENDING || (hasCallback && succeeded ? resolve(promise, value) : failed ? reject(promise, error) : settled === FULFILLED ? fulfill(promise, value) : settled === REJECTED && reject(promise, value));
                      }
                      function initializePromise(promise, resolver) {
                        try {
                          resolver(function(value) {
                            resolve(promise, value);
                          }, function(reason) {
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
                        promise[PROMISE_ID] = id++, promise._state = void 0, promise._result = void 0, promise._subscribers = [];
                      }
                      function Enumerator$1(Constructor, input) {
                        this._instanceConstructor = Constructor, this.promise = new Constructor(noop2), this.promise[PROMISE_ID] || makePromise(this.promise), isArray2(input) ? (this.length = input.length, this._remaining = input.length, this._result = new Array(this.length), this.length === 0 ? fulfill(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(input), this._remaining === 0 && fulfill(this.promise, this._result))) : reject(this.promise, validationError());
                      }
                      function validationError() {
                        return new Error("Array Methods must be provided an Array");
                      }
                      Enumerator$1.prototype._enumerate = function(input) {
                        for (var i = 0; this._state === PENDING && i < input.length; i++)
                          this._eachEntry(input[i], i);
                      }, Enumerator$1.prototype._eachEntry = function(entry, i) {
                        var c = this._instanceConstructor, resolve$$1 = c.resolve;
                        if (resolve$$1 === resolve$1) {
                          var _then = getThen(entry);
                          if (_then === then && entry._state !== PENDING)
                            this._settledAt(entry._state, i, entry._result);
                          else if (typeof _then != "function")
                            this._remaining--, this._result[i] = entry;
                          else if (c === Promise$2) {
                            var promise = new c(noop2);
                            handleMaybeThenable(promise, entry, _then), this._willSettleAt(promise, i);
                          } else
                            this._willSettleAt(new c(function(resolve$$12) {
                              return resolve$$12(entry);
                            }), i);
                        } else
                          this._willSettleAt(resolve$$1(entry), i);
                      }, Enumerator$1.prototype._settledAt = function(state, i, value) {
                        var promise = this.promise;
                        promise._state === PENDING && (this._remaining--, state === REJECTED ? reject(promise, value) : this._result[i] = value), this._remaining === 0 && fulfill(promise, this._result);
                      }, Enumerator$1.prototype._willSettleAt = function(promise, i) {
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
                        return isArray2(entries) ? new Constructor(function(resolve2, reject2) {
                          for (var length = entries.length, i = 0; i < length; i++)
                            Constructor.resolve(entries[i]).then(resolve2, reject2);
                        }) : new Constructor(function(_, reject2) {
                          return reject2(new TypeError("You must pass an array to race."));
                        });
                      }
                      function reject$1(reason) {
                        var Constructor = this, promise = new Constructor(noop2);
                        return reject(promise, reason), promise;
                      }
                      function needsResolver() {
                        throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
                      }
                      function needsNew() {
                        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
                      }
                      function Promise$2(resolver) {
                        this[PROMISE_ID] = nextId(), this._result = this._state = void 0, this._subscribers = [], noop2 !== resolver && (typeof resolver != "function" && needsResolver(), this instanceof Promise$2 ? initializePromise(this, resolver) : needsNew());
                      }
                      Promise$2.all = all$1, Promise$2.race = race$1, Promise$2.resolve = resolve$1, Promise$2.reject = reject$1, Promise$2._setScheduler = setScheduler, Promise$2._setAsap = setAsap, Promise$2._asap = asap, Promise$2.prototype = {
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
                        catch: function(onRejection) {
                          return this.then(null, onRejection);
                        }
                      };
                      function polyfill$1() {
                        var local = void 0;
                        if (typeof global2 < "u")
                          local = global2;
                        else if (typeof self < "u")
                          local = self;
                        else
                          try {
                            local = Function("return this")();
                          } catch {
                            throw new Error("polyfill failed because global object is unavailable in this environment");
                          }
                        var P = local.Promise;
                        if (P) {
                          var promiseToString = null;
                          try {
                            promiseToString = Object.prototype.toString.call(P.resolve());
                          } catch {
                          }
                          if (promiseToString === "[object Promise]" && !P.cast)
                            return;
                        }
                        local.Promise = Promise$2;
                      }
                      return Promise$2.polyfill = polyfill$1, Promise$2.Promise = Promise$2, Promise$2;
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
                    value: !0
                  });
                  var _createClass = /* @__PURE__ */ function() {
                    function defineProperties(target, props) {
                      for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                      }
                    }
                    return function(Constructor, protoProps, staticProps) {
                      return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor;
                    };
                  }();
                  __webpack_require__(5);
                  var _es6Promise = __webpack_require__(4), _es6Promise2 = _interopRequireDefault(_es6Promise), _utils = __webpack_require__(0), Utils = _interopRequireWildcard(_utils), _api = __webpack_require__(1), API = _interopRequireWildcard(_api), _button = __webpack_require__(2), _push = __webpack_require__(3);
                  function _interopRequireWildcard(obj) {
                    if (obj && obj.__esModule)
                      return obj;
                    var newObj = {};
                    if (obj != null)
                      for (var key in obj)
                        Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                    return newObj.default = obj, newObj;
                  }
                  function _interopRequireDefault(obj) {
                    return obj && obj.__esModule ? obj : { default: obj };
                  }
                  function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor))
                      throw new TypeError("Cannot call a class as a function");
                  }
                  var Noty2 = function() {
                    function Noty22() {
                      var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                      return _classCallCheck(this, Noty22), this.options = Utils.deepExtend({}, API.Defaults, options), this.id = this.options.id || Utils.generateID("bar"), this.closeTimer = -1, this.barDom = null, this.layoutDom = null, this.progressDom = null, this.showing = !1, this.shown = !1, this.closed = !1, this.closing = !1, this.killable = this.options.timeout || this.options.closeWith.length > 0, this.hasSound = this.options.sounds.sources.length > 0, this.soundPlayed = !1, this.listeners = {
                        beforeShow: [],
                        onShow: [],
                        afterShow: [],
                        onClose: [],
                        afterClose: [],
                        onClick: [],
                        onHover: [],
                        onTemplate: []
                      }, this.promises = {
                        show: null,
                        close: null
                      }, this.on("beforeShow", this.options.callbacks.beforeShow), this.on("onShow", this.options.callbacks.onShow), this.on("afterShow", this.options.callbacks.afterShow), this.on("onClose", this.options.callbacks.onClose), this.on("afterClose", this.options.callbacks.afterClose), this.on("onClick", this.options.callbacks.onClick), this.on("onHover", this.options.callbacks.onHover), this.on("onTemplate", this.options.callbacks.onTemplate), this;
                    }
                    return _createClass(Noty22, [{
                      key: "on",
                      value: function(eventName) {
                        var cb = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : function() {
                        };
                        return typeof cb == "function" && this.listeners.hasOwnProperty(eventName) && this.listeners[eventName].push(cb), this;
                      }
                      /**
                       * @return {Noty}
                       */
                    }, {
                      key: "show",
                      value: function() {
                        var _this = this;
                        this.options.killer === !0 ? Noty22.closeAll() : typeof this.options.killer == "string" && Noty22.closeAll(this.options.killer);
                        var queueCounts = API.getQueueCounts(this.options.queue);
                        if (queueCounts.current >= queueCounts.maxVisible || API.PageHidden && this.options.visibilityControl)
                          return API.addToQueue(this), API.PageHidden && this.hasSound && Utils.inArray("docHidden", this.options.sounds.conditions) && Utils.createAudioElements(this), API.PageHidden && Utils.inArray("docHidden", this.options.titleCount.conditions) && API.docTitle.increment(), this;
                        if (API.Store[this.id] = this, API.fire(this, "beforeShow"), this.showing = !0, this.closing)
                          return this.showing = !1, this;
                        if (API.build(this), API.handleModal(this), this.options.force ? this.layoutDom.insertBefore(this.barDom, this.layoutDom.firstChild) : this.layoutDom.appendChild(this.barDom), this.hasSound && !this.soundPlayed && Utils.inArray("docVisible", this.options.sounds.conditions) && Utils.createAudioElements(this), Utils.inArray("docVisible", this.options.titleCount.conditions) && API.docTitle.increment(), this.shown = !0, this.closed = !1, API.hasButtons(this) && Object.keys(this.options.buttons).forEach(function(key) {
                          var btn = _this.barDom.querySelector("#" + _this.options.buttons[key].id);
                          Utils.addListener(btn, "click", function(e) {
                            Utils.stopPropagation(e), _this.options.buttons[key].cb();
                          });
                        }), this.progressDom = this.barDom.querySelector(".noty_progressbar"), Utils.inArray("click", this.options.closeWith) && (Utils.addClass(this.barDom, "noty_close_with_click"), Utils.addListener(this.barDom, "click", function(e) {
                          Utils.stopPropagation(e), API.fire(_this, "onClick"), _this.close();
                        }, !1)), Utils.addListener(this.barDom, "mouseenter", function() {
                          API.fire(_this, "onHover");
                        }, !1), this.options.timeout && Utils.addClass(this.barDom, "noty_has_timeout"), this.options.progressBar && Utils.addClass(this.barDom, "noty_has_progressbar"), Utils.inArray("button", this.options.closeWith)) {
                          Utils.addClass(this.barDom, "noty_close_with_button");
                          var closeButton = document.createElement("div");
                          Utils.addClass(closeButton, "noty_close_button"), closeButton.innerHTML = "×", this.barDom.appendChild(closeButton), Utils.addListener(closeButton, "click", function(e) {
                            Utils.stopPropagation(e), _this.close();
                          }, !1);
                        }
                        return API.fire(this, "onShow"), this.options.animation.open === null ? this.promises.show = new _es6Promise2.default(function(resolve) {
                          resolve();
                        }) : typeof this.options.animation.open == "function" ? this.promises.show = new _es6Promise2.default(this.options.animation.open.bind(this)) : (Utils.addClass(this.barDom, this.options.animation.open), this.promises.show = new _es6Promise2.default(function(resolve) {
                          Utils.addListener(_this.barDom, Utils.animationEndEvents, function() {
                            Utils.removeClass(_this.barDom, _this.options.animation.open), resolve();
                          });
                        })), this.promises.show.then(function() {
                          var _t = _this;
                          setTimeout(function() {
                            API.openFlow(_t);
                          }, 100);
                        }), this;
                      }
                      /**
                       * @return {Noty}
                       */
                    }, {
                      key: "stop",
                      value: function() {
                        return API.dequeueClose(this), this;
                      }
                      /**
                       * @return {Noty}
                       */
                    }, {
                      key: "resume",
                      value: function() {
                        return API.queueClose(this), this;
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
                        return setTimeout2.toString = function() {
                          return _setTimeout.toString();
                        }, setTimeout2;
                      }(function(ms) {
                        if (this.stop(), this.options.timeout = ms, this.barDom) {
                          this.options.timeout ? Utils.addClass(this.barDom, "noty_has_timeout") : Utils.removeClass(this.barDom, "noty_has_timeout");
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
                      value: function(html) {
                        var optionsOverride = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
                        return this.barDom && (this.barDom.querySelector(".noty_body").innerHTML = html), optionsOverride && (this.options.text = html), this;
                      }
                      /**
                       * @param {string} type
                       * @param {boolean} optionsOverride
                       * @return {Noty}
                       */
                    }, {
                      key: "setType",
                      value: function(type) {
                        var _this2 = this, optionsOverride = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
                        if (this.barDom) {
                          var classList = Utils.classList(this.barDom).split(" ");
                          classList.forEach(function(c) {
                            c.substring(0, 11) === "noty_type__" && Utils.removeClass(_this2.barDom, c);
                          }), Utils.addClass(this.barDom, "noty_type__" + type);
                        }
                        return optionsOverride && (this.options.type = type), this;
                      }
                      /**
                       * @param {string} theme
                       * @param {boolean} optionsOverride
                       * @return {Noty}
                       */
                    }, {
                      key: "setTheme",
                      value: function(theme) {
                        var _this3 = this, optionsOverride = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
                        if (this.barDom) {
                          var classList = Utils.classList(this.barDom).split(" ");
                          classList.forEach(function(c) {
                            c.substring(0, 12) === "noty_theme__" && Utils.removeClass(_this3.barDom, c);
                          }), Utils.addClass(this.barDom, "noty_theme__" + theme);
                        }
                        return optionsOverride && (this.options.theme = theme), this;
                      }
                      /**
                       * @return {Noty}
                       */
                    }, {
                      key: "close",
                      value: function() {
                        var _this4 = this;
                        return this.closed ? this : this.shown ? (API.fire(this, "onClose"), this.closing = !0, this.options.animation.close === null ? this.promises.close = new _es6Promise2.default(function(resolve) {
                          resolve();
                        }) : typeof this.options.animation.close == "function" ? this.promises.close = new _es6Promise2.default(this.options.animation.close.bind(this)) : (Utils.addClass(this.barDom, this.options.animation.close), this.promises.close = new _es6Promise2.default(function(resolve) {
                          Utils.addListener(_this4.barDom, Utils.animationEndEvents, function() {
                            _this4.options.force ? Utils.remove(_this4.barDom) : API.ghostFix(_this4), resolve();
                          });
                        })), this.promises.close.then(function() {
                          API.closeFlow(_this4), API.handleModalClose(_this4);
                        }), this.closed = !0, this) : (API.removeFromQueue(this), this);
                      }
                      // API functions
                      /**
                       * @param {boolean|string} queueName
                       * @return {Noty}
                       */
                    }], [{
                      key: "closeAll",
                      value: function() {
                        var queueName = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
                        return Object.keys(API.Store).forEach(function(id) {
                          queueName ? API.Store[id].options.queue === queueName && API.Store[id].killable && API.Store[id].close() : API.Store[id].killable && API.Store[id].close();
                        }), this;
                      }
                      /**
                       * @param {Object} obj
                       * @return {Noty}
                       */
                    }, {
                      key: "overrideDefaults",
                      value: function(obj) {
                        return API.Defaults = Utils.deepExtend({}, API.Defaults, obj), this;
                      }
                      /**
                       * @param {int} amount
                       * @param {string} queueName
                       * @return {Noty}
                       */
                    }, {
                      key: "setMaxVisible",
                      value: function() {
                        var amount = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : API.DefaultMaxVisible, queueName = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "global";
                        return API.Queues.hasOwnProperty(queueName) || (API.Queues[queueName] = { maxVisible: amount, queue: [] }), API.Queues[queueName].maxVisible = amount, this;
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
                      value: function(innerHtml) {
                        var classes = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, cb = arguments[2], attributes = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
                        return new _button.NotyButton(innerHtml, classes, cb, attributes);
                      }
                      /**
                       * @return {string}
                       */
                    }, {
                      key: "version",
                      value: function() {
                        return "3.1.4";
                      }
                      /**
                       * @param {String} workerPath
                       * @return {Push}
                       */
                    }, {
                      key: "Push",
                      value: function(workerPath) {
                        return new _push.Push(workerPath);
                      }
                    }]), Noty22;
                  }();
                  exports22.default = Noty2, Utils.visibilityChangeFlow(), module22.exports = exports22.default;
                },
                /* 7 */
                /***/
                function(module22, exports22) {
                  var process2 = module22.exports = {}, cachedSetTimeout, cachedClearTimeout;
                  function defaultSetTimout() {
                    throw new Error("setTimeout has not been defined");
                  }
                  function defaultClearTimeout() {
                    throw new Error("clearTimeout has not been defined");
                  }
                  (function() {
                    try {
                      typeof setTimeout == "function" ? cachedSetTimeout = setTimeout : cachedSetTimeout = defaultSetTimout;
                    } catch {
                      cachedSetTimeout = defaultSetTimout;
                    }
                    try {
                      typeof clearTimeout == "function" ? cachedClearTimeout = clearTimeout : cachedClearTimeout = defaultClearTimeout;
                    } catch {
                      cachedClearTimeout = defaultClearTimeout;
                    }
                  })();
                  function runTimeout(fun) {
                    if (cachedSetTimeout === setTimeout)
                      return setTimeout(fun, 0);
                    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout)
                      return cachedSetTimeout = setTimeout, setTimeout(fun, 0);
                    try {
                      return cachedSetTimeout(fun, 0);
                    } catch {
                      try {
                        return cachedSetTimeout.call(null, fun, 0);
                      } catch {
                        return cachedSetTimeout.call(this, fun, 0);
                      }
                    }
                  }
                  function runClearTimeout(marker) {
                    if (cachedClearTimeout === clearTimeout)
                      return clearTimeout(marker);
                    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout)
                      return cachedClearTimeout = clearTimeout, clearTimeout(marker);
                    try {
                      return cachedClearTimeout(marker);
                    } catch {
                      try {
                        return cachedClearTimeout.call(null, marker);
                      } catch {
                        return cachedClearTimeout.call(this, marker);
                      }
                    }
                  }
                  var queue = [], draining = !1, currentQueue, queueIndex = -1;
                  function cleanUpNextTick() {
                    !draining || !currentQueue || (draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, queue.length && drainQueue());
                  }
                  function drainQueue() {
                    if (!draining) {
                      var timeout = runTimeout(cleanUpNextTick);
                      draining = !0;
                      for (var len = queue.length; len; ) {
                        for (currentQueue = queue, queue = []; ++queueIndex < len; )
                          currentQueue && currentQueue[queueIndex].run();
                        queueIndex = -1, len = queue.length;
                      }
                      currentQueue = null, draining = !1, runClearTimeout(timeout);
                    }
                  }
                  process2.nextTick = function(fun) {
                    var args = new Array(arguments.length - 1);
                    if (arguments.length > 1)
                      for (var i = 1; i < arguments.length; i++)
                        args[i - 1] = arguments[i];
                    queue.push(new Item(fun, args)), queue.length === 1 && !draining && runTimeout(drainQueue);
                  };
                  function Item(fun, array) {
                    this.fun = fun, this.array = array;
                  }
                  Item.prototype.run = function() {
                    this.fun.apply(null, this.array);
                  }, process2.title = "browser", process2.browser = !0, process2.env = {}, process2.argv = [], process2.version = "", process2.versions = {};
                  function noop2() {
                  }
                  process2.on = noop2, process2.addListener = noop2, process2.once = noop2, process2.off = noop2, process2.removeListener = noop2, process2.removeAllListeners = noop2, process2.emit = noop2, process2.prependListener = noop2, process2.prependOnceListener = noop2, process2.listeners = function(name) {
                    return [];
                  }, process2.binding = function(name) {
                    throw new Error("process.binding is not supported");
                  }, process2.cwd = function() {
                    return "/";
                  }, process2.chdir = function(dir) {
                    throw new Error("process.chdir is not supported");
                  }, process2.umask = function() {
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
                    g = g || Function("return this")() || (0, eval)("this");
                  } catch {
                    typeof window == "object" && (g = window);
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
        }(noty$1)), noty$1.exports;
      }
      var notyExports = requireNoty();
      const Noty = /* @__PURE__ */ getDefaultExportFromCjs(notyExports);
      const _create = Object.create, create = (obj = null) => _create(obj);
      let _globalThis;
      const getGlobalThis = () => _globalThis || (_globalThis = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : create()), isFunction = (val) => typeof val == "function", isObject$1 = (val) => val !== null && typeof val == "object";
      function initFeatureFlags() {
        typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (getGlobalThis().__INTLIFY_PROD_DEVTOOLS__ = !1);
      }
      const pathStateMachine = [];
      pathStateMachine[
        0
        /* States.BEFORE_PATH */
      ] = {
        w: [
          0
          /* States.BEFORE_PATH */
        ],
        i: [
          3,
          0
          /* Actions.APPEND */
        ],
        "[": [
          4
          /* States.IN_SUB_PATH */
        ],
        o: [
          7
          /* States.AFTER_PATH */
        ]
      };
      pathStateMachine[
        1
        /* States.IN_PATH */
      ] = {
        w: [
          1
          /* States.IN_PATH */
        ],
        ".": [
          2
          /* States.BEFORE_IDENT */
        ],
        "[": [
          4
          /* States.IN_SUB_PATH */
        ],
        o: [
          7
          /* States.AFTER_PATH */
        ]
      };
      pathStateMachine[
        2
        /* States.BEFORE_IDENT */
      ] = {
        w: [
          2
          /* States.BEFORE_IDENT */
        ],
        i: [
          3,
          0
          /* Actions.APPEND */
        ],
        0: [
          3,
          0
          /* Actions.APPEND */
        ]
      };
      pathStateMachine[
        3
        /* States.IN_IDENT */
      ] = {
        i: [
          3,
          0
          /* Actions.APPEND */
        ],
        0: [
          3,
          0
          /* Actions.APPEND */
        ],
        w: [
          1,
          1
          /* Actions.PUSH */
        ],
        ".": [
          2,
          1
          /* Actions.PUSH */
        ],
        "[": [
          4,
          1
          /* Actions.PUSH */
        ],
        o: [
          7,
          1
          /* Actions.PUSH */
        ]
      };
      pathStateMachine[
        4
        /* States.IN_SUB_PATH */
      ] = {
        "'": [
          5,
          0
          /* Actions.APPEND */
        ],
        '"': [
          6,
          0
          /* Actions.APPEND */
        ],
        "[": [
          4,
          2
          /* Actions.INC_SUB_PATH_DEPTH */
        ],
        "]": [
          1,
          3
          /* Actions.PUSH_SUB_PATH */
        ],
        o: 8,
        l: [
          4,
          0
          /* Actions.APPEND */
        ]
      };
      pathStateMachine[
        5
        /* States.IN_SINGLE_QUOTE */
      ] = {
        "'": [
          4,
          0
          /* Actions.APPEND */
        ],
        o: 8,
        l: [
          5,
          0
          /* Actions.APPEND */
        ]
      };
      pathStateMachine[
        6
        /* States.IN_DOUBLE_QUOTE */
      ] = {
        '"': [
          4,
          0
          /* Actions.APPEND */
        ],
        o: 8,
        l: [
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
        const a = str.charCodeAt(0), b = str.charCodeAt(str.length - 1);
        return a === b && (a === 34 || a === 39) ? str.slice(1, -1) : str;
      }
      function getPathCharType(ch) {
        if (ch == null)
          return "o";
        switch (ch.charCodeAt(0)) {
          case 91:
          // [
          case 93:
          // ]
          case 46:
          // .
          case 34:
          // "
          case 39:
            return ch;
          case 95:
          // _
          case 36:
          // $
          case 45:
            return "i";
          case 9:
          // Tab (HT)
          case 10:
          // Newline (LF)
          case 13:
          // Return (CR)
          case 160:
          // No-break space (NBSP)
          case 65279:
          // Byte Order Mark (BOM)
          case 8232:
          // Line Separator (LS)
          case 8233:
            return "w";
        }
        return "i";
      }
      function formatSubPath(path) {
        const trimmed = path.trim();
        return path.charAt(0) === "0" && isNaN(parseInt(path)) ? !1 : isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
      }
      function parse(path) {
        const keys2 = [];
        let index = -1, mode = 0, subPathDepth = 0, c, key, newChar, type, transition, action, typeMap;
        const actions = [];
        actions[
          0
          /* Actions.APPEND */
        ] = () => {
          key === void 0 ? key = newChar : key += newChar;
        }, actions[
          1
          /* Actions.PUSH */
        ] = () => {
          key !== void 0 && (keys2.push(key), key = void 0);
        }, actions[
          2
          /* Actions.INC_SUB_PATH_DEPTH */
        ] = () => {
          actions[
            0
            /* Actions.APPEND */
          ](), subPathDepth++;
        }, actions[
          3
          /* Actions.PUSH_SUB_PATH */
        ] = () => {
          if (subPathDepth > 0)
            subPathDepth--, mode = 4, actions[
              0
              /* Actions.APPEND */
            ]();
          else {
            if (subPathDepth = 0, key === void 0 || (key = formatSubPath(key), key === !1))
              return !1;
            actions[
              1
              /* Actions.PUSH */
            ]();
          }
        };
        function maybeUnescapeQuote() {
          const nextChar = path[index + 1];
          if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === '"')
            return index++, newChar = "\\" + nextChar, actions[
              0
              /* Actions.APPEND */
            ](), !0;
        }
        for (; mode !== null; )
          if (index++, c = path[index], !(c === "\\" && maybeUnescapeQuote())) {
            if (type = getPathCharType(c), typeMap = pathStateMachine[mode], transition = typeMap[type] || typeMap.l || 8, transition === 8 || (mode = transition[0], transition[1] !== void 0 && (action = actions[transition[1]], action && (newChar = c, action() === !1))))
              return;
            if (mode === 7)
              return keys2;
          }
      }
      const cache = /* @__PURE__ */ new Map();
      function resolveValue(obj, path) {
        if (!isObject$1(obj))
          return null;
        let hit = cache.get(path);
        if (hit || (hit = parse(path), hit && cache.set(path, hit)), !hit)
          return null;
        const len = hit.length;
        let last2 = obj, i = 0;
        for (; i < len; ) {
          const val = last2[hit[i]];
          if (val === void 0 || isFunction(last2))
            return null;
          last2 = val, i++;
        }
        return last2;
      }
      initFeatureFlags();
      const resource$1 = {
        common: {
          settings: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Settings" } },
          auto: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Auto" } },
          english: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "English" } },
          japanese: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Japanese" } },
          chinese: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Chinese" } },
          pretty: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Pretty" } },
          filter: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Filter" } },
          none: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "None" } },
          disabled: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Disabled" } },
          copy: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Copy" } },
          copied: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Copied" } },
          abbr: {
            english: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "EN" } },
            japanese: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "JP" } },
            chinese: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "CN" } }
          }
        },
        setting: {
          title: { t: 0, b: { t: 2, i: [{ t: 6, k: { t: 7, v: "common.settings" } }] } },
          advanceTitle: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Advance Settings" } },
          helpButton: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Help" } },
          asteriskTip: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "means refresh is required to take effect" } },
          downloadThread: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Download thread" } },
          openOnNewTab: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Open on new tab" } },
          compressionFilename: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Compression filename" } },
          maxNumber: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Max number" } },
          separator: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Separator" } },
          compressionLevel: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Compression level" } },
          filenameLength: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Filename length" } },
          convertWebpTo: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Convert webp to" } },
          convertWebpQuality: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Quality" } },
          removeAdPage: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Remove ads pages" } },
          autoCancelDownloadedManga: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Auto cancel downloaded manga" } },
          autoRetryWhenErrorOccurs: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Auto retry when error occurs" } },
          autoShowAll: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Auto show all" } },
          showIgnoreButton: { t: 0, b: { t: 2, i: [{ t: 3 }], s: 'Show "Ignore" button' } },
          judgeDownloadedMangaByTitle: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Judge downloaded manga by title" } },
          customDownloadUrl: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Custom download URL" } },
          compressionStreamFiles: { t: 0, b: { t: 2, i: [{ t: 3 }], s: 'Compression "streamFiles"' } },
          seriesMode: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Series mode" } },
          streamDownload: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Stream download" } },
          preventConsoleClearing: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Prevent console clearing" } },
          nHentaiDownloadHost: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "nHentai download host" } },
          nHentaiDownloadHostOption: {
            auto: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Auto (recommended)" } },
            random: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Random" } },
            balance: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Balance" } }
          },
          addMetaFile: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Add metadata file" } },
          metaFileTitleLanguage: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Title language" } },
          titleReplacement: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Title replacement" } },
          galleryContextmenuPreview: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Context menu preview" } },
          customFilenameFunction: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Custom filename function" } },
          history: {
            title: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Download History" } },
            downloadedNumberTip: { t: 0, b: { t: 2, i: [{ t: 3, v: "You have downloaded " }, { t: 4, k: "num" }, { t: 3, v: " manga on this site using nHentai Helper." }] } },
            import: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Import" } },
            export: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Export" } },
            clear: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Clear" } },
            importTip: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Tip: Import will not clear the existing history, but merges with it." } }
          }
        },
        dialog: {
          yes: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "YES" } },
          no: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "NO" } },
          action: {
            getInfo: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "getting information" } },
            download: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "downloading" } }
          },
          downloadAgainConfirm: ({ named }) => `<i>${named("title")}</i> is already downloaded${named("hasQueue") ? " or in queue" : ""}.<br>Do you want to download again?`,
          errorRetryConfirm: ({ linked, named }) => `Error occurred while ${linked(`message.dialog.action.${named("action")}`)}, retry?`,
          errorRetryTip: ({ linked, named }) => `Error occurred while ${linked(`message.dialog.action.${named("action")}`)}, retrying...`,
          downloadedTip: { t: 0, b: { t: 2, i: [{ t: 3, v: "<i>" }, { t: 4, k: "title" }, { t: 3, v: "</i> is already downloaded or in queue." }] } },
          getMediaUrlTemplateFailed: { t: 0, b: { t: 2, i: [{ t: 3, v: 'Fail to get image download url. Please set "' }, { t: 6, k: { t: 9, v: "setting.customDownloadUrl" } }, { t: 3, v: '" manually, or open a github issue to report with current url.' }] } }
        },
        button: {
          download: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Download" } },
          downloading: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Downloading" } },
          compressing: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Compressing" } },
          ignore: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Ignore this" } },
          unignore: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Ignore this" } }
        },
        input: {
          downloadSpecifiedPages: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Download specified pages (e.g. -5,7-10,12,14,18-)" } }
        },
        confirmPopup: {
          title: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Are you sure?" } },
          yes: { t: 0, b: { static: "", t: 2, i: [] } },
          no: { t: 0, b: { static: "", t: 2, i: [] } }
        },
        meta: {
          id: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "ID" } },
          parody: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Parodies" } },
          character: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Characters" } },
          tag: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Tags" } },
          artist: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Artists" } },
          group: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Groups" } },
          language: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Languages" } },
          category: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Categories" } },
          page: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Pages" } },
          upload: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "Upload Date" } }
        }
      }, resource = {
        common: {
          settings: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "设置" } },
          auto: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "自动" } },
          english: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "英文" } },
          japanese: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "日文" } },
          chinese: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "中文" } },
          pretty: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "简略" } },
          filter: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "过滤" } },
          none: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "无" } },
          disabled: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "禁用" } },
          copy: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "复制" } },
          copied: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "已复制" } },
          abbr: {
            english: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "英" } },
            japanese: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "日" } },
            chinese: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "中" } }
          }
        },
        setting: {
          title: { t: 0, b: { t: 2, i: [{ t: 6, k: { t: 7, v: "common.settings" } }] } },
          advanceTitle: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "进阶设置" } },
          helpButton: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "帮助" } },
          asteriskTip: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "表示刷新页面才能生效" } },
          downloadThread: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "下载线程数" } },
          openOnNewTab: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "在新选项卡打开" } },
          compressionFilename: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "压缩文件名" } },
          maxNumber: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "最大数量" } },
          separator: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "分隔符" } },
          compressionLevel: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "压缩等级" } },
          filenameLength: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "文件名长度" } },
          convertWebpTo: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "转换 webp 为" } },
          convertWebpQuality: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "质量" } },
          removeAdPage: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "移除广告页" } },
          autoCancelDownloadedManga: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "自动取消下载过的本子" } },
          autoRetryWhenErrorOccurs: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "发生错误时自动重试" } },
          autoShowAll: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "自动显示全部" } },
          showIgnoreButton: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "显示“忽略”按钮" } },
          judgeDownloadedMangaByTitle: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "用标题判断本子是否下载过" } },
          customDownloadUrl: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "自定义下载地址" } },
          compressionStreamFiles: { t: 0, b: { t: 2, i: [{ t: 3 }], s: '压缩 "streamFiles" 选项' } },
          seriesMode: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "串行模式" } },
          streamDownload: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "流式下载" } },
          preventConsoleClearing: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "阻止控制台清空" } },
          nHentaiDownloadHost: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "nHentai 下载节点" } },
          nHentaiDownloadHostOption: {
            auto: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "自动（推荐）" } },
            random: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "随机" } },
            balance: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "均衡" } }
          },
          addMetaFile: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "添加元数据文件" } },
          metaFileTitleLanguage: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "标题语言" } },
          titleReplacement: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "标题替换" } },
          galleryContextmenuPreview: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "右击预览" } },
          customFilenameFunction: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "自定义文件名函数" } },
          history: {
            title: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "下载历史" } },
            downloadedNumberTip: { t: 0, b: { t: 2, i: [{ t: 3, v: "你在这个站点上已经用 nHentai 助手下载了 " }, { t: 4, k: "num" }, { t: 3, v: " 个本子" }] } },
            import: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "导入" } },
            export: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "导出" } },
            clear: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "清空" } },
            importTip: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "提示：导入会将导入的历史记录与现有历史记录合并，不会清空现有历史记录" } }
          }
        },
        dialog: {
          yes: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "是的" } },
          no: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "算了" } },
          action: {
            getInfo: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "获取信息" } },
            download: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "下载" } }
          },
          downloadAgainConfirm: ({ named }) => `《${named("title")}》已下载过${named("hasQueue") ? "或在队列中" : ""}，你希望再次下载吗？`,
          errorRetryConfirm: ({ linked, named }) => `${linked(`message.dialog.action.${named("action")}`)}发生错误，是否重试？`,
          errorRetryTip: ({ linked, named }) => `${linked(`message.dialog.action.${named("action")}`)}发生错误，重试中……`,
          downloadedTip: { t: 0, b: { t: 2, i: [{ t: 3, v: "《" }, { t: 4, k: "title" }, { t: 3, v: "》已经下载过或在队列中" }] } },
          getMediaUrlTemplateFailed: { t: 0, b: { t: 2, i: [{ t: 3, v: "获取图片下载地址失败，请手动设置“" }, { t: 6, k: { t: 9, v: "setting.customDownloadUrl" } }, { t: 3, v: "”，或前往 github issue 或脚本页面反馈并附带当前网址" }] } }
        },
        button: {
          download: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "下载" } },
          downloading: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "下载中" } },
          compressing: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "压缩中" } },
          ignore: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "忽略" } },
          unignore: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "不再忽略" } }
        },
        input: {
          downloadSpecifiedPages: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "下载指定页面（例：-5,7-10,12,14,18-）" } }
        },
        confirmPopup: {
          title: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "真的吗？" } },
          yes: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "真的" } },
          no: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "算了" } }
        },
        meta: {
          id: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "ID" } },
          parody: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "模仿" } },
          character: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "角色" } },
          tag: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "标签" } },
          artist: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "作者" } },
          group: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "团体" } },
          language: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "语言" } },
          category: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "分类" } },
          page: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "页数" } },
          upload: { t: 0, b: { t: 2, i: [{ t: 3 }], s: "上传时间" } }
        }
      };
      registerMessageResolver(resolveValue);
      const i18n = createI18n({
        legacy: !1,
        locale: settings.language,
        fallbackLocale: "en",
        messages: { en: resource$1, zh: resource }
      }), { t: t$3 } = i18n.global, notyConfirmOption = {
        type: "error",
        layout: "bottomRight",
        theme: "nest",
        timeout: !1,
        closeWith: []
      }, downloadAgainConfirm = async (title, hasQueue = !1) => hasQueue && settings.autoCancelDownloadedManga ? (downloadedTip(title), !1) : new Promise((resolve) => {
        const n = new Noty({
          ...notyConfirmOption,
          text: t$3("dialog.downloadAgainConfirm", { title, hasQueue }),
          buttons: [
            Noty.button(t$3("dialog.yes"), "btn btn-noty-blue btn-noty", () => {
              n.close(), resolve(!0);
            }),
            Noty.button(t$3("dialog.no"), "btn btn-noty-green btn-noty", () => {
              n.close(), resolve(!1);
            })
          ]
        });
        n.show();
      }), errorRetryConfirm = (action, noCb, yesCb) => {
        if (settings.autoRetryWhenErrorOccurs) {
          errorRetryTip(action), yesCb == null || yesCb();
          return;
        }
        const n = new Noty({
          ...notyConfirmOption,
          text: t$3("dialog.errorRetryConfirm", { action }),
          buttons: [
            Noty.button(t$3("dialog.no"), "btn btn-noty-blue btn-noty", () => {
              n.close(), noCb == null || noCb();
            }),
            Noty.button(t$3("dialog.yes"), "btn btn-noty-green btn-noty", () => {
              n.close(), yesCb == null || yesCb();
            })
          ]
        });
        n.show();
      }, downloadedTip = (title) => {
        new Noty({
          type: "info",
          layout: "bottomRight",
          theme: "nest",
          closeWith: [],
          timeout: 4e3,
          text: t$3("dialog.downloadedTip", { title })
        }).show();
      }, errorRetryTip = (action) => {
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
      var hasRequiredStreamSaver;
      function requireStreamSaver() {
        return hasRequiredStreamSaver || (hasRequiredStreamSaver = 1, function(module2) {
          ((name, definition) => {
            module2.exports = definition();
          })("streamSaver", () => {
            const global2 = typeof window == "object" ? window : this;
            global2.HTMLElement || console.warn("streamsaver is meant to run on browsers main thread");
            let mitmTransporter = null, supportsTransferable = !1;
            const test = (fn) => {
              try {
                fn();
              } catch {
              }
            }, ponyfill = global2.WebStreamsPolyfill || {}, isSecureContext = global2.isSecureContext;
            let useBlobFallback = /constructor/i.test(global2.HTMLElement) || !!global2.safari || !!global2.WebKitPoint;
            const downloadStrategy = isSecureContext || "MozAppearance" in document.documentElement.style ? "iframe" : "navigate", streamSaver = {
              createWriteStream,
              WritableStream: global2.WritableStream || ponyfill.WritableStream,
              supported: !0,
              version: { full: "2.0.5", major: 2, minor: 0, dot: 5 },
              mitm: "https://jimmywarting.github.io/StreamSaver.js/mitm.html?version=2.0.0"
            };
            function makeIframe(src) {
              if (!src) throw new Error("meh");
              const iframe = document.createElement("iframe");
              return iframe.hidden = !0, iframe.src = src, iframe.loaded = !1, iframe.name = "iframe", iframe.isIframe = !0, iframe.postMessage = (...args) => iframe.contentWindow.postMessage(...args), iframe.addEventListener("load", () => {
                iframe.loaded = !0;
              }, { once: !0 }), document.body.appendChild(iframe), iframe;
            }
            function makePopup(src) {
              const options = "width=200,height=100", delegate = document.createDocumentFragment(), popup = {
                frame: global2.open(src, "popup", options),
                loaded: !1,
                isIframe: !1,
                isPopup: !0,
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
              }, onReady = (evt) => {
                evt.source === popup.frame && (popup.loaded = !0, global2.removeEventListener("message", onReady), popup.dispatchEvent(new Event("load")));
              };
              return global2.addEventListener("message", onReady), popup;
            }
            try {
              new Response(new ReadableStream()), isSecureContext && !("serviceWorker" in navigator) && (useBlobFallback = !0);
            } catch {
              useBlobFallback = !0;
            }
            test(() => {
              const { readable } = new TransformStream(), mc = new MessageChannel();
              mc.port1.postMessage(readable, [readable]), mc.port1.close(), mc.port2.close(), supportsTransferable = !0, Object.defineProperty(streamSaver, "TransformStream", {
                configurable: !1,
                writable: !1,
                value: TransformStream
              });
            });
            function loadTransporter() {
              mitmTransporter || (mitmTransporter = isSecureContext ? makeIframe(streamSaver.mitm) : makePopup(streamSaver.mitm));
            }
            function createWriteStream(filename, options, size) {
              let opts = {
                size: null,
                pathname: null,
                writableStrategy: void 0,
                readableStrategy: void 0
              }, bytesWritten = 0, downloadUrl = null, channel = null, ts = null;
              if (Number.isFinite(options) ? ([size, options] = [options, size], console.warn("[StreamSaver] Deprecated pass an object as 2nd argument when creating a write stream"), opts.size = size, opts.writableStrategy = options) : options && options.highWaterMark ? (console.warn("[StreamSaver] Deprecated pass an object as 2nd argument when creating a write stream"), opts.size = size, opts.writableStrategy = options) : opts = options || {}, !useBlobFallback) {
                loadTransporter(), channel = new MessageChannel(), filename = encodeURIComponent(filename.replace(/\//g, ":")).replace(/['()]/g, escape).replace(/\*/g, "%2A");
                const response = {
                  transferringReadable: supportsTransferable,
                  pathname: opts.pathname || Math.random().toString().slice(-6) + "/" + filename,
                  headers: {
                    "Content-Type": "application/octet-stream; charset=utf-8",
                    "Content-Disposition": "attachment; filename*=UTF-8''" + filename
                  }
                };
                opts.size && (response.headers["Content-Length"] = opts.size);
                const args = [response, "*", [channel.port2]];
                if (supportsTransferable) {
                  const transformer = downloadStrategy === "iframe" ? void 0 : {
                    // This transformer & flush method is only used by insecure context.
                    transform(chunk, controller) {
                      if (!(chunk instanceof Uint8Array))
                        throw new TypeError("Can only write Uint8Arrays");
                      bytesWritten += chunk.length, controller.enqueue(chunk), downloadUrl && (location.href = downloadUrl, downloadUrl = null);
                    },
                    flush() {
                      downloadUrl && (location.href = downloadUrl);
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
                  evt.data.download ? downloadStrategy === "navigate" ? (mitmTransporter.remove(), mitmTransporter = null, bytesWritten ? location.href = evt.data.download : downloadUrl = evt.data.download) : (mitmTransporter.isPopup && (mitmTransporter.remove(), mitmTransporter = null, downloadStrategy === "iframe" && makeIframe(streamSaver.mitm)), makeIframe(evt.data.download)) : evt.data.abort && (chunks = [], channel.port1.postMessage("abort"), channel.port1.onmessage = null, channel.port1.close(), channel.port2.close(), channel = null);
                }, mitmTransporter.loaded ? mitmTransporter.postMessage(...args) : mitmTransporter.addEventListener("load", () => {
                  mitmTransporter.postMessage(...args);
                }, { once: !0 });
              }
              let chunks = [];
              return !useBlobFallback && ts && ts.writable || new streamSaver.WritableStream({
                write(chunk) {
                  if (!(chunk instanceof Uint8Array))
                    throw new TypeError("Can only write Uint8Arrays");
                  if (useBlobFallback) {
                    chunks.push(chunk);
                    return;
                  }
                  channel.port1.postMessage(chunk), bytesWritten += chunk.length, downloadUrl && (location.href = downloadUrl, downloadUrl = null);
                },
                close() {
                  if (useBlobFallback) {
                    const blob2 = new Blob(chunks, { type: "application/octet-stream; charset=utf-8" }), link = document.createElement("a");
                    link.href = URL.createObjectURL(blob2), link.download = filename, link.click();
                  } else
                    channel.port1.postMessage("end");
                },
                abort() {
                  chunks = [], channel.port1.postMessage("abort"), channel.port1.onmessage = null, channel.port1.close(), channel.port2.close(), channel = null;
                }
              }, opts.writableStrategy);
            }
            return streamSaver;
          });
        }(StreamSaver)), StreamSaver.exports;
      }
      var StreamSaverExports = requireStreamSaver();
      class MultiThread {
        constructor(tasks, taskFunc, params) {
          __publicField(this, "threads", []);
          __publicField(this, "taskIndex", 0);
          __publicField(this, "started", !1);
          __publicField(this, "aborted", !1);
          this.tasks = tasks, this.taskFunc = taskFunc, this.params = params;
        }
        startThread(threadId) {
          let abortFunc;
          const threadPromise = (async () => {
            for (; !this.aborted; ) {
              const i = this.taskIndex++;
              if (i >= this.tasks.length) break;
              const { abort, promise } = await this.taskFunc(this.tasks[i], threadId, this.params);
              abortFunc = abort, await promise;
            }
          })();
          return {
            abort: () => abortFunc == null ? void 0 : abortFunc(),
            promise: threadPromise
          };
        }
        start() {
          if (this.started) throw new Error("Multi-thread started.");
          this.started = !0;
          for (let threadId = 0; threadId < settings.threadNum; threadId++)
            this.threads.push(this.startThread(threadId));
          return {
            abort: () => {
              this.aborted = !0, this.threads.forEach(({ abort }) => abort());
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
      const isAbortError = (e) => e instanceof RequestAbortError, requestArrayBufferGm = (params) => {
        const { url: urlGetter, retry = 3, on404 } = params;
        let abortFunc;
        const dataPromise = new Promise((resolve, reject) => {
          try {
            const url = typeof urlGetter == "function" ? urlGetter() : urlGetter, req = _GM_xmlhttpRequest({
              method: "GET",
              url,
              responseType: "arraybuffer",
              onerror: (e) => {
                retry === 0 ? (logger.error("Network error", url, e), reject(e)) : (logger.warn("Network error, retry", url, e), setTimeout(() => {
                  const { abort, dataPromise: dataPromise2 } = requestArrayBufferGm({ ...params, retry: retry - 1 });
                  abortFunc = abort, resolve(dataPromise2);
                }, 1e3));
              },
              onload: (r) => {
                const { status, response } = r;
                if (status === 200) resolve(response);
                else if (retry === 0) reject(r);
                else {
                  const additionRetry = status === 404 ? on404 == null ? void 0 : on404(r.finalUrl) : !1;
                  logger.warn("Request error, retry", status, url, r), setTimeout(() => {
                    const { abort, dataPromise: dataPromise2 } = requestArrayBufferGm({
                      ...params,
                      retry: retry - (additionRetry ? 0 : 1)
                    });
                    abortFunc = abort, resolve(dataPromise2);
                  }, 1e3);
                }
              }
            });
            abortFunc = () => {
              req.abort(), logger.log("Request abort", url), reject(new RequestAbortError(url));
            };
          } catch (error) {
            reject(error);
          }
        });
        return {
          abort: () => abortFunc == null ? void 0 : abortFunc(),
          dataPromise
        };
      }, fetchText = (url) => fetch(url).then((r) => r.text()), fetchJSON = (url) => fetch(url).then((r) => r.json());
      class Counter {
        constructor(keys2) {
          __publicField(this, "key");
          __publicField(this, "countMap");
          __publicField(this, "countKeys");
          __publicField(this, "blackList", /* @__PURE__ */ new Set());
          if (!keys2.length) throw new Error("Counter no key");
          this.countKeys = [...keys2], this.reset();
        }
        get availableKeys() {
          return without(this.countKeys, ...this.blackList);
        }
        add(key) {
          this.countMap[key]++;
        }
        del(key) {
          this.countMap[key]--;
        }
        ban(key) {
          return this.blackList.add(key), this.availableKeys.length > 0;
        }
        getMin(key) {
          return this.updateKey(key), minBy(this.availableKeys, (key2) => this.countMap[key2]);
        }
        getRandom(key) {
          return this.updateKey(key), sample(this.availableKeys);
        }
        updateKey(key) {
          this.key !== key && (this.key = key, this.reset());
        }
        reset() {
          this.countMap = Object.fromEntries(this.countKeys.map((key) => [key, 0])), this.blackList.clear();
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
              delKey && super.delete(delKey);
            }
            this.order.push(key);
          }
          return super.set(key, value);
        }
        delete(key) {
          const has = super.delete(key);
          return has && this.order.splice(
            this.order.findIndex((val) => val === key),
            1
          ), has;
        }
        clear() {
          super.clear(), this.order = [];
        }
      }
      var NHentaiImgExt = /* @__PURE__ */ ((NHentaiImgExt2) => (NHentaiImgExt2.j = "jpg", NHentaiImgExt2.p = "png", NHentaiImgExt2.g = "gif", NHentaiImgExt2.w = "webp", NHentaiImgExt2))(NHentaiImgExt || {});
      const nHentaiImgExtReversed = invert(NHentaiImgExt), getTypeFromExt = (ext) => nHentaiImgExtReversed[ext.toLowerCase()], nHentaiDownloadHostCounter = new Counter(nHentaiDownloadHosts), getNHentaiDownloadHost = (mid) => {
        switch (settings.nHentaiDownloadHost) {
          case NHentaiDownloadHostSpecial.RANDOM:
            return nHentaiDownloadHostCounter.getRandom(mid);
          case NHentaiDownloadHostSpecial.BALANCE:
            return nHentaiDownloadHostCounter.getMin(mid);
          default:
            return settings.nHentaiDownloadHost;
        }
      }, getMediaDownloadUrl = (mid, filename) => `https://${getNHentaiDownloadHost(mid)}/galleries/${mid}/${filename}`, getMediaDownloadUrlByWebpage = async (gid2, mid, filename) => (await getCompliedMediaUrlTemplate(gid2))({ mid, filename }), getGalleryFromApi = (gid2) => {
        const url = `https://nhentai.net/api/gallery/${gid2}`;
        return fetchJSON(url);
      }, fixGalleryObj = (gallery2, gid2) => (gid2 && (gallery2.id = Number(gid2)), Array.isArray(gallery2.images.pages) || (gallery2.images.pages = Object.values(gallery2.images.pages)), gallery2), getGalleryFromWebpage = async (gid) => {
        var _a;
        let doc = document;
        if (!IS_PAGE_MANGA_DETAIL) {
          const html = await fetchText(`/g/${gid}`);
          doc = new DOMParser().parseFromString(html, "text/html");
        }
        const match = (_a = /gallery(\(\{[\s\S]+\}\));/.exec(doc.body.innerHTML)) == null ? void 0 : _a[1];
        if (match)
          try {
            const gallery = eval(match);
            return logger.log("get gallery by script tag success"), fixGalleryObj(gallery, gid);
          } catch {
            logger.warn("get gallery by script tag failed");
          }
        const $doc = $(doc.body), english = $doc.find(selector.englishTitle).text(), japanese = $doc.find(selector.japaneseTitle).text(), pages = [];
        let mediaId = "";
        if ($doc.find(selector.thumbnailContainerImage).each((i, img) => {
          const src = img.dataset.src ?? img.src, width = img.getAttribute("width"), height = img.getAttribute("height"), match2 = /\/([0-9a-z]+)\/(\d+)t?\.([^/]+)$/i.exec(src);
          if (!match2) return;
          const [, mid, index, ext] = match2;
          mediaId || (mediaId = mid);
          const t2 = getTypeFromExt(ext);
          t2 && (pages[Number(index) - 1] = {
            t: t2,
            w: width ? Number(width) : void 0,
            h: height ? Number(height) : void 0
          });
        }), !english && !japanese || !mediaId || !pages.length)
          throw new Error("Get gallery info error.");
        const getTags = (type, elContains) => {
          const $tags = $doc.find(selector.tag(elContains));
          return filter(
            Array.from($tags).map((el) => {
              var _a2, _b;
              if (!(el instanceof HTMLElement)) return;
              const name = (_a2 = el.querySelector(selector.tagName)) == null ? void 0 : _a2.innerText.trim(), count = (_b = el.querySelector(selector.tagCount)) == null ? void 0 : _b.innerText.trim();
              return name ? {
                type,
                name,
                url: el.getAttribute("href") || void 0,
                count: count ? Number(count) : void 0
              } : void 0;
            })
          );
        }, tags = [
          ...getTags("parody", "Parodies"),
          ...getTags("character", "Characters"),
          ...getTags("tag", "Tags"),
          ...getTags("artist", "Artists"),
          ...getTags("group", "Groups"),
          ...getTags("language", "Languages"),
          ...getTags("category", "Categories")
        ], pageNum = Number($doc.find(selector.pagesTag).text() || 0);
        if (pageNum > 0 && pageNum !== pages.length) {
          const defaultPage = { t: "j" };
          for (let i = pages.length; i < pageNum; i++)
            pages.push(defaultPage);
        }
        const uploadDateStr = $doc.find(selector.uploadDateTag).attr("datetime"), uploadDate = uploadDateStr ? new Date(uploadDateStr) : void 0;
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
      }, getCFNameArtists = (tags2) => {
        const artists = map(
          tags2.filter(({ name, type }) => type === "artist" && name),
          "name"
        );
        if (!artists.length) return "none";
        const maxNum = settings.filenameMaxArtistsNumber;
        return maxNum && artists.length > maxNum ? "various" : artists.join(settings.filenameArtistsSeparator);
      }, galleryCache = new OrderCache(100), getGallery = async (gid2) => {
        gid2 = String(gid2);
        const cached = galleryCache.get(gid2);
        if (cached) return cached;
        const gallery2 = IS_NHENTAI ? await getGalleryFromApi(gid2) : await getGalleryFromWebpage(gid2);
        return galleryCache.set(gid2, gallery2), gallery2;
      }, getGalleryInfo = async (gid2) => {
        const gallery2 = await (async () => {
          var _a;
          if (gid2) return getGallery(gid2);
          const gidFromUrl = (_a = /^\/g\/(\d+)/.exec(location.pathname)) == null ? void 0 : _a[1], localGallery = _unsafeWindow._gallery ?? _unsafeWindow.gallery;
          if (localGallery) return fixGalleryObj(localGallery, gidFromUrl);
          if (gidFromUrl) return getGallery(gidFromUrl);
          throw new Error("Cannot get gallery info.");
        })(), {
          id,
          media_id,
          title,
          images: { pages: pages2 },
          num_pages,
          tags: tags2,
          upload_date
        } = gallery2, { english: english2, japanese: japanese2, pretty } = title, infoPages = pages2.map(({ t: t2, w, h: h2 }, i) => ({ i: i + 1, t: NHentaiImgExt[t2], w, h: h2 })), info = {
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
        return logger.log("info", info), info;
      }, fetchMediaUrlTemplate = async (gid2) => {
        var _a, _b, _c;
        const onlineViewUrl = ((_b = (_a = document.querySelector(selector.galleryHref)) == null ? void 0 : _a.getAttribute("href")) == null ? void 0 : _b.replace(/\/+$/, "").replace(/\d+$/, gid2).concat("/1")) ?? ((_c = document.querySelector(selector.thumbnailHref)) == null ? void 0 : _c.getAttribute("href"));
        if (!onlineViewUrl)
          throw new Error("get media url failed: cannot find a gallery");
        logger.log(`fetching media url template by ${onlineViewUrl}`);
        const onlineViewHtml = await fetchText(onlineViewUrl), $img = loadHTML(onlineViewHtml).find(selector.mediaImage), imgSrc = $img.attr("data-src") || $img.attr("src");
        if (!imgSrc)
          throw new Error("get media url failed: cannot find an image src");
        const template2 = imgSrc.replace(/\/[0-9a-z]+\/\d+\.[^/]+$/i, "/{{mid}}/{{filename}}");
        return MEDIA_URL_TEMPLATE_MAY_CHANGE || _GM_setValue(MEDIA_URL_TEMPLATE_KEY, template2), template2;
      }, fetchThumbMediaUrlTemplate = async (gid2) => {
        var _a, _b;
        const detailUrl = (_b = (_a = document.querySelector(selector.galleryHref)) == null ? void 0 : _a.getAttribute("href")) == null ? void 0 : _b.replace(/\d+(\/)?$/, `${gid2}$1`);
        if (!detailUrl)
          throw new Error("get detail url failed: cannot find a gallery");
        logger.log(`fetching thumb media url template by ${detailUrl}`);
        const detailHtml = await fetchText(detailUrl), $img = loadHTML(detailHtml).find(selector.thumbnailContainerImage), imgSrc = $img.attr("data-src") || $img.attr("src");
        if (!imgSrc)
          throw new Error("get thumb media url failed: cannot find an image src");
        const template2 = imgSrc.replace(/\/[0-9a-z]+\/\d+t\.[^/]+$/i, "/{{mid}}/{{filename}}");
        return _GM_setValue(THUMB_MEDIA_URL_TEMPLATE_KEY, template2), template2;
      }, mediaUrlTemplateGidCache = {}, getMediaUrlTemplate = async (getter, cacheKey, gid2) => {
        if (MEDIA_URL_TEMPLATE_MAY_CHANGE && (mediaUrlTemplateGidCache[cacheKey] || (mediaUrlTemplateGidCache[cacheKey] = /* @__PURE__ */ new Map()), mediaUrlTemplateGidCache[cacheKey].has(gid2)))
          return mediaUrlTemplateGidCache[cacheKey].get(gid2);
        try {
          const promise = getter(gid2);
          MEDIA_URL_TEMPLATE_MAY_CHANGE && !mediaUrlTemplateGidCache[cacheKey].has(gid2) && mediaUrlTemplateGidCache[cacheKey].set(gid2, promise);
          const template2 = await promise;
          return logger.log(`use media url template: ${template2}`), template2;
        } catch (error) {
          if (logger.error(error), MEDIA_URL_TEMPLATE_MAY_CHANGE)
            mediaUrlTemplateGidCache[cacheKey].delete(gid2);
          else {
            const cachedTemplate = _GM_getValue(cacheKey);
            if (cachedTemplate)
              return logger.warn(`try to use cached media url template: ${cachedTemplate}`), cachedTemplate;
          }
          throw error;
        }
      }, getCompliedMediaUrlTemplate = (MEDIA_URL_TEMPLATE_MAY_CHANGE ? identity : once)(
        async (gid2) => compileTemplate(await getMediaUrlTemplate(fetchMediaUrlTemplate, MEDIA_URL_TEMPLATE_KEY, gid2))
      ), getCompliedThumbMediaUrlTemplate = (MEDIA_URL_TEMPLATE_MAY_CHANGE ? identity : once)(
        async (gid2) => compileTemplate(
          IS_NHENTAI ? "https://t3.nhentai.net/galleries/{{mid}}/{{filename}}" : await getMediaUrlTemplate(fetchThumbMediaUrlTemplate, THUMB_MEDIA_URL_TEMPLATE_KEY, gid2)
        )
      ), applyTitleReplacement = (title) => validTitleReplacement.value.length ? validTitleReplacement.value.reduce((pre, { from, to, regexp }) => {
        try {
          return pre.replaceAll(regexp ? new RegExp(from, "g") : from, to);
        } catch {
          return pre;
        }
      }, title) : title;
      let textareaEl;
      const encodeHtml = (text) => {
        textareaEl || (textareaEl = document.createElement("textarea")), textareaEl.innerText = text;
        const encodedText = textareaEl.innerHTML;
        return textareaEl.innerHTML = "", encodedText;
      }, encodeXml = (text) => encodeHtml(text).replace(/&nbsp;/g, " "), langMap = {
        chinese: "zh",
        english: "en",
        japanese: "ja"
      };
      class ComicInfoXmlBuilder {
        constructor(info) {
          __publicField(this, "serializer", new XMLSerializer());
          __publicField(this, "doc", document.implementation.createDocument(null, "ComicInfo"));
          if (this.setRootNS(), this.appendElement(
            "Title",
            settings.metaFileTitleLanguage in info.title ? info.title[settings.metaFileTitleLanguage] : info.title.english
          ), this.appendElement(
            "Notes",
            `Created by nHentai Helper (Tsuk1ko/nhentai-helper) on ${(/* @__PURE__ */ new Date()).toISOString()}`
          ), info.uploadDate) {
            const date = new Date(info.uploadDate * 1e3);
            this.appendElement("Year", date.getUTCFullYear()), this.appendElement("Month", date.getUTCMonth() + 1), this.appendElement("Day", date.getUTCDate());
          }
          const getTags2 = (type) => info.tags.filter((t2) => t2.type === type), artistTags = getTags2("artist");
          artistTags.length && this.appendElement("Writer", map(artistTags, "name").join(", "));
          const tags2 = getTags2("tag");
          tags2.length && this.appendElement("Tags", map(tags2, "name").join(", ")), this.appendElement("Web", `${location.origin}/g/${info.gid}`), this.appendElement("PageCount", info.pages.length);
          const languageTag = info.tags.find(({ type, name }) => type === "language" && name in langMap);
          languageTag && this.appendElement("LanguageISO", langMap[languageTag.name]), this.appendElement("Format", /\[digital\]/i.test(info.title.english) ? "Digital" : "TBP"), this.appendElement("Manga", "Yes");
          const characterTags = getTags2("character");
          characterTags.length && this.appendElement("Characters", map(characterTags, "name").join(", "));
          const pagesEl = this.createElement("Pages"), pageEls = info.pages.map(
            ({ i, w, h: h2 }) => this.createElement("Page", void 0, { Image: i, ImageWidth: w, ImageHeight: h2 })
          );
          pagesEl.append(...pageEls), this.root.append(pagesEl);
        }
        build() {
          return `<?xml version="1.0" encoding="utf-8"?>
${this.serializer.serializeToString(this.doc)}`;
        }
        get root() {
          return this.doc.documentElement;
        }
        setRootNS() {
          this.root.setAttribute("xmlns:xsd", "http://www.w3.org/2001/XMLSchema"), this.root.setAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
        }
        createElement(name, value, attrs) {
          const el = this.doc.createElement(name);
          return isNil(value) || (el.innerHTML = encodeXml(String(value))), attrs && forEach(attrs, (v, k) => {
            isNil(v) || el.setAttribute(k, String(v));
          }), el;
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
          let language, translated = !1;
          return info.tags.filter(({ type }) => type === "language").forEach(({ name }) => {
            if (name === "translated") {
              translated = !0;
              return;
            }
            language = name;
          }), { language, translated };
        }
      }
      const metaBuilderMap = {
        ComicInfoXml: { name: "ComicInfo.xml", Builder: ComicInfoXmlBuilder },
        EzeInfoJson: { name: "info.json", Builder: EzeInfoJsonBuilder }
      }, generateMetaFiles = (info) => {
        if (!settings.addMetaFile.length) return [];
        const files = [];
        for (const key of settings.addMetaFile)
          if (key in metaBuilderMap) {
            const { name, Builder } = metaBuilderMap[key];
            files.push({
              name,
              data: new Builder(info).build()
            });
          }
        return files;
      }, jsContent = '(function(){"use strict";const M=Symbol("Comlink.proxy"),N=Symbol("Comlink.endpoint"),H=Symbol("Comlink.releaseProxy"),x=Symbol("Comlink.finalizer"),d=Symbol("Comlink.thrown"),S=e=>typeof e=="object"&&e!==null||typeof e=="function",I={canHandle:e=>S(e)&&e[M],serialize(e){const{port1:t,port2:r}=new MessageChannel;return P(e,t),[r,[r]]},deserialize(e){return e.start(),_(e)}},L={canHandle:e=>S(e)&&d in e,serialize({value:e}){let t;return e instanceof Error?t={isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:t={isError:!1,value:e},[t,[]]},deserialize(e){throw e.isError?Object.assign(new Error(e.value.message),e.value):e.value}},T=new Map([["proxy",I],["throw",L]]);function V(e,t){for(const r of e)if(t===r||r==="*"||r instanceof RegExp&&r.test(t))return!0;return!1}function P(e,t=globalThis,r=["*"]){t.addEventListener("message",function c(n){if(!n||!n.data)return;if(!V(r,n.origin)){console.warn(`Invalid origin \'${n.origin}\' for comlink proxy`);return}const{id:s,type:y,path:l}=Object.assign({path:[]},n.data),u=(n.data.argumentList||[]).map(g);let a;try{const o=l.slice(0,-1).reduce((i,w)=>i[w],e),f=l.reduce((i,w)=>i[w],e);switch(y){case"GET":a=f;break;case"SET":o[l.slice(-1)[0]]=g(n.data.value),a=!0;break;case"APPLY":a=f.apply(o,u);break;case"CONSTRUCT":{const i=new f(...u);a=B(i)}break;case"ENDPOINT":{const{port1:i,port2:w}=new MessageChannel;P(e,w),a=z(i,[i])}break;case"RELEASE":a=void 0;break;default:return}}catch(o){a={value:o,[d]:0}}Promise.resolve(a).catch(o=>({value:o,[d]:0})).then(o=>{const[f,i]=p(o);t.postMessage(Object.assign(Object.assign({},f),{id:s}),i),y==="RELEASE"&&(t.removeEventListener("message",c),C(t),x in e&&typeof e[x]=="function"&&e[x]())}).catch(o=>{const[f,i]=p({value:new TypeError("Unserializable return value"),[d]:0});t.postMessage(Object.assign(Object.assign({},f),{id:s}),i)})}),t.start&&t.start()}function W(e){return e.constructor.name==="MessagePort"}function C(e){W(e)&&e.close()}function _(e,t){const r=new Map;return e.addEventListener("message",function(c){const{data:n}=c;if(!n||!n.id)return;const s=r.get(n.id);if(s)try{s(n)}finally{r.delete(n.id)}}),k(e,r,[],t)}function b(e){if(e)throw new Error("Proxy has been released and is not useable")}function A(e){return m(e,new Map,{type:"RELEASE"}).then(()=>{C(e)})}const h=new WeakMap,E="FinalizationRegistry"in globalThis&&new FinalizationRegistry(e=>{const t=(h.get(e)||0)-1;h.set(e,t),t===0&&A(e)});function F(e,t){const r=(h.get(t)||0)+1;h.set(t,r),E&&E.register(e,t,e)}function j(e){E&&E.unregister(e)}function k(e,t,r=[],c=function(){}){let n=!1;const s=new Proxy(c,{get(y,l){if(b(n),l===H)return()=>{j(s),A(e),t.clear(),n=!0};if(l==="then"){if(r.length===0)return{then:()=>s};const u=m(e,t,{type:"GET",path:r.map(a=>a.toString())}).then(g);return u.then.bind(u)}return k(e,t,[...r,l])},set(y,l,u){b(n);const[a,o]=p(u);return m(e,t,{type:"SET",path:[...r,l].map(f=>f.toString()),value:a},o).then(g)},apply(y,l,u){b(n);const a=r[r.length-1];if(a===N)return m(e,t,{type:"ENDPOINT"}).then(g);if(a==="bind")return k(e,t,r.slice(0,-1));const[o,f]=O(u);return m(e,t,{type:"APPLY",path:r.map(i=>i.toString()),argumentList:o},f).then(g)},construct(y,l){b(n);const[u,a]=O(l);return m(e,t,{type:"CONSTRUCT",path:r.map(o=>o.toString()),argumentList:u},a).then(g)}});return F(s,e),s}function v(e){return Array.prototype.concat.apply([],e)}function O(e){const t=e.map(p);return[t.map(r=>r[0]),v(t.map(r=>r[1]))]}const R=new WeakMap;function z(e,t){return R.set(e,t),e}function B(e){return Object.assign(e,{[M]:!0})}function p(e){for(const[t,r]of T)if(r.canHandle(e)){const[c,n]=r.serialize(e);return[{type:"HANDLER",name:t,value:c},n]}return[{type:"RAW",value:e},R.get(e)||[]]}function g(e){switch(e.type){case"HANDLER":return T.get(e.name).deserialize(e.value);case"RAW":return e.value}}function m(e,t,r,c){return new Promise(n=>{const s=D();t.set(s,n),e.start&&e.start(),e.postMessage(Object.assign({id:s},r),c)})}function D(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}P({convertWebpTo:async(e,t,r)=>{const c=await createImageBitmap(new Blob([e],{type:"image/webp"})),n=new OffscreenCanvas(c.width,c.height);n.getContext("bitmaprenderer").transferFromImageBitmap(c);const s=await(await n.convertToBlob({type:t,quality:r})).arrayBuffer();return z({buffer:s,type:t},[s])}})})();\n', blob = typeof self < "u" && self.Blob && new Blob([jsContent], { type: "text/javascript;charset=utf-8" });
      function WorkerWrapper(options) {
        let objURL;
        try {
          if (objURL = blob && (self.URL || self.webkitURL).createObjectURL(blob), !objURL) throw "";
          const worker = new Worker(objURL, {
            name: options == null ? void 0 : options.name
          });
          return worker.addEventListener("error", () => {
            (self.URL || self.webkitURL).revokeObjectURL(objURL);
          }), worker;
        } catch {
          return new Worker(
            "data:text/javascript;charset=utf-8," + encodeURIComponent(jsContent),
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
      var _worker;
      class ImgConverter {
        constructor() {
          __privateAdd(this, _worker);
        }
        async convertWebpTo(...args) {
          const worker = await this.getWorker(), { buffer, type } = await worker.convertWebpTo(...args);
          return {
            buffer,
            ext: mimeToExt[type] || "unknown"
          };
        }
        async getWorker() {
          return __privateGet(this, _worker) || __privateSet(this, _worker, this.createWorker()), __privateGet(this, _worker);
        }
        async createWorker() {
          return wrap(new WorkerWrapper());
        }
      }
      _worker = new WeakMap();
      const imgConverter = new ImgConverter(), downloadGalleryByInfo = async (info, { progressDisplayController, rangeCheckers } = {}) => {
        info.done = 0;
        let { mid, pages: pages2, cfName } = info.gallery;
        if (customFilenameFunction.value) {
          const result = customFilenameFunction.value(cfName, info.gallery.gallery);
          if (typeof result != "string" || !result.trim())
            throw new Error(`Custom filename function illegal result: ${result}`);
          cfName = removeIllegalFilenameChars(result);
        }
        rangeCheckers != null && rangeCheckers.length && (pages2 = pages2.filter(({ i }) => rangeCheckers.some((check) => check(i))));
        let aborted = !1;
        info.cancel = () => {
          aborted = !0, progressDisplayController == null || progressDisplayController.reset();
        }, progressDisplayController == null || progressDisplayController.bindInfo(info), progressDisplayController == null || progressDisplayController.updateProgress();
        const zip = new JSZip(), metaFiles = generateMetaFiles(info.gallery);
        metaFiles.length && metaFiles.forEach(({ name, data }) => {
          zip.file(name, data);
        });
        const { convertWebpTo, convertWebpQuality } = settings, downloadTask = async (page, threadID, { filenameLength, customDownloadUrl }) => {
          if (info.error) return { abort: () => {
          }, promise: Promise.resolve() };
          const useCounter = IS_NHENTAI && (settings.nHentaiDownloadHost === NHentaiDownloadHostSpecial.BALANCE || settings.nHentaiDownloadHost === NHentaiDownloadHostSpecial.RANDOM), usedCounterKeys = [];
          let urlGetterError;
          const urlGetter = await (async () => {
            if (customDownloadUrl)
              return compileTemplate(customDownloadUrl)({ mid, index: page.i, ext: page.t });
            const filename = `${page.i}.${page.t}`;
            return IS_NHENTAI && settings.nHentaiDownloadHost !== NHentaiDownloadHostSpecial.AUTO ? useCounter ? () => {
              const url = getMediaDownloadUrl(mid, filename);
              if (logger.log(`[${threadID}] ${url}`), settings.nHentaiDownloadHost === NHentaiDownloadHostSpecial.BALANCE) {
                const counterKey = new URL(url).host;
                usedCounterKeys.push(counterKey), nHentaiDownloadHostCounter.add(counterKey);
              }
              return url;
            } : getMediaDownloadUrl(mid, filename) : getMediaDownloadUrlByWebpage(String(info.gallery.gid), mid, filename);
          })().catch((e) => {
            urlGetterError = e;
          });
          if (!urlGetter || urlGetterError)
            throw info.error = !0, urlGetterError && urlGetterError instanceof Error ? urlGetterError : new Error("No available url");
          typeof urlGetter != "function" && logger.log(`[${threadID}] ${urlGetter}`);
          const { abort: abort2, dataPromise } = requestArrayBufferGm({
            url: urlGetter,
            on404: useCounter ? (url) => {
              const counterKey = new URL(url).host;
              return logger.warn(`[${threadID}] ban ${counterKey} because 404`), nHentaiDownloadHostCounter.ban(counterKey);
            } : void 0
          });
          return {
            abort: () => {
              logger.log(`[${threadID}] abort`), abort2();
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
              info.done++, progressDisplayController == null || progressDisplayController.updateProgress();
            }).catch((e) => {
              if (!isAbortError(e))
                throw info.error = !0, e;
            }).finally(() => {
              usedCounterKeys.length && usedCounterKeys.forEach((key) => {
                nHentaiDownloadHostCounter.del(key);
              });
            })
          };
        }, multiThread = new MultiThread(pages2, downloadTask, {
          filenameLength: settings.filenameLength === "auto" ? Math.ceil(Math.log10(Math.max(...pages2.map(({ i }) => Number(i))))) : settings.filenameLength,
          customDownloadUrl: settings.customDownloadUrl
        }), { abort, promise } = multiThread.start();
        if (info.cancel = () => {
          aborted = !0, abort(), progressDisplayController == null || progressDisplayController.reset();
        }, aborted || await promise, !aborted)
          return async () => {
            info.compressing = !0, progressDisplayController == null || progressDisplayController.updateProgress(), logger.log("start compressing", cfName);
            let lastZipFile = "";
            const onCompressionUpdate = ({ workerId, percent, currentFile }) => {
              lastZipFile !== currentFile && currentFile && (lastZipFile = currentFile, logger.log(`[${workerId}] compressing ${percent.toFixed(2)}%`, currentFile)), info.compressingPercent = percent.toFixed(2), progressDisplayController == null || progressDisplayController.updateProgress();
            };
            if (settings.streamDownload) {
              logger.log("stream mode on");
              const fileStream = StreamSaverExports.createWriteStream(cfName);
              await (await zip.generateStream(getCompressionOptions(), onCompressionUpdate)).pipeTo(fileStream);
            } else {
              const data = await zip.generateAsync(getCompressionOptions(), onCompressionUpdate);
              FileSaver_minExports.saveAs(new File([data], cfName, { type: "application/zip" }));
            }
            logger.log("completed", cfName), progressDisplayController == null || progressDisplayController.complete(), progressDisplayController == null || progressDisplayController.unbindInfo();
          };
      }, addDownloadGalleryTask = (gallery2, { progressDisplayController, markGalleryDownloaded } = {}) => {
        const info = createMangaDownloadInfo(gallery2, !0);
        info.cancel = () => {
          progressDisplayController == null || progressDisplayController.reset();
        }, dlQueue.push(async () => {
          const zipFunc = await downloadGalleryByInfo(info, { progressDisplayController }).catch((e) => {
            throw progressDisplayController == null || progressDisplayController.error(), errorRetryConfirm(
              ErrorAction.DOWNLOAD,
              () => {
                dlQueue.skipFromError().catch(logger.error);
              },
              () => {
                info.error = !1, dlQueue.restartFromError().catch(logger.error);
              }
            ), e;
          });
          zipFunc && (zipQueue.push(async () => {
            try {
              await zipFunc(), markAsDownloaded(gallery2.gid, gallery2.title), markGalleryDownloaded == null || markGalleryDownloaded();
            } catch (error) {
              error || logger.warn("user abort stream download"), logger.error(error), progressDisplayController == null || progressDisplayController.error();
            }
          }, info), zipQueue.start().catch(logger.error));
        }, info), dlQueue.start().catch(logger.error);
      }, defaultClassName = {
        greyButton: "btn btn-secondary"
      }, siteMap = {
        "nhentai.xxx": {
          greyButton: "mbtn grey"
        }
      }, className = { ...defaultClassName, ...siteMap[location.hostname] }, { t: t$2 } = i18n.global;
      class ProgressDisplayController {
        constructor(enableHeadTxt = !1, docTitle) {
          __publicField(this, "downloadBtn");
          __publicField(this, "btnTxt");
          __publicField(this, "info");
          this.enableHeadTxt = enableHeadTxt, this.docTitle = docTitle, this.btnTxt = /* @__PURE__ */ coreExports.h("span", { class: "download-zip-txt" }, this.defaultBtnText()), this.downloadBtn = /* @__PURE__ */ coreExports.h("button", { class: `${className.greyButton} nhentai-helper-btn download-zip-btn` }, /* @__PURE__ */ coreExports.h("i", { class: "fa fa-download" }), " ", this.btnTxt);
        }
        get compressingHeadText() {
          return this.enableHeadTxt ? `${t$2("button.compressing")} ${getDownloadExt()} ` : "";
        }
        get downloadingHeadText() {
          return this.enableHeadTxt ? `${t$2("button.downloading")} ${getDownloadExt()} ` : "";
        }
        defaultBtnText(suffix) {
          return this.enableHeadTxt ? `${t$2("button.download")} ${getDownloadExt()}${suffix ? ` ${suffix}` : ""}` : suffix ?? "";
        }
        bindInfo(info) {
          this.info = info;
        }
        unbindInfo() {
          this.info = void 0;
        }
        lockBtn(text) {
          this.downloadBtn.setAttribute("disabled", "disabled"), text && (this.btnTxt.innerText = text);
        }
        releaseBtn() {
          this.downloadBtn.removeAttribute("disabled");
        }
        complete() {
          this.setDocTitle("✓"), this.btnTxt.innerText = this.defaultBtnText("✓"), this.releaseBtn();
        }
        reset() {
          this.setDocTitle(), this.btnTxt.innerText = this.defaultBtnText(), this.releaseBtn();
        }
        error() {
          this.releaseBtn(), this.btnTxt.innerText = "Error", this.setDocTitle("×");
        }
        updateProgress() {
          if (!this.info) return;
          const { done, compressing, compressingPercent } = this.info;
          if (compressing)
            this.setDocTitle(`${compressingPercent}%`), this.btnTxt.innerText = `${this.compressingHeadText}${compressingPercent}%`;
          else {
            const total = this.info.gallery.pages.length;
            this.setDocTitle(`${done}/${total}`), this.btnTxt.innerText = `${this.downloadingHeadText}${done}/${total}`;
          }
        }
        setDocTitle(prefix) {
          this.docTitle && (document.title = prefix ? `[${prefix}] ${this.docTitle}` : this.docTitle);
        }
      }
      const { t: t$1 } = i18n.global;
      class IgnoreController {
        constructor(text = !0, status = !1) {
          __publicField(this, "ignoreBtn");
          __publicField(this, "icon");
          __publicField(this, "text");
          this.status = status, this.icon = /* @__PURE__ */ coreExports.h("i", { class: this.iconClass }), text && (this.text = /* @__PURE__ */ coreExports.h("span", null, this.btnText)), this.ignoreBtn = /* @__PURE__ */ coreExports.h("button", { class: `${className.greyButton} nhentai-helper-btn ignore-btn` }, this.icon, " ", this.text);
        }
        setStatus(status) {
          this.status = status, this.updateBtn();
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
          this.icon.className = this.iconClass, this.text && (this.text.innerText = this.btnText);
        }
      }
      const { t } = i18n.global, initDetailPage = async () => {
        const progressDisplayController = new ProgressDisplayController(!0, document.title), { downloadBtn } = progressDisplayController, pagesInput = /* @__PURE__ */ coreExports.h(
          "input",
          {
            class: "pages-input",
            placeholder: t("input.downloadSpecifiedPages"),
            onKeydown: (e) => {
              e.key === "Enter" && downloadBtn.click();
            }
          }
        );
        $(selector.infoButtons).append(downloadBtn).after(pagesInput);
        let ignoreController;
        if (settings.showIgnoreButton) {
          const gallery2 = await getGalleryInfo(), isDownloaded = await isDownloadedByGid(gallery2.gid);
          ignoreController = new IgnoreController(!0, isDownloaded);
          const { ignoreBtn } = ignoreController;
          ignoreBtn.addEventListener("click", () => {
            const ignore = ignoreController.getStatus();
            ignore ? unmarkAsDownloaded(gallery2.gid, gallery2.title) : markAsDownloaded(gallery2.gid, gallery2.title), ignoreController.setStatus(!ignore);
          }), $(selector.infoButtons).append(ignoreBtn);
        }
        downloadBtn.addEventListener("click", async () => {
          var _a;
          const gallery2 = await getGalleryInfo(), rangeCheckers = pagesInput.value.split(",").filter((range) => /^\s*(?:\d+(?:\s*-\s*)?\d*|-\d+)\s*$/.test(range)).map((range) => {
            const [start, end] = range.split("-").map((num) => parseInt(num));
            return Number.isNaN(start) ? (page) => page <= end : end === void 0 ? (page) => page === start : Number.isNaN(end) ? (page) => page >= start : (page) => start <= page && page <= end;
          });
          progressDisplayController.lockBtn();
          try {
            if ((await isDownloadedByGid(gallery2.gid) || await isDownloadedByTitle(gallery2.title)) && !await downloadAgainConfirm(gallery2.title.japanese || gallery2.title.english)) {
              progressDisplayController.reset(), markAsDownloaded(gallery2.gid, gallery2.title), ignoreController == null || ignoreController.setStatus(!0);
              return;
            }
            await ((_a = await downloadGalleryByInfo(createMangaDownloadInfo(gallery2), {
              progressDisplayController,
              rangeCheckers
            })) == null ? void 0 : _a()), markAsDownloaded(gallery2.gid, gallery2.title), ignoreController == null || ignoreController.setStatus(!0);
          } catch (error) {
            progressDisplayController.error(), logger.error(error);
          }
        }), applyAutoShowAll();
      }, applyAutoShowAll = () => {
        settings.autoShowAll && getShowAllBtn().then(($btn) => $btn.trigger("click")).catch(logger.error);
      };
      function tryOnScopeDispose(fn) {
        return vue.getCurrentScope() ? (vue.onScopeDispose(fn), !0) : !1;
      }
      function toValue(r) {
        return typeof r == "function" ? r() : vue.unref(r);
      }
      const isClient = typeof window < "u" && typeof document < "u";
      typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
      const toString = Object.prototype.toString, isObject = (val) => toString.call(val) === "[object Object]", noop = () => {
      };
      function createFilterWrapper(filter2, fn) {
        function wrapper(...args) {
          return new Promise((resolve, reject) => {
            Promise.resolve(filter2(() => fn.apply(this, args), { fn, thisArg: this, args })).then(resolve).catch(reject);
          });
        }
        return wrapper;
      }
      const bypassFilter = (invoke) => invoke();
      function pausableFilter(extendFilter = bypassFilter) {
        const isActive = vue.ref(!0);
        function pause() {
          isActive.value = !1;
        }
        function resume() {
          isActive.value = !0;
        }
        const eventFilter = (...args) => {
          isActive.value && extendFilter(...args);
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
        } = options, { eventFilter, pause, resume, isActive } = pausableFilter(filter2);
        return { stop: watchWithFilter(
          source,
          cb,
          {
            ...watchOptions,
            eventFilter
          }
        ), pause, resume, isActive };
      }
      function tryOnMounted(fn, sync = !0, target) {
        getLifeCycleTarget() ? vue.onMounted(fn, target) : sync ? fn() : vue.nextTick(fn);
      }
      const defaultWindow = isClient ? window : void 0;
      function unrefElement(elRef) {
        var _a;
        const plain = toValue(elRef);
        return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
      }
      function useEventListener(...args) {
        let target, events2, listeners, options;
        if (typeof args[0] == "string" || Array.isArray(args[0]) ? ([events2, listeners, options] = args, target = defaultWindow) : [target, events2, listeners, options] = args, !target)
          return noop;
        Array.isArray(events2) || (events2 = [events2]), Array.isArray(listeners) || (listeners = [listeners]);
        const cleanups = [], cleanup = () => {
          cleanups.forEach((fn) => fn()), cleanups.length = 0;
        }, register = (el, event, listener, options2) => (el.addEventListener(event, listener, options2), () => el.removeEventListener(event, listener, options2)), stopWatch = vue.watch(
          () => [unrefElement(target), toValue(options)],
          ([el, options2]) => {
            if (cleanup(), !el)
              return;
            const optionsClone = isObject(options2) ? { ...options2 } : options2;
            cleanups.push(
              ...events2.flatMap((event) => listeners.map((listener) => register(el, event, listener, optionsClone)))
            );
          },
          { immediate: !0, flush: "post" }
        ), stop = () => {
          stopWatch(), cleanup();
        };
        return tryOnScopeDispose(stop), stop;
      }
      const _global = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, globalKey = "__vueuse_ssr_handlers__", handlers = /* @__PURE__ */ getHandlers();
      function getHandlers() {
        return globalKey in _global || (_global[globalKey] = _global[globalKey] || {}), _global[globalKey];
      }
      function getSSRHandler(key, fallback) {
        return handlers[key] || fallback;
      }
      function guessSerializerType(rawInit) {
        return rawInit == null ? "any" : rawInit instanceof Set ? "set" : rawInit instanceof Map ? "map" : rawInit instanceof Date ? "date" : typeof rawInit == "boolean" ? "boolean" : typeof rawInit == "string" ? "string" : typeof rawInit == "object" ? "object" : Number.isNaN(rawInit) ? "any" : "number";
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
      }, customStorageEventName = "vueuse-storage";
      function useStorage(key, defaults2, storage, options = {}) {
        var _a;
        const {
          flush = "pre",
          deep = !0,
          listenToStorageChanges = !0,
          writeDefaults = !0,
          mergeDefaults = !1,
          shallow,
          window: window2 = defaultWindow,
          eventFilter,
          onError = (e) => {
            console.error(e);
          },
          initOnMounted
        } = options, data = (shallow ? vue.shallowRef : vue.ref)(typeof defaults2 == "function" ? defaults2() : defaults2);
        if (!storage)
          try {
            storage = getSSRHandler("getDefaultStorage", () => {
              var _a2;
              return (_a2 = defaultWindow) == null ? void 0 : _a2.localStorage;
            })();
          } catch (e) {
            onError(e);
          }
        if (!storage)
          return data;
        const rawInit = toValue(defaults2), type = guessSerializerType(rawInit), serializer = (_a = options.serializer) != null ? _a : StorageSerializers[type], { pause: pauseWatch, resume: resumeWatch } = watchPausable(
          data,
          () => write(data.value),
          { flush, deep, eventFilter }
        );
        window2 && listenToStorageChanges && tryOnMounted(() => {
          storage instanceof Storage ? useEventListener(window2, "storage", update) : useEventListener(window2, customStorageEventName, updateFromCustomEvent), initOnMounted && update();
        }), initOnMounted || update();
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
            if (v == null)
              dispatchWriteEvent(oldValue, null), storage.removeItem(key);
            else {
              const serialized = serializer.write(v);
              oldValue !== serialized && (storage.setItem(key, serialized), dispatchWriteEvent(oldValue, serialized));
            }
          } catch (e) {
            onError(e);
          }
        }
        function read(event) {
          const rawValue = event ? event.newValue : storage.getItem(key);
          if (rawValue == null)
            return writeDefaults && rawInit != null && storage.setItem(key, serializer.write(rawInit)), rawInit;
          if (!event && mergeDefaults) {
            const value = serializer.read(rawValue);
            return typeof mergeDefaults == "function" ? mergeDefaults(value, rawInit) : type === "object" && !Array.isArray(value) ? { ...rawInit, ...value } : value;
          } else return typeof rawValue != "string" ? rawValue : serializer.read(rawValue);
        }
        function update(event) {
          if (!(event && event.storageArea !== storage)) {
            if (event && event.key == null) {
              data.value = rawInit;
              return;
            }
            if (!(event && event.key !== key)) {
              pauseWatch();
              try {
                (event == null ? void 0 : event.newValue) !== serializer.write(data.value) && (data.value = read(event));
              } catch (e) {
                onError(e);
              } finally {
                event ? vue.nextTick(resumeWatch) : resumeWatch();
              }
            }
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
      const _hoisted_1$1 = { class: "language-filter" }, _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
        __name: "LanguageFilter",
        setup(__props, { expose: __expose }) {
          const { t: t2 } = i18n.global, languageFilter = useSessionStorage("languageFilter", [], {
            listenToStorageChanges: !1
          }), options = IS_NHENTAI_TO ? [
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
          return vue.watch(
            languageFilter,
            (val) => {
              filterLanguage(val);
            },
            { deep: !0, immediate: !0 }
          ), __expose({
            filterLanguage: ($node) => {
              filterLanguage(languageFilter.value, $node);
            }
          }), (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("li", _hoisted_1$1, [
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
                (vue.openBlock(!0), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(options), ([key, val]) => (vue.openBlock(), vue.createBlock(vue.unref(elementPlus.ElOption), {
                  key,
                  label: vue.unref(t2)(`common.abbr.${key}`),
                  value: val
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(vue.toDisplayString(vue.unref(t2)(`common.${key}`)), 1)
                  ]),
                  _: 2
                }, 1032, ["label", "value"]))), 128))
              ]),
              _: 1
            }, 8, ["modelValue", "placeholder"])
          ]));
        }
      }), LanguageFilter = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-e2153767"]]), filterLanguage = (tags2, $node) => {
        const attrName = IS_NHENTAI_XXX ? "data-languages" : "data-tags", getNode = $node ? (selector2) => $node.find(selector2) : (selector2) => $(selector2);
        if (getNode(selector.gallery).removeClass("nhentai-helper-hidden"), tags2.length) {
          const notSelector = tags2.map((tag) => `:not([${attrName}~=${tag}])`).join("");
          getNode(`${selector.gallery}${notSelector}`).addClass("nhentai-helper-hidden");
        }
      }, mountLanguageFilter = () => {
        var _a;
        const menuLeft = document.querySelector(selector.menuLeft);
        if (!menuLeft) return {};
        const vnode = vue.h(LanguageFilter);
        return vue.render(vnode, menuLeft), ((_a = vnode.component) == null ? void 0 : _a.exposed) ?? {};
      }, createAppAndMount = (component, appInitFunc) => {
        const el = document.createElement("div");
        document.body.append(el);
        const app = vue.createApp(component);
        return appInitFunc == null || appInitFunc(app), app.mount(el);
      }, _hoisted_1 = { class: "info-label bold" }, _hoisted_2 = { class: "info-label bold" }, _hoisted_3 = { class: "bold" }, _hoisted_4 = { class: "info-label bold" }, _hoisted_5 = { class: "bold" }, _hoisted_6 = { class: "info-label bold" }, _hoisted_7 = { class: "scroll-container-inner" }, POPOVER_MAX_WIDTH = 720, POPOVER_THUMB_MORE_COL_WIDTH = 640, _sfc_main = /* @__PURE__ */ vue.defineComponent({
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
          ], getTagSortIndex = (type) => {
            const index = TAG_TYPES.findIndex((t22) => t22 === type);
            return index === -1 ? 999 : index;
          }, { t: t2 } = useI18n(), visible = vue.ref(!1), virtualRef = vue.ref(), popoverRef = vue.ref(), popoverPlacement = vue.ref("right"), popoverWidth = vue.ref(0), popoverTransition = vue.ref(!1), gallery2 = vue.ref(null), title = vue.computed(() => {
            var _a;
            const t22 = (_a = gallery2.value) == null ? void 0 : _a.title;
            return t22 ? t22.japanese || t22.english || t22.pretty : "";
          }), groupedTags = vue.computed(() => {
            var _a;
            const tags2 = (_a = gallery2.value) == null ? void 0 : _a.tags;
            return tags2 ? Object.entries(groupBy(tags2, "type")).sort(
              ([a], [b]) => getTagSortIndex(a) - getTagSortIndex(b)
            ) : [];
          }), galleryLink = vue.computed(() => {
            var _a;
            return `${location.origin}/g/${(_a = gallery2.value) == null ? void 0 : _a.id}/`;
          }), pageThumbs = vue.ref([]), pageThumbsColSpan = vue.computed(
            () => popoverWidth.value >= POPOVER_THUMB_MORE_COL_WIDTH ? 6 : 8
          ), pageThumbsColNum = vue.computed(
            () => popoverWidth.value >= POPOVER_THUMB_MORE_COL_WIDTH ? 4 : 3
          ), pageThumbWidth = vue.computed(
            () => (popoverWidth.value - 24 - (pageThumbsColNum.value - 1) * 8) / pageThumbsColNum.value
          ), pageThumbScrollHeight = vue.computed(() => Math.max(0, ...map(pageThumbs.value, "height")) * 1.5), limitTagLength = (tags2, maxLength) => {
            const result = tags2.slice(0, maxLength), larger = tags2.length - result.length;
            return larger > 0 && result.push({ type: "__limit__", name: "__limit__", count: larger }), result;
          }, isLimitTag = (tag) => tag.type === "__limit__";
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
          }, formatNumber = (num) => num >= 1e6 ? `${Math.floor(num / 1e6)}M` : num >= 1e3 ? `${Math.floor(num / 1e3)}K` : num, openTagUrl = (path) => {
            path && _GM_openInTab(`${location.origin}${path}`, { active: !0, setParent: !0 });
          };
          let loadingGid = "";
          const open2 = async (el, gid2) => {
            var _a, _b, _c;
            if (virtualRef.value === el) return;
            const rect = el.getBoundingClientRect(), bodyWidth = document.body.clientWidth, showRight = rect.left + rect.right <= bodyWidth;
            virtualRef.value = el, popoverPlacement.value = showRight ? "right" : "left", popoverTransition.value = !1, popoverWidth.value = Math.min(
              POPOVER_MAX_WIDTH,
              Math.round(showRight ? bodyWidth - rect.right : rect.left) - 16
            ), visible.value = !0, gallery2.value = null, setTimeout(() => {
              gallery2.value || (popoverTransition.value = !0);
            }), pageThumbs.value = [];
            try {
              loadingGid = gid2, thumbUrlTemplate || (thumbUrlTemplate = await getCompliedThumbMediaUrlTemplate(gid2));
              const loadedGallery = await getGallery(gid2);
              if (loadingGid !== gid2) return;
              gallery2.value = loadedGallery, pageThumbs.value = loadedGallery.images.pages.slice(0, 12).map(getThumbInfo), await vue.nextTick(), (_c = (_b = (_a = popoverRef.value) == null ? void 0 : _a.popperRef) == null ? void 0 : _b.popperInstanceRef) == null || _c.update();
            } catch (error) {
              logger.error(error);
            } finally {
              loadingGid === gid2 && (loadingGid = "");
            }
          }, addPageThumbLine = () => {
            const curLength = pageThumbs.value.length;
            if (curLength >= gallery2.value.images.pages.length) return;
            const curLines = Math.ceil(curLength / pageThumbsColNum.value);
            pageThumbs.value.push(
              ...gallery2.value.images.pages.slice(curLength, (curLines + 1) * pageThumbsColNum.value).map((img, i) => getThumbInfo(img, curLength + i))
            );
          }, handleScrollWheel = (e) => {
            const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
            (scrollTop + clientHeight === scrollHeight && e.deltaY > 0 || scrollTop === 0 && e.deltaY < 0) && e.preventDefault();
          }, close = () => {
            visible.value && (visible.value = !1);
          }, copyTitle = () => {
            _GM_setClipboard(title.value, "text", () => {
              showMessage({
                type: "success",
                message: t2("common.copied"),
                duration: 2e3
              });
            });
          };
          return vue.watch(visible, (val) => {
            val ? (window.addEventListener("scroll", close), window.addEventListener("resize", close)) : (window.removeEventListener("scroll", close), window.removeEventListener("resize", close));
          }), vue.onBeforeUnmount(() => {
            window.removeEventListener("scroll", close), window.removeEventListener("resize", close);
          }), __expose({ open: open2 }), (_ctx, _cache) => (vue.openBlock(), vue.createBlock(vue.unref(elementPlus.ElPopover), {
            ref_key: "popoverRef",
            ref: popoverRef,
            visible: visible.value,
            "onUpdate:visible": _cache[2] || (_cache[2] = ($event) => visible.value = $event),
            "popper-class": popoverTransition.value ? "popover-transition" : "",
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
                      text: "",
                      size: "small",
                      onClick: copyTitle
                    }, {
                      default: vue.withCtx(() => [
                        vue.createTextVNode(vue.toDisplayString(vue.unref(t2)("common.copy")), 1)
                      ]),
                      _: 1
                    }),
                    vue.createVNode(vue.unref(elementPlus.ElButton), {
                      icon: vue.unref(close_bold_default),
                      circle: "",
                      text: "",
                      size: "small",
                      style: { "margin-left": "4px" },
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
                          underline: !1,
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
                    (vue.openBlock(!0), vue.createElementBlock(vue.Fragment, null, vue.renderList(groupedTags.value, ([type, tags2]) => (vue.openBlock(), vue.createBlock(vue.unref(elementPlus.ElDescriptionsItem), { key: type }, {
                      label: vue.withCtx(() => [
                        vue.createElementVNode("span", _hoisted_2, vue.toDisplayString(vue.unref(t2)(`meta.${type}`)), 1)
                      ]),
                      default: vue.withCtx(() => [
                        (vue.openBlock(!0), vue.createElementBlock(vue.Fragment, null, vue.renderList(limitTagLength(tags2, 10), (tag) => (vue.openBlock(), vue.createBlock(vue.unref(elementPlus.ElTag), {
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
                        }, 1032, ["class", "onClick"]))), 128))
                      ]),
                      _: 2
                    }, 1024))), 128)),
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
                    })) : vue.createCommentVNode("", !0),
                    gallery2.value.upload_date ? (vue.openBlock(), vue.createBlock(vue.unref(elementPlus.ElDescriptionsItem), { key: 1 }, {
                      label: vue.withCtx(() => [
                        vue.createElementVNode("span", _hoisted_6, vue.toDisplayString(vue.unref(t2)("meta.upload")), 1)
                      ]),
                      default: vue.withCtx(() => [
                        vue.createTextVNode(" " + vue.toDisplayString(new Date(gallery2.value.upload_date * 1e3).toLocaleString()), 1)
                      ]),
                      _: 1
                    })) : vue.createCommentVNode("", !0)
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
                        (vue.openBlock(!0), vue.createElementBlock(vue.Fragment, null, vue.renderList(pageThumbs.value, ({ url, height }) => (vue.openBlock(), vue.createBlock(vue.unref(elementPlus.ElCol), {
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
                        }, 1032, ["span"]))), 128))
                      ]),
                      _: 1
                    })
                  ])
                ], 36)), [
                  [vue.unref(elementPlus.ElInfiniteScroll), addPageThumbLine]
                ]) : vue.createCommentVNode("", !0)
              ], 34)) : vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
                key: 1,
                style: { height: "700px", maxHeight: "90vh" },
                onWheel: _cache[1] || (_cache[1] = vue.withModifiers(() => {
                }, ["prevent"]))
              }, null, 544)), [
                [vue.unref(elementPlus.vLoading), !0]
              ])
            ]),
            _: 1
          }, 8, ["visible", "popper-class", "virtual-ref", "placement", "width"]));
        }
      }), GalleryMiniPopover = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-22c5eb74"]]), initApp = once(
        () => createAppAndMount(GalleryMiniPopover, (app) => {
          app.use(i18n);
        })
      ), openGalleryMiniPopover = (el, gid2) => {
        initApp().open(el, gid2);
      }, initListPage = () => {
        $(selector.gallery).each(initGallery);
        const { filterLanguage: filterLanguage2 } = mountLanguageFilter();
        initShortcut(), restoreDownloadQueue();
        const contentEl = document.querySelector(selector.galleryList);
        contentEl && new MutationObserver((mutations) => {
          mutations.forEach(({ addedNodes }) => {
            addedNodes.forEach((node) => {
              const $el = $(node);
              $el.find(selector.gallery).each(initGallery), filterLanguage2 == null || filterLanguage2($el);
            });
          });
        }).observe(contentEl, { childList: !0 });
      }, initShortcut = () => {
        const ignoreActiveElTags = /* @__PURE__ */ new Set(["INPUT", "TEXTAREA"]);
        $(document).on("keydown", (event) => {
          var _a;
          const activeElTag = ((_a = document.activeElement) == null ? void 0 : _a.tagName) || "";
          if (!ignoreActiveElTags.has(activeElTag))
            switch (event.key) {
              case "ArrowLeft":
                $(selector.paginationPrevious).trigger("click");
                break;
              case "ArrowRight":
                $(selector.paginationNext).trigger("click");
                break;
            }
        });
      }, restoreDownloadQueue = () => {
        const galleriesJson = sessionStorage.getItem("downloadQueue");
        if (galleriesJson)
          try {
            const galleries = JSON.parse(galleriesJson);
            for (const gallery2 of galleries)
              addDownloadGalleryTask(gallery2);
          } catch (error) {
            logger.error(error);
          }
      }, initGallery = function() {
        var _a;
        const $gallery = $(this);
        if ($gallery.attr("init")) return;
        $gallery.attr("init", "true"), $gallery.addClass("nhentai-helper-gallery");
        const $a = $gallery.find(selector.galleryCover);
        settings.openOnNewTab && $a.attr("target", "_blank");
        const gid2 = (_a = /\/g\/([0-9]+)/.exec($a.attr("href"))) == null ? void 0 : _a[1];
        if (!gid2) return;
        const enTitle = $gallery.find(selector.galleryCaption).text().trim(), progressDisplayController = new ProgressDisplayController(), { downloadBtn } = progressDisplayController;
        $gallery.append(downloadBtn);
        let ignoreController, galleryTitle;
        const markGalleryDownloaded = () => {
          $gallery.addClass("downloaded"), ignoreController == null || ignoreController.setStatus(!0);
        }, unmarkGalleryDownloaded = () => {
          $gallery.removeClass("downloaded"), ignoreController == null || ignoreController.setStatus(!1);
        };
        Promise.all([isDownloadedByGid(gid2), isDownloadedByTitle({ english: enTitle })]).then(
          ([gidDownloaded, titleDownloaded]) => {
            const downloaded = gidDownloaded || titleDownloaded;
            if (downloaded && markGalleryDownloaded(), settings.showIgnoreButton) {
              ignoreController = new IgnoreController(!1, downloaded);
              const { ignoreBtn } = ignoreController;
              ignoreBtn.addEventListener("click", () => {
                ignoreController.getStatus() ? (unmarkGalleryDownloaded(), unmarkAsDownloaded(gid2, galleryTitle)) : (markGalleryDownloaded(), markAsDownloaded(gid2, galleryTitle));
              }), $gallery.append(ignoreBtn);
            }
          }
        );
        let skipDownloadedCheck = !1;
        const startDownload = async () => {
          if (settings.autoCancelDownloadedManga || progressDisplayController.lockBtn("Wait"), !skipDownloadedCheck && await isDownloadedByGid(gid2)) {
            const title = $gallery.find(selector.galleryCaption).text();
            if (!await downloadAgainConfirm(title, !0)) {
              progressDisplayController.reset(), markGalleryDownloaded();
              return;
            }
            skipDownloadedCheck = !0;
          }
          settings.autoCancelDownloadedManga && progressDisplayController.lockBtn("Wait");
          let gallery2;
          try {
            gallery2 = await getGalleryInfo(gid2), galleryTitle = gallery2.title;
          } catch (error) {
            logger.error(error), progressDisplayController.error(), errorRetryConfirm(ErrorAction.GET_INFO, void 0, startDownload);
            return;
          }
          if (!skipDownloadedCheck) {
            if (await isDownloadedByTitle(gallery2.title) && !await downloadAgainConfirm(gallery2.title.japanese || gallery2.title.english, !0)) {
              progressDisplayController.reset(), markAsDownloaded(gid2, gallery2.title), markGalleryDownloaded();
              return;
            }
            if (dlQueue.queue.some(
              ({
                info: {
                  gallery: { title }
                }
              }) => isSameTitle(title, gallery2.title)
            ) && !await downloadAgainConfirm(gallery2.title.japanese || gallery2.title.english, !0)) {
              progressDisplayController.reset();
              return;
            }
          }
          addDownloadGalleryTask(gallery2, { progressDisplayController, markGalleryDownloaded });
        };
        downloadBtn.addEventListener("click", startDownload), this.addEventListener("contextmenu", (e) => {
          settings.galleryContextmenuPreview && (e.preventDefault(), openGalleryMiniPopover(this, gid2));
        });
      };
      class StyleInjector {
        constructor(style) {
          __publicField(this, "styleNode");
          this.styleNode = /* @__PURE__ */ coreExports.h("style", null, style);
        }
        inject() {
          document.head.append(this.styleNode);
        }
        remove() {
          this.styleNode.remove();
        }
      }
      const initOnlineViewPage = () => {
        IS_NHENTAI || initViewMode();
      }, initViewMode = () => {
        const style = new StyleInjector(
          `${selector.mediaImage}{width:auto;max-width:calc(100vw - 20px);max-height:100vh}`
        ), viewModeText = ["[off]", "[on]"];
        let viewMode = _GM_getValue("online_view_mode", 0);
        applyOnlineViewStyle(!!viewMode, style);
        const btnText = /* @__PURE__ */ coreExports.h("span", null, viewModeText[viewMode]), btn = /* @__PURE__ */ coreExports.h("button", { id: "online-view-mode-btn", class: className.greyButton }, "100% view height ", btnText);
        btn.addEventListener("click", () => {
          viewMode = 1 - viewMode, _GM_setValue("online_view_mode", viewMode), btnText.innerText = viewModeText[viewMode], applyOnlineViewStyle(!!viewMode, style);
        }), $(selector.pageContainer).prepend(btn);
      }, applyOnlineViewStyle = (enable, style) => {
        enable ? style.inject() : style.remove();
      }, initPage = () => {
        $("body").addClass(`nhentai-helper-${location.hostname.replace(/\./g, "_")}`), IS_PAGE_MANGA_LIST ? (initListPage(), applyPjax()) : IS_PAGE_MANGA_DETAIL ? initDetailPage().catch(logger.error) : IS_PAGE_ONLINE_VIEW && initOnlineViewPage();
      }, applyPjax = () => {
        $(document).pjax(selector.pjaxTrigger, {
          container: selector.pjaxTarget,
          fragment: selector.pjaxTarget,
          timeout: 1e4
        }), $(document).on("pjax:end", () => {
          $(selector.pjaxRemoveParam).each(function() {
            const $this = $(this), href = $this.attr("href");
            if (!href || href.startsWith("#")) return;
            const isPathname = href.startsWith("/"), url = isPathname ? new URL(href, location.origin) : new URL(href);
            url.searchParams.delete("_pjax"), $this.attr("href", isPathname ? `${url.pathname}${url.search}` : url.href);
          }), applyLazyLoad();
        });
      }, applyLazyLoad = () => {
        const { _n_app } = _unsafeWindow;
        _n_app && (_n_app.install_lazy_loader(), _n_app.install_blacklisting());
      }, initSettingsDialogApp = once(
        () => createAppAndMount(SettingsDialog, (app) => {
          app.use(i18n);
        })
      ), openSettingsDialog = () => {
        initSettingsDialogApp().open();
      };
      createAppAndMount(_sfc_main$4);
      initPage();
      _GM_registerMenuCommand(i18n.global.t("common.settings"), openSettingsDialog);
    }
  });
  require_main_001();

})(jQuery, Vue, ElementPlus);