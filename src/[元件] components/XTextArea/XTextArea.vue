<template>
  <textarea
    :value="modelValue"
    class="x-textarea x-scroll-bar x-scroll-bar-lg xv-body--body-md"
    :class="{
      'x-textarea--error': error,
    }"
    :rows="rows"
    :readonly="readonly"
    @input="(e) => $emit('update:modelValue', (e.target as HTMLInputElement).value)"
  ></textarea>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'XTextArea',
  // might need to bind attr directly to input element
  inheritAttrs: true,
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    rows: {
      type: Number,
      default: 3,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    error: {
      default: false,
      type: Boolean,
    },
  },
  emits: ['update:modelValue'],
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
.x-textarea {
  padding: 8px;
  background-color: var(--xv-container--surface);
  border: 1px solid;
  border-color: var(--xv-text--dividing-line);
  border-radius: 8px;

  resize: none;

  transition: border-color 0.1s;

  caret-color: var(--xv-status--primary);

  &:hover:not(:focus):not(&[readonly]):not(&--error) {
    border-color: var(--xv-text--placeholder-text);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--xv-container--surface-pressed);
    &:not(&[readonly]) {
      border-color: rgb(var(--x-textarea-primary));
      box-shadow: 0 0 1px 2px rgba(var(--x-textarea-primary), 0.2);
      &:not(.x-textarea--error) {
        border-color: var(--xv-status--primary);
        box-shadow: 0 0 1px 2px rgba(var(--xv-status--primary--rgb), 0.2);
      }
    }
  }

  &::placeholder {
    color: var(--xv-text--placeholder-text);
  }

  &--error {
    --x-textarea-primary: var(--xv-status--error--rgb);
    border-color: rgb(var(--x-textarea-primary));
  }
}
</style>
