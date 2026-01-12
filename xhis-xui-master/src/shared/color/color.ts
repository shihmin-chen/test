export const XColorThemeList = [
  'neutral',
  'primary',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'violet',
];
export type XColorTheme = typeof XColorThemeList[number];

const getXColor = (name: string | string[]): string => {
  const str = typeof name === 'string' ? name : name.join('--');
  return `var(--xv-${str})`;
};

export { getXColor };
