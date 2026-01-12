<template>
  <div
    class="x-autocomplete"
    :class="{
      [`x-autocomplete--${size}`]: true,
    }"
    :style="{
        ['--x-autocomplete-max-w' as string]: maxWidth,
        ['--x-autocomplete-min-w' as string]: minWidth,
      }"
    data-testid="x-autocomplete"
    :aria-disabled="disabled"
  >
    <div ref="inputRef">
      <slot name="input" :inputAttrs="localInputAttrs">
        <XInputText
          v-bind="{ ...inputAttrs, disabled, readonly, error }"
          :inputAttrs="localInputAttrs"
          :size="size"
          @mouseover="isHovered = true"
          @mouseout="isHovered = false"
          @focusin="isFocused = true"
          @focusout="isFocused = false"
        >
          <template #prefix>
            <slot name="prefix" />
          </template>
          <template #postfix>
            <XIcon
              v-show="showCaret"
              icon="caret-down"
              class="x-autocomplete-arrow"
            />
          </template>
        </XInputText>
      </slot>
    </div>
    <!-- TOADD: add loading state -->
    <span v-if="loading && false" style="margin-left: 500px">loading...</span>
    <div
      ref="menuRef"
      role="listbox"
      :style="{
        ['--x-autocomplete-menu-max-w' as string]: menuMaxWidth,
        ['--x-autocomplete-menu-max-h' as string]: menuMaxHeight,
      }"
      @mousedown.prevent
    >
      <component
        :is="menuComponent"
        v-if="hasResult && isMenuShown"
        v-bind="menuComponentAttrs"
        :size="size"
        :options="filteredOptions"
      >
        <template #option="params">
          <slot name="option" v-bind="params">
            {{ getOptionLabel(params.option) }}
          </slot>
        </template>
      </component>
      <template v-else>
        <slot name="noResult">
          <div
            class="x-autocomplete-no-result"
            :style="{
              minWidth: menuComponentAttrs.minWidth as string,
            }"
          >
            {{ menuEmptyContent }}
          </div>
        </slot>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { UseVirtualListOptions } from '@vueuse/core';
import { Props as TippyProps } from 'tippy.js';
import {
  computed,
  defineComponent,
  inject,
  nextTick,
  onMounted,
  PropType,
  ref,
  toRefs,
  unref,
  watch,
} from 'vue';

import {
  disableTippyIfNeeded,
  unrefElement,
  useTippy,
  watchDisabledForTippy,
} from '../../composable';
import { useKeyOperations } from '../../composable/useKeyOperations';
import { DataKeyIndex, getKeyIndex } from '../../utils';
import XIcon from '../XIcon/XIcon.vue';
import XInputText from '../XInput/XInputText.vue';
import {
  AutocompleteFilterParams,
  AutocompleteOption,
} from './autocompleteContext';
import { useFilter } from './useFilter';
import { useMenu, useOptionAttrs } from './useMenu';
import XAutocompleteMenu from './XAutocompleteMenu.vue';
import XAutocompleteVirtualMenu from './XAutocompleteVirtualMenu.vue';

