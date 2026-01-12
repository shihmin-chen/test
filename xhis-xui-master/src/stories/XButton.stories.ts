import type { Meta, StoryObj } from '@storybook/vue3';
import { ComponentProps } from 'vue-component-type-helpers';

import XButton from '../components/XButton/XButton.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ComponentProps<typeof XButton> & { default: string }> = {
  title: 'XUI/XButton',
  component: XButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    theme: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'danger', 'warning'],
    },
    default: { control: 'text' },
  },
  render: (args) => ({
    components: { XButton },
    setup() {
      return { args };
    },
    template: `<XButton v-bind="args">${args.default}</XButton>`,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Confirm: Story = {
  args: {
    size: 'md',
    theme: 'primary',
    default: '確認',
  },
};

export const Cancel: Story = {
  args: {
    size: 'md',
    theme: 'tertiary',
    outline: true,
    default: '取消',
  },
};
