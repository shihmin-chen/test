<template>
  <label
    class="x-radio-button"
    :class="{
      [`x-radio-button--${size}`]: true,
      'x-radio-button--readonly': readonly,
      'x-radio-button--disabled': disabled,
      'x-radio-button--error': context.error,
    }"
    :disabled="disabled"
  >
    <input
      v-bind="$attrs"
      type="radio"
      class="x-radio-button-input"
      :name="context.name"
      :value="value"
      :checked="isSelected"
      :disabled="disabled"
    />

    <span class="x-radio-button-icon">
      <svg v-if="isSelected" width="20" height="20" viewBox="0 0 20 20">
        <path
          d="M10 16C13.3137 16 16 13.3137 16 10C16 6.68629 13.3137 4 10 4C6.68629 4 4 6.68629 4 10C4 13.3137 6.68629 16 10 16Z"
          fill="var(--checked-fill)"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z"
          fill="var(--checked-fill)"
        />
      </svg>
      <svg v-else width="20" height="20" viewBox="0 0 20 20">
        <path
          d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z"
          fill="var(--unchecked-fill)"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
          fill="var(--unchecked-stroke)"
        />
      </svg>
    </span>

    <slot>{{ label }}</slot>
  </label>
</template>

<script lang="ts">
import { defineComponent, inject, computed, PropType } from 'vue';
import { contextKey } from './radioContext';

export default defineComponent({
  name: 'XRadioButton',
  props: {
    value: {
      type: [String, Boolean] as PropType<string | boolean>,
      default: undefined,
    },
    label: {
      type: String,
      default: '',
    },
    size: {
      type: String as PropType<'sm' | 'md'>,
      default: 'md',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const context = inject(contextKey, {
      modelValue: '',
      name: 'unknown',
      error: false,
    });
    const isSelected = computed(() => context.modelValue === props.value);

    return {
      isSelected,
      context,
    };
  },
});
</script>

<style lang="scss">
@mixin size($size) {
  height: $size;
  width: $size;
}

%radio-ring {
  box-shadow: 0 0 0px 2px var(--bg-color, white), 0 0 0px 4px rgba(0 0 0 / 0.3);
}

.x-radio-button {
  display: inline-flex;
  position: relative;
  gap: 4px;
  font-size: var(--xv-body--body-lg--font-size);
  font-weight: var(--xv-body--body-lg--font-weight);
  color: var(--xv-text--high-emphasis-text);
  margin: 0;
  line-height: var(--xv-body--body-lg--line-height);

  .x-radio-button-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    @include size(28px);

    svg {
      border-radius: 100rem;
      transition: box-shadow 0.1s;
    }
  }

  &--sm {
    font-size: var(--xv-body--body-md--font-size);
    font-weight: var(--xv-body--body-md--font-weight);
    line-height: var(--xv-body--body-md--line-height);

    .x-radio-button-icon {
      @include size(24px);
    }
  }

  --checked-fill: var(--xv-status--primary);
  --unchecked-fill: transparent;
  --unchecked-stroke: var(--xv-text--medium-emphasis-text);
  &.x-radio-button--error {
    --unchecked-stroke: rgb(var(--xv-status--error--rgb));
  }

  &:hover {
    --checked-fill: var(--xv-primary--600);
    --unchecked-fill: var(--xv-container--surface-hovered);
  }

  &:active {
    --checked-fill: var(--xv-primary--700);
    --unchecked-fill: var(--xv-container--surface-pressed);
  }

  &.x-radio-button--disabled {
    color: var(--xv-text--disabled-text);
    --checked-fill: var(--xv-text--disabled-text);
    --unchecked-fill: var(--xv-container--disabled-background);
    --unchecked-stroke: var(--xv-text--disabled-text);
  }

  &.x-radio-button--readonly {
    pointer-events: none;
  }
}

.x-radio-button-input {
  position: absolute;
  opacity: 0;
  @include size(100%);

  &:focus-visible {
    & + .x-radio-button-icon svg {
      @extend %radio-ring;
    }
  }
}

// Force XRadioButton to have the same style as XRadioButtonGroup
.x-radio-button-group--sm .x-radio-button {
  @extend .x-radio-button--sm;
}
</style>
