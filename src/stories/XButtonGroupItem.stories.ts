import type { Meta, StoryObj } from '@storybook/vue3';
import { ComponentProps } from 'vue-component-type-helpers';

import XButtonGroupItem from '../components/XButtonGroup/XButtonGroupItem.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<
  ComponentProps<typeof XButtonGroupItem> & { default: string }
> = {
  title: 'XUI/XButtonGroup/XButtonGroupItem',
  component: XButtonGroupItem,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    theme: {
      control: 'select',
      options: ['primary', 'neutral'],
    },
  },
  args: {
    label: 'Item',
  },
  render: (args) => ({
    components: { XButtonGroupItem },
    setup() {
      return { args };
    },
    template: `<XButtonGroupItem v-bind="args" />`,
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
    theme: 'primary',
  },
};
