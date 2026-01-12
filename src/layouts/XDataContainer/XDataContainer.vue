<template>
  <div class="x-scroll-bar x-data-container">
    <div v-if="$slots['nav-tab']" class="x-data-container-nav-bar">
      <div class="x-data-container-nav-bar-content">
        <div>
          <!-- @slot nav tab -->
          <slot name="nav-tab"></slot>
        </div>
      </div>
      <div class="x-data-container-nav-bar-divider" />
    </div>
    <div class="x-data-container-action-bar">
      <div class="x-data-container-action-bar-item-group">
        <!-- @slot action bar primary content -->
        <slot name="primary"></slot>
      </div>
      <div class="x-data-container-action-bar-item-group">
        <!-- @slot action bar secondary content -->
        <slot name="secondary"></slot>
      </div>
    </div>
    <div class="x-scroll-bar x-data-container-body">
      <!-- @slot body content -->
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'XDataContainer',
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.x-data-container {
  display: grid;
  grid-template-areas:
    'nav-bar'
    'action-bar'
    'body';
  grid-template-columns: 100%;
  grid-template-rows: auto auto 1fr;
  width: 100%;
  height: 100%;
  background: var(--xv-container--surface);
  border-radius: 16px;

  // grid item
  &-nav-bar {
    grid-area: nav-bar;
    display: flex;
    flex-direction: column;
    padding: 0 24px;
    margin-top: 16px;
    height: 42px; // 42px(content) + 0px*2(padding)
    &-content {
      display: flex;
      align-items: flex-end;
      height: 100%;
    }
    &-divider {
      border-bottom: 1px solid var(--xv-text--dividing-line);
    }
  }
  &-action-bar {
    grid-area: action-bar;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
    height: 72px; // 40px(content) + 16px*2(padding)
    padding: 16px 24px;
    &-item-group {
      display: flex;
      align-items: center;
      gap: 16px;
    }
  }
  &-body {
    grid-area: body;
    padding: 0 24px 24px 24px;
    overflow: auto;
  }
}
</style>
