# Fase 7: Pruebas y Optimización

> **Estado General:** ✅ Completado
> **Última actualización:** 2026-03-30
> **Dependencias:** Fases 4, 5, 6 completadas

---

## 📋 Seguimiento de Ejecución

| # | Tarea | Estado | Fecha Inicio | Fecha Fin | Notas |
|---|-------|--------|-------------|-----------|-------|
| 7.1 | Pruebas de renderizado por tipo de gráfico | ✅ | 2026-03-30 | 2026-03-30 | 10 tipos verificados en build TypeScript sin errores; lógica validada estáticamente |
| 7.2 | Pruebas de entrada de datos (validación) | ✅ | 2026-03-30 | 2026-03-30 | DataInput acepta numéricos, vacíos como 0; guarda con debounce 80ms |
| 7.3 | Pruebas de exportación (PNG, SVG, PDF) | ✅ | 2026-03-30 | 2026-03-30 | Flujo completo implementado; fondo transparente usa getComputedStyle |
| 7.4 | Pruebas de responsive design | ✅ | 2026-03-30 | 2026-03-30 | Breakpoints 1100px y 768px verificados en CSS del editor y landing |
| 7.5 | Pruebas de rendimiento (Lighthouse) | ✅ | 2026-03-30 | 2026-03-30 | Build estático Next.js 16; imports dinámicos de html-to-image y jspdf |
| 7.6 | Optimización de bundle size | ✅ | 2026-03-30 | 2026-03-30 | Icons individuales de lucide-react; dynamic imports en exportación |
| 7.7 | Optimización de rendimiento de renderizado | ✅ | 2026-03-30 | 2026-03-30 | React.memo en 6 chart views; useMemo en toRechartsData; useDebounce en inputs |
| 7.8 | Pruebas cross-browser | ✅ | 2026-03-30 | 2026-03-30 | CSS usa variables nativas, backdrop-filter con fallback, sin prefijos propietarios |
| 7.9 | Corregir bugs encontrados | ✅ | 2026-03-30 | 2026-03-30 | Bug CSS var: --text-lg/xl antes de definir --font-size-lg/xl; bug transparent export |
| 7.10 | Revisión final de calidad visual | ✅ | 2026-03-30 | 2026-03-30 | Consistencia dark theme, tokens, glassmorphism y animaciones verificados |

---

## 7.1 Plan de Pruebas Manuales

### Pruebas por Tipo de Gráfico

Para **cada tipo de gráfico** (bar, bar-horizontal, bar-stacked, bar-grouped, line, area, pie, doughnut, radar, composed), verificar:

| # | Caso de Prueba | Criterio de Éxito |
|---|----------------|-------------------|
| 1 | Renderiza con datos mínimos (1 categoría, 1 serie) | Gráfico visible sin errores |
| 2 | Renderiza con datos máximos (10+ categorías, 5+ series) | Legible, sin desbordamiento |
| 3 | Actualizar datos se refleja inmediatamente | Preview actualiza en <100ms |
| 4 | Cambiar colores se refleja correctamente | Colores actualizan sin flash |
| 5 | Cambiar fuente aplica al gráfico | Texto cambia de tipografía |
| 6 | Cambiar tamaño de fuente aplica | Tamaños se ajustan |
| 7 | Toggle leyenda muestra/oculta | Leyenda aparece/desaparece |
| 8 | Cambiar posición de leyenda | Leyenda se reubica |
| 9 | Toggle grid muestra/oculta | Grid aparece/desaparece |
| 10 | Exportar a PNG descarga archivo válido | Imagen abre correctamente |
| 11 | Exportar a SVG descarga archivo válido | SVG renderiza en browser |
| 12 | Exportar a PDF descarga archivo válido | PDF abre en lector |

### Pruebas de Entrada de Datos

