import { createInjectionState } from '@vueuse/core';
import { XToastProps } from '../../type';
import { shallowReactive } from 'vue';

interface ToastState {
  // Note: don't use InstanceType<typeof XToast>['$props']; this will return "any" type.
  toastProps: XToastProps;
}
export type ToastArgs = Omit<XToastProps, 'visible'>;

export const useToast = (resetAutoHide: () => void) => {
  // state
  const state = shallowReactive<ToastState>({
    toastProps: {
      visible: false,
    },
  });

  // mutation
  const show = (toastArgs: ToastArgs) => {
    resetAutoHide();
    state.toastProps = {
      ...toastArgs,
      visible: true,
    };
  };
  const hide = () => {
    state.toastProps = {
      visible: false,
    };
  };

  return {
    state,
    show,
    hide,
  };
};

const [useProvideGlobalToastState, _useInjectGlobalToastState] = createInjectionState(useToast);

const useInjectGlobalToastState = () => {
  const state = _useInjectGlobalToastState();
  if (state === undefined) {
    throw new Error('Toast is not provided');
  }
  return state;
};

export { useProvideGlobalToastState, useInjectGlobalToastState };
