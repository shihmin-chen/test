<template>
  <div class="x-chip-group" data-testid="x-chip-group">
    <XChip
      v-for="item in items"
      :key="item.key"
      :checked="isSelected(item)"
      :size="size"
      :hideCheckmark="hideCheckmark"
      :customPrefixIcon="customPrefixIcon"
      :outline="outline"
      :disabled="item.disabled"
      @update:checked="onCheckedChange(item, $event)"
    >
      <XTooltip v-if="item.tooltip?.visible" :content="item.tooltip?.label">
        {{ item.label }}
      </XTooltip>
      <div v-else>{{ item.label }}</div>
    </XChip>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import XChip from '../XChip/XChip.vue';
import { XTooltip } from '../XTooltip/';
import {
  XChipGroupItem,
  XChipGroupSelectMode,
  XChipGroupSize,
} from './chipGroup';

export default defineComponent({
  name: 'XChipGroup',
  components: {
    XChip,
    XTooltip,
  },
  props: {
    selected: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    hideCheckmark: {
      type: Boolean,
      default: false,
    },
    customPrefixIcon: {
      type: String,
      default: '',
    },
    items: {
      type: Array as PropType<XChipGroupItem[]>,
      default: () => [],
    },
    size: {
      type: String as PropType<XChipGroupSize>,
      default: 'md',
    },
    outline: {
      type: Boolean,
      default: false,
    },
    selectMode: {
      type: String as PropType<XChipGroupSelectMode>,
      default: 'single',
    },
  },
  emits: ['update:selected'],
  setup(props, { emit }) {
    const getItemIndex = (item: XChipGroupItem) =>
      props.selected.findIndex((selectedKey) => selectedKey === item.key);

    const isSelected = (item: XChipGroupItem) => getItemIndex(item) !== -1;

    const onCheckedChange = (item: XChipGroupItem, checked: boolean) => {
      const result = props.selectMode === 'single' ? [] : [...props.selected];
      if (checked) {
        // Add to selected list
        result.push(item.key);
      } else {
        // Remove from selected list if it exists
        const index = getItemIndex(item);
        if (index !== -1) {
          result.splice(index, 1);
        }
      }
      emit('update:selected', result);
    };

    return {
      isSelected,
      onCheckedChange,
    };
  },
});
</script>

<style lang="scss">
.x-chip-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
