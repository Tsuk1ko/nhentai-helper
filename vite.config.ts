import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import monkey, { cdn } from 'vite-plugin-monkey';
import minifiedRawLoader from './plugins/minifiedRawLoader';
import cleanCss from './plugins/cleanCss';
import tsx from './plugins/tsx';

const IS_DEV = process.env.npm_lifecycle_event === 'dev';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    minifiedRawLoader(),
    tsx(),
    vue(),
    components({
      dts: false,
      dirs: [],
      resolvers: [ElementPlusResolver()],
    }),
    cleanCss(),
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
          ...(IS_DEV ? ['https://www.blank.org/*'] : []),
        ],
        include: /^https:\/\/([^/]*\.)?(nya|dog|cat|bug|qq|fox|ee|yy)hentai[0-9]*\./,
        connect: ['nhentai.net', 'i.nhentai.net', 'cdn.nhentai.xxx', 'cdn.nload.xyz'],
        resource: {
          notycss: 'https://fastly.jsdelivr.net/npm/noty@3.1.4/lib/noty.min.css',
        },
        'run-at': 'document-end',
        noframes: true,
        homepageURL: 'https://github.com/Tsuk1ko/nhentai-helper',
        supportURL: 'https://github.com/Tsuk1ko/nhentai-helper/issues',
      },
      build: {
        fileName: 'script.user.js',
        metaFileName: true,
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
});
