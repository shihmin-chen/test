<template>
  <!-- You could add the classes in parent component -->
  <RadioButtonGroupWithTitle
    :model-value="modelValue"
    :title="title"
    :options="options"
    :is-required="isRequired"
    direction="horizontal"
    @update:model-value="($event) => $emit('update:modelValue', $event)"
  />
</template>
<script lang="ts">
import { PropType, defineComponent } from 'vue';

import RadioButtonGroupWithTitle from '../../../combineUI/RadioButton/RadioButtonGroupWithTitle/RadioButtonGroupWithTitle.vue';
import { MaybeRefOrComputed } from '../../../type';

export default defineComponent({
  name: 'HorizontalRadioButtonGroupWithTitle',
  components: {
    RadioButtonGroupWithTitle,
  },
  props: {
    title: {
      type: String as PropType<MaybeRefOrComputed<string>>,
      required: false,
      default: undefined,
    },
    options: {
      type: Array as PropType<MaybeRefOrComputed<{ value: string; label: string }[]>>,
      required: true,
    },
    isRequired: {
      type: Boolean as PropType<MaybeRefOrComputed<boolean>>,
      required: false,
      default: false,
    },
    modelValue: {
      type: String as PropType<MaybeRefOrComputed<string>>,
      required: false,
      default: undefined,
    },
  },
  emits: ['update:modelValue'],
});
</script>
