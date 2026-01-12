import { useTableKeyOperations } from './useKeyOperations';

describe('Test useTableKeyOperations', () => {
  // setup: mock
  const mockScrollToRow = jest.fn();
  const mockPreventDefault = jest.fn();
  const getMockEvent = (key: string) =>
    ({ key, preventDefault: mockPreventDefault } as unknown as KeyboardEvent);

  // setup: data
  const defaultTableData = [{ key: 'fake_key_0' }, { key: 'fake_key_1' }];
  const defaultTableRef = { scrollToRow: mockScrollToRow };
  const defaultTableKeyIndex = 'key';
  const defaultInitRowIndex = undefined;
  const defaultClickRow = undefined;

  afterEach(() => {
    // teardown
    jest.clearAllMocks();
  });

  afterAll(() => {
    // teardown
    jest.restoreAllMocks();
  });

  it('Test keyListeners, currentIndex, currentKey', async () => {
    // setup: use composable
    const { keyListeners, currentIndex, currentKey } = useTableKeyOperations(
      defaultTableData,
      defaultTableRef,
      defaultTableKeyIndex,
      defaultInitRowIndex,
      defaultClickRow
    );

    // exercise: keydown other key
    keyListeners.onKeydown(getMockEvent('Escape'));

    // verify: should not prevent default
    expect(mockPreventDefault).toBeCalledTimes(0);

    // exercise: keydown arrow up
    keyListeners.onKeydown(getMockEvent('ArrowUp'));

    // verify: should not move if next index < 0
    expect(mockPreventDefault).toBeCalledTimes(1);
    expect(currentIndex.value).toBe(0);
    expect(currentKey.value).toBe('fake_key_0');
    expect(mockScrollToRow).toBeCalledTimes(0);

    // exercise: keydown arrow down
    keyListeners.onKeydown(getMockEvent('ArrowDown'));

    // verify: should +1 index
    expect(mockPreventDefault).toBeCalledTimes(2);
    expect(currentIndex.value).toBe(1);
    expect(currentKey.value).toBe('fake_key_1');
    expect(mockScrollToRow).toBeCalledTimes(1);

    // exercise: keydown arrow down
    keyListeners.onKeydown(getMockEvent('ArrowDown'));

    // verify: should not move if next index > table data length
    expect(currentIndex.value).toBe(1);
    expect(currentKey.value).toBe('fake_key_1');

    // exercise: keydown arrow up
    keyListeners.onKeydown(getMockEvent('ArrowUp'));

    // verify: should -1 index
    expect(currentIndex.value).toBe(0);
    expect(currentKey.value).toBe('fake_key_0');

    // exercise: keydown enter
    keyListeners.onKeydown(getMockEvent('Enter'));

    // verify: should not raise error
  });

  it('Test keyListeners - undefined tableRef', async () => {
    // setup: use composable
    const { keyListeners } = useTableKeyOperations(
      defaultTableData,
      undefined,
      defaultTableKeyIndex,
      defaultInitRowIndex,
      defaultClickRow
    );

    // exercise: keydown arrow down
    keyListeners.onKeydown(getMockEvent('ArrowDown'));

    // verify: should +1 index
    expect(mockScrollToRow).toBeCalledTimes(0);
  });

  it('Test keyListeners - not exist table key', async () => {
    // setup: use composable
    const { keyListeners } = useTableKeyOperations(
      defaultTableData,
      defaultTableRef,
      'key2',
      defaultInitRowIndex,
      defaultClickRow
    );

    // exercise: keydown arrow down
    keyListeners.onKeydown(getMockEvent('ArrowDown'));

    // verify: should +1 index
    expect(mockScrollToRow).toBeCalledTimes(0);
  });

  it('Test keyListeners - select callback', async () => {
    // setup: mock
    const mockSelectCallback = jest.fn();

    // setup: use composable
    const { keyListeners } = useTableKeyOperations(
      defaultTableData,
      defaultTableRef,
      defaultTableKeyIndex,
      defaultInitRowIndex,
      mockSelectCallback
    );

    // exercise: keydown enter
    keyListeners.onKeydown(getMockEvent('Enter'));

    // verify: should call callback function
    expect(mockSelectCallback).toBeCalledTimes(1);
  });

  it('Test currentIndex, currentKey - init index', async () => {
    // setup: use composable
    const { currentIndex, currentKey } = useTableKeyOperations(
      defaultTableData,
      defaultTableRef,
      defaultTableKeyIndex,
      1,
      defaultClickRow
    );

    // verify: should
    expect(currentIndex.value).toBe(1);
    expect(currentKey.value).toBe('fake_key_1');
  });
});
