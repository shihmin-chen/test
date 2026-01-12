import type { Meta, StoryObj } from '@storybook/vue3';
import { ComponentProps } from 'vue-component-type-helpers';

import XDateTimePicker from '../components/XDateTimePicker/XDateTimePicker.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ComponentProps<typeof XDateTimePicker>> = {
  title: 'XUI/XDateTimePicker',
  component: XDateTimePicker,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    modelValue: new Date(),
  },
  render: (args) => ({
    components: { XDateTimePicker },
    setup() {
      return { args };
    },
    template: `<XDateTimePicker style="margin-bottom: 400px" v-bind="args" @update:modelValue="args.modelValue = $event" />`,
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const AutoApply: Story = {
  args: {
    customConfig: {
      autoApply: true,
    },
  },
};

export const ROCCalendar: Story = {
  args: {
    calendarType: 'ROC',
  },
};
