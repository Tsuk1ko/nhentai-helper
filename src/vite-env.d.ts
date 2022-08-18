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

type JSXIE<T> = Partial<
  Omit<T, 'html' | 'class' | 'style'> & {
    html: string;
    class: string;
    style: Partial<CSSStyleDeclaration>;
  }
>;

/* eslint-disable @typescript-eslint/consistent-type-definitions */
declare namespace JSX {
  type Element = HTMLElement;
  type ElementClass = {};
  type ElementAttributesProperty = {};
  type IntrinsicElements = {
    style: JSXIE<HTMLStyleElement>;
    [name: string]: JSXIE<HTMLElement>;
  };
  type IntrinsicAttributes = {};
}
/* eslint-enable @typescript-eslint/consistent-type-definitions */
