import assert from 'assert';
import { TextSelection } from 'prosemirror-state';

import { getSelectionRestrictionPlugin } from './selectionRestrictionPlugin';

/**
 * NOTE: 此 test 從 opd v2 複製過來，再微調
 */

describe('Test getSelectionRestrictionPlugin', () => {
  const fakeTextSelection = {} as any;
  const textSelectionCreateMock = jest.spyOn(TextSelection, 'create');

  beforeEach(() => {
    textSelectionCreateMock.mockReturnValue(fakeTextSelection);
  });

  afterEach(() => {
    // teardown: reset called
    jest.clearAllMocks();
  });

  afterAll(() => {
    // teardown: mock
    jest.restoreAllMocks();
  });

  it('Test getSelectionRestrictionPlugin', () => {
    const plugin = getSelectionRestrictionPlugin();
    const { handleClick, handleDOMEvents } = plugin.spec.props as any;
    const { keydown, keyup, mouseleave, selectstart } = handleDOMEvents;

    const event = {};

    const dispatchMock = jest.fn();
    dispatchMock.mockReturnValue(0);

    const view = {
      dispatch: dispatchMock,
      state: {
        tr: {
          setSelection: jest.fn().mockReturnValue(0),
        },
        doc: {
          resolve: jest.fn().mockReturnValue(0),
        },
        selection: {
          head: 1,
          $anchor: {
            pos: 1,
            before: jest.fn().mockReturnValue(0),
            index: jest.fn().mockReturnValue(0),
          },
          $head: {
            pos: 1,
          },
        },
      },
    };
    let result = keydown(view, event);
    assert.strictEqual(result, undefined);
    result = keyup(view, event);
    assert.strictEqual(result, undefined);
    result = handleClick(view, 0, event);
    assert.strictEqual(result, undefined);
    result = handleClick(view, 0, { button: 0 });
    expect(TextSelection.create).toHaveBeenCalledWith(view.state.doc, 0);
    expect(dispatchMock).toHaveBeenCalledWith(0);
    assert.strictEqual(result, undefined);
    result = mouseleave(view, event);
    assert.strictEqual(result, undefined);
    result = selectstart(view, event);
    assert.strictEqual(result, undefined);
  });

  it('test createSelectionBetween same key', () => {
    const plugin = getSelectionRestrictionPlugin();
    const { createSelectionBetween } = plugin.spec.props as any;

    const view = {
      dispatch: jest.fn().mockReturnValue(0),
      state: {
        tr: {
          setSelection: jest.fn().mockReturnValue(0),
        },
        doc: {
          resolve: jest.fn().mockReturnValue(0),
        },
        selection: {
          head: 1,
          $anchor: {
            pos: 1,
            before: jest.fn().mockReturnValue(0),
            index: jest.fn().mockReturnValue(0),
          },
          $head: {
            pos: 1,
          },
        },
      },
    };

    const nodeMockA = jest.fn();
    nodeMockA.mockReturnValue({ attrs: { key: 'A' } });
    const nodeMockB = jest.fn();
    nodeMockB.mockReturnValue({ attrs: { key: 'A' } });

    const anchor = {
      node: nodeMockA,
      start: jest.fn(),
      end: jest.fn(),
      pos: 1,
    };

    const head = {
      node: nodeMockB,
      start: jest.fn(),
      end: jest.fn(),
      pos: 2,
    };
    const result = createSelectionBetween(view, anchor, head);
    assert.equal(result, null);
  });

  it('test createSelectionBetween headPos > anchorPos', () => {
    const plugin = getSelectionRestrictionPlugin();
    const { createSelectionBetween } = plugin.spec.props as any;

    const view = {
      dispatch: jest.fn().mockReturnValue(0),
      state: {
        tr: {
          setSelection: jest.fn().mockReturnValue(0),
        },
        doc: {
          resolve: jest.fn().mockReturnValue(0),
        },
        selection: {
          head: 1,
          $anchor: {
            pos: 1,
            before: jest.fn().mockReturnValue(0),
            index: jest.fn().mockReturnValue(0),
          },
          $head: {
            pos: 1,
          },
        },
      },
    };

    const nodeMockA = jest.fn();
    nodeMockA.mockReturnValue({ attrs: { key: 'A' } });
    const nodeMockB = jest.fn();
    nodeMockB.mockReturnValue({ attrs: { key: 'B' } });

    const anchor = {
      node: nodeMockA,
      start: jest.fn(),
      end: jest.fn(),
      pos: 1,
    };

    const head = {
      node: nodeMockB,
      start: jest.fn(),
      end: jest.fn(),
      pos: 2,
    };
    const result = createSelectionBetween(view, anchor, head);
    assert.equal(result, fakeTextSelection);
  });

  it('test createSelectionBetween headPos < anchorPos', () => {
    const plugin = getSelectionRestrictionPlugin();
    const { createSelectionBetween } = plugin.spec.props as any;

    const view = {
      dispatch: jest.fn().mockReturnValue(0),
      state: {
        tr: {
          setSelection: jest.fn().mockReturnValue(0),
        },
        doc: {
          resolve: jest.fn().mockReturnValue(0),
        },
        selection: {
          head: 1,
          $anchor: {
            pos: 1,
            before: jest.fn().mockReturnValue(0),
            index: jest.fn().mockReturnValue(0),
          },
          $head: {
            pos: 1,
          },
        },
      },
    };

    const nodeMockA = jest.fn();
    nodeMockA.mockReturnValue({ attrs: { key: 'A' } });
    const nodeMockB = jest.fn();
    nodeMockB.mockReturnValue({ attrs: { key: 'B' } });

    const anchor = {
      node: nodeMockA,
      start: jest.fn(),
      end: jest.fn(),
      pos: 2,
    };

    const head = {
      node: nodeMockB,
      start: jest.fn(),
      end: jest.fn(),
      pos: 1,
    };
    const result = createSelectionBetween(view, anchor, head);
    assert.strictEqual(result, fakeTextSelection);
  });

  it('test createSelectionBetween headPos = anchorPos', () => {
    const plugin = getSelectionRestrictionPlugin();
    const { createSelectionBetween } = plugin.spec.props as any;

    const view = {
      dispatch: jest.fn().mockReturnValue(0),
      state: {
        tr: {
          setSelection: jest.fn().mockReturnValue(0),
        },
        doc: {
          resolve: jest.fn().mockReturnValue(0),
        },
        selection: {
          head: 1,
          $anchor: {
            pos: 1,
            before: jest.fn().mockReturnValue(0),
            index: jest.fn().mockReturnValue(0),
          },
          $head: {
            pos: 1,
          },
        },
      },
    };

    const nodeMockA = jest.fn();
    nodeMockA.mockReturnValue({ attrs: { key: 'A' } });
    const nodeMockB = jest.fn();
    nodeMockB.mockReturnValue({ attrs: { key: 'B' } });

    const anchor = {
      node: nodeMockA,
      start: jest.fn(),
      end: jest.fn(),
      pos: 2,
    };

    const head = {
      node: nodeMockB,
      start: jest.fn(),
      end: jest.fn(),
      pos: 2,
    };
    const result = createSelectionBetween(view, anchor, head);
    assert.strictEqual(result, null);
  });

  it('test createSelectionBetween mouseleave and keyup', () => {
    const plugin = getSelectionRestrictionPlugin();
    const { handleDOMEvents, createSelectionBetween } = plugin.spec
      .props as any;
    const { keyup, mouseleave } = handleDOMEvents;

    const event = {};

    const view = {
      dispatch: jest.fn().mockReturnValue(0),
      state: {
        tr: {
          setSelection: jest.fn().mockReturnValue(0),
        },
        doc: {
          resolve: jest.fn().mockReturnValue(0),
        },
        selection: {
          empty: true,
          head: 1,
          $anchor: {
            pos: 1,
            before: jest.fn().mockReturnValue(0),
            index: jest.fn().mockReturnValue(0),
          },
          $head: {
            pos: 1,
          },
        },
      },
    };

    const nodeMockA = jest.fn();
    nodeMockA.mockReturnValue({ attrs: { key: 'A' } });
    const nodeMockB = jest.fn();
    nodeMockB.mockReturnValue({ attrs: { key: 'A' } });

    const anchor = {
      node: nodeMockA,
      start: jest.fn(),
      end: jest.fn(),
      pos: 2,
    };

    const head = {
      node: nodeMockB,
      start: jest.fn(),
      end: jest.fn(),
      pos: 2,
    };
    mouseleave(view, event);
    keyup(view, event);

    let result = createSelectionBetween(view, anchor, head);
    assert.notStrictEqual(result, fakeTextSelection);

    view.state.selection.empty = false;
    result = createSelectionBetween(view, anchor, head);
    assert.strictEqual(result, fakeTextSelection);
  });
});
