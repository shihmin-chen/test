<template>
  <div
    ref="wrapperRef"
    :key="componentKey"
    data-qa-xui="XTable"
    class="x-table-wrap"
  >
    <table
      ref="tableRef"
      class="x-table x-scroll-bar"
      :class="{
        'x-scroll-bar-lg': scrollBarSize === 'lg',
        'has-border': bordered,
      }"
      aria-label="table"
      :style="{
        ['--x-table-columns-number' as string]: tableColumnsNumber,
        ['--x-table-grid-area' as string]: tableGridArea,
        ...(styleOptions.cellVerticalAlign && {
          ['--x-table-cell-vertical-align' as string]:
            styleOptions.cellVerticalAlign,
        }),
        gridTemplateColumns,
        ...tableStyle,
      }"
      role="table"
      @scroll="
        (...args: any) => {
          debounceCalculateVisibleData();
          $emit('scroll', ...args);
        }
      "
    >
      <thead
        v-if="!noHeader"
        ref="headerRef"
        class="x-table-head"
        role="rowheader"
      >
        <th
          v-for="row in displayedOptions"
          :key="row.index"
          :data-qa-key="`th-${row.index}`"
          :class="{
            'x-table-th': true,
            'x-table-th-highlight':
              isHeaderInteractive && row.index === highlightColumn,
            'x-table-th--sortable': !!row.sort,
            [row.headClass as string]: row.headClass || undefined,
          }"
          :style="{
            justifyContent: xTableAlignMap[row.align ?? 'middle'],
            ['--x-table-top-shadow' as string]: topShadow ? 1 : 0,
            ...(row.headStyle as Record<string, string>),
          }"
          role="columnheader"
          @click="row.sort && handleSortChange(row.index, row.sort)"
        >
          <slot
            :name="`titleCell-${row.index}`"
            :index="row.index"
            :title="row.title"
          >
            <slot name="titleCell" :index="row.index" :title="row.title">
              {{ row.title }}
            </slot>
          </slot>
          <template v-if="row.sort">
            <XTableSortArrow
              :is-sorted="sortStatus.index === row.index"
              :reversed="sortStatus.reverse"
            />
          </template>

          <template v-if="row.desc">
            <XTableDescMark :desc="row.desc" />
          </template>
        </th>
      </thead>
      <div
        class="x-table-top-shadow"
        :style="{
          ['--x-table-top-shadow' as string]: topShadow ? 1 : 0,
          ['--x-table-top-shadow-top-position' as string]: topShadowHeight,
        }"
      />
      <div
        v-if="isEnableVirtualList"
        class="x-table-buffer x-table-buffer--start"
      />
      <tbody class="x-table-body">
        <template v-for="(item, index) in visibleData" :key="getItemKey(item)">
          <!-- @vue-ignore -->
          <XTableNode
            v-slot="{ index: optionIndex, item: optionItem, content }"
            :node="item"
            :level="0"
            :idx="index"
            :rowKey="getItemKey(item)"
            :options="displayedOptions"
            :custom-category-options="customCategoryOptions"
            :interactive="interactive"
            :childrenKey="childrenKey"
            :selected="selected"
            :key-index="keyIndex"
            :highlight-animation="shouldHighlightRow(getItemKey(item))"
            :highlight-column="highlightColumn"
            :toggle-options="{
              ...toggleOptions,
              isDefaultExpand:
                toggleMap.get(getItemKey(item)) ??
                toggleOptions.isDefaultExpand,
            }"
            :interactive-options="interactiveOptions"
            :lazy-render="lazyRender"
            :skeleton="lazyRender && !showConfigs[index]"
            :toggleMap="toggleMap"
            @row-click="handleRowClick"
            @row-toggle-click="handleToggleClick"
            @row-double-click="
              (...args: any) => $emit('rowDoubleClick', ...args)
            "
            @update-rows-ref-map="updateRowsRefMap"
            @row-context-menu="
              (...args: any) => $emit('rowContextMenu', ...args)
            "
            @column-mouseover="handleColumnMouseover"
            @column-mouseout="handleColumnMouseout"
          >
            <slot
              :key="getItemKey(item)"
              :name="`cell-${optionIndex}`"
              :item="optionItem"
              :content="content"
              :index="optionIndex"
            >
              <slot
                :key="getItemKey(item)"
                name="cell"
                :item="optionItem"
                :content="content"
                :index="optionIndex"
              >
                {{ content }}
              </slot>
            </slot>
          </XTableNode>
        </template>
      </tbody>
      <div
        v-if="isEnableVirtualList"
        class="x-table-buffer x-table-buffer--end"
        :style="{ gridColumn: `span ${displayedOptions.length}` }"
      />
    </table>
    <div
      data-testid="x-table-bottom-shadow"
      class="x-table-bottom-shadow"
      :style="{
        ['--x-table-bottom-shadow' as string]: bottomShadow ? 70 : 0,
        paddingBottom: isHorizontalScroll ? '14px' : '0px',
      }"
    />
  </div>
