import type { Plugin } from 'vite';
import { transformWithEsbuild } from 'vite';

const regexp = /\?worker-dev$/;

const globalVarMap: Record<string, string> = {
  jszip: 'JSZip',
  comlink: 'Comlink',
};

export default function workerDevLoader(): Plugin {
  return {
    name: 'worker-dev-loader',
    async transform(code, id) {
      if (!regexp.test(id)) return;

      let { code: newCode } = await transformWithEsbuild(code, '');

      newCode = newCode.replace(/import (.+) from "(.+)";/g, (m, p1: string, p2: string) => {
        const lines = [`importScripts("https://fastly.jsdelivr.net/npm/${p2}");`];
        if (/^{.*}$/.test(p1)) lines.push(`const ${p1} = ${globalVarMap[p2]};`);
        return lines.join('\n');
      });

      return `export default ${JSON.stringify(newCode.trim())}`;
    },
  };
}
