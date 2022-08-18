// Modify from https://github.com/kartiknair/dhow/blob/master/src/jsx-runtime.js
// MIT License - Copyright (c) Kartik Nair
import { camelCase, kebabCase } from 'lodash-es';

export const createElement = (
  tag: string | Function,
  props?: Record<string, any>,
  ...children: Array<CastArray<HTMLElement | string>>
): HTMLElement => {
  if (typeof tag === 'function') return tag(props, ...children);
  const element = document.createElement(tag);

  Object.entries(props ?? {}).forEach(([name, value]) => {
    if (name === 'html') element.innerHTML = value;
    else if (name === 'class') element.classList.add(...String(value).split(' '));
    else if (name === 'style' && typeof value === 'object') {
      const styleString = Object.entries(value)
        .map(([k, v]) => `${camelCase(k)}:${String(v)}`)
        .join(';');

      element.setAttribute('style', styleString);
    } else if (name.startsWith('on')) {
      element.addEventListener(kebabCase(name.replace('on', '')), value);
    } else element.setAttribute(name, String(value));
  });

  children.flat().forEach(child => {
    appendChild(element, child);
  });

  return element;
};

const appendChild = (parent: HTMLElement, child: HTMLElement | string): void => {
  parent.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
};

export const Fragment = (
  props: any,
  ...children: Array<HTMLElement | string>
): Array<HTMLElement | string> => {
  return children;
};
