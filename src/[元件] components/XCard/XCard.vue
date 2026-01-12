<template>
  <section class="x-card-container" data-qa-xui="XCard">
    <slot></slot>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'XCard',
});
</script>

<style lang="scss">
.x-card {
  &-container {
    display: grid;
    grid-template-areas:
      'icon header'
      'icon body'
      'footer footer';
    grid-template-rows: auto 1fr auto;
    grid-template-columns: auto 1fr;
    width: 100%;
    height: 100%;
    min-height: 0;
  }

  &-header {
    grid-area: header;
    display: flex;
    align-items: center;
    padding: 24px 32px;

    font-weight: var(--xv-title--title-lg-----font-weight);
    font-size: var(--xv-title--title-lg-----font-size);
    line-height: var(--xv-title--title-lg-----line-height);
    color: var(--xv-text--high-emphasis-text);
  }

  &-body {
    grid-area: body;
    position: relative;
    overflow: auto;

    font-weight: var(--xv-body--body-lg-----font-weight);
    font-size: var(--xv-body--body-lg-----font-size);
    line-height: var(--xv-body--body-lg-----line-height);

    &-busy-cover {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--xv-container--surface);
      visibility: hidden;
      pointer-events: none;
    }

    &[aria-busy='true'] {
      > .x-card-body-busy-cover {
        visibility: initial;
      }
    }
  }

  &-footer {
    grid-area: footer;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 16px;
    min-height: 112px;
    padding: 32px;
  }

  &-icon {
    grid-area: icon;
    margin-right: 24px;
  }
}
</style>
