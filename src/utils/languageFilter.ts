import $ from 'jquery';
import { h, render } from 'vue';
import LanguageFilter from '@/components/LanguageFilter.vue';
import { selector } from '@/rules/selector';
import { IS_NHENTAI_XXX } from '@/const';

const detectRegMap = Object.entries({
  english: /\[english\]|translation\]/i,
  chinese: /\[chinese\]|中国翻訳|漢化\]/i,
});

const handleMissingDataTags = (tagMap: Record<string, string>, $gallery: JQuery<HTMLElement>) => {
  $gallery.each(function () {
    const title = $(this).find(selector.galleryCaption).text();
    const lang = detectRegMap.find(([, reg]) => reg.test(title))?.[0] || 'japanese';
    const tag = tagMap[lang];
    if (tag) {
      const curTags = this.dataset.tags;
      this.dataset.tags = `${curTags ? `${curTags} ` : ''}${tag}`;
    }
  });
};

/** 语言过滤 */
export const filterLanguage = (
  tagMap: Record<string, string>,
  tags: string[],
  $node?: JQuery<HTMLElement>,
): void => {
  const attrName = IS_NHENTAI_XXX ? 'data-languages' : 'data-tags';
  const getNode = $node
    ? (selector: string) => $node.find(selector)
    : (selector: string) => $(selector);
  const getNotSelector = (tags: string[]) =>
    tags.map(tag => `:not([${attrName}~=${tag}])`).join('');

  getNode(selector.gallery).removeClass('nhentai-helper-hidden');
  handleMissingDataTags(
    tagMap,
    getNode(`${selector.gallery}${getNotSelector(Object.values(tagMap))}`),
  );
  if (tags.length) {
    getNode(`${selector.gallery}${getNotSelector(tags)}`).addClass('nhentai-helper-hidden');
  }
};

export const mountLanguageFilter = (): {
  filterLanguage?: ($node?: Parameters<typeof filterLanguage>['1']) => void;
} => {
  const menuLeft = document.querySelector(selector.menuLeft);
  if (!menuLeft) return {};
  const vnode = h(LanguageFilter);
  render(vnode, menuLeft);
  return vnode.component?.exposed ?? {};
};
