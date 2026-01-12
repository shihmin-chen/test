import type { Meta, StoryObj } from '@storybook/vue3';
import { ComponentProps } from 'vue-component-type-helpers';

import XListItem from '../components/XList/XListItem.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ComponentProps<typeof XListItem> & { default: string }> = {
  title: 'XUI/XList/XListItem',
  component: XListItem,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: {
    default: '<div>ListItem</div>',
  },
  render: (args) => ({
    components: { XListItem },
    setup() {
      return { args };
    },
    template: `<XListItem v-bind="args">${args.default}</XListItem>`,
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
