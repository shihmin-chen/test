import { h } from 'vue';

import { useTransientDialogRequestType } from '../../atomComposables/private/useDialog';
import {
  ConfirmDialogArgs,
  ConfirmDialogProps,
  ConfirmDialogResult,
  MaybeRefOrComputed,
} from '../../type';
import ConfirmDialogSlot from './ConfirmDialogSlot.vue';

export interface ConfirmDialogSlotProps<ConfirmDialogResolveType> {
  confirmDialogProps?: MaybeRefOrComputed<ConfirmDialogProps>;
  onClickPrimaryCallback?: (
    resolve: (result: ConfirmDialogResolveType) => void,
  ) => void;
  onClickSecondaryCallback?: (
    resolve: (result: ConfirmDialogResolveType) => void,
  ) => void;
  onClickTertiaryCallback?: (
    resolve: (result: ConfirmDialogResolveType) => void,
  ) => void;
}

export const useConfirmDialogSlot = <ConfirmDialogResolveType>(
  props: ConfirmDialogSlotProps<ConfirmDialogResolveType>,
) => {
  const requestContainer: {
    request: useTransientDialogRequestType<
      ConfirmDialogArgs,
      ConfirmDialogResult
    >;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  } = {
    // @ts-expect-error: request is not defined in ConfirmDialogSlotProps
    request: () => {},
  };
  const TemplateRender = () => {
    return h(ConfirmDialogSlot, {
      ...props,
      // @ts-expect-error: requestContainer is not defined in ConfirmDialogSlotProps
      requestContainer,
    });
  };

  const template = TemplateRender();

  return {
    template,
    requestContainer,
  };
};
