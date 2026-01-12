import { fireEvent, render } from '@testing-library/vue';

import XChipGroup from './XChipGroup.vue';

const fakeItems = Array.from({ length: 5 }, (_, i) => ({
  key: `item${i + 1}`,
  label: `項目 ${i + 1}`,
  disabled: i === 4,
}));

describe('XChipGroup', () => {
  it('should render chip group', () => {
    const { getByText } = render(XChipGroup, {
      props: {
        items: fakeItems,
      },
    });
    expect(getByText('項目 1')).toBeDefined();
  });

  it('should render empty chip group', () => {
    const { getByTestId } = render(XChipGroup);
    expect(getByTestId('x-chip-group')).toBeDefined();
  });

  it('should render a chip group in signle select mode', async () => {
    const { getAllByTestId, rerender, emitted } = render(XChipGroup, {
      props: {
        items: fakeItems,
        selectMode: 'single',
      },
    });

    const chips = getAllByTestId('x-chip');

    // Select first chip
    await fireEvent.click(chips[0]);
    expect(emitted()['update:selected'][0]).toStrictEqual([['item1']]);

    // Select second chip and first chip should be deselected
    await rerender({
      selected: ['item1'],
    });
    await fireEvent.click(chips[1]);
    expect(emitted()['update:selected'][1]).toStrictEqual([['item2']]);

    // Deselect second chip
    await rerender({
      selected: ['item2'],
    });
    await fireEvent.click(chips[1]);
    expect(emitted()['update:selected'][2]).toStrictEqual([[]]);
  });

  it('should render a chip group in multi select mode', async () => {
    const { getAllByTestId, rerender, emitted } = render(XChipGroup, {
      props: {
        items: fakeItems,
        selectMode: 'multi',
      },
    });

    const chips = getAllByTestId('x-chip');

    // Select first chip
    await fireEvent.click(chips[0]);
    expect(emitted()['update:selected'][0]).toStrictEqual([['item1']]);

    // Select second chip
    await rerender({
      selected: ['item1'],
    });
    await fireEvent.click(chips[1]);
    expect(emitted()['update:selected'][1]).toStrictEqual([['item1', 'item2']]);

    // Deselect second chip
    await rerender({
      selected: ['item1', 'item2'],
    });
    await fireEvent.click(chips[1]);
    expect(emitted()['update:selected'][2]).toStrictEqual([['item1']]);
  });
});
