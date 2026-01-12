import {
  computed,
  onDeactivated,
  onUnmounted,
  Ref,
  ref,
  unref,
  watch,
} from 'vue';

import { MaybeRefOrComputed } from '../type';

interface UseAbstractModelValueParams<ResultType> {
  modelValue: MaybeRefOrComputed<ResultType | undefined>;
  emit: (event: string, value: ResultType | undefined) => void;
  eventString: string;
  destroyedResultValue?: ResultType;
}

export const useAbstractModelValue = <ResultType>({
  modelValue,
  emit,
  eventString,
  destroyedResultValue,
}: UseAbstractModelValueParams<ResultType>) => {
  const _resultValue = ref(unref(modelValue)) as Ref<ResultType | undefined>;
  const resultValue = computed<ResultType | undefined>({
    get: () => unref(_resultValue),
    set: (value: ResultType | undefined) => {
      _resultValue.value = value;
    },
  });
  const event = eventString;

  watch(
    () => unref(resultValue),
    (value) => {
      emit(event, value);
    },
    { deep: true, immediate: true },
  );

  onUnmounted(() => {
    resultValue.value = unref(destroyedResultValue);
    emit(event, resultValue.value);
  });

  onDeactivated(() => {
    resultValue.value = unref(destroyedResultValue);
    emit(event, resultValue.value);
  });

  return { resultValue };
};
