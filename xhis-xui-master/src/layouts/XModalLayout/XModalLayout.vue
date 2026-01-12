<template>
  <div class="x-modal-layout">
    <div class="x-modal-layout-header">
      <!-- @slot layout header -->
      <slot name="header"></slot>
    </div>
    <div class="x-scroll-bar x-modal-layout-body">
      <!-- @slot layout body -->
      <slot name="body"></slot>
    </div>
    <div class="x-modal-layout-footer">
      <!-- @slot layout footer -->
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'XModalLayout',
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.x-modal-layout {
  display: grid;
  grid-template-areas:
    'header'
    'body'
    'footer';
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr auto;
  width: 100%;
  height: 100%;

  // grid item
  &-header {
    grid-area: header;
  }
  &-body {
    grid-area: body;
    overflow: auto;
  }
  &-footer {
    grid-area: footer;
  }
}
</style>
