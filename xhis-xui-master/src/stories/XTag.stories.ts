import type { Meta, StoryObj } from '@storybook/vue3';
import { ComponentProps } from 'vue-component-type-helpers';

import XTag from '../components/XTag/XTag.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ComponentProps<typeof XTag> & { default: string }> = {
  title: 'XUI/XTag',
  component: XTag,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: [
        'neutral',
        'primary',
        'red',
        'orange',
        'yellow',
        'green',
        'teal',
        'violet',
      ],
    },
  },
  render: (args) => ({
    components: { XTag },
    setup() {
      return { args };
    },
    template: `<XTag v-bind="args">${args.default}</XTag>`,
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
    theme: 'green',
    default: '完成'
  },
};
