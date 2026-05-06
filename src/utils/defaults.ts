import type { ChartData, ChartConfig, ChartStyle, ChartType, TableData } from '@/types';

// Datos de ejemplo por tipo de gráfico
const BASE_CATEGORIES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
const BASE_CATEGORIES_LABELS = ['A', 'B', 'C', 'D', 'E'];

export const DEFAULT_CHART_DATA: Record<ChartType, ChartData> = {
  bar: {
    categories: BASE_CATEGORIES,
    series: [
      { id: 's1', name: 'Ventas', color: '#6c5ce7' },
      { id: 's2', name: 'Gastos', color: '#00cec9' },
    ],
    values: [
      [120, 190, 150, 210, 180, 240],
      [80, 100, 90, 130, 110, 150],
    ],
  },
  'bar-horizontal': {
    categories: ['Marketing', 'Tecnología', 'Ventas', 'Operaciones', 'RRHH'],
    series: [{ id: 's1', name: 'Presupuesto', color: '#6c5ce7' }],
    values: [[430, 380, 520, 290, 180]],
  },
  'bar-stacked': {
    categories: BASE_CATEGORIES,
    series: [
      { id: 's1', name: 'Producto A', color: '#6c5ce7' },
      { id: 's2', name: 'Producto B', color: '#00cec9' },
      { id: 's3', name: 'Producto C', color: '#fd79a8' },
    ],
    values: [
      [80, 100, 90, 120, 95, 130],
      [60, 75, 70, 90, 80, 100],
      [40, 50, 45, 60, 55, 70],
    ],
  },
  'bar-grouped': {
    categories: ['Q1', 'Q2', 'Q3', 'Q4'],
    series: [
      { id: 's1', name: '2023', color: '#6c5ce7' },
      { id: 's2', name: '2024', color: '#00cec9' },
    ],
    values: [
      [350, 420, 480, 510],
      [390, 460, 510, 580],
    ],
  },
  line: {
    categories: BASE_CATEGORIES,
    series: [
      { id: 's1', name: 'Usuarios', color: '#6c5ce7' },
      { id: 's2', name: 'Sesiones', color: '#fd79a8' },
    ],
    values: [
      [400, 550, 500, 700, 650, 820],
      [600, 800, 750, 1000, 950, 1200],
    ],
  },
  area: {
    categories: BASE_CATEGORIES,
    series: [
      { id: 's1', name: 'Ingresos', color: '#6c5ce7' },
      { id: 's2', name: 'Egresos', color: '#fd79a8' },
    ],
    values: [
      [1200, 1500, 1400, 1800, 1650, 2000],
      [900, 1100, 1050, 1300, 1200, 1500],
    ],
  },
  pie: {
    categories: BASE_CATEGORIES_LABELS,
    series: [{ id: 's1', name: 'Distribución', color: '#6c5ce7' }],
    values: [[35, 25, 20, 12, 8]],
  },
  doughnut: {
    categories: ['Directo', 'Orgánico', 'Social', 'Email', 'Otros'],
    series: [{ id: 's1', name: 'Tráfico', color: '#6c5ce7' }],
    values: [[40, 28, 17, 10, 5]],
  },
  radar: {
    categories: ['Velocidad', 'Potencia', 'Resistencia', 'Agilidad', 'Técnica', 'Mental'],
    series: [
      { id: 's1', name: 'Jugador A', color: '#6c5ce7' },
      { id: 's2', name: 'Jugador B', color: '#00cec9' },
    ],
    values: [
      [80, 70, 90, 75, 85, 70],
      [65, 85, 70, 80, 75, 90],
    ],
  },
  composed: {
    categories: BASE_CATEGORIES,
    series: [
      { id: 's1', name: 'Ventas (Barras)', color: '#6c5ce7' },
      { id: 's2', name: 'Tendencia (Línea)', color: '#fd79a8' },
    ],
    values: [
      [120, 190, 150, 210, 180, 240],
      [130, 170, 160, 195, 185, 230],
    ],
  },
  pyramid: {
    categories: [
      '0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34',
      '35-39', '40-44', '45-49', '50-54', '55-59', '60-64', '65-69',
      '70-74', '75-79', '80-84', '85-89', '90-94', '95-99', '100+',
    ],
    series: [
      { id: 's1', name: 'Hombre', color: '#4a90d9' },
      { id: 's2', name: 'Mujer', color: '#e8768a' },
    ],
    values: [
      [3.5, 3.6, 3.9, 4.2, 4.4, 4.4, 4.0, 3.7, 3.3, 3.0, 2.8, 2.6, 2.1, 1.5, 1.1, 0.7, 0.3, 0.1, 0.0, 0.0, 0.0],
      [3.4, 3.5, 3.7, 4.1, 4.4, 4.4, 4.0, 3.8, 3.4, 3.1, 3.0, 2.8, 2.3, 1.7, 1.3, 0.8, 0.5, 0.3, 0.1, 0.0, 0.0],
    ],
  },
  // Placeholder — la vista de tabla usa TableData en lugar de ChartData
  table: {
    categories: [],
    series: [],
    values: [],
  },
};

