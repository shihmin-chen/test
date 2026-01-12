<template>
  <slot v-if="isReady"></slot>
  <div v-else ref="wrapperRef" :style="{ minHeight }"></div>
</template>
<script lang="ts">
import { useIntersectionObserver } from '@vueuse/core';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'XLazyRender',
  props: {
    disable: {
      type: Boolean,
      default: false,
    },
    minHeight: {
      type: String,
      default: '0px',
    },
    renderOnIdle: {
      type: Boolean,
      default: true,
    },
    renderOnIntersection: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const isReady = ref(props.disable);
    const wrapperRef = ref(null);

    if (props.renderOnIntersection) {
      const { stop } = useIntersectionObserver(
        wrapperRef,
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            // render the solt if the mock div enters the screen
            isReady.value = true;
            stop();
          }
        },
        { rootMargin: props.minHeight }
      );
    }

    if ('requestIdleCallback' in window && props.renderOnIdle) {
      window.requestIdleCallback(() => {
        isReady.value = true;
      });
    }

    return {
      isReady,
      wrapperRef,
    };
  },
});
</script>
