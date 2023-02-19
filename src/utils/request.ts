import { GM_xmlhttpRequest, type XhrRequest } from '$';
import logger from './logger';

class RequestAbortError extends Error {
  public constructor(url: string) {
    super(`Request abort ${url}`);
  }
}

export const isAbortError = (e: any): e is RequestAbortError => e instanceof RequestAbortError;

export const request = <D = any>(
  url: string,
  responseType?: XhrRequest['responseType'],
  retry = 3,
): { abort: () => void; dataPromise: Promise<D> } => {
  let abortFunc: (() => void) | undefined;
  const dataPromise = new Promise<D>((resolve, reject) => {
    try {
      const req = GM_xmlhttpRequest({
        method: 'GET',
        url,
        responseType,
        onerror: e => {
          if (retry === 0) {
            logger.error('Network error', url, e);
            reject(e);
          } else {
            logger.warn('Network error, retry', url, e);
            setTimeout(() => {
              const { abort, dataPromise } = request(url, responseType, retry - 1);
              abortFunc = abort;
              resolve(dataPromise);
            }, 1000);
          }
        },
        onload: r => {
          const { status, response } = r;
          if (status === 200) resolve(response as D);
          else if (retry === 0) reject(r);
          else {
            logger.warn('Request error, retry', status, url, r);
            setTimeout(() => {
              const { abort, dataPromise } = request(url, responseType, retry - 1);
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

export const getJSON = <D = any>(url: string): Promise<D> => request<D>(url, 'json').dataPromise;

export const getText = (url: string): Promise<string> => request<string>(url).dataPromise;

export const fetchJSON = <D = any>(url: string): Promise<D> => fetch(url).then(r => r.json());
