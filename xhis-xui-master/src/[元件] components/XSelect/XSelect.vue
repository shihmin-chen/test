<template>
  <div
    ref="selectRef"
    data-qa-xui="XSelect"
    class="x-select"
    :class="{
      'x-select--open': isExpand,
      'x-select--white': theme === 'white',
      [`x-select--${size}`]: true,
    }"
    :tabindex="disabled ? undefined : 0"
    role="combobox"
    :aria-disabled="disabled"
    :aria-readonly="readonly"
    :style="{
        ['--x-select-max-w' as string]: maxWidth,
        ['--x-select-min-w' as string]: minWidth,
      }"
    v-bind="{ ...$attrs, ...localInputAttrs }"
    @mouseover="isHovered = true"
    @mouseout="isHovered = false"
    @focusin="isFocused = true"
    @focusout="isFocused = false"
    @keydown.space.prevent="showMenu()"
  >
    <span class="x-select-text-container">
      <span
        class="x-select-prefix"
        :class="{
          'x-select-prefix--disabled': disabled,
        }"
      >
        <slot name="prefix"></slot>
      </span>
      <span class="x-select-text">
        <slot name="label" :label="currentLabel">
          {{ currentLabel }}
        </slot>
      </span>
    </span>
    <XIcon
      v-show="showIcon"
      icon="caret-down"
      class="x-select-arrow"
      :class="{
        'x-select-arrow--open': isExpand,
      }"
    />
  </div>
  <!-- Menu handle by tippy -->
  <XList
    v-if="tippyRendered"
    ref="selectListRef"
    class="x-select-menu x-scroll-bar x-scroll-bar-lg"
    tabindex="-1"
    role="listbox"
    :style="{
        ['--x-select-menu-max-w' as string]: menuMaxWidth,
        ['--x-select-menu-min-w' as string]: menuMinWidth,
      }"
    v-bind="{
      ...menuAttrs,
      maxWidth: menuMaxWidth,
      minWidth: menuMinWidth,
    }"
    :size="size"
  >
    <!-- keyboard control not finished -->
    <XListItem
      v-for="(option, index) in dataOptions"
      :key="getKeyIndex(keyIndex, option, 'value')"
      v-bind="getOptionAttrs(index)"
      class="x-select-menu-item"
      :keyboardActive="currentOptionIndex === index"
      :area-selected="modelValue === getOptionValue(option)"
      tabindex="-1"
      role="option"
      :disabled="option.disabled"
      @click="onOptionClick(option)"
    >
      <slot name="prefix-option" :option="option" :index="index"></slot>
      <slot name="option" :option="option" :index="index">
        <span
          class="x-ellipsis--1"
          :data-qa-key="getOptionLabel(option)"
          :data-qa-order="index"
        >
          {{ getOptionLabel(option) }}
        </span>
      </slot>
    </XListItem>
  </XList>
</template>

<script lang="ts">
import { useTemplateRefsList } from '@vueuse/core';
import { Props as TippyProps } from 'tippy.js';
import { computed, defineComponent, PropType, ref, toRefs } from 'vue';
import {
  disableTippyIfNeeded,
  useTippy,
  watchDisabledForTippy,
} from '../../composable';
import { useKeyOperations } from '../../composable/useKeyOperations';
import { DataKeyIndex, getKeyIndex } from '../../utils';
import XIcon from '../XIcon/XIcon.vue';
import XList from '../XList/XList.vue';
import XListItem from '../XList/XListItem.vue';
import { SelectMenuItem } from './selectContext';

