import { h } from 'nano-jsx/lib/core';
import { i18n } from '@/i18n';
import { className } from '@/rules/className';

const { t } = i18n.global;

export class IgnoreController {
  public ignoreBtn: HTMLElement;
  private readonly icon: HTMLElement;
  private readonly text?: HTMLElement;

  public constructor(
    text = true,
    private status = false,
  ) {
    this.icon = <i class={this.iconClass} />;
    if (text) this.text = <span>{this.btnText}</span>;
    this.ignoreBtn = (
      <button class={`${className.greyButton} nhentai-helper-btn ignore-btn`}>
        {this.icon} {this.text}
      </button>
    );
  }

  public setStatus(status: boolean): void {
    this.status = status;
    this.updateBtn();
  }

  public getStatus(): boolean {
    return this.status;
  }

  private get iconClass(): string {
    // status true 时表示被忽略
    return this.status ? 'fa fa-eye-slash' : 'fa fa-eye';
  }

  private get btnText(): string {
    return this.status ? t('button.unignore') : t('button.ignore');
  }

  private updateBtn(): void {
    this.icon.className = this.iconClass;
    if (this.text) this.text.innerText = this.btnText;
  }
}
