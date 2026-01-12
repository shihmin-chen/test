import { h } from 'vue';

import { CheckboxState } from '../../../../index';

import { MaybeRefOrComputed, RefOrWritableComputed } from '../../type';
import HorizontalCheckboxGroupWithTitle from './HorizontalCheckboxGroupWithTitle.vue';

export interface CheckboxGroupWithTitleProps {
  title?: MaybeRefOrComputed<string>;
  isRequired?: MaybeRefOrComputed<boolean>;
  parentCheckboxState?: MaybeRefOrComputed<CheckboxState>;
  childrenCheckboxState: RefOrWritableComputed<CheckboxState[]>;
}

export const useHorizontalCheckboxGroupWithTitle = (
  props: CheckboxGroupWithTitleProps,
  onUpdateParentStateCallback?: (value: CheckboxState) => void,
  onUpdateChildrenStateCallback?: (value: CheckboxState[]) => void,
) => {
  // h function
  const TemplateRender = () => {
    return h(HorizontalCheckboxGroupWithTitle, {
      ...props,
      'onUpdate:parentState': (value: CheckboxState) => {
        onUpdateParentStateCallback?.(value);
      },
      'onUpdate:childrenState': (value: CheckboxState[]) => {
        onUpdateChildrenStateCallback?.(value);
      },
    });
  };

  const template = TemplateRender();

  return { template };
};
