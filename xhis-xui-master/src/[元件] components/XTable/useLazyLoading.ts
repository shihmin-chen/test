import { Ref, ref, watch } from 'vue';

type TimeoutId = ReturnType<typeof setTimeout>;

export const useLazyLoading = (
  data: Ref<Record<string, unknown>[]>,
  lazyRender: Ref<boolean>
) => {
  const showConfigs = ref<Array<boolean>>([]);
  let intervalId: TimeoutId;

  watch(
    () => data.value,
    (newData) => {
      if (!lazyRender.value) {
        return;
      }
      const arraySize = newData.length;
      const oldShowConfigSize = showConfigs.value.length;
      const batchSize = 14;

      if (oldShowConfigSize > arraySize) {
        showConfigs.value.length = arraySize;
      } else if (oldShowConfigSize < arraySize) {
        showConfigs.value.push(
          ...new Array<boolean>(arraySize - oldShowConfigSize).fill(false)
        );
      }
      showConfigs.value.fill(true, 0, batchSize);
      const startBatch = Math.max(
        1,
        Math.floor(oldShowConfigSize + 1 / batchSize)
      );

      let batch = startBatch;
      function getIntervalFunc(id: TimeoutId) {
        return () => {
          for (
            let idx = batch;
            idx < batch + batchSize && idx < arraySize;
            idx++
          ) {
            showConfigs.value[idx] = true;
          }
          batch += batchSize;
          if (batch >= arraySize + batchSize - 1) {
            showConfigs.value.fill(true);
            clearInterval(id);
          }
        };
      }
      clearInterval(intervalId); // clear previous setInterval
      intervalId = setInterval(getIntervalFunc(intervalId), 500);
    }
  );

  return { showConfigs };
};
