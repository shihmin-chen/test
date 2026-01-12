<template>
  <component
    :is="component"
    :class="{
      'x-list-item-icon': true,
      [`x-list-item-icon--${position}`]: true,
      [`x-list-item-icon--${size}`]: true,
    }"
    v-bind="$attrs"
  >
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import XIcon from '../XIcon/XIcon.vue';

export const avaiablePositions = ['front', 'back'] as const;
export type AvailablePosition = typeof avaiablePositions[number];

export default defineComponent({
  name: 'XListItemIcon',
  components: { XIcon },
  props: {
    size: {
      type: String as PropType<'sm' | 'md'>,
      default: 'md',
    },
    position: {
      type: String as PropType<AvailablePosition>,
      default: 'front',
    },
    component: {
      type: [String, Object],
      default: 'XIcon',
    },
  },
});
</script>

<style lang="scss">
.x-list-item-icon {
  flex-shrink: 0;
  &--front {
    --x-list-item-icon-ml: -4px;
    &.x-list-item-icon--md {
      --x-list-item-icon-mr: 12px;
    }
    &.x-list-item-icon--sm {
      --x-list-item-icon-mr: 8px;
    }
  }
  &--back {
    --x-list-item-icon-ml: auto;
    --x-list-item-icon-mr: -4px;
  }

  &--md {
    --x-list-item-icon-size: 24px;
    &.x-list-item-icon--back {
      --x-list-item-icon-size: 20px;
    }
  }
  &--sm {
    --x-list-item-icon-size: 20px;
    &.x-list-item-icon--back {
      --x-list-item-icon-size: 16px;
    }
  }

  margin-left: var(--x-list-item-icon-ml);
  margin-right: var(--x-list-item-icon-mr);
  width: var(--x-list-item-icon-size);
  height: var(--x-list-item-icon-size);
}

// if XList is set as small, set style as small
.x-list--sm .x-list-item-icon {
  @extend .x-list-item-icon--sm;
}
</style>
