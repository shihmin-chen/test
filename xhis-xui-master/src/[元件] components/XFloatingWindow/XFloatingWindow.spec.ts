import { render } from '@testing-library/vue';

import XFloatingWindow from './XFloatingWindow.vue';

describe('Test XFloatingWindow', () => {
  it('Should render XFloatingWindow', () => {
    const { html } = render(XFloatingWindow);

    expect(html()).toContain('teleport');
  });
});
