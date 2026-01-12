import { XToastTheme } from '../../../../index';
import { useShowSuccessToast } from './ToastSuccess';

describe('useShowSuccessToast', () => {
  it('should call showToast with the correct message and theme', () => {
    const showToastMock = jest.fn();
    const message = 'Success message';
    const showSuccessToast = useShowSuccessToast(showToastMock);

    showSuccessToast(message);

    expect(showToastMock).toHaveBeenCalledWith({
      content: message,
      theme: XToastTheme.Success,
    });
  });
});
