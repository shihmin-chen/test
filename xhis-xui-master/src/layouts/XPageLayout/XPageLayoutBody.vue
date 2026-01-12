<template>
  <div class="x-scroll-bar x-page-layout-body">
    <!-- @slot body content -->
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'XPageLayoutBody',
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.x-page-layout-body {
  width: 100%;
  height: 100%;
  padding: 0 24px 16px 24px;
  overflow: auto;
}
</style>
