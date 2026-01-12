<template>
  <teleport :to="target">
    <div
      v-if="visible"
      class="x-notification"
      :class="[`x-notification--${type}`, `x-notification--${placement}`]"
      :style="zIndexStyle"
    >
      <img
        v-show="XNotificationType.Success === type"
        class="x-notification-icon"
        alt="notification-icon"
        src="@xui-assets/icon/success-filled.svg"
      />
      <img
        v-show="XNotificationType.Info === type"
        class="x-notification-icon"
        alt="notification-icon"
        src="@xui-assets/icon/info-filled.svg"
      />
      <img
        v-show="XNotificationType.Alert === type"
        class="x-notification-icon"
        alt="notification-icon"
        src="@xui-assets/icon/alert-filled.svg"
      />
      <img
        v-show="XNotificationType.Error === type"
        class="x-notification-icon"
        alt="notification-icon"
        src="@xui-assets/icon/error-filled.svg"
      />
      <img
        v-show="XNotificationType.Warning === type"
        class="x-notification-icon"
        alt="notification-icon"
        src="@xui-assets/icon/warning-filled.svg"
      />
      <slot>
        <div class="x-notification-text">
          <div v-if="title" class="x-notification-title">{{ title }}</div>
          <div v-if="content" class="x-notification-content">
            {{ showContent }}
            <XButton
              v-show="isShowAll === false && showAllNumber !== 0"
              class="x-notification-content--button"
              size="sm"
              display="text"
              @click="isShowAll = true"
            >
              查看更多
            </XButton>
            <XButton
              v-if="hyperLink"
              class="x-notification-content--button"
              size="sm"
              display="link"
              :url="hyperLink"
            >
              查看更多
            </XButton>
          </div>
          <div
            v-if="leftLabelName && rightLabelName"
            class="x-notification-label"
          >
            <XButton
              class="x-notification-label-content"
              size="sm"
              display="text"
              @click="handleClick(Label.Left)"
            >
              {{ leftLabelName }}
            </XButton>
            <XButton
              class="x-notification-label-content"
              size="sm"
              display="text"
              @click="handleClick(Label.Right)"
            >
              {{ rightLabelName }}
            </XButton>
          </div>
        </div>
      </slot>
      <img
        v-if="hasCloseButton"
        class="x-notification-close-icon"
        alt="close"
        src="@xui-assets/icon/close.svg"
        @click="hide"
      />
    </div>
  </teleport>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  toRefs,
  watch,
  computed,
  ref,
  CSSProperties,
} from 'vue';
import {
  XNotificationType,
  XNotificationTypeType,
  XNotificationPlacement,
  XNotificationPlacementType,
} from './enum';
import { MaybeElementRef } from '../../composable/unrefElement';
import notificationErrorSvg from '@xui-assets/icon/error-filled.svg';
import XButton from '../XButton/XButton.vue';
import {
  DefaultZIndex,
  useDynamicZIndex,
} from '../../composable/useDynamicZIndex';

enum Label {
  Left = 'leftLabel',
  Right = 'rightLabel',
}

export default defineComponent({
  name: 'XNotification',
  components: { XButton },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
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
    showAllNumber: {
      type: Number,
      default: 0,
    },
    hyperLink: {
      type: String,
      default: '',
    },
    target: {
      type: [String, Object] as PropType<string | MaybeElementRef>,
      default: 'body',
    },
    type: {
      type: String as PropType<XNotificationTypeType>,
      default: XNotificationType.Info,
    },
    placement: {
      type: String as PropType<XNotificationPlacementType>,
      default: XNotificationPlacement.TopRight,
    },
    hasCloseButton: {
      type: Boolean,
      default: false,
    },
    noAutoHide: {
      type: Boolean,
      default: false,
    },
    // The attribute is enabled when `noAutoHide` is false
    // and the minimum value will be 1000
    autoHideDelay: {
      type: Number,
      default: 2000,
    },
    zIndexShift: {
      type: Number,
      default: DefaultZIndex.XNotification,
    },
  },
  emits: ['update:visible', 'clickLeftLabel', 'clickRightLabel'],
  setup(props, { emit }) {
    const { visible } = toRefs(props);
    const hide = () => {
      emit('update:visible', false);
      isShowAll.value = false;
    };
    const isShowAll = ref(false);
    const showContent = computed(() =>
      isShowAll.value || props.showAllNumber === 0
        ? props.content
        : props.content.substring(0, props.showAllNumber)
    );
    // load notification-error.svg so it will show this image when not connected to server
    const image1 = new Image();
    image1.src = notificationErrorSvg;

    const { zIndex } = useDynamicZIndex(visible);
    const zIndexStyle = computed<CSSProperties>(() => ({
      ['--x-notification-z-index' as string]: zIndex.value + props.zIndexShift,
    }));

    watch(visible, (newValue) => {
      if (!newValue || props.noAutoHide) {
        return;
      }
      const delay = Math.max(props.autoHideDelay, 1000);
      setTimeout(hide, delay);
    });

    const handleClick = (label: Label) => {
      switch (label) {
        case Label.Left:
          emit('clickLeftLabel');
          break;
        case Label.Right:
          emit('clickRightLabel');
          break;
        default:
          break;
      }
      hide();
    };

    return {
      XNotificationType,
      showContent,
      isShowAll,
      hide,
      Label,
      handleClick,
      zIndexStyle,
    };
  },
});
</script>

<style lang="scss">
.x-notification {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  position: absolute;
  width: 480px;
  min-height: 58px;
  padding: 12px;
  gap: 8px;
  flex: none;
  order: 1;
  flex-grow: 1;
  border-radius: 8px;
  box-shadow: 0px 2px 8px 2px rgba(38, 38, 38, 0.12);
  z-index: var(--x-notification-z-index);

  // notification type
  &--success {
    background: var(--xv-green--50);
    border: 1px solid var(--xv-green--100);
  }
  &--info {
    background: var(--xv-primary--50);
    border: 1px solid var(--xv-primary--100);
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

  // notification placement
  &--top-left,
  &--top-center,
  &--top-right {
    top: 3rem;
  }
  &--bottom-left,
  &--bottom-center,
  &--bottom-right {
    bottom: 1rem;
  }
  &--top-left,
  &--bottom-left {
    left: 1rem;
  }
  &--top-center,
  &--bottom-center {
    left: 50%;
    transform: translateX(-50%);
  }
  &--top-right,
  &--bottom-right {
    right: 1rem;
  }
}
.x-notification-icon {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 4px;
  width: 40px;
  height: 32px;
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
.x-notification-close-icon {
  padding: 6px;
  gap: 10px;
  width: 32px;
  height: 32px;
  border-radius: 200px;
  cursor: pointer;
}
</style>
