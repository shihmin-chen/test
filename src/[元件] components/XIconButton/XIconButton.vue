<template>
  <button
    class="x-icon-btn"
    :class="{
      [`x-icon-btn--${size}`]: true,
      'x-icon-btn--default': theme === undefined,
      'x-icon-btn--primary': theme === 'primary',
      'x-icon-btn--danger': theme === 'danger',
      'x-icon-btn--warning': theme === 'warning',
      'x-icon-btn--tertiary': theme === 'tertiary',
      'x-icon-btn--rounded': rounded,
      'x-icon-btn--fill': fill,
      'x-icon-btn--long': long,
      'x-icon-btn--on': on,
      'x-icon-btn--w-text': !!text,
    }"
    type="button"
    @click="handleClick"
  >
    <slot v-bind="{ size, rounded, fill, long, on }">
      <XIcon :icon="icon" />
      <span v-if="text" style="margin-left: 4px">{{ text }}</span>
    </slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { XButtonSize, XButtonTheme } from '../../shared/';
import { XIcon } from '../XIcon/';

export default defineComponent({
  name: 'XIconButton',
  components: {
    XIcon,
  },
  props: {
    theme: {
      default: undefined,
      type: String as PropType<XButtonTheme> | undefined,
    },
    size: {
      default: 'md',
      type: String as PropType<XButtonSize>,
    },
    rounded: {
      default: true,
      type: Boolean,
    },
    fill: {
      default: false,
      type: Boolean,
    },
    long: {
      default: false,
      type: Boolean,
    },
    on: {
      default: false,
      type: Boolean,
    },
    icon: {
      default: '',
      type: [String, Object],
    },
    text: {
      default: '',
      type: String,
    },
  },
  setup() {
    const handleClick = (event: Event) => {
      let element: HTMLElement | EventTarget | null = event.target;
      let rowIndex = null;
      while (element) {
        rowIndex = (element as HTMLElement)
          .getAttribute('aria-rowindex')
          ?.trim();
        if (rowIndex) {
          break;
        }
        element = (element as HTMLElement).parentElement;
      }
    };
    return {
      handleClick,
    };
  },
});
</script>

<style lang="scss">
.x-icon-btn {
  --x-icon-btn-size: 40px;
  --x-icon-btn-long-p-v: 0;
  --x-icon-btn-long-p-h: 10px;

  &--sm {
    --x-icon-btn-size: 32px;
    --x-icon-btn-long-p-h: 8px;
    border-radius: 6px;
    font-size: var(--xv-body--body-sm--font-size);
    font-weight: var(--xv-body--body-sm--font-weight);
    line-height: var(--xv-body--body-sm--line-height);
    > .x-icon {
      width: 20px;
      height: 20px;
    }
  }
  &--lg {
    --x-icon-btn-size: 48px;
    --x-icon-btn-long-p-h: 12px;
    > .x-icon {
      width: 32px;
      height: 32px;
    }
  }
  height: var(--x-icon-btn-size);
  width: var(--x-icon-btn-size);

  padding: 0;

  &--long {
    width: unset;
    padding: var(--x-icon-btn-long-p-v) var(--x-icon-btn-long-p-h);
    &.x-icon-btn--w-text {
      padding-right: calc(var(--x-icon-btn-long-p-h) + 2px);
    }
  }

  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 8px;
  font-size: var(--xv-body--body-md--font-size);
  font-weight: var(--xv-body--body-md--font-weight);
  line-height: var(--xv-body--body-md--line-height);
  &--rounded {
    border-radius: 100px;
  }

  white-space: nowrap;
  touch-action: manipulation;
  box-sizing: border-box;
  text-decoration: none;
  cursor: pointer;

  // color - default
  --x-icon-btn-color: var(--xv-text--medium-emphasis-text);
  --x-icon-btn-bg: #0000; // Set this dark-transparent is important for safari rendering. Since it cannot properly handle transition from initial color to other color.
  &:focus-visible {
    outline: solid var(--xv-container--surface-pressed);
  }
  &:hover,
  &:focus-visible {
    --x-icon-btn-bg: var(--xv-container--surface-hovered);
    --x-icon-btn-color: var(--xv-text--high-emphasis-text);
  }
  &:active {
    --x-icon-btn-bg: var(--xv-container--surface-pressed);
    --x-icon-btn-color: var(--xv-text--high-emphasis-text);
  }

  // color - fill
  &--fill {
    --x-icon-btn-bg: var(--xv-container--area);
    &:focus-visible {
      outline: solid var(--xv-container--area-pressed);
    }
    &:hover,
    &:focus-visible {
      --x-icon-btn-bg: var(--xv-container--area-hovered);
    }
    &:active {
      --x-icon-btn-bg: var(--xv-container--area-pressed);
    }

    // color - themes
    &.x-icon-btn {
      &--primary {
        --x-icon-btn-color: var(--xv-text--on-background-text);
        --x-icon-btn-bg: var(--xv-status--primary);
        &:focus-visible {
          outline: solid var(--xv-primary--700);
        }
        &:hover,
        &:focus-visible {
          --x-icon-btn-bg: var(--xv-primary--600);
        }
        &:active {
          --x-icon-btn-bg: var(--xv-primary--700);
        }
      }
      &--danger {
        --x-icon-btn-color: var(--xv-text--on-background-text);
        --x-icon-btn-bg: var(--xv-status--error);
        &:focus-visible {
          outline: solid var(--xv-red--700);
        }
        &:hover,
        &:focus-visible {
          --x-icon-btn-bg: var(--xv-red--600);
        }
        &:active {
          --x-icon-btn-bg: var(--xv-red--700);
        }
      }
      &--warning {
        --x-icon-btn-color: var(--xv-text--on-background-text);
        --x-icon-btn-bg: var(--xv-orange--500);
        &:focus-visible {
          outline: solid var(--xv-orange--700);
        }
        &:hover,
        &:focus-visible {
          --x-icon-btn-bg: var(--xv-orange--600);
        }
        &:active {
          --x-icon-btn-bg: var(--xv-orange--700);
        }
      }
      &--tertiary {
        --x-icon-btn-color: var(--xv-text--on-background-text);
        --x-icon-btn-bg: var(--xv-text--medium-emphasis-text);
        &:focus-visible {
          outline: solid var(--xv-neutral--700);
        }
        &:hover,
        &:focus-visible {
          --x-icon-btn-bg: var(--xv-neutral--600);
        }
        &:active {
          --x-icon-btn-bg: var(--xv-neutral--700);
        }
      }
    }

    &:disabled {
      --x-icon-btn-bg: var(--xv-container--disabled-background);
    }
  }
  &:disabled {
    --x-icon-btn-color: var(--xv-text--disabled-text);
    pointer-events: none;
    cursor: unset;
  }

  // color - on
  &--on {
    --x-icon-btn-color: var(--xv-status--primary);
    --x-icon-btn-bg: var(--xv-container--surface-active);
    &:focus-visible {
      outline: solid var(--xv-container--surface-active-pressed);
    }
    &:hover,
    &:focus-visible {
      --x-icon-btn-bg: var(--xv-container--surface-active-hovered);
    }
    &:active {
      --x-icon-btn-bg: var(--xv-container--surface-active-pressed);
    }
  }

  // color - styles
  color: var(--x-icon-btn-color);
  background-color: var(--x-icon-btn-bg);
  transition:
    background-color 0.1s,
    color 0.1s;
}
</style>
