import type { Meta, StoryObj } from '@storybook/vue3';
import { ComponentProps } from 'vue-component-type-helpers';

import XStatus from '../components/XStatus/XStatus.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<
  ComponentProps<typeof XStatus> & { default: string; description: string }
> = {
  title: 'XUI/XStatus',
  component: XStatus,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: [
        'notFound',
        'empty',
        'notSelect',
        'noDataAvailable',
        'noItems',
        'error',
        'success',
        'warning',
        'loading',
      ],
    },
  },
  args: {
    default: '',
    description: '',
  },
  render: (args) => ({
    components: { XStatus },
    setup() {
      return { args };
    },
    template: `<XStatus v-bind="args">
                 ${args.default}
                 <template #description>${args.description}</template>
               </XStatus>`,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const NotFound: Story = {
  args: {
    type: 'notFound',
  },
};
