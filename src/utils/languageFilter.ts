import $ from 'jquery';
import { h, render } from 'vue';
import LanguageFilter from '@/components/LanguageFilter.vue';
import { selector } from '@/rules/selector';
import { IS_NHENTAI_XXX } from '@/const';

/** 语言过滤 */
export const filterLanguage = (tags: string[], $node?: JQuery<HTMLElement>): void => {
  const attrName = IS_NHENTAI_XXX ? 'data-languages' : 'data-tags';
  const getNode = $node
    ? (selector: string) => $node.find(selector)
    : (selector: string) => $(selector);

  getNode(selector.gallery).removeClass('nhentai-helper-hidden');
  if (tags.length) {
    const notSelector = tags.map(tag => `:not([${attrName}~=${tag}])`).join('');
    getNode(`${selector.gallery}${notSelector}`).addClass('nhentai-helper-hidden');
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
