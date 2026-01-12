<template>
  <component
    :is="resolvedIcon"
    preserveAspectRatio="xMidYMid meet"
    class="x-icon"
    :style="{
      ...(color ? {
        ['--x-icon-color' as string]: color,
      } : undefined),
    }"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

const svgMap = import.meta.glob<{ default: any }>('./icon-component/*.svg', {eager: true});

export default defineComponent({
  name: 'XIcon',
  props: {
    icon: {
      type: [String, Object, Function],
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const resolvedIcon = computed(() =>
      // check if icon is already a resolved svg component
      typeof props.icon === 'string'
        ? svgMap[`./icon-component/${props.icon}.svg`]?.default
        : props.icon
    );

    return {
      resolvedIcon,
    };
  },
});
</script>
