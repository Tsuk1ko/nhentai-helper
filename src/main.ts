import './utils/hacks';
import './index.less';
import { GM_addStyle, GM_getResourceText, GM_registerMenuCommand } from '$';
import { Component, createApp } from 'vue';
import once from 'just-once';
import DownloadPanelVue from './app/DownloadPanel.vue';
import SettingsDialog from './app/SettingsDialog.vue';
import { initPage } from './utils/initPage';

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

GM_registerMenuCommand('Settings', () => {
  const dialog = initSettingsDialogApp();
  dialog.open();
});
