<template>
  <div>
    <TitleWithRequiredStar :title="title" :is-required="isRequired" />
    <XInputText v-model="resultValue" :placeholder="computedPlaceholder" type="search" />
  </div>
</template>
<script lang="ts">
import { isEmpty, isNil } from 'lodash';
import { v4 as uuid } from 'uuid';
import { PropType, computed, defineComponent, unref } from 'vue';

import { XInputText } from '../../../../../index';

import { useModelValue } from '../../../atomComposables/useModelValue';
import TitleWithRequiredStar from '../../../atomUI/TitleWithRequiredStar.vue';
import { MaybeRefOrComputed } from '../../../type';

export default defineComponent({
  name: 'SearchInputTextWithTitle',
  components: {
    XInputText,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    TitleWithRequiredStar,
  },
  props: {
    title: {
      type: String as PropType<MaybeRefOrComputed<string>>,
      required: false,
      default: undefined,
    },
    placeholder: {
      type: String as PropType<MaybeRefOrComputed<string>>,
      required: false,
      default: undefined,
    },
    isRequired: {
      type: Boolean as PropType<MaybeRefOrComputed<boolean>>,
      required: false,
      default: false,
    },
    modelValue: {
      type: String as PropType<MaybeRefOrComputed<string>>,
      required: false,
      default: undefined,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const groupName = uuid();

    const { resultValue } = useModelValue({
      modelValue: props.modelValue,
      // @ts-expect-error emit is not defined in useModelValue
      emit,
    });

    const computedPlaceholder = computed(() => {
      if (isEmpty(unref(resultValue))) {
        return isNil(unref(props.placeholder)) ? '' : unref(props.placeholder)?.toString();
      }
      return '';
    });

    return {
      groupName,
      computedPlaceholder,
      resultValue,
    };
  },
});
</script>

<style lang="scss" scoped>
.x-w-edit-allergy-dialog {
  &-body {
    padding: 0 32px;

    &-content {
      display: flex;

      &-title {
        color: var(--xv-text--medium-emphasis-text);
      }

      &-required-star {
        color: #d93643;
      }
    }

    .x-input-input {
      padding: 0;
      border-radius: 0;
    }
  }

  .options-class {
    display: flex;
    flex-direction: row;
    padding: 0.5rem 0;
  }
}

.tippy-box[data-theme~='drug-search-box'] {
  border-radius: 0;
  background-color: transparent;
  font-size: 16px;

  > .tippy-content {
    padding: 0;
  }
}

.x-fe-allergy-item-ul {
  overflow: auto;
  width: 514px;
  min-height: 0;
  max-height: 460px;
  padding: 0;
  border-radius: 8px;
  background-color: var(--xv-container--surface);
  box-shadow: 0 0 8px 4px #2222;
  overflow-x: hidden;
  transition: opacity 0.25s;

  &--hide {
    display: none;
  }

  &--idle {
    display: flex;
    width: 100%;
    height: 60px;
    align-items: center;
    padding: 0 32px;
    background-color: var(--xv-container--disabled-background);
    color: var(--xv-text--disabled-text);
  }
}

.x-fe-allergy-search-loading {
  width: 100%;
  height: 60px;
  background-color: var(--xv-container--surface);

  &-icon {
    width: 40px;
    height: 40px;
    animation: x-btn-loading-spin 0.5s linear infinite;
  }
}

.x-fe-allergy-search-item-active {
  background-color: var(--xv-container--surface-active);
}

.allergy-chunk {
  .x-list {
    padding: 0;
  }

  display: inline-flex;
  width: 514px;
  flex-basis: 30%;
  flex-direction: column;
  padding: 0;
  gap: 0.5rem;

  .x-list-item-text,
  .x-list-item-text-primary,
  .x-list-item-text-secondary {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &-count-text {
    color: var(--xv-text--medium-emphasis-text);
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
  }
}
</style>
