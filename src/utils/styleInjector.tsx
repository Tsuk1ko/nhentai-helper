import { h } from 'nano-jsx/lib/core';

export class StyleInjector {
  private readonly styleNode: HTMLElement;

  public constructor(style: string) {
    this.styleNode = <style>{style}</style>;
  }

  public inject(): void {
    document.head.append(this.styleNode);
  }

  public remove(): void {
    this.styleNode.remove();
  }
}
