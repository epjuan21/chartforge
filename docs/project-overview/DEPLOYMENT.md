# Despliegue — ChartForge

## Entornos

*No se encontró evidencia de entornos separados (staging, QA) configurados en el proyecto.*

El flujo habitual para este tipo de aplicación estática es:

| Entorno | Descripción |
|---------|-------------|
| **Desarrollo** | Local, `npm run dev`, puerto 3005 |
| **Producción** | Plataforma de hosting estático (Vercel, Netlify, etc.) |

---

## Plataforma de Hosting Recomendada

La aplicación genera un **sitio estático** (sin API routes ni servidor de aplicación). Cualquier plataforma que soporte Next.js es compatible:

| Plataforma | Compatibilidad | Notas |
|------------|---------------|-------|
| **Vercel** | Nativa | Auto-detecta Next.js; recomendada para este stack |
| **Netlify** | Buena | Requiere plugin `@netlify/plugin-nextjs` |
| **Cloudflare Pages** | Buena | Compatible con Next.js estático |
| **GitHub Pages** | Parcial | Requiere exportación estática (`output: 'export'`) |

---

## Proceso de Build para Producción

```bash
# 1. Instalar dependencias
npm install

# 2. Generar el build optimizado
npm run build

# 3. (Opcional) Probar el build localmente antes de desplegar
npm run start
```

El build produce los archivos optimizados en la carpeta `.next/`. Next.js aplica automáticamente:
- Minificación de JavaScript y CSS.
- Code splitting por ruta.
- Optimización de imágenes (AVIF, WebP).
- Tree-shaking de dependencias no utilizadas.

---

## Configuración de Infraestructura

### next.config.ts

```typescript
// Configuración activa en el proyecto
{
  reactStrictMode: true,          // Detección de efectos secundarios en desarrollo
  poweredByHeader: false,         // Elimina el header X-Powered-By por seguridad

  images: {
    formats: ['image/avif', 'image/webp']  // Optimización de imágenes modernas
  },

  headers: async () => [          // Cabeceras de seguridad HTTP
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options',         value: 'DENY' },
        { key: 'X-Content-Type-Options',  value: 'nosniff' },
        { key: 'Referrer-Policy',         value: 'strict-origin-when-cross-origin' }
      ]
    }
  ]
}
```

*No se encontró evidencia de Dockerfile, docker-compose, configuración de IIS ni reverse proxy.*

---

## Despliegue en Vercel (Paso a Paso)

1. Conectar el repositorio de GitHub a [vercel.com](https://vercel.com).
2. Vercel detecta automáticamente Next.js y configura el build.
3. Cada `push` a la rama `main` desencadena un nuevo despliegue.
4. El sitio queda disponible en una URL de Vercel (ej. `chartforge.vercel.app`).

No se requiere ninguna variable de entorno para el despliegue inicial.

---

## Variables de Entorno de Producción

*No se encontró evidencia de variables de entorno requeridas para producción.*

Si en el futuro se añade un backend:

| Clave | Descripción |
|-------|-------------|
| `NEXT_PUBLIC_API_URL` | URL base de la API REST de producción |

---

## Estrategia de Base de Datos en Producción

*No se encontró evidencia de base de datos, migraciones ni estrategia de backup en el proyecto.*

Toda la persistencia ocurre en el navegador del usuario vía `localStorage`. No existe estado centralizado en servidor.
