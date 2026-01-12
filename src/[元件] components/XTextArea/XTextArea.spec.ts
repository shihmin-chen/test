import { render, screen } from '@testing-library/vue';
import XTextArea from './XTextArea.vue';

describe('XTextArea', () => {
  it('Render without error', async () => {
    render(XTextArea);

    expect(screen.getByRole('textbox')).toBeDefined();
  });
});
