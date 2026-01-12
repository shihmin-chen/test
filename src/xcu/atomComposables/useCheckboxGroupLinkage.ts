import { h } from 'vue';

import { CheckboxState, useCheckboxLinkage } from '../../../index';

import CheckboxAll from '../atomUI/CheckboxAll.vue';
import CheckboxGroup from '../atomUI/CheckboxGroup.vue';
import { MaybeRefOrComputed } from '../type';

export interface CheckboxGroupLinkageProps {
  parentCheckboxState: MaybeRefOrComputed<CheckboxState>;
  childrenCheckboxState: MaybeRefOrComputed<CheckboxState[]>;
}

export const useCheckboxGroupLinkage = (props: CheckboxGroupLinkageProps) => {
  const { handleUpdateParentCheckbox, handleUpdateChildrenCheckbox } =
    useCheckboxLinkage(
      // @ts-expect-error: parentCheckboxState, childrenCheckboxState
      props.parentCheckboxState,
      props.childrenCheckboxState as unknown,
    );

  const CheckboxAllTemplateRender = () => {
    return h(CheckboxAll, {
      parentCheckboxState: props.parentCheckboxState,
      handleUpdateParentCheckbox,
    });
  };

  const CheckboxGroupTemplateRender = () => {
    return h(CheckboxGroup, {
      childrenCheckboxState: props.childrenCheckboxState,
      handleUpdateChildrenCheckbox,
    });
  };

  const CheckboxAllRender = CheckboxAllTemplateRender();
  const CheckboxGroupRender = CheckboxGroupTemplateRender();

  return {
    CheckboxAll: CheckboxAllRender,
    CheckboxGroup: CheckboxGroupRender,
  };
};
