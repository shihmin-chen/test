import fs from 'fs';
import _ from 'lodash';

const generateIconStory = (icon: string) => {
  const pascalCaseIcon = _.upperFirst(_.camelCase(icon));
  return `
export const ${pascalCaseIcon}: Story = {
  args: {
    icon: '${icon}',
  },
};
`;
}

const meta = `import type { Meta, StoryObj } from '@storybook/vue3';
import type { ComponentProps } from 'vue-component-type-helpers';

import XIcon from '../components/XIcon/XIcon.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ComponentProps<typeof XIcon>> = {
  title: 'XUI/XIcon',
  component: XIcon,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  render: (args) => ({
    components: { XIcon },
    setup() {
      return { args };
    },
    template: '<XIcon v-bind="args" />',
  }),
};

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
`

const stories = fs.readdirSync('./src/components/XIcon/icon-component/')
  .map(file => file.split('.')[0])
  .map(generateIconStory)
  .join('');

fs.writeFileSync('./src/stories/XIcon.stories.ts', meta + stories);
