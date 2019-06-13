// ==UserScript==
// @name         nhentai helper
// @name:zh-CN   nhentai 助手
// @name:zh-TW   nhentai 助手
// @namespace    https://github.com/Tsuk1ko
// @version      1.5.1
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

(function() {
	'use strict';

	let THREAD = GM_getValue('thread_num', 8);

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

	const MIME = {
		png: "image/png",
		jpg: "image/jpeg",
		gif: "image/gif"
	};

	const mimeType = (_ext) => {
		if (!MIME[_ext]) throw new Error(`Unknown extension "${_ext}"`);
		return MIME[_ext];
	};

	const EXT = {
		p: 'png',
		j: 'jpg',
		g: 'gif'
	};

	const getExtension = (_t) => {
		if (!EXT[_t]) throw new Error(`Unknown type "${_t}"`);
		return EXT[_t];
	};

	//伪多线程
	const multiThread = (tasks, promiseFunc) => {
		let threads = [];
		let taskIndex = 0;
		//创建线程
		for (let threadID = 0; threadID < THREAD; threadID++) {
			threads.push(new Promise(async resolve => {
				while (true) {
					let i = taskIndex++;
					if (i >= tasks.length) break;
					await promiseFunc(tasks[i], threadID);
				}
				resolve();
			}));
		}
		return Promise.all(threads);
	};

	//获取本子信息
	const getGallery = async gid => {
		let {
			media_id,
			title: {
				english,
				japanese
			},
			images: {
				pages
			}
		} = gid > 0 ? await axios.get(`https://nhentai.net/api/gallery/${gid}`).then(r => r.data) : gallery;

		let p = [];
		pages.forEach((page, i) => {
			p.push({
				i: i + 1,
				t: getExtension(page.t)
			});
		});

		return {
			mid: media_id,
			title: japanese || english,
			pages: p
		};
	};

	//下载本子
	const downloadG = async (gid, $btn, $btnTxt, headTxt = '') => {
		let {
			mid,
			title,
			pages
		} = await getGallery(gid);
		let done = 0;
		let zip = new JSZip();

		const btnUpdateProgress = () => {
			if (done >= pages.length) $btnTxt.html(`${headTxt}√`);
			else $btnTxt.html(`${headTxt}${done}/${pages.length}`);
		};

		btnUpdateProgress();

		const dlPromise = (page, threadID) => {
			let filename = `${page.i}.${page.t}`;
			let url = `https://i.nhentai.net/galleries/${mid}/${filename}`;
			console.log(`[${threadID}] ${url}`);
			return axios.get(`${url}?v=0`, {
				responseType: 'arraybuffer'
			}).then(r => {
				zip.file(filename, new Blob([r.data], {
					type: mimeType(page.t)
				}), {
					binary: true
				});
				done++;
				btnUpdateProgress();
			});
		};

		await multiThread(pages, dlPromise);

		let data = await zip.generateAsync({
			type: 'blob',
			base64: true
		});

		$btn.attr('disabled', false);

		return {
			name: `${title}.zip`,
			data
		};
	};

	if (/^https:\/\/nhentai\.net\/g\/[0-9]+\/$/.exec(window.location.href)) {
		$('#info > .buttons').append('<button class="btn btn-secondary download-zip"><i class="fa fa-download"></i> <span class="download-zip-txt">Download as zip</span></button>');

		let $btn = $('.download-zip');
		let $btnTxt = $('.download-zip-txt');

		let zip;

		$btn.click(async () => {
			try {
				if (!zip) {
					$btn.attr('disabled', true);
					zip = await downloadG(0, $btn, $btnTxt, 'Download as zip ');
				}
				saveAs(zip.data, zip.name);
			} catch (error) {
				$btnTxt.html('Error');
				console.error(error);
			}
		});
	} else if ($('.gallery').length > 0) {
		$('ul.menu.left').append('<li style="padding:0 10px">LANG filter: <select id="lang-filter"><option value="none">None</option><option value="zh">Chinese</option><option value="jp">Japanese</option><option value="en">English</option></select></li>');

		let queue = [];
		let running = false;

		const startQueue = async () => {
			if (!running && queue.length > 0) {
				running = true;
				do {
					await (queue.shift())();
				} while (queue.length > 0);
				running = false;
			}
		};

		$('.gallery').each(function() {
			let $this = $(this);
			$this.prepend('<button class="btn btn-secondary download-zip"><i class="fa fa-download"></i> <span class="download-zip-txt"></span></button>');

			let gid = /[0-9]+/.exec($this.find('a.cover').attr('href'))[0];

			let language = '';
			let dataTags = $this.attr('data-tags').split(' ');
			if (dataTags.includes('6346')) language = 'jp';
			else if (dataTags.includes('12227')) language = 'en';
			else if (dataTags.includes('29963')) language = 'zh';
			$this.attr('lang', language);

			let $btn = $this.find('.download-zip');
			let $btnTxt = $this.find('.download-zip-txt');

			let zip;

			$btn.click(() => {
				if (zip) saveAs(zip.data, zip.name);
				else {
					$btn.attr('disabled', true);
					$btnTxt.html('Wait');
					queue.push(async () => {
						try {
							zip = await downloadG(gid, $btn, $btnTxt);
							saveAs(zip.data, zip.name);
						} catch (error) {
							$btnTxt.html('Error');
							console.error(error);
						}
					});
					startQueue();
				}
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

		$('#lang-filter').change(function() {
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
