// ==UserScript==
// @name         nhentai download as zip
// @name:zh-CN   nhentai 下载增强
// @name:zh-TW   nhentai 下載增強
// @namespace    https://github.com/Tsuk1ko
// @version      1.0.0
// @icon         https://nhentai.net/favicon.ico
// @description        Add a "download zip" button for nhentai gallery page
// @description:zh-CN  为 nhentai 本子页增加 zip 打包下载
// @description:zh-TW  爲 nhentai 本子頁增加 zip 打包下載
// @author       Jindai Kirin
// @include      /^https:\/\/nhentai\.net\/g\/[0-9]+\/$/
// @connect      i.nhentai.net
// @license      GPL-3.0
// @grant        GM_addStyle
// @require      https://code.jquery.com/jquery-2.2.4.min.js
// @require      https://cdn.bootcss.com/jszip/3.1.4/jszip.min.js
// @require      https://cdn.bootcss.com/FileSaver.js/1.3.2/FileSaver.min.js
// @require      https://unpkg.com/axios/dist/axios.min.js
// @run-at       document-end
// @noframes
// ==/UserScript==

(async function () {
	'use strict';
	const THREAD = 5;
	const EXT = {
		j: 'jpg',
		p: 'png',
		g: 'gif'
	}
	const MIME = {
		png: "image/png",
		jpg: "image/jpeg",
		gif: "image/gif"
	};

	function mimeType(suffix) {
        if (!MIME[suffix]) throw new Error(`Unknown suffix ${suffix}`);
		return MIME[suffix];
	};

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
	let gid = /^https:\/\/nhentai\.net\/g\/([0-9]+)\/$/.exec(window.location.href)[1];
	let {
		mid,
		pages,
		title
	} = await axios.get(`https://nhentai.net/api/gallery/${gid}`).then(ret => {
		let {
			images: {
				pages
			},
			media_id,
			title: {
				english,
				japanese
			}
		} = ret.data;
		let title = japanese || english;

		let parsePages = [];
		for (let i = 0; i < pages.length; i++) {
			let t = pages[i].t;
			if (!EXT[t]) throw new Error(`Unknown page type ${t}`);
			parsePages.push([i + 1, EXT[t]]);
		}

		return {
			mid: media_id,
			pages: parsePages,
			title: title.replace(/[/\\:*?"<>|.&$ ]+/g, ' ')
		};
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

	function pagePromise(threadID, page) {
		let url = `https://i.nhentai.net/galleries/${mid}/${page[0]}.${page[1]}`;
		console.log(`[${threadID}] Downloading ${url}`);
		return axios.get(url, {
			responseType: 'arraybuffer'
		}).then(ret => {
			let blob = new Blob([ret.data], {
				type: mimeType(page[1])
			});
			zip.file(`${page[0]}.${page[1]}`, blob, {
				binary: true
			});
			btnTxt(`Downloading ${++done}/${pages.length}`);
		});
	}
	async function download() {
		btnState(false);
		btnTxt(`Downloading 0/${pages.length}`);
		let option = {
			responseType: 'arraybuffer'
		};
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
