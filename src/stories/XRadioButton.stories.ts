import type { Meta, StoryObj } from '@storybook/vue3';
import { ComponentProps } from 'vue-component-type-helpers';

import XRadioButton from '../components/XRadio/XRadioButton.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ComponentProps<typeof XRadioButton>> = {
  title: 'XUI/XRadioButtonGroup/XRadioButton',
  component: XRadioButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
  },
  render: (args) => ({
    components: { XRadioButton },
    setup() {
      return { args };
    },
    template: `<XRadioButton v-bind="args" label="選項" />`,
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
