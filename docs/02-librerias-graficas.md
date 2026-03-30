# Fase 2: Librerías Gráficas y Evaluación

> **Estado General:** ⬜ Pendiente  
> **Última actualización:** 2026-03-29

---

## 📋 Seguimiento de Ejecución

| # | Tarea | Estado | Fecha Inicio | Fecha Fin | Notas |
|---|-------|--------|-------------|-----------|-------|
| 2.1 | Investigar opciones de librerías gráficas | ⬜ Pendiente | — | — | |
| 2.2 | Evaluar Recharts como opción principal | ⬜ Pendiente | — | — | |
| 2.3 | Evaluar alternativas (Chart.js, Nivo, Victory) | ⬜ Pendiente | — | — | |
| 2.4 | Seleccionar librería definitiva | ⬜ Pendiente | — | — | |
| 2.5 | Evaluar librerías auxiliares (color picker, exportación) | ⬜ Pendiente | — | — | |
| 2.6 | Crear prueba de concepto (PoC) con la librería elegida | ⬜ Pendiente | — | — | |

---

## 2.1 Criterios de Evaluación

Las librerías gráficas se evaluarán con los siguientes criterios:

| Criterio | Peso | Descripción |
|----------|------|-------------|
| **Compatibilidad con React/Next.js** | Alto | Integración nativa con React, soporte SSR/CSR |
| **Tipos de gráficos soportados** | Alto | Barras, líneas, torta, anillo, radar, área, mixtos |
| **Personalización visual** | Alto | Control de colores, fuentes, tamaños, animaciones |
| **Calidad visual** | Alto | Gráficos atractivos por defecto, anti-aliasing, suavidad |
| **Exportación** | Alto | Facilidad para exportar como PNG, SVG, PDF |
| **Documentación** | Medio | Calidad de docs, ejemplos, comunidad activa |
| **Tamaño del bundle** | Medio | Impacto en el peso final de la aplicación |
| **Mantenimiento** | Medio | Frecuencia de actualizaciones, issues abiertos |
| **Curva de aprendizaje** | Bajo | Facilidad de implementación |

---

## 2.2 Evaluación de Librerías Gráficas

### Opción A: Recharts ⭐ (Recomendada)

