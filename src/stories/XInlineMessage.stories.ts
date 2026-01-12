import type { Meta, StoryObj } from '@storybook/vue3';
import { ComponentProps } from 'vue-component-type-helpers';

import XInlineMessage from '../components/XInlineMessage/XInlineMessage.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ComponentProps<typeof XInlineMessage>> = {
  title: 'XUI/XInlineMessage',
  component: XInlineMessage,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  render: (args) => ({
    components: { XInlineMessage },
    setup() {
      return { args };
    },
    template: `<XInlineMessage v-bind="args" />`,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Alert: Story = {
  args: {
    type: 'alert',
    title: 'Alert',
    content: 'This is an alert message.',
  },
};
