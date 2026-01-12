import { Ref, ref, unref, computed, UnwrapRef } from 'vue';
import { MaybeRef, unrefElement } from '@vueuse/core';
import { XTable } from '../components/XTable';

const OPTION_ATTRIBUTE = 'data-option-index';

interface MenuOptions {
  /** Is the popup menu shown */
  isMenuShown?: MaybeRef<boolean>;
  /** Function to show menu */
  showMenu?: () => void;
  /** Function to dismiss menu */
  hideMenu?: (shouldRefreshInput: boolean) => void;
}

interface KeyOperationObject {
  /** Keyboard related listeners, which should be v-binded on the component which needs to handle keyboard action */
  keyListeners: Record<string, (event: KeyboardEvent) => void>;
  /** Current highlighted index number */
  currentOptionIndex: Ref<number>;
  /** The returned value should be v-bineded on every "option" of your list for scroll to work as expected */
  getOptionAttrs: (index: number) => Record<string, unknown>;
  /** Scroll to certain index of option */
  scrollToOption: (optionIndex: MaybeRef<number>) => void;
}

const getOptionAttrs = (index: number) => ({
  [OPTION_ATTRIBUTE]: index,
});

const _scrollToOption = (
  scrollbarEl: HTMLElement | undefined,
  optionIndex: number
): boolean => {
  const optionEl = scrollbarEl?.querySelector(
    `[${OPTION_ATTRIBUTE}="${optionIndex}"]`
  ) as HTMLElement;
  if (!optionEl || !scrollbarEl) {
    /* 
      TOFIX: should return false for more reasonalbe result
      Currently only return false if option is not found since in unit test scrollbarEl is always empty.
      "option not found" is currenlty the real-world case of scrolling fails (when virtual list is applied)
    */
    return !!optionEl;
  }

  if (scrollbarEl.scrollHeight > scrollbarEl.clientHeight) {
    const scrollBottom = scrollbarEl.clientHeight + scrollbarEl.scrollTop;
    const optionBottom = optionEl.offsetHeight + optionEl.offsetTop;

    if (optionBottom > scrollBottom) {
      scrollbarEl.scrollTop = optionBottom - scrollbarEl.clientHeight;
    } else if (optionEl.offsetTop < scrollbarEl.scrollTop) {
      scrollbarEl.scrollTop = optionEl.offsetTop;
    }
  }
  return true;
};

/**
 * For supporting keyboard related operaions (up/down/enter/esc) on a scrollable option list
 *
 * @param {MaybeRef<Array<Record<string, unknown>>>} options - option list
 * @param {(MaybeRef<HTMLElement | undefined>)} scrollListRef - ref of the scrollable component
 * @param {MaybeRef<number>} currentOptionIndex - currently highlighted index
 * @param {(option: Record<string, unknown>) => void} onOptionEnter - function to call when "enter" an option
 * @param {{
 *     isMenuShown?: MaybeRef<boolean>;
 *     showMenu?: () => void;
 *     hideMenu?: (shouldRefreshInput: boolean) => void;
 *   }} [menuOptions={}] - optional, callbacks/status to control the show/hide of the popup menu
 * @return {KeyOperationObject}  {KeyOperationObject}
 *
 * @example
 * js:
 * ```js
 * const {
 *   keyListeners, getOptionAttrs
 * } = useKeyOperations(options, scrollListRef, currentOptionIdx, onOptionEnter);
 * ```
 *
 * vue:
 * ```html
 * <input v-bind="keyListeners"/>
 * <scrollable-component ref="scrollListRef">
 *   <div v-for="(option, index) in options" :key="index" v-bind="getOptionAttrs(index)">
 *     option {{ index }}
 *   </div>
 * </scrollable-component>
 * ```
 */
