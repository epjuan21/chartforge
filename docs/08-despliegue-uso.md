# Fase 8: Despliegue y Uso

> **Estado General:** ✅ Completado
> **Última actualización:** 2026-03-31
> **Dependencias:** Fase 7 completada

---

## 📋 Seguimiento de Ejecución

| # | Tarea | Estado | Fecha Inicio | Fecha Fin | Notas |
|---|-------|--------|-------------|-----------|-------|
| 8.1 | Configurar proyecto para producción | ✅ | 2026-03-31 | 2026-03-31 | reactStrictMode, poweredByHeader false, headers seguridad, images avif/webp |
| 8.2 | Configurar Vercel para despliegue | ✅ | 2026-03-31 | 2026-03-31 | next.config.ts listo; sin variables de entorno requeridas |
| 8.3 | Crear repositorio Git y push inicial | ✅ | 2026-03-31 | 2026-03-31 | https://github.com/epjuan21/chartforge.git; rama main |
| 8.4 | Realizar primer despliegue | ⬜ | — | — | Pendiente: conectar con Vercel y hacer push a main |
| 8.5 | Verificar build de producción | ✅ | 2026-03-31 | 2026-03-31 | `npm run build` OK; 4 rutas estáticas generadas sin errores TS |
| 8.6 | Configurar dominio personalizado (opcional) | ⬜ | — | — | Opcional, post-despliegue |
| 8.7 | Escribir README.md del proyecto | ✅ | 2026-03-31 | 2026-03-31 | README con descripción, stack, estructura, scripts y despliegue |
| 8.8 | Verificar funcionamiento en producción | ⬜ | — | — | Pendiente: tras primer despliegue en Vercel |

---

## 8.1 Plataforma de Despliegue: Vercel

### ¿Por qué Vercel?

| Razón | Detalle |
|-------|---------|
| **Optimizado para Next.js** | Creadores de Next.js, soporte nativo |
| **Deploy automático** | Push a Git → deploy automático |
| **CDN global** | Edge network para carga rápida |
| **HTTPS gratuito** | SSL automático |
| **Plan gratuito** | Suficiente para esta aplicación |
| **Sin backend** | No necesitamos serverless functions |
| **Preview deployments** | Cada PR genera un preview |

### Alternativas Consideradas

| Plataforma | Viable | Razón de descarte |
|-----------|--------|-------------------|
| Netlify | ✅ | Bueno, pero Vercel es nativo para Next.js |
| GitHub Pages | ⚠️ | Requiere export estático, limitaciones |
| Cloudflare Pages | ✅ | Viable pero menos integración con Next.js |
| AWS Amplify | ✅ | Más complejo de configurar |

---

## 8.2 Configuración de Producción

### `next.config.ts`

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Optimizaciones de producción
  reactStrictMode: true,
  poweredByHeader: false,

  // Optimización de imágenes (si se usan)
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
```

---

## 8.3 Flujo de Despliegue

### Primer Despliegue

```
1. Crear repositorio en GitHub
   └── git init
   └── git add .
   └── git commit -m "feat: initial commit - ChartForge"
   └── git remote add origin <url>
   └── git push -u origin main

2. Conectar con Vercel
   └── vercel.com → New Project → Import Git Repository
   └── Framework: Next.js (auto-detectado)
   └── Build Command: next build (auto)
   └── Output Directory: .next (auto)
   └── Deploy

3. Verificar
   └── Acceder a la URL generada
   └── Probar creación de gráfico
   └── Probar exportación
