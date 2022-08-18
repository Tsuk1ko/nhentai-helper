import $ from 'jquery';
import { IS_NHENTAI_TO } from '@/const';

export const createLangFilter = (): HTMLSelectElement => {
  const langFilter = (
    <select
      id="lang-filter"
      onchange={() => {
        filterLang(langFilter.value);
        sessionStorage.setItem('lang-filter', langFilter.value);
      }}
    >
      {IS_NHENTAI_TO ? (
        <>
          <option value="0">None</option>
          <option value="10197">Chinese</option>
          <option value="2">Japanese</option>
          <option value="19">English</option>
        </>
      ) : (
        <>
          <option value="0">None</option>
          <option value="29963">Chinese</option>
          <option value="6346">Japanese</option>
          <option value="12227">English</option>
        </>
      )}
    </select>
  ) as HTMLSelectElement;
  $('ul.menu.left').append(
    <li style={{ padding: '0 10px', userSelect: 'none' }}>Filter: {langFilter}</li>,
  );
  return langFilter;
};

/** 语言过滤 */
export const filterLang = (lang: string, $node?: JQuery<HTMLElement>): void => {
  const getNode = $node
    ? (selector: string) => $node.find(selector)
    : (selector: string) => $(selector);
  if (lang === '0') getNode('.gallery').removeClass('hidden');
  else {
    getNode(`.gallery[data-tags~=${lang}]`).removeClass('hidden');
    getNode(`.gallery:not([data-tags~=${lang}])`).addClass('hidden');
  }
};
