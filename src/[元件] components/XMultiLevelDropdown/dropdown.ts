export type XMultiLevelDropdownSize = 'sm' | 'md';

/**
 * XMultiLevelDropdown menu item
 */
export interface XMultiLevelDropdownItem {
  name: string;
  key?: string; // add an unique key if this dropdown has to be found in quick launch
  disabled?: boolean;
  children?: Array<XMultiLevelDropdownItemGroup>;
  callback?: () => void | Promise<void>;
}

/**
 * XMultiLevelDropdown menu item group
 */
export interface XMultiLevelDropdownItemGroup {
  name: string;
  key?: string; // add an unique key if this dropdown has to be found in quick launch
  items?: Array<XMultiLevelDropdownItem>;
}

const XMultiLevelDropdownInjectKey = Symbol('XMultiLevelDropdown');
export { XMultiLevelDropdownInjectKey };
