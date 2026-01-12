import { mount } from '@vue/test-utils';

import XCUInit from './XCUInit.vue';

// use snapshot to test the component

describe('XCUInit', () => {
  it('renders correctly', () => {
    const wrapper = mount(XCUInit);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
