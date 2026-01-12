import { h, ref, unref } from 'vue';

import { InputTextProps, MaybeRefOrComputed } from '../../../type';
import InputTextWithTitle from './InputTextWithTitle.vue';

export interface InputTextWithTitleProps {
  title?: MaybeRefOrComputed<string>;
  placeholder?: MaybeRefOrComputed<string>;
  isRequired?: MaybeRefOrComputed<boolean>;
  maxlength?: MaybeRefOrComputed<number>;
  inputTextAttrs?: MaybeRefOrComputed<InputTextProps>;
  defaultResult?: MaybeRefOrComputed<InputTextWithTitlePropsResultType>;
}

export type InputTextWithTitlePropsResultType = string;

export const useInputTextWithTitle = (props: InputTextWithTitleProps) => {
  const result = ref<InputTextWithTitlePropsResultType>(
    unref(props.defaultResult ?? ''),
  );

  // h function
  const TemplateRender = () => {
    return h(InputTextWithTitle, {
      ...props,
      modelValue: props.defaultResult,
      'onUpdate:modelValue': (value: InputTextWithTitlePropsResultType) => {
        result.value = value;
      },
    });
  };

  const template = TemplateRender();
  return { template, result };
};
