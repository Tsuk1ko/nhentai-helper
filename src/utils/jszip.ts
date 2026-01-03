import { proxy, releaseProxy, transfer, wrap } from 'comlink';
import type { Remote } from 'comlink';
import type { JSZipGeneratorOptions, JSZipMetadata } from 'jszip';
import { WORKER_THREAD_NUM } from '@/const';
import type { DisposableJSZip, JSZipFile } from '@/workers/jszip';
import JSZipWorker from '@/workers/jszip?worker&inline';
import { removeAt } from './array';

type RemoteDisposableJSZip = Remote<typeof DisposableJSZip>;

export type OnUpdateCallback = (data: JSZipMetadata & { workerId: number }) => void;

interface PoolMember {
  id: number;
  idle: boolean;
  JSZip?: RemoteDisposableJSZip;
}

const getTransferableData = (files: JSZipFile[]): Transferable[] =>
  files
    .map(({ data }) => data)
    .filter((data): data is Exclude<JSZipFile['data'], string> => typeof data !== 'string');

class JSZipWorkerPool {
  private readonly pool: PoolMember[] = [];
  private readonly waitingQueue: Array<(value: PoolMember) => void> = [];

  constructor() {
    for (let id = 0; id < WORKER_THREAD_NUM; id++) {
      this.pool.push({
        id,
        idle: true,
      });
    }
  }

  async generateAsync(
    files: JSZipFile[],
    options?: JSZipGeneratorOptions,
    onUpdate?: OnUpdateCallback,
  ): Promise<Uint8Array<ArrayBuffer>> {
    const worker = await this.acquireWorker();
    const zip = await new worker.JSZip();
    try {
      await zip.files(transfer(files, getTransferableData(files)));
      return await zip.generateAsync(
        options,
        proxy((metaData: JSZipMetadata) => {
          if (metaData.currentFile) onUpdate?.({ workerId: worker.id, ...metaData });
        }),
      );
    } finally {
      zip[releaseProxy]();
      this.releaseWorker(worker);
    }
  }

  async generateStream(
    files: JSZipFile[],
    options?: JSZipGeneratorOptions,
    onUpdate?: OnUpdateCallback,
  ): Promise<ReadableStream<Uint8Array<ArrayBuffer>>> {
    const worker = await this.acquireWorker();
    const zip = await new worker.JSZip();
    try {
      await zip.files(transfer(files, getTransferableData(files)));
      const { zipStream } = await zip.generateStream(
        options,
        proxy((metaData: JSZipMetadata) => {
          if (metaData.currentFile) onUpdate?.({ workerId: worker.id, ...metaData });
        }),
      );
      return zipStream as ReadableStream<Uint8Array<ArrayBuffer>>;
    } finally {
      zip[releaseProxy]();
      this.releaseWorker(worker);
    }
  }

  unzipFile: DisposableJSZip['unzipFile'] = async params => {
    const worker = await this.acquireWorker();
    const zip = await new worker.JSZip();
    const clean = (): void => {
      zip[releaseProxy]();
      this.releaseWorker(worker);
    };
    try {
      return (await zip.unzipFile(transfer(params, [params.data]))) as any;
    } catch (error) {
      clean();
      throw error;
    }
  };

  private async createWorker(): Promise<RemoteDisposableJSZip> {
    return wrap<typeof DisposableJSZip>(new JSZipWorker());
  }

  private waitIdleWorker(): Promise<PoolMember> {
    return new Promise<PoolMember>(resolve => {
      this.waitingQueue.push(resolve);
    });
  }

  private async acquireWorker(): Promise<Required<PoolMember>> {
    let worker = this.pool.find(({ idle }) => idle);
    if (!worker) worker = await this.waitIdleWorker();
    if (!worker.JSZip) worker.JSZip = await this.createWorker();
    worker.idle = false;
    return worker as any;
  }

  private releaseWorker(worker: PoolMember): void {
    worker.idle = true;
    if (!this.waitingQueue.length) return;
    const emit = removeAt(this.waitingQueue, 0)!;
    emit(worker);
  }
}

const jszipPool = new JSZipWorkerPool();

export class JSZip {
  private files: JSZipFile[] = [];

  static unzipFile: DisposableJSZip['unzipFile'] = params => jszipPool.unzipFile(params);

  file(name: JSZipFile['name'], data: JSZipFile['data']): void {
    this.files.push({ name, data });
  }

  generateAsync(
    options?: JSZipGeneratorOptions,
    onUpdate?: OnUpdateCallback,
  ): Promise<Uint8Array<ArrayBuffer>> {
    const { files } = this;
    this.files = [];
    return jszipPool.generateAsync(files, options, onUpdate);
  }

  generateStream(
    options?: JSZipGeneratorOptions,
    onUpdate?: OnUpdateCallback,
  ): Promise<ReadableStream<Uint8Array<ArrayBuffer>>> {
    const { files } = this;
    this.files = [];
    return jszipPool.generateStream(files, options, onUpdate);
  }
}
