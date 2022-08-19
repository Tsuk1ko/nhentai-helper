import { wrap, Remote, transfer, proxy, releaseProxy } from 'comlink';
import type { JSZipGeneratorOptions, JSZipMetadata } from 'jszip';
import { removeAt } from './array';
import logger from './logger';
import { WORKER_THREAD_NUM } from '@/const';
import jszipWorkerCode from '@/workers/jszip?minraw';
import type { DisposableJSZip } from '@/workers/jszip';

type RemoteDisposableJSZip = Remote<typeof DisposableJSZip>;

export type OnUpdateCallback = (data: JSZipMetadata & { workerId: number }) => void;

interface PoolMember {
  id: number;
  idle: boolean;
  JSZip?: RemoteDisposableJSZip;
}

interface JSZipFile {
  name: string;
  data: ArrayBuffer;
}

const WORKER_URL = URL.createObjectURL(new Blob([jszipWorkerCode], { type: 'text/javascript' }));

class JSZipWorkerPool {
  private readonly pool: PoolMember[] = [];
  private readonly waitingQueue: Array<(value: PoolMember) => void> = [];

  public constructor() {
    for (let id = 0; id < WORKER_THREAD_NUM; id++) {
      this.pool.push({
        id,
        idle: true,
      });
    }
  }

  private createWorker(): RemoteDisposableJSZip {
    const worker = new Worker(WORKER_URL);
    return wrap<typeof DisposableJSZip>(worker);
  }

  private waitIdleWorker(): Promise<PoolMember> {
    return new Promise<PoolMember>(resolve => {
      this.waitingQueue.push(resolve);
    });
  }

  private async acquireWorker(): Promise<PoolMember> {
    let worker = this.pool.find(({ idle }) => idle);
    if (!worker) worker = await this.waitIdleWorker();
    if (!worker.JSZip) worker.JSZip = this.createWorker();
    worker.idle = false;
    return worker;
  }

  private releaseWorker(worker: PoolMember): void {
    worker.idle = true;
    if (!this.waitingQueue.length) return;
    const emit = removeAt(this.waitingQueue, 0)!;
    emit(worker);
  }

  public async generateAsync(
    files: JSZipFile[],
    options: JSZipGeneratorOptions | undefined,
    onUpdate: OnUpdateCallback,
  ): Promise<ArrayBuffer> {
    const worker = await this.acquireWorker();
    const zip = await new worker.JSZip!();
    for (const { name, data } of files) {
      await zip.file(name, transfer({ data }, [data]));
    }
    const { data } = await zip.generateAsync(
      options,
      proxy(data => onUpdate({ workerId: worker.id, ...data })),
    );
    zip[releaseProxy]();
    this.releaseWorker(worker);
    return data;
  }

  public async generateStream(
    files: JSZipFile[],
    options: JSZipGeneratorOptions | undefined,
    onUpdate: OnUpdateCallback,
  ): Promise<ReadableStream<Uint8Array>> {
    const worker = await this.acquireWorker();
    const zip = await new worker.JSZip!();
    for (const { name, data } of files) {
      await zip.file(name, transfer({ data }, [data]));
    }
    return new ReadableStream<Uint8Array>({
      start: async controller => {
        try {
          await zip.generateStream(
            options,
            proxy((data, metaData) => {
              controller.enqueue(data);
              onUpdate({ workerId: worker.id, ...metaData });
            }),
          );
          controller.close();
        } catch (error) {
          logger.error(error);
          controller.error(error);
        }
        zip[releaseProxy]();
        this.releaseWorker(worker);
      },
    });
  }
}

const jszipPool = new JSZipWorkerPool();

export class JSZip {
  private files: JSZipFile[] = [];

  public file(name: string, data: ArrayBuffer): void {
    this.files.push({ name, data });
  }

  public generateAsync(
    options: JSZipGeneratorOptions | undefined,
    onUpdate: OnUpdateCallback,
  ): Promise<ArrayBuffer> {
    const { files } = this;
    this.files = [];
    return jszipPool.generateAsync(files, options, onUpdate);
  }

  public generateStream(
    options: JSZipGeneratorOptions | undefined,
    onUpdate: OnUpdateCallback,
  ): Promise<ReadableStream<Uint8Array>> {
    const { files } = this;
    this.files = [];
    return jszipPool.generateStream(files, options, onUpdate);
  }
}
