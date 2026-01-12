<template>
  <div class="x-scroll-bar x-page-layout-header">
    <div class="x-page-layout-header-item-group">
      <div v-if="closeButton && closeButtonType === 'iconButton'">
        <XIconButton icon="dismiss" @click="$emit('close')" />
      </div>
      <div class="xv-title--title-lg x-page-layout-header-title">
        {{ title }}
      </div>
      <!-- @slot primary content -->
      <slot name="primary"></slot>
    </div>
    <div class="x-page-layout-header-item-group">
      <!-- @slot secondary content -->
      <slot name="secondary"></slot>
      <XButton
        v-if="closeButton && closeButtonType === 'button'"
        outline
        @click="$emit('close')"
      >
        關閉
      </XButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { XButton } from '../../components/XButton';
import { XIconButton } from '../../components/XIconButton';

export default defineComponent({
  name: 'XPageLayoutHeader',
  components: {
    XButton,
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
     * Set this to `true` to show close button
     */
    closeButton: {
      type: Boolean,
      default: false,
    },
    /**
     * The type of close button
     * @values  "button" | "iconButton"
     */
    closeButtonType: {
      type: String as PropType<'button' | 'iconButton'>,
      default: 'button',
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
.x-page-layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  height: 72px; // 40px(content) + 16px*2(padding)
  padding: 16px 24px;
  overflow: auto;

  &-item-group {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  &-title {
    color: var(--xv-text--high-emphasis-text);
    white-space: nowrap;
  }
}
</style>
