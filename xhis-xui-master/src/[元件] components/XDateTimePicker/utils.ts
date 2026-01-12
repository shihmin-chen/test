import { CustomClass } from '@vuepic/vue-datepicker';
import dayjs from 'dayjs';
import { isNil } from 'lodash';

import { CalendarType } from './types';

export const convertADYearToROCYear = (ADYear: number) => ADYear - 1911;

export const dateTimeFormat = (
  calendarType: CalendarType = 'default',
  enableTimePicker: boolean = false,
) => {
  let format = 'YYYY-MM-DD';
  if (enableTimePicker) {
    format = `${format} HH:mm`;
  }
  if (calendarType === 'ROC') {
    return (date: Date | null | undefined) =>
      isNil(date)
        ? ''
        : dayjs(date).format(
            format.replaceAll(
              'YYYY',
              `${convertADYearToROCYear(date.getFullYear())}`.padStart(3, '0'),
            ),
          );
  }

  return (date: Date | null | undefined) =>
    isNil(date) ? '' : dayjs(date).format(format);
};

export const concateDatePickerClass = (
  ...classArray: CustomClass[]
): string[] =>
  classArray.reduce<string[]>((uiClassArray, className) => {
    if (typeof className === 'string') {
      return [...uiClassArray, ...className.split(' ')];
    }
    return [...uiClassArray, ...className];
  }, []);
