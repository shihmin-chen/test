<template>
  <!-- You could add the classes in parent component -->
  <div>
    <TitleWithRequiredStar :title="title" :is-required="isRequired" />

    <XInputText
      v-model="resultValue"
      :placeholder="computedPlaceholder"
      type="text"
      :input-attrs="inputAttrs"
    />
  </div>
</template>
<script lang="ts">
import { isEmpty, isNil } from 'lodash';
import { v4 as uuid } from 'uuid';
import { computed, defineComponent, PropType, unref } from 'vue';

import { XInputText } from '../../../../../index';

import { useModelValue } from '../../../atomComposables/useModelValue';
import TitleWithRequiredStar from '../../../atomUI/TitleWithRequiredStar.vue';
import { InputTextProps, MaybeRefOrComputed } from '../../../type';

export default defineComponent({
  name: 'InputTextWithTitle',
  components: {
    XInputText,
    TitleWithRequiredStar,
  },
  props: {
    title: {
      type: String as PropType<MaybeRefOrComputed<string>>,
      required: false,
      default: undefined,
    },
    placeholder: {
      type: String as PropType<MaybeRefOrComputed<string>>,
      required: false,
      default: undefined,
    },
    isRequired: {
      type: Boolean as PropType<MaybeRefOrComputed<boolean>>,
      required: false,
      default: false,
    },
    maxlength: {
      type: Number as PropType<MaybeRefOrComputed<number>>,
      required: false,
      default: -1, // no limit
    },
    inputTextAttrs: {
      type: Object as PropType<MaybeRefOrComputed<InputTextProps>>,
      required: false,
      default: () => ({}),
    },
    modelValue: {
      type: String as PropType<MaybeRefOrComputed<string>>,
      required: false,
      default: undefined,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const groupName = uuid();

    const { resultValue } = useModelValue({
      modelValue: props.modelValue,
      // @ts-expect-error emit is not defined in useModelValue
      emit,
    });

    const computedPlaceholder = computed(() => {
      if (isEmpty(unref(resultValue))) {
        return isNil(unref(props.placeholder))
          ? ''
          : unref(props.placeholder)?.toString();
      }
      return '';
    });

    const inputAttrs = computed(() => ({
      ...unref(props.inputTextAttrs),
      maxlength: unref(props.maxlength),
    }));

    return {
      groupName,
      inputAttrs,
      computedPlaceholder,
      resultValue,
    };
  },
});
</script>
