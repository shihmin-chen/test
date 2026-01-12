<template>
  <draggable
    class="x-draggable-list x-scroll-bar"
    :class="{
      [`x-list--${size}`]: true,
      [`x-list-p-0`]: noPadding,
      'x-scroll-bar-lg': scrollBarSize === 'lg',
    }"
    :style="{
      ['--x-list-max-w' as string]: maxWidth,
      ['--x-list-min-w' as string]: minWidth,
      ['--x-list-max-h' as string]: maxHeight,
    }"
    role="list"
    tag="section"
    ghostClass="x-list-item-placeholder"
    :list="list"
    :itemKey="itemKey"
    :handle="handle"
    :move="onMove"
    :animation="200"
    :scroll-sensitivity="30"
    :force-fallback="true"
    @start="onMoveStart"
    @end="onMoveEnd"
  >
    <template #item="{ element, index }">
      <div>
        <slot name="item" :element="element" :index="index"></slot>
      </div>
    </template>
    <!-- We do not use ul as root el for this possible issue: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listitem_role#best_practices -->
  </draggable>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import draggable from 'vuedraggable';
import { DraggableEvent, DraggableMoveEvent } from './draggable';

export default defineComponent({
  name: 'XDraggableList',
  components: { draggable },
  props: {
    maxWidth: {
      default: 'unset',
      type: String,
    },
    minWidth: {
      default: '0',
      type: String,
    },
    maxHeight: {
      default: 'unset',
      type: String,
    },
    size: {
      default: 'md',
      type: String as PropType<'sm' | 'md'>,
    },
    noPadding: {
      default: false,
      type: Boolean,
    },
    list: {
      default: () => [],
      type: Array,
    },
    itemKey: {
      type: String,
      required: true,
    },
    handle: {
      type: String,
      default: '',
    },
    scrollBarSize: {
      default: 'md',
      type: String as PropType<'md' | 'lg'>,
    },
  },
  emits: ['moveItem', 'moveItemStart', 'moveItemEnd'],
  setup(_props, { emit }) {
    const onMove = (event: DraggableMoveEvent, mouseEvent: MouseEvent) => {
      emit('moveItem', event, mouseEvent);
    };

    const setDragCursor = (value: boolean) => {
      const html = document.getElementsByTagName('html').item(0);
      if (html) {
        html.classList.toggle('x-list-item-grabbing', value);
      }
    };

    const onMoveStart = (event: DraggableEvent) => {
      emit('moveItemStart', event);
      setDragCursor(true);
    };

    const onMoveEnd = (event: DraggableEvent) => {
      emit('moveItemEnd', event);
      setDragCursor(false);
    };

    return { onMove, onMoveStart, onMoveEnd };
  },
});
</script>

<style lang="scss">
.x-draggable-list {
  overflow-y: auto;
  padding: 0.5rem 0;

  min-width: var(--x-list-min-w);
  max-width: var(--x-list-max-w);
  max-height: var(--x-list-max-h);

  &-p-0 {
    padding: 0;
  }
}
.x-list-item-placeholder {
  opacity: 0.2;
}
.x-list-item-grabbing * {
  cursor: grabbing !important;
}
</style>
