import { computed, nextTick, Ref, ref, watch } from 'vue';
import { useResizeObserver, useScroll } from '@vueuse/core';
import { XTableShadowOptions, getDefaultShadowOptions } from './XTableConfig';

interface UseShadowOptions {
  targetRef: Ref<HTMLElement | undefined>;
  tableHeaderRef: Ref<HTMLElement | undefined>;
  tableHeaderDefaultHeight: number;
  data: Ref<Record<string, unknown>[]>;
  enableShadow: Ref<boolean>;
  shadowOptions: Ref<XTableShadowOptions>;
}

const useShadow = ({
  targetRef,
  tableHeaderRef,
  tableHeaderDefaultHeight,
  data,
  enableShadow,
  shadowOptions,
}: UseShadowOptions) => {
  const topShadow = ref(false);
  const topShadowHeight = ref(tableHeaderDefaultHeight);
  const bottomShadow = ref(false);
  const isHorizontalScroll = ref(false);

  const computedShadowOptions = computed(() => ({
    ...getDefaultShadowOptions(),
    ...shadowOptions.value,
  }));

  const toggleShadow = () => {
    const target = targetRef.value;
    if (!target) {
      topShadow.value = false;
      bottomShadow.value = false;
      return;
    }

    const tolerance = 1;
    const hasVerticalScrollbar = target.clientHeight < target.scrollHeight;
    const scrolledToTop = target.scrollTop === 0;
    const scrolledFromTop = target.offsetHeight + target.scrollTop + tolerance;
    const scrolledToBottom = scrolledFromTop >= target.scrollHeight;

    topShadow.value =
      enableShadow.value &&
      computedShadowOptions.value.top &&
      hasVerticalScrollbar &&
      !scrolledToTop;

    bottomShadow.value =
      enableShadow.value &&
      computedShadowOptions.value.bottom &&
      hasVerticalScrollbar &&
      !scrolledToBottom;

    isHorizontalScroll.value = target.clientWidth < target.scrollWidth;
  };

  useResizeObserver(targetRef, ([{ target }]) => {
    isHorizontalScroll.value = target.clientWidth < target.scrollWidth;
  });

  useResizeObserver(
    computed(() => tableHeaderRef.value?.children[0] as HTMLElement),
    ([entry]) => {
      topShadowHeight.value = entry.contentRect.height;
    }
  );

  const { x, y } = useScroll(targetRef);

  watch(
    [computed(() => data.value.length), enableShadow, x, y, shadowOptions],
    () => nextTick(toggleShadow),
    { immediate: true, deep: true }
  );

  return {
    topShadow,
    topShadowHeight,
    bottomShadow,
    toggleShadow,
    isHorizontalScroll,
  };
};

export default useShadow;
