import $ from 'jquery';

export class StyleInjector {
  public constructor(private readonly id: string, private readonly style: string) {}

  public inject(): void {
    $(document.head).append(`<style id="${this.id}">${this.style}</style>`);
  }

  public remove(): void {
    $(`#${this.id}`).remove();
  }
}
