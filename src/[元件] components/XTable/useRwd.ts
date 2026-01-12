import { useResizeObserver } from '@vueuse/core';
import { computed, ref, Ref } from 'vue';

import { XTableEntryOption } from './index';

export const useRwd = (
  tableRef: Ref<HTMLElement | undefined>,
  options: Ref<XTableEntryOption[]>,
) => {
  const tableWidth = ref(0);

  useResizeObserver(tableRef, (entries) => {
    const entry = entries[0];
    const { width } = entry.contentRect;
    tableWidth.value = width;
  });

  const checkShowColumn = (option: XTableEntryOption): boolean => {
    const { aliveMinWidth } = option;
    // always show the column if not assigning aliveMinWidth
    if (aliveMinWidth === undefined || aliveMinWidth <= tableWidth.value) {
      return true;
    }
    return false;
  };

  const displayedOptions = computed(() =>
    options.value.filter((option) => checkShowColumn(option)),
  );

  const tableColumnsNumber = computed(() => displayedOptions.value.length);

  const defaultValue = 'auto';
  const gridTemplateColumns = computed(
    () =>
      displayedOptions.value
        .map((option) => option?.width ?? defaultValue)
        .join(' ') || defaultValue,
  );

  const tableGridArea = computed(() => {
    const repeatNumber = tableColumnsNumber.value;
    const header = 'header '.repeat(repeatNumber);
    const topShadow = 'shadow '.repeat(repeatNumber);
    const body = 'body '.repeat(repeatNumber);
    const bufferStart = 'buffer-start '.repeat(repeatNumber);

    return `"${header}" "${topShadow}" "${bufferStart}" "${body}" `;
  });

  return {
    displayedOptions,
    tableColumnsNumber,
    gridTemplateColumns,
    tableGridArea,
  };
};
