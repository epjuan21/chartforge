'use client';

import { Plus, Trash2, RefreshCw } from 'lucide-react';
import type { ChartData, ChartType, DataSeries } from '@/types';
import Button from '@/components/ui/Button';
import ColorPicker from '@/components/ui/ColorPicker';
import { COLOR_PALETTES } from '@/constants';
import { useDebounce } from '@/hooks/useDebounce';
import styles from './DataInput.module.css';

interface DataInputProps {
  data: ChartData;
  chartType: ChartType;
  onSetCategory: (index: number, value: string) => void;
  onAddCategory: () => void;
  onRemoveCategory: (index: number) => void;
  onSetSeries: (index: number, partial: Partial<DataSeries>) => void;
  onAddSeries: () => void;
  onRemoveSeries: (index: number) => void;
  onSetValue: (serieIndex: number, categoryIndex: number, value: number) => void;
  onLoadExample: (type: ChartType) => void;
}

const isPieType = (t: ChartType) => t === 'pie' || t === 'doughnut';
const presetColors = COLOR_PALETTES[0].colors;

export default function DataInput({
  data,
  chartType,
  onSetCategory,
  onAddCategory,
  onRemoveCategory,
  onSetSeries,
  onAddSeries,
  onRemoveSeries,
  onSetValue,
  onLoadExample,
}: DataInputProps) {
  const singleSeries = isPieType(chartType);
  const debouncedSetValue = useDebounce(onSetValue, 80);

  return (
    <div className={styles.panel}>
      {/* Categorías */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTitle}>
            {singleSeries ? 'Segmentos' : 'Categorías (eje X)'}
          </span>
          <Button size="sm" variant="ghost" icon={<Plus size={13} />} onClick={onAddCategory}>
            Agregar
          </Button>
        </div>
        <div className={styles.chips}>
          {data.categories.map((cat, ci) => (
            <div key={ci} className={styles.chip}>
              <input
                className={styles.chipInput}
                value={cat}
                onChange={(e) => onSetCategory(ci, e.target.value)}
                aria-label={`Categoría ${ci + 1}`}
              />
              {data.categories.length > 1 && (
                <button
                  type="button"
                  className={styles.chipRemove}
                  onClick={() => onRemoveCategory(ci)}
                  aria-label="Eliminar categoría"
                >
                  <Trash2 size={11} />
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Series */}
      {!singleSeries && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Series</span>
            <Button size="sm" variant="ghost" icon={<Plus size={13} />} onClick={onAddSeries}>
              Agregar
            </Button>
          </div>
          <div className={styles.seriesList}>
            {data.series.map((serie, si) => (
              <div key={serie.id} className={styles.seriesRow}>
                <ColorPicker
                  color={serie.color}
                  onChange={(c) => onSetSeries(si, { color: c })}
                  presets={presetColors}
                />
                <input
                  className={styles.seriesNameInput}
                  value={serie.name}
                  onChange={(e) => onSetSeries(si, { name: e.target.value })}
                  placeholder="Nombre serie"
                  aria-label={`Nombre serie ${si + 1}`}
                />
                {data.series.length > 1 && (
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => onRemoveSeries(si)}
                    aria-label="Eliminar serie"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tabla de valores */}
      <section className={styles.section}>
        <span className={styles.sectionTitle}>Valores</span>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}></th>
                {singleSeries
                  ? data.categories.map((cat, ci) => (
                      <th key={ci} className={styles.th}>
                        {cat}
                      </th>
                    ))
                  : data.series.map((serie) => (
                      <th key={serie.id} className={styles.th}>
                        {serie.name}
                      </th>
                    ))}
              </tr>
            </thead>
            <tbody>
              {singleSeries ? (
                <tr>
                  <td className={styles.tdLabel}>Valor</td>
                  {data.categories.map((_, ci) => (
                    <td key={ci} className={styles.td}>
                      <input
                        type="number"
                        className={styles.valueInput}
                        value={data.values[0]?.[ci] ?? 0}
                        onChange={(e) => debouncedSetValue(0, ci, Number(e.target.value))}
                      />
                    </td>
                  ))}
                </tr>
              ) : (
                data.categories.map((cat, ci) => (
                  <tr key={ci}>
                    <td className={styles.tdLabel}>{cat}</td>
                    {data.series.map((_, si) => (
                      <td key={si} className={styles.td}>
                        <input
                          type="number"
                          className={styles.valueInput}
                          value={data.values[si]?.[ci] ?? 0}
                          onChange={(e) => debouncedSetValue(si, ci, Number(e.target.value))}
                        />
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Cargar ejemplo */}
      <Button
        variant="secondary"
        fullWidth
        icon={<RefreshCw size={14} />}
        onClick={() => onLoadExample(chartType)}
      >
        Cargar datos de ejemplo
      </Button>
    </div>
  );
}
