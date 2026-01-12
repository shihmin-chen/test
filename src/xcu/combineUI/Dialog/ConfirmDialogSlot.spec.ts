import { mount } from '@vue/test-utils';
import { h } from 'vue';

import { useConfirmDialogSlot } from './ConfirmDialogSlot';
import ConfirmDialogSlot from './ConfirmDialogSlot.vue';

// test ConfirmDialogSlot.vue
describe('ConfirmDialogSlot', () => {
  it('should render ConfirmDialogSlot component with given props', () => {
    const props = {
      confirmDialogProps: {
        title: 'Test Title',
        message: 'Test Message',
      },
      requestContainer: {
        request: () => {},
      },
      onClickPrimaryCallback: jest.fn(),
      onClickSecondaryCallback: jest.fn(),
      onClickTertiaryCallback: jest.fn(),
    };

    const wrapper = mount(ConfirmDialogSlot, {
      props: props,
    });

    expect(wrapper.props()).toMatchObject(props);
  });
});

describe('useConfirmDialogSlot', () => {
  it('should render ConfirmDialogSlot component with given props', () => {
    const props = {
      confirmDialogProps: {
        title: 'Test Title',
        message: 'Test Message',
      },
      onClickPrimaryCallback: jest.fn(),
      onClickSecondaryCallback: jest.fn(),
      onClickTertiaryCallback: jest.fn(),
    };

    const { template } = useConfirmDialogSlot(props);

    const wrapper = mount({
      render() {
        return h(template);
      },
    });

    expect(wrapper.findComponent(ConfirmDialogSlot).exists()).toBe(true);
    expect(wrapper.findComponent(ConfirmDialogSlot).props()).toMatchObject(
      props,
    );
  });
});
