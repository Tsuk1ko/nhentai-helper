import { each } from 'lodash-es';
import { Plugin } from 'vite';

const userJsReg = /\.user\.js$/;
const notMetaReg = /(?<=\/\/ ==\/UserScript==)[\s\S]*/;

export default function monkeyMetaJs(): Plugin {
  return {
    name: 'monkey-meta-js',
    apply: 'build',
    enforce: 'post',
    generateBundle({}, bundle) {
      each(bundle, chunk => {
        if (chunk.type !== 'chunk' || !userJsReg.test(chunk.fileName)) return;
        const meta = chunk.code.replace(notMetaReg, '\n');
        this.emitFile({
          type: 'asset',
          fileName: chunk.fileName.replace(userJsReg, '.meta.js'),
          source: meta,
        });
      });
    },
  };
}
