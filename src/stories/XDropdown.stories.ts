import type { Meta, StoryObj } from '@storybook/vue3';
import { ComponentProps } from 'vue-component-type-helpers';

import XDropdown from '../components/XDropdown/XDropdown.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ComponentProps<typeof XDropdown>> = {
  title: 'XUI/XDropdown',
  component: XDropdown,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: {
    items: [
      { name: 'Apple' },
      { name: 'Banana' },
      { name: 'Orange' },
      { name: 'Mango' },
      { name: 'Pear' },
      { name: 'Peach' },
      { name: 'Pineapple' },
      { name: 'Strawberry' },
      { name: 'Watermelon' },
    ],
  },
  render: (args) => ({
    components: { XDropdown },
    setup() {
      return { args };
    },
    template: `<XDropdown style="margin-bottom: 400px" v-bind="args" />`,
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
  args: {},
};

export const ForButtonGroup: Story = {
  args: {
    items: [
      { name: 'Apple' },
      { name: 'Banana' },
      { name: 'Orange' },
      { name: 'Mango' },
      { name: 'Pear' },
      { name: 'Peach' },
      { name: 'Pineapple' },
      { name: 'Strawberry' },
      { name: 'Watermelon' },
    ],
    options: {
      placement: 'bottom-start',
      offset: [0, 0],
    },
  },
};
