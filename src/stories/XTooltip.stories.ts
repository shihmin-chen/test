import type { Meta, StoryObj } from '@storybook/vue3';
import { ComponentProps } from 'vue-component-type-helpers';

import XTooltip from '../components/XTooltip/XTooltip.vue';
import XButton from '../components/XButton/XButton.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ComponentProps<typeof XTooltip>> = {
  title: 'XUI/XTooltip',
  component: XTooltip,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const ButtonWithTooltip: Story = {
  args: {
    options: {
      placement: 'top',
    },
    content: 'This is a tooltip',
  },
  render: (args) => ({
    components: { XButton, XTooltip },
    setup() {
      return { args };
    },
    template: `<div style="display: flex"><XTooltip v-bind="args"><XButton>Hover me</XButton></XTooltip></div>`,
  }),
};
