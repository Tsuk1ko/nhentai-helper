import type { NHentaiGalleryInfo } from '../nhentai';
import { settings } from '../settings';
import { generateComicInfoXml } from './ComicInfo';

interface MetaFile {
  name: string;
  data: string;
}

export const generateMetaFiles = (info: NHentaiGalleryInfo): MetaFile[] => {
  if (!settings.includeMetaFile.length) return [];
  const files: MetaFile[] = [];
  for (const name of settings.includeMetaFile) {
    switch (name) {
      case 'ComicInfo.xml':
        files.push({
          name,
          data: generateComicInfoXml(info),
        });
        break;
    }
  }
  return files;
};
