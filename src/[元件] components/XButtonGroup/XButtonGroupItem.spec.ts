import { render } from '@testing-library/vue';

import XButtonGroupItem from './XButtonGroupItem.vue';

describe('XButtonGroupItem', () => {
  it('should render button group item', () => {
    const { getByText } = render(XButtonGroupItem, {
      props: {
        label: 'hello world',
      },
    });
    expect(getByText('hello world')).toBeDefined();
  });
});
