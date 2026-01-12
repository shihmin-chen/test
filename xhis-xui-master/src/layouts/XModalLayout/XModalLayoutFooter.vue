<template>
  <div
    class="x-modal-layout-footer"
    :class="{
      [`x-modal-layout-footer--${size}`]: true,
    }"
  >
    <div v-if="divider" class="x-modal-layout-footer-divider" />
    <div class="x-scroll-bar x-modal-layout-footer-content">
      <div class="x-modal-layout-footer-item-group">
        <!-- @slot secondary content -->
        <slot name="secondary"></slot>
      </div>
      <div class="x-modal-layout-footer-item-group">
        <!-- @slot primary content -->
        <slot name="primary"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'XModalLayoutFooter',
  props: {
    /**
     * The size of the footer
     * @values  "md" | "sm" | "xs" | "lg"
     */
    size: {
      type: String as PropType<'xs' | 'sm' | 'md' | 'lg'>,
      default: 'md',
    },
    /**
     * Set this to `true` to show divider
     */
    divider: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.x-modal-layout-footer {
  // variables
  --x-modal-layout-footer-height: 96px; // 48px(content) + 24px*2(padding)
  --x-modal-layout-footer-padding: 24px 32px;
  &--xs {
    --x-modal-layout-footer-height: 72px; // 48px(content) + 12px*2(padding)
    --x-modal-layout-footer-padding: 12px 32px;
  }
  &--sm {
    --x-modal-layout-footer-height: 80px; // 48px(content) + 16px*2(padding)
    --x-modal-layout-footer-padding: 16px 32px;
  }
  &--lg {
    --x-modal-layout-footer-height: 112px; // 48px(content) + 32px*2(padding)
    --x-modal-layout-footer-padding: 32px;
  }

  display: flex;
  flex-direction: column;

  &-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
    height: var(--x-modal-layout-footer-height);
    padding: var(--x-modal-layout-footer-padding);
    overflow: auto;
  }
  &-item-group {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  &-divider {
    /**
     * - `border-box` includes border. if not add border width to height, border + contain + padding will overflow.
     * - `content-box` excludes both border and "padding", so we can't use it.
     * - thus we create a wrapper for border div + content div.
     * - btw, notice the scroll area should not include the divider.
     */
    border-top: 1px solid var(--xv-text--dividing-line);
  }
}
</style>
