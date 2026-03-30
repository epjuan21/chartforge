# Fase 1: Stack Tecnológico y Arquitectura

> **Estado General:** ⬜ Pendiente  
> **Última actualización:** 2026-03-29

---

## 📋 Seguimiento de Ejecución

| # | Tarea | Estado | Fecha Inicio | Fecha Fin | Notas |
|---|-------|--------|-------------|-----------|-------|
| 1.1 | Definir stack tecnológico principal | ⬜ Pendiente | — | — | |
| 1.2 | Definir estructura de carpetas | ⬜ Pendiente | — | — | |
| 1.3 | Definir convenciones de código | ⬜ Pendiente | — | — | |
| 1.4 | Documentar decisiones de arquitectura | ⬜ Pendiente | — | — | |

---

## 1.1 Stack Tecnológico Principal

### Framework y Runtime

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **Next.js** | 15.x (App Router) | Framework principal — SSR, rutas, optimización |
| **React** | 19.x | Librería de UI — componentes, estado, hooks |
| **TypeScript** | 5.x | Tipado estático — seguridad, autocompletado, documentación |
| **Node.js** | 20.x LTS | Runtime del servidor de desarrollo |

### Justificación de Next.js 15 con App Router

- **App Router** ofrece Server Components por defecto, reduciendo JS enviado al cliente
- **Layouts anidados** para mantener la estructura visual sin re-renders
- **Route Groups** para organizar por funcionalidad sin afectar URLs
- **Metadata API** nativa para SEO
- **Turbopack** para desarrollo rápido con HMR instantáneo

### Estilos y Diseño

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **CSS Modules** | Nativo | Estilos encapsulados por componente |
| **CSS Variables** | Nativo | Sistema de design tokens (colores, fuentes, espaciado) |
| **Google Fonts** | — | Tipografías profesionales (Inter, JetBrains Mono) |

### Herramientas de Desarrollo

| Herramienta | Propósito |
|------------|-----------|
| **ESLint** | Linting y estilo de código |
| **Prettier** | Formateo automático |
| **npm** | Gestor de paquetes |

### Librerías Clave

| Librería | Propósito | Detalle en |
|---------|-----------|------------|
| **Recharts** (principal) | Renderizado de gráficos | [Fase 2](./02-librerias-graficas.md) |
| **html-to-image** | Exportación a PNG/SVG | [Fase 6](./06-exportacion-descarga.md) |
| **jsPDF** | Exportación a PDF | [Fase 6](./06-exportacion-descarga.md) |
| **react-colorful** | Selector de colores | [Fase 5](./05-diseno-ui-ux.md) |
| **lucide-react** | Iconos | [Fase 5](./05-diseno-ui-ux.md) |

---

## 1.2 Arquitectura de la Aplicación

### Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────┐
│                    NEXT.JS APP                       │
│                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │   Página     │  │   Página     │  │  Página    │ │
│  │  Principal   │  │  Editor de   │  │  Vista     │ │
│  │  (Landing)   │  │  Gráfico     │  │  Previa    │ │
│  └──────┬───────┘  └──────┬───────┘  └─────┬──────┘ │
│         │                 │                │         │
│  ┌──────┴─────────────────┴────────────────┴──────┐  │
│  │              CAPA DE COMPONENTES                │  │
│  │                                                 │  │
│  │  ┌─────────┐ ┌──────────┐ ┌──────────────────┐ │  │
│  │  │ Chart   │ │ Config   │ │ Export           │ │  │
│  │  │ Render  │ │ Panel    │ │ Manager          │ │  │
│  │  └────┬────┘ └────┬─────┘ └────────┬─────────┘ │  │
│  └───────┼───────────┼────────────────┼────────────┘  │
│          │           │                │               │
│  ┌───────┴───────────┴────────────────┴────────────┐  │
│  │              CAPA DE ESTADO (React State)        │  │
│  │                                                  │  │
│  │  chartData ←→ chartConfig ←→ chartStyle          │  │
│  │  (useState / useReducer — sin estado global)     │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │          CAPA DE UTILIDADES                       │  │
│  │                                                   │  │
│  │  colorUtils │ fontUtils │ exportUtils │ validators │  │
│  └───────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

### Principios de Arquitectura

1. **Sin estado global**: Solo `useState` / `useReducer` a nivel de página
2. **Client Components solo donde se necesite**: Formularios e interacciones
3. **Server Components** para layout, metadata y contenido estático
4. **Separación clara**: Datos ↔ Configuración ↔ Renderizado ↔ Exportación
5. **Zero Backend**: Toda la lógica corre en el cliente, no hay API routes

---

## 1.3 Estructura de Carpetas

