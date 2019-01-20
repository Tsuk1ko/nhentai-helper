// ==UserScript==
// @name         nhentai download as zip
// @name:zh-CN   nhentai 下载增强
// @name:zh-TW   nhentai 下載增強
// @namespace    https://github.com/Tsuk1ko
// @version      1.2.0
// @icon         https://nhentai.net/favicon.ico
// @description        Add a "download zip" button for nhentai gallery page
// @description:zh-CN  为 nhentai 本子页增加 zip 打包下载
// @description:zh-TW  爲 nhentai 本子頁增加 zip 打包下載
// @author       Jindai Kirin
// @include      /^https:\/\/nhentai\.net\/g\/[0-9]+\/$/
// @connect      i.nhentai.net
// @license      GPL-3.0
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @require      https://cdn.bootcss.com/jszip/3.1.4/jszip.min.js
// @require      https://cdn.bootcss.com/FileSaver.js/1.3.2/FileSaver.min.js
// @require      https://cdn.bootcss.com/axios/0.18.0/axios.min.js
// @run-at       document-end
// @noframes
// @homepageURL  https://github.com/Tsuk1ko/nhentai-download-as-zip
// @supportURL   https://github.com/Tsuk1ko/nhentai-download-as-zip/issues
// @downloadURL  https://github.com/Tsuk1ko/nhentai-download-as-zip/raw/master/script.user.js
// @updateURL    https://github.com/Tsuk1ko/nhentai-download-as-zip/raw/master/script.user.js
// ==/UserScript==

(async function () {
	'use strict';
	let THREAD = GM_getValue('thread_num', 8);
	const MIME = {
		png: "image/png",
		jpg: "image/jpeg",
		gif: "image/gif"
	};

	function mimeType(suffix) {
		if (!MIME[suffix]) throw new Error(`Unknown suffix ${suffix}`);
		return MIME[suffix];
	};

	GM_registerMenuCommand('设置 nhentai 下载线程数', () => {
		let num;
		do {
			num = prompt(`请输入下载线程数 (1~32) [当前：${THREAD}]`, THREAD);
			if (num === null) return;
			num = parseInt(num);
		} while (num.toString() == 'NaN' || num < 1 || num > 32);
		THREAD = num;
		GM_setValue('thread_num', num);
	});

	//插入按钮
	GM_addStyle('#download-zip:disabled{cursor:wait}');
	$('#info > .buttons').append('<button id="download-zip" class="btn btn-secondary"><i class="fa fa-download"></i> <span id="download-zip-txt">Collecting...</span></button>');
	let $btn = $('#download-zip');
	let $btnTxt = $('#download-zip-txt');

	function btnState(able) {
		$btn.attr('disabled', !able);
	}

	function btnTxt(txt) {
		$btnTxt.html(txt);
	}

	//获取本子信息
	btnState(false);
	let title = $('#info > h2').html() || $('#info > h1').html();
	title = title.replace(/[/\\:*?"<>|.&$ ]+/g, ' ');
	let pages = [];
	$('#thumbnail-container > .thumb-container img.lazyload').each(function () {
		pages.push($(this).attr('data-src').replace('t.nhentai.net', 'i.nhentai.net').replace('t.', '.'));
	});
	btnState(true);
	btnTxt(`Download as zip 0/${pages.length}`);

	//伪多线程
	function multiThread(tasks, promiseFunc, threadNum) {
		let threads = [];
		let taskIndex = 0;
		//创建线程
		for (let threadID = 0; threadID < threadNum; threadID++) {
			threads.push(new Promise(async resolve => {
				while (true) {
					let i = taskIndex++;
					if (i >= tasks.length) break;
					await promiseFunc(threadID, tasks[i]);
				}
				resolve();
			}));
		}
		return Promise.all(threads);
	}

	//下载&压缩
	let zip = new JSZip();
	let zipBlob = false;
	let done = 0;

	function pagePromise(threadID, url) {
		let page = /([^\/]+)\.([^.]+)$/.exec(url);
		console.log(`[${threadID}] Downloading ${url}`);
		return axios.get(url, {
			responseType: 'arraybuffer'
		}).then(ret => {
			let blob = new Blob([ret.data], {
				type: mimeType(page[2])
			});
			zip.file(`${page[1]}.${page[2]}`, blob, {
				binary: true
			});
			btnTxt(`Downloading ${++done}/${pages.length}`);
		});
	}
	async function download() {
		btnState(false);
		btnTxt(`Downloading 0/${pages.length}`);
		await multiThread(pages, pagePromise, THREAD);
		btnState(true);
	}
	async function saveZip() {
		if (!zipBlob) zipBlob = await zip.generateAsync({
			type: 'blob',
			base64: true
		});
		saveAs(zipBlob, `${title}.zip`);
	}

	$btn.click(() => {
		if (done == pages.length) {
			saveZip();
			return;
		}
		download().then(() => {
			btnTxt('Download as zip √');
			saveZip();
		});
	});
})();
