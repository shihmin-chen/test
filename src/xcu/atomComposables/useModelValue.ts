import { MaybeRefOrComputed } from '../type';
import { useAbstractModelValue } from './useAbstractModelValue';

export const useModelValue = <ResultType>({
  modelValue,
  emit,
  destroyedResultValue,
}: {
  modelValue: MaybeRefOrComputed<ResultType | undefined>;
  emit: (event: unknown, ...args: unknown[]) => void;
  destroyedResultValue?: ResultType;
}) =>
  useAbstractModelValue({
    modelValue,
    emit,
    destroyedResultValue,
    eventString: 'update:modelValue',
  });
