import { Visitor } from 'vite';
import type { ESTree, Plugin } from 'vite';

const isWorkerRequest = (id: string) => {
  const queryIndex = id.indexOf('?');
  if (queryIndex === -1) return false;

  const params = new URLSearchParams(id.slice(queryIndex + 1));
  return params.has('worker') && !params.has('url');
};

const findWorkerExpressions = (program: ESTree.Program) => {
  const expressions: ESTree.NewExpression[] = [];

  new Visitor({
    NewExpression(node) {
      if (node.callee.type === 'Identifier' && node.callee.name === 'Worker') {
        expressions.push(node);
      }
    },
  }).visit(program);

  return expressions;
};

export default function fixDevWorkerImportPlugin(): Plugin {
  return {
    name: 'fix-dev-worker-import',
    apply: 'serve',
    transform(code, id) {
      if (!isWorkerRequest(id)) return;

      const program = this.parse(code);
      const workerExpressions = findWorkerExpressions(program);
      const workerExpression = workerExpressions[0];

      if (workerExpressions.length !== 1 || !workerExpression) {
        this.error(
          `Expected exactly one Worker constructor in Vite wrapper, found ${workerExpressions.length}: ${id}`,
        );
      }

      const workerUrlNode = workerExpression.arguments[0];
      if (
        !workerUrlNode ||
        workerUrlNode.type !== 'Literal' ||
        typeof workerUrlNode.value !== 'string'
      ) {
        this.error(`Cannot find worker URL in Vite wrapper: ${id}`);
      }

      const workerUrlSource = code.slice(workerUrlNode.start, workerUrlNode.end);
      const replacement = `\`data:text/javascript;charset=utf-8,\${encodeURIComponent(\`import \${JSON.stringify(new URL(${workerUrlSource}, import.meta.url).href)};\`)}\``;

      // Preserve Vite's wrapper and replace only the Worker URL argument.
      return `${code.slice(0, workerUrlNode.start)}${replacement}${code.slice(workerUrlNode.end)}`;
    },
  };
}
