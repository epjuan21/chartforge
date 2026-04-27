import type { ChartType } from '@/types';

export interface ChartTypeOption {
  id: ChartType;
  label: string;
  icon: string; // nombre del icono lucide
  description: string;
}

export const CHART_TYPES: ChartTypeOption[] = [
  {
    id: 'bar',
    label: 'Barras Verticales',
    icon: 'BarChart3',
    description: 'Compara valores entre categorías',
  },
  {
    id: 'bar-horizontal',
    label: 'Barras Horizontales',
    icon: 'ChartBarHorizontal',
    description: 'Ideal para etiquetas largas',
  },
  {
    id: 'bar-stacked',
    label: 'Barras Apiladas',
    icon: 'BarChart4',
    description: 'Muestra composición y totales',
  },
  {
    id: 'bar-grouped',
    label: 'Barras Agrupadas',
    icon: 'BarChart2',
    description: 'Compara múltiples series',
  },
  {
    id: 'line',
    label: 'Líneas',
    icon: 'LineChart',
    description: 'Tendencias en el tiempo',
  },
  {
    id: 'area',
    label: 'Área',
    icon: 'AreaChart',
    description: 'Tendencias con volumen visual',
  },
  {
    id: 'pie',
    label: 'Torta',
    icon: 'PieChart',
    description: 'Distribución porcentual',
  },
  {
    id: 'doughnut',
    label: 'Anillo',
    icon: 'CircleDot',
    description: 'Distribución con espacio central',
  },
  {
    id: 'radar',
    label: 'Radar',
    icon: 'Radar',
    description: 'Comparación multivariable',
  },
  {
    id: 'composed',
    label: 'Mixto',
    icon: 'Combine',
    description: 'Combina barras y líneas',
  },
  {
    id: 'pyramid',
    label: 'Pirámide Poblacional',
    icon: 'Triangle',
    description: 'Distribución por edad y sexo',
  },
  {
    id: 'table',
    label: 'Tabla',
    icon: 'Table',
    description: 'Tabla configurable con pegado desde portapapeles',
  },
];
