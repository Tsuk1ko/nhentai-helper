import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, { cdn, util } from 'vite-plugin-monkey';
import copy from 'rollup-plugin-copy';
import vueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => ({
  server: {
    open: false,
  },
  preview: {
    open: true,
  },
  build: {
    cssMinify: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    vueI18nPlugin({
      module: 'petite-vue-i18n',
      include: resolve(dirname(fileURLToPath(import.meta.url)), './src/i18n/locales/**'),
      strictMessage: false,
    }),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: {
          '': 'nHentai Helper',
          'zh-CN': 'nHentai 助手',
          'zh-TW': 'nHentai 助手',
        },
        icon: 'https://icon.horse/icon/nhentai.net',
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
          ...(mode === 'development' ? ['https://nhelper.lolicon.app/dev.html'] : []),
        ],
        include: /^https:\/\/([^/]*\.)?(nya|dog|cat|bug|qq|fox|ee|yy)hentai[0-9]*\./,
        connect: [
          'nhentai.net',
          'i.nhentai.net',
          'i1.nhentai.net',
          'i2.nhentai.net',
          'i3.nhentai.net',
          'i4.nhentai.net',
          'i5.nhentai.net',
          'i7.nhentai.net',
          '*',
        ],
        'run-at': 'document-end',
        noframes: true,
        homepageURL: 'https://github.com/Tsuk1ko/nhentai-helper',
        supportURL: 'https://github.com/Tsuk1ko/nhentai-helper/issues',
      },
      build: {
        fileName: 'script.user.js',
        metaFileName: true,
        externalGlobals: {
          vue: cdn.unpkg('Vue', 'dist/vue.global.prod.js').concat(
            await util.fn2dataUrl(() => {
              // @ts-expect-error
              window.Vue = Vue;
              // #51 fix Violentmonkey `Date.now()`
              if (!window.Date.now) {
                window.Date.now = () => new Date().getTime();
              }
            }),
          ),
          'element-plus': cdn.unpkg('ElementPlus', 'dist/index.full.min.js'),
          jquery: cdn.unpkg('jQuery', 'dist/jquery.min.js'),
        },
        externalResource: {
          'element-plus/dist/index.css': cdn.unpkg('element-plus-css'),
        },
      },
    }),
    copy({
      targets: [{ src: ['docs/*.html'], dest: 'dist' }],
      hook: 'writeBundle',
    }),
  ],
}));
