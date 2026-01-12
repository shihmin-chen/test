<template>
  <teleport :to="target">
    <div
      v-if="visible"
      class="x-toast-container"
      :class="{ 'masked-background': enableMaskedBackground }"
      :style="zIndexStyle"
    >
      <div
        class="x-toast"
        :class="{
          'x-toast--content': labelContent,
          [`x-toast--${theme}`]: true,
          [`x-toast--${placement}`]: true,
        }"
        :style="customStyle"
      >
        <slot name="content"> {{ content }} </slot>
        <XButton
          v-if="isLabelContent || labelContent.length > 0"
          size="sm"
          display="text"
          class="x-toast--label-content"
          :style="{ backgroundColor: customStyle.backgroundColor }"
          @click="$emit('onClickLabel')"
        >
          <slot name="label-content">
            {{ labelContent }}
          </slot>
        </XButton>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import {
  computed,
  CSSProperties,
  defineComponent,
  PropType,
  ref,
  toRefs,
  watch,
} from 'vue';
import { MaybeElementRef } from '../../composable/unrefElement';
import XButton from '../XButton/XButton.vue';
import {
  XToastTheme,
  XToastThemeType,
  XToastPlacement,
  XToastPlacementType,
} from './enum';
import {
  DefaultZIndex,
  useDynamicZIndex,
} from '../../composable/useDynamicZIndex';

export default defineComponent({
  name: 'XToast',
  components: { XButton },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    content: {
      type: String,
      default: '',
    },
    labelContent: {
      type: String,
      default: '',
    },
    theme: {
      type: String as PropType<XToastThemeType>,
      default: XToastTheme.Neutral,
    },
    isLabelContent: {
      type: Boolean,
      default: false,
    },
    target: {
      type: [String, Object] as PropType<string | MaybeElementRef>,
      default: 'body',
    },
    customStyle: {
      type: Object,
      default: () => ({}),
    },
    noAutoHide: {
      type: Boolean,
      default: false,
    },
    placement: {
      type: String as PropType<XToastPlacementType>,
      default: XToastPlacement.Middle,
    },
    // The attribute is enabled when `noAutoHide` is false
    // and the minimum value will be 1000
    autoHideDelay: {
      type: Number,
      default: 2000,
    },
    // Use this property carefully when `noAutoHide` is true
    enableMaskedBackground: {
      type: Boolean,
      default: false,
    },
    zIndexShift: {
      type: Number,
      default: DefaultZIndex.XToast,
    },
  },
  emits: ['update:visible', 'onClickLabel'],
  setup(props, { emit, expose }) {
    const { visible } = toRefs(props);
    const { zIndex } = useDynamicZIndex(visible);
    const zIndexStyle = computed<CSSProperties>(() => ({
      ['--x-toast-z-index' as string]: zIndex.value + props.zIndexShift,
    }));

    // auto hide
    const autoHideTimeoutId = ref<ReturnType<typeof setTimeout> | undefined>();
    const resetAutoHide = () => {
      if (autoHideTimeoutId.value) {
        clearTimeout(autoHideTimeoutId.value);
        autoHideTimeoutId.value = undefined;
      }
      const delay = Math.max(props.autoHideDelay, 1000);
      autoHideTimeoutId.value = setTimeout(() => {
        emit('update:visible', false);
        autoHideTimeoutId.value = undefined;
      }, delay);
    }

    // handle show/hide
    watch(visible, (newValue) => {
      if (!newValue || props.noAutoHide) {
        return;
      }
      resetAutoHide();
    });
    
    expose({
      resetAutoHide,
    });
    return {
      zIndexStyle,
    };
  },
});
</script>

<style lang="scss">
.x-toast-container {
  z-index: var(--x-toast-z-index);
  &.masked-background::before {
    content: '';
    background-color: #ffffff;
    opacity: 0.7;
    position: absolute;
    inset: 0;
    z-index: var(--x-toast-z-index);
  }
}

.x-toast {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 300px;
  max-width: 600px;
  padding: 8px 16px;
  gap: 16px;
  height: 48px;
  font-size: var(--xv-label--label-md--font-size);
  font-weight: var(--xv-label--label-md--font-weight);
  line-height: var(--xv-label--label-md--line-height);
  z-index: var(--x-toast-z-index);
  box-shadow: 0 2px 8px 2px rgba(38, 38, 38, 0.12);
  border-radius: 8px;

  // toast placement
  &--top {
    top: 3rem;
  }
  &--middle {
    top: 50%;
  }
  &--bottom {
    bottom: 1rem;
  }

  &--content {
    justify-content: space-between;
  }
  &--label-content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 28px;
    padding: 2px 8px;
    gap: 4px;
    border-radius: 6px;
    @if theme == 'neutral' {
      color: var(--xv-primary--200);
    } @else {
      color: var(--xv-status--primary);
    }
  }
  &--neutral {
    background-color: var(--xv-text--high-emphasis-text);
    color: var(--xv-text--on-background-text);
  }
  &--success {
    background-color: var(--xv-green--50);
    border: 1px solid var(--xv-green--100);
    color: var(--xv-green--600);
  }
  &--error {
    background-color: var(--xv-red--50);
    border: 1px solid var(--xv-red--100);
    color: var(--xv-red--600);
  }
  &--warning {
    background-color: var(--xv-orange--50);
    border: 1px solid var(--xv-orange--100);
    color: var(--xv-orange--600);
  }
  &--informational {
    background-color: var(--xv-primary--50);
    border: 1px solid var(--xv-primary--100);
    color: var(--xv-primary--600);
  }
}
</style>
