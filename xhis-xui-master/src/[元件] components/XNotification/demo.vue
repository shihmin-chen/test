<template>
  <div id="x-notification-demo">
    <div class="xd-row xd-space">
      <XCheckbox v-model="noAutoHide" size="sm">No Auto Hide</XCheckbox>
      <XCheckbox v-model="hasContent" size="sm">Has Description</XCheckbox>
      <XCheckbox v-model="hasLabel" size="sm">Has label</XCheckbox>
      <XCheckbox v-model="hasCloseButton" size="sm">Has close button</XCheckbox>
    </div>
    <hr class="xd-hr" />
    <div>
      <div class="xd-row xd-space">
        <label
          >Has Desciption - "查看更多" button has 2 styles (show more text or
          hyperlink):</label
        >
      </div>
      <div class="xd-row xd-space">
        <dd>1. Number of words before show all the descriptions:</dd>
        <XInputText
          v-model="showAllNumber"
          placeholder="0 means no show-all button"
          type="number"
          inline
        />
      </div>
      <div class="xd-row xd-space">
        <dd>2. Hyperlink URL:</dd>
        <XInputText
          v-model="hyperLink"
          :inputStyle="{
            width: '312px',
          }"
          placeholder="ex: https://www.google.com.tw/"
          inline
        />
      </div>
    </div>
    <hr class="xd-hr" />
    <div class="xd-row xd-space">
      <label>Auto Hide Delay:</label>
      <XInputText
        v-model="autoHideDelay"
        placeholder="In milliseconds"
        type="number"
        inline
      />
    </div>
    <div class="xd-row xd-space">
      <label>Placement:</label>
      <XSelect
        v-model="notificationPlacement"
        :data-options="placementOptions"
      />
    </div>

    <div class="xd-row xd-space x-notification-demo-buttons">
      <XButton
        :disabled="visible"
        @click="showNotification(XNotificationType.Success)"
      >
        Show Success Notification
      </XButton>
      <XButton
        :disabled="visible"
        @click="showNotification(XNotificationType.Info)"
      >
        Show Info Notification
      </XButton>
      <XButton
        :disabled="visible"
        @click="showNotification(XNotificationType.Alert)"
      >
        Show Alert Notification
      </XButton>
      <XButton
        :disabled="visible"
        @click="showNotification(XNotificationType.Error)"
      >
        Show Error Notification
      </XButton>
      <XButton
        :disabled="visible"
        @click="showNotification(XNotificationType.Warning)"
      >
        Show Warning Notification
      </XButton>
      <XNotification
        v-model:visible="visible"
        title="Hello World"
        :content="
          hasContent
            ? 'Hello World!!!11111111111111111111111111111111111111111'
            : ''
        "
        :left-label-name="hasLabel ? 'lbtn' : ''"
        :right-label-name="hasLabel ? 'rbtn' : ''"
        :show-all-number="Number(showAllNumber)"
        :hyper-link="hyperLink"
        :type="notificationType"
        :placement="notificationPlacement"
        :has-close-button="hasCloseButton"
        :no-auto-hide="noAutoHide"
        :auto-hide-delay="Number(autoHideDelay)"
        @clickLeftLabel="handleClick('left')"
        @clickRightLabel="handleClick('right')"
      />
    </div>

    <hr class="xd-hr" />

    <div ref="notificationTarget" class="x-notification-demo-target">
      <div>Click the button to show the notification inside</div>
      <XButton
        class="xd-row"
        :disabled="visibleOfCustomNotification"
        @click="visibleOfCustomNotification = true"
      >
        Show Notification
      </XButton>
      <XNotification
        v-if="notificationTarget"
        v-model:visible="visibleOfCustomNotification"
        :target="notificationTarget"
      >
        <span style="color: #1f90ff">Hello World!</span>
      </XNotification>
    </div>
    <dl class="xd-desc">
      <h4>Props</h4>
      <dt>visible: boolean (Required)</dt>
      <dd>To show XNotification</dd>
      <dt>title: string</dt>
      <dd>title name</dd>
      <dt>content: string</dt>
      <dd>description</dd>
      <dt>leftLabelName, rightLabelName: string</dt>
      <dd>name of label</dd>
      <dt>showAllNumber: number</dt>
      <dd>
        Number of words before show all the descriptions, 0 means no show-all
        button
      </dd>
      <dt>
        target: [String, Object] as PropType&lt;string | MaybeElementRef&gt;
      </dt>
      <dd>Location you want to show the XNotification</dd>
      <dt>
        type: XNotificationType = "Error" | "Success" | "Info" | "Alert"
        (default: "XNotificationType.Info")
      </dt>
      <dd>type of XNotification</dd>
      <dt>
        placement: XNotificationPlacement = "TopLeft" | "TopCenter" | "TopRight"
        | "BottomLeft" | "BottomCenter" | "BottomRight" (default:
        "XNotificationPlacement.TopRight")
      </dt>
      <dd>placement of XNotification</dd>
      <dt>hasCloseButton: boolean</dt>
      <dd>need close button or not</dd>
      <dt>noAutoHide: boolean</dt>
      <dd>want to hide XNotification after auto hide delay or not</dd>
      <dt>autoHideDelay: Number (minimum: 1000 ms)</dt>
      <dd>The attribute is enabled when `noAutoHide` is false</dd>

      <h4>Emit</h4>
      <dt>update:visible</dt>
      <dd>XNotification is visible or not</dd>
      <dt>clickLeftLabel</dt>
      <dd>clickLeftLabel is clicked</dd>
      <dt>clickRightLabel</dt>
      <dd>clickRightLabel is clicked</dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

