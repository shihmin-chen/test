import { Editor } from '@tiptap/vue-3';
import { shallowRef } from 'vue';

import { useContextMenu } from './useContextMenu';

describe('useContextMenu', () => {
  // setup: mock clipboard
  const mockClipboard = {
    writeText: jest.fn(),
    readText: jest.fn(),
  };
  Object.defineProperty(global.navigator, 'clipboard', {
    value: mockClipboard,
    writable: true,
  });

  // setup: mock editor
  const mockTextBetween = jest.fn();
  const mockDeleteSelection = jest.fn();
  const mockFocus = jest.fn();
  const mockInsertText = jest.fn();
  const getDefaultEditor = () =>
    ({
      state: {
        selection: {
          from: 0,
          to: 0,
          empty: true,
        },
        doc: {
          textBetween: mockTextBetween,
        },
      },
      commands: {
        deleteSelection: mockDeleteSelection,
        focus: mockFocus,
      },
      view: {
        dispatch: jest.fn(),
        state: {
          tr: {
            insertText: mockInsertText,
          },
        },
      },
    }) as unknown as Editor;

  // setup: data
  const defaultEditor = shallowRef();
  const defaultReadonly = false;

  beforeEach(() => {
    defaultEditor.value = getDefaultEditor();
  });

  afterEach(() => {
    // teardown: reset called
    jest.clearAllMocks();
  });

  afterAll(() => {
    // teardown: mock
    jest.restoreAllMocks();
  });

  it('Test contextMenuItemGroups - cut', async () => {
    // setup: mock
    mockTextBetween.mockReturnValue('fakeText');

    // setup: use composable
    const { contextMenuItemGroups } = useContextMenu(
      defaultEditor,
      defaultReadonly, // case: editable
    );

    // exercise: call cut menu item callback
    const menuItem = contextMenuItemGroups.value[0].items.find(
      (item) => item.name === '剪下(Ctrl+X)',
    );
    await menuItem?.callback?.();

    // verify: should write selected text to clipboard
    expect(mockClipboard.writeText).toHaveBeenCalledWith('fakeText');

    // verify: should delete selection
    expect(mockDeleteSelection).toHaveBeenCalledTimes(1);
  });

  it('Test contextMenuItemGroups - copy', async () => {
    // setup: mock
    mockTextBetween.mockReturnValue('fakeText');

    // setup: use composable
    const { contextMenuItemGroups } = useContextMenu(
      defaultEditor,
      defaultReadonly, // case: editable
    );

    // exercise: call cut menu item callback
    const menuItem = contextMenuItemGroups.value[0].items.find(
      (item) => item.name === '複製(Ctrl+C)',
    );
    await menuItem?.callback?.();

    // verify: should write selected text to clipboard
    expect(mockClipboard.writeText).toHaveBeenCalledWith('fakeText');

    // verify: should re-focus editor
    expect(mockFocus).toHaveBeenCalledTimes(1);
  });

  it('Test contextMenuItemGroups - paste', async () => {
    // setup: mock
    mockClipboard.readText.mockReturnValue('fakeText');

    // setup: use composable
    const { contextMenuItemGroups } = useContextMenu(
      defaultEditor,
      defaultReadonly, // case: editable
    );

    // exercise: call cut menu item callback
    const menuItem = contextMenuItemGroups.value[0].items.find(
      (item) => item.name === '貼上(Ctrl+V)',
    );
    await menuItem?.callback?.();

    // verify: should delete selection
    expect(mockDeleteSelection).toHaveBeenCalledTimes(1);

    // verify: should insert clipboard text to editor
    expect(mockInsertText).toHaveBeenCalledWith('fakeText');
  });

  it('Test showEditorContextMenu - disabled', async () => {
    // setup: use composable
    const { contextMenuItemGroups, showEditorContextMenu } = useContextMenu(
      defaultEditor,
      defaultReadonly, // case: editable
    );

    // exercise: mutate editor state
    defaultEditor.value.state.selection.empty = false;

    // exercise: call target function
    showEditorContextMenu({} as MouseEvent);

    // verify: menu items' disabled value
    expect(contextMenuItemGroups.value).toStrictEqual([
      {
        items: [
          expect.objectContaining({
            name: '剪下(Ctrl+X)',
            disabled: false, // case: should not be disabled if selection is not empty
          }),
          expect.objectContaining({
            name: '複製(Ctrl+C)',
            disabled: false, // case: should not be disabled if selection is not empty
          }),
          expect.objectContaining({
            name: '貼上(Ctrl+V)',
            disabled: false, // should not be disabled if editable
          }),
        ],
      },
    ]);

    // TODOITEM: verify `handleContextMenu` should be called?
  });

  it('Test showEditorContextMenu - disabled', async () => {
    // setup: use composable
    const { contextMenuItemGroups, showEditorContextMenu } = useContextMenu(
      defaultEditor,
      true, // case: readonly
    );

    // exercise: call target function
    showEditorContextMenu({} as MouseEvent);

    // verify: menu items' disabled value
    expect(contextMenuItemGroups.value).toStrictEqual([
      {
        items: [
          expect.objectContaining({
            name: '剪下(Ctrl+X)',
            disabled: true, // case: should be disabled if selection is empty
          }),
          expect.objectContaining({
            name: '複製(Ctrl+C)',
            disabled: true, // case: should be disabled if selection is empty
          }),
          expect.objectContaining({
            name: '貼上(Ctrl+V)',
            disabled: true, // should be disabled if not editable
          }),
        ],
      },
    ]);
  });

  it('Test hideEditorContextMenu', async () => {
    // setup: use composable
    const { hideEditorContextMenu } = useContextMenu(
      defaultEditor,
      defaultReadonly,
    );

    // exercise: call target function
    hideEditorContextMenu();

    // TODOITEM: verify `hideContextMenu` should be called?
  });
});
