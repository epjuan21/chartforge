'use client';

import { useRef, useState } from 'react';
import {
  Plus,
  Trash2,
  ClipboardPaste,
  RefreshCw,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  Hash,
} from 'lucide-react';
import type { TableAlign, TableColumnType, TableData } from '@/types';
import Button from '@/components/ui/Button';
import Toggle from '@/components/ui/Toggle';
import Input from '@/components/ui/Input';
import { useDebounce } from '@/hooks/useDebounce';
import styles from './TableDataInput.module.css';

interface TableDataInputProps {
  tableData: TableData;
  onReplaceFromText: (text: string) => boolean;
  onSetCell: (rowIndex: number, colIndex: number, value: string | number) => void;
  onAddRow: () => void;
  onRemoveRow: (rowIndex: number) => void;
  onAddColumn: () => void;
  onRemoveColumn: (colIndex: number) => void;
  onSetColumnLabel: (colIndex: number, label: string) => void;
  onSetColumnType: (colIndex: number, type: TableColumnType) => void;
  onSetColumnAlign: (colIndex: number, align: TableAlign) => void;
  onSetShowTotal: (value: boolean) => void;
  onSetTotalLabel: (label: string) => void;
  onLoadExample: () => void;
  onClearAll: () => void;
}

const ALIGN_OPTIONS: { value: TableAlign; icon: React.ReactNode }[] = [
  { value: 'left', icon: <AlignLeft size={12} /> },
  { value: 'center', icon: <AlignCenter size={12} /> },
  { value: 'right', icon: <AlignRight size={12} /> },
];

