<template>
  <component
    :is="component"
    class="x-divider"
    :class="{
      [`x-divider--${size}`]: variant !== 'fullWidth',
    }"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export const avaiableVariants = ['middle', 'fullWidth'] as const;
export type AvailableVariant = typeof avaiableVariants[number];

export default defineComponent({
  name: 'XDivider',
  props: {
    variant: {
      type: String as PropType<AvailableVariant>,
      default: 'middle',
    },
    component: {
      type: String,
      default: 'hr',
    },
    size: {
      type: String as PropType<'sm' | 'md' | 'lg'>,
      default: 'md',
    },
  },
});
</script>

<style lang="scss">
.x-divider {
  --x-divider-middle-margin: 0;
  &--sm {
    --x-divider-middle-margin: 0 8px;
  }
  &--md {
    --x-divider-middle-margin: 0 16px;
  }
  &--lg {
    --x-divider-middle-margin: 0 32px;
  }

  border-width: 0px 0px thin;
  border-style: solid;
  border-color: var(--xv-text--dividing-line);
  margin: var(--x-divider-middle-margin);
}
</style>
