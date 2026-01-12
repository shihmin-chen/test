import type { ComputedRef, Ref } from 'vue';
import { ref, watch, nextTick } from 'vue';
import { debounce } from 'lodash';

/**
 * @description
 * 1. itemHeight: 每個元件的高度, 可以是固定的數值或是動態計算的函式
 * 2. overscan: 可視範圍外的 buffer 高度, 預設為 0, 傳入 100 代表除了可是範圍外, 上下各多 100px 的 buffer
 * 3. throttleMs: 計算可視範圍的 debounce 時間, 預設為 200ms
 * 3. skeletonHeight: buffer 的 skeleton background image height, 預設為 45
 */
export interface UseTableVirtualListOptions {
  itemHeight: number | ((index: number) => number);
  overscan?: number;
  throttleMs?: number;
  skeletonHeight?: number;
}

type TableData = Record<string, unknown>;
export interface UseTableVirtualListReturn {
  visibleData: Ref<TableData[]>;
  initData: () => Promise<void>;
  debounceCalculateVisibleData: () => void;
}

/**
 * Custom composable function for virtual list rendering in a table.
 *
 * @param containerRef - Reference to the container element which is calculate element.
 * @param wrapperRef - Reference to the wrapper element which is container's parent element.
 * @param sourceList - Computed reference to the source list of table data.
 * @param options - Options for configuring the virtual list behavior.
 * @returns An object containing the visible data `visibleData`, initialization function `initData`, and debounced calculateVisibleData function `debounceCalculateVisibleData`.
 */
export const useVirtualList = (
  containerRef: Ref<HTMLElement | undefined>,
  wrapperRef: Ref<HTMLElement | undefined>,
  sourceList: ComputedRef<TableData[]>,
  options: UseTableVirtualListOptions
): UseTableVirtualListReturn => {
  const visibleData = ref<TableData[]>([]);
  const rowsScrollTop = ref<number[]>([]);
  const bodyMaxHeight = ref(0);

  const initRowHeight = () => {
    // 紀錄每個元件的 scrollTop
    // 第一個 item 的 scrollTop 為 0
    // 第二個 item 的 scrollTop 為 第一個 item 的高度
    // 第三個 item 的 scrollTop 為 第一個 item + 第二個 item 的高度 ...
    const newRowsScrollTop: number[] = [0];

    sourceList.value.forEach((_, index) => {
      const scrollTop =
        typeof options.itemHeight === 'number'
          ? options.itemHeight // static height
          : options.itemHeight(index); // dynamic height

      newRowsScrollTop.push(newRowsScrollTop[index] + scrollTop);
    });

    // 紀錄每個元件的 scrollTop
    rowsScrollTop.value = newRowsScrollTop;

    // 整個 body 的高度
    bodyMaxHeight.value = newRowsScrollTop.pop() ?? 0;
  };

  const calculateVisibleData = () => {
    const table = containerRef.value;
    const tableWrapper = wrapperRef.value;
    if (!table || !tableWrapper) {
      return;
    }
    const scrollTop = table.scrollTop;
    const sourceEnd = sourceList.value.length - 1;
    const overscan = options.overscan ?? 0;

    // 可視範圍
    const visibleTop = scrollTop - overscan;
    const visibleBottom = scrollTop + tableWrapper.offsetHeight + overscan;

    // 用二分法找出可視範圍的開始索引
    let left = 0;
    let right = sourceEnd;
    let mid = 0;
    while (left <= right) {
      mid = Math.floor((left + right) / 2);
      const midVal = getOffsetTop(mid);
      if (midVal < visibleTop) {
        const midNextVal = getOffsetTop(mid + 1);
        if (midNextVal > visibleTop) {
          break;
        }
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    const start = mid;

    // 計算可視範圍的結束索引
    let end = sourceEnd;
    for (let i = start + 1; i <= sourceEnd; i++) {
      const offsetTop = getOffsetTop(i);
      if (offsetTop >= visibleBottom) {
        end = i;
        break;
      }
    }

    // 可視範圍的資料
    visibleData.value = sourceList.value.slice(start, end + 1);

    // 可視範圍的上下 buffer 高度
    const bufferTop = getOffsetTop(mid);
    const bufferBottom = bodyMaxHeight.value - getOffsetTop(end + 1);
    table.style.setProperty('--x-table-buffer-start', `${bufferTop}px`);
    table.style.setProperty('--x-table-buffer-end', `${bufferBottom}px`);
    table.style.setProperty(
      '--x-table-buffer-skeleton-height',
      `${options.skeletonHeight ?? 45}px`
    );
  };

  const getOffsetTop = (index: number) => {
    return rowsScrollTop.value[index];
  };

  const debounceCalculateVisibleData = debounce(
    calculateVisibleData,
    options.throttleMs ?? 200
  );

  const initData = async () => {
    await nextTick(() => {
      initRowHeight();
      calculateVisibleData();
    });
  };

  watch(
    [sourceList, containerRef, wrapperRef],
    async () => {
      await initData();
    },
    { immediate: true }
  );

  return {
    visibleData,
    initData,
    debounceCalculateVisibleData,
  };
};
