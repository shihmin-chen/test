import { VueDatePickerProps } from '@vuepic/vue-datepicker';
import dayjs from 'dayjs';

export const DEFAULT_DATE_TIME_PICKER_CONFIG: VueDatePickerProps = {
  yearFirst: true,
  placeholder: '--',
  selectText: 'Select',
  cancelText: 'Cancel',
  sixWeeks: true,
  enableTimePicker: false,
  yearRange: [1912, 2100],
};

export const CHT_DATE_TIME_PICKER_CONFIG: VueDatePickerProps = {
  ...DEFAULT_DATE_TIME_PICKER_CONFIG,
  locale: 'zh-Hant',
  selectText: '確定',
  cancelText: '取消',
  dayNames: ['一', '二', '三', '四', '五', '六', '日'],
};

export const CHT_DATE_TIME_PICKER_NOW_BUTTON_INFO = {
  label: '今日',
  getNow: () => dayjs().startOf('day').toDate(),
};

export const CHT_RANGE_DATE_TIME_PICKER_NOW_BUTTON_INFO = {
  label: '今日到今日',
  getNow: () => [
    dayjs().startOf('day').toDate(),
    dayjs().startOf('day').toDate(),
  ],
};
