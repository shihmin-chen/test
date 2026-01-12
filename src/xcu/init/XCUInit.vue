<template>
  <template v-if="isXcuReady || isMockXcuReady">
    <slot> </slot>
  </template>
  <template v-else>
    <div>XCU setup fail</div>
  </template>
  <XToast ref="toastRef" v-bind="toastState.toastProps" @update:visible="handleToastVisibleUpdate" />
  <ConfirmDialogTemplate v-slot="{ dialogArgs, resolve }">
    <ConfirmDialog
      v-bind="dialogArgs"
      @click-primary="resolve({ resolveType: ConfirmDialogResolveType.Primary })"
      @click-secondary="resolve({ resolveType: ConfirmDialogResolveType.Secondary })"
      @click-tertiary="resolve({ resolveType: ConfirmDialogResolveType.Tertiary })"
    />
  </ConfirmDialogTemplate>
</template>
<script setup lang="ts">
import { setupXCU } from '../index';
import { useProvideConfirmDialogState } from '../atomComposables/private/useConfirmDialog';
import { useProvideGlobalToastState } from '../atomComposables/private/useToast';
import ConfirmDialog from '../combineUI/Dialog/ConfirmDialog.vue';
import { XToast } from '../../../index';
import { computed, ref, unref } from 'vue';
import { ConfirmDialogResolveType } from '../type';

// @ts-expect-error mockXcuReady
const isMockXcuReady = computed(() => unref(globalThis?.mockXcuReady));

// toast
const toastRef = ref<InstanceType<typeof XToast>>();
const resetToastAutoHide = () => {
  if (!toastRef.value) {
    return;
  }
  // @ts-expect-error if `defineExpose` is not used, the type cannot be inferred correctly.
  toastRef.value.resetAutoHide();
}
const { state: toastState, hide: hideToast } = useProvideGlobalToastState(resetToastAutoHide);
const handleToastVisibleUpdate = (visible: boolean) => {
  if (!visible) {
    // handle emit `update:visible` from `XToast`
    hideToast();
  }
};

// dialog
const { TransientDialogTemplate: ConfirmDialogTemplate } = useProvideConfirmDialogState();
const isXcuReady = ref(false);

setupXCU().then(() => {
  isXcuReady.value = true;
});
</script>
