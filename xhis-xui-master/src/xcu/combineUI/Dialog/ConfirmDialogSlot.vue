<template>
  <ConfirmDialogTemplate v-slot="{ dialogArgs, resolve }">
    <ConfirmDialog
      v-bind="{ ...dialogProps, ...dialogArgs }"
      @click-primary="onClickPrimaryCallback?.(resolve)"
      @click-secondary="onClickSecondaryCallback?.(resolve)"
      @click-tertiary="onClickTertiaryCallback?.(resolve)"
    >
      <slot></slot> </ConfirmDialog
  ></ConfirmDialogTemplate>
</template>
<script
  setup
  lang="ts"
  generic="ConfirmDialogArgs, ConfirmDialogResult, ConfirmDialogResolveType"
>
import { computed, unref } from 'vue';

import {
  useTransientDialog,
  useTransientDialogRequestType,
} from '../../atomComposables/private/useDialog';
import ConfirmDialog from '../../combineUI/Dialog/ConfirmDialog.vue';
import { ConfirmDialogProps, MaybeRefOrComputed } from '../../type';

const {
  TransientDialogTemplate: ConfirmDialogTemplate,
  request: dialogRequest,
} = useTransientDialog<ConfirmDialogArgs, ConfirmDialogResult>();

const props = defineProps<{
  confirmDialogProps?: MaybeRefOrComputed<ConfirmDialogProps>;
  requestContainer: {
    request: useTransientDialogRequestType<
      ConfirmDialogArgs,
      ConfirmDialogResult
    >;
  };
  onClickPrimaryCallback?: (
    resolve: (result: ConfirmDialogResolveType) => void,
  ) => void;
  onClickSecondaryCallback?: (
    resolve: (result: ConfirmDialogResolveType) => void,
  ) => void;
  onClickTertiaryCallback?: (
    resolve: (result: ConfirmDialogResolveType) => void,
  ) => void;
}>();

const dialogProps = computed(() => unref(props.confirmDialogProps) ?? {});

// eslint-disable-next-line vue/no-mutating-props
props.requestContainer.request = dialogRequest;
</script>
