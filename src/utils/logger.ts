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
  // TODO convert error, element, etc.
  return value;
};

const stringifyArgs = (args: any[]): string =>
  args
    .map(arg => (typeof arg === 'object' ? JSON.stringify(arg, stringifyReplacer) : String(arg)))
    .join(' ');

const collectLog = (method: LogMethod, args: any[]): void => {
  try {
    logs.push(`[${method}] ${stringifyArgs(args)}`);
  } catch {
    logs.push(`[${method}] (can't stringify) ${args}`);
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
