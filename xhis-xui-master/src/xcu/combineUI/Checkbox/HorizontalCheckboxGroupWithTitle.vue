<template>
  <div>
    <TitleWithRequiredStar :title="title" :is-required="isRequired" />
    <CheckboxAll v-if="isParentCheckboxShown" />
    <HorizontalLine />
    <CheckboxGroup />
  </div>
</template>
<script setup lang="ts">
import { isNil } from 'lodash';
import { computed, ref } from 'vue';

import { CheckboxState } from '../../../../index';

import { useAbstractModelValue } from '../../atomComposables/useAbstractModelValue';
import { useCheckboxGroupLinkage } from '../../atomComposables/useCheckboxGroupLinkage';
import HorizontalLine from '../../atomUI/HorizontalLine.vue';
import TitleWithRequiredStar from '../../atomUI/TitleWithRequiredStar.vue';
import { MaybeRefOrComputed, RefOrWritableComputed } from '../../type';

const props = defineProps<{
  title?: MaybeRefOrComputed<string>;
  isRequired?: MaybeRefOrComputed<boolean>;
  parentCheckboxState?: MaybeRefOrComputed<CheckboxState>;
  childrenCheckboxState: RefOrWritableComputed<CheckboxState[]>;
}>();

const emit = defineEmits<{
  'update:parentState': [CheckboxState];
  'update:childrenState': [CheckboxState[]];
}>();

const isParentCheckboxShown = computed(() => !isNil(props.parentCheckboxState));

const nullParentCheckboxState = ref<CheckboxState>({
  key: '',
  display: '',
  checked: false,
  indeterminate: false,
  disabled: false,
});

const { CheckboxAll, CheckboxGroup } = useCheckboxGroupLinkage({
  parentCheckboxState: isNil(props.parentCheckboxState)
    ? nullParentCheckboxState
    : props.parentCheckboxState,
  childrenCheckboxState: props.childrenCheckboxState,
});

useAbstractModelValue<CheckboxState>({
  modelValue: props.parentCheckboxState,
  // @ts-expect-error update:parentState is a valid event
  emit,
  eventString: 'update:parentState',
});

useAbstractModelValue<CheckboxState[]>({
  modelValue: props.childrenCheckboxState,
  // @ts-expect-error update:childrenState is a valid event
  emit,
  eventString: 'update:childrenState',
});
</script>
