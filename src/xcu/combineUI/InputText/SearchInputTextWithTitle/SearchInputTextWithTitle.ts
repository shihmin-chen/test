import { h, ref, unref } from 'vue';

import { MaybeRefOrComputed } from '../../../type';
import SearchInputTextWithTitle from './SearchInputTextWithTitle.vue';

export interface SearchInputTextWithTitleProps {
  title?: MaybeRefOrComputed<string>;
  placeholder?: MaybeRefOrComputed<string>;
  isRequired?: MaybeRefOrComputed<boolean>;
  defaultResult?: MaybeRefOrComputed<SearchInputTextWithTitlePropsResultType>;
}

export type SearchInputTextWithTitlePropsResultType = string;

export const useSearchInputTextWithTitle = (
  props: SearchInputTextWithTitleProps,
) => {
  const result = ref<SearchInputTextWithTitlePropsResultType>(
    unref(props.defaultResult ?? ''),
  );

  // h function
  const TemplateRender = () => {
    return h(SearchInputTextWithTitle, {
      ...props,
      modelValue: props.defaultResult,
      'onUpdate:modelValue': (
        value: SearchInputTextWithTitlePropsResultType,
      ) => {
        result.value = value;
      },
    });
  };

  const template = TemplateRender();
  return { template, result };
};
