import $ from 'jquery';
import { h, render } from 'vue';
import LanguageFilter from '@/components/LanguageFilter.vue';
import { IS_NHENTAI_TO, IS_NHENTAI_XXX } from '@/const';
import { selector } from '@/rules/selector';

export type JQElement = JQuery<HTMLElement>;

export const filterOptions: Array<[string, string]> = IS_NHENTAI_TO
  ? [
      ['japanese', '2'],
      ['english', '19'],
      ['chinese', '10197'],
    ]
  : IS_NHENTAI_XXX
    ? [
        ['japanese', '2'],
        ['english', '1'],
        ['chinese', '3'],
      ]
    : [
        ['japanese', '6346'],
        ['english', '12227'],
        ['chinese', '29963'],
      ];

const filterOptionsMap: Record<string, string> = Object.fromEntries(filterOptions);
const allLangTags = Object.values(filterOptionsMap);

const detectRegMap = Object.entries({
  english: /\[english\]|translation\]/i,
  chinese: /\[chinese\]|中国翻訳|漢化\]/i,
});

const handleMissingDataTags = ($gallery: JQElement) => {
  $gallery.each(function () {
    const title = $(this).find(selector.galleryCaption).text();
    const lang = detectRegMap.find(([, reg]) => reg.test(title))?.[0] || 'japanese';
    const tag = filterOptionsMap[lang];
    if (tag) {
      const curTags = this.dataset.tags;
      this.dataset.tags = `${curTags ? `${curTags} ` : ''}${tag}`;
    }
  });
};

/** 语言过滤 */
export const filterLanguage = (tags: string[], $node?: JQElement): void => {
  const attrName = IS_NHENTAI_XXX ? 'data-languages' : 'data-tags';
  const getNode = $node
    ? (selector: string) => $node.find(selector)
    : (selector: string) => $(selector);
  const getNotSelector = (tags: string[]) =>
    tags.map(tag => `:not([${attrName}~=${tag}])`).join('');

  getNode(selector.gallery).removeClass('nhentai-helper-hidden');
  handleMissingDataTags(getNode(`${selector.gallery}${getNotSelector(allLangTags)}`));
  if (tags.length) {
    getNode(`${selector.gallery}${getNotSelector(tags)}`).addClass('nhentai-helper-hidden');
  }
};

export const mountLanguageFilter = (): {
  filterLanguage?: ($node?: JQElement) => void;
} => {
  const menuLeft = document.querySelector(selector.menuLeft);
  if (!menuLeft) return {};
  const vnode = h(LanguageFilter);
  render(vnode, menuLeft);
  return vnode.component?.exposed ?? {};
};
