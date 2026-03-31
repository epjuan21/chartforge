import type { ChartData, ChartConfig, ChartStyle } from '@/types';

export interface BaseChartProps {
  data: ChartData;
  config: ChartConfig;
  style: ChartStyle;
  colors: string[];
}

/** Convierte ChartData al formato que espera Recharts: array de objetos por categoría */
export function toRechartsData(data: ChartData): Record<string, string | number>[] {
  return data.categories.map((cat, ci) => {
    const point: Record<string, string | number> = { category: cat };
    data.series.forEach((serie, si) => {
      point[serie.name] = data.values[si]?.[ci] ?? 0;
    });
    return point;
  });
}

/** Genera el contentStyle del Tooltip de Recharts adaptado al estilo del gráfico */
export function tooltipStyle(style: ChartStyle): React.CSSProperties {
  const isLight = style.backgroundColor === '#ffffff' || isLightColor(style.backgroundColor);
  return {
    background: isLight ? '#ffffff' : '#1a1a2e',
    border: `1px solid ${isLight ? '#d0d0e0' : '#2d2d44'}`,
    borderRadius: 8,
    fontFamily: style.fontFamily,
    fontSize: style.labelFontSize,
    color: isLight ? '#18181f' : '#f0f0f5',
    boxShadow: isLight ? '0 4px 12px rgba(0,0,0,0.1)' : '0 4px 12px rgba(0,0,0,0.5)',
  };
}

/** Heurística simple: luma > 0.5 → color claro */
function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luma > 0.5;
}
