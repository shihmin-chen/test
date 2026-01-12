import { XToastTheme } from '../../../../index';
import {
  useShowNeutralToast,
  useShowNeutralToastNoAutoHide,
} from './ToastNeutral';

describe('ToastNeutral', () => {
  it('should show a neutral toast with the correct message', () => {
    const showToastMock = jest.fn();
    const showNeutralToast = useShowNeutralToast(showToastMock);
    const message = 'Test message';

    showNeutralToast(message);

    expect(showToastMock).toHaveBeenCalledWith({
      content: message,
      theme: XToastTheme.Neutral,
    });
  });

  it('should show a neutral toast with no auto-hide and the correct message', () => {
    const showToastMock = jest.fn();
    const showNeutralToastNoAutoHide =
      useShowNeutralToastNoAutoHide(showToastMock);
    const message = 'Test message';

    showNeutralToastNoAutoHide(message);

    expect(showToastMock).toHaveBeenCalledWith({
      content: message,
      theme: XToastTheme.Neutral,
      noAutoHide: true,
    });
  });
});
