import { XToastTheme } from '../../../../index';
import { useShowInformationalToast } from './ToastInformational';

describe('useShowInformationalToast', () => {
  it('should call showToast with the correct message and theme', () => {
    const showToastMock = jest.fn();
    const message = 'Informational message';
    const showInformationalToast = useShowInformationalToast(showToastMock);

    showInformationalToast(message);

    expect(showToastMock).toHaveBeenCalledWith({
      content: message,
      theme: XToastTheme.Informational,
    });
  });
});
