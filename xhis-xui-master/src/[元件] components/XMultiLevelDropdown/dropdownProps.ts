import { Props as TippyProps } from 'tippy.js';

import { UseTippyBoundingOptions } from './composables/useTippyBounding';
import {
  XMultiLevelDropdownItemGroup,
  XMultiLevelDropdownSize,
} from './dropdown';

export type DropdownProps = {
  size?: XMultiLevelDropdownSize;
  disabled?: boolean;
  menuMaxHeight?: string;
  menuMaxWidth?: string;
  menuMinWidth?: string;
  itemGroups?: XMultiLevelDropdownItemGroup[];
  options?: Partial<TippyProps>;
  menuOptions?: Partial<TippyProps>;
  /**
   * The options for setting the padding between tippy and viewport bounding
   */
  tippyBoundingOptions?: UseTippyBoundingOptions;
  menuDebounceWait?: number;
  lazyLoading?: boolean;
  /**
   * Whether dropdown is teleported to the body
   */
  teleport?: boolean;
  hideOnClick?: boolean;
};
