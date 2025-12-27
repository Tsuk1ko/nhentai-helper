export class StyleInjector {
  private readonly styleNode: HTMLElement;

  constructor(style: string) {
    this.styleNode = <style>{style}</style>;
  }

  inject(): void {
    document.head.append(this.styleNode);
  }

  remove(): void {
    this.styleNode.remove();
  }
}
