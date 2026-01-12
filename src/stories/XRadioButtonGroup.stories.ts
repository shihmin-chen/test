import type { Meta, StoryObj } from '@storybook/vue3';
import { ComponentProps } from 'vue-component-type-helpers';

import XRadioButton from '../components/XRadio/XRadioButton.vue';
import XRadioButtonGroup from '../components/XRadio/XRadioButtonGroup.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<
  ComponentProps<typeof XRadioButtonGroup> & { default: string }
> = {
  title: 'XUI/XRadioButtonGroup',
  component: XRadioButtonGroup,
  subcomponents: { XRadioButton },
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: {
    modelValue: false,
    default: `<XRadioButton :value="true" label="是" /><XRadioButton :value="false" label="否" />`,
  },
  render: (args) => ({
    components: { XRadioButtonGroup, XRadioButton },
    setup() {
      return { args };
    },
    template: `<XRadioButtonGroup v-bind="args" @update:modelValue="args.modelValue = $event">${args.default}</XRadioButtonGroup>`,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Sample: Story = {
  args: {
    size: 'md',
  },
};
