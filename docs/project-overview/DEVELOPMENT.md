# Ejecución en Desarrollo — ChartForge

## Prerrequisitos

| Herramienta | Versión mínima | Propósito |
|-------------|---------------|-----------|
| **Node.js** | 18.x | Runtime de JavaScript |
| **npm** | 9.x | Gestión de dependencias |
| **Git** | Cualquiera | Control de versiones |

No se requiere base de datos local, Docker ni servicios externos para ejecutar el proyecto en desarrollo.

---

## Instalación y Ejecución Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/epjuan21/chartforge.git
cd chartforge
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

El servidor quedará disponible en [http://localhost:3005](http://localhost:3005) (puerto configurado en el script de `package.json`).

Los cambios en el código fuente se reflejan automáticamente gracias al Fast Refresh de Next.js.

---

## Variables de Entorno

*No se encontró evidencia de variables de entorno requeridas en el proyecto.*

La aplicación es 100% client-side y no necesita ningún archivo `.env` para funcionar en desarrollo. Si en el futuro se integra un backend, las claves necesarias seguirían el patrón de Next.js:

| Clave | Descripción |
|-------|-------------|
| `NEXT_PUBLIC_API_URL` | URL base de una futura API REST |
| `NEXT_PUBLIC_APP_VERSION` | Versión de la aplicación para mostrar en la UI |

---

## Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo en el puerto 3005 |
| `npm run build` | Genera el build optimizado para producción |
| `npm run start` | Sirve el build de producción localmente |
| `npm run lint` | Ejecuta ESLint sobre todo el código fuente |

---

## Herramientas de Calidad de Código

### ESLint
Configurado con las reglas de `eslint-config-next`. Incluye validaciones de accesibilidad, hooks de React y buenas prácticas de Next.js.

```bash
npm run lint
```

### TypeScript
El compilador valida los tipos en tiempo de desarrollo. Los errores de tipo impiden el build de producción.

```bash
# Verificar tipos sin generar archivos
npx tsc --noEmit
```

---

## Troubleshooting

### El puerto 3005 ya está en uso
```bash
# Encontrar el proceso que usa el puerto
npx kill-port 3005
# O cambiar el puerto en package.json:
# "dev": "next dev --turbopack -p 3006"
```

### Error al instalar dependencias en Windows
Si `npm install` falla por permisos en Windows:
```bash
# Ejecutar la terminal como Administrador, o:
npm install --legacy-peer-deps
```

### Cambios en el editor no se reflejan en /preview
La sincronización entre pestañas usa `localStorage`. Asegúrese de que ambas pestañas estén abiertas en el mismo origen (`http://localhost:3005`). Los navegadores en modo incógnito bloquean `localStorage` por defecto.

### Build falla por errores de tipo TypeScript
```bash
# Ver todos los errores de tipo
npx tsc --noEmit
```
Corrija los errores indicados antes de volver a ejecutar `npm run build`.

### Fuentes de Google no cargan en desarrollo offline
Las fuentes Inter y JetBrains Mono se cargan desde Google Fonts CDN. Sin conexión, el navegador usará la fuente del sistema como respaldo (definida en los estilos base).
