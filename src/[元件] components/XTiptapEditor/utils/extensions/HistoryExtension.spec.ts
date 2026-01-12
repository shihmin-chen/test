import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

import { HistoryExtension } from './historyExtension';

/**
 * NOTE: 此 test 從 opd v2 複製過來，再微調
 */

describe('Test HistoryCommands', () => {
  // setup: data
  const getDefaultEditor = () =>
    new Editor({
      extensions: [
        StarterKit.configure({
          history: false,
        }),
        HistoryExtension,
      ],
    });

  afterEach(() => {
    // teardown: reset called
    jest.clearAllMocks();
  });

  afterAll(() => {
    // teardown: mock
    jest.restoreAllMocks();
  });

  it('Test undo', () => {
    // setup: editor
    const editor = getDefaultEditor();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    editor.view.scrollToSelection = jest.fn(); // NOTE: 不 mock 的話會出現 `TypeError: target.getClientRects is not a function` 錯誤, @see: https://discuss.prosemirror.net/t/make-togglemarks-scrollintoview-optional/5555

    // verify: can undo before edit
    expect(editor.can().undo()).toBe(false);

    // exercise: update content
    editor.commands.setContent('test');

    // verify: can undo after edit
    expect(editor.can().undo()).toBe(true);

    // exercise: undo
    editor.commands.undo();

    // verify: can undo after undo
    expect(editor.can().undo()).toBe(false);

    // verify: content should be empty after undo
    expect(editor.getHTML()).not.toContain('test');
  });

  it('Test redo', () => {
    // setup: editor
    const editor = getDefaultEditor();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    editor.view.scrollToSelection = jest.fn(); // NOTE: 不 mock 的話會出現 `TypeError: target.getClientRects is not a function` 錯誤, @see: https://discuss.prosemirror.net/t/make-togglemarks-scrollintoview-optional/5555

    // verify: can redo before edit
    expect(editor.can().redo()).toBe(false);

    // exercise: update content and undo
    editor.commands.setContent('test');
    editor.commands.undo();

    // verify: can redo after undo
    expect(editor.can().redo()).toBe(true);

    // exercise: redo
    editor.commands.redo();

    // verify: content should be the updated value after redo
    expect(editor.getHTML()).toContain('test');
  });
});
