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
  hasProgressStyle: boolean;
  // Formato de valores numéricos
  hasValueFormat: boolean;
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
  hasProgressStyle: false,
  hasValueFormat: false,
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
  hasValueFormat: true,
};

const CAPABILITIES: Record<ChartType, ChartCapabilities> = {
  bar: BAR_CAPABILITIES,
  'bar-horizontal': BAR_CAPABILITIES,
  'bar-stacked': BAR_CAPABILITIES,
  'bar-grouped': BAR_CAPABILITIES,
  progress: {
    ...BASE,
    typeLabel: 'Barras de progreso',
    hasLegend: false,
    hasTooltip: false,
    hasProgressStyle: true,
    hasValueFormat: true,
  },
  line: {
    ...BASE,
    typeLabel: 'Líneas',
    hasGrid: true,
    hasXAxis: true,
    hasYAxis: true,
    hasDataLabels: true,
    hasLineWidth: true,
    hasDotSize: true,
    hasValueFormat: true,
  },
  area: {
    ...BASE,
    typeLabel: 'Área',
    hasGrid: true,
    hasXAxis: true,
    hasYAxis: true,
    hasLineWidth: true,
    hasOpacity: true,
    hasValueFormat: true,
  },
  pie: {
    ...BASE,
    typeLabel: 'Torta',
    hasDataLabels: true,
    hasOpacity: true,
    hasValueFormat: true,
  },
  doughnut: {
    ...BASE,
    typeLabel: 'Anillo',
    hasDataLabels: true,
    hasOpacity: true,
    hasValueFormat: true,
  },
  radar: {
    ...BASE,
    typeLabel: 'Radar',
    hasXAxis: true,
    hasYAxis: true,
    hasLineWidth: true,
    hasOpacity: true,
    hasValueFormat: true,
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
    hasValueFormat: true,
  },
  pyramid: {
    ...BASE,
    typeLabel: 'Pirámide poblacional',
    hasDataLabels: true,
    hasBorderRadius: true,
    hasBarThickness: true,
    hasValueFormat: true,
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
