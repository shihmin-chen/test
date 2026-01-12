import { XToastTheme } from '../../../../index';

export const useShowNeutralToast =
  (showToast: (arg0: { content: string; theme: XToastTheme }) => void) =>
  (message: string) => {
    showToast({ content: message, theme: XToastTheme.Neutral });
  };

export const useShowNeutralToastNoAutoHide =
  (
    showToast: (arg0: {
      content: string;
      theme: XToastTheme;
      noAutoHide: boolean;
    }) => void,
  ) =>
  (message: string) => {
    showToast({
      content: message,
      theme: XToastTheme.Neutral,
      noAutoHide: true,
    });
  };
