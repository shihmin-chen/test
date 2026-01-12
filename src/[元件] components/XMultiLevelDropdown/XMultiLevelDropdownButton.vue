<template>
  <XButton
    class="x-multi-level-dropdown-button"
    :class="{ 'x-multi-level-dropdown-button--on': on }"
    :disabled="disabled"
  >
    <slot></slot>
  </XButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import XButton from '../XButton/XButton.vue';

export default defineComponent({
  name: 'XMultiLevelDropdownButton',
  components: { XButton },
  props: {
    disabled: {
      default: false,
      type: Boolean,
    },
    on: {
      default: false,
      type: Boolean,
    },
  },
  emits: ['show'],
});
</script>

<style lang="scss">
.x-multi-level-dropdown-button {
  height: 36px;
  padding: 6px 12px;
  border: none;

  font-weight: var(--xv-body--body-md--font-weight);
  font-size: var(--xv-body--body-md--font-size);
  line-height: var(--xv-body--body-md--line-height);

  background-color: unset;
  color: var(--xv-text--medium-emphasis-text);

  &:hover {
    background-color: var(--xv-container--surface-hovered);
    color: var(--xv-text--high-emphasis-text);
  }
  &:active {
    background-color: var(--xv-container--surface-pressed);
    color: var(--xv-text--high-emphasis-text);
  }
  &:disabled {
    background-color: unset;
    color: var(--xv-text--disabled-text);
  }
  &--on {
    background-color: var(--xv-container--surface-active);
    color: var(--xv-status--primary);
  }
}
</style>
