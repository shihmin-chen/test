import type { Meta, StoryObj } from '@storybook/vue3';
import { ComponentProps } from 'vue-component-type-helpers';

import XIconButton from '../components/XIconButton/XIconButton.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ComponentProps<typeof XIconButton>> = {
  title: 'XUI/XIconButton',
  component: XIconButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    theme: {
      control: 'select',
      options: ['primary', 'tertiary', 'danger', 'warning'],
    },
  },
  render: (args) => ({
    components: { XIconButton },
    setup() {
      return { args };
    },
    template: `<XIconButton v-bind="args" />`,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Dismiss: Story = {
  args: {
    icon: 'dismiss'
  },
};
