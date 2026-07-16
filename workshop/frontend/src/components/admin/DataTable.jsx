import { ChevronUp, ChevronDown, Search, Filter, MoreHorizontal, Check, Trash2, Edit, Eye } from 'lucide-react';
import { useState, useMemo } from 'react';

export default function DataTable({
  columns = [],
  data = [],
  keyField = 'id',
  sortable = true,
  filterable = true,
  actions = [],
  onRowClick,
  emptyMessage = 'Tidak ada data',
  loading = false,
  pagination = true,
  pageSize = 10,
  onPageChange,
  onSort,
  className = '',
}) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState(new Set());

  const processedData = useMemo(() => {
    let result = [...data];

    if (filterable && filterText) {
      const searchColumns = columns.filter(c => c.filterable !== false).map(c => c.key);
      result = result.filter(row =>
        searchColumns.some(key => {
          const value = row[key];
          return value != null && String(value).toLowerCase().includes(filterText.toLowerCase());
        })
      );
    }

    if (sortable && sortConfig.key) {
      result.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        if (aVal == null) return 1;
        if (bVal == null) return -1;
        const comparison = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      });
    }

    return result;
  }, [data, filterText, sortConfig, columns, filterable, sortable]);

  const paginatedData = useMemo(() => {
    if (!pagination) return processedData;
    const start = (currentPage - 1) * pageSize;
    return processedData.slice(start, start + pageSize);
  }, [processedData, pagination, currentPage, pageSize]);

  const totalPages = Math.ceil(processedData.length / pageSize);

  const handleSort = (key) => {
    if (!sortable) return;
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
    onSort?.(key, sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc');
  };

  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map(row => row[keyField])));
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (loading) {
    return (
      <div className="data-table-container" style={{ ...styles.container, ...styles.loadingContainer }}>
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <span>Memuat data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`data-table-container ${className}`} style={styles.container}>
      {filterable && (
        <div style={styles.toolbar}>
          <div style={styles.searchWrapper}>
            <Search size={18} strokeWidth={2} style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Cari..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              style={styles.searchInput}
            />
          </div>
        </div>
      )}

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              {actions.length > 0 && (
                <th style={styles.headerCell}>
                  <input
                    type="checkbox"
                    checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                    indeterminate={selectedRows.size > 0 && selectedRows.size < paginatedData.length}
                    onChange={handleSelectAll}
                    style={styles.checkbox}
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{
                    ...styles.headerCell,
                    cursor: column.sortable !== false && sortable ? 'pointer' : 'default',
                    userSelect: 'none',
                  }}
                  onClick={() => column.sortable !== false && sortable && handleSort(column.key)}
                >
                  <div style={styles.headerContent}>
                    <span>{column.label}</span>
                    {column.sortable !== false && sortable && sortConfig.key === column.key && (
                      <span style={styles.sortIcon}>
                        {sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions.length > 0 ? 1 : 0)} style={styles.emptyCell}>
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => (
                <tr
                  key={row[keyField]}
                  style={styles.row}
                  onClick={() => onRowClick?.(row)}
                >
                  {actions.length > 0 && (
                    <td style={styles.cell}>
                      <input
                        type="checkbox"
                        checked={selectedRows.has(row[keyField])}
                        onChange={(e) => { e.stopPropagation(); handleSelectRow(row[keyField]); }}
                        style={styles.checkbox}
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.key} style={styles.cell}>
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                  {actions.length > 0 && (
                    <td style={styles.cell}>
                      <div style={styles.actionMenu}>
                        <button
                          className="action-trigger"
                          onClick={(e) => { e.stopPropagation(); }}
                          style={styles.actionButton}
                        >
                          <MoreHorizontal size={18} strokeWidth={2} />
                        </button>
                        <div style={styles.actionDropdown}>
                          {actions.map((action) => (
                            <button
                              key={action.label}
                              onClick={(e) => { e.stopPropagation(); action.onClick(row); }}
                              style={{
                                ...styles.actionItem,
                                color: action.variant === 'danger' ? 'var(--color-error)' : 'var(--color-text)',
                              }}
                            >
                              {action.icon && <action.icon size={16} strokeWidth={2} style={{ marginRight: 'var(--spacing-sm)' }} />}
                              {action.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <div style={styles.pagination}>
          <div style={styles.paginationInfo}>
            Menampilkan {Math.min((currentPage - 1) * pageSize + 1, processedData.length)} - {Math.min(currentPage * pageSize, processedData.length)} dari {processedData.length} data
          </div>
          <div style={styles.paginationControls}>
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{ ...styles.pageButton, opacity: currentPage === 1 ? 0.5 : 1 }}
            >
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) pageNum = i + 1;
              else if (currentPage <= 3) pageNum = i + 1;
              else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
              else pageNum = currentPage - 2 + i;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  style={{
                    ...styles.pageButton,
                    backgroundColor: currentPage === pageNum ? 'var(--color-secondary)' : 'transparent',
                    color: currentPage === pageNum ? 'white' : 'var(--color-text)',
                  }}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              style={{ ...styles.pageButton, opacity: currentPage === totalPages ? 0.5 : 1 }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--border-radius-xl)',
    overflow: 'hidden',
  },
  loadingContainer: {
    minHeight: 300,
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--spacing-3xl)',
    gap: 'var(--spacing-md)',
    color: 'var(--color-text-muted)',
  },
  spinner: {
    width: 32,
    height: 32,
    border: '3px solid var(--color-border)',
    borderTopColor: 'var(--color-secondary)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  toolbar: {
    padding: 'var(--spacing-md) var(--spacing-lg)',
    borderBottom: '1px solid var(--color-border)',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  searchWrapper: {
    position: 'relative',
    width: 300,
  },
  searchIcon: {
    position: 'absolute',
    left: 'var(--spacing-md)',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--color-text-light)',
    pointerEvents: 'none',
  },
  searchInput: {
    width: '100%',
    padding: 'var(--spacing-sm) var(--spacing-md) var(--spacing-sm) 40px',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--border-radius-lg)',
    backgroundColor: 'var(--color-background)',
    color: 'var(--color-text)',
    fontSize: 'var(--font-size-sm)',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: 'var(--font-size-sm)',
  },
  headerRow: {
    backgroundColor: 'var(--color-background)',
  },
  headerCell: {
    padding: 'var(--spacing-md) var(--spacing-lg)',
    textAlign: 'left',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--color-text)',
    borderBottom: '1px solid var(--color-border)',
    whiteSpace: 'nowrap',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
  },
  sortIcon: {
    display: 'flex',
    color: 'var(--color-secondary)',
  },
  row: {
    borderBottom: '1px solid var(--color-border-light)',
    transition: 'background-color var(--transition-fast)',
  },
  cell: {
    padding: 'var(--spacing-md) var(--spacing-lg)',
    color: 'var(--color-text)',
    verticalAlign: 'middle',
  },
  emptyCell: {
    padding: 'var(--spacing-3xl)',
    textAlign: 'center',
    color: 'var(--color-text-muted)',
  },
  actionMenu: {
    position: 'relative',
  },
  actionButton: {
    padding: 'var(--spacing-xs)',
    borderRadius: 'var(--border-radius-md)',
    color: 'var(--color-text-muted)',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  actionDropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: 'var(--spacing-xs)',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--border-radius-lg)',
    boxShadow: 'var(--shadow-lg)',
    minWidth: 160,
    zIndex: 'var(--z-dropdown)',
    overflow: 'hidden',
  },
  actionItem: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: 'var(--font-size-sm)',
    transition: 'background-color var(--transition-fast)',
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'var(--spacing-md) var(--spacing-lg)',
    borderTop: '1px solid var(--color-border)',
    flexWrap: 'wrap',
    gap: 'var(--spacing-md)',
  },
  paginationInfo: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-muted)',
  },
  paginationControls: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-xs)',
  },
  pageButton: {
    padding: 'var(--spacing-xs) var(--spacing-sm)',
    borderRadius: 'var(--border-radius-md)',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-background)',
    color: 'var(--color-text)',
    cursor: 'pointer',
    fontSize: 'var(--font-size-sm)',
    transition: 'all var(--transition-fast)',
  },
  checkbox: {
    width: 18,
    height: 18,
    accentColor: 'var(--color-secondary)',
    cursor: 'pointer',
  },
};