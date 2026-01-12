import { getXColor } from './color';

describe('shared color', () => {
  it('test getXColor', () => {
    expect(getXColor('primary')).toBe('var(--xv-primary)');
    expect(getXColor(['primary', '500'])).toBe('var(--xv-primary--500)');
  });
});
