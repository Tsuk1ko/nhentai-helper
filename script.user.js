// ==UserScript==
// @name         nhentai helper
// @name:zh-CN   nhentai 助手
// @name:zh-TW   nhentai 助手
// @namespace    https://github.com/Tsuk1ko
// @version      1.4.0
// @icon         https://nhentai.net/favicon.ico
// @description        Add a "download zip" button for nhentai gallery page and some useful feature
// @description:zh-CN  为 nhentai 增加 zip 打包下载方式以及一些辅助功能
// @description:zh-TW  爲 nhentai 增加 zip 打包下載方式以及一些輔助功能
// @author       Jindai Kirin
// @include      https://nhentai.net/*
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
// @homepageURL  https://github.com/Tsuk1ko/nhentai-helper
// @supportURL   https://github.com/Tsuk1ko/nhentai-helper/issues
// @downloadURL  https://github.com/Tsuk1ko/nhentai-helper/raw/master/script.user.js
// @updateURL    https://github.com/Tsuk1ko/nhentai-helper/raw/master/script.user.js
// ==/UserScript==

(function () {
	'use strict';
	let THREAD = GM_getValue('thread_num', 8);
	const MIME = {
		png: "image/png",
		jpg: "image/jpeg",
		gif: "image/gif"
	};

	let mimeType = (suffix) => {
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

	GM_addStyle('.download-zip:disabled{cursor:wait}.gallery>.download-zip{position:absolute;z-index:1;left:0;top:0;opacity:.8}.gallery:hover>.download-zip{opacity:1}');

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

	if (/^https:\/\/nhentai\.net\/g\/[0-9]+\/$/.exec(window.location.href)) {
		//插入按钮
		$('#info > .buttons').append('<button class="btn btn-secondary download-zip"><i class="fa fa-download"></i> <span class="download-zip-txt">Collecting</span></button>');
		let $btn = $('.download-zip');
		let $btnTxt = $('.download-zip-txt');

		let btnState = (able) => {
			$btn.attr('disabled', !able);
		};

		let btnTxt = (txt) => {
			$btnTxt.html(txt);
		};

		//获取本子信息
		btnState(false);
		let title = $('#info > h2').html() || $('#info > h1').html();
		title = title.replace(/[\/\\:*?"<>|.&$ ]+/g, ' ');
		let pages = [];
		$('#thumbnail-container > .thumb-container img.lazyload').each(function () {
			pages.push($(this).attr('data-src').replace('t.nhentai.net', 'i.nhentai.net').replace('t.', '.'));
		});
		btnState(true);
		btnTxt(`Download as zip 0/${pages.length}`);

		//下载&压缩
		let zip = new JSZip();
		let zipBlob = false;
		let done = 0;

		let pagePromise = (threadID, url) => {
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
		};

		let download = async () => {
			btnState(false);
			btnTxt(`Downloading 0/${pages.length}`);
			await multiThread(pages, pagePromise, THREAD);
			btnState(true);
		};

		let saveZip = async () => {
			if (!zipBlob) zipBlob = await zip.generateAsync({
				type: 'blob',
				base64: true
			});
			saveAs(zipBlob, `${title}.zip`);
		};

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
	} else if ($('.gallery').length > 0) {
		$('ul.menu.left').append('<li style="padding:0 10px">LANG filter: <select id="lang-filter"><option value="none">None</option><option value="zh">Chinese</option><option value="jp">Japanese</option><option value="en">English</option></select></li>');

		let queue = [];
		let running = false;

		let startQueue = async () => {
			if (!running && queue.length > 0) {
				running = true;
				do {
					await (queue.shift())();
				} while (queue.length > 0);
				running = false;
			}
		};

		$('.gallery').each(function () {
			let $this = $(this);
			$this.prepend('<button class="btn btn-secondary download-zip"><i class="fa fa-download"></i> <span class="download-zip-txt"></span></button>');

			let language = '';
			let dataTags = $this.attr('data-tags').split(' ');
			if (dataTags.includes('6346')) language = 'jp';
			else if (dataTags.includes('12227')) language = 'en';
			else if (dataTags.includes('29963')) language = 'zh';
			$this.attr('lang', language);

			let $btn = $this.find('.download-zip');
			let $btnTxt = $this.find('.download-zip-txt');

			let title;
			let pages = [];

			let zip = new JSZip();
			let zipBlob = false;
			let done = 0;

			let btnState = (able) => {
				$btn.attr('disabled', !able);
			};

			let btnTxt = (txt) => {
				$btnTxt.html(txt);
			};

			let pagePromise = (threadID, url) => {
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
					btnTxt(`${++done}/${pages.length}`);
				});
			};

			let download = async () => {
				btnTxt('Collecting');

				//获取本子信息
				let $html = $($.parseHTML(await axios.get($this.find('a.cover').attr('href')).then(ret => ret.data)));
				title = $html.find('#info > h2').html() || $html.find('#info > h1').html();
				title = title.replace(/[\/\\:*?"<>|.&$ ]+/g, ' ');
				$html.find('#thumbnail-container > .thumb-container img.lazyload').each(function () {
					pages.push($(this).attr('data-src').replace('t.nhentai.net', 'i.nhentai.net').replace('t.', '.'));
				});

				btnTxt(`0/${pages.length}`);
				await multiThread(pages, pagePromise, THREAD);
				btnState(true);
			};

			let saveZip = async () => {
				if (!zipBlob) zipBlob = await zip.generateAsync({
					type: 'blob',
					base64: true
				});
				saveAs(zipBlob, `${title}.zip`);
			};

			$btn.click(() => {
				if (pages.length > 0 && done == pages.length) {
					saveZip();
					return;
				}
				btnState(false);
				btnTxt('Wait');
				queue.push(async () => {
					await download();
					btnTxt('√');
					saveZip();
				});
				startQueue();
			});
		});

		//语言过滤
		let langFilter = lang => {
			if (lang == 'none') $('.gallery').removeClass('hidden');
			else {
				$(`.gallery[lang=${lang}]`).removeClass('hidden');
				$(`.gallery:not([lang=${lang}])`).addClass('hidden');
			}
		};

		$('#lang-filter').change(function () {
			langFilter(this.value);
			sessionStorage.setItem('lang-filter', this.value);
		});

		let rememberedLANG = sessionStorage.getItem('lang-filter');
		if (rememberedLANG) {
			$('#lang-filter')[0].value = rememberedLANG;
			langFilter(rememberedLANG);
		}
	}
})();
