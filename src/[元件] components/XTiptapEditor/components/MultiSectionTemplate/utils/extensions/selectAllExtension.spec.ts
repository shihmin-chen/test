import { TextSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { selectSectionAll } from './selectAllExtension';

/**
 * NOTE: 此 test 由 copilot 產生，再微調
 */

jest.mock('prosemirror-view', () => ({
  EditorView: jest.fn(),
}));

jest.mock('prosemirror-state', () => ({
  TextSelection: jest.fn(),
}));

describe('selectSectionAll', () => {
  let view: EditorView;
  let state: any;
  let tr: any;
  let selection: any;
  let $head: any;

  beforeEach(() => {
    $head = {
      before: jest.fn().mockReturnValue(2),
      after: jest.fn().mockReturnValue(8),
    };
    selection = { $head };
    tr = {
      setSelection: jest.fn(),
    };
    state = {
      doc: {
        resolve: jest.fn().mockImplementation((pos) => ({ pos })),
      },
      tr,
      selection,
    };
    view = {
      state,
      dispatch: jest.fn(),
    } as unknown as EditorView;
  });

  it('Test selectSectionAll', () => {
    // exercise: call target function
    const result = selectSectionAll(view);

    // verify
    expect(state.doc.resolve).toHaveBeenCalledWith(4); // 4 = 2 (`$head.before`) + 2
    expect(state.doc.resolve).toHaveBeenCalledWith(6); // 6 = 8 (`$head.after`) - 2
    expect(TextSelection).toHaveBeenCalledWith({ pos: 4 }, { pos: 6 });
    expect(tr.setSelection).toHaveBeenCalledWith(expect.any(TextSelection));
    expect(result).toBe(true);
    expect(view.dispatch).toHaveBeenCalledWith(tr);
  });
});
