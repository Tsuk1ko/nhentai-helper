import type { Options } from 'noty';
import Noty from 'noty';
import { settings } from './settings';
import { i18n } from '@/i18n';
import type { ErrorAction } from '@/typings';

const { t } = i18n.global;

const notyConfirmOption: Options = {
  type: 'error',
  layout: 'bottomRight',
  theme: 'nest',
  timeout: false,
  closeWith: [],
};

export const downloadAgainConfirm = async (title: string, hasQueue = false): Promise<boolean> => {
  if (hasQueue && settings.autoCancelDownloadedManga) {
    downloadedTip(title);
    return false;
  }
  return new Promise(resolve => {
    const n = new Noty({
      ...notyConfirmOption,
      text: t('dialog.downloadAgainConfirm', { title, hasQueue }),
      buttons: [
        Noty.button(t('dialog.yes'), 'btn btn-noty-blue btn-noty', () => {
          n.close();
          resolve(true);
        }),
        Noty.button(t('dialog.no'), 'btn btn-noty-green btn-noty', () => {
          n.close();
          resolve(false);
        }),
      ],
    });
    n.show();
  });
};

export const errorRetryConfirm = (action: ErrorAction, noCb?: Function, yesCb?: Function): void => {
  if (settings.autoRetryWhenErrorOccurs) {
    errorRetryTip(action);
    yesCb?.();
    return;
  }
  const n = new Noty({
    ...notyConfirmOption,
    text: t('dialog.errorRetryConfirm', { action }),
    buttons: [
      Noty.button(t('dialog.no'), 'btn btn-noty-blue btn-noty', () => {
        n.close();
        noCb?.();
      }),
      Noty.button(t('dialog.yes'), 'btn btn-noty-green btn-noty', () => {
        n.close();
        yesCb?.();
      }),
    ],
  });
  n.show();
};

export const downloadedTip = (title: string): void => {
  new Noty({
    type: 'info',
    layout: 'bottomRight',
    theme: 'nest',
    closeWith: [],
    timeout: 4000,
    text: t('dialog.downloadedTip', { title }),
  }).show();
};

export const errorRetryTip = (action: ErrorAction): void => {
  new Noty({
    type: 'warning',
    layout: 'bottomRight',
    theme: 'nest',
    closeWith: [],
    timeout: 3000,
    text: t('dialog.errorRetryTip', { action }),
  }).show();
};

export const openAlert = (i18nKey: string) => {
  const n = new Noty({
    layout: 'center',
    theme: 'nest',
    modal: true,
    closeWith: [],
    text: t(i18nKey),
    buttons: [
      Noty.button('OK', 'btn btn-noty-blue btn-noty', () => {
        n.close();
      }),
    ],
  });
  n.show();
};
