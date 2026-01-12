<template>
  <div
    class="x-list-item-text"
    :class="{
      [`x-list-item-text--${size}`]: true,
    }"
    :style="itemStyle"
  >
    <div class="x-list-item-text-primary" :style="primaryStyle">
      <slot>
        {{ primary }}
      </slot>
    </div>
    <div class="x-list-item-text-secondary">
      <slot name="secondary">
        {{ secondary }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { CSSProperties, defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'XListItemText',
  props: {
    size: {
      type: String as PropType<'sm' | 'md'>,
      default: 'md',
    },
    primary: {
      type: String,
      default: '',
    },
    secondary: {
      type: String,
      default: '',
    },
    itemStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({}),
    },
    primaryStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({}),
    },
  },
});
</script>

<style lang="scss">
.x-list-item-text {
  --x-list-item-text-font-size: var(--xv-body--body-lg--font-size);
  --x-list-item-text-font-weight: var(--xv-body--body-lg--font-weight);
  --x-list-item-text-pr-line-height: 28px; // cannot have a normal number when divide 18px
  --x-list-item-text-se-line-height: 1.5;
  &--sm {
    --x-list-item-text-font-size: var(--xv-body--body-md--font-size);
    --x-list-item-text-font-weight: var(--xv-body--body-md--font-weight);
    --x-list-item-text-pr-line-height: 1.5;
    // secondary line-height not defined in design system
    --x-list-item-text-se-line-height: 1.25;
  }

  &-primary {
    color: var(--xv-text--high-emphasis-text);
    font-size: var(--x-list-item-text-font-size);
    font-weight: var(--x-list-item-text-font-weight);
    line-height: var(--x-list-item-text-pr-line-height);
  }
  &-secondary {
    color: var(--xv-text--medium-emphasis-text);
    font-size: var(--x-list-item-text-font-size);
    font-weight: var(--x-list-item-text-font-weight);
    line-height: var(--x-list-item-text-se-line-height);
  }
}

// if XList is set as small, set default style as small
.x-list--sm .x-list-item-text {
  @extend .x-list-item-text--sm;
}
</style>
