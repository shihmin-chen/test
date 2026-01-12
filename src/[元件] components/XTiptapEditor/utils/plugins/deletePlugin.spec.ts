import { getDeletePlugin } from './deletePlugin';

describe('Test DeletePlugin', () => {
  afterEach(() => {
    // teardown: reset called
    jest.clearAllMocks();
  });

  afterAll(() => {
    // teardown: mock
    jest.restoreAllMocks();
  });

  it('test handleKeyDown on BACKSPACE', () => {
    const plugin = getDeletePlugin();
    const { handleKeyDown } = plugin.spec.props as any;

    const event = {
      key: 'Backspace',
    };

    let view = {
      state: {
        selection: {
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
    let result = handleKeyDown(view, event);
    expect(result).toStrictEqual(true);

    view = {
      state: {
        selection: {
          $anchor: {
            pos: 1,
            before: jest.fn().mockReturnValue(0),
            index: jest.fn().mockReturnValue(0),
          },
          $head: {
            pos: 2,
          },
        },
      },
    };
    result = handleKeyDown(view, event);
    expect(result).toStrictEqual(false);

    view = {
      state: {
        selection: {
          $anchor: {
            pos: 2,
            before: jest.fn().mockReturnValue(0),
            index: jest.fn().mockReturnValue(0),
          },
          $head: {
            pos: 2,
          },
        },
      },
    };
    result = handleKeyDown(view, event);
    expect(result).toStrictEqual(false);

    view = {
      state: {
        selection: {
          $anchor: {
            pos: 1,
            before: jest.fn().mockReturnValue(0),
            index: jest.fn().mockReturnValue(1),
          },
          $head: {
            pos: 1,
          },
        },
      },
    };
    result = handleKeyDown(view, event);
    expect(result).toStrictEqual(false);
  });

  it('test handleKeyDown on DELETE', () => {
    const plugin = getDeletePlugin();
    const { handleKeyDown } = plugin.spec.props as any;

    const event = {
      key: 'Delete',
    };

    let view = {
      state: {
        selection: {
          $anchor: {
            pos: 1,
            after: jest.fn().mockReturnValue(2),
            index: jest.fn().mockReturnValue(1),
            node: jest.fn().mockReturnValue({
              content: {
                childCount: 2,
              },
            }),
          },
          $head: {
            pos: 1,
          },
        },
      },
    };
    let result = handleKeyDown(view, event);
    expect(result).toStrictEqual(true);

    view = {
      state: {
        selection: {
          $anchor: {
            pos: 1,
            after: jest.fn().mockReturnValue(2),
            index: jest.fn().mockReturnValue(1),
            node: jest.fn().mockReturnValue({
              content: {
                childCount: 2,
              },
            }),
          },
          $head: {
            pos: 2,
          },
        },
      },
    };
    result = handleKeyDown(view, event);
    expect(result).toStrictEqual(false);

    view = {
      state: {
        selection: {
          $anchor: {
            pos: 1,
            after: jest.fn().mockReturnValue(1),
            index: jest.fn().mockReturnValue(1),
            node: jest.fn().mockReturnValue({
              content: {
                childCount: 2,
              },
            }),
          },
          $head: {
            pos: 1,
          },
        },
      },
    };
    result = handleKeyDown(view, event);
    expect(result).toStrictEqual(false);

    view = {
      state: {
        selection: {
          $anchor: {
            pos: 1,
            after: jest.fn().mockReturnValue(2),
            index: jest.fn().mockReturnValue(1),
            node: jest.fn().mockReturnValue({
              content: {
                childCount: 1,
              },
            }),
          },
          $head: {
            pos: 1,
          },
        },
      },
    };
    result = handleKeyDown(view, event);
    expect(result).toStrictEqual(false);
  });
});
