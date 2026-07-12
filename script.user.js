// ==UserScript==
// @name               nHentai Helper
// @name:zh-CN         nHentai 助手
// @name:zh-TW         nHentai 助手
// @namespace          https://github.com/Tsuk1ko
// @version            3.29.4
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
// @require            https://unpkg.com/vue@3.5.39/dist/vue.global.prod.js
// @require            data:application/javascript,%3B(()%20%3D%3E%20%7B%0A%09%09%09%09%09%09window.Vue%20%3D%20Vue%3B%0A%09%09%09%09%09%09if%20(!window.Date.now)%20window.Date.now%20%3D%20()%20%3D%3E%20(%2F*%20%40__PURE__%20*%2F%20new%20Date()).getTime()%3B%0A%09%09%09%09%09%7D)()%3B
// @require            https://unpkg.com/element-plus@2.14.3/dist/index.full.min.js
// @require            https://unpkg.com/jquery@3.7.1/dist/jquery.min.js
// @resource           element-plus-css  https://unpkg.com/element-plus@2.14.3/dist/index.css
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
// @grant              GM_info
// @grant              GM_openInTab
// @grant              GM_registerMenuCommand
// @grant              GM_setClipboard
// @grant              GM_setValue
// @grant              GM_xmlhttpRequest
// @grant              unsafeWindow
// @run-at             document-end
// @noframes
// ==/UserScript==

(function(vue, jquery, element_plus) {
	"use strict";
	var __create$1 = Object.create;
	var __defProp$1 = Object.defineProperty;
	var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames$1 = Object.getOwnPropertyNames;
	var __getProtoOf$1 = Object.getPrototypeOf;
	var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
	var __copyProps$1 = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames$1(from), i = 0, n = keys.length, key; i < n; i++) {
			key = keys[i];
			if (!__hasOwnProp$1.call(to, key) && key !== except) __defProp$1(to, key, {
				get: ((k) => from[k]).bind(null, key),
				enumerable: !(desc = __getOwnPropDesc$1(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toESM$1 = (mod, isNodeMode, target) => (target = mod != null ? __create$1(__getProtoOf$1(mod)) : {}, __copyProps$1(isNodeMode || !mod || !mod.__esModule ? __defProp$1(target, "default", {
		value: mod,
		enumerable: true
	}) : target, mod));
	vue = __toESM$1(vue);
	jquery = __toESM$1(jquery);
	var s = new Set();
	var _css = async (t) => {
		if (s.has(t)) return;
		s.add(t);
		((c) => {
			if (typeof GM_addStyle === "function") GM_addStyle(c);
			else (document.head || document.documentElement).appendChild(document.createElement("style")).append(c);
		})(t);
	};
	_css(" .download-item[data-v-e90bde63]{white-space:nowrap;color:#ffffffe6;padding:2px;position:relative;overflow:visible}.download-item--can-cancel[data-v-e90bde63]:hover{width:calc(100% - 30px)}.download-item__cancel[data-v-e90bde63]{cursor:pointer;color:#f44336;width:30px;font-size:20px;line-height:30px;position:absolute;top:0;right:-30px}.download-item__title[data-v-e90bde63]{text-overflow:ellipsis;text-align:left;overflow:hidden}.download-item__progress[data-v-e90bde63]{background-color:#0000ff80;line-height:10px}.download-item--error .download-item__progress[data-v-e90bde63]{background-color:#ff000080}.download-item--compressing .download-item__progress[data-v-e90bde63]{background-color:#00ff0080}.download-item__progress-text[data-v-e90bde63]{transform:scale(.8)}#download-panel[data-v-b1f64280]{z-index:100;background-color:#000000b3;width:calc(50vw - 620px);min-width:150px;max-width:300px;max-height:60vh;font-size:12px;position:fixed;top:20vh;right:0;overflow:hidden scroll}#download-panel[data-v-b1f64280]::-webkit-scrollbar{background-color:#000000b3;width:6px}#download-panel[data-v-b1f64280]::-webkit-scrollbar-thumb{background-color:#fff9}.gap-inputs[data-v-577c6dc6]{gap:4px 12px;display:flex}.gap-inputs[data-v-577c6dc6] .el-button{margin:0}.collect-log-tip[data-v-577c6dc6]{margin-top:12px;line-height:1.5}.inline-item[data-v-5c8e4767]{display:inline-block}.inline-item[data-v-5c8e4767]:not(:last-of-type){margin-right:8px}.inline-item__name[data-v-5c8e4767]{-webkit-user-select:none;user-select:none;margin-right:4px}.monospace[data-v-e4fd1f32]{font-family:monospace}span.monospace[data-v-e4fd1f32]{-webkit-user-select:none;user-select:none}.downloaded-title-color-preview[data-v-297ff1d5]{width:unset!important;height:unset!important;inset:unset!important;-webkit-user-select:none!important;user-select:none!important;border-radius:0!important;margin-left:8px!important;padding:4px 16px!important;position:relative!important}.comic-info-tags-extra-include-popper .el-select-dropdown__footer{padding:0}.is-error[data-v-b6830946]{--el-input-border-color:var(--el-color-danger);--el-input-hover-border-color:var(--el-color-danger);--el-input-focus-border-color:var(--el-color-danger)}.nhentai-helper-setting-help-buttons[data-v-6b8ca407]{float:left;position:absolute}#nhentai-helper-setting-dialog-outside{width:80%;max-width:800px}#nhentai-helper-setting-dialog-outside .no-sl{-webkit-user-select:none;user-select:none}#nhentai-helper-setting-dialog .asterisk-example:before{content:\"*\";color:var(--el-color-danger);margin-right:4px}#nhentai-helper-setting-dialog label{font-weight:unset}#nhentai-helper-setting-dialog input:not([type=file]):not([type=checkbox]),#nhentai-helper-setting-dialog textarea{background:inherit;color:var(--el-input-text-color,var(--el-text-color-regular))}#nhentai-helper-setting-dialog .el-input.is-disabled .el-input__inner{color:var(--el-disabled-text-color)}#nhentai-helper-setting-dialog .el-slider__stop{border:solid 1px var(--el-slider-runway-bg-color)}#nhentai-helper-setting-dialog .el-form-item:last-of-type{margin-bottom:0}#nhentai-helper-setting-dialog .el-form-item.refresh-required>.el-form-item__label-wrap>.el-form-item__label:after{content:\"*\";color:var(--el-color-danger);margin-left:4px}#nhentai-helper-setting-dialog .el-form-item__content .el-link.is-underline:hover:after{bottom:8px}#nhentai-helper-setting-dialog .el-divider__text{color:var(--el-text-color-secondary);-webkit-user-select:none;user-select:none}#nhentai-helper-setting-dialog .m-l-16{margin-left:16px}#nhentai-helper-setting-dialog .m-b-32{margin-bottom:32px}#nhentai-helper-setting-dialog .el-form-item__label{-webkit-user-select:none;user-select:none}#nhentai-helper-setting-dialog .el-table .el-input__prefix,#nhentai-helper-setting-dialog .el-table .el-input__suffix{line-height:30px}#nhentai-helper-setting-dialog .el-table__empty-block{display:none}#nhentai-helper-setting-dialog .el-link{color:var(--el-link-text-color)}#nhentai-helper-setting-dialog .el-link:hover{color:var(--el-link-hover-text-color)}#nhentai-helper-setting-dialog .el-collapse-item__header{font-family:inherit}.el-select-dropdown{-webkit-user-select:none;user-select:none}.bold[data-v-9fa42e74]{font-weight:700}.info-label[data-v-9fa42e74]{display:inline-block}.lang-zh .info-label[data-v-9fa42e74]{min-width:30px}.lang-en .info-label[data-v-9fa42e74]{min-width:80px}.info-tag-wrapper[data-v-9fa42e74]{display:flex}.info-tag[data-v-9fa42e74]{-webkit-user-select:none;user-select:none;margin:2px}.info-tag--pointer[data-v-9fa42e74]{cursor:pointer}.image-loading[data-v-9fa42e74]{background-color:#0009;width:100%;height:100%}.scroll-container[data-v-9fa42e74]{overscroll-behavior:none;min-height:400px;margin:8px -8px 0;overflow-y:auto}.scroll-container[data-v-9fa42e74]::-webkit-scrollbar{width:6px}.scroll-container[data-v-9fa42e74]::-webkit-scrollbar-thumb{background-color:#0003;border-radius:10px;transition:all .2s ease-in-out}.scroll-container[data-v-9fa42e74]::-webkit-scrollbar-track{border-radius:10px}.scroll-container-inner[data-v-9fa42e74]{padding:0 8px}.gallery-mini-popover .el-descriptions__header{align-items:flex-start!important}.gallery-mini-popover .el-descriptions__extra{white-space:nowrap;height:0}.gallery-mini-popover .el-descriptions__title{text-align:left!important}.gallery-mini-popover .el-descriptions__cell{display:flex;padding-bottom:0!important}.gallery-mini-popover .el-descriptions__label{flex-grow:0;flex-shrink:0}.gallery-mini-popover .el-descriptions__content{flex-grow:1;flex-shrink:1}.gallery-mini-popover .el-link{color:var(--el-link-text-color)!important}.gallery-mini-popover .el-link:hover{color:var(--el-link-hover-text-color)!important}.gallery-mini-popover .el-image{width:100%}.gallery-mini-popover-wrapper{overscroll-behavior:none;overflow:hidden}.gallery-mini-popover-wrapper .popover-transition{transition:var(--el-transition-all);transition-duration:.2s}.tags-filter[data-v-4057e360]{vertical-align:middle;align-items:center;padding-left:10px;display:inline-flex}.filter-option[data-v-4057e360]{text-align:center}.filter-option-group[data-v-4057e360] .el-select-group__title{text-align:left;padding:0 12px;line-height:24px}.filter-select[data-v-4057e360]{width:140px;margin-right:-140px}.filter-select[data-v-4057e360] .el-input__inner{color:var(--el-input-text-color,var(--el-text-color-regular))!important;background:0 0!important}@media screen and (width<=644px){.tags-filter[data-v-4057e360]{padding:10px 0}.filter-select[data-v-4057e360]{margin-right:0}}\n/*$vite$:1*/ ");
	var __create = Object.create;
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __getProtoOf = Object.getPrototypeOf;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
			key = keys[i];
			if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: ((k) => from[k]).bind(null, key),
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
		value: mod,
		enumerable: true
	}) : target, mod));
	var __require = ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, { get: (a, b) => (typeof require !== "undefined" ? require : a)[b] }) : x)(function(x) {
		if (typeof require !== "undefined") return require.apply(this, arguments);
		throw Error("Calling `require` for \"" + x + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
	});
	var _GM_addStyle = (() => typeof GM_addStyle != "undefined" ? GM_addStyle : void 0)();
	var _GM_getResourceText = (() => typeof GM_getResourceText != "undefined" ? GM_getResourceText : void 0)();
	var _GM_getValue = (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
	var _GM_info = (() => typeof GM_info != "undefined" ? GM_info : void 0)();
	var _GM_openInTab = (() => typeof GM_openInTab != "undefined" ? GM_openInTab : void 0)();
	var _GM_registerMenuCommand = (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
	var _GM_setClipboard = (() => typeof GM_setClipboard != "undefined" ? GM_setClipboard : void 0)();
	var _GM_setValue = (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
	var _GM_xmlhttpRequest = (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
	var _unsafeWindow = (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
	var _monkeyWindow = (() => window)();
	var WORKER_THREAD_NUM = Math.max(navigator.hardwareConcurrency - 1, 1);
	var { hostname } = location;
	var IS_NHENTAI = hostname === "nhentai.net";
	var IS_NHENTAI_TO = hostname === "nhentai.to" || hostname === "nhentai.website";
	var IS_NHENTAI_XXX = hostname === "nhentai.xxx";
	var MEDIA_URL_TEMPLATE_MAY_CHANGE = IS_NHENTAI || IS_NHENTAI_XXX;
	var MEDIA_URL_TEMPLATE_KEY = `media_url_template_${hostname}`;
	var THUMB_MEDIA_URL_TEMPLATE_KEY = `thumb_media_url_template_${hostname}`;
	var IDB_NAME = "nhentai_helper";
	function compact(arr) {
		const result = [];
		for (let i = 0; i < arr.length; i++) {
			const item = arr[i];
			if (item) result.push(item);
		}
		return result;
	}
	function difference(firstArr, secondArr) {
		const secondSet = new Set(secondArr);
		return firstArr.filter((item) => !secondSet.has(item));
	}
	function groupBy(arr, getKeyFromItem) {
		const result = {};
		for (let i = 0; i < arr.length; i++) {
			const item = arr[i];
			const key = getKeyFromItem(item, i, arr);
			if (!Object.hasOwn(result, key)) result[key] = [];
			result[key].push(item);
		}
		return result;
	}
	function intersection(firstArr, secondArr) {
		const secondSet = new Set(secondArr);
		return firstArr.filter((item) => secondSet.has(item));
	}
	function last(arr) {
		return arr[arr.length - 1];
	}
	function minBy(items, getValue) {
		if (items.length === 0) return;
		let minElement = items[0];
		let min = Infinity;
		for (let i = 0; i < items.length; i++) {
			const element = items[i];
			const value = getValue(element, i, items);
			if (Number.isNaN(value)) return element;
			if (value < min) {
				min = value;
				minElement = element;
			}
		}
		return minElement;
	}
	function sample(arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	}
	function without(array, ...values) {
		return difference(array, values);
	}
	var globalThis_ = typeof globalThis === "object" && globalThis || typeof window === "object" && window || typeof self === "object" && self || typeof global === "object" && global || (function() {
		return this;
	})();
	function debounce(func, debounceMs, { signal, edges } = {}) {
		let pendingThis = void 0;
		let pendingArgs = null;
		const leading = edges != null && edges.includes("leading");
		const trailing = edges == null || edges.includes("trailing");
		const invoke = () => {
			if (pendingArgs !== null) {
				func.apply(pendingThis, pendingArgs);
				pendingThis = void 0;
				pendingArgs = null;
			}
		};
		const onTimerEnd = () => {
			if (trailing) invoke();
			cancel();
		};
		let timeoutId = null;
		const schedule = () => {
			if (timeoutId != null) clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				timeoutId = null;
				onTimerEnd();
			}, debounceMs);
		};
		const cancelTimer = () => {
			if (timeoutId !== null) {
				clearTimeout(timeoutId);
				timeoutId = null;
			}
		};
		const cancel = () => {
			cancelTimer();
			pendingThis = void 0;
			pendingArgs = null;
		};
		const flush = () => {
			invoke();
		};
		const debounced = function(...args) {
			if (signal?.aborted) return;
			pendingThis = this;
			pendingArgs = args;
			const isFirstCall = timeoutId == null;
			schedule();
			if (leading && isFirstCall) invoke();
		};
		debounced.schedule = schedule;
		debounced.cancel = cancel;
		debounced.flush = flush;
		signal?.addEventListener("abort", cancel, { once: true });
		return debounced;
	}
	function flow(...funcs) {
		return function(...args) {
			let result = funcs.length ? funcs[0].apply(this, args) : args[0];
			for (let i = 1; i < funcs.length; i++) result = funcs[i].call(this, result);
			return result;
		};
	}
	function identity(x) {
		return x;
	}
	function noop$1() {}
	function once(func) {
		let called = false;
		let cache;
		return function(...args) {
			if (!called) {
				called = true;
				cache = func(...args);
			}
			return cache;
		};
	}
	function isPrimitive(value) {
		return value == null || typeof value !== "object" && typeof value !== "function";
	}
	function isBuffer(x) {
		return typeof globalThis_.Buffer !== "undefined" && globalThis_.Buffer.isBuffer(x);
	}
	function getSymbols(object) {
		return Object.getOwnPropertySymbols(object).filter((symbol) => Object.prototype.propertyIsEnumerable.call(object, symbol));
	}
	function getTag(value) {
		if (value == null) return value === void 0 ? "[object Undefined]" : "[object Null]";
		return Object.prototype.toString.call(value);
	}
	var regexpTag = "[object RegExp]";
	var stringTag = "[object String]";
	var numberTag = "[object Number]";
	var booleanTag = "[object Boolean]";
	var symbolTag = "[object Symbol]";
	var dateTag = "[object Date]";
	var mapTag = "[object Map]";
	var setTag = "[object Set]";
	var arrayTag = "[object Array]";
	var functionTag = "[object Function]";
	var arrayBufferTag = "[object ArrayBuffer]";
	var objectTag = "[object Object]";
	var errorTag = "[object Error]";
	var dataViewTag = "[object DataView]";
	var uint8ArrayTag = "[object Uint8Array]";
	var uint8ClampedArrayTag = "[object Uint8ClampedArray]";
	var uint16ArrayTag = "[object Uint16Array]";
	var uint32ArrayTag = "[object Uint32Array]";
	var bigUint64ArrayTag = "[object BigUint64Array]";
	var int8ArrayTag = "[object Int8Array]";
	var int16ArrayTag = "[object Int16Array]";
	var int32ArrayTag = "[object Int32Array]";
	var bigInt64ArrayTag = "[object BigInt64Array]";
	var float32ArrayTag = "[object Float32Array]";
	var float64ArrayTag = "[object Float64Array]";
	function isPlainObject$1(value) {
		if (!value || typeof value !== "object") return false;
		const proto = Object.getPrototypeOf(value);
		if (!(proto === null || proto === Object.prototype || Object.getPrototypeOf(proto) === null)) return false;
		return Object.prototype.toString.call(value) === "[object Object]";
	}
	function invert(obj) {
		const result = {};
		const keys = Object.keys(obj);
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			const value = obj[key];
			result[value] = key;
		}
		return result;
	}
	function mapValues(object, getNewValue) {
		const result = {};
		const keys = Object.keys(object);
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			const value = object[key];
			result[key] = getNewValue(value, key, object);
		}
		return result;
	}
	function isEqualsSameValueZero(value, other) {
		return value === other || Number.isNaN(value) && Number.isNaN(other);
	}
	function isEqualWith(a, b, areValuesEqual) {
		return isEqualWithImpl(a, b, void 0, void 0, void 0, void 0, areValuesEqual);
	}
	function isEqualWithImpl(a, b, property, aParent, bParent, stack, areValuesEqual) {
		const result = areValuesEqual(a, b, property, aParent, bParent, stack);
		if (result !== void 0) return result;
		if (typeof a === typeof b) switch (typeof a) {
			case "bigint":
			case "string":
			case "boolean":
			case "symbol":
			case "undefined": return a === b;
			case "number": return a === b || Object.is(a, b);
			case "function": return a === b;
			case "object": return areObjectsEqual(a, b, stack, areValuesEqual);
		}
		return areObjectsEqual(a, b, stack, areValuesEqual);
	}
	function areObjectsEqual(a, b, stack, areValuesEqual) {
		if (Object.is(a, b)) return true;
		let aTag = getTag(a);
		let bTag = getTag(b);
		if (aTag === "[object Arguments]") aTag = objectTag;
		if (bTag === "[object Arguments]") bTag = objectTag;
		if (aTag !== bTag) return false;
		switch (aTag) {
			case stringTag: return a.toString() === b.toString();
			case numberTag: return isEqualsSameValueZero(a.valueOf(), b.valueOf());
			case booleanTag:
			case dateTag:
			case symbolTag: return Object.is(a.valueOf(), b.valueOf());
			case regexpTag: return a.source === b.source && a.flags === b.flags;
			case functionTag: return a === b;
		}
		stack = stack ?? new Map();
		const aStack = stack.get(a);
		const bStack = stack.get(b);
		if (aStack != null && bStack != null) return aStack === b;
		stack.set(a, b);
		stack.set(b, a);
		try {
			switch (aTag) {
				case mapTag:
					if (a.size !== b.size) return false;
					for (const [key, value] of a.entries()) if (!b.has(key) || !isEqualWithImpl(value, b.get(key), key, a, b, stack, areValuesEqual)) return false;
					return true;
				case setTag: {
					if (a.size !== b.size) return false;
					const aValues = Array.from(a.values());
					const bValues = Array.from(b.values());
					for (let i = 0; i < aValues.length; i++) {
						const aValue = aValues[i];
						const index = bValues.findIndex((bValue) => {
							return isEqualWithImpl(aValue, bValue, void 0, a, b, stack, areValuesEqual);
						});
						if (index === -1) return false;
						bValues.splice(index, 1);
					}
					return true;
				}
				case arrayTag:
				case uint8ArrayTag:
				case uint8ClampedArrayTag:
				case uint16ArrayTag:
				case uint32ArrayTag:
				case bigUint64ArrayTag:
				case int8ArrayTag:
				case int16ArrayTag:
				case int32ArrayTag:
				case bigInt64ArrayTag:
				case float32ArrayTag:
				case float64ArrayTag:
					if (isBuffer(a) !== isBuffer(b)) return false;
					if (a.length !== b.length) return false;
					for (let i = 0; i < a.length; i++) if (!isEqualWithImpl(a[i], b[i], i, a, b, stack, areValuesEqual)) return false;
					return true;
				case arrayBufferTag:
					if (a.byteLength !== b.byteLength) return false;
					return areObjectsEqual(new Uint8Array(a), new Uint8Array(b), stack, areValuesEqual);
				case dataViewTag:
					if (a.byteLength !== b.byteLength || a.byteOffset !== b.byteOffset) return false;
					return areObjectsEqual(new Uint8Array(a), new Uint8Array(b), stack, areValuesEqual);
				case errorTag: return a.name === b.name && a.message === b.message;
				case objectTag: {
					if (!(areObjectsEqual(a.constructor, b.constructor, stack, areValuesEqual) || isPlainObject$1(a) && isPlainObject$1(b))) return false;
					const aKeys = [...Object.keys(a), ...getSymbols(a)];
					const bKeys = [...Object.keys(b), ...getSymbols(b)];
					if (aKeys.length !== bKeys.length) return false;
					for (let i = 0; i < aKeys.length; i++) {
						const propKey = aKeys[i];
						const aProp = a[propKey];
						if (!Object.hasOwn(b, propKey)) return false;
						const bProp = b[propKey];
						if (!isEqualWithImpl(aProp, bProp, propKey, a, b, stack, areValuesEqual)) return false;
					}
					return true;
				}
				default: return false;
			}
		} finally {
			stack.delete(a);
			stack.delete(b);
		}
	}
	function isEqual(a, b) {
		return isEqualWith(a, b, noop$1);
	}
	function isLength(value) {
		return Number.isSafeInteger(value) && value >= 0;
	}
	function isNil(x) {
		return x == null;
	}
	function isNotNil(x) {
		return x != null;
	}
	var htmlEscapes = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;",
		"'": "&#39;"
	};
	function escape$2(str) {
		return str.replace(/[&<>"']/g, (match) => htmlEscapes[match]);
	}
	function escapeRegExp$1(str) {
		return str.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
	}
	var __spreadArray = function(to, from, pack) {
		if (pack || arguments.length === 2) {
			for (var i = 0, l = from.length, ar; i < l; i++) if (ar || !(i in from)) {
				if (!ar) ar = Array.prototype.slice.call(from, 0, i);
				ar[i] = from[i];
			}
		}
		return to.concat(ar || Array.prototype.slice.call(from));
	};
	var BrowserInfo = function() {
		function BrowserInfo(name, version, os) {
			this.name = name;
			this.version = version;
			this.os = os;
			this.type = "browser";
		}
		return BrowserInfo;
	}();
	var NodeInfo = function() {
		function NodeInfo(version) {
			this.version = version;
			this.type = "node";
			this.name = "node";
			this.os = process.platform;
		}
		return NodeInfo;
	}();
	var SearchBotDeviceInfo = function() {
		function SearchBotDeviceInfo(name, version, os, bot) {
			this.name = name;
			this.version = version;
			this.os = os;
			this.bot = bot;
			this.type = "bot-device";
		}
		return SearchBotDeviceInfo;
	}();
	var BotInfo = function() {
		function BotInfo() {
			this.type = "bot";
			this.bot = true;
			this.name = "bot";
			this.version = null;
			this.os = null;
		}
		return BotInfo;
	}();
	var ReactNativeInfo = function() {
		function ReactNativeInfo() {
			this.type = "react-native";
			this.name = "react-native";
			this.version = null;
			this.os = null;
		}
		return ReactNativeInfo;
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
		["chromium-webview", /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
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
		if (!!userAgent) return parseUserAgent(userAgent);
		if (typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative") return new ReactNativeInfo();
		if (typeof navigator !== "undefined") return parseUserAgent(navigator.userAgent);
		return getNodeVersion();
	}
	function matchUserAgent(ua) {
		return ua !== "" && userAgentRules.reduce(function(matched, _a) {
			var browser = _a[0], regex = _a[1];
			if (matched) return matched;
			var uaMatch = regex.exec(ua);
			return !!uaMatch && [browser, uaMatch];
		}, false);
	}
	function parseUserAgent(ua) {
		var matchedRule = matchUserAgent(ua);
		if (!matchedRule) return null;
		var name = matchedRule[0], match = matchedRule[1];
		if (name === "searchbot") return new BotInfo();
		var versionParts = match[1] && match[1].split(".").join("_").split("_").slice(0, 3);
		if (versionParts) {
			if (versionParts.length < REQUIRED_VERSION_PARTS) versionParts = __spreadArray(__spreadArray([], versionParts, true), createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length), true);
		} else versionParts = [];
		var version = versionParts.join(".");
		var os = detectOS(ua);
		var searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua);
		if (searchBotMatch && searchBotMatch[1]) return new SearchBotDeviceInfo(name, version, os, searchBotMatch[1]);
		return new BrowserInfo(name, version, os);
	}
	function detectOS(ua) {
		for (var ii = 0, count = operatingSystemRules.length; ii < count; ii++) {
			var _a = operatingSystemRules[ii], os = _a[0];
			if (_a[1].exec(ua)) return os;
		}
		return null;
	}
	function getNodeVersion() {
		return typeof process !== "undefined" && process.version ? new NodeInfo(process.version.slice(1)) : null;
	}
	function createVersionParts(count) {
		var output = [];
		for (var ii = 0; ii < count; ii++) output.push("0");
		return output;
	}
	var useStyle = (style) => (0, vue.watchEffect)(() => {
		const styleEl = _GM_addStyle((0, vue.toValue)(style));
		(0, vue.onWatcherCleanup)(() => {
			styleEl.remove();
		});
	});
	function castArray(value) {
		if (arguments.length === 0) return [];
		return Array.isArray(value) ? value : [value];
	}
	function isArrayLike(value) {
		return value != null && typeof value !== "function" && isLength(value.length);
	}
	function toString$1(value) {
		if (value == null) return "";
		if (typeof value === "string") return value;
		if (Array.isArray(value)) return value.map(toString$1).join(",");
		const result = String(value);
		if (result === "0" && Object.is(Number(value), -0)) return "-0";
		return result;
	}
	function isObject$3(value) {
		return value !== null && (typeof value === "object" || typeof value === "function");
	}
	var IS_UNSIGNED_INTEGER = /^(?:0|[1-9]\d*)$/;
	function isIndex(value, length = Number.MAX_SAFE_INTEGER) {
		switch (typeof value) {
			case "number": return Number.isInteger(value) && value >= 0 && value < length;
			case "symbol": return false;
			case "string": return IS_UNSIGNED_INTEGER.test(value);
		}
	}
	function isIterateeCall(value, index, object) {
		if (!isObject$3(object)) return false;
		if (typeof index === "number" && isArrayLike(object) && isIndex(index) && index < object.length || typeof index === "string" && index in object) return isEqualsSameValueZero(object[index], value);
		return false;
	}
	function attempt(func, ...args) {
		try {
			return func(...args);
		} catch (e) {
			return e instanceof Error ? e : new Error(e);
		}
	}
	function defaults(object, ...sources) {
		object = Object(object);
		const objectProto = Object.prototype;
		let length = sources.length;
		const guard = length > 2 ? sources[2] : void 0;
		if (guard && isIterateeCall(sources[0], sources[1], guard)) length = 1;
		for (let i = 0; i < length; i++) {
			if (isNil(sources[i])) continue;
			const source = sources[i];
			const keys = Object.keys(source);
			for (let j = 0; j < keys.length; j++) {
				const key = keys[j];
				const value = object[key];
				if (value === void 0 || !Object.hasOwn(object, key) && isEqualsSameValueZero(value, objectProto[key])) object[key] = source[key];
			}
		}
		return object;
	}
	function escape$1(string) {
		return escape$2(toString$1(string));
	}
	var esTemplateRegExp = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
	var unEscapedRegExp = /['\n\r\u2028\u2029\\]/g;
	var noMatchExp = /($^)/;
	var escapeMap = new Map([
		["\\", "\\"],
		["'", "'"],
		["\n", "n"],
		["\r", "r"],
		["\u2028", "u2028"],
		["\u2029", "u2029"]
	]);
	function escapeString(match) {
		return `\\${escapeMap.get(match)}`;
	}
	var defaultInterpolateRegExp = /<%=([\s\S]+?)%>/g;
	var templateSettings = {
		escape: /<%-([\s\S]+?)%>/g,
		evaluate: /<%([\s\S]+?)%>/g,
		interpolate: defaultInterpolateRegExp,
		variable: "",
		imports: { _: {
			escape: escape$1,
			template
		} }
	};
	function template(string, options, guard) {
		string = toString$1(string);
		if (guard) options = templateSettings;
		options = defaults({ ...options }, templateSettings);
		const delimitersRegExp = new RegExp([
			options.escape?.source ?? noMatchExp.source,
			options.interpolate?.source ?? noMatchExp.source,
			options.interpolate === defaultInterpolateRegExp ? esTemplateRegExp.source : noMatchExp.source,
			options.evaluate?.source ?? noMatchExp.source,
			"$"
		].join("|"), "g");
		let lastIndex = 0;
		let isEvaluated = false;
		let source = `__p += ''`;
		for (const match of string.matchAll(delimitersRegExp)) {
			const [fullMatch, escapeValue, interpolateValue, esTemplateValue, evaluateValue] = match;
			const { index } = match;
			source += ` + '${string.slice(lastIndex, index).replace(unEscapedRegExp, escapeString)}'`;
			if (escapeValue) source += ` + _.escape(${escapeValue})`;
			if (interpolateValue) source += ` + ((${interpolateValue}) == null ? '' : ${interpolateValue})`;
			else if (esTemplateValue) source += ` + ((${esTemplateValue}) == null ? '' : ${esTemplateValue})`;
			if (evaluateValue) {
				source += `;\n${evaluateValue};\n __p += ''`;
				isEvaluated = true;
			}
			lastIndex = index + fullMatch.length;
		}
		const imports = defaults({ ...options.imports }, templateSettings.imports);
		const importsKeys = Object.keys(imports);
		const importValues = Object.values(imports);
		const sourceURL = `//# sourceURL=${options.sourceURL ? String(options.sourceURL).replace(/[\r\n]/g, " ") : `es-toolkit.templateSource[${Date.now()}]`}\n`;
		const compiledFunction = `function(${options.variable || "obj"}) {
    let __p = '';
    ${options.variable ? "" : "if (obj == null) { obj = {}; }"}
    ${isEvaluated ? `function print() { __p += Array.prototype.join.call(arguments, ''); }` : ""}
    ${options.variable ? source : `with(obj) {\n${source}\n}`}
    return __p;
  }`;
		const result = attempt(() => new Function(...importsKeys, `${sourceURL}return ${compiledFunction}`)(...importValues));
		result.source = compiledFunction;
		if (result instanceof Error) throw result;
		return result;
	}
	var supportLanguage = new Set(["zh", "en"]);
	var defaultLocale = (() => {
		const languages = castArray(navigator.languages || navigator.language);
		for (const language of languages) {
			const lang = language.split("-")[0];
			if (lang && supportLanguage.has(lang)) return lang;
		}
		return "en";
	})();
	var ErrorAction = function(ErrorAction) {
		ErrorAction["GET_INFO"] = "getInfo";
		ErrorAction["DOWNLOAD"] = "download";
		return ErrorAction;
	}({});
	var MIME = function(MIME) {
		MIME["JPG"] = "image/jpeg";
		MIME["PNG"] = "image/png";
		return MIME;
	}({});
	var removeAt = (array, index) => array.splice(index, 1)[0];
	var filterNotNil = (array) => array.filter(isNotNil);
	var objectEach = (object, iteratee) => {
		Object.entries(object).forEach(([key, value]) => {
			iteratee(value, key, object);
		});
	};
	var defaultSelector = {
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
		showAllImagesContainer: "#show-all-images-container",
		showAllImagesButton: "#show-all-images-button,#show-all-images-container > .btn.btn-secondary",
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
		mediaImage: "#image-container img",
		pageContainer: "#page-container"
	};
	var siteMap$1 = { "nhentai.xxx": {
		menuLeft: "ul.hd_left",
		gallery: ".gallery_item",
		galleryHref: ".gallery_item a",
		galleryList: ".main_wrap",
		galleryCover: "a",
		pjaxTrigger: ".pagination a, .sort_links a",
		pjaxTarget: ".main_wrap",
		paginationPrevious: ".pagination a:contains(Previous)",
		paginationNext: ".pagination a:contains(Next)",
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
		mediaImage: "#fimg",
		pageContainer: ".reader_outer"
	} };
	var selector = {
		...defaultSelector,
		...siteMap$1[location.hostname]
	};
	var sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	var compileTemplate = (tpl) => template(tpl, { interpolate: /\{\{([\s\S]+?)\}\}/g });
	var getDownloadExt = () => {
		const ext = last(settings.compressionFilename.split("."));
		if (ext) return ext.toLowerCase();
		return "zip";
	};
	var getCompressionOptions = () => {
		return {
			removeAdPage: settings.removeAdPage,
			streamFiles: settings.compressionStreamFiles,
			compression: settings.compressionLevel > 0 ? "DEFLATE" : "STORE",
			compressionOptions: { level: settings.compressionLevel }
		};
	};
	var getShowAllBtn = () => new Promise((resolve, reject) => {
		const $btn = (0, jquery.default)(selector.showAllImagesButton);
		if ($btn.length > 0) {
			resolve($btn);
			return;
		}
		const container = document.querySelector(selector.thumbnailContainer);
		if (!container) {
			reject(new Error("Show all button not found"));
			return;
		}
		new MutationObserver((mutations, self) => {
			mutations.forEach(({ addedNodes }) => {
				const btnContainer = addedNodes[0];
				if (btnContainer instanceof HTMLElement && btnContainer.matches(selector.showAllImagesContainer)) {
					self.disconnect();
					resolve((0, jquery.default)(selector.showAllImagesButton));
				}
			});
		}).observe(container, { childList: true });
	});
	var createMangaDownloadInfo = (gallery, needReactive = false) => {
		const info = {
			gallery,
			done: 0,
			compressing: false,
			compressingPercent: "0",
			error: false
		};
		if (needReactive) {
			(0, vue.markRaw)(info.gallery);
			return (0, vue.reactive)(info);
		}
		return info;
	};
	var tryParseJSON = (str) => {
		if (typeof str !== "string") return;
		try {
			return JSON.parse(str);
		} catch {}
	};
	var needRunComplexDebug = () => settings.collectLog || false;
	var alwaysFalse = () => false;
	var escapeRegExp = (str) => RegExp.escape?.(str) ?? escapeRegExp$1(str);
	var nHentaiDownloadHosts = [
		"i.nhentai.net",
		"i1.nhentai.net",
		"i2.nhentai.net",
		"i3.nhentai.net",
		"i4.nhentai.net",
		"i5.nhentai.net",
		"i7.nhentai.net"
	];
	var NHentaiDownloadHostSpecial = function(NHentaiDownloadHostSpecial) {
		NHentaiDownloadHostSpecial["AUTO"] = "auto";
		NHentaiDownloadHostSpecial["RANDOM"] = "random";
		NHentaiDownloadHostSpecial["BALANCE"] = "balance";
		return NHentaiDownloadHostSpecial;
	}({});
	var nHentaiDownloadHostSpecials = [
		"auto",
		"random",
		"balance"
	];
	var availableNHentaiDownloadHost = new Set([...nHentaiDownloadHostSpecials, ...nHentaiDownloadHosts]);
	var booleanValidator = (val) => typeof val === "boolean";
	var stringValidator = (val) => typeof val === "string";
	var createNumberValidator = (min, max) => (val) => typeof val === "number" && min <= val && val <= max;
	var trimFormatter = (val) => val.trim();
	var availableMetaFiles = ["ComicInfoXml", "EzeInfoJson"];
	var availableMetaFileTitleLanguage = new Set(["english", "japanese"]);
	var settingDefinitions = {
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
		comicInfoTagsExtraInclude: {
			key: "comic_info_tags_extra_include",
			default: () => [
				"character",
				"artist",
				"group"
			],
			validator: (val) => Array.isArray(val),
			itemValidator: stringValidator
		},
		comicInfoTagsExtraWithType: {
			key: "comic_info_tags_extra_with_type",
			default: true,
			validator: booleanValidator
		},
		titleReplacement: {
			key: "title_replacement",
			default: () => [],
			validator: (val) => Array.isArray(val),
			itemValidator: (item) => item && stringValidator(item.from) && stringValidator(item.to) && booleanValidator(item.regexp) && booleanValidator(item.ignoreCase),
			migrate: (val) => Array.isArray(val) && val.some((item) => !("ignoreCase" in item)) ? val.map((item) => ({
				...item,
				ignoreCase: false
			})) : val
		},
		titleBlacklist: {
			key: "title_blacklist",
			default: () => [],
			validator: (val) => Array.isArray(val),
			itemValidator: (item) => item && stringValidator(item.content) && booleanValidator(item.regexp) && booleanValidator(item.ignoreCase),
			migrate: (val) => Array.isArray(val) && val.some((item) => !("ignoreCase" in item)) ? val.map((item) => ({
				...item,
				ignoreCase: false
			})) : val
		},
		galleryContextmenuPreview: {
			key: "gallery_contextmenu_preview",
			default: false,
			validator: booleanValidator
		},
		convertWebpTo: {
			key: "convert_webp_to",
			default: MIME.JPG,
			validator: (val) => [
				MIME.JPG,
				MIME.PNG,
				""
			].includes(val)
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
		},
		downloadedTitleColor: {
			key: "downloaded_title_color",
			default: "rgb(153, 153, 153)",
			validator: stringValidator
		},
		collectLog: {
			key: "collect_log",
			default: false,
			validator: booleanValidator
		}
	};
	var browserDetect = detect();
	var DISABLE_STREAM_DOWNLOAD = !!browserDetect && (browserDetect.name === "safari" || browserDetect.name === "firefox");
	var readSettings = () => mapValues(settingDefinitions, ({ key, default: defaultVal, validator, itemValidator, migrate }) => {
		const realDefault = typeof defaultVal === "function" ? defaultVal() : defaultVal;
		let val = _GM_getValue(key, realDefault);
		if (migrate) val = migrate(val);
		if (!validator(val)) return realDefault;
		if (Array.isArray(val) && itemValidator) {
			const validItems = val.filter(itemValidator);
			if (val.length !== validItems.length) return realDefault;
		}
		return val;
	});
	var initSettings = () => {
		const settings = readSettings();
		{
			const key = "_flag_nHentai_media_host_reset_20241207";
			if (!_GM_getValue(key, false)) {
				const def = settingDefinitions.nHentaiDownloadHost;
				if (settings.nHentaiDownloadHost !== def.default) {
					settings.nHentaiDownloadHost = def.default;
					_GM_setValue(def.key, def.default);
				}
				_GM_setValue(key, true);
			}
		}
		return settings;
	};
	var writeableSettings = (0, vue.reactive)(initSettings());
	var settings = writeableSettings;
	if (DISABLE_STREAM_DOWNLOAD && settings.streamDownload) writeableSettings.streamDownload = false;
	var startWatchSettings = once(() => {
		objectEach((0, vue.toRefs)(writeableSettings), (ref, key) => {
			const cur = settingDefinitions[key];
			let valChanged = false;
			const saveValue = (val) => {
				logger.info("update setting", cur.key, (0, vue.toRaw)(val));
				_GM_setValue(cur.key, val);
			};
			(0, vue.watch)(ref, (val) => {
				if (valChanged) {
					valChanged = false;
					saveValue(val);
					return;
				}
				const applyChange = (newVal) => {
					val = newVal;
					ref.value = newVal;
					valChanged = true;
				};
				if (!cur.validator(val)) {
					applyChange(typeof cur.default === "function" ? cur.default() : cur.default);
					return;
				}
				if (Array.isArray(val) && cur.itemValidator) {
					const validItems = val.filter(cur.itemValidator);
					if (val.length !== validItems.length) applyChange(validItems);
				}
				if (cur.formatter) {
					const formattedVal = cur.formatter(val);
					if (typeof formattedVal === "object" ? !isEqual(val, formattedVal) : val !== formattedVal) applyChange(formattedVal);
				}
				if (!valChanged) saveValue(val);
			}, typeof ref.value === "object" ? { deep: true } : void 0);
		});
	});
	var replaceTitle = (0, vue.computed)(() => {
		const list = settings.titleReplacement.filter((item) => item?.from);
		if (!list.length) return identity;
		return flow(...list.map(({ from, to, regexp, ignoreCase }) => {
			try {
				const searchValue = regexp ? new RegExp(from, ignoreCase ? "gi" : "g") : ignoreCase ? new RegExp(escapeRegExp(from), "gi") : from;
				return (title) => title.replaceAll(searchValue, to);
			} catch (error) {
				logger.error("title replacement regexp:", error);
				return identity;
			}
		}));
	});
	var isTitleBlacklisted = (0, vue.computed)(() => {
		const list = settings.titleBlacklist.filter((item) => item?.content).map(({ content, regexp, ignoreCase }) => {
			if (regexp) try {
				const reg = new RegExp(content, ignoreCase ? "i" : void 0);
				return (title) => reg.test(title);
			} catch (error) {
				logger.error("title blacklist regexp:", error);
				return alwaysFalse;
			}
			if (ignoreCase) {
				const reg = new RegExp(escapeRegExp(content), "i");
				return (title) => reg.test(title);
			}
			return (title) => title.includes(content);
		});
		if (!list.length) return alwaysFalse;
		return (title) => list.some((fn) => fn(title));
	});
	var customFilenameFunction = (0, vue.computed)(() => {
		if (!settings.customFilenameFunction.trim()) return null;
		try {
			return new Function("filename", "gallery", settings.customFilenameFunction);
		} catch {
			return null;
		}
	});
	var applyDownloadedTitleColor = once(() => useStyle(() => `:root{--nh-helper-downloaded-title-color:${settings.downloadedTitleColor}}`));
	var LOG_PREFIX = "[nhentai-helper]";
	var logs = [];
	var stringifyReplacer = (key, value) => {
		if (typeof value === "bigint") return JSON.rawJSON?.(value.toString()) ?? Number(value);
		if (Array.isArray(value) || isPlainObject$1(value) || isPrimitive(value)) return value;
		if (value instanceof Error) return {
			$: "Error",
			name: value.name,
			message: value.message,
			stack: value.stack,
			cause: value.cause
		};
		if (value instanceof HTMLElement) return {
			$: "HTMLElement",
			tagName: value.tagName,
			attributes: Object.fromEntries(Array.from(value.attributes).map(({ name, value }) => [name, value]))
		};
		if (value instanceof NodeList) return Array.from(value);
		return String(value);
	};
	var stringifyArgs = (args) => args.map((arg) => typeof arg === "object" ? JSON.stringify(arg, stringifyReplacer) : String(arg)).join(" ");
	var collectLog = (method, args) => {
		const now = new Date();
		const prefix = `[${method}] ${now.toLocaleString("zh-CN")}:${now.getMilliseconds().toString().padStart(3, "0")}`;
		try {
			logs.push(`${prefix} ${stringifyArgs(args)}`);
		} catch {
			logs.push(`${prefix} ${args}`);
		}
	};
	var createLoggerFn = (method) => (...args) => {
		if (settings.collectLog) collectLog(method, args);
		if (method !== "debug" || false) console[method](LOG_PREFIX, ...args);
	};
	var logger = {
		debug: createLoggerFn("debug"),
		info: createLoggerFn("info"),
		warn: createLoggerFn("warn"),
		error: createLoggerFn("error")
	};
	var getInfoLog = once(() => stringifyArgs(["[debug] info", {
		extension: `${_GM_info.scriptHandler} ${_GM_info.version}`,
		userAgent: _GM_info.userAgentData,
		version: _GM_info.script.version
	}]));
	var exportLogs = () => [getInfoLog(), ...logs].join("\n");
	var clearLogs = () => {
		logs.length = 0;
	};
	(function($) {
		function fnPjax(selector, container, options) {
			options = optionsFor(container, options);
			return this.on("click.pjax", selector, function(event) {
				var opts = options;
				if (!opts.container) {
					opts = $.extend({}, options);
					opts.container = $(this).attr("data-pjax");
				}
				handleClick(event, opts);
			});
		}
		function handleClick(event, container, options) {
			options = optionsFor(container, options);
			var link = event.currentTarget;
			var $link = $(link);
			if (link.tagName.toUpperCase() !== "A") throw "$.fn.pjax or $.pjax.click requires an anchor element";
			if (event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
			if (location.protocol !== link.protocol || location.hostname !== link.hostname) return;
			if (link.href.indexOf("#") > -1 && stripHash(link) == stripHash(location)) return;
			if (event.isDefaultPrevented()) return;
			var defaults = {
				url: link.href,
				container: $link.attr("data-pjax"),
				target: link
			};
			var opts = $.extend({}, defaults, options);
			var clickEvent = $.Event("pjax:click");
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
			var $form = $(form);
			if (form.tagName.toUpperCase() !== "FORM") throw "$.pjax.submit requires a form element";
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
				if ($form.find(":file").length) return;
				defaults.data = $form.serializeArray();
			}
			pjax($.extend({}, defaults, options));
			event.preventDefault();
		}
		function pjax(options) {
			options = $.extend(true, {}, $.ajaxSettings, pjax.defaults, options);
			if ($.isFunction(options.url)) options.url = options.url();
			var hash = parseURL(options.url).hash;
			var containerType = $.type(options.container);
			if (containerType !== "string") throw "expected string value for 'container' option; got " + containerType;
			var context = options.context = $(options.container);
			if (!context.length) throw "the container selector '" + options.container + "' did not match anything";
			if (!options.data) options.data = {};
			if ($.isArray(options.data)) options.data.push({
				name: "_pjax",
				value: options.container
			});
			else options.data._pjax = options.container;
			function fire(type, args, props) {
				if (!props) props = {};
				props.relatedTarget = options.target;
				var event = $.Event(type, props);
				context.trigger(event, args);
				return !event.isDefaultPrevented();
			}
			var timeoutTimer;
			options.beforeSend = function(xhr, settings) {
				if (settings.type !== "GET") settings.timeout = 0;
				xhr.setRequestHeader("X-PJAX", "true");
				xhr.setRequestHeader("X-PJAX-Container", options.container);
				if (!fire("pjax:beforeSend", [xhr, settings])) return false;
				if (settings.timeout > 0) {
					timeoutTimer = setTimeout(function() {
						if (fire("pjax:timeout", [xhr, options])) xhr.abort("timeout");
					}, settings.timeout);
					settings.timeout = 0;
				}
				var url = parseURL(settings.url);
				if (hash) url.hash = hash;
				options.requestUrl = stripInternalParams(url);
			};
			options.complete = function(xhr, textStatus) {
				if (timeoutTimer) clearTimeout(timeoutTimer);
				fire("pjax:complete", [
					xhr,
					textStatus,
					options
				]);
				fire("pjax:end", [xhr, options]);
			};
			options.error = function(xhr, textStatus, errorThrown) {
				var container = extractContainer("", xhr, options);
				var allowed = fire("pjax:error", [
					xhr,
					textStatus,
					errorThrown,
					options
				]);
				if (options.type == "GET" && textStatus !== "abort" && allowed) locationReplace(container.url);
			};
			options.success = function(data, status, xhr) {
				var previousState = pjax.state;
				var currentVersion = typeof $.pjax.defaults.version === "function" ? $.pjax.defaults.version() : $.pjax.defaults.version;
				var latestVersion = xhr.getResponseHeader("X-PJAX-Version");
				var container = extractContainer(data, xhr, options);
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
				if (options.push || options.replace) window.history.replaceState(pjax.state, container.title, container.url);
				if ($.contains(context, document.activeElement)) try {
					document.activeElement.blur();
				} catch (e) {}
				if (container.title) document.title = container.title;
				fire("pjax:beforeReplace", [container.contents, options], {
					state: pjax.state,
					previousState
				});
				context.html(container.contents);
				var autofocusEl = context.find("input[autofocus], textarea[autofocus]").last()[0];
				if (autofocusEl && document.activeElement !== autofocusEl) autofocusEl.focus();
				executeScriptTags(container.scripts);
				var scrollTo = options.scrollTo;
				if (hash) {
					var name = decodeURIComponent(hash.slice(1));
					var target = document.getElementById(name) || document.getElementsByName(name)[0];
					if (target) scrollTo = $(target).offset().top;
				}
				if (typeof scrollTo == "number") $(window).scrollTop(scrollTo);
				fire("pjax:success", [
					data,
					status,
					xhr,
					options
				]);
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
			var xhr = pjax.xhr = $.ajax(options);
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
			return pjax($.extend(defaults, optionsFor(container, options)));
		}
		function locationReplace(url) {
			window.history.replaceState(null, "", pjax.state.url);
			window.location.replace(url);
		}
		var initialPop = true;
		var initialURL = window.location.href;
		var initialState = window.history.state;
		if (initialState && initialState.container) pjax.state = initialState;
		if ("state" in window.history) initialPop = false;
		function onPjaxPopstate(event) {
			if (!initialPop) abortXHR(pjax.xhr);
			var previousState = pjax.state;
			var state = event.state;
			var direction;
			if (state && state.container) {
				if (initialPop && initialURL == state.url) return;
				if (previousState) {
					if (previousState.id === state.id) return;
					direction = previousState.id < state.id ? "forward" : "back";
				}
				var cache = cacheMapping[state.id] || [];
				var containerSelector = cache[0] || state.container;
				var container = $(containerSelector), contents = cache[1];
				if (container.length) {
					if (previousState) cachePop(direction, previousState.id, [containerSelector, cloneContents(container)]);
					var popstateEvent = $.Event("pjax:popstate", {
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
						var beforeReplaceEvent = $.Event("pjax:beforeReplace", {
							state,
							previousState
						});
						container.trigger(beforeReplaceEvent, [contents, options]);
						container.html(contents);
						container.trigger("pjax:end", [null, options]);
					} else pjax(options);
					container[0].offsetHeight;
				} else locationReplace(location.href);
			}
			initialPop = false;
		}
		function fallbackPjax(options) {
			var url = $.isFunction(options.url) ? options.url() : options.url, method = options.type ? options.type.toUpperCase() : "GET";
			var form = $("<form>", {
				method: method === "GET" ? "GET" : "POST",
				action: url,
				style: "display:none"
			});
			if (method !== "GET" && method !== "POST") form.append($("<input>", {
				type: "hidden",
				name: "_method",
				value: method.toLowerCase()
			}));
			var data = options.data;
			if (typeof data === "string") $.each(data.split("&"), function(index, value) {
				var pair = value.split("=");
				form.append($("<input>", {
					type: "hidden",
					name: pair[0],
					value: pair[1]
				}));
			});
			else if ($.isArray(data)) $.each(data, function(index, value) {
				form.append($("<input>", {
					type: "hidden",
					name: value.name,
					value: value.value
				}));
			});
			else if (typeof data === "object") {
				var key;
				for (key in data) form.append($("<input>", {
					type: "hidden",
					name: key,
					value: data[key]
				}));
			}
			$(document.body).append(form);
			form.submit();
		}
		function abortXHR(xhr) {
			if (xhr && xhr.readyState < 4) {
				xhr.onreadystatechange = $.noop;
				xhr.abort();
			}
		}
		function uniqueId() {
			return new Date().getTime();
		}
		function cloneContents(container) {
			var cloned = container.clone();
			cloned.find("script").each(function() {
				if (!this.src) $._data(this, "globalEval", false);
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
		function stripHash(location) {
			return location.href.replace(/#.*/, "");
		}
		function optionsFor(container, options) {
			if (container && options) {
				options = $.extend({}, options);
				options.container = container;
				return options;
			} else if ($.isPlainObject(container)) return container;
			else return { container };
		}
		function findAll(elems, selector) {
			return elems.filter(selector).add(elems.find(selector));
		}
		function parseHTML(html) {
			return $.parseHTML(html, document, true);
		}
		function extractContainer(data, xhr, options) {
			var obj = {}, fullDocument = /<html/i.test(data);
			var serverUrl = xhr.getResponseHeader("X-PJAX-URL");
			obj.url = serverUrl ? stripInternalParams(parseURL(serverUrl)) : options.requestUrl;
			var $head, $body;
			if (fullDocument) {
				$body = $(parseHTML(data.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));
				var head = data.match(/<head[^>]*>([\s\S.]*)<\/head>/i);
				$head = head != null ? $(parseHTML(head[0])) : $body;
			} else $head = $body = $(parseHTML(data));
			if ($body.length === 0) return obj;
			obj.title = findAll($head, "title").last().text();
			if (options.fragment) {
				var $fragment = $body;
				if (options.fragment !== "body") $fragment = findAll($fragment, options.fragment).first();
				if ($fragment.length) {
					obj.contents = options.fragment === "body" ? $fragment : $fragment.contents();
					if (!obj.title) obj.title = $fragment.attr("title") || $fragment.data("title");
				}
			} else if (!fullDocument) obj.contents = $body;
			if (obj.contents) {
				obj.contents = obj.contents.not(function() {
					return $(this).is("title");
				});
				obj.contents.find("title").remove();
				obj.scripts = findAll(obj.contents, "script[src]").remove();
				obj.contents = obj.contents.not(obj.scripts);
			}
			if (obj.title) obj.title = $.trim(obj.title);
			return obj;
		}
		function executeScriptTags(scripts) {
			if (!scripts) return;
			var existingScripts = $("script[src]");
			scripts.each(function() {
				var src = this.src;
				if (existingScripts.filter(function() {
					return this.src === src;
				}).length) return;
				var script = document.createElement("script");
				var type = $(this).attr("type");
				if (type) script.type = type;
				script.src = $(this).attr("src");
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
			while (stack.length > length) delete cacheMapping[stack.shift()];
		}
		function findVersion() {
			return $("meta").filter(function() {
				var name = $(this).attr("http-equiv");
				return name && name.toUpperCase() === "X-PJAX-VERSION";
			}).attr("content");
		}
		function enable() {
			$.fn.pjax = fnPjax;
			$.pjax = pjax;
			$.pjax.enable = $.noop;
			$.pjax.disable = disable;
			$.pjax.click = handleClick;
			$.pjax.submit = handleSubmit;
			$.pjax.reload = pjaxReload;
			$.pjax.defaults = {
				timeout: 650,
				push: true,
				replace: false,
				type: "GET",
				dataType: "html",
				scrollTo: 0,
				maxCacheLength: 20,
				version: findVersion
			};
			$(window).on("popstate.pjax", onPjaxPopstate);
		}
		function disable() {
			$.fn.pjax = function() {
				return this;
			};
			$.pjax = fallbackPjax;
			$.pjax.enable = enable;
			$.pjax.disable = $.noop;
			$.pjax.click = $.noop;
			$.pjax.submit = $.noop;
			$.pjax.reload = function() {
				window.location.reload();
			};
			$(window).off("popstate.pjax", onPjaxPopstate);
		}
		if ($.event.props && $.inArray("state", $.event.props) < 0) $.event.props.push("state");
		else if (!("state" in $.Event.prototype)) $.event.addProp("state");
		$.support.pjax = window.history && window.history.pushState && window.history.replaceState && !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/);
		if ($.support.pjax) enable();
		else disable();
	})(jQuery);
	_css(".nhentai-helper-hidden,.nhentai-helper-blacklist{display:none!important}.nhentai-helper-btn:disabled{cursor:wait}.nhentai-helper-gallery>.nhentai-helper-btn{opacity:.8;min-width:42px;position:absolute;top:0}.nhentai-helper-gallery:hover>.nhentai-helper-btn{opacity:1}.nhentai-helper-gallery .nhentai-helper-btn{z-index:2;margin:3px;position:absolute;top:0}.nhentai-helper-gallery .download-zip-btn{left:0}.nhentai-helper-gallery .ignore-btn{display:none;right:0}.nhentai-helper-gallery:hover .ignore-btn{display:block}.nhentai-helper-gallery.downloaded .caption{color:var(--nh-helper-downloaded-title-color,#999)}#page-container{position:relative}@media screen and (width<=768px){#page-container{padding-top:40px}}#online-view-mode-btn{margin:0;position:absolute;top:0;right:0}.btn-noty-green{background-color:#66bb6a!important}.btn-noty-blue{background-color:#42a5f5!important}.btn-noty:hover{filter:brightness(1.15)}.noty_buttons{padding-top:0!important}.pages-input{appearance:none;vertical-align:top;border:0;border-radius:3px;width:100%;height:40px;margin-top:5px;padding:0 .1em 0 1em;font-size:1em;display:inline-block}.noty_close_button{display:none}body.nhentai-helper-nhentai_xxx .reader_outer{position:relative}body.nhentai-helper-nhentai_xxx .g_buttons .download-zip-btn{margin-left:5px}.el-color-picker-panel .el-input__inner{background-color:inherit!important;color:var(--el-input-text-color,var(--el-text-color-regular))!important}");
	_css(".noty_layout_mixin,#noty_layout__top,#noty_layout__topLeft,#noty_layout__topCenter,#noty_layout__topRight,#noty_layout__bottom,#noty_layout__bottomLeft,#noty_layout__bottomCenter,#noty_layout__bottomRight,#noty_layout__center,#noty_layout__centerLeft,#noty_layout__centerRight{z-index:9999999;backface-visibility:hidden;-webkit-font-smoothing:subpixel-antialiased;-webkit-filter:blur();max-width:90%;margin:0;padding:0;position:fixed;transform:translateZ(0)scale(1)}#noty_layout__top{width:90%;top:0;left:5%}#noty_layout__topLeft{width:325px;top:20px;left:20px}#noty_layout__topCenter{width:325px;-webkit-transform:translate(-webkit-calc(-50% - .5px)) translateZ(0) scale(1, 1);top:5%;left:50%;transform:translate(calc(-50% - .5px))translateZ(0)scale(1)}#noty_layout__topRight{width:325px;top:20px;right:20px}#noty_layout__bottom{width:90%;bottom:0;left:5%}#noty_layout__bottomLeft{width:325px;bottom:20px;left:20px}#noty_layout__bottomCenter{width:325px;-webkit-transform:translate(-webkit-calc(-50% - .5px)) translateZ(0) scale(1, 1);bottom:5%;left:50%;transform:translate(calc(-50% - .5px))translateZ(0)scale(1)}#noty_layout__bottomRight{width:325px;bottom:20px;right:20px}#noty_layout__center{width:325px;-webkit-transform:translate(-webkit-calc(-50% - .5px), -webkit-calc(-50% - .5px)) translateZ(0) scale(1, 1);top:50%;left:50%;transform:translate(calc(-50% - .5px),calc(-50% - .5px))translateZ(0)scale(1)}#noty_layout__centerLeft{width:325px;-webkit-transform:translate(0, -webkit-calc(-50% - .5px)) translateZ(0) scale(1, 1);top:50%;left:20px;transform:translateY(calc(-50% - .5px))translateZ(0)scale(1)}#noty_layout__centerRight{width:325px;-webkit-transform:translate(0, -webkit-calc(-50% - .5px)) translateZ(0) scale(1, 1);top:50%;right:20px;transform:translateY(calc(-50% - .5px))translateZ(0)scale(1)}.noty_progressbar{display:none}.noty_has_timeout.noty_has_progressbar .noty_progressbar{opacity:.2;width:100%;height:3px;filter:alpha(opacity=10);background-color:#646464;display:block;position:absolute;bottom:0;left:0}.noty_bar{-webkit-backface-visibility:hidden;-webkit-transform:translate(0)translateZ(0)scale(1);-webkit-font-smoothing:subpixel-antialiased;overflow:hidden;transform:translate(0)scale(1)}.noty_effects_open{opacity:0;animation:.5s cubic-bezier(.68,-.55,.265,1.55) forwards noty_anim_in;transform:translate(50%)}.noty_effects_close{animation:.5s cubic-bezier(.68,-.55,.265,1.55) forwards noty_anim_out}.noty_fix_effects_height{animation:75ms ease-out noty_anim_height}.noty_close_with_click{cursor:pointer}.noty_close_button{text-align:center;cursor:pointer;background-color:#0000000d;border-radius:2px;width:20px;height:20px;font-weight:700;line-height:20px;transition:all .2s ease-out;position:absolute;top:2px;right:2px}.noty_close_button:hover{background-color:#0000001a}.noty_modal{z-index:10000;opacity:.3;background-color:#000;width:100%;height:100%;position:fixed;top:0;left:0}.noty_modal.noty_modal_open{opacity:0;animation:.3s ease-out noty_modal_in}.noty_modal.noty_modal_close{animation:.3s ease-out forwards noty_modal_out}@keyframes noty_modal_in{to{opacity:.3}}@keyframes noty_modal_out{to{opacity:0}}@keyframes noty_anim_in{to{opacity:1;transform:translate(0)}}@keyframes noty_anim_out{to{opacity:0;transform:translate(50%)}}@keyframes noty_anim_height{to{height:0}}.noty_theme__relax.noty_bar{border-radius:2px;margin:4px 0;position:relative;overflow:hidden}.noty_theme__relax.noty_bar .noty_body{padding:10px}.noty_theme__relax.noty_bar .noty_buttons{border-top:1px solid #e7e7e7;padding:5px 10px}.noty_theme__relax.noty_type__alert,.noty_theme__relax.noty_type__notification{color:#444;background-color:#fff;border:1px solid #dedede}.noty_theme__relax.noty_type__warning{color:#826200;background-color:#ffeaa8;border:1px solid #ffc237}.noty_theme__relax.noty_type__warning .noty_buttons{border-color:#dfaa30}.noty_theme__relax.noty_type__error{color:#fff;background-color:#ff8181;border:1px solid #e25353}.noty_theme__relax.noty_type__error .noty_buttons{border-color:#8b0000}.noty_theme__relax.noty_type__info,.noty_theme__relax.noty_type__information{color:#fff;background-color:#78c5e7;border:1px solid #3badd6}.noty_theme__relax.noty_type__info .noty_buttons,.noty_theme__relax.noty_type__information .noty_buttons{border-color:#0b90c4}.noty_theme__relax.noty_type__success{color:#006400;background-color:#bcf5bc;border:1px solid #7cdd77}.noty_theme__relax.noty_type__success .noty_buttons{border-color:#50c24e}.noty_theme__metroui.noty_bar{margin:4px 0;position:relative;overflow:hidden;box-shadow:0 0 5px #0000004c}.noty_theme__metroui.noty_bar .noty_progressbar{opacity:.2;width:100%;height:3px;filter:alpha(opacity=20);background-color:#000;position:absolute;bottom:0;left:0}.noty_theme__metroui.noty_bar .noty_body{padding:1.25em;font-size:14px}.noty_theme__metroui.noty_bar .noty_buttons{padding:0 10px .5em}.noty_theme__metroui.noty_type__alert,.noty_theme__metroui.noty_type__notification{color:#1d1d1d;background-color:#fff}.noty_theme__metroui.noty_type__warning{color:#fff;background-color:#fa6800}.noty_theme__metroui.noty_type__error{color:#fff;background-color:#ce352c}.noty_theme__metroui.noty_type__info,.noty_theme__metroui.noty_type__information{color:#fff;background-color:#1ba1e2}.noty_theme__metroui.noty_type__success{color:#fff;background-color:#60a917}.noty_theme__mint.noty_bar{border-radius:2px;margin:4px 0;position:relative;overflow:hidden}.noty_theme__mint.noty_bar .noty_body{padding:10px;font-size:14px}.noty_theme__mint.noty_bar .noty_buttons{padding:10px}.noty_theme__mint.noty_type__alert,.noty_theme__mint.noty_type__notification{color:#2f2f2f;background-color:#fff;border-bottom:1px solid #d1d1d1}.noty_theme__mint.noty_type__warning{color:#fff;background-color:#ffae42;border-bottom:1px solid #e89f3c}.noty_theme__mint.noty_type__error{color:#fff;background-color:#de636f;border-bottom:1px solid #ca5a65}.noty_theme__mint.noty_type__info,.noty_theme__mint.noty_type__information{color:#fff;background-color:#7f7eff;border-bottom:1px solid #7473e8}.noty_theme__mint.noty_type__success{color:#fff;background-color:#afc765;border-bottom:1px solid #a0b55c}.noty_theme__sunset.noty_bar{border-radius:2px;margin:4px 0;position:relative;overflow:hidden}.noty_theme__sunset.noty_bar .noty_body{text-shadow:1px 1px 1px #0000001a;padding:10px;font-size:14px}.noty_theme__sunset.noty_bar .noty_buttons{padding:10px}.noty_theme__sunset.noty_type__alert,.noty_theme__sunset.noty_type__notification{color:#fff;background-color:#073b4c}.noty_theme__sunset.noty_type__alert .noty_progressbar,.noty_theme__sunset.noty_type__notification .noty_progressbar{background-color:#fff}.noty_theme__sunset.noty_type__warning{color:#fff;background-color:#ffd166}.noty_theme__sunset.noty_type__error{color:#fff;background-color:#ef476f}.noty_theme__sunset.noty_type__error .noty_progressbar{opacity:.4}.noty_theme__sunset.noty_type__info,.noty_theme__sunset.noty_type__information{color:#fff;background-color:#118ab2}.noty_theme__sunset.noty_type__info .noty_progressbar,.noty_theme__sunset.noty_type__information .noty_progressbar{opacity:.6}.noty_theme__sunset.noty_type__success{color:#fff;background-color:#06d6a0}.noty_theme__bootstrap-v3.noty_bar{border:1px solid #0000;border-radius:4px;margin:4px 0;position:relative;overflow:hidden}.noty_theme__bootstrap-v3.noty_bar .noty_body{padding:15px}.noty_theme__bootstrap-v3.noty_bar .noty_buttons{padding:10px}.noty_theme__bootstrap-v3.noty_bar .noty_close_button{color:#000;text-shadow:0 1px #fff;filter:alpha(opacity=20);opacity:.2;background:0 0;font-size:21px;font-weight:700;line-height:1}.noty_theme__bootstrap-v3.noty_bar .noty_close_button:hover{cursor:pointer;filter:alpha(opacity=50);opacity:.5;background:0 0;text-decoration:none}.noty_theme__bootstrap-v3.noty_type__alert,.noty_theme__bootstrap-v3.noty_type__notification{color:inherit;background-color:#fff}.noty_theme__bootstrap-v3.noty_type__warning{color:#8a6d3b;background-color:#fcf8e3;border-color:#faebcc}.noty_theme__bootstrap-v3.noty_type__error{color:#a94442;background-color:#f2dede;border-color:#ebccd1}.noty_theme__bootstrap-v3.noty_type__info,.noty_theme__bootstrap-v3.noty_type__information{color:#31708f;background-color:#d9edf7;border-color:#bce8f1}.noty_theme__bootstrap-v3.noty_type__success{color:#3c763d;background-color:#dff0d8;border-color:#d6e9c6}.noty_theme__bootstrap-v4.noty_bar{border:1px solid #0000;border-radius:.25rem;margin:4px 0;position:relative;overflow:hidden}.noty_theme__bootstrap-v4.noty_bar .noty_body{padding:.75rem 1.25rem}.noty_theme__bootstrap-v4.noty_bar .noty_buttons{padding:10px}.noty_theme__bootstrap-v4.noty_bar .noty_close_button{color:#000;text-shadow:0 1px #fff;filter:alpha(opacity=20);opacity:.5;background:0 0;font-size:1.5rem;font-weight:700;line-height:1}.noty_theme__bootstrap-v4.noty_bar .noty_close_button:hover{cursor:pointer;filter:alpha(opacity=50);opacity:.75;background:0 0;text-decoration:none}.noty_theme__bootstrap-v4.noty_type__alert,.noty_theme__bootstrap-v4.noty_type__notification{color:inherit;background-color:#fff}.noty_theme__bootstrap-v4.noty_type__warning{color:#8a6d3b;background-color:#fcf8e3;border-color:#faebcc}.noty_theme__bootstrap-v4.noty_type__error{color:#a94442;background-color:#f2dede;border-color:#ebccd1}.noty_theme__bootstrap-v4.noty_type__info,.noty_theme__bootstrap-v4.noty_type__information{color:#31708f;background-color:#d9edf7;border-color:#bce8f1}.noty_theme__bootstrap-v4.noty_type__success{color:#3c763d;background-color:#dff0d8;border-color:#d6e9c6}.noty_theme__semanticui.noty_bar{border:1px solid #0000;border-radius:.285714rem;margin:4px 0;font-size:1em;position:relative;overflow:hidden;box-shadow:inset 0 0 0 1px #22242638,0 0 #0000}.noty_theme__semanticui.noty_bar .noty_body{padding:1em 1.5em;line-height:1.4285em}.noty_theme__semanticui.noty_bar .noty_buttons{padding:10px}.noty_theme__semanticui.noty_type__alert,.noty_theme__semanticui.noty_type__notification{color:#000000de;background-color:#f8f8f9}.noty_theme__semanticui.noty_type__warning{color:#573a08;background-color:#fffaf3;box-shadow:inset 0 0 0 1px #c9ba9b,0 0 #0000}.noty_theme__semanticui.noty_type__error{color:#9f3a38;background-color:#fff6f6;box-shadow:inset 0 0 0 1px #e0b4b4,0 0 #0000}.noty_theme__semanticui.noty_type__info,.noty_theme__semanticui.noty_type__information{color:#276f86;background-color:#f8ffff;box-shadow:inset 0 0 0 1px #a9d5de,0 0 #0000}.noty_theme__semanticui.noty_type__success{color:#2c662d;background-color:#fcfff5;box-shadow:inset 0 0 0 1px #a3c293,0 0 #0000}.noty_theme__nest.noty_bar{border-radius:2px;margin:0 0 15px;position:relative;overflow:hidden;box-shadow:5px 4px 10px #00000019}.noty_theme__nest.noty_bar .noty_body{text-shadow:1px 1px 1px #0000001a;padding:10px;font-size:14px}.noty_theme__nest.noty_bar .noty_buttons{padding:10px}.noty_layout .noty_theme__nest.noty_bar{z-index:5}.noty_layout .noty_theme__nest.noty_bar:nth-child(2){z-index:4;width:100%;margin-top:4px;margin-left:4px;margin-right:-4px;position:absolute;top:0}.noty_layout .noty_theme__nest.noty_bar:nth-child(3){z-index:3;width:100%;margin-top:8px;margin-left:8px;margin-right:-8px;position:absolute;top:0}.noty_layout .noty_theme__nest.noty_bar:nth-child(4){z-index:2;width:100%;margin-top:12px;margin-left:12px;margin-right:-12px;position:absolute;top:0}.noty_layout .noty_theme__nest.noty_bar:nth-child(5){z-index:1;width:100%;margin-top:16px;margin-left:16px;margin-right:-16px;position:absolute;top:0}.noty_layout .noty_theme__nest.noty_bar:nth-child(n+6){z-index:-1;width:100%;margin-top:20px;margin-left:20px;margin-right:-20px;position:absolute;top:0}#noty_layout__bottomLeft .noty_theme__nest.noty_bar:nth-child(2),#noty_layout__topLeft .noty_theme__nest.noty_bar:nth-child(2){margin-top:4px;margin-left:-4px;margin-right:4px}#noty_layout__bottomLeft .noty_theme__nest.noty_bar:nth-child(3),#noty_layout__topLeft .noty_theme__nest.noty_bar:nth-child(3){margin-top:8px;margin-left:-8px;margin-right:8px}#noty_layout__bottomLeft .noty_theme__nest.noty_bar:nth-child(4),#noty_layout__topLeft .noty_theme__nest.noty_bar:nth-child(4){margin-top:12px;margin-left:-12px;margin-right:12px}#noty_layout__bottomLeft .noty_theme__nest.noty_bar:nth-child(5),#noty_layout__topLeft .noty_theme__nest.noty_bar:nth-child(5){margin-top:16px;margin-left:-16px;margin-right:16px}#noty_layout__bottomLeft .noty_theme__nest.noty_bar:nth-child(n+6),#noty_layout__topLeft .noty_theme__nest.noty_bar:nth-child(n+6){margin-top:20px;margin-left:-20px;margin-right:20px}.noty_theme__nest.noty_type__alert,.noty_theme__nest.noty_type__notification{color:#fff;background-color:#073b4c}.noty_theme__nest.noty_type__alert .noty_progressbar,.noty_theme__nest.noty_type__notification .noty_progressbar{background-color:#fff}.noty_theme__nest.noty_type__warning{color:#fff;background-color:#ffd166}.noty_theme__nest.noty_type__error{color:#fff;background-color:#ef476f}.noty_theme__nest.noty_type__error .noty_progressbar{opacity:.4}.noty_theme__nest.noty_type__info,.noty_theme__nest.noty_type__information{color:#fff;background-color:#118ab2}.noty_theme__nest.noty_type__info .noty_progressbar,.noty_theme__nest.noty_type__information .noty_progressbar{opacity:.6}.noty_theme__nest.noty_type__success{color:#fff;background-color:#06d6a0}.noty_theme__light.noty_bar{border-radius:2px;margin:4px 0;position:relative;overflow:hidden}.noty_theme__light.noty_bar .noty_body{padding:10px}.noty_theme__light.noty_bar .noty_buttons{border-top:1px solid #e7e7e7;padding:5px 10px}.noty_theme__light.noty_type__alert,.noty_theme__light.noty_type__notification{color:#444;background-color:#fff;border:1px solid #dedede}.noty_theme__light.noty_type__warning{color:#826200;background-color:#ffeaa8;border:1px solid #ffc237}.noty_theme__light.noty_type__warning .noty_buttons{border-color:#dfaa30}.noty_theme__light.noty_type__error{color:#fff;background-color:#ed7000;border:1px solid #e25353}.noty_theme__light.noty_type__error .noty_buttons{border-color:#8b0000}.noty_theme__light.noty_type__info,.noty_theme__light.noty_type__information{color:#fff;background-color:#78c5e7;border:1px solid #3badd6}.noty_theme__light.noty_type__info .noty_buttons,.noty_theme__light.noty_type__information .noty_buttons{border-color:#0b90c4}.noty_theme__light.noty_type__success{color:#006400;background-color:#57c880;border:1px solid #7cdd77}.noty_theme__light.noty_type__success .noty_buttons{border-color:#50c24e}");
	var cssLoader = (name) => _GM_addStyle(_GM_getResourceText(name));
	cssLoader("element-plus-css");
	var import_localforage = __toESM(__commonJSMin(((exports, module) => {
		(function(f) {
			if (typeof exports === "object" && typeof module !== "undefined") module.exports = f();
			else if (typeof define === "function" && define.amd) define([], f);
			else {
				var g;
				if (typeof window !== "undefined") g = window;
				else if (typeof global !== "undefined") g = global;
				else if (typeof self !== "undefined") g = self;
				else g = this;
				g.localforage = f();
			}
		})(function() {
			return (function e(t, n, r) {
				function s(o, u) {
					if (!n[o]) {
						if (!t[o]) {
							var a = typeof __require == "function" && __require;
							if (!u && a) return a(o, !0);
							if (i) return i(o, !0);
							var f = new Error("Cannot find module '" + o + "'");
							throw f.code = "MODULE_NOT_FOUND", f;
						}
						var l = n[o] = { exports: {} };
						t[o][0].call(l.exports, function(e) {
							var n = t[o][1][e];
							return s(n ? n : e);
						}, l, l.exports, e, t, n, r);
					}
					return n[o].exports;
				}
				var i = typeof __require == "function" && __require;
				for (var o = 0; o < r.length; o++) s(r[o]);
				return s;
			})({
				1: [function(_dereq_, module$13, exports$12) {
					(function(global) {
						"use strict";
						var Mutation = global.MutationObserver || global.WebKitMutationObserver;
						var scheduleDrain;
						if (Mutation) {
							var called = 0;
							var observer = new Mutation(nextTick);
							var element = global.document.createTextNode("");
							observer.observe(element, { characterData: true });
							scheduleDrain = function() {
								element.data = called = ++called % 2;
							};
						} else if (!global.setImmediate && typeof global.MessageChannel !== "undefined") {
							var channel = new global.MessageChannel();
							channel.port1.onmessage = nextTick;
							scheduleDrain = function() {
								channel.port2.postMessage(0);
							};
						} else if ("document" in global && "onreadystatechange" in global.document.createElement("script")) scheduleDrain = function() {
							var scriptEl = global.document.createElement("script");
							scriptEl.onreadystatechange = function() {
								nextTick();
								scriptEl.onreadystatechange = null;
								scriptEl.parentNode.removeChild(scriptEl);
								scriptEl = null;
							};
							global.document.documentElement.appendChild(scriptEl);
						};
						else scheduleDrain = function() {
							setTimeout(nextTick, 0);
						};
						var draining;
						var queue = [];
						function nextTick() {
							draining = true;
							var i, oldQueue;
							var len = queue.length;
							while (len) {
								oldQueue = queue;
								queue = [];
								i = -1;
								while (++i < len) oldQueue[i]();
								len = queue.length;
							}
							draining = false;
						}
						module$13.exports = immediate;
						function immediate(task) {
							if (queue.push(task) === 1 && !draining) scheduleDrain();
						}
					}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
				}, {}],
				2: [function(_dereq_, module$14, exports$13) {
					"use strict";
					var immediate = _dereq_(1);
					function INTERNAL() {}
					var handlers = {};
					var REJECTED = ["REJECTED"];
					var FULFILLED = ["FULFILLED"];
					var PENDING = ["PENDING"];
					module$14.exports = Promise;
					function Promise(resolver) {
						if (typeof resolver !== "function") throw new TypeError("resolver must be a function");
						this.state = PENDING;
						this.queue = [];
						this.outcome = void 0;
						if (resolver !== INTERNAL) safelyResolveThenable(this, resolver);
					}
					Promise.prototype["catch"] = function(onRejected) {
						return this.then(null, onRejected);
					};
					Promise.prototype.then = function(onFulfilled, onRejected) {
						if (typeof onFulfilled !== "function" && this.state === FULFILLED || typeof onRejected !== "function" && this.state === REJECTED) return this;
						var promise = new this.constructor(INTERNAL);
						if (this.state !== PENDING) unwrap(promise, this.state === FULFILLED ? onFulfilled : onRejected, this.outcome);
						else this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
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
						handlers.resolve(this.promise, value);
					};
					QueueItem.prototype.otherCallFulfilled = function(value) {
						unwrap(this.promise, this.onFulfilled, value);
					};
					QueueItem.prototype.callRejected = function(value) {
						handlers.reject(this.promise, value);
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
								return handlers.reject(promise, e);
							}
							if (returnValue === promise) handlers.reject(promise, new TypeError("Cannot resolve promise with itself"));
							else handlers.resolve(promise, returnValue);
						});
					}
					handlers.resolve = function(self, value) {
						var result = tryCatch(getThen, value);
						if (result.status === "error") return handlers.reject(self, result.value);
						var thenable = result.value;
						if (thenable) safelyResolveThenable(self, thenable);
						else {
							self.state = FULFILLED;
							self.outcome = value;
							var i = -1;
							var len = self.queue.length;
							while (++i < len) self.queue[i].callFulfilled(value);
						}
						return self;
					};
					handlers.reject = function(self, error) {
						self.state = REJECTED;
						self.outcome = error;
						var i = -1;
						var len = self.queue.length;
						while (++i < len) self.queue[i].callRejected(error);
						return self;
					};
					function getThen(obj) {
						var then = obj && obj.then;
						if (obj && (typeof obj === "object" || typeof obj === "function") && typeof then === "function") return function appyThen() {
							then.apply(obj, arguments);
						};
					}
					function safelyResolveThenable(self, thenable) {
						var called = false;
						function onError(value) {
							if (called) return;
							called = true;
							handlers.reject(self, value);
						}
						function onSuccess(value) {
							if (called) return;
							called = true;
							handlers.resolve(self, value);
						}
						function tryToUnwrap() {
							thenable(onSuccess, onError);
						}
						var result = tryCatch(tryToUnwrap);
						if (result.status === "error") onError(result.value);
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
					Promise.resolve = resolve;
					function resolve(value) {
						if (value instanceof this) return value;
						return handlers.resolve(new this(INTERNAL), value);
					}
					Promise.reject = reject;
					function reject(reason) {
						var promise = new this(INTERNAL);
						return handlers.reject(promise, reason);
					}
					Promise.all = all;
					function all(iterable) {
						var self = this;
						if (Object.prototype.toString.call(iterable) !== "[object Array]") return this.reject(new TypeError("must be an array"));
						var len = iterable.length;
						var called = false;
						if (!len) return this.resolve([]);
						var values = new Array(len);
						var resolved = 0;
						var i = -1;
						var promise = new this(INTERNAL);
						while (++i < len) allResolver(iterable[i], i);
						return promise;
						function allResolver(value, i) {
							self.resolve(value).then(resolveFromAll, function(error) {
								if (!called) {
									called = true;
									handlers.reject(promise, error);
								}
							});
							function resolveFromAll(outValue) {
								values[i] = outValue;
								if (++resolved === len && !called) {
									called = true;
									handlers.resolve(promise, values);
								}
							}
						}
					}
					Promise.race = race;
					function race(iterable) {
						var self = this;
						if (Object.prototype.toString.call(iterable) !== "[object Array]") return this.reject(new TypeError("must be an array"));
						var len = iterable.length;
						var called = false;
						if (!len) return this.resolve([]);
						var i = -1;
						var promise = new this(INTERNAL);
						while (++i < len) resolver(iterable[i]);
						return promise;
						function resolver(value) {
							self.resolve(value).then(function(response) {
								if (!called) {
									called = true;
									handlers.resolve(promise, response);
								}
							}, function(error) {
								if (!called) {
									called = true;
									handlers.reject(promise, error);
								}
							});
						}
					}
				}, { "1": 1 }],
				3: [function(_dereq_, module$15, exports$14) {
					(function(global) {
						"use strict";
						if (typeof global.Promise !== "function") global.Promise = _dereq_(2);
					}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
				}, { "2": 2 }],
				4: [function(_dereq_, module$16, exports$15) {
					"use strict";
					var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
						return typeof obj;
					} : function(obj) {
						return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
					};
					function _classCallCheck(instance, Constructor) {
						if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
					}
					function getIDB() {
						try {
							if (typeof indexedDB !== "undefined") return indexedDB;
							if (typeof webkitIndexedDB !== "undefined") return webkitIndexedDB;
							if (typeof mozIndexedDB !== "undefined") return mozIndexedDB;
							if (typeof OIndexedDB !== "undefined") return OIndexedDB;
							if (typeof msIndexedDB !== "undefined") return msIndexedDB;
						} catch (e) {
							return;
						}
					}
					var idb = getIDB();
					function isIndexedDBValid() {
						try {
							if (!idb || !idb.open) return false;
							var isSafari = typeof openDatabase !== "undefined" && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);
							var hasFetch = typeof fetch === "function" && fetch.toString().indexOf("[native code") !== -1;
							return (!isSafari || hasFetch) && typeof indexedDB !== "undefined" && typeof IDBKeyRange !== "undefined";
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
							if (e.name !== "TypeError") throw e;
							var builder = new (typeof BlobBuilder !== "undefined" ? BlobBuilder : typeof MSBlobBuilder !== "undefined" ? MSBlobBuilder : typeof MozBlobBuilder !== "undefined" ? MozBlobBuilder : WebKitBlobBuilder)();
							for (var i = 0; i < parts.length; i += 1) builder.append(parts[i]);
							return builder.getBlob(properties.type);
						}
					}
					if (typeof Promise === "undefined") _dereq_(3);
					var Promise$1 = Promise;
					function executeCallback(promise, callback) {
						if (callback) promise.then(function(result) {
							callback(null, result);
						}, function(error) {
							callback(error);
						});
					}
					function executeTwoCallbacks(promise, callback, errorCallback) {
						if (typeof callback === "function") promise.then(callback);
						if (typeof errorCallback === "function") promise["catch"](errorCallback);
					}
					function normalizeKey(key) {
						if (typeof key !== "string") {
							console.warn(key + " used as a key, but it is not a string.");
							key = String(key);
						}
						return key;
					}
					function getCallback() {
						if (arguments.length && typeof arguments[arguments.length - 1] === "function") return arguments[arguments.length - 1];
					}
					var DETECT_BLOB_SUPPORT_STORE = "local-forage-detect-blob-support";
					var supportsBlobs = void 0;
					var dbContexts = {};
					var toString = Object.prototype.toString;
					var READ_ONLY = "readonly";
					var READ_WRITE = "readwrite";
					function _binStringToArrayBuffer(bin) {
						var length = bin.length;
						var buf = new ArrayBuffer(length);
						var arr = new Uint8Array(buf);
						for (var i = 0; i < length; i++) arr[i] = bin.charCodeAt(i);
						return buf;
					}
					function _checkBlobSupportWithoutCaching(idb) {
						return new Promise$1(function(resolve) {
							var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
							var blob = createBlob([""]);
							txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, "key");
							txn.onabort = function(e) {
								e.preventDefault();
								e.stopPropagation();
								resolve(false);
							};
							txn.oncomplete = function() {
								var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
								resolve(navigator.userAgent.match(/Edge\//) || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
							};
						})["catch"](function() {
							return false;
						});
					}
					function _checkBlobSupport(idb) {
						if (typeof supportsBlobs === "boolean") return Promise$1.resolve(supportsBlobs);
						return _checkBlobSupportWithoutCaching(idb).then(function(value) {
							supportsBlobs = value;
							return supportsBlobs;
						});
					}
					function _deferReadiness(dbInfo) {
						var dbContext = dbContexts[dbInfo.name];
						var deferredOperation = {};
						deferredOperation.promise = new Promise$1(function(resolve, reject) {
							deferredOperation.resolve = resolve;
							deferredOperation.reject = reject;
						});
						dbContext.deferredOperations.push(deferredOperation);
						if (!dbContext.dbReady) dbContext.dbReady = deferredOperation.promise;
						else dbContext.dbReady = dbContext.dbReady.then(function() {
							return deferredOperation.promise;
						});
					}
					function _advanceReadiness(dbInfo) {
						var deferredOperation = dbContexts[dbInfo.name].deferredOperations.pop();
						if (deferredOperation) {
							deferredOperation.resolve();
							return deferredOperation.promise;
						}
					}
					function _rejectReadiness(dbInfo, err) {
						var deferredOperation = dbContexts[dbInfo.name].deferredOperations.pop();
						if (deferredOperation) {
							deferredOperation.reject(err);
							return deferredOperation.promise;
						}
					}
					function _getConnection(dbInfo, upgradeNeeded) {
						return new Promise$1(function(resolve, reject) {
							dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();
							if (dbInfo.db) if (upgradeNeeded) {
								_deferReadiness(dbInfo);
								dbInfo.db.close();
							} else return resolve(dbInfo.db);
							var dbArgs = [dbInfo.name];
							if (upgradeNeeded) dbArgs.push(dbInfo.version);
							var openreq = idb.open.apply(idb, dbArgs);
							if (upgradeNeeded) openreq.onupgradeneeded = function(e) {
								var db = openreq.result;
								try {
									db.createObjectStore(dbInfo.storeName);
									if (e.oldVersion <= 1) db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
								} catch (ex) {
									if (ex.name === "ConstraintError") console.warn("The database \"" + dbInfo.name + "\" has been upgraded from version " + e.oldVersion + " to version " + e.newVersion + ", but the storage \"" + dbInfo.storeName + "\" already exists.");
									else throw ex;
								}
							};
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
						if (!dbInfo.db) return true;
						var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
						var isDowngrade = dbInfo.version < dbInfo.db.version;
						var isUpgrade = dbInfo.version > dbInfo.db.version;
						if (isDowngrade) {
							if (dbInfo.version !== defaultVersion) console.warn("The database \"" + dbInfo.name + "\" can't be downgraded from version " + dbInfo.db.version + " to version " + dbInfo.version + ".");
							dbInfo.version = dbInfo.db.version;
						}
						if (isUpgrade || isNewStore) {
							if (isNewStore) {
								var incVersion = dbInfo.db.version + 1;
								if (incVersion > dbInfo.version) dbInfo.version = incVersion;
							}
							return true;
						}
						return false;
					}
					function _encodeBlob(blob) {
						return new Promise$1(function(resolve, reject) {
							var reader = new FileReader();
							reader.onerror = reject;
							reader.onloadend = function(e) {
								resolve({
									__local_forage_encoded_blob: true,
									data: btoa(e.target.result || ""),
									type: blob.type
								});
							};
							reader.readAsBinaryString(blob);
						});
					}
					function _decodeBlob(encodedBlob) {
						return createBlob([_binStringToArrayBuffer(atob(encodedBlob.data))], { type: encodedBlob.type });
					}
					function _isEncodedBlob(value) {
						return value && value.__local_forage_encoded_blob;
					}
					function _fullyReady(callback) {
						var self = this;
						var promise = self._initReady().then(function() {
							var dbContext = dbContexts[self._dbInfo.name];
							if (dbContext && dbContext.dbReady) return dbContext.dbReady;
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
							if (_isUpgradeNeeded(dbInfo)) return _getUpgradedConnection(dbInfo);
							return db;
						}).then(function(db) {
							dbInfo.db = dbContext.db = db;
							for (var i = 0; i < forages.length; i++) forages[i]._dbInfo.db = db;
						})["catch"](function(err) {
							_rejectReadiness(dbInfo, err);
							throw err;
						});
					}
					function createTransaction(dbInfo, mode, callback, retries) {
						if (retries === void 0) retries = 1;
						try {
							callback(null, dbInfo.db.transaction(dbInfo.storeName, mode));
						} catch (err) {
							if (retries > 0 && (!dbInfo.db || err.name === "InvalidStateError" || err.name === "NotFoundError")) return Promise$1.resolve().then(function() {
								if (!dbInfo.db || err.name === "NotFoundError" && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
									if (dbInfo.db) dbInfo.version = dbInfo.db.version + 1;
									return _getUpgradedConnection(dbInfo);
								}
							}).then(function() {
								return _tryReconnect(dbInfo).then(function() {
									createTransaction(dbInfo, mode, callback, retries - 1);
								});
							})["catch"](callback);
							callback(err);
						}
					}
					function createDbContext() {
						return {
							forages: [],
							db: null,
							dbReady: null,
							deferredOperations: []
						};
					}
					function _initStorage(options) {
						var self = this;
						var dbInfo = { db: null };
						if (options) for (var i in options) dbInfo[i] = options[i];
						var dbContext = dbContexts[dbInfo.name];
						if (!dbContext) {
							dbContext = createDbContext();
							dbContexts[dbInfo.name] = dbContext;
						}
						dbContext.forages.push(self);
						if (!self._initReady) {
							self._initReady = self.ready;
							self.ready = _fullyReady;
						}
						var initPromises = [];
						function ignoreErrors() {
							return Promise$1.resolve();
						}
						for (var j = 0; j < dbContext.forages.length; j++) {
							var forage = dbContext.forages[j];
							if (forage !== self) initPromises.push(forage._initReady()["catch"](ignoreErrors));
						}
						var forages = dbContext.forages.slice(0);
						return Promise$1.all(initPromises).then(function() {
							dbInfo.db = dbContext.db;
							return _getOriginalConnection(dbInfo);
						}).then(function(db) {
							dbInfo.db = db;
							if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) return _getUpgradedConnection(dbInfo);
							return db;
						}).then(function(db) {
							dbInfo.db = dbContext.db = db;
							self._dbInfo = dbInfo;
							for (var k = 0; k < forages.length; k++) {
								var forage = forages[k];
								if (forage !== self) {
									forage._dbInfo.db = dbInfo.db;
									forage._dbInfo.version = dbInfo.version;
								}
							}
						});
					}
					function getItem(key, callback) {
						var self = this;
						key = normalizeKey(key);
						var promise = new Promise$1(function(resolve, reject) {
							self.ready().then(function() {
								createTransaction(self._dbInfo, READ_ONLY, function(err, transaction) {
									if (err) return reject(err);
									try {
										var req = transaction.objectStore(self._dbInfo.storeName).get(key);
										req.onsuccess = function() {
											var value = req.result;
											if (value === void 0) value = null;
											if (_isEncodedBlob(value)) value = _decodeBlob(value);
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
						executeCallback(promise, callback);
						return promise;
					}
					function iterate(iterator, callback) {
						var self = this;
						var promise = new Promise$1(function(resolve, reject) {
							self.ready().then(function() {
								createTransaction(self._dbInfo, READ_ONLY, function(err, transaction) {
									if (err) return reject(err);
									try {
										var req = transaction.objectStore(self._dbInfo.storeName).openCursor();
										var iterationNumber = 1;
										req.onsuccess = function() {
											var cursor = req.result;
											if (cursor) {
												var value = cursor.value;
												if (_isEncodedBlob(value)) value = _decodeBlob(value);
												var result = iterator(value, cursor.key, iterationNumber++);
												if (result !== void 0) resolve(result);
												else cursor["continue"]();
											} else resolve();
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
						executeCallback(promise, callback);
						return promise;
					}
					function setItem(key, value, callback) {
						var self = this;
						key = normalizeKey(key);
						var promise = new Promise$1(function(resolve, reject) {
							var dbInfo;
							self.ready().then(function() {
								dbInfo = self._dbInfo;
								if (toString.call(value) === "[object Blob]") return _checkBlobSupport(dbInfo.db).then(function(blobSupport) {
									if (blobSupport) return value;
									return _encodeBlob(value);
								});
								return value;
							}).then(function(value) {
								createTransaction(self._dbInfo, READ_WRITE, function(err, transaction) {
									if (err) return reject(err);
									try {
										var store = transaction.objectStore(self._dbInfo.storeName);
										if (value === null) value = void 0;
										var req = store.put(value, key);
										transaction.oncomplete = function() {
											if (value === void 0) value = null;
											resolve(value);
										};
										transaction.onabort = transaction.onerror = function() {
											reject(req.error ? req.error : req.transaction.error);
										};
									} catch (e) {
										reject(e);
									}
								});
							})["catch"](reject);
						});
						executeCallback(promise, callback);
						return promise;
					}
					function removeItem(key, callback) {
						var self = this;
						key = normalizeKey(key);
						var promise = new Promise$1(function(resolve, reject) {
							self.ready().then(function() {
								createTransaction(self._dbInfo, READ_WRITE, function(err, transaction) {
									if (err) return reject(err);
									try {
										var req = transaction.objectStore(self._dbInfo.storeName)["delete"](key);
										transaction.oncomplete = function() {
											resolve();
										};
										transaction.onerror = function() {
											reject(req.error);
										};
										transaction.onabort = function() {
											reject(req.error ? req.error : req.transaction.error);
										};
									} catch (e) {
										reject(e);
									}
								});
							})["catch"](reject);
						});
						executeCallback(promise, callback);
						return promise;
					}
					function clear(callback) {
						var self = this;
						var promise = new Promise$1(function(resolve, reject) {
							self.ready().then(function() {
								createTransaction(self._dbInfo, READ_WRITE, function(err, transaction) {
									if (err) return reject(err);
									try {
										var req = transaction.objectStore(self._dbInfo.storeName).clear();
										transaction.oncomplete = function() {
											resolve();
										};
										transaction.onabort = transaction.onerror = function() {
											reject(req.error ? req.error : req.transaction.error);
										};
									} catch (e) {
										reject(e);
									}
								});
							})["catch"](reject);
						});
						executeCallback(promise, callback);
						return promise;
					}
					function length(callback) {
						var self = this;
						var promise = new Promise$1(function(resolve, reject) {
							self.ready().then(function() {
								createTransaction(self._dbInfo, READ_ONLY, function(err, transaction) {
									if (err) return reject(err);
									try {
										var req = transaction.objectStore(self._dbInfo.storeName).count();
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
						executeCallback(promise, callback);
						return promise;
					}
					function key(n, callback) {
						var self = this;
						var promise = new Promise$1(function(resolve, reject) {
							if (n < 0) {
								resolve(null);
								return;
							}
							self.ready().then(function() {
								createTransaction(self._dbInfo, READ_ONLY, function(err, transaction) {
									if (err) return reject(err);
									try {
										var store = transaction.objectStore(self._dbInfo.storeName);
										var advanced = false;
										var req = store.openKeyCursor();
										req.onsuccess = function() {
											var cursor = req.result;
											if (!cursor) {
												resolve(null);
												return;
											}
											if (n === 0) resolve(cursor.key);
											else if (!advanced) {
												advanced = true;
												cursor.advance(n);
											} else resolve(cursor.key);
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
						executeCallback(promise, callback);
						return promise;
					}
					function keys(callback) {
						var self = this;
						var promise = new Promise$1(function(resolve, reject) {
							self.ready().then(function() {
								createTransaction(self._dbInfo, READ_ONLY, function(err, transaction) {
									if (err) return reject(err);
									try {
										var req = transaction.objectStore(self._dbInfo.storeName).openKeyCursor();
										var keys = [];
										req.onsuccess = function() {
											var cursor = req.result;
											if (!cursor) {
												resolve(keys);
												return;
											}
											keys.push(cursor.key);
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
						executeCallback(promise, callback);
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
						var self = this;
						var promise;
						if (!options.name) promise = Promise$1.reject("Invalid arguments");
						else {
							var dbPromise = options.name === currentConfig.name && self._dbInfo.db ? Promise$1.resolve(self._dbInfo.db) : _getOriginalConnection(options).then(function(db) {
								var dbContext = dbContexts[options.name];
								var forages = dbContext.forages;
								dbContext.db = db;
								for (var i = 0; i < forages.length; i++) forages[i]._dbInfo.db = db;
								return db;
							});
							if (!options.storeName) promise = dbPromise.then(function(db) {
								_deferReadiness(options);
								var dbContext = dbContexts[options.name];
								var forages = dbContext.forages;
								db.close();
								for (var i = 0; i < forages.length; i++) {
									var forage = forages[i];
									forage._dbInfo.db = null;
								}
								return new Promise$1(function(resolve, reject) {
									var req = idb.deleteDatabase(options.name);
									req.onerror = function() {
										var db = req.result;
										if (db) db.close();
										reject(req.error);
									};
									req.onblocked = function() {
										console.warn("dropInstance blocked for database \"" + options.name + "\" until all open connections are closed");
									};
									req.onsuccess = function() {
										var db = req.result;
										if (db) db.close();
										resolve(db);
									};
								}).then(function(db) {
									dbContext.db = db;
									for (var i = 0; i < forages.length; i++) {
										var _forage = forages[i];
										_advanceReadiness(_forage._dbInfo);
									}
								})["catch"](function(err) {
									(_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function() {});
									throw err;
								});
							});
							else promise = dbPromise.then(function(db) {
								if (!db.objectStoreNames.contains(options.storeName)) return;
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
								return new Promise$1(function(resolve, reject) {
									var req = idb.open(options.name, newVersion);
									req.onerror = function(err) {
										req.result.close();
										reject(err);
									};
									req.onupgradeneeded = function() {
										req.result.deleteObjectStore(options.storeName);
									};
									req.onsuccess = function() {
										var db = req.result;
										db.close();
										resolve(db);
									};
								}).then(function(db) {
									dbContext.db = db;
									for (var j = 0; j < forages.length; j++) {
										var _forage2 = forages[j];
										_forage2._dbInfo.db = db;
										_advanceReadiness(_forage2._dbInfo);
									}
								})["catch"](function(err) {
									(_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function() {});
									throw err;
								});
							});
						}
						executeCallback(promise, callback);
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
						keys,
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
					var toString$1 = Object.prototype.toString;
					function stringToBuffer(serializedString) {
						var bufferLength = serializedString.length * .75;
						var len = serializedString.length;
						var i;
						var p = 0;
						var encoded1, encoded2, encoded3, encoded4;
						if (serializedString[serializedString.length - 1] === "=") {
							bufferLength--;
							if (serializedString[serializedString.length - 2] === "=") bufferLength--;
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
						if (bytes.length % 3 === 2) base64String = base64String.substring(0, base64String.length - 1) + "=";
						else if (bytes.length % 3 === 1) base64String = base64String.substring(0, base64String.length - 2) + "==";
						return base64String;
					}
					function serialize(value, callback) {
						var valueType = "";
						if (value) valueType = toString$1.call(value);
						if (value && (valueType === "[object ArrayBuffer]" || value.buffer && toString$1.call(value.buffer) === "[object ArrayBuffer]")) {
							var buffer;
							var marker = SERIALIZED_MARKER;
							if (value instanceof ArrayBuffer) {
								buffer = value;
								marker += TYPE_ARRAYBUFFER;
							} else {
								buffer = value.buffer;
								if (valueType === "[object Int8Array]") marker += TYPE_INT8ARRAY;
								else if (valueType === "[object Uint8Array]") marker += TYPE_UINT8ARRAY;
								else if (valueType === "[object Uint8ClampedArray]") marker += TYPE_UINT8CLAMPEDARRAY;
								else if (valueType === "[object Int16Array]") marker += TYPE_INT16ARRAY;
								else if (valueType === "[object Uint16Array]") marker += TYPE_UINT16ARRAY;
								else if (valueType === "[object Int32Array]") marker += TYPE_INT32ARRAY;
								else if (valueType === "[object Uint32Array]") marker += TYPE_UINT32ARRAY;
								else if (valueType === "[object Float32Array]") marker += TYPE_FLOAT32ARRAY;
								else if (valueType === "[object Float64Array]") marker += TYPE_FLOAT64ARRAY;
								else callback(new Error("Failed to get type for BinaryArray"));
							}
							callback(marker + bufferToString(buffer));
						} else if (valueType === "[object Blob]") {
							var fileReader = new FileReader();
							fileReader.onload = function() {
								var str = BLOB_TYPE_PREFIX + value.type + "~" + bufferToString(this.result);
								callback(SERIALIZED_MARKER + TYPE_BLOB + str);
							};
							fileReader.readAsArrayBuffer(value);
						} else try {
							callback(JSON.stringify(value));
						} catch (e) {
							console.error("Couldn't convert value into a JSON string: ", value);
							callback(null, e);
						}
					}
					function deserialize(value) {
						if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) return JSON.parse(value);
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
							case TYPE_ARRAYBUFFER: return buffer;
							case TYPE_BLOB: return createBlob([buffer], { type: blobType });
							case TYPE_INT8ARRAY: return new Int8Array(buffer);
							case TYPE_UINT8ARRAY: return new Uint8Array(buffer);
							case TYPE_UINT8CLAMPEDARRAY: return new Uint8ClampedArray(buffer);
							case TYPE_INT16ARRAY: return new Int16Array(buffer);
							case TYPE_UINT16ARRAY: return new Uint16Array(buffer);
							case TYPE_INT32ARRAY: return new Int32Array(buffer);
							case TYPE_UINT32ARRAY: return new Uint32Array(buffer);
							case TYPE_FLOAT32ARRAY: return new Float32Array(buffer);
							case TYPE_FLOAT64ARRAY: return new Float64Array(buffer);
							default: throw new Error("Unkown type: " + type);
						}
					}
					var localforageSerializer = {
						serialize,
						deserialize,
						stringToBuffer,
						bufferToString
					};
					function createDbTable(t, dbInfo, callback, errorCallback) {
						t.executeSql("CREATE TABLE IF NOT EXISTS " + dbInfo.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], callback, errorCallback);
					}
					function _initStorage$1(options) {
						var self = this;
						var dbInfo = { db: null };
						if (options) for (var i in options) dbInfo[i] = typeof options[i] !== "string" ? options[i].toString() : options[i];
						var dbInfoPromise = new Promise$1(function(resolve, reject) {
							try {
								dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
							} catch (e) {
								return reject(e);
							}
							dbInfo.db.transaction(function(t) {
								createDbTable(t, dbInfo, function() {
									self._dbInfo = dbInfo;
									resolve();
								}, function(t, error) {
									reject(error);
								});
							}, reject);
						});
						dbInfo.serializer = localforageSerializer;
						return dbInfoPromise;
					}
					function tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {
						t.executeSql(sqlStatement, args, callback, function(t, error) {
							if (error.code === error.SYNTAX_ERR) t.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [dbInfo.storeName], function(t, results) {
								if (!results.rows.length) createDbTable(t, dbInfo, function() {
									t.executeSql(sqlStatement, args, callback, errorCallback);
								}, errorCallback);
								else errorCallback(t, error);
							}, errorCallback);
							else errorCallback(t, error);
						}, errorCallback);
					}
					function getItem$1(key, callback) {
						var self = this;
						key = normalizeKey(key);
						var promise = new Promise$1(function(resolve, reject) {
							self.ready().then(function() {
								var dbInfo = self._dbInfo;
								dbInfo.db.transaction(function(t) {
									tryExecuteSql(t, dbInfo, "SELECT * FROM " + dbInfo.storeName + " WHERE key = ? LIMIT 1", [key], function(t, results) {
										var result = results.rows.length ? results.rows.item(0).value : null;
										if (result) result = dbInfo.serializer.deserialize(result);
										resolve(result);
									}, function(t, error) {
										reject(error);
									});
								});
							})["catch"](reject);
						});
						executeCallback(promise, callback);
						return promise;
					}
					function iterate$1(iterator, callback) {
						var self = this;
						var promise = new Promise$1(function(resolve, reject) {
							self.ready().then(function() {
								var dbInfo = self._dbInfo;
								dbInfo.db.transaction(function(t) {
									tryExecuteSql(t, dbInfo, "SELECT * FROM " + dbInfo.storeName, [], function(t, results) {
										var rows = results.rows;
										var length = rows.length;
										for (var i = 0; i < length; i++) {
											var item = rows.item(i);
											var result = item.value;
											if (result) result = dbInfo.serializer.deserialize(result);
											result = iterator(result, item.key, i + 1);
											if (result !== void 0) {
												resolve(result);
												return;
											}
										}
										resolve();
									}, function(t, error) {
										reject(error);
									});
								});
							})["catch"](reject);
						});
						executeCallback(promise, callback);
						return promise;
					}
					function _setItem(key, value, callback, retriesLeft) {
						var self = this;
						key = normalizeKey(key);
						var promise = new Promise$1(function(resolve, reject) {
							self.ready().then(function() {
								if (value === void 0) value = null;
								var originalValue = value;
								var dbInfo = self._dbInfo;
								dbInfo.serializer.serialize(value, function(value, error) {
									if (error) reject(error);
									else dbInfo.db.transaction(function(t) {
										tryExecuteSql(t, dbInfo, "INSERT OR REPLACE INTO " + dbInfo.storeName + " (key, value) VALUES (?, ?)", [key, value], function() {
											resolve(originalValue);
										}, function(t, error) {
											reject(error);
										});
									}, function(sqlError) {
										if (sqlError.code === sqlError.QUOTA_ERR) {
											if (retriesLeft > 0) {
												resolve(_setItem.apply(self, [
													key,
													originalValue,
													callback,
													retriesLeft - 1
												]));
												return;
											}
											reject(sqlError);
										}
									});
								});
							})["catch"](reject);
						});
						executeCallback(promise, callback);
						return promise;
					}
					function setItem$1(key, value, callback) {
						return _setItem.apply(this, [
							key,
							value,
							callback,
							1
						]);
					}
					function removeItem$1(key, callback) {
						var self = this;
						key = normalizeKey(key);
						var promise = new Promise$1(function(resolve, reject) {
							self.ready().then(function() {
								var dbInfo = self._dbInfo;
								dbInfo.db.transaction(function(t) {
									tryExecuteSql(t, dbInfo, "DELETE FROM " + dbInfo.storeName + " WHERE key = ?", [key], function() {
										resolve();
									}, function(t, error) {
										reject(error);
									});
								});
							})["catch"](reject);
						});
						executeCallback(promise, callback);
						return promise;
					}
					function clear$1(callback) {
						var self = this;
						var promise = new Promise$1(function(resolve, reject) {
							self.ready().then(function() {
								var dbInfo = self._dbInfo;
								dbInfo.db.transaction(function(t) {
									tryExecuteSql(t, dbInfo, "DELETE FROM " + dbInfo.storeName, [], function() {
										resolve();
									}, function(t, error) {
										reject(error);
									});
								});
							})["catch"](reject);
						});
						executeCallback(promise, callback);
						return promise;
					}
					function length$1(callback) {
						var self = this;
						var promise = new Promise$1(function(resolve, reject) {
							self.ready().then(function() {
								var dbInfo = self._dbInfo;
								dbInfo.db.transaction(function(t) {
									tryExecuteSql(t, dbInfo, "SELECT COUNT(key) as c FROM " + dbInfo.storeName, [], function(t, results) {
										var result = results.rows.item(0).c;
										resolve(result);
									}, function(t, error) {
										reject(error);
									});
								});
							})["catch"](reject);
						});
						executeCallback(promise, callback);
						return promise;
					}
					function key$1(n, callback) {
						var self = this;
						var promise = new Promise$1(function(resolve, reject) {
							self.ready().then(function() {
								var dbInfo = self._dbInfo;
								dbInfo.db.transaction(function(t) {
									tryExecuteSql(t, dbInfo, "SELECT key FROM " + dbInfo.storeName + " WHERE id = ? LIMIT 1", [n + 1], function(t, results) {
										resolve(results.rows.length ? results.rows.item(0).key : null);
									}, function(t, error) {
										reject(error);
									});
								});
							})["catch"](reject);
						});
						executeCallback(promise, callback);
						return promise;
					}
					function keys$1(callback) {
						var self = this;
						var promise = new Promise$1(function(resolve, reject) {
							self.ready().then(function() {
								var dbInfo = self._dbInfo;
								dbInfo.db.transaction(function(t) {
									tryExecuteSql(t, dbInfo, "SELECT key FROM " + dbInfo.storeName, [], function(t, results) {
										var keys = [];
										for (var i = 0; i < results.rows.length; i++) keys.push(results.rows.item(i).key);
										resolve(keys);
									}, function(t, error) {
										reject(error);
									});
								});
							})["catch"](reject);
						});
						executeCallback(promise, callback);
						return promise;
					}
					function getAllStoreNames(db) {
						return new Promise$1(function(resolve, reject) {
							db.transaction(function(t) {
								t.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function(t, results) {
									var storeNames = [];
									for (var i = 0; i < results.rows.length; i++) storeNames.push(results.rows.item(i).name);
									resolve({
										db,
										storeNames
									});
								}, function(t, error) {
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
						var self = this;
						var promise;
						if (!options.name) promise = Promise$1.reject("Invalid arguments");
						else promise = new Promise$1(function(resolve) {
							var db;
							if (options.name === currentConfig.name) db = self._dbInfo.db;
							else db = openDatabase(options.name, "", "", 0);
							if (!options.storeName) resolve(getAllStoreNames(db));
							else resolve({
								db,
								storeNames: [options.storeName]
							});
						}).then(function(operationInfo) {
							return new Promise$1(function(resolve, reject) {
								operationInfo.db.transaction(function(t) {
									function dropTable(storeName) {
										return new Promise$1(function(resolve, reject) {
											t.executeSql("DROP TABLE IF EXISTS " + storeName, [], function() {
												resolve();
											}, function(t, error) {
												reject(error);
											});
										});
									}
									var operations = [];
									for (var i = 0, len = operationInfo.storeNames.length; i < len; i++) operations.push(dropTable(operationInfo.storeNames[i]));
									Promise$1.all(operations).then(function() {
										resolve();
									})["catch"](function(e) {
										reject(e);
									});
								}, function(sqlError) {
									reject(sqlError);
								});
							});
						});
						executeCallback(promise, callback);
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
							return typeof localStorage !== "undefined" && "setItem" in localStorage && !!localStorage.setItem;
						} catch (e) {
							return false;
						}
					}
					function _getKeyPrefix(options, defaultConfig) {
						var keyPrefix = options.name + "/";
						if (options.storeName !== defaultConfig.storeName) keyPrefix += options.storeName + "/";
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
						var self = this;
						var dbInfo = {};
						if (options) for (var i in options) dbInfo[i] = options[i];
						dbInfo.keyPrefix = _getKeyPrefix(options, self._defaultConfig);
						if (!_isLocalStorageUsable()) return Promise$1.reject();
						self._dbInfo = dbInfo;
						dbInfo.serializer = localforageSerializer;
						return Promise$1.resolve();
					}
					function clear$2(callback) {
						var self = this;
						var promise = self.ready().then(function() {
							var keyPrefix = self._dbInfo.keyPrefix;
							for (var i = localStorage.length - 1; i >= 0; i--) {
								var key = localStorage.key(i);
								if (key.indexOf(keyPrefix) === 0) localStorage.removeItem(key);
							}
						});
						executeCallback(promise, callback);
						return promise;
					}
					function getItem$2(key, callback) {
						var self = this;
						key = normalizeKey(key);
						var promise = self.ready().then(function() {
							var dbInfo = self._dbInfo;
							var result = localStorage.getItem(dbInfo.keyPrefix + key);
							if (result) result = dbInfo.serializer.deserialize(result);
							return result;
						});
						executeCallback(promise, callback);
						return promise;
					}
					function iterate$2(iterator, callback) {
						var self = this;
						var promise = self.ready().then(function() {
							var dbInfo = self._dbInfo;
							var keyPrefix = dbInfo.keyPrefix;
							var keyPrefixLength = keyPrefix.length;
							var length = localStorage.length;
							var iterationNumber = 1;
							for (var i = 0; i < length; i++) {
								var key = localStorage.key(i);
								if (key.indexOf(keyPrefix) !== 0) continue;
								var value = localStorage.getItem(key);
								if (value) value = dbInfo.serializer.deserialize(value);
								value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);
								if (value !== void 0) return value;
							}
						});
						executeCallback(promise, callback);
						return promise;
					}
					function key$2(n, callback) {
						var self = this;
						var promise = self.ready().then(function() {
							var dbInfo = self._dbInfo;
							var result;
							try {
								result = localStorage.key(n);
							} catch (error) {
								result = null;
							}
							if (result) result = result.substring(dbInfo.keyPrefix.length);
							return result;
						});
						executeCallback(promise, callback);
						return promise;
					}
					function keys$2(callback) {
						var self = this;
						var promise = self.ready().then(function() {
							var dbInfo = self._dbInfo;
							var length = localStorage.length;
							var keys = [];
							for (var i = 0; i < length; i++) {
								var itemKey = localStorage.key(i);
								if (itemKey.indexOf(dbInfo.keyPrefix) === 0) keys.push(itemKey.substring(dbInfo.keyPrefix.length));
							}
							return keys;
						});
						executeCallback(promise, callback);
						return promise;
					}
					function length$2(callback) {
						var promise = this.keys().then(function(keys) {
							return keys.length;
						});
						executeCallback(promise, callback);
						return promise;
					}
					function removeItem$2(key, callback) {
						var self = this;
						key = normalizeKey(key);
						var promise = self.ready().then(function() {
							var dbInfo = self._dbInfo;
							localStorage.removeItem(dbInfo.keyPrefix + key);
						});
						executeCallback(promise, callback);
						return promise;
					}
					function setItem$2(key, value, callback) {
						var self = this;
						key = normalizeKey(key);
						var promise = self.ready().then(function() {
							if (value === void 0) value = null;
							var originalValue = value;
							return new Promise$1(function(resolve, reject) {
								var dbInfo = self._dbInfo;
								dbInfo.serializer.serialize(value, function(value, error) {
									if (error) reject(error);
									else try {
										localStorage.setItem(dbInfo.keyPrefix + key, value);
										resolve(originalValue);
									} catch (e) {
										if (e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED") reject(e);
										reject(e);
									}
								});
							});
						});
						executeCallback(promise, callback);
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
						var self = this;
						var promise;
						if (!options.name) promise = Promise$1.reject("Invalid arguments");
						else promise = new Promise$1(function(resolve) {
							if (!options.storeName) resolve(options.name + "/");
							else resolve(_getKeyPrefix(options, self._defaultConfig));
						}).then(function(keyPrefix) {
							for (var i = localStorage.length - 1; i >= 0; i--) {
								var key = localStorage.key(i);
								if (key.indexOf(keyPrefix) === 0) localStorage.removeItem(key);
							}
						});
						executeCallback(promise, callback);
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
					var sameValue = function sameValue(x, y) {
						return x === y || typeof x === "number" && typeof y === "number" && isNaN(x) && isNaN(y);
					};
					var includes = function includes(array, searchElement) {
						var len = array.length;
						var i = 0;
						while (i < len) {
							if (sameValue(array[i], searchElement)) return true;
							i++;
						}
						return false;
					};
					var isArray = Array.isArray || function(arg) {
						return Object.prototype.toString.call(arg) === "[object Array]";
					};
					var DefinedDrivers = {};
					var DriverSupport = {};
					var DefaultDrivers = {
						INDEXEDDB: asyncStorage,
						WEBSQL: webSQLStorage,
						LOCALSTORAGE: localStorageWrapper
					};
					var DefaultDriverOrder = [
						DefaultDrivers.INDEXEDDB._driver,
						DefaultDrivers.WEBSQL._driver,
						DefaultDrivers.LOCALSTORAGE._driver
					];
					var OptionalDriverMethods = ["dropInstance"];
					var LibraryMethods = [
						"clear",
						"getItem",
						"iterate",
						"key",
						"keys",
						"length",
						"removeItem",
						"setItem"
					].concat(OptionalDriverMethods);
					var DefaultConfig = {
						description: "",
						driver: DefaultDriverOrder.slice(),
						name: "localforage",
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
								for (var _key in arg) if (arg.hasOwnProperty(_key)) if (isArray(arg[_key])) arguments[0][_key] = arg[_key].slice();
								else arguments[0][_key] = arg[_key];
							}
						}
						return arguments[0];
					}
					module$16.exports = new (function() {
						function LocalForage(options) {
							_classCallCheck(this, LocalForage);
							for (var driverTypeKey in DefaultDrivers) if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
								var driver = DefaultDrivers[driverTypeKey];
								var driverName = driver._driver;
								this[driverTypeKey] = driverName;
								if (!DefinedDrivers[driverName]) this.defineDriver(driver);
							}
							this._defaultConfig = extend({}, DefaultConfig);
							this._config = extend({}, this._defaultConfig, options);
							this._driverSet = null;
							this._initDriver = null;
							this._ready = false;
							this._dbInfo = null;
							this._wrapLibraryMethodsWithReady();
							this.setDriver(this._config.driver)["catch"](function() {});
						}
						LocalForage.prototype.config = function config(options) {
							if ((typeof options === "undefined" ? "undefined" : _typeof(options)) === "object") {
								if (this._ready) return new Error("Can't call config() after localforage has been used.");
								for (var i in options) {
									if (i === "storeName") options[i] = options[i].replace(/\W/g, "_");
									if (i === "version" && typeof options[i] !== "number") return new Error("Database version must be a number.");
									this._config[i] = options[i];
								}
								if ("driver" in options && options.driver) return this.setDriver(this._config.driver);
								return true;
							} else if (typeof options === "string") return this._config[options];
							else return this._config;
						};
						LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
							var promise = new Promise$1(function(resolve, reject) {
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
										if ((!includes(OptionalDriverMethods, driverMethodName) || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== "function") {
											reject(complianceError);
											return;
										}
									}
									(function configureMissingMethods() {
										var methodNotImplementedFactory = function methodNotImplementedFactory(methodName) {
											return function() {
												var error = new Error("Method " + methodName + " is not implemented by the current driver");
												var promise = Promise$1.reject(error);
												executeCallback(promise, arguments[arguments.length - 1]);
												return promise;
											};
										};
										for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
											var optionalDriverMethod = OptionalDriverMethods[_i];
											if (!driverObject[optionalDriverMethod]) driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
										}
									})();
									var setDriverSupport = function setDriverSupport(support) {
										if (DefinedDrivers[driverName]) console.info("Redefining LocalForage driver: " + driverName);
										DefinedDrivers[driverName] = driverObject;
										DriverSupport[driverName] = support;
										resolve();
									};
									if ("_support" in driverObject) if (driverObject._support && typeof driverObject._support === "function") driverObject._support().then(setDriverSupport, reject);
									else setDriverSupport(!!driverObject._support);
									else setDriverSupport(true);
								} catch (e) {
									reject(e);
								}
							});
							executeTwoCallbacks(promise, callback, errorCallback);
							return promise;
						};
						LocalForage.prototype.driver = function driver() {
							return this._driver || null;
						};
						LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
							var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error("Driver not found."));
							executeTwoCallbacks(getDriverPromise, callback, errorCallback);
							return getDriverPromise;
						};
						LocalForage.prototype.getSerializer = function getSerializer(callback) {
							var serializerPromise = Promise$1.resolve(localforageSerializer);
							executeTwoCallbacks(serializerPromise, callback);
							return serializerPromise;
						};
						LocalForage.prototype.ready = function ready(callback) {
							var self = this;
							var promise = self._driverSet.then(function() {
								if (self._ready === null) self._ready = self._initDriver();
								return self._ready;
							});
							executeTwoCallbacks(promise, callback, callback);
							return promise;
						};
						LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
							var self = this;
							if (!isArray(drivers)) drivers = [drivers];
							var supportedDrivers = this._getSupportedDrivers(drivers);
							function setDriverToConfig() {
								self._config.driver = self.driver();
							}
							function extendSelfWithDriver(driver) {
								self._extend(driver);
								setDriverToConfig();
								self._ready = self._initStorage(self._config);
								return self._ready;
							}
							function initDriver(supportedDrivers) {
								return function() {
									var currentDriverIndex = 0;
									function driverPromiseLoop() {
										while (currentDriverIndex < supportedDrivers.length) {
											var driverName = supportedDrivers[currentDriverIndex];
											currentDriverIndex++;
											self._dbInfo = null;
											self._ready = null;
											return self.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
										}
										setDriverToConfig();
										var error = new Error("No available storage method found.");
										self._driverSet = Promise$1.reject(error);
										return self._driverSet;
									}
									return driverPromiseLoop();
								};
							}
							var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function() {
								return Promise$1.resolve();
							}) : Promise$1.resolve();
							this._driverSet = oldDriverSetDone.then(function() {
								var driverName = supportedDrivers[0];
								self._dbInfo = null;
								self._ready = null;
								return self.getDriver(driverName).then(function(driver) {
									self._driver = driver._driver;
									setDriverToConfig();
									self._wrapLibraryMethodsWithReady();
									self._initDriver = initDriver(supportedDrivers);
								});
							})["catch"](function() {
								setDriverToConfig();
								var error = new Error("No available storage method found.");
								self._driverSet = Promise$1.reject(error);
								return self._driverSet;
							});
							executeTwoCallbacks(this._driverSet, callback, errorCallback);
							return this._driverSet;
						};
						LocalForage.prototype.supports = function supports(driverName) {
							return !!DriverSupport[driverName];
						};
						LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
							extend(this, libraryMethodsAndProperties);
						};
						LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
							var supportedDrivers = [];
							for (var i = 0, len = drivers.length; i < len; i++) {
								var driverName = drivers[i];
								if (this.supports(driverName)) supportedDrivers.push(driverName);
							}
							return supportedDrivers;
						};
						LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
							for (var i = 0, len = LibraryMethods.length; i < len; i++) callWhenReady(this, LibraryMethods[i]);
						};
						LocalForage.prototype.createInstance = function createInstance(options) {
							return new LocalForage(options);
						};
						return LocalForage;
					}())();
				}, { "3": 3 }]
			}, {}, [4])(4);
		});
	}))());
	function getSerializerPromise(localForageInstance) {
		if (getSerializerPromise.result) return getSerializerPromise.result;
		if (!localForageInstance || typeof localForageInstance.getSerializer !== "function") return Promise.reject(new Error("localforage.getSerializer() was not available! localforage v1.4+ is required!"));
		getSerializerPromise.result = localForageInstance.getSerializer();
		return getSerializerPromise.result;
	}
	function executeCallback(promise, callback) {
		if (callback) promise.then(function(result) {
			callback(null, result);
		}, function(error) {
			callback(error);
		});
	}
	function forEachItem(items, keyFn, valueFn, loopFn) {
		function ensurePropGetterMethod(propFn, defaultPropName) {
			var propName = propFn || defaultPropName;
			if ((!propFn || typeof propFn !== "function") && typeof propName === "string") propFn = function propFn(item) {
				return item[propName];
			};
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
		} else for (var prop in items) if (items.hasOwnProperty(prop)) result.push(loopFn(prop, items[prop]));
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
					var request = evt.target || this;
					lastError = request.error || request.transaction.error;
					reject(lastError);
				}
				forEachItem(items, keyFn, valueFn, function(key, value) {
					if (value === null) value = void 0;
					var request = store.put(value, key);
					request.onerror = requestOnError;
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
				dbInfo.db.transaction(function(t) {
					var query = "INSERT OR REPLACE INTO " + dbInfo.storeName + " (key, value) VALUES (?, ?)";
					var itemPromises = forEachItem(items, keyFn, valueFn, function(key, value) {
						return new Promise(function(resolve, reject) {
							serializer.serialize(value, function(value, error) {
								if (error) reject(error);
								else t.executeSql(query, [key, value], function() {
									resolve();
								}, function(t, error) {
									reject(error);
								});
							});
						});
					});
					Promise.all(itemPromises).then(function() {
						resolve(items);
					}, reject);
				}, function(sqlError) {
					reject(sqlError);
				});
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
		if (currentDriver === localforageInstance.INDEXEDDB) return setItemsIndexedDB.call(localforageInstance, items, keyFn, valueFn, callback);
		else if (currentDriver === localforageInstance.WEBSQL) return setItemsWebsql.call(localforageInstance, items, keyFn, valueFn, callback);
		else return setItemsGeneric.call(localforageInstance, items, keyFn, valueFn, callback);
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
	extendPrototype(import_localforage.default);
	var import_eventemitter3 = __toESM(__commonJSMin(((exports, module) => {
		var has = Object.prototype.hasOwnProperty;
		var prefix = "~";
		function Events() {}
		if (Object.create) {
			Events.prototype = Object.create(null);
			if (!new Events().__proto__) prefix = false;
		}
		function EE(fn, context, once) {
			this.fn = fn;
			this.context = context;
			this.once = once || false;
		}
		function addListener(emitter, event, fn, context, once) {
			if (typeof fn !== "function") throw new TypeError("The listener must be a function");
			var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
			if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
			else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
			else emitter._events[evt] = [emitter._events[evt], listener];
			return emitter;
		}
		function clearEvent(emitter, evt) {
			if (--emitter._eventsCount === 0) emitter._events = new Events();
			else delete emitter._events[evt];
		}
		function EventEmitter() {
			this._events = new Events();
			this._eventsCount = 0;
		}
		EventEmitter.prototype.eventNames = function eventNames() {
			var names = [], events, name;
			if (this._eventsCount === 0) return names;
			for (name in events = this._events) if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
			if (Object.getOwnPropertySymbols) return names.concat(Object.getOwnPropertySymbols(events));
			return names;
		};
		EventEmitter.prototype.listeners = function listeners(event) {
			var evt = prefix ? prefix + event : event, handlers = this._events[evt];
			if (!handlers) return [];
			if (handlers.fn) return [handlers.fn];
			for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) ee[i] = handlers[i].fn;
			return ee;
		};
		EventEmitter.prototype.listenerCount = function listenerCount(event) {
			var evt = prefix ? prefix + event : event, listeners = this._events[evt];
			if (!listeners) return 0;
			if (listeners.fn) return 1;
			return listeners.length;
		};
		EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
			var evt = prefix ? prefix + event : event;
			if (!this._events[evt]) return false;
			var listeners = this._events[evt], len = arguments.length, args, i;
			if (listeners.fn) {
				if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
				switch (len) {
					case 1: return listeners.fn.call(listeners.context), true;
					case 2: return listeners.fn.call(listeners.context, a1), true;
					case 3: return listeners.fn.call(listeners.context, a1, a2), true;
					case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
					case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
					case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
				}
				for (i = 1, args = new Array(len - 1); i < len; i++) args[i - 1] = arguments[i];
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
							if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) args[j - 1] = arguments[j];
							listeners[i].fn.apply(listeners[i].context, args);
					}
				}
			}
			return true;
		};
		EventEmitter.prototype.on = function on(event, fn, context) {
			return addListener(this, event, fn, context, false);
		};
		EventEmitter.prototype.once = function once(event, fn, context) {
			return addListener(this, event, fn, context, true);
		};
		EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
			var evt = prefix ? prefix + event : event;
			if (!this._events[evt]) return this;
			if (!fn) {
				clearEvent(this, evt);
				return this;
			}
			var listeners = this._events[evt];
			if (listeners.fn) {
				if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) clearEvent(this, evt);
			} else {
				for (var i = 0, events = [], length = listeners.length; i < length; i++) if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) events.push(listeners[i]);
				if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
				else clearEvent(this, evt);
			}
			return this;
		};
		EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
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
		EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
		EventEmitter.prototype.addListener = EventEmitter.prototype.on;
		EventEmitter.prefixed = prefix;
		EventEmitter.EventEmitter = EventEmitter;
		if ("undefined" !== typeof module) module.exports = EventEmitter;
	}))(), 1);
	var AsyncQueue = class {
		thread;
		queue = (0, vue.reactive)([]);
		emitter = new import_eventemitter3.default();
		singleRunning = false;
		constructor(thread = 1) {
			this.thread = thread;
		}
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
					await this.queue[0].fn();
					this.queue.shift();
				} while (this.queue.length > 0);
				this.singleRunning = false;
				this.emitter.emit("finish");
			} else {
				const running = this.runningThreadNum;
				if (running >= this.thread || this.queue.length === running) return;
				const idleItems = this.queue.filter(({ running }) => !running);
				for (let i = 0; i < Math.min(idleItems.length, this.thread - running); i++) {
					const item = idleItems[i];
					item.running = true;
					item.fn().then(async () => {
						removeAt(this.queue, this.queue.findIndex(({ id }) => id === item.id));
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
	};
	var dlQueue = new AsyncQueue();
	var zipQueue = new AsyncQueue(WORKER_THREAD_NUM);
	dlQueue.canSingleStart = () => !(settings.seriesMode && zipQueue.length);
	zipQueue.emitter.on("finish", () => {
		if (settings.seriesMode) dlQueue.start().catch(logger.error);
	});
	var _hoisted_1$11 = ["title"];
	var _hoisted_2$6 = { class: "download-item__title" };
	var _hoisted_3$3 = { class: "download-item__progress-text" };
	var DownloadItem_vue_vue_type_script_setup_true_lang_default = (0, vue.defineComponent)({
		__name: "DownloadItem",
		props: {
			item: {},
			index: {}
		},
		setup(__props) {
			const props = __props;
			const title = (0, vue.computed)(() => {
				const { english, japanese, pretty } = props.item.gallery.title;
				return japanese || english || pretty;
			});
			const progressWidth = (0, vue.computed)(() => {
				const { gallery: { pages }, done, compressing, compressingPercent } = props.item;
				const page = pages.length;
				return compressing ? compressingPercent : page && done ? (100 * done / page).toFixed(2) : 0;
			});
			const canCancel = (0, vue.computed)(() => !props.item.compressing);
			const cancel = () => {
				const { info } = props.index === 0 ? dlQueue.queue[0] : removeAt(dlQueue.queue, props.index);
				info?.cancel?.();
			};
			return (_ctx, _cache) => {
				return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					class: (0, vue.normalizeClass)(["download-item", {
						"download-item--error": __props.item.error,
						"download-item--compressing": __props.item.compressing && !__props.item.error,
						"download-item--can-cancel": canCancel.value
					}]),
					title: title.value
				}, [
					canCancel.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
						key: 0,
						class: "download-item__cancel",
						onClick: cancel
					}, [..._cache[0] || (_cache[0] = [(0, vue.createElementVNode)("i", { class: "fa fa-times" }, null, -1)])])) : (0, vue.createCommentVNode)("", true),
					(0, vue.createElementVNode)("div", _hoisted_2$6, (0, vue.toDisplayString)(title.value), 1),
					(0, vue.createElementVNode)("div", {
						class: "download-item__progress",
						style: (0, vue.normalizeStyle)({ width: `${progressWidth.value}%` })
					}, [(0, vue.createElementVNode)("div", _hoisted_3$3, (0, vue.toDisplayString)(progressWidth.value) + "%", 1)], 4)
				], 10, _hoisted_1$11);
			};
		}
	});
	var _plugin_vue_export_helper_default = (sfc, props) => {
		const target = sfc.__vccOpts || sfc;
		for (const [key, val] of props) target[key] = val;
		return target;
	};
	var DownloadItem_default = _plugin_vue_export_helper_default(DownloadItem_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-e90bde63"]]);
	var _hoisted_1$10 = { id: "download-panel" };
	var DownloadList_default = _plugin_vue_export_helper_default((0, vue.defineComponent)({
		__name: "DownloadList",
		props: {
			zipList: {},
			dlList: {}
		},
		setup(__props) {
			return (_ctx, _cache) => {
				return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_1$10, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(__props.zipList, (item, index) => {
					return (0, vue.openBlock)(), (0, vue.createBlock)(DownloadItem_default, {
						key: index,
						item,
						index
					}, null, 8, ["item", "index"]);
				}), 128)), ((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(__props.dlList, (item, index) => {
					return (0, vue.openBlock)(), (0, vue.createBlock)(DownloadItem_default, {
						key: index,
						item,
						index
					}, null, 8, ["item", "index"]);
				}), 128))]);
			};
		}
	}), [["__scopeId", "data-v-b1f64280"]]);
	var DownloadPanel_default = (0, vue.defineComponent)({
		__name: "DownloadPanel",
		setup(__props) {
			const { title } = document;
			const zipList = (0, vue.computed)(() => zipQueue.queue.map(({ info }) => info));
			const dlList = (0, vue.computed)(() => dlQueue.queue.map(({ info }) => info));
			const infoList = (0, vue.computed)(() => [...zipList.value, ...dlList.value]);
			const error = (0, vue.computed)(() => !!dlList.value[0]?.error);
			const titleWithStatus = (0, vue.computed)(() => {
				if (error.value) return `[×] ${title}`;
				return `[${infoList.value.length || "✓"}] ${title}`;
			});
			(0, vue.watch)(infoList, (val) => {
				sessionStorage.setItem("downloadQueue", JSON.stringify(val.map(({ gallery }) => gallery)));
			});
			(0, vue.watch)(titleWithStatus, (val) => {
				document.title = val;
			});
			return (_ctx, _cache) => {
				return infoList.value.length ? ((0, vue.openBlock)(), (0, vue.createBlock)(DownloadList_default, {
					key: 0,
					"zip-list": zipList.value,
					"dl-list": dlList.value
				}, null, 8, ["zip-list", "dl-list"])) : (0, vue.createCommentVNode)("", true);
			};
		}
	});
	function warn(msg, err) {
		if (typeof console !== "undefined") {
			console.warn(`[intlify] ` + msg);
			if (err) console.warn(err.stack);
		}
	}
	var inBrowser = typeof window !== "undefined";
	var makeSymbol = (name, shareable = false) => !shareable ? Symbol(name) : Symbol.for(name);
	var generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({
		l: locale,
		k: key,
		s: source
	});
	var friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
	var isNumber = (val) => typeof val === "number" && isFinite(val);
	var isRegExp = (val) => toTypeString(val) === "[object RegExp]";
	var isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
	var assign = Object.assign;
	var _create = Object.create;
	var create = (obj = null) => _create(obj);
	var _globalThis;
	var getGlobalThis = () => {
		return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : create());
	};
	function escapeHtml(rawText) {
		return rawText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\//g, "&#x2F;").replace(/=/g, "&#x3D;");
	}
	function escapeAttributeValue(value) {
		return value.replace(/&(?![a-zA-Z0-9#]{2,6};)/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	}
	var javascriptSchemePattern = /^\s*javascript\s*(?::|&#0*58;?|&#x0*3a;?|&colon;?)/i;
	var urlAttributePattern = /^(?:href|src|action|formaction)$/i;
	function hasJavascriptScheme(value) {
		return javascriptSchemePattern.test(value);
	}
	function sanitizeStyleValue(value) {
		const urlPattern = /url\s*\(/gi;
		let sanitized = "";
		let cursor = 0;
		let match;
		while ((match = urlPattern.exec(value)) !== null) {
			const urlStart = match.index;
			const openParenIndex = urlPattern.lastIndex - 1;
			let index = openParenIndex + 1;
			let depth = 1;
			let quote = null;
			for (; index < value.length; index++) {
				const char = value[index];
				if (quote) {
					if (char === quote) quote = null;
					continue;
				}
				if (char === "\"" || char === "'") quote = char;
				else if (char === "(") depth++;
				else if (char === ")") {
					depth--;
					if (depth === 0) break;
				}
			}
			if (depth !== 0) break;
			const rawUrlValue = value.slice(openParenIndex + 1, index).trim();
			const unquotedUrlValue = rawUrlValue.startsWith("\"") && rawUrlValue.endsWith("\"") || rawUrlValue.startsWith("'") && rawUrlValue.endsWith("'") ? rawUrlValue.slice(1, -1).trim() : rawUrlValue;
			sanitized += value.slice(cursor, urlStart);
			sanitized += hasJavascriptScheme(unquotedUrlValue) ? "url(about:blank)" : value.slice(urlStart, index + 1);
			cursor = index + 1;
		}
		return sanitized + value.slice(cursor);
	}
	function sanitizeAttributeValue(attrName, value) {
		if (urlAttributePattern.test(attrName) && hasJavascriptScheme(value)) return "about:blank";
		return escapeAttributeValue(attrName.toLowerCase() === "style" ? sanitizeStyleValue(value) : value);
	}
	function sanitizeTranslatedHtml(html) {
		html = html.replace(/([\w:-]+)\s*=\s*"([^"]*)"/g, (_, attrName, attrValue) => `${attrName}="${sanitizeAttributeValue(attrName, attrValue)}"`);
		html = html.replace(/([\w:-]+)\s*=\s*'([^']*)'/g, (_, attrName, attrValue) => `${attrName}='${sanitizeAttributeValue(attrName, attrValue)}'`);
		if (/\s*on\w+\s*=\s*["']?[^"'>]+["']?/gi.test(html)) html = html.replace(/(\s+)(on)(\w+\s*=)/gi, "$1&#111;n$3");
		html = html.replace(/(\s+(?:href|src|action|formaction)\s*=\s*)([^\s"'=<>`]+)/gi, (match, prefix, attrValue) => hasJavascriptScheme(attrValue) ? `${prefix}about:blank` : match);
		return html;
	}
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function hasOwn(obj, key) {
		return hasOwnProperty.call(obj, key);
	}
	var isArray = Array.isArray;
	var isFunction = (val) => typeof val === "function";
	var isString = (val) => typeof val === "string";
	var isBoolean = (val) => typeof val === "boolean";
	var isObject$2 = (val) => val !== null && typeof val === "object";
	var isPromise = (val) => {
		return isObject$2(val) && isFunction(val.then) && isFunction(val.catch);
	};
	var objectToString = Object.prototype.toString;
	var toTypeString = (value) => objectToString.call(value);
	var isPlainObject = (val) => toTypeString(val) === "[object Object]";
	var toDisplayString$1 = (val) => {
		return val == null ? "" : isArray(val) || isPlainObject(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
	};
	function join(items, separator = "") {
		return items.reduce((str, item, index) => index === 0 ? str + item : str + separator + item, "");
	}
	var isNotObjectOrIsArray = (val) => !isObject$2(val) || isArray(val);
	function deepCopy(src, des) {
		if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) throw new Error("Invalid value");
		const stack = [{
			src,
			des
		}];
		while (stack.length) {
			const { src, des } = stack.pop();
			Object.keys(src).forEach((key) => {
				if (key === "__proto__") return;
				if (isObject$2(src[key]) && !isObject$2(des[key])) des[key] = Array.isArray(src[key]) ? [] : create();
				if (isNotObjectOrIsArray(des[key]) || isNotObjectOrIsArray(src[key])) des[key] = src[key];
				else stack.push({
					src: src[key],
					des: des[key]
				});
			});
		}
	}
	function createPosition(line, column, offset) {
		return {
			line,
			column,
			offset
		};
	}
	function createLocation(start, end, source) {
		const loc = {
			start,
			end
		};
		if (source != null) loc.source = source;
		return loc;
	}
	var CompileErrorCodes = {
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
		MUST_HAVE_MESSAGES_IN_PLURAL: 11,
		UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
		UNEXPECTED_EMPTY_LINKED_KEY: 13,
		UNEXPECTED_LEXICAL_ANALYSIS: 14,
		UNHANDLED_CODEGEN_NODE_TYPE: 15,
		UNHANDLED_MINIFIER_NODE_TYPE: 16
	};
	CompileErrorCodes.EXPECTED_TOKEN, CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER, CompileErrorCodes.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, CompileErrorCodes.UNKNOWN_ESCAPE_SEQUENCE, CompileErrorCodes.INVALID_UNICODE_ESCAPE_SEQUENCE, CompileErrorCodes.UNBALANCED_CLOSING_BRACE, CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, CompileErrorCodes.EMPTY_PLACEHOLDER, CompileErrorCodes.NOT_ALLOW_NEST_PLACEHOLDER, CompileErrorCodes.INVALID_LINKED_FORMAT, CompileErrorCodes.MUST_HAVE_MESSAGES_IN_PLURAL, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_MODIFIER, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_KEY, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, CompileErrorCodes.UNHANDLED_CODEGEN_NODE_TYPE, CompileErrorCodes.UNHANDLED_MINIFIER_NODE_TYPE;
	function createCompileError(code, loc, options = {}) {
		const { domain, messages, args } = options;
		const error = new SyntaxError(String(code));
		error.code = code;
		if (loc) error.location = loc;
		error.domain = domain;
		return error;
	}
	function defaultOnError(error) {
		throw error;
	}
	var CHAR_SP = " ";
	var CHAR_CR = "\r";
	var CHAR_LF = "\n";
	var CHAR_LS = String.fromCharCode(8232);
	var CHAR_PS = String.fromCharCode(8233);
	function createScanner(str) {
		const _buf = str;
		let _index = 0;
		let _line = 1;
		let _column = 1;
		let _peekOffset = 0;
		const isCRLF = (index) => _buf[index] === CHAR_CR && _buf[index + 1] === CHAR_LF;
		const isLF = (index) => _buf[index] === CHAR_LF;
		const isPS = (index) => _buf[index] === CHAR_PS;
		const isLS = (index) => _buf[index] === CHAR_LS;
		const isLineEnd = (index) => isCRLF(index) || isLF(index) || isPS(index) || isLS(index);
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
			if (isCRLF(_index)) _index++;
			_index++;
			_column++;
			return _buf[_index];
		}
		function peek() {
			if (isCRLF(_index + _peekOffset)) _peekOffset++;
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
			while (target !== _index) next();
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
	var EOF = void 0;
	var DOT = ".";
	var LITERAL_DELIMITER = "'";
	var ERROR_DOMAIN$3 = "tokenizer";
	function createTokenizer(source, options = {}) {
		const location = options.location !== false;
		const _scnr = createScanner(source);
		const currentOffset = () => _scnr.index();
		const currentPosition = () => createPosition(_scnr.line(), _scnr.column(), _scnr.index());
		const _initLoc = currentPosition();
		const _initOffset = currentOffset();
		const _context = {
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
		};
		const context = () => _context;
		const { onError } = options;
		function emitError(code, pos, offset, ...args) {
			const ctx = context();
			pos.column += offset;
			pos.offset += offset;
			if (onError) {
				const err = createCompileError(code, location ? createLocation(ctx.startLoc, pos) : null, {
					domain: ERROR_DOMAIN$3,
					args
				});
				onError(err);
			}
		}
		function getToken(context, type, value) {
			context.endLoc = currentPosition();
			context.currentType = type;
			const token = { type };
			if (location) token.loc = createLocation(context.startLoc, context.endLoc);
			if (value != null) token.value = value;
			return token;
		}
		const getEndToken = (context) => getToken(context, 13);
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
			if (ch === EOF) return false;
			const cc = ch.charCodeAt(0);
			return cc >= 97 && cc <= 122 || cc >= 65 && cc <= 90 || cc === 95;
		}
		function isNumberStart(ch) {
			if (ch === EOF) return false;
			const cc = ch.charCodeAt(0);
			return cc >= 48 && cc <= 57;
		}
		function isNamedIdentifierStart(scnr, context) {
			const { currentType } = context;
			if (currentType !== 2) return false;
			peekSpaces(scnr);
			const ret = isIdentifierStart(scnr.currentPeek());
			scnr.resetPeek();
			return ret;
		}
		function isListIdentifierStart(scnr, context) {
			const { currentType } = context;
			if (currentType !== 2) return false;
			peekSpaces(scnr);
			const ret = isNumberStart(scnr.currentPeek() === "-" ? scnr.peek() : scnr.currentPeek());
			scnr.resetPeek();
			return ret;
		}
		function isLiteralStart(scnr, context) {
			const { currentType } = context;
			if (currentType !== 2) return false;
			peekSpaces(scnr);
			const ret = scnr.currentPeek() === LITERAL_DELIMITER;
			scnr.resetPeek();
			return ret;
		}
		function isLinkedDotStart(scnr, context) {
			const { currentType } = context;
			if (currentType !== 7) return false;
			peekSpaces(scnr);
			const ret = scnr.currentPeek() === ".";
			scnr.resetPeek();
			return ret;
		}
		function isLinkedModifierStart(scnr, context) {
			const { currentType } = context;
			if (currentType !== 8) return false;
			peekSpaces(scnr);
			const ret = isIdentifierStart(scnr.currentPeek());
			scnr.resetPeek();
			return ret;
		}
		function isLinkedDelimiterStart(scnr, context) {
			const { currentType } = context;
			if (!(currentType === 7 || currentType === 11)) return false;
			peekSpaces(scnr);
			const ret = scnr.currentPeek() === ":";
			scnr.resetPeek();
			return ret;
		}
		function isLinkedReferStart(scnr, context) {
			const { currentType } = context;
			if (currentType !== 9) return false;
			const fn = () => {
				const ch = scnr.currentPeek();
				if (ch === "{") return isIdentifierStart(scnr.peek());
				else if (ch === "@" || ch === "|" || ch === ":" || ch === "." || ch === CHAR_SP || !ch) return false;
				else if (ch === CHAR_LF) {
					scnr.peek();
					return fn();
				} else return isTextStart(scnr, false);
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
		function isTextStart(scnr, reset = true) {
			const fn = (hasSpace = false, prev = "") => {
				const ch = scnr.currentPeek();
				if (ch === "{") return hasSpace;
				else if (ch === "@" || !ch) return hasSpace;
				else if (ch === "|") return !(prev === CHAR_SP || prev === CHAR_LF);
				else if (ch === CHAR_SP) {
					scnr.peek();
					return fn(true, CHAR_SP);
				} else if (ch === CHAR_LF) {
					scnr.peek();
					return fn(true, CHAR_LF);
				} else return true;
			};
			const ret = fn();
			reset && scnr.resetPeek();
			return ret;
		}
		function takeChar(scnr, fn) {
			const ch = scnr.currentChar();
			if (ch === EOF) return;
			if (fn(ch)) {
				scnr.next();
				return ch;
			}
			return null;
		}
		function isIdentifier(ch) {
			const cc = ch.charCodeAt(0);
			return cc >= 97 && cc <= 122 || cc >= 65 && cc <= 90 || cc >= 48 && cc <= 57 || cc === 95 || cc === 36;
		}
		function takeIdentifierChar(scnr) {
			return takeChar(scnr, isIdentifier);
		}
		function isNamedIdentifier(ch) {
			const cc = ch.charCodeAt(0);
			return cc >= 97 && cc <= 122 || cc >= 65 && cc <= 90 || cc >= 48 && cc <= 57 || cc === 95 || cc === 36 || cc === 45;
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
			return cc >= 48 && cc <= 57 || cc >= 65 && cc <= 70 || cc >= 97 && cc <= 102;
		}
		function takeHexDigit(scnr) {
			return takeChar(scnr, isHexDigit);
		}
		function getDigits(scnr) {
			let ch = "";
			let num = "";
			while (ch = takeDigit(scnr)) num += ch;
			return num;
		}
		function readText(scnr) {
			let buf = "";
			while (true) {
				const ch = scnr.currentChar();
				if (ch === "\\") {
					const nextCh = scnr.peek();
					if (nextCh === "{" || nextCh === "}" || nextCh === "@" || nextCh === "|" || nextCh === "\\") {
						buf += ch + nextCh;
						scnr.next();
						scnr.next();
					} else {
						scnr.resetPeek();
						buf += ch;
						scnr.next();
					}
				} else if (ch === "{" || ch === "}" || ch === "@" || ch === "|" || !ch) break;
				else if (ch === CHAR_SP || ch === CHAR_LF) if (isTextStart(scnr)) {
					buf += ch;
					scnr.next();
				} else if (isPluralStart(scnr)) break;
				else {
					buf += ch;
					scnr.next();
				}
				else {
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
			while (ch = takeNamedIdentifierChar(scnr)) name += ch;
			const currentChar = scnr.currentChar();
			if (currentChar && currentChar !== "}" && currentChar !== EOF && currentChar !== CHAR_SP && currentChar !== CHAR_LF && currentChar !== "　") {
				const invalidPart = readInvalidIdentifier(scnr);
				emitError(CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER, currentPosition(), 0, name + invalidPart);
				return name + invalidPart;
			}
			if (scnr.currentChar() === EOF) emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
			return name;
		}
		function readListIdentifier(scnr) {
			skipSpaces(scnr);
			let value = "";
			if (scnr.currentChar() === "-") {
				scnr.next();
				value += `-${getDigits(scnr)}`;
			} else value += getDigits(scnr);
			if (scnr.currentChar() === EOF) emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
			return value;
		}
		function isLiteral(ch) {
			return ch !== LITERAL_DELIMITER && ch !== CHAR_LF;
		}
		function readLiteral(scnr) {
			skipSpaces(scnr);
			eat(scnr, `\'`);
			let ch = "";
			let literal = "";
			while (ch = takeChar(scnr, isLiteral)) if (ch === "\\") literal += readEscapeSequence(scnr);
			else literal += ch;
			const current = scnr.currentChar();
			if (current === CHAR_LF || current === EOF) {
				emitError(CompileErrorCodes.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, currentPosition(), 0);
				if (current === CHAR_LF) {
					scnr.next();
					eat(scnr, `\'`);
				}
				return literal;
			}
			eat(scnr, `\'`);
			return literal;
		}
		function readEscapeSequence(scnr) {
			const ch = scnr.currentChar();
			switch (ch) {
				case "\\":
				case `\'`:
					scnr.next();
					return `\\${ch}`;
				case "u": return readUnicodeEscapeSequence(scnr, ch, 4);
				case "U": return readUnicodeEscapeSequence(scnr, ch, 6);
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
			while (ch = takeChar(scnr, isInvalidIdentifier)) identifiers += ch;
			return identifiers;
		}
		function readLinkedModifier(scnr) {
			let ch = "";
			let name = "";
			while (ch = takeIdentifierChar(scnr)) name += ch;
			return name;
		}
		function readLinkedRefer(scnr) {
			const fn = (buf) => {
				const ch = scnr.currentChar();
				if (ch === "{" || ch === "@" || ch === "|" || ch === "(" || ch === ")" || !ch) return buf;
				else if (ch === CHAR_SP) return buf;
				else if (ch === CHAR_LF || ch === DOT) {
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
			const plural = eat(scnr, "|");
			skipSpaces(scnr);
			return plural;
		}
		function readTokenInPlaceholder(scnr, context) {
			let token = null;
			switch (scnr.currentChar()) {
				case "{":
					if (context.braceNest >= 1) emitError(CompileErrorCodes.NOT_ALLOW_NEST_PLACEHOLDER, currentPosition(), 0);
					scnr.next();
					token = getToken(context, 2, "{");
					skipSpaces(scnr);
					context.braceNest++;
					return token;
				case "}":
					if (context.braceNest > 0 && context.currentType === 2) emitError(CompileErrorCodes.EMPTY_PLACEHOLDER, currentPosition(), 0);
					scnr.next();
					token = getToken(context, 3, "}");
					context.braceNest--;
					context.braceNest > 0 && skipSpaces(scnr);
					if (context.inLinked && context.braceNest === 0) context.inLinked = false;
					return token;
				case "@":
					if (context.braceNest > 0) emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
					token = readTokenInLinked(scnr, context) || getEndToken(context);
					context.braceNest = 0;
					return token;
				default: {
					let validNamedIdentifier = true;
					let validListIdentifier = true;
					let validLiteral = true;
					if (isPluralStart(scnr)) {
						if (context.braceNest > 0) emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
						token = getToken(context, 1, readPlural(scnr));
						context.braceNest = 0;
						context.inLinked = false;
						return token;
					}
					if (context.braceNest > 0 && (context.currentType === 4 || context.currentType === 5 || context.currentType === 6)) {
						emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
						context.braceNest = 0;
						return readToken(scnr, context);
					}
					if (validNamedIdentifier = isNamedIdentifierStart(scnr, context)) {
						token = getToken(context, 4, readNamedIdentifier(scnr));
						skipSpaces(scnr);
						return token;
					}
					if (validListIdentifier = isListIdentifierStart(scnr, context)) {
						token = getToken(context, 5, readListIdentifier(scnr));
						skipSpaces(scnr);
						return token;
					}
					if (validLiteral = isLiteralStart(scnr, context)) {
						token = getToken(context, 6, readLiteral(scnr));
						skipSpaces(scnr);
						return token;
					}
					if (!validNamedIdentifier && !validListIdentifier && !validLiteral) {
						token = getToken(context, 12, readInvalidIdentifier(scnr));
						emitError(CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER, currentPosition(), 0, token.value);
						skipSpaces(scnr);
						return token;
					}
					break;
				}
			}
			return token;
		}
		function readTokenInLinked(scnr, context) {
			const { currentType } = context;
			let token = null;
			const ch = scnr.currentChar();
			if ((currentType === 7 || currentType === 8 || currentType === 11 || currentType === 9) && (ch === CHAR_LF || ch === CHAR_SP)) emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
			switch (ch) {
				case "@":
					scnr.next();
					token = getToken(context, 7, "@");
					context.inLinked = true;
					return token;
				case ".":
					skipSpaces(scnr);
					scnr.next();
					return getToken(context, 8, ".");
				case ":":
					skipSpaces(scnr);
					scnr.next();
					return getToken(context, 9, ":");
				default:
					if (isPluralStart(scnr)) {
						token = getToken(context, 1, readPlural(scnr));
						context.braceNest = 0;
						context.inLinked = false;
						return token;
					}
					if (isLinkedDotStart(scnr, context) || isLinkedDelimiterStart(scnr, context)) {
						skipSpaces(scnr);
						return readTokenInLinked(scnr, context);
					}
					if (isLinkedModifierStart(scnr, context)) {
						skipSpaces(scnr);
						return getToken(context, 11, readLinkedModifier(scnr));
					}
					if (isLinkedReferStart(scnr, context)) {
						skipSpaces(scnr);
						if (ch === "{") return readTokenInPlaceholder(scnr, context) || token;
						else return getToken(context, 10, readLinkedRefer(scnr));
					}
					if (currentType === 7) emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
					context.braceNest = 0;
					context.inLinked = false;
					return readToken(scnr, context);
			}
		}
		function readToken(scnr, context) {
			let token = { type: 13 };
			if (context.braceNest > 0) return readTokenInPlaceholder(scnr, context) || getEndToken(context);
			if (context.inLinked) return readTokenInLinked(scnr, context) || getEndToken(context);
			switch (scnr.currentChar()) {
				case "{": return readTokenInPlaceholder(scnr, context) || getEndToken(context);
				case "}":
					emitError(CompileErrorCodes.UNBALANCED_CLOSING_BRACE, currentPosition(), 0);
					scnr.next();
					return getToken(context, 3, "}");
				case "@": return readTokenInLinked(scnr, context) || getEndToken(context);
				default:
					if (isPluralStart(scnr)) {
						token = getToken(context, 1, readPlural(scnr));
						context.braceNest = 0;
						context.inLinked = false;
						return token;
					}
					if (isTextStart(scnr)) return getToken(context, 0, readText(scnr));
					break;
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
			if (_scnr.currentChar() === EOF) return getToken(_context, 13);
			return readToken(_scnr, _context);
		}
		return {
			nextToken,
			currentOffset,
			currentPosition,
			context
		};
	}
	var ERROR_DOMAIN$2 = "parser";
	var KNOWN_ESCAPES = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
	var TEXT_ESCAPES = /\\([\\@{}|])/g;
	function fromTextEscapeSequence(_match, char) {
		return char;
	}
	function fromEscapeSequence(match, codePoint4, codePoint6) {
		switch (match) {
			case `\\\\`: return `\\`;
			case `\\\'`: return `\'`;
			default: {
				const codePoint = parseInt(codePoint4 || codePoint6, 16);
				if (codePoint <= 55295 || codePoint >= 57344) return String.fromCodePoint(codePoint);
				return "�";
			}
		}
	}
	function createParser(options = {}) {
		const location = options.location !== false;
		const { onError } = options;
		function emitError(tokenzer, code, start, offset, ...args) {
			const end = tokenzer.currentPosition();
			end.offset += offset;
			end.column += offset;
			if (onError) {
				const err = createCompileError(code, location ? createLocation(start, end) : null, {
					domain: ERROR_DOMAIN$2,
					args
				});
				onError(err);
			}
		}
		function startNode(type, offset, loc) {
			const node = { type };
			if (location) {
				node.start = offset;
				node.end = offset;
				node.loc = {
					start: loc,
					end: loc
				};
			}
			return node;
		}
		function endNode(node, offset, pos, type) {
			if (location) {
				node.end = offset;
				if (node.loc) node.loc.end = pos;
			}
		}
		function parseText(tokenizer, value) {
			const context = tokenizer.context();
			const node = startNode(3, context.offset, context.startLoc);
			node.value = value.replace(TEXT_ESCAPES, fromTextEscapeSequence);
			endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
			return node;
		}
		function parseList(tokenizer, index) {
			const { lastOffset: offset, lastStartLoc: loc } = tokenizer.context();
			const node = startNode(5, offset, loc);
			node.index = parseInt(index, 10);
			tokenizer.nextToken();
			endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
			return node;
		}
		function parseNamed(tokenizer, key) {
			const { lastOffset: offset, lastStartLoc: loc } = tokenizer.context();
			const node = startNode(4, offset, loc);
			node.key = key;
			tokenizer.nextToken();
			endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
			return node;
		}
		function parseLiteral(tokenizer, value) {
			const { lastOffset: offset, lastStartLoc: loc } = tokenizer.context();
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
			if (token.type !== 11) {
				emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_MODIFIER, context.lastStartLoc, 0);
				node.value = "";
				endNode(node, offset, loc);
				return {
					nextConsumeToken: token,
					node
				};
			}
			if (token.value == null) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
			node.value = token.value || "";
			endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
			return { node };
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
			if (token.type === 8) {
				const parsed = parseLinkedModifier(tokenizer);
				linkedNode.modifier = parsed.node;
				token = parsed.nextConsumeToken || tokenizer.nextToken();
			}
			if (token.type !== 9) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
			token = tokenizer.nextToken();
			if (token.type === 2) token = tokenizer.nextToken();
			switch (token.type) {
				case 10:
					if (token.value == null) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
					linkedNode.key = parseLinkedKey(tokenizer, token.value || "");
					break;
				case 4:
					if (token.value == null) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
					linkedNode.key = parseNamed(tokenizer, token.value || "");
					break;
				case 5:
					if (token.value == null) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
					linkedNode.key = parseList(tokenizer, token.value || "");
					break;
				case 6:
					if (token.value == null) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
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
			return { node: linkedNode };
		}
		function parseMessage(tokenizer) {
			const context = tokenizer.context();
			const node = startNode(2, context.currentType === 1 ? tokenizer.currentOffset() : context.offset, context.currentType === 1 ? context.endLoc : context.startLoc);
			node.items = [];
			let nextToken = null;
			do {
				const token = nextToken || tokenizer.nextToken();
				nextToken = null;
				switch (token.type) {
					case 0:
						if (token.value == null) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
						node.items.push(parseText(tokenizer, token.value || ""));
						break;
					case 5:
						if (token.value == null) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
						node.items.push(parseList(tokenizer, token.value || ""));
						break;
					case 4:
						if (token.value == null) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
						node.items.push(parseNamed(tokenizer, token.value || ""));
						break;
					case 6:
						if (token.value == null) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
						node.items.push(parseLiteral(tokenizer, token.value || ""));
						break;
					case 7: {
						const parsed = parseLinked(tokenizer);
						node.items.push(parsed.node);
						nextToken = parsed.nextConsumeToken || null;
						break;
					}
				}
			} while (context.currentType !== 13 && context.currentType !== 1);
			endNode(node, context.currentType === 1 ? context.lastOffset : tokenizer.currentOffset(), context.currentType === 1 ? context.lastEndLoc : tokenizer.currentPosition());
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
				if (!hasEmptyMessage) hasEmptyMessage = msg.items.length === 0;
				node.cases.push(msg);
			} while (context.currentType !== 13);
			if (hasEmptyMessage) emitError(tokenizer, CompileErrorCodes.MUST_HAVE_MESSAGES_IN_PLURAL, loc, 0);
			endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
			return node;
		}
		function parseResource(tokenizer) {
			const context = tokenizer.context();
			const { offset, startLoc } = context;
			const msgNode = parseMessage(tokenizer);
			if (context.currentType === 13) return msgNode;
			else return parsePlural(tokenizer, offset, startLoc, msgNode);
		}
		function parse(source) {
			const tokenizer = createTokenizer(source, assign({}, options));
			const context = tokenizer.context();
			const node = startNode(0, context.offset, context.startLoc);
			if (location && node.loc) node.loc.source = source;
			node.body = parseResource(tokenizer);
			if (options.onCacheKey) node.cacheKey = options.onCacheKey(source);
			if (context.currentType !== 13) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, source[context.offset] || "");
			endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
			return node;
		}
		return { parse };
	}
	function getTokenCaption(token) {
		if (token.type === 13) return "EOF";
		const name = (token.value || "").replace(/\r?\n/gu, "\\n");
		return name.length > 10 ? name.slice(0, 9) + "…" : name;
	}
	function createTransformer(ast, options = {}) {
		const _context = {
			ast,
			helpers: new Set()
		};
		const context = () => _context;
		const helper = (name) => {
			_context.helpers.add(name);
			return name;
		};
		return {
			context,
			helper
		};
	}
	function traverseNodes(nodes, transformer) {
		for (let i = 0; i < nodes.length; i++) traverseNode(nodes[i], transformer);
	}
	function traverseNode(node, transformer) {
		switch (node.type) {
			case 1:
				traverseNodes(node.cases, transformer);
				transformer.helper("plural");
				break;
			case 2:
				traverseNodes(node.items, transformer);
				break;
			case 6:
				traverseNode(node.key, transformer);
				transformer.helper("linked");
				transformer.helper("type");
				break;
			case 5:
				transformer.helper("interpolate");
				transformer.helper("list");
				break;
			case 4:
				transformer.helper("interpolate");
				transformer.helper("named");
				break;
		}
	}
	function transform(ast, options = {}) {
		const transformer = createTransformer(ast);
		transformer.helper("normalize");
		ast.body && traverseNode(ast.body, transformer);
		const context = transformer.context();
		ast.helpers = Array.from(context.helpers);
	}
	function optimize(ast) {
		const body = ast.body;
		if (body.type === 2) optimizeMessageNode(body);
		else body.cases.forEach((c) => optimizeMessageNode(c));
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
			const values = [];
			for (let i = 0; i < message.items.length; i++) {
				const item = message.items[i];
				if (!(item.type === 3 || item.type === 9)) break;
				if (item.value == null) break;
				values.push(item.value);
			}
			if (values.length === message.items.length) {
				message.static = join(values);
				for (let i = 0; i < message.items.length; i++) {
					const item = message.items[i];
					if (item.type === 3 || item.type === 9) delete item.value;
				}
			}
		}
	}
	function minify(node) {
		node.t = node.type;
		switch (node.type) {
			case 0: {
				const resource = node;
				minify(resource.body);
				resource.b = resource.body;
				delete resource.body;
				break;
			}
			case 1: {
				const plural = node;
				const cases = plural.cases;
				for (let i = 0; i < cases.length; i++) minify(cases[i]);
				plural.c = cases;
				delete plural.cases;
				break;
			}
			case 2: {
				const message = node;
				const items = message.items;
				for (let i = 0; i < items.length; i++) minify(items[i]);
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
			default:
		}
		delete node.type;
	}
	function createCodeGenerator(ast, options) {
		const { filename, breakLineCode, needIndent: _needIndent } = options;
		const location = options.location !== false;
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
		if (location && ast.loc) _context.source = ast.loc.source;
		const context = () => _context;
		function push(code, node) {
			_context.code += code;
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
		generator.push(`${helper("linked")}(`);
		generateNode(generator, node.key);
		if (node.modifier) {
			generator.push(`, `);
			generateNode(generator, node.modifier);
			generator.push(`, _type`);
		} else generator.push(`, undefined, _type`);
		generator.push(`)`);
	}
	function generateMessageNode(generator, node) {
		const { helper, needIndent } = generator;
		generator.push(`${helper("normalize")}([`);
		generator.indent(needIndent());
		const length = node.items.length;
		for (let i = 0; i < length; i++) {
			generateNode(generator, node.items[i]);
			if (i === length - 1) break;
			generator.push(", ");
		}
		generator.deindent(needIndent());
		generator.push("])");
	}
	function generatePluralNode(generator, node) {
		const { helper, needIndent } = generator;
		if (node.cases.length > 1) {
			generator.push(`${helper("plural")}([`);
			generator.indent(needIndent());
			const length = node.cases.length;
			for (let i = 0; i < length; i++) {
				generateNode(generator, node.cases[i]);
				if (i === length - 1) break;
				generator.push(", ");
			}
			generator.deindent(needIndent());
			generator.push(`])`);
		}
	}
	function generateResource(generator, node) {
		if (node.body) generateNode(generator, node.body);
		else generator.push("null");
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
				generator.push(`${helper("interpolate")}(${helper("list")}(${node.index}))`, node);
				break;
			case 4:
				generator.push(`${helper("interpolate")}(${helper("named")}(${JSON.stringify(node.key)}))`, node);
				break;
			case 9:
				generator.push(JSON.stringify(node.value), node);
				break;
			case 3:
				generator.push(JSON.stringify(node.value), node);
				break;
			default:
		}
	}
	var generate = (ast, options = {}) => {
		const mode = isString(options.mode) ? options.mode : "normal";
		const filename = isString(options.filename) ? options.filename : "message.intl";
		options.sourceMap;
		const breakLineCode = options.breakLineCode != null ? options.breakLineCode : mode === "arrow" ? ";" : "\n";
		const needIndent = options.needIndent ? options.needIndent : mode !== "arrow";
		const helpers = ast.helpers || [];
		const generator = createCodeGenerator(ast, {
			filename,
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
		const { code, map } = generator.context();
		return {
			ast,
			code,
			map: map ? map.toJSON() : void 0
		};
	};
	function baseCompile$1(source, options = {}) {
		const assignedOptions = assign({}, options);
		const jit = !!assignedOptions.jit;
		const enalbeMinify = !!assignedOptions.minify;
		const enambeOptimize = assignedOptions.optimize == null ? true : assignedOptions.optimize;
		const ast = createParser(assignedOptions).parse(source);
		if (!jit) {
			transform(ast, assignedOptions);
			return generate(ast, assignedOptions);
		} else {
			enambeOptimize && optimize(ast);
			enalbeMinify && minify(ast);
			return {
				ast,
				code: ""
			};
		}
	}
	function initFeatureFlags$1() {
		if (typeof __INTLIFY_PROD_DEVTOOLS__ !== "boolean") getGlobalThis().__INTLIFY_PROD_DEVTOOLS__ = false;
	}
	function isMessageAST(val) {
		return isObject$2(val) && resolveType(val) === 0 && (hasOwn(val, "b") || hasOwn(val, "body"));
	}
	var PROPS_BODY = ["b", "body"];
	function resolveBody(node) {
		return resolveProps(node, PROPS_BODY);
	}
	var PROPS_CASES = ["c", "cases"];
	function resolveCases(node) {
		return resolveProps(node, PROPS_CASES, []);
	}
	var PROPS_STATIC = ["s", "static"];
	function resolveStatic(node) {
		return resolveProps(node, PROPS_STATIC);
	}
	var PROPS_ITEMS = ["i", "items"];
	function resolveItems(node) {
		return resolveProps(node, PROPS_ITEMS, []);
	}
	var PROPS_TYPE = ["t", "type"];
	function resolveType(node) {
		return resolveProps(node, PROPS_TYPE);
	}
	var PROPS_VALUE = ["v", "value"];
	function resolveValue$1(node, type) {
		const resolved = resolveProps(node, PROPS_VALUE);
		if (resolved != null) return resolved;
		else throw createUnhandleNodeError(type);
	}
	var PROPS_MODIFIER = ["m", "modifier"];
	function resolveLinkedModifier(node) {
		return resolveProps(node, PROPS_MODIFIER);
	}
	var PROPS_KEY = ["k", "key"];
	function resolveLinkedKey(node) {
		const resolved = resolveProps(node, PROPS_KEY);
		if (resolved) return resolved;
		else throw createUnhandleNodeError(6);
	}
	function resolveProps(node, props, defaultValue) {
		for (let i = 0; i < props.length; i++) {
			const prop = props[i];
			if (hasOwn(node, prop) && node[prop] != null) return node[prop];
		}
		return defaultValue;
	}
	var AST_NODE_PROPS_KEYS = [
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
		const msg = (ctx) => formatParts(ctx, ast);
		return msg;
	}
	function formatParts(ctx, ast) {
		const body = resolveBody(ast);
		if (body == null) throw createUnhandleNodeError(0);
		if (resolveType(body) === 1) {
			const cases = resolveCases(body);
			return ctx.plural(cases.reduce((messages, c) => [...messages, formatMessageParts(ctx, c)], []));
		} else return formatMessageParts(ctx, body);
	}
	function formatMessageParts(ctx, node) {
		const static_ = resolveStatic(node);
		if (static_ != null) return ctx.type === "text" ? static_ : ctx.normalize([static_]);
		else {
			const messages = resolveItems(node).reduce((acm, c) => [...acm, formatMessagePart(ctx, c)], []);
			return ctx.normalize(messages);
		}
	}
	function formatMessagePart(ctx, node) {
		const type = resolveType(node);
		switch (type) {
			case 3: return resolveValue$1(node, type);
			case 9: return resolveValue$1(node, type);
			case 4: {
				const named = node;
				if (hasOwn(named, "k") && named.k) return ctx.interpolate(ctx.named(named.k));
				if (hasOwn(named, "key") && named.key) return ctx.interpolate(ctx.named(named.key));
				throw createUnhandleNodeError(type);
			}
			case 5: {
				const list = node;
				if (hasOwn(list, "i") && isNumber(list.i)) return ctx.interpolate(ctx.list(list.i));
				if (hasOwn(list, "index") && isNumber(list.index)) return ctx.interpolate(ctx.list(list.index));
				throw createUnhandleNodeError(type);
			}
			case 6: {
				const linked = node;
				const modifier = resolveLinkedModifier(linked);
				const key = resolveLinkedKey(linked);
				return ctx.linked(formatMessagePart(ctx, key), modifier ? formatMessagePart(ctx, modifier) : void 0, ctx.type);
			}
			case 7: return resolveValue$1(node, type);
			case 8: return resolveValue$1(node, type);
			default: throw new Error(`unhandled node on format message part: ${type}`);
		}
	}
	var defaultOnCacheKey = (message) => message;
	var compileCache = create();
	function baseCompile(message, options = {}) {
		let detectError = false;
		const onError = options.onError || defaultOnError;
		options.onError = (err) => {
			detectError = true;
			onError(err);
		};
		return {
			...baseCompile$1(message, options),
			detectError
		};
	}
	function compile(message, context) {
		if (isString(message)) {
			isBoolean(context.warnHtmlMessage) && context.warnHtmlMessage;
			const cacheKey = (context.onCacheKey || defaultOnCacheKey)(message);
			const cached = compileCache[cacheKey];
			if (cached) return cached;
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
				if (cached) return cached;
				return compileCache[cacheKey] = format(message);
			} else return format(message);
		}
	}
	var devtools = null;
	function setDevToolsHook(hook) {
		devtools = hook;
	}
	function initI18nDevTools(i18n, version, meta) {
		devtools && devtools.emit("i18n:init", {
			timestamp: Date.now(),
			i18n,
			version,
			meta
		});
	}
	var translateDevTools = createDevToolsHook("function:translate");
	function createDevToolsHook(hook) {
		return (payloads) => devtools && devtools.emit(hook, payloads);
	}
	var CoreErrorCodes = {
		INVALID_ARGUMENT: 17,
		INVALID_DATE_ARGUMENT: 18,
		INVALID_ISO_DATE_ARGUMENT: 19,
		NOT_SUPPORT_NON_STRING_MESSAGE: 20,
		NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
		NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
		NOT_SUPPORT_LOCALE_TYPE: 23
	};
	function createCoreError(code) {
		return createCompileError(code, null, void 0);
	}
	CoreErrorCodes.INVALID_ARGUMENT, CoreErrorCodes.INVALID_DATE_ARGUMENT, CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT, CoreErrorCodes.NOT_SUPPORT_NON_STRING_MESSAGE, CoreErrorCodes.NOT_SUPPORT_LOCALE_PROMISE_VALUE, CoreErrorCodes.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION, CoreErrorCodes.NOT_SUPPORT_LOCALE_TYPE;
	function getLocale(context, options) {
		return options.locale != null ? resolveLocale(options.locale) : resolveLocale(context.locale);
	}
	var _resolveLocale;
	function resolveLocale(locale) {
		if (isString(locale)) return locale;
		else if (isFunction(locale)) if (locale.resolvedOnce && _resolveLocale != null) return _resolveLocale;
		else if (locale.constructor.name === "Function") {
			const resolve = locale();
			if (isPromise(resolve)) throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
			return _resolveLocale = resolve;
		} else throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
		else throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_TYPE);
	}
	function fallbackWithSimple(ctx, fallback, start) {
		return [...new Set([start, ...isArray(fallback) ? fallback : isObject$2(fallback) ? Object.keys(fallback) : isString(fallback) ? [fallback] : [start]])];
	}
	var pathStateMachine = [];
	pathStateMachine[0] = {
		["w"]: [0],
		["i"]: [3, 0],
		["["]: [4],
		["o"]: [7]
	};
	pathStateMachine[1] = {
		["w"]: [1],
		["."]: [2],
		["["]: [4],
		["o"]: [7]
	};
	pathStateMachine[2] = {
		["w"]: [2],
		["i"]: [3, 0],
		["0"]: [3, 0]
	};
	pathStateMachine[3] = {
		["i"]: [3, 0],
		["0"]: [3, 0],
		["w"]: [1, 1],
		["."]: [2, 1],
		["["]: [4, 1],
		["o"]: [7, 1]
	};
	pathStateMachine[4] = {
		["'"]: [5, 0],
		["\""]: [6, 0],
		["["]: [4, 2],
		["]"]: [1, 3],
		["o"]: 8,
		["l"]: [4, 0]
	};
	pathStateMachine[5] = {
		["'"]: [4, 0],
		["o"]: 8,
		["l"]: [5, 0]
	};
	pathStateMachine[6] = {
		["\""]: [4, 0],
		["o"]: 8,
		["l"]: [6, 0]
	};
	var literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
	function isLiteral(exp) {
		return literalValueRE.test(exp);
	}
	function stripQuotes(str) {
		const a = str.charCodeAt(0);
		return a === str.charCodeAt(str.length - 1) && (a === 34 || a === 39) ? str.slice(1, -1) : str;
	}
	function getPathCharType(ch) {
		if (ch === void 0 || ch === null) return "o";
		switch (ch.charCodeAt(0)) {
			case 91:
			case 93:
			case 46:
			case 34:
			case 39: return ch;
			case 95:
			case 36:
			case 45: return "i";
			case 9:
			case 10:
			case 13:
			case 160:
			case 65279:
			case 8232:
			case 8233: return "w";
		}
		return "i";
	}
	function formatSubPath(path) {
		const trimmed = path.trim();
		if (path.charAt(0) === "0" && isNaN(parseInt(path))) return false;
		return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
	}
	function parse(path) {
		const keys = [];
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
		actions[0] = () => {
			if (key === void 0) key = newChar;
			else key += newChar;
		};
		actions[1] = () => {
			if (key !== void 0) {
				keys.push(key);
				key = void 0;
			}
		};
		actions[2] = () => {
			actions[0]();
			subPathDepth++;
		};
		actions[3] = () => {
			if (subPathDepth > 0) {
				subPathDepth--;
				mode = 4;
				actions[0]();
			} else {
				subPathDepth = 0;
				if (key === void 0) return false;
				key = formatSubPath(key);
				if (key === false) return false;
				else actions[1]();
			}
		};
		function maybeUnescapeQuote() {
			const nextChar = path[index + 1];
			if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === "\"") {
				index++;
				newChar = "\\" + nextChar;
				actions[0]();
				return true;
			}
		}
		while (mode !== null) {
			index++;
			c = path[index];
			if (c === "\\" && maybeUnescapeQuote()) continue;
			type = getPathCharType(c);
			typeMap = pathStateMachine[mode];
			transition = typeMap[type] || typeMap["l"] || 8;
			if (transition === 8) return;
			mode = transition[0];
			if (transition[1] !== void 0) {
				action = actions[transition[1]];
				if (action) {
					newChar = c;
					if (action() === false) return;
				}
			}
			if (mode === 7) return keys;
		}
	}
	var cache = new Map();
	function resolveWithKeyValue(obj, path) {
		return isObject$2(obj) ? obj[path] : null;
	}
	function resolveValue(obj, path) {
		if (!isObject$2(obj)) return null;
		let hit = cache.get(path);
		if (!hit) {
			hit = parse(path);
			if (hit) cache.set(path, hit);
		}
		if (!hit) return null;
		const len = hit.length;
		let last = obj;
		let i = 0;
		while (i < len) {
			const key = hit[i];
			if (AST_NODE_PROPS_KEYS.includes(key) && isMessageAST(last)) return null;
			if (!isObject$2(last)) return null;
			if (!hasOwn(last, key)) return null;
			const val = last[key];
			if (val === void 0) return null;
			if (isFunction(last)) return null;
			last = val;
			i++;
		}
		return last;
	}
	var CoreWarnCodes = {
		NOT_FOUND_KEY: 1,
		FALLBACK_TO_TRANSLATE: 2,
		CANNOT_FORMAT_NUMBER: 3,
		FALLBACK_TO_NUMBER_FORMAT: 4,
		CANNOT_FORMAT_DATE: 5,
		FALLBACK_TO_DATE_FORMAT: 6,
		EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: 7,
		INVALID_NUMBER_ARGUMENT: 8,
		INVALID_DATE_ARGUMENT: 9
	};
	CoreWarnCodes.NOT_FOUND_KEY, CoreWarnCodes.FALLBACK_TO_TRANSLATE, CoreWarnCodes.CANNOT_FORMAT_NUMBER, CoreWarnCodes.FALLBACK_TO_NUMBER_FORMAT, CoreWarnCodes.CANNOT_FORMAT_DATE, CoreWarnCodes.FALLBACK_TO_DATE_FORMAT, CoreWarnCodes.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER, CoreWarnCodes.INVALID_NUMBER_ARGUMENT, CoreWarnCodes.INVALID_DATE_ARGUMENT;
	var VERSION$1 = "11.4.6";
	var DEFAULT_LOCALE = "en-US";
	var capitalize = (str) => `${str.charAt(0).toLocaleUpperCase()}${str.substr(1)}`;
	function getDefaultLinkedModifiers() {
		return {
			upper: (val, type) => {
				return type === "text" && isString(val) ? val.toUpperCase() : type === "vnode" && isObject$2(val) && "__v_isVNode" in val ? val.children.toUpperCase() : val;
			},
			lower: (val, type) => {
				return type === "text" && isString(val) ? val.toLowerCase() : type === "vnode" && isObject$2(val) && "__v_isVNode" in val ? val.children.toLowerCase() : val;
			},
			capitalize: (val, type) => {
				return type === "text" && isString(val) ? capitalize(val) : type === "vnode" && isObject$2(val) && "__v_isVNode" in val ? capitalize(val.children) : val;
			}
		};
	}
	var _compiler;
	function registerMessageCompiler(compiler) {
		_compiler = compiler;
	}
	var _resolver;
	function registerMessageResolver(resolver) {
		_resolver = resolver;
	}
	var _fallbacker;
	var _additionalMeta = null;
	var getAdditionalMeta = () => _additionalMeta;
	var _fallbackContext = null;
	var setFallbackContext = (context) => {
		_fallbackContext = context;
	};
	var getFallbackContext = () => _fallbackContext;
	var _cid = 0;
	function createCoreContext(options = {}) {
		const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
		const version = isString(options.version) ? options.version : VERSION$1;
		const locale = isString(options.locale) || isFunction(options.locale) ? options.locale : DEFAULT_LOCALE;
		const _locale = isFunction(locale) ? DEFAULT_LOCALE : locale;
		const fallbackLocale = isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || isString(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale;
		const messages = isPlainObject(options.messages) ? options.messages : createResources(_locale);
		const datetimeFormats = isPlainObject(options.datetimeFormats) ? options.datetimeFormats : createResources(_locale);
		const numberFormats = isPlainObject(options.numberFormats) ? options.numberFormats : createResources(_locale);
		const modifiers = assign(create(), options.modifiers, getDefaultLinkedModifiers());
		const pluralRules = options.pluralRules || create();
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
		const fallbackContext = isObject$2(options.fallbackContext) ? options.fallbackContext : void 0;
		const internalOptions = options;
		const __datetimeFormatters = isObject$2(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : new Map();
		const __numberFormatters = isObject$2(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : new Map();
		const __meta = isObject$2(internalOptions.__meta) ? internalOptions.__meta : {};
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
		context.datetimeFormats = datetimeFormats;
		context.numberFormats = numberFormats;
		context.__datetimeFormatters = __datetimeFormatters;
		context.__numberFormatters = __numberFormatters;
		if (__INTLIFY_PROD_DEVTOOLS__) initI18nDevTools(context, version, __meta);
		return context;
	}
	var createResources = (locale) => ({ [locale]: create() });
	function handleMissing(context, key, locale, missingWarn, type) {
		const { missing, onWarn } = context;
		if (missing !== null) {
			const ret = missing(context, locale, key, type);
			return isString(ret) ? ret : key;
		} else return key;
	}
	function updateFallbackLocale(ctx, locale, fallback) {
		const context = ctx;
		context.__localeChainCache = new Map();
		ctx.localeFallbacker(ctx, fallback, locale);
	}
	function isAlmostSameLocale(locale, compareLocale) {
		if (locale === compareLocale) return false;
		return locale.split("-")[0] === compareLocale.split("-")[0];
	}
	function isImplicitFallback(targetLocale, locales) {
		const index = locales.indexOf(targetLocale);
		if (index === -1) return false;
		for (let i = index + 1; i < locales.length; i++) if (isAlmostSameLocale(targetLocale, locales[i])) return true;
		return false;
	}
	var intlDefined = typeof Intl !== "undefined";
	intlDefined && Intl.DateTimeFormat, intlDefined && Intl.NumberFormat;
	var DEFAULT_MODIFIER = (str) => str;
	var DEFAULT_MESSAGE = (ctx) => "";
	var DEFAULT_MESSAGE_DATA_TYPE = "text";
	var DEFAULT_NORMALIZE = (values) => values.length === 0 ? "" : join(values);
	var DEFAULT_INTERPOLATE = toDisplayString$1;
	function pluralDefault(choice, choicesLength) {
		choice = Math.abs(choice);
		if (choicesLength === 2) return choice === 1 ? 0 : 1;
		return Math.min(choice, 2);
	}
	function getPluralIndex(options) {
		const index = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
		return isNumber(options.named?.count) ? options.named.count : isNumber(options.named?.n) ? options.named.n : index;
	}
	function createMessageContext(options = {}) {
		const locale = options.locale;
		const pluralIndex = getPluralIndex(options);
		const pluralRule = isString(locale) && isFunction(options.pluralRules?.[locale]) ? options.pluralRules[locale] : pluralDefault;
		const orgPluralRule = pluralRule === pluralDefault ? void 0 : pluralDefault;
		const plural = (messages) => messages[pluralRule(pluralIndex, messages.length, orgPluralRule)];
		const _list = options.list || [];
		const list = (index) => _list[index];
		const _named = options.named || create();
		if (isNumber(options.pluralIndex)) {
			_named.count ||= options.pluralIndex;
			_named.n ||= options.pluralIndex;
		}
		const named = (key) => _named[key];
		function message(key, useLinked) {
			const msg = isFunction(options.messages) ? options.messages(key, !!useLinked) : isObject$2(options.messages) ? options.messages[key] : false;
			return !msg ? options.parent ? options.parent.message(key) : DEFAULT_MESSAGE : msg;
		}
		const _modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER;
		const normalize = isFunction(options.processor?.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
		const interpolate = isFunction(options.processor?.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
		const type = isString(options.processor?.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
		const linked = (key, ...args) => {
			const [arg1, arg2] = args;
			let type = "text";
			let modifier = "";
			if (args.length === 1) {
				if (isObject$2(arg1)) {
					modifier = arg1.modifier || modifier;
					type = arg1.type || type;
				} else if (isString(arg1)) modifier = arg1 || modifier;
			} else if (args.length === 2) {
				if (isString(arg1)) modifier = arg1 || modifier;
				if (isString(arg2)) type = arg2 || type;
			}
			const ret = message(key, true)(ctx);
			const resolved = ret === "" || ret === void 0 ? key : ret;
			const msg = type === "vnode" && isArray(resolved) && modifier ? resolved[0] : resolved;
			return modifier ? _modifier(modifier)(msg, type) : msg;
		};
		const ctx = {
			["list"]: list,
			["named"]: named,
			["plural"]: plural,
			["linked"]: linked,
			["message"]: message,
			["type"]: type,
			["interpolate"]: interpolate,
			["normalize"]: normalize,
			["values"]: assign(create(), _list, _named)
		};
		return ctx;
	}
	var NOOP_MESSAGE_FUNCTION = () => "";
	var isMessageFunction = (val) => isFunction(val);
	function translate(context, ...args) {
		const { fallbackFormat, postTranslation, unresolving, messageCompiler, fallbackLocale, messages } = context;
		const [key, options] = parseTranslateArgs(...args);
		const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
		const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
		const escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
		const resolvedMessage = !!options.resolvedMessage;
		const defaultMsgOrKey = isString(options.default) || isBoolean(options.default) ? !isBoolean(options.default) ? options.default : !messageCompiler ? () => key : key : fallbackFormat ? !messageCompiler ? () => key : key : null;
		const enableDefaultMsg = fallbackFormat || defaultMsgOrKey != null && (isString(defaultMsgOrKey) || isFunction(defaultMsgOrKey));
		const locale = getLocale(context, options);
		escapeParameter && escapeParams(options);
		let [formatScope, targetLocale, message] = !resolvedMessage ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) : [
			key,
			locale,
			messages[locale] || create()
		];
		let format = formatScope;
		let cacheBaseKey = key;
		if (!resolvedMessage && !(isString(format) || isMessageAST(format) || isMessageFunction(format))) {
			if (enableDefaultMsg) {
				format = defaultMsgOrKey;
				cacheBaseKey = format;
			}
		}
		if (!resolvedMessage && (!(isString(format) || isMessageAST(format) || isMessageFunction(format)) || !isString(targetLocale))) return unresolving ? -1 : key;
		let occurred = false;
		const onError = () => {
			occurred = true;
		};
		const msg = !isMessageFunction(format) ? compileMessageFormat(context, key, targetLocale, format, cacheBaseKey, onError) : format;
		if (occurred) return format;
		const messaged = evaluateMessage(context, msg, createMessageContext(getMessageContextOptions(context, targetLocale, message, options)));
		let ret = postTranslation ? postTranslation(messaged, key) : messaged;
		if (escapeParameter && isString(ret)) ret = sanitizeTranslatedHtml(ret);
		if (__INTLIFY_PROD_DEVTOOLS__) {
			const payloads = {
				timestamp: Date.now(),
				key: isString(key) ? key : isMessageFunction(format) ? format.key : "",
				locale: targetLocale || (isMessageFunction(format) ? format.locale : ""),
				format: isString(format) ? format : isMessageFunction(format) ? format.source : "",
				message: ret
			};
			payloads.meta = assign({}, context.__meta, getAdditionalMeta() || {});
			translateDevTools(payloads);
		}
		return ret;
	}
	function escapeParams(options) {
		if (isArray(options.list)) options.list = options.list.map((item) => isString(item) ? escapeHtml(item) : item);
		else if (isObject$2(options.named)) Object.keys(options.named).forEach((key) => {
			if (isString(options.named[key])) options.named[key] = escapeHtml(options.named[key]);
		});
	}
	function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
		const { messages, onWarn, messageResolver: resolveValue, localeFallbacker } = context;
		const locales = localeFallbacker(context, fallbackLocale, locale);
		let message = create();
		let targetLocale;
		let format = null;
		const type = "translate";
		for (let i = 0; i < locales.length; i++) {
			targetLocale = locales[i];
			message = messages[targetLocale] || create();
			if ((format = resolveValue(message, key)) === null) format = message[key];
			if (isString(format) || isMessageAST(format) || isMessageFunction(format)) break;
			if (!isImplicitFallback(targetLocale, locales)) {
				const missingRet = handleMissing(context, key, targetLocale, missingWarn, type);
				if (missingRet !== key) format = missingRet;
			}
		}
		return [
			format,
			targetLocale,
			message
		];
	}
	function compileMessageFormat(context, key, targetLocale, format, cacheBaseKey, onError) {
		const { messageCompiler, warnHtmlMessage } = context;
		if (isMessageFunction(format)) {
			const msg = format;
			msg.locale = msg.locale || targetLocale;
			msg.key = msg.key || key;
			return msg;
		}
		if (messageCompiler == null) {
			const msg = (() => format);
			msg.locale = targetLocale;
			msg.key = key;
			return msg;
		}
		const msg = messageCompiler(format, getCompileContext(context, targetLocale, cacheBaseKey, format, warnHtmlMessage, onError));
		msg.locale = targetLocale;
		msg.key = key;
		msg.source = format;
		return msg;
	}
	function evaluateMessage(context, msg, msgCtx) {
		return msg(msgCtx);
	}
	function parseTranslateArgs(...args) {
		const [arg1, arg2, arg3] = args;
		const options = create();
		if (!isString(arg1) && !isNumber(arg1) && !isMessageFunction(arg1) && !isMessageAST(arg1)) throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
		const key = isNumber(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
		if (isNumber(arg2)) options.plural = arg2;
		else if (isString(arg2)) options.default = arg2;
		else if (isPlainObject(arg2) && !isEmptyObject(arg2)) options.named = arg2;
		else if (isArray(arg2)) options.list = arg2;
		if (isNumber(arg3)) options.plural = arg3;
		else if (isString(arg3)) options.default = arg3;
		else if (isPlainObject(arg3)) assign(options, arg3);
		return [key, options];
	}
	function getCompileContext(context, locale, key, source, warnHtmlMessage, onError) {
		return {
			locale,
			key,
			warnHtmlMessage,
			onError: (err) => {
				onError && onError(err);
				throw err;
			},
			onCacheKey: (source) => generateFormatCacheKey(locale, key, source)
		};
	}
	function getMessageContextOptions(context, locale, message, options) {
		const { modifiers, pluralRules, messageResolver: resolveValue, fallbackLocale, fallbackWarn, missingWarn, fallbackContext } = context;
		const resolveMessage = (key, useLinked) => {
			let val = resolveValue(message, key);
			if (val == null && (fallbackContext || useLinked)) {
				const [format, , message] = resolveMessageFormat(fallbackContext || context, key, locale, fallbackLocale, fallbackWarn, missingWarn);
				val = format ?? resolveValue(message, key);
			}
			if (isString(val) || isMessageAST(val)) {
				let occurred = false;
				const onError = () => {
					occurred = true;
				};
				const msg = compileMessageFormat(context, key, locale, val, key, onError);
				return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
			} else if (isMessageFunction(val)) return val;
			else return NOOP_MESSAGE_FUNCTION;
		};
		const ctxOptions = {
			locale,
			modifiers,
			pluralRules,
			messages: resolveMessage
		};
		if (context.processor) ctxOptions.processor = context.processor;
		if (options.list) ctxOptions.list = options.list;
		if (options.named) ctxOptions.named = options.named;
		if (isNumber(options.plural)) ctxOptions.pluralIndex = options.plural;
		return ctxOptions;
	}
	initFeatureFlags$1();
	var VERSION = "11.4.6";
	function initFeatureFlags() {
		if (typeof __INTLIFY_PROD_DEVTOOLS__ !== "boolean") getGlobalThis().__INTLIFY_PROD_DEVTOOLS__ = false;
	}
	var I18nErrorCodes = {
		UNEXPECTED_RETURN_TYPE: 24,
		INVALID_ARGUMENT: 25,
		MUST_BE_CALL_SETUP_TOP: 26,
		NOT_INSTALLED: 27,
		REQUIRED_VALUE: 28,
		INVALID_VALUE: 29,
		CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: 30,
		NOT_INSTALLED_WITH_PROVIDE: 31,
		UNEXPECTED_ERROR: 32,
		NOT_COMPATIBLE_LEGACY_VUE_I18N: 33,
		NOT_AVAILABLE_COMPOSITION_IN_LEGACY: 34
	};
	function createI18nError(code, ...args) {
		return createCompileError(code, null, void 0);
	}
	I18nErrorCodes.UNEXPECTED_RETURN_TYPE, I18nErrorCodes.INVALID_ARGUMENT, I18nErrorCodes.MUST_BE_CALL_SETUP_TOP, I18nErrorCodes.NOT_INSTALLED, I18nErrorCodes.UNEXPECTED_ERROR, I18nErrorCodes.REQUIRED_VALUE, I18nErrorCodes.INVALID_VALUE, I18nErrorCodes.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN, I18nErrorCodes.NOT_INSTALLED_WITH_PROVIDE, I18nErrorCodes.NOT_COMPATIBLE_LEGACY_VUE_I18N, I18nErrorCodes.NOT_AVAILABLE_COMPOSITION_IN_LEGACY;
	var SetPluralRulesSymbol = makeSymbol("__setPluralRules");
	makeSymbol("__intlifyMeta");
	var DisposeSymbol = makeSymbol("__dispose");
	var I18nWarnCodes = {
		FALLBACK_TO_ROOT: 10,
		NOT_FOUND_PARENT_SCOPE: 11,
		IGNORE_OBJ_FLATTEN: 12,
		DEPRECATE_LEGACY_MODE: 13,
		DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE: 14,
		DUPLICATE_USE_I18N_CALLING: 15
	};
	I18nWarnCodes.FALLBACK_TO_ROOT, I18nWarnCodes.NOT_FOUND_PARENT_SCOPE, I18nWarnCodes.IGNORE_OBJ_FLATTEN, I18nWarnCodes.DEPRECATE_LEGACY_MODE, I18nWarnCodes.DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE, I18nWarnCodes.DUPLICATE_USE_I18N_CALLING;
	function handleFlatJson(obj) {
		if (!isObject$2(obj)) return obj;
		if (isMessageAST(obj)) return obj;
		for (const key in obj) {
			if (!hasOwn(obj, key)) continue;
			if (!key.includes(".")) {
				if (isObject$2(obj[key])) handleFlatJson(obj[key]);
			} else {
				const subKeys = key.split(".");
				const lastIndex = subKeys.length - 1;
				let currentObj = obj;
				let hasStringValue = false;
				for (let i = 0; i < lastIndex; i++) {
					if (subKeys[i] === "__proto__") throw new Error(`unsafe key: ${subKeys[i]}`);
					if (!(subKeys[i] in currentObj)) currentObj[subKeys[i]] = create();
					if (!isObject$2(currentObj[subKeys[i]])) {
						hasStringValue = true;
						break;
					}
					currentObj = currentObj[subKeys[i]];
				}
				if (!hasStringValue) {
					if (!isMessageAST(currentObj)) {
						currentObj[subKeys[lastIndex]] = obj[key];
						delete obj[key];
					} else if (!AST_NODE_PROPS_KEYS.includes(subKeys[lastIndex])) delete obj[key];
				}
				if (!isMessageAST(currentObj)) {
					const target = currentObj[subKeys[lastIndex]];
					if (isObject$2(target)) handleFlatJson(target);
				}
			}
		}
		return obj;
	}
	function getLocaleMessages(locale, options) {
		const { messages, __i18n, messageResolver, flatJson } = options;
		const ret = isPlainObject(messages) ? messages : isArray(__i18n) ? create() : { [locale]: create() };
		if (isArray(__i18n)) __i18n.forEach((custom) => {
			if ("locale" in custom && "resource" in custom) {
				const { locale, resource } = custom;
				if (locale) {
					ret[locale] = ret[locale] || create();
					deepCopy(resource, ret[locale]);
				} else deepCopy(resource, ret);
			} else isString(custom) && deepCopy(JSON.parse(custom), ret);
		});
		if (messageResolver == null && flatJson) {
			for (const key in ret) if (hasOwn(ret, key)) handleFlatJson(ret[key]);
		}
		return ret;
	}
	function getComponentOptions(instance) {
		return instance.type;
	}
	function adjustI18nResources(gl, options, componentOptions) {
		let messages = isObject$2(options.messages) ? options.messages : create();
		if ("__i18nGlobal" in componentOptions) messages = getLocaleMessages(gl.locale.value, {
			messages,
			__i18n: componentOptions.__i18nGlobal
		});
		const locales = Object.keys(messages);
		if (locales.length) locales.forEach((locale) => {
			gl.mergeLocaleMessage(locale, messages[locale]);
		});
	}
	function getCurrentInstance$1() {
		const key = "currentInstance";
		if (key in vue) return vue[key];
		else return vue.getCurrentInstance();
	}
	var composerID = 0;
	function defineCoreMissingHandler(missing) {
		return ((ctx, locale, key, type) => {
			return missing(locale, key, getCurrentInstance$1() || void 0, type);
		});
	}
	function createComposer(options = {}) {
		const { __root, __injectWithOption } = options;
		const _isGlobal = __root === void 0;
		const flatJson = options.flatJson;
		const _ref = inBrowser ? vue.ref : vue.shallowRef;
		let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
		const _locale = _ref(__root && _inheritLocale ? __root.locale.value : isString(options.locale) ? options.locale : DEFAULT_LOCALE);
		const _fallbackLocale = _ref(__root && _inheritLocale ? __root.fallbackLocale.value : isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value);
		const _messages = _ref(getLocaleMessages(_locale.value, options));
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
			const ctx = createCoreContext({
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
			});
			_isGlobal && setFallbackContext(ctx);
			return ctx;
		};
		_context = getCoreContext();
		updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
		function trackReactivityValues() {
			return [
				_locale.value,
				_fallbackLocale.value,
				_messages.value
			];
		}
		const locale = (0, vue.computed)({
			get: () => _locale.value,
			set: (val) => {
				_context.locale = val;
				_locale.value = val;
			}
		});
		const fallbackLocale = (0, vue.computed)({
			get: () => _fallbackLocale.value,
			set: (val) => {
				_context.fallbackLocale = val;
				_fallbackLocale.value = val;
				updateFallbackLocale(_context, _locale.value, val);
			}
		});
		const messages = (0, vue.computed)(() => _messages.value);
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
			if (handler !== null) _runtimeMissing = defineCoreMissingHandler(handler);
			_missing = handler;
			_context.missing = _runtimeMissing;
		}
		const wrapWithDeps = (fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) => {
			trackReactivityValues();
			let ret;
			try {
				if (__INTLIFY_PROD_DEVTOOLS__);
				if (!_isGlobal) _context.fallbackContext = __root ? getFallbackContext() : void 0;
				ret = fn(_context);
			} finally {
				if (__INTLIFY_PROD_DEVTOOLS__);
				if (!_isGlobal) _context.fallbackContext = void 0;
			}
			if (isNumber(ret) && ret === -1 || warnType === "translate exists") {
				const [key, arg2] = argumentParser();
				return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
			} else if (successCondition(ret)) return ret;
			else throw createI18nError(I18nErrorCodes.UNEXPECTED_RETURN_TYPE);
		};
		function t(...args) {
			return wrapWithDeps((context) => Reflect.apply(translate, null, [context, ...args]), () => parseTranslateArgs(...args), "translate", (root) => Reflect.apply(root.t, root, [...args]), (key) => key, (val) => isString(val));
		}
		function setPluralRules(rules) {
			_pluralRules = rules;
			_context.pluralRules = _pluralRules;
		}
		function getLocaleMessage(locale) {
			return _messages.value[locale] || {};
		}
		function setLocaleMessage(locale, message) {
			if (flatJson) {
				const _message = { [locale]: message };
				for (const key in _message) if (hasOwn(_message, key)) handleFlatJson(_message[key]);
				message = _message[locale];
			}
			_messages.value[locale] = message;
			_context.messages = _messages.value;
		}
		function mergeLocaleMessage(locale, message) {
			_messages.value[locale] = _messages.value[locale] || {};
			const _message = { [locale]: message };
			if (flatJson) {
				for (const key in _message) if (hasOwn(_message, key)) handleFlatJson(_message[key]);
			}
			message = _message[locale];
			deepCopy(message, _messages.value[locale]);
			_context.messages = _messages.value;
		}
		composerID++;
		if (__root && inBrowser) {
			(0, vue.watch)(__root.locale, (val) => {
				if (_inheritLocale) {
					_locale.value = val;
					_context.locale = val;
					updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
				}
			});
			(0, vue.watch)(__root.fallbackLocale, (val) => {
				if (_inheritLocale) {
					_fallbackLocale.value = val;
					_context.fallbackLocale = val;
					updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
				}
			});
		}
		return {
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
			t,
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
	var I18nInjectionKey = makeSymbol("global-vue-i18n");
	function createI18n(options = {}) {
		const __globalInjection = isBoolean(options.globalInjection) ? options.globalInjection : true;
		const __instances = new Map();
		const [globalScope, __global] = createGlobal(options);
		const symbol = makeSymbol("");
		function __getInstance(component) {
			return __instances.get(component) || null;
		}
		function __setInstance(component, instance) {
			__instances.set(component, instance);
		}
		function __deleteInstance(component) {
			__instances.delete(component);
		}
		const i18n = {
			get mode() {
				return "composition";
			},
			async install(app, ...options) {
				app.__VUE_I18N_SYMBOL__ = symbol;
				app.provide(app.__VUE_I18N_SYMBOL__, i18n);
				if (isPlainObject(options[0])) {
					const opts = options[0];
					i18n.__composerExtend = opts.__composerExtend;
					i18n.__vueI18nExtend = opts.__vueI18nExtend;
				}
				let globalReleaseHandler = null;
				if (__globalInjection) globalReleaseHandler = injectGlobalFields(app, i18n.global);
				const unmountApp = app.unmount;
				app.unmount = () => {
					globalReleaseHandler && globalReleaseHandler();
					i18n.dispose();
					unmountApp();
				};
			},
			get global() {
				return __global;
			},
			dispose() {
				globalScope.stop();
			},
			__instances,
			__getInstance,
			__setInstance,
			__deleteInstance
		};
		return i18n;
	}
	function useI18n(options = {}) {
		const instance = getCurrentInstance$1();
		if (instance == null) throw createI18nError(I18nErrorCodes.MUST_BE_CALL_SETUP_TOP);
		if (!instance.isCE && instance.appContext.app != null && !instance.appContext.app.__VUE_I18N_SYMBOL__) throw createI18nError(I18nErrorCodes.NOT_INSTALLED);
		const i18n = getI18nInstance(instance);
		const gl = getGlobalComposer(i18n);
		const componentOptions = getComponentOptions(instance);
		const scope = getScope(options, componentOptions);
		if (scope === "global") {
			adjustI18nResources(gl, options, componentOptions);
			return gl;
		}
		if (scope === "parent") {
			let composer = getComposer(i18n, instance, options.__useComponent);
			if (composer == null) composer = gl;
			return composer;
		}
		if (scope === "isolated") {
			if (i18n.mode !== "composition") throw createI18nError(I18nErrorCodes.NOT_AVAILABLE_COMPOSITION_IN_LEGACY);
			const i18nInternalIso = i18n;
			const composerOptions = assign({}, options);
			composerOptions.__root = getComposer(i18n, instance) || gl;
			const composer = createComposer(composerOptions);
			if (i18nInternalIso.__composerExtend) composer[DisposeSymbol] = i18nInternalIso.__composerExtend(composer);
			if ((0, vue.getCurrentScope)()) (0, vue.onScopeDispose)(() => {
				const dispose = composer[DisposeSymbol];
				if (dispose) {
					dispose();
					delete composer[DisposeSymbol];
				}
			});
			return composer;
		}
		const i18nInternal = i18n;
		let composer = i18nInternal.__getInstance(instance);
		if (composer == null) {
			const composerOptions = assign({}, options);
			if ("__i18n" in componentOptions) composerOptions.__i18n = componentOptions.__i18n;
			if (gl) composerOptions.__root = gl;
			composer = createComposer(composerOptions);
			if (i18nInternal.__composerExtend) composer[DisposeSymbol] = i18nInternal.__composerExtend(composer);
			setupLifeCycle(i18nInternal, instance, composer);
			i18nInternal.__setInstance(instance, composer);
		}
		return composer;
	}
	function createGlobal(options, legacyMode) {
		const scope = (0, vue.effectScope)();
		const obj = scope.run(() => createComposer(options));
		if (obj == null) throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
		return [scope, obj];
	}
	function getI18nInstance(instance) {
		const i18n = (0, vue.inject)(!instance.isCE ? instance.appContext.app.__VUE_I18N_SYMBOL__ : I18nInjectionKey);
		if (!i18n) throw createI18nError(!instance.isCE ? I18nErrorCodes.UNEXPECTED_ERROR : I18nErrorCodes.NOT_INSTALLED_WITH_PROVIDE);
		return i18n;
	}
	function getScope(options, componentOptions) {
		return isEmptyObject(options) ? "__i18n" in componentOptions ? "local" : "global" : !options.useScope ? "local" : options.useScope;
	}
	function getGlobalComposer(i18n) {
		return i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
	}
	function getComposer(i18n, target, useComponent = false) {
		let composer = null;
		const root = target.root;
		let current = getParentComponentInstance(target, useComponent);
		while (current != null) {
			const i18nInternal = i18n;
			if (i18n.mode === "composition") composer = i18nInternal.__getInstance(current);
			if (composer != null) break;
			if (root === current) break;
			current = current.parent;
		}
		return composer;
	}
	function getParentComponentInstance(target, useComponent = false) {
		if (target == null) return null;
		return !useComponent ? target.parent : target.vnode.ctx || target.parent;
	}
	function setupLifeCycle(i18n, target, composer) {
		(0, vue.onMounted)(() => {}, target);
		(0, vue.onUnmounted)(() => {
			const _composer = composer;
			i18n.__deleteInstance(target);
			const dispose = _composer[DisposeSymbol];
			if (dispose) {
				dispose();
				delete _composer[DisposeSymbol];
			}
		}, target);
	}
	var globalExportProps = [
		"locale",
		"fallbackLocale",
		"availableLocales"
	];
	var globalExportMethods = ["t"];
	function injectGlobalFields(app, composer) {
		const i18n = Object.create(null);
		globalExportProps.forEach((prop) => {
			const desc = Object.getOwnPropertyDescriptor(composer, prop);
			if (!desc) throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
			const wrap = (0, vue.isRef)(desc.value) ? {
				get() {
					return desc.value.value;
				},
				set(val) {
					desc.value.value = val;
				}
			} : { get() {
				return desc.get && desc.get();
			} };
			Object.defineProperty(i18n, prop, wrap);
		});
		app.config.globalProperties.$i18n = i18n;
		globalExportMethods.forEach((method) => {
			const desc = Object.getOwnPropertyDescriptor(composer, method);
			if (!desc || !desc.value) throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
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
	initFeatureFlags();
	registerMessageCompiler(compile);
	if (__INTLIFY_PROD_DEVTOOLS__) {
		const target = getGlobalThis();
		target.__INTLIFY__ = true;
		setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
	}
	var close_bold_default = (0, vue.defineComponent)({
		name: "CloseBold",
		__name: "close-bold",
		setup(__props) {
			return (_ctx, _cache) => ((0, vue.openBlock)(), (0, vue.createElementBlock)("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				viewBox: "0 0 1024 1024"
			}, [(0, vue.createElementVNode)("path", {
				fill: "currentColor",
				d: "M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496"
			})]));
		}
	});
	var delete_default = (0, vue.defineComponent)({
		name: "Delete",
		__name: "delete",
		setup(__props) {
			return (_ctx, _cache) => ((0, vue.openBlock)(), (0, vue.createElementBlock)("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				viewBox: "0 0 1024 1024"
			}, [(0, vue.createElementVNode)("path", {
				fill: "currentColor",
				d: "M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32zm448-64v-64H416v64zM224 896h576V256H224zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32m192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32"
			})]));
		}
	});
	var document_copy_default = (0, vue.defineComponent)({
		name: "DocumentCopy",
		__name: "document-copy",
		setup(__props) {
			return (_ctx, _cache) => ((0, vue.openBlock)(), (0, vue.createElementBlock)("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				viewBox: "0 0 1024 1024"
			}, [(0, vue.createElementVNode)("path", {
				fill: "currentColor",
				d: "M128 320v576h576V320zm-32-64h640a32 32 0 0 1 32 32v640a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V288a32 32 0 0 1 32-32M960 96v704a32 32 0 0 1-32 32h-96v-64h64V128H384v64h-64V96a32 32 0 0 1 32-32h576a32 32 0 0 1 32 32M256 672h320v64H256zm0-192h320v64H256z"
			})]));
		}
	});
	var download_default = (0, vue.defineComponent)({
		name: "Download",
		__name: "download",
		setup(__props) {
			return (_ctx, _cache) => ((0, vue.openBlock)(), (0, vue.createElementBlock)("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				viewBox: "0 0 1024 1024"
			}, [(0, vue.createElementVNode)("path", {
				fill: "currentColor",
				d: "M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64m384-253.696 236.288-236.352 45.248 45.248L508.8 704 192 387.2l45.248-45.248L480 584.704V128h64z"
			})]));
		}
	});
	var upload_default = (0, vue.defineComponent)({
		name: "Upload",
		__name: "upload",
		setup(__props) {
			return (_ctx, _cache) => ((0, vue.openBlock)(), (0, vue.createElementBlock)("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				viewBox: "0 0 1024 1024"
			}, [(0, vue.createElementVNode)("path", {
				fill: "currentColor",
				d: "M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64m384-578.304V704h-64V247.296L237.248 490.048 192 444.8 508.8 128l316.8 316.8-45.312 45.248z"
			})]));
		}
	});
	var showMessage = (params) => (0, element_plus.ElMessage)({
		...params,
		appendTo: _monkeyWindow.document.body
	});
	var _hoisted_1$9 = { class: "gap-inputs" };
	var _hoisted_2$5 = { class: "no-sl collect-log-tip" };
	var CollectLog_default = _plugin_vue_export_helper_default((0, vue.defineComponent)({
		__name: "CollectLog",
		setup(__props) {
			const { t } = useI18n();
			const copyLogs = () => {
				_GM_setClipboard(`\`\`\`\n${exportLogs()}\n\`\`\``, "text", () => {
					showMessage({
						type: "success",
						message: t("common.copied")
					});
				});
			};
			return (_ctx, _cache) => {
				return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(element_plus.ElFormItem), { label: (0, vue.unref)(t)("setting.collectLog") }, {
					default: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("div", null, [(0, vue.createElementVNode)("div", _hoisted_1$9, [(0, vue.createVNode)((0, vue.unref)(element_plus.ElSwitch), {
						modelValue: (0, vue.unref)(writeableSettings).collectLog,
						"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => (0, vue.unref)(writeableSettings).collectLog = $event)
					}, null, 8, ["modelValue"]), (0, vue.unref)(writeableSettings).collectLog ? ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 0 }, [(0, vue.createVNode)((0, vue.unref)(element_plus.ElButton), {
						type: "primary",
						icon: (0, vue.unref)(document_copy_default),
						onClick: copyLogs
					}, {
						default: (0, vue.withCtx)(() => [(0, vue.createTextVNode)((0, vue.toDisplayString)((0, vue.unref)(t)("setting.copyLogs")), 1)]),
						_: 1
					}, 8, ["icon"]), (0, vue.createVNode)((0, vue.unref)(element_plus.ElButton), {
						type: "danger",
						icon: (0, vue.unref)(delete_default),
						onClick: (0, vue.unref)(clearLogs)
					}, {
						default: (0, vue.withCtx)(() => [(0, vue.createTextVNode)((0, vue.toDisplayString)((0, vue.unref)(t)("setting.clearLogs")), 1)]),
						_: 1
					}, 8, ["icon", "onClick"])], 64)) : (0, vue.createCommentVNode)("", true)]), (0, vue.createElementVNode)("div", _hoisted_2$5, (0, vue.toDisplayString)((0, vue.unref)(t)("setting.collectLogTip")), 1)])]),
					_: 1
				}, 8, ["label"]);
			};
		}
	}), [["__scopeId", "data-v-577c6dc6"]]);
	var _hoisted_1$8 = { class: "inline-item" };
	var _hoisted_2$4 = { class: "inline-item__name" };
	var _hoisted_3$2 = { class: "inline-item" };
	var _hoisted_4$2 = { class: "inline-item__name" };
	var CompressionFileName_default = _plugin_vue_export_helper_default((0, vue.defineComponent)({
		__name: "CompressionFileName",
		setup(__props) {
			const { t } = useI18n();
			const artistReg = /\{\{\s*artist\s*\}\}/;
			const hasArtist = (0, vue.computed)(() => artistReg.test(writeableSettings.compressionFilename));
			return (_ctx, _cache) => {
				return (0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, null, [(0, vue.createVNode)((0, vue.unref)(element_plus.ElFormItem), { label: (0, vue.unref)(t)("setting.compressionFilename") }, {
					default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElInput), {
						modelValue: (0, vue.unref)(writeableSettings).compressionFilename,
						"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => (0, vue.unref)(writeableSettings).compressionFilename = $event),
						placeholder: (0, vue.unref)(settingDefinitions).compressionFilename.default,
						onBlur: _cache[1] || (_cache[1] = ($event) => {
							if (!(0, vue.unref)(writeableSettings).compressionFilename) (0, vue.unref)(writeableSettings).compressionFilename = (0, vue.unref)(settingDefinitions).compressionFilename.default;
						})
					}, null, 8, ["modelValue", "placeholder"])]),
					_: 1
				}, 8, ["label"]), hasArtist.value ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(element_plus.ElFormItem), {
					key: 0,
					label: "└ {{artist}}"
				}, {
					default: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("div", _hoisted_1$8, [(0, vue.createElementVNode)("span", _hoisted_2$4, (0, vue.toDisplayString)((0, vue.unref)(t)("setting.maxNumber")), 1), (0, vue.createVNode)((0, vue.unref)(element_plus.ElInputNumber), {
						modelValue: (0, vue.unref)(writeableSettings).filenameMaxArtistsNumber,
						"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => (0, vue.unref)(writeableSettings).filenameMaxArtistsNumber = $event),
						size: "small",
						min: 0,
						"value-on-clear": (0, vue.unref)(settingDefinitions).filenameMaxArtistsNumber.default,
						"step-strictly": true,
						style: { width: "90px" }
					}, null, 8, ["modelValue", "value-on-clear"])]), (0, vue.createElementVNode)("div", _hoisted_3$2, [(0, vue.createElementVNode)("span", _hoisted_4$2, (0, vue.toDisplayString)((0, vue.unref)(t)("setting.separator")), 1), (0, vue.createVNode)((0, vue.unref)(element_plus.ElInput), {
						modelValue: (0, vue.unref)(writeableSettings).filenameArtistsSeparator,
						"onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => (0, vue.unref)(writeableSettings).filenameArtistsSeparator = $event),
						size: "small",
						placeholder: (0, vue.unref)(settingDefinitions).filenameArtistsSeparator.default,
						style: { width: "50px" }
					}, null, 8, ["modelValue", "placeholder"])])]),
					_: 1
				})) : (0, vue.createCommentVNode)("", true)], 64);
			};
		}
	}), [["__scopeId", "data-v-5c8e4767"]]);
	var ConvertWebp_default = (0, vue.defineComponent)({
		__name: "ConvertWebp",
		setup(__props) {
			const { t } = useI18n();
			return (_ctx, _cache) => {
				return (0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, null, [(0, vue.createVNode)((0, vue.unref)(element_plus.ElFormItem), { label: (0, vue.unref)(t)("setting.convertWebpTo") }, {
					default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElRadioGroup), {
						modelValue: (0, vue.unref)(writeableSettings).convertWebpTo,
						"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => (0, vue.unref)(writeableSettings).convertWebpTo = $event)
					}, {
						default: (0, vue.withCtx)(() => [
							(0, vue.createVNode)((0, vue.unref)(element_plus.ElRadio), { value: "" }, {
								default: (0, vue.withCtx)(() => [(0, vue.createTextVNode)((0, vue.toDisplayString)((0, vue.unref)(t)("common.disabled")), 1)]),
								_: 1
							}),
							(0, vue.createVNode)((0, vue.unref)(element_plus.ElRadio), { value: (0, vue.unref)(MIME).JPG }, {
								default: (0, vue.withCtx)(() => [..._cache[2] || (_cache[2] = [(0, vue.createTextVNode)("jpg", -1)])]),
								_: 1
							}, 8, ["value"]),
							(0, vue.createVNode)((0, vue.unref)(element_plus.ElRadio), { value: (0, vue.unref)(MIME).PNG }, {
								default: (0, vue.withCtx)(() => [..._cache[3] || (_cache[3] = [(0, vue.createTextVNode)("png", -1)])]),
								_: 1
							}, 8, ["value"])
						]),
						_: 1
					}, 8, ["modelValue"])]),
					_: 1
				}, 8, ["label"]), (0, vue.unref)(writeableSettings).convertWebpTo === (0, vue.unref)(MIME).JPG ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(element_plus.ElFormItem), {
					key: 0,
					label: `└ ${(0, vue.unref)(t)("setting.convertWebpQuality")} (0~100)`
				}, {
					default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElInputNumber), {
						modelValue: (0, vue.unref)(writeableSettings).convertWebpQuality,
						"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => (0, vue.unref)(writeableSettings).convertWebpQuality = $event),
						size: "small",
						min: 0,
						max: 100,
						"value-on-clear": (0, vue.unref)(settingDefinitions).convertWebpQuality.default,
						"step-strictly": true
					}, null, 8, ["modelValue", "value-on-clear"])]),
					_: 1
				}, 8, ["label"])) : (0, vue.createCommentVNode)("", true)], 64);
			};
		}
	});
	var _hoisted_1$7 = { class: "monospace" };
	var CustomFilenameFunction_default = _plugin_vue_export_helper_default((0, vue.defineComponent)({
		__name: "CustomFilenameFunction",
		setup(__props) {
			const { t } = useI18n();
			return (_ctx, _cache) => {
				return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(element_plus.ElFormItem), { label: (0, vue.unref)(t)("setting.customFilenameFunction") }, {
					default: (0, vue.withCtx)(() => [
						(0, vue.createElementVNode)("span", _hoisted_1$7, [
							_cache[4] || (_cache[4] = (0, vue.createTextVNode)("function (filename", -1)),
							(0, vue.createVNode)((0, vue.unref)(element_plus.ElText), { type: "info" }, {
								default: (0, vue.withCtx)(() => [..._cache[1] || (_cache[1] = [(0, vue.createTextVNode)(": string", -1)])]),
								_: 1
							}),
							_cache[5] || (_cache[5] = (0, vue.createTextVNode)(", gallery", -1)),
							(0, vue.createVNode)((0, vue.unref)(element_plus.ElText), { type: "info" }, {
								default: (0, vue.withCtx)(() => [_cache[3] || (_cache[3] = (0, vue.createTextVNode)(": ", -1)), (0, vue.createVNode)((0, vue.unref)(element_plus.ElLink), {
									type: "primary",
									href: "https://github.com/Tsuk1ko/nhentai-helper/blob/df00acb0d5ad8244d408561410b3c647d5af7ed4/src/utils/nhentai.ts#L57-L75",
									target: "_blank"
								}, {
									default: (0, vue.withCtx)(() => [..._cache[2] || (_cache[2] = [(0, vue.createTextVNode)("NHentaiGallery", -1)])]),
									_: 1
								})]),
								_: 1
							}),
							_cache[6] || (_cache[6] = (0, vue.createTextVNode)(") {", -1))
						]),
						(0, vue.createVNode)((0, vue.unref)(element_plus.ElInput), {
							modelValue: (0, vue.unref)(writeableSettings).customFilenameFunction,
							"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => (0, vue.unref)(writeableSettings).customFilenameFunction = $event),
							class: "monospace",
							type: "textarea",
							placeholder: "return filename;",
							autosize: { minRows: 1 }
						}, null, 8, ["modelValue"]),
						_cache[7] || (_cache[7] = (0, vue.createElementVNode)("span", { class: "monospace" }, "}", -1))
					]),
					_: 1
				}, 8, ["label"]);
			};
		}
	}), [["__scopeId", "data-v-e4fd1f32"]]);
	var DownloadedTitleColor_default = _plugin_vue_export_helper_default((0, vue.defineComponent)({
		__name: "DownloadedTitleColor",
		setup(__props) {
			const { t } = useI18n();
			const CAPTION_CLASS = selector.galleryCaption.replace(".", "");
			const downloadedTitleColorPreview = (0, vue.ref)(writeableSettings.downloadedTitleColor);
			const handlePreviewChange = (val) => {
				downloadedTitleColorPreview.value = val || writeableSettings.downloadedTitleColor;
			};
			return (_ctx, _cache) => {
				return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(element_plus.ElFormItem), { label: (0, vue.unref)(t)("setting.downloadedTitleColor") }, {
					default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElColorPicker), {
						modelValue: (0, vue.unref)(writeableSettings).downloadedTitleColor,
						"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => (0, vue.unref)(writeableSettings).downloadedTitleColor = $event),
						"show-alpha": "",
						clearable: "",
						"color-format": "rgb",
						onActiveChange: handlePreviewChange,
						onChange: handlePreviewChange
					}, null, 8, ["modelValue"]), (0, vue.createElementVNode)("div", {
						class: (0, vue.normalizeClass)(["downloaded-title-color-preview", (0, vue.unref)(CAPTION_CLASS)]),
						style: (0, vue.normalizeStyle)({ color: downloadedTitleColorPreview.value })
					}, (0, vue.toDisplayString)(downloadedTitleColorPreview.value || (0, vue.unref)(writeableSettings).downloadedTitleColor), 7)]),
					_: 1
				}, 8, ["label"]);
			};
		}
	}), [["__scopeId", "data-v-297ff1d5"]]);
	var ConfirmPopup_default = (0, vue.defineComponent)({
		__name: "ConfirmPopup",
		emits: ["confirm"],
		setup(__props, { emit: __emit }) {
			const emit = __emit;
			const { t } = useI18n();
			return (_ctx, _cache) => {
				return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(element_plus.ElPopconfirm), {
					title: (0, vue.unref)(t)("confirmPopup.title"),
					"confirm-button-text": (0, vue.unref)(t)("confirmPopup.yes"),
					"cancel-button-text": (0, vue.unref)(t)("confirmPopup.no"),
					placement: "top",
					onConfirm: _cache[0] || (_cache[0] = (...args) => emit("confirm", ...args))
				}, {
					reference: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"title",
					"confirm-button-text",
					"cancel-button-text"
				]);
			};
		}
	});
	var require_FileSaver_min = __commonJSMin(((exports, module) => {
		(function(a, b) {
			if ("function" == typeof define && define.amd) define([], b);
			else if ("undefined" != typeof exports) b();
			else b(), a.FileSaver = { exports: {} }.exports;
		})(exports, function() {
			"use strict";
			function b(a, b) {
				return "undefined" == typeof b ? b = { autoBom: !1 } : "object" != typeof b && (console.warn("Deprecated: Expected third argument to be a object"), b = { autoBom: !b }), b.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type) ? new Blob(["﻿", a], { type: a.type }) : a;
			}
			function c(a, b, c) {
				var d = new XMLHttpRequest();
				d.open("GET", a), d.responseType = "blob", d.onload = function() {
					g(d.response, b, c);
				}, d.onerror = function() {
					console.error("could not download file");
				}, d.send();
			}
			function d(a) {
				var b = new XMLHttpRequest();
				b.open("HEAD", a, !1);
				try {
					b.send();
				} catch (a) {}
				return 200 <= b.status && 299 >= b.status;
			}
			function e(a) {
				try {
					a.dispatchEvent(new MouseEvent("click"));
				} catch (c) {
					var b = document.createEvent("MouseEvents");
					b.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), a.dispatchEvent(b);
				}
			}
			var f = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof global && global.global === global ? global : void 0, a = f.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), g = f.saveAs || ("object" != typeof window || window !== f ? function() {} : "download" in HTMLAnchorElement.prototype && !a ? function(b, g, h) {
				var i = f.URL || f.webkitURL, j = document.createElement("a");
				g = g || b.name || "download", j.download = g, j.rel = "noopener", "string" == typeof b ? (j.href = b, j.origin === location.origin ? e(j) : d(j.href) ? c(b, g, h) : e(j, j.target = "_blank")) : (j.href = i.createObjectURL(b), setTimeout(function() {
					i.revokeObjectURL(j.href);
				}, 4e4), setTimeout(function() {
					e(j);
				}, 0));
			} : "msSaveOrOpenBlob" in navigator ? function(f, g, h) {
				if (g = g || f.name || "download", "string" != typeof f) navigator.msSaveOrOpenBlob(b(f, h), g);
				else if (d(f)) c(f, g, h);
				else {
					var i = document.createElement("a");
					i.href = f, i.target = "_blank", setTimeout(function() {
						e(i);
					});
				}
			} : function(b, d, e, g) {
				if (g = g || open("", "_blank"), g && (g.document.title = g.document.body.innerText = "downloading..."), "string" == typeof b) return c(b, d, e);
				var h = "application/octet-stream" === b.type, i = /constructor/i.test(f.HTMLElement) || f.safari, j = /CriOS\/[\d]+/.test(navigator.userAgent);
				if ((j || h && i || a) && "undefined" != typeof FileReader) {
					var k = new FileReader();
					k.onloadend = function() {
						var a = k.result;
						a = j ? a : a.replace(/^data:[^;]*;/, "data:attachment/file;"), g ? g.location.href = a : location = a, g = null;
					}, k.readAsDataURL(b);
				} else {
					var l = f.URL || f.webkitURL, m = l.createObjectURL(b);
					g ? g.location = m : location.href = m, g = null, setTimeout(function() {
						l.revokeObjectURL(m);
					}, 4e4);
				}
			});
			f.saveAs = g.saveAs = g, "undefined" != typeof module && (module.exports = g);
		});
	}));
	var require_crypt = __commonJSMin(((exports, module) => {
		(function() {
			var base64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", crypt = {
				rotl: function(n, b) {
					return n << b | n >>> 32 - b;
				},
				rotr: function(n, b) {
					return n << 32 - b | n >>> b;
				},
				endian: function(n) {
					if (n.constructor == Number) return crypt.rotl(n, 8) & 16711935 | crypt.rotl(n, 24) & 4278255360;
					for (var i = 0; i < n.length; i++) n[i] = crypt.endian(n[i]);
					return n;
				},
				randomBytes: function(n) {
					for (var bytes = []; n > 0; n--) bytes.push(Math.floor(Math.random() * 256));
					return bytes;
				},
				bytesToWords: function(bytes) {
					for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8) words[b >>> 5] |= bytes[i] << 24 - b % 32;
					return words;
				},
				wordsToBytes: function(words) {
					for (var bytes = [], b = 0; b < words.length * 32; b += 8) bytes.push(words[b >>> 5] >>> 24 - b % 32 & 255);
					return bytes;
				},
				bytesToHex: function(bytes) {
					for (var hex = [], i = 0; i < bytes.length; i++) {
						hex.push((bytes[i] >>> 4).toString(16));
						hex.push((bytes[i] & 15).toString(16));
					}
					return hex.join("");
				},
				hexToBytes: function(hex) {
					for (var bytes = [], c = 0; c < hex.length; c += 2) bytes.push(parseInt(hex.substr(c, 2), 16));
					return bytes;
				},
				bytesToBase64: function(bytes) {
					for (var base64 = [], i = 0; i < bytes.length; i += 3) {
						var triplet = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];
						for (var j = 0; j < 4; j++) if (i * 8 + j * 6 <= bytes.length * 8) base64.push(base64map.charAt(triplet >>> 6 * (3 - j) & 63));
						else base64.push("=");
					}
					return base64.join("");
				},
				base64ToBytes: function(base64) {
					base64 = base64.replace(/[^A-Z0-9+\/]/gi, "");
					for (var bytes = [], i = 0, imod4 = 0; i < base64.length; imod4 = ++i % 4) {
						if (imod4 == 0) continue;
						bytes.push((base64map.indexOf(base64.charAt(i - 1)) & Math.pow(2, -2 * imod4 + 8) - 1) << imod4 * 2 | base64map.indexOf(base64.charAt(i)) >>> 6 - imod4 * 2);
					}
					return bytes;
				}
			};
			module.exports = crypt;
		})();
	}));
	var require_charenc = __commonJSMin(((exports, module) => {
		var charenc = {
			utf8: {
				stringToBytes: function(str) {
					return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
				},
				bytesToString: function(bytes) {
					return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
				}
			},
			bin: {
				stringToBytes: function(str) {
					for (var bytes = [], i = 0; i < str.length; i++) bytes.push(str.charCodeAt(i) & 255);
					return bytes;
				},
				bytesToString: function(bytes) {
					for (var str = [], i = 0; i < bytes.length; i++) str.push(String.fromCharCode(bytes[i]));
					return str.join("");
				}
			}
		};
		module.exports = charenc;
	}));
	var require_is_buffer = __commonJSMin(((exports, module) => {
		module.exports = function(obj) {
			return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
		};
		function isBuffer(obj) {
			return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
		}
		function isSlowBuffer(obj) {
			return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isBuffer(obj.slice(0, 0));
		}
	}));
	var require_md5 = __commonJSMin(((exports, module) => {
		(function() {
			var crypt = require_crypt(), utf8 = require_charenc().utf8, isBuffer = require_is_buffer(), bin = require_charenc().bin, md5 = function(message, options) {
				if (message.constructor == String) if (options && options.encoding === "binary") message = bin.stringToBytes(message);
				else message = utf8.stringToBytes(message);
				else if (isBuffer(message)) message = Array.prototype.slice.call(message, 0);
				else if (!Array.isArray(message) && message.constructor !== Uint8Array) message = message.toString();
				var m = crypt.bytesToWords(message), l = message.length * 8, a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
				for (var i = 0; i < m.length; i++) m[i] = (m[i] << 8 | m[i] >>> 24) & 16711935 | (m[i] << 24 | m[i] >>> 8) & 4278255360;
				m[l >>> 5] |= 128 << l % 32;
				m[(l + 64 >>> 9 << 4) + 14] = l;
				var FF = md5._ff, GG = md5._gg, HH = md5._hh, II = md5._ii;
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
				return crypt.endian([
					a,
					b,
					c,
					d
				]);
			};
			md5._ff = function(a, b, c, d, x, s, t) {
				var n = a + (b & c | ~b & d) + (x >>> 0) + t;
				return (n << s | n >>> 32 - s) + b;
			};
			md5._gg = function(a, b, c, d, x, s, t) {
				var n = a + (b & d | c & ~d) + (x >>> 0) + t;
				return (n << s | n >>> 32 - s) + b;
			};
			md5._hh = function(a, b, c, d, x, s, t) {
				var n = a + (b ^ c ^ d) + (x >>> 0) + t;
				return (n << s | n >>> 32 - s) + b;
			};
			md5._ii = function(a, b, c, d, x, s, t) {
				var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
				return (n << s | n >>> 32 - s) + b;
			};
			md5._blocksize = 16;
			md5._digestsize = 16;
			module.exports = function(message, options) {
				if (message === void 0 || message === null) throw new Error("Illegal argument " + message);
				var digestbytes = crypt.wordsToBytes(md5(message, options));
				return options && options.asBytes ? digestbytes : options && options.asString ? bin.bytesToString(digestbytes) : crypt.bytesToHex(digestbytes);
			};
		})();
	}));
	var import_FileSaver_min = require_FileSaver_min();
	var import_md5 = __toESM(require_md5(), 1);
	var dateTimeFormatter = new Intl.DateTimeFormat(void 0, {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false
	});
	var numberFormatter = new Intl.NumberFormat();
	var removeIllegalFilenameChars = (name) => name.replace(/[/\\:*?"<>|]/g, "");
	var proxyMarker = Symbol("Comlink.proxy");
	var createEndpoint = Symbol("Comlink.endpoint");
	var releaseProxy = Symbol("Comlink.releaseProxy");
	var finalizer = Symbol("Comlink.finalizer");
	var throwMarker = Symbol("Comlink.thrown");
	var isObject$1 = (val) => typeof val === "object" && val !== null || typeof val === "function";
	var transferHandlers = new Map([["proxy", {
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
	}], ["throw", {
		canHandle: (value) => isObject$1(value) && throwMarker in value,
		serialize({ value }) {
			let serialized;
			if (value instanceof Error) serialized = {
				isError: true,
				value: {
					message: value.message,
					name: value.name,
					stack: value.stack
				}
			};
			else serialized = {
				isError: false,
				value
			};
			return [serialized, []];
		},
		deserialize(serialized) {
			if (serialized.isError) throw Object.assign(new Error(serialized.value.message), serialized.value);
			throw serialized.value;
		}
	}]]);
	function isAllowedOrigin(allowedOrigins, origin) {
		for (const allowedOrigin of allowedOrigins) {
			if (origin === allowedOrigin || allowedOrigin === "*") return true;
			if (allowedOrigin instanceof RegExp && allowedOrigin.test(origin)) return true;
		}
		return false;
	}
	function expose(obj, ep = globalThis, allowedOrigins = ["*"]) {
		ep.addEventListener("message", function callback(ev) {
			if (!ev || !ev.data) return;
			if (!isAllowedOrigin(allowedOrigins, ev.origin)) {
				console.warn(`Invalid origin '${ev.origin}' for comlink proxy`);
				return;
			}
			const { id, type, path } = Object.assign({ path: [] }, ev.data);
			const argumentList = (ev.data.argumentList || []).map(fromWireValue);
			let returnValue;
			try {
				const parent = path.slice(0, -1).reduce((obj, prop) => obj[prop], obj);
				const rawValue = path.reduce((obj, prop) => obj[prop], obj);
				switch (type) {
					case "GET":
						returnValue = rawValue;
						break;
					case "SET":
						parent[path.slice(-1)[0]] = fromWireValue(ev.data.value);
						returnValue = true;
						break;
					case "APPLY":
						returnValue = rawValue.apply(parent, argumentList);
						break;
					case "CONSTRUCT":
						returnValue = proxy(new rawValue(...argumentList));
						break;
					case "ENDPOINT":
						{
							const { port1, port2 } = new MessageChannel();
							expose(obj, port2);
							returnValue = transfer(port1, [port1]);
						}
						break;
					case "RELEASE":
						returnValue = void 0;
						break;
					default: return;
				}
			} catch (value) {
				returnValue = {
					value,
					[throwMarker]: 0
				};
			}
			Promise.resolve(returnValue).catch((value) => {
				return {
					value,
					[throwMarker]: 0
				};
			}).then((returnValue) => {
				const [wireValue, transferables] = toWireValue(returnValue);
				ep.postMessage(Object.assign(Object.assign({}, wireValue), { id }), transferables);
				if (type === "RELEASE") {
					ep.removeEventListener("message", callback);
					closeEndPoint(ep);
					if (finalizer in obj && typeof obj[finalizer] === "function") obj[finalizer]();
				}
			}).catch((error) => {
				const [wireValue, transferables] = toWireValue({
					value: new TypeError("Unserializable return value"),
					[throwMarker]: 0
				});
				ep.postMessage(Object.assign(Object.assign({}, wireValue), { id }), transferables);
			});
		});
		if (ep.start) ep.start();
	}
	function isMessagePort(endpoint) {
		return endpoint.constructor.name === "MessagePort";
	}
	function closeEndPoint(endpoint) {
		if (isMessagePort(endpoint)) endpoint.close();
	}
	function wrap(ep, target) {
		const pendingListeners = new Map();
		ep.addEventListener("message", function handleMessage(ev) {
			const { data } = ev;
			if (!data || !data.id) return;
			const resolver = pendingListeners.get(data.id);
			if (!resolver) return;
			try {
				resolver(data);
			} finally {
				pendingListeners.delete(data.id);
			}
		});
		return createProxy(ep, pendingListeners, [], target);
	}
	function throwIfProxyReleased(isReleased) {
		if (isReleased) throw new Error("Proxy has been released and is not useable");
	}
	function releaseEndpoint(ep) {
		return requestResponseMessage(ep, new Map(), { type: "RELEASE" }).then(() => {
			closeEndPoint(ep);
		});
	}
	var proxyCounter = new WeakMap();
	var proxyFinalizers = "FinalizationRegistry" in globalThis && new FinalizationRegistry((ep) => {
		const newCount = (proxyCounter.get(ep) || 0) - 1;
		proxyCounter.set(ep, newCount);
		if (newCount === 0) releaseEndpoint(ep);
	});
	function registerProxy(proxy, ep) {
		const newCount = (proxyCounter.get(ep) || 0) + 1;
		proxyCounter.set(ep, newCount);
		if (proxyFinalizers) proxyFinalizers.register(proxy, ep, proxy);
	}
	function unregisterProxy(proxy) {
		if (proxyFinalizers) proxyFinalizers.unregister(proxy);
	}
	function createProxy(ep, pendingListeners, path = [], target = function() {}) {
		let isProxyReleased = false;
		const proxy = new Proxy(target, {
			get(_target, prop) {
				throwIfProxyReleased(isProxyReleased);
				if (prop === releaseProxy) return () => {
					unregisterProxy(proxy);
					releaseEndpoint(ep);
					pendingListeners.clear();
					isProxyReleased = true;
				};
				if (prop === "then") {
					if (path.length === 0) return { then: () => proxy };
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
				const last = path[path.length - 1];
				if (last === createEndpoint) return requestResponseMessage(ep, pendingListeners, { type: "ENDPOINT" }).then(fromWireValue);
				if (last === "bind") return createProxy(ep, pendingListeners, path.slice(0, -1));
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
		registerProxy(proxy, ep);
		return proxy;
	}
	function myFlat(arr) {
		return Array.prototype.concat.apply([], arr);
	}
	function processArguments(argumentList) {
		const processed = argumentList.map(toWireValue);
		return [processed.map((v) => v[0]), myFlat(processed.map((v) => v[1]))];
	}
	var transferCache = new WeakMap();
	function transfer(obj, transfers) {
		transferCache.set(obj, transfers);
		return obj;
	}
	function proxy(obj) {
		return Object.assign(obj, { [proxyMarker]: true });
	}
	function toWireValue(value) {
		for (const [name, handler] of transferHandlers) if (handler.canHandle(value)) {
			const [serializedValue, transferables] = handler.serialize(value);
			return [{
				type: "HANDLER",
				name,
				value: serializedValue
			}, transferables];
		}
		return [{
			type: "RAW",
			value
		}, transferCache.get(value) || []];
	}
	function fromWireValue(value) {
		switch (value.type) {
			case "HANDLER": return transferHandlers.get(value.name).deserialize(value.value);
			case "RAW": return value.value;
		}
	}
	function requestResponseMessage(ep, pendingListeners, msg, transfers) {
		return new Promise((resolve) => {
			const id = generateUUID();
			pendingListeners.set(id, resolve);
			if (ep.start) ep.start();
			ep.postMessage(Object.assign({ id }, msg), transfers);
		});
	}
	function generateUUID() {
		return new Array(4).fill(0).map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)).join("-");
	}
	var jsContent$1 = "(function(){var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,a)=>(a=n==null?{}:e(i(n)),s(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n));\n/**\n* @license\n* Copyright 2019 Google LLC\n* SPDX-License-Identifier: Apache-2.0\n*/\nlet l=Symbol(`Comlink.proxy`),u=Symbol(`Comlink.endpoint`),d=Symbol(`Comlink.releaseProxy`),f=Symbol(`Comlink.finalizer`),p=Symbol(`Comlink.thrown`),m=e=>typeof e==`object`&&!!e||typeof e==`function`,h=new Map([[`proxy`,{canHandle:e=>m(e)&&e[l],serialize(e){let{port1:t,port2:n}=new MessageChannel;return _(e,t),[n,[n]]},deserialize(e){return e.start(),b(e)}}],[`throw`,{canHandle:e=>m(e)&&p in e,serialize({value:e}){let t;return t=e instanceof Error?{isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:{isError:!1,value:e},[t,[]]},deserialize(e){throw e.isError?Object.assign(Error(e.value.message),e.value):e.value}}]]);function g(e,t){for(let n of e)if(t===n||n===`*`||n instanceof RegExp&&n.test(t))return!0;return!1}function _(e,t=globalThis,n=[`*`]){t.addEventListener(`message`,function r(i){if(!i||!i.data)return;if(!g(n,i.origin)){console.warn(`Invalid origin '${i.origin}' for comlink proxy`);return}let{id:a,type:o,path:s}=Object.assign({path:[]},i.data),c=(i.data.argumentList||[]).map(P),l;try{let t=s.slice(0,-1).reduce((e,t)=>e[t],e),n=s.reduce((e,t)=>e[t],e);switch(o){case`GET`:l=n;break;case`SET`:t[s.slice(-1)[0]]=P(i.data.value),l=!0;break;case`APPLY`:l=n.apply(t,c);break;case`CONSTRUCT`:l=M(new n(...c));break;case`ENDPOINT`:{let{port1:t,port2:n}=new MessageChannel;_(e,n),l=j(t,[t])}break;case`RELEASE`:l=void 0;break;default:return}}catch(e){l={value:e,[p]:0}}Promise.resolve(l).catch(e=>({value:e,[p]:0})).then(n=>{let[i,s]=N(n);t.postMessage(Object.assign(Object.assign({},i),{id:a}),s),o===`RELEASE`&&(t.removeEventListener(`message`,r),y(t),f in e&&typeof e[f]==`function`&&e[f]())}).catch(e=>{let[n,r]=N({value:TypeError(`Unserializable return value`),[p]:0});t.postMessage(Object.assign(Object.assign({},n),{id:a}),r)})}),t.start&&t.start()}function v(e){return e.constructor.name===`MessagePort`}function y(e){v(e)&&e.close()}function b(e,t){let n=new Map;return e.addEventListener(`message`,function(e){let{data:t}=e;if(!t||!t.id)return;let r=n.get(t.id);if(r)try{r(t)}finally{n.delete(t.id)}}),D(e,n,[],t)}function x(e){if(e)throw Error(`Proxy has been released and is not useable`)}function S(e){return F(e,new Map,{type:`RELEASE`}).then(()=>{y(e)})}let C=new WeakMap,w=`FinalizationRegistry`in globalThis&&new FinalizationRegistry(e=>{let t=(C.get(e)||0)-1;C.set(e,t),t===0&&S(e)});function T(e,t){let n=(C.get(t)||0)+1;C.set(t,n),w&&w.register(e,t,e)}function E(e){w&&w.unregister(e)}function D(e,t,n=[],r=function(){}){let i=!1,a=new Proxy(r,{get(r,o){if(x(i),o===d)return()=>{E(a),S(e),t.clear(),i=!0};if(o===`then`){if(n.length===0)return{then:()=>a};let r=F(e,t,{type:`GET`,path:n.map(e=>e.toString())}).then(P);return r.then.bind(r)}return D(e,t,[...n,o])},set(r,a,o){x(i);let[s,c]=N(o);return F(e,t,{type:`SET`,path:[...n,a].map(e=>e.toString()),value:s},c).then(P)},apply(r,a,o){x(i);let s=n[n.length-1];if(s===u)return F(e,t,{type:`ENDPOINT`}).then(P);if(s===`bind`)return D(e,t,n.slice(0,-1));let[c,l]=k(o);return F(e,t,{type:`APPLY`,path:n.map(e=>e.toString()),argumentList:c},l).then(P)},construct(r,a){x(i);let[o,s]=k(a);return F(e,t,{type:`CONSTRUCT`,path:n.map(e=>e.toString()),argumentList:o},s).then(P)}});return T(a,e),a}function O(e){return Array.prototype.concat.apply([],e)}function k(e){let t=e.map(N);return[t.map(e=>e[0]),O(t.map(e=>e[1]))]}let A=new WeakMap;function j(e,t){return A.set(e,t),e}function M(e){return Object.assign(e,{[l]:!0})}function N(e){for(let[t,n]of h)if(n.canHandle(e)){let[r,i]=n.serialize(e);return[{type:`HANDLER`,name:t,value:r},i]}return[{type:`RAW`,value:e},A.get(e)||[]]}function P(e){switch(e.type){case`HANDLER`:return h.get(e.name).deserialize(e.value);case`RAW`:return e.value}}function F(e,t,n,r){return new Promise(i=>{let a=I();t.set(a,i),e.start&&e.start(),e.postMessage(Object.assign({id:a},n),r)})}function I(){return[,,,,].fill(0).map(()=>Math.floor(Math.random()*(2**53-1)).toString(16)).join(`-`)}var L=o(((e,t)=>{\n/*!\n\nJSZip v3.10.1 - A JavaScript class for generating and reading zip files\n<http://stuartk.com/jszip>\n\n(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>\nDual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.\n\nJSZip uses the library pako released under the MIT license :\nhttps://github.com/nodeca/pako/blob/main/LICENSE\n*/\n(function(n){typeof e==`object`&&t!==void 0?t.exports=n():typeof define==`function`&&define.amd?define([],n):(typeof window<`u`?window:typeof global<`u`?global:typeof self<`u`?self:this).JSZip=n()})(function(){return function e(t,n,r){function i(o,s){if(!n[o]){if(!t[o]){var c=typeof require==`function`&&require;if(!s&&c)return c(o,!0);if(a)return a(o,!0);var l=Error(`Cannot find module '`+o+`'`);throw l.code=`MODULE_NOT_FOUND`,l}var u=n[o]={exports:{}};t[o][0].call(u.exports,function(e){var n=t[o][1][e];return i(n||e)},u,u.exports,e,t,n,r)}return n[o].exports}for(var a=typeof require==`function`&&require,o=0;o<r.length;o++)i(r[o]);return i}({1:[function(e,t,n){\"use strict\";var r=e(`./utils`),i=e(`./support`),a=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`;n.encode=function(e){for(var t,n,i,o,s,c,l,u=[],d=0,f=e.length,p=f,m=r.getTypeOf(e)!==`string`;d<e.length;)p=f-d,i=m?(t=e[d++],n=d<f?e[d++]:0,d<f?e[d++]:0):(t=e.charCodeAt(d++),n=d<f?e.charCodeAt(d++):0,d<f?e.charCodeAt(d++):0),o=t>>2,s=(3&t)<<4|n>>4,c=1<p?(15&n)<<2|i>>6:64,l=2<p?63&i:64,u.push(a.charAt(o)+a.charAt(s)+a.charAt(c)+a.charAt(l));return u.join(``)},n.decode=function(e){var t,n,r,o,s,c,l=0,u=0,d=`data:`;if(e.substr(0,d.length)===d)throw Error(`Invalid base64 input, it looks like a data url.`);var f,p=3*(e=e.replace(/[^A-Za-z0-9+/=]/g,``)).length/4;if(e.charAt(e.length-1)===a.charAt(64)&&p--,e.charAt(e.length-2)===a.charAt(64)&&p--,p%1!=0)throw Error(`Invalid base64 input, bad content length.`);for(f=i.uint8array?new Uint8Array(0|p):Array(0|p);l<e.length;)t=a.indexOf(e.charAt(l++))<<2|(o=a.indexOf(e.charAt(l++)))>>4,n=(15&o)<<4|(s=a.indexOf(e.charAt(l++)))>>2,r=(3&s)<<6|(c=a.indexOf(e.charAt(l++))),f[u++]=t,s!==64&&(f[u++]=n),c!==64&&(f[u++]=r);return f}},{\"./support\":30,\"./utils\":32}],2:[function(e,t,n){\"use strict\";var r=e(`./external`),i=e(`./stream/DataWorker`),a=e(`./stream/Crc32Probe`),o=e(`./stream/DataLengthProbe`);function s(e,t,n,r,i){this.compressedSize=e,this.uncompressedSize=t,this.crc32=n,this.compression=r,this.compressedContent=i}s.prototype={getContentWorker:function(){var e=new i(r.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new o(`data_length`)),t=this;return e.on(`end`,function(){if(this.streamInfo.data_length!==t.uncompressedSize)throw Error(`Bug : uncompressed data size mismatch`)}),e},getCompressedWorker:function(){return new i(r.Promise.resolve(this.compressedContent)).withStreamInfo(`compressedSize`,this.compressedSize).withStreamInfo(`uncompressedSize`,this.uncompressedSize).withStreamInfo(`crc32`,this.crc32).withStreamInfo(`compression`,this.compression)}},s.createWorkerFrom=function(e,t,n){return e.pipe(new a).pipe(new o(`uncompressedSize`)).pipe(t.compressWorker(n)).pipe(new o(`compressedSize`)).withStreamInfo(`compression`,t)},t.exports=s},{\"./external\":6,\"./stream/Crc32Probe\":25,\"./stream/DataLengthProbe\":26,\"./stream/DataWorker\":27}],3:[function(e,t,n){\"use strict\";var r=e(`./stream/GenericWorker`);n.STORE={magic:`\\0\\0`,compressWorker:function(){return new r(`STORE compression`)},uncompressWorker:function(){return new r(`STORE decompression`)}},n.DEFLATE=e(`./flate`)},{\"./flate\":7,\"./stream/GenericWorker\":28}],4:[function(e,t,n){\"use strict\";var r=e(`./utils`),i=function(){for(var e,t=[],n=0;n<256;n++){e=n;for(var r=0;r<8;r++)e=1&e?3988292384^e>>>1:e>>>1;t[n]=e}return t}();t.exports=function(e,t){return e!==void 0&&e.length?r.getTypeOf(e)===`string`?function(e,t,n,r){var a=i,o=r+n;e^=-1;for(var s=r;s<o;s++)e=e>>>8^a[255&(e^t.charCodeAt(s))];return-1^e}(0|t,e,e.length,0):function(e,t,n,r){var a=i,o=r+n;e^=-1;for(var s=r;s<o;s++)e=e>>>8^a[255&(e^t[s])];return-1^e}(0|t,e,e.length,0):0}},{\"./utils\":32}],5:[function(e,t,n){\"use strict\";n.base64=!1,n.binary=!1,n.dir=!1,n.createFolders=!0,n.date=null,n.compression=null,n.compressionOptions=null,n.comment=null,n.unixPermissions=null,n.dosPermissions=null},{}],6:[function(e,t,n){\"use strict\";var r=null;r=typeof Promise<`u`?Promise:e(`lie`),t.exports={Promise:r}},{lie:37}],7:[function(e,t,n){\"use strict\";var r=typeof Uint8Array<`u`&&typeof Uint16Array<`u`&&typeof Uint32Array<`u`,i=e(`pako`),a=e(`./utils`),o=e(`./stream/GenericWorker`),s=r?`uint8array`:`array`;function c(e,t){o.call(this,`FlateWorker/`+e),this._pako=null,this._pakoAction=e,this._pakoOptions=t,this.meta={}}n.magic=`\\b\\0`,a.inherits(c,o),c.prototype.processChunk=function(e){this.meta=e.meta,this._pako===null&&this._createPako(),this._pako.push(a.transformTo(s,e.data),!1)},c.prototype.flush=function(){o.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},c.prototype.cleanUp=function(){o.prototype.cleanUp.call(this),this._pako=null},c.prototype._createPako=function(){this._pako=new i[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var e=this;this._pako.onData=function(t){e.push({data:t,meta:e.meta})}},n.compressWorker=function(e){return new c(`Deflate`,e)},n.uncompressWorker=function(){return new c(`Inflate`,{})}},{\"./stream/GenericWorker\":28,\"./utils\":32,pako:38}],8:[function(e,t,n){\"use strict\";function r(e,t){var n,r=``;for(n=0;n<t;n++)r+=String.fromCharCode(255&e),e>>>=8;return r}function i(e,t,n,i,o,u){var d,f,p=e.file,m=e.compression,h=u!==s.utf8encode,g=a.transformTo(`string`,u(p.name)),_=a.transformTo(`string`,s.utf8encode(p.name)),v=p.comment,y=a.transformTo(`string`,u(v)),b=a.transformTo(`string`,s.utf8encode(v)),x=_.length!==p.name.length,S=b.length!==v.length,C=``,w=``,T=``,E=p.dir,D=p.date,O={crc32:0,compressedSize:0,uncompressedSize:0};t&&!n||(O.crc32=e.crc32,O.compressedSize=e.compressedSize,O.uncompressedSize=e.uncompressedSize);var k=0;t&&(k|=8),h||!x&&!S||(k|=2048);var A=0,j=0;E&&(A|=16),o===`UNIX`?(j=798,A|=function(e,t){var n=e;return e||(n=t?16893:33204),(65535&n)<<16}(p.unixPermissions,E)):(j=20,A|=function(e){return 63&(e||0)}(p.dosPermissions)),d=D.getUTCHours(),d<<=6,d|=D.getUTCMinutes(),d<<=5,d|=D.getUTCSeconds()/2,f=D.getUTCFullYear()-1980,f<<=4,f|=D.getUTCMonth()+1,f<<=5,f|=D.getUTCDate(),x&&(w=r(1,1)+r(c(g),4)+_,C+=`up`+r(w.length,2)+w),S&&(T=r(1,1)+r(c(y),4)+b,C+=`uc`+r(T.length,2)+T);var M=``;return M+=`\n\\0`,M+=r(k,2),M+=m.magic,M+=r(d,2),M+=r(f,2),M+=r(O.crc32,4),M+=r(O.compressedSize,4),M+=r(O.uncompressedSize,4),M+=r(g.length,2),M+=r(C.length,2),{fileRecord:l.LOCAL_FILE_HEADER+M+g+C,dirRecord:l.CENTRAL_FILE_HEADER+r(j,2)+M+r(y.length,2)+`\\0\\0\\0\\0`+r(A,4)+r(i,4)+g+C+y}}var a=e(`../utils`),o=e(`../stream/GenericWorker`),s=e(`../utf8`),c=e(`../crc32`),l=e(`../signature`);function u(e,t,n,r){o.call(this,`ZipFileWorker`),this.bytesWritten=0,this.zipComment=t,this.zipPlatform=n,this.encodeFileName=r,this.streamFiles=e,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}a.inherits(u,o),u.prototype.push=function(e){var t=e.meta.percent||0,n=this.entriesCount,r=this._sources.length;this.accumulate?this.contentBuffer.push(e):(this.bytesWritten+=e.data.length,o.prototype.push.call(this,{data:e.data,meta:{currentFile:this.currentFile,percent:n?(t+100*(n-r-1))/n:100}}))},u.prototype.openedSource=function(e){this.currentSourceOffset=this.bytesWritten,this.currentFile=e.file.name;var t=this.streamFiles&&!e.file.dir;if(t){var n=i(e,t,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:n.fileRecord,meta:{percent:0}})}else this.accumulate=!0},u.prototype.closedSource=function(e){this.accumulate=!1;var t=this.streamFiles&&!e.file.dir,n=i(e,t,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(n.dirRecord),t)this.push({data:function(e){return l.DATA_DESCRIPTOR+r(e.crc32,4)+r(e.compressedSize,4)+r(e.uncompressedSize,4)}(e),meta:{percent:100}});else for(this.push({data:n.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},u.prototype.flush=function(){for(var e=this.bytesWritten,t=0;t<this.dirRecords.length;t++)this.push({data:this.dirRecords[t],meta:{percent:100}});var n=this.bytesWritten-e,i=function(e,t,n,i,o){var s=a.transformTo(`string`,o(i));return l.CENTRAL_DIRECTORY_END+`\\0\\0\\0\\0`+r(e,2)+r(e,2)+r(t,4)+r(n,4)+r(s.length,2)+s}(this.dirRecords.length,n,e,this.zipComment,this.encodeFileName);this.push({data:i,meta:{percent:100}})},u.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},u.prototype.registerPrevious=function(e){this._sources.push(e);var t=this;return e.on(`data`,function(e){t.processChunk(e)}),e.on(`end`,function(){t.closedSource(t.previous.streamInfo),t._sources.length?t.prepareNextSource():t.end()}),e.on(`error`,function(e){t.error(e)}),this},u.prototype.resume=function(){return!!o.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},u.prototype.error=function(e){var t=this._sources;if(!o.prototype.error.call(this,e))return!1;for(var n=0;n<t.length;n++)try{t[n].error(e)}catch{}return!0},u.prototype.lock=function(){o.prototype.lock.call(this);for(var e=this._sources,t=0;t<e.length;t++)e[t].lock()},t.exports=u},{\"../crc32\":4,\"../signature\":23,\"../stream/GenericWorker\":28,\"../utf8\":31,\"../utils\":32}],9:[function(e,t,n){\"use strict\";var r=e(`../compressions`),i=e(`./ZipFileWorker`);n.generateWorker=function(e,t,n){var a=new i(t.streamFiles,n,t.platform,t.encodeFileName),o=0;try{e.forEach(function(e,n){o++;var i=function(e,t){var n=e||t,i=r[n];if(!i)throw Error(n+` is not a valid compression method !`);return i}(n.options.compression,t.compression),s=n.options.compressionOptions||t.compressionOptions||{},c=n.dir,l=n.date;n._compressWorker(i,s).withStreamInfo(`file`,{name:e,dir:c,date:l,comment:n.comment||``,unixPermissions:n.unixPermissions,dosPermissions:n.dosPermissions}).pipe(a)}),a.entriesCount=o}catch(e){a.error(e)}return a}},{\"../compressions\":3,\"./ZipFileWorker\":8}],10:[function(e,t,n){\"use strict\";function r(){if(!(this instanceof r))return new r;if(arguments.length)throw Error(`The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.`);this.files=Object.create(null),this.comment=null,this.root=``,this.clone=function(){var e=new r;for(var t in this)typeof this[t]!=`function`&&(e[t]=this[t]);return e}}(r.prototype=e(`./object`)).loadAsync=e(`./load`),r.support=e(`./support`),r.defaults=e(`./defaults`),r.version=`3.10.1`,r.loadAsync=function(e,t){return new r().loadAsync(e,t)},r.external=e(`./external`),t.exports=r},{\"./defaults\":5,\"./external\":6,\"./load\":11,\"./object\":15,\"./support\":30}],11:[function(e,t,n){\"use strict\";var r=e(`./utils`),i=e(`./external`),a=e(`./utf8`),o=e(`./zipEntries`),s=e(`./stream/Crc32Probe`),c=e(`./nodejsUtils`);function l(e){return new i.Promise(function(t,n){var r=e.decompressed.getContentWorker().pipe(new s);r.on(`error`,function(e){n(e)}).on(`end`,function(){r.streamInfo.crc32===e.decompressed.crc32?t():n(Error(`Corrupted zip : CRC32 mismatch`))}).resume()})}t.exports=function(e,t){var n=this;return t=r.extend(t||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:a.utf8decode}),c.isNode&&c.isStream(e)?i.Promise.reject(Error(`JSZip can't accept a stream when loading a zip file.`)):r.prepareContent(`the loaded zip file`,e,!0,t.optimizedBinaryString,t.base64).then(function(e){var n=new o(t);return n.load(e),n}).then(function(e){var n=[i.Promise.resolve(e)],r=e.files;if(t.checkCRC32)for(var a=0;a<r.length;a++)n.push(l(r[a]));return i.Promise.all(n)}).then(function(e){for(var i=e.shift(),a=i.files,o=0;o<a.length;o++){var s=a[o],c=s.fileNameStr,l=r.resolve(s.fileNameStr);n.file(l,s.decompressed,{binary:!0,optimizedBinaryString:!0,date:s.date,dir:s.dir,comment:s.fileCommentStr.length?s.fileCommentStr:null,unixPermissions:s.unixPermissions,dosPermissions:s.dosPermissions,createFolders:t.createFolders}),s.dir||(n.file(l).unsafeOriginalName=c)}return i.zipComment.length&&(n.comment=i.zipComment),n})}},{\"./external\":6,\"./nodejsUtils\":14,\"./stream/Crc32Probe\":25,\"./utf8\":31,\"./utils\":32,\"./zipEntries\":33}],12:[function(e,t,n){\"use strict\";var r=e(`../utils`),i=e(`../stream/GenericWorker`);function a(e,t){i.call(this,`Nodejs stream input adapter for `+e),this._upstreamEnded=!1,this._bindStream(t)}r.inherits(a,i),a.prototype._bindStream=function(e){var t=this;(this._stream=e).pause(),e.on(`data`,function(e){t.push({data:e,meta:{percent:0}})}).on(`error`,function(e){t.isPaused?this.generatedError=e:t.error(e)}).on(`end`,function(){t.isPaused?t._upstreamEnded=!0:t.end()})},a.prototype.pause=function(){return!!i.prototype.pause.call(this)&&(this._stream.pause(),!0)},a.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},t.exports=a},{\"../stream/GenericWorker\":28,\"../utils\":32}],13:[function(e,t,n){\"use strict\";var r=e(`readable-stream`).Readable;function i(e,t,n){r.call(this,t),this._helper=e;var i=this;e.on(`data`,function(e,t){i.push(e)||i._helper.pause(),n&&n(t)}).on(`error`,function(e){i.emit(`error`,e)}).on(`end`,function(){i.push(null)})}e(`../utils`).inherits(i,r),i.prototype._read=function(){this._helper.resume()},t.exports=i},{\"../utils\":32,\"readable-stream\":16}],14:[function(e,t,n){\"use strict\";t.exports={isNode:typeof Buffer<`u`,newBufferFrom:function(e,t){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(e,t);if(typeof e==`number`)throw Error(`The \"data\" argument must not be a number`);return new Buffer(e,t)},allocBuffer:function(e){if(Buffer.alloc)return Buffer.alloc(e);var t=new Buffer(e);return t.fill(0),t},isBuffer:function(e){return Buffer.isBuffer(e)},isStream:function(e){return e&&typeof e.on==`function`&&typeof e.pause==`function`&&typeof e.resume==`function`}}},{}],15:[function(e,t,n){\"use strict\";function r(e,t,n){var r,i=a.getTypeOf(t),s=a.extend(n||{},c);s.date=s.date||new Date,s.compression!==null&&(s.compression=s.compression.toUpperCase()),typeof s.unixPermissions==`string`&&(s.unixPermissions=parseInt(s.unixPermissions,8)),s.unixPermissions&&16384&s.unixPermissions&&(s.dir=!0),s.dosPermissions&&16&s.dosPermissions&&(s.dir=!0),s.dir&&(e=h(e)),s.createFolders&&(r=m(e))&&g.call(this,r,!0);var d=i===`string`&&!1===s.binary&&!1===s.base64;n&&n.binary!==void 0||(s.binary=!d),(t instanceof l&&t.uncompressedSize===0||s.dir||!t||t.length===0)&&(s.base64=!1,s.binary=!0,t=``,s.compression=`STORE`,i=`string`);var _=null;_=t instanceof l||t instanceof o?t:f.isNode&&f.isStream(t)?new p(e,t):a.prepareContent(e,t,s.binary,s.optimizedBinaryString,s.base64);var v=new u(e,_,s);this.files[e]=v}var i=e(`./utf8`),a=e(`./utils`),o=e(`./stream/GenericWorker`),s=e(`./stream/StreamHelper`),c=e(`./defaults`),l=e(`./compressedObject`),u=e(`./zipObject`),d=e(`./generate`),f=e(`./nodejsUtils`),p=e(`./nodejs/NodejsStreamInputAdapter`),m=function(e){e.slice(-1)===`/`&&(e=e.substring(0,e.length-1));var t=e.lastIndexOf(`/`);return 0<t?e.substring(0,t):``},h=function(e){return e.slice(-1)!==`/`&&(e+=`/`),e},g=function(e,t){return t=t===void 0?c.createFolders:t,e=h(e),this.files[e]||r.call(this,e,null,{dir:!0,createFolders:t}),this.files[e]};function _(e){return Object.prototype.toString.call(e)===`[object RegExp]`}t.exports={load:function(){throw Error(`This method has been removed in JSZip 3.0, please check the upgrade guide.`)},forEach:function(e){var t,n,r;for(t in this.files)r=this.files[t],(n=t.slice(this.root.length,t.length))&&t.slice(0,this.root.length)===this.root&&e(n,r)},filter:function(e){var t=[];return this.forEach(function(n,r){e(n,r)&&t.push(r)}),t},file:function(e,t,n){if(arguments.length!==1)return e=this.root+e,r.call(this,e,t,n),this;if(_(e)){var i=e;return this.filter(function(e,t){return!t.dir&&i.test(e)})}var a=this.files[this.root+e];return a&&!a.dir?a:null},folder:function(e){if(!e)return this;if(_(e))return this.filter(function(t,n){return n.dir&&e.test(t)});var t=this.root+e,n=g.call(this,t),r=this.clone();return r.root=n.name,r},remove:function(e){e=this.root+e;var t=this.files[e];if(t||=(e.slice(-1)!==`/`&&(e+=`/`),this.files[e]),t&&!t.dir)delete this.files[e];else for(var n=this.filter(function(t,n){return n.name.slice(0,e.length)===e}),r=0;r<n.length;r++)delete this.files[n[r].name];return this},generate:function(){throw Error(`This method has been removed in JSZip 3.0, please check the upgrade guide.`)},generateInternalStream:function(e){var t,n={};try{if((n=a.extend(e||{},{streamFiles:!1,compression:`STORE`,compressionOptions:null,type:``,platform:`DOS`,comment:null,mimeType:`application/zip`,encodeFileName:i.utf8encode})).type=n.type.toLowerCase(),n.compression=n.compression.toUpperCase(),n.type===`binarystring`&&(n.type=`string`),!n.type)throw Error(`No output type specified.`);a.checkSupport(n.type),n.platform!==`darwin`&&n.platform!==`freebsd`&&n.platform!==`linux`&&n.platform!==`sunos`||(n.platform=`UNIX`),n.platform===`win32`&&(n.platform=`DOS`);var r=n.comment||this.comment||``;t=d.generateWorker(this,n,r)}catch(e){(t=new o(`error`)).error(e)}return new s(t,n.type||`string`,n.mimeType)},generateAsync:function(e,t){return this.generateInternalStream(e).accumulate(t)},generateNodeStream:function(e,t){return(e||={}).type||(e.type=`nodebuffer`),this.generateInternalStream(e).toNodejsStream(t)}}},{\"./compressedObject\":2,\"./defaults\":5,\"./generate\":9,\"./nodejs/NodejsStreamInputAdapter\":12,\"./nodejsUtils\":14,\"./stream/GenericWorker\":28,\"./stream/StreamHelper\":29,\"./utf8\":31,\"./utils\":32,\"./zipObject\":35}],16:[function(e,t,n){\"use strict\";t.exports=e(`stream`)},{stream:void 0}],17:[function(e,t,n){\"use strict\";var r=e(`./DataReader`);function i(e){r.call(this,e);for(var t=0;t<this.data.length;t++)e[t]=255&e[t]}e(`../utils`).inherits(i,r),i.prototype.byteAt=function(e){return this.data[this.zero+e]},i.prototype.lastIndexOfSignature=function(e){for(var t=e.charCodeAt(0),n=e.charCodeAt(1),r=e.charCodeAt(2),i=e.charCodeAt(3),a=this.length-4;0<=a;--a)if(this.data[a]===t&&this.data[a+1]===n&&this.data[a+2]===r&&this.data[a+3]===i)return a-this.zero;return-1},i.prototype.readAndCheckSignature=function(e){var t=e.charCodeAt(0),n=e.charCodeAt(1),r=e.charCodeAt(2),i=e.charCodeAt(3),a=this.readData(4);return t===a[0]&&n===a[1]&&r===a[2]&&i===a[3]},i.prototype.readData=function(e){if(this.checkOffset(e),e===0)return[];var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{\"../utils\":32,\"./DataReader\":18}],18:[function(e,t,n){\"use strict\";var r=e(`../utils`);function i(e){this.data=e,this.length=e.length,this.index=0,this.zero=0}i.prototype={checkOffset:function(e){this.checkIndex(this.index+e)},checkIndex:function(e){if(this.length<this.zero+e||e<0)throw Error(`End of data reached (data length = `+this.length+`, asked index = `+e+`). Corrupted zip ?`)},setIndex:function(e){this.checkIndex(e),this.index=e},skip:function(e){this.setIndex(this.index+e)},byteAt:function(){},readInt:function(e){var t,n=0;for(this.checkOffset(e),t=this.index+e-1;t>=this.index;t--)n=(n<<8)+this.byteAt(t);return this.index+=e,n},readString:function(e){return r.transformTo(`string`,this.readData(e))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var e=this.readInt(4);return new Date(Date.UTC(1980+(e>>25&127),(e>>21&15)-1,e>>16&31,e>>11&31,e>>5&63,(31&e)<<1))}},t.exports=i},{\"../utils\":32}],19:[function(e,t,n){\"use strict\";var r=e(`./Uint8ArrayReader`);function i(e){r.call(this,e)}e(`../utils`).inherits(i,r),i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{\"../utils\":32,\"./Uint8ArrayReader\":21}],20:[function(e,t,n){\"use strict\";var r=e(`./DataReader`);function i(e){r.call(this,e)}e(`../utils`).inherits(i,r),i.prototype.byteAt=function(e){return this.data.charCodeAt(this.zero+e)},i.prototype.lastIndexOfSignature=function(e){return this.data.lastIndexOf(e)-this.zero},i.prototype.readAndCheckSignature=function(e){return e===this.readData(4)},i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{\"../utils\":32,\"./DataReader\":18}],21:[function(e,t,n){\"use strict\";var r=e(`./ArrayReader`);function i(e){r.call(this,e)}e(`../utils`).inherits(i,r),i.prototype.readData=function(e){if(this.checkOffset(e),e===0)return new Uint8Array;var t=this.data.subarray(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{\"../utils\":32,\"./ArrayReader\":17}],22:[function(e,t,n){\"use strict\";var r=e(`../utils`),i=e(`../support`),a=e(`./ArrayReader`),o=e(`./StringReader`),s=e(`./NodeBufferReader`),c=e(`./Uint8ArrayReader`);t.exports=function(e){var t=r.getTypeOf(e);return r.checkSupport(t),t!==`string`||i.uint8array?t===`nodebuffer`?new s(e):i.uint8array?new c(r.transformTo(`uint8array`,e)):new a(r.transformTo(`array`,e)):new o(e)}},{\"../support\":30,\"../utils\":32,\"./ArrayReader\":17,\"./NodeBufferReader\":19,\"./StringReader\":20,\"./Uint8ArrayReader\":21}],23:[function(e,t,n){\"use strict\";n.LOCAL_FILE_HEADER=`PK`,n.CENTRAL_FILE_HEADER=`PK`,n.CENTRAL_DIRECTORY_END=`PK`,n.ZIP64_CENTRAL_DIRECTORY_LOCATOR=`PK\\x07`,n.ZIP64_CENTRAL_DIRECTORY_END=`PK`,n.DATA_DESCRIPTOR=`PK\\x07\\b`},{}],24:[function(e,t,n){\"use strict\";var r=e(`./GenericWorker`),i=e(`../utils`);function a(e){r.call(this,`ConvertWorker to `+e),this.destType=e}i.inherits(a,r),a.prototype.processChunk=function(e){this.push({data:i.transformTo(this.destType,e.data),meta:e.meta})},t.exports=a},{\"../utils\":32,\"./GenericWorker\":28}],25:[function(e,t,n){\"use strict\";var r=e(`./GenericWorker`),i=e(`../crc32`);function a(){r.call(this,`Crc32Probe`),this.withStreamInfo(`crc32`,0)}e(`../utils`).inherits(a,r),a.prototype.processChunk=function(e){this.streamInfo.crc32=i(e.data,this.streamInfo.crc32||0),this.push(e)},t.exports=a},{\"../crc32\":4,\"../utils\":32,\"./GenericWorker\":28}],26:[function(e,t,n){\"use strict\";var r=e(`../utils`),i=e(`./GenericWorker`);function a(e){i.call(this,`DataLengthProbe for `+e),this.propName=e,this.withStreamInfo(e,0)}r.inherits(a,i),a.prototype.processChunk=function(e){if(e){var t=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=t+e.data.length}i.prototype.processChunk.call(this,e)},t.exports=a},{\"../utils\":32,\"./GenericWorker\":28}],27:[function(e,t,n){\"use strict\";var r=e(`../utils`),i=e(`./GenericWorker`);function a(e){i.call(this,`DataWorker`);var t=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type=``,this._tickScheduled=!1,e.then(function(e){t.dataIsReady=!0,t.data=e,t.max=e&&e.length||0,t.type=r.getTypeOf(e),t.isPaused||t._tickAndRepeat()},function(e){t.error(e)})}r.inherits(a,i),a.prototype.cleanUp=function(){i.prototype.cleanUp.call(this),this.data=null},a.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,r.delay(this._tickAndRepeat,[],this)),!0)},a.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(r.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},a.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var e=null,t=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case`string`:e=this.data.substring(this.index,t);break;case`uint8array`:e=this.data.subarray(this.index,t);break;case`array`:case`nodebuffer`:e=this.data.slice(this.index,t)}return this.index=t,this.push({data:e,meta:{percent:this.max?this.index/this.max*100:0}})},t.exports=a},{\"../utils\":32,\"./GenericWorker\":28}],28:[function(e,t,n){\"use strict\";function r(e){this.name=e||`default`,this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}r.prototype={push:function(e){this.emit(`data`,e)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit(`end`),this.cleanUp(),this.isFinished=!0}catch(e){this.emit(`error`,e)}return!0},error:function(e){return!this.isFinished&&(this.isPaused?this.generatedError=e:(this.isFinished=!0,this.emit(`error`,e),this.previous&&this.previous.error(e),this.cleanUp()),!0)},on:function(e,t){return this._listeners[e].push(t),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(e,t){if(this._listeners[e])for(var n=0;n<this._listeners[e].length;n++)this._listeners[e][n].call(this,t)},pipe:function(e){return e.registerPrevious(this)},registerPrevious:function(e){if(this.isLocked)throw Error(`The stream '`+this+`' has already been used.`);this.streamInfo=e.streamInfo,this.mergeStreamInfo(),this.previous=e;var t=this;return e.on(`data`,function(e){t.processChunk(e)}),e.on(`end`,function(){t.end()}),e.on(`error`,function(e){t.error(e)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var e=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),e=!0),this.previous&&this.previous.resume(),!e},flush:function(){},processChunk:function(e){this.push(e)},withStreamInfo:function(e,t){return this.extraStreamInfo[e]=t,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var e in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,e)&&(this.streamInfo[e]=this.extraStreamInfo[e])},lock:function(){if(this.isLocked)throw Error(`The stream '`+this+`' has already been used.`);this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var e=`Worker `+this.name;return this.previous?this.previous+` -> `+e:e}},t.exports=r},{}],29:[function(e,t,n){\"use strict\";var r=e(`../utils`),i=e(`./ConvertWorker`),a=e(`./GenericWorker`),o=e(`../base64`),s=e(`../support`),c=e(`../external`),l=null;if(s.nodestream)try{l=e(`../nodejs/NodejsStreamOutputAdapter`)}catch{}function u(e,t){return new c.Promise(function(n,i){var a=[],s=e._internalType,c=e._outputType,l=e._mimeType;e.on(`data`,function(e,n){a.push(e),t&&t(n)}).on(`error`,function(e){a=[],i(e)}).on(`end`,function(){try{n(function(e,t,n){switch(e){case`blob`:return r.newBlob(r.transformTo(`arraybuffer`,t),n);case`base64`:return o.encode(t);default:return r.transformTo(e,t)}}(c,function(e,t){var n,r=0,i=null,a=0;for(n=0;n<t.length;n++)a+=t[n].length;switch(e){case`string`:return t.join(``);case`array`:return Array.prototype.concat.apply([],t);case`uint8array`:for(i=new Uint8Array(a),n=0;n<t.length;n++)i.set(t[n],r),r+=t[n].length;return i;case`nodebuffer`:return Buffer.concat(t);default:throw Error(`concat : unsupported type '`+e+`'`)}}(s,a),l))}catch(e){i(e)}a=[]}).resume()})}function d(e,t,n){var o=t;switch(t){case`blob`:case`arraybuffer`:o=`uint8array`;break;case`base64`:o=`string`}try{this._internalType=o,this._outputType=t,this._mimeType=n,r.checkSupport(o),this._worker=e.pipe(new i(o)),e.lock()}catch(e){this._worker=new a(`error`),this._worker.error(e)}}d.prototype={accumulate:function(e){return u(this,e)},on:function(e,t){var n=this;return e===`data`?this._worker.on(e,function(e){t.call(n,e.data,e.meta)}):this._worker.on(e,function(){r.delay(t,arguments,n)}),this},resume:function(){return r.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(e){if(r.checkSupport(`nodestream`),this._outputType!==`nodebuffer`)throw Error(this._outputType+` is not supported by this method`);return new l(this,{objectMode:this._outputType!==`nodebuffer`},e)}},t.exports=d},{\"../base64\":1,\"../external\":6,\"../nodejs/NodejsStreamOutputAdapter\":13,\"../support\":30,\"../utils\":32,\"./ConvertWorker\":24,\"./GenericWorker\":28}],30:[function(e,t,n){\"use strict\";if(n.base64=!0,n.array=!0,n.string=!0,n.arraybuffer=typeof ArrayBuffer<`u`&&typeof Uint8Array<`u`,n.nodebuffer=typeof Buffer<`u`,n.uint8array=typeof Uint8Array<`u`,typeof ArrayBuffer>`u`)n.blob=!1;else{var r=new ArrayBuffer(0);try{n.blob=new Blob([r],{type:`application/zip`}).size===0}catch{try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);i.append(r),n.blob=i.getBlob(`application/zip`).size===0}catch{n.blob=!1}}}try{n.nodestream=!!e(`readable-stream`).Readable}catch{n.nodestream=!1}},{\"readable-stream\":16}],31:[function(e,t,n){\"use strict\";for(var r=e(`./utils`),i=e(`./support`),a=e(`./nodejsUtils`),o=e(`./stream/GenericWorker`),s=Array(256),c=0;c<256;c++)s[c]=252<=c?6:248<=c?5:240<=c?4:224<=c?3:192<=c?2:1;s[254]=s[254]=1;function l(){o.call(this,`utf-8 decode`),this.leftOver=null}function u(){o.call(this,`utf-8 encode`)}n.utf8encode=function(e){return i.nodebuffer?a.newBufferFrom(e,`utf-8`):function(e){var t,n,r,a,o,s=e.length,c=0;for(a=0;a<s;a++)(64512&(n=e.charCodeAt(a)))==55296&&a+1<s&&(64512&(r=e.charCodeAt(a+1)))==56320&&(n=65536+(n-55296<<10)+(r-56320),a++),c+=n<128?1:n<2048?2:n<65536?3:4;for(t=i.uint8array?new Uint8Array(c):Array(c),a=o=0;o<c;a++)(64512&(n=e.charCodeAt(a)))==55296&&a+1<s&&(64512&(r=e.charCodeAt(a+1)))==56320&&(n=65536+(n-55296<<10)+(r-56320),a++),n<128?t[o++]=n:(n<2048?t[o++]=192|n>>>6:(n<65536?t[o++]=224|n>>>12:(t[o++]=240|n>>>18,t[o++]=128|n>>>12&63),t[o++]=128|n>>>6&63),t[o++]=128|63&n);return t}(e)},n.utf8decode=function(e){return i.nodebuffer?r.transformTo(`nodebuffer`,e).toString(`utf-8`):function(e){var t,n,i,a,o=e.length,c=Array(2*o);for(t=n=0;t<o;)if((i=e[t++])<128)c[n++]=i;else if(4<(a=s[i]))c[n++]=65533,t+=a-1;else{for(i&=a===2?31:a===3?15:7;1<a&&t<o;)i=i<<6|63&e[t++],a--;1<a?c[n++]=65533:i<65536?c[n++]=i:(i-=65536,c[n++]=55296|i>>10&1023,c[n++]=56320|1023&i)}return c.length!==n&&(c.subarray?c=c.subarray(0,n):c.length=n),r.applyFromCharCode(c)}(e=r.transformTo(i.uint8array?`uint8array`:`array`,e))},r.inherits(l,o),l.prototype.processChunk=function(e){var t=r.transformTo(i.uint8array?`uint8array`:`array`,e.data);if(this.leftOver&&this.leftOver.length){if(i.uint8array){var a=t;(t=new Uint8Array(a.length+this.leftOver.length)).set(this.leftOver,0),t.set(a,this.leftOver.length)}else t=this.leftOver.concat(t);this.leftOver=null}var o=function(e,t){var n;for((t||=e.length)>e.length&&(t=e.length),n=t-1;0<=n&&(192&e[n])==128;)n--;return n<0||n===0?t:n+s[e[n]]>t?n:t}(t),c=t;o!==t.length&&(i.uint8array?(c=t.subarray(0,o),this.leftOver=t.subarray(o,t.length)):(c=t.slice(0,o),this.leftOver=t.slice(o,t.length))),this.push({data:n.utf8decode(c),meta:e.meta})},l.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:n.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},n.Utf8DecodeWorker=l,r.inherits(u,o),u.prototype.processChunk=function(e){this.push({data:n.utf8encode(e.data),meta:e.meta})},n.Utf8EncodeWorker=u},{\"./nodejsUtils\":14,\"./stream/GenericWorker\":28,\"./support\":30,\"./utils\":32}],32:[function(e,t,n){\"use strict\";var r=e(`./support`),i=e(`./base64`),a=e(`./nodejsUtils`),o=e(`./external`);function s(e){return e}function c(e,t){for(var n=0;n<e.length;++n)t[n]=255&e.charCodeAt(n);return t}e(`setimmediate`),n.newBlob=function(e,t){n.checkSupport(`blob`);try{return new Blob([e],{type:t})}catch{try{var r=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return r.append(e),r.getBlob(t)}catch{throw Error(`Bug : can't construct the Blob.`)}}};var l={stringifyByChunk:function(e,t,n){var r=[],i=0,a=e.length;if(a<=n)return String.fromCharCode.apply(null,e);for(;i<a;)t===`array`||t===`nodebuffer`?r.push(String.fromCharCode.apply(null,e.slice(i,Math.min(i+n,a)))):r.push(String.fromCharCode.apply(null,e.subarray(i,Math.min(i+n,a)))),i+=n;return r.join(``)},stringifyByChar:function(e){for(var t=``,n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return t},applyCanBeUsed:{uint8array:function(){try{return r.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch{return!1}}(),nodebuffer:function(){try{return r.nodebuffer&&String.fromCharCode.apply(null,a.allocBuffer(1)).length===1}catch{return!1}}()}};function u(e){var t=65536,r=n.getTypeOf(e),i=!0;if(r===`uint8array`?i=l.applyCanBeUsed.uint8array:r===`nodebuffer`&&(i=l.applyCanBeUsed.nodebuffer),i)for(;1<t;)try{return l.stringifyByChunk(e,r,t)}catch{t=Math.floor(t/2)}return l.stringifyByChar(e)}function d(e,t){for(var n=0;n<e.length;n++)t[n]=e[n];return t}n.applyFromCharCode=u;var f={};f.string={string:s,array:function(e){return c(e,Array(e.length))},arraybuffer:function(e){return f.string.uint8array(e).buffer},uint8array:function(e){return c(e,new Uint8Array(e.length))},nodebuffer:function(e){return c(e,a.allocBuffer(e.length))}},f.array={string:u,array:s,arraybuffer:function(e){return new Uint8Array(e).buffer},uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return a.newBufferFrom(e)}},f.arraybuffer={string:function(e){return u(new Uint8Array(e))},array:function(e){return d(new Uint8Array(e),Array(e.byteLength))},arraybuffer:s,uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return a.newBufferFrom(new Uint8Array(e))}},f.uint8array={string:u,array:function(e){return d(e,Array(e.length))},arraybuffer:function(e){return e.buffer},uint8array:s,nodebuffer:function(e){return a.newBufferFrom(e)}},f.nodebuffer={string:u,array:function(e){return d(e,Array(e.length))},arraybuffer:function(e){return f.nodebuffer.uint8array(e).buffer},uint8array:function(e){return d(e,new Uint8Array(e.length))},nodebuffer:s},n.transformTo=function(e,t){return t||=``,e?(n.checkSupport(e),f[n.getTypeOf(t)][e](t)):t},n.resolve=function(e){for(var t=e.split(`/`),n=[],r=0;r<t.length;r++){var i=t[r];i===`.`||i===``&&r!==0&&r!==t.length-1||(i===`..`?n.pop():n.push(i))}return n.join(`/`)},n.getTypeOf=function(e){return typeof e==`string`?`string`:Object.prototype.toString.call(e)===`[object Array]`?`array`:r.nodebuffer&&a.isBuffer(e)?`nodebuffer`:r.uint8array&&e instanceof Uint8Array?`uint8array`:r.arraybuffer&&e instanceof ArrayBuffer?`arraybuffer`:void 0},n.checkSupport=function(e){if(!r[e.toLowerCase()])throw Error(e+` is not supported by this platform`)},n.MAX_VALUE_16BITS=65535,n.MAX_VALUE_32BITS=-1,n.pretty=function(e){var t,n,r=``;for(n=0;n<(e||``).length;n++)r+=`\\\\x`+((t=e.charCodeAt(n))<16?`0`:``)+t.toString(16).toUpperCase();return r},n.delay=function(e,t,n){setImmediate(function(){e.apply(n||null,t||[])})},n.inherits=function(e,t){function n(){}n.prototype=t.prototype,e.prototype=new n},n.extend=function(){var e,t,n={};for(e=0;e<arguments.length;e++)for(t in arguments[e])Object.prototype.hasOwnProperty.call(arguments[e],t)&&n[t]===void 0&&(n[t]=arguments[e][t]);return n},n.prepareContent=function(e,t,a,s,l){return o.Promise.resolve(t).then(function(e){return r.blob&&(e instanceof Blob||[`[object File]`,`[object Blob]`].indexOf(Object.prototype.toString.call(e))!==-1)&&typeof FileReader<`u`?new o.Promise(function(t,n){var r=new FileReader;r.onload=function(e){t(e.target.result)},r.onerror=function(e){n(e.target.error)},r.readAsArrayBuffer(e)}):e}).then(function(t){var u=n.getTypeOf(t);return u?(u===`arraybuffer`?t=n.transformTo(`uint8array`,t):u===`string`&&(l?t=i.decode(t):a&&!0!==s&&(t=function(e){return c(e,r.uint8array?new Uint8Array(e.length):Array(e.length))}(t))),t):o.Promise.reject(Error(`Can't read the data of '`+e+`'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?`))})}},{\"./base64\":1,\"./external\":6,\"./nodejsUtils\":14,\"./support\":30,setimmediate:54}],33:[function(e,t,n){\"use strict\";var r=e(`./reader/readerFor`),i=e(`./utils`),a=e(`./signature`),o=e(`./zipEntry`),s=e(`./support`);function c(e){this.files=[],this.loadOptions=e}c.prototype={checkSignature:function(e){if(!this.reader.readAndCheckSignature(e)){this.reader.index-=4;var t=this.reader.readString(4);throw Error(`Corrupted zip or bug: unexpected signature (`+i.pretty(t)+`, expected `+i.pretty(e)+`)`)}},isSignature:function(e,t){var n=this.reader.index;this.reader.setIndex(e);var r=this.reader.readString(4)===t;return this.reader.setIndex(n),r},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var e=this.reader.readData(this.zipCommentLength),t=s.uint8array?`uint8array`:`array`,n=i.transformTo(t,e);this.zipComment=this.loadOptions.decodeFileName(n)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var e,t,n,r=this.zip64EndOfCentralSize-44;0<r;)e=this.reader.readInt(2),t=this.reader.readInt(4),n=this.reader.readData(t),this.zip64ExtensibleData[e]={id:e,length:t,value:n}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw Error(`Multi-volumes zip are not supported`)},readLocalFiles:function(){var e,t;for(e=0;e<this.files.length;e++)t=this.files[e],this.reader.setIndex(t.localHeaderOffset),this.checkSignature(a.LOCAL_FILE_HEADER),t.readLocalPart(this.reader),t.handleUTF8(),t.processAttributes()},readCentralDir:function(){var e;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(a.CENTRAL_FILE_HEADER);)(e=new o({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(e);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw Error(`Corrupted zip or bug: expected `+this.centralDirRecords+` records in central dir, got `+this.files.length)},readEndOfCentral:function(){var e=this.reader.lastIndexOfSignature(a.CENTRAL_DIRECTORY_END);if(e<0)throw this.isSignature(0,a.LOCAL_FILE_HEADER)?Error(`Corrupted zip: can't find end of central directory`):Error(`Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html`);this.reader.setIndex(e);var t=e;if(this.checkSignature(a.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===i.MAX_VALUE_16BITS||this.diskWithCentralDirStart===i.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===i.MAX_VALUE_16BITS||this.centralDirRecords===i.MAX_VALUE_16BITS||this.centralDirSize===i.MAX_VALUE_32BITS||this.centralDirOffset===i.MAX_VALUE_32BITS){if(this.zip64=!0,(e=this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw Error(`Corrupted zip: can't find the ZIP64 end of central directory locator`);if(this.reader.setIndex(e),this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,a.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(a.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw Error(`Corrupted zip: can't find the ZIP64 end of central directory`);this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(a.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var n=this.centralDirOffset+this.centralDirSize;this.zip64&&(n+=20,n+=12+this.zip64EndOfCentralSize);var r=t-n;if(0<r)this.isSignature(t,a.CENTRAL_FILE_HEADER)||(this.reader.zero=r);else if(r<0)throw Error(`Corrupted zip: missing `+Math.abs(r)+` bytes.`)},prepareReader:function(e){this.reader=r(e)},load:function(e){this.prepareReader(e),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},t.exports=c},{\"./reader/readerFor\":22,\"./signature\":23,\"./support\":30,\"./utils\":32,\"./zipEntry\":34}],34:[function(e,t,n){\"use strict\";var r=e(`./reader/readerFor`),i=e(`./utils`),a=e(`./compressedObject`),o=e(`./crc32`),s=e(`./utf8`),c=e(`./compressions`),l=e(`./support`);function u(e,t){this.options=e,this.loadOptions=t}u.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(e){var t,n;if(e.skip(22),this.fileNameLength=e.readInt(2),n=e.readInt(2),this.fileName=e.readData(this.fileNameLength),e.skip(n),this.compressedSize===-1||this.uncompressedSize===-1)throw Error(`Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)`);if((t=function(e){for(var t in c)if(Object.prototype.hasOwnProperty.call(c,t)&&c[t].magic===e)return c[t];return null}(this.compressionMethod))===null)throw Error(`Corrupted zip : compression `+i.pretty(this.compressionMethod)+` unknown (inner file : `+i.transformTo(`string`,this.fileName)+`)`);this.decompressed=new a(this.compressedSize,this.uncompressedSize,this.crc32,t,e.readData(this.compressedSize))},readCentralPart:function(e){this.versionMadeBy=e.readInt(2),e.skip(2),this.bitFlag=e.readInt(2),this.compressionMethod=e.readString(2),this.date=e.readDate(),this.crc32=e.readInt(4),this.compressedSize=e.readInt(4),this.uncompressedSize=e.readInt(4);var t=e.readInt(2);if(this.extraFieldsLength=e.readInt(2),this.fileCommentLength=e.readInt(2),this.diskNumberStart=e.readInt(2),this.internalFileAttributes=e.readInt(2),this.externalFileAttributes=e.readInt(4),this.localHeaderOffset=e.readInt(4),this.isEncrypted())throw Error(`Encrypted zip are not supported`);e.skip(t),this.readExtraFields(e),this.parseZIP64ExtraField(e),this.fileComment=e.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var e=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),e==0&&(this.dosPermissions=63&this.externalFileAttributes),e==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!==`/`||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var e=r(this.extraFields[1].value);this.uncompressedSize===i.MAX_VALUE_32BITS&&(this.uncompressedSize=e.readInt(8)),this.compressedSize===i.MAX_VALUE_32BITS&&(this.compressedSize=e.readInt(8)),this.localHeaderOffset===i.MAX_VALUE_32BITS&&(this.localHeaderOffset=e.readInt(8)),this.diskNumberStart===i.MAX_VALUE_32BITS&&(this.diskNumberStart=e.readInt(4))}},readExtraFields:function(e){var t,n,r,i=e.index+this.extraFieldsLength;for(this.extraFields||={};e.index+4<i;)t=e.readInt(2),n=e.readInt(2),r=e.readData(n),this.extraFields[t]={id:t,length:n,value:r};e.setIndex(i)},handleUTF8:function(){var e=l.uint8array?`uint8array`:`array`;if(this.useUTF8())this.fileNameStr=s.utf8decode(this.fileName),this.fileCommentStr=s.utf8decode(this.fileComment);else{var t=this.findExtraFieldUnicodePath();if(t!==null)this.fileNameStr=t;else{var n=i.transformTo(e,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(n)}var r=this.findExtraFieldUnicodeComment();if(r!==null)this.fileCommentStr=r;else{var a=i.transformTo(e,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(a)}}},findExtraFieldUnicodePath:function(){var e=this.extraFields[28789];if(e){var t=r(e.value);return t.readInt(1)===1&&o(this.fileName)===t.readInt(4)?s.utf8decode(t.readData(e.length-5)):null}return null},findExtraFieldUnicodeComment:function(){var e=this.extraFields[25461];if(e){var t=r(e.value);return t.readInt(1)===1&&o(this.fileComment)===t.readInt(4)?s.utf8decode(t.readData(e.length-5)):null}return null}},t.exports=u},{\"./compressedObject\":2,\"./compressions\":3,\"./crc32\":4,\"./reader/readerFor\":22,\"./support\":30,\"./utf8\":31,\"./utils\":32}],35:[function(e,t,n){\"use strict\";function r(e,t,n){this.name=e,this.dir=n.dir,this.date=n.date,this.comment=n.comment,this.unixPermissions=n.unixPermissions,this.dosPermissions=n.dosPermissions,this._data=t,this._dataBinary=n.binary,this.options={compression:n.compression,compressionOptions:n.compressionOptions}}var i=e(`./stream/StreamHelper`),a=e(`./stream/DataWorker`),o=e(`./utf8`),s=e(`./compressedObject`),c=e(`./stream/GenericWorker`);r.prototype={internalStream:function(e){var t=null,n=`string`;try{if(!e)throw Error(`No output type specified.`);var r=(n=e.toLowerCase())===`string`||n===`text`;n!==`binarystring`&&n!==`text`||(n=`string`),t=this._decompressWorker();var a=!this._dataBinary;a&&!r&&(t=t.pipe(new o.Utf8EncodeWorker)),!a&&r&&(t=t.pipe(new o.Utf8DecodeWorker))}catch(e){(t=new c(`error`)).error(e)}return new i(t,n,``)},async:function(e,t){return this.internalStream(e).accumulate(t)},nodeStream:function(e,t){return this.internalStream(e||`nodebuffer`).toNodejsStream(t)},_compressWorker:function(e,t){if(this._data instanceof s&&this._data.compression.magic===e.magic)return this._data.getCompressedWorker();var n=this._decompressWorker();return this._dataBinary||(n=n.pipe(new o.Utf8EncodeWorker)),s.createWorkerFrom(n,e,t)},_decompressWorker:function(){return this._data instanceof s?this._data.getContentWorker():this._data instanceof c?this._data:new a(this._data)}};for(var l=[`asText`,`asBinary`,`asNodeBuffer`,`asUint8Array`,`asArrayBuffer`],u=function(){throw Error(`This method has been removed in JSZip 3.0, please check the upgrade guide.`)},d=0;d<l.length;d++)r.prototype[l[d]]=u;t.exports=r},{\"./compressedObject\":2,\"./stream/DataWorker\":27,\"./stream/GenericWorker\":28,\"./stream/StreamHelper\":29,\"./utf8\":31}],36:[function(e,t,n){(function(e){\"use strict\";var n,r,i=e.MutationObserver||e.WebKitMutationObserver;if(i){var a=0,o=new i(u),s=e.document.createTextNode(``);o.observe(s,{characterData:!0}),n=function(){s.data=a=++a%2}}else if(e.setImmediate||e.MessageChannel===void 0)n=`document`in e&&`onreadystatechange`in e.document.createElement(`script`)?function(){var t=e.document.createElement(`script`);t.onreadystatechange=function(){u(),t.onreadystatechange=null,t.parentNode.removeChild(t),t=null},e.document.documentElement.appendChild(t)}:function(){setTimeout(u,0)};else{var c=new e.MessageChannel;c.port1.onmessage=u,n=function(){c.port2.postMessage(0)}}var l=[];function u(){var e,t;r=!0;for(var n=l.length;n;){for(t=l,l=[],e=-1;++e<n;)t[e]();n=l.length}r=!1}t.exports=function(e){l.push(e)!==1||r||n()}}).call(this,typeof global<`u`?global:typeof self<`u`?self:typeof window<`u`?window:{})},{}],37:[function(e,t,n){\"use strict\";var r=e(`immediate`);function i(){}var a={},o=[`REJECTED`],s=[`FULFILLED`],c=[`PENDING`];function l(e){if(typeof e!=`function`)throw TypeError(`resolver must be a function`);this.state=c,this.queue=[],this.outcome=void 0,e!==i&&p(this,e)}function u(e,t,n){this.promise=e,typeof t==`function`&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),typeof n==`function`&&(this.onRejected=n,this.callRejected=this.otherCallRejected)}function d(e,t,n){r(function(){var r;try{r=t(n)}catch(t){return a.reject(e,t)}r===e?a.reject(e,TypeError(`Cannot resolve promise with itself`)):a.resolve(e,r)})}function f(e){var t=e&&e.then;if(e&&(typeof e==`object`||typeof e==`function`)&&typeof t==`function`)return function(){t.apply(e,arguments)}}function p(e,t){var n=!1;function r(t){n||(n=!0,a.reject(e,t))}function i(t){n||(n=!0,a.resolve(e,t))}var o=m(function(){t(i,r)});o.status===`error`&&r(o.value)}function m(e,t){var n={};try{n.value=e(t),n.status=`success`}catch(e){n.status=`error`,n.value=e}return n}(t.exports=l).prototype.finally=function(e){if(typeof e!=`function`)return this;var t=this.constructor;return this.then(function(n){return t.resolve(e()).then(function(){return n})},function(n){return t.resolve(e()).then(function(){throw n})})},l.prototype.catch=function(e){return this.then(null,e)},l.prototype.then=function(e,t){if(typeof e!=`function`&&this.state===s||typeof t!=`function`&&this.state===o)return this;var n=new this.constructor(i);return this.state===c?this.queue.push(new u(n,e,t)):d(n,this.state===s?e:t,this.outcome),n},u.prototype.callFulfilled=function(e){a.resolve(this.promise,e)},u.prototype.otherCallFulfilled=function(e){d(this.promise,this.onFulfilled,e)},u.prototype.callRejected=function(e){a.reject(this.promise,e)},u.prototype.otherCallRejected=function(e){d(this.promise,this.onRejected,e)},a.resolve=function(e,t){var n=m(f,t);if(n.status===`error`)return a.reject(e,n.value);var r=n.value;if(r)p(e,r);else{e.state=s,e.outcome=t;for(var i=-1,o=e.queue.length;++i<o;)e.queue[i].callFulfilled(t)}return e},a.reject=function(e,t){e.state=o,e.outcome=t;for(var n=-1,r=e.queue.length;++n<r;)e.queue[n].callRejected(t);return e},l.resolve=function(e){return e instanceof this?e:a.resolve(new this(i),e)},l.reject=function(e){var t=new this(i);return a.reject(t,e)},l.all=function(e){var t=this;if(Object.prototype.toString.call(e)!==`[object Array]`)return this.reject(TypeError(`must be an array`));var n=e.length,r=!1;if(!n)return this.resolve([]);for(var o=Array(n),s=0,c=-1,l=new this(i);++c<n;)u(e[c],c);return l;function u(e,i){t.resolve(e).then(function(e){o[i]=e,++s!==n||r||(r=!0,a.resolve(l,o))},function(e){r||(r=!0,a.reject(l,e))})}},l.race=function(e){var t=this;if(Object.prototype.toString.call(e)!==`[object Array]`)return this.reject(TypeError(`must be an array`));var n=e.length,r=!1;if(!n)return this.resolve([]);for(var o=-1,s=new this(i);++o<n;)c=e[o],t.resolve(c).then(function(e){r||(r=!0,a.resolve(s,e))},function(e){r||(r=!0,a.reject(s,e))});var c;return s}},{immediate:36}],38:[function(e,t,n){\"use strict\";var r={};(0,e(`./lib/utils/common`).assign)(r,e(`./lib/deflate`),e(`./lib/inflate`),e(`./lib/zlib/constants`)),t.exports=r},{\"./lib/deflate\":39,\"./lib/inflate\":40,\"./lib/utils/common\":41,\"./lib/zlib/constants\":44}],39:[function(e,t,n){\"use strict\";var r=e(`./zlib/deflate`),i=e(`./utils/common`),a=e(`./utils/strings`),o=e(`./zlib/messages`),s=e(`./zlib/zstream`),c=Object.prototype.toString,l=0,u=-1,d=0,f=8;function p(e){if(!(this instanceof p))return new p(e);this.options=i.assign({level:u,method:f,chunkSize:16384,windowBits:15,memLevel:8,strategy:d,to:``},e||{});var t=this.options;t.raw&&0<t.windowBits?t.windowBits=-t.windowBits:t.gzip&&0<t.windowBits&&t.windowBits<16&&(t.windowBits+=16),this.err=0,this.msg=``,this.ended=!1,this.chunks=[],this.strm=new s,this.strm.avail_out=0;var n=r.deflateInit2(this.strm,t.level,t.method,t.windowBits,t.memLevel,t.strategy);if(n!==l)throw Error(o[n]);if(t.header&&r.deflateSetHeader(this.strm,t.header),t.dictionary){var m;if(m=typeof t.dictionary==`string`?a.string2buf(t.dictionary):c.call(t.dictionary)===`[object ArrayBuffer]`?new Uint8Array(t.dictionary):t.dictionary,(n=r.deflateSetDictionary(this.strm,m))!==l)throw Error(o[n]);this._dict_set=!0}}function m(e,t){var n=new p(t);if(n.push(e,!0),n.err)throw n.msg||o[n.err];return n.result}p.prototype.push=function(e,t){var n,o,s=this.strm,u=this.options.chunkSize;if(this.ended)return!1;o=t===~~t?t:!0===t?4:0,typeof e==`string`?s.input=a.string2buf(e):c.call(e)===`[object ArrayBuffer]`?s.input=new Uint8Array(e):s.input=e,s.next_in=0,s.avail_in=s.input.length;do{if(s.avail_out===0&&(s.output=new i.Buf8(u),s.next_out=0,s.avail_out=u),(n=r.deflate(s,o))!==1&&n!==l)return this.onEnd(n),!(this.ended=!0);s.avail_out!==0&&(s.avail_in!==0||o!==4&&o!==2)||(this.options.to===`string`?this.onData(a.buf2binstring(i.shrinkBuf(s.output,s.next_out))):this.onData(i.shrinkBuf(s.output,s.next_out)))}while((0<s.avail_in||s.avail_out===0)&&n!==1);return o===4?(n=r.deflateEnd(this.strm),this.onEnd(n),this.ended=!0,n===l):o!==2||(this.onEnd(l),!(s.avail_out=0))},p.prototype.onData=function(e){this.chunks.push(e)},p.prototype.onEnd=function(e){e===l&&(this.options.to===`string`?this.result=this.chunks.join(``):this.result=i.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},n.Deflate=p,n.deflate=m,n.deflateRaw=function(e,t){return(t||={}).raw=!0,m(e,t)},n.gzip=function(e,t){return(t||={}).gzip=!0,m(e,t)}},{\"./utils/common\":41,\"./utils/strings\":42,\"./zlib/deflate\":46,\"./zlib/messages\":51,\"./zlib/zstream\":53}],40:[function(e,t,n){\"use strict\";var r=e(`./zlib/inflate`),i=e(`./utils/common`),a=e(`./utils/strings`),o=e(`./zlib/constants`),s=e(`./zlib/messages`),c=e(`./zlib/zstream`),l=e(`./zlib/gzheader`),u=Object.prototype.toString;function d(e){if(!(this instanceof d))return new d(e);this.options=i.assign({chunkSize:16384,windowBits:0,to:``},e||{});var t=this.options;t.raw&&0<=t.windowBits&&t.windowBits<16&&(t.windowBits=-t.windowBits,t.windowBits===0&&(t.windowBits=-15)),!(0<=t.windowBits&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),15<t.windowBits&&t.windowBits<48&&!(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg=``,this.ended=!1,this.chunks=[],this.strm=new c,this.strm.avail_out=0;var n=r.inflateInit2(this.strm,t.windowBits);if(n!==o.Z_OK)throw Error(s[n]);this.header=new l,r.inflateGetHeader(this.strm,this.header)}function f(e,t){var n=new d(t);if(n.push(e,!0),n.err)throw n.msg||s[n.err];return n.result}d.prototype.push=function(e,t){var n,s,c,l,d,f,p=this.strm,m=this.options.chunkSize,h=this.options.dictionary,g=!1;if(this.ended)return!1;s=t===~~t?t:!0===t?o.Z_FINISH:o.Z_NO_FLUSH,typeof e==`string`?p.input=a.binstring2buf(e):u.call(e)===`[object ArrayBuffer]`?p.input=new Uint8Array(e):p.input=e,p.next_in=0,p.avail_in=p.input.length;do{if(p.avail_out===0&&(p.output=new i.Buf8(m),p.next_out=0,p.avail_out=m),(n=r.inflate(p,o.Z_NO_FLUSH))===o.Z_NEED_DICT&&h&&(f=typeof h==`string`?a.string2buf(h):u.call(h)===`[object ArrayBuffer]`?new Uint8Array(h):h,n=r.inflateSetDictionary(this.strm,f)),n===o.Z_BUF_ERROR&&!0===g&&(n=o.Z_OK,g=!1),n!==o.Z_STREAM_END&&n!==o.Z_OK)return this.onEnd(n),!(this.ended=!0);p.next_out&&(p.avail_out!==0&&n!==o.Z_STREAM_END&&(p.avail_in!==0||s!==o.Z_FINISH&&s!==o.Z_SYNC_FLUSH)||(this.options.to===`string`?(c=a.utf8border(p.output,p.next_out),l=p.next_out-c,d=a.buf2string(p.output,c),p.next_out=l,p.avail_out=m-l,l&&i.arraySet(p.output,p.output,c,l,0),this.onData(d)):this.onData(i.shrinkBuf(p.output,p.next_out)))),p.avail_in===0&&p.avail_out===0&&(g=!0)}while((0<p.avail_in||p.avail_out===0)&&n!==o.Z_STREAM_END);return n===o.Z_STREAM_END&&(s=o.Z_FINISH),s===o.Z_FINISH?(n=r.inflateEnd(this.strm),this.onEnd(n),this.ended=!0,n===o.Z_OK):s!==o.Z_SYNC_FLUSH||(this.onEnd(o.Z_OK),!(p.avail_out=0))},d.prototype.onData=function(e){this.chunks.push(e)},d.prototype.onEnd=function(e){e===o.Z_OK&&(this.options.to===`string`?this.result=this.chunks.join(``):this.result=i.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},n.Inflate=d,n.inflate=f,n.inflateRaw=function(e,t){return(t||={}).raw=!0,f(e,t)},n.ungzip=f},{\"./utils/common\":41,\"./utils/strings\":42,\"./zlib/constants\":44,\"./zlib/gzheader\":47,\"./zlib/inflate\":49,\"./zlib/messages\":51,\"./zlib/zstream\":53}],41:[function(e,t,n){\"use strict\";var r=typeof Uint8Array<`u`&&typeof Uint16Array<`u`&&typeof Int32Array<`u`;n.assign=function(e){for(var t=Array.prototype.slice.call(arguments,1);t.length;){var n=t.shift();if(n){if(typeof n!=`object`)throw TypeError(n+`must be non-object`);for(var r in n)n.hasOwnProperty(r)&&(e[r]=n[r])}}return e},n.shrinkBuf=function(e,t){return e.length===t?e:e.subarray?e.subarray(0,t):(e.length=t,e)};var i={arraySet:function(e,t,n,r,i){if(t.subarray&&e.subarray)e.set(t.subarray(n,n+r),i);else for(var a=0;a<r;a++)e[i+a]=t[n+a]},flattenChunks:function(e){var t,n,r,i,a,o;for(t=r=0,n=e.length;t<n;t++)r+=e[t].length;for(o=new Uint8Array(r),t=i=0,n=e.length;t<n;t++)a=e[t],o.set(a,i),i+=a.length;return o}},a={arraySet:function(e,t,n,r,i){for(var a=0;a<r;a++)e[i+a]=t[n+a]},flattenChunks:function(e){return[].concat.apply([],e)}};n.setTyped=function(e){e?(n.Buf8=Uint8Array,n.Buf16=Uint16Array,n.Buf32=Int32Array,n.assign(n,i)):(n.Buf8=Array,n.Buf16=Array,n.Buf32=Array,n.assign(n,a))},n.setTyped(r)},{}],42:[function(e,t,n){\"use strict\";var r=e(`./common`),i=!0,a=!0;try{String.fromCharCode.apply(null,[0])}catch{i=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{a=!1}for(var o=new r.Buf8(256),s=0;s<256;s++)o[s]=252<=s?6:248<=s?5:240<=s?4:224<=s?3:192<=s?2:1;function c(e,t){if(t<65537&&(e.subarray&&a||!e.subarray&&i))return String.fromCharCode.apply(null,r.shrinkBuf(e,t));for(var n=``,o=0;o<t;o++)n+=String.fromCharCode(e[o]);return n}o[254]=o[254]=1,n.string2buf=function(e){var t,n,i,a,o,s=e.length,c=0;for(a=0;a<s;a++)(64512&(n=e.charCodeAt(a)))==55296&&a+1<s&&(64512&(i=e.charCodeAt(a+1)))==56320&&(n=65536+(n-55296<<10)+(i-56320),a++),c+=n<128?1:n<2048?2:n<65536?3:4;for(t=new r.Buf8(c),a=o=0;o<c;a++)(64512&(n=e.charCodeAt(a)))==55296&&a+1<s&&(64512&(i=e.charCodeAt(a+1)))==56320&&(n=65536+(n-55296<<10)+(i-56320),a++),n<128?t[o++]=n:(n<2048?t[o++]=192|n>>>6:(n<65536?t[o++]=224|n>>>12:(t[o++]=240|n>>>18,t[o++]=128|n>>>12&63),t[o++]=128|n>>>6&63),t[o++]=128|63&n);return t},n.buf2binstring=function(e){return c(e,e.length)},n.binstring2buf=function(e){for(var t=new r.Buf8(e.length),n=0,i=t.length;n<i;n++)t[n]=e.charCodeAt(n);return t},n.buf2string=function(e,t){var n,r,i,a,s=t||e.length,l=Array(2*s);for(n=r=0;n<s;)if((i=e[n++])<128)l[r++]=i;else if(4<(a=o[i]))l[r++]=65533,n+=a-1;else{for(i&=a===2?31:a===3?15:7;1<a&&n<s;)i=i<<6|63&e[n++],a--;1<a?l[r++]=65533:i<65536?l[r++]=i:(i-=65536,l[r++]=55296|i>>10&1023,l[r++]=56320|1023&i)}return c(l,r)},n.utf8border=function(e,t){var n;for((t||=e.length)>e.length&&(t=e.length),n=t-1;0<=n&&(192&e[n])==128;)n--;return n<0||n===0?t:n+o[e[n]]>t?n:t}},{\"./common\":41}],43:[function(e,t,n){\"use strict\";t.exports=function(e,t,n,r){for(var i=65535&e|0,a=e>>>16&65535|0,o=0;n!==0;){for(n-=o=2e3<n?2e3:n;a=a+(i=i+t[r++]|0)|0,--o;);i%=65521,a%=65521}return i|a<<16|0}},{}],44:[function(e,t,n){\"use strict\";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(e,t,n){\"use strict\";var r=function(){for(var e,t=[],n=0;n<256;n++){e=n;for(var r=0;r<8;r++)e=1&e?3988292384^e>>>1:e>>>1;t[n]=e}return t}();t.exports=function(e,t,n,i){var a=r,o=i+n;e^=-1;for(var s=i;s<o;s++)e=e>>>8^a[255&(e^t[s])];return-1^e}},{}],46:[function(e,t,n){\"use strict\";var r,i=e(`../utils/common`),a=e(`./trees`),o=e(`./adler32`),s=e(`./crc32`),c=e(`./messages`),l=0,u=4,d=0,f=-2,p=-1,m=4,h=2,g=8,_=9,v=286,y=30,b=19,x=2*v+1,S=15,C=3,w=258,T=w+C+1,E=42,D=113,O=1,k=2,A=3,j=4;function M(e,t){return e.msg=c[t],t}function N(e){return(e<<1)-(4<e?9:0)}function P(e){for(var t=e.length;0<=--t;)e[t]=0}function F(e){var t=e.state,n=t.pending;n>e.avail_out&&(n=e.avail_out),n!==0&&(i.arraySet(e.output,t.pending_buf,t.pending_out,n,e.next_out),e.next_out+=n,t.pending_out+=n,e.total_out+=n,e.avail_out-=n,t.pending-=n,t.pending===0&&(t.pending_out=0))}function I(e,t){a._tr_flush_block(e,0<=e.block_start?e.block_start:-1,e.strstart-e.block_start,t),e.block_start=e.strstart,F(e.strm)}function L(e,t){e.pending_buf[e.pending++]=t}function R(e,t){e.pending_buf[e.pending++]=t>>>8&255,e.pending_buf[e.pending++]=255&t}function z(e,t){var n,r,i=e.max_chain_length,a=e.strstart,o=e.prev_length,s=e.nice_match,c=e.strstart>e.w_size-T?e.strstart-(e.w_size-T):0,l=e.window,u=e.w_mask,d=e.prev,f=e.strstart+w,p=l[a+o-1],m=l[a+o];e.prev_length>=e.good_match&&(i>>=2),s>e.lookahead&&(s=e.lookahead);do if(l[(n=t)+o]===m&&l[n+o-1]===p&&l[n]===l[a]&&l[++n]===l[a+1]){a+=2,n++;do;while(l[++a]===l[++n]&&l[++a]===l[++n]&&l[++a]===l[++n]&&l[++a]===l[++n]&&l[++a]===l[++n]&&l[++a]===l[++n]&&l[++a]===l[++n]&&l[++a]===l[++n]&&a<f);if(r=w-(f-a),a=f-w,o<r){if(e.match_start=t,s<=(o=r))break;p=l[a+o-1],m=l[a+o]}}while((t=d[t&u])>c&&--i!=0);return o<=e.lookahead?o:e.lookahead}function B(e){var t,n,r,a,c,l,u,d,f,p,m=e.w_size;do{if(a=e.window_size-e.lookahead-e.strstart,e.strstart>=m+(m-T)){for(i.arraySet(e.window,e.window,m,m,0),e.match_start-=m,e.strstart-=m,e.block_start-=m,t=n=e.hash_size;r=e.head[--t],e.head[t]=m<=r?r-m:0,--n;);for(t=n=m;r=e.prev[--t],e.prev[t]=m<=r?r-m:0,--n;);a+=m}if(e.strm.avail_in===0)break;if(l=e.strm,u=e.window,d=e.strstart+e.lookahead,f=a,p=void 0,p=l.avail_in,f<p&&(p=f),n=p===0?0:(l.avail_in-=p,i.arraySet(u,l.input,l.next_in,p,d),l.state.wrap===1?l.adler=o(l.adler,u,p,d):l.state.wrap===2&&(l.adler=s(l.adler,u,p,d)),l.next_in+=p,l.total_in+=p,p),e.lookahead+=n,e.lookahead+e.insert>=C)for(c=e.strstart-e.insert,e.ins_h=e.window[c],e.ins_h=(e.ins_h<<e.hash_shift^e.window[c+1])&e.hash_mask;e.insert&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[c+C-1])&e.hash_mask,e.prev[c&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=c,c++,e.insert--,!(e.lookahead+e.insert<C)););}while(e.lookahead<T&&e.strm.avail_in!==0)}function V(e,t){for(var n,r;;){if(e.lookahead<T){if(B(e),e.lookahead<T&&t===l)return O;if(e.lookahead===0)break}if(n=0,e.lookahead>=C&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+C-1])&e.hash_mask,n=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),n!==0&&e.strstart-n<=e.w_size-T&&(e.match_length=z(e,n)),e.match_length>=C)if(r=a._tr_tally(e,e.strstart-e.match_start,e.match_length-C),e.lookahead-=e.match_length,e.match_length<=e.max_lazy_match&&e.lookahead>=C){for(e.match_length--;e.strstart++,e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+C-1])&e.hash_mask,n=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart,--e.match_length!=0;);e.strstart++}else e.strstart+=e.match_length,e.match_length=0,e.ins_h=e.window[e.strstart],e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+1])&e.hash_mask;else r=a._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++;if(r&&(I(e,!1),e.strm.avail_out===0))return O}return e.insert=e.strstart<C-1?e.strstart:C-1,t===u?(I(e,!0),e.strm.avail_out===0?A:j):e.last_lit&&(I(e,!1),e.strm.avail_out===0)?O:k}function H(e,t){for(var n,r,i;;){if(e.lookahead<T){if(B(e),e.lookahead<T&&t===l)return O;if(e.lookahead===0)break}if(n=0,e.lookahead>=C&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+C-1])&e.hash_mask,n=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),e.prev_length=e.match_length,e.prev_match=e.match_start,e.match_length=C-1,n!==0&&e.prev_length<e.max_lazy_match&&e.strstart-n<=e.w_size-T&&(e.match_length=z(e,n),e.match_length<=5&&(e.strategy===1||e.match_length===C&&4096<e.strstart-e.match_start)&&(e.match_length=C-1)),e.prev_length>=C&&e.match_length<=e.prev_length){for(i=e.strstart+e.lookahead-C,r=a._tr_tally(e,e.strstart-1-e.prev_match,e.prev_length-C),e.lookahead-=e.prev_length-1,e.prev_length-=2;++e.strstart<=i&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+C-1])&e.hash_mask,n=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),--e.prev_length!=0;);if(e.match_available=0,e.match_length=C-1,e.strstart++,r&&(I(e,!1),e.strm.avail_out===0))return O}else if(e.match_available){if((r=a._tr_tally(e,0,e.window[e.strstart-1]))&&I(e,!1),e.strstart++,e.lookahead--,e.strm.avail_out===0)return O}else e.match_available=1,e.strstart++,e.lookahead--}return e.match_available&&=(r=a._tr_tally(e,0,e.window[e.strstart-1]),0),e.insert=e.strstart<C-1?e.strstart:C-1,t===u?(I(e,!0),e.strm.avail_out===0?A:j):e.last_lit&&(I(e,!1),e.strm.avail_out===0)?O:k}function U(e,t,n,r,i){this.good_length=e,this.max_lazy=t,this.nice_length=n,this.max_chain=r,this.func=i}function W(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=g,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new i.Buf16(2*x),this.dyn_dtree=new i.Buf16(2*(2*y+1)),this.bl_tree=new i.Buf16(2*(2*b+1)),P(this.dyn_ltree),P(this.dyn_dtree),P(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new i.Buf16(S+1),this.heap=new i.Buf16(2*v+1),P(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new i.Buf16(2*v+1),P(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function G(e){var t;return e&&e.state?(e.total_in=e.total_out=0,e.data_type=h,(t=e.state).pending=0,t.pending_out=0,t.wrap<0&&(t.wrap=-t.wrap),t.status=t.wrap?E:D,e.adler=t.wrap===2?0:1,t.last_flush=l,a._tr_init(t),d):M(e,f)}function K(e){var t=G(e);return t===d&&function(e){e.window_size=2*e.w_size,P(e.head),e.max_lazy_match=r[e.level].max_lazy,e.good_match=r[e.level].good_length,e.nice_match=r[e.level].nice_length,e.max_chain_length=r[e.level].max_chain,e.strstart=0,e.block_start=0,e.lookahead=0,e.insert=0,e.match_length=e.prev_length=C-1,e.match_available=0,e.ins_h=0}(e.state),t}function q(e,t,n,r,a,o){if(!e)return f;var s=1;if(t===p&&(t=6),r<0?(s=0,r=-r):15<r&&(s=2,r-=16),a<1||_<a||n!==g||r<8||15<r||t<0||9<t||o<0||m<o)return M(e,f);r===8&&(r=9);var c=new W;return(e.state=c).strm=e,c.wrap=s,c.gzhead=null,c.w_bits=r,c.w_size=1<<c.w_bits,c.w_mask=c.w_size-1,c.hash_bits=a+7,c.hash_size=1<<c.hash_bits,c.hash_mask=c.hash_size-1,c.hash_shift=~~((c.hash_bits+C-1)/C),c.window=new i.Buf8(2*c.w_size),c.head=new i.Buf16(c.hash_size),c.prev=new i.Buf16(c.w_size),c.lit_bufsize=1<<a+6,c.pending_buf_size=4*c.lit_bufsize,c.pending_buf=new i.Buf8(c.pending_buf_size),c.d_buf=1*c.lit_bufsize,c.l_buf=3*c.lit_bufsize,c.level=t,c.strategy=o,c.method=n,K(e)}r=[new U(0,0,0,0,function(e,t){var n=65535;for(n>e.pending_buf_size-5&&(n=e.pending_buf_size-5);;){if(e.lookahead<=1){if(B(e),e.lookahead===0&&t===l)return O;if(e.lookahead===0)break}e.strstart+=e.lookahead,e.lookahead=0;var r=e.block_start+n;if((e.strstart===0||e.strstart>=r)&&(e.lookahead=e.strstart-r,e.strstart=r,I(e,!1),e.strm.avail_out===0)||e.strstart-e.block_start>=e.w_size-T&&(I(e,!1),e.strm.avail_out===0))return O}return e.insert=0,t===u?(I(e,!0),e.strm.avail_out===0?A:j):(e.strstart>e.block_start&&(I(e,!1),e.strm.avail_out),O)}),new U(4,4,8,4,V),new U(4,5,16,8,V),new U(4,6,32,32,V),new U(4,4,16,16,H),new U(8,16,32,32,H),new U(8,16,128,128,H),new U(8,32,128,256,H),new U(32,128,258,1024,H),new U(32,258,258,4096,H)],n.deflateInit=function(e,t){return q(e,t,g,15,8,0)},n.deflateInit2=q,n.deflateReset=K,n.deflateResetKeep=G,n.deflateSetHeader=function(e,t){return e&&e.state&&e.state.wrap===2?(e.state.gzhead=t,d):f},n.deflate=function(e,t){var n,i,o,c;if(!e||!e.state||5<t||t<0)return e?M(e,f):f;if(i=e.state,!e.output||!e.input&&e.avail_in!==0||i.status===666&&t!==u)return M(e,e.avail_out===0?-5:f);if(i.strm=e,n=i.last_flush,i.last_flush=t,i.status===E)if(i.wrap===2)e.adler=0,L(i,31),L(i,139),L(i,8),i.gzhead?(L(i,+!!i.gzhead.text+(i.gzhead.hcrc?2:0)+(i.gzhead.extra?4:0)+(i.gzhead.name?8:0)+(i.gzhead.comment?16:0)),L(i,255&i.gzhead.time),L(i,i.gzhead.time>>8&255),L(i,i.gzhead.time>>16&255),L(i,i.gzhead.time>>24&255),L(i,i.level===9?2:2<=i.strategy||i.level<2?4:0),L(i,255&i.gzhead.os),i.gzhead.extra&&i.gzhead.extra.length&&(L(i,255&i.gzhead.extra.length),L(i,i.gzhead.extra.length>>8&255)),i.gzhead.hcrc&&(e.adler=s(e.adler,i.pending_buf,i.pending,0)),i.gzindex=0,i.status=69):(L(i,0),L(i,0),L(i,0),L(i,0),L(i,0),L(i,i.level===9?2:2<=i.strategy||i.level<2?4:0),L(i,3),i.status=D);else{var p=g+(i.w_bits-8<<4)<<8;p|=(2<=i.strategy||i.level<2?0:i.level<6?1:i.level===6?2:3)<<6,i.strstart!==0&&(p|=32),p+=31-p%31,i.status=D,R(i,p),i.strstart!==0&&(R(i,e.adler>>>16),R(i,65535&e.adler)),e.adler=1}if(i.status===69)if(i.gzhead.extra){for(o=i.pending;i.gzindex<(65535&i.gzhead.extra.length)&&(i.pending!==i.pending_buf_size||(i.gzhead.hcrc&&i.pending>o&&(e.adler=s(e.adler,i.pending_buf,i.pending-o,o)),F(e),o=i.pending,i.pending!==i.pending_buf_size));)L(i,255&i.gzhead.extra[i.gzindex]),i.gzindex++;i.gzhead.hcrc&&i.pending>o&&(e.adler=s(e.adler,i.pending_buf,i.pending-o,o)),i.gzindex===i.gzhead.extra.length&&(i.gzindex=0,i.status=73)}else i.status=73;if(i.status===73)if(i.gzhead.name){o=i.pending;do{if(i.pending===i.pending_buf_size&&(i.gzhead.hcrc&&i.pending>o&&(e.adler=s(e.adler,i.pending_buf,i.pending-o,o)),F(e),o=i.pending,i.pending===i.pending_buf_size)){c=1;break}c=i.gzindex<i.gzhead.name.length?255&i.gzhead.name.charCodeAt(i.gzindex++):0,L(i,c)}while(c!==0);i.gzhead.hcrc&&i.pending>o&&(e.adler=s(e.adler,i.pending_buf,i.pending-o,o)),c===0&&(i.gzindex=0,i.status=91)}else i.status=91;if(i.status===91)if(i.gzhead.comment){o=i.pending;do{if(i.pending===i.pending_buf_size&&(i.gzhead.hcrc&&i.pending>o&&(e.adler=s(e.adler,i.pending_buf,i.pending-o,o)),F(e),o=i.pending,i.pending===i.pending_buf_size)){c=1;break}c=i.gzindex<i.gzhead.comment.length?255&i.gzhead.comment.charCodeAt(i.gzindex++):0,L(i,c)}while(c!==0);i.gzhead.hcrc&&i.pending>o&&(e.adler=s(e.adler,i.pending_buf,i.pending-o,o)),c===0&&(i.status=103)}else i.status=103;if(i.status===103&&(i.gzhead.hcrc?(i.pending+2>i.pending_buf_size&&F(e),i.pending+2<=i.pending_buf_size&&(L(i,255&e.adler),L(i,e.adler>>8&255),e.adler=0,i.status=D)):i.status=D),i.pending!==0){if(F(e),e.avail_out===0)return i.last_flush=-1,d}else if(e.avail_in===0&&N(t)<=N(n)&&t!==u)return M(e,-5);if(i.status===666&&e.avail_in!==0)return M(e,-5);if(e.avail_in!==0||i.lookahead!==0||t!==l&&i.status!==666){var m=i.strategy===2?function(e,t){for(var n;;){if(e.lookahead===0&&(B(e),e.lookahead===0)){if(t===l)return O;break}if(e.match_length=0,n=a._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++,n&&(I(e,!1),e.strm.avail_out===0))return O}return e.insert=0,t===u?(I(e,!0),e.strm.avail_out===0?A:j):e.last_lit&&(I(e,!1),e.strm.avail_out===0)?O:k}(i,t):i.strategy===3?function(e,t){for(var n,r,i,o,s=e.window;;){if(e.lookahead<=w){if(B(e),e.lookahead<=w&&t===l)return O;if(e.lookahead===0)break}if(e.match_length=0,e.lookahead>=C&&0<e.strstart&&(r=s[i=e.strstart-1])===s[++i]&&r===s[++i]&&r===s[++i]){o=e.strstart+w;do;while(r===s[++i]&&r===s[++i]&&r===s[++i]&&r===s[++i]&&r===s[++i]&&r===s[++i]&&r===s[++i]&&r===s[++i]&&i<o);e.match_length=w-(o-i),e.match_length>e.lookahead&&(e.match_length=e.lookahead)}if(e.match_length>=C?(n=a._tr_tally(e,1,e.match_length-C),e.lookahead-=e.match_length,e.strstart+=e.match_length,e.match_length=0):(n=a._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++),n&&(I(e,!1),e.strm.avail_out===0))return O}return e.insert=0,t===u?(I(e,!0),e.strm.avail_out===0?A:j):e.last_lit&&(I(e,!1),e.strm.avail_out===0)?O:k}(i,t):r[i.level].func(i,t);if(m!==A&&m!==j||(i.status=666),m===O||m===A)return e.avail_out===0&&(i.last_flush=-1),d;if(m===k&&(t===1?a._tr_align(i):t!==5&&(a._tr_stored_block(i,0,0,!1),t===3&&(P(i.head),i.lookahead===0&&(i.strstart=0,i.block_start=0,i.insert=0))),F(e),e.avail_out===0))return i.last_flush=-1,d}return t===u?i.wrap<=0?1:(i.wrap===2?(L(i,255&e.adler),L(i,e.adler>>8&255),L(i,e.adler>>16&255),L(i,e.adler>>24&255),L(i,255&e.total_in),L(i,e.total_in>>8&255),L(i,e.total_in>>16&255),L(i,e.total_in>>24&255)):(R(i,e.adler>>>16),R(i,65535&e.adler)),F(e),0<i.wrap&&(i.wrap=-i.wrap),i.pending===0?1:d):d},n.deflateEnd=function(e){var t;return e&&e.state?(t=e.state.status)!==E&&t!==69&&t!==73&&t!==91&&t!==103&&t!==D&&t!==666?M(e,f):(e.state=null,t===D?M(e,-3):d):f},n.deflateSetDictionary=function(e,t){var n,r,a,s,c,l,u,p,m=t.length;if(!e||!e.state||(s=(n=e.state).wrap)===2||s===1&&n.status!==E||n.lookahead)return f;for(s===1&&(e.adler=o(e.adler,t,m,0)),n.wrap=0,m>=n.w_size&&(s===0&&(P(n.head),n.strstart=0,n.block_start=0,n.insert=0),p=new i.Buf8(n.w_size),i.arraySet(p,t,m-n.w_size,n.w_size,0),t=p,m=n.w_size),c=e.avail_in,l=e.next_in,u=e.input,e.avail_in=m,e.next_in=0,e.input=t,B(n);n.lookahead>=C;){for(r=n.strstart,a=n.lookahead-(C-1);n.ins_h=(n.ins_h<<n.hash_shift^n.window[r+C-1])&n.hash_mask,n.prev[r&n.w_mask]=n.head[n.ins_h],n.head[n.ins_h]=r,r++,--a;);n.strstart=r,n.lookahead=C-1,B(n)}return n.strstart+=n.lookahead,n.block_start=n.strstart,n.insert=n.lookahead,n.lookahead=0,n.match_length=n.prev_length=C-1,n.match_available=0,e.next_in=l,e.input=u,e.avail_in=c,n.wrap=s,d},n.deflateInfo=`pako deflate (from Nodeca project)`},{\"../utils/common\":41,\"./adler32\":43,\"./crc32\":45,\"./messages\":51,\"./trees\":52}],47:[function(e,t,n){\"use strict\";t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name=``,this.comment=``,this.hcrc=0,this.done=!1}},{}],48:[function(e,t,n){\"use strict\";t.exports=function(e,t){var n=e.state,r=e.next_in,i,a,o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T=e.input,E;i=r+(e.avail_in-5),a=e.next_out,E=e.output,o=a-(t-e.avail_out),s=a+(e.avail_out-257),c=n.dmax,l=n.wsize,u=n.whave,d=n.wnext,f=n.window,p=n.hold,m=n.bits,h=n.lencode,g=n.distcode,_=(1<<n.lenbits)-1,v=(1<<n.distbits)-1;e:do{m<15&&(p+=T[r++]<<m,m+=8,p+=T[r++]<<m,m+=8),y=h[p&_];t:for(;;){if(p>>>=b=y>>>24,m-=b,(b=y>>>16&255)==0)E[a++]=65535&y;else{if(!(16&b)){if(!(64&b)){y=h[(65535&y)+(p&(1<<b)-1)];continue t}if(32&b){n.mode=12;break e}e.msg=`invalid literal/length code`,n.mode=30;break e}x=65535&y,(b&=15)&&(m<b&&(p+=T[r++]<<m,m+=8),x+=p&(1<<b)-1,p>>>=b,m-=b),m<15&&(p+=T[r++]<<m,m+=8,p+=T[r++]<<m,m+=8),y=g[p&v];r:for(;;){if(p>>>=b=y>>>24,m-=b,!(16&(b=y>>>16&255))){if(!(64&b)){y=g[(65535&y)+(p&(1<<b)-1)];continue r}e.msg=`invalid distance code`,n.mode=30;break e}if(S=65535&y,m<(b&=15)&&(p+=T[r++]<<m,(m+=8)<b&&(p+=T[r++]<<m,m+=8)),c<(S+=p&(1<<b)-1)){e.msg=`invalid distance too far back`,n.mode=30;break e}if(p>>>=b,m-=b,(b=a-o)<S){if(u<(b=S-b)&&n.sane){e.msg=`invalid distance too far back`,n.mode=30;break e}if(w=f,(C=0)===d){if(C+=l-b,b<x){for(x-=b;E[a++]=f[C++],--b;);C=a-S,w=E}}else if(d<b){if(C+=l+d-b,(b-=d)<x){for(x-=b;E[a++]=f[C++],--b;);if(C=0,d<x){for(x-=b=d;E[a++]=f[C++],--b;);C=a-S,w=E}}}else if(C+=d-b,b<x){for(x-=b;E[a++]=f[C++],--b;);C=a-S,w=E}for(;2<x;)E[a++]=w[C++],E[a++]=w[C++],E[a++]=w[C++],x-=3;x&&(E[a++]=w[C++],1<x&&(E[a++]=w[C++]))}else{for(C=a-S;E[a++]=E[C++],E[a++]=E[C++],E[a++]=E[C++],2<(x-=3););x&&(E[a++]=E[C++],1<x&&(E[a++]=E[C++]))}break}}break}}while(r<i&&a<s);r-=x=m>>3,p&=(1<<(m-=x<<3))-1,e.next_in=r,e.next_out=a,e.avail_in=r<i?i-r+5:5-(r-i),e.avail_out=a<s?s-a+257:257-(a-s),n.hold=p,n.bits=m}},{}],49:[function(e,t,n){\"use strict\";var r=e(`../utils/common`),i=e(`./adler32`),a=e(`./crc32`),o=e(`./inffast`),s=e(`./inftrees`),c=1,l=2,u=0,d=-2,f=1,p=852,m=592;function h(e){return(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function g(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new r.Buf16(320),this.work=new r.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function _(e){var t;return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg=``,t.wrap&&(e.adler=1&t.wrap),t.mode=f,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new r.Buf32(p),t.distcode=t.distdyn=new r.Buf32(m),t.sane=1,t.back=-1,u):d}function v(e){var t;return e&&e.state?((t=e.state).wsize=0,t.whave=0,t.wnext=0,_(e)):d}function y(e,t){var n,r;return e&&e.state?(r=e.state,t<0?(n=0,t=-t):(n=1+(t>>4),t<48&&(t&=15)),t&&(t<8||15<t)?d:(r.window!==null&&r.wbits!==t&&(r.window=null),r.wrap=n,r.wbits=t,v(e))):d}function b(e,t){var n,r;return e?(r=new g,(e.state=r).window=null,(n=y(e,t))!==u&&(e.state=null),n):d}var x,S,C=!0;function w(e){if(C){var t;for(x=new r.Buf32(512),S=new r.Buf32(32),t=0;t<144;)e.lens[t++]=8;for(;t<256;)e.lens[t++]=9;for(;t<280;)e.lens[t++]=7;for(;t<288;)e.lens[t++]=8;for(s(c,e.lens,0,288,x,0,e.work,{bits:9}),t=0;t<32;)e.lens[t++]=5;s(l,e.lens,0,32,S,0,e.work,{bits:5}),C=!1}e.lencode=x,e.lenbits=9,e.distcode=S,e.distbits=5}function T(e,t,n,i){var a,o=e.state;return o.window===null&&(o.wsize=1<<o.wbits,o.wnext=0,o.whave=0,o.window=new r.Buf8(o.wsize)),i>=o.wsize?(r.arraySet(o.window,t,n-o.wsize,o.wsize,0),o.wnext=0,o.whave=o.wsize):(i<(a=o.wsize-o.wnext)&&(a=i),r.arraySet(o.window,t,n-i,a,o.wnext),(i-=a)?(r.arraySet(o.window,t,n-i,i,0),o.wnext=i,o.whave=o.wsize):(o.wnext+=a,o.wnext===o.wsize&&(o.wnext=0),o.whave<o.wsize&&(o.whave+=a))),0}n.inflateReset=v,n.inflateReset2=y,n.inflateResetKeep=_,n.inflateInit=function(e){return b(e,15)},n.inflateInit2=b,n.inflate=function(e,t){var n,p,m,g,_,v,y,b,x,S,C,E,D,O,k,A,j,M,N,P,F,I,L,R,z=0,B=new r.Buf8(4),V=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&e.avail_in!==0)return d;(n=e.state).mode===12&&(n.mode=13),_=e.next_out,m=e.output,y=e.avail_out,g=e.next_in,p=e.input,v=e.avail_in,b=n.hold,x=n.bits,S=v,C=y,I=u;e:for(;;)switch(n.mode){case f:if(n.wrap===0){n.mode=13;break}for(;x<16;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}if(2&n.wrap&&b===35615){B[n.check=0]=255&b,B[1]=b>>>8&255,n.check=a(n.check,B,2,0),x=b=0,n.mode=2;break}if(n.flags=0,n.head&&(n.head.done=!1),!(1&n.wrap)||(((255&b)<<8)+(b>>8))%31){e.msg=`incorrect header check`,n.mode=30;break}if((15&b)!=8){e.msg=`unknown compression method`,n.mode=30;break}if(x-=4,F=8+(15&(b>>>=4)),n.wbits===0)n.wbits=F;else if(F>n.wbits){e.msg=`invalid window size`,n.mode=30;break}n.dmax=1<<F,e.adler=n.check=1,n.mode=512&b?10:12,x=b=0;break;case 2:for(;x<16;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}if(n.flags=b,(255&n.flags)!=8){e.msg=`unknown compression method`,n.mode=30;break}if(57344&n.flags){e.msg=`unknown header flags set`,n.mode=30;break}n.head&&(n.head.text=b>>8&1),512&n.flags&&(B[0]=255&b,B[1]=b>>>8&255,n.check=a(n.check,B,2,0)),x=b=0,n.mode=3;case 3:for(;x<32;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}n.head&&(n.head.time=b),512&n.flags&&(B[0]=255&b,B[1]=b>>>8&255,B[2]=b>>>16&255,B[3]=b>>>24&255,n.check=a(n.check,B,4,0)),x=b=0,n.mode=4;case 4:for(;x<16;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}n.head&&(n.head.xflags=255&b,n.head.os=b>>8),512&n.flags&&(B[0]=255&b,B[1]=b>>>8&255,n.check=a(n.check,B,2,0)),x=b=0,n.mode=5;case 5:if(1024&n.flags){for(;x<16;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}n.length=b,n.head&&(n.head.extra_len=b),512&n.flags&&(B[0]=255&b,B[1]=b>>>8&255,n.check=a(n.check,B,2,0)),x=b=0}else n.head&&(n.head.extra=null);n.mode=6;case 6:if(1024&n.flags&&(v<(E=n.length)&&(E=v),E&&(n.head&&(F=n.head.extra_len-n.length,n.head.extra||(n.head.extra=Array(n.head.extra_len)),r.arraySet(n.head.extra,p,g,E,F)),512&n.flags&&(n.check=a(n.check,p,E,g)),v-=E,g+=E,n.length-=E),n.length))break e;n.length=0,n.mode=7;case 7:if(2048&n.flags){if(v===0)break e;for(E=0;F=p[g+E++],n.head&&F&&n.length<65536&&(n.head.name+=String.fromCharCode(F)),F&&E<v;);if(512&n.flags&&(n.check=a(n.check,p,E,g)),v-=E,g+=E,F)break e}else n.head&&(n.head.name=null);n.length=0,n.mode=8;case 8:if(4096&n.flags){if(v===0)break e;for(E=0;F=p[g+E++],n.head&&F&&n.length<65536&&(n.head.comment+=String.fromCharCode(F)),F&&E<v;);if(512&n.flags&&(n.check=a(n.check,p,E,g)),v-=E,g+=E,F)break e}else n.head&&(n.head.comment=null);n.mode=9;case 9:if(512&n.flags){for(;x<16;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}if(b!==(65535&n.check)){e.msg=`header crc mismatch`,n.mode=30;break}x=b=0}n.head&&(n.head.hcrc=n.flags>>9&1,n.head.done=!0),e.adler=n.check=0,n.mode=12;break;case 10:for(;x<32;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}e.adler=n.check=h(b),x=b=0,n.mode=11;case 11:if(n.havedict===0)return e.next_out=_,e.avail_out=y,e.next_in=g,e.avail_in=v,n.hold=b,n.bits=x,2;e.adler=n.check=1,n.mode=12;case 12:if(t===5||t===6)break e;case 13:if(n.last){b>>>=7&x,x-=7&x,n.mode=27;break}for(;x<3;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}switch(n.last=1&b,--x,3&(b>>>=1)){case 0:n.mode=14;break;case 1:if(w(n),n.mode=20,t!==6)break;b>>>=2,x-=2;break e;case 2:n.mode=17;break;case 3:e.msg=`invalid block type`,n.mode=30}b>>>=2,x-=2;break;case 14:for(b>>>=7&x,x-=7&x;x<32;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}if((65535&b)!=(b>>>16^65535)){e.msg=`invalid stored block lengths`,n.mode=30;break}if(n.length=65535&b,x=b=0,n.mode=15,t===6)break e;case 15:n.mode=16;case 16:if(E=n.length){if(v<E&&(E=v),y<E&&(E=y),E===0)break e;r.arraySet(m,p,g,E,_),v-=E,g+=E,y-=E,_+=E,n.length-=E;break}n.mode=12;break;case 17:for(;x<14;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}if(n.nlen=257+(31&b),b>>>=5,x-=5,n.ndist=1+(31&b),b>>>=5,x-=5,n.ncode=4+(15&b),b>>>=4,x-=4,286<n.nlen||30<n.ndist){e.msg=`too many length or distance symbols`,n.mode=30;break}n.have=0,n.mode=18;case 18:for(;n.have<n.ncode;){for(;x<3;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}n.lens[V[n.have++]]=7&b,b>>>=3,x-=3}for(;n.have<19;)n.lens[V[n.have++]]=0;if(n.lencode=n.lendyn,n.lenbits=7,L={bits:n.lenbits},I=s(0,n.lens,0,19,n.lencode,0,n.work,L),n.lenbits=L.bits,I){e.msg=`invalid code lengths set`,n.mode=30;break}n.have=0,n.mode=19;case 19:for(;n.have<n.nlen+n.ndist;){for(;A=(z=n.lencode[b&(1<<n.lenbits)-1])>>>16&255,j=65535&z,!((k=z>>>24)<=x);){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}if(j<16)b>>>=k,x-=k,n.lens[n.have++]=j;else{if(j===16){for(R=k+2;x<R;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}if(b>>>=k,x-=k,n.have===0){e.msg=`invalid bit length repeat`,n.mode=30;break}F=n.lens[n.have-1],E=3+(3&b),b>>>=2,x-=2}else if(j===17){for(R=k+3;x<R;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}x-=k,F=0,E=3+(7&(b>>>=k)),b>>>=3,x-=3}else{for(R=k+7;x<R;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}x-=k,F=0,E=11+(127&(b>>>=k)),b>>>=7,x-=7}if(n.have+E>n.nlen+n.ndist){e.msg=`invalid bit length repeat`,n.mode=30;break}for(;E--;)n.lens[n.have++]=F}}if(n.mode===30)break;if(n.lens[256]===0){e.msg=`invalid code -- missing end-of-block`,n.mode=30;break}if(n.lenbits=9,L={bits:n.lenbits},I=s(c,n.lens,0,n.nlen,n.lencode,0,n.work,L),n.lenbits=L.bits,I){e.msg=`invalid literal/lengths set`,n.mode=30;break}if(n.distbits=6,n.distcode=n.distdyn,L={bits:n.distbits},I=s(l,n.lens,n.nlen,n.ndist,n.distcode,0,n.work,L),n.distbits=L.bits,I){e.msg=`invalid distances set`,n.mode=30;break}if(n.mode=20,t===6)break e;case 20:n.mode=21;case 21:if(6<=v&&258<=y){e.next_out=_,e.avail_out=y,e.next_in=g,e.avail_in=v,n.hold=b,n.bits=x,o(e,C),_=e.next_out,m=e.output,y=e.avail_out,g=e.next_in,p=e.input,v=e.avail_in,b=n.hold,x=n.bits,n.mode===12&&(n.back=-1);break}for(n.back=0;A=(z=n.lencode[b&(1<<n.lenbits)-1])>>>16&255,j=65535&z,!((k=z>>>24)<=x);){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}if(A&&!(240&A)){for(M=k,N=A,P=j;A=(z=n.lencode[P+((b&(1<<M+N)-1)>>M)])>>>16&255,j=65535&z,!(M+(k=z>>>24)<=x);){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}b>>>=M,x-=M,n.back+=M}if(b>>>=k,x-=k,n.back+=k,n.length=j,A===0){n.mode=26;break}if(32&A){n.back=-1,n.mode=12;break}if(64&A){e.msg=`invalid literal/length code`,n.mode=30;break}n.extra=15&A,n.mode=22;case 22:if(n.extra){for(R=n.extra;x<R;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}n.length+=b&(1<<n.extra)-1,b>>>=n.extra,x-=n.extra,n.back+=n.extra}n.was=n.length,n.mode=23;case 23:for(;A=(z=n.distcode[b&(1<<n.distbits)-1])>>>16&255,j=65535&z,!((k=z>>>24)<=x);){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}if(!(240&A)){for(M=k,N=A,P=j;A=(z=n.distcode[P+((b&(1<<M+N)-1)>>M)])>>>16&255,j=65535&z,!(M+(k=z>>>24)<=x);){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}b>>>=M,x-=M,n.back+=M}if(b>>>=k,x-=k,n.back+=k,64&A){e.msg=`invalid distance code`,n.mode=30;break}n.offset=j,n.extra=15&A,n.mode=24;case 24:if(n.extra){for(R=n.extra;x<R;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}n.offset+=b&(1<<n.extra)-1,b>>>=n.extra,x-=n.extra,n.back+=n.extra}if(n.offset>n.dmax){e.msg=`invalid distance too far back`,n.mode=30;break}n.mode=25;case 25:if(y===0)break e;if(E=C-y,n.offset>E){if((E=n.offset-E)>n.whave&&n.sane){e.msg=`invalid distance too far back`,n.mode=30;break}D=E>n.wnext?(E-=n.wnext,n.wsize-E):n.wnext-E,E>n.length&&(E=n.length),O=n.window}else O=m,D=_-n.offset,E=n.length;for(y<E&&(E=y),y-=E,n.length-=E;m[_++]=O[D++],--E;);n.length===0&&(n.mode=21);break;case 26:if(y===0)break e;m[_++]=n.length,y--,n.mode=21;break;case 27:if(n.wrap){for(;x<32;){if(v===0)break e;v--,b|=p[g++]<<x,x+=8}if(C-=y,e.total_out+=C,n.total+=C,C&&(e.adler=n.check=n.flags?a(n.check,m,C,_-C):i(n.check,m,C,_-C)),C=y,(n.flags?b:h(b))!==n.check){e.msg=`incorrect data check`,n.mode=30;break}x=b=0}n.mode=28;case 28:if(n.wrap&&n.flags){for(;x<32;){if(v===0)break e;v--,b+=p[g++]<<x,x+=8}if(b!==(4294967295&n.total)){e.msg=`incorrect length check`,n.mode=30;break}x=b=0}n.mode=29;case 29:I=1;break e;case 30:I=-3;break e;case 31:return-4;case 32:default:return d}return e.next_out=_,e.avail_out=y,e.next_in=g,e.avail_in=v,n.hold=b,n.bits=x,(n.wsize||C!==e.avail_out&&n.mode<30&&(n.mode<27||t!==4))&&T(e,e.output,e.next_out,C-e.avail_out)?(n.mode=31,-4):(S-=e.avail_in,C-=e.avail_out,e.total_in+=S,e.total_out+=C,n.total+=C,n.wrap&&C&&(e.adler=n.check=n.flags?a(n.check,m,C,e.next_out-C):i(n.check,m,C,e.next_out-C)),e.data_type=n.bits+(n.last?64:0)+(n.mode===12?128:0)+(n.mode===20||n.mode===15?256:0),(S==0&&C===0||t===4)&&I===u&&(I=-5),I)},n.inflateEnd=function(e){if(!e||!e.state)return d;var t=e.state;return t.window&&=null,e.state=null,u},n.inflateGetHeader=function(e,t){var n;return e&&e.state&&2&(n=e.state).wrap?((n.head=t).done=!1,u):d},n.inflateSetDictionary=function(e,t){var n,r=t.length;return e&&e.state?(n=e.state).wrap!==0&&n.mode!==11?d:n.mode===11&&i(1,t,r,0)!==n.check?-3:T(e,t,r,r)?(n.mode=31,-4):(n.havedict=1,u):d},n.inflateInfo=`pako inflate (from Nodeca project)`},{\"../utils/common\":41,\"./adler32\":43,\"./crc32\":45,\"./inffast\":48,\"./inftrees\":50}],50:[function(e,t,n){\"use strict\";var r=e(`../utils/common`),i=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],a=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],o=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],s=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(e,t,n,c,l,u,d,f){var p,m,h,g,_,v,y,b,x,S=f.bits,C=0,w=0,T=0,E=0,D=0,O=0,k=0,A=0,j=0,M=0,N=null,P=0,F=new r.Buf16(16),I=new r.Buf16(16),L=null,R=0;for(C=0;C<=15;C++)F[C]=0;for(w=0;w<c;w++)F[t[n+w]]++;for(D=S,E=15;1<=E&&F[E]===0;E--);if(E<D&&(D=E),E===0)return l[u++]=20971520,l[u++]=20971520,f.bits=1,0;for(T=1;T<E&&F[T]===0;T++);for(D<T&&(D=T),C=A=1;C<=15;C++)if(A<<=1,(A-=F[C])<0)return-1;if(0<A&&(e===0||E!==1))return-1;for(I[1]=0,C=1;C<15;C++)I[C+1]=I[C]+F[C];for(w=0;w<c;w++)t[n+w]!==0&&(d[I[t[n+w]]++]=w);if(v=e===0?(N=L=d,19):e===1?(N=i,P-=257,L=a,R-=257,256):(N=o,L=s,-1),C=T,_=u,k=w=M=0,h=-1,g=(j=1<<(O=D))-1,e===1&&852<j||e===2&&592<j)return 1;for(;;){for(y=C-k,x=d[w]<v?(b=0,d[w]):d[w]>v?(b=L[R+d[w]],N[P+d[w]]):(b=96,0),p=1<<C-k,T=m=1<<O;l[_+(M>>k)+(m-=p)]=y<<24|b<<16|x|0,m!==0;);for(p=1<<C-1;M&p;)p>>=1;if(p===0?M=0:(M&=p-1,M+=p),w++,--F[C]==0){if(C===E)break;C=t[n+d[w]]}if(D<C&&(M&g)!==h){for(k===0&&(k=D),_+=T,A=1<<(O=C-k);O+k<E&&!((A-=F[O+k])<=0);)O++,A<<=1;if(j+=1<<O,e===1&&852<j||e===2&&592<j)return 1;l[h=M&g]=D<<24|O<<16|_-u|0}}return M!==0&&(l[_+M]=C-k<<24|4194304),f.bits=D,0}},{\"../utils/common\":41}],51:[function(e,t,n){\"use strict\";t.exports={2:`need dictionary`,1:`stream end`,0:``,\"-1\":`file error`,\"-2\":`stream error`,\"-3\":`data error`,\"-4\":`insufficient memory`,\"-5\":`buffer error`,\"-6\":`incompatible version`}},{}],52:[function(e,t,n){\"use strict\";var r=e(`../utils/common`),i=0,a=1;function o(e){for(var t=e.length;0<=--t;)e[t]=0}var s=0,c=29,l=256,u=l+1+c,d=30,f=19,p=2*u+1,m=15,h=16,g=7,_=256,v=16,y=17,b=18,x=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],S=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],C=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],w=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],T=Array(2*(u+2));o(T);var E=Array(2*d);o(E);var D=Array(512);o(D);var O=Array(256);o(O);var k=Array(c);o(k);var A,j,M,N=Array(d);function P(e,t,n,r,i){this.static_tree=e,this.extra_bits=t,this.extra_base=n,this.elems=r,this.max_length=i,this.has_stree=e&&e.length}function F(e,t){this.dyn_tree=e,this.max_code=0,this.stat_desc=t}function I(e){return e<256?D[e]:D[256+(e>>>7)]}function L(e,t){e.pending_buf[e.pending++]=255&t,e.pending_buf[e.pending++]=t>>>8&255}function R(e,t,n){e.bi_valid>h-n?(e.bi_buf|=t<<e.bi_valid&65535,L(e,e.bi_buf),e.bi_buf=t>>h-e.bi_valid,e.bi_valid+=n-h):(e.bi_buf|=t<<e.bi_valid&65535,e.bi_valid+=n)}function z(e,t,n){R(e,n[2*t],n[2*t+1])}function B(e,t){for(var n=0;n|=1&e,e>>>=1,n<<=1,0<--t;);return n>>>1}function V(e,t,n){var r,i,a=Array(m+1),o=0;for(r=1;r<=m;r++)a[r]=o=o+n[r-1]<<1;for(i=0;i<=t;i++){var s=e[2*i+1];s!==0&&(e[2*i]=B(a[s]++,s))}}function H(e){var t;for(t=0;t<u;t++)e.dyn_ltree[2*t]=0;for(t=0;t<d;t++)e.dyn_dtree[2*t]=0;for(t=0;t<f;t++)e.bl_tree[2*t]=0;e.dyn_ltree[2*_]=1,e.opt_len=e.static_len=0,e.last_lit=e.matches=0}function U(e){8<e.bi_valid?L(e,e.bi_buf):0<e.bi_valid&&(e.pending_buf[e.pending++]=e.bi_buf),e.bi_buf=0,e.bi_valid=0}function W(e,t,n,r){var i=2*t,a=2*n;return e[i]<e[a]||e[i]===e[a]&&r[t]<=r[n]}function G(e,t,n){for(var r=e.heap[n],i=n<<1;i<=e.heap_len&&(i<e.heap_len&&W(t,e.heap[i+1],e.heap[i],e.depth)&&i++,!W(t,r,e.heap[i],e.depth));)e.heap[n]=e.heap[i],n=i,i<<=1;e.heap[n]=r}function K(e,t,n){var r,i,a,o,s=0;if(e.last_lit!==0)for(;r=e.pending_buf[e.d_buf+2*s]<<8|e.pending_buf[e.d_buf+2*s+1],i=e.pending_buf[e.l_buf+s],s++,r===0?z(e,i,t):(z(e,(a=O[i])+l+1,t),(o=x[a])!==0&&R(e,i-=k[a],o),z(e,a=I(--r),n),(o=S[a])!==0&&R(e,r-=N[a],o)),s<e.last_lit;);z(e,_,t)}function q(e,t){var n,r,i,a=t.dyn_tree,o=t.stat_desc.static_tree,s=t.stat_desc.has_stree,c=t.stat_desc.elems,l=-1;for(e.heap_len=0,e.heap_max=p,n=0;n<c;n++)a[2*n]===0?a[2*n+1]=0:(e.heap[++e.heap_len]=l=n,e.depth[n]=0);for(;e.heap_len<2;)a[2*(i=e.heap[++e.heap_len]=l<2?++l:0)]=1,e.depth[i]=0,e.opt_len--,s&&(e.static_len-=o[2*i+1]);for(t.max_code=l,n=e.heap_len>>1;1<=n;n--)G(e,a,n);for(i=c;n=e.heap[1],e.heap[1]=e.heap[e.heap_len--],G(e,a,1),r=e.heap[1],e.heap[--e.heap_max]=n,e.heap[--e.heap_max]=r,a[2*i]=a[2*n]+a[2*r],e.depth[i]=(e.depth[n]>=e.depth[r]?e.depth[n]:e.depth[r])+1,a[2*n+1]=a[2*r+1]=i,e.heap[1]=i++,G(e,a,1),2<=e.heap_len;);e.heap[--e.heap_max]=e.heap[1],function(e,t){var n,r,i,a,o,s,c=t.dyn_tree,l=t.max_code,u=t.stat_desc.static_tree,d=t.stat_desc.has_stree,f=t.stat_desc.extra_bits,h=t.stat_desc.extra_base,g=t.stat_desc.max_length,_=0;for(a=0;a<=m;a++)e.bl_count[a]=0;for(c[2*e.heap[e.heap_max]+1]=0,n=e.heap_max+1;n<p;n++)g<(a=c[2*c[2*(r=e.heap[n])+1]+1]+1)&&(a=g,_++),c[2*r+1]=a,l<r||(e.bl_count[a]++,o=0,h<=r&&(o=f[r-h]),s=c[2*r],e.opt_len+=s*(a+o),d&&(e.static_len+=s*(u[2*r+1]+o)));if(_!==0){do{for(a=g-1;e.bl_count[a]===0;)a--;e.bl_count[a]--,e.bl_count[a+1]+=2,e.bl_count[g]--,_-=2}while(0<_);for(a=g;a!==0;a--)for(r=e.bl_count[a];r!==0;)l<(i=e.heap[--n])||(c[2*i+1]!==a&&(e.opt_len+=(a-c[2*i+1])*c[2*i],c[2*i+1]=a),r--)}}(e,t),V(a,l,e.bl_count)}function J(e,t,n){var r,i,a=-1,o=t[1],s=0,c=7,l=4;for(o===0&&(c=138,l=3),t[2*(n+1)+1]=65535,r=0;r<=n;r++)i=o,o=t[2*(r+1)+1],++s<c&&i===o||(s<l?e.bl_tree[2*i]+=s:i===0?s<=10?e.bl_tree[2*y]++:e.bl_tree[2*b]++:(i!==a&&e.bl_tree[2*i]++,e.bl_tree[2*v]++),a=i,l=(s=0)===o?(c=138,3):i===o?(c=6,3):(c=7,4))}function Y(e,t,n){var r,i,a=-1,o=t[1],s=0,c=7,l=4;for(o===0&&(c=138,l=3),r=0;r<=n;r++)if(i=o,o=t[2*(r+1)+1],!(++s<c&&i===o)){if(s<l)for(;z(e,i,e.bl_tree),--s!=0;);else i===0?s<=10?(z(e,y,e.bl_tree),R(e,s-3,3)):(z(e,b,e.bl_tree),R(e,s-11,7)):(i!==a&&(z(e,i,e.bl_tree),s--),z(e,v,e.bl_tree),R(e,s-3,2));a=i,l=(s=0)===o?(c=138,3):i===o?(c=6,3):(c=7,4)}}o(N);var X=!1;function Z(e,t,n,i){R(e,(s<<1)+ +!!i,3),function(e,t,n,i){U(e),i&&(L(e,n),L(e,~n)),r.arraySet(e.pending_buf,e.window,t,n,e.pending),e.pending+=n}(e,t,n,!0)}n._tr_init=function(e){X||=(function(){var e,t,n,r,i,a=Array(m+1);for(r=n=0;r<c-1;r++)for(k[r]=n,e=0;e<1<<x[r];e++)O[n++]=r;for(O[n-1]=r,r=i=0;r<16;r++)for(N[r]=i,e=0;e<1<<S[r];e++)D[i++]=r;for(i>>=7;r<d;r++)for(N[r]=i<<7,e=0;e<1<<S[r]-7;e++)D[256+i++]=r;for(t=0;t<=m;t++)a[t]=0;for(e=0;e<=143;)T[2*e+1]=8,e++,a[8]++;for(;e<=255;)T[2*e+1]=9,e++,a[9]++;for(;e<=279;)T[2*e+1]=7,e++,a[7]++;for(;e<=287;)T[2*e+1]=8,e++,a[8]++;for(V(T,u+1,a),e=0;e<d;e++)E[2*e+1]=5,E[2*e]=B(e,5);A=new P(T,x,l+1,u,m),j=new P(E,S,0,d,m),M=new P([],C,0,f,g)}(),!0),e.l_desc=new F(e.dyn_ltree,A),e.d_desc=new F(e.dyn_dtree,j),e.bl_desc=new F(e.bl_tree,M),e.bi_buf=0,e.bi_valid=0,H(e)},n._tr_stored_block=Z,n._tr_flush_block=function(e,t,n,r){var o,s,c=0;0<e.level?(e.strm.data_type===2&&(e.strm.data_type=function(e){var t,n=4093624447;for(t=0;t<=31;t++,n>>>=1)if(1&n&&e.dyn_ltree[2*t]!==0)return i;if(e.dyn_ltree[18]!==0||e.dyn_ltree[20]!==0||e.dyn_ltree[26]!==0)return a;for(t=32;t<l;t++)if(e.dyn_ltree[2*t]!==0)return a;return i}(e)),q(e,e.l_desc),q(e,e.d_desc),c=function(e){var t;for(J(e,e.dyn_ltree,e.l_desc.max_code),J(e,e.dyn_dtree,e.d_desc.max_code),q(e,e.bl_desc),t=f-1;3<=t&&e.bl_tree[2*w[t]+1]===0;t--);return e.opt_len+=3*(t+1)+5+5+4,t}(e),o=e.opt_len+3+7>>>3,(s=e.static_len+3+7>>>3)<=o&&(o=s)):o=s=n+5,n+4<=o&&t!==-1?Z(e,t,n,r):e.strategy===4||s===o?(R(e,2+ +!!r,3),K(e,T,E)):(R(e,4+ +!!r,3),function(e,t,n,r){var i;for(R(e,t-257,5),R(e,n-1,5),R(e,r-4,4),i=0;i<r;i++)R(e,e.bl_tree[2*w[i]+1],3);Y(e,e.dyn_ltree,t-1),Y(e,e.dyn_dtree,n-1)}(e,e.l_desc.max_code+1,e.d_desc.max_code+1,c+1),K(e,e.dyn_ltree,e.dyn_dtree)),H(e),r&&U(e)},n._tr_tally=function(e,t,n){return e.pending_buf[e.d_buf+2*e.last_lit]=t>>>8&255,e.pending_buf[e.d_buf+2*e.last_lit+1]=255&t,e.pending_buf[e.l_buf+e.last_lit]=255&n,e.last_lit++,t===0?e.dyn_ltree[2*n]++:(e.matches++,t--,e.dyn_ltree[2*(O[n]+l+1)]++,e.dyn_dtree[2*I(t)]++),e.last_lit===e.lit_bufsize-1},n._tr_align=function(e){R(e,2,3),z(e,_,T),function(e){e.bi_valid===16?(L(e,e.bi_buf),e.bi_buf=0,e.bi_valid=0):8<=e.bi_valid&&(e.pending_buf[e.pending++]=255&e.bi_buf,e.bi_buf>>=8,e.bi_valid-=8)}(e)}},{\"../utils/common\":41}],53:[function(e,t,n){\"use strict\";t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg=``,this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(e,t,n){(function(e){(function(e,t){\"use strict\";if(!e.setImmediate){var n,r,i,a,o=1,s={},c=!1,l=e.document,u=Object.getPrototypeOf&&Object.getPrototypeOf(e);u=u&&u.setTimeout?u:e,n={}.toString.call(e.process)===`[object process]`?function(e){process.nextTick(function(){f(e)})}:function(){if(e.postMessage&&!e.importScripts){var t=!0,n=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage(``,`*`),e.onmessage=n,t}}()?(a=`setImmediate$`+Math.random()+`$`,e.addEventListener?e.addEventListener(`message`,p,!1):e.attachEvent(`onmessage`,p),function(t){e.postMessage(a+t,`*`)}):e.MessageChannel?((i=new MessageChannel).port1.onmessage=function(e){f(e.data)},function(e){i.port2.postMessage(e)}):l&&`onreadystatechange`in l.createElement(`script`)?(r=l.documentElement,function(e){var t=l.createElement(`script`);t.onreadystatechange=function(){f(e),t.onreadystatechange=null,r.removeChild(t),t=null},r.appendChild(t)}):function(e){setTimeout(f,0,e)},u.setImmediate=function(e){typeof e!=`function`&&(e=Function(``+e));for(var t=Array(arguments.length-1),r=0;r<t.length;r++)t[r]=arguments[r+1];return s[o]={callback:e,args:t},n(o),o++},u.clearImmediate=d}function d(e){delete s[e]}function f(e){if(c)setTimeout(f,0,e);else{var n=s[e];if(n){c=!0;try{(function(e){var n=e.callback,r=e.args;switch(r.length){case 0:n();break;case 1:n(r[0]);break;case 2:n(r[0],r[1]);break;case 3:n(r[0],r[1],r[2]);break;default:n.apply(t,r)}})(n)}finally{d(e),c=!1}}}}function p(t){t.source===e&&typeof t.data==`string`&&t.data.indexOf(a)===0&&f(+t.data.slice(a.length))}})(typeof self>`u`?e===void 0?this:e:self)}).call(this,typeof global<`u`?global:typeof self<`u`?self:typeof window<`u`?window:{})},{}]},{},[10])(10)})})),R=o(((e,t)=>{var n=n||{};n.scope={},n.ASSUME_ES5=!1,n.ASSUME_NO_NATIVE_MAP=!1,n.ASSUME_NO_NATIVE_SET=!1,n.SIMPLE_FROUND_POLYFILL=!1,n.ISOLATE_POLYFILLS=!1,n.FORCE_POLYFILL_PROMISE=!1,n.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION=!1,n.defineProperty=n.ASSUME_ES5||typeof Object.defineProperties==`function`?Object.defineProperty:function(e,t,n){return e==Array.prototype||e==Object.prototype||(e[t]=n.value),e},n.getGlobal=function(e){e=[typeof globalThis==`object`&&globalThis,e,typeof window==`object`&&window,typeof self==`object`&&self,typeof global==`object`&&global];for(var t=0;t<e.length;++t){var n=e[t];if(n&&n.Math==Math)return n}throw Error(`Cannot find global object`)},n.global=n.getGlobal(e),n.IS_SYMBOL_NATIVE=typeof Symbol==`function`&&typeof Symbol(`x`)==`symbol`,n.TRUST_ES6_POLYFILLS=!n.ISOLATE_POLYFILLS||n.IS_SYMBOL_NATIVE,n.polyfills={},n.propertyToPolyfillSymbol={},n.POLYFILL_PREFIX=`$jscp$`,n.polyfill=function(e,t,r,i){t&&(n.ISOLATE_POLYFILLS?n.polyfillIsolated(e,t,r,i):n.polyfillUnisolated(e,t,r,i))},n.polyfillUnisolated=function(e,t,r,i){for(r=n.global,e=e.split(`.`),i=0;i<e.length-1;i++){var a=e[i];if(!(a in r))return;r=r[a]}e=e[e.length-1],i=r[e],t=t(i),t!=i&&t!=null&&n.defineProperty(r,e,{configurable:!0,writable:!0,value:t})},n.polyfillIsolated=function(e,t,r,i){var a=e.split(`.`);e=a.length===1,i=a[0],i=!e&&i in n.polyfills?n.polyfills:n.global;for(var o=0;o<a.length-1;o++){var s=a[o];if(!(s in i))return;i=i[s]}a=a[a.length-1],r=n.IS_SYMBOL_NATIVE&&r===`es6`?i[a]:null,t=t(r),t!=null&&(e?n.defineProperty(n.polyfills,a,{configurable:!0,writable:!0,value:t}):t!==r&&(n.propertyToPolyfillSymbol[a]===void 0&&(r=1e9*Math.random()>>>0,n.propertyToPolyfillSymbol[a]=n.IS_SYMBOL_NATIVE?n.global.Symbol(a):n.POLYFILL_PREFIX+r+`$`+a),n.defineProperty(i,n.propertyToPolyfillSymbol[a],{configurable:!0,writable:!0,value:t})))},n.underscoreProtoCanBeSet=function(){var e={a:!0},t={};try{return t.__proto__=e,t.a}catch{}return!1},n.setPrototypeOf=n.TRUST_ES6_POLYFILLS&&typeof Object.setPrototypeOf==`function`?Object.setPrototypeOf:n.underscoreProtoCanBeSet()?function(e,t){if(e.__proto__=t,e.__proto__!==t)throw TypeError(e+` is not extensible`);return e}:null,n.arrayIteratorImpl=function(e){var t=0;return function(){return t<e.length?{done:!1,value:e[t++]}:{done:!0}}},n.arrayIterator=function(e){return{next:n.arrayIteratorImpl(e)}},n.makeIterator=function(e){var t=typeof Symbol<`u`&&Symbol.iterator&&e[Symbol.iterator];return t?t.call(e):n.arrayIterator(e)},n.generator={},n.generator.ensureIteratorResultIsObject_=function(e){if(!(e instanceof Object))throw TypeError(`Iterator result `+e+` is not an object`)},n.generator.Context=function(){this.isRunning_=!1,this.yieldAllIterator_=null,this.yieldResult=void 0,this.nextAddress=1,this.finallyAddress_=this.catchAddress_=0,this.finallyContexts_=this.abruptCompletion_=null},n.generator.Context.prototype.start_=function(){if(this.isRunning_)throw TypeError(`Generator is already running`);this.isRunning_=!0},n.generator.Context.prototype.stop_=function(){this.isRunning_=!1},n.generator.Context.prototype.jumpToErrorHandler_=function(){this.nextAddress=this.catchAddress_||this.finallyAddress_},n.generator.Context.prototype.next_=function(e){this.yieldResult=e},n.generator.Context.prototype.throw_=function(e){this.abruptCompletion_={exception:e,isException:!0},this.jumpToErrorHandler_()},n.generator.Context.prototype.return=function(e){this.abruptCompletion_={return:e},this.nextAddress=this.finallyAddress_},n.generator.Context.prototype.jumpThroughFinallyBlocks=function(e){this.abruptCompletion_={jumpTo:e},this.nextAddress=this.finallyAddress_},n.generator.Context.prototype.yield=function(e,t){return this.nextAddress=t,{value:e}},n.generator.Context.prototype.yieldAll=function(e,t){e=n.makeIterator(e);var r=e.next();if(n.generator.ensureIteratorResultIsObject_(r),r.done)this.yieldResult=r.value,this.nextAddress=t;else return this.yieldAllIterator_=e,this.yield(r.value,t)},n.generator.Context.prototype.jumpTo=function(e){this.nextAddress=e},n.generator.Context.prototype.jumpToEnd=function(){this.nextAddress=0},n.generator.Context.prototype.setCatchFinallyBlocks=function(e,t){this.catchAddress_=e,t!=null&&(this.finallyAddress_=t)},n.generator.Context.prototype.setFinallyBlock=function(e){this.catchAddress_=0,this.finallyAddress_=e||0},n.generator.Context.prototype.leaveTryBlock=function(e,t){this.nextAddress=e,this.catchAddress_=t||0},n.generator.Context.prototype.enterCatchBlock=function(e){return this.catchAddress_=e||0,e=this.abruptCompletion_.exception,this.abruptCompletion_=null,e},n.generator.Context.prototype.enterFinallyBlock=function(e,t,n){n?this.finallyContexts_[n]=this.abruptCompletion_:this.finallyContexts_=[this.abruptCompletion_],this.catchAddress_=e||0,this.finallyAddress_=t||0},n.generator.Context.prototype.leaveFinallyBlock=function(e,t){if(t=this.finallyContexts_.splice(t||0)[0],t=this.abruptCompletion_=this.abruptCompletion_||t){if(t.isException)return this.jumpToErrorHandler_();t.jumpTo!=null&&this.finallyAddress_<t.jumpTo?(this.nextAddress=t.jumpTo,this.abruptCompletion_=null):this.nextAddress=this.finallyAddress_}else this.nextAddress=e},n.generator.Context.prototype.forIn=function(e){return new n.generator.Context.PropertyIterator(e)},n.generator.Context.PropertyIterator=function(e){for(var t in this.object_=e,this.properties_=[],e)this.properties_.push(t);this.properties_.reverse()},n.generator.Context.PropertyIterator.prototype.getNext=function(){for(;0<this.properties_.length;){var e=this.properties_.pop();if(e in this.object_)return e}return null},n.generator.Engine_=function(e){this.context_=new n.generator.Context,this.program_=e},n.generator.Engine_.prototype.next_=function(e){return this.context_.start_(),this.context_.yieldAllIterator_?this.yieldAllStep_(this.context_.yieldAllIterator_.next,e,this.context_.next_):(this.context_.next_(e),this.nextStep_())},n.generator.Engine_.prototype.return_=function(e){this.context_.start_();var t=this.context_.yieldAllIterator_;return t?this.yieldAllStep_(`return`in t?t.return:function(e){return{value:e,done:!0}},e,this.context_.return):(this.context_.return(e),this.nextStep_())},n.generator.Engine_.prototype.throw_=function(e){return this.context_.start_(),this.context_.yieldAllIterator_?this.yieldAllStep_(this.context_.yieldAllIterator_.throw,e,this.context_.next_):(this.context_.throw_(e),this.nextStep_())},n.generator.Engine_.prototype.yieldAllStep_=function(e,t,r){try{var i=e.call(this.context_.yieldAllIterator_,t);if(n.generator.ensureIteratorResultIsObject_(i),!i.done)return this.context_.stop_(),i;var a=i.value}catch(e){return this.context_.yieldAllIterator_=null,this.context_.throw_(e),this.nextStep_()}return this.context_.yieldAllIterator_=null,r.call(this.context_,a),this.nextStep_()},n.generator.Engine_.prototype.nextStep_=function(){for(;this.context_.nextAddress;)try{var e=this.program_(this.context_);if(e)return this.context_.stop_(),{value:e.value,done:!1}}catch(e){this.context_.yieldResult=void 0,this.context_.throw_(e)}if(this.context_.stop_(),this.context_.abruptCompletion_){if(e=this.context_.abruptCompletion_,this.context_.abruptCompletion_=null,e.isException)throw e.exception;return{value:e.return,done:!0}}return{value:void 0,done:!0}},n.generator.Generator_=function(e){this.next=function(t){return e.next_(t)},this.throw=function(t){return e.throw_(t)},this.return=function(t){return e.return_(t)},this[Symbol.iterator]=function(){return this}},n.generator.createGenerator=function(e,t){return t=new n.generator.Generator_(new n.generator.Engine_(t)),n.setPrototypeOf&&e.prototype&&n.setPrototypeOf(t,e.prototype),t},n.asyncExecutePromiseGenerator=function(e){function t(t){return e.next(t)}function n(t){return e.throw(t)}return new Promise(function(r,i){function a(e){e.done?r(e.value):Promise.resolve(e.value).then(t,n).then(a,i)}a(e.next())})},n.asyncExecutePromiseGeneratorFunction=function(e){return n.asyncExecutePromiseGenerator(e())},n.asyncExecutePromiseGeneratorProgram=function(e){return n.asyncExecutePromiseGenerator(new n.generator.Generator_(new n.generator.Engine_(e)))},(function(n,r){typeof e==`object`&&t!==void 0?t.exports=r():typeof define==`function`&&define.amd?define(r):(n=typeof globalThis<`u`?globalThis:n||self,n.QrScanner=r())})(e,function(){class e{constructor(t,n,r,i,a){this._legacyCanvasSize=e.DEFAULT_CANVAS_SIZE,this._preferredCamera=`environment`,this._maxScansPerSecond=25,this._lastScanTimestamp=-1,this._destroyed=this._flashOn=this._paused=this._active=!1,this.$video=t,this.$canvas=document.createElement(`canvas`),r&&typeof r==`object`?this._onDecode=n:(console.warn(r||i||a?`You're using a deprecated version of the QrScanner constructor which will be removed in the future`:`Note that the type of the scan result passed to onDecode will change in the future. To already switch to the new api today, you can pass returnDetailedScanResult: true.`),this._legacyOnDecode=n),n=typeof r==`object`?r:{},this._onDecodeError=n.onDecodeError||(typeof r==`function`?r:this._onDecodeError),this._calculateScanRegion=n.calculateScanRegion||(typeof i==`function`?i:this._calculateScanRegion),this._preferredCamera=n.preferredCamera||a||this._preferredCamera,this._legacyCanvasSize=typeof r==`number`?r:typeof i==`number`?i:this._legacyCanvasSize,this._maxScansPerSecond=n.maxScansPerSecond||this._maxScansPerSecond,this._onPlay=this._onPlay.bind(this),this._onLoadedMetaData=this._onLoadedMetaData.bind(this),this._onVisibilityChange=this._onVisibilityChange.bind(this),this._updateOverlay=this._updateOverlay.bind(this),t.disablePictureInPicture=!0,t.playsInline=!0,t.muted=!0;let o=!1;if(t.hidden&&(t.hidden=!1,o=!0),document.body.contains(t)||(document.body.appendChild(t),o=!0),r=t.parentElement,n.highlightScanRegion||n.highlightCodeOutline){if(i=!!n.overlay,this.$overlay=n.overlay||document.createElement(`div`),a=this.$overlay.style,a.position=`absolute`,a.display=`none`,a.pointerEvents=`none`,this.$overlay.classList.add(`scan-region-highlight`),!i&&n.highlightScanRegion){this.$overlay.innerHTML=`<svg class=\"scan-region-highlight-svg\" viewBox=\"0 0 238 238\" preserveAspectRatio=\"none\" style=\"position:absolute;width:100%;height:100%;left:0;top:0;fill:none;stroke:#e9b213;stroke-width:4;stroke-linecap:round;stroke-linejoin:round\"><path d=\"M31 2H10a8 8 0 0 0-8 8v21M207 2h21a8 8 0 0 1 8 8v21m0 176v21a8 8 0 0 1-8 8h-21m-176 0H10a8 8 0 0 1-8-8v-21\"/></svg>`;try{this.$overlay.firstElementChild.animate({transform:[`scale(.98)`,`scale(1.01)`]},{duration:400,iterations:1/0,direction:`alternate`,easing:`ease-in-out`})}catch{}r.insertBefore(this.$overlay,this.$video.nextSibling)}n.highlightCodeOutline&&(this.$overlay.insertAdjacentHTML(`beforeend`,`<svg class=\"code-outline-highlight\" preserveAspectRatio=\"none\" style=\"display:none;width:100%;height:100%;fill:none;stroke:#e9b213;stroke-width:5;stroke-dasharray:25;stroke-linecap:round;stroke-linejoin:round\"><polygon/></svg>`),this.$codeOutlineHighlight=this.$overlay.lastElementChild)}this._scanRegion=this._calculateScanRegion(t),requestAnimationFrame(()=>{let e=window.getComputedStyle(t);e.display===`none`&&(t.style.setProperty(`display`,`block`,`important`),o=!0),e.visibility!==`visible`&&(t.style.setProperty(`visibility`,`visible`,`important`),o=!0),o&&(console.warn(`QrScanner has overwritten the video hiding style to avoid Safari stopping the playback.`),t.style.opacity=`0`,t.style.width=`0`,t.style.height=`0`,this.$overlay&&this.$overlay.parentElement&&this.$overlay.parentElement.removeChild(this.$overlay),delete this.$overlay,delete this.$codeOutlineHighlight),this.$overlay&&this._updateOverlay()}),t.addEventListener(`play`,this._onPlay),t.addEventListener(`loadedmetadata`,this._onLoadedMetaData),document.addEventListener(`visibilitychange`,this._onVisibilityChange),window.addEventListener(`resize`,this._updateOverlay),this._qrEnginePromise=e.createQrEngine()}static set WORKER_PATH(e){console.warn(`Setting QrScanner.WORKER_PATH is not required and not supported anymore. Have a look at the README for new setup instructions.`)}static hasCamera(){return n.asyncExecutePromiseGeneratorFunction(function*(){try{return!!(yield e.listCameras(!1)).length}catch{return!1}})}static listCameras(t=!1){return n.asyncExecutePromiseGeneratorFunction(function*(){if(!navigator.mediaDevices)return[];let r=()=>n.asyncExecutePromiseGeneratorFunction(function*(){return(yield navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind===`videoinput`)}),i;try{t&&(yield r()).every(e=>!e.label)&&(i=yield navigator.mediaDevices.getUserMedia({audio:!1,video:!0}))}catch{}try{return(yield r()).map((e,t)=>({id:e.deviceId,label:e.label||(t===0?`Default Camera`:`Camera ${t+1}`)}))}finally{i&&(console.warn(`Call listCameras after successfully starting a QR scanner to avoid creating a temporary video stream`),e._stopVideoStream(i))}})}hasFlash(){let t=this;return n.asyncExecutePromiseGeneratorFunction(function*(){let n;try{if(t.$video.srcObject){if(!(t.$video.srcObject instanceof MediaStream))return!1;n=t.$video.srcObject}else n=(yield t._getCameraStream()).stream;return`torch`in n.getVideoTracks()[0].getSettings()}catch{return!1}finally{n&&n!==t.$video.srcObject&&(console.warn(`Call hasFlash after successfully starting the scanner to avoid creating a temporary video stream`),e._stopVideoStream(n))}})}isFlashOn(){return this._flashOn}toggleFlash(){let e=this;return n.asyncExecutePromiseGeneratorFunction(function*(){e._flashOn?yield e.turnFlashOff():yield e.turnFlashOn()})}turnFlashOn(){let e=this;return n.asyncExecutePromiseGeneratorFunction(function*(){if(!e._flashOn&&!e._destroyed&&(e._flashOn=!0,e._active&&!e._paused))try{if(!(yield e.hasFlash()))throw`No flash available`;yield e.$video.srcObject.getVideoTracks()[0].applyConstraints({advanced:[{torch:!0}]})}catch(t){throw e._flashOn=!1,t}})}turnFlashOff(){let e=this;return n.asyncExecutePromiseGeneratorFunction(function*(){e._flashOn&&(e._flashOn=!1,yield e._restartVideoStream())})}destroy(){this.$video.removeEventListener(`loadedmetadata`,this._onLoadedMetaData),this.$video.removeEventListener(`play`,this._onPlay),document.removeEventListener(`visibilitychange`,this._onVisibilityChange),window.removeEventListener(`resize`,this._updateOverlay),this._destroyed=!0,this._flashOn=!1,this.stop(),e._postWorkerMessage(this._qrEnginePromise,`close`)}start(){let t=this;return n.asyncExecutePromiseGeneratorFunction(function*(){if(t._destroyed)throw Error(`The QR scanner can not be started as it had been destroyed.`);if((!t._active||t._paused)&&(window.location.protocol!==`https:`&&console.warn(`The camera stream is only accessible if the page is transferred via https.`),t._active=!0,!document.hidden))if(t._paused=!1,t.$video.srcObject)yield t.$video.play();else try{let{stream:n,facingMode:r}=yield t._getCameraStream();!t._active||t._paused?e._stopVideoStream(n):(t._setVideoMirror(r),t.$video.srcObject=n,yield t.$video.play(),t._flashOn&&(t._flashOn=!1,t.turnFlashOn().catch(()=>{})))}catch(e){if(!t._paused)throw t._active=!1,e}})}stop(){this.pause(),this._active=!1}pause(t=!1){let r=this;return n.asyncExecutePromiseGeneratorFunction(function*(){if(r._paused=!0,!r._active)return!0;r.$video.pause(),r.$overlay&&(r.$overlay.style.display=`none`);let n=()=>{r.$video.srcObject instanceof MediaStream&&(e._stopVideoStream(r.$video.srcObject),r.$video.srcObject=null)};return t?(n(),!0):(yield new Promise(e=>setTimeout(e,300)),r._paused?(n(),!0):!1)})}setCamera(e){let t=this;return n.asyncExecutePromiseGeneratorFunction(function*(){e!==t._preferredCamera&&(t._preferredCamera=e,yield t._restartVideoStream())})}static scanImage(t,r,i,a,o=!1,s=!1){return n.asyncExecutePromiseGeneratorFunction(function*(){let c,l=!1;r&&(`scanRegion`in r||`qrEngine`in r||`canvas`in r||`disallowCanvasResizing`in r||`alsoTryWithoutScanRegion`in r||`returnDetailedScanResult`in r)?(c=r.scanRegion,i=r.qrEngine,a=r.canvas,o=r.disallowCanvasResizing||!1,s=r.alsoTryWithoutScanRegion||!1,l=!0):console.warn(r||i||a||o||s?`You're using a deprecated api for scanImage which will be removed in the future.`:`Note that the return type of scanImage will change in the future. To already switch to the new api today, you can pass returnDetailedScanResult: true.`);let u=!!i;try{let r,d;[i,r]=yield Promise.all([i||e.createQrEngine(),e._loadImage(t)]),[a,d]=e._drawToCanvas(r,c,a,o);let f;if(i instanceof Worker){let t=i;u||e._postWorkerMessageSync(t,`inversionMode`,`both`),f=yield new Promise((n,r)=>{let i,o,s,l=-1;o=a=>{a.data.id===l&&(t.removeEventListener(`message`,o),t.removeEventListener(`error`,s),clearTimeout(i),a.data.data===null?r(e.NO_QR_CODE_FOUND):n({data:a.data.data,cornerPoints:e._convertPoints(a.data.cornerPoints,c)}))},s=e=>{t.removeEventListener(`message`,o),t.removeEventListener(`error`,s),clearTimeout(i),r(`Scanner error: `+(e?e.message||e:`Unknown Error`))},t.addEventListener(`message`,o),t.addEventListener(`error`,s),i=setTimeout(()=>s(`timeout`),1e4);let u=d.getImageData(0,0,a.width,a.height);l=e._postWorkerMessageSync(t,`decode`,u,[u.data.buffer])})}else f=yield Promise.race([new Promise((e,t)=>window.setTimeout(()=>t(`Scanner error: timeout`),1e4)),n.asyncExecutePromiseGeneratorFunction(function*(){try{var[n]=yield i.detect(a);if(!n)throw e.NO_QR_CODE_FOUND;return{data:n.rawValue,cornerPoints:e._convertPoints(n.cornerPoints,c)}}catch(r){if(n=r.message||r,/not implemented|service unavailable/.test(n))return e._disableBarcodeDetector=!0,e.scanImage(t,{scanRegion:c,canvas:a,disallowCanvasResizing:o,alsoTryWithoutScanRegion:s});throw`Scanner error: ${n}`}})]);return l?f:f.data}catch(n){if(!c||!s)throw n;let r=yield e.scanImage(t,{qrEngine:i,canvas:a,disallowCanvasResizing:o});return l?r:r.data}finally{u||e._postWorkerMessage(i,`close`)}})}setGrayscaleWeights(t,n,r,i=!0){e._postWorkerMessage(this._qrEnginePromise,`grayscaleWeights`,{red:t,green:n,blue:r,useIntegerApproximation:i})}setInversionMode(t){e._postWorkerMessage(this._qrEnginePromise,`inversionMode`,t)}static createQrEngine(r){return n.asyncExecutePromiseGeneratorFunction(function*(){r&&console.warn(`Specifying a worker path is not required and not supported anymore.`);let n=()=>Promise.resolve().then(function(){return t}).then(e=>e.createWorker());if(!(!e._disableBarcodeDetector&&`BarcodeDetector`in window&&BarcodeDetector.getSupportedFormats&&(yield BarcodeDetector.getSupportedFormats()).includes(`qr_code`)))return n();let i=navigator.userAgentData;return i&&i.brands.some(({brand:e})=>/Chromium/i.test(e))&&/mac ?OS/i.test(i.platform)&&(yield i.getHighEntropyValues([`architecture`,`platformVersion`]).then(({architecture:e,platformVersion:t})=>/arm/i.test(e||`arm`)&&13<=parseInt(t||`13`)).catch(()=>!0))?n():new BarcodeDetector({formats:[`qr_code`]})})}_onPlay(){this._scanRegion=this._calculateScanRegion(this.$video),this._updateOverlay(),this.$overlay&&(this.$overlay.style.display=``),this._scanFrame()}_onLoadedMetaData(){this._scanRegion=this._calculateScanRegion(this.$video),this._updateOverlay()}_onVisibilityChange(){document.hidden?this.pause():this._active&&this.start()}_calculateScanRegion(e){let t=Math.round(2/3*Math.min(e.videoWidth,e.videoHeight));return{x:Math.round((e.videoWidth-t)/2),y:Math.round((e.videoHeight-t)/2),width:t,height:t,downScaledWidth:this._legacyCanvasSize,downScaledHeight:this._legacyCanvasSize}}_updateOverlay(){requestAnimationFrame(()=>{if(this.$overlay){var e=this.$video,t=e.videoWidth,n=e.videoHeight,r=e.offsetWidth,i=e.offsetHeight,a=e.offsetLeft,o=e.offsetTop,s=window.getComputedStyle(e),c=s.objectFit,l=t/n,u=r/i;switch(c){case`none`:var d=t,f=n;break;case`fill`:d=r,f=i;break;default:(c===`cover`?l>u:l<u)?(f=i,d=f*l):(d=r,f=d/l),c===`scale-down`&&(d=Math.min(d,t),f=Math.min(f,n))}var[p,m]=s.objectPosition.split(` `).map((e,t)=>{let n=parseFloat(e);return e.endsWith(`%`)?(t?i-f:r-d)*n/100:n});s=this._scanRegion.width||t,u=this._scanRegion.height||n,c=this._scanRegion.x||0;var h=this._scanRegion.y||0;l=this.$overlay.style,l.width=`${s/t*d}px`,l.height=`${u/n*f}px`,l.top=`${o+m+h/n*f}px`,n=/scaleX\\(-1\\)/.test(e.style.transform),l.left=`${a+(n?r-p-d:p)+(n?t-c-s:c)/t*d}px`,l.transform=e.style.transform}})}static _convertPoints(e,t){if(!t)return e;let n=t.x||0,r=t.y||0,i=t.width&&t.downScaledWidth?t.width/t.downScaledWidth:1;t=t.height&&t.downScaledHeight?t.height/t.downScaledHeight:1;for(let a of e)a.x=a.x*i+n,a.y=a.y*t+r;return e}_scanFrame(){!this._active||this.$video.paused||this.$video.ended||(`requestVideoFrameCallback`in this.$video?this.$video.requestVideoFrameCallback.bind(this.$video):requestAnimationFrame)(()=>{let t=this;return n.asyncExecutePromiseGeneratorFunction(function*(){if(!(1>=t.$video.readyState)){var n=Date.now()-t._lastScanTimestamp,r=1e3/t._maxScansPerSecond;n<r&&(yield new Promise(e=>setTimeout(e,r-n))),t._lastScanTimestamp=Date.now();try{var i=yield e.scanImage(t.$video,{scanRegion:t._scanRegion,qrEngine:t._qrEnginePromise,canvas:t.$canvas})}catch(e){if(!t._active)return;t._onDecodeError(e)}!e._disableBarcodeDetector||(yield t._qrEnginePromise)instanceof Worker||(t._qrEnginePromise=e.createQrEngine()),i?(t._onDecode?t._onDecode(i):t._legacyOnDecode&&t._legacyOnDecode(i.data),t.$codeOutlineHighlight&&(clearTimeout(t._codeOutlineHighlightRemovalTimeout),t._codeOutlineHighlightRemovalTimeout=void 0,t.$codeOutlineHighlight.setAttribute(`viewBox`,`${t._scanRegion.x||0} ${t._scanRegion.y||0} ${t._scanRegion.width||t.$video.videoWidth} ${t._scanRegion.height||t.$video.videoHeight}`),t.$codeOutlineHighlight.firstElementChild.setAttribute(`points`,i.cornerPoints.map(({x:e,y:t})=>`${e},${t}`).join(` `)),t.$codeOutlineHighlight.style.display=``)):t.$codeOutlineHighlight&&!t._codeOutlineHighlightRemovalTimeout&&(t._codeOutlineHighlightRemovalTimeout=setTimeout(()=>t.$codeOutlineHighlight.style.display=`none`,100))}t._scanFrame()})})}_onDecodeError(t){t!==e.NO_QR_CODE_FOUND&&console.log(t)}_getCameraStream(){let e=this;return n.asyncExecutePromiseGeneratorFunction(function*(){if(!navigator.mediaDevices)throw`Camera not found.`;let t=/^(environment|user)$/.test(e._preferredCamera)?`facingMode`:`deviceId`,n=[{width:{min:1024}},{width:{min:768}},{}],r=n.map(n=>Object.assign({},n,{[t]:{exact:e._preferredCamera}}));for(let t of[...r,...n])try{let n=yield navigator.mediaDevices.getUserMedia({video:t,audio:!1});return{stream:n,facingMode:e._getFacingMode(n)||(t.facingMode?e._preferredCamera:e._preferredCamera===`environment`?`user`:`environment`)}}catch{}throw`Camera not found.`})}_restartVideoStream(){let e=this;return n.asyncExecutePromiseGeneratorFunction(function*(){let t=e._paused;(yield e.pause(!0))&&!t&&e._active&&(yield e.start())})}static _stopVideoStream(e){for(let t of e.getTracks())t.stop(),e.removeTrack(t)}_setVideoMirror(e){this.$video.style.transform=`scaleX(`+(e===`user`?-1:1)+`)`}_getFacingMode(e){return(e=e.getVideoTracks()[0])?/rear|back|environment/i.test(e.label)?`environment`:/front|user|face/i.test(e.label)?`user`:null:null}static _drawToCanvas(e,t,n,r=!1){n||=document.createElement(`canvas`);let i=t&&t.x?t.x:0,a=t&&t.y?t.y:0,o=t&&t.width?t.width:e.videoWidth||e.width,s=t&&t.height?t.height:e.videoHeight||e.height;return r||(r=t&&t.downScaledWidth?t.downScaledWidth:o,t=t&&t.downScaledHeight?t.downScaledHeight:s,n.width!==r&&(n.width=r),n.height!==t&&(n.height=t)),t=n.getContext(`2d`,{alpha:!1}),t.imageSmoothingEnabled=!1,t.drawImage(e,i,a,o,s,0,0,n.width,n.height),[n,t]}static _loadImage(t){return n.asyncExecutePromiseGeneratorFunction(function*(){if(t instanceof Image)return yield e._awaitImageLoad(t),t;if(t instanceof HTMLVideoElement||t instanceof HTMLCanvasElement||t instanceof SVGImageElement||`OffscreenCanvas`in window&&t instanceof OffscreenCanvas||`ImageBitmap`in window&&t instanceof ImageBitmap)return t;if(t instanceof File||t instanceof Blob||t instanceof URL||typeof t==`string`){let n=new Image;n.src=t instanceof File||t instanceof Blob?URL.createObjectURL(t):t.toString();try{return yield e._awaitImageLoad(n),n}finally{(t instanceof File||t instanceof Blob)&&URL.revokeObjectURL(n.src)}}else throw`Unsupported image type.`})}static _awaitImageLoad(e){return n.asyncExecutePromiseGeneratorFunction(function*(){e.complete&&e.naturalWidth!==0||(yield new Promise((t,n)=>{let r=i=>{e.removeEventListener(`load`,r),e.removeEventListener(`error`,r),i instanceof ErrorEvent?n(`Image load error`):t()};e.addEventListener(`load`,r),e.addEventListener(`error`,r)}))})}static _postWorkerMessage(t,r,i,a){return n.asyncExecutePromiseGeneratorFunction(function*(){return e._postWorkerMessageSync(yield t,r,i,a)})}static _postWorkerMessageSync(t,n,r,i){if(!(t instanceof Worker))return-1;let a=e._workerMessageId++;return t.postMessage({id:a,type:n,data:r},i),a}}e.DEFAULT_CANVAS_SIZE=400,e.NO_QR_CODE_FOUND=`No QR code found`,e._disableBarcodeDetector=!1,e._workerMessageId=0;var t=Object.freeze({__proto__:null,createWorker:()=>new Worker(URL.createObjectURL(new Blob([`class x{constructor(a,b){this.width=b;this.height=a.length/b;this.data=a}static createEmpty(a,b){return new x(new Uint8ClampedArray(a*b),a)}get(a,b){return 0>a||a>=this.width||0>b||b>=this.height?!1:!!this.data[b*this.width+a]}set(a,b,c){this.data[b*this.width+a]=c?1:0}setRegion(a,b,c,d,e){for(let f=b;f<b+d;f++)for(let g=a;g<a+c;g++)this.set(g,f,!!e)}}\nclass A{constructor(a,b,c){this.width=a;a*=b;if(c&&c.length!==a)throw Error(\"Wrong buffer size\");this.data=c||new Uint8ClampedArray(a)}get(a,b){return this.data[b*this.width+a]}set(a,b,c){this.data[b*this.width+a]=c}}\nclass ba{constructor(a){this.bitOffset=this.byteOffset=0;this.bytes=a}readBits(a){if(1>a||32<a||a>this.available())throw Error(\"Cannot read \"+a.toString()+\" bits\");var b=0;if(0<this.bitOffset){b=8-this.bitOffset;var c=a<b?a:b;b-=c;b=(this.bytes[this.byteOffset]&255>>8-c<<b)>>b;a-=c;this.bitOffset+=c;8===this.bitOffset&&(this.bitOffset=0,this.byteOffset++)}if(0<a){for(;8<=a;)b=b<<8|this.bytes[this.byteOffset]&255,this.byteOffset++,a-=8;0<a&&(c=8-a,b=b<<a|(this.bytes[this.byteOffset]&255>>c<<c)>>c,\nthis.bitOffset+=a)}return b}available(){return 8*(this.bytes.length-this.byteOffset)-this.bitOffset}}var B,C=B||(B={});C.Numeric=\"numeric\";C.Alphanumeric=\"alphanumeric\";C.Byte=\"byte\";C.Kanji=\"kanji\";C.ECI=\"eci\";C.StructuredAppend=\"structuredappend\";var D,E=D||(D={});E[E.Terminator=0]=\"Terminator\";E[E.Numeric=1]=\"Numeric\";E[E.Alphanumeric=2]=\"Alphanumeric\";E[E.Byte=4]=\"Byte\";E[E.Kanji=8]=\"Kanji\";E[E.ECI=7]=\"ECI\";E[E.StructuredAppend=3]=\"StructuredAppend\";let F=\"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:\".split(\"\");\nfunction ca(a,b){let c=[],d=\"\";b=a.readBits([8,16,16][b]);for(let e=0;e<b;e++){let f=a.readBits(8);c.push(f)}try{d+=decodeURIComponent(c.map(e=>\\`%\\${(\"0\"+e.toString(16)).substr(-2)}\\`).join(\"\"))}catch(e){}return{bytes:c,text:d}}\nfunction da(a,b){a=new ba(a);let c=9>=b?0:26>=b?1:2;for(b={text:\"\",bytes:[],chunks:[],version:b};4<=a.available();){var d=a.readBits(4);if(d===D.Terminator)return b;if(d===D.ECI)0===a.readBits(1)?b.chunks.push({type:B.ECI,assignmentNumber:a.readBits(7)}):0===a.readBits(1)?b.chunks.push({type:B.ECI,assignmentNumber:a.readBits(14)}):0===a.readBits(1)?b.chunks.push({type:B.ECI,assignmentNumber:a.readBits(21)}):b.chunks.push({type:B.ECI,assignmentNumber:-1});else if(d===D.Numeric){var e=a,f=[];d=\"\";for(var g=\ne.readBits([10,12,14][c]);3<=g;){var h=e.readBits(10);if(1E3<=h)throw Error(\"Invalid numeric value above 999\");var k=Math.floor(h/100),m=Math.floor(h/10)%10;h%=10;f.push(48+k,48+m,48+h);d+=k.toString()+m.toString()+h.toString();g-=3}if(2===g){g=e.readBits(7);if(100<=g)throw Error(\"Invalid numeric value above 99\");e=Math.floor(g/10);g%=10;f.push(48+e,48+g);d+=e.toString()+g.toString()}else if(1===g){e=e.readBits(4);if(10<=e)throw Error(\"Invalid numeric value above 9\");f.push(48+e);d+=e.toString()}b.text+=\nd;b.bytes.push(...f);b.chunks.push({type:B.Numeric,text:d})}else if(d===D.Alphanumeric){e=a;f=[];d=\"\";for(g=e.readBits([9,11,13][c]);2<=g;)m=e.readBits(11),k=Math.floor(m/45),m%=45,f.push(F[k].charCodeAt(0),F[m].charCodeAt(0)),d+=F[k]+F[m],g-=2;1===g&&(e=e.readBits(6),f.push(F[e].charCodeAt(0)),d+=F[e]);b.text+=d;b.bytes.push(...f);b.chunks.push({type:B.Alphanumeric,text:d})}else if(d===D.Byte)d=ca(a,c),b.text+=d.text,b.bytes.push(...d.bytes),b.chunks.push({type:B.Byte,bytes:d.bytes,text:d.text});\nelse if(d===D.Kanji){f=a;d=[];e=f.readBits([8,10,12][c]);for(g=0;g<e;g++)k=f.readBits(13),k=Math.floor(k/192)<<8|k%192,k=7936>k?k+33088:k+49472,d.push(k>>8,k&255);f=(new TextDecoder(\"shift-jis\")).decode(Uint8Array.from(d));b.text+=f;b.bytes.push(...d);b.chunks.push({type:B.Kanji,bytes:d,text:f})}else d===D.StructuredAppend&&b.chunks.push({type:B.StructuredAppend,currentSequence:a.readBits(4),totalSequence:a.readBits(4),parity:a.readBits(8)})}if(0===a.available()||0===a.readBits(a.available()))return b}\nclass G{constructor(a,b){if(0===b.length)throw Error(\"No coefficients.\");this.field=a;let c=b.length;if(1<c&&0===b[0]){let d=1;for(;d<c&&0===b[d];)d++;if(d===c)this.coefficients=a.zero.coefficients;else for(this.coefficients=new Uint8ClampedArray(c-d),a=0;a<this.coefficients.length;a++)this.coefficients[a]=b[d+a]}else this.coefficients=b}degree(){return this.coefficients.length-1}isZero(){return 0===this.coefficients[0]}getCoefficient(a){return this.coefficients[this.coefficients.length-1-a]}addOrSubtract(a){if(this.isZero())return a;\nif(a.isZero())return this;let b=this.coefficients;a=a.coefficients;b.length>a.length&&([b,a]=[a,b]);let c=new Uint8ClampedArray(a.length),d=a.length-b.length;for(var e=0;e<d;e++)c[e]=a[e];for(e=d;e<a.length;e++)c[e]=b[e-d]^a[e];return new G(this.field,c)}multiply(a){if(0===a)return this.field.zero;if(1===a)return this;let b=this.coefficients.length,c=new Uint8ClampedArray(b);for(let d=0;d<b;d++)c[d]=this.field.multiply(this.coefficients[d],a);return new G(this.field,c)}multiplyPoly(a){if(this.isZero()||\na.isZero())return this.field.zero;let b=this.coefficients,c=b.length;a=a.coefficients;let d=a.length,e=new Uint8ClampedArray(c+d-1);for(let f=0;f<c;f++){let g=b[f];for(let h=0;h<d;h++)e[f+h]=H(e[f+h],this.field.multiply(g,a[h]))}return new G(this.field,e)}multiplyByMonomial(a,b){if(0>a)throw Error(\"Invalid degree less than 0\");if(0===b)return this.field.zero;let c=this.coefficients.length;a=new Uint8ClampedArray(c+a);for(let d=0;d<c;d++)a[d]=this.field.multiply(this.coefficients[d],b);return new G(this.field,\na)}evaluateAt(a){let b=0;if(0===a)return this.getCoefficient(0);let c=this.coefficients.length;if(1===a)return this.coefficients.forEach(d=>{b^=d}),b;b=this.coefficients[0];for(let d=1;d<c;d++)b=H(this.field.multiply(a,b),this.coefficients[d]);return b}}function H(a,b){return a^b}\nclass ea{constructor(a,b,c){this.primitive=a;this.size=b;this.generatorBase=c;this.expTable=Array(this.size);this.logTable=Array(this.size);a=1;for(b=0;b<this.size;b++)this.expTable[b]=a,a*=2,a>=this.size&&(a=(a^this.primitive)&this.size-1);for(a=0;a<this.size-1;a++)this.logTable[this.expTable[a]]=a;this.zero=new G(this,Uint8ClampedArray.from([0]));this.one=new G(this,Uint8ClampedArray.from([1]))}multiply(a,b){return 0===a||0===b?0:this.expTable[(this.logTable[a]+this.logTable[b])%(this.size-1)]}inverse(a){if(0===\na)throw Error(\"Can't invert 0\");return this.expTable[this.size-this.logTable[a]-1]}buildMonomial(a,b){if(0>a)throw Error(\"Invalid monomial degree less than 0\");if(0===b)return this.zero;a=new Uint8ClampedArray(a+1);a[0]=b;return new G(this,a)}log(a){if(0===a)throw Error(\"Can't take log(0)\");return this.logTable[a]}exp(a){return this.expTable[a]}}\nfunction fa(a,b,c,d){b.degree()<c.degree()&&([b,c]=[c,b]);let e=a.zero;for(var f=a.one;c.degree()>=d/2;){var g=b;let h=e;b=c;e=f;if(b.isZero())return null;c=g;f=a.zero;g=b.getCoefficient(b.degree());for(g=a.inverse(g);c.degree()>=b.degree()&&!c.isZero();){let k=c.degree()-b.degree(),m=a.multiply(c.getCoefficient(c.degree()),g);f=f.addOrSubtract(a.buildMonomial(k,m));c=c.addOrSubtract(b.multiplyByMonomial(k,m))}f=f.multiplyPoly(e).addOrSubtract(h);if(c.degree()>=b.degree())return null}d=f.getCoefficient(0);\nif(0===d)return null;a=a.inverse(d);return[f.multiply(a),c.multiply(a)]}\nfunction ha(a,b){let c=new Uint8ClampedArray(a.length);c.set(a);a=new ea(285,256,0);var d=new G(a,c),e=new Uint8ClampedArray(b),f=!1;for(var g=0;g<b;g++){var h=d.evaluateAt(a.exp(g+a.generatorBase));e[e.length-1-g]=h;0!==h&&(f=!0)}if(!f)return c;d=new G(a,e);d=fa(a,a.buildMonomial(b,1),d,b);if(null===d)return null;b=d[0];g=b.degree();if(1===g)b=[b.getCoefficient(1)];else{e=Array(g);f=0;for(h=1;h<a.size&&f<g;h++)0===b.evaluateAt(h)&&(e[f]=a.inverse(h),f++);b=f!==g?null:e}if(null==b)return null;e=d[1];\nf=b.length;d=Array(f);for(g=0;g<f;g++){h=a.inverse(b[g]);let k=1;for(let m=0;m<f;m++)g!==m&&(k=a.multiply(k,H(1,a.multiply(b[m],h))));d[g]=a.multiply(e.evaluateAt(h),a.inverse(k));0!==a.generatorBase&&(d[g]=a.multiply(d[g],h))}for(e=0;e<b.length;e++){f=c.length-1-a.log(b[e]);if(0>f)return null;c[f]^=d[e]}return c}\nlet I=[{infoBits:null,versionNumber:1,alignmentPatternCenters:[],errorCorrectionLevels:[{ecCodewordsPerBlock:7,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:10,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:16}]},{ecCodewordsPerBlock:13,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:13}]},{ecCodewordsPerBlock:17,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:9}]}]},{infoBits:null,versionNumber:2,alignmentPatternCenters:[6,18],errorCorrectionLevels:[{ecCodewordsPerBlock:10,ecBlocks:[{numBlocks:1,\ndataCodewordsPerBlock:34}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:28}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:22}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:16}]}]},{infoBits:null,versionNumber:3,alignmentPatternCenters:[6,22],errorCorrectionLevels:[{ecCodewordsPerBlock:15,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:55}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:18,\necBlocks:[{numBlocks:2,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:13}]}]},{infoBits:null,versionNumber:4,alignmentPatternCenters:[6,26],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:80}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:32}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:9}]}]},\n{infoBits:null,versionNumber:5,alignmentPatternCenters:[6,30],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:43}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:15},{numBlocks:2,dataCodewordsPerBlock:16}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:11},{numBlocks:2,dataCodewordsPerBlock:12}]}]},{infoBits:null,versionNumber:6,alignmentPatternCenters:[6,\n34],errorCorrectionLevels:[{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:68}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:27}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:15}]}]},{infoBits:31892,versionNumber:7,alignmentPatternCenters:[6,22,38],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:78}]},{ecCodewordsPerBlock:18,\necBlocks:[{numBlocks:4,dataCodewordsPerBlock:31}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:14},{numBlocks:4,dataCodewordsPerBlock:15}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:13},{numBlocks:1,dataCodewordsPerBlock:14}]}]},{infoBits:34236,versionNumber:8,alignmentPatternCenters:[6,24,42],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:97}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:38},\n{numBlocks:2,dataCodewordsPerBlock:39}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:18},{numBlocks:2,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:14},{numBlocks:2,dataCodewordsPerBlock:15}]}]},{infoBits:39577,versionNumber:9,alignmentPatternCenters:[6,26,46],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:36},\n{numBlocks:2,dataCodewordsPerBlock:37}]},{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:16},{numBlocks:4,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:12},{numBlocks:4,dataCodewordsPerBlock:13}]}]},{infoBits:42195,versionNumber:10,alignmentPatternCenters:[6,28,50],errorCorrectionLevels:[{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:68},{numBlocks:2,dataCodewordsPerBlock:69}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,\ndataCodewordsPerBlock:43},{numBlocks:1,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:19},{numBlocks:2,dataCodewordsPerBlock:20}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:15},{numBlocks:2,dataCodewordsPerBlock:16}]}]},{infoBits:48118,versionNumber:11,alignmentPatternCenters:[6,30,54],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:81}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:1,\ndataCodewordsPerBlock:50},{numBlocks:4,dataCodewordsPerBlock:51}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:22},{numBlocks:4,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:12},{numBlocks:8,dataCodewordsPerBlock:13}]}]},{infoBits:51042,versionNumber:12,alignmentPatternCenters:[6,32,58],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:92},{numBlocks:2,dataCodewordsPerBlock:93}]},\n{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:36},{numBlocks:2,dataCodewordsPerBlock:37}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:20},{numBlocks:6,dataCodewordsPerBlock:21}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:14},{numBlocks:4,dataCodewordsPerBlock:15}]}]},{infoBits:55367,versionNumber:13,alignmentPatternCenters:[6,34,62],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:107}]},\n{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:37},{numBlocks:1,dataCodewordsPerBlock:38}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:20},{numBlocks:4,dataCodewordsPerBlock:21}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:11},{numBlocks:4,dataCodewordsPerBlock:12}]}]},{infoBits:58893,versionNumber:14,alignmentPatternCenters:[6,26,46,66],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:115},\n{numBlocks:1,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:40},{numBlocks:5,dataCodewordsPerBlock:41}]},{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:16},{numBlocks:5,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:12},{numBlocks:5,dataCodewordsPerBlock:13}]}]},{infoBits:63784,versionNumber:15,alignmentPatternCenters:[6,26,48,70],errorCorrectionLevels:[{ecCodewordsPerBlock:22,\necBlocks:[{numBlocks:5,dataCodewordsPerBlock:87},{numBlocks:1,dataCodewordsPerBlock:88}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:41},{numBlocks:5,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:24},{numBlocks:7,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:12},{numBlocks:7,dataCodewordsPerBlock:13}]}]},{infoBits:68472,versionNumber:16,alignmentPatternCenters:[6,26,50,\n74],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:98},{numBlocks:1,dataCodewordsPerBlock:99}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:45},{numBlocks:3,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:19},{numBlocks:2,dataCodewordsPerBlock:20}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:15},{numBlocks:13,dataCodewordsPerBlock:16}]}]},{infoBits:70749,\nversionNumber:17,alignmentPatternCenters:[6,30,54,78],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:107},{numBlocks:5,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:46},{numBlocks:1,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:22},{numBlocks:15,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:14},{numBlocks:17,\ndataCodewordsPerBlock:15}]}]},{infoBits:76311,versionNumber:18,alignmentPatternCenters:[6,30,56,82],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:120},{numBlocks:1,dataCodewordsPerBlock:121}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:9,dataCodewordsPerBlock:43},{numBlocks:4,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:22},{numBlocks:1,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,\ndataCodewordsPerBlock:14},{numBlocks:19,dataCodewordsPerBlock:15}]}]},{infoBits:79154,versionNumber:19,alignmentPatternCenters:[6,30,58,86],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:113},{numBlocks:4,dataCodewordsPerBlock:114}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:44},{numBlocks:11,dataCodewordsPerBlock:45}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:21},{numBlocks:4,dataCodewordsPerBlock:22}]},\n{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:9,dataCodewordsPerBlock:13},{numBlocks:16,dataCodewordsPerBlock:14}]}]},{infoBits:84390,versionNumber:20,alignmentPatternCenters:[6,34,62,90],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:107},{numBlocks:5,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:41},{numBlocks:13,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:24},\n{numBlocks:5,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:15},{numBlocks:10,dataCodewordsPerBlock:16}]}]},{infoBits:87683,versionNumber:21,alignmentPatternCenters:[6,28,50,72,94],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:116},{numBlocks:4,dataCodewordsPerBlock:117}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:22},\n{numBlocks:6,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:16},{numBlocks:6,dataCodewordsPerBlock:17}]}]},{infoBits:92361,versionNumber:22,alignmentPatternCenters:[6,26,50,74,98],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:111},{numBlocks:7,dataCodewordsPerBlock:112}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:24},\n{numBlocks:16,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:34,dataCodewordsPerBlock:13}]}]},{infoBits:96236,versionNumber:23,alignmentPatternCenters:[6,30,54,74,102],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:121},{numBlocks:5,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:47},{numBlocks:14,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:24},\n{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:16,dataCodewordsPerBlock:15},{numBlocks:14,dataCodewordsPerBlock:16}]}]},{infoBits:102084,versionNumber:24,alignmentPatternCenters:[6,28,54,80,106],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:117},{numBlocks:4,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:45},{numBlocks:14,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,\necBlocks:[{numBlocks:11,dataCodewordsPerBlock:24},{numBlocks:16,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:30,dataCodewordsPerBlock:16},{numBlocks:2,dataCodewordsPerBlock:17}]}]},{infoBits:102881,versionNumber:25,alignmentPatternCenters:[6,32,58,84,110],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:106},{numBlocks:4,dataCodewordsPerBlock:107}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:47},{numBlocks:13,\ndataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:24},{numBlocks:22,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:15},{numBlocks:13,dataCodewordsPerBlock:16}]}]},{infoBits:110507,versionNumber:26,alignmentPatternCenters:[6,30,58,86,114],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:114},{numBlocks:2,dataCodewordsPerBlock:115}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:19,\ndataCodewordsPerBlock:46},{numBlocks:4,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:28,dataCodewordsPerBlock:22},{numBlocks:6,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:33,dataCodewordsPerBlock:16},{numBlocks:4,dataCodewordsPerBlock:17}]}]},{infoBits:110734,versionNumber:27,alignmentPatternCenters:[6,34,62,90,118],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:122},{numBlocks:4,dataCodewordsPerBlock:123}]},\n{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:45},{numBlocks:3,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:23},{numBlocks:26,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:15},{numBlocks:28,dataCodewordsPerBlock:16}]}]},{infoBits:117786,versionNumber:28,alignmentPatternCenters:[6,26,50,74,98,122],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:117},\n{numBlocks:10,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:45},{numBlocks:23,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:24},{numBlocks:31,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:15},{numBlocks:31,dataCodewordsPerBlock:16}]}]},{infoBits:119615,versionNumber:29,alignmentPatternCenters:[6,30,54,78,102,126],errorCorrectionLevels:[{ecCodewordsPerBlock:30,\necBlocks:[{numBlocks:7,dataCodewordsPerBlock:116},{numBlocks:7,dataCodewordsPerBlock:117}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:21,dataCodewordsPerBlock:45},{numBlocks:7,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:23},{numBlocks:37,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:15},{numBlocks:26,dataCodewordsPerBlock:16}]}]},{infoBits:126325,versionNumber:30,alignmentPatternCenters:[6,\n26,52,78,104,130],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:115},{numBlocks:10,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:47},{numBlocks:10,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:24},{numBlocks:25,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:23,dataCodewordsPerBlock:15},{numBlocks:25,dataCodewordsPerBlock:16}]}]},\n{infoBits:127568,versionNumber:31,alignmentPatternCenters:[6,30,56,82,108,134],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:115},{numBlocks:3,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:46},{numBlocks:29,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:42,dataCodewordsPerBlock:24},{numBlocks:1,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:23,dataCodewordsPerBlock:15},\n{numBlocks:28,dataCodewordsPerBlock:16}]}]},{infoBits:133589,versionNumber:32,alignmentPatternCenters:[6,34,60,86,112,138],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:115}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:46},{numBlocks:23,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:24},{numBlocks:35,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,\ndataCodewordsPerBlock:15},{numBlocks:35,dataCodewordsPerBlock:16}]}]},{infoBits:136944,versionNumber:33,alignmentPatternCenters:[6,30,58,86,114,142],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:115},{numBlocks:1,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:14,dataCodewordsPerBlock:46},{numBlocks:21,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:29,dataCodewordsPerBlock:24},{numBlocks:19,dataCodewordsPerBlock:25}]},\n{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:15},{numBlocks:46,dataCodewordsPerBlock:16}]}]},{infoBits:141498,versionNumber:34,alignmentPatternCenters:[6,34,62,90,118,146],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:115},{numBlocks:6,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:14,dataCodewordsPerBlock:46},{numBlocks:23,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:44,\ndataCodewordsPerBlock:24},{numBlocks:7,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:59,dataCodewordsPerBlock:16},{numBlocks:1,dataCodewordsPerBlock:17}]}]},{infoBits:145311,versionNumber:35,alignmentPatternCenters:[6,30,54,78,102,126,150],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:121},{numBlocks:7,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:47},{numBlocks:26,dataCodewordsPerBlock:48}]},\n{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:39,dataCodewordsPerBlock:24},{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:15},{numBlocks:41,dataCodewordsPerBlock:16}]}]},{infoBits:150283,versionNumber:36,alignmentPatternCenters:[6,24,50,76,102,128,154],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:121},{numBlocks:14,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,\ndataCodewordsPerBlock:47},{numBlocks:34,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:46,dataCodewordsPerBlock:24},{numBlocks:10,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:15},{numBlocks:64,dataCodewordsPerBlock:16}]}]},{infoBits:152622,versionNumber:37,alignmentPatternCenters:[6,28,54,80,106,132,158],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:122},{numBlocks:4,dataCodewordsPerBlock:123}]},\n{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:29,dataCodewordsPerBlock:46},{numBlocks:14,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:49,dataCodewordsPerBlock:24},{numBlocks:10,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:24,dataCodewordsPerBlock:15},{numBlocks:46,dataCodewordsPerBlock:16}]}]},{infoBits:158308,versionNumber:38,alignmentPatternCenters:[6,32,58,84,110,136,162],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,\ndataCodewordsPerBlock:122},{numBlocks:18,dataCodewordsPerBlock:123}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:46},{numBlocks:32,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:48,dataCodewordsPerBlock:24},{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:42,dataCodewordsPerBlock:15},{numBlocks:32,dataCodewordsPerBlock:16}]}]},{infoBits:161089,versionNumber:39,alignmentPatternCenters:[6,26,54,82,110,138,166],\nerrorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:20,dataCodewordsPerBlock:117},{numBlocks:4,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:40,dataCodewordsPerBlock:47},{numBlocks:7,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:43,dataCodewordsPerBlock:24},{numBlocks:22,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:15},{numBlocks:67,dataCodewordsPerBlock:16}]}]},{infoBits:167017,\nversionNumber:40,alignmentPatternCenters:[6,30,58,86,114,142,170],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:118},{numBlocks:6,dataCodewordsPerBlock:119}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:18,dataCodewordsPerBlock:47},{numBlocks:31,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:34,dataCodewordsPerBlock:24},{numBlocks:34,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:20,dataCodewordsPerBlock:15},\n{numBlocks:61,dataCodewordsPerBlock:16}]}]}];function J(a,b){a^=b;for(b=0;a;)b++,a&=a-1;return b}function K(a,b){return b<<1|a}\nlet ia=[{bits:21522,formatInfo:{errorCorrectionLevel:1,dataMask:0}},{bits:20773,formatInfo:{errorCorrectionLevel:1,dataMask:1}},{bits:24188,formatInfo:{errorCorrectionLevel:1,dataMask:2}},{bits:23371,formatInfo:{errorCorrectionLevel:1,dataMask:3}},{bits:17913,formatInfo:{errorCorrectionLevel:1,dataMask:4}},{bits:16590,formatInfo:{errorCorrectionLevel:1,dataMask:5}},{bits:20375,formatInfo:{errorCorrectionLevel:1,dataMask:6}},{bits:19104,formatInfo:{errorCorrectionLevel:1,dataMask:7}},{bits:30660,formatInfo:{errorCorrectionLevel:0,\ndataMask:0}},{bits:29427,formatInfo:{errorCorrectionLevel:0,dataMask:1}},{bits:32170,formatInfo:{errorCorrectionLevel:0,dataMask:2}},{bits:30877,formatInfo:{errorCorrectionLevel:0,dataMask:3}},{bits:26159,formatInfo:{errorCorrectionLevel:0,dataMask:4}},{bits:25368,formatInfo:{errorCorrectionLevel:0,dataMask:5}},{bits:27713,formatInfo:{errorCorrectionLevel:0,dataMask:6}},{bits:26998,formatInfo:{errorCorrectionLevel:0,dataMask:7}},{bits:5769,formatInfo:{errorCorrectionLevel:3,dataMask:0}},{bits:5054,\nformatInfo:{errorCorrectionLevel:3,dataMask:1}},{bits:7399,formatInfo:{errorCorrectionLevel:3,dataMask:2}},{bits:6608,formatInfo:{errorCorrectionLevel:3,dataMask:3}},{bits:1890,formatInfo:{errorCorrectionLevel:3,dataMask:4}},{bits:597,formatInfo:{errorCorrectionLevel:3,dataMask:5}},{bits:3340,formatInfo:{errorCorrectionLevel:3,dataMask:6}},{bits:2107,formatInfo:{errorCorrectionLevel:3,dataMask:7}},{bits:13663,formatInfo:{errorCorrectionLevel:2,dataMask:0}},{bits:12392,formatInfo:{errorCorrectionLevel:2,\ndataMask:1}},{bits:16177,formatInfo:{errorCorrectionLevel:2,dataMask:2}},{bits:14854,formatInfo:{errorCorrectionLevel:2,dataMask:3}},{bits:9396,formatInfo:{errorCorrectionLevel:2,dataMask:4}},{bits:8579,formatInfo:{errorCorrectionLevel:2,dataMask:5}},{bits:11994,formatInfo:{errorCorrectionLevel:2,dataMask:6}},{bits:11245,formatInfo:{errorCorrectionLevel:2,dataMask:7}}],ja=[a=>0===(a.y+a.x)%2,a=>0===a.y%2,a=>0===a.x%3,a=>0===(a.y+a.x)%3,a=>0===(Math.floor(a.y/2)+Math.floor(a.x/3))%2,a=>0===a.x*a.y%\n2+a.x*a.y%3,a=>0===(a.y*a.x%2+a.y*a.x%3)%2,a=>0===((a.y+a.x)%2+a.y*a.x%3)%2];\nfunction ka(a,b,c){c=ja[c.dataMask];let d=a.height;var e=17+4*b.versionNumber;let f=x.createEmpty(e,e);f.setRegion(0,0,9,9,!0);f.setRegion(e-8,0,8,9,!0);f.setRegion(0,e-8,9,8,!0);for(var g of b.alignmentPatternCenters)for(var h of b.alignmentPatternCenters)6===g&&6===h||6===g&&h===e-7||g===e-7&&6===h||f.setRegion(g-2,h-2,5,5,!0);f.setRegion(6,9,1,e-17,!0);f.setRegion(9,6,e-17,1,!0);6<b.versionNumber&&(f.setRegion(e-11,0,3,6,!0),f.setRegion(0,e-11,6,3,!0));b=[];h=g=0;e=!0;for(let k=d-1;0<k;k-=2){6===\nk&&k--;for(let m=0;m<d;m++){let l=e?d-1-m:m;for(let n=0;2>n;n++){let q=k-n;if(!f.get(q,l)){h++;let r=a.get(q,l);c({y:l,x:q})&&(r=!r);g=g<<1|r;8===h&&(b.push(g),g=h=0)}}}e=!e}return b}\nfunction la(a){var b=a.height,c=Math.floor((b-17)/4);if(6>=c)return I[c-1];c=0;for(var d=5;0<=d;d--)for(var e=b-9;e>=b-11;e--)c=K(a.get(e,d),c);d=0;for(e=5;0<=e;e--)for(let g=b-9;g>=b-11;g--)d=K(a.get(e,g),d);a=Infinity;let f;for(let g of I){if(g.infoBits===c||g.infoBits===d)return g;b=J(c,g.infoBits);b<a&&(f=g,a=b);b=J(d,g.infoBits);b<a&&(f=g,a=b)}if(3>=a)return f}\nfunction ma(a){let b=0;for(var c=0;8>=c;c++)6!==c&&(b=K(a.get(c,8),b));for(c=7;0<=c;c--)6!==c&&(b=K(a.get(8,c),b));var d=a.height;c=0;for(var e=d-1;e>=d-7;e--)c=K(a.get(8,e),c);for(e=d-8;e<d;e++)c=K(a.get(e,8),c);a=Infinity;d=null;for(let {bits:f,formatInfo:g}of ia){if(f===b||f===c)return g;e=J(b,f);e<a&&(d=g,a=e);b!==c&&(e=J(c,f),e<a&&(d=g,a=e))}return 3>=a?d:null}\nfunction na(a,b,c){let d=b.errorCorrectionLevels[c],e=[],f=0;d.ecBlocks.forEach(h=>{for(let k=0;k<h.numBlocks;k++)e.push({numDataCodewords:h.dataCodewordsPerBlock,codewords:[]}),f+=h.dataCodewordsPerBlock+d.ecCodewordsPerBlock});if(a.length<f)return null;a=a.slice(0,f);b=d.ecBlocks[0].dataCodewordsPerBlock;for(c=0;c<b;c++)for(var g of e)g.codewords.push(a.shift());if(1<d.ecBlocks.length)for(g=d.ecBlocks[0].numBlocks,b=d.ecBlocks[1].numBlocks,c=0;c<b;c++)e[g+c].codewords.push(a.shift());for(;0<a.length;)for(let h of e)h.codewords.push(a.shift());\nreturn e}function L(a){let b=la(a);if(!b)return null;var c=ma(a);if(!c)return null;a=ka(a,b,c);var d=na(a,b,c.errorCorrectionLevel);if(!d)return null;c=d.reduce((e,f)=>e+f.numDataCodewords,0);c=new Uint8ClampedArray(c);a=0;for(let e of d){d=ha(e.codewords,e.codewords.length-e.numDataCodewords);if(!d)return null;for(let f=0;f<e.numDataCodewords;f++)c[a++]=d[f]}try{return da(c,b.versionNumber)}catch(e){return null}}\nfunction M(a,b,c,d){var e=a.x-b.x+c.x-d.x;let f=a.y-b.y+c.y-d.y;if(0===e&&0===f)return{a11:b.x-a.x,a12:b.y-a.y,a13:0,a21:c.x-b.x,a22:c.y-b.y,a23:0,a31:a.x,a32:a.y,a33:1};let g=b.x-c.x;var h=d.x-c.x;let k=b.y-c.y,m=d.y-c.y;c=g*m-h*k;h=(e*m-h*f)/c;e=(g*f-e*k)/c;return{a11:b.x-a.x+h*b.x,a12:b.y-a.y+h*b.y,a13:h,a21:d.x-a.x+e*d.x,a22:d.y-a.y+e*d.y,a23:e,a31:a.x,a32:a.y,a33:1}}\nfunction oa(a,b,c,d){a=M(a,b,c,d);return{a11:a.a22*a.a33-a.a23*a.a32,a12:a.a13*a.a32-a.a12*a.a33,a13:a.a12*a.a23-a.a13*a.a22,a21:a.a23*a.a31-a.a21*a.a33,a22:a.a11*a.a33-a.a13*a.a31,a23:a.a13*a.a21-a.a11*a.a23,a31:a.a21*a.a32-a.a22*a.a31,a32:a.a12*a.a31-a.a11*a.a32,a33:a.a11*a.a22-a.a12*a.a21}}\nfunction pa(a,b){var c=oa({x:3.5,y:3.5},{x:b.dimension-3.5,y:3.5},{x:b.dimension-6.5,y:b.dimension-6.5},{x:3.5,y:b.dimension-3.5}),d=M(b.topLeft,b.topRight,b.alignmentPattern,b.bottomLeft),e=d.a11*c.a11+d.a21*c.a12+d.a31*c.a13,f=d.a12*c.a11+d.a22*c.a12+d.a32*c.a13,g=d.a13*c.a11+d.a23*c.a12+d.a33*c.a13,h=d.a11*c.a21+d.a21*c.a22+d.a31*c.a23,k=d.a12*c.a21+d.a22*c.a22+d.a32*c.a23,m=d.a13*c.a21+d.a23*c.a22+d.a33*c.a23,l=d.a11*c.a31+d.a21*c.a32+d.a31*c.a33,n=d.a12*c.a31+d.a22*c.a32+d.a32*c.a33,q=d.a13*\nc.a31+d.a23*c.a32+d.a33*c.a33;c=x.createEmpty(b.dimension,b.dimension);d=(r,u)=>{const p=g*r+m*u+q;return{x:(e*r+h*u+l)/p,y:(f*r+k*u+n)/p}};for(let r=0;r<b.dimension;r++)for(let u=0;u<b.dimension;u++){let p=d(u+.5,r+.5);c.set(u,r,a.get(Math.floor(p.x),Math.floor(p.y)))}return{matrix:c,mappingFunction:d}}let N=(a,b)=>Math.sqrt(Math.pow(b.x-a.x,2)+Math.pow(b.y-a.y,2));function O(a){return a.reduce((b,c)=>b+c)}\nfunction qa(a,b,c){let d=N(a,b),e=N(b,c),f=N(a,c),g,h,k;e>=d&&e>=f?[g,h,k]=[b,a,c]:f>=e&&f>=d?[g,h,k]=[a,b,c]:[g,h,k]=[a,c,b];0>(k.x-h.x)*(g.y-h.y)-(k.y-h.y)*(g.x-h.x)&&([g,k]=[k,g]);return{bottomLeft:g,topLeft:h,topRight:k}}\nfunction ra(a,b,c,d){d=(O(P(a,c,d,5))/7+O(P(a,b,d,5))/7+O(P(c,a,d,5))/7+O(P(b,a,d,5))/7)/4;if(1>d)throw Error(\"Invalid module size\");b=Math.round(N(a,b)/d);a=Math.round(N(a,c)/d);a=Math.floor((b+a)/2)+7;switch(a%4){case 0:a++;break;case 2:a--}return{dimension:a,moduleSize:d}}\nfunction Q(a,b,c,d){let e=[{x:Math.floor(a.x),y:Math.floor(a.y)}];var f=Math.abs(b.y-a.y)>Math.abs(b.x-a.x);if(f){var g=Math.floor(a.y);var h=Math.floor(a.x);a=Math.floor(b.y);b=Math.floor(b.x)}else g=Math.floor(a.x),h=Math.floor(a.y),a=Math.floor(b.x),b=Math.floor(b.y);let k=Math.abs(a-g),m=Math.abs(b-h),l=Math.floor(-k/2),n=g<a?1:-1,q=h<b?1:-1,r=!0;for(let u=g,p=h;u!==a+n;u+=n){g=f?p:u;h=f?u:p;if(c.get(g,h)!==r&&(r=!r,e.push({x:g,y:h}),e.length===d+1))break;l+=m;if(0<l){if(p===b)break;p+=q;l-=k}}c=\n[];for(f=0;f<d;f++)e[f]&&e[f+1]?c.push(N(e[f],e[f+1])):c.push(0);return c}function P(a,b,c,d){let e=b.y-a.y,f=b.x-a.x;b=Q(a,b,c,Math.ceil(d/2));a=Q(a,{x:a.x-f,y:a.y-e},c,Math.ceil(d/2));c=b.shift()+a.shift()-1;return a.concat(c).concat(...b)}function R(a,b){let c=O(a)/O(b),d=0;b.forEach((e,f)=>{d+=Math.pow(a[f]-e*c,2)});return{averageSize:c,error:d}}\nfunction S(a,b,c){try{let d=P(a,{x:-1,y:a.y},c,b.length),e=P(a,{x:a.x,y:-1},c,b.length),f=P(a,{x:Math.max(0,a.x-a.y)-1,y:Math.max(0,a.y-a.x)-1},c,b.length),g=P(a,{x:Math.min(c.width,a.x+a.y)+1,y:Math.min(c.height,a.y+a.x)+1},c,b.length),h=R(d,b),k=R(e,b),m=R(f,b),l=R(g,b),n=(h.averageSize+k.averageSize+m.averageSize+l.averageSize)/4;return Math.sqrt(h.error*h.error+k.error*k.error+m.error*m.error+l.error*l.error)+(Math.pow(h.averageSize-n,2)+Math.pow(k.averageSize-n,2)+Math.pow(m.averageSize-n,2)+\nMath.pow(l.averageSize-n,2))/n}catch(d){return Infinity}}function T(a,b){for(var c=Math.round(b.x);a.get(c,Math.round(b.y));)c--;for(var d=Math.round(b.x);a.get(d,Math.round(b.y));)d++;c=(c+d)/2;for(d=Math.round(b.y);a.get(Math.round(c),d);)d--;for(b=Math.round(b.y);a.get(Math.round(c),b);)b++;return{x:c,y:(d+b)/2}}\nfunction sa(a){var b=[],c=[];let d=[];var e=[];for(let p=0;p<=a.height;p++){var f=0,g=!1;let t=[0,0,0,0,0];for(let v=-1;v<=a.width;v++){var h=a.get(v,p);if(h===g)f++;else{t=[t[1],t[2],t[3],t[4],f];f=1;g=h;var k=O(t)/7;k=Math.abs(t[0]-k)<k&&Math.abs(t[1]-k)<k&&Math.abs(t[2]-3*k)<3*k&&Math.abs(t[3]-k)<k&&Math.abs(t[4]-k)<k&&!h;var m=O(t.slice(-3))/3;h=Math.abs(t[2]-m)<m&&Math.abs(t[3]-m)<m&&Math.abs(t[4]-m)<m&&h;if(k){let z=v-t[3]-t[4],y=z-t[2];k={startX:y,endX:z,y:p};m=c.filter(w=>y>=w.bottom.startX&&\ny<=w.bottom.endX||z>=w.bottom.startX&&y<=w.bottom.endX||y<=w.bottom.startX&&z>=w.bottom.endX&&1.5>t[2]/(w.bottom.endX-w.bottom.startX)&&.5<t[2]/(w.bottom.endX-w.bottom.startX));0<m.length?m[0].bottom=k:c.push({top:k,bottom:k})}if(h){let z=v-t[4],y=z-t[3];h={startX:y,y:p,endX:z};k=e.filter(w=>y>=w.bottom.startX&&y<=w.bottom.endX||z>=w.bottom.startX&&y<=w.bottom.endX||y<=w.bottom.startX&&z>=w.bottom.endX&&1.5>t[2]/(w.bottom.endX-w.bottom.startX)&&.5<t[2]/(w.bottom.endX-w.bottom.startX));0<k.length?\nk[0].bottom=h:e.push({top:h,bottom:h})}}}b.push(...c.filter(v=>v.bottom.y!==p&&2<=v.bottom.y-v.top.y));c=c.filter(v=>v.bottom.y===p);d.push(...e.filter(v=>v.bottom.y!==p));e=e.filter(v=>v.bottom.y===p)}b.push(...c.filter(p=>2<=p.bottom.y-p.top.y));d.push(...e);c=[];for(var l of b)2>l.bottom.y-l.top.y||(b=(l.top.startX+l.top.endX+l.bottom.startX+l.bottom.endX)/4,e=(l.top.y+l.bottom.y+1)/2,a.get(Math.round(b),Math.round(e))&&(f=[l.top.endX-l.top.startX,l.bottom.endX-l.bottom.startX,l.bottom.y-l.top.y+\n1],f=O(f)/f.length,g=S({x:Math.round(b),y:Math.round(e)},[1,1,3,1,1],a),c.push({score:g,x:b,y:e,size:f})));if(3>c.length)return null;c.sort((p,t)=>p.score-t.score);l=[];for(b=0;b<Math.min(c.length,5);++b){e=c[b];f=[];for(var n of c)n!==e&&f.push(Object.assign(Object.assign({},n),{score:n.score+Math.pow(n.size-e.size,2)/e.size}));f.sort((p,t)=>p.score-t.score);l.push({points:[e,f[0],f[1]],score:e.score+f[0].score+f[1].score})}l.sort((p,t)=>p.score-t.score);let {topRight:q,topLeft:r,bottomLeft:u}=qa(...l[0].points);\nl=U(a,d,q,r,u);n=[];l&&n.push({alignmentPattern:{x:l.alignmentPattern.x,y:l.alignmentPattern.y},bottomLeft:{x:u.x,y:u.y},dimension:l.dimension,topLeft:{x:r.x,y:r.y},topRight:{x:q.x,y:q.y}});l=T(a,q);b=T(a,r);c=T(a,u);(a=U(a,d,l,b,c))&&n.push({alignmentPattern:{x:a.alignmentPattern.x,y:a.alignmentPattern.y},bottomLeft:{x:c.x,y:c.y},topLeft:{x:b.x,y:b.y},topRight:{x:l.x,y:l.y},dimension:a.dimension});return 0===n.length?null:n}\nfunction U(a,b,c,d,e){let f,g;try{({dimension:f,moduleSize:g}=ra(d,c,e,a))}catch(l){return null}var h=c.x-d.x+e.x,k=c.y-d.y+e.y;c=(N(d,e)+N(d,c))/2/g;e=1-3/c;let m={x:d.x+e*(h-d.x),y:d.y+e*(k-d.y)};b=b.map(l=>{const n=(l.top.startX+l.top.endX+l.bottom.startX+l.bottom.endX)/4;l=(l.top.y+l.bottom.y+1)/2;if(a.get(Math.floor(n),Math.floor(l))){var q=S({x:Math.floor(n),y:Math.floor(l)},[1,1,1],a)+N({x:n,y:l},m);return{x:n,y:l,score:q}}}).filter(l=>!!l).sort((l,n)=>l.score-n.score);return{alignmentPattern:15<=\nc&&b.length?b[0]:m,dimension:f}}\nfunction V(a){var b=sa(a);if(!b)return null;for(let e of b){b=pa(a,e);var c=b.matrix;if(null==c)c=null;else{var d=L(c);if(d)c=d;else{for(d=0;d<c.width;d++)for(let f=d+1;f<c.height;f++)c.get(d,f)!==c.get(f,d)&&(c.set(d,f,!c.get(d,f)),c.set(f,d,!c.get(f,d)));c=L(c)}}if(c)return{binaryData:c.bytes,data:c.text,chunks:c.chunks,version:c.version,location:{topRightCorner:b.mappingFunction(e.dimension,0),topLeftCorner:b.mappingFunction(0,0),bottomRightCorner:b.mappingFunction(e.dimension,e.dimension),bottomLeftCorner:b.mappingFunction(0,\ne.dimension),topRightFinderPattern:e.topRight,topLeftFinderPattern:e.topLeft,bottomLeftFinderPattern:e.bottomLeft,bottomRightAlignmentPattern:e.alignmentPattern},matrix:b.matrix}}return null}let ta={inversionAttempts:\"attemptBoth\",greyScaleWeights:{red:.2126,green:.7152,blue:.0722,useIntegerApproximation:!1},canOverwriteImage:!0};function W(a,b){Object.keys(b).forEach(c=>{a[c]=b[c]})}\nfunction X(a,b,c,d={}){let e=Object.create(null);W(e,ta);W(e,d);d=\"onlyInvert\"===e.inversionAttempts||\"invertFirst\"===e.inversionAttempts;var f=\"attemptBoth\"===e.inversionAttempts||d;var g=e.greyScaleWeights,h=e.canOverwriteImage,k=b*c;if(a.length!==4*k)throw Error(\"Malformed data passed to binarizer.\");var m=0;if(h){var l=new Uint8ClampedArray(a.buffer,m,k);m+=k}l=new A(b,c,l);if(g.useIntegerApproximation)for(var n=0;n<c;n++)for(var q=0;q<b;q++){var r=4*(n*b+q);l.set(q,n,g.red*a[r]+g.green*a[r+1]+\ng.blue*a[r+2]+128>>8)}else for(n=0;n<c;n++)for(q=0;q<b;q++)r=4*(n*b+q),l.set(q,n,g.red*a[r]+g.green*a[r+1]+g.blue*a[r+2]);g=Math.ceil(b/8);n=Math.ceil(c/8);q=g*n;if(h){var u=new Uint8ClampedArray(a.buffer,m,q);m+=q}u=new A(g,n,u);for(q=0;q<n;q++)for(r=0;r<g;r++){var p=Infinity,t=0;for(var v=0;8>v;v++)for(let w=0;8>w;w++){let aa=l.get(8*r+w,8*q+v);p=Math.min(p,aa);t=Math.max(t,aa)}v=(p+t)/2;v=Math.min(255,1.11*v);24>=t-p&&(v=p/2,0<q&&0<r&&(t=(u.get(r,q-1)+2*u.get(r-1,q)+u.get(r-1,q-1))/4,p<t&&(v=t)));\nu.set(r,q,v)}h?(q=new Uint8ClampedArray(a.buffer,m,k),m+=k,q=new x(q,b)):q=x.createEmpty(b,c);r=null;f&&(h?(a=new Uint8ClampedArray(a.buffer,m,k),r=new x(a,b)):r=x.createEmpty(b,c));for(b=0;b<n;b++)for(a=0;a<g;a++){c=g-3;c=2>a?2:a>c?c:a;h=n-3;h=2>b?2:b>h?h:b;k=0;for(m=-2;2>=m;m++)for(p=-2;2>=p;p++)k+=u.get(c+m,h+p);c=k/25;for(h=0;8>h;h++)for(k=0;8>k;k++)m=8*a+h,p=8*b+k,t=l.get(m,p),q.set(m,p,t<=c),f&&r.set(m,p,!(t<=c))}f=f?{binarized:q,inverted:r}:{binarized:q};let {binarized:z,inverted:y}=f;(f=V(d?\ny:z))||\"attemptBoth\"!==e.inversionAttempts&&\"invertFirst\"!==e.inversionAttempts||(f=V(d?z:y));return f}X.default=X;let Y=\"dontInvert\",Z={red:77,green:150,blue:29,useIntegerApproximation:!0};\nself.onmessage=a=>{let b=a.data.id,c=a.data.data;switch(a.data.type){case \"decode\":(a=X(c.data,c.width,c.height,{inversionAttempts:Y,greyScaleWeights:Z}))?self.postMessage({id:b,type:\"qrResult\",data:a.data,cornerPoints:[a.location.topLeftCorner,a.location.topRightCorner,a.location.bottomRightCorner,a.location.bottomLeftCorner]}):self.postMessage({id:b,type:\"qrResult\",data:null});break;case \"grayscaleWeights\":Z.red=c.red;Z.green=c.green;Z.blue=c.blue;Z.useIntegerApproximation=c.useIntegerApproximation;\nbreak;case \"inversionMode\":switch(c){case \"original\":Y=\"dontInvert\";break;case \"invert\":Y=\"onlyInvert\";break;case \"both\":Y=\"attemptBoth\";break;default:throw Error(\"Invalid inversion mode\");}break;case \"close\":self.close()}}\n`]),{type:`application/javascript`}))});return e})})),z=c(L(),1),B=c(R(),1);self.window=self,self.Image=self.HTMLVideoElement=self.HTMLCanvasElement=self.SVGImageElement=class{};let V=B.default.createQrEngine();B.default._postWorkerMessage(V,`inversionMode`,`both`);let H=new OffscreenCanvas(0,0);H._getContext=H.getContext,H.getContext=function(...e){return e[1]&&(e[1].willReadFrequently=!0),this._getContext(...e)};let U=[/^https:\\/\\/[^.]+\\.fanbox\\.cc/,/^https:\\/\\/twitter\\.com/,/^https:\\/\\/x\\.com/,/^https:\\/\\/fantia\\.jp/,/^https:\\/\\/marshmallow-qa\\.com/,/^https:\\/\\/www\\.dlsite\\.com/,/^https:\\/\\/hitomi\\.la/,/^https:\\/\\/www\\.dmm\\.co\\.jp/],W=async e=>{try{let t=(await B.default.scanImage(await createImageBitmap(new Blob([e])),{qrEngine:V,canvas:H})).data;if(t)return U.every(e=>!e.test(t))}catch{}return!1},G=async(e,t,n=new Set)=>{let r=e.length-1,i=0;for(;r>=e.length-10&&!(r<=2);r--){if(n.has(r))continue;let a=e[r];if(!a)break;if(await t(a))n.add(r);else if(i>=2)break;else i+=1}let a=0;for(r=Math.min(...n);r<e.length;r++){if(n.has(r)){a+=1;continue}a>=2||n.has(r-1)&&n.has(r+1)?n.add(r):a=0}return n};_(class{zip=new z.default;adRemoved=!1;file({name:e,data:t}){this.zip.file(e,t)}files(e){e.forEach(({name:e,data:t})=>{this.zip.file(e,t)})}async unzipFile({data:e,path:t,type:n}){return(await z.default.loadAsync(e)).file(t)?.async(n)}async generateAsync(e,t){e?.removeAdPage&&await this.removeAd();let n=await this.zip.generateAsync({...e,type:`uint8array`},t);return j(n,[n.buffer])}async generateStream(e,t,n){e?.removeAdPage&&await this.removeAd();let r=this.zip.generateInternalStream({...e,type:`uint8array`}),i=new ReadableStream({start:e=>{r.on(`error`,t=>{e.error(t),n?.()}),r.on(`end`,()=>{setTimeout(()=>{e.close(),n?.()})}),r.on(`data`,(n,r)=>{e.enqueue(n),t?.(r)}),r.resume()}});return j({zipStream:i},[i])}async removeAd(){if(this.adRemoved)return;let e=[];Object.values(this.zip.files).forEach(t=>{let n=parseInt(t.name);Number.isNaN(n)||e.push({i:n,obj:t})}),e.sort((e,t)=>e.i-t.i);try{let t=await G(e,async({obj:e})=>W(await e._data));if(!t.size){console.log(`[nhentai-helper] no ad pages detected`);return}let n=[...t.values()].map(t=>e[t].obj);console.log(`[nhentai-helper] ad pages detected:`,...n.map(e=>e.name)),n.forEach(e=>{this.zip.remove(e.name)})}catch(e){console.error(`[nhentai-helper] remove ad page`,e)}}})})();";
	var blob$1 = typeof self !== "undefined" && self.Blob && new Blob(["(self.URL || self.webkitURL).revokeObjectURL(self.location.href);", jsContent$1], { type: "text/javascript;charset=utf-8" });
	function WorkerWrapper$1(options) {
		let objURL;
		try {
			objURL = blob$1 && (self.URL || self.webkitURL).createObjectURL(blob$1);
			if (!objURL) throw "";
			const worker = new Worker(objURL, { name: options?.name });
			worker.addEventListener("error", () => {
				(self.URL || self.webkitURL).revokeObjectURL(objURL);
			});
			return worker;
		} catch (e) {
			return new Worker("data:text/javascript;charset=utf-8," + encodeURIComponent(jsContent$1), { name: options?.name });
		}
	}
	var getTransferableData = (files) => files.map(({ data }) => data).filter((data) => typeof data !== "string");
	var JSZipWorkerPool = class {
		pool = [];
		waitingQueue = [];
		constructor() {
			for (let id = 0; id < WORKER_THREAD_NUM; id++) this.pool.push({
				id,
				idle: true
			});
		}
		async generateAsync(files, options, onUpdate) {
			const worker = await this.acquireWorker();
			const zip = await new worker.JSZip();
			try {
				await zip.files(transfer(files, getTransferableData(files)));
				return await zip.generateAsync(options, proxy((metaData) => {
					if (metaData.currentFile) onUpdate?.({
						workerId: worker.id,
						...metaData
					});
				}));
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
				const { zipStream } = await zip.generateStream(options, proxy((metaData) => {
					if (metaData.currentFile) onUpdate?.({
						workerId: worker.id,
						...metaData
					});
				}));
				return zipStream;
			} finally {
				zip[releaseProxy]();
				this.releaseWorker(worker);
			}
		}
		unzipFile = async (params) => {
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
			if (!worker) worker = await this.waitIdleWorker();
			if (!worker.JSZip) worker.JSZip = await this.createWorker();
			worker.idle = false;
			return worker;
		}
		releaseWorker(worker) {
			worker.idle = true;
			if (!this.waitingQueue.length) return;
			removeAt(this.waitingQueue, 0)(worker);
		}
	};
	var jszipPool = new JSZipWorkerPool();
	var JSZip = class {
		files = [];
		static unzipFile = (params) => jszipPool.unzipFile(params);
		file(name, data) {
			this.files.push({
				name,
				data
			});
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
	};
	var DownloadHistory = class {
		name;
		store;
		ready;
		constructor(name) {
			this.name = name;
			this.store = import_localforage.default.createInstance({
				name: IDB_NAME,
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
				logger.debug(`mark "${key}" as downloaded`);
			} catch (e) {
				logger.error(e);
			}
		}
		async del(key) {
			if (!await this.ready) return;
			try {
				await this.store.removeItem(key);
				logger.debug(`unmark "${key}" as downloaded`);
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
		async import(keys) {
			if (!await this.ready) throw new Error(`store ${this.name} cannot ready`);
			try {
				await this.store.setItems(keys.map((gid) => ({
					key: gid,
					value: true
				})));
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
	};
	var gidHistory = new DownloadHistory("dl_history_gid");
	var enTitleHistory = new DownloadHistory("dl_history_en");
	var jpTitleHistory = new DownloadHistory("dl_history");
	var prettyTitleHistory = new DownloadHistory("dl_history_pretty");
	var normalizeTitle = (title) => title.replace(/\s/g, "");
	var getTitleMd5 = (title) => (0, import_md5.default)(normalizeTitle(title));
	var markAsDownloaded = (gid, { english, japanese, pretty } = {}) => {
		gidHistory.add(String(gid));
		if (english) enTitleHistory.add(getTitleMd5(english));
		if (japanese) jpTitleHistory.add(getTitleMd5(japanese));
		if (pretty) prettyTitleHistory.add(getTitleMd5(pretty));
		logger.debug("mark as downloaded", {
			gid,
			english,
			japanese,
			pretty
		});
	};
	var unmarkAsDownloaded = (gid, { english, japanese, pretty } = {}) => {
		gidHistory.del(String(gid));
		if (english) enTitleHistory.del(getTitleMd5(english));
		if (japanese) jpTitleHistory.del(getTitleMd5(japanese));
		if (pretty) prettyTitleHistory.del(getTitleMd5(pretty));
		logger.debug("unmark as downloaded", {
			gid,
			english,
			japanese,
			pretty
		});
	};
	var isDownloadedByGid = (gid) => gidHistory.has(String(gid));
	var isDownloadedByTitle = async ({ english, japanese, pretty } = {}) => {
		if (settings.judgeDownloadedByJapanese && japanese) {
			const md5v2 = getTitleMd5(japanese);
			if (await jpTitleHistory.has(md5v2)) return true;
			const md5v1 = (0, import_md5.default)(japanese);
			if (await jpTitleHistory.has(md5v1)) {
				jpTitleHistory.add(md5v2);
				jpTitleHistory.del(md5v1);
				return true;
			}
		}
		if (settings.judgeDownloadedByEnglish && english && await enTitleHistory.has(getTitleMd5(english))) return true;
		if (settings.judgeDownloadedByPretty && pretty && await enTitleHistory.has(getTitleMd5(pretty))) return true;
		return false;
	};
	var getDownloadNumber = () => gidHistory.size();
	var EXPORT_HEADER_GID = "gid:";
	var EXPORT_HEADER_TITLE_JP = "title:";
	var EXPORT_HEADER_TITLE_EN = "title_en:";
	var EXPORT_HEADER_TITLE_PRETTY = "title_pretty:";
	var EXPORT_SEPARATOR = ",";
	var EXPORT_TEXT_FILENAME = "history.txt";
	var exportDownloadHistory = async () => {
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
			const filename = `nhentai-helper-download-history-${dateTimeFormatter.format(Date.now()).replace(/\D/g, "")}.zip`;
			(0, import_FileSaver_min.saveAs)(new File([data], filename, { type: "application/zip" }));
			logger.info("export download history", filename);
			return true;
		} catch (error) {
			logger.error(error);
		}
		return false;
	};
	var importDownloadHistory = async (data) => {
		try {
			const str = await JSZip.unzipFile({
				data,
				path: EXPORT_TEXT_FILENAME,
				type: "string"
			});
			if (!str) {
				logger.error("zip doesn't contain file", EXPORT_TEXT_FILENAME);
				return false;
			}
			const lines = str.split("\n");
			for (const line of lines) if (line.startsWith(EXPORT_HEADER_GID)) {
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
			return true;
		} catch (error) {
			logger.error(error);
		}
		return false;
	};
	var clearDownloadHistory = async () => {
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
	var isSameTitleString = (title1, title2) => !!title1 && !!title2 && normalizeTitle(title1) === normalizeTitle(title2);
	var isSameTitle = (title1, title2) => {
		if (settings.judgeDownloadedByJapanese && isSameTitleString(title1.japanese, title2.japanese)) return true;
		if (settings.judgeDownloadedByEnglish && isSameTitleString(title1.english, title2.english)) return true;
		if (settings.judgeDownloadedByPretty && isSameTitleString(title1.pretty, title2.pretty)) return true;
		return false;
	};
	var isSSR = () => typeof _nano !== "undefined" && _nano.isSSR === true;
	var tick = Promise.prototype.then.bind(Promise.resolve());
	var strToHash = (s) => {
		let hash = 0;
		for (let i = 0; i < s.length; i++) {
			const chr = s.charCodeAt(i);
			hash = (hash << 5) - hash + chr;
			hash |= 0;
		}
		return Math.abs(hash).toString(32);
	};
	var appendChildren = (element, children, escape = true) => {
		if (!Array.isArray(children)) {
			appendChildren(element, [children], escape);
			return;
		}
		if (typeof children === "object") children = Array.prototype.slice.call(children);
		children.forEach((child) => {
			if (Array.isArray(child)) appendChildren(element, child, escape);
			else {
				const c = _render(child);
				if (typeof c !== "undefined") if (Array.isArray(c)) appendChildren(element, c, escape);
				else if (isSSR() && !escape) element.appendChild(c.nodeType == null ? c.toString() : c);
				else element.appendChild(c.nodeType == null ? document.createTextNode(c.toString()) : c);
			}
		});
	};
	var SVG = (props) => {
		const child = props.children[0];
		const attrs = child.attributes;
		if (isSSR()) return child;
		const svg = hNS("svg");
		for (let i = attrs.length - 1; i >= 0; i--) svg.setAttribute(attrs[i].name, attrs[i].value);
		svg.innerHTML = child.innerHTML;
		return svg;
	};
	var _render = (comp) => {
		if (comp === null || comp === false || typeof comp === "undefined") return [];
		if (typeof comp === "string" || typeof comp === "number") return comp.toString();
		if (comp.tagName && comp.tagName.toLowerCase() === "svg") return SVG({ children: [comp] });
		if (comp.tagName) return comp;
		if (comp && comp.nodeType === 3) return comp;
		if (comp && comp.component && comp.component.isClass) return renderClassComponent(comp);
		if (comp.isClass) return renderClassComponent({
			component: comp,
			props: {}
		});
		if (comp.component && typeof comp.component === "function") return renderFunctionalComponent(comp);
		if (Array.isArray(comp)) return comp.map((c) => _render(c)).flat();
		if (typeof comp === "function" && !comp.isClass) return _render(comp());
		if (comp.component && comp.component.tagName && typeof comp.component.tagName === "string") return _render(comp.component);
		if (Array.isArray(comp.component)) return _render(comp.component);
		if (comp.component) return _render(comp.component);
		if (typeof comp === "object") return [];
		console.warn("Something unexpected happened with:", comp);
	};
	var renderFunctionalComponent = (fncComp) => {
		const { component, props } = fncComp;
		return _render(component(props));
	};
	var renderClassComponent = (classComp) => {
		const { component, props } = classComp;
		const hash = strToHash(component.toString());
		component.prototype._getHash = () => hash;
		const Component = new component(props);
		if (!isSSR()) Component.willMount();
		let el = Component.render();
		el = _render(el);
		Component.elements = el;
		if (props && props.ref) props.ref(Component);
		if (!isSSR()) tick(() => {
			Component._didMount();
		});
		return el;
	};
	var hNS = (tag) => document.createElementNS("http://www.w3.org/2000/svg", tag);
	var h$1 = (tagNameOrComponent, props = {}, ...children) => {
		if (props && props.children) if (Array.isArray(children)) if (Array.isArray(props.children)) children = [...props.children, ...children];
		else children.push(props.children);
		else if (Array.isArray(props.children)) children = props.children;
		else children = [props.children];
		if (isSSR() && _nano.ssrTricks.isWebComponent(tagNameOrComponent)) {
			const element = _nano.ssrTricks.renderWebComponent(tagNameOrComponent, props, children, _render);
			if (element === null) return `ERROR: "<${tagNameOrComponent} />"`;
			else return element;
		}
		if (typeof tagNameOrComponent !== "string") return {
			component: tagNameOrComponent,
			props: {
				...props,
				children
			}
		};
		try {
			if (isSSR() && typeof tagNameOrComponent === "string" && !document) throw new Error("document is not defined");
		} catch (err) {
			console.log("ERROR:", err.message, "\n > Please read: https://github.com/nanojsx/nano/issues/106");
		}
		let ref;
		const element = tagNameOrComponent === "svg" ? hNS("svg") : document.createElement(tagNameOrComponent);
		const isEvent = (el, p) => {
			if (0 !== p.indexOf("on")) return false;
			if (el._ssr) return true;
			return typeof el[p] === "object" || typeof el[p] === "function";
		};
		for (const p in props) {
			if (p === "style" && typeof props[p] === "object") props[p] = `${Object.keys(props[p]).map((k) => {
				return `${k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}:${props[p][k]}`;
			}).join(";")};`;
			if (p === "ref") ref = props[p];
			else if (isEvent(element, p.toLowerCase())) element.addEventListener(p.toLowerCase().substring(2), (e) => props[p](e));
			else if (p === "dangerouslySetInnerHTML" && props[p].__html) if (!isSSR()) {
				const fragment = document.createElement("fragment");
				fragment.innerHTML = props[p].__html;
				element.appendChild(fragment);
			} else element.innerHTML = props[p].__html;
			else if (p === "innerHTML" && props[p].__dangerousHtml) if (!isSSR()) {
				const fragment = document.createElement("fragment");
				fragment.innerHTML = props[p].__dangerousHtml;
				element.appendChild(fragment);
			} else element.innerHTML = props[p].__dangerousHtml;
			else if (/^className$/i.test(p)) element.setAttribute("class", props[p]);
			else if (typeof props[p] !== "undefined") element.setAttribute(p, props[p]);
		}
		const escape = ![
			"noscript",
			"script",
			"style"
		].includes(tagNameOrComponent);
		appendChildren(element, children, escape);
		if (ref) ref(element);
		return element;
	};
	var createNode = function(type, props) {
		let { children = [], ..._props } = props;
		if (!Array.isArray(children)) children = [children];
		return h$1(type, _props, ...children);
	};
	var readFile = (file) => new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			resolve(reader.result);
		};
		reader.onabort = reject;
		reader.onerror = reject;
		reader.readAsArrayBuffer(file);
	});
	var pickFile = (accept) => new Promise((resolve) => {
		const input = createNode("input", {
			type: "file",
			accept,
			onChange: () => {
				resolve(input.files?.[0]);
			}
		});
		input.click();
	});
	var pickAndReadFile = async (accept) => {
		const file = await pickFile(accept);
		if (file) return readFile(file);
	};
	var _hoisted_1$6 = { class: "no-sl" };
	var _hoisted_2$3 = { class: "no-sl" };
	var DownloadHistory_default = (0, vue.defineComponent)({
		__name: "DownloadHistory",
		setup(__props) {
			const { t } = useI18n();
			const downloadedNum = (0, vue.ref)(NaN);
			const exporting = (0, vue.ref)(false);
			const importing = (0, vue.ref)(false);
			const clearing = (0, vue.ref)(false);
			const refreshDownloadNum = async () => {
				downloadedNum.value = await getDownloadNumber();
			};
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
			(0, vue.onMounted)(() => {
				refreshDownloadNum();
			});
			return (_ctx, _cache) => {
				return (0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, null, [
					(0, vue.createVNode)((0, vue.unref)(element_plus.ElDivider), null, {
						default: (0, vue.withCtx)(() => [(0, vue.createTextVNode)((0, vue.toDisplayString)((0, vue.unref)(t)("setting.history.title")), 1)]),
						_: 1
					}),
					(0, vue.createElementVNode)("p", _hoisted_1$6, (0, vue.toDisplayString)((0, vue.unref)(t)("setting.history.downloadedNumberTip", { num: Number.isNaN(downloadedNum.value) ? downloadedNum.value : (0, vue.unref)(numberFormatter).format(downloadedNum.value) })), 1),
					(0, vue.createVNode)((0, vue.unref)(element_plus.ElButton), {
						type: "primary",
						icon: (0, vue.unref)(download_default),
						disabled: !downloadedNum.value,
						loading: exporting.value,
						onClick: exportHistory
					}, {
						default: (0, vue.withCtx)(() => [(0, vue.createTextVNode)((0, vue.toDisplayString)((0, vue.unref)(t)("setting.history.export")), 1)]),
						_: 1
					}, 8, [
						"icon",
						"disabled",
						"loading"
					]),
					(0, vue.createVNode)((0, vue.unref)(element_plus.ElButton), {
						type: "primary",
						icon: (0, vue.unref)(upload_default),
						loading: importing.value,
						onClick: importHistory
					}, {
						default: (0, vue.withCtx)(() => [(0, vue.createTextVNode)((0, vue.toDisplayString)((0, vue.unref)(t)("setting.history.import")), 1)]),
						_: 1
					}, 8, ["icon", "loading"]),
					(0, vue.createVNode)(ConfirmPopup_default, { onConfirm: clearHistory }, {
						default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElButton), {
							type: "danger",
							icon: (0, vue.unref)(delete_default),
							loading: clearing.value
						}, {
							default: (0, vue.withCtx)(() => [(0, vue.createTextVNode)((0, vue.toDisplayString)((0, vue.unref)(t)("setting.history.clear")), 1)]),
							_: 1
						}, 8, ["icon", "loading"])]),
						_: 1
					}),
					(0, vue.createElementVNode)("p", _hoisted_2$3, (0, vue.toDisplayString)((0, vue.unref)(t)("setting.history.importTip")), 1)
				], 64);
			};
		}
	});
	var MetaFile_default = (0, vue.defineComponent)({
		__name: "MetaFile",
		setup(__props) {
			const { t } = useI18n();
			const comicInfoTagsExtraIncludeOptions = [
				"parody",
				"character",
				"artist",
				"group",
				"language",
				"category"
			];
			const comicInfoTagsExtraIncludeOptionsSet = new Set(comicInfoTagsExtraIncludeOptions);
			const resetComicInfoTagsExtraIncludeToDefault = () => {
				writeableSettings.comicInfoTagsExtraInclude = settingDefinitions.comicInfoTagsExtraInclude.default();
			};
			return (_ctx, _cache) => {
				return (0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, null, [(0, vue.createVNode)((0, vue.unref)(element_plus.ElFormItem), { label: (0, vue.unref)(t)("setting.addMetaFile") }, {
					default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElCheckboxGroup), {
						modelValue: (0, vue.unref)(writeableSettings).addMetaFile,
						"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => (0, vue.unref)(writeableSettings).addMetaFile = $event)
					}, {
						default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElCheckbox), {
							label: "ComicInfo.xml",
							value: "ComicInfoXml"
						}), (0, vue.createVNode)((0, vue.unref)(element_plus.ElCheckbox), {
							label: "info.json (eze)",
							value: "EzeInfoJson"
						})]),
						_: 1
					}, 8, ["modelValue"])]),
					_: 1
				}, 8, ["label"]), (0, vue.unref)(writeableSettings).addMetaFile.includes("ComicInfoXml") ? ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 0 }, [
					(0, vue.createVNode)((0, vue.unref)(element_plus.ElFormItem), { label: `├ ${(0, vue.unref)(t)("setting.metaFileTitleLanguage")}` }, {
						default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElSelect), {
							modelValue: (0, vue.unref)(writeableSettings).metaFileTitleLanguage,
							"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => (0, vue.unref)(writeableSettings).metaFileTitleLanguage = $event)
						}, {
							default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElOption), {
								label: (0, vue.unref)(t)("common.english"),
								value: "english"
							}, null, 8, ["label"]), (0, vue.createVNode)((0, vue.unref)(element_plus.ElOption), {
								label: (0, vue.unref)(t)("common.japanese"),
								value: "japanese"
							}, null, 8, ["label"])]),
							_: 1
						}, 8, ["modelValue"])]),
						_: 1
					}, 8, ["label"]),
					(0, vue.createVNode)((0, vue.unref)(element_plus.ElFormItem), { label: `├ ${(0, vue.unref)(t)("setting.comicInfoTagsExtraInclude")}` }, {
						default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElSelect), {
							modelValue: (0, vue.unref)(writeableSettings).comicInfoTagsExtraInclude,
							"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => (0, vue.unref)(writeableSettings).comicInfoTagsExtraInclude = $event),
							"popper-class": "comic-info-tags-extra-include-popper",
							multiple: "",
							filterable: "",
							"allow-create": ""
						}, {
							label: (0, vue.withCtx)(({ value }) => [(0, vue.createTextVNode)((0, vue.toDisplayString)((0, vue.unref)(comicInfoTagsExtraIncludeOptionsSet).has(value) ? (0, vue.unref)(t)(`meta.${value}`) : value), 1)]),
							footer: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElButton), {
								text: "",
								style: { "width": "100%" },
								onClick: resetComicInfoTagsExtraIncludeToDefault
							}, {
								default: (0, vue.withCtx)(() => [(0, vue.createTextVNode)((0, vue.toDisplayString)((0, vue.unref)(t)("common.resetToDefault")), 1)]),
								_: 1
							})]),
							default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(comicInfoTagsExtraIncludeOptions, (type) => {
								return (0, vue.createVNode)((0, vue.unref)(element_plus.ElOption), {
									key: type,
									label: `${(0, vue.unref)(t)(`meta.${type}`)} (${type})`,
									value: type
								}, null, 8, ["label", "value"]);
							}), 64))]),
							_: 1
						}, 8, ["modelValue"])]),
						_: 1
					}, 8, ["label"]),
					(0, vue.createVNode)((0, vue.unref)(element_plus.ElFormItem), { label: `└ ${(0, vue.unref)(t)("setting.comicInfoTagsExtraWithType")}` }, {
						default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElSwitch), {
							modelValue: (0, vue.unref)(writeableSettings).comicInfoTagsExtraWithType,
							"onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => (0, vue.unref)(writeableSettings).comicInfoTagsExtraWithType = $event)
						}, null, 8, ["modelValue"])]),
						_: 1
					}, 8, ["label"])
				], 64)) : (0, vue.createCommentVNode)("", true)], 64);
			};
		}
	});
	var NHentaiDownloadHost_default = (0, vue.defineComponent)({
		__name: "NHentaiDownloadHost",
		setup(__props) {
			const { t } = useI18n();
			return (_ctx, _cache) => {
				return (0, vue.unref)(IS_NHENTAI) ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(element_plus.ElFormItem), {
					key: 0,
					label: (0, vue.unref)(t)("setting.nHentaiDownloadHost")
				}, {
					default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElSelect), {
						modelValue: (0, vue.unref)(writeableSettings).nHentaiDownloadHost,
						"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => (0, vue.unref)(writeableSettings).nHentaiDownloadHost = $event),
						disabled: !!(0, vue.unref)(writeableSettings).customDownloadUrl
					}, {
						default: (0, vue.withCtx)(() => [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)((0, vue.unref)(nHentaiDownloadHostSpecials), (value) => {
							return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(element_plus.ElOption), {
								key: value,
								label: (0, vue.unref)(t)(`setting.nHentaiDownloadHostOption.${value}`),
								value
							}, null, 8, ["label", "value"]);
						}), 128)), ((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)((0, vue.unref)(nHentaiDownloadHosts), (host) => {
							return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(element_plus.ElOption), {
								key: host,
								label: host,
								value: host
							}, null, 8, ["label", "value"]);
						}), 128))]),
						_: 1
					}, 8, ["modelValue", "disabled"])]),
					_: 1
				}, 8, ["label"])) : (0, vue.createCommentVNode)("", true);
			};
		}
	});
	var _hoisted_1$5 = {
		key: 0,
		class: "no-sl"
	};
	var _hoisted_2$2 = {
		key: 0,
		class: "no-sl"
	};
	var RegExpInput_default = _plugin_vue_export_helper_default((0, vue.defineComponent)({
		__name: "RegExpInput",
		props: (0, vue.mergeModels)({ regexp: { type: Boolean } }, {
			"modelValue": {
				default: "",
				required: true
			},
			"modelModifiers": {}
		}),
		emits: ["update:modelValue"],
		setup(__props) {
			const value = (0, vue.useModel)(__props, "modelValue");
			const isError = (0, vue.computed)(() => {
				if (!__props.regexp) return false;
				try {
					return new RegExp(value.value), false;
				} catch {
					return true;
				}
			});
			return (_ctx, _cache) => {
				return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(element_plus.ElInput), {
					modelValue: value.value,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => value.value = $event),
					class: (0, vue.normalizeClass)({ "is-error": isError.value })
				}, {
					prefix: (0, vue.withCtx)(() => [__props.regexp ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", _hoisted_1$5, "/")) : (0, vue.createCommentVNode)("", true)]),
					suffix: (0, vue.withCtx)(() => [__props.regexp ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", _hoisted_2$2, "/")) : (0, vue.createCommentVNode)("", true)]),
					_: 1
				}, 8, ["modelValue", "class"]);
			};
		}
	}), [["__scopeId", "data-v-b6830946"]]);
	var _hoisted_1$4 = { style: {
		"font-size": "var(--el-form-label-font-size)",
		"color": "var(--el-text-color-regular)"
	} };
	var TitleBlacklist_default = (0, vue.defineComponent)({
		__name: "TitleBlacklist",
		setup(__props) {
			const { t } = useI18n();
			const addTitleBlacklist = () => {
				writeableSettings.titleBlacklist.push({
					content: "",
					regexp: false,
					ignoreCase: false
				});
			};
			const delTitleBlacklist = (index) => {
				writeableSettings.titleBlacklist.splice(index, 1);
			};
			return (_ctx, _cache) => {
				return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(element_plus.ElCollapse), null, {
					default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElCollapseItem), null, {
						title: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("span", _hoisted_1$4, (0, vue.toDisplayString)((0, vue.unref)(t)("setting.titleBlacklist")) + " (" + (0, vue.toDisplayString)((0, vue.unref)(writeableSettings).titleBlacklist.length) + ") ", 1)]),
						default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElTable), { data: (0, vue.unref)(writeableSettings).titleBlacklist }, {
							append: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElButton), {
								text: "",
								style: { "width": "100%" },
								onClick: addTitleBlacklist
							}, {
								default: (0, vue.withCtx)(() => [..._cache[0] || (_cache[0] = [(0, vue.createTextVNode)("+", -1)])]),
								_: 1
							})]),
							default: (0, vue.withCtx)(() => [
								(0, vue.createVNode)((0, vue.unref)(element_plus.ElTableColumn), { label: (0, vue.unref)(t)("setting.titleBlacklistTable.content") }, {
									default: (0, vue.withCtx)(({ row }) => [(0, vue.createVNode)(RegExpInput_default, {
										modelValue: row.content,
										"onUpdate:modelValue": ($event) => row.content = $event,
										regexp: row.regexp
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"regexp"
									])]),
									_: 1
								}, 8, ["label"]),
								(0, vue.createVNode)((0, vue.unref)(element_plus.ElTableColumn), {
									label: (0, vue.unref)(t)("common.regexp"),
									width: "110"
								}, {
									default: (0, vue.withCtx)(({ row }) => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElSwitch), {
										modelValue: row.regexp,
										"onUpdate:modelValue": ($event) => row.regexp = $event
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}, 8, ["label"]),
								(0, vue.createVNode)((0, vue.unref)(element_plus.ElTableColumn), {
									label: (0, vue.unref)(t)("common.ignoreCase"),
									width: "110"
								}, {
									default: (0, vue.withCtx)(({ row }) => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElSwitch), {
										modelValue: row.ignoreCase,
										"onUpdate:modelValue": ($event) => row.ignoreCase = $event
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}, 8, ["label"]),
								(0, vue.createVNode)((0, vue.unref)(element_plus.ElTableColumn), { width: "70" }, {
									default: (0, vue.withCtx)(({ $index }) => [(0, vue.createVNode)(ConfirmPopup_default, { onConfirm: () => delTitleBlacklist($index) }, {
										default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElButton), {
											type: "danger",
											icon: (0, vue.unref)(delete_default)
										}, null, 8, ["icon"])]),
										_: 1
									}, 8, ["onConfirm"])]),
									_: 1
								})
							]),
							_: 1
						}, 8, ["data"])]),
						_: 1
					})]),
					_: 1
				});
			};
		}
	});
	var _hoisted_1$3 = { style: {
		"color": "var(--el-text-color-regular)",
		"font-size": "var(--el-form-label-font-size)"
	} };
	var TitleReplacement_default = (0, vue.defineComponent)({
		__name: "TitleReplacement",
		setup(__props) {
			const { t } = useI18n();
			const addTitleReplacement = () => {
				writeableSettings.titleReplacement.push({
					from: "",
					to: "",
					regexp: false,
					ignoreCase: false
				});
			};
			const delTitleReplacement = (index) => {
				writeableSettings.titleReplacement.splice(index, 1);
			};
			return (_ctx, _cache) => {
				return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(element_plus.ElCollapse), null, {
					default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElCollapseItem), null, {
						title: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("span", _hoisted_1$3, (0, vue.toDisplayString)((0, vue.unref)(t)("setting.titleReplacement")) + " (" + (0, vue.toDisplayString)((0, vue.unref)(writeableSettings).titleReplacement.length) + ") ", 1)]),
						default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElTable), { data: (0, vue.unref)(writeableSettings).titleReplacement }, {
							append: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElButton), {
								text: "",
								style: { "width": "100%" },
								onClick: addTitleReplacement
							}, {
								default: (0, vue.withCtx)(() => [..._cache[0] || (_cache[0] = [(0, vue.createTextVNode)("+", -1)])]),
								_: 1
							})]),
							default: (0, vue.withCtx)(() => [
								(0, vue.createVNode)((0, vue.unref)(element_plus.ElTableColumn), { label: (0, vue.unref)(t)("setting.titleReplacementTable.from") }, {
									default: (0, vue.withCtx)(({ row }) => [(0, vue.createVNode)(RegExpInput_default, {
										modelValue: row.from,
										"onUpdate:modelValue": ($event) => row.from = $event,
										regexp: row.regexp
									}, null, 8, [
										"modelValue",
										"onUpdate:modelValue",
										"regexp"
									])]),
									_: 1
								}, 8, ["label"]),
								(0, vue.createVNode)((0, vue.unref)(element_plus.ElTableColumn), { label: (0, vue.unref)(t)("setting.titleReplacementTable.to") }, {
									default: (0, vue.withCtx)(({ row }) => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElInput), {
										modelValue: row.to,
										"onUpdate:modelValue": ($event) => row.to = $event
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}, 8, ["label"]),
								(0, vue.createVNode)((0, vue.unref)(element_plus.ElTableColumn), {
									label: (0, vue.unref)(t)("common.regexp"),
									width: "110"
								}, {
									default: (0, vue.withCtx)(({ row }) => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElSwitch), {
										modelValue: row.regexp,
										"onUpdate:modelValue": ($event) => row.regexp = $event
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}, 8, ["label"]),
								(0, vue.createVNode)((0, vue.unref)(element_plus.ElTableColumn), {
									label: (0, vue.unref)(t)("common.ignoreCase"),
									width: "110"
								}, {
									default: (0, vue.withCtx)(({ row }) => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElSwitch), {
										modelValue: row.ignoreCase,
										"onUpdate:modelValue": ($event) => row.ignoreCase = $event
									}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
									_: 1
								}, 8, ["label"]),
								(0, vue.createVNode)((0, vue.unref)(element_plus.ElTableColumn), { width: "70" }, {
									default: (0, vue.withCtx)(({ $index }) => [(0, vue.createVNode)(ConfirmPopup_default, { onConfirm: () => delTitleReplacement($index) }, {
										default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElButton), {
											type: "danger",
											icon: (0, vue.unref)(delete_default)
										}, null, 8, ["icon"])]),
										_: 1
									}, 8, ["onConfirm"])]),
									_: 1
								})
							]),
							_: 1
						}, 8, ["data"])]),
						_: 1
					})]),
					_: 1
				});
			};
		}
	});
	var _hoisted_1$2 = { class: "nhentai-helper-setting-help-buttons no-sl" };
	var _hoisted_2$1 = ["id"];
	var _hoisted_3$1 = { id: "nhentai-helper-setting-dialog" };
	var _hoisted_4$1 = {
		class: "asterisk-example no-sl",
		style: { "margin-bottom": "18px" }
	};
	var SettingsDialog_default = _plugin_vue_export_helper_default((0, vue.defineComponent)({
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
			const { t, locale } = useI18n();
			const show = (0, vue.ref)(false);
			const filenameLengthNumber = (0, vue.computed)({
				get: () => typeof writeableSettings.filenameLength === "number" ? writeableSettings.filenameLength : 0,
				set: (val) => {
					writeableSettings.filenameLength = val;
				}
			});
			const filenameLengthAuto = (0, vue.computed)({
				get: () => writeableSettings.filenameLength === "auto",
				set: (val) => {
					writeableSettings.filenameLength = val ? "auto" : 0;
				}
			});
			const open = () => {
				show.value = true;
			};
			const openHelp = () => {
				_GM_openInTab(locale.value === "zh" ? "https://github.com/Tsuk1ko/nhentai-helper/blob/master/README-ZH.md#%E8%AE%BE%E7%BD%AE" : "https://github.com/Tsuk1ko/nhentai-helper/blob/master/README.md#settings", {
					active: true,
					setParent: true
				});
			};
			(0, vue.watch)(() => writeableSettings.language, (val) => {
				locale.value = val;
			});
			__expose({ open });
			return (_ctx, _cache) => {
				return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(element_plus.ElDialog), {
					id: "nhentai-helper-setting-dialog-outside",
					modelValue: show.value,
					"onUpdate:modelValue": _cache[19] || (_cache[19] = ($event) => show.value = $event),
					center: true,
					top: "50px"
				}, {
					header: (0, vue.withCtx)(({ titleId, titleClass }) => [(0, vue.createElementVNode)("div", _hoisted_1$2, [(0, vue.createVNode)((0, vue.unref)(element_plus.ElButton), {
						size: "small",
						onClick: openHelp
					}, {
						default: (0, vue.withCtx)(() => [(0, vue.createTextVNode)((0, vue.toDisplayString)((0, vue.unref)(t)("setting.helpButton")), 1)]),
						_: 1
					})]), (0, vue.createElementVNode)("span", {
						id: titleId,
						class: (0, vue.normalizeClass)(["no-sl", [titleClass]])
					}, (0, vue.toDisplayString)((0, vue.unref)(t)("setting.title")), 11, _hoisted_2$1)]),
					default: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("div", _hoisted_3$1, [
						(0, vue.createElementVNode)("div", _hoisted_4$1, (0, vue.toDisplayString)((0, vue.unref)(t)("setting.asteriskTip")), 1),
						(0, vue.createVNode)((0, vue.unref)(element_plus.ElForm), {
							"label-width": "auto",
							"label-position": "left"
						}, {
							default: (0, vue.withCtx)(() => [
								(0, vue.createVNode)((0, vue.unref)(element_plus.ElFormItem), { label: "Language" }, {
									default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElSelect), {
										modelValue: (0, vue.unref)(writeableSettings).language,
										"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => (0, vue.unref)(writeableSettings).language = $event)
									}, {
										default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElOption), {
											label: "English",
											value: "en"
										}), (0, vue.createVNode)((0, vue.unref)(element_plus.ElOption), {
											label: "中文",
											value: "zh"
										})]),
										_: 1
									}, 8, ["modelValue"])]),
									_: 1
								}),
								(0, vue.createVNode)((0, vue.unref)(element_plus.ElFormItem), {
									class: "m-b-32",
									label: (0, vue.unref)(t)("setting.downloadThread")
								}, {
									default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElSlider), {
										modelValue: (0, vue.unref)(writeableSettings).threadNum,
										"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => (0, vue.unref)(writeableSettings).threadNum = $event),
										min: 1,
										max: 32,
										marks: threadNumMarks
									}, null, 8, ["modelValue"])]),
									_: 1
								}, 8, ["label"]),
								(0, vue.createVNode)((0, vue.unref)(element_plus.ElFormItem), {
									class: "refresh-required",
									label: (0, vue.unref)(t)("setting.openOnNewTab")
								}, {
									default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElSwitch), {
										modelValue: (0, vue.unref)(writeableSettings).openOnNewTab,
										"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => (0, vue.unref)(writeableSettings).openOnNewTab = $event)
									}, null, 8, ["modelValue"])]),
									_: 1
								}, 8, ["label"]),
								(0, vue.createVNode)((0, vue.unref)(CompressionFileName_default)),
								(0, vue.createVNode)((0, vue.unref)(element_plus.ElFormItem), {
									class: "m-b-32",
									label: (0, vue.unref)(t)("setting.compressionLevel")
								}, {
									default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElSlider), {
										modelValue: (0, vue.unref)(writeableSettings).compressionLevel,
										"onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => (0, vue.unref)(writeableSettings).compressionLevel = $event),
										min: 0,
										max: 9,
										marks: compressionLevelMarks
									}, null, 8, ["modelValue"])]),
									_: 1
								}, 8, ["label"]),
								(0, vue.createVNode)((0, vue.unref)(element_plus.ElFormItem), { label: (0, vue.unref)(t)("setting.filenameLength") }, {
									default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElInputNumber), {
										modelValue: filenameLengthNumber.value,
										"onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => filenameLengthNumber.value = $event),
										min: 0,
										"value-on-clear": (0, vue.unref)(settingDefinitions).filenameLength.default,
										"step-strictly": true,
										disabled: (0, vue.unref)(writeableSettings).filenameLength === "auto"
									}, null, 8, [
										"modelValue",
										"value-on-clear",
										"disabled"
									]), (0, vue.createVNode)((0, vue.unref)(element_plus.ElCheckbox), {
										modelValue: filenameLengthAuto.value,
										"onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => filenameLengthAuto.value = $event),
										class: "m-l-16",
										label: (0, vue.unref)(t)("common.auto")
									}, null, 8, ["modelValue", "label"])]),
									_: 1
								}, 8, ["label"]),
								(0, vue.createVNode)((0, vue.unref)(ConvertWebp_default)),
								(0, vue.createVNode)((0, vue.unref)(element_plus.ElFormItem), { label: (0, vue.unref)(t)("setting.removeAdPage") }, {
									default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElSwitch), {
										modelValue: (0, vue.unref)(writeableSettings).removeAdPage,
										"onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => (0, vue.unref)(writeableSettings).removeAdPage = $event)
									}, null, 8, ["modelValue"])]),
									_: 1
								}, 8, ["label"]),
								(0, vue.createVNode)((0, vue.unref)(element_plus.ElFormItem), { label: (0, vue.unref)(t)("setting.autoCancelDownloadedManga") }, {
									default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElSwitch), {
										modelValue: (0, vue.unref)(writeableSettings).autoCancelDownloadedManga,
										"onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => (0, vue.unref)(writeableSettings).autoCancelDownloadedManga = $event)
									}, null, 8, ["modelValue"])]),
									_: 1
								}, 8, ["label"]),
								(0, vue.createVNode)((0, vue.unref)(element_plus.ElFormItem), { label: (0, vue.unref)(t)("setting.autoRetryWhenErrorOccurs") }, {
									default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElSwitch), {
										modelValue: (0, vue.unref)(writeableSettings).autoRetryWhenErrorOccurs,
										"onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => (0, vue.unref)(writeableSettings).autoRetryWhenErrorOccurs = $event)
									}, null, 8, ["modelValue"])]),
									_: 1
								}, 8, ["label"]),
								(0, vue.createVNode)((0, vue.unref)(element_plus.ElFormItem), { label: (0, vue.unref)(t)("setting.autoShowAll") }, {
									default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElSwitch), {
										modelValue: (0, vue.unref)(writeableSettings).autoShowAll,
										"onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => (0, vue.unref)(writeableSettings).autoShowAll = $event)
									}, null, 8, ["modelValue"])]),
									_: 1
								}, 8, ["label"]),
								(0, vue.createVNode)((0, vue.unref)(element_plus.ElFormItem), {
									class: "refresh-required",
									label: (0, vue.unref)(t)("setting.showIgnoreButton")
								}, {
									default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElSwitch), {
										modelValue: (0, vue.unref)(writeableSettings).showIgnoreButton,
										"onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => (0, vue.unref)(writeableSettings).showIgnoreButton = $event)
									}, null, 8, ["modelValue"])]),
									_: 1
								}, 8, ["label"]),
								(0, vue.createVNode)((0, vue.unref)(element_plus.ElFormItem), { label: (0, vue.unref)(t)("setting.galleryContextmenuPreview") }, {
									default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElSwitch), {
										modelValue: (0, vue.unref)(writeableSettings).galleryContextmenuPreview,
										"onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => (0, vue.unref)(writeableSettings).galleryContextmenuPreview = $event)
									}, null, 8, ["modelValue"])]),
									_: 1
								}, 8, ["label"]),
								(0, vue.createVNode)((0, vue.unref)(element_plus.ElFormItem), { label: (0, vue.unref)(t)("setting.judgeDownloadedMangaByTitle") }, {
									default: (0, vue.withCtx)(() => [
										(0, vue.createVNode)((0, vue.unref)(element_plus.ElCheckbox), {
											modelValue: (0, vue.unref)(writeableSettings).judgeDownloadedByEnglish,
											"onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => (0, vue.unref)(writeableSettings).judgeDownloadedByEnglish = $event),
											label: (0, vue.unref)(t)("common.english")
										}, null, 8, ["modelValue", "label"]),
										(0, vue.createVNode)((0, vue.unref)(element_plus.ElCheckbox), {
											modelValue: (0, vue.unref)(writeableSettings).judgeDownloadedByJapanese,
											"onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => (0, vue.unref)(writeableSettings).judgeDownloadedByJapanese = $event),
											label: (0, vue.unref)(t)("common.japanese")
										}, null, 8, ["modelValue", "label"]),
										(0, vue.createVNode)((0, vue.unref)(element_plus.ElCheckbox), {
											modelValue: (0, vue.unref)(writeableSettings).judgeDownloadedByPretty,
											"onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => (0, vue.unref)(writeableSettings).judgeDownloadedByPretty = $event),
											label: (0, vue.unref)(t)("common.pretty")
										}, null, 8, ["modelValue", "label"])
									]),
									_: 1
								}, 8, ["label"]),
								(0, vue.createVNode)((0, vue.unref)(DownloadedTitleColor_default)),
								(0, vue.createVNode)((0, vue.unref)(MetaFile_default)),
								(0, vue.createVNode)((0, vue.unref)(TitleBlacklist_default)),
								(0, vue.createVNode)((0, vue.unref)(element_plus.ElDivider), null, {
									default: (0, vue.withCtx)(() => [(0, vue.createTextVNode)((0, vue.toDisplayString)((0, vue.unref)(t)("setting.advanceTitle")), 1)]),
									_: 1
								}),
								(0, vue.createVNode)((0, vue.unref)(CollectLog_default)),
								(0, vue.createVNode)((0, vue.unref)(NHentaiDownloadHost_default)),
								(0, vue.createVNode)((0, vue.unref)(element_plus.ElFormItem), { label: (0, vue.unref)(t)("setting.customDownloadUrl") }, {
									default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElInput), {
										modelValue: (0, vue.unref)(writeableSettings).customDownloadUrl,
										"onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => (0, vue.unref)(writeableSettings).customDownloadUrl = $event)
									}, null, 8, ["modelValue"])]),
									_: 1
								}, 8, ["label"]),
								(0, vue.createVNode)((0, vue.unref)(element_plus.ElFormItem), { label: (0, vue.unref)(t)("setting.compressionStreamFiles") }, {
									default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElSwitch), {
										modelValue: (0, vue.unref)(writeableSettings).compressionStreamFiles,
										"onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => (0, vue.unref)(writeableSettings).compressionStreamFiles = $event)
									}, null, 8, ["modelValue"])]),
									_: 1
								}, 8, ["label"]),
								(0, vue.createVNode)((0, vue.unref)(element_plus.ElFormItem), { label: (0, vue.unref)(t)("setting.seriesMode") }, {
									default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElSwitch), {
										modelValue: (0, vue.unref)(writeableSettings).seriesMode,
										"onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => (0, vue.unref)(writeableSettings).seriesMode = $event)
									}, null, 8, ["modelValue"])]),
									_: 1
								}, 8, ["label"]),
								(0, vue.createVNode)((0, vue.unref)(element_plus.ElFormItem), { label: (0, vue.unref)(t)("setting.streamDownload") }, {
									default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElSwitch), {
										modelValue: (0, vue.unref)(writeableSettings).streamDownload,
										"onUpdate:modelValue": _cache[18] || (_cache[18] = ($event) => (0, vue.unref)(writeableSettings).streamDownload = $event),
										disabled: (0, vue.unref)(DISABLE_STREAM_DOWNLOAD)
									}, null, 8, ["modelValue", "disabled"])]),
									_: 1
								}, 8, ["label"]),
								(0, vue.createVNode)((0, vue.unref)(TitleReplacement_default)),
								(0, vue.createVNode)((0, vue.unref)(CustomFilenameFunction_default))
							]),
							_: 1
						}),
						(0, vue.createVNode)((0, vue.unref)(DownloadHistory_default))
					])]),
					_: 1
				}, 8, ["modelValue"]);
			};
		}
	}), [["__scopeId", "data-v-6b8ca407"]]);
	var resource$1 = {
		"common": {
			"settings": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Settings"
				}
			},
			"auto": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Auto"
				}
			},
			"english": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "English"
				}
			},
			"japanese": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Japanese"
				}
			},
			"chinese": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Chinese"
				}
			},
			"uncensored": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Uncensored"
				}
			},
			"pretty": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Pretty"
				}
			},
			"filter": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Filter"
				}
			},
			"none": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "None"
				}
			},
			"disabled": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Disabled"
				}
			},
			"copy": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Copy"
				}
			},
			"copied": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Copied"
				}
			},
			"language": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Language"
				}
			},
			"other": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Other"
				}
			},
			"resetToDefault": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Reset to default"
				}
			},
			"regexp": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "RegExp"
				}
			},
			"ignoreCase": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Ignore case"
				}
			},
			"abbr": {
				"english": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [{ "t": 3 }],
						"s": "EN"
					}
				},
				"japanese": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [{ "t": 3 }],
						"s": "JP"
					}
				},
				"chinese": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [{ "t": 3 }],
						"s": "CN"
					}
				},
				"uncensored": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [{ "t": 3 }],
						"s": "Uncensored"
					}
				}
			}
		},
		"setting": {
			"title": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{
						"t": 6,
						"k": {
							"t": 7,
							"v": "common.settings"
						}
					}]
				}
			},
			"advanceTitle": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Advance Settings"
				}
			},
			"helpButton": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Help"
				}
			},
			"asteriskTip": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "means refresh is required to take effect"
				}
			},
			"downloadThread": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Download thread"
				}
			},
			"openOnNewTab": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Open on new tab"
				}
			},
			"compressionFilename": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Compression filename"
				}
			},
			"maxNumber": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Max number"
				}
			},
			"separator": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Separator"
				}
			},
			"compressionLevel": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Compression level"
				}
			},
			"filenameLength": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Filename length"
				}
			},
			"convertWebpTo": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Convert webp to"
				}
			},
			"convertWebpQuality": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Quality"
				}
			},
			"removeAdPage": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Remove ads pages"
				}
			},
			"autoCancelDownloadedManga": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Auto cancel downloaded manga"
				}
			},
			"autoRetryWhenErrorOccurs": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Auto retry when error occurs"
				}
			},
			"autoShowAll": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Auto show all"
				}
			},
			"showIgnoreButton": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Show \"Ignore\" button"
				}
			},
			"judgeDownloadedMangaByTitle": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Judge downloaded manga by title"
				}
			},
			"customDownloadUrl": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Custom download URL"
				}
			},
			"compressionStreamFiles": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Compression \"streamFiles\""
				}
			},
			"seriesMode": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Series mode"
				}
			},
			"streamDownload": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Stream download"
				}
			},
			"preventConsoleClearing": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Prevent console clearing"
				}
			},
			"nHentaiDownloadHost": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "nHentai download host"
				}
			},
			"nHentaiDownloadHostOption": {
				"auto": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [{ "t": 3 }],
						"s": "Auto (recommended)"
					}
				},
				"random": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [{ "t": 3 }],
						"s": "Random"
					}
				},
				"balance": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [{ "t": 3 }],
						"s": "Balance"
					}
				}
			},
			"addMetaFile": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Add metadata file"
				}
			},
			"metaFileTitleLanguage": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Title language"
				}
			},
			"comicInfoTagsExtraInclude": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Tags extra include"
				}
			},
			"comicInfoTagsExtraWithType": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Extra tags with type prefix"
				}
			},
			"titleReplacement": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Title replacement"
				}
			},
			"titleReplacementTable": {
				"from": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [{ "t": 3 }],
						"s": "From"
					}
				},
				"to": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [{ "t": 3 }],
						"s": "To"
					}
				}
			},
			"titleBlacklist": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Title blacklist"
				}
			},
			"titleBlacklistTable": { "content": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Content"
				}
			} },
			"galleryContextmenuPreview": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Context menu preview"
				}
			},
			"customFilenameFunction": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Custom filename function"
				}
			},
			"history": {
				"title": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [{ "t": 3 }],
						"s": "Download History"
					}
				},
				"downloadedNumberTip": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [
							{
								"t": 3,
								"v": "You have downloaded "
							},
							{
								"t": 4,
								"k": "num"
							},
							{
								"t": 3,
								"v": " manga on this site using nHentai Helper."
							}
						]
					}
				},
				"import": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [{ "t": 3 }],
						"s": "Import"
					}
				},
				"export": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [{ "t": 3 }],
						"s": "Export"
					}
				},
				"clear": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [{ "t": 3 }],
						"s": "Clear"
					}
				},
				"importTip": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [{ "t": 3 }],
						"s": "Tip: Import will not clear the existing history, but merges with it."
					}
				}
			},
			"downloadedTitleColor": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Downloaded title color"
				}
			},
			"collectLog": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Collect logs"
				}
			},
			"copyLogs": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Copy logs"
				}
			},
			"clearLogs": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Clear logs"
				}
			},
			"collectLogTip": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Before reporting an issue to the developer, enable this option, reproduce the problem, then click the \"Copy Logs\" button and paste the content (already formatted in Markdown) into your report. Remember to disable this option afterwards to avoid performance issues."
				}
			}
		},
		"dialog": {
			"yes": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "YES"
				}
			},
			"no": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "NO"
				}
			},
			"action": {
				"getInfo": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [{ "t": 3 }],
						"s": "getting information"
					}
				},
				"download": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [{ "t": 3 }],
						"s": "downloading"
					}
				}
			},
			"downloadAgainConfirm": ({ named }) => `<i>${named("title")}</i> is already downloaded${named("hasQueue") ? " or in queue" : ""}.<br>Do you want to download again?`,
			"errorRetryConfirm": ({ linked, named }) => `Error occurred while ${linked(`dialog.action.${named("action")}`)}, retry?`,
			"errorRetryTip": ({ linked, named }) => `Error occurred while ${linked(`dialog.action.${named("action")}`)}, retrying...`,
			"downloadedTip": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [
						{
							"t": 3,
							"v": "<i>"
						},
						{
							"t": 4,
							"k": "title"
						},
						{
							"t": 3,
							"v": "</i> is already downloaded or in queue."
						}
					]
				}
			},
			"getMediaUrlTemplateFailed": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [
						{
							"t": 3,
							"v": "Fail to get image download url. Please set \""
						},
						{
							"t": 6,
							"k": {
								"t": 9,
								"v": "setting.customDownloadUrl"
							}
						},
						{
							"t": 3,
							"v": "\" manually, or open a github issue to report with current url."
						}
					]
				}
			}
		},
		"button": {
			"download": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Download"
				}
			},
			"downloading": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Downloading"
				}
			},
			"compressing": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Compressing"
				}
			},
			"ignore": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Ignore this"
				}
			},
			"unignore": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Ignore this"
				}
			}
		},
		"input": { "downloadSpecifiedPages": {
			"t": 0,
			"b": {
				"t": 2,
				"i": [{ "t": 3 }],
				"s": "Download specified pages (e.g. -5,7-10,12,14,18-)"
			}
		} },
		"confirmPopup": {
			"title": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Are you sure?"
				}
			},
			"yes": {
				"t": 0,
				"b": {
					"static": "",
					"t": 2,
					"i": []
				}
			},
			"no": {
				"t": 0,
				"b": {
					"static": "",
					"t": 2,
					"i": []
				}
			}
		},
		"meta": {
			"id": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "ID"
				}
			},
			"parody": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Parodies"
				}
			},
			"character": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Characters"
				}
			},
			"tag": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Tags"
				}
			},
			"artist": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Artists"
				}
			},
			"group": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Groups"
				}
			},
			"language": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Languages"
				}
			},
			"category": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Categories"
				}
			},
			"page": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Pages"
				}
			},
			"upload": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Upload Date"
				}
			}
		},
		"tip": { "lastDownloadedPosition": {
			"t": 0,
			"b": {
				"t": 2,
				"i": [{ "t": 3 }],
				"s": "Last download position"
			}
		} },
		"menu": { "restoreLastDownload": {
			"t": 0,
			"b": {
				"t": 2,
				"i": [{ "t": 3 }],
				"s": "Restore last download position"
			}
		} }
	};
	var resource = {
		"common": {
			"settings": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "设置"
				}
			},
			"auto": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "自动"
				}
			},
			"english": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "英文"
				}
			},
			"japanese": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "日文"
				}
			},
			"chinese": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "中文"
				}
			},
			"uncensored": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "无修正"
				}
			},
			"pretty": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "简略"
				}
			},
			"filter": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "过滤"
				}
			},
			"none": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "无"
				}
			},
			"disabled": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "禁用"
				}
			},
			"copy": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "复制"
				}
			},
			"copied": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "已复制"
				}
			},
			"language": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "语言"
				}
			},
			"other": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "其他"
				}
			},
			"resetToDefault": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "重置为默认"
				}
			},
			"regexp": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "正则表达式"
				}
			},
			"ignoreCase": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "忽略大小写"
				}
			},
			"abbr": {
				"english": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [{ "t": 3 }],
						"s": "英"
					}
				},
				"japanese": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [{ "t": 3 }],
						"s": "日"
					}
				},
				"chinese": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [{ "t": 3 }],
						"s": "中"
					}
				},
				"uncensored": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [{ "t": 3 }],
						"s": "无修"
					}
				}
			}
		},
		"setting": {
			"title": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{
						"t": 6,
						"k": {
							"t": 7,
							"v": "common.settings"
						}
					}]
				}
			},
			"advanceTitle": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "进阶设置"
				}
			},
			"helpButton": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "帮助"
				}
			},
			"asteriskTip": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "表示刷新页面才能生效"
				}
			},
			"downloadThread": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "下载线程数"
				}
			},
			"openOnNewTab": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "在新选项卡打开"
				}
			},
			"compressionFilename": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "压缩文件名"
				}
			},
			"maxNumber": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "最大数量"
				}
			},
			"separator": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "分隔符"
				}
			},
			"compressionLevel": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "压缩等级"
				}
			},
			"filenameLength": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "文件名长度"
				}
			},
			"convertWebpTo": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "转换 webp 为"
				}
			},
			"convertWebpQuality": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "质量"
				}
			},
			"removeAdPage": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "移除广告页"
				}
			},
			"autoCancelDownloadedManga": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "自动取消下载过的本子"
				}
			},
			"autoRetryWhenErrorOccurs": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "发生错误时自动重试"
				}
			},
			"autoShowAll": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "自动显示全部"
				}
			},
			"showIgnoreButton": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "显示“忽略”按钮"
				}
			},
			"judgeDownloadedMangaByTitle": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "用标题判断本子是否下载过"
				}
			},
			"customDownloadUrl": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "自定义下载地址"
				}
			},
			"compressionStreamFiles": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "压缩 \"streamFiles\" 选项"
				}
			},
			"seriesMode": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "串行模式"
				}
			},
			"streamDownload": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "流式下载"
				}
			},
			"preventConsoleClearing": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "阻止控制台清空"
				}
			},
			"nHentaiDownloadHost": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "nHentai 下载节点"
				}
			},
			"nHentaiDownloadHostOption": {
				"auto": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [{ "t": 3 }],
						"s": "自动（推荐）"
					}
				},
				"random": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [{ "t": 3 }],
						"s": "随机"
					}
				},
				"balance": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [{ "t": 3 }],
						"s": "均衡"
					}
				}
			},
			"addMetaFile": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "添加元数据文件"
				}
			},
			"metaFileTitleLanguage": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "标题语言"
				}
			},
			"comicInfoTagsExtraInclude": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "Tags 额外包含"
				}
			},
			"comicInfoTagsExtraWithType": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "额外包含附带类型前缀"
				}
			},
			"titleReplacement": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "标题替换"
				}
			},
			"titleReplacementTable": {
				"from": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [{ "t": 3 }],
						"s": "从"
					}
				},
				"to": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [{ "t": 3 }],
						"s": "替换为"
					}
				}
			},
			"titleBlacklist": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "标题黑名单"
				}
			},
			"titleBlacklistTable": { "content": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "内容"
				}
			} },
			"galleryContextmenuPreview": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "右击预览"
				}
			},
			"customFilenameFunction": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "自定义文件名函数"
				}
			},
			"history": {
				"title": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [{ "t": 3 }],
						"s": "下载历史"
					}
				},
				"downloadedNumberTip": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [
							{
								"t": 3,
								"v": "你在这个站点上已经用 nHentai 助手下载了 "
							},
							{
								"t": 4,
								"k": "num"
							},
							{
								"t": 3,
								"v": " 个本子"
							}
						]
					}
				},
				"import": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [{ "t": 3 }],
						"s": "导入"
					}
				},
				"export": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [{ "t": 3 }],
						"s": "导出"
					}
				},
				"clear": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [{ "t": 3 }],
						"s": "清空"
					}
				},
				"importTip": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [{ "t": 3 }],
						"s": "提示：导入会将导入的历史记录与现有历史记录合并，不会清空现有历史记录"
					}
				}
			},
			"downloadedTitleColor": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "已下载本子的标题颜色"
				}
			},
			"collectLog": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "收集日志"
				}
			},
			"copyLogs": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "复制日志"
				}
			},
			"clearLogs": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "清空日志"
				}
			},
			"collectLogTip": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "在向开发者反馈问题前，请打开此开关，复现问题后点击\"复制日志\"按钮，将内容（已附带 Markdown 格式）粘贴到反馈中，操作结束后请关闭此开关以避免产生性能问题"
				}
			}
		},
		"dialog": {
			"yes": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "是的"
				}
			},
			"no": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "算了"
				}
			},
			"action": {
				"getInfo": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [{ "t": 3 }],
						"s": "获取信息"
					}
				},
				"download": {
					"t": 0,
					"b": {
						"t": 2,
						"i": [{ "t": 3 }],
						"s": "下载"
					}
				}
			},
			"downloadAgainConfirm": ({ named }) => `\u300A${named("title")}\u300B\u5DF2\u4E0B\u8F7D\u8FC7${named("hasQueue") ? "或在队列中" : ""}\uFF0C\u4F60\u5E0C\u671B\u518D\u6B21\u4E0B\u8F7D\u5417\uFF1F`,
			"errorRetryConfirm": ({ linked, named }) => `${linked(`dialog.action.${named("action")}`)}\u53D1\u751F\u9519\u8BEF\uFF0C\u662F\u5426\u91CD\u8BD5\uFF1F`,
			"errorRetryTip": ({ linked, named }) => `${linked(`dialog.action.${named("action")}`)}\u53D1\u751F\u9519\u8BEF\uFF0C\u91CD\u8BD5\u4E2D\u2026\u2026`,
			"downloadedTip": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [
						{
							"t": 3,
							"v": "《"
						},
						{
							"t": 4,
							"k": "title"
						},
						{
							"t": 3,
							"v": "》已经下载过或在队列中"
						}
					]
				}
			},
			"getMediaUrlTemplateFailed": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [
						{
							"t": 3,
							"v": "获取图片下载地址失败，请手动设置“"
						},
						{
							"t": 6,
							"k": {
								"t": 9,
								"v": "setting.customDownloadUrl"
							}
						},
						{
							"t": 3,
							"v": "”，或前往 github issue 或脚本页面反馈并附带当前网址"
						}
					]
				}
			}
		},
		"button": {
			"download": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "下载"
				}
			},
			"downloading": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "下载中"
				}
			},
			"compressing": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "压缩中"
				}
			},
			"ignore": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "忽略"
				}
			},
			"unignore": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "不再忽略"
				}
			}
		},
		"input": { "downloadSpecifiedPages": {
			"t": 0,
			"b": {
				"t": 2,
				"i": [{ "t": 3 }],
				"s": "下载指定页面（例：-5,7-10,12,14,18-）"
			}
		} },
		"confirmPopup": {
			"title": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "真的吗？"
				}
			},
			"yes": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "真的"
				}
			},
			"no": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "算了"
				}
			}
		},
		"meta": {
			"id": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "ID"
				}
			},
			"parody": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "模仿"
				}
			},
			"character": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "角色"
				}
			},
			"tag": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "标签"
				}
			},
			"artist": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "作者"
				}
			},
			"group": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "团体"
				}
			},
			"language": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "语言"
				}
			},
			"category": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "分类"
				}
			},
			"page": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "页数"
				}
			},
			"upload": {
				"t": 0,
				"b": {
					"t": 2,
					"i": [{ "t": 3 }],
					"s": "上传时间"
				}
			}
		},
		"tip": { "lastDownloadedPosition": {
			"t": 0,
			"b": {
				"t": 2,
				"i": [{ "t": 3 }],
				"s": "上次下载位置"
			}
		} },
		"menu": { "restoreLastDownload": {
			"t": 0,
			"b": {
				"t": 2,
				"i": [{ "t": 3 }],
				"s": "还原上次下载位置记录"
			}
		} }
	};
	registerMessageResolver(resolveValue);
	var i18n = createI18n({
		legacy: false,
		locale: settings.language,
		fallbackLocale: "en",
		messages: {
			en: resource$1,
			zh: resource
		}
	});
	var createAppAndMount = (component, appInitFunc) => {
		const el = document.createElement("div");
		document.body.append(el);
		const app = (0, vue.createApp)(component);
		appInitFunc?.(app);
		return app.mount(el);
	};
	var PAGE_MANGA_DETAIL_REG = /^\/g\/\d+\/?(?:\?.*)?$/;
	var PAGE_ONLINE_VIEW_REG = /^\/g\/\d+(?:\/list)?\/\d+\/?(?:\?.*)?$/;
	var isPageMangaDetail = () => PAGE_MANGA_DETAIL_REG.test(location.pathname);
	var isPageOnlineView = () => PAGE_ONLINE_VIEW_REG.test(location.pathname);
	var isPageMangaList = () => !isPageMangaDetail() && !isPageOnlineView() && !!document.querySelector(selector.gallery);
	var PageType = function(PageType) {
		PageType[PageType["UNKNOWN"] = 0] = "UNKNOWN";
		PageType[PageType["MANGA_LIST"] = 1] = "MANGA_LIST";
		PageType[PageType["MANGA_DETAIL"] = 2] = "MANGA_DETAIL";
		PageType[PageType["ONLINE_VIEW"] = 3] = "ONLINE_VIEW";
		return PageType;
	}({});
	var getPageType = () => {
		if (isPageMangaDetail()) return 2;
		if (isPageOnlineView()) return 3;
		if (document.querySelector(selector.gallery)) return 1;
		return 0;
	};
	var LastDownloadStore = class {
		store = import_localforage.default.createInstance({
			name: IDB_NAME,
			storeName: "last_download"
		});
		key = "";
		latestGid = 0;
		lastGid = 0;
		styleEl;
		onceInit = once(() => {
			useStyle(() => `:root{--nh-helper-text-last-downloaded-position:"${i18n.global.t("tip.lastDownloadedPosition")}"}`);
		});
		async init() {
			try {
				logger.info("init last download");
				this.key = this.getKey();
				const gid = await this.store.getItem(this.key);
				if (!gid) {
					this.reset();
					return;
				}
				this.latestGid = gid;
				this.lastGid = gid;
				this.addStyle(gid);
				this.onceInit();
			} catch (error) {
				logger.error(error);
				this.reset();
			}
		}
		async update(gid) {
			if (!isPageMangaList()) return;
			gid = Number(gid);
			if (!gid || gid <= this.latestGid) return;
			this.latestGid = gid;
			await this.store.setItem(this.key, gid);
		}
		async restore() {
			if (!this.lastGid) return;
			this.latestGid = this.lastGid;
			await this.store.setItem(this.key, this.lastGid);
			logger.info(`restore last download: ${this.lastGid}`);
		}
		getKey() {
			const url = new URL(location.href);
			return `${url.origin}${url.pathname.replace(/\/+$/, "")}`;
		}
		reset() {
			this.latestGid = 0;
			this.lastGid = 0;
			this.removeStyle();
		}
		removeStyle() {
			this.styleEl?.remove();
			this.styleEl = void 0;
		}
		addStyle(gid) {
			this.removeStyle();
			this.styleEl = _GM_addStyle(`${selector.gallery} ${selector.galleryCover}[href*="/${gid}/"]::after{content:var(--nh-helper-text-last-downloaded-position);position:absolute;display:flex;align-items:center;justify-content:center;inset:0;background-color:rgba(237,37,83,.6);color:rgba(255,255,255,.9);font-size:16px;font-weight:bold;line-height:16px;border-radius:4px 4px 0 0;pointer-events:none;backdrop-filter:blur(4px);transition:opacity 0.2s ease-in-out;}${selector.gallery} ${selector.galleryCover}[href*="/${gid}/"]:hover::after{opacity:0}`);
		}
	};
	var lastDownload = new LastDownloadStore();
	var SVELTE_KEY = "__svelte";
	var IS_SVELTE = Object.keys(_unsafeWindow).some((key) => key.startsWith(SVELTE_KEY));
	var isSvelteReady = () => IS_SVELTE && !!document.querySelector("#svelte-announcer");
	var waitForSvelteReady = () => {
		const observerAbortController = new AbortController();
		const observerPromise = new Promise((resolve) => {
			const observer = new MutationObserver((mutations, observer) => {
				if (mutations.some(({ addedNodes }) => Array.from(addedNodes).some((node) => node instanceof HTMLElement && node.id === "svelte-announcer"))) {
					observer.disconnect();
					resolve();
				}
			});
			observer.observe(document.body, {
				childList: true,
				subtree: true
			});
			observerAbortController.signal.onabort = () => {
				observer.disconnect();
				resolve();
			};
		});
		const timeoutPromise = sleep(3e3).then(() => {
			observerAbortController.abort();
		});
		return Promise.race([observerPromise, timeoutPromise]);
	};
	var onSvelteHydrationMismatch = once((callback) => {
		if (!_unsafeWindow) return;
		const origWarn = _unsafeWindow.console.warn;
		_unsafeWindow.console.warn = new Proxy(origWarn, { apply: (target, thisArg, args) => {
			if (args.length === 1 && args[0] === "https://svelte.dev/e/hydration_mismatch") {
				logger.warn("Svelte hydration mismatch detected");
				setTimeout(callback);
			}
			return Reflect.apply(target, thisArg, args);
		} });
	});
	var import_noty = __toESM(__commonJSMin(((exports, module) => {
		(function webpackUniversalModuleDefinition(root, factory) {
			if (typeof exports === "object" && typeof module === "object") module.exports = factory();
			else if (typeof define === "function" && define.amd) define("Noty", [], factory);
			else if (typeof exports === "object") exports["Noty"] = factory();
			else root["Noty"] = factory();
		})(exports, function() {
			return (function(modules) {
				var installedModules = {};
				function __webpack_require__(moduleId) {
					if (installedModules[moduleId]) return installedModules[moduleId].exports;
					var module$1 = installedModules[moduleId] = {
						i: moduleId,
						l: false,
						exports: {}
					};
					modules[moduleId].call(module$1.exports, module$1, module$1.exports, __webpack_require__);
					module$1.l = true;
					return module$1.exports;
				}
				__webpack_require__.m = modules;
				__webpack_require__.c = installedModules;
				__webpack_require__.i = function(value) {
					return value;
				};
				__webpack_require__.d = function(exports$1, name, getter) {
					if (!__webpack_require__.o(exports$1, name)) Object.defineProperty(exports$1, name, {
						configurable: false,
						enumerable: true,
						get: getter
					});
				};
				__webpack_require__.n = function(module$2) {
					var getter = module$2 && module$2.__esModule ? function getDefault() {
						return module$2["default"];
					} : function getModuleExports() {
						return module$2;
					};
					__webpack_require__.d(getter, "a", getter);
					return getter;
				};
				__webpack_require__.o = function(object, property) {
					return Object.prototype.hasOwnProperty.call(object, property);
				};
				__webpack_require__.p = "";
				return __webpack_require__(__webpack_require__.s = 6);
			})([
				(function(module$3, exports$2, __webpack_require__) {
					"use strict";
					Object.defineProperty(exports$2, "__esModule", { value: true });
					exports$2.css = exports$2.deepExtend = exports$2.animationEndEvents = void 0;
					var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
						return typeof obj;
					} : function(obj) {
						return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
					};
					exports$2.inArray = inArray;
					exports$2.stopPropagation = stopPropagation;
					exports$2.generateID = generateID;
					exports$2.outerHeight = outerHeight;
					exports$2.addListener = addListener;
					exports$2.hasClass = hasClass;
					exports$2.addClass = addClass;
					exports$2.removeClass = removeClass;
					exports$2.remove = remove;
					exports$2.classList = classList;
					exports$2.visibilityChangeFlow = visibilityChangeFlow;
					exports$2.createAudioElements = createAudioElements;
					var API = _interopRequireWildcard(__webpack_require__(1));
					function _interopRequireWildcard(obj) {
						if (obj && obj.__esModule) return obj;
						else {
							var newObj = {};
							if (obj != null) {
								for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
							}
							newObj.default = obj;
							return newObj;
						}
					}
					exports$2.animationEndEvents = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
					function inArray(needle, haystack, argStrict) {
						var key = void 0;
						if (!!argStrict) {
							for (key in haystack) if (haystack.hasOwnProperty(key) && haystack[key] === needle) return true;
						} else for (key in haystack) if (haystack.hasOwnProperty(key) && haystack[key] === needle) return true;
						return false;
					}
					function stopPropagation(evt) {
						evt = evt || window.event;
						if (typeof evt.stopPropagation !== "undefined") evt.stopPropagation();
						else evt.cancelBubble = true;
					}
					exports$2.deepExtend = function deepExtend(out) {
						out = out || {};
						for (var i = 1; i < arguments.length; i++) {
							var obj = arguments[i];
							if (!obj) continue;
							for (var key in obj) if (obj.hasOwnProperty(key)) if (Array.isArray(obj[key])) out[key] = obj[key];
							else if (_typeof(obj[key]) === "object" && obj[key] !== null) out[key] = deepExtend(out[key], obj[key]);
							else out[key] = obj[key];
						}
						return out;
					};
					function generateID() {
						var id = "noty_" + (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "") + "_";
						id += "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
							var r = Math.random() * 16 | 0;
							return (c === "x" ? r : r & 3 | 8).toString(16);
						});
						return id;
					}
					function outerHeight(el) {
						var height = el.offsetHeight;
						var style = window.getComputedStyle(el);
						height += parseInt(style.marginTop) + parseInt(style.marginBottom);
						return height;
					}
					exports$2.css = function() {
						var cssPrefixes = [
							"Webkit",
							"O",
							"Moz",
							"ms"
						];
						var cssProps = {};
						function camelCase(string) {
							return string.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(match, letter) {
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
								for (prop in properties) if (properties.hasOwnProperty(prop)) {
									value = properties[prop];
									if (value !== void 0 && properties.hasOwnProperty(prop)) applyCss(element, prop, value);
								}
							} else applyCss(element, args[1], args[2]);
						};
					}();
					function addListener(el, events, cb) {
						var useCapture = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
						events = events.split(" ");
						for (var i = 0; i < events.length; i++) if (document.addEventListener) el.addEventListener(events[i], cb, useCapture);
						else if (document.attachEvent) el.attachEvent("on" + events[i], cb);
					}
					function hasClass(element, name) {
						return (typeof element === "string" ? element : classList(element)).indexOf(" " + name + " ") >= 0;
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
						if (element.parentNode) element.parentNode.removeChild(element);
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
										if (API.Store[id].options.visibilityControl) API.Store[id].stop();
									}
								});
							}, 100);
						}
						function resumeAll() {
							setTimeout(function() {
								Object.keys(API.Store).forEach(function(id) {
									if (API.Store.hasOwnProperty(id)) {
										if (API.Store[id].options.visibilityControl) API.Store[id].resume();
									}
								});
								API.queueRenderAll();
							}, 100);
						}
						if (visibilityChange) addListener(document, visibilityChange, onVisibilityChange);
						addListener(window, "blur", onBlur);
						addListener(window, "focus", onFocus);
					}
					function createAudioElements(ref) {
						if (ref.hasSound) {
							var audioElement = document.createElement("audio");
							ref.options.sounds.sources.forEach(function(s) {
								var source = document.createElement("source");
								source.src = s;
								source.type = "audio/" + getExtension(s);
								audioElement.appendChild(source);
							});
							if (ref.barDom) ref.barDom.appendChild(audioElement);
							else document.querySelector("body").appendChild(audioElement);
							audioElement.volume = ref.options.sounds.volume;
							if (!ref.soundPlayed) {
								audioElement.play();
								ref.soundPlayed = true;
							}
							audioElement.onended = function() {
								remove(audioElement);
							};
						}
					}
					function getExtension(fileName) {
						return fileName.match(/\.([^.]+)$/)[1];
					}
				}),
				(function(module$4, exports$3, __webpack_require__) {
					"use strict";
					Object.defineProperty(exports$3, "__esModule", { value: true });
					exports$3.Defaults = exports$3.Store = exports$3.Queues = exports$3.DefaultMaxVisible = exports$3.docTitle = exports$3.DocModalCount = exports$3.PageHidden = void 0;
					exports$3.getQueueCounts = getQueueCounts;
					exports$3.addToQueue = addToQueue;
					exports$3.removeFromQueue = removeFromQueue;
					exports$3.queueRender = queueRender;
					exports$3.queueRenderAll = queueRenderAll;
					exports$3.ghostFix = ghostFix;
					exports$3.build = build;
					exports$3.hasButtons = hasButtons;
					exports$3.handleModal = handleModal;
					exports$3.handleModalClose = handleModalClose;
					exports$3.queueClose = queueClose;
					exports$3.dequeueClose = dequeueClose;
					exports$3.fire = fire;
					exports$3.openFlow = openFlow;
					exports$3.closeFlow = closeFlow;
					var Utils = _interopRequireWildcard(__webpack_require__(0));
					function _interopRequireWildcard(obj) {
						if (obj && obj.__esModule) return obj;
						else {
							var newObj = {};
							if (obj != null) {
								for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
							}
							newObj.default = obj;
							return newObj;
						}
					}
					exports$3.PageHidden = false;
					var DocModalCount = exports$3.DocModalCount = 0;
					var DocTitleProps = {
						originalTitle: null,
						count: 0,
						changed: false,
						timer: -1
					};
					var docTitle = exports$3.docTitle = {
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
							} else document.title = "(" + DocTitleProps.count + ") " + DocTitleProps.originalTitle;
						},
						_clear: function _clear() {
							if (DocTitleProps.changed) {
								DocTitleProps.count = 0;
								document.title = DocTitleProps.originalTitle;
								DocTitleProps.changed = false;
							}
						}
					};
					var DefaultMaxVisible = exports$3.DefaultMaxVisible = 5;
					var Queues = exports$3.Queues = { global: {
						maxVisible: DefaultMaxVisible,
						queue: []
					} };
					var Store = exports$3.Store = {};
					exports$3.Defaults = {
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
						titleCount: { conditions: [] },
						modal: false,
						visibilityControl: false
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
					function addToQueue(ref) {
						if (!Queues.hasOwnProperty(ref.options.queue)) Queues[ref.options.queue] = {
							maxVisible: DefaultMaxVisible,
							queue: []
						};
						Queues[ref.options.queue].queue.push(ref);
					}
					function removeFromQueue(ref) {
						if (Queues.hasOwnProperty(ref.options.queue)) {
							var queue = [];
							Object.keys(Queues[ref.options.queue].queue).forEach(function(i) {
								if (Queues[ref.options.queue].queue[i].id !== ref.id) queue.push(Queues[ref.options.queue].queue[i]);
							});
							Queues[ref.options.queue].queue = queue;
						}
					}
					function queueRender() {
						var queueName = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "global";
						if (Queues.hasOwnProperty(queueName)) {
							var noty = Queues[queueName].queue.shift();
							if (noty) noty.show();
						}
					}
					function queueRenderAll() {
						Object.keys(Queues).forEach(function(queueName) {
							queueRender(queueName);
						});
					}
					function ghostFix(ref) {
						var ghostID = Utils.generateID("ghost");
						var ghost = document.createElement("div");
						ghost.setAttribute("id", ghostID);
						Utils.css(ghost, { height: Utils.outerHeight(ref.barDom) + "px" });
						ref.barDom.insertAdjacentHTML("afterend", ghost.outerHTML);
						Utils.remove(ref.barDom);
						ghost = document.getElementById(ghostID);
						Utils.addClass(ghost, "noty_fix_effects_height");
						Utils.addListener(ghost, Utils.animationEndEvents, function() {
							Utils.remove(ghost);
						});
					}
					function build(ref) {
						findOrCreateContainer(ref);
						var markup = "<div class=\"noty_body\">" + ref.options.text + "</div>" + buildButtons(ref) + "<div class=\"noty_progressbar\"></div>";
						ref.barDom = document.createElement("div");
						ref.barDom.setAttribute("id", ref.id);
						Utils.addClass(ref.barDom, "noty_bar noty_type__" + ref.options.type + " noty_theme__" + ref.options.theme);
						ref.barDom.innerHTML = markup;
						fire(ref, "onTemplate");
					}
					function hasButtons(ref) {
						return !!(ref.options.buttons && Object.keys(ref.options.buttons).length);
					}
					function buildButtons(ref) {
						if (hasButtons(ref)) {
							var buttons = document.createElement("div");
							Utils.addClass(buttons, "noty_buttons");
							Object.keys(ref.options.buttons).forEach(function(key) {
								buttons.appendChild(ref.options.buttons[key].dom);
							});
							ref.options.buttons.forEach(function(btn) {
								buttons.appendChild(btn.dom);
							});
							return buttons.outerHTML;
						}
						return "";
					}
					function handleModal(ref) {
						if (ref.options.modal) {
							if (DocModalCount === 0) createModal(ref);
							exports$3.DocModalCount = DocModalCount += 1;
						}
					}
					function handleModalClose(ref) {
						if (ref.options.modal && DocModalCount > 0) {
							exports$3.DocModalCount = DocModalCount -= 1;
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
					function findOrCreateContainer(ref) {
						if (ref.options.container) {
							ref.layoutDom = document.querySelector(ref.options.container);
							return;
						}
						var layoutID = "noty_layout__" + ref.options.layout;
						ref.layoutDom = document.querySelector("div#" + layoutID);
						if (!ref.layoutDom) {
							ref.layoutDom = document.createElement("div");
							ref.layoutDom.setAttribute("id", layoutID);
							ref.layoutDom.setAttribute("role", "alert");
							ref.layoutDom.setAttribute("aria-live", "polite");
							Utils.addClass(ref.layoutDom, "noty_layout");
							document.querySelector("body").appendChild(ref.layoutDom);
						}
					}
					function queueClose(ref) {
						if (ref.options.timeout) {
							if (ref.options.progressBar && ref.progressDom) Utils.css(ref.progressDom, {
								transition: "width " + ref.options.timeout + "ms linear",
								width: "0%"
							});
							clearTimeout(ref.closeTimer);
							ref.closeTimer = setTimeout(function() {
								ref.close();
							}, ref.options.timeout);
						}
					}
					function dequeueClose(ref) {
						if (ref.options.timeout && ref.closeTimer) {
							clearTimeout(ref.closeTimer);
							ref.closeTimer = -1;
							if (ref.options.progressBar && ref.progressDom) Utils.css(ref.progressDom, {
								transition: "width 0ms linear",
								width: "100%"
							});
						}
					}
					function fire(ref, eventName) {
						if (ref.listeners.hasOwnProperty(eventName)) ref.listeners[eventName].forEach(function(cb) {
							if (typeof cb === "function") cb.apply(ref);
						});
					}
					function openFlow(ref) {
						fire(ref, "afterShow");
						queueClose(ref);
						Utils.addListener(ref.barDom, "mouseenter", function() {
							dequeueClose(ref);
						});
						Utils.addListener(ref.barDom, "mouseleave", function() {
							queueClose(ref);
						});
					}
					function closeFlow(ref) {
						delete Store[ref.id];
						ref.closing = false;
						fire(ref, "afterClose");
						Utils.remove(ref.barDom);
						if (ref.layoutDom.querySelectorAll(".noty_bar").length === 0 && !ref.options.container) Utils.remove(ref.layoutDom);
						if (Utils.inArray("docVisible", ref.options.titleCount.conditions) || Utils.inArray("docHidden", ref.options.titleCount.conditions)) docTitle.decrement();
						queueRender(ref.options.queue);
					}
				}),
				(function(module$5, exports$4, __webpack_require__) {
					"use strict";
					Object.defineProperty(exports$4, "__esModule", { value: true });
					exports$4.NotyButton = void 0;
					var Utils = _interopRequireWildcard(__webpack_require__(0));
					function _interopRequireWildcard(obj) {
						if (obj && obj.__esModule) return obj;
						else {
							var newObj = {};
							if (obj != null) {
								for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
							}
							newObj.default = obj;
							return newObj;
						}
					}
					function _classCallCheck(instance, Constructor) {
						if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
					}
					exports$4.NotyButton = function NotyButton(html, classes, cb) {
						var _this = this;
						var attributes = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
						_classCallCheck(this, NotyButton);
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
				}),
				(function(module$6, exports$5, __webpack_require__) {
					"use strict";
					Object.defineProperty(exports$5, "__esModule", { value: true });
					var _createClass = function() {
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
						if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
					}
					exports$5.Push = function() {
						function Push() {
							var workerPath = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "/service-worker.js";
							_classCallCheck(this, Push);
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
						_createClass(Push, [
							{
								key: "on",
								value: function on(eventName) {
									var cb = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : function() {};
									if (typeof cb === "function" && this.listeners.hasOwnProperty(eventName)) this.listeners[eventName].push(cb);
									return this;
								}
							},
							{
								key: "fire",
								value: function fire(eventName) {
									var _this = this;
									var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
									if (this.listeners.hasOwnProperty(eventName)) this.listeners[eventName].forEach(function(cb) {
										if (typeof cb === "function") cb.apply(_this, params);
									});
								}
							},
							{
								key: "create",
								value: function create() {
									console.log("NOT IMPLEMENTED YET");
								}
							},
							{
								key: "isSupported",
								value: function isSupported() {
									var result = false;
									try {
										result = window.Notification || window.webkitNotifications || navigator.mozNotification || window.external && window.external.msIsSiteMode() !== void 0;
									} catch (e) {}
									return result;
								}
							},
							{
								key: "getPermissionStatus",
								value: function getPermissionStatus() {
									var perm = "default";
									if (window.Notification && window.Notification.permissionLevel) perm = window.Notification.permissionLevel;
									else if (window.webkitNotifications && window.webkitNotifications.checkPermission) switch (window.webkitNotifications.checkPermission()) {
										case 1:
											perm = "default";
											break;
										case 0:
											perm = "granted";
											break;
										default: perm = "denied";
									}
									else if (window.Notification && window.Notification.permission) perm = window.Notification.permission;
									else if (navigator.mozNotification) perm = "granted";
									else if (window.external && window.external.msIsSiteMode() !== void 0) perm = window.external.msIsSiteMode() ? "granted" : "default";
									return perm.toString().toLowerCase();
								}
							},
							{
								key: "getEndpoint",
								value: function getEndpoint(subscription) {
									var endpoint = subscription.endpoint;
									var subscriptionId = subscription.subscriptionId;
									if (subscriptionId && endpoint.indexOf(subscriptionId) === -1) endpoint += "/" + subscriptionId;
									return endpoint;
								}
							},
							{
								key: "isSWRegistered",
								value: function isSWRegistered() {
									try {
										return navigator.serviceWorker.controller.state === "activated";
									} catch (e) {
										return false;
									}
								}
							},
							{
								key: "unregisterWorker",
								value: function unregisterWorker() {
									var self = this;
									if ("serviceWorker" in navigator) navigator.serviceWorker.getRegistrations().then(function(registrations) {
										var _iteratorNormalCompletion = true;
										var _didIteratorError = false;
										var _iteratorError = void 0;
										try {
											for (var _iterator = registrations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
												_step.value.unregister();
												self.fire("onSubscriptionCancel");
											}
										} catch (err) {
											_didIteratorError = true;
											_iteratorError = err;
										} finally {
											try {
												if (!_iteratorNormalCompletion && _iterator.return) _iterator.return();
											} finally {
												if (_didIteratorError) throw _iteratorError;
											}
										}
									});
								}
							},
							{
								key: "requestSubscription",
								value: function requestSubscription() {
									var _this2 = this;
									var userVisibleOnly = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
									var self = this;
									var current = this.getPermissionStatus();
									var cb = function cb(result) {
										if (result === "granted") {
											_this2.fire("onPermissionGranted");
											if ("serviceWorker" in navigator) navigator.serviceWorker.register(_this2.workerPath).then(function() {
												navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
													self.fire("onWorkerSuccess");
													serviceWorkerRegistration.pushManager.subscribe({ userVisibleOnly }).then(function(subscription) {
														var key = subscription.getKey("p256dh");
														var token = subscription.getKey("auth");
														self.subData = {
															endpoint: self.getEndpoint(subscription),
															p256dh: key ? window.btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : null,
															auth: token ? window.btoa(String.fromCharCode.apply(null, new Uint8Array(token))) : null
														};
														self.fire("onSubscriptionSuccess", [self.subData]);
													}).catch(function(err) {
														self.fire("onWorkerError", [err]);
													});
												});
											});
											else self.fire("onWorkerNotSupported");
										} else if (result === "denied") {
											_this2.fire("onPermissionDenied");
											_this2.unregisterWorker();
										}
									};
									if (current === "default") {
										if (window.Notification && window.Notification.requestPermission) window.Notification.requestPermission(cb);
										else if (window.webkitNotifications && window.webkitNotifications.checkPermission) window.webkitNotifications.requestPermission(cb);
									} else cb(current);
								}
							}
						]);
						return Push;
					}();
				}),
				(function(module$7, exports$6, __webpack_require__) {
					(function(process, global) {
						(function(global, factory) {
							module$7.exports = factory();
						})(this, (function() {
							"use strict";
							function objectOrFunction(x) {
								var type = typeof x;
								return x !== null && (type === "object" || type === "function");
							}
							function isFunction(x) {
								return typeof x === "function";
							}
							var _isArray = void 0;
							if (Array.isArray) _isArray = Array.isArray;
							else _isArray = function(x) {
								return Object.prototype.toString.call(x) === "[object Array]";
							};
							var isArray = _isArray;
							var len = 0;
							var vertxNext = void 0;
							var customSchedulerFn = void 0;
							var asap = function asap(callback, arg) {
								queue[len] = callback;
								queue[len + 1] = arg;
								len += 2;
								if (len === 2) if (customSchedulerFn) customSchedulerFn(flush);
								else scheduleFlush();
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
							var isNode = typeof self === "undefined" && typeof process !== "undefined" && {}.toString.call(process) === "[object process]";
							var isWorker = typeof Uint8ClampedArray !== "undefined" && typeof importScripts !== "undefined" && typeof MessageChannel !== "undefined";
							function useNextTick() {
								return function() {
									return process.nextTick(flush);
								};
							}
							function useVertxTimer() {
								if (typeof vertxNext !== "undefined") return function() {
									vertxNext(flush);
								};
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
									var vertx = __webpack_require__(9);
									vertxNext = vertx.runOnLoop || vertx.runOnContext;
									return useVertxTimer();
								} catch (e) {
									return useSetTimeout();
								}
							}
							var scheduleFlush = void 0;
							if (isNode) scheduleFlush = useNextTick();
							else if (BrowserMutationObserver) scheduleFlush = useMutationObserver();
							else if (isWorker) scheduleFlush = useMessageChannel();
							else if (browserWindow === void 0 && true) scheduleFlush = attemptVertx();
							else scheduleFlush = useSetTimeout();
							function then(onFulfillment, onRejection) {
								var _arguments = arguments;
								var parent = this;
								var child = new this.constructor(noop);
								if (child[PROMISE_ID] === void 0) makePromise(child);
								var _state = parent._state;
								if (_state) (function() {
									var callback = _arguments[_state - 1];
									asap(function() {
										return invokeCallback(_state, child, callback, parent._result);
									});
								})();
								else subscribe(parent, child, onFulfillment, onRejection);
								return child;
							}
							function resolve$1(object) {
								var Constructor = this;
								if (object && typeof object === "object" && object.constructor === Constructor) return object;
								var promise = new Constructor(noop);
								resolve(promise, object);
								return promise;
							}
							var PROMISE_ID = Math.random().toString(36).substring(16);
							function noop() {}
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
								asap(function(promise) {
									var sealed = false;
									var error = tryThen(then$$1, thenable, function(value) {
										if (sealed) return;
										sealed = true;
										if (thenable !== value) resolve(promise, value);
										else fulfill(promise, value);
									}, function(reason) {
										if (sealed) return;
										sealed = true;
										reject(promise, reason);
									}, "Settle: " + (promise._label || " unknown promise"));
									if (!sealed && error) {
										sealed = true;
										reject(promise, error);
									}
								}, promise);
							}
							function handleOwnThenable(promise, thenable) {
								if (thenable._state === FULFILLED) fulfill(promise, thenable._result);
								else if (thenable._state === REJECTED) reject(promise, thenable._result);
								else subscribe(thenable, void 0, function(value) {
									return resolve(promise, value);
								}, function(reason) {
									return reject(promise, reason);
								});
							}
							function handleMaybeThenable(promise, maybeThenable, then$$1) {
								if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) handleOwnThenable(promise, maybeThenable);
								else if (then$$1 === GET_THEN_ERROR) {
									reject(promise, GET_THEN_ERROR.error);
									GET_THEN_ERROR.error = null;
								} else if (then$$1 === void 0) fulfill(promise, maybeThenable);
								else if (isFunction(then$$1)) handleForeignThenable(promise, maybeThenable, then$$1);
								else fulfill(promise, maybeThenable);
							}
							function resolve(promise, value) {
								if (promise === value) reject(promise, selfFulfillment());
								else if (objectOrFunction(value)) handleMaybeThenable(promise, value, getThen(value));
								else fulfill(promise, value);
							}
							function publishRejection(promise) {
								if (promise._onerror) promise._onerror(promise._result);
								publish(promise);
							}
							function fulfill(promise, value) {
								if (promise._state !== PENDING) return;
								promise._result = value;
								promise._state = FULFILLED;
								if (promise._subscribers.length !== 0) asap(publish, promise);
							}
							function reject(promise, reason) {
								if (promise._state !== PENDING) return;
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
								if (length === 0 && parent._state) asap(publish, parent);
							}
							function publish(promise) {
								var subscribers = promise._subscribers;
								var settled = promise._state;
								if (subscribers.length === 0) return;
								var child = void 0, callback = void 0, detail = promise._result;
								for (var i = 0; i < subscribers.length; i += 3) {
									child = subscribers[i];
									callback = subscribers[i + settled];
									if (child) invokeCallback(settled, child, callback, detail);
									else callback(detail);
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
								var hasCallback = isFunction(callback), value = void 0, error = void 0, succeeded = void 0, failed = void 0;
								if (hasCallback) {
									value = tryCatch(callback, detail);
									if (value === TRY_CATCH_ERROR) {
										failed = true;
										error = value.error;
										value.error = null;
									} else succeeded = true;
									if (promise === value) {
										reject(promise, cannotReturnOwn());
										return;
									}
								} else {
									value = detail;
									succeeded = true;
								}
								if (promise._state !== PENDING) {} else if (hasCallback && succeeded) resolve(promise, value);
								else if (failed) reject(promise, error);
								else if (settled === FULFILLED) fulfill(promise, value);
								else if (settled === REJECTED) reject(promise, value);
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
								this.promise = new Constructor(noop);
								if (!this.promise[PROMISE_ID]) makePromise(this.promise);
								if (isArray(input)) {
									this.length = input.length;
									this._remaining = input.length;
									this._result = new Array(this.length);
									if (this.length === 0) fulfill(this.promise, this._result);
									else {
										this.length = this.length || 0;
										this._enumerate(input);
										if (this._remaining === 0) fulfill(this.promise, this._result);
									}
								} else reject(this.promise, validationError());
							}
							function validationError() {
								return new Error("Array Methods must be provided an Array");
							}
							Enumerator$1.prototype._enumerate = function(input) {
								for (var i = 0; this._state === PENDING && i < input.length; i++) this._eachEntry(input[i], i);
							};
							Enumerator$1.prototype._eachEntry = function(entry, i) {
								var c = this._instanceConstructor;
								var resolve$$1 = c.resolve;
								if (resolve$$1 === resolve$1) {
									var _then = getThen(entry);
									if (_then === then && entry._state !== PENDING) this._settledAt(entry._state, i, entry._result);
									else if (typeof _then !== "function") {
										this._remaining--;
										this._result[i] = entry;
									} else if (c === Promise$2) {
										var promise = new c(noop);
										handleMaybeThenable(promise, entry, _then);
										this._willSettleAt(promise, i);
									} else this._willSettleAt(new c(function(resolve$$1) {
										return resolve$$1(entry);
									}), i);
								} else this._willSettleAt(resolve$$1(entry), i);
							};
							Enumerator$1.prototype._settledAt = function(state, i, value) {
								var promise = this.promise;
								if (promise._state === PENDING) {
									this._remaining--;
									if (state === REJECTED) reject(promise, value);
									else this._result[i] = value;
								}
								if (this._remaining === 0) fulfill(promise, this._result);
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
								if (!isArray(entries)) return new Constructor(function(_, reject) {
									return reject(new TypeError("You must pass an array to race."));
								});
								else return new Constructor(function(resolve, reject) {
									var length = entries.length;
									for (var i = 0; i < length; i++) Constructor.resolve(entries[i]).then(resolve, reject);
								});
							}
							function reject$1(reason) {
								var promise = new this(noop);
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
								if (noop !== resolver) {
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
								then,
								"catch": function _catch(onRejection) {
									return this.then(null, onRejection);
								}
							};
							function polyfill$1() {
								var local = void 0;
								if (typeof global !== "undefined") local = global;
								else if (typeof self !== "undefined") local = self;
								else try {
									local = Function("return this")();
								} catch (e) {
									throw new Error("polyfill failed because global object is unavailable in this environment");
								}
								var P = local.Promise;
								if (P) {
									var promiseToString = null;
									try {
										promiseToString = Object.prototype.toString.call(P.resolve());
									} catch (e) {}
									if (promiseToString === "[object Promise]" && !P.cast) return;
								}
								local.Promise = Promise$2;
							}
							Promise$2.polyfill = polyfill$1;
							Promise$2.Promise = Promise$2;
							return Promise$2;
						}));
					}).call(exports$6, __webpack_require__(7), __webpack_require__(8));
				}),
				(function(module$8, exports$7) {}),
				(function(module$9, exports$8, __webpack_require__) {
					"use strict";
					Object.defineProperty(exports$8, "__esModule", { value: true });
					var _createClass = function() {
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
					var _es6Promise2 = _interopRequireDefault(__webpack_require__(4));
					var Utils = _interopRequireWildcard(__webpack_require__(0));
					var API = _interopRequireWildcard(__webpack_require__(1));
					var _button = __webpack_require__(2);
					var _push = __webpack_require__(3);
					function _interopRequireWildcard(obj) {
						if (obj && obj.__esModule) return obj;
						else {
							var newObj = {};
							if (obj != null) {
								for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
							}
							newObj.default = obj;
							return newObj;
						}
					}
					function _interopRequireDefault(obj) {
						return obj && obj.__esModule ? obj : { default: obj };
					}
					function _classCallCheck(instance, Constructor) {
						if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
					}
					exports$8.default = function() {
						function Noty() {
							var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
							_classCallCheck(this, Noty);
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
						_createClass(Noty, [
							{
								key: "on",
								value: function on(eventName) {
									var cb = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : function() {};
									if (typeof cb === "function" && this.listeners.hasOwnProperty(eventName)) this.listeners[eventName].push(cb);
									return this;
								}
							},
							{
								key: "show",
								value: function show() {
									var _this = this;
									if (this.options.killer === true) Noty.closeAll();
									else if (typeof this.options.killer === "string") Noty.closeAll(this.options.killer);
									var queueCounts = API.getQueueCounts(this.options.queue);
									if (queueCounts.current >= queueCounts.maxVisible || API.PageHidden && this.options.visibilityControl) {
										API.addToQueue(this);
										if (API.PageHidden && this.hasSound && Utils.inArray("docHidden", this.options.sounds.conditions)) Utils.createAudioElements(this);
										if (API.PageHidden && Utils.inArray("docHidden", this.options.titleCount.conditions)) API.docTitle.increment();
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
									if (this.options.force) this.layoutDom.insertBefore(this.barDom, this.layoutDom.firstChild);
									else this.layoutDom.appendChild(this.barDom);
									if (this.hasSound && !this.soundPlayed && Utils.inArray("docVisible", this.options.sounds.conditions)) Utils.createAudioElements(this);
									if (Utils.inArray("docVisible", this.options.titleCount.conditions)) API.docTitle.increment();
									this.shown = true;
									this.closed = false;
									if (API.hasButtons(this)) Object.keys(this.options.buttons).forEach(function(key) {
										var btn = _this.barDom.querySelector("#" + _this.options.buttons[key].id);
										Utils.addListener(btn, "click", function(e) {
											Utils.stopPropagation(e);
											_this.options.buttons[key].cb();
										});
									});
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
									if (this.options.progressBar) Utils.addClass(this.barDom, "noty_has_progressbar");
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
									if (this.options.animation.open === null) this.promises.show = new _es6Promise2.default(function(resolve) {
										resolve();
									});
									else if (typeof this.options.animation.open === "function") this.promises.show = new _es6Promise2.default(this.options.animation.open.bind(this));
									else {
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
							},
							{
								key: "stop",
								value: function stop() {
									API.dequeueClose(this);
									return this;
								}
							},
							{
								key: "resume",
								value: function resume() {
									API.queueClose(this);
									return this;
								}
							},
							{
								key: "setTimeout",
								value: function(_setTimeout) {
									function setTimeout(_x) {
										return _setTimeout.apply(this, arguments);
									}
									setTimeout.toString = function() {
										return _setTimeout.toString();
									};
									return setTimeout;
								}(function(ms) {
									this.stop();
									this.options.timeout = ms;
									if (this.barDom) {
										if (this.options.timeout) Utils.addClass(this.barDom, "noty_has_timeout");
										else Utils.removeClass(this.barDom, "noty_has_timeout");
										var _t = this;
										setTimeout(function() {
											_t.resume();
										}, 100);
									}
									return this;
								})
							},
							{
								key: "setText",
								value: function setText(html) {
									var optionsOverride = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
									if (this.barDom) this.barDom.querySelector(".noty_body").innerHTML = html;
									if (optionsOverride) this.options.text = html;
									return this;
								}
							},
							{
								key: "setType",
								value: function setType(type) {
									var _this2 = this;
									var optionsOverride = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
									if (this.barDom) {
										Utils.classList(this.barDom).split(" ").forEach(function(c) {
											if (c.substring(0, 11) === "noty_type__") Utils.removeClass(_this2.barDom, c);
										});
										Utils.addClass(this.barDom, "noty_type__" + type);
									}
									if (optionsOverride) this.options.type = type;
									return this;
								}
							},
							{
								key: "setTheme",
								value: function setTheme(theme) {
									var _this3 = this;
									var optionsOverride = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
									if (this.barDom) {
										Utils.classList(this.barDom).split(" ").forEach(function(c) {
											if (c.substring(0, 12) === "noty_theme__") Utils.removeClass(_this3.barDom, c);
										});
										Utils.addClass(this.barDom, "noty_theme__" + theme);
									}
									if (optionsOverride) this.options.theme = theme;
									return this;
								}
							},
							{
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
									if (this.options.animation.close === null) this.promises.close = new _es6Promise2.default(function(resolve) {
										resolve();
									});
									else if (typeof this.options.animation.close === "function") this.promises.close = new _es6Promise2.default(this.options.animation.close.bind(this));
									else {
										Utils.addClass(this.barDom, this.options.animation.close);
										this.promises.close = new _es6Promise2.default(function(resolve) {
											Utils.addListener(_this4.barDom, Utils.animationEndEvents, function() {
												if (_this4.options.force) Utils.remove(_this4.barDom);
												else API.ghostFix(_this4);
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
							}
						], [
							{
								key: "closeAll",
								value: function closeAll() {
									var queueName = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
									Object.keys(API.Store).forEach(function(id) {
										if (queueName) {
											if (API.Store[id].options.queue === queueName && API.Store[id].killable) API.Store[id].close();
										} else if (API.Store[id].killable) API.Store[id].close();
									});
									return this;
								}
							},
							{
								key: "overrideDefaults",
								value: function overrideDefaults(obj) {
									API.Defaults = Utils.deepExtend({}, API.Defaults, obj);
									return this;
								}
							},
							{
								key: "setMaxVisible",
								value: function setMaxVisible() {
									var amount = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : API.DefaultMaxVisible;
									var queueName = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "global";
									if (!API.Queues.hasOwnProperty(queueName)) API.Queues[queueName] = {
										maxVisible: amount,
										queue: []
									};
									API.Queues[queueName].maxVisible = amount;
									return this;
								}
							},
							{
								key: "button",
								value: function button(innerHtml) {
									var classes = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
									var cb = arguments[2];
									var attributes = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
									return new _button.NotyButton(innerHtml, classes, cb, attributes);
								}
							},
							{
								key: "version",
								value: function version() {
									return "3.1.4";
								}
							},
							{
								key: "Push",
								value: function Push(workerPath) {
									return new _push.Push(workerPath);
								}
							}
						]);
						return Noty;
					}();
					Utils.visibilityChangeFlow();
					module$9.exports = exports$8["default"];
				}),
				(function(module$10, exports$9) {
					var process = module$10.exports = {};
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
							if (typeof setTimeout === "function") cachedSetTimeout = setTimeout;
							else cachedSetTimeout = defaultSetTimout;
						} catch (e) {
							cachedSetTimeout = defaultSetTimout;
						}
						try {
							if (typeof clearTimeout === "function") cachedClearTimeout = clearTimeout;
							else cachedClearTimeout = defaultClearTimeout;
						} catch (e) {
							cachedClearTimeout = defaultClearTimeout;
						}
					})();
					function runTimeout(fun) {
						if (cachedSetTimeout === setTimeout) return setTimeout(fun, 0);
						if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
							cachedSetTimeout = setTimeout;
							return setTimeout(fun, 0);
						}
						try {
							return cachedSetTimeout(fun, 0);
						} catch (e) {
							try {
								return cachedSetTimeout.call(null, fun, 0);
							} catch (e) {
								return cachedSetTimeout.call(this, fun, 0);
							}
						}
					}
					function runClearTimeout(marker) {
						if (cachedClearTimeout === clearTimeout) return clearTimeout(marker);
						if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
							cachedClearTimeout = clearTimeout;
							return clearTimeout(marker);
						}
						try {
							return cachedClearTimeout(marker);
						} catch (e) {
							try {
								return cachedClearTimeout.call(null, marker);
							} catch (e) {
								return cachedClearTimeout.call(this, marker);
							}
						}
					}
					var queue = [];
					var draining = false;
					var currentQueue;
					var queueIndex = -1;
					function cleanUpNextTick() {
						if (!draining || !currentQueue) return;
						draining = false;
						if (currentQueue.length) queue = currentQueue.concat(queue);
						else queueIndex = -1;
						if (queue.length) drainQueue();
					}
					function drainQueue() {
						if (draining) return;
						var timeout = runTimeout(cleanUpNextTick);
						draining = true;
						var len = queue.length;
						while (len) {
							currentQueue = queue;
							queue = [];
							while (++queueIndex < len) if (currentQueue) currentQueue[queueIndex].run();
							queueIndex = -1;
							len = queue.length;
						}
						currentQueue = null;
						draining = false;
						runClearTimeout(timeout);
					}
					process.nextTick = function(fun) {
						var args = new Array(arguments.length - 1);
						if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
						queue.push(new Item(fun, args));
						if (queue.length === 1 && !draining) runTimeout(drainQueue);
					};
					function Item(fun, array) {
						this.fun = fun;
						this.array = array;
					}
					Item.prototype.run = function() {
						this.fun.apply(null, this.array);
					};
					process.title = "browser";
					process.browser = true;
					process.env = {};
					process.argv = [];
					process.version = "";
					process.versions = {};
					function noop() {}
					process.on = noop;
					process.addListener = noop;
					process.once = noop;
					process.off = noop;
					process.removeListener = noop;
					process.removeAllListeners = noop;
					process.emit = noop;
					process.prependListener = noop;
					process.prependOnceListener = noop;
					process.listeners = function(name) {
						return [];
					};
					process.binding = function(name) {
						throw new Error("process.binding is not supported");
					};
					process.cwd = function() {
						return "/";
					};
					process.chdir = function(dir) {
						throw new Error("process.chdir is not supported");
					};
					process.umask = function() {
						return 0;
					};
				}),
				(function(module$11, exports$10) {
					var g = (function() {
						return this;
					})();
					try {
						g = g || Function("return this")() || (0, eval)("this");
					} catch (e) {
						if (typeof window === "object") g = window;
					}
					module$11.exports = g;
				}),
				(function(module$12, exports$11) {})
			]);
		});
	}))(), 1);
	var { t: t$3 } = i18n.global;
	var notyConfirmOption = {
		type: "error",
		layout: "bottomRight",
		theme: "nest",
		timeout: false,
		closeWith: []
	};
	var downloadAgainConfirm = async (title, hasQueue = false) => {
		if (hasQueue && settings.autoCancelDownloadedManga) {
			downloadedTip(title);
			return false;
		}
		return new Promise((resolve) => {
			const n = new import_noty.default({
				...notyConfirmOption,
				text: t$3("dialog.downloadAgainConfirm", {
					title,
					hasQueue
				}),
				buttons: [import_noty.default.button(t$3("dialog.yes"), "btn btn-noty-blue btn-noty", () => {
					n.close();
					resolve(true);
				}), import_noty.default.button(t$3("dialog.no"), "btn btn-noty-green btn-noty", () => {
					n.close();
					resolve(false);
				})]
			});
			n.show();
		});
	};
	var errorRetryConfirm = (action, noCb, yesCb) => {
		if (settings.autoRetryWhenErrorOccurs) {
			errorRetryTip(action);
			yesCb?.();
			return;
		}
		const n = new import_noty.default({
			...notyConfirmOption,
			text: t$3("dialog.errorRetryConfirm", { action }),
			buttons: [import_noty.default.button(t$3("dialog.no"), "btn btn-noty-blue btn-noty", () => {
				n.close();
				noCb?.();
			}), import_noty.default.button(t$3("dialog.yes"), "btn btn-noty-green btn-noty", () => {
				n.close();
				yesCb?.();
			})]
		});
		n.show();
	};
	var downloadedTip = (title) => {
		new import_noty.default({
			type: "info",
			layout: "bottomRight",
			theme: "nest",
			closeWith: [],
			timeout: 4e3,
			text: t$3("dialog.downloadedTip", { title })
		}).show();
	};
	var errorRetryTip = (action) => {
		new import_noty.default({
			type: "warning",
			layout: "bottomRight",
			theme: "nest",
			closeWith: [],
			timeout: 3e3,
			text: t$3("dialog.errorRetryTip", { action })
		}).show();
	};
	var import_StreamSaver = __commonJSMin(((exports, module) => {
		((name, definition) => {
			typeof module !== "undefined" ? module.exports = definition() : typeof define === "function" && typeof define.amd === "object" ? define(definition) : exports[name] = definition();
		})("streamSaver", () => {
			"use strict";
			const global = typeof window === "object" ? window : exports;
			if (!global.HTMLElement) console.warn("streamsaver is meant to run on browsers main thread");
			let mitmTransporter = null;
			let supportsTransferable = false;
			const test = (fn) => {
				try {
					fn();
				} catch (e) {}
			};
			const ponyfill = global.WebStreamsPolyfill || {};
			const isSecureContext = global.isSecureContext;
			let useBlobFallback = /constructor/i.test(global.HTMLElement) || !!global.safari || !!global.WebKitPoint;
			const downloadStrategy = isSecureContext || "MozAppearance" in document.documentElement.style ? "iframe" : "navigate";
			const streamSaver = {
				createWriteStream,
				WritableStream: global.WritableStream || ponyfill.WritableStream,
				supported: true,
				version: {
					full: "2.0.5",
					major: 2,
					minor: 0,
					dot: 5
				},
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
					frame: global.open(src, "popup", options),
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
						global.removeEventListener("message", onReady);
						popup.dispatchEvent(new Event("load"));
					}
				};
				global.addEventListener("message", onReady);
				return popup;
			}
			try {
				new Response(new ReadableStream());
				if (isSecureContext && !("serviceWorker" in navigator)) useBlobFallback = true;
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
				if (!mitmTransporter) mitmTransporter = isSecureContext ? makeIframe(streamSaver.mitm) : makePopup(streamSaver.mitm);
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
				} else opts = options || {};
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
					if (opts.size) response.headers["Content-Length"] = opts.size;
					const args = [
						response,
						"*",
						[channel.port2]
					];
					if (supportsTransferable) {
						const transformer = downloadStrategy === "iframe" ? void 0 : {
							transform(chunk, controller) {
								if (!(chunk instanceof Uint8Array)) throw new TypeError("Can only write Uint8Arrays");
								bytesWritten += chunk.length;
								controller.enqueue(chunk);
								if (downloadUrl) {
									location.href = downloadUrl;
									downloadUrl = null;
								}
							},
							flush() {
								if (downloadUrl) location.href = downloadUrl;
							}
						};
						ts = new streamSaver.TransformStream(transformer, opts.writableStrategy, opts.readableStrategy);
						const readableStream = ts.readable;
						channel.port1.postMessage({ readableStream }, [readableStream]);
					}
					channel.port1.onmessage = (evt) => {
						if (evt.data.download) if (downloadStrategy === "navigate") {
							mitmTransporter.remove();
							mitmTransporter = null;
							if (bytesWritten) location.href = evt.data.download;
							else downloadUrl = evt.data.download;
						} else {
							if (mitmTransporter.isPopup) {
								mitmTransporter.remove();
								mitmTransporter = null;
								if (downloadStrategy === "iframe") makeIframe(streamSaver.mitm);
							}
							makeIframe(evt.data.download);
						}
						else if (evt.data.abort) {
							chunks = [];
							channel.port1.postMessage("abort");
							channel.port1.onmessage = null;
							channel.port1.close();
							channel.port2.close();
							channel = null;
						}
					};
					if (mitmTransporter.loaded) mitmTransporter.postMessage(...args);
					else mitmTransporter.addEventListener("load", () => {
						mitmTransporter.postMessage(...args);
					}, { once: true });
				}
				let chunks = [];
				return !useBlobFallback && ts && ts.writable || new streamSaver.WritableStream({
					write(chunk) {
						if (!(chunk instanceof Uint8Array)) throw new TypeError("Can only write Uint8Arrays");
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
							const blob = new Blob(chunks, { type: "application/octet-stream; charset=utf-8" });
							const link = document.createElement("a");
							link.href = URL.createObjectURL(blob);
							link.download = filename;
							link.click();
						} else channel.port1.postMessage("end");
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
	}))();
	var jsContent = "(function(){\n/**\n* @license\n* Copyright 2019 Google LLC\n* SPDX-License-Identifier: Apache-2.0\n*/\nlet e=Symbol(`Comlink.proxy`),t=Symbol(`Comlink.endpoint`),n=Symbol(`Comlink.releaseProxy`),r=Symbol(`Comlink.finalizer`),i=Symbol(`Comlink.thrown`),a=e=>typeof e==`object`&&!!e||typeof e==`function`,o=new Map([[`proxy`,{canHandle:t=>a(t)&&t[e],serialize(e){let{port1:t,port2:n}=new MessageChannel;return c(e,t),[n,[n]]},deserialize(e){return e.start(),d(e)}}],[`throw`,{canHandle:e=>a(e)&&i in e,serialize({value:e}){let t;return t=e instanceof Error?{isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:{isError:!1,value:e},[t,[]]},deserialize(e){throw e.isError?Object.assign(Error(e.value.message),e.value):e.value}}]]);function s(e,t){for(let n of e)if(t===n||n===`*`||n instanceof RegExp&&n.test(t))return!0;return!1}function c(e,t=globalThis,n=[`*`]){t.addEventListener(`message`,function a(o){if(!o||!o.data)return;if(!s(n,o.origin)){console.warn(`Invalid origin '${o.origin}' for comlink proxy`);return}let{id:l,type:d,path:f}=Object.assign({path:[]},o.data),p=(o.data.argumentList||[]).map(T),m;try{let t=f.slice(0,-1).reduce((e,t)=>e[t],e),n=f.reduce((e,t)=>e[t],e);switch(d){case`GET`:m=n;break;case`SET`:t[f.slice(-1)[0]]=T(o.data.value),m=!0;break;case`APPLY`:m=n.apply(t,p);break;case`CONSTRUCT`:m=C(new n(...p));break;case`ENDPOINT`:{let{port1:t,port2:n}=new MessageChannel;c(e,n),m=S(t,[t])}break;case`RELEASE`:m=void 0;break;default:return}}catch(e){m={value:e,[i]:0}}Promise.resolve(m).catch(e=>({value:e,[i]:0})).then(n=>{let[i,o]=w(n);t.postMessage(Object.assign(Object.assign({},i),{id:l}),o),d===`RELEASE`&&(t.removeEventListener(`message`,a),u(t),r in e&&typeof e[r]==`function`&&e[r]())}).catch(e=>{let[n,r]=w({value:TypeError(`Unserializable return value`),[i]:0});t.postMessage(Object.assign(Object.assign({},n),{id:l}),r)})}),t.start&&t.start()}function l(e){return e.constructor.name===`MessagePort`}function u(e){l(e)&&e.close()}function d(e,t){let n=new Map;return e.addEventListener(`message`,function(e){let{data:t}=e;if(!t||!t.id)return;let r=n.get(t.id);if(r)try{r(t)}finally{n.delete(t.id)}}),v(e,n,[],t)}function f(e){if(e)throw Error(`Proxy has been released and is not useable`)}function p(e){return E(e,new Map,{type:`RELEASE`}).then(()=>{u(e)})}let m=new WeakMap,h=`FinalizationRegistry`in globalThis&&new FinalizationRegistry(e=>{let t=(m.get(e)||0)-1;m.set(e,t),t===0&&p(e)});function g(e,t){let n=(m.get(t)||0)+1;m.set(t,n),h&&h.register(e,t,e)}function _(e){h&&h.unregister(e)}function v(e,r,i=[],a=function(){}){let o=!1,s=new Proxy(a,{get(t,a){if(f(o),a===n)return()=>{_(s),p(e),r.clear(),o=!0};if(a===`then`){if(i.length===0)return{then:()=>s};let t=E(e,r,{type:`GET`,path:i.map(e=>e.toString())}).then(T);return t.then.bind(t)}return v(e,r,[...i,a])},set(t,n,a){f(o);let[s,c]=w(a);return E(e,r,{type:`SET`,path:[...i,n].map(e=>e.toString()),value:s},c).then(T)},apply(n,a,s){f(o);let c=i[i.length-1];if(c===t)return E(e,r,{type:`ENDPOINT`}).then(T);if(c===`bind`)return v(e,r,i.slice(0,-1));let[l,u]=b(s);return E(e,r,{type:`APPLY`,path:i.map(e=>e.toString()),argumentList:l},u).then(T)},construct(t,n){f(o);let[a,s]=b(n);return E(e,r,{type:`CONSTRUCT`,path:i.map(e=>e.toString()),argumentList:a},s).then(T)}});return g(s,e),s}function y(e){return Array.prototype.concat.apply([],e)}function b(e){let t=e.map(w);return[t.map(e=>e[0]),y(t.map(e=>e[1]))]}let x=new WeakMap;function S(e,t){return x.set(e,t),e}function C(t){return Object.assign(t,{[e]:!0})}function w(e){for(let[t,n]of o)if(n.canHandle(e)){let[r,i]=n.serialize(e);return[{type:`HANDLER`,name:t,value:r},i]}return[{type:`RAW`,value:e},x.get(e)||[]]}function T(e){switch(e.type){case`HANDLER`:return o.get(e.name).deserialize(e.value);case`RAW`:return e.value}}function E(e,t,n,r){return new Promise(i=>{let a=D();t.set(a,i),e.start&&e.start(),e.postMessage(Object.assign({id:a},n),r)})}function D(){return[,,,,].fill(0).map(()=>Math.floor(Math.random()*(2**53-1)).toString(16)).join(`-`)}c({convertWebpTo:async(e,t,n)=>{let r=await createImageBitmap(new Blob([e],{type:`image/webp`})),i=new OffscreenCanvas(r.width,r.height);i.getContext(`bitmaprenderer`).transferFromImageBitmap(r);let a=await(await i.convertToBlob({type:t,quality:n})).arrayBuffer();return S({buffer:a,type:t},[a])}})})();";
	var blob = typeof self !== "undefined" && self.Blob && new Blob(["(self.URL || self.webkitURL).revokeObjectURL(self.location.href);", jsContent], { type: "text/javascript;charset=utf-8" });
	function WorkerWrapper(options) {
		let objURL;
		try {
			objURL = blob && (self.URL || self.webkitURL).createObjectURL(blob);
			if (!objURL) throw "";
			const worker = new Worker(objURL, { name: options?.name });
			worker.addEventListener("error", () => {
				(self.URL || self.webkitURL).revokeObjectURL(objURL);
			});
			return worker;
		} catch (e) {
			return new Worker("data:text/javascript;charset=utf-8," + encodeURIComponent(jsContent), { name: options?.name });
		}
	}
	var mimeToExt = {
		[MIME.JPG]: "jpg",
		[MIME.PNG]: "png"
	};
	var ImgConverter = class {
		#worker;
		async convertWebpTo(...args) {
			const { buffer, type } = await (await this.getWorker()).convertWebpTo(...args);
			return {
				buffer,
				ext: mimeToExt[type] || "unknown"
			};
		}
		async getWorker() {
			if (!this.#worker) this.#worker = this.createWorker();
			return this.#worker;
		}
		async createWorker() {
			return wrap(new WorkerWrapper());
		}
	};
	var textareaEl;
	var encodeHtml = (text) => {
		if (!textareaEl) textareaEl = document.createElement("textarea");
		textareaEl.textContent = text;
		const encodedText = textareaEl.innerHTML;
		textareaEl.innerHTML = "";
		return encodedText;
	};
	var encodeXml = (text) => encodeHtml(text).replace(/&nbsp;/g, " ");
	var langMap = {
		chinese: "zh",
		english: "en",
		japanese: "ja"
	};
	var ComicInfoXmlBuilder = class {
		serializer = new XMLSerializer();
		doc = document.implementation.createDocument(null, "ComicInfo");
		constructor(info) {
			this.setRootNS();
			this.appendElement("Title", settings.metaFileTitleLanguage in info.title ? info.title[settings.metaFileTitleLanguage] : info.title.english);
			this.appendElement("Notes", `Created by nHentai Helper (Tsuk1ko/nhentai-helper) on ${new Date().toISOString()}`);
			if (info.uploadDate) {
				const date = new Date(info.uploadDate * 1e3);
				this.appendElement("Year", date.getUTCFullYear());
				this.appendElement("Month", date.getUTCMonth() + 1);
				this.appendElement("Day", date.getUTCDate());
			}
			const getTags = (type) => info.tags.filter((t) => t.type === type);
			const getTagsBatch = (types) => {
				const set = new Set(types);
				return info.tags.filter((t) => set.has(t.type));
			};
			const artistTags = getTags("artist");
			if (artistTags.length) this.appendElement("Writer", artistTags.map((t) => t.name).join(", "));
			const tags = getTagsBatch(["tag", ...settings.comicInfoTagsExtraInclude]);
			if (tags.length) this.appendElement("Tags", tags.map((t) => settings.comicInfoTagsExtraWithType && t.type !== "tag" ? `${t.type}:${t.name}` : t.name).join(", "));
			this.appendElement("Web", `${location.origin}/g/${info.gid}`);
			this.appendElement("PageCount", info.pages.length);
			const languageTag = info.tags.find(({ type, name }) => type === "language" && name in langMap);
			if (languageTag) this.appendElement("LanguageISO", langMap[languageTag.name]);
			this.appendElement("Format", /\[digital\]/i.test(info.title.english) ? "Digital" : "TBP");
			this.appendElement("Manga", "Yes");
			const characterTags = getTags("character");
			if (characterTags.length) this.appendElement("Characters", characterTags.map((t) => t.name).join(", "));
			const pagesEl = this.createElement("Pages");
			const pageEls = info.pages.map(({ i, w, h }) => this.createElement("Page", void 0, {
				Image: i,
				ImageWidth: w,
				ImageHeight: h
			}));
			pagesEl.append(...pageEls);
			this.root.append(pagesEl);
		}
		get root() {
			return this.doc.documentElement;
		}
		build() {
			return `<?xml version="1.0" encoding="utf-8"?>\n${this.serializer.serializeToString(this.doc)}`;
		}
		setRootNS() {
			this.root.setAttribute("xmlns:xsd", "http://www.w3.org/2001/XMLSchema");
			this.root.setAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
		}
		createElement(name, value, attrs) {
			const el = this.doc.createElement(name);
			if (!isNil(value)) el.innerHTML = encodeXml(String(value));
			if (attrs) objectEach(attrs, (v, k) => {
				if (!isNil(v)) el.setAttribute(k, String(v));
			});
			return el;
		}
		appendElement(name, value, attrs) {
			this.root.append(this.createElement(name, value, attrs));
		}
	};
	var EzeInfoJsonBuilder = class {
		data;
		constructor(info) {
			const date = info.uploadDate ? new Date(info.uploadDate * 1e3) : void 0;
			this.data = { gallery_info: {
				title: info.title.english,
				title_title_original: info.title.japanese,
				link: `${location.origin}/g/${info.gid}`,
				category: info.tags.find(({ type }) => type === "category")?.name,
				tags: mapValues(groupBy(info.tags, (t) => t.type), (tags) => tags.map((t) => t.name)),
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
			} };
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
			return {
				language,
				translated
			};
		}
	};
	var metaBuilderMap = {
		ComicInfoXml: {
			name: "ComicInfo.xml",
			Builder: ComicInfoXmlBuilder
		},
		EzeInfoJson: {
			name: "info.json",
			Builder: EzeInfoJsonBuilder
		}
	};
	var generateMetaFiles = (info) => {
		if (!settings.addMetaFile.length) return [];
		const files = [];
		for (const key of settings.addMetaFile) if (key in metaBuilderMap) {
			const { name, Builder } = metaBuilderMap[key];
			files.push({
				name,
				data: new Builder(info).build()
			});
		}
		return files;
	};
	var MultiThread = class {
		tasks;
		taskFunc;
		params;
		threads = [];
		taskIndex = 0;
		started = false;
		aborted = false;
		constructor(tasks, taskFunc, params) {
			this.tasks = tasks;
			this.taskFunc = taskFunc;
			this.params = params;
		}
		start() {
			if (this.started) throw new Error("Multi-thread started.");
			this.started = true;
			for (let threadId = 0; threadId < settings.threadNum; threadId++) this.threads.push(this.startThread(threadId));
			return {
				abort: () => {
					this.aborted = true;
					this.threads.forEach(({ abort }) => abort());
				},
				promise: Promise.all(this.threads.map(({ promise }) => promise)).then()
			};
		}
		startThread(threadId) {
			let abortFunc;
			return {
				abort: () => abortFunc?.(),
				promise: (async () => {
					while (true) {
						if (this.aborted) break;
						const i = this.taskIndex++;
						if (i >= this.tasks.length) break;
						const { abort, promise } = await this.taskFunc(this.tasks[i], threadId, this.params);
						abortFunc = abort;
						await promise;
					}
				})()
			};
		}
	};
	var Counter = class {
		key;
		countMap;
		countKeys;
		blackList = new Set();
		constructor(keys) {
			if (!keys.length) throw new Error("Counter no key");
			this.countKeys = [...keys];
			this.reset();
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
			this.blackList.add(key);
			return this.availableKeys.length > 0;
		}
		getMin(key) {
			this.updateKey(key);
			return minBy(this.availableKeys, (key) => this.countMap[key]);
		}
		getRandom(key) {
			this.updateKey(key);
			return sample(this.availableKeys);
		}
		updateKey(key) {
			if (this.key === key) return;
			this.key = key;
			this.reset();
		}
		reset() {
			this.countMap = Object.fromEntries(this.countKeys.map((key) => [key, 0]));
			this.blackList.clear();
		}
	};
	var loadHTML = (html) => {
		return (0, jquery.default)(new DOMParser().parseFromString(html, "text/html").body);
	};
	var OrderCache = class extends Map {
		maxSize;
		order = [];
		constructor(maxSize) {
			super();
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
			if (has) this.order.splice(this.order.findIndex((val) => val === key), 1);
			return has;
		}
		clear() {
			super.clear();
			this.order = [];
		}
	};
	var RequestAbortError = class extends Error {
		constructor(url) {
			super(`Request abort ${url}`);
		}
	};
	var isAbortError = (e) => e instanceof RequestAbortError;
	var requestArrayBufferGm = (params) => {
		const { url: urlGetter, retry = 3, on404 } = params;
		let abortFunc;
		return {
			abort: () => abortFunc?.(),
			dataPromise: new Promise((resolve, reject) => {
				try {
					const url = typeof urlGetter === "function" ? urlGetter() : urlGetter;
					const req = _GM_xmlhttpRequest({
						method: "GET",
						url,
						responseType: "arraybuffer",
						onerror: (e) => {
							if (retry === 0) {
								logger.error("Network error", url, e);
								reject(e);
							} else {
								logger.warn("Network error, retry", url, e);
								setTimeout(() => {
									const { abort, dataPromise } = requestArrayBufferGm({
										...params,
										retry: retry - 1
									});
									abortFunc = abort;
									resolve(dataPromise);
								}, 1e3);
							}
						},
						onload: (r) => {
							const { status, response } = r;
							if (status === 200) resolve(response);
							else if (retry === 0) reject(r);
							else {
								const additionRetry = status === 404 ? on404?.(r.finalUrl) : false;
								logger.warn("Request error, retry", status, url, r);
								setTimeout(() => {
									const { abort, dataPromise } = requestArrayBufferGm({
										...params,
										retry: retry - (additionRetry ? 0 : 1)
									});
									abortFunc = abort;
									resolve(dataPromise);
								}, 1e3);
							}
						}
					});
					abortFunc = () => {
						req.abort();
						logger.info("Request abort", url);
						reject(new RequestAbortError(url));
					};
				} catch (error) {
					reject(error);
				}
			})
		};
	};
	var fetchText = (url) => fetch(url).then((r) => r.text());
	var fetchJSON = (url) => fetch(url).then((r) => r.json());
	var PROTOCOL_REGEXP = /^https?:\/\//;
	var ensureProtocol = (url) => PROTOCOL_REGEXP.test(url) ? url : url.startsWith("//") ? `${location.protocol}${url}` : `${location.protocol}//${url}`;
	var NHentaiImgExt = function(NHentaiImgExt) {
		NHentaiImgExt["j"] = "jpg";
		NHentaiImgExt["p"] = "png";
		NHentaiImgExt["g"] = "gif";
		NHentaiImgExt["w"] = "webp";
		return NHentaiImgExt;
	}({});
	var NHentaiImageRev = invert(NHentaiImgExt);
	var nHentaiImgExtReversed = invert(NHentaiImgExt);
	var getTypeFromExt = (ext) => nHentaiImgExtReversed[ext.toLowerCase()];
	var nHentaiDownloadHostCounter = new Counter(nHentaiDownloadHosts);
	var getNHentaiDownloadHost = (mid) => {
		switch (settings.nHentaiDownloadHost) {
			case NHentaiDownloadHostSpecial.RANDOM: return nHentaiDownloadHostCounter.getRandom(mid);
			case NHentaiDownloadHostSpecial.BALANCE: return nHentaiDownloadHostCounter.getMin(mid);
			default: return settings.nHentaiDownloadHost;
		}
	};
	var getMediaDownloadUrl = (mid, filename) => `https://${getNHentaiDownloadHost(mid)}/galleries/${mid}/${filename}`;
	var getMediaDownloadUrlByWebpage = async (gid, mid, filename) => (await getCompliedMediaUrlTemplate(gid))({
		mid,
		filename
	});
	var getImageTypeFromPath = (path) => {
		return NHentaiImageRev[path.split(".").pop()];
	};
	var getGalleryFromApi = async (gid) => {
		const resp = await fetchJSON(`https://nhentai.net/api/v2/galleries/${gid}`);
		resp.images = {
			pages: resp.pages.map((p) => ({
				w: p.width,
				h: p.height,
				t: getImageTypeFromPath(p.path)
			})),
			cover: {
				w: resp.cover.width,
				h: resp.cover.height,
				t: getImageTypeFromPath(resp.cover.path)
			},
			thumbnail: {
				w: resp.thumbnail.width,
				h: resp.thumbnail.height,
				t: getImageTypeFromPath(resp.thumbnail.path)
			}
		};
		return resp;
	};
	var fixGalleryObj = (gallery, gid) => {
		if (gid) gallery.id = Number(gid);
		if (!Array.isArray(gallery.images.pages)) gallery.images.pages = Object.values(gallery.images.pages);
		return gallery;
	};
	var getGalleryFromWebpage = async (gid) => {
		let doc = document;
		if (!isPageMangaDetail()) {
			const html = await fetchText(`/g/${gid}`);
			doc = new DOMParser().parseFromString(html, "text/html");
		}
		const match = /gallery(\(\{[\s\S]+\}\));/.exec(doc.body.innerHTML)?.[1];
		if (match) try {
			const gallery = (0, eval)(match);
			logger.info("get gallery by script tag success");
			return fixGalleryObj(gallery, gid);
		} catch {
			logger.warn("get gallery by script tag failed");
		}
		const $doc = (0, jquery.default)(doc.body);
		const english = $doc.find(selector.englishTitle).text();
		const japanese = $doc.find(selector.japaneseTitle).text();
		const pages = [];
		let mediaId = "";
		const xxxPageMatch = tryParseJSON(/'(\{"fl":\{"1":"[^']+)'/.exec(doc.body.innerHTML)?.[1]);
		if (xxxPageMatch) {
			const img = $doc.find(selector.thumbnailContainerImage)[0];
			const src = img.dataset.src ?? img.src;
			const match = /\/([0-9a-z]+)\/\d+t?\.[^/]+$/i.exec(src);
			if (match) mediaId = match[1];
			objectEach(xxxPageMatch.fl, (data, index) => {
				const [type, width, height] = data.split(",");
				pages[Number(index) - 1] = {
					t: type,
					w: width ? Number(width) : void 0,
					h: height ? Number(height) : void 0
				};
			});
		} else $doc.find(selector.thumbnailContainerImage).each((i, img) => {
			const src = img.dataset.src ?? img.src;
			const width = img.getAttribute("width");
			const height = img.getAttribute("height");
			const match = /\/([0-9a-z]+)\/(\d+)t?\.([^/]+)$/i.exec(src);
			if (!match) return;
			const [, mid, index, ext] = match;
			if (!mediaId) mediaId = mid;
			const t = getTypeFromExt(ext);
			if (!t) return;
			pages[Number(index) - 1] = {
				t,
				w: width ? Number(width) : void 0,
				h: height ? Number(height) : void 0
			};
		});
		if (!english && !japanese || !mediaId || !pages.length) throw new Error("Get gallery info error.");
		const getTags = (type, elContains) => {
			const $tags = $doc.find(selector.tag(elContains));
			return filterNotNil(Array.from($tags).map((el) => {
				if (!(el instanceof HTMLElement)) return void 0;
				const name = el.querySelector(selector.tagName)?.textContent.trim();
				const countStr = el.querySelector(selector.tagCount)?.textContent.trim();
				const count = countStr ? parseInt(countStr) * (/k$/i.test(countStr) ? 1e3 : 1) : void 0;
				return name ? {
					type,
					name,
					url: el.getAttribute("href") || void 0,
					count
				} : void 0;
			}));
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
			for (let i = pages.length; i < pageNum; i++) pages.push(defaultPage);
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
			images: { pages },
			tags,
			num_pages: pageNum || pages.length,
			upload_date: uploadDate && String(uploadDate) !== "Invalid Date" ? Math.floor(uploadDate.getTime() / 1e3) : void 0
		};
	};
	var getCFNameArtists = (tags) => {
		const artists = tags.filter(({ name, type }) => type === "artist" && name).map((t) => t.name);
		if (!artists.length) return "none";
		const maxNum = settings.filenameMaxArtistsNumber;
		if (maxNum && artists.length > maxNum) return "various";
		return artists.join(settings.filenameArtistsSeparator);
	};
	var galleryCache = new OrderCache(100);
	var getGallery = async (gid) => {
		gid = String(gid);
		const cached = galleryCache.get(gid);
		if (cached) return cached;
		const gallery = IS_NHENTAI ? await getGalleryFromApi(gid) : await getGalleryFromWebpage(gid);
		galleryCache.set(gid, gallery);
		logger.debug("gallery", gallery);
		return gallery;
	};
	var getGalleryInfo = async (gid) => {
		const gallery = await (async () => {
			if (gid) return getGallery(gid);
			const gidFromUrl = /^\/g\/(\d+)/.exec(location.pathname)?.[1];
			const localGallery = _unsafeWindow._gallery ?? _unsafeWindow.gallery;
			if (localGallery) return fixGalleryObj(localGallery, gidFromUrl);
			if (gidFromUrl) return getGallery(gidFromUrl);
			throw new Error("Cannot get gallery info.");
		})();
		const { id, media_id, title, images: { pages }, num_pages, tags, upload_date } = gallery;
		const { english, japanese, pretty } = title;
		const infoPages = pages.map(({ t, w, h }, i) => ({
			i: i + 1,
			t: NHentaiImgExt[t],
			w,
			h
		}));
		const applyTitleReplacement = replaceTitle.value;
		const info = {
			gid: id,
			mid: media_id,
			title,
			pages: infoPages,
			cfName: removeIllegalFilenameChars(compileTemplate(settings.compressionFilename)({
				english: applyTitleReplacement(english || japanese),
				japanese: applyTitleReplacement(japanese || english),
				pretty: applyTitleReplacement(pretty || english || japanese),
				id,
				pages: num_pages,
				artist: getCFNameArtists(tags)
			})),
			tags,
			uploadDate: upload_date,
			gallery
		};
		logger.debug("info", info);
		return info;
	};
	var fetchMediaUrlTemplate = async (gid) => {
		const onlineViewUrl = document.querySelector(selector.galleryHref)?.getAttribute("href")?.replace(/\/+$/, "").replace(/\d+$/, gid).concat("/1") ?? document.querySelector(selector.thumbnailHref)?.getAttribute("href");
		if (!onlineViewUrl) throw new Error("get media url failed: cannot find a gallery");
		logger.info(`fetching media url template by ${onlineViewUrl}`);
		const $img = loadHTML(await fetchText(onlineViewUrl)).find(selector.mediaImage);
		const imgSrc = $img.attr("data-src") || $img.attr("src");
		if (!imgSrc) throw new Error("get media url failed: cannot find an image src");
		const template = ensureProtocol(imgSrc.replace(/\/[0-9a-z]+\/\d+\.[^/]+$/i, "/{{mid}}/{{filename}}"));
		if (!MEDIA_URL_TEMPLATE_MAY_CHANGE) _GM_setValue(MEDIA_URL_TEMPLATE_KEY, template);
		return template;
	};
	var fetchThumbMediaUrlTemplate = async (gid) => {
		const detailUrl = document.querySelector(selector.galleryHref)?.getAttribute("href")?.replace(/\d+(\/)?$/, `${gid}$1`);
		if (!detailUrl) throw new Error("get detail url failed: cannot find a gallery");
		logger.info(`fetching thumb media url template by ${detailUrl}`);
		const $img = loadHTML(await fetchText(detailUrl)).find(selector.thumbnailContainerImage);
		const imgSrc = $img.attr("data-src") || $img.attr("src");
		if (!imgSrc) throw new Error("get thumb media url failed: cannot find an image src");
		const template = ensureProtocol(imgSrc.replace(/\/[0-9a-z]+\/\d+t\.[^/]+$/i, "/{{mid}}/{{filename}}"));
		_GM_setValue(THUMB_MEDIA_URL_TEMPLATE_KEY, template);
		return template;
	};
	var mediaUrlTemplateGidCache = {};
	var getMediaUrlTemplate = async (getter, cacheKey, gid) => {
		if (MEDIA_URL_TEMPLATE_MAY_CHANGE) {
			if (!mediaUrlTemplateGidCache[cacheKey]) mediaUrlTemplateGidCache[cacheKey] = new Map();
			if (mediaUrlTemplateGidCache[cacheKey].has(gid)) return mediaUrlTemplateGidCache[cacheKey].get(gid);
		}
		try {
			const promise = getter(gid);
			if (MEDIA_URL_TEMPLATE_MAY_CHANGE && !mediaUrlTemplateGidCache[cacheKey].has(gid)) mediaUrlTemplateGidCache[cacheKey].set(gid, promise);
			const template = await promise;
			logger.info(`use media url template: ${template}`);
			return template;
		} catch (error) {
			logger.error(error);
			if (MEDIA_URL_TEMPLATE_MAY_CHANGE) mediaUrlTemplateGidCache[cacheKey].delete(gid);
			else {
				const cachedTemplate = _GM_getValue(cacheKey);
				if (cachedTemplate) {
					logger.warn(`try to use cached media url template: ${cachedTemplate}`);
					return cachedTemplate;
				}
			}
			throw error;
		}
	};
	var getCompliedMediaUrlTemplate = (MEDIA_URL_TEMPLATE_MAY_CHANGE ? identity : once)(async (gid) => compileTemplate(await getMediaUrlTemplate(fetchMediaUrlTemplate, MEDIA_URL_TEMPLATE_KEY, gid)));
	var getCompliedThumbMediaUrlTemplate = (MEDIA_URL_TEMPLATE_MAY_CHANGE ? identity : once)(async (gid) => compileTemplate(IS_NHENTAI ? "https://t3.nhentai.net/galleries/{{mid}}/{{filename}}" : await getMediaUrlTemplate(fetchThumbMediaUrlTemplate, THUMB_MEDIA_URL_TEMPLATE_KEY, gid)));
	var imgConverter = new ImgConverter();
	var downloadGalleryByInfo = async (info, { progressDisplayController, rangeCheckers } = {}) => {
		info.done = 0;
		let { mid, pages, cfName } = info.gallery;
		if (customFilenameFunction.value) {
			const result = customFilenameFunction.value(cfName, info.gallery.gallery);
			if (typeof result !== "string" || !result.trim()) throw new Error(`Custom filename function illegal result: ${result}`);
			cfName = removeIllegalFilenameChars(result);
		}
		if (rangeCheckers?.length) pages = pages.filter(({ i }) => rangeCheckers.some((check) => check(i)));
		let aborted = false;
		info.cancel = () => {
			aborted = true;
			progressDisplayController?.reset();
		};
		progressDisplayController?.bindInfo(info);
		progressDisplayController?.updateProgress();
		const zip = new JSZip();
		const metaFiles = generateMetaFiles(info.gallery);
		if (metaFiles.length) metaFiles.forEach(({ name, data }) => {
			zip.file(name, data);
		});
		const { convertWebpTo, convertWebpQuality } = settings;
		const downloadTask = async (page, threadID, { filenameLength, customDownloadUrl }) => {
			if (info.error) return {
				abort: () => {},
				promise: Promise.resolve()
			};
			const useCounter = IS_NHENTAI && (settings.nHentaiDownloadHost === NHentaiDownloadHostSpecial.BALANCE || settings.nHentaiDownloadHost === NHentaiDownloadHostSpecial.RANDOM);
			const usedCounterKeys = [];
			let urlGetterError;
			const urlGetter = await (async () => {
				if (customDownloadUrl) return compileTemplate(customDownloadUrl)({
					mid,
					index: page.i,
					ext: page.t
				});
				const filename = `${page.i}.${page.t}`;
				if (IS_NHENTAI && settings.nHentaiDownloadHost !== NHentaiDownloadHostSpecial.AUTO) {
					if (useCounter) return () => {
						const url = getMediaDownloadUrl(mid, filename);
						logger.info(`[${threadID}] ${url}`);
						if (settings.nHentaiDownloadHost === NHentaiDownloadHostSpecial.BALANCE) {
							const counterKey = new URL(url).host;
							usedCounterKeys.push(counterKey);
							nHentaiDownloadHostCounter.add(counterKey);
						}
						return url;
					};
					return getMediaDownloadUrl(mid, filename);
				}
				return getMediaDownloadUrlByWebpage(String(info.gallery.gid), mid, filename);
			})().catch((e) => {
				urlGetterError = e;
			});
			if (!urlGetter || urlGetterError) {
				info.error = true;
				throw urlGetterError && urlGetterError instanceof Error ? urlGetterError : new Error("No available url");
			}
			if (typeof urlGetter !== "function") logger.info(`[${threadID}] ${urlGetter}`);
			const { abort, dataPromise } = requestArrayBufferGm({
				url: urlGetter,
				on404: useCounter ? (url) => {
					const counterKey = new URL(url).host;
					logger.warn(`[${threadID}] ban ${counterKey} because 404`);
					return nHentaiDownloadHostCounter.ban(counterKey);
				} : void 0
			});
			return {
				abort: () => {
					logger.info(`[${threadID}] abort`);
					abort();
				},
				promise: dataPromise.then(async (data) => {
					if (data) {
						const filename = String(page.i).padStart(filenameLength || 0, "0");
						if (page.t === NHentaiImgExt.w && convertWebpTo) {
							const { buffer, ext } = await imgConverter.convertWebpTo(data, convertWebpTo, convertWebpQuality / 100);
							zip.file(`${filename}.${ext}`, buffer);
						} else zip.file(`${filename}.${page.t}`, data);
					}
					info.done++;
					progressDisplayController?.updateProgress();
				}).catch((e) => {
					if (isAbortError(e)) return;
					info.error = true;
					throw e;
				}).finally(() => {
					if (usedCounterKeys.length) usedCounterKeys.forEach((key) => {
						nHentaiDownloadHostCounter.del(key);
					});
				})
			};
		};
		const { abort, promise } = new MultiThread(pages, downloadTask, {
			filenameLength: settings.filenameLength === "auto" ? Math.ceil(Math.log10(Math.max(...pages.map(({ i }) => Number(i))))) : settings.filenameLength,
			customDownloadUrl: settings.customDownloadUrl
		}).start();
		info.cancel = () => {
			aborted = true;
			abort();
			progressDisplayController?.reset();
		};
		if (!aborted) await promise;
		if (aborted) return;
		return async () => {
			info.compressing = true;
			progressDisplayController?.updateProgress();
			logger.info("start compressing", cfName);
			let lastZipFile = "";
			const onCompressionUpdate = ({ workerId, percent, currentFile }) => {
				if (lastZipFile !== currentFile && currentFile) {
					lastZipFile = currentFile;
					logger.info(`[${workerId}] compressing ${percent.toFixed(2)}%`, currentFile);
				}
				info.compressingPercent = percent.toFixed(2);
				progressDisplayController?.updateProgress();
			};
			if (settings.streamDownload) {
				logger.info("stream mode on");
				const fileStream = (0, import_StreamSaver.createWriteStream)(cfName);
				await (await zip.generateStream(getCompressionOptions(), onCompressionUpdate)).pipeTo(fileStream);
			} else {
				const data = await zip.generateAsync(getCompressionOptions(), onCompressionUpdate);
				(0, import_FileSaver_min.saveAs)(new File([data], cfName, { type: "application/zip" }));
			}
			logger.info("completed", cfName);
			progressDisplayController?.complete();
			progressDisplayController?.unbindInfo();
		};
	};
	var addDownloadGalleryTask = (gallery, { progressDisplayController, markGalleryDownloaded } = {}) => {
		const info = createMangaDownloadInfo(gallery, true);
		info.cancel = () => {
			progressDisplayController?.reset();
		};
		dlQueue.push(async () => {
			const zipFunc = await downloadGalleryByInfo(info, { progressDisplayController }).catch((e) => {
				progressDisplayController?.error();
				errorRetryConfirm(ErrorAction.DOWNLOAD, () => {
					dlQueue.skipFromError().catch(logger.error);
				}, () => {
					info.error = false;
					dlQueue.restartFromError().catch(logger.error);
				});
				throw e;
			});
			if (zipFunc) {
				zipQueue.push(async () => {
					try {
						await zipFunc();
						markAsDownloaded(gallery.gid, gallery.title);
						markGalleryDownloaded?.();
					} catch (error) {
						if (!error) logger.warn("user abort stream download");
						logger.error(error);
						progressDisplayController?.error();
					}
				}, info);
				zipQueue.start().catch(logger.error);
			}
		}, info);
		dlQueue.start().catch(logger.error);
	};
	var defaultClassName = { greyButton: "btn btn-secondary" };
	var siteMap = { "nhentai.xxx": { greyButton: "mbtn grey" } };
	var className = {
		...defaultClassName,
		...siteMap[location.hostname]
	};
	var { t: t$2 } = i18n.global;
	var IgnoreController = class {
		status;
		ignoreBtn;
		icon;
		text;
		constructor(text = true, status = false) {
			this.status = status;
			this.icon = createNode("i", { class: this.iconClass });
			if (text) this.text = createNode("span", { children: this.btnText });
			this.ignoreBtn = createNode("button", {
				class: `${className.greyButton} nhentai-helper-btn ignore-btn`,
				children: [
					this.icon,
					" ",
					this.text
				]
			});
		}
		get iconClass() {
			return this.status ? "fa fa-eye-slash" : "fa fa-eye";
		}
		get btnText() {
			return this.status ? t$2("button.unignore") : t$2("button.ignore");
		}
		setStatus(status) {
			this.status = status;
			this.updateBtn();
		}
		getStatus() {
			return this.status;
		}
		destroy() {
			this.ignoreBtn.remove();
		}
		updateBtn() {
			this.icon.className = this.iconClass;
			if (this.text) this.text.textContent = this.btnText;
		}
	};
	var bc = new BroadcastChannel("nhentai-helper-mark-update");
	var onMarkDownloadedUpdate = (callback) => {
		bc.addEventListener("message", (event) => {
			const { gid, value } = event.data;
			callback(gid, value);
		});
	};
	var initListenMarkDownloadedUpdateForGalleries = once(() => {
		onMarkDownloadedUpdate((gid, value) => {
			(0, jquery.default)(`${selector.gallery}[data-gid="${gid}"]`).each(function() {
				this._markGalleryDownloaded?.(value, false);
			});
		});
	});
	var broadcastMarkDownloadedUpdate = (gid, value) => {
		bc.postMessage({
			gid: Number(gid),
			value
		});
	};
	var { t: t$1 } = i18n.global;
	var ProgressDisplayController = class {
		enableHeadTxt;
		docTitle;
		downloadBtn;
		btnTxt;
		info;
		constructor(enableHeadTxt = false, docTitle) {
			this.enableHeadTxt = enableHeadTxt;
			this.docTitle = docTitle;
			this.btnTxt = createNode("span", {
				class: "download-zip-txt",
				children: this.defaultBtnText()
			});
			this.downloadBtn = createNode("button", {
				class: `${className.greyButton} nhentai-helper-btn download-zip-btn`,
				children: [
					createNode("i", { class: "fa fa-download" }),
					" ",
					this.btnTxt
				]
			});
		}
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
			this.downloadBtn.setAttribute("disabled", "disabled");
			if (text) this.btnTxt.textContent = text;
		}
		releaseBtn() {
			this.downloadBtn.removeAttribute("disabled");
		}
		complete() {
			this.setDocTitle("✓");
			this.btnTxt.textContent = this.defaultBtnText("✓");
			this.releaseBtn();
		}
		reset() {
			this.setDocTitle();
			this.btnTxt.textContent = this.defaultBtnText();
			this.releaseBtn();
		}
		error() {
			this.releaseBtn();
			this.btnTxt.textContent = "Error";
			this.setDocTitle("×");
		}
		updateProgress() {
			if (!this.info) return;
			const { done, compressing, compressingPercent } = this.info;
			if (compressing) {
				this.setDocTitle(`${compressingPercent}%`);
				this.btnTxt.textContent = `${this.compressingHeadText}${compressingPercent}%`;
			} else {
				const total = this.info.gallery.pages.length;
				this.setDocTitle(`${done}/${total}`);
				this.btnTxt.textContent = `${this.downloadingHeadText}${done}/${total}`;
			}
		}
		destroy() {
			this.downloadBtn.remove();
		}
		defaultBtnText(suffix) {
			if (!this.enableHeadTxt) return suffix ?? "";
			return `${t$1("button.download")} ${getDownloadExt()}${suffix ? ` ${suffix}` : ""}`;
		}
		setDocTitle(prefix) {
			if (!this.docTitle) return;
			document.title = prefix ? `[${prefix}] ${this.docTitle}` : this.docTitle;
		}
	};
	var { t } = i18n.global;
	var initDetailPage = async () => {
		logger.info("init detail page");
		if ((0, jquery.default)(selector.infoButtons).find(".nhentai-helper-btn").length) {
			logger.warn("detail page already initialized");
			return;
		}
		const progressDisplayController = new ProgressDisplayController(true, document.title);
		const { downloadBtn } = progressDisplayController;
		const pagesInput = createNode("input", {
			class: "pages-input",
			placeholder: t("input.downloadSpecifiedPages"),
			onKeydown: (e) => {
				if (e.key === "Enter") downloadBtn.click();
			}
		});
		(0, jquery.default)(selector.infoButtons).append(downloadBtn).after(pagesInput);
		const getGallery = once(() => getGalleryInfo());
		let ignoreController;
		const markGalleryDownloaded = async (isDownloaded, needBroadcast = true) => {
			ignoreController?.setStatus(isDownloaded);
			if (needBroadcast) broadcastMarkDownloadedUpdate((await getGallery()).gid, isDownloaded);
		};
		if (settings.showIgnoreButton) {
			const gallery = await getGallery();
			ignoreController = new IgnoreController(true, await isDownloadedByGid(gallery.gid));
			const { ignoreBtn } = ignoreController;
			ignoreBtn.addEventListener("click", () => {
				const ignore = ignoreController.getStatus();
				if (ignore) unmarkAsDownloaded(gallery.gid, gallery.title);
				else markAsDownloaded(gallery.gid, gallery.title);
				markGalleryDownloaded(!ignore);
			});
			(0, jquery.default)(selector.infoButtons).append(ignoreBtn);
			onMarkDownloadedUpdate((gid, value) => {
				if (gid === gallery.gid) markGalleryDownloaded(value, false);
			});
		}
		downloadBtn.addEventListener("click", async () => {
			const gallery = await getGallery();
			const rangeCheckers = pagesInput.value.split(",").filter((range) => /^\s*(?:\d+(?:\s*-\s*)?\d*|-\d+)\s*$/.test(range)).map((range) => {
				const [start, end] = range.split("-").map((num) => parseInt(num));
				if (Number.isNaN(start)) return (page) => page <= end;
				if (end === void 0) return (page) => page === start;
				if (Number.isNaN(end)) return (page) => page >= start;
				return (page) => start <= page && page <= end;
			});
			progressDisplayController.lockBtn();
			try {
				if ((await isDownloadedByGid(gallery.gid) || await isDownloadedByTitle(gallery.title)) && !await downloadAgainConfirm(gallery.title.japanese || gallery.title.english)) {
					progressDisplayController.reset();
					markAsDownloaded(gallery.gid, gallery.title);
					markGalleryDownloaded(true);
					return;
				}
				await (await downloadGalleryByInfo(createMangaDownloadInfo(gallery), {
					progressDisplayController,
					rangeCheckers
				}))?.();
				markAsDownloaded(gallery.gid, gallery.title);
				markGalleryDownloaded(true);
			} catch (error) {
				progressDisplayController.error();
				logger.error(error);
			}
		});
		applyAutoShowAll();
	};
	var applyAutoShowAll = async () => {
		logger.info("apply auto show all");
		if (!settings.autoShowAll) return;
		try {
			const btn = await getShowAllBtn();
			logger.info("show all button found", btn.length);
			if (btn.length) btn.trigger("click");
		} catch (e) {
			logger.error(e);
		}
	};
	var _hoisted_1$1 = { class: "info-label bold" };
	var _hoisted_2 = { class: "info-label bold" };
	var _hoisted_3 = { class: "bold" };
	var _hoisted_4 = { class: "info-label bold" };
	var _hoisted_5 = { class: "bold" };
	var _hoisted_6 = { class: "info-label bold" };
	var _hoisted_7 = { class: "scroll-container-inner" };
	var POPOVER_MAX_WIDTH = 720;
	var POPOVER_THUMB_MORE_COL_WIDTH = 640;
	var GalleryMiniPopover_default = _plugin_vue_export_helper_default((0, vue.defineComponent)({
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
				const index = TAG_TYPES.findIndex((t) => t === type);
				return index === -1 ? 999 : index;
			};
			const { t } = useI18n();
			const visible = (0, vue.ref)(false);
			const virtualRef = (0, vue.ref)();
			const popoverRef = (0, vue.ref)();
			const popoverPlacement = (0, vue.ref)("right");
			const popoverWidth = (0, vue.ref)(0);
			const popoverTransition = (0, vue.ref)(false);
			const gallery = (0, vue.ref)(null);
			const title = (0, vue.computed)(() => {
				const t = gallery.value?.title;
				return t ? t.japanese || t.english || t.pretty : "";
			});
			const groupedTags = (0, vue.computed)(() => {
				const tags = gallery.value?.tags;
				return tags ? Object.entries(groupBy(tags, (t) => t.type)).sort(([a], [b]) => getTagSortIndex(a) - getTagSortIndex(b)) : [];
			});
			const galleryLink = (0, vue.computed)(() => `${location.origin}/g/${gallery.value?.id}/`);
			const pageThumbs = (0, vue.ref)([]);
			const pageThumbsColSpan = (0, vue.computed)(() => popoverWidth.value >= POPOVER_THUMB_MORE_COL_WIDTH ? 6 : 8);
			const pageThumbsColNum = (0, vue.computed)(() => popoverWidth.value >= POPOVER_THUMB_MORE_COL_WIDTH ? 4 : 3);
			const pageThumbWidth = (0, vue.computed)(() => (popoverWidth.value - 24 - (pageThumbsColNum.value - 1) * 8) / pageThumbsColNum.value);
			const pageThumbScrollHeight = (0, vue.computed)(() => Math.max(0, ...pageThumbs.value.map((t) => t.height)) * 1.5);
			const limitTagLength = (tags, maxLength) => {
				const result = tags.slice(0, maxLength);
				const larger = tags.length - result.length;
				if (larger > 0) result.push({
					type: "__limit__",
					name: "__limit__",
					count: larger
				});
				return result;
			};
			const isLimitTag = (tag) => tag.type === "__limit__";
			let thumbUrlTemplate;
			const getThumbInfo = ({ t, w, h }, i) => ({
				url: thumbUrlTemplate({
					mid: gallery.value?.media_id,
					filename: `${i + 1}t.${IS_NHENTAI_XXX ? "jpg" : NHentaiImgExt[t]}`
				}),
				height: w && h ? Math.floor(pageThumbWidth.value * Math.min(h / w, 1.8)) : 0
			});
			const formatNumber = (num) => {
				if (num >= 1e6) return `${Math.floor(num / 1e6)}M`;
				if (num >= 1e3) return `${Math.floor(num / 1e3)}K`;
				return num;
			};
			const openTagUrl = (path) => {
				if (!path) return;
				_GM_openInTab(`${location.origin}${path}`, {
					active: true,
					setParent: true
				});
			};
			let loadingGid = "";
			const open = async (el, gid) => {
				if (virtualRef.value === el && gallery.value?.id === Number(gid)) return;
				const rect = el.getBoundingClientRect();
				const bodyWidth = document.body.clientWidth;
				const showRight = rect.left + rect.right <= bodyWidth;
				virtualRef.value = el;
				popoverPlacement.value = showRight ? "right" : "left";
				popoverTransition.value = false;
				popoverWidth.value = Math.min(POPOVER_MAX_WIDTH, Math.round(showRight ? bodyWidth - rect.right : rect.left) - 16);
				visible.value = true;
				gallery.value = null;
				setTimeout(() => {
					if (!gallery.value) popoverTransition.value = true;
				});
				pageThumbs.value = [];
				try {
					loadingGid = gid;
					if (!thumbUrlTemplate) thumbUrlTemplate = await getCompliedThumbMediaUrlTemplate(gid);
					const loadedGallery = await getGallery(gid);
					if (loadingGid !== gid) return;
					gallery.value = loadedGallery;
					pageThumbs.value = loadedGallery.images.pages.slice(0, 12).map(getThumbInfo);
					await (0, vue.nextTick)();
					popoverRef.value?.popperRef?.popperInstanceRef?.update();
				} catch (error) {
					logger.error(error);
				} finally {
					if (loadingGid === gid) loadingGid = "";
				}
			};
			const addPageThumbLine = () => {
				const curLength = pageThumbs.value.length;
				if (curLength >= gallery.value.images.pages.length) return;
				const curLines = Math.ceil(curLength / pageThumbsColNum.value);
				pageThumbs.value.push(...gallery.value.images.pages.slice(curLength, (curLines + 1) * pageThumbsColNum.value).map((img, i) => getThumbInfo(img, curLength + i)));
			};
			const close = () => {
				if (visible.value) visible.value = false;
			};
			const copyTitle = () => {
				_GM_setClipboard(title.value, "text", () => {
					showMessage({
						type: "success",
						message: t("common.copied"),
						duration: 2e3
					});
				});
			};
			(0, vue.watch)(visible, (val) => {
				if (val) {
					window.addEventListener("scroll", close);
					window.addEventListener("resize", close);
				} else {
					window.removeEventListener("scroll", close);
					window.removeEventListener("resize", close);
				}
			});
			(0, vue.onBeforeUnmount)(() => {
				window.removeEventListener("scroll", close);
				window.removeEventListener("resize", close);
			});
			__expose({ open });
			return (_ctx, _cache) => {
				return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(element_plus.ElPopover), {
					ref_key: "popoverRef",
					ref: popoverRef,
					visible: visible.value,
					"onUpdate:visible": _cache[1] || (_cache[1] = ($event) => visible.value = $event),
					"popper-class": {
						"gallery-mini-popover-wrapper": true,
						"popover-transition": popoverTransition.value
					},
					"virtual-ref": virtualRef.value,
					"virtual-triggering": "",
					placement: popoverPlacement.value,
					trigger: "contextmenu",
					width: popoverWidth.value,
					"hide-after": 0
				}, {
					default: (0, vue.withCtx)(() => [gallery.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
						key: 0,
						class: (0, vue.normalizeClass)(["gallery-mini-popover", `lang-${(0, vue.unref)(settings).language}`])
					}, [(0, vue.createVNode)((0, vue.unref)(element_plus.ElDescriptions), {
						title: title.value,
						column: 1
					}, {
						extra: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElButton), {
							text: "",
							size: "small",
							onClick: copyTitle
						}, {
							default: (0, vue.withCtx)(() => [(0, vue.createTextVNode)((0, vue.toDisplayString)((0, vue.unref)(t)("common.copy")), 1)]),
							_: 1
						}), (0, vue.createVNode)((0, vue.unref)(element_plus.ElButton), {
							icon: (0, vue.unref)(close_bold_default),
							circle: "",
							text: "",
							size: "small",
							style: { "margin-left": "4px" },
							onClick: close
						}, null, 8, ["icon"])]),
						default: (0, vue.withCtx)(() => [
							(0, vue.createVNode)((0, vue.unref)(element_plus.ElDescriptionsItem), null, {
								label: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("span", _hoisted_1$1, (0, vue.toDisplayString)((0, vue.unref)(t)("meta.id")), 1)]),
								default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElLink), {
									type: "primary",
									target: "_blank",
									underline: "never",
									href: galleryLink.value
								}, {
									default: (0, vue.withCtx)(() => [(0, vue.createTextVNode)((0, vue.toDisplayString)(gallery.value.id), 1)]),
									_: 1
								}, 8, ["href"])]),
								_: 1
							}),
							((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(groupedTags.value, ([type, tags]) => {
								return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(element_plus.ElDescriptionsItem), { key: type }, {
									label: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("span", _hoisted_2, (0, vue.toDisplayString)((0, vue.unref)(t)(`meta.${type}`)), 1)]),
									default: (0, vue.withCtx)(() => [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(limitTagLength(tags, 10), (tag) => {
										return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(element_plus.ElTag), {
											key: tag.id ?? tag.name,
											class: (0, vue.normalizeClass)(["info-tag", { "info-tag--pointer": !isLimitTag(tag) }]),
											type: "info",
											effect: "dark",
											"disable-transitions": "",
											onClick: () => openTagUrl(tag.url)
										}, {
											default: (0, vue.withCtx)(() => [isLimitTag(tag) ? ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 0 }, [(0, vue.createTextVNode)("+" + (0, vue.toDisplayString)(tag.count), 1)], 64)) : ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 1 }, [(0, vue.createElementVNode)("span", _hoisted_3, (0, vue.toDisplayString)(tag.name), 1), (0, vue.createTextVNode)((0, vue.toDisplayString)(tag.count ? ` | ${formatNumber(tag.count)}` : void 0), 1)], 64))]),
											_: 2
										}, 1032, ["class", "onClick"]);
									}), 128))]),
									_: 2
								}, 1024);
							}), 128)),
							gallery.value.num_pages ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(element_plus.ElDescriptionsItem), { key: 0 }, {
								label: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("span", _hoisted_4, (0, vue.toDisplayString)((0, vue.unref)(t)("meta.page")), 1)]),
								default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElTag), {
									class: "info-tag",
									type: "info",
									effect: "dark",
									"disable-transitions": ""
								}, {
									default: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("span", _hoisted_5, (0, vue.toDisplayString)(gallery.value.num_pages), 1)]),
									_: 1
								})]),
								_: 1
							})) : (0, vue.createCommentVNode)("", true),
							gallery.value.upload_date ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(element_plus.ElDescriptionsItem), { key: 1 }, {
								label: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("span", _hoisted_6, (0, vue.toDisplayString)((0, vue.unref)(t)("meta.upload")), 1)]),
								default: (0, vue.withCtx)(() => [(0, vue.createTextVNode)(" " + (0, vue.toDisplayString)(new Date(gallery.value.upload_date * 1e3).toLocaleString()), 1)]),
								_: 1
							})) : (0, vue.createCommentVNode)("", true)
						]),
						_: 1
					}, 8, ["title"]), pageThumbs.value.length ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
						key: 0,
						class: "scroll-container",
						style: (0, vue.normalizeStyle)({ height: `${pageThumbScrollHeight.value}px` })
					}, [(0, vue.createVNode)((0, vue.unref)(element_plus.ElScrollbar), {
						distance: 100,
						onEndReached: addPageThumbLine
					}, {
						default: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("div", _hoisted_7, [(0, vue.createVNode)((0, vue.unref)(element_plus.ElRow), { gutter: 8 }, {
							default: (0, vue.withCtx)(() => [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(pageThumbs.value, ({ url, height }) => {
								return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(element_plus.ElCol), {
									key: url,
									span: pageThumbsColSpan.value
								}, {
									default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(element_plus.ElImage), {
										src: url,
										style: (0, vue.normalizeStyle)({ "min-height": `${height}px` })
									}, null, 8, ["src", "style"])]),
									_: 2
								}, 1032, ["span"]);
							}), 128))]),
							_: 1
						})])]),
						_: 1
					})], 4)) : (0, vue.createCommentVNode)("", true)], 2)) : (0, vue.withDirectives)(((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
						key: 1,
						style: {
							height: "700px",
							maxHeight: "90vh"
						},
						onWheel: _cache[0] || (_cache[0] = (0, vue.withModifiers)(() => {}, ["prevent"]))
					}, null, 544)), [[(0, vue.unref)(element_plus.vLoading), true]])]),
					_: 1
				}, 8, [
					"visible",
					"popper-class",
					"virtual-ref",
					"placement",
					"width"
				]);
			};
		}
	}), [["__scopeId", "data-v-9fa42e74"]]);
	var initApp = once(() => createAppAndMount(GalleryMiniPopover_default, (app) => {
		app.use(i18n);
	}));
	var openGalleryMiniPopover = (el, gid) => {
		initApp().open(el, gid);
	};
	var isClient = typeof window !== "undefined" && typeof document !== "undefined";
	typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
	var toString = Object.prototype.toString;
	var isObject = (val) => toString.call(val) === "[object Object]";
	var noop = () => {};
	function toRef$1(...args) {
		if (args.length !== 1) return (0, vue.toRef)(...args);
		const r = args[0];
		return typeof r === "function" ? (0, vue.readonly)((0, vue.customRef)(() => ({
			get: r,
			set: noop
		}))) : (0, vue.ref)(r);
	}
	function createFilterWrapper(filter, fn) {
		function wrapper(...args) {
			return new Promise((resolve, reject) => {
				Promise.resolve(filter(() => fn.apply(this, args), {
					fn,
					thisArg: this,
					args
				})).then(resolve).catch(reject);
			});
		}
		return wrapper;
	}
	var bypassFilter = (invoke) => {
		return invoke();
	};
	function pausableFilter(extendFilter = bypassFilter, options = {}) {
		const { initialState = "active" } = options;
		const isActive = toRef$1(initialState === "active");
		function pause() {
			isActive.value = false;
		}
		function resume() {
			isActive.value = true;
		}
		const eventFilter = (...args) => {
			if (isActive.value) extendFilter(...args);
		};
		return {
			isActive: (0, vue.shallowReadonly)(isActive),
			pause,
			resume,
			eventFilter
		};
	}
	function toArray(value) {
		return Array.isArray(value) ? value : [value];
	}
	function getLifeCycleTarget(target) {
		return target || (0, vue.getCurrentInstance)();
	}
	function watchWithFilter(source, cb, options = {}) {
		const { eventFilter = bypassFilter, ...watchOptions } = options;
		return (0, vue.watch)(source, createFilterWrapper(eventFilter, cb), watchOptions);
	}
	function watchPausable(source, cb, options = {}) {
		const { eventFilter: filter, initialState = "active", ...watchOptions } = options;
		const { eventFilter, pause, resume, isActive } = pausableFilter(filter, { initialState });
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
	function tryOnMounted(fn, sync = true, target) {
		if (getLifeCycleTarget(target)) (0, vue.onMounted)(fn, target);
		else if (sync) fn();
		else (0, vue.nextTick)(fn);
	}
	function watchImmediate(source, cb, options) {
		return (0, vue.watch)(source, cb, {
			...options,
			immediate: true
		});
	}
	var defaultWindow = isClient ? window : void 0;
	isClient && window.document;
	isClient && window.navigator;
	isClient && window.location;
	function unrefElement(elRef) {
		var _$el;
		const plain = (0, vue.toValue)(elRef);
		return (_$el = plain === null || plain === void 0 ? void 0 : plain.$el) !== null && _$el !== void 0 ? _$el : plain;
	}
	function useEventListener(...args) {
		const register = (el, event, listener, options) => {
			el.addEventListener(event, listener, options);
			return () => el.removeEventListener(event, listener, options);
		};
		const firstParamTargets = (0, vue.computed)(() => {
			const test = toArray((0, vue.toValue)(args[0])).filter((e) => e != null);
			return test.every((e) => typeof e !== "string") ? test : void 0;
		});
		return watchImmediate(() => {
			var _firstParamTargets$va, _firstParamTargets$va2;
			return [
				(_firstParamTargets$va = (_firstParamTargets$va2 = firstParamTargets.value) === null || _firstParamTargets$va2 === void 0 ? void 0 : _firstParamTargets$va2.map((e) => unrefElement(e))) !== null && _firstParamTargets$va !== void 0 ? _firstParamTargets$va : [defaultWindow].filter((e) => e != null),
				toArray((0, vue.toValue)(firstParamTargets.value ? args[1] : args[0])),
				toArray((0, vue.unref)(firstParamTargets.value ? args[2] : args[1])),
				(0, vue.toValue)(firstParamTargets.value ? args[3] : args[2])
			];
		}, ([raw_targets, raw_events, raw_listeners, raw_options], _, onCleanup) => {
			if (!(raw_targets === null || raw_targets === void 0 ? void 0 : raw_targets.length) || !(raw_events === null || raw_events === void 0 ? void 0 : raw_events.length) || !(raw_listeners === null || raw_listeners === void 0 ? void 0 : raw_listeners.length)) return;
			const optionsClone = isObject(raw_options) ? { ...raw_options } : raw_options;
			const cleanups = raw_targets.flatMap((el) => raw_events.flatMap((event) => raw_listeners.map((listener) => register(el, event, listener, optionsClone))));
			onCleanup(() => {
				cleanups.forEach((fn) => fn());
			});
		}, { flush: "post" });
	}
	var _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
	var globalKey = "__vueuse_ssr_handlers__";
	var handlers = getHandlers();
	function getHandlers() {
		if (!(globalKey in _global)) _global[globalKey] = _global[globalKey] || {};
		return _global[globalKey];
	}
	function getSSRHandler(key, fallback) {
		return handlers[key] || fallback;
	}
	function guessSerializerType(rawInit) {
		return rawInit == null ? "any" : rawInit instanceof Set ? "set" : rawInit instanceof Map ? "map" : rawInit instanceof Date ? "date" : typeof rawInit === "boolean" ? "boolean" : typeof rawInit === "string" ? "string" : typeof rawInit === "object" ? "object" : !Number.isNaN(rawInit) ? "number" : "any";
	}
	var StorageSerializers = {
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
	var customStorageEventName = "vueuse-storage";
	function useStorage(key, defaults, storage, options = {}) {
		var _options$serializer;
		const { flush = "pre", deep = true, listenToStorageChanges = true, writeDefaults = true, mergeDefaults = false, shallow, window = defaultWindow, eventFilter, onError = (e) => {
			console.error(e);
		}, initOnMounted } = options;
		const data = (shallow ? vue.shallowRef : vue.ref)(typeof defaults === "function" ? defaults() : defaults);
		const keyComputed = (0, vue.computed)(() => (0, vue.toValue)(key));
		if (!storage) try {
			storage = getSSRHandler("getDefaultStorage", () => defaultWindow === null || defaultWindow === void 0 ? void 0 : defaultWindow.localStorage)();
		} catch (e) {
			onError(e);
		}
		if (!storage) return data;
		const rawInit = (0, vue.toValue)(defaults);
		const type = guessSerializerType(rawInit);
		const serializer = (_options$serializer = options.serializer) !== null && _options$serializer !== void 0 ? _options$serializer : StorageSerializers[type];
		const { pause: pauseWatch, resume: resumeWatch } = watchPausable(data, (newValue) => write(newValue), {
			flush,
			deep,
			eventFilter
		});
		(0, vue.watch)(keyComputed, () => update(), { flush });
		let firstMounted = false;
		const onStorageEvent = (ev) => {
			if (initOnMounted && !firstMounted) return;
			update(ev);
		};
		const onStorageCustomEvent = (ev) => {
			if (initOnMounted && !firstMounted) return;
			updateFromCustomEvent(ev);
		};
		if (window && listenToStorageChanges) if (storage instanceof Storage) useEventListener(window, "storage", onStorageEvent, { passive: true });
		else useEventListener(window, customStorageEventName, onStorageCustomEvent);
		if (initOnMounted) tryOnMounted(() => {
			firstMounted = true;
			update();
		});
		else update();
		function dispatchWriteEvent(oldValue, newValue) {
			if (window) {
				const payload = {
					key: keyComputed.value,
					oldValue,
					newValue,
					storageArea: storage
				};
				window.dispatchEvent(storage instanceof Storage ? new StorageEvent("storage", payload) : new CustomEvent(customStorageEventName, { detail: payload }));
			}
		}
		function write(v) {
			try {
				const oldValue = storage.getItem(keyComputed.value);
				if (v == null) {
					dispatchWriteEvent(oldValue, null);
					storage.removeItem(keyComputed.value);
				} else {
					const serialized = serializer.write(v);
					if (oldValue !== serialized) {
						storage.setItem(keyComputed.value, serialized);
						dispatchWriteEvent(oldValue, serialized);
					}
				}
			} catch (e) {
				onError(e);
			}
		}
		function read(event) {
			const rawValue = event ? event.newValue : storage.getItem(keyComputed.value);
			if (rawValue == null) {
				if (writeDefaults && rawInit != null) storage.setItem(keyComputed.value, serializer.write(rawInit));
				return rawInit;
			} else if (!event && mergeDefaults) {
				const value = serializer.read(rawValue);
				if (typeof mergeDefaults === "function") return mergeDefaults(value, rawInit);
				else if (type === "object" && !Array.isArray(value)) return {
					...rawInit,
					...value
				};
				return value;
			} else if (typeof rawValue !== "string") return rawValue;
			else return serializer.read(rawValue);
		}
		function update(event) {
			if (event && event.storageArea !== storage) return;
			if (event && event.key == null) {
				data.value = rawInit;
				return;
			}
			if (event && event.key !== keyComputed.value) return;
			pauseWatch();
			try {
				const serializedData = serializer.write(data.value);
				if (event === void 0 || (event === null || event === void 0 ? void 0 : event.newValue) !== serializedData) data.value = read(event);
			} catch (e) {
				onError(e);
			} finally {
				if (event) (0, vue.nextTick)(resumeWatch);
				else resumeWatch();
			}
		}
		function updateFromCustomEvent(event) {
			update(event.detail);
		}
		return data;
	}
	function useSessionStorage(key, initialValue, options = {}) {
		const { window = defaultWindow } = options;
		return useStorage(key, initialValue, window === null || window === void 0 ? void 0 : window.sessionStorage, options);
	}
	Number.POSITIVE_INFINITY;
	var _hoisted_1 = { class: "tags-filter" };
	var TagsFilter_default = _plugin_vue_export_helper_default((0, vue.defineComponent)({
		__name: "TagsFilter",
		setup(__props, { expose: __expose }) {
			const { t } = i18n.global;
			const filterTagsKeys = useSessionStorage("filterTagsKeys", [], { listenToStorageChanges: false });
			const filterTags = (0, vue.computed)(() => compact(filterTagsKeys.value.map((key) => filterTagsMap[key])));
			(0, vue.watch)(filterTags, (val) => {
				doFilterTags$1(val);
			}, {
				deep: true,
				immediate: true
			});
			__expose({ doFilterTags: ($node) => {
				doFilterTags$1(filterTags.value, $node);
			} });
			return (_ctx, _cache) => {
				return (0, vue.openBlock)(), (0, vue.createElementBlock)("li", _hoisted_1, [(0, vue.createVNode)((0, vue.unref)(element_plus.ElSelect), {
					modelValue: (0, vue.unref)(filterTagsKeys),
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => (0, vue.isRef)(filterTagsKeys) ? filterTagsKeys.value = $event : null),
					class: "filter-select",
					multiple: "",
					"collapse-tags": "",
					"collapse-tags-tooltip": "",
					placeholder: (0, vue.unref)(t)("common.filter")
				}, {
					default: (0, vue.withCtx)(() => [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)((0, vue.unref)(filterTagsKeysGrouped), (tags, group) => {
						return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(element_plus.ElOptionGroup), {
							key: group,
							class: "filter-option-group",
							label: (0, vue.unref)(t)(`common.${group}`)
						}, {
							default: (0, vue.withCtx)(() => [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(tags, (tag) => {
								return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(element_plus.ElOption), {
									key: tag,
									class: "filter-option",
									label: (0, vue.unref)(t)(`common.abbr.${tag}`),
									value: tag
								}, {
									default: (0, vue.withCtx)(() => [(0, vue.createTextVNode)((0, vue.toDisplayString)((0, vue.unref)(t)(`common.${tag}`)), 1)]),
									_: 2
								}, 1032, ["label", "value"]);
							}), 128))]),
							_: 2
						}, 1032, ["label"]);
					}), 128))]),
					_: 1
				}, 8, ["modelValue", "placeholder"])]);
			};
		}
	}), [["__scopeId", "data-v-4057e360"]]);
	var filterTagsMap = (() => {
		if (IS_NHENTAI) return {
			japanese: {
				type: "language",
				value: "lang-jp"
			},
			english: {
				type: "language",
				value: "lang-gb"
			},
			chinese: {
				type: "language",
				value: "lang-cn"
			},
			uncensored: {
				type: "other",
				value: "uncensored"
			}
		};
		if (IS_NHENTAI_TO) return {
			japanese: {
				type: "language",
				value: "2"
			},
			english: {
				type: "language",
				value: "19"
			},
			chinese: {
				type: "language",
				value: "10197"
			},
			uncensored: {
				type: "other",
				value: "632"
			}
		};
		if (IS_NHENTAI_XXX) return {
			japanese: {
				type: "language",
				value: "2"
			},
			english: {
				type: "language",
				value: "1"
			},
			chinese: {
				type: "language",
				value: "3"
			},
			uncensored: {
				type: "other",
				value: "18"
			}
		};
		return {
			japanese: {
				type: "language",
				value: "6346"
			},
			english: {
				type: "language",
				value: "12227"
			},
			chinese: {
				type: "language",
				value: "29963"
			},
			uncensored: {
				type: "other",
				value: "8693"
			}
		};
	})();
	var filterTagsKeysGrouped = groupBy(Object.keys(filterTagsMap), (key) => filterTagsMap[key].type);
	var allLangTags = Object.values(filterTagsMap).filter((item) => item.type === "language");
	var langDetectRegMap = Object.entries({
		english: /\[english\]|translation\]/i,
		chinese: /\[chinese\]|中国翻訳|漢化\]/i
	});
	var TAG_ATTR_NAME = "data-tags";
	var LANGUAGE_DATA_NAME = IS_NHENTAI_XXX ? "languages" : "tags";
	var LANGUAGE_ATTR_NAME = `data-${LANGUAGE_DATA_NAME}`;
	var HIDDEN_CLASS = "nhentai-helper-hidden";
	var handleMissingDataTags = ($gallery) => {
		$gallery.each(function() {
			const title = (0, jquery.default)(this).find(selector.galleryCaption).text();
			const tag = filterTagsMap[langDetectRegMap.find(([, reg]) => reg.test(title))?.[0] || "japanese"];
			if (tag) {
				const curTags = this.dataset[LANGUAGE_DATA_NAME];
				this.dataset[LANGUAGE_DATA_NAME] = `${curTags ? `${curTags} ` : ""}${tag.value}`;
			}
		});
	};
	var getNotTagSelector = (items, attrName = TAG_ATTR_NAME) => items.map((item) => IS_NHENTAI ? `:not(.${item.value})` : `:not([${attrName}~=${item.value}])`).join("");
	var doFilterTags$1 = (tags, $node) => {
		logger.debug("doFilterTags", tags, $node?.[0]);
		const getNode = $node ? (selector) => $node.find(selector) : (selector) => (0, jquery.default)(selector);
		getNode(selector.gallery).removeClass(HIDDEN_CLASS);
		if (!IS_NHENTAI) handleMissingDataTags(getNode(`${selector.gallery}${getNotTagSelector(allLangTags, LANGUAGE_ATTR_NAME)}`));
		const { ["language"]: langTags, ["other"]: otherTags } = groupBy(tags, (tag) => tag.type);
		if (langTags?.length) {
			const $g = getNode(`${selector.gallery}${getNotTagSelector(tags, LANGUAGE_ATTR_NAME)}`);
			if (needRunComplexDebug()) logger.debug("hide galleries by lang", Array.from($g));
			$g.addClass(HIDDEN_CLASS);
		}
		otherTags?.forEach((tag) => {
			const $g = getNode(`${selector.gallery}:not(.${HIDDEN_CLASS})${getNotTagSelector([tag])}`);
			if (needRunComplexDebug()) logger.debug("hide galleries by other", Array.from($g));
			$g.addClass(HIDDEN_CLASS);
		});
	};
	var mountTagsFilter = () => {
		const menuLeft = document.querySelector(selector.menuLeft);
		if (!menuLeft) return {};
		const vnode = (0, vue.h)(TagsFilter_default);
		(0, vue.render)(vnode, menuLeft);
		return vnode.component?.exposed ?? {};
	};
	var UNCENSORED_REG = /(?:un|de)censored/i;
	var doFilterTags;
	var debounceDoFilterTags = debounce((el) => {
		logger.debug("debounceDoFilterTags", el);
		doFilterTags?.((0, jquery.default)(el));
	}, 0);
	var initListPage = () => {
		logger.info("init list page");
		initGalleries();
		doFilterTags = mountTagsFilter().doFilterTags;
		onceInit();
	};
	var onceInit = once(() => {
		initShortcut();
		lastDownload.init();
		restoreDownloadQueue();
		initMutationObserver();
		clickDebugLog();
	});
	var clickDebugLog = () => {
		document.addEventListener("click", (e) => {
			if (!(needRunComplexDebug() && e.target instanceof HTMLElement)) return;
			const paginationEl = e.target.closest(selector.pjaxTrigger);
			if (paginationEl) {
				const $el = (0, jquery.default)(paginationEl);
				if ([
					"next",
					"previous",
					"first",
					"last"
				].some((className) => {
					if ($el.hasClass(className)) {
						logger.debug(`click pagination ${className}`);
						return true;
					}
					return false;
				})) return;
				if ($el.hasClass("page")) {
					logger.debug("click pagination", $el.text());
					return;
				}
				logger.debug("click", paginationEl);
			}
		});
	};
	var isHTMLElement = (node) => {
		return node instanceof HTMLElement || String(node) === "[object HTMLDivElement]";
	};
	var initMutationObserver = () => {
		new MutationObserver((mutations) => {
			mutations.forEach(({ addedNodes, target }) => {
				if (!addedNodes.length || !(target instanceof HTMLElement)) return;
				if (needRunComplexDebug() && !(target.closest(".nhentai-helper-btn,.el-popper,[data-v-app]") || target.classList.contains("nhentai-helper-gallery") || target.id.startsWith("el-"))) logger.debug("MutationObserver#body", {
					target,
					addedNodes
				});
				addedNodes.forEach((node) => {
					if (!isHTMLElement(node)) return;
					{
						const el = target.parentElement?.matches(selector.gallery) ? target.parentElement : node.matches(selector.gallery) ? node : null;
						if (el) {
							el._nhentaiHelperDestroy?.();
							initGallery.call(el);
							if (el.parentElement) debounceDoFilterTags(el.parentElement);
						}
					}
					if (node.tagName === "DIV" && (node.matches(selector.galleryList) || node.parentElement?.matches(selector.galleryList) || node.matches(".gallery-grid"))) {
						const $el = (0, jquery.default)(node);
						$el.find(selector.gallery).each(initGallery);
						doFilterTags?.($el);
					}
				});
			});
		}).observe(document.body, {
			subtree: true,
			childList: true
		});
	};
	var initGalleries = () => {
		logger.info("init galleries");
		(0, jquery.default)(selector.gallery).each(initGallery);
		initListenMarkDownloadedUpdateForGalleries();
	};
	var initShortcut = () => {
		const ignoreActiveElTags = new Set(["INPUT", "TEXTAREA"]);
		document.addEventListener("keydown", (event) => {
			const activeElTag = document.activeElement?.tagName || "";
			if (ignoreActiveElTags.has(activeElTag)) return;
			switch (event.key) {
				case "ArrowLeft":
					document.querySelector(selector.paginationPrevious)?.click();
					break;
				case "ArrowRight":
					document.querySelector(selector.paginationNext)?.click();
					break;
			}
		});
	};
	var restoreDownloadQueue = () => {
		const galleriesJson = sessionStorage.getItem("downloadQueue");
		if (!galleriesJson) return;
		try {
			const galleries = JSON.parse(galleriesJson);
			for (const gallery of galleries) addDownloadGalleryTask(gallery);
		} catch (error) {
			logger.error(error);
		}
	};
	var initGallery = function() {
		logger.debug("initGallery", this);
		const $gallery = (0, jquery.default)(this);
		if ($gallery.attr("init")) return;
		$gallery.attr("init", "true");
		$gallery.addClass("nhentai-helper-gallery");
		const $a = $gallery.find(selector.galleryCover);
		if (settings.openOnNewTab) $a.attr("target", "_blank");
		const gid = /\/g\/(\d+)/.exec($a.attr("href"))?.[1];
		if (!gid) return;
		this.dataset.gid = gid;
		const enTitle = $gallery.find(selector.galleryCaption).text().trim();
		$gallery.toggleClass("nhentai-helper-blacklist", isTitleBlacklisted.value(enTitle));
		logger.debug("initGallery gid", gid);
		const isNotSelf = () => gid !== this.dataset.gid;
		if (IS_NHENTAI) if (UNCENSORED_REG.test(enTitle)) $gallery.addClass("uncensored");
		else $gallery.removeClass("uncensored");
		const progressDisplayController = new ProgressDisplayController();
		const { downloadBtn } = progressDisplayController;
		$gallery.append(downloadBtn);
		let ignoreController;
		const markGalleryDownloaded = (isDownloaded, needBroadcast = true) => {
			if (isNotSelf()) return;
			if (isDownloaded) $gallery.addClass("downloaded");
			else $gallery.removeClass("downloaded");
			ignoreController?.setStatus(isDownloaded);
			if (needBroadcast) broadcastMarkDownloadedUpdate(gid, isDownloaded);
		};
		this._markGalleryDownloaded = markGalleryDownloaded;
		Promise.all([isDownloadedByGid(gid), isDownloadedByTitle({ english: enTitle })]).then(([gidDownloaded, titleDownloaded]) => {
			const downloaded = gidDownloaded || titleDownloaded;
			if (downloaded) markGalleryDownloaded(downloaded);
			if (settings.showIgnoreButton) {
				ignoreController = new IgnoreController(false, downloaded);
				const { ignoreBtn } = ignoreController;
				const markGalleryTitleDownloaded = async (downloaded) => {
					try {
						const gallery = await getGalleryInfo(gid);
						if (ignoreController.getStatus() !== downloaded) return;
						(downloaded ? markAsDownloaded : unmarkAsDownloaded)(gid, gallery.title);
					} catch (error) {
						logger.error("get gallery", gid, error);
					}
				};
				ignoreBtn.addEventListener("click", async () => {
					const ignore = ignoreController.getStatus();
					logger.info("ignore gallery", gid, ignore);
					if (ignore) {
						markGalleryDownloaded(false);
						await markGalleryTitleDownloaded(false);
					} else {
						markGalleryDownloaded(true);
						await markGalleryTitleDownloaded(true);
					}
				});
				$gallery.append(ignoreBtn);
			}
		});
		let skipDownloadedCheck = false;
		const startDownload = async () => {
			if (!settings.autoCancelDownloadedManga) progressDisplayController.lockBtn("Wait");
			if (!skipDownloadedCheck && await isDownloadedByGid(gid)) {
				if (!await downloadAgainConfirm($gallery.find(selector.galleryCaption).text(), true)) {
					progressDisplayController.reset();
					markGalleryDownloaded(true);
					return;
				}
				skipDownloadedCheck = true;
			}
			if (settings.autoCancelDownloadedManga) progressDisplayController.lockBtn("Wait");
			let gallery;
			try {
				gallery = await getGalleryInfo(gid);
			} catch (error) {
				logger.error(error);
				progressDisplayController.error();
				errorRetryConfirm(ErrorAction.GET_INFO, void 0, startDownload);
				return;
			}
			if (!skipDownloadedCheck) {
				if (await isDownloadedByTitle(gallery.title) && !await downloadAgainConfirm(gallery.title.japanese || gallery.title.english, true)) {
					progressDisplayController.reset();
					markAsDownloaded(gid, gallery.title);
					markGalleryDownloaded(true);
					return;
				}
				if (dlQueue.queue.some(({ info: { gallery: { title } } }) => isSameTitle(title, gallery.title)) && !await downloadAgainConfirm(gallery.title.japanese || gallery.title.english, true)) {
					progressDisplayController.reset();
					return;
				}
			}
			addDownloadGalleryTask(gallery, {
				progressDisplayController,
				markGalleryDownloaded: () => markGalleryDownloaded(true)
			});
			lastDownload.update(gid);
		};
		downloadBtn.addEventListener("click", startDownload);
		const onContextMenu = (e) => {
			if (!settings.galleryContextmenuPreview) return;
			e.preventDefault();
			openGalleryMiniPopover(this, gid);
		};
		this.addEventListener("contextmenu", onContextMenu);
		this._nhentaiHelperDestroy = () => {
			this.removeEventListener("contextmenu", onContextMenu);
			$gallery.removeAttr("init");
			$gallery.removeClass("downloaded");
			$gallery.removeClass("nhentai-helper-blacklist");
			progressDisplayController.destroy();
			ignoreController?.destroy();
			delete this._nhentaiHelperDestroy;
		};
	};
	var StyleInjector = class {
		styleNode;
		constructor(style) {
			this.styleNode = createNode("style", { children: style });
		}
		inject() {
			document.head.append(this.styleNode);
		}
		remove() {
			this.styleNode.remove();
		}
	};
	var initOnlineViewPage = () => {
		if (!IS_NHENTAI) initViewMode();
	};
	var initViewMode = () => {
		logger.info("init view mode");
		const style = new StyleInjector(`${selector.mediaImage}{width:auto;max-width:calc(100vw - 20px);max-height:100vh}`);
		const viewModeText = ["[off]", "[on]"];
		let viewMode = _GM_getValue("online_view_mode", 0);
		applyOnlineViewStyle(!!viewMode, style);
		const btnText = createNode("span", { children: viewModeText[viewMode] });
		const btn = createNode("button", {
			id: "online-view-mode-btn",
			class: className.greyButton,
			children: ["100% view height ", btnText]
		});
		btn.addEventListener("click", () => {
			viewMode = 1 - viewMode;
			_GM_setValue("online_view_mode", viewMode);
			btnText.textContent = viewModeText[viewMode];
			applyOnlineViewStyle(!!viewMode, style);
		});
		(0, jquery.default)(selector.pageContainer).prepend(btn);
	};
	var applyOnlineViewStyle = (enable, style) => {
		if (enable) style.inject();
		else style.remove();
	};
	var init = () => {
		let lastPageType = getPageType();
		initPage(lastPageType).catch(logger.error);
		if (IS_SVELTE) window.navigation.addEventListener("navigate", async (e) => {
			if (e.destination.url.startsWith("blob:")) return;
			logger.info("page navigate");
			const lastUrl = new URL(location.href);
			await sleep();
			const curUrl = new URL(location.href);
			const pageType = getPageType();
			if (!(lastPageType === PageType.MANGA_LIST && pageType === PageType.MANGA_LIST)) initPage(pageType).catch(logger.error);
			if (pageType === PageType.MANGA_LIST && (lastPageType !== pageType || lastUrl.pathname !== curUrl.pathname)) lastDownload.init();
			lastPageType = pageType;
		});
	};
	var initPage = async (pageType = getPageType()) => {
		logger.info("init page", {
			url: location.href,
			pageType,
			isSvelte: IS_SVELTE
		});
		if (IS_SVELTE) {
			onSvelteHydrationMismatch(initPage);
			if (!isSvelteReady()) {
				logger.warn("Svelte detected and not ready, waiting to avoid hydration mismatch");
				await waitForSvelteReady();
			}
		}
		(0, jquery.default)("body").addClass(`nhentai-helper-${location.hostname.replace(/\./g, "_")}`);
		switch (pageType) {
			case PageType.MANGA_LIST:
				initListPage();
				applyPjax();
				break;
			case PageType.MANGA_DETAIL:
				initDetailPage().catch(logger.error);
				initGalleries();
				break;
			case PageType.ONLINE_VIEW:
				initOnlineViewPage();
				break;
		}
		applyDownloadedTitleColor();
	};
	var applyPjax = () => {
		if (IS_NHENTAI) return;
		logger.info("apply pjax");
		(0, jquery.default)(document).pjax(selector.pjaxTrigger, {
			container: selector.pjaxTarget,
			fragment: selector.pjaxTarget,
			timeout: 1e4
		});
		(0, jquery.default)(document).on("pjax:end", () => {
			(0, jquery.default)(selector.pjaxRemoveParam).each(function() {
				const $this = (0, jquery.default)(this);
				const href = $this.attr("href");
				if (!href || href.startsWith("#")) return;
				const isPathname = href.startsWith("/");
				const url = isPathname ? new URL(href, location.origin) : new URL(href);
				url.searchParams.delete("_pjax");
				$this.attr("href", isPathname ? `${url.pathname}${url.search}` : url.href);
			});
		});
	};
	extendPrototype(import_localforage.default);
	var initSettingsDialogApp = once(() => createAppAndMount(SettingsDialog_default, (app) => {
		app.use(i18n);
	}));
	var openSettingsDialog = () => {
		initSettingsDialogApp().open();
	};
	createAppAndMount(DownloadPanel_default);
	init();
	_GM_registerMenuCommand(i18n.global.t("common.settings"), openSettingsDialog);
	_GM_registerMenuCommand(i18n.global.t("menu.restoreLastDownload"), () => lastDownload.restore());
})(Vue, jQuery, ElementPlus);
