<template>
  <label
    ref="labelRef"
    data-qa-xui="XCheckbox"
    class="x-checkbox"
    :class="{
      [`x-checkbox--${size}`]: true,
      'x-checkbox--readonly': readonly,
      'x-checkbox--disabled': disabled,
    }"
    :disabled="disabled"
    :error="error"
  >
    <input
      v-bind="$attrs"
      ref="checkRef"
      type="checkbox"
      class="x-checkbox-input"
      :class="{
        'x-checkbox-input--hide': hideCheckBox,
        'x-checkbox-input--error': error,
      }"
      :checked="modelValue"
      :indeterminate="indeterminate"
      :disabled="disabled"
      @click.prevent="handleClick"
    />
    <slot></slot>
  </label>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'XCheckBox',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    // For indeterminate state
    // @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate_state_checkboxes
    indeterminate: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<'sm' | 'md'>,
      default: 'md',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    hideCheckBox: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const checkRef = ref();
    const labelRef = ref();

    const handleClick = () => {
      // use a setTimeout with 0 to avoid the events being prevented by @click.prevent
      setTimeout(() => {
        emit('update:modelValue', !props.modelValue);
      });
    };

    return {
      checkRef,
      labelRef,
      handleClick,
    };
  },
});
</script>

<style lang="scss">
%checkbox-ring {
  box-shadow:
    0 0 0px 2px var(--bg-color, white),
    0 0 0px 4px rgba(0 0 0 / 0.3);
}

.x-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: var(--xv-body--body-md--font-size);
  font-weight: var(--xv-body--body-md--font-weight);
  line-height: var(--xv-body--body-md--line-height);
  color: var(--xv-text--high-emphasis-text);
  white-space: nowrap;
  padding: 0 0 0 3px;
  margin: 0;

  &--sm {
    font-size: var(--xv-body--body-sm--font-size);
    font-weight: var(--xv-body--body-sm--font-weight);
    line-height: var(--xv-body--body-sm--line-height);
  }

  &--disabled {
    color: var(--xv-text--disabled-text);
  }

  &--readonly {
    pointer-events: none;
  }
}
.x-checkbox-input {
  appearance: none;
  width: 18px;
  height: 18px;
  flex: 0 0 auto;
  border: 2px solid var(--xv-text--medium-emphasis-text);
  border-radius: 2px;
  background-color: var(--xv-container--surface);
  background-repeat: no-repeat;
  background-position: center;
  transition:
    box-shadow 0.1s,
    background-color 0.1s;

  &:indeterminate {
    border-color: var(--xv-status--primary);
    background-image: url('@xui-assets/icon/indeterminate-bar.svg');
  }

  &:checked {
    border: none;
    background-image: url('@xui-assets/icon/check-white.svg');
  }

  &:enabled {
    &:hover {
      background-color: var(--xv-container--surface-hovered);
    }

    &:active {
      background-color: var(--xv-container--surface-pressed);
    }

    &:indeterminate {
      &:hover {
        background-color: var(--xv-primary--50);
      }

      &:active {
        background-color: var(--xv-primary--100);
      }
    }

    &:checked {
      background-color: var(--xv-status--primary);

      &:hover {
        background-color: var(--xv-primary--600);
      }

      &:active {
        background-color: var(--xv-primary--700);
      }
    }

    &:focus-visible {
      outline: none;
      @extend %checkbox-ring;
    }
  }

  &:disabled {
    border-color: var(--xv-text--disabled-text);
    background-color: var(--xv-container--disabled-background);

    &:indeterminate {
      background-image: url('@xui-assets/icon/indeterminate-bar--disabled.svg');
    }

    &:checked {
      background-color: var(--xv-text--disabled-text);
    }
  }

  &--error {
    --x-checkbox-primary: var(--xv-status--error--rgb);
    border-color: rgb(var(--x-checkbox-primary));
  }

  // strong disabled check should not be visible
  &--hide {
    visibility: hidden;
  }
}
</style>
