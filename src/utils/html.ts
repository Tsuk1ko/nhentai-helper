import $ from 'jquery';

export const loadHTML = (html: string) => {
  const parser = new DOMParser();
  return $(parser.parseFromString(html, 'text/html').body);
};
