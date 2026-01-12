import type { Meta, StoryObj } from '@storybook/vue3';
import { ComponentProps } from 'vue-component-type-helpers';

import XChip from '../components/XChip/XChip.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ComponentProps<typeof XChip> & { default: string }> = {
  title: 'XUI/XChip',
  component: XChip,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: {
    checked: false,
    default: 'Chip',
  },
  render: (args) => ({
    components: { XChip },
    setup() {
      return { args };
    },
    template: `<XChip v-bind="args" @update:checked="args.checked = $event">{{ args.default }}</XChip>`,
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
