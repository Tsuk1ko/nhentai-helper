import { groupBy } from 'es-toolkit';
import $ from 'jquery';
import { h, render } from 'vue';
import TagsFilter from '@/components/TagsFilter.vue';
import { IS_NHENTAI_TO, IS_NHENTAI_XXX } from '@/const';
import { selector } from '@/rules/selector';

export type JQElement = JQuery<HTMLElement>;

export enum FilterTagType {
  LANGUAGE = 'language',
  OTHER = 'other',
}

export interface FilterTag {
  type: FilterTagType;
  value: string;
}

export const filterTagsMap: Record<string, FilterTag> = IS_NHENTAI_TO
  ? {
      japanese: {
        type: FilterTagType.LANGUAGE,
        value: '2',
      },
      english: {
        type: FilterTagType.LANGUAGE,
        value: '19',
      },
      chinese: {
        type: FilterTagType.LANGUAGE,
        value: '10197',
      },
    }
  : IS_NHENTAI_XXX
    ? {
        japanese: {
          type: FilterTagType.LANGUAGE,
          value: '2',
        },
        english: {
          type: FilterTagType.LANGUAGE,
          value: '1',
        },
        chinese: {
          type: FilterTagType.LANGUAGE,
          value: '3',
        },
      }
    : {
        japanese: {
          type: FilterTagType.LANGUAGE,
          value: '6346',
        },
        english: {
          type: FilterTagType.LANGUAGE,
          value: '12227',
        },
        chinese: {
          type: FilterTagType.LANGUAGE,
          value: '29963',
        },
        uncensored: {
          type: FilterTagType.OTHER,
          value: '8693',
        },
      };

export const filterTagsKeysGrouped = groupBy(
  Object.keys(filterTagsMap),
  key => filterTagsMap[key]!.type,
);

const allLangTags = Object.values(filterTagsMap).filter(
  item => item.type === FilterTagType.LANGUAGE,
);

const langDetectRegMap = Object.entries({
  english: /\[english\]|translation\]/i,
  chinese: /\[chinese\]|中国翻訳|漢化\]/i,
});

const handleMissingDataTags = ($gallery: JQElement) => {
  $gallery.each(function () {
    const title = $(this).find(selector.galleryCaption).text();
    const lang = langDetectRegMap.find(([, reg]) => reg.test(title))?.[0] || 'japanese';
    const tag = filterTagsMap[lang];
    if (tag) {
      const curTags = this.dataset.tags;
      this.dataset.tags = `${curTags ? `${curTags} ` : ''}${tag.value}`;
    }
  });
};

const TAG_ATTR_NAME = IS_NHENTAI_XXX ? 'data-languages' : 'data-tags';
const HIDDEN_CLASS = 'nhentai-helper-hidden';

const getNotTagSelector = (items: FilterTag[]) =>
  items.map(item => `:not([${TAG_ATTR_NAME}~=${item.value}])`).join('');

/** 语言过滤 */
export const doFilterTags = (tags: FilterTag[], $node?: JQElement): void => {
  const getNode = $node
    ? (selector: string) => $node.find(selector)
    : (selector: string) => $(selector);

  getNode(selector.gallery).removeClass(HIDDEN_CLASS);
  handleMissingDataTags(getNode(`${selector.gallery}${getNotTagSelector(allLangTags)}`));

  const { [FilterTagType.LANGUAGE]: langTags, [FilterTagType.OTHER]: otherTags } = groupBy(
    tags,
    tag => tag.type,
  );

  if (langTags?.length) {
    getNode(`${selector.gallery}${getNotTagSelector(tags)}`).addClass(HIDDEN_CLASS);
  }

  otherTags?.forEach(tag => {
    getNode(`${selector.gallery}:not(.${HIDDEN_CLASS})${getNotTagSelector([tag])}`).addClass(
      HIDDEN_CLASS,
    );
  });
};

export const mountTagsFilter = (): {
  doFilterTags?: ($node?: JQElement) => void;
} => {
  const menuLeft = document.querySelector(selector.menuLeft);
  if (!menuLeft) return {};
  const vnode = h(TagsFilter);
  render(vnode, menuLeft);
  return vnode.component?.exposed ?? {};
};
