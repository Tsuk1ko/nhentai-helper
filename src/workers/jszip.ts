import type { JSZipGeneratorOptions, OnUpdateCallback } from 'jszip';

declare const JSZip: typeof import('jszip');
declare const Comlink: typeof import('comlink');

importScripts(
  'https://fastly.jsdelivr.net/npm/comlink@4.3.1/dist/umd/comlink.min.js',
  'https://fastly.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js',
);

class DisposableJSZip {
  private readonly zip = new JSZip();

  public file(name: string, { data }: { data: ArrayBuffer }): void {
    this.zip.file(name, data);
  }

  public async generateAsync(
    options?: JSZipGeneratorOptions,
    onUpdate?: OnUpdateCallback,
  ): Promise<Uint8Array> {
    const data = await this.zip.generateAsync({ ...options, type: 'uint8array' }, onUpdate);
    return Comlink.transfer(data, [data.buffer]);
  }

  public generateStream(
    options: JSZipGeneratorOptions | undefined,
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
