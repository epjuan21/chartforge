# ChartForge

Generador de gráficos estadísticos profesionales. Crea, personaliza y exporta gráficos en segundos directamente desde el navegador — sin registro, sin backend, sin límites.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)
![Recharts](https://img.shields.io/badge/Recharts-3-22b5bf)

---

## Funcionalidades

### 10 tipos de gráfico

| Tipo | Descripción |
|------|-------------|
| **Barras Verticales** | Compara valores entre categorías |
| **Barras Horizontales** | Ideal para etiquetas largas |
| **Barras Apiladas** | Muestra composición y totales |
| **Barras Agrupadas** | Compara múltiples series en paralelo |
| **Líneas** | Tendencias en el tiempo |
| **Área** | Tendencias con volumen visual |
| **Torta** | Distribución porcentual |
| **Anillo** | Distribución con espacio central |
| **Radar** | Comparación multivariable |
| **Mixto** | Combina barras y líneas en un mismo gráfico |

### Entrada de datos
- Tabla de categorías y series editable directamente en el panel
- Agregar, renombrar y eliminar categorías y series
- Botón "Cargar Ejemplo" para previsualizar rápidamente cada tipo de gráfico
- Valores vacíos tratados como cero; acepta negativos y decimales

### Personalización visual
- **8 paletas de colores**: Vibrante, Corporativa, Pastel, Oscura, Océano, Bosque, Atardecer, Monocromático
- Colores personalizados por serie con color picker
- Tipografía: familia de fuente, tamaño de título y etiquetas
- Toggle de leyenda y posición (arriba, abajo, izquierda, derecha)
- Toggle de grid horizontal y vertical
- Título y subtítulo del gráfico
- Dimensiones personalizadas (ancho × alto en px)
- Tema claro / oscuro

### Exportación
| Formato | Opciones |
|---------|----------|
| **PNG** | Escala 1×, 2× o 3× para alta resolución; fondo blanco o transparente |
| **SVG** | Vectorial, escala infinita |
| **PDF** | Orientación vertical u horizontal; tamaño A4 |

### Vista previa
- Previsualización en tiempo real con cada cambio
- Modo pantalla completa en una pestaña separada (`/preview`)
- Sincronización del estado del editor vía `localStorage`

---

## Stack tecnológico

| Tecnología | Versión | Rol |
|-----------|---------|-----|
| [Next.js](https://nextjs.org) | 16 | Framework — App Router, build estático |
| [React](https://react.dev) | 19 | UI |
| [TypeScript](https://www.typescriptlang.org) | 5 | Tipado estático |
| [Recharts](https://recharts.org) | 3 | Renderizado de gráficos (SVG) |
| [html-to-image](https://github.com/bubkoo/html-to-image) | 1.11 | Exportación PNG y SVG |
| [jsPDF](https://github.com/parallax/jsPDF) | 4 | Exportación PDF |
| [Lucide React](https://lucide.dev) | 1.7 | Iconografía |
| [react-colorful](https://github.com/omgovich/react-colorful) | 5.6 | Selector de color |

---

## Inicio rápido

### Requisitos
- Node.js 18 o superior
- npm 9 o superior

### Instalación

```bash
git clone https://github.com/epjuan21/chartforge.git
cd chartforge
npm install
```

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

### Producción

```bash
npm run build   # Genera el build optimizado
npm run start   # Sirve el build localmente
```

### Otros scripts

```bash
npm run lint    # Ejecuta ESLint
```

---

## Estructura del proyecto

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── LandingHeader.tsx     # Header de la landing
│   ├── editor/
│   │   ├── page.tsx          # Página del editor (Server Component)
│   │   └── EditorClient.tsx  # Lógica del editor (Client Component)
│   └── preview/
│       ├── page.tsx          # Página de vista previa
│       └── PreviewClient.tsx # Gráfico en pantalla completa
│
├── components/
│   ├── charts/               # Vistas de cada tipo de gráfico
│   │   ├── ChartRenderer/    # Selector de componente según tipo
│   │   ├── BarChartView/
│   │   ├── LineChartView/
│   │   ├── AreaChartView/
│   │   ├── PieChartView/
│   │   ├── RadarChartView/
│   │   └── ComposedChartView/
│   ├── panels/               # Paneles de configuración
│   │   ├── DataInput/        # Tabla de datos
│   │   ├── StyleConfig/      # Paleta, fuentes, leyenda, grid
│   │   └── ExportPanel/      # Opciones y botón de descarga
│   └── ui/                   # Componentes base reutilizables
│       ├── Button/
│       ├── Input/
│       ├── NumberInput/
│       ├── Select/
│       ├── Toggle/
│       ├── Slider/
│       ├── ColorPicker/
│       ├── Tabs/
│       ├── ThemeProvider/
│       └── ThemeToggle/
│
├── hooks/
│   ├── useChartData.ts       # Estado de categorías, series y valores
│   ├── useChartConfig.ts     # Tipo de gráfico, dimensiones, título
│   ├── useChartStyle.ts      # Paleta, fuentes, leyenda, grid
│   ├── useExport.ts          # Lógica de exportación PNG/SVG/PDF
│   ├── useEditorStore.ts     # Persistencia en localStorage
│   ├── useDebounce.ts        # Debounce para inputs numéricos
│   └── useTheme.ts           # Tema claro/oscuro
│
├── constants/
│   ├── chartTypes.ts         # Definición de los 10 tipos de gráfico
│   ├── colorPalettes.ts      # 8 paletas predefinidas
│   └── fontOptions.ts        # Familias de fuente disponibles
│
├── types/                    # Tipos TypeScript globales
└── utils/                    # Utilidades de exportación y datos
```

---

## Cómo usar ChartForge

1. **Selecciona el tipo de gráfico** en la barra lateral izquierda
2. **Ingresa tus datos** en el panel derecho → pestaña *Datos*
   - Agrega categorías (eje X) y series (conjuntos de datos)
   - O usa *Cargar Ejemplo* para ver datos de prueba
3. **Personaliza el estilo** en la pestaña *Estilo*
   - Elige paleta de colores, fuente, tamaño y opciones de leyenda/grid
4. **Exporta** en la pestaña *Exportar*
   - Elige PNG, SVG o PDF con las opciones de resolución y orientación

---

## Despliegue

La aplicación es completamente estática — no requiere servidor, base de datos ni variables de entorno.

**Vercel (recomendado)**

Conecta el repositorio en [vercel.com](https://vercel.com) → *New Project*. Next.js se auto-detecta y el build se configura automáticamente.

**Otras plataformas**

Compatible con Netlify y Cloudflare Pages usando las mismas opciones por defecto.

---

## Fuera del alcance

- Autenticación de usuarios
- Persistencia de datos en servidor
- Carga de archivos CSV / Excel
- API pública
- Colaboración en tiempo real
