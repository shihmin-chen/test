<template>
  <div class="x-page-layout-footer">
    <div class="x-page-layout-footer-item-group">
      <!-- @slot secondary content -->
      <slot name="secondary"></slot>
    </div>
    <div class="x-page-layout-footer-item-group">
      <!-- @slot primary content -->
      <slot name="primary"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'XPageLayoutFooter',
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.x-page-layout-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  height: 64px; // 48px(content) + 8px*2(padding)
  padding: 8px 24px;
  background: var(--xv-container--surface);
  overflow: auto;

  &-item-group {
    display: flex;
    align-items: center;
    gap: 16px;
  }
}
</style>
