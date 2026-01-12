import type { Meta, StoryObj } from '@storybook/vue3';
import { ComponentProps } from 'vue-component-type-helpers';

import XChipGroup from '../components/XChipGroup/XChipGroup.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ComponentProps<typeof XChipGroup>> = {
  title: 'XUI/XChipGroup',
  component: XChipGroup,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    selectMode: { control: 'select', options: ['single', 'multi'] },
  },
  args: {
    selected: [],
    items: [
      { key: '1', label: 'Chip 1' },
      { key: '2', label: 'Chip 2' },
    ],
  },
  render: (args) => ({
    components: { XChipGroup },
    setup() {
      return { args };
    },
    template: `<XChipGroup v-bind="args" @update:selected="args.selected = $event" />`,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const MultiSelect: Story = {
  args: {
    selectMode: 'multi',
  },
};