</template>
<script lang="ts">
import {
  ComponentPublicInstance,
  CSSProperties,
  PropType,
  computed,
  defineComponent,
  nextTick,
  ref,
  toRefs,
  unref,
  watch,
} from 'vue';

import { useHotkey } from '../../composable';
import { useSort } from '../../shared/useSort';
import { ActionID, DataKeyIndex, getKeyIndex } from '../../utils';
import { UseTableVirtualListOptions, useVirtualList } from './composables/useVirtualList';
import useHighlightRow from './useHighlightRow';
import { useLazyLoading } from './useLazyLoading';
import { useRwd } from './useRwd';
import { scrollToTableRow, ScrollToTableRowPosition } from './useScrollToRow';
import useShadow from './useShadow';
import './XTable.scss';
import {
  XTableEntryOption,
  XTableStyleOptions,
  XTableShadowOptions,
  XTableInteractiveOptions,
  XTableToggleOptions,
  getDefaultShadowOptions,
  xTableAlignMap
} from './XTableConfig';
import XTableDescMark from './XTableDescMark.vue';
import XTableNode from './XTableNode.vue';
import XTableSortArrow from './XTableSortArrow.vue';

export default defineComponent({
  name: 'XTable',
  components: { XTableNode, XTableSortArrow, XTableDescMark },
  props: {
    data: {
      default: () => [],
      type: Array as PropType<Record<string, unknown>[]>,
    },
    options: {
      default: () => [],
      type: Array as PropType<XTableEntryOption[]>,
    },
    interactive: {
      default: false,
      type: Boolean,
    },
    noHeader: {
      default: false,
      type: Boolean,
    },
    keyIndex: {
      default: undefined,
      type: [Array, String, Function] as PropType<DataKeyIndex>,
    },
    selected: {
      default: undefined,
      type: String,
    },
    alwaysKeepSort: {
      default: false,
      type: Boolean,
    },
    defaultSortIndex: {
      default: undefined,
      type: String,
    },
    reverseSort: {
      default: false,
      type: Boolean,
    },
    styleOptions: {
      default: () => ({}),
      type: Object as PropType<Partial<XTableStyleOptions>>,
    },
    tableStyle: {
      default: () => ({}),
      type: Object as PropType<CSSProperties>,
    },
    enableShadow: {
      default: false,
      type: Boolean,
    },
    shadowOptions: {
      default: getDefaultShadowOptions(),
      type: Object as PropType<XTableShadowOptions>,
    },
    customCategoryOptions: {
      default: () => ({
        isHeader: () => false,
        tdClass: () => '',
      }),
      type: Object,
    },
    childrenKey: {
      default: undefined,
      type: String,
    },
    decreaseTreeLevel: {
      default: 0,
      type: Number,
    },
    postSort: {
      default: undefined,
      type: Function as PropType<
        <T>(rowA: Record<string, T>, rowB: Record<string, T>) => number
      >,
    },
    toggleOptions: {
      type: Object as PropType<XTableToggleOptions>,
      default: () => ({
        isDefaultExpand: true,
        toggleIndex: null,
      }),
    },
    interactiveOptions: {
      type: Object as PropType<XTableInteractiveOptions>,
      default: () => ({
        rowColor: 'var(--xv-container--surface-hovered)',
        columnColor: null,
        intersectionColor: null,
      }),
    },
    scrollBarSize: {
      default: 'md',
      type: String as PropType<'md' | 'lg'>,
    },
    lazyRender: {
      default: false,
      type: Boolean,
    },
    /**
     * The options for calculating virtual list range. If undefined, disable virtual list
     */
    virtualOptions: {
      type: Object as PropType<UseTableVirtualListOptions>,
      default: undefined,
    },
    enableHotkey: {
      type: Boolean,
      default: false,
    },
    bordered:{
      type: Boolean,
      default: false,
    }
  },
  emits: [
    'rowClick',
    'rowDoubleClick',
    'rowContextMenu',
    'scroll',
    'rowToggleClick',
    'keyEnter',
    'update:selected',
  ],
  setup(props, { expose, emit }) {
    const { sortedData, sortStatus, handleSortChange } = useSort(
      computed(() => props.data),
      {
        index: props.defaultSortIndex,
        reverse: props.reverseSort,
        type:
          props.options.find((v) => v.index === props.defaultSortIndex)?.sort ??
          'string',
        childrenKey: props.childrenKey,
        alwaysKeepSort: props.alwaysKeepSort,
      },
      props.postSort,
    );

    const tableRef = ref<HTMLElement>();
    const headerRef = ref<HTMLElement>();
    const wrapperRef = ref<HTMLElement>();

    const toggleMap = new Map();

    const rowsRefMap = ref<
      Record<string, Element | null | ComponentPublicInstance>
    >({});

    const scrollToRow = (
      key: string,
      { position = 'start' }: { position?: ScrollToTableRowPosition } = {
        position: 'start',
      },
    ) => {
      const rowElem = rowsRefMap.value[key];

      if (!(rowElem instanceof HTMLElement)) {
        return;
      }

      return scrollToTableRow({
        tableElem: tableRef.value,
        headerElem: headerRef.value,
        rowElem,
        position,
      });
    };

    const { shouldHighlightRow, highlightRow } = useHighlightRow();
    const {
      data,
      enableShadow,
      shadowOptions,
      options,
      lazyRender,
      selected,
      enableHotkey,
    } = toRefs(props);
    const headerDefaultHeight = !props.noHeader ? 40 : 0;

    const {
      toggleShadow,
      topShadow,
      bottomShadow,
      topShadowHeight,
      isHorizontalScroll,
    } = useShadow({
      data,
      enableShadow,
      targetRef: tableRef,
      tableHeaderRef: headerRef,
      tableHeaderDefaultHeight: headerDefaultHeight,
      shadowOptions,
    });

    const {
      displayedOptions,
      tableColumnsNumber,
      gridTemplateColumns,
      tableGridArea,
    } = useRwd(tableRef, options);

    // virtual list
    const isEnableVirtualList = props.virtualOptions !== undefined;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const emptyFunc = () => {};
    const { visibleData, debounceCalculateVisibleData, initData } =
      isEnableVirtualList
        ? useVirtualList(tableRef, wrapperRef, sortedData, props.virtualOptions)
        : {
            visibleData: sortedData,
            debounceCalculateVisibleData: emptyFunc,
            initData: emptyFunc,
          };

    const handleToggleClick = async (
      entry: unknown,
      key: string,
      isExpand: boolean,
    ) => {
      await nextTick();
      toggleShadow();
      emit('rowToggleClick', entry, key, isExpand);
      toggleMap.set(entry, isExpand);
      if (isEnableVirtualList) {
        await initData();
      }
    };

    const componentKey = ref(0);
    const forceUpdate = async () => {
      componentKey.value += 1;
      await nextTick();
    };

    const getSelectedIndex = () => {
      return currentSelectedIndex.value;
    };

    expose({
      sortedData,
      scrollToRow,
      toggleShadow,
      highlightRow,
      forceUpdate,
      getSelectedIndex,
    });

    const getItemKey = (item: Record<string, unknown>) => {
      const fallbackIndex = props.options[0].index;
      return String(getKeyIndex(props.keyIndex, item, fallbackIndex));
    };

    const updateRowsRefMap = (
      key: string,
      element: ComponentPublicInstance | Element | null,
    ) => {
      rowsRefMap.value[key] = element;
    };

    const handleRowClick = (
      entry: unknown,
      key: string,
      event: MouseEvent,
    ): void => {
      const targetIndex = sortedData.value.findIndex((item) => item === entry);
      currentSelectedIndex.value = targetIndex;
      emit('rowClick', entry, key, event);
    };

    const highlightColumn = ref<null | string>(null);
    const handleColumnMouseover = (index: string) => {
      highlightColumn.value = index;
    };

    const handleColumnMouseout = (index: string) => {
      if (highlightColumn.value === index) {
        highlightColumn.value = null;
      }
    };

    const columnColor = computed(() => props.interactiveOptions.columnColor);

    const isHeaderInteractive = computed(() => {
      return props.interactive && props.interactiveOptions.columnColor !== null;
    });

    const { showConfigs } = useLazyLoading(data, lazyRender);

    const currentSelectedIndex = ref(-1);
    const selectedData = computed(
      () => sortedData.value[currentSelectedIndex.value],
    );
    const selectedItemKey = computed(() => getItemKey(selectedData.value));

    watch(selected, () => {
      if (!selected.value) {
        currentSelectedIndex.value = -1; // reset
      } else {
        // update currentSelectedIndex
        const targetIndex = sortedData.value.findIndex(
          (item) => getItemKey(item) === selected.value,
        );
        currentSelectedIndex.value = targetIndex;
      }
    });

    const move = (offset: number): void => {
      const list = unref(sortedData);
      const nextRowIndex = currentSelectedIndex.value + offset;

      if (0 <= nextRowIndex && nextRowIndex < list.length) {
        currentSelectedIndex.value = nextRowIndex;
        const currentSelectedKey = getItemKey(selectedData.value);
        scrollToRow(currentSelectedKey, { position: 'center' });
      }
    };

    const handleKeyEnter = (): void => {
      if (selectedData.value) {
        emit('keyEnter', selectedData.value, selectedItemKey.value);
      }
    };

    const handleArrowDown = (): void => {
      move(1);
      if (selectedData.value) {
        emit('update:selected', selectedData.value, selectedItemKey.value);
      }
    };

    const handleArrowUp = (): void => {
      move(-1);
      if (selectedData.value) {
        emit('update:selected', selectedData.value, selectedItemKey.value);
      }
    };

    const { setupHotkey } = useHotkey();
    const disableHotkey = computed(() => !enableHotkey.value);
    setupHotkey([
      {
        actionId: ActionID.arrowUp,
        disabled: disableHotkey,
        preventDefault: true,
        handler: handleArrowUp,
      },
      {
        actionId: ActionID.arrowDown,
        disabled: disableHotkey,
        preventDefault: true,
        handler: handleArrowDown,
      },
      {
        actionId: ActionID.enter,
        disabled: disableHotkey,
        preventDefault: true,
        handler: handleKeyEnter,
      },
    ]);

    return {
      componentKey,
      scrollToRow,
      topShadow,
      tableRef,
      wrapperRef,
      rowsRefMap,
      handleSortChange,
      forceUpdate,
      toggleShadow,
      bottomShadow,
      headerRef,
      xTableAlignMap,
      sortedData,
      sortStatus,
      getItemKey,
      updateRowsRefMap,
      topShadowHeight,
      isHorizontalScroll,
      handleToggleClick,
      shouldHighlightRow,
      displayedOptions,
      tableColumnsNumber,
      gridTemplateColumns,
      tableGridArea,
      handleRowClick,
      handleColumnMouseover,
      handleColumnMouseout,
      highlightColumn,
      columnColor,
      isHeaderInteractive,
      selectedData,
      showConfigs,
      isEnableVirtualList,
      getSelectedIndex,
      visibleData,
      debounceCalculateVisibleData,
      toggleMap,
    };
  },
});
</script>

<style scoped>
.x-table-th-highlight {
  --x-table-th-bg-color: v-bind(columnColor);
}
</style>
