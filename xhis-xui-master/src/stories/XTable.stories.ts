import type { Meta, StoryObj } from '@storybook/vue3';
import { ComponentProps } from 'vue-component-type-helpers';

import XTable from '../components/XTable/XTable.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ComponentProps<typeof XTable>> = {
  title: 'XUI/XTable',
  component: XTable,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  render: (args) => ({
    components: { XTable },
    setup() {
      return { args };
    },
    template: `<XTable v-bind="args" />`,
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
    data: [
      { name: 'Alice', age: 20, gender: 'female' },
      { name: 'Bob', age: 30, gender: 'male' },
    ],
    options: [
      { index: 'name', title: 'Name', align: 'left' },
      { index: 'age', title: 'Age', align: 'middle' },
      { index: 'gender', title: 'Gender', align: 'right' },
    ],
  },
};

export const MultiLevel: Story = {
  args: {
    data: [
      {
        name: 'Alice',
        age: 20,
        gender: 'female',
        children: [{ name: 'Steve', age: 0, gender: 'male' }],
      },
      {
        name: 'Bob',
        age: 30,
        gender: 'male',
        children: [{ name: 'LeBron', age: 0, gender: 'male' }],
      },
    ],
    options: [
      { index: 'name', title: 'Name', align: 'left' },
      { index: 'age', title: 'Age', align: 'middle' },
      { index: 'gender', title: 'Gender', align: 'right' },
    ],
    decreaseTreeLevel: 1,
    childrenKey: 'children',
    customCategoryOptions: {
      isHeader: (item: Record<string, unknown>) => 'children' in item,
      tdClass: (item: Record<string, unknown>) => ('children' in item ? 'bg-gray-200' : ''),
    },
    toggleOptions: {
      isDefaultExpand: true,
      toggleIndex: 'name',
    },
  },
};
