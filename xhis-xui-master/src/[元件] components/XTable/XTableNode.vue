<template>
  <template v-if="!skeleton">
    <tr
      :ref="assignRef"
      :data-qa-key="`tr-${rowKey}`"
      :class="{
        'x-table-row': true,
        'x-table-row--interactive': isInteractive,
        'x-table-row--selected': isSelected,
        'x-table-row--category': isCategoryHeader,
        'x-table-row--highlight-animation': highlightAnimation,
      }"
      role="row"
      :aria-rowindex="idx"
      @click="!isCategoryHeader && handleRowClick(node, rowKey, $event)"
      @dblclick="!isCategoryHeader && handleDbClick(node, rowKey, $event)"
      @contextmenu="
        !isCategoryHeader && handleContextMenu(node, rowKey, $event)
      "
    >
      <td
        v-for="option in options"
        :key="option.index"
        :data-qa-key="`td-${option.index}`"
        :class="[
          {
            'x-table-td': true,
            'x-table-td--interactive-row':
              isInteractive && rowColor !== null && mouseIndex !== null,
            'x-table-td--interactive-column':
              isInteractive &&
              columnColor !== null &&
              option.index === highlightColumn,
            'x-table-td--interactive-intersection':
              isInteractive &&
              intersectionColor !== null &&
              mouseIndex === option.index,
          },
          option.cellClass,
          customCategoryOptions.tdClass(node, option.index),
        ]"
        :style="getTdStyle(option)"
        role="cell"
        @mouseover="handleMouseover(option.index)"
        @mouseout="handleMouseout(option.index)"
      >
        <template
          v-if="option.toggle || toggleOptions.toggleIndex === option.index"
        >
          <XIconButton
            size="sm"
            data-qa-field="toggle-button"
            data-testid="x-table-tree-node-toggle"
            :aria-expanded="{ isExpand }"
            :icon="isExpand ? 'chevron-down' : 'chevron-right'"
            class="x-table-toggle-btn"
            :style="{
              ['visibility' as string]: (childrenNodes as any).length
                ? 'visible'
                : 'hidden',
              ['min-width' as string]: '32px',
            }"
            @click="
              () => {
                isExpand = !isExpand;
                handleToggleClick(rowKey, option.index, isExpand);
              }
            "
          />
        </template>
        <slot :item="node" :index="option.index" :content="node[option.index]"></slot>
      </td>
    </tr>
  </template>
  <template v-else>
    <tr
      :class="{
        'x-table-row': true,
      }"
      role="row"
    >
      <slot name="loading">
        <td
          role="cell"
          :class="[
            {
              'x-table-td': true,
            },
            customCategoryOptions.tdClass(node, ''),
          ]"
          :style="{ gridColumn: `span ${options.length}` }"
        >
          <div class="loading-skeleton-bar"></div>
        </td>
      </slot>
    </tr>
  </template>
  <template v-if="isExpand">
    <!-- @vue-expect-error -->
    <XTableNode
      v-for="(child, index) in childrenNodes"
      v-slot="{ index: childIndex, item: childItem, content }"
      :key="getItemKey(child)"
      :node="child"
      :level="level + 1"
      :idx="index"
      :rowKey="getItemKey(child)"
      :options="options"
      :custom-category-options="customCategoryOptions"
      :interactive="interactive"
      :childrenKey="childrenKey"
      :selected="selected"
      :key-index="keyIndex"
      :toggle-options="{
        ...toggleOptions,
        isDefaultExpand: isArray(toggleOptions.isDefaultExpand)
          ? toggleOptions.isDefaultExpand
          : (toggleMap.get(getItemKey(child)) ?? true),
      }"
      :highlight-column="highlightColumn"
      :interactive-options="interactiveOptions"
      :lazy-render="lazyRender"
      :skeleton="skeleton"
      :toggleMap="toggleMap"
      @row-click="(...args: any) => $emit('rowClick', ...args)"
      @row-toggle-click="(...args: any) => $emit('rowToggleClick', ...args)"
      @row-double-click="(...args: any) => $emit('rowDoubleClick', ...args)"
      @update-rows-ref-map="
        (...args: any) => $emit('updateRowsRefMap', ...args)
      "
      @row-context-menu="(...args: any) => $emit('rowContextMenu', ...args)"
      @column-mouseover="(...args: any) => $emit('columnMouseover', ...args)"
      @column-mouseout="(...args: any) => $emit('columnMouseout', ...args)"
    >
      <slot :item="childItem" :index="childIndex" :content="content"></slot>
    </XTableNode>
  </template>
</template>
<script lang="ts">
import { isArray } from 'lodash';
import {
  ComponentPublicInstance,
  computed,
  CSSProperties,
  defineComponent,
  PropType,
  ref,
} from 'vue';

import { DataKeyIndex, getKeyIndex } from '../../utils';
import { XIconButton } from '../XIconButton';
import {
  xTableAlignMap,
  XTableEntryOption,
  XTableInteractiveOptions,
  XTableToggleOptions,
} from './XTableConfig';

