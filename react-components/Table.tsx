import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';

export interface TableColumn<T = Record<string, unknown>> {
  /** Data key to retrieve row data */
  key: Extract<keyof T, string>;
  /** Column Header Name */
  title?: string;
  /** Control text alignment */
  align?: 'left' | 'center' | 'right';
  /** Column width */
  width?: string;
  /** Enable sorting */
  sortable?: boolean;
  /** Custom render function */
  render?: (value: unknown, record: T, index: number) => ReactNode;
  /** Extra class for cells */
  cellClassName?: string;
  /** Extra class for header */
  headerClassName?: string;
}

export interface TableProps<T = Record<string, unknown>>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Table data */
  data?: T[];
  /** Column definitions */
  columns?: TableColumn<T>[];
  /** Show table borders */
  bordered?: boolean;
  /** Striped rows */
  striped?: boolean;
  /** Hover effect on rows */
  hover?: boolean;
  /** Compact mode (smaller row height) */
  compact?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Empty state message */
  emptyText?: string;
  /** Row key */
  rowKey?: string | ((record: T, index: number) => string);
  /** Row click handler */
  onRowClick?: (record: T, index: number) => void;
  /** Selected row key */
  selectedRowKey?: string;
}

const getRowKey = <T extends Record<string, unknown>>(
  record: T,
  index: number,
  rowKey?: string | ((record: T, index: number) => string)
): string => {
  if (typeof rowKey === 'function') {
    return rowKey(record, index);
  }
  if (rowKey && record[rowKey] !== undefined) {
    return String(record[rowKey]);
  }
  return String(index);
};

const Table = forwardRef<HTMLDivElement, TableProps>(
  <T extends Record<string, unknown>>(
    {
      data = [],
      columns = [],
      bordered = false,
      striped = false,
      hover = true,
      compact = false,
      loading = false,
      emptyText = '無資料',
      rowKey,
      onRowClick,
      selectedRowKey,
      className = '',
      ...rest
    }: TableProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const wrapperClasses = [
      'x-table-wrapper',
      bordered && 'x-table-wrapper--bordered',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const tableClasses = [
      'x-table',
      striped && 'x-table--striped',
      hover && 'x-table--hover',
      compact && 'x-table--compact',
    ]
      .filter(Boolean)
      .join(' ');

    if (loading) {
      return (
        <div ref={ref} className={wrapperClasses} {...rest}>
          <table className={tableClasses}>
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th
                    key={col.key || index}
                    className={col.headerClassName}
                    style={{
                      textAlign: col.align || 'left',
                      width: col.width,
                    }}
                  >
                    {col.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colSpan={columns.length}
                  className="x-table-loading"
                  style={{ textAlign: 'center', padding: '2rem' }}
                >
                  <div className="x-table-loading-spinner" />
                  載入中...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    if (data.length === 0) {
      return (
        <div ref={ref} className={wrapperClasses} {...rest}>
          <table className={tableClasses}>
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th
                    key={col.key || index}
                    className={col.headerClassName}
                    style={{
                      textAlign: col.align || 'left',
                      width: col.width,
                    }}
                  >
                    {col.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colSpan={columns.length}
                  className="x-table-empty"
                  style={{
                    textAlign: 'center',
                    padding: '2rem',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  {emptyText}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <div ref={ref} className={wrapperClasses} {...rest}>
        <table className={tableClasses}>
          <thead>
            <tr>
              {columns.map((col, index) => {
                const thClasses = [
                  'x-table-th',
                  col.sortable && 'x-table-th--sortable',
                  col.headerClassName,
                ]
                  .filter(Boolean)
                  .join(' ');

                return (
                  <th
                    key={col.key || index}
                    className={thClasses}
                    style={{
                      textAlign: col.align || 'left',
                      width: col.width,
                    }}
                  >
                    {col.title}
                    {col.sortable && (
                      <svg
                        className="x-table-sort-icon"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M8 4L11 7H5L8 4Z"
                          fill="currentColor"
                          opacity="0.3"
                        />
                        <path
                          d="M8 12L5 9H11L8 12Z"
                          fill="currentColor"
                          opacity="0.3"
                        />
                      </svg>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((record, rowIndex) => {
              const key = getRowKey(record, rowIndex, rowKey);
              const isSelected = selectedRowKey === key;

              const rowClasses = [
                'x-table-row',
                isSelected && 'x-table-row--selected',
                onRowClick && 'x-table-row--clickable',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <tr
                  key={key}
                  className={rowClasses}
                  onClick={
                    onRowClick ? () => onRowClick(record, rowIndex) : undefined
                  }
                >
                  {columns.map((col, colIndex) => {
                    const value = record[col.key];
                    const cellContent = col.render
                      ? col.render(value, record, rowIndex)
                      : String(value ?? '');

                    return (
                      <td
                        key={col.key || colIndex}
                        className={col.cellClassName}
                        style={{
                          textAlign: col.align || 'left',
                        }}
                      >
                        {cellContent}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
) as <T extends Record<string, unknown>>(
  props: TableProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => React.ReactElement;

Table.displayName = 'Table';

export { Table };
