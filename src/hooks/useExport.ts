'use client';

import { useCallback, useState } from 'react';
import type { RefObject } from 'react';
import type { ExportOptions } from '@/types';
import { exportToPng, exportToSvg, exportToPdf } from '@/utils/export';

interface UseExportReturn {
  isExporting: boolean;
  error: string | null;
  runExport: (options: ExportOptions, title: string) => Promise<void>;
}

export function useExport(chartRef: RefObject<HTMLDivElement | null>): UseExportReturn {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runExport = useCallback(
    async (options: ExportOptions, title: string) => {
      const element = chartRef.current;
      if (!element) {
        setError('No se encontró el elemento del gráfico.');
        return;
      }

      setIsExporting(true);
      setError(null);

      try {
        switch (options.format) {
          case 'png':
            await exportToPng(element, options);
            break;
          case 'svg':
            await exportToSvg(element, options.filename);
            break;
          case 'pdf':
            await exportToPdf(element, options, title);
            break;
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al exportar el gráfico.');
      } finally {
        setIsExporting(false);
      }
    },
    [chartRef],
  );

  return { isExporting, error, runExport };
}
