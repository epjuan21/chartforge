// Tipos de gráficos soportados por la aplicación
export type ChartType =
  | 'bar'
  | 'bar-horizontal'
  | 'bar-stacked'
  | 'bar-grouped'
  | 'line'
  | 'area'
  | 'pie'
  | 'doughnut'
  | 'radar'
  | 'composed';

// Una serie de datos (nombre + color asignado)
export interface DataSeries {
  id: string;
  name: string;
  color: string;
}

// Datos completos del gráfico
export interface ChartData {
  categories: string[]; // Etiquetas del eje X / segmentos
  series: DataSeries[]; // Series con nombre y color
  values: number[][]; // values[serieIndex][categoryIndex]
}

// Configuración general del gráfico
export interface ChartConfig {
  type: ChartType;
  title: string;
  subtitle: string;
  showLegend: boolean;
  legendPosition: 'top' | 'bottom' | 'left' | 'right';
  showGrid: boolean;
  showTooltip: boolean;
  animationEnabled: boolean;
  width: number;
  height: number;
}

// Estilo visual del gráfico
export interface ChartStyle {
  backgroundColor: string;
  fontFamily: string;
  titleFontSize: number;
  titleColor: string;
  labelFontSize: number;
  labelColor: string;
  axisFontSize: number;
  axisColor: string;
  gridColor: string;
  borderRadius: number; // Para barras redondeadas
  lineWidth: number; // Grosor de línea
  dotSize: number; // Tamaño de puntos en líneas
  palette: string; // ID de la paleta activa
  customColors: string[]; // Colores personalizados (override paleta)
  opacity: number; // Opacidad de relleno (área, torta)
  showDataLabels: boolean; // Mostrar valores sobre las barras/puntos
}
