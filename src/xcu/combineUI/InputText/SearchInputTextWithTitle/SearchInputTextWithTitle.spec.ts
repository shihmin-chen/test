import { mount } from '@vue/test-utils';
import { ref } from 'vue';

import { useSearchInputTextWithTitle } from './SearchInputTextWithTitle';
import SearchInputTextWithTitle from './SearchInputTextWithTitle.vue';

describe('SearchInputTextWithTitle', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(SearchInputTextWithTitle);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders title correctly', () => {
    const title = ref('Test Title');
    const wrapper = mount(SearchInputTextWithTitle, {
      props: { title },
    });
    expect(wrapper.text()).toContain('Test Title');
  });

  it('renders placeholder correctly', () => {
    const placeholder = ref('Search here...');
    const wrapper = mount(SearchInputTextWithTitle, {
      props: { placeholder },
    });
    const input = wrapper.find('input');
    expect(input.attributes('placeholder')).toBe('Search here...');
  });
});
