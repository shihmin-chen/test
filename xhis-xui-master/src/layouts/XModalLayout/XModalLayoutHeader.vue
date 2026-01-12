<template>
  <div
    class="x-modal-layout-header"
    :class="{
      'x-modal-layout-header--expand': $slots['second-row'],
    }"
  >
    <div class="x-scroll-bar x-modal-layout-header-content">
      <div
        class="x-modal-layout-header-row"
        :class="{
          'x-modal-layout-header-row--close-button': closeButton,
        }"
      >
        <div class="x-modal-layout-header-item-group">
          <div class="xv-title--title-lg x-modal-layout-header-title">
            {{ title }}
          </div>
          <div class="x-modal-layout-header-item-group-sub">
            <!-- @slot primary content -->
            <slot name="primary"></slot>
          </div>
        </div>
        <div class="x-modal-layout-header-item-group">
          <div class="x-modal-layout-header-item-group-sub">
            <!-- @slot secondary content -->
            <slot name="secondary"></slot>
          </div>
          <div v-if="closeButton">
            <XIconButton icon="dismiss" @click="$emit('close')" />
          </div>
        </div>
      </div>
      <div v-if="$slots['second-row']" class="x-modal-layout-header-row">
        <div class="x-modal-layout-header-item-group-sub">
          <!-- @slot second row content -->
          <slot name="second-row"></slot>
        </div>
      </div>
    </div>
    <div v-if="divider" class="x-modal-layout-header-divider" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { XIconButton } from '../../components/XIconButton';

export default defineComponent({
  name: 'XModalLayoutHeader',
  components: {
    XIconButton,
  },
  props: {
    /**
     * The title of the header
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * Set this to `true` to show divider
     */
    divider: {
      type: Boolean,
      default: false,
    },
    /**
     * Set this to `true` to show close button
     */
    closeButton: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    /**
     * When click close button
     */
    close: () => true,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.x-modal-layout-header {
  // variables
  --x-modal-layout-header-height: 88px; // 40px(content) + 24px*2(padding)
  --x-modal-layout-header-padding: 24px 0;
  &--expand {
    --x-modal-layout-header-height: 136px; // 40px(content) + 40px(second row content) + 24px(padding top) + 16px(gap) + 16px(padding bottom)
    --x-modal-layout-header-padding: 24px 0 16px 0;
  }

  display: flex;
  flex-direction: column;

  &-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: var(--x-modal-layout-header-height);
    padding: var(--x-modal-layout-header-padding);
    overflow: auto;
  }
  &-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
    height: 40px;
    padding: 0 32px;
    &--close-button {
      padding-right: 24px;
    }
  }
  &-item-group {
    display: flex;
    align-items: center;
    gap: 8px;
    &-sub {
      display: flex;
      align-items: center;
      gap: 16px;
    }
  }
  &-title {
    color: var(--xv-text--high-emphasis-text);
    white-space: nowrap;
  }
  &-divider {
    border-bottom: 1px solid var(--xv-text--dividing-line);
  }
}
</style>
