<template>
  <span
    class="x-tag"
    :class="{
      [`x-tag--outline`]: outline,
      [`x-tag--rounded`]: rounded && !small,
      [`x-tag--small`]: !rounded && small,
      [`x-tag--small-rounded`]: rounded && small,
    }"
    :style="tagStyle"
  >
    <slot v-bind="{ color, backgroundColor, border }"></slot>
  </span>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive } from 'vue';
import { getXColor, XColorTheme } from '../../shared/color/color';

export default defineComponent({
  name: 'XTag',
  props: {
    theme: {
      type: String as PropType<XColorTheme>,
      default: 'neutral',
    },
    outline: {
      default: false,
      type: Boolean,
    },
    dark: {
      default: false,
      type: Boolean,
    },
    rounded: {
      default: false,
      type: Boolean,
    },
    small: {
      default: false,
      type: Boolean,
    },
  },
  setup(props) {
    const backgroundColor = computed(() =>
      getXColor(
        props.outline
          ? [props.theme, props.dark ? '200' : '50']
          : [props.theme, props.dark ? '700' : '100']
      )
    );
    const border = computed(() =>
      props.outline
        ? `solid 1px ${getXColor([props.theme, props.dark ? '300' : '100'])}`
        : ''
    );
    const color = computed(() =>
      getXColor(
        props.outline
          ? [props.theme, props.dark ? '900' : '600']
          : ['text', props.dark ? 'on-background-text' : 'high-emphasis-text']
      )
    );

    const tagStyle = reactive({
      color,
      border,
      backgroundColor,
    });

    return {
      tagStyle,
      backgroundColor,
      color,
      border,
    };
  },
});
</script>

<style lang="scss">
.x-tag {
  --x-tag-p-v: 2px;
  --x-tag-p-h: 8px;
  display: inline-flex;
  padding: var(--x-tag-p-v) var(--x-tag-p-h);
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: var(--xv-body--body-md--font-size);
  font-weight: var(--xv-body--body-md--font-weight);
  line-height: var(--xv-body--body-md--line-height);
  white-space: nowrap;
  box-sizing: border-box;

  &--rounded {
    --x-tag-p-h: 10px;
    border-radius: 100px;
  }

  &--outline {
    padding: calc(var(--x-tag-p-v) - 1px) calc(var(--x-tag-p-h) - 1px);
  }

  &--small {
    --x-tag-p-h: 6px;
    font-size: var(--xv-body--body-sm--font-size);
    font-weight: var(--xv-body--body-sm--font-weight);
    line-height: var(--xv-body--body-sm--line-height);
  }

  &--small-rounded {
    --x-tag-p-h: 8px;
    font-size: var(--xv-body--body-sm--font-size);
    font-weight: var(--xv-body--body-sm--font-weight);
    line-height: var(--xv-body--body-sm--line-height);
  }
}
</style>
