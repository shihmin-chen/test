import { XChipSize } from '../XChip/chip';

export type XChipGroupSize = XChipSize;
export type XChipGroupSelectMode = 'single' | 'multi';

export interface XChipGroupTooltip {
  visible: boolean;
  label: string;
}

/**
 * XChipGroup item
 */
export interface XChipGroupItem {
  key: string;
  label: string;
  disabled?: boolean;
  tooltip?: XChipGroupTooltip;
}
