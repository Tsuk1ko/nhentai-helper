import type { NHentaiGalleryInfo } from '../nhentai';

export abstract class MetaBuilder {
  public constructor(info: NHentaiGalleryInfo) {
    this.prepare(info);
  }

  public abstract build(): string;

  protected abstract prepare(info: NHentaiGalleryInfo): void;
}
