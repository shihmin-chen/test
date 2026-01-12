<template>
  <button
    class="x-btn-group-item"
    :class="{
      [`x-btn-group-item--${size}`]: true,
      [`x-btn-group-item--${theme}`]: true,
      'x-btn-group-item--disabled': disabled,
      'x-btn-group-item--on': on,
      'x-btn-group-item--w-icon': !!icon,
      'x-btn-group-item--w-label': !!label,
      'x-btn-group-item--w-caret': caret,
    }"
    type="button"
    :disabled="disabled"
    :data-qa-key="label"
  >
    <XIcon
      v-if="icon"
      class="x-btn-group-item-icon"
      :icon="icon"
      color="var(--x-btn-gp-item-color)"
    />

    {{ label }}

    <XIcon
      v-if="caret"
      class="x-btn-group-item-caret"
      icon="caret-down"
      color="var(--x-btn-gp-item-color)"
    />
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { XButtonGroupSize, XButtonGroupTheme } from './buttonGroup';
import XIcon from '../XIcon/XIcon.vue';

export default defineComponent({
  name: 'XButtonGroupItem',
  components: {
    XIcon,
  },
  props: {
    theme: {
      default: 'primary',
      type: String as PropType<XButtonGroupTheme>,
    },
    size: {
      default: 'md',
      type: String as PropType<XButtonGroupSize>,
    },
    icon: {
      default: '',
      type: [String, Object],
    },
    label: {
      default: '',
      type: String,
    },
    caret: {
      default: false,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    on: {
      default: false,
      type: Boolean,
    },
  },
});
</script>

<style lang="scss">
.x-btn-group-item {
  // size
  --x-btn-gp-item-h: 40px;
  --x-btn-gp-item-p-v: 0;
  --x-btn-gp-item-p-h: 20px;
  --x-btn-gp-item-font-size: var(--xv-label--label-lg--font-size);
  --x-btn-gp-item-font-weight: var(--xv-label--label-lg--font-weight);
  --x-btn-gp-item-line-height: var(--xv-label--label-lg--line-height);
  --x-btn-gp-item-icon-size: 24px;
  --x-btn-gp-item-caret-size: 20px;
  &--sm {
    --x-btn-gp-item-p-h: 16px;
    --x-btn-gp-item-font-size: var(--xv-label--label-md--font-size);
    --x-btn-gp-item-font-weight: var(--xv-label--label-md--font-weight);
    --x-btn-gp-item-line-height: var(--xv-label--label-md--line-height);
    --x-btn-gp-item-icon-size: 20px;
    --x-btn-gp-item-icon-size: 20px;
    --x-btn-gp-item-caret-size: 16px;
  }

  // color
  --x-btn-gp-item-color: var(--xv-status--primary);
  --x-btn-gp-item-bg: var(--xv-container--surface);
  --x-btn-gp-item-bg-hover: var(--xv-primary--50);
  --x-btn-gp-item-bg-active: var(--xv-primary--100);
  &--neutral {
    --x-btn-gp-item-color: var(--xv-text--medium-emphasis-text);
    --x-btn-gp-item-bg-hover: var(--xv-neutral--50);
    --x-btn-gp-item-bg-active: var(--xv-neutral--100);
  }

  &:hover {
    --x-btn-gp-item-bg: var(--x-btn-gp-item-bg-hover);
  }

  &:active,
  &--on,
  &--on:hover,
  &--on:active {
    --x-btn-gp-item-bg: var(--x-btn-gp-item-bg-active);
  }

  &--disabled {
    --x-btn-gp-item-color: var(--xv-text--disabled-text);
    --x-btn-gp-item-bg: var(--xv-container--surface);
  }

  &:disabled {
    pointer-events: none;
    cursor: unset;
  }

  &--w-icon {
    padding-left: calc(var(--x-btn-gp-item-p-h) - 4px);
  }

  &--w-icon:not(&--w-label):not(&--w-caret),
  &--w-caret {
    padding-right: calc(var(--x-btn-gp-item-p-h) - 4px);
  }

  // css
  height: var(--x-btn-gp-item-h);
  padding: var(--x-btn-gp-item-p-v) var(--x-btn-gp-item-p-h);
  display: inline-flex;
  justify-content: center;
  align-items: center;

  background-color: var(--x-btn-gp-item-bg);
  color: var(--x-btn-gp-item-color);

  border: 0;
  border-radius: 0;
  box-shadow: 0 0 0 0 #4d8edc77;

  font-size: var(--x-btn-gp-item-font-size);
  font-weight: var(--x-btn-gp-item-font-weight);
  // to eliminate y shift
  line-height: var(--x-btn-gp-item-line-height);

  white-space: nowrap;
  touch-action: manipulation;
  box-sizing: border-box;
  text-decoration: none;
  cursor: pointer;

  transition: box-shadow 0.15s, background-color 0.15s;

  &:focus {
    outline: none;
  }
  &:focus-visible {
    box-shadow: 0 0 0 3px #7c7c7c77;
    &:active {
      box-shadow: 0 0 0 3px #7c7c7c;
    }
  }

  &-icon {
    width: var(--x-btn-gp-item-icon-size);
    height: var(--x-btn-gp-item-icon-size);
    margin-right: 4px;
  }
  &--w-icon:not(&--w-label):not(&--w-caret) {
    .x-btn-group-item-icon {
      margin-right: 0;
    }
  }

  &-caret {
    width: var(--x-btn-gp-item-caret-size);
    height: var(--x-btn-gp-item-caret-size);
    margin-left: 8px;
  }
}

// Set XButtonGroupItem style based on XButtonGroup
.x-btn-group {
  &--outline .x-btn-group-item {
    height: calc(var(--x-btn-gp-item-h) - 2px);
  }

  > *:first-child.x-btn-group-item,
  > *:first-child .x-btn-group-item {
    border-top-left-radius: var(--x-btn-gp-border-radius);
    border-bottom-left-radius: var(--x-btn-gp-border-radius);
  }
  > *:last-child.x-btn-group-item,
  > *:last-child .x-btn-group-item {
    border-top-right-radius: var(--x-btn-gp-border-radius);
    border-bottom-right-radius: var(--x-btn-gp-border-radius);
  }
}

// Force XButtonGroupItem to have the same style as XButtonGroup
.x-btn-group--sm .x-btn-group-item {
  @extend .x-btn-group-item--sm;
}
.x-btn-group--neutral .x-btn-group-item {
  @extend .x-btn-group-item--neutral;
  &--disabled {
    @extend .x-btn-group-item--disabled;
  }
}
</style>
