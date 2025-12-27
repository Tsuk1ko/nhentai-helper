import { transformWithEsbuild } from 'vite';
import type { Plugin } from 'vite';

const jsContentReg =
  /const jsContent = ('.*');\nconst blob = typeof self !== "undefined" && self\.Blob && new Blob\(\[/;

export default function minifyWorkerPlugin(): Plugin {
  return {
    name: 'minify-worker-plugin',
    apply: 'build',
    async transform(code, id) {
      if (!id.endsWith('?worker&inline')) return;

      let jsContent = '';
      const tempCode = code.replace(jsContentReg, (_, content) => {
        jsContent = content;
        return 'const jsContent = {{JS_CONTENT_PLACEHOLDER}};\nconst blob = typeof self !== "undefined" && self.Blob && new Blob([';
      });

      if (!jsContent) throw new Error('cannot find js content');

      // eslint-disable-next-line no-eval
      const ret = await transformWithEsbuild((0, eval)(jsContent), id, {
        charset: 'utf8',
        loader: 'js',
        minify: true,
        treeShaking: true,
      });
      const minifiedCode = JSON.stringify(ret.code);

      return tempCode.replace('{{JS_CONTENT_PLACEHOLDER}}', () => minifiedCode);
    },
  };
}
