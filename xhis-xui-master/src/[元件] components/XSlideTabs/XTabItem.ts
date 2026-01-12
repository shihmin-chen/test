/**
 * XTabItem
 */
export type XTabItem = {
  /** label to show in option */
  label: string;
  /** value to used in selected value, should be unique */
  value: string;
};

export type XTabItemSize = 'sm' | 'md' | 'lg';

export type XSlideTabsTheme =
  | 'filledWhite'
  | 'filledWhiteWithBorder'
  | 'filledGrey'
  | 'minimal';