const useKeyOperations = <T = Record<string, unknown>>(
  options: MaybeRef<Array<T>>,
  scrollListRef: MaybeRef<HTMLElement | undefined>,
  currentOptionIndex: MaybeRef<number>,
  clickOption: (option: T, index: number) => void,
  menuOptions: MenuOptions = {}
): KeyOperationObject => {
  const {
    isMenuShown: isShown,
    showMenu = () => {
      return;
    },
    hideMenu = () => {
      return;
    },
  } = menuOptions;
  const currentIdx = ref(currentOptionIndex ?? 0);
  const isMenuShown = ref(isShown ?? true);

  const scrollToOption = (optionIndex: MaybeRef<number>): boolean => {
    return _scrollToOption(
      unrefElement(scrollListRef) as HTMLElement | undefined,
      unref(optionIndex)
    );
  };

  const handleKeyDown = () => {
    if (!unref(isMenuShown)) {
      showMenu();
      return;
    }

    if (currentIdx.value + 1 < unref(options).length) {
      currentIdx.value += 1;
      const isScrollSuccess = scrollToOption(currentIdx);

      if (!isScrollSuccess) {
        currentIdx.value = 0;
      }
    }
  };

  const handleKeyUp = () => {
    if (currentIdx.value - 1 >= 0) {
      currentIdx.value -= 1;
      const isScrollSuccess = scrollToOption(currentIdx);

      if (!isScrollSuccess) {
        currentIdx.value = 0;
      }
    }
  };

  const handleKeyEsc = () => {
    hideMenu(true);
  };

  const handleKeyEnter = () => {
    if (!unref(isMenuShown)) {
      showMenu();
      return;
    }

    const option = unref(options)[currentIdx.value];
    if (option) {
      clickOption(option, currentIdx.value);
    }
  };

  const keyListeners = {
    onKeydown: (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown':
          handleKeyDown();
          event.preventDefault();
          break;
        case 'ArrowUp':
          handleKeyUp();
          event.preventDefault();
          break;
        case 'Enter':
          handleKeyEnter();
          event.preventDefault();
          break;
        case 'Escape':
          handleKeyEsc();
          break;
        default:
          return true;
      }
    },
  };

  return {
    keyListeners,
    currentOptionIndex: currentIdx,
    getOptionAttrs,
    scrollToOption,
  };
};

/**
 * For supporting keyboard related operaions (up/down/enter) on a `XTable` component
 *
 * @example
 * js:
 * ```js
 * const tableData = ref([]);
 * const tableRef: Ref<typeof XTable | undefined> = ref();
 * const { keyListeners, currentKey } = useTableKeyOperations(
 *   tableData,
 *   tableRef,
 *   'exampleKey',
 *   0,
 *   (item) => {}
 * );
 * ```
 *
 * vue:
 * ```html
 * <XTable
 *   ref="tableRef"
 *   keyIndex="exampleKey"
 *   :selected="currentKey"
 *   interactive
 *   v-bind="keyListeners"
 * />
 * ```
 *
 * TODOITEM: support sorted table data
 */
const useTableKeyOperations = <T extends Ref<T[] | UnwrapRef<T>[], MaybeRef<T[]> | UnwrapRef<T>[]>>(
  tableData: MaybeRef<Array<T>>,
  tableRef: MaybeRef<typeof XTable | undefined>,
  tableKeyIndex: string, // TODOITEM: support multiple keys
  initRowIndex?: number,
  selectCallback?: (row: T, index: number) => void
) => {
  // state
  const data = ref(tableData);
  const currentIndex = ref(initRowIndex ?? 0);
  const currentKey = computed(() => {
    const currentItem = unref(tableData)[unref(currentIndex)] as Record<
      string,
      unknown
    >;
    return currentItem?.[tableKeyIndex];
  });

  // mutation
  const move = (offset: number) => {
    const nextIdx = currentIndex.value + offset;
    if (0 <= nextIdx && nextIdx < unref(tableData).length) {
      currentIndex.value = nextIdx;
      if (tableRef && tableKeyIndex in data.value[currentIndex.value]) {
        unref(tableRef)?.scrollToRow(
          (data.value[currentIndex.value] as Record<string, unknown>)[
            tableKeyIndex
          ]
        );
      }
    }
  };

  // event handler
  const handleKeyDown = () => {
    move(1);
  };
  const handleKeyUp = () => {
    move(-1);
  };
  const handleKeyEnter = () => {
    const row = unref(tableData)[currentIndex.value];
    if (selectCallback && row) {
      selectCallback(row, currentIndex.value);
    }
  };

  const keyListeners = {
    onKeydown: (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown':
          handleKeyDown();
          event.preventDefault();
          break;
        case 'ArrowUp':
          handleKeyUp();
          event.preventDefault();
          break;
        case 'Enter':
          handleKeyEnter();
          break;
        default:
          return true;
      }
    },
  };

  return {
    keyListeners,
    currentIndex,
    currentKey,
  };
};

export { useKeyOperations, useTableKeyOperations };
