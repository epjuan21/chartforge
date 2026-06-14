# Fase 3: Configuración del Proyecto y Fundación

> **Estado General:** ✅ Completado
> **Última actualización:** 2026-03-30  
> **Dependencias:** Fases 1, 2 completadas

---

## 📋 Seguimiento de Ejecución

| # | Tarea | Estado | Fecha Inicio | Fecha Fin | Notas |
|---|-------|--------|-------------|-----------|-------|
| 3.1 | Inicializar proyecto Next.js 15 con TypeScript | ✅ | 2026-03-29 | 2026-03-29 | Next.js 16.2.1 con App Router, `src/`, alias `@/*` |
| 3.2 | Instalar dependencias de producción | ✅ | 2026-03-29 | 2026-03-29 | recharts, react-colorful, html-to-image, jspdf, lucide-react |
| 3.3 | Instalar dependencias de desarrollo | ✅ | 2026-03-29 | 2026-03-29 | prettier, eslint-config-prettier |
| 3.4 | Configurar ESLint y Prettier | ✅ | 2026-03-29 | 2026-03-29 | `.prettierrc` con semi, singleQuote, printWidth 100 |
| 3.5 | Configurar TypeScript estricto | ✅ | 2026-03-29 | 2026-03-29 | `strict`, `noUnusedLocals`, `noUnusedParameters`, `forceConsistentCasingInFileNames` |
| 3.6 | Crear estructura de carpetas | ✅ | 2026-03-29 | 2026-03-29 | `app/`, `components/`, `hooks/`, `types/`, `utils/`, `constants/` |
| 3.7 | Configurar design tokens (CSS Variables) | ✅ | 2026-03-29 | 2026-03-29 | Sistema completo en `globals.css`: colores, tipografía, espaciado, sombras, transiciones, paletas |
| 3.8 | Configurar Google Fonts | ✅ | 2026-03-29 | 2026-03-29 | Inter y JetBrains Mono via `next/font/google` con `display: swap` |
| 3.9 | Crear layout raíz con metadata SEO | ✅ | 2026-03-29 | 2026-03-29 | `layout.tsx` con title, description, keywords, openGraph |
| 3.10 | Verificar compilación y ejecución | ✅ | 2026-03-30 | 2026-03-30 | Build limpio confirmado en Fase 4 |

---

## 3.1 Inicialización del Proyecto

```bash
pnpm create next-app@latest ./ --typescript --eslint --app --src-dir --no-tailwind --import-alias "@/*"
```

## 3.2 Dependencias

### Producción
```bash
pnpm add recharts react-colorful html-to-image jspdf lucide-react
```

### Desarrollo
```bash
pnpm add -D prettier eslint-config-prettier
```

## 3.3 TypeScript Estricto

Activar `strict: true`, `noUnusedLocals`, `noUnusedParameters` y `forceConsistentCasingInFileNames`.

## 3.4 Prettier

```json
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

## 3.5 Design Tokens (CSS Variables)

Definir en `globals.css` un sistema completo de variables que incluya:

- **Colores**: Background (primary, secondary, surface, elevated), texto (primary, secondary, muted), acentos (primary, success, warning, danger), bordes
- **Tipografía**: Font families (Inter sans, JetBrains Mono), tamaños (xs a 4xl), pesos, line-heights
- **Espaciado**: Escala de 0.25rem a 4rem
- **Bordes**: Radios de sm a full
- **Sombras**: sm, md, lg, glow
- **Transiciones**: fast (150ms), normal (250ms), slow (350ms)
- **Paletas de gráficos**: Vibrante, Corporativa, Pastel, Oscura (6-8 colores cada una)

Tema base: **modo oscuro** con fondo `#0a0a0f` y acento `#6c5ce7`.

## 3.6 Google Fonts

Usar `next/font/google` para cargar **Inter** (texto) y **JetBrains Mono** (datos numéricos) con `display: 'swap'`.

## 3.7 Metadata SEO

```tsx
export const metadata = {
  title: 'ChartForge — Generador de Gráficos Estadísticos',
  description: 'Crea gráficos estadísticos profesionales en segundos.',
};
```

## 3.8 Verificación

| Check | Comando | Criterio |
|-------|---------|----------|
| Compila | `pnpm build` | Sin errores |
| Dev server | `pnpm dev` | localhost:3000 |
| TypeScript | `pnpm exec tsc --noEmit` | Sin errores |
| Lint | `pnpm lint` | Sin errores |
| CSS Variables | DevTools | Variables en `:root` |
| Fuentes | DevTools | Inter y JetBrains activas |

---

> [!IMPORTANT]
> Esta fase debe completarse antes de comenzar los componentes. La fundación del diseño es crítica para la consistencia visual.
