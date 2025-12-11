import React from 'react';

export interface Column<T> {
  /**
   * Column header text
   */
  header: string;
  /**
   * Accessor function to get cell value from row data
   */
  accessor: (row: T) => React.ReactNode;
  /**
   * Column width (CSS value)
   */
  width?: string;
}

export interface TableProps<T> {
  /**
   * Column definitions
   */
  columns: Column<T>[];
  /**
   * Data rows
   */
  data: T[];
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Empty state message
   */
  emptyMessage?: string;
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
}

/**
 * Table component for displaying tabular data
 */
export function Table<T>({
  columns,
  data,
  loading = false,
  emptyMessage = 'No data available',
  'aria-label': ariaLabel,
}: TableProps<T>) {
  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#ffffff',
  };

  const thStyle: React.CSSProperties = {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #dee2e6',
    backgroundColor: '#f8f9fa',
    fontWeight: 600,
    fontSize: '14px',
    color: '#495057',
  };

  const tdStyle: React.CSSProperties = {
    padding: '12px',
    borderBottom: '1px solid #dee2e6',
    fontSize: '14px',
    color: '#212529',
  };

  const loadingStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '40px',
    color: '#6c757d',
    fontSize: '16px',
  };

  const emptyStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '40px',
    color: '#6c757d',
    fontSize: '16px',
  };

  if (loading) {
    return (
      <div style={loadingStyle} role="status" aria-live="polite">
        Loading...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div style={emptyStyle} role="status">
        {emptyMessage}
      </div>
    );
  }

  return (
    <table style={tableStyle} aria-label={ariaLabel}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th
              key={index}
              style={{
                ...thStyle,
                width: column.width,
              }}
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex} style={tdStyle}>
                {column.accessor(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
