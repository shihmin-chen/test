import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const DEFAULT_WIDTH_FACTOR = 0.8;
// default height offset is header 40 + 56 + 48 + footer 64 + padding 16 + botton margin 12
const DEFAULT_HEIGHT_OFFSET = 40 + 56 + 48 + 64 + 16 + 12;
// default width offset is left right padding 12
const DEFAULT_WIDTH_OFFSET = 12;


/**
 * Composable function to manage the positioning and sizing of a floating window. 
 *
 * @param bounding - An object containing the bounding box coordinates (top, bottom, left, right) of the floating window.
 * @param options - Optional configuration options for the floating window's size and position.
 * @param options.widthFactor - A factor to determine the width of the floating window relative to the window width.
 * @param options.heightOffset - An offset to adjust the height of the floating window.
 * @param options.widthOffset - An offset to adjust the width of the floating window.
 *
 * @returns An object containing reactive properties for the top and left positions, height and width sizes,
 *          as well as the current window height and width.
 */
export function useFloatingWindow(
  bounding: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  },
  options?: {
    widthFactor?: number;
    heightOffset?: number;
    widthOffset?: number;
  },
) {
  const windowHeight = ref(innerHeight);
  const windowWidth = ref(innerWidth);

  const onResize = () => {
    windowHeight.value = innerHeight;
    windowWidth.value = innerWidth;
  };

  onMounted(() => addEventListener('resize', onResize));
  onBeforeUnmount(() => removeEventListener('resize', onResize));

  const {
    widthFactor = DEFAULT_WIDTH_FACTOR,
    heightOffset = DEFAULT_HEIGHT_OFFSET,
    widthOffset = DEFAULT_WIDTH_OFFSET,
  } = options ?? {};

  const topPosition = computed(() => {
    const topCandidate = bounding.bottom - windowHeight.value + heightOffset;
    if (topCandidate < 0) {
      return bounding.top;
    }
    return topCandidate;
  });

  const leftPosition = computed(() => {
    const leftCandidate = windowWidth.value * (1 - widthFactor) - widthOffset;
    if (leftCandidate < 0 || bounding.left < leftCandidate) {
      return bounding.left;
    }
    return leftCandidate;
  });

  const heightSize = computed(() => windowHeight.value - heightOffset);

  const widthSize = computed(() => {
    const widthCandidate = windowWidth.value * widthFactor;
    if (widthCandidate < bounding.right - bounding.left) {
      return bounding.right - bounding.left;
    }
    return widthCandidate;
  });

  return {
    topPosition,
    leftPosition,
    heightSize,
    widthSize,
    windowHeight,
    windowWidth,
  };
}
