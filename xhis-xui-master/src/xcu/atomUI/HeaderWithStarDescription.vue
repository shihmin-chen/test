<template>
  <div class="flex gap-2 items-center">
    <span class="text-6 text-[#262626] font-700 lh-9">{{ title }}</span>
    <span class="text-4 text-[rgba(38,38,38,0.60)] font-500 lh-6"> <RequiredAsterisk />{{ description }} </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import RequiredAsterisk from './RequiredAsterisk.vue';

export default defineComponent({
  name: 'HeaderWithStarDescription',
  components: { RequiredAsterisk },
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>
