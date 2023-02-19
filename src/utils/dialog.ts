import type { Options } from 'noty';
import Noty from 'noty';
import { settings } from './settings';

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
      text: `"${title}" is already downloaded${
        hasQueue ? ' or in queue' : ''
      }.<br>Do you want to download again?`,
      buttons: [
        Noty.button('YES', 'btn btn-noty-blue btn-noty', () => {
          n.close();
          resolve(true);
        }),
        Noty.button('NO', 'btn btn-noty-green btn-noty', () => {
          n.close();
          resolve(false);
        }),
      ],
    });
    n.show();
  });
};

export const errorRetryConfirm = (action: string, noCb?: Function, yesCb?: Function): void => {
  if (settings.autoRetryWhenErrorOccurs) {
    errorRetryTip(action);
    yesCb?.();
    return;
  }
  const n = new Noty({
    ...notyConfirmOption,
    text: `Error occurred while ${action}, retry?`,
    buttons: [
      Noty.button('NO', 'btn btn-noty-blue btn-noty', () => {
        n.close();
        noCb?.();
      }),
      Noty.button('YES', 'btn btn-noty-green btn-noty', () => {
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
    text: `"${title}" is already downloaded or in queue.`,
  }).show();
};

export const errorRetryTip = (action: string): void => {
  new Noty({
    type: 'warning',
    layout: 'bottomRight',
    theme: 'nest',
    closeWith: [],
    timeout: 3000,
    text: `Error occurred while ${action}, retrying...`,
  }).show();
};
