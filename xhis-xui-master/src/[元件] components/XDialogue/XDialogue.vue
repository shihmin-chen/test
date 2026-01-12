<template>
  <teleport :to="appendTo">
    <div
      tabindex="-1"
      v-show="show"
      ref="dialog"
      data-qa-xui="XDialogue"
      class="x-dialogue-container"
      :enabled="mask"
      :style="zIndexStyle"
      :data-id="dialogNanoId"
      @click="onClickBackdrop"
    >
      <div
        ref="dialogueBody"
        class="x-dialogue-modal"
        :style="dialogueStyle"
        @click.stop
      >
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { onKeyDown, toRefs, useResizeObserver } from '@vueuse/core';
import {
  computed,
  CSSProperties,
  defineComponent,
  onActivated,
  onDeactivated,
  onMounted,
  onUnmounted,
  provide,
  ref,
  toRef,
  unref,
  watch,
} from 'vue';

import emitter, { XuiEvent } from '@asus-aics/x-fe-emitter';

import {
  DefaultZIndex,
  useDynamicZIndex,
} from '../../composable/useDynamicZIndex';
import {
  handleModalHandler,
  useDialogManagement,
  useModalHotkeyDisabled,
} from '../../composable/useModalManagement';

export default defineComponent({
  name: 'XDialogue',
  props: {
    id: {
      type: String,
      default: '',
    },
    widgetName: {
      type: String,
      default: '',
    },
    appendTo: {
      type: String,
      default: 'body',
    },
    show: {
      type: Boolean,
      default: false,
    },
    height: {
      type: [Object, Number], // TODOITEM: or String? if want to set % or calc, ...
      default: 300,
    },
    maxHeight: {
      type: [Object, Number, String],
      default: 'none',
    },
    width: {
      type: [Object, Number],
      default: 500,
    },
    maxWidth: {
      type: [Object, Number, String],
      default: 'none',
    },
    top: {
      type: String,
      default: undefined,
    },
    left: {
      type: String,
      default: undefined,
    },
    transition: {
      type: String,
      default: '',
    },
    fitContent: {
      type: Boolean,
      default: false,
    },
    mask: {
      type: Boolean,
      default: true,
    },
    closeOnBackdrop: {
      type: Boolean,
      default: false,
    },
    zIndexShift: {
      type: Number,
      default: DefaultZIndex.PopupWindows,
    },
    dialogId: {
      type: String,
      default: '',
    },
    disableEnter: {
      type: Boolean,
      default: false,
    },
    disableEsc: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:show', 'update:dialogId', 'esc', 'enter'],
  setup(props, { emit }) {
    const dialog = ref<HTMLDivElement>();
    const dialogueBody = ref();
    const bodyClientHeight = ref(0);
    provide('dialogue_name', props.id || props.widgetName);

    useResizeObserver(dialogueBody, ([{ target }]) => {
      bodyClientHeight.value = target.clientHeight || 0;
    });

    const { zIndex } = useDynamicZIndex(toRef(props, 'show'));
    const zIndexStyle = computed<CSSProperties>(() => ({
      ['--x-dialogue-z-index' as string]: zIndex.value + props.zIndexShift,
    }));

    const { id: dialogNanoId } = useDialogManagement(toRef(props, 'show'));
    emit('update:dialogId', dialogNanoId.value);

    // TODOITEM: add min-height when set fitContent
    const dialogueStyle = computed(() => {
      // get fallback number value
      // TODOITEM: allready setted default value in props, or should not set fallback?
      const widthNumber = unref(props.width) || 0;
      const maxWidthString =
        typeof unref(props.maxWidth) === 'number'
          ? `${unref(props.maxWidth)}px`
          : unref(props.maxWidth);
      const heightNumber =
        (props.fitContent ? bodyClientHeight.value : unref(props.height)) || 0;
      const maxHeightString =
        typeof unref(props.maxHeight) === 'number'
          ? `${unref(props.maxHeight)}px`
          : unref(props.maxHeight);

      // final css style value
      return {
        position: 'fixed',
        width: `${widthNumber}px`,
        maxWidth: maxWidthString,
        height: props.fitContent ? 'fit-content' : `${heightNumber}px`,
        maxHeight: maxHeightString,
        left:
          props.left !== undefined
            ? props.left
            : `calc(50vw - ${Number(widthNumber) / 2}px)`,
        top:
          props.top !== undefined
            ? props.top
            : `calc(50vh - ${Number(heightNumber) / 2}px)`,
        transition: props.transition,
      } as CSSProperties;
    });

    const onClickBackdrop = () => {
      if (props.closeOnBackdrop && props.show) {
        emit('update:show', false);
      }
    };

    watch(
      () => props.show,
      async () => {
        if (props.show) {
          (document.activeElement as HTMLElement)?.blur?.();
          await new Promise((res) => setTimeout(res, 1));
          dialog.value?.focus?.();
        }
        const eventName = props.show
          ? XuiEvent.DIALOGUE_SHOW
          : XuiEvent.DIALOGUE_HIDE;
        // plugin will decide dialog to show or not
        const toShow = await emitter.emitAsync(
          eventName,
          props.id,
          props.widgetName,
        );
        if (toShow.length > 0 && (toShow[0] as boolean) !== props.show) {
          emit('update:show', toShow[0]);
        }
        bodyClientHeight.value = dialogueBody?.value?.clientHeight || 0;
      },
      {
        immediate: true,
      },
    );

    const handleClose = async () => {
      if (props.show) {
        await emitter.emitAsync(
          XuiEvent.DIALOGUE_HIDE,
          props.id,
          props.widgetName,
        );
        emit('update:show', false);
      }
    };
    onUnmounted(handleClose);
    onDeactivated(handleClose);

    const { show, disableEnter, disableEsc } = toRefs(props);
    const { enterDisabled, escDisabled } = useModalHotkeyDisabled(
      show,
      disableEnter,
      disableEsc,
    );

    const isActive = ref(false);
    onMounted(() => {
      isActive.value = true;
    });
    onActivated(() => {
      isActive.value = true;
    });
    onDeactivated(() => {
      isActive.value = false;
    });

    const removeEnterHotkey = onKeyDown('Enter', (e) => {
      if (isActive.value && props.show && !enterDisabled.value) {
        handleModalHandler(e, dialog, () => emit('enter'));
      }
    });

    const removeEscHotkey = onKeyDown('Escape', (e) => {
      if (isActive.value && props.show && !escDisabled.value) {
        handleModalHandler(e, dialog, () => emit('esc'));
      }
    });

    onUnmounted(() => {
      removeEnterHotkey();
      removeEscHotkey();
    });

    return {
      dialogueStyle,
      zIndexStyle,
      dialog,
      dialogueBody,
      dialogNanoId,
      onClickBackdrop,
    };
  },
});
</script>

<style lang="scss">
.x-dialogue-modal {
  position: absolute;
  border-radius: 16px;
  background-color: var(--xv-container--surface);
  z-index: var(--x-dialogue-z-index);
}

.x-dialogue-container {
  z-index: var(--x-dialogue-z-index);
  box-shadow: 0 0 8px 0 #2224;

  &[enabled='true']::before {
    content: '';
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    inset: 0;
    z-index: var(--x-dialogue-z-index);
  }
}
</style>
