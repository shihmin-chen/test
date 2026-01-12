<template>
  <div
    class="x-btn-group"
    :class="{
      [`x-btn-group--${size}`]: true,
      [`x-btn-group--${theme}`]: true,
      'x-btn-group--outline': outline,
    }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { XButtonGroupSize, XButtonGroupTheme } from './buttonGroup';

export default defineComponent({
  name: 'XButtonGroup',
  props: {
    theme: {
      default: 'primary',
      type: String as PropType<XButtonGroupTheme>,
    },
    size: {
      default: 'md',
      type: String as PropType<XButtonGroupSize>,
    },
    outline: {
      default: false,
      type: Boolean,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
.x-btn-group {
  --x-btn-gp-border-radius: 8px;

  height: 40px;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
  border: 0;
  border-radius: var(--x-btn-gp-border-radius);

  &--outline {
    border: 1px solid var(--xv-text--dividing-line);
  }

  > *:not(:last-child) {
    border-right: 1px solid var(--xv-text--dividing-line);
  }
}
</style>
