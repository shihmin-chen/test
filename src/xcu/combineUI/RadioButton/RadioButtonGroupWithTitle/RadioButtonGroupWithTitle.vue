<template>
  <div>
    <TitleWithRequiredStar :title="title" :is-required="isRequired" />

    <XRadioButtonGroup
      v-model="resultValue"
      :name="groupName"
      :class="`p-0 flex flex-wrap ${direction === 'horizontal' ? 'flex-row' : 'flex-col'}`"
    >
      <XRadioButton
        v-for="{ value, label } in computedOptions"
        :key="value"
        :value="value"
        :label="label"
      />
    </XRadioButtonGroup>
  </div>
</template>
<script lang="ts">
import { v4 as uuid } from 'uuid';
import { computed, defineComponent, PropType, unref } from 'vue';

import { XRadioButton, XRadioButtonGroup } from '../../../../../index';

import { useModelValue } from '../../../atomComposables/useModelValue';
import TitleWithRequiredStar from '../../../atomUI/TitleWithRequiredStar.vue';
import { MaybeRefOrComputed } from '../../../type';

export default defineComponent({
  name: 'VerticalRadioButtonGroupWithTitle',
  components: {
    XRadioButton,
    XRadioButtonGroup,
    TitleWithRequiredStar,
  },
  props: {
    title: {
      type: String as PropType<MaybeRefOrComputed<string>>,
      required: false,
      default: undefined,
    },
    options: {
      type: Array as PropType<
        MaybeRefOrComputed<{ value: string; label: string }[]>
      >,
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
    direction: {
      type: String as PropType<'vertical' | 'horizontal'>,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const groupName = uuid();

    const computedOptions = computed(() => unref(props.options));

    const { resultValue } = useModelValue({
      modelValue: props.modelValue,
      // @ts-expect-error emit is not defined in useModelValue
      emit,
    });

    return {
      groupName,
      computedOptions,
      resultValue,
    };
  },
});
</script>
