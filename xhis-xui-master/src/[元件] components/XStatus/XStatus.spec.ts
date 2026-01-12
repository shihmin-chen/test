import { render, screen } from '@testing-library/vue';

import { XStatus, xStatusTypes } from './index';

describe('XStatus', () => {
  it('render something', () => {
    render(XStatus);
    expect(screen.findByText(xStatusTypes.empty.title)).toBeDefined();
  });
});