import XButton from '../XButton/XButton.vue';
import XCheckbox from '../XCheckbox/XCheckbox.vue';
import XInputText from '../XInput/XInputText.vue';
import XSelect from '../XSelect/XSelect.vue';
import {
  XNotification,
  XNotificationPlacement,
  XNotificationType,
} from './index';

const placementOptions = Object.values(XNotificationPlacement).map(
  (placement) => ({
    label: placement,
    value: placement,
  }),
);

export default defineComponent({
  name: 'XNotificationDemo',
  tabName: 'XNotification',
  components: { XButton, XCheckbox, XInputText, XSelect, XNotification },
  setup() {
    const notificationTarget = ref(null);
    const visible = ref(false);
    const visibleOfCustomNotification = ref(false);
    const notificationType = ref(XNotificationType.Info);
    const notificationPlacement = ref(XNotificationPlacement.TopRight);
    const hasCloseButton = ref(false);
    const hasContent = ref(false);
    const hasLabel = ref(false);
    const noAutoHide = ref(false);
    const showAllNumber = ref('0');
    const autoHideDelay = ref('2000');
    const hyperLink = ref('');

    const showNotification = (type: XNotificationType) => {
      visible.value = true;
      notificationType.value = type;
    };

    const hideNotification = () => {
      visible.value = false;
    };
    watch(notificationPlacement, hideNotification);
    watch(hasCloseButton, hideNotification);
    watch(noAutoHide, hideNotification);
    watch(autoHideDelay, hideNotification);

    const handleClick = (pos: string) => {
      console.log(`${pos} label is clicked`);
    };

    return {
      XNotificationType,
      placementOptions,
      notificationTarget,
      visible,
      visibleOfCustomNotification,
      notificationType,
      notificationPlacement,
      hasCloseButton,
      hasContent,
      hasLabel,
      showAllNumber,
      hyperLink,
      noAutoHide,
      autoHideDelay,
      showNotification,
      handleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.x-notification-demo-buttons {
  flex-wrap: wrap;
}
.x-notification-demo-target {
  position: relative;
  width: 680px;
  height: 250px;
  padding: 1rem;
  border-radius: 1rem;
  background: var(--xv-container--background);
}
</style>
