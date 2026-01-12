export type XDropdownSize = 'sm' | 'md';

/**
 * XDropdown menu item
 */
export interface XDropdownItem {
  name: string;
  disabled?: boolean;
  callback?: () => void;
}
