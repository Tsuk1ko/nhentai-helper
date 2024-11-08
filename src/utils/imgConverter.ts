import type { Remote } from 'comlink';
import { wrap } from 'comlink';
import ImgConverterWorker from '@/workers/imgConverter?worker&inline';
import type { ImgConverterExpose } from '@/workers/imgConverter';
import { IS_DEV } from '@/const';
import { MIME } from '@/typings';

const getDevWorker = async (): Promise<Worker> => {
  const code = (await import('@/workers/imgConverter?worker-dev')).default;
  const url = URL.createObjectURL(new Blob([code], { type: 'text/javascript' }));
  return new Worker(url);
};

const mimeToExt: Record<string, string | undefined> = {
  [MIME.JPG]: 'jpg',
  [MIME.PNG]: 'png',
};

export class ImgConverter {
  #worker?: Promise<Remote<ImgConverterExpose>>;

  public async convertWebpTo(...args: Parameters<ImgConverterExpose['convertWebpTo']>) {
    const worker = await this.getWorker();
    const { buffer, type } = await worker.convertWebpTo(...args);
    return {
      buffer,
      ext: mimeToExt[type] || 'unknown',
    };
  }

  private async getWorker() {
    if (!this.#worker) this.#worker = this.createWorker();
    return this.#worker;
  }

  private async createWorker() {
    const worker = IS_DEV ? await getDevWorker() : new ImgConverterWorker();
    return wrap<ImgConverterExpose>(worker);
  }
}
