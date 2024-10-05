import { h } from 'nano-jsx/lib/core';
import { getDownloadExt } from './common';
import type { MangaDownloadInfo } from '@/typings';
import { i18n } from '@/i18n';
import { className } from '@/rules/className';

const { t } = i18n.global;

export class ProgressDisplayController {
  public readonly downloadBtn: HTMLElement;
  private readonly btnTxt: HTMLElement;
  private info?: MangaDownloadInfo;

  public constructor(
    private readonly enableHeadTxt: boolean = false,
    private readonly docTitle?: string,
  ) {
    this.btnTxt = <span class="download-zip-txt">{this.defaultBtnText()}</span>;
    this.downloadBtn = (
      <button class={`${className.greyButton} nhentai-helper-btn download-zip-btn`}>
        <i class="fa fa-download"></i> {this.btnTxt}
      </button>
    );
  }

  private get compressingHeadText(): string {
    return this.enableHeadTxt ? `${t('button.compressing')} ${getDownloadExt()} ` : '';
  }

  private get downloadingHeadText(): string {
    return this.enableHeadTxt ? `${t('button.downloading')} ${getDownloadExt()} ` : '';
  }

  private defaultBtnText(suffix?: string): string {
    if (!this.enableHeadTxt) return suffix ?? '';
    return `${t('button.download')} ${getDownloadExt()}${suffix ? ` ${suffix}` : ''}`;
  }

  public bindInfo(info: MangaDownloadInfo): void {
    this.info = info;
  }

  public unbindInfo(): void {
    this.info = undefined;
  }

  public lockBtn(text?: string): void {
    this.downloadBtn.setAttribute('disabled', 'disabled');
    if (text) this.btnTxt.innerText = text;
  }

  public releaseBtn(): void {
    this.downloadBtn.removeAttribute('disabled');
  }

  public complete(): void {
    this.setDocTitle('✓');
    this.btnTxt.innerText = this.defaultBtnText('✓');
    this.releaseBtn();
  }

  public reset(): void {
    this.setDocTitle();
    this.btnTxt.innerText = this.defaultBtnText();
    this.releaseBtn();
  }

  public error(): void {
    this.releaseBtn();
    this.btnTxt.innerText = 'Error';
    this.setDocTitle('×');
  }

  public updateProgress(): void {
    if (!this.info) return;
    const { done, compressing, compressingPercent } = this.info;
    if (compressing) {
      this.setDocTitle(`${compressingPercent}%`);
      this.btnTxt.innerText = `${this.compressingHeadText}${compressingPercent}%`;
    } else {
      const total = this.info.gallery.pages.length;
      this.setDocTitle(`${done}/${total}`);
      this.btnTxt.innerText = `${this.downloadingHeadText}${done}/${total}`;
    }
  }

  private setDocTitle(prefix?: string | number): void {
    if (!this.docTitle) return;
    document.title = prefix ? `[${prefix}] ${this.docTitle}` : this.docTitle;
  }
}
