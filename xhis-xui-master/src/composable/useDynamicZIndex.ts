import {
  computed,
  onBeforeMount,
  onUnmounted,
  reactive,
  Ref,
  watch,
} from 'vue';

export enum DefaultZIndex {
  PopupWindows = 1000,
  XNotification = 5000,
  XToast = 10000,
  Tooltip = 50000,
  OfflineMask = 79999,
  OfflineXNotification = 80000,
}

const state = reactive({
  idCounter: 0,
  sortingArray: new Array<number>(),
});

export const useDynamicZIndex = (show: Ref<boolean>) => {
  const id = state.idCounter++;

  const zIndex = computed(() => {
    if (show.value !== true) {
      return 0;
    }

    const index = state.sortingArray.indexOf(id);
    return index * 10;
  });

  const join = () => {
    const index = state.sortingArray.indexOf(id);
    if (index === -1) {
      state.sortingArray.push(id);
    } else {
      bump();
    }
  };

  const leave = () => {
    const index = state.sortingArray.indexOf(id);
    if (index > -1) {
      state.sortingArray.splice(index, 1);
    }
  };

  const bump = () => {
    leave();
    join();
  };

  onBeforeMount(() => {
    join();
  });

  onUnmounted(() => {
    leave();
  });

  watch(
    show,
    (newShow) => {
      if (newShow) {
        bump();
      }
    },
    {
      immediate: true,
    }
  );

  return {
    zIndex,
  };
};
