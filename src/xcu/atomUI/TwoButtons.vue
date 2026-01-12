<template>
  <div class="flex shrink-0 gap-2.5 justify-end items-center self-stretch">
    <div class="flex gap-4 items-center">
      <XButton
        class="px-7 py-2.5 border-1 border-[rgba(38,38,38,0.60)] border-rd-2 border-solid flex gap-1 w-32 justify-center items-center"
        v-bind="computedLeftButtonProps"
        @click="onLeftButtonClick"
      >
        {{ computedLeftButtonText }}
      </XButton>
      <XButton
        class="px-7 py-2.5 bg-[#0074E6] border-rd-2 flex gap-1 w-32 justify-center items-center"
        v-bind="computedRightButtonProps"
        @click="onRightButtonClick"
      >
        {{ computedRightButtonText }}
      </XButton>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, unref } from 'vue';

import { XButton } from '../../../index';

import { ButtonProps, MaybeRefOrComputed } from '../type';

export const RESOLVE_LEFT_BUTTON = 'RESOLVE_LEFT_BUTTON';
export const RESOLVE_RIGHT_BUTTON = 'RESOLVE_RIGHT_BUTTON';

export default defineComponent({
  name: 'TwoButtons',
  components: {
    XButton,
  },
  props: {
    leftButtonText: {
      type: String as PropType<MaybeRefOrComputed<string>>,
      required: false,
      default: 'left',
    },
    rightButtonText: {
      type: String as PropType<MaybeRefOrComputed<string>>,
      required: false,
      default: 'right',
    },
    leftButtonProps: {
      type: Object as PropType<MaybeRefOrComputed<ButtonProps>>,
      default: {
        theme: 'tertiary',
        size: 'lg',
        outline: true,
      } as ButtonProps,
    },
    rightButtonProps: {
      type: Object as PropType<MaybeRefOrComputed<ButtonProps>>,
      default: {
        theme: 'primary',
        size: 'lg',
      } as ButtonProps,
    },
  },
  emits: ['update:leftClick', 'update:rightClick'],
  setup(props, { emit }) {
    const computedLeftButtonProps = computed(() =>
      unref(props.leftButtonProps),
    );
    const computedRightButtonProps = computed(() =>
      unref(props.rightButtonProps),
    );
    const computedLeftButtonText = computed(() => unref(props.leftButtonText));
    const computedRightButtonText = computed(() =>
      unref(props.rightButtonText),
    );

    const onLeftButtonClick = () => {
      emit('update:leftClick');
    };
    const onRightButtonClick = () => {
      emit('update:rightClick');
    };

    return {
      computedLeftButtonProps,
      computedRightButtonProps,
      computedLeftButtonText,
      computedRightButtonText,
      onLeftButtonClick,
      onRightButtonClick,
    };
  },
});
</script>
