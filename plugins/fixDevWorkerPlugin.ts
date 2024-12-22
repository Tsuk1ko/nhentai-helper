import { context } from 'esbuild';
import type { BuildContext } from 'esbuild';
import type { Plugin } from 'vite';

const regexp = /\?worker&inline$/;

export default function fixDevWorkerPlugin(): Plugin {
  const contextMap = new Map<string, BuildContext>();

  const getContext = async (path: string) => {
    const ctx = contextMap.get(path);
    if (ctx) return ctx;
    const newCtx = await context({
      entryPoints: [path],
      bundle: true,
      write: false,
      minify: true,
      legalComments: 'none',
    });
    contextMap.set(path, newCtx);
    return newCtx;
  };

  return {
    name: 'fix-dev-worker',
    async transform(code, id) {
      if (this.environment.config.command !== 'serve' || !regexp.test(id)) {
        return;
      }

      const ctx = await getContext(id.replace(/\?.*$/, ''));
      const buildResult = await ctx.rebuild();
      const builtCode = new TextDecoder().decode(buildResult.outputFiles![0].contents);

      return code.replace(
        /"\/[^"]+"/,
        JSON.stringify(`data:text/javascript;charset=utf-8,${encodeURIComponent(builtCode)}`),
      );
    },
    async buildEnd() {
      if (this.environment.config.command !== 'serve') {
        return;
      }

      await Promise.all(Array.from(contextMap.values()).map(ctx => ctx.dispose()));
      contextMap.clear();
    },
  };
}
