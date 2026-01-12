import type { Meta, StoryObj } from '@storybook/vue3';
import { ComponentProps } from 'vue-component-type-helpers';

import XAutocomplete from '../components/XAutocomplete/XAutocomplete.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ComponentProps<typeof XAutocomplete>> = {
  title: 'XUI/XAutocomplete',
  component: XAutocomplete,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: {
    options: [
      'Apple',
      'Banana',
      'Orange',
      'Mango',
      'Pear',
      'Peach',
      'Pineapple',
      'Strawberry',
      'Watermelon',
    ],
  },
  render: (args) => ({
    components: { XAutocomplete },
    setup() {
      return { args };
    },
    template: `<XAutocomplete style="margin-bottom: 300px" v-bind="args" @update:modelValue="args.modelValue = $event" />`,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Search: Story = {
  args: {
    inputAttrs: { placeholder: 'Search' },
  },
};
