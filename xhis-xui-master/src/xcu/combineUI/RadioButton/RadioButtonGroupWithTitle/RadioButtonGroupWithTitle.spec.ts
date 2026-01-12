import { mount } from '@vue/test-utils';
import { defineComponent, h, ref } from 'vue';

import {
  RadioButtonGroupWithTitleProps,
  useRadioButtonGroupWithTitle,
} from './RadioButtonGroupWithTitle';

const TestComponent = defineComponent({
  props: ['modelValue'],
  emits: ['update:modelValue'],
  template: `
        <div>
            <label v-for="option in options" :key="option.value">
                <input
                    type="radio"
                    :value="option.value"
                    v-model="modelValue"
                    @change="$emit('update:modelValue', option.value)"
                />
                {{ option.label }}
            </label>
        </div>
    `,
  props: {
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
});

describe('useRadioButtonGroupWithTitle', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ];

  const createWrapper = (
    props: Partial<RadioButtonGroupWithTitleProps> = {},
  ) => {
    const defaultProps: RadioButtonGroupWithTitleProps = {
      title: 'Test Title',
      options,
      isRequired: false,
      defaultResult: 'option1',
      ...props,
    };

    const { template, result } = useRadioButtonGroupWithTitle(
      defaultProps,
      TestComponent,
    );
    return { wrapper: mount(template), result };
  };

  it('renders correctly with default props', () => {
    const { wrapper } = createWrapper();
    expect(wrapper.html()).toContain('Option 1');
    expect(wrapper.html()).toContain('Option 2');
  });

  it('updates result when radio button is selected', async () => {
    const { wrapper, result } = createWrapper();
    const radioButtons = wrapper.findAll('input[type="radio"]');

    await radioButtons[1].setChecked();
    expect(result.value).toBe('option2');
  });

  it('uses defaultResult as initial value', () => {
    const { result } = createWrapper({ defaultResult: 'option2' });
    expect(result.value).toBe('option2');
  });

  it('updates result when defaultResult prop changes', async () => {
    const { wrapper, result } = createWrapper();
    await wrapper.setProps({ defaultResult: 'option2' });
    expect(result.value).toBe('option1');
  });

  it('renders title correctly', () => {
    const { wrapper } = createWrapper({ title: 'Custom Title' });
    expect(wrapper.html()).toContain('Custom Title');
  });
});
