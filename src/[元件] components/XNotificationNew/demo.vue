<template>
  <div id="x-notification-demo">
    <div class="xd-row xd-space">
      <XCheckbox v-model="noAutoHide" size="sm">No Auto Hide</XCheckbox>
      <XCheckbox v-model="hasContent" size="sm">Has Description</XCheckbox>
      <XCheckbox v-model="hasLabel" size="sm">Has label</XCheckbox>
      <XCheckbox v-model="hasCloseButton" size="sm">Has close button</XCheckbox>
      <XCheckbox v-model="hasLoadingDots" size="sm"
        >Has loading dots behind the title</XCheckbox
      >
      <XCheckbox v-model="clickLeftLabelToClose" size="sm"
        >Click left label to close notification</XCheckbox
      >
      <XCheckbox v-model="clickRightLabelToClose" size="sm"
        >Click right label to close notification</XCheckbox
      >
    </div>
    <hr class="xd-hr" />
    <div>
      <div class="xd-row xd-space">
        <label> Notification's information: </label>
      </div>
      <div class="xd-row xd-space">
        <dd>Title info:</dd>
        <XInputText v-model="titleText" placeholder="title info" />
      </div>

      <div class="xd-row xd-space">
        <dd>Content info:</dd>
        <XInputText v-model="contentText" placeholder="content info" />
      </div>

      <div class="xd-row xd-space">
        <label>
          Has Desciption - "查看更多" button has 2 styles (show more text or
          hyperlink):
        </label>
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

    <!-- notification each type button -->
    <div class="xd-row xd-space x-notification-demo-buttons">
      <XButton
        v-for="nType in XNotificationType"
        :key="nType"
        @click="showNotification(nType)"
      >
        Show {{ nType }} Notification
      </XButton>
    </div>

    <!-- notifications -->
    <XNotificationNew
      v-for="placement in XNotificationPlacement"
      :key="placement"
      :groupName="placement"
      :placement="placement"
    />

    <dl class="xd-desc">
      <h4>Props</h4>
      <dt>groupName: string</dt>
      <dd>divide notification by group</dd>
      <dt>duration: number (default 2000ms)</dt>
      <dd>
        notification exist time,time unit milliseconds (can be override by
        caller)
      </dd>
      <dt>animationSpeed: number (default 500ms)</dt>
      <dd>notification fade in/out animation speed, time unit milliseconds</dd>
      <dt>
        placement: XNotificationPlacement = "TopLeft" | "TopCenter" | "TopRight"
        | "BottomLeft" | "BottomCenter" | "BottomRight" (default:
        "XNotificationPlacement.TopRight")
      </dt>
      <dd>placement of XNotification</dd>

      <dt>zIndex: Number (default: 5000)</dt>
      <dd>notification's zIndex</dd>

      <h4>XNotificationCaller</h4>
      <dt>id: number</dt>
      <dd>notification's unique number, can be close by this id</dd>
      <dt>
        placement: XNotificationPlacement = "TopLeft" | "TopCenter" | "TopRight"
        | "BottomLeft" | "BottomCenter" | "BottomRight" (default:
        "XNotificationPlacement.TopRight")
      </dt>
      <dd>placement of XNotification</dd>
      <dt>
        type: XNotificationType = "Error" | "Success" | "Info" | "Alert"
        (default: "XNotificationType.Info")
      </dt>
      <dd>type of notification</dd>
      <dt>title: string</dt>
      <dd>title of notification</dd>
      <dt>content: string</dt>
      <dd>content of notification</dd>
      <dt>leftLabelName, rightLabelName: string</dt>
      <dd>name of label, only render when both are exist</dd>
      <dt>clickLeftLabelToClose, clickRightLabelToClose: boolean</dt>
      <dd>Click left/right label to close notification</dd>
      <dt>
        handleClick: (XNotificationLabel = "leftLabel"|"rightLabel") => void
      </dt>
      <dd>callback function, will be triggered when label is clicked</dd>
      <dt>showAllNumber: number</dt>
      <dd>
        number of content char will show, will render "查看更多" button when
        showAllNumber exist and number over 0,
      </dd>
      <dt>hasCloseButton: boolean</dt>
      <dd>
        show close button which can't trigger close manually, if true
        notification won't auto hide
      </dd>
      <dt>noAutoHide: boolean</dt>
      <dd>notification won't hide after delay</dd>
      <dt>
        autoHideDelay: Number (default: 2000 ms, can override prop: "duration")
      </dt>
      <dd>time of notification will show</dd>
      <dt>hyperLink: string (type: url)</dt>
      <dd>
        will render "查看更多" button, which will open new link tab when clicked
      </dd>
      <dt>customTitleClass: string</dt>
      <dd>custom title class</dd>
      <h4>XNotificationCloser</h4>
      <dt>id: number</dt>
      <dd>close notification by id</dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import XButton from '../XButton/XButton.vue';
import XCheckbox from '../XCheckbox/XCheckbox.vue';
import XInputText from '../XInput/XInputText.vue';
import XSelect from '../XSelect/XSelect.vue';
import {
  XNotificationLabel,
  XNotificationNew,
  XNotificationNewCaller,
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
  name: 'XNotificationDemoNew',
  tabName: 'XNotificationNew',
  components: { XButton, XCheckbox, XInputText, XSelect, XNotificationNew },
  setup() {
    const notificationType = ref(XNotificationType.Info);
    const notificationPlacement = ref(XNotificationPlacement.TopRight);
    const titleText = ref('demo notification');
    const contentText = ref('testing content 123456789');
    const hasCloseButton = ref(false);
    const hasContent = ref(true);
    const hasLabel = ref(false);
    const noAutoHide = ref(false);
    const showAllNumber = ref('0');
    const autoHideDelay = ref('2000');
    const hyperLink = ref('');
    const hasLoadingDots = ref(false);
    const clickLeftLabelToClose = ref(false);
    const clickRightLabelToClose = ref(false);

    const showNotification = (type: XNotificationType) => {
      const id = Date.now();

      XNotificationNewCaller({
        id,
        type,
        placement: notificationPlacement.value,
        title: titleText.value,
        content: hasContent.value ? contentText.value : '',
        leftLabelName: hasLabel.value ? 'left label' : '',
        rightLabelName: hasLabel.value ? 'right label' : '',
        noAutoHide: noAutoHide.value,
        autoHideDelay: Number(autoHideDelay.value),
        hasCloseButton: hasCloseButton.value,
        showAllNumber: Number(showAllNumber.value),
        hyperLink: hyperLink.value,
        clickLeftLabelToClose: clickLeftLabelToClose.value,
        clickRightLabelToClose: clickRightLabelToClose.value,
        handleClick: (target: XNotificationLabel) => {
          console.log(`${target} is clicked`);
        },
        customTitleClass: hasLoadingDots.value ? 'x-loading-dots' : '',
      });
    };

    return {
      XNotificationType,
      XNotificationPlacement,
      placementOptions,
      titleText,
      contentText,
      notificationType,
      notificationPlacement,
      hasCloseButton,
      hasContent,
      hasLabel,
      hasLoadingDots,
      showAllNumber,
      hyperLink,
      noAutoHide,
      autoHideDelay,
      showNotification,
      clickLeftLabelToClose,
      clickRightLabelToClose,
    };
  },
});
</script>

<style lang="scss" scoped></style>
