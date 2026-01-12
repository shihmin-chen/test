import { ConfirmDialogArgs, ConfirmDialogResult } from '../../type';
import { useProvideInjectTransientDialogState } from './useProvideInjectDialogState';

export const {
  useProvideDialogState: useProvideConfirmDialogState,
  useInjectDialogState: useInjectConfirmDialogState,
} = useProvideInjectTransientDialogState<ConfirmDialogArgs, ConfirmDialogResult>();
