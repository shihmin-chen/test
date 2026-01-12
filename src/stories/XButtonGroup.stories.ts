import type { Meta, StoryObj } from '@storybook/vue3';
import { ComponentProps } from 'vue-component-type-helpers';

import XButtonGroup from '../components/XButtonGroup/XButtonGroup.vue';
import XButtonGroupItem from '../components/XButtonGroup/XButtonGroupItem.vue';
import XDropdown from '../components/XDropdown/XDropdown.vue';
import XMultiLevelDropdown from '../components/XMultiLevelDropdown/XMultiLevelDropdown.vue';
import * as XDropdownStories from './XDropdown.stories';
import * as XMultiLevelDropdownStories from './XMultiLevelDropdown.stories';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ComponentProps<typeof XButtonGroup> & { default: string; dropdownArgs: unknown }> = {
  title: 'XUI/XButtonGroup',
  component: XButtonGroup,
  subcomponents: { XButtonGroupItem },
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    theme: {
      control: 'select',
      options: ['primary', 'neutral'],
    },
  },
  args: {
    default: `<XButtonGroupItem v-for="item in ['Item1', 'Item2', 'Item3']" :label="item" />`,
  },
  render: (args) => ({
    components: { XButtonGroup, XButtonGroupItem },
    setup() {
      return { args };
    },
    template: `<XButtonGroup v-bind="args">${args.default}</XButtonGroup>`,
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
    theme: 'primary',
  },
};

export const WithDropdown: Story = {
  args: {
    size: 'md',
    theme: 'primary',
    default: `
      <XDropdown v-bind="args.dropdownArgs">
        <XButtonGroupItem label="下拉選單" caret />
      </XDropdown>
    `,
    dropdownArgs: XDropdownStories.ForButtonGroup.args,
  },
  render: (args) => ({
    components: { XButtonGroup, XButtonGroupItem, XDropdown },
    setup() {
      return { args };
    },
    template: `<XButtonGroup style="margin-bottom: 400px" v-bind="args">${args.default}</XButtonGroup>`,
  }),
};


export const WithMultiLevelDropdown: Story = {
  args: {
    size: 'md',
    theme: 'primary',
    default: `
      <XMultiLevelDropdown v-bind="args.dropdownArgs">
        <XButtonGroupItem label="下拉選單" caret />
      </XMultiLevelDropdown>
    `,
    dropdownArgs: XMultiLevelDropdownStories.ForButtonGroup.args,
  },
  render: (args) => ({
    components: { XButtonGroup, XButtonGroupItem, XMultiLevelDropdown },
    setup() {
      return { args };
    },
    template: `<XButtonGroup style="margin-bottom: 300px" v-bind="args">${args.default}</XButtonGroup>`,
  }),
};
