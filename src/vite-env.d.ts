/// <reference types="vite/client" />
/// <reference types="element-plus/global" />

type GlobalThis = typeof globalThis;

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '*?minraw' {
  const code: string;
  export default code;
}

declare module '$' {
  import { MonkeyWindow } from 'vite-plugin-monkey/dist/client';
  export * from 'vite-plugin-monkey/dist/client';
  export const monkeyWindow: MonkeyWindow & GlobalThis;
}

declare interface Window extends GlobalThis {
  jQuery: typeof import('jquery');
  /** on nhentai.to or nhentai.website */
  gallery?: import('./utils/nhentai').NHentaiGallery;
  /** on nhentai.net */
  _gallery?: import('./utils/nhentai').NHentaiGallery;
  /** on nhentai.net */
  _n_app?: {
    install_lazy_loader: Function;
    install_blacklisting: Function;
  };
}

declare interface Console {
  _log?: typeof console.log;
  _clear?: typeof console.clear;
}

type ValueOf<T> = T[keyof T];
type CastArray<T> = T | T[];

type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

type JSXIE<T> = Partial<
  Omit<NonFunctionProperties<T>, 'html' | 'class' | 'style'> & {
    html: string;
    class: string;
    style: Partial<CSSStyleDeclaration> | string;
    [name: string]: any;
  }
>;

/* eslint-disable @typescript-eslint/consistent-type-definitions */
declare namespace JSX {
  type Element = HTMLElement;
  // type ElementClass = {};
  // type ElementAttributesProperty = {};
  type IntrinsicElements = {
    div: JSXIE<HTMLDivElement>;
    span: JSXIE<HTMLSpanElement>;
    ul: JSXIE<HTMLUListElement>;
    li: JSXIE<HTMLLIElement>;
    input: JSXIE<HTMLInputElement>;
    select: JSXIE<HTMLSelectElement>;
    option: JSXIE<HTMLOptionElement>;
    button: JSXIE<HTMLButtonElement>;
    style: JSXIE<HTMLStyleElement>;
    [name: string]: JSXIE<HTMLElement>;
  };
  // type IntrinsicAttributes = {};
}
/* eslint-enable @typescript-eslint/consistent-type-definitions */
