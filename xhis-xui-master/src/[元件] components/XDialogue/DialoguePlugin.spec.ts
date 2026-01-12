import { DialoguePlugin } from './DialoguePlugin';
import emitter, { XuiEvent } from '@asus-aics/x-fe-emitter';

describe('test DialoguePlugin', () => {
  it('should get false if dialog is already shown', async () => {
    DialoguePlugin.install();
    let toShow = await emitter.emitAsync(
      XuiEvent.DIALOGUE_SHOW,
      'test-dialog-id'
    );
    expect(toShow[0]).toBe(true);
    toShow = await emitter.emitAsync(XuiEvent.DIALOGUE_SHOW, 'test-dialog-id');
    expect(toShow[0]).toBe(false);
  });
  it('shoud always show if no id is provided', async () => {
    const toShow = await emitter.emitAsync(XuiEvent.DIALOGUE_SHOW, '');
    expect(toShow[0]).toBe(true);
  });
  it('should return false if hide', async () => {
    const toShow = await emitter.emitAsync(XuiEvent.DIALOGUE_HIDE, 'abc');
    expect(toShow[0]).toBe(false);
  });
});
