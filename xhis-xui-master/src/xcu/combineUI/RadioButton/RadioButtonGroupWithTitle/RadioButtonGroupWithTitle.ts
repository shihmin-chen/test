import { Component, h, ref, unref } from 'vue';

import { MaybeRefOrComputed } from '../../../type';

export interface RadioButtonGroupWithTitleOptions {
  value: string;
  label: string;
}

export interface RadioButtonGroupWithTitleProps {
  title?: MaybeRefOrComputed<string>;
  options: MaybeRefOrComputed<RadioButtonGroupWithTitleOptions[]>;
  isRequired?: MaybeRefOrComputed<boolean>;
  defaultResult?: MaybeRefOrComputed<RadioButtonGroupWithTitleOptions['value']>;
}

export type RadioButtonGroupWithTitleResultType =
  | RadioButtonGroupWithTitleOptions['value']
  | undefined;

export const useRadioButtonGroupWithTitle = <T extends Component>(
  props: RadioButtonGroupWithTitleProps,
  Component: T,
) => {
  const result = ref<RadioButtonGroupWithTitleResultType>(
    unref<RadioButtonGroupWithTitleResultType>(props.defaultResult),
  );

  // h function
  const TemplateRender = () => {
    return h(Component, {
      ...props,
      modelValue: props.defaultResult,
      'onUpdate:modelValue': (value: RadioButtonGroupWithTitleResultType) => {
        result.value = value;
      },
    });
  };

  const template = TemplateRender();

  return { template, result };
};
