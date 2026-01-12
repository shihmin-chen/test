import { mount } from '@vue/test-utils';

import InputTextWithTitle from './InputTextWithTitle.vue';

describe('InputTextWithTitle.vue', () => {
  it('renders props when passed', () => {
    const wrapper = mount(InputTextWithTitle, {
      props: {
        title: 'Test Title',
        placeholder: 'Test Placeholder',
        isRequired: true,
        maxlength: 10,
      },
    });
    expect(wrapper.props().title).toBe('Test Title');
    expect(wrapper.props().placeholder).toBe('Test Placeholder');
    expect(wrapper.props().isRequired).toBe(true);
    expect(wrapper.props().maxlength).toBe(10);
  });
});
