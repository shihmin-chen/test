import { render } from '@testing-library/vue';
import XListItem from './XListItem.vue';

describe('XListItem', () => {
  it('Render without error', async () => {
    render(XListItem);
  });
});
