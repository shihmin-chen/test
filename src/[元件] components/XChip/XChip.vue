<template>
  <span
    class="x-chip"
    :class="{
      [`x-chip--${size}`]: true,
      'x-chip--outline': outline,
      'x-chip--disabled': disabled,
      'x-chip--checked': checked,
    }"
    :tabindex="disabled ? undefined : 0"
    data-testid="x-chip"
    @click="onClick"
  >
    <XIcon
      v-if="checked && !hideCheckmark"
      class="x-chip-checkmark"
      icon="checkmark"
      color="var(--x-chip-color)"
    />
    <XIcon
      v-if="!isEmpty(customPrefixIcon)"
      class="x-chip-customIcon"
      :icon="customPrefixIcon"
      color="var(--x-chip-color)"
    />
    <slot color="var(--x-chip-color)"></slot>
  </span>
</template>

<script lang="ts">
import { isEmpty } from 'lodash';
import { defineComponent, PropType } from 'vue';

import XIcon from '../XIcon/XIcon.vue';
import { XChipSize } from './chip';

export default defineComponent({
  name: 'XChip',
  components: {
    XIcon,
  },
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    hideCheckmark: {
      type: Boolean,
      default: false,
    },
    customPrefixIcon: {
      type: String,
      default: '',
    },
    size: {
      type: String as PropType<XChipSize>,
      default: 'md',
    },
    outline: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:checked'],
  setup(props, { emit }) {
    const onClick = () => {
      if (props.disabled) {
        return;
      }
      emit('update:checked', !props.checked);
    };
    return {
      onClick,
      isEmpty,
    };
  },
});
</script>

<style lang="scss">
.x-chip {
  // size
  --x-chip-h: 36px;
  --x-chip-p: 4px 12px;
  --x-chip-icon-size: 18px;
  --x-chip-font-size: var(--xv-body--body-lg--font-size);
  --x-chip-font-weight: var(--xv-body--body-lg--font-weight);
  --x-chip-line-height: var(--xv-body--body-lg--line-height);
  &--sm {
    --x-chip-h: 32px;
    --x-chip-font-size: var(--xv-body--body-md--font-size);
    --x-chip-font-weight: var(--xv-body--body-md--font-weight);
    --x-chip-line-height: var(--xv-body--body-md--line-height);
  }

  // color
  --x-chip-color: var(--xv-text--medium-emphasis-text);
  --x-chip-bg: var(--xv-container--area);
  --x-chip-bd-color: transparent;
  &:hover:not(.x-chip--disabled) {
    --x-chip-bg: var(--xv-container--area-hovered);
  }
  &:active:not(.x-chip--disabled) {
    --x-chip-bg: var(--xv-container--area-pressed);
  }
  &--outline {
    --x-chip-bg: transparent;
    --x-chip-bd-color: var(--xv-text--dividing-line);
    &:hover:not(.x-chip--disabled) {
      --x-chip-bg: var(--xv-container--surface-hovered);
    }
    &:active:not(.x-chip--disabled) {
      --x-chip-bg: var(--xv-container--surface-pressed);
    }
    &.x-chip--checked {
      --x-chip-bd-color: var(--xv-primary--150);
    }
  }
  &--checked {
    --x-chip-color: var(--xv-status--primary);
    --x-chip-bg: var(--xv-container--surface-active);
    &:hover:not(.x-chip--disabled) {
      --x-chip-bg: var(--xv-container--surface-active-hovered);
    }
    &:active:not(.x-chip--disabled) {
      --x-chip-bg: var(--xv-container--surface-active-pressed);
    }
  }
  &--disabled {
    pointer-events: none;
    cursor: unset;
    --x-chip-color: var(--xv-text--disabled-text);
    --x-chip-bg: var(--xv-container--disabled-background);
    &.x-chip--outline {
      --x-chip-bd-color: var(--xv-text--disabled-text);
      &:not(.x-chip--checked) {
        --x-chip-bg: transparent;
      }
    }
  }

  // css
  height: var(--x-chip-h);
  padding: var(--x-chip-p);
  display: inline-flex;
  justify-content: center;
  align-items: center;

  background-color: var(--x-chip-bg);
  color: var(--x-chip-color);

  border: 1px solid;
  border-color: var(--x-chip-bd-color);
  border-radius: 50px;
  box-shadow: 0 0 0 0 #4d8edc77;

  font-size: var(--x-chip-font-size);
  font-weight: var(--x-chip-font-weight);
  // to eliminate y shift
  line-height: var(--x-chip-line-height);

  white-space: nowrap;
  touch-action: manipulation;
  box-sizing: border-box;
  text-decoration: none;
  cursor: pointer;

  transition:
    box-shadow 0.15s,
    background-color 0.15s;

  &:focus {
    outline: none;
  }
  &:focus-visible {
    box-shadow: 0 0 0 3px #7c7c7c77;
    &:active {
      box-shadow: 0 0 0 3px #7c7c7c;
    }
  }

  &-checkmark {
    width: 18px;
    height: 18px;
    margin-left: -2px;
    margin-right: 4px;
  }

  &-customIcon {
    margin-left: -2px;
    margin-right: 4px;
  }
}
</style>
