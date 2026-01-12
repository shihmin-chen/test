<template>
  <div
    :class="['x-slide-tabs-container', `x-slide-tabs-container--${size}`]"
    :style="containerStyleDispatcher"
  >
    <div
      v-for="({ label, value }, idx) in buttonOptions"
      :key="idx"
      :ref="itemRefs.el"
      class="x-slide-tabs-item-container"
    >
      <!-- Item -->
      <div
        class="x-slide-tabs-item"
        :class="{
          [`x-slide-tabs-item--${size}`]: true,
          [`x-slide-tabs-item--${size}--selected`]: modelValue === value,
          [`x-slide-tabs-item--${size}--disabled`]: disabled,
        }"
        :data-testid="label"
        :hoverEnabled="modelValue !== value && !disabled"
        @click="onClickItem(value)"
      >
        {{ label }}
      </div>

      <!-- DivideLine -->
      <div
        :class="[
          'x-slide-tabs-divideline',
          `x-slide-tabs-divideline--${size}`,
          showDivideLine(idx) ? 'show' : 'hide',
        ]"
      ></div>
    </div>

    <!-- Glider -->
    <div
      class="x-slide-tabs-glider"
      :class="{
        [`x-slide-tabs-glider--${size}`]: true,
      }"
      :style="gliderStyle"
    ></div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  Ref,
  ref,
  PropType,
  computed,
  CSSProperties,
} from 'vue';

import { XTabItem, XTabItemSize, XSlideTabsTheme } from './XTabItem';
import { useElementSize } from '@vueuse/core';

export default defineComponent({
  name: 'XSlideTabs',
  props: {
    modelValue: {
      default: '',
      type: String,
    },
    buttonOptions: {
      default: () => [],
      type: Array as PropType<XTabItem[]>,
    },
    size: {
      default: 'md',
      type: String as PropType<XTabItemSize>,
    },
    theme: {
      default: 'filledWhite',
      type: String as PropType<XSlideTabsTheme>,
    },
    containerStyle: {
      default: () => ({}),
      type: Object as PropType<CSSProperties>,
    },
    hasDivideLine: {
      default: true,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const itemRefs: { el: Ref<HTMLElement[]> } = { el: ref([]) };
    const itemWidth = computed(() =>
      itemRefs.el.value.map((item) => useElementSize(item).width)
    );
    const gliderWidthList = computed(() =>
      itemWidth.value.map((width) => width.value)
    );

    const selectedIdx = computed(() => {
      return props.buttonOptions.findIndex(
        (element) => element.value === props.modelValue
      );
    });

    const onClickItem = (value: string) => {
      if (props.disabled) {
        return;
      }
      emit('update:modelValue', value);
    };

    const showDivideLine = (idx: number) => {
      if (!props.hasDivideLine || props.theme === 'minimal') {
        return false;
      }
      if (idx === props.buttonOptions.length - 1) {
        return false;
      }
      return idx !== selectedIdx.value - 1 && idx !== selectedIdx.value;
    };

    const gliderStyle = computed(() => {
      if (itemRefs.el.value?.length === 0) {
        return;
      }
      const translateX = gliderWidthList.value.reduce(
        (prevValue, curValue, curIdx) =>
          curIdx < selectedIdx.value ? prevValue + curValue : prevValue,
        0
      );
      return {
        transform: 'translateX(' + translateX + 'px)',
        width: gliderWidthList.value[selectedIdx.value] + 'px',
      };
    });

    const containerStyleDispatcher = computed(() => {
      let containerStyle: CSSProperties;
      if (Object.keys(props.containerStyle).length === 0) {
        switch (props.theme) {
          case 'filledWhite':
            containerStyle = {
              backgroundColor: 'var(--xv-container--surface)',
            };
            break;
          case 'filledWhiteWithBorder':
            containerStyle = {
              backgroundColor: 'var(--xv-container--surface)',
              border: '1px solid var(--xv-text--dividing-line)',
            };
            break;
          case 'filledGrey':
            containerStyle = {
              backgroundColor: 'var(--xv-container--area)',
            };
            break;
          case 'minimal':
            containerStyle = {};
            break;
        }
      } else {
        containerStyle = props.containerStyle;
      }
      return containerStyle;
    });

    return {
      itemRefs,
      gliderWidthList,
      selectedIdx,
      onClickItem,
      showDivideLine,
      gliderStyle,
      containerStyleDispatcher,
    };
  },
});
</script>

<style lang="scss" scoped>
.x-slide-tabs-container {
  position: relative;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  * {
    z-index: 2;
  }

  &--sm {
    padding: 0.25rem;
    border-radius: 0.375rem;
  }
  &--md {
    padding: 0.25rem;
    border-radius: 0.5rem;
  }
  &--lg {
    padding: 0.25rem;
    border-radius: 0.625rem;
  }
}

.x-slide-tabs-item-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.x-slide-tabs-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  font-style: normal;
  font-weight: 500;
  color: var(--xv-text--medium-emphasis-text);

  &--sm {
    padding: 0.125rem 0.625rem;
    font-size: var(--xv-body--body-sm--font-size);
    line-height: var(--xv-body--body-sm--line-height);

    &--selected {
      cursor: pointer;
      font-weight: 700;
      font-size: var(--xv-label--label-sm--font-size);
      line-height: var(--xv-label--label-sm--line-height);
      color: var(--xv-status--primary);
    }

    &--disabled {
      cursor: default;
      pointer-events: none;
    }
  }
  &--md {
    padding: 0.25rem 1rem;
    font-size: var(--xv-body--body-md--font-size);
    line-height: var(--xv-body--body-md--line-height);

    &--selected {
      cursor: pointer;
      font-weight: 700;
      font-size: var(--xv-label--label-md--font-size);
      line-height: var(--xv-label--label-md--line-height);
      color: var(--xv-status--primary);
    }

    &--disabled {
      cursor: default;
      pointer-events: none;
    }
  }
  &--lg {
    padding: 0.375rem 1.375rem;
    font-size: var(--xv-body--body-lg--font-size);
    line-height: var(--xv-body--body-lg--line-height);

    &--selected {
      cursor: pointer;
      font-weight: 700;
      font-size: var(--xv-label--label-lg--font-size);
      line-height: var(--xv-label--label-lg--line-height);
      color: var(--xv-status--primary);
    }

    &--disabled {
      cursor: default;
      pointer-events: none;
    }
  }

  &:hover[hoverEnabled='true'] {
    cursor: pointer;
    color: var(--xv-text--low-emphasis-text);
  }

  &:active[hoverEnabled='true'] {
    color: var(--xv-status--primary);
  }
}

.x-slide-tabs-divideline {
  background-color: var(--xv-text--dividing-line);
  width: 0.0625rem;
  border-radius: 3.125rem;

  &--sm {
    height: 1rem;
  }
  &--md {
    height: 1.375rem;
  }
  &--lg {
    height: 1.375rem;
  }

  &.show {
    opacity: 1;
  }
  &.hide {
    opacity: 0;
  }
}

.x-slide-tabs-glider {
  position: absolute;
  top: 0.25rem;
  left: 0.25rem;

  background-color: var(--xv-container--surface-active);
  z-index: 1;
  transition: 0.25s ease-out;

  &--sm {
    height: 1.5rem;
    border-radius: 0.25rem;
  }
  &--md {
    height: 2rem;
    border-radius: 0.375rem;
  }
  &--lg {
    height: 2.5rem;
    border-radius: 0.5rem;
  }
}
</style>
