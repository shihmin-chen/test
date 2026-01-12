import { XToastTheme } from '../../../../index';
import { useShowWarningToast } from './ToastWarning';

describe('useShowWarningToast', () => {
  it('should call showToast with the correct message and theme', () => {
    const showToastMock = jest.fn();
    const message = 'Warning message';
    const showWarningToast = useShowWarningToast(showToastMock);

    showWarningToast(message);

    expect(showToastMock).toHaveBeenCalledWith({
      content: message,
      theme: XToastTheme.Warning,
    });
  });
});
