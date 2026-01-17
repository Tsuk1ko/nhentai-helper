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
      uncensored: {
        type: FilterTagType.OTHER,
        value: '632',
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
        uncensored: {
          type: FilterTagType.OTHER,
          value: '18',
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

const TAG_ATTR_NAME = 'data-tags';
const LANGUAGE_DATA_NAME = IS_NHENTAI_XXX ? 'languages' : 'tags';
const LANGUAGE_ATTR_NAME = `data-${LANGUAGE_DATA_NAME}`;
const HIDDEN_CLASS = 'nhentai-helper-hidden';

const handleMissingDataTags = ($gallery: JQElement) => {
  $gallery.each(function () {
    const title = $(this).find(selector.galleryCaption).text();
    const lang = langDetectRegMap.find(([, reg]) => reg.test(title))?.[0] || 'japanese';
    const tag = filterTagsMap[lang];
    if (tag) {
      const curTags = this.dataset[LANGUAGE_DATA_NAME];
      this.dataset[LANGUAGE_DATA_NAME] = `${curTags ? `${curTags} ` : ''}${tag.value}`;
    }
  });
};

const getNotTagSelector = (items: FilterTag[], attrName = TAG_ATTR_NAME) =>
  items.map(item => `:not([${attrName}~=${item.value}])`).join('');

/** 语言过滤 */
export const doFilterTags = (tags: FilterTag[], $node?: JQElement): void => {
  const getNode = $node
    ? (selector: string) => $node.find(selector)
    : (selector: string) => $(selector);

  getNode(selector.gallery).removeClass(HIDDEN_CLASS);
  handleMissingDataTags(
    getNode(`${selector.gallery}${getNotTagSelector(allLangTags, LANGUAGE_ATTR_NAME)}`),
  );

  const { [FilterTagType.LANGUAGE]: langTags, [FilterTagType.OTHER]: otherTags } = groupBy(
    tags,
    tag => tag.type,
  );

  if (langTags?.length) {
    getNode(`${selector.gallery}${getNotTagSelector(tags, LANGUAGE_ATTR_NAME)}`).addClass(
      HIDDEN_CLASS,
    );
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
