import { render } from '@testing-library/vue';
import XIconButton from './XIconButton.vue';

describe('XIconButton', () => {
  it('should mount with testing lib', () => {
    const { getByText } = render(XIconButton, {
      slots: {
        default: 'hello world',
      },
    });

    expect(getByText('hello world')).toBeTruthy();
  });
});
