# Prompt — Generación de Documentación Técnica de Proyecto Web

> **Eres un arquitecto de software senior encargado de documentar un proyecto web.** Lee todos los archivos relevantes del proyecto (código fuente, configuración, pipelines, dockerfiles, scripts, manifiestos de dependencias, etc.) y genera documentación técnica completa en formato Markdown.
>
> **Antes de escribir, analiza el proyecto para identificar:**
>
> - El framework y lenguaje principal (Next.js, ASP.NET Core, u otro)
> - El patrón arquitectónico utilizado (MVC, Clean Architecture, Hexagonal, monolito, microservicios, etc.)
> - Las herramientas de build, empaquetado y despliegue
> - Los servicios externos o infraestructura involucrada
>
> ---
>
> ## Ubicación de los archivos generados
>
> Crea todos los documentos dentro de la carpeta `/docs/project-overview/` en la raíz del proyecto. Si la carpeta no existe, créala. La estructura resultante debe ser:
>
> ```
> /docs/project-overview/
> ├── ARCHITECTURE.md
> ├── FUNCTIONALITY.md
> ├── DEVELOPMENT.md
> ├── DEPLOYMENT.md
> └── CICD.md
> ```
>
> ---
>
> ## Documentos a generar
>
> ### 1. `ARCHITECTURE.md` — Arquitectura del Proyecto
>
> - Diagrama de la estructura de carpetas (árbol simplificado, sin `node_modules`, `bin`, `obj` ni archivos generados)
> - Patrón arquitectónico identificado y justificación
> - Capas o módulos principales y sus responsabilidades
> - Flujo de una request típica (de entrada del usuario hasta respuesta)
> - Tecnologías y librerías clave con su propósito (no listar todas, solo las relevantes arquitectónicamente)
> - Manejo de estado (si aplica: Redux, Context, Zustand, sesión del servidor, etc.)
> - Estrategia de acceso a datos (ORM, queries directas, repositorios, API externa)
>
> ### 2. `FUNCTIONALITY.md` — Funcionalidad
>
> - Resumen general de lo que hace la aplicación
> - Listado de módulos o features principales con una descripción breve de cada uno
> - Roles de usuario y permisos (si aplica)
> - Integraciones con servicios externos (APIs, pasarelas de pago, auth providers, etc.)
> - Rutas o endpoints principales agrupados por módulo
>
> ### 3. `DEVELOPMENT.md` — Ejecución en Desarrollo
>
> - Prerrequisitos (runtime, SDK, herramientas CLI, base de datos local)
> - Pasos para clonar, instalar dependencias y ejecutar el proyecto localmente
> - Variables de entorno necesarias (listar las claves sin valores sensibles, con descripción de cada una)
> - Comandos útiles (build, test, lint, migraciones, seeds)
> - Troubleshooting de problemas comunes al configurar el entorno
>
> ### 4. `DEPLOYMENT.md` — Despliegue
>
> - Entornos existentes (dev, staging, producción) si se pueden inferir
> - Plataforma de hosting (Vercel, Azure App Service, Docker, Kubernetes, etc.)
> - Proceso de build para producción
> - Configuración de infraestructura relevante (Dockerfile, docker-compose, IIS, reverse proxy)
> - Variables de entorno de producción (claves sin valores, con descripción)
> - Estrategia de base de datos en producción (migraciones, backups si hay evidencia)
>
> ### 5. `CICD.md` — CI/CD
>
> - Plataforma de CI/CD utilizada (GitHub Actions, Azure DevOps, GitLab CI, etc.)
> - Descripción de cada pipeline o workflow existente
> - Etapas (build → test → deploy) con lo que hace cada una
> - Triggers (en qué ramas o eventos se ejecuta)
> - Secrets o variables requeridas por los pipelines
> - Si no hay CI/CD configurado, indicarlo explícitamente y sugerir un pipeline básico apropiado para el stack
>
> ---
>
> ## Reglas de formato
>
> - Usa español para todo el contenido
> - Incluye diagramas en formato Mermaid donde aporten claridad (arquitectura, flujo de request, pipeline CI/CD)
> - Si alguna sección no aplica o no hay evidencia en el código, indícalo con: *"No se encontró evidencia de esto en el proyecto."*
> - No inventes ni asumas información que no esté en los archivos — documenta solo lo que puedas verificar
