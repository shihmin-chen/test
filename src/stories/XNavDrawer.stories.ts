import type { Meta, StoryObj } from '@storybook/vue3';
import { ComponentProps } from 'vue-component-type-helpers';

import XNavDrawer from '../components/XNavDrawer/XNavDrawer.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ComponentProps<typeof XNavDrawer>> = {
  title: 'XUI/XNavDrawer',
  component: XNavDrawer,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    modelValue: [
      {
        nodes: [
          {
            key: 'drawer 1',
            name: 'Drawer 1',
            children: [
              { key: 'item 1', name: 'Item 1' },
              { key: 'item 2', name: 'Item 2' },
            ],
          },
        ],
      },
      {
        nodes: [{ key: 'drawer 2', name: 'Drawer 2' }],
      },
    ],
  },
  render: (args) => ({
    components: { XNavDrawer },
    setup() {
      return { args };
    },
    template: `<XNavDrawer v-bind="args" />`,
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
  args: {},
};
