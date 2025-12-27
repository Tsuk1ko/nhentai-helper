import type { Remote } from 'comlink';
import { wrap } from 'comlink';
import { MIME } from '@/typings';
import type { ImgConverterExpose } from '@/workers/imgConverter';
import ImgConverterWorker from '@/workers/imgConverter?worker&inline';

const mimeToExt: Record<string, string | undefined> = {
  [MIME.JPG]: 'jpg',
  [MIME.PNG]: 'png',
};

export class ImgConverter {
  #worker?: Promise<Remote<ImgConverterExpose>>;

  async convertWebpTo(...args: Parameters<ImgConverterExpose['convertWebpTo']>) {
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
    return wrap<ImgConverterExpose>(new ImgConverterWorker());
  }
}
