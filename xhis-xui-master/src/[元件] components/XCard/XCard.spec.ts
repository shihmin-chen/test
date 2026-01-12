import { render } from '@testing-library/vue';
import XCard from './XCard.vue';

describe('XCard', () => {
  it('Render without error', async () => {
    render(XCard);
  });
});