export default function TableDataInput({
  tableData,
  onReplaceFromText,
  onSetCell,
  onAddRow,
  onRemoveRow,
  onAddColumn,
  onRemoveColumn,
  onSetColumnLabel,
  onSetColumnType,
  onSetColumnAlign,
  onSetShowTotal,
  onSetTotalLabel,
  onLoadExample,
  onClearAll,
}: TableDataInputProps) {
  const [pasteText, setPasteText] = useState('');
  const [pasteError, setPasteError] = useState<string | null>(null);
  const [showPasteArea, setShowPasteArea] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const debouncedSetCell = useDebounce(onSetCell, 80);

  async function handlePasteFromClipboard() {
    setPasteError(null);
    try {
      const text = await navigator.clipboard.readText();
      if (!text || !text.trim()) {
        setPasteError('El portapapeles está vacío.');
        return;
      }
      const ok = onReplaceFromText(text);
      if (!ok) setPasteError('No se pudo interpretar el contenido del portapapeles.');
      else setShowPasteArea(false);
    } catch {
      // Si el navegador bloquea el clipboard, abre el textarea manual
      setPasteError(
        'No se pudo leer el portapapeles automáticamente. Pega el contenido en el campo de abajo.',
      );
      setShowPasteArea(true);
    }
  }

  function handleApplyPasteText() {
    setPasteError(null);
    if (!pasteText.trim()) {
      setPasteError('No hay contenido para aplicar.');
      return;
    }
    const ok = onReplaceFromText(pasteText);
    if (!ok) setPasteError('No se pudo interpretar el contenido.');
    else {
      setPasteText('');
      setShowPasteArea(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || '');
      const ok = onReplaceFromText(text);
      if (!ok) setPasteError('No se pudo interpretar el archivo.');
      else setPasteError(null);
    };
    reader.readAsText(file);
    e.target.value = ''; // Permite re-cargar el mismo archivo
  }

  return (
    <div className={styles.panel}>
      {/* Importar desde portapapeles */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTitle}>Importar datos</span>
        </div>
        <div className={styles.importRow}>
          <Button
            variant="primary"
            size="sm"
            icon={<ClipboardPaste size={13} />}
            onClick={handlePasteFromClipboard}
          >
            Pegar del portapapeles
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            Cargar CSV/TSV
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.tsv,.txt"
            onChange={handleFileChange}
            className={styles.fileInput}
          />
        </div>
        {showPasteArea && (
          <div className={styles.pasteArea}>
            <textarea
              className={styles.pasteTextarea}
              placeholder="Pega aquí los datos (CSV, TSV o copiados de Excel)..."
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              rows={6}
            />
            <Button size="sm" onClick={handleApplyPasteText}>
              Aplicar
            </Button>
          </div>
        )}
        {!showPasteArea && (
          <button
            type="button"
            className={styles.linkBtn}
            onClick={() => setShowPasteArea(true)}
          >
            o pegar manualmente en un campo de texto
          </button>
        )}
        {pasteError && <p className={styles.error}>{pasteError}</p>}
        <p className={styles.hint}>
          Detecta automáticamente separador (TAB, coma, punto y coma) y la fila de encabezado.
        </p>
      </section>

      {/* Configuración de columnas */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTitle}>Columnas</span>
          <Button size="sm" variant="ghost" icon={<Plus size={13} />} onClick={onAddColumn}>
            Agregar
          </Button>
        </div>
        <div className={styles.columnsList}>
          {tableData.columns.map((col, ci) => (
            <div key={col.id} className={styles.columnRow}>
              <input
                className={styles.columnNameInput}
                value={col.label}
                onChange={(e) => onSetColumnLabel(ci, e.target.value)}
                placeholder="Nombre columna"
              />
              <div className={styles.columnControls}>
                {/* Tipo */}
                <button
                  type="button"
                  className={[styles.iconBtn, col.type === 'text' ? styles.iconBtnActive : ''].join(
                    ' ',
                  )}
                  onClick={() => onSetColumnType(ci, 'text')}
                  title="Texto"
                >
                  <Type size={12} />
                </button>
                <button
                  type="button"
                  className={[
                    styles.iconBtn,
                    col.type === 'number' ? styles.iconBtnActive : '',
                  ].join(' ')}
                  onClick={() => onSetColumnType(ci, 'number')}
                  title="Número"
                >
                  <Hash size={12} />
                </button>
                <span className={styles.divider} />
                {/* Alineación */}
                {ALIGN_OPTIONS.map((a) => (
                  <button
                    key={a.value}
                    type="button"
                    className={[
                      styles.iconBtn,
                      col.align === a.value ? styles.iconBtnActive : '',
                    ].join(' ')}
                    onClick={() => onSetColumnAlign(ci, a.value)}
                    title={`Alinear a la ${a.value}`}
                  >
                    {a.icon}
                  </button>
                ))}
                {tableData.columns.length > 1 && (
                  <>
                    <span className={styles.divider} />
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => onRemoveColumn(ci)}
                      title="Eliminar columna"
                    >
                      <Trash2 size={12} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tabla de datos */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTitle}>Filas ({tableData.rows.length})</span>
          <Button size="sm" variant="ghost" icon={<Plus size={13} />} onClick={onAddRow}>
            Agregar fila
          </Button>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thIndex}>#</th>
                {tableData.columns.map((col) => (
                  <th key={col.id} className={styles.th}>
                    {col.label}
                  </th>
                ))}
                <th className={styles.thIndex}></th>
              </tr>
            </thead>
            <tbody>
              {tableData.rows.map((row, ri) => (
                <tr key={ri}>
                  <td className={styles.tdIndex}>{ri + 1}</td>
                  {tableData.columns.map((col, ci) => (
                    <td key={col.id} className={styles.td}>
                      <input
                        type={col.type === 'number' ? 'number' : 'text'}
                        className={[
                          styles.cellInput,
                          col.type === 'number' ? styles.cellInputNumber : '',
                        ].join(' ')}
                        value={row[ci] ?? (col.type === 'number' ? 0 : '')}
                        onChange={(e) => {
                          const v =
                            col.type === 'number'
                              ? Number(e.target.value)
                              : e.target.value;
                          debouncedSetCell(ri, ci, v as string | number);
                        }}
                        style={{ textAlign: col.align }}
                      />
                    </td>
                  ))}
                  <td className={styles.tdIndex}>
                    {tableData.rows.length > 1 && (
                      <button
                        type="button"
                        className={styles.rowRemove}
                        onClick={() => onRemoveRow(ri)}
                        title="Eliminar fila"
                      >
                        <Trash2 size={11} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Fila Total */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTitle}>Fila Total</span>
        </div>
        <Toggle
          label="Mostrar fila de totales"
          checked={tableData.showTotal}
          onChange={onSetShowTotal}
        />
        {tableData.showTotal && (
          <Input
            label="Etiqueta"
            value={tableData.totalLabel}
            onChange={onSetTotalLabel}
            placeholder="Total"
          />
        )}
      </section>

      {/* Acciones rápidas */}
      <div className={styles.actionsRow}>
        <Button
          variant="ghost"
          size="sm"
          icon={<RefreshCw size={13} />}
          onClick={onLoadExample}
        >
          Cargar ejemplo
        </Button>
        <Button variant="ghost" size="sm" icon={<Trash2 size={13} />} onClick={onClearAll}>
          Vaciar
        </Button>
      </div>
    </div>
  );
}
