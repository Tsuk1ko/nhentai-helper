import type { Plugin } from 'vite';

export default function tsx(): Plugin {
  return {
    name: 'tsx-loader',
    async transform(code, id) {
      if (!id.endsWith('.tsx')) return;
      return `import * as jsx from "@/utils/jsx";\n${code}`;
    },
  };
}
