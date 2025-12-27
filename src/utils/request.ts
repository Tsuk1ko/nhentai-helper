import { GM_xmlhttpRequest } from '$';
import { sleep } from './common';
import logger from './logger';

class RequestAbortError extends Error {
  constructor(url: string) {
    super(`Request abort ${url}`);
  }
}

export const isAbortError = (e: any): e is RequestAbortError => e instanceof RequestAbortError;

export const requestArrayBufferGm = (params: {
  url: string | (() => string);
  retry?: number;
  /** Return `true` when there are available hosts */
  on404?: (url: string) => boolean;
}): { abort: () => void; dataPromise: Promise<ArrayBuffer> } => {
  const { url: urlGetter, retry = 3, on404 } = params;
  let abortFunc: (() => void) | undefined;
  const dataPromise = new Promise<ArrayBuffer>((resolve, reject) => {
    try {
      const url = typeof urlGetter === 'function' ? urlGetter() : urlGetter;
      const req = GM_xmlhttpRequest({
        method: 'GET',
        url,
        responseType: 'arraybuffer',
        onerror: e => {
          if (retry === 0) {
            logger.error('Network error', url, e);
            reject(e);
          } else {
            logger.warn('Network error, retry', url, e);
            setTimeout(() => {
              const { abort, dataPromise } = requestArrayBufferGm({ ...params, retry: retry - 1 });
              abortFunc = abort;
              resolve(dataPromise);
            }, 1000);
          }
        },
        onload: r => {
          const { status, response } = r;
          if (status === 200) resolve(response);
          else if (retry === 0) reject(r);
          else {
            const additionRetry = status === 404 ? on404?.(r.finalUrl) : false;
            logger.warn('Request error, retry', status, url, r);
            setTimeout(() => {
              const { abort, dataPromise } = requestArrayBufferGm({
                ...params,
                retry: retry - (additionRetry ? 0 : 1),
              });
              abortFunc = abort;
              resolve(dataPromise);
            }, 1000);
          }
        },
      });
      abortFunc = () => {
        req.abort();
        logger.log('Request abort', url);
        reject(new RequestAbortError(url));
      };
    } catch (error) {
      reject(error);
    }
  });
  return {
    abort: () => abortFunc?.(),
    dataPromise,
  };
};

export const requestArrayBufferFetch = ({
  url: urlGetter,
  retry = 3,
  on404,
}: {
  url: string | (() => string);
  retry?: number;
  /** Return `true` when there are available hosts */
  on404?: (url: string) => boolean;
}): { abort: () => void; dataPromise: Promise<ArrayBuffer> } => {
  const controller = new AbortController();

  const doFetch = async (retry: number): Promise<ArrayBuffer> => {
    const url = typeof urlGetter === 'function' ? urlGetter() : urlGetter;
    try {
      const r = await fetch(url, { credentials: 'include', signal: controller.signal });
      const { status } = r;
      if (status === 200) return r.arrayBuffer();
      if (retry === 0) throw r;
      const additionRetry = status === 404 ? on404?.(r.url) : false;
      logger.warn('Request error, retry', status, url, r);
      await sleep(1000);
      return doFetch(retry - (additionRetry ? 0 : 1));
    } catch (e) {
      if (retry === 0) {
        logger.error('Network error', url, e);
        throw e;
      }
      logger.warn('Network error, retry', url, e);
      await sleep(1000);
      return doFetch(retry - 1);
    }
  };

  return {
    abort: () => {
      controller.abort();
    },
    dataPromise: doFetch(retry),
  };
};

export const fetchText = (url: string): Promise<string> => fetch(url).then(r => r.text());

export const fetchJSON = <D = any>(url: string): Promise<D> => fetch(url).then(r => r.json());