```
generacion-graficos/
├── docs/                          # Documentación del proyecto (esta carpeta)
├── public/
│   ├── fonts/                     # Fuentes locales si se necesitan
│   └── og-image.png               # Open Graph image
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Layout raíz con fuentes y metadata
│   │   ├── page.tsx               # Landing / página principal
│   │   ├── globals.css            # Variables CSS y estilos globales
│   │   ├── editor/
│   │   │   └── page.tsx           # Editor de gráficos (página principal de trabajo)
│   │   └── preview/
│   │       └── page.tsx           # Vista previa a pantalla completa
│   ├── components/
│   │   ├── ui/                    # Componentes UI genéricos
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Select/
│   │   │   ├── ColorPicker/
│   │   │   └── Tabs/
│   │   ├── charts/                # Componentes de gráficos
│   │   │   ├── BarChart/
│   │   │   ├── LineChart/
│   │   │   ├── PieChart/
│   │   │   ├── DoughnutChart/
│   │   │   ├── RadarChart/
│   │   │   ├── AreaChart/
│   │   │   └── ChartRenderer.tsx  # Componente wrapper que selecciona el tipo
│   │   ├── config/                # Paneles de configuración
│   │   │   ├── DataInput/         # Entrada de datos (series, categorías)
│   │   │   ├── StyleConfig/       # Configuración de estilos
│   │   │   ├── FontConfig/        # Configuración de fuentes
│   │   │   └── ColorConfig/       # Configuración de colores
│   │   ├── export/                # Componentes de exportación
│   │   │   └── ExportPanel/
│   │   └── layout/                # Componentes de layout
│   │       ├── Header/
│   │       ├── Sidebar/
│   │       └── Footer/
│   ├── hooks/                     # Custom hooks
│   │   ├── useChartData.ts
│   │   ├── useChartConfig.ts
│   │   └── useExport.ts
│   ├── types/                     # Tipos TypeScript
│   │   ├── chart.ts
│   │   ├── config.ts
│   │   └── export.ts
│   ├── utils/                     # Funciones utilitarias
│   │   ├── colors.ts              # Paletas y utilidades de color
│   │   ├── fonts.ts               # Configuración de fuentes
│   │   ├── validators.ts          # Validación de datos de entrada
│   │   ├── defaults.ts            # Valores por defecto por tipo de gráfico
│   │   └── export.ts              # Lógica de exportación
│   └── constants/                 # Constantes
│       ├── chartTypes.ts          # Tipos de gráficos disponibles
│       ├── colorPalettes.ts       # Paletas de colores predefinidas
│       └── fontOptions.ts         # Fuentes disponibles
├── .eslintrc.json
├── .prettierrc
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 1.4 Convenciones de Código

### Nomenclatura

| Elemento | Convención | Ejemplo |
|----------|------------|---------|
| Componentes | PascalCase | `BarChart.tsx` |
| Hooks | camelCase con prefijo `use` | `useChartData.ts` |
| Utilidades | camelCase | `colorUtils.ts` |
| Tipos/Interfaces | PascalCase con prefijo descriptivo | `ChartConfig`, `BarChartProps` |
| CSS Modules | camelCase | `styles.chartContainer` |
| Constantes | SCREAMING_SNAKE_CASE | `DEFAULT_COLORS` |
| Carpetas de componentes | PascalCase | `BarChart/` |

### Estructura de Componente

```
ComponentName/
├── ComponentName.tsx        # Componente principal
├── ComponentName.module.css # Estilos encapsulados
├── ComponentName.types.ts   # Tipos específicos (si se necesitan)
└── index.ts                 # Re-export
```

### Reglas Generales

1. **TypeScript estricto** — `strict: true` en `tsconfig.json`
2. **Componentes funcionales** — No usar class components
3. **Props tipadas** — Usar interfaces para todas las props
4. **CSS Modules** — Para estilos encapsulados por componente
5. **CSS Variables** — Para el sistema de design tokens global
6. **Barrel exports** — `index.ts` en cada carpeta de componentes

---

## 1.5 Decisiones Técnicas Documentadas

### ¿Por qué NO usar Tailwind CSS?

- Se usará **CSS Modules + CSS Variables** para máximo control sobre los estilos
- Los gráficos requieren estilos muy específicos que se benefician de CSS puro
- CSS Variables permiten un sistema de temas dinámico sin dependencias externas
- Menor tamaño del bundle final

### ¿Por qué NO usar estado global (Redux, Zustand)?

- La aplicación tiene un flujo lineal simple: ingresar datos → configurar → exportar
- `useState` y `useReducer` son suficientes al nivel de la página del editor
- Evita complejidad innecesaria y reduce el tamaño del bundle

### ¿Por qué NO usar API Routes?

- Toda la lógica puede ejecutarse en el cliente
- Los gráficos se renderizan con React en el navegador
- La exportación se hace con Canvas/SVG en el navegador
- No hay datos que persistir ni servicios externos que consumir

---

> [!TIP]
> Para ver la evaluación detallada de librerías gráficas, consulta la [Fase 2: Librerías Gráficas](./02-librerias-graficas.md).
