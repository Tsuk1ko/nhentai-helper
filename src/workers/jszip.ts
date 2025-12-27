import { expose, transfer } from 'comlink';
import type { JSZipGeneratorOptions, JSZipObject, OnUpdateCallback } from 'jszip';
import JSZip from 'jszip';
import { getAdPage, isAdImg } from './utils/detectAd';

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

export interface JSZipGeneratorOptionsCustom extends JSZipGeneratorOptions {
  removeAdPage?: boolean;
}

class DisposableJSZip {
  private readonly zip = new JSZip();
  private readonly adRemoved = false;

  file({ name, data }: JSZipFile): void {
    this.zip.file(name, data);
  }

  files(files: JSZipFile[]): void {
    files.forEach(({ name, data }) => {
      this.zip.file(name, data);
    });
  }

  async unzipFile<T extends JSZipOutputType>({ data, path, type }: JSZipUnzipParams<T>) {
    const zip = await JSZip.loadAsync(data);
    return zip.file(path)?.async<any>(type);
  }

  async generateAsync(
    options?: JSZipGeneratorOptionsCustom,
    onUpdate?: OnUpdateCallback,
  ): Promise<Uint8Array> {
    if (options?.removeAdPage) await this.removeAd();
    const data = await this.zip.generateAsync({ ...options, type: 'uint8array' }, onUpdate);
    return transfer(data, [data.buffer]);
  }

  async generateStream(
    options?: JSZipGeneratorOptionsCustom,
    onUpdate?: OnUpdateCallback,
    onEnd?: () => void,
  ): Promise<{ zipStream: ReadableStream<Uint8Array> }> {
    if (options?.removeAdPage) await this.removeAd();
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
    return transfer({ zipStream }, [zipStream as any]);
  }

  private async removeAd() {
    if (this.adRemoved) return;

    const imgFiles: Array<{
      i: number;
      obj: JSZipObject;
    }> = [];
    Object.values(this.zip.files).forEach(obj => {
      const i = parseInt(obj.name);
      if (Number.isNaN(i)) return;
      imgFiles.push({ i, obj });
    });
    imgFiles.sort((a, b) => a.i - b.i);

    try {
      const adList = await getAdPage(imgFiles, async ({ obj }) =>
        isAdImg(await (obj as any)._data),
      );

      if (!adList.size) {
        console.log('[nhentai-helper] no ad pages detected');
        return;
      }

      const adPages = [...adList.values()].map(i => imgFiles[i]!.obj);
      console.log('[nhentai-helper] ad pages detected:', ...adPages.map(obj => obj.name));

      adPages.forEach(obj => {
        this.zip.remove(obj.name);
      });
    } catch (error) {
      console.error('[nhentai-helper] remove ad page', error);
    }
  }
}

expose(DisposableJSZip);

export type { DisposableJSZip };
