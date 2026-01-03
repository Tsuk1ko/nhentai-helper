import './utils/hacks';
import './index.less';
import 'noty/lib/noty.css';
import 'element-plus/dist/index.css';
import { GM_registerMenuCommand } from '$';
import { once } from 'es-toolkit';
import DownloadPanel from './app/DownloadPanel.vue';
import SettingsDialog from './app/SettingsDialog.vue';
import { IS_SETTINGS_DIALOG_DEV } from './const';
import { i18n } from './i18n';
import { createAppAndMount } from './utils/app';
import { initPage } from './utils/initPage';

const initSettingsDialogApp = once(() =>
  createAppAndMount(SettingsDialog, app => {
    app.use(i18n);
  }),
);

const openSettingsDialog = (): void => {
  const dialog = initSettingsDialogApp();
  dialog.open();
};

createAppAndMount(DownloadPanel);
initPage();

GM_registerMenuCommand(i18n.global.t('common.settings'), openSettingsDialog);

if (IS_SETTINGS_DIALOG_DEV) {
  document.body.outerHTML = '<body></body>';
  openSettingsDialog();
}
