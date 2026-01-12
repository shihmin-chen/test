import emitter, { XuiEvent } from '@asus-aics/x-fe-emitter';
export class DialoguePlugin {
  static map: { [key: string]: number } = {};

  static install(): void {
    emitter.on(XuiEvent.DIALOGUE_SHOW, (id: string) => {
      if (!id) {
        return Promise.resolve(true);
      }
      DialoguePlugin.map[id] = DialoguePlugin.map[id]
        ? DialoguePlugin.map[id] + 1
        : 1;
      // if more than one dialog visible with the same id, ask the later to close itself
      return Promise.resolve(DialoguePlugin.map[id] <= 1);
    });
    emitter.on(XuiEvent.DIALOGUE_HIDE, (id: string) => {
      DialoguePlugin.map[id] = Math.max(DialoguePlugin.map[id] - 1, 0);
      return Promise.resolve(false);
    });
  }
}
