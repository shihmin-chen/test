import type { Preview } from '@storybook/vue3'

import 'tippy.js/dist/tippy.css'
import 'tippy.js/dist/svg-arrow.css'
import 'modern-normalize/modern-normalize.css'
import '../src/class/utils.scss'
import '../src/class/global.scss'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;
