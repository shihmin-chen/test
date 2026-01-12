import { mount } from '@vue/test-utils';

import XAutocomplete from './XAutocomplete.vue';

describe('XAutocomplete', () => {
  it('renders prefix slot content', () => {
    const wrapper = mount({
      components: { XAutocomplete },
      template: `
                <XAutocomplete>
                    <template #prefix>
                        <span class="test-prefix">Prefix Content</span>
                    </template>
                </XAutocomplete>
            `,
    });

    expect(wrapper.find('.test-prefix').exists()).toBe(true);
    expect(wrapper.find('.test-prefix').text()).toBe('Prefix Content');
  });
});
