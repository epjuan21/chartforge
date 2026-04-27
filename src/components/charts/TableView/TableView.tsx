'use client';

import { memo, useMemo } from 'react';
import type { ChartStyle, TableData } from '@/types';
import styles from './TableView.module.css';

interface TableViewProps {
  tableData: TableData;
  style: ChartStyle;
}

function formatNumber(value: number): string {
  if (Number.isInteger(value)) return value.toLocaleString('es-CO');
  return value.toLocaleString('es-CO', { maximumFractionDigits: 4 });
}

function TableView({ tableData, style }: TableViewProps) {
  const { columns, rows, showTotal, totalLabel } = tableData;

  // Calcula totales por columna numérica
  const totals = useMemo(() => {
    if (!showTotal) return null;
    return columns.map((col) => {
      if (col.type !== 'number') return null;
      let sum = 0;
      for (const row of rows) {
        const v = row[columns.indexOf(col)];
        if (typeof v === 'number' && Number.isFinite(v)) sum += v;
      }
      return sum;
    });
  }, [columns, rows, showTotal]);

  const labelColIndex = useMemo(() => {
    // El label "Total" se ubica en la primera columna no numérica; si todas son numéricas, en la primera.
    const idx = columns.findIndex((c) => c.type !== 'number');
    return idx === -1 ? 0 : idx;
  }, [columns]);

  const tableStyle: React.CSSProperties = {
    fontFamily: style.fontFamily,
    fontSize: style.labelFontSize,
    color: style.tableRowColor,
    width: '100%',
    borderCollapse: style.tableShowBorders ? 'collapse' : 'separate',
    borderSpacing: 0,
  };

  const headerStyle: React.CSSProperties = {
    background: style.tableHeaderBg,
    color: style.tableHeaderColor,
    fontSize: style.labelFontSize,
    fontWeight: 600,
    padding: `${style.tableCellPadding}px ${style.tableCellPadding + 4}px`,
    borderBottom: `2px solid ${style.tableBorderColor}`,
    borderRight: style.tableShowBorders ? `1px solid ${style.tableBorderColor}` : 'none',
  };

  const cellPadding = `${style.tableCellPadding}px ${style.tableCellPadding + 4}px`;

  const totalRowStyle: React.CSSProperties = {
    background: style.tableTotalBg,
    color: style.tableTotalColor,
    fontWeight: 700,
    borderTop: `2px solid ${style.tableBorderColor}`,
  };

  return (
    <div className={styles.wrapper} style={{ width: '100%' }}>
      <table style={tableStyle} className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.id}
                style={{
                  ...headerStyle,
                  textAlign: col.align,
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => {
            const bg =
              style.tableShowZebra && ri % 2 === 1 ? style.tableRowAltBg : style.tableRowBg;
            return (
              <tr key={ri}>
                {columns.map((col, ci) => {
                  const value = row[ci];
                  const display =
                    typeof value === 'number'
                      ? formatNumber(value)
                      : value === undefined || value === null
                        ? ''
                        : String(value);
                  return (
                    <td
                      key={col.id}
                      style={{
                        background: bg,
                        color: style.tableRowColor,
                        padding: cellPadding,
                        textAlign: col.align,
                        borderBottom: style.tableShowBorders
                          ? `1px solid ${style.tableBorderColor}`
                          : 'none',
                        borderRight: style.tableShowBorders
                          ? `1px solid ${style.tableBorderColor}`
                          : 'none',
                        fontVariantNumeric: col.type === 'number' ? 'tabular-nums' : 'normal',
                      }}
                    >
                      {display}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          {showTotal && totals && (
            <tr>
              {columns.map((col, ci) => {
                let content: React.ReactNode = '';
                if (ci === labelColIndex) content = totalLabel;
                else if (col.type === 'number' && totals[ci] !== null)
                  content = formatNumber(totals[ci] as number);
                return (
                  <td
                    key={col.id}
                    style={{
                      ...totalRowStyle,
                      padding: cellPadding,
                      textAlign: col.align,
                      borderRight: style.tableShowBorders
                        ? `1px solid ${style.tableBorderColor}`
                        : 'none',
                      fontVariantNumeric: col.type === 'number' ? 'tabular-nums' : 'normal',
                    }}
                  >
                    {content}
                  </td>
                );
              })}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default memo(TableView);
