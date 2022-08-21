import type { JSZipGeneratorOptions, JSZipObject, OnUpdateCallback } from 'jszip';

declare const JSZip: typeof import('jszip');
declare const Comlink: typeof import('comlink');

importScripts(
  'https://fastly.jsdelivr.net/npm/comlink@4.3.1/dist/umd/comlink.min.js',
  'https://fastly.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js',
);

export interface JSZipFile {
  name: string;
  data: ArrayBuffer | string;
}

export type JSZipOutputType = Parameters<JSZipObject['async']>[0];

export interface JSZipUnzipParams<T extends JSZipOutputType> {
  data: ArrayBuffer;
  path: string;
  type: T;
}

class DisposableJSZip {
  private readonly zip = new JSZip();

  public file({ name, data }: JSZipFile): void {
    this.zip.file(name, data);
  }

  public files(files: JSZipFile[]): void {
    files.forEach(({ name, data }) => {
      this.zip.file(name, data);
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public async unzipFile<T extends JSZipOutputType>({ data, path, type }: JSZipUnzipParams<T>) {
    const zip = await JSZip.loadAsync(data);
    return zip.file(path)?.async(type);
  }

  public async generateAsync(
    options?: JSZipGeneratorOptions,
    onUpdate?: OnUpdateCallback,
  ): Promise<Uint8Array> {
    const data = await this.zip.generateAsync({ ...options, type: 'uint8array' }, onUpdate);
    return Comlink.transfer(data, [data.buffer]);
  }

  public generateStream(
    options?: JSZipGeneratorOptions,
    onUpdate?: OnUpdateCallback,
    onEnd?: () => void,
  ): { zipStream: ReadableStream<Uint8Array> } {
    const stream = this.zip.generateInternalStream({ ...options, type: 'uint8array' });
    const zipStream = new ReadableStream<Uint8Array>({
      start: controller => {
        stream.on('error', e => {
          controller.error(e);
          onEnd?.();
        });
        stream.on('end', () => {
          setTimeout(() => {
            controller.close();
            onEnd?.();
          });
        });
        stream.on('data', (data, metaData) => {
          controller.enqueue(data);
          onUpdate?.(metaData);
        });
        stream.resume();
      },
    });
    return Comlink.transfer({ zipStream }, [zipStream as any]);
  }
}

Comlink.expose(DisposableJSZip);

export type { DisposableJSZip };
