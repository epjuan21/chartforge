# Fase 5: Diseño UI/UX e Interacciones

> **Estado General:** ✅ Completado
> **Última actualización:** 2026-03-30
> **Dependencias:** Fase 4 completada

---

## 📋 Seguimiento de Ejecución

| # | Tarea | Estado | Fecha Inicio | Fecha Fin | Notas |
|---|-------|--------|-------------|-----------|-------|
| 5.1 | Diseñar y construir Landing Page | ✅ | 2026-03-30 | 2026-03-30 | Hero con glow, gallery de tipos, features glassmorphism, CTA, footer |
| 5.2 | Diseñar layout del Editor (split panel) | ✅ | 2026-03-30 | 2026-03-30 | Grid 3 columnas: tipo sidebar \| canvas \| config panel |
| 5.3 | Crear Header con navegación | ✅ | 2026-03-30 | 2026-03-30 | Header en landing (sticky, blur) + barra superior en editor |
| 5.4 | Crear Sidebar con tabs de configuración | ✅ | 2026-03-30 | 2026-03-30 | Tabs Datos/Estilo con iconos en panel derecho |
| 5.5 | Crear panel de vista previa del gráfico | ✅ | 2026-03-30 | 2026-03-30 | Canvas central con info de tipo y dimensiones |
| 5.6 | Implementar selector de tipo de gráfico | ✅ | 2026-03-30 | 2026-03-30 | Sidebar izquierdo con iconos y labels, estado activo con glow |
| 5.7 | Implementar vista previa a pantalla completa | ✅ | 2026-03-30 | 2026-03-30 | Página `/preview` sincronizada en vivo con el editor via localStorage |
| 5.8 | Agregar animaciones y transiciones | ✅ | 2026-03-30 | 2026-03-30 | slideUp en hero, hover transitions, animaciones de gráficos via Recharts |
| 5.9 | Implementar responsive design | ✅ | 2026-03-30 | 2026-03-30 | Tablet (≤1100px): sidebar colapsado. Móvil (≤768px): layout vertical con scroll |
| 5.10 | Pulir micro-interacciones | ✅ | 2026-03-30 | 2026-03-30 | Focus glow en inputs, hover lift en cards, scale en botones, transiciones suaves |

---

## 5.1 Landing Page

### Estructura

```
┌────────────────────────────────────────────────────────┐
│  HEADER: Logo + Nav (Editor | GitHub)                   │
├────────────────────────────────────────────────────────┤
│                                                         │
│           ✨ ChartForge                                 │
│     Crea gráficos profesionales en segundos             │
│                                                         │
│     [🚀 Comenzar a Crear]                               │
│                                                         │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐           │
│  │ Barras │ │ Líneas │ │ Torta  │ │ Radar  │           │
│  │  demo  │ │  demo  │ │  demo  │ │  demo  │           │
│  └────────┘ └────────┘ └────────┘ └────────┘           │
│                                                         │
│  ── Features ──                                         │
│  📊 10+ tipos  🎨 Personalizable  📥 Exporta           │
│                                                         │
│  FOOTER                                                 │
└────────────────────────────────────────────────────────┘
```

### Elementos Clave

- **Hero section**: Gradiente animado de fondo, título grande, CTA prominente
- **Gallery de gráficos demo**: Animados, interactivos al hover
- **Features grid**: Iconos con glassmorphism cards
- **Dark theme por defecto**: Coherente con el editor

---

## 5.2 Layout del Editor

### Estructura Split Panel

```
┌──────────────────────────────────────────────────────────┐
│  HEADER: Logo | Tipo de Gráfico (selector) | [Exportar] │
├────────────────────┬─────────────────────────────────────┤
│                    │                                      │
│   SIDEBAR          │         PREVIEW AREA                 │
│   (380px fijo)     │         (flex: 1)                    │
│                    │                                      │
│  ┌──────────────┐  │    ┌──────────────────────────┐      │
│  │ [Datos]      │  │    │                          │      │
│  │ [Estilo]     │  │    │     GRÁFICO EN VIVO      │      │
│  │ [Exportar]   │  │    │                          │      │
│  ├──────────────┤  │    │   (se actualiza en       │      │
│  │              │  │    │    tiempo real)           │      │
│  │  Contenido   │  │    │                          │      │
│  │  del tab     │  │    └──────────────────────────┘      │
│  │  activo      │  │                                      │
│  │              │  │    Título: "Ventas Trimestrales"     │
│  │              │  │    Tamaño: 800 x 500                 │
│  │              │  │                                      │
│  └──────────────┘  │    [🔍 Pantalla Completa]            │
│                    │                                      │
└────────────────────┴─────────────────────────────────────┘
```

