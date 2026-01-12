import { PropType } from 'vue';
import { DataKeyIndex } from '../../utils';
/**
 * XAutocomplete menu item
 */
export type AutocompleteOption<T = unknown> = {
  /** label to show in option */
  label: string;
  /** value to used in select value, should be unique */
  value: T;
  /** value to disable current option */
  disabled?: boolean;
};

export interface AutocompleteFilterParams {
  /** text to query */
  queryText: string;
  /** option from option list */
  option: Record<string, unknown>;
  /** option label, retrieved from prop of "getOptionLabel" */
  optionLabel: string;
}

export const autocompleteMenuProps = {
  menuAttrs: {
    type: Object as PropType<Record<string, unknown>>,
    default: (): Record<string, unknown> => ({}),
  },
  getOptionAttrs: {
    type: Function as PropType<
      (
        option: Record<string, unknown>,
        index: number
      ) => Record<string, unknown>
    >,
    default: (): Record<string, unknown> => ({}),
  },
  options: {
    type: Array as PropType<Record<string, unknown>[]>,
    default: (): Record<string, unknown>[] => [],
  },
  keyIndex: {
    type: [Array, String, Function] as PropType<DataKeyIndex>,
    default: 'value',
  },
  size: {
    type: String as PropType<'sm' | 'md'>,
    default: 'md',
  },
};

export const getOptionSlotParams = (
  option: Record<string, unknown>,
  index: number
): Record<string, unknown> => ({
  option,
  index,
});
