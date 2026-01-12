import { XToastTheme } from '../../../../index';

export const useShowSuccessToast =
  (showToast: (arg0: { content: string; theme: XToastTheme }) => void) =>
  (message: string) => {
    showToast({ content: message, theme: XToastTheme.Success });
  };
