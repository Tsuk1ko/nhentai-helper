import { groupBy, map, mapValues } from 'lodash-es';
import type { NHentaiGalleryInfo } from '../nhentai';
import { MetaBuilder } from './MetaBuilder';

interface EzeInfoJson {
  gallery_info: {
    title: string;
    title_title_original: string;
    link: string;
    category?: string;
    tags: Record<string, string[]>;
    language?: string;
    translated: boolean;
    upload_date?: number[];
    source: {
      site: string;
      gid: number;
    };
  };
}

export class EzeInfoJsonBuilder extends MetaBuilder {
  protected data!: EzeInfoJson;

  public build(): string {
    return JSON.stringify(this.data, undefined, 2);
  }

  protected prepare(info: NHentaiGalleryInfo): void {
    const date = info.uploadDate ? new Date(info.uploadDate * 1000) : undefined;

    this.data = {
      gallery_info: {
        title: info.title.english,
        title_title_original: info.title.japanese,
        link: `${location.origin}/g/${info.gid}`,
        category: info.tags.find(({ type }) => type === 'category')?.name,
        tags: mapValues(groupBy(info.tags, 'type'), tags => map(tags, 'name')),
        ...this.getLanguageInfo(info),
        upload_date: date
          ? [
              date.getUTCFullYear(),
              date.getUTCMonth() + 1,
              date.getUTCDate(),
              date.getUTCHours(),
              date.getUTCMinutes(),
              date.getUTCSeconds(),
            ]
          : undefined,
        source: {
          site: location.origin,
          gid: info.gid,
        },
      },
    };
  }

  protected getLanguageInfo(info: NHentaiGalleryInfo) {
    let language: string | undefined;
    let translated = false;

    info.tags
      .filter(({ type }) => type === 'language')
      .forEach(({ name }) => {
        if (name === 'translated') {
          translated = true;
          return;
        }
        language = name;
      });

    return { language, translated };
  }
}
