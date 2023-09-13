import { GM_xmlhttpRequest } from '$';
import logger from './logger';

interface GmResponseTypeMap {
  text: string;
  json: any;
  arraybuffer: ArrayBuffer;
  blob: Blob;
  document: Document;
  stream: ReadableStream<Uint8Array>;
}

type GmResponseType = keyof GmResponseTypeMap;

class RequestAbortError extends Error {
  public constructor(url: string) {
    super(`Request abort ${url}`);
  }
}

export const isAbortError = (e: any): e is RequestAbortError => e instanceof RequestAbortError;

export const request = <T extends GmResponseType = 'text'>(
  url: string,
  responseType?: T,
  retry = 3,
): { abort: () => void; dataPromise: Promise<GmResponseTypeMap[T]> } => {
  let abortFunc: (() => void) | undefined;
  const dataPromise = new Promise((resolve, reject) => {
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
          if (status === 200) resolve(response);
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

export const getJSON = <D = any>(url: string): Promise<D> => request(url, 'json').dataPromise;

export const getText = (url: string): Promise<string> => request(url).dataPromise;

export const fetchJSON = <D = any>(url: string): Promise<D> => fetch(url).then(r => r.json());

export const checkHost = async (url: string) => {
  const { origin } = new URL(url);
  try {
    await fetch(origin, { method: 'HEAD', mode: 'no-cors' });
    return true;
  } catch {
    return false;
  }
};
