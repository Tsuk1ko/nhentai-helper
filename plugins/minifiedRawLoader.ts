import { Plugin, transformWithEsbuild } from 'vite';

const minRawReg = /\?minraw$/;

export default function minifiedRawLoader(): Plugin {
  return {
    name: 'minified-raw-loader',
    async transform(code, id) {
      if (!id.match(minRawReg)) return;

      const { code: minifiedCode } = await transformWithEsbuild(code, '', { minify: true });
      return `export default ${JSON.stringify(minifiedCode.trim())}`;
    },
  };
}
