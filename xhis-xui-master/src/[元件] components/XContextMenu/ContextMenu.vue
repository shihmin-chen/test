<template>
  <XList ref="contextMenuRef" @click="hideContextMenu">
    <template
      v-for="(menuItemGroup, menuItemGroupIndex) of contextMenuItemGroups"
      :key="menuItemGroupIndex"
    >
      <div
        v-if="menuItemGroupIndex !== 0"
        class="m-x-4 m-y-2 border-0 border-t-1 border-color-[var(--xv-text--dividing-line)] border-solid"
      />
      <XListItem
        v-for="(menuItem, menuItemIndex) of menuItemGroup.items"
        :key="menuItemIndex"
        :disabled="menuItem.disabled ?? false"
        @click="menuItem?.callback"
        @mousedown="(e) => handleMouseDown(e, menuItem)"
      >
        {{ menuItem.name }}
      </XListItem>
    </template>
  </XList>
</template>
<script setup lang="ts">
import { Props } from 'tippy.js';

import XList from '../XList/XList.vue';
import XListItem from '../XList/XListItem.vue';

import { useContextMenu } from './composables/useContextMenu';
import { ContextMenuItem, ContextMenuItemGroup } from './types/contextMenu';

// props & emit
const props = defineProps<{
  contextMenuItemGroups: ContextMenuItemGroup[];
  disabled?: boolean;
  tippyOptions?: Partial<Props>;
}>();

// context menu
const { contextMenuRef, handleContextMenu, hideContextMenu } = useContextMenu(
  props.disabled,
  props.tippyOptions,
);

// event handlers
const handleMouseDown = (e: MouseEvent, menuItem: ContextMenuItem) => {
  if (e.button === 0) {
    // mouseDownCallback only fires when the left button is pressed
    // ref: https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/button
    menuItem.mouseDownCallback?.();
  }
};

// expose
defineExpose({ handleContextMenu, hideContextMenu });
</script>
