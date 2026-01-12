import { Extension } from '@tiptap/core';
import { undo, redo, history } from 'prosemirror-history';

// 擴展 RawCommands 類型，包含 undo 和 redo
declare module '@tiptap/core' {
  interface Commands {
    history: {
      undo: () => boolean;
      redo: () => boolean;
    };
  }
}

/**
 * 編輯記錄相關功能
 * - 包含 undo, redo
 */
export const HistoryExtension = Extension.create({
  name: 'history',
  // @ts-expect-error: addCommands
  addCommands() {
    return {
      undo:
        () =>
        ({ state, dispatch }) => {
          return undo(state, dispatch);
        },
      redo:
        () =>
        ({ state, dispatch }) => {
          return redo(state, dispatch);
        },
    };
  },
  addProseMirrorPlugins() {
    return [history()];
  },

  addKeyboardShortcuts() {
    return {
      'Mod-z': () => this.editor?.commands.undo(),
      'Mod-y': () => this.editor?.commands.redo(),
    };
  },
});
