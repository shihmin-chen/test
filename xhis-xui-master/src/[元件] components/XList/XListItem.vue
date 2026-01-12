<template>
  <div
    :class="{
      'x-list-item-li': true,
      'x-list-item-li-interactive': interactive,
      'x-list-item-li-interactive--selected': interactive && selected,
      'x-list-item-li-interactive--keyboard-active':
        interactive && keyboardActive,
    }"
    :aria-disabled="disabled"
    role="listiem"
  >
    <div
      :style="{
          ['--x-list-item-align-items' as string]: alignItems,
          ...itemStyle,
        }"
      :class="{
        'x-list-item': true,
        [`x-list-item--${size}`]: true,
        'x-list-item-p-0': noPadding,
        'x-list-item-px-0': noGutters,
      }"
    >
      <slot></slot>
    </div>
    <!-- list item divider not yet defined in design system -->
    <XDivider v-if="divider" variant="fullWidth" component="div" />
  </div>
</template>

<script lang="ts">
import { CSSProperties, defineComponent, PropType, inject } from 'vue';
import XDivider from '../XDivider/XDivider.vue';

export default defineComponent({
  name: 'XListItem',
  components: { XDivider },
  props: {
    size: {
      type: String as PropType<'sm' | 'md'>,
      default: 'md',
    },
    interactive: {
      type: Boolean,
      default: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    keyboardActive: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    noPadding: {
      type: Boolean,
      default: false,
    },
    noGutters: {
      type: Boolean,
      default: false,
    },
    divider: {
      type: Boolean,
      default: false,
    },
    alignItems: {
      type: String,
      default: 'center',
    },
    itemStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({}),
    },
  },
});
</script>

<style lang="scss">
$gutter: 16px;

.x-list-item-li {
  &-interactive {
    &:hover {
      background-color: var(--xv-container--surface-hovered);
    }
    &:active {
      background-color: var(--xv-container--surface-pressed);
    }
    &--keyboard-active {
      // design system not yet defined
      background-color: var(--xv-container--surface-hovered);
    }
    &--selected,
    &[area-selected='true'] {
      background-color: var(--xv-container--surface-active);
    }
    transition: background-color 0.15s;
    cursor: pointer;
  }
  &[aria-disabled='true'] {
    opacity: 0.2;
    pointer-events: none;
  }
}

.x-list-item {
  --x-list-item-gutter: 16px;
  --x-list-item-v-padding: 6px;
  --x-list-item-font-size: var(--xv-body--body-lg--font-size);
  --x-list-item-font-weight: var(--xv-body--body-lg--font-weight);
  --x-list-item-line-height: var(
    --xv-body--body-lg--line-height
  ); // cannot have a normal number when divide 18px

  &--sm {
    --x-list-item-v-padding: 4px;
    // use Typogrophy component for different line-height instead when component is ready
    --x-list-item-font-size: var(--xv-body--body-md--font-size);
    --x-list-item-font-weight: var(--xv-body--body-md--font-weight);
    --x-list-item-line-height: var(--xv-body--body-md--line-height);
  }
  padding: var(--x-list-item-v-padding) var(--x-list-item-gutter);

  color: var(--xv-text--high-emphasis-text);
  display: flex;
  align-items: var(--x-list-item-align-items);
  font-size: var(--x-list-item-font-size);
  font-weight: var(--x-list-item-font-weight);
  line-height: var(--x-list-item-line-height);

  &-p-0 {
    padding: 0;
  }
  &-px-0 {
    padding-left: 0;
    padding-right: 0;
  }
}

// if XList is set as small, set default style as small
.x-list--sm .x-list-item {
  @extend .x-list-item--sm;
}
</style>
