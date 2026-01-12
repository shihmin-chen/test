<script setup lang="ts">
import DateTimePicker, { DatePickerInstance } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { isEmpty, isNil } from 'lodash';
import { computed, toRefs, useTemplateRef } from 'vue';

import { XButton } from '../XButton';
import { XIcon } from '../XIcon';
import { XInputText } from '../XInput';
import {
  CHT_DATE_TIME_PICKER_CONFIG,
  CHT_DATE_TIME_PICKER_NOW_BUTTON_INFO,
  CHT_RANGE_DATE_TIME_PICKER_NOW_BUTTON_INFO,
  DEFAULT_DATE_TIME_PICKER_CONFIG,
} from './constants';
import {
  CalendarType,
  XDateTimePickerCustomConfig,
  XDateTimePickerInputConfig,
} from './types';
import {
  concateDatePickerClass,
  convertADYearToROCYear,
  dateTimeFormat,
} from './utils';

type Props = {
  calendarType?: CalendarType;
  menuYearFormat?: (value: number) => string;
  menuMonthFormat?: (monthInfo: { text: string; value: number }) => string;
  inputConfig?: XDateTimePickerInputConfig;
  customConfig?: XDateTimePickerCustomConfig;
};

const props = withDefaults(defineProps<Props>(), {
  calendarType: 'default',
  inputConfig: () => ({}),
  customConfig: () => ({}),
});
const {
  customConfig,
  calendarType,
  inputConfig,
  menuYearFormat,
  menuMonthFormat,
} = toRefs(props);

const date = defineModel<Date | [Date, Date]>();

const isDefaultOrRangePicker = computed(
  () =>
    !customConfig.value?.yearPicker &&
    !customConfig.value?.monthPicker &&
    !customConfig.value?.weekPicker &&
    !customConfig.value?.timePicker &&
    !customConfig.value?.quarterPicker,
);

const dateTimePickerConfig = computed<XDateTimePickerCustomConfig>(() => {
  let config: XDateTimePickerCustomConfig = {};

  switch (calendarType.value) {
    case 'ROC':
    case 'Gregorian':
      config = CHT_DATE_TIME_PICKER_CONFIG;
      break;
    default:
      config = DEFAULT_DATE_TIME_PICKER_CONFIG;
      break;
  }

  return {
    ...config,
    ...customConfig.value,
  };
});

const getDateTimeFormat = computed(() => {
  if (
    calendarType.value === 'default' ||
    !isDefaultOrRangePicker.value ||
    customConfig.value.format
  ) {
    return dateTimePickerConfig.value.format;
  }
  const format = dateTimeFormat(
    calendarType.value,
    customConfig.value.enableTimePicker,
  );
  if (dateTimePickerConfig.value.range) {
    return (date: Date[] | null | undefined) => {
      if (isNil(date?.[0]) || isNil(date?.[1])) return '';
      return `${format(date[0])} 至 ${format(date[1])}`;
    };
  }
  return format;
});
const getMenuYearFormat = computed(() => {
  if (isNil(menuYearFormat.value)) {
    switch (calendarType.value) {
      case 'ROC':
        return (value: number) => `${convertADYearToROCYear(value)} 年`;
      case 'Gregorian':
      default:
        return (value: number) => `${value}`;
    }
  }
  return menuYearFormat.value;
});
const getMenuMonthFormat = computed(() => {
  if (isNil(menuMonthFormat.value)) {
    switch (calendarType.value) {
      case 'ROC':
      case 'Gregorian':
        return (monthInfo: { text: string; value: number }) =>
          `${monthInfo.value + 1} 月`;
      default:
        return (monthInfo: { text: string; value: number }) =>
          `${monthInfo.text}`;
    }
  }
  return menuMonthFormat.value;
});

const uiClass = computed(() => ({
  ...(customConfig.value.ui ?? {}),
  calendarCell: concateDatePickerClass(
    'x-dp__calendar_cell',
    customConfig.value.ui?.calendarCell ?? [],
  ),
  menu: concateDatePickerClass('x-dp__menu', customConfig.value.ui?.menu ?? []),
}));

const dp = useTemplateRef<DatePickerInstance>('dp');

const selectDate = () => dp.value?.selectDate();
const updateInternalModelValue = (date: Date | Date[]) =>
  dp.value?.updateInternalModelValue(date);

const nowButtonInfo = computed(() => {
  if (calendarType.value === 'default' || !isDefaultOrRangePicker.value)
    return null;

  let label = CHT_DATE_TIME_PICKER_NOW_BUTTON_INFO.label;
  let getNow: () => Date | Date[] = CHT_DATE_TIME_PICKER_NOW_BUTTON_INFO.getNow;

  if (customConfig.value?.range) {
    label = CHT_RANGE_DATE_TIME_PICKER_NOW_BUTTON_INFO.label;
    getNow = CHT_RANGE_DATE_TIME_PICKER_NOW_BUTTON_INFO.getNow;
  }

  const onClick = () => {
    updateInternalModelValue(getNow());
    if (dateTimePickerConfig.value.autoApply) {
      selectDate();
    }
  };

  return { label, onClick };
});

