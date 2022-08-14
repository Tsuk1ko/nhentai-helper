import $ from 'jquery';
import { getDownloadExt } from './common';
import { MangaDownloadInfo } from '@/typings';

export class ProgressDisplayController {
  public readonly $btn: JQuery<HTMLElement>;
  private readonly $btnTxt: JQuery<HTMLElement>;
  private info?: MangaDownloadInfo;

  public constructor(
    private readonly enableHeadTxt: boolean = false,
    private readonly docTitle?: string,
  ) {
    this.$btnTxt = $(`<span class="download-zip-txt">${this.defaultBtnText()}</span>`);
    this.$btn = $(
      '<button class="btn btn-secondary download-zip"><i class="fa fa-download"></i> </button>',
    ).append(this.$btnTxt);
  }

  private get compressingHeadText(): string {
    return this.enableHeadTxt ? `Compressing ${getDownloadExt()} ` : '';
  }

  private get downloadingHeadText(): string {
    return this.enableHeadTxt ? `Downloading ${getDownloadExt()} ` : '';
  }

  private defaultBtnText(suffix?: string): string {
    if (!this.enableHeadTxt) return suffix ?? '';
    return `Download ${getDownloadExt()}${suffix ? ` ${suffix}` : ''}`;
  }

  public bindInfo(info: MangaDownloadInfo): void {
    this.info = info;
  }

  public unbindInfo(): void {
    this.info = undefined;
  }

  public lockBtn(text?: string): void {
    this.$btn.attr('disabled', 'disabled');
    if (text) this.$btnTxt.text(text);
  }

  public releaseBtn(): void {
    this.$btn.removeAttr('disabled');
  }

  public complete(): void {
    this.setDocTitle('✓');
    this.$btnTxt.text(this.defaultBtnText('✓'));
    this.releaseBtn();
  }

  public reset(): void {
    this.setDocTitle();
    this.$btnTxt.text(this.defaultBtnText());
    this.releaseBtn();
  }

  public error(): void {
    this.releaseBtn();
    this.$btnTxt.text('Error');
    this.setDocTitle('×');
  }

  public updateProgress(): void {
    if (!this.info) return;
    const { done, compressing, compressingPercent } = this.info;
    if (compressing) {
      this.setDocTitle(`${compressingPercent}%`);
      this.$btnTxt.text(`${this.compressingHeadText}${compressingPercent}%`);
    } else {
      const total = this.info.gallery.pages.length;
      this.setDocTitle(`${done}/${total}`);
      this.$btnTxt.text(`${this.downloadingHeadText}${done}/${total}`);
    }
  }

  private setDocTitle(prefix?: string | number): void {
    if (!this.docTitle) return;
    document.title = prefix ? `[${prefix}] ${this.docTitle}` : this.docTitle;
  }
}
