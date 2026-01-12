import type { Meta, StoryObj } from '@storybook/vue3';
import { ComponentProps } from 'vue-component-type-helpers';

import XTextArea from '../components/XTextArea/XTextArea.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ComponentProps<typeof XTextArea> & { placeholder: string }> = {
  title: 'XUI/XTextArea',
  component: XTextArea,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    placeholder: 'Type some text',
  },
  render: (args) => ({
    components: { XTextArea },
    setup() {
      return { args };
    },
    template: `<XTextArea v-bind="args" @update:modelValue="args.modelValue = $event" />`,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Editable: Story = {
  args: {
    modelValue: 'Editable text',
  },
};

export const Readonly: Story = {
  args: {
    modelValue: 'Readonly text',
    readonly: true,
  },
};
