import { Node as ProseMirrorNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';

import { MULTI_SECTION_TEMPLATE_NODES } from '../../constants';
import { switchToPreviousNextSection } from './switchSectionExtension';

/**
 * NOTE: 此 test 由 copilot 產生，再微調
 */

jest.mock('prosemirror-state', () => ({
  Selection: {
    near: jest.fn(),
  },
}));

describe('switchToPreviousNextSection', () => {
  // setup: mock editor
  const mockEditorView = {
    state: {
      doc: {
        descendants: jest.fn(),
        resolve: jest.fn(),
        nodeAt: jest.fn().mockReturnValue({ nodeSize: 10 }), // is all node size of section node is 10
      },
      selection: {
        $anchor: { pos: 0 },
        $head: { pos: 0 },
      },
      tr: {
        setSelection: jest.fn(),
        scrollIntoView: jest.fn(),
      },
    },
    dispatch: jest.fn(),
  } as unknown as EditorView;
  const mockSectionNode = {
    type: { name: MULTI_SECTION_TEMPLATE_NODES.SECTION_NODE.NAME },
    nodeSize: 10,
  } as unknown as ProseMirrorNode;

  beforeEach(() => {
    // setup: mock section nodes
    (mockEditorView.state.doc.descendants as jest.Mock).mockImplementation(
      (callback) => {
        callback(mockSectionNode, 0);
        callback(mockSectionNode, 10);
        callback(mockSectionNode, 20);
      },
    );
  });

  afterEach(() => {
    // teardown: reset called
    jest.clearAllMocks();
  });

  afterAll(() => {
    // teardown: mock
    jest.restoreAllMocks();
  });

  it('Test switchToPreviousNextSection - has selection', () => {
    // setup: mock
    const newSelection = {
      $anchor: { pos: 0 },
      $head: { pos: 1 },
    };
    Object.assign(mockEditorView.state.selection, newSelection); // case: head position is not equal to anchor position

    // exercise: call target function with next section
    const result = switchToPreviousNextSection(mockEditorView, false);

    // verify
    expect(result).toBe(false); // should not switch if has selection
  });

  it('Test switchToPreviousNextSection - next section', () => {
    // setup: mock
    const newSelection = {
      $anchor: { pos: 10 }, // second section node
      $head: { pos: 10 }, // second section node
    };
    Object.assign(mockEditorView.state.selection, newSelection);

    // exercise: call target function with next section
    const result = switchToPreviousNextSection(mockEditorView, false);

    // verify
    expect(result).toBe(true);
    expect(mockEditorView.state.tr.setSelection).toHaveBeenCalled();
    expect(mockEditorView.dispatch).toHaveBeenCalled();
    expect(mockEditorView.state.doc.resolve).toHaveBeenCalledWith(20); // 20 is third section node's position
  });

  it('Test switchToPreviousNextSection - previous section', () => {
    // setup: mock
    const newSelection = {
      $anchor: { pos: 10 }, // second section node
      $head: { pos: 10 }, // second section node
    };
    Object.assign(mockEditorView.state.selection, newSelection);

    // exercise: call target function with previous section
    const result = switchToPreviousNextSection(mockEditorView, true);

    // verify
    expect(result).toBe(true);
    expect(mockEditorView.state.tr.setSelection).toHaveBeenCalled();
    expect(mockEditorView.dispatch).toHaveBeenCalled();
    expect(mockEditorView.state.doc.resolve).toHaveBeenCalledWith(0); // 20 is first section node's position
  });

  it('Test switchToPreviousNextSection - out of range', () => {
    // setup: mock
    const newSelection = {
      $anchor: { pos: 0 }, // first section node
      $head: { pos: 0 }, // first section node
    };
    Object.assign(mockEditorView.state.selection, newSelection);

    // exercise: call target function with previous section
    const result = switchToPreviousNextSection(mockEditorView, true);

    // verify
    expect(result).toBe(false);
  });

  it('Test switchToPreviousNextSection - out of range', () => {
    // setup: mock
    const newSelection = {
      $anchor: { pos: 20 }, // third section node
      $head: { pos: 20 }, // third section node
    };
    Object.assign(mockEditorView.state.selection, newSelection);

    // exercise: call target function with next section
    const result = switchToPreviousNextSection(mockEditorView, false);

    // verify
    expect(result).toBe(false);
  });
});
