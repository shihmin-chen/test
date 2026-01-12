import { XToastTheme } from '../../../../index';

export const useShowWarningToast =
  (showToast: (arg0: { content: string; theme: XToastTheme }) => void) =>
  (message: string) => {
    showToast({ content: message, theme: XToastTheme.Warning });
  };
