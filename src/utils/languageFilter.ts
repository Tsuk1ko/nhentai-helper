import $ from 'jquery';
import { h, render } from 'vue';
import LanguageFilter from '@/components/LanguageFilter.vue';

/** 语言过滤 */
export const filterLanguage = (tags: string[], $node?: JQuery<HTMLElement>): void => {
  const getNode = $node
    ? (selector: string) => $node.find(selector)
    : (selector: string) => $(selector);

  getNode('.gallery').removeClass('hidden');
  if (tags.length) {
    const notSelector = tags.map(tag => `:not([data-tags~=${tag}])`).join('');
    getNode(`.gallery${notSelector}`).addClass('hidden');
  }
};

export const mountLanguageFilter = (): {
  filterLanguage?: ($node?: Parameters<typeof filterLanguage>['1']) => void;
} => {
  const menuLeft = document.querySelector('ul.menu.left');
  if (!menuLeft) return {};
  const vnode = h(LanguageFilter);
  render(vnode, menuLeft);
  return vnode.component?.exposed ?? {};
};
