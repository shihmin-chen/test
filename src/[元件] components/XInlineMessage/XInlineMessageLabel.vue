<template>
  <div
    v-if="leftLabelName || rightLabelName"
    class="x-inlineMessage-label"
    :style="{ height: isLabelPlaceMiddle ? `${labelHeight}px` : '28px' }"
  >
    <XButton
      v-if="leftLabelName"
      class="x-inlineMessage-label-content"
      size="sm"
      display="text"
      @click="$emit('onClickLeftLabel')"
    >
      {{ leftLabelName }}
    </XButton>
    <XButton
      v-if="rightLabelName"
      class="x-inlineMessage-label-content"
      size="sm"
      display="text"
      @click="$emit('onClickRightLabel')"
    >
      {{ rightLabelName }}
    </XButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import XButton from '../XButton/XButton.vue';
export default defineComponent({
  name: 'XInlineMessageLabel',
  components: { XButton },
  props: {
    leftLabelName: {
      type: String,
      default: '',
    },
    rightLabelName: {
      type: String,
      default: '',
    },
    isLabelPlaceMiddle: {
      type: Boolean,
      default: false,
    },
    labelHeight: {
      type: Number,
      default: 0,
    },
  },
  emits: ['onClickLeftLabel', 'onClickRightLabel'],
});
</script>
<style lang="scss">
.x-inlineMessage-label {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}
.x-inlineMessage-label-content {
  font-weight: var(--xv-label--label-md--font-weight);
  font-size: var(--xv-label--label-md--font-size);
  line-height: var(--xv-label--label-md--line-height);
  color: var(--xv-status--primary);
  justify-content: center;
  text-align: center;
  height: 28px;
  border-radius: 6px;
  padding: 2px 8px;
}
</style>
