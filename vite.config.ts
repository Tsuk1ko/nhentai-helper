import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey from 'vite-plugin-monkey';
import copy from 'rollup-plugin-copy';
import components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import workerDevLoader from './plugins/workerDevLoader';

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => ({
  server: {
    open: false,
  },
  preview: {
    open: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    workerDevLoader(),
    vue(),
    components({
      dts: false,
      dirs: [],
      resolvers: [ElementPlusResolver()],
    }),
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
          ...(mode === 'development' ? ['https://nhelper.lolicon.app/dev.html'] : []),
        ],
        include: /^https:\/\/([^/]*\.)?(nya|dog|cat|bug|qq|fox|ee|yy)hentai[0-9]*\./,
        connect: [
          'nhentai.net',
          'i.nhentai.net',
          'i2.nhentai.net',
          'i3.nhentai.net',
          'i5.nhentai.net',
          'i7.nhentai.net',
          'cdn.nhentai.xxx',
          'cdn.nload.xyz',
        ],
        'run-at': 'document-end',
        noframes: true,
        homepageURL: 'https://github.com/Tsuk1ko/nhentai-helper',
        supportURL: 'https://github.com/Tsuk1ko/nhentai-helper/issues',
      },
      build: {
        fileName: 'script.user.js',
        metaFileName: true,
        minifyCss: true,
      },
    }),
    copy({
      targets: [{ src: ['docs/*.html'], dest: 'dist' }],
      hook: 'writeBundle',
    }),
  ],
}));
