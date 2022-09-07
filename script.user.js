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
// @resource           notyCss https://fastly.jsdelivr.net/npm/noty@3.1.4/lib/noty.min.css
// @resource           elementPlus https://fastly.jsdelivr.net/npm/element-plus@2.2.16/dist/index.full.min.js
// @resource           elementPlusCss https://fastly.jsdelivr.net/npm/element-plus@2.2.16/dist/index.css
// @grant              GM_registerMenuCommand
// @grant              unsafeWindow
// @grant              GM_addStyle
// @grant              GM_getResourceText
// @grant              GM_getValue
// @grant              GM_setValue
// @grant              GM_xmlhttpRequest
// @run-at             document-end
// @noframes          
// ==/UserScript==

// use vite-plugin-monkey@2.3.1 at 2022-09-07T03:37:42.225Z

;(({ css = "" }) => {
  const style = document.createElement("style");
  style.innerText = css;
  style.dataset.source = "vite-plugin-monkey";
  document.head.appendChild(style);
})({
  "css": ".nhentai-helper-btn:disabled{cursor:wait}.gallery>.nhentai-helper-btn{position:absolute;top:0;min-width:42px;opacity:.8}.gallery:hover>.nhentai-helper-btn{opacity:1}.gallery .download-zip-btn{left:0}.gallery .ignore-btn{right:0}#page-container{position:relative}@media screen and (max-width: 768px){#page-container{padding-top:40px}}#online-view-mode-btn{position:absolute;right:0;top:0;margin:0}.btn-noty-green{background-color:#66bb6a!important}.btn-noty-blue{background-color:#42a5f5!important}.btn-noty:hover{filter:brightness(1.15)}.noty_buttons{padding-top:0!important}.pages-input{-webkit-appearance:none;display:inline-block;border-radius:3px;padding:0 .1em 0 1em;font-size:1em;width:100%;height:40px;border:0;vertical-align:top;margin-top:5px}.gallery.downloaded .caption{color:#999}.download-item[data-v-5e3261cd]{position:relative;white-space:nowrap;padding:2px;overflow:visible}.download-item--can-cancel[data-v-5e3261cd]:hover{width:calc(100% - 30px)}.download-item__cancel[data-v-5e3261cd]{cursor:pointer;position:absolute;top:0;right:-30px;color:#f44336;font-size:20px;line-height:30px;width:30px}.download-item__title[data-v-5e3261cd]{overflow:hidden;text-overflow:ellipsis;text-align:left}.download-item__progress[data-v-5e3261cd]{background-color:#0000ff80;line-height:10px}.download-item--error .download-item__progress[data-v-5e3261cd]{background-color:#ff000080}.download-item--compressing .download-item__progress[data-v-5e3261cd]{background-color:#00ff0080}.download-item__progress-text[data-v-5e3261cd]{transform:scale(.8)}#download-panel[data-v-658acab9]{overflow-x:hidden;position:fixed;top:20vh;right:0;width:calc(50vw - 620px);max-width:300px;min-width:150px;max-height:60vh;background-color:#000000b3;z-index:100;font-size:12px;overflow-y:scroll}#download-panel[data-v-658acab9]::-webkit-scrollbar{width:6px;background-color:#000000b3}#download-panel[data-v-658acab9]::-webkit-scrollbar-thumb{background-color:#fff9}.nhentai-helper-setting-help-buttons{float:left;position:absolute}#nhentai-helper-setting-dialog .asterisk-left:before{content:\"*\";color:var(--el-color-danger);margin-right:4px}#nhentai-helper-setting-dialog label{font-weight:unset}#nhentai-helper-setting-dialog input:not([type=\"file\"]):not([type=\"checkbox\"]){background:inherit;color:var(--el-input-text-color, var(--el-text-color-regular))}#nhentai-helper-setting-dialog .el-input.is-disabled .el-input__inner{color:var(--el-disabled-text-color)}#nhentai-helper-setting-dialog .el-slider__stop{border:solid 1px var(--el-slider-runway-bg-color)}#nhentai-helper-setting-dialog .el-form-item:last-of-type{margin-bottom:0}#nhentai-helper-setting-dialog .el-form-item.refresh-required>.el-form-item__label-wrap>.el-form-item__label:after{content:\"*\";color:var(--el-color-danger);margin-left:4px}#nhentai-helper-setting-dialog .el-divider__text{color:var(--el-text-color-secondary);user-select:none}#nhentai-helper-setting-dialog .m-l-16{margin-left:16px}#nhentai-helper-setting-dialog .m-b-32{margin-bottom:32px}#nhentai-helper-setting-dialog .no-sl,#nhentai-helper-setting-dialog .el-form-item__label{user-select:none}"
});

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
(function($, jqueryPjax, Vue, eventemitter3, fileSaver, localforage, md5, comlink, Noty, streamsaver) {
  var _a, _b;
  "use strict";
  const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
  function _interopNamespace(e) {
    if (e && e.__esModule)
      return e;
    const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
    if (e) {
      for (const k in e) {
        if (k !== "default") {
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
  const $__default = /* @__PURE__ */ _interopDefaultLegacy($);
  const Vue__namespace = /* @__PURE__ */ _interopNamespace(Vue);
  const localforage__default = /* @__PURE__ */ _interopDefaultLegacy(localforage);
  const md5__default = /* @__PURE__ */ _interopDefaultLegacy(md5);
  const Noty__default = /* @__PURE__ */ _interopDefaultLegacy(Noty);
  var monkeyWindow = (_a = Reflect.get(document, "__monkeyWindow")) != null ? _a : window;
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
  function once(fn) {
    var called, value;
    if (typeof fn !== "function") {
      throw new Error("expected a function but got " + fn);
    }
    return function wrap() {
      if (called) {
        return value;
      }
      called = true;
      value = fn.apply(this, arguments);
      fn = void 0;
      return value;
    };
  }
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
    return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
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
  const removeAt = (array, index2) => array.splice(index2, 1)[0];
  class AsyncQueue {
    constructor(thread = 1) {
      __publicField(this, "queue", Vue.reactive([]));
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
  var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
  const freeGlobal$1 = freeGlobal;
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal$1 || freeSelf || Function("return this")();
  const root$1 = root;
  var Symbol$1 = root$1.Symbol;
  const Symbol$2 = Symbol$1;
  var objectProto$h = Object.prototype;
  var hasOwnProperty$d = objectProto$h.hasOwnProperty;
  var nativeObjectToString$2 = objectProto$h.toString;
  var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
  function getRawTag(value) {
    var isOwn = hasOwnProperty$d.call(value, symToStringTag$1), tag = value[symToStringTag$1];
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
  var objectProto$g = Object.prototype;
  var nativeObjectToString$1 = objectProto$g.toString;
  function objectToString(value) {
    return nativeObjectToString$1.call(value);
  }
  var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
  var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
  function baseGetTag(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
  }
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  var symbolTag$1 = "[object Symbol]";
  function isSymbol(value) {
    return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag$1;
  }
  function arrayMap(array, iteratee) {
    var index2 = -1, length = array == null ? 0 : array.length, result = Array(length);
    while (++index2 < length) {
      result[index2] = iteratee(array[index2], index2, array);
    }
    return result;
  }
  var isArray = Array.isArray;
  const isArray$1 = isArray;
  var INFINITY$1 = 1 / 0;
  var symbolProto$1 = Symbol$2 ? Symbol$2.prototype : void 0, symbolToString = symbolProto$1 ? symbolProto$1.toString : void 0;
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
    return result == "0" && 1 / value == -INFINITY$1 ? "-0" : result;
  }
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }
  function identity(value) {
    return value;
  }
  var asyncTag = "[object AsyncFunction]", funcTag$1 = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
  function isFunction(value) {
    if (!isObject(value)) {
      return false;
    }
    var tag = baseGetTag(value);
    return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
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
  var funcProto$1 = Function.prototype, objectProto$f = Object.prototype;
  var funcToString$1 = funcProto$1.toString;
  var hasOwnProperty$c = objectProto$f.hasOwnProperty;
  var reIsNative = RegExp(
    "^" + funcToString$1.call(hasOwnProperty$c).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }
  function getValue(object, key) {
    return object == null ? void 0 : object[key];
  }
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : void 0;
  }
  var WeakMap = getNative(root$1, "WeakMap");
  const WeakMap$1 = WeakMap;
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
  var baseSetToString = !defineProperty$1 ? identity : function(func, string) {
    return defineProperty$1(func, "toString", {
      "configurable": true,
      "enumerable": false,
      "value": constant(string),
      "writable": true
    });
  };
  const baseSetToString$1 = baseSetToString;
  var setToString = shortOut(baseSetToString$1);
  const setToString$1 = setToString;
  function arrayEach(array, iteratee) {
    var index2 = -1, length = array == null ? 0 : array.length;
    while (++index2 < length) {
      if (iteratee(array[index2], index2, array) === false) {
        break;
      }
    }
    return array;
  }
  var MAX_SAFE_INTEGER$1 = 9007199254740991;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER$1 : length;
    return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  function baseAssignValue(object, key, value) {
    if (key == "__proto__" && defineProperty$1) {
      defineProperty$1(object, key, {
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
  var objectProto$e = Object.prototype;
  var hasOwnProperty$b = objectProto$e.hasOwnProperty;
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty$b.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
      baseAssignValue(object, key, value);
    }
  }
  function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});
    var index2 = -1, length = props.length;
    while (++index2 < length) {
      var key = props[index2];
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
  function overRest(func, start, transform) {
    start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
    return function() {
      var args = arguments, index2 = -1, length = nativeMax(args.length - start, 0), array = Array(length);
      while (++index2 < length) {
        array[index2] = args[start + index2];
      }
      index2 = -1;
      var otherArgs = Array(start + 1);
      while (++index2 < start) {
        otherArgs[index2] = args[index2];
      }
      otherArgs[start] = transform(array);
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
    return value != null && isLength(value.length) && !isFunction(value);
  }
  function isIterateeCall(value, index2, object) {
    if (!isObject(object)) {
      return false;
    }
    var type = typeof index2;
    if (type == "number" ? isArrayLike(object) && isIndex(index2, object.length) : type == "string" && index2 in object) {
      return eq(object[index2], value);
    }
    return false;
  }
  function createAssigner(assigner) {
    return baseRest(function(object, sources) {
      var index2 = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
      customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        customizer = length < 3 ? void 0 : customizer;
        length = 1;
      }
      object = Object(object);
      while (++index2 < length) {
        var source = sources[index2];
        if (source) {
          assigner(object, source, index2, customizer);
        }
      }
      return object;
    });
  }
  var objectProto$d = Object.prototype;
  function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$d;
    return value === proto;
  }
  function baseTimes(n, iteratee) {
    var index2 = -1, result = Array(n);
    while (++index2 < n) {
      result[index2] = iteratee(index2);
    }
    return result;
  }
  var argsTag$2 = "[object Arguments]";
  function baseIsArguments(value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag$2;
  }
  var objectProto$c = Object.prototype;
  var hasOwnProperty$a = objectProto$c.hasOwnProperty;
  var propertyIsEnumerable$1 = objectProto$c.propertyIsEnumerable;
  var isArguments = baseIsArguments(function() {
    return arguments;
  }()) ? baseIsArguments : function(value) {
    return isObjectLike(value) && hasOwnProperty$a.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
  };
  const isArguments$1 = isArguments;
  function stubFalse() {
    return false;
  }
  var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
  var Buffer = moduleExports$1 ? root$1.Buffer : void 0;
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
  var isBuffer = nativeIsBuffer || stubFalse;
  const isBuffer$1 = isBuffer;
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
  var freeProcess = moduleExports && freeGlobal$1.process;
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
  const nodeUtil$1 = nodeUtil;
  var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;
  var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
  const isTypedArray$1 = isTypedArray;
  var objectProto$b = Object.prototype;
  var hasOwnProperty$9 = objectProto$b.hasOwnProperty;
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray$1(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$1(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
    for (var key in value) {
      if ((inherited || hasOwnProperty$9.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) {
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
  var objectProto$a = Object.prototype;
  var hasOwnProperty$8 = objectProto$a.hasOwnProperty;
  function baseKeys(object) {
    if (!isPrototype(object)) {
      return nativeKeys$1(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty$8.call(object, key) && key != "constructor") {
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
  var objectProto$9 = Object.prototype;
  var hasOwnProperty$7 = objectProto$9.hasOwnProperty;
  function baseKeysIn(object) {
    if (!isObject(object)) {
      return nativeKeysIn(object);
    }
    var isProto = isPrototype(object), result = [];
    for (var key in object) {
      if (!(key == "constructor" && (isProto || !hasOwnProperty$7.call(object, key)))) {
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
  const extendWith = assignInWith;
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
  var objectProto$8 = Object.prototype;
  var hasOwnProperty$6 = objectProto$8.hasOwnProperty;
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate$1) {
      var result = data[key];
      return result === HASH_UNDEFINED$2 ? void 0 : result;
    }
    return hasOwnProperty$6.call(data, key) ? data[key] : void 0;
  }
  var objectProto$7 = Object.prototype;
  var hasOwnProperty$5 = objectProto$7.hasOwnProperty;
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty$5.call(data, key);
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
  var Map = getNative(root$1, "Map");
  const Map$1 = Map;
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
  var FUNC_ERROR_TEXT = "Expected a function";
  function memoize(func, resolver) {
    if (typeof func != "function" || resolver != null && typeof resolver != "function") {
      throw new TypeError(FUNC_ERROR_TEXT);
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
  var stringToPath = memoizeCapped(function(string) {
    var result = [];
    if (string.charCodeAt(0) === 46) {
      result.push("");
    }
    string.replace(rePropName, function(match2, number, quote, subString) {
      result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match2);
    });
    return result;
  });
  const stringToPath$1 = stringToPath;
  function toString(value) {
    return value == null ? "" : baseToString(value);
  }
  function castPath(value, object) {
    if (isArray$1(value)) {
      return value;
    }
    return isKey(value, object) ? [value] : stringToPath$1(toString(value));
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
    var index2 = 0, length = path.length;
    while (object != null && index2 < length) {
      object = object[toKey(path[index2++])];
    }
    return index2 && index2 == length ? object : void 0;
  }
  function get(object, path, defaultValue) {
    var result = object == null ? void 0 : baseGet(object, path);
    return result === void 0 ? defaultValue : result;
  }
  function arrayPush(array, values) {
    var index2 = -1, length = values.length, offset = array.length;
    while (++index2 < length) {
      array[offset + index2] = values[index2];
    }
    return array;
  }
  var getPrototype = overArg(Object.getPrototypeOf, Object);
  const getPrototype$1 = getPrototype;
  var objectTag$2 = "[object Object]";
  var funcProto = Function.prototype, objectProto$6 = Object.prototype;
  var funcToString = funcProto.toString;
  var hasOwnProperty$4 = objectProto$6.hasOwnProperty;
  var objectCtorString = funcToString.call(Object);
  function isPlainObject(value) {
    if (!isObjectLike(value) || baseGetTag(value) != objectTag$2) {
      return false;
    }
    var proto = getPrototype$1(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty$4.call(proto, "constructor") && proto.constructor;
    return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
  }
  var domExcTag = "[object DOMException]", errorTag$1 = "[object Error]";
  function isError(value) {
    if (!isObjectLike(value)) {
      return false;
    }
    var tag = baseGetTag(value);
    return tag == errorTag$1 || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject(value);
  }
  var attempt = baseRest(function(func, args) {
    try {
      return apply(func, void 0, args);
    } catch (e) {
      return isError(e) ? e : new Error(e);
    }
  });
  const attempt$1 = attempt;
  function baseSlice(array, start, end) {
    var index2 = -1, length = array.length;
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
    while (++index2 < length) {
      result[index2] = array[index2 + start];
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
      string = toString(string);
      var strSymbols = hasUnicode(string) ? stringToArray(string) : void 0;
      var chr = strSymbols ? strSymbols[0] : string.charAt(0);
      var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
      return chr[methodName]() + trailing;
    };
  }
  var upperFirst = createCaseFirst("toUpperCase");
  const upperFirst$1 = upperFirst;
  function capitalize(string) {
    return upperFirst$1(toString(string).toLowerCase());
  }
  function arrayReduce(array, iteratee, accumulator, initAccum) {
    var index2 = -1, length = array == null ? 0 : array.length;
    if (initAccum && length) {
      accumulator = array[++index2];
    }
    while (++index2 < length) {
      accumulator = iteratee(accumulator, array[index2], index2, array);
    }
    return accumulator;
  }
  function basePropertyOf(object) {
    return function(key) {
      return object == null ? void 0 : object[key];
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
  function deburr(string) {
    string = toString(string);
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
  function unicodeWords(string) {
    return string.match(reUnicodeWord) || [];
  }
  function words(string, pattern, guard) {
    string = toString(string);
    pattern = guard ? void 0 : pattern;
    if (pattern === void 0) {
      return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
    }
    return string.match(pattern) || [];
  }
  var rsApos = "['\u2019]";
  var reApos = RegExp(rsApos, "g");
  function createCompounder(callback) {
    return function(string) {
      return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
    };
  }
  var camelCase = createCompounder(function(result, word, index2) {
    word = word.toLowerCase();
    return result + (index2 ? capitalize(word) : word);
  });
  const camelCase$1 = camelCase;
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
    var index2 = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
    while (++index2 < length) {
      var value = array[index2];
      if (predicate(value, index2, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }
  function stubArray() {
    return [];
  }
  var objectProto$5 = Object.prototype;
  var propertyIsEnumerable = objectProto$5.propertyIsEnumerable;
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
  var DataView = getNative(root$1, "DataView");
  const DataView$1 = DataView;
  var Promise$1 = getNative(root$1, "Promise");
  const Promise$2 = Promise$1;
  var Set = getNative(root$1, "Set");
  const Set$1 = Set;
  var mapTag$1 = "[object Map]", objectTag$1 = "[object Object]", promiseTag = "[object Promise]", setTag$1 = "[object Set]", weakMapTag = "[object WeakMap]";
  var dataViewTag$1 = "[object DataView]";
  var dataViewCtorString = toSource(DataView$1), mapCtorString = toSource(Map$1), promiseCtorString = toSource(Promise$2), setCtorString = toSource(Set$1), weakMapCtorString = toSource(WeakMap$1);
  var getTag = baseGetTag;
  if (DataView$1 && getTag(new DataView$1(new ArrayBuffer(1))) != dataViewTag$1 || Map$1 && getTag(new Map$1()) != mapTag$1 || Promise$2 && getTag(Promise$2.resolve()) != promiseTag || Set$1 && getTag(new Set$1()) != setTag$1 || WeakMap$1 && getTag(new WeakMap$1()) != weakMapTag) {
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
  var Uint8Array$1 = root$1.Uint8Array;
  const Uint8Array$2 = Uint8Array$1;
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
  function arraySome(array, predicate) {
    var index2 = -1, length = array == null ? 0 : array.length;
    while (++index2 < length) {
      if (predicate(array[index2], index2, array)) {
        return true;
      }
    }
    return false;
  }
  function cacheHas(cache, key) {
    return cache.has(key);
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
    var index2 = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG$3 ? new SetCache() : void 0;
    stack.set(array, other);
    stack.set(other, array);
    while (++index2 < arrLength) {
      var arrValue = array[index2], othValue = other[index2];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, arrValue, index2, other, array, stack) : customizer(arrValue, othValue, index2, array, other, stack);
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
  function mapToArray(map) {
    var index2 = -1, result = Array(map.size);
    map.forEach(function(value, key) {
      result[++index2] = [key, value];
    });
    return result;
  }
  function setToArray(set) {
    var index2 = -1, result = Array(set.size);
    set.forEach(function(value) {
      result[++index2] = value;
    });
    return result;
  }
  var COMPARE_PARTIAL_FLAG$4 = 1, COMPARE_UNORDERED_FLAG$2 = 2;
  var boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]";
  var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]";
  var symbolProto = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
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
  var objectProto$4 = Object.prototype;
  var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
  function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
    if (objLength != othLength && !isPartial) {
      return false;
    }
    var index2 = objLength;
    while (index2--) {
      var key = objProps[index2];
      if (!(isPartial ? key in other : hasOwnProperty$3.call(other, key))) {
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
    while (++index2 < objLength) {
      key = objProps[index2];
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
  var objectProto$3 = Object.prototype;
  var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
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
      return objIsArr || isTypedArray$1(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG$2)) {
      var objIsWrapped = objIsObj && hasOwnProperty$2.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty$2.call(other, "__wrapped__");
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
    var index2 = matchData.length, length = index2, noCustomizer = !customizer;
    if (object == null) {
      return !length;
    }
    object = Object(object);
    while (index2--) {
      var data = matchData[index2];
      if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
        return false;
      }
    }
    while (++index2 < length) {
      data = matchData[index2];
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
    return value === value && !isObject(value);
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
    var index2 = -1, length = path.length, result = false;
    while (++index2 < length) {
      var key = toKey(path[index2]);
      if (!(result = object != null && hasFunc(object, key))) {
        break;
      }
      object = object[key];
    }
    if (result || ++index2 != length) {
      return result;
    }
    length = object == null ? 0 : object.length;
    return !!length && isLength(length) && isIndex(key, length) && (isArray$1(object) || isArguments$1(object));
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
  function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index2 = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
      while (length--) {
        var key = props[fromRight ? length : ++index2];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }
  var baseFor = createBaseFor();
  const baseFor$1 = baseFor;
  function baseForOwn(object, iteratee) {
    return object && baseFor$1(object, iteratee, keys);
  }
  function createBaseEach(eachFunc, fromRight) {
    return function(collection, iteratee) {
      if (collection == null) {
        return collection;
      }
      if (!isArrayLike(collection)) {
        return eachFunc(collection, iteratee);
      }
      var length = collection.length, index2 = fromRight ? length : -1, iterable = Object(collection);
      while (fromRight ? index2-- : ++index2 < length) {
        if (iteratee(iterable[index2], index2, iterable) === false) {
          break;
        }
      }
      return collection;
    };
  }
  var baseEach = createBaseEach(baseForOwn);
  const baseEach$1 = baseEach;
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
  function escape(string) {
    string = toString(string);
    return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar$1) : string;
  }
  function baseValues(object, props) {
    return arrayMap(props, function(key) {
      return object[key];
    });
  }
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
  const invert$1 = invert;
  var kebabCase = createCompounder(function(result, word, index2) {
    return result + (index2 ? "-" : "") + word.toLowerCase();
  });
  const kebabCase$1 = kebabCase;
  function mapValues(object, iteratee) {
    var result = {};
    iteratee = baseIteratee(iteratee);
    baseForOwn(object, function(value, key, object2) {
      baseAssignValue(result, key, iteratee(value, key, object2));
    });
    return result;
  }
  var objectProto$1 = Object.prototype;
  var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
  function customDefaultsAssignIn(objValue, srcValue, key, object) {
    if (objValue === void 0 || eq(objValue, objectProto$1[key]) && !hasOwnProperty$1.call(object, key)) {
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
  var hasOwnProperty = objectProto.hasOwnProperty;
  function template(string, options, guard) {
    var settings2 = templateSettings$1.imports._.templateSettings || templateSettings$1;
    if (guard && isIterateeCall(string, options, guard)) {
      options = void 0;
    }
    string = toString(string);
    options = extendWith({}, options, settings2, customDefaultsAssignIn);
    var imports = extendWith({}, options.imports, settings2.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
    var isEscaping, isEvaluating, index2 = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
    var reDelimiters = RegExp(
      (options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate$1 ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$",
      "g"
    );
    var sourceURL = hasOwnProperty.call(options, "sourceURL") ? "//# sourceURL=" + (options.sourceURL + "").replace(/\s/g, " ") + "\n" : "";
    string.replace(reDelimiters, function(match2, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
      interpolateValue || (interpolateValue = esTemplateValue);
      source += string.slice(index2, offset).replace(reUnescapedString, escapeStringChar);
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
    var variable = hasOwnProperty.call(options, "variable") && options.variable;
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
  var __spreadArray = globalThis && globalThis.__spreadArray || function(to, from, pack) {
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
    return ua !== "" && userAgentRules.reduce(function(matched, _a2) {
      var browser = _a2[0], regex = _a2[1];
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
      var _a2 = operatingSystemRules[ii], os = _a2[0], regex = _a2[1];
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
  const createNumberValidator = (start, end) => (val) => typeof val === "number" && start <= val && val <= end;
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
  const readSettings = () => mapValues(
    settingDefinitions,
    ({ key, default: defaultVal }) => GM_getValue(key, defaultVal)
  );
  const writeableSettings = Vue.reactive(readSettings());
  const settings = writeableSettings;
  if (DISABLE_STREAM_DOWNLOAD && settings.streamDownload)
    writeableSettings.streamDownload = false;
  const startWatchSettings = functionOnce(() => {
    const settingRefs = Vue.toRefs(writeableSettings);
    forEach(settingRefs, (ref, key) => {
      const cur = settingDefinitions[key];
      Vue.watch(ref, (val) => {
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
  const _withScopeId = (n) => (Vue.pushScopeId("data-v-5e3261cd"), n = n(), Vue.popScopeId(), n);
  const _hoisted_1$2 = ["title"];
  const _hoisted_2$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ Vue.createElementVNode("i", { class: "fa fa-times" }, null, -1));
  const _hoisted_3$1 = [
    _hoisted_2$1
  ];
  const _hoisted_4$1 = { class: "download-item__title" };
  const _hoisted_5$1 = { class: "download-item__progress-text" };
  const _sfc_main$3 = /* @__PURE__ */ Vue.defineComponent({
    __name: "DownloadItem",
    props: {
      item: null,
      index: null
    },
    setup(__props) {
      const props = __props;
      const title = Vue.computed(() => props.item.gallery.title);
      const progressWidth = Vue.computed(() => {
        const {
          gallery: { pages: pages2 },
          done,
          compressing,
          compressingPercent
        } = props.item;
        const page = pages2.length;
        return compressing ? compressingPercent : page && done ? (100 * done / page).toFixed(2) : 0;
      });
      const canCancel = Vue.computed(() => !props.item.compressing);
      const cancel = () => {
        var _a2;
        const { info } = props.index === 0 ? dlQueue.queue[0] : removeAt(dlQueue.queue, props.index);
        (_a2 = info == null ? void 0 : info.cancel) == null ? void 0 : _a2.call(info);
      };
      return (_ctx, _cache) => {
        return Vue.openBlock(), Vue.createElementBlock("div", {
          class: Vue.normalizeClass(["download-item", {
            "download-item--error": __props.item.error,
            "download-item--compressing": __props.item.compressing && !__props.item.error,
            "download-item--can-cancel": Vue.unref(canCancel)
          }]),
          title: Vue.unref(title)
        }, [
          Vue.unref(canCancel) ? (Vue.openBlock(), Vue.createElementBlock("div", {
            key: 0,
            class: "download-item__cancel",
            onClick: cancel
          }, _hoisted_3$1)) : Vue.createCommentVNode("", true),
          Vue.createElementVNode("div", _hoisted_4$1, Vue.toDisplayString(Vue.unref(title)), 1),
          Vue.createElementVNode("div", {
            class: "download-item__progress",
            style: Vue.normalizeStyle({ width: `${Vue.unref(progressWidth)}%` })
          }, [
            Vue.createElementVNode("div", _hoisted_5$1, Vue.toDisplayString(Vue.unref(progressWidth)) + "%", 1)
          ], 4)
        ], 10, _hoisted_1$2);
      };
    }
  });
  const DownloadItem_vue_vue_type_style_index_0_scoped_5e3261cd_lang = "";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const DownloadItem = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-5e3261cd"]]);
  const _hoisted_1$1 = { id: "download-panel" };
  const _sfc_main$2 = /* @__PURE__ */ Vue.defineComponent({
    __name: "DownloadList",
    props: {
      zipList: null,
      dlList: null
    },
    setup(__props) {
      return (_ctx, _cache) => {
        return Vue.openBlock(), Vue.createElementBlock("div", _hoisted_1$1, [
          (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(__props.zipList, (item, index2) => {
            return Vue.openBlock(), Vue.createBlock(DownloadItem, {
              key: index2,
              item,
              index: index2
            }, null, 8, ["item", "index"]);
          }), 128)),
          (Vue.openBlock(true), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(__props.dlList, (item, index2) => {
            return Vue.openBlock(), Vue.createBlock(DownloadItem, {
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
  const DownloadList = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-658acab9"]]);
  const _sfc_main$1 = /* @__PURE__ */ Vue.defineComponent({
    __name: "DownloadPanel",
    setup(__props) {
      const { title } = document;
      const zipList = Vue.computed(() => zipQueue.queue.map(({ info }) => info));
      const dlList = Vue.computed(() => dlQueue.queue.map(({ info }) => info));
      const infoList = Vue.computed(() => [...zipList.value, ...dlList.value]);
      const error = Vue.computed(() => {
        var _a2;
        return !!((_a2 = dlList.value[0]) == null ? void 0 : _a2.error);
      });
      const titleWithStatus = Vue.computed(() => {
        if (error.value)
          return `[\xD7] ${title}`;
        const len = infoList.value.length;
        return `[${len || "\u2713"}] ${title}`;
      });
      Vue.watch(infoList, (val) => {
        sessionStorage.setItem("downloadQueue", JSON.stringify(val.map(({ gallery: gallery2 }) => gallery2)));
      });
      Vue.watch(titleWithStatus, (val) => {
        document.title = val;
      });
      return (_ctx, _cache) => {
        return Vue.unref(infoList).length ? (Vue.openBlock(), Vue.createBlock(DownloadList, {
          key: 0,
          "zip-list": Vue.unref(zipList),
          "dl-list": Vue.unref(dlList)
        }, null, 8, ["zip-list", "dl-list"])) : Vue.createCommentVNode("", true);
      };
    }
  });
  /*! Element Plus Icons Vue v2.0.9 */
  var export_helper_default = (sfc, props) => {
    let target = sfc.__vccOpts || sfc;
    for (let [key, val] of props)
      target[key] = val;
    return target;
  };
  var _sfc_main80 = {
    name: "Delete"
  }, _hoisted_180 = {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, _hoisted_280 = /* @__PURE__ */ Vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
  }, null, -1), _hoisted_379 = [
    _hoisted_280
  ];
  function _sfc_render80(_ctx, _cache, $props, $setup, $data, $options) {
    return Vue.openBlock(), Vue.createElementBlock("svg", _hoisted_180, _hoisted_379);
  }
  var delete_default = /* @__PURE__ */ export_helper_default(_sfc_main80, [["render", _sfc_render80], ["__file", "delete.vue"]]);
  var _sfc_main91 = {
    name: "Download"
  }, _hoisted_191 = {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, _hoisted_291 = /* @__PURE__ */ Vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64zm384-253.696 236.288-236.352 45.248 45.248L508.8 704 192 387.2l45.248-45.248L480 584.704V128h64v450.304z"
  }, null, -1), _hoisted_390 = [
    _hoisted_291
  ];
  function _sfc_render91(_ctx, _cache, $props, $setup, $data, $options) {
    return Vue.openBlock(), Vue.createElementBlock("svg", _hoisted_191, _hoisted_390);
  }
  var download_default = /* @__PURE__ */ export_helper_default(_sfc_main91, [["render", _sfc_render91], ["__file", "download.vue"]]);
  var _sfc_main275 = {
    name: "Upload"
  }, _hoisted_1275 = {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, _hoisted_2275 = /* @__PURE__ */ Vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64zm384-578.304V704h-64V247.296L237.248 490.048 192 444.8 508.8 128l316.8 316.8-45.312 45.248L544 253.696z"
  }, null, -1), _hoisted_3274 = [
    _hoisted_2275
  ];
  function _sfc_render275(_ctx, _cache, $props, $setup, $data, $options) {
    return Vue.openBlock(), Vue.createElementBlock("svg", _hoisted_1275, _hoisted_3274);
  }
  var upload_default = /* @__PURE__ */ export_helper_default(_sfc_main275, [["render", _sfc_render275], ["__file", "upload.vue"]]);
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
        var _a2;
        return resolve((_a2 = input.files) == null ? void 0 : _a2[0]);
      }
    });
    input.click();
  });
  const pickAndReadFile = async (accept) => {
    const file = await pickFile(accept);
    if (file)
      return readFile(file);
  };
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
  const addResourceStyle = (name) => GM_addStyle(GM_getResourceText(name));
  const elementPlus = functionOnce(() => {
    const win = window;
    if (!win.Vue)
      win.Vue = Vue__namespace;
    eval(GM_getResourceText("elementPlus"));
    addResourceStyle("elementPlusCss");
    return win.ElementPlus;
  });
  const showMessage = (params) => elementPlus().ElMessage({ ...params, appendTo: monkeyWindow.document.body });
  const _hoisted_1 = { class: "nhentai-helper-setting-help-buttons no-sl" };
  const _hoisted_2 = /* @__PURE__ */ Vue.createTextVNode("Help");
  const _hoisted_3 = /* @__PURE__ */ Vue.createTextVNode("\u8BF4\u660E");
  const _hoisted_4 = ["id"];
  const _hoisted_5 = { id: "nhentai-helper-setting-dialog" };
  const _hoisted_6 = /* @__PURE__ */ Vue.createElementVNode("div", {
    class: "asterisk-left no-sl",
    style: { "margin-bottom": "18px" }
  }, " means refresh is required to take effect ", -1);
  const _hoisted_7 = /* @__PURE__ */ Vue.createTextVNode("Advance Settings");
  const _hoisted_8 = /* @__PURE__ */ Vue.createTextVNode("Download History");
  const _hoisted_9 = { class: "no-sl" };
  const _hoisted_10 = /* @__PURE__ */ Vue.createTextVNode("Export");
  const _hoisted_11 = /* @__PURE__ */ Vue.createTextVNode("Import");
  const _hoisted_12 = /* @__PURE__ */ Vue.createTextVNode("Clear");
  const _hoisted_13 = /* @__PURE__ */ Vue.createElementVNode("p", { class: "no-sl" }, "Notice: Import will not clear the existing history, but merges with it.", -1);
  const _sfc_main = /* @__PURE__ */ Vue.defineComponent({
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
      const show = Vue.ref(false);
      const downloadNum = Vue.ref(NaN);
      const filenameLengthNumber = Vue.computed({
        get: () => typeof writeableSettings.filenameLength === "number" ? writeableSettings.filenameLength : 0,
        set: (val) => {
          writeableSettings.filenameLength = val;
        }
      });
      const filenameLengthAuto = Vue.computed({
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
      const exporting = Vue.ref(false);
      const importing = Vue.ref(false);
      const clearing = Vue.ref(false);
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
        const _component_el_button = Vue.resolveComponent("el-button");
        const _component_el_slider = Vue.resolveComponent("el-slider");
        const _component_el_form_item = Vue.resolveComponent("el-form-item");
        const _component_el_switch = Vue.resolveComponent("el-switch");
        const _component_el_input = Vue.resolveComponent("el-input");
        const _component_el_input_number = Vue.resolveComponent("el-input-number");
        const _component_el_checkbox = Vue.resolveComponent("el-checkbox");
        const _component_el_divider = Vue.resolveComponent("el-divider");
        const _component_el_form = Vue.resolveComponent("el-form");
        const _component_el_popconfirm = Vue.resolveComponent("el-popconfirm");
        const _component_el_dialog = Vue.resolveComponent("el-dialog");
        return Vue.openBlock(), Vue.createBlock(_component_el_dialog, {
          modelValue: show.value,
          "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => show.value = $event),
          center: true,
          top: "50px"
        }, {
          header: Vue.withCtx(({ titleId, titleClass }) => [
            Vue.createElementVNode("div", _hoisted_1, [
              Vue.createVNode(_component_el_button, {
                size: "small",
                onClick: openHelp
              }, {
                default: Vue.withCtx(() => [
                  _hoisted_2
                ]),
                _: 1
              }),
              Vue.createVNode(_component_el_button, {
                size: "small",
                onClick: openHelpCn
              }, {
                default: Vue.withCtx(() => [
                  _hoisted_3
                ]),
                _: 1
              })
            ]),
            Vue.createElementVNode("span", {
              id: titleId,
              class: Vue.normalizeClass([titleClass, "no-sl"])
            }, "Settings", 10, _hoisted_4)
          ]),
          default: Vue.withCtx(() => [
            Vue.createElementVNode("div", _hoisted_5, [
              _hoisted_6,
              Vue.createVNode(_component_el_form, {
                "label-width": "auto",
                "label-position": "left"
              }, {
                default: Vue.withCtx(() => [
                  Vue.createVNode(_component_el_form_item, {
                    class: "m-b-32",
                    label: "Download thread"
                  }, {
                    default: Vue.withCtx(() => [
                      Vue.createVNode(_component_el_slider, {
                        modelValue: Vue.unref(writeableSettings).threadNum,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => Vue.unref(writeableSettings).threadNum = $event),
                        min: 1,
                        max: 32,
                        marks: threadNumMarks
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  Vue.createVNode(_component_el_form_item, {
                    class: "refresh-required",
                    label: "Open on new tab"
                  }, {
                    default: Vue.withCtx(() => [
                      Vue.createVNode(_component_el_switch, {
                        modelValue: Vue.unref(writeableSettings).openOnNewTab,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => Vue.unref(writeableSettings).openOnNewTab = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  Vue.createVNode(_component_el_form_item, { label: "Compression filename" }, {
                    default: Vue.withCtx(() => [
                      Vue.createVNode(_component_el_input, {
                        modelValue: Vue.unref(writeableSettings).compressionFileName,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => Vue.unref(writeableSettings).compressionFileName = $event),
                        placeholder: Vue.unref(settingDefinitions).compressionFileName.default,
                        onBlur: _cache[3] || (_cache[3] = ($event) => {
                          if (!Vue.unref(writeableSettings).compressionFileName) {
                            Vue.unref(writeableSettings).compressionFileName = Vue.unref(settingDefinitions).compressionFileName.default;
                          }
                        })
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                  }),
                  Vue.createVNode(_component_el_form_item, {
                    class: "m-b-32",
                    label: "Compression level"
                  }, {
                    default: Vue.withCtx(() => [
                      Vue.createVNode(_component_el_slider, {
                        modelValue: Vue.unref(writeableSettings).compressionLevel,
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => Vue.unref(writeableSettings).compressionLevel = $event),
                        min: 0,
                        max: 9,
                        marks: compressionLevelMarks
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  Vue.createVNode(_component_el_form_item, { label: "Filename length" }, {
                    default: Vue.withCtx(() => [
                      Vue.createVNode(_component_el_input_number, {
                        modelValue: Vue.unref(filenameLengthNumber),
                        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => Vue.isRef(filenameLengthNumber) ? filenameLengthNumber.value = $event : null),
                        min: 0,
                        "value-on-clear": Vue.unref(settingDefinitions).filenameLength.default,
                        "step-strictly": true,
                        disabled: Vue.unref(writeableSettings).filenameLength === "auto"
                      }, null, 8, ["modelValue", "value-on-clear", "disabled"]),
                      Vue.createVNode(_component_el_checkbox, {
                        modelValue: Vue.unref(filenameLengthAuto),
                        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => Vue.isRef(filenameLengthAuto) ? filenameLengthAuto.value = $event : null),
                        class: "m-l-16",
                        label: "Auto"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  Vue.createVNode(_component_el_form_item, { label: "Auto cancel downloaded manga" }, {
                    default: Vue.withCtx(() => [
                      Vue.createVNode(_component_el_switch, {
                        modelValue: Vue.unref(writeableSettings).autoCancelDownloadedManga,
                        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => Vue.unref(writeableSettings).autoCancelDownloadedManga = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  Vue.createVNode(_component_el_form_item, { label: "Auto retry when error occurs" }, {
                    default: Vue.withCtx(() => [
                      Vue.createVNode(_component_el_switch, {
                        modelValue: Vue.unref(writeableSettings).autoRetryWhenErrorOccurs,
                        "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => Vue.unref(writeableSettings).autoRetryWhenErrorOccurs = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  Vue.createVNode(_component_el_form_item, { label: "Auto show all" }, {
                    default: Vue.withCtx(() => [
                      Vue.createVNode(_component_el_switch, {
                        modelValue: Vue.unref(writeableSettings).autoShowAll,
                        "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => Vue.unref(writeableSettings).autoShowAll = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  Vue.createVNode(_component_el_form_item, {
                    class: "refresh-required",
                    label: "Show ignore button"
                  }, {
                    default: Vue.withCtx(() => [
                      Vue.createVNode(_component_el_switch, {
                        modelValue: Vue.unref(writeableSettings).showIgnoreButton,
                        "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => Vue.unref(writeableSettings).showIgnoreButton = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  Vue.createVNode(_component_el_divider, null, {
                    default: Vue.withCtx(() => [
                      _hoisted_7
                    ]),
                    _: 1
                  }),
                  Vue.createVNode(_component_el_form_item, { label: "Custom download URL" }, {
                    default: Vue.withCtx(() => [
                      Vue.createVNode(_component_el_input, {
                        modelValue: Vue.unref(writeableSettings).customDownloadUrl,
                        "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => Vue.unref(writeableSettings).customDownloadUrl = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  Vue.createVNode(_component_el_form_item, { label: 'Compression "streamFiles"' }, {
                    default: Vue.withCtx(() => [
                      Vue.createVNode(_component_el_switch, {
                        modelValue: Vue.unref(writeableSettings).compressionStreamFiles,
                        "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => Vue.unref(writeableSettings).compressionStreamFiles = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  Vue.createVNode(_component_el_form_item, { label: "Series mode" }, {
                    default: Vue.withCtx(() => [
                      Vue.createVNode(_component_el_switch, {
                        modelValue: Vue.unref(writeableSettings).seriesMode,
                        "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => Vue.unref(writeableSettings).seriesMode = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  Vue.createVNode(_component_el_form_item, { label: "Stream download" }, {
                    default: Vue.withCtx(() => [
                      Vue.createVNode(_component_el_switch, {
                        modelValue: Vue.unref(writeableSettings).streamDownload,
                        "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => Vue.unref(writeableSettings).streamDownload = $event),
                        disabled: Vue.unref(DISABLE_STREAM_DOWNLOAD)
                      }, null, 8, ["modelValue", "disabled"])
                    ]),
                    _: 1
                  }),
                  Vue.unref(IS_NHENTAI) ? (Vue.openBlock(), Vue.createBlock(_component_el_form_item, {
                    key: 0,
                    class: "refresh-required",
                    label: "Prevent console clearing"
                  }, {
                    default: Vue.withCtx(() => [
                      Vue.createVNode(_component_el_switch, {
                        modelValue: Vue.unref(writeableSettings).preventConsoleClearing,
                        "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => Vue.unref(writeableSettings).preventConsoleClearing = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  })) : Vue.createCommentVNode("", true)
                ]),
                _: 1
              }),
              Vue.createVNode(_component_el_divider, null, {
                default: Vue.withCtx(() => [
                  _hoisted_8
                ]),
                _: 1
              }),
              Vue.createElementVNode("p", _hoisted_9, " You have downloaded " + Vue.toDisplayString(downloadNum.value) + " manga on this site using nHentai Helper. ", 1),
              Vue.createVNode(_component_el_button, {
                type: "primary",
                icon: Vue.unref(download_default),
                disabled: !downloadNum.value,
                loading: exporting.value,
                onClick: exportHistory
              }, {
                default: Vue.withCtx(() => [
                  _hoisted_10
                ]),
                _: 1
              }, 8, ["icon", "disabled", "loading"]),
              Vue.createVNode(_component_el_button, {
                type: "primary",
                icon: Vue.unref(upload_default),
                loading: importing.value,
                onClick: importHistory
              }, {
                default: Vue.withCtx(() => [
                  _hoisted_11
                ]),
                _: 1
              }, 8, ["icon", "loading"]),
              Vue.createVNode(_component_el_popconfirm, {
                title: "Are you sure?",
                placement: "top",
                onConfirm: clearHistory
              }, {
                reference: Vue.withCtx(() => [
                  Vue.createVNode(_component_el_button, {
                    type: "danger",
                    icon: Vue.unref(delete_default),
                    loading: clearing.value
                  }, {
                    default: Vue.withCtx(() => [
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
          const i = this.taskIndex++;
          if (i >= this.tasks.length)
            break;
          const { abort, promise } = this.taskFunc(this.tasks[i], threadId, this.params);
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
    var _a2;
    let doc = document;
    if (!IS_PAGE_MANGA_DETAIL) {
      const html = await getText(`/g/${gid}`);
      const match = (_a2 = /gallery(\(\{[\s\S]+\}\));/.exec(html)) == null ? void 0 : _a2[1];
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
    $doc.find("#thumbnail-container img").each((i, img) => {
      var _a3;
      const src = (_a3 = img.dataset.src) != null ? _a3 : img.src;
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
      var _a2, _b2;
      if (gid2)
        return getGallery(gid2);
      const gidFromUrl = (_a2 = /^\/g\/(\d+)/.exec(location.pathname)) == null ? void 0 : _a2[1];
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
      (img, i) => ({ i: i + 1, t: NHentaiImgExt[img.t] })
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
      pages2 = pages2.filter(({ i }) => rangeCheckers.some((check) => check(i)));
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
    const info = Vue.reactive(createMangaDownloadInfo(gallery2));
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
      var _a2;
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
        if (downloaded && !await downloadAgainConfirm(gallery2.title)) {
          progressDisplayController.reset();
          markAsDownloaded(gallery2.gid, gallery2.title);
          ignoreController == null ? void 0 : ignoreController.setStatus(true);
          return;
        }
        await ((_a2 = await downloadGalleryByInfo(createMangaDownloadInfo(gallery2), {
          progressDisplayController,
          rangeCheckers
        })) == null ? void 0 : _a2());
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
    var _a2;
    const $gallery = $__default.default(this);
    if ($gallery.attr("init"))
      return;
    $gallery.attr("init", "true");
    const $a = $gallery.find("a.cover");
    if (settings.openOnNewTab)
      $a.attr("target", "_blank");
    const gid2 = (_a2 = /\/g\/([0-9]+)/.exec($a.attr("href"))) == null ? void 0 : _a2[1];
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
  const createAppAndMount = (component, appInitFunc) => {
    const el = document.createElement("div");
    document.body.append(el);
    const app = Vue.createApp(component);
    appInitFunc == null ? void 0 : appInitFunc(app);
    return app.mount(el);
  };
  const initSettingsDialogApp = functionOnce(
    () => createAppAndMount(_sfc_main, (app) => {
      app.use(elementPlus());
    })
  );
  const openSettingsDialog = () => {
    const dialog = initSettingsDialogApp();
    dialog.open();
  };
  addResourceStyle("notyCss");
  createAppAndMount(_sfc_main$1);
  initPage();
  GM_registerMenuCommand("Settings", openSettingsDialog);
})($, null, Vue, EventEmitter3, saveAs, localforage, MD5, Comlink, Noty, streamSaver);
