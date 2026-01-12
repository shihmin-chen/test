<template>
  <teleport :to="appendTo">
    <div
      v-show="show"
      ref="floatingWindow"
      data-qa-xui="XFloatingWindow"
      class="x-floating-window"
      :style="style"
      :data-id="floatingWindowNanoId"
      @click.stop
    >
      <slot></slot>
    </div>
  </teleport>
</template>

<script lang="ts">
import { toRefs } from '@vueuse/core';
import {
  computed,
  CSSProperties,
  defineComponent,
  PropType,
  provide,
  ref,
  toRef,
  watch,
} from 'vue';

import {
  DefaultZIndex,
  useDynamicZIndex,
} from '../../composable/useDynamicZIndex';
import { useFloatingWindowManagement } from '../../composable/useModalManagement';

export default defineComponent({
  name: 'XFloatingWindow',
  props: {
    id: {
      type: String,
      default: '',
    },
    appendTo: {
      type: String,
      default: 'body',
    },
    show: {
      type: Boolean,
      default: false,
    },
    height: {
      type: [Number, String] as PropType<string | number>,
      default: 300,
    },
    width: {
      type: [Number, String] as PropType<string | number>,
      default: 500,
    },
    top: {
      type: [Number, String] as PropType<string | number>,
      default: 0,
    },
    left: {
      type: [Number, String] as PropType<string | number>,
      default: 0,
    },
    full: {
      type: Boolean,
      default: false,
    },
    zIndexShift: {
      type: Number,
      default: DefaultZIndex.PopupWindows,
    },
    floatingWindowId: {
      type: String,
      default: '',
    },
  },
  emits: ['update:floatingWindowId'],
  setup(props, { emit }) {
    provide('dialogue_name', props.id);
    const { zIndex } = useDynamicZIndex(toRef(props, 'show'));
    const zIndexStyle = computed<CSSProperties>(() => ({
      ['--x-floating-window-z-index' as string]:
        zIndex.value + props.zIndexShift,
    }));

    const { id: floatingWindowNanoId } = useFloatingWindowManagement(
      toRef(props, 'show'),
    );
    emit('update:floatingWindowId', floatingWindowNanoId.value);

    const style = computed(() => {
      if (props.full) {
        return {
          position: 'absolute',
          top: '0px',
          left: '0px',
          width: '100%',
          height: '100%',
          ...zIndexStyle.value,
        } as CSSProperties;
      }
      const res: Record<string, unknown> = {
        position: 'absolute',
        ...zIndexStyle.value,
      };
      ['width', 'height', 'top', 'left'].forEach((attr) => {
        const key = attr as keyof typeof props;
        res[key] =
          typeof props[key] === 'number' ? `${props[key]}px` : props[key];
      });
      return res as CSSProperties;
    });

    const floatingWindow = ref();

    const { show } = toRefs(props);

    watch(
      show,
      () => {
        (document.activeElement as HTMLElement)?.blur?.();
      },
      { immediate: true },
    );

    return { style, floatingWindow, floatingWindowNanoId };
  },
});
</script>

<style lang="scss">
.x-floating-window {
  z-index: var(--x-floating-window-z-index);
}
</style>
