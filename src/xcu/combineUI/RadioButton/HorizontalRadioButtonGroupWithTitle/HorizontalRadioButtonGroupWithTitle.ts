import {
  type RadioButtonGroupWithTitleProps,
  useRadioButtonGroupWithTitle,
} from '../RadioButtonGroupWithTitle/RadioButtonGroupWithTitle';
import HorizontalRadioButtonGroupWithTitle from './HorizontalRadioButtonGroupWithTitle.vue';

export const useHorizontalRadioButtonGroupWithTitle = (
  props: RadioButtonGroupWithTitleProps,
) => {
  return useRadioButtonGroupWithTitle(
    props,
    HorizontalRadioButtonGroupWithTitle,
  );
};
