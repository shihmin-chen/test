<template>
  <notifications
    width="480px"
    :style="{
      'z-index': zIndex,
      ['--x-notification-z-index' as string]: zIndex,
      ['--x-notification-animation-speed' as string]: animationSpeed
    }"
    :group="groupName"
    :speed="animationSpeed"
    :duration="duration"
    :position="position"
    :animationName="animationName"
    :closeOnClick="false"
  >
    <template #body="{ item, close }">
      <div
        :class="[
          'x-notification-wrapper',
          `x-notification-wrapper--${item.type ?? 'info'}`,
        ]"
      >
        <div class="x-notification-icon">
          <img
            v-if="XNotificationType.Success === item.type"
            alt="notification-icon"
            src="@xui-assets/icon/success-filled.svg"
          />
          <img
            v-else-if="XNotificationType.Alert === item.type"
            alt="notification-icon"
            src="@xui-assets/icon/alert-filled.svg"
          />
          <img
            v-else-if="XNotificationType.Error === item.type"
            alt="notification-icon"
            src="@xui-assets/icon/error-filled.svg"
          />
          <img
            v-else-if="XNotificationType.Warning === item.type"
            alt="notification-icon"
            src="@xui-assets/icon/warning-filled.svg"
          />
          <img
            v-else
            alt="notification-icon"
            src="@xui-assets/icon/info-filled.svg"
          />
        </div>
        <slot>
          <div class="x-notification-text">
            <div
              v-if="item.title"
              :class="['x-notification-title', item.data.customTitleClass]"
            >
              {{ item.title }}
            </div>
            <div
              v-if="item.text"
              class="x-notification-content"
              :data-openreplay-obscured="
                item.data.enableContentMask === true ? true : null
              "
            >
              {{
                ellipseContent(
                  item.text,
                  item.data.isShowAll,
                  item.data.showAllNumber
                )
              }}
              <XButton
                v-show="
                  item.data.isShowAll === false && item.data.showAllNumber !== 0
                "
                class="x-notification-content--button"
                data-qa-field="x-notification-ellipse-btn"
                size="sm"
                display="text"
                @click="item.data.isShowAll = true"
              >
                查看更多
              </XButton>
              <XButton
                v-if="item.data.hyperLink"
                class="x-notification-content--button"
                data-qa-field="x-notification-hyper-link"
                size="sm"
                display="link"
                :url="item.data.hyperLink"
              >
                查看更多
              </XButton>
            </div>
            <div
              v-if="item.data.leftLabelName || item.data.rightLabelName"
              class="x-notification-label"
            >
              <XButton
                v-if="item.data.leftLabelName"
                class="x-notification-label-content"
                data-qa-field="x-notification-left-label"
                size="sm"
                display="text"
                @click="
                  () => {
                    item.data.handleClick(XNotificationLabel.Left);
                    if (item.data.clickLeftLabelToClose) {
                      close();
                      item.data.handleClose();
                    }
                  }
                "
              >
                {{ item.data.leftLabelName }}
              </XButton>
              <XButton
                v-if="item.data.rightLabelName"
                class="x-notification-label-content"
                data-qa-field="x-notification-right-label"
                size="sm"
                display="text"
                @click="
                  () => {
                    item.data.handleClick(XNotificationLabel.Right);
                    if (item.data.clickRightLabelToClose) {
                      close();
                      item.data.handleClose();
                    }
                  }
                "
              >
                {{ item.data.rightLabelName }}
              </XButton>
            </div>
          </div>
        </slot>
        <XIconButton
          v-show="item.data.hasCloseButton"
          class="x-notification-close-btn"
          data-qa-field="x-notification-close-btn"
          icon="dismiss"
          size="sm"
          @click="
            () => {
              close();
              item.data.handleClose();
            }
          "
        />
      </div>
    </template>
  </notifications>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { DefaultZIndex } from '../../composable/useDynamicZIndex';
