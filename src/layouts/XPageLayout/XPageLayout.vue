<template>
  <div class="x-page-layout">
    <div class="x-page-layout-header">
      <!-- @slot layout header -->
      <slot name="header"></slot>
    </div>
    <div
      class="x-scroll-bar x-page-layout-body"
      :class="{
        'x-page-layout-body--wo-footer': !$slots.footer,
      }"
    >
      <!-- @slot layout body -->
      <slot name="body"></slot>
    </div>
    <div class="x-page-layout-footer">
      <!-- @slot layout footer -->
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'XPageLayout',
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.x-page-layout {
  display: grid;
  grid-template-areas:
    'header'
    'body'
    'footer';
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr auto;
  width: 100%;
  height: 100%;
  background: var(--xv-container--background);

  // grid item
  &-header {
    grid-area: header;
  }
  &-body {
    grid-area: body;
    overflow: auto;
    &--wo-footer {
      padding-bottom: 8px;
    }
  }
  &-footer {
    grid-area: footer;
  }
}
</style>
