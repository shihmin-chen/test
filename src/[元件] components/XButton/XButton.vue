<template>
  <component
    :is="url ? 'a' : 'button'"
    ref="btnRef"
    class="x-btn"
    :class="{
      [`x-btn--${size}`]: true,
      'x-btn--text': display === 'text',
      'x-btn--link': display === 'link',
      'x-btn--loading': loading,
      'x-btn--outline': outline,
      'x-btn--primary': theme === 'primary',
      'x-btn--danger': theme === 'danger',
      'x-btn--warning': theme === 'warning',
      'x-btn--tertiary': theme === 'tertiary',
      'x-btn--disabled': disabled,
      'x-btn--visited': visited,
      'x-btn--w-icon': !!icon,
    }"
    type="button"
    v-bind="{ href: url }"
    :target="url ? '_blank' : null"
    :disabled="loading || disabled"
    @click="handleClick"
  >
    <XIcon
      v-if="loading"
      icon="spinner"
      class="x-btn-spinner"
      color="var(--x-btn-color)"
    />
    <slot v-else name="icon" color="var(--x-btn-color)">
      <XIcon
        v-if="icon"
        class="x-btn-icon"
        :icon="icon"
        color="var(--x-btn-color)"
      />
    </slot>

    <slot></slot>
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { XIcon } from '../XIcon/';
import { XButtonDisplayType, XButtonSize, XButtonTheme } from '../../shared/';