/**
 * WORKAROUND:
 * 在這個 datetime picker component 中:
 * - date model value: 表示外部使用時綁定的 Date 物件。
 * - internal model value: 表示 `@vuepic/vue-datepicker` 中，將 date model value format 成 string type 後的值。
 * 經實測，當沒選擇日期而 click outside 時，date model value 如預期是原本的值，但 internal model value 卻會被設為 `null`。
 * 而由於 `dp-input` slot 中的 `value` 參數似乎就是來自 internal model value，
 * 導致後續 UI 更新時，該 slot 內的顯示會變成使用到 `null`。
 * 因此以下在觸發 internal model value change 的 event 時，當其值變為空且 date model value 還有值時，將 model value 的值進行同步。
 * 以確保不會發生外部持有的 date model value 和內部顯示用的 internal model value 值不同步的狀況。
 */
const onInternalModelChange = (value: string) => {
  if (isNil(value) && !isNil(date.value)) {
    dp.value?.updateInternalModelValue(date.value);
  }
}

defineExpose({
  dateTimePicker: dp,
});
</script>

<template>
  <DateTimePicker
    ref="dp"
    v-model="date"
    v-bind="dateTimePickerConfig"
    :format="getDateTimeFormat"
    :ui="uiClass"
    @internal-model-change="onInternalModelChange"
  >
    <template #dp-input="{ value, onClear, openMenu }">
      <XInputText
        :model-value="value"
        :input-attrs="{ style: { cursor: 'pointer' } }"
        v-bind="{
          readonly: true,
          ...inputConfig,
        }"
      >
        <template v-if="!customConfig.hideInputIcon" #prefix>
          <slot name="x-input-icon">
            <XIcon
              style="cursor: pointer"
              height="24"
              width="24"
              icon="calendar"
              color="var(--xv-text--medium-emphasis-text)"
              @click="openMenu"
            />
          </slot>
        </template>
        <template
          v-if="customConfig.clearable && !isNil(value) && !isEmpty(value)"
          #postfix
        >
          <XIcon
            style="cursor: pointer"
            height="16"
            width="16"
            icon="error-filled"
            color="var(--xv-text--disabled-text)"
            @click.stop.prevent="onClear"
          />
        </template>
      </XInputText>
    </template>

    <template #clear-icon></template>

    <template #year="{ value }">
      <div class="x-dp__menu-year">
        <XIcon
          height="24"
          width="24"
          icon="calendar"
          color="var(--xv-text--high-emphasis-text)"
        />
        <span data-testid="menu-year">
          {{ getMenuYearFormat(value) }}
        </span>
      </div>
    </template>
    <template #year-overlay-value="{ value }">
      {{ getMenuYearFormat(value) }}
    </template>

    <template #month="{ text, value }">
      <div class="x-dp__menu-month">
        <XIcon
          height="24"
          width="24"
          icon="calendar"
          color="var(--xv-text--high-emphasis-text)"
        />
        <span data-testid="menu-month">
          {{ getMenuMonthFormat({ text, value }) }}
        </span>
      </div>
    </template>
    <template #month-overlay-value="{ text, value }">
      {{ getMenuMonthFormat({ text, value }) }}
    </template>

    <template #calendar-icon>
      <XIcon
        height="24"
        width="24"
        icon="arrow-left"
        color="var(--xv-text--medium-emphasis-text)"
      />
    </template>

    <template
      v-if="
        $slots['x-action-extra'] ||
        (customConfig?.autoApply && !isNil(nowButtonInfo))
      "
      #action-extra
    >
      <slot v-if="$slots['x-action-extra']" name="x-action-extra"></slot>
      <slot v-else name="x-now-button">
        <div class="x-dp__action-extra">
          <XButton
            data-testid="action-extra-now-button"
            v-if="!isNil(nowButtonInfo)"
            outline
            theme="tertiary"
            size="sm"
            @click.stop="nowButtonInfo.onClick"
          >
            {{ nowButtonInfo.label }}
          </XButton>
        </div>
      </slot>
    </template>

    <!-- When customConfig.autoApply is true, the slot #action-buttons will be hidden -->
    <template #action-buttons>
      <div class="x-dp__action-buttons">
        <slot name="x-now-button">
          <XButton
            data-testid="action-buttons-now-button"
            v-if="!isNil(nowButtonInfo)"
            outline
            theme="tertiary"
            size="sm"
            @click.stop="nowButtonInfo.onClick"
          >
            {{ nowButtonInfo.label }}
          </XButton>
        </slot>
        <XButton size="sm" @click.stop="selectDate">
          {{
            dateTimePickerConfig.selectText ??
            DEFAULT_DATE_TIME_PICKER_CONFIG.selectText
          }}
        </XButton>
      </div>
    </template>
  </DateTimePicker>
</template>

<style lang="css" src="./patch.css"></style>

<style lang="scss">
.dp--header-wrap {
  padding-bottom: 5px;
}
.dp__month_year_wrap {
  column-gap: 4px;
  justify-content: center;
}
.dp__month_year_select {
  width: auto;
}
.dp__calendar_item {
  display: flex;
  justify-content: center;
}
.dp--tp-wrap {
  max-width: 100%;
}
.dp__arrow_top {
  display: none;
}
.dp__arrow_bottom {
  display: none;
}
.dp__calendar_header_separator {
  display: none;
}
.x-dp__menu {
  box-shadow: var(--xv-shadow-l);
}
.x-dp__calendar_cell {
  width: 40px;
}
.x-dp__clear-icon {
  display: flex;
  padding: 0 8px;
}
.x-dp__menu-year,
.x-dp__menu-month {
  display: flex;
  align-items: center;
  column-gap: 4px;
}
.x-dp__action-extra {
  display: flex;
  justify-content: flex-end;
  padding: var(--dp-action-row-padding);
}
.x-dp__action-buttons {
  display: flex;
  column-gap: 8px;
}
</style>
