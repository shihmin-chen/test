import type { Meta, StoryObj } from '@storybook/vue3';
import { ComponentProps } from 'vue-component-type-helpers';

import XMultiLevelDropdown from '../components/XMultiLevelDropdown/XMultiLevelDropdown.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<
  ComponentProps<typeof XMultiLevelDropdown> & { default: string }
> = {
  title: 'XUI/XMultiLevelDropdown',
  component: XMultiLevelDropdown,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: {
    default: '選單',
    itemGroups: [
      {
        name: '群組1',
        items: [
          { name: '選項A (一個非常非常長的選項名稱)', children: [] },
          {
            name: '選項B',
            children: [
              {
                name: '群組3',
                items: [
                  {
                    name: '選項E',
                    children: [
                      {
                        name: '',
                        items: [{ name: '選項G', children: [] }],
                      },
                    ],
                  },
                  { name: '選項F', children: [] },
                ],
              },
            ],
          },
          { name: '選項C', children: [] },
        ],
      },
      {
        name: '群組2',
        items: [{ name: '選項D', children: [] }],
      },
    ],
  },
  render: (args) => ({
    components: { XMultiLevelDropdown },
    setup() {
      return { args };
    },
    template: `<XMultiLevelDropdown style="margin-bottom: 400px" v-bind="args">${args.default}</XMultiLevelDropdown>`,
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

export const ForButtonGroup: Story = {
  args: {
    itemGroups: [
      {
        name: '群組1',
        items: [
          { name: '選項A (一個非常非常長的選項名稱)', children: [] },
          {
            name: '選項B',
            children: [
              {
                name: '群組3',
                items: [
                  {
                    name: '選項E',
                    children: [
                      {
                        name: '',
                        items: [{ name: '選項G', children: [] }],
                      },
                    ],
                  },
                  { name: '選項F', children: [] },
                ],
              },
            ],
          },
          { name: '選項C', children: [] },
        ],
      },
      {
        name: '群組2',
        items: [{ name: '選項D', children: [] }],
      },
    ],
    options: {
      placement: 'bottom-start',
      offset: [0, 0],
    },
  },
};
