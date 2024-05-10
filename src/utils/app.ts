import type { App, Component } from 'vue';
import { createApp } from 'vue';

export const createAppAndMount = <T extends Component & (abstract new (...args: any) => any)>(
  component: T,
  appInitFunc?: (app: App<Element>) => void,
): InstanceType<T> => {
  const el = document.createElement('div');
  document.body.append(el);
  const app = createApp(component);
  appInitFunc?.(app);
  return app.mount(el) as any;
};
