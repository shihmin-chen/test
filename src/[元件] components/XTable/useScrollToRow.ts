export type ScrollToTableRowPosition = 'start' | 'center';

export interface ScrollToTableRowOptions {
  tableElem?: HTMLElement;
  headerElem?: HTMLElement;
  rowElem?: HTMLElement;
  position?: ScrollToTableRowPosition;
}

export const scrollToTableRow = ({
  tableElem,
  headerElem,
  rowElem,
  position = 'start',
}: ScrollToTableRowOptions) => {
  if (!tableElem) {
    return;
  }

  const headerCellElem = headerElem?.children?.[0] as HTMLElement;
  const rowCellElem = rowElem?.children?.[0] as HTMLElement;

  if (!rowCellElem) {
    return;
  }

  const { offsetHeight: tableHeight, offsetTop: tableOffsetTop } = tableElem;
  const headerHeight = headerCellElem?.offsetHeight || 0;
  const { offsetHeight: rowHeight, offsetTop: rowOffsetTop } = rowCellElem;

  // offset between first row and target row
  const offset = rowOffsetTop - tableOffsetTop - headerHeight;

  if (position === 'start') {
    const newScrollTop = offset;
    tableElem.scrollTop = newScrollTop;
    return newScrollTop;
  }

  if (position === 'center') {
    // in the middle of the header's bottom and the table's bottom
    const newScrollTop =
      offset - (tableHeight - headerHeight) / 2 + rowHeight / 2;
    tableElem.scrollTop = newScrollTop;
    return newScrollTop;
  }
};
