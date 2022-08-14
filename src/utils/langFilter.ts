import $ from 'jquery';

export const createLangFilter = (): JQuery<HTMLSelectElement> => {
  const $langFilter = $<HTMLSelectElement>(
    '<select id="lang-filter"><option value="0">None</option><option value="29963">Chinese</option><option value="6346">Japanese</option><option value="12227">English</option></select>',
  );
  $('ul.menu.left').append(
    $('<li style="padding:0 10px;user-select:none">Filter: </li>').append($langFilter),
  );
  $langFilter.on('change', function () {
    langFilter(this.value);
    sessionStorage.setItem('lang-filter', this.value);
  });
  return $langFilter;
};

/** 语言过滤 */
export const langFilter = (lang: string, $node?: JQuery<HTMLElement>): void => {
  const getNode = $node
    ? (selector: string) => $node.find(selector)
    : (selector: string) => $(selector);
  if (lang === '0') getNode('.gallery').removeClass('hidden');
  else {
    getNode(`.gallery[data-tags~=${lang}]`).removeClass('hidden');
    getNode(`.gallery:not([data-tags~=${lang}])`).addClass('hidden');
  }
};
