import { transformWithEsbuild, type Plugin } from 'vite';

const jsContentReg =
  /const jsContent = (".*");\n +const blob = typeof self !== "undefined" && self\.Blob && new Blob\(\[/;

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

      const ret = await transformWithEsbuild(JSON.parse(jsContent), id, {
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
