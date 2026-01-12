import { mount } from '@vue/test-utils';
import { ref } from 'vue';

import XAutocomplete from './XAutocomplete.vue';

const options = ref([
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
]);

const isHovered = ref(false);
const isFocused = ref(false);

const handleMouseOver = () => {
  isHovered.value = true;
};

const handleMouseOut = () => {
  isHovered.value = false;
};

const handleFocusIn = () => {
  isFocused.value = true;
};

const handleFocusOut = () => {
  isFocused.value = false;
};

const wrapper = mount({
  components: { XAutocomplete },
  template: `
        <div>
            <XAutocomplete
                ref="autocomplete"
                :options="options"
                @mouseover="handleMouseOver"
                @mouseout="handleMouseOut"
                @focusin="handleFocusIn"
                @focusout="handleFocusOut"
            />
        </div>
    `,
  setup() {
    return {
      options,
      handleMouseOver,
      handleMouseOut,
      handleFocusIn,
      handleFocusOut,
    };
  },
});

describe('XAutocomplete.vue', () => {
  it('should set isHovered to true on mouseover', async () => {
    await wrapper.findComponent(XAutocomplete).trigger('mouseover');
    expect(isHovered.value).toBe(true);
  });

  it('should set isHovered to false on mouseout', async () => {
    await wrapper.findComponent(XAutocomplete).trigger('mouseout');
    expect(isHovered.value).toBe(false);
  });

  it('should set isFocused to true on focusin', async () => {
    await wrapper.findComponent(XAutocomplete).trigger('focusin');
    expect(isFocused.value).toBe(true);
  });

  it('should set isFocused to false on focusout', async () => {
    await wrapper.findComponent(XAutocomplete).trigger('focusout');
    expect(isFocused.value).toBe(false);
  });
});