export default defineComponent({
  name: 'XTableNode',
  components: { XIconButton },
  props: {
    node: {
      type: Object as PropType<Record<string, unknown>>,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
    options: {
      default: (): PropType<XTableEntryOption[]> => [],
      type: Array as PropType<XTableEntryOption[]>,
    },
    idx: {
      type: Number,
      required: true,
    },
    customCategoryOptions: {
      default: () => ({
        isHeader: () => false,
        tdClass: () => '',
      }),
      type: Object,
    },
    decreaseTreeLevel: {
      default: 0,
      type: Number,
    },
    childrenKey: {
      default: undefined,
      type: String,
    },
    interactive: {
      default: false,
      type: Boolean,
    },
    selected: {
      // performance issue
      default: undefined,
      type: String,
    },
    keyIndex: {
      default: undefined,
      type: [Array, String, Function] as PropType<DataKeyIndex>,
    },
    rowKey: {
      type: String,
      required: true,
    },
    highlightAnimation: {
      default: false,
      type: Boolean,
    },
    highlightColumn: {
      default: null,
      type: null as unknown as PropType<string | null>,
    },
    toggleOptions: {
      type: Object as PropType<XTableToggleOptions>,
      default: () => ({
        isDefaultExpand: true,
        toggleIndex: null,
      }),
    },
    toggleMap: {
      type: Object,
      default: () => new Map(),
    },
    skeleton: {
      type: Boolean,
      default: false,
    },
    interactiveOptions: {
      type: Object as PropType<XTableInteractiveOptions>,
      default: () => ({
        rowColor: 'var(--xv-container--surface-hovered)',
        columnColor: null,
        intersectionColor: null,
      }),
    },
    lazyRender: {
      default: false,
      type: Boolean,
    },
  },
  emits: [
    'rowClick',
    'rowDoubleClick',
    'updateRowsRefMap',
    'rowContextMenu',
    'rowToggleClick',
    'columnMouseover',
    'columnMouseout',
  ],
  setup(props, { emit }) {
    const isExpand = ref(
      isArray(props.toggleOptions.isDefaultExpand)
        ? props.toggleOptions.isDefaultExpand[props.level]
        : props.toggleOptions.isDefaultExpand,
    );
    const isCategoryHeader = computed<boolean>(() => {
      return props.customCategoryOptions.isHeader(props.node);
    });

    const rowRef = ref<ComponentPublicInstance | Element | null>(null);

    const handleToggleClick = (
      entry: unknown,
      key: string,
      isExpand: boolean,
    ) => {
      emit('rowToggleClick', entry, key, isExpand);
    };

    const handleRowClick = (entry: unknown, key: string, event: MouseEvent) => {
      emit('rowClick', entry, key, event);
    };

    const handleDbClick = (entry: unknown, key: string, event: MouseEvent) => {
      emit('rowDoubleClick', entry, key, event);
    };

    const handleContextMenu = (
      entry: unknown,
      key: string,
      event: MouseEvent,
    ): void => {
      emit('rowContextMenu', entry, key, event);
    };

    const childrenNodes = computed(() => {
      return (
        ((props.childrenKey && props.node[props.childrenKey]) as unknown[]) ??
        []
      );
    });

    const getItemKey = (item: Record<string, unknown>) => {
      const fallbackIndex = props.options[0].index;
      return String(getKeyIndex(props.keyIndex, item, fallbackIndex));
    };

    const assignRef = (element: ComponentPublicInstance | Element | null) => {
      emit('updateRowsRefMap', props.rowKey, element);
      rowRef.value = element;
    };

    const getTdStyle = (option: XTableEntryOption) => {
      const { cellStyle, align = 'middle', indent } = option;
      const style: CSSProperties = {
        ['--x-table-cell-align' as string]: xTableAlignMap[align],
        ...(cellStyle as CSSProperties),
      };

      if (indent) {
        const indentSize = 16;

        const baseDistance = cellStyle?.paddingLeft ?? '1rem';
        const indentDistance = `${
          Math.max(props.level - props.decreaseTreeLevel, 0) * indentSize
        }px`;
        style.paddingLeft = `calc(${baseDistance} + ${indentDistance})`;
      }

      return style;
    };

    const mouseIndex = ref<string | null>(null);

    const handleMouseover = async (index: string) => {
      emit('columnMouseover', index);
      mouseIndex.value = index;
    };

    const handleMouseout = (index: string) => {
      emit('columnMouseout', index);
      mouseIndex.value = null;
    };

    const rowColor = computed(() => props.interactiveOptions.rowColor);
    const columnColor = computed(() => props.interactiveOptions.columnColor);
    const intersectionColor = computed(
      () => props.interactiveOptions.intersectionColor,
    );

    const isSelected = computed(() => {
      return !isCategoryHeader.value && props.selected === props.rowKey;
    });

    const isInteractive = computed(() => {
      return !isSelected.value && props.interactive && !isCategoryHeader.value;
    });

    return {
      assignRef,
      isExpand,
      isCategoryHeader,
      handleRowClick,
      handleToggleClick,
      handleDbClick,
      handleContextMenu,
      handleMouseover,
      handleMouseout,
      xTableAlignMap,
      getTdStyle,
      getItemKey,
      childrenNodes,
      rowColor,
      columnColor,
      intersectionColor,
      mouseIndex,
      isSelected,
      isInteractive,
      isArray,
    };
  },
});
</script>

<style lang="scss" scoped>
.x-table-td--interactive-row {
  background-color: v-bind(rowColor);
}

.x-table-td--interactive-column {
  background-color: v-bind(columnColor);
}

.x-table-td--interactive-intersection {
  background-color: v-bind(intersectionColor);
}

.loading-skeleton-bar {
  width: 100%;
  height: 24px;
  border-radius: 6px;
  background-color: var(--xv-container--disabled-background);
}
</style>
