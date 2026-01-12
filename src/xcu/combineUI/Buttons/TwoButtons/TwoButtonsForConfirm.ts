import { computed, h, unref } from 'vue';

import TwoButtons from '../../../atomUI/TwoButtons.vue';
import { ButtonProps, MaybeRefOrComputed } from '../../../type';

export interface TwoButtonsForConfirmProps {
  leftButtonText?: MaybeRefOrComputed<string>;
  rightButtonText?: MaybeRefOrComputed<string>;
  leftButtonProps?: MaybeRefOrComputed<ButtonProps>;
  rightButtonProps?: MaybeRefOrComputed<ButtonProps>;
  onLeftButtonClickCallback?: () => void;
  onRightButtonClickCallback?: () => void;
}

export const useTwoButtonsForConfirm = (props: TwoButtonsForConfirmProps) => {
  const defaultLeftProps: ButtonProps = {
    theme: 'tertiary',
    size: 'lg',
    outline: true,
    class: 'x-two-button-confirm-dialog-btn',
  };

  const defaultRightProps: ButtonProps = {
    theme: 'primary',
    size: 'lg',
    class: 'x-two-button-confirm-dialog-btn',
  };

  const leftButtonProps = computed<ButtonProps>(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return {
      ...defaultLeftProps,
      ...unref(props?.leftButtonProps),
    };
  });

  const rightButtonProps = computed<ButtonProps>(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return {
      ...defaultRightProps,
      ...unref(props?.rightButtonProps),
    };
  });

  const leftButtonText = computed<string>(() => {
    return unref(props?.leftButtonText) ?? '取消';
  });

  const rightButtonText = computed<string>(() => {
    return unref(props?.rightButtonText) ?? '確定';
  });

  // h function
  const TemplateRender = () => {
    return h(TwoButtons, {
      ...props,
      leftButtonText,
      rightButtonText,
      leftButtonProps,
      rightButtonProps,
      'onUpdate:leftClick': () => {
        props?.onLeftButtonClickCallback?.();
      },
      'onUpdate:rightClick': () => {
        props?.onRightButtonClickCallback?.();
      },
    });
  };

  const template = TemplateRender();
  return { template };
};
