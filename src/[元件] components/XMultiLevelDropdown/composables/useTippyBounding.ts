import type { Ref, ComputedRef, CSSProperties } from 'vue';
import {
  reactive,
  computed,
  watch,
  nextTick,
  onMounted,
  onBeforeUnmount,
} from 'vue';
import type {
  Instance as TippyInstance,
  Content as TippyContent,
  Props as TippyProps,
} from 'tippy.js';
import type {
  MaybeRef,
  MaybeElementRef,
} from '../../../composable/unrefElement';
import { unrefElement } from '../../../composable/unrefElement';

export interface UseTippyBoundingOptions {
  /** the padding between tippy and viewport bounding */
  viewportPadding?:
    | number
    | {
        top?: number;
        bottom?: number;
      };
  maxViewportHeight?: number;
}

export interface UseTippyBoundingReturn {
  /** should bind the style to tippy element */
  tippyStyle: ComputedRef<CSSProperties>;
  /** calculate bounding and update style */
  updateTippyBounding: () => Promise<void>;
}

export const useTippyBounding = (
  tippyInstance: Ref<TippyInstance<TippyProps> | null>,
  tippyContent: MaybeRef<TippyContent | undefined>,
  options: UseTippyBoundingOptions = {}
): UseTippyBoundingReturn => {
  const { maxViewportHeight = 1 } = options;

  // state
  const viewportPadding =
    typeof options.viewportPadding === 'number'
      ? {
          top: options.viewportPadding,
          bottom: options.viewportPadding,
        }
      : {
          top: 0,
          bottom: 0,
          ...(options.viewportPadding ?? {}),
        };
  const maxSize = reactive({
    height: undefined,
  });

  // mutation
  const isVerticalExpand = computed(() => {
    if (tippyInstance.value === null) {
      return;
    }
    return ['top', 'bottom'].includes(
      tippyInstance.value.props.placement.split('-')[0]
    );
  });
  const bindTippyProps = () => {
    if (tippyInstance.value === null) {
      return;
    }
    tippyInstance.value.setProps({
      popperOptions: {
        modifiers: [
          ...(tippyInstance.value?.props.popperOptions.modifiers?.filter(
            (modifier) =>
              modifier.name !== 'flip' && modifier.name !== 'preventOverflow'
          ) ?? []),
          {
            name: 'flip',
            enabled: !isVerticalExpand.value,
            options: {
              boundary: 'viewport',
              fallbackPlacements: ['right-start', 'left-start'],
            },
          },
          {
            name: 'preventOverflow',
            enabled: !isVerticalExpand.value,
            options: {
              boundary: 'viewport',
              padding: viewportPadding.bottom,
            },
          },
        ],
      },
    });
  };
  const updateTippyBounding = async () => {
    await nextTick();
    const tippyElement = unrefElement(tippyContent as MaybeElementRef);
    if (tippyElement === undefined) {
      return;
    }

    const maxViewportHeightPx = window.innerHeight * maxViewportHeight;
    const maxContainerHeight =
      window.innerHeight - viewportPadding.top - viewportPadding.bottom;

    if (isVerticalExpand.value) {
      const tippyBounding = tippyElement.getBoundingClientRect();
      const maxHeightTop = tippyBounding.bottom - viewportPadding.top;
      const maxHeightBottom =
        window.innerHeight - tippyBounding.top - viewportPadding.bottom;
      Object.assign(maxSize, {
        height: Math.min(
          maxViewportHeightPx,
          maxContainerHeight,
          maxHeightTop,
          maxHeightBottom
        ),
      });
    } else {
      Object.assign(maxSize, {
        height: Math.min(maxViewportHeightPx, maxContainerHeight),
      });
    }
  };

  // getter
  const tippyStyle = computed(() => ({
    ...(maxSize.height ? { maxHeight: `${maxSize.height}px` } : {}),
  }));

  // event handler
  watch(tippyInstance, () => {
    bindTippyProps();
  });
  const onResize = () => {
    // TODOITEM: add debounce?
    updateTippyBounding();
  };

  // life cycle
  onMounted(() => addEventListener('resize', onResize));
  onBeforeUnmount(() => removeEventListener('resize', onResize));

  return {
    updateTippyBounding,
    tippyStyle,
  };
};
