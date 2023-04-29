import type { CSSProperties } from 'vue';
import type { NHentaiGalleryInfo } from '@/utils/nhentai';

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

export enum ErrorAction {
  GET_INFO = 'getInfo',
  DOWNLOAD = 'download',
}
