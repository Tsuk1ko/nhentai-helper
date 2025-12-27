// ==UserScript==
// @name               nHentai Helper
// @name:zh-CN         nHentai 助手
// @name:zh-TW         nHentai 助手
// @namespace          https://github.com/Tsuk1ko
// @version            3.21.1
// @author             Jindai Kirin
// @description        Download nHentai manga as compression file easily, and add some useful features. Also support some mirror sites.
// @description:zh-CN  为 nHentai 增加压缩打包下载方式以及一些辅助功能，同时还支持一些镜像站
// @description:zh-TW  爲 nHentai 增加壓縮打包下載方式以及一些輔助功能，同時還支援一些鏡像站
// @license            GPL-3.0
// @icon               https://icon.horse/icon/nhentai.net
// @homepageURL        https://github.com/Tsuk1ko/nhentai-helper
// @supportURL         https://github.com/Tsuk1ko/nhentai-helper/issues
// @include            /^https:\/\/([^/]*\.)?(nya|dog|cat|bug|qq|fox|ee|yy)hentai\d*\./
// @match              https://nhentai.net/*
// @match              https://nhentai.xxx/*
// @match              https://nhentai.to/*
// @match              https://nhentai.website/*
// @require            https://unpkg.com/vue@3.5.26/dist/vue.global.prod.js
// @require            data:application/javascript,window.Vue%3DVue%2Cwindow.Date.now%7C%7C(window.Date.now%3D()%3D%3Enew%20Date().getTime())%3B
// @require            https://unpkg.com/element-plus@2.13.0/dist/index.full.min.js
// @require            https://unpkg.com/jquery@3.7.1/dist/jquery.min.js
// @resource           element-plus-css  https://unpkg.com/element-plus@2.13.0/dist/index.css
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

(function ($, Vue, elementPlus) {
  'use strict';

  function _interopNamespaceDefault(e) {
    const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
    if (e) {
      for (const k in e) {
        if (k !== 'default') {
          const d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: () => e[k]
          });
        }
      }
    }
    n.default = e;
    return Object.freeze(n);
  }

  const Vue__namespace = /*#__PURE__*/_interopNamespaceDefault(Vue);

  const d=new Set;const importCSS = async e=>{d.has(e)||(d.add(e),(t=>{typeof GM_addStyle=="function"?GM_addStyle(t):(document.head||document.documentElement).appendChild(document.createElement("style")).append(t);})(e));};

  importCSS(` .download-item[data-v-0f4d58ac] {
  position: relative;
  white-space: nowrap;
  padding: 2px;
  overflow: visible;
}
.download-item--can-cancel[data-v-0f4d58ac]:hover {
  width: calc(100% - 30px);
}
.download-item__cancel[data-v-0f4d58ac] {
  cursor: pointer;
  position: absolute;
  top: 0;
  right: -30px;
  color: #f44336;
  font-size: 20px;
  line-height: 30px;
  width: 30px;
}
.download-item__title[data-v-0f4d58ac] {
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}
.download-item__progress[data-v-0f4d58ac] {
  background-color: #0000ff80;
  line-height: 10px;
}
.download-item--error .download-item__progress[data-v-0f4d58ac] {
  background-color: #ff000080;
}
.download-item--compressing .download-item__progress[data-v-0f4d58ac] {
  background-color: #00ff0080;
}
.download-item__progress-text[data-v-0f4d58ac] {
  transform: scale(.8);
}
#download-panel[data-v-b1f64280] {
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
#download-panel[data-v-b1f64280]::-webkit-scrollbar {
  width: 6px;
  background-color: #000000b3;
}
#download-panel[data-v-b1f64280]::-webkit-scrollbar-thumb {
  background-color: #fff9;
}
.nhentai-helper-setting-help-buttons[data-v-6607043c] {
  float: left;
  position: absolute;
}
.inline-item[data-v-6607043c] {
  display: inline-block;
}
.inline-item[data-v-6607043c]:not(:last-of-type) {
  margin-right: 8px;
}
.inline-item__name[data-v-6607043c] {
  margin-right: 4px;
  -webkit-user-select: none;
  user-select: none;
}
.monospace[data-v-6607043c] {
  font-family: monospace;
}
span.monospace[data-v-6607043c] {
  -webkit-user-select: none;
  user-select: none;
}
.code-type[data-v-6607043c] {
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
.bold[data-v-433d0960] {
  font-weight: 700;
}
.info-label[data-v-433d0960] {
  display: inline-block;
}
.lang-zh .info-label[data-v-433d0960] {
  min-width: 30px;
}
.lang-en .info-label[data-v-433d0960] {
  min-width: 80px;
}
.info-tag-wrapper[data-v-433d0960] {
  display: flex;
}
.info-tag[data-v-433d0960] {
  margin: 2px;
  -webkit-user-select: none;
  user-select: none;
}
.info-tag--pointer[data-v-433d0960] {
  cursor: pointer;
}
.image-loading[data-v-433d0960] {
  width: 100%;
  height: 100%;
  background-color: #0009;
}
.scroll-container[data-v-433d0960] {
  min-height: 400px;
  margin: 8px -8px 0;
  overflow-y: auto;
}
.scroll-container[data-v-433d0960]::-webkit-scrollbar {
  width: 6px;
}
.scroll-container[data-v-433d0960]::-webkit-scrollbar-thumb {
  background-color: #0003;
  border-radius: 10px;
  transition: all .2s ease-in-out;
}
.scroll-container[data-v-433d0960]::-webkit-scrollbar-track {
  border-radius: 10px;
}
.scroll-container-inner[data-v-433d0960] {
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
}
.language-filter[data-v-a4501d38] {
  display: inline-flex;
  align-items: center;
  padding-left: 10px;
  vertical-align: middle;
}
.filter-select[data-v-a4501d38] {
  width: 140px;
  margin-right: -140px;
}
.filter-select[data-v-a4501d38] .el-input__inner {
  color: var(--el-input-text-color, var(--el-text-color-regular)) !important;
  background: 0 0 !important;
}
@media screen and (max-width: 644px) {
  .language-filter[data-v-a4501d38] {
    padding: 10px 0;
  }
  .filter-select[data-v-a4501d38] {
    margin-right: 0;
  }
} `);

  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var require_main_001 = __commonJS({
    "main-BSipz-Me.js"(exports$1, module) {
      var _GM_addStyle = typeof GM_addStyle < "u" ? GM_addStyle : void 0, _GM_getResourceText = typeof GM_getResourceText < "u" ? GM_getResourceText : void 0, _GM_getValue = typeof GM_getValue < "u" ? GM_getValue : void 0, _GM_openInTab = typeof GM_openInTab < "u" ? GM_openInTab : void 0, _GM_registerMenuCommand = typeof GM_registerMenuCommand < "u" ? GM_registerMenuCommand : void 0, _GM_setClipboard = typeof GM_setClipboard < "u" ? GM_setClipboard : void 0, _GM_setValue = typeof GM_setValue < "u" ? GM_setValue : void 0, _GM_xmlhttpRequest = typeof GM_xmlhttpRequest < "u" ? GM_xmlhttpRequest : void 0, _unsafeWindow = typeof unsafeWindow < "u" ? unsafeWindow : void 0, _monkeyWindow = window;
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
          tag: (text) => `li.tags:contains(${text}) .tag_btn`,
          tagName: ".tag_name",
          tagCount: ".tag_count",
          pagesTag: ".tag_name.pages",
          uploadDateTag: ".tags.uploaded",
          infoButtons: ".info > .g_buttons",
          // view
          mediaImage: "#fimg",
          pageContainer: ".reader_outer"
        }
      }, selector = { ...defaultSelector, ...siteMap$1[location.hostname] }, WORKER_THREAD_NUM = Math.max(navigator.hardwareConcurrency - 1, 1), { pathname, hostname } = location, IS_PAGE_MANGA_DETAIL = /^\/g\/\d+\/?(?:\?.*)?$/.test(pathname), IS_PAGE_ONLINE_VIEW = /^\/g\/\d+(?:\/list)?\/\d+\/?(?:\?.*)?$/.test(pathname), IS_PAGE_MANGA_LIST = !IS_PAGE_MANGA_DETAIL && !IS_PAGE_ONLINE_VIEW && !!document.querySelector(selector.gallery), IS_NHENTAI = hostname === "nhentai.net", IS_NHENTAI_TO = hostname === "nhentai.to" || hostname === "nhentai.website", IS_NHENTAI_XXX = hostname === "nhentai.xxx", MEDIA_URL_TEMPLATE_MAY_CHANGE = IS_NHENTAI || IS_NHENTAI_XXX, MEDIA_URL_TEMPLATE_KEY = `media_url_template_${hostname}`, THUMB_MEDIA_URL_TEMPLATE_KEY = `thumb_media_url_template_${hostname}`, isNodeOrElement = typeof Node == "function" ? (val) => val instanceof Node : (val) => val && typeof val == "object" && typeof val.nodeType == "number" && typeof val.nodeName == "string";
      if (IS_NHENTAI && (_GM_getValue("prevent_console_clear", false) || localStorage.getItem("NHENTAI_HELPER_DEBUG"))) {
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
            defaults.data = new FormData(form), defaults.processData = false, defaults.contentType = false;
          else {
            if ($form.find(":file").length)
              return;
            defaults.data = $form.serializeArray();
          }
          pjax($2.extend({}, defaults, options)), event.preventDefault();
        }
        function pjax(options) {
          options = $2.extend(true, {}, $2.ajaxSettings, pjax.defaults, options), $2.isFunction(options.url) && (options.url = options.url());
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
              return false;
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
            push: false,
            replace: true,
            scrollTo: false
          };
          return pjax($2.extend(defaults, optionsFor(container, options)));
        }
        function locationReplace(url) {
          window.history.replaceState(null, "", pjax.state.url), window.location.replace(url);
        }
        var initialPop = true, initialURL = window.location.href, initialState = window.history.state;
        initialState && initialState.container && (pjax.state = initialState), "state" in window.history && (initialPop = false);
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
                push: false,
                fragment: state.fragment,
                timeout: state.timeout,
                scrollTo: false
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
          initialPop = false;
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
            this.src || $2._data(this, "globalEval", false);
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
          return $2.parseHTML(html, document, true);
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
            push: true,
            replace: false,
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
      const indexLess = `.nhentai-helper-hidden {
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
}`;
      importCSS(indexLess);
      const notyCss = `.noty_layout_mixin,
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
}`;
      importCSS(notyCss);
      const cssLoader = (e) => _GM_addStyle(_GM_getResourceText(e));
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
      var isArray$1 = Array.isArray, symbolProto$1 = Symbol$1 ? Symbol$1.prototype : void 0, symbolToString = symbolProto$1 ? symbolProto$1.toString : void 0;
      function baseToString(value) {
        if (typeof value == "string")
          return value;
        if (isArray$1(value))
          return arrayMap(value, baseToString) + "";
        if (isSymbol(value))
          return symbolToString ? symbolToString.call(value) : "";
        var result = value + "";
        return result == "0" && 1 / value == -1 / 0 ? "-0" : result;
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
      function isObject$3(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function");
      }
      var NAN = NaN, reIsBadHex = /^[-+]0x[0-9a-f]+$/i, reIsBinary = /^0b[01]+$/i, reIsOctal = /^0o[0-7]+$/i, freeParseInt = parseInt;
      function toNumber(value) {
        if (typeof value == "number")
          return value;
        if (isSymbol(value))
          return NAN;
        if (isObject$3(value)) {
          var other = typeof value.valueOf == "function" ? value.valueOf() : value;
          value = isObject$3(other) ? other + "" : other;
        }
        if (typeof value != "string")
          return value === 0 ? value : +value;
        value = baseTrim(value);
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
      }
      var INFINITY = 1 / 0, MAX_INTEGER = 17976931348623157e292;
      function toFinite(value) {
        if (!value)
          return value === 0 ? value : 0;
        if (value = toNumber(value), value === INFINITY || value === -INFINITY) {
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
        if (!isObject$3(value))
          return false;
        var tag = baseGetTag(value);
        return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
      }
      var coreJsData = root["__core-js_shared__"], maskSrcKey = (function() {
        var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
        return uid ? "Symbol(src)_1." + uid : "";
      })();
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
        if (!isObject$3(value) || isMasked(value))
          return false;
        var pattern = isFunction$1(value) ? reIsNative : reIsHostCtor;
        return pattern.test(toSource(value));
      }
      function getValue(object, key) {
        return object?.[key];
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
      var defineProperty = (function() {
        try {
          var func = getNative(Object, "defineProperty");
          return func({}, "", {}), func;
        } catch {
        }
      })(), baseSetToString = defineProperty ? function(func, string) {
        return defineProperty(func, "toString", {
          configurable: true,
          enumerable: false,
          value: constant(string),
          writable: true
        });
      } : identity, setToString = shortOut(baseSetToString);
      function arrayEach(array, iteratee) {
        for (var index = -1, length = array == null ? 0 : array.length; ++index < length && iteratee(array[index], index, array) !== false; )
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
          configurable: true,
          enumerable: true,
          value,
          writable: true
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
        return value != null && isLength(value.length) && !isFunction$1(value);
      }
      function isIterateeCall(value, index, object) {
        if (!isObject$3(object))
          return false;
        var type = typeof index;
        return (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) ? eq(object[index], value) : false;
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
      var objectProto$d = Object.prototype, hasOwnProperty$c = objectProto$d.hasOwnProperty, propertyIsEnumerable$1 = objectProto$d.propertyIsEnumerable, isArguments = baseIsArguments(/* @__PURE__ */ (function() {
        return arguments;
      })()) ? baseIsArguments : function(value) {
        return isObjectLike(value) && hasOwnProperty$c.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
      };
      function stubFalse() {
        return false;
      }
      var freeExports$1 = typeof exports$1 == "object" && exports$1 && !exports$1.nodeType && exports$1, freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module, moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1, Buffer2 = moduleExports$1 ? root.Buffer : void 0, nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0, isBuffer = nativeIsBuffer || stubFalse, argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", errorTag$2 = "[object Error]", funcTag = "[object Function]", mapTag$2 = "[object Map]", numberTag$1 = "[object Number]", objectTag$3 = "[object Object]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$1 = "[object String]", weakMapTag$1 = "[object WeakMap]", arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$2 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]", typedArrayTags = {};
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
      var freeExports = typeof exports$1 == "object" && exports$1 && !exports$1.nodeType && exports$1, freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module, moduleExports = freeModule && freeModule.exports === freeExports, freeProcess = moduleExports && freeGlobal.process, nodeUtil = (function() {
        try {
          var types = freeModule && freeModule.require && freeModule.require("util").types;
          return types || freeProcess && freeProcess.binding && freeProcess.binding("util");
        } catch {
        }
      })(), nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray, isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray, objectProto$c = Object.prototype, hasOwnProperty$b = objectProto$c.hasOwnProperty;
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
        if (!isObject$3(object))
          return nativeKeysIn(object);
        var isProto = isPrototype(object), result = [];
        for (var key in object)
          key == "constructor" && (isProto || !hasOwnProperty$9.call(object, key)) || result.push(key);
        return result;
      }
      function keysIn(object) {
        return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
      }
      var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
        copyObject(source, keysIn(source), object, customizer);
      }), reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
      function isKey(value, object) {
        if (isArray$1(value))
          return false;
        var type = typeof value;
        return type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value) ? true : reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
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
          return false;
        var lastIndex = data.length - 1;
        return index == lastIndex ? data.pop() : splice.call(data, index, 1), --this.size, true;
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
        return string.charCodeAt(0) === 46 && result.push(""), string.replace(rePropName, function(match, number, quote, subString) {
          result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
        }), result;
      });
      function toString$1(value) {
        return value == null ? "" : baseToString(value);
      }
      function castPath(value, object) {
        return isArray$1(value) ? value : isKey(value, object) ? [value] : stringToPath(toString$1(value));
      }
      function toKey(value) {
        if (typeof value == "string" || isSymbol(value))
          return value;
        var result = value + "";
        return result == "0" && 1 / value == -1 / 0 ? "-0" : result;
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
          return false;
        var proto = getPrototype(value);
        if (proto === null)
          return true;
        var Ctor = hasOwnProperty$6.call(proto, "constructor") && proto.constructor;
        return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
      }
      var domExcTag = "[object DOMException]", errorTag$1 = "[object Error]";
      function isError(value) {
        if (!isObjectLike(value))
          return false;
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
          return object?.[key];
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
            return true;
        return false;
      }
      function cacheHas(cache2, key) {
        return cache2.has(key);
      }
      var COMPARE_PARTIAL_FLAG$5 = 1, COMPARE_UNORDERED_FLAG$3 = 2;
      function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG$5, arrLength = array.length, othLength = other.length;
        if (arrLength != othLength && !(isPartial && othLength > arrLength))
          return false;
        var arrStacked = stack.get(array), othStacked = stack.get(other);
        if (arrStacked && othStacked)
          return arrStacked == other && othStacked == array;
        var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG$3 ? new SetCache() : void 0;
        for (stack.set(array, other), stack.set(other, array); ++index < arrLength; ) {
          var arrValue = array[index], othValue = other[index];
          if (customizer)
            var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
          if (compared !== void 0) {
            if (compared)
              continue;
            result = false;
            break;
          }
          if (seen) {
            if (!arraySome(other, function(othValue2, othIndex) {
              if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack)))
                return seen.push(othIndex);
            })) {
              result = false;
              break;
            }
          } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
            result = false;
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
              return false;
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
              return false;
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
        return false;
      }
      var COMPARE_PARTIAL_FLAG$3 = 1, objectProto$5 = Object.prototype, hasOwnProperty$5 = objectProto$5.hasOwnProperty;
      function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
        if (objLength != othLength && !isPartial)
          return false;
        for (var index = objLength; index--; ) {
          var key = objProps[index];
          if (!(isPartial ? key in other : hasOwnProperty$5.call(other, key)))
            return false;
        }
        var objStacked = stack.get(object), othStacked = stack.get(other);
        if (objStacked && othStacked)
          return objStacked == other && othStacked == object;
        var result = true;
        stack.set(object, other), stack.set(other, object);
        for (var skipCtor = isPartial; ++index < objLength; ) {
          key = objProps[index];
          var objValue = object[key], othValue = other[key];
          if (customizer)
            var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
          if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
            result = false;
            break;
          }
          skipCtor || (skipCtor = key == "constructor");
        }
        if (result && !skipCtor) {
          var objCtor = object.constructor, othCtor = other.constructor;
          objCtor != othCtor && "constructor" in object && "constructor" in other && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor) && (result = false);
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
            return false;
          objIsArr = true, objIsObj = false;
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
        return isSameTag ? (stack || (stack = new Stack()), equalObjects(object, other, bitmask, customizer, equalFunc, stack)) : false;
      }
      function baseIsEqual(value, other, bitmask, customizer, stack) {
        return value === other ? true : value == null || other == null || !isObjectLike(value) && !isObjectLike(other) ? value !== value && other !== other : baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
      }
      var COMPARE_PARTIAL_FLAG$1 = 1, COMPARE_UNORDERED_FLAG$1 = 2;
      function baseIsMatch(object, source, matchData, customizer) {
        var index = matchData.length, length = index;
        if (object == null)
          return !length;
        for (object = Object(object); index--; ) {
          var data = matchData[index];
          if (data[2] ? data[1] !== object[data[0]] : !(data[0] in object))
            return false;
        }
        for (; ++index < length; ) {
          data = matchData[index];
          var key = data[0], objValue = object[key], srcValue = data[1];
          if (data[2]) {
            if (objValue === void 0 && !(key in object))
              return false;
          } else {
            var stack = new Stack(), result;
            if (!(result === void 0 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, customizer, stack) : result))
              return false;
          }
        }
        return true;
      }
      function isStrictComparable(value) {
        return value === value && !isObject$3(value);
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
          return object == null ? false : object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
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
        for (var index = -1, length = path.length, result = false; ++index < length; ) {
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
          return object?.[key];
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
            if (iteratee(iterable[key], key, iterable) === false)
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
          for (var length = collection.length, index = -1, iterable = Object(collection); ++index < length && iteratee(iterable[index], index, iterable) !== false; )
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
        var index = -1, includes = arrayIncludes, isCommon = true, length = array.length, result = [], valuesLength = values2.length;
        if (!length)
          return result;
        values2.length >= LARGE_ARRAY_SIZE && (includes = cacheHas, isCommon = false, values2 = new SetCache(values2));
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
        string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
          return interpolateValue || (interpolateValue = esTemplateValue), source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar), escapeValue && (isEscaping = true, source += `' +
__e(` + escapeValue + `) +
'`), evaluateValue && (isEvaluating = true, source += `';
` + evaluateValue + `;
__p += '`), interpolateValue && (source += `' +
((__t = (` + interpolateValue + `)) == null ? '' : __t) +
'`), index = offset + match.length, match;
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
        return hasRequiredEventemitter3 || (hasRequiredEventemitter3 = 1, (function(module2) {
          var has = Object.prototype.hasOwnProperty, prefix = "~";
          function Events() {
          }
          Object.create && (Events.prototype = /* @__PURE__ */ Object.create(null), new Events().__proto__ || (prefix = false));
          function EE(fn, context, once2) {
            this.fn = fn, this.context = context, this.once = once2 || false;
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
            if (!this._events[evt]) return false;
            var listeners = this._events[evt], len = arguments.length, args, i;
            if (listeners.fn) {
              switch (listeners.once && this.removeListener(event, listeners.fn, void 0, true), len) {
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
              for (i = 1, args = new Array(len - 1); i < len; i++)
                args[i - 1] = arguments[i];
              listeners.fn.apply(listeners.context, args);
            } else {
              var length = listeners.length, j;
              for (i = 0; i < length; i++)
                switch (listeners[i].once && this.removeListener(event, listeners[i].fn, void 0, true), len) {
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
            return true;
          }, EventEmitter2.prototype.on = function(event, fn, context) {
            return addListener(this, event, fn, context, false);
          }, EventEmitter2.prototype.once = function(event, fn, context) {
            return addListener(this, event, fn, context, true);
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
        })(eventemitter3)), eventemitter3.exports;
      }
      var eventemitter3Exports = requireEventemitter3();
      const EventEmitter = /* @__PURE__ */ getDefaultExportFromCjs(eventemitter3Exports), removeAt = (array, index) => array.splice(index, 1)[0];
      class AsyncQueue {
        constructor(thread = 1) {
          this.thread = thread;
        }
        queue = Vue.reactive([]);
        emitter = new EventEmitter();
        singleRunning = false;
        get length() {
          return this.queue.length;
        }
        get runningThreadNum() {
          return this.queue.filter(({ running }) => running).length;
        }
        canSingleStart = () => true;
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
              await this.queue[0].fn(), this.queue.shift();
            } while (this.queue.length > 0);
            this.singleRunning = false, this.emitter.emit("finish");
          } else {
            const running = this.runningThreadNum;
            if (running >= this.thread || this.queue.length === running) return;
            const idleItems = this.queue.filter(({ running: running2 }) => !running2);
            for (let i = 0; i < Math.min(idleItems.length, this.thread - running); i++) {
              const item = idleItems[i];
              item.running = true, item.fn().then(async () => {
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
          this.singleRunning = false, await this.start();
        }
      }
      var __spreadArray = function(to, from, pack) {
        for (var i = 0, l = from.length, ar; i < l; i++)
          (ar || !(i in from)) && (ar || (ar = Array.prototype.slice.call(from, 0, i)), ar[i] = from[i]);
        return to.concat(ar || Array.prototype.slice.call(from));
      }, BrowserInfo = (
        /** @class */
        /* @__PURE__ */ (function() {
          function BrowserInfo2(name, version, os) {
            this.name = name, this.version = version, this.os = os, this.type = "browser";
          }
          return BrowserInfo2;
        })()
      ), NodeInfo = (
        /** @class */
        /* @__PURE__ */ (function() {
          function NodeInfo2(version) {
            this.version = version, this.type = "node", this.name = "node", this.os = process.platform;
          }
          return NodeInfo2;
        })()
      ), SearchBotDeviceInfo = (
        /** @class */
        /* @__PURE__ */ (function() {
          function SearchBotDeviceInfo2(name, version, os, bot) {
            this.name = name, this.version = version, this.os = os, this.bot = bot, this.type = "bot-device";
          }
          return SearchBotDeviceInfo2;
        })()
      ), BotInfo = (
        /** @class */
        /* @__PURE__ */ (function() {
          function BotInfo2() {
            this.type = "bot", this.bot = true, this.name = "bot", this.version = null, this.os = null;
          }
          return BotInfo2;
        })()
      ), ReactNativeInfo = (
        /** @class */
        /* @__PURE__ */ (function() {
          function ReactNativeInfo2() {
            this.type = "react-native", this.name = "react-native", this.version = null, this.os = null;
          }
          return ReactNativeInfo2;
        })()
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
        }, false);
      }
      function parseUserAgent(ua) {
        var matchedRule = matchUserAgent(ua);
        if (!matchedRule)
          return null;
        var name = matchedRule[0], match = matchedRule[1];
        if (name === "searchbot")
          return new BotInfo();
        var versionParts = match[1] && match[1].split(".").join("_").split("_").slice(0, 3);
        versionParts ? versionParts.length < REQUIRED_VERSION_PARTS && (versionParts = __spreadArray(__spreadArray([], versionParts, true), createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length))) : versionParts = [];
        var version = versionParts.join("."), os = detectOS(ua), searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua);
        return searchBotMatch && searchBotMatch[1] ? new SearchBotDeviceInfo(name, version, os, searchBotMatch[1]) : new BrowserInfo(name, version, os);
      }
      function detectOS(ua) {
        for (var ii = 0, count = operatingSystemRules.length; ii < count; ii++) {
          var _a = operatingSystemRules[ii], os = _a[0], regex = _a[1], match = regex.exec(ua);
          if (match)
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
          if (lang && supportLanguage.has(lang)) return lang;
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
          validator: (val) => val === "auto" || typeof val == "number" && val >= 0,
          formatter: (val) => typeof val == "number" ? Math.floor(val) : val
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
          validator: (val) => val >= 0 && val <= 100
        },
        customFilenameFunction: {
          key: "custom_title_function",
          default: "",
          validator: stringValidator
        },
        removeAdPage: {
          key: "remove_ad_page",
          default: false,
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
          if (!_GM_getValue(key, false)) {
            const def = settingDefinitions.nHentaiDownloadHost;
            settings2.nHentaiDownloadHost !== def.default && (settings2.nHentaiDownloadHost = def.default, _GM_setValue(def.key, def.default)), _GM_setValue(key, true);
          }
        }
        return settings2;
      }, writeableSettings = Vue.reactive(initSettings()), settings = writeableSettings;
      DISABLE_STREAM_DOWNLOAD && settings.streamDownload && (writeableSettings.streamDownload = false);
      const startWatchSettings = once(() => {
        const settingRefs = Vue.toRefs(writeableSettings);
        forEach(settingRefs, (ref2, key) => {
          const cur = settingDefinitions[key];
          let valChanged = false;
          const saveValue = (val) => {
            logger.log("update setting", cur.key, Vue.toRaw(val)), _GM_setValue(cur.key, val);
          };
          Vue.watch(
            ref2,
            (val) => {
              if (valChanged) {
                valChanged = false, saveValue(val);
                return;
              }
              const applyChange = (newVal) => {
                val = newVal, ref2.value = newVal, valChanged = true;
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
            typeof ref2.value == "object" ? { deep: true } : void 0
          );
        });
      }), validTitleReplacement = Vue.computed(
        () => settings.titleReplacement.filter((item) => item?.from)
      ), customFilenameFunction = Vue.computed(() => {
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
      const _hoisted_1$4 = ["title"], _hoisted_2$2 = { class: "download-item__title" }, _hoisted_3$2 = { class: "download-item__progress-text" }, _sfc_main$6 = /* @__PURE__ */ Vue.defineComponent({
        __name: "DownloadItem",
        props: {
          item: {},
          index: {}
        },
        setup(__props) {
          const props = __props, title = Vue.computed(() => {
            const { english, japanese, pretty } = props.item.gallery.title;
            return japanese || english || pretty;
          }), progressWidth = Vue.computed(() => {
            const {
              gallery: { pages },
              done,
              compressing,
              compressingPercent
            } = props.item, page = pages.length;
            return compressing ? compressingPercent : page && done ? (100 * done / page).toFixed(2) : 0;
          }), canCancel = Vue.computed(() => !props.item.compressing), cancel = () => {
            const { info } = props.index === 0 ? dlQueue.queue[0] : removeAt(dlQueue.queue, props.index);
            info?.cancel?.();
          };
          return (_ctx, _cache) => (Vue.openBlock(), Vue.createElementBlock("div", {
            class: Vue.normalizeClass(["download-item", {
              "download-item--error": __props.item.error,
              "download-item--compressing": __props.item.compressing && !__props.item.error,
              "download-item--can-cancel": canCancel.value
            }]),
            title: title.value
          }, [
            canCancel.value ? (Vue.openBlock(), Vue.createElementBlock("div", {
              key: 0,
              class: "download-item__cancel",
              onClick: cancel
            }, [..._cache[0] || (_cache[0] = [
              Vue.createElementVNode("i", { class: "fa fa-times" }, null, -1)
            ])])) : Vue.createCommentVNode("", true),
            Vue.createElementVNode("div", _hoisted_2$2, Vue.toDisplayString(title.value), 1),
            Vue.createElementVNode("div", {
              class: "download-item__progress",
              style: Vue.normalizeStyle({ width: `${progressWidth.value}%` })
            }, [
              Vue.createElementVNode("div", _hoisted_3$2, Vue.toDisplayString(progressWidth.value) + "%", 1)
            ], 4)
          ], 10, _hoisted_1$4));
        }
      }), _export_sfc = (sfc, props) => {
        const target = sfc.__vccOpts || sfc;
        for (const [key, val] of props)
          target[key] = val;
        return target;
      }, DownloadItem = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-0f4d58ac"]]), _hoisted_1$3 = { id: "download-panel" }, _sfc_main$5 = /* @__PURE__ */ Vue.defineComponent({
        __name: "DownloadList",
        props: {
          zipList: {},
          dlList: {}
        },
        setup(__props) {
          return (_ctx, _cache) => (Vue.openBlock(), Vue.createElementBlock("div", _hoisted_1$3, [
            (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(__props.zipList, (item, index) => (Vue.openBlock(), Vue.createBlock(DownloadItem, {
              key: index,
              item,
              index
            }, null, 8, ["item", "index"]))), 128)),
            (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(__props.dlList, (item, index) => (Vue.openBlock(), Vue.createBlock(DownloadItem, {
              key: index,
              item,
              index
            }, null, 8, ["item", "index"]))), 128))
          ]));
        }
      }), DownloadList = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-b1f64280"]]), _sfc_main$4 = /* @__PURE__ */ Vue.defineComponent({
        __name: "DownloadPanel",
        setup(__props) {
          const { title } = document, zipList = Vue.computed(() => zipQueue.queue.map(({ info }) => info)), dlList = Vue.computed(() => dlQueue.queue.map(({ info }) => info)), infoList = Vue.computed(() => [...zipList.value, ...dlList.value]), error = Vue.computed(() => !!dlList.value[0]?.error), titleWithStatus = Vue.computed(() => error.value ? `[×] ${title}` : `[${infoList.value.length || "✓"}] ${title}`);
          return Vue.watch(infoList, (val) => {
            sessionStorage.setItem("downloadQueue", JSON.stringify(val.map(({ gallery }) => gallery)));
          }), Vue.watch(titleWithStatus, (val) => {
            document.title = val;
          }), (_ctx, _cache) => infoList.value.length ? (Vue.openBlock(), Vue.createBlock(DownloadList, {
            key: 0,
            "zip-list": zipList.value,
            "dl-list": dlList.value
          }, null, 8, ["zip-list", "dl-list"])) : Vue.createCommentVNode("", true);
        }
      });
      var _sfc_main55 = /* @__PURE__ */ Vue.defineComponent({
        name: "CloseBold",
        __name: "close-bold",
        setup(__props) {
          return (_ctx, _cache) => (Vue.openBlock(), Vue.createElementBlock("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 1024 1024"
          }, [
            Vue.createElementVNode("path", {
              fill: "currentColor",
              d: "M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496"
            })
          ]));
        }
      }), close_bold_default = _sfc_main55, _sfc_main80 = /* @__PURE__ */ Vue.defineComponent({
        name: "Delete",
        __name: "delete",
        setup(__props) {
          return (_ctx, _cache) => (Vue.openBlock(), Vue.createElementBlock("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 1024 1024"
          }, [
            Vue.createElementVNode("path", {
              fill: "currentColor",
              d: "M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32zm448-64v-64H416v64zM224 896h576V256H224zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32m192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32"
            })
          ]));
        }
      }), delete_default = _sfc_main80, _sfc_main91 = /* @__PURE__ */ Vue.defineComponent({
        name: "Download",
        __name: "download",
        setup(__props) {
          return (_ctx, _cache) => (Vue.openBlock(), Vue.createElementBlock("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 1024 1024"
          }, [
            Vue.createElementVNode("path", {
              fill: "currentColor",
              d: "M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64m384-253.696 236.288-236.352 45.248 45.248L508.8 704 192 387.2l45.248-45.248L480 584.704V128h64z"
            })
          ]));
        }
      }), download_default = _sfc_main91, _sfc_main275 = /* @__PURE__ */ Vue.defineComponent({
        name: "Upload",
        __name: "upload",
        setup(__props) {
          return (_ctx, _cache) => (Vue.openBlock(), Vue.createElementBlock("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 1024 1024"
          }, [
            Vue.createElementVNode("path", {
              fill: "currentColor",
              d: "M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64m384-578.304V704h-64V247.296L237.248 490.048 192 444.8 508.8 128l316.8 316.8-45.312 45.248z"
            })
          ]));
        }
      }), upload_default = _sfc_main275;
      function warn(msg, err) {
        typeof console < "u" && (console.warn("[intlify] " + msg), err && console.warn(err.stack));
      }
      const inBrowser = typeof window < "u", makeSymbol = (name, shareable = false) => shareable ? Symbol.for(name) : Symbol(name), generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source }), friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), isNumber = (val) => typeof val == "number" && isFinite(val), isRegExp = (val) => toTypeString(val) === "[object RegExp]", isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0, assign = Object.assign, _create = Object.create, create = (obj = null) => _create(obj);
      let _globalThis;
      const getGlobalThis = () => _globalThis || (_globalThis = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : create());
      function escapeHtml(rawText) {
        return rawText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\//g, "&#x2F;").replace(/=/g, "&#x3D;");
      }
      function escapeAttributeValue(value) {
        return value.replace(/&(?![a-zA-Z0-9#]{2,6};)/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      }
      function sanitizeTranslatedHtml(html) {
        return html = html.replace(/(\w+)\s*=\s*"([^"]*)"/g, (_, attrName, attrValue) => `${attrName}="${escapeAttributeValue(attrValue)}"`), html = html.replace(/(\w+)\s*=\s*'([^']*)'/g, (_, attrName, attrValue) => `${attrName}='${escapeAttributeValue(attrValue)}'`), /\s*on\w+\s*=\s*["']?[^"'>]+["']?/gi.test(html) && (html = html.replace(/(\s+)(on)(\w+\s*=)/gi, "$1&#111;n$3")), [
          // In href, src, action, formaction attributes
          /(\s+(?:href|src|action|formaction)\s*=\s*["']?)\s*javascript:/gi,
          // In style attributes within url()
          /(style\s*=\s*["'][^"']*url\s*\(\s*)javascript:/gi
        ].forEach((pattern) => {
          html = html.replace(pattern, "$1javascript&#58;");
        }), html;
      }
      const hasOwnProperty = Object.prototype.hasOwnProperty;
      function hasOwn(obj, key) {
        return hasOwnProperty.call(obj, key);
      }
      const isArray = Array.isArray, isFunction = (val) => typeof val == "function", isString = (val) => typeof val == "string", isBoolean = (val) => typeof val == "boolean", isObject$2 = (val) => val !== null && typeof val == "object", isPromise = (val) => isObject$2(val) && isFunction(val.then) && isFunction(val.catch), objectToString = Object.prototype.toString, toTypeString = (value) => objectToString.call(value), isPlainObject = (val) => toTypeString(val) === "[object Object]", toDisplayString = (val) => val == null ? "" : isArray(val) || isPlainObject(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
      function join(items, separator = "") {
        return items.reduce((str, item, index) => index === 0 ? str + item : str + separator + item, "");
      }
      const isNotObjectOrIsArray = (val) => !isObject$2(val) || isArray(val);
      function deepCopy(src, des) {
        if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des))
          throw new Error("Invalid value");
        const stack = [{ src, des }];
        for (; stack.length; ) {
          const { src: src2, des: des2 } = stack.pop();
          Object.keys(src2).forEach((key) => {
            key !== "__proto__" && (isObject$2(src2[key]) && !isObject$2(des2[key]) && (des2[key] = Array.isArray(src2[key]) ? [] : create()), isNotObjectOrIsArray(des2[key]) || isNotObjectOrIsArray(src2[key]) ? des2[key] = src2[key] : stack.push({ src: src2[key], des: des2[key] }));
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
        UNEXPECTED_LEXICAL_ANALYSIS: 14
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
        const location2 = options.location !== false, _scnr = createScanner(source), currentOffset = () => _scnr.index(), currentPosition = () => createPosition(_scnr.line(), _scnr.column(), _scnr.index()), _initLoc = currentPosition(), _initOffset = currentOffset(), _context = {
          currentType: 13,
          offset: _initOffset,
          startLoc: _initLoc,
          endLoc: _initLoc,
          lastType: 13,
          lastOffset: _initOffset,
          lastStartLoc: _initLoc,
          lastEndLoc: _initLoc,
          braceNest: 0,
          inLinked: false,
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
            return false;
          const cc = ch.charCodeAt(0);
          return cc >= 97 && cc <= 122 || // a-z
          cc >= 65 && cc <= 90 || // A-Z
          cc === 95;
        }
        function isNumberStart(ch) {
          if (ch === EOF)
            return false;
          const cc = ch.charCodeAt(0);
          return cc >= 48 && cc <= 57;
        }
        function isNamedIdentifierStart(scnr, context2) {
          const { currentType } = context2;
          if (currentType !== 2)
            return false;
          peekSpaces(scnr);
          const ret = isIdentifierStart(scnr.currentPeek());
          return scnr.resetPeek(), ret;
        }
        function isListIdentifierStart(scnr, context2) {
          const { currentType } = context2;
          if (currentType !== 2)
            return false;
          peekSpaces(scnr);
          const ch = scnr.currentPeek() === "-" ? scnr.peek() : scnr.currentPeek(), ret = isNumberStart(ch);
          return scnr.resetPeek(), ret;
        }
        function isLiteralStart(scnr, context2) {
          const { currentType } = context2;
          if (currentType !== 2)
            return false;
          peekSpaces(scnr);
          const ret = scnr.currentPeek() === LITERAL_DELIMITER;
          return scnr.resetPeek(), ret;
        }
        function isLinkedDotStart(scnr, context2) {
          const { currentType } = context2;
          if (currentType !== 7)
            return false;
          peekSpaces(scnr);
          const ret = scnr.currentPeek() === ".";
          return scnr.resetPeek(), ret;
        }
        function isLinkedModifierStart(scnr, context2) {
          const { currentType } = context2;
          if (currentType !== 8)
            return false;
          peekSpaces(scnr);
          const ret = isIdentifierStart(scnr.currentPeek());
          return scnr.resetPeek(), ret;
        }
        function isLinkedDelimiterStart(scnr, context2) {
          const { currentType } = context2;
          if (!(currentType === 7 || currentType === 11))
            return false;
          peekSpaces(scnr);
          const ret = scnr.currentPeek() === ":";
          return scnr.resetPeek(), ret;
        }
        function isLinkedReferStart(scnr, context2) {
          const { currentType } = context2;
          if (currentType !== 9)
            return false;
          const fn = () => {
            const ch = scnr.currentPeek();
            return ch === "{" ? isIdentifierStart(scnr.peek()) : ch === "@" || ch === "|" || ch === ":" || ch === "." || ch === CHAR_SP || !ch ? false : ch === CHAR_LF ? (scnr.peek(), fn()) : isTextStart(scnr, false);
          }, ret = fn();
          return scnr.resetPeek(), ret;
        }
        function isPluralStart(scnr) {
          peekSpaces(scnr);
          const ret = scnr.currentPeek() === "|";
          return scnr.resetPeek(), ret;
        }
        function isTextStart(scnr, reset = true) {
          const fn = (hasSpace = false, prev = "") => {
            const ch = scnr.currentPeek();
            return ch === "{" || ch === "@" || !ch ? hasSpace : ch === "|" ? !(prev === CHAR_SP || prev === CHAR_LF) : ch === CHAR_SP ? (scnr.peek(), fn(true, CHAR_SP)) : ch === CHAR_LF ? (scnr.peek(), fn(true, CHAR_LF)) : true;
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
          const currentChar = scnr.currentChar();
          if (currentChar && currentChar !== "}" && currentChar !== EOF && currentChar !== CHAR_SP && currentChar !== CHAR_LF && currentChar !== "　") {
            const invalidPart = readInvalidIdentifier(scnr);
            return emitError(CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER, currentPosition(), 0, name + invalidPart), name + invalidPart;
          }
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
              ), context2.braceNest--, context2.braceNest > 0 && skipSpaces(scnr), context2.inLinked && context2.braceNest === 0 && (context2.inLinked = false), token;
            case "@":
              return context2.braceNest > 0 && emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0), token = readTokenInLinked(scnr, context2) || getEndToken(context2), context2.braceNest = 0, token;
            default: {
              let validNamedIdentifier = true, validListIdentifier = true, validLiteral = true;
              if (isPluralStart(scnr))
                return context2.braceNest > 0 && emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0), token = getToken(context2, 1, readPlural(scnr)), context2.braceNest = 0, context2.inLinked = false, token;
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
              ), context2.inLinked = true, token;
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
              return isPluralStart(scnr) ? (token = getToken(context2, 1, readPlural(scnr)), context2.braceNest = 0, context2.inLinked = false, token) : isLinkedDotStart(scnr, context2) || isLinkedDelimiterStart(scnr, context2) ? (skipSpaces(scnr), readTokenInLinked(scnr, context2)) : isLinkedModifierStart(scnr, context2) ? (skipSpaces(scnr), getToken(context2, 11, readLinkedModifier(scnr))) : isLinkedReferStart(scnr, context2) ? (skipSpaces(scnr), ch === "{" ? readTokenInPlaceholder(scnr, context2) || token : getToken(context2, 10, readLinkedRefer(scnr))) : (currentType === 7 && emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0), context2.braceNest = 0, context2.inLinked = false, readToken(scnr, context2));
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
                return token = getToken(context2, 1, readPlural(scnr)), context2.braceNest = 0, context2.inLinked = false, token;
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
      function fromEscapeSequence(match, codePoint4, codePoint6) {
        switch (match) {
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
        const location2 = options.location !== false, { onError } = options;
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
        const { filename, breakLineCode, needIndent: _needIndent } = options, location2 = options.location !== false, _context = {
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
        function _newline(n, withBreakLine = true) {
          const _breakLineCode = withBreakLine ? breakLineCode : "";
          push(_needIndent ? _breakLineCode + "  ".repeat(n) : _breakLineCode);
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
        const mode = isString(options.mode) ? options.mode : "normal", filename = isString(options.filename) ? options.filename : "message.intl";
        options.sourceMap;
        const breakLineCode = options.breakLineCode != null ? options.breakLineCode : mode === "arrow" ? ";" : `
`, needIndent = options.needIndent ? options.needIndent : mode !== "arrow", helpers = ast.helpers || [], generator = createCodeGenerator(ast, {
          filename,
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
        const assignedOptions = assign({}, options), jit = !!assignedOptions.jit, enalbeMinify = !!assignedOptions.minify, enambeOptimize = assignedOptions.optimize == null ? true : assignedOptions.optimize, ast = createParser(assignedOptions).parse(source);
        return jit ? (enambeOptimize && optimize(ast), enalbeMinify && minify(ast), { ast, code: "" }) : (transform(ast, assignedOptions), generate(ast, assignedOptions));
      }
      function initFeatureFlags$1() {
        typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (getGlobalThis().__INTLIFY_PROD_DEVTOOLS__ = false);
      }
      function isMessageAST(val) {
        return isObject$2(val) && resolveType(val) === 0 && (hasOwn(val, "b") || hasOwn(val, "body"));
      }
      const PROPS_BODY = ["b", "body"];
      function resolveBody(node) {
        return resolveProps(node, PROPS_BODY);
      }
      const PROPS_CASES = ["c", "cases"];
      function resolveCases(node) {
        return resolveProps(node, PROPS_CASES, []);
      }
      const PROPS_STATIC = ["s", "static"];
      function resolveStatic(node) {
        return resolveProps(node, PROPS_STATIC);
      }
      const PROPS_ITEMS = ["i", "items"];
      function resolveItems(node) {
        return resolveProps(node, PROPS_ITEMS, []);
      }
      const PROPS_TYPE = ["t", "type"];
      function resolveType(node) {
        return resolveProps(node, PROPS_TYPE);
      }
      const PROPS_VALUE = ["v", "value"];
      function resolveValue$1(node, type) {
        const resolved = resolveProps(node, PROPS_VALUE);
        if (resolved != null)
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
      const AST_NODE_PROPS_KEYS = [
        ...PROPS_BODY,
        ...PROPS_CASES,
        ...PROPS_STATIC,
        ...PROPS_ITEMS,
        ...PROPS_KEY,
        ...PROPS_MODIFIER,
        ...PROPS_VALUE,
        ...PROPS_TYPE
      ];
      function createUnhandleNodeError(type) {
        return new Error(`unhandled node type: ${type}`);
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
      function formatMessageParts(ctx, node) {
        const static_ = resolveStatic(node);
        if (static_ != null)
          return ctx.type === "text" ? static_ : ctx.normalize([static_]);
        {
          const messages = resolveItems(node).reduce((acm, c) => [...acm, formatMessagePart(ctx, c)], []);
          return ctx.normalize(messages);
        }
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
      const defaultOnCacheKey = (message) => message;
      let compileCache = create();
      function baseCompile(message, options = {}) {
        let detectError = false;
        const onError = options.onError || defaultOnError;
        return options.onError = (err) => {
          detectError = true, onError(err);
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
            location: false,
            jit: true
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
        if (isFunction(locale)) {
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
          ...isArray(fallback) ? fallback : isObject$2(fallback) ? Object.keys(fallback) : isString(fallback) ? [fallback] : [start]
        ])];
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
        return path.charAt(0) === "0" && isNaN(parseInt(path)) ? false : isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
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
            if (subPathDepth = 0, key === void 0 || (key = formatSubPath(key), key === false))
              return false;
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
            ](), true;
        }
        for (; mode !== null; )
          if (index++, c = path[index], !(c === "\\" && maybeUnescapeQuote())) {
            if (type = getPathCharType(c), typeMap = pathStateMachine[mode], transition = typeMap[type] || typeMap.l || 8, transition === 8 || (mode = transition[0], transition[1] !== void 0 && (action = actions[transition[1]], action && (newChar = c, action() === false))))
              return;
            if (mode === 7)
              return keys2;
          }
      }
      const cache = /* @__PURE__ */ new Map();
      function resolveWithKeyValue(obj, path) {
        return isObject$2(obj) ? obj[path] : null;
      }
      function resolveValue(obj, path) {
        if (!isObject$2(obj))
          return null;
        let hit = cache.get(path);
        if (hit || (hit = parse(path), hit && cache.set(path, hit)), !hit)
          return null;
        const len = hit.length;
        let last2 = obj, i = 0;
        for (; i < len; ) {
          const key = hit[i];
          if (AST_NODE_PROPS_KEYS.includes(key) && isMessageAST(last2))
            return null;
          const val = last2[key];
          if (val === void 0 || isFunction(last2))
            return null;
          last2 = val, i++;
        }
        return last2;
      }
      const VERSION$1 = "11.2.7", NOT_REOSLVED = -1, DEFAULT_LOCALE = "en-US", capitalize = (str) => `${str.charAt(0).toLocaleUpperCase()}${str.substr(1)}`;
      function getDefaultLinkedModifiers() {
        return {
          upper: (val, type) => type === "text" && isString(val) ? val.toUpperCase() : type === "vnode" && isObject$2(val) && "__v_isVNode" in val ? val.children.toUpperCase() : val,
          lower: (val, type) => type === "text" && isString(val) ? val.toLowerCase() : type === "vnode" && isObject$2(val) && "__v_isVNode" in val ? val.children.toLowerCase() : val,
          capitalize: (val, type) => type === "text" && isString(val) ? capitalize(val) : type === "vnode" && isObject$2(val) && "__v_isVNode" in val ? capitalize(val.children) : val
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
        const onWarn = isFunction(options.onWarn) ? options.onWarn : warn, version = isString(options.version) ? options.version : VERSION$1, locale = isString(options.locale) || isFunction(options.locale) ? options.locale : DEFAULT_LOCALE, _locale = isFunction(locale) ? DEFAULT_LOCALE : locale, fallbackLocale = isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || isString(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale, messages = isPlainObject(options.messages) ? options.messages : createResources(_locale), datetimeFormats = isPlainObject(options.datetimeFormats) ? options.datetimeFormats : createResources(_locale), numberFormats = isPlainObject(options.numberFormats) ? options.numberFormats : createResources(_locale), modifiers = assign(create(), options.modifiers, getDefaultLinkedModifiers()), pluralRules = options.pluralRules || create(), missing = isFunction(options.missing) ? options.missing : null, missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true, fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true, fallbackFormat = !!options.fallbackFormat, unresolving = !!options.unresolving, postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null, processor = isPlainObject(options.processor) ? options.processor : null, warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true, escapeParameter = !!options.escapeParameter, messageCompiler = isFunction(options.messageCompiler) ? options.messageCompiler : _compiler, messageResolver = isFunction(options.messageResolver) ? options.messageResolver : _resolver || resolveWithKeyValue, localeFallbacker = isFunction(options.localeFallbacker) ? options.localeFallbacker : fallbackWithSimple, fallbackContext = isObject$2(options.fallbackContext) ? options.fallbackContext : void 0, internalOptions = options, __datetimeFormatters = isObject$2(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map(), __numberFormatters = isObject$2(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map(), __meta = isObject$2(internalOptions.__meta) ? internalOptions.__meta : {};
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
      const createResources = (locale) => ({ [locale]: create() });
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
        return locale === compareLocale ? false : locale.split("-")[0] === compareLocale.split("-")[0];
      }
      function isImplicitFallback(targetLocale, locales) {
        const index = locales.indexOf(targetLocale);
        if (index === -1)
          return false;
        for (let i = index + 1; i < locales.length; i++)
          if (isAlmostSameLocale(targetLocale, locales[i]))
            return true;
        return false;
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
        const locale = options.locale, pluralIndex = getPluralIndex(options), pluralRule = isObject$2(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault, orgPluralRule = isObject$2(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? pluralDefault : void 0, plural = (messages) => messages[pluralRule(pluralIndex, messages.length, orgPluralRule)], _list = options.list || [], list = (index) => _list[index], _named = options.named || create();
        isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
        const named = (key) => _named[key];
        function message(key, useLinked) {
          const msg = isFunction(options.messages) ? options.messages(key, !!useLinked) : isObject$2(options.messages) ? options.messages[key] : false;
          return msg || (options.parent ? options.parent.message(key) : DEFAULT_MESSAGE);
        }
        const _modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER, normalize = isPlainObject(options.processor) && isFunction(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE, interpolate = isPlainObject(options.processor) && isFunction(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE, type = isPlainObject(options.processor) && isString(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE, ctx = {
          list,
          named,
          plural,
          linked: (key, ...args) => {
            const [arg1, arg2] = args;
            let type2 = "text", modifier = "";
            args.length === 1 ? isObject$2(arg1) ? (modifier = arg1.modifier || modifier, type2 = arg1.type || type2) : isString(arg1) && (modifier = arg1 || modifier) : args.length === 2 && (isString(arg1) && (modifier = arg1 || modifier), isString(arg2) && (type2 = arg2 || type2));
            const ret = message(key, true)(ctx), msg = (
              // The message in vnode resolved with linked are returned as an array by processor.nomalize
              type2 === "vnode" && isArray(ret) && modifier ? ret[0] : ret
            );
            return modifier ? _modifier(modifier)(msg, type2) : msg;
          },
          message,
          type,
          interpolate,
          normalize,
          values: assign(create(), _list, _named)
        };
        return ctx;
      }
      const NOOP_MESSAGE_FUNCTION = () => "", isMessageFunction = (val) => isFunction(val);
      function translate(context, ...args) {
        const { fallbackFormat, postTranslation, unresolving, messageCompiler, fallbackLocale, messages } = context, [key, options] = parseTranslateArgs(...args), missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn, fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn, escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter, resolvedMessage = !!options.resolvedMessage, defaultMsgOrKey = isString(options.default) || isBoolean(options.default) ? isBoolean(options.default) ? messageCompiler ? key : () => key : options.default : fallbackFormat ? messageCompiler ? key : () => key : null, enableDefaultMsg = fallbackFormat || defaultMsgOrKey != null && (isString(defaultMsgOrKey) || isFunction(defaultMsgOrKey)), locale = getLocale(context, options);
        escapeParameter && escapeParams(options);
        let [formatScope, targetLocale, message] = resolvedMessage ? [
          key,
          locale,
          messages[locale] || create()
        ] : resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn), format2 = formatScope, cacheBaseKey = key;
        if (!resolvedMessage && !(isString(format2) || isMessageAST(format2) || isMessageFunction(format2)) && enableDefaultMsg && (format2 = defaultMsgOrKey, cacheBaseKey = format2), !resolvedMessage && (!(isString(format2) || isMessageAST(format2) || isMessageFunction(format2)) || !isString(targetLocale)))
          return unresolving ? NOT_REOSLVED : key;
        let occurred = false;
        const onError = () => {
          occurred = true;
        }, msg = isMessageFunction(format2) ? format2 : compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError);
        if (occurred)
          return format2;
        const ctxOptions = getMessageContextOptions(context, targetLocale, message, options), msgContext = createMessageContext(ctxOptions), messaged = evaluateMessage(context, msg, msgContext);
        let ret = postTranslation ? postTranslation(messaged, key) : messaged;
        if (escapeParameter && isString(ret) && (ret = sanitizeTranslatedHtml(ret)), __INTLIFY_PROD_DEVTOOLS__) {
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
        isArray(options.list) ? options.list = options.list.map((item) => isString(item) ? escapeHtml(item) : item) : isObject$2(options.named) && Object.keys(options.named).forEach((key) => {
          isString(options.named[key]) && (options.named[key] = escapeHtml(options.named[key]));
        });
      }
      function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
        const { messages, onWarn, messageResolver: resolveValue2, localeFallbacker } = context, locales = localeFallbacker(context, fallbackLocale, locale);
        let message = create(), targetLocale, format2 = null;
        const type = "translate";
        for (let i = 0; i < locales.length && (targetLocale = locales[i], message = messages[targetLocale] || create(), (format2 = resolveValue2(message, key)) === null && (format2 = message[key]), !(isString(format2) || isMessageAST(format2) || isMessageFunction(format2))); i++)
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
          const msg2 = (() => format2);
          return msg2.locale = targetLocale, msg2.key = key, msg2;
        }
        const msg = messageCompiler(format2, getCompileContext(context, targetLocale, cacheBaseKey, format2, warnHtmlMessage, onError));
        return msg.locale = targetLocale, msg.key = key, msg.source = format2, msg;
      }
      function evaluateMessage(context, msg, msgCtx) {
        return msg(msgCtx);
      }
      function parseTranslateArgs(...args) {
        const [arg1, arg2, arg3] = args, options = create();
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
              let occurred = false;
              const msg = compileMessageFormat(context, key, locale, val, key, () => {
                occurred = true;
              });
              return occurred ? NOOP_MESSAGE_FUNCTION : msg;
            } else return isMessageFunction(val) ? val : NOOP_MESSAGE_FUNCTION;
          }
        };
        return context.processor && (ctxOptions.processor = context.processor), options.list && (ctxOptions.list = options.list), options.named && (ctxOptions.named = options.named), isNumber(options.plural) && (ctxOptions.pluralIndex = options.plural), ctxOptions;
      }
      initFeatureFlags$1();
      const VERSION = "11.2.7";
      function initFeatureFlags() {
        typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (getGlobalThis().__INTLIFY_PROD_DEVTOOLS__ = false);
      }
      const I18nErrorCodes = {
        // composer module errors
        UNEXPECTED_RETURN_TYPE: CORE_ERROR_CODES_EXTEND_POINT,
        // i18n module errors
        MUST_BE_CALL_SETUP_TOP: 26,
        NOT_INSTALLED: 27,
        NOT_INSTALLED_WITH_PROVIDE: 31,
        // unexpected error
        UNEXPECTED_ERROR: 32
      };
      function createI18nError(code, ...args) {
        return createCompileError(code, null, void 0);
      }
      const SetPluralRulesSymbol = makeSymbol("__setPluralRules"), DisposeSymbol = /* @__PURE__ */ makeSymbol("__dispose");
      function handleFlatJson(obj) {
        if (!isObject$2(obj) || isMessageAST(obj))
          return obj;
        for (const key in obj)
          if (hasOwn(obj, key))
            if (!key.includes("."))
              isObject$2(obj[key]) && handleFlatJson(obj[key]);
            else {
              const subKeys = key.split("."), lastIndex = subKeys.length - 1;
              let currentObj = obj, hasStringValue = false;
              for (let i = 0; i < lastIndex; i++) {
                if (subKeys[i] === "__proto__")
                  throw new Error(`unsafe key: ${subKeys[i]}`);
                if (subKeys[i] in currentObj || (currentObj[subKeys[i]] = create()), !isObject$2(currentObj[subKeys[i]])) {
                  hasStringValue = true;
                  break;
                }
                currentObj = currentObj[subKeys[i]];
              }
              if (hasStringValue || (isMessageAST(currentObj) ? AST_NODE_PROPS_KEYS.includes(subKeys[lastIndex]) || delete obj[key] : (currentObj[subKeys[lastIndex]] = obj[key], delete obj[key])), !isMessageAST(currentObj)) {
                const target = currentObj[subKeys[lastIndex]];
                isObject$2(target) && handleFlatJson(target);
              }
            }
        return obj;
      }
      function getLocaleMessages(locale, options) {
        const { messages, __i18n, messageResolver, flatJson } = options, ret = isPlainObject(messages) ? messages : isArray(__i18n) ? create() : { [locale]: create() };
        if (isArray(__i18n) && __i18n.forEach((custom) => {
          if ("locale" in custom && "resource" in custom) {
            const { locale: locale2, resource: resource2 } = custom;
            locale2 ? (ret[locale2] = ret[locale2] || create(), deepCopy(resource2, ret[locale2])) : deepCopy(resource2, ret);
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
        let messages = isObject$2(options.messages) ? options.messages : create();
        "__i18nGlobal" in componentOptions && (messages = getLocaleMessages(gl.locale.value, {
          messages,
          __i18n: componentOptions.__i18nGlobal
        }));
        const locales = Object.keys(messages);
        locales.length && locales.forEach((locale) => {
          gl.mergeLocaleMessage(locale, messages[locale]);
        });
      }
      function getCurrentInstance() {
        const key = "currentInstance";
        return key in Vue__namespace ? Vue__namespace[key] : Vue__namespace.getCurrentInstance();
      }
      let composerID = 0;
      function defineCoreMissingHandler(missing) {
        return ((ctx, locale, key, type) => missing(locale, key, getCurrentInstance() || void 0, type));
      }
      function createComposer(options = {}) {
        const { __root, __injectWithOption } = options, _isGlobal = __root === void 0, flatJson = options.flatJson, _ref = inBrowser ? Vue.ref : Vue.shallowRef;
        let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
        const _locale = _ref(
          // prettier-ignore
          __root && _inheritLocale ? __root.locale.value : isString(options.locale) ? options.locale : DEFAULT_LOCALE
        ), _fallbackLocale = _ref(
          // prettier-ignore
          __root && _inheritLocale ? __root.fallbackLocale.value : isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
        ), _messages = _ref(getLocaleMessages(_locale.value, options));
        let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true, _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true, _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true, _fallbackFormat = !!options.fallbackFormat, _missing = isFunction(options.missing) ? options.missing : null, _runtimeMissing = isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null, _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null, _warnHtmlMessage = __root ? __root.warnHtmlMessage : isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true, _escapeParameter = !!options.escapeParameter;
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
            unresolving: true,
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
        const locale = Vue.computed({
          get: () => _locale.value,
          set: (val) => {
            _context.locale = val, _locale.value = val;
          }
        }), fallbackLocale = Vue.computed({
          get: () => _fallbackLocale.value,
          set: (val) => {
            _context.fallbackLocale = val, _fallbackLocale.value = val, updateFallbackLocale(_context, _locale.value, val);
          }
        }), messages = Vue.computed(() => _messages.value);
        function getPostTranslationHandler() {
          return isFunction(_postTranslation) ? _postTranslation : null;
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
        return composerID++, __root && inBrowser && (Vue.watch(__root.locale, (val) => {
          _inheritLocale && (_locale.value = val, _context.locale = val, updateFallbackLocale(_context, _locale.value, _fallbackLocale.value));
        }), Vue.watch(__root.fallbackLocale, (val) => {
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
        const __globalInjection = isBoolean(options.globalInjection) ? options.globalInjection : true, __instances = /* @__PURE__ */ new Map(), [globalScope, __global] = createGlobal(options), symbol = /* @__PURE__ */ makeSymbol("");
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
        const instance = getCurrentInstance();
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
        const scope = Vue.effectScope(), obj = scope.run(() => createComposer(options));
        if (obj == null)
          throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
        return [scope, obj];
      }
      function getI18nInstance(instance) {
        const i18n2 = Vue.inject(instance.isCE ? I18nInjectionKey : instance.appContext.app.__VUE_I18N_SYMBOL__);
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
      function getComposer(i18n2, target, useComponent = false) {
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
      function getParentComponentInstance(target, useComponent = false) {
        return target == null ? null : useComponent && target.vnode.ctx || target.parent;
      }
      function setupLifeCycle(i18n2, target, composer) {
        Vue.onMounted(() => {
        }, target), Vue.onUnmounted(() => {
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
          const wrap2 = Vue.isRef(desc.value) ? {
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
      initFeatureFlags();
      registerMessageCompiler(compile);
      if (__INTLIFY_PROD_DEVTOOLS__) {
        const target = getGlobalThis();
        target.__INTLIFY__ = true, setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
      }
      const _sfc_main$3 = /* @__PURE__ */ Vue.defineComponent({
        __name: "ConfirmPopup",
        emits: ["confirm"],
        setup(__props, { emit: __emit }) {
          const emit = __emit, { t: t2 } = useI18n();
          return (_ctx, _cache) => (Vue.openBlock(), Vue.createBlock(Vue.unref(elementPlus.ElPopconfirm), {
            title: Vue.unref(t2)("confirmPopup.title"),
            "confirm-button-text": Vue.unref(t2)("confirmPopup.yes"),
            "cancel-button-text": Vue.unref(t2)("confirmPopup.no"),
            placement: "top",
            onConfirm: _cache[0] || (_cache[0] = (...args) => emit("confirm", ...args))
          }, {
            reference: Vue.withCtx(() => [
              Vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["title", "confirm-button-text", "cancel-button-text"]));
        }
      });
      var FileSaver_min$1 = { exports: {} }, FileSaver_min = FileSaver_min$1.exports, hasRequiredFileSaver_min;
      function requireFileSaver_min() {
        return hasRequiredFileSaver_min || (hasRequiredFileSaver_min = 1, (function(module2, exports$1) {
          (function(a, b) {
            b();
          })(FileSaver_min, function() {
            function b(a2, b2) {
              return typeof b2 > "u" ? b2 = { autoBom: false } : typeof b2 != "object" && (console.warn("Deprecated: Expected third argument to be a object"), b2 = { autoBom: !b2 }), b2.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a2.type) ? new Blob(["\uFEFF", a2], { type: a2.type }) : a2;
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
              } catch {
              }
              return 200 <= b2.status && 299 >= b2.status;
            }
            function e(a2) {
              try {
                a2.dispatchEvent(new MouseEvent("click"));
              } catch {
                var b2 = document.createEvent("MouseEvents");
                b2.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null), a2.dispatchEvent(b2);
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
        })(FileSaver_min$1)), FileSaver_min$1.exports;
      }
      var FileSaver_minExports = requireFileSaver_min();
      function commonjsRequire(path) {
        throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
      }
      var localforage$1 = { exports: {} };
      var hasRequiredLocalforage;
      function requireLocalforage() {
        return hasRequiredLocalforage || (hasRequiredLocalforage = 1, (function(module2, exports$1) {
          (function(f) {
            module2.exports = f();
          })(function() {
            return (function e(t2, n, r) {
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
                    return s(n2 || e2);
                  }, l, l.exports, e, t2, n, r);
                }
                return n[o2].exports;
              }
              for (var i = typeof commonjsRequire == "function" && commonjsRequire, o = 0; o < r.length; o++) s(r[o]);
              return s;
            })({ 1: [function(_dereq_, module3, exports$12) {
              (function(global2) {
                var Mutation = global2.MutationObserver || global2.WebKitMutationObserver, scheduleDrain;
                if (Mutation) {
                  var called = 0, observer = new Mutation(nextTick2), element = global2.document.createTextNode("");
                  observer.observe(element, {
                    characterData: true
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
                  draining = true;
                  for (var i, oldQueue, len = queue.length; len; ) {
                    for (oldQueue = queue, queue = [], i = -1; ++i < len; )
                      oldQueue[i]();
                    len = queue.length;
                  }
                  draining = false;
                }
                module3.exports = immediate;
                function immediate(task) {
                  queue.push(task) === 1 && !draining && scheduleDrain();
                }
              }).call(this, typeof commonjsGlobal < "u" ? commonjsGlobal : typeof self < "u" ? self : typeof window < "u" ? window : {});
            }, {}], 2: [function(_dereq_, module3, exports$12) {
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
                var called = false;
                function onError(value) {
                  called || (called = true, handlers2.reject(self2, value));
                }
                function onSuccess(value) {
                  called || (called = true, handlers2.resolve(self2, value));
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
                var len = iterable.length, called = false;
                if (!len)
                  return this.resolve([]);
                for (var values2 = new Array(len), resolved = 0, i = -1, promise = new this(INTERNAL); ++i < len; )
                  allResolver(iterable[i], i);
                return promise;
                function allResolver(value, i2) {
                  self2.resolve(value).then(resolveFromAll, function(error) {
                    called || (called = true, handlers2.reject(promise, error));
                  });
                  function resolveFromAll(outValue) {
                    values2[i2] = outValue, ++resolved === len && !called && (called = true, handlers2.resolve(promise, values2));
                  }
                }
              }
              Promise2.race = race;
              function race(iterable) {
                var self2 = this;
                if (Object.prototype.toString.call(iterable) !== "[object Array]")
                  return this.reject(new TypeError("must be an array"));
                var len = iterable.length, called = false;
                if (!len)
                  return this.resolve([]);
                for (var i = -1, promise = new this(INTERNAL); ++i < len; )
                  resolver(iterable[i]);
                return promise;
                function resolver(value) {
                  self2.resolve(value).then(function(response) {
                    called || (called = true, handlers2.resolve(promise, response));
                  }, function(error) {
                    called || (called = true, handlers2.reject(promise, error));
                  });
                }
              }
            }, { 1: 1 }], 3: [function(_dereq_, module3, exports$12) {
              (function(global2) {
                typeof global2.Promise != "function" && (global2.Promise = _dereq_(2));
              }).call(this, typeof commonjsGlobal < "u" ? commonjsGlobal : typeof self < "u" ? self : typeof window < "u" ? window : {});
            }, { 2: 2 }], 4: [function(_dereq_, module3, exports$12) {
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
                  return false;
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
                    e.preventDefault(), e.stopPropagation(), resolve(false);
                  }, txn.oncomplete = function() {
                    var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/), matchedEdge = navigator.userAgent.match(/Edge\//);
                    resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
                  };
                }).catch(function() {
                  return false;
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
                return _getConnection(dbInfo, false);
              }
              function _getUpgradedConnection(dbInfo) {
                return _getConnection(dbInfo, true);
              }
              function _isUpgradeNeeded(dbInfo, defaultVersion) {
                if (!dbInfo.db)
                  return true;
                var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName), isDowngrade = dbInfo.version < dbInfo.db.version, isUpgrade = dbInfo.version > dbInfo.db.version;
                if (isDowngrade && (dbInfo.version !== defaultVersion && console.warn('The database "' + dbInfo.name + `" can't be downgraded from version ` + dbInfo.db.version + " to version " + dbInfo.version + "."), dbInfo.version = dbInfo.db.version), isUpgrade || isNewStore) {
                  if (isNewStore) {
                    var incVersion = dbInfo.db.version + 1;
                    incVersion > dbInfo.version && (dbInfo.version = incVersion);
                  }
                  return true;
                }
                return false;
              }
              function _encodeBlob(blob2) {
                return new Promise$12(function(resolve, reject) {
                  var reader = new FileReader();
                  reader.onerror = reject, reader.onloadend = function(e) {
                    var base64 = btoa(e.target.result || "");
                    resolve({
                      __local_forage_encoded_blob: true,
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
                  return false;
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
                  return true;
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
                    return true;
                  i++;
                }
                return false;
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
              var LocalForage = (function() {
                function LocalForage2(options) {
                  _classCallCheck(this, LocalForage2);
                  for (var driverTypeKey in DefaultDrivers)
                    if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                      var driver = DefaultDrivers[driverTypeKey], driverName = driver._driver;
                      this[driverTypeKey] = driverName, DefinedDrivers[driverName] || this.defineDriver(driver);
                    }
                  this._defaultConfig = extend({}, DefaultConfig), this._config = extend({}, this._defaultConfig, options), this._driverSet = null, this._initDriver = null, this._ready = false, this._dbInfo = null, this._wrapLibraryMethodsWithReady(), this.setDriver(this._config.driver).catch(function() {
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
                    return "driver" in options && options.driver ? this.setDriver(this._config.driver) : true;
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
              })(), localforage_js = new LocalForage();
              module3.exports = localforage_js;
            }, { 3: 3 }] }, {}, [4])(4);
          });
        })(localforage$1)), localforage$1.exports;
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
        return hasRequiredCrypt || (hasRequiredCrypt = 1, (function() {
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
        })()), crypt.exports;
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
        return hasRequiredMd5 || (hasRequiredMd5 = 1, (function() {
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
        })()), md5$1.exports;
      }
      var md5Exports = requireMd5();
      const md5 = /* @__PURE__ */ getDefaultExportFromCjs(md5Exports), dateTimeFormatter = new Intl.DateTimeFormat(void 0, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      }), numberFormatter = new Intl.NumberFormat(), removeIllegalFilenameChars = (name) => name.replace(/[/\\:*?"<>|]/g, "");
      const proxyMarker = /* @__PURE__ */ Symbol("Comlink.proxy"), createEndpoint = /* @__PURE__ */ Symbol("Comlink.endpoint"), releaseProxy = /* @__PURE__ */ Symbol("Comlink.releaseProxy"), finalizer = /* @__PURE__ */ Symbol("Comlink.finalizer"), throwMarker = /* @__PURE__ */ Symbol("Comlink.thrown"), isObject$1 = (val) => typeof val == "object" && val !== null || typeof val == "function", proxyTransferHandler = {
        canHandle: (val) => isObject$1(val) && val[proxyMarker],
        serialize(obj) {
          const { port1, port2 } = new MessageChannel();
          return expose(obj, port1), [port2, [port2]];
        },
        deserialize(port) {
          return port.start(), wrap(port);
        }
      }, throwTransferHandler = {
        canHandle: (value) => isObject$1(value) && throwMarker in value,
        serialize({ value }) {
          let serialized;
          return value instanceof Error ? serialized = {
            isError: true,
            value: {
              message: value.message,
              name: value.name,
              stack: value.stack
            }
          } : serialized = { isError: false, value }, [serialized, []];
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
            return true;
        return false;
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
        let isProxyReleased = false;
        const proxy2 = new Proxy(target, {
          get(_target, prop) {
            if (throwIfProxyReleased(isProxyReleased), prop === releaseProxy)
              return () => {
                unregisterProxy(proxy2), releaseEndpoint(ep), pendingListeners.clear(), isProxyReleased = true;
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
        return Object.assign(obj, { [proxyMarker]: true });
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
      const jsContent$1 = `(function(){"use strict";const Fe=Symbol("Comlink.proxy"),Je=Symbol("Comlink.endpoint"),et=Symbol("Comlink.releaseProxy"),Ie=Symbol("Comlink.finalizer"),_e=Symbol("Comlink.thrown"),Ne=R=>typeof R=="object"&&R!==null||typeof R=="function",tt={canHandle:R=>Ne(R)&&R[Fe],serialize(R){const{port1:$,port2:o}=new MessageChannel;return Oe(R,$),[o,[o]]},deserialize(R){return R.start(),at(R)}},rt={canHandle:R=>Ne(R)&&_e in R,serialize({value:R}){let $;return R instanceof Error?$={isError:!0,value:{message:R.message,name:R.name,stack:R.stack}}:$={isError:!1,value:R},[$,[]]},deserialize(R){throw R.isError?Object.assign(new Error(R.value.message),R.value):R.value}},De=new Map([["proxy",tt],["throw",rt]]);function ot(R,$){for(const o of R)if($===o||o==="*"||o instanceof RegExp&&o.test($))return!0;return!1}function Oe(R,$=globalThis,o=["*"]){$.addEventListener("message",function l(d){if(!d||!d.data)return;if(!ot(o,d.origin)){console.warn(\`Invalid origin '\${d.origin}' for comlink proxy\`);return}const{id:c,type:e,path:t}=Object.assign({path:[]},d.data),a=(d.data.argumentList||[]).map(pe);let h;try{const g=t.slice(0,-1).reduce((y,s)=>y[s],R),w=t.reduce((y,s)=>y[s],R);switch(e){case"GET":h=w;break;case"SET":g[t.slice(-1)[0]]=pe(d.data.value),h=!0;break;case"APPLY":h=w.apply(g,a);break;case"CONSTRUCT":{const y=new w(...a);h=lt(y)}break;case"ENDPOINT":{const{port1:y,port2:s}=new MessageChannel;Oe(R,s),h=Re(y,[y])}break;case"RELEASE":h=void 0;break;default:return}}catch(g){h={value:g,[_e]:0}}Promise.resolve(h).catch(g=>({value:g,[_e]:0})).then(g=>{const[w,y]=Pe(g);$.postMessage(Object.assign(Object.assign({},w),{id:c}),y),e==="RELEASE"&&($.removeEventListener("message",l),je($),Ie in R&&typeof R[Ie]=="function"&&R[Ie]())}).catch(g=>{const[w,y]=Pe({value:new TypeError("Unserializable return value"),[_e]:0});$.postMessage(Object.assign(Object.assign({},w),{id:c}),y)})}),$.start&&$.start()}function nt(R){return R.constructor.name==="MessagePort"}function je(R){nt(R)&&R.close()}function at(R,$){const o=new Map;return R.addEventListener("message",function(l){const{data:d}=l;if(!d||!d.id)return;const c=o.get(d.id);if(c)try{c(d)}finally{o.delete(d.id)}}),ze(R,o,[],$)}function Be(R){if(R)throw new Error("Proxy has been released and is not useable")}function Ue(R){return ke(R,new Map,{type:"RELEASE"}).then(()=>{je(R)})}const ve=new WeakMap,Ce="FinalizationRegistry"in globalThis&&new FinalizationRegistry(R=>{const $=(ve.get(R)||0)-1;ve.set(R,$),$===0&&Ue(R)});function it(R,$){const o=(ve.get($)||0)+1;ve.set($,o),Ce&&Ce.register(R,$,R)}function st(R){Ce&&Ce.unregister(R)}function ze(R,$,o=[],l=function(){}){let d=!1;const c=new Proxy(l,{get(e,t){if(Be(d),t===et)return()=>{st(c),Ue(R),$.clear(),d=!0};if(t==="then"){if(o.length===0)return{then:()=>c};const a=ke(R,$,{type:"GET",path:o.map(h=>h.toString())}).then(pe);return a.then.bind(a)}return ze(R,$,[...o,t])},set(e,t,a){Be(d);const[h,g]=Pe(a);return ke(R,$,{type:"SET",path:[...o,t].map(w=>w.toString()),value:h},g).then(pe)},apply(e,t,a){Be(d);const h=o[o.length-1];if(h===Je)return ke(R,$,{type:"ENDPOINT"}).then(pe);if(h==="bind")return ze(R,$,o.slice(0,-1));const[g,w]=We(a);return ke(R,$,{type:"APPLY",path:o.map(y=>y.toString()),argumentList:g},w).then(pe)},construct(e,t){Be(d);const[a,h]=We(t);return ke(R,$,{type:"CONSTRUCT",path:o.map(g=>g.toString()),argumentList:a},h).then(pe)}});return it(c,R),c}function ct(R){return Array.prototype.concat.apply([],R)}function We(R){const $=R.map(Pe);return[$.map(o=>o[0]),ct($.map(o=>o[1]))]}const Ze=new WeakMap;function Re(R,$){return Ze.set(R,$),R}function lt(R){return Object.assign(R,{[Fe]:!0})}function Pe(R){for(const[$,o]of De)if(o.canHandle(R)){const[l,d]=o.serialize(R);return[{type:"HANDLER",name:$,value:l},d]}return[{type:"RAW",value:R},Ze.get(R)||[]]}function pe(R){switch(R.type){case"HANDLER":return De.get(R.name).deserialize(R.value);case"RAW":return R.value}}function ke(R,$,o,l){return new Promise(d=>{const c=dt();$.set(c,d),R.start&&R.start(),R.postMessage(Object.assign({id:c},o),l)})}function dt(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}var ge=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function qe(R){return R&&R.__esModule&&Object.prototype.hasOwnProperty.call(R,"default")?R.default:R}function xe(R){throw new Error('Could not dynamically require "'+R+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var He={exports:{}},$e;function ut(){return $e||($e=1,(function(R,$){(function(o){R.exports=o()})(function(){return(function o(l,d,c){function e(h,g){if(!d[h]){if(!l[h]){var w=typeof xe=="function"&&xe;if(!g&&w)return w(h,!0);if(t)return t(h,!0);var y=new Error("Cannot find module '"+h+"'");throw y.code="MODULE_NOT_FOUND",y}var s=d[h]={exports:{}};l[h][0].call(s.exports,function(b){var i=l[h][1][b];return e(i||b)},s,s.exports,o,l,d,c)}return d[h].exports}for(var t=typeof xe=="function"&&xe,a=0;a<c.length;a++)e(c[a]);return e})({1:[function(o,l,d){var c=o("./utils"),e=o("./support"),t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";d.encode=function(a){for(var h,g,w,y,s,b,i,m=[],u=0,p=a.length,B=p,P=c.getTypeOf(a)!=="string";u<a.length;)B=p-u,w=P?(h=a[u++],g=u<p?a[u++]:0,u<p?a[u++]:0):(h=a.charCodeAt(u++),g=u<p?a.charCodeAt(u++):0,u<p?a.charCodeAt(u++):0),y=h>>2,s=(3&h)<<4|g>>4,b=1<B?(15&g)<<2|w>>6:64,i=2<B?63&w:64,m.push(t.charAt(y)+t.charAt(s)+t.charAt(b)+t.charAt(i));return m.join("")},d.decode=function(a){var h,g,w,y,s,b,i=0,m=0,u="data:";if(a.substr(0,u.length)===u)throw new Error("Invalid base64 input, it looks like a data url.");var p,B=3*(a=a.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(a.charAt(a.length-1)===t.charAt(64)&&B--,a.charAt(a.length-2)===t.charAt(64)&&B--,B%1!=0)throw new Error("Invalid base64 input, bad content length.");for(p=e.uint8array?new Uint8Array(0|B):new Array(0|B);i<a.length;)h=t.indexOf(a.charAt(i++))<<2|(y=t.indexOf(a.charAt(i++)))>>4,g=(15&y)<<4|(s=t.indexOf(a.charAt(i++)))>>2,w=(3&s)<<6|(b=t.indexOf(a.charAt(i++))),p[m++]=h,s!==64&&(p[m++]=g),b!==64&&(p[m++]=w);return p}},{"./support":30,"./utils":32}],2:[function(o,l,d){var c=o("./external"),e=o("./stream/DataWorker"),t=o("./stream/Crc32Probe"),a=o("./stream/DataLengthProbe");function h(g,w,y,s,b){this.compressedSize=g,this.uncompressedSize=w,this.crc32=y,this.compression=s,this.compressedContent=b}h.prototype={getContentWorker:function(){var g=new e(c.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),w=this;return g.on("end",function(){if(this.streamInfo.data_length!==w.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),g},getCompressedWorker:function(){return new e(c.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},h.createWorkerFrom=function(g,w,y){return g.pipe(new t).pipe(new a("uncompressedSize")).pipe(w.compressWorker(y)).pipe(new a("compressedSize")).withStreamInfo("compression",w)},l.exports=h},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(o,l,d){var c=o("./stream/GenericWorker");d.STORE={magic:"\\0\\0",compressWorker:function(){return new c("STORE compression")},uncompressWorker:function(){return new c("STORE decompression")}},d.DEFLATE=o("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(o,l,d){var c=o("./utils"),e=(function(){for(var t,a=[],h=0;h<256;h++){t=h;for(var g=0;g<8;g++)t=1&t?3988292384^t>>>1:t>>>1;a[h]=t}return a})();l.exports=function(t,a){return t!==void 0&&t.length?c.getTypeOf(t)!=="string"?(function(h,g,w,y){var s=e,b=y+w;h^=-1;for(var i=y;i<b;i++)h=h>>>8^s[255&(h^g[i])];return-1^h})(0|a,t,t.length,0):(function(h,g,w,y){var s=e,b=y+w;h^=-1;for(var i=y;i<b;i++)h=h>>>8^s[255&(h^g.charCodeAt(i))];return-1^h})(0|a,t,t.length,0):0}},{"./utils":32}],5:[function(o,l,d){d.base64=!1,d.binary=!1,d.dir=!1,d.createFolders=!0,d.date=null,d.compression=null,d.compressionOptions=null,d.comment=null,d.unixPermissions=null,d.dosPermissions=null},{}],6:[function(o,l,d){var c=null;c=typeof Promise<"u"?Promise:o("lie"),l.exports={Promise:c}},{lie:37}],7:[function(o,l,d){var c=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Uint32Array<"u",e=o("pako"),t=o("./utils"),a=o("./stream/GenericWorker"),h=c?"uint8array":"array";function g(w,y){a.call(this,"FlateWorker/"+w),this._pako=null,this._pakoAction=w,this._pakoOptions=y,this.meta={}}d.magic="\\b\\0",t.inherits(g,a),g.prototype.processChunk=function(w){this.meta=w.meta,this._pako===null&&this._createPako(),this._pako.push(t.transformTo(h,w.data),!1)},g.prototype.flush=function(){a.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},g.prototype.cleanUp=function(){a.prototype.cleanUp.call(this),this._pako=null},g.prototype._createPako=function(){this._pako=new e[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var w=this;this._pako.onData=function(y){w.push({data:y,meta:w.meta})}},d.compressWorker=function(w){return new g("Deflate",w)},d.uncompressWorker=function(){return new g("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(o,l,d){function c(s,b){var i,m="";for(i=0;i<b;i++)m+=String.fromCharCode(255&s),s>>>=8;return m}function e(s,b,i,m,u,p){var B,P,C=s.file,L=s.compression,I=p!==h.utf8encode,D=t.transformTo("string",p(C.name)),O=t.transformTo("string",h.utf8encode(C.name)),j=C.comment,K=t.transformTo("string",p(j)),_=t.transformTo("string",h.utf8encode(j)),z=O.length!==C.name.length,n=_.length!==j.length,M="",J="",U="",ee=C.dir,W=C.date,Q={crc32:0,compressedSize:0,uncompressedSize:0};b&&!i||(Q.crc32=s.crc32,Q.compressedSize=s.compressedSize,Q.uncompressedSize=s.uncompressedSize);var E=0;b&&(E|=8),I||!z&&!n||(E|=2048);var S=0,Y=0;ee&&(S|=16),u==="UNIX"?(Y=798,S|=(function(H,ae){var le=H;return H||(le=ae?16893:33204),(65535&le)<<16})(C.unixPermissions,ee)):(Y=20,S|=(function(H){return 63&(H||0)})(C.dosPermissions)),B=W.getUTCHours(),B<<=6,B|=W.getUTCMinutes(),B<<=5,B|=W.getUTCSeconds()/2,P=W.getUTCFullYear()-1980,P<<=4,P|=W.getUTCMonth()+1,P<<=5,P|=W.getUTCDate(),z&&(J=c(1,1)+c(g(D),4)+O,M+="up"+c(J.length,2)+J),n&&(U=c(1,1)+c(g(K),4)+_,M+="uc"+c(U.length,2)+U);var G="";return G+=\`
\\0\`,G+=c(E,2),G+=L.magic,G+=c(B,2),G+=c(P,2),G+=c(Q.crc32,4),G+=c(Q.compressedSize,4),G+=c(Q.uncompressedSize,4),G+=c(D.length,2),G+=c(M.length,2),{fileRecord:w.LOCAL_FILE_HEADER+G+D+M,dirRecord:w.CENTRAL_FILE_HEADER+c(Y,2)+G+c(K.length,2)+"\\0\\0\\0\\0"+c(S,4)+c(m,4)+D+M+K}}var t=o("../utils"),a=o("../stream/GenericWorker"),h=o("../utf8"),g=o("../crc32"),w=o("../signature");function y(s,b,i,m){a.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=b,this.zipPlatform=i,this.encodeFileName=m,this.streamFiles=s,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}t.inherits(y,a),y.prototype.push=function(s){var b=s.meta.percent||0,i=this.entriesCount,m=this._sources.length;this.accumulate?this.contentBuffer.push(s):(this.bytesWritten+=s.data.length,a.prototype.push.call(this,{data:s.data,meta:{currentFile:this.currentFile,percent:i?(b+100*(i-m-1))/i:100}}))},y.prototype.openedSource=function(s){this.currentSourceOffset=this.bytesWritten,this.currentFile=s.file.name;var b=this.streamFiles&&!s.file.dir;if(b){var i=e(s,b,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:i.fileRecord,meta:{percent:0}})}else this.accumulate=!0},y.prototype.closedSource=function(s){this.accumulate=!1;var b=this.streamFiles&&!s.file.dir,i=e(s,b,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(i.dirRecord),b)this.push({data:(function(m){return w.DATA_DESCRIPTOR+c(m.crc32,4)+c(m.compressedSize,4)+c(m.uncompressedSize,4)})(s),meta:{percent:100}});else for(this.push({data:i.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},y.prototype.flush=function(){for(var s=this.bytesWritten,b=0;b<this.dirRecords.length;b++)this.push({data:this.dirRecords[b],meta:{percent:100}});var i=this.bytesWritten-s,m=(function(u,p,B,P,C){var L=t.transformTo("string",C(P));return w.CENTRAL_DIRECTORY_END+"\\0\\0\\0\\0"+c(u,2)+c(u,2)+c(p,4)+c(B,4)+c(L.length,2)+L})(this.dirRecords.length,i,s,this.zipComment,this.encodeFileName);this.push({data:m,meta:{percent:100}})},y.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},y.prototype.registerPrevious=function(s){this._sources.push(s);var b=this;return s.on("data",function(i){b.processChunk(i)}),s.on("end",function(){b.closedSource(b.previous.streamInfo),b._sources.length?b.prepareNextSource():b.end()}),s.on("error",function(i){b.error(i)}),this},y.prototype.resume=function(){return!!a.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},y.prototype.error=function(s){var b=this._sources;if(!a.prototype.error.call(this,s))return!1;for(var i=0;i<b.length;i++)try{b[i].error(s)}catch{}return!0},y.prototype.lock=function(){a.prototype.lock.call(this);for(var s=this._sources,b=0;b<s.length;b++)s[b].lock()},l.exports=y},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(o,l,d){var c=o("../compressions"),e=o("./ZipFileWorker");d.generateWorker=function(t,a,h){var g=new e(a.streamFiles,h,a.platform,a.encodeFileName),w=0;try{t.forEach(function(y,s){w++;var b=(function(p,B){var P=p||B,C=c[P];if(!C)throw new Error(P+" is not a valid compression method !");return C})(s.options.compression,a.compression),i=s.options.compressionOptions||a.compressionOptions||{},m=s.dir,u=s.date;s._compressWorker(b,i).withStreamInfo("file",{name:y,dir:m,date:u,comment:s.comment||"",unixPermissions:s.unixPermissions,dosPermissions:s.dosPermissions}).pipe(g)}),g.entriesCount=w}catch(y){g.error(y)}return g}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(o,l,d){function c(){if(!(this instanceof c))return new c;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var e=new c;for(var t in this)typeof this[t]!="function"&&(e[t]=this[t]);return e}}(c.prototype=o("./object")).loadAsync=o("./load"),c.support=o("./support"),c.defaults=o("./defaults"),c.version="3.10.1",c.loadAsync=function(e,t){return new c().loadAsync(e,t)},c.external=o("./external"),l.exports=c},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(o,l,d){var c=o("./utils"),e=o("./external"),t=o("./utf8"),a=o("./zipEntries"),h=o("./stream/Crc32Probe"),g=o("./nodejsUtils");function w(y){return new e.Promise(function(s,b){var i=y.decompressed.getContentWorker().pipe(new h);i.on("error",function(m){b(m)}).on("end",function(){i.streamInfo.crc32!==y.decompressed.crc32?b(new Error("Corrupted zip : CRC32 mismatch")):s()}).resume()})}l.exports=function(y,s){var b=this;return s=c.extend(s||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:t.utf8decode}),g.isNode&&g.isStream(y)?e.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):c.prepareContent("the loaded zip file",y,!0,s.optimizedBinaryString,s.base64).then(function(i){var m=new a(s);return m.load(i),m}).then(function(i){var m=[e.Promise.resolve(i)],u=i.files;if(s.checkCRC32)for(var p=0;p<u.length;p++)m.push(w(u[p]));return e.Promise.all(m)}).then(function(i){for(var m=i.shift(),u=m.files,p=0;p<u.length;p++){var B=u[p],P=B.fileNameStr,C=c.resolve(B.fileNameStr);b.file(C,B.decompressed,{binary:!0,optimizedBinaryString:!0,date:B.date,dir:B.dir,comment:B.fileCommentStr.length?B.fileCommentStr:null,unixPermissions:B.unixPermissions,dosPermissions:B.dosPermissions,createFolders:s.createFolders}),B.dir||(b.file(C).unsafeOriginalName=P)}return m.zipComment.length&&(b.comment=m.zipComment),b})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(o,l,d){var c=o("../utils"),e=o("../stream/GenericWorker");function t(a,h){e.call(this,"Nodejs stream input adapter for "+a),this._upstreamEnded=!1,this._bindStream(h)}c.inherits(t,e),t.prototype._bindStream=function(a){var h=this;(this._stream=a).pause(),a.on("data",function(g){h.push({data:g,meta:{percent:0}})}).on("error",function(g){h.isPaused?this.generatedError=g:h.error(g)}).on("end",function(){h.isPaused?h._upstreamEnded=!0:h.end()})},t.prototype.pause=function(){return!!e.prototype.pause.call(this)&&(this._stream.pause(),!0)},t.prototype.resume=function(){return!!e.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},l.exports=t},{"../stream/GenericWorker":28,"../utils":32}],13:[function(o,l,d){var c=o("readable-stream").Readable;function e(t,a,h){c.call(this,a),this._helper=t;var g=this;t.on("data",function(w,y){g.push(w)||g._helper.pause(),h&&h(y)}).on("error",function(w){g.emit("error",w)}).on("end",function(){g.push(null)})}o("../utils").inherits(e,c),e.prototype._read=function(){this._helper.resume()},l.exports=e},{"../utils":32,"readable-stream":16}],14:[function(o,l,d){l.exports={isNode:typeof Buffer<"u",newBufferFrom:function(c,e){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(c,e);if(typeof c=="number")throw new Error('The "data" argument must not be a number');return new Buffer(c,e)},allocBuffer:function(c){if(Buffer.alloc)return Buffer.alloc(c);var e=new Buffer(c);return e.fill(0),e},isBuffer:function(c){return Buffer.isBuffer(c)},isStream:function(c){return c&&typeof c.on=="function"&&typeof c.pause=="function"&&typeof c.resume=="function"}}},{}],15:[function(o,l,d){function c(C,L,I){var D,O=t.getTypeOf(L),j=t.extend(I||{},g);j.date=j.date||new Date,j.compression!==null&&(j.compression=j.compression.toUpperCase()),typeof j.unixPermissions=="string"&&(j.unixPermissions=parseInt(j.unixPermissions,8)),j.unixPermissions&&16384&j.unixPermissions&&(j.dir=!0),j.dosPermissions&&16&j.dosPermissions&&(j.dir=!0),j.dir&&(C=u(C)),j.createFolders&&(D=m(C))&&p.call(this,D,!0);var K=O==="string"&&j.binary===!1&&j.base64===!1;I&&I.binary!==void 0||(j.binary=!K),(L instanceof w&&L.uncompressedSize===0||j.dir||!L||L.length===0)&&(j.base64=!1,j.binary=!0,L="",j.compression="STORE",O="string");var _=null;_=L instanceof w||L instanceof a?L:b.isNode&&b.isStream(L)?new i(C,L):t.prepareContent(C,L,j.binary,j.optimizedBinaryString,j.base64);var z=new y(C,_,j);this.files[C]=z}var e=o("./utf8"),t=o("./utils"),a=o("./stream/GenericWorker"),h=o("./stream/StreamHelper"),g=o("./defaults"),w=o("./compressedObject"),y=o("./zipObject"),s=o("./generate"),b=o("./nodejsUtils"),i=o("./nodejs/NodejsStreamInputAdapter"),m=function(C){C.slice(-1)==="/"&&(C=C.substring(0,C.length-1));var L=C.lastIndexOf("/");return 0<L?C.substring(0,L):""},u=function(C){return C.slice(-1)!=="/"&&(C+="/"),C},p=function(C,L){return L=L!==void 0?L:g.createFolders,C=u(C),this.files[C]||c.call(this,C,null,{dir:!0,createFolders:L}),this.files[C]};function B(C){return Object.prototype.toString.call(C)==="[object RegExp]"}var P={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(C){var L,I,D;for(L in this.files)D=this.files[L],(I=L.slice(this.root.length,L.length))&&L.slice(0,this.root.length)===this.root&&C(I,D)},filter:function(C){var L=[];return this.forEach(function(I,D){C(I,D)&&L.push(D)}),L},file:function(C,L,I){if(arguments.length!==1)return C=this.root+C,c.call(this,C,L,I),this;if(B(C)){var D=C;return this.filter(function(j,K){return!K.dir&&D.test(j)})}var O=this.files[this.root+C];return O&&!O.dir?O:null},folder:function(C){if(!C)return this;if(B(C))return this.filter(function(O,j){return j.dir&&C.test(O)});var L=this.root+C,I=p.call(this,L),D=this.clone();return D.root=I.name,D},remove:function(C){C=this.root+C;var L=this.files[C];if(L||(C.slice(-1)!=="/"&&(C+="/"),L=this.files[C]),L&&!L.dir)delete this.files[C];else for(var I=this.filter(function(O,j){return j.name.slice(0,C.length)===C}),D=0;D<I.length;D++)delete this.files[I[D].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(C){var L,I={};try{if((I=t.extend(C||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:e.utf8encode})).type=I.type.toLowerCase(),I.compression=I.compression.toUpperCase(),I.type==="binarystring"&&(I.type="string"),!I.type)throw new Error("No output type specified.");t.checkSupport(I.type),I.platform!=="darwin"&&I.platform!=="freebsd"&&I.platform!=="linux"&&I.platform!=="sunos"||(I.platform="UNIX"),I.platform==="win32"&&(I.platform="DOS");var D=I.comment||this.comment||"";L=s.generateWorker(this,I,D)}catch(O){(L=new a("error")).error(O)}return new h(L,I.type||"string",I.mimeType)},generateAsync:function(C,L){return this.generateInternalStream(C).accumulate(L)},generateNodeStream:function(C,L){return(C=C||{}).type||(C.type="nodebuffer"),this.generateInternalStream(C).toNodejsStream(L)}};l.exports=P},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(o,l,d){l.exports=o("stream")},{stream:void 0}],17:[function(o,l,d){var c=o("./DataReader");function e(t){c.call(this,t);for(var a=0;a<this.data.length;a++)t[a]=255&t[a]}o("../utils").inherits(e,c),e.prototype.byteAt=function(t){return this.data[this.zero+t]},e.prototype.lastIndexOfSignature=function(t){for(var a=t.charCodeAt(0),h=t.charCodeAt(1),g=t.charCodeAt(2),w=t.charCodeAt(3),y=this.length-4;0<=y;--y)if(this.data[y]===a&&this.data[y+1]===h&&this.data[y+2]===g&&this.data[y+3]===w)return y-this.zero;return-1},e.prototype.readAndCheckSignature=function(t){var a=t.charCodeAt(0),h=t.charCodeAt(1),g=t.charCodeAt(2),w=t.charCodeAt(3),y=this.readData(4);return a===y[0]&&h===y[1]&&g===y[2]&&w===y[3]},e.prototype.readData=function(t){if(this.checkOffset(t),t===0)return[];var a=this.data.slice(this.zero+this.index,this.zero+this.index+t);return this.index+=t,a},l.exports=e},{"../utils":32,"./DataReader":18}],18:[function(o,l,d){var c=o("../utils");function e(t){this.data=t,this.length=t.length,this.index=0,this.zero=0}e.prototype={checkOffset:function(t){this.checkIndex(this.index+t)},checkIndex:function(t){if(this.length<this.zero+t||t<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+t+"). Corrupted zip ?")},setIndex:function(t){this.checkIndex(t),this.index=t},skip:function(t){this.setIndex(this.index+t)},byteAt:function(){},readInt:function(t){var a,h=0;for(this.checkOffset(t),a=this.index+t-1;a>=this.index;a--)h=(h<<8)+this.byteAt(a);return this.index+=t,h},readString:function(t){return c.transformTo("string",this.readData(t))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var t=this.readInt(4);return new Date(Date.UTC(1980+(t>>25&127),(t>>21&15)-1,t>>16&31,t>>11&31,t>>5&63,(31&t)<<1))}},l.exports=e},{"../utils":32}],19:[function(o,l,d){var c=o("./Uint8ArrayReader");function e(t){c.call(this,t)}o("../utils").inherits(e,c),e.prototype.readData=function(t){this.checkOffset(t);var a=this.data.slice(this.zero+this.index,this.zero+this.index+t);return this.index+=t,a},l.exports=e},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(o,l,d){var c=o("./DataReader");function e(t){c.call(this,t)}o("../utils").inherits(e,c),e.prototype.byteAt=function(t){return this.data.charCodeAt(this.zero+t)},e.prototype.lastIndexOfSignature=function(t){return this.data.lastIndexOf(t)-this.zero},e.prototype.readAndCheckSignature=function(t){return t===this.readData(4)},e.prototype.readData=function(t){this.checkOffset(t);var a=this.data.slice(this.zero+this.index,this.zero+this.index+t);return this.index+=t,a},l.exports=e},{"../utils":32,"./DataReader":18}],21:[function(o,l,d){var c=o("./ArrayReader");function e(t){c.call(this,t)}o("../utils").inherits(e,c),e.prototype.readData=function(t){if(this.checkOffset(t),t===0)return new Uint8Array(0);var a=this.data.subarray(this.zero+this.index,this.zero+this.index+t);return this.index+=t,a},l.exports=e},{"../utils":32,"./ArrayReader":17}],22:[function(o,l,d){var c=o("../utils"),e=o("../support"),t=o("./ArrayReader"),a=o("./StringReader"),h=o("./NodeBufferReader"),g=o("./Uint8ArrayReader");l.exports=function(w){var y=c.getTypeOf(w);return c.checkSupport(y),y!=="string"||e.uint8array?y==="nodebuffer"?new h(w):e.uint8array?new g(c.transformTo("uint8array",w)):new t(c.transformTo("array",w)):new a(w)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(o,l,d){d.LOCAL_FILE_HEADER="PK",d.CENTRAL_FILE_HEADER="PK",d.CENTRAL_DIRECTORY_END="PK",d.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK\\x07",d.ZIP64_CENTRAL_DIRECTORY_END="PK",d.DATA_DESCRIPTOR="PK\\x07\\b"},{}],24:[function(o,l,d){var c=o("./GenericWorker"),e=o("../utils");function t(a){c.call(this,"ConvertWorker to "+a),this.destType=a}e.inherits(t,c),t.prototype.processChunk=function(a){this.push({data:e.transformTo(this.destType,a.data),meta:a.meta})},l.exports=t},{"../utils":32,"./GenericWorker":28}],25:[function(o,l,d){var c=o("./GenericWorker"),e=o("../crc32");function t(){c.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}o("../utils").inherits(t,c),t.prototype.processChunk=function(a){this.streamInfo.crc32=e(a.data,this.streamInfo.crc32||0),this.push(a)},l.exports=t},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(o,l,d){var c=o("../utils"),e=o("./GenericWorker");function t(a){e.call(this,"DataLengthProbe for "+a),this.propName=a,this.withStreamInfo(a,0)}c.inherits(t,e),t.prototype.processChunk=function(a){if(a){var h=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=h+a.data.length}e.prototype.processChunk.call(this,a)},l.exports=t},{"../utils":32,"./GenericWorker":28}],27:[function(o,l,d){var c=o("../utils"),e=o("./GenericWorker");function t(a){e.call(this,"DataWorker");var h=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,a.then(function(g){h.dataIsReady=!0,h.data=g,h.max=g&&g.length||0,h.type=c.getTypeOf(g),h.isPaused||h._tickAndRepeat()},function(g){h.error(g)})}c.inherits(t,e),t.prototype.cleanUp=function(){e.prototype.cleanUp.call(this),this.data=null},t.prototype.resume=function(){return!!e.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,c.delay(this._tickAndRepeat,[],this)),!0)},t.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(c.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},t.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var a=null,h=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":a=this.data.substring(this.index,h);break;case"uint8array":a=this.data.subarray(this.index,h);break;case"array":case"nodebuffer":a=this.data.slice(this.index,h)}return this.index=h,this.push({data:a,meta:{percent:this.max?this.index/this.max*100:0}})},l.exports=t},{"../utils":32,"./GenericWorker":28}],28:[function(o,l,d){function c(e){this.name=e||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}c.prototype={push:function(e){this.emit("data",e)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(e){this.emit("error",e)}return!0},error:function(e){return!this.isFinished&&(this.isPaused?this.generatedError=e:(this.isFinished=!0,this.emit("error",e),this.previous&&this.previous.error(e),this.cleanUp()),!0)},on:function(e,t){return this._listeners[e].push(t),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(e,t){if(this._listeners[e])for(var a=0;a<this._listeners[e].length;a++)this._listeners[e][a].call(this,t)},pipe:function(e){return e.registerPrevious(this)},registerPrevious:function(e){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=e.streamInfo,this.mergeStreamInfo(),this.previous=e;var t=this;return e.on("data",function(a){t.processChunk(a)}),e.on("end",function(){t.end()}),e.on("error",function(a){t.error(a)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var e=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),e=!0),this.previous&&this.previous.resume(),!e},flush:function(){},processChunk:function(e){this.push(e)},withStreamInfo:function(e,t){return this.extraStreamInfo[e]=t,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var e in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,e)&&(this.streamInfo[e]=this.extraStreamInfo[e])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var e="Worker "+this.name;return this.previous?this.previous+" -> "+e:e}},l.exports=c},{}],29:[function(o,l,d){var c=o("../utils"),e=o("./ConvertWorker"),t=o("./GenericWorker"),a=o("../base64"),h=o("../support"),g=o("../external"),w=null;if(h.nodestream)try{w=o("../nodejs/NodejsStreamOutputAdapter")}catch{}function y(b,i){return new g.Promise(function(m,u){var p=[],B=b._internalType,P=b._outputType,C=b._mimeType;b.on("data",function(L,I){p.push(L),i&&i(I)}).on("error",function(L){p=[],u(L)}).on("end",function(){try{var L=(function(I,D,O){switch(I){case"blob":return c.newBlob(c.transformTo("arraybuffer",D),O);case"base64":return a.encode(D);default:return c.transformTo(I,D)}})(P,(function(I,D){var O,j=0,K=null,_=0;for(O=0;O<D.length;O++)_+=D[O].length;switch(I){case"string":return D.join("");case"array":return Array.prototype.concat.apply([],D);case"uint8array":for(K=new Uint8Array(_),O=0;O<D.length;O++)K.set(D[O],j),j+=D[O].length;return K;case"nodebuffer":return Buffer.concat(D);default:throw new Error("concat : unsupported type '"+I+"'")}})(B,p),C);m(L)}catch(I){u(I)}p=[]}).resume()})}function s(b,i,m){var u=i;switch(i){case"blob":case"arraybuffer":u="uint8array";break;case"base64":u="string"}try{this._internalType=u,this._outputType=i,this._mimeType=m,c.checkSupport(u),this._worker=b.pipe(new e(u)),b.lock()}catch(p){this._worker=new t("error"),this._worker.error(p)}}s.prototype={accumulate:function(b){return y(this,b)},on:function(b,i){var m=this;return b==="data"?this._worker.on(b,function(u){i.call(m,u.data,u.meta)}):this._worker.on(b,function(){c.delay(i,arguments,m)}),this},resume:function(){return c.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(b){if(c.checkSupport("nodestream"),this._outputType!=="nodebuffer")throw new Error(this._outputType+" is not supported by this method");return new w(this,{objectMode:this._outputType!=="nodebuffer"},b)}},l.exports=s},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(o,l,d){if(d.base64=!0,d.array=!0,d.string=!0,d.arraybuffer=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u",d.nodebuffer=typeof Buffer<"u",d.uint8array=typeof Uint8Array<"u",typeof ArrayBuffer>"u")d.blob=!1;else{var c=new ArrayBuffer(0);try{d.blob=new Blob([c],{type:"application/zip"}).size===0}catch{try{var e=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);e.append(c),d.blob=e.getBlob("application/zip").size===0}catch{d.blob=!1}}}try{d.nodestream=!!o("readable-stream").Readable}catch{d.nodestream=!1}},{"readable-stream":16}],31:[function(o,l,d){for(var c=o("./utils"),e=o("./support"),t=o("./nodejsUtils"),a=o("./stream/GenericWorker"),h=new Array(256),g=0;g<256;g++)h[g]=252<=g?6:248<=g?5:240<=g?4:224<=g?3:192<=g?2:1;h[254]=h[254]=1;function w(){a.call(this,"utf-8 decode"),this.leftOver=null}function y(){a.call(this,"utf-8 encode")}d.utf8encode=function(s){return e.nodebuffer?t.newBufferFrom(s,"utf-8"):(function(b){var i,m,u,p,B,P=b.length,C=0;for(p=0;p<P;p++)(64512&(m=b.charCodeAt(p)))==55296&&p+1<P&&(64512&(u=b.charCodeAt(p+1)))==56320&&(m=65536+(m-55296<<10)+(u-56320),p++),C+=m<128?1:m<2048?2:m<65536?3:4;for(i=e.uint8array?new Uint8Array(C):new Array(C),p=B=0;B<C;p++)(64512&(m=b.charCodeAt(p)))==55296&&p+1<P&&(64512&(u=b.charCodeAt(p+1)))==56320&&(m=65536+(m-55296<<10)+(u-56320),p++),m<128?i[B++]=m:(m<2048?i[B++]=192|m>>>6:(m<65536?i[B++]=224|m>>>12:(i[B++]=240|m>>>18,i[B++]=128|m>>>12&63),i[B++]=128|m>>>6&63),i[B++]=128|63&m);return i})(s)},d.utf8decode=function(s){return e.nodebuffer?c.transformTo("nodebuffer",s).toString("utf-8"):(function(b){var i,m,u,p,B=b.length,P=new Array(2*B);for(i=m=0;i<B;)if((u=b[i++])<128)P[m++]=u;else if(4<(p=h[u]))P[m++]=65533,i+=p-1;else{for(u&=p===2?31:p===3?15:7;1<p&&i<B;)u=u<<6|63&b[i++],p--;1<p?P[m++]=65533:u<65536?P[m++]=u:(u-=65536,P[m++]=55296|u>>10&1023,P[m++]=56320|1023&u)}return P.length!==m&&(P.subarray?P=P.subarray(0,m):P.length=m),c.applyFromCharCode(P)})(s=c.transformTo(e.uint8array?"uint8array":"array",s))},c.inherits(w,a),w.prototype.processChunk=function(s){var b=c.transformTo(e.uint8array?"uint8array":"array",s.data);if(this.leftOver&&this.leftOver.length){if(e.uint8array){var i=b;(b=new Uint8Array(i.length+this.leftOver.length)).set(this.leftOver,0),b.set(i,this.leftOver.length)}else b=this.leftOver.concat(b);this.leftOver=null}var m=(function(p,B){var P;for((B=B||p.length)>p.length&&(B=p.length),P=B-1;0<=P&&(192&p[P])==128;)P--;return P<0||P===0?B:P+h[p[P]]>B?P:B})(b),u=b;m!==b.length&&(e.uint8array?(u=b.subarray(0,m),this.leftOver=b.subarray(m,b.length)):(u=b.slice(0,m),this.leftOver=b.slice(m,b.length))),this.push({data:d.utf8decode(u),meta:s.meta})},w.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:d.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},d.Utf8DecodeWorker=w,c.inherits(y,a),y.prototype.processChunk=function(s){this.push({data:d.utf8encode(s.data),meta:s.meta})},d.Utf8EncodeWorker=y},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(o,l,d){var c=o("./support"),e=o("./base64"),t=o("./nodejsUtils"),a=o("./external");function h(i){return i}function g(i,m){for(var u=0;u<i.length;++u)m[u]=255&i.charCodeAt(u);return m}o("setimmediate"),d.newBlob=function(i,m){d.checkSupport("blob");try{return new Blob([i],{type:m})}catch{try{var u=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return u.append(i),u.getBlob(m)}catch{throw new Error("Bug : can't construct the Blob.")}}};var w={stringifyByChunk:function(i,m,u){var p=[],B=0,P=i.length;if(P<=u)return String.fromCharCode.apply(null,i);for(;B<P;)m==="array"||m==="nodebuffer"?p.push(String.fromCharCode.apply(null,i.slice(B,Math.min(B+u,P)))):p.push(String.fromCharCode.apply(null,i.subarray(B,Math.min(B+u,P)))),B+=u;return p.join("")},stringifyByChar:function(i){for(var m="",u=0;u<i.length;u++)m+=String.fromCharCode(i[u]);return m},applyCanBeUsed:{uint8array:(function(){try{return c.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch{return!1}})(),nodebuffer:(function(){try{return c.nodebuffer&&String.fromCharCode.apply(null,t.allocBuffer(1)).length===1}catch{return!1}})()}};function y(i){var m=65536,u=d.getTypeOf(i),p=!0;if(u==="uint8array"?p=w.applyCanBeUsed.uint8array:u==="nodebuffer"&&(p=w.applyCanBeUsed.nodebuffer),p)for(;1<m;)try{return w.stringifyByChunk(i,u,m)}catch{m=Math.floor(m/2)}return w.stringifyByChar(i)}function s(i,m){for(var u=0;u<i.length;u++)m[u]=i[u];return m}d.applyFromCharCode=y;var b={};b.string={string:h,array:function(i){return g(i,new Array(i.length))},arraybuffer:function(i){return b.string.uint8array(i).buffer},uint8array:function(i){return g(i,new Uint8Array(i.length))},nodebuffer:function(i){return g(i,t.allocBuffer(i.length))}},b.array={string:y,array:h,arraybuffer:function(i){return new Uint8Array(i).buffer},uint8array:function(i){return new Uint8Array(i)},nodebuffer:function(i){return t.newBufferFrom(i)}},b.arraybuffer={string:function(i){return y(new Uint8Array(i))},array:function(i){return s(new Uint8Array(i),new Array(i.byteLength))},arraybuffer:h,uint8array:function(i){return new Uint8Array(i)},nodebuffer:function(i){return t.newBufferFrom(new Uint8Array(i))}},b.uint8array={string:y,array:function(i){return s(i,new Array(i.length))},arraybuffer:function(i){return i.buffer},uint8array:h,nodebuffer:function(i){return t.newBufferFrom(i)}},b.nodebuffer={string:y,array:function(i){return s(i,new Array(i.length))},arraybuffer:function(i){return b.nodebuffer.uint8array(i).buffer},uint8array:function(i){return s(i,new Uint8Array(i.length))},nodebuffer:h},d.transformTo=function(i,m){if(m=m||"",!i)return m;d.checkSupport(i);var u=d.getTypeOf(m);return b[u][i](m)},d.resolve=function(i){for(var m=i.split("/"),u=[],p=0;p<m.length;p++){var B=m[p];B==="."||B===""&&p!==0&&p!==m.length-1||(B===".."?u.pop():u.push(B))}return u.join("/")},d.getTypeOf=function(i){return typeof i=="string"?"string":Object.prototype.toString.call(i)==="[object Array]"?"array":c.nodebuffer&&t.isBuffer(i)?"nodebuffer":c.uint8array&&i instanceof Uint8Array?"uint8array":c.arraybuffer&&i instanceof ArrayBuffer?"arraybuffer":void 0},d.checkSupport=function(i){if(!c[i.toLowerCase()])throw new Error(i+" is not supported by this platform")},d.MAX_VALUE_16BITS=65535,d.MAX_VALUE_32BITS=-1,d.pretty=function(i){var m,u,p="";for(u=0;u<(i||"").length;u++)p+="\\\\x"+((m=i.charCodeAt(u))<16?"0":"")+m.toString(16).toUpperCase();return p},d.delay=function(i,m,u){setImmediate(function(){i.apply(u||null,m||[])})},d.inherits=function(i,m){function u(){}u.prototype=m.prototype,i.prototype=new u},d.extend=function(){var i,m,u={};for(i=0;i<arguments.length;i++)for(m in arguments[i])Object.prototype.hasOwnProperty.call(arguments[i],m)&&u[m]===void 0&&(u[m]=arguments[i][m]);return u},d.prepareContent=function(i,m,u,p,B){return a.Promise.resolve(m).then(function(P){return c.blob&&(P instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(P))!==-1)&&typeof FileReader<"u"?new a.Promise(function(C,L){var I=new FileReader;I.onload=function(D){C(D.target.result)},I.onerror=function(D){L(D.target.error)},I.readAsArrayBuffer(P)}):P}).then(function(P){var C=d.getTypeOf(P);return C?(C==="arraybuffer"?P=d.transformTo("uint8array",P):C==="string"&&(B?P=e.decode(P):u&&p!==!0&&(P=(function(L){return g(L,c.uint8array?new Uint8Array(L.length):new Array(L.length))})(P))),P):a.Promise.reject(new Error("Can't read the data of '"+i+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(o,l,d){var c=o("./reader/readerFor"),e=o("./utils"),t=o("./signature"),a=o("./zipEntry"),h=o("./support");function g(w){this.files=[],this.loadOptions=w}g.prototype={checkSignature:function(w){if(!this.reader.readAndCheckSignature(w)){this.reader.index-=4;var y=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+e.pretty(y)+", expected "+e.pretty(w)+")")}},isSignature:function(w,y){var s=this.reader.index;this.reader.setIndex(w);var b=this.reader.readString(4)===y;return this.reader.setIndex(s),b},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var w=this.reader.readData(this.zipCommentLength),y=h.uint8array?"uint8array":"array",s=e.transformTo(y,w);this.zipComment=this.loadOptions.decodeFileName(s)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var w,y,s,b=this.zip64EndOfCentralSize-44;0<b;)w=this.reader.readInt(2),y=this.reader.readInt(4),s=this.reader.readData(y),this.zip64ExtensibleData[w]={id:w,length:y,value:s}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var w,y;for(w=0;w<this.files.length;w++)y=this.files[w],this.reader.setIndex(y.localHeaderOffset),this.checkSignature(t.LOCAL_FILE_HEADER),y.readLocalPart(this.reader),y.handleUTF8(),y.processAttributes()},readCentralDir:function(){var w;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(t.CENTRAL_FILE_HEADER);)(w=new a({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(w);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var w=this.reader.lastIndexOfSignature(t.CENTRAL_DIRECTORY_END);if(w<0)throw this.isSignature(0,t.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(w);var y=w;if(this.checkSignature(t.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===e.MAX_VALUE_16BITS||this.diskWithCentralDirStart===e.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===e.MAX_VALUE_16BITS||this.centralDirRecords===e.MAX_VALUE_16BITS||this.centralDirSize===e.MAX_VALUE_32BITS||this.centralDirOffset===e.MAX_VALUE_32BITS){if(this.zip64=!0,(w=this.reader.lastIndexOfSignature(t.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(w),this.checkSignature(t.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,t.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(t.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(t.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var s=this.centralDirOffset+this.centralDirSize;this.zip64&&(s+=20,s+=12+this.zip64EndOfCentralSize);var b=y-s;if(0<b)this.isSignature(y,t.CENTRAL_FILE_HEADER)||(this.reader.zero=b);else if(b<0)throw new Error("Corrupted zip: missing "+Math.abs(b)+" bytes.")},prepareReader:function(w){this.reader=c(w)},load:function(w){this.prepareReader(w),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},l.exports=g},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(o,l,d){var c=o("./reader/readerFor"),e=o("./utils"),t=o("./compressedObject"),a=o("./crc32"),h=o("./utf8"),g=o("./compressions"),w=o("./support");function y(s,b){this.options=s,this.loadOptions=b}y.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(s){var b,i;if(s.skip(22),this.fileNameLength=s.readInt(2),i=s.readInt(2),this.fileName=s.readData(this.fileNameLength),s.skip(i),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if((b=(function(m){for(var u in g)if(Object.prototype.hasOwnProperty.call(g,u)&&g[u].magic===m)return g[u];return null})(this.compressionMethod))===null)throw new Error("Corrupted zip : compression "+e.pretty(this.compressionMethod)+" unknown (inner file : "+e.transformTo("string",this.fileName)+")");this.decompressed=new t(this.compressedSize,this.uncompressedSize,this.crc32,b,s.readData(this.compressedSize))},readCentralPart:function(s){this.versionMadeBy=s.readInt(2),s.skip(2),this.bitFlag=s.readInt(2),this.compressionMethod=s.readString(2),this.date=s.readDate(),this.crc32=s.readInt(4),this.compressedSize=s.readInt(4),this.uncompressedSize=s.readInt(4);var b=s.readInt(2);if(this.extraFieldsLength=s.readInt(2),this.fileCommentLength=s.readInt(2),this.diskNumberStart=s.readInt(2),this.internalFileAttributes=s.readInt(2),this.externalFileAttributes=s.readInt(4),this.localHeaderOffset=s.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");s.skip(b),this.readExtraFields(s),this.parseZIP64ExtraField(s),this.fileComment=s.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var s=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),s==0&&(this.dosPermissions=63&this.externalFileAttributes),s==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!=="/"||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var s=c(this.extraFields[1].value);this.uncompressedSize===e.MAX_VALUE_32BITS&&(this.uncompressedSize=s.readInt(8)),this.compressedSize===e.MAX_VALUE_32BITS&&(this.compressedSize=s.readInt(8)),this.localHeaderOffset===e.MAX_VALUE_32BITS&&(this.localHeaderOffset=s.readInt(8)),this.diskNumberStart===e.MAX_VALUE_32BITS&&(this.diskNumberStart=s.readInt(4))}},readExtraFields:function(s){var b,i,m,u=s.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});s.index+4<u;)b=s.readInt(2),i=s.readInt(2),m=s.readData(i),this.extraFields[b]={id:b,length:i,value:m};s.setIndex(u)},handleUTF8:function(){var s=w.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=h.utf8decode(this.fileName),this.fileCommentStr=h.utf8decode(this.fileComment);else{var b=this.findExtraFieldUnicodePath();if(b!==null)this.fileNameStr=b;else{var i=e.transformTo(s,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(i)}var m=this.findExtraFieldUnicodeComment();if(m!==null)this.fileCommentStr=m;else{var u=e.transformTo(s,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(u)}}},findExtraFieldUnicodePath:function(){var s=this.extraFields[28789];if(s){var b=c(s.value);return b.readInt(1)!==1||a(this.fileName)!==b.readInt(4)?null:h.utf8decode(b.readData(s.length-5))}return null},findExtraFieldUnicodeComment:function(){var s=this.extraFields[25461];if(s){var b=c(s.value);return b.readInt(1)!==1||a(this.fileComment)!==b.readInt(4)?null:h.utf8decode(b.readData(s.length-5))}return null}},l.exports=y},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(o,l,d){function c(b,i,m){this.name=b,this.dir=m.dir,this.date=m.date,this.comment=m.comment,this.unixPermissions=m.unixPermissions,this.dosPermissions=m.dosPermissions,this._data=i,this._dataBinary=m.binary,this.options={compression:m.compression,compressionOptions:m.compressionOptions}}var e=o("./stream/StreamHelper"),t=o("./stream/DataWorker"),a=o("./utf8"),h=o("./compressedObject"),g=o("./stream/GenericWorker");c.prototype={internalStream:function(b){var i=null,m="string";try{if(!b)throw new Error("No output type specified.");var u=(m=b.toLowerCase())==="string"||m==="text";m!=="binarystring"&&m!=="text"||(m="string"),i=this._decompressWorker();var p=!this._dataBinary;p&&!u&&(i=i.pipe(new a.Utf8EncodeWorker)),!p&&u&&(i=i.pipe(new a.Utf8DecodeWorker))}catch(B){(i=new g("error")).error(B)}return new e(i,m,"")},async:function(b,i){return this.internalStream(b).accumulate(i)},nodeStream:function(b,i){return this.internalStream(b||"nodebuffer").toNodejsStream(i)},_compressWorker:function(b,i){if(this._data instanceof h&&this._data.compression.magic===b.magic)return this._data.getCompressedWorker();var m=this._decompressWorker();return this._dataBinary||(m=m.pipe(new a.Utf8EncodeWorker)),h.createWorkerFrom(m,b,i)},_decompressWorker:function(){return this._data instanceof h?this._data.getContentWorker():this._data instanceof g?this._data:new t(this._data)}};for(var w=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],y=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},s=0;s<w.length;s++)c.prototype[w[s]]=y;l.exports=c},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(o,l,d){(function(c){var e,t,a=c.MutationObserver||c.WebKitMutationObserver;if(a){var h=0,g=new a(b),w=c.document.createTextNode("");g.observe(w,{characterData:!0}),e=function(){w.data=h=++h%2}}else if(c.setImmediate||c.MessageChannel===void 0)e="document"in c&&"onreadystatechange"in c.document.createElement("script")?function(){var i=c.document.createElement("script");i.onreadystatechange=function(){b(),i.onreadystatechange=null,i.parentNode.removeChild(i),i=null},c.document.documentElement.appendChild(i)}:function(){setTimeout(b,0)};else{var y=new c.MessageChannel;y.port1.onmessage=b,e=function(){y.port2.postMessage(0)}}var s=[];function b(){var i,m;t=!0;for(var u=s.length;u;){for(m=s,s=[],i=-1;++i<u;)m[i]();u=s.length}t=!1}l.exports=function(i){s.push(i)!==1||t||e()}}).call(this,typeof ge<"u"?ge:typeof self<"u"?self:typeof window<"u"?window:{})},{}],37:[function(o,l,d){var c=o("immediate");function e(){}var t={},a=["REJECTED"],h=["FULFILLED"],g=["PENDING"];function w(u){if(typeof u!="function")throw new TypeError("resolver must be a function");this.state=g,this.queue=[],this.outcome=void 0,u!==e&&i(this,u)}function y(u,p,B){this.promise=u,typeof p=="function"&&(this.onFulfilled=p,this.callFulfilled=this.otherCallFulfilled),typeof B=="function"&&(this.onRejected=B,this.callRejected=this.otherCallRejected)}function s(u,p,B){c(function(){var P;try{P=p(B)}catch(C){return t.reject(u,C)}P===u?t.reject(u,new TypeError("Cannot resolve promise with itself")):t.resolve(u,P)})}function b(u){var p=u&&u.then;if(u&&(typeof u=="object"||typeof u=="function")&&typeof p=="function")return function(){p.apply(u,arguments)}}function i(u,p){var B=!1;function P(I){B||(B=!0,t.reject(u,I))}function C(I){B||(B=!0,t.resolve(u,I))}var L=m(function(){p(C,P)});L.status==="error"&&P(L.value)}function m(u,p){var B={};try{B.value=u(p),B.status="success"}catch(P){B.status="error",B.value=P}return B}(l.exports=w).prototype.finally=function(u){if(typeof u!="function")return this;var p=this.constructor;return this.then(function(B){return p.resolve(u()).then(function(){return B})},function(B){return p.resolve(u()).then(function(){throw B})})},w.prototype.catch=function(u){return this.then(null,u)},w.prototype.then=function(u,p){if(typeof u!="function"&&this.state===h||typeof p!="function"&&this.state===a)return this;var B=new this.constructor(e);return this.state!==g?s(B,this.state===h?u:p,this.outcome):this.queue.push(new y(B,u,p)),B},y.prototype.callFulfilled=function(u){t.resolve(this.promise,u)},y.prototype.otherCallFulfilled=function(u){s(this.promise,this.onFulfilled,u)},y.prototype.callRejected=function(u){t.reject(this.promise,u)},y.prototype.otherCallRejected=function(u){s(this.promise,this.onRejected,u)},t.resolve=function(u,p){var B=m(b,p);if(B.status==="error")return t.reject(u,B.value);var P=B.value;if(P)i(u,P);else{u.state=h,u.outcome=p;for(var C=-1,L=u.queue.length;++C<L;)u.queue[C].callFulfilled(p)}return u},t.reject=function(u,p){u.state=a,u.outcome=p;for(var B=-1,P=u.queue.length;++B<P;)u.queue[B].callRejected(p);return u},w.resolve=function(u){return u instanceof this?u:t.resolve(new this(e),u)},w.reject=function(u){var p=new this(e);return t.reject(p,u)},w.all=function(u){var p=this;if(Object.prototype.toString.call(u)!=="[object Array]")return this.reject(new TypeError("must be an array"));var B=u.length,P=!1;if(!B)return this.resolve([]);for(var C=new Array(B),L=0,I=-1,D=new this(e);++I<B;)O(u[I],I);return D;function O(j,K){p.resolve(j).then(function(_){C[K]=_,++L!==B||P||(P=!0,t.resolve(D,C))},function(_){P||(P=!0,t.reject(D,_))})}},w.race=function(u){var p=this;if(Object.prototype.toString.call(u)!=="[object Array]")return this.reject(new TypeError("must be an array"));var B=u.length,P=!1;if(!B)return this.resolve([]);for(var C=-1,L=new this(e);++C<B;)I=u[C],p.resolve(I).then(function(D){P||(P=!0,t.resolve(L,D))},function(D){P||(P=!0,t.reject(L,D))});var I;return L}},{immediate:36}],38:[function(o,l,d){var c={};(0,o("./lib/utils/common").assign)(c,o("./lib/deflate"),o("./lib/inflate"),o("./lib/zlib/constants")),l.exports=c},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(o,l,d){var c=o("./zlib/deflate"),e=o("./utils/common"),t=o("./utils/strings"),a=o("./zlib/messages"),h=o("./zlib/zstream"),g=Object.prototype.toString,w=0,y=-1,s=0,b=8;function i(u){if(!(this instanceof i))return new i(u);this.options=e.assign({level:y,method:b,chunkSize:16384,windowBits:15,memLevel:8,strategy:s,to:""},u||{});var p=this.options;p.raw&&0<p.windowBits?p.windowBits=-p.windowBits:p.gzip&&0<p.windowBits&&p.windowBits<16&&(p.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new h,this.strm.avail_out=0;var B=c.deflateInit2(this.strm,p.level,p.method,p.windowBits,p.memLevel,p.strategy);if(B!==w)throw new Error(a[B]);if(p.header&&c.deflateSetHeader(this.strm,p.header),p.dictionary){var P;if(P=typeof p.dictionary=="string"?t.string2buf(p.dictionary):g.call(p.dictionary)==="[object ArrayBuffer]"?new Uint8Array(p.dictionary):p.dictionary,(B=c.deflateSetDictionary(this.strm,P))!==w)throw new Error(a[B]);this._dict_set=!0}}function m(u,p){var B=new i(p);if(B.push(u,!0),B.err)throw B.msg||a[B.err];return B.result}i.prototype.push=function(u,p){var B,P,C=this.strm,L=this.options.chunkSize;if(this.ended)return!1;P=p===~~p?p:p===!0?4:0,typeof u=="string"?C.input=t.string2buf(u):g.call(u)==="[object ArrayBuffer]"?C.input=new Uint8Array(u):C.input=u,C.next_in=0,C.avail_in=C.input.length;do{if(C.avail_out===0&&(C.output=new e.Buf8(L),C.next_out=0,C.avail_out=L),(B=c.deflate(C,P))!==1&&B!==w)return this.onEnd(B),!(this.ended=!0);C.avail_out!==0&&(C.avail_in!==0||P!==4&&P!==2)||(this.options.to==="string"?this.onData(t.buf2binstring(e.shrinkBuf(C.output,C.next_out))):this.onData(e.shrinkBuf(C.output,C.next_out)))}while((0<C.avail_in||C.avail_out===0)&&B!==1);return P===4?(B=c.deflateEnd(this.strm),this.onEnd(B),this.ended=!0,B===w):P!==2||(this.onEnd(w),!(C.avail_out=0))},i.prototype.onData=function(u){this.chunks.push(u)},i.prototype.onEnd=function(u){u===w&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=e.flattenChunks(this.chunks)),this.chunks=[],this.err=u,this.msg=this.strm.msg},d.Deflate=i,d.deflate=m,d.deflateRaw=function(u,p){return(p=p||{}).raw=!0,m(u,p)},d.gzip=function(u,p){return(p=p||{}).gzip=!0,m(u,p)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(o,l,d){var c=o("./zlib/inflate"),e=o("./utils/common"),t=o("./utils/strings"),a=o("./zlib/constants"),h=o("./zlib/messages"),g=o("./zlib/zstream"),w=o("./zlib/gzheader"),y=Object.prototype.toString;function s(i){if(!(this instanceof s))return new s(i);this.options=e.assign({chunkSize:16384,windowBits:0,to:""},i||{});var m=this.options;m.raw&&0<=m.windowBits&&m.windowBits<16&&(m.windowBits=-m.windowBits,m.windowBits===0&&(m.windowBits=-15)),!(0<=m.windowBits&&m.windowBits<16)||i&&i.windowBits||(m.windowBits+=32),15<m.windowBits&&m.windowBits<48&&(15&m.windowBits)==0&&(m.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new g,this.strm.avail_out=0;var u=c.inflateInit2(this.strm,m.windowBits);if(u!==a.Z_OK)throw new Error(h[u]);this.header=new w,c.inflateGetHeader(this.strm,this.header)}function b(i,m){var u=new s(m);if(u.push(i,!0),u.err)throw u.msg||h[u.err];return u.result}s.prototype.push=function(i,m){var u,p,B,P,C,L,I=this.strm,D=this.options.chunkSize,O=this.options.dictionary,j=!1;if(this.ended)return!1;p=m===~~m?m:m===!0?a.Z_FINISH:a.Z_NO_FLUSH,typeof i=="string"?I.input=t.binstring2buf(i):y.call(i)==="[object ArrayBuffer]"?I.input=new Uint8Array(i):I.input=i,I.next_in=0,I.avail_in=I.input.length;do{if(I.avail_out===0&&(I.output=new e.Buf8(D),I.next_out=0,I.avail_out=D),(u=c.inflate(I,a.Z_NO_FLUSH))===a.Z_NEED_DICT&&O&&(L=typeof O=="string"?t.string2buf(O):y.call(O)==="[object ArrayBuffer]"?new Uint8Array(O):O,u=c.inflateSetDictionary(this.strm,L)),u===a.Z_BUF_ERROR&&j===!0&&(u=a.Z_OK,j=!1),u!==a.Z_STREAM_END&&u!==a.Z_OK)return this.onEnd(u),!(this.ended=!0);I.next_out&&(I.avail_out!==0&&u!==a.Z_STREAM_END&&(I.avail_in!==0||p!==a.Z_FINISH&&p!==a.Z_SYNC_FLUSH)||(this.options.to==="string"?(B=t.utf8border(I.output,I.next_out),P=I.next_out-B,C=t.buf2string(I.output,B),I.next_out=P,I.avail_out=D-P,P&&e.arraySet(I.output,I.output,B,P,0),this.onData(C)):this.onData(e.shrinkBuf(I.output,I.next_out)))),I.avail_in===0&&I.avail_out===0&&(j=!0)}while((0<I.avail_in||I.avail_out===0)&&u!==a.Z_STREAM_END);return u===a.Z_STREAM_END&&(p=a.Z_FINISH),p===a.Z_FINISH?(u=c.inflateEnd(this.strm),this.onEnd(u),this.ended=!0,u===a.Z_OK):p!==a.Z_SYNC_FLUSH||(this.onEnd(a.Z_OK),!(I.avail_out=0))},s.prototype.onData=function(i){this.chunks.push(i)},s.prototype.onEnd=function(i){i===a.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=e.flattenChunks(this.chunks)),this.chunks=[],this.err=i,this.msg=this.strm.msg},d.Inflate=s,d.inflate=b,d.inflateRaw=function(i,m){return(m=m||{}).raw=!0,b(i,m)},d.ungzip=b},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(o,l,d){var c=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";d.assign=function(a){for(var h=Array.prototype.slice.call(arguments,1);h.length;){var g=h.shift();if(g){if(typeof g!="object")throw new TypeError(g+"must be non-object");for(var w in g)g.hasOwnProperty(w)&&(a[w]=g[w])}}return a},d.shrinkBuf=function(a,h){return a.length===h?a:a.subarray?a.subarray(0,h):(a.length=h,a)};var e={arraySet:function(a,h,g,w,y){if(h.subarray&&a.subarray)a.set(h.subarray(g,g+w),y);else for(var s=0;s<w;s++)a[y+s]=h[g+s]},flattenChunks:function(a){var h,g,w,y,s,b;for(h=w=0,g=a.length;h<g;h++)w+=a[h].length;for(b=new Uint8Array(w),h=y=0,g=a.length;h<g;h++)s=a[h],b.set(s,y),y+=s.length;return b}},t={arraySet:function(a,h,g,w,y){for(var s=0;s<w;s++)a[y+s]=h[g+s]},flattenChunks:function(a){return[].concat.apply([],a)}};d.setTyped=function(a){a?(d.Buf8=Uint8Array,d.Buf16=Uint16Array,d.Buf32=Int32Array,d.assign(d,e)):(d.Buf8=Array,d.Buf16=Array,d.Buf32=Array,d.assign(d,t))},d.setTyped(c)},{}],42:[function(o,l,d){var c=o("./common"),e=!0,t=!0;try{String.fromCharCode.apply(null,[0])}catch{e=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{t=!1}for(var a=new c.Buf8(256),h=0;h<256;h++)a[h]=252<=h?6:248<=h?5:240<=h?4:224<=h?3:192<=h?2:1;function g(w,y){if(y<65537&&(w.subarray&&t||!w.subarray&&e))return String.fromCharCode.apply(null,c.shrinkBuf(w,y));for(var s="",b=0;b<y;b++)s+=String.fromCharCode(w[b]);return s}a[254]=a[254]=1,d.string2buf=function(w){var y,s,b,i,m,u=w.length,p=0;for(i=0;i<u;i++)(64512&(s=w.charCodeAt(i)))==55296&&i+1<u&&(64512&(b=w.charCodeAt(i+1)))==56320&&(s=65536+(s-55296<<10)+(b-56320),i++),p+=s<128?1:s<2048?2:s<65536?3:4;for(y=new c.Buf8(p),i=m=0;m<p;i++)(64512&(s=w.charCodeAt(i)))==55296&&i+1<u&&(64512&(b=w.charCodeAt(i+1)))==56320&&(s=65536+(s-55296<<10)+(b-56320),i++),s<128?y[m++]=s:(s<2048?y[m++]=192|s>>>6:(s<65536?y[m++]=224|s>>>12:(y[m++]=240|s>>>18,y[m++]=128|s>>>12&63),y[m++]=128|s>>>6&63),y[m++]=128|63&s);return y},d.buf2binstring=function(w){return g(w,w.length)},d.binstring2buf=function(w){for(var y=new c.Buf8(w.length),s=0,b=y.length;s<b;s++)y[s]=w.charCodeAt(s);return y},d.buf2string=function(w,y){var s,b,i,m,u=y||w.length,p=new Array(2*u);for(s=b=0;s<u;)if((i=w[s++])<128)p[b++]=i;else if(4<(m=a[i]))p[b++]=65533,s+=m-1;else{for(i&=m===2?31:m===3?15:7;1<m&&s<u;)i=i<<6|63&w[s++],m--;1<m?p[b++]=65533:i<65536?p[b++]=i:(i-=65536,p[b++]=55296|i>>10&1023,p[b++]=56320|1023&i)}return g(p,b)},d.utf8border=function(w,y){var s;for((y=y||w.length)>w.length&&(y=w.length),s=y-1;0<=s&&(192&w[s])==128;)s--;return s<0||s===0?y:s+a[w[s]]>y?s:y}},{"./common":41}],43:[function(o,l,d){l.exports=function(c,e,t,a){for(var h=65535&c|0,g=c>>>16&65535|0,w=0;t!==0;){for(t-=w=2e3<t?2e3:t;g=g+(h=h+e[a++]|0)|0,--w;);h%=65521,g%=65521}return h|g<<16|0}},{}],44:[function(o,l,d){l.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(o,l,d){var c=(function(){for(var e,t=[],a=0;a<256;a++){e=a;for(var h=0;h<8;h++)e=1&e?3988292384^e>>>1:e>>>1;t[a]=e}return t})();l.exports=function(e,t,a,h){var g=c,w=h+a;e^=-1;for(var y=h;y<w;y++)e=e>>>8^g[255&(e^t[y])];return-1^e}},{}],46:[function(o,l,d){var c,e=o("../utils/common"),t=o("./trees"),a=o("./adler32"),h=o("./crc32"),g=o("./messages"),w=0,y=4,s=0,b=-2,i=-1,m=4,u=2,p=8,B=9,P=286,C=30,L=19,I=2*P+1,D=15,O=3,j=258,K=j+O+1,_=42,z=113,n=1,M=2,J=3,U=4;function ee(r,T){return r.msg=g[T],T}function W(r){return(r<<1)-(4<r?9:0)}function Q(r){for(var T=r.length;0<=--T;)r[T]=0}function E(r){var T=r.state,A=T.pending;A>r.avail_out&&(A=r.avail_out),A!==0&&(e.arraySet(r.output,T.pending_buf,T.pending_out,A,r.next_out),r.next_out+=A,T.pending_out+=A,r.total_out+=A,r.avail_out-=A,T.pending-=A,T.pending===0&&(T.pending_out=0))}function S(r,T){t._tr_flush_block(r,0<=r.block_start?r.block_start:-1,r.strstart-r.block_start,T),r.block_start=r.strstart,E(r.strm)}function Y(r,T){r.pending_buf[r.pending++]=T}function G(r,T){r.pending_buf[r.pending++]=T>>>8&255,r.pending_buf[r.pending++]=255&T}function H(r,T){var A,k,f=r.max_chain_length,v=r.strstart,F=r.prev_length,N=r.nice_match,x=r.strstart>r.w_size-K?r.strstart-(r.w_size-K):0,Z=r.window,X=r.w_mask,q=r.prev,V=r.strstart+j,ne=Z[v+F-1],re=Z[v+F];r.prev_length>=r.good_match&&(f>>=2),N>r.lookahead&&(N=r.lookahead);do if(Z[(A=T)+F]===re&&Z[A+F-1]===ne&&Z[A]===Z[v]&&Z[++A]===Z[v+1]){v+=2,A++;do;while(Z[++v]===Z[++A]&&Z[++v]===Z[++A]&&Z[++v]===Z[++A]&&Z[++v]===Z[++A]&&Z[++v]===Z[++A]&&Z[++v]===Z[++A]&&Z[++v]===Z[++A]&&Z[++v]===Z[++A]&&v<V);if(k=j-(V-v),v=V-j,F<k){if(r.match_start=T,N<=(F=k))break;ne=Z[v+F-1],re=Z[v+F]}}while((T=q[T&X])>x&&--f!=0);return F<=r.lookahead?F:r.lookahead}function ae(r){var T,A,k,f,v,F,N,x,Z,X,q=r.w_size;do{if(f=r.window_size-r.lookahead-r.strstart,r.strstart>=q+(q-K)){for(e.arraySet(r.window,r.window,q,q,0),r.match_start-=q,r.strstart-=q,r.block_start-=q,T=A=r.hash_size;k=r.head[--T],r.head[T]=q<=k?k-q:0,--A;);for(T=A=q;k=r.prev[--T],r.prev[T]=q<=k?k-q:0,--A;);f+=q}if(r.strm.avail_in===0)break;if(F=r.strm,N=r.window,x=r.strstart+r.lookahead,Z=f,X=void 0,X=F.avail_in,Z<X&&(X=Z),A=X===0?0:(F.avail_in-=X,e.arraySet(N,F.input,F.next_in,X,x),F.state.wrap===1?F.adler=a(F.adler,N,X,x):F.state.wrap===2&&(F.adler=h(F.adler,N,X,x)),F.next_in+=X,F.total_in+=X,X),r.lookahead+=A,r.lookahead+r.insert>=O)for(v=r.strstart-r.insert,r.ins_h=r.window[v],r.ins_h=(r.ins_h<<r.hash_shift^r.window[v+1])&r.hash_mask;r.insert&&(r.ins_h=(r.ins_h<<r.hash_shift^r.window[v+O-1])&r.hash_mask,r.prev[v&r.w_mask]=r.head[r.ins_h],r.head[r.ins_h]=v,v++,r.insert--,!(r.lookahead+r.insert<O)););}while(r.lookahead<K&&r.strm.avail_in!==0)}function le(r,T){for(var A,k;;){if(r.lookahead<K){if(ae(r),r.lookahead<K&&T===w)return n;if(r.lookahead===0)break}if(A=0,r.lookahead>=O&&(r.ins_h=(r.ins_h<<r.hash_shift^r.window[r.strstart+O-1])&r.hash_mask,A=r.prev[r.strstart&r.w_mask]=r.head[r.ins_h],r.head[r.ins_h]=r.strstart),A!==0&&r.strstart-A<=r.w_size-K&&(r.match_length=H(r,A)),r.match_length>=O)if(k=t._tr_tally(r,r.strstart-r.match_start,r.match_length-O),r.lookahead-=r.match_length,r.match_length<=r.max_lazy_match&&r.lookahead>=O){for(r.match_length--;r.strstart++,r.ins_h=(r.ins_h<<r.hash_shift^r.window[r.strstart+O-1])&r.hash_mask,A=r.prev[r.strstart&r.w_mask]=r.head[r.ins_h],r.head[r.ins_h]=r.strstart,--r.match_length!=0;);r.strstart++}else r.strstart+=r.match_length,r.match_length=0,r.ins_h=r.window[r.strstart],r.ins_h=(r.ins_h<<r.hash_shift^r.window[r.strstart+1])&r.hash_mask;else k=t._tr_tally(r,0,r.window[r.strstart]),r.lookahead--,r.strstart++;if(k&&(S(r,!1),r.strm.avail_out===0))return n}return r.insert=r.strstart<O-1?r.strstart:O-1,T===y?(S(r,!0),r.strm.avail_out===0?J:U):r.last_lit&&(S(r,!1),r.strm.avail_out===0)?n:M}function te(r,T){for(var A,k,f;;){if(r.lookahead<K){if(ae(r),r.lookahead<K&&T===w)return n;if(r.lookahead===0)break}if(A=0,r.lookahead>=O&&(r.ins_h=(r.ins_h<<r.hash_shift^r.window[r.strstart+O-1])&r.hash_mask,A=r.prev[r.strstart&r.w_mask]=r.head[r.ins_h],r.head[r.ins_h]=r.strstart),r.prev_length=r.match_length,r.prev_match=r.match_start,r.match_length=O-1,A!==0&&r.prev_length<r.max_lazy_match&&r.strstart-A<=r.w_size-K&&(r.match_length=H(r,A),r.match_length<=5&&(r.strategy===1||r.match_length===O&&4096<r.strstart-r.match_start)&&(r.match_length=O-1)),r.prev_length>=O&&r.match_length<=r.prev_length){for(f=r.strstart+r.lookahead-O,k=t._tr_tally(r,r.strstart-1-r.prev_match,r.prev_length-O),r.lookahead-=r.prev_length-1,r.prev_length-=2;++r.strstart<=f&&(r.ins_h=(r.ins_h<<r.hash_shift^r.window[r.strstart+O-1])&r.hash_mask,A=r.prev[r.strstart&r.w_mask]=r.head[r.ins_h],r.head[r.ins_h]=r.strstart),--r.prev_length!=0;);if(r.match_available=0,r.match_length=O-1,r.strstart++,k&&(S(r,!1),r.strm.avail_out===0))return n}else if(r.match_available){if((k=t._tr_tally(r,0,r.window[r.strstart-1]))&&S(r,!1),r.strstart++,r.lookahead--,r.strm.avail_out===0)return n}else r.match_available=1,r.strstart++,r.lookahead--}return r.match_available&&(k=t._tr_tally(r,0,r.window[r.strstart-1]),r.match_available=0),r.insert=r.strstart<O-1?r.strstart:O-1,T===y?(S(r,!0),r.strm.avail_out===0?J:U):r.last_lit&&(S(r,!1),r.strm.avail_out===0)?n:M}function oe(r,T,A,k,f){this.good_length=r,this.max_lazy=T,this.nice_length=A,this.max_chain=k,this.func=f}function ce(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=p,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new e.Buf16(2*I),this.dyn_dtree=new e.Buf16(2*(2*C+1)),this.bl_tree=new e.Buf16(2*(2*L+1)),Q(this.dyn_ltree),Q(this.dyn_dtree),Q(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new e.Buf16(D+1),this.heap=new e.Buf16(2*P+1),Q(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new e.Buf16(2*P+1),Q(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function ie(r){var T;return r&&r.state?(r.total_in=r.total_out=0,r.data_type=u,(T=r.state).pending=0,T.pending_out=0,T.wrap<0&&(T.wrap=-T.wrap),T.status=T.wrap?_:z,r.adler=T.wrap===2?0:1,T.last_flush=w,t._tr_init(T),s):ee(r,b)}function he(r){var T=ie(r);return T===s&&(function(A){A.window_size=2*A.w_size,Q(A.head),A.max_lazy_match=c[A.level].max_lazy,A.good_match=c[A.level].good_length,A.nice_match=c[A.level].nice_length,A.max_chain_length=c[A.level].max_chain,A.strstart=0,A.block_start=0,A.lookahead=0,A.insert=0,A.match_length=A.prev_length=O-1,A.match_available=0,A.ins_h=0})(r.state),T}function ue(r,T,A,k,f,v){if(!r)return b;var F=1;if(T===i&&(T=6),k<0?(F=0,k=-k):15<k&&(F=2,k-=16),f<1||B<f||A!==p||k<8||15<k||T<0||9<T||v<0||m<v)return ee(r,b);k===8&&(k=9);var N=new ce;return(r.state=N).strm=r,N.wrap=F,N.gzhead=null,N.w_bits=k,N.w_size=1<<N.w_bits,N.w_mask=N.w_size-1,N.hash_bits=f+7,N.hash_size=1<<N.hash_bits,N.hash_mask=N.hash_size-1,N.hash_shift=~~((N.hash_bits+O-1)/O),N.window=new e.Buf8(2*N.w_size),N.head=new e.Buf16(N.hash_size),N.prev=new e.Buf16(N.w_size),N.lit_bufsize=1<<f+6,N.pending_buf_size=4*N.lit_bufsize,N.pending_buf=new e.Buf8(N.pending_buf_size),N.d_buf=1*N.lit_bufsize,N.l_buf=3*N.lit_bufsize,N.level=T,N.strategy=v,N.method=A,he(r)}c=[new oe(0,0,0,0,function(r,T){var A=65535;for(A>r.pending_buf_size-5&&(A=r.pending_buf_size-5);;){if(r.lookahead<=1){if(ae(r),r.lookahead===0&&T===w)return n;if(r.lookahead===0)break}r.strstart+=r.lookahead,r.lookahead=0;var k=r.block_start+A;if((r.strstart===0||r.strstart>=k)&&(r.lookahead=r.strstart-k,r.strstart=k,S(r,!1),r.strm.avail_out===0)||r.strstart-r.block_start>=r.w_size-K&&(S(r,!1),r.strm.avail_out===0))return n}return r.insert=0,T===y?(S(r,!0),r.strm.avail_out===0?J:U):(r.strstart>r.block_start&&(S(r,!1),r.strm.avail_out),n)}),new oe(4,4,8,4,le),new oe(4,5,16,8,le),new oe(4,6,32,32,le),new oe(4,4,16,16,te),new oe(8,16,32,32,te),new oe(8,16,128,128,te),new oe(8,32,128,256,te),new oe(32,128,258,1024,te),new oe(32,258,258,4096,te)],d.deflateInit=function(r,T){return ue(r,T,p,15,8,0)},d.deflateInit2=ue,d.deflateReset=he,d.deflateResetKeep=ie,d.deflateSetHeader=function(r,T){return r&&r.state?r.state.wrap!==2?b:(r.state.gzhead=T,s):b},d.deflate=function(r,T){var A,k,f,v;if(!r||!r.state||5<T||T<0)return r?ee(r,b):b;if(k=r.state,!r.output||!r.input&&r.avail_in!==0||k.status===666&&T!==y)return ee(r,r.avail_out===0?-5:b);if(k.strm=r,A=k.last_flush,k.last_flush=T,k.status===_)if(k.wrap===2)r.adler=0,Y(k,31),Y(k,139),Y(k,8),k.gzhead?(Y(k,(k.gzhead.text?1:0)+(k.gzhead.hcrc?2:0)+(k.gzhead.extra?4:0)+(k.gzhead.name?8:0)+(k.gzhead.comment?16:0)),Y(k,255&k.gzhead.time),Y(k,k.gzhead.time>>8&255),Y(k,k.gzhead.time>>16&255),Y(k,k.gzhead.time>>24&255),Y(k,k.level===9?2:2<=k.strategy||k.level<2?4:0),Y(k,255&k.gzhead.os),k.gzhead.extra&&k.gzhead.extra.length&&(Y(k,255&k.gzhead.extra.length),Y(k,k.gzhead.extra.length>>8&255)),k.gzhead.hcrc&&(r.adler=h(r.adler,k.pending_buf,k.pending,0)),k.gzindex=0,k.status=69):(Y(k,0),Y(k,0),Y(k,0),Y(k,0),Y(k,0),Y(k,k.level===9?2:2<=k.strategy||k.level<2?4:0),Y(k,3),k.status=z);else{var F=p+(k.w_bits-8<<4)<<8;F|=(2<=k.strategy||k.level<2?0:k.level<6?1:k.level===6?2:3)<<6,k.strstart!==0&&(F|=32),F+=31-F%31,k.status=z,G(k,F),k.strstart!==0&&(G(k,r.adler>>>16),G(k,65535&r.adler)),r.adler=1}if(k.status===69)if(k.gzhead.extra){for(f=k.pending;k.gzindex<(65535&k.gzhead.extra.length)&&(k.pending!==k.pending_buf_size||(k.gzhead.hcrc&&k.pending>f&&(r.adler=h(r.adler,k.pending_buf,k.pending-f,f)),E(r),f=k.pending,k.pending!==k.pending_buf_size));)Y(k,255&k.gzhead.extra[k.gzindex]),k.gzindex++;k.gzhead.hcrc&&k.pending>f&&(r.adler=h(r.adler,k.pending_buf,k.pending-f,f)),k.gzindex===k.gzhead.extra.length&&(k.gzindex=0,k.status=73)}else k.status=73;if(k.status===73)if(k.gzhead.name){f=k.pending;do{if(k.pending===k.pending_buf_size&&(k.gzhead.hcrc&&k.pending>f&&(r.adler=h(r.adler,k.pending_buf,k.pending-f,f)),E(r),f=k.pending,k.pending===k.pending_buf_size)){v=1;break}v=k.gzindex<k.gzhead.name.length?255&k.gzhead.name.charCodeAt(k.gzindex++):0,Y(k,v)}while(v!==0);k.gzhead.hcrc&&k.pending>f&&(r.adler=h(r.adler,k.pending_buf,k.pending-f,f)),v===0&&(k.gzindex=0,k.status=91)}else k.status=91;if(k.status===91)if(k.gzhead.comment){f=k.pending;do{if(k.pending===k.pending_buf_size&&(k.gzhead.hcrc&&k.pending>f&&(r.adler=h(r.adler,k.pending_buf,k.pending-f,f)),E(r),f=k.pending,k.pending===k.pending_buf_size)){v=1;break}v=k.gzindex<k.gzhead.comment.length?255&k.gzhead.comment.charCodeAt(k.gzindex++):0,Y(k,v)}while(v!==0);k.gzhead.hcrc&&k.pending>f&&(r.adler=h(r.adler,k.pending_buf,k.pending-f,f)),v===0&&(k.status=103)}else k.status=103;if(k.status===103&&(k.gzhead.hcrc?(k.pending+2>k.pending_buf_size&&E(r),k.pending+2<=k.pending_buf_size&&(Y(k,255&r.adler),Y(k,r.adler>>8&255),r.adler=0,k.status=z)):k.status=z),k.pending!==0){if(E(r),r.avail_out===0)return k.last_flush=-1,s}else if(r.avail_in===0&&W(T)<=W(A)&&T!==y)return ee(r,-5);if(k.status===666&&r.avail_in!==0)return ee(r,-5);if(r.avail_in!==0||k.lookahead!==0||T!==w&&k.status!==666){var N=k.strategy===2?(function(x,Z){for(var X;;){if(x.lookahead===0&&(ae(x),x.lookahead===0)){if(Z===w)return n;break}if(x.match_length=0,X=t._tr_tally(x,0,x.window[x.strstart]),x.lookahead--,x.strstart++,X&&(S(x,!1),x.strm.avail_out===0))return n}return x.insert=0,Z===y?(S(x,!0),x.strm.avail_out===0?J:U):x.last_lit&&(S(x,!1),x.strm.avail_out===0)?n:M})(k,T):k.strategy===3?(function(x,Z){for(var X,q,V,ne,re=x.window;;){if(x.lookahead<=j){if(ae(x),x.lookahead<=j&&Z===w)return n;if(x.lookahead===0)break}if(x.match_length=0,x.lookahead>=O&&0<x.strstart&&(q=re[V=x.strstart-1])===re[++V]&&q===re[++V]&&q===re[++V]){ne=x.strstart+j;do;while(q===re[++V]&&q===re[++V]&&q===re[++V]&&q===re[++V]&&q===re[++V]&&q===re[++V]&&q===re[++V]&&q===re[++V]&&V<ne);x.match_length=j-(ne-V),x.match_length>x.lookahead&&(x.match_length=x.lookahead)}if(x.match_length>=O?(X=t._tr_tally(x,1,x.match_length-O),x.lookahead-=x.match_length,x.strstart+=x.match_length,x.match_length=0):(X=t._tr_tally(x,0,x.window[x.strstart]),x.lookahead--,x.strstart++),X&&(S(x,!1),x.strm.avail_out===0))return n}return x.insert=0,Z===y?(S(x,!0),x.strm.avail_out===0?J:U):x.last_lit&&(S(x,!1),x.strm.avail_out===0)?n:M})(k,T):c[k.level].func(k,T);if(N!==J&&N!==U||(k.status=666),N===n||N===J)return r.avail_out===0&&(k.last_flush=-1),s;if(N===M&&(T===1?t._tr_align(k):T!==5&&(t._tr_stored_block(k,0,0,!1),T===3&&(Q(k.head),k.lookahead===0&&(k.strstart=0,k.block_start=0,k.insert=0))),E(r),r.avail_out===0))return k.last_flush=-1,s}return T!==y?s:k.wrap<=0?1:(k.wrap===2?(Y(k,255&r.adler),Y(k,r.adler>>8&255),Y(k,r.adler>>16&255),Y(k,r.adler>>24&255),Y(k,255&r.total_in),Y(k,r.total_in>>8&255),Y(k,r.total_in>>16&255),Y(k,r.total_in>>24&255)):(G(k,r.adler>>>16),G(k,65535&r.adler)),E(r),0<k.wrap&&(k.wrap=-k.wrap),k.pending!==0?s:1)},d.deflateEnd=function(r){var T;return r&&r.state?(T=r.state.status)!==_&&T!==69&&T!==73&&T!==91&&T!==103&&T!==z&&T!==666?ee(r,b):(r.state=null,T===z?ee(r,-3):s):b},d.deflateSetDictionary=function(r,T){var A,k,f,v,F,N,x,Z,X=T.length;if(!r||!r.state||(v=(A=r.state).wrap)===2||v===1&&A.status!==_||A.lookahead)return b;for(v===1&&(r.adler=a(r.adler,T,X,0)),A.wrap=0,X>=A.w_size&&(v===0&&(Q(A.head),A.strstart=0,A.block_start=0,A.insert=0),Z=new e.Buf8(A.w_size),e.arraySet(Z,T,X-A.w_size,A.w_size,0),T=Z,X=A.w_size),F=r.avail_in,N=r.next_in,x=r.input,r.avail_in=X,r.next_in=0,r.input=T,ae(A);A.lookahead>=O;){for(k=A.strstart,f=A.lookahead-(O-1);A.ins_h=(A.ins_h<<A.hash_shift^A.window[k+O-1])&A.hash_mask,A.prev[k&A.w_mask]=A.head[A.ins_h],A.head[A.ins_h]=k,k++,--f;);A.strstart=k,A.lookahead=O-1,ae(A)}return A.strstart+=A.lookahead,A.block_start=A.strstart,A.insert=A.lookahead,A.lookahead=0,A.match_length=A.prev_length=O-1,A.match_available=0,r.next_in=N,r.input=x,r.avail_in=F,A.wrap=v,s},d.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(o,l,d){l.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(o,l,d){l.exports=function(c,e){var t,a,h,g,w,y,s,b,i,m,u,p,B,P,C,L,I,D,O,j,K,_,z,n,M;t=c.state,a=c.next_in,n=c.input,h=a+(c.avail_in-5),g=c.next_out,M=c.output,w=g-(e-c.avail_out),y=g+(c.avail_out-257),s=t.dmax,b=t.wsize,i=t.whave,m=t.wnext,u=t.window,p=t.hold,B=t.bits,P=t.lencode,C=t.distcode,L=(1<<t.lenbits)-1,I=(1<<t.distbits)-1;e:do{B<15&&(p+=n[a++]<<B,B+=8,p+=n[a++]<<B,B+=8),D=P[p&L];t:for(;;){if(p>>>=O=D>>>24,B-=O,(O=D>>>16&255)===0)M[g++]=65535&D;else{if(!(16&O)){if((64&O)==0){D=P[(65535&D)+(p&(1<<O)-1)];continue t}if(32&O){t.mode=12;break e}c.msg="invalid literal/length code",t.mode=30;break e}j=65535&D,(O&=15)&&(B<O&&(p+=n[a++]<<B,B+=8),j+=p&(1<<O)-1,p>>>=O,B-=O),B<15&&(p+=n[a++]<<B,B+=8,p+=n[a++]<<B,B+=8),D=C[p&I];r:for(;;){if(p>>>=O=D>>>24,B-=O,!(16&(O=D>>>16&255))){if((64&O)==0){D=C[(65535&D)+(p&(1<<O)-1)];continue r}c.msg="invalid distance code",t.mode=30;break e}if(K=65535&D,B<(O&=15)&&(p+=n[a++]<<B,(B+=8)<O&&(p+=n[a++]<<B,B+=8)),s<(K+=p&(1<<O)-1)){c.msg="invalid distance too far back",t.mode=30;break e}if(p>>>=O,B-=O,(O=g-w)<K){if(i<(O=K-O)&&t.sane){c.msg="invalid distance too far back",t.mode=30;break e}if(z=u,(_=0)===m){if(_+=b-O,O<j){for(j-=O;M[g++]=u[_++],--O;);_=g-K,z=M}}else if(m<O){if(_+=b+m-O,(O-=m)<j){for(j-=O;M[g++]=u[_++],--O;);if(_=0,m<j){for(j-=O=m;M[g++]=u[_++],--O;);_=g-K,z=M}}}else if(_+=m-O,O<j){for(j-=O;M[g++]=u[_++],--O;);_=g-K,z=M}for(;2<j;)M[g++]=z[_++],M[g++]=z[_++],M[g++]=z[_++],j-=3;j&&(M[g++]=z[_++],1<j&&(M[g++]=z[_++]))}else{for(_=g-K;M[g++]=M[_++],M[g++]=M[_++],M[g++]=M[_++],2<(j-=3););j&&(M[g++]=M[_++],1<j&&(M[g++]=M[_++]))}break}}break}}while(a<h&&g<y);a-=j=B>>3,p&=(1<<(B-=j<<3))-1,c.next_in=a,c.next_out=g,c.avail_in=a<h?h-a+5:5-(a-h),c.avail_out=g<y?y-g+257:257-(g-y),t.hold=p,t.bits=B}},{}],49:[function(o,l,d){var c=o("../utils/common"),e=o("./adler32"),t=o("./crc32"),a=o("./inffast"),h=o("./inftrees"),g=1,w=2,y=0,s=-2,b=1,i=852,m=592;function u(_){return(_>>>24&255)+(_>>>8&65280)+((65280&_)<<8)+((255&_)<<24)}function p(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new c.Buf16(320),this.work=new c.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function B(_){var z;return _&&_.state?(z=_.state,_.total_in=_.total_out=z.total=0,_.msg="",z.wrap&&(_.adler=1&z.wrap),z.mode=b,z.last=0,z.havedict=0,z.dmax=32768,z.head=null,z.hold=0,z.bits=0,z.lencode=z.lendyn=new c.Buf32(i),z.distcode=z.distdyn=new c.Buf32(m),z.sane=1,z.back=-1,y):s}function P(_){var z;return _&&_.state?((z=_.state).wsize=0,z.whave=0,z.wnext=0,B(_)):s}function C(_,z){var n,M;return _&&_.state?(M=_.state,z<0?(n=0,z=-z):(n=1+(z>>4),z<48&&(z&=15)),z&&(z<8||15<z)?s:(M.window!==null&&M.wbits!==z&&(M.window=null),M.wrap=n,M.wbits=z,P(_))):s}function L(_,z){var n,M;return _?(M=new p,(_.state=M).window=null,(n=C(_,z))!==y&&(_.state=null),n):s}var I,D,O=!0;function j(_){if(O){var z;for(I=new c.Buf32(512),D=new c.Buf32(32),z=0;z<144;)_.lens[z++]=8;for(;z<256;)_.lens[z++]=9;for(;z<280;)_.lens[z++]=7;for(;z<288;)_.lens[z++]=8;for(h(g,_.lens,0,288,I,0,_.work,{bits:9}),z=0;z<32;)_.lens[z++]=5;h(w,_.lens,0,32,D,0,_.work,{bits:5}),O=!1}_.lencode=I,_.lenbits=9,_.distcode=D,_.distbits=5}function K(_,z,n,M){var J,U=_.state;return U.window===null&&(U.wsize=1<<U.wbits,U.wnext=0,U.whave=0,U.window=new c.Buf8(U.wsize)),M>=U.wsize?(c.arraySet(U.window,z,n-U.wsize,U.wsize,0),U.wnext=0,U.whave=U.wsize):(M<(J=U.wsize-U.wnext)&&(J=M),c.arraySet(U.window,z,n-M,J,U.wnext),(M-=J)?(c.arraySet(U.window,z,n-M,M,0),U.wnext=M,U.whave=U.wsize):(U.wnext+=J,U.wnext===U.wsize&&(U.wnext=0),U.whave<U.wsize&&(U.whave+=J))),0}d.inflateReset=P,d.inflateReset2=C,d.inflateResetKeep=B,d.inflateInit=function(_){return L(_,15)},d.inflateInit2=L,d.inflate=function(_,z){var n,M,J,U,ee,W,Q,E,S,Y,G,H,ae,le,te,oe,ce,ie,he,ue,r,T,A,k,f=0,v=new c.Buf8(4),F=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!_||!_.state||!_.output||!_.input&&_.avail_in!==0)return s;(n=_.state).mode===12&&(n.mode=13),ee=_.next_out,J=_.output,Q=_.avail_out,U=_.next_in,M=_.input,W=_.avail_in,E=n.hold,S=n.bits,Y=W,G=Q,T=y;e:for(;;)switch(n.mode){case b:if(n.wrap===0){n.mode=13;break}for(;S<16;){if(W===0)break e;W--,E+=M[U++]<<S,S+=8}if(2&n.wrap&&E===35615){v[n.check=0]=255&E,v[1]=E>>>8&255,n.check=t(n.check,v,2,0),S=E=0,n.mode=2;break}if(n.flags=0,n.head&&(n.head.done=!1),!(1&n.wrap)||(((255&E)<<8)+(E>>8))%31){_.msg="incorrect header check",n.mode=30;break}if((15&E)!=8){_.msg="unknown compression method",n.mode=30;break}if(S-=4,r=8+(15&(E>>>=4)),n.wbits===0)n.wbits=r;else if(r>n.wbits){_.msg="invalid window size",n.mode=30;break}n.dmax=1<<r,_.adler=n.check=1,n.mode=512&E?10:12,S=E=0;break;case 2:for(;S<16;){if(W===0)break e;W--,E+=M[U++]<<S,S+=8}if(n.flags=E,(255&n.flags)!=8){_.msg="unknown compression method",n.mode=30;break}if(57344&n.flags){_.msg="unknown header flags set",n.mode=30;break}n.head&&(n.head.text=E>>8&1),512&n.flags&&(v[0]=255&E,v[1]=E>>>8&255,n.check=t(n.check,v,2,0)),S=E=0,n.mode=3;case 3:for(;S<32;){if(W===0)break e;W--,E+=M[U++]<<S,S+=8}n.head&&(n.head.time=E),512&n.flags&&(v[0]=255&E,v[1]=E>>>8&255,v[2]=E>>>16&255,v[3]=E>>>24&255,n.check=t(n.check,v,4,0)),S=E=0,n.mode=4;case 4:for(;S<16;){if(W===0)break e;W--,E+=M[U++]<<S,S+=8}n.head&&(n.head.xflags=255&E,n.head.os=E>>8),512&n.flags&&(v[0]=255&E,v[1]=E>>>8&255,n.check=t(n.check,v,2,0)),S=E=0,n.mode=5;case 5:if(1024&n.flags){for(;S<16;){if(W===0)break e;W--,E+=M[U++]<<S,S+=8}n.length=E,n.head&&(n.head.extra_len=E),512&n.flags&&(v[0]=255&E,v[1]=E>>>8&255,n.check=t(n.check,v,2,0)),S=E=0}else n.head&&(n.head.extra=null);n.mode=6;case 6:if(1024&n.flags&&(W<(H=n.length)&&(H=W),H&&(n.head&&(r=n.head.extra_len-n.length,n.head.extra||(n.head.extra=new Array(n.head.extra_len)),c.arraySet(n.head.extra,M,U,H,r)),512&n.flags&&(n.check=t(n.check,M,H,U)),W-=H,U+=H,n.length-=H),n.length))break e;n.length=0,n.mode=7;case 7:if(2048&n.flags){if(W===0)break e;for(H=0;r=M[U+H++],n.head&&r&&n.length<65536&&(n.head.name+=String.fromCharCode(r)),r&&H<W;);if(512&n.flags&&(n.check=t(n.check,M,H,U)),W-=H,U+=H,r)break e}else n.head&&(n.head.name=null);n.length=0,n.mode=8;case 8:if(4096&n.flags){if(W===0)break e;for(H=0;r=M[U+H++],n.head&&r&&n.length<65536&&(n.head.comment+=String.fromCharCode(r)),r&&H<W;);if(512&n.flags&&(n.check=t(n.check,M,H,U)),W-=H,U+=H,r)break e}else n.head&&(n.head.comment=null);n.mode=9;case 9:if(512&n.flags){for(;S<16;){if(W===0)break e;W--,E+=M[U++]<<S,S+=8}if(E!==(65535&n.check)){_.msg="header crc mismatch",n.mode=30;break}S=E=0}n.head&&(n.head.hcrc=n.flags>>9&1,n.head.done=!0),_.adler=n.check=0,n.mode=12;break;case 10:for(;S<32;){if(W===0)break e;W--,E+=M[U++]<<S,S+=8}_.adler=n.check=u(E),S=E=0,n.mode=11;case 11:if(n.havedict===0)return _.next_out=ee,_.avail_out=Q,_.next_in=U,_.avail_in=W,n.hold=E,n.bits=S,2;_.adler=n.check=1,n.mode=12;case 12:if(z===5||z===6)break e;case 13:if(n.last){E>>>=7&S,S-=7&S,n.mode=27;break}for(;S<3;){if(W===0)break e;W--,E+=M[U++]<<S,S+=8}switch(n.last=1&E,S-=1,3&(E>>>=1)){case 0:n.mode=14;break;case 1:if(j(n),n.mode=20,z!==6)break;E>>>=2,S-=2;break e;case 2:n.mode=17;break;case 3:_.msg="invalid block type",n.mode=30}E>>>=2,S-=2;break;case 14:for(E>>>=7&S,S-=7&S;S<32;){if(W===0)break e;W--,E+=M[U++]<<S,S+=8}if((65535&E)!=(E>>>16^65535)){_.msg="invalid stored block lengths",n.mode=30;break}if(n.length=65535&E,S=E=0,n.mode=15,z===6)break e;case 15:n.mode=16;case 16:if(H=n.length){if(W<H&&(H=W),Q<H&&(H=Q),H===0)break e;c.arraySet(J,M,U,H,ee),W-=H,U+=H,Q-=H,ee+=H,n.length-=H;break}n.mode=12;break;case 17:for(;S<14;){if(W===0)break e;W--,E+=M[U++]<<S,S+=8}if(n.nlen=257+(31&E),E>>>=5,S-=5,n.ndist=1+(31&E),E>>>=5,S-=5,n.ncode=4+(15&E),E>>>=4,S-=4,286<n.nlen||30<n.ndist){_.msg="too many length or distance symbols",n.mode=30;break}n.have=0,n.mode=18;case 18:for(;n.have<n.ncode;){for(;S<3;){if(W===0)break e;W--,E+=M[U++]<<S,S+=8}n.lens[F[n.have++]]=7&E,E>>>=3,S-=3}for(;n.have<19;)n.lens[F[n.have++]]=0;if(n.lencode=n.lendyn,n.lenbits=7,A={bits:n.lenbits},T=h(0,n.lens,0,19,n.lencode,0,n.work,A),n.lenbits=A.bits,T){_.msg="invalid code lengths set",n.mode=30;break}n.have=0,n.mode=19;case 19:for(;n.have<n.nlen+n.ndist;){for(;oe=(f=n.lencode[E&(1<<n.lenbits)-1])>>>16&255,ce=65535&f,!((te=f>>>24)<=S);){if(W===0)break e;W--,E+=M[U++]<<S,S+=8}if(ce<16)E>>>=te,S-=te,n.lens[n.have++]=ce;else{if(ce===16){for(k=te+2;S<k;){if(W===0)break e;W--,E+=M[U++]<<S,S+=8}if(E>>>=te,S-=te,n.have===0){_.msg="invalid bit length repeat",n.mode=30;break}r=n.lens[n.have-1],H=3+(3&E),E>>>=2,S-=2}else if(ce===17){for(k=te+3;S<k;){if(W===0)break e;W--,E+=M[U++]<<S,S+=8}S-=te,r=0,H=3+(7&(E>>>=te)),E>>>=3,S-=3}else{for(k=te+7;S<k;){if(W===0)break e;W--,E+=M[U++]<<S,S+=8}S-=te,r=0,H=11+(127&(E>>>=te)),E>>>=7,S-=7}if(n.have+H>n.nlen+n.ndist){_.msg="invalid bit length repeat",n.mode=30;break}for(;H--;)n.lens[n.have++]=r}}if(n.mode===30)break;if(n.lens[256]===0){_.msg="invalid code -- missing end-of-block",n.mode=30;break}if(n.lenbits=9,A={bits:n.lenbits},T=h(g,n.lens,0,n.nlen,n.lencode,0,n.work,A),n.lenbits=A.bits,T){_.msg="invalid literal/lengths set",n.mode=30;break}if(n.distbits=6,n.distcode=n.distdyn,A={bits:n.distbits},T=h(w,n.lens,n.nlen,n.ndist,n.distcode,0,n.work,A),n.distbits=A.bits,T){_.msg="invalid distances set",n.mode=30;break}if(n.mode=20,z===6)break e;case 20:n.mode=21;case 21:if(6<=W&&258<=Q){_.next_out=ee,_.avail_out=Q,_.next_in=U,_.avail_in=W,n.hold=E,n.bits=S,a(_,G),ee=_.next_out,J=_.output,Q=_.avail_out,U=_.next_in,M=_.input,W=_.avail_in,E=n.hold,S=n.bits,n.mode===12&&(n.back=-1);break}for(n.back=0;oe=(f=n.lencode[E&(1<<n.lenbits)-1])>>>16&255,ce=65535&f,!((te=f>>>24)<=S);){if(W===0)break e;W--,E+=M[U++]<<S,S+=8}if(oe&&(240&oe)==0){for(ie=te,he=oe,ue=ce;oe=(f=n.lencode[ue+((E&(1<<ie+he)-1)>>ie)])>>>16&255,ce=65535&f,!(ie+(te=f>>>24)<=S);){if(W===0)break e;W--,E+=M[U++]<<S,S+=8}E>>>=ie,S-=ie,n.back+=ie}if(E>>>=te,S-=te,n.back+=te,n.length=ce,oe===0){n.mode=26;break}if(32&oe){n.back=-1,n.mode=12;break}if(64&oe){_.msg="invalid literal/length code",n.mode=30;break}n.extra=15&oe,n.mode=22;case 22:if(n.extra){for(k=n.extra;S<k;){if(W===0)break e;W--,E+=M[U++]<<S,S+=8}n.length+=E&(1<<n.extra)-1,E>>>=n.extra,S-=n.extra,n.back+=n.extra}n.was=n.length,n.mode=23;case 23:for(;oe=(f=n.distcode[E&(1<<n.distbits)-1])>>>16&255,ce=65535&f,!((te=f>>>24)<=S);){if(W===0)break e;W--,E+=M[U++]<<S,S+=8}if((240&oe)==0){for(ie=te,he=oe,ue=ce;oe=(f=n.distcode[ue+((E&(1<<ie+he)-1)>>ie)])>>>16&255,ce=65535&f,!(ie+(te=f>>>24)<=S);){if(W===0)break e;W--,E+=M[U++]<<S,S+=8}E>>>=ie,S-=ie,n.back+=ie}if(E>>>=te,S-=te,n.back+=te,64&oe){_.msg="invalid distance code",n.mode=30;break}n.offset=ce,n.extra=15&oe,n.mode=24;case 24:if(n.extra){for(k=n.extra;S<k;){if(W===0)break e;W--,E+=M[U++]<<S,S+=8}n.offset+=E&(1<<n.extra)-1,E>>>=n.extra,S-=n.extra,n.back+=n.extra}if(n.offset>n.dmax){_.msg="invalid distance too far back",n.mode=30;break}n.mode=25;case 25:if(Q===0)break e;if(H=G-Q,n.offset>H){if((H=n.offset-H)>n.whave&&n.sane){_.msg="invalid distance too far back",n.mode=30;break}ae=H>n.wnext?(H-=n.wnext,n.wsize-H):n.wnext-H,H>n.length&&(H=n.length),le=n.window}else le=J,ae=ee-n.offset,H=n.length;for(Q<H&&(H=Q),Q-=H,n.length-=H;J[ee++]=le[ae++],--H;);n.length===0&&(n.mode=21);break;case 26:if(Q===0)break e;J[ee++]=n.length,Q--,n.mode=21;break;case 27:if(n.wrap){for(;S<32;){if(W===0)break e;W--,E|=M[U++]<<S,S+=8}if(G-=Q,_.total_out+=G,n.total+=G,G&&(_.adler=n.check=n.flags?t(n.check,J,G,ee-G):e(n.check,J,G,ee-G)),G=Q,(n.flags?E:u(E))!==n.check){_.msg="incorrect data check",n.mode=30;break}S=E=0}n.mode=28;case 28:if(n.wrap&&n.flags){for(;S<32;){if(W===0)break e;W--,E+=M[U++]<<S,S+=8}if(E!==(4294967295&n.total)){_.msg="incorrect length check",n.mode=30;break}S=E=0}n.mode=29;case 29:T=1;break e;case 30:T=-3;break e;case 31:return-4;default:return s}return _.next_out=ee,_.avail_out=Q,_.next_in=U,_.avail_in=W,n.hold=E,n.bits=S,(n.wsize||G!==_.avail_out&&n.mode<30&&(n.mode<27||z!==4))&&K(_,_.output,_.next_out,G-_.avail_out)?(n.mode=31,-4):(Y-=_.avail_in,G-=_.avail_out,_.total_in+=Y,_.total_out+=G,n.total+=G,n.wrap&&G&&(_.adler=n.check=n.flags?t(n.check,J,G,_.next_out-G):e(n.check,J,G,_.next_out-G)),_.data_type=n.bits+(n.last?64:0)+(n.mode===12?128:0)+(n.mode===20||n.mode===15?256:0),(Y==0&&G===0||z===4)&&T===y&&(T=-5),T)},d.inflateEnd=function(_){if(!_||!_.state)return s;var z=_.state;return z.window&&(z.window=null),_.state=null,y},d.inflateGetHeader=function(_,z){var n;return _&&_.state?(2&(n=_.state).wrap)==0?s:((n.head=z).done=!1,y):s},d.inflateSetDictionary=function(_,z){var n,M=z.length;return _&&_.state?(n=_.state).wrap!==0&&n.mode!==11?s:n.mode===11&&e(1,z,M,0)!==n.check?-3:K(_,z,M,M)?(n.mode=31,-4):(n.havedict=1,y):s},d.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(o,l,d){var c=o("../utils/common"),e=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],t=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],a=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],h=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];l.exports=function(g,w,y,s,b,i,m,u){var p,B,P,C,L,I,D,O,j,K=u.bits,_=0,z=0,n=0,M=0,J=0,U=0,ee=0,W=0,Q=0,E=0,S=null,Y=0,G=new c.Buf16(16),H=new c.Buf16(16),ae=null,le=0;for(_=0;_<=15;_++)G[_]=0;for(z=0;z<s;z++)G[w[y+z]]++;for(J=K,M=15;1<=M&&G[M]===0;M--);if(M<J&&(J=M),M===0)return b[i++]=20971520,b[i++]=20971520,u.bits=1,0;for(n=1;n<M&&G[n]===0;n++);for(J<n&&(J=n),_=W=1;_<=15;_++)if(W<<=1,(W-=G[_])<0)return-1;if(0<W&&(g===0||M!==1))return-1;for(H[1]=0,_=1;_<15;_++)H[_+1]=H[_]+G[_];for(z=0;z<s;z++)w[y+z]!==0&&(m[H[w[y+z]]++]=z);if(I=g===0?(S=ae=m,19):g===1?(S=e,Y-=257,ae=t,le-=257,256):(S=a,ae=h,-1),_=n,L=i,ee=z=E=0,P=-1,C=(Q=1<<(U=J))-1,g===1&&852<Q||g===2&&592<Q)return 1;for(;;){for(D=_-ee,j=m[z]<I?(O=0,m[z]):m[z]>I?(O=ae[le+m[z]],S[Y+m[z]]):(O=96,0),p=1<<_-ee,n=B=1<<U;b[L+(E>>ee)+(B-=p)]=D<<24|O<<16|j|0,B!==0;);for(p=1<<_-1;E&p;)p>>=1;if(p!==0?(E&=p-1,E+=p):E=0,z++,--G[_]==0){if(_===M)break;_=w[y+m[z]]}if(J<_&&(E&C)!==P){for(ee===0&&(ee=J),L+=n,W=1<<(U=_-ee);U+ee<M&&!((W-=G[U+ee])<=0);)U++,W<<=1;if(Q+=1<<U,g===1&&852<Q||g===2&&592<Q)return 1;b[P=E&C]=J<<24|U<<16|L-i|0}}return E!==0&&(b[L+E]=_-ee<<24|64<<16|0),u.bits=J,0}},{"../utils/common":41}],51:[function(o,l,d){l.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(o,l,d){var c=o("../utils/common"),e=0,t=1;function a(f){for(var v=f.length;0<=--v;)f[v]=0}var h=0,g=29,w=256,y=w+1+g,s=30,b=19,i=2*y+1,m=15,u=16,p=7,B=256,P=16,C=17,L=18,I=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],D=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],O=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],j=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],K=new Array(2*(y+2));a(K);var _=new Array(2*s);a(_);var z=new Array(512);a(z);var n=new Array(256);a(n);var M=new Array(g);a(M);var J,U,ee,W=new Array(s);function Q(f,v,F,N,x){this.static_tree=f,this.extra_bits=v,this.extra_base=F,this.elems=N,this.max_length=x,this.has_stree=f&&f.length}function E(f,v){this.dyn_tree=f,this.max_code=0,this.stat_desc=v}function S(f){return f<256?z[f]:z[256+(f>>>7)]}function Y(f,v){f.pending_buf[f.pending++]=255&v,f.pending_buf[f.pending++]=v>>>8&255}function G(f,v,F){f.bi_valid>u-F?(f.bi_buf|=v<<f.bi_valid&65535,Y(f,f.bi_buf),f.bi_buf=v>>u-f.bi_valid,f.bi_valid+=F-u):(f.bi_buf|=v<<f.bi_valid&65535,f.bi_valid+=F)}function H(f,v,F){G(f,F[2*v],F[2*v+1])}function ae(f,v){for(var F=0;F|=1&f,f>>>=1,F<<=1,0<--v;);return F>>>1}function le(f,v,F){var N,x,Z=new Array(m+1),X=0;for(N=1;N<=m;N++)Z[N]=X=X+F[N-1]<<1;for(x=0;x<=v;x++){var q=f[2*x+1];q!==0&&(f[2*x]=ae(Z[q]++,q))}}function te(f){var v;for(v=0;v<y;v++)f.dyn_ltree[2*v]=0;for(v=0;v<s;v++)f.dyn_dtree[2*v]=0;for(v=0;v<b;v++)f.bl_tree[2*v]=0;f.dyn_ltree[2*B]=1,f.opt_len=f.static_len=0,f.last_lit=f.matches=0}function oe(f){8<f.bi_valid?Y(f,f.bi_buf):0<f.bi_valid&&(f.pending_buf[f.pending++]=f.bi_buf),f.bi_buf=0,f.bi_valid=0}function ce(f,v,F,N){var x=2*v,Z=2*F;return f[x]<f[Z]||f[x]===f[Z]&&N[v]<=N[F]}function ie(f,v,F){for(var N=f.heap[F],x=F<<1;x<=f.heap_len&&(x<f.heap_len&&ce(v,f.heap[x+1],f.heap[x],f.depth)&&x++,!ce(v,N,f.heap[x],f.depth));)f.heap[F]=f.heap[x],F=x,x<<=1;f.heap[F]=N}function he(f,v,F){var N,x,Z,X,q=0;if(f.last_lit!==0)for(;N=f.pending_buf[f.d_buf+2*q]<<8|f.pending_buf[f.d_buf+2*q+1],x=f.pending_buf[f.l_buf+q],q++,N===0?H(f,x,v):(H(f,(Z=n[x])+w+1,v),(X=I[Z])!==0&&G(f,x-=M[Z],X),H(f,Z=S(--N),F),(X=D[Z])!==0&&G(f,N-=W[Z],X)),q<f.last_lit;);H(f,B,v)}function ue(f,v){var F,N,x,Z=v.dyn_tree,X=v.stat_desc.static_tree,q=v.stat_desc.has_stree,V=v.stat_desc.elems,ne=-1;for(f.heap_len=0,f.heap_max=i,F=0;F<V;F++)Z[2*F]!==0?(f.heap[++f.heap_len]=ne=F,f.depth[F]=0):Z[2*F+1]=0;for(;f.heap_len<2;)Z[2*(x=f.heap[++f.heap_len]=ne<2?++ne:0)]=1,f.depth[x]=0,f.opt_len--,q&&(f.static_len-=X[2*x+1]);for(v.max_code=ne,F=f.heap_len>>1;1<=F;F--)ie(f,Z,F);for(x=V;F=f.heap[1],f.heap[1]=f.heap[f.heap_len--],ie(f,Z,1),N=f.heap[1],f.heap[--f.heap_max]=F,f.heap[--f.heap_max]=N,Z[2*x]=Z[2*F]+Z[2*N],f.depth[x]=(f.depth[F]>=f.depth[N]?f.depth[F]:f.depth[N])+1,Z[2*F+1]=Z[2*N+1]=x,f.heap[1]=x++,ie(f,Z,1),2<=f.heap_len;);f.heap[--f.heap_max]=f.heap[1],(function(re,de){var we,fe,be,se,Ee,Me,me=de.dyn_tree,Ke=de.max_code,bt=de.stat_desc.static_tree,yt=de.stat_desc.has_stree,_t=de.stat_desc.extra_bits,Qe=de.stat_desc.extra_base,ye=de.stat_desc.max_length,Ae=0;for(se=0;se<=m;se++)re.bl_count[se]=0;for(me[2*re.heap[re.heap_max]+1]=0,we=re.heap_max+1;we<i;we++)ye<(se=me[2*me[2*(fe=re.heap[we])+1]+1]+1)&&(se=ye,Ae++),me[2*fe+1]=se,Ke<fe||(re.bl_count[se]++,Ee=0,Qe<=fe&&(Ee=_t[fe-Qe]),Me=me[2*fe],re.opt_len+=Me*(se+Ee),yt&&(re.static_len+=Me*(bt[2*fe+1]+Ee)));if(Ae!==0){do{for(se=ye-1;re.bl_count[se]===0;)se--;re.bl_count[se]--,re.bl_count[se+1]+=2,re.bl_count[ye]--,Ae-=2}while(0<Ae);for(se=ye;se!==0;se--)for(fe=re.bl_count[se];fe!==0;)Ke<(be=re.heap[--we])||(me[2*be+1]!==se&&(re.opt_len+=(se-me[2*be+1])*me[2*be],me[2*be+1]=se),fe--)}})(f,v),le(Z,ne,f.bl_count)}function r(f,v,F){var N,x,Z=-1,X=v[1],q=0,V=7,ne=4;for(X===0&&(V=138,ne=3),v[2*(F+1)+1]=65535,N=0;N<=F;N++)x=X,X=v[2*(N+1)+1],++q<V&&x===X||(q<ne?f.bl_tree[2*x]+=q:x!==0?(x!==Z&&f.bl_tree[2*x]++,f.bl_tree[2*P]++):q<=10?f.bl_tree[2*C]++:f.bl_tree[2*L]++,Z=x,ne=(q=0)===X?(V=138,3):x===X?(V=6,3):(V=7,4))}function T(f,v,F){var N,x,Z=-1,X=v[1],q=0,V=7,ne=4;for(X===0&&(V=138,ne=3),N=0;N<=F;N++)if(x=X,X=v[2*(N+1)+1],!(++q<V&&x===X)){if(q<ne)for(;H(f,x,f.bl_tree),--q!=0;);else x!==0?(x!==Z&&(H(f,x,f.bl_tree),q--),H(f,P,f.bl_tree),G(f,q-3,2)):q<=10?(H(f,C,f.bl_tree),G(f,q-3,3)):(H(f,L,f.bl_tree),G(f,q-11,7));Z=x,ne=(q=0)===X?(V=138,3):x===X?(V=6,3):(V=7,4)}}a(W);var A=!1;function k(f,v,F,N){G(f,(h<<1)+(N?1:0),3),(function(x,Z,X,q){oe(x),Y(x,X),Y(x,~X),c.arraySet(x.pending_buf,x.window,Z,X,x.pending),x.pending+=X})(f,v,F)}d._tr_init=function(f){A||((function(){var v,F,N,x,Z,X=new Array(m+1);for(x=N=0;x<g-1;x++)for(M[x]=N,v=0;v<1<<I[x];v++)n[N++]=x;for(n[N-1]=x,x=Z=0;x<16;x++)for(W[x]=Z,v=0;v<1<<D[x];v++)z[Z++]=x;for(Z>>=7;x<s;x++)for(W[x]=Z<<7,v=0;v<1<<D[x]-7;v++)z[256+Z++]=x;for(F=0;F<=m;F++)X[F]=0;for(v=0;v<=143;)K[2*v+1]=8,v++,X[8]++;for(;v<=255;)K[2*v+1]=9,v++,X[9]++;for(;v<=279;)K[2*v+1]=7,v++,X[7]++;for(;v<=287;)K[2*v+1]=8,v++,X[8]++;for(le(K,y+1,X),v=0;v<s;v++)_[2*v+1]=5,_[2*v]=ae(v,5);J=new Q(K,I,w+1,y,m),U=new Q(_,D,0,s,m),ee=new Q(new Array(0),O,0,b,p)})(),A=!0),f.l_desc=new E(f.dyn_ltree,J),f.d_desc=new E(f.dyn_dtree,U),f.bl_desc=new E(f.bl_tree,ee),f.bi_buf=0,f.bi_valid=0,te(f)},d._tr_stored_block=k,d._tr_flush_block=function(f,v,F,N){var x,Z,X=0;0<f.level?(f.strm.data_type===2&&(f.strm.data_type=(function(q){var V,ne=4093624447;for(V=0;V<=31;V++,ne>>>=1)if(1&ne&&q.dyn_ltree[2*V]!==0)return e;if(q.dyn_ltree[18]!==0||q.dyn_ltree[20]!==0||q.dyn_ltree[26]!==0)return t;for(V=32;V<w;V++)if(q.dyn_ltree[2*V]!==0)return t;return e})(f)),ue(f,f.l_desc),ue(f,f.d_desc),X=(function(q){var V;for(r(q,q.dyn_ltree,q.l_desc.max_code),r(q,q.dyn_dtree,q.d_desc.max_code),ue(q,q.bl_desc),V=b-1;3<=V&&q.bl_tree[2*j[V]+1]===0;V--);return q.opt_len+=3*(V+1)+5+5+4,V})(f),x=f.opt_len+3+7>>>3,(Z=f.static_len+3+7>>>3)<=x&&(x=Z)):x=Z=F+5,F+4<=x&&v!==-1?k(f,v,F,N):f.strategy===4||Z===x?(G(f,2+(N?1:0),3),he(f,K,_)):(G(f,4+(N?1:0),3),(function(q,V,ne,re){var de;for(G(q,V-257,5),G(q,ne-1,5),G(q,re-4,4),de=0;de<re;de++)G(q,q.bl_tree[2*j[de]+1],3);T(q,q.dyn_ltree,V-1),T(q,q.dyn_dtree,ne-1)})(f,f.l_desc.max_code+1,f.d_desc.max_code+1,X+1),he(f,f.dyn_ltree,f.dyn_dtree)),te(f),N&&oe(f)},d._tr_tally=function(f,v,F){return f.pending_buf[f.d_buf+2*f.last_lit]=v>>>8&255,f.pending_buf[f.d_buf+2*f.last_lit+1]=255&v,f.pending_buf[f.l_buf+f.last_lit]=255&F,f.last_lit++,v===0?f.dyn_ltree[2*F]++:(f.matches++,v--,f.dyn_ltree[2*(n[F]+w+1)]++,f.dyn_dtree[2*S(v)]++),f.last_lit===f.lit_bufsize-1},d._tr_align=function(f){G(f,2,3),H(f,B,K),(function(v){v.bi_valid===16?(Y(v,v.bi_buf),v.bi_buf=0,v.bi_valid=0):8<=v.bi_valid&&(v.pending_buf[v.pending++]=255&v.bi_buf,v.bi_buf>>=8,v.bi_valid-=8)})(f)}},{"../utils/common":41}],53:[function(o,l,d){l.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(o,l,d){(function(c){(function(e,t){if(!e.setImmediate){var a,h,g,w,y=1,s={},b=!1,i=e.document,m=Object.getPrototypeOf&&Object.getPrototypeOf(e);m=m&&m.setTimeout?m:e,a={}.toString.call(e.process)==="[object process]"?function(P){process.nextTick(function(){p(P)})}:(function(){if(e.postMessage&&!e.importScripts){var P=!0,C=e.onmessage;return e.onmessage=function(){P=!1},e.postMessage("","*"),e.onmessage=C,P}})()?(w="setImmediate$"+Math.random()+"$",e.addEventListener?e.addEventListener("message",B,!1):e.attachEvent("onmessage",B),function(P){e.postMessage(w+P,"*")}):e.MessageChannel?((g=new MessageChannel).port1.onmessage=function(P){p(P.data)},function(P){g.port2.postMessage(P)}):i&&"onreadystatechange"in i.createElement("script")?(h=i.documentElement,function(P){var C=i.createElement("script");C.onreadystatechange=function(){p(P),C.onreadystatechange=null,h.removeChild(C),C=null},h.appendChild(C)}):function(P){setTimeout(p,0,P)},m.setImmediate=function(P){typeof P!="function"&&(P=new Function(""+P));for(var C=new Array(arguments.length-1),L=0;L<C.length;L++)C[L]=arguments[L+1];var I={callback:P,args:C};return s[y]=I,a(y),y++},m.clearImmediate=u}function u(P){delete s[P]}function p(P){if(b)setTimeout(p,0,P);else{var C=s[P];if(C){b=!0;try{(function(L){var I=L.callback,D=L.args;switch(D.length){case 0:I();break;case 1:I(D[0]);break;case 2:I(D[0],D[1]);break;case 3:I(D[0],D[1],D[2]);break;default:I.apply(t,D)}})(C)}finally{u(P),b=!1}}}}function B(P){P.source===e&&typeof P.data=="string"&&P.data.indexOf(w)===0&&p(+P.data.slice(w.length))}})(typeof self>"u"?c===void 0?this:c:self)}).call(this,typeof ge<"u"?ge:typeof self<"u"?self:typeof window<"u"?window:{})},{}]},{},[10])(10)})})(He)),He.exports}var ht=ut(),Ge=qe(ht),Le={exports:{}},Xe=Le.exports,Ve;function ft(){return Ve||(Ve=1,(function(R,$){var o=o||{};o.scope={},o.ASSUME_ES5=!1,o.ASSUME_NO_NATIVE_MAP=!1,o.ASSUME_NO_NATIVE_SET=!1,o.SIMPLE_FROUND_POLYFILL=!1,o.ISOLATE_POLYFILLS=!1,o.FORCE_POLYFILL_PROMISE=!1,o.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION=!1,o.defineProperty=o.ASSUME_ES5||typeof Object.defineProperties=="function"?Object.defineProperty:function(l,d,c){return l==Array.prototype||l==Object.prototype||(l[d]=c.value),l},o.getGlobal=function(l){l=[typeof globalThis=="object"&&globalThis,l,typeof window=="object"&&window,typeof self=="object"&&self,typeof ge=="object"&&ge];for(var d=0;d<l.length;++d){var c=l[d];if(c&&c.Math==Math)return c}throw Error("Cannot find global object")},o.global=o.getGlobal(Xe),o.IS_SYMBOL_NATIVE=typeof Symbol=="function"&&typeof Symbol("x")=="symbol",o.TRUST_ES6_POLYFILLS=!o.ISOLATE_POLYFILLS||o.IS_SYMBOL_NATIVE,o.polyfills={},o.propertyToPolyfillSymbol={},o.POLYFILL_PREFIX="$jscp$",o.polyfill=function(l,d,c,e){d&&(o.ISOLATE_POLYFILLS?o.polyfillIsolated(l,d,c,e):o.polyfillUnisolated(l,d,c,e))},o.polyfillUnisolated=function(l,d,c,e){for(c=o.global,l=l.split("."),e=0;e<l.length-1;e++){var t=l[e];if(!(t in c))return;c=c[t]}l=l[l.length-1],e=c[l],d=d(e),d!=e&&d!=null&&o.defineProperty(c,l,{configurable:!0,writable:!0,value:d})},o.polyfillIsolated=function(l,d,c,e){var t=l.split(".");l=t.length===1,e=t[0],e=!l&&e in o.polyfills?o.polyfills:o.global;for(var a=0;a<t.length-1;a++){var h=t[a];if(!(h in e))return;e=e[h]}t=t[t.length-1],c=o.IS_SYMBOL_NATIVE&&c==="es6"?e[t]:null,d=d(c),d!=null&&(l?o.defineProperty(o.polyfills,t,{configurable:!0,writable:!0,value:d}):d!==c&&(o.propertyToPolyfillSymbol[t]===void 0&&(c=1e9*Math.random()>>>0,o.propertyToPolyfillSymbol[t]=o.IS_SYMBOL_NATIVE?o.global.Symbol(t):o.POLYFILL_PREFIX+c+"$"+t),o.defineProperty(e,o.propertyToPolyfillSymbol[t],{configurable:!0,writable:!0,value:d})))},o.underscoreProtoCanBeSet=function(){var l={a:!0},d={};try{return d.__proto__=l,d.a}catch{}return!1},o.setPrototypeOf=o.TRUST_ES6_POLYFILLS&&typeof Object.setPrototypeOf=="function"?Object.setPrototypeOf:o.underscoreProtoCanBeSet()?function(l,d){if(l.__proto__=d,l.__proto__!==d)throw new TypeError(l+" is not extensible");return l}:null,o.arrayIteratorImpl=function(l){var d=0;return function(){return d<l.length?{done:!1,value:l[d++]}:{done:!0}}},o.arrayIterator=function(l){return{next:o.arrayIteratorImpl(l)}},o.makeIterator=function(l){var d=typeof Symbol<"u"&&Symbol.iterator&&l[Symbol.iterator];return d?d.call(l):o.arrayIterator(l)},o.generator={},o.generator.ensureIteratorResultIsObject_=function(l){if(!(l instanceof Object))throw new TypeError("Iterator result "+l+" is not an object")},o.generator.Context=function(){this.isRunning_=!1,this.yieldAllIterator_=null,this.yieldResult=void 0,this.nextAddress=1,this.finallyAddress_=this.catchAddress_=0,this.finallyContexts_=this.abruptCompletion_=null},o.generator.Context.prototype.start_=function(){if(this.isRunning_)throw new TypeError("Generator is already running");this.isRunning_=!0},o.generator.Context.prototype.stop_=function(){this.isRunning_=!1},o.generator.Context.prototype.jumpToErrorHandler_=function(){this.nextAddress=this.catchAddress_||this.finallyAddress_},o.generator.Context.prototype.next_=function(l){this.yieldResult=l},o.generator.Context.prototype.throw_=function(l){this.abruptCompletion_={exception:l,isException:!0},this.jumpToErrorHandler_()},o.generator.Context.prototype.return=function(l){this.abruptCompletion_={return:l},this.nextAddress=this.finallyAddress_},o.generator.Context.prototype.jumpThroughFinallyBlocks=function(l){this.abruptCompletion_={jumpTo:l},this.nextAddress=this.finallyAddress_},o.generator.Context.prototype.yield=function(l,d){return this.nextAddress=d,{value:l}},o.generator.Context.prototype.yieldAll=function(l,d){l=o.makeIterator(l);var c=l.next();if(o.generator.ensureIteratorResultIsObject_(c),c.done)this.yieldResult=c.value,this.nextAddress=d;else return this.yieldAllIterator_=l,this.yield(c.value,d)},o.generator.Context.prototype.jumpTo=function(l){this.nextAddress=l},o.generator.Context.prototype.jumpToEnd=function(){this.nextAddress=0},o.generator.Context.prototype.setCatchFinallyBlocks=function(l,d){this.catchAddress_=l,d!=null&&(this.finallyAddress_=d)},o.generator.Context.prototype.setFinallyBlock=function(l){this.catchAddress_=0,this.finallyAddress_=l||0},o.generator.Context.prototype.leaveTryBlock=function(l,d){this.nextAddress=l,this.catchAddress_=d||0},o.generator.Context.prototype.enterCatchBlock=function(l){return this.catchAddress_=l||0,l=this.abruptCompletion_.exception,this.abruptCompletion_=null,l},o.generator.Context.prototype.enterFinallyBlock=function(l,d,c){c?this.finallyContexts_[c]=this.abruptCompletion_:this.finallyContexts_=[this.abruptCompletion_],this.catchAddress_=l||0,this.finallyAddress_=d||0},o.generator.Context.prototype.leaveFinallyBlock=function(l,d){if(d=this.finallyContexts_.splice(d||0)[0],d=this.abruptCompletion_=this.abruptCompletion_||d){if(d.isException)return this.jumpToErrorHandler_();d.jumpTo!=null&&this.finallyAddress_<d.jumpTo?(this.nextAddress=d.jumpTo,this.abruptCompletion_=null):this.nextAddress=this.finallyAddress_}else this.nextAddress=l},o.generator.Context.prototype.forIn=function(l){return new o.generator.Context.PropertyIterator(l)},o.generator.Context.PropertyIterator=function(l){this.object_=l,this.properties_=[];for(var d in l)this.properties_.push(d);this.properties_.reverse()},o.generator.Context.PropertyIterator.prototype.getNext=function(){for(;0<this.properties_.length;){var l=this.properties_.pop();if(l in this.object_)return l}return null},o.generator.Engine_=function(l){this.context_=new o.generator.Context,this.program_=l},o.generator.Engine_.prototype.next_=function(l){return this.context_.start_(),this.context_.yieldAllIterator_?this.yieldAllStep_(this.context_.yieldAllIterator_.next,l,this.context_.next_):(this.context_.next_(l),this.nextStep_())},o.generator.Engine_.prototype.return_=function(l){this.context_.start_();var d=this.context_.yieldAllIterator_;return d?this.yieldAllStep_("return"in d?d.return:function(c){return{value:c,done:!0}},l,this.context_.return):(this.context_.return(l),this.nextStep_())},o.generator.Engine_.prototype.throw_=function(l){return this.context_.start_(),this.context_.yieldAllIterator_?this.yieldAllStep_(this.context_.yieldAllIterator_.throw,l,this.context_.next_):(this.context_.throw_(l),this.nextStep_())},o.generator.Engine_.prototype.yieldAllStep_=function(l,d,c){try{var e=l.call(this.context_.yieldAllIterator_,d);if(o.generator.ensureIteratorResultIsObject_(e),!e.done)return this.context_.stop_(),e;var t=e.value}catch(a){return this.context_.yieldAllIterator_=null,this.context_.throw_(a),this.nextStep_()}return this.context_.yieldAllIterator_=null,c.call(this.context_,t),this.nextStep_()},o.generator.Engine_.prototype.nextStep_=function(){for(;this.context_.nextAddress;)try{var l=this.program_(this.context_);if(l)return this.context_.stop_(),{value:l.value,done:!1}}catch(d){this.context_.yieldResult=void 0,this.context_.throw_(d)}if(this.context_.stop_(),this.context_.abruptCompletion_){if(l=this.context_.abruptCompletion_,this.context_.abruptCompletion_=null,l.isException)throw l.exception;return{value:l.return,done:!0}}return{value:void 0,done:!0}},o.generator.Generator_=function(l){this.next=function(d){return l.next_(d)},this.throw=function(d){return l.throw_(d)},this.return=function(d){return l.return_(d)},this[Symbol.iterator]=function(){return this}},o.generator.createGenerator=function(l,d){return d=new o.generator.Generator_(new o.generator.Engine_(d)),o.setPrototypeOf&&l.prototype&&o.setPrototypeOf(d,l.prototype),d},o.asyncExecutePromiseGenerator=function(l){function d(e){return l.next(e)}function c(e){return l.throw(e)}return new Promise(function(e,t){function a(h){h.done?e(h.value):Promise.resolve(h.value).then(d,c).then(a,t)}a(l.next())})},o.asyncExecutePromiseGeneratorFunction=function(l){return o.asyncExecutePromiseGenerator(l())},o.asyncExecutePromiseGeneratorProgram=function(l){return o.asyncExecutePromiseGenerator(new o.generator.Generator_(new o.generator.Engine_(l)))},(function(l,d){R.exports=d()})(Xe,function(){class l{constructor(e,t,a,h,g){this._legacyCanvasSize=l.DEFAULT_CANVAS_SIZE,this._preferredCamera="environment",this._maxScansPerSecond=25,this._lastScanTimestamp=-1,this._destroyed=this._flashOn=this._paused=this._active=!1,this.$video=e,this.$canvas=document.createElement("canvas"),a&&typeof a=="object"?this._onDecode=t:(console.warn(a||h||g?"You're using a deprecated version of the QrScanner constructor which will be removed in the future":"Note that the type of the scan result passed to onDecode will change in the future. To already switch to the new api today, you can pass returnDetailedScanResult: true."),this._legacyOnDecode=t),t=typeof a=="object"?a:{},this._onDecodeError=t.onDecodeError||(typeof a=="function"?a:this._onDecodeError),this._calculateScanRegion=t.calculateScanRegion||(typeof h=="function"?h:this._calculateScanRegion),this._preferredCamera=t.preferredCamera||g||this._preferredCamera,this._legacyCanvasSize=typeof a=="number"?a:typeof h=="number"?h:this._legacyCanvasSize,this._maxScansPerSecond=t.maxScansPerSecond||this._maxScansPerSecond,this._onPlay=this._onPlay.bind(this),this._onLoadedMetaData=this._onLoadedMetaData.bind(this),this._onVisibilityChange=this._onVisibilityChange.bind(this),this._updateOverlay=this._updateOverlay.bind(this),e.disablePictureInPicture=!0,e.playsInline=!0,e.muted=!0;let w=!1;if(e.hidden&&(e.hidden=!1,w=!0),document.body.contains(e)||(document.body.appendChild(e),w=!0),a=e.parentElement,t.highlightScanRegion||t.highlightCodeOutline){if(h=!!t.overlay,this.$overlay=t.overlay||document.createElement("div"),g=this.$overlay.style,g.position="absolute",g.display="none",g.pointerEvents="none",this.$overlay.classList.add("scan-region-highlight"),!h&&t.highlightScanRegion){this.$overlay.innerHTML='<svg class="scan-region-highlight-svg" viewBox="0 0 238 238" preserveAspectRatio="none" style="position:absolute;width:100%;height:100%;left:0;top:0;fill:none;stroke:#e9b213;stroke-width:4;stroke-linecap:round;stroke-linejoin:round"><path d="M31 2H10a8 8 0 0 0-8 8v21M207 2h21a8 8 0 0 1 8 8v21m0 176v21a8 8 0 0 1-8 8h-21m-176 0H10a8 8 0 0 1-8-8v-21"/></svg>';try{this.$overlay.firstElementChild.animate({transform:["scale(.98)","scale(1.01)"]},{duration:400,iterations:1/0,direction:"alternate",easing:"ease-in-out"})}catch{}a.insertBefore(this.$overlay,this.$video.nextSibling)}t.highlightCodeOutline&&(this.$overlay.insertAdjacentHTML("beforeend",'<svg class="code-outline-highlight" preserveAspectRatio="none" style="display:none;width:100%;height:100%;fill:none;stroke:#e9b213;stroke-width:5;stroke-dasharray:25;stroke-linecap:round;stroke-linejoin:round"><polygon/></svg>'),this.$codeOutlineHighlight=this.$overlay.lastElementChild)}this._scanRegion=this._calculateScanRegion(e),requestAnimationFrame(()=>{let y=window.getComputedStyle(e);y.display==="none"&&(e.style.setProperty("display","block","important"),w=!0),y.visibility!=="visible"&&(e.style.setProperty("visibility","visible","important"),w=!0),w&&(console.warn("QrScanner has overwritten the video hiding style to avoid Safari stopping the playback."),e.style.opacity="0",e.style.width="0",e.style.height="0",this.$overlay&&this.$overlay.parentElement&&this.$overlay.parentElement.removeChild(this.$overlay),delete this.$overlay,delete this.$codeOutlineHighlight),this.$overlay&&this._updateOverlay()}),e.addEventListener("play",this._onPlay),e.addEventListener("loadedmetadata",this._onLoadedMetaData),document.addEventListener("visibilitychange",this._onVisibilityChange),window.addEventListener("resize",this._updateOverlay),this._qrEnginePromise=l.createQrEngine()}static set WORKER_PATH(e){console.warn("Setting QrScanner.WORKER_PATH is not required and not supported anymore. Have a look at the README for new setup instructions.")}static hasCamera(){return o.asyncExecutePromiseGeneratorFunction(function*(){try{return!!(yield l.listCameras(!1)).length}catch{return!1}})}static listCameras(e=!1){return o.asyncExecutePromiseGeneratorFunction(function*(){if(!navigator.mediaDevices)return[];let t=()=>o.asyncExecutePromiseGeneratorFunction(function*(){return(yield navigator.mediaDevices.enumerateDevices()).filter(h=>h.kind==="videoinput")}),a;try{e&&(yield t()).every(h=>!h.label)&&(a=yield navigator.mediaDevices.getUserMedia({audio:!1,video:!0}))}catch{}try{return(yield t()).map((h,g)=>({id:h.deviceId,label:h.label||(g===0?"Default Camera":\`Camera \${g+1}\`)}))}finally{a&&(console.warn("Call listCameras after successfully starting a QR scanner to avoid creating a temporary video stream"),l._stopVideoStream(a))}})}hasFlash(){const e=this;return o.asyncExecutePromiseGeneratorFunction(function*(){let t;try{if(e.$video.srcObject){if(!(e.$video.srcObject instanceof MediaStream))return!1;t=e.$video.srcObject}else t=(yield e._getCameraStream()).stream;return"torch"in t.getVideoTracks()[0].getSettings()}catch{return!1}finally{t&&t!==e.$video.srcObject&&(console.warn("Call hasFlash after successfully starting the scanner to avoid creating a temporary video stream"),l._stopVideoStream(t))}})}isFlashOn(){return this._flashOn}toggleFlash(){const e=this;return o.asyncExecutePromiseGeneratorFunction(function*(){e._flashOn?yield e.turnFlashOff():yield e.turnFlashOn()})}turnFlashOn(){const e=this;return o.asyncExecutePromiseGeneratorFunction(function*(){if(!e._flashOn&&!e._destroyed&&(e._flashOn=!0,e._active&&!e._paused))try{if(!(yield e.hasFlash()))throw"No flash available";yield e.$video.srcObject.getVideoTracks()[0].applyConstraints({advanced:[{torch:!0}]})}catch(t){throw e._flashOn=!1,t}})}turnFlashOff(){const e=this;return o.asyncExecutePromiseGeneratorFunction(function*(){e._flashOn&&(e._flashOn=!1,yield e._restartVideoStream())})}destroy(){this.$video.removeEventListener("loadedmetadata",this._onLoadedMetaData),this.$video.removeEventListener("play",this._onPlay),document.removeEventListener("visibilitychange",this._onVisibilityChange),window.removeEventListener("resize",this._updateOverlay),this._destroyed=!0,this._flashOn=!1,this.stop(),l._postWorkerMessage(this._qrEnginePromise,"close")}start(){const e=this;return o.asyncExecutePromiseGeneratorFunction(function*(){if(e._destroyed)throw Error("The QR scanner can not be started as it had been destroyed.");if((!e._active||e._paused)&&(window.location.protocol!=="https:"&&console.warn("The camera stream is only accessible if the page is transferred via https."),e._active=!0,!document.hidden))if(e._paused=!1,e.$video.srcObject)yield e.$video.play();else try{let{stream:t,facingMode:a}=yield e._getCameraStream();!e._active||e._paused?l._stopVideoStream(t):(e._setVideoMirror(a),e.$video.srcObject=t,yield e.$video.play(),e._flashOn&&(e._flashOn=!1,e.turnFlashOn().catch(()=>{})))}catch(t){if(!e._paused)throw e._active=!1,t}})}stop(){this.pause(),this._active=!1}pause(e=!1){const t=this;return o.asyncExecutePromiseGeneratorFunction(function*(){if(t._paused=!0,!t._active)return!0;t.$video.pause(),t.$overlay&&(t.$overlay.style.display="none");let a=()=>{t.$video.srcObject instanceof MediaStream&&(l._stopVideoStream(t.$video.srcObject),t.$video.srcObject=null)};return e?(a(),!0):(yield new Promise(h=>setTimeout(h,300)),t._paused?(a(),!0):!1)})}setCamera(e){const t=this;return o.asyncExecutePromiseGeneratorFunction(function*(){e!==t._preferredCamera&&(t._preferredCamera=e,yield t._restartVideoStream())})}static scanImage(e,t,a,h,g=!1,w=!1){return o.asyncExecutePromiseGeneratorFunction(function*(){let y,s=!1;t&&("scanRegion"in t||"qrEngine"in t||"canvas"in t||"disallowCanvasResizing"in t||"alsoTryWithoutScanRegion"in t||"returnDetailedScanResult"in t)?(y=t.scanRegion,a=t.qrEngine,h=t.canvas,g=t.disallowCanvasResizing||!1,w=t.alsoTryWithoutScanRegion||!1,s=!0):console.warn(t||a||h||g||w?"You're using a deprecated api for scanImage which will be removed in the future.":"Note that the return type of scanImage will change in the future. To already switch to the new api today, you can pass returnDetailedScanResult: true.");let b=!!a;try{let i,m;[a,i]=yield Promise.all([a||l.createQrEngine(),l._loadImage(e)]),[h,m]=l._drawToCanvas(i,y,h,g);let u;if(a instanceof Worker){let p=a;b||l._postWorkerMessageSync(p,"inversionMode","both"),u=yield new Promise((B,P)=>{let C,L,I,D=-1;L=j=>{j.data.id===D&&(p.removeEventListener("message",L),p.removeEventListener("error",I),clearTimeout(C),j.data.data!==null?B({data:j.data.data,cornerPoints:l._convertPoints(j.data.cornerPoints,y)}):P(l.NO_QR_CODE_FOUND))},I=j=>{p.removeEventListener("message",L),p.removeEventListener("error",I),clearTimeout(C),P("Scanner error: "+(j?j.message||j:"Unknown Error"))},p.addEventListener("message",L),p.addEventListener("error",I),C=setTimeout(()=>I("timeout"),1e4);let O=m.getImageData(0,0,h.width,h.height);D=l._postWorkerMessageSync(p,"decode",O,[O.data.buffer])})}else u=yield Promise.race([new Promise((p,B)=>window.setTimeout(()=>B("Scanner error: timeout"),1e4)),o.asyncExecutePromiseGeneratorFunction(function*(){try{var[p]=yield a.detect(h);if(!p)throw l.NO_QR_CODE_FOUND;return{data:p.rawValue,cornerPoints:l._convertPoints(p.cornerPoints,y)}}catch(B){if(p=B.message||B,/not implemented|service unavailable/.test(p))return l._disableBarcodeDetector=!0,l.scanImage(e,{scanRegion:y,canvas:h,disallowCanvasResizing:g,alsoTryWithoutScanRegion:w});throw\`Scanner error: \${p}\`}})]);return s?u:u.data}catch(i){if(!y||!w)throw i;let m=yield l.scanImage(e,{qrEngine:a,canvas:h,disallowCanvasResizing:g});return s?m:m.data}finally{b||l._postWorkerMessage(a,"close")}})}setGrayscaleWeights(e,t,a,h=!0){l._postWorkerMessage(this._qrEnginePromise,"grayscaleWeights",{red:e,green:t,blue:a,useIntegerApproximation:h})}setInversionMode(e){l._postWorkerMessage(this._qrEnginePromise,"inversionMode",e)}static createQrEngine(e){return o.asyncExecutePromiseGeneratorFunction(function*(){e&&console.warn("Specifying a worker path is not required and not supported anymore.");let t=()=>Promise.resolve().then(function(){return d}).then(h=>h.createWorker());if(!(!l._disableBarcodeDetector&&"BarcodeDetector"in window&&BarcodeDetector.getSupportedFormats&&(yield BarcodeDetector.getSupportedFormats()).includes("qr_code")))return t();let a=navigator.userAgentData;return a&&a.brands.some(({brand:h})=>/Chromium/i.test(h))&&/mac ?OS/i.test(a.platform)&&(yield a.getHighEntropyValues(["architecture","platformVersion"]).then(({architecture:h,platformVersion:g})=>/arm/i.test(h||"arm")&&13<=parseInt(g||"13")).catch(()=>!0))?t():new BarcodeDetector({formats:["qr_code"]})})}_onPlay(){this._scanRegion=this._calculateScanRegion(this.$video),this._updateOverlay(),this.$overlay&&(this.$overlay.style.display=""),this._scanFrame()}_onLoadedMetaData(){this._scanRegion=this._calculateScanRegion(this.$video),this._updateOverlay()}_onVisibilityChange(){document.hidden?this.pause():this._active&&this.start()}_calculateScanRegion(e){let t=Math.round(.6666666666666666*Math.min(e.videoWidth,e.videoHeight));return{x:Math.round((e.videoWidth-t)/2),y:Math.round((e.videoHeight-t)/2),width:t,height:t,downScaledWidth:this._legacyCanvasSize,downScaledHeight:this._legacyCanvasSize}}_updateOverlay(){requestAnimationFrame(()=>{if(this.$overlay){var e=this.$video,t=e.videoWidth,a=e.videoHeight,h=e.offsetWidth,g=e.offsetHeight,w=e.offsetLeft,y=e.offsetTop,s=window.getComputedStyle(e),b=s.objectFit,i=t/a,m=h/g;switch(b){case"none":var u=t,p=a;break;case"fill":u=h,p=g;break;default:(b==="cover"?i>m:i<m)?(p=g,u=p*i):(u=h,p=u/i),b==="scale-down"&&(u=Math.min(u,t),p=Math.min(p,a))}var[B,P]=s.objectPosition.split(" ").map((L,I)=>{const D=parseFloat(L);return L.endsWith("%")?(I?g-p:h-u)*D/100:D});s=this._scanRegion.width||t,m=this._scanRegion.height||a,b=this._scanRegion.x||0;var C=this._scanRegion.y||0;i=this.$overlay.style,i.width=\`\${s/t*u}px\`,i.height=\`\${m/a*p}px\`,i.top=\`\${y+P+C/a*p}px\`,a=/scaleX\\(-1\\)/.test(e.style.transform),i.left=\`\${w+(a?h-B-u:B)+(a?t-b-s:b)/t*u}px\`,i.transform=e.style.transform}})}static _convertPoints(e,t){if(!t)return e;let a=t.x||0,h=t.y||0,g=t.width&&t.downScaledWidth?t.width/t.downScaledWidth:1;t=t.height&&t.downScaledHeight?t.height/t.downScaledHeight:1;for(let w of e)w.x=w.x*g+a,w.y=w.y*t+h;return e}_scanFrame(){!this._active||this.$video.paused||this.$video.ended||("requestVideoFrameCallback"in this.$video?this.$video.requestVideoFrameCallback.bind(this.$video):requestAnimationFrame)(()=>{const e=this;return o.asyncExecutePromiseGeneratorFunction(function*(){if(!(1>=e.$video.readyState)){var t=Date.now()-e._lastScanTimestamp,a=1e3/e._maxScansPerSecond;t<a&&(yield new Promise(g=>setTimeout(g,a-t))),e._lastScanTimestamp=Date.now();try{var h=yield l.scanImage(e.$video,{scanRegion:e._scanRegion,qrEngine:e._qrEnginePromise,canvas:e.$canvas})}catch(g){if(!e._active)return;e._onDecodeError(g)}!l._disableBarcodeDetector||(yield e._qrEnginePromise)instanceof Worker||(e._qrEnginePromise=l.createQrEngine()),h?(e._onDecode?e._onDecode(h):e._legacyOnDecode&&e._legacyOnDecode(h.data),e.$codeOutlineHighlight&&(clearTimeout(e._codeOutlineHighlightRemovalTimeout),e._codeOutlineHighlightRemovalTimeout=void 0,e.$codeOutlineHighlight.setAttribute("viewBox",\`\${e._scanRegion.x||0} \${e._scanRegion.y||0} \${e._scanRegion.width||e.$video.videoWidth} \${e._scanRegion.height||e.$video.videoHeight}\`),e.$codeOutlineHighlight.firstElementChild.setAttribute("points",h.cornerPoints.map(({x:g,y:w})=>\`\${g},\${w}\`).join(" ")),e.$codeOutlineHighlight.style.display="")):e.$codeOutlineHighlight&&!e._codeOutlineHighlightRemovalTimeout&&(e._codeOutlineHighlightRemovalTimeout=setTimeout(()=>e.$codeOutlineHighlight.style.display="none",100))}e._scanFrame()})})}_onDecodeError(e){e!==l.NO_QR_CODE_FOUND&&console.log(e)}_getCameraStream(){const e=this;return o.asyncExecutePromiseGeneratorFunction(function*(){if(!navigator.mediaDevices)throw"Camera not found.";let t=/^(environment|user)$/.test(e._preferredCamera)?"facingMode":"deviceId",a=[{width:{min:1024}},{width:{min:768}},{}],h=a.map(g=>Object.assign({},g,{[t]:{exact:e._preferredCamera}}));for(let g of[...h,...a])try{let w=yield navigator.mediaDevices.getUserMedia({video:g,audio:!1}),y=e._getFacingMode(w)||(g.facingMode?e._preferredCamera:e._preferredCamera==="environment"?"user":"environment");return{stream:w,facingMode:y}}catch{}throw"Camera not found."})}_restartVideoStream(){const e=this;return o.asyncExecutePromiseGeneratorFunction(function*(){let t=e._paused;(yield e.pause(!0))&&!t&&e._active&&(yield e.start())})}static _stopVideoStream(e){for(let t of e.getTracks())t.stop(),e.removeTrack(t)}_setVideoMirror(e){this.$video.style.transform="scaleX("+(e==="user"?-1:1)+")"}_getFacingMode(e){return(e=e.getVideoTracks()[0])?/rear|back|environment/i.test(e.label)?"environment":/front|user|face/i.test(e.label)?"user":null:null}static _drawToCanvas(e,t,a,h=!1){a=a||document.createElement("canvas");let g=t&&t.x?t.x:0,w=t&&t.y?t.y:0,y=t&&t.width?t.width:e.videoWidth||e.width,s=t&&t.height?t.height:e.videoHeight||e.height;return h||(h=t&&t.downScaledWidth?t.downScaledWidth:y,t=t&&t.downScaledHeight?t.downScaledHeight:s,a.width!==h&&(a.width=h),a.height!==t&&(a.height=t)),t=a.getContext("2d",{alpha:!1}),t.imageSmoothingEnabled=!1,t.drawImage(e,g,w,y,s,0,0,a.width,a.height),[a,t]}static _loadImage(e){return o.asyncExecutePromiseGeneratorFunction(function*(){if(e instanceof Image)return yield l._awaitImageLoad(e),e;if(e instanceof HTMLVideoElement||e instanceof HTMLCanvasElement||e instanceof SVGImageElement||"OffscreenCanvas"in window&&e instanceof OffscreenCanvas||"ImageBitmap"in window&&e instanceof ImageBitmap)return e;if(e instanceof File||e instanceof Blob||e instanceof URL||typeof e=="string"){let t=new Image;t.src=e instanceof File||e instanceof Blob?URL.createObjectURL(e):e.toString();try{return yield l._awaitImageLoad(t),t}finally{(e instanceof File||e instanceof Blob)&&URL.revokeObjectURL(t.src)}}else throw"Unsupported image type."})}static _awaitImageLoad(e){return o.asyncExecutePromiseGeneratorFunction(function*(){e.complete&&e.naturalWidth!==0||(yield new Promise((t,a)=>{let h=g=>{e.removeEventListener("load",h),e.removeEventListener("error",h),g instanceof ErrorEvent?a("Image load error"):t()};e.addEventListener("load",h),e.addEventListener("error",h)}))})}static _postWorkerMessage(e,t,a,h){return o.asyncExecutePromiseGeneratorFunction(function*(){return l._postWorkerMessageSync(yield e,t,a,h)})}static _postWorkerMessageSync(e,t,a,h){if(!(e instanceof Worker))return-1;let g=l._workerMessageId++;return e.postMessage({id:g,type:t,data:a},h),g}}l.DEFAULT_CANVAS_SIZE=400,l.NO_QR_CODE_FOUND="No QR code found",l._disableBarcodeDetector=!1,l._workerMessageId=0;var d=Object.freeze({__proto__:null,createWorker:()=>new Worker(URL.createObjectURL(new Blob([\`class x{constructor(a,b){this.width=b;this.height=a.length/b;this.data=a}static createEmpty(a,b){return new x(new Uint8ClampedArray(a*b),a)}get(a,b){return 0>a||a>=this.width||0>b||b>=this.height?!1:!!this.data[b*this.width+a]}set(a,b,c){this.data[b*this.width+a]=c?1:0}setRegion(a,b,c,d,e){for(let f=b;f<b+d;f++)for(let g=a;g<a+c;g++)this.set(g,f,!!e)}}
class A{constructor(a,b,c){this.width=a;a*=b;if(c&&c.length!==a)throw Error("Wrong buffer size");this.data=c||new Uint8ClampedArray(a)}get(a,b){return this.data[b*this.width+a]}set(a,b,c){this.data[b*this.width+a]=c}}
class ba{constructor(a){this.bitOffset=this.byteOffset=0;this.bytes=a}readBits(a){if(1>a||32<a||a>this.available())throw Error("Cannot read "+a.toString()+" bits");var b=0;if(0<this.bitOffset){b=8-this.bitOffset;var c=a<b?a:b;b-=c;b=(this.bytes[this.byteOffset]&255>>8-c<<b)>>b;a-=c;this.bitOffset+=c;8===this.bitOffset&&(this.bitOffset=0,this.byteOffset++)}if(0<a){for(;8<=a;)b=b<<8|this.bytes[this.byteOffset]&255,this.byteOffset++,a-=8;0<a&&(c=8-a,b=b<<a|(this.bytes[this.byteOffset]&255>>c<<c)>>c,
this.bitOffset+=a)}return b}available(){return 8*(this.bytes.length-this.byteOffset)-this.bitOffset}}var B,C=B||(B={});C.Numeric="numeric";C.Alphanumeric="alphanumeric";C.Byte="byte";C.Kanji="kanji";C.ECI="eci";C.StructuredAppend="structuredappend";var D,E=D||(D={});E[E.Terminator=0]="Terminator";E[E.Numeric=1]="Numeric";E[E.Alphanumeric=2]="Alphanumeric";E[E.Byte=4]="Byte";E[E.Kanji=8]="Kanji";E[E.ECI=7]="ECI";E[E.StructuredAppend=3]="StructuredAppend";let F="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:".split("");
function ca(a,b){let c=[],d="";b=a.readBits([8,16,16][b]);for(let e=0;e<b;e++){let f=a.readBits(8);c.push(f)}try{d+=decodeURIComponent(c.map(e=>\\\`%\\\${("0"+e.toString(16)).substr(-2)}\\\`).join(""))}catch(e){}return{bytes:c,text:d}}
function da(a,b){a=new ba(a);let c=9>=b?0:26>=b?1:2;for(b={text:"",bytes:[],chunks:[],version:b};4<=a.available();){var d=a.readBits(4);if(d===D.Terminator)return b;if(d===D.ECI)0===a.readBits(1)?b.chunks.push({type:B.ECI,assignmentNumber:a.readBits(7)}):0===a.readBits(1)?b.chunks.push({type:B.ECI,assignmentNumber:a.readBits(14)}):0===a.readBits(1)?b.chunks.push({type:B.ECI,assignmentNumber:a.readBits(21)}):b.chunks.push({type:B.ECI,assignmentNumber:-1});else if(d===D.Numeric){var e=a,f=[];d="";for(var g=
e.readBits([10,12,14][c]);3<=g;){var h=e.readBits(10);if(1E3<=h)throw Error("Invalid numeric value above 999");var k=Math.floor(h/100),m=Math.floor(h/10)%10;h%=10;f.push(48+k,48+m,48+h);d+=k.toString()+m.toString()+h.toString();g-=3}if(2===g){g=e.readBits(7);if(100<=g)throw Error("Invalid numeric value above 99");e=Math.floor(g/10);g%=10;f.push(48+e,48+g);d+=e.toString()+g.toString()}else if(1===g){e=e.readBits(4);if(10<=e)throw Error("Invalid numeric value above 9");f.push(48+e);d+=e.toString()}b.text+=
d;b.bytes.push(...f);b.chunks.push({type:B.Numeric,text:d})}else if(d===D.Alphanumeric){e=a;f=[];d="";for(g=e.readBits([9,11,13][c]);2<=g;)m=e.readBits(11),k=Math.floor(m/45),m%=45,f.push(F[k].charCodeAt(0),F[m].charCodeAt(0)),d+=F[k]+F[m],g-=2;1===g&&(e=e.readBits(6),f.push(F[e].charCodeAt(0)),d+=F[e]);b.text+=d;b.bytes.push(...f);b.chunks.push({type:B.Alphanumeric,text:d})}else if(d===D.Byte)d=ca(a,c),b.text+=d.text,b.bytes.push(...d.bytes),b.chunks.push({type:B.Byte,bytes:d.bytes,text:d.text});
else if(d===D.Kanji){f=a;d=[];e=f.readBits([8,10,12][c]);for(g=0;g<e;g++)k=f.readBits(13),k=Math.floor(k/192)<<8|k%192,k=7936>k?k+33088:k+49472,d.push(k>>8,k&255);f=(new TextDecoder("shift-jis")).decode(Uint8Array.from(d));b.text+=f;b.bytes.push(...d);b.chunks.push({type:B.Kanji,bytes:d,text:f})}else d===D.StructuredAppend&&b.chunks.push({type:B.StructuredAppend,currentSequence:a.readBits(4),totalSequence:a.readBits(4),parity:a.readBits(8)})}if(0===a.available()||0===a.readBits(a.available()))return b}
class G{constructor(a,b){if(0===b.length)throw Error("No coefficients.");this.field=a;let c=b.length;if(1<c&&0===b[0]){let d=1;for(;d<c&&0===b[d];)d++;if(d===c)this.coefficients=a.zero.coefficients;else for(this.coefficients=new Uint8ClampedArray(c-d),a=0;a<this.coefficients.length;a++)this.coefficients[a]=b[d+a]}else this.coefficients=b}degree(){return this.coefficients.length-1}isZero(){return 0===this.coefficients[0]}getCoefficient(a){return this.coefficients[this.coefficients.length-1-a]}addOrSubtract(a){if(this.isZero())return a;
if(a.isZero())return this;let b=this.coefficients;a=a.coefficients;b.length>a.length&&([b,a]=[a,b]);let c=new Uint8ClampedArray(a.length),d=a.length-b.length;for(var e=0;e<d;e++)c[e]=a[e];for(e=d;e<a.length;e++)c[e]=b[e-d]^a[e];return new G(this.field,c)}multiply(a){if(0===a)return this.field.zero;if(1===a)return this;let b=this.coefficients.length,c=new Uint8ClampedArray(b);for(let d=0;d<b;d++)c[d]=this.field.multiply(this.coefficients[d],a);return new G(this.field,c)}multiplyPoly(a){if(this.isZero()||
a.isZero())return this.field.zero;let b=this.coefficients,c=b.length;a=a.coefficients;let d=a.length,e=new Uint8ClampedArray(c+d-1);for(let f=0;f<c;f++){let g=b[f];for(let h=0;h<d;h++)e[f+h]=H(e[f+h],this.field.multiply(g,a[h]))}return new G(this.field,e)}multiplyByMonomial(a,b){if(0>a)throw Error("Invalid degree less than 0");if(0===b)return this.field.zero;let c=this.coefficients.length;a=new Uint8ClampedArray(c+a);for(let d=0;d<c;d++)a[d]=this.field.multiply(this.coefficients[d],b);return new G(this.field,
a)}evaluateAt(a){let b=0;if(0===a)return this.getCoefficient(0);let c=this.coefficients.length;if(1===a)return this.coefficients.forEach(d=>{b^=d}),b;b=this.coefficients[0];for(let d=1;d<c;d++)b=H(this.field.multiply(a,b),this.coefficients[d]);return b}}function H(a,b){return a^b}
class ea{constructor(a,b,c){this.primitive=a;this.size=b;this.generatorBase=c;this.expTable=Array(this.size);this.logTable=Array(this.size);a=1;for(b=0;b<this.size;b++)this.expTable[b]=a,a*=2,a>=this.size&&(a=(a^this.primitive)&this.size-1);for(a=0;a<this.size-1;a++)this.logTable[this.expTable[a]]=a;this.zero=new G(this,Uint8ClampedArray.from([0]));this.one=new G(this,Uint8ClampedArray.from([1]))}multiply(a,b){return 0===a||0===b?0:this.expTable[(this.logTable[a]+this.logTable[b])%(this.size-1)]}inverse(a){if(0===
a)throw Error("Can't invert 0");return this.expTable[this.size-this.logTable[a]-1]}buildMonomial(a,b){if(0>a)throw Error("Invalid monomial degree less than 0");if(0===b)return this.zero;a=new Uint8ClampedArray(a+1);a[0]=b;return new G(this,a)}log(a){if(0===a)throw Error("Can't take log(0)");return this.logTable[a]}exp(a){return this.expTable[a]}}
function fa(a,b,c,d){b.degree()<c.degree()&&([b,c]=[c,b]);let e=a.zero;for(var f=a.one;c.degree()>=d/2;){var g=b;let h=e;b=c;e=f;if(b.isZero())return null;c=g;f=a.zero;g=b.getCoefficient(b.degree());for(g=a.inverse(g);c.degree()>=b.degree()&&!c.isZero();){let k=c.degree()-b.degree(),m=a.multiply(c.getCoefficient(c.degree()),g);f=f.addOrSubtract(a.buildMonomial(k,m));c=c.addOrSubtract(b.multiplyByMonomial(k,m))}f=f.multiplyPoly(e).addOrSubtract(h);if(c.degree()>=b.degree())return null}d=f.getCoefficient(0);
if(0===d)return null;a=a.inverse(d);return[f.multiply(a),c.multiply(a)]}
function ha(a,b){let c=new Uint8ClampedArray(a.length);c.set(a);a=new ea(285,256,0);var d=new G(a,c),e=new Uint8ClampedArray(b),f=!1;for(var g=0;g<b;g++){var h=d.evaluateAt(a.exp(g+a.generatorBase));e[e.length-1-g]=h;0!==h&&(f=!0)}if(!f)return c;d=new G(a,e);d=fa(a,a.buildMonomial(b,1),d,b);if(null===d)return null;b=d[0];g=b.degree();if(1===g)b=[b.getCoefficient(1)];else{e=Array(g);f=0;for(h=1;h<a.size&&f<g;h++)0===b.evaluateAt(h)&&(e[f]=a.inverse(h),f++);b=f!==g?null:e}if(null==b)return null;e=d[1];
f=b.length;d=Array(f);for(g=0;g<f;g++){h=a.inverse(b[g]);let k=1;for(let m=0;m<f;m++)g!==m&&(k=a.multiply(k,H(1,a.multiply(b[m],h))));d[g]=a.multiply(e.evaluateAt(h),a.inverse(k));0!==a.generatorBase&&(d[g]=a.multiply(d[g],h))}for(e=0;e<b.length;e++){f=c.length-1-a.log(b[e]);if(0>f)return null;c[f]^=d[e]}return c}
let I=[{infoBits:null,versionNumber:1,alignmentPatternCenters:[],errorCorrectionLevels:[{ecCodewordsPerBlock:7,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:10,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:16}]},{ecCodewordsPerBlock:13,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:13}]},{ecCodewordsPerBlock:17,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:9}]}]},{infoBits:null,versionNumber:2,alignmentPatternCenters:[6,18],errorCorrectionLevels:[{ecCodewordsPerBlock:10,ecBlocks:[{numBlocks:1,
dataCodewordsPerBlock:34}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:28}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:22}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:16}]}]},{infoBits:null,versionNumber:3,alignmentPatternCenters:[6,22],errorCorrectionLevels:[{ecCodewordsPerBlock:15,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:55}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:18,
ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:13}]}]},{infoBits:null,versionNumber:4,alignmentPatternCenters:[6,26],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:80}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:32}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:9}]}]},
{infoBits:null,versionNumber:5,alignmentPatternCenters:[6,30],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:43}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:15},{numBlocks:2,dataCodewordsPerBlock:16}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:11},{numBlocks:2,dataCodewordsPerBlock:12}]}]},{infoBits:null,versionNumber:6,alignmentPatternCenters:[6,
34],errorCorrectionLevels:[{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:68}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:27}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:15}]}]},{infoBits:31892,versionNumber:7,alignmentPatternCenters:[6,22,38],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:78}]},{ecCodewordsPerBlock:18,
ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:31}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:14},{numBlocks:4,dataCodewordsPerBlock:15}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:13},{numBlocks:1,dataCodewordsPerBlock:14}]}]},{infoBits:34236,versionNumber:8,alignmentPatternCenters:[6,24,42],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:97}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:38},
{numBlocks:2,dataCodewordsPerBlock:39}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:18},{numBlocks:2,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:14},{numBlocks:2,dataCodewordsPerBlock:15}]}]},{infoBits:39577,versionNumber:9,alignmentPatternCenters:[6,26,46],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:36},
{numBlocks:2,dataCodewordsPerBlock:37}]},{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:16},{numBlocks:4,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:12},{numBlocks:4,dataCodewordsPerBlock:13}]}]},{infoBits:42195,versionNumber:10,alignmentPatternCenters:[6,28,50],errorCorrectionLevels:[{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:68},{numBlocks:2,dataCodewordsPerBlock:69}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,
dataCodewordsPerBlock:43},{numBlocks:1,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:19},{numBlocks:2,dataCodewordsPerBlock:20}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:15},{numBlocks:2,dataCodewordsPerBlock:16}]}]},{infoBits:48118,versionNumber:11,alignmentPatternCenters:[6,30,54],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:81}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:1,
dataCodewordsPerBlock:50},{numBlocks:4,dataCodewordsPerBlock:51}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:22},{numBlocks:4,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:12},{numBlocks:8,dataCodewordsPerBlock:13}]}]},{infoBits:51042,versionNumber:12,alignmentPatternCenters:[6,32,58],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:92},{numBlocks:2,dataCodewordsPerBlock:93}]},
{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:36},{numBlocks:2,dataCodewordsPerBlock:37}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:20},{numBlocks:6,dataCodewordsPerBlock:21}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:14},{numBlocks:4,dataCodewordsPerBlock:15}]}]},{infoBits:55367,versionNumber:13,alignmentPatternCenters:[6,34,62],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:107}]},
{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:37},{numBlocks:1,dataCodewordsPerBlock:38}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:20},{numBlocks:4,dataCodewordsPerBlock:21}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:11},{numBlocks:4,dataCodewordsPerBlock:12}]}]},{infoBits:58893,versionNumber:14,alignmentPatternCenters:[6,26,46,66],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:115},
{numBlocks:1,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:40},{numBlocks:5,dataCodewordsPerBlock:41}]},{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:16},{numBlocks:5,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:12},{numBlocks:5,dataCodewordsPerBlock:13}]}]},{infoBits:63784,versionNumber:15,alignmentPatternCenters:[6,26,48,70],errorCorrectionLevels:[{ecCodewordsPerBlock:22,
ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:87},{numBlocks:1,dataCodewordsPerBlock:88}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:41},{numBlocks:5,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:24},{numBlocks:7,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:12},{numBlocks:7,dataCodewordsPerBlock:13}]}]},{infoBits:68472,versionNumber:16,alignmentPatternCenters:[6,26,50,
74],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:98},{numBlocks:1,dataCodewordsPerBlock:99}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:45},{numBlocks:3,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:19},{numBlocks:2,dataCodewordsPerBlock:20}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:15},{numBlocks:13,dataCodewordsPerBlock:16}]}]},{infoBits:70749,
versionNumber:17,alignmentPatternCenters:[6,30,54,78],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:107},{numBlocks:5,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:46},{numBlocks:1,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:22},{numBlocks:15,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:14},{numBlocks:17,
dataCodewordsPerBlock:15}]}]},{infoBits:76311,versionNumber:18,alignmentPatternCenters:[6,30,56,82],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:120},{numBlocks:1,dataCodewordsPerBlock:121}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:9,dataCodewordsPerBlock:43},{numBlocks:4,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:22},{numBlocks:1,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,
dataCodewordsPerBlock:14},{numBlocks:19,dataCodewordsPerBlock:15}]}]},{infoBits:79154,versionNumber:19,alignmentPatternCenters:[6,30,58,86],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:113},{numBlocks:4,dataCodewordsPerBlock:114}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:44},{numBlocks:11,dataCodewordsPerBlock:45}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:21},{numBlocks:4,dataCodewordsPerBlock:22}]},
{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:9,dataCodewordsPerBlock:13},{numBlocks:16,dataCodewordsPerBlock:14}]}]},{infoBits:84390,versionNumber:20,alignmentPatternCenters:[6,34,62,90],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:107},{numBlocks:5,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:41},{numBlocks:13,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:24},
{numBlocks:5,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:15},{numBlocks:10,dataCodewordsPerBlock:16}]}]},{infoBits:87683,versionNumber:21,alignmentPatternCenters:[6,28,50,72,94],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:116},{numBlocks:4,dataCodewordsPerBlock:117}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:22},
{numBlocks:6,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:16},{numBlocks:6,dataCodewordsPerBlock:17}]}]},{infoBits:92361,versionNumber:22,alignmentPatternCenters:[6,26,50,74,98],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:111},{numBlocks:7,dataCodewordsPerBlock:112}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:24},
{numBlocks:16,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:34,dataCodewordsPerBlock:13}]}]},{infoBits:96236,versionNumber:23,alignmentPatternCenters:[6,30,54,74,102],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:121},{numBlocks:5,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:47},{numBlocks:14,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:24},
{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:16,dataCodewordsPerBlock:15},{numBlocks:14,dataCodewordsPerBlock:16}]}]},{infoBits:102084,versionNumber:24,alignmentPatternCenters:[6,28,54,80,106],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:117},{numBlocks:4,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:45},{numBlocks:14,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,
ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:24},{numBlocks:16,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:30,dataCodewordsPerBlock:16},{numBlocks:2,dataCodewordsPerBlock:17}]}]},{infoBits:102881,versionNumber:25,alignmentPatternCenters:[6,32,58,84,110],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:106},{numBlocks:4,dataCodewordsPerBlock:107}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:47},{numBlocks:13,
dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:24},{numBlocks:22,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:15},{numBlocks:13,dataCodewordsPerBlock:16}]}]},{infoBits:110507,versionNumber:26,alignmentPatternCenters:[6,30,58,86,114],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:114},{numBlocks:2,dataCodewordsPerBlock:115}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:19,
dataCodewordsPerBlock:46},{numBlocks:4,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:28,dataCodewordsPerBlock:22},{numBlocks:6,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:33,dataCodewordsPerBlock:16},{numBlocks:4,dataCodewordsPerBlock:17}]}]},{infoBits:110734,versionNumber:27,alignmentPatternCenters:[6,34,62,90,118],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:122},{numBlocks:4,dataCodewordsPerBlock:123}]},
{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:45},{numBlocks:3,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:23},{numBlocks:26,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:15},{numBlocks:28,dataCodewordsPerBlock:16}]}]},{infoBits:117786,versionNumber:28,alignmentPatternCenters:[6,26,50,74,98,122],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:117},
{numBlocks:10,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:45},{numBlocks:23,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:24},{numBlocks:31,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:15},{numBlocks:31,dataCodewordsPerBlock:16}]}]},{infoBits:119615,versionNumber:29,alignmentPatternCenters:[6,30,54,78,102,126],errorCorrectionLevels:[{ecCodewordsPerBlock:30,
ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:116},{numBlocks:7,dataCodewordsPerBlock:117}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:21,dataCodewordsPerBlock:45},{numBlocks:7,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:23},{numBlocks:37,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:15},{numBlocks:26,dataCodewordsPerBlock:16}]}]},{infoBits:126325,versionNumber:30,alignmentPatternCenters:[6,
26,52,78,104,130],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:115},{numBlocks:10,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:47},{numBlocks:10,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:24},{numBlocks:25,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:23,dataCodewordsPerBlock:15},{numBlocks:25,dataCodewordsPerBlock:16}]}]},
{infoBits:127568,versionNumber:31,alignmentPatternCenters:[6,30,56,82,108,134],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:115},{numBlocks:3,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:46},{numBlocks:29,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:42,dataCodewordsPerBlock:24},{numBlocks:1,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:23,dataCodewordsPerBlock:15},
{numBlocks:28,dataCodewordsPerBlock:16}]}]},{infoBits:133589,versionNumber:32,alignmentPatternCenters:[6,34,60,86,112,138],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:115}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:46},{numBlocks:23,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:24},{numBlocks:35,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,
dataCodewordsPerBlock:15},{numBlocks:35,dataCodewordsPerBlock:16}]}]},{infoBits:136944,versionNumber:33,alignmentPatternCenters:[6,30,58,86,114,142],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:115},{numBlocks:1,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:14,dataCodewordsPerBlock:46},{numBlocks:21,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:29,dataCodewordsPerBlock:24},{numBlocks:19,dataCodewordsPerBlock:25}]},
{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:15},{numBlocks:46,dataCodewordsPerBlock:16}]}]},{infoBits:141498,versionNumber:34,alignmentPatternCenters:[6,34,62,90,118,146],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:115},{numBlocks:6,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:14,dataCodewordsPerBlock:46},{numBlocks:23,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:44,
dataCodewordsPerBlock:24},{numBlocks:7,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:59,dataCodewordsPerBlock:16},{numBlocks:1,dataCodewordsPerBlock:17}]}]},{infoBits:145311,versionNumber:35,alignmentPatternCenters:[6,30,54,78,102,126,150],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:121},{numBlocks:7,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:47},{numBlocks:26,dataCodewordsPerBlock:48}]},
{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:39,dataCodewordsPerBlock:24},{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:15},{numBlocks:41,dataCodewordsPerBlock:16}]}]},{infoBits:150283,versionNumber:36,alignmentPatternCenters:[6,24,50,76,102,128,154],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:121},{numBlocks:14,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,
dataCodewordsPerBlock:47},{numBlocks:34,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:46,dataCodewordsPerBlock:24},{numBlocks:10,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:15},{numBlocks:64,dataCodewordsPerBlock:16}]}]},{infoBits:152622,versionNumber:37,alignmentPatternCenters:[6,28,54,80,106,132,158],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:122},{numBlocks:4,dataCodewordsPerBlock:123}]},
{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:29,dataCodewordsPerBlock:46},{numBlocks:14,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:49,dataCodewordsPerBlock:24},{numBlocks:10,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:24,dataCodewordsPerBlock:15},{numBlocks:46,dataCodewordsPerBlock:16}]}]},{infoBits:158308,versionNumber:38,alignmentPatternCenters:[6,32,58,84,110,136,162],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,
dataCodewordsPerBlock:122},{numBlocks:18,dataCodewordsPerBlock:123}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:46},{numBlocks:32,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:48,dataCodewordsPerBlock:24},{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:42,dataCodewordsPerBlock:15},{numBlocks:32,dataCodewordsPerBlock:16}]}]},{infoBits:161089,versionNumber:39,alignmentPatternCenters:[6,26,54,82,110,138,166],
errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:20,dataCodewordsPerBlock:117},{numBlocks:4,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:40,dataCodewordsPerBlock:47},{numBlocks:7,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:43,dataCodewordsPerBlock:24},{numBlocks:22,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:15},{numBlocks:67,dataCodewordsPerBlock:16}]}]},{infoBits:167017,
versionNumber:40,alignmentPatternCenters:[6,30,58,86,114,142,170],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:118},{numBlocks:6,dataCodewordsPerBlock:119}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:18,dataCodewordsPerBlock:47},{numBlocks:31,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:34,dataCodewordsPerBlock:24},{numBlocks:34,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:20,dataCodewordsPerBlock:15},
{numBlocks:61,dataCodewordsPerBlock:16}]}]}];function J(a,b){a^=b;for(b=0;a;)b++,a&=a-1;return b}function K(a,b){return b<<1|a}
let ia=[{bits:21522,formatInfo:{errorCorrectionLevel:1,dataMask:0}},{bits:20773,formatInfo:{errorCorrectionLevel:1,dataMask:1}},{bits:24188,formatInfo:{errorCorrectionLevel:1,dataMask:2}},{bits:23371,formatInfo:{errorCorrectionLevel:1,dataMask:3}},{bits:17913,formatInfo:{errorCorrectionLevel:1,dataMask:4}},{bits:16590,formatInfo:{errorCorrectionLevel:1,dataMask:5}},{bits:20375,formatInfo:{errorCorrectionLevel:1,dataMask:6}},{bits:19104,formatInfo:{errorCorrectionLevel:1,dataMask:7}},{bits:30660,formatInfo:{errorCorrectionLevel:0,
dataMask:0}},{bits:29427,formatInfo:{errorCorrectionLevel:0,dataMask:1}},{bits:32170,formatInfo:{errorCorrectionLevel:0,dataMask:2}},{bits:30877,formatInfo:{errorCorrectionLevel:0,dataMask:3}},{bits:26159,formatInfo:{errorCorrectionLevel:0,dataMask:4}},{bits:25368,formatInfo:{errorCorrectionLevel:0,dataMask:5}},{bits:27713,formatInfo:{errorCorrectionLevel:0,dataMask:6}},{bits:26998,formatInfo:{errorCorrectionLevel:0,dataMask:7}},{bits:5769,formatInfo:{errorCorrectionLevel:3,dataMask:0}},{bits:5054,
formatInfo:{errorCorrectionLevel:3,dataMask:1}},{bits:7399,formatInfo:{errorCorrectionLevel:3,dataMask:2}},{bits:6608,formatInfo:{errorCorrectionLevel:3,dataMask:3}},{bits:1890,formatInfo:{errorCorrectionLevel:3,dataMask:4}},{bits:597,formatInfo:{errorCorrectionLevel:3,dataMask:5}},{bits:3340,formatInfo:{errorCorrectionLevel:3,dataMask:6}},{bits:2107,formatInfo:{errorCorrectionLevel:3,dataMask:7}},{bits:13663,formatInfo:{errorCorrectionLevel:2,dataMask:0}},{bits:12392,formatInfo:{errorCorrectionLevel:2,
dataMask:1}},{bits:16177,formatInfo:{errorCorrectionLevel:2,dataMask:2}},{bits:14854,formatInfo:{errorCorrectionLevel:2,dataMask:3}},{bits:9396,formatInfo:{errorCorrectionLevel:2,dataMask:4}},{bits:8579,formatInfo:{errorCorrectionLevel:2,dataMask:5}},{bits:11994,formatInfo:{errorCorrectionLevel:2,dataMask:6}},{bits:11245,formatInfo:{errorCorrectionLevel:2,dataMask:7}}],ja=[a=>0===(a.y+a.x)%2,a=>0===a.y%2,a=>0===a.x%3,a=>0===(a.y+a.x)%3,a=>0===(Math.floor(a.y/2)+Math.floor(a.x/3))%2,a=>0===a.x*a.y%
2+a.x*a.y%3,a=>0===(a.y*a.x%2+a.y*a.x%3)%2,a=>0===((a.y+a.x)%2+a.y*a.x%3)%2];
function ka(a,b,c){c=ja[c.dataMask];let d=a.height;var e=17+4*b.versionNumber;let f=x.createEmpty(e,e);f.setRegion(0,0,9,9,!0);f.setRegion(e-8,0,8,9,!0);f.setRegion(0,e-8,9,8,!0);for(var g of b.alignmentPatternCenters)for(var h of b.alignmentPatternCenters)6===g&&6===h||6===g&&h===e-7||g===e-7&&6===h||f.setRegion(g-2,h-2,5,5,!0);f.setRegion(6,9,1,e-17,!0);f.setRegion(9,6,e-17,1,!0);6<b.versionNumber&&(f.setRegion(e-11,0,3,6,!0),f.setRegion(0,e-11,6,3,!0));b=[];h=g=0;e=!0;for(let k=d-1;0<k;k-=2){6===
k&&k--;for(let m=0;m<d;m++){let l=e?d-1-m:m;for(let n=0;2>n;n++){let q=k-n;if(!f.get(q,l)){h++;let r=a.get(q,l);c({y:l,x:q})&&(r=!r);g=g<<1|r;8===h&&(b.push(g),g=h=0)}}}e=!e}return b}
function la(a){var b=a.height,c=Math.floor((b-17)/4);if(6>=c)return I[c-1];c=0;for(var d=5;0<=d;d--)for(var e=b-9;e>=b-11;e--)c=K(a.get(e,d),c);d=0;for(e=5;0<=e;e--)for(let g=b-9;g>=b-11;g--)d=K(a.get(e,g),d);a=Infinity;let f;for(let g of I){if(g.infoBits===c||g.infoBits===d)return g;b=J(c,g.infoBits);b<a&&(f=g,a=b);b=J(d,g.infoBits);b<a&&(f=g,a=b)}if(3>=a)return f}
function ma(a){let b=0;for(var c=0;8>=c;c++)6!==c&&(b=K(a.get(c,8),b));for(c=7;0<=c;c--)6!==c&&(b=K(a.get(8,c),b));var d=a.height;c=0;for(var e=d-1;e>=d-7;e--)c=K(a.get(8,e),c);for(e=d-8;e<d;e++)c=K(a.get(e,8),c);a=Infinity;d=null;for(let {bits:f,formatInfo:g}of ia){if(f===b||f===c)return g;e=J(b,f);e<a&&(d=g,a=e);b!==c&&(e=J(c,f),e<a&&(d=g,a=e))}return 3>=a?d:null}
function na(a,b,c){let d=b.errorCorrectionLevels[c],e=[],f=0;d.ecBlocks.forEach(h=>{for(let k=0;k<h.numBlocks;k++)e.push({numDataCodewords:h.dataCodewordsPerBlock,codewords:[]}),f+=h.dataCodewordsPerBlock+d.ecCodewordsPerBlock});if(a.length<f)return null;a=a.slice(0,f);b=d.ecBlocks[0].dataCodewordsPerBlock;for(c=0;c<b;c++)for(var g of e)g.codewords.push(a.shift());if(1<d.ecBlocks.length)for(g=d.ecBlocks[0].numBlocks,b=d.ecBlocks[1].numBlocks,c=0;c<b;c++)e[g+c].codewords.push(a.shift());for(;0<a.length;)for(let h of e)h.codewords.push(a.shift());
return e}function L(a){let b=la(a);if(!b)return null;var c=ma(a);if(!c)return null;a=ka(a,b,c);var d=na(a,b,c.errorCorrectionLevel);if(!d)return null;c=d.reduce((e,f)=>e+f.numDataCodewords,0);c=new Uint8ClampedArray(c);a=0;for(let e of d){d=ha(e.codewords,e.codewords.length-e.numDataCodewords);if(!d)return null;for(let f=0;f<e.numDataCodewords;f++)c[a++]=d[f]}try{return da(c,b.versionNumber)}catch(e){return null}}
function M(a,b,c,d){var e=a.x-b.x+c.x-d.x;let f=a.y-b.y+c.y-d.y;if(0===e&&0===f)return{a11:b.x-a.x,a12:b.y-a.y,a13:0,a21:c.x-b.x,a22:c.y-b.y,a23:0,a31:a.x,a32:a.y,a33:1};let g=b.x-c.x;var h=d.x-c.x;let k=b.y-c.y,m=d.y-c.y;c=g*m-h*k;h=(e*m-h*f)/c;e=(g*f-e*k)/c;return{a11:b.x-a.x+h*b.x,a12:b.y-a.y+h*b.y,a13:h,a21:d.x-a.x+e*d.x,a22:d.y-a.y+e*d.y,a23:e,a31:a.x,a32:a.y,a33:1}}
function oa(a,b,c,d){a=M(a,b,c,d);return{a11:a.a22*a.a33-a.a23*a.a32,a12:a.a13*a.a32-a.a12*a.a33,a13:a.a12*a.a23-a.a13*a.a22,a21:a.a23*a.a31-a.a21*a.a33,a22:a.a11*a.a33-a.a13*a.a31,a23:a.a13*a.a21-a.a11*a.a23,a31:a.a21*a.a32-a.a22*a.a31,a32:a.a12*a.a31-a.a11*a.a32,a33:a.a11*a.a22-a.a12*a.a21}}
function pa(a,b){var c=oa({x:3.5,y:3.5},{x:b.dimension-3.5,y:3.5},{x:b.dimension-6.5,y:b.dimension-6.5},{x:3.5,y:b.dimension-3.5}),d=M(b.topLeft,b.topRight,b.alignmentPattern,b.bottomLeft),e=d.a11*c.a11+d.a21*c.a12+d.a31*c.a13,f=d.a12*c.a11+d.a22*c.a12+d.a32*c.a13,g=d.a13*c.a11+d.a23*c.a12+d.a33*c.a13,h=d.a11*c.a21+d.a21*c.a22+d.a31*c.a23,k=d.a12*c.a21+d.a22*c.a22+d.a32*c.a23,m=d.a13*c.a21+d.a23*c.a22+d.a33*c.a23,l=d.a11*c.a31+d.a21*c.a32+d.a31*c.a33,n=d.a12*c.a31+d.a22*c.a32+d.a32*c.a33,q=d.a13*
c.a31+d.a23*c.a32+d.a33*c.a33;c=x.createEmpty(b.dimension,b.dimension);d=(r,u)=>{const p=g*r+m*u+q;return{x:(e*r+h*u+l)/p,y:(f*r+k*u+n)/p}};for(let r=0;r<b.dimension;r++)for(let u=0;u<b.dimension;u++){let p=d(u+.5,r+.5);c.set(u,r,a.get(Math.floor(p.x),Math.floor(p.y)))}return{matrix:c,mappingFunction:d}}let N=(a,b)=>Math.sqrt(Math.pow(b.x-a.x,2)+Math.pow(b.y-a.y,2));function O(a){return a.reduce((b,c)=>b+c)}
function qa(a,b,c){let d=N(a,b),e=N(b,c),f=N(a,c),g,h,k;e>=d&&e>=f?[g,h,k]=[b,a,c]:f>=e&&f>=d?[g,h,k]=[a,b,c]:[g,h,k]=[a,c,b];0>(k.x-h.x)*(g.y-h.y)-(k.y-h.y)*(g.x-h.x)&&([g,k]=[k,g]);return{bottomLeft:g,topLeft:h,topRight:k}}
function ra(a,b,c,d){d=(O(P(a,c,d,5))/7+O(P(a,b,d,5))/7+O(P(c,a,d,5))/7+O(P(b,a,d,5))/7)/4;if(1>d)throw Error("Invalid module size");b=Math.round(N(a,b)/d);a=Math.round(N(a,c)/d);a=Math.floor((b+a)/2)+7;switch(a%4){case 0:a++;break;case 2:a--}return{dimension:a,moduleSize:d}}
function Q(a,b,c,d){let e=[{x:Math.floor(a.x),y:Math.floor(a.y)}];var f=Math.abs(b.y-a.y)>Math.abs(b.x-a.x);if(f){var g=Math.floor(a.y);var h=Math.floor(a.x);a=Math.floor(b.y);b=Math.floor(b.x)}else g=Math.floor(a.x),h=Math.floor(a.y),a=Math.floor(b.x),b=Math.floor(b.y);let k=Math.abs(a-g),m=Math.abs(b-h),l=Math.floor(-k/2),n=g<a?1:-1,q=h<b?1:-1,r=!0;for(let u=g,p=h;u!==a+n;u+=n){g=f?p:u;h=f?u:p;if(c.get(g,h)!==r&&(r=!r,e.push({x:g,y:h}),e.length===d+1))break;l+=m;if(0<l){if(p===b)break;p+=q;l-=k}}c=
[];for(f=0;f<d;f++)e[f]&&e[f+1]?c.push(N(e[f],e[f+1])):c.push(0);return c}function P(a,b,c,d){let e=b.y-a.y,f=b.x-a.x;b=Q(a,b,c,Math.ceil(d/2));a=Q(a,{x:a.x-f,y:a.y-e},c,Math.ceil(d/2));c=b.shift()+a.shift()-1;return a.concat(c).concat(...b)}function R(a,b){let c=O(a)/O(b),d=0;b.forEach((e,f)=>{d+=Math.pow(a[f]-e*c,2)});return{averageSize:c,error:d}}
function S(a,b,c){try{let d=P(a,{x:-1,y:a.y},c,b.length),e=P(a,{x:a.x,y:-1},c,b.length),f=P(a,{x:Math.max(0,a.x-a.y)-1,y:Math.max(0,a.y-a.x)-1},c,b.length),g=P(a,{x:Math.min(c.width,a.x+a.y)+1,y:Math.min(c.height,a.y+a.x)+1},c,b.length),h=R(d,b),k=R(e,b),m=R(f,b),l=R(g,b),n=(h.averageSize+k.averageSize+m.averageSize+l.averageSize)/4;return Math.sqrt(h.error*h.error+k.error*k.error+m.error*m.error+l.error*l.error)+(Math.pow(h.averageSize-n,2)+Math.pow(k.averageSize-n,2)+Math.pow(m.averageSize-n,2)+
Math.pow(l.averageSize-n,2))/n}catch(d){return Infinity}}function T(a,b){for(var c=Math.round(b.x);a.get(c,Math.round(b.y));)c--;for(var d=Math.round(b.x);a.get(d,Math.round(b.y));)d++;c=(c+d)/2;for(d=Math.round(b.y);a.get(Math.round(c),d);)d--;for(b=Math.round(b.y);a.get(Math.round(c),b);)b++;return{x:c,y:(d+b)/2}}
function sa(a){var b=[],c=[];let d=[];var e=[];for(let p=0;p<=a.height;p++){var f=0,g=!1;let t=[0,0,0,0,0];for(let v=-1;v<=a.width;v++){var h=a.get(v,p);if(h===g)f++;else{t=[t[1],t[2],t[3],t[4],f];f=1;g=h;var k=O(t)/7;k=Math.abs(t[0]-k)<k&&Math.abs(t[1]-k)<k&&Math.abs(t[2]-3*k)<3*k&&Math.abs(t[3]-k)<k&&Math.abs(t[4]-k)<k&&!h;var m=O(t.slice(-3))/3;h=Math.abs(t[2]-m)<m&&Math.abs(t[3]-m)<m&&Math.abs(t[4]-m)<m&&h;if(k){let z=v-t[3]-t[4],y=z-t[2];k={startX:y,endX:z,y:p};m=c.filter(w=>y>=w.bottom.startX&&
y<=w.bottom.endX||z>=w.bottom.startX&&y<=w.bottom.endX||y<=w.bottom.startX&&z>=w.bottom.endX&&1.5>t[2]/(w.bottom.endX-w.bottom.startX)&&.5<t[2]/(w.bottom.endX-w.bottom.startX));0<m.length?m[0].bottom=k:c.push({top:k,bottom:k})}if(h){let z=v-t[4],y=z-t[3];h={startX:y,y:p,endX:z};k=e.filter(w=>y>=w.bottom.startX&&y<=w.bottom.endX||z>=w.bottom.startX&&y<=w.bottom.endX||y<=w.bottom.startX&&z>=w.bottom.endX&&1.5>t[2]/(w.bottom.endX-w.bottom.startX)&&.5<t[2]/(w.bottom.endX-w.bottom.startX));0<k.length?
k[0].bottom=h:e.push({top:h,bottom:h})}}}b.push(...c.filter(v=>v.bottom.y!==p&&2<=v.bottom.y-v.top.y));c=c.filter(v=>v.bottom.y===p);d.push(...e.filter(v=>v.bottom.y!==p));e=e.filter(v=>v.bottom.y===p)}b.push(...c.filter(p=>2<=p.bottom.y-p.top.y));d.push(...e);c=[];for(var l of b)2>l.bottom.y-l.top.y||(b=(l.top.startX+l.top.endX+l.bottom.startX+l.bottom.endX)/4,e=(l.top.y+l.bottom.y+1)/2,a.get(Math.round(b),Math.round(e))&&(f=[l.top.endX-l.top.startX,l.bottom.endX-l.bottom.startX,l.bottom.y-l.top.y+
1],f=O(f)/f.length,g=S({x:Math.round(b),y:Math.round(e)},[1,1,3,1,1],a),c.push({score:g,x:b,y:e,size:f})));if(3>c.length)return null;c.sort((p,t)=>p.score-t.score);l=[];for(b=0;b<Math.min(c.length,5);++b){e=c[b];f=[];for(var n of c)n!==e&&f.push(Object.assign(Object.assign({},n),{score:n.score+Math.pow(n.size-e.size,2)/e.size}));f.sort((p,t)=>p.score-t.score);l.push({points:[e,f[0],f[1]],score:e.score+f[0].score+f[1].score})}l.sort((p,t)=>p.score-t.score);let {topRight:q,topLeft:r,bottomLeft:u}=qa(...l[0].points);
l=U(a,d,q,r,u);n=[];l&&n.push({alignmentPattern:{x:l.alignmentPattern.x,y:l.alignmentPattern.y},bottomLeft:{x:u.x,y:u.y},dimension:l.dimension,topLeft:{x:r.x,y:r.y},topRight:{x:q.x,y:q.y}});l=T(a,q);b=T(a,r);c=T(a,u);(a=U(a,d,l,b,c))&&n.push({alignmentPattern:{x:a.alignmentPattern.x,y:a.alignmentPattern.y},bottomLeft:{x:c.x,y:c.y},topLeft:{x:b.x,y:b.y},topRight:{x:l.x,y:l.y},dimension:a.dimension});return 0===n.length?null:n}
function U(a,b,c,d,e){let f,g;try{({dimension:f,moduleSize:g}=ra(d,c,e,a))}catch(l){return null}var h=c.x-d.x+e.x,k=c.y-d.y+e.y;c=(N(d,e)+N(d,c))/2/g;e=1-3/c;let m={x:d.x+e*(h-d.x),y:d.y+e*(k-d.y)};b=b.map(l=>{const n=(l.top.startX+l.top.endX+l.bottom.startX+l.bottom.endX)/4;l=(l.top.y+l.bottom.y+1)/2;if(a.get(Math.floor(n),Math.floor(l))){var q=S({x:Math.floor(n),y:Math.floor(l)},[1,1,1],a)+N({x:n,y:l},m);return{x:n,y:l,score:q}}}).filter(l=>!!l).sort((l,n)=>l.score-n.score);return{alignmentPattern:15<=
c&&b.length?b[0]:m,dimension:f}}
function V(a){var b=sa(a);if(!b)return null;for(let e of b){b=pa(a,e);var c=b.matrix;if(null==c)c=null;else{var d=L(c);if(d)c=d;else{for(d=0;d<c.width;d++)for(let f=d+1;f<c.height;f++)c.get(d,f)!==c.get(f,d)&&(c.set(d,f,!c.get(d,f)),c.set(f,d,!c.get(f,d)));c=L(c)}}if(c)return{binaryData:c.bytes,data:c.text,chunks:c.chunks,version:c.version,location:{topRightCorner:b.mappingFunction(e.dimension,0),topLeftCorner:b.mappingFunction(0,0),bottomRightCorner:b.mappingFunction(e.dimension,e.dimension),bottomLeftCorner:b.mappingFunction(0,
e.dimension),topRightFinderPattern:e.topRight,topLeftFinderPattern:e.topLeft,bottomLeftFinderPattern:e.bottomLeft,bottomRightAlignmentPattern:e.alignmentPattern},matrix:b.matrix}}return null}let ta={inversionAttempts:"attemptBoth",greyScaleWeights:{red:.2126,green:.7152,blue:.0722,useIntegerApproximation:!1},canOverwriteImage:!0};function W(a,b){Object.keys(b).forEach(c=>{a[c]=b[c]})}
function X(a,b,c,d={}){let e=Object.create(null);W(e,ta);W(e,d);d="onlyInvert"===e.inversionAttempts||"invertFirst"===e.inversionAttempts;var f="attemptBoth"===e.inversionAttempts||d;var g=e.greyScaleWeights,h=e.canOverwriteImage,k=b*c;if(a.length!==4*k)throw Error("Malformed data passed to binarizer.");var m=0;if(h){var l=new Uint8ClampedArray(a.buffer,m,k);m+=k}l=new A(b,c,l);if(g.useIntegerApproximation)for(var n=0;n<c;n++)for(var q=0;q<b;q++){var r=4*(n*b+q);l.set(q,n,g.red*a[r]+g.green*a[r+1]+
g.blue*a[r+2]+128>>8)}else for(n=0;n<c;n++)for(q=0;q<b;q++)r=4*(n*b+q),l.set(q,n,g.red*a[r]+g.green*a[r+1]+g.blue*a[r+2]);g=Math.ceil(b/8);n=Math.ceil(c/8);q=g*n;if(h){var u=new Uint8ClampedArray(a.buffer,m,q);m+=q}u=new A(g,n,u);for(q=0;q<n;q++)for(r=0;r<g;r++){var p=Infinity,t=0;for(var v=0;8>v;v++)for(let w=0;8>w;w++){let aa=l.get(8*r+w,8*q+v);p=Math.min(p,aa);t=Math.max(t,aa)}v=(p+t)/2;v=Math.min(255,1.11*v);24>=t-p&&(v=p/2,0<q&&0<r&&(t=(u.get(r,q-1)+2*u.get(r-1,q)+u.get(r-1,q-1))/4,p<t&&(v=t)));
u.set(r,q,v)}h?(q=new Uint8ClampedArray(a.buffer,m,k),m+=k,q=new x(q,b)):q=x.createEmpty(b,c);r=null;f&&(h?(a=new Uint8ClampedArray(a.buffer,m,k),r=new x(a,b)):r=x.createEmpty(b,c));for(b=0;b<n;b++)for(a=0;a<g;a++){c=g-3;c=2>a?2:a>c?c:a;h=n-3;h=2>b?2:b>h?h:b;k=0;for(m=-2;2>=m;m++)for(p=-2;2>=p;p++)k+=u.get(c+m,h+p);c=k/25;for(h=0;8>h;h++)for(k=0;8>k;k++)m=8*a+h,p=8*b+k,t=l.get(m,p),q.set(m,p,t<=c),f&&r.set(m,p,!(t<=c))}f=f?{binarized:q,inverted:r}:{binarized:q};let {binarized:z,inverted:y}=f;(f=V(d?
y:z))||"attemptBoth"!==e.inversionAttempts&&"invertFirst"!==e.inversionAttempts||(f=V(d?z:y));return f}X.default=X;let Y="dontInvert",Z={red:77,green:150,blue:29,useIntegerApproximation:!0};
self.onmessage=a=>{let b=a.data.id,c=a.data.data;switch(a.data.type){case "decode":(a=X(c.data,c.width,c.height,{inversionAttempts:Y,greyScaleWeights:Z}))?self.postMessage({id:b,type:"qrResult",data:a.data,cornerPoints:[a.location.topLeftCorner,a.location.topRightCorner,a.location.bottomRightCorner,a.location.bottomLeftCorner]}):self.postMessage({id:b,type:"qrResult",data:null});break;case "grayscaleWeights":Z.red=c.red;Z.green=c.green;Z.blue=c.blue;Z.useIntegerApproximation=c.useIntegerApproximation;
break;case "inversionMode":switch(c){case "original":Y="dontInvert";break;case "invert":Y="onlyInvert";break;case "both":Y="attemptBoth";break;default:throw Error("Invalid inversion mode");}break;case "close":self.close()}}
\`]),{type:"application/javascript"}))});return l})})(Le)),Le.exports}var mt=ft(),Te=qe(mt);self.window=self,self.Image=self.HTMLVideoElement=self.HTMLCanvasElement=self.SVGImageElement=class{};const Ye=Te.createQrEngine();Te._postWorkerMessage(Ye,"inversionMode","both");const Se=new OffscreenCanvas(0,0);Se._getContext=Se.getContext,Se.getContext=function(...R){return R[1]&&(R[1].willReadFrequently=!0),this._getContext(...R)};const pt=[/^https:\\/\\/[^.]+\\.fanbox\\.cc/,/^https:\\/\\/twitter\\.com/,/^https:\\/\\/x\\.com/,/^https:\\/\\/fantia\\.jp/,/^https:\\/\\/marshmallow-qa\\.com/,/^https:\\/\\/www\\.dlsite\\.com/,/^https:\\/\\/hitomi\\.la/,/^https:\\/\\/www\\.dmm\\.co\\.jp/],kt=async R=>{try{const $=(await Te.scanImage(await createImageBitmap(new Blob([R])),{qrEngine:Ye,canvas:Se})).data;if($)return pt.every(o=>!o.test($))}catch{}return!1},gt=async(R,$,o=new Set)=>{let l=R.length-1,d=0;for(;l>=R.length-10&&!(l<=2);l--){if(o.has(l))continue;const e=R[l];if(!e)break;if(await $(e))o.add(l);else{if(d>=2)break;d+=1}}let c=0;for(l=Math.min(...o);l<R.length;l++){if(o.has(l)){c+=1;continue}c>=2||o.has(l-1)&&o.has(l+1)?o.add(l):c=0}return o};class wt{zip=new Ge;adRemoved=!1;file({name:$,data:o}){this.zip.file($,o)}files($){$.forEach(({name:o,data:l})=>{this.zip.file(o,l)})}async unzipFile({data:$,path:o,type:l}){return(await Ge.loadAsync($)).file(o)?.async(l)}async generateAsync($,o){$?.removeAdPage&&await this.removeAd();const l=await this.zip.generateAsync({...$,type:"uint8array"},o);return Re(l,[l.buffer])}async generateStream($,o,l){$?.removeAdPage&&await this.removeAd();const d=this.zip.generateInternalStream({...$,type:"uint8array"}),c=new ReadableStream({start:e=>{d.on("error",t=>{e.error(t),l?.()}),d.on("end",()=>{setTimeout(()=>{e.close(),l?.()})}),d.on("data",(t,a)=>{e.enqueue(t),o?.(a)}),d.resume()}});return Re({zipStream:c},[c])}async removeAd(){if(this.adRemoved)return;const $=[];Object.values(this.zip.files).forEach(o=>{const l=parseInt(o.name);Number.isNaN(l)||$.push({i:l,obj:o})}),$.sort((o,l)=>o.i-l.i);try{const o=await gt($,async({obj:d})=>kt(await d._data));if(!o.size){console.log("[nhentai-helper] no ad pages detected");return}const l=[...o.values()].map(d=>$[d].obj);console.log("[nhentai-helper] ad pages detected:",...l.map(d=>d.name)),l.forEach(d=>{this.zip.remove(d.name)})}catch(o){console.error("[nhentai-helper] remove ad page",o)}}}Oe(wt)})();
`, blob$1 = typeof self < "u" && self.Blob && new Blob(["(self.URL || self.webkitURL).revokeObjectURL(self.location.href);", jsContent$1], { type: "text/javascript;charset=utf-8" });
      function WorkerWrapper$1(options) {
        let objURL;
        try {
          if (objURL = blob$1 && (self.URL || self.webkitURL).createObjectURL(blob$1), !objURL) throw "";
          const worker = new Worker(objURL, {
            name: options?.name
          });
          return worker.addEventListener("error", () => {
            (self.URL || self.webkitURL).revokeObjectURL(objURL);
          }), worker;
        } catch {
          return new Worker(
            "data:text/javascript;charset=utf-8," + encodeURIComponent(jsContent$1),
            {
              name: options?.name
            }
          );
        }
      }
      const getTransferableData = (files) => files.map(({ data }) => data).filter((data) => typeof data != "string");
      class JSZipWorkerPool {
        pool = [];
        waitingQueue = [];
        constructor() {
          for (let id = 0; id < WORKER_THREAD_NUM; id++)
            this.pool.push({
              id,
              idle: true
            });
        }
        async generateAsync(files, options, onUpdate) {
          const worker = await this.acquireWorker(), zip = await new worker.JSZip();
          try {
            return await zip.files(transfer(files, getTransferableData(files))), await zip.generateAsync(
              options,
              proxy((metaData) => {
                metaData.currentFile && onUpdate?.({ workerId: worker.id, ...metaData });
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
                metaData.currentFile && onUpdate?.({ workerId: worker.id, ...metaData });
              })
            );
            return zipStream;
          } finally {
            zip[releaseProxy](), this.releaseWorker(worker);
          }
        }
        unzipFile = async (params) => {
          const worker = await this.acquireWorker(), zip = await new worker.JSZip(), clean = () => {
            zip[releaseProxy](), this.releaseWorker(worker);
          };
          try {
            return await zip.unzipFile(transfer(params, [params.data]));
          } catch (error) {
            throw clean(), error;
          }
        };
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
          return worker || (worker = await this.waitIdleWorker()), worker.JSZip || (worker.JSZip = await this.createWorker()), worker.idle = false, worker;
        }
        releaseWorker(worker) {
          if (worker.idle = true, !this.waitingQueue.length) return;
          removeAt(this.waitingQueue, 0)(worker);
        }
      }
      const jszipPool = new JSZipWorkerPool();
      class JSZip {
        files = [];
        static unzipFile = (params) => jszipPool.unzipFile(params);
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
      extendPrototype(localforage);
      class DownloadHistory {
        constructor(name) {
          this.name = name, this.store = localforage.createInstance({
            name: "nhentai_helper",
            storeName: name
          }), this.ready = this.store.ready().then(() => true).catch((e) => (logger.error(e), false));
        }
        store;
        ready;
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
          if (!await this.ready) return false;
          try {
            return await this.store.getItem(key) === !0;
          } catch (e) {
            logger.error(e);
          }
          return false;
        }
        async size() {
          return await this.ready ? this.store.length() : NaN;
        }
        async import(keys2) {
          if (!await this.ready) throw new Error(`store ${this.name} cannot ready`);
          try {
            await this.store.setItems(keys2.map((gid) => ({ key: gid, value: !0 })));
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
      const gidHistory = new DownloadHistory("dl_history_gid"), enTitleHistory = new DownloadHistory("dl_history_en"), jpTitleHistory = new DownloadHistory("dl_history"), prettyTitleHistory = new DownloadHistory("dl_history_pretty"), normalizeTitle = (title) => title.replace(/\s/g, ""), getTitleMd5 = (title) => md5(normalizeTitle(title)), markAsDownloaded = (gid, { english, japanese, pretty } = {}) => {
        gidHistory.add(String(gid)), english && enTitleHistory.add(getTitleMd5(english)), japanese && jpTitleHistory.add(getTitleMd5(japanese)), pretty && prettyTitleHistory.add(getTitleMd5(pretty));
      }, unmarkAsDownloaded = (gid, { english, japanese, pretty } = {}) => {
        gidHistory.del(String(gid)), english && enTitleHistory.del(getTitleMd5(english)), japanese && jpTitleHistory.del(getTitleMd5(japanese)), pretty && prettyTitleHistory.del(getTitleMd5(pretty));
      }, isDownloadedByGid = (gid) => gidHistory.has(String(gid)), isDownloadedByTitle = async ({
        english,
        japanese,
        pretty
      } = {}) => {
        if (settings.judgeDownloadedByJapanese && japanese) {
          const md5v2 = getTitleMd5(japanese);
          if (await jpTitleHistory.has(md5v2)) return true;
          const md5v1 = md5(japanese);
          if (await jpTitleHistory.has(md5v1))
            return jpTitleHistory.add(md5v2), jpTitleHistory.del(md5v1), true;
        }
        return !!(settings.judgeDownloadedByEnglish && english && await enTitleHistory.has(getTitleMd5(english)) || settings.judgeDownloadedByPretty && pretty && await enTitleHistory.has(getTitleMd5(pretty)));
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
          }), filename = `nhentai-helper-download-history-${dateTimeFormatter.format(Date.now()).replace(/\D/g, "")}.zip`;
          return FileSaver_minExports.saveAs(new File([data], filename, { type: "application/zip" })), logger.log("export download history", filename), !0;
        } catch (error) {
          logger.error(error);
        }
        return false;
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
        return false;
      }, clearDownloadHistory = async () => {
        try {
          return await gidHistory.clear(), await enTitleHistory.clear(), await jpTitleHistory.clear(), await prettyTitleHistory.clear(), !0;
        } catch (error) {
          logger.error(error);
        }
        return false;
      }, isSameTitleString = (title1, title2) => !!title1 && !!title2 && normalizeTitle(title1) === normalizeTitle(title2), isSameTitle = (title1, title2) => !!(settings.judgeDownloadedByJapanese && isSameTitleString(title1.japanese, title2.japanese) || settings.judgeDownloadedByEnglish && isSameTitleString(title1.english, title2.english) || settings.judgeDownloadedByPretty && isSameTitleString(title1.pretty, title2.pretty)), showMessage = (params) => elementPlus.ElMessage({ ...params, appendTo: _monkeyWindow.document.body }), isSSR = () => typeof _nano < "u" && _nano.isSSR === true, tick = Promise.prototype.then.bind(Promise.resolve()), strToHash = (s) => {
        let hash = 0;
        for (let i = 0; i < s.length; i++) {
          const chr = s.charCodeAt(i);
          hash = (hash << 5) - hash + chr, hash |= 0;
        }
        return Math.abs(hash).toString(32);
      }, appendChildren = (element, children, escape2 = true) => {
        if (!Array.isArray(children)) {
          appendChildren(element, [children], escape2);
          return;
        }
        typeof children == "object" && (children = Array.prototype.slice.call(children)), children.forEach((child) => {
          if (Array.isArray(child))
            appendChildren(element, child, escape2);
          else {
            const c = _render(child);
            typeof c < "u" && (Array.isArray(c) ? appendChildren(element, c, escape2) : isSSR() && !escape2 ? element.appendChild(c.nodeType == null ? c.toString() : c) : element.appendChild(c.nodeType == null ? document.createTextNode(c.toString()) : c));
          }
        });
      }, SVG = (props) => {
        const child = props.children[0], attrs = child.attributes;
        if (isSSR())
          return child;
        const svg = hNS("svg");
        for (let i = attrs.length - 1; i >= 0; i--)
          svg.setAttribute(attrs[i].name, attrs[i].value);
        return svg.innerHTML = child.innerHTML, svg;
      }, _render = (comp) => {
        if (comp === null || comp === false || typeof comp > "u")
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
          return comp.map((c) => _render(c)).flat();
        if (typeof comp == "function" && !comp.isClass)
          return _render(comp());
        if (comp.component && comp.component.tagName && typeof comp.component.tagName == "string" || Array.isArray(comp.component) || comp.component)
          return _render(comp.component);
        if (typeof comp == "object")
          return [];
        console.warn("Something unexpected happened with:", comp);
      }, renderFunctionalComponent = (fncComp) => {
        const { component, props } = fncComp;
        return _render(component(props));
      }, renderClassComponent = (classComp) => {
        const { component, props } = classComp, hash = strToHash(component.toString());
        component.prototype._getHash = () => hash;
        const Component = new component(props);
        isSSR() || Component.willMount();
        let el = Component.render();
        return el = _render(el), Component.elements = el, props && props.ref && props.ref(Component), isSSR() || tick(() => {
          Component._didMount();
        }), el;
      }, hNS = (tag) => document.createElementNS("http://www.w3.org/2000/svg", tag), h = (tagNameOrComponent, props = {}, ...children) => {
        if (props && props.children && (Array.isArray(children) ? Array.isArray(props.children) ? children = [...props.children, ...children] : children.push(props.children) : Array.isArray(props.children) ? children = props.children : children = [props.children]), isSSR() && _nano.ssrTricks.isWebComponent(tagNameOrComponent)) {
          const element2 = _nano.ssrTricks.renderWebComponent(tagNameOrComponent, props, children, _render);
          return element2 === null ? `ERROR: "<${tagNameOrComponent} />"` : element2;
        }
        if (typeof tagNameOrComponent != "string")
          return { component: tagNameOrComponent, props: { ...props, children } };
        try {
          if (isSSR() && typeof tagNameOrComponent == "string" && !document)
            throw new Error("document is not defined");
        } catch (err) {
          console.log("ERROR:", err.message, `
 > Please read: https://github.com/nanojsx/nano/issues/106`);
        }
        let ref2;
        const element = tagNameOrComponent === "svg" ? hNS("svg") : document.createElement(tagNameOrComponent), isEvent = (el, p) => p.indexOf("on") !== 0 ? false : el._ssr ? true : typeof el[p] == "object" || typeof el[p] == "function";
        for (const p in props) {
          if (p === "style" && typeof props[p] == "object") {
            const styles = Object.keys(props[p]).map((k) => `${k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}:${props[p][k]}`).join(";");
            props[p] = `${styles};`;
          }
          if (p === "ref")
            ref2 = props[p];
          else if (isEvent(element, p.toLowerCase()))
            element.addEventListener(p.toLowerCase().substring(2), (e) => props[p](e));
          else if (p === "dangerouslySetInnerHTML" && props[p].__html)
            if (isSSR())
              element.innerHTML = props[p].__html;
            else {
              const fragment = document.createElement("fragment");
              fragment.innerHTML = props[p].__html, element.appendChild(fragment);
            }
          else if (p === "innerHTML" && props[p].__dangerousHtml)
            if (isSSR())
              element.innerHTML = props[p].__dangerousHtml;
            else {
              const fragment = document.createElement("fragment");
              fragment.innerHTML = props[p].__dangerousHtml, element.appendChild(fragment);
            }
          else /^className$/i.test(p) ? element.setAttribute("class", props[p]) : typeof props[p] < "u" && element.setAttribute(p, props[p]);
        }
        const escape2 = !["noscript", "script", "style"].includes(tagNameOrComponent);
        return appendChildren(element, children, escape2), ref2 && ref2(element), element;
      }, createNode = function(type, props) {
        let { children = [], ..._props } = props;
        return Array.isArray(children) || (children = [children]), h(type, _props, ...children);
      }, readFile = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        }, reader.onabort = reject, reader.onerror = reject, reader.readAsArrayBuffer(file);
      }), pickFile = (accept) => new Promise((resolve) => {
        const input = /* @__PURE__ */ createNode(
          "input",
          {
            type: "file",
            accept,
            onChange: () => {
              resolve(input.files?.[0]);
            }
          }
        );
        input.click();
      }), pickAndReadFile = async (accept) => {
        const file = await pickFile(accept);
        if (file) return readFile(file);
      }, _hoisted_1$2 = { class: "nhentai-helper-setting-help-buttons no-sl" }, _hoisted_2$1 = ["id"], _hoisted_3$1 = { id: "nhentai-helper-setting-dialog" }, _hoisted_4$1 = {
        class: "asterisk-example no-sl",
        style: { "margin-bottom": "18px" }
      }, _hoisted_5$1 = { class: "inline-item" }, _hoisted_6$1 = { class: "inline-item__name" }, _hoisted_7$1 = { class: "inline-item" }, _hoisted_8 = { class: "inline-item__name" }, _hoisted_9 = { style: { color: "var(--el-text-color-regular)", "font-size": "var(--el-form-label-font-size)" } }, _hoisted_10 = {
        key: 0,
        class: "no-sl"
      }, _hoisted_11 = {
        key: 0,
        class: "no-sl"
      }, _hoisted_12 = { class: "monospace" }, _hoisted_13 = { class: "no-sl" }, _hoisted_14 = { class: "no-sl" }, _sfc_main$2 = /* @__PURE__ */ Vue.defineComponent({
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
          }, { t: t2, locale } = useI18n(), show = Vue.ref(false), downloadedNum = Vue.ref(NaN), filenameLengthNumber = Vue.computed({
            get: () => typeof writeableSettings.filenameLength == "number" ? writeableSettings.filenameLength : 0,
            set: (val) => {
              writeableSettings.filenameLength = val;
            }
          }), filenameLengthAuto = Vue.computed({
            get: () => writeableSettings.filenameLength === "auto",
            set: (val) => {
              writeableSettings.filenameLength = val ? "auto" : 0;
            }
          }), refreshDownloadNum = async () => {
            downloadedNum.value = await getDownloadNumber();
          }, open2 = () => {
            show.value = true, refreshDownloadNum();
          }, openHelp = () => {
            _GM_openInTab(
              locale.value === "zh" ? "https://github.com/Tsuk1ko/nhentai-helper/blob/master/README-ZH.md#%E8%AE%BE%E7%BD%AE" : "https://github.com/Tsuk1ko/nhentai-helper/blob/master/README.md#settings",
              { active: true, setParent: true }
            );
          }, exporting = Vue.ref(false), importing = Vue.ref(false), clearing = Vue.ref(false), showMessageBySucceed = (succeed) => {
            showMessage({
              type: succeed ? "success" : "error",
              message: succeed ? "Succeed" : "Failed, please check console for error message"
            });
          }, exportHistory = async () => {
            exporting.value = true;
            const succeed = await exportDownloadHistory();
            exporting.value = false, showMessageBySucceed(succeed);
          }, importHistory = async () => {
            const data = await pickAndReadFile("application/zip");
            if (!data) return;
            importing.value = true;
            const succeed = await importDownloadHistory(data);
            importing.value = false, refreshDownloadNum(), showMessageBySucceed(succeed);
          }, clearHistory = async () => {
            clearing.value = true;
            const succeed = await clearDownloadHistory();
            clearing.value = false, refreshDownloadNum(), showMessageBySucceed(succeed);
          }, addTitleReplacement = () => {
            writeableSettings.titleReplacement.push({ from: "", to: "", regexp: false });
          }, delTitleReplacement = (index) => {
            writeableSettings.titleReplacement.splice(index, 1);
          };
          return Vue.watch(
            () => writeableSettings.language,
            (val) => {
              locale.value = val;
            }
          ), __expose({ open: open2 }), (_ctx, _cache) => (Vue.openBlock(), Vue.createBlock(Vue.unref(elementPlus.ElDialog), {
            id: "nhentai-helper-setting-dialog-outside",
            modelValue: show.value,
            "onUpdate:modelValue": _cache[30] || (_cache[30] = ($event) => show.value = $event),
            center: true,
            top: "50px"
          }, {
            header: Vue.withCtx(({ titleId, titleClass }) => [
              Vue.createElementVNode("div", _hoisted_1$2, [
                Vue.createVNode(Vue.unref(elementPlus.ElButton), {
                  size: "small",
                  onClick: openHelp
                }, {
                  default: Vue.withCtx(() => [
                    Vue.createTextVNode(Vue.toDisplayString(Vue.unref(t2)("setting.helpButton")), 1)
                  ]),
                  _: 1
                })
              ]),
              Vue.createElementVNode("span", {
                id: titleId,
                class: Vue.normalizeClass(["no-sl", [titleClass]])
              }, Vue.toDisplayString(Vue.unref(t2)("setting.title")), 11, _hoisted_2$1)
            ]),
            default: Vue.withCtx(() => [
              Vue.createElementVNode("div", _hoisted_3$1, [
                Vue.createElementVNode("div", _hoisted_4$1, Vue.toDisplayString(Vue.unref(t2)("setting.asteriskTip")), 1),
                Vue.createVNode(Vue.unref(elementPlus.ElForm), {
                  "label-width": "auto",
                  "label-position": "left"
                }, {
                  default: Vue.withCtx(() => [
                    Vue.createVNode(Vue.unref(elementPlus.ElFormItem), { label: "Language" }, {
                      default: Vue.withCtx(() => [
                        Vue.createVNode(Vue.unref(elementPlus.ElSelect), {
                          modelValue: Vue.unref(writeableSettings).language,
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => Vue.unref(writeableSettings).language = $event)
                        }, {
                          default: Vue.withCtx(() => [
                            Vue.createVNode(Vue.unref(elementPlus.ElOption), {
                              label: "English",
                              value: "en"
                            }),
                            Vue.createVNode(Vue.unref(elementPlus.ElOption), {
                              label: "中文",
                              value: "zh"
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue"])
                      ]),
                      _: 1
                    }),
                    Vue.createVNode(Vue.unref(elementPlus.ElFormItem), {
                      class: "m-b-32",
                      label: Vue.unref(t2)("setting.downloadThread")
                    }, {
                      default: Vue.withCtx(() => [
                        Vue.createVNode(Vue.unref(elementPlus.ElSlider), {
                          modelValue: Vue.unref(writeableSettings).threadNum,
                          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => Vue.unref(writeableSettings).threadNum = $event),
                          min: 1,
                          max: 32,
                          marks: threadNumMarks
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    Vue.createVNode(Vue.unref(elementPlus.ElFormItem), {
                      class: "refresh-required",
                      label: Vue.unref(t2)("setting.openOnNewTab")
                    }, {
                      default: Vue.withCtx(() => [
                        Vue.createVNode(Vue.unref(elementPlus.ElSwitch), {
                          modelValue: Vue.unref(writeableSettings).openOnNewTab,
                          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => Vue.unref(writeableSettings).openOnNewTab = $event)
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    Vue.createVNode(Vue.unref(elementPlus.ElFormItem), {
                      label: Vue.unref(t2)("setting.compressionFilename")
                    }, {
                      default: Vue.withCtx(() => [
                        Vue.createVNode(Vue.unref(elementPlus.ElInput), {
                          modelValue: Vue.unref(writeableSettings).compressionFilename,
                          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => Vue.unref(writeableSettings).compressionFilename = $event),
                          placeholder: Vue.unref(settingDefinitions).compressionFilename.default,
                          onBlur: _cache[4] || (_cache[4] = ($event) => {
                            Vue.unref(writeableSettings).compressionFilename || (Vue.unref(writeableSettings).compressionFilename = Vue.unref(settingDefinitions).compressionFilename.default);
                          })
                        }, null, 8, ["modelValue", "placeholder"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    Vue.createVNode(Vue.unref(elementPlus.ElFormItem), { label: "└ {{artist}}" }, {
                      default: Vue.withCtx(() => [
                        Vue.createElementVNode("div", _hoisted_5$1, [
                          Vue.createElementVNode("span", _hoisted_6$1, Vue.toDisplayString(Vue.unref(t2)("setting.maxNumber")), 1),
                          Vue.createVNode(Vue.unref(elementPlus.ElInputNumber), {
                            modelValue: Vue.unref(writeableSettings).filenameMaxArtistsNumber,
                            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => Vue.unref(writeableSettings).filenameMaxArtistsNumber = $event),
                            size: "small",
                            min: 0,
                            "value-on-clear": Vue.unref(settingDefinitions).filenameMaxArtistsNumber.default,
                            "step-strictly": true,
                            style: { width: "90px" }
                          }, null, 8, ["modelValue", "value-on-clear"])
                        ]),
                        Vue.createElementVNode("div", _hoisted_7$1, [
                          Vue.createElementVNode("span", _hoisted_8, Vue.toDisplayString(Vue.unref(t2)("setting.separator")), 1),
                          Vue.createVNode(Vue.unref(elementPlus.ElInput), {
                            modelValue: Vue.unref(writeableSettings).filenameArtistsSeparator,
                            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => Vue.unref(writeableSettings).filenameArtistsSeparator = $event),
                            size: "small",
                            placeholder: Vue.unref(settingDefinitions).filenameArtistsSeparator.default,
                            style: { width: "50px" }
                          }, null, 8, ["modelValue", "placeholder"])
                        ])
                      ]),
                      _: 1
                    }),
                    Vue.createVNode(Vue.unref(elementPlus.ElFormItem), {
                      class: "m-b-32",
                      label: Vue.unref(t2)("setting.compressionLevel")
                    }, {
                      default: Vue.withCtx(() => [
                        Vue.createVNode(Vue.unref(elementPlus.ElSlider), {
                          modelValue: Vue.unref(writeableSettings).compressionLevel,
                          "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => Vue.unref(writeableSettings).compressionLevel = $event),
                          min: 0,
                          max: 9,
                          marks: compressionLevelMarks
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    Vue.createVNode(Vue.unref(elementPlus.ElFormItem), {
                      label: Vue.unref(t2)("setting.filenameLength")
                    }, {
                      default: Vue.withCtx(() => [
                        Vue.createVNode(Vue.unref(elementPlus.ElInputNumber), {
                          modelValue: filenameLengthNumber.value,
                          "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => filenameLengthNumber.value = $event),
                          min: 0,
                          "value-on-clear": Vue.unref(settingDefinitions).filenameLength.default,
                          "step-strictly": true,
                          disabled: Vue.unref(writeableSettings).filenameLength === "auto"
                        }, null, 8, ["modelValue", "value-on-clear", "disabled"]),
                        Vue.createVNode(Vue.unref(elementPlus.ElCheckbox), {
                          modelValue: filenameLengthAuto.value,
                          "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => filenameLengthAuto.value = $event),
                          class: "m-l-16",
                          label: Vue.unref(t2)("common.auto")
                        }, null, 8, ["modelValue", "label"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    Vue.createVNode(Vue.unref(elementPlus.ElFormItem), {
                      label: Vue.unref(t2)("setting.convertWebpTo")
                    }, {
                      default: Vue.withCtx(() => [
                        Vue.createVNode(Vue.unref(elementPlus.ElRadioGroup), {
                          modelValue: Vue.unref(writeableSettings).convertWebpTo,
                          "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => Vue.unref(writeableSettings).convertWebpTo = $event)
                        }, {
                          default: Vue.withCtx(() => [
                            Vue.createVNode(Vue.unref(elementPlus.ElRadio), { value: "" }, {
                              default: Vue.withCtx(() => [
                                Vue.createTextVNode(Vue.toDisplayString(Vue.unref(t2)("common.disabled")), 1)
                              ]),
                              _: 1
                            }),
                            Vue.createVNode(Vue.unref(elementPlus.ElRadio), {
                              value: Vue.unref(MIME).JPG
                            }, {
                              default: Vue.withCtx(() => [..._cache[31] || (_cache[31] = [
                                Vue.createTextVNode("jpg", -1)
                              ])]),
                              _: 1
                            }, 8, ["value"]),
                            Vue.createVNode(Vue.unref(elementPlus.ElRadio), {
                              value: Vue.unref(MIME).PNG
                            }, {
                              default: Vue.withCtx(() => [..._cache[32] || (_cache[32] = [
                                Vue.createTextVNode("png", -1)
                              ])]),
                              _: 1
                            }, 8, ["value"])
                          ]),
                          _: 1
                        }, 8, ["modelValue"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    Vue.unref(writeableSettings).convertWebpTo === Vue.unref(MIME).JPG ? (Vue.openBlock(), Vue.createBlock(Vue.unref(elementPlus.ElFormItem), {
                      key: 0,
                      label: `└ ${Vue.unref(t2)("setting.convertWebpQuality")} (0~100)`
                    }, {
                      default: Vue.withCtx(() => [
                        Vue.createVNode(Vue.unref(elementPlus.ElInputNumber), {
                          modelValue: Vue.unref(writeableSettings).convertWebpQuality,
                          "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => Vue.unref(writeableSettings).convertWebpQuality = $event),
                          size: "small",
                          min: 0,
                          max: 100,
                          "value-on-clear": Vue.unref(settingDefinitions).convertWebpQuality.default,
                          "step-strictly": true
                        }, null, 8, ["modelValue", "value-on-clear"])
                      ]),
                      _: 1
                    }, 8, ["label"])) : Vue.createCommentVNode("", true),
                    Vue.createVNode(Vue.unref(elementPlus.ElFormItem), {
                      label: Vue.unref(t2)("setting.removeAdPage")
                    }, {
                      default: Vue.withCtx(() => [
                        Vue.createVNode(Vue.unref(elementPlus.ElSwitch), {
                          modelValue: Vue.unref(writeableSettings).removeAdPage,
                          "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => Vue.unref(writeableSettings).removeAdPage = $event)
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    Vue.createVNode(Vue.unref(elementPlus.ElFormItem), {
                      label: Vue.unref(t2)("setting.autoCancelDownloadedManga")
                    }, {
                      default: Vue.withCtx(() => [
                        Vue.createVNode(Vue.unref(elementPlus.ElSwitch), {
                          modelValue: Vue.unref(writeableSettings).autoCancelDownloadedManga,
                          "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => Vue.unref(writeableSettings).autoCancelDownloadedManga = $event)
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    Vue.createVNode(Vue.unref(elementPlus.ElFormItem), {
                      label: Vue.unref(t2)("setting.autoRetryWhenErrorOccurs")
                    }, {
                      default: Vue.withCtx(() => [
                        Vue.createVNode(Vue.unref(elementPlus.ElSwitch), {
                          modelValue: Vue.unref(writeableSettings).autoRetryWhenErrorOccurs,
                          "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => Vue.unref(writeableSettings).autoRetryWhenErrorOccurs = $event)
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    Vue.createVNode(Vue.unref(elementPlus.ElFormItem), {
                      label: Vue.unref(t2)("setting.autoShowAll")
                    }, {
                      default: Vue.withCtx(() => [
                        Vue.createVNode(Vue.unref(elementPlus.ElSwitch), {
                          modelValue: Vue.unref(writeableSettings).autoShowAll,
                          "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => Vue.unref(writeableSettings).autoShowAll = $event)
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    Vue.createVNode(Vue.unref(elementPlus.ElFormItem), {
                      class: "refresh-required",
                      label: Vue.unref(t2)("setting.showIgnoreButton")
                    }, {
                      default: Vue.withCtx(() => [
                        Vue.createVNode(Vue.unref(elementPlus.ElSwitch), {
                          modelValue: Vue.unref(writeableSettings).showIgnoreButton,
                          "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => Vue.unref(writeableSettings).showIgnoreButton = $event)
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    Vue.createVNode(Vue.unref(elementPlus.ElFormItem), {
                      label: Vue.unref(t2)("setting.galleryContextmenuPreview")
                    }, {
                      default: Vue.withCtx(() => [
                        Vue.createVNode(Vue.unref(elementPlus.ElSwitch), {
                          modelValue: Vue.unref(writeableSettings).galleryContextmenuPreview,
                          "onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => Vue.unref(writeableSettings).galleryContextmenuPreview = $event)
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    Vue.createVNode(Vue.unref(elementPlus.ElFormItem), {
                      label: Vue.unref(t2)("setting.judgeDownloadedMangaByTitle")
                    }, {
                      default: Vue.withCtx(() => [
                        Vue.createVNode(Vue.unref(elementPlus.ElCheckbox), {
                          modelValue: Vue.unref(writeableSettings).judgeDownloadedByEnglish,
                          "onUpdate:modelValue": _cache[18] || (_cache[18] = ($event) => Vue.unref(writeableSettings).judgeDownloadedByEnglish = $event),
                          label: Vue.unref(t2)("common.english")
                        }, null, 8, ["modelValue", "label"]),
                        Vue.createVNode(Vue.unref(elementPlus.ElCheckbox), {
                          modelValue: Vue.unref(writeableSettings).judgeDownloadedByJapanese,
                          "onUpdate:modelValue": _cache[19] || (_cache[19] = ($event) => Vue.unref(writeableSettings).judgeDownloadedByJapanese = $event),
                          label: Vue.unref(t2)("common.japanese")
                        }, null, 8, ["modelValue", "label"]),
                        Vue.createVNode(Vue.unref(elementPlus.ElCheckbox), {
                          modelValue: Vue.unref(writeableSettings).judgeDownloadedByPretty,
                          "onUpdate:modelValue": _cache[20] || (_cache[20] = ($event) => Vue.unref(writeableSettings).judgeDownloadedByPretty = $event),
                          label: Vue.unref(t2)("common.pretty")
                        }, null, 8, ["modelValue", "label"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    Vue.createVNode(Vue.unref(elementPlus.ElFormItem), {
                      label: Vue.unref(t2)("setting.addMetaFile")
                    }, {
                      default: Vue.withCtx(() => [
                        Vue.createVNode(Vue.unref(elementPlus.ElCheckboxGroup), {
                          modelValue: Vue.unref(writeableSettings).addMetaFile,
                          "onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => Vue.unref(writeableSettings).addMetaFile = $event)
                        }, {
                          default: Vue.withCtx(() => [
                            Vue.createVNode(Vue.unref(elementPlus.ElCheckbox), {
                              label: "ComicInfo.xml",
                              value: "ComicInfoXml"
                            }),
                            Vue.createVNode(Vue.unref(elementPlus.ElCheckbox), {
                              label: "info.json (eze)",
                              value: "EzeInfoJson"
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    Vue.unref(writeableSettings).addMetaFile.includes("ComicInfoXml") ? (Vue.openBlock(), Vue.createBlock(Vue.unref(elementPlus.ElFormItem), {
                      key: 1,
                      label: `└ ${Vue.unref(t2)("setting.metaFileTitleLanguage")}`
                    }, {
                      default: Vue.withCtx(() => [
                        Vue.createVNode(Vue.unref(elementPlus.ElSelect), {
                          modelValue: Vue.unref(writeableSettings).metaFileTitleLanguage,
                          "onUpdate:modelValue": _cache[22] || (_cache[22] = ($event) => Vue.unref(writeableSettings).metaFileTitleLanguage = $event)
                        }, {
                          default: Vue.withCtx(() => [
                            Vue.createVNode(Vue.unref(elementPlus.ElOption), {
                              label: Vue.unref(t2)("common.english"),
                              value: "english"
                            }, null, 8, ["label"]),
                            Vue.createVNode(Vue.unref(elementPlus.ElOption), {
                              label: Vue.unref(t2)("common.japanese"),
                              value: "japanese"
                            }, null, 8, ["label"])
                          ]),
                          _: 1
                        }, 8, ["modelValue"])
                      ]),
                      _: 1
                    }, 8, ["label"])) : Vue.createCommentVNode("", true),
                    Vue.createVNode(Vue.unref(elementPlus.ElDivider), null, {
                      default: Vue.withCtx(() => [
                        Vue.createTextVNode(Vue.toDisplayString(Vue.unref(t2)("setting.advanceTitle")), 1)
                      ]),
                      _: 1
                    }),
                    Vue.unref(IS_NHENTAI) ? (Vue.openBlock(), Vue.createBlock(Vue.unref(elementPlus.ElFormItem), {
                      key: 2,
                      label: Vue.unref(t2)("setting.nHentaiDownloadHost")
                    }, {
                      default: Vue.withCtx(() => [
                        Vue.createVNode(Vue.unref(elementPlus.ElSelect), {
                          modelValue: Vue.unref(writeableSettings).nHentaiDownloadHost,
                          "onUpdate:modelValue": _cache[23] || (_cache[23] = ($event) => Vue.unref(writeableSettings).nHentaiDownloadHost = $event),
                          disabled: !!Vue.unref(writeableSettings).customDownloadUrl
                        }, {
                          default: Vue.withCtx(() => [
                            (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(Vue.unref(nHentaiDownloadHostSpecials), (value) => (Vue.openBlock(), Vue.createBlock(Vue.unref(elementPlus.ElOption), {
                              key: value,
                              label: Vue.unref(t2)(`setting.nHentaiDownloadHostOption.${value}`),
                              value
                            }, null, 8, ["label", "value"]))), 128)),
                            (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(Vue.unref(nHentaiDownloadHosts), (host) => (Vue.openBlock(), Vue.createBlock(Vue.unref(elementPlus.ElOption), {
                              key: host,
                              label: host,
                              value: host
                            }, null, 8, ["label", "value"]))), 128))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "disabled"])
                      ]),
                      _: 1
                    }, 8, ["label"])) : Vue.createCommentVNode("", true),
                    Vue.createVNode(Vue.unref(elementPlus.ElFormItem), {
                      label: Vue.unref(t2)("setting.customDownloadUrl")
                    }, {
                      default: Vue.withCtx(() => [
                        Vue.createVNode(Vue.unref(elementPlus.ElInput), {
                          modelValue: Vue.unref(writeableSettings).customDownloadUrl,
                          "onUpdate:modelValue": _cache[24] || (_cache[24] = ($event) => Vue.unref(writeableSettings).customDownloadUrl = $event)
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    Vue.createVNode(Vue.unref(elementPlus.ElFormItem), {
                      label: Vue.unref(t2)("setting.compressionStreamFiles")
                    }, {
                      default: Vue.withCtx(() => [
                        Vue.createVNode(Vue.unref(elementPlus.ElSwitch), {
                          modelValue: Vue.unref(writeableSettings).compressionStreamFiles,
                          "onUpdate:modelValue": _cache[25] || (_cache[25] = ($event) => Vue.unref(writeableSettings).compressionStreamFiles = $event)
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    Vue.createVNode(Vue.unref(elementPlus.ElFormItem), {
                      label: Vue.unref(t2)("setting.seriesMode")
                    }, {
                      default: Vue.withCtx(() => [
                        Vue.createVNode(Vue.unref(elementPlus.ElSwitch), {
                          modelValue: Vue.unref(writeableSettings).seriesMode,
                          "onUpdate:modelValue": _cache[26] || (_cache[26] = ($event) => Vue.unref(writeableSettings).seriesMode = $event)
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    Vue.createVNode(Vue.unref(elementPlus.ElFormItem), {
                      label: Vue.unref(t2)("setting.streamDownload")
                    }, {
                      default: Vue.withCtx(() => [
                        Vue.createVNode(Vue.unref(elementPlus.ElSwitch), {
                          modelValue: Vue.unref(writeableSettings).streamDownload,
                          "onUpdate:modelValue": _cache[27] || (_cache[27] = ($event) => Vue.unref(writeableSettings).streamDownload = $event),
                          disabled: Vue.unref(DISABLE_STREAM_DOWNLOAD)
                        }, null, 8, ["modelValue", "disabled"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    Vue.unref(IS_NHENTAI) ? (Vue.openBlock(), Vue.createBlock(Vue.unref(elementPlus.ElFormItem), {
                      key: 3,
                      class: "refresh-required",
                      label: Vue.unref(t2)("setting.preventConsoleClearing")
                    }, {
                      default: Vue.withCtx(() => [
                        Vue.createVNode(Vue.unref(elementPlus.ElSwitch), {
                          modelValue: Vue.unref(writeableSettings).preventConsoleClearing,
                          "onUpdate:modelValue": _cache[28] || (_cache[28] = ($event) => Vue.unref(writeableSettings).preventConsoleClearing = $event)
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                    }, 8, ["label"])) : Vue.createCommentVNode("", true),
                    Vue.createVNode(Vue.unref(elementPlus.ElCollapse), null, {
                      default: Vue.withCtx(() => [
                        Vue.createVNode(Vue.unref(elementPlus.ElCollapseItem), null, {
                          title: Vue.withCtx(() => [
                            Vue.createElementVNode("span", _hoisted_9, Vue.toDisplayString(Vue.unref(t2)("setting.titleReplacement")), 1)
                          ]),
                          default: Vue.withCtx(() => [
                            Vue.createVNode(Vue.unref(elementPlus.ElTable), {
                              id: "title-replacement-table",
                              data: Vue.unref(writeableSettings).titleReplacement
                            }, {
                              append: Vue.withCtx(() => [
                                Vue.createVNode(Vue.unref(elementPlus.ElButton), {
                                  text: "",
                                  style: { width: "100%" },
                                  onClick: addTitleReplacement
                                }, {
                                  default: Vue.withCtx(() => [..._cache[33] || (_cache[33] = [
                                    Vue.createTextVNode("+", -1)
                                  ])]),
                                  _: 1
                                })
                              ]),
                              default: Vue.withCtx(() => [
                                Vue.createVNode(Vue.unref(elementPlus.ElTableColumn), { label: "From" }, {
                                  default: Vue.withCtx((scope) => [
                                    Vue.createVNode(Vue.unref(elementPlus.ElInput), {
                                      modelValue: scope.row.from,
                                      "onUpdate:modelValue": ($event) => scope.row.from = $event
                                    }, {
                                      prefix: Vue.withCtx(() => [
                                        scope.row.regexp ? (Vue.openBlock(), Vue.createElementBlock("span", _hoisted_10, "/")) : Vue.createCommentVNode("", true)
                                      ]),
                                      suffix: Vue.withCtx(() => [
                                        scope.row.regexp ? (Vue.openBlock(), Vue.createElementBlock("span", _hoisted_11, "/")) : Vue.createCommentVNode("", true)
                                      ]),
                                      _: 2
                                    }, 1032, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                Vue.createVNode(Vue.unref(elementPlus.ElTableColumn), { label: "To" }, {
                                  default: Vue.withCtx((scope) => [
                                    Vue.createVNode(Vue.unref(elementPlus.ElInput), {
                                      modelValue: scope.row.to,
                                      "onUpdate:modelValue": ($event) => scope.row.to = $event
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                Vue.createVNode(Vue.unref(elementPlus.ElTableColumn), {
                                  label: "RegExp",
                                  width: "80"
                                }, {
                                  default: Vue.withCtx((scope) => [
                                    Vue.createVNode(Vue.unref(elementPlus.ElSwitch), {
                                      modelValue: scope.row.regexp,
                                      "onUpdate:modelValue": ($event) => scope.row.regexp = $event
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                Vue.createVNode(Vue.unref(elementPlus.ElTableColumn), { width: "70" }, {
                                  default: Vue.withCtx((scope) => [
                                    Vue.createVNode(_sfc_main$3, {
                                      onConfirm: () => delTitleReplacement(scope.$index)
                                    }, {
                                      default: Vue.withCtx(() => [
                                        Vue.createVNode(Vue.unref(elementPlus.ElButton), {
                                          type: "danger",
                                          icon: Vue.unref(delete_default)
                                        }, null, 8, ["icon"])
                                      ]),
                                      _: 1
                                    }, 8, ["onConfirm"])
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
                    Vue.createVNode(Vue.unref(elementPlus.ElFormItem), {
                      label: Vue.unref(t2)("setting.customFilenameFunction")
                    }, {
                      default: Vue.withCtx(() => [
                        Vue.createElementVNode("span", _hoisted_12, [
                          _cache[37] || (_cache[37] = Vue.createTextVNode("function (filename", -1)),
                          Vue.createVNode(Vue.unref(elementPlus.ElText), { type: "info" }, {
                            default: Vue.withCtx(() => [..._cache[34] || (_cache[34] = [
                              Vue.createTextVNode(": string", -1)
                            ])]),
                            _: 1
                          }),
                          _cache[38] || (_cache[38] = Vue.createTextVNode(", gallery", -1)),
                          Vue.createVNode(Vue.unref(elementPlus.ElText), { type: "info" }, {
                            default: Vue.withCtx(() => [
                              _cache[36] || (_cache[36] = Vue.createTextVNode(": ", -1)),
                              Vue.createVNode(Vue.unref(elementPlus.ElLink), {
                                type: "primary",
                                href: "https://github.com/Tsuk1ko/nhentai-helper/blob/df00acb0d5ad8244d408561410b3c647d5af7ed4/src/utils/nhentai.ts#L57-L75",
                                target: "_blank"
                              }, {
                                default: Vue.withCtx(() => [..._cache[35] || (_cache[35] = [
                                  Vue.createTextVNode("NHentaiGallery", -1)
                                ])]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          _cache[39] || (_cache[39] = Vue.createTextVNode(") {", -1))
                        ]),
                        Vue.createVNode(Vue.unref(elementPlus.ElInput), {
                          modelValue: Vue.unref(writeableSettings).customFilenameFunction,
                          "onUpdate:modelValue": _cache[29] || (_cache[29] = ($event) => Vue.unref(writeableSettings).customFilenameFunction = $event),
                          class: "monospace",
                          type: "textarea",
                          placeholder: "return filename;",
                          autosize: { minRows: 1 }
                        }, null, 8, ["modelValue"]),
                        _cache[40] || (_cache[40] = Vue.createElementVNode("span", { class: "monospace" }, "}", -1))
                      ]),
                      _: 1
                    }, 8, ["label"])
                  ]),
                  _: 1
                }),
                Vue.createVNode(Vue.unref(elementPlus.ElDivider), null, {
                  default: Vue.withCtx(() => [
                    Vue.createTextVNode(Vue.toDisplayString(Vue.unref(t2)("setting.history.title")), 1)
                  ]),
                  _: 1
                }),
                Vue.createElementVNode("p", _hoisted_13, Vue.toDisplayString(Vue.unref(t2)("setting.history.downloadedNumberTip", {
                  num: Number.isNaN(downloadedNum.value) ? downloadedNum.value : Vue.unref(numberFormatter).format(downloadedNum.value)
                })), 1),
                Vue.createVNode(Vue.unref(elementPlus.ElButton), {
                  type: "primary",
                  icon: Vue.unref(download_default),
                  disabled: !downloadedNum.value,
                  loading: exporting.value,
                  onClick: exportHistory
                }, {
                  default: Vue.withCtx(() => [
                    Vue.createTextVNode(Vue.toDisplayString(Vue.unref(t2)("setting.history.export")), 1)
                  ]),
                  _: 1
                }, 8, ["icon", "disabled", "loading"]),
                Vue.createVNode(Vue.unref(elementPlus.ElButton), {
                  type: "primary",
                  icon: Vue.unref(upload_default),
                  loading: importing.value,
                  onClick: importHistory
                }, {
                  default: Vue.withCtx(() => [
                    Vue.createTextVNode(Vue.toDisplayString(Vue.unref(t2)("setting.history.import")), 1)
                  ]),
                  _: 1
                }, 8, ["icon", "loading"]),
                Vue.createVNode(_sfc_main$3, { onConfirm: clearHistory }, {
                  default: Vue.withCtx(() => [
                    Vue.createVNode(Vue.unref(elementPlus.ElButton), {
                      type: "danger",
                      icon: Vue.unref(delete_default),
                      loading: clearing.value
                    }, {
                      default: Vue.withCtx(() => [
                        Vue.createTextVNode(Vue.toDisplayString(Vue.unref(t2)("setting.history.clear")), 1)
                      ]),
                      _: 1
                    }, 8, ["icon", "loading"])
                  ]),
                  _: 1
                }),
                Vue.createElementVNode("p", _hoisted_14, Vue.toDisplayString(Vue.unref(t2)("setting.history.importTip")), 1)
              ])
            ]),
            _: 1
          }, 8, ["modelValue"]));
        }
      }), SettingsDialog = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-6607043c"]]), resource$1 = {
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
        locale: settings.language,
        fallbackLocale: "en",
        messages: { en: resource$1, zh: resource }
      }), createAppAndMount = (component, appInitFunc) => {
        const el = document.createElement("div");
        document.body.append(el);
        const app = Vue.createApp(component);
        return appInitFunc?.(app), app.mount(el);
      }, compileTemplate = (tpl) => template(tpl, { interpolate: /\{\{([\s\S]+?)\}\}/g }), getDownloadExt = () => {
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
            addedNodes[0]?.id === "show-all-images-container" && (self2.disconnect(), resolve($(selector.showAllImagesButton)));
          });
        }).observe(container, { childList: true });
      }), createMangaDownloadInfo = (gallery, needReactive = false) => {
        const info = {
          gallery,
          done: 0,
          compressing: false,
          compressingPercent: "0",
          error: false
        };
        return needReactive ? (Vue.markRaw(info.gallery), Vue.reactive(info)) : info;
      }, tryParseJSON = (str) => {
        if (typeof str == "string")
          try {
            return JSON.parse(str);
          } catch {
          }
      };
      var noty$1 = { exports: {} };
      var noty = noty$1.exports, hasRequiredNoty;
      function requireNoty() {
        return hasRequiredNoty || (hasRequiredNoty = 1, (function(module2, exports$1) {
          (function(root2, factory) {
            module2.exports = factory();
          })(noty, function() {
            return (
              /******/
              (function(modules) {
                var installedModules = {};
                function __webpack_require__(moduleId) {
                  if (installedModules[moduleId])
                    return installedModules[moduleId].exports;
                  var module22 = installedModules[moduleId] = {
                    /******/
                    i: moduleId,
                    /******/
                    l: false,
                    /******/
                    exports: {}
                    /******/
                  };
                  return modules[moduleId].call(module22.exports, module22, module22.exports, __webpack_require__), module22.l = true, module22.exports;
                }
                return __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.i = function(value) {
                  return value;
                }, __webpack_require__.d = function(exports2, name, getter) {
                  __webpack_require__.o(exports2, name) || Object.defineProperty(exports2, name, {
                    /******/
                    configurable: false,
                    /******/
                    enumerable: true,
                    /******/
                    get: getter
                    /******/
                  });
                }, __webpack_require__.n = function(module22) {
                  var getter = module22 && module22.__esModule ? (
                    /******/
                    (function() {
                      return module22.default;
                    })
                  ) : (
                    /******/
                    (function() {
                      return module22;
                    })
                  );
                  return __webpack_require__.d(getter, "a", getter), getter;
                }, __webpack_require__.o = function(object, property2) {
                  return Object.prototype.hasOwnProperty.call(object, property2);
                }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 6);
              })([
                /* 0 */
                /***/
                (function(module22, exports2, __webpack_require__) {
                  Object.defineProperty(exports2, "__esModule", {
                    value: true
                  }), exports2.css = exports2.deepExtend = exports2.animationEndEvents = void 0;
                  var _typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(obj) {
                    return typeof obj;
                  } : function(obj) {
                    return obj && typeof Symbol == "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                  };
                  exports2.inArray = inArray, exports2.stopPropagation = stopPropagation, exports2.generateID = generateID, exports2.outerHeight = outerHeight, exports2.addListener = addListener, exports2.hasClass = hasClass, exports2.addClass = addClass, exports2.removeClass = removeClass, exports2.remove = remove, exports2.classList = classList, exports2.visibilityChangeFlow = visibilityChangeFlow, exports2.createAudioElements = createAudioElements;
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
                  exports2.animationEndEvents = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
                  function inArray(needle, haystack, argStrict) {
                    var key = void 0, strict = !!argStrict;
                    if (strict) {
                      for (key in haystack)
                        if (haystack.hasOwnProperty(key) && haystack[key] === needle)
                          return true;
                    } else
                      for (key in haystack)
                        if (haystack.hasOwnProperty(key) && haystack[key] === needle)
                          return true;
                    return false;
                  }
                  function stopPropagation(evt) {
                    evt = evt || window.event, typeof evt.stopPropagation < "u" ? evt.stopPropagation() : evt.cancelBubble = true;
                  }
                  exports2.deepExtend = function deepExtend2(out) {
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
                  exports2.css = /* @__PURE__ */ (function() {
                    var cssPrefixes = ["Webkit", "O", "Moz", "ms"], cssProps = {};
                    function camelCase(string) {
                      return string.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(match, letter) {
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
                  })();
                  function addListener(el, events, cb) {
                    var useCapture = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
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
                      API.PageHidden = true, handleVisibilityChange();
                    }
                    function onFocus() {
                      API.PageHidden = false, handleVisibilityChange();
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
                      }), ref2.barDom ? ref2.barDom.appendChild(audioElement) : document.querySelector("body").appendChild(audioElement), audioElement.volume = ref2.options.sounds.volume, ref2.soundPlayed || (audioElement.play(), ref2.soundPlayed = true), audioElement.onended = function() {
                        remove(audioElement);
                      };
                    }
                  }
                  function getExtension(fileName) {
                    return fileName.match(/\.([^.]+)$/)[1];
                  }
                }),
                /* 1 */
                /***/
                (function(module22, exports2, __webpack_require__) {
                  Object.defineProperty(exports2, "__esModule", {
                    value: true
                  }), exports2.Defaults = exports2.Store = exports2.Queues = exports2.DefaultMaxVisible = exports2.docTitle = exports2.DocModalCount = exports2.PageHidden = void 0, exports2.getQueueCounts = getQueueCounts, exports2.addToQueue = addToQueue, exports2.removeFromQueue = removeFromQueue, exports2.queueRender = queueRender, exports2.queueRenderAll = queueRenderAll, exports2.ghostFix = ghostFix, exports2.build = build, exports2.hasButtons = hasButtons, exports2.handleModal = handleModal, exports2.handleModalClose = handleModalClose, exports2.queueClose = queueClose, exports2.dequeueClose = dequeueClose, exports2.fire = fire, exports2.openFlow = openFlow, exports2.closeFlow = closeFlow;
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
                  exports2.PageHidden = false;
                  var DocModalCount = exports2.DocModalCount = 0, DocTitleProps = {
                    originalTitle: null,
                    count: 0,
                    changed: false
                  }, docTitle = exports2.docTitle = {
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
                      DocTitleProps.changed ? document.title = "(" + DocTitleProps.count + ") " + DocTitleProps.originalTitle : (DocTitleProps.originalTitle = title, document.title = "(" + DocTitleProps.count + ") " + title, DocTitleProps.changed = true);
                    },
                    _clear: function() {
                      DocTitleProps.changed && (DocTitleProps.count = 0, document.title = DocTitleProps.originalTitle, DocTitleProps.changed = false);
                    }
                  }, DefaultMaxVisible = exports2.DefaultMaxVisible = 5, Queues = exports2.Queues = {
                    global: {
                      maxVisible: DefaultMaxVisible,
                      queue: []
                    }
                  }, Store = exports2.Store = {};
                  exports2.Defaults = {
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
                    ref2.options.modal && (DocModalCount === 0 && createModal(), exports2.DocModalCount = DocModalCount += 1);
                  }
                  function handleModalClose(ref2) {
                    if (ref2.options.modal && DocModalCount > 0 && (exports2.DocModalCount = DocModalCount -= 1, DocModalCount <= 0)) {
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
                    delete Store[ref2.id], ref2.closing = false, fire(ref2, "afterClose"), Utils.remove(ref2.barDom), ref2.layoutDom.querySelectorAll(".noty_bar").length === 0 && !ref2.options.container && Utils.remove(ref2.layoutDom), (Utils.inArray("docVisible", ref2.options.titleCount.conditions) || Utils.inArray("docHidden", ref2.options.titleCount.conditions)) && docTitle.decrement(), queueRender(ref2.options.queue);
                  }
                }),
                /* 2 */
                /***/
                (function(module22, exports2, __webpack_require__) {
                  Object.defineProperty(exports2, "__esModule", {
                    value: true
                  }), exports2.NotyButton = void 0;
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
                  exports2.NotyButton = function NotyButton2(html, classes, cb) {
                    var _this = this, attributes = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
                    return _classCallCheck(this, NotyButton2), this.dom = document.createElement("button"), this.dom.innerHTML = html, this.id = attributes.id = attributes.id || Utils.generateID("button"), this.cb = cb, Object.keys(attributes).forEach(function(propertyName) {
                      _this.dom.setAttribute(propertyName, attributes[propertyName]);
                    }), Utils.addClass(this.dom, classes || "noty_btn"), this;
                  };
                }),
                /* 3 */
                /***/
                (function(module22, exports2, __webpack_require__) {
                  Object.defineProperty(exports2, "__esModule", {
                    value: true
                  });
                  var _createClass = /* @__PURE__ */ (function() {
                    function defineProperties(target, props) {
                      for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false, descriptor.configurable = true, "value" in descriptor && (descriptor.writable = true), Object.defineProperty(target, descriptor.key, descriptor);
                      }
                    }
                    return function(Constructor, protoProps, staticProps) {
                      return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor;
                    };
                  })();
                  function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor))
                      throw new TypeError("Cannot call a class as a function");
                  }
                  exports2.Push = (function() {
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
                        var result = false;
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
                          return false;
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
                          var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
                          try {
                            for (var _iterator = registrations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
                              var registration = _step.value;
                              registration.unregister(), self2.fire("onSubscriptionCancel");
                            }
                          } catch (err) {
                            _didIteratorError = true, _iteratorError = err;
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
                        var _this2 = this, userVisibleOnly = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true, self2 = this, current = this.getPermissionStatus(), cb = function(result) {
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
                  })();
                }),
                /* 4 */
                /***/
                (function(module22, exports2, __webpack_require__) {
                  (function(process2, global2) {
                    var require2;
                    (function(global22, factory) {
                      module22.exports = factory();
                    })(this, (function() {
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
                        return observer.observe(node, { characterData: true }), function() {
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
                        return _state ? (function() {
                          var callback = _arguments[_state - 1];
                          asap(function() {
                            return invokeCallback(_state, child, callback, parent._result);
                          });
                        })() : subscribe(parent, child, onFulfillment, onRejection), child;
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
                          var sealed = false, error = tryThen(then$$1, thenable, function(value) {
                            sealed || (sealed = true, thenable !== value ? resolve(promise2, value) : fulfill(promise2, value));
                          }, function(reason) {
                            sealed || (sealed = true, reject(promise2, reason));
                          }, "Settle: " + (promise2._label || " unknown promise"));
                          !sealed && error && (sealed = true, reject(promise2, error));
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
                          if (value = tryCatch(callback, detail), value === TRY_CATCH_ERROR ? (failed = true, error = value.error, value.error = null) : succeeded = true, promise === value) {
                            reject(promise, cannotReturnOwn());
                            return;
                          }
                        } else
                          value = detail, succeeded = true;
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
                    }));
                  }).call(exports2, __webpack_require__(7), __webpack_require__(8));
                }),
                /* 5 */
                /***/
                (function(module22, exports2) {
                }),
                /* 6 */
                /***/
                (function(module22, exports2, __webpack_require__) {
                  Object.defineProperty(exports2, "__esModule", {
                    value: true
                  });
                  var _createClass = /* @__PURE__ */ (function() {
                    function defineProperties(target, props) {
                      for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false, descriptor.configurable = true, "value" in descriptor && (descriptor.writable = true), Object.defineProperty(target, descriptor.key, descriptor);
                      }
                    }
                    return function(Constructor, protoProps, staticProps) {
                      return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor;
                    };
                  })();
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
                  var Noty2 = (function() {
                    function Noty22() {
                      var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                      return _classCallCheck(this, Noty22), this.options = Utils.deepExtend({}, API.Defaults, options), this.id = this.options.id || Utils.generateID("bar"), this.closeTimer = -1, this.barDom = null, this.layoutDom = null, this.progressDom = null, this.showing = false, this.shown = false, this.closed = false, this.closing = false, this.killable = this.options.timeout || this.options.closeWith.length > 0, this.hasSound = this.options.sounds.sources.length > 0, this.soundPlayed = false, this.listeners = {
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
                        this.options.killer === true ? Noty22.closeAll() : typeof this.options.killer == "string" && Noty22.closeAll(this.options.killer);
                        var queueCounts = API.getQueueCounts(this.options.queue);
                        if (queueCounts.current >= queueCounts.maxVisible || API.PageHidden && this.options.visibilityControl)
                          return API.addToQueue(this), API.PageHidden && this.hasSound && Utils.inArray("docHidden", this.options.sounds.conditions) && Utils.createAudioElements(this), API.PageHidden && Utils.inArray("docHidden", this.options.titleCount.conditions) && API.docTitle.increment(), this;
                        if (API.Store[this.id] = this, API.fire(this, "beforeShow"), this.showing = true, this.closing)
                          return this.showing = false, this;
                        if (API.build(this), API.handleModal(this), this.options.force ? this.layoutDom.insertBefore(this.barDom, this.layoutDom.firstChild) : this.layoutDom.appendChild(this.barDom), this.hasSound && !this.soundPlayed && Utils.inArray("docVisible", this.options.sounds.conditions) && Utils.createAudioElements(this), Utils.inArray("docVisible", this.options.titleCount.conditions) && API.docTitle.increment(), this.shown = true, this.closed = false, API.hasButtons(this) && Object.keys(this.options.buttons).forEach(function(key) {
                          var btn = _this.barDom.querySelector("#" + _this.options.buttons[key].id);
                          Utils.addListener(btn, "click", function(e) {
                            Utils.stopPropagation(e), _this.options.buttons[key].cb();
                          });
                        }), this.progressDom = this.barDom.querySelector(".noty_progressbar"), Utils.inArray("click", this.options.closeWith) && (Utils.addClass(this.barDom, "noty_close_with_click"), Utils.addListener(this.barDom, "click", function(e) {
                          Utils.stopPropagation(e), API.fire(_this, "onClick"), _this.close();
                        }, false)), Utils.addListener(this.barDom, "mouseenter", function() {
                          API.fire(_this, "onHover");
                        }, false), this.options.timeout && Utils.addClass(this.barDom, "noty_has_timeout"), this.options.progressBar && Utils.addClass(this.barDom, "noty_has_progressbar"), Utils.inArray("button", this.options.closeWith)) {
                          Utils.addClass(this.barDom, "noty_close_with_button");
                          var closeButton = document.createElement("div");
                          Utils.addClass(closeButton, "noty_close_button"), closeButton.innerHTML = "×", this.barDom.appendChild(closeButton), Utils.addListener(closeButton, "click", function(e) {
                            Utils.stopPropagation(e), _this.close();
                          }, false);
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
                      value: (function(_setTimeout) {
                        function setTimeout2(_x) {
                          return _setTimeout.apply(this, arguments);
                        }
                        return setTimeout2.toString = function() {
                          return _setTimeout.toString();
                        }, setTimeout2;
                      })(function(ms) {
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
                        var optionsOverride = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
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
                        var _this2 = this, optionsOverride = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
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
                        var _this3 = this, optionsOverride = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
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
                        return this.closed ? this : this.shown ? (API.fire(this, "onClose"), this.closing = true, this.options.animation.close === null ? this.promises.close = new _es6Promise2.default(function(resolve) {
                          resolve();
                        }) : typeof this.options.animation.close == "function" ? this.promises.close = new _es6Promise2.default(this.options.animation.close.bind(this)) : (Utils.addClass(this.barDom, this.options.animation.close), this.promises.close = new _es6Promise2.default(function(resolve) {
                          Utils.addListener(_this4.barDom, Utils.animationEndEvents, function() {
                            _this4.options.force ? Utils.remove(_this4.barDom) : API.ghostFix(_this4), resolve();
                          });
                        })), this.promises.close.then(function() {
                          API.closeFlow(_this4), API.handleModalClose(_this4);
                        }), this.closed = true, this) : (API.removeFromQueue(this), this);
                      }
                      // API functions
                      /**
                       * @param {boolean|string} queueName
                       * @return {Noty}
                       */
                    }], [{
                      key: "closeAll",
                      value: function() {
                        var queueName = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
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
                  })();
                  exports2.default = Noty2, Utils.visibilityChangeFlow(), module22.exports = exports2.default;
                }),
                /* 7 */
                /***/
                (function(module22, exports2) {
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
                  var queue = [], draining = false, currentQueue, queueIndex = -1;
                  function cleanUpNextTick() {
                    !draining || !currentQueue || (draining = false, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, queue.length && drainQueue());
                  }
                  function drainQueue() {
                    if (!draining) {
                      var timeout = runTimeout(cleanUpNextTick);
                      draining = true;
                      for (var len = queue.length; len; ) {
                        for (currentQueue = queue, queue = []; ++queueIndex < len; )
                          currentQueue && currentQueue[queueIndex].run();
                        queueIndex = -1, len = queue.length;
                      }
                      currentQueue = null, draining = false, runClearTimeout(timeout);
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
                  }, process2.title = "browser", process2.browser = true, process2.env = {}, process2.argv = [], process2.version = "", process2.versions = {};
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
                }),
                /* 8 */
                /***/
                (function(module22, exports2) {
                  var g;
                  g = /* @__PURE__ */ (function() {
                    return this;
                  })();
                  try {
                    g = g || Function("return this")() || (0, eval)("this");
                  } catch {
                    typeof window == "object" && (g = window);
                  }
                  module22.exports = g;
                }),
                /* 9 */
                /***/
                (function(module22, exports2) {
                })
                /******/
              ])
            );
          });
        })(noty$1)), noty$1.exports;
      }
      var notyExports = requireNoty();
      const Noty = /* @__PURE__ */ getDefaultExportFromCjs(notyExports), { t: t$3 } = i18n.global, notyConfirmOption = {
        type: "error",
        layout: "bottomRight",
        theme: "nest",
        timeout: false,
        closeWith: []
      }, downloadAgainConfirm = async (title, hasQueue = false) => hasQueue && settings.autoCancelDownloadedManga ? (downloadedTip(title), false) : new Promise((resolve) => {
        const n = new Noty({
          ...notyConfirmOption,
          text: t$3("dialog.downloadAgainConfirm", { title, hasQueue }),
          buttons: [
            Noty.button(t$3("dialog.yes"), "btn btn-noty-blue btn-noty", () => {
              n.close(), resolve(true);
            }),
            Noty.button(t$3("dialog.no"), "btn btn-noty-green btn-noty", () => {
              n.close(), resolve(false);
            })
          ]
        });
        n.show();
      }), errorRetryConfirm = (action, noCb, yesCb) => {
        if (settings.autoRetryWhenErrorOccurs) {
          errorRetryTip(action), yesCb?.();
          return;
        }
        const n = new Noty({
          ...notyConfirmOption,
          text: t$3("dialog.errorRetryConfirm", { action }),
          buttons: [
            Noty.button(t$3("dialog.no"), "btn btn-noty-blue btn-noty", () => {
              n.close(), noCb?.();
            }),
            Noty.button(t$3("dialog.yes"), "btn btn-noty-green btn-noty", () => {
              n.close(), yesCb?.();
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
        return hasRequiredStreamSaver || (hasRequiredStreamSaver = 1, (function(module2) {
          ((name, definition) => {
            module2.exports = definition();
          })("streamSaver", () => {
            const global2 = typeof window == "object" ? window : this;
            global2.HTMLElement || console.warn("streamsaver is meant to run on browsers main thread");
            let mitmTransporter = null, supportsTransferable = false;
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
              supported: true,
              version: { full: "2.0.5", major: 2, minor: 0, dot: 5 },
              mitm: "https://jimmywarting.github.io/StreamSaver.js/mitm.html?version=2.0.0"
            };
            function makeIframe(src) {
              if (!src) throw new Error("meh");
              const iframe = document.createElement("iframe");
              return iframe.hidden = true, iframe.src = src, iframe.loaded = false, iframe.name = "iframe", iframe.isIframe = true, iframe.postMessage = (...args) => iframe.contentWindow.postMessage(...args), iframe.addEventListener("load", () => {
                iframe.loaded = true;
              }, { once: true }), document.body.appendChild(iframe), iframe;
            }
            function makePopup(src) {
              const options = "width=200,height=100", delegate = document.createDocumentFragment(), popup = {
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
              }, onReady = (evt) => {
                evt.source === popup.frame && (popup.loaded = true, global2.removeEventListener("message", onReady), popup.dispatchEvent(new Event("load")));
              };
              return global2.addEventListener("message", onReady), popup;
            }
            try {
              new Response(new ReadableStream()), isSecureContext && !("serviceWorker" in navigator) && (useBlobFallback = !0);
            } catch {
              useBlobFallback = true;
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
                }, { once: true });
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
        })(StreamSaver)), StreamSaver.exports;
      }
      var StreamSaverExports = requireStreamSaver();
      const jsContent = '(function(){"use strict";const M=Symbol("Comlink.proxy"),N=Symbol("Comlink.endpoint"),H=Symbol("Comlink.releaseProxy"),x=Symbol("Comlink.finalizer"),d=Symbol("Comlink.thrown"),S=e=>typeof e=="object"&&e!==null||typeof e=="function",I={canHandle:e=>S(e)&&e[M],serialize(e){const{port1:t,port2:r}=new MessageChannel;return P(e,t),[r,[r]]},deserialize(e){return e.start(),_(e)}},L={canHandle:e=>S(e)&&d in e,serialize({value:e}){let t;return e instanceof Error?t={isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:t={isError:!1,value:e},[t,[]]},deserialize(e){throw e.isError?Object.assign(new Error(e.value.message),e.value):e.value}},T=new Map([["proxy",I],["throw",L]]);function V(e,t){for(const r of e)if(t===r||r==="*"||r instanceof RegExp&&r.test(t))return!0;return!1}function P(e,t=globalThis,r=["*"]){t.addEventListener("message",function c(n){if(!n||!n.data)return;if(!V(r,n.origin)){console.warn(`Invalid origin \'${n.origin}\' for comlink proxy`);return}const{id:s,type:y,path:l}=Object.assign({path:[]},n.data),u=(n.data.argumentList||[]).map(g);let a;try{const o=l.slice(0,-1).reduce((i,w)=>i[w],e),f=l.reduce((i,w)=>i[w],e);switch(y){case"GET":a=f;break;case"SET":o[l.slice(-1)[0]]=g(n.data.value),a=!0;break;case"APPLY":a=f.apply(o,u);break;case"CONSTRUCT":{const i=new f(...u);a=B(i)}break;case"ENDPOINT":{const{port1:i,port2:w}=new MessageChannel;P(e,w),a=z(i,[i])}break;case"RELEASE":a=void 0;break;default:return}}catch(o){a={value:o,[d]:0}}Promise.resolve(a).catch(o=>({value:o,[d]:0})).then(o=>{const[f,i]=p(o);t.postMessage(Object.assign(Object.assign({},f),{id:s}),i),y==="RELEASE"&&(t.removeEventListener("message",c),C(t),x in e&&typeof e[x]=="function"&&e[x]())}).catch(o=>{const[f,i]=p({value:new TypeError("Unserializable return value"),[d]:0});t.postMessage(Object.assign(Object.assign({},f),{id:s}),i)})}),t.start&&t.start()}function W(e){return e.constructor.name==="MessagePort"}function C(e){W(e)&&e.close()}function _(e,t){const r=new Map;return e.addEventListener("message",function(c){const{data:n}=c;if(!n||!n.id)return;const s=r.get(n.id);if(s)try{s(n)}finally{r.delete(n.id)}}),k(e,r,[],t)}function b(e){if(e)throw new Error("Proxy has been released and is not useable")}function A(e){return m(e,new Map,{type:"RELEASE"}).then(()=>{C(e)})}const h=new WeakMap,E="FinalizationRegistry"in globalThis&&new FinalizationRegistry(e=>{const t=(h.get(e)||0)-1;h.set(e,t),t===0&&A(e)});function F(e,t){const r=(h.get(t)||0)+1;h.set(t,r),E&&E.register(e,t,e)}function j(e){E&&E.unregister(e)}function k(e,t,r=[],c=function(){}){let n=!1;const s=new Proxy(c,{get(y,l){if(b(n),l===H)return()=>{j(s),A(e),t.clear(),n=!0};if(l==="then"){if(r.length===0)return{then:()=>s};const u=m(e,t,{type:"GET",path:r.map(a=>a.toString())}).then(g);return u.then.bind(u)}return k(e,t,[...r,l])},set(y,l,u){b(n);const[a,o]=p(u);return m(e,t,{type:"SET",path:[...r,l].map(f=>f.toString()),value:a},o).then(g)},apply(y,l,u){b(n);const a=r[r.length-1];if(a===N)return m(e,t,{type:"ENDPOINT"}).then(g);if(a==="bind")return k(e,t,r.slice(0,-1));const[o,f]=O(u);return m(e,t,{type:"APPLY",path:r.map(i=>i.toString()),argumentList:o},f).then(g)},construct(y,l){b(n);const[u,a]=O(l);return m(e,t,{type:"CONSTRUCT",path:r.map(o=>o.toString()),argumentList:u},a).then(g)}});return F(s,e),s}function v(e){return Array.prototype.concat.apply([],e)}function O(e){const t=e.map(p);return[t.map(r=>r[0]),v(t.map(r=>r[1]))]}const R=new WeakMap;function z(e,t){return R.set(e,t),e}function B(e){return Object.assign(e,{[M]:!0})}function p(e){for(const[t,r]of T)if(r.canHandle(e)){const[c,n]=r.serialize(e);return[{type:"HANDLER",name:t,value:c},n]}return[{type:"RAW",value:e},R.get(e)||[]]}function g(e){switch(e.type){case"HANDLER":return T.get(e.name).deserialize(e.value);case"RAW":return e.value}}function m(e,t,r,c){return new Promise(n=>{const s=D();t.set(s,n),e.start&&e.start(),e.postMessage(Object.assign({id:s},r),c)})}function D(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}P({convertWebpTo:async(e,t,r)=>{const c=await createImageBitmap(new Blob([e],{type:"image/webp"})),n=new OffscreenCanvas(c.width,c.height);n.getContext("bitmaprenderer").transferFromImageBitmap(c);const s=await(await n.convertToBlob({type:t,quality:r})).arrayBuffer();return z({buffer:s,type:t},[s])}})})();\n', blob = typeof self < "u" && self.Blob && new Blob(["(self.URL || self.webkitURL).revokeObjectURL(self.location.href);", jsContent], { type: "text/javascript;charset=utf-8" });
      function WorkerWrapper(options) {
        let objURL;
        try {
          if (objURL = blob && (self.URL || self.webkitURL).createObjectURL(blob), !objURL) throw "";
          const worker = new Worker(objURL, {
            name: options?.name
          });
          return worker.addEventListener("error", () => {
            (self.URL || self.webkitURL).revokeObjectURL(objURL);
          }), worker;
        } catch {
          return new Worker(
            "data:text/javascript;charset=utf-8," + encodeURIComponent(jsContent),
            {
              name: options?.name
            }
          );
        }
      }
      const mimeToExt = {
        [MIME.JPG]: "jpg",
        [MIME.PNG]: "png"
      };
      class ImgConverter {
        #worker;
        async convertWebpTo(...args) {
          const worker = await this.getWorker(), { buffer, type } = await worker.convertWebpTo(...args);
          return {
            buffer,
            ext: mimeToExt[type] || "unknown"
          };
        }
        async getWorker() {
          return this.#worker || (this.#worker = this.createWorker()), this.#worker;
        }
        async createWorker() {
          return wrap(new WorkerWrapper());
        }
      }
      let textareaEl;
      const encodeHtml = (text) => {
        textareaEl || (textareaEl = document.createElement("textarea")), textareaEl.textContent = text;
        const encodedText = textareaEl.innerHTML;
        return textareaEl.innerHTML = "", encodedText;
      }, encodeXml = (text) => encodeHtml(text).replace(/&nbsp;/g, " "), langMap = {
        chinese: "zh",
        english: "en",
        japanese: "ja"
      };
      class ComicInfoXmlBuilder {
        serializer = new XMLSerializer();
        doc = document.implementation.createDocument(null, "ComicInfo");
        constructor(info) {
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
          const getTags = (type) => info.tags.filter((t2) => t2.type === type), artistTags = getTags("artist");
          artistTags.length && this.appendElement("Writer", map(artistTags, "name").join(", "));
          const tags = getTags("tag");
          tags.length && this.appendElement("Tags", map(tags, "name").join(", ")), this.appendElement("Web", `${location.origin}/g/${info.gid}`), this.appendElement("PageCount", info.pages.length);
          const languageTag = info.tags.find(({ type, name }) => type === "language" && name in langMap);
          languageTag && this.appendElement("LanguageISO", langMap[languageTag.name]), this.appendElement("Format", /\[digital\]/i.test(info.title.english) ? "Digital" : "TBP"), this.appendElement("Manga", "Yes");
          const characterTags = getTags("character");
          characterTags.length && this.appendElement("Characters", map(characterTags, "name").join(", "));
          const pagesEl = this.createElement("Pages"), pageEls = info.pages.map(
            ({ i, w, h: h2 }) => this.createElement("Page", void 0, { Image: i, ImageWidth: w, ImageHeight: h2 })
          );
          pagesEl.append(...pageEls), this.root.append(pagesEl);
        }
        get root() {
          return this.doc.documentElement;
        }
        build() {
          return `<?xml version="1.0" encoding="utf-8"?>
${this.serializer.serializeToString(this.doc)}`;
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
        data;
        constructor(info) {
          const date = info.uploadDate ? new Date(info.uploadDate * 1e3) : void 0;
          this.data = {
            gallery_info: {
              title: info.title.english,
              title_title_original: info.title.japanese,
              link: `${location.origin}/g/${info.gid}`,
              category: info.tags.find(({ type }) => type === "category")?.name,
              tags: mapValues(groupBy(info.tags, "type"), (tags) => map(tags, "name")),
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
          let language, translated = false;
          return info.tags.filter(({ type }) => type === "language").forEach(({ name }) => {
            if (name === "translated") {
              translated = true;
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
      };
      class MultiThread {
        constructor(tasks, taskFunc, params) {
          this.tasks = tasks, this.taskFunc = taskFunc, this.params = params;
        }
        threads = [];
        taskIndex = 0;
        started = false;
        aborted = false;
        start() {
          if (this.started) throw new Error("Multi-thread started.");
          this.started = true;
          for (let threadId = 0; threadId < settings.threadNum; threadId++)
            this.threads.push(this.startThread(threadId));
          return {
            abort: () => {
              this.aborted = true, this.threads.forEach(({ abort }) => abort());
            },
            promise: Promise.all(this.threads.map(({ promise }) => promise)).then()
          };
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
            abort: () => abortFunc?.(),
            promise: threadPromise
          };
        }
      }
      class Counter {
        key;
        countMap;
        countKeys;
        blackList = /* @__PURE__ */ new Set();
        constructor(keys2) {
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
          super(), this.maxSize = maxSize;
        }
        order = [];
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
                  const additionRetry = status === 404 ? on404?.(r.finalUrl) : !1;
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
          abort: () => abortFunc?.(),
          dataPromise
        };
      }, fetchText = (url) => fetch(url).then((r) => r.text()), fetchJSON = (url) => fetch(url).then((r) => r.json()), PROTOCOL_REGEXP = /^https?:\/\//, ensureProtocol = (url) => PROTOCOL_REGEXP.test(url) ? url : url.startsWith("//") ? `${location.protocol}${url}` : `${location.protocol}//${url}`;
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
      }, getMediaDownloadUrl = (mid, filename) => `https://${getNHentaiDownloadHost(mid)}/galleries/${mid}/${filename}`, getMediaDownloadUrlByWebpage = async (gid, mid, filename) => (await getCompliedMediaUrlTemplate(gid))({ mid, filename }), getGalleryFromApi = (gid) => {
        const url = `https://nhentai.net/api/gallery/${gid}`;
        return fetchJSON(url);
      }, fixGalleryObj = (gallery, gid) => (gid && (gallery.id = Number(gid)), Array.isArray(gallery.images.pages) || (gallery.images.pages = Object.values(gallery.images.pages)), gallery), getGalleryFromWebpage = async (gid) => {
        let doc = document;
        if (!IS_PAGE_MANGA_DETAIL) {
          const html = await fetchText(`/g/${gid}`);
          doc = new DOMParser().parseFromString(html, "text/html");
        }
        const match = /gallery(\(\{[\s\S]+\}\));/.exec(doc.body.innerHTML)?.[1];
        if (match)
          try {
            const gallery = (0, eval)(match);
            return logger.log("get gallery by script tag success"), fixGalleryObj(gallery, gid);
          } catch {
            logger.warn("get gallery by script tag failed");
          }
        const $doc = $(doc.body), english = $doc.find(selector.englishTitle).text(), japanese = $doc.find(selector.japaneseTitle).text(), pages = [];
        let mediaId = "";
        const xxxPageMatch = tryParseJSON(/'(\{"fl":\{"1":"[^']+)'/.exec(doc.body.innerHTML)?.[1]);
        if (xxxPageMatch) {
          const img = $doc.find(selector.thumbnailContainerImage)[0], src = img.dataset.src ?? img.src, match2 = /\/([0-9a-z]+)\/\d+t?\.[^/]+$/i.exec(src);
          match2 && (mediaId = match2[1]), forEach(xxxPageMatch.fl, (data, index) => {
            const [type, width, height] = data.split(",");
            pages[Number(index) - 1] = {
              t: type,
              w: width ? Number(width) : void 0,
              h: height ? Number(height) : void 0
            };
          });
        } else
          $doc.find(selector.thumbnailContainerImage).each((i, img) => {
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
          });
        if (!english && !japanese || !mediaId || !pages.length)
          throw new Error("Get gallery info error.");
        const getTags = (type, elContains) => {
          const $tags = $doc.find(selector.tag(elContains));
          return filter(
            Array.from($tags).map((el) => {
              if (!(el instanceof HTMLElement)) return;
              const name = el.querySelector(selector.tagName)?.textContent.trim(), countStr = el.querySelector(selector.tagCount)?.textContent.trim(), count = countStr ? parseInt(countStr) * (countStr.match(/k$/i) ? 1e3 : 1) : void 0;
              return name ? {
                type,
                name,
                url: el.getAttribute("href") || void 0,
                count
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
      }, getCFNameArtists = (tags) => {
        const artists = map(
          tags.filter(({ name, type }) => type === "artist" && name),
          "name"
        );
        if (!artists.length) return "none";
        const maxNum = settings.filenameMaxArtistsNumber;
        return maxNum && artists.length > maxNum ? "various" : artists.join(settings.filenameArtistsSeparator);
      }, galleryCache = new OrderCache(100), getGallery = async (gid) => {
        gid = String(gid);
        const cached = galleryCache.get(gid);
        if (cached) return cached;
        const gallery = IS_NHENTAI ? await getGalleryFromApi(gid) : await getGalleryFromWebpage(gid);
        return galleryCache.set(gid, gallery), gallery;
      }, getGalleryInfo = async (gid) => {
        const gallery = await (async () => {
          if (gid) return getGallery(gid);
          const gidFromUrl = /^\/g\/(\d+)/.exec(location.pathname)?.[1], localGallery = _unsafeWindow._gallery ?? _unsafeWindow.gallery;
          if (localGallery) return fixGalleryObj(localGallery, gidFromUrl);
          if (gidFromUrl) return getGallery(gidFromUrl);
          throw new Error("Cannot get gallery info.");
        })(), {
          id,
          media_id,
          title,
          images: { pages },
          num_pages,
          tags,
          upload_date
        } = gallery, { english, japanese, pretty } = title, infoPages = pages.map(({ t: t2, w, h: h2 }, i) => ({ i: i + 1, t: NHentaiImgExt[t2], w, h: h2 })), info = {
          gid: id,
          mid: media_id,
          title,
          pages: infoPages,
          cfName: removeIllegalFilenameChars(
            compileTemplate(settings.compressionFilename)({
              english: applyTitleReplacement(english || japanese),
              japanese: applyTitleReplacement(japanese || english),
              pretty: applyTitleReplacement(pretty || english || japanese),
              id,
              pages: num_pages,
              artist: getCFNameArtists(tags)
            })
          ),
          tags,
          uploadDate: upload_date,
          gallery
        };
        return logger.log("info", info), info;
      }, fetchMediaUrlTemplate = async (gid) => {
        const onlineViewUrl = document.querySelector(selector.galleryHref)?.getAttribute("href")?.replace(/\/+$/, "").replace(/\d+$/, gid).concat("/1") ?? document.querySelector(selector.thumbnailHref)?.getAttribute("href");
        if (!onlineViewUrl)
          throw new Error("get media url failed: cannot find a gallery");
        logger.log(`fetching media url template by ${onlineViewUrl}`);
        const onlineViewHtml = await fetchText(onlineViewUrl), $img = loadHTML(onlineViewHtml).find(selector.mediaImage), imgSrc = $img.attr("data-src") || $img.attr("src");
        if (!imgSrc)
          throw new Error("get media url failed: cannot find an image src");
        const template2 = ensureProtocol(
          imgSrc.replace(/\/[0-9a-z]+\/\d+\.[^/]+$/i, "/{{mid}}/{{filename}}")
        );
        return MEDIA_URL_TEMPLATE_MAY_CHANGE || _GM_setValue(MEDIA_URL_TEMPLATE_KEY, template2), template2;
      }, fetchThumbMediaUrlTemplate = async (gid) => {
        const detailUrl = document.querySelector(selector.galleryHref)?.getAttribute("href")?.replace(/\d+(\/)?$/, `${gid}$1`);
        if (!detailUrl)
          throw new Error("get detail url failed: cannot find a gallery");
        logger.log(`fetching thumb media url template by ${detailUrl}`);
        const detailHtml = await fetchText(detailUrl), $img = loadHTML(detailHtml).find(selector.thumbnailContainerImage), imgSrc = $img.attr("data-src") || $img.attr("src");
        if (!imgSrc)
          throw new Error("get thumb media url failed: cannot find an image src");
        const template2 = ensureProtocol(
          imgSrc.replace(/\/[0-9a-z]+\/\d+t\.[^/]+$/i, "/{{mid}}/{{filename}}")
        );
        return _GM_setValue(THUMB_MEDIA_URL_TEMPLATE_KEY, template2), template2;
      }, mediaUrlTemplateGidCache = {}, getMediaUrlTemplate = async (getter, cacheKey, gid) => {
        if (MEDIA_URL_TEMPLATE_MAY_CHANGE && (mediaUrlTemplateGidCache[cacheKey] || (mediaUrlTemplateGidCache[cacheKey] = /* @__PURE__ */ new Map()), mediaUrlTemplateGidCache[cacheKey].has(gid)))
          return mediaUrlTemplateGidCache[cacheKey].get(gid);
        try {
          const promise = getter(gid);
          MEDIA_URL_TEMPLATE_MAY_CHANGE && !mediaUrlTemplateGidCache[cacheKey].has(gid) && mediaUrlTemplateGidCache[cacheKey].set(gid, promise);
          const template2 = await promise;
          return logger.log(`use media url template: ${template2}`), template2;
        } catch (error) {
          if (logger.error(error), MEDIA_URL_TEMPLATE_MAY_CHANGE)
            mediaUrlTemplateGidCache[cacheKey].delete(gid);
          else {
            const cachedTemplate = _GM_getValue(cacheKey);
            if (cachedTemplate)
              return logger.warn(`try to use cached media url template: ${cachedTemplate}`), cachedTemplate;
          }
          throw error;
        }
      }, getCompliedMediaUrlTemplate = (MEDIA_URL_TEMPLATE_MAY_CHANGE ? identity : once)(
        async (gid) => compileTemplate(await getMediaUrlTemplate(fetchMediaUrlTemplate, MEDIA_URL_TEMPLATE_KEY, gid))
      ), getCompliedThumbMediaUrlTemplate = (MEDIA_URL_TEMPLATE_MAY_CHANGE ? identity : once)(
        async (gid) => compileTemplate(
          IS_NHENTAI ? "https://t3.nhentai.net/galleries/{{mid}}/{{filename}}" : await getMediaUrlTemplate(fetchThumbMediaUrlTemplate, THUMB_MEDIA_URL_TEMPLATE_KEY, gid)
        )
      ), applyTitleReplacement = (title) => validTitleReplacement.value.length ? validTitleReplacement.value.reduce((pre, { from, to, regexp }) => {
        try {
          return pre.replaceAll(regexp ? new RegExp(from, "g") : from, to);
        } catch {
          return pre;
        }
      }, title) : title, imgConverter = new ImgConverter(), downloadGalleryByInfo = async (info, { progressDisplayController, rangeCheckers } = {}) => {
        info.done = 0;
        let { mid, pages, cfName } = info.gallery;
        if (customFilenameFunction.value) {
          const result = customFilenameFunction.value(cfName, info.gallery.gallery);
          if (typeof result != "string" || !result.trim())
            throw new Error(`Custom filename function illegal result: ${result}`);
          cfName = removeIllegalFilenameChars(result);
        }
        rangeCheckers?.length && (pages = pages.filter(({ i }) => rangeCheckers.some((check) => check(i))));
        let aborted = false;
        info.cancel = () => {
          aborted = true, progressDisplayController?.reset();
        }, progressDisplayController?.bindInfo(info), progressDisplayController?.updateProgress();
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
            throw info.error = true, urlGetterError && urlGetterError instanceof Error ? urlGetterError : new Error("No available url");
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
              info.done++, progressDisplayController?.updateProgress();
            }).catch((e) => {
              if (!isAbortError(e))
                throw info.error = true, e;
            }).finally(() => {
              usedCounterKeys.length && usedCounterKeys.forEach((key) => {
                nHentaiDownloadHostCounter.del(key);
              });
            })
          };
        }, multiThread = new MultiThread(pages, downloadTask, {
          filenameLength: settings.filenameLength === "auto" ? Math.ceil(Math.log10(Math.max(...pages.map(({ i }) => Number(i))))) : settings.filenameLength,
          customDownloadUrl: settings.customDownloadUrl
        }), { abort, promise } = multiThread.start();
        if (info.cancel = () => {
          aborted = true, abort(), progressDisplayController?.reset();
        }, aborted || await promise, !aborted)
          return async () => {
            info.compressing = true, progressDisplayController?.updateProgress(), logger.log("start compressing", cfName);
            let lastZipFile = "";
            const onCompressionUpdate = ({ workerId, percent, currentFile }) => {
              lastZipFile !== currentFile && currentFile && (lastZipFile = currentFile, logger.log(`[${workerId}] compressing ${percent.toFixed(2)}%`, currentFile)), info.compressingPercent = percent.toFixed(2), progressDisplayController?.updateProgress();
            };
            if (settings.streamDownload) {
              logger.log("stream mode on");
              const fileStream = StreamSaverExports.createWriteStream(cfName);
              await (await zip.generateStream(getCompressionOptions(), onCompressionUpdate)).pipeTo(fileStream);
            } else {
              const data = await zip.generateAsync(
                getCompressionOptions(),
                onCompressionUpdate
              );
              FileSaver_minExports.saveAs(new File([data], cfName, { type: "application/zip" }));
            }
            logger.log("completed", cfName), progressDisplayController?.complete(), progressDisplayController?.unbindInfo();
          };
      }, addDownloadGalleryTask = (gallery, { progressDisplayController, markGalleryDownloaded } = {}) => {
        const info = createMangaDownloadInfo(gallery, true);
        info.cancel = () => {
          progressDisplayController?.reset();
        }, dlQueue.push(async () => {
          const zipFunc = await downloadGalleryByInfo(info, { progressDisplayController }).catch((e) => {
            throw progressDisplayController?.error(), errorRetryConfirm(
              ErrorAction.DOWNLOAD,
              () => {
                dlQueue.skipFromError().catch(logger.error);
              },
              () => {
                info.error = false, dlQueue.restartFromError().catch(logger.error);
              }
            ), e;
          });
          zipFunc && (zipQueue.push(async () => {
            try {
              await zipFunc(), markAsDownloaded(gallery.gid, gallery.title), markGalleryDownloaded?.();
            } catch (error) {
              error || logger.warn("user abort stream download"), logger.error(error), progressDisplayController?.error();
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
      class IgnoreController {
        constructor(text = true, status = false) {
          this.status = status, this.icon = /* @__PURE__ */ createNode("i", { class: this.iconClass }), text && (this.text = /* @__PURE__ */ createNode("span", { children: this.btnText })), this.ignoreBtn = /* @__PURE__ */ createNode("button", { class: `${className.greyButton} nhentai-helper-btn ignore-btn`, children: [
            this.icon,
            " ",
            this.text
          ] });
        }
        ignoreBtn;
        icon;
        text;
        get iconClass() {
          return this.status ? "fa fa-eye-slash" : "fa fa-eye";
        }
        get btnText() {
          return this.status ? t$2("button.unignore") : t$2("button.ignore");
        }
        setStatus(status) {
          this.status = status, this.updateBtn();
        }
        getStatus() {
          return this.status;
        }
        updateBtn() {
          this.icon.className = this.iconClass, this.text && (this.text.textContent = this.btnText);
        }
      }
      const { t: t$1 } = i18n.global;
      class ProgressDisplayController {
        constructor(enableHeadTxt = false, docTitle) {
          this.enableHeadTxt = enableHeadTxt, this.docTitle = docTitle, this.btnTxt = /* @__PURE__ */ createNode("span", { class: "download-zip-txt", children: this.defaultBtnText() }), this.downloadBtn = /* @__PURE__ */ createNode("button", { class: `${className.greyButton} nhentai-helper-btn download-zip-btn`, children: [
            /* @__PURE__ */ createNode("i", { class: "fa fa-download" }),
            " ",
            this.btnTxt
          ] });
        }
        downloadBtn;
        btnTxt;
        info;
        get compressingHeadText() {
          return this.enableHeadTxt ? `${t$1("button.compressing")} ${getDownloadExt()} ` : "";
        }
        get downloadingHeadText() {
          return this.enableHeadTxt ? `${t$1("button.downloading")} ${getDownloadExt()} ` : "";
        }
        bindInfo(info) {
          this.info = info;
        }
        unbindInfo() {
          this.info = void 0;
        }
        lockBtn(text) {
          this.downloadBtn.setAttribute("disabled", "disabled"), text && (this.btnTxt.textContent = text);
        }
        releaseBtn() {
          this.downloadBtn.removeAttribute("disabled");
        }
        complete() {
          this.setDocTitle("✓"), this.btnTxt.textContent = this.defaultBtnText("✓"), this.releaseBtn();
        }
        reset() {
          this.setDocTitle(), this.btnTxt.textContent = this.defaultBtnText(), this.releaseBtn();
        }
        error() {
          this.releaseBtn(), this.btnTxt.textContent = "Error", this.setDocTitle("×");
        }
        updateProgress() {
          if (!this.info) return;
          const { done, compressing, compressingPercent } = this.info;
          if (compressing)
            this.setDocTitle(`${compressingPercent}%`), this.btnTxt.textContent = `${this.compressingHeadText}${compressingPercent}%`;
          else {
            const total = this.info.gallery.pages.length;
            this.setDocTitle(`${done}/${total}`), this.btnTxt.textContent = `${this.downloadingHeadText}${done}/${total}`;
          }
        }
        defaultBtnText(suffix) {
          return this.enableHeadTxt ? `${t$1("button.download")} ${getDownloadExt()}${suffix ? ` ${suffix}` : ""}` : suffix ?? "";
        }
        setDocTitle(prefix) {
          this.docTitle && (document.title = prefix ? `[${prefix}] ${this.docTitle}` : this.docTitle);
        }
      }
      const { t } = i18n.global, initDetailPage = async () => {
        const progressDisplayController = new ProgressDisplayController(true, document.title), { downloadBtn } = progressDisplayController, pagesInput = /* @__PURE__ */ createNode(
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
          const gallery = await getGalleryInfo(), isDownloaded = await isDownloadedByGid(gallery.gid);
          ignoreController = new IgnoreController(true, isDownloaded);
          const { ignoreBtn } = ignoreController;
          ignoreBtn.addEventListener("click", () => {
            const ignore = ignoreController.getStatus();
            ignore ? unmarkAsDownloaded(gallery.gid, gallery.title) : markAsDownloaded(gallery.gid, gallery.title), ignoreController.setStatus(!ignore);
          }), $(selector.infoButtons).append(ignoreBtn);
        }
        downloadBtn.addEventListener("click", async () => {
          const gallery = await getGalleryInfo(), rangeCheckers = pagesInput.value.split(",").filter((range) => /^\s*(?:\d+(?:\s*-\s*)?\d*|-\d+)\s*$/.test(range)).map((range) => {
            const [start, end] = range.split("-").map((num) => parseInt(num));
            return Number.isNaN(start) ? (page) => page <= end : end === void 0 ? (page) => page === start : Number.isNaN(end) ? (page) => page >= start : (page) => start <= page && page <= end;
          });
          progressDisplayController.lockBtn();
          try {
            if ((await isDownloadedByGid(gallery.gid) || await isDownloadedByTitle(gallery.title)) && !await downloadAgainConfirm(gallery.title.japanese || gallery.title.english)) {
              progressDisplayController.reset(), markAsDownloaded(gallery.gid, gallery.title), ignoreController?.setStatus(!0);
              return;
            }
            await (await downloadGalleryByInfo(createMangaDownloadInfo(gallery), {
              progressDisplayController,
              rangeCheckers
            }))?.(), markAsDownloaded(gallery.gid, gallery.title), ignoreController?.setStatus(!0);
          } catch (error) {
            progressDisplayController.error(), logger.error(error);
          }
        }), applyAutoShowAll();
      }, applyAutoShowAll = () => {
        settings.autoShowAll && getShowAllBtn().then(($btn) => $btn.trigger("click")).catch(logger.error);
      }, _hoisted_1$1 = { class: "info-label bold" }, _hoisted_2 = { class: "info-label bold" }, _hoisted_3 = { class: "bold" }, _hoisted_4 = { class: "info-label bold" }, _hoisted_5 = { class: "bold" }, _hoisted_6 = { class: "info-label bold" }, _hoisted_7 = { class: "scroll-container-inner" }, POPOVER_MAX_WIDTH = 720, POPOVER_THUMB_MORE_COL_WIDTH = 640, _sfc_main$1 = /* @__PURE__ */ Vue.defineComponent({
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
          }, { t: t2 } = useI18n(), visible = Vue.ref(false), virtualRef = Vue.ref(), popoverRef = Vue.ref(), popoverPlacement = Vue.ref("right"), popoverWidth = Vue.ref(0), popoverTransition = Vue.ref(false), gallery = Vue.ref(null), title = Vue.computed(() => {
            const t22 = gallery.value?.title;
            return t22 ? t22.japanese || t22.english || t22.pretty : "";
          }), groupedTags = Vue.computed(() => {
            const tags = gallery.value?.tags;
            return tags ? Object.entries(groupBy(tags, "type")).sort(
              ([a], [b]) => getTagSortIndex(a) - getTagSortIndex(b)
            ) : [];
          }), galleryLink = Vue.computed(() => `${location.origin}/g/${gallery.value?.id}/`), pageThumbs = Vue.ref([]), pageThumbsColSpan = Vue.computed(
            () => popoverWidth.value >= POPOVER_THUMB_MORE_COL_WIDTH ? 6 : 8
          ), pageThumbsColNum = Vue.computed(
            () => popoverWidth.value >= POPOVER_THUMB_MORE_COL_WIDTH ? 4 : 3
          ), pageThumbWidth = Vue.computed(
            () => (popoverWidth.value - 24 - (pageThumbsColNum.value - 1) * 8) / pageThumbsColNum.value
          ), pageThumbScrollHeight = Vue.computed(() => Math.max(0, ...map(pageThumbs.value, "height")) * 1.5), limitTagLength = (tags, maxLength) => {
            const result = tags.slice(0, maxLength), larger = tags.length - result.length;
            return larger > 0 && result.push({ type: "__limit__", name: "__limit__", count: larger }), result;
          }, isLimitTag = (tag) => tag.type === "__limit__";
          let thumbUrlTemplate;
          const getThumbInfo = ({ t: t22, w, h: h2 }, i) => ({
            url: thumbUrlTemplate({
              mid: gallery.value?.media_id,
              filename: `${i + 1}t.${NHentaiImgExt[t22]}`
            }),
            height: w && h2 ? Math.floor(pageThumbWidth.value * Math.min(h2 / w, 1.8)) : 0
          }), formatNumber = (num) => num >= 1e6 ? `${Math.floor(num / 1e6)}M` : num >= 1e3 ? `${Math.floor(num / 1e3)}K` : num, openTagUrl = (path) => {
            path && _GM_openInTab(`${location.origin}${path}`, { active: true, setParent: true });
          };
          let loadingGid = "";
          const open2 = async (el, gid) => {
            if (virtualRef.value === el) return;
            const rect = el.getBoundingClientRect(), bodyWidth = document.body.clientWidth, showRight = rect.left + rect.right <= bodyWidth;
            virtualRef.value = el, popoverPlacement.value = showRight ? "right" : "left", popoverTransition.value = false, popoverWidth.value = Math.min(
              POPOVER_MAX_WIDTH,
              Math.round(showRight ? bodyWidth - rect.right : rect.left) - 16
            ), visible.value = true, gallery.value = null, setTimeout(() => {
              gallery.value || (popoverTransition.value = true);
            }), pageThumbs.value = [];
            try {
              loadingGid = gid, thumbUrlTemplate || (thumbUrlTemplate = await getCompliedThumbMediaUrlTemplate(gid));
              const loadedGallery = await getGallery(gid);
              if (loadingGid !== gid) return;
              gallery.value = loadedGallery, pageThumbs.value = loadedGallery.images.pages.slice(0, 12).map(getThumbInfo), await Vue.nextTick(), popoverRef.value?.popperRef?.popperInstanceRef?.update();
            } catch (error) {
              logger.error(error);
            } finally {
              loadingGid === gid && (loadingGid = "");
            }
          }, addPageThumbLine = () => {
            const curLength = pageThumbs.value.length;
            if (curLength >= gallery.value.images.pages.length) return;
            const curLines = Math.ceil(curLength / pageThumbsColNum.value);
            pageThumbs.value.push(
              ...gallery.value.images.pages.slice(curLength, (curLines + 1) * pageThumbsColNum.value).map((img, i) => getThumbInfo(img, curLength + i))
            );
          }, handleScrollWheel = (e) => {
            const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
            (scrollTop + clientHeight === scrollHeight && e.deltaY > 0 || scrollTop === 0 && e.deltaY < 0) && e.preventDefault();
          }, close = () => {
            visible.value && (visible.value = false);
          }, copyTitle = () => {
            _GM_setClipboard(title.value, "text", () => {
              showMessage({
                type: "success",
                message: t2("common.copied"),
                duration: 2e3
              });
            });
          };
          return Vue.watch(visible, (val) => {
            val ? (window.addEventListener("scroll", close), window.addEventListener("resize", close)) : (window.removeEventListener("scroll", close), window.removeEventListener("resize", close));
          }), Vue.onBeforeUnmount(() => {
            window.removeEventListener("scroll", close), window.removeEventListener("resize", close);
          }), __expose({ open: open2 }), (_ctx, _cache) => (Vue.openBlock(), Vue.createBlock(Vue.unref(elementPlus.ElPopover), {
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
            default: Vue.withCtx(() => [
              gallery.value ? (Vue.openBlock(), Vue.createElementBlock("div", {
                key: 0,
                class: Vue.normalizeClass(["gallery-mini-popover", `lang-${Vue.unref(settings).language}`]),
                onWheel: _cache[0] || (_cache[0] = Vue.withModifiers(() => {
                }, ["prevent"]))
              }, [
                Vue.createVNode(Vue.unref(elementPlus.ElDescriptions), {
                  title: title.value,
                  column: 1
                }, {
                  extra: Vue.withCtx(() => [
                    Vue.createVNode(Vue.unref(elementPlus.ElButton), {
                      text: "",
                      size: "small",
                      onClick: copyTitle
                    }, {
                      default: Vue.withCtx(() => [
                        Vue.createTextVNode(Vue.toDisplayString(Vue.unref(t2)("common.copy")), 1)
                      ]),
                      _: 1
                    }),
                    Vue.createVNode(Vue.unref(elementPlus.ElButton), {
                      icon: Vue.unref(close_bold_default),
                      circle: "",
                      text: "",
                      size: "small",
                      style: { "margin-left": "4px" },
                      onClick: close
                    }, null, 8, ["icon"])
                  ]),
                  default: Vue.withCtx(() => [
                    Vue.createVNode(Vue.unref(elementPlus.ElDescriptionsItem), null, {
                      label: Vue.withCtx(() => [
                        Vue.createElementVNode("span", _hoisted_1$1, Vue.toDisplayString(Vue.unref(t2)("meta.id")), 1)
                      ]),
                      default: Vue.withCtx(() => [
                        Vue.createVNode(Vue.unref(elementPlus.ElLink), {
                          type: "primary",
                          target: "_blank",
                          underline: false,
                          href: galleryLink.value
                        }, {
                          default: Vue.withCtx(() => [
                            Vue.createTextVNode(Vue.toDisplayString(gallery.value.id), 1)
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ]),
                      _: 1
                    }),
                    (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(groupedTags.value, ([type, tags]) => (Vue.openBlock(), Vue.createBlock(Vue.unref(elementPlus.ElDescriptionsItem), { key: type }, {
                      label: Vue.withCtx(() => [
                        Vue.createElementVNode("span", _hoisted_2, Vue.toDisplayString(Vue.unref(t2)(`meta.${type}`)), 1)
                      ]),
                      default: Vue.withCtx(() => [
                        (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(limitTagLength(tags, 10), (tag) => (Vue.openBlock(), Vue.createBlock(Vue.unref(elementPlus.ElTag), {
                          key: tag.id ?? tag.name,
                          class: Vue.normalizeClass(["info-tag", { "info-tag--pointer": !isLimitTag(tag) }]),
                          type: "info",
                          effect: "dark",
                          "disable-transitions": "",
                          onClick: () => openTagUrl(tag.url)
                        }, {
                          default: Vue.withCtx(() => [
                            isLimitTag(tag) ? (Vue.openBlock(), Vue.createElementBlock(Vue.Fragment, { key: 0 }, [
                              Vue.createTextVNode("+" + Vue.toDisplayString(tag.count), 1)
                            ], 64)) : (Vue.openBlock(), Vue.createElementBlock(Vue.Fragment, { key: 1 }, [
                              Vue.createElementVNode("span", _hoisted_3, Vue.toDisplayString(tag.name), 1),
                              Vue.createTextVNode(Vue.toDisplayString(tag.count ? ` | ${formatNumber(tag.count)}` : void 0), 1)
                            ], 64))
                          ]),
                          _: 2
                        }, 1032, ["class", "onClick"]))), 128))
                      ]),
                      _: 2
                    }, 1024))), 128)),
                    gallery.value.num_pages ? (Vue.openBlock(), Vue.createBlock(Vue.unref(elementPlus.ElDescriptionsItem), { key: 0 }, {
                      label: Vue.withCtx(() => [
                        Vue.createElementVNode("span", _hoisted_4, Vue.toDisplayString(Vue.unref(t2)("meta.page")), 1)
                      ]),
                      default: Vue.withCtx(() => [
                        Vue.createVNode(Vue.unref(elementPlus.ElTag), {
                          class: "info-tag",
                          type: "info",
                          effect: "dark",
                          "disable-transitions": ""
                        }, {
                          default: Vue.withCtx(() => [
                            Vue.createElementVNode("span", _hoisted_5, Vue.toDisplayString(gallery.value.num_pages), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : Vue.createCommentVNode("", true),
                    gallery.value.upload_date ? (Vue.openBlock(), Vue.createBlock(Vue.unref(elementPlus.ElDescriptionsItem), { key: 1 }, {
                      label: Vue.withCtx(() => [
                        Vue.createElementVNode("span", _hoisted_6, Vue.toDisplayString(Vue.unref(t2)("meta.upload")), 1)
                      ]),
                      default: Vue.withCtx(() => [
                        Vue.createTextVNode(" " + Vue.toDisplayString(new Date(gallery.value.upload_date * 1e3).toLocaleString()), 1)
                      ]),
                      _: 1
                    })) : Vue.createCommentVNode("", true)
                  ]),
                  _: 1
                }, 8, ["title"]),
                pageThumbs.value.length ? Vue.withDirectives((Vue.openBlock(), Vue.createElementBlock("div", {
                  key: 0,
                  "infinite-scroll-distance": 100,
                  class: "scroll-container",
                  style: Vue.normalizeStyle({ height: `${pageThumbScrollHeight.value}px` }),
                  onWheelCapture: Vue.withModifiers(handleScrollWheel, ["stop"])
                }, [
                  Vue.createElementVNode("div", _hoisted_7, [
                    Vue.createVNode(Vue.unref(elementPlus.ElRow), { gutter: 8 }, {
                      default: Vue.withCtx(() => [
                        (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(pageThumbs.value, ({ url, height }) => (Vue.openBlock(), Vue.createBlock(Vue.unref(elementPlus.ElCol), {
                          key: url,
                          span: pageThumbsColSpan.value
                        }, {
                          default: Vue.withCtx(() => [
                            Vue.createVNode(Vue.unref(elementPlus.ElImage), {
                              src: url,
                              style: Vue.normalizeStyle({ "min-height": `${height}px` })
                            }, null, 8, ["src", "style"])
                          ]),
                          _: 2
                        }, 1032, ["span"]))), 128))
                      ]),
                      _: 1
                    })
                  ])
                ], 36)), [
                  [Vue.unref(elementPlus.ElInfiniteScroll), addPageThumbLine]
                ]) : Vue.createCommentVNode("", true)
              ], 34)) : Vue.withDirectives((Vue.openBlock(), Vue.createElementBlock("div", {
                key: 1,
                style: { height: "700px", maxHeight: "90vh" },
                onWheel: _cache[1] || (_cache[1] = Vue.withModifiers(() => {
                }, ["prevent"]))
              }, null, 544)), [
                [Vue.unref(elementPlus.vLoading), true]
              ])
            ]),
            _: 1
          }, 8, ["visible", "popper-class", "virtual-ref", "placement", "width"]));
        }
      }), GalleryMiniPopover = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-433d0960"]]), initApp = once(
        () => createAppAndMount(GalleryMiniPopover, (app) => {
          app.use(i18n);
        })
      ), openGalleryMiniPopover = (el, gid) => {
        initApp().open(el, gid);
      }, isClient = typeof window < "u" && typeof document < "u";
      typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
      const toString = Object.prototype.toString, isObject = (val) => toString.call(val) === "[object Object]", noop = () => {
      };
      function toRef(...args) {
        if (args.length !== 1) return Vue.toRef(...args);
        const r = args[0];
        return typeof r == "function" ? Vue.readonly(Vue.customRef(() => ({
          get: r,
          set: noop
        }))) : Vue.ref(r);
      }
      function createFilterWrapper(filter2, fn) {
        function wrapper(...args) {
          return new Promise((resolve, reject) => {
            Promise.resolve(filter2(() => fn.apply(this, args), {
              fn,
              thisArg: this,
              args
            })).then(resolve).catch(reject);
          });
        }
        return wrapper;
      }
      const bypassFilter = (invoke$1) => invoke$1();
      function pausableFilter(extendFilter = bypassFilter, options = {}) {
        const { initialState = "active" } = options, isActive = toRef(initialState === "active");
        function pause() {
          isActive.value = false;
        }
        function resume() {
          isActive.value = true;
        }
        const eventFilter = (...args) => {
          isActive.value && extendFilter(...args);
        };
        return {
          isActive: Vue.readonly(isActive),
          pause,
          resume,
          eventFilter
        };
      }
      function toArray(value) {
        return Array.isArray(value) ? value : [value];
      }
      function getLifeCycleTarget(target) {
        return Vue.getCurrentInstance();
      }
      function watchWithFilter(source, cb, options = {}) {
        const { eventFilter = bypassFilter, ...watchOptions } = options;
        return Vue.watch(source, createFilterWrapper(eventFilter, cb), watchOptions);
      }
      function watchPausable(source, cb, options = {}) {
        const { eventFilter: filter2, initialState = "active", ...watchOptions } = options, { eventFilter, pause, resume, isActive } = pausableFilter(filter2, { initialState });
        return {
          stop: watchWithFilter(source, cb, {
            ...watchOptions,
            eventFilter
          }),
          pause,
          resume,
          isActive
        };
      }
      const pausableWatch = watchPausable;
      function tryOnMounted(fn, sync = true, target) {
        getLifeCycleTarget() ? Vue.onMounted(fn, target) : sync ? fn() : Vue.nextTick(fn);
      }
      function watchImmediate(source, cb, options) {
        return Vue.watch(source, cb, {
          ...options,
          immediate: true
        });
      }
      const defaultWindow = isClient ? window : void 0;
      function unrefElement(elRef) {
        var _$el;
        const plain = Vue.toValue(elRef);
        return (_$el = plain?.$el) !== null && _$el !== void 0 ? _$el : plain;
      }
      function useEventListener(...args) {
        const register = (el, event, listener, options) => (el.addEventListener(event, listener, options), () => el.removeEventListener(event, listener, options)), firstParamTargets = Vue.computed(() => {
          const test = toArray(Vue.toValue(args[0])).filter((e) => e != null);
          return test.every((e) => typeof e != "string") ? test : void 0;
        });
        return watchImmediate(() => {
          var _firstParamTargets$va, _firstParamTargets$va2;
          return [
            (_firstParamTargets$va = (_firstParamTargets$va2 = firstParamTargets.value) === null || _firstParamTargets$va2 === void 0 ? void 0 : _firstParamTargets$va2.map((e) => unrefElement(e))) !== null && _firstParamTargets$va !== void 0 ? _firstParamTargets$va : [defaultWindow].filter((e) => e != null),
            toArray(Vue.toValue(firstParamTargets.value ? args[1] : args[0])),
            toArray(Vue.unref(firstParamTargets.value ? args[2] : args[1])),
            Vue.toValue(firstParamTargets.value ? args[3] : args[2])
          ];
        }, ([raw_targets, raw_events, raw_listeners, raw_options], _, onCleanup) => {
          if (!raw_targets?.length || !raw_events?.length || !raw_listeners?.length) return;
          const optionsClone = isObject(raw_options) ? { ...raw_options } : raw_options, cleanups = raw_targets.flatMap((el) => raw_events.flatMap((event) => raw_listeners.map((listener) => register(el, event, listener, optionsClone))));
          onCleanup(() => {
            cleanups.forEach((fn) => fn());
          });
        }, { flush: "post" });
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
      function useStorage(key, defaults$1, storage, options = {}) {
        var _options$serializer;
        const { flush = "pre", deep = true, listenToStorageChanges = true, writeDefaults = true, mergeDefaults = false, shallow, window: window$1 = defaultWindow, eventFilter, onError = (e) => {
          console.error(e);
        }, initOnMounted } = options, data = (shallow ? Vue.shallowRef : Vue.ref)(typeof defaults$1 == "function" ? defaults$1() : defaults$1), keyComputed = Vue.computed(() => Vue.toValue(key));
        if (!storage) try {
          storage = getSSRHandler("getDefaultStorage", () => defaultWindow?.localStorage)();
        } catch (e) {
          onError(e);
        }
        if (!storage) return data;
        const rawInit = Vue.toValue(defaults$1), type = guessSerializerType(rawInit), serializer = (_options$serializer = options.serializer) !== null && _options$serializer !== void 0 ? _options$serializer : StorageSerializers[type], { pause: pauseWatch, resume: resumeWatch } = pausableWatch(data, (newValue) => write(newValue), {
          flush,
          deep,
          eventFilter
        });
        Vue.watch(keyComputed, () => update(), { flush });
        let firstMounted = false;
        const onStorageEvent = (ev) => {
          initOnMounted && !firstMounted || update(ev);
        }, onStorageCustomEvent = (ev) => {
          initOnMounted && !firstMounted || updateFromCustomEvent(ev);
        };
        window$1 && listenToStorageChanges && (storage instanceof Storage ? useEventListener(window$1, "storage", onStorageEvent, { passive: true }) : useEventListener(window$1, customStorageEventName, onStorageCustomEvent)), initOnMounted ? tryOnMounted(() => {
          firstMounted = true, update();
        }) : update();
        function dispatchWriteEvent(oldValue, newValue) {
          if (window$1) {
            const payload = {
              key: keyComputed.value,
              oldValue,
              newValue,
              storageArea: storage
            };
            window$1.dispatchEvent(storage instanceof Storage ? new StorageEvent("storage", payload) : new CustomEvent(customStorageEventName, { detail: payload }));
          }
        }
        function write(v) {
          try {
            const oldValue = storage.getItem(keyComputed.value);
            if (v == null)
              dispatchWriteEvent(oldValue, null), storage.removeItem(keyComputed.value);
            else {
              const serialized = serializer.write(v);
              oldValue !== serialized && (storage.setItem(keyComputed.value, serialized), dispatchWriteEvent(oldValue, serialized));
            }
          } catch (e) {
            onError(e);
          }
        }
        function read(event) {
          const rawValue = event ? event.newValue : storage.getItem(keyComputed.value);
          if (rawValue == null)
            return writeDefaults && rawInit != null && storage.setItem(keyComputed.value, serializer.write(rawInit)), rawInit;
          if (!event && mergeDefaults) {
            const value = serializer.read(rawValue);
            return typeof mergeDefaults == "function" ? mergeDefaults(value, rawInit) : type === "object" && !Array.isArray(value) ? {
              ...rawInit,
              ...value
            } : value;
          } else return typeof rawValue != "string" ? rawValue : serializer.read(rawValue);
        }
        function update(event) {
          if (!(event && event.storageArea !== storage)) {
            if (event && event.key == null) {
              data.value = rawInit;
              return;
            }
            if (!(event && event.key !== keyComputed.value)) {
              pauseWatch();
              try {
                const serializedData = serializer.write(data.value);
                (event === void 0 || event?.newValue !== serializedData) && (data.value = read(event));
              } catch (e) {
                onError(e);
              } finally {
                event ? Vue.nextTick(resumeWatch) : resumeWatch();
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
        const { window: window$1 = defaultWindow } = options;
        return useStorage(key, initialValue, window$1?.sessionStorage, options);
      }
      const _hoisted_1 = { class: "language-filter" }, _sfc_main = /* @__PURE__ */ Vue.defineComponent({
        __name: "LanguageFilter",
        setup(__props, { expose: __expose }) {
          const { t: t2 } = i18n.global, languageFilter = useSessionStorage("languageFilter", [], {
            listenToStorageChanges: false
          });
          return Vue.watch(
            languageFilter,
            (val) => {
              filterLanguage(val);
            },
            { deep: true, immediate: true }
          ), __expose({
            filterLanguage: ($node) => {
              filterLanguage(languageFilter.value, $node);
            }
          }), (_ctx, _cache) => (Vue.openBlock(), Vue.createElementBlock("li", _hoisted_1, [
            Vue.createVNode(Vue.unref(elementPlus.ElSelect), {
              modelValue: Vue.unref(languageFilter),
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => Vue.isRef(languageFilter) ? languageFilter.value = $event : null),
              class: "filter-select",
              multiple: "",
              "collapse-tags": "",
              "collapse-tags-tooltip": "",
              placeholder: Vue.unref(t2)("common.filter")
            }, {
              default: Vue.withCtx(() => [
                (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(Vue.unref(filterOptions), ([key, val]) => (Vue.openBlock(), Vue.createBlock(Vue.unref(elementPlus.ElOption), {
                  key,
                  label: Vue.unref(t2)(`common.abbr.${key}`),
                  value: val
                }, {
                  default: Vue.withCtx(() => [
                    Vue.createTextVNode(Vue.toDisplayString(Vue.unref(t2)(`common.${key}`)), 1)
                  ]),
                  _: 2
                }, 1032, ["label", "value"]))), 128))
              ]),
              _: 1
            }, 8, ["modelValue", "placeholder"])
          ]));
        }
      }), LanguageFilter = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a4501d38"]]), filterOptions = IS_NHENTAI_TO ? [
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
      ], filterOptionsMap = Object.fromEntries(filterOptions), allLangTags = Object.values(filterOptionsMap), detectRegMap = Object.entries({
        english: /\[english\]|translation\]/i,
        chinese: /\[chinese\]|中国翻訳|漢化\]/i
      }), handleMissingDataTags = ($gallery) => {
        $gallery.each(function() {
          const title = $(this).find(selector.galleryCaption).text(), lang = detectRegMap.find(([, reg]) => reg.test(title))?.[0] || "japanese", tag = filterOptionsMap[lang];
          if (tag) {
            const curTags = this.dataset.tags;
            this.dataset.tags = `${curTags ? `${curTags} ` : ""}${tag}`;
          }
        });
      }, filterLanguage = (tags, $node) => {
        const attrName = IS_NHENTAI_XXX ? "data-languages" : "data-tags", getNode = $node ? (selector2) => $node.find(selector2) : (selector2) => $(selector2), getNotSelector = (tags2) => tags2.map((tag) => `:not([${attrName}~=${tag}])`).join("");
        getNode(selector.gallery).removeClass("nhentai-helper-hidden"), handleMissingDataTags(getNode(`${selector.gallery}${getNotSelector(allLangTags)}`)), tags.length && getNode(`${selector.gallery}${getNotSelector(tags)}`).addClass("nhentai-helper-hidden");
      }, mountLanguageFilter = () => {
        const menuLeft = document.querySelector(selector.menuLeft);
        if (!menuLeft) return {};
        const vnode = Vue.h(LanguageFilter);
        return Vue.render(vnode, menuLeft), vnode.component?.exposed ?? {};
      }, initListPage = () => {
        $(selector.gallery).each(initGallery);
        const { filterLanguage: filterLanguage2 } = mountLanguageFilter();
        initShortcut(), restoreDownloadQueue();
        const contentEl = document.querySelector(selector.galleryList);
        contentEl && new MutationObserver((mutations) => {
          mutations.forEach(({ addedNodes }) => {
            addedNodes.forEach((node) => {
              const $el = $(node);
              $el.find(selector.gallery).each(initGallery), filterLanguage2?.($el);
            });
          });
        }).observe(contentEl, { childList: true });
      }, initShortcut = () => {
        const ignoreActiveElTags = /* @__PURE__ */ new Set(["INPUT", "TEXTAREA"]);
        $(document).on("keydown", (event) => {
          const activeElTag = document.activeElement?.tagName || "";
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
            for (const gallery of galleries)
              addDownloadGalleryTask(gallery);
          } catch (error) {
            logger.error(error);
          }
      }, initGallery = function() {
        const $gallery = $(this);
        if ($gallery.attr("init")) return;
        $gallery.attr("init", "true"), $gallery.addClass("nhentai-helper-gallery");
        const $a = $gallery.find(selector.galleryCover);
        settings.openOnNewTab && $a.attr("target", "_blank");
        const gid = /\/g\/(\d+)/.exec($a.attr("href"))?.[1];
        if (!gid) return;
        const enTitle = $gallery.find(selector.galleryCaption).text().trim(), progressDisplayController = new ProgressDisplayController(), { downloadBtn } = progressDisplayController;
        $gallery.append(downloadBtn);
        let ignoreController, galleryTitle;
        const markGalleryDownloaded = () => {
          $gallery.addClass("downloaded"), ignoreController?.setStatus(true);
        }, unmarkGalleryDownloaded = () => {
          $gallery.removeClass("downloaded"), ignoreController?.setStatus(false);
        };
        Promise.all([isDownloadedByGid(gid), isDownloadedByTitle({ english: enTitle })]).then(
          ([gidDownloaded, titleDownloaded]) => {
            const downloaded = gidDownloaded || titleDownloaded;
            if (downloaded && markGalleryDownloaded(), settings.showIgnoreButton) {
              ignoreController = new IgnoreController(false, downloaded);
              const { ignoreBtn } = ignoreController;
              ignoreBtn.addEventListener("click", () => {
                ignoreController.getStatus() ? (unmarkGalleryDownloaded(), unmarkAsDownloaded(gid, galleryTitle)) : (markGalleryDownloaded(), markAsDownloaded(gid, galleryTitle));
              }), $gallery.append(ignoreBtn);
            }
          }
        );
        let skipDownloadedCheck = false;
        const startDownload = async () => {
          if (settings.autoCancelDownloadedManga || progressDisplayController.lockBtn("Wait"), !skipDownloadedCheck && await isDownloadedByGid(gid)) {
            const title = $gallery.find(selector.galleryCaption).text();
            if (!await downloadAgainConfirm(title, true)) {
              progressDisplayController.reset(), markGalleryDownloaded();
              return;
            }
            skipDownloadedCheck = true;
          }
          settings.autoCancelDownloadedManga && progressDisplayController.lockBtn("Wait");
          let gallery;
          try {
            gallery = await getGalleryInfo(gid), galleryTitle = gallery.title;
          } catch (error) {
            logger.error(error), progressDisplayController.error(), errorRetryConfirm(ErrorAction.GET_INFO, void 0, startDownload);
            return;
          }
          if (!skipDownloadedCheck) {
            if (await isDownloadedByTitle(gallery.title) && !await downloadAgainConfirm(gallery.title.japanese || gallery.title.english, true)) {
              progressDisplayController.reset(), markAsDownloaded(gid, gallery.title), markGalleryDownloaded();
              return;
            }
            if (dlQueue.queue.some(
              ({
                info: {
                  gallery: { title }
                }
              }) => isSameTitle(title, gallery.title)
            ) && !await downloadAgainConfirm(gallery.title.japanese || gallery.title.english, true)) {
              progressDisplayController.reset();
              return;
            }
          }
          addDownloadGalleryTask(gallery, { progressDisplayController, markGalleryDownloaded });
        };
        downloadBtn.addEventListener("click", startDownload), this.addEventListener("contextmenu", (e) => {
          settings.galleryContextmenuPreview && (e.preventDefault(), openGalleryMiniPopover(this, gid));
        });
      };
      class StyleInjector {
        styleNode;
        constructor(style) {
          this.styleNode = /* @__PURE__ */ createNode("style", { children: style });
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
        const btnText = /* @__PURE__ */ createNode("span", { children: viewModeText[viewMode] }), btn = /* @__PURE__ */ createNode("button", { id: "online-view-mode-btn", class: className.greyButton, children: [
          "100% view height ",
          btnText
        ] });
        btn.addEventListener("click", () => {
          viewMode = 1 - viewMode, _GM_setValue("online_view_mode", viewMode), btnText.textContent = viewModeText[viewMode], applyOnlineViewStyle(!!viewMode, style);
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