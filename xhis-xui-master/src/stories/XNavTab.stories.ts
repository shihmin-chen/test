import type { Meta, StoryObj } from '@storybook/vue3';
import { ComponentProps } from 'vue-component-type-helpers';

import XNavTab from '../components/XNavTab/XNavTab.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ComponentProps<typeof XNavTab>> = {
  title: 'XUI/XNavTab',
  component: XNavTab,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    tabList: [
      { name: 'tab1', displayName: 'Tab1' },
      { name: 'tab2', displayName: 'Tab2', mark: true },
    ],
    currentTabName: 'tab1',
  },
  render: (args) => ({
    components: { XNavTab },
    setup() {
      return { args };
    },
    template: `<XNavTab v-bind="args" @change="args.currentTabName = $event" />`,
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