export default defineComponent({
  name: 'XAutocomplete',
  components: {
    XAutocompleteMenu,
    XAutocompleteVirtualMenu,
    XIcon,
    XInputText,
  },
  props: {
    size: {
      default: 'md',
      type: String as PropType<'sm' | 'md'>,
    },
    getOptionLabel: {
      type: Function as PropType<
        <T>(option: Record<string, T | string>) => string
      >,
      default: (option: AutocompleteOption) => option.label,
    },
    getOptionValue: {
      type: Function as PropType<
        <T>(option: Record<string, T | string>) => T | string
      >,
      default: (option: AutocompleteOption) => option.value,
    },
    keyIndex: {
      type: [Array, String, Function] as PropType<DataKeyIndex>,
      default: 'value',
    },
    options: {
      type: Array as PropType<AutocompleteOption[] | string[] | number[]>,
      default: () => [],
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    autoSelectText: {
      type: Boolean,
      default: true,
    },
    combobox: {
      type: Boolean,
      default: false,
    },
    hidableCaret: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    inputAttrs: {
      type: Object,
      default: () => ({}),
    },
    loading: {
      type: Boolean,
      default: false,
    },
    minWidth: {
      default: '0',
      type: String,
    },
    maxWidth: {
      default: '18rem',
      type: String,
    },
    menuMinWidth: {
      default: '12rem',
      type: String,
    },
    menuMaxWidth: {
      default: '15rem',
      type: String,
    },
    menuMaxHeight: {
      default: '20rem',
      type: String,
    },
    menuEmptyContent: {
      default: '無相符結果',
      type: String,
    },
    virtual: {
      default: false,
      type: Boolean,
    },
    virtualOptions: {
      default: () => ({
        itemHeight: 40,
        overscan: 5,
      }),
      type: Object as PropType<UseVirtualListOptions>,
    },
    onFocus: {
      default: () => ({}),
      type: Function,
    },
    onBlur: {
      default: () => ({}),
      type: Function,
    },
    // eslint-disable-next-line vue/require-default-prop
    modelValue: null,
    filter: {
      type: Function as PropType<(params: AutocompleteFilterParams) => boolean>,
      default: ({ queryText, optionLabel }: AutocompleteFilterParams) => {
        return (
          optionLabel
            .toLocaleLowerCase()
            .indexOf(queryText.toLocaleLowerCase()) > -1
        );
      },
    },
    tippyOptions: {
      default: undefined,
      type: Object as PropType<Partial<TippyProps>>,
    },
    blurOnSelect: {
      default: false,
      type: Boolean,
    },
    sort: {
      default: false,
      type: Boolean,
    },
    sortWithKey: {
      default: '',
      type: String,
    },
    autoSelectMode: {
      default: false,
      type: Boolean,
    },
    keyLabel: {
      type: String,
      default: 'label',
    },
  },
  emits: ['update:modelValue', 'input'],
  setup(props, { emit }) {
    const {
      autoSelectText,
      blurOnSelect,
      disabled,
      readonly,
      error,
      modelValue,
      options,
      inputAttrs,
      virtual,
      virtualOptions,
    } = toRefs(props);
    const currentOptionIndex = ref(0);
    const inputText = ref('');
    const scrollBoxRef = ref<HTMLElement>();
    const dialogue_name = inject('dialogue_name', undefined);
    const inputBackText = ref('');

    const setAutoSelect = () => {
      if (!props.autoSelectMode || !inputBackText.value) {
        return;
      }
      const defaultOption = (props.options as any[]).find(
        (option: { [x: string]: string }) =>
          option[props.keyLabel].toLowerCase() ===
          inputBackText.value.toLowerCase()
      );
      const defaultValue = defaultOption
        ? defaultOption[props.keyIndex as string]
        : inputBackText.value;
      const defaultLabel = defaultOption
        ? defaultOption[props.keyLabel]
        : inputBackText.value;
      if (defaultValue === modelValue.value) {
        return;
      }
      emit('update:modelValue', defaultValue);
      inputBackText.value = defaultLabel;
    };

    const isMenuDisabled = computed(() => disabled.value || readonly.value);
    const {
      target: inputRef,
      content: menuRef,
      tippyInstance,
      isTippyShown: isMenuShown,
      showTippy,
      hideTippy,
    } = useTippy(undefined, undefined, {
      placement: 'bottom-start',
      interactive: true,
      arrow: false,
      hideOnClick: false,
      trigger: 'click',
      theme: 'dropdown',
      offset: [0, 2],
      duration: [275, 0], // [default, 0]
      maxWidth: 'none',
      ...props.tippyOptions,
      onCreate: (instance) => {
        disableTippyIfNeeded(isMenuDisabled.value, instance);
      },
      onHide: (...args) => {
        doFilterOrInit(true);
        if (shouldRefreshInputText) {
          inputText.value = props.getOptionLabel(unref(selectedOption));
        }
        props.tippyOptions?.onHide?.(...args);
      },
      onShow: (...args) => {
        if (selectedIndex.value > 0) {
          currentOptionIndex.value = selectedIndex.value;
        }
        props.tippyOptions?.onShow?.(...args);
      },
      onMount: (...args) => {
        scrollToOption(currentOptionIndex);
        props.tippyOptions?.onMount?.(...args);
      },
      onClickOutside: (...args) => {
        hideMenu(true);
        props.tippyOptions?.onClickOutside?.(...args);
        setAutoSelect();
      },
    });
    watchDisabledForTippy(isMenuDisabled, tippyInstance);

    let shouldRefreshInputText = true;
    const hideMenu = (refreshInput = false) => {
      // refresh input text when click outside or esc
      shouldRefreshInputText = refreshInput;
      hideTippy();
      shouldRefreshInputText = true;
    };

    const showMenu = () => {
      showTippy();
    };

    const {
      selectedIndex,
      selectedOption,
      filteredOptions,
      hasResult,
      doFilterOrInit,
    } = useFilter(
      options,
      inputText,
      modelValue,
      props.getOptionValue,
      props.getOptionLabel,
      props.filter
    );

    const handleOptionClick = (option: AutocompleteOption) => {
      if (option.disabled === true) {
        return;
      }

      inputText.value = props.getOptionLabel(option);
      emit('update:modelValue', props.getOptionValue(option));
      hideMenu();

      if (unref(blurOnSelect)) {
        const inputElement = unrefElement(inputRef)?.querySelector(
          'input'
        ) as HTMLInputElement;
        inputElement?.blur();
      }
    };

    const handleFocus = () => {
      const inputElement = unrefElement(inputRef)?.querySelector(
        'input'
      ) as HTMLInputElement;
      inputElement?.focus();
    };

    const sortOptions = () => {
      if (!props.sort) {
        return filteredOptions.value;
      }
      const exactMatch: any[] = [];
      const notExactMatch: any[] = [];
      const startsWithValueOptions: any[] = [];
      const notStartsWithValueOptions: any[] = [];
      filteredOptions.value.forEach((option: { [x: string]: any }) => {
        const optionText = props.sortWithKey
          ? option[props.sortWithKey]
          : option.label;
        if (optionText.toLowerCase() === inputText.value.toLowerCase()) {
          exactMatch.push(option);
        } else {
          notExactMatch.push(option);
        }
      });
      notExactMatch.forEach((option) => {
        const optionText = props.sortWithKey
          ? option[props.sortWithKey]
          : option.label;
        if (
          optionText.toLowerCase().startsWith(inputText.value.toLowerCase())
        ) {
          startsWithValueOptions.push(option);
        } else {
          notStartsWithValueOptions.push(option);
        }
      });
      currentOptionIndex.value = 0;
      filteredOptions.value = [
        ...exactMatch,
        ...startsWithValueOptions,
        ...notStartsWithValueOptions,
      ];
    };

    const handleInput = (event: Event) => {
      inputText.value = (event.target as HTMLInputElement).value;
      inputBackText.value = (event.target as HTMLInputElement).value;
      doFilterOrInit(false);
      if (selectedIndex.value <= 0) {
        currentOptionIndex.value = 0;
      }
      showMenu();
      emit('input', inputText.value);
      sortOptions();
    };

    const { keyListeners, getOptionAttrs, scrollToOption } =
      useKeyOperations<AutocompleteOption>(
        filteredOptions,
        scrollBoxRef,
        currentOptionIndex,
        handleOptionClick,
        {
          isMenuShown,
          showMenu,
          hideMenu,
        }
      );

    const localInputAttrs = ref({
      ...keyListeners,
      modelValue: inputText,
      value: inputText,
      disabled,
      readonly,
      error,
      onInput: handleInput,
      ...unref(inputAttrs).inputAttrs,
      onBlur: () => {
        props.onBlur?.();
        hideMenu(true);
      },
      onFocus: (event: Event) => {
        if (autoSelectText.value) {
          (event?.target as HTMLInputElement).select();
        }
        props.onFocus?.();
        showMenu();
      },
    });

    const { getOptionAttrFunc } = useOptionAttrs(
      getOptionAttrs,
      handleOptionClick,
      currentOptionIndex,
      selectedIndex
    );

    const { menuAttrs, menuComponent, menuComponentAttrs } = useMenu(
      virtual,
      virtualOptions,
      scrollBoxRef,
      getOptionAttrFunc,
      computed(() => props.menuMinWidth)
    );

    watch(
      options,
      () => {
        doFilterOrInit(true);
        inputText.value = props.getOptionLabel(unref(selectedOption));
        tippyInstance.value?.popperInstance?.update();
      },
      { immediate: true }
    );
    watch(
      modelValue,
      () => (inputText.value = props.getOptionLabel(unref(selectedOption))),
      { immediate: true }
    );

    if (props.autofocus) {
      onMounted(() => {
        return nextTick(handleFocus);
      });
    }

    const isHovered = ref(false);
    const isFocused = ref(false);

    const showCaret = computed<boolean>(() => {
      return (
        props.combobox &&
        (!props.hidableCaret || isHovered.value || isFocused.value)
      );
    });

    return {
      currentOptionIndex,
      filteredOptions,
      hasResult,
      isMenuShown,
      inputRef,
      inputText,
      inputBackText,
      localInputAttrs,
      menuAttrs,
      menuComponent,
      menuComponentAttrs,
      menuRef,
      scrollBoxRef,
      selectedIndex,
      selectedOption,
      getKeyIndex,
      handleFocus,
      handleInput,
      showMenu,
      sortOptions,
      setAutoSelect,
      tippyInstance,
      isHovered,
      isFocused,
      showCaret,
    };
  },
});
</script>

<style lang="scss">
.x-autocomplete {
  --x-autocomplete-arrow-size: 20px;

  &--sm {
    --x-autocomplete-arrow-size: 16px;
  }

  min-width: var(--x-autocomplete-min-w, 4rem);
  max-width: var(--x-autocomplete-max-w, 18rem);

  &[aria-disabled='true'] {
    color: var(--xv-text--disabled-text);
  }
}

.x-autocomplete-menu {
  max-width: var(--x-autocomplete-menu-max-w, 15rem);
  max-height: var(--x-autocomplete-menu-max-h, 20rem);
}

.x-autocomplete-no-result {
  min-height: 60px;
  padding: 6px 16px;
  display: flex;
  align-items: center;
  background: var(--xv-container--disabled-background);
  color: var(--xv-text--disabled-text);
}

.x-autocomplete-arrow {
  // TODOITEM: use common settings with x-select
  width: var(--x-autocomplete-arrow-size);
  height: var(--x-autocomplete-arrow-size);
}
</style>
