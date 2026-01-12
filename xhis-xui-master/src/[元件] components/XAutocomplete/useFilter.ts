import { MaybeRef } from '@vueuse/core';
import { computed, Ref, ref, unref } from 'vue';

import {
  AutocompleteFilterParams,
  AutocompleteOption,
} from './autocompleteContext';

interface FilterObject {
  selectedIndex: Ref<number>;
  selectedOption: Ref<AutocompleteOption>;
  filteredOptions: Ref<AutocompleteOption[]>;
  hasResult: Ref<boolean>;
  doFilterOrInit: (init: boolean) => void;
}

const useFilter = (
  options: MaybeRef<AutocompleteOption[] | string[] | number[]>,
  queryText: MaybeRef<string>,
  modelValue: MaybeRef<unknown>,
  getOptionValue: (option: AutocompleteOption) => unknown,
  getOptionLabel: (option: AutocompleteOption) => string,
  filter: (params: AutocompleteFilterParams) => boolean,
): FilterObject => {
  const localOptions = computed(() => {
    return unref(options).map(
      (option: AutocompleteOption | string | number) => {
        return typeof option !== 'object'
          ? { label: `${option}`, value: option }
          : option;
      },
    );
  });

  const selectedOption = computed(() => {
    // TODOITEM: consider value of object/array type
    return (
      unref(localOptions).filter(
        (option) => getOptionValue(option) === unref(modelValue),
      )[0] ?? {}
    );
  });

  const selectedIndex = computed(() => {
    return unref(filteredOptions).findIndex(
      // TODOITEM: fix type error
      (option: AutocompleteOption) =>
        getOptionValue(option) === unref(modelValue),
    );
  });

  const filteredOptions = ref();
  const hasResult = computed(() => !!filteredOptions.value.length);

  const doFilterOrInit = (init: boolean) => {
    if (unref(queryText) && !init) {
      filteredOptions.value = localOptions.value.filter((option) => {
        return filter({
          queryText: unref(queryText),
          option,
          optionLabel: getOptionLabel(option),
        });
      });
    } else {
      filteredOptions.value = [...localOptions.value];
    }
  };

  return {
    selectedIndex,
    selectedOption,
    filteredOptions,
    hasResult,
    doFilterOrInit,
  };
};

export { useFilter };
