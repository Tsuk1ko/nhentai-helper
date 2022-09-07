import { resolve } from 'path';
import { readFileSync } from 'fs';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, { cdn } from 'vite-plugin-monkey';
import minifiedRawLoader from './plugins/minifiedRawLoader';
import tsx from './plugins/tsx';

const jsdelivrFastly = (() => {
  const verCache = new Map<string, string>();
  const getVer = (name: string): string => {
    if (verCache.has(name)) return verCache.get(name);
    const pkgPath = resolve(__dirname, 'node_modules', name, 'package.json');
    const { version } = JSON.parse(readFileSync(pkgPath).toString());
    verCache.set(name, version);
    return version;
  };
  return (name: string, path?: string) => {
    const [, getUrl] = cdn.jsdelivrFastly('', path);
    return getUrl(getVer(name), name);
  };
})();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    minifiedRawLoader(),
    tsx(),
    vue(),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: {
          '': 'nHentai Helper',
          'zh-CN': 'nHentai 助手',
          'zh-TW': 'nHentai 助手',
        },
        icon: 'https://nhentai.net/favicon.ico',
        namespace: 'https://github.com/Tsuk1ko',
        description: {
          '': 'Download nHentai manga as compression file easily, and add some useful features. Also support some mirror sites.',
          'zh-CN': '为 nHentai 增加压缩打包下载方式以及一些辅助功能，同时还支持一些镜像站',
          'zh-TW': '爲 nHentai 增加壓縮打包下載方式以及一些輔助功能，同時還支援一些鏡像站',
        },
        match: [
          'https://nhentai.net/*',
          'https://nhentai.xxx/*',
          'https://nhentai.to/*',
          'https://nhentai.website/*',
          ...(mode === 'development' ? ['https://www.blank.org/*'] : []),
        ],
        include: /^https:\/\/([^/]*\.)?(nya|dog|cat|bug|qq|fox|ee|yy)hentai[0-9]*\./,
        connect: ['nhentai.net', 'i.nhentai.net', 'cdn.nhentai.xxx', 'cdn.nload.xyz'],
        resource: {
          notyCss: jsdelivrFastly('noty', 'lib/noty.min.css'),
          elementPlus: jsdelivrFastly('element-plus', 'dist/index.full.min.js'),
          elementPlusCss: jsdelivrFastly('element-plus', 'dist/index.css'),
        },
        'run-at': 'document-end',
        noframes: true,
        homepageURL: 'https://github.com/Tsuk1ko/nhentai-helper',
        supportURL: 'https://github.com/Tsuk1ko/nhentai-helper/issues',
      },
      build: {
        fileName: 'script.user.js',
        metaFileName: true,
        minifyCss: true,
        externalGlobals: {
          comlink: cdn.jsdelivrFastly('Comlink', 'dist/umd/comlink.min.js'),
          eventemitter3: cdn.jsdelivrFastly('EventEmitter3', 'umd/eventemitter3.min.js'),
          'file-saver': cdn.jsdelivrFastly('saveAs', 'dist/FileSaver.min.js'),
          jquery: cdn.jsdelivrFastly('$', 'dist/jquery.min.js'),
          'jquery-pjax': cdn.jsdelivrFastly('', 'jquery.pjax.min.js'),
          localforage: cdn.jsdelivrFastly('localforage', 'dist/localforage.min.js'),
          md5: cdn.jsdelivrFastly('MD5', 'dist/md5.min.js'),
          noty: cdn.jsdelivrFastly('Noty', 'lib/noty.min.js'),
          streamsaver: cdn.jsdelivrFastly('streamSaver', 'StreamSaver.min.js'),
          vue: cdn.jsdelivrFastly('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),
  ],
}));