```

### Despliegues Posteriores

```
git add .
git commit -m "feat/fix: descripción del cambio"
git push origin main
→ Vercel deploy automáticamente
```

---

## 8.4 Variables de Entorno

> Esta aplicación **no requiere variables de entorno** ya que:
> - No hay base de datos
> - No hay autenticación
> - No hay APIs externas
> - No hay secrets

Si en el futuro se agregan analytics (ej: Google Analytics), se configuraría:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 8.5 Verificación Post-Despliegue

| # | Verificación | Método | Criterio |
|---|-------------|--------|----------|
| 1 | Página carga correctamente | Abrir URL | Sin errores, contenido visible |
| 2 | Landing page renderiza | Visual | Hero, gallery, features visibles |
| 3 | Editor funciona | Crear gráfico de barras | Gráfico renderiza con datos |
| 4 | Cambio de tipo funciona | Cambiar a líneas | Gráfico cambia de tipo |
| 5 | Configuración visual funciona | Cambiar colores y fuentes | Cambios se reflejan |
| 6 | Exportar PNG funciona | Descargar PNG | Archivo descarga, imagen válida |
| 7 | Exportar SVG funciona | Descargar SVG | Archivo descarga, SVG válido |
| 8 | Exportar PDF funciona | Descargar PDF | Archivo descarga, PDF válido |
| 9 | Responsive funciona | Redimensionar browser | Layout se adapta |
| 10 | Performance aceptable | Lighthouse | Scores ≥ 90 |
| 11 | HTTPS activo | Verificar candado | Conexión segura |
| 12 | Favicon visible | Tab del browser | Icono visible |

---

## 8.6 Guía de Uso para el Usuario Final

### Flujo de Uso Típico

```
1. 🏠 Abrir ChartForge
   └── Página de inicio con ejemplos

2. 🚀 Click en "Comenzar a Crear"
   └── Se abre el Editor

3. 📊 Seleccionar tipo de gráfico
   └── Click en la tarjeta del tipo deseado

4. 📝 Ingresar datos
   └── Tab "Datos" en el sidebar
   └── Agregar categorías (ej: Ene, Feb, Mar)
   └── Agregar series (ej: Ventas, Gastos)
   └── Llenar valores en la tabla
   └── O usar "Cargar Ejemplo"

5. 🎨 Personalizar estilo
   └── Tab "Estilo" en el sidebar
   └── Cambiar título y subtítulo
   └── Seleccionar paleta de colores
   └── Ajustar fuente y tamaños
   └── Configurar leyenda y grid

6. 👁️ Vista previa
   └── El gráfico se actualiza en tiempo real
   └── Usar "Pantalla Completa" para ver a tamaño real

7. 📥 Exportar
   └── Tab "Exportar" en el sidebar
   └── Elegir formato (PNG, SVG, PDF)
   └── Configurar opciones (escala, orientación)
   └── Click en "Descargar"

8. ✅ ¡Listo para usar en tu presentación!
```

### Tips para Mejores Resultados

| Tip | Detalle |
|-----|---------|
| Usar escala 2x o 3x | Para presentaciones en proyector |
| Elegir la paleta adecuada | Corporativa para informes, Vibrante para marketing |
| Limitar a 6-8 categorías | Más categorías = menos legibilidad |
| Usar SVG para documentos | Escala sin perder calidad |
| Probar con pantalla completa | Simula cómo se verá en la presentación |

---

## 8.7 Mantenimiento

### Actualizaciones Recomendadas

| Frecuencia | Acción |
|-----------|--------|
| Mensual | Verificar actualizaciones de Next.js |
| Trimestral | Actualizar dependencias menores |
| Semestral | Evaluar actualización de Recharts |
| Según necesidad | Agregar nuevos tipos de gráfico |

### Monitoreo

- **Vercel Analytics** (gratuito): Métricas de rendimiento web
- **Vercel Speed Insights**: Core Web Vitals en producción

---

> [!IMPORTANT]
> Al ser una aplicación sin backend, el despliegue es extremadamente simple. No hay bases de datos que configurar, migraciones que correr ni variables de entorno que gestionar.

> [!NOTE]
> Con esta fase completada, ChartForge está disponible para usuarios finales. ¡El proyecto está terminado! 🎉
