<template>
  <component
    :is="component"
    class="x-list-subheader"
    :class="{
      'x-list-subheader-px-0': noGutters,
      'x-list-subheader-p-0': noPadding,
    }"
    ><slot></slot
  ></component>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'XListSubheader',
  props: {
    size: {
      type: String as PropType<'sm' | 'md'>,
      default: 'md',
    },
    component: {
      type: [String, Object],
      default: 'div',
    },
    noGutters: {
      type: Boolean,
      default: false,
    },
    noPadding: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss">
.x-list-subheader {
  --x-list-subheader-gutter: 16px;
  --x-list-subheader-v-padding: 4px;
  --x-list-subheader-font-size: var(--xv-body--body-md--font-size);
  --x-list-subheader-font-weight: var(--xv-body--body-md--font-weight);
  --x-list-subheader-line-height: var(--xv-body--body-md--line-height);
  &--sm {
    --x-list-subheader-font-size: var(--xv-body--body-sm--font-size);
    --x-list-subheader-font-weight: var(--xv-body--body-sm--font-weight);
    --x-list-subheader-line-height: var(--xv-body--body-sm--line-height);
  }

  padding: var(--x-list-subheader-v-padding) var(--x-list-subheader-gutter);
  color: var(--xv-text--low-emphasis-text);
  font-size: var(--x-list-subheader-font-size);
  font-weight: var(--x-list-subheader-font-weight);
  line-height: var(--x-list-subheader-line-height);

  &--p-0 {
    padding: 0;
  }
  &--px-0 {
    padding-left: 0;
    padding-right: 0;
  }
}

// if XList is set as small, set default style as small
.x-list--sm .x-list-subheader {
  @extend .x-list-subheader--sm;
}
</style>