| Aspecto | Detalle |
|---------|---------|
| **Sitio** | [recharts.org](https://recharts.org) |
| **NPM** | `recharts` |
| **Tamaño** | ~45 KB gzipped |
| **Licencia** | MIT |
| **GitHub Stars** | ~24K+ |
| **Última versión** | 2.x |

#### Ventajas

- ✅ **Construida sobre React** — Componentes declarativos nativos
- ✅ **SVG nativo** — Exportación directa a SVG sin conversiones
- ✅ **Altamente personalizable** — Props para cada aspecto visual
- ✅ **Animaciones suaves** — Transiciones por defecto
- ✅ **Responsive** — `<ResponsiveContainer>` integrado
- ✅ **Tooltips y leyendas** — Componentes listos para usar
- ✅ **Composable** — Combinar tipos de gráficos fácilmente
- ✅ **Excelente documentación** — Con ejemplos interactivos

#### Desventajas

- ⚠️ No soporta renderizado en Canvas (solo SVG)
- ⚠️ Performance puede degradarse con miles de puntos de datos
- ⚠️ Algunos estilos requieren CSS personalizado

#### Tipos de Gráficos Soportados

| Tipo | Componente | Soportado |
|------|-----------|-----------|
| Barras verticales | `<BarChart>` | ✅ |
| Barras horizontales | `<BarChart layout="vertical">` | ✅ |
| Barras apiladas | `<BarChart>` con `stackId` | ✅ |
| Líneas | `<LineChart>` | ✅ |
| Área | `<AreaChart>` | ✅ |
| Torta | `<PieChart>` | ✅ |
| Anillo | `<PieChart>` con `innerRadius` | ✅ |
| Radar | `<RadarChart>` | ✅ |
| Mixto (Composed) | `<ComposedChart>` | ✅ |
| Barras agrupadas | `<BarChart>` múltiples `<Bar>` | ✅ |

---

### Opción B: Chart.js + react-chartjs-2

| Aspecto | Detalle |
|---------|---------|
| **Sitio** | [chartjs.org](https://www.chartjs.org) |
| **NPM** | `chart.js` + `react-chartjs-2` |
| **Tamaño** | ~70 KB gzipped (ambos) |
| **Licencia** | MIT |

#### Ventajas

- ✅ Renderizado Canvas — mejor performance con muchos datos
- ✅ Muy popular, gran comunidad
- ✅ Plugins extensivos

#### Desventajas

- ❌ **No es nativo de React** — Wrapper `react-chartjs-2` agrega complejidad
- ❌ **Canvas dificulta exportación SVG** — Requiere conversión extra
- ❌ **API imperativa** — Menos natural en React
- ❌ **Configuración verbose** — Objetos de opciones grandes y complejos
- ❌ **SSR problemático** — Canvas no funciona en el servidor

---

### Opción C: Nivo

| Aspecto | Detalle |
|---------|---------|
| **Sitio** | [nivo.rocks](https://nivo.rocks) |
| **NPM** | `@nivo/core`, `@nivo/bar`, etc. |
| **Tamaño** | Variable (~15-30 KB por tipo) |
| **Licencia** | MIT |

#### Ventajas

- ✅ Basada en D3.js + React
- ✅ Gráficos visualmente atractivos por defecto
- ✅ SVG y Canvas como opciones
- ✅ Soporte para temas

#### Desventajas

- ⚠️ Muchos paquetes separados (uno por tipo de gráfico)
- ⚠️ API más compleja
- ⚠️ Menos flexible para personalización fina
- ⚠️ Bundle total puede ser grande

---

### Opción D: Victory

| Aspecto | Detalle |
|---------|---------|
| **Sitio** | [commerce.nearform.com/open-source/victory](https://commerce.nearform.com/open-source/victory) |
| **NPM** | `victory` |
| **Tamaño** | ~50 KB gzipped |
| **Licencia** | MIT |

#### Ventajas

- ✅ React nativo, componentes declarativos
- ✅ Animaciones integradas
- ✅ Buena documentación

#### Desventajas

- ⚠️ Menor variedad de tipos de gráficos
- ⚠️ Comunidad más pequeña
- ⚠️ Actualizaciones menos frecuentes

---

## 2.3 Matriz Comparativa

| Criterio | Recharts | Chart.js | Nivo | Victory |
|----------|----------|----------|------|---------|
| Compatibilidad React | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Tipos de gráficos | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Personalización | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| Calidad visual | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Exportación SVG | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Tamaño bundle | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| Documentación | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| SSR / Next.js | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **TOTAL** | **36** | **30** | **31** | **28** |

---

## 2.4 Decisión: Recharts ✅

**Recharts** es la librería seleccionada por:

1. **Integración nativa con React** — API declarativa y componible
2. **SVG nativo** — Facilita la exportación sin conversiones
3. **Todos los tipos de gráfico necesarios** — Incluido `ComposedChart` para gráficos mixtos
4. **`ResponsiveContainer`** — Adaptación automática al contenedor
5. **Excelente balance** entre personalización, tamaño y facilidad de uso

---

## 2.5 Librerías Auxiliares

### Selector de Colores

| Librería | Tamaño | Propósito |
|---------|--------|-----------|
| **react-colorful** | ~2 KB gzipped | Selector de colores minimalista y accesible |

**¿Por qué react-colorful?**
- Ultraliviano (sin dependencias)
- Accesible (A11Y)
- Hooks-based
- Soporta HEX, RGB, HSL

### Exportación a Imagen

| Librería | Tamaño | Propósito |
|---------|--------|-----------|
| **html-to-image** | ~9 KB gzipped | Convertir elementos HTML/SVG a PNG, JPEG, SVG |

**¿Por qué html-to-image?**
- Soporta SVG nativo (ideal para Recharts)
- Genera PNG de alta resolución
- API simple basada en promesas
- Activamente mantenida

### Exportación a PDF

| Librería | Tamaño | Propósito |
|---------|--------|-----------|
| **jsPDF** | ~30 KB gzipped | Generación de documentos PDF en el cliente |

**¿Por qué jsPDF?**
- Generación puramente client-side
- Integración con imágenes (PNG del gráfico)
- Control de dimensiones y orientación
- Sin dependencias de servidor

### Iconos

| Librería | Tamaño | Propósito |
|---------|--------|-----------|
| **lucide-react** | Tree-shakeable | Iconos SVG modernos |

**¿Por qué lucide-react?**
- Tree-shakeable (solo importas los iconos que usas)
- Diseño consistente y moderno
- Amplia colección (+1500 iconos)
- Fork activo de Feather Icons

---

## 2.6 Resumen de Dependencias

### Producción

```json
{
  "dependencies": {
    "next": "^15.x",
    "react": "^19.x",
    "react-dom": "^19.x",
    "recharts": "^2.x",
    "react-colorful": "^5.x",
    "html-to-image": "^1.x",
    "jspdf": "^2.x",
    "lucide-react": "latest"
  }
}
```

### Desarrollo

```json
{
  "devDependencies": {
    "typescript": "^5.x",
    "@types/react": "^19.x",
    "@types/node": "^20.x",
    "eslint": "^9.x",
    "eslint-config-next": "^15.x",
    "prettier": "^3.x"
  }
}
```

### Tamaño Estimado Total del Bundle

| Componente | Tamaño (gzipped) |
|-----------|-------------------|
| Next.js + React | ~85 KB |
| Recharts | ~45 KB |
| react-colorful | ~2 KB |
| html-to-image | ~9 KB |
| jsPDF | ~30 KB |
| lucide-react (iconos usados) | ~5 KB |
| **Total estimado** | **~176 KB** |

> [!NOTE]
> El tamaño estimado es razonable para una aplicación web moderna. Recharts y jsPDF son las dependencias más pesadas pero necesarias para la funcionalidad core.

---

> [!TIP]
> Siguiente paso: [Fase 3: Configuración del Proyecto](./03-configuracion-proyecto.md)