const XSelect = defineComponent({
  name: 'XSelect',
  components: { XIcon, XList, XListItem },
  props: {
    modelValue: {
      default: '',
      type: String,
    },
    size: {
      default: 'md',
      type: String as PropType<'sm' | 'md'>,
    },
    dataOptions: {
      type: Array as PropType<SelectMenuItem[]>,
      default: () => [],
    },
    fallbackLabel: {
      default: '--',
      type: String,
    },
    minWidth: {
      default: '9rem',
      type: String,
    },
    maxWidth: {
      default: '18rem',
      type: String,
    },
    menuMinWidth: {
      default: '9rem',
      type: String,
    },
    menuMaxWidth: {
      default: '15rem',
      type: String,
    },
    menuAttrs: {
      default: () => ({}),
      type: Object,
    },
    theme: {
      default: 'grey',
      type: String as PropType<'white' | 'grey'>,
    },
    error: {
      type: Boolean,
      default: false,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    readonly: {
      default: false,
      type: Boolean,
    },
    getOptionValue: {
      type: Function as PropType<<T>(option: Record<string, T>) => T>,
      default: (option: SelectMenuItem) => option.value,
    },
    getOptionLabel: {
      type: Function as PropType<<T>(option: Record<string, T>) => T>,
      default: (option: SelectMenuItem) => option.label,
    },
    keyIndex: {
      default: 'value',
      type: [Array, String, Function] as PropType<DataKeyIndex>,
    },
    tippyOptions: {
      default: undefined,
      type: Object as PropType<Partial<TippyProps>>,
    },
    hideIcon: {
      default: false,
      type: Boolean,
    },
    isSendingLog: {
      default: false,
      type: Boolean,
    },
    lazyLoading: {
      default: false,
      type: Boolean,
    },
  },
  emits: ['update:modelValue', 'show', 'hide'],
  setup(props, { emit }) {
    const currentLabel = computed(() => {
      for (let item of props.dataOptions) {
        if (props.getOptionValue(item) === props.modelValue) {
          return props.getOptionLabel(item);
        }
      }
      return props.fallbackLabel;
    });

    const { disabled, readonly, error } = toRefs(props);
    const isMenuDisabled = computed(() => disabled.value || readonly.value);
    const tippyRendered = ref(!props.lazyLoading);
    const {
      target: selectRef,
      content: selectListRef,
      tippyInstance,
      isTippyShown: isExpand,
      showTippy: showMenu,
      hideTippy: closeMenu,
    } = useTippy(undefined, undefined, {
      placement: 'bottom-start',
      interactive: true,
      arrow: false,
      trigger: 'click focus',
      theme: 'dropdown',
      offset: [0, 2],
      maxWidth: 'none',
      ...props.tippyOptions,
      onCreate: (instance) => {
        disableTippyIfNeeded(isMenuDisabled.value, instance);
      },
      onShow: (...args) => {
        tippyRendered.value = true;
        emit('show');
        props.tippyOptions?.onShow?.(...args);
      },
      onHide: (...args) => {
        emit('hide');
        props.tippyOptions?.onHide?.(...args);
      },
    });
    watchDisabledForTippy(isMenuDisabled, tippyInstance);

    const { dataOptions: options } = toRefs(props);
    const optionRefs = useTemplateRefsList<HTMLElement>();
    const currentOptionIndex = ref(-1);

    const onOptionClick = (option: SelectMenuItem) => {
      if (option.disabled === true) {
        return;
      }

      const newValue = props.getOptionValue(option);
      if (props.modelValue !== newValue) {
        emit('update:modelValue', newValue);
      }
      closeMenu();
    };
    const { keyListeners, getOptionAttrs } = useKeyOperations<SelectMenuItem>(
      options,
      selectListRef as HTMLElement,
      currentOptionIndex,
      onOptionClick,
      {
        isMenuShown: isExpand,
        showMenu,
        hideMenu: closeMenu,
      }
    );
    const localInputAttrs = ref({
      ...keyListeners,
      inputAttrs: {
        onBlur: () => closeMenu(),
        onFocus: () => showMenu(),
      },
    });

    const borderTheme = computed(() => {
      if (!!error.value) {
        return {
          borderStyle: 'var(--x-select-bd-error)',
        };
      }
      return {};
    });

    const isHovered = ref(false);
    const isFocused = ref(false);

    const showIcon = computed<boolean>(() => {
      // if hideIcon == true, only show when hovered or focused
      return !props.hideIcon || isHovered.value || isFocused.value;
    });

    return {
      selectRef,
      selectListRef,
      currentLabel,
      isExpand,
      showMenu,
      closeMenu,
      getOptionAttrs,
      getKeyIndex,
      currentOptionIndex,
      localInputAttrs,
      optionRefs,
      onOptionClick,
      borderTheme,
      showIcon,
      isHovered,
      isFocused,
      tippyRendered,
    };
  },
});

export default XSelect;
</script>

<style lang="scss">
$min-w: 9rem;

.x-select {
  --x-select-font-size: var(--xv-body--body-lg--font-size);
  --x-select-font-weight: var(--xv-body--body-lg--font-weight);
  --x-select-line-height: var(--xv-body--body-lg--line-height);
  --x-select-color: var(--xv-text--high-emphasis-text);
  --x-select-arrow-size: 20px;

  --x-select-error: var(--xv-status--error--rgb);
  --x-select-bd-error: solid 1px rgb(var(--x-select-error));

  &--sm {
    --x-select-font-size: var(--xv-body--body-md--font-size);
    --x-select-font-weight: var(--xv-body--body-md--font-weight);
    --x-select-line-height: var(--xv-body--body-md--line-height);
    --x-select-arrow-size: 16px;
    min-height: 32px;
  }

  min-width: var(--x-select-min-w, $min-w);
  max-width: var(--x-select-max-w, 18rem);
  min-height: 40px;
  padding: 0 8px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;

  color: var(--x-select-color);
  background: var(--xv-container--area);
  border-radius: 8px;
  border: v-bind('borderTheme.borderStyle');

  white-space: nowrap;
  user-select: none;
  touch-action: manipulation;
  cursor: pointer;

  transition: background-color 0.1s;

  &:hover:not([aria-disabled='true']):not([aria-readonly='true']) {
    background-color: var(--xv-container--area-hovered);
  }

  &:focus-within {
    outline: none;
    box-shadow: 0 0 0 2px var(--xv-container--surface-pressed);
  }

  &:active:not([aria-disabled='true']):not([aria-readonly='true']) {
    background-color: var(--xv-container--area-pressed);
  }

  &--open {
    background-color: var(--xv-container--area-hovered);
    &:hover {
      background-color: var(--xv-container--area-pressed);
    }

    &.x-select--white {
      background-color: var(--xv-container--surface-hovered);
      &:hover {
        background-color: var(--xv-container--surface-pressed);
      }
    }
  }

  &--white {
    background-color: var(--xv-container--surface);

    &:hover:not([aria-disabled='true']):not([aria-readonly='true']) {
      background-color: var(--xv-container--surface-hovered);
    }

    &:active:not([aria-disabled='true']):not([aria-readonly='true']) {
      background-color: var(--xv-container--surface-pressed);
    }
  }

  &[aria-disabled='true'] {
    --x-select-color: var(--xv-text--disabled-text);
    background-color: var(--xv-container--disabled-background);
    cursor: unset;
  }

  &[aria-readonly='true'] {
    cursor: unset;
  }
}

.x-select-arrow {
  width: var(--x-select-arrow-size);
  height: var(--x-select-arrow-size);

  // bad performance! change it
  > path {
    fill: var(--x-select-color);
  }
}

.x-select-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.x-select-text-container {
  display: inline-flex;
  min-width: 0;
  flex-shrink: 1;
  align-items: center;
  margin-right: 0.4rem;
  font-size: var(--x-select-font-size);
  font-weight: var(--x-select-font-weight);
  line-height: var(--x-select-line-height);
  padding: 0 8px;
}

@keyframes select-fade-show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.x-select-menu {
  margin: 0;
  min-width: var(--x-select-menu-min-w, $min-w);
  max-width: var(--x-select-menu-max-w, 18rem);
  max-height: clamp(240px, 18rem, 95vh);
  list-style: none;
  overflow-y: auto;
  z-index: var(--x-select-menu-z-index);
}

.x-select-menu-item {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  user-select: none;
  touch-action: manipulation;
}

.x-select-prefix {
  display: inline-flex;
  --x-icon-color: var(--xv-text--medium-emphasis-text);

  &--disabled {
    --x-icon-color: var(--xv-text--disabled-text);
  }
}
</style>