### Principios de UX

1. **Preview en tiempo real**: Cada cambio se refleja instantáneamente
2. **Sidebar scrolleable**: El contenido del sidebar es independiente del preview
3. **Tabs en sidebar**: Datos | Estilo | Exportar — organiza el flujo de trabajo
4. **Responsive**: En pantallas pequeñas, sidebar se convierte en drawer/modal

---

## 5.3 Selector de Tipo de Gráfico

### Diseño: Grid de tarjetas con iconos

```
┌─────────────────────────────────┐
│  Seleccionar Tipo de Gráfico    │
├─────────────────────────────────┤
│  ┌─────┐ ┌─────┐ ┌─────┐       │
│  │ 📊  │ │ 📊  │ │ 📊  │       │
│  │Vert │ │Horiz│ │Apil │       │
│  └─────┘ └─────┘ └─────┘       │
│  ┌─────┐ ┌─────┐ ┌─────┐       │
│  │ 📈  │ │ 📈  │ │ 🥧  │       │
│  │Línea│ │Área │ │Torta│       │
│  └─────┘ └─────┘ └─────┘       │
│  ┌─────┐ ┌─────┐ ┌─────┐       │
│  │ 🍩  │ │ 🕸️  │ │ 📊📈│       │
│  │Anill│ │Radar│ │Mixto│       │
│  └─────┘ └─────┘ └─────┘       │
└─────────────────────────────────┘
```

- Cada tarjeta tiene hover con glow effect
- La tarjeta activa tiene borde de color accent
- Animación suave al cambiar de tipo

---

## 5.4 Estilo Visual — Efectos y Animaciones

### Glassmorphism para Cards y Paneles

```css
.glass-card {
  background: rgba(26, 26, 46, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(108, 92, 231, 0.2);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}
```

### Gradientes Animados

```css
.gradient-bg {
  background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%);
  background-size: 200% 200%;
  animation: gradientShift 8s ease infinite;
}
```

### Micro-animaciones

| Elemento | Animación | Duración |
|----------|-----------|----------|
| Botones | Scale + color en hover | 150ms |
| Tabs | Slide indicator | 250ms |
| Gráficos | Fade-in + grow al cambiar datos | 300ms |
| Cards | Lift shadow en hover | 200ms |
| Inputs | Border glow on focus | 150ms |
| Tooltips | Fade-in con delay | 200ms |
| Sidebar tabs | Smooth content crossfade | 250ms |

### Efectos en Inputs

```css
.input:focus {
  border-color: var(--color-accent-primary);
  box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.15);
  outline: none;
}
```

---

## 5.5 Responsive Design

### Breakpoints

| Breakpoint | Ancho | Layout |
|-----------|-------|--------|
| Desktop | ≥ 1200px | Split panel (sidebar + preview) |
| Tablet | 768-1199px | Sidebar colapsable, preview ocupa todo |
| Móvil | < 768px | Tabs a pantalla completa, un panel a la vez |

### Comportamiento Tablet/Móvil

- Sidebar se convierte en **drawer** que se abre desde la izquierda
- Botón flotante para abrir configuración
- Preview se ajusta al ancho disponible
- Exportación funciona igual en todos los tamaños

---

## 5.6 Accesibilidad (A11Y)

| Aspecto | Implementación |
|---------|----------------|
| Navegación por teclado | Tab order lógico en formularios |
| Contraste | Ratio mínimo 4.5:1 en textos |
| Focus visible | Outline visible en todos los interactivos |
| ARIA labels | En botones de icono y controles |
| Roles semánticos | `role="tablist"`, `role="tabpanel"` |

---

> [!TIP]
> Siguiente paso: [Fase 6: Exportación y Descarga](./06-exportacion-descarga.md)
