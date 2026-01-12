import {
  type RadioButtonGroupWithTitleProps,
  useRadioButtonGroupWithTitle,
} from '../RadioButtonGroupWithTitle/RadioButtonGroupWithTitle';
import VerticalRadioButtonGroupWithTitle from './VerticalRadioButtonGroupWithTitle.vue';

export const useVerticalRadioButtonGroupWithTitle = (
  props: RadioButtonGroupWithTitleProps,
) => {
  return useRadioButtonGroupWithTitle(props, VerticalRadioButtonGroupWithTitle);
};
