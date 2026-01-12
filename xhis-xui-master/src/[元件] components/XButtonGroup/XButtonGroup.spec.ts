import { render } from '@testing-library/vue';

import XButtonGroup from './XButtonGroup.vue';

describe('XButtonGroup', () => {
  it('should render button group', () => {
    const { getByText } = render(XButtonGroup, {
      slots: {
        default: 'hello world',
      },
    });
    expect(getByText('hello world')).toBeTruthy();
  });
});
