/// <reference types="vite/client" />
/// <reference types="element-plus/global" />
/// <reference types="vue/jsx" />

type GlobalThis = typeof globalThis;

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '*?worker-dev' {
  const code: string;
  export default code;
}

declare module '$' {
  import type { MonkeyWindow } from 'vite-plugin-monkey/dist/client';
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
type ValueOfRecord<T> = T extends Record<any, infer P> ? P : never;
type CastArray<T> = T | T[];

declare namespace JSX {
  type Element = HTMLElement;
}

type Transferable = ArrayBuffer | ReadableStream | WritableStream | TransformStream | ImageBitmap;
