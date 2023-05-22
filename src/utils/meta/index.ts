import type { NHentaiGalleryInfo } from '../nhentai';
import { settings } from '../settings';
import { ComicInfoXmlBuilder } from './ComicInfo';
import { EzeInfoJsonBuilder } from './EzeInfoJson';
import type { MetaBuilder } from './MetaBuilder';

interface MetaFile {
  name: string;
  data: string;
}

const metaBuilderMap: Record<string, (new (info: NHentaiGalleryInfo) => MetaBuilder) | undefined> =
  {
    ComicInfo: ComicInfoXmlBuilder,
    EzeInfoJson: EzeInfoJsonBuilder,
  };

export const generateMetaFiles = (info: NHentaiGalleryInfo): MetaFile[] => {
  if (!settings.includeMetaFile.length) return [];
  const files: MetaFile[] = [];
  for (const name of settings.includeMetaFile) {
    const Builder = metaBuilderMap[name];
    if (Builder) {
      files.push({
        name,
        data: new Builder(info).build(),
      });
    }
  }
  return files;
};
