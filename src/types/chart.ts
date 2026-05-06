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
  | 'composed'
  | 'pyramid'
  | 'table';

// Definición de una columna en el tipo Tabla
export type TableColumnType = 'text' | 'number';
export type TableAlign = 'left' | 'center' | 'right';

export interface TableColumn {
  id: string;
  label: string;
  type: TableColumnType;
  align: TableAlign;
}

// Datos de una tabla — independiente de ChartData
export interface TableData {
  columns: TableColumn[];
  rows: (string | number)[][]; // rows[rowIndex][colIndex]
  showTotal: boolean; // fila de totales calculada automáticamente
  totalLabel: string; // etiqueta de la fila Total (ej. "Total")
}

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
  showXAxis: boolean;
  showYAxis: boolean;
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
  barThickness: number; // Grosor de las barras en pirámide poblacional
  // Estilos específicos para el tipo Tabla
  tableHeaderBg: string;
  tableHeaderColor: string;
  tableRowBg: string;
  tableRowAltBg: string; // Color para filas alternas (zebra)
  tableRowColor: string;
  tableBorderColor: string;
  tableShowBorders: boolean;
  tableShowZebra: boolean;
  tableCellPadding: number;
  tableTotalBg: string;
  tableTotalColor: string;
}
