import { Plugin } from 'vite';
import CleanCSS from 'clean-css';

const cssReg = /\.(css|less)$/;

const css = new CleanCSS();

export default function cleanCss(): Plugin {
  return {
    name: 'clean-css',
    transform(code, id) {
      if (!id.match(cssReg)) return;
      return css.minify(code).styles;
    },
  };
}
