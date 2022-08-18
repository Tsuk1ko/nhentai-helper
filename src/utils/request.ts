import { GM_xmlhttpRequest, XhrRequest } from '$';
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
            logger.error('Network error', url);
            reject(e);
          } else {
            logger.warn('Network error, retry', url);
            setTimeout(() => {
              const { abort, dataPromise } = request(url, responseType, retry - 1);
              abortFunc = abort;
              resolve(dataPromise);
            }, 1000);
          }
        },
        onload: ({ status, response }) => {
          if (status === 200) resolve(response as D);
          else if (retry === 0) reject(new Error(`${status} ${url}`));
          else {
            logger.warn(status, url);
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
