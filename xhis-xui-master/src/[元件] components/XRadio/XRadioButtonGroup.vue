<template>
  <div
    class="x-radio-button-group"
    :class="{
      [`x-radio-button-group--${size}`]: true,
      'x-radio-button-group--stacked': stacked,
    }"
    role="radiogroup"
    @change="handleChange"
    @click="handleClick"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, provide, reactive, PropType } from 'vue';
import { contextKey } from './radioContext';

const XRadioButtonGroup = defineComponent({
  name: 'XRadioButtonGroup',
  props: {
    modelValue: {
      type: [String, Boolean] as PropType<string | boolean>,
      default: undefined,
    },
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String as PropType<'sm' | 'md'>,
      default: 'md',
    },
    stacked: {
      type: Boolean,
      default: false,
    },
    cancelable: {
      type: Boolean,
      default: false,
    },
    error: {
      default: false,
      type: Boolean,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { modelValue, name, error } = toRefs(props);

    /** `@change` will be emit from child */
    const handleChange = (event: Event) => {
      /** HTMLInputElement.value will always be string */
      const rawValue = (event.target as HTMLInputElement).value;

      const value = tryToConvertBoolean(rawValue);

      emit('update:modelValue', value);
    };

    provide(
      contextKey,
      // @ts-expect-error modelValue is string | boolean
      reactive({
        modelValue,
        name,
        error,
      })
    );

    const tryToConvertBoolean = (value: unknown) => {
      if (value === 'true') {
        return true;
      } else if (value === 'false') {
        return false;
      } else {
        return value;
      }
    };

    const handleClick = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target?.type !== 'radio') {
        return;
      }
      const value = tryToConvertBoolean(target.value);
      if (props.cancelable && value === props.modelValue) {
        // if cancelable, set value to undefined if click on current selected item
        emit('update:modelValue', undefined);
      }
    };

    return {
      handleChange,
      handleClick,
    };
  },
});

export default XRadioButtonGroup;
</script>

<style lang="scss">
.x-radio-button-group {
  margin: 0;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 1rem 1.5rem;

  &--stacked {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
}
</style>