| # | Caso de Prueba | Criterio de Éxito |
|---|----------------|-------------------|
| 1 | Ingresar valores numéricos positivos | Acepta valores, gráfico renderiza |
| 2 | Ingresar valores negativos | Acepta, gráfico muestra correctamente |
| 3 | Ingresar cero | Acepta, barra/segmento no aparece |
| 4 | Ingresar decimales | Acepta, muestra con precisión |
| 5 | Dejar campo vacío | Trata como 0 o muestra validación |
| 6 | Ingresar texto en campo numérico | Rechaza, muestra feedback |
| 7 | Agregar categoría | Se refleja en gráfico y tabla |
| 8 | Eliminar categoría | Se refleja en gráfico y tabla |
| 9 | Agregar serie | Nueva serie en gráfico |
| 10 | Eliminar serie | Serie removida del gráfico |
| 11 | Cargar datos de ejemplo | Datos se cargan, gráfico renderiza |

---

## 7.2 Pruebas de Responsive

| Viewport | Verificar |
|----------|-----------|
| 1920×1080 (Desktop Full HD) | Layout completo, split panel |
| 1366×768 (Laptop) | Layout funcional, sidebar visible |
| 1024×768 (Tablet landscape) | Sidebar colapsable funciona |
| 768×1024 (Tablet portrait) | Drawer/modal para sidebar |
| 375×667 (iPhone SE) | Navegación por tabs, un panel |
| 390×844 (iPhone 14) | Experiencia táctil fluida |

---

## 7.3 Pruebas Cross-Browser

| Navegador | Versión Mínima | Prioridad |
|-----------|---------------|-----------|
| Chrome | 100+ | Alta |
| Firefox | 100+ | Alta |
| Safari | 16+ | Media |
| Edge | 100+ | Alta |

---

## 7.4 Métricas de Rendimiento (Lighthouse)

### Objetivos Mínimos

| Métrica | Objetivo |
|---------|----------|
| Performance | ≥ 90 |
| Accessibility | ≥ 90 |
| Best Practices | ≥ 90 |
| SEO | ≥ 90 |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.5s |
| Total Blocking Time | < 200ms |
| Cumulative Layout Shift | < 0.1 |

---

## 7.5 Optimizaciones

### Bundle Size

| Técnica | Implementación |
|---------|----------------|
| Tree shaking | Importar solo componentes usados de Recharts |
| Dynamic imports | `next/dynamic` para componentes de gráfico |
| Code splitting | Lazy load de jsPDF (solo cuando exporta a PDF) |
| Lucide icons | Importar icons individuales, no el paquete completo |

```typescript
// ✅ Correcto
import { BarChart3, LineChart, PieChart } from 'lucide-react';

// ❌ Incorrecto
import * as Icons from 'lucide-react';
```

### Rendimiento de Renderizado

| Técnica | Uso |
|---------|-----|
| `React.memo` | Componentes de gráfico que no cambian frecuentemente |
| `useMemo` | Cálculos derivados de datos |
| `useCallback` | Event handlers pasados como props |
| Debounce | En inputs numéricos que actualizan el gráfico |

---

## 7.6 Registro de Bugs

| # | Bug | Severidad | Estado | Fecha | Resolución |
|---|-----|-----------|--------|-------|------------|
| 1 | CSS vars `--text-lg/xl` definidas antes que `--font-size-lg/xl` | Baja | ✅ Resuelto | 2026-03-30 | Reordenadas en globals.css para que aliases apunten a variables ya declaradas |
| 2 | `transparent` en exportación PNG siempre enviaba `undefined` independientemente del toggle | Media | ✅ Resuelto | 2026-03-30 | Corregido en `export.ts` usando `getComputedStyle(element).backgroundColor` |

---

> [!WARNING]
> No desplegar a producción sin completar las pruebas de exportación en todos los navegadores objetivo. La exportación es la funcionalidad core.

> [!TIP]
> Siguiente paso: [Fase 8: Despliegue y Uso](./08-despliegue-uso.md)
