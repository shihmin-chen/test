import { mount } from '@vue/test-utils';
import { defineComponent, ref, unref } from 'vue';

import TwoButtons from '../../../atomUI/TwoButtons.vue';
import {
  TwoButtonsForConfirmProps,
  useTwoButtonsForConfirm,
} from './TwoButtonsForConfirm';

describe('useTwoButtonsForConfirm', () => {
  const TestComponent = defineComponent({
    props: ['props'],
    setup(props) {
      const { template } = useTwoButtonsForConfirm(
        props.props as TwoButtonsForConfirmProps,
      );
      return () => template;
    },
  });

  it('renders with provided button texts', () => {
    const onLeftButtonClickCallback = jest.fn();
    const onRightButtonClickCallback = jest.fn();
    const wrapper = mount(TestComponent, {
      props: {
        props: {
          leftButtonText: ref('Left'),
          rightButtonText: ref('Right'),
          leftButtonProps: ref({ theme: 'secondary' }),
          rightButtonProps: ref({ size: 'sm' }),
          onLeftButtonClickCallback,
          onRightButtonClickCallback,
        },
      },
    });

    expect(unref(wrapper.vm.$props.props.leftButtonText)).toBe('Left');
  });
});
