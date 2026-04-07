import { GM_info } from '$';
import { isPlainObject, isPrimitive, once } from 'es-toolkit';
import { IS_DEV } from '@/const';
import { settings } from './settings';

const LOG_PREFIX = '[nhentai-helper]';

type LogMethod = 'debug' | 'info' | 'warn' | 'error';

const logs: string[] = [];

const stringifyReplacer = (key: string, value: any): any => {
  if (typeof value === 'bigint') {
    return (JSON as any).rawJSON?.(value.toString()) ?? Number(value);
  }
  if (Array.isArray(value) || isPlainObject(value) || isPrimitive(value)) {
    return value;
  }
  if (value instanceof Error) {
    return {
      $: 'Error',
      name: value.name,
      message: value.message,
      stack: value.stack,
      cause: value.cause,
    };
  }
  if (value instanceof HTMLElement) {
    return {
      $: 'HTMLElement',
      tagName: value.tagName,
      attributes: Object.fromEntries(
        Array.from(value.attributes).map(({ name, value }) => [name, value]),
      ),
    };
  }
  if (value instanceof NodeList) {
    return Array.from(value);
  }
  return String(value);
};

const stringifyArgs = (args: any[]): string =>
  args
    .map(arg => (typeof arg === 'object' ? JSON.stringify(arg, stringifyReplacer) : String(arg)))
    .join(' ');

const collectLog = (method: LogMethod, args: any[]): void => {
  const now = new Date();
  const prefix = `[${method}] ${now.toLocaleString('zh-CN')}:${now.getMilliseconds().toString().padStart(3, '0')}`;
  try {
    logs.push(`${prefix} ${stringifyArgs(args)}`);
  } catch {
    logs.push(`${prefix} ${args}`);
  }
};

const createLoggerFn =
  (method: LogMethod) =>
  (...args: any[]): void => {
    if (settings.collectLog) {
      collectLog(method, args);
    }
    if (method !== 'debug' || IS_DEV) {
      console[method](LOG_PREFIX, ...args);
    }
  };

export const logger = {
  debug: createLoggerFn('debug'),
  info: createLoggerFn('info'),
  warn: createLoggerFn('warn'),
  error: createLoggerFn('error'),
} as const;

const getInfoLog = once(() =>
  stringifyArgs([
    '[debug] info',
    {
      extension: `${GM_info.scriptHandler} ${GM_info.version}`,
      userAgent: GM_info.userAgentData,
      version: GM_info.script.version,
    },
  ]),
);

export const exportLogs = () => [getInfoLog(), ...logs].join('\n');

export const clearLogs = () => {
  logs.length = 0;
};
