<template>
  <div
    class="x-card-body x-scroll-bar x-scroll-bar-lg"
    data-qa-xui="XCardBody"
    :aria-busy="loading"
  >
    <XStatus
      v-if="loading"
      type="loading"
      class="x-card-body-busy-cover"
      aria-hidden
    />
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { XStatus } from '../XStatus';

export default defineComponent({
  name: 'XCardBody',
  components: {
    XStatus,
  },
  props: {
    loading: Boolean,
  },
});
</script>
