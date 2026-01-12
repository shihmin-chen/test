<template>
  <div class="xd-block" style="height: 600px">
    <div class="options" style="margin-bottom: 1rem">
      <div class="xd-column">
        <XCheckbox v-model="error" size="sm">Error</XCheckbox>
      </div>
    </div>
    <div class="xd-column" style="margin-bottom: 1rem">
      <div class="x-flex xd-space">
        <XButton @click="openMenu">open menu</XButton>
        <XButton @click="closeMenu">close menu</XButton>
      </div>
    </div>
    <div style="margin-bottom: 0.5rem">v-model value: {{ date }}</div>
    <XDateTimePicker
      ref="dp"
      calendarType="ROC"
      v-model="date"
      :inputConfig="inputConfig"
      :customConfig="customConfig"
    />
  </div>
  <!--  TODO: add more info -->
  <!-- <dl class="xd-desc"> -->
  <!--   <h4>Props</h4> -->
  <!--   <dt>isLunar: boolean</dt> -->
  <!--   <dd>change calendar style and show lunar info</dd> -->
  <!--   <dt>customMark: Date|string[]</dt> -->
  <!--   <dd>mark date in lunar calendar, for normal use mark props</dd> -->
  <!--   <dt>error: boolean</dt> -->
  <!--   <dd>Indicate whether any error</dd> -->
  <!--   <h4>Methods</h4> -->
  <!--   <dt>openMenu: function</dt> -->
  <!--   <dd> -->
  <!--     when calling parent.value.$refs.date.openMenu(), menu would be open. -->
  <!--   </dd> -->
  <!--   <dt>closeMenu: function</dt> -->
  <!--   <dd> -->
  <!--     when calling parent.value.$refs.date.closeMenu(), menu would be close. -->
  <!--   </dd> -->
  <!-- </dl> -->
</template>

<script lang="ts">
import { computed, defineComponent, ref, useTemplateRef, watch } from 'vue';

import XButton from '../XButton/XButton.vue';
import XCheckbox from '../XCheckbox/XCheckbox.vue';
import { XDateTimePickerCustomConfig } from './types';
import XDateTimePicker from './XDateTimePicker.vue';

export default defineComponent({
  name: 'XDateTimePickerDemo',
  tabName: 'XDateTimePicker',
  components: { XButton, XCheckbox, XDateTimePicker },
  setup() {
    const date = ref('');
    const error = ref(false);
    const message = ref('');
    const dp = useTemplateRef('dp');

    const inputConfig = computed(() => ({
      error: error.value,
      message: message.value,
    }));
    const customConfig = computed<XDateTimePickerCustomConfig>(() => ({
      range: true,
      multiCalendars: 2,
      offset: error.value && message.value ? -10 : 10,
      clearable: true,
    }));

    const openMenu = () => {
      if (dp.value) {
        // @ts-expect-error: cannot get expose type
        dp.value.dateTimePicker.openMenu();
      }
    };

    const closeMenu = () => {
      if (dp.value) {
        // @ts-expect-error: cannot get expose type
        dp.value.dateTimePicker.closeMenu();
      }
    };

    watch(error, (newVal) => {
      if (newVal) {
        message.value = 'error message';
      } else {
        message.value = '';
      }
    });

    return {
      date,
      error,
      inputConfig,
      customConfig,
      openMenu,
      closeMenu,
    };
  },
});
</script>
