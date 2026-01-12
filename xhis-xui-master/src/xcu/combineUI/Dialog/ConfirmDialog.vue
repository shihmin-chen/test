<template>
  <XDialogue
    :show="true"
    :width="props.width ?? 768"
    :height="props.height"
    fit-content
    :zIndexShift="DefaultZIndex.PopupWindows + 1000"
    @enter="
      () => {
        if (isNil(computedPrimaryButton) || computedPrimaryButton.disabled)
          return;
        handleClickPrimary();
      }
    "
  >
    <XDialogLayout
      :title="computedTitle"
      :theme="computedTheme ?? XDialogLayoutTheme.Warning"
      class="max-h-80vh rounded-4"
      :class="{ xDialogLayout: isHiddenIcon, boxShadow }"
    >
      <template v-if="isShowBody" #body>
        <slot>
          <div class="flex flex-col">
            <span v-for="(item, index) in computedContentList" :key="index">
              {{ item }}
            </span>
          </div>
        </slot>
      </template>
      <template #footer-secondary>
        <XButton
          v-if="computedTertiaryButton"
          v-bind="tertiaryButtonProps"
          class="min-w-32"
          @click="handleClickTertiary"
        >
          {{ computedTertiaryButton.text }}
        </XButton>
      </template>
      <template #footer-primary>
        <XButton
          v-if="computedSecondaryButton"
          v-bind="secondaryButtonProps"
          class="min-w-32"
          @click="handleClickSecondary"
        >
          {{ computedSecondaryButton.text }}
        </XButton>
        <XButton
          v-if="computedPrimaryButton"
          v-bind="primaryButtonProps"
          class="min-w-32"
          @click="handleClickPrimary"
        >
          {{ computedPrimaryButton.text }}
        </XButton>
      </template>
    </XDialogLayout>
  </XDialogue>
</template>

<script setup lang="ts">
import { isNil, merge } from 'lodash';
import { computed, unref, useSlots } from 'vue';

import {
  DefaultZIndex,
  XButton,
  XButtonSize,
  XButtonTheme,
  XDialogLayout,
  XDialogLayoutTheme,
  XDialogue,
} from '../../../../index';
import { ConfirmDialogProps } from '../../type';

const props = defineProps<ConfirmDialogProps>();
const emit = defineEmits<{
  clickPrimary: [];
  clickSecondary: [];
  clickTertiary: [];
}>();
const slots = useSlots();

// init computed props
const computedTitle = computed(() => unref(props.title));
const computedContentList = computed(() => {
  const content = unref(props.content);
  if (content === undefined) {
    return [];
  }
  const contentList = Array.isArray(content) ? content : [content];
  return contentList;
});
const computedTheme = computed(() => unref(props.theme));
const computedPrimaryButton = computed(() => unref(props.primaryButton));
const computedSecondaryButton = computed(() => unref(props.secondaryButton));
const computedTertiaryButton = computed(() => unref(props.tertiaryButton));

// display
const isShowBody = computed(
  () => slots.default || computedContentList.value.length > 0,
);

// button props
const buttonSize: XButtonSize = 'lg';
const primaryButtonProps = computed(() =>
  merge(
    {
      theme: 'primary' as XButtonTheme,
      size: buttonSize,
    },
    unref(computedPrimaryButton),
  ),
);
const secondaryButtonProps = computed(() =>
  merge(
    {
      theme: 'tertiary' as XButtonTheme,
      size: buttonSize,
      outline: true,
    },
    unref(computedSecondaryButton),
  ),
);
const tertiaryButtonProps = computed(() =>
  merge(
    {
      theme: 'tertiary' as XButtonTheme,
      size: buttonSize,
      outline: true,
    },
    unref(computedTertiaryButton),
  ),
);

// events
const handleClickPrimary = () => {
  emit('clickPrimary');
};
const handleClickSecondary = () => {
  emit('clickSecondary');
};
const handleClickTertiary = () => {
  emit('clickTertiary');
};

defineExpose({
  primaryButtonProps,
  secondaryButtonProps,
  tertiaryButtonProps,
  handleClickPrimary,
  handleClickSecondary,
  handleClickTertiary,
}); // for unit test
</script>

<style lang="scss" scoped>
.xDialogLayout {
  :deep(div[class^='x-dialog-layout-main']) {
    div[class^='x-dialog-layout-icon'] {
      display: none;
    }
  }
}

.boxShadow {
  box-shadow: 0px 6px 16px 2px rgba(38, 38, 38, 0.2);
}
</style>
