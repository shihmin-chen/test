import { render } from '@testing-library/vue';
import { mount } from '@vue/test-utils';

import XButton from './XButton.vue';

describe('XButton', () => {
  it('should mount', async () => {
    const wrapper = mount(XButton);
    expect(wrapper.html()).toContain('button');
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted().click.length).toBe(1);
    wrapper.unmount();
  });

  it('should mount with testing lib', () => {
    const { getByText } = render(XButton, {
      slots: {
        default: 'hello world',
      },
    });

    expect(getByText('hello world')).toBeTruthy();
    // There should be an auto cleanup hook in AfterEach.
  });
});
