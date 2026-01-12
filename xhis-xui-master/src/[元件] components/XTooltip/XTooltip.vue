<template>
  <!-- @vue-ignore -->
  <component
    :is="rootComponent"
    v-if="!disabled"
    ref="target"
    data-qa-xui="XTooltip"
    class="x-tooltip"
    :class="{
      'x-ellipsis--1': ellipsis,
    }"
    @mouseover="(event) => onMouseOver(event)"
  >
    <slot></slot>
  </component>
  <component :is="rootComponent" v-else>
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { Props, roundArrow } from 'tippy.js';
import { defineComponent, PropType, toRefs } from 'vue';

import {
  MaybeTippyElementRef,
  useTippy,
} from '../../composable/Tippy/useTippy';
import { IsComponentType } from '../../utils';

export default defineComponent({
  name: 'XTooltip',
  props: {
    content: {
      default: '',
      type: [String, Object] as PropType<MaybeTippyElementRef>,
    },
    rootComponent: {
      default: 'div',
      type: [String, Object] as PropType<IsComponentType>,
    },
    options: {
      default: () => ({}),
      type: Object as PropType<Partial<Props>>,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    ellipsis: {
      type: Boolean,
      default: false,
    },
    ellipsisOnEventTarget: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { content } = toRefs(props);
    const { target, tippyInstance } = useTippy(
      undefined,
      content as MaybeTippyElementRef,
      {
        arrow: roundArrow,
        delay: [250, 100],
        ...props.options,
      },
    );

    // handle ellipsis
    const onMouseOver = async (event: MouseEvent) => {
      if (!props.ellipsis) {
        return;
      }
      let clientWidth = (target.value as HTMLElement)?.clientWidth ?? 0;
      let scrollWidth = (target.value as HTMLElement)?.scrollWidth ?? 0;

      if (props.ellipsisOnEventTarget) {
        clientWidth = (event.target as HTMLElement)?.clientWidth ?? 0;
        scrollWidth = (event.target as HTMLElement)?.scrollWidth ?? 0;
      }

      if (clientWidth < scrollWidth) {
        tippyInstance.value?.enable();
        tippyInstance.value?.show();
      } else {
        tippyInstance.value?.disable();
        tippyInstance.value?.hide();
      }
    };

    return {
      target,
      onMouseOver,
    };
  },
});
</script>

<style lang="scss">
.x-tooltip {
  font-size: var(--xv-body--body-md--font-size);
  font-weight: var(--xv-body--body-md--font-weight);
  line-height: var(--xv-body--body-md--line-height);
}
</style>
