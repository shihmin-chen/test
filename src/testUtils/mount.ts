import { defineComponent, createApp, h } from 'vue';

type InstanceType<V> = V extends { new (...arg: any[]): infer X } ? X : never;
type VM<V> = InstanceType<V> & { unmount(): void };

export const mount = <V>(component: V) => {
  const element = document.createElement('div');
  const tempApp = createApp(component as any);

  const unmount = () => tempApp.unmount();
  const mountedComponent = tempApp.mount(element) as any as VM<V>;
  mountedComponent.unmount = unmount;
  return mountedComponent;
};

export const useSetup = <V>(setup: () => V) => {
  const component = defineComponent({ setup, render: () => h('div') });
  return mount(component);
};
