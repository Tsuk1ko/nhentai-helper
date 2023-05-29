import { each, isNil, map } from 'lodash-es';
import type { NHentaiGalleryInfo } from '../nhentai';
import { settings } from '../settings';
import { encodeHtml } from '../coder';
import type { MetaBuilder } from './MetaBuilder';

const langMap: Record<string, string> = {
  chinese: 'zh',
  english: 'en',
  japanese: 'ja',
};

export class ComicInfoXmlBuilder implements MetaBuilder {
  protected serializer = new XMLSerializer();
  protected doc = document.implementation.createDocument(null, 'ComicInfo');

  public constructor(info: NHentaiGalleryInfo) {
    this.setRootNS();
    this.appendElement(
      'Title',
      settings.metaFileTitleLanguage in info.title
        ? (info.title as any)[settings.metaFileTitleLanguage]
        : info.title.english,
    );
    this.appendElement(
      'Notes',
      `Created by nHentai Helper (Tsuk1ko/nhentai-helper) on ${new Date().toISOString()}`,
    );

    if (info.uploadDate) {
      const date = new Date(info.uploadDate * 1000);
      this.appendElement('Year', date.getUTCFullYear());
      this.appendElement('Month', date.getUTCMonth() + 1);
      this.appendElement('Day', date.getUTCDate());
    }

    const getTags = (type: string) => info.tags.filter(t => t.type === type);

    const artistTags = getTags('artist');
    if (artistTags.length) {
      this.appendElement('Writer', map(artistTags, 'name').join(', '));
    }

    const tags = getTags('tag');
    if (tags.length) {
      this.appendElement('Tags', map(tags, 'name').join(', '));
    }

    this.appendElement('Web', `${location.origin}/g/${info.gid}`);
    this.appendElement('PageCount', info.pages.length);

    const languageTag = info.tags.find(({ type, name }) => type === 'language' && name in langMap);
    if (languageTag) {
      this.appendElement('LanguageISO', langMap[languageTag.name]);
    }

    this.appendElement('Format', /\[digital\]/i.test(info.title.english) ? 'Digital' : 'TBP');
    this.appendElement('Manga', 'Yes');

    const characterTags = getTags('character');
    if (characterTags.length) {
      this.appendElement('Characters', map(characterTags, 'name').join(', '));
    }

    const pagesEl = this.createElement('Pages');
    const pageEls = info.pages.map(({ i, w, h }) =>
      this.createElement('Page', undefined, { Image: i, ImageWidth: w, ImageHeight: h }),
    );
    pagesEl.append(...pageEls);
    this.root.append(pagesEl);
  }

  public build(): string {
    const xml = this.serializer.serializeToString(this.doc);
    return `<?xml version="1.0" encoding="utf-8"?>\n${xml}`;
  }

  protected get root() {
    return this.doc.documentElement;
  }

  protected setRootNS() {
    this.root.setAttribute('xmlns:xsd', 'http://www.w3.org/2001/XMLSchema');
    this.root.setAttribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
  }

  protected createElement(name: string, value?: any, attrs?: Record<string, any>) {
    const el = this.doc.createElement(name);
    if (!isNil(value)) el.innerHTML = encodeHtml(String(value));
    if (attrs) {
      each(attrs, (v, k) => {
        if (!isNil(v)) el.setAttribute(k, String(v));
      });
    }
    return el;
  }

  protected appendElement(name: string, value?: any, attrs?: Record<string, any>) {
    this.root.append(this.createElement(name, value, attrs));
  }
}
