import { XDialogLayoutTheme } from '../../../../index';
import {
  UseTransientDialogRequestOptions,
  useTransientDialogRequestType,
} from '../../atomComposables/private/useDialog';
import {
  ConfirmDialogArgs,
  ConfirmDialogResolveType,
  ConfirmDialogResult,
} from '../../type';

export const useRequestDangerConfirmDialog = (
  requestConfirmDialog: useTransientDialogRequestType<
    ConfirmDialogArgs,
    ConfirmDialogResult
  >,
) => {
  const requestDangerConfirmDialog = async (
    dialogArgs: ConfirmDialogArgs,
    options: UseTransientDialogRequestOptions = {},
  ) => {
    const result = await requestConfirmDialog(
      {
        ...dialogArgs,
        theme: XDialogLayoutTheme.Danger,
      },
      options,
    );
    return result.resolveType === ConfirmDialogResolveType.Primary;
  };

  return requestDangerConfirmDialog;
};
