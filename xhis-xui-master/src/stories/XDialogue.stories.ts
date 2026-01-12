import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { ComponentProps } from 'vue-component-type-helpers';

import XButton from '../components/XButton/XButton.vue';
import XDialogue from '../components/XDialogue/XDialogue.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ComponentProps<typeof XDialogue>> = {
  title: 'XUI/XDialogue',
  component: XDialogue,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    width: 640,
    height: 480,
  },
  render: (args) => ({
    components: { XButton, XDialogue },
    setup() {
      const isShown = ref(false);
      return { args, isShown };
    },
    template: `<XButton @click="isShown = true">Show Dialogue</XButton>
    <XDialogue v-bind="args" :show="isShown">
      <div style="display: flex; justify-content: center; height: 100%">
        <div style="display: flex; flex-direction: column; justify-content: center">
          <XButton @click="isShown = false">Close</XButton>
        </div>
      </div>
    </XDialogue>`,
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
