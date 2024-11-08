import { expose, transfer } from 'comlink';

const convertWebpTo = async (data: ArrayBuffer, type: string, quality?: number) => {
  const bitmap = await createImageBitmap(new Blob([data], { type: 'image/webp' }));
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  canvas.getContext('bitmaprenderer')!.transferFromImageBitmap(bitmap);
  const blob = await canvas.convertToBlob({ type, quality });
  const buffer = await blob.arrayBuffer();
  return transfer({ buffer, type }, [buffer]);
};

const exposed = {
  convertWebpTo,
} as const;

expose(exposed);

export type ImgConverterExpose = typeof exposed;
