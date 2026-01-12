import { InjectionKey, Ref, CSSProperties } from 'vue';
import { XDropdownItem } from '../XDropdown/dropdown';

// TODOITEM: rename to XNavDrawerToggleButtonPosition?
export enum ToggleButtonPosition {
  Left = 'left',
  Right = 'right',
}

export const MenuDisplayMode = {
  Always: 'always',
  Hover: 'hover',
  Hide: 'hide',
} as const;

export type MenuDisplayMode =
  typeof MenuDisplayMode[keyof typeof MenuDisplayMode];

export const XActiveDrawerAction = {
  Move: 'move',
  Fix: 'fix',
} as const;

export type XActiveDrawerAction =
  typeof XActiveDrawerAction[keyof typeof XActiveDrawerAction];

export interface XNavDrawerNode {
  key: string;
  name: string;
  icon?: string;
  disabled?: boolean;
  unselectable?: boolean;
  autoExpand?: boolean;
  isExpand?: boolean;
  displayMenu?: MenuDisplayMode;
  setExpand?: (value: boolean) => void;
  callback?: () => void | Promise<XActiveDrawerAction>;
  dropdownItems?: XDropdownItem[];
  children?: Array<XNavDrawerNode>;
  toggleButtonPosition?: ToggleButtonPosition;
  itemStyle?: CSSProperties;
}

export interface XNavDrawerNodeGroup {
  name?: string;
  nodes: Array<XNavDrawerNode>;
}

type NodeKeyState = {
  shouldUpdate: boolean;
  key: string;
};

const menuDisplayKey: InjectionKey<MenuDisplayMode> = Symbol('MenuDisplayMode');
const navContextKey: InjectionKey<NodeKeyState> = Symbol('XNavDrawer');
const clickItemToggleKey: InjectionKey<Ref<boolean>> =
  Symbol('ClickItemToggleKey');

export { menuDisplayKey, navContextKey, clickItemToggleKey };
