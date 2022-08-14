import { CSSProperties } from 'vue';
import type { NHentaiGalleryInfo } from '@/utils/nhentai';

export type ValueOf<T> = T[keyof T];

export interface MangaDownloadInfo {
  gallery: NHentaiGalleryInfo;
  done: number;
  compressing: boolean;
  compressingPercent: string;
  error: boolean;
  cancel?: Function;
}

export interface ElMark {
  style: CSSProperties;
  label: string;
}

export type ElMarks = Record<number, ElMark | string>;
