import type { Meta, StoryObj } from '@storybook/vue3';
import { ComponentProps } from 'vue-component-type-helpers';

import XInputText from '../components/XInput/XInputText.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ComponentProps<typeof XInputText>> = {
  title: 'XUI/XInputText',
  component: XInputText,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'search', 'url', 'email', 'number'],
    },
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: {
    modelValue: '',
  },
  render: (args) => ({
    components: { XInputText },
    setup() {
      return { args };
    },
    template: `<XInputText v-bind="args" @update:modelValue="args.modelValue = $event" />`,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Text: Story = {
  args: {
    type: 'text',
    placeholder: 'Type some text',
  },
};

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Search',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Password',
  },
};
