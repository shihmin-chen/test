import { type VueDatePickerProps } from '@vuepic/vue-datepicker';

import { XInputText } from '../XInput';

export type CalendarType = 'ROC' | 'Gregorian' | 'default';

export type XDateTimePickerInputConfig = Omit<
  InstanceType<typeof XInputText>['$props'],
  'modelValue'
>;

export type XDateTimePickerCustomConfig = VueDatePickerProps;
