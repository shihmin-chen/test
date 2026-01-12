import { XToastTheme } from '../../../../index';
import { useShowErrorToast } from './ToastError';

describe('useShowErrorToast', () => {
  it('should call showToast with the correct message and theme', () => {
    const showToastMock = jest.fn();
    const showErrorToast = useShowErrorToast(showToastMock);
    const message = 'This is an error message';

    showErrorToast(message);

    expect(showToastMock).toHaveBeenCalledWith({
      content: message,
      theme: XToastTheme.Error,
    });
  });
});
