import { fireEvent, render } from '@testing-library/vue';

import XChip from './XChip.vue';

describe('XChip', () => {
  it('should render a chip with given content', () => {
    const { getByText } = render(XChip, {
      slots: {
        default: 'hello world',
      },
    });
    expect(getByText('hello world')).toBeDefined();
  });

  it('should render a chip with outline', () => {
    const { getByText } = render(XChip, {
      props: {
        outline: true,
      },
      slots: {
        default: 'hello world',
      },
    });
    expect(getByText('hello world')).toBeDefined();
  });

  it('click on a chip', async () => {
    const { getByTestId, rerender, emitted } = render(XChip, {
      slots: {
        default: 'hello world',
      },
    });

    const chip = getByTestId('x-chip');
    await fireEvent.click(chip);
    expect(emitted()['update:checked'].length).toBe(1);
    expect(emitted()['update:checked'][0]).toStrictEqual([true]);

    await rerender({
      checked: true,
    });
    await fireEvent.click(chip);
    expect(emitted()['update:checked'].length).toBe(2);
    expect(emitted()['update:checked'][1]).toStrictEqual([false]);
  });

  it('click on a disabled chip', async () => {
    const { getByTestId, emitted } = render(XChip, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'hello world',
      },
    });

    const chip = getByTestId('x-chip');
    await fireEvent.click(chip);
    expect(emitted()['update:checked']).toBeUndefined();
  });
});
