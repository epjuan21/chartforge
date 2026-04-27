'use client';

import { useState, useCallback } from 'react';
import type { TableData, TableColumn, TableColumnType, TableAlign } from '@/types';
import { DEFAULT_TABLE_DATA } from '@/utils/defaults';
import { newColumnId, parseTabular } from '@/utils/parseTabular';

export function useTableData() {
  const [tableData, setTableData] = useState<TableData>(DEFAULT_TABLE_DATA);

  const loadExample = useCallback(() => {
    setTableData(DEFAULT_TABLE_DATA);
  }, []);

  const replaceFromText = useCallback((text: string): boolean => {
    const parsed = parseTabular(text);
    if (!parsed) return false;
    setTableData((prev) => ({ ...parsed, showTotal: prev.showTotal, totalLabel: prev.totalLabel }));
    return true;
  }, []);

  const setCell = useCallback((rowIndex: number, colIndex: number, value: string | number) => {
    setTableData((prev) => {
      const rows = prev.rows.map((row, ri) => {
        if (ri !== rowIndex) return row;
        return row.map((cell, ci) => (ci === colIndex ? value : cell));
      });
      return { ...prev, rows };
    });
  }, []);

  const addRow = useCallback(() => {
    setTableData((prev) => {
      const newRow = prev.columns.map((c) => (c.type === 'number' ? 0 : ''));
      return { ...prev, rows: [...prev.rows, newRow] };
    });
  }, []);

  const removeRow = useCallback((rowIndex: number) => {
    setTableData((prev) => {
      if (prev.rows.length <= 1) return prev;
      return { ...prev, rows: prev.rows.filter((_, i) => i !== rowIndex) };
    });
  }, []);

  const addColumn = useCallback(() => {
    setTableData((prev) => {
      const newCol: TableColumn = {
        id: newColumnId(),
        label: `Columna ${prev.columns.length + 1}`,
        type: 'text',
        align: 'left',
      };
      const rows = prev.rows.map((row) => [...row, '']);
      return { ...prev, columns: [...prev.columns, newCol], rows };
    });
  }, []);

  const removeColumn = useCallback((colIndex: number) => {
    setTableData((prev) => {
      if (prev.columns.length <= 1) return prev;
      const columns = prev.columns.filter((_, i) => i !== colIndex);
      const rows = prev.rows.map((row) => row.filter((_, i) => i !== colIndex));
      return { ...prev, columns, rows };
    });
  }, []);

  const updateColumn = useCallback((colIndex: number, partial: Partial<TableColumn>) => {
    setTableData((prev) => {
      const columns = prev.columns.map((col, i) => (i === colIndex ? { ...col, ...partial } : col));
      // Si cambia el tipo, ajusta los valores existentes
      if (partial.type) {
        const rows = prev.rows.map((row) =>
          row.map((cell, ci) => {
            if (ci !== colIndex) return cell;
            if (partial.type === 'number') {
              const n = typeof cell === 'number' ? cell : Number(String(cell).replace(/,/g, '.'));
              return Number.isFinite(n) ? n : 0;
            }
            return String(cell);
          }),
        );
        return { ...prev, columns, rows };
      }
      return { ...prev, columns };
    });
  }, []);

  const setColumnType = useCallback(
    (colIndex: number, type: TableColumnType) => {
      updateColumn(colIndex, { type, align: type === 'number' ? 'right' : 'left' });
    },
    [updateColumn],
  );

  const setColumnAlign = useCallback(
    (colIndex: number, align: TableAlign) => {
      updateColumn(colIndex, { align });
    },
    [updateColumn],
  );

  const setColumnLabel = useCallback(
    (colIndex: number, label: string) => {
      updateColumn(colIndex, { label });
    },
    [updateColumn],
  );

  const setShowTotal = useCallback((value: boolean) => {
    setTableData((prev) => ({ ...prev, showTotal: value }));
  }, []);

  const setTotalLabel = useCallback((label: string) => {
    setTableData((prev) => ({ ...prev, totalLabel: label }));
  }, []);

  const clearAll = useCallback(() => {
    setTableData((prev) => ({
      ...prev,
      rows: [prev.columns.map((c) => (c.type === 'number' ? 0 : ''))],
    }));
  }, []);

  return {
    tableData,
    loadExample,
    replaceFromText,
    setCell,
    addRow,
    removeRow,
    addColumn,
    removeColumn,
    setColumnType,
    setColumnAlign,
    setColumnLabel,
    setShowTotal,
    setTotalLabel,
    clearAll,
  };
}