// Datos de ejemplo para el tipo Tabla (replica el ejemplo CIE10 / Diagnóstico / Total)
export const DEFAULT_TABLE_DATA: TableData = {
  columns: [
    { id: 'c1', label: 'CIE10', type: 'text', align: 'left' },
    { id: 'c2', label: 'Diagnóstico', type: 'text', align: 'left' },
    { id: 'c3', label: 'Total', type: 'number', align: 'right' },
  ],
  rows: [
    ['R101', 'Dolor abdominal localizado en parte superior', 14],
    ['R074', 'Dolor en el pecho no especificado', 11],
    ['R104', 'Otros dolores abdominales y los no especificados', 11],
    ['V299', 'Motociclista lesionado en accidente de tránsito', 10],
    ['S610', 'Herida de dedo(s) de la mano sin daño de la(s) uña(s)', 9],
    ['R51X', 'Cefalea', 8],
    ['G442', 'Cefalea debida a tensión', 7],
    ['J441', 'Enfermedad pulmonar obstructiva crónica', 7],
  ],
  showTotal: true,
  totalLabel: 'Total',
};

export const DEFAULT_CHART_CONFIG: ChartConfig = {
  type: 'bar',
  title: 'Título del Gráfico',
  subtitle: '',
  showLegend: true,
  legendPosition: 'bottom',
  showGrid: true,
  showXAxis: true,
  showYAxis: true,
  showTooltip: true,
  animationEnabled: true,
  width: 800,
  height: 500,
};

export const DEFAULT_CHART_STYLE: ChartStyle = {
  backgroundColor: '#1a1a2e',
  fontFamily: 'Inter, sans-serif',
  titleFontSize: 20,
  titleColor: '#f0f0f5',
  labelFontSize: 13,
  labelColor: '#a0a0b8',
  axisFontSize: 12,
  axisColor: '#6b6b80',
  gridColor: '#2d2d44',
  borderRadius: 4,
  lineWidth: 2,
  dotSize: 5,
  palette: 'vibrant',
  customColors: [],
  opacity: 0.8,
  showDataLabels: false,
  barThickness: 20,
  tableHeaderBg: '#2d2d44',
  tableHeaderColor: '#f0f0f5',
  tableRowBg: '#1a1a2e',
  tableRowAltBg: '#22223a',
  tableRowColor: '#d0d0e0',
  tableBorderColor: '#3a3a55',
  tableShowBorders: true,
  tableShowZebra: true,
  tableCellPadding: 10,
  tableTotalBg: '#2d2d44',
  tableTotalColor: '#f0f0f5',
};

/** Preset de estilo para gráficos con fondo claro (presentaciones, informes, modo día) */
export const LIGHT_CHART_STYLE: Partial<ChartStyle> = {
  backgroundColor: '#ffffff',
  titleColor: '#18181f',
  labelColor: '#4a4a60',
  axisColor: '#8080a0',
  gridColor: '#e4e4ef',
  tableHeaderBg: '#f4f4f8',
  tableHeaderColor: '#18181f',
  tableRowBg: '#ffffff',
  tableRowAltBg: '#f9f9fc',
  tableRowColor: '#1f1f2c',
  tableBorderColor: '#e4e4ef',
  tableTotalBg: '#eceaf6',
  tableTotalColor: '#1f1f2c',
};

/** Preset de estilo para gráficos con fondo oscuro (por defecto) */
export const DARK_CHART_STYLE: Partial<ChartStyle> = {
  backgroundColor: '#1a1a2e',
  titleColor: '#f0f0f5',
  labelColor: '#a0a0b8',
  axisColor: '#6b6b80',
  gridColor: '#2d2d44',
  tableHeaderBg: '#2d2d44',
  tableHeaderColor: '#f0f0f5',
  tableRowBg: '#1a1a2e',
  tableRowAltBg: '#22223a',
  tableRowColor: '#d0d0e0',
  tableBorderColor: '#3a3a55',
  tableTotalBg: '#2d2d44',
  tableTotalColor: '#f0f0f5',
};
