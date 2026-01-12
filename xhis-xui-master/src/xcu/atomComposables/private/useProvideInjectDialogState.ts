import { createInjectionState } from '@vueuse/core';

import { useTransientDialog } from './useDialog';

export const useProvideInjectTransientDialogState = <DialogArgs, DialogResult>() => {
  const transientDialog = () => useTransientDialog<DialogArgs, DialogResult>();
  const [useProvideDialogState, _useInjectDialogState] = createInjectionState(transientDialog);

  const useInjectDialogState = () => {
    const state = _useInjectDialogState();
    if (state === undefined) {
      throw new Error('Dialog is not provided');
    }
    return {
      request: state.request,
    };
  };

  return { useProvideDialogState, useInjectDialogState };
};
