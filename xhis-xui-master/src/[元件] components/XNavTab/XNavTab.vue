<template>
  <nav
    class="x-ui-chart-tab-nav"
    :class="{
      [`x-ui-chart-tab-nav--${size}` as string]: true,
    }"
  >
    <ul class="x-ui-chart-tab-nav-group">
      <!-- @vue-expect-error -->
      <li
        v-for="{ name, displayName, mark, disabled } in tabList"
        :key="name"
        class="x-ui-chart-tab-nav-li"
        :class="{
          'x-ui-chart-tab-nav-li--selected': currentTabName === name,
          'x-ui-chart-tab-nav-li--mark': mark,
          'x-ui-chart-tab-nav-li--disabled': disabled,
        }"
        :style="{
          ['--x-ui-chart-tab-nav-li-minwidth' as string]: minWidth,
          ['--x-ui-chart-tab-nav-li-gap' as string]: gap,
          ['--x-ui-chart-tab-nav-li--selected-color' as string]:
            colorOfSelectedTab,
        }"
        tabindex="0"
        @click="handleChange($event, name, disabled)"
        @keypress.enter.prevent="$emit('change', name)"
        @keypress.space.prevent="$emit('change', name)"
      >
        {{ displayName }}
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { TabEntry } from './index';

export default defineComponent({
  name: 'XNavTab',
  props: {
    tabList: {
      default: () => [],
      type: Array as PropType<TabEntry[]>,
    },
    currentTabName: {
      default: '',
      type: String,
    },
    gap: {
      default: '20px',
      type: String,
    },
    minWidth: {
      default: 'auto',
      type: String,
    },
    size: {
      default: 'md',
      type: String as PropType<'md' | 'lg'>,
    },
    colorOfSelectedTab: {
      default: '',
      type: String,
    },
  },
  emits: ['change'],
  setup(_, { emit }) {
    const handleChange = (event: Event, name: string, disabled: boolean) => {
      if (disabled) {
        return;
      }
      emit('change', name);
    };
    return {
      handleChange,
    };
  },
});
</script>

<style lang="scss">
.x-ui-chart-tab-nav {
  // to allow flex wrap without overflow
  // otherwise use 100% instead
  height: 34px;
  flex-shrink: 0;
  align-items: center;
  &--md {
    height: 34px;
    font-weight: var(--xv-label--label-md--font-weight);
    font-size: var(--xv-label--label-md--font-size);
    line-height: var(--xv-label--label-md--line-height);
  }

  &--lg {
    height: 42px;
    font-weight: var(--xv-title--title-md--font-weight);
    font-size: var(--xv-title--title-md--font-size);
    line-height: var(--xv-title--title-md--line-height);
  }
}

.x-ui-chart-tab-nav-group {
  margin: 0;
  padding: 0;
  display: flex;
  height: 100%;
}
.x-ui-chart-tab-nav-li {
  list-style: none;
  min-width: var(--x-ui-chart-tab-nav-li-minwidth, auto);
  margin-right: var(--x-ui-chart-tab-nav-li-gap, 20px);
  &:last-child {
    margin-right: 0px;
  }
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-bottom: 2px solid rgb(var(--xv-text--low-emphasis-text--rgb), 0);
  color: var(--xv-text--low-emphasis-text);
  transition:
    color 0.15s,
    background-color 0.15s,
    border-color 0.15s;
  user-select: none;
  touch-action: manipulation;
  white-space: nowrap;

  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline: 2px solid #2222;
  }
  &:not(&--selected):not(&--disabled) {
    cursor: pointer;
    &:hover {
      border-bottom-color: var(--xv-text--low-emphasis-text);
    }
    &:active {
      color: var(--xv-text--medium-emphasis-text);
      border-bottom-color: var(--xv-text--medium-emphasis-text);
    }
  }

  &--selected {
    border-bottom-color: var(
      --x-ui-chart-tab-nav-li--selected-color,
      var(--xv-status--primary)
    );
    color: var(
      --x-ui-chart-tab-nav-li--selected-color,
      var(--xv-status--primary)
    );
  }

  &--mark::after {
    content: '';
    margin-bottom: 1.125rem;
    margin-left: 0.25rem;
    height: 6px;
    width: 6px;
    display: inline-block;
    border-radius: 500px;
    background-color: var(--xv-text--disabled-text);
  }

  &--mark:not(&--disabled)::after {
    background-color: var(--xv-status--primary);
  }

  &--disabled {
    color: var(--xv-text--disabled-text);
  }
}
</style>
