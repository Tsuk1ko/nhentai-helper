import type { NHentaiGalleryInfo } from '../nhentai';
import { settings } from '../settings';
import { ComicInfoXmlBuilder } from './ComicInfo';
import { EzeInfoJsonBuilder } from './EzeInfoJson';
import type { MetaBuilder } from './MetaBuilder';

interface MetaFile {
  name: string;
  data: string;
}

const metaBuilderMap: Record<string, { name: string; Builder: typeof MetaBuilder }> = {
  ComicInfoXml: { name: 'ComicInfo.xml', Builder: ComicInfoXmlBuilder },
  EzeInfoJson: { name: 'info.json', Builder: EzeInfoJsonBuilder },
};

export const generateMetaFiles = (info: NHentaiGalleryInfo): MetaFile[] => {
  if (!settings.addMetaFile.length) return [];
  const files: MetaFile[] = [];
  for (const key of settings.addMetaFile) {
    if (key in metaBuilderMap) {
      const { name, Builder } = metaBuilderMap[key];
      files.push({
        name,
        data: new Builder(info).build(),
      });
    }
  }
  return files;
};
