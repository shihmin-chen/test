<template>
  <div class="x-modal-layout-body">
    <div class="x-scroll-bar x-modal-layout-body-content">
      <!-- @slot body content -->
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'XModalLayoutBody',
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.x-modal-layout-body {
  width: 100%;
  height: 100%;

  &-content {
    width: 100%;
    height: 100%;
    padding: 16px 32px;
    overflow: auto;
  }
}
</style>
