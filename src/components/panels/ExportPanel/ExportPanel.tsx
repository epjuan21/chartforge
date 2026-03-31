'use client';

import { useState } from 'react';
import { Download, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import type { ExportFormat, ExportOptions, PdfOrientation, PngScale } from '@/types';
import styles from './ExportPanel.module.css';

interface ExportPanelProps {
  isExporting: boolean;
  error: string | null;
  onExport: (options: ExportOptions) => void;
}

const FORMAT_OPTIONS: { id: ExportFormat; label: string; desc: string }[] = [
  { id: 'png', label: 'PNG', desc: 'Imagen rasterizada' },
  { id: 'svg', label: 'SVG', desc: 'Vectorial, escalable' },
  { id: 'pdf', label: 'PDF', desc: 'Documento formal' },
];

const SCALE_OPTIONS: { value: PngScale; label: string }[] = [
  { value: 1, label: '1×' },
  { value: 2, label: '2×' },
  { value: 3, label: '3×' },
];

export default function ExportPanel({ isExporting, error, onExport }: ExportPanelProps) {
  const [format, setFormat] = useState<ExportFormat>('png');
  const [filename, setFilename] = useState('mi-grafico');
  const [scale, setScale] = useState<PngScale>(2);
  const [transparent, setTransparent] = useState(false);
  const [pdfOrientation, setPdfOrientation] = useState<PdfOrientation>('landscape');
  const [includeTitle, setIncludeTitle] = useState(true);
  const [success, setSuccess] = useState(false);

  async function handleExport() {
    setSuccess(false);
    onExport({ format, filename: filename.trim() || 'grafico', scale, transparent, pdfOrientation, includeTitle });
    // Mostrar éxito tras un breve delay (el estado isExporting lo controla el padre)
    setTimeout(() => setSuccess(true), 200);
    setTimeout(() => setSuccess(false), 2500);
  }

  return (
    <div className={styles.panel}>
      {/* Nombre del archivo */}
      <div className={styles.field}>
        <label className={styles.label}>Nombre del archivo</label>
        <input
          className={styles.input}
          type="text"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          placeholder="mi-grafico"
          maxLength={80}
        />
      </div>

      {/* Selector de formato */}
      <div className={styles.field}>
        <label className={styles.label}>Formato</label>
        <div className={styles.formatGrid}>
          {FORMAT_OPTIONS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={[styles.formatBtn, format === f.id ? styles.formatBtnActive : ''].join(' ')}
              onClick={() => setFormat(f.id)}
            >
              <span className={styles.formatLabel}>{f.label}</span>
              <span className={styles.formatDesc}>{f.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Opciones PNG */}
      {format === 'png' && (
        <div className={styles.optionGroup}>
          <p className={styles.groupTitle}>Opciones PNG</p>

          <div className={styles.field}>
            <label className={styles.label}>Resolución</label>
            <div className={styles.segmented}>
              {SCALE_OPTIONS.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  className={[styles.segBtn, scale === s.value ? styles.segBtnActive : ''].join(' ')}
                  onClick={() => setScale(s.value)}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <p className={styles.hint}>
              {scale === 1 && 'Tamaño original — ideal para web'}
              {scale === 2 && 'Doble resolución — ideal para presentaciones'}
              {scale === 3 && 'Triple resolución — ideal para impresión'}
            </p>
          </div>

          <div className={styles.toggleRow}>
            <label className={styles.toggleLabel}>Fondo transparente</label>
            <button
              type="button"
              role="switch"
              aria-checked={transparent}
              className={[styles.toggle, transparent ? styles.toggleOn : ''].join(' ')}
              onClick={() => setTransparent((v) => !v)}
            >
              <span className={styles.toggleThumb} />
            </button>
          </div>
        </div>
      )}

      {/* Opciones SVG — sin opciones adicionales por ahora */}
      {format === 'svg' && (
        <div className={styles.optionGroup}>
          <p className={styles.groupTitle}>Opciones SVG</p>
          <p className={styles.hint}>El SVG es vectorial y escala a cualquier tamaño sin pérdida de calidad. Editable en Figma, Illustrator e Inkscape.</p>
        </div>
      )}

      {/* Opciones PDF */}
      {format === 'pdf' && (
        <div className={styles.optionGroup}>
          <p className={styles.groupTitle}>Opciones PDF</p>

          <div className={styles.field}>
            <label className={styles.label}>Orientación</label>
            <div className={styles.segmented}>
              <button
                type="button"
                className={[styles.segBtn, pdfOrientation === 'landscape' ? styles.segBtnActive : ''].join(' ')}
                onClick={() => setPdfOrientation('landscape')}
              >
                Horizontal
              </button>
              <button
                type="button"
                className={[styles.segBtn, pdfOrientation === 'portrait' ? styles.segBtnActive : ''].join(' ')}
                onClick={() => setPdfOrientation('portrait')}
              >
                Vertical
              </button>
            </div>
          </div>

          <div className={styles.toggleRow}>
            <label className={styles.toggleLabel}>Incluir título del gráfico</label>
            <button
              type="button"
              role="switch"
              aria-checked={includeTitle}
              className={[styles.toggle, includeTitle ? styles.toggleOn : ''].join(' ')}
              onClick={() => setIncludeTitle((v) => !v)}
            >
              <span className={styles.toggleThumb} />
            </button>
          </div>
        </div>
      )}

      {/* Mensajes de estado */}
      {error && (
        <div className={styles.errorMsg}>
          <AlertCircle size={13} />
          <span>{error}</span>
        </div>
      )}
      {success && !isExporting && !error && (
        <div className={styles.successMsg}>
          <CheckCircle size={13} />
          <span>Gráfico descargado correctamente</span>
        </div>
      )}

      {/* Botón de descarga */}
      <button
        type="button"
        className={styles.downloadBtn}
        onClick={handleExport}
        disabled={isExporting}
      >
        {isExporting ? (
          <>
            <Loader2 size={15} className={styles.spinner} />
            <span>Generando...</span>
          </>
        ) : (
          <>
            <Download size={15} />
            <span>Descargar {format.toUpperCase()}</span>
          </>
        )}
      </button>
    </div>
  );
}
