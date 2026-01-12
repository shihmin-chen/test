<template>
  <section
    class="x-list x-scroll-bar x-scroll-bar-lg"
    :class="{
      [`x-list--${size}`]: true,
      [`x-list-p-0`]: noPadding,
    }"
    :style="{
        ['--x-list-max-w' as string]: maxWidth,
        ['--x-list-min-w' as string]: minWidth,
        ['--x-list-max-h' as string]: maxHeight,
      }"
    role="list"
  >
    <XListSubheader v-if="subheader">{{ subheader }}</XListSubheader>
    <slot></slot>
    <!-- We do not use ul as root el for this possible issue: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listitem_role#best_practices -->
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import XListSubheader from './XListSubheader.vue';

export default defineComponent({
  name: 'XList',
  components: { XListSubheader },
  props: {
    subheader: {
      default: undefined,
      type: String,
    },
    maxWidth: {
      default: 'unset',
      type: String,
    },
    minWidth: {
      default: '0',
      type: String,
    },
    maxHeight: {
      default: 'unset',
      type: String,
    },
    size: {
      default: 'md',
      type: String as PropType<'sm' | 'md'>,
    },
    noPadding: {
      default: false,
      type: Boolean,
    },
  },
});
</script>

<style lang="scss">
.x-list {
  white-space: pre-wrap;
  overflow-wrap: break-word;
  word-break: break-all;
  overflow-y: auto;
  padding: 0.5rem 0;

  min-width: var(--x-list-min-w);
  max-width: var(--x-list-max-w);
  max-height: var(--x-list-max-h);

  &-p-0 {
    padding: 0;
  }
}
</style>
