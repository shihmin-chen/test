import { computed, ComputedRef, Ref, ref, unref } from 'vue';
import { MaybeRef, UseVirtualListOptions } from '@vueuse/core';
import { AutocompleteOption } from './autocompleteContext';

interface MenuObject {
  menuAttrs: Record<string, unknown>;
  menuComponent: ComputedRef<string>;
  menuComponentAttrs: ComputedRef<Record<string, unknown>>;
  scrollBoxRef: Ref<HTMLElement | undefined>;
}

const useOptionAttrs = (
  getOptionAttrs: (index: number) => Record<string, unknown>,
  onOptionMousedown: (option: AutocompleteOption) => void,
  currentOptionIndex: MaybeRef<number>,
  selectedIndex: MaybeRef<number>
) => {
  const getOptionAttrFunc = (option: AutocompleteOption, index: number) => ({
    ...getOptionAttrs(index),
    role: 'option',
    onMousedown: () => onOptionMousedown(option),
    selected: unref(selectedIndex) === index,
    keyboardActive: unref(currentOptionIndex) === index,
  });

  return { getOptionAttrFunc };
};

const useMenu = (
  isVirtual: MaybeRef<boolean>,
  virtualOptions: MaybeRef<UseVirtualListOptions>,
  scrollBoxRef: Ref<HTMLElement | undefined>,
  getOptionAttrs: (option: AutocompleteOption, index: number) => unknown,
  menuMinWidth: Ref<string>
): MenuObject => {
  const localScrollBoxRef = ref(scrollBoxRef);

  const menuAttrs = {
    class: ['x-autocomplete-menu'],
    ref: localScrollBoxRef,
  };

  const menuComponent = computed(() => {
    return unref(isVirtual) ? 'XAutocompleteVirtualMenu' : 'XAutocompleteMenu';
  });

  const baseAttrs = {
    menuAttrs,
    getOptionAttrs,
  };

  const menuComponentAttrs = computed(() => {
    const attrs = {
      ...baseAttrs,
      minWidth: menuMinWidth.value,
    };
    if (unref(isVirtual)) {
      return {
        ...attrs,
        virtualOptions: unref(virtualOptions),
      };
    }
    return attrs;
  });

  return {
    menuAttrs,
    menuComponent,
    menuComponentAttrs,
    scrollBoxRef: localScrollBoxRef,
  };
};

export { useMenu, useOptionAttrs };
