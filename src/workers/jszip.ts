import type { JSZipGeneratorOptions, OnUpdateCallback, DataEventCallback } from 'jszip';

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
  ): Promise<{ data: ArrayBuffer }> {
    const data = await this.zip.generateAsync({ ...options, type: 'arraybuffer' }, onUpdate);
    return Comlink.transfer({ data }, [data]);
  }

  public generateStream(
    options: JSZipGeneratorOptions | undefined,
    onDataCallback: DataEventCallback<Uint8Array>,
  ): Promise<void> {
    const stream = this.zip.generateInternalStream({ ...options, type: 'uint8array' });
    stream.on('data', (data, metaData) => {
      onDataCallback(data, metaData);
    });
    return new Promise((resolve, reject) => {
      stream.on('end', () => setTimeout(resolve));
      stream.on('error', reject);
      void stream.accumulate();
    });
  }
}

Comlink.expose(DisposableJSZip);

export type { DisposableJSZip };
