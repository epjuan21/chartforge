# Fase 4: Componentes de Gráficos y Formularios

> **Estado General:** ⬜ Pendiente  
> **Última actualización:** 2026-03-29  
> **Dependencias:** Fase 3 completada

---

## 📋 Seguimiento de Ejecución

| # | Tarea | Estado | Fecha Inicio | Fecha Fin | Notas |
|---|-------|--------|-------------|-----------|-------|
| 4.1 | Definir tipos TypeScript para datos y configuración | ⬜ | — | — | |
| 4.2 | Crear constantes (tipos de gráfico, paletas, fuentes) | ⬜ | — | — | |
| 4.3 | Crear utilidades de validación | ⬜ | — | — | |
| 4.4 | Crear componentes UI base (Button, Input, Select, Tabs) | ⬜ | — | — | |
| 4.5 | Crear componente ColorPicker | ⬜ | — | — | |
| 4.6 | Crear componente BarChart | ⬜ | — | — | |
| 4.7 | Crear componente LineChart | ⬜ | — | — | |
| 4.8 | Crear componente PieChart | ⬜ | — | — | |
| 4.9 | Crear componente DoughnutChart | ⬜ | — | — | |
| 4.10 | Crear componente AreaChart | ⬜ | — | — | |
| 4.11 | Crear componente RadarChart | ⬜ | — | — | |
| 4.12 | Crear componente ComposedChart (mixto) | ⬜ | — | — | |
| 4.13 | Crear ChartRenderer (wrapper dinámico) | ⬜ | — | — | |
| 4.14 | Crear panel DataInput (entrada de datos) | ⬜ | — | — | |
| 4.15 | Crear panel StyleConfig (estilos del gráfico) | ⬜ | — | — | |
| 4.16 | Crear custom hooks (useChartData, useChartConfig) | ⬜ | — | — | |
| 4.17 | Integrar formularios con vista previa en vivo | ⬜ | — | — | |

---

## 4.1 Tipos TypeScript

### Modelo de Datos Principal

```typescript
// types/chart.ts

type ChartType = 'bar' | 'bar-horizontal' | 'bar-stacked' | 'bar-grouped'
  | 'line' | 'area' | 'pie' | 'doughnut' | 'radar' | 'composed';

interface DataPoint {
  label: string;
  values: number[];
}

interface DataSeries {
  name: string;
  color: string;
}

interface ChartData {
  categories: string[];       // Etiquetas del eje X
  series: DataSeries[];       // Series de datos (nombres + colores)
  dataPoints: DataPoint[];    // Valores por categoría
}
```

### Modelo de Configuración

```typescript
// types/config.ts

interface ChartConfig {
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

interface ChartStyle {
  backgroundColor: string;
  fontFamily: string;          // Fuente del gráfico
  titleFontSize: number;
  titleColor: string;
  labelFontSize: number;
  labelColor: string;
  axisFontSize: number;
  axisColor: string;
  gridColor: string;
  borderRadius: number;        // Para barras
  lineWidth: number;           // Para líneas
  dotSize: number;             // Para puntos en líneas
  palette: string;             // Nombre de la paleta activa
  customColors: string[];      // Colores personalizados
}
```

---

## 4.2 Constantes

### Tipos de Gráfico Disponibles

```typescript
// constants/chartTypes.ts
export const CHART_TYPES = [
  { id: 'bar', label: 'Barras Verticales', icon: 'BarChart3' },
  { id: 'bar-horizontal', label: 'Barras Horizontales', icon: 'BarChartHorizontal' },
  { id: 'bar-stacked', label: 'Barras Apiladas', icon: 'BarChart4' },
  { id: 'bar-grouped', label: 'Barras Agrupadas', icon: 'BarChart2' },
  { id: 'line', label: 'Líneas', icon: 'LineChart' },
  { id: 'area', label: 'Área', icon: 'AreaChart' },
  { id: 'pie', label: 'Torta', icon: 'PieChart' },
  { id: 'doughnut', label: 'Anillo', icon: 'Circle' },
  { id: 'radar', label: 'Radar', icon: 'Radar' },
  { id: 'composed', label: 'Mixto', icon: 'Combine' },
];
```

### Paletas Prediseñadas

Se incluirán al menos 4 paletas optimizadas: Vibrante, Corporativa, Pastel y Oscura (ver Fase 3 para los colores exactos).

### Fuentes Disponibles para Gráficos

```typescript
export const CHART_FONTS = [
  { id: 'inter', label: 'Inter', value: 'Inter, sans-serif' },
  { id: 'roboto', label: 'Roboto', value: 'Roboto, sans-serif' },
  { id: 'open-sans', label: 'Open Sans', value: 'Open Sans, sans-serif' },
  { id: 'montserrat', label: 'Montserrat', value: 'Montserrat, sans-serif' },
  { id: 'poppins', label: 'Poppins', value: 'Poppins, sans-serif' },
  { id: 'system', label: 'Sistema', value: 'system-ui, sans-serif' },
];
```

---

## 4.3 Componentes UI Base

Cada componente tendrá su carpeta con `.tsx`, `.module.css` e `index.ts`.

