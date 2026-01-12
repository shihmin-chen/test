import { MaybeRef } from '@vueuse/core';
import { computed, onBeforeUnmount, onMounted, ref, unref } from 'vue';

interface XDialogueStyle {
  width: number;
  maxWidth?: number;
  height?: number;
  maxHeight?: number;
  top?: string;
  left?: string;
  mask: boolean;
}

/**
 * A composable function that provides reactive styles for different dialogue views based on the screen size.
 *
 * @param view - A reactive reference to the type of view. It can be one of the following:
 * - XDialogueViewType
 *
 * @returns An object containing reactive properties for dialogue styles:
 * - `width`: The computed width of the dialogue.
 * - `maxWidth`: The computed maximum width of the dialogue.
 * - `height`: The computed height of the dialogue.
 * - `maxHeight`: The computed maximum height of the dialogue.
 * - `top`: The computed top position of the dialogue.
 * - `left`: The computed left position of the dialogue.
 * - `mask`: A boolean indicating whether the dialogue should have a mask.
 * - `screenWidth`: A reactive reference to the current screen width.
 * - `screenHeight`: A reactive reference to the current screen height.
 *
 * @example
 * const { width, height, top, left, mask } = useXDialogueStyle('full-screen');
 */
enum XDialogueViewType {
  FullScreen = 'full-screen',
  HalfScreen = 'half-screen',
  PreferenceSetting = 'preference-setting',
  FixedHeight = 'fixed-height',
  RwdDialog = 'rwd-dialog',
  ViewList = 'view-list',
  ViewWideSm = 'view-wide-sm',
  ViewSingle = 'view-single',
  ViewWide = 'view-wide',
}

const useXDialogueStyle = (
  view: MaybeRef<XDialogueViewType>,
) => {
  const screenWidth = ref(innerWidth);
  const screenHeight = ref(innerHeight);

  const onResize = () => {
    screenWidth.value = innerWidth;
    screenHeight.value = innerHeight;
  };

  const xDialogueStyle = computed(() => {
    switch (unref(view)) {
      case XDialogueViewType.FullScreen: {
        return {
          width: unref(screenWidth),
          height: unref(screenHeight),
          top: '0',
          left: '0',
          mask: false,
        } as XDialogueStyle;
      }
      case XDialogueViewType.HalfScreen: {
        return {
          width: unref(screenWidth) * 0.5,
          height: unref(screenHeight) * 0.84,
          top: '8%',
          left: '25%',
          mask: true,
        } as XDialogueStyle;
      }
      case XDialogueViewType.ViewList: {
        return {
          width: unref(screenWidth) * 0.93,
          maxWidth: unref(screenWidth) - 120,
          height: unref(screenHeight) * 0.87,
          maxHeight: unref(screenHeight) - 108,
          top: '6%',
          left: '3.5%',
          mask: true,
        } as XDialogueStyle;
      }
      case XDialogueViewType.ViewWideSm: {
        return {
          width: unref(screenWidth) * 0.76,
          maxWidth: unref(screenWidth) - 120,
          height: unref(screenHeight) * 0.76,
          maxHeight: unref(screenHeight) - 108,
          top: '12%',
          left: '12%',
          mask: true,
        } as XDialogueStyle;
      }
      case XDialogueViewType.ViewSingle: {
        return {
          width: unref(screenWidth) * 0.5,
          height: unref(screenHeight) * 0.92,
          top: '6%',
          left: '48.75%',
          mask: false,
        } as XDialogueStyle;
      }
      case XDialogueViewType.ViewWide: {
        return {
          width: unref(screenWidth) * 0.92,
          maxWidth: unref(screenWidth) - 120,
          height: unref(screenHeight) * 0.9,
          maxHeight: unref(screenHeight) - 108,
          top: '6%',
          left: '4%',
          mask: true,
        };
      }
      case XDialogueViewType.PreferenceSetting: {
        return {
          width:
            screenWidth.value < 1800
              ? unref(screenWidth) * 0.64
              : unref(screenWidth) * 0.5,
          height: unref(screenHeight) * 0.78,
          top: '11%',
          left: screenWidth.value < 1800 ? '17.5%' : '24.5%', // 24.5 - 7%
          mask: true,
        } as XDialogueStyle;
      }
      case XDialogueViewType.FixedHeight: {
        return {
          width: screenWidth.value < 1560 ? unref(screenWidth) - 120 : 1440,
          height: 670,
          mask: true,
        } as XDialogueStyle;
      }
      case XDialogueViewType.RwdDialog: {
        return {
          maxWidth: unref(screenWidth) - 120,
          maxHeight: unref(screenHeight) - 136,
          mask: true,
        } as XDialogueStyle;
      }
      default: {
        return {} as XDialogueStyle;
      }
    }
  });

  onMounted(() => {
    addEventListener('resize', onResize);
  });

  onBeforeUnmount(() => {
    removeEventListener('resize', onResize);
  });

  return {
    width: computed(() => xDialogueStyle.value.width),
    maxWidth: computed(() => xDialogueStyle.value.maxWidth),
    height: computed(() => xDialogueStyle.value.height),
    maxHeight: computed(() => xDialogueStyle.value.maxHeight),
    top: computed(() => xDialogueStyle.value.top),
    left: computed(() => xDialogueStyle.value.left),
    mask: computed(() => xDialogueStyle.value.mask),
    screenWidth,
    screenHeight,
  };
};

export type { XDialogueStyle };
export { useXDialogueStyle, XDialogueViewType };
