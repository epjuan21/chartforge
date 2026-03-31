import type { ChartData } from '@/types';

// Valida que haya al menos una categoría
export function validateCategories(categories: string[]): string | null {
  if (categories.length === 0) return 'Debe haber al menos una categoría.';
  if (categories.some((c) => c.trim() === '')) return 'Las categorías no pueden estar vacías.';
  return null;
}

// Valida que haya al menos una serie
export function validateSeries(series: ChartData['series']): string | null {
  if (series.length === 0) return 'Debe haber al menos una serie de datos.';
  if (series.some((s) => s.name.trim() === '')) return 'Los nombres de serie no pueden estar vacíos.';
  return null;
}

// Valida que los valores sean números finitos
export function validateValues(values: number[][]): string | null {
  for (const row of values) {
    for (const val of row) {
      if (!isFinite(val)) return 'Todos los valores deben ser números válidos.';
    }
  }
  return null;
}

// Valida el título del gráfico
export function validateTitle(title: string): string | null {
  if (title.length > 100) return 'El título no puede superar los 100 caracteres.';
  return null;
}

// Valida las dimensiones del gráfico
export function validateDimensions(width: number, height: number): string | null {
  if (width < 300 || width > 2000) return 'El ancho debe estar entre 300 y 2000 px.';
  if (height < 200 || height > 1500) return 'El alto debe estar entre 200 y 1500 px.';
  return null;
}

// Valida el nombre del archivo de exportación
export function validateFilename(filename: string): string | null {
  if (filename.trim() === '') return 'El nombre del archivo no puede estar vacío.';
  if (!/^[\w\-. ]+$/.test(filename)) return 'El nombre contiene caracteres no permitidos.';
  return null;
}

// Valida todo el ChartData de una vez
export function validateChartData(data: ChartData): string | null {
  return (
    validateCategories(data.categories) ??
    validateSeries(data.series) ??
    validateValues(data.values)
  );
}
