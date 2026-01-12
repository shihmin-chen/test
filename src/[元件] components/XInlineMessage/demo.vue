<template>
  <div id="x-inline-message-demo">
    <div class="xd-row xd-space">
      <XCheckbox v-model="hasTitle" size="sm">Has Title</XCheckbox>
      <XCheckbox v-model="hasContent" size="sm">Has Description</XCheckbox>
      <XCheckbox v-model="hasLeftLabel" size="sm">Has Left label</XCheckbox>
      <XCheckbox v-model="hasRightLabel" size="sm">Has Right label</XCheckbox>
      <XCheckbox v-model="hasCloseButton" size="sm">Has close button</XCheckbox>
    </div>
    <div class="xd-row xd-space">
      <label>inlineMessage Type:</label>
      <XSelect v-model="inlineMessageType" :data-options="typeOptions" />
    </div>
    <div class="xd-row xd-space">
      <label>Label Placement:</label>
      <XSelect v-model="labelPlacement" :data-options="labelPlacementOptions" />
    </div>
    <div class="xd-block">
      <XInlineMessage
        :title="hasTitle ? 'Hello World' : ''"
        :content="
          hasContent
            ? 'Hello World!!!11111111111111111111111111111111111111111\
            Hello World!!!11111111111111111111111111111111111111111\
            Hello World!!!11111111111111111111111111111111111111111\
            Hello World!!!11111111111111111111111111111111111111111'
            : ''
        "
        :left-label-name="hasLeftLabel ? 'lbtn' : ''"
        :right-label-name="hasRightLabel ? 'rbtn' : ''"
        :type="inlineMessageType"
        :label-placement="labelPlacement"
        :has-close-button="hasCloseButton"
      />
    </div>

    <div class="xd-row xd-space">
      <dl class="xd-desc">
        <h4>Props</h4>
        <dt>title: string</dt>
        <dd>title name</dd>
        <dt>content: string</dt>
        <dd>description</dd>
        <dt>leftLabelName, rightLabelName: string</dt>
        <dd>name of label</dd>
        <dt>
          type: XInlineMessageType = "Error" | "Success" | "Info" | "Alert" |
          "Warning" (default: "Info")
        </dt>
        <dd>type of XInlineMessage</dd>
        <dt>labelPlacement: "down" | "right" (default: "down")</dt>
        <dd>placement of XInlineMessage</dd>
        <dt>hasCloseButton: boolean</dt>
        <dd>need close button or not</dd>
      </dl>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  XInlineMessage,
  XInlineMessageType,
  XInlineMessageLabelPlacement,
  inlineMessageType,
} from './index';
import XCheckbox from '../XCheckbox/XCheckbox.vue';
import XSelect from '../XSelect/XSelect.vue';

const labelPlacementOptions = [
  {
    value: 'down',
    label: 'down',
  },
  {
    value: 'right',
    label: 'right',
  },
];
const typeOptions = inlineMessageType.map((type: XInlineMessageType) => ({
  label: type,
  value: type,
}));

export default defineComponent({
  name: 'XInlineMessageDemo',
  tabName: 'XInlineMessage',
  components: { XCheckbox, XSelect, XInlineMessage },
  setup() {
    const inlineMessageType = ref<XInlineMessageType>('info');
    const labelPlacement = ref<XInlineMessageLabelPlacement>('right');
    const hasCloseButton = ref(false);
    const hasTitle = ref(true);
    const hasContent = ref(true);
    const hasLeftLabel = ref(true);
    const hasRightLabel = ref(false);

    return {
      labelPlacementOptions,
      typeOptions,
      inlineMessageType,
      labelPlacement,
      hasCloseButton,
      hasTitle,
      hasContent,
      hasLeftLabel,
      hasRightLabel,
    };
  },
});
</script>

<style lang="scss" scoped></style>
