import type { ChartType } from '@/types';

// Describe qué propiedades del panel de estilo afectan a cada tipo de gráfico.
// Es la única fuente de verdad para decidir qué controles mostrar en StyleConfig.
export interface ChartCapabilities {
  // Etiqueta usada como título de la sección exclusiva del tipo de gráfico
  typeLabel: string;
  // Comunes (todos excepto tabla)
  hasPalette: boolean;
  hasLegend: boolean;
  hasTooltip: boolean;
  hasAnimation: boolean;
  // Ejes
  hasGrid: boolean;
  hasXAxis: boolean;
  hasYAxis: boolean;
  // Forma / específicas
  hasDataLabels: boolean;
  hasBorderRadius: boolean;
  hasLineWidth: boolean;
  hasDotSize: boolean;
  hasOpacity: boolean;
  hasBarThickness: boolean;
  // Tabla
  isTable: boolean;
}

const BASE: ChartCapabilities = {
  typeLabel: '',
  hasPalette: true,
  hasLegend: true,
  hasTooltip: true,
  hasAnimation: true,
  hasGrid: false,
  hasXAxis: false,
  hasYAxis: false,
  hasDataLabels: false,
  hasBorderRadius: false,
  hasLineWidth: false,
  hasDotSize: false,
  hasOpacity: false,
  hasBarThickness: false,
  isTable: false,
};

const BAR_CAPABILITIES: ChartCapabilities = {
  ...BASE,
  typeLabel: 'Barras',
  hasGrid: true,
  hasXAxis: true,
  hasYAxis: true,
  hasDataLabels: true,
  hasBorderRadius: true,
};

const CAPABILITIES: Record<ChartType, ChartCapabilities> = {
  bar: BAR_CAPABILITIES,
  'bar-horizontal': BAR_CAPABILITIES,
  'bar-stacked': BAR_CAPABILITIES,
  'bar-grouped': BAR_CAPABILITIES,
  line: {
    ...BASE,
    typeLabel: 'Líneas',
    hasGrid: true,
    hasXAxis: true,
    hasYAxis: true,
    hasDataLabels: true,
    hasLineWidth: true,
    hasDotSize: true,
  },
  area: {
    ...BASE,
    typeLabel: 'Área',
    hasGrid: true,
    hasXAxis: true,
    hasYAxis: true,
    hasLineWidth: true,
    hasOpacity: true,
  },
  pie: {
    ...BASE,
    typeLabel: 'Torta',
    hasDataLabels: true,
    hasOpacity: true,
  },
  doughnut: {
    ...BASE,
    typeLabel: 'Anillo',
    hasDataLabels: true,
    hasOpacity: true,
  },
  radar: {
    ...BASE,
    typeLabel: 'Radar',
    hasXAxis: true,
    hasYAxis: true,
    hasLineWidth: true,
    hasOpacity: true,
  },
  composed: {
    ...BASE,
    typeLabel: 'Mixto',
    hasGrid: true,
    hasXAxis: true,
    hasYAxis: true,
    hasBorderRadius: true,
    hasLineWidth: true,
    hasDotSize: true,
  },
  pyramid: {
    ...BASE,
    typeLabel: 'Pirámide poblacional',
    hasDataLabels: true,
    hasBorderRadius: true,
    hasBarThickness: true,
  },
  table: {
    ...BASE,
    typeLabel: 'Tabla',
    hasPalette: false,
    hasLegend: false,
    hasTooltip: false,
    hasAnimation: false,
    isTable: true,
  },
};

// Devuelve las capacidades (qué propiedades aplican) para un tipo de gráfico.
export function getChartCapabilities(type: ChartType): ChartCapabilities {
  return CAPABILITIES[type] ?? BASE;
}
