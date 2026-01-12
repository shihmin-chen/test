import { SortStatus } from '../../shared';

export const xTableAlignMap = {
  left: 'flex-start',
  middle: 'center',
  right: 'flex-end',
} as const;

export type TableAlign = keyof typeof xTableAlignMap;

/** Definition for x table options array item */
export interface XTableEntryOption<
  T = Record<string | number | symbol, unknown>
> {
  /** Data[index] will be used to retrieve row data, doesn't need to be exist in data, make sure to keep this value unique in options */
  index: Extract<keyof T, string>;
  /** Column Header Name */
  title?: string;
  /** control justify-content value */
  align?: TableAlign;
  /**
   * CSS Grid track value
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns#values
   * */
  width?: string;
  /** Provide sorting method, can specified sorted value type 'number' */
  sort?: SortStatus['type'];
  /** show tooltip on title hover */
  desc?: string;
  /** extra class assign, space separated */
  cellClass?: string;
  /** extra style assign to cells */
  cellStyle?: Partial<CSSStyleDeclaration | Record<string, string>>;
  /** extra class assign to th, space separated */
  headClass?: string;
  /** extra style assign to th */
  headStyle?: Partial<CSSStyleDeclaration | Record<string, string>>;
  /** enable indent for tree level */
  indent?: boolean;
  /** show toggle button
   * Deprecation Warning: The 'toggle' option has been deprecated and will be removed in a future version.
   * Please use the 'toggleOptions' props instead. */
  toggle?: boolean;
  /** hide this column if table width small than this value (only support 'px' unit) */
  aliveMinWidth?: number;
}

export const checkShowColumn = (
  option: XTableEntryOption,
  width: number
): boolean => {
  const { aliveMinWidth } = option;
  // always show the column if not assigning aliveMinWidth
  if (aliveMinWidth === undefined || aliveMinWidth <= width) {
    return true;
  }
  return false;
};

export interface XTableRowItem {
  /** Original item */
  $item: Record<string, unknown>;
  /** Generated key */
  $key: string;
}

export interface XTableRowItemNode extends XTableRowItem {
  /** Tree level */
  $level: number;
  /** Node is expand or not */
  $isExpand: boolean;
  /** Children nodes */
  $children: XTableRowItemNode[];
}

export type XTableStyleOptions = {
  cellVerticalAlign: string;
};

export type XTableShadowOptions = Partial<Record<'top' | 'bottom', boolean>>;

export const getDefaultShadowOptions = () => ({
  top: true,
  bottom: true,
});

export interface XTableToggleOptions {
  /** index with the toggle button
   * replace the deprecate 'option.toggle' */
  toggleIndex: string | null;
  /** set default expand for grouped nodes
   * never set true when toogleIndex is null
   * boolean value: apply to only first level of XTableNode, apply true for deeper levels
   * boolean array: indicate each level of XTableNode to default expand or not
   */
  isDefaultExpand: boolean | boolean[];
}

export interface XTableInteractiveOptions {
  rowColor: string | null;
  columnColor: string | null;
  intersectionColor: string | null;
}
