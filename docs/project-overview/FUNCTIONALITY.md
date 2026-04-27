# Funcionalidad — ChartForge

## Resumen General

**ChartForge** es una aplicación web para crear, personalizar y exportar gráficos estadísticos profesionales directamente en el navegador. No requiere registro, autenticación ni conexión a un servidor: todo el procesamiento ocurre del lado del cliente.

El flujo principal es: el usuario ingresa datos en una tabla, selecciona el tipo de gráfico y los estilos visuales, obtiene una vista previa en tiempo real y descarga el resultado en PNG, SVG o PDF.

---

## Módulos y Features Principales

### 1. Landing Page (`/`)
Página de presentación del producto con secciones de hero, galería de tipos de gráfico, listado de características y llamada a la acción para abrir el editor.

### 2. Editor de Gráficos (`/editor`)
Interfaz principal dividida en tres zonas:
- **Selector de tipo** (barra lateral izquierda): 11 tipos de gráfico disponibles.
- **Canvas central**: Vista previa del gráfico en tiempo real mientras el usuario edita.
- **Panel de configuración** (barra derecha): Tres pestañas — Datos, Estilo y Exportar.

### 3. Panel de Datos
Permite construir la tabla de entrada del gráfico:
- Agregar, renombrar y eliminar **categorías** (eje X o filas).
- Agregar, renombrar, asignar color y eliminar **series de datos** (columnas).
- Editar valores numéricos en una tabla con debounce de 80 ms.
- Cargar datos de ejemplo predefinidos para cada tipo de gráfico.

### 4. Panel de Estilo
Controla la apariencia visual del gráfico:
- **Paletas prediseñadas**: 8 paletas (Vibrante, Corporativa, Pastel, Oscura, Océano, Bosque, Atardecer, Monocromático).
- **Tipografía**: 8 familias (Inter, Roboto, Montserrat, Poppins, Lato, Nunito, Open Sans, Sistema) con control de tamaño para título, etiquetas y ejes.
- **Colores personalizados**: Selector HEX para texto, grid y cada serie individualmente.
- **Opciones de layout**: Toggle de grid, toggle de leyenda con 4 posiciones posibles.
- **Dimensiones**: Ancho (300–2000 px) y alto (200–1500 px) del gráfico.
- **Opciones avanzadas**: Opacidad de relleno, grosor de línea, tamaño de puntos, mostrar valores sobre las barras.

### 5. Panel de Exportación
Descarga del gráfico generado en tres formatos:
- **PNG**: Con opciones de escala (1×, 2×, 3×) y fondo blanco o transparente.
- **SVG**: Exportación vectorial pura, escalable e independiente de resolución.
- **PDF**: Con selección de orientación (portrait / landscape) e inclusión opcional del título.
- **Copiar al portapapeles**: Copia la imagen como PNG 2× para pegar directamente en aplicaciones de Office o presentaciones.

### 6. Vista Previa (`/preview`)
Página de pantalla completa que muestra el gráfico en otra pestaña del navegador. Se sincroniza automáticamente con el editor mediante eventos de `localStorage`, sin necesidad de recargar la página.

### 7. Sistema de Tema
Alternancia entre modo oscuro y modo claro, con persistencia en `localStorage`. Respeta la preferencia del sistema operativo (`prefers-color-scheme`) como valor inicial.

---

## Tipos de Gráfico Soportados

| ID | Nombre | Casos de uso recomendados |
|----|--------|--------------------------|
| `bar` | Barras verticales | Comparación entre categorías |
| `bar-horizontal` | Barras horizontales | Categorías con etiquetas largas |
| `bar-stacked` | Barras apiladas | Composición de totales |
| `bar-grouped` | Barras agrupadas | Comparación en paralelo entre series |
| `line` | Líneas | Tendencias temporales |
| `area` | Área | Tendencias con énfasis en volumen |
| `pie` | Torta | Distribución porcentual |
| `doughnut` | Anillo | Distribución porcentual con espacio central |
| `radar` | Radar | Comparación multivariable en varias dimensiones |
| `composed` | Mixto | Barras y líneas en un mismo gráfico |
| `pyramid` | Pirámide poblacional | Distribución por edad y sexo (espejo horizontal) |

---

## Roles de Usuario y Permisos

*No se encontró evidencia de sistema de autenticación, roles ni permisos en el proyecto.*

La aplicación es de acceso libre y anónimo. Todos los usuarios tienen acceso completo a todas las funcionalidades.

---

## Integraciones con Servicios Externos

*No se encontró evidencia de integración con APIs externas, servicios de autenticación ni pasarelas de pago.*

Las únicas fuentes de datos externas son:
- **Google Fonts CDN**: Para cargar las tipografías Inter y JetBrains Mono (definidas en `layout.tsx`).

---

## Rutas Principales

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | `app/page.tsx` | Landing page |
| `/editor` | `app/editor/EditorClient.tsx` | Editor principal de gráficos |
| `/preview` | `app/preview/PreviewClient.tsx` | Vista previa a pantalla completa |

---

## Validaciones de Entrada

| Campo | Regla |
|-------|-------|
| Nombre de archivo | Solo caracteres `[\w\-. ]`, sin rutas ni caracteres especiales |
| Ancho del gráfico | Entre 300 y 2000 px |
| Alto del gráfico | Entre 200 y 1500 px |
| Título | Máximo 100 caracteres |
| Valores numéricos | Solo números finitos; celdas vacías se tratan como 0 |
| Color HEX | Formato `#RGB` o `#RRGGBB` |