| Componente | Props Principales | Descripción |
|-----------|-------------------|-------------|
| **Button** | variant, size, icon, onClick | Botón con variantes (primary, secondary, ghost) |
| **Input** | label, type, value, onChange, error | Campo de texto con label y validación |
| **NumberInput** | label, min, max, step, value | Input numérico con controles +/- |
| **Select** | label, options, value, onChange | Dropdown de selección |
| **Tabs** | tabs, activeTab, onChange | Tabs para organizar paneles |
| **ColorPicker** | color, onChange, presets | Selector de color con `react-colorful` |
| **Toggle** | label, checked, onChange | Switch toggle |
| **Slider** | label, min, max, value, onChange | Control deslizante para valores numéricos |

---

## 4.4 Componentes de Gráficos

### Estructura Común

Cada componente de gráfico recibe las mismas props base:

```typescript
interface BaseChartProps {
  data: ChartData;
  config: ChartConfig;
  style: ChartStyle;
  chartRef?: React.RefObject<HTMLDivElement>;
}
```

### Componentes a Implementar

| Componente | Recharts Base | Características Específicas |
|-----------|---------------|----------------------------|
| `BarChartView` | `<BarChart>` | Barras verticales, horizontales, apiladas, agrupadas |
| `LineChartView` | `<LineChart>` | Curvas suaves, puntos, sin puntos |
| `AreaChartView` | `<AreaChart>` | Relleno con gradiente, opacidad configurable |
| `PieChartView` | `<PieChart>` | Etiquetas, porcentajes |
| `DoughnutChartView` | `<PieChart>` con innerRadius | Texto central configurable |
| `RadarChartView` | `<RadarChart>` | Múltiples series superpuestas |
| `ComposedChartView` | `<ComposedChart>` | Combina barras + líneas |

### ChartRenderer (Componente Wrapper)

```typescript
// Selecciona el componente correcto según el tipo
function ChartRenderer({ data, config, style, chartRef }: BaseChartProps) {
  switch (config.type) {
    case 'bar':
    case 'bar-horizontal':
    case 'bar-stacked':
    case 'bar-grouped':
      return <BarChartView ... />;
    case 'line':
      return <LineChartView ... />;
    // ... etc
  }
}
```

---

## 4.5 Panel de Entrada de Datos (DataInput)

### Funcionalidad

El panel permite al usuario ingresar datos de manera tabular y dinámica:

1. **Definir categorías** (eje X): Agregar/eliminar etiquetas
2. **Definir series**: Agregar/eliminar series de datos con nombre y color
3. **Ingresar valores**: Tabla editable categoría × serie
4. **Datos de ejemplo**: Botón para cargar datos predeterminados por tipo de gráfico

### Interfaz del Panel

```
┌─────────────────────────────────────────┐
│  📊 Datos del Gráfico                   │
├─────────────────────────────────────────┤
│                                          │
│  Categorías: [Ene] [Feb] [Mar] [+]      │
│                                          │
│  Series:                                 │
│    Serie 1: [Ventas]  🎨 #6c5ce7  [🗑️]  │
│    Serie 2: [Gastos]  🎨 #00cec9  [🗑️]  │
│    [+ Agregar Serie]                     │
│                                          │
│  Valores:                                │
│  ┌──────┬────────┬────────┐              │
│  │      │ Ventas │ Gastos │              │
│  ├──────┼────────┼────────┤              │
│  │ Ene  │ [100]  │ [80]   │              │
│  │ Feb  │ [150]  │ [90]   │              │
│  │ Mar  │ [120]  │ [70]   │              │
│  └──────┴────────┴────────┘              │
│                                          │
│  [📋 Cargar Ejemplo]                     │
└─────────────────────────────────────────┘
```

---

## 4.6 Panel de Configuración de Estilo (StyleConfig)

### Secciones del Panel

| Sección | Controles |
|---------|-----------|
| **General** | Título, subtítulo, ancho, alto |
| **Paleta** | Selector de paleta predefinida o colores custom |
| **Tipografía** | Fuente, tamaño título, tamaño labels, tamaño ejes |
| **Colores** | Color de fondo, color de texto, color de ejes, color de grid |
| **Leyenda** | Mostrar/ocultar, posición (top, bottom, left, right) |
| **Opciones** | Grid, tooltips, animaciones |
| **Forma** | Border radius (barras), grosor línea, tamaño puntos |

---

## 4.7 Custom Hooks

### `useChartData`
Maneja el estado de los datos del gráfico: categorías, series y valores. Incluye funciones para agregar/eliminar categorías y series, actualizar valores, y cargar datos de ejemplo.

### `useChartConfig`
Maneja la configuración visual: tipo de gráfico, título, leyenda, dimensiones. Incluye funciones para cambiar tipo, actualizar configuración y resetear a defaults.

### `useChartStyle`
Maneja los estilos: paleta activa, fuentes, colores, radios. Incluye funciones para cambiar paleta, actualizar estilos individuales.

---

> [!TIP]
> Esta es la fase más extensa del proyecto. Se recomienda implementar primero BarChart + DataInput como MVP y luego agregar los demás tipos.

> [!NOTE]
> Siguiente paso: [Fase 5: Diseño UI/UX e Interacciones](./05-diseno-ui-ux.md)
