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
  ): Promise<{ data: ArrayBuffer }> {
    const data = await this.zip.generateAsync({ ...options, type: 'arraybuffer' }, onUpdate);
    return Comlink.transfer({ data }, [data]);
  }
}

Comlink.expose(DisposableJSZip);

export type { DisposableJSZip };
