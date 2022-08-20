import './utils/hacks';
import './index.less';
import { GM_addStyle, GM_getResourceText, GM_registerMenuCommand } from '$';
import { Component, createApp } from 'vue';
import once from 'just-once';
import DownloadPanelVue from './app/DownloadPanel.vue';
import SettingsDialog from './app/SettingsDialog.vue';
import { initPage } from './utils/initPage';
import { IS_SETTINGS_DIALOG_DEV } from './const';

GM_addStyle(GM_getResourceText('notycss'));

const createAppAndMount = <T extends Component & (abstract new (...args: any) => any)>(
  app: T,
): InstanceType<T> => {
  const el = document.createElement('div');
  document.body.append(el);
  return createApp(app).mount(el) as any;
};

createAppAndMount(DownloadPanelVue);

initPage();

const initSettingsDialogApp = once(() => createAppAndMount(SettingsDialog));

const openSettingsDialog = (): void => {
  const dialog = initSettingsDialogApp();
  dialog.open();
};

GM_registerMenuCommand('Settings', openSettingsDialog);

if (IS_SETTINGS_DIALOG_DEV) {
  document.body.outerHTML = '<body></body>';
  openSettingsDialog();
}
