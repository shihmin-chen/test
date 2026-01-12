import { scrollToTableRow } from './useScrollToRow';

describe('useScrollToRow', () => {
  const mockSetTableElemScrollTop = jest.fn();
  const tableElem = document.createElement('div');
  Object.defineProperty(tableElem, 'offsetHeight', {
    get: () => 500,
  });
  Object.defineProperty(tableElem, 'scrollTop', {
    get: () => 0,
    set: mockSetTableElemScrollTop,
  });

  const headerElem = document.createElement('div');
  Object.defineProperty(headerElem, 'children', {
    get: () => [{ offsetHeight: 40 }],
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('no table ref', () => {
    scrollToTableRow({
      tableElem: undefined,
      headerElem: undefined,
      rowElem: undefined,
    });
    expect(mockSetTableElemScrollTop).toBeCalledTimes(0);
  });

  it('no rows', () => {
    scrollToTableRow({
      tableElem,
      headerElem: undefined,
      rowElem: undefined,
    });
    expect(mockSetTableElemScrollTop).toBeCalledTimes(0);
  });

  it('no header', () => {
    const rowElem = document.createElement('div');
    Object.defineProperty(rowElem, 'children', {
      get: () => [{ offsetHeight: 56, offsetTop: 500 }],
    });
    scrollToTableRow({
      tableElem,
      headerElem: undefined,
      rowElem,
    });

    expect(mockSetTableElemScrollTop).toBeCalledWith(500);
  });

  it('scroll to position start', () => {
    const rowElem = document.createElement('div');
    Object.defineProperty(rowElem, 'children', {
      get: () => [{ offsetTop: 400, offsetHeight: 56 }],
    });

    scrollToTableRow({ tableElem, headerElem, rowElem });
    expect(mockSetTableElemScrollTop).toBeCalledWith(360);
  });

  it('scroll to position center', () => {
    const rowElem = document.createElement('div');
    Object.defineProperty(rowElem, 'children', {
      get: () => [{ offsetTop: 400, offsetHeight: 56 }],
    });
    scrollToTableRow({ tableElem, headerElem, rowElem, position: 'center' });
    const CENTER = 158; // the center of the header's bottom and table's bottom
    expect(mockSetTableElemScrollTop).toBeCalledWith(CENTER);
  });
});