import XButton from '../XButton/XButton.vue';
import XIconButton from '../XIconButton/XIconButton.vue';
import {
  XNotificationType,
  XNotificationPlacementType,
  XNotificationPlacement,
  XNotificationLabel,
} from './enum';
import './animation.scss';

export default defineComponent({
  name: 'XNotificationNew',
  components: { XButton, XIconButton },
  props: {
    groupName: {
      type: String,
      default: '',
    },
    duration: {
      type: Number,
      default: 2000,
    },
    animationSpeed: {
      type: Number,
      default: 500,
    },
    placement: {
      type: String as PropType<XNotificationPlacementType>,
      default: XNotificationPlacement.TopRight,
    },
    zIndex: {
      type: Number,
      default: DefaultZIndex.XNotification,
    },
    enableContentMask: {
      type: Boolean,
      default: false,
    },
  },
  emits: [],
  setup(props) {
    const position = computed(() => props.placement.replace('-', ' '));
    const animationName = computed(() => position.value.split(' ')[1]);

    const ellipseContent = (
      content: string,
      isShowAll: boolean,
      showAllNumber: number
    ) => {
      return isShowAll || showAllNumber === 0
        ? content
        : content.substring(0, showAllNumber);
    };

    return {
      position,
      animationName,
      XNotificationType,
      XNotificationLabel,
      ellipseContent,
    };
  },
});
</script>

<style lang="scss" scoped>
.x-notification-wrapper {
  min-height: 58px;
  padding: 12px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 8px;
  border-radius: 8px;
  box-shadow: 0px 2px 8px 2px rgba(38, 38, 38, 0.12);
  z-index: var(--x-notification-z-index);

  // default (info)
  background: var(--xv-primary--50);
  border: 1px solid var(--xv-primary--100);

  &--success {
    background: var(--xv-green--50);
    border: 1px solid var(--xv-green--100);
  }
  &--alert {
    background: var(--xv-red--50);
    border: 1px solid var(--xv-red--100);
  }
  &--error {
    background: var(--xv-red--50);
    border: 1px solid var(--xv-red--100);
  }
  &--warning {
    background: var(--xv-orange--50);
    border: 1px solid var(--xv-orange--100);
  }

  .x-notification-icon {
    padding: 0px 4px;
    flex-shrink: 0;
    img {
      width: 32px;
      height: 32px;
    }
  }
  .x-notification-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-grow: 1;
    padding: 2px 0px;
  }
  .x-notification-title {
    font-weight: var(--xv-title--title-sm--font-weight);
    font-size: var(--xv-title--title-sm--font-size);
    line-height: var(--xv-title--title-sm--line-height);
    color: var(--xv-text--high-emphasis-text);
    overflow-wrap: break-word;
    word-break: break-all;
  }
  .x-notification-content {
    font-weight: var(--xv-body--body-md--font-weight);
    font-size: var(--xv-body--body-md--font-size);
    line-height: var(--xv-body--body-md--line-height);
    color: var(--xv-text--medium-emphasis-text);
    overflow-wrap: break-word;
    word-break: break-all;
    &--button {
      height: 24px;
      font-weight: var(--xv-link--link-md--font-weight);
      font-size: var(--xv-link--link-md--font-size);
      line-height: var(--xv-link--link-md--line-height);
      text-decoration-line: var(--xv-text--link-md--text-decoration-line);
    }
  }
  .x-notification-label {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 2px 0 0 0;
    gap: 8px;
    height: 32px;
    margin-left: -8px;
  }
  .x-notification-label-content {
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

  .x-notification-close-btn {
    flex-shrink: 0;
  }
}
</style>

<style lang="scss">
//module class name
.vue-notification-wrapper {
  padding: 6px 8px !important;
  transition: none !important;

  &:first-of-type {
    padding-top: 48px !important;
  }
  &:last-of-type {
    padding-bottom: 8px !important;
  }
}
</style>
