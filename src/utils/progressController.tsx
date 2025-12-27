import { i18n } from '@/i18n';
import { className } from '@/rules/className';
import type { MangaDownloadInfo } from '@/typings';
import { getDownloadExt } from './common';

const { t } = i18n.global;

export class ProgressDisplayController {
  readonly downloadBtn: HTMLElement;
  private readonly btnTxt: HTMLElement;
  private info?: MangaDownloadInfo;

  constructor(
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

  bindInfo(info: MangaDownloadInfo): void {
    this.info = info;
  }

  unbindInfo(): void {
    this.info = undefined;
  }

  lockBtn(text?: string): void {
    this.downloadBtn.setAttribute('disabled', 'disabled');
    if (text) this.btnTxt.textContent = text;
  }

  releaseBtn(): void {
    this.downloadBtn.removeAttribute('disabled');
  }

  complete(): void {
    this.setDocTitle('✓');
    this.btnTxt.textContent = this.defaultBtnText('✓');
    this.releaseBtn();
  }

  reset(): void {
    this.setDocTitle();
    this.btnTxt.textContent = this.defaultBtnText();
    this.releaseBtn();
  }

  error(): void {
    this.releaseBtn();
    this.btnTxt.textContent = 'Error';
    this.setDocTitle('×');
  }

  updateProgress(): void {
    if (!this.info) return;
    const { done, compressing, compressingPercent } = this.info;
    if (compressing) {
      this.setDocTitle(`${compressingPercent}%`);
      this.btnTxt.textContent = `${this.compressingHeadText}${compressingPercent}%`;
    } else {
      const total = this.info.gallery.pages.length;
      this.setDocTitle(`${done}/${total}`);
      this.btnTxt.textContent = `${this.downloadingHeadText}${done}/${total}`;
    }
  }

  private defaultBtnText(suffix?: string): string {
    if (!this.enableHeadTxt) return suffix ?? '';
    return `${t('button.download')} ${getDownloadExt()}${suffix ? ` ${suffix}` : ''}`;
  }

  private setDocTitle(prefix?: string | number): void {
    if (!this.docTitle) return;
    document.title = prefix ? `[${prefix}] ${this.docTitle}` : this.docTitle;
  }
}
