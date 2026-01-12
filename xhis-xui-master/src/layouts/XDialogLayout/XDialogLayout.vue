<template>
  <div
    class="x-dialog-layout"
    :class="{
      'x-dialog-layout--has-content': hasContent,
    }"
  >
    <div class="x-dialog-layout-main">
      <div class="x-dialog-layout-icon">
        <XDialogLayoutIcon :theme="theme" />
      </div>
      <div class="x-dialog-layout-header-body">
        <div class="xv-title--title-lg x-dialog-layout-header">
          {{ title }}
        </div>
        <div
          v-if="hasContent"
          class="x-scroll-bar xv-paragraph--paragraph-lg x-dialog-layout-body"
        >
          <!-- @slot layout body -->
          <slot name="body">
            {{ content }}
          </slot>
        </div>
      </div>
    </div>
    <div class="x-scroll-bar x-dialog-layout-footer">
      <div class="x-dialog-layout-footer-item-group">
        <!-- @slot footer secondary content -->
        <slot name="footer-secondary"></slot>
      </div>
      <div class="x-dialog-layout-footer-item-group">
        <!-- @slot footer primary content -->
        <slot name="footer-primary"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from 'vue';

import XDialogLayoutIcon from './XDialogLayoutIcon.vue';
import { XDialogLayoutTheme } from './enum';

export default defineComponent({
  name: 'XDialogLayout',
  components: {
    XDialogLayoutIcon,
  },
  props: {
    /**
     * The title of the header
     */
    title: {
      type: String,
      required: true,
    },
    /**
     * The content of the body
     */
    content: {
      type: String,
      default: undefined,
    },
    /**
     * The theme of the icon
     */
    theme: {
      type: String as PropType<XDialogLayoutTheme>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const hasContent = computed(
      () => props.content !== undefined || !!slots.body
    );

    return {
      hasContent,
    };
  },
});
</script>

<style lang="scss" scoped>
.x-dialog-layout {
  display: grid;
  grid-template-areas:
    'main'
    'footer';
  grid-template-columns: 100%;
  grid-template-rows: 1fr auto;
  width: 100%;
  height: 100%;

  &-main {
    grid-area: main;
    display: flex;
    align-items: center; // if no content, title should vertical align with icon
    gap: 24px; // the gap between icon and header, body
    padding: 32px 24px 32px 32px;
    overflow: auto;
  }

  &-footer {
    grid-area: footer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px; // the min gap between footer-primary and footer-secondary
    height: 104px; // 48px(content) + 24px+32px(padding)
    padding: 24px 32px 32px;
    overflow-x: auto; // in extreme cases, if the dialog width is insufficient to accommodate the footer buttons, should use scrollbar

    &-item-group {
      display: flex;
      align-items: center;
      gap: 16px;
    }
  }

  &-header-body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    gap: 8px; // the gap between header and body
  }

  &-header {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%; // if no content, title should fill the parent container
    color: var(--xv-text--high-emphasis-text);
  }

  &-body {
    overflow: auto;
    width: 100%;
    color: var(--xv-text--high-emphasis-text);
  }

  &--has-content {
    .x-dialog-layout-main {
      align-items: flex-start;
    }

    .x-dialog-layout-header {
      height: fit-content;
    }
  }
}
</style>
