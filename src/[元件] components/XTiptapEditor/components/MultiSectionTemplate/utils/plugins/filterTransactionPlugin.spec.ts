import { getFilterTransactionPlugin } from './filterTransactionPlugin';

/**
 * NOTE: 此 test 從 opd v2 複製過來，再微調
 */

describe('Test getFilterTransactionPlugin', () => {
  afterEach(() => {
    // teardown: reset called
    jest.clearAllMocks();
  });

  afterAll(() => {
    // teardown: mock
    jest.restoreAllMocks();
  });

  it('Test getFilterTransactionPlugin', () => {
    const plugin = getFilterTransactionPlugin();
    const { filterTransaction } = plugin.spec;

    let tr = {
      docChanged: true,
    } as any;

    let state = {
      selection: {
        $anchor: {
          node: jest.fn().mockReturnValue(0),
        },
        $head: {
          node: jest.fn().mockReturnValue(1),
        },
      },
    } as any;

    expect(filterTransaction!(tr, state)).toBe(false);

    tr = {
      docChanged: false,
    };

    expect(filterTransaction!(tr, state)).toBe(true);

    state = {
      selection: {
        $anchor: {
          node: jest.fn().mockReturnValue(0),
        },
        $head: {
          node: jest.fn().mockReturnValue(0),
        },
      },
    };

    expect(filterTransaction!(tr, state)).toBe(true);

    tr = {
      docChanged: true,
    };

    expect(filterTransaction!(tr, state)).toBe(true);
  });
});
