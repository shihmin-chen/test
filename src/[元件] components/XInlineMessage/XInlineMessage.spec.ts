import { render, fireEvent } from '@testing-library/vue';
import { mount } from '@vue/test-utils';
import XInlineMessage from './XInlineMessage.vue';

describe('XInlineMessage', () => {
  it('test render a inline message', () => {
    const { getByText } = render(XInlineMessage, {
      props: {
        title: 'hello world',
      },
    });
    expect(getByText('hello world')).toBeDefined();
  });

  it('test render a inline message with close button', async () => {
    const { getByAltText } = render(XInlineMessage, {
      props: {
        title: 'hello world',
        hasCloseButton: true,
      },
    });
    const closeButton = getByAltText('close');
    await fireEvent.click(closeButton);
  });

  it('test isLabelPlaceMiddle value', async () => {
    const wrapper = mount(XInlineMessage, {
      props: {
        title: 'hello world',
        content: 'hello world',
        labelPlacement: 'right',
        noAutoHide: false,
      },
    });

    expect(wrapper.vm.isLabelPlaceMiddle).toBe(true);
  });
});
