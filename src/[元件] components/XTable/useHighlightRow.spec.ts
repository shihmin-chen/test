import useHighlightRow from './useHighlightRow';

describe('useHighlightRow', () => {
  it('should be removed from `highlightedRows` after 3s', async () => {
    const { highlightRow, shouldHighlightRow } = useHighlightRow();
    const key1 = 'key1';
    const key2 = 'key2';

    highlightRow(key1);
    highlightRow(key2);

    expect(shouldHighlightRow(key1)).toBe(true);
    expect(shouldHighlightRow(key2)).toBe(true);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    expect(shouldHighlightRow(key1)).toBe(false);
    expect(shouldHighlightRow(key2)).toBe(false);
  });
});
