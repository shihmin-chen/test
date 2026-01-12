<template>
  <div
    v-if="visible"
    class="x-inlineMessage"
    :class="[`x-inlineMessage--${type}`]"
  >
    <img
      v-show="'success' === type"
      class="x-inlineMessage-icon"
      alt="inlineMessage-icon"
      src="@xui-assets/icon/success-filled.svg"
    />
    <img
      v-show="'info' === type"
      class="x-inlineMessage-icon"
      alt="inlineMessage-icon"
      src="@xui-assets/icon/info-filled.svg"
    />
    <img
      v-show="'alert' === type"
      class="x-inlineMessage-icon"
      alt="inlineMessage-icon"
      src="@xui-assets/icon/alert-filled.svg"
    />
    <img
      v-show="'error' === type"
      class="x-inlineMessage-icon"
      alt="inlineMessage-icon"
      src="@xui-assets/icon/error-filled.svg"
    />
    <img
      v-show="'warning' === type"
      class="x-inlineMessage-icon"
      alt="inlineMessage-icon"
      src="@xui-assets/icon/warning-filled.svg"
    />
    <slot>
      <div ref="textRef" class="x-inlineMessage-text">
        <div v-if="title" class="x-inlineMessage-title">{{ title }}</div>
        <div v-if="content" class="x-inlineMessage-content">
          {{ content }}
        </div>
        <XInlineMessageLabel
          v-if="labelPlacement === 'down'"
          :left-label-name="leftLabelName"
          :right-label-name="rightLabelName"
          @onClickLeftLabel="$emit('onClickLeftLabel')"
          @onClickRightLabel="$emit('onClickRightLabel')"
        />
      </div>
    </slot>
    <XInlineMessageLabel
      v-if="labelPlacement === 'right'"
      :is-label-place-middle="isLabelPlaceMiddle"
      :left-label-name="leftLabelName"
      :right-label-name="rightLabelName"
      :label-height="textHeight"
      @onClickLeftLabel="$emit('onClickLeftLabel')"
      @onClickRightLabel="$emit('onClickRightLabel')"
    />
    <img
      v-if="hasCloseButton"
      class="x-inlineMessage-close-icon"
      alt="close"
      src="@xui-assets/icon/close.svg"
      @click="hide"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import { XInlineMessageLabelPlacement, XInlineMessageType } from './enum';
import XInlineMessageLabel from './XInlineMessageLabel.vue';

export default defineComponent({
  name: 'XInlineMessage',
  components: { XInlineMessageLabel },
  props: {
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    leftLabelName: {
      type: String,
      default: '',
    },
    rightLabelName: {
      type: String,
      default: '',
    },
    type: {
      type: String as PropType<XInlineMessageType>,
      default: 'info',
    },
    labelPlacement: {
      type: String as PropType<XInlineMessageLabelPlacement>,
      default: 'down',
    },
    hasCloseButton: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:visible', 'onClickLeftLabel', 'onClickRightLabel'],
  setup(props) {
    const visible = ref(true);
    const hide = () => {
      visible.value = false;
    };
    const isLabelPlaceMiddle = computed(
      () =>
        props.title !== '' &&
        props.content !== '' &&
        props.labelPlacement === 'right'
    );
    const textRef = ref<HTMLElement>();
    const textHeight = computed(() => textRef.value?.clientHeight);
    return {
      visible,
      hide,
      isLabelPlaceMiddle,
      textRef,
      textHeight,
    };
  },
});
</script>

<style lang="scss">
.x-inlineMessage {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  min-height: 48px;
  padding: 8px 12px;
  gap: 8px;
  flex: none;
  order: 0;
  flex-grow: 1;
  border-radius: 8px;
  z-index: var(--x-inlineMessage-z-index);

  // inlineMessage type
  &--success {
    background: var(--xv-green--50);
  }
  &--info {
    background: var(--xv-primary--50);
  }
  &--alert {
    background: var(--xv-red--50);
  }
  &--error {
    background: var(--xv-red--50);
  }
  &--warning {
    background: var(--xv-orange--50);
  }
}
.x-inlineMessage-icon {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 8px;
  padding: 4px 0px;
  width: 24px;
  height: 32px;
}
.x-inlineMessage-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
  padding: 2px 0px;
}
.x-inlineMessage-title {
  align-self: stretch;
  font-weight: var(--xv-label--label-lg--font-weight);
  font-size: var(--xv-label--label-lg--font-size);
  line-height: var(--xv-label--label-lg--line-height);
  color: var(--xv-text--high-emphasis-text);
}
.x-inlineMessage-content {
  font-weight: var(--xv-body--body-lg--font-weight);
  font-size: var(--xv-body--body-lg--font-size);
  line-height: var(--xv-body--body-lg--line-height);
  color: var(--xv-text--high-emphasis-text);
  overflow-wrap: break-word;
  word-break: break-all;
}
.x-inlineMessage-close-icon {
  padding: 6px;
  gap: 10px;
  width: 32px;
  height: 32px;
  border-radius: 200px;
  cursor: pointer;
}
</style>
