import type { Meta, StoryObj } from '@storybook/vue3';
import { ComponentProps } from 'vue-component-type-helpers';

import XSelect from '../components/XSelect/XSelect.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ComponentProps<typeof XSelect>> = {
  title: 'XUI/XSelect',
  component: XSelect,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: {
    dataOptions: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Orange', value: 'orange' },
      { label: 'Mango', value: 'mango' },
      { label: 'Pear', value: 'pear' },
      { label: 'Peach', value: 'peach' },
      { label: 'Pineapple', value: 'pineapple' },
      { label: 'Strawberry', value: 'strawberry' },
      { label: 'Watermelon', value: 'watermelon' },
    ],
  },
  render: (args) => ({
    components: { XSelect },
    setup() {
      return { args };
    },
    template: `<XSelect style="margin-bottom: 300px" v-bind="args" @update:modelValue="args.modelValue = $event" />`,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Apple: Story = {
  args: {
    modelValue: 'apple',
    dataOptions: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Orange', value: 'orange' },
      { label: 'Mango', value: 'mango' },
      { label: 'Pear', value: 'pear' },
      { label: 'Peach', value: 'peach' },
      { label: 'Pineapple', value: 'pineapple' },
      { label: 'Strawberry', value: 'strawberry' },
      { label: 'Watermelon', value: 'watermelon' },
    ],
  },
};
