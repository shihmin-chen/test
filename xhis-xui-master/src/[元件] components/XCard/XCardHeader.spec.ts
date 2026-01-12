import { render } from '@testing-library/vue';
import XCardHeader from './XCardHeader.vue';

describe('XCardHeader', () => {
  it('Render without error', async () => {
    render(XCardHeader);
  });
});