export default defineComponent({
  name: 'XButton',
  components: {
    XIcon,
  },
  props: {
    display: {
      default: 'button',
      type: String as PropType<XButtonDisplayType>,
    },
    theme: {
      default: 'primary',
      type: String as PropType<XButtonTheme>,
    },
    size: {
      default: 'md',
      type: String as PropType<XButtonSize>,
    },
    outline: {
      default: false,
      type: Boolean,
    },
    visited: {
      default: false,
      type: Boolean,
    },
    loading: {
      default: false,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    url: {
      default: null,
      type: String,
    },
    icon: {
      default: '',
      type: [String, Object],
    },
  },
  emits: ['click'],
  setup(_, { emit, slots }) {
    const btnRef = ref<HTMLButtonElement | HTMLAnchorElement>();
    const handleClick = (event: Event) => {
      emit('click', event);
    };

    return {
      slots,
      handleClick,
      btnRef,
    };
  },
});
</script>

<style lang="scss">
@keyframes x-btn-loading-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.x-btn {
  // size
  --x-btn-h: 40px;
  --x-btn-p-v: 0;
  --x-btn-p-h: 24px;
  --x-btn-p-h-text: 12px;
  --x-btn-font-size: var(--xv-label--label-lg--font-size);
  --x-btn-font-weight: var(--xv-label--label-lg--font-weight);
  --x-btn-line-height: var(--xv-label--label-lg--line-height);
  --x-btn-icon-size: 24px;
  --x-btn-spinner-size: 20px;
  &--sm {
    --x-btn-h: 32px;
    --x-btn-p-h: 16px;
    --x-btn-p-h-text: 8px;
    --x-btn-font-size: var(--xv-label--label-md--font-size);
    --x-btn-font-weight: var(--xv-label--label-md--font-weight);
    --x-btn-line-height: var(--xv-label--label-md--line-height);
    --x-btn-icon-size: 20px;
    --x-btn-spinner-size: 16px;
    &.x-btn--link {
      --x-btn-font-size: var(--xv-body--body-md--font-size);
      --x-btn-font-weight: var(--xv-body--body-md--font-weight);
      --x-btn-line-height: var(--xv-body--body-md--line-height);
      &:hover {
        --x-btn-font-size: var(--xv-link--link-md--font-size);
        --x-btn-font-weight: var(--xv-link--link-md--font-weight);
        --x-btn-line-height: var(--xv-link--link-md--line-height);
        text-decoration: underline;
      }
    }
  }
  &--lg {
    --x-btn-h: 48px;
    --x-btn-p-h: 28px;
    --x-btn-p-h-text: 14px;
  }

  // color
  --x-btn-main-color: var(--xv-status--primary);
  --x-btn-color: var(--xv-text--on-background-text);
  --x-btn-bg: var(--x-btn-main-color);
  --x-btn-bd-color: transparent;

  &--primary {
    --x-btn-main-color: var(--xv-status--primary);
    &:not(.x-btn--outline) {
      &:hover {
        --x-btn-bg: var(--xv-primary--600);
      }
      &:active,
      &.x-btn--loading:not(.x-btn--disabled) {
        --x-btn-bg: var(--xv-primary--700);
      }
    }
  }

  &--danger {
    --x-btn-main-color: var(--xv-status--error);
    &:not(.x-btn--outline) {
      &:hover {
        --x-btn-bg: var(--xv-red--600);
      }
      &:active,
      &.x-btn--loading:not(.x-btn--disabled) {
        --x-btn-bg: var(--xv-red--700);
      }
    }
  }

  &--warning {
    --x-btn-main-color: var(--xv-orange--500);
    &:not(.x-btn--outline) {
      &:hover {
        --x-btn-bg: var(--xv-orange--600);
      }
      &:active,
      &.x-btn--loading:not(.x-btn--disabled) {
        --x-btn-bg: var(--xv-orange--700);
      }
    }
  }

  &--tertiary {
    --x-btn-main-color: var(--xv-text--medium-emphasis-text);
    &:not(.x-btn--outline) {
      &:hover {
        --x-btn-bg: var(--xv-neutral--500);
      }
      &:active,
      &.x-btn--loading:not(.x-btn--disabled) {
        --x-btn-bg: var(--xv-neutral--600);
      }
    }
  }

  &:not(.x-btn--outline):not(.x-btn--text) {
    &.x-btn--disabled {
      --x-btn-color: var(--xv-text--disabled-text);
      --x-btn-bg: var(--xv-container--disabled-background);
    }
  }

  &--outline,
  &--text {
    --x-btn-color: var(--x-btn-main-color);
    --x-btn-bg: transparent;
    --x-btn-bd-color: var(--x-btn-main-color);

    &.x-btn--primary {
      &:hover {
        --x-btn-bg: var(--xv-container--surface-active);
      }
      &:active,
      &.x-btn--loading:not(.x-btn--disabled) {
        --x-btn-bg: var(--xv-container--surface-active-pressed);
      }
    }
    &.x-btn--danger {
      &:hover {
        --x-btn-bg: var(--xv-status--error-surface);
      }
      &:active,
      &.x-btn--loading:not(.x-btn--disabled) {
        --x-btn-bg: var(--xv-status--error-surface-pressed);
      }
    }
    &.x-btn--warning {
      &:hover {
        --x-btn-bg: var(--xv-status--warning-surface);
      }
      &:active,
      &.x-btn--loading:not(.x-btn--disabled) {
        --x-btn-bg: var(--xv-status--warning-surface-pressed);
      }
    }
    &.x-btn--tertiary {
      &:hover {
        --x-btn-bg: var(--xv-container--surface-hovered);
      }
      &:active,
      &.x-btn--loading:not(.x-btn--disabled) {
        --x-btn-bg: var(--xv-container--surface-pressed);
      }
    }
    &.x-btn--disabled {
      --x-btn-main-color: var(--xv-text--disabled-text);
    }
  }

  &--text {
    border: none;
    --x-btn-p-h: var(--x-btn-p-h-text);
  }

  &--link {
    border: none;
    text-align: center;
    background-color: transparent;
    --x-btn-p-h: var(--x-btn-p-h-text);
    --x-btn-bd-color: var(--x-btn-main-color);
    --x-btn-color: var(--x-btn-main-color);
    --x-btn-font-size: var(--xv-body--body-lg--font-size);
    --x-btn-font-weight: var(--xv-body--body-lg--font-weight);
    --x-btn-line-height: var(--xv-body--body-lg--line-height);
    &:hover {
      --x-btn-color: var(--xv-primary--600);
      --x-btn-font-size: var(--xv-link--link-lg--font-size);
      --x-btn-font-weight: var(--xv-link--link-lg--font-weight);
      --x-btn-line-height: var(--xv-link--link-lg--line-height);
      text-decoration: underline;
    }
    &:active,
    &.x-btn--loading:not(.x-btn--disabled) {
      --x-btn-color: var(--xv-primary--700);
    }
    &.x-btn--disabled {
      --x-btn-color: var(--xv-text--disabled-text);
    }
    &.x-btn--visited {
      --x-btn-color: var(--xv-violet--600);
      &:hover {
        --x-btn-color: var(--xv-violet--700);
      }
      &:active,
      &.x-btn--loading:not(.x-btn--disabled) {
        --x-btn-color: var(--xv-violet--800);
      }
      &.x-btn--disabled {
        --x-btn-color: var(--xv-text--disabled-text);
      }
    }
  }

  &--disabled {
    pointer-events: none;
    cursor: unset;
  }

  &--w-icon:not(.x-btn--loading) {
    padding-left: calc(var(--x-btn-p-h) - 4px);
  }

  // css
  height: var(--x-btn-h);
  padding: var(--x-btn-p-v) var(--x-btn-p-h);
  display: inline-flex;
  justify-content: center;
  align-items: center;

  background-color: var(--x-btn-bg);
  color: var(--x-btn-color);

  border: 1px solid;
  border-color: var(--x-btn-bd-color);
  border-radius: 8px;
  box-shadow: 0 0 0 0 #4d8edc77;

  font-size: var(--x-btn-font-size);
  font-weight: var(--x-btn-font-weight);
  // to eliminate y shift
  line-height: var(--x-btn-line-height);

  white-space: nowrap;
  touch-action: manipulation;
  box-sizing: border-box;
  text-decoration: none;
  cursor: pointer;

  transition: box-shadow 0.15s, background-color 0.15s;

  // Test these in Native App !!
  // Native App might not support focus-visible
  &:focus {
    outline: none;
  }
  &:focus-visible {
    box-shadow: 0 0 0 3px #7c7c7c77;
    &:active {
      box-shadow: 0 0 0 3px #7c7c7c;
    }
  }

  &-spinner {
    width: var(--x-btn-spinner-size);
    height: var(--x-btn-spinner-size);
    margin-right: 4px;
    animation: x-btn-loading-spin 0.5s linear infinite;
  }

  &-icon {
    width: var(--x-btn-icon-size);
    height: var(--x-btn-icon-size);
    margin-right: 4px;
  }
}
</style>
